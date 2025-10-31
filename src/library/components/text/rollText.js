import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager, PerformanceOptimizer } from '../../utils/animation/animationStateManager.js';

gsap.registerPlugin(SplitText);

class RollTextAnimator {
  constructor() {
    this.instances = new Map();
    this.componentKey = 'roll-text';
    this.componentName = 'RollText';
    this.componentClasses = webflowBitsClasses.forComponent(this.componentKey);
    this.defaultConfig = {
      splitBy: "words", // "chars", "words"
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0,
      startDelay: 0,
      triggerOnView: false
    };
  }

  parseConfig(el) {
    const map = mergeAttributeMaps(
      commonAttributeMaps.animation,
      {
        splitBy: { attribute: 'wb-split-by', type: 'string', validValues: ['chars', 'words'] },
        duration: { attribute: 'wb-duration', type: 'number', parser: parseFloat, min: 0.05, max: 1.5, step: 0.05 },
        ease: { attribute: 'wb-ease', type: 'string' },
        stagger: { attribute: 'wb-stagger', type: 'number', parser: parseFloat, min: 0, max: 0.1, step: 0.01 }
      }
    );

    return parseElementConfig(el, this.defaultConfig, map);
  }

  findTextNode(wrapper) {
    return Array.from(wrapper.children).find(n => ['DIV', 'P', 'A', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(n.tagName)) || null;
  }

  buildStructure(wrapper, config) {
    const baseNode = this.findTextNode(wrapper);
    if (!baseNode) throw new Error ('RollText: No text node found in wrapper');

    // wrapper styling
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.position = 'relative';
    wrapper.style.verticalAlign = 'top';

    // vertical container
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.willChange = 'transform';
    container.style.transform = 'translateY(0px)';

    const line1 = baseNode;
    const line2 = baseNode.cloneNode(true);

    container.appendChild(line1);
    container.appendChild(line2);

    wrapper.innerHTML = '';
    wrapper.appendChild(container);

    const type = config.splitBy === 'chars' ? 'chars' : 'words';
    const split1 = new SplitText(line1, { type });
    const split2 = new SplitText(line2, { type });

    const targets1 = type === 'chars' ? split1.chars : split1.words;
    const targets2 = type === 'chars' ? split2.chars : split2.words;

    gsap.set(targets1, { yPercent: 0, opacity: 1, force3D: true });
    gsap.set(targets2, { yPercent: 0, opacity: 0, force3D: true });

    const calcSize = () => {
      const h = line1.offsetHeight;
      wrapper.style.height = h ? `${h}px` : '';
    };
    calcSize();

    const ro = new ResizeObserver(() => calcSize());
    ro.observe(line1);

    return { container, line1, line2, split1, split2, targets1, targets2, cleanup: () => ro.disconnect() }
  };

  attachHover(wrapper, instance) {
    const { targets1, targets2, config } = instance;

    const hoverIn = () => {
      instance.hoverTl?.kill();
      const tl = gsap.timeline();
      tl.to(targets1, {
        yPercent: -100,
        opacity: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
      }, 0);
      tl.to(targets2, {
        yPercent: -100,
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
      }, 0);
      instance.hoverTl = tl;
    };

    const hoverOut = () => {
      instance.hoverTl?.kill();
      const tl = gsap.timeline();
      tl.to(targets1, {
        yPercent: 0,
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
      }, 0);
      tl.to(targets2, {
        yPercent: 0,
        opacity: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
      }, 0);
      instance.hoverTl = tl;
    };

    const onEnter = () => hoverIn();
    const onLeave = () => hoverOut();

    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mouseleave', onLeave);

    instance._hoverHandlers = { onEnter, onLeave };
  };

  initElement(wrapper) {
    if (!wrapper || this.instances.has(wrapper)) return;
    const config = this.parseConfig(wrapper);

    try {
      ComponentClassManager.applyClasses(
        wrapper,
        [this.componentClasses.parent, this.componentClasses.animating],
        this.instances,
        this.componentName
      );

      const structure = this.buildStructure(wrapper, config);
      PerformanceOptimizer.optimizeForAnimation([structure.container]);

      const instance = { wrapper, config, ...structure };
      this.attachHover(wrapper, instance);

      AnimationStateManager.dispatchLifecycleEvent(wrapper, 'init', this.componentKey, { instance });
      this.instances.set(wrapper, instance);
    } catch (error) {
      console.error('RollText: Failed to initialize element', error);
      this.instances.delete(wrapper);
    }
  }

  initAll() {
    document.querySelectorAll('[wb-component="roll-text"]').forEach(n => this.initElement(n));
  }

  destroy(wrapper) {
    const inst = this.instances.get(wrapper);
    if (!inst) return;
    const { container, line1, split1, split2, cleanup, _hoverHandlers } = inst;

    if (_hoverHandlers) {
      wrapper.removeEventListener('mouseenter', _hoverHandlers.onEnter);
      wrapper.removeEventListener('mouseleave', _hoverHandlers.onLeave);
    }

    try { split1?.revert() } catch {}
    try { split2?.revert() } catch {}

    PerformanceOptimizer.cleanupAfterAnimation([container])

    if (container && line1) {
      wrapper.innerHTML = ''
      wrapper.appendChild(line1)
    }

    ComponentClassManager.removeClasses(
      wrapper,
      [this.componentClasses.parent, this.componentClasses.animating, this.componentClasses.completed],
      this.instances,
      this.componentName
    )

    cleanup?.()
    this.instances.delete(wrapper)
  }

  destroyAll() {
    this.instances.forEach((_, el) => this.destroy(el))
  }

  refresh() {
    this.destroyAll();
    this.initAll();
  }

  checkForConflicts() {
    return []
  }
};

const rollTextAnimator = new RollTextAnimator();
export default rollTextAnimator;
export { RollTextAnimator };