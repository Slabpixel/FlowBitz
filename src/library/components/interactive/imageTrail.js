import { gsap } from "gsap";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { checkCSSConflicts } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Inject component-specific CSS with unique namespace
const componentCSS = `
/* FlowBitz - ImageTrail Component Styles */
.wb-image-trail {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
  border-radius: 8px;
  background: transparent;
  overflow: visible;
}

.wb-image-trail__item {
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

.wb-image-trail__item-inner {
  background-position: 50% 50%;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-size: cover;
  position: absolute;
  top: calc(-1 * 20px / 2);
  left: calc(-1 * 20px / 2);
}

/* Performance optimization during animation */
.wb-image-trail-animating .wb-image-trail__item {
  will-change: transform, filter, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Clean up after animation */
.wb-image-trail-completed .wb-image-trail__item {
  will-change: auto;
  backface-visibility: visible;
}

/* Accessibility */
.wb-image-trail[aria-label] .wb-image-trail__item {
  speak: none;
}
`;

/**
 * Utility Functions
 */

// Linear interpolation function
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

// Get local pointer position relative to element
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

// Calculate distance between two points
function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

// Get new position with offset for circular array
function getNewPosition(position, offset, arr) {
  const realOffset = Math.abs(offset) % arr.length;
  if (position - realOffset >= 0) {
    return position - realOffset;
  } else {
    return arr.length - (realOffset - position);
  }
}

/**
 * ImageItem class - manages individual image elements
 */
class ImageItem {
  constructor(domElement) {
    this.DOM = { 
      el: domElement, 
      inner: domElement.querySelector('.wb-image-trail__item-inner') 
    };
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.rect = null;
    
    this.getRect();
    this.initEvents();
  }

  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
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

/**
 * ImageTrail Variant Classes
 */

class ImageTrailVariant1 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...this.DOM.el.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1,
        scale: 1,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4,
        ease: 'power1',
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4,
        ease: 'power3',
        opacity: 0,
        scale: 0.2
      }, 0.4);
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
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant2 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, scale: 0,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4, ease: 'power1', scale: 1,
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .fromTo(img.DOM.inner, {
        scale: 2.8, filter: 'brightness(250%)'
      }, {
        duration: 0.4, ease: 'power1',
        scale: 1, filter: 'brightness(100%)'
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4, ease: 'power2',
        opacity: 0, scale: 0.2
      }, 0.45);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant3 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, scale: 0, zIndex: this.zIndexVal,
        xPercent: 0, yPercent: 0,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4, ease: 'power1',
        scale: 1,
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .fromTo(img.DOM.inner, {
        scale: 1.2
      }, {
        duration: 0.4, ease: 'power1', scale: 1
      }, 0)
      .to(img.DOM.el, {
        duration: .6, ease: 'power2',
        opacity: 0, scale: 0.2,
        xPercent: () => gsap.utils.random(-30, 30),
        yPercent: -200
      }, 0.6);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant4 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) { dx /= distance; dy /= distance; }
    dx *= distance / 100;
    dy *= distance / 100;

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, scale: 0, zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4, ease: 'power1', scale: 1,
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .fromTo(img.DOM.inner, {
        scale: 2,
        filter: `brightness(${Math.max(400 * distance / 100, 100)}%) contrast(${Math.max(400 * distance / 100, 100)}%)`
      }, {
        duration: 0.4, ease: 'power1', scale: 1,
        filter: 'brightness(100%) contrast(100%)'
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4, ease: 'power3', opacity: 0
      }, 0.4)
      .to(img.DOM.el, {
        duration: 1.5, ease: 'power4',
        x: `+=${dx * 110}`,
        y: `+=${dy * 110}`
      }, 0.05);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant5 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.lastAngle = 0;

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const isMovingClockwise = angle >= this.lastAngle;
    this.lastAngle = angle;
    let startAngle = isMovingClockwise ? angle - 10 : angle + 10;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance !== 0) { dx /= distance; dy /= distance; }
    dx *= distance / 150; dy *= distance / 150;

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, filter: 'brightness(80%)',
        scale: 0.1, zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2,
        rotation: startAngle
      }, {
        duration: 1, ease: 'power2',
        scale: 1, filter: 'brightness(100%)',
        x: this.mousePos.x - img.rect.width / 2 + (dx * 70),
        y: this.mousePos.y - img.rect.height / 2 + (dy * 70),
        rotation: this.lastAngle
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4, ease: 'expo', opacity: 0
      }, 0.5)
      .to(img.DOM.el, {
        duration: 1.5, ease: 'power4',
        x: `+=${dx * 120}`, y: `+=${dy * 120}`
      }, 0.05);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant6 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
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

    gsap.killTweensOf(img.DOM.el);
    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, scale: 0,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.8,
        ease: 'power3',
        scale: scaleFactor,
        filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .fromTo(img.DOM.inner, {
        scale: 2
      }, {
        duration: 0.8, ease: 'power3', scale: 1
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4, ease: 'power3.in',
        opacity: 0, scale: 0.2
      }, 0.45);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant7 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = config.threshold || 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.visibleImagesCount = 0;
    this.visibleImagesTotal = config.visibleImagesTotal || 9;
    this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;

    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    ++this.visibleImagesCount;

    gsap.killTweensOf(img.DOM.el);
    const scaleValue = gsap.utils.random(0.5, 1.6);

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
        rotationZ: 0, opacity: 1,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4, ease: 'power3',
        scale: scaleValue,
        rotationZ: gsap.utils.random(-3, 3),
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0);

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
      const oldImg = this.images[lastInQueue];
      gsap.to(oldImg.DOM.el, {
        duration: 0.4,
        ease: 'power4',
        opacity: 0, scale: 1.3,
        onComplete: () => {
          if (this.activeImagesCount === 0) {
            this.isIdle = true;
          }
        }
      });
    }
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() { this.activeImagesCount--; }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

