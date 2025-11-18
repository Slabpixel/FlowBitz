/**
 * Shimmer Button Component
 * Creates a shimmer effect on hover with customizable direction and color
 * Works with <button> and <a> elements
 * Button color is inherited from Webflow CSS settings
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Component-specific CSS
const componentCSS = `
/* Shimmer Button Base Styles */
.wb-shimmer-button {
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-out;
  cursor: pointer;
}

/* Scale animation for button click feedback */
.wb-shimmer-button--clicked {
  transform: scale(var(--wb-scale-amount, 0.95));
}

/* Shimmer effect overlay */
.wb-shimmer-button__shimmer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  border-radius: inherit;
  transition: transform 0.7s ease-out;
}

/* Shimmer speed variations */
.wb-shimmer-button--speed-slow .wb-shimmer-button__shimmer {
  transition: transform 0.7s ease-out;
}

.wb-shimmer-button--speed-medium .wb-shimmer-button__shimmer {
  transition: transform 0.5s ease-out;
}

.wb-shimmer-button--speed-fast .wb-shimmer-button__shimmer {
  transition: transform 0.3s ease-out;
}

/* Shimmer gradient - Left to Right */
.wb-shimmer-button--direction-left .wb-shimmer-button__shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--wb-shimmer-color, rgba(255, 255, 255, 0.2)) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
}

.wb-shimmer-button--direction-left:hover .wb-shimmer-button__shimmer {
  transform: translateX(100%);
}

/* Shimmer gradient - Right to Left */
.wb-shimmer-button--direction-right .wb-shimmer-button__shimmer {
  background: linear-gradient(
    270deg,
    transparent 0%,
    var(--wb-shimmer-color, rgba(255, 255, 255, 0.2)) 50%,
    transparent 100%
  );
  transform: translateX(100%);
}

.wb-shimmer-button--direction-right:hover .wb-shimmer-button__shimmer {
  transform: translateX(-100%);
}

/* Shimmer gradient - Top to Bottom */
.wb-shimmer-button--direction-top .wb-shimmer-button__shimmer {
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--wb-shimmer-color, rgba(255, 255, 255, 0.2)) 50%,
    transparent 100%
  );
  transform: translateY(-100%);
}

.wb-shimmer-button--direction-top:hover .wb-shimmer-button__shimmer {
  transform: translateY(100%);
}

/* Shimmer gradient - Bottom to Top */
.wb-shimmer-button--direction-bottom .wb-shimmer-button__shimmer {
  background: linear-gradient(
    0deg,
    transparent 0%,
    var(--wb-shimmer-color, rgba(255, 255, 255, 0.2)) 50%,
    transparent 100%
  );
  transform: translateY(100%);
}

.wb-shimmer-button--direction-bottom:hover .wb-shimmer-button__shimmer {
  transform: translateY(-100%);
}

/* Shadow effect - based on button color */
.wb-shimmer-button--shadow {
  transition: box-shadow 0.3s ease;
}

.wb-shimmer-button--shadow:hover {
  box-shadow: 0 10px 25px -5px var(--wb-button-shadow-color, rgba(0, 0, 0, 0.3)), 0 4px 6px -2px var(--wb-button-shadow-color, rgba(0, 0, 0, 0.2));
  filter: brightness(1.1);
}

/* Content wrapper to ensure proper z-index */
.wb-shimmer-button__content {
  position: relative;
  z-index: 2;
}

/* Disabled state */
.wb-shimmer-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.wb-shimmer-button--disabled:hover .wb-shimmer-button__shimmer {
  transform: none;
}

