/**
 * FlowBitz - Star Field Background Component
 * Interactive star field animation driven by Canvas 2D + requestAnimationFrame.
 * Stars radiate outward from an origin point that follows the cursor in real-time.
 * Clicking the container triggers a speed-burst acceleration.
 *
 * Visual reference: https://starfield.js.org/
 * Algorithm adapted from: https://github.com/AnnikaV9/starfield.js (MIT)
 * Original inspiration: https://editor.p5js.org/BarneyCodes/sketches/xR5Ct8F1N
 *
 * Zero external dependencies — uses only Canvas 2D API + RAF.
 *
 * @version 1.0.0
 * @author Slabpixel Studio
 */

import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseAttribute } from "../../utils/core/attributeParser.js";
import { hexToRgb, colorToRgba } from "../../utils/core/colorUtils.js";

// ── TASK-01: CSS + Constants ──────────────────────────────────────────────────

const COMPONENT_CSS = `
/* FlowBitz - StarField Component Styles */
.wb-star-field-container {
  position: relative;
}

.wb-star-field-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
  z-index: 0;
}

.wb-star-field-content {
  position: relative;
  z-index: 1;
}
`;

const TARGET_SELECTOR = '[wb-component="star-field"]';
const INSTANCE_MARKER_ATTR = "data-wb-star-field-mounted";
const ALLOWED_TAGS = new Set(["DIV", "SECTION"]);

const DEFAULT_CONFIG = {
  starCount: 250,
  starColor: "#e6e664",
  background: "#000000",
  speed: 1,
  trailLength: 0.8,
  hueJitter: 0,
  interactive: true,
  originX: null,
  originY: null,
  maxAcceleration: 10,
  accelerationRate: 0.2,
  decelerationRate: 0.2,
  minSpawnRadius: 80,
  maxSpawnRadius: 500,
  // Derived at parse time
  parsedStarColor: { r: 230, g: 230, b: 100 },
  starColorHsl: { h: 60, s: 1, l: 0.65 },
  backgroundRgb: "rgb(0,0,0)",
};

// ── TASK-03: hslToRgb + rgbToHsl helpers ─────────────────────────────────────

/**
 * Convert HSL values to RGB.
 * @param {number} h - Hue in degrees [0, 360]
 * @param {number} s - Saturation [0, 1]
 * @param {number} l - Lightness [0, 1]
 * @returns {{ r: number, g: number, b: number }}
 */
function hslToRgb(h, s, l) {
  const hNorm = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (hNorm < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hNorm < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hNorm < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hNorm < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hNorm < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Convert RGB values to HSL.
 * @param {number} r - Red [0, 255]
 * @param {number} g - Green [0, 255]
 * @param {number} b - Blue [0, 255]
 * @returns {{ h: number, s: number, l: number }}
 */
function rgbToHsl(r, g, b) {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;

  return { h: h * 360, s, l };
}

/**
 * Resolve any CSS color string to { r, g, b } at config-parse time.
 * @param {string} colorString
 * @returns {{ r: number, g: number, b: number }}
 */
function resolveColorToRgb(colorString) {
  if (colorString && colorString.startsWith("#")) {
    const rgb = hexToRgb(colorString);
    if (rgb) return rgb;
  }
  const rgba = colorToRgba(colorString, 1);
  const match = rgba.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return { r: 230, g: 230, b: 100 };
}

// ── Star redirect helper ──────────────────────────────────────────────────────

/**
 * Recalculate velocity of all existing stars to point radially outward
 * from a new origin point. Called whenever the origin moves (mousemove/touch).
 * Runs once per RAF-throttled update — negligible cost for ≤500 stars.
 *
 * @param {Array} stars
 * @param {number} originX
 * @param {number} originY
 * @param {number} speed - Base speed (config.speed)
 */
function redirectStarsFromOrigin(stars, originX, originY, speed) {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    const dx = star.x - originX;
    const dy = star.y - originY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 0.5) {
      // Star is at or extremely close to origin — assign random outward direction
      const angle = Math.random() * Math.PI * 2;
      star.vx = Math.cos(angle) * speed;
      star.vy = Math.sin(angle) * speed;
    } else {
      // Redirect: normalise (dx,dy) then scale by base speed
      star.vx = (dx / dist) * speed;
      star.vy = (dy / dist) * speed;
    }
  }
}

