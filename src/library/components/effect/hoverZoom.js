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
    
    // Flag to prevent concurrent refresh calls
    this.isRefreshing = false;
    this.refreshTimeout = null;
    
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
   * Wrap an img element in a div with overflow hidden
   * Returns the wrapper div and the original img element
   */
  wrapImgElement(imgElement) {
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    
    // Preserve img's display style on wrapper (default to inline-block for hover-zoom)
    const imgComputedStyle = window.getComputedStyle(imgElement);
    const imgDisplay = imgComputedStyle.display;
    // If img is inline, use inline-block for wrapper to allow proper sizing
    // Otherwise preserve the display type
    if (imgDisplay === 'inline') {
      wrapper.style.display = 'inline-block';
    } else {
      wrapper.style.display = imgDisplay;
    }
    
    // Store original classes before modifying
    const originalImgClasses = imgElement.getAttribute('class') || '';
    
    // Copy classes from img to wrapper to preserve sizing (width, height, etc.)
    // This ensures the wrapper respects classes like w-full, h-64, etc.
    const imgClasses = imgElement.getAttribute('class');
    if (imgClasses) {
      const classList = imgClasses.split(' ').filter(c => c.trim());
      
      // Separate object-fit classes (keep on img) from other classes (move to wrapper)
      const objectFitClasses = classList.filter(c => 
        c.startsWith('object-') || c === 'object-cover' || c === 'object-contain' || 
        c === 'object-fill' || c === 'object-none' || c === 'object-scale-down'
      );
      
      // Copy all classes to wrapper (for sizing)
      wrapper.setAttribute('class', imgClasses);
      
      // Keep object-fit classes on img for proper image display
      if (objectFitClasses.length > 0) {
        imgElement.setAttribute('class', objectFitClasses.join(' '));
      } else {
        imgElement.removeAttribute('class');
      }
    }
    
    // Copy the wb-component attribute to the wrapper
    const componentAttr = imgElement.getAttribute('wb-component');
    if (componentAttr) {
      wrapper.setAttribute('wb-component', componentAttr);
      imgElement.removeAttribute('wb-component');
    }
    
    // Copy other wb-* attributes to the wrapper
    Array.from(imgElement.attributes).forEach(attr => {
      if (attr.name.startsWith('wb-')) {
        wrapper.setAttribute(attr.name, attr.value);
        imgElement.removeAttribute(attr.name);
      }
    });
    
    // Insert wrapper before img in the DOM
    imgElement.parentNode.insertBefore(wrapper, imgElement);
    
    // Move img into wrapper
    wrapper.appendChild(imgElement);
    
    // Make img fill the wrapper (width and height 100%)
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';
    
    return { wrapper, originalImg: imgElement, originalImgClasses };
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

    // If element is an img, check if it's already inside a tracked wrapper
    if (element.tagName === 'IMG' && element.parentElement) {
      const parent = element.parentElement;
      // If parent is already tracked, skip (img is already wrapped and initialized)
      if (this.instances.has(parent)) {
        return;
      }
    }

    // If element is an img, wrap it in a div with overflow hidden
    let wrapper = null;
    let originalImg = null;
    let originalImgClasses = null;
    let actualElement = element;
    
    if (element.tagName === 'IMG') {
      const wrapResult = this.wrapImgElement(element);
      wrapper = wrapResult.wrapper;
      originalImg = wrapResult.originalImg;
      originalImgClasses = wrapResult.originalImgClasses;
      actualElement = wrapper; // Use wrapper as the element to track
      
      // Skip if wrapper is already initialized (shouldn't happen, but safety check)
      if (this.instances.has(actualElement)) {
        return;
      }
    }

    // Parse configuration (use original element to get attributes before wrapping)
    const config = this.parseConfig(element.tagName === 'IMG' ? originalImg : element);

    // Detect image target (use actualElement which is now the wrapper if img was wrapped)
    const { target, type } = this.detectImageTarget(actualElement);
    
    if (!target) {
      console.warn('HoverZoom: No image target found for element', actualElement);
      return;
    }

    // Preserve original dimensions (use actualElement)
    const dimensionData = this.preserveElementDimensions(actualElement);

    // Determine final type - if we wrapped an img, it's now nested-img
    const finalType = wrapper ? 'nested-img' : type;

    // Apply component classes
    const classesToApply = [this.componentClasses.parent, 'wb-hover-zoom--preserve-size'];
    
    if (finalType === 'nested-img') {
      classesToApply.push(this.componentClasses.hasImg);
    } else if (finalType === 'bg') {
      classesToApply.push(this.componentClasses.hasBg);
    }
    
    ComponentClassManager.applyClasses(
      actualElement,
      classesToApply,
      this.instances,
      this.componentName
    );

    // Create instance first
    const instance = {
      element: actualElement, // Track the wrapper if img was wrapped, otherwise the original element
      target,
      config,
      type: finalType,
      mouseX: null,
      mouseY: null,
      handlers: {},
      dimensionData,
      wrapper, // Store wrapper if img was wrapped
      originalImg, // Store original img if it was wrapped
      originalImgClasses, // Store original img classes for restoration
      originalElement: element, // Store the original element that had the attribute
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

    // Attach event listeners to actualElement (wrapper if img was wrapped)
    actualElement.addEventListener('mouseenter', handleMouseEnter);
    actualElement.addEventListener('mousemove', handleMouseMove);
    actualElement.addEventListener('mouseleave', handleMouseLeave);

    this.instances.set(actualElement, instance);

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
    instance.element.removeEventListener('mouseenter', handlers.mouseenter);
    instance.element.removeEventListener('mousemove', handlers.mousemove);
    instance.element.removeEventListener('mouseleave', handlers.mouseleave);

    // Reset transform
    if (instance.target) {
      this.applyTransform(instance.target, 1, 0, 0);
    }

    // Restore original dimensions if they were modified
    if (instance.dimensionData) {
      const { originalStyles } = instance.dimensionData;
      instance.element.style.width = originalStyles.width;
      instance.element.style.height = originalStyles.height;
      instance.element.style.maxWidth = originalStyles.maxWidth;
      instance.element.style.maxHeight = originalStyles.maxHeight;
      instance.element.style.minWidth = originalStyles.minWidth;
      instance.element.style.minHeight = originalStyles.minHeight;
      instance.element.style.overflow = originalStyles.overflow;
      instance.element.style.display = originalStyles.display;
    }

    // Cleanup: remove classes
    const fallbackClasses = [
      this.componentClasses.parent,
      this.componentClasses.hasImg,
      this.componentClasses.hasBg,
      'wb-hover-zoom--preserve-size',
    ];
    
    ComponentClassManager.removeClasses(
      instance.element,
      fallbackClasses,
      this.instances,
      this.componentName
    );

    // If img was wrapped, unwrap it
    if (instance.wrapper && instance.originalImg) {
      const wrapper = instance.wrapper;
      const originalImg = instance.originalImg;
      const parent = wrapper.parentNode;
      
      // Restore original classes to img (stored before wrapping)
      if (instance.originalImgClasses !== null && instance.originalImgClasses !== undefined) {
        if (instance.originalImgClasses) {
          originalImg.setAttribute('class', instance.originalImgClasses);
        } else {
          originalImg.removeAttribute('class');
        }
      }
      
      // Restore img styles (remove the 100% width/height we added)
      originalImg.style.width = '';
      originalImg.style.height = '';
      
      // Move wb-component attribute back to img
      const componentAttr = wrapper.getAttribute('wb-component');
      if (componentAttr) {
        originalImg.setAttribute('wb-component', componentAttr);
        wrapper.removeAttribute('wb-component');
      }
      
      // Move other wb-* attributes back to img
      Array.from(wrapper.attributes).forEach(attr => {
        if (attr.name.startsWith('wb-')) {
          originalImg.setAttribute(attr.name, attr.value);
          wrapper.removeAttribute(attr.name);
        }
      });
      
      // Move img out of wrapper
      parent.insertBefore(originalImg, wrapper);
      
      // Remove wrapper
      wrapper.remove();
    }

    // Dispatch destroy event (use original element if available, otherwise use instance.element)
    const eventElement = instance.originalElement || instance.element;
    AnimationStateManager.dispatchLifecycleEvent(
      eventElement,
      'destroy',
      this.componentName,
      { instance }
    );

    // Remove from instances
    this.instances.delete(instance.element);
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
   * Debounced to prevent rapid successive calls
   */
  refresh() {
    // Clear any pending refresh
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    
    // Debounce refresh calls
    this.refreshTimeout = setTimeout(() => {
      this._doRefresh();
    }, 50);
  }
  
  /**
   * Internal refresh method that actually performs the refresh
   */
  _doRefresh() {
    // Prevent concurrent refresh calls
    if (this.isRefreshing) {
      return;
    }
    
    this.isRefreshing = true;
    
    try {
      const allElements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
      const elementsToInit = new Set();
      const trackedElements = new Set(this.instances.keys());
      
      // Find elements that need initialization (not already tracked)
      allElements.forEach(element => {
        // Skip if this element is already tracked
        if (this.instances.has(element)) {
          return;
        }
        
        // Skip if this is an img that's already inside a tracked wrapper
        if (element.tagName === 'IMG' && element.parentElement) {
          if (this.instances.has(element.parentElement)) {
            return;
          }
        }
        
        // Add to initialization set
        elementsToInit.add(element);
      });
      
      // Find tracked elements that no longer have the attribute (need cleanup)
      const elementsToDestroy = [];
      trackedElements.forEach(trackedElement => {
        // Check if the tracked element or its original element still has the attribute
        const instance = this.instances.get(trackedElement);
        const originalElement = instance?.originalElement || trackedElement;
        
        // If neither the tracked element nor original has the attribute, destroy it
        const trackedHasAttr = trackedElement.getAttribute('wb-component') === this.componentName;
        const originalHasAttr = originalElement.getAttribute('wb-component') === this.componentName;
        
        if (!trackedHasAttr && !originalHasAttr) {
          elementsToDestroy.push(trackedElement);
        }
      });
      
      // Destroy elements that no longer need the component
      elementsToDestroy.forEach(element => {
        this.destroyElement(element);
      });
      
      // Initialize new elements
      elementsToInit.forEach(element => {
        if (element && element.isConnected) {
          this.initElement(element);
        }
      });
    } finally {
      this.isRefreshing = false;
      this.refreshTimeout = null;
    }
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

