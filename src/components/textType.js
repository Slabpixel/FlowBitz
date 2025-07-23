import { gsap } from "gsap";
import { injectStyles } from '../utils/injectStyles.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - TextType Component Styles */
.wb-text-type {
  display: inline-block;
  white-space: pre-wrap;
  position: relative;
}

.wb-text-type__content {
  display: inline-block;
}

.wb-text-type__cursor {
  margin-left: 0.25rem;
  display: inline-block;
  opacity: 1;
  will-change: opacity;
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
    
    this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-text-type-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: TextType styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject TextType styles', error);
    }
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const config = { ...this.defaultConfig };
    
    // Parse cursor character
    const cursorChar = element.getAttribute('wb-cursor-character');
    if (cursorChar && ['underscore', 'pipe', 'dot', 'block', 'full-block'].includes(cursorChar)) {
      config.cursorCharacter = cursorChar;
    }

    // Parse typing speed (in milliseconds)
    const typingSpeed = element.getAttribute('wb-typing-speed');
    if (typingSpeed && !isNaN(typingSpeed)) {
      config.typingSpeed = parseInt(typingSpeed);
    }

    // Parse pause duration (in milliseconds)
    const pauseDuration = element.getAttribute('wb-pause-duration');
    if (pauseDuration && !isNaN(pauseDuration)) {
      config.pauseDuration = parseInt(pauseDuration);
    }

    // Parse deleting speed (in milliseconds)
    const deletingSpeed = element.getAttribute('wb-deleting-speed');
    if (deletingSpeed && !isNaN(deletingSpeed)) {
      config.deletingSpeed = parseInt(deletingSpeed);
    }

    // Parse cursor blink duration (in seconds)
    const cursorBlinkDuration = element.getAttribute('wb-cursor-blink-duration');
    if (cursorBlinkDuration && !isNaN(cursorBlinkDuration)) {
      config.cursorBlinkDuration = parseFloat(cursorBlinkDuration);
    }

    // Parse show cursor (true/false)
    const showCursor = element.getAttribute('wb-show-cursor');
    if (showCursor !== null) {
      config.showCursor = showCursor !== 'false';
    }

    // Parse variable speed (true/false)
    const variableSpeed = element.getAttribute('wb-variable-speed');
    if (variableSpeed !== null) {
      config.variableSpeed = variableSpeed !== 'false';
    }

    // Parse variable speed min (in milliseconds)
    const variableSpeedMin = element.getAttribute('wb-variable-speed-min');
    if (variableSpeedMin && !isNaN(variableSpeedMin)) {
      config.variableSpeedMin = parseInt(variableSpeedMin);
    }

    // Parse variable speed max (in milliseconds)
    const variableSpeedMax = element.getAttribute('wb-variable-speed-max');
    if (variableSpeedMax && !isNaN(variableSpeedMax)) {
      config.variableSpeedMax = parseInt(variableSpeedMax);
    }

    // Parse loop (true/false)
    const loop = element.getAttribute('wb-loop');
    if (loop !== null) {
      config.loop = loop !== 'false';
    }

    // Parse threshold (0-1)
    const threshold = element.getAttribute('wb-threshold');
    if (threshold && !isNaN(threshold)) {
      config.threshold = parseFloat(threshold);
    }

    // Parse root margin
    const rootMargin = element.getAttribute('wb-root-margin');
    if (rootMargin) {
      config.rootMargin = rootMargin;
    }

    // Parse start on visible (true/false)
    const startOnVisible = element.getAttribute('wb-start-on-visible');
    if (startOnVisible !== null) {
      config.startOnVisible = startOnVisible !== 'false';
    }

    // Parse reverse mode (true/false)
    const reverseMode = element.getAttribute('wb-reverse-mode');
    if (reverseMode !== null) {
      config.reverseMode = reverseMode !== 'false';
    }

    // Parse hide cursor while typing (true/false)
    const hideCursorWhileTyping = element.getAttribute('wb-hide-cursor-while-typing');
    if (hideCursorWhileTyping !== null) {
      config.hideCursorWhileTyping = hideCursorWhileTyping !== 'false';
    }

    // Parse initial delay (in milliseconds)
    const initialDelay = element.getAttribute('wb-initial-delay');
    if (initialDelay && !isNaN(initialDelay)) {
      config.initialDelay = parseInt(initialDelay);
    }

    return config;
  }

  /**
   * Parse text content from element
   */
  parseTextContent(element) {
    // First priority: Check for <p> elements inside the container
    const paragraphs = element.querySelectorAll('p');
    if (paragraphs.length > 0) {
      const textArray = Array.from(paragraphs).map(p => p.textContent.trim()).filter(text => text);
      if (textArray.length > 0) {
        return textArray;
      }
    }

    // Second priority: Check for wb-text-array attribute for multiple texts
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
   * Apply component classes to element
   */
  applyComponentClasses(element, config) {
    element.classList.add('wb-text-type');
    element.classList.add('wb-text-type-animating');
    
    const instance = this.instances.get(element);
    if (instance) {
      instance.addedClasses = ['wb-text-type', 'wb-text-type-animating'];
    }
  }

  /**
   * Remove component classes from element
   */
  removeComponentClasses(element) {
    const instance = this.instances.get(element);
    if (instance && instance.addedClasses) {
      instance.addedClasses.forEach(className => {
        element.classList.remove(className);
      });
    }
    
    element.classList.remove('wb-text-type', 'wb-text-type-animating', 'wb-text-type-completed');
  }

  /**
   * Create DOM structure for typewriter effect
   */
  createDOMStructure(element, config) {
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
    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits TextType: Element is empty or invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits TextType: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    const textArray = this.parseTextContent(element);
    
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
      // Apply component classes
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
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
        
        // Dispatch sentence complete event
        instance.element.dispatchEvent(new CustomEvent('wb-text-type-sentence-complete', {
          detail: { 
            sentence: currentText, 
            index: instance.currentTextIndex,
            instance 
          },
          bubbles: true
        }));

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
   * Complete the animation
   */
  completeAnimation(instance) {
    instance.animationCompleted = true;
    
    // Update state classes
    instance.element.classList.remove('wb-text-type-animating');
    instance.element.classList.add('wb-text-type-completed');
    
    // Restore cursor visibility
    if (instance.config.hideCursorWhileTyping && instance.domStructure.cursorElement) {
      instance.domStructure.cursorElement.style.display = 'inline-block';
    }

    // Dispatch completion event
    instance.element.dispatchEvent(new CustomEvent('wb-text-type-complete', {
      detail: { instance },
      bubbles: true
    }));
  }

  /**
   * Initialize all elements with wb-text-animate="text-type"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="text-type"]');
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

    // Restore original content
    if (domStructure && domStructure.originalContent) {
      element.innerHTML = domStructure.originalContent;
    }

    // Remove component classes
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
    ScrollTrigger.refresh();
  }

  /**
   * Check for potential CSS conflicts
   */
  checkForConflicts() {
    const conflicts = [];
    const testClasses = ['wb-text-type', 'wb-text-type__content', 'wb-text-type__cursor'];
    
    testClasses.forEach(className => {
      const existing = document.querySelector(`.${className}:not([wb-text-animate])`);
      if (existing) {
        conflicts.push({
          className,
          element: existing,
          message: `Class "${className}" already exists in DOM outside of WebflowBits components`
        });
      }
    });

    if (conflicts.length > 0) {
      console.warn('WebflowBits TextType: Potential CSS conflicts detected:', conflicts);
      return conflicts;
    }

    return null;
  }
}

// Create singleton instance
const textTypeAnimator = new TextTypeAnimator();

// Export for use in other modules
export default textTypeAnimator;
export { TextTypeAnimator };
