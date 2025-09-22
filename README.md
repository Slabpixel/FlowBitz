# FlowBitz

Interactive components library for Webflow powered by GSAP.

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