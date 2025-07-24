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

WebflowBits includes seven powerful text animation components:

1. **SplitText** - Character, word, or line-based split animations
2. **TextType** - Typewriter/typing effect with cursor
3. **BlurText** - Blur-to-clear transition effects
4. **ShinyText** - Shimmer/shine text effects
5. **GradientText** - Animated gradient text with customizable colors
6. **DecryptedText** - Matrix-style decryption effects with character scrambling
7. **ScrambleText** - Interactive hover-based character scrambling with GSAP

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

#### BlurText Animation

Add blur effect animation to text elements:

```html
<p wb-text-animate="blur-text">Your text here</p>
```

**Available attributes:**
- `wb-animate-by="words|chars"` - Animation granularity (default: "words")
- `wb-direction="top|bottom"` - Blur animation direction (default: "top")
- `wb-delay="200"` - Delay between elements in milliseconds (default: 200)
- `wb-threshold="0.1"` - Scroll trigger threshold (default: 0.1)
- `wb-root-margin="0px"` - Scroll trigger margin (default: "0px")
- `wb-ease="back.out(1.4)"` - Animation easing (default: "back.out(1.4)")
- `wb-duration="0.6"` - Animation duration in seconds (default: 0.35)

**Example:**
```html
<!-- Word-by-word blur from top -->
<h2 wb-text-animate="blur-text" 
    wb-animate-by="words" 
    wb-direction="top" 
    wb-delay="150">
  Amazing blur text effect
</h2>

<!-- Character-by-character blur from bottom -->
<p wb-text-animate="blur-text" 
   wb-animate-by="chars" 
   wb-direction="bottom" 
   wb-delay="50">
  Character level blur animation
</p>
```

#### ShinyText Animation

Add shimmer/shine effect to text elements:

```html
<p wb-text-animate="shiny-text">Your shiny text here</p>
```

**Available attributes:**
- `wb-speed="5"` - Animation speed in seconds (default: 5)
- `wb-disabled="false"` - Disable animation (default: false)
- `wb-text-color="#b5b5b5a4"` - Base text color (default: "#b5b5b5a4")
- `wb-shine-color="rgba(255, 255, 255, 0.8)"` - Shine color (default: "rgba(255, 255, 255, 0.8)")

**Examples:**
```html
<!-- Basic shiny text -->
<h1 wb-text-animate="shiny-text">Shiny Header</h1>

<!-- Fast golden shine -->
<p wb-text-animate="shiny-text" 
   wb-speed="2" 
   wb-text-color="#d4af37" 
   wb-shine-color="rgba(255, 215, 0, 0.9)">
  Fast golden text
</p>

<!-- Custom colored shine -->
<span wb-text-animate="shiny-text" 
      wb-speed="8" 
      wb-text-color="#6b46c1" 
      wb-shine-color="rgba(196, 181, 253, 0.8)">
  Purple shimmer text
</span>

<!-- Disabled state (can be toggled via JavaScript) -->
<p wb-text-animate="shiny-text" wb-disabled="true">
  Initially disabled shine
</p>
```

#### GradientText Animation

Add animated gradient effects to text elements:

```html
<p wb-text-animate="gradient-text">Your gradient text here</p>
```

**Available attributes:**
- `wb-colors="#40ffaa,#4079ff,#40ffaa"` - Gradient colors (comma-separated or JSON array)
- `wb-animation-speed="8"` - Animation speed in seconds (default: 8)
- `wb-show-border="false"` - Show animated border overlay (default: false)
- `wb-disabled="false"` - Disable animation (default: false)
- `wb-border-color="#060010"` - Border background color (default: "#060010")

**Color Format Options:**
```html
<!-- Comma-separated colors -->
<h1 wb-text-animate="gradient-text" 
    wb-colors="#ff6b6b,#4ecdc4,#45b7d1,#96ceb4">
  Comma Separated Colors
</h1>

<!-- JSON array format -->
<h2 wb-text-animate="gradient-text" 
    wb-colors='["#e056fd", "#f0932b", "#eb4d4b", "#6c5ce7"]'>
  JSON Array Colors
</h2>
```

**Examples:**
```html
<!-- Basic gradient text -->
<h1 wb-text-animate="gradient-text">Basic Gradient</h1>

<!-- Fast gradient with custom colors -->
<p wb-text-animate="gradient-text" 
   wb-colors="#ff9ff3,#f368e0,#ff3838,#ff9500" 
   wb-animation-speed="2">
  Fast Custom Gradient
</p>

<!-- Gradient with border effect -->
<div wb-text-animate="gradient-text" 
     wb-colors="#a29bfe,#fd79a8,#fdcb6e" 
     wb-show-border="true" 
     wb-border-color="#1a1a2e">
  Bordered Gradient
</div>

<!-- Disabled gradient (can be enabled via JavaScript) -->
<span wb-text-animate="gradient-text" 
      wb-colors="#74b9ff,#0984e3,#00b894" 
      wb-disabled="true">
  Paused Gradient
</span>
```

