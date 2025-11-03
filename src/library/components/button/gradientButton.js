import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - GradientButton Component Styles */
.wb-gradient-button {
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-out;
}

/* Scale animation for button click feedback */
.wb-gradient-button--clicked {
  transform: scale(var(--wb-scale-amount, 0.95));
}

.wb-gradient-button__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 300% 100%;
  animation: wb-gradient-button-animation linear infinite;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background-color: transparent;
}

/* Only show ::before for solid variant if needed */
.wb-gradient-button--solid .wb-gradient-button__overlay::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: transparent;
  z-index: -1;
  border-radius: inherit;
}

.wb-gradient-button__content {
  display: inline-block;
  position: relative;
  z-index: 2;
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: wb-gradient-button-animation linear infinite;
  font-weight: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  text-decoration: none;
}

@keyframes wb-gradient-button-animation {
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

/* Hover effects - only affect gradient animation speed */
.wb-gradient-button:hover .wb-gradient-button__overlay,
.wb-gradient-button:hover .wb-gradient-button__content {
  animation-duration: 0.5s;
}

/* Disabled state */
.wb-gradient-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
  box-shadow: none !important;
}

.wb-gradient-button--disabled .wb-gradient-button__overlay,
.wb-gradient-button--disabled .wb-gradient-button__content {
  animation-play-state: paused;
}

.wb-gradient-button--disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Button variants - only affect gradient rendering */

.wb-gradient-button--solid {
  background-size: 300% 100%;
  animation: wb-gradient-button-animation linear infinite;
}

.wb-gradient-button--solid .wb-gradient-button__content {
  color: white;
  background: none;
  animation: none;
}

