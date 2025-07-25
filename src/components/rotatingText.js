import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { injectStyles } from "../utils/injectStyles.js";
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from "../utils/attributeParser.js";
import { ComponentClassManager, webflowBitsClasses } from "../utils/classManager.js";
import { checkCSSConflicts, componentClassSets } from "../utils/conflictDetector.js";

gsap.registerPlugin(SplitText);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - RotatingText Component Styles */
.wb-rotating-text {
  display: inline-flex;
  flex-wrap: wrap;
  white-space: pre-wrap;
  position: relative;
  overflow: hidden;
}

  .wb-rotating-text__content {
  display: inline-flex;
  flex-wrap: wrap;
  position: relative;
  min-height: 1em;
}

.wb-rotating-text__word {
  display: inline-flex;
}

.wb-rotating-text__text-container {
  display: inline-flex;
  flex-wrap: wrap;
}

.wb-rotating-text__char {
  display: inline-block;
  will-change: transform, opacity;
}

.wb-rotating-text__space {
  white-space: pre;
}

.wb-rotating-text__lines {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Screen reader only */
.wb-rotating-text__sr-only {
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

/* Animation states */
.wb-rotating-text-animating .wb-rotating-text__char {
  backface-visibility: hidden;
}

.wb-rotating-text-completed .wb-rotating-text__char {
  will-change: auto;
  backface-visibility: visible;
}
`;

// Animation presets
const animationPresets = {
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: '0%', opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  },
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: '0%', opacity: 1 },
    exit: { y: '100%', opacity: 0 }
  }
};

class RotatingTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'RotatingText';
    this.componentClasses = webflowBitsClasses.forComponent('rotating-text');
    this.defaultConfig = {
      texts: [],
      splitBy: 'characters',
      rotationInterval: 2000,
      auto: true,
      loop: true,
      staggerDuration: 0,
      staggerFrom: 'first',
      duration: 0.6,
      ease: 'power2.out',
      threshold: 0.1,
      rootMargin: '0px',
      animationPreset: 'slideUp'
    };
    
    console.log('WebflowBits RotatingText: Constructor initialized', {
      defaultConfig: this.defaultConfig,
      animationPresets: Object.keys(animationPresets)
    });

    this.injectComponentStyles();
  }

  /**
 * Inject component-specific CSS
 */
  injectComponentStyles() {
    if (this.stylesInjected) return;

    try {
      injectStyles('wb-rotating-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: RotatingText styles injected');
    } catch (error) {
      console.error('WebflowBits: Failed to inject RotatingText styles', error);
    }
  }

  /**
 * Parse texts from paragraph elements or fallback to content
 */
  parseTexts(element) {
    // Priority 1: <p> elements (recommended for Webflow)
    const paragraphs = element.querySelectorAll('p');
    if (paragraphs.length > 0) {
      return Array.from(paragraphs).map(p => p.textContent.trim()).filter(text => text);
    }
    
    // Priority 2: wb-texts attribute with JSON array
    const textsAttribute = element.getAttribute('wb-texts');
    if (textsAttribute) {
      try {
        const parsed = JSON.parse(textsAttribute);
        if (Array.isArray(parsed)) {
          return parsed.filter(text => text && typeof text === 'string');
        }
      } catch (error) {
        console.warn('WebflowBits RotatingText: Invalid JSON in wb-texts attribute', error);
      }
    }
    
    // Priority 3: Element text content as single text
    const textContent = element.textContent.trim();
    return textContent ? [textContent] : ['Sample Text'];
  }

  /**
 * Parse custom attributes from element
 */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      commonAttributeMaps.timing,
      {
        // RotatingText-specific attributes
        splitBy: { 
          attribute: 'wb-split-by', 
          type: 'string', 
          validValues: ['characters', 'words', 'lines'] 
        },
        rotationInterval: { attribute: 'wb-rotation-interval', type: 'number', parser: parseInt, min: 100 },
        auto: { attribute: 'wb-auto', type: 'boolean' },
        loop: { attribute: 'wb-loop', type: 'boolean' },
        staggerDuration: { attribute: 'wb-stagger-duration', type: 'number', parser: parseInt, min: 0 },
        staggerFrom: { 
          attribute: 'wb-stagger-from', 
          type: 'string', 
          validValues: ['first', 'last', 'center', 'random'] 
        },
        animationPreset: { 
          attribute: 'wb-animation-preset', 
          type: 'string', 
          validValues: ['slideUp', 'slideDown'] 
        }
      }
    );
    
         return parseElementConfig(element, this.defaultConfig, attributeMap);
   }

  /**
   * Initialize element for rotating text animation
   */
  initElement(element) {
    if (this.instances.has(element)) {
      return;
    }

    try {
      const config = this.parseConfig(element);
      const texts = this.parseTexts(element);
      
      if (texts.length === 0) {
        console.warn('WebflowBits RotatingText: No texts found', element);
        return;
      }

      // Validate texts content
      const validTexts = texts.filter(text => text && text.trim());
      if (validTexts.length === 0) {
        console.warn('WebflowBits RotatingText: No valid texts after filtering', element);
        return;
      }

      // Update config with parsed texts
      config.texts = validTexts;

      // Create wrapper structure
      this.createRotatingStructure(element, config);
      
      // Create instance data
      const instance = {
        element,
        config,
        texts: validTexts,
        currentIndex: 0,
        splitTextInstances: [],
        isAnimating: false,
        rotationTimer: null,
        observer: null,
        addedClasses: []
      };

      this.instances.set(element, instance);

      // Apply CSS classes
      ComponentClassManager.applyClasses(
        element, 
        ['wb-rotating-text'], 
        this.instances, 
        this.componentName
      );

      // Initialize first text
      this.initializeTexts(instance);

      // Setup rotation
      this.setupRotation(instance);

      console.log('WebflowBits RotatingText: Instance created', {
        element,
        config,
        texts: validTexts,
        splitTextInstances: instance.splitTextInstances.length
      });

      console.log('WebflowBits RotatingText: Element initialized', { 
        element, 
        config,
        contentElement: element.querySelector('.wb-rotating-text__content'),
        hasContent: !!element.querySelector('.wb-rotating-text__content').innerHTML
      });

      // Dispatch initialization event
      element.dispatchEvent(new CustomEvent('wb-rotating-text-init', {
        detail: { element, config, texts },
        bubbles: true
      }));

    } catch (error) {
      console.error('WebflowBits RotatingText: Failed to initialize element', error);
    }
  }

  /**
   * Create the HTML structure for rotating text
   */
  createRotatingStructure(element, config) {
    const { texts } = config;
    
    // Store original texts for screen reader
    const srText = texts.join(', ');
    
    element.innerHTML = `
      <span class="wb-rotating-text__sr-only">${srText}</span>
      <span class="wb-rotating-text__content" aria-hidden="true"></span>
    `;
    
    console.log('WebflowBits RotatingText: HTML structure created', {
      element,
      texts,
      innerHTML: element.innerHTML
    });
  }

  /**
   * Initialize texts with SplitText
   */
  initializeTexts(instance) {
    const { element, config, texts } = instance;
    const contentElement = element.querySelector('.wb-rotating-text__content');
    
    if (!contentElement) return;

    // Clear existing content
    contentElement.innerHTML = '';
    instance.splitTextInstances = [];

    texts.forEach((text, index) => {
      const textContainer = document.createElement('span');
      textContainer.className = config.splitBy === 'lines' ? 
        'wb-rotating-text__lines' : 'wb-rotating-text__text-container';
      textContainer.style.position = 'relative'; // Changed from absolute to relative
      textContainer.style.display = index === 0 ? 'inline-flex' : 'none'; // Use display instead of opacity
      textContainer.textContent = text;
      
      console.log('WebflowBits RotatingText: Creating text container', {
        index,
        text,
        className: textContainer.className,
        display: textContainer.style.display
      });
      
      contentElement.appendChild(textContainer);

      // Create SplitText instance
      let splitTextInstance;
      try {
        if (config.splitBy === 'characters') {
          splitTextInstance = new SplitText(textContainer, {
            type: "chars,words",
            charsClass: "wb-rotating-text__char",
            wordsClass: "wb-rotating-text__word"
          });
        } else if (config.splitBy === 'words') {
          splitTextInstance = new SplitText(textContainer, {
            type: "words",
            wordsClass: "wb-rotating-text__char" // Use char class for consistent styling
          });
        } else if (config.splitBy === 'lines') {
          splitTextInstance = new SplitText(textContainer, {
            type: "lines",
            linesClass: "wb-rotating-text__char"
          });
        }
        
        // Validate SplitText results
        if (splitTextInstance) {
          const elements = splitTextInstance.chars || splitTextInstance.words || splitTextInstance.lines;
          if (!elements || elements.length === 0) {
            console.warn('WebflowBits RotatingText: SplitText created no elements for text:', text);
          } else {
            console.log('WebflowBits RotatingText: SplitText created successfully', {
              textIndex: index,
              text,
              splitType: config.splitBy,
              elementsCount: elements.length,
              elements
            });
          }
        }
      } catch (error) {
        console.error('WebflowBits RotatingText: Failed to create SplitText instance:', error);
        splitTextInstance = null;
        
        // Fallback: make text visible without SplitText
        textContainer.style.display = index === 0 ? 'inline-flex' : 'none';
        console.log('WebflowBits RotatingText: Using fallback mode for text:', text);
      }

      // Store reference to the container element in splitText instance
      if (splitTextInstance) {
        splitTextInstance.element = textContainer;
      } else {
        // Create a fake splitText object for fallback
        splitTextInstance = {
          element: textContainer,
          chars: null,
          words: null,
          lines: null,
          revert: () => {} // Empty revert function
        };
      }
      
      instance.splitTextInstances.push(splitTextInstance);

      // Set initial state for non-current texts
      if (index !== 0 && splitTextInstance) {
        const animSettings = this.getAnimationSettings(config);
        const elements = splitTextInstance.chars || splitTextInstance.words || splitTextInstance.lines;
        if (elements && elements.length > 0) {
          gsap.set(elements, animSettings.initial);
        }
      }
    });
  }

  /**
   * Get animation settings based on preset
   */
  getAnimationSettings(config) {
    return animationPresets[config.animationPreset] || animationPresets.slideUp;
  }

  /**
   * Calculate stagger delay
   */
  calculateStaggerDelay(index, total, staggerFrom, staggerDuration) {
    if (staggerDuration === 0) return 0;
    
    switch (staggerFrom) {
      case 'first':
        return index * (staggerDuration / 1000);
      case 'last':
        return (total - 1 - index) * (staggerDuration / 1000);
      case 'center':
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * (staggerDuration / 1000);
      case 'random':
        return Math.random() * (staggerDuration / 1000);
      default:
        return index * (staggerDuration / 1000);
    }
  }

  /**
   * Setup rotation timing
   */
  setupRotation(instance) {
    const { config } = instance;

    if (!config.auto || config.texts.length <= 1) return;

          // Add small delay before starting rotation to ensure everything is initialized
      setTimeout(() => {
        instance.rotationTimer = setInterval(() => {
          if (!instance.isAnimating) {
            console.log('WebflowBits RotatingText: Auto-rotation tick', {
              currentIndex: instance.currentIndex,
              totalTexts: config.texts.length
            });
            this.nextText(instance);
          }
        }, config.rotationInterval);
        
        console.log('WebflowBits RotatingText: Auto-rotation started', {
          interval: config.rotationInterval,
          textsCount: config.texts.length
        });
      }, 100);
  }

  /**
   * Animate to next text
   */
  nextText(instance) {
    const { texts, currentIndex, config } = instance;
    let nextIndex = currentIndex + 1;
    
    if (nextIndex >= texts.length) {
      if (config.loop) {
        nextIndex = 0;
      } else {
        console.log('WebflowBits RotatingText: Reached end, not looping');
        return; // Stop if not looping
      }
    }
    
    console.log('WebflowBits RotatingText: nextText', {
      currentIndex,
      nextIndex,
      totalTexts: texts.length
    });
    
    this.animateToText(instance, nextIndex);
  }

  /**
   * Animate to previous text
   */
  previousText(instance) {
    const { texts, currentIndex, config } = instance;
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      if (config.loop) {
        prevIndex = texts.length - 1;
      } else {
        return;
      }
    }
    
    this.animateToText(instance, prevIndex);
  }

  /**
   * Jump to specific text index
   */
  jumpToText(instance, index) {
    const { texts } = instance;
    const validIndex = Math.max(0, Math.min(index, texts.length - 1));
    this.animateToText(instance, validIndex);
  }

  /**
   * Animate to specific text
   */
  animateToText(instance, newIndex) {
    const { element, config, currentIndex, splitTextInstances } = instance;
    
    if (newIndex === currentIndex || instance.isAnimating) return;

    // Validate indices
    if (newIndex < 0 || newIndex >= splitTextInstances.length) {
      console.warn('WebflowBits RotatingText: Invalid index', newIndex);
      return;
    }

    // Validate splitText instances
    if (!splitTextInstances[currentIndex] || !splitTextInstances[newIndex]) {
      console.warn('WebflowBits RotatingText: Missing splitText instances');
      return;
    }

    instance.isAnimating = true;

    // Apply animating state
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-rotating-text', 
      this.instances, 
      this.componentName
    );

    const currentSplit = splitTextInstances[currentIndex];
    const newSplit = splitTextInstances[newIndex];
    const animSettings = this.getAnimationSettings(config);

    const timeline = gsap.timeline({
      onComplete: () => {
        instance.currentIndex = newIndex;
        instance.isAnimating = false;

        // Apply completed state
        ComponentClassManager.setAnimationState(
          element, 
          'completed', 
          'wb-rotating-text', 
          this.instances, 
          this.componentName
        );

        // Dispatch change event
        element.dispatchEvent(new CustomEvent('wb-rotating-text-change', {
          detail: { 
            element, 
            config, 
            currentIndex: newIndex, 
            currentText: config.texts[newIndex] 
          },
          bubbles: true
        }));
      }
    });

    // Exit current text
    if (currentSplit) {
      const currentElements = currentSplit.chars || currentSplit.words || currentSplit.lines;
      if (currentElements && currentElements.length > 0) {
        currentElements.forEach((el, i) => {
          if (el) {
            const delay = this.calculateStaggerDelay(i, currentElements.length, config.staggerFrom, config.staggerDuration);
            timeline.to(el, {
              ...animSettings.exit,
              duration: config.duration,
              ease: config.ease,
              delay
            }, 0);
          }
        });
      }
    }

    // Enter new text
    if (newSplit) {
      const newElements = newSplit.chars || newSplit.words || newSplit.lines;
      
      // Show new container first
      const newContainer = splitTextInstances[newIndex].element || 
                         element.querySelectorAll('.wb-rotating-text__text-container, .wb-rotating-text__lines')[newIndex];
      if (newContainer) {
        newContainer.style.display = 'inline-flex';
      }
      
      if (newElements && newElements.length > 0) {
        // Set initial state
        gsap.set(newElements, animSettings.initial);

        newElements.forEach((el, i) => {
          if (el) {
            const delay = this.calculateStaggerDelay(i, newElements.length, config.staggerFrom, config.staggerDuration);
            timeline.to(el, {
              ...animSettings.animate,
              duration: config.duration,
              ease: config.ease,
              delay: delay + 0.1 // Small offset to avoid overlap
            }, 0.1);
          }
        });
      } else {
        // Fallback: just show the container (no SplitText animation)
        console.log('WebflowBits RotatingText: Using fallback animation - no SplitText elements');
        timeline.set(newContainer, { opacity: 1 }, 0.1);
      }
    }

    // Hide current container after animation
    const currentContainer = splitTextInstances[currentIndex]?.element || 
                           element.querySelectorAll('.wb-rotating-text__text-container, .wb-rotating-text__lines')[currentIndex];
    if (currentContainer) {
      timeline.call(() => {
        currentContainer.style.display = 'none';
      }, [], 0.5);
    }
  }

  /**
   * Initialize all elements with wb-text-animate="rotating-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="rotating-text"]');
    console.log('WebflowBits RotatingText: initAll found elements:', elements.length);
    elements.forEach((element, index) => {
      console.log(`Initializing element ${index}:`, element);
      this.initElement(element);
    });
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    try {
      // Clear rotation timer
      if (instance.rotationTimer) {
        clearInterval(instance.rotationTimer);
      }

      // Disconnect observer
      if (instance.observer) {
        instance.observer.disconnect();
      }

      // Revert SplitText instances
      instance.splitTextInstances.forEach(splitText => {
        if (splitText) {
          splitText.revert();
        }
      });

      // Restore original content
      element.textContent = instance.texts[instance.currentIndex] || instance.texts[0];

      // Remove CSS classes
      ComponentClassManager.removeClasses(
        element,
        ['wb-rotating-text', 'wb-rotating-text-animating', 'wb-rotating-text-completed'],
        this.instances,
        this.componentName
      );

      // Remove instance
      this.instances.delete(element);

      console.log('WebflowBits RotatingText: Element destroyed', element);

    } catch (error) {
      console.error('WebflowBits RotatingText: Failed to destroy element', error);
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
    const conflicts = checkCSSConflicts(componentClassSets.rotatingText || [
      'wb-rotating-text',
      'wb-rotating-text__content',
      'wb-rotating-text__word',
      'wb-rotating-text__char',
      'wb-rotating-text__space',
      'wb-rotating-text__lines',
      'wb-rotating-text__sr-only',
      'wb-rotating-text-animating',
      'wb-rotating-text-completed'
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
    
    // Restart rotation if interval changed
    if (newConfig.rotationInterval !== undefined || newConfig.auto !== undefined) {
      if (instance.rotationTimer) {
        clearInterval(instance.rotationTimer);
      }
      this.setupRotation(instance);
    }
    
    // Dispatch update event
    element.dispatchEvent(new CustomEvent('wb-rotating-text-update', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Manual control methods
   */
  next(element) {
    const instance = this.getInstance(element);
    if (instance) this.nextText(instance);
  }

  previous(element) {
    const instance = this.getInstance(element);
    if (instance) this.previousText(instance);
  }

  jumpTo(element, index) {
    const instance = this.getInstance(element);
    if (instance) this.jumpToText(instance, index);
  }

  pause(element) {
    const instance = this.getInstance(element);
    if (instance && instance.rotationTimer) {
      clearInterval(instance.rotationTimer);
      instance.rotationTimer = null;
      
      element.dispatchEvent(new CustomEvent('wb-rotating-text-pause', {
        detail: { element, config: instance.config },
        bubbles: true
      }));
    }
  }

  resume(element) {
    const instance = this.getInstance(element);
    if (instance && !instance.rotationTimer && instance.config.auto) {
      this.setupRotation(instance);
      
      element.dispatchEvent(new CustomEvent('wb-rotating-text-resume', {
        detail: { element, config: instance.config },
        bubbles: true
      }));
    }
  }

  reset(element) {
    const instance = this.getInstance(element);
    if (instance) {
      this.jumpToText(instance, 0);
      
      element.dispatchEvent(new CustomEvent('wb-rotating-text-reset', {
        detail: { element, config: instance.config },
        bubbles: true
      }));
    }
  }
};

// Create and export singleton instance
const rotatingTextAnimator = new RotatingTextAnimator();

// Export for external usage
export default rotatingTextAnimator;

// Add to component class sets for conflict detection
if (typeof componentClassSets !== 'undefined') {
  componentClassSets.rotatingText = [
    'wb-rotating-text',
    'wb-rotating-text__content',
    'wb-rotating-text__word',
    'wb-rotating-text__char',
    'wb-rotating-text__space',
    'wb-rotating-text__lines',
    'wb-rotating-text__sr-only',
    'wb-rotating-text-animating',
    'wb-rotating-text-completed'
  ];
}