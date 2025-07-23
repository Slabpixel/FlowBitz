import splitTextAnimator from './components/splitText.js';

/**
 * Initialize Webflow Bits
 */
class WebflowBits {
  constructor() {
    this.initialized = false;
    this.observers = [];
  }

  /**
   * Initialize all components
   */
  init() {
    if (this.initialized) {
      console.warn('WebflowBits: Already initialized');
      return;
    }

    console.log('WebflowBits: Initializing...');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents());
    } else {
      this.initComponents();
    }

    this.initialized = true;
  }

  /**
   * Initialize components
   */
  initComponents() {
    // Check for potential conflicts before initializing
    this.checkConflicts();
    
    // Initialize SplitText animations
    this.initSplitText();

    // Setup mutation observer for dynamic content
    this.setupMutationObserver();

    console.log('WebflowBits: Initialized successfully');
  }

  /**
   * Check for potential CSS conflicts
   */
  checkConflicts() {
    try {
      const conflicts = splitTextAnimator.checkForConflicts();
      if (conflicts) {
        // Dispatch conflict event for user handling
        document.dispatchEvent(new CustomEvent('wb-css-conflicts', {
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
  initSplitText() {
    try {
      splitTextAnimator.initAll();
      console.log('WebflowBits: SplitText initialized');
    } catch (error) {
      console.error('WebflowBits: Failed to initialize SplitText', error);
    }
  }

  /**
   * Setup mutation observer to handle dynamically added content
   */
  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node or its children have wb-text-animate
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
        // Debounce refresh calls
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
   * Destroy all components and observers
   */
  destroy() {
    // Destroy SplitText animations
    splitTextAnimator.destroyAll();

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    this.initialized = false;
    console.log('WebflowBits: Destroyed');
  }

  /**
   * Refresh all components
   */
  refresh() {
    splitTextAnimator.refresh();
  }
}

// Create singleton instance
const webflowBits = new WebflowBits();

// Auto-initialize
webflowBits.init();

// Export for manual control
export default webflowBits;

// Make available globally for console access
if (typeof window !== 'undefined') {
  window.WebflowBits = webflowBits;
  
  // Listen for conflicts and log them for developer
  document.addEventListener('wb-css-conflicts', (event) => {
    console.warn('🚨 WebflowBits: CSS conflicts detected!', event.detail.conflicts);
    console.info('💡 Consider using different class names or check for existing Webflow classes');
  });
}