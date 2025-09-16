import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - TextCursor Component Styles */
.wb-text-cursor {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.wb-text-cursor__inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}

.wb-text-cursor__item {
  position: absolute;
  user-select: none;
  white-space: nowrap;
  font-size: 1.875rem;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Performance optimization during animation */
.wb-text-cursor-animating .wb-text-cursor__item {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Clean up after animation */
.wb-text-cursor-completed .wb-text-cursor__item {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-text-cursor[aria-label] .wb-text-cursor__item {
  speak: none;
}
`;

/**
 * TextCursor Animator Class
 */
class TextCursorAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'TextCursor';
    this.componentClasses = webflowBitsClasses.forComponent('text-cursor');
    this.defaultConfig = {
      text: '⚛️',
      delay: 0.01,
      spacing: 100,
      followMouseDirection: true,
      randomFloat: true,
      exitDuration: 0.5,
      removalInterval: 30,
      maxPoints: 5,
      fontSize: '1.875rem',
      color: 'currentColor'
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-text-cursor-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: TextCursor styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject TextCursor styles', error);
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
        // TextCursor-specific attributes
        text: { attribute: 'wb-cursor-text', type: 'string' },
        delay: { attribute: 'wb-cursor-delay', type: 'number', parser: parseFloat },
        spacing: { attribute: 'wb-cursor-spacing', type: 'number', parser: parseInt },
        followMouseDirection: { attribute: 'wb-cursor-follow-direction', type: 'boolean' },
        randomFloat: { attribute: 'wb-cursor-random-float', type: 'boolean' },
        exitDuration: { attribute: 'wb-cursor-exit-duration', type: 'number', parser: parseFloat },
        removalInterval: { attribute: 'wb-cursor-removal-interval', type: 'number', parser: parseInt },
        maxPoints: { attribute: 'wb-cursor-max-points', type: 'number', parser: parseInt },
        fontSize: { attribute: 'wb-cursor-font-size', type: 'string' },
        color: { attribute: 'wb-cursor-color', type: 'string' }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent || 'wb-text-cursor'
    ];
    
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
      this.componentClasses.parent || 'wb-text-cursor',
      this.componentClasses.animating || 'wb-text-cursor-animating',
      this.componentClasses.completed || 'wb-text-cursor-completed'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for text cursor effect
   */
  createDOMStructure(element, config) {
    const originalContent = element.innerHTML;
    
    // Clear element and create inner container
    element.innerHTML = `<div class="wb-text-cursor__inner"></div>`;
    
    const innerElement = element.querySelector('.wb-text-cursor__inner');
    
    return {
      originalContent,
      innerElement
    };
  }

  /**
   * Calculate angle between two points
   */
  calculateAngle(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    
    // Normalize angle to avoid flipping
    if (rawAngle > 90) rawAngle -= 180;
    else if (rawAngle < -90) rawAngle += 180;
    
    return rawAngle;
  }

  /**
   * Calculate distance between two points
   */
  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Create a text cursor item
   */
  createTextItem(instance, x, y, angle) {
    const { config, domStructure, idCounter } = instance;
    
    const item = document.createElement('div');
    item.className = 'wb-text-cursor__item';
    item.textContent = config.text;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.fontSize = config.fontSize;
    item.style.color = config.color;
    
    // Set initial transform
    const initialRotation = config.followMouseDirection ? angle : 0;
    gsap.set(item, {
      opacity: 0,
      scale: 1,
      rotation: initialRotation,
      transformOrigin: 'center center'
    });
    
    // Add random properties if enabled
    const randomProps = config.randomFloat ? {
      randomX: Math.random() * 10 - 5,
      randomY: Math.random() * 10 - 5,
      randomRotate: Math.random() * 10 - 5
    } : {};
    
    const itemData = {
      id: idCounter.current++,
      element: item,
      x,
      y,
      angle: initialRotation,
      createdAt: Date.now(),
      tween: null,
      ...randomProps
    };
    
    // Animate in
    const timeline = gsap.timeline();
    timeline.to(item, {
      opacity: 1,
      duration: config.delay,
      ease: 'power2.out'
    });
    
    // Add floating animation if enabled
    if (config.randomFloat) {
      timeline.to(item, {
        x: randomProps.randomX || 0,
        y: randomProps.randomY || 0,
        rotation: initialRotation + (randomProps.randomRotate || 0),
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, 0);
    }
    
    itemData.tween = timeline;
    
    domStructure.innerElement.appendChild(item);
    return itemData;
  }

  /**
   * Remove text item with exit animation
   */
  removeTextItem(instance, itemData) {
    if (!itemData || !itemData.element) return;
    
    const { config } = instance;
    
    // Kill existing animations
    if (itemData.tween) {
      itemData.tween.kill();
    }
    
    // Exit animation
    gsap.to(itemData.element, {
      opacity: 0,
      scale: 0,
      duration: config.exitDuration,
      ease: 'power2.in',
      onComplete: () => {
        if (itemData.element && itemData.element.parentNode) {
          itemData.element.parentNode.removeChild(itemData.element);
        }
      }
    });
  }

  /**
   * Setup mouse tracking
   */
  setupMouseTracking(instance) {
    const { element, config, domStructure } = instance;
    
    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      instance.lastMoveTime = Date.now();
      
      // Check if we need to add new trail items
      if (instance.trail.length === 0) {
        // First item
        const itemData = this.createTextItem(instance, mouseX, mouseY, 0);
        instance.trail.push(itemData);
      } else {
        // Check distance from last item
        const lastItem = instance.trail[instance.trail.length - 1];
        const distance = this.calculateDistance(lastItem.x, lastItem.y, mouseX, mouseY);
        
        if (distance >= config.spacing) {
          // Calculate angle if following mouse direction
          const angle = config.followMouseDirection ? 
            this.calculateAngle(lastItem.x, lastItem.y, mouseX, mouseY) : 0;
          
          // Calculate steps needed
          const steps = Math.floor(distance / config.spacing);
          
          for (let i = 1; i <= steps; i++) {
            const t = (config.spacing * i) / distance;
            const newX = lastItem.x + (mouseX - lastItem.x) * t;
            const newY = lastItem.y + (mouseY - lastItem.y) * t;
            
            const itemData = this.createTextItem(instance, newX, newY, angle);
            instance.trail.push(itemData);
          }
        }
      }
      
      // Limit trail length
      if (instance.trail.length > config.maxPoints) {
        const itemsToRemove = instance.trail.splice(0, instance.trail.length - config.maxPoints);
        itemsToRemove.forEach(item => this.removeTextItem(instance, item));
      }
    };
    
    // Store the handler for cleanup
    instance.mouseHandler = handleMouseMove;
    
    // Add event listener
    element.addEventListener('mousemove', handleMouseMove);
  }

  /**
   * Setup cleanup interval
   */
  setupCleanupInterval(instance) {
    const { config } = instance;
    
    instance.cleanupInterval = setInterval(() => {
      if (Date.now() - instance.lastMoveTime > 100) {
        if (instance.trail.length > 0) {
          const itemToRemove = instance.trail.shift();
          this.removeTextItem(instance, itemToRemove);
        }
      }
    }, config.removalInterval);
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();

    if (!element) {
      console.warn('WebflowBits TextCursor: Element is invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits TextCursor: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      trail: [],
      lastMoveTime: Date.now(),
      idCounter: { current: 0 },
      mouseHandler: null,
      cleanupInterval: null,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      // Setup mouse tracking
      this.setupMouseTracking(instance);
      
      // Setup cleanup interval
      this.setupCleanupInterval(instance);
      
      // Mark as animating
      element.classList.add('wb-text-cursor-animating');
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'text-cursor',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits TextCursor: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Initialize all elements with wb-component="text-cursor"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="text-cursor"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { mouseHandler, cleanupInterval, trail, domStructure } = instance;

    // Remove mouse event listener
    if (mouseHandler) {
      element.removeEventListener('mousemove', mouseHandler);
    }

    // Clear cleanup interval
    if (cleanupInterval) {
      clearInterval(cleanupInterval);
    }

    // Remove all trail items
    trail.forEach(item => {
      if (item.tween) {
        item.tween.kill();
      }
      if (item.element && item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });

    // Restore original content
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
      'wb-text-cursor-destroy',
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
   * Refresh animations (no-op for this component)
   */
  refresh() {
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    const conflictClasses = [
      'text-cursor',
      'text-cursor__inner',
      'text-cursor__item'
    ];
    
    return checkCSSConflicts('TextCursor', conflictClasses);
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
   * Update configuration for an element
   */
  updateConfig(element, newConfig) {
    const instance = this.getInstance(element);
    if (!instance) return;

    instance.config = { ...instance.config, ...newConfig };
    
    // Dispatch update event
    AnimationStateManager.dispatchEvent(
      element,
      'wb-text-cursor-update',
      { element, config: instance.config }
    );
  }
}

// Create singleton instance
const textCursorAnimator = new TextCursorAnimator();

// Export for use in other modules
export default textCursorAnimator;
export { TextCursorAnimator };
