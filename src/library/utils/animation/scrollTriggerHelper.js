/**
 * FlowBitz - ScrollTrigger Helper Utilities
 * Provides reusable ScrollTrigger configuration and calculation functions
 */

/**
 * Calculate ScrollTrigger start position based on threshold and root margin
 * Converts all CSS units to pixels for consistent GSAP behavior
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {string} rootMargin - Root margin string (e.g., "-100px", "10vh", "5%", "2rem", "2em")
 * @param {Element|null} element - Target element (needed for 'em' unit calculation, optional)
 * @returns {string} Calculated start position for ScrollTrigger
 */
export function calculateScrollTriggerStart(threshold = 0.1, rootMargin = '0px', element = null) {
  // Calculate percentage based on threshold
  const startPct = (1 - threshold) * 100;
  
  // Parse root margin
  const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%|vw|vh)?$/.exec(rootMargin);
  
  if (!marginMatch) {
    console.warn(`WebflowBits: Invalid rootMargin format "${rootMargin}", using 0px`);
    return `top ${startPct}%`;
  }
  
  const marginValue = parseFloat(marginMatch[1]);
  const marginUnit = marginMatch[2] || 'px';
  
  // Convert all units to pixels for consistent GSAP behavior
  // This avoids issues with mixing percentage positions and viewport units
  let marginInPixels = marginValue;
  
  if (marginUnit !== 'px') {
    try {
      switch (marginUnit) {
        case 'vh':
          // vh = percentage of viewport height
          marginInPixels = (marginValue * window.innerHeight) / 100;
          break;
          
        case 'vw':
          // vw = percentage of viewport width
          marginInPixels = (marginValue * window.innerWidth) / 100;
          break;
          
        case '%':
          // % = percentage of viewport height (in scroll context)
          marginInPixels = (marginValue * window.innerHeight) / 100;
          break;
          
        case 'em':
          // em = relative to element's font-size (if element provided)
          if (element) {
            const elementFontSize = parseFloat(getComputedStyle(element).fontSize);
            marginInPixels = marginValue * elementFontSize;
          } else {
            // Fallback to body font-size if element not available
            const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);
            marginInPixels = marginValue * bodyFontSize;
            console.warn(`WebflowBits: Element not provided for 'em' unit, using body font-size (${bodyFontSize}px) as fallback`);
          }
          break;
          
        case 'rem':
          // rem = relative to root element font-size
          const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          marginInPixels = marginValue * rootFontSize;
          break;
          
        default:
          console.warn(`WebflowBits: Unknown unit "${marginUnit}", treating as px`);
      }
      
      // Round to avoid sub-pixel issues
      marginInPixels = Math.round(marginInPixels);
      
      if (marginUnit !== 'px') {
        console.info(`WebflowBits: Converted rootMargin "${rootMargin}" to "${marginInPixels}px"`);
      }
      
    } catch (error) {
      console.error(`WebflowBits: Error converting rootMargin "${rootMargin}":`, error);
      marginInPixels = marginValue; // Fallback to original value as px
    }
  }
  
  // Handle negative values - GSAP syntax
  const sign = marginInPixels < 0 ? `-=${Math.abs(marginInPixels)}px` : `+=${marginInPixels}px`;
  
  // Return start position with pixels (works consistently with GSAP)
  return `top ${startPct}%${sign}`;
}

/**
 * Create a standardized ScrollTrigger configuration object
 * @param {Element} element - Target element for ScrollTrigger
 * @param {Object} config - Configuration object
 * @param {Object} callbacks - Callback functions
 * @returns {Object} ScrollTrigger configuration
 */
