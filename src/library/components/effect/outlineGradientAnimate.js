/**
 * Outline Gradient Animate Component
 * Creates an animated rotating gradient border effect using pure CSS
 * Uses CSS @property for smooth angle animation
 */

import { injectStyles } from '../../utils/core/injectStyles.js'
import { parseElementConfig } from '../../utils/core/attributeParser.js'
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js'
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js'

// Component-specific CSS
const componentCSS = `
/* CSS Custom Property for angle animation */
@property --wb-gradient-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}

/* Outline Gradient Animate Base Styles */
.wb-outline-gradient {
  border: var(--wb-border-width, 2px) solid transparent;
}

.wb-outline-gradient::before {
  content: "";
  position: absolute;
  inset: calc(var(--wb-border-width, 2px) * -1);
  z-index: 1;
  border: inherit;
  border-radius: inherit;
  background-image: linear-gradient(
    var(--wb-gradient-angle),
    var(--wb-gradient-colors, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)
  );
  background-origin: border-box;
  -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  -webkit-mask-clip: content-box, border-box;
  mask-clip: content-box, border-box;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: wb-outline-gradient-spin var(--wb-animation-speed, 8s) linear infinite;
  pointer-events: none;
}

/* Hover acceleration */
.wb-outline-gradient--hover-accelerate:hover::before {
  animation-duration: var(--wb-hover-speed, 2s);
}

/* Paused state */
.wb-outline-gradient--paused::before {
  animation-play-state: paused;
}

/* Disabled state */
.wb-outline-gradient--disabled::before {
  animation: none;
  opacity: 0.5;
}

/* Keyframes for angle rotation */
@keyframes wb-outline-gradient-spin {
  to {
    --wb-gradient-angle: 1turn;
  }
}

/* Fallback for browsers without @property support */
@supports not (background: paint(something)) {
  @supports not (--custom: property) {
    .wb-outline-gradient::before {
      background-image: conic-gradient(
        from 0deg,
        var(--wb-gradient-colors, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)
      );
      animation: wb-outline-gradient-spin-fallback var(--wb-animation-speed, 8s) linear infinite;
    }
    
    @keyframes wb-outline-gradient-spin-fallback {
      to {
        transform: rotate(360deg);
      }
    }
  }
}
`

/**
 * OutlineGradientAnimator Class
 * Handles rotating gradient border animation creation and management
 */
class OutlineGradientAnimator {
  constructor() {
    this.instances = new Map()
    this.stylesInjected = false
    this.componentName = 'OutlineGradientAnimate'
    this.componentClasses = webflowBitsClasses.forComponent('outline-gradient')
    this.defaultConfig = {
      speed: 8, // Animation duration in seconds
      hoverAccelerate: true, // Accelerate on hover
      hoverSpeedPercentage: 20, // Speed up to 20% (80% faster)
      colors: '#833AB4 0%, #FD1D1D 50%, #FCB045 100%', // Gradient color stops
      borderWidth: 2, // Border width in pixels
      paused: false, // Start paused
      disabled: false
    }
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return
    
    try {
      injectStyles('wb-outline-gradient-styles', componentCSS)
      this.stylesInjected = true
    } catch (error) {
      console.error('Failed to inject OutlineGradient styles:', error)
    }
  }

  /**
   * Ensure styles are injected when needed
   */
  ensureStylesInjected() {
    if (!this.stylesInjected) {
      this.injectComponentStyles()
    }
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = {
      speed: { attribute: 'wb-speed', type: 'number' },
      hoverAccelerate: { attribute: 'wb-hover-accelerate', type: 'boolean' },
      hoverSpeedPercentage: { attribute: 'wb-hover-speed-percentage', type: 'number' },
      colors: { attribute: 'wb-colors', type: 'string' },
      borderWidth: { attribute: 'wb-border-width', type: 'number' },
      paused: { attribute: 'wb-paused', type: 'boolean' },
      disabled: { attribute: 'wb-disabled', type: 'boolean' }
    }
    
    return parseElementConfig(element, this.defaultConfig, attributeMap)
  }

  /**
   * Parse gradient colors string to CSS format
   * Supports multiple formats:
   * - "red, blue, green" -> "red 0%, blue 50%, green 100%"
   * - "#833AB4, #FD1D1D, #FCB045" -> "#833AB4 0%, #FD1D1D 50%, #FCB045 100%"
   * - "#833AB4 0%, #FD1D1D 50%, #FCB045 100%" -> unchanged
   */
  parseGradientColors(colorsString) {
    // If already has percentages, return as is
    if (colorsString.includes('%')) {
      return colorsString
    }
    
    // Split by comma and trim
    const colors = colorsString.split(',').map(c => c.trim()).filter(c => c)
    
    // If no colors, return default
    if (colors.length === 0) {
      return this.defaultConfig.colors
    }
    
    // If only one color, duplicate it
    if (colors.length === 1) {
      return `${colors[0]} 0%, ${colors[0]} 100%`
    }
    
    // Distribute colors evenly
    const step = 100 / (colors.length - 1)
    return colors.map((color, index) => {
      const percentage = Math.round(index * step)
      return `${color} ${percentage}%`
    }).join(', ')
  }

  /**
   * Apply component classes
   */
  applyComponentClasses(element, config) {
    // Apply base class
    element.classList.add(this.componentClasses.parent)
    
    // Apply conditional classes
    if (config.hoverAccelerate) {
      element.classList.add(`${this.componentClasses.parent}--hover-accelerate`)
    }
    
    if (config.paused) {
      element.classList.add(`${this.componentClasses.parent}--paused`)
    }
    
    if (config.disabled) {
      element.classList.add(`${this.componentClasses.parent}--disabled`)
    }
  }

