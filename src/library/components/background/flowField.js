/**
 * FlowBitz - Flow Field Background Component
 * Animated particle trails following a sinusoidal vector field.
 * Particles traverse a pre-computed angle grid, leaving history-based trails.
 * Zero external dependencies — pure Canvas 2D + requestAnimationFrame.
 *
 * Visual reference: https://codepen.io/franksLaboratory/pen/LYJKONw (Frank's Laboratory)
 * Algorithm: Sinusoidal flow field (sin + cos), per-particle history trail, Canvas 2D.
 *
 * @version 1.0.0
 * @author Slabpixel Studio
 */

import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseAttribute } from "../../utils/core/attributeParser.js";

// ── CSS ───────────────────────────────────────────────────────────────────────

const COMPONENT_CSS = `
/* FlowBitz - FlowField Component Styles */
.wb-flow-field-container {
  position: relative;
}

.wb-flow-field-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
  z-index: 0;
}

.wb-flow-field-content {
  position: relative;
  z-index: 1;
}
`;

// ── Constants ─────────────────────────────────────────────────────────────────

const TARGET_SELECTOR = '[wb-component="flow-field"]';
const INSTANCE_MARKER_ATTR = "data-wb-flow-field-mounted";
const ALLOWED_TAGS = new Set(["DIV", "SECTION"]);

// ── Palette Map ───────────────────────────────────────────────────────────────

