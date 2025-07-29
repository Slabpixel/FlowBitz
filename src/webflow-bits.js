/**
 * Webflow Bits - CDN Entry Point
 * A collection of interactive components for Webflow
 * 
 * @version 1.0.0
 * @author Slabpixel Studio
 * @license MIT
 */

import splitTextAnimator from './components/splitText.js';
import textTypeAnimator from './components/textType.js';
import blurTextAnimator from './components/blurText.js';
import shinyTextAnimator from './components/shinyText.js';
import gradientTextAnimator from './components/gradientText.js';
import decryptedTextAnimator from './components/decryptedText.js';
import scrambleTextAnimator from './components/scrambleText.js';
import variableProximityAnimator from './components/variableProximity.js';
import countUpAnimator from './components/countUp.js';
import rotatingTextAnimator from './components/rotatingText.js';
import textPressureAnimator from './components/textPressure.js';
import magnetLinesAnimator from './components/magnetLines.js';
import imageTrailAnimator from './components/imageTrail.js';
import textCursorAnimator from './components/textCursor.js';

/**
 * Main WebflowBits class for CDN usage
 */
class WebflowBits {
  constructor() {
    this.version = '1.0.0';
    this.initialized = false;
    this.observers = [];
    this.components = {
      splitText: splitTextAnimator,
      textType: textTypeAnimator,
      blurText: blurTextAnimator,
      shinyText: shinyTextAnimator,
      gradientText: gradientTextAnimator,
      decryptedText: decryptedTextAnimator,
      scrambleText: scrambleTextAnimator,
      variableProximity: variableProximityAnimator,
      countUp: countUpAnimator,
      rotatingText: rotatingTextAnimator,
      textPressure: textPressureAnimator,
      magnetLines: magnetLinesAnimator,
      imageTrail: imageTrailAnimator,
      textCursor: textCursorAnimator,
    };
  }

  /**
   * Initialize all components
   * @param {Object} options - Configuration options
   */
  init(options = {}) {
    if (this.initialized) {
      console.warn('WebflowBits: Already initialized');
      return this;
    }

    const config = {
      autoInit: true,
      debug: false,
      components: ['splitText', 'textType', 'blurText', 'shinyText', 'gradientText', 'decryptedText', 'scrambleText', 'variableProximity', 'countUp', 'rotatingText', 'textPressure', 'magnetLines', 'imageTrail', 'textCursor'],
      ...options
    };

    if (config.debug) {
      console.log('WebflowBits: Initializing...', { version: this.version, config });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents(config));
    } else {
      this.initComponents(config);
    }

