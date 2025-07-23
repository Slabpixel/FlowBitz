/**
 * Webflow Bits - CDN Entry Point
 * A collection of interactive components for Webflow
 * 
 * @version 1.0.0
 * @author Slabpixel Studio
 * @license MIT
 */

import splitTextAnimator from './components/splitText.js';

/**
 * Main WebflowBits class for CDN usage
 */
class WebflowBits {
  constructor() {
    this.version = '1.0.0';
    this.initialized = false;
    this.observers = [];
    this.components = {
      splitText: splitTextAnimator
    };
  }

  /**
   * Initialize all components
   * @param {Object} options - Configuration options
   */
  init(options = {}) {
    if (this.initialized) {
      console.warn('WebflowBits: Already initialized');
      return this;
    }

    const config = {
      autoInit: true,
      debug: false,
      components: ['splitText'],
      ...options
    };

    if (config.debug) {
      console.log('WebflowBits: Initializing...', { version: this.version, config });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents(config));
    } else {
      this.initComponents(config);
    }

    this.initialized = true;
    return this;
  }

  /**
   * Initialize components based on config
   */
  initComponents(config) {
    try {
      // Check for potential conflicts before initializing
      if (config.debug) {
        this.checkConflicts();
      }
      
      // Initialize enabled components
      if (config.components.includes('splitText')) {
        this.initSplitText(config.debug);
      }

      // Setup mutation observer for dynamic content if autoInit is enabled
      if (config.autoInit) {
        this.setupMutationObserver(config.debug);
      }

      if (config.debug) {
        console.log('WebflowBits: Initialized successfully');
      }

      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('webflow-bits-ready', {
        detail: { version: this.version, components: this.components }
      }));

    } catch (error) {
      console.error('WebflowBits: Initialization failed', error);
    }
  }

  /**
   * Check for potential CSS conflicts
   */
  checkConflicts() {
    try {
      const conflicts = splitTextAnimator.checkForConflicts();
      if (conflicts) {
        document.dispatchEvent(new CustomEvent('webflow-bits-conflicts', {
          detail: { conflicts }
        }));
      }
    } catch (error) {
      console.warn('WebflowBits: Error checking conflicts', error);
    }
  }

  /**
   * Initialize SplitText component
   */
  initSplitText(debug = false) {
    try {
      splitTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: SplitText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize SplitText', error);
    }
  }

  /**
   * Setup mutation observer to handle dynamically added content
   */
  setupMutationObserver(debug = false) {
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check for wb-text-animate elements
              const splitTextElements = node.matches?.('[wb-text-animate="split-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="split-text"]') || []);

              splitTextElements.forEach(element => {
                splitTextAnimator.initElement(element);
                shouldRefresh = true;
              });
            }
          });
        }
      });

      if (shouldRefresh) {
        clearTimeout(this.refreshTimeout);
        this.refreshTimeout = setTimeout(() => {
          splitTextAnimator.refresh();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  /**
   * Manually initialize SplitText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initSplitTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'split-text') {
        splitTextAnimator.initElement(element);
      }
    });

    splitTextAnimator.refresh();
    return this;
  }

  /**
   * Destroy all components and observers
   */
  destroy() {
    // Destroy SplitText animations
    splitTextAnimator.destroyAll();

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    this.initialized = false;
    
    document.dispatchEvent(new CustomEvent('webflow-bits-destroyed'));
    return this;
  }

  /**
   * Refresh all components
   */
  refresh() {
    splitTextAnimator.refresh();
    return this;
  }

  /**
   * Get component instance
   * @param {string} name - Component name
   */
  getComponent(name) {
    return this.components[name] || null;
  }
}

// Create singleton instance
const webflowBits = new WebflowBits();

// Auto-initialize with default settings if not in module context
if (typeof window !== 'undefined') {
  // Make available globally
  window.WebflowBits = webflowBits;
  
  // Auto-init if script is loaded normally (not as module)
  if (!document.currentScript?.type?.includes('module')) {
    webflowBits.init();
  }

  // Listen for conflicts and log them
  document.addEventListener('webflow-bits-conflicts', (event) => {
    console.warn('🚨 WebflowBits: CSS conflicts detected!', event.detail.conflicts);
    console.info('💡 Consider using different class names or check for existing Webflow classes');
  });
}

// Export for ES modules
export default webflowBits;
export { WebflowBits };