// ── TASK-02: Config Parser ────────────────────────────────────────────────────

/**
 * Parse all wb-* attributes from a container element into a validated config.
 * @param {Element} element
 * @returns {Object} Resolved config
 */
function parseConfig(element) {
  const config = { ...DEFAULT_CONFIG };

  // wb-star-count [50–500, warn >400]
  const countRaw = element.getAttribute("wb-star-count");
  if (countRaw !== null) {
    const parsed = parseInt(countRaw, 10);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz StarField: wb-star-count "${countRaw}" is not valid. Using default ${DEFAULT_CONFIG.starCount}.`,
      );
    } else {
      const clamped = Math.max(50, Math.min(500, parsed));
      if (parsed !== clamped) {
        console.warn(
          `FlowBitz StarField: wb-star-count ${parsed} clamped to ${clamped}.`,
        );
      }
      if (clamped > 400) {
        console.warn(
          `FlowBitz StarField: wb-star-count ${clamped} may impact performance.`,
        );
      }
      config.starCount = clamped;
    }
  }

  // wb-star-color
  const starColorRaw = parseAttribute.color(element, "wb-star-color");
  if (starColorRaw) {
    config.starColor = starColorRaw;
  }
  config.parsedStarColor = resolveColorToRgb(config.starColor);
  config.starColorHsl = rgbToHsl(
    config.parsedStarColor.r,
    config.parsedStarColor.g,
    config.parsedStarColor.b,
  );

  // wb-background [color or 'transparent']
  const bgRaw = element.getAttribute("wb-background");
  if (bgRaw !== null) {
    if (bgRaw === "transparent") {
      config.background = "transparent";
      config.backgroundRgb = "transparent";
    } else {
      const validated = parseAttribute.color(element, "wb-background");
      if (validated) {
        config.background = validated;
        config.backgroundRgb = validated;
      } else {
        console.warn(
          `FlowBitz StarField: Invalid wb-background "${bgRaw}". Using default.`,
        );
      }
    }
  } else {
    config.backgroundRgb = config.background;
  }

  // wb-speed [0.1–5]
  const speedRaw = element.getAttribute("wb-speed");
  if (speedRaw !== null) {
    const parsed = parseFloat(speedRaw);
    if (isNaN(parsed)) {
      console.warn(
        `FlowBitz StarField: wb-speed "${speedRaw}" is not valid. Using default ${DEFAULT_CONFIG.speed}.`,
      );
    } else {
      const clamped = Math.max(0.1, Math.min(5, parsed));
      if (parsed !== clamped) {
        console.warn(
          `FlowBitz StarField: wb-speed ${parsed} clamped to ${clamped}.`,
        );
      }
      config.speed = clamped;
    }
  }

  // wb-trail-length [0–1]
  const trailRaw = element.getAttribute("wb-trail-length");
  if (trailRaw !== null) {
    const parsed = parseFloat(trailRaw);
    if (!isNaN(parsed)) {
      config.trailLength = Math.max(0, Math.min(1, parsed));
    }
  }

  // wb-hue-jitter [0–360]
  const hueRaw = element.getAttribute("wb-hue-jitter");
  if (hueRaw !== null) {
    const parsed = parseFloat(hueRaw);
    if (!isNaN(parsed)) {
      config.hueJitter = Math.max(0, Math.min(360, parsed));
    }
  }

  // wb-interactive [boolean, default true]
  const interactiveRaw = parseAttribute.boolean(element, "wb-interactive");
  if (interactiveRaw !== null) {
    config.interactive = interactiveRaw;
  }

  // wb-origin-x / wb-origin-y [number, validated against canvas bounds after canvas setup]
  const originXRaw = element.getAttribute("wb-origin-x");
  if (originXRaw !== null) {
    const parsed = parseFloat(originXRaw);
    if (!isNaN(parsed)) config.originX = parsed;
  }

  const originYRaw = element.getAttribute("wb-origin-y");
  if (originYRaw !== null) {
    const parsed = parseFloat(originYRaw);
    if (!isNaN(parsed)) config.originY = parsed;
  }

  // wb-max-acceleration [1–30]
  const maxAccelRaw = element.getAttribute("wb-max-acceleration");
  if (maxAccelRaw !== null) {
    const parsed = parseFloat(maxAccelRaw);
    if (!isNaN(parsed)) {
      config.maxAcceleration = Math.max(1, Math.min(30, parsed));
    }
  }

  // wb-acceleration-rate [0.01–1]
  const accelRateRaw = element.getAttribute("wb-acceleration-rate");
  if (accelRateRaw !== null) {
    const parsed = parseFloat(accelRateRaw);
    if (!isNaN(parsed)) {
      config.accelerationRate = Math.max(0.01, Math.min(1, parsed));
    }
  }

  // wb-deceleration-rate [0.01–1]
  const decelRateRaw = element.getAttribute("wb-deceleration-rate");
  if (decelRateRaw !== null) {
    const parsed = parseFloat(decelRateRaw);
    if (!isNaN(parsed)) {
      config.decelerationRate = Math.max(0.01, Math.min(1, parsed));
    }
  }

  // wb-min-spawn-radius [10–500]
  const minRadiusRaw = element.getAttribute("wb-min-spawn-radius");
  if (minRadiusRaw !== null) {
    const parsed = parseFloat(minRadiusRaw);
    if (!isNaN(parsed)) {
      config.minSpawnRadius = Math.max(10, Math.min(500, parsed));
    }
  }

  // wb-max-spawn-radius [50–2000]
  const maxRadiusRaw = element.getAttribute("wb-max-spawn-radius");
  if (maxRadiusRaw !== null) {
    const parsed = parseFloat(maxRadiusRaw);
    if (!isNaN(parsed)) {
      config.maxSpawnRadius = Math.max(50, Math.min(2000, parsed));
    }
  }

  // EC-03: Swap guard — min must be < max
  if (config.minSpawnRadius >= config.maxSpawnRadius) {
    console.warn(
      `FlowBitz StarField: wb-min-spawn-radius (${config.minSpawnRadius}) >= wb-max-spawn-radius (${config.maxSpawnRadius}). Values swapped.`,
    );
    [config.minSpawnRadius, config.maxSpawnRadius] = [
      config.maxSpawnRadius,
      config.minSpawnRadius,
    ];
  }

  return config;
}

// ── TASK-04: Star Particle Factory ───────────────────────────────────────────

/**
 * Create a single star particle.
 * Spawn position is random within [minSpawnRadius, maxSpawnRadius] from origin.
 * Velocity direction points radially outward from origin.
 * Color is computed once at spawn (hue jitter applied here, not per-frame).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} config
 * @param {number} originX
 * @param {number} originY
 * @returns {Object} Star state
 */
function createStar(canvas, config, originX, originY) {
  const angle = Math.random() * Math.PI * 2;
  const radius =
    config.minSpawnRadius +
    Math.random() * (config.maxSpawnRadius - config.minSpawnRadius);

  const x = originX + Math.cos(angle) * radius;
  const y = originY + Math.sin(angle) * radius;

  // Base velocity: direction away from origin × base speed
  // Do NOT mutate vx/vy per-frame — speedMultiplier is applied externally
  const vx = Math.cos(angle) * config.speed;
  const vy = Math.sin(angle) * config.speed;

  // Color: apply hue jitter at spawn time (once), not per-frame
  let colorRgb;
  if (config.hueJitter > 0) {
    const jitter = (Math.random() - 0.5) * config.hueJitter;
    const newH = config.starColorHsl.h + jitter;
    const jittered = hslToRgb(
      newH,
      config.starColorHsl.s,
      config.starColorHsl.l,
    );
    colorRgb = `rgb(${jittered.r},${jittered.g},${jittered.b})`;
  } else {
    const { r, g, b } = config.parsedStarColor;
    colorRgb = `rgb(${r},${g},${b})`;
  }

  return { x, y, vx, vy, colorRgb };
}

// ── TASK-05: Canvas Injection + DOM Wrapper ───────────────────────────────────

// ── TASK-06 through TASK-12: StarFieldAnimator class ─────────────────────────

class StarFieldAnimator {
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
    injectStyles("wb-star-field-styles", COMPONENT_CSS);
    this.stylesInjected = true;
  }

  // ── TASK-05: Canvas Setup ─────────────────────────────────────────────────

  /**
   * Inject canvas as firstChild and wrap existing children in content wrapper.
   * @param {Element} element
   * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } | null}
   */
  setupCanvas(element) {
    element.classList.add("wb-star-field-container");

    // Wrap existing children so they stay above canvas (z-index: 1)
    const existingChildren = Array.from(element.childNodes);
    if (existingChildren.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wb-star-field-content");
      existingChildren.forEach((child) => wrapper.appendChild(child));
      element.appendChild(wrapper);
    }

    const canvas = document.createElement("canvas");
    canvas.classList.add("wb-star-field-canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.width = element.offsetWidth || 0;
    canvas.height = element.offsetHeight || 0;
    element.insertBefore(canvas, element.firstChild);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn(
        "FlowBitz StarField: Canvas 2D API is not supported in this environment.",
      );
      return null;
    }

    return { canvas, ctx };
  }

  // ── TASK-06: RAF Render Loop ───────────────────────────────────────────────

  /**
   * Start (or restart) the requestAnimationFrame render loop.
   * @param {Object} instance
   */
  startAnimation(instance) {
    const { canvas, ctx, config } = instance;

    if (canvas.height === 0) {
      instance.pendingInit = true;
      return;
    }

    instance.pendingInit = false;

    // Pre-populate half the star count so the canvas doesn't look empty on first render
    if (instance.stars.length === 0) {
      const preload = Math.floor(config.starCount / 2);
      for (let i = 0; i < preload; i++) {
        instance.stars.push(
          createStar(canvas, config, instance.originX, instance.originY),
        );
      }
    }

    const loop = () => {
      // ── Step 1: Trail / Clear ────────────────────────────────────────────
      if (config.background === "transparent") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        // Higher trailLength → lower alpha → more trail (less clearing)
        ctx.globalAlpha = 1 - config.trailLength;
        ctx.fillStyle = config.backgroundRgb;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1; // ← must reset to prevent bleeding into star draw
      }

      // ── Step 2: Speed / Acceleration update ──────────────────────────────
      if (instance.accelerating) {
        instance.currentSpeed = Math.min(
          instance.currentSpeed +
            config.accelerationRate * config.maxAcceleration,
          config.maxAcceleration,
        );
      } else {
        instance.currentSpeed = Math.max(
          instance.currentSpeed -
            config.decelerationRate * config.maxAcceleration,
          config.speed,
        );
      }
      // speedMultiplier is applied per-frame without mutating star.vx/vy
      // This ensures deceleration can always return to base speed
      const speedMultiplier = instance.currentSpeed / config.speed;

      // ── Step 3: Spawn up to one star per frame until count is reached ─────
      if (instance.stars.length < config.starCount) {
        instance.stars.push(
          createStar(canvas, config, instance.originX, instance.originY),
        );
      }

      // ── Step 4: Update position + draw each star ──────────────────────────
      for (let i = 0; i < instance.stars.length; i++) {
        const star = instance.stars[i];

        // Move: vx/vy encode direction × base speed; multiplier applied on top
        star.x += star.vx * speedMultiplier;
        star.y += star.vy * speedMultiplier;

        // Size proportional to speed — faster stars appear larger/brighter
        const size = Math.max(0.5, speedMultiplier * 1.2);

        ctx.beginPath();
        ctx.fillStyle = star.colorRgb;
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Step 5: Remove stars that have left the canvas (50px buffer) ──────
      instance.stars = instance.stars.filter(
        (star) =>
          star.x >= -50 &&
          star.x <= canvas.width + 50 &&
          star.y >= -50 &&
          star.y <= canvas.height + 50,
      );

      instance.rafId = requestAnimationFrame(loop);
    };

    instance.rafId = requestAnimationFrame(loop);
  }

  // ── TASK-07: Origin Tracking ──────────────────────────────────────────────

  /**
   * Bind mousemove + touchmove + mouseleave for real-time origin tracking.
   * mousemove is RAF-throttled (NFR-02) to prevent jank.
   * @param {Element} element
   * @param {Object} instance
   */
  setupOriginTracking(element, instance) {
    // RAF throttle flag — prevents processing more than 1 move event per frame
    let rafPending = false;

    const mouseHandler = (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const rect = element.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        instance.originX = newX;
        instance.originY = newY;
        // Redirect existing stars to point away from the new origin
        redirectStarsFromOrigin(instance.stars, newX, newY, instance.config.speed);
      });
    };

    let touchRafPending = false;
    const touchHandler = (e) => {
      if (touchRafPending || !e.touches.length) return;
      touchRafPending = true;
      requestAnimationFrame(() => {
        touchRafPending = false;
        const rect = element.getBoundingClientRect();
        const newX = e.touches[0].clientX - rect.left;
        const newY = e.touches[0].clientY - rect.top;
        instance.originX = newX;
        instance.originY = newY;
        // Redirect existing stars to point away from the new origin
        redirectStarsFromOrigin(instance.stars, newX, newY, instance.config.speed);
      });
    };

    const leaveHandler = () => {
      // Stop any active acceleration when cursor exits
      instance.accelerating = false;
      const cx = instance.canvas.width / 2;
      const cy = instance.canvas.height / 2;
      instance.originX = cx;
      instance.originY = cy;
      redirectStarsFromOrigin(instance.stars, cx, cy, instance.config.speed);
    };

    element.addEventListener("mousemove", mouseHandler);
    element.addEventListener("touchmove", touchHandler, { passive: true });
    element.addEventListener("mouseleave", leaveHandler);

    instance.mouseHandler = mouseHandler;
    instance.touchHandler = touchHandler;
    instance.leaveHandler = leaveHandler;
  }

  // ── TASK-08: Click Acceleration (hold to sustain) ────────────────────────

  /**
   * Bind mousedown/mouseup for sustained acceleration while button is held.
   * Acceleration starts on mousedown and stops on mouseup or mouseleave.
   * cursor:pointer signals that holding is interactive (FR-06).
   *
   * @param {Element} element
   * @param {Object} instance
   */
  setupClickAcceleration(element, instance) {
    const mousedownHandler = (e) => {
      // Only react to primary button (left click)
      if (e.button !== 0) return;
      instance.accelerating = true;
    };

    const mouseupHandler = (e) => {
      if (e.button !== 0) return;
      instance.accelerating = false;
    };

    element.addEventListener("mousedown", mousedownHandler);
    element.addEventListener("mouseup", mouseupHandler);

    // Store as clickHandler/mouseupHandler so destroyElement knows what to remove
    instance.clickHandler = mousedownHandler;
    instance.mouseupHandler = mouseupHandler;

    // Visual affordance: cursor signals the element is interactive (FR-06)
    element.style.cursor = "pointer";
  }

  // ── TASK-09: ResizeObserver + pendingInit ─────────────────────────────────

  /**
   * Handle container resize: cancel RAF, resize canvas, reset stars, restart.
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
    instance.stars = [];

    // Re-clamp manual origin against new canvas bounds
    if (instance.manualOrigin) {
      const config = instance.config;
      if (config.originX !== null) {
        instance.originX = Math.max(
          0,
          Math.min(instance.canvas.width, config.originX),
        );
      }
      if (config.originY !== null) {
        instance.originY = Math.max(
          0,
          Math.min(instance.canvas.height, config.originY),
        );
      }
    } else {
      instance.originX = instance.canvas.width / 2;
      instance.originY = instance.canvas.height / 2;
    }

    this.startAnimation(instance);
  }

  /**
   * Observe container for size changes. Handles pendingInit (height=0 at startup).
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

  // ── TASK-10: Page Visibility Pause/Resume ─────────────────────────────────

  /**
   * Pause RAF when tab is hidden; resume when visible.
   * Star state is preserved — only the loop is cancelled/restarted.
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
        // Reset acceleration state to prevent "ghost burst" after tab switch
        instance.accelerating = false;
        if (!instance.rafId && !instance.pendingInit) {
          this.startAnimation(instance);
        }
      }
    };

    document.addEventListener("visibilitychange", handler);
    instance.visibilityHandler = handler;
  }

  // ── TASK-11: Full Cleanup / destroyElement ────────────────────────────────

  /**
   * Destroy a single instance — cancels RAF, removes all listeners, restores DOM.
   * 14-step cleanup per spec FR-13.
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

    // 2. Clear acceleration timeout
    if (instance.accelTimeout) {
      clearTimeout(instance.accelTimeout);
      instance.accelTimeout = null;
    }

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

    // 5. Remove mousemove listener
    if (instance.mouseHandler) {
      element.removeEventListener("mousemove", instance.mouseHandler);
      instance.mouseHandler = null;
    }

    // 6. Remove touchmove listener
    if (instance.touchHandler) {
      element.removeEventListener("touchmove", instance.touchHandler);
      instance.touchHandler = null;
    }

    // 7. Remove mouseleave listener
    if (instance.leaveHandler) {
      element.removeEventListener("mouseleave", instance.leaveHandler);
      instance.leaveHandler = null;
    }

    // 8. Remove mousedown / mouseup listeners
    if (instance.clickHandler) {
      element.removeEventListener("mousedown", instance.clickHandler);
      instance.clickHandler = null;
    }
    if (instance.mouseupHandler) {
      element.removeEventListener("mouseup", instance.mouseupHandler);
      instance.mouseupHandler = null;
    }

    // 9. Reset cursor style
    element.style.cursor = "";

    // 10. Remove canvas from DOM
    if (instance.canvas && instance.canvas.parentNode === element) {
      element.removeChild(instance.canvas);
    }

    // 11. Unwrap .wb-star-field-content — restore children to container
    const wrapper = element.querySelector(":scope > .wb-star-field-content");
    if (wrapper) {
      while (wrapper.firstChild) {
        element.appendChild(wrapper.firstChild);
      }
      element.removeChild(wrapper);
    }

    // 12. Remove container class
    element.classList.remove("wb-star-field-container");

    // 13. Remove marker attribute
    element.removeAttribute(INSTANCE_MARKER_ATTR);

    // 14. Clear state and remove from map
    instance.stars = [];
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

  // ── TASK-12: initElement + initAll + DOM Ready + MutationObserver ─────────

  /**
   * Initialise a single element.
   * @param {Element} element
   */
  initElement(element) {
    if (typeof document === "undefined") return;

    // Guard: only <div> and <section>
    const tag = element.tagName?.toUpperCase();
    if (!ALLOWED_TAGS.has(tag)) {
      console.warn(
        `FlowBitz StarField: wb-component="star-field" is only supported on <section> and <div>. Got <${tag?.toLowerCase() ?? "unknown"}>.`,
      );
      return;
    }

    // Guard: prevent double-init
    if (this.instances.has(element)) {
      console.warn(
        "FlowBitz StarField: Element already initialized. Skipping.",
      );
      return;
    }
    if (element.hasAttribute(INSTANCE_MARKER_ATTR)) {
      element.removeAttribute(INSTANCE_MARKER_ATTR);
    }

    // EC-07: Warn on many instances
    if (this.instances.size >= 2 && !this.multiInstanceWarnShown) {
      console.warn(
        "FlowBitz StarField: Multiple instances detected. Consider performance impact.",
      );
      this.multiInstanceWarnShown = true;
    }

    this.injectComponentStyles();

    const config = parseConfig(element);

    // EC-05: Transparent + trail conflict
    if (config.background === "transparent" && config.trailLength > 0) {
      console.warn(
        'FlowBitz StarField: wb-background="transparent" disables the trail effect. Set a background color to enable trails.',
      );
      config.trailLength = 0;
    }

    // NFR-09: Respect prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      config.speed = Math.min(config.speed, 0.1);
      config.trailLength = 0;
    }

    const result = this.setupCanvas(element);
    if (!result) return; // Canvas 2D not supported (NFR-08)

    const { canvas, ctx } = result;

    // Determine origin — manual override or default center
    const manualOrigin = config.originX !== null || config.originY !== null;
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    if (manualOrigin) {
      // EC-09: Clamp manual origin to canvas bounds
      if (config.originX !== null) {
        const clamped = Math.max(0, Math.min(canvas.width, config.originX));
        if (clamped !== config.originX) {
          console.warn(
            `FlowBitz StarField: wb-origin-x=${config.originX} out of bounds, clamped to ${clamped}.`,
          );
        }
        originX = clamped;
      }
      if (config.originY !== null) {
        const clamped = Math.max(0, Math.min(canvas.height, config.originY));
        if (clamped !== config.originY) {
          console.warn(
            `FlowBitz StarField: wb-origin-y=${config.originY} out of bounds, clamped to ${clamped}.`,
          );
        }
        originY = clamped;
      }
    }

    const instance = {
      canvas,
      ctx,
      config,
      stars: [],
      rafId: null,
      resizeObserver: null,
      visibilityHandler: null,
      mouseHandler: null,
      touchHandler: null,
      leaveHandler: null,
      clickHandler: null,   // mousedown handler
      mouseupHandler: null, // mouseup handler
      accelTimeout: null,
      pendingInit: false,
      manualOrigin,
      originX,
      originY,
      currentSpeed: config.speed,
      accelerating: false,
    };

    this.instances.set(element, instance);
    element.setAttribute(INSTANCE_MARKER_ATTR, "true");

    // Setup interaction (FR-05, FR-06, FR-07)
    if (config.interactive) {
      if (!manualOrigin) {
        // Cursor tracking active — origin follows mouse
        this.setupOriginTracking(element, instance);
      }
      // Click acceleration always available in interactive mode
      this.setupClickAcceleration(element, instance);
    }

    this.startAnimation(instance);
    instance.resizeObserver = this.setupResizeObserver(element);
    this.setupVisibilityListener(instance);
  }

  /**
   * Initialise all [wb-component="star-field"] elements in the document.
   * Uses DOM-ready guard + deferred init via queueMicrotask + RAF.
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
   * Ensure callback runs after DOM is ready.
   * @param {Function} callback
   */
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

  /**
   * Schedule an initial scan + init pass (deferred via microtask + RAF).
   */
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

  /**
   * Schedule a reconcile pass (debounced via microtask + RAF).
   * @param {string} reason
   */
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

  /**
   * Ensure a MutationObserver is watching for new/removed star-field elements.
   */
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
              target.getAttribute("wb-component") !== "star-field")
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

      // Defensive: remove stale canvas/wrapper if instance was lost
      const staleCanvas = element.querySelector(
        ":scope > .wb-star-field-canvas",
      );
      if (staleCanvas) staleCanvas.remove();
      const staleWrapper = element.querySelector(
        ":scope > .wb-star-field-content",
      );
      if (staleWrapper) {
        while (staleWrapper.firstChild)
          element.appendChild(staleWrapper.firstChild);
        staleWrapper.remove();
      }

      this.initElement(element);
    });
  }

  /**
   * Refresh: reconcile DOM from current state.
   */
  refresh() {
    this.reconcileTargets("refresh");
  }

  /**
   * Check for CSS conflicts (none expected — canvas overlay uses absolute positioning).
   * @returns {Array}
   */
  checkForConflicts() {
    return [];
  }
}

// ── Singleton export ──────────────────────────────────────────────────────────

const starFieldAnimator = new StarFieldAnimator();
export default starFieldAnimator;
export { StarFieldAnimator };
