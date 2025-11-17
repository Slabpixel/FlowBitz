/**
 * Image Trail Component
 * Creates animated image trail effect that follows mouse movement
 * Converted from React to Vanilla JS - supports 8 animation variants
 * Original: reactbits.dev
 * 
 * Usage:
 * <div wb-component="image-trail" 
 *      wb-image-1="url1.jpg" 
 *      wb-image-2="url2.jpg" 
 *      wb-image-3="url3.jpg"
 *      wb-variant="1">
 * </div>
 * 
 * Add more images: wb-image-4, wb-image-5, etc.
 * 
 * @requires GSAP
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';

// Component-specific CSS
const componentCSS = `
/* Image Trail Container */
.wb-image-trail {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  border-radius: 8px;
  background: transparent;
  overflow: visible;
}

/* Individual trail images */
.wb-image-trail__img {
  width: 190px;
  aspect-ratio: 1.1;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  will-change: transform, filter;
}

/* Inner image wrapper for zoom effects */
.wb-image-trail__img-inner {
  background-position: 50% 50%;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  position: absolute;
  top: calc(-1 * 20px / 2);
  left: calc(-1 * 20px / 2);
}
`;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Linear interpolation
 */
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

/**
 * Get mouse/touch position relative to element
 */
function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

/**
 * Calculate distance between two points
 */
function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

/**
 * Get new position in circular array
 */
function getNewPosition(position, offset, arr) {
  const realOffset = Math.abs(offset) % arr.length;
  if (position - realOffset >= 0) {
    return position - realOffset;
  } else {
    return arr.length - (realOffset - position);
  }
}

// ============================================
// IMAGE ITEM CLASS
// ============================================

class ImageItem {
  constructor(DOM_el) {
    this.DOM = {
      el: DOM_el,
      inner: DOM_el.querySelector('.wb-image-trail__img-inner')
    };
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.rect = null;
    this.getRect();
    this.initEvents();
  }

  initEvents() {
    this.resize = () => {
      if (window.gsap) {
        window.gsap.set(this.DOM.el, this.defaultStyle);
      }
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}

// ============================================
// VARIANT 1: Basic fade and move
// ============================================

class ImageTrailVariant1 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) {
      console.warn('ImageTrail Variant1: GSAP not available');
      return;
    }
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2
        },
        0.4
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 2: Scale from 0 with brightness
// ============================================

class ImageTrailVariant2 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)'
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 3: Random scatter upward
// ============================================

class ImageTrailVariant3 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          xPercent: 0,
          yPercent: 0,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 1.2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.6,
          ease: 'power2',
          opacity: 0,
          scale: 0.2,
          xPercent: () => window.gsap.utils.random(-30, 30),
          yPercent: -200
        },
        0.6
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 4: Direction-based movement with brightness
// ============================================

class ImageTrailVariant4 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    
    dx *= distance / 100;
    dy *= distance / 100;
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2,
          filter: `brightness(${Math.max((400 * distance) / 100, 100)}%) contrast(${Math.max((400 * distance) / 100, 100)}%)`
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%) contrast(100%)'
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0
        },
        0.4
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: 'power4',
          x: `+=${dx * 110}`,
          y: `+=${dy * 110}`
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 5: Rotation based on angle
// ============================================

class ImageTrailVariant5 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.lastAngle = 0;
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    
    const isMovingClockwise = angle >= this.lastAngle;
    this.lastAngle = angle;
    
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance !== 0) {
      dx /= distance;
      dy /= distance;
    }
    
    dx *= distance / 150;
    dy *= distance / 150;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          filter: 'brightness(80%)',
          scale: 0.1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotation: startAngle
        },
        {
          duration: 1,
          ease: 'power2',
          scale: 1,
          filter: 'brightness(100%)',
          x: this.mousePos.x - img.rect.width / 2 + dx * 70,
          y: this.mousePos.y - img.rect.height / 2 + dy * 70,
          rotation: this.lastAngle
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'expo',
          opacity: 0
        },
        0.5
      )
      .to(
        img.DOM.el,
        {
          duration: 1.5,
          ease: 'power4',
          x: `+=${dx * 120}`,
          y: `+=${dy * 120}`
        },
        0.05
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 6: Speed-based effects (size, blur, grayscale)
// ============================================

class ImageTrailVariant6 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  mapSpeedToSize(speed, minSize, maxSize) {
    const maxSpeed = 200;
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);
  }

  mapSpeedToBrightness(speed, minB, maxB) {
    const maxSpeed = 70;
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);
  }

  mapSpeedToBlur(speed, minBlur, maxBlur) {
    const maxSpeed = 90;
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);
  }

  mapSpeedToGrayscale(speed, minG, maxG) {
    const maxSpeed = 90;
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);
  }

  showNextImage() {
    if (!window.gsap) return;
    
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let speed = Math.sqrt(dx * dx + dy * dy);
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    let scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);
    let brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);
    let blurValue = this.mapSpeedToBlur(speed, 20, 0);
    let grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.8,
          ease: 'power3',
          scale: scaleFactor,
          filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2
        },
        {
          duration: 0.8,
          ease: 'power3',
          scale: 1
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3.in',
          opacity: 0,
          scale: 0.2
        },
        0.45
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 7: Multiple visible images with rotation
// ============================================

class ImageTrailVariant7 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.visibleImagesCount = 0;
    this.visibleImagesTotal = 9;
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    ++this.visibleImagesCount;
    
    window.gsap.killTweensOf(img.DOM.el);
    
    const scaleValue = window.gsap.utils.random(0.5, 1.6);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          scale: scaleValue - Math.max(window.gsap.utils.random(0.2, 0.6), 0),
          rotationZ: 0,
          opacity: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.4,
          ease: 'power3',
          scale: scaleValue,
          rotationZ: window.gsap.utils.random(-3, 3),
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      );
    
    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
      const oldImg = this.images[lastInQueue];
      
      window.gsap.to(oldImg.DOM.el, {
        duration: 0.4,
        ease: 'power4',
        opacity: 0,
        scale: 1.3,
        onComplete: () => {
          if (this.activeImagesCount === 0) {
            this.isIdle = true;
          }
        }
      });
    }
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT 8: 3D perspective with rotation
// ============================================

class ImageTrailVariant8 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [];
    this.imagesTotal = 0;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.cachedRotation = { x: 0, y: 0 };
    this.zValue = 0;
    this.cachedZValue = 0;
    this.animationFrame = null;
    
    this.init();
  }

  init() {
    const imgElements = this.DOM.el.querySelectorAll('.wb-image-trail__img');
    this.images = Array.from(imgElements).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    
    const handlePointerMove = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);
    
    const initRender = (ev) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.render();
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
    
    this.boundHandlePointerMove = handlePointerMove;
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const relX = this.mousePos.x - centerX;
    const relY = this.mousePos.y - centerY;
    
    this.rotation.x = -(relY / centerY) * 30;
    this.rotation.y = (relX / centerX) * 30;
    this.cachedRotation = { ...this.rotation };
    
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const proportion = distanceFromCenter / maxDistance;
    
    this.zValue = proportion * 1200 - 600;
    this.cachedZValue = this.zValue;
    
    const normalizedZ = (this.zValue + 600) / 1200;
    const brightness = 0.2 + normalizedZ * 2.3;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    
    const img = this.images[this.imgPosition];
    
    window.gsap.killTweensOf(img.DOM.el);
    
    window.gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .set(this.DOM.el, { perspective: 1000 }, 0)
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          z: 0,
          scale: 1 + this.cachedZValue / 1000,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotationX: this.cachedRotation.x,
          rotationY: this.cachedRotation.y,
          filter: `brightness(${brightness})`
        },
        {
          duration: 1,
          ease: 'expo',
          scale: 1 + this.zValue / 1000,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
          rotationX: this.rotation.x,
          rotationY: this.rotation.y
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          z: -800
        },
        0.3
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.container.removeEventListener('mousemove', this.boundHandlePointerMove);
    this.container.removeEventListener('touchmove', this.boundHandlePointerMove);
    this.images.forEach(img => img.destroy());
  }
}

// ============================================
// VARIANT MAP
// ============================================

const variantMap = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  3: ImageTrailVariant3,
  4: ImageTrailVariant4,
  5: ImageTrailVariant5,
  6: ImageTrailVariant6,
  7: ImageTrailVariant7,
  8: ImageTrailVariant8
};

// ============================================
// MAIN ANIMATOR CLASS
// ============================================

class ImageTrailAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'ImageTrail';
    this.componentClasses = webflowBitsClasses.forComponent('image-trail');
    this.defaultConfig = {
      images: '', // Image URLs array (parsed from wb-image-1, wb-image-2, etc. or wb-images for backward compatibility)
      variant: 1, // Animation variant (1-8)
      threshold: 80, // Distance threshold for new image
      imageWidth: '190px',
      imageHeight: 'auto',
      disabled: false
    };
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-image-trail-styles', componentCSS);
      this.stylesInjected = true;
    } catch (error) {
      console.error('Failed to inject ImageTrail styles:', error);
    }
  }

  /**
   * Ensure styles are injected when needed
   */
  ensureStylesInjected() {
    if (!this.stylesInjected) {
      this.injectComponentStyles();
    }
  }

  /**
   * Initialize all ImageTrail elements on the page
   */
  async initAll() {
    this.ensureStylesInjected();
    
    const elements = document.querySelectorAll('[wb-component="image-trail"]');
    const initPromises = Array.from(elements).map(element => {
      if (!this.instances.has(element)) {
        return this.initElement(element);
      }
    });
    
    await Promise.all(initPromises);
  }

  /**
   * Parse image URLs from wb-image-* attributes (similar to textType's wb-text-*)
   */
  parseImagesFromAttributes(element) {
    const images = [];
    let index = 1;
    
    while (true) {
      const imageAttr = element.getAttribute(`wb-image-${index}`);
      if (imageAttr) {
        const trimmedUrl = imageAttr.trim();
        if (trimmedUrl) {
          images.push(trimmedUrl);
        }
        index++;
      } else {
        break;
      }
    }
    
    return images;
  }

  /**
   * Parse image URLs from data attribute (backward compatibility)
   */
  parseImages(imagesString) {
    try {
      // Try parsing as JSON array first
      if (imagesString.trim().startsWith('[')) {
        return JSON.parse(imagesString);
      }
      // Otherwise split by comma
      return imagesString.split(',').map(url => url.trim()).filter(url => url);
    } catch (e) {
      console.warn('ImageTrail: Failed to parse images, treating as comma-separated', e);
      return imagesString.split(',').map(url => url.trim()).filter(url => url);
    }
  }

  /**
   * Preload an image and return a promise
   * @param {string} url - Image URL to preload
   * @returns {Promise<HTMLImageElement>} Promise that resolves when image loads
   */
  preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve(img);
      };
      
      img.onerror = (error) => {
        console.warn(`ImageTrail: Failed to load image: ${url}`, error);
        // Still resolve to allow component to work with available images
        // You can change this to reject() if you want to fail completely
        resolve(null);
      };
      
      // Set crossOrigin for CORS if needed (only for absolute URLs from different origins)
      try {
        if (url.startsWith('http://') || url.startsWith('https://')) {
          const imgUrl = new URL(url, window.location.href);
          const currentOrigin = window.location.origin;
          if (imgUrl.origin !== currentOrigin) {
            img.crossOrigin = 'anonymous';
          }
        }
      } catch (e) {
        // If URL parsing fails, skip CORS setting
      }
      
      img.src = url;
    });
  }

  /**
   * Preload all images and return a promise
   * @param {string[]} imageUrls - Array of image URLs
   * @returns {Promise<HTMLImageElement[]>} Promise that resolves when all images load
   */
  async preloadAllImages(imageUrls) {
    const loadPromises = imageUrls.map(url => this.preloadImage(url));
    const results = await Promise.all(loadPromises);
    
    // Filter out failed images and log warning
    const loadedImages = results.filter(img => img !== null);
    const failedCount = results.length - loadedImages.length;
    
    if (failedCount > 0) {
      console.warn(`ImageTrail: ${failedCount} image(s) failed to load. Component will use ${loadedImages.length} available image(s).`);
    }
    
    if (loadedImages.length === 0) {
      throw new Error('ImageTrail: No images could be loaded');
    }
    
    return loadedImages;
  }

  /**
   * Initialize a specific element
   * @param {HTMLElement} element - Element to initialize
   */
  async initElement(element) {
    if (this.instances.has(element)) {
      return; // Already initialized
    }

    this.ensureStylesInjected();

    try {
      // Check if GSAP is loaded
      if (!window.gsap) {
        console.error('ImageTrail: GSAP is required but not loaded. Please include GSAP before initializing ImageTrail.');
        return;
      }

      // Define attribute map for parseElementConfig
      const attributeMap = {
        images: { attribute: 'wb-images', type: 'string' },
        variant: { attribute: 'wb-variant', type: 'number' },
        threshold: { attribute: 'wb-threshold', type: 'number' },
        imageWidth: { attribute: 'wb-image-width', type: 'string' },
        imageHeight: { attribute: 'wb-image-height', type: 'string' },
        disabled: { attribute: 'wb-disabled', type: 'boolean' }
      };

      // Parse configuration from data attributes
      const config = parseElementConfig(element, this.defaultConfig, attributeMap);
      
      // Priority 1: Parse images from wb-image-1, wb-image-2, wb-image-3, etc.
      let images = this.parseImagesFromAttributes(element);
      
      // Priority 2: Fallback to wb-images attribute (backward compatibility)
      if (images.length === 0 && typeof config.images === 'string' && config.images.trim()) {
        images = this.parseImages(config.images);
      }
      
      // Set parsed images to config
      config.images = images;

      // Silent return if disabled or no images (don't warn on empty default)
      if (config.disabled || config.images.length === 0) {
        return;
      }

      // Add base class
      element.classList.add(this.componentClasses.base);
      
      // Ensure container has position context
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }

      // Preload all images before creating DOM elements
      const loadedImages = await this.preloadAllImages(config.images);
      
      // Filter config.images to only include successfully loaded images
      const validImageUrls = loadedImages.map(img => img.src);
      config.images = config.images.filter(url => validImageUrls.includes(url));
      
      if (config.images.length === 0) {
        console.error('ImageTrail: No valid images to display');
        element.classList.remove(this.componentClasses.base);
        return;
      }

      // Create image elements with preloaded images
      const imageElements = config.images.map((url, i) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'wb-image-trail__img';
        imgDiv.style.width = config.imageWidth;
        if (config.imageHeight !== 'auto') {
          imgDiv.style.height = config.imageHeight;
        }
        
        const imgInner = document.createElement('div');
        imgInner.className = 'wb-image-trail__img-inner';
        // Use the preloaded image URL (ensures it's loaded)
        imgInner.style.backgroundImage = `url(${url})`;
        
        imgDiv.appendChild(imgInner);
        element.appendChild(imgDiv);
        
        return imgDiv;
      });

      // Get variant class
      const VariantClass = variantMap[config.variant] || variantMap[1];
      
      // Initialize variant (images are now guaranteed to be loaded)
      const variantInstance = new VariantClass(element, config);

      // Store instance
      const instance = {
        element,
        config,
        variantInstance,
        imageElements
      };

      this.instances.set(element, instance);

    } catch (error) {
      console.error('ImageTrail: Failed to initialize element', error);
      // Clean up on error
      if (element.classList.contains(this.componentClasses.base)) {
        element.classList.remove(this.componentClasses.base);
      }
    }
  }

  /**
   * Refresh (not needed for this component, but required by interface)
   */
  refresh() {
    // Image trail doesn't use ScrollTrigger
  }

  /**
   * Destroy a specific instance
   * @param {HTMLElement} element - Element to destroy
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Destroy variant instance
    if (instance.variantInstance && instance.variantInstance.destroy) {
      instance.variantInstance.destroy();
    }

    // Remove image elements
    if (instance.imageElements) {
      instance.imageElements.forEach(img => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
      });
    }

    // Remove classes
    element.classList.remove(this.componentClasses.base);

    this.instances.delete(element);
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroy(element);
    });
    this.instances.clear();
  }

  /**
   * Check for CSS conflicts (optional)
   */
  checkForConflicts() {
    return [];
  }
}

// Create and export singleton instance
const imageTrailAnimator = new ImageTrailAnimator()

// Auto-initialize components with wb-component="image-trail"
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      imageTrailAnimator.initAll().catch(err => {
        console.error('ImageTrail: Error during auto-initialization', err);
      });
    })
  } else {
    // DOM already loaded, initialize immediately
    imageTrailAnimator.initAll().catch(err => {
      console.error('ImageTrail: Error during auto-initialization', err);
    });
  }
}

export default imageTrailAnimator