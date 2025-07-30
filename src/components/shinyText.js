import { injectStyles } from '../utils/injectStyles.js';
import { parseElementConfig, mergeAttributeMaps } from '../utils/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../utils/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../utils/conflictDetector.js';
import { AnimationStateManager } from '../utils/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - ShinyText Component Styles */
.wb-shiny-text {
  color: #b5b5b5a4;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
  animation: wb-shine 5s linear infinite;
}

@keyframes wb-shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.wb-shiny-text--disabled {
  animation: none;
}

/* Accessibility */
.wb-shiny-text[aria-label] {
  speak: none;
}
`;

class ShinyTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'ShinyText';
    this.componentClasses = webflowBitsClasses.forComponent('shiny-text');
    this.defaultConfig = {
      speed: 5,        // animation speed in seconds
      disabled: false, // whether animation is disabled
      textColor: '#b5b5b5a4', // base text color
      shineColor: 'rgba(255, 255, 255, 0.8)' // shine color
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-shiny-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: ShinyText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject ShinyText styles', error);
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
    const attributeMap = {
      // ShinyText-specific attributes
      speed: { attribute: 'wb-speed', type: 'duration' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      textColor: { attribute: 'wb-text-color', type: 'string' },
      shineColor: { attribute: 'wb-shine-color', type: 'string' }
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [this.componentClasses.parent];
    
    if (config.disabled) {
      classesToApply.push(`${this.componentClasses.parent}--disabled`);
    }
    
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
      `${this.componentClasses.parent}--disabled`
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Apply custom styles to element
   */
  applyCustomStyles(element, config) {
    // Set animation duration
    element.style.animationDuration = `${config.speed}s`;
    
    // Create custom gradient if colors are specified
    if (config.textColor !== this.defaultConfig.textColor || 
        config.shineColor !== this.defaultConfig.shineColor) {
      
      const gradient = `linear-gradient(
        120deg,
        transparent 40%,
        ${config.shineColor} 50%,
        transparent 60%
      )`;
      
      element.style.color = config.textColor;
      element.style.background = gradient;
      element.style.backgroundSize = '200% 100%';
      element.style.webkitBackgroundClip = 'text';
      element.style.backgroundClip = 'text';
    }
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits ShinyText: Element is empty or invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits ShinyText: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      originalStyles: {
        color: element.style.color,
        background: element.style.background,
        backgroundSize: element.style.backgroundSize,
        webkitBackgroundClip: element.style.webkitBackgroundClip,
        backgroundClip: element.style.backgroundClip,
        animationDuration: element.style.animationDuration
      },
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Apply custom styles
      this.applyCustomStyles(element, config);
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'shiny-text',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits ShinyText: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Update element configuration using utility functions
   */
  updateElement(element, newConfig = {}) {
    const instance = this.instances.get(element);
    if (!instance) {
      console.warn('WebflowBits ShinyText: Element not initialized');
      return;
    }

    // Merge new config with existing
    const updatedConfig = { ...instance.config, ...newConfig };
    instance.config = updatedConfig;

    // Remove old classes
    this.removeComponentClasses(element);
    
    // Apply updated classes and styles
    this.applyComponentClasses(element, updatedConfig);
    this.applyCustomStyles(element, updatedConfig);

    // Dispatch update event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-shiny-text-update',
      { instance, newConfig }
    );
  }

  /**
   * Enable animation for specific element
   */
  enable(element) {
    this.updateElement(element, { disabled: false });
  }

  /**
   * Disable animation for specific element
   */
  disable(element) {
    this.updateElement(element, { disabled: true });
  }

  /**
   * Change speed for specific element
   */
  setSpeed(element, speed) {
    this.updateElement(element, { speed: parseFloat(speed) });
  }

  /**
   * Initialize all elements with wb-text-animate="shiny-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-text-animate="shiny-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { originalStyles } = instance;

    // Restore original styles
    Object.keys(originalStyles).forEach(property => {
      if (originalStyles[property]) {
        element.style[property] = originalStyles[property];
      } else {
        element.style.removeProperty(property);
      }
    });

    // Remove component classes using utility
    this.removeComponentClasses(element);

    // Remove from instances
    this.instances.delete(element);

    // Dispatch destroy event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-shiny-text-destroy',
      { element }
    );
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
   * Refresh animations (no-op for CSS animations)
   */
  refresh() {
    // CSS animations don't need refresh like GSAP
    console.log('WebflowBits ShinyText: Refresh called');
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    return checkCSSConflicts(
      componentClassSets.shinyText, 
      this.componentName
    );
  }

  /**
   * Get all active instances
   */
  getInstances() {
    return Array.from(this.instances.values());
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element) || null;
  }
}

// Create singleton instance
const shinyTextAnimator = new ShinyTextAnimator();

// Export for use in other modules
export default shinyTextAnimator;
export { ShinyTextAnimator };