class ImageTrailVariant8 {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.wb-image-trail__item')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
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

    this.initEvents();
  }

  initEvents() {
    const handlePointerMove = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.container.addEventListener('mousemove', handlePointerMove);
    this.container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      this.container.removeEventListener('mousemove', initRender);
      this.container.removeEventListener('touchmove', initRender);
    };
    this.container.addEventListener('mousemove', initRender);
    this.container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
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
    const brightness = 0.2 + (normalizedZ * 2.3);

    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.DOM.el);

    gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .set(this.DOM.el, { perspective: 1000 }, 0)
      .fromTo(img.DOM.el, {
        opacity: 1,
        z: 0,
        scale: 1 + (this.cachedZValue / 1000),
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2,
        rotationX: this.cachedRotation.x,
        rotationY: this.cachedRotation.y,
        filter: `brightness(${brightness})`
      }, {
        duration: 1,
        ease: 'expo',
        scale: 1 + (this.zValue / 1000),
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2,
        rotationX: this.rotation.x,
        rotationY: this.rotation.y
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4,
        ease: 'power2',
        opacity: 0,
        z: -800
      }, 0.3);
  }

  onImageActivated() { this.activeImagesCount++; this.isIdle = false; }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }

  destroy() {
    this.images.forEach(img => img.destroy());
  }
}

// Variant mapping
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

/**
 * Main ImageTrail Animator Class
 */
class ImageTrailAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.componentName = 'ImageTrail';
    this.componentClasses = webflowBitsClasses.forComponent('image-trail');
    this.defaultConfig = {
      variant: 1,
      threshold: 80,
      itemWidth: '190px',
      itemHeight: 'auto',
      borderRadius: '15px',
      visibleImagesTotal: 9
    };
    
    // this.injectComponentStyles();
  }

  /**
   * Inject component-specific CSS
   */
  injectComponentStyles() {
    if (this.stylesInjected) return;
    
    try {
      injectStyles('wb-image-trail-styles', componentCSS);
      this.stylesInjected = true;
      console.log('WebflowBits: ImageTrail styles injected');
    } catch (error) {
      console.warn('WebflowBits: Failed to inject ImageTrail styles', error);
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
   * Parse custom attributes from element using utility functions
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(
      commonAttributeMaps.animation,
      {
        // ImageTrail-specific attributes
        variant: { attribute: 'wb-variant', type: 'number', parser: parseInt },
        threshold: { attribute: 'wb-threshold', type: 'number', parser: parseInt },
        itemWidth: { attribute: 'wb-item-width', type: 'string' },
        itemHeight: { attribute: 'wb-item-height', type: 'string' },
        borderRadius: { attribute: 'wb-border-radius', type: 'string' },
        visibleImagesTotal: { attribute: 'wb-visible-images', type: 'number', parser: parseInt }
      }
    );
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Apply component classes using utility functions
   */
  applyComponentClasses(element, config) {
    const classesToApply = [
      this.componentClasses.parent || 'wb-image-trail'
    ];
    
    ComponentClassManager.applyClasses(
      element, 
      classesToApply, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Remove component classes using utility functions
   */
  removeComponentClasses(element) {
    const fallbackClasses = [
      this.componentClasses.parent || 'wb-image-trail',
      this.componentClasses.animating || 'wb-image-trail-animating',
      this.componentClasses.completed || 'wb-image-trail-completed'
    ];
    
    ComponentClassManager.removeClasses(
      element, 
      fallbackClasses, 
      this.instances, 
      this.componentName
    );
  }

  /**
   * Create DOM structure for image trail effect
   */
  createDOMStructure(element, config) {
    // Get images from custom attribute or data attribute
    const imagesData = element.getAttribute('wb-images') || element.getAttribute('data-images') || '[]';
    let images = [];
    
    try {
      images = JSON.parse(imagesData);
    } catch (error) {
      console.warn('WebflowBits ImageTrail: Invalid images data format', error);
      return null;
    }

    if (!Array.isArray(images) || images.length === 0) {
      console.warn('WebflowBits ImageTrail: No valid images provided');
      return null;
    }

    // Clear element
    element.innerHTML = '';
    
    // Create image items
    images.forEach((imageUrl, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'wb-image-trail__item';
      itemDiv.style.width = config.itemWidth;
      itemDiv.style.height = config.itemHeight;
      itemDiv.style.borderRadius = config.borderRadius;
      
      const innerDiv = document.createElement('div');
      innerDiv.className = 'wb-image-trail__item-inner';
      innerDiv.style.backgroundImage = `url(${imageUrl})`;
      
      itemDiv.appendChild(innerDiv);
      element.appendChild(itemDiv);
    });

    return {
      itemCount: images.length
    };
  }

  /**
   * Initialize animation for a single element
   */
  initElement(element) {
    this.ensureStylesInjected();
    
    if (!element) {
      console.warn('WebflowBits ImageTrail: Element is invalid');
      return;
    }

    if (this.instances.has(element)) {
      console.warn('WebflowBits ImageTrail: Element already initialized');
      return;
    }

    const config = this.parseConfig(element);
    
    // Create instance object to track this animation
    const instance = {
      element,
      config,
      domStructure: null,
      variant: null,
      addedClasses: []
    };

    this.instances.set(element, instance);
    
    try {
      // Apply component classes using utility
      this.applyComponentClasses(element, config);
      
      // Create DOM structure
      instance.domStructure = this.createDOMStructure(element, config);
      
      if (!instance.domStructure) {
        throw new Error('Failed to create DOM structure');
      }
      
      // Initialize the appropriate variant
      const VariantClass = variantMap[config.variant] || variantMap[1];
      instance.variant = new VariantClass(element, config);
      
      // Mark as animating
      element.classList.add('wb-image-trail-animating');
      
      // Dispatch initialization event using utility
      AnimationStateManager.dispatchLifecycleEvent(
        element, 
        'init', 
        'image-trail',
        { instance }
      );
      
    } catch (error) {
      console.error('WebflowBits ImageTrail: Failed to setup animation', error);
      this.removeComponentClasses(element);
      this.instances.delete(element);
    }
  }

  /**
   * Initialize all elements with wb-animate="image-trail"
   */
  initAll() {
    const elements = document.querySelectorAll('[wb-animate="image-trail"]');
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Destroy animation for specific element
   */
  destroy(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    const { variant } = instance;

    // Destroy variant
    if (variant && variant.destroy) {
      variant.destroy();
    }

    // Clear element content
    element.innerHTML = '';

    // Remove component classes using utility
    this.removeComponentClasses(element);

    // Remove from instances
    this.instances.delete(element);

    // Dispatch destroy event using utility
    AnimationStateManager.dispatchEvent(
      element,
      'wb-image-trail-destroy',
      { element }
    );
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroy(element);
    });
  }

  /**
   * Refresh animations (no-op for this component)
   */
  refresh() {
  }

  /**
   * Check for potential CSS conflicts using utility
   */
  checkForConflicts() {
    const conflictClasses = [
      'image-trail',
      'image-trail__item',
      'image-trail__item-inner'
    ];
    
    return checkCSSConflicts('ImageTrail', conflictClasses);
  }

  /**
   * Get all active instances
   */
  getInstances() {
    return Array.from(this.instances.values());
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element) || null;
  }
}

// Create singleton instance
const imageTrailAnimator = new ImageTrailAnimator();

// Export for use in other modules
export default imageTrailAnimator;
export { ImageTrailAnimator };
