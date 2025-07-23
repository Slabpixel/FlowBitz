# Webflow Bits

Interactive components library for Webflow powered by GSAP.

## CDN Usage

### Quick Start

Add this script tag to your Webflow project's custom code (before `</body>`):

```html
<script src="https://your-vercel-domain.vercel.app/webflow-bits.umd.js"></script>
```

The library will auto-initialize and start working with elements that have the proper attributes.

### Manual Initialization

```html
<script src="https://your-vercel-domain.vercel.app/webflow-bits.umd.js"></script>
<script>
  // Initialize with custom options
  WebflowBits.init({
    debug: true,
    autoInit: true,
    components: ['splitText']
  });
</script>
```

### Available Components

#### SplitText Animation

Add the following attribute to any text element:

```html
<p wb-text-animate="split-text">Your text here</p>
```

**Available attributes:**
- `wb-split-type="chars|words|lines"` - How to split the text
- `wb-ease="power3.out"` - Animation easing
- `wb-stagger-delay="100"` - Delay between elements (ms)
- `wb-duration="0.6"` - Animation duration (seconds)
- `wb-threshold="0.1"` - Scroll trigger threshold
- `wb-root-margin="-100px"` - Scroll trigger margin

### Events

```javascript
// Listen for when library is ready
document.addEventListener('webflow-bits-ready', (event) => {
  console.log('WebflowBits loaded:', event.detail);
});

// Listen for animation completion
document.addEventListener('wb-split-text-complete', (event) => {
  console.log('Animation completed:', event.detail);
});
```

### Manual Control

```javascript
// Initialize specific elements
WebflowBits.initSplitTextOn('.my-text-class');

// Refresh animations (useful after dynamic content changes)
WebflowBits.refresh();

// Destroy all animations
WebflowBits.destroy();
```