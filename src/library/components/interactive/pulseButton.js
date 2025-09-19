/**
 * Pulse Button Component
 * Creates a gentle pulsing animation to draw attention
 * Works with <button> and <a> elements
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Component-specific CSS
const componentCSS = `
/* Pulse Button Base Styles */
.wb-pulse-button {
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

/* Ensure proper display for anchor elements */
.wb-pulse-button[href] {
  display: inline-block;
  text-decoration: none;
}

/* Remove default link styles that might interfere */
.wb-pulse-button[href]:visited,
.wb-pulse-button[href]:active,
.wb-pulse-button[href]:focus {
  color: inherit;
  text-decoration: none;
}

/* Pulse animation */
.wb-pulse-button--pulsing {
  animation: wb-pulse-animation 2s ease-in-out infinite;
}

/* Pulse animation keyframes */
@keyframes wb-pulse-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Fast pulse variant */
.wb-pulse-button--fast {
  animation-duration: 1s;
}

/* Slow pulse variant */
.wb-pulse-button--slow {
  animation-duration: 3s;
}

/* Custom pulse variant */
.wb-pulse-button--custom {
  animation-duration: var(--wb-pulse-duration);
  animation-timing-function: var(--wb-pulse-timing);
}

/* Hover pause effect */
.wb-pulse-button--hover-pause:hover {
  animation-play-state: paused;
}

/* Disabled state */
.wb-pulse-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  animation: none;
}

.wb-pulse-button--disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Focus states for accessibility */
.wb-pulse-button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.wb-pulse-button:focus:not(:focus-visible) {
  outline: none;
}

/* Ensure proper behavior for anchor elements */
.wb-pulse-button[href] {
  transition: all 0.2s ease;
}

.wb-pulse-button[href]:hover {
  text-decoration: none;
}

