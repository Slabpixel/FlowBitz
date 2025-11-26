import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseElementConfig, mergeAttributeMaps } from "../../utils/core/attributeParser.js";
import { AnimationStateManager, PerformanceOptimizer } from "../../utils/animation/animationStateManager.js";

const COMPONENT_CSS_ID = 'wb-3d-card-hover-styles';
const componentCSS = `
  /* FlowBitz - 3D Card Hover Effect Styles */
  .wb-hover3d__inner {
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 300ms linear;
    backface-visibility: hidden;
    transform-origin: center center;
  }
`;

function ensureStylesInjected() {
  injectStyles(COMPONENT_CSS_ID, componentCSS);
}

class Hover3DCard {
  constructor(root, config, instancesMap) {
    this.root = root;
    this.config = config;
    this.instancesMap = instancesMap;
    this.wrapper = null;
    this.boundMouseMove = null;
    this.boundMouseEnter = null;
    this.boundMouseLeave = null;
    this.componentName = '3d-card-hover';
    this.movedRootClasses = [];
    this.movedRootId = null;
    this.originalTransform = null; // Store original transform to preserve it
    this.init();
  }

  init() {
    const tag = (this.root.tagName || '').toUpperCase();
    if (tag !== 'DIV' && tag !== 'BUTTON') {
      console.warn('3d-card-hover: Root element must be a <div> or <button>', this.root);
      return;
    }

    if (this.root.dataset.hover3dInitialized === 'true') return;

    ensureStylesInjected();

    // Save all original root classes (BUT DON'T REMOVE - keep them on root)
    // Classes need to stay on root for CSS selectors (e.g., .product-grid > .product-card)
    // and also on wrapper for visual styling
    this.movedRootClasses = Array.from(this.root.classList);
    // DON'T remove classes from root - keep them for CSS selectors and layout

    // 2) Create inner wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('wb-hover3d__inner');

    // Add all classes to wrapper as well (root already has them)
    // Wrapper needs classes for visual styling because it's the element being transformed
    if (this.movedRootClasses.length) {
      wrapper.classList.add(...this.movedRootClasses);
    }

    this.movedRootId = this.root.id || null;
    if (this.movedRootId) {
      wrapper.id = this.movedRootId;
      this.root.removeAttribute('id');
    }

    // Separate layout properties from visual/transform properties
    // Layout properties must stay on root to preserve grid, flexbox, positioning, etc.
    const originalStyle = this.root.getAttribute('style') || '';
    
    // Layout properties that must stay on root (for grid, flexbox, positioning, etc.)
    const layoutProperties = [
      'display', 'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
      'grid-area', 'grid-column', 'grid-row', 'grid-column-start', 'grid-column-end',
      'grid-row-start', 'grid-row-end',
      'position', 'top', 'right', 'bottom', 'left', 'z-index',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'flex', 'flex-basis', 'flex-grow', 'flex-shrink', 'flex-direction',
      'align-self', 'justify-self', 'order',
      'float', 'clear', 'box-sizing', 'overflow', 'overflow-x', 'overflow-y'
    ];
    
    // Visual/transform properties that can be moved to wrapper
    const visualProperties = [
      'transform', 'translate', 'rotate', 'scale', 'opacity', 'visibility',
      'background', 'background-color', 'background-image', 'background-size',
      'border', 'border-radius', 'box-shadow', 'filter', 'backdrop-filter'
    ];
    
    // Parse and separate styles
    const layoutStyles = [];
    const visualStyles = [];
    const allStyles = originalStyle.split(';').filter(s => s.trim());
    
    allStyles.forEach(style => {
      const colonIndex = style.indexOf(':');
      if (colonIndex === -1) return;
      
      const property = style.substring(0, colonIndex).trim();
      const value = style.substring(colonIndex + 1).trim();
      
      if (!property || !value) return;
      
      const normalizedProp = property.toLowerCase();
      
      // Check if it's a layout property
      if (layoutProperties.some(lp => normalizedProp === lp || normalizedProp.startsWith(lp + '-'))) {
        layoutStyles.push(`${property}: ${value}`);
      }
      // Check if it's a visual property (but not transform - we handle that separately)
      else if (visualProperties.some(vp => normalizedProp === vp || normalizedProp.startsWith(vp + '-'))) {
        if (normalizedProp === 'transform') {
          // Extract transform for merging later
          this.originalTransform = value;
        } else {
          visualStyles.push(`${property}: ${value}`);
        }
      }
      // Unknown properties - keep on root to be safe (layout-first approach)
      else if (normalizedProp !== 'perspective') {
        layoutStyles.push(`${property}: ${value}`);
      }
    });
    
    // Keep layout styles on root (add perspective)
    if (layoutStyles.length > 0) {
      const rootStyle = [...layoutStyles, `perspective: ${this.config.perspective}px`].join('; ');
      this.root.setAttribute('style', rootStyle);
    } else {
      // Only perspective if no other layout styles
      this.root.style.perspective = `${this.config.perspective}px`;
    }
    
    // Move visual styles to wrapper
    if (visualStyles.length > 0) {
      wrapper.setAttribute('style', visualStyles.join('; '));
    }

    // Default transition if not already set
    if (!wrapper.style.transition) {
      wrapper.style.transition = this.config.transition;
    }

    // Performance optimization
    PerformanceOptimizer.optimizeForAnimation(wrapper, {
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      perspective: ''
    });

    // 3) Move children from root → wrapper
    while (this.root.firstChild) {
      wrapper.appendChild(this.root.firstChild);
    }

    // 4) Insert wrapper into root
    this.root.appendChild(wrapper);
    this.wrapper = wrapper;

    // 5) Attach events to wrapper
    const throttledMove = PerformanceOptimizer.throttle((e) => this.handleMouseMove(e), 16);
    this.boundMouseMove = (e) => throttledMove.call(this, e);
    this.boundMouseEnter = () => this.handleMouseEnter();
    this.boundMouseLeave = () => this.handleMouseLeave();

    this.wrapper.addEventListener('mousemove', this.boundMouseMove);
    this.wrapper.addEventListener('mouseenter', this.boundMouseEnter);
    this.wrapper.addEventListener('mouseleave', this.boundMouseLeave);

    this.root.dataset.hover3dInitialized = 'true';
  }