.wb-shimmer-button--disabled:hover {
  transform: none;
  box-shadow: none;
}
`;

/**
 * ShimmerButtonAnimator Class
 * Handles shimmer effect creation and management
 */
class ShimmerButtonAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'ShimmerButton';
    this.componentClasses = webflowBitsClasses.forComponent('shimmer-button');
    this.defaultConfig = {
      shimmerColor: 'rgba(255, 255, 255, 0.2)', // Default shimmer color (white with 20% opacity, matching button.jsx)
      direction: 'left', // 'left', 'right', 'top', 'bottom'
      speed: 'medium', // 'slow', 'medium', 'fast'
      shadow: true, // Enable shadow effect based on button color
      disabled: false,
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
      injectStyles('wb-shimmer-button-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.error('Failed to inject ShimmerButton styles:', error);
    }
  }

  /**
   * Ensure styles are injected when needed
   */
  ensureStylesInjected() {
    if (!this.stylesInjected) {
      this.injectComponentStyles();
      // Force a reflow to ensure styles are in the DOM
      if (typeof document !== 'undefined') {
        void document.body.offsetHeight;
      }
    }
  }

  /**
   * Parse color value and convert to rgba if needed
   */
  parseColor(color) {
    if (!color) return this.defaultConfig.shimmerColor;
    
    // If it's already rgba/rgb/hsl/hsla, return as is
    if (color.startsWith('rgba') || color.startsWith('rgb') || 
        color.startsWith('hsl') || color.startsWith('hsla') ||
        color.startsWith('var(')) {
      return color;
    }
    
    // If it's a hex color, convert to rgba with opacity
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.3)`;
    }
    
    // If it's a named color, try to convert
    // For simplicity, we'll use a default opacity
    return `rgba(255, 255, 255, 0.3)`;
  }

  /**
   * Parse custom attributes from element using utility functions
   */
  parseConfig(element) {
    const attributeMap = {
      // ShimmerButton-specific attributes
      shimmerColor: { attribute: 'wb-shimmer-color', type: 'string' },
      direction: { attribute: 'wb-shimmer-direction', type: 'string' },
      speed: { attribute: 'wb-shimmer-speed', type: 'string' },
      shadow: { attribute: 'wb-shadow', type: 'boolean' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      scaleEffect: { attribute: 'wb-scale-effect', type: 'boolean' },
      scaleAmount: { attribute: 'wb-scale-amount', type: 'number' }
    };
    
    const config = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Parse and normalize shimmer color
    if (config.shimmerColor) {
      config.shimmerColor = this.parseColor(config.shimmerColor);
    }
    
    // Normalize direction
    const validDirections = ['left', 'right', 'top', 'bottom'];
    if (!validDirections.includes(config.direction)) {
      config.direction = this.defaultConfig.direction;
    }
    
    // Normalize speed
    const validSpeeds = ['slow', 'medium', 'fast'];
    if (!validSpeeds.includes(config.speed)) {
      config.speed = this.defaultConfig.speed;
    }
    
    return config;
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent,
      `${this.componentClasses.parent}--direction-${config.direction}`,
      `${this.componentClasses.parent}--speed-${config.speed}`
    ];
    
    if (config.shadow) {
      classesToApply.push(`${this.componentClasses.parent}--shadow`);
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
   * Create DOM structure for shimmer effect
   */
  createDOMStructure(element, config) {
    // Save original content first
    const originalContent = element.innerHTML || element.textContent;
    
    // Clear element content temporarily
    element.innerHTML = '';
    
    // Create shimmer overlay first (needs to be behind content)
    const shimmer = document.createElement('div');
    shimmer.className = 'wb-shimmer-button__shimmer';
    element.appendChild(shimmer);
    
    // Create content wrapper
    const contentWrapper = document.createElement('span');
    contentWrapper.className = 'wb-shimmer-button__content';
    
    // Restore content to wrapper
    if (originalContent) {
      // Try to parse as HTML first, fallback to text
      try {
        contentWrapper.innerHTML = originalContent;
      } catch (e) {
        contentWrapper.textContent = originalContent;
      }
    }
    
    element.appendChild(contentWrapper);
    
    return {
      contentWrapper,
      shimmer
    };
  }

  /**
   * Apply custom styles to elements
   */
  applyCustomStyles(instance) {
    const { config, domStructure, element } = instance;
    
    if (domStructure && domStructure.shimmer) {
      // Set shimmer color as CSS custom property
      domStructure.shimmer.style.setProperty('--wb-shimmer-color', config.shimmerColor);
      
      // DO NOT set transform inline - let CSS handle it!
      // Inline styles have higher specificity and will override :hover states
      // The CSS classes already handle the initial transform position
    }
    
    // Set shadow color based on button's background color if shadow is enabled
    if (config.shadow) {
      // Use requestAnimationFrame to ensure styles are computed
      requestAnimationFrame(() => {
        const computedStyle = getComputedStyle(element);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Extract RGB values from background color
        // Handle both rgb() and rgba() formats
        const rgbMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (rgbMatch) {
          const r = parseInt(rgbMatch[1]);
          const g = parseInt(rgbMatch[2]);
          const b = parseInt(rgbMatch[3]);
          // Use the button color with some opacity for shadow
          element.style.setProperty('--wb-button-shadow-color', `rgba(${r}, ${g}, ${b}, 0.4)`);
        } else {
          // Try to handle hex colors
          const hexMatch = backgroundColor.match(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/);
          if (hexMatch) {
            const r = parseInt(hexMatch[1], 16);
            const g = parseInt(hexMatch[2], 16);
            const b = parseInt(hexMatch[3], 16);
            element.style.setProperty('--wb-button-shadow-color', `rgba(${r}, ${g}, ${b}, 0.4)`);
          } else {
            // Fallback to a default shadow color
            element.style.setProperty('--wb-button-shadow-color', 'rgba(0, 0, 0, 0.3)');
          }
        }
      });
    }
  }

  /**
   * Initialize shimmer effect for a single element
   */
  initElement(element) {
    if (this.instances.has(element)) {
      return;
    }
    
    // Validate element
    if (!element || !element.nodeType) {
      console.warn('ShimmerButton: Invalid element provided', element);
      return;
    }
    
    this.ensureStylesInjected();
    
    const config = this.parseConfig(element);
    
    // Apply component classes first
    this.applyComponentClasses(element, config);
    
    // Ensure proper display for anchor elements while preserving flexbox
    if (element.tagName === 'A') {
      const hasFlexClasses = element.classList.contains('btn') || 
                            element.classList.contains('w-button') ||
                            getComputedStyle(element).display === 'flex';
      
      if (!hasFlexClasses) {
        element.style.display = 'inline-block';
      }
      element.style.overflow = 'hidden';
    } else {
      element.style.overflow = 'hidden';
    }
    
    // Create DOM structure
    const domStructure = this.createDOMStructure(element, config);
    
    // Create instance
    const instance = {
      element,
      config,
      domStructure,
      addedClasses: []
    };
    
    this.instances.set(element, instance);
    
    // Apply custom styles immediately
    this.applyCustomStyles(instance);
    
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
    
    // Dispatch initialization event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'init', 
      'shimmer-button',
      { instance }
    );
  }

  /**
   * Update element configuration
   */
  updateElement(element, newConfig = {}) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const updatedConfig = { ...instance.config, ...newConfig };
    
    // Parse color if it changed
    if (newConfig.shimmerColor !== undefined) {
      updatedConfig.shimmerColor = this.parseColor(newConfig.shimmerColor);
    }
    
    // Normalize direction if it changed
    if (newConfig.direction !== undefined) {
      const validDirections = ['left', 'right', 'top', 'bottom'];
      if (!validDirections.includes(updatedConfig.direction)) {
        updatedConfig.direction = this.defaultConfig.direction;
      }
    }
    
    instance.config = updatedConfig;
    
    // Update classes
    this.removeComponentClasses(element);
    this.applyComponentClasses(element, updatedConfig);
    
    // Update custom styles
    this.applyCustomStyles(instance);
    
    // Dispatch update event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-shimmer-button-update',
      { instance, newConfig: updatedConfig }
    );
  }

  /**
   * Enable shimmer effect for specific element
   */
  enableElement(element) {
    this.updateElement(element, { disabled: false });
  }

  /**
   * Disable shimmer effect for specific element
   */
  disableElement(element) {
    this.updateElement(element, { disabled: true });
  }

  /**
   * Change shimmer color for specific element
   */
  setShimmerColor(element, color) {
    this.updateElement(element, { shimmerColor: color });
  }

  /**
   * Change shimmer direction for specific element
   */
  setDirection(element, direction) {
    const validDirections = ['left', 'right', 'top', 'bottom'];
    if (!validDirections.includes(direction)) {
      console.warn('ShimmerButton: Invalid direction. Must be one of: left, right, top, bottom');
      return;
    }
    this.updateElement(element, { direction });
  }

  /**
   * Toggle shadow effect for specific element
   */
  toggleShadow(element, shadow = null) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newShadow = shadow !== null ? shadow : !instance.config.shadow;
    this.updateElement(element, { shadow: newShadow });
  }

  /**
   * Destroy specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    // Remove click handler
    if (instance.clickHandler) {
      element.removeEventListener('click', instance.clickHandler);
    }
    
    // Remove component classes
    this.removeComponentClasses(element);
    
    // Restore original content if it was wrapped
    if (instance.domStructure && instance.domStructure.contentWrapper) {
      const originalContent = instance.domStructure.contentWrapper.innerHTML;
      element.innerHTML = originalContent;
    }
    
    // Remove shimmer overlay
    if (instance.domStructure && instance.domStructure.shimmer) {
      instance.domStructure.shimmer.remove();
    }
    
    // Reset element styles
    element.style.overflow = '';
    if (element.tagName === 'A') {
      element.style.display = '';
    }
    
    // Dispatch destroy event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'destroy', 
      'shimmer-button',
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
   * Initialize all elements with wb-component="shimmer-button"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="shimmer-button"]');
    elements.forEach((element) => {
      this.initElement(element);
    });
  }

  /**
   * Refresh all instances - re-initialize elements that may have changed
   */
  refresh() {
    // Re-initialize all existing elements
    const allElements = document.querySelectorAll('[wb-component="shimmer-button"]');
    allElements.forEach(element => {
      // If already initialized, destroy and re-initialize
      if (this.instances.has(element)) {
        this.destroyElement(element);
      }
      this.initElement(element);
    });
  }
}

// Create and export singleton instance
const shimmerButtonAnimator = new ShimmerButtonAnimator();

// Auto-initialize components with wb-component="shimmer-button"
if (typeof document !== 'undefined') {
  const autoInit = () => {
    shimmerButtonAnimator.initAll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    // DOM already loaded, initialize immediately
    autoInit();
  }

  // Also initialize on window load as a fallback
  window.addEventListener('load', () => {
    shimmerButtonAnimator.initAll();
  });
}

export default shimmerButtonAnimator;