export function createScrollTriggerConfig(element, config = {}, callbacks = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    toggleActions = 'play none none none',
    once = true,
    markers = false,
    refreshPriority = 0
  } = config;
  
  const {
    onToggle,
    onUpdate,
    onRefresh,
    onScrubComplete
  } = callbacks;
  
  const triggerConfig = {
    trigger: element,
    start: calculateScrollTriggerStart(threshold, rootMargin, element),
    toggleActions,
    once,
    refreshPriority
  };
  
  // Add callbacks if provided
  if (onToggle) triggerConfig.onToggle = onToggle;
  if (onUpdate) triggerConfig.onUpdate = onUpdate;
  if (onRefresh) triggerConfig.onRefresh = onRefresh;
  if (onScrubComplete) triggerConfig.onScrubComplete = onScrubComplete;
  
  // Add markers in development
  if (markers && (typeof window !== 'undefined' && window.location.hostname === 'localhost')) {
    triggerConfig.markers = true;
  }
  
  return triggerConfig;
}

/**
 * Create ScrollTrigger config specifically for animations that run once
 * @param {Element} element - Target element
 * @param {Object} config - Configuration options
 * @param {Function} onToggleCallback - Callback for when animation triggers
 * @returns {Object} ScrollTrigger configuration for one-time animations
 */
export function createOnceAnimationConfig(element, config = {}, onToggleCallback = null) {
  return createScrollTriggerConfig(
    element,
    { ...config, once: true },
    { onToggle: onToggleCallback }
  );
}

/**
 * Create ScrollTrigger config for repeating animations
 * @param {Element} element - Target element
 * @param {Object} config - Configuration options
 * @param {Function} onToggleCallback - Callback for when animation triggers
 * @returns {Object} ScrollTrigger configuration for repeating animations
 */
export function createRepeatingAnimationConfig(element, config = {}, onToggleCallback = null) {
  return createScrollTriggerConfig(
    element,
    { ...config, once: false, toggleActions: 'play reverse play reverse' },
    { onToggle: onToggleCallback }
  );
}

/**
 * Calculate end position for ScrollTrigger based on element height and offset
 * @param {Element} element - Target element
 * @param {string|number} offset - Offset from element bottom (e.g., "100px", 100)
 * @returns {string} End position string
 */
export function calculateScrollTriggerEnd(element, offset = 0) {
  if (typeof offset === 'number') {
    return `bottom+=${offset}px top`;
  }
  
  return `bottom+=${offset} top`;
}

/**
 * Batch ScrollTrigger creation for multiple elements
 * @param {Element[]} elements - Array of elements
 * @param {Object} config - Shared configuration
 * @param {Function} animationFactory - Function that creates animation for each element
 * @returns {Object[]} Array of created ScrollTriggers
 */
export function createBatchScrollTriggers(elements, config = {}, animationFactory = null) {
  const triggers = [];
  
  elements.forEach((element, index) => {
    try {
      // Create element-specific config
      const elementConfig = {
        ...config,
        // Add stagger delay to threshold if specified
        ...(config.staggerDelay && { 
          threshold: config.threshold + (index * (config.staggerDelay / 1000)) 
        })
      };
      
      // Create animation if factory provided
      let animation = null;
      if (animationFactory) {
        animation = animationFactory(element, index, elementConfig);
      }
      
      // Create ScrollTrigger config
      const triggerConfig = createScrollTriggerConfig(element, elementConfig, {
        onToggle: (self) => {
          if (animation && self.isActive) {
            animation.play();
          }
        }
      });
      
      triggers.push({
        element,
        config: triggerConfig,
        animation,
        index
      });
      
    } catch (error) {
      console.error(`WebflowBits: Failed to create ScrollTrigger for element ${index}`, error);
    }
  });
  
  return triggers;
}

/**
 * Responsive ScrollTrigger configuration based on screen size
 * @param {Element} element - Target element
 * @param {Object} responsiveConfig - Configuration for different screen sizes
 * @returns {Object} ScrollTrigger configuration
 */
export function createResponsiveScrollTriggerConfig(element, responsiveConfig = {}) {
  const {
    mobile = {},
    tablet = {},
    desktop = {},
    breakpoints = { mobile: 768, tablet: 1024 }
  } = responsiveConfig;
  
  const screenWidth = window.innerWidth;
  let config = desktop; // default
  
  if (screenWidth <= breakpoints.mobile) {
    config = { ...desktop, ...mobile };
  } else if (screenWidth <= breakpoints.tablet) {
    config = { ...desktop, ...tablet };
  }
  
  return createScrollTriggerConfig(element, config);
}

