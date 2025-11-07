# FlowBitz

[![Version](https://img.shields.io/badge/version-2.1.2-blue.svg)](https://github.com/Slabpixel/FlowBitz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-flowbitz.dev-orange.svg)](https://www.flowbitz.dev)

> Interactive components library for Webflow - Create stunning animations with just a few attributes

FlowBitz is a powerful JavaScript library that brings professional-grade animations to your Webflow projects. With a simple script tag and intuitive attributes, you can create sophisticated text effects, interactive buttons, and engaging animations without writing any code.

## 🎉 What's New in v2.1

**Optimized Architecture & Component Splitting** - FlowBitz is now significantly lighter and faster:

- ✅ **72% smaller UMD bundle** - 85KB gzipped vs 300KB uncompressed
- ✅ **Code splitting** - Components load on-demand (ES modules)
- ✅ **Tree-shakeable** - Modern bundlers only include what you use
- ✅ **GSAP bundled in UMD** - No external dependencies for CDN users
- ✅ **Auto-detection** - Components initialize automatically when found
- ✅ **True one-script** - Just `<script src="flowbitz.umd.js"></script>` and you're ready!

**Performance Comparison:**

| Metric | v1 | v2 | Improvement |
|--------|------|------|-------------|
| **UMD (CDN)** | 300 KB | **85 KB gzipped** | 🚀 72% smaller |
| **ES Module** | 300 KB | **15 KB** + on-demand | 95% smaller |
| **npm Package** | 828 KB | **319 KB** | 61% smaller |

## ✨ Features

- **🎨 22 Components**: 14 text effects, 4 interactive buttons, and 4 component effect
- **📝 Text Effects**: Split text, gradient effects, typewriter, blur transitions, count-up, and more
- **🔘 Interactive Buttons**: Gradient, ripple, pulse, and magnetic button effects
- **⚡ Zero Configuration**: Works out of the box with a single script tag
- **🧠 Dual Build System**: UMD (bundled GSAP, 85KB gzipped) or ES (smart CDN loading, 15KB)
- **🎯 Webflow Optimized**: Designed specifically for Webflow's visual editor
- **📱 Responsive**: All components work seamlessly across devices
- **🚀 Performance**: Choose lightweight ES modules or compatible UMD builds
- **🎛️ Customizable**: Extensive configuration options for every component
- **📚 Well Documented**: Comprehensive examples and documentation

## 🚀 Quick Start

### Installation

Add FlowBitz to your Webflow project with a single script tag:

```html
<!-- That's all you need! GSAP included (85KB gzipped) -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>
```

That's it! No additional setup needed. The UMD build:
- ✅ Includes GSAP bundled (no external dependencies)
- ✅ Auto-detects components on your page
- ✅ Initializes all found components automatically
- ✅ Works with just one script tag

**Note:** For modern bundlers (Vite/Webpack), use ES modules for tree-shaking and smaller bundles.

### Basic Usage

Simply add the `wb-component` attribute to any element in Webflow:

```html
<!-- Split Text Animation -->
<h1 wb-component="split-text" wb-split-type="words">
  Create Amazing Websites with Powerful Animations
</h1>

<!-- Gradient Button -->
<button wb-component="gradient-button" class="px-6 py-3 rounded-full">
  Gradient Button
</button>

<!-- Typewriter Effect -->
<span wb-component="text-type" wb-text-1="Hello" wb-text-2="World" wb-text-3="FlowBitz">
  Hello
</span>
```

## 📦 Available Components

### Text Components

| Component | GSAP | Description | Example |
|-----------|------|-------------|---------|
| **Split Text** | ✅ | Character, word, or line-based split animations | `wb-component="split-text"` |
| **Gradient Text** | ✅ | Animated gradient text with customizable colors | `wb-component="gradient-text"` |
| **Text Type** | ✅ | Typewriter effect with customizable cursor | `wb-component="text-type"` |
| **Blur Text** | ✅ | Blur-to-clear transition effects | `wb-component="blur-text"` |
| **Shiny Text** | ❌ | Shimmer and shine text effects (CSS only) | `wb-component="shiny-text"` |
| **Count Up** | ✅ | Animated number counting | `wb-component="count-up"` |
| **Decrypted Text** | ✅ | Matrix-style decryption effects | `wb-component="decrypted-text"` |
| **Scramble Text** | ✅ | Interactive character scrambling | `wb-component="scramble-text"` |
| **Variable Proximity** | ✅ | Mouse proximity font variations | `wb-component="variable-proximity"` |
| **Rotating Text** | ✅ | Auto-rotating text with stagger effects | `wb-component="rotating-text"` |
| **Text Pressure** | ✅ | Mouse proximity font variations with variable fonts | `wb-component="text-pressure"` |
| **Shuffle** | ✅ | Character-based sliding shuffle effects | `wb-component="shuffle"` |
| **Tooltip Text** | ❌ | Hover tooltips for any text element (CSS only) | `wb-component="tooltip-text"` |
| **Roll Text** | ✅ | Vertical rolling text effect on hover | `wb-component="roll-text"` |

### Button Components

| Component | GSAP | Description | Example |
|-----------|------|-------------|---------|
| **Gradient Button** | ❌ | Animated gradient button (CSS only) | `wb-component="gradient-button"` |
| **Ripple Button** | ❌ | Material Design ripple effect (CSS only) | `wb-component="ripple-button"` |
| **Pulse Button** | ❌ | Gentle pulsing animation (CSS only) | `wb-component="pulse-button"` |
| **Magnetic Button** | ✅ | Magnetic attraction effect that follows mouse | `wb-component="magnetic-button"` |

### Effect Components

| Component | GSAP | Description | Example |
|-----------|------|-------------|---------|
| **Smart Animate** | ✅ | Intelligent scroll-based animations with GSAP | `wb-component="smart-animate"` |
| **3D Hover Card** | ❌ | 3D tilt on hover animations | `wb-component="3d-card-hover"` |
| **Outline Gradient** | ❌ | Animated gradient border (CSS only) | `wb-component="outline-gradient"` |
| **Image Trail** | ✅ | Mouse-following image trail with variants | `wb-component="image-trail"` |

**💡 Pro Tip:** Components marked with ❌ (5 total) don't require GSAP - use them for the lightest setup (just 15KB)!

## 🎯 Component Examples

### Split Text Animation
```html
<h1 wb-component="split-text" wb-split-type="words" wb-stagger-delay="100" class="text-6xl">
  Create Amazing Websites with Powerful Animations
</h1>
```

### Gradient Text Effect
```html
<h1 wb-component="gradient-text" wb-colors="#40ffaa, #4079ff" class="text-6xl">
  Gradient Text
</h1>
```

### Typewriter Effect
```html
<h1 class="text-6xl">
  Learn more about 
  <span wb-component="text-type" 
        wb-text-1="Coding" 
        wb-text-2="Webflow" 
        wb-text-3="Animation">
    Coding
  </span>
</h1>
```

### Magnetic Button
```html
<a href="#" wb-component="magnetic-button" wb-strength="2" 
   class="inline-block px-6 py-3 bg-blue-500 text-white rounded-full">
  Hover me!
</a>
```

## 🧠 How It Works

FlowBitz v2.1 features two optimized builds:

### UMD Build (CDN - Simple Setup)
Perfect for quick CDN usage - includes everything in one file:
```html
<!-- Just one script - GSAP included! (85KB gzipped) -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>

<!-- All components work immediately -->
<div wb-component="split-text">Animated Text</div>
<button wb-component="ripple-button">Click Me</button>
```

**Size:** 294KB (85KB gzipped) - 72% smaller than v1!

### ES Module Build (Modern Bundlers - Maximum Optimization)
For Vite, Webpack, Rollup with tree-shaking and code splitting:
```javascript
import FlowBitz from 'flowbitz';

// Only loads components you actually use
await FlowBitz.init();
```

**Size:** 15KB initial + only the components you import

## 🌐 CDN Options

FlowBitz is available via multiple CDN endpoints:

### Latest Version (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>
```

### Specific Version
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.1.2/dist/flowbitz.umd.js"></script>
```

### ES Modules (For Modern Bundlers)
```javascript
import FlowBitz from 'https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.es.js';
await FlowBitz.init({ debug: true });
```

### NPM Package
```bash
npm install flowbitz
```

**Available attributes:**
- `wb-text="PRESSURE"` - Text to animate (default: "PRESSURE")
- `wb-font-family="Compressa VF, sans-serif"` - Font family (default: "Roboto Flex, sans-serif")
- `wb-width="true"` - Enable width variation (default: true)
- `wb-weight="true"` - Enable weight variation (default: true)
- `wb-italic="true"` - Enable italic/slant variation (default: true)
- `wb-alpha="false"` - Enable opacity variation (default: false)
- `wb-stroke="false"` - Enable stroke effect (default: false)
- `wb-text-color="#FFFFFF"` - Text color (default: "#FFFFFF")
- `wb-stroke-color="#FF0000"` - Stroke color (default: "#FF0000")
- `wb-min-font-size="24"` - Minimum font size (default: 24)

**Custom Font Support:**
TextPressure now supports custom fonts! You can add your own variable font by declaring it in your HTML:

```html
<head>
  <!-- Add your custom variable font -->
  <style>
    @font-face {
      font-family: 'MyCustomVF';
      src: url('path-to-your-variable-font.woff2') format('woff2');
      font-variation-settings: 'wght' 100, 'wdth' 75, 'ital' 0;
    }
  </style>
</head>
```

Then use it with the component:
```html
<div wb-text-animate="text-pressure"
     wb-font-family="MyCustomVF, sans-serif"
     wb-text="CUSTOM">
</div>
```

**Font Support Levels:**
- **Roboto Flex** (included) - Full effects: weight + width + slant  
- **Source Sans 3** (included) - Weight + italic effects
- **Inter** (included) - Weight effects only
- **Custom Variable Fonts** - Full effects if they support weight, width, and italic axes
- **Regular Fonts** - Automatic fallback to weight-only effects

**Fallback Mechanism:**
Any font (including custom fonts) will receive the full pressure effect with weight, width, and italic variations. If a font doesn't support certain variation axes, the browser will gracefully ignore unsupported properties while still applying supported ones.

**Examples:**
```html
<!-- Basic TextPressure with default Compressa VF -->
<div wb-text-animate="text-pressure"
     wb-text="PRESSURE"
     wb-text-color="#FFFFFF"
     style="width: 400px; height: 200px; background: #1a1a1a;">
</div>

<!-- Using Roboto Flex -->
<div wb-text-animate="text-pressure"
     wb-text="ROBOTO"
     wb-font-family="Roboto Flex, sans-serif"
     wb-text-color="#FFFFFF"
     style="width: 400px; height: 200px; background: #2c3e50;">
</div>

<!-- Custom variable font -->
<style>
  @font-face {
    font-family: 'MyVariableFont';
    src: url('https://example.com/my-variable-font.woff2') format('woff2');
    font-variation-settings: 'wght' 400, 'wdth' 100, 'ital' 0;
  }
</style>
<div wb-text-animate="text-pressure"
     wb-text="CUSTOM"
     wb-font-family="MyVariableFont, sans-serif"
     wb-text-color="#FFFFFF"
     style="width: 400px; height: 200px; background: #8e44ad;">
</div>

<!-- Weight only effect with regular font -->
<div wb-text-animate="text-pressure"
     wb-text="BOLD"
     wb-font-family="Inter, sans-serif"
     wb-weight="true"
     wb-width="false"
     wb-italic="false"
     style="width: 300px; height: 150px; background: #ff6b6b;">
</div>

<!-- With stroke effect -->
<div wb-text-animate="text-pressure"
     wb-text="STROKE"
     wb-stroke="true"
     wb-stroke-color="#FF0000"
     wb-text-color="#FFFFFF"
     style="width: 400px; height: 200px; background: #000000;">
</div>

<!-- Alpha effect -->
<div wb-text-animate="text-pressure"
     wb-text="FADE"
     wb-alpha="true"
     wb-weight="true"
     wb-width="false"
     wb-italic="false"
     style="width: 400px; height: 200px; background: linear-gradient(45deg, #667eea, #764ba2);">
</div>
```

**JavaScript Controls:**
```javascript
const textPressure = WebflowBits.getComponent('textPressure');
const element = document.querySelector('[wb-text-animate="text-pressure"]');

// Update configuration
textPressure.updateConfig(element, {
  text: 'NEW TEXT',
  fontFamily: 'Source Sans 3, sans-serif',
  weight: true,
  width: false,
  italic: true,
  alpha: true
});

// Debug current settings
textPressure.debugFontSettings(element);

// Get current effect values
const values = textPressure.getEffectValues(element);
console.log('Current effect values:', values);

// Get component instance
const instance = textPressure.getInstance(element);
console.log(instance.config);
```

**Troubleshooting:**
- **Effects not visible**: All fonts will show at least weight variation. For full effects, use variable fonts like Compressa VF, Roboto Flex, or Source Sans 3
- **No width variation**: Check if your font supports 'wdth' axis. Compressa VF and Roboto Flex support this
- **No italic variation**: Check if your font supports 'ital' or 'slnt' axis. Most variable fonts support at least one of these
- **Custom font not loading**: Ensure your @font-face declaration is in the HTML <head> section and the font file path is correct
- **Partial effects only**: This is normal! The component gracefully falls back to supported axes. Regular fonts will show weight effects only
- **Performance issues**: Reduce animation frequency or disable unused effects (set wb-width="false", wb-italic="false", etc.)

#### CountUp Animation

Add animated number counting to numeric text elements:

```html
<span wb-text-animate="count-up">1000</span>
```

**Available attributes:**
- `wb-count-to="1000"` - Target number to count to (default: 100, or element text content)
- `wb-count-from="0"` - Starting number (default: 0)
- `wb-count-direction="up"` - Direction of counting: 'up' or 'down' (default: 'up')
- `wb-count-separator=","` - Thousands separator (default: empty)
- `wb-count-precision="2"` - Number of decimal places (default: auto-detect)
- `wb-count-start="true"` - Start when element becomes visible (default: true)
- `wb-count-loop="false"` - Loop the animation (default: false)
- `wb-delay="0"` - Animation delay in seconds (default: 0)
- `wb-duration="2"` - Animation duration in seconds (default: 2)
- `wb-ease="power2.out"` - Animation easing (default: "power2.out")
- `wb-threshold="0.1"` - Scroll trigger threshold (default: 0.1)
- `wb-root-margin="0px"` - Scroll trigger margin (default: "0px")

**Examples:**
```html
<!-- Basic counter -->
<span wb-text-animate="count-up" wb-count-to="1250">0</span>

<!-- Currency with formatting -->
<span wb-text-animate="count-up" 
      wb-count-to="99999" 
      wb-count-separator=","
      wb-duration="3">
  0
</span>

<!-- Percentage with decimal places -->
<span wb-text-animate="count-up" 
      wb-count-to="85.7" 
      wb-count-precision="1"
      wb-duration="1.5">
  0
</span>

<!-- Large numbers with separator -->
<span wb-text-animate="count-up" 
      wb-count-to="2500000" 
      wb-count-separator=","
      wb-duration="2.5"
      wb-ease="power3.out">
  0
</span>

<!-- Custom range (not starting from 0) -->
<span wb-text-animate="count-up" 
      wb-count-from="50" 
      wb-count-to="100" 
      wb-duration="1.8">
  50
</span>

<!-- Count down animation -->
<span wb-text-animate="count-up" 
      wb-count-direction="down"
      wb-count-from="100"
      wb-count-to="0"
      wb-duration="3">
  100
</span>

<!-- Auto-start disabled (manual trigger) -->
<span wb-text-animate="count-up" 
      wb-count-to="1000"
      wb-count-start="false">
  0
</span>

<!-- Looping animation -->
<span wb-text-animate="count-up" 
      wb-count-to="100"
      wb-count-loop="true"
      wb-duration="2">
  0
</span>
```

**JavaScript Controls:**
```javascript
const countUp = WebflowBits.getComponent('countUp');
const element = document.querySelector('[wb-text-animate="count-up"]');

// Manually start animation
countUp.startCountUp(element);

// Pause animation
countUp.pauseCountUp(element);

// Resume animation
countUp.resumeCountUp(element);

// Reset animation to initial state
countUp.resetCountUp(element);

// Update configuration
countUp.updateConfig(element, {
  to: 5000,
  duration: 3,
  separator: '.',
  direction: 'up'
});

// Get component instance
const instance = countUp.getInstance(element);
console.log(instance.config);
```

#### TextCursor Animation

Add mouse-following text/emoji trail effects to any container element:

```html
<div wb-text-animate="text-cursor">Move your mouse here!</div>
```

**Available attributes:**
- `wb-cursor-text="⚛️"` - Text or emoji to display in trail (default: "⚛️")
- `wb-cursor-delay="0.01"` - Animation delay in seconds (default: 0.01)
- `wb-cursor-spacing="100"` - Distance between trail items in pixels (default: 100)
- `wb-cursor-follow-direction="true"` - Rotate text to follow mouse direction (default: true)
- `wb-cursor-random-float="true"` - Enable random floating animation (default: true)
- `wb-cursor-exit-duration="0.5"` - Exit animation duration in seconds (default: 0.5)
- `wb-cursor-removal-interval="30"` - Cleanup interval in milliseconds (default: 30)
- `wb-cursor-max-points="5"` - Maximum number of trail items (default: 5)
- `wb-cursor-font-size="1.875rem"` - Font size for trail items (default: "1.875rem")
- `wb-cursor-color="currentColor"` - Color for trail items (default: "currentColor")

**Examples:**
```html
<!-- Basic emoji trail -->
<div wb-text-animate="text-cursor" 
     wb-cursor-text="🎯"
     style="width: 100%; height: 300px; background: #f0f0f0; cursor: crosshair;">
  Move your mouse here for emoji trail!
</div>

<!-- Custom text with specific spacing -->
<div wb-text-animate="text-cursor"
     wb-cursor-text="★"
     wb-cursor-spacing="60"
     wb-cursor-max-points="10"
     wb-cursor-font-size="2rem"
     wb-cursor-color="#ffd700"
     style="width: 100%; height: 250px; background: #2a2a2a; cursor: crosshair;">
  Star trail effect
</div>

<!-- Dense floating trail -->
<div wb-text-animate="text-cursor"
     wb-cursor-text="✨"
     wb-cursor-spacing="40"
     wb-cursor-max-points="15"
     wb-cursor-follow-direction="true"
     wb-cursor-random-float="true"
     wb-cursor-exit-duration="1"
     wb-cursor-removal-interval="20"
     style="width: 100%; height: 280px; background: linear-gradient(45deg, #ff9a9e, #fecfef); cursor: crosshair;">
  Dense sparkle trail
</div>

<!-- Clean trail without rotation -->
<div wb-text-animate="text-cursor"
     wb-cursor-text="●"
     wb-cursor-spacing="80"
     wb-cursor-max-points="8"
     wb-cursor-follow-direction="false"
     wb-cursor-random-float="false"
     wb-cursor-color="#ff6b6b"
     style="width: 100%; height: 200px; background: #1a1a1a; cursor: crosshair;">
  Simple dot trail
</div>

<!-- Custom symbols with fast removal -->
<div wb-text-animate="text-cursor"
     wb-cursor-text="🔥"
     wb-cursor-spacing="50"
     wb-cursor-max-points="12"
     wb-cursor-exit-duration="0.3"
     wb-cursor-removal-interval="15"
     wb-cursor-font-size="1.5rem"
     style="width: 100%; height: 220px; background: radial-gradient(circle, #ff4757, #2f1b14); cursor: crosshair;">
  Fire trail with fast removal
</div>
```

**JavaScript Controls:**
```javascript
const textCursor = WebflowBits.getComponent('textCursor');
const element = document.querySelector('[wb-text-animate="text-cursor"]');

// Update configuration
textCursor.updateConfig(element, {
  text: '🌟',
  spacing: 60,
  maxPoints: 8,
  followMouseDirection: false,
  randomFloat: true,
  color: '#00ff00'
});

// Get component instance
const instance = textCursor.getInstance(element);
console.log(instance.config);

// Manually destroy and recreate
textCursor.destroy(element);
textCursor.initElement(element);
```

**Usage Notes:**
- Container should have explicit width and height for best results
- Use `cursor: crosshair` or `cursor: pointer` for better user experience
- Trail items automatically clean up when mouse stops moving
- Supports both text characters and emojis
- Works on both mouse and touch devices
- Performance optimized with GSAP animations

**Creative Ideas:**
- Use emojis: 🎯, ⚡, 🌟, ✨, 🔥, 💫, 🌈, 🎨, 🚀, 💎
- Use symbols: ★, ●, ◆, ▲, ♦, ✦, ❋, ◉, ◈, ⬢
- Use letters: A, X, +, -, =, ~, |, /, \, ^
- Combine with CSS gradients for stunning backgrounds
- Adjust spacing for dense or sparse trails
- Use different colors for themed experiences

#### Shuffle Animation

Add character-based sliding shuffle effects to text elements:

```html
<p wb-text-animate="shuffle">Your text here</p>
```

**Available attributes:**
- `wb-shuffle-direction="right"` - Direction of shuffle: left|right (default: "right")
- `wb-shuffle-times="1"` - Number of shuffle iterations (default: 1)
- `wb-animation-mode="evenodd"` - Animation mode: evenodd|random (default: "evenodd")
- `wb-duration="0.35"` - Animation duration in seconds (default: 0.35)
- `wb-max-delay="0"` - Maximum random delay for random mode in seconds (default: 0)
- `wb-ease="power3.out"` - Animation easing (default: "power3.out")
- `wb-threshold="0.1"` - Scroll trigger threshold (default: 0.1)
- `wb-root-margin="-100px"` - Scroll trigger margin (default: "-100px")
- `wb-loop="false"` - Loop animation continuously (default: false)
- `wb-loop-delay="0"` - Delay between loops in seconds (default: 0)
- `wb-stagger="0.03"` - Stagger delay between characters in seconds (default: 0.03)
- `wb-scramble-charset=""` - Characters to use for scrambling effect (default: empty)
- `wb-color-from=""` - Starting color for color transition (default: none)
- `wb-color-to=""` - Ending color for color transition (default: none)
- `wb-trigger-once="true"` - Trigger animation only once on scroll (default: true)
- `wb-respect-reduced-motion="true"` - Respect reduced motion preference (default: true)
- `wb-trigger-on-hover="true"` - Enable hover trigger after initial animation (default: true)
- `wb-text-align="center"` - Text alignment for characters: left|center|right|justify (default: "center")

**Animation Modes:**
- **evenodd**: Animates odd-indexed characters first, then even characters with overlap
- **random**: Each character animates with random delay within `wb-max-delay`

**Examples:**
```html
<!-- Basic left-to-right shuffle -->
<h1 wb-text-animate="shuffle">
  SHUFFLE EFFECT
</h1>

<!-- Right-to-left with multiple iterations -->
<p wb-text-animate="shuffle"
   wb-shuffle-direction="left"
   wb-shuffle-times="3"
   wb-duration="0.5">
  Multi-Shuffle Text
</p>

<!-- Scrambled shuffle with custom characters -->
<div wb-text-animate="shuffle"
     wb-shuffle-direction="right"
     wb-shuffle-times="2"
     wb-scramble-charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     wb-animation-mode="evenodd"
     wb-stagger="0.05">
  SCRAMBLED SHUFFLE
</div>

<!-- Random mode with color transition -->
<span wb-text-animate="shuffle"
      wb-animation-mode="random"
      wb-max-delay="0.5"
      wb-color-from="#ff0000"
      wb-color-to="#00ff00"
      wb-duration="0.8">
  Random Color Shuffle
</span>

<!-- Looping shuffle with hover trigger -->
<h2 wb-text-animate="shuffle"
    wb-loop="true"
    wb-loop-delay="1"
    wb-trigger-on-hover="true"
    wb-duration="0.4">
  Hover to Trigger
</h2>

<!-- Custom timing and scramble -->
<p wb-text-animate="shuffle"
   wb-shuffle-times="4"
   wb-scramble-charset="!@#$%^&*()"
   wb-animation-mode="evenodd"
   wb-stagger="0.08"
   wb-duration="0.6"
   wb-ease="back.out(1.7)">
  Symbol Scramble
</p>

<!-- Performance optimized for mobile -->
<div wb-text-animate="shuffle"
     wb-respect-reduced-motion="true"
     wb-trigger-once="true"
     wb-shuffle-times="1"
     wb-text-align="left">
  Mobile Friendly
</div>
```

**JavaScript Controls:**
```javascript
const shuffle = WebflowBits.getComponent('shuffle');
const element = document.querySelector('[wb-text-animate="shuffle"]');

// Manually trigger shuffle
shuffle.trigger(element);

// Update configuration
shuffle.updateConfig(element, {
  shuffleDirection: 'left',
  shuffleTimes: 2,
  scrambleCharset: '0123456789',
  duration: 0.8
});

// Animation controls
shuffle.pause(element);    // Pause current animation
shuffle.resume(element);   // Resume paused animation

// Get component instance
const instance = shuffle.getInstance(element);
console.log(instance.config);

// Event listeners
element.addEventListener('wb-shuffle-start', (e) => {
  console.log('Shuffle animation started:', e.detail);
});

element.addEventListener('wb-shuffle-complete', (e) => {
  console.log('Shuffle animation completed:', e.detail);
});

element.addEventListener('wb-shuffle-repeat', (e) => {
  console.log('Shuffle animation repeated:', e.detail);
});
```

**Character Direction Logic:**
- **Left Direction**: Characters slide from right to left, revealing original text
- **Right Direction**: Characters slide from left to right, revealing original text
- Each character gets its own wrapper with controlled overflow for smooth sliding

**Scramble Features:**
- Uses custom character set for intermediate shuffle states
- Randomizes characters on each repeat for dynamic effect
- Maintains original character width for consistent spacing
- Works with any Unicode characters including emojis

**Performance Features:**
- GPU-accelerated transforms with `force3D`
- Automatic cleanup of DOM structure after animation
- Respects `prefers-reduced-motion` for accessibility
- Optimized for smooth 60fps animations
- Memory-efficient instance management

**Usage Notes:**
- Text should have consistent character spacing for best results
- Works with variable fonts but may need custom `wb-text-align` adjustment
- Hover trigger re-initializes the entire effect for repeated interactions
- Loop mode keeps the shuffle structure active for continuous animation
- Color transitions work independently of character shuffling

#### ImageTrail Animation

Add mouse-following image trail effects with multiple visual variants:

```html
<div wb-animate="image-trail" 
     wb-images='["image1.jpg", "image2.jpg", "image3.jpg"]'>
</div>
```

**Available attributes:**
- `wb-variant="1"` - Effect variant (1-8, default: 1)
- `wb-threshold="80"` - Mouse movement threshold to trigger images (default: 80)
- `wb-item-width="190px"` - Image width (default: "190px")
- `wb-item-height="auto"` - Image height (default: "auto")
- `wb-border-radius="15px"` - Image border radius (default: "15px")
- `wb-visible-images="9"` - Maximum visible images for variant 7 (default: 9)
- `wb-images='["url1", "url2"]'` - **Required** JSON array of image URLs

**Effect Variants:**
1. **Variant 1**: Basic trail - Simple fade in/out effect
2. **Variant 2**: Scale with filter - Brightness and scale effects
3. **Variant 3**: Fly up animation - Images fly upward with random movement
4. **Variant 4**: Directional movement - Images follow mouse velocity direction
5. **Variant 5**: Rotation-based - Images rotate based on mouse movement angle
6. **Variant 6**: Speed-based effects - Size, blur, and color based on mouse speed
7. **Variant 7**: Multiple visible - Shows multiple images with queue system
8. **Variant 8**: 3D perspective - Depth and perspective effects

**Examples:**
```html
<!-- Basic trail effect -->
<div wb-animate="image-trail" 
     wb-variant="1"
     wb-threshold="80"
     wb-images='[
       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
       "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop",
       "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=400&fit=crop"
     ]'
     style="width: 100%; height: 400px; background: #1a1a1a; cursor: pointer;">
</div>

<!-- Speed-based effects with custom sizing -->
<div wb-animate="image-trail" 
     wb-variant="6"
     wb-threshold="50"
     wb-item-width="150px"
     wb-border-radius="20px"
     wb-images='[
       "image1.jpg",
       "image2.jpg", 
       "image3.jpg",
       "image4.jpg"
     ]'
     style="width: 100%; height: 300px; background: #2a2a2a; cursor: pointer;">
</div>

<!-- 3D perspective effect -->
<div wb-animate="image-trail" 
     wb-variant="8"
     wb-threshold="60"
     wb-item-width="200px"
     wb-images='[
       "portrait1.jpg",
       "portrait2.jpg",
       "portrait3.jpg"
     ]'
     style="width: 100%; height: 500px; background: linear-gradient(45deg, #1e3c72, #2a5298); cursor: pointer;">
</div>

<!-- Multiple visible images -->
<div wb-animate="image-trail" 
     wb-variant="7"
     wb-threshold="70"
     wb-visible-images="5"
     wb-images='[
       "gallery1.jpg",
       "gallery2.jpg",
       "gallery3.jpg",
       "gallery4.jpg",
       "gallery5.jpg",
       "gallery6.jpg"
     ]'
     style="width: 100%; height: 350px; background: #333; cursor: pointer;">
</div>
```

**JavaScript Controls:**
```javascript
const imageTrail = WebflowBits.getComponent('imageTrail');
const element = document.querySelector('[wb-animate="image-trail"]');

// Get component instance
const instance = imageTrail.getInstance(element);
console.log(instance.config);

// Manually destroy and recreate
imageTrail.destroy(element);
imageTrail.initElement(element);
```

**Usage Notes:**
- Container should have explicit width and height
- Images should be optimized for web (WebP recommended)
- Use HTTPS URLs for images to avoid mixed content issues
- Test on mobile devices as touch events are supported
- Consider using placeholder images for better loading experience

#### MagnetLines Animation

Add interactive magnetic line grid that follows mouse movement:

```html
<div wb-animate="magnet-lines"></div>
```

**Available attributes:**
- `wb-rows="9"` - Number of rows in the grid (default: 9)
- `wb-columns="9"` - Number of columns in the grid (default: 9)
- `wb-container-size="80vmin"` - Container size (default: "80vmin")
- `wb-line-color="#efefef"` - Line color (default: "#efefef")
- `wb-line-width="1vmin"` - Line width (default: "1vmin")
- `wb-line-height="6vmin"` - Line height (default: "6vmin")
- `wb-base-angle="-10"` - Base rotation angle in degrees (default: -10)

**Examples:**
```html
<!-- Basic magnetic lines -->
<div wb-animate="magnet-lines"></div>

<!-- Custom grid with blue lines -->
<div wb-animate="magnet-lines"
     wb-rows="12"
     wb-columns="12"
     wb-container-size="60vmin"
     wb-line-color="#3b82f6"
     wb-line-width="2px"
     wb-line-height="8vmin"
     wb-base-angle="0">
</div>

<!-- Dense grid with thin red lines -->
<div wb-animate="magnet-lines"
     wb-rows="15"
     wb-columns="15"
     wb-container-size="50vmin"
     wb-line-color="#ef4444"
     wb-line-width="1px"
     wb-line-height="4vmin"
     wb-base-angle="45">
</div>

<!-- Large sparse grid -->
<div wb-animate="magnet-lines"
     wb-rows="6"
     wb-columns="6"
     wb-container-size="90vmin"
     wb-line-color="#10b981"
     wb-line-width="3px"
     wb-line-height="10vmin"
     wb-base-angle="-45">
</div>

<!-- Minimal clean look -->
<div wb-animate="magnet-lines"
     wb-rows="8"
     wb-columns="8"
     wb-container-size="70vmin"
     wb-line-color="rgba(255, 255, 255, 0.3)"
     wb-line-width="1px"
     wb-line-height="5vmin"
     wb-base-angle="0">
</div>
```

**JavaScript Controls:**
```javascript
const magnetLines = WebflowBits.getComponent('magnetLines');
const element = document.querySelector('[wb-animate="magnet-lines"]');

// Get component instance
const instance = magnetLines.getInstance(element);
console.log(instance.config);

// Manually destroy and recreate
magnetLines.destroy(element);
magnetLines.initElement(element);
```

**Styling Notes:**
- Container automatically centers itself with CSS Grid
- Uses CSS custom properties for smooth rotation
- Performance optimized with `will-change` and `transform`
- Responsive sizing with `vmin` units by default
- Lines smoothly rotate to point toward mouse cursor
- Effect works on both mouse and touch devices

**Performance Tips:**
- Avoid very dense grids (20x20+) on mobile devices
- Use `vmin` units for responsive behavior
- Consider reducing `wb-line-height` for better performance
- Test on lower-end devices if using many instances

#### ShapeBlur Animation

⚠️ **Important**: ShapeBlur requires **Three.js** library to work. Include Three.js before using this component.

Add interactive WebGL shader-based shape effects that respond to mouse movement:

```html
<!-- Include Three.js first (Required) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Basic ShapeBlur with fixed height -->
<div wb-animate="shape-blur" style="height: 400px;">
  Your content here
</div>
```

**📏 Height Requirement**: Elements using ShapeBlur **must have a fixed height** defined via CSS using `px`, `rem`, `vh`, or other absolute units. The effect relies on container dimensions to render properly.

**Available attributes:**
- `wb-shape-variation="0"` - Shape type: 0=rounded rectangle, 1=filled circle, 2=circle stroke, 3=triangle (default: 0)
- `wb-shape-size="1.2"` - Shape size in shader (default: 1.2)
- `wb-roundness="0.4"` - Border roundness for rounded rectangle (0-1, default: 0.4)
- `wb-border-size="0.05"` - Border thickness (default: 0.05)
- `wb-circle-size="0.3"` - Mouse cursor effect size (default: 0.3)
- `wb-circle-edge="0.5"` - Mouse cursor edge softness (default: 0.5)
- `wb-mouse-damp="8"` - Mouse following damping (1-50, default: 8)
- `wb-pixel-ratio="2"` - Render quality (1-3, default: 2)

**Shape Variations:**
- **Variation 0**: Rounded rectangle with stroke effects
- **Variation 1**: Filled circle with edge blending
- **Variation 2**: Circle outline with adjustable stroke
- **Variation 3**: Triangle shape with soft edges

**Examples:**
```html
<!-- Basic rounded rectangle effect -->
<div wb-animate="shape-blur" 
     wb-shape-variation="0"
     wb-shape-size="1.2"
     wb-roundness="0.4"
     style="height: 300px; background: #1a1a1a;">
  <h2>Interactive Shape Effect</h2>
  <p>Move your mouse around to see the shader effect</p>
</div>

<!-- Filled circle with custom mouse interaction -->
<div wb-animate="shape-blur"
     wb-shape-variation="1"
     wb-circle-size="0.4"
     wb-circle-edge="0.3"
     wb-mouse-damp="12"
     style="height: 400px; background: linear-gradient(45deg, #667eea, #764ba2);">
  <h2>Filled Circle Effect</h2>
  <p>Smooth circular shader with custom mouse damping</p>
</div>

<!-- Circle stroke with larger effect area -->
<div wb-animate="shape-blur"
     wb-shape-variation="2"
     wb-circle-size="0.5"
     wb-circle-edge="0.8"
     wb-pixel-ratio="3"
     style="height: 350px; background: #2c3e50;">
  <h2>High Quality Circle Stroke</h2>
  <p>Outlined effect with enhanced pixel ratio</p>
</div>

<!-- Triangle with fast mouse response -->
<div wb-animate="shape-blur"
     wb-shape-variation="3"
     wb-circle-size="0.4"
     wb-mouse-damp="4"
     style="height: 250px; background: #8e44ad;">
  <h2>Geometric Triangle</h2>
  <p>Fast-responding triangular shape effect</p>
</div>

<!-- Fixed viewport height -->
<div wb-animate="shape-blur"
     wb-shape-variation="0"
     wb-shape-size="1.5"
     style="height: 60vh; background: #34495e;">
  <h1>Viewport Height Example</h1>
  <p>Using 60vh for responsive height</p>
</div>

<!-- With rem units -->
<div wb-animate="shape-blur"
     wb-shape-variation="1"
     style="height: 25rem; background: #e74c3c;">
  <h3>Using rem units</h3>
  <p>25rem height for scalable sizing</p>
</div>
```

**Height Examples:**
```css
/* ✅ Good - Fixed heights */
.shape-blur-container {
  height: 400px;        /* Pixels */
  height: 25rem;        /* Rem units */
  height: 50vh;         /* Viewport height */
  height: 300pt;        /* Points */
}

/* ❌ Bad - Relative heights (won't work properly) */
.shape-blur-container {
  height: 100%;         /* Depends on parent */
  height: auto;         /* No fixed dimension */
  min-height: 300px;    /* Only minimum, not fixed */
}
```

**JavaScript Controls:**
```javascript
const shapeBlur = WebflowBits.getComponent('shapeBlur');
const element = document.querySelector('[wb-animate="shape-blur"]');

// Update shader configuration
shapeBlur.updateConfig(element, {
  variation: 2,           // Change to circle stroke
  shapeSize: 1.8,        // Increase shape size
  circleSize: 0.6,       // Larger mouse effect
  mouseDamp: 15          // Slower mouse following
});

// Get component instance
const instance = shapeBlur.getInstance(element);
console.log(instance.config);

// Manually destroy and recreate
shapeBlur.destroy(element);
shapeBlur.initElement(element);
```

**Dependencies:**
- **Three.js r128+** - Required for WebGL rendering
- **GSAP** - Included with WebflowBits

**Browser Support:**
- Modern browsers with WebGL support
- Automatically falls back to error message on unsupported devices
- Mobile devices with WebGL capability

**Troubleshooting:**
- **No effect visible**: Ensure Three.js is loaded before WebflowBits
- **Canvas not sizing**: Check that container has fixed height (px, rem, vh)
- **Performance issues**: Reduce `wb-pixel-ratio` or limit number of instances
- **Error messages**: Enable debug mode with `wb-debug="true"` attribute
- **WebGL not supported**: Component shows error message automatically

**Usage Notes:**
- Container automatically creates canvas overlay for WebGL rendering
- Content remains interactive and accessible above the effect
- Effect responds to both mouse and touch input
- Performance optimized with automatic resize handling
- Works with any background colors or gradients

### Events

```javascript
import FlowBitz from 'flowbitz';
await FlowBitz.init();

// Check what was loaded
console.log(FlowBitz.getGSAPStats());

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

// Listen for VariableProximity initialization
document.addEventListener('wb-variable-proximity-init', (event) => {
  console.log('VariableProximity initialized:', event.detail);
});

// Listen for VariableProximity animation start
document.addEventListener('wb-variable-proximity-start', (event) => {
  console.log('VariableProximity animation started:', event.detail);
});

// Listen for VariableProximity animation stop
document.addEventListener('wb-variable-proximity-stop', (event) => {
  console.log('VariableProximity animation stopped:', event.detail);
});

// Listen for VariableProximity configuration updates
document.addEventListener('wb-variable-proximity-update', (event) => {
  console.log('VariableProximity updated:', event.detail);
});

// Listen for RotatingText initialization
document.addEventListener('wb-rotating-text-init', (event) => {
  console.log('RotatingText initialized:', event.detail);
});

// Listen for RotatingText text change
document.addEventListener('wb-rotating-text-change', (event) => {
  console.log('RotatingText changed to:', event.detail.currentText);
});

// Listen for RotatingText pause/resume
document.addEventListener('wb-rotating-text-pause', (event) => {
  console.log('RotatingText paused:', event.detail);
});

document.addEventListener('wb-rotating-text-resume', (event) => {
  console.log('RotatingText resumed:', event.detail);
});

// Listen for RotatingText reset
document.addEventListener('wb-rotating-text-reset', (event) => {
  console.log('RotatingText reset:', event.detail);
});

// Listen for RotatingText configuration updates
document.addEventListener('wb-rotating-text-update', (event) => {
  console.log('RotatingText updated:', event.detail);
});

// Listen for TextPressure initialization
document.addEventListener('wb-text-pressure-init', (event) => {
  console.log('TextPressure initialized:', event.detail);
});

// Listen for TextPressure animation start
document.addEventListener('wb-text-pressure-start', (event) => {
  console.log('TextPressure animation started:', event.detail);
});

// Listen for TextPressure animation stop
document.addEventListener('wb-text-pressure-stop', (event) => {
  console.log('TextPressure animation stopped:', event.detail);
});

// Listen for TextPressure configuration updates
document.addEventListener('wb-text-pressure-update', (event) => {
  console.log('TextPressure updated:', event.detail);
});

// Listen for CountUp initialization
document.addEventListener('wb-count-up-init', (event) => {
  console.log('CountUp initialized:', event.detail);
});

// Listen for CountUp animation start
document.addEventListener('wb-count-up-start', (event) => {
  console.log('CountUp animation started:', event.detail);
});

// Listen for CountUp animation completion
document.addEventListener('wb-count-up-complete', (event) => {
  console.log('CountUp animation completed:', event.detail);
});

// Listen for CountUp pause
document.addEventListener('wb-count-up-pause', (event) => {
  console.log('CountUp paused:', event.detail);
});

// Listen for CountUp resume
document.addEventListener('wb-count-up-resume', (event) => {
  console.log('CountUp resumed:', event.detail);
});

// Listen for CountUp reset
document.addEventListener('wb-count-up-reset', (event) => {
  console.log('CountUp reset:', event.detail);
});

// Listen for CountUp configuration updates
document.addEventListener('wb-count-up-update', (event) => {
  console.log('CountUp updated:', event.detail);
});

// Listen for ImageTrail initialization
document.addEventListener('wb-image-trail-init', (event) => {
  console.log('ImageTrail initialized:', event.detail);
});

// Listen for ImageTrail destroy
document.addEventListener('wb-image-trail-destroy', (event) => {
  console.log('ImageTrail destroyed:', event.detail);
});

// Listen for MagnetLines initialization
document.addEventListener('wb-magnet-lines-init', (event) => {
  console.log('MagnetLines initialized:', event.detail);
});

// Listen for MagnetLines destroy
document.addEventListener('wb-magnet-lines-destroy', (event) => {
  console.log('MagnetLines destroyed:', event.detail);
});

// Listen for TextCursor initialization
document.addEventListener('wb-text-cursor-init', (event) => {
  console.log('TextCursor initialized:', event.detail);
});

// Listen for TextCursor destroy
document.addEventListener('wb-text-cursor-destroy', (event) => {
  console.log('TextCursor destroyed:', event.detail);
});

// Listen for TextCursor configuration updates
document.addEventListener('wb-text-cursor-update', (event) => {
  console.log('TextCursor updated:', event.detail);
});

// Listen for ShapeBlur initialization
document.addEventListener('wb-shape-blur-init', (event) => {
  console.log('ShapeBlur initialized:', event.detail);
});

// Listen for ShapeBlur animation start
document.addEventListener('wb-shape-blur-start', (event) => {
  console.log('ShapeBlur animation started:', event.detail);
});

// Listen for ShapeBlur configuration updates
document.addEventListener('wb-shape-blur-update', (event) => {
  console.log('ShapeBlur updated:', event.detail);
});

// Listen for ShapeBlur destroy
document.addEventListener('wb-shape-blur-destroy', (event) => {
  console.log('ShapeBlur destroyed:', event.detail);
});

// Listen for Shuffle initialization
document.addEventListener('wb-shuffle-init', (event) => {
  console.log('Shuffle initialized:', event.detail);
});

// Listen for Shuffle animation start
document.addEventListener('wb-shuffle-start', (event) => {
  console.log('Shuffle animation started:', event.detail);
});

// Listen for Shuffle animation completion
document.addEventListener('wb-shuffle-complete', (event) => {
  console.log('Shuffle animation completed:', event.detail);
});

// Listen for Shuffle animation repeat (loop mode)
document.addEventListener('wb-shuffle-repeat', (event) => {
  console.log('Shuffle animation repeated:', event.detail);
});

// Listen for Shuffle pause
document.addEventListener('wb-shuffle-pause', (event) => {
  console.log('Shuffle paused:', event.detail);
});

// Listen for Shuffle resume
document.addEventListener('wb-shuffle-resume', (event) => {
  console.log('Shuffle resumed:', event.detail);
});

// Listen for Shuffle configuration updates
document.addEventListener('wb-shuffle-update', (event) => {
  console.log('Shuffle updated:', event.detail);
});

// Listen for Shuffle destroy
document.addEventListener('wb-shuffle-destroy', (event) => {
  console.log('Shuffle destroyed:', event.detail);
});

// Listen for Shuffle error
document.addEventListener('wb-shuffle-error', (event) => {
  console.log('Shuffle error:', event.detail);
});
>>>>>>> origin/zandi
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Slabpixel/FlowBitz.git
   cd FlowBitz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build the library**
   ```bash
   npm run build:library
   ```

5. **Build the showcase website**
   ```bash
   npm run build:app
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build both library and app |
| `npm run build:library` | Build FlowBitz library only |
| `npm run build:app` | Build React showcase website |
| `npm run build:beta` | Build and create beta version |
| `npm run preview` | Preview production build |
| `npm run clean` | Clean dist directory |

### Project Structure

```
FlowBitz/
├── src/
│   ├── app/                    # React showcase website
│   │   ├── components/         # UI components
│   │   ├── pages/             # Website pages
│   │   └── styles/            # Global styles
│   └── library/               # Core FlowBitz library
│       ├── components/        # Individual components
│       ├── core/             # Main library files
│       ├── data/             # Component metadata
│       └── utils/            # Utility functions
├── scripts/                  # Build and release scripts
├── dist/                     # Built files
└── public/                   # Static assets
```

## 🚀 Deployment

### Automated Deployment

FlowBitz uses Vercel for hosting with automated deployments:

- **Website**: [flowbitz.dev](https://www.flowbitz.dev)
- **CDN**: All versions available at `flowbitz.dev/v{version}/`
- **Latest**: Always available at `flowbitz.dev/latest/`

### Manual Deployment

```bash
# Deploy everything
npm run deploy:all

# Deploy only the website
npm run deploy:app

# Deploy only the library
npm run deploy:library
```

## 📝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Adding New Components

1. Create your component in `src/library/components/`
2. Add it to `src/library/core/WebflowBits.js`
3. Add metadata in `src/library/data/componentsMetadata.js`
4. Test with `npm run build:beta`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔄 Migrating from v1

**v1 (300KB bundle):**
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@1/dist/flowbitz.umd.js"></script>
<script>window.WebflowBits.init();</script>
```

**v2.1 UMD (85KB gzipped - recommended for CDN):**
```html
<!-- Just one line - auto-initializes, GSAP included -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2/dist/flowbitz.umd.js"></script>
```

**v2.1 ES Modules (15KB + smart loading - for modern bundlers):**
```javascript
import FlowBitz from 'flowbitz';
await FlowBitz.init();
```

**Benefits:**
- ✅ 72% smaller UMD bundle (85KB gzipped vs 300KB)
- ✅ No manual initialization needed
- ✅ ES modules load GSAP from CDN only when needed
- ✅ UMD works with existing GSAP installations (auto-detects)

## 🙏 Acknowledgments

- **GSAP** - The backbone of all animations (bundled in UMD, CDN-loaded in ES)
- **Finsweet** - Inspiration for the lazy-loading architecture
- **Three.js** - For 3D components (auto-loaded when needed)
- **Webflow** - The platform that makes this all possible
- **Community** - All the developers who use and contribute to FlowBitz

## 💡 Inspiration & Credits

FlowBitz may sometimes take inspiration from publicly available code examples, tutorials, and open-source libraries online. These examples are rewritten as full-fledged, customizable, and reusable components specifically optimized for Webflow projects. If you recognize any of your work here, please reach out and we'll be happy to add proper credit.

**Inspiration Sources:**
- Modern web animation libraries and their approaches
- Community tutorials and code examples
- Open-source animation libraries and their concepts
- Webflow community contributions and ideas

We believe in giving credit where it's due and maintaining transparency about our inspiration sources. If you'd like to be credited for inspiring any of our components, please contact us at [support@flowbitz.dev](mailto:support@flowbitz.dev) or open an issue on GitHub.

## 📞 Support

- **Documentation**: [flowbitz.dev](https://www.flowbitz.dev)
- **GitHub Issues**: [Report bugs or request features](https://github.com/Slabpixel/FlowBitz/issues)
- **Discord**: Join our community for support and discussions

## 🔗 Links

- **Website**: [flowbitz.dev](https://www.flowbitz.dev)
- **Showcase**: [flowbitz.dev/components](https://www.flowbitz.dev/components)
- **GitHub**: [github.com/Slabpixel/FlowBitz](https://github.com/Slabpixel/FlowBitz)
- **NPM**: [npmjs.com/package/flowbitz](https://www.npmjs.com/package/flowbitz)

---

Made with ❤️ by [Slabpixel Studio](https://slabpixel.com)

## JavaScript API

// Initialize specific TextCursor elements
WebflowBits.initTextCursorOn('.my-textcursor-class');

// Initialize specific ShapeBlur elements
WebflowBits.initShapeBlurOn('.my-shapeblur-class');

// Initialize specific Shuffle elements
WebflowBits.initShuffleOn('.my-shuffle-class');

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
const variableProximity = WebflowBits.getComponent('variableProximity');
const rotatingText = WebflowBits.getComponent('rotatingText');
const textPressure = WebflowBits.getComponent('textPressure');
const countUp = WebflowBits.getComponent('countUp');
const imageTrail = WebflowBits.getComponent('imageTrail');
const magnetLines = WebflowBits.getComponent('magnetLines');
const textCursor = WebflowBits.getComponent('textCursor');
const shapeBlur = WebflowBits.getComponent('shapeBlur');
const shuffle = WebflowBits.getComponent('shuffle');

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

// VariableProximity specific controls
const proximityElement = document.querySelector('[wb-text-animate="variable-proximity"]');
variableProximity.updateConfig(proximityElement, {
  radius: 80,
  falloff: 'exponential',
  fromFontVariationSettings: "'wght' 200, 'opsz' 10",
  toFontVariationSettings: "'wght' 800, 'opsz' 120"
}); // Update configuration
const proximityInstance = variableProximity.getInstance(proximityElement); // Get instance

// RotatingText specific controls
const rotatingElement = document.querySelector('[wb-text-animate="rotating-text"]');
rotatingText.next(rotatingElement);       // Next text
rotatingText.previous(rotatingElement);   // Previous text
rotatingText.jumpTo(rotatingElement, 2);  // Jump to index 2
rotatingText.pause(rotatingElement);      // Pause auto-rotation
rotatingText.resume(rotatingElement);     // Resume auto-rotation
rotatingText.reset(rotatingElement);      // Reset to first text
rotatingText.updateConfig(rotatingElement, {
  rotationInterval: 1500,
  staggerDuration: 75
}); // Update configuration

// TextPressure specific controls
const textPressureElement = document.querySelector('[wb-text-animate="text-pressure"]');
textPressure.updateConfig(textPressureElement, {
  text: 'NEW TEXT',
  fontFamily: 'Source Sans 3, sans-serif',
  weight: true,
  width: false,
  italic: true,
  alpha: true
}); // Update configuration
textPressure.debugFontSettings(textPressureElement); // Debug current settings
const pressureValues = textPressure.getEffectValues(textPressureElement); // Get current values
const pressureInstance = textPressure.getInstance(textPressureElement); // Get instance

// CountUp specific controls
const countUpElement = document.querySelector('[wb-text-animate="count-up"]');
countUp.startCountUp(countUpElement); // Manually start animation
countUp.pauseCountUp(countUpElement); // Pause animation
countUp.resumeCountUp(countUpElement); // Resume animation
countUp.resetCountUp(countUpElement); // Reset to initial state
countUp.updateConfig(countUpElement, {
  to: 5000,
  duration: 3,
  separator: '.',
  direction: 'up'
}); // Update configuration
const countUpInstance = countUp.getInstance(countUpElement); // Get instance

// ImageTrail specific controls
const imageTrailElement = document.querySelector('[wb-animate="image-trail"]');
const imageTrailInstance = imageTrail.getInstance(imageTrailElement); // Get instance
console.log(imageTrailInstance.config); // View configuration
imageTrail.destroy(imageTrailElement); // Manually destroy
imageTrail.initElement(imageTrailElement); // Manually reinitialize

// MagnetLines specific controls
const magnetLinesElement = document.querySelector('[wb-animate="magnet-lines"]');
const magnetLinesInstance = magnetLines.getInstance(magnetLinesElement); // Get instance
console.log(magnetLinesInstance.config); // View configuration
magnetLines.destroy(magnetLinesElement); // Manually destroy
magnetLines.initElement(magnetLinesElement); // Manually reinitialize

// TextCursor specific controls
const textCursorElement = document.querySelector('[wb-text-animate="text-cursor"]');
textCursor.updateConfig(textCursorElement, {
  text: '🌟',
  spacing: 60,
  maxPoints: 8,
  followMouseDirection: false,
  randomFloat: true,
  color: '#00ff00'
}); // Update configuration
const textCursorInstance = textCursor.getInstance(textCursorElement); // Get instance
console.log(textCursorInstance.config); // View configuration
textCursor.destroy(textCursorElement); // Manually destroy
textCursor.initElement(textCursorElement); // Manually reinitialize

// ShapeBlur specific controls
const shapeBlurElement = document.querySelector('[wb-animate="shape-blur"]');
shapeBlur.updateConfig(shapeBlurElement, {
  variation: 2,           // Change to circle stroke
  shapeSize: 1.8,        // Increase shape size
  roundness: 0.8,        // More rounded
  circleSize: 0.6,       // Larger mouse effect
  circleEdge: 0.4,       // Sharper edge
  mouseDamp: 15,         // Slower mouse following
  pixelRatio: 3          // Higher quality
}); // Update configuration
const shapeBlurInstance = shapeBlur.getInstance(shapeBlurElement); // Get instance
console.log(shapeBlurInstance.config); // View configuration
shapeBlur.destroy(shapeBlurElement); // Manually destroy
shapeBlur.initElement(shapeBlurElement); // Manually reinitialize

// Shuffle specific controls
const shuffleElement = document.querySelector('[wb-text-animate="shuffle"]');
shuffle.trigger(shuffleElement); // Manually trigger shuffle
shuffle.pause(shuffleElement); // Pause animation
shuffle.resume(shuffleElement); // Resume animation
shuffle.updateConfig(shuffleElement, {
  shuffleDirection: 'left',
  shuffleTimes: 3,
  scrambleCharset: '!@#$%^&*()',
  animationMode: 'random',
  maxDelay: 0.8,
  colorFrom: '#ff0000',
  colorTo: '#00ff00'
}); // Update configuration
const shuffleInstance = shuffle.getInstance(shuffleElement); // Get instance
console.log(shuffleInstance.config); // View configuration
shuffle.destroy(shuffleElement); // Manually destroy
shuffle.initElement(shuffleElement); // Manually reinitialize
```
