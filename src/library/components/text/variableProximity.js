import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';

// Register GSAP plugins
gsap.registerPlugin(SplitText);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - VariableProximity Component Styles */
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap");

.wb-variable-proximity {
  font-family: "Roboto Flex", sans-serif;
  display: inline-block;
  position: relative;
  cursor: default;
}

.wb-variable-proximity__content {
  display: inline;
}

.wb-variable-proximity__word {
  display: inline-block;
  white-space: nowrap;
}

.wb-variable-proximity__char {
  display: inline-block;
  will-change: font-variation-settings;
  transition: font-variation-settings 0.1s ease;
}

.wb-variable-proximity__space {
  display: inline-block;
}

/* Performance optimization during animation */
.wb-variable-proximity-animating .wb-variable-proximity__char {
  will-change: font-variation-settings;
  backface-visibility: hidden;
}

/* Clean up after animation */
.wb-variable-proximity-completed .wb-variable-proximity__char {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-variable-proximity .wb-variable-proximity__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Default styling */
.wb-variable-proximity {
  font-size: clamp(16px, 4vw, 48px);
  color: currentColor;
}
`;

class VariableProximityAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'VariableProximity';
    this.componentClasses = webflowBitsClasses.forComponent('variable-proximity');
    this.animationFrameId = null;
    this.defaultConfig = {
      fromFontVariationSettings: "'wght' 100, 'opsz' 8",
      toFontVariationSettings: "'wght' 900, 'opsz' 144",
      radius: 50,
      falloff: 'linear', // 'linear', 'exponential', 'gaussian'
      containerSelector: null, // If null, uses the element itself as container
      threshold: 0.1,
      rootMargin: '0px'
    };
    
    this.mousePosition = { x: 0, y: 0 };
    this.lastMousePosition = { x: null, y: null };
    this.activeInstances = new Set();
    
    // this.injectComponentStyles();
    this.setupGlobalMouseTracking();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-variable-proximity-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: VariableProximity styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject VariableProximity styles', error);
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
   * Setup global mouse tracking for performance
   */
  setupGlobalMouseTracking() {
    const updateMousePosition = (event) => {
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;
    };

    const updateTouchPosition = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        this.mousePosition.x = touch.clientX;
        this.mousePosition.y = touch.clientY;
      }
    };

    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('touchmove', updateTouchPosition, { passive: true });
    
    this.startAnimationLoop();
  }

  /**
   * Start the main animation loop
   */
  startAnimationLoop() {
    const animate = () => {
      if (this.activeInstances.size > 0) {
        // Only update if mouse position changed
        if (this.lastMousePosition.x !== this.mousePosition.x || 
            this.lastMousePosition.y !== this.mousePosition.y) {
          
          this.lastMousePosition.x = this.mousePosition.x;
          this.lastMousePosition.y = this.mousePosition.y;
          
          this.activeInstances.forEach(instance => {
            this.updateProximityEffect(instance);
          });
        }
      }
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      {
        // VariableProximity-specific attributes
        fromFontVariationSettings: { attribute: 'wb-from-font-variation', type: 'string' },
        toFontVariationSettings: { attribute: 'wb-to-font-variation', type: 'string' },
        radius: { attribute: 'wb-radius', type: 'number', parser: parseInt, min: 10 },
        falloff: { 
          attribute: 'wb-falloff', 
          type: 'string', 
          validValues: ['linear', 'exponential', 'gaussian'] 
        },
        containerSelector: { attribute: 'wb-container', type: 'string' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Parse font variation settings string into Map
   */
  parseFontVariationSettings(settingsStr) {
    const settings = new Map();
    
    try {
      const pairs = settingsStr.split(',').map(s => s.trim());
      pairs.forEach(pair => {
        const match = pair.match(/'([^']+)'\s+([\d.-]+)/);
        if (match) {
          const [, axis, value] = match;
          settings.set(axis, parseFloat(value));
        }
      });
    } catch (error) {
      console.warn('WebflowBits VariableProximity: Failed to parse font variation settings', error);
    }
    
    return settings;
  }

  /**
   * Initialize element for variable proximity animation
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
        console.warn('WebflowBits VariableProximity: Element has no text content', element);
        return;
      }

      // Parse font variation settings
      const fromSettings = this.parseFontVariationSettings(config.fromFontVariationSettings);
      const toSettings = this.parseFontVariationSettings(config.toFontVariationSettings);
      
      // Create parsed settings for interpolation
      const parsedSettings = Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));

      // Determine container element
      let containerElement = element;
      if (config.containerSelector) {
        const container = document.querySelector(config.containerSelector);
        if (container) {
          containerElement = container;
        } else {
          console.warn('WebflowBits VariableProximity: Container not found, using element itself');
        }
      }

      // Create wrapper structure
      this.createProximityStructure(element, originalText);
      
      // Create instance data
      const instance = {
        element,
        containerElement,
        config,
        originalText,
        parsedSettings,
        splitText: null,
        chars: [],
        isActive: false,
        addedClasses: []
      };

      this.instances.set(element, instance);

      // Apply CSS classes
      ComponentClassManager.applyClasses(
        element, 
        ['wb-variable-proximity'], 
        this.instances, 
        this.componentName
      );

      // Initialize SplitText
      this.initializeSplitText(instance);

      // Setup event listeners
      this.setupEventListeners(instance);

      console.log('WebflowBits VariableProximity: Element initialized', { element, config });

      // Dispatch initialization event
      element.dispatchEvent(new CustomEvent('wb-variable-proximity-init', {
        detail: { element, config },
        bubbles: true
      }));

    } catch (error) {
      console.error('WebflowBits VariableProximity: Failed to initialize element', error);
    }
  }

  /**
   * Create the HTML structure for variable proximity animation
   */
  createProximityStructure(element, originalText) {
    // Create structure that preserves spaces
    const words = originalText.split(' ');
    let letterIndex = 0;
    
    const wordElements = words.map((word, wordIndex) => {
      const wordSpan = `<span class="wb-variable-proximity__word">${word}</span>`;
      const spaceSpan = wordIndex < words.length - 1 ? 
        '<span class="wb-variable-proximity__space">&nbsp;</span>' : '';
      return wordSpan + spaceSpan;
    }).join('');

    element.innerHTML = `
      <span class="wb-variable-proximity__content" aria-hidden="true">
        ${wordElements}
      </span>
      <span class="wb-variable-proximity__sr-only">${originalText}</span>
    `;
  }

  /**
   * Initialize SplitText for character-level animation
   */
  initializeSplitText(instance) {
    const { element, config, parsedSettings } = instance;
    const wordElements = element.querySelectorAll('.wb-variable-proximity__word');
    
    if (!wordElements.length) return;

    try {
      const allChars = [];
      
      wordElements.forEach(wordElement => {
        // Create SplitText for each word
        const splitText = new SplitText(wordElement, {
          type: "chars",
          charsClass: "wb-variable-proximity__char"
        });
        
        allChars.push(...splitText.chars);
      });

      instance.chars = allChars;

      // Set initial font variation settings
      instance.chars.forEach((char) => {
        gsap.set(char, {
          display: 'inline-block',
          fontVariationSettings: config.fromFontVariationSettings
        });
      });

      console.log('WebflowBits VariableProximity: SplitText initialized', instance.chars.length, 'characters');

    } catch (error) {
      console.error('WebflowBits VariableProximity: Failed to initialize SplitText', error);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners(instance) {
    const { element, containerElement } = instance;

    const handlePointerEnter = () => this.activateInstance(instance);
    const handlePointerLeave = () => this.deactivateInstance(instance);

    // Use container element for mouse tracking
    containerElement.addEventListener('pointerenter', handlePointerEnter);
    containerElement.addEventListener('pointerleave', handlePointerLeave);

    // Store references for cleanup
    instance.pointerEnterHandler = handlePointerEnter;
    instance.pointerLeaveHandler = handlePointerLeave;
  }

  /**
   * Activate instance for proximity tracking
   */
  activateInstance(instance) {
    const { element } = instance;

    instance.isActive = true;
    this.activeInstances.add(instance);

    // Apply animating state
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-variable-proximity', 
      this.instances, 
      this.componentName
    );

    // Dispatch start event
    element.dispatchEvent(new CustomEvent('wb-variable-proximity-start', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Deactivate instance
   */
  deactivateInstance(instance) {
    const { element, config, chars } = instance;

    instance.isActive = false;
    this.activeInstances.delete(instance);

    // Reset all characters to initial state
    if (chars && chars.length) {
      chars.forEach((char) => {
        gsap.to(char, {
          duration: 0.3,
          fontVariationSettings: config.fromFontVariationSettings,
          ease: "power2.out"
        });
      });
    }

    // Apply completed state
    ComponentClassManager.setAnimationState(
      element, 
      'completed', 
      'wb-variable-proximity', 
      this.instances, 
      this.componentName
    );

    // Dispatch stop event
    element.dispatchEvent(new CustomEvent('wb-variable-proximity-stop', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Update proximity effect for an instance
   */
  updateProximityEffect(instance) {
    if (!instance.isActive || !instance.chars.length) return;

    const { containerElement, config, parsedSettings, chars } = instance;
    const containerRect = containerElement.getBoundingClientRect();

    // Calculate mouse position relative to container
    const relativeMouseX = this.mousePosition.x - containerRect.left;
    const relativeMouseY = this.mousePosition.y - containerRect.top;

    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2 - containerRect.left;
      const charCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = this.calculateDistance(
        relativeMouseX,
        relativeMouseY,
        charCenterX,
        charCenterY
      );

      if (distance >= config.radius) {
        // Outside radius, use from settings
        gsap.set(char, {
          fontVariationSettings: config.fromFontVariationSettings
        });
        return;
      }

      // Calculate falloff and interpolate
      const falloffValue = this.calculateFalloff(distance, config.radius, config.falloff);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      gsap.set(char, {
        fontVariationSettings: newSettings
      });
    });
  }

  /**
   * Calculate distance between two points
   */
  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  /**
   * Calculate falloff value based on distance and falloff type
   */
  calculateFalloff(distance, radius, falloffType) {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    
    switch (falloffType) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }

  /**
   * Initialize all elements with wb-text-animate="variable-proximity"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="variable-proximity"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    try {
      // Deactivate instance
      this.deactivateInstance(instance);

      // Remove event listeners
      if (instance.pointerEnterHandler) {
        instance.containerElement.removeEventListener('pointerenter', instance.pointerEnterHandler);
        instance.containerElement.removeEventListener('pointerleave', instance.pointerLeaveHandler);
      }

      // Revert SplitText - need to revert each word's SplitText
      const wordElements = element.querySelectorAll('.wb-variable-proximity__word');
      wordElements.forEach(wordElement => {
        if (wordElement._gsap && wordElement._gsap.splitText) {
          wordElement._gsap.splitText.revert();
        }
      });

      // Restore original content
      element.textContent = instance.originalText;

      // Remove CSS classes
      ComponentClassManager.removeClasses(
        element,
        ['wb-variable-proximity', 'wb-variable-proximity-animating', 'wb-variable-proximity-completed'],
        this.instances,
        this.componentName
      );

      // Remove instance
      this.instances.delete(element);

      console.log('WebflowBits VariableProximity: Element destroyed', element);

    } catch (error) {
      console.error('WebflowBits VariableProximity: Failed to destroy element', error);
    }
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    Array.from(this.instances.keys()).forEach(element => {
      this.destroyElement(element);
    });
    
    // Cancel animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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
    const conflicts = checkCSSConflicts(componentClassSets.variableProximity || [
      'wb-variable-proximity',
      'wb-variable-proximity__content',
      'wb-variable-proximity__word',
      'wb-variable-proximity__char',
      'wb-variable-proximity__space',
      'wb-variable-proximity__sr-only',
      'wb-variable-proximity-animating',
      'wb-variable-proximity-completed'
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
    
    // Re-parse settings if font variation settings changed
    if (newConfig.fromFontVariationSettings || newConfig.toFontVariationSettings) {
      const fromSettings = this.parseFontVariationSettings(instance.config.fromFontVariationSettings);
      const toSettings = this.parseFontVariationSettings(instance.config.toFontVariationSettings);
      
      instance.parsedSettings = Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }
    
    // Dispatch update event
    element.dispatchEvent(new CustomEvent('wb-variable-proximity-update', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }
}

// Create and export singleton instance
const variableProximityAnimator = new VariableProximityAnimator();

// Export for external usage
export default variableProximityAnimator;

// Add to component class sets for conflict detection
if (typeof componentClassSets !== 'undefined') {
  componentClassSets.variableProximity = [
    'wb-variable-proximity',
    'wb-variable-proximity__content',
    'wb-variable-proximity__word',
    'wb-variable-proximity__char',
    'wb-variable-proximity__space',
    'wb-variable-proximity__sr-only',
    'wb-variable-proximity-animating',
    'wb-variable-proximity-completed'
  ];
}