/**
 * Debug ScrollTrigger by adding visual markers and logging
 * @param {Object} triggerConfig - ScrollTrigger configuration
 * @param {string} label - Debug label
 * @returns {Object} Enhanced configuration with debug features
 */
export function debugScrollTrigger(triggerConfig, label = 'ScrollTrigger') {
  const debugConfig = {
    ...triggerConfig,
    markers: {
      startColor: 'green',
      endColor: 'red',
      fontSize: '12px',
      indent: 20
    },
    onUpdate: (self) => {
      console.log(`${label} - Progress: ${self.progress.toFixed(3)}, Direction: ${self.direction}`);
      if (triggerConfig.onUpdate) {
        triggerConfig.onUpdate(self);
      }
    },
    onToggle: (self) => {
      console.log(`${label} - Toggled: ${self.isActive ? 'ACTIVE' : 'INACTIVE'}`);
      if (triggerConfig.onToggle) {
        triggerConfig.onToggle(self);
      }
    }
  };
  
  return debugConfig;
}

/**
 * Validate ScrollTrigger configuration
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validation result with errors and warnings
 */
export function validateScrollTriggerConfig(config) {
  const validation = {
    isValid: true,
    errors: [],
    warnings: []
  };
  
  // Check required fields
  if (!config.trigger) {
    validation.errors.push('trigger element is required');
    validation.isValid = false;
  }
  
  // Validate start position
  if (config.start && typeof config.start !== 'string') {
    validation.errors.push('start position must be a string');
    validation.isValid = false;
  }
  
  // Validate threshold if using custom calculation
  if (config.threshold !== undefined) {
    if (typeof config.threshold !== 'number' || config.threshold < 0 || config.threshold > 1) {
      validation.warnings.push('threshold should be a number between 0 and 1');
    }
  }
  
  // Check for common mistakes
  if (config.toggleActions && !['play', 'pause', 'resume', 'reset', 'restart', 'complete', 'reverse', 'none'].some(action => 
    config.toggleActions.includes(action))) {
    validation.warnings.push('toggleActions contains unrecognized actions');
  }
  
  return validation;
}

/**
 * Setup automatic ScrollTrigger refresh on window resize
 * Debounced to avoid excessive recalculations
 * @param {number} debounceDelay - Delay in ms before refreshing (default: 250ms)
 * @returns {Function} Cleanup function to remove resize listener
 */
export function setupScrollTriggerResize(debounceDelay = 250) {
  // Import ScrollTrigger dynamically to avoid circular dependency
  let resizeTimeout;
  
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Refresh all ScrollTrigger instances
      if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
        window.gsap.ScrollTrigger.refresh();
        console.info('WebflowBits: ScrollTrigger refreshed after window resize');
      }
    }, debounceDelay);
  };
  
  // Add resize listener
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
    console.info('WebflowBits: ScrollTrigger resize handler initialized');
  }
  
  // Return cleanup function
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    }
  };
}

/**
 * Common ScrollTrigger presets for different animation types
 */
export const scrollTriggerPresets = {
  // Fade in from bottom
  fadeInUp: (element) => createScrollTriggerConfig(element, {
    threshold: 0.1,
    rootMargin: '-50px'
  }),
  
  // Slide in from left
  slideInLeft: (element) => createScrollTriggerConfig(element, {
    threshold: 0.2,
    rootMargin: '-100px'
  }),
  
  // Scale animation
  scaleIn: (element) => createScrollTriggerConfig(element, {
    threshold: 0.3,
    rootMargin: '0px'
  }),
  
  // Text animation (more sensitive)
  textAnimation: (element) => createScrollTriggerConfig(element, {
    threshold: 0.1,
    rootMargin: '-100px',
    toggleActions: 'play none none none',
    once: true
  }),
  
  // Parallax effect
  parallax: (element) => createScrollTriggerConfig(element, {
    threshold: 0,
    rootMargin: '0px',
    toggleActions: 'play none none none',
    once: false
  })
}; 