**JavaScript Controls:**
```javascript
const gradientText = WebflowBits.getComponent('gradientText');
const element = document.querySelector('[wb-text-animate="gradient-text"]');

// Enable/disable animation
gradientText.enable(element);
gradientText.disable(element);

// Change animation speed
gradientText.setSpeed(element, 3); // 3 seconds

// Change colors
gradientText.setColors(element, ['#ff0000', '#00ff00', '#0000ff']);

// Toggle border
gradientText.toggleBorder(element, true); // Show border
```

#### DecryptedText Animation

Add matrix-style decryption effects to text elements:

```html
<p wb-text-animate="decrypt-text">Your text here</p>
```

**Available attributes:**
- `wb-speed="50"` - Animation speed in milliseconds (default: 50)
- `wb-max-iterations="10"` - Maximum iterations for random mode (default: 10)
- `wb-sequential="false"` - Sequential vs random reveal (default: false)
- `wb-reveal-direction="start"` - Direction: start|end|center (default: "start")
- `wb-use-original-chars="false"` - Use only original characters (default: false)
- `wb-characters="ABC..."` - Custom scramble characters (default: alphanumeric + symbols)
- `wb-animate-on="hover"` - Trigger: hover|view (default: "hover")
- `wb-threshold="0.1"` - Intersection observer threshold (default: 0.1)
- `wb-class-name=""` - CSS class for revealed characters
- `wb-encrypted-class-name=""` - CSS class for scrambled characters

**Examples:**
```html
<!-- Basic hover decryption -->
<h1 wb-text-animate="decrypt-text">
  Hover to Decrypt
</h1>

<!-- Sequential reveal from center -->
<p wb-text-animate="decrypt-text" 
   wb-sequential="true"
   wb-reveal-direction="center"
   wb-speed="30">
  Sequential Center Decrypt
</p>

<!-- View-triggered with custom characters -->
<div wb-text-animate="decrypt-text"
     wb-animate-on="view"
     wb-characters="01010101"
     wb-max-iterations="15">
  Binary Style Decryption
</div>

<!-- Using only original characters -->
<span wb-text-animate="decrypt-text"
      wb-use-original-chars="true"
      wb-sequential="true">
  Original Characters Only
</span>
```

#### ScrambleText Animation

Add interactive hover-based character scrambling with proximity effects:

```html
<p wb-text-animate="scramble-text">Your text here</p>
```

**Available attributes:**
- `wb-radius="100"` - Radius area for scramble effect in pixels (default: 100)
- `wb-duration="1.2"` - Animation duration in seconds (default: 1.2)
- `wb-speed="0.5"` - Scramble speed (0.1-2.0, default: 0.5)
- `wb-scramble-chars=".:"` - Characters for scrambling (default: ".:")
- `wb-threshold="0.1"` - Intersection observer threshold (default: 0.1)
- `wb-root-margin="0px"` - Intersection observer margin (default: "0px")

**Examples:**
```html
<!-- Basic scramble on hover -->
<h1 wb-text-animate="scramble-text">
  Hover to Scramble
</h1>

<!-- Custom radius and characters -->
<p wb-text-animate="scramble-text"
   wb-radius="120"
   wb-duration="1.5"
   wb-scramble-chars="!@#$%^&*()">
  Custom Scramble Effect
</p>

<!-- Binary style scrambling -->
<div wb-text-animate="scramble-text"
     wb-radius="80"
     wb-duration="0.8"
     wb-speed="1.2"
     wb-scramble-chars="01">
  Binary Scramble
</div>

<!-- Fast scramble with symbols -->
<span wb-text-animate="scramble-text"
      wb-speed="1.5"
      wb-scramble-chars="▓▒░█"
      wb-radius="150">
  Block Character Scramble
</span>
```

**JavaScript Controls:**
```javascript
const scrambleText = WebflowBits.getComponent('scrambleText');
const element = document.querySelector('[wb-text-animate="scramble-text"]');

// Manually trigger scramble effect
scrambleText.triggerScramble(element);

// Trigger with custom config
scrambleText.triggerScramble(element, {
  scrambleChars: "!@#$",
  duration: 2.0
});

// Update configuration
scrambleText.updateConfig(element, {
  radius: 200,
  speed: 1.0
});
```

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

// Listen for BlurText animation completion
document.addEventListener('wb-blur-text-complete', (event) => {
  console.log('BlurText animation completed:', event.detail);
});

