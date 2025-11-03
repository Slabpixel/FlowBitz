import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';

// Component-specific CSS
const componentCSS = `
/* FlowBitz - Tooltip Text Component Styles */
.wb-tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.wb-tooltip__text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 1000;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
  width: max-content;
  max-width: 300px;
  white-space: normal;
  word-wrap: break-word;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}

/* Size templates */
.wb-tooltip--small .wb-tooltip__text {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.wb-tooltip--medium .wb-tooltip__text {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
}

.wb-tooltip--large .wb-tooltip__text {
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
}

/* Animation types */
.wb-tooltip--fade .wb-tooltip__text {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.wb-tooltip--slide .wb-tooltip__text {
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}

.wb-tooltip--scale .wb-tooltip__text {
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: scale(0.8);
}

/* Scale animation show state */
.wb-tooltip--scale:hover .wb-tooltip__text,
.wb-tooltip--scale:focus .wb-tooltip__text {
  transform: scale(1);
}

/* Tooltip arrow */
.wb-tooltip__text::after {
  content: "";
  position: absolute;
  border-style: solid;
  pointer-events: none;
}

/* Top tooltip */
.wb-tooltip--top .wb-tooltip__text {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: var(--wb-tooltip-offset, 8px);
}

.wb-tooltip--top .wb-tooltip__text::after {
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-color: var(--wb-tooltip-background, #000) transparent transparent transparent;
}

/* Bottom tooltip */
.wb-tooltip--bottom .wb-tooltip__text {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: var(--wb-tooltip-offset, 8px);
}

.wb-tooltip--bottom .wb-tooltip__text::after {
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-color: transparent transparent var(--wb-tooltip-background, #000) transparent;
}

/* Left tooltip */
.wb-tooltip--left .wb-tooltip__text {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: var(--wb-tooltip-offset, 8px);
}

.wb-tooltip--left .wb-tooltip__text::after {
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-color: transparent transparent transparent var(--wb-tooltip-background, #000);
}

/* Right tooltip */
.wb-tooltip--right .wb-tooltip__text {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: var(--wb-tooltip-offset, 8px);
}

.wb-tooltip--right .wb-tooltip__text::after {
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-color: transparent var(--wb-tooltip-background, #000) transparent transparent;
}

/* Slide animations for different positions */
.wb-tooltip--slide.wb-tooltip--top .wb-tooltip__text {
  transform: translateX(-50%) translateY(10px);
}

.wb-tooltip--slide.wb-tooltip--bottom .wb-tooltip__text {
  transform: translateX(-50%) translateY(-10px);
}

.wb-tooltip--slide.wb-tooltip--left .wb-tooltip__text {
  transform: translateY(-50%) translateX(10px);
}

.wb-tooltip--slide.wb-tooltip--right .wb-tooltip__text {
  transform: translateY(-50%) translateX(-10px);
}

/* Slide animation show state */
.wb-tooltip--slide:hover .wb-tooltip--top .wb-tooltip__text,
.wb-tooltip--slide:focus .wb-tooltip--top .wb-tooltip__text {
  transform: translateX(-50%) translateY(0);
}

.wb-tooltip--slide:hover .wb-tooltip--bottom .wb-tooltip__text,
.wb-tooltip--slide:focus .wb-tooltip--bottom .wb-tooltip__text {
  transform: translateX(-50%) translateY(0);
}

.wb-tooltip--slide:hover .wb-tooltip--left .wb-tooltip__text,
.wb-tooltip--slide:focus .wb-tooltip--left .wb-tooltip__text {
  transform: translateY(-50%) translateX(0);
}

.wb-tooltip--slide:hover .wb-tooltip--right .wb-tooltip__text,
.wb-tooltip--slide:focus .wb-tooltip--right .wb-tooltip__text {
  transform: translateY(-50%) translateX(0);
}

/* Show tooltip on hover */
.wb-tooltip:hover .wb-tooltip__text {
  visibility: visible;
  opacity: 1;
}

/* Focus for accessibility */
.wb-tooltip:focus .wb-tooltip__text {
  visibility: visible;
  opacity: 1;
}
`;

class TooltipTextAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'TooltipText';
    this.componentClasses = webflowBitsClasses.forComponent('tooltip');
    this.defaultConfig = {
      text: '',
      position: 'top',
      delay: 0,
      duration: 0.3,
      backgroundColor: '#000',
      textColor: '#fff',
      fontSize: '14px',
      maxWidth: '200px',
      offset: 8,
      showArrow: true,
      size: 'medium',
      animationType: 'fade'
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-tooltip-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.error('Failed to inject TooltipText styles:', error);
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

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = {
      text: { attribute: 'wb-tooltip-text', type: 'string' },
      position: { attribute: 'wb-tooltip-position', type: 'string' },
      delay: { attribute: 'wb-tooltip-delay', type: 'number', parser: parseFloat },
      duration: { attribute: 'wb-tooltip-duration', type: 'number', parser: parseFloat },
      backgroundColor: { attribute: 'wb-tooltip-background', type: 'color' },
      textColor: { attribute: 'wb-tooltip-color', type: 'color' },
      maxWidth: { attribute: 'wb-tooltip-max-width', type: 'string' },
      offset: { attribute: 'wb-tooltip-offset', type: 'number', parser: parseInt },
      showArrow: { attribute: 'wb-tooltip-arrow', type: 'boolean' },
      size: { attribute: 'wb-tooltip-size-template', type: 'string' },
      animationType: { attribute: 'wb-tooltip-animation', type: 'string' }
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent, 
      `wb-tooltip--${config.position}`,
      `wb-tooltip--${config.size}`,
      `wb-tooltip--${config.animationType}`
    ];
    
    ComponentClassManager.applyClasses(
      element, 
      classesToApply, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Initialize all tooltip text elements
   */
  initAll() {
    this.ensureStylesInjected();
    
    const elements = document.querySelectorAll('[wb-component="tooltip-text"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Initialize a single tooltip text element
   */
  initElement(element) {
    if (this.instances.has(element)) return;
    if (!element || !element.isConnected) return;

    try {
      const config = this.parseConfig(element);
      
      // Validate required text
      if (!config.text) {
        console.warn('FlowBitz TooltipText: wb-tooltip-text attribute is required');
        return;
      }

      // Create tooltip element
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'wb-tooltip__text';
      tooltipElement.textContent = config.text;
      
      
      // Apply custom styles
      if (config.backgroundColor) {
        tooltipElement.style.backgroundColor = config.backgroundColor;
        tooltipElement.style.setProperty('--wb-tooltip-background', config.backgroundColor);
      }
      if (config.textColor) {
        tooltipElement.style.color = config.textColor;
      }
      if (config.maxWidth) {
        tooltipElement.style.maxWidth = config.maxWidth;
      }
      if (config.offset) {
        tooltipElement.style.setProperty('--wb-tooltip-offset', `${config.offset}px`);
      }
      if (config.duration) {
        tooltipElement.style.transitionDuration = `${config.duration}s`;
      }
      if (config.delay) {
        tooltipElement.style.transitionDelay = `${config.delay}s`;
      }
      
      // Hide arrow if disabled
      if (!config.showArrow) {
        tooltipElement.style.setProperty('--wb-tooltip-arrow-display', 'none');
      }
      
      // Add tooltip to element
      element.appendChild(tooltipElement);
      
      // Apply component classes
      this.applyComponentClasses(element, config);
      
      // Store instance
      this.instances.set(element, {
        element,
        tooltip: tooltipElement,
        config
      });

    } catch (error) {
      console.error('FlowBitz TooltipText: Failed to initialize element', error);
    }
  }

  /**
   * Destroy tooltip instance
   */
  destroyInstance(element) {
    const instance = this.instances.get(element);
    if (instance) {
      // Remove tooltip element
      if (instance.tooltip && instance.tooltip.parentNode) {
        instance.tooltip.parentNode.removeChild(instance.tooltip);
      }
      
      // Remove classes
      ComponentClassManager.removeClasses(
        element, 
        [
          this.componentClasses.parent, 
          'wb-tooltip--top', 'wb-tooltip--bottom', 'wb-tooltip--left', 'wb-tooltip--right',
          'wb-tooltip--small', 'wb-tooltip--medium', 'wb-tooltip--large',
          'wb-tooltip--fade', 'wb-tooltip--slide', 'wb-tooltip--scale'
        ], 
        this.instances, 
        this.componentName
      );
      
      // Remove from instances
      this.instances.delete(element);
    }
  }

  /**
   * Destroy all tooltip instances
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroyInstance(element);
    });
    this.instances.clear();
  }

  /**
   * Simple refresh - just re-initialize all elements
   */
  refresh() {
    // Simple approach: destroy all and re-initialize
    this.destroyAll();
    this.initAll();
  }

  /**
   * Check for CSS conflicts
   */
  checkForConflicts() {
    return checkCSSConflicts('wb-tooltip', componentClassSets);
  }
}

// Create singleton instance
const tooltipTextAnimator = new TooltipTextAnimator();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => tooltipTextAnimator.initAll());
} else {
  tooltipTextAnimator.initAll();
}

export default tooltipTextAnimator;