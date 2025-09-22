import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager, PerformanceOptimizer } from '../../utils/animation/animationStateManager.js';

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - ScrambleText Component Styles */
.wb-scramble-text {
  display: inline-block;
  position: relative;
  cursor: crosshair;
}

.wb-scramble-text__content {
  display: inline-block;
}

.wb-scramble-text__line {
  display: block;
}

.wb-scramble-text__char {
  will-change: transform;
  display: inline-block;
  transition: all 0.1s ease;
}

/* Performance optimization during animation */
.wb-scramble-text-animating .wb-scramble-text__char {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Clean up after animation */
.wb-scramble-text-completed .wb-scramble-text__char {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-scramble-text[aria-label] .wb-scramble-text__content {
  speak: none;
}

/* Hover effect */
.wb-scramble-text:hover .wb-scramble-text__char {
  transition: none;
}
`;

class ScrambleTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'ScrambleText';
    this.componentClasses = webflowBitsClasses.forComponent('scramble-text');
    this.defaultConfig = {
      radius: 100,
      duration: 1.2,
      speed: 0.5,
      scrambleChars: ".:",
      threshold: 0.1,
      rootMargin: '0px',
      font: 'monospace'
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-scramble-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: ScrambleText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject ScrambleText styles', error);
    }
  }

    /**
   * Ensure styles are injected when needed
   */
    ensureStylesInjected() {
      if (!this.stylesInjected) {
        this.injectComponentStyles();
      }
    }

  /**
   * Parse custom attributes from element using utility functions
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      {
        // ScrambleText-specific attributes
        radius: { attribute: 'wb-radius', type: 'number', parser: parseInt, min: 10 },
        duration: { attribute: 'wb-duration', type: 'duration' },
        speed: { attribute: 'wb-speed', type: 'number', parser: parseFloat, min: 0.1, max: 2 },
        scrambleChars: { attribute: 'wb-scramble-chars', type: 'string' },
        font: { attribute: 'wb-font', type: 'string' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Initialize element for scramble animation
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (this.instances.has(element)) {
      return;
    }

    try {
      const config = this.parseConfig(element);
      const originalText = element.textContent.trim();
      
      if (!originalText) {
        console.warn('WebflowBits ScrambleText: Element has no text content', element);
        return;
      }

      // Create wrapper structure
      this.createScrambleStructure(element, originalText, config);
      
      // Create instance data
      const instance = {
        element,
        config,
        originalText,
        splitText: null,
        chars: [],
        isActive: false,
        addedClasses: []
      };

      this.instances.set(element, instance);

      // Apply CSS classes
      ComponentClassManager.applyClasses(
        element, 
        ['wb-scramble-text'], 
        this.instances, 
        this.componentName
      );

      // Initialize SplitText
      this.initializeSplitText(instance);

      // Setup event listeners
      this.setupEventListeners(instance);

      console.log('WebflowBits ScrambleText: Element initialized', { element, config });

      // Dispatch initialization event
      element.dispatchEvent(new CustomEvent('wb-scramble-text-init', {
        detail: { element, config },
        bubbles: true
      }));

    } catch (error) {
      console.error('WebflowBits ScrambleText: Failed to initialize element', error);
    }
  }

  /**
   * Create the HTML structure for scramble animation
   */
  createScrambleStructure(element, originalText, config) {
    // Store original text for screen readers
    element.setAttribute('aria-label', originalText);
    
    // Convert line breaks to <br> tags for proper display
    const textWithLineBreaks = originalText.replace(/\n/g, '<br>');
    
    // Create wrapper structure
    element.innerHTML = `
      <span class="wb-scramble-text__content" aria-hidden="true">
        ${textWithLineBreaks}
      </span>
    `;
  }

  /**
   * Check if the font is monospace
   */
  isMonospaceFont(element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily.toLowerCase();
    
    // Common monospace font families
    const monospaceFonts = [
      'monospace', 'mono', 'courier', 'courier new', 'consolas', 
      'menlo', 'monaco', 'lucida console', 'dejavu sans mono',
      'source code pro', 'fira code', 'jetbrains mono', 'cascadia code'
    ];
    
    return monospaceFonts.some(font => fontFamily.includes(font));
  }

  /**
   * Get the font family to apply based on config
   */
  getFontFamily(config) {
    const fontMap = {
      'monospace': 'monospace',
      'Courier New': '"Courier New", monospace',
      'Consolas': '"Consolas", monospace',
      'Menlo': '"Menlo", monospace',
      'Monaco': '"Monaco", monospace',
      'Lucida Console': '"Lucida Console", monospace',
      'DejaVu Sans Mono': '"DejaVu Sans Mono", monospace',
      'Source Code Pro': '"Source Code Pro", monospace',
      'Fira Code': '"Fira Code", monospace',
      'JetBrains Mono': '"JetBrains Mono", monospace',
      'Cascadia Code': '"Cascadia Code", monospace',
      'inherit (use existing font)': 'inherit'
    };
    
    return fontMap[config.font] || 'monospace';
  }

  /**
   * Check if the selected font is monospace
   */
  isSelectedFontMonospace(config) {
    return config.font !== 'inherit (use existing font)';
  }

  /**
   * Calculate minimum width for scramble characters based on font size
   * Returns null for monospace fonts
   */
  calculateScrambleCharWidth(element, config) {
    // Apply the selected font
    const fontFamily = this.getFontFamily(config);
    element.style.fontFamily = fontFamily;

    // Check if selected font is monospace - no width constraint needed
    if (this.isSelectedFontMonospace(config)) {
      return null;
    }

    // Check if font is already monospace - no width constraint needed
    if (this.isMonospaceFont(element)) {
      return null;
    }

    // Create a temporary element to measure character width
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.font = window.getComputedStyle(element).font;
    tempElement.textContent = 'o'; // Use 'o' as reference for average character width
    
    document.body.appendChild(tempElement);
    const charWidth = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);
    
    return charWidth;
  }

  /**
   * Initialize SplitText for character-level animation
   */
  initializeSplitText(instance) {
    const { element, config } = instance;
    const contentElement = element.querySelector('.wb-scramble-text__content');
    
    if (!contentElement) return;

    try {
      // Create SplitText instance
      instance.splitText = new SplitText(contentElement, {
        type: "chars,lines",
        charsClass: "wb-scramble-text__char",
        linesClass: "wb-scramble-text__line"
      });

      instance.chars = instance.splitText.chars;

      // Calculate minimum width for scramble characters
      const minCharWidth = this.calculateScrambleCharWidth(element, config);
      instance.minCharWidth = minCharWidth;
      instance.isMonospace = minCharWidth === null;

      // Show warning if using inherit font
      if (config.font === 'inherit (use existing font)') {
        console.warn('WebflowBits ScrambleText: Using "inherit" font. Scramble characters may have inconsistent widths. Consider using a monospace font option for better results.');
      }

      // Set up character data and initial state
      instance.chars.forEach((char) => {
        // Skip <br> tags - they don't need scrambling
        if (char.tagName === 'BR') {
          return;
        }
        
        gsap.set(char, {
          display: 'inline-block',
          attr: { 'data-content': char.innerHTML }
        });
      });

      console.log('WebflowBits ScrambleText: SplitText initialized', instance.chars.length, 'characters', 
        instance.isMonospace ? 'monospace font (no width constraint)' : `minWidth: ${minCharWidth}px`);

    } catch (error) {
      console.error('WebflowBits ScrambleText: Failed to initialize SplitText', error);
    }
  }

  /**
   * Setup event listeners based on animation trigger
   */
  setupEventListeners(instance) {
    const { element } = instance;

    const handlePointerMove = (e) => this.handlePointerMove(instance, e);
    const handlePointerEnter = () => this.startScrambling(instance);
    const handlePointerLeave = () => this.stopScrambling(instance);

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerenter', handlePointerEnter);
    element.addEventListener('pointerleave', handlePointerLeave);

    // Store references for cleanup
    instance.pointerMoveHandler = handlePointerMove;
    instance.pointerEnterHandler = handlePointerEnter;
    instance.pointerLeaveHandler = handlePointerLeave;
  }



  /**
   * Handle pointer movement for scramble effect
   */
  handlePointerMove(instance, event) {
    if (!instance.isActive || !instance.chars.length) return;

    const { config } = instance;

    instance.chars.forEach((char) => {
      // Skip <br> tags - they don't need scrambling
      if (char.tagName === 'BR') {
        return;
      }

      const { left, top, width, height } = char.getBoundingClientRect();
      const charCenterX = left + width / 2;
      const charCenterY = top + height / 2;
      const dx = event.clientX - charCenterX;
      const dy = event.clientY - charCenterY;
      const distance = Math.hypot(dx, dy);

      if (distance < config.radius) {
        const proximity = 1 - (distance / config.radius);
        const scrambleDuration = config.duration * proximity;
        
        gsap.to(char, {
          overwrite: true,
          duration: scrambleDuration,
          scrambleText: {
            text: char.dataset.content || "",
            chars: config.scrambleChars,
            speed: config.speed,
          },
          ease: "none",
          onStart: () => {
            // Apply minWidth only for non-monospace fonts when scrambling starts
            if (!instance.isMonospace && instance.minCharWidth) {
              gsap.set(char, { minWidth: `${instance.minCharWidth}px` });
            }
          },
          onComplete: () => {
            // Remove minWidth when scrambling completes (only if it was applied)
            if (!instance.isMonospace && instance.minCharWidth) {
              gsap.set(char, { minWidth: 'auto' });
            }
          }
        });
      }
    });
  }

  /**
   * Start scrambling animation
   */
  startScrambling(instance) {
    const { element } = instance;

    instance.isActive = true;

    // Apply animating state
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-scramble-text', 
      this.instances, 
      this.componentName
    );

    // Dispatch start event
    element.dispatchEvent(new CustomEvent('wb-scramble-text-start', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Stop scrambling animation
   */
  stopScrambling(instance) {
    const { element, chars } = instance;

    instance.isActive = false;

    // Kill all ongoing scramble animations
    if (chars && chars.length) {
      chars.forEach((char) => {
        // Skip <br> tags - they don't need scrambling
        if (char.tagName === 'BR') {
          return;
        }

        gsap.killTweensOf(char);
        // Reset to original text and remove minWidth
        if (char.dataset.content) {
          char.innerHTML = char.dataset.content;
        }
        // Remove minWidth to restore normal spacing
        gsap.set(char, { minWidth: 'auto' });
      });
    }

    // Apply completed state
    ComponentClassManager.setAnimationState(
      element, 
      'completed', 
      'wb-scramble-text', 
      this.instances, 
      this.componentName
    );

    // Dispatch stop event
    element.dispatchEvent(new CustomEvent('wb-scramble-text-stop', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Initialize all elements with wb-component="scramble-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="scramble-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    try {
      // Stop any ongoing animations
      this.stopScrambling(instance);

      // Remove event listeners
      if (instance.pointerMoveHandler) {
        element.removeEventListener('pointermove', instance.pointerMoveHandler);
      }
      if (instance.pointerEnterHandler) {
        element.removeEventListener('pointerenter', instance.pointerEnterHandler);
        element.removeEventListener('pointerleave', instance.pointerLeaveHandler);
      }

      // Revert SplitText
      if (instance.splitText) {
        instance.splitText.revert();
      }

      // Restore original content
      element.textContent = instance.originalText;
      element.removeAttribute('aria-label');

      // Remove CSS classes
      ComponentClassManager.removeClasses(
        element,
        ['wb-scramble-text', 'wb-scramble-text-animating', 'wb-scramble-text-completed'],
        this.instances,
        this.componentName
      );

      // Remove instance
      this.instances.delete(element);

      console.log('WebflowBits ScrambleText: Element destroyed', element);

    } catch (error) {
      console.error('WebflowBits ScrambleText: Failed to destroy element', error);
    }
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    Array.from(this.instances.keys()).forEach(element => {
      this.destroyElement(element);
    });
  }

  /**
   * Refresh all instances (useful after DOM changes)
   */
  refresh() {
    // Re-initialize elements that might have been added
    this.initAll();
  }

  /**
   * Check for CSS conflicts
   */
  checkForConflicts() {
    const conflicts = checkCSSConflicts(componentClassSets.scrambleText || [
      'wb-scramble-text',
      'wb-scramble-text__content',
      'wb-scramble-text__char',
      'wb-scramble-text-animating',
      'wb-scramble-text-completed'
    ]);

    return conflicts.length > 0 ? conflicts : null;
  }

  /**
   * Get component instance for an element
   */
  getInstance(element) {
    return this.instances.get(element) || null;
  }

  /**
   * Update configuration for an element
   */
  updateConfig(element, newConfig) {
    const instance = this.getInstance(element);
    if (!instance) return;

    instance.config = { ...instance.config, ...newConfig };
    
    // Dispatch update event
    element.dispatchEvent(new CustomEvent('wb-scramble-text-update', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Manually trigger scramble effect
   */
  triggerScramble(element, customConfig = {}) {
    const instance = this.getInstance(element);
    if (!instance) return;

    // Temporarily update config if provided
    const originalConfig = { ...instance.config };
    if (Object.keys(customConfig).length > 0) {
      instance.config = { ...instance.config, ...customConfig };
    }

    // Trigger scramble for all characters
    instance.chars.forEach((char) => {
      // Skip <br> tags - they don't need scrambling
      if (char.tagName === 'BR') {
        return;
      }

      gsap.to(char, {
        duration: instance.config.duration,
        scrambleText: {
          text: char.dataset.content || "",
          chars: instance.config.scrambleChars,
          speed: instance.config.speed,
        },
        ease: "none",
        onStart: () => {
          // Apply minWidth only for non-monospace fonts when scrambling starts
          if (!instance.isMonospace && instance.minCharWidth) {
            gsap.set(char, { minWidth: `${instance.minCharWidth}px` });
          }
        },
        onComplete: () => {
          // Remove minWidth when scrambling completes (only if it was applied)
          if (!instance.isMonospace && instance.minCharWidth) {
            gsap.set(char, { minWidth: 'auto' });
          }
        }
      });
    });

    // Restore original config
    instance.config = originalConfig;
  }
}

// Create and export singleton instance
const scrambleTextAnimator = new ScrambleTextAnimator();

// Export for external usage
export default scrambleTextAnimator;

// Add to component class sets for conflict detection
if (typeof componentClassSets !== 'undefined') {
  componentClassSets.scrambleText = [
    'wb-scramble-text',
    'wb-scramble-text__content',
    'wb-scramble-text__char',
    'wb-scramble-text-animating',
    'wb-scramble-text-completed'
  ];
}
