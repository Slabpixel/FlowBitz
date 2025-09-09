/**
 * Component Helper Utilities
 * Utilities to help manage and add new components
 */

import { componentsMetadata } from '../../data/componentsMetadata.js'

/**
 * Get component statistics
 */
export const getComponentStats = () => {
  const totalComponents = Object.keys(componentsMetadata).length
  const textComponents = Object.values(componentsMetadata).filter(c => c.category === 'text').length
  const interactiveComponents = Object.values(componentsMetadata).filter(c => c.category === 'interactive').length
  
  return {
    total: totalComponents,
    text: textComponents,
    interactive: interactiveComponents
  }
}

/**
 * Validate component metadata
 * @param {Object} component - Component metadata to validate
 * @returns {Object} Validation result
 */
export const validateComponentMetadata = (component) => {
  const errors = []
  const warnings = []

  // Required fields
  if (!component.name) errors.push('Component name is required')
  if (!component.description) errors.push('Component description is required')
  if (!component.category) errors.push('Component category is required')
  if (!component.file) errors.push('Component file is required')

  // Category validation
  if (component.category && !['text', 'interactive'].includes(component.category)) {
    errors.push('Category must be either "text" or "interactive"')
  }

  // Attributes validation
  if (component.attributes && Array.isArray(component.attributes)) {
    component.attributes.forEach((attr, index) => {
      if (!attr.name) errors.push(`Attribute ${index + 1}: name is required`)
      if (!attr.description) warnings.push(`Attribute ${index + 1}: description is recommended`)
    })
  }

  // Examples validation
  if (component.examples && Array.isArray(component.examples)) {
    component.examples.forEach((example, index) => {
      if (!example.title) errors.push(`Example ${index + 1}: title is required`)
      if (!example.code) errors.push(`Example ${index + 1}: code is required`)
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Generate component key from name
 * @param {string} name - Component name
 * @returns {string} Component key
 */
export const generateComponentKey = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

/**
 * Generate file name from component name
 * @param {string} name - Component name
 * @returns {string} File name
 */
export const generateFileName = (name) => {
  return name.replace(/\s+/g, '').replace(/([A-Z])/g, (match, letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter
  })
}

/**
 * Get component template for new components
 * @param {string} name - Component name
 * @param {string} category - Component category
 * @returns {Object} Component template
 */
export const getComponentTemplate = (name, category = 'text') => {
  const key = generateComponentKey(name)
  const file = generateFileName(name)

  return {
    name,
    description: `Description for ${name}`,
    category,
    file: `${file}.js`,
    attributes: [
      {
        name: 'wb-speed',
        description: 'Animation speed',
        default: '1'
      }
    ],
    examples: [
      {
        title: `Basic ${name}`,
        code: `<h1 wb-text-animate="${key}">Your Text Here</h1>`,
        description: `Basic ${name} effect`
      }
    ]
  }
}

/**
 * Check if component exists
 * @param {string} key - Component key
 * @returns {boolean} True if component exists
 */
export const componentExists = (key) => {
  return key in componentsMetadata
}

/**
 * Get all component names
 * @returns {string[]} Array of component names
 */
export const getAllComponentNames = () => {
  return Object.values(componentsMetadata).map(c => c.name)
}

/**
 * Search components by name or description
 * @param {string} query - Search query
 * @returns {Array} Matching components
 */
export const searchComponents = (query) => {
  const searchTerm = query.toLowerCase()
  
  return Object.entries(componentsMetadata)
    .filter(([key, component]) => 
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm) ||
      key.toLowerCase().includes(searchTerm)
    )
    .map(([key, component]) => ({ key, ...component }))
}
