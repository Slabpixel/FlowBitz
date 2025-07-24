/**
 * Webflow Bits - Animation State Manager Utilities
 * Provides centralized animation state management and event dispatching
 */

/**
 * Animation state manager for handling component states and events
 */
export class AnimationStateManager {
  /**
   * Set element to animating state
   * @param {Element} element - DOM element
   * @param {string} componentPrefix - Component prefix (e.g., 'wb-split')
   */
  static setAnimatingState(element, componentPrefix = 'wb') {
    element.classList.remove(`${componentPrefix}-completed`, `${componentPrefix}-paused`);
    element.classList.add(`${componentPrefix}-animating`);
  }
  
  /**
   * Set element to completed state
   * @param {Element} element - DOM element
   * @param {string} componentPrefix - Component prefix (e.g., 'wb-split')
   */
  static setCompletedState(element, componentPrefix = 'wb') {
    element.classList.remove(`${componentPrefix}-animating`, `${componentPrefix}-paused`);
    element.classList.add(`${componentPrefix}-completed`);
  }
  
  /**
   * Set element to paused state
   * @param {Element} element - DOM element
   * @param {string} componentPrefix - Component prefix (e.g., 'wb-split')
   */
  static setPausedState(element, componentPrefix = 'wb') {
    element.classList.remove(`${componentPrefix}-animating`, `${componentPrefix}-completed`);
    element.classList.add(`${componentPrefix}-paused`);
  }
  
  /**
   * Get current animation state of element
   * @param {Element} element - DOM element
   * @param {string} componentPrefix - Component prefix (e.g., 'wb-split')
   * @returns {string} Current state ('animating', 'completed', 'paused', 'idle')
   */
  static getCurrentState(element, componentPrefix = 'wb') {
    if (element.classList.contains(`${componentPrefix}-animating`)) return 'animating';
    if (element.classList.contains(`${componentPrefix}-completed`)) return 'completed';
    if (element.classList.contains(`${componentPrefix}-paused`)) return 'paused';
    return 'idle';
  }
  
  /**
   * Check if element is in a specific state
   * @param {Element} element - DOM element
   * @param {string} state - State to check ('animating', 'completed', 'paused')
   * @param {string} componentPrefix - Component prefix (e.g., 'wb-split')
   * @returns {boolean} True if element is in the specified state
   */
  static isInState(element, state, componentPrefix = 'wb') {
    return element.classList.contains(`${componentPrefix}-${state}`);
  }
  
  /**
   * Dispatch custom event from element
   * @param {Element} element - DOM element
   * @param {string} eventName - Name of the event
   * @param {Object} detail - Event detail object
   * @param {Object} options - Event options
   */
  static dispatchEvent(element, eventName, detail = {}, options = {}) {
    const eventOptions = {
      bubbles: true,
      cancelable: false,
      ...options
    };
    
    try {
      const customEvent = new CustomEvent(eventName, {
        detail,
        ...eventOptions
      });
      
      element.dispatchEvent(customEvent);
      
      console.debug(`WebflowBits: Dispatched event "${eventName}"`, detail);
    } catch (error) {
      console.error(`WebflowBits: Failed to dispatch event "${eventName}"`, error);
    }
  }
  
  /**
   * Dispatch animation lifecycle events
   * @param {Element} element - DOM element
   * @param {string} phase - Animation phase ('start', 'complete', 'pause', 'resume')
   * @param {string} componentName - Component name for namespaced events
   * @param {Object} data - Additional data to include in event
   */
  static dispatchLifecycleEvent(element, phase, componentName, data = {}) {
    const eventName = `wb-${componentName}-${phase}`;
    
    this.dispatchEvent(element, eventName, {
      phase,
      componentName,
      timestamp: Date.now(),
      ...data
    });
  }
  
  /**
   * Add event listener for animation lifecycle events
   * @param {Element} element - DOM element
   * @param {string} phase - Animation phase ('start', 'complete', 'pause', 'resume')
   * @param {string} componentName - Component name
   * @param {Function} callback - Event callback
   * @returns {Function} Cleanup function to remove listener
   */
  static addLifecycleListener(element, phase, componentName, callback) {
    const eventName = `wb-${componentName}-${phase}`;
    
    element.addEventListener(eventName, callback);
    
    // Return cleanup function
    return () => {
      element.removeEventListener(eventName, callback);
    };
  }
}

/**
 * Performance optimization utilities for animations
 */
export class PerformanceOptimizer {
  /**
   * Apply performance optimizations to elements before animation
   * @param {Element|Element[]} elements - Element(s) to optimize
   * @param {Object} options - Optimization options
   */
  static optimizeForAnimation(elements, options = {}) {
    const {
      force3D = true,
      willChange = 'transform, opacity',
      backfaceVisibility = 'hidden',
      perspective = '1000px'
    } = options;
    
    const elementArray = Array.isArray(elements) ? elements : [elements];
    
    elementArray.forEach(element => {
      try {
        // Store original styles for cleanup
        if (!element._wbOriginalStyles) {
          element._wbOriginalStyles = {
            willChange: element.style.willChange || '',
            backfaceVisibility: element.style.backfaceVisibility || '',
            perspective: element.style.perspective || '',
            transform: element.style.transform || ''
          };
        }
        
        // Apply optimizations
        if (willChange) element.style.willChange = willChange;
        if (backfaceVisibility) element.style.backfaceVisibility = backfaceVisibility;
        if (perspective) element.style.perspective = perspective;
        
        // Force 3D acceleration
        if (force3D && !element.style.transform.includes('translateZ')) {
          const currentTransform = element.style.transform;
          element.style.transform = currentTransform ? 
            `${currentTransform} translateZ(0)` : 
            'translateZ(0)';
        }
        
      } catch (error) {
        console.warn('WebflowBits: Failed to optimize element for animation', error);
      }
    });
  }
  