    this.initialized = true;
    return this;
  }

  /**
   * Initialize components based on config
   */
  initComponents(config) {
    try {
      // Check for potential conflicts before initializing
      if (config.debug) {
        this.checkConflicts();
      }
      
      // Initialize enabled components
      if (config.components.includes('splitText')) {
        this.initSplitText(config.debug);
      }
      
      if (config.components.includes('textType')) {
        this.initTextType(config.debug);
      }
      
      if (config.components.includes('blurText')) {
        this.initBlurText(config.debug);
      }
      
      if (config.components.includes('shinyText')) {
        this.initShinyText(config.debug);
      }
      
      if (config.components.includes('gradientText')) {
        this.initGradientText(config.debug);
      }

      if (config.components.includes('decryptedText')) {
        this.initDecryptedText(config.debug);
      }

      if (config.components.includes('scrambleText')) {
        this.initScrambleText(config.debug);
      }

      if (config.components.includes('variableProximity')) {
        this.initVariableProximity(config.debug);
      }

      if (config.components.includes('countUp')) {
        this.initCountUp(config.debug);
      }

      if (config.components.includes('rotatingText')) {
        this.initRotatingText(config.debug);
      }
      if (config.components.includes('textPressure')) {
        this.initTextPressure(config.debug);
      }

      if (config.components.includes('magnetLines')) {
        this.initMagnetLines(config.debug);
      }

      if (config.components.includes('imageTrail')) {
        this.initImageTrail(config.debug);
      }

      if (config.components.includes('textCursor')) {
        this.initTextCursor(config.debug);
      }

      // Setup mutation observer for dynamic content if autoInit is enabled
      if (config.autoInit) {
        this.setupMutationObserver(config.debug);
      }

      if (config.debug) {
        console.log('WebflowBits: Initialized successfully');
      }

      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('webflow-bits-ready', {
        detail: { version: this.version, components: this.components }
      }));

    } catch (error) {
      console.error('WebflowBits: Initialization failed', error);
    }
  }

  /**
   * Check for potential CSS conflicts
   */
  checkConflicts() {
    try {
      const allConflicts = [];
      
      // Check SplitText conflicts
      const splitTextConflicts = splitTextAnimator.checkForConflicts();
      if (splitTextConflicts) {
        allConflicts.push(...splitTextConflicts);
      }
      
      // Check TextType conflicts
      const textTypeConflicts = textTypeAnimator.checkForConflicts();
      if (textTypeConflicts) {
        allConflicts.push(...textTypeConflicts);
      }
      
      // Check BlurText conflicts
      const blurTextConflicts = blurTextAnimator.checkForConflicts();
      if (blurTextConflicts) {
        allConflicts.push(...blurTextConflicts);
      }
      
      // Check ShinyText conflicts
      const shinyTextConflicts = shinyTextAnimator.checkForConflicts();
      if (shinyTextConflicts) {
        allConflicts.push(...shinyTextConflicts);
      }
      
      // Check GradientText conflicts
      const gradientTextConflicts = gradientTextAnimator.checkForConflicts();
      if (gradientTextConflicts) {
        allConflicts.push(...gradientTextConflicts);
      }
      
      // Check DecryptedText conflicts
      const decryptedTextConflicts = decryptedTextAnimator.checkForConflicts();
      if (decryptedTextConflicts) {
        allConflicts.push(...decryptedTextConflicts);
      }
      
      // Check ScrambleText conflicts
      const scrambleTextConflicts = scrambleTextAnimator.checkForConflicts();
      if (scrambleTextConflicts) {
        allConflicts.push(...scrambleTextConflicts);
      }
      
      // Check VariableProximity conflicts
      const variableProximityConflicts = variableProximityAnimator.checkForConflicts();
      if (variableProximityConflicts) {
        allConflicts.push(...variableProximityConflicts);
      }

      // Check CountUp conflicts
      const countUpConflicts = countUpAnimator.checkForConflicts();
      if (countUpConflicts) {
        allConflicts.push(...countUpConflicts);
      }

      // Check RotatingText conflicts
      const rotatingTextConflicts = rotatingTextAnimator.checkForConflicts();
      if (rotatingTextConflicts) {
        allConflicts.push(...rotatingTextConflicts);
      }

      // Check TextPressure conflicts
      const textPressureConflicts = textPressureAnimator.checkForConflicts();
      if (textPressureConflicts) {
        allConflicts.push(...textPressureConflicts);
      }

      // Check MagnetLines conflicts
      const magnetLinesConflicts = magnetLinesAnimator.checkForConflicts();
      if (magnetLinesConflicts) {
        allConflicts.push(...magnetLinesConflicts);
      }

      // Check ImageTrail conflicts
      const imageTrailConflicts = imageTrailAnimator.checkForConflicts();
      if (imageTrailConflicts) {
        allConflicts.push(...imageTrailConflicts);
      }

      // Check TextCursor conflicts
      const textCursorConflicts = textCursorAnimator.checkForConflicts();
      if (textCursorConflicts) {
        allConflicts.push(...textCursorConflicts);
      }
      
      if (allConflicts.length > 0) {
        document.dispatchEvent(new CustomEvent('webflow-bits-conflicts', {
          detail: { conflicts: allConflicts }
        }));
      }
    } catch (error) {
      console.warn('WebflowBits: Error checking conflicts', error);
    }
  }

  /**
   * Initialize SplitText component
   */
  initSplitText(debug = false) {
    try {
      splitTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: SplitText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize SplitText', error);
    }
  }

  /**
   * Initialize TextType component
   */
  initTextType(debug = false) {
    try {
      textTypeAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: TextType initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize TextType', error);
    }
  }

  /**
   * Initialize BlurText component
   */
  initBlurText(debug = false) {
    try {
      blurTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: BlurText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize BlurText', error);
    }
  }

  /**
   * Initialize ShinyText component
   */
  initShinyText(debug = false) {
    try {
      shinyTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: ShinyText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize ShinyText', error);
    }
  }

  /**
   * Initialize GradientText component
   */
  initGradientText(debug = false) {
    try {
      gradientTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: GradientText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize GradientText', error);
    }
  }

  /**
   * Initialize DecryptedText component
   */
  initDecryptedText(debug = false) {
    try {
      decryptedTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: DecryptedText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize DecryptedText', error);
    }
  }

  /**
   * Initialize ScrambleText component
   */
  initScrambleText(debug = false) {
    try {
      scrambleTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: ScrambleText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize ScrambleText', error);
    }
  }

  /**
   * Initialize VariableProximity component
   */
  initVariableProximity(debug = false) {
    try {
      variableProximityAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: VariableProximity initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize VariableProximity', error);
    }
  }

  /**
   * Initialize countUp component
   */
  initCountUp(debug = false) {
    try {
      countUpAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: CountUp initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize CountUp', error);
    }
  }

  /**
   * Initialize RotatingText component
   */
  initRotatingText(debug = false) {
    try {
      rotatingTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: RotatingText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize RotatingText', error);
    }
  }

  /**
   * Initialize TextPressure component
   */
  initTextPressure(debug = false) {
    try {
      textPressureAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: TextPressure initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize TextPressure', error);
    }
  }

  /**
   * Initialize MagnetLines component
   */
  initMagnetLines(debug = false) {
    try {
      magnetLinesAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: MagnetLines initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize MagnetLines', error);
    }
  }

  /**
   * Initialize ImageTrail component
   */
  initImageTrail(debug = false) {
    try {
      imageTrailAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: ImageTrail initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize ImageTrail', error);
    }
  }

  /**
   * Initialize TextCursor component
   */
  initTextCursor(debug = false) {
    try {
      textCursorAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: TextCursor initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize TextCursor', error);
    }
  }

  /**
   * Setup mutation observer to handle dynamically added content
   */
  setupMutationObserver(debug = false) {
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check for wb-text-animate="split-text" elements
              const splitTextElements = node.matches?.('[wb-text-animate="split-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="split-text"]') || []);

              splitTextElements.forEach(element => {
                splitTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="text-type" elements
              const textTypeElements = node.matches?.('[wb-text-animate="text-type"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="text-type"]') || []);

              textTypeElements.forEach(element => {
                textTypeAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="blur-text" elements
              const blurTextElements = node.matches?.('[wb-text-animate="blur-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="blur-text"]') || []);

              blurTextElements.forEach(element => {
                blurTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="shiny-text" elements
              const shinyTextElements = node.matches?.('[wb-text-animate="shiny-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="shiny-text"]') || []);

              shinyTextElements.forEach(element => {
                shinyTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="gradient-text" elements
              const gradientTextElements = node.matches?.('[wb-text-animate="gradient-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="gradient-text"]') || []);

              gradientTextElements.forEach(element => {
                gradientTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="decrypt-text" elements
              const decryptedTextElements = node.matches?.('[wb-text-animate="decrypt-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="decrypt-text"]') || []);

              decryptedTextElements.forEach(element => {
                decryptedTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="scramble-text" elements
              const scrambleTextElements = node.matches?.('[wb-text-animate="scramble-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="scramble-text"]') || []);

              scrambleTextElements.forEach(element => {
                scrambleTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="variable-proximity" elements
              const variableProximityElements = node.matches?.('[wb-text-animate="variable-proximity"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-text-animate="variable-proximity"]') || []);

              variableProximityElements.forEach(element => {
                variableProximityAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="count-up" elements
              const countUpElements = node.matches?.('[wb-text-animate="count-up"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-text-animate="count-up"]') || []);

              countUpElements.forEach(element => {
                countUpAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="rotating-text" elements
              const rotatingTextElements = node.matches?.('[wb-text-animate="rotating-text"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-text-animate="rotating-text"]') || []);

              rotatingTextElements.forEach(element => {
                rotatingTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="text-pressure" elements
              const textPressureElements = node.matches?.('[wb-text-animate="text-pressure"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-text-animate="text-pressure"]') || []);

              textPressureElements.forEach(element => {
                textPressureAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-animate="magnet-lines" elements
              const magnetLinesElements = node.matches?.('[wb-animate="magnet-lines"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-animate="magnet-lines"]') || []);

              magnetLinesElements.forEach(element => {
                magnetLinesAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-animate="image-trail" elements
              const imageTrailElements = node.matches?.('[wb-animate="image-trail"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-animate="image-trail"]') || []);

              imageTrailElements.forEach(element => {
                imageTrailAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-text-animate="text-cursor" elements
              const textCursorElements = node.matches?.('[wb-text-animate="text-cursor"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-text-animate="text-cursor"]') || []);

              textCursorElements.forEach(element => {
                textCursorAnimator.initElement(element);
                shouldRefresh = true;
              });
            }
          });
        }
      });

      if (shouldRefresh) {
        clearTimeout(this.refreshTimeout);
        this.refreshTimeout = setTimeout(() => {
          splitTextAnimator.refresh();
          textTypeAnimator.refresh();
          blurTextAnimator.refresh();
          shinyTextAnimator.refresh();
          gradientTextAnimator.refresh();
          decryptedTextAnimator.refresh();
          scrambleTextAnimator.refresh();
          variableProximityAnimator.refresh();
          countUpAnimator.refresh();
          rotatingTextAnimator.refresh();
          textPressureAnimator.refresh();
          magnetLinesAnimator.refresh();
          imageTrailAnimator.refresh();
          textCursorAnimator.refresh();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  /**
   * Manually initialize SplitText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initSplitTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'split-text') {
        splitTextAnimator.initElement(element);
      }
    });

    splitTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize TextType on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initTextTypeOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'text-type') {
        textTypeAnimator.initElement(element);
      }
    });

    textTypeAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize BlurText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initBlurTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'blur-text') {
        blurTextAnimator.initElement(element);
      }
    });

    blurTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize ShinyText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initShinyTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'shiny-text') {
        shinyTextAnimator.initElement(element);
      }
    });

    shinyTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize GradientText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initGradientTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'gradient-text') {
        gradientTextAnimator.initElement(element);
      }
    });

    gradientTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize DecryptedText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initDecryptedTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'decrypt-text') {
        decryptedTextAnimator.initElement(element);
      }
    });

    decryptedTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize ScrambleText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initScrambleTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'scramble-text') {
        scrambleTextAnimator.initElement(element);
      }
    });

    scrambleTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize VariableProximity on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initVariableProximityOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'variable-proximity') {
        variableProximityAnimator.initElement(element);
      }
    });

    variableProximityAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize CountUp on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initCountUpOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'count-up') {
        countUpAnimator.initElement(element);
      }
    });

    countUpAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize RotatingText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initRotatingTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'rotating-text') {
        rotatingTextAnimator.initElement(element);
      }
    });

    rotatingTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize TextPressure on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initTextPressureOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'text-pressure') {
        textPressureAnimator.initElement(element);
      }
    });

    textPressureAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize MagnetLines on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initMagnetLinesOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-animate') === 'magnet-lines') {
        magnetLinesAnimator.initElement(element);
      }
    });

    magnetLinesAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize ImageTrail on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initImageTrailOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-animate') === 'image-trail') {
        imageTrailAnimator.initElement(element);
      }
    });

    imageTrailAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize TextCursor on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initTextCursorOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-text-animate') === 'text-cursor') {
        textCursorAnimator.initElement(element);
      }
    });

    textCursorAnimator.refresh();
    return this;
  }

  /**
   * Destroy all components and observers
   */
  destroy() {
    // Destroy SplitText animations
    splitTextAnimator.destroyAll();
    
    // Destroy TextType animations
    textTypeAnimator.destroyAll();
    
    // Destroy BlurText animations
    blurTextAnimator.destroyAll();
    
    // Destroy ShinyText animations
    shinyTextAnimator.destroyAll();
    
    // Destroy GradientText animations
    gradientTextAnimator.destroyAll();
    
    // Destroy DecryptedText animations
    decryptedTextAnimator.destroyAll();
    
    // Destroy ScrambleText animations
    scrambleTextAnimator.destroyAll();
    
    // Destroy VariableProximity animations
    variableProximityAnimator.destroyAll();

    // Destroy CountUp animations
    countUpAnimator.destroyAll();

    // Destroy RotatingText animations
    rotatingTextAnimator.destroyAll();

    // Destroy TextPressure animations
    textPressureAnimator.destroyAll();

    // Destroy MagnetLines animations
    magnetLinesAnimator.destroyAll();

    // Destroy ImageTrail animations
    imageTrailAnimator.destroyAll();

    // Destroy TextCursor animations
    textCursorAnimator.destroyAll();

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    this.initialized = false;
    
    document.dispatchEvent(new CustomEvent('webflow-bits-destroyed'));
    return this;
  }

  /**
   * Refresh all components
   */
  refresh() {
    splitTextAnimator.refresh();
    textTypeAnimator.refresh();
    blurTextAnimator.refresh();
    shinyTextAnimator.refresh();
    gradientTextAnimator.refresh();
    decryptedTextAnimator.refresh();
    scrambleTextAnimator.refresh();
    variableProximityAnimator.refresh();
    countUpAnimator.refresh();
    rotatingTextAnimator.refresh();
    textPressureAnimator.refresh();
    magnetLinesAnimator.refresh();
    imageTrailAnimator.refresh();
    textCursorAnimator.refresh();
    return this;
  }

  /**
   * Get component instance
   * @param {string} name - Component name
   */
  getComponent(name) {
    return this.components[name] || null;
  }
}

// Create singleton instance
const webflowBits = new WebflowBits();

// Auto-initialize with default settings if not in module context
if (typeof window !== 'undefined') {
  // Make available globally
  window.WebflowBits = webflowBits;
  
  // Auto-init if script is loaded normally (not as module)
  if (!document.currentScript?.type?.includes('module')) {
    webflowBits.init();
  }

  // Listen for conflicts and log them
  document.addEventListener('webflow-bits-conflicts', (event) => {
    console.warn('🚨 WebflowBits: CSS conflicts detected!', event.detail.conflicts);
    console.info('💡 Consider using different class names or check for existing Webflow classes');
  });
}

// Export for ES modules
export default webflowBits;
export { WebflowBits };