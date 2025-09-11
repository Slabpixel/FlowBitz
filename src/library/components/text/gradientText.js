import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - GradientText Component Styles */
.wb-gradient-text {
  position: relative;
  margin: 0 auto;
  display: flex;
  max-width: fit-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.5s ease-out;
  overflow: hidden;
  cursor: pointer;
}

.wb-gradient-text__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 300% 100%;
  animation: wb-gradient-animation linear infinite;
  border-radius: inherit;
  z-index: 0;
  pointer-events: none;
}

.wb-gradient-text__overlay::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #060010;
  z-index: -1;
}

.wb-gradient-text__content {
  display: inline-block;
  position: relative;
  z-index: 2;
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: wb-gradient-animation linear infinite;
}

@keyframes wb-gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Disabled state */
.wb-gradient-text--disabled .wb-gradient-text__overlay,
.wb-gradient-text--disabled .wb-gradient-text__content {
  animation-play-state: paused;
}

/* Accessibility */
.wb-gradient-text[aria-label] .wb-gradient-text__content {
  speak: none;
}
`;

class GradientTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'GradientText';
    this.componentClasses = webflowBitsClasses.forComponent('gradient-text');
    this.defaultConfig = {
      colors: ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
      animationSpeed: 8, // seconds
      showBorder: false,
      disabled: false,
      borderColor: "#060010"
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-gradient-text-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: GradientText styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject GradientText styles', error);
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
      // GradientText-specific attributes
      colors: { attribute: 'wb-colors', type: 'string' },
      animationSpeed: { attribute: 'wb-animation-speed', type: 'duration' },
      showBorder: { attribute: 'wb-show-border', type: 'boolean' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      borderColor: { attribute: 'wb-border-color', type: 'string' }
    };
    
    const config = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Parse colors array from string
    if (config.colors && typeof config.colors === 'string') {
      try {
        // Handle both JSON array and comma-separated values
        if (config.colors.startsWith('[')) {
          config.colors = JSON.parse(config.colors);
        } else {
          config.colors = config.colors.split(',').map(color => color.trim());
        }
      } catch (error) {
        console.warn('WebflowBits GradientText: Invalid colors format, using default');
        config.colors = this.defaultConfig.colors;
      }
    }
    
    return config;
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
   * Create DOM structure for gradient text effect
   */
  createDOMStructure(element, config) {
    const originalContent = element.innerHTML;
    const textContent = element.textContent.trim();
    
    // Clear element
    element.innerHTML = '';
    
    // Create gradient background style
    const gradientStyle = `linear-gradient(to right, ${config.colors.join(', ')})`;
    
    // Create overlay element (border effect)
    let overlayElement = null;
    if (config.showBorder) {
      overlayElement = document.createElement('div');
      overlayElement.className = 'wb-gradient-text__overlay';
      overlayElement.style.backgroundImage = gradientStyle;
      overlayElement.style.animationDuration = `${config.animationSpeed}s`;
      
      // Set border color if specified
      if (config.borderColor !== this.defaultConfig.borderColor) {
        overlayElement.style.setProperty('--border-color', config.borderColor);
        const beforeStyle = document.createElement('style');
        beforeStyle.textContent = `
          .wb-gradient-text__overlay::before {
            background-color: ${config.borderColor} !important;
          }
        `;
        document.head.appendChild(beforeStyle);
      }
      
      element.appendChild(overlayElement);
    }
    
    // Create content element
    const contentElement = document.createElement('div');
    contentElement.className = 'wb-gradient-text__content';
    contentElement.style.backgroundImage = gradientStyle;
    contentElement.style.animationDuration = `${config.animationSpeed}s`;
    contentElement.textContent = textContent;
    
    element.appendChild(contentElement);

    return {
      originalContent,
      contentElement,
      overlayElement,
      gradientStyle
    };
  }

  /**
   * Apply custom styles to elements
   */
  applyCustomStyles(instance) {
    const { config, domStructure } = instance;
    const gradientStyle = `linear-gradient(to right, ${config.colors.join(', ')})`;
    
    // Update content element
    if (domStructure.contentElement) {
      domStructure.contentElement.style.backgroundImage = gradientStyle;
      domStructure.contentElement.style.animationDuration = `${config.animationSpeed}s`;
    }
    
    // Update overlay element if it exists
    if (domStructure.overlayElement) {
      domStructure.overlayElement.style.backgroundImage = gradientStyle;
      domStructure.overlayElement.style.animationDuration = `${config.animationSpeed}s`;
    }
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits GradientText: Element is empty or invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits GradientText: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      originalStyles: {
        background: element.style.background,
        backgroundImage: element.style.backgroundImage,
        animationDuration: element.style.animationDuration
      },
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      // Apply custom styles
      this.applyCustomStyles(instance);
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'gradient-text',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits GradientText: Failed to setup animation', error);
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
      console.warn('WebflowBits GradientText: Element not initialized');
      return;
    }

    // Merge new config with existing
    const updatedConfig = { ...instance.config, ...newConfig };
    instance.config = updatedConfig;

    // Remove old classes
    this.removeComponentClasses(element);
    
    // Apply updated classes
    this.applyComponentClasses(element, updatedConfig);
    
    // Update styles
    this.applyCustomStyles(instance);

    // Dispatch update event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-gradient-text-update',
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
   * Change animation speed for specific element
   */
  setSpeed(element, speed) {
    this.updateElement(element, { animationSpeed: parseFloat(speed) });
  }

  /**
   * Change colors for specific element
   */
  setColors(element, colors) {
    this.updateElement(element, { colors: Array.isArray(colors) ? colors : [colors] });
  }

  /**
   * Toggle border for specific element
   */
  toggleBorder(element, showBorder = null) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newShowBorder = showBorder !== null ? showBorder : !instance.config.showBorder;
    
    // Recreate DOM structure with new border setting
    const newConfig = { ...instance.config, showBorder: newShowBorder };
    instance.config = newConfig;
    
    // Recreate DOM structure
    instance.domStructure = this.createDOMStructure(element, newConfig);
    this.applyCustomStyles(instance);
    
    // Update classes
    this.removeComponentClasses(element);
    this.applyComponentClasses(element, newConfig);
  }

  /**
   * Initialize all elements with wb-component="gradient-text"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="gradient-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { originalStyles, domStructure } = instance;

    // Restore original content
    if (domStructure && domStructure.originalContent) {
      element.innerHTML = domStructure.originalContent;
    }

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
      'wb-gradient-text-destroy',
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
    console.log('WebflowBits GradientText: Refresh called');
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    return checkCSSConflicts(
      componentClassSets.gradientText, 
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
const gradientTextAnimator = new GradientTextAnimator();

// Export for use in other modules
export default gradientTextAnimator;
export { GradientTextAnimator };
