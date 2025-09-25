import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - Magnetic Button Component Styles */
.wb-magnetic-button {
  position: relative;
  display: inline-block;
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: none; /* Disable CSS transitions to prevent conflicts */
}

.wb-magnetic-button__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
  pointer-events: none; /* Prevent inner element from interfering with mouse events */
}

/* Ensure proper display for different element types */
.wb-magnetic-button[href] {
  display: inline-block;
}

.wb-magnetic-button[href] .wb-magnetic-button__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

/* Performance optimization during animation */
.wb-magnetic-button-animating {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-magnetic-button-completed {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-magnetic-button[aria-label] .wb-magnetic-button__inner {
  speak: none;
}

/* Disabled state */
.wb-magnetic-button-disabled {
  pointer-events: none;
  transform: none !important;
  transition: none !important;
}
`;

/**
 * Utility Functions
 */

// Linear interpolation function
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

// Get local pointer position relative to element
function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

// Calculate distance between two points
function getDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

/**
 * Magnet Effect Class - Simplified and More Reliable
 */
class MagnetEffect {
  constructor(element, config) {
    this.element = element;
    this.config = config;
    
    this.isActive = false;
    this.currentX = 0;
    this.currentY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.rect = null;
    this.animationId = null;
    
    // Throttle mouse move for better performance
    this.throttledMouseMove = this.throttle(this.handleMouseMove.bind(this), 16); // ~60fps
    
    this.init();
  }

  init() {
    this.updateRect();
    this.initEvents();
    this.startAnimationLoop();
  }

  updateRect() {
    this.rect = this.element.getBoundingClientRect();
  }

  initEvents() {
    // Mouse events
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.element.addEventListener('mousemove', this.throttledMouseMove);
    
    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Resize event
    this.handleResize = this.throttle(() => {
      this.updateRect();
    }, 100);
    window.addEventListener('resize', this.handleResize);
  }

  handleMouseEnter() {
    if (this.config.disabled) return;
    this.isActive = true;
    this.updateRect();
    if (this.config.debug) {
      console.log('Magnetic Button: Mouse entered');
    }
  }

  handleMouseLeave() {
    if (this.config.disabled) return;
    this.isActive = false;
    this.targetX = 0;
    this.targetY = 0;
    if (this.config.debug) {
      console.log('Magnetic Button: Mouse left');
    }
  }

  handleMouseMove(e) {
    if (this.config.disabled || !this.isActive) return;
    this.updatePosition(e);
  }

  handleTouchStart(e) {
    if (this.config.disabled) return;
    this.isActive = true;
    this.updateRect();
  }

  handleTouchMove(e) {
    if (this.config.disabled || !this.isActive) return;
    e.preventDefault();
    this.updatePosition(e);
  }

  handleTouchEnd() {
    if (this.config.disabled) return;
    this.isActive = false;
    this.targetX = 0;
    this.targetY = 0;
  }

  updatePosition(e) {
    if (!this.rect || !this.isActive) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const centerX = this.rect.left + this.rect.width / 2;
    const centerY = this.rect.top + this.rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Check if pointer is within magnet area
    const maxDistance = Math.max(this.rect.width, this.rect.height) / 2 + this.config.padding;
    
    if (distance < maxDistance) {
      // Calculate magnetic force (stronger when closer)
      const force = Math.max(0, 1 - distance / maxDistance);
      const strength = this.config.magnetStrength;
      
      this.targetX = (deltaX * force) / strength;
      this.targetY = (deltaY * force) / strength;
    } else {
      this.targetX = 0;
      this.targetY = 0;
    }
  }

  startAnimationLoop() {
    const animate = () => {
      // Smooth interpolation to target position
      this.currentX += (this.targetX - this.currentX) * 0.15;
      this.currentY += (this.targetY - this.currentY) * 0.15;

      // Apply transform
      this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Throttle function for better performance
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  destroy() {
    // Remove event listeners
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    this.element.removeEventListener('mousemove', this.throttledMouseMove);
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('resize', this.handleResize);

    // Cancel animation loop
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Reset position
    this.isActive = false;
    this.currentX = 0;
    this.currentY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.element.style.transform = 'translate3d(0px, 0px, 0)';
  }
}

/**
 * Main Magnet Animator Class
 */
class MagnetAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'MagneticButton';
    this.componentClasses = webflowBitsClasses.forComponent('magnetic-button');
    this.defaultConfig = {
      padding: 100,
      disabled: false,
      magnetStrength: 2,
      activeTransition: 'transform 0.3s ease-out',
      inactiveTransition: 'transform 0.5s ease-in-out',
      debug: false
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-magnetic-button-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: Magnetic Button styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject Magnetic Button styles', error);
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
        // Magnet-specific attributes
        padding: { attribute: 'wb-padding', type: 'number', parser: parseInt },
        disabled: { attribute: 'wb-disabled', type: 'boolean', parser: (val) => val === 'true' || val === '' },
        magnetStrength: { attribute: 'wb-strength', type: 'number', parser: parseFloat },
        activeTransition: { attribute: 'wb-active-transition', type: 'string' },
        inactiveTransition: { attribute: 'wb-inactive-transition', type: 'string' },
        debug: { attribute: 'wb-debug', type: 'boolean', parser: (val) => val === 'true' || val === '' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent || 'wb-magnetic-button'
    ];
    
    if (config.disabled) {
      classesToApply.push('wb-magnetic-button-disabled');
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
      this.componentClasses.parent || 'wb-magnetic-button',
      this.componentClasses.animating || 'wb-magnetic-button-animating',
      this.componentClasses.completed || 'wb-magnetic-button-completed',
      'wb-magnetic-button-disabled'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for magnet effect
   * Wraps the element content in a magnet inner container
   */
  createDOMStructure(element, config) {
    // Store original content and classes
    const originalContent = element.innerHTML;
    const originalClasses = Array.from(element.classList);
    
    // Create inner wrapper
    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'wb-magnetic-button__inner';
    innerWrapper.innerHTML = originalContent;
    
    // Clear element and add wrapper
    element.innerHTML = '';
    element.appendChild(innerWrapper);
    
    // Preserve original classes (excluding wb- classes)
    originalClasses.forEach(cls => {
      if (!cls.startsWith('wb-')) {
        element.classList.add(cls);
      }
    });
    
    // Ensure proper display for different element types
    const computedStyle = window.getComputedStyle(element);
    const originalDisplay = computedStyle.display;
    
    // Maintain original display properties
    if (element.tagName === 'A' || originalDisplay === 'inline-block' || originalDisplay === 'block') {
      element.style.display = originalDisplay;
    }
    
    // Set up inner wrapper styles
    innerWrapper.style.width = '100%';
    innerWrapper.style.height = '100%';
    innerWrapper.style.display = 'flex';
    innerWrapper.style.alignItems = 'center';
    innerWrapper.style.justifyContent = 'center';
    innerWrapper.style.pointerEvents = 'none'; // Prevent interference with mouse events
    
    return {
      innerWrapper,
      originalContent,
      originalClasses
    };
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element) {
      console.warn('WebflowBits Magnet: Element is invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits Magnet: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      effect: null,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      if (!instance.domStructure) {
        throw new Error('Failed to create DOM structure');
      }
      
      // Initialize the magnet effect
      instance.effect = new MagnetEffect(element, config);
      
      // Mark as animating
      element.classList.add('wb-magnetic-button-animating');
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'magnetic-button',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits Magnetic Button: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Initialize all elements with wb-component="magnetic-button"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="magnetic-button"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { effect, domStructure } = instance;

    // Destroy effect
    if (effect && effect.destroy) {
      effect.destroy();
    }

    // Restore original content if available
    if (domStructure && domStructure.originalContent) {
      element.innerHTML = domStructure.originalContent;
    }

    // Remove component classes using utility
    this.removeComponentClasses(element);

    // Remove from instances
    this.instances.delete(element);

    // Dispatch destroy event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-magnetic-button-destroy',
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
   * Refresh animations (reinitialize all)
   */
  refresh() {
    this.destroyAll();
    this.initAll();
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    const conflictClasses = [
      'magnetic-button',
      'magnetic-button__inner'
    ];
    
    return checkCSSConflicts('MagneticButton', conflictClasses);
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

  /**
   * Update config for specific element
   */
  updateConfig(element, newConfig) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Update config
    instance.config = { ...instance.config, ...newConfig };
    
    // Reinitialize effect with new config
    if (instance.effect) {
      instance.effect.destroy();
      instance.effect = new MagnetEffect(element, instance.config);
    }
  }
}

// Create singleton instance
const magnetAnimator = new MagnetAnimator();

// Export for use in other modules
export default magnetAnimator;
export { MagnetAnimator };
