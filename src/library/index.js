/**
 * WebflowBits Library - Main Entry Point
 * This is the main entry point for the WebflowBits animation library
 */

// Export the main WebflowBits class
export { default as WebflowBits } from './core/WebflowBits.js'

// Export the component registry
export { ComponentRegistry, componentRegistry } from './core/ComponentRegistry.js'

// Export all components
export { default as SplitText } from './components/text/splitText.js'
export { default as BlurText } from './components/text/blurText.js'
export { default as GradientText } from './components/text/gradientText.js'
export { default as TextType } from './components/text/textType.js'
export { default as ShinyText } from './components/text/shinyText.js'
export { default as CountUp } from './components/text/countUp.js'
export { default as DecryptedText } from './components/text/decryptedText.js'
export { default as ScrambleText } from './components/text/scrambleText.js'
export { default as VariableProximity } from './components/text/variableProximity.js'
export { default as RotatingText } from './components/text/rotatingText.js'
export { default as TextPressure } from './components/text/textPressure.js'
export { default as Shuffle } from './components/text/shuffle.js'
export { default as TooltipText } from './components/text/tooltipText.js'
export { default as RollText } from './components/text/rollText.js'
export { default as ShimmerButton } from './components/button/shimmerButton.js'
export { default as GradientButton } from './components/button/gradientButton.js'
export { default as RippleButton } from './components/button/rippleButton.js'
export { default as PulseButton } from './components/button/pulseButton.js'
export { default as MagneticButton } from './components/button/magneticButton.js'
export { default as SmartAnimate } from './components/effect/smartAnimate.js'
export { default as CardHover3D } from './components/effect/3dCardHover.js'
export { default as OutlineGradientAnimate } from './components/effect/outlineGradientAnimate.js'
export { default as ImageTrail } from './components/effect/imageTrail.js'
export { default as HoverZoom } from './components/effect/hoverZoom.js'

// Export utilities
export { ComponentClassManager, webflowBitsClasses } from './utils/core/classManager.js'
export { checkCSSConflicts, analyzeConflicts } from './utils/core/conflictDetector.js'
export { parseElementConfig, commonAttributeMaps } from './utils/core/attributeParser.js'
export { injectStyles } from './utils/core/injectStyles.js'
export { AnimationStateManager, PerformanceOptimizer } from './utils/animation/animationStateManager.js'
export { createOnceAnimationConfig, calculateScrollTriggerStart } from './utils/animation/scrollTriggerHelper.js'

// Export metadata and registry
export { componentsMetadata, getComponentsByCategory, getComponent, getAllComponentKeys } from './data/componentsMetadata.js'
export { loadComponent, getAvailableComponents, componentExists, getComponentFileName } from './data/componentsRegistry.js'

// Export component helpers
export { getComponentStats, validateComponentMetadata, generateComponentKey, generateFileName, getComponentTemplate, componentExists as helperComponentExists, getAllComponentNames, searchComponents } from './utils/validation/componentHelper.js'

// Default export
import WebflowBits from './core/WebflowBits.js'
export default WebflowBits
