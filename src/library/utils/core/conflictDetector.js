/**
 * Webflow Bits - Conflict Detector Utilities
 * Provides CSS class conflict detection and resolution suggestions
 */

/**
 * Check for CSS class conflicts in the DOM
 * @param {string[]} testClasses - Array of class names to check for conflicts
 * @param {string} componentName - Name of the component for logging
 * @param {string} selectorFilter - CSS selector to exclude from conflict check
 * @returns {Object[]|null} Array of conflicts or null if none found
 */
export function checkCSSConflicts(testClasses, componentName, selectorFilter = '[wb-text-animate]') {
  const conflicts = [];
  
  testClasses.forEach(className => {
    try {
      const existing = document.querySelector(`.${className}:not(${selectorFilter})`);
      if (existing) {
        conflicts.push({
          className,
          element: existing,
          message: `Class "${className}" already exists in DOM outside of WebflowBits ${componentName}`,
          severity: 'warning',
          suggestion: `Consider using a different class name or adding a more specific namespace`
        });
      }
    } catch (error) {
      console.warn(`WebflowBits ${componentName}: Error checking conflict for class "${className}"`, error);
    }
  });

  if (conflicts.length > 0) {
    console.warn(`WebflowBits ${componentName}: Potential CSS conflicts detected:`, conflicts);
    return conflicts;
  }

  return null;
}

/**
 * Advanced conflict detection with detailed analysis
 * @param {Object} config - Configuration object for conflict detection
 * @returns {Object} Detailed conflict analysis
 */
export function analyzeConflicts(config) {
  const {
    testClasses,
    componentName,
    selectorFilter = '[wb-text-animate]',
    excludeSelectors = [],
    severity = 'warning'
  } = config;
  
  const analysis = {
    componentName,
    conflicts: [],
    warnings: [],
    suggestions: [],
    severity: 'none'
  };
  
  testClasses.forEach(className => {
    try {
      // Build exclusion selector
      const exclusions = [selectorFilter, ...excludeSelectors].join(', ');
      const selector = `.${className}:not(${exclusions})`;
      
      const existingElements = document.querySelectorAll(selector);
      
      if (existingElements.length > 0) {
        const conflict = {
          className,
          elements: Array.from(existingElements),
          count: existingElements.length,
          severity,
          message: `Class "${className}" found ${existingElements.length} time(s) outside WebflowBits ${componentName}`,
          resolution: generateResolutionSuggestion(className, componentName)
        };
        
        analysis.conflicts.push(conflict);
        
        // Set overall severity
        if (analysis.severity === 'none' || (severity === 'error' && analysis.severity === 'warning')) {
          analysis.severity = severity;
        }
      }
    } catch (error) {
      analysis.warnings.push({
        className,
        message: `Error checking conflict for class "${className}": ${error.message}`,
        error
      });
    }
  });
  
  // Generate suggestions
  if (analysis.conflicts.length > 0) {
    analysis.suggestions = generateConflictSuggestions(analysis.conflicts, componentName);
  }
  
  return analysis;
}

/**
 * Generate resolution suggestion for a specific class conflict
 * @param {string} className - Conflicting class name
 * @param {string} componentName - Component name
 * @returns {Object} Resolution suggestion
 */
function generateResolutionSuggestion(className, componentName) {
  const suggestions = {
    immediate: [],
    longTerm: []
  };
  
  // Immediate suggestions
  if (!className.startsWith('wb-')) {
    suggestions.immediate.push(`Add 'wb-' namespace prefix to make it '${className}'`);
  }
  
  if (!className.includes(componentName.toLowerCase())) {
    suggestions.immediate.push(`Add component name to make it 'wb-${componentName.toLowerCase()}-${className.replace('wb-', '')}'`);
  }
  
  // Long-term suggestions
  suggestions.longTerm.push('Review existing CSS to ensure no conflicting styles');
  suggestions.longTerm.push('Consider using CSS modules or styled-components for better isolation');
  
  return suggestions;
}

/**
 * Generate overall conflict resolution suggestions
 * @param {Object[]} conflicts - Array of conflicts
 * @param {string} componentName - Component name
 * @returns {string[]} Array of suggestions
 */