const PALETTE_MAP = {
  purple: ["#4c026b", "#730d9e", "#9622c7", "#b44ae0", "#cd72f2", "#ffffff"],
  blue: ["#001f5b", "#003d9e", "#0066cc", "#4da6ff", "#99ccff", "#ffffff"],
  fire: ["#7f0000", "#cc0000", "#ff4400", "#ff8800", "#ffcc00", "#ffffff"],
  ocean: ["#002233", "#004466", "#006699", "#00aacc", "#44ddee", "#ffffff"],
  mono: ["#111111", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"],
};

// ── Default Config ────────────────────────────────────────────────────────────

const DEFAULT_CONFIG = {
  count: 300,
  cellSize: 10,
  curve: 6,
  zoom: 0.01,
  speed: 2,
  maxTail: 80,
  lineThickness: 1,
  background: "transparent",
  palette: "purple",
  particleColor: null,
  debug: false,
  // Derived at parse time
  resolvedPalette: [
    "#4c026b",
    "#730d9e",
    "#9622c7",
    "#b44ae0",
    "#cd72f2",
    "#ffffff",
  ],
};

// ── Config Parser ─────────────────────────────────────────────────────────────

/**
 * Parse all wb-* attributes from element into a validated config object.
 * All values are clamped, type-validated, and fallback to DEFAULT_CONFIG.
 * prefers-reduced-motion is handled here (speed clamp).
 *
 * @param {Element} element
 * @returns {Object} resolved config
 */
function parseConfig(element) {
  if (typeof window === "undefined") return { ...DEFAULT_CONFIG };

  const config = { ...DEFAULT_CONFIG };

  // wb-count [50–2000, warn >800]
  const countRaw = element.getAttribute("wb-count");
  if (countRaw !== null) {
    const parsed = parseInt(countRaw, 10);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-count "${countRaw}" is not valid. Using default ${DEFAULT_CONFIG.count}.`,
      );
    } else {
      const clamped = Math.max(50, Math.min(2000, parsed));
      if (parsed !== clamped) {
        console.warn(
          `FlowBitz FlowField: wb-count ${parsed} clamped to ${clamped}.`,
        );
      }
      if (clamped > 800) {
        console.warn(
          `FlowBitz FlowField: wb-count ${clamped} may impact performance. Recommend keeping below 500 on mobile.`,
        );
      }
      config.count = clamped;
    }
  }

  // wb-cell-size [3–30]
  const cellSizeRaw = element.getAttribute("wb-cell-size");
  if (cellSizeRaw !== null) {
    const parsed = parseInt(cellSizeRaw, 10);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-cell-size "${cellSizeRaw}" is not valid. Using default ${DEFAULT_CONFIG.cellSize}.`,
      );
    } else {
      config.cellSize = Math.max(3, Math.min(30, parsed));
    }
  }

  // wb-curve [1–20]
  const curveRaw = element.getAttribute("wb-curve");
  if (curveRaw !== null) {
    const parsed = parseFloat(curveRaw);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-curve "${curveRaw}" is not valid. Using default ${DEFAULT_CONFIG.curve}.`,
      );
    } else {
      config.curve = Math.max(1, Math.min(20, parsed));
    }
  }

  // wb-zoom [0.001–0.1]
  const zoomRaw = element.getAttribute("wb-zoom");
  if (zoomRaw !== null) {
    const parsed = parseFloat(zoomRaw);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-zoom "${zoomRaw}" is not valid. Using default ${DEFAULT_CONFIG.zoom}.`,
      );
    } else {
      config.zoom = Math.max(0.001, Math.min(0.1, parsed));
    }
  }

  // wb-speed [0.5–8]
  const speedRaw = element.getAttribute("wb-speed");
  if (speedRaw !== null) {
    const parsed = parseFloat(speedRaw);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-speed "${speedRaw}" is not valid. Using default ${DEFAULT_CONFIG.speed}.`,
      );
    } else {
      const clamped = Math.max(0.5, Math.min(8, parsed));
      if (parsed !== clamped) {
        console.warn(
          `FlowBitz FlowField: wb-speed ${parsed} clamped to ${clamped}.`,
        );
      }
      config.speed = clamped;
    }
  }

  // wb-max-tail [10–300]
  const maxTailRaw = element.getAttribute("wb-max-tail");
  if (maxTailRaw !== null) {
    const parsed = parseInt(maxTailRaw, 10);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz FlowField: wb-max-tail "${maxTailRaw}" is not valid. Using default ${DEFAULT_CONFIG.maxTail}.`,
      );
    } else {
      config.maxTail = Math.max(10, Math.min(300, parsed));
    }
  }

  // wb-line-thickness [0.5–3]
  const thicknessRaw = element.getAttribute("wb-line-thickness");
  if (thicknessRaw !== null) {
    const parsed = parseFloat(thicknessRaw);
    if (!isNaN(parsed)) {
      config.lineThickness = Math.max(0.5, Math.min(3, parsed));
    }
  }

  // wb-background ['transparent' or CSS color]
  const bgRaw = element.getAttribute("wb-background");
  if (bgRaw !== null) {
    if (bgRaw === "transparent") {
      config.background = "transparent";
    } else {
      const validated = parseAttribute.color(element, "wb-background");
      if (validated) {
        config.background = validated;
      } else {
        console.warn(
          `FlowBitz FlowField: Invalid wb-background "${bgRaw}". Using transparent.`,
        );
        config.background = "transparent";
      }
    }
  }

  // wb-palette [purple|blue|fire|ocean|mono|custom]
  const paletteRaw = element.getAttribute("wb-palette");
  if (paletteRaw !== null) {
    if (paletteRaw === "custom") {
      config.palette = "custom";
    } else if (PALETTE_MAP[paletteRaw]) {
      config.palette = paletteRaw;
    } else {
      console.warn(
        `FlowBitz FlowField: wb-palette "${paletteRaw}" is not valid. Using "purple".`,
      );
      config.palette = "purple";
    }
  }

  // wb-particle-color [CSS color — only used when palette=custom]
  const particleColorRaw = parseAttribute.color(element, "wb-particle-color");
  if (particleColorRaw) {
    config.particleColor = particleColorRaw;
  }

  // Validate custom palette has a color
  if (config.palette === "custom") {
    if (!config.particleColor) {
      console.warn(
        'FlowBitz FlowField: wb-palette="custom" requires wb-particle-color. Falling back to "purple".',
      );
      config.palette = "purple";
    }
  }

  // Resolve palette to array (done once at parse time, not per-frame)
  config.resolvedPalette =
    config.palette === "custom"
      ? [config.particleColor]
      : PALETTE_MAP[config.palette];

  // wb-debug [boolean]
  const debugRaw = parseAttribute.boolean(element, "wb-debug");
  if (debugRaw !== null) {
    config.debug = debugRaw;
  }

  // prefers-reduced-motion: clamp speed (silent, no warn)
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    config.speed = Math.min(config.speed, 0.5);
  }

  return config;
}

// ── Flow Field Computation ────────────────────────────────────────────────────

