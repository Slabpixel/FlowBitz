import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';

// Register GSAP plugins
gsap.registerPlugin();

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - CountUp Component Styles */
.wb-count-up {
  display: inline-block;
  position: relative;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}

.wb-count-up__number {
  display: inline-block;
  min-width: 1ch;
}

/* Performance optimization during animation */
.wb-count-up-animating .wb-count-up__number {
  will-change: transform;
  backface-visibility: hidden;
}

/* Clean up after animation */
.wb-count-up-completed .wb-count-up__number {
  will-change: auto;
  backface-visibility: visible;
}

/* Default styling */
.wb-count-up {
  font-size: inherit;
  color: currentColor;
  font-weight: inherit;
}

/* Animation states */
.wb-count-up-paused {
  opacity: 0.7;
}

.wb-count-up-reset {
  opacity: 1;
}
`;

class CountUpAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'CountUp';
    this.componentClasses = webflowBitsClasses.forComponent('count-up');
    this.defaultConfig = {
      to: 100,
      from: 0,
      direction: 'up', // 'up' or 'down'
      delay: 0,
      duration: 2,
      separator: '', // e.g., ',' for thousands separator
      startWhen: true,
      ease: 'power2.out',
      threshold: 0.1,
      rootMargin: '0px',
      loop: false,
      precision: null // auto-detect decimal places
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-count-up-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: CountUp styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject CountUp styles', error);
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
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      commonAttributeMaps.timing,
      {
        // CountUp-specific attributes
        to: { attribute: 'wb-count-to', type: 'number', parser: parseFloat },
        from: { attribute: 'wb-count-from', type: 'number', parser: parseFloat },
        direction: { 
          attribute: 'wb-count-direction', 
          type: 'string', 
          validValues: ['up', 'down'] 
        },
        separator: { attribute: 'wb-count-separator', type: 'string' },
        startWhen: { attribute: 'wb-count-start', type: 'boolean' },
        loop: { attribute: 'wb-count-loop', type: 'boolean' },
        precision: { attribute: 'wb-count-precision', type: 'number', parser: parseInt, min: 0, max: 10 }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Get number of decimal places in a number
   */
  getDecimalPlaces(num) {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  }

  /**
   * Format number with separator and proper decimals
   */
  formatNumber(value, separator, maxDecimals) {
    const hasDecimals = maxDecimals > 0;
    
    const options = {
      useGrouping: !!separator,
      minimumFractionDigits: hasDecimals ? maxDecimals : 0,
      maximumFractionDigits: hasDecimals ? maxDecimals : 0,
    };

    const formattedNumber = Intl.NumberFormat('en-US', options).format(value);
    
    return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
  }

  /**
   * Initialize element for count up animation
   */
  initElement(element) {
    this.ensureStylesInjected();

    if (this.instances.has(element)) {
      return;
    }

    try {
      const config = this.parseConfig(element);
      
      // Extract numbers from text content if not specified in attributes
      if (!element.hasAttribute('wb-count-to')) {
        const textContent = element.textContent.trim();
        const extractedNumber = parseFloat(textContent.replace(/[^\d.-]/g, ''));
        if (!isNaN(extractedNumber)) {
          config.to = extractedNumber;
        }
      }

      // Determine decimal precision
      let maxDecimals = 0;
      if (config.precision !== null) {
        maxDecimals = config.precision;
      } else {
        maxDecimals = Math.max(
          this.getDecimalPlaces(config.from), 
          this.getDecimalPlaces(config.to)
        );
      }

      // Create wrapper structure
      this.createCountUpStructure(element, config, maxDecimals);
      
      // Create instance data
      const instance = {
        element,
        config,
        maxDecimals,
        numberElement: null,
        currentValue: config.direction === 'down' ? config.to : config.from,
        isAnimating: false,
        observer: null,
        tween: null,
        addedClasses: []
      };

      this.instances.set(element, instance);

      // Apply CSS classes
      ComponentClassManager.applyClasses(
        element, 
        ['wb-count-up'], 
        this.instances, 
        this.componentName
      );

      // Find number element
      instance.numberElement = element.querySelector('.wb-count-up__number');

      // Set initial value
      this.updateDisplayValue(instance, instance.currentValue);

      // Setup intersection observer
      this.setupIntersectionObserver(instance);

      console.log('WebflowBits CountUp: Element initialized', { element, config });

      // Dispatch initialization event
      element.dispatchEvent(new CustomEvent('wb-count-up-init', {
        detail: { element, config },
        bubbles: true
      }));

    } catch (error) {
      console.error('WebflowBits CountUp: Failed to initialize element', error);
    }
  }

  /**
   * Create the HTML structure for count up animation
   */
  createCountUpStructure(element, config, maxDecimals) {
    const initialValue = config.direction === 'down' ? config.to : config.from;
    const formattedValue = this.formatNumber(initialValue, config.separator, maxDecimals);
    
    element.innerHTML = `<span class="wb-count-up__number">${formattedValue}</span>`;
  }

  /**
   * Update the display value
   */
  updateDisplayValue(instance, value) {
    if (!instance.numberElement) return;
    
    const { config, maxDecimals } = instance;
    const formattedValue = this.formatNumber(value, config.separator, maxDecimals);
    instance.numberElement.textContent = formattedValue;
    instance.currentValue = value;
  }

  /**
   * Setup intersection observer
   */
  setupIntersectionObserver(instance) {
    const { element, config } = instance;

    if (!config.startWhen) {
      // Start immediately if startWhen is false
      this.startAnimation(instance);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: config.rootMargin,
      threshold: config.threshold
    };

    instance.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !instance.isAnimating) {
          this.startAnimation(instance);
        }
      });
    }, observerOptions);

    instance.observer.observe(element);
  }

  /**
   * Start the count up animation
   */
  startAnimation(instance) {
    const { element, config } = instance;

    if (instance.isAnimating) return;

    instance.isAnimating = true;

    // Apply animating state
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-count-up', 
      this.instances, 
      this.componentName
    );

    // Dispatch start event
    element.dispatchEvent(new CustomEvent('wb-count-up-start', {
      detail: { element, config, from: instance.currentValue },
      bubbles: true
    }));

    // Calculate target value
    const targetValue = config.direction === 'down' ? config.from : config.to;

    // Create GSAP animation
    instance.tween = gsap.to(instance, {
      currentValue: targetValue,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
      onUpdate: () => {
        this.updateDisplayValue(instance, instance.currentValue);
      },
      onComplete: () => {
        this.onAnimationComplete(instance);
      }
    });
  }

  /**
   * Handle animation completion
   */
  onAnimationComplete(instance) {
    const { element, config } = instance;

    instance.isAnimating = false;

    // Apply completed state
    ComponentClassManager.setAnimationState(
      element, 
      'completed', 
      'wb-count-up', 
      this.instances, 
      this.componentName
    );

    // Dispatch completion event
    element.dispatchEvent(new CustomEvent('wb-count-up-complete', {
      detail: { 
        element, 
        config, 
        finalValue: instance.currentValue 
      },
      bubbles: true
    }));

    // Handle looping
    if (config.loop) {
      setTimeout(() => {
        this.resetAnimation(instance);
        this.startAnimation(instance);
      }, 1000); // 1 second pause between loops
    }

    // Disconnect observer if not looping
    if (instance.observer && !config.loop) {
      instance.observer.disconnect();
      instance.observer = null;
    }
  }

  /**
   * Reset animation to initial state
   */
  resetAnimation(instance) {
    const { config } = instance;

    // Stop current animation
    if (instance.tween) {
      instance.tween.kill();
      instance.tween = null;
    }

    // Reset current value
    instance.currentValue = config.direction === 'down' ? config.to : config.from;
    instance.isAnimating = false;

    // Update display
    this.updateDisplayValue(instance, instance.currentValue);

    // Apply reset state
    ComponentClassManager.setAnimationState(
      instance.element, 
      'reset', 
      'wb-count-up', 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Initialize all elements with wb-component="count-up"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="count-up"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy a specific element's animation
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    try {
      // Stop animation
      if (instance.tween) {
        instance.tween.kill();
      }

      // Disconnect observer
      if (instance.observer) {
        instance.observer.disconnect();
      }

      // Restore original content
      const finalValue = this.formatNumber(
        instance.currentValue, 
        instance.config.separator, 
        instance.maxDecimals
      );
      element.textContent = finalValue;

      // Remove CSS classes
      ComponentClassManager.removeClasses(
        element,
        ['wb-count-up', 'wb-count-up-animating', 'wb-count-up-completed', 'wb-count-up-reset'],
        this.instances,
        this.componentName
      );

      // Remove instance
      this.instances.delete(element);

      console.log('WebflowBits CountUp: Element destroyed', element);

    } catch (error) {
      console.error('WebflowBits CountUp: Failed to destroy element', error);
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
    const conflicts = checkCSSConflicts(componentClassSets.countUp || [
      'wb-count-up',
      'wb-count-up__number',
      'wb-count-up-animating',
      'wb-count-up-completed',
      'wb-count-up-paused',
      'wb-count-up-reset'
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
    
    // Re-calculate decimal places if precision changed
    if (newConfig.precision !== undefined) {
      instance.maxDecimals = newConfig.precision !== null ? 
        newConfig.precision : 
        Math.max(
          this.getDecimalPlaces(instance.config.from), 
          this.getDecimalPlaces(instance.config.to)
        );
    }

    // Update display if not animating
    if (!instance.isAnimating) {
      this.updateDisplayValue(instance, instance.currentValue);
    }
    
    // Dispatch update event
    element.dispatchEvent(new CustomEvent('wb-count-up-update', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Manually start animation
   */
  startCountUp(element) {
    const instance = this.getInstance(element);
    if (!instance) return;

    this.resetAnimation(instance);
    this.startAnimation(instance);
  }

  /**
   * Pause animation
   */
  pauseCountUp(element) {
    const instance = this.getInstance(element);
    if (!instance || !instance.tween) return;

    instance.tween.pause();
    
    ComponentClassManager.setAnimationState(
      element, 
      'paused', 
      'wb-count-up', 
      this.instances, 
      this.componentName
    );

    element.dispatchEvent(new CustomEvent('wb-count-up-pause', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Resume animation
   */
  resumeCountUp(element) {
    const instance = this.getInstance(element);
    if (!instance || !instance.tween) return;

    instance.tween.resume();
    
    ComponentClassManager.setAnimationState(
      element, 
      'animating', 
      'wb-count-up', 
      this.instances, 
      this.componentName
    );

    element.dispatchEvent(new CustomEvent('wb-count-up-resume', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }

  /**
   * Reset animation to initial state
   */
  resetCountUp(element) {
    const instance = this.getInstance(element);
    if (!instance) return;

    this.resetAnimation(instance);

    element.dispatchEvent(new CustomEvent('wb-count-up-reset', {
      detail: { element, config: instance.config },
      bubbles: true
    }));
  }
}

// Create and export singleton instance
const countUpAnimator = new CountUpAnimator();

// Export for external usage
export default countUpAnimator;

// Add to component class sets for conflict detection
if (typeof componentClassSets !== 'undefined') {
  componentClassSets.countUp = [
    'wb-count-up',
    'wb-count-up__number',
    'wb-count-up-animating',
    'wb-count-up-completed',
    'wb-count-up-paused',
    'wb-count-up-reset'
  ];
}
