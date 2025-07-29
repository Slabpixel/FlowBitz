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

WebflowBits includes fourteen powerful animation components:

### Text Animation Components:
1. **SplitText** - Character, word, or line-based split animations
2. **TextType** - Typewriter/typing effect with cursor
3. **BlurText** - Blur-to-clear transition effects
4. **ShinyText** - Shimmer/shine text effects
5. **GradientText** - Animated gradient text with customizable colors
6. **DecryptedText** - Matrix-style decryption effects with character scrambling
7. **ScrambleText** - Interactive hover-based character scrambling with GSAP
8. **VariableProximity** - Mouse proximity-based font variation effects with Roboto Flex
9. **RotatingText** - Auto-rotating text with customizable animations and stagger effects
10. **TextPressure** - Mouse proximity-based font variation effects with variable fonts
11. **CountUp** - Animated number counting with customizable formatting
12. **TextCursor** - Mouse-following text/emoji trail effects with customizable behavior

### Interactive Components:
13. **ImageTrail** - Mouse-following image trail effects with multiple variants
14. **MagnetLines** - Interactive magnetic line grid that follows mouse movement

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
const rotatingText = WebflowBits.getComponent('rotatingText');
const variableProximity = WebflowBits.getComponent('variableProximity');
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

#### VariableProximity Animation

Add mouse proximity-based font variation effects to text elements using variable fonts:

```html
<p wb-text-animate="variable-proximity">Your text here</p>
```

**Available attributes:**
- `wb-from-font-variation="'wght' 100, 'opsz' 8"` - Starting font variation settings (default: "'wght' 100, 'opsz' 8")
- `wb-to-font-variation="'wght' 900, 'opsz' 144"` - Target font variation settings (default: "'wght' 900, 'opsz' 144")
- `wb-radius="50"` - Proximity radius in pixels (default: 50)
- `wb-falloff="linear"` - Falloff type: linear|exponential|gaussian (default: "linear")
- `wb-container=""` - CSS selector for container element (default: uses element itself)
- `wb-threshold="0.1"` - Intersection observer threshold (default: 0.1)
- `wb-root-margin="0px"` - Intersection observer margin (default: "0px")

**Font Variation Format:**
Font variation settings should be formatted as CSS font-variation-settings values:
- `"'wght' 400, 'opsz' 20"` - Weight 400, Optical Size 20
- `"'wght' 100"` - Weight 100 only
- `"'wght' 900, 'opsz' 144, 'slnt' -10"` - Multiple axes

**Examples:**
```html
<!-- Basic variable proximity with default Roboto Flex -->
<h1 wb-text-animate="variable-proximity">
  Hover Over Me
</h1>

<!-- Custom weight range with smaller radius -->
<p wb-text-animate="variable-proximity"
   wb-from-font-variation="'wght' 300, 'opsz' 20"
   wb-to-font-variation="'wght' 700, 'opsz' 100"
   wb-radius="30">
  Custom Weight Range
</p>

<!-- Exponential falloff for dramatic effect -->
<div wb-text-animate="variable-proximity"
     wb-from-font-variation="'wght' 100, 'opsz' 8"
     wb-to-font-variation="'wght' 900, 'opsz' 144"
     wb-radius="80"
     wb-falloff="exponential">
  Exponential Falloff
</div>

<!-- Gaussian falloff for smooth transitions -->
<span wb-text-animate="variable-proximity"
      wb-from-font-variation="'wght' 200, 'opsz' 12"
      wb-to-font-variation="'wght' 800, 'opsz' 120"
      wb-radius="60"
      wb-falloff="gaussian">
  Gaussian Smoothness
</span>

<!-- Container-based tracking -->
<div class="hero-section">
  <h1 wb-text-animate="variable-proximity"
      wb-container=".hero-section"
      wb-radius="100">
    Container-Based Effect
  </h1>
</div>
```

**JavaScript Controls:**
```javascript
const variableProximity = WebflowBits.getComponent('variableProximity');
const element = document.querySelector('[wb-text-animate="variable-proximity"]');

// Update configuration
variableProximity.updateConfig(element, {
  radius: 80,
  falloff: 'exponential',
  fromFontVariationSettings: "'wght' 200, 'opsz' 10",
  toFontVariationSettings: "'wght' 800, 'opsz' 120"
});

// Get component instance
const instance = variableProximity.getInstance(element);
console.log(instance.config);
```

**Font Requirements:**
- Works best with variable fonts like **Roboto Flex** (included by default)
- Supports any CSS font-variation-settings axis (wght, opsz, slnt, etc.)
- For custom fonts, ensure they support the variation axes you specify

