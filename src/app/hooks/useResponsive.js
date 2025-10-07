import { useState, useEffect } from 'react'

/**
 * Custom hook to detect screen size and provide responsive utilities
 * @param {Object} breakpoints - Custom breakpoints (default: mobile: 768, tablet: 1024)
 * @returns {Object} Responsive state and utilities
 */
export const useResponsive = (breakpoints = { mobile: 768, tablet: 1024 }) => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width <= breakpoints.mobile) return 'mobile'
    if (width <= breakpoints.tablet) return 'tablet'
    return 'desktop'
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= breakpoints.mobile) {
        setScreenSize('mobile')
      } else if (width <= breakpoints.tablet) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoints.mobile, breakpoints.tablet])

  return {
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isMobileOrTablet: screenSize === 'mobile' || screenSize === 'tablet'
  }
}

export default useResponsive
