/**
 * WebflowBits Component Registry
 * Manages component registration and dynamic loading
 */

import { loadComponent } from '../data/ComponentsRegistry.js'

/**
 * Component Registry Class
 * Handles registration and management of WebflowBits components
 */
export class ComponentRegistry {
  constructor() {
    this.components = new Map()
    this.initialized = new Set()
  }

  /**
   * Register a component
   * @param {string} name - Component name
   * @param {Object} component - Component instance
   */
  register(name, component) {
    this.components.set(name, component)
  }

  /**
   * Get a registered component
   * @param {string} name - Component name
   * @returns {Object|null} Component instance or null
   */
  get(name) {
    return this.components.get(name) || null
  }

  /**
   * Check if component is registered
   * @param {string} name - Component name
   * @returns {boolean} True if registered
   */
  has(name) {
    return this.components.has(name)
  }

  /**
   * Load and register a component dynamically
   * @param {string} name - Component name
   * @returns {Promise<Object|null>} Loaded component or null
   */
  async loadComponent(name) {
    if (this.has(name)) {
      return this.get(name)
    }

    try {
      const component = await loadComponent(name)
      if (component) {
        this.register(name, component)
      }
      return component
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error)
      return null
    }
  }

  /**
   * Get all registered component names
   * @returns {string[]} Array of component names
   */
  getRegisteredComponents() {
    return Array.from(this.components.keys())
  }

  /**
   * Mark component as initialized
   * @param {string} name - Component name
   */
  markInitialized(name) {
    this.initialized.add(name)
  }

  /**
   * Check if component is initialized
   * @param {string} name - Component name
   * @returns {boolean} True if initialized
   */
  isInitialized(name) {
    return this.initialized.has(name)
  }

  /**
   * Clear all registrations
   */
  clear() {
    this.components.clear()
    this.initialized.clear()
  }
}

// Create singleton instance
export const componentRegistry = new ComponentRegistry()
