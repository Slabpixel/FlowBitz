/**
 * FlowBitz - CDN Entry Point
 * A collection of interactive components for Webflow
 * 
 * @version 2.3.5
 * @author Slabpixel Studio
 * @license MIT
 */

/* Text Components */
import splitTextAnimator from '../components/text/splitText.js';
import textTypeAnimator from '../components/text/textType.js';
import blurTextAnimator from '../components/text/blurText.js';
import shinyTextAnimator from '../components/text/shinyText.js';
import gradientTextAnimator from '../components/text/gradientText.js';
import decryptedTextAnimator from '../components/text/decryptedText.js';
import scrambleTextAnimator from '../components/text/scrambleText.js';
import variableProximityAnimator from '../components/text/variableProximity.js';
import countUpAnimator from '../components/text/countUp.js';
import rotatingTextAnimator from '../components/text/rotatingText.js';
import textPressureAnimator from '../components/text/textPressure.js';
import shuffleAnimator from '../components/text/shuffle.js';
import tooltipTextAnimator from '../components/text/tooltipText.js';
import rollTextAnimator from '../components/text/rollText.js';

/* Button Components */
import pulseButtonAnimator from '../components/button/pulseButton.js';
import gradientButtonAnimator from '../components/button/gradientButton.js';
import rippleButtonAnimator from '../components/button/rippleButton.js';
import magnetAnimator from '../components/button/magneticButton.js';

/* Effect Components */
import smartAnimateAnimator from '../components/effect/smartAnimate.js';
import CardHover3DAnimator from '../components/effect/3dCardHover.js';
import outlineGradientAnimator from '../components/effect/outlineGradientAnimate.js';
import imageTrailAnimator from '../components/effect/imageTrail.js';

/* Utils */
import { setupScrollTriggerResize } from '../utils/animation/scrollTriggerHelper.js';

/**
 * Main WebflowBits class for CDN usage
 */
class WebflowBits {
  constructor() {
    this.version = '2.3.5';
    this.initialized = false;
    this.observers = [];
    this.resizeCleanup = null; // Cleanup function for resize handler
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
      gradientButton: gradientButtonAnimator,
      rippleButton: rippleButtonAnimator,
      pulseButton: pulseButtonAnimator,
      magnet: magnetAnimator,
      shuffle: shuffleAnimator,
      tooltipText: tooltipTextAnimator,
      smartAnimate: smartAnimateAnimator,
      rollText: rollTextAnimator,
      cardHover3d: CardHover3DAnimator,
      outlineGradient: outlineGradientAnimator,
      imageTrail: imageTrailAnimator,
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
      components: ['splitText', 'textType', 'blurText', 'shinyText', 'gradientText', 'gradientButton', 'rippleButton', 'pulseButton', 'decryptedText', 'scrambleText', 'variableProximity', 'countUp', 'rotatingText', 'textPressure', 'magnet', 'shuffle', 'tooltipText', 'rollText', 'cardHover3d', 'outlineGradient', 'imageTrail'],
      ...options
    };

    if (config.debug) {
      console.log('WebflowBits: Initializing...', { version: this.version, config });
    }

    // Setup ScrollTrigger resize handler for automatic updates
    // This ensures rootMargin with viewport units (vh, vw, %) update on window resize
    this.resizeCleanup = setupScrollTriggerResize(250);

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

      if (config.components.includes('gradientButton')) {
        this.initGradientButton(config.debug);
      }

      if (config.components.includes('rippleButton')) {
        this.initRippleButton(config.debug);
      }

