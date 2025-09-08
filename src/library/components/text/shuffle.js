import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { calculateScrollTriggerStart } from '../../utils/animation/scrollTriggerHelper.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - Shuffle Component Styles */
.wb-shuffle-parent {
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
  will-change: transform;
  line-height: 1;
  visibility: hidden;
  overflow: visible;
}

.wb-shuffle-parent.wb-shuffle-ready {
  visibility: visible;
}

.wb-shuffle-parent.wb-shuffle-animating {
  will-change: transform, opacity;
}

.wb-shuffle-parent.wb-shuffle-completed {
  will-change: auto;
}

.wb-shuffle-char-wrapper {
  display: inline-block;
  overflow: hidden;
  vertical-align: baseline;
  position: relative;
}

.wb-shuffle-char-wrapper > span {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
}

.wb-shuffle-char {
  line-height: 1;
  display: inline-block;
  text-align: center;
}

/* Performance optimizations */
.wb-shuffle-animating .wb-shuffle-char-wrapper > span {
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wb-shuffle-parent {
    visibility: visible !important;
  }
  
  .wb-shuffle-char-wrapper > span {
    transform: none !important;
    will-change: auto !important;
  }
}
`;

class ShuffleAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'Shuffle';
    this.componentClasses = webflowBitsClasses.forComponent('shuffle');
    this.defaultConfig = {
      shuffleDirection: "right",
      duration: 0.35,
      maxDelay: 0,
      ease: "power3.out",
      threshold: 0.1,
      rootMargin: "-100px",
      shuffleTimes: 1,
      animationMode: "evenodd",
      loop: false,
      loopDelay: 0,
      stagger: 0.03,
      scrambleCharset: "",
      colorFrom: null,
      colorTo: null,
      triggerOnce: true,
      respectReducedMotion: true,
      triggerOnHover: true,
      textAlign: "center"
    };
    
    // Attribute mapping for configuration parsing
    this.attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      {
        shuffleDirection: { 
          attribute: 'wb-shuffle-direction', 
          type: 'string', 
          validValues: ['left', 'right'] 
        },
        shuffleTimes: { 
          attribute: 'wb-shuffle-times', 
          type: 'number', 
          parser: parseInt,
          min: 1 
        },
        animationMode: { 
          attribute: 'wb-animation-mode', 
          type: 'string', 
          validValues: ['evenodd', 'random'] 
        },
        maxDelay: { 
          attribute: 'wb-max-delay', 
          type: 'number',
          min: 0 
        },
        loop: { 
          attribute: 'wb-loop', 
          type: 'boolean' 
        },
        loopDelay: { 
          attribute: 'wb-loop-delay', 
          type: 'number',
          min: 0 
        },
        stagger: { 
          attribute: 'wb-stagger', 
          type: 'number',
          min: 0 
        },
        scrambleCharset: { 
          attribute: 'wb-scramble-charset', 
          type: 'string' 
        },
        colorFrom: { 
          attribute: 'wb-color-from', 
          type: 'string' 
        },
        colorTo: { 
          attribute: 'wb-color-to', 
          type: 'string' 
        },
        triggerOnce: { 
          attribute: 'wb-trigger-once', 
          type: 'boolean' 
        },
        respectReducedMotion: { 
          attribute: 'wb-respect-reduced-motion', 
          type: 'boolean' 
        },
        triggerOnHover: { 
          attribute: 'wb-trigger-on-hover', 
          type: 'boolean' 
        },
        textAlign: { 
          attribute: 'wb-text-align', 
          type: 'string',
          validValues: ['left', 'center', 'right', 'justify'] 
        }
      }
    );
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-shuffle-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: Shuffle styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject Shuffle styles', error);
    }
  }

  /**
   * Check for CSS conflicts
   */
  checkForConflicts() {
    const testClasses = [
      'wb-shuffle-parent',
      'wb-shuffle-ready',
      'wb-shuffle-animating',
      'wb-shuffle-completed',
      'wb-shuffle-char-wrapper',
      'wb-shuffle-char'
    ];
    
    return checkCSSConflicts(testClasses, this.componentName, '[wb-text-animate="shuffle"]');
  }

  /**
   * Check if reduced motion is preferred
   */
  respectsReducedMotion() {
    return window.matchMedia && 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Wait for fonts to load
   */
  async waitForFonts() {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') {
        return Promise.resolve();
      }
      return document.fonts.ready;
    }
    return Promise.resolve();
  }

  /**
   * Create shuffle structure for a character
   */
  createCharacterStructure(char, config) {
    const parent = char.parentElement;
    if (!parent) return null;

    // Get character width
    const rect = char.getBoundingClientRect();
    const width = rect.width;
    if (!width) return null;

    // Create wrapper
    const wrapper = document.createElement('span');
    wrapper.className = 'wb-shuffle-char-wrapper';
    Object.assign(wrapper.style, {
      display: 'inline-block',
      overflow: 'hidden',
      width: `${width}px`,
      verticalAlign: 'baseline'
    });

    // Create inner container
    const inner = document.createElement('span');
    Object.assign(inner.style, {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      willChange: 'transform'
    });

    // Insert wrapper and move character
    parent.insertBefore(wrapper, char);
    wrapper.appendChild(inner);

    // Create character copies for shuffle effect
    const rolls = Math.max(1, Math.floor(config.shuffleTimes));
    
    // Original character (marked for identification)
    const firstOriginal = char.cloneNode(true);
    firstOriginal.className = 'wb-shuffle-char';
    firstOriginal.setAttribute('data-original', '1');
    Object.assign(firstOriginal.style, {
      display: 'inline-block',
      width: `${width}px`,
      textAlign: config.textAlign
    });

    // Style the actual character
    char.className = 'wb-shuffle-char';
    char.setAttribute('data-original', '1');
    Object.assign(char.style, {
      display: 'inline-block',
      width: `${width}px`,
      textAlign: config.textAlign
    });

    // Add copies to inner container
    inner.appendChild(firstOriginal);
    
    // Create scrambled versions if charset provided
    for (let i = 0; i < rolls; i++) {
      const copy = char.cloneNode(true);
      copy.removeAttribute('data-original');
      
      if (config.scrambleCharset) {
        const randomChar = config.scrambleCharset.charAt(
          Math.floor(Math.random() * config.scrambleCharset.length)
        );
        copy.textContent = randomChar || char.textContent;
      }
      
      Object.assign(copy.style, {
        display: 'inline-block',
        width: `${width}px`,
        textAlign: config.textAlign
      });
      
      inner.appendChild(copy);
    }
    
    // Add final original character
    inner.appendChild(char);

    // Calculate animation distances
    const steps = rolls + 1;
    let startX = 0;
    let finalX = -steps * width;

    if (config.shuffleDirection === 'right') {
      // Reorder for right direction
      const firstCopy = inner.firstElementChild;
      const realChar = inner.lastElementChild;
      
      if (realChar) inner.insertBefore(realChar, inner.firstChild);
      if (firstCopy) inner.appendChild(firstCopy);
      
      startX = -steps * width;
      finalX = 0;
    }

    // Set initial position and color
    gsap.set(inner, { x: startX, force3D: true });
    if (config.colorFrom) {
      inner.style.color = config.colorFrom;
    }

    // Store animation data
    inner.setAttribute('data-final-x', String(finalX));
    inner.setAttribute('data-start-x', String(startX));

    return {
      wrapper,
      inner,
      width,
      startX,
      finalX
    };
  }

  /**
   * Build shuffle structure for element
   */
  buildShuffleStructure(element, config) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Clean up any existing structure
    this.teardownShuffle(element);

    try {
      // Split text into characters
      const splitText = new SplitText(element, {
        type: 'chars',
        charsClass: 'wb-shuffle-char',
        wordsClass: 'wb-shuffle-word',
        linesClass: 'wb-shuffle-line',
        smartWrap: true,
        reduceWhiteSpace: false
      });

      instance.splitText = splitText;
      instance.wrappers = [];

      const chars = splitText.chars || [];

      chars.forEach(char => {
        const structure = this.createCharacterStructure(char, config);
        if (structure) {
          instance.wrappers.push(structure);
        }
      });

      // Apply text alignment to element
      if (config.textAlign) {
        element.style.textAlign = config.textAlign;
      }

    } catch (error) {
      console.error('WebflowBits Shuffle: Failed to build structure', error);
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'error', 
        'shuffle', 
        { error: error.message }
      );
    }
  }

  /**
   * Randomize scrambled characters
   */
  randomizeScrambles(instance, config) {
    if (!config.scrambleCharset || !instance.wrappers) return;

    instance.wrappers.forEach(({ inner }) => {
      const children = Array.from(inner.children);
      // Skip first and last (original characters)
      for (let i = 1; i < children.length - 1; i++) {
        const randomChar = config.scrambleCharset.charAt(
          Math.floor(Math.random() * config.scrambleCharset.length)
        );
        if (randomChar) {
          children[i].textContent = randomChar;
        }
      }
    });
  }

  /**
   * Get inner elements for animation
   */
  getInnerElements(instance) {
    return instance.wrappers ? instance.wrappers.map(w => w.inner) : [];
  }

  /**
   * Play shuffle animation
   */
  playShuffle(element) {
    const instance = this.instances.get(element);
    if (!instance || instance.isPlaying) return;

    const config = instance.config;
    const inners = this.getInnerElements(instance);
    
    if (!inners.length) return;

    instance.isPlaying = true;
    AnimationStateManager.setAnimatingState(element, 'wb-shuffle');

    // Dispatch start event
    AnimationStateManager.dispatchLifecycleEvent(element, 'start', 'shuffle', {
      config,
      characterCount: inners.length
    });

    const timeline = gsap.timeline({
      smoothChildTiming: true,
      repeat: config.loop ? -1 : 0,
      repeatDelay: config.loop ? config.loopDelay : 0,
      onRepeat: () => {
        if (config.scrambleCharset) {
          this.randomizeScrambles(instance, config);
        }
        // Reset positions for repeat
        gsap.set(inners, {
          x: (i, target) => parseFloat(target.getAttribute('data-start-x') || '0')
        });
        
        AnimationStateManager.dispatchLifecycleEvent(element, 'repeat', 'shuffle');
      },
      onComplete: () => {
        instance.isPlaying = false;
        
        if (!config.loop) {
          this.cleanupToStatic(instance, config);
          AnimationStateManager.setCompletedState(element, 'wb-shuffle');
          
          // Setup hover trigger if enabled
          if (config.triggerOnHover) {
            this.setupHoverTrigger(element);
          }
        }
        
        AnimationStateManager.dispatchLifecycleEvent(element, 'complete', 'shuffle', {
          looped: config.loop
        });
      }
    });

    // Add animation tweens based on mode
    this.addAnimationTweens(timeline, inners, config);

    instance.timeline = timeline;
  }

  /**
   * Add animation tweens to timeline
   */
  addAnimationTweens(timeline, inners, config) {
    if (config.animationMode === 'evenodd') {
      // Separate odd and even characters
      const odd = inners.filter((_, i) => i % 2 === 1);
      const even = inners.filter((_, i) => i % 2 === 0);
      
      const oddDuration = config.duration + Math.max(0, odd.length - 1) * config.stagger;
      const evenStart = odd.length ? oddDuration * 0.7 : 0;

      // Animate odd characters first
      if (odd.length) {
        this.addCharacterTween(timeline, odd, config, 0);
      }

      // Animate even characters with offset
      if (even.length) {
        this.addCharacterTween(timeline, even, config, evenStart);
      }
    } else if (config.animationMode === 'random') {
      // Random delays for each character
      inners.forEach(inner => {
        const delay = Math.random() * config.maxDelay;
        this.addCharacterTween(timeline, [inner], config, delay);
      });
    }
  }

  /**
   * Add character animation tween
   */
  addCharacterTween(timeline, targets, config, startTime) {
    timeline.to(targets, {
      x: (i, target) => parseFloat(target.getAttribute('data-final-x') || '0'),
      duration: config.duration,
      ease: config.ease,
      force3D: true,
      stagger: config.animationMode === 'evenodd' ? config.stagger : 0
    }, startTime);

    // Add color animation if specified
    if (config.colorFrom && config.colorTo) {
      timeline.to(targets, {
        color: config.colorTo,
        duration: config.duration,
        ease: config.ease
      }, startTime);
    }
  }

  /**
   * Clean up to static state
   */
  cleanupToStatic(instance, config) {
    if (!instance.wrappers) return;

    instance.wrappers.forEach(({ wrapper, inner }) => {
      const originalChar = inner.querySelector('[data-original="1"]');
      if (originalChar && wrapper.parentNode) {
        // Replace wrapper with original character
        wrapper.parentNode.replaceChild(originalChar, wrapper);
        
        // Apply final color if specified
        if (config.colorTo) {
          originalChar.style.color = config.colorTo;
        }
      }
    });

    instance.wrappers = [];
  }

  /**
   * Setup hover trigger
   */
  setupHoverTrigger(element) {
    const instance = this.instances.get(element);
    if (!instance || !instance.config.triggerOnHover) return;

    // Remove existing hover listener
    this.removeHoverTrigger(element);

    const hoverHandler = () => {
      if (instance.isPlaying) return;
      
      this.buildShuffleStructure(element, instance.config);
      if (instance.config.scrambleCharset) {
        this.randomizeScrambles(instance, instance.config);
      }
      this.playShuffle(element);
    };

    instance.hoverHandler = hoverHandler;
    element.addEventListener('mouseenter', hoverHandler);
  }

  /**
   * Remove hover trigger
   */
  removeHoverTrigger(element) {
    const instance = this.instances.get(element);
    if (!instance || !instance.hoverHandler) return;

    element.removeEventListener('mouseenter', instance.hoverHandler);
    instance.hoverHandler = null;
  }

  /**
   * Teardown shuffle structure
   */
  teardownShuffle(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Kill timeline
    if (instance.timeline) {
      instance.timeline.kill();
      instance.timeline = null;
    }

    // Restore original structure
    if (instance.wrappers && instance.wrappers.length) {
      instance.wrappers.forEach(({ wrapper, inner }) => {
        const originalChar = inner.querySelector('[data-original="1"]');
        if (originalChar && wrapper.parentNode) {
          wrapper.parentNode.replaceChild(originalChar, wrapper);
        }
      });
      instance.wrappers = [];
    }

    // Revert SplitText
    try {
      if (instance.splitText) {
        instance.splitText.revert();
        instance.splitText = null;
      }
    } catch (error) {
      console.warn('WebflowBits Shuffle: Error reverting SplitText', error);
    }

    // Remove hover trigger
    this.removeHoverTrigger(element);

    instance.isPlaying = false;
  }

  /**
   * Initialize element with shuffle animation
   */
  async initElement(element) {
    if (this.instances.has(element)) {
      console.warn('WebflowBits Shuffle: Element already initialized');
      return;
    }

    // Inject styles if not already done
    this.injectComponentStyles();

    try {
      // Parse configuration from attributes
      const config = parseElementConfig(element, this.defaultConfig, this.attributeMap);
      
      // Check for reduced motion preference
      if (config.respectReducedMotion && this.respectsReducedMotion()) {
        console.log('WebflowBits Shuffle: Respecting reduced motion preference');
        element.classList.add('wb-shuffle-ready');
        AnimationStateManager.dispatchLifecycleEvent(element, 'complete', 'shuffle', {
          reducedMotion: true
        });
        return;
      }

      // Wait for fonts to load
      await this.waitForFonts();

      // Create instance
      const instance = {
        element,
        config,
        splitText: null,
        wrappers: [],
        timeline: null,
        scrollTrigger: null,
        hoverHandler: null,
        isPlaying: false
      };

      this.instances.set(element, instance);

      // Add parent class
      ComponentClassManager.applyClasses(
        element, 
        'wb-shuffle-parent', 
        this.instances, 
        this.componentName
      );

      // Calculate ScrollTrigger start position
      const scrollTriggerStart = calculateScrollTriggerStart(
        config.threshold, 
        config.rootMargin
      );

      // Create ScrollTrigger
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: scrollTriggerStart,
        once: config.triggerOnce,
        onEnter: () => {
          this.buildShuffleStructure(element, config);
          if (config.scrambleCharset) {
            this.randomizeScrambles(instance, config);
          }
          this.playShuffle(element);
          
          // Mark as ready
          ComponentClassManager.applyClasses(
            element, 
            'wb-shuffle-ready', 
            this.instances, 
            this.componentName
          );
        }
      });

      instance.scrollTrigger = scrollTrigger;

      console.log('WebflowBits Shuffle: Element initialized', element);

    } catch (error) {
      console.error('WebflowBits Shuffle: Failed to initialize element', error);
      this.instances.delete(element);
    }
  }

  /**
   * Initialize all elements with wb-text-animate="shuffle"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="shuffle"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy shuffle animation for element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Teardown animation
    this.teardownShuffle(element);

    // Kill ScrollTrigger
    if (instance.scrollTrigger) {
      instance.scrollTrigger.kill();
    }

    // Remove classes
    ComponentClassManager.removeClasses(
      element,
      ['wb-shuffle-parent', 'wb-shuffle-ready', 'wb-shuffle-animating', 'wb-shuffle-completed'],
      this.instances,
      this.componentName
    );

    // Remove instance
    this.instances.delete(element);

    AnimationStateManager.dispatchLifecycleEvent(element, 'destroy', 'shuffle');
    console.log('WebflowBits Shuffle: Element destroyed', element);
  }

  /**
   * Destroy all shuffle animations
   */
  destroyAll() {
    const elements = Array.from(this.instances.keys());
    elements.forEach(element => this.destroy(element));
  }

  /**
   * Refresh animations (useful after DOM changes)
   */
  refresh() {
    ScrollTrigger.refresh();
  }

  /**
   * Get instance for element
   */
  getInstance(element) {
    return this.instances.get(element);
  }

  /**
   * Update configuration for element
   */
  updateConfig(element, newConfig) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Merge new config
    instance.config = { ...instance.config, ...newConfig };

    // Restart animation with new config
    this.teardownShuffle(element);
    this.buildShuffleStructure(element, instance.config);
    
    AnimationStateManager.dispatchLifecycleEvent(element, 'update', 'shuffle', {
      newConfig: instance.config
    });
  }

  /**
   * Manually trigger shuffle animation
   */
  trigger(element) {
    const instance = this.instances.get(element);
    if (!instance || instance.isPlaying) return;

    this.buildShuffleStructure(element, instance.config);
    if (instance.config.scrambleCharset) {
      this.randomizeScrambles(instance, instance.config);
    }
    this.playShuffle(element);
  }

  /**
   * Pause shuffle animation
   */
  pause(element) {
    const instance = this.instances.get(element);
    if (!instance || !instance.timeline) return;

    instance.timeline.pause();
    AnimationStateManager.setPausedState(element, 'wb-shuffle');
    AnimationStateManager.dispatchLifecycleEvent(element, 'pause', 'shuffle');
  }

  /**
   * Resume shuffle animation
   */
  resume(element) {
    const instance = this.instances.get(element);
    if (!instance || !instance.timeline) return;

    instance.timeline.resume();
    AnimationStateManager.setAnimatingState(element, 'wb-shuffle');
    AnimationStateManager.dispatchLifecycleEvent(element, 'resume', 'shuffle');
  }
}

// Create and export singleton instance
const shuffleAnimator = new ShuffleAnimator();
export default shuffleAnimator;