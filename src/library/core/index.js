/**
 * WebflowBits Library Entry Point
 * Main entry point for the WebflowBits animation library
 */

export { default as WebflowBits } from './WebflowBits.js'
export { ComponentRegistry } from './ComponentRegistry.js'

// Re-export commonly used utilities
export { ComponentClassManager, webflowBitsClasses } from '../utils/core/classManager.js'
export { checkCSSConflicts, analyzeConflicts } from '../utils/core/conflictDetector.js'
export { parseElementConfig, commonAttributeMaps } from '../utils/core/attributeParser.js'

// Re-export component metadata
export { componentsMetadata, getComponentsByCategory } from '../data/ComponentsMetadata.js'
export { loadComponent, getAvailableComponents } from '../data/ComponentsRegistry.js'

// Default export for CDN usage
import WebflowBits from './WebflowBits.js'
export default WebflowBits