      if (config.components.includes('pulseButton')) {
        this.initPulseButton(config.debug);
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


      if (config.components.includes('magnet')) {
        this.initMagnet(config.debug);
      }


      if (config.components.includes('shuffle')) {
        this.initShuffle(config.debug);
      }

      if (config.components.includes('tooltipText')) {
        this.initTooltipText(config.debug);
      }

      if (config.components.includes('rollText')) {
        this.initRollText(config.debug);
      };

      if (config.components.includes('cardHover3d')) {
        this.initCardHover3d(config.debug);
      }

      if (config.components.includes('outlineGradient')) {
        this.initOutlineGradientAnimate(config.debug);
      }

      if (config.components.includes('imageTrail')) {
        this.initImageTrail(config.debug);
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

      // Check Magnet conflicts
      const magnetConflicts = magnetAnimator.checkForConflicts();
      if (magnetConflicts) {
        allConflicts.push(...magnetConflicts);
      }

      // Check Shuffle conflicts
      const shuffleConflicts = shuffleAnimator.checkForConflicts();
      if (shuffleConflicts) {
        allConflicts.push(...shuffleConflicts);
      }

      // Check TooltipText conflicts
      const tooltipTextConflicts = tooltipTextAnimator.checkForConflicts();
      if (tooltipTextConflicts) {
        allConflicts.push(...tooltipTextConflicts);
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
   * Initialize GradientButton component
   */
  initGradientButton(debug = false) {
    try {
      gradientButtonAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: GradientButton initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize GradientButton', error);
    }
  }

  /**
   * Initialize RippleButton component
   */
  initRippleButton(debug = false) {
    try {
      rippleButtonAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: RippleButton initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize RippleButton', error);
    }
  }

  /**
   * Initialize PulseButton component
   */
  initPulseButton(debug = false) {
    try {
      pulseButtonAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: PulseButton initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize PulseButton', error);
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
   * Initialize Magnetic Button component
   */
  initMagnet(debug = false) {
    try {
      magnetAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: Magnetic Button initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize Magnetic Button', error);
    }
  }

  /**
   * Initialize Shuffle component
   */
  initShuffle(debug = false) {
    try {
      shuffleAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: Shuffle initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize Shuffle', error);
    }
  }

  /**
   * Initialize TooltipText component
   */
  initTooltipText(debug = false) {
    try {
      tooltipTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: TooltipText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize TooltipText', error);
    }
  }

  /**
   * Initialize RollText component
   */
  initRollText(debug = false) {
    try {
      rollTextAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: RollText initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize RollText', error);
    }
  }

  /**
   * Initialize 3D Card Hover component
   */
  initCardHover3d(debug = false) {
    try {
      CardHover3DAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: 3D Card Hover initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize 3D Card Hover', error);
    }
  }

  /**
   * Initialize Outline Gradient Animate component
   */
  initOutlineGradientAnimate(debug = false) {
    try {
      outlineGradientAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: Outline Gradient Animate initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize Outline Gradient Animate', error);
    }
  }

  /**
   * Initialize Image Trail component
   */
  initImageTrail(debug = false) {
    try {
      imageTrailAnimator.initAll();
      if (debug) {
        console.log('WebflowBits: Image Trail initialized');
      }
    } catch (error) {
      console.error('WebflowBits: Failed to initialize Image Trail', error);
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
              // Check for wb-component="split-text" elements
              const splitTextElements = node.matches?.('[wb-component="split-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="split-text"]') || []);

              splitTextElements.forEach(element => {
                splitTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="text-type" elements
              const textTypeElements = node.matches?.('[wb-component="text-type"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="text-type"]') || []);

              textTypeElements.forEach(element => {
                textTypeAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="blur-text" elements
              const blurTextElements = node.matches?.('[wb-component="blur-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="blur-text"]') || []);

              blurTextElements.forEach(element => {
                blurTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="shiny-text" elements
              const shinyTextElements = node.matches?.('[wb-component="shiny-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="shiny-text"]') || []);

              shinyTextElements.forEach(element => {
                shinyTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="gradient-text" elements
              const gradientTextElements = node.matches?.('[wb-component="gradient-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="gradient-text"]') || []);

              gradientTextElements.forEach(element => {
                gradientTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="gradient-button" elements
              const gradientButtonElements = node.matches?.('[wb-component="gradient-button"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="gradient-button"]') || []);

              gradientButtonElements.forEach(element => {
                gradientButtonAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="ripple-button" elements
              const rippleButtonElements = node.matches?.('[wb-component="ripple-button"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="ripple-button"]') || []);

              rippleButtonElements.forEach(element => {
                rippleButtonAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="pulse-button" elements
              const pulseButtonElements = node.matches?.('[wb-component="pulse-button"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="pulse-button"]') || []);

              pulseButtonElements.forEach(element => {
                pulseButtonAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="decrypt-text" elements
              const decryptedTextElements = node.matches?.('[wb-component="decrypted-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="decrypted-text"]') || []);

              decryptedTextElements.forEach(element => {
                decryptedTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="scramble-text" elements
              const scrambleTextElements = node.matches?.('[wb-component="scramble-text"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="scramble-text"]') || []);

              scrambleTextElements.forEach(element => {
                scrambleTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="variable-proximity" elements
              const variableProximityElements = node.matches?.('[wb-component="variable-proximity"]') 
                ? [node] 
                : Array.from(node.querySelectorAll?.('[wb-component="variable-proximity"]') || []);

              variableProximityElements.forEach(element => {
                variableProximityAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="count-up" elements
              const countUpElements = node.matches?.('[wb-component="count-up"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="count-up"]') || []);

              countUpElements.forEach(element => {
                countUpAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="rotating-text" elements
              const rotatingTextElements = node.matches?.('[wb-component="rotating-text"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="rotating-text"]') || []);

              rotatingTextElements.forEach(element => {
                rotatingTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="text-pressure" elements
              const textPressureElements = node.matches?.('[wb-component="text-pressure"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="text-pressure"]') || []);

              textPressureElements.forEach(element => {
                textPressureAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="magnetic-button" elements
              const magnetElements = node.matches?.('[wb-component="magnetic-button"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="magnetic-button"]') || []);

              magnetElements.forEach(element => {
                magnetAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="shuffle" elements
              const shuffleElements = node.matches?.('[wb-component="shuffle"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="shuffle"]') || []);

              shuffleElements.forEach(element => {
                shuffleAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="tooltip-text" elements
              const tooltipTextElements = node.matches?.('[wb-component="tooltip-text"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="tooltip-text"]') || []);

              tooltipTextElements.forEach(element => {
                tooltipTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="roll-text" elements
              const rollTextElements = node.matches?.('[wb-component="roll-text"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="roll-text"]'));

              rollTextElements.forEach(element => {
                rollTextAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="smart-animate" elements
              const smartAnimateElements = node.matches?.('[wb-component="smart-animate"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="smart-animate"]') || []);

              smartAnimateElements.forEach(element => {
                smartAnimateAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="3d-card-hover" elements
              const hover3dElements = node.matches?.('[wb-component="3d-card-hover"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="3d-card-hover"]') || []);

              hover3dElements.forEach(element => {
                CardHover3DAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="outline-gradient" elements
              const outlineGradientElements = node.matches?.('[wb-component="outline-gradient"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="outline-gradient"]') || []);

              outlineGradientElements.forEach(element => {
                outlineGradientAnimator.initElement(element);
                shouldRefresh = true;
              });

              // Check for wb-component="image-trail" elements
              const imageTrailElements = node.matches?.('[wb-component="image-trail"]')
                ? [node]
                : Array.from(node.querySelectorAll?.('[wb-component="image-trail"]') || []);

              imageTrailElements.forEach(element => {
                imageTrailAnimator.initElement(element);
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
          magnetAnimator.refresh();
          shuffleAnimator.refresh();
          tooltipTextAnimator.refresh();
          rollTextAnimator.refresh();
          outlineGradientAnimator.refresh();
          imageTrailAnimator.refresh();
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
      if (element.getAttribute('wb-component') === 'split-text') {
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
      if (element.getAttribute('wb-component') === 'text-type') {
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
      if (element.getAttribute('wb-component') === 'blur-text') {
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
      if (element.getAttribute('wb-component') === 'shiny-text') {
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
      if (element.getAttribute('wb-component') === 'gradient-text') {
        gradientTextAnimator.initElement(element);
      }
    });

    gradientTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize GradientButton on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initGradientButtonOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'gradient-button') {
        gradientButtonAnimator.initElement(element);
      }
    });

    gradientButtonAnimator.refresh();
    return this;
  }

  initRippleButtonOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'ripple-button') {
        rippleButtonAnimator.initElement(element);
      }
    });
    return this;
  }

  initPulseButtonOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;

    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'pulse-button') {
        pulseButtonAnimator.initElement(element);
      }
    });
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
      if (element.getAttribute('wb-component') === 'decrypted-text') {
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
      if (element.getAttribute('wb-component') === 'scramble-text') {
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
      if (element.getAttribute('wb-component') === 'variable-proximity') {
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
      if (element.getAttribute('wb-component') === 'count-up') {
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
      if (element.getAttribute('wb-component') === 'rotating-text') {
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
      if (element.getAttribute('wb-component') === 'text-pressure') {
        textPressureAnimator.initElement(element);
      }
    });

    textPressureAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize Magnetic Button on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initMagnetOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'magnetic-button') {
        magnetAnimator.initElement(element);
      }
    });

    magnetAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize Shuffle on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initShuffleOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'shuffle') {
        shuffleAnimator.initElement(element);
      }
    });

    shuffleAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize TooltipText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initTooltipTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'tooltip-text') {
        tooltipTextAnimator.initElement(element);
      }
    });

    tooltipTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize TooltipText on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initrollTextOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'roll-text') {
        rollTextAnimator.initElement(element);
      }
    });

    rollTextAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize SmartAnimate on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initSmartAnimateOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'smart-animate') {
        smartAnimateAnimator.initElement(element);
      }
    });

    smartAnimateAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize CardHover3D on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initCardHover3DteOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === '3d-card-hover') {
        smartAnimateAnimator.initElement(element);
      }
    });

    CardHover3DAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize OutlineGradientAnimate on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initOutlineGradientAnimateOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'outline-gradient') {
        outlineGradientAnimator.initElement(element);
      }
    });

    outlineGradientAnimator.refresh();
    return this;
  }

  /**
   * Manually initialize ImageTrail on specific elements
   * @param {string|NodeList|Element} selector - CSS selector or DOM elements
   */
  initImageTrailAnimateOn(selector) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector)
      : selector.nodeType ? [selector] : selector;
    
