/**
 * FlowBitz - Dynamic Loader
 * Lightweight entry point with on-demand component loading
 * Inspired by Finsweet Attributes architecture
 * 
 * Features:
 * - Auto-detects components on page
 * - Lazy loads only what's needed
 * - Smart GSAP loading (only if required)
 * - Detects existing GSAP installations
 * 
 * @version 2.1.2
 * @author Slabpixel Studio
 * @license MIT
 */

const VERSION = '2.1.2';
const ATTR_PREFIX = 'wb-component';

/**
 * GSAP CDN URLs
 */
const GSAP_CDN = {
  core: 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
  scrollTrigger: 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  splitText: 'https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js',
  scrambleTextPlugin: 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrambleTextPlugin.min.js'
};

/**
 * Track which GSAP modules are loaded
 */
const gsapLoaded = {
  core: false,
  scrollTrigger: false,
  splitText: false,
  scrambleTextPlugin: false
};

/**
 * Component GSAP requirements mapping
 * Defines which GSAP modules each component needs
 */
const COMPONENT_REQUIREMENTS = {
  // Text components with GSAP
  'split-text': ['core', 'scrollTrigger', 'splitText'],
  'text-type': ['core'],
  'blur-text': ['core', 'scrollTrigger'],
  'shiny-text': [],  // CSS only
  'gradient-text': ['core', 'scrollTrigger'],
  'decrypted-text': ['core', 'scrollTrigger'],
  'scramble-text': ['core', 'scrollTrigger', 'scrambleTextPlugin'],
  'variable-proximity': ['core'],
  'count-up': ['core', 'scrollTrigger'],
  'rotating-text': ['core'],
  'text-pressure': ['core'],
  'shuffle': ['core', 'scrollTrigger'],
  'tooltip-text': [],  // CSS only
  'roll-text': ['core', 'splitText'],

  // Button components (minimal GSAP)
  'gradient-button': [],  // CSS only
  'ripple-button': [],  // CSS only
  'pulse-button': [],  // CSS only
  'magnetic-button': ['core'],
  
  // Effect components
  'smart-animate': ['core', 'scrollTrigger'],
  '3d-card-hover': [],
};

/**
 * Component mapping for dynamic imports
 * Maps component names to their import functions
 */
const COMPONENT_LOADERS = {
  // Text components
  'split-text': () => import('./components/text/splitText.js'),
  'text-type': () => import('./components/text/textType.js'),
  'blur-text': () => import('./components/text/blurText.js'),
  'shiny-text': () => import('./components/text/shinyText.js'),
  'gradient-text': () => import('./components/text/gradientText.js'),
  'decrypted-text': () => import('./components/text/decryptedText.js'),
  'scramble-text': () => import('./components/text/scrambleText.js'),
  'variable-proximity': () => import('./components/text/variableProximity.js'),
  'count-up': () => import('./components/text/countUp.js'),
  'rotating-text': () => import('./components/text/rotatingText.js'),
  'text-pressure': () => import('./components/text/textPressure.js'),
  'shuffle': () => import('./components/text/shuffle.js'),
  'tooltip-text': () => import('./components/text/tooltipText.js'),
  'roll-text': () => import('./components/text/rollText.js'),
  
  // Button components
  'gradient-button': () => import('./components/button/gradientButton.js'),
  'ripple-button': () => import('./components/button/rippleButton.js'),
  'pulse-button': () => import('./components/button/pulseButton.js'),
  'magnetic-button': () => import('./components/button/magneticButton.js'),
  
  // Effect components
  'smart-animate': () => import('./components/effect/smartAnimate.js'),
  '3d-card-hover': () => import('./components/effect/3dCardHover.js'),
};

/**
 * Check if GSAP is available (either bundled or loaded globally)
 * @returns {boolean} True if GSAP is available
 */
function isGSAPAvailable() {
  if (typeof window === 'undefined') return false;
  
  // Check if gsap is available globally or via import
  try {
    return !!(window.gsap || (typeof gsap !== 'undefined'));
  } catch (e) {
    return !!window.gsap;
  }
}

/**
 * Dynamically load GSAP script (only for ES modules via CDN)
 * @param {string} module - GSAP module name ('core', 'scrollTrigger', 'splitText', 'scrambleTextPlugin')
 * @returns {Promise} Loaded module
 */
