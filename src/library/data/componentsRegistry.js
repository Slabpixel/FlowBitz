/**
 * Components Registry
 * Dynamic loading system for FlowBitz components
 */

import { getAllComponentKeys } from './componentsMetadata.js'

/**
 * Load a component dynamically
 * @param {string} componentName - The component name (e.g., 'split-text')
 * @returns {Promise<Object|null>} The loaded component or null if failed
 */
export const loadComponent = async (componentName) => {
  try {
    // Map component name to file name
    const componentMap = {
      'split-text': 'splitText',
      'gradient-text': 'gradientText',
      'text-type': 'textType',
      'blur-text': 'blurText',
      'shiny-text': 'shinyText',
      'count-up': 'countUp',
      'decrypted-text': 'decryptedText',
      'scramble-text': 'scrambleText',
      'variable-proximity': 'variableProximity',
      'rotating-text': 'rotatingText',
      'text-pressure': 'textPressure',
      'text-cursor': 'textCursor',
      'shape-blur': 'shapeBlur',
      'image-trail': 'imageTrail',
      'magnet-lines': 'magnetLines',
      'shuffle': 'shuffle'
    }

    const fileName = componentMap[componentName]
    if (!fileName) {
      throw new Error(`Component ${componentName} not found in component map`)
    }

    const component = await import(`../components/${fileName}.js`)
    return component.default || component
  } catch (error) {
    console.error(`Failed to load component ${componentName}:`, error)
    return null
  }
}

/**
 * Get all available component names
 * @returns {string[]} Array of component names
 */
export const getAvailableComponents = () => {
  return getAllComponentKeys()
}

/**
 * Check if a component exists
 * @param {string} componentName - The component name to check
 * @returns {boolean} True if component exists
 */
export const componentExists = (componentName) => {
  return getAvailableComponents().includes(componentName)
}

/**
 * Get component file name from component name
 * @param {string} componentName - The component name
 * @returns {string|null} The file name or null if not found
 */
export const getComponentFileName = (componentName) => {
  const componentMap = {
    'split-text': 'splitText',
    'gradient-text': 'gradientText',
    'text-type': 'textType',
    'blur-text': 'blurText',
    'shiny-text': 'shinyText',
    'count-up': 'countUp',
    'decrypted-text': 'decryptedText',
    'scramble-text': 'scrambleText',
    'variable-proximity': 'variableProximity',
    'rotating-text': 'rotatingText',
    'text-pressure': 'textPressure',
    'text-cursor': 'textCursor',
    'shape-blur': 'shapeBlur',
    'image-trail': 'imageTrail',
    'magnet-lines': 'magnetLines',
    'shuffle': 'shuffle'
  }

  return componentMap[componentName] || null
}