#### RotatingText Animation

Add rotating text with smooth transitions and customizable stagger effects:

```html
<div wb-text-animate="rotating-text">
  <p>First rotating text</p>
  <p>Second rotating text</p>
  <p>Third rotating text</p>
</div>
```

**Available attributes:**
- `wb-split-by="characters"` - Split type: characters|words|lines (default: "characters")
- `wb-animation-preset="slideUp"` - Animation preset: slideUp|slideDown (default: "slideUp")
- `wb-rotation-interval="2000"` - Time between rotations in milliseconds (default: 2000)
- `wb-stagger-duration="0"` - Delay between characters/words in milliseconds (default: 0)
- `wb-stagger-from="first"` - Stagger direction: first|last|center|random (default: "first")
- `wb-auto="true"` - Enable auto-rotation (default: true)
- `wb-loop="true"` - Loop rotation (default: true)
- `wb-duration="0.6"` - Animation duration in seconds (default: 0.6)
- `wb-ease="power2.out"` - Animation easing (default: "power2.out")
- `wb-threshold="0.1"` - Intersection observer threshold (default: 0.1)
- `wb-root-margin="0px"` - Intersection observer margin (default: "0px")

**Text Content Priority:**
1. **Paragraph elements** (`<p>`) inside the container (recommended for Webflow)
2. **wb-texts** attribute with JSON array
3. **Element text content** as single text

**Examples:**
```html
<!-- Basic rotating text with paragraph elements -->
<div wb-text-animate="rotating-text">
  <p>Welcome to our site</p>
  <p>Explore amazing features</p>
  <p>Join us today</p>
</div>

<!-- Character-by-character with stagger from center -->
<h1 wb-text-animate="rotating-text"
    wb-split-by="characters"
    wb-stagger-duration="50"
    wb-stagger-from="center"
    wb-animation-preset="slideDown">
  <p>Animated</p>
  <p>Rotating</p>
  <p>Headers</p>
</h1>

<!-- Word-by-word rotation with custom timing -->
<span wb-text-animate="rotating-text"
      wb-split-by="words"
      wb-rotation-interval="3000"
      wb-stagger-duration="100"
      wb-stagger-from="random">
  <p>Fast paced words</p>
  <p>Smooth transitions here</p>
  <p>Dynamic text effects</p>
</span>

<!-- Manual control (no auto-rotation) -->
<div wb-text-animate="rotating-text"
     wb-auto="false"
     wb-split-by="lines">
  <p>First line of text</p>
  <p>Second line of text</p>
  <p>Third line of text</p>
</div>

<!-- JSON attribute method -->
<p wb-text-animate="rotating-text"
   wb-texts='["Option A", "Option B", "Option C"]'
   wb-stagger-from="last">
  Fallback text
</p>
```

**JavaScript Controls:**
```javascript
const rotatingText = WebflowBits.getComponent('rotatingText');
const element = document.querySelector('[wb-text-animate="rotating-text"]');

// Manual navigation
rotatingText.next(element);       // Go to next text
rotatingText.previous(element);   // Go to previous text
rotatingText.jumpTo(element, 2);  // Jump to specific index (0-based)
rotatingText.reset(element);      // Back to first text

// Playback control
rotatingText.pause(element);      // Pause auto-rotation
rotatingText.resume(element);     // Resume auto-rotation

// Configuration updates
rotatingText.updateConfig(element, {
  rotationInterval: 1500,
  staggerDuration: 75,
  animationPreset: 'slideDown'
});

// Get component instance
const instance = rotatingText.getInstance(element);
console.log(instance.config, instance.currentIndex);
```

#### TextPressure Animation

Add mouse proximity-based font variation effects to text elements using variable fonts:

```html
<div wb-text-animate="text-pressure">Your text here</div>
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

// Initialize specific VariableProximity elements
WebflowBits.initVariableProximityOn('.my-proximity-class');

// Initialize specific RotatingText elements
WebflowBits.initRotatingTextOn('.my-rotating-class');

// Initialize specific TextPressure elements
WebflowBits.initTextPressureOn('.my-pressure-class');

// Initialize specific CountUp elements
WebflowBits.initCountUpOn('.my-countup-class');

// Initialize specific ImageTrail elements
WebflowBits.initImageTrailOn('.my-imagetrail-class');

// Initialize specific MagnetLines elements
WebflowBits.initMagnetLinesOn('.my-magnetlines-class');

// Initialize specific TextCursor elements
WebflowBits.initTextCursorOn('.my-textcursor-class');

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
```