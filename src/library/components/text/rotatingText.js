import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseAttribute } from '../../utils/core/attributeParser.js';

// Component CSS
const componentCSS = `
.wb-rotating-text {
  display: inline-block;
  position: relative;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  vertical-align: baseline;
  height: 100%;
  min-height: 1em;
  max-height: 1.2em;
}

.wb-rotating-text-center .wb-rotating-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wb-rotating-text-sr-only {
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

.wb-rotating-text-container {
  position: relative;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  vertical-align: baseline;
  height: 100%;
  min-height: 1em;
}

.wb-rotating-text-container.has-bg {
  padding: 0em 0.1em;
  border-radius: inherit;
}

.wb-rotating-text-element {
  display: inline-block;
  will-change: transform, opacity;
  transform-origin: center bottom;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  vertical-align: baseline;
}

.wb-rotating-text-space {
  white-space: pre;
}

.wb-rotating-animating .wb-rotating-text-element {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.wb-rotating-text-container .wb-rotating-text-element {
  position: relative;
  z-index: 1;
}

.wb-rotating-text-container > span {
  display: inline-block;
  overflow: hidden;
  height: 100%;
  position: relative;
}
`;

class RotatingTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
  }

  /**
   * Inject CSS styles
   */
  injectStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-rotating-text-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.warn('WebflowBits: Failed to inject RotatingText styles', error);
      }
    }

  /**
   * Initialize all rotating text elements
   */
  initAll() {
    setTimeout(() => {
      // Find elements with wb-component="rotating-text"
    const elements = document.querySelectorAll('[wb-component="rotating-text"]');
      
      elements.forEach(element => {
        // Skip if already processed
        if (element.classList.contains('wb-rotating-text')) {
          return;
        }
        
        // Skip if this element contains a child with wb-component="rotating-text"
        const childComponent = element.querySelector('[wb-component="rotating-text"]');
        if (childComponent && childComponent !== element) {
          return;
        }
        
        // Check if element has wb-text-* attributes before initializing
        const hasTextAttributes = element.hasAttribute('wb-text-1') || 
                                 element.hasAttribute('wb-text-2') || 
                                 element.hasAttribute('wb-text-3');
        
        if (!hasTextAttributes) {
          // Retry after a longer delay
          setTimeout(() => {
            if (!element.classList.contains('wb-rotating-text')) {
              this.initElement(element);
            }
          }, 200);
          return;
        }
        
        this.initElement(element);
      });
    }, 100);
  }

  /**
   * Initialize a single element
   */
  initElement(element) {
    // Add safety check to ensure this is actually a rotating-text element
    if (element.getAttribute('wb-component') !== 'rotating-text') {
      console.warn('WebflowBits RotatingText: Element does not have wb-component="rotating-text"', element);
      return;
    }

    this.injectStyles();
    
    // Parse texts from wb-text-* attributes
    const texts = this.parseTexts(element);
    if (texts.length === 0) {
      console.warn('WebflowBits: No texts found for rotating-text element', element);
        return;
      }

    // Parse configuration
    const config = {
      texts: texts,
      interval: parseInt(element.getAttribute('wb-rotating-interval')) || 2000,
      splitBy: element.getAttribute('wb-rotating-split-by') || 'characters',
      staggerDelay: parseInt(element.getAttribute('wb-rotating-stagger-duration')) || 50,
      staggerFrom: element.getAttribute('wb-rotating-stagger-from') || 'first',
      duration: parseFloat(element.getAttribute('wb-duration')) || 0.6,
      ease: element.getAttribute('wb-ease') || 'back.out(1.7)',
      loop: element.getAttribute('wb-rotating-loop') !== 'false',
      auto: element.getAttribute('wb-rotating-auto') !== 'false',
      bgColor: parseAttribute.color(element, 'wb-background-color'),
      textColor: parseAttribute.color(element, 'wb-text-color'),
      borderRadius: element.getAttribute('wb-border-radius') || null
    };

    // Create instance
    const instance = {
        element: element,
        config: config,
      currentIndex: 0,
        isAnimating: false,
        intervalId: null,
        splitElements: [],
        srElement: null,
      container: null,
      originalText: element.textContent
      };

    this.instances.set(element, instance);

    // Setup the element
    this.setupElement(instance);

    // Start auto rotation
    if (config.auto) {
      this.startAutoRotation(instance);
    }
  }

  /**
   * Parse texts from wb-text-* attributes
   */
  parseTexts(element) {
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
   * Setup element structure
   */
  setupElement(instance) {
    const { element, config } = instance;
    
    // Create screen reader text
    const srText = document.createElement('span');
    srText.className = 'wb-rotating-text-sr-only';
    srText.textContent = config.texts[0];
    
    // Create container
    const container = document.createElement('span');
    container.className = 'wb-rotating-text-container';
    container.setAttribute('aria-hidden', 'true');
    
    // Apply background color, text color, and border radius if specified
    if (config.bgColor) {
      container.classList.add('has-bg');
      container.style.backgroundColor = config.bgColor;
    }
    
    if (config.textColor) {
      container.style.color = config.textColor;
    }
    
    if (config.borderRadius) {
      container.style.borderRadius = config.borderRadius;
    }
    
    // Clear and setup element
    element.innerHTML = '';
    element.appendChild(srText);
    element.appendChild(container);
    element.classList.add('wb-rotating-text');
    
    // Always apply centering
    element.classList.add('wb-rotating-text-center');
    
    instance.srElement = srText;
    instance.container = container;
    
    // Synchronize height with parent element
    this.syncHeight(element);
    
    // Set initial text
    this.updateText(instance, 0, false);
  }

  /**
   * Synchronize height with parent element
   */
  syncHeight(element) {
    // Calculate height based on line height instead of parent height
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = computedStyle.lineHeight;
    const fontSize = computedStyle.fontSize;
    
    // Use line height if it's a number, otherwise use font size * 1.2
    let height;
    if (lineHeight === 'normal') {
      height = `calc(${fontSize} * 1.4)`;
    } else if (lineHeight.includes('px')) {
      height = lineHeight;
    } else {
      height = `calc(${fontSize} * ${parseFloat(lineHeight)})`;
    }
    
    element.style.height = height;
    const container = element.querySelector('.wb-rotating-text-container');
    if (container) {
      container.style.height = height;
    }
  }

  /**
   * Update displayed text
   */
  updateText(instance, newIndex, animate = true) {
    if (instance.isAnimating && animate) return;
    
    const newText = instance.config.texts[newIndex];
    if (!newText) return;
    
    instance.currentIndex = newIndex;
    instance.srElement.textContent = newText;
    
    if (animate && instance.splitElements.length > 0) {
      this.animateToText(instance, newText);
    } else {
      this.setTextDirectly(instance, newText);
    }
  }

  /**
   * Set text directly without animation
   */
  setTextDirectly(instance, text) {
    this.clearContainer(instance);
    this.createTextElements(instance, text);
    gsap.set(instance.splitElements, { y: 0, opacity: 1 });
  }

  /**
   * Animate to new text
   */
  animateToText(instance, newText) {
    if (instance.isAnimating) return;
    
    instance.isAnimating = true;
    instance.element.classList.add('wb-rotating-animating');
    
    const exitElements = [...instance.splitElements];
    const exitDuration = instance.config.duration * 0.6;
    
    // Exit animation
    if (exitElements.length > 0) {
      exitElements.forEach((element, index) => {
        const delay = this.getStaggerDelay(instance, index, exitElements.length);
        gsap.to(element, {
          y: '-100%',
          opacity: 0,
          duration: exitDuration,
          ease: instance.config.ease,
          delay: delay
        });
      });
    }
    
    // Create new text after exit
    const enterTime = exitDuration + 0.1;
    setTimeout(() => {
      this.clearContainer(instance);
      this.createTextElements(instance, newText);
      
      // Set initial state
      gsap.set(instance.splitElements, { y: '100%', opacity: 0 });
      
      // Enter animation
      instance.splitElements.forEach((element, index) => {
        const delay = this.getStaggerDelay(instance, index, instance.splitElements.length);
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: instance.config.duration,
          ease: instance.config.ease,
          delay: delay
        });
      });
      
      // Complete animation
      setTimeout(() => {
        instance.isAnimating = false;
        instance.element.classList.remove('wb-rotating-animating');
      }, enterTime + instance.config.duration * 1000);
      
    }, enterTime * 1000);
  }

  /**
   * Create text elements based on split type
   */
  createTextElements(instance, text) {
    const { splitBy } = instance.config;
    
    if (splitBy === 'characters') {
      const words = text.split(' ');
      words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.height = '100%';
        wordSpan.style.position = 'relative';
      
        // Split word into characters
        Array.from(word).forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'wb-rotating-text-element';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
          instance.splitElements.push(charSpan);
      });
      
        // Add space if not last word
        if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'wb-rotating-text-space';
        spaceSpan.textContent = ' ';
        wordSpan.appendChild(spaceSpan);
      }
      
        instance.container.appendChild(wordSpan);
      });
    } else if (splitBy === 'words') {
      const words = text.split(' ');
      words.forEach((word, index) => {
        // Create overflow wrapper for each word
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block';
        wordWrapper.style.overflow = 'hidden';
        wordWrapper.style.height = '100%';
        wordWrapper.style.position = 'relative';
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'wb-rotating-text-element';
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        wordWrapper.appendChild(wordSpan);
        instance.splitElements.push(wordSpan);
        instance.container.appendChild(wordWrapper);
        
        // Add space if not last word
        if (index < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'wb-rotating-text-space';
          spaceSpan.textContent = ' ';
          instance.container.appendChild(spaceSpan);
        }
      });
    } else {
      // Lines or other
      const lines = text.split('\n');
      lines.forEach(line => {
        // Create overflow wrapper for each line
        const lineWrapper = document.createElement('span');
        lineWrapper.style.display = 'block';
        lineWrapper.style.overflow = 'hidden';
        lineWrapper.style.height = '100%';
        lineWrapper.style.position = 'relative';
        
        const lineSpan = document.createElement('span');
        lineSpan.className = 'wb-rotating-text-element';
        lineSpan.textContent = line;
        lineSpan.style.display = 'block';
        lineWrapper.appendChild(lineSpan);
        instance.splitElements.push(lineSpan);
        instance.container.appendChild(lineWrapper);
      });
    }
  }

  /**
   * Get stagger delay
   */
  getStaggerDelay(instance, index, total) {
    const delay = instance.config.staggerDelay / 1000;
    
    switch (instance.config.staggerFrom) {
      case 'last':
        return (total - 1 - index) * delay;
      case 'center':
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * delay;
      case 'random':
        return Math.random() * delay;
      default: // 'first'
        return index * delay;
    }
  }

  /**
   * Clear container
   */
  clearContainer(instance) {
    instance.container.innerHTML = '';
    instance.splitElements = [];
  }

  /**
   * Move to next text
   */
  next(instance) {
    const nextIndex = instance.currentIndex === instance.config.texts.length - 1
      ? instance.config.loop ? 0 : instance.currentIndex
      : instance.currentIndex + 1;
    
    if (nextIndex !== instance.currentIndex) {
      this.updateText(instance, nextIndex);
      
      // Schedule next rotation after current animation completes
      if (instance.config.auto && instance.config.interval > 0) {
        this.scheduleNextRotation(instance);
      }
    }
  }

  /**
   * Start auto rotation
   */
  startAutoRotation(instance) {
    this.stopAutoRotation(instance);
    if (instance.config.auto && instance.config.interval > 0) {
      // Start the first rotation after the interval
      instance.intervalId = setTimeout(() => {
        this.next(instance);
      }, instance.config.interval);
    }
  }

  /**
   * Schedule next rotation after current animation completes
   */
  scheduleNextRotation(instance) {
    this.stopAutoRotation(instance);
    
    // Calculate total animation duration
    const exitDuration = instance.config.duration * 0.6;
    const enterDuration = instance.config.duration;
    const totalAnimationTime = (exitDuration + enterDuration) * 1000; // Convert to milliseconds
    
    // Schedule next rotation after animation completes + interval
    instance.intervalId = setTimeout(() => {
      this.next(instance);
    }, totalAnimationTime + instance.config.interval);
  }

  /**
   * Stop auto rotation
   */
  stopAutoRotation(instance) {
    if (instance.intervalId) {
      clearTimeout(instance.intervalId);
      instance.intervalId = null;
    }
  }

  /**
   * Destroy element
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (instance) {
      this.stopAutoRotation(instance);
      element.classList.remove('wb-rotating-text', 'wb-rotating-animating');
      element.innerHTML = instance.originalText;
      this.instances.delete(element);
    }
  }

  /**
   * Destroy all
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroyElement(element);
    });
  }

  /**
   * Refresh all
   */
  refresh() {
    this.instances.forEach(instance => {
      if (instance.config.auto && !instance.intervalId) {
        this.startAutoRotation(instance);
      }
    });
  }
}

// Create and export singleton
const rotatingTextAnimator = new RotatingTextAnimator();
export default rotatingTextAnimator;