async function loadGSAPModule(module) {
  // Check if GSAP is bundled (UMD build)
  if (isGSAPAvailable()) {
    gsapLoaded.core = true;
    // For bundled version, mark all as loaded since they're included
    gsapLoaded.scrollTrigger = true;
    gsapLoaded.splitText = true;
    gsapLoaded.scrambleTextPlugin = true;
    return window.gsap;
  }
  
  // Check if already loaded globally (user loaded it)
  if (module === 'core' && typeof window !== 'undefined' && window.gsap) {
    gsapLoaded.core = true;
    return window.gsap;
  }
  
  if (module === 'scrollTrigger' && typeof window !== 'undefined' && window.gsap?.ScrollTrigger) {
    gsapLoaded.scrollTrigger = true;
    return window.gsap.ScrollTrigger;
  }
  
  if (module === 'splitText' && typeof window !== 'undefined' && window.SplitText) {
    gsapLoaded.splitText = true;
    return window.SplitText;
  }

  if (module === 'scrambleTextPlugin' && typeof window !== 'undefined' && window.gsap?.ScrambleTextPlugin) {
    gsapLoaded.scrambleTextPlugin = true;
    return window.gsap.ScrambleTextPlugin;
  }

  // Already loaded by us
  if (gsapLoaded[module]) {
    return;
  }

  // Load dynamically from CDN (ES modules only)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GSAP_CDN[module];
    script.async = true;
    
    script.onload = () => {
      gsapLoaded[module] = true;
      
      // Register plugins with GSAP
      if (module === 'scrollTrigger' && window.gsap) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }
      if (module === 'splitText' && window.gsap) {
        window.gsap.registerPlugin(window.SplitText);
      }
      if (module === 'scrambleTextPlugin' && window.gsap) {
        window.gsap.registerPlugin(window.ScrambleTextPlugin);
      }
      
      resolve(window.gsap || window.SplitText || window.ScrollTrigger);
    };
    
    script.onerror = () => {
      reject(new Error(`Failed to load GSAP module: ${module}`));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Load required GSAP modules for a component
 * @param {string} componentName - Component name
 * @param {boolean} debug - Show debug logs
 * @returns {Promise} All required modules loaded
 */
async function loadRequiredGSAP(componentName, debug = false) {
  const requirements = COMPONENT_REQUIREMENTS[componentName] || [];
  
  if (requirements.length === 0) {
    // No GSAP needed for this component
    return;
  }

  if (debug) {
    console.log(`🔧 ${componentName} requires GSAP:`, requirements);
  }

  // Load modules in order: core first, then plugins
  for (const module of requirements) {
    if (!gsapLoaded[module]) {
      if (debug) {
        console.log(`📦 Loading GSAP module: ${module}`);
      }
      
      try {
        await loadGSAPModule(module);
        
        if (debug) {
          console.log(`✅ GSAP ${module} loaded`);
        }
      } catch (error) {
        console.error(`❌ Failed to load GSAP ${module}:`, error);
        throw error;
      }
    }
  }
}

/**
 * FlowBitz Main Class
 */
class FlowBitz {
  constructor() {
    this.version = VERSION;
    this.modules = {};
    this.loading = new Set();
    this.initialized = new Set();
    this.observers = [];
    this.gsapStats = {
      required: false,
      modulesLoaded: []
    };
    this.config = {
      auto: true,
      debug: false,
    };
  }

  /**
   * Initialize FlowBitz
   * @param {Object} options - Configuration options
   */
  async init(options = {}) {
    this.config = { ...this.config, ...options };
    
    if (this.config.debug) {
      console.log(`🎨 FlowBitz v${VERSION} initializing...`);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Auto-detect and load components
    if (this.config.auto) {
      await this.detectAndLoad();
    }

    // Setup mutation observer for dynamic content
    if (this.config.auto) {
      this.setupObserver();
    }

    // Dispatch ready event
    document.dispatchEvent(new CustomEvent('flowbitz-ready', {
      detail: { version: VERSION }
    }));

    if (this.config.debug) {
      console.log('✅ FlowBitz initialized');
    }

    return this;
  }

  /**
   * Detect components on page and load them
   */
  async detectAndLoad() {
    const components = new Set();
    
    // Find all elements with wb-component attribute
    const elements = document.querySelectorAll(`[${ATTR_PREFIX}]`);
    
    elements.forEach(el => {
      const componentName = el.getAttribute(ATTR_PREFIX);
      if (COMPONENT_LOADERS[componentName]) {
        components.add(componentName);
      }
    });

    if (this.config.debug && components.size > 0) {
      console.log(`🔍 Found components:`, Array.from(components));
    }

    // Load all detected components
    const loadPromises = Array.from(components).map(name => this.load(name));
    await Promise.all(loadPromises);
  }

  /**
   * Load a specific component
   * @param {string} componentName - Name of component to load
   * @returns {Promise} Component module
   */
  async load(componentName) {
    // Already loading or loaded
    if (this.loading.has(componentName) || this.modules[componentName]) {
      return this.modules[componentName];
    }

    // Check if component exists
    if (!COMPONENT_LOADERS[componentName]) {
      console.warn(`⚠️ FlowBitz: Component "${componentName}" not found`);
      return null;
    }

    this.loading.add(componentName);

    try {
      if (this.config.debug) {
        console.log(`📦 Loading component: ${componentName}`);
      }

      // Load required GSAP modules FIRST (if needed)
      await loadRequiredGSAP(componentName, this.config.debug);
      
      // Track GSAP usage
      const requirements = COMPONENT_REQUIREMENTS[componentName] || [];
      if (requirements.length > 0) {
        this.gsapStats.required = true;
        requirements.forEach(module => {
          if (!this.gsapStats.modulesLoaded.includes(module)) {
            this.gsapStats.modulesLoaded.push(module);
          }
        });
      }

      // Dynamic import component
      const module = await COMPONENT_LOADERS[componentName]();
      const component = module.default;

      // Store module
      this.modules[componentName] = component;

      // Initialize component
      if (component && component.initAll) {
        component.initAll();
        this.initialized.add(componentName);

        if (this.config.debug) {
          console.log(`✅ Initialized: ${componentName}`);
        }
      }

      this.loading.delete(componentName);
      return component;

    } catch (error) {
      console.error(`❌ Failed to load ${componentName}:`, error);
      this.loading.delete(componentName);
      return null;
    }
  }

  /**
   * Setup mutation observer for dynamic content
   */
  setupObserver() {
    const observer = new MutationObserver(async (mutations) => {
      const componentsToLoad = new Set();

      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the node itself has the attribute
              const componentName = node.getAttribute?.(ATTR_PREFIX);
              if (componentName && COMPONENT_LOADERS[componentName]) {
                componentsToLoad.add(componentName);
              }

              // Check children
              const elements = node.querySelectorAll?.(`[${ATTR_PREFIX}]`);
              elements?.forEach(el => {
                const name = el.getAttribute(ATTR_PREFIX);
                if (COMPONENT_LOADERS[name]) {
                  componentsToLoad.add(name);
                }
              });
            }
          });
        }
      });

      // Load newly detected components
      if (componentsToLoad.size > 0) {
        if (this.config.debug) {
          console.log('🔄 New components detected:', Array.from(componentsToLoad));
        }

        for (const name of componentsToLoad) {
          await this.load(name);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  /**
   * Manually initialize a component on specific elements
   * @param {string} componentName - Component name
   * @param {string|Element|NodeList} selector - Elements to initialize
   */
  async initOn(componentName, selector) {
    const component = await this.load(componentName);
    
    if (!component) {
      console.warn(`⚠️ Cannot initialize ${componentName}: not loaded`);
      return this;
    }

    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    if (component.initElement) {
      Array.from(elements).forEach(el => {
        component.initElement(el);
      });
    }

    if (component.refresh) {
      component.refresh();
    }

    return this;
  }

  /**
   * Get loaded component
   * @param {string} componentName - Component name
   * @returns {Object|null} Component module
   */
  getComponent(componentName) {
    return this.modules[componentName] || null;
  }

  /**
   * Check if component is loaded
   * @param {string} componentName - Component name
   * @returns {boolean} True if loaded
   */
  isLoaded(componentName) {
    return !!this.modules[componentName];
  }

  /**
   * Get all loaded components
   * @returns {string[]} Array of loaded component names
   */
  getLoadedComponents() {
    return Object.keys(this.modules);
  }

  /**
   * Get GSAP loading statistics
   * @returns {Object} GSAP stats including what's loaded and what's needed
   */
  getGSAPStats() {
    return {
      required: this.gsapStats.required,
      modulesLoaded: [...this.gsapStats.modulesLoaded],
      isGSAPLoaded: gsapLoaded.core,
      loadedModules: Object.keys(gsapLoaded).filter(key => gsapLoaded[key]),
      globalGSAP: typeof window !== 'undefined' && !!window.gsap
    };
  }

  /**
   * Refresh all loaded components
   */
  refresh() {
    Object.values(this.modules).forEach(component => {
      if (component && component.refresh) {
        component.refresh();
      }
    });
    return this;
  }

  /**
   * Destroy all components and cleanup
   */
  destroy() {
    // Destroy all components
    Object.values(this.modules).forEach(component => {
      if (component && component.destroyAll) {
        component.destroyAll();
      }
    });

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    
    // Clear state
    this.modules = {};
    this.loading.clear();
    this.initialized.clear();
    this.observers = [];

    document.dispatchEvent(new CustomEvent('flowbitz-destroyed'));
    return this;
  }
}

// Create singleton instance
const flowbitz = new FlowBitz();

// Make available globally
if (typeof window !== 'undefined') {
  window.FlowBitz = flowbitz;

  // Auto-initialize if not loaded as module
  if (!document.currentScript?.type?.includes('module')) {
    flowbitz.init();
  }
}

// Export for ES modules
export default flowbitz;
export { FlowBitz, VERSION };

