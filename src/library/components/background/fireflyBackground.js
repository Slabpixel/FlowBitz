/**
 * FlowBitz - Firefly Background Component
 * Simulates floating firefly particles with fade-in/out lifecycle
 * on a <canvas> injected inside a <section> or <div> container.
 *
 * Adapted from Travis Horn's CodePen: https://codepen.io/travishorn/pen/OVzeqg/
 * Uses pure Canvas 2D API + requestAnimationFrame — no external dependencies.
 *
 * @version 1.0.0
 * @author Slabpixel Studio
 */

import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseAttribute } from "../../utils/core/attributeParser.js";
import { colorToRgba, hexToRgb } from "../../utils/core/colorUtils.js";

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

const COMPONENT_CSS = `
/* FlowBitz - FireflyBackground Component Styles */
.wb-firefly-container {
  position: relative;
}

.wb-firefly-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
}

.wb-firefly-content {
  position: relative;
  z-index: 1;
}
`;

// ---------------------------------------------------------------------------
// Defaults  (sourced from CodePen reference + spec Section 3)
// ---------------------------------------------------------------------------

const DEFAULT_CONFIG = {
  count: 50,
  color: "#FFD700",
  glowColor: null, // null = inherit from color
  glowSize: 20,
  minSize: 1,
  maxSize: 5,
  speed: 1,
  minLifespan: 75,
  maxLifespan: 150,
  background: "transparent",
  disableGlow: false,
  // Derived at parse time — not settable via attribute
  parsedColor: { r: 255, g: 215, b: 0 },
  parsedGlowColor: null, // null = use color string directly
  xSpeedRange: [-1, 1],
  ySpeedRange: [-0.5, 0.5],
};

const TARGET_SELECTOR = '[wb-component="firefly-background"]';
const INSTANCE_MARKER_ATTR = "data-wb-firefly-mounted";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Return a random float in [min, max).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Resolve any CSS color string to { r, g, b } at config-parse time,
 * so we avoid per-frame string parsing in the render loop.
 *
 * @param {string} colorString - Any valid CSS color
 * @returns {{ r: number, g: number, b: number }}
 */
function resolveColorToRgb(colorString) {
  // Fast path for hex (most common usage)
  if (colorString && colorString.startsWith("#")) {
    const rgb = hexToRgb(colorString);
    if (rgb) return rgb;
  }

  // General path: use colorToRgba to normalise, then extract r/g/b
  const rgba = colorToRgba(colorString, 1);
  const match = rgba.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  // Fallback: default amber-yellow
  return { r: 255, g: 215, b: 0 };
}

// ---------------------------------------------------------------------------
// FireflyAnimator class  (TASK-01 skeleton → TASK-08 fully implemented)
// ---------------------------------------------------------------------------

class FireflyAnimator {
  constructor() {
    /** @type {Map<Element, Object>} */
    this.instances = new Map();
    this.stylesInjected = false;
    this.domReady = false;
    this.initScheduled = false;
    this.reconcileScheduled = false;
    this.mutationObserver = null;
    this.domReadyHandler = null;
  }

