/**
 * FlowBitz - Dot Grid Background Component
 * Animated scrolling dot-grid background using pure CSS radial-gradient.
 *
 * Reference behavior:
 * https://codepen.io/alvarotrigo/pen/RwYYBZP
 */

import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseAttribute } from "../../utils/core/attributeParser.js";
import { AnimationStateManager } from "../../utils/animation/animationStateManager.js";

const COMPONENT_CSS = `
.wb-dot-grid-container {
  position: relative;
}

.wb-dot-grid-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--wb-dot-bg-color, transparent);
  background-image: radial-gradient(
    circle,
    var(--wb-dot-color, rgba(255, 255, 255, 0.25)) var(--wb-dot-radius, 1px),
    transparent 0
  );
  background-size: var(--wb-dot-spacing, 24px) var(--wb-dot-spacing, 24px);
  background-position: 0 0;
  opacity: var(--wb-dot-opacity, 1);
  animation: wb-dot-grid-scroll var(--wb-dot-speed, 20s) linear infinite;
}

@keyframes wb-dot-grid-scroll {
  to {
    background-position: var(--wb-dot-spacing, 24px) var(--wb-dot-spacing, 24px);
  }
}

.wb-dot-grid-layer--horizontal {
  animation-name: wb-dot-grid-scroll-h;
}

@keyframes wb-dot-grid-scroll-h {
  to {
    background-position: var(--wb-dot-spacing, 24px) 0;
  }
}

.wb-dot-grid-layer--vertical {
  animation-name: wb-dot-grid-scroll-v;
}

@keyframes wb-dot-grid-scroll-v {
  to {
    background-position: 0 var(--wb-dot-spacing, 24px);
  }
}

.wb-dot-grid-layer--none {
  animation: none;
}

.wb-dot-grid-layer--paused {
  animation-play-state: paused;
}

.wb-dot-grid-content {
  position: relative;
  z-index: 1;
}
`;

const DEFAULT_CONFIG = {
  dotColor: "rgba(255,255,255,0.25)",
  dotSize: 1,
  dotSpacing: 24,
  speed: 1,
  direction: "diagonal",
  bgColor: "transparent",
  opacity: 1,
  paused: false,
};

const TARGET_SELECTOR = '[wb-component="dot-grid"]';
const MOUNT_ATTR = "data-wb-dot-grid-mounted";
const ALLOWED_TAGS = new Set(["DIV", "SECTION"]);
const VALID_DIRECTIONS = ["diagonal", "horizontal", "vertical", "none"];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

class DotGridAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
  }

  injectComponentStyles() {
    if (this.stylesInjected) return;
    injectStyles("wb-dot-grid-styles", COMPONENT_CSS);
    this.stylesInjected = true;
  }

  parseConfig(element) {
    const config = { ...DEFAULT_CONFIG };

    const dotColor = parseAttribute.color(element, "wb-dot-color");
    if (dotColor) config.dotColor = dotColor;

    const dotSize = parseAttribute.number(element, "wb-dot-size", parseFloat);
    if (dotSize !== null) {
      const clamped = clamp(dotSize, 0.5, 8);
      if (clamped !== dotSize) {
        console.warn(
          `[DotGrid] wb-dot-size=${dotSize} out of range [0.5-8], clamped to ${clamped}`,
        );
      }
      config.dotSize = clamped;
    }

    const dotSpacing = parseAttribute.number(
      element,
      "wb-dot-spacing",
      parseFloat,
    );
    if (dotSpacing !== null) {
      const clamped = clamp(dotSpacing, 8, 80);
      if (clamped !== dotSpacing) {
        console.warn(
          `[DotGrid] wb-dot-spacing=${dotSpacing} out of range [8-80], clamped to ${clamped}`,
        );
      }
      config.dotSpacing = clamped;
    }

    if (config.dotSize >= config.dotSpacing / 2) {
      const maxSize = Math.max(0.5, config.dotSpacing / 2 - 1);
      console.warn(
        `[DotGrid] wb-dot-size (${config.dotSize}) is too large for wb-dot-spacing (${config.dotSpacing}). Clamped to ${maxSize}.`,
      );
      config.dotSize = maxSize;
    }

    const speed = parseAttribute.number(element, "wb-speed", parseFloat);
    if (speed !== null) {
      const clamped = clamp(speed, 0.1, 5);
      if (clamped !== speed) {
        console.warn(
          `[DotGrid] wb-speed=${speed} out of range [0.1 - 5], clamped to ${clamped}`,
        );
      }
      config.speed = clamped;
    }

    const direction = parseAttribute.string(element, "wb-direction");
    if (direction) {
      if (VALID_DIRECTIONS.includes(direction)) {
        config.direction = direction;
      } else {
        console.warn(
          `[DotGrid] wb-direction="${direction}" is invalid. Using "diagonal".`,
        );
      }
    }

    const bgColor = parseAttribute.color(element, "wb-bg-color");
    if (bgColor) {
      config.bgColor = bgColor;
    } else {
      const rawBgColor = parseAttribute.string(element, "wb-bg-color");
      if (rawBgColor === "transparent") {
        config.bgColor = "transparent";
      }
    }

    const opacity = parseAttribute.number(element, "wb-opacity", parseFloat);
    if (opacity !== null) {
      const clamped = clamp(opacity, 0, 1);
      if (clamped !== opacity) {
        console.warn(
          `[DotGrid] wb-opacity=${opacity} out of range [0-1], clamped to ${clamped}`,
        );
      }
      config.opacity = clamped;
    }

    const paused = parseAttribute.boolean(element, "wb-paused");
    if (paused !== null) {
      config.paused = paused;
    }

    return config;
  }

  injectLayer(element) {
    this.injectComponentStyles();
    element.classList.add("wb-dot-grid-container");

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("wb-dot-grid-content");

    const existingChildren = Array.from(element.childNodes);
    existingChildren.forEach((child) => contentWrapper.appendChild(child));
    element.appendChild(contentWrapper);

    const layer = document.createElement("div");
    layer.classList.add("wb-dot-grid-layer");
    layer.setAttribute("aria-hidden", "true");
    element.insertBefore(layer, element.firstChild);

    return { layer, contentWrapper };
  }

  applyStyles(layer, config) {
    layer.style.setProperty("--wb-dot-color", config.dotColor);
    layer.style.setProperty("--wb-dot-radius", `${config.dotSize}px`);
    layer.style.setProperty("--wb-dot-spacing", `${config.dotSpacing}px`);
    layer.style.setProperty("--wb-dot-speed", `${config.speed}s`);
    layer.style.setProperty("--wb-dot-bg-color", config.bgColor);
    layer.style.setProperty("--wb-dot-opacity", String(config.opacity));

    layer.classList.remove(
      "wb-dot-grid-layer--diagonal",
      "wb-dot-grid-layer--horizontal",
      "wb-dot-grid-layer--vertical",
      "wb-dot-grid-layer--none",
      "wb-dot-grid-layer--paused",
    );

    layer.classList.add(`wb-dot-grid-layer--${config.direction}`);
    if (config.paused) {
      layer.classList.add("wb-dot-grid-layer--paused");
    }
  }

  initElement(element) {
    if (typeof document === "undefined") return;
    if (!(element instanceof Element)) return;

    if (!ALLOWED_TAGS.has(element.tagName)) {
      console.warn(
        `[DotGrid] Only <div> and <section> are supported. Got <${element.tagName.toLowerCase()}>.`,
      );
      return;
    }

    if (element.hasAttribute(MOUNT_ATTR) || this.instances.has(element)) {
      console.warn(
        "[DotGrid] Element already initialized. Destroy before re-initializing.",
      );
      return;
    }

    const config = this.parseConfig(element);
    const { layer, contentWrapper } = this.injectLayer(element);
    this.applyStyles(layer, config);

    element.setAttribute(MOUNT_ATTR, "true");

    const instance = { element, layer, contentWrapper, config };
    this.instances.set(element, instance);

    AnimationStateManager.dispatchLifecycleEvent(element, "init", "dot-grid", {
      instance,
    });
  }

  initAll() {
    if (typeof document === "undefined") return;

    const doInit = () => {
      const elements = document.querySelectorAll(TARGET_SELECTOR);
      elements.forEach((element) => this.initElement(element));
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", doInit, { once: true });
      return;
    }

    doInit();
  }

  destroyElement(element) {
    if (typeof document === "undefined") return;

    const instance = this.instances.get(element);
    if (!instance) return;

    if (instance.layer && instance.layer.parentNode === element) {
      element.removeChild(instance.layer);
    }

    if (
      instance.contentWrapper &&
      instance.contentWrapper.parentNode === element
    ) {
      while (instance.contentWrapper.firstChild) {
        element.appendChild(instance.contentWrapper.firstChild);
      }
      element.removeChild(instance.contentWrapper);
    }

    element.classList.remove("wb-dot-grid-container");
    element.removeAttribute(MOUNT_ATTR);

    AnimationStateManager.dispatchLifecycleEvent(
      element,
      "destroy",
      "dot-grid",
      { instance },
    );

    this.instances.delete(element);
  }

  destroyAll() {
    Array.from(this.instances.keys()).forEach((element) =>
      this.destroyElement(element),
    );
  }

  refresh() {
    this.destroyAll();
    this.initAll();
  }

  checkForConflicts() {
    return [];
  }
}

const dotGridAnimator = new DotGridAnimator();

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      dotGridAnimator.initAll();
    });
  } else {
    dotGridAnimator.initAll();
  }
}

export default dotGridAnimator;
export { DotGridAnimator };
