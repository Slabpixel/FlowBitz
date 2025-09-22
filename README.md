# FlowBitz

**FlowBitz** is a powerful animation library designed specifically for Webflow that brings your designs to life with smooth, professional animations. Built on GSAP (GreenSock Animation Platform), it provides 16 ready-to-use components that work seamlessly with Webflow's visual editor.

## What is FlowBitz?

FlowBitz transforms static Webflow designs into dynamic, engaging experiences without requiring any coding knowledge. Simply add attributes to your elements and watch them come alive with:

- **Text Animations** - Split text, typewriter effects, gradient animations, and more
- **Interactive Effects** - Mouse-following trails, magnetic grids, and WebGL shaders
- **Scroll Triggers** - Animations that activate as users scroll through your site
- **Mobile Optimized** - All animations are optimized for touch devices and performance

Perfect for landing pages, portfolios, marketing sites, and any Webflow project that needs that extra "wow" factor.

## Key Features

- 🚀 **Zero Configuration** - Works out of the box with sensible defaults
- 🎨 **Webflow Native** - Designed specifically for Webflow's workflow
- 📱 **Mobile First** - Optimized for all devices and screen sizes
- ⚡ **Performance** - Lightweight and GPU-accelerated animations
- 🛠️ **Developer Friendly** - Full JavaScript API for custom implementations
- 🎯 **Accessibility** - Respects user preferences and reduced motion settings
- 🔄 **Auto-Initialize** - Automatically detects and initializes components
- 📚 **Well Documented** - Comprehensive documentation and examples

## Quick Start

Add this script tag to your Webflow project's custom code (before `</body>`):

```html
<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>
```

The library will auto-initialize and start working with elements that have the proper attributes.

## Available Components

FlowBitz includes 16 powerful animation components:

### Text Animations
- **SplitText** - Character, word, or line-based split animations
- **TextType** - Typewriter/typing effect with cursor
- **BlurText** - Blur-to-clear transition effects
- **ShinyText** - Shimmer/shine text effects
- **GradientText** - Animated gradient text with customizable colors
- **DecryptedText** - Matrix-style decryption effects
- **ScrambleText** - Interactive hover-based character scrambling
- **VariableProximity** - Mouse proximity-based font variation effects
- **RotatingText** - Auto-rotating text with customizable animations
- **TextPressure** - Mouse proximity-based font variation effects
- **CountUp** - Animated number counting
- **TextCursor** - Mouse-following text/emoji trail effects
- **Shuffle** - Character-based sliding shuffle effect

### Interactive Components
- **ImageTrail** - Mouse-following image trail effects
- **MagnetLines** - Interactive magnetic line grid
- **ShapeBlur** - WebGL shader-based interactive shape effects

## Basic Usage

Add the `wb-component` attribute to any element:

```html
<!-- Split text animation -->
<p wb-component="split-text">Your text here</p>

<!-- Typewriter effect -->
<div wb-component="text-type">
  <p>First text to type</p>
  <p>Second text to type</p>
</div>

<!-- Gradient text -->
<h1 wb-component="gradient-text">Gradient Text</h1>

<!-- Count up animation -->
<span wb-component="count-up" wb-count-to="1000">0</span>
```

## Customization

All components support various attributes for customization:

```html
<!-- Split text with custom settings -->
<p wb-component="split-text" 
   wb-split-type="chars" 
     wb-duration="0.8"
   wb-stagger-delay="50">
  Custom Split Text
</p>

<!-- Typewriter with custom cursor -->
<div wb-component="text-type" 
     wb-cursor-character="pipe" 
     wb-typing-speed="100">
  <p>Slow typing effect</p>
</div>

<!-- Gradient with custom colors -->
<h1 wb-component="gradient-text" 
    wb-colors="#ff6b6b,#4ecdc4,#45b7d1">
  Custom Gradient
  </h1>
```

## JavaScript API

Access components programmatically:

```javascript
// Get component instances
const splitText = WebflowBits.getComponent('splitText');
const textType = WebflowBits.getComponent('textType');

// Initialize specific elements
WebflowBits.initSplitTextOn('.my-text-class');

// Refresh all animations
WebflowBits.refresh();

// Destroy all animations
WebflowBits.destroy();
```

## Version Options

```html
<!-- Latest stable (auto-updates) -->
<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>

<!-- Specific version (locked) -->
<script src="https://flowbitz.dev/v1.0.0/flowbitz.umd.js"></script>

<!-- Beta version (for testing) -->
<script src="https://flowbitz.dev/beta/flowbitz.umd.js"></script>
```

## Documentation

For detailed component documentation and all available attributes, visit [flowbitz.dev](https://flowbitz.dev).

## License

MIT License - see [LICENSE](LICENSE) file for details.