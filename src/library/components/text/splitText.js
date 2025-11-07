import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  AnimationStateManager,
  PerformanceOptimizer,
} from "../../utils/animation/animationStateManager.js";
import { createOnceAnimationConfig } from "../../utils/animation/scrollTriggerHelper.js";
import {
  commonAttributeMaps,
  mergeAttributeMaps,
  parseElementConfig,
} from "../../utils/core/attributeParser.js";
import {
  ComponentClassManager,
  webflowBitsClasses,
} from "../../utils/core/classManager.js";
import {
  checkCSSConflicts,
  componentClassSets,
} from "../../utils/core/conflictDetector.js";
import { injectStyles } from "../../utils/core/injectStyles.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - SplitText Component Styles */
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
  visibility: hidden;
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
    this.componentName = "SplitText";
    this.componentClasses = webflowBitsClasses.forComponent("split");
    this.defaultConfig = {
      splitType: "chars",
      ease: "power3.out",
      staggerDelay: 100,
      duration: 0.6,
      triggerOnView: true,
      threshold: 0.1,
      rootMargin: "100px",
      startDelay: 0,
      from: { autoAlpha: 0, y: 40 },
      to: { autoAlpha: 1, y: 0 },
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;

    try {
      injectStyles("wb-split-text-styles", componentCSS);
      this.stylesInjected = true;
      console.log("WebflowBits: SplitText styles injected");
    } catch (error) {
      console.warn("WebflowBits: Failed to inject SplitText styles", error);
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
      commonAttributeMaps.timing,
      {
        // Component-specific attributes
        splitType: {
          attribute: "wb-split-type",
          type: "string",
          validValues: ["chars", "words", "lines"],
        },
        triggerOnView: { attribute: "wb-trigger-on-view", type: "boolean" },
        rootMargin: { attribute: "wb-root-margin", type: "string" },
        startDelay: {
          attribute: "wb-start-delay",
          type: "number",
          parser: parseFloat,
          min: 0,
          max: 2,
          step: 0.1,
        },
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
      this.componentClasses.animating,
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
      this.componentClasses.completed,
    ];

    ComponentClassManager.removeClasses(
      element,
      fallbackClasses,
      this.instances,
      this.componentName
    );
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();

    if (!element || !element.textContent.trim()) {
      console.warn("WebflowBits SplitText: Element is empty or invalid");
      return;
    }

    // Check if already initialized
    if (this.instances.has(element)) {
      console.warn("WebflowBits SplitText: Element already initialized");
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
      addedClasses: [],
    };

    this.instances.set(element, instance);

    // Apply component-specific classes
    this.applyComponentClasses(element, config);

    try {
      this.setupAnimation(instance);
    } catch (error) {
      console.error("WebflowBits SplitText: Failed to setup animation", error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Setup the GSAP animation using utility functions
   */
  setupAnimation(instance) {
    const { element, config } = instance;

    // Create SplitText instance with namespaced classes
    const splitter = new SplitText(element, {
      type: config.splitType,
      autoSplit: true,
      aria: true,
      mask: config.splitType === "lines" ? "wb-split-line-mask" : false,
      linesClass: "wb-split-line",
      wordsClass: "wb-split-word",
      charsClass: "wb-split-char",
      onSplit: (self) => {
        return this.createAnimation(self, config, instance);
      },
    });

    instance.splitter = splitter;
  }

  /**
   * Create animation with performance optimization
   */
  createAnimation(splitter, config, instance) {
    // Get targets based on split type
    let targets;
    switch (config.splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
        targets = splitter.chars;
        break;
      default:
        targets = splitter.chars;
    }

    if (!targets || targets.length === 0) {
      console.warn("WebflowBits SplitText: No targets found for animation");
      return;
    }

    // Apply performance optimizations
    PerformanceOptimizer.optimizeForAnimation(targets);

    // Set initial state
    gsap.set(targets, {
      ...config.from,
      immediateRender: false,
      force3D: true,
    });

    if (config.triggerOnView) {
      // Use IntersectionObserver like smartAnimate
      this.setupIntersectionObserver(instance, targets, config);
    } else {
      // Animate immediately
      this.startAnimation(instance, targets, config);
    }
  }

  /**
   * Setup ScrollTrigger for view-based animation
   * Using ScrollTrigger instead of IntersectionObserver for better unit support
   */
  setupIntersectionObserver(instance, targets, config) {
    const { element } = instance;

    // Use ScrollTrigger helper with support for all CSS units (px, %, vh, vw, em, rem)
    const triggerConfig = createOnceAnimationConfig(
      element,
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
        markers: false,
      },
      (self) => {
        // Only trigger once when element enters viewport
        if (self.isActive && !instance.animationCompleted) {
          // Add delay if specified
          if (config.startDelay > 0) {
            setTimeout(() => {
              this.startAnimation(instance, targets, config);
            }, config.startDelay * 1000);
          } else {
            this.startAnimation(instance, targets, config);
          }
        }
      }
    );

    // Create ScrollTrigger instance
    instance.scrollTrigger = ScrollTrigger.create(triggerConfig);
  }

  /**
   * Start animation without ScrollTrigger
   */
  startAnimation(instance, targets, config) {
    const timeline = gsap.timeline({
      onComplete: () => {
        this.completeAnimation(instance, targets);
      },
    });

    instance.timeline = timeline;

    timeline.to(targets, {
      ...config.to,
      duration: config.duration,
      ease: config.ease,
      stagger: config.staggerDelay / 1000,
      force3D: true,
    });
  }

  /**
   * Complete animation using utility functions
   */
  completeAnimation(instance, targets) {
    instance.animationCompleted = true;

    // Update state using utility
    AnimationStateManager.setCompletedState(instance.element, "wb-split");

    // Clean up performance optimizations
    PerformanceOptimizer.cleanupAfterAnimation(targets);

    // Clear performance properties
    gsap.set(targets, {
      ...instance.config.to,
      clearProps: "willChange",
      immediateRender: true,
    });

    // Dispatch completion event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      instance.element,
      "complete",
      "split-text",
      { instance, targets }
    );
  }

  /**
   * Initialize all elements with wb-component="split-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="split-text"]');
    elements.forEach((element) => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { timeline, scrollTrigger, splitter, observer } = instance;

    // Kill timeline
    if (timeline) {
      timeline.kill();
    }

    // Kill ScrollTrigger
    if (scrollTrigger) {
      scrollTrigger.kill();
    }

    // Disconnect observer
    if (observer) {
      observer.disconnect();
    }

    // Revert SplitText
    if (splitter) {
      splitter.revert();
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
    return checkCSSConflicts(componentClassSets.splitText, this.componentName);
  }
}

// Create singleton instance
const splitTextAnimator = new SplitTextAnimator();

// Export for use in other modules
export default splitTextAnimator;
export { SplitTextAnimator };