/**
 * Compute the sinusoidal flow field angle array for the given instance.
 * Pre-allocates a 1D array of size rows×cols.
 * Formula: angle = (sin(x * zoom) + cos(y * zoom)) * curve
 * Must be called before startAnimation and after every resize.
 *
 * @param {Object} instance
 */
function computeFlowField(instance) {
  const { canvas, config } = instance;
  instance.rows = Math.floor(canvas.height / config.cellSize);
  instance.cols = Math.floor(canvas.width / config.cellSize);

  const total = instance.rows * instance.cols;
  instance.flowField = new Array(total);

  for (let y = 0; y < instance.rows; y++) {
    for (let x = 0; x < instance.cols; x++) {
      instance.flowField[y * instance.cols + x] =
        (Math.sin(x * config.zoom) + Math.cos(y * config.zoom)) * config.curve;
    }
  }
}

// ── Particle Factory ──────────────────────────────────────────────────────────

/**
 * Create a new particle with random position, speed modifier, and palette color.
 * History is initialised with one point (start position).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} config
 * @returns {Object} particle state
 */
function createParticle(canvas, config) {
  const maxTailLength = Math.floor(Math.random() * config.maxTail + 10);
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  return {
    x,
    y,
    speedModifier: Math.random() * (config.speed - 0.5) + 0.5,
    history: [{ x, y }],
    maxLength: maxTailLength,
    timer: maxTailLength * 2,
    color:
      config.resolvedPalette[
        Math.floor(Math.random() * config.resolvedPalette.length)
      ],
  };
}

/**
 * Reset a particle to a new random position.
 * Reuses the existing history array to avoid GC allocation.
 *
 * @param {Object} p - particle state object
 * @param {HTMLCanvasElement} canvas
 */
function resetParticle(p, canvas) {
  p.x = Math.floor(Math.random() * canvas.width);
  p.y = Math.floor(Math.random() * canvas.height);
  p.history.length = 0;
  p.history.push({ x: p.x, y: p.y });
  p.timer = p.maxLength * 2;
}

// ── Debug Grid ────────────────────────────────────────────────────────────────

/**
 * Draw the flow field cell grid overlay.
 * Only called when config.debug === true.
 * Uses ctx.save/restore so it does not affect trail drawing state.
 *
 * @param {Object} instance
 */
function drawGrid(instance) {
  const { ctx, config } = instance;
  const w = instance.canvas.width;
  const h = instance.canvas.height;

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 0.3;

  for (let c = 0; c <= instance.cols; c++) {
    ctx.beginPath();
    ctx.moveTo(config.cellSize * c, 0);
    ctx.lineTo(config.cellSize * c, h);
    ctx.stroke();
  }
  for (let r = 0; r <= instance.rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, config.cellSize * r);
    ctx.lineTo(w, config.cellSize * r);
    ctx.stroke();
  }

  ctx.restore();
}

// ── FlowFieldAnimator Class ───────────────────────────────────────────────────