    Array.from(elements).forEach(element => {
      if (element.getAttribute('wb-component') === 'image-trail') {
        imageTrailAnimator.initElement(element);
      }
    });

    imageTrailAnimator.refresh();
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
    
    // Destroy GradientButton animations
    gradientButtonAnimator.destroyAll();
    
    // Destroy RippleButton animations
    rippleButtonAnimator.destroyAll();
    
    // Destroy PulseButton animations
    pulseButtonAnimator.destroyAll();
    
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

    // Destroy Magnet animations
    magnetAnimator.destroyAll();

    // Destroy Shuffle animations
    shuffleAnimator.destroyAll();

    // Destroy TooltipText animations
    tooltipTextAnimator.destroyAll();

    // Destroy TooltipText animations
    rollTextAnimator.destroyAll();

    // Destroy CardHover3D animations
    CardHover3DAnimator.destroyAll();

    // Destroy OutlineGradientAnimate animations
    outlineGradientAnimator.destroyAll();

     // Destroy ImageTrail animations
    imageTrailAnimator.destroyAll();

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Cleanup resize handler
    if (this.resizeCleanup) {
      this.resizeCleanup();
      this.resizeCleanup = null;
    }

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
    magnetAnimator.refresh();
    shuffleAnimator.refresh();
    tooltipTextAnimator.refresh();
    rollTextAnimator.refresh();
    outlineGradientAnimator.refresh();
    imageTrailAnimator.refresh();
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
  if (!document.currentScript?.type?.includes('module') && !webflowBits.initialized) {
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