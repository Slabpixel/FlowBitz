/**
 * FlowBitz - Attribute Parser Utilities
 * Provides type-safe attribute parsing and generic configuration building
 */

/**
 * Attribute parsing utilities with type safety
 */
export const parseAttribute = {
  /**
   * Parse string attribute with optional validation
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name to parse
   * @param {string[]|null} validValues - Array of valid values or null for any
   * @returns {string|null} Parsed value or null
   */
  string: (element, attributeName, validValues = null) => {
    const value = element.getAttribute(attributeName);
    if (!value) return null;
    
    if (validValues && !validValues.includes(value)) {
      console.warn(`WebflowBits: Invalid value "${value}" for ${attributeName}. Valid values: ${validValues.join(', ')}`);
      return null;
    }
    
    return value;
  },
  
  /**
   * Parse numeric attribute
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name to parse
   * @param {Function} parser - Parser function (parseInt, parseFloat)
   * @param {number|null} min - Minimum value
   * @param {number|null} max - Maximum value
   * @returns {number|null} Parsed value or null
   */
  number: (element, attributeName, parser = parseFloat, min = null, max = null) => {
    const value = element.getAttribute(attributeName);
    if (!value || isNaN(value)) return null;
    
    const parsed = parser(value);
    
    if (min !== null && parsed < min) {
      console.warn(`WebflowBits: Value ${parsed} for ${attributeName} is below minimum ${min}`);
      return null;
    }
    
    if (max !== null && parsed > max) {
      console.warn(`WebflowBits: Value ${parsed} for ${attributeName} is above maximum ${max}`);
      return null;
    }
    
    return parsed;
  },
  
  /**
   * Parse boolean attribute
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name to parse
   * @returns {boolean|null} Parsed value or null if attribute doesn't exist
   */
  boolean: (element, attributeName) => {
    const value = element.getAttribute(attributeName);
    return value !== null ? value !== 'false' : null;
  },
  
  /**
   * Parse threshold attribute (0-1 range)
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name (defaults to 'wb-threshold')
   * @returns {number|null} Parsed threshold or null
   */
  threshold: (element, attributeName = 'wb-threshold') => {
    const value = parseAttribute.number(element, attributeName, parseFloat, 0, 1);
    return value;
  },
  
  /**
   * Parse duration attribute (seconds)
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name
   * @returns {number|null} Parsed duration or null
   */
  duration: (element, attributeName) => {
    return parseAttribute.number(element, attributeName, parseFloat, 0);
  },
  
  /**
   * Parse delay attribute (milliseconds)
   * @param {Element} element - DOM element
   * @param {string} attributeName - Attribute name
   * @returns {number|null} Parsed delay or null
   */
  delay: (element, attributeName) => {
    return parseAttribute.number(element, attributeName, parseInt, 0);
  }
};

/**
 * Generic configuration parser
 * @param {Element} element - DOM element to parse attributes from
 * @param {Object} defaultConfig - Default configuration object
 * @param {Object} attributeMap - Mapping of config keys to attribute definitions
 * @returns {Object} Parsed configuration
 */
export function parseElementConfig(element, defaultConfig, attributeMap) {
  const config = { ...defaultConfig };
  
  Object.entries(attributeMap).forEach(([configKey, attributeConfig]) => {
    const { attribute, type, validValues, parser, min, max } = attributeConfig;
    let parsedValue = null;
    
    switch (type) {
      case 'string':
        parsedValue = parseAttribute.string(element, attribute, validValues);
        break;
      case 'number':
        parsedValue = parseAttribute.number(element, attribute, parser || parseFloat, min, max);
        break;
      case 'boolean':
        parsedValue = parseAttribute.boolean(element, attribute);
        break;
      case 'threshold':
        parsedValue = parseAttribute.threshold(element, attribute);
        break;
      case 'duration':
        parsedValue = parseAttribute.duration(element, attribute);
        break;
      case 'delay':
        parsedValue = parseAttribute.delay(element, attribute);
        break;
      default:
        console.warn(`WebflowBits: Unknown attribute type "${type}" for ${configKey}`);
    }
    
    if (parsedValue !== null) {
      config[configKey] = parsedValue;
    }
  });
  
  return config;
}

/**
 * Common attribute maps for reuse across components
 */
export const commonAttributeMaps = {
  // Common animation attributes
  animation: {
    ease: { attribute: 'wb-ease', type: 'string' },
    duration: { attribute: 'wb-duration', type: 'duration' },
    threshold: { attribute: 'wb-threshold', type: 'threshold' },
    rootMargin: { attribute: 'wb-root-margin', type: 'string' }
  },
  
  // Common timing attributes
  timing: {
    delay: { attribute: 'wb-delay', type: 'delay' },
    staggerDelay: { attribute: 'wb-stagger-delay', type: 'delay' }
  }
};

/**
 * Merge multiple attribute maps
 * @param {...Object} maps - Attribute maps to merge
 * @returns {Object} Merged attribute map
 */
export function mergeAttributeMaps(...maps) {
  return Object.assign({}, ...maps);
} 