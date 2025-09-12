import { useEffect, useCallback } from 'react'
import webflowBits from '../../library/core/WebflowBits.js'

export const useWebflowBits = () => {
  const initializeWebflowBits = useCallback(() => {
    try {
      // Check if already initialized to avoid duplicate initialization
      if (!webflowBits.initialized) {
        // Initialize WebflowBits with debug mode for development
        webflowBits.init({
          debug: true,
          autoInit: true
        })
      }
    } catch (error) {
      console.error('Failed to initialize WebflowBits:', error)
    }
  }, [])

  const reinitializeComponents = useCallback(() => {
    try {
      // Refresh components when content changes
      webflowBits.refresh()
    } catch (error) {
      console.error('Failed to refresh WebflowBits:', error)
    }
  }, [])

  useEffect(() => {
    // Initialize on mount only if not already initialized
    initializeWebflowBits()

    // Cleanup function
    return () => {
      // Cleanup if needed
    }
  }, [initializeWebflowBits])

  return {
    initializeWebflowBits,
    reinitializeComponents
  }
}
