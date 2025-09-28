/**
 * Smart Animate Component
 * Animates the selected element and its direct children with smooth transitions
 */

import { gsap } from 'gsap'

class SmartAnimate {
  constructor(element, options = {}) {
    this.element = element
    this.options = {
      direction: 'bottom', // bottom, top, left, right
      intervalDelay: 0.1, // delay between each child animation
      duration: 0.6,
      ease: 'power3.out',
      ...options
    }
    
    this.init()
  }

  init() {
    this.setupInitialState()
    this.animate()
  }

  setupInitialState() {
    // Get all direct children (not grandchildren)
    this.children = Array.from(this.element.children)
    
    // Set initial state for all elements
    const initialProps = this.getInitialProps()
    
    // Animate the parent element first
    gsap.set(this.element, initialProps)
    
    // Then animate all direct children
    this.children.forEach(child => {
      gsap.set(child, initialProps)
    })
  }

  getInitialProps() {
    const { direction } = this.options
    
    switch (direction) {
      case 'bottom':
        return {
          y: 30,
          opacity: 0
        }
      case 'top':
        return {
          y: -30,
          opacity: 0
        }
      case 'left':
        return {
          x: -30,
          opacity: 0
        }
      case 'right':
        return {
          x: 30,
          opacity: 0
        }
      default:
        return {
          y: 30,
          opacity: 0
        }
    }
  }

  getAnimationProps() {
    const { direction } = this.options
    
    switch (direction) {
      case 'bottom':
        return { y: 0, opacity: 1 }
      case 'top':
        return { y: 0, opacity: 1 }
      case 'left':
        return { x: 0, opacity: 1 }
      case 'right':
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  animate() {
    const { duration, ease, intervalDelay } = this.options
    const animationProps = this.getAnimationProps()
    
    // Create timeline for staggered animation
    const tl = gsap.timeline()
    
    // Animate parent element first
    tl.to(this.element, {
      ...animationProps,
      duration,
      ease
    })
    
    // Animate children with stagger
    if (this.children.length > 0) {
      tl.to(this.children, {
        ...animationProps,
        duration,
        ease,
        stagger: intervalDelay
      }, `-=${duration * 0.5}`) // Start children animation slightly before parent finishes
    }
  }

  // Method to re-trigger animation
  restart() {
    this.setupInitialState()
    this.animate()
  }

  // Method to destroy the component
  destroy() {
    gsap.killTweensOf([this.element, ...this.children])
  }
}

/**
 * SmartAnimate Animator Class
 * Manages SmartAnimate component initialization and lifecycle
 */
class SmartAnimateAnimator {
  constructor() {
    this.componentName = 'smart-animate'
    this.instances = new Map()
  }

  /**
   * Initialize SmartAnimate on a specific element
   * @param {HTMLElement} element - The element to initialize
   */
  initElement(element) {
    if (this.instances.has(element)) {
      return this.instances.get(element)
    }

    const options = {
      direction: element.getAttribute('wb-direction') || 'bottom',
      intervalDelay: parseFloat(element.getAttribute('wb-interval-delay')) || 0.1,
      duration: parseFloat(element.getAttribute('wb-duration')) || 0.6,
      ease: element.getAttribute('wb-ease') || 'power3.out'
    }

    const instance = new SmartAnimate(element, options)
    this.instances.set(element, instance)
    return instance
  }

  /**
   * Refresh all SmartAnimate instances
   */
  refresh() {
    // SmartAnimate doesn't need refresh like ScrollTrigger components
    return this
  }

  /**
   * Destroy all instances
   */
  destroy() {
    this.instances.forEach(instance => {
      if (instance.destroy) {
        instance.destroy()
      }
    })
    this.instances.clear()
  }
}

// Create singleton instance
const smartAnimateAnimator = new SmartAnimateAnimator()

// Auto-initialize components with wb-component="smart-animate"
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[wb-component="smart-animate"]')
  elements.forEach(element => {
    smartAnimateAnimator.initElement(element)
  })
})

export default smartAnimateAnimator
export { SmartAnimate, SmartAnimateAnimator }