  /**
   * Remove component classes
   */
  removeComponentClasses(element) {
    // Remove base class
    element.classList.remove(this.componentClasses.parent)
    
    // Remove all variant classes
    element.classList.remove(`${this.componentClasses.parent}--hover-accelerate`)
    element.classList.remove(`${this.componentClasses.parent}--paused`)
    element.classList.remove(`${this.componentClasses.parent}--disabled`)
  }

  /**
   * Setup gradient animation CSS variables
   */
  setupAnimation(element, config) {
    // Parse and set gradient colors
    const gradientColors = this.parseGradientColors(config.colors)
    element.style.setProperty('--wb-gradient-colors', gradientColors)
    
    // Set animation speed
    element.style.setProperty('--wb-animation-speed', `${config.speed}s`)
    
    // Calculate hover speed (percentage of original speed)
    if (config.hoverAccelerate) {
      const hoverSpeed = config.speed * (config.hoverSpeedPercentage / 100)
      element.style.setProperty('--wb-hover-speed', `${hoverSpeed}s`)
    }
    
    // Set border width
    element.style.setProperty('--wb-border-width', `${config.borderWidth}px`)
  }

  /**
   * Initialize gradient animation for a single element
   */
  initElement(element) {
    if (this.instances.has(element)) return
    
    this.ensureStylesInjected()
    
    const config = this.parseConfig(element)
    
    // Apply component classes
    this.applyComponentClasses(element, config)
    
    // Setup animation
    this.setupAnimation(element, config)
    
    // Store instance
    const instance = {
      element,
      config,
      domStructure: {
        originalBorderStyle: element.style.border,
        originalPosition: element.style.position
      }
    }
    
    this.instances.set(element, instance)
    
    // Dispatch initialization event
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'init', 
      'outline-gradient',
      { instance }
    )
  }

  /**
   * Update element configuration
   */
  updateElement(element, newConfig) {
    const instance = this.instances.get(element)
    if (!instance) return
    
    const updatedConfig = { ...instance.config, ...newConfig }
    instance.config = updatedConfig
    
    // Update classes
    this.removeComponentClasses(element)
    this.applyComponentClasses(element, updatedConfig)
    
    // Update animation
    this.setupAnimation(element, updatedConfig)
    
    // Dispatch update event
    AnimationStateManager.dispatchEvent(
      element,
      'wb-outline-gradient-update',
      { instance, newConfig }
    )
  }

  /**
   * Pause animation for specific element
   */
  pauseElement(element) {
    this.updateElement(element, { paused: true })
  }

  /**
   * Resume animation for specific element
   */
  resumeElement(element) {
    this.updateElement(element, { paused: false })
  }

  /**
   * Enable gradient effect for specific element
   */
  enableElement(element) {
    this.updateElement(element, { disabled: false })
  }

  /**
   * Disable gradient effect for specific element
   */
  disableElement(element) {
    this.updateElement(element, { disabled: true })
  }

  /**
   * Change animation speed for specific element
   */
  setSpeed(element, speed) {
    this.updateElement(element, { speed })
  }

  /**
   * Change gradient colors for specific element
   */
  setColors(element, colors) {
    this.updateElement(element, { colors })
  }

  /**
   * Change border width for specific element
   */
  setBorderWidth(element, borderWidth) {
    this.updateElement(element, { borderWidth })
  }

  /**
   * Toggle hover acceleration for specific element
   */
  toggleHoverAccelerate(element, hoverAccelerate = null) {
    const instance = this.instances.get(element)
    if (!instance) return
    
    const newHoverAccelerate = hoverAccelerate !== null ? hoverAccelerate : !instance.config.hoverAccelerate
    this.updateElement(element, { hoverAccelerate: newHoverAccelerate })
  }

  /**
   * Destroy specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element)
    if (!instance) return
    
    // Remove component classes
    this.removeComponentClasses(element)
    
    // Remove CSS variables
    element.style.removeProperty('--wb-gradient-colors')
    element.style.removeProperty('--wb-animation-speed')
    element.style.removeProperty('--wb-hover-speed')
    element.style.removeProperty('--wb-border-width')
    element.style.removeProperty('--wb-gradient-angle')
    
    // Restore original styles if they were modified
    if (instance.domStructure) {
      if (instance.domStructure.originalBorderStyle) {
        element.style.border = instance.domStructure.originalBorderStyle
      }
      if (instance.domStructure.originalPosition && 
          instance.domStructure.originalPosition !== 'relative') {
        element.style.position = instance.domStructure.originalPosition
      }
    }
    
    // Dispatch destroy event
    AnimationStateManager.dispatchLifecycleEvent(
      element, 
      'destroy', 
      'outline-gradient',
      { instance }
    )
    
    // Remove from instances
    this.instances.delete(element)
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    for (const element of this.instances.keys()) {
      this.destroyElement(element)
    }
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element)
  }

  /**
   * Get all instances
   */
  getAllInstances() {
    return Array.from(this.instances.values())
  }

  /**
   * Refresh (no-op for CSS animations, but required for consistency)
   */
  refresh() {
    // CSS animations don't need refresh like GSAP
    return this
  }

  /**
   * Initialize all elements with wb-component="outline-gradient-animate"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-component="outline-gradient-animate"]')
    elements.forEach(element => this.initElement(element))
  }

  /**
   * Check for CSS conflicts (optional but recommended)
   */
  checkForConflicts() {
    // Could implement conflict detection if needed
    return []
  }
}

// Create and export singleton instance
const outlineGradientAnimator = new OutlineGradientAnimator()

// Auto-initialize components with wb-component="outline-gradient-animate"
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      outlineGradientAnimator.initAll()
    })
  } else {
    // DOM already loaded, initialize immediately
    outlineGradientAnimator.initAll()
  }
}

export default outlineGradientAnimator