  isDebugEnabled() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }
    const isDev =
      typeof import.meta !== "undefined" &&
      import.meta?.env &&
      !!import.meta.env.DEV;
    if (!isDev) return false;
    return (
      window.__WB_FIREFLY_DEBUG__ === true ||
      document.documentElement?.getAttribute("data-wb-firefly-debug") === "true"
    );
  }

  debugLog(...args) {
    if (this.isDebugEnabled()) {
      console.log("[FireflyBackground]", ...args);
    }
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  injectComponentStyles() {
    if (this.stylesInjected) return;
    injectStyles("wb-firefly-styles", COMPONENT_CSS);
    this.stylesInjected = true;
  }

  // ── TASK-02: Config Parser + Validation ───────────────────────────────────

  /**
   * Parse all wb-* attributes from a container element into a validated
   * config object. Applies clamping, swap-guard, and console.warn per spec.
   *
   * @param {Element} element
   * @returns {Object} Resolved config
   */
  parseConfig(element) {
    const config = { ...DEFAULT_CONFIG };

    // wb-count — clamp 10–300, warn >200
    const countRaw = element.getAttribute("wb-count");
    if (countRaw !== null) {
      const parsed = parseInt(countRaw, 10);
      if (isNaN(parsed)) {
        console.warn(
          `FlowBitz FireflyBackground: wb-count "${countRaw}" is not valid. Using default ${DEFAULT_CONFIG.count}.`,
        );
      } else {
        const clamped = Math.max(10, Math.min(300, parsed));
        if (parsed !== clamped) {
          console.warn(
            `FlowBitz FireflyBackground: wb-count ${parsed} clamped to ${clamped}.`,
          );
        }
        if (clamped > 200) {
          console.warn(
            `FlowBitz FireflyBackground: wb-count ${clamped} may impact performance. Consider wb-disable-glow="true".`,
          );
        }
        config.count = clamped;
      }
    }

    // wb-color
    const colorRaw = parseAttribute.color(element, "wb-color");
    if (colorRaw) {
      config.color = colorRaw;
    }
    config.parsedColor = resolveColorToRgb(config.color);

    // wb-glow-color (optional — inherits from wb-color if absent)
    const glowColorRaw = parseAttribute.color(element, "wb-glow-color");
    if (glowColorRaw) {
      config.glowColor = glowColorRaw;
      config.parsedGlowColor = glowColorRaw;
    } else {
      config.glowColor = null;
      config.parsedGlowColor = config.color;
    }

    // wb-glow-size — clamp 0–50, warn >30
    const glowSizeRaw = element.getAttribute("wb-glow-size");
    if (glowSizeRaw !== null) {
      const parsed = parseInt(glowSizeRaw, 10);
      if (isNaN(parsed)) {
        console.warn(
          `FlowBitz FireflyBackground: wb-glow-size "${glowSizeRaw}" is not valid. Using default ${DEFAULT_CONFIG.glowSize}.`,
        );
      } else {
        const clamped = Math.max(0, Math.min(50, parsed));
        if (parsed !== clamped) {
          console.warn(
            `FlowBitz FireflyBackground: wb-glow-size ${parsed} clamped to ${clamped}.`,
          );
        }
        if (clamped > 30) {
          console.warn(
            `FlowBitz FireflyBackground: wb-glow-size ${clamped} may have high GPU cost. Consider reducing or using wb-disable-glow="true".`,
          );
        }
        config.glowSize = clamped;
      }
    }

    // wb-min-size — clamp 0.5–10
    const minSizeRaw = element.getAttribute("wb-min-size");
    if (minSizeRaw !== null) {
      const parsed = parseFloat(minSizeRaw);
      if (!isNaN(parsed)) {
        config.minSize = Math.max(0.5, Math.min(10, parsed));
      }
    }

    // wb-max-size — clamp 1–20
    const maxSizeRaw = element.getAttribute("wb-max-size");
    if (maxSizeRaw !== null) {
      const parsed = parseFloat(maxSizeRaw);
      if (!isNaN(parsed)) {
        config.maxSize = Math.max(1, Math.min(20, parsed));
      }
    }

    // Swap guard: minSize must be ≤ maxSize
    if (config.minSize > config.maxSize) {
      console.warn(
        `FlowBitz FireflyBackground: wb-min-size (${config.minSize}) > wb-max-size (${config.maxSize}). Values swapped.`,
      );
      [config.minSize, config.maxSize] = [config.maxSize, config.minSize];
    }

    // wb-speed — clamp 0.1–5
    const speedRaw = element.getAttribute("wb-speed");
    if (speedRaw !== null) {
      const parsed = parseFloat(speedRaw);
      if (isNaN(parsed)) {
        console.warn(
          `FlowBitz FireflyBackground: wb-speed "${speedRaw}" is not valid. Using default ${DEFAULT_CONFIG.speed}.`,
        );
      } else {
        const clamped = Math.max(0.1, Math.min(5, parsed));
        if (parsed !== clamped) {
          console.warn(
            `FlowBitz FireflyBackground: wb-speed ${parsed} clamped to ${clamped}.`,
          );
        }
        config.speed = clamped;
      }
    }

    // Derive xSpeed / ySpeed ranges from multiplier (CodePen base: x=[-1,1], y=[-0.5,0.5])
    config.xSpeedRange = [-1 * config.speed, 1 * config.speed];
    config.ySpeedRange = [-0.5 * config.speed, 0.5 * config.speed];

    // wb-min-lifespan — clamp 20–500
    const minLifespanRaw = element.getAttribute("wb-min-lifespan");
    if (minLifespanRaw !== null) {
      const parsed = parseInt(minLifespanRaw, 10);
      if (!isNaN(parsed)) {
        config.minLifespan = Math.max(20, Math.min(500, parsed));
      }
    }

    // wb-max-lifespan — clamp 40–1000
    const maxLifespanRaw = element.getAttribute("wb-max-lifespan");
    if (maxLifespanRaw !== null) {
      const parsed = parseInt(maxLifespanRaw, 10);
      if (!isNaN(parsed)) {
        config.maxLifespan = Math.max(40, Math.min(1000, parsed));
      }
    }

    // Swap guard: minLifespan must be ≤ maxLifespan
    if (config.minLifespan > config.maxLifespan) {
      console.warn(
        `FlowBitz FireflyBackground: wb-min-lifespan (${config.minLifespan}) > wb-max-lifespan (${config.maxLifespan}). Values swapped.`,
      );
      [config.minLifespan, config.maxLifespan] = [
        config.maxLifespan,
        config.minLifespan,
      ];
    }

    // wb-background — 'transparent' or any CSS color
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
            `FlowBitz FireflyBackground: Invalid wb-background "${bgRaw}". Using transparent.`,
          );
          config.background = "transparent";
        }
      }
    }

    // wb-disable-glow — boolean
    const disableGlowRaw = parseAttribute.boolean(element, "wb-disable-glow");
    if (disableGlowRaw !== null) {
      config.disableGlow = disableGlowRaw;
    }

    return config;
  }

  // ── TASK-03: Particle Factory + Lifecycle ─────────────────────────────────

  /**
   * Create a single Fly particle object.
   * Adapted directly from CodePen Fly constructor — per-instance config replaces globals.
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Object} config
   * @returns {Object} Particle state object
   */
  createParticle(canvas, config) {
    return {
      x: randomRange(0, canvas.width),
      y: randomRange(0, canvas.height),
      xSpeed: randomRange(config.xSpeedRange[0], config.xSpeedRange[1]),
      ySpeed: randomRange(config.ySpeedRange[0], config.ySpeedRange[1]),
      size: randomRange(config.minSize, config.maxSize),
      lifeSpan: Math.floor(randomRange(config.minLifespan, config.maxLifespan)),
      age: 0,
      alpha: 0,
    };
  }

  // ── TASK-04: Canvas Injection ──────────────────────────────────────────────

  /**
   * Inject a <canvas> as firstChild of the container and wrap existing
   * children in .wb-firefly-content so they stay above the canvas.
   * Pattern mirrors matrixRain.setupCanvas().
   *
   * @param {Element} element - Container element
   * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }}
   */
  setupCanvas(element) {
    element.classList.add("wb-firefly-container");

    // Wrap existing children so they remain above canvas
    const existingChildren = Array.from(element.childNodes);
    if (existingChildren.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wb-firefly-content");
      existingChildren.forEach((child) => wrapper.appendChild(child));
      element.appendChild(wrapper);
    }

    // Create and prepend canvas
    const canvas = document.createElement("canvas");
    canvas.classList.add("wb-firefly-canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    element.insertBefore(canvas, element.firstChild);

    const ctx = canvas.getContext("2d");
    return { canvas, ctx };
  }

  // ── TASK-05: RAF Animation Loop ────────────────────────────────────────────

  /**
   * Start the requestAnimationFrame render loop for a given instance.
   * Defers if the canvas has zero height (pendingInit pattern).
   * Adapted from CodePen render() pipeline: clear → spawn → move+age → remove → draw.
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

    // Pre-populate half the particle count so the screen doesn't look empty on load
    if (instance.particles.length === 0) {
      const preload = Math.floor(config.count / 2);
      for (let i = 0; i < preload; i++) {
        const p = this.createParticle(canvas, config);
        // Give pre-loaded particles a random head-start age for visual variety
        p.age = Math.floor(randomRange(0, p.lifeSpan));
        // Compute alpha from their current age
        const halfLife = p.lifeSpan / 2;
        if (p.age < halfLife) {
          p.alpha = p.age / halfLife;
        } else {
          p.alpha = 1 - (p.age - halfLife) / halfLife;
        }
        p.alpha = Math.max(0, Math.min(1, p.alpha));
        instance.particles.push(p);
      }
    }

    const glowColor = config.parsedGlowColor || config.color;
    const { r, g, b } = config.parsedColor;

    const loop = () => {
      // ── Clear / background ────────────────────────────────────────────────
      if (config.background === "transparent") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = config.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ── Spawn (max 1 per frame until count is reached) ────────────────────
      if (instance.particles.length < config.count) {
        instance.particles.push(this.createParticle(canvas, config));
      }

      // ── Apply glow (set once per frame, reset after drawing) ──────────────
      if (!config.disableGlow && config.glowSize > 0) {
        ctx.shadowBlur = config.glowSize;
        ctx.shadowColor = glowColor;
      }

      // ── Update + Draw each particle ───────────────────────────────────────
      for (let i = 0; i < instance.particles.length; i++) {
        const p = instance.particles[i];

        // Move
        p.x += p.xSpeed;
        p.y += p.ySpeed;

        // Alpha lifecycle: fade in for first half, fade out for second half
        // Mirrors CodePen logic exactly
        const halfLife = p.lifeSpan / 2;
        if (p.age < halfLife) {
          p.alpha = Math.min(1, p.alpha + 1 / halfLife);
        } else {
          p.alpha = Math.max(0, p.alpha - 1 / halfLife);
        }
        p.age++;

        // Draw as filled circle
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        ctx.fill();
      }

      // Reset shadow after drawing to prevent bleed onto other canvas contexts
      if (!config.disableGlow && config.glowSize > 0) {
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      }

      // ── Remove expired particles (reverse iterate to avoid splice index shift) ──
      for (let i = instance.particles.length - 1; i >= 0; i--) {
        if (instance.particles[i].age >= instance.particles[i].lifeSpan) {
          instance.particles.splice(i, 1);
        }
      }

      instance.rafId = requestAnimationFrame(loop);
    };

    instance.rafId = requestAnimationFrame(loop);
  }

  // ── TASK-06: Cleanup / destroyElement ─────────────────────────────────────

  /**
   * Handle container resize: cancel RAF, resize canvas, reset particles, restart.
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

    // Reset particles — old positions may be out-of-bounds after resize
    instance.particles = [];

    this.startAnimation(instance);
  }

  /**
   * Destroy a single element instance — cancels RAF, disconnects observers,
   * removes canvas, restores children, cleans instance map.
   * Implements spec FR-07 (all 7 cleanup steps).
   *
   * @param {Element} element
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // 1. Cancel animation frame
    if (instance.rafId) {
      cancelAnimationFrame(instance.rafId);
      instance.rafId = null;
    }

    // 2. Disconnect ResizeObserver
    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
      instance.resizeObserver = null;
    }

    // 3. Remove visibility listener
    if (instance.visibilityHandler) {
      document.removeEventListener(
        "visibilitychange",
        instance.visibilityHandler,
      );
      instance.visibilityHandler = null;
    }

    // 4. Remove canvas from DOM
    if (instance.canvas && instance.canvas.parentNode === element) {
      element.removeChild(instance.canvas);
    }

    // 5. Unwrap .wb-firefly-content — restore children to container
    const contentWrapper = element.querySelector(
      ":scope > .wb-firefly-content",
    );
    if (contentWrapper) {
      while (contentWrapper.firstChild) {
        element.appendChild(contentWrapper.firstChild);
      }
      element.removeChild(contentWrapper);
    }

    // 6. Remove container class
    element.classList.remove("wb-firefly-container");
    element.removeAttribute(INSTANCE_MARKER_ATTR);

    // 7. Clear all instance state references and remove from map
    instance.particles = [];
    instance.canvas = null;
    instance.ctx = null;
    this.instances.delete(element);
  }

  /**
   * Destroy all active instances.
   */
  destroyAll() {
    this.instances.forEach((_, element) => this.destroyElement(element));
  }

  // ── TASK-07: ResizeObserver + pendingInit ──────────────────────────────────

  /**
   * Observe container for size changes.
   * Handles two cases: initial visibility (pendingInit) and mid-animation resize.
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
          // Container first became visible — init now
          instance.canvas.width = element.offsetWidth;
          instance.canvas.height = element.offsetHeight;
          if (instance.canvas.height > 0) {
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

  // ── TASK-08: Page Visibility Pause/Resume ─────────────────────────────────

  /**
   * Pause RAF when tab is hidden, resume when visible.
   * Particle state (positions, ages) is preserved across pause/resume.
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

  ensureDOMReady(callback) {
    if (typeof document === "undefined" || typeof window === "undefined") return;
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

  ensureMutationObserver() {
    if (
      typeof document === "undefined" ||
      this.mutationObserver ||
      !document.body
    ) {
      return;
    }

    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldReconcile = false;

      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const target = /** @type {Element} */ (mutation.target);
          if (
            mutation.attributeName === "wb-component" &&
            (target.matches?.(TARGET_SELECTOR) ||
              this.instances.has(target) ||
              target.getAttribute("wb-component") !== "firefly-background")
          ) {
            shouldReconcile = true;
            this.debugLog("observer: attribute changed", {
              attr: mutation.attributeName,
              hasTarget: target.matches?.(TARGET_SELECTOR),
            });
          }
        }

        if (mutation.type === "childList") {
          if (
            mutation.addedNodes.length > 0 ||
            mutation.removedNodes.length > 0
          ) {
            shouldReconcile = true;
            this.debugLog("observer: childList changed", {
              added: mutation.addedNodes.length,
              removed: mutation.removedNodes.length,
            });
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

  reconcileTargets(reason = "manual") {
    if (typeof document === "undefined") return;

    const targets = new Set(document.querySelectorAll(TARGET_SELECTOR));
    this.debugLog("reconcile:start", {
      reason,
      targetCount: targets.size,
      instanceCount: this.instances.size,
    });

    // Unmount stale instances (removed from DOM or attribute changed)
    this.instances.forEach((_, element) => {
      const stillInDOM = document.contains(element);
      const stillTarget = element.matches?.(TARGET_SELECTOR);
      if (!stillInDOM || !stillTarget) {
        this.debugLog("unmount:stale-target", {
          stillInDOM,
          stillTarget,
        });
        this.destroyElement(element);
      }
    });

    // Mount / remount valid targets
    targets.forEach((element) => {
      const existingCanvas = element.querySelector(":scope > .wb-firefly-canvas");

      if (this.instances.has(element)) {
        // Keep idempotent marker in sync in case external code removed it
        if (!element.hasAttribute(INSTANCE_MARKER_ATTR)) {
          element.setAttribute(INSTANCE_MARKER_ATTR, "true");
        }
        return;
      }

      // Defensive cleanup if a stale canvas remains but no instance in map
      if (existingCanvas) {
        existingCanvas.remove();
      }
      const staleWrapper = element.querySelector(":scope > .wb-firefly-content");
      if (staleWrapper) {
        while (staleWrapper.firstChild) {
          element.appendChild(staleWrapper.firstChild);
        }
        staleWrapper.remove();
      }

      this.initElement(element);
    });

    this.debugLog("reconcile:done", {
      reason,
      targetCount: targets.size,
      instanceCount: this.instances.size,
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

    // Guard: only section and div
    const tag = element.tagName?.toUpperCase();
    if (tag !== "SECTION" && tag !== "DIV") {
      console.warn(
        `FlowBitz FireflyBackground: wb-component="firefly-background" is only supported on <section> and <div>. Got <${tag?.toLowerCase() ?? "unknown"}>.`,
      );
      return;
    }

    // Guard: prevent double-init
    if (this.instances.has(element)) {
      console.warn(
        "FlowBitz FireflyBackground: Element already initialized. Skipping.",
      );
      return;
    }
    if (element.hasAttribute(INSTANCE_MARKER_ATTR)) {
      // Marker exists without instance means previous mount got stale.
      element.removeAttribute(INSTANCE_MARKER_ATTR);
    }

    this.injectComponentStyles();

    const config = this.parseConfig(element);
    const { canvas, ctx } = this.setupCanvas(element);

    const instance = {
      canvas,
      ctx,
      config,
      particles: [],
      rafId: null,
      resizeObserver: null,
      visibilityHandler: null,
      pendingInit: false,
    };

    this.instances.set(element, instance);
    element.setAttribute(INSTANCE_MARKER_ATTR, "true");
    this.debugLog("mount:success", {
      tag: element.tagName,
      count: config.count,
    });

    this.startAnimation(instance);
    instance.resizeObserver = this.setupResizeObserver(element);
    this.setupVisibilityListener(instance);
  }

  /**
   * Initialise all [wb-component="firefly-background"] elements in the document.
   */
  initAll() {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    this.ensureDOMReady(() => {
      this.ensureMutationObserver();
      this.scheduleInitPass();
    });
  }

  /**
   * Refresh: destroy all and re-init from DOM.
   */
  refresh() {
    this.reconcileTargets("refresh");
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

const fireflyAnimator = new FireflyAnimator();
export default fireflyAnimator;
export { FireflyAnimator };
