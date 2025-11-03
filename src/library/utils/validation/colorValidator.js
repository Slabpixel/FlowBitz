/**
 * FlowBitz - Color Validation Utilities
 * Provides comprehensive color format validation and parsing
 */

/**
 * Validate and parse color values
 * Supports: hex, rgb, rgba, hsl, hsla, named colors, currentColor, CSS variables
 * @param {string} color - Color value to validate
 * @returns {Object} Validation result with isValid, normalizedValue, format, and error
 */
export function validateColor(color) {
  if (!color || typeof color !== 'string') {
    return {
      isValid: false,
      normalizedValue: null,
      format: null,
      error: 'Color must be a non-empty string'
    };
  }

  const trimmedColor = color.trim();

  // Check for CSS variables
  if (/^var\(--[\w-]+\)$/.test(trimmedColor)) {
    return {
      isValid: true,
      normalizedValue: trimmedColor,
      format: 'css-variable',
      error: null
    };
  }

  // Check for currentColor
  if (trimmedColor.toLowerCase() === 'currentcolor') {
    return {
      isValid: true,
      normalizedValue: 'currentColor',
      format: 'keyword',
      error: null
    };
  }

  // Check for transparent
  if (trimmedColor.toLowerCase() === 'transparent') {
    return {
      isValid: true,
      normalizedValue: 'transparent',
      format: 'keyword',
      error: null
    };
  }

  // Check for hex colors (3, 4, 6, or 8 digits)
  const hexMatch = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.exec(trimmedColor);
  if (hexMatch) {
    const normalized = trimmedColor.startsWith('#') ? trimmedColor : `#${trimmedColor}`;
    return {
      isValid: true,
      normalizedValue: normalized,
      format: 'hex',
      error: null
    };
  }

  // Check for RGB/RGBA
  const rgbMatch = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/.exec(trimmedColor);
  if (rgbMatch) {
    const [, r, g, b, a] = rgbMatch;
    const rVal = parseInt(r);
    const gVal = parseInt(g);
    const bVal = parseInt(b);
    
    if (rVal > 255 || gVal > 255 || bVal > 255) {
      return {
        isValid: false,
        normalizedValue: null,
        format: 'rgb',
        error: 'RGB values must be between 0-255'
      };
    }

    if (a !== undefined) {
      const aVal = parseFloat(a);
      if (aVal < 0 || aVal > 1) {
        return {
          isValid: false,
          normalizedValue: null,
          format: 'rgba',
          error: 'Alpha value must be between 0-1'
        };
      }
    }

    return {
      isValid: true,
      normalizedValue: trimmedColor,
      format: a !== undefined ? 'rgba' : 'rgb',
      error: null
    };
  }

  // Check for HSL/HSLA
  const hslMatch = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/.exec(trimmedColor);
  if (hslMatch) {
    const [, h, s, l, a] = hslMatch;
    const hVal = parseInt(h);
    const sVal = parseInt(s);
    const lVal = parseInt(l);
    
    if (hVal > 360) {
      return {
        isValid: false,
        normalizedValue: null,
        format: 'hsl',
        error: 'Hue value must be between 0-360'
      };
    }

    if (sVal > 100 || lVal > 100) {
      return {
        isValid: false,
        normalizedValue: null,
        format: 'hsl',
        error: 'Saturation and lightness must be between 0-100'
      };
    }

    if (a !== undefined) {
      const aVal = parseFloat(a);
      if (aVal < 0 || aVal > 1) {
        return {
          isValid: false,
          normalizedValue: null,
          format: 'hsla',
          error: 'Alpha value must be between 0-1'
        };
      }
    }

    return {
      isValid: true,
      normalizedValue: trimmedColor,
      format: a !== undefined ? 'hsla' : 'hsl',
      error: null
    };
  }

  // Check for named colors (CSS color keywords)
  const namedColors = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
    'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
    'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki',
    'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
    'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise',
    'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick',
    'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
    'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo',
    'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue',
    'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen',
    'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray',
    'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta',
    'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
    'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
    'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
    'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
    'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
    'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
    'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver',
    'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
    'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke',
    'yellow', 'yellowgreen'
  ];

  if (namedColors.includes(trimmedColor.toLowerCase())) {
    return {
      isValid: true,
      normalizedValue: trimmedColor.toLowerCase(),
      format: 'named',
      error: null
    };
  }

  // If no match, color is invalid
  return {
    isValid: false,
    normalizedValue: null,
    format: null,
    error: `Invalid color format: "${color}". Supported formats: hex (#FFF, #FFFFFF), rgb/rgba, hsl/hsla, named colors, currentColor, or CSS variables (var(--name))`
  };
}

/**
 * Validate an array of colors (for gradients)
 * @param {string|Array} colors - Color array as string or array
 * @returns {Object} Validation result with isValid, normalizedValue, and errors
 */
export function validateColorArray(colors) {
  let colorArray;

  // Parse string to array if needed
  if (typeof colors === 'string') {
    try {
      if (colors.startsWith('[')) {
        colorArray = JSON.parse(colors);
      } else {
        colorArray = colors.split(',').map(c => c.trim());
      }
    } catch (error) {
      return {
        isValid: false,
        normalizedValue: null,
        errors: ['Invalid color array format. Use JSON array or comma-separated values']
      };
    }
  } else if (Array.isArray(colors)) {
    colorArray = colors;
  } else {
    return {
      isValid: false,
      normalizedValue: null,
      errors: ['Colors must be an array or string']
    };
  }

  // Validate minimum colors
  if (colorArray.length < 2) {
    return {
      isValid: false,
      normalizedValue: null,
      errors: ['At least 2 colors are required for gradient']
    };
  }

  // Validate each color
  const validatedColors = [];
  const errors = [];

  colorArray.forEach((color, index) => {
    const validation = validateColor(color);
    if (validation.isValid) {
      validatedColors.push(validation.normalizedValue);
    } else {
      errors.push(`Color at index ${index}: ${validation.error}`);
    }
  });

  return {
    isValid: errors.length === 0,
    normalizedValue: validatedColors,
    errors: errors.length > 0 ? errors : null
  };
}

/**
 * Quick color validation (returns boolean only)
 * @param {string} color - Color value to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidColor(color) {
  return validateColor(color).isValid;
}

/**
 * Normalize color value (ensure proper format)
 * @param {string} color - Color value to normalize
 * @returns {string|null} Normalized color or null if invalid
 */
export function normalizeColor(color) {
  const validation = validateColor(color);
  return validation.isValid ? validation.normalizedValue : null;
}

/**
 * Get suggested format for invalid color
 * @param {string} color - Invalid color value
 * @returns {string} Suggestion message
 */
export function getColorFormatSuggestion(color) {
  const trimmed = color.trim();
  
  // Check if looks like hex without #
  if (/^[0-9A-Fa-f]{3,8}$/.test(trimmed)) {
    return `Did you mean "#${trimmed}"? (hex colors need # prefix)`;
  }
  
  // Check if looks like rgb but malformed
  if (trimmed.toLowerCase().includes('rgb')) {
    return 'RGB format should be: rgb(255, 255, 255) or rgba(255, 255, 255, 0.5)';
  }
  
  // Check if looks like hsl but malformed
  if (trimmed.toLowerCase().includes('hsl')) {
    return 'HSL format should be: hsl(360, 100%, 50%) or hsla(360, 100%, 50%, 0.5)';
  }
  
  return 'Use valid CSS color format: hex (#FFF), rgb/rgba, hsl/hsla, named color, or CSS variable';
}