function generateConflictSuggestions(conflicts, componentName) {
  const suggestions = [];
  
  const totalConflicts = conflicts.reduce((sum, conflict) => sum + conflict.count, 0);
  
  if (totalConflicts > 5) {
    suggestions.push(`Multiple conflicts detected (${totalConflicts}). Consider reviewing your CSS architecture.`);
  }
  
  const highImpactClasses = conflicts.filter(c => c.count > 3);
  if (highImpactClasses.length > 0) {
    suggestions.push(`High-impact conflicts found for: ${highImpactClasses.map(c => c.className).join(', ')}`);
  }
  
  suggestions.push(`Ensure all ${componentName} styles use the 'wb-${componentName.toLowerCase()}-' prefix`);
  suggestions.push('Test your site thoroughly after resolving conflicts');
  
  return suggestions;
}

/**
 * Monitor for dynamic conflicts (useful for SPA environments)
 * @param {Object} config - Configuration for monitoring
 * @returns {Function} Cleanup function to stop monitoring
 */
export function monitorConflicts(config) {
  const {
    testClasses,
    componentName,
    checkInterval = 5000,
    onConflictDetected = null
  } = config;
  
  let isMonitoring = true;
  
  const checkForConflicts = () => {
    if (!isMonitoring) return;
    
    const conflicts = checkCSSConflicts(testClasses, componentName);
    
    if (conflicts && onConflictDetected) {
      onConflictDetected(conflicts);
    }
    
    // Schedule next check
    setTimeout(checkForConflicts, checkInterval);
  };
  
  // Start monitoring
  checkForConflicts();
  
  // Return cleanup function
  return () => {
    isMonitoring = false;
  };
}

/**
 * Validate component CSS classes before initialization
 * @param {string[]} testClasses - Classes to validate
 * @param {string} componentName - Component name
 * @param {Object} options - Validation options
 * @returns {boolean} True if validation passes
 */
export function validateComponentClasses(testClasses, componentName, options = {}) {
  const {
    throwOnConflict = false,
    allowWarnings = true,
    logResults = true
  } = options;
  
  const analysis = analyzeConflicts({
    testClasses,
    componentName,
    severity: throwOnConflict ? 'error' : 'warning'
  });
  
  if (logResults && analysis.conflicts.length > 0) {
    console.group(`WebflowBits ${componentName}: Class Validation Results`);
    analysis.conflicts.forEach(conflict => {
      console.warn(`Conflict: ${conflict.message}`);
    });
    console.groupEnd();
  }
  
  if (throwOnConflict && analysis.severity === 'error') {
    throw new Error(`CSS conflicts detected for ${componentName}: ${analysis.conflicts.map(c => c.className).join(', ')}`);
  }
  
  return analysis.conflicts.length === 0 || (allowWarnings && analysis.severity !== 'error');
}

/**
 * Pre-defined class sets for common components
 */
export const componentClassSets = {
  splitText: ['wb-split-parent', 'wb-split-line', 'wb-split-word', 'wb-split-char', 'wb-split-animating', 'wb-split-completed'],
  textType: ['wb-text-type', 'wb-text-type__content', 'wb-text-type__cursor', 'wb-text-type-animating', 'wb-text-type-completed'],
  blurText: ['wb-blur-text', 'wb-blur-text__segment', 'wb-blur-text-animating', 'wb-blur-text-completed'],
  shinyText: ['wb-shiny-text', 'wb-shiny-text--disabled'],
  gradientText: ['wb-gradient-text', 'wb-gradient-text__content', 'wb-gradient-text__overlay', 'wb-gradient-text--disabled'],
  shapeBlur: ['wb-shape-blur', 'wb-shape-blur__canvas', 'wb-shape-blur__content', 'wb-shape-blur--error', 'wb-shape-blur__error-message', 'wb-shape-blur--show-error', 'wb-shape-blur-animating', 'wb-shape-blur-completed']
};

/**
 * Quick conflict check for specific component
 * @param {string} componentType - Type of component ('splitText', 'textType', etc.)
 * @returns {Object[]|null} Conflicts or null
 */
export function checkComponentConflicts(componentType) {
  const testClasses = componentClassSets[componentType];
  
  if (!testClasses) {
    console.warn(`WebflowBits: Unknown component type "${componentType}"`);
    return null;
  }
  
  return checkCSSConflicts(testClasses, componentType);
} 