class FlowFieldAnimator {
  constructor() {
    /** @type {Map<Element, Object>} */
    this.instances = new Map();
    this.stylesInjected = false;
    this.domReady = false;
    this.initScheduled = false;
    this.reconcileScheduled = false;
    this.mutationObserver = null;
    this.domReadyHandler = null;
    this.multiInstanceWarnShown = false;
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  injectComponentStyles() {
    if (this.stylesInjected) return;
    injectStyles("wb-flow-field-styles", COMPONENT_CSS);
    this.stylesInjected = true;
  }

  // ── Canvas Setup ──────────────────────────────────────────────────────────

  /**
   * Inject canvas as firstChild of container and wrap existing children
   * in a content wrapper so they remain above the canvas (z-index:1).
   *
   * @param {Element} element
   * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } | null}
   */
  setupCanvas(element) {
    element.classList.add("wb-flow-field-container");

    const existingChildren = Array.from(element.childNodes);
    if (existingChildren.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wb-flow-field-content");
      existingChildren.forEach((child) => wrapper.appendChild(child));
      element.appendChild(wrapper);
    }

    const canvas = document.createElement("canvas");
    canvas.classList.add("wb-flow-field-canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = element.offsetWidth || 0;
    canvas.height = element.offsetHeight || 0;
    element.insertBefore(canvas, element.firstChild);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn(
        "FlowBitz FlowField: Canvas 2D API is not supported in this environment.",
      );
      return null;
    }

    return { canvas, ctx };
  }

  // ── Animation Loop ────────────────────────────────────────────────────────

  /**
   * Start (or restart) the RAF render loop.
   * Sequence per frame:
   *   1. Clear / fill background
   *   2. Update each particle (flow field lookup → move → boundary check → timer/history)
   *   3. Draw each particle trail (lineTo history loop)
   *   4. Draw debug grid if enabled
   *
   * @param {Object} instance
   */
  startAnimation(instance) {
    const { canvas, ctx, config } = instance;

    if (canvas.height === 0) {
      instance.pendingInit = true;
      return;
    }

    instance.pendingInit = false;

    // Pre-populate all particles so the canvas is not empty on first frame
    if (instance.particles.length === 0) {
      for (let i = 0; i < config.count; i++) {
        instance.particles.push(createParticle(canvas, config));
      }
    }

    const maxIndex = instance.flowField.length - 1;

    const loop = () => {
      // ── Step 1: Clear / fill background ──────────────────────────────────
      if (config.background === "transparent") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = config.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.lineWidth = config.lineThickness;

      // ── Step 2 & 3: Update + Draw each particle ───────────────────────────
      for (let i = 0; i < instance.particles.length; i++) {
        const p = instance.particles[i];

        // Flow field lookup with out-of-bounds clamp
        const cx = Math.floor(p.x / config.cellSize);
        const cy = Math.floor(p.y / config.cellSize);
        const index = Math.max(0, Math.min(maxIndex, cy * instance.cols + cx));
        const angle = instance.flowField[index];

        // Move particle
        p.x += Math.cos(angle) * p.speedModifier;
        p.y += Math.sin(angle) * p.speedModifier;

        // Boundary check: particle left canvas → reset
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          resetParticle(p, canvas);
          continue;
        }

        // Timer + history management
        p.timer--;
        if (p.timer >= 1) {
          p.history.push({ x: p.x, y: p.y });
          if (p.history.length > p.maxLength) {
            p.history.shift();
          }
        } else if (p.history.length > 1) {
          p.history.shift();
        } else {
          resetParticle(p, canvas);
          continue;
        }

        // Draw trail (lineTo loop — the core visual)
        if (p.history.length < 2) continue;
        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let j = 1; j < p.history.length; j++) {
          ctx.lineTo(p.history[j].x, p.history[j].y);
        }
        ctx.stroke();
      }

      // ── Step 4: Debug grid (only when wb-debug="true") ────────────────────
      // ⚠️  Remember to comment out wb-debug="true" in HTML after debugging
      if (config.debug) {
        drawGrid(instance);
      }

      instance.rafId = requestAnimationFrame(loop);
    };

