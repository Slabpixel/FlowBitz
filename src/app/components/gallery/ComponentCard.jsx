import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useWebflowBits } from '../../hooks/useWebflowBits'

const REPLAY_INTERVAL = 3000 // ms between animation replays

const ComponentCard = ({ id, name, category, isNew, exampleCode, hoverPreview, onClick, index }) => {
  const [reloadKey, setReloadKey] = useState(0)
  const intervalRef = useRef(null)
  const { reinitializeComponents } = useWebflowBits()

  // Start continuous animation replay on hover
  const handleMouseEnter = useCallback(() => {
    if (!hoverPreview) return

    // Trigger initial reload
    setReloadKey(prev => prev + 1)
    setTimeout(() => reinitializeComponents(), 100)

    // Set interval for continuous replay
    intervalRef.current = setInterval(() => {
      setReloadKey(prev => prev + 1)
      setTimeout(() => reinitializeComponents(), 100)
    }, REPLAY_INTERVAL)
  }, [hoverPreview, reinitializeComponents])

  // Stop replay on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Force immediate animation by disabling scroll trigger
  const processedCode = useMemo(() => {
    if (!exampleCode) return ''

    let code = exampleCode

    if (code.includes('wb-trigger-on-view')) {
      code = code.replace(/wb-trigger-on-view="[^"]*"/g, 'wb-trigger-on-view="false"')
    } else {
      code = code.replace(/wb-component="([^"]*)"/, 'wb-component="$1" wb-trigger-on-view="false"')
    }

    return code
  }, [exampleCode])

  return (
    <div 
      className={`group transition-all duration-300 hover:z-10 border border-foreground/10 hover:border-foreground/30 p-4`}
      style={{
        // Stagger animation delay based on index
        animationDelay: `${index * 50}ms`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Preview Area - Live FlowBitz Component */}
      <div className="h-[230px] md:h-[270px] bg-base-medium flex items-center justify-center overflow-hidden">
        <div 
          key={reloadKey}
          className="w-full h-full flex items-center justify-center p-4 scale-75 text-center [&_*]:font-medium [&_.lg\:text-6xl]:!text-4xl [&_.lg\:text-\[160px\]]:!text-5xl [&_.text-3xl]:!text-2xl"
          dangerouslySetInnerHTML={{ __html: processedCode }}
        />
      </div>

      {/* Metadata Area */}
      <div onClick={onClick} className="bg-transparent cursor-pointer pt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground display-semi-20">{name}</h3>
          {isNew && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary text-white rounded-full">
              NEW
            </span>
          )}
        </div>
        <p className="text-foreground/70 text-xs mt-1">{category}</p>
      </div>
    </div>
  )
}

export default ComponentCard
