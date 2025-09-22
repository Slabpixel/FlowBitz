/**
 * Ripple Button Component
 * Creates a ripple effect when clicked (Material Design style)
 * Works with <button> and <a> elements
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Component-specific CSS
const componentCSS = `
/* Ripple Button Base Styles - minimal parent styles */
.wb-ripple-button {
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-out;
}

/* Scale animation for button click feedback */
.wb-ripple-button--clicked {
  transform: scale(var(--wb-scale-amount, 0.95));
}

/* Ripple effect container */
.wb-ripple-button__ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: wb-ripple-animation 0.6s linear;
  pointer-events: none;
  z-index: 1;
}

/* Ripple animation keyframes */
@keyframes wb-ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Dark ripple variant */
.wb-ripple-button--dark .wb-ripple-button__ripple {
  background-color: rgba(0, 0, 0, 0.2);
}

/* Custom color ripple */
.wb-ripple-button--custom .wb-ripple-button__ripple {
  background-color: var(--wb-ripple-color);
}

`;

/**
 * RippleButtonAnimator Class
 * Handles ripple effect creation and management
 */
class RippleButtonAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'RippleButton';
    this.componentClasses = webflowBitsClasses.forComponent('ripple-button');
    this.defaultConfig = {
      color: 'rgba(255, 255, 255, 0.6)', // Default ripple color
      duration: 600, // Animation duration in ms
      disabled: false,
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
      injectStyles('wb-ripple-button-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.error('Failed to inject RippleButton styles:', error);
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
      // RippleButton-specific attributes
      color: { attribute: 'wb-ripple-color', type: 'string' },
      duration: { attribute: 'wb-duration', type: 'number' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      hoverEffect: { attribute: 'wb-hover-effect', type: 'boolean' },
      scaleEffect: { attribute: 'wb-scale-effect', type: 'boolean' },
      scaleAmount: { attribute: 'wb-scale-amount', type: 'number' }
    };
    
    const config = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Validate color format
    if (config.color && !config.color.startsWith('rgba') && !config.color.startsWith('rgb') && !config.color.startsWith('#')) {
      // Convert hex to rgba if needed
      if (config.color.startsWith('#')) {
        const hex = config.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        config.color = `rgba(${r}, ${g}, ${b}, 0.6)`;
      }
    }
    
    return config;
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [this.componentClasses.parent];
    
    // Add color variant class
    if (config.color === 'rgba(0, 0, 0, 0.2)') {
      classesToApply.push(`${this.componentClasses.parent}--dark`);
    } else if (config.color !== this.defaultConfig.color) {
      classesToApply.push(`${this.componentClasses.parent}--custom`);
    }
    
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
    ComponentClassManager.removeClasses(
      element, 
      this.componentClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create ripple effect at click position
   */
  createRipple(event, element, config) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calculate click position relative to the element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'wb-ripple-button__ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    ripple.style.animationDuration = config.duration + 'ms';
    
    // Set custom color if specified
    if (config.color !== this.defaultConfig.color) {
      ripple.style.setProperty('--wb-ripple-color', config.color);
    }
    
    element.appendChild(ripple);
    
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
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, config.duration);
  }

  /**
   * Initialize ripple effect for a single element
   */
  initElement(element) {
    if (this.instances.has(element)) return;
    
    this.ensureStylesInjected();
    
    const config = this.parseConfig(element);
    
    // Apply component classes
    this.applyComponentClasses(element, config);
    
    // Ensure proper masking for anchor elements
    if (element.tagName === 'A') {
      // Force inline-block display for proper masking
      element.style.display = 'inline-block';
      // Ensure overflow is hidden for proper masking
      element.style.overflow = 'hidden';
    }
    
    // Create click handler
    const clickHandler = (event) => {
      if (config.disabled) return;
      
      // Prevent default for anchor tags to avoid navigation during animation
      if (element.tagName === 'A') {
        event.preventDefault();
        
        // Navigate after animation completes
        setTimeout(() => {
          if (element.href) {
            window.location.href = element.href;
          }
        }, config.duration);
      }
      
      this.createRipple(event, element, config);
    };
    
    // Store instance
    const instance = {
      element,
      config,
      clickHandler,
      domStructure: {
        originalContent: element.innerHTML,
        originalDisplay: element.style.display,
        originalOverflow: element.style.overflow
      }
    };
    
    this.instances.set(element, instance);
    
    // Add event listener
    element.addEventListener('click', clickHandler);
    
    // Dispatch initialization event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'init', 
      'ripple-button',
      { instance }
    );
  }

  /**
   * Update element configuration
   */
  updateElement(element, newConfig) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const updatedConfig = { ...instance.config, ...newConfig };
    instance.config = updatedConfig;
    
    // Update classes
    this.removeComponentClasses(element);
    this.applyComponentClasses(element, updatedConfig);
    
    // Dispatch update event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-ripple-button-update',
      { instance, newConfig }
    );
  }

  /**
   * Enable ripple effect for specific element
   */
  enableElement(element) {
    this.updateElement(element, { disabled: false });
  }

  /**
   * Disable ripple effect for specific element
   */
  disableElement(element) {
    this.updateElement(element, { disabled: true });
  }

  /**
   * Change ripple color for specific element
   */
  setRippleColor(element, color) {
    this.updateElement(element, { color });
  }

  /**
   * Change animation duration for specific element
   */
  setDuration(element, duration) {
    this.updateElement(element, { duration });
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
   * Toggle scale effect for specific element
   */
  toggleScaleEffect(element, scaleEffect = null) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newScaleEffect = scaleEffect !== null ? scaleEffect : !instance.config.scaleEffect;
    this.updateElement(element, { scaleEffect: newScaleEffect });
  }

  /**
   * Set scale amount for specific element
   */
  setScaleAmount(element, scaleAmount) {
    // Validate scale amount (should be between 0 and 1)
    if (scaleAmount < 0 || scaleAmount > 1) {
      console.warn('Scale amount should be between 0 and 1');
      return;
    }
    this.updateElement(element, { scaleAmount });
  }

  /**
   * Destroy specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    // Remove event listener
    element.removeEventListener('click', instance.clickHandler);
    
    // Remove component classes
    this.removeComponentClasses(element);
    
    // Restore original styles for anchor elements
    if (element.tagName === 'A' && instance.domStructure) {
      element.style.display = instance.domStructure.originalDisplay || '';
      element.style.overflow = instance.domStructure.originalOverflow || '';
    }
    
    // Restore original content
    if (instance.domStructure.originalContent) {
      element.innerHTML = instance.domStructure.originalContent;
    }
    
    // Dispatch destroy event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'destroy', 
      'ripple-button',
      { instance }
    );
    
    // Remove from instances
    this.instances.delete(element);
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    for (const element of this.instances.keys()) {
      this.destroyElement(element);
    }
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element);
  }

  /**
   * Get all instances
   */
  getAllInstances() {
    return Array.from(this.instances.values());
  }

  /**
   * Initialize all elements with wb-component="ripple-button"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="ripple-button"]');
    elements.forEach(element => this.initElement(element));
  }
}

// Create and export singleton instance
const rippleButtonAnimator = new RippleButtonAnimator();
export default rippleButtonAnimator;
