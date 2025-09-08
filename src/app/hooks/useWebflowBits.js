import { useEffect, useCallback } from 'react'
import webflowBits from '../../library/core/WebflowBits.js'

export const useWebflowBits = () => {
  const initializeWebflowBits = useCallback(() => {
    try {
      // Initialize WebflowBits with debug mode for development
      webflowBits.init({
        debug: true,
        autoInit: true
      })
    } catch (error) {
      console.error('Failed to initialize WebflowBits:', error)
    }
  }, [])

  const reinitializeComponents = useCallback(() => {
    try {
      // Reinitialize components when content changes
      webflowBits.init({
        debug: false,
        autoInit: true
      })
    } catch (error) {
      console.error('Failed to reinitialize WebflowBits:', error)
    }
  }, [])

  useEffect(() => {
    // Initialize on mount
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