  /**
   * Clean up performance optimizations after animation
   * @param {Element|Element[]} elements - Element(s) to clean up
   * @param {Object} options - Cleanup options
   */
  static cleanupAfterAnimation(elements, options = {}) {
    const {
      restoreOriginal = true,
      removeTranslateZ = true
    } = options;
    
    const elementArray = Array.isArray(elements) ? elements : [elements];
    
    elementArray.forEach(element => {
      try {
        if (restoreOriginal && element._wbOriginalStyles) {
          // Restore original styles
          const original = element._wbOriginalStyles;
          element.style.willChange = original.willChange;
          element.style.backfaceVisibility = original.backfaceVisibility;
          element.style.perspective = original.perspective;
          
          // Remove translateZ if it was added for optimization
          if (removeTranslateZ && original.transform !== element.style.transform) {
            element.style.transform = original.transform;
          }
          
          // Clean up stored styles
          delete element._wbOriginalStyles;
        } else {
          // Fallback cleanup
          element.style.willChange = 'auto';
          element.style.backfaceVisibility = 'visible';
          
          if (removeTranslateZ) {
            const transform = element.style.transform.replace(/translateZ\(0\)\s?/g, '').trim();
            element.style.transform = transform || '';
          }
        }
        
      } catch (error) {
        console.warn('WebflowBits: Failed to cleanup element after animation', error);
      }
    });
  }
  
  /**
   * Monitor animation performance
   * @param {string} animationName - Name of the animation for tracking
   * @param {Function} animationCallback - Animation function to monitor
   * @returns {Promise} Promise that resolves with performance data
   */
  static async monitorPerformance(animationName, animationCallback) {
    const startTime = performance.now();
    let endTime;
    
    try {
      const result = await animationCallback();
      endTime = performance.now();
      
      const duration = endTime - startTime;
      const performanceData = {
        animationName,
        duration,
        fps: duration > 0 ? Math.round(1000 / duration) : 0,
        startTime,
        endTime,
        success: true
      };
      
      console.debug(`WebflowBits Performance: ${animationName}`, performanceData);
      
      return { result, performance: performanceData };
      
    } catch (error) {
      endTime = performance.now();
      const duration = endTime - startTime;
      
      const performanceData = {
        animationName,
        duration,
        startTime,
        endTime,
        success: false,
        error: error.message
      };
      
      console.error(`WebflowBits Performance: ${animationName} failed`, performanceData);
      
      return { error, performance: performanceData };
    }
  }
  
  /**
   * Debounce function for performance optimization
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately on first call
   * @returns {Function} Debounced function
   */
  static debounce(func, wait, immediate = false) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(this, args);
    };
  }
  
  /**
   * Throttle function for performance optimization
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

/**
 * Animation queue manager for coordinating multiple animations
 */
export class AnimationQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  /**
   * Add animation to queue
   * @param {Function} animationFn - Animation function
   * @param {Object} options - Queue options
   * @returns {Promise} Promise that resolves when animation completes
   */
  add(animationFn, options = {}) {
    const {
      priority = 0,
      delay = 0,
      id = null
    } = options;
    
    return new Promise((resolve, reject) => {
      const queueItem = {
        id: id || `anim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        animationFn,
        priority,
        delay,
        resolve,
        reject,
        timestamp: Date.now()
      };
      
      // Insert based on priority (higher priority first)
      const insertIndex = this.queue.findIndex(item => item.priority < priority);
      if (insertIndex === -1) {
        this.queue.push(queueItem);
      } else {
        this.queue.splice(insertIndex, 0, queueItem);
      }
      
      this.processQueue();
    });
  }
  
  /**
   * Process animation queue
   */
  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      
      try {
        // Apply delay if specified
        if (item.delay > 0) {
          await new Promise(resolve => setTimeout(resolve, item.delay));
        }
        
        // Execute animation
        const result = await item.animationFn();
        item.resolve(result);
        
      } catch (error) {
        item.reject(error);
      }
    }
    
    this.isProcessing = false;
  }
  
  /**
   * Clear all queued animations
   */
  clear() {
    this.queue.forEach(item => {
      item.reject(new Error('Animation queue cleared'));
    });
    this.queue = [];
  }
  
  /**
   * Get queue status
   * @returns {Object} Queue status information
   */
  getStatus() {
    return {
      isProcessing: this.isProcessing,
      queueLength: this.queue.length,
      nextAnimation: this.queue[0]?.id || null
    };
  }
} 