/* Accessibility */
.wb-gradient-button[aria-label] .wb-gradient-button__content {
  speak: none;
}
`;

class GradientButtonAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'GradientButton';
    this.componentClasses = webflowBitsClasses.forComponent('gradient-button');
    this.defaultConfig = {
      colors: ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
      animationSpeed: 8, // seconds
      disabled: false,
      textColor: 'white', // text color for solid variant
      hoverEffect: true,
      scaleEffect: true, // Enable scale animation on click
      scaleAmount: 0.95 // Scale amount (0.95 = shrink to 95%)
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-gradient-button-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.warn('WebflowBits: Failed to inject GradientButton styles', error);
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
      // GradientButton-specific attributes
      colors: { attribute: 'wb-colors', type: 'colorArray', minColors: 2 },
      animationSpeed: { attribute: 'wb-animation-speed', type: 'duration' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      textColor: { attribute: 'wb-text-color', type: 'color' },
      hoverEffect: { attribute: 'wb-hover-effect', type: 'boolean' },
      scaleEffect: { attribute: 'wb-scale-effect', type: 'boolean' },
      scaleAmount: { attribute: 'wb-scale-amount', type: 'number' }
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [this.componentClasses.parent];
    
    // Add solid variant class (default)
    classesToApply.push(`${this.componentClasses.parent}--solid`);
    
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
      `${this.componentClasses.parent}--disabled`,
      `${this.componentClasses.parent}--outline`,
      `${this.componentClasses.parent}--solid`
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for gradient button effect
   */
  createDOMStructure(element, config) {
    const originalContent = element.innerHTML;
    const textContent = element.textContent.trim();
    
    // Get computed styles from parent element
    const computedStyle = window.getComputedStyle(element);
    const parentStyles = {
      fontWeight: computedStyle.fontWeight,
      fontSize: computedStyle.fontSize,
      fontFamily: computedStyle.fontFamily,
      lineHeight: computedStyle.lineHeight,
      letterSpacing: computedStyle.letterSpacing,
      textTransform: computedStyle.textTransform
    };
    
    // Clear element
    element.innerHTML = '';
    
    // Create gradient background style
    const gradientStyle = `linear-gradient(45deg, ${config.colors.join(', ')})`;
    
    // Create overlay element for gradient background
    const overlayElement = document.createElement('div');
    overlayElement.className = 'wb-gradient-button__overlay';
    overlayElement.style.backgroundImage = gradientStyle;
    overlayElement.style.animationDuration = `${config.animationSpeed}s`;
    
    // Create content element
    const contentElement = document.createElement('div');
    contentElement.className = 'wb-gradient-button__content';
    contentElement.style.color = config.textColor || 'white';
    contentElement.style.background = 'none';
    contentElement.textContent = textContent;
    
    // Apply parent styles to content element
    Object.keys(parentStyles).forEach(property => {
      if (parentStyles[property] && parentStyles[property] !== 'normal') {
        contentElement.style[property] = parentStyles[property];
      }
    });
    
    // Append elements
    element.appendChild(overlayElement);
    element.appendChild(contentElement);

    return {
      originalContent,
      contentElement,
      overlayElement,
      gradientStyle,
      parentStyles
    };
  }

  /**
   * Apply custom styles to elements
   */
  applyCustomStyles(instance) {
    const { config, domStructure } = instance;
    const gradientStyle = `linear-gradient(45deg, ${config.colors.join(', ')})`;
    
    // Update content element
    if (domStructure.contentElement) {
      domStructure.contentElement.style.color = config.textColor || 'white';
      domStructure.contentElement.style.background = 'none';
    }
    
    // Update overlay element
    if (domStructure.overlayElement) {
      domStructure.overlayElement.style.backgroundImage = gradientStyle;
      domStructure.overlayElement.style.animationDuration = `${config.animationSpeed}s`;
    }
    
    // Apply gradient background to button with animation
    instance.element.style.backgroundImage = gradientStyle;
    instance.element.style.backgroundSize = '300% 100%';
    instance.element.style.animationDuration = `${config.animationSpeed}s`;
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element || !element.textContent.trim()) {
      console.warn('WebflowBits GradientButton: Element is empty or invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits GradientButton: Element already initialized');
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
      
      // Add click handler for scale animation
      const clickHandler = (event) => {
        if (config.disabled) return;
        
        // Apply scale animation if enabled
        if (config.scaleEffect) {
          // Set the scale amount as a CSS custom property
          element.style.setProperty('--wb-scale-amount', config.scaleAmount);
          element.classList.add(`${this.componentClasses.parent}--clicked`);
          
          // Remove scale class after brief moment for bounce-back effect
          setTimeout(() => {
            element.classList.remove(`${this.componentClasses.parent}--clicked`);
          }, 100);
        }
      };
      
      element.addEventListener('click', clickHandler);
      instance.clickHandler = clickHandler;
      
      // Apply custom styles
      this.applyCustomStyles(instance);
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'gradient-button',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits GradientButton: Failed to setup animation', error);
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
      console.warn('WebflowBits GradientButton: Element not initialized');
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
      'wb-gradient-button-update',
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
   * Change variant for specific element
   */
  setVariant(element, variant) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newConfig = { ...instance.config, variant };
    instance.config = newConfig;
    
    // Recreate DOM structure with new variant
    instance.domStructure = this.createDOMStructure(element, newConfig);
    this.applyCustomStyles(instance);
    
    // Update classes
    this.removeComponentClasses(element);
    this.applyComponentClasses(element, newConfig);
  }

  /**
   * Change text color for specific element
   */
  setTextColor(element, textColor) {
    this.updateElement(element, { textColor });
  }

  /**
   * Toggle hover effect for specific element
   */
  toggleHoverEffect(element, hoverEffect = null) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newHoverEffect = hoverEffect !== null ? hoverEffect : !instance.config.hoverEffect;
    this.updateElement(element, { hoverEffect: newHoverEffect });
  }

  /**
   * Initialize all elements with wb-component="gradient-button"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="gradient-button"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { originalStyles, domStructure, clickHandler } = instance;
    
    // Remove click handler
    if (clickHandler) {
      element.removeEventListener('click', clickHandler);
    }

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
      'wb-gradient-button-destroy',
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
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    return checkCSSConflicts(
      componentClassSets.gradientButton, 
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
const gradientButtonAnimator = new GradientButtonAnimator();

// Export for use in other modules
export default gradientButtonAnimator;
export { GradientButtonAnimator };