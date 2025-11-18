/**
 * Hover Zoom Component
 * Creates a zoom effect on hover with parallax movement that follows mouse direction
 * Works with img elements, divs with background images, and divs containing img elements
 * 
 * Usage:
 * <img wb-component="hover-zoom" wb-zoom-scale="1.5" src="image.jpg" />
 * <div wb-component="hover-zoom" wb-zoom-scale="2" style="background-image: url(...)"></div>
 * <div wb-component="hover-zoom">
 *   <img src="image.jpg" />
 * </div>
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Component-specific CSS
const componentCSS = `
.wb-hover-zoom {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

/* Ensure container maintains its size */
.wb-hover-zoom--preserve-size {
  box-sizing: border-box;
}

/* Direct img element - needs wrapper behavior */
img.wb-hover-zoom {
  display: block;
  max-width: 100%;
}

/* Nested img styling */
.wb-hover-zoom--has-img {
  overflow: hidden;
}

.wb-hover-zoom--has-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease-out;
  transform-origin: 50% 50%;
  will-change: transform;
}

/* Background image container */
.wb-hover-zoom--has-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease-out;
  transform-origin: 50% 50%;
  will-change: transform;
}
`;

class HoverZoomAnimator {
  constructor() {
    this.componentName = 'hover-zoom';
    this.instances = new Map();
    this.componentClasses = {
      parent: 'wb-hover-zoom',
      hasImg: 'wb-hover-zoom--has-img',
      hasBg: 'wb-hover-zoom--has-bg',
    };
    
    // Default configuration
    this.defaultConfig = {
      zoomScale: 1.5,
    };
    
    // Inject CSS once
    injectStyles(this.componentName, componentCSS);
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = {
      zoomScale: { attribute: 'wb-zoom-scale', type: 'number' },
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Calculate parallax intensity based on zoom scale
   * Ensures movement never exceeds what the zoomed image can cover
   * Formula: (scale - 1) / scale * 0.5
   * This ensures the movement is proportional to the zoom but constrained
   */
  calculateParallaxIntensity(zoomScale) {
    // When scale is 1, no parallax (no zoom)
    if (zoomScale <= 1) return 0;
    
    // Calculate max possible movement based on scale
    // If scale is 1.5, we can move up to (1.5 - 1) / 1.5 = 0.33 (33%)
    // We use 0.5 multiplier to make it smoother and prevent edge cases
    const maxMovement = ((zoomScale - 1) / zoomScale) * 0.5;
    
    // Clamp between 0 and 0.5 to prevent excessive movement
    return Math.min(maxMovement, 0.5);
  }

  /**
   * Detect the type of element and find the target to transform
   * Returns: { target, type: 'img' | 'bg' | 'nested-img' }
   */
  detectImageTarget(element) {
    // Case 1: Direct img element
    if (element.tagName === 'IMG') {
      return { target: element, type: 'img' };
    }
    
    // Case 2: Div with background image
    const computedStyle = window.getComputedStyle(element);
    const bgImage = computedStyle.backgroundImage;
    if (bgImage && bgImage !== 'none') {
      return { target: element, type: 'bg' };
    }
    
    // Case 3: Div containing img element
    const imgElement = element.querySelector('img');
    if (imgElement) {
      return { target: imgElement, type: 'nested-img' };
    }
    
    // Fallback: treat as background image container
    return { target: element, type: 'bg' };
  }

  /**
   * Handle mouse enter
   */
  handleMouseEnter(instance, event) {
    const { target, config } = instance;
    const rect = instance.element.getBoundingClientRect();
    
    // Store initial mouse position
    instance.mouseX = event.clientX - rect.left;
    instance.mouseY = event.clientY - rect.top;
    
    // Apply zoom
    this.applyTransform(target, config.zoomScale, 0, 0);
  }

  /**
   * Handle mouse move
   */
  handleMouseMove(instance, event) {
    if (!instance.mouseX && instance.mouseX !== 0) return;
    
    const { target, config, element } = instance;
    const rect = element.getBoundingClientRect();
    
    // Calculate mouse position relative to element
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Calculate center of element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center (normalized to -1 to 1)
    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;
    
    // Calculate parallax intensity based on zoom scale
    const parallaxIntensity = this.calculateParallaxIntensity(config.zoomScale);
    
    // Apply parallax movement (opposite direction)
    // Movement is calculated as percentage to work with transform
    const moveX = -deltaX * parallaxIntensity * 100;
    const moveY = -deltaY * parallaxIntensity * 100;
    
    // Apply transform with zoom and parallax
    this.applyTransform(target, config.zoomScale, moveX, moveY);
  }

  /**
   * Handle mouse leave
   */
  handleMouseLeave(instance) {
    const { target } = instance;
    
    // Reset transform
    this.applyTransform(target, 1, 0, 0);
    
    // Clear mouse position
    instance.mouseX = null;
    instance.mouseY = null;
  }

  /**
   * Apply transform to target element
   */
  applyTransform(target, scale, translateX, translateY) {
    target.style.transform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;
  }

  /**
   * Store original dimensions and ensure they're preserved
   */
  preserveElementDimensions(element) {
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const isImg = element.tagName === 'IMG';
    
    // Get original dimensions
    const originalWidth = computedStyle.width !== 'auto' 
      ? computedStyle.width 
      : `${rect.width}px`;
    const originalHeight = computedStyle.height !== 'auto' 
      ? computedStyle.height 
      : `${rect.height}px`;
    
    // Store original styles
    const originalStyles = {
      width: element.style.width || '',
      height: element.style.height || '',
      maxWidth: element.style.maxWidth || '',
      maxHeight: element.style.maxHeight || '',
      minWidth: element.style.minWidth || '',
      minHeight: element.style.minHeight || '',
      overflow: element.style.overflow || '',
      display: element.style.display || '',
    };
    
    // Handle parent container for direct img elements
    let parentStyles = null;
    if (isImg && element.parentElement) {
      const parent = element.parentElement;
      const parentComputed = window.getComputedStyle(parent);
      parentStyles = {
        overflow: parent.style.overflow || '',
      };
      
      // Ensure parent has overflow hidden if it's visible
      if (parentComputed.overflow === 'visible' || parentComputed.overflow === '') {
        parent.style.overflow = 'hidden';
      }
    }
    
    // For img elements, ensure they maintain their size
    if (isImg) {
      // Set explicit width to prevent growing, but preserve aspect ratio for height
      if (!element.style.width && computedStyle.width === 'auto') {
        element.style.width = originalWidth;
      }
      // Don't set height - let it maintain aspect ratio
      // Ensure it's block-level for proper sizing
      if (computedStyle.display === 'inline') {
        element.style.display = 'block';
      }
    } else {
      // For containers (divs), ensure explicit dimensions
      if (!element.style.width && computedStyle.width === 'auto') {
        element.style.width = originalWidth;
      }
      if (!element.style.height && computedStyle.height === 'auto') {
        element.style.height = originalHeight;
      }
      
      // Ensure overflow is hidden for containers
      const originalOverflow = computedStyle.overflow;
      if (originalOverflow === 'visible' || originalOverflow === '') {
        element.style.overflow = 'hidden';
      }
    }
    
    return {
      originalStyles,
      originalWidth,
      originalHeight,
      isImg,
      parentStyles,
      parentElement: isImg ? element.parentElement : null,
    };
  }

  /**
   * Initialize a single element
   */
  initElement(element) {
    // Skip if already initialized
    if (this.instances.has(element)) {
      return;
    }

    // Parse configuration
    const config = this.parseConfig(element);

    // Detect image target
    const { target, type } = this.detectImageTarget(element);
    
    if (!target) {
      console.warn('HoverZoom: No image target found for element', element);
      return;
    }

    // Preserve original dimensions
    const dimensionData = this.preserveElementDimensions(element);

    // Apply component classes
    const classesToApply = [this.componentClasses.parent, 'wb-hover-zoom--preserve-size'];
    
    if (type === 'nested-img') {
      classesToApply.push(this.componentClasses.hasImg);
    } else if (type === 'bg') {
      classesToApply.push(this.componentClasses.hasBg);
    }
    
    ComponentClassManager.applyClasses(
      element,
      classesToApply,
      this.instances,
      this.componentName
    );

    // Create instance first
    const instance = {
      element,
      target,
      config,
      type,
      mouseX: null,
      mouseY: null,
      handlers: {},
      dimensionData,
    };

    // Create event handlers (after instance is created)
    const handleMouseEnter = (e) => this.handleMouseEnter(instance, e);
    const handleMouseMove = (e) => this.handleMouseMove(instance, e);
    const handleMouseLeave = () => this.handleMouseLeave(instance);

    // Store handlers in instance
    instance.handlers = {
      mouseenter: handleMouseEnter,
      mousemove: handleMouseMove,
      mouseleave: handleMouseLeave,
    };

    // Set transform-origin explicitly for better browser compatibility
    target.style.transformOrigin = '50% 50%';

    // Attach event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    this.instances.set(element, instance);

    // Dispatch initialization event
    AnimationStateManager.dispatchLifecycleEvent(
      element,
      'init',
      this.componentName,
      { instance }
    );
  }

  /**
   * Initialize all elements with wb-component="hover-zoom"
   */
  initAll() {
    const elements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
    elements.forEach((element) => {
      this.initElement(element);
    });
  }

  /**
   * Destroy a specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Remove event listeners
    const { handlers } = instance;
    element.removeEventListener('mouseenter', handlers.mouseenter);
    element.removeEventListener('mousemove', handlers.mousemove);
    element.removeEventListener('mouseleave', handlers.mouseleave);

    // Reset transform
    if (instance.target) {
      this.applyTransform(instance.target, 1, 0, 0);
    }

    // Restore original dimensions if they were modified
    if (instance.dimensionData) {
      const { originalStyles, parentStyles, parentElement } = instance.dimensionData;
      element.style.width = originalStyles.width;
      element.style.height = originalStyles.height;
      element.style.maxWidth = originalStyles.maxWidth;
      element.style.maxHeight = originalStyles.maxHeight;
      element.style.minWidth = originalStyles.minWidth;
      element.style.minHeight = originalStyles.minHeight;
      element.style.overflow = originalStyles.overflow;
      element.style.display = originalStyles.display;
      
      // Restore parent styles if modified
      if (parentElement && parentStyles) {
        parentElement.style.overflow = parentStyles.overflow;
      }
    }

    // Cleanup: remove classes
    ComponentClassManager.removeClasses(
      element,
      this.componentClasses,
      this.instances,
      this.componentName
    );

    // Dispatch destroy event
    AnimationStateManager.dispatchLifecycleEvent(
      element,
      'destroy',
      this.componentName,
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
   * Refresh all instances - re-initialize elements that may have changed
   */
  refresh() {
    const allElements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
    allElements.forEach(element => {
      if (this.instances.has(element)) {
        this.destroyElement(element);
      }
      this.initElement(element);
    });
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element);
  }
}

// Create and export singleton instance
const hoverZoomAnimator = new HoverZoomAnimator();

// Auto-initialize (optional - WebflowBits.js handles this)
if (typeof document !== 'undefined') {
  const autoInit = () => {
    hoverZoomAnimator.initAll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}

export default hoverZoomAnimator;

