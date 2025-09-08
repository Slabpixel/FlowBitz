import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* Webflow Bits - MagnetLines Component Styles */
.wb-magnet-lines {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 80vmin;
  height: 80vmin;
  position: relative;
  overflow: hidden;
}

.wb-magnet-lines__line {
  display: block;
  transform-origin: center;
  will-change: transform;
  transform: rotate(var(--rotate, -10deg));
  background-color: #efefef;
  width: 1vmin;
  height: 6vmin;
  transition: transform 0.1s ease-out;
}

/* Performance optimization during animation */
.wb-magnet-lines-animating .wb-magnet-lines__line {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-magnet-lines-completed .wb-magnet-lines__line {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-magnet-lines[aria-label] .wb-magnet-lines__line {
  speak: none;
}
`;

class MagnetLinesAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'MagnetLines';
    this.componentClasses = webflowBitsClasses.forComponent('magnet-lines');
    this.defaultConfig = {
      rows: 9,
      columns: 9,
      containerSize: '80vmin',
      lineColor: '#efefef',
      lineWidth: '1vmin',
      lineHeight: '6vmin',
      baseAngle: -10
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-magnet-lines-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: MagnetLines styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject MagnetLines styles', error);
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
        // MagnetLines-specific attributes
        rows: { attribute: 'wb-rows', type: 'number', parser: parseInt },
        columns: { attribute: 'wb-columns', type: 'number', parser: parseInt },
        containerSize: { attribute: 'wb-container-size', type: 'string' },
        lineColor: { attribute: 'wb-line-color', type: 'string' },
        lineWidth: { attribute: 'wb-line-width', type: 'string' },
        lineHeight: { attribute: 'wb-line-height', type: 'string' },
        baseAngle: { attribute: 'wb-base-angle', type: 'number', parser: parseFloat }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent || 'wb-magnet-lines'
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
      this.componentClasses.parent || 'wb-magnet-lines',
      this.componentClasses.animating || 'wb-magnet-lines-animating',
      this.componentClasses.completed || 'wb-magnet-lines-completed'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for magnet lines effect
   */
  createDOMStructure(element, config) {
    const originalContent = element.innerHTML;
    
    // Clear element
    element.innerHTML = '';
    
    // Set container styles
    element.style.display = 'grid';
    element.style.gridTemplateColumns = `repeat(${config.columns}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    element.style.width = config.containerSize;
    element.style.height = config.containerSize;
    element.style.justifyItems = 'center';
    element.style.alignItems = 'center';
    
    // Create lines
    const total = config.rows * config.columns;
    const lines = [];
    
    for (let i = 0; i < total; i++) {
      const line = document.createElement('span');
      line.className = 'wb-magnet-lines__line';
      line.style.setProperty('--rotate', `${config.baseAngle}deg`);
      line.style.backgroundColor = config.lineColor;
      line.style.width = config.lineWidth;
      line.style.height = config.lineHeight;
      
      element.appendChild(line);
      lines.push(line);
    }

    return {
      originalContent,
      lines,
      total
    };
  }

  /**
   * Setup pointer move handler
   */
  setupPointerHandler(instance) {
    const { element, domStructure } = instance;
    
    // Initialize rotation tracking for each line
    const lineRotations = domStructure.lines.map(() => ({
      totalRotation: 0,
      lastAngle: null
    }));
    
    /**
     * Calculate the shortest angular difference between two angles
     */
    const getAngleDifference = (newAngle, oldAngle) => {
      let diff = newAngle - oldAngle;
      
      // Normalize to [-180, 180]
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      
      return diff;
    };
    
    const handlePointerMove = (event) => {
      domStructure.lines.forEach((line, index) => {
        const rect = line.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = event.clientX - centerX;
        const a = event.clientY - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const currentAngle = (Math.acos(b / c) * 180) / Math.PI * (event.clientY > centerY ? 1 : -1);

        const rotation = lineRotations[index];
        
        if (rotation.lastAngle !== null) {
          // Calculate the shortest path between angles
          const angleDiff = getAngleDifference(currentAngle, rotation.lastAngle);
          rotation.totalRotation += angleDiff;
        } else {
          // First time - set initial rotation
          rotation.totalRotation = currentAngle;
        }
        
        rotation.lastAngle = currentAngle;
        line.style.setProperty('--rotate', `${rotation.totalRotation}deg`);
      });
    };

    // Store the bound function and rotation data for cleanup
    instance.pointerHandler = handlePointerMove;
    instance.lineRotations = lineRotations;
    
    // Add event listener
    window.addEventListener('pointermove', handlePointerMove);
    
    // Initial positioning - use middle element
    if (domStructure.lines.length > 0) {
      const middleIndex = Math.floor(domStructure.lines.length / 2);
      const rect = domStructure.lines[middleIndex].getBoundingClientRect();
      handlePointerMove({ clientX: rect.x + rect.width / 2, clientY: rect.y + rect.height / 2 });
    }
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element) {
      console.warn('WebflowBits MagnetLines: Element is invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits MagnetLines: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      pointerHandler: null,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      // Setup pointer handler
      this.setupPointerHandler(instance);
      
      // Mark as animating
      element.classList.add('wb-magnet-lines-animating');
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'magnet-lines',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits MagnetLines: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Initialize all elements with wb-animate="magnet-lines"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-animate="magnet-lines"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { pointerHandler, domStructure } = instance;

    // Remove pointer event listener
    if (pointerHandler) {
      window.removeEventListener('pointermove', pointerHandler);
    }

    // Restore original content
    if (domStructure && domStructure.originalContent) {
      element.innerHTML = domStructure.originalContent;
    }

    // Remove inline styles
    element.style.display = '';
    element.style.gridTemplateColumns = '';
    element.style.gridTemplateRows = '';
    element.style.width = '';
    element.style.height = '';
    element.style.justifyItems = '';
    element.style.alignItems = '';

    // Remove component classes using utility
    this.removeComponentClasses(element);

    // Remove from instances
    this.instances.delete(element);

    // Dispatch destroy event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-magnet-lines-destroy',
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
    console.log('WebflowBits MagnetLines: Refresh called');
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    const conflictClasses = [
      'magnet-lines',
      'magnet-lines__line'
    ];
    
    return checkCSSConflicts('MagnetLines', conflictClasses);
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
const magnetLinesAnimator = new MagnetLinesAnimator();

// Export for use in other modules
export default magnetLinesAnimator;
export { MagnetLinesAnimator };
