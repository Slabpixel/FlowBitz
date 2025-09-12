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

.wb-text-pressure {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 200px;
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
  justify-content: center;
  flex-wrap: wrap;
}

.wb-text-pressure__char {
  display: inline-block;
  will-change: font-variation-settings, opacity;
  transition: font-variation-settings 0.05s ease;
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
  font-size: clamp(16px, 4vw, 48px);
  color: currentColor;
}

@media (max-width: 768px) {
@media (max-width: 768px) {
  .wb-text-pressure {
    min-height: 150px;
  }
  
  .wb-text-pressure__title {
    font-size: clamp(12px, 6vw, 32px) !important;
  }
}

@media (max-width: 480px) {
  .wb-text-pressure {
    min-height: 120px;
  }
  
  .wb-text-pressure__title {
    font-size: clamp(10px, 8vw, 24px) !important;
  }
}
`;

class TextPressureAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'TextPressure';
    this.componentClasses = webflowBitsClasses.forComponent('text-pressure');
    this.animationFrameId = null;
    this.defaultConfig = {
      text: 'PRESSURE', // Fallback text if no content is found
      fontFamily: 'inherit',
      width: true,
      weight: true,
      italic: true,
      alpha: false,
      flex: true,
      stroke: false,
      scale: false,
      textColor: 'currentColor', // Use current color for theme compatibility
      strokeColor: '#FF0000',
      minFontSize: 24,
      threshold: 0.1,
      rootMargin: '0px',
      alwaysActive: false
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
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        this.cursorPosition.x = touch.clientX;
        this.cursorPosition.y = touch.clientY;
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', updateTouchPosition, { passive: true });
  }

  startAnimationLoop() {
    if (this.animationFrameId) return;

    const animate = () => {
      this.mousePosition.x += (this.cursorPosition.x - this.mousePosition.x) / 15;
      this.mousePosition.y += (this.cursorPosition.y - this.mousePosition.y) / 15;

      this.activeInstances.forEach(instance => {
        this.updatePressureEffect(instance);
      });

      this.animationFrameId = requestAnimationFrame(animate);
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
      textColor: { attribute: 'wb-text-color', type: 'string' },
      strokeColor: { attribute: 'wb-stroke-color', type: 'string' },
      minFontSize: { attribute: 'wb-min-font-size', type: 'number', min: 8, max: 200 },
      threshold: { attribute: 'wb-threshold', type: 'threshold' },
      rootMargin: { attribute: 'wb-root-margin', type: 'string' },
      alwaysActive: { attribute: 'wb-always-active', type: 'boolean' }
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
    
    if (config.flex) classesToApply.push('wb-text-pressure--flex');
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
    this.ensureStylesInjected();
    
    if (this.instances.has(element)) {
      return;
    }

    const config = this.parseConfig(element);
    const chars = config.text.split('');

    const instance = {
      element,
      config,
      chars,
      titleElement: null,
      charSpans: [],
      fontSize: config.minFontSize,
      scaleY: 1,
      lineHeight: 1,
      isActive: false
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
  }

  createPressureStructure(instance) {
    const { element, config, chars } = instance;

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

    let newFontSize;
    
    if (config.flex) {
      newFontSize = Math.min(containerWidth / chars.length, containerHeight * 0.8);
    } else {
      newFontSize = Math.min(containerWidth / (chars.length * 1.2), containerHeight * 0.8);
    }
    
    newFontSize = Math.max(newFontSize, config.minFontSize);
    newFontSize = Math.min(newFontSize, containerHeight * 0.9);

    instance.fontSize = newFontSize;
    instance.scaleY = 1;
    instance.lineHeight = 1;

    titleElement.style.fontSize = `${newFontSize}px`;
    titleElement.style.lineHeight = instance.lineHeight;
    titleElement.style.transform = `scale(1, ${instance.scaleY})`;

    if (config.scale) {
      requestAnimationFrame(() => {
        if (!titleElement) return;
        const textRect = titleElement.getBoundingClientRect();

        if (textRect.height > 0) {
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
      
      // Reset font variations based on detected font family
      if (instance.config.fontFamily === 'inherit' || !instance.config.fontFamily) {
        const computedStyle = window.getComputedStyle(span);
        const fontFamily = computedStyle.fontFamily;
        
        if (fontFamily.includes('Recursive')) {
          span.style.fontVariationSettings = `'wght' 400`;
        } else if (fontFamily.includes('Roboto Flex')) {
          span.style.fontVariationSettings = `'wght' 400, 'opsz' 20, 'slnt' 0`;
        } else if (fontFamily.includes('Source Sans 3')) {
          span.style.fontVariationSettings = `'wght' 400, 'opsz' 20, 'ital' 0`;
        } else if (fontFamily.includes('Space Grotesk')) {
          span.style.fontVariationSettings = `'wght' 400`;
        } else if (fontFamily.includes('Inter')) {
          span.style.fontVariationSettings = `'wght' 400`;
        } else {
          span.style.fontVariationSettings = `'wght' 400`;
        }
      } else if (instance.config.fontFamily.includes('Recursive')) {
        span.style.fontVariationSettings = `'wght' 400`;
      } else if (instance.config.fontFamily.includes('Roboto Flex')) {
        span.style.fontVariationSettings = `'wght' 400, 'opsz' 20, 'slnt' 0`;
      } else if (instance.config.fontFamily.includes('Source Sans 3')) {
        span.style.fontVariationSettings = `'wght' 400, 'opsz' 20, 'ital' 0`;
      } else if (instance.config.fontFamily.includes('Space Grotesk')) {
        span.style.fontVariationSettings = `'wght' 400`;
      } else if (instance.config.fontFamily.includes('Inter')) {
        span.style.fontVariationSettings = `'wght' 400`;
      } else {
        span.style.fontVariationSettings = `'wght' 400`;
      }
    });

    // Set completed state
    AnimationStateManager.setCompletedState(instance.element, 'wb-text-pressure');
    AnimationStateManager.dispatchLifecycleEvent(instance.element, 'stop', 'text-pressure', {
      config: instance.config
    });
  }

  updatePressureEffect(instance) {
    const { titleElement, charSpans, config } = instance;
    
    if (!titleElement) return;

    const titleRect = titleElement.getBoundingClientRect();
    const containerRect = instance.element.getBoundingClientRect();
    
    const maxDist = Math.max(titleRect.width, titleRect.height) * 0.8;

    charSpans.forEach((span) => {
      if (!span) return;

      const rect = span.getBoundingClientRect();
      const charCenter = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };

      const distance = this.calculateDistance(this.mousePosition, charCenter);

      const getAttribute = (distance, minVal, maxVal) => {
        if (distance >= maxDist) return minVal;
        
        const normalizedDistance = distance / maxDist;
        const falloff = 1 - Math.pow(normalizedDistance, 1.5);
        const val = minVal + (maxVal - minVal) * falloff;
        return Math.max(minVal, Math.min(maxVal, val));
      };

      const width = config.width ? Math.floor(getAttribute(distance, 25, 200)) : 100;
      const weight = config.weight ? Math.floor(getAttribute(distance, 100, 900)) : 400;
      const italic = config.italic ? getAttribute(distance, 0, 15).toFixed(1) : 0;
      const alpha = config.alpha ? getAttribute(distance, 0.3, 1).toFixed(2) : 1;

      span.style.opacity = alpha;
      
      // Apply font variations based on detected font family
      if (config.fontFamily === 'inherit' || !config.fontFamily) {
        // For inherited fonts, try to detect if it's a variable font
        const computedStyle = window.getComputedStyle(span);
        const fontFamily = computedStyle.fontFamily;
        
        if (fontFamily.includes('Recursive')) {
          span.style.fontVariationSettings = `'wght' ${weight}`;
        } else if (fontFamily.includes('Roboto Flex')) {
          span.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(144, width))}, 'slnt' ${italic}`;
        } else if (fontFamily.includes('Source Sans 3')) {
          span.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(300, width))}, 'ital' ${italic > 0 ? 1 : 0}`;
        } else if (fontFamily.includes('Space Grotesk')) {
          span.style.fontVariationSettings = `'wght' ${weight}`;
        } else if (fontFamily.includes('Inter')) {
          span.style.fontVariationSettings = `'wght' ${weight}`;
        } else {
          // Try weight variation as fallback for any font
          span.style.fontVariationSettings = `'wght' ${weight}`;
        }
      } else if (config.fontFamily.includes('Recursive')) {
        span.style.fontVariationSettings = `'wght' ${weight}`;
      } else if (config.fontFamily.includes('Roboto Flex')) {
        span.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(144, width))}, 'slnt' ${italic}`;
      } else if (config.fontFamily.includes('Source Sans 3')) {
        span.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${Math.max(8, Math.min(300, width))}, 'ital' ${italic > 0 ? 1 : 0}`;
      } else if (config.fontFamily.includes('Space Grotesk')) {
        span.style.fontVariationSettings = `'wght' ${weight}`;
      } else if (config.fontFamily.includes('Inter')) {
        span.style.fontVariationSettings = `'wght' ${weight}`;
      } else {
        // Fallback for other fonts - try weight variation
        span.style.fontVariationSettings = `'wght' ${weight}`;
      }
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

    this.removeComponentClasses(element);
    element.innerHTML = '';
    this.instances.delete(element);


  }

  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroyElement(element);
    });
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