    instance.rafId = requestAnimationFrame(loop);
  }

  // ── Resize Handling ───────────────────────────────────────────────────────

  /**
   * Cancel RAF, resize canvas, recompute flow field, reset particles, restart.
   * Flow field MUST be recomputed after resize — rows/cols change.
   *
   * @param {Object} instance
   * @param {Element} element
   */
  handleResize(instance, element) {
    if (instance.rafId) {
      cancelAnimationFrame(instance.rafId);
      instance.rafId = null;
    }

    instance.canvas.width = element.offsetWidth;
    instance.canvas.height = element.offsetHeight;
    instance.particles = [];

    computeFlowField(instance);
    this.startAnimation(instance);
  }

  /**
   * Observe container for size changes.
   * Handles pendingInit (height=0 at startup) and mid-animation resize.
   *
   * @param {Element} element
   * @returns {ResizeObserver}
   */
  setupResizeObserver(element) {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const instance = this.instances.get(entry.target);
        if (!instance) continue;

        if (instance.pendingInit) {
          instance.canvas.width = element.offsetWidth;
          instance.canvas.height = element.offsetHeight;
          if (instance.canvas.height > 0) {
            computeFlowField(instance);
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
   * Pause RAF when tab is hidden, resume when visible.
   * Particle state (positions, history, timers) is preserved across pause/resume.
   *
   * @param {Object} instance
   */
  setupVisibilityListener(instance) {
    const handler = () => {
      if (document.hidden) {
        if (instance.rafId) {
          cancelAnimationFrame(instance.rafId);
          instance.rafId = null;
        }
      } else {
        if (!instance.rafId && !instance.pendingInit) {
          this.startAnimation(instance);
        }
      }
    };

    document.addEventListener("visibilitychange", handler);
    instance.visibilityHandler = handler;
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────

  /**
   * Destroy a single instance — 12-step cleanup.
   * Returns container to its exact pre-init state.
   *
   * @param {Element} element
   */
  destroyElement(element) {
    if (typeof document === "undefined") return;

    const instance = this.instances.get(element);
    if (!instance) return;

    // 1. Cancel animation frame
    if (instance.rafId) {
      cancelAnimationFrame(instance.rafId);
      instance.rafId = null;
    }

    // 2. Clear idle timeout (future-proof)
    clearTimeout(instance.idleTimeoutId);
    instance.idleTimeoutId = null;

    // 3. Disconnect ResizeObserver
    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
      instance.resizeObserver = null;
    }

    // 4. Remove visibilitychange listener
    if (instance.visibilityHandler) {
      document.removeEventListener(
        "visibilitychange",
        instance.visibilityHandler,
      );
      instance.visibilityHandler = null;
    }

    // 5. Remove mousemove listener (future-proof slot)
    if (instance.mousemoveHandler) {
      element.removeEventListener("mousemove", instance.mousemoveHandler);
      instance.mousemoveHandler = null;
    }

    // 6. Remove canvas from DOM
    if (instance.canvas && instance.canvas.parentNode === element) {
      element.removeChild(instance.canvas);
    }

    // 7. Unwrap content wrapper — restore children to container
    const wrapper = element.querySelector(":scope > .wb-flow-field-content");
    if (wrapper) {
      while (wrapper.firstChild) {
        element.appendChild(wrapper.firstChild);
      }
      element.removeChild(wrapper);
    }

    // 8. Remove container class
    element.classList.remove("wb-flow-field-container");

    // 9. Remove marker attribute
    element.removeAttribute(INSTANCE_MARKER_ATTR);

    // 10. Clear particle and flow field data (allow GC of large arrays)
    instance.particles = [];
    instance.flowField = null;

    // 11. Null canvas refs
    instance.canvas = null;
    instance.ctx = null;

    // 12. Remove from instance map
    this.instances.delete(element);
  }

  /**
   * Destroy all active instances.
   */
  destroyAll() {
    this.instances.forEach((_, element) => this.destroyElement(element));
  }

  // ── DOM Ready + Init Scheduling ───────────────────────────────────────────

  ensureDOMReady(callback) {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;
    if (this.domReady || document.readyState !== "loading") {
      this.domReady = true;
      callback();
      return;
    }
    if (this.domReadyHandler) return;
    this.domReadyHandler = () => {
      this.domReady = true;
      this.domReadyHandler = null;
      callback();
    };
    document.addEventListener("DOMContentLoaded", this.domReadyHandler, {
      once: true,
    });
  }

  scheduleInitPass() {
    if (typeof window === "undefined" || this.initScheduled) return;
    this.initScheduled = true;
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        this.initScheduled = false;
        this.reconcileTargets("init-pass");
      });
    });
  }

  scheduleReconcile(reason = "observer") {
    if (typeof window === "undefined" || this.reconcileScheduled) return;
    this.reconcileScheduled = true;
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        this.reconcileScheduled = false;
        this.reconcileTargets(reason);
      });
    });
  }

  // ── MutationObserver ──────────────────────────────────────────────────────

  ensureMutationObserver() {
    if (
      typeof document === "undefined" ||
      this.mutationObserver ||
      !document.body
    )
      return;

    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldReconcile = false;

      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const target = /** @type {Element} */ (mutation.target);
          if (
            mutation.attributeName === "wb-component" &&
            (target.matches?.(TARGET_SELECTOR) ||
              this.instances.has(target) ||
              target.getAttribute("wb-component") !== "flow-field")
          ) {
            shouldReconcile = true;
          }
        }

        if (mutation.type === "childList") {
          if (
            mutation.addedNodes.length > 0 ||
            mutation.removedNodes.length > 0
          ) {
            shouldReconcile = true;
          }
        }
      }

      if (shouldReconcile) {
        this.scheduleReconcile("mutation-observer");
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["wb-component"],
    });
  }

  /**
   * Reconcile DOM targets — unmount stale instances, mount new ones.
   *
   * @param {string} reason
   */
  reconcileTargets(reason = "manual") {
    if (typeof document === "undefined") return;

    const targets = new Set(document.querySelectorAll(TARGET_SELECTOR));

    // Unmount stale instances (removed from DOM or attribute changed)
    this.instances.forEach((_, element) => {
      const stillInDOM = document.contains(element);
      const stillTarget = element.matches?.(TARGET_SELECTOR);
      if (!stillInDOM || !stillTarget) {
        this.destroyElement(element);
      }
    });

    // Mount valid targets that are not yet initialized
    targets.forEach((element) => {
      if (this.instances.has(element)) {
        if (!element.hasAttribute(INSTANCE_MARKER_ATTR)) {
          element.setAttribute(INSTANCE_MARKER_ATTR, "true");
        }
        return;
      }

      // Defensive cleanup: remove stale canvas/wrapper if instance was lost
      const staleCanvas = element.querySelector(
        ":scope > .wb-flow-field-canvas",
      );
      if (staleCanvas) staleCanvas.remove();
      const staleWrapper = element.querySelector(
        ":scope > .wb-flow-field-content",
      );
      if (staleWrapper) {
        while (staleWrapper.firstChild)
          element.appendChild(staleWrapper.firstChild);
        staleWrapper.remove();
      }

      this.initElement(element);
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Initialise a single element.
   *
   * @param {Element} element
   */
  initElement(element) {
    if (typeof document === "undefined") return;

    // Guard: only <div> and <section>
    const tag = element.tagName?.toUpperCase();
    if (!ALLOWED_TAGS.has(tag)) {
      console.warn(
        `FlowBitz FlowField: wb-component="flow-field" is only supported on <section> and <div>. Got <${tag?.toLowerCase() ?? "unknown"}>.`,
      );
      return;
    }

    // Guard: prevent double-init
    if (this.instances.has(element)) {
      console.warn(
        "FlowBitz FlowField: Element already initialized. Skipping.",
      );
      return;
    }
    if (element.hasAttribute(INSTANCE_MARKER_ATTR)) {
      element.removeAttribute(INSTANCE_MARKER_ATTR);
    }

    // Performance warning for many instances
    if (this.instances.size >= 2 && !this.multiInstanceWarnShown) {
      console.warn(
        "FlowBitz FlowField: Multiple instances detected. Consider performance impact — each instance runs its own render loop.",
      );
      this.multiInstanceWarnShown = true;
    }

    this.injectComponentStyles();

    const config = parseConfig(element);
    const result = this.setupCanvas(element);
    if (!result) return;

    const { canvas, ctx } = result;

    const instance = {
      canvas,
      ctx,
      config,
      particles: [],
      flowField: null,
      rows: 0,
      cols: 0,
      rafId: null,
      resizeObserver: null,
      visibilityHandler: null,
      mousemoveHandler: null,
      idleTimeoutId: null,
      pendingInit: false,
    };

    this.instances.set(element, instance);
    element.setAttribute(INSTANCE_MARKER_ATTR, "true");

    // Compute flow field before starting animation
    computeFlowField(instance);
    this.startAnimation(instance);
    this.setupVisibilityListener(instance);
    instance.resizeObserver = this.setupResizeObserver(element);
  }

  /**
   * Initialise all [wb-component="flow-field"] elements in the document.
   */
  initAll() {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;
    this.ensureDOMReady(() => {
      this.ensureMutationObserver();
      this.scheduleInitPass();
    });
  }

  /**
   * Refresh: reconcile DOM from current state.
   */
  refresh() {
    this.reconcileTargets("refresh");
  }

  /**
   * Check for CSS conflicts — none expected for canvas overlay components.
   * @returns {Array}
   */
  checkForConflicts() {
    return [];
  }
}

// ── Singleton export ──────────────────────────────────────────────────────────

const flowFieldAnimator = new FlowFieldAnimator();
export default flowFieldAnimator;
export { FlowFieldAnimator };
