import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { injectStyles } from '../utils/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../utils/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../utils/classManager.js';
import { checkCSSConflicts } from '../utils/conflictDetector.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - RotatingText Component Styles */
.wb-rotating-text {
  display: inline-flex;
  flex-wrap: wrap;
  white-space: pre-wrap;
  position: relative;
  line-height: 1.5;
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
  display: inline-flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 1.5em; /* Precise masking - only show 1 line height */
}

.wb-rotating-text-word {
  display: inline-flex;
  line-height: inherit;
}

.wb-rotating-text-lines {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  height: auto;
}

.wb-rotating-text-lines .wb-rotating-text-container {
  height: auto; /* Override height for lines mode */
}

.wb-rotating-text-element {
  display: inline-block;
  will-change: transform, opacity;
  line-height: inherit;
  transform-origin: center bottom;
}

.wb-rotating-text-space {
  white-space: pre;
}

/* Performance optimization during animation */
.wb-rotating-animating .wb-rotating-text-element {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-rotating-completed .wb-rotating-text-element {
  will-change: auto;
  backface-visibility: visible;
}
`;

class RotatingTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'RotatingText';
    this.componentClasses = webflowBitsClasses.forComponent('rotating');
    this.defaultConfig = {
      texts: ['Text 1', 'Text 2', 'Text 3'],
      rotationInterval: 2000,
      splitBy: 'characters',
      staggerDuration: 50,
      staggerFrom: 'first',
      ease: 'back.out(1.7)',
      duration: 0.6,
      loop: true,
      auto: true,
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100%', opacity: 0 }
    };
    
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
      console.warn('WebflowBits: Failed to inject RotatingText styles', error);
    }
  }

  /**
   * Initialize all rotating text elements
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="rotating-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Initialize a single rotating text element
   */
  initElement(element) {
    if (this.instances.has(element)) {
      this.destroyElement(element);
    }

    try {
      // Parse configuration from data attributes
      const config = this.parseConfig(element);
      
      // Validate configuration
      if (!config.texts || config.texts.length === 0) {
        console.warn('WebflowBits: RotatingText requires texts array', element);
        return;
      }

      // Apply component classes
      this.applyComponentClasses(element, config);

      // Create instance data
      const instanceData = {
        element: element,
        config: config,
        currentTextIndex: 0,
        isAnimating: false,
        intervalId: null,
        timeline: null,
        splitElements: [],
        originalText: element.textContent,
        srElement: null,
        container: null
      };

      this.instances.set(element, instanceData);

      // Initialize the instance
      this.initInstanceData(instanceData);

    } catch (error) {
      console.error('WebflowBits: Failed to initialize RotatingText element', error, element);
    }
  }

  /**
   * Parse configuration from element attributes using utility functions
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      commonAttributeMaps.timing,
      {
        // RotatingText-specific attributes
        rotationInterval: { attribute: 'wb-rotating-interval', type: 'number', parser: parseInt },
        splitBy: { 
          attribute: 'wb-rotating-split-by', 
          type: 'string',
          validValues: ['characters', 'words', 'lines']
        },
        staggerDuration: { attribute: 'wb-rotating-stagger-duration', type: 'number', parser: parseInt },
        staggerFrom: { 
          attribute: 'wb-rotating-stagger-from', 
          type: 'string',
          validValues: ['first', 'last', 'center', 'random']
        },
        loop: { attribute: 'wb-rotating-loop', type: 'boolean' },
        auto: { attribute: 'wb-rotating-auto', type: 'boolean' },
        initialY: { attribute: 'wb-rotating-initial-y', type: 'string' },
        initialOpacity: { attribute: 'wb-rotating-initial-opacity', type: 'number', parser: parseFloat },
        animateY: { attribute: 'wb-rotating-animate-y', type: 'string' },
        animateOpacity: { attribute: 'wb-rotating-animate-opacity', type: 'number', parser: parseFloat },
        exitY: { attribute: 'wb-rotating-exit-y', type: 'string' },
        exitOpacity: { attribute: 'wb-rotating-exit-opacity', type: 'number', parser: parseFloat }
      }
    );

    const parsed = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Handle texts attribute manually since it needs custom parsing
    const textsAttr = element.getAttribute('wb-rotating-texts');
    if (textsAttr) {
      try {
        parsed.texts = JSON.parse(textsAttr);
      } catch {
        parsed.texts = textsAttr.split(',').map(text => text.trim());
      }
    }
    
    // Handle custom initial, animate, and exit configurations
    if (parsed.initialY !== undefined || parsed.initialOpacity !== undefined) {
      parsed.initial = {
        y: parsed.initialY || this.defaultConfig.initial.y,
        opacity: parsed.initialOpacity !== undefined ? parsed.initialOpacity : this.defaultConfig.initial.opacity
      };
    }
    
    if (parsed.animateY !== undefined || parsed.animateOpacity !== undefined) {
      parsed.animate = {
        y: parsed.animateY || this.defaultConfig.animate.y,
        opacity: parsed.animateOpacity !== undefined ? parsed.animateOpacity : this.defaultConfig.animate.opacity
      };
    }
    
    if (parsed.exitY !== undefined || parsed.exitOpacity !== undefined) {
      parsed.exit = {
        y: parsed.exitY || this.defaultConfig.exit.y,
        opacity: parsed.exitOpacity !== undefined ? parsed.exitOpacity : this.defaultConfig.exit.opacity
      };
    }

    return parsed;
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent || 'wb-rotating-text'
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
      this.componentClasses.parent || 'wb-rotating-text',
      this.componentClasses.animating || 'wb-rotating-animating',
      this.componentClasses.completed || 'wb-rotating-completed'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Initialize instance data and setup
   */
  initInstanceData(instanceData) {
    try {
      // Create structure
      this.createStructure(instanceData);
      
      // Set initial text
      this.updateText(instanceData, 0, false);
      
      // Start auto rotation if enabled
      if (instanceData.config.auto) {
        this.startAutoRotation(instanceData);
      }
      
      // Expose API
      this.exposeAPI(instanceData);
      
    } catch (error) {
      console.error('WebflowBits: Failed to initialize RotatingText instance', error);
    }
  }

  /**
   * Create the HTML structure
   */
  createStructure(instanceData) {
    const { element, config } = instanceData;
    
    // Create screen reader only text
    const srText = document.createElement('span');
    srText.className = 'wb-rotating-text-sr-only';
    srText.textContent = config.texts[0];
    
    // Create container for visible text
    const container = document.createElement('span');
    container.className = 'wb-rotating-text-container';
    container.setAttribute('aria-hidden', 'true');
    
    // Clear element and add structure
    element.innerHTML = '';
    element.appendChild(srText);
    element.appendChild(container);
    
    instanceData.srElement = srText;
    instanceData.container = container;
  }

  /**
   * Update the displayed text
   */
  updateText(instanceData, newIndex, animate = true) {
    if (instanceData.isAnimating && animate) return;
    
    const newText = instanceData.config.texts[newIndex];
    if (!newText) return;
    
    instanceData.currentTextIndex = newIndex;
    
    // Update screen reader text
    instanceData.srElement.textContent = newText;
    
    if (animate && instanceData.splitElements.length > 0) {
      this.animateToNewText(instanceData, newText);
    } else {
      this.setTextDirectly(instanceData, newText);
    }
  }

  /**
   * Set text directly without animation
   */
  setTextDirectly(instanceData, text) {
    this.clearContainer(instanceData);
    this.createTextElements(instanceData, text);
    
    // Set initial state for elements
    gsap.set(instanceData.splitElements, instanceData.config.animate);
  }

  /**
   * Animate to new text
   */
  animateToNewText(instanceData, newText) {
    if (instanceData.isAnimating) return;
    
    instanceData.isAnimating = true;
    instanceData.element.classList.add('wb-rotating-animating');
    
    const exitElements = [...instanceData.splitElements];
    
    // Calculate when all exit animations will complete
    let maxExitTime = 0;
    const exitDuration = instanceData.config.duration * 0.6;
    
    if (exitElements.length > 0) {
      exitElements.forEach((element, index) => {
        const delay = this.getStaggerDelay(instanceData, index, exitElements.length);
        const totalTime = delay + exitDuration;
        maxExitTime = Math.max(maxExitTime, totalTime);
      });
    }
    
    // Add small buffer to ensure exit is complete
    const clearTime = maxExitTime + 0.1;
    const enterTime = clearTime + 0.1;
    
    // Create timeline
    instanceData.timeline = gsap.timeline({
      onComplete: () => {
        instanceData.isAnimating = false;
        instanceData.element.classList.remove('wb-rotating-animating');
        instanceData.element.classList.add('wb-rotating-completed');
        
        // Clean up after a short delay
        setTimeout(() => {
          instanceData.element.classList.remove('wb-rotating-completed');
        }, 100);
      }
    });

    // Exit animation for current elements
    if (exitElements.length > 0) {
      exitElements.forEach((element, index) => {
        const delay = this.getStaggerDelay(instanceData, index, exitElements.length);
        instanceData.timeline.to(element, {
          ...instanceData.config.exit,
          duration: exitDuration,
          ease: instanceData.config.ease,
          delay: delay
        }, 0);
      });
    }

    // Create new text elements after all exits complete
    instanceData.timeline.call(() => {
      this.clearContainer(instanceData);
      this.createTextElements(instanceData, newText);
      
      // Set initial state
      gsap.set(instanceData.splitElements, instanceData.config.initial);
    }, [], clearTime);

    // Enter animation for new elements
    instanceData.timeline.call(() => {
      instanceData.splitElements.forEach((element, index) => {
        const delay = this.getStaggerDelay(instanceData, index, instanceData.splitElements.length);
        gsap.to(element, {
          ...instanceData.config.animate,
          duration: instanceData.config.duration,
          ease: instanceData.config.ease,
          delay: delay
        });
      });
    }, [], enterTime);
  }

  /**
   * Split text into characters, words, or lines
   */
  splitText(instanceData, text) {
    if (instanceData.config.splitBy === 'characters') {
      const words = text.split(' ');
      return words.map((word, i) => ({
        characters: this.splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    
    if (instanceData.config.splitBy === 'words') {
      return text.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1
      }));
    }
    
    if (instanceData.config.splitBy === 'lines') {
      return text.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1
      }));
    }

    return text.split(instanceData.config.splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1
    }));
  }

  /**
   * Split text into characters using Intl.Segmenter when available
   */
  splitIntoCharacters(text) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  }

  /**
   * Calculate stagger delay for animation
   */
  getStaggerDelay(instanceData, index, totalChars) {
    const total = totalChars;
    const duration = instanceData.config.staggerDuration / 1000; // Convert to seconds
    
    if (instanceData.config.staggerFrom === 'first') return index * duration;
    if (instanceData.config.staggerFrom === 'last') return (total - 1 - index) * duration;
    if (instanceData.config.staggerFrom === 'center') {
      const center = Math.floor(total / 2);
      return Math.abs(center - index) * duration;
    }
    if (instanceData.config.staggerFrom === 'random') {
      const randomIndex = Math.floor(Math.random() * total);
      return Math.abs(randomIndex - index) * duration;
    }
    if (typeof instanceData.config.staggerFrom === 'number') {
      return Math.abs(instanceData.config.staggerFrom - index) * duration;
    }
    return index * duration;
  }

  /**
   * Clear container
   */
  clearContainer(instanceData) {
    instanceData.container.innerHTML = '';
    instanceData.splitElements = [];
  }

  /**
   * Create text elements based on split configuration
   */
  createTextElements(instanceData, text) {
    const elements = this.splitText(instanceData, text);
    
    if (instanceData.config.splitBy === 'lines') {
      instanceData.container.className = 'wb-rotating-text-container wb-rotating-text-lines';
    } else {
      instanceData.container.className = 'wb-rotating-text-container';
    }
    
    elements.forEach((wordObj, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'wb-rotating-text-word';
      
      wordObj.characters.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'wb-rotating-text-element';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        instanceData.splitElements.push(charSpan);
      });
      
      if (wordObj.needsSpace) {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'wb-rotating-text-space';
        spaceSpan.textContent = ' ';
        wordSpan.appendChild(spaceSpan);
      }
      
      instanceData.container.appendChild(wordSpan);
    });
  }

  /**
   * Move to next text
   */
  next(instanceData) {
    const nextIndex = instanceData.currentTextIndex === instanceData.config.texts.length - 1
      ? instanceData.config.loop ? 0 : instanceData.currentTextIndex
      : instanceData.currentTextIndex + 1;
    
    if (nextIndex !== instanceData.currentTextIndex) {
      this.updateText(instanceData, nextIndex);
    }
  }

  /**
   * Move to previous text
   */
  previous(instanceData) {
    const prevIndex = instanceData.currentTextIndex === 0
      ? instanceData.config.loop ? instanceData.config.texts.length - 1 : instanceData.currentTextIndex
      : instanceData.currentTextIndex - 1;
    
    if (prevIndex !== instanceData.currentTextIndex) {
      this.updateText(instanceData, prevIndex);
    }
  }

  /**
   * Jump to specific text index
   */
  jumpTo(instanceData, index) {
    const validIndex = Math.max(0, Math.min(index, instanceData.config.texts.length - 1));
    if (validIndex !== instanceData.currentTextIndex) {
      this.updateText(instanceData, validIndex);
    }
  }

  /**
   * Reset to first text
   */
  reset(instanceData) {
    if (instanceData.currentTextIndex !== 0) {
      this.updateText(instanceData, 0);
    }
  }

  /**
   * Start auto rotation
   */
  startAutoRotation(instanceData) {
    this.stopAutoRotation(instanceData);
    if (instanceData.config.auto && instanceData.config.rotationInterval > 0) {
      instanceData.intervalId = setInterval(() => {
        this.next(instanceData);
      }, instanceData.config.rotationInterval);
    }
  }

  /**
   * Stop auto rotation
   */
  stopAutoRotation(instanceData) {
    if (instanceData.intervalId) {
      clearInterval(instanceData.intervalId);
      instanceData.intervalId = null;
    }
  }

  /**
   * Expose API on element
   */
  exposeAPI(instanceData) {
    instanceData.element.rotatingText = {
      next: () => this.next(instanceData),
      previous: () => this.previous(instanceData),
      jumpTo: (index) => this.jumpTo(instanceData, index),
      reset: () => this.reset(instanceData),
      startAutoRotation: () => this.startAutoRotation(instanceData),
      stopAutoRotation: () => this.stopAutoRotation(instanceData),
      getCurrentIndex: () => instanceData.currentTextIndex,
      getTexts: () => [...instanceData.config.texts],
      isAnimating: () => instanceData.isAnimating
    };
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instanceData = this.instances.get(element);
    if (instanceData) {
      this.stopAutoRotation(instanceData);
      
      if (instanceData.timeline) {
        instanceData.timeline.kill();
      }
      
      // Remove component classes
      this.removeComponentClasses(element);
      
      // Restore original content
      element.innerHTML = instanceData.originalText;
      
      // Remove API
      if (element.rotatingText) {
        delete element.rotatingText;
      }
      
      this.instances.delete(element);
    }
  }

  /**
   * Destroy all animations
   */
  destroyAll() {
    this.instances.forEach((instanceData, element) => {
      this.destroyElement(element);
    });
    this.instances.clear();
  }

  /**
   * Refresh all animations
   */
  refresh() {
    this.instances.forEach(instanceData => {
      // Refresh if needed
      if (instanceData.config.auto && !instanceData.intervalId) {
        this.startAutoRotation(instanceData);
      }
    });
  }

  /**
   * Check for CSS conflicts
   */
  checkForConflicts() {
    const conflictClasses = [
      'text-rotate',
      'text-rotate-sr-only',
      'text-rotate-word',
      'text-rotate-lines',
      'text-rotate-element',
      'text-rotate-space'
    ];
    
    return checkCSSConflicts('RotatingText', conflictClasses);
  }

  /**
   * Get instance for a specific element
   */
  getInstance(element) {
    return this.instances.get(element);
  }
}

// Create and export singleton instance
const rotatingTextAnimator = new RotatingTextAnimator();
export default rotatingTextAnimator;
