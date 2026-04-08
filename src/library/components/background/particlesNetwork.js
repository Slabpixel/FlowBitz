/**
 * FlowBitz - Particles Network Background Component
 * Animated particle network with mouse-proximity connection lines.
 * Particles bounce within container, connections appear near cursor.
 * Includes optional parallax depth effect and idle connection mode.
 *
 * Visual reference: https://codepen.io/LeonKohli/pen/poQKLOL (LeonKohli, MIT)
 * Algorithm: Spatial hash grid (O(1) neighbor lookup), Canvas 2D + RAF.
 * Zero external dependencies.
 *
 * @version 1.0.0
 * @author Slabpixel Studio
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseAttribute } from '../../utils/core/attributeParser.js';
import { hexToRgb, colorToRgba } from '../../utils/core/colorUtils.js';

// ── CSS ───────────────────────────────────────────────────────────────────────

const COMPONENT_CSS = `
/* FlowBitz - ParticlesNetwork Component Styles */
.wb-particles-network-container {
  position: relative;
}

.wb-particles-network-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
  z-index: 0;
}

.wb-particles-network-content {
  position: relative;
  z-index: 1;
}
`;

// ── Constants ─────────────────────────────────────────────────────────────────

const TARGET_SELECTOR = '[wb-component="particles-network"]';
const INSTANCE_MARKER_ATTR = 'data-wb-particles-network-mounted';
const ALLOWED_TAGS = new Set(['DIV', 'SECTION']);

const DEFAULT_CONFIG = {
  count: 100,
  particleColor: '#ffffff',
  connectionColor: '#ffffff',
  background: '#000000',
  maxDistance: 120,
  speed: 1,
  mouseRadius: 150,
  minSize: 1,
  maxSize: 3,
  lineThickness: 1,
  connectIdle: false,
  connectPercent: 30,
  parallax: true,
  parallaxStrength: 1,
  idleTime: 1000,
  // Derived at parse time (pre-parsed colors for render loop)
  parsedParticleColor: { r: 255, g: 255, b: 255 },
  parsedConnectionColor: { r: 255, g: 255, b: 255 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Resolve any CSS color string to { r, g, b } at config-parse time.
 * @param {string} colorString
 * @returns {{ r: number, g: number, b: number }}
 */
function resolveColorToRgb(colorString) {
  if (colorString && colorString.startsWith('#')) {
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
  return { r: 255, g: 255, b: 255 };
}

// ── Spatial Hash ──────────────────────────────────────────────────────────────

/**
 * Build a spatial hash grid from a particle array.
 * CELL_SIZE = maxDistance ensures connected particles are always in adjacent cells.
 * Rebuilt every frame since particles move continuously.
 *
 * @param {Array} particles
 * @param {number} cellSize - Should equal config.maxDistance
 * @returns {Object} cells hash
 */
function buildSpatialHash(particles, cellSize) {
  const cells = {};
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const cx = Math.floor(p.x / cellSize);
    const cy = Math.floor(p.y / cellSize);
    if (!cells[cx]) cells[cx] = {};
    if (!cells[cx][cy]) cells[cx][cy] = [];
    cells[cx][cy].push(p);
  }
  return cells;
}

/**
 * Get all candidate neighbors from a 3×3 cell neighborhood.
 * @param {Object} cells
 * @param {number} cx
 * @param {number} cy
 * @returns {Array}
 */
function getNeighborCandidates(cells, cx, cy) {
  const candidates = [];
  for (let i = -1; i <= 1; i++) {
    const col = cells[cx + i];
    if (!col) continue;
    for (let j = -1; j <= 1; j++) {
      const cell = col[cy + j];
      if (cell) {
        for (let k = 0; k < cell.length; k++) {
          candidates.push(cell[k]);
        }
      }
    }
  }
  return candidates;
}

// ── Particle Factory ──────────────────────────────────────────────────────────

/**
 * Create a single particle with random position, velocity, depth, and size.
 * originalX/Y tracks the physics position; x/y is the display position (parallax offset applied).
 * Color is pre-computed as a string for zero-cost render-loop access.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} config
 * @returns {Object} particle state
 */
function createParticle(canvas, config) {
  const x = randomRange(0, canvas.width);
  const y = randomRange(0, canvas.height);
  const { r, g, b } = config.parsedParticleColor;

  return {
    x,
    y,
    originalX: x,
    originalY: y,
    vx: (Math.random() - 0.5) * config.speed * 2,
    vy: (Math.random() - 0.5) * config.speed * 2,
    depth: Math.random(),
    size: randomRange(config.minSize, config.maxSize),
    colorRgb: `rgb(${r},${g},${b})`,
    connects: false,
  };
}

// ── Config Parser ─────────────────────────────────────────────────────────────

/**
 * Parse all wb-* attributes from a container element into a validated config.
 * Values outside range are clamped with console.warn.
 * prefers-reduced-motion is handled here (speed clamp + parallax disable).
 *
 * @param {Element} element
 * @returns {Object} resolved config
 */
function parseConfig(element) {
  const config = { ...DEFAULT_CONFIG };

  // wb-count [20–500, warn >300]
  const countRaw = element.getAttribute('wb-count');
  if (countRaw !== null) {
    const parsed = parseInt(countRaw, 10);
    if (isNaN(parsed)) {
      console.warn(`FlowBitz ParticlesNetwork: wb-count "${countRaw}" is not valid. Using default ${DEFAULT_CONFIG.count}.`);
    } else {
      const clamped = Math.max(20, Math.min(500, parsed));
      if (parsed !== clamped) {
        console.warn(`FlowBitz ParticlesNetwork: wb-count ${parsed} clamped to ${clamped}.`);
      }
      if (clamped > 300) {
        console.warn(`FlowBitz ParticlesNetwork: wb-count ${clamped} may impact performance. Recommend keeping below 200 on mobile.`);
      }
      config.count = clamped;
    }
  }

  // wb-particle-color
  const particleColorRaw = parseAttribute.color(element, 'wb-particle-color');
  if (particleColorRaw) {
    config.particleColor = particleColorRaw;
  }
  config.parsedParticleColor = resolveColorToRgb(config.particleColor);

  // wb-connection-color
  const connectionColorRaw = parseAttribute.color(element, 'wb-connection-color');
  if (connectionColorRaw) {
    config.connectionColor = connectionColorRaw;
  }
  config.parsedConnectionColor = resolveColorToRgb(config.connectionColor);

  // wb-background ['transparent' or CSS color]
  const bgRaw = element.getAttribute('wb-background');
  if (bgRaw !== null) {
    if (bgRaw === 'transparent') {
      config.background = 'transparent';
    } else {
      const validated = parseAttribute.color(element, 'wb-background');
      if (validated) {
        config.background = validated;
      } else {
        console.warn(`FlowBitz ParticlesNetwork: Invalid wb-background "${bgRaw}". Using default.`);
      }
    }
  }

  // wb-max-distance [30–300]
  const maxDistRaw = element.getAttribute('wb-max-distance');
  if (maxDistRaw !== null) {
    const parsed = parseFloat(maxDistRaw);
    if (isNaN(parsed)) {
      console.warn(`FlowBitz ParticlesNetwork: wb-max-distance "${maxDistRaw}" is not valid. Using default ${DEFAULT_CONFIG.maxDistance}.`);
    } else {
      config.maxDistance = Math.max(30, Math.min(300, parsed));
    }
  }

  // wb-speed [0.1–5]
  const speedRaw = element.getAttribute('wb-speed');
  if (speedRaw !== null) {
    const parsed = parseFloat(speedRaw);
    if (isNaN(parsed)) {
      console.warn(`FlowBitz ParticlesNetwork: wb-speed "${speedRaw}" is not valid. Using default ${DEFAULT_CONFIG.speed}.`);
    } else {
      const clamped = Math.max(0.1, Math.min(5, parsed));
      if (parsed !== clamped) {
        console.warn(`FlowBitz ParticlesNetwork: wb-speed ${parsed} clamped to ${clamped}.`);
      }
      config.speed = clamped;
    }
  }

  // wb-mouse-radius [0–500]
  const mouseRadiusRaw = element.getAttribute('wb-mouse-radius');
  if (mouseRadiusRaw !== null) {
    const parsed = parseFloat(mouseRadiusRaw);
    if (!isNaN(parsed)) {
      config.mouseRadius = Math.max(0, Math.min(500, parsed));
    }
  }

  // wb-min-size [0.5–5]
  const minSizeRaw = element.getAttribute('wb-min-size');
  if (minSizeRaw !== null) {
    const parsed = parseFloat(minSizeRaw);
    if (!isNaN(parsed)) {
      config.minSize = Math.max(0.5, Math.min(5, parsed));
    }
  }

  // wb-max-size [1–10]
  const maxSizeRaw = element.getAttribute('wb-max-size');
  if (maxSizeRaw !== null) {
    const parsed = parseFloat(maxSizeRaw);
    if (!isNaN(parsed)) {
      config.maxSize = Math.max(1, Math.min(10, parsed));
    }
  }

  // Swap guard: minSize must be ≤ maxSize
  if (config.minSize > config.maxSize) {
    console.warn(`FlowBitz ParticlesNetwork: wb-min-size (${config.minSize}) > wb-max-size (${config.maxSize}). Values swapped.`);
    [config.minSize, config.maxSize] = [config.maxSize, config.minSize];
  }

  // wb-line-thickness [0.5–3]
  const thicknessRaw = element.getAttribute('wb-line-thickness');
  if (thicknessRaw !== null) {
    const parsed = parseFloat(thicknessRaw);
    if (!isNaN(parsed)) {
      config.lineThickness = Math.max(0.5, Math.min(3, parsed));
    }
  }

  // wb-connect-idle [boolean]
  const connectIdleRaw = parseAttribute.boolean(element, 'wb-connect-idle');
  if (connectIdleRaw !== null) {
    config.connectIdle = connectIdleRaw;
  }

  // wb-connect-percent [0–100]
  const connectPercentRaw = element.getAttribute('wb-connect-percent');
  if (connectPercentRaw !== null) {
    const parsed = parseFloat(connectPercentRaw);
    if (!isNaN(parsed)) {
      const clamped = Math.max(0, Math.min(100, parsed));
      if (parsed !== clamped) {
        console.warn(`FlowBitz ParticlesNetwork: wb-connect-percent ${parsed} clamped to ${clamped}.`);
      }
      config.connectPercent = clamped;
    }
  }

  // wb-parallax [boolean, default true]
  const parallaxRaw = parseAttribute.boolean(element, 'wb-parallax');
  if (parallaxRaw !== null) {
    config.parallax = parallaxRaw;
  }

  // wb-parallax-strength [0.1–10]
  const parallaxStrengthRaw = element.getAttribute('wb-parallax-strength');
  if (parallaxStrengthRaw !== null) {
    const parsed = parseFloat(parallaxStrengthRaw);
    if (!isNaN(parsed)) {
      config.parallaxStrength = Math.max(0.1, Math.min(10, parsed));
    }
  }

  // wb-idle-time [200–5000]
  const idleTimeRaw = element.getAttribute('wb-idle-time');
  if (idleTimeRaw !== null) {
    const parsed = parseInt(idleTimeRaw, 10);
    if (isNaN(parsed)) {
      console.warn(`FlowBitz ParticlesNetwork: wb-idle-time "${idleTimeRaw}" is not valid. Using default ${DEFAULT_CONFIG.idleTime}.`);
    } else {
      const clamped = Math.max(200, Math.min(5000, parsed));
      if (parsed !== clamped) {
        console.warn(`FlowBitz ParticlesNetwork: wb-idle-time ${parsed} clamped to ${clamped}.`);
      }
      config.idleTime = clamped;
    }
  }

  // prefers-reduced-motion: clamp speed + disable parallax
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    config.speed = Math.min(config.speed, 0.2);
    config.parallax = false;
  }

  return config;
}

// ── ParticlesNetworkAnimator Class ────────────────────────────────────────────

class ParticlesNetworkAnimator {
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
    injectStyles('wb-particles-network-styles', COMPONENT_CSS);
    this.stylesInjected = true;
  }

  // ── Canvas Setup ──────────────────────────────────────────────────────────

  /**
   * Inject canvas as firstChild and wrap existing children in content wrapper.
   * Pattern mirrors starField.js setupCanvas.
   *
   * @param {Element} element
   * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } | null}
   */
  setupCanvas(element) {
    element.classList.add('wb-particles-network-container');

    const existingChildren = Array.from(element.childNodes);
    if (existingChildren.length > 0) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('wb-particles-network-content');
      existingChildren.forEach((child) => wrapper.appendChild(child));
      element.appendChild(wrapper);
    }

    const canvas = document.createElement('canvas');
    canvas.classList.add('wb-particles-network-canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = element.offsetWidth || 0;
    canvas.height = element.offsetHeight || 0;
    element.insertBefore(canvas, element.firstChild);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('FlowBitz ParticlesNetwork: Canvas 2D API is not supported in this environment.');
      return null;
    }

    return { canvas, ctx };
  }

  // ── Animation Loop ────────────────────────────────────────────────────────

  /**
   * Start (or restart) the requestAnimationFrame render loop.
   * Sequence per frame:
   *   1. Clear / fill background
   *   2a. Mouse present + parallax on → freeze physics, apply parallax offset to x/y
   *   2b. No mouse (or parallax off) → move originalX/Y + bounce off walls, x/y = originalX/Y
   *   3. Draw particles
   *   4. Build spatial hash + draw connection lines
   *
   * When the mouse hovers, particles stop their random movement and purely follow
   * the parallax offset based on cursor position. Physics resumes on mouseleave.
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

    // Pre-populate all particles on first start so canvas is not empty
    if (instance.particles.length === 0) {
      for (let i = 0; i < config.count; i++) {
        instance.particles.push(createParticle(canvas, config));
      }
      // Assign connects flags for idle connection mode
      if (config.connectIdle && config.connectPercent > 0) {
        const threshold = config.connectPercent / 100;
        instance.particles.forEach((p) => {
          p.connects = Math.random() < threshold;
        });
      }
    }

    const { r: cr, g: cg, b: cb } = config.parsedConnectionColor;

    const loop = () => {
      // ── Step 1: Clear / fill background ────────────────────────────────
      if (config.background === 'transparent') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = config.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const mouseX = instance.mouseX;
      const mouseY = instance.mouseY;
      const hasMouseRadius = config.mouseRadius > 0;
      // Freeze physics and apply parallax when mouse is active and parallax is enabled
      const doParallax = config.parallax && mouseX !== null;

      // Pre-compute parallax offset once per frame (same for all particles, depth scales it)
      let parallaxDx = 0;
      let parallaxDy = 0;
      if (doParallax) {
        parallaxDx = (canvas.width / 2 - mouseX) / config.parallaxStrength;
        parallaxDy = (canvas.height / 2 - mouseY) / config.parallaxStrength;
      }

      // ── Step 2: Update position ─────────────────────────────────────────
      for (let i = 0; i < instance.particles.length; i++) {
        const p = instance.particles[i];

        if (doParallax) {
          // Mouse present + parallax on: freeze physics, shift display position by parallax offset.
          // Depth [0–1] scales the offset so "far" particles (depth≈1) barely move,
          // while "close" particles (depth≈0) shift the most.
          p.x = p.originalX + parallaxDx * (1 - p.depth);
          p.y = p.originalY + parallaxDy * (1 - p.depth);
        } else {
          // No mouse (or parallax disabled): advance physics + bounce off walls.
          // originalX/Y tracks the real position; x/y mirrors it directly.
          p.originalX += p.vx;
          p.originalY += p.vy;

          if (p.originalX <= 0) {
            p.originalX = 0;
            p.vx = Math.abs(p.vx);
          } else if (p.originalX >= canvas.width) {
            p.originalX = canvas.width;
            p.vx = -Math.abs(p.vx);
          }

          if (p.originalY <= 0) {
            p.originalY = 0;
            p.vy = Math.abs(p.vy);
          } else if (p.originalY >= canvas.height) {
            p.originalY = canvas.height;
            p.vy = -Math.abs(p.vy);
          }

          p.x = p.originalX;
          p.y = p.originalY;
        }
      }

      // ── Step 4: Draw particles ──────────────────────────────────────────
      for (let i = 0; i < instance.particles.length; i++) {
        const p = instance.particles[i];
        ctx.beginPath();
        ctx.fillStyle = p.colorRgb;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Step 5: Connection lines via spatial hash ───────────────────────
      if (hasMouseRadius || config.connectIdle) {
        const cells = buildSpatialHash(instance.particles, config.maxDistance);
        const maxDist = config.maxDistance;
        const mouseRadSq = config.mouseRadius * config.mouseRadius;

        ctx.lineWidth = config.lineThickness;
        ctx.setLineDash([]);

        for (let i = 0; i < instance.particles.length; i++) {
          const p = instance.particles[i];
          const cx = Math.floor(p.x / maxDist);
          const cy = Math.floor(p.y / maxDist);
          const neighbors = getNeighborCandidates(cells, cx, cy);

          // Mouse proximity check for this particle
          let pNearMouse = false;
          if (hasMouseRadius && mouseX !== null) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            pNearMouse = (mdx * mdx + mdy * mdy) < mouseRadSq;
          }

          for (let j = 0; j < neighbors.length; j++) {
            const other = neighbors[j];
            if (other === p) continue;

            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distSq = dx * dx + dy * dy;
            if (distSq >= maxDist * maxDist) continue;

            // Determine if connection should be drawn
            let shouldDraw = false;

            if (hasMouseRadius && mouseX !== null) {
              // Either particle near mouse → draw
              if (pNearMouse) {
                shouldDraw = true;
              } else {
                const odx = other.x - mouseX;
                const ody = other.y - mouseY;
                shouldDraw = (odx * odx + ody * ody) < mouseRadSq;
              }
            }

            if (!shouldDraw && config.connectIdle) {
              shouldDraw = p.connects && other.connects;
            }

            if (!shouldDraw) continue;

            const dist = Math.sqrt(distSq);
            const opacity = (maxDist - dist) / maxDist;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${opacity})`;
            ctx.stroke();
          }
        }
      }

      instance.rafId = requestAnimationFrame(loop);
    };

    instance.rafId = requestAnimationFrame(loop);
  }

  // ── Mouse Tracking ────────────────────────────────────────────────────────

  /**
   * Bind RAF-throttled mousemove + mouseleave listeners on the container.
   * Idle timeout resets mouse coords after config.idleTime ms of inactivity.
   * Listeners are stored on instance for cleanup.
   *
   * @param {Element} element
   * @param {Object} instance
   */
  setupMouseTracking(element, instance) {
    let rafPending = false;

    const mousemoveHandler = (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const rect = element.getBoundingClientRect();
        instance.mouseX = e.clientX - rect.left;
        instance.mouseY = e.clientY - rect.top;

        clearTimeout(instance.idleTimeoutId);
        instance.idleTimeoutId = setTimeout(() => {
          instance.mouseX = null;
          instance.mouseY = null;
        }, instance.config.idleTime);
      });
    };

    const mouseleaveHandler = () => {
      instance.mouseX = null;
      instance.mouseY = null;
      clearTimeout(instance.idleTimeoutId);
      instance.idleTimeoutId = null;
    };

    element.addEventListener('mousemove', mousemoveHandler);
    element.addEventListener('mouseleave', mouseleaveHandler);

    instance.mousemoveHandler = mousemoveHandler;
    instance.mouseleaveHandler = mouseleaveHandler;
  }

  // ── Resize Handling ───────────────────────────────────────────────────────

  /**
   * Cancel RAF, resize canvas to new container dimensions, reset particles, restart.
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

    // Reset mouse coords — old positions are invalid after resize
    instance.mouseX = null;
    instance.mouseY = null;
    clearTimeout(instance.idleTimeoutId);
    instance.idleTimeoutId = null;

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

  // ── Page Visibility ───────────────────────────────────────────────────────

  /**
   * Pause RAF when tab is hidden, resume when visible.
   * Particle state is preserved across pause/resume.
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

    document.addEventListener('visibilitychange', handler);
    instance.visibilityHandler = handler;
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────

  /**
   * Destroy a single instance — 12-step cleanup per spec FR-11.
   * Returns container to its pre-init state.
   *
   * @param {Element} element
   */
  destroyElement(element) {
    if (typeof document === 'undefined') return;

    const instance = this.instances.get(element);
    if (!instance) return;

    // 1. Cancel animation frame
    if (instance.rafId) {
      cancelAnimationFrame(instance.rafId);
      instance.rafId = null;
    }

    // 2. Clear idle timeout (safe even if already expired or null)
    clearTimeout(instance.idleTimeoutId);
    instance.idleTimeoutId = null;

    // 3. Disconnect ResizeObserver
    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
      instance.resizeObserver = null;
    }

    // 4. Remove visibilitychange listener
    if (instance.visibilityHandler) {
      document.removeEventListener('visibilitychange', instance.visibilityHandler);
      instance.visibilityHandler = null;
    }

    // 5. Remove mousemove listener
    if (instance.mousemoveHandler) {
      element.removeEventListener('mousemove', instance.mousemoveHandler);
      instance.mousemoveHandler = null;
    }

    // 6. Remove mouseleave listener
    if (instance.mouseleaveHandler) {
      element.removeEventListener('mouseleave', instance.mouseleaveHandler);
      instance.mouseleaveHandler = null;
    }

    // 7. Remove canvas from DOM
    if (instance.canvas && instance.canvas.parentNode === element) {
      element.removeChild(instance.canvas);
    }

    // 8. Unwrap content wrapper — restore children to container
    const wrapper = element.querySelector(':scope > .wb-particles-network-content');
    if (wrapper) {
      while (wrapper.firstChild) {
        element.appendChild(wrapper.firstChild);
      }
      element.removeChild(wrapper);
    }

    // 9. Remove container class
    element.classList.remove('wb-particles-network-container');

    // 10. Remove marker attribute
    element.removeAttribute(INSTANCE_MARKER_ATTR);

    // 11. Clear particle data and refs
    instance.particles = [];
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
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    if (this.domReady || document.readyState !== 'loading') {
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
    document.addEventListener('DOMContentLoaded', this.domReadyHandler, { once: true });
  }

  scheduleInitPass() {
    if (typeof window === 'undefined' || this.initScheduled) return;
    this.initScheduled = true;
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        this.initScheduled = false;
        this.reconcileTargets('init-pass');
      });
    });
  }

  scheduleReconcile(reason = 'observer') {
    if (typeof window === 'undefined' || this.reconcileScheduled) return;
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
    if (typeof document === 'undefined' || this.mutationObserver || !document.body) return;

    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldReconcile = false;

      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const target = /** @type {Element} */ (mutation.target);
          if (
            mutation.attributeName === 'wb-component' &&
            (target.matches?.(TARGET_SELECTOR) ||
              this.instances.has(target) ||
              target.getAttribute('wb-component') !== 'particles-network')
          ) {
            shouldReconcile = true;
          }
        }

        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
            shouldReconcile = true;
          }
        }
      }

      if (shouldReconcile) {
        this.scheduleReconcile('mutation-observer');
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['wb-component'],
    });
  }

  /**
   * Reconcile DOM targets — unmount stale instances, mount new ones.
   * @param {string} reason
   */
  reconcileTargets(reason = 'manual') {
    if (typeof document === 'undefined') return;

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
          element.setAttribute(INSTANCE_MARKER_ATTR, 'true');
        }
        return;
      }

      // Defensive: remove stale canvas/wrapper if instance was lost
      const staleCanvas = element.querySelector(':scope > .wb-particles-network-canvas');
      if (staleCanvas) staleCanvas.remove();
      const staleWrapper = element.querySelector(':scope > .wb-particles-network-content');
      if (staleWrapper) {
        while (staleWrapper.firstChild) element.appendChild(staleWrapper.firstChild);
        staleWrapper.remove();
      }

      this.initElement(element);
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /**
   * Initialise a single element.
   * @param {Element} element
   */
  initElement(element) {
    if (typeof document === 'undefined') return;

    // Guard: only <div> and <section>
    const tag = element.tagName?.toUpperCase();
    if (!ALLOWED_TAGS.has(tag)) {
      console.warn(
        `FlowBitz ParticlesNetwork: wb-component="particles-network" is only supported on <section> and <div>. Got <${tag?.toLowerCase() ?? 'unknown'}>.`
      );
      return;
    }

    // Guard: prevent double-init
    if (this.instances.has(element)) {
      console.warn('FlowBitz ParticlesNetwork: Element already initialized. Skipping.');
      return;
    }
    if (element.hasAttribute(INSTANCE_MARKER_ATTR)) {
      element.removeAttribute(INSTANCE_MARKER_ATTR);
    }

    // Performance warning for many instances
    if (this.instances.size >= 2 && !this.multiInstanceWarnShown) {
      console.warn(
        'FlowBitz ParticlesNetwork: Multiple instances detected. Consider performance impact — each instance runs its own render loop.'
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
      rafId: null,
      resizeObserver: null,
      visibilityHandler: null,
      mousemoveHandler: null,
      mouseleaveHandler: null,
      idleTimeoutId: null,
      pendingInit: false,
      mouseX: null,
      mouseY: null,
    };

    this.instances.set(element, instance);
    element.setAttribute(INSTANCE_MARKER_ATTR, 'true');

    this.startAnimation(instance);
    this.setupMouseTracking(element, instance);
    instance.resizeObserver = this.setupResizeObserver(element);
    this.setupVisibilityListener(instance);
  }

  /**
   * Initialise all [wb-component="particles-network"] elements in the document.
   */
  initAll() {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    this.ensureDOMReady(() => {
      this.ensureMutationObserver();
      this.scheduleInitPass();
    });
  }

  /**
   * Refresh: reconcile DOM from current state.
   */
  refresh() {
    this.reconcileTargets('refresh');
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

const particlesNetworkAnimator = new ParticlesNetworkAnimator();
export default particlesNetworkAnimator;
export { ParticlesNetworkAnimator };
