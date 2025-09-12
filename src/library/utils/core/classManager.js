/**
 * FlowBitz - Class Manager Utilities
 * Provides centralized CSS class management with tracking and cleanup
 */

/**
 * Component class manager for handling CSS classes with automatic tracking
 */
export class ComponentClassManager {
  /**
   * Apply CSS classes to an element and track them for cleanup
   * @param {Element} element - DOM element
   * @param {string|string[]} classNames - Class name(s) to apply
   * @param {Map} instancesMap - Map of element instances for tracking
   * @param {string} componentName - Component name for logging
   */
  static applyClasses(element, classNames, instancesMap, componentName = 'Unknown') {
    const classArray = Array.isArray(classNames) ? classNames : [classNames];
    
    try {
      classArray.forEach(className => {
        element.classList.add(className);
      });
      
      // Track added classes for cleanup
      const instance = instancesMap.get(element);
      if (instance) {
        instance.addedClasses = (instance.addedClasses || []).concat(classArray);
      }
      
      console.debug(`WebflowBits ${componentName}: Applied classes [${classArray.join(', ')}]`);
    } catch (error) {
      console.error(`WebflowBits ${componentName}: Failed to apply classes`, error);
    }
  }
  
  /**
   * Remove CSS classes from an element using tracked classes
   * @param {Element} element - DOM element
   * @param {string|string[]} fallbackClasses - Fallback classes to remove if tracking fails
   * @param {Map} instancesMap - Map of element instances for tracking
   * @param {string} componentName - Component name for logging
   */
  static removeClasses(element, fallbackClasses, instancesMap, componentName = 'Unknown') {
    const instance = instancesMap.get(element);
    
    try {
      // Remove tracked classes first
      if (instance && instance.addedClasses) {
        instance.addedClasses.forEach(className => {
          element.classList.remove(className);
        });
        console.debug(`WebflowBits ${componentName}: Removed tracked classes [${instance.addedClasses.join(', ')}]`);
      }
      
      // Remove fallback classes as backup
      const fallbackArray = Array.isArray(fallbackClasses) ? fallbackClasses : [fallbackClasses];
      fallbackArray.forEach(className => {
        element.classList.remove(className);
      });
      
    } catch (error) {
      console.error(`WebflowBits ${componentName}: Failed to remove classes`, error);
    }
  }
  
  /**
   * Update element classes by removing old ones and applying new ones
   * @param {Element} element - DOM element
   * @param {string|string[]} oldClasses - Classes to remove
   * @param {string|string[]} newClasses - Classes to apply
   * @param {Map} instancesMap - Map of element instances for tracking
   * @param {string} componentName - Component name for logging
   */
  static updateClasses(element, oldClasses, newClasses, instancesMap, componentName = 'Unknown') {
    this.removeClasses(element, oldClasses, instancesMap, componentName);
    this.applyClasses(element, newClasses, instancesMap, componentName);
  }
  
  /**
   * Set animation state classes
   * @param {Element} element - DOM element
   * @param {string} state - Animation state ('animating' | 'completed' | 'paused')
   * @param {string} prefix - Class prefix (e.g., 'wb-split')
   * @param {Map} instancesMap - Map of element instances for tracking
   * @param {string} componentName - Component name for logging
   */
  static setAnimationState(element, state, prefix, instancesMap, componentName = 'Unknown') {
    const stateClasses = [
      `${prefix}-animating`,
      `${prefix}-completed`, 
      `${prefix}-paused`
    ];
    
    // Remove all state classes
    stateClasses.forEach(className => {
      element.classList.remove(className);
    });
    
    // Add new state class
    const newStateClass = `${prefix}-${state}`;
    this.applyClasses(element, newStateClass, instancesMap, componentName);
  }
  
  /**
   * Check if element has any of the specified classes
   * @param {Element} element - DOM element
   * @param {string|string[]} classNames - Class name(s) to check
   * @returns {boolean} True if element has any of the classes
   */
  static hasAnyClass(element, classNames) {
    const classArray = Array.isArray(classNames) ? classNames : [classNames];
    return classArray.some(className => element.classList.contains(className));
  }
  
  /**
   * Get all classes added by the component to an element
   * @param {Element} element - DOM element
   * @param {Map} instancesMap - Map of element instances for tracking
   * @returns {string[]} Array of added class names
   */
  static getAddedClasses(element, instancesMap) {
    const instance = instancesMap.get(element);
    return instance && instance.addedClasses ? [...instance.addedClasses] : [];
  }
}

/**
 * Namespace-specific class utilities
 */
export const webflowBitsClasses = {
  /**
   * Generate FlowBitz namespaced class name
   * @param {string} component - Component name
   * @param {string} element - Element name
   * @param {string} modifier - Optional modifier
   * @returns {string} Namespaced class name
   */
  generate: (component, element, modifier = null) => {
    let className = `wb-${component}`;
    if (element) className += `__${element}`;
    if (modifier) className += `--${modifier}`;
    return className;
  },
  
  /**
   * Common animation state classes
   */
  states: {
    animating: 'wb-animating',
    completed: 'wb-completed',
    paused: 'wb-paused'
  },
  
  /**
   * Generate component-specific classes
   * @param {string} componentName - Component name
   * @returns {Object} Object with component-specific class names
   */
  forComponent: (componentName) => ({
    parent: `wb-${componentName}`,
    animating: `wb-${componentName}-animating`, 
    completed: `wb-${componentName}-completed`,
    paused: `wb-${componentName}-paused`
  })
};

/**
 * Performance optimization class manager
 */
export class PerformanceClassManager {
  /**
   * Apply performance optimization classes for animation
   * @param {Element|Element[]} elements - Element(s) to optimize
   */
  static optimizeForAnimation(elements) {
    const elementArray = Array.isArray(elements) ? elements : [elements];
    
    elementArray.forEach(element => {
      element.classList.add('wb-optimized');
      // These styles are handled by CSS, but we could set them inline if needed
    });
  }
  
  /**
   * Remove performance optimization classes after animation
   * @param {Element|Element[]} elements - Element(s) to clean up
   */
  static cleanupAfterAnimation(elements) {
    const elementArray = Array.isArray(elements) ? elements : [elements];
    
    elementArray.forEach(element => {
      element.classList.remove('wb-optimized');
    });
  }
} 