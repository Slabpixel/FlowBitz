import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { injectStyles } from '../utils/injectStyles.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - SplitText Component Styles */
.wb-split-parent {
  overflow: hidden !important;
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
}

/* Mask container for line-based animations */
.wb-split-line-mask {
  display: block;
  overflow: hidden;
}

/* Individual split elements */
.wb-split-line,
.wb-split-word,
.wb-split-char {
  display: inline-block;
  will-change: transform, opacity;
}

.wb-split-line {
  display: block;
}

/* Accessibility: Hide split elements from screen readers when animating */
.wb-split-parent[aria-label] .wb-split-line,
.wb-split-parent[aria-label] .wb-split-word,
.wb-split-parent[aria-label] .wb-split-char {
  speak: none;
}

/* Performance optimization during animation */
.wb-split-animating .wb-split-line,
.wb-split-animating .wb-split-word,
.wb-split-animating .wb-split-char {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-split-completed .wb-split-line,
.wb-split-completed .wb-split-word,
.wb-split-completed .wb-split-char {
  will-change: auto;
  backface-visibility: visible;
}
`;

class SplitTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.defaultConfig = {
      splitType: "chars",
      ease: "power3.out",
      staggerDelay: 100,
      duration: 0.6,
      threshold: 0.1,
      rootMargin: "-100px",
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 }
    };
    
    this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-split-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: SplitText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject SplitText styles', error);
    }
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const config = { ...this.defaultConfig };
    
    // Parse split type
    const splitType = element.getAttribute('wb-split-type');
    if (splitType && ['chars', 'words', 'lines'].includes(splitType)) {
      config.splitType = splitType;
    }

    // Parse ease
    const ease = element.getAttribute('wb-ease');
    if (ease) {
      config.ease = ease;
    }

    // Parse stagger delay (in milliseconds)
    const staggerDelay = element.getAttribute('wb-stagger-delay');
    if (staggerDelay && !isNaN(staggerDelay)) {
      config.staggerDelay = parseInt(staggerDelay);
    }

    // Parse duration (in seconds)
    const duration = element.getAttribute('wb-duration');
    if (duration && !isNaN(duration)) {
      config.duration = parseFloat(duration);
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

    return config;
  }

  /**
   * Apply component classes to element
   */
  applyComponentClasses(element, config) {
    // Add parent class with unique namespace
    element.classList.add('wb-split-parent');
    
    // Add animation state class
    element.classList.add('wb-split-animating');
    
    // Store original classes for cleanup
    const instance = this.instances.get(element);
    if (instance) {
      instance.addedClasses = ['wb-split-parent', 'wb-split-animating'];
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
    
    // Remove all wb-split classes as cleanup
    element.classList.remove('wb-split-parent', 'wb-split-animating', 'wb-split-completed');
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits SplitText: Element is empty or invalid');
      return;
    }

    // Check if already initialized
    if (this.instances.has(element)) {
      console.warn('WebflowBits SplitText: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      splitter: null,
      timeline: null,
      scrollTrigger: null,
      animationCompleted: false,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    // Apply component-specific classes
    this.applyComponentClasses(element, config);

    try {
      this.setupAnimation(instance);
    } catch (error) {
      console.error('WebflowBits SplitText: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Setup the GSAP animation using new SplitText features
   */
  setupAnimation(instance) {
    const { element, config } = instance;

    // Create SplitText instance with namespaced classes
    const splitter = new SplitText(element, {
      type: config.splitType,
      // New autoSplit feature for responsive handling
      autoSplit: true,
      // Built-in accessibility (default in new version)
      aria: true,
      // Optional masking for lines with namespaced class
      mask: config.splitType === 'lines' ? 'wb-split-line-mask' : false,
      linesClass: 'wb-split-line',
      wordsClass: 'wb-split-word', 
      charsClass: 'wb-split-char',
      // New onSplit callback for responsive handling
      onSplit: (self) => {
        return this.createAnimation(self, config, instance);
      }
    });

    instance.splitter = splitter;
  }

  /**
   * Create animation with new SplitText callback
   */
  createAnimation(splitter, config, instance) {
    // Get targets based on split type
    let targets;
    switch (config.splitType) {
      case 'lines':
        targets = splitter.lines;
        break;
      case 'words':
        targets = splitter.words;
        break;
      case 'chars':
        targets = splitter.chars;
        break;
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn('WebflowBits SplitText: No targets found for animation');
      return;
    }

    // Calculate ScrollTrigger start position
    const startPct = (1 - config.threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(config.rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? (marginMatch[2] || 'px') : 'px';
    const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    // Create timeline with context for cleanup
    return gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: instance.element,
          start,
          toggleActions: 'play none none none',
          once: true,
          onToggle: (self) => {
            instance.scrollTrigger = self;
          },
        },
        onComplete: () => {
          instance.animationCompleted = true;
          
          // Update state classes
          instance.element.classList.remove('wb-split-animating');
          instance.element.classList.add('wb-split-completed');
          
          // Clean up and set final state
          gsap.set(targets, {
            ...config.to,
            clearProps: 'willChange',
            immediateRender: true,
          });

          // Dispatch custom event with namespaced name
          instance.element.dispatchEvent(new CustomEvent('wb-split-text-complete', {
            detail: { instance, targets },
            bubbles: true
          }));
        },
      });

      instance.timeline = timeline;

      // Set initial state and animate
      timeline.set(targets, { 
        ...config.from, 
        immediateRender: false, 
        force3D: true 
      });
      
      timeline.to(targets, {
        ...config.to,
        duration: config.duration,
        ease: config.ease,
        stagger: config.staggerDelay / 1000,
        force3D: true,
      });

      return timeline;
    });
  }

  /**
   * Initialize all elements with wb-text-animate="split-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="split-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { timeline, scrollTrigger, splitter } = instance;

    // Kill timeline
    if (timeline) {
      timeline.kill();
    }

    // Kill ScrollTrigger
    if (scrollTrigger) {
      scrollTrigger.kill();
    }

    // Revert SplitText (new method)
    if (splitter) {
      splitter.revert();
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
    const testClasses = ['wb-split-parent', 'wb-split-line', 'wb-split-word', 'wb-split-char'];
    
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
      console.warn('WebflowBits SplitText: Potential CSS conflicts detected:', conflicts);
      return conflicts;
    }

    return null;
  }
}

// Create singleton instance
const splitTextAnimator = new SplitTextAnimator();

// Export for use in other modules
export default splitTextAnimator;
export { SplitTextAnimator };