  /**
   * Merge original transform with 3D hover transform
   * Preserves original transform (e.g., translate(0px, 0px)) and adds 3D rotation
   */
  mergeTransform(rotateX, rotateY) {
    const hover3D = `translateZ(0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    
    if (this.originalTransform) {
      // If original transform exists, combine them
      // Original transform first, then 3D transforms
      return `${this.originalTransform} ${hover3D}`;
    }
    
    return hover3D;
  }

  handleMouseEnter() {
    // Set state on wrapper (root is just a container)
    AnimationStateManager.setAnimatingState(this.wrapper, 'wb-hover3d');
    AnimationStateManager.dispatchLifecycleEvent(this.root, 'start', this.componentName);
  }

  handleMouseMove(e) {
    if (!this.wrapper) return;
    const rect = this.wrapper.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2);
    const x = dx / this.config.rotateDivisor;
    const y = -dy / this.config.rotateDivisor;
    
    // Merge original transform with 3D hover transform
    this.wrapper.style.transform = this.mergeTransform(x, y);
  }

  handleMouseLeave() {
    if (!this.wrapper) return;
    
    // Merge original transform with reset 3D rotation
    this.wrapper.style.transform = this.mergeTransform(0, 0);
    
    AnimationStateManager.setCompletedState(this.wrapper, 'wb-hover3d');
    AnimationStateManager.dispatchLifecycleEvent(this.root, 'complete', this.componentName);
  }

  destroy() {
    // Remove event listeners from wrapper
    if (this.boundMouseMove) this.wrapper?.removeEventListener('mousemove', this.boundMouseMove);
    if (this.boundMouseEnter) this.wrapper?.removeEventListener('mouseenter', this.boundMouseEnter);
    if (this.boundMouseLeave) this.wrapper?.removeEventListener('mouseleave', this.boundMouseLeave);

    // Move children back to root
    if (this.wrapper) {
      PerformanceOptimizer.cleanupAfterAnimation(this.wrapper, { restoreOriginal: true });

      while (this.wrapper.firstChild) {
        this.root.appendChild(this.wrapper.firstChild);
      }

      // Classes are already on root (never removed), so no need to restore
      // Just remove classes from wrapper
      if (this.movedRootClasses.length) {
        this.movedRootClasses.forEach(cls => {
          this.wrapper.classList.remove(cls);
        });
      }

      if (this.movedRootId) {
        this.root.id = this.movedRootId;
      }

      this.root.removeChild(this.wrapper);
      this.wrapper = null;
    }

    delete this.root.dataset.hover3dInitialized;
  }
};

class CardHover3DAnimator {
  constructor() {
    this.componentName = '3d-card-hover';
    this.instances = new Map();
    this.defaultConfig = {
      perspective: 800,
      rotateDivisor: 15,
      transition: 'transform 300ms linear'
    };
    this.attributeMap = mergeAttributeMaps({
      perspective: { attribute: 'wb-perspective', type: 'number', parser: parseInt, min: 100, max: 5000 },
      rotateDivisor: { attribute: 'wb-rotate-divisor', type: 'number', parser: parseFloat, min: 1, max: 100 },
      transition: { attribute: 'wb-transition', type: 'string' }
    });
  };

  parseConfig(element) {
    return parseElementConfig(element, this.defaultConfig, this.attributeMap);
  };

  initElement(element) {
    if (this.instances.has(element)) return this.instances.get(element);
    const config = this.parseConfig(element);
    const instance = new Hover3DCard(element, config, this.instances);
    this.instances.set(element, instance);
    return instance;
  };

  initAll() {
    const elements = document.querySelectorAll('[wb-component="3d-card-hover"]');
    elements.forEach((el) => this.initElement(el));
  };

  refresh() { return this; };

  destroyAll() {
    this.instances.forEach((instance) => instance.destroy && instance.destroy());
    this.instances.clear();
  };
};

const cardHover3DAnimator = new CardHover3DAnimator();

document.addEventListener('DOMContentLoaded', () => {
  cardHover3DAnimator.initAll();
});

export default cardHover3DAnimator;
export { Hover3DCard, CardHover3DAnimator };