// Listen for ShinyText initialization
document.addEventListener('wb-shiny-text-init', (event) => {
  console.log('ShinyText initialized:', event.detail);
});

// Listen for ShinyText updates (speed, color changes)
document.addEventListener('wb-shiny-text-update', (event) => {
  console.log('ShinyText updated:', event.detail);
});

// Listen for GradientText initialization
document.addEventListener('wb-gradient-text-init', (event) => {
  console.log('GradientText initialized:', event.detail);
});

// Listen for GradientText updates (colors, speed, border changes)
document.addEventListener('wb-gradient-text-update', (event) => {
  console.log('GradientText updated:', event.detail);
});

// Listen for DecryptedText animation start
document.addEventListener('wb-decrypt-text-start', (event) => {
  console.log('DecryptedText animation started:', event.detail);
});

// Listen for DecryptedText animation completion
document.addEventListener('wb-decrypt-text-complete', (event) => {
  console.log('DecryptedText animation completed:', event.detail);
});

// Listen for DecryptedText animation stop
document.addEventListener('wb-decrypt-text-stop', (event) => {
  console.log('DecryptedText animation stopped:', event.detail);
});

// Listen for ScrambleText initialization
document.addEventListener('wb-scramble-text-init', (event) => {
  console.log('ScrambleText initialized:', event.detail);
});

// Listen for ScrambleText animation start
document.addEventListener('wb-scramble-text-start', (event) => {
  console.log('ScrambleText animation started:', event.detail);
});

// Listen for ScrambleText animation stop
document.addEventListener('wb-scramble-text-stop', (event) => {
  console.log('ScrambleText animation stopped:', event.detail);
});

// Listen for ScrambleText configuration updates
document.addEventListener('wb-scramble-text-update', (event) => {
  console.log('ScrambleText updated:', event.detail);
});
```

### Manual Control

```javascript
// Initialize specific SplitText elements
WebflowBits.initSplitTextOn('.my-text-class');

// Initialize specific TextType elements
WebflowBits.initTextTypeOn('.my-typewriter-class');

// Initialize specific BlurText elements
WebflowBits.initBlurTextOn('.my-blur-class');

// Initialize specific ShinyText elements
WebflowBits.initShinyTextOn('.my-shiny-class');

// Initialize specific GradientText elements
WebflowBits.initGradientTextOn('.my-gradient-class');

// Initialize specific DecryptedText elements
WebflowBits.initDecryptedTextOn('.my-decrypt-class');

// Initialize specific ScrambleText elements
WebflowBits.initScrambleTextOn('.my-scramble-class');

// Refresh animations (useful after dynamic content changes)
WebflowBits.refresh();

// Destroy all animations
WebflowBits.destroy();

// Get specific component instances
const splitText = WebflowBits.getComponent('splitText');
const textType = WebflowBits.getComponent('textType');
const blurText = WebflowBits.getComponent('blurText');
const shinyText = WebflowBits.getComponent('shinyText');
const gradientText = WebflowBits.getComponent('gradientText');
const decryptedText = WebflowBits.getComponent('decryptedText');
const scrambleText = WebflowBits.getComponent('scrambleText');

// ShinyText specific controls
const shinyElement = document.querySelector('[wb-text-animate="shiny-text"]');
shinyText.enable(shinyElement);  // Enable animation
shinyText.disable(shinyElement); // Disable animation
shinyText.setSpeed(shinyElement, 3); // Change speed to 3 seconds

// GradientText specific controls
const gradientElement = document.querySelector('[wb-text-animate="gradient-text"]');
gradientText.enable(gradientElement);  // Enable animation
gradientText.disable(gradientElement); // Disable animation
gradientText.setSpeed(gradientElement, 5); // Change speed to 5 seconds
gradientText.setColors(gradientElement, ['#ff0000', '#00ff00', '#0000ff']); // Change colors
gradientText.toggleBorder(gradientElement, true); // Show border

// DecryptedText specific controls
const decryptElement = document.querySelector('[wb-text-animate="decrypt-text"]');
decryptedText.updateConfig(decryptElement, {
  speed: 30,
  sequential: true,
  revealDirection: 'center'
});

// ScrambleText specific controls
const scrambleElement = document.querySelector('[wb-text-animate="scramble-text"]');
scrambleText.triggerScramble(scrambleElement); // Manually trigger scramble
scrambleText.triggerScramble(scrambleElement, {
  scrambleChars: "!@#$",
  duration: 2.0
}); // Trigger with custom config
scrambleText.updateConfig(scrambleElement, {
  radius: 200,
  speed: 1.0
}); // Update configuration
```