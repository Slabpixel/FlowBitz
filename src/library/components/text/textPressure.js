import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

gsap.registerPlugin();


const componentCSS = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,slnt@8..144,100..1000,-10..0&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,opsz,wght@0,8..60;1,8..60;0,10..300;1,10..300;0,200..900;1,200..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Recursive:wght@300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

/* Compressa VF Font - Variable Font */
@font-face {
  font-family: 'Compressa VF';
  src: url('https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

.wb-text-pressure {
  position: relative;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.wb-text-pressure__title {
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  font-weight: 100;
  width: 100%;
  transform-origin: center top;
  will-change: transform, font-variation-settings;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.wb-text-pressure__char {
  display: inline-block;
  will-change: font-variation-settings, opacity;
  transition: font-variation-settings 0.3s ease-out;
  font-feature-settings: "kern" 1;
  text-rendering: optimizeLegibility;
}

.wb-text-pressure--flex .wb-text-pressure__title {
  display: flex;
  justify-content: space-between;
}

.wb-text-pressure--stroke .wb-text-pressure__char {
  position: relative;
}

.wb-text-pressure--stroke .wb-text-pressure__char::after {
  content: attr(data-char);
  position: absolute;
  left: 0;
  top: 0;
  color: transparent;
  z-index: -1;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--wb-stroke-color, #FF0000);
}

.wb-text-pressure-animating .wb-text-pressure__char {
  will-change: font-variation-settings, opacity;
  backface-visibility: hidden;
}

.wb-text-pressure-completed .wb-text-pressure__char {
  will-change: auto;
  backface-visibility: visible;
}

.wb-text-pressure .wb-text-pressure__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.wb-text-pressure {
  color: currentColor;
}

`;

class TextPressureAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'TextPressure';
    this.componentClasses = webflowBitsClasses.forComponent('text-pressure');
    this.animationFrameId = null;
    this.fontFamilyCache = new Map(); // Cache for font family detection
    this.defaultConfig = {
      text: 'PRESSURE', // Fallback text if no content is found
      fontFamily: 'inherit',
      width: true,
      weight: true,
      italic: true,
      alpha: false,
      flex: true, // Always enable flex for full width spanning
      stroke: false,
      scale: false,
      autoFontSize: true, // Whether to automatically calculate font size
      textColor: 'currentColor', // Use current color for theme compatibility
      strokeColor: '#FF0000',
      minFontSize: 24,
      minFontWeight: 100, // Minimal font weight (thin)
      maxFontWeight: 900, // Maximal font weight (black)
      threshold: 0.1,
      rootMargin: '0px',
      alwaysActive: false,
      debug: false
    };
    
    this.mousePosition = { x: 0, y: 0 };
    this.cursorPosition = { x: 0, y: 0 };
    this.activeInstances = new Set();
    
    // this.injectComponentStyles();
    this.setupGlobalMouseTracking();
  }

  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-text-pressure-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      // Silent fail for production
    }
  }

    /**
   * Ensure styles are injected when needed
   */
    ensureStylesInjected() {
      if (!this.stylesInjected) {
        this.injectComponentStyles();
      }
    }

  setupGlobalMouseTracking() {
    const updateMousePosition = (event) => {
      this.cursorPosition.x = event.clientX;
      this.cursorPosition.y = event.clientY;
    };

    const updateTouchPosition = (event) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        this.cursorPosition.x = touch.clientX;
        this.cursorPosition.y = touch.clientY;
      }
    };

    // Initialize cursor position to center of viewport
    this.cursorPosition.x = window.innerWidth / 2;
    this.cursorPosition.y = window.innerHeight / 2;
    this.mousePosition.x = this.cursorPosition.x;
    this.mousePosition.y = this.cursorPosition.y;

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('touchmove', updateTouchPosition, { passive: true });
  }

  startAnimationLoop() {
    if (this.animationFrameId) return;

    const animate = () => {
      try {
        // Smooth mouse position interpolation
      this.mousePosition.x += (this.cursorPosition.x - this.mousePosition.x) / 15;
      this.mousePosition.y += (this.cursorPosition.y - this.mousePosition.y) / 15;

        // Update all active instances
      this.activeInstances.forEach(instance => {
          if (instance && instance.element && instance.element.isConnected) {
        this.updatePressureEffect(instance);
          }
      });

      this.animationFrameId = requestAnimationFrame(animate);
      } catch (error) {
        console.warn('TextPressure: Animation loop error', error);
        this.stopAnimationLoop();
      }
    };

    animate();
  }

  stopAnimationLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  parseConfig(element) {
    const attributeMap = {
      text: { attribute: 'wb-text', type: 'string' },
      fontFamily: { attribute: 'wb-font-family', type: 'string' },
      width: { attribute: 'wb-width', type: 'boolean' },
      weight: { attribute: 'wb-weight', type: 'boolean' },
      italic: { attribute: 'wb-italic', type: 'boolean' },
      alpha: { attribute: 'wb-alpha', type: 'boolean' },
      flex: { attribute: 'wb-flex', type: 'boolean' },
      stroke: { attribute: 'wb-stroke', type: 'boolean' },
      scale: { attribute: 'wb-scale', type: 'boolean' },
      autoFontSize: { attribute: 'wb-auto-font-size', type: 'boolean' },
      textColor: { attribute: 'wb-text-color', type: 'string' },
      strokeColor: { attribute: 'wb-stroke-color', type: 'string' },
      minFontSize: { attribute: 'wb-min-font-size', type: 'number', min: 8, max: 200 },
      minFontWeight: { attribute: 'wb-min-font-weight', type: 'number', min: 100, max: 500 },
      maxFontWeight: { attribute: 'wb-max-font-weight', type: 'number', min: 500, max: 900 },
      threshold: { attribute: 'wb-threshold', type: 'threshold' },
      rootMargin: { attribute: 'wb-root-margin', type: 'string' },
      alwaysActive: { attribute: 'wb-always-active', type: 'boolean' },
      debug: { attribute: 'wb-debug', type: 'boolean' }
    };

    const config = parseElementConfig(element, this.defaultConfig, attributeMap);
    
    // Use the text content from the HTML element if no wb-text attribute is provided
    if (!element.hasAttribute('wb-text')) {
      config.text = element.textContent.trim() || this.defaultConfig.text;
    }
    
    // Use currentColor for theme compatibility if no wb-text-color attribute is provided
    if (!element.hasAttribute('wb-text-color')) {
      config.textColor = 'currentColor';
    }
    
    return config;
  }

  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent
    ];
    
    // Always apply flex for full width spanning
    classesToApply.push('wb-text-pressure--flex');
    if (config.stroke) classesToApply.push('wb-text-pressure--stroke');
    
    ComponentClassManager.applyClasses(
      element, 
      classesToApply, 
      this.instances, 
      this.componentName
    );
    
    // Only set CSS custom properties if they're explicitly provided via attributes
    if (element.hasAttribute('wb-text-color')) {
      element.style.setProperty('--wb-text-color', config.textColor);
    } else {
      // Remove the custom property if it exists
      element.style.removeProperty('--wb-text-color');
    }
    if (element.hasAttribute('wb-stroke-color')) {
      element.style.setProperty('--wb-stroke-color', config.strokeColor);
    } else {
      // Remove the custom property if it exists
      element.style.removeProperty('--wb-stroke-color');
    }
  }

  removeComponentClasses(element) {
    const fallbackClasses = [
      this.componentClasses.parent,
      'wb-text-pressure--flex',
      'wb-text-pressure--stroke'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  initElement(element) {
    try {
    this.ensureStylesInjected();
    
    if (this.instances.has(element)) {
      return;
    }

      if (!element || !element.nodeType) {
        console.warn('TextPressure: Invalid element provided');
      return;
    }

    const config = this.parseConfig(element);
    const chars = config.text.split('');

      if (chars.length === 0) {
        console.warn('TextPressure: No text content found');
        return;
      }

    const instance = {
      element,
      config,
      chars,
      titleElement: null,
      charSpans: [],
      fontSize: config.minFontSize,
      scaleY: 1,
      lineHeight: 1,
        isActive: false,
        originalFontWeight: 400 // Will be set during initialization
    };

    this.applyComponentClasses(element, config);
    this.createPressureStructure(instance);
    this.setupEventListeners(instance);
    this.instances.set(element, instance);

    // Dispatch initialization event
    AnimationStateManager.dispatchLifecycleEvent(element, 'init', 'text-pressure', {
      config,
      chars: chars.length
    });

    // Auto-activate if alwaysActive is enabled
    if (config.alwaysActive) {
      this.activateInstance(instance);
      }
    } catch (error) {
      console.error('TextPressure: Failed to initialize element', error);
    }
  }

  createPressureStructure(instance) {
    try {
    const { element, config, chars } = instance;

      // Capture original font weight BEFORE replacing innerHTML
      const originalComputedStyle = window.getComputedStyle(element);
      const detectedFontWeight = parseFloat(originalComputedStyle.fontWeight);
      
      // Always use the configured min font weight as the baseline
      instance.originalFontWeight = config.minFontWeight;
      
      // Debug logging
      if (config.debug) {
        console.log('TextPressure Original Font Weight:', {
          elementClass: element.className,
          detectedFontWeight: detectedFontWeight,
          originalFontWeight: instance.originalFontWeight,
          computedFontWeight: originalComputedStyle.fontWeight,
          hasFontWeightClass: !!element.className.match(/\bfont-(thin|light|normal|medium|semibold|bold|extrabold|black)\b/)
        });
        console.log('All computed styles:', {
          fontWeight: originalComputedStyle.fontWeight,
          fontFamily: originalComputedStyle.fontFamily,
          fontSize: originalComputedStyle.fontSize,
          fontStyle: originalComputedStyle.fontStyle,
          letterSpacing: originalComputedStyle.letterSpacing,
          textTransform: originalComputedStyle.textTransform,
          lineHeight: originalComputedStyle.lineHeight
        });
      }

    element.innerHTML = '';

    const titleElement = document.createElement('h1');
    titleElement.className = 'wb-text-pressure__title';
      
    // Only set font family if it's not inherit
    if (config.fontFamily !== 'inherit') {
      titleElement.style.fontFamily = config.fontFamily;
    }
      
    // Don't set color if it's currentColor - let it inherit from parent
    if (config.textColor !== 'currentColor') {
      titleElement.style.color = config.textColor;
    }

    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'wb-text-pressure__char';
      span.textContent = char;
      span.setAttribute('data-char', char);
        
      // Don't set color if it's currentColor - let it inherit from parent
      if (config.stroke) {
        span.style.color = undefined;
      } else if (config.textColor !== 'currentColor') {
        span.style.color = config.textColor;
      }
        
      titleElement.appendChild(span);
      instance.charSpans.push(span);
    });

    element.appendChild(titleElement);
    instance.titleElement = titleElement;

    this.setSize(instance);
    } catch (error) {
      console.error('TextPressure: Failed to create pressure structure', error);
    }
  }

  setSize(instance) {
    const { element, titleElement, config, chars } = instance;
    
    if (!element || !titleElement) return;

    const containerRect = element.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    if (containerWidth === 0 || containerHeight === 0) {
      return;
    }

    // Check if element has existing font size (like text-7xl class)
    const computedStyle = window.getComputedStyle(element);
    const existingFontSize = computedStyle.fontSize;
    
    // Check if element has Tailwind text size classes (including arbitrary values like text-[160px])
    const hasTextSizeClass = element.className.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/) || 
                            element.className.match(/\btext-\[[^\]]+\]/);
    
    // Only calculate font size if autoFontSize is enabled and no existing font size is set or if it's very small
    const existingFontSizeValue = parseFloat(existingFontSize);
    const shouldCalculateFontSize = config.autoFontSize && !hasTextSizeClass && (!existingFontSize || existingFontSizeValue < 20);
    
    // Debug logging (can be removed in production)
    if (config.debug) {
      console.log('TextPressure Font Size Debug:', {
        elementClass: element.className,
        hasTextSizeClass: !!hasTextSizeClass,
        existingFontSize: existingFontSize,
        existingFontSizeValue: existingFontSizeValue,
        shouldCalculateFontSize: shouldCalculateFontSize,
        autoFontSize: config.autoFontSize,
        originalFontWeight: instance.originalFontWeight
      });
      console.log('Tailwind class detection:', {
        standardClasses: element.className.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/),
        arbitraryClasses: element.className.match(/\btext-\[[^\]]+\]/),
        hasTextSizeClass: hasTextSizeClass
      });
    }

    if (shouldCalculateFontSize) {
      // Calculate font size to span full width
      // This ensures the first character is on the left and last character is on the right
      let newFontSize = Math.min(containerWidth / (chars.length * 0.6), containerHeight * 0.8);
      newFontSize = Math.max(newFontSize, config.minFontSize);

      instance.fontSize = newFontSize;
      titleElement.style.fontSize = `${newFontSize}px`;
      
      // Apply initial font variation settings with min font weight
      const fontFamily = this.getDetectedFontFamily(titleElement, config);
      titleElement.style.fontVariationSettings = this.getFontVariationSettings(fontFamily, config.minFontWeight, 100, 0);
    } else {
      // Use existing font size from CSS classes (including Tailwind classes)
      if (existingFontSizeValue > 0) {
        instance.fontSize = existingFontSizeValue;
        titleElement.style.fontSize = existingFontSize;
        
        // Also copy other text-related styles from the parent element
        const parentComputedStyle = window.getComputedStyle(element);
        titleElement.style.fontWeight = config.minFontWeight; // Use min font weight instead of parent's weight
        titleElement.style.fontStyle = parentComputedStyle.fontStyle;
        titleElement.style.letterSpacing = parentComputedStyle.letterSpacing;
        titleElement.style.textTransform = parentComputedStyle.textTransform;
        
        // If Tailwind text size class is detected, also copy the line height
        if (hasTextSizeClass) {
          titleElement.style.lineHeight = parentComputedStyle.lineHeight;
        }
        
        // Apply initial font variation settings with min font weight
        const fontFamily = this.getDetectedFontFamily(titleElement, config);
        titleElement.style.fontVariationSettings = this.getFontVariationSettings(fontFamily, config.minFontWeight, 100, 0);
      } else {
        // Fallback to minFontSize if no valid font size found
        instance.fontSize = config.minFontSize;
        titleElement.style.fontSize = `${config.minFontSize}px`;
        
        // Apply initial font variation settings with min font weight
        const fontFamily = this.getDetectedFontFamily(titleElement, config);
        titleElement.style.fontVariationSettings = this.getFontVariationSettings(fontFamily, config.minFontWeight, 100, 0);
      }
    }

    instance.scaleY = 1;
    instance.lineHeight = 1;

    // Only set line height if we didn't copy it from parent
    if (!hasTextSizeClass) {
    titleElement.style.lineHeight = instance.lineHeight;
    }
    
    titleElement.style.transform = `scale(1, ${instance.scaleY})`;

    // Fine-tune to ensure text spans full width (only if we calculated the font size)
    if (shouldCalculateFontSize) {
      requestAnimationFrame(() => {
        if (!titleElement) return;
        const textRect = titleElement.getBoundingClientRect();

        if (textRect.width > 0 && textRect.width < containerWidth * 0.95) {
          // If text is too narrow, increase font size
          const scaleFactor = (containerWidth * 0.95) / textRect.width;
          let newFontSize = instance.fontSize * scaleFactor;
          newFontSize = Math.min(newFontSize, containerHeight * 0.9);
          
          titleElement.style.fontSize = `${newFontSize}px`;
          instance.fontSize = newFontSize;
        }

        if (config.scale && textRect.height > 0) {
          const yRatio = containerHeight / textRect.height;
          instance.scaleY = yRatio;
          instance.lineHeight = yRatio;
          titleElement.style.transform = `scale(1, ${yRatio})`;
        }
      });
    }
  }

  setupEventListeners(instance) {
    const { element } = instance;

    const handlePointerEnter = () => this.activateInstance(instance);
    const handlePointerLeave = () => this.deactivateInstance(instance);
    const handleResize = () => this.setSize(instance);

    element.addEventListener('pointerenter', handlePointerEnter);
    element.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.setSize(instance);
      });
      resizeObserver.observe(element);
      instance.resizeObserver = resizeObserver;
    }

    instance.eventListeners = {
      pointerenter: handlePointerEnter,
      pointerleave: handlePointerLeave,
      resize: handleResize
    };
  }

  activateInstance(instance) {
    if (instance.isActive) return;

    instance.isActive = true;
    this.activeInstances.add(instance);

    if (this.activeInstances.size === 1) {
      this.startAnimationLoop();
    }

    // Set animating state
    AnimationStateManager.setAnimatingState(instance.element, 'wb-text-pressure');
    AnimationStateManager.dispatchLifecycleEvent(instance.element, 'start', 'text-pressure', {
      config: instance.config
    });
  }

  deactivateInstance(instance) {
    if (!instance.isActive) return;

    instance.isActive = false;
    this.activeInstances.delete(instance);

    if (this.activeInstances.size === 0) {
      this.stopAnimationLoop();
    }

    instance.charSpans.forEach(span => {
      span.style.opacity = '1';
      
      // Reset font variations based on detected font family, using stored original font weight
      const fontFamily = this.getDetectedFontFamily(span, instance.config);
      
      // Debug logging
      if (instance.config.debug) {
        console.log('TextPressure Deactivation:', {
          originalFontWeight: instance.originalFontWeight,
          fontFamily: fontFamily,
          fontVariationSettings: this.getFontVariationSettings(fontFamily, instance.config.minFontWeight, 100, 0)
        });
        console.log('Font Weight Range:', {
          minFontWeight: instance.config.minFontWeight,
          maxFontWeight: instance.config.maxFontWeight
        });
      }
      
      // Reset to min font weight (baseline state) with smooth transition
      // The CSS transition will handle the smooth animation
      span.style.fontVariationSettings = this.getFontVariationSettings(fontFamily, instance.config.minFontWeight, 100, 0);
    });

    // Set completed state
    AnimationStateManager.setCompletedState(instance.element, 'wb-text-pressure');
    AnimationStateManager.dispatchLifecycleEvent(instance.element, 'stop', 'text-pressure', {
      config: instance.config
    });
  }

  getDetectedFontFamily(span, config) {
    // Use cache if available
    if (this.fontFamilyCache.has(span)) {
      return this.fontFamilyCache.get(span);
    }
    
    let fontFamily = config.fontFamily;
    
    if (config.fontFamily === 'inherit' || !config.fontFamily) {
      const computedStyle = window.getComputedStyle(span);
      fontFamily = computedStyle.fontFamily;
    }
    
    // Cache the result
    this.fontFamilyCache.set(span, fontFamily);
    return fontFamily;
  }

  getFontVariationSettings(fontFamily, weight, width, italic) {
    // Normalize font family name for consistent matching
    const normalizedFont = fontFamily.toLowerCase();
    
    // Enhanced font family detection with better fallbacks
    if (normalizedFont.includes('recursive')) {
      return `'wght' ${weight}`;
    } else if (normalizedFont.includes('roboto flex')) {
      return `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(144, width))}, 'slnt' ${italic}`;
    } else if (normalizedFont.includes('source sans 3')) {
      return `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(300, width))}, 'ital' ${italic > 0 ? 1 : 0}`;
    } else if (normalizedFont.includes('space grotesk')) {
      return `'wght' ${weight}`;
    } else if (normalizedFont.includes('inter')) {
      return `'wght' ${weight}`;
    } else if (normalizedFont.includes('compressa')) {
      // Support for Compressa VF font from the React example
      return `'wght' ${weight}, 'wdth' ${width}, 'ital' ${italic}`;
    } else if (normalizedFont.includes('variable') || normalizedFont.includes('vf')) {
      // Generic variable font support
      return `'wght' ${weight}, 'wdth' ${width}, 'ital' ${italic}`;
    } else {
      // Fallback for other fonts - try weight variation only
      return `'wght' ${weight}`;
    }
  }

  updatePressureEffect(instance) {
    const { titleElement, charSpans, config } = instance;
    
    if (!titleElement) return;

    const titleRect = titleElement.getBoundingClientRect();
    const maxDist = titleRect.width / 2; // Use half width for better effect distribution

    charSpans.forEach((span) => {
      if (!span) return;

      const rect = span.getBoundingClientRect();
      const charCenter = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };

      const distance = this.calculateDistance(this.mousePosition, charCenter);

      // Improved attribute calculation based on React example
      const getAttribute = (distance, minVal, maxVal) => {
        const val = maxVal - Math.abs((maxVal * distance) / maxDist);
        return Math.max(minVal, val + minVal);
      };

      const width = config.width ? Math.floor(getAttribute(distance, 5, 200)) : 100;
      const weight = config.weight ? Math.floor(getAttribute(distance, config.minFontWeight, config.maxFontWeight)) : 400;
      const italic = config.italic ? getAttribute(distance, 0, 1).toFixed(2) : 0;
      const alpha = config.alpha ? getAttribute(distance, 0, 1).toFixed(2) : 1;

      span.style.opacity = alpha;
      
      // Apply font variations based on detected font family
      const fontFamily = this.getDetectedFontFamily(span, config);
      span.style.fontVariationSettings = this.getFontVariationSettings(fontFamily, weight, width, italic);
    });
  }

  calculateDistance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  initAll() {
    const elements = document.querySelectorAll('[wb-component="text-pressure"]');
    elements.forEach(element => this.initElement(element));
  }

  destroyElement(element) {
    try {
    const instance = this.instances.get(element);
    if (!instance) return;

    if (instance.eventListeners) {
      element.removeEventListener('pointerenter', instance.eventListeners.pointerenter);
      element.removeEventListener('pointerleave', instance.eventListeners.pointerleave);
      window.removeEventListener('resize', instance.eventListeners.resize);
    }

    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
    }

    if (instance.isActive) {
      this.deactivateInstance(instance);
    }

      // Clear font family cache for this element's spans
      if (instance.charSpans) {
        instance.charSpans.forEach(span => {
          this.fontFamilyCache.delete(span);
        });
    }

    this.removeComponentClasses(element);
    element.innerHTML = '';
    this.instances.delete(element);
    } catch (error) {
      console.error('TextPressure: Failed to destroy element', error);
    }
  }

  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroyElement(element);
    });
    
    // Clear all font family cache
    this.fontFamilyCache.clear();
  }

  refresh() {
    this.instances.forEach((instance, element) => {
      this.setSize(instance);
    });
  }

  checkForConflicts() {
    return checkCSSConflicts(
      this.componentClasses.getAllClasses(),
      this.componentName
    );
  }

  getInstance(element) {
    return this.instances.get(element);
  }

  updateConfig(element, newConfig) {
    const instance = this.instances.get(element);
    if (!instance) return;

    instance.config = { ...instance.config, ...newConfig };

    if (newConfig.text && newConfig.text !== instance.config.text) {
      this.createPressureStructure(instance);
    }

    if (newConfig.textColor && element.hasAttribute('wb-text-color')) {
      element.style.setProperty('--wb-text-color', newConfig.textColor);
    } else if (newConfig.textColor === 'currentColor') {
      element.style.removeProperty('--wb-text-color');
    }
    if (newConfig.strokeColor && element.hasAttribute('wb-stroke-color')) {
      element.style.setProperty('--wb-stroke-color', newConfig.strokeColor);
    } else if (newConfig.strokeColor === '#FF0000') {
      element.style.removeProperty('--wb-stroke-color');
    }

    this.removeComponentClasses(element);
    this.applyComponentClasses(element, instance.config);

    AnimationStateManager.dispatchLifecycleEvent(element, 'update', 'text-pressure', {
      config: instance.config
    });
  }










}

const textPressureAnimator = new TextPressureAnimator();
export default textPressureAnimator;
