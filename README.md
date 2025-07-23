# Webflow Bits

Interactive components library for Webflow powered by GSAP.

## CDN Usage

### Quick Start

Add this script tag to your Webflow project's custom code (before `</body>`):

```html
<script src="https://webflow-bits.vercel.app/webflow-bits.umd.js"></script>
```

The library will auto-initialize and start working with elements that have the proper attributes.

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

#### TextType Animation (Typewriter Effect)

Add the following attribute for typewriter effect:

```html
<!-- Method 1: Using paragraph elements (Recommended for Webflow) -->
<div wb-text-animate="text-type">
  <p>First text to type</p>
  <p>Second text to type</p>
  <p>Third text to type</p>
</div>

<!-- Method 2: Using JSON attribute -->
<div wb-text-animate="text-type" wb-text-array='["Text 1", "Text 2"]'>
  Fallback text
</div>

<!-- Method 3: Single text -->
<div wb-text-animate="text-type">Your single text here</div>
```

**Available attributes:**
- `wb-cursor-character="underscore|pipe|dot|block|full-block"` - Cursor style
- `wb-typing-speed="50"` - Typing speed in milliseconds
- `wb-pause-duration="2000"` - Pause between typing/deleting in milliseconds
- `wb-deleting-speed="30"` - Deleting speed in milliseconds
- `wb-cursor-blink-duration="0.5"` - Cursor blink duration in seconds
- `wb-show-cursor="true"` - Show/hide cursor
- `wb-variable-speed="false"` - Enable variable typing speed
- `wb-variable-speed-min="30"` - Minimum speed for variable typing (ms)
- `wb-variable-speed-max="100"` - Maximum speed for variable typing (ms)
- `wb-loop="true"` - Loop through text array
- `wb-start-on-visible="false"` - Start animation when element becomes visible
- `wb-reverse-mode="false"` - Reverse character order
- `wb-hide-cursor-while-typing="false"` - Hide cursor during typing
- `wb-initial-delay="0"` - Initial delay before starting (ms)
- `wb-text-array='["Text 1", "Text 2"]'` - JSON array for multiple texts (fallback method)

**Text Content Priority:**
1. **Paragraph elements** (`<p>`) inside the container (recommended for Webflow)
2. **wb-text-array** attribute with JSON array
3. **Element text content** as single text

**Webflow Usage Note:**
The paragraph method is recommended for Webflow as it provides better visual editing experience in the Webflow Designer. You can easily add, remove, and edit text variations without touching JSON attributes.

### Events

```javascript
// Listen for when library is ready
document.addEventListener('webflow-bits-ready', (event) => {
  console.log('WebflowBits loaded:', event.detail);
});

// Listen for SplitText animation completion
document.addEventListener('wb-split-text-complete', (event) => {
  console.log('SplitText animation completed:', event.detail);
});

// Listen for TextType animation completion
document.addEventListener('wb-text-type-complete', (event) => {
  console.log('TextType animation completed:', event.detail);
});

// Listen for TextType sentence completion (for multiple texts)
document.addEventListener('wb-text-type-sentence-complete', (event) => {
  console.log('TextType sentence completed:', event.detail);
});
```

### Manual Control

```javascript
// Initialize specific SplitText elements
WebflowBits.initSplitTextOn('.my-text-class');

// Initialize specific TextType elements
WebflowBits.initTextTypeOn('.my-typewriter-class');

// Refresh animations (useful after dynamic content changes)
WebflowBits.refresh();

// Destroy all animations
WebflowBits.destroy();

// Get specific component instance
const splitText = WebflowBits.getComponent('splitText');
const textType = WebflowBits.getComponent('textType');
```