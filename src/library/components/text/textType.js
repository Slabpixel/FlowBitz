import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager, PerformanceOptimizer } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - TextType Component Styles */
.wb-text-type {
  display: inline;
  white-space: pre-wrap;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.wb-text-type__content {
  display: inline;
}

.wb-text-type__cursor {
  display: inline;
  opacity: 1;
  will-change: opacity;
  vertical-align: baseline;
  margin-left: 0.1em;
  white-space: nowrap;
}

.wb-text-type__cursor--underscore::after { content: '_'; }
.wb-text-type__cursor--pipe::after { content: '|'; }
.wb-text-type__cursor--dot::after { content: '•'; }
.wb-text-type__cursor--block::after { 
  content: '▌'; 
  font-family: monospace;
}
.wb-text-type__cursor--full-block::after { 
  content: '█'; 
  font-family: monospace;
}

.wb-text-type__cursor--hidden {
  display: none;
}

/* Performance optimization during animation */
.wb-text-type-animating .wb-text-type__content,
.wb-text-type-animating .wb-text-type__cursor {
  will-change: opacity, transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Clean up after animation */
.wb-text-type-completed .wb-text-type__content,
.wb-text-type-completed .wb-text-type__cursor {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-text-type[aria-label] .wb-text-type__content {
  speak: none;
}
`;

class TextTypeAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'TextType';
    this.componentClasses = webflowBitsClasses.forComponent('text-type');
    this.defaultConfig = {
      cursorCharacter: "pipe", // underscore | pipe | dot | block | full-block
      typingSpeed: 50,
      pauseDuration: 2000,
      deletingSpeed: 30,
      cursorBlinkDuration: 0.5,
      showCursor: true,
      variableSpeed: false,
      variableSpeedMin: 30,
      variableSpeedMax: 100,
      loop: true,
      threshold: 0.1,
      rootMargin: "-100px",
      startOnVisible: false,
      reverseMode: false,
      hideCursorWhileTyping: false,
      initialDelay: 0
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-text-type-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.warn('WebflowBits: Failed to inject TextType styles', error);
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
        // TextType-specific attributes
        cursorCharacter: { 
          attribute: 'wb-cursor-character', 
          type: 'string', 
          validValues: ['underscore', 'pipe', 'dot', 'block', 'full-block'] 
        },
        typingSpeed: { attribute: 'wb-typing-speed', type: 'delay' },
        pauseDuration: { attribute: 'wb-pause-duration', type: 'delay' },
        deletingSpeed: { attribute: 'wb-deleting-speed', type: 'delay' },
        cursorBlinkDuration: { attribute: 'wb-cursor-blink-duration', type: 'duration' },
        showCursor: { attribute: 'wb-show-cursor', type: 'boolean' },
        variableSpeed: { attribute: 'wb-variable-speed', type: 'boolean' },
        variableSpeedMin: { attribute: 'wb-variable-speed-min', type: 'delay' },
        variableSpeedMax: { attribute: 'wb-variable-speed-max', type: 'delay' },
        loop: { attribute: 'wb-loop', type: 'boolean' },
        startOnVisible: { attribute: 'wb-start-on-visible', type: 'boolean' },
        reverseMode: { attribute: 'wb-reverse-mode', type: 'boolean' },
        hideCursorWhileTyping: { attribute: 'wb-hide-cursor-while-typing', type: 'boolean' },
        initialDelay: { attribute: 'wb-initial-delay', type: 'delay' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Parse text content from element
   */
  parseTextContent(element) {
    // First priority: Check for wb-text-1, wb-text-2, wb-text-3, etc. attributes
    const texts = this.parseTextsFromAttributes(element);
    if (texts.length > 0) {
      return texts;
    }

    // Second priority: Check for <p> elements inside the container
    const paragraphs = element.querySelectorAll('p');
    if (paragraphs.length > 0) {
      const textArray = Array.from(paragraphs).map(p => p.textContent.trim()).filter(text => text);
      if (textArray.length > 0) {
        return textArray;
      }
    }

    // Third priority: Check for wb-text-array attribute for multiple texts
    const textArrayAttr = element.getAttribute('wb-text-array');
    if (textArrayAttr) {
      try {
        return JSON.parse(textArrayAttr);
      } catch (error) {
        console.warn('WebflowBits TextType: Invalid JSON in wb-text-array', error);
      }
    }

    // Fallback: Use element text content (excluding nested elements)
    const textContent = element.textContent.trim();
    return textContent ? [textContent] : [''];
  }

  /**
   * Parse texts from wb-text-* attributes (similar to rotating-text)
   */
  parseTextsFromAttributes(element) {
    const texts = [];
    let index = 1;
    
    while (true) {
      const textAttr = element.getAttribute(`wb-text-${index}`);
      if (textAttr) {
        texts.push(textAttr.trim());
        index++;
      } else {
        break;
      }
    }
    
    return texts;
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent,
      this.componentClasses.animating
    ];
    
    ComponentClassManager.applyClasses(
      element, 
      classesToApply, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Remove component classes using utility functions
   */
  removeComponentClasses(element) {
    const fallbackClasses = [
      this.componentClasses.parent,
      this.componentClasses.animating,
      this.componentClasses.completed
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for typewriter effect
   */
  createDOMStructure(element, config, textArray) {
    // Store original content
    const originalContent = element.innerHTML;
    
    // Create content and cursor elements
    const contentSpan = document.createElement('span');
    contentSpan.className = 'wb-text-type__content';
    
    const cursorSpan = document.createElement('span');
    cursorSpan.className = `wb-text-type__cursor wb-text-type__cursor--${config.cursorCharacter}`;
    
    // Clear element and add new structure
    element.innerHTML = '';
    element.appendChild(contentSpan);
    
    if (config.showCursor) {
      element.appendChild(cursorSpan);
    }

    // Always start with empty content - the animation will handle typing
    contentSpan.textContent = '';

    return {
      originalContent,
      contentElement: contentSpan,
      cursorElement: cursorSpan
    };
  }

  /**
   * Get random speed for variable speed typing
   */
  getRandomSpeed(config) {
    if (!config.variableSpeed) return config.typingSpeed;
    const { variableSpeedMin, variableSpeedMax } = config;
    return Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin;
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element) {
      console.warn('WebflowBits TextType: Element is invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits TextType: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    const textArray = this.parseTextContent(element);
    
    // Check if we have valid text content to animate
    if (!textArray || textArray.length === 0 || textArray.every(text => !text.trim())) {
      console.warn('WebflowBits TextType: No valid text content found for animation');
      return;
    }
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      textArray,
      domStructure: null,
      cursorTimeline: null,
      typingTimeline: null,
      scrollTrigger: null,
      intersectionObserver: null,
      currentTextIndex: 0,
      currentCharIndex: 0,
      displayedText: '',
      isDeleting: false,
      isVisible: !config.startOnVisible,
      animationCompleted: false,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config, textArray);
      
      // Apply performance optimizations
      PerformanceOptimizer.optimizeForAnimation([
        instance.domStructure.contentElement,
        instance.domStructure.cursorElement
      ].filter(Boolean));
      
      // Setup animations
      this.setupAnimation(instance);
      
    } catch (error) {
      console.error('WebflowBits TextType: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Setup the typewriter animation
   */
  setupAnimation(instance) {
    const { element, config, domStructure } = instance;
    
    // Setup cursor blinking animation
    if (config.showCursor && domStructure.cursorElement) {
      this.setupCursorAnimation(instance);
    }

    // Setup intersection observer if startOnVisible is true
    if (config.startOnVisible) {
      this.setupIntersectionObserver(instance);
    } else {
      // Start immediately
      this.startTypingAnimation(instance);
    }
  }

  /**
   * Setup cursor blinking animation
   */
  setupCursorAnimation(instance) {
    const { config, domStructure } = instance;
    
    if (!domStructure.cursorElement) return;

    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(domStructure.cursorElement, {
      opacity: 0,
      duration: config.cursorBlinkDuration,
      ease: "power2.inOut"
    });

    instance.cursorTimeline = cursorTimeline;
  }

  /**
   * Setup intersection observer for start on visible
   */
  setupIntersectionObserver(instance) {
    const { element, config } = instance;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !instance.isVisible) {
            instance.isVisible = true;
            this.startTypingAnimation(instance);
            observer.disconnect();
          }
        });
      },
      { 
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    );

    observer.observe(element);
    instance.intersectionObserver = observer;
  }

  /**
   * Start the typing animation
   */
  startTypingAnimation(instance) {
    const { config } = instance;
    
    // Dispatch start event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      instance.element, 
      'start', 
      'text-type',
      { instance }
    );
    
    // Initial delay before starting
    gsap.delayedCall(config.initialDelay / 1000, () => {
      this.executeTypingStep(instance);
    });
  }

  /**
   * Execute a single typing step
   */
  executeTypingStep(instance) {
    const { config, textArray, domStructure } = instance;
    
    if (!instance.isVisible) return;

    const currentText = textArray[instance.currentTextIndex];
    const processedText = config.reverseMode 
      ? currentText.split("").reverse().join("") 
      : currentText;

    // Handle cursor visibility during typing
    if (config.hideCursorWhileTyping && domStructure.cursorElement) {
      const shouldHideCursor = instance.currentCharIndex < processedText.length || instance.isDeleting;
      domStructure.cursorElement.style.display = shouldHideCursor ? 'none' : 'inline-block';
    }

    if (instance.isDeleting) {
      // Deleting phase
      if (instance.displayedText === '') {
        instance.isDeleting = false;
        
        // Dispatch sentence complete event using utility
        AnimationStateManager.dispatchEvent(
          instance.element,
          'wb-text-type-sentence-complete',
          { 
            sentence: currentText, 
            index: instance.currentTextIndex,
            instance 
          }
        );

        if (instance.currentTextIndex === textArray.length - 1 && !config.loop) {
          // Animation completed
          this.completeAnimation(instance);
          return;
        }

        // Move to next text
        instance.currentTextIndex = (instance.currentTextIndex + 1) % textArray.length;
        instance.currentCharIndex = 0;
        
        // Pause before next text
        gsap.delayedCall(config.pauseDuration / 1000, () => {
          this.executeTypingStep(instance);
        });
      } else {
        // Delete character
        gsap.delayedCall(config.deletingSpeed / 1000, () => {
          instance.displayedText = instance.displayedText.slice(0, -1);
          domStructure.contentElement.textContent = instance.displayedText;
          this.executeTypingStep(instance);
        });
      }
    } else {
      // Typing phase
      if (instance.currentCharIndex < processedText.length) {
        // Type character
        const speed = config.variableSpeed ? this.getRandomSpeed(config) : config.typingSpeed;
        
        gsap.delayedCall(speed / 1000, () => {
          instance.displayedText += processedText[instance.currentCharIndex];
          instance.currentCharIndex++;
          domStructure.contentElement.textContent = instance.displayedText;
          this.executeTypingStep(instance);
        });
      } else if (textArray.length > 1) {
        // Pause before deleting
        gsap.delayedCall(config.pauseDuration / 1000, () => {
          instance.isDeleting = true;
          this.executeTypingStep(instance);
        });
      } else {
        // Single text completed
        this.completeAnimation(instance);
      }
    }
  }

  /**
   * Complete the animation using utility functions
   */
  completeAnimation(instance) {
    instance.animationCompleted = true;
    
    // Update state using utility
    AnimationStateManager.setCompletedState(instance.element, 'wb-text-type');
    
    // Clean up performance optimizations
    if (instance.domStructure) {
      PerformanceOptimizer.cleanupAfterAnimation([
        instance.domStructure.contentElement,
        instance.domStructure.cursorElement
      ].filter(Boolean));
    }
    
    // Restore cursor visibility
    if (instance.config.hideCursorWhileTyping && instance.domStructure.cursorElement) {
      instance.domStructure.cursorElement.style.display = 'inline-block';
    }

    // Dispatch completion event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      instance.element, 
      'complete', 
      'text-type',
      { instance }
    );
  }

  /**
   * Initialize all elements with wb-component="text-type"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="text-type"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { cursorTimeline, typingTimeline, scrollTrigger, intersectionObserver, domStructure } = instance;

    // Kill timelines
    if (cursorTimeline) {
      cursorTimeline.kill();
    }
    if (typingTimeline) {
      typingTimeline.kill();
    }

    // Kill ScrollTrigger
    if (scrollTrigger) {
      scrollTrigger.kill();
    }

    // Disconnect intersection observer
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }

    // Clean up performance optimizations
    if (domStructure) {
      PerformanceOptimizer.cleanupAfterAnimation([
        domStructure.contentElement,
        domStructure.cursorElement
      ].filter(Boolean));
    }

    // Restore original content
    if (domStructure && domStructure.originalContent) {
      element.innerHTML = domStructure.originalContent;
    }

    // Remove component classes using utility
    this.removeComponentClasses(element);

    // Remove from instances
    this.instances.delete(element);
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroy(element);
    });
  }

  /**
   * Refresh animations (useful for dynamic content)
   */
  refresh() {
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    return checkCSSConflicts(
      componentClassSets.textType, 
      this.componentName
    );
  }
}

// Create singleton instance
const textTypeAnimator = new TextTypeAnimator();

// Export for use in other modules
export default textTypeAnimator;
export { TextTypeAnimator };
