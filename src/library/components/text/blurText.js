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
/* FlowBitz - BlurText Component Styles */
.wb-blur-text {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.wb-blur-text__segment {
  display: inline-block;
  will-change: transform, filter, opacity;
}

/* Performance optimization during animation */
.wb-blur-text-animating .wb-blur-text__segment {
  will-change: transform, filter, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-blur-text-completed .wb-blur-text__segment {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-blur-text[aria-label] .wb-blur-text__segment {
  speak: none;
}
`;

class BlurTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'BlurText';
    this.componentClasses = webflowBitsClasses.forComponent('blur-text');
    this.defaultConfig = {
      animateBy: 'words', // words | letters
      direction: 'top',   // top | bottom
      delay: 200,         // delay between elements in ms
      threshold: 0.1,
      rootMargin: '100px',
      stepDuration: 0.35,
      ease: "back.out(1.4)"
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-blur-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: BlurText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject BlurText styles', error);
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
        // BlurText-specific attributes
        animateBy: { 
          attribute: 'wb-animate-by', 
          type: 'string', 
          validValues: ['words', 'chars'] 
        },
        direction: { 
          attribute: 'wb-direction', 
          type: 'string', 
          validValues: ['top', 'bottom'] 
        },
        delay: { attribute: 'wb-delay', type: 'delay' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
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
   * Create DOM structure for blur text effect
   */
  createDOMStructure(element, config) {
    const originalContent = element.innerHTML;
    const text = element.textContent.trim();
    
    // Split text based on configuration
    const elements = config.animateBy === 'words' ? text.split(' ') : text.split('');
    
    // Clear element
    element.innerHTML = '';
    
    // Create segments
    const segments = elements.map((segment, index) => {
      const span = document.createElement('span');
      span.className = 'wb-blur-text__segment';
      
      if (config.animateBy === 'words') {
        // For words, just add the text content
        span.textContent = segment;
        // Add a regular space after each word (except the last one)
        if (index < elements.length - 1) {
          span.innerHTML += ' ';
        }
      } else {
        // For characters, handle spaces properly
        if (segment === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = segment;
        }
      }
      
      element.appendChild(span);
      return span;
    });

    return {
      originalContent,
      segments,
      elements
    };
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();

    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits BlurText: Element is empty or invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits BlurText: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      timeline: null,
      scrollTrigger: null,
      animationCompleted: false,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      // Apply performance optimizations
      PerformanceOptimizer.optimizeForAnimation(instance.domStructure.segments);
      
      // Setup animation
      this.setupAnimation(instance);
      
    } catch (error) {
      console.error('WebflowBits BlurText: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Setup the blur animation using GSAP and utility functions
   */
  setupAnimation(instance) {
    const { element, config, domStructure } = instance;
    
    // Define animation states based on direction
    const fromState = config.direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -50 }
      : { filter: 'blur(10px)', opacity: 0, y: 50 };

    const midState = {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: config.direction === 'top' ? 5 : -5,
    };

    const toState = { 
      filter: 'blur(0px)', 
      opacity: 1, 
      y: 0 
    };

    // Set initial state for all segments
    gsap.set(domStructure.segments, fromState);

    // Create ScrollTrigger config using utility
    const scrollTriggerConfig = createOnceAnimationConfig(
      element,
      config,
      (self) => {
        instance.scrollTrigger = self;
      }
    );

    // Create timeline
    const timeline = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
      onComplete: () => {
        this.completeAnimation(instance);
      }
    });

    // Animate each segment with stagger
    domStructure.segments.forEach((segment, index) => {
      const segmentTimeline = gsap.timeline();
      
      // First animation step: from initial to mid state
      segmentTimeline.to(segment, {
        filter: midState.filter,
        opacity: midState.opacity,
        y: midState.y,
        duration: config.stepDuration,
        ease: config.ease,
        delay: (index * config.delay) / 1000
      });
      
      // Second animation step: from mid to final state
      segmentTimeline.to(segment, {
        filter: toState.filter,
        opacity: toState.opacity,
        y: toState.y,
        duration: config.stepDuration,
        ease: config.ease
      }, `-=${config.stepDuration * 0.3}`); // Overlap animations slightly

      timeline.add(segmentTimeline, 0);
    });

    instance.timeline = timeline;
  }

  /**
   * Complete the animation using utility functions
   */
  completeAnimation(instance) {
    instance.animationCompleted = true;
    
    // Update state using utility
    AnimationStateManager.setCompletedState(instance.element, 'wb-blur-text');
    
    // Clean up performance optimizations
    PerformanceOptimizer.cleanupAfterAnimation(instance.domStructure.segments);
    
    // Clean up and set final state
    gsap.set(instance.domStructure.segments, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      clearProps: 'willChange',
      immediateRender: true,
    });

    // Dispatch completion event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      instance.element, 
      'complete', 
      'blur-text',
      { instance }
    );
  }

  /**
   * Initialize all elements with wb-component="blur-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="blur-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { timeline, scrollTrigger, domStructure } = instance;

    // Kill timeline
    if (timeline) {
      timeline.kill();
    }

    // Kill ScrollTrigger
    if (scrollTrigger) {
      scrollTrigger.kill();
    }

    // Clean up performance optimizations
    if (domStructure && domStructure.segments) {
      PerformanceOptimizer.cleanupAfterAnimation(domStructure.segments);
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
    ScrollTrigger.refresh();
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    return checkCSSConflicts(
      componentClassSets.blurText, 
      this.componentName
    );
  }
}

// Create singleton instance
const blurTextAnimator = new BlurTextAnimator();

// Export for use in other modules
export default blurTextAnimator;
export { BlurTextAnimator };