/* Prevent text selection during animation */
.wb-pulse-button--pulsing {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
`;

/**
 * PulseButtonAnimator Class
 * Handles pulse animation creation and management
 */
class PulseButtonAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'PulseButton';
    this.componentClasses = webflowBitsClasses.forComponent('pulse-button');
    this.defaultConfig = {
      speed: 'normal', // 'slow', 'normal', 'fast', or custom duration in ms
      disabled: false,
      hoverPause: false,
      intensity: 1.05 // Scale factor for pulse
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-pulse-button-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.error('Failed to inject PulseButton styles:', error);
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
      // PulseButton-specific attributes
      speed: { attribute: 'wb-speed', type: 'string' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' },
      hoverPause: { attribute: 'wb-hover-pause', type: 'boolean' },
      intensity: { attribute: 'wb-intensity', type: 'number' }
    };
    
    const config = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Validate speed
    if (typeof config.speed === 'string') {
      const speedMap = {
        'slow': '3s',
        'normal': '2s',
        'fast': '1s'
      };
      
      if (speedMap[config.speed]) {
        config.speed = speedMap[config.speed];
      } else if (config.speed.endsWith('s') || config.speed.endsWith('ms')) {
        // Already formatted
      } else {
        // Assume it's a number in seconds
        config.speed = config.speed + 's';
      }
    }
    
    return config;
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [this.componentClasses.parent];
    
    // Add speed variant class
    if (config.speed === '1s') {
      classesToApply.push(`${this.componentClasses.parent}--fast`);
    } else if (config.speed === '3s') {
      classesToApply.push(`${this.componentClasses.parent}--slow`);
    } else if (config.speed !== '2s') {
      classesToApply.push(`${this.componentClasses.parent}--custom`);
    }
    
    if (config.hoverPause) {
      classesToApply.push(`${this.componentClasses.parent}--hover-pause`);
    }
    
    if (config.disabled) {
      classesToApply.push(`${this.componentClasses.parent}--disabled`);
    } else {
      classesToApply.push(`${this.componentClasses.parent}--pulsing`);
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
   * Apply custom styles to elements
   */
  applyCustomStyles(instance) {
    const { config, element } = instance;
    
    // Set custom animation properties
    if (config.speed !== '2s' && config.speed !== '1s' && config.speed !== '3s') {
      element.style.setProperty('--wb-pulse-duration', config.speed);
      element.style.setProperty('--wb-pulse-timing', 'ease-in-out');
    }
    
    // Set custom intensity
    if (config.intensity !== 1.05) {
      const uniqueId = instance.element.id || Math.random().toString(36).substr(2, 9);
      const animationName = `wb-pulse-animation-${uniqueId}`;
      
      const keyframes = `
        @keyframes ${animationName} {
          0% { transform: scale(1); }
          50% { transform: scale(${config.intensity}); }
          100% { transform: scale(1); }
        }
      `;
      
      // Remove existing custom keyframes
      const existingStyle = document.getElementById(`wb-pulse-custom-${uniqueId}`);
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add new custom keyframes
      const style = document.createElement('style');
      style.id = `wb-pulse-custom-${uniqueId}`;
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      // Apply custom animation - ensure it overrides the default
      element.style.animationName = animationName;
      element.style.animationDuration = config.speed || '2s';
      element.style.animationTimingFunction = 'ease-in-out';
      element.style.animationIterationCount = 'infinite';
    } else {
      // Reset to default animation if intensity is default
      element.style.animationName = 'wb-pulse-animation';
    }
  }

  /**
   * Initialize pulse animation for a single element
   */
  initElement(element) {
    if (this.instances.has(element)) return;
    
    // Validate element type
    if (!this.isValidElement(element)) {
      console.warn('PulseButton: Element must be a button or anchor element', element);
      return;
    }
    
    this.ensureStylesInjected();
    
    const config = this.parseConfig(element);
    
    // Apply component classes
    this.applyComponentClasses(element, config);
    
    // Create instance
    const instance = {
      element,
      config,
      domStructure: {
        originalContent: element.innerHTML
      }
    };
    
    this.instances.set(element, instance);
    
    // Apply custom styles
    this.applyCustomStyles(instance);
    
    // Dispatch initialization event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'init', 
      'pulse-button',
      { instance }
    );
  }

  /**
   * Validate if element is suitable for pulse button
   */
  isValidElement(element) {
    return element && (
      element.tagName.toLowerCase() === 'button' ||
      element.tagName.toLowerCase() === 'a'
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
    
    // Update custom styles - this will handle intensity changes
    this.applyCustomStyles(instance);
    
    // Dispatch update event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-pulse-button-update',
      { instance, newConfig }
    );
  }

  /**
   * Enable pulse animation for specific element
   */
  enableElement(element) {
    this.updateElement(element, { disabled: false });
    
    // For anchor elements, restore navigation when enabled
    if (element.tagName.toLowerCase() === 'a') {
      this.handleAnchorDisabledState(element, false);
    }
  }

  /**
   * Disable pulse animation for specific element
   */
  disableElement(element) {
    this.updateElement(element, { disabled: true });
    
    // For anchor elements, prevent navigation when disabled
    if (element.tagName.toLowerCase() === 'a') {
      this.handleAnchorDisabledState(element, true);
    }
  }

  /**
   * Handle disabled state for anchor elements
   */
  handleAnchorDisabledState(element, disabled) {
    if (disabled) {
      // Store original href and remove it
      if (!element.dataset.originalHref) {
        element.dataset.originalHref = element.href;
      }
      element.removeAttribute('href');
      element.setAttribute('aria-disabled', 'true');
    } else {
      // Restore original href
      if (element.dataset.originalHref) {
        element.href = element.dataset.originalHref;
        delete element.dataset.originalHref;
      }
      element.removeAttribute('aria-disabled');
    }
  }

  /**
   * Change pulse speed for specific element
   */
  setSpeed(element, speed) {
    this.updateElement(element, { speed });
  }

  /**
   * Change pulse intensity for specific element
   */
  setIntensity(element, intensity) {
    this.updateElement(element, { intensity });
  }

  /**
   * Toggle hover pause for specific element
   */
  toggleHoverPause(element, hoverPause = null) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    const newHoverPause = hoverPause !== null ? hoverPause : !instance.config.hoverPause;
    this.updateElement(element, { hoverPause: newHoverPause });
  }

  /**
   * Destroy specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    // Remove component classes
    this.removeComponentClasses(element);
    
    // Remove custom keyframes
    const customStyle = document.getElementById(`wb-pulse-custom-${element.id || 'default'}`);
    if (customStyle) {
      customStyle.remove();
    }
    
    // Reset element styles
    element.style.animationName = '';
    element.style.animationDuration = '';
    element.style.animationTimingFunction = '';
    element.style.animationIterationCount = '';
    element.style.setProperty('--wb-pulse-duration', '');
    element.style.setProperty('--wb-pulse-timing', '');
    
    // Clean up anchor-specific attributes
    if (element.tagName.toLowerCase() === 'a') {
      // Restore original href if it was stored
      if (element.dataset.originalHref) {
        element.href = element.dataset.originalHref;
        delete element.dataset.originalHref;
      }
      element.removeAttribute('aria-disabled');
    }
    
    // Restore original content
    if (instance.domStructure.originalContent) {
      element.innerHTML = instance.domStructure.originalContent;
    }
    
    // Dispatch destroy event using utility
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'destroy', 
      'pulse-button',
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
}

// Create and export singleton instance
const pulseButtonAnimator = new PulseButtonAnimator();
export default pulseButtonAnimator;
