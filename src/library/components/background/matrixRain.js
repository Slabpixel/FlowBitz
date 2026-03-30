/**
 * FlowBitz - Matrix Rain Component
 * Renders a Matrix Digital Rain animation on a <canvas> injected inside
 * a <section> or <div> container.
 *
 * Uses pure Canvas 2D API + setInterval + ResizeObserver — no GSAP dependency.
 *
 * @version 2.5.0
 * @author Slabpixel Studio
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseAttribute } from '../../utils/core/attributeParser.js';
import { colorToRgba } from '../../utils/core/colorUtils.js';

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

const COMPONENT_CSS = `
/* FlowBitz - MatrixRain Component Styles */
.wb-matrix-rain-container {
  position: relative;
}

.wb-matrix-rain-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
}

.wb-matrix-rain-content {
  position: relative;
  z-index: 1;
}
`;

// ---------------------------------------------------------------------------
// Character sets
// ---------------------------------------------------------------------------

const KATAKANA =
  'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MATRIX_CHARS = (KATAKANA + LATIN).split('');
const BINARY_CHARS = ['0', '1'];

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_CONFIG = {
  fontSizeRaw: '18px',
  fontSize: 18,
  background: '#000000',
  textAlpha: 0.05,
  speed: 40,
  charMode: 'matrix',
  textColor: '#00FF00',
  highlightHead: false,
};

// ---------------------------------------------------------------------------
// MatrixRainAnimator class
// ---------------------------------------------------------------------------

class MatrixRainAnimator {
  constructor() {
    /** @type {Map<Element, Object>} */
    this.instances = new Map();
    this.stylesInjected = false;
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  injectComponentStyles() {
    if (this.stylesInjected) return;
    injectStyles('wb-matrix-rain-styles', COMPONENT_CSS);
    this.stylesInjected = true;
  }

  // ── Font size parsing ─────────────────────────────────────────────────────

  /**
   * Parse a CSS font-size string (px / rem / em) to a numeric pixel value.
   * Falls back to DEFAULT_CONFIG.fontSize if value is invalid or < 8.
   *
   * @param {string} value - e.g. "18px", "1.5rem", "1em"
   * @param {Element} element - Container element (needed for em resolution)
   * @returns {number} Pixel font size
   */
  parseFontSize(value, element) {
    if (!value || typeof value !== 'string') return DEFAULT_CONFIG.fontSize;

    const trimmed = value.trim();

    // px
    const pxMatch = trimmed.match(/^([\d.]+)px$/i);
    if (pxMatch) {
      const px = parseFloat(pxMatch[1]);
      if (px < 8) {
        console.warn(
          `WebflowBits MatrixRain: wb-font-size "${value}" is below minimum 8px. Using default 18px.`
        );
        return DEFAULT_CONFIG.fontSize;
      }
      return px;
    }

    // rem
    const remMatch = trimmed.match(/^([\d.]+)rem$/i);
    if (remMatch) {
      try {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        const px = parseFloat(remMatch[1]) * (rootFontSize || 16);
        if (px < 8) {
          console.warn(
            `WebflowBits MatrixRain: wb-font-size "${value}" resolves to ${px}px, below minimum 8px. Using default 18px.`
          );
          return DEFAULT_CONFIG.fontSize;
        }
        return px;
      } catch (_) {
        return DEFAULT_CONFIG.fontSize;
      }
    }

    // em
    const emMatch = trimmed.match(/^([\d.]+)em$/i);
    if (emMatch) {
      try {
        const parentFontSize = parseFloat(getComputedStyle(element).fontSize);
        const px = parseFloat(emMatch[1]) * (parentFontSize || 16);
        if (px < 8) {
          console.warn(
            `WebflowBits MatrixRain: wb-font-size "${value}" resolves to ${px}px, below minimum 8px. Using default 18px.`
          );
          return DEFAULT_CONFIG.fontSize;
        }
        return px;
      } catch (_) {
        return DEFAULT_CONFIG.fontSize;
      }
    }

    console.warn(
      `WebflowBits MatrixRain: wb-font-size "${value}" has no valid unit (px/rem/em). Using default 18px.`
    );
    return DEFAULT_CONFIG.fontSize;
  }

  // ── Config parsing ────────────────────────────────────────────────────────

  /**
   * Parse all wb-* attributes from a container element into a config object.
   *
   * @param {Element} element
   * @returns {Object} Resolved config
   */
  parseConfig(element) {
    const config = { ...DEFAULT_CONFIG };

    // wb-font-size
    const fontSizeRaw = element.getAttribute('wb-font-size');
    if (fontSizeRaw) {
      config.fontSizeRaw = fontSizeRaw;
      config.fontSize = this.parseFontSize(fontSizeRaw, element);
    }

    // wb-background
    const bgRaw = element.getAttribute('wb-background');
    if (bgRaw) {
      const validated = parseAttribute.color(element, 'wb-background');
      if (validated) {
        config.background = validated;
      } else {
        console.warn(
          `WebflowBits MatrixRain: Invalid wb-background "${bgRaw}". Using default #000000.`
        );
      }
    }

    // wb-text-alpha — clamp 0.05..1.0
    const alphaRaw = element.getAttribute('wb-text-alpha');
    if (alphaRaw !== null) {
      const parsed = parseFloat(alphaRaw);
      if (isNaN(parsed)) {
        console.warn(
          `WebflowBits MatrixRain: wb-text-alpha "${alphaRaw}" is not a valid float. Using default 0.05.`
        );
      } else if (parsed < 0.05) {
        console.warn(
          `WebflowBits MatrixRain: wb-text-alpha ${parsed} is below minimum 0.05. Clamping to 0.05.`
        );
        config.textAlpha = 0.05;
      } else if (parsed > 1.0) {
        console.warn(
          `WebflowBits MatrixRain: wb-text-alpha ${parsed} is above maximum 1.0. Clamping to 1.0.`
        );
        config.textAlpha = 1.0;
      } else {
        config.textAlpha = parsed;
      }
    }

    // wb-speed — clamp 5..200
    const speedRaw = element.getAttribute('wb-speed');
    if (speedRaw !== null) {
      const parsed = parseInt(speedRaw, 10);
      if (isNaN(parsed)) {
        console.warn(
          `WebflowBits MatrixRain: wb-speed "${speedRaw}" is not a valid integer. Using default 40ms.`
        );
      } else if (parsed < 5) {
        console.warn(
          `WebflowBits MatrixRain: wb-speed ${parsed} is below minimum 5ms. Clamping to 5.`
        );
        config.speed = 5;
      } else if (parsed > 200) {
        console.warn(
          `WebflowBits MatrixRain: wb-speed ${parsed} is above maximum 200ms. Clamping to 200.`
        );
        config.speed = 200;
      } else {
        config.speed = parsed;
      }
    }

    // wb-char-mode
    const charModeRaw = element.getAttribute('wb-char-mode');
    if (charModeRaw !== null) {
      if (charModeRaw === 'matrix' || charModeRaw === 'binary') {
        config.charMode = charModeRaw;
      } else {
        console.warn(
          `WebflowBits MatrixRain: wb-char-mode "${charModeRaw}" is invalid. Valid values: matrix, binary. Using default "matrix".`
        );
      }
    }

    // wb-text-color
    const textColorRaw = element.getAttribute('wb-text-color');
    if (textColorRaw) {
      const validated = parseAttribute.color(element, 'wb-text-color');
      if (validated) {
        config.textColor = validated;
      } else {
        console.warn(
          `WebflowBits MatrixRain: Invalid wb-text-color "${textColorRaw}". Using default #00FF00.`
        );
      }
    }

    // wb-highlight-head
    const highlightRaw = element.getAttribute('wb-highlight-head');
    if (highlightRaw !== null) {
      config.highlightHead = highlightRaw !== 'false';
    }

    return config;
  }

  // ── Char set ──────────────────────────────────────────────────────────────

  /**
   * @param {'matrix'|'binary'} charMode
   * @returns {string[]}
   */
  getCharSet(charMode) {
    return charMode === 'binary' ? BINARY_CHARS : MATRIX_CHARS;
  }

  // ── Canvas setup ──────────────────────────────────────────────────────────

  /**
   * Inject a <canvas> as the first child of the container and wrap existing
   * children in a .wb-matrix-rain-content div.
   *
   * @param {Element} element - Container element
   * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }}
   */
  setupCanvas(element) {
    element.classList.add('wb-matrix-rain-container');

    // Wrap existing children so they stay above the canvas
    const existingChildren = Array.from(element.childNodes);
    if (existingChildren.length > 0) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('wb-matrix-rain-content');
      existingChildren.forEach((child) => wrapper.appendChild(child));
      element.appendChild(wrapper);
    }

    // Create and prepend canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('wb-matrix-rain-canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    element.insertBefore(canvas, element.firstChild);

    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }

  // ── Animation loop ────────────────────────────────────────────────────────

  /**
   * Start the setInterval animation loop for a given instance.
   * If the canvas has zero height, defers until ResizeObserver fires.
   *
   * @param {Object} instance
   */
  startAnimation(instance) {
    const { canvas, ctx, config } = instance;
    const { fontSize, charMode, textColor, textAlpha, background, highlightHead, speed } = config;

    if (canvas.height === 0) {
      instance.pendingInit = true;
      return;
    }

    instance.pendingInit = false;

    const chars = this.getCharSet(charMode);
    const columns = Math.floor(canvas.width / fontSize);
    instance.drops = new Array(columns).fill(1);

    // Pre-compute the trail background rgba string
    const trailBg = colorToRgba(background, textAlpha);

    const tick = () => {
      // Fade trail
      ctx.fillStyle = trailBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      const { drops } = instance;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Head highlight: draw leading character in white
        ctx.fillStyle = highlightHead ? '#FFFFFF' : textColor;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset fillStyle for next iteration consistency
        ctx.fillStyle = textColor;

        // Probabilistic column reset after reaching bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    instance.intervalId = setInterval(tick, speed);
  }

  // ── Resize ────────────────────────────────────────────────────────────────

  /**
   * Handle container resize: stop current interval, resize canvas,
   * recalculate columns, restart animation.
   *
   * @param {Object} instance
   * @param {Element} element
   */
  handleResize(instance, element) {
    const { canvas, config } = instance;

    // Stop current loop
    if (instance.intervalId) {
      clearInterval(instance.intervalId);
      instance.intervalId = null;
    }

    // Update canvas dimensions
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;

    // Recalculate fontSize for em/rem (container size may have changed)
    if (config.fontSizeRaw) {
      config.fontSize = this.parseFontSize(config.fontSizeRaw, element);
    }

    // Restart (handles pendingInit guard internally)
    this.startAnimation(instance);
  }

  // ── ResizeObserver ────────────────────────────────────────────────────────

  /**
   * @param {Element} element
   * @returns {ResizeObserver}
   */
  setupResizeObserver(element) {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const instance = this.instances.get(entry.target);
        if (!instance) continue;

        if (instance.pendingInit) {
          // Container became visible — start for the first time
          const canvas = instance.canvas;
          canvas.width = element.offsetWidth;
          canvas.height = element.offsetHeight;
          if (canvas.height > 0) {
            this.startAnimation(instance);
          }
        } else {
          this.handleResize(instance, entry.target);
        }
      }
    });

    observer.observe(element);
    return observer;
  }

  // ── Page Visibility ───────────────────────────────────────────────────────

  /**
   * Pause the interval when the tab is hidden, resume when visible.
   * Saves CPU on inactive tabs.
   *
   * @param {Object} instance
   * @param {Element} element
   */
  setupVisibilityListener(instance, element) {
    const handler = () => {
      if (document.hidden) {
        if (instance.intervalId) {
          clearInterval(instance.intervalId);
          instance.intervalId = null;
        }
      } else {
        if (!instance.intervalId && !instance.pendingInit) {
          this.startAnimation(instance);
        }
      }
    };

    document.addEventListener('visibilitychange', handler);
    instance.visibilityHandler = handler;
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Initialise a single element.
   *
   * @param {Element} element
   */
  initElement(element) {
    if (typeof document === 'undefined') return;

    // Guard: only section and div
    const tag = element.tagName?.toUpperCase();
    if (tag !== 'SECTION' && tag !== 'DIV') {
      console.warn(
        `WebflowBits MatrixRain: wb-component="matrix-rain" is only supported on <section> and <div> elements. Got <${tag?.toLowerCase() ?? 'unknown'}>.`
      );
      return;
    }

    // Guard: prevent double init
    if (this.instances.has(element)) {
      console.warn(
        'WebflowBits MatrixRain: Element is already initialized. Skipping.'
      );
      return;
    }

    this.injectComponentStyles();

    const config = this.parseConfig(element);
    const { canvas, ctx } = this.setupCanvas(element);

    const instance = {
      canvas,
      ctx,
      config,
      drops: [],
      intervalId: null,
      resizeObserver: null,
      visibilityHandler: null,
      pendingInit: false,
    };

    this.instances.set(element, instance);

    this.startAnimation(instance);
    instance.resizeObserver = this.setupResizeObserver(element);
    this.setupVisibilityListener(instance, element);
  }

  /**
   * Initialise all [wb-component="matrix-rain"] elements in the document.
   */
  initAll() {
    if (typeof document === 'undefined') return;
    const elements = document.querySelectorAll('[wb-component="matrix-rain"]');
    elements.forEach((el) => this.initElement(el));
  }

  /**
   * Destroy a single element instance — cleans up interval, observer, canvas.
   *
   * @param {Element} element
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Stop animation
    if (instance.intervalId) {
      clearInterval(instance.intervalId);
      instance.intervalId = null;
    }

    // Disconnect resize observer
    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
      instance.resizeObserver = null;
    }

    // Remove visibility listener
    if (instance.visibilityHandler) {
      document.removeEventListener('visibilitychange', instance.visibilityHandler);
      instance.visibilityHandler = null;
    }

    // Remove canvas from DOM
    if (instance.canvas && instance.canvas.parentNode === element) {
      element.removeChild(instance.canvas);
    }

    // Unwrap .wb-matrix-rain-content — restore children directly to container
    const contentWrapper = element.querySelector(':scope > .wb-matrix-rain-content');
    if (contentWrapper) {
      while (contentWrapper.firstChild) {
        element.appendChild(contentWrapper.firstChild);
      }
      element.removeChild(contentWrapper);
    }

    // Remove container class
    element.classList.remove('wb-matrix-rain-container');

    this.instances.delete(element);
  }

  /**
   * Destroy all active instances.
   */
  destroyAll() {
    this.instances.forEach((_, element) => this.destroyElement(element));
  }

  /**
   * Refresh: destroy all and re-init from DOM.
   */
  refresh() {
    this.destroyAll();
    this.initAll();
  }

  /**
   * Check for CSS conflicts (none expected for this component).
   * @returns {Array}
   */
  checkForConflicts() {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Singleton export
// ---------------------------------------------------------------------------

const matrixRainAnimator = new MatrixRainAnimator();
export default matrixRainAnimator;
export { MatrixRainAnimator };
