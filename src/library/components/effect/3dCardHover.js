import { injectStyles } from "../../utils/core/injectStyles.js";
import { parseElementConfig, mergeAttributeMaps } from "../../utils/core/attributeParser.js";
import { AnimationStateManager, PerformanceOptimizer } from "../../utils/animation/animationStateManager.js";

const COMPONENT_CSS_ID = 'wb-3d-card-hover-styles';
const componentCSS = `
  /* FlowBitz - 3D Card Hover Effect Styles */
  .wb-hover3d__inner {
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 300ms linear;
    backface-visibility: hidden;
    transform-origin: center center;
  }
`;

function ensureStylesInjected() {
  injectStyles(COMPONENT_CSS_ID, componentCSS);
}

class Hover3DCard {
  constructor(root, config, instancesMap) {
    this.root = root;
    this.config = config;
    this.instancesMap = instancesMap;
    this.wrapper = null;
    this.boundMouseMove = null;
    this.boundMouseEnter = null;
    this.boundMouseLeave = null;
    this.componentName = '3d-card-hover';
    this.movedRootClasses = [];
    this.movedRootId = null;
    this.init();
  }

  init() {
    const tag = (this.root.tagName || '').toUpperCase();
    if (tag !== 'DIV' && tag !== 'BUTTON') {
      console.warn('3d-card-hover: Root element must be a <div> or <button>', this.root);
      return;
    }

    if (this.root.dataset.hover3dInitialized === 'true') return;

    ensureStylesInjected();

    // 1) Root hanya sebagai pembungkus (perspective saja)
    this.root.style.perspective = `${this.config.perspective}px`;

    // Simpan semua class asli root dan kosongkan
    this.movedRootClasses = Array.from(this.root.classList);
    if (this.movedRootClasses.length) {
      this.root.className = '';
    }

    // 2) Buat wrapper inner
    const wrapper = document.createElement('div');
    wrapper.classList.add('wb-hover3d__inner');

    // Pindahkan semua kelas visual dari root → wrapper
    if (this.movedRootClasses.length) {
      wrapper.classList.add(...this.movedRootClasses);
    }

    this.movedRootId = this.root.id || null;
    if (this.movedRootId) {
      wrapper.id = this.movedRootId;
      this.root.removeAttribute('id');
    }

    // Salin inline style root, buang perspective
    const originalStyle = this.root.getAttribute('style') || '';
    const cleanedStyle = originalStyle.replace(/perspective\s*:\s*[^;]+;?/gi, '').trim();
    if (cleanedStyle) wrapper.setAttribute('style', cleanedStyle);

    // Default transition jika belum diset
    if (!wrapper.style.transition) {
      wrapper.style.transition = this.config.transition;
    }

    // Optimasi performa
    PerformanceOptimizer.optimizeForAnimation(wrapper, {
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      perspective: ''
    });

    // 3) Pindahkan children root → wrapper
    while (this.root.firstChild) {
      wrapper.appendChild(this.root.firstChild);
    }

    // 4) Sisipkan wrapper ke root
    this.root.appendChild(wrapper);
    this.wrapper = wrapper;

    // 5) Event pada wrapper
    const throttledMove = PerformanceOptimizer.throttle((e) => this.handleMouseMove(e), 16);
    this.boundMouseMove = (e) => throttledMove.call(this, e);
    this.boundMouseEnter = () => this.handleMouseEnter();
    this.boundMouseLeave = () => this.handleMouseLeave();

    this.wrapper.addEventListener('mousemove', this.boundMouseMove);
    this.wrapper.addEventListener('mouseenter', this.boundMouseEnter);
    this.wrapper.addEventListener('mouseleave', this.boundMouseLeave);

    this.root.dataset.hover3dInitialized = 'true';
  }

  handleMouseEnter() {
    // State pada wrapper (root hanya pembungkus)
    AnimationStateManager.setAnimatingState(this.wrapper, 'wb-hover3d');
    AnimationStateManager.dispatchLifecycleEvent(this.root, 'start', this.componentName);
  }

  handleMouseMove(e) {
    if (!this.wrapper) return;
    const rect = this.wrapper.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2);
    const x = dx / this.config.rotateDivisor;
    const y = -dy / this.config.rotateDivisor;
    this.wrapper.style.transform = `translateZ(0) rotateY(${x}deg) rotateX(${y}deg)`;
  }

  handleMouseLeave() {
    if (!this.wrapper) return;
    this.wrapper.style.transform = 'translateZ(0) rotateY(0deg) rotateX(0deg)';
    AnimationStateManager.setCompletedState(this.wrapper, 'wb-hover3d');
    AnimationStateManager.dispatchLifecycleEvent(this.root, 'complete', this.componentName);
  }

  destroy() {
    // Lepas listener dari wrapper
    if (this.boundMouseMove) this.wrapper?.removeEventListener('mousemove', this.boundMouseMove);
    if (this.boundMouseEnter) this.wrapper?.removeEventListener('mouseenter', this.boundMouseEnter);
    if (this.boundMouseLeave) this.wrapper?.removeEventListener('mouseleave', this.boundMouseLeave);

    // Kembalikan children ke root, kembalikan classes ke root
    if (this.wrapper) {
      PerformanceOptimizer.cleanupAfterAnimation(this.wrapper, { restoreOriginal: true });

      while (this.wrapper.firstChild) {
        this.root.appendChild(this.wrapper.firstChild);
      }

      // Kembalikan kelas yang dipindah ke root
      if (this.movedRootClasses.length) {
        this.root.classList.add(...this.movedRootClasses);
      }

      if (this.movedRootId) {
        this.root.id = this.movedRootId;
      }

      this.root.removeChild(this.wrapper);
      this.wrapper = null;
    }

    delete this.root.dataset.hover3dInitialized;
  }
};

class CardHover3DAnimator {
  constructor() {
    this.componentName = '3d-card-hover';
    this.instances = new Map();
    this.defaultConfig = {
      perspective: 1000,
      rotateDivisor: 25,
      transition: 'transform 300ms linear'
    };
    this.attributeMap = mergeAttributeMaps({
      perspective: { attribute: 'wb-perspective', type: 'number', parser: parseInt, min: 100, max: 5000 },
      rotateDivisor: { attribute: 'wb-rotate-divisor', type: 'number', parser: parseFloat, min: 1, max: 100 },
      transition: { attribute: 'wb-transition', type: 'string' }
    });
  };

  parseConfig(element) {
    return parseElementConfig(element, this.defaultConfig, this.attributeMap);
  };

  initElement(element) {
    if (this.instances.has(element)) return this.instances.get(element);
    const config = this.parseConfig(element);
    const instance = new Hover3DCard(element, config, this.instances);
    this.instances.set(element, instance);
    return instance;
  };

  initAll() {
    const elements = document.querySelectorAll('[wb-component="3d-card-hover"]');
    elements.forEach((el) => this.initElement(el));
  };

  refresh() { return this; };

  destroyAll() {
    this.instances.forEach((instance) => instance.destroy && instance.destroy());
    this.instances.clear();
  };
};

const cardHover3DAnimator = new CardHover3DAnimator();

document.addEventListener('DOMContentLoaded', () => {
  cardHover3DAnimator.initAll();
});

export default cardHover3DAnimator;
export { Hover3DCard, CardHover3DAnimator };