import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { createOnceAnimationConfig } from '../../utils/animation/scrollTriggerHelper.js';
import { AnimationStateManager, PerformanceOptimizer } from '../../utils/animation/animationStateManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - DecryptedText Component Styles */
.wb-decrypt-text {
  display: inline-block;
  position: relative;
}

.wb-decrypt-text__wrapper {
  display: inline-block;
  white-space: pre-wrap;
}

.wb-decrypt-text__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

.wb-decrypt-text__content {
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.wb-decrypt-text__word {
  display: inline-block;
  white-space: nowrap;
}

.wb-decrypt-text__char {
  display: inline-block;
  will-change: auto;
}

.wb-decrypt-text__space {
  display: inline-block;
  width: 0.25em;
  min-width: 0.25em;
}

/* Performance optimization during animation */
.wb-decrypt-text-animating .wb-decrypt-text__char {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Clean up after animation */
.wb-decrypt-text-completed .wb-decrypt-text__char {
  will-change: auto;
  backface-visibility: visible;
}

/* States for styling */
.wb-decrypt-text-scrambling .wb-decrypt-text__char {
  opacity: 0.8;
}

.wb-decrypt-text-revealed .wb-decrypt-text__char {
  opacity: 1;
}

/* Accessibility */
.wb-decrypt-text[aria-label] .wb-decrypt-text__content {
  speak: none;
}
`;

class DecryptedTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'DecryptedText';
    this.componentClasses = webflowBitsClasses.forComponent('decrypt-text');
    this.defaultConfig = {
      speed: 50,
      maxIterations: 10,
      sequential: true,
      revealDirection: 'start', // start | end | center
      useOriginalCharsOnly: false,
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      animateOn: 'view', // hover | view
      triggerOnView: true,
      threshold: 0.1,
      rootMargin: '100px',
      startDelay: 0,
      className: '',
      encryptedClassName: 'wb-decrypt-text-scrambling'
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-decrypt-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: DecryptedText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject DecryptedText styles', error);
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
        // DecryptedText-specific attributes
        speed: { attribute: 'wb-speed', type: 'delay' },
        maxIterations: { attribute: 'wb-max-iterations', type: 'number', parser: parseInt, min: 1 },
        sequential: { attribute: 'wb-sequential', type: 'boolean' },
        revealDirection: { 
          attribute: 'wb-reveal-direction', 
          type: 'string', 
          validValues: ['start', 'end', 'center'] 
        },
        useOriginalCharsOnly: { attribute: 'wb-use-original-chars', type: 'boolean' },
        characters: { attribute: 'wb-characters', type: 'string' },
        animateOn: { 
          attribute: 'wb-animate-on', 
          type: 'string', 
          validValues: ['hover', 'view'] 
        },
        triggerOnView: { attribute: 'wb-trigger-on-view', type: 'boolean' },
        rootMargin: { attribute: 'wb-root-margin', type: 'string' },
        startDelay: { attribute: 'wb-start-delay', type: 'number', parser: parseFloat, min: 0, max: 2, step: 0.1 },
        className: { attribute: 'wb-class-name', type: 'string' },
        encryptedClassName: { attribute: 'wb-encrypted-class-name', type: 'string' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Initialize element for decryption animation
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
        console.warn('WebflowBits DecryptedText: Element has no text content', element);
        return;
      }

      // Create wrapper structure
      this.createDecryptStructure(element, originalText, config);
      
      // Create instance data
      const instance = {
        element,
        config,
        originalText,
        displayText: originalText,
        isHovering: false,
        isScrambling: false,
        revealedIndices: new Set(),
        hasAnimated: false,
        interval: null,
        observer: null,
        addedClasses: []
      };

      this.instances.set(element, instance);

      // Apply CSS classes
      ComponentClassManager.applyClasses(
        element, 
        ['wb-decrypt-text'], 
        this.instances, 
        this.componentName
      );

      // Setup event listeners
      this.setupEventListeners(instance);

      // Setup intersection observer if needed
      if (config.animateOn === 'view') {
        if (config.triggerOnView) {
          this.setupIntersectionObserver(instance);
        } else {
          // Start immediately
          if (config.startDelay > 0) {
            setTimeout(() => {
              this.startDecryption(instance);
            }, config.startDelay * 1000);
          } else {
            this.startDecryption(instance);
          }
        }
      }

      console.log('WebflowBits DecryptedText: Element initialized', { element, config });

      // Dispatch initialization event
      element.dispatchEvent(new CustomEvent('wb-decrypt-text-init', {
        detail: { element, config },
        bubbles: true
      }));

    } catch (error) {
      console.error('WebflowBits DecryptedText: Failed to initialize element', error);
    }
  }

  /**
   * Create the HTML structure for decryption animation
   */
  createDecryptStructure(element, originalText, config) {
    // Store original text for screen readers
    element.setAttribute('aria-label', originalText);
    
    // Split text into words while preserving spaces
    const words = originalText.split(/(\s+)/);
    let charIndex = 0;
    
    // Create wrapper structure
    element.innerHTML = `
      <span class="wb-decrypt-text__sr-only">${originalText}</span>
      <span class="wb-decrypt-text__content" aria-hidden="true">
        ${words.map((word, wordIndex) => {
          if (word.match(/\s+/)) {
            // This is whitespace - render as space
            const spaceChars = word.split('').map(() => {
              const index = charIndex++;
              return `<span class="wb-decrypt-text__char wb-decrypt-text__space ${config.className}" data-index="${index}">&nbsp;</span>`;
            }).join('');
            return spaceChars;
          } else {
            // This is a word - wrap in a word container
            const wordChars = word.split('').map((char) => {
              const index = charIndex++;
              return `<span class="wb-decrypt-text__char ${config.className}" data-index="${index}">${char}</span>`;
            }).join('');
            return `<span class="wb-decrypt-text__word">${wordChars}</span>`;
          }
        }).join('')}
      </span>
    `;
  }

  /**
   * Setup event listeners for hover interactions
   */
  setupEventListeners(instance) {
    const { element, config } = instance;

    if (config.animateOn === 'hover') {
      const handleMouseEnter = () => this.startDecryption(instance);
      const handleMouseLeave = () => this.stopDecryption(instance);

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      // Store references for cleanup
      instance.mouseEnterHandler = handleMouseEnter;
      instance.mouseLeaveHandler = handleMouseLeave;
    }
  }

  /**
   * Setup ScrollTrigger for view-based animation
   */
  setupScrollTrigger(instance) {
    const { element, config } = instance;

    // Create ScrollTrigger config using utility
    const scrollTriggerConfig = createOnceAnimationConfig(
      element,
      config,
      (self) => {
        instance.scrollTrigger = self;
      }
    );

    // Create timeline with context for cleanup
    return gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: scrollTriggerConfig,
        onComplete: () => {
          // Animation complete
        }
      });

      // Add delay if specified
      if (config.startDelay > 0) {
        timeline.delay(config.startDelay);
      }

      // Start decryption when scroll trigger activates
      timeline.call(() => {
        if (!instance.hasAnimated) {
          this.startDecryption(instance);
          instance.hasAnimated = true;
        }
      });

      instance.timeline = timeline;
    }, element);
  }

  /**
   * Setup ScrollTrigger for view-based animation
   * Using ScrollTrigger instead of IntersectionObserver for better unit support
   */
  setupIntersectionObserver(instance) {
    const { element, config } = instance;

    // Use ScrollTrigger helper with support for all CSS units (px, %, vh, vw, em, rem)
    const triggerConfig = createOnceAnimationConfig(
      element,
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
        markers: false
      },
      (self) => {
        // Only trigger once when element enters viewport
        if (self.isActive && !instance.hasAnimated) {
          // Add delay if specified
          if (config.startDelay > 0) {
            setTimeout(() => {
              this.startDecryption(instance);
              instance.hasAnimated = true;
            }, config.startDelay * 1000);
          } else {
            this.startDecryption(instance);
            instance.hasAnimated = true;
          }
        }
      }
    );

    // Create ScrollTrigger instance
    instance.scrollTrigger = ScrollTrigger.create(triggerConfig);
  }

  /**
   * Start decryption animation
   */
  startDecryption(instance) {
    const { element, config } = instance;

    instance.isHovering = true;
    instance.isScrambling = true;
    instance.revealedIndices = new Set();

    // Apply animating state
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-decrypt-text', 
      this.instances, 
      this.componentName
    );

    // Start scrambling animation
    this.startScrambling(instance);

    // Dispatch start event
    element.dispatchEvent(new CustomEvent('wb-decrypt-text-start', {
      detail: { element, config },
      bubbles: true
    }));
  }

  /**
   * Stop decryption animation
   */
  stopDecryption(instance) {
    const { element, config } = instance;

    if (config.animateOn === 'view') return; // Don't stop view-based animations

    instance.isHovering = false;
    instance.isScrambling = false;
    instance.revealedIndices = new Set();

    // Clear interval
    if (instance.interval) {
      clearInterval(instance.interval);
      instance.interval = null;
    }

    // Reset to original text
    this.updateDisplayText(instance, instance.originalText);

    // Apply completed state
    ComponentClassManager.setAnimationState(
      element, 
      'completed', 
      'wb-decrypt-text', 
      this.instances, 
      this.componentName
    );

    // Dispatch stop event
    element.dispatchEvent(new CustomEvent('wb-decrypt-text-stop', {
      detail: { element, config },
      bubbles: true
    }));
  }

  /**
   * Start the scrambling animation loop
   */
  startScrambling(instance) {
    const { config, originalText } = instance;
    let currentIteration = 0;

    // Clear any existing interval
    if (instance.interval) {
      clearInterval(instance.interval);
    }

    instance.interval = setInterval(() => {
      if (!instance.isHovering && config.animateOn === 'hover') {
        clearInterval(instance.interval);
        return;
      }

      if (config.sequential) {
        // Sequential reveal mode
        if (instance.revealedIndices.size < originalText.length) {
          const nextIndex = this.getNextIndex(instance);
          instance.revealedIndices.add(nextIndex);
          this.updateDisplayText(instance, this.shuffleText(instance));
        } else {
          // Animation complete
          this.completeAnimation(instance);
        }
      } else {
        // Random scrambling mode
        this.updateDisplayText(instance, this.shuffleText(instance));
        currentIteration++;
        
        if (currentIteration >= config.maxIterations) {
          this.completeAnimation(instance);
        }
      }
    }, config.speed);
  }

  /**
   * Get next index to reveal based on direction
   */
  getNextIndex(instance) {
    const { config, originalText, revealedIndices } = instance;
    const textLength = originalText.length;

    switch (config.revealDirection) {
      case 'start':
        return revealedIndices.size;
      
      case 'end':
        return textLength - 1 - revealedIndices.size;
      
      case 'center': {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedIndices.size / 2);
        const nextIndex = revealedIndices.size % 2 === 0
          ? middle + offset
          : middle - offset - 1;

        if (nextIndex >= 0 && nextIndex < textLength && !revealedIndices.has(nextIndex)) {
          return nextIndex;
        }

        // Fallback: find first unrevealed index
        for (let i = 0; i < textLength; i++) {
          if (!revealedIndices.has(i)) return i;
        }
        return 0;
      }
      
      default:
        return revealedIndices.size;
    }
  }

  /**
   * Generate scrambled text
   */
  shuffleText(instance) {
    const { config, originalText, revealedIndices } = instance;

    if (config.useOriginalCharsOnly) {
      return this.shuffleWithOriginalChars(originalText, revealedIndices);
    } else {
      return this.shuffleWithCustomChars(originalText, revealedIndices, config.characters);
    }
  }

  /**
   * Shuffle using only original characters
   */
  shuffleWithOriginalChars(originalText, revealedIndices) {
    const positions = originalText.split('').map((char, i) => ({
      char,
      isSpace: char === ' ',
      index: i,
      isRevealed: revealedIndices.has(i)
    }));

    const nonSpaceChars = positions
      .filter(p => !p.isSpace && !p.isRevealed)
      .map(p => p.char);

    // Shuffle array
    for (let i = nonSpaceChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
    }

    let charIndex = 0;
    return positions
      .map(p => {
        if (p.isSpace) return ' ';
        if (p.isRevealed) return originalText[p.index];
        return nonSpaceChars[charIndex++];
      })
      .join('');
  }

  /**
   * Shuffle using custom characters
   */
  shuffleWithCustomChars(originalText, revealedIndices, characters) {
    const availableChars = characters.split('');
    
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (revealedIndices.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join('');
  }

  /**
   * Update the display text in DOM
   */
  updateDisplayText(instance, newText) {
    const { element, config } = instance;
    instance.displayText = newText;

    const contentElement = element.querySelector('.wb-decrypt-text__content');
    if (!contentElement) return;

    const chars = contentElement.querySelectorAll('.wb-decrypt-text__char');
    const textChars = newText.split('');

    chars.forEach((charElement, index) => {
      if (index < textChars.length) {
        const char = textChars[index];
        
        // Handle spaces specially
        if (char === ' ') {
          charElement.innerHTML = '&nbsp;';
          charElement.className = `wb-decrypt-text__char wb-decrypt-text__space ${
            instance.revealedIndices.has(index) || !instance.isScrambling ? config.className : config.encryptedClassName
          }`;
        } else {
          charElement.textContent = char;
          charElement.className = `wb-decrypt-text__char ${
            instance.revealedIndices.has(index) || !instance.isScrambling ? config.className : config.encryptedClassName
          }`;
        }
      }
    });
  }

  /**
   * Complete the animation
   */
  completeAnimation(instance) {
    const { element, config } = instance;

    // Clear interval
    if (instance.interval) {
      clearInterval(instance.interval);
      instance.interval = null;
    }

    instance.isScrambling = false;
    
    // Show final text
    this.updateDisplayText(instance, instance.originalText);

    // Apply completed state
    ComponentClassManager.setAnimationState(
      element, 
      'completed', 
      'wb-decrypt-text', 
      this.instances, 
      this.componentName
    );

    // Dispatch complete event
    element.dispatchEvent(new CustomEvent('wb-decrypt-text-complete', {
      detail: { element, config },
      bubbles: true
    }));
  }

  /**
   * Initialize all elements with wb-component="decrypted-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="decrypted-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    try {
      // Clear interval
      if (instance.interval) {
        clearInterval(instance.interval);
      }

      // Kill ScrollTrigger
      if (instance.scrollTrigger) {
        instance.scrollTrigger.kill();
      }

      // Kill timeline
      if (instance.timeline) {
        instance.timeline.kill();
      }

      // Disconnect observer
      if (instance.observer) {
        instance.observer.disconnect();
      }

      // Remove event listeners
      if (instance.mouseEnterHandler) {
        element.removeEventListener('mouseenter', instance.mouseEnterHandler);
        element.removeEventListener('mouseleave', instance.mouseLeaveHandler);
      }

      // Restore original content
      element.textContent = instance.originalText;
      element.removeAttribute('aria-label');

      // Remove CSS classes
      ComponentClassManager.removeClasses(
        element,
        ['wb-decrypt-text', 'wb-decrypt-text-animating', 'wb-decrypt-text-completed'],
        this.instances,
        this.componentName
      );

      // Remove instance
      this.instances.delete(element);

      console.log('WebflowBits DecryptedText: Element destroyed', element);

    } catch (error) {
      console.error('WebflowBits DecryptedText: Failed to destroy element', error);
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
    const conflicts = checkCSSConflicts(componentClassSets.decryptText || [
      'wb-decrypt-text',
      'wb-decrypt-text__content',
      'wb-decrypt-text__word',
      'wb-decrypt-text__char',
      'wb-decrypt-text__space',
      'wb-decrypt-text-animating',
      'wb-decrypt-text-completed'
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
    element.dispatchEvent(new CustomEvent('wb-decrypt-text-update', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }
}

// Create and export singleton instance
const decryptedTextAnimator = new DecryptedTextAnimator();

// Export for external usage
export default decryptedTextAnimator;

// Add to component class sets for conflict detection
if (typeof componentClassSets !== 'undefined') {
  componentClassSets.decryptText = [
    'wb-decrypt-text',
    'wb-decrypt-text__wrapper',
    'wb-decrypt-text__content',
    'wb-decrypt-text__word',
    'wb-decrypt-text__char',
    'wb-decrypt-text__space',
    'wb-decrypt-text__sr-only',
    'wb-decrypt-text-animating',
    'wb-decrypt-text-completed',
    'wb-decrypt-text-scrambling',
    'wb-decrypt-text-revealed'
  ];
}