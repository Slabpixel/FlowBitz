# FlowBitz

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Slabpixel/FlowBitz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-flowbitz.dev-orange.svg)](https://www.flowbitz.dev)

> Interactive components library for Webflow - Create stunning animations with just a few attributes

FlowBitz is a powerful JavaScript library that brings professional-grade animations to your Webflow projects. With a simple script tag and intuitive attributes, you can create sophisticated text effects, interactive buttons, and engaging animations without writing any code.

## 🎉 What's New in v2.0

**Smart GSAP Loading & Lazy Architecture** - FlowBitz now intelligently loads only what you need:

- ✅ **95% smaller initial load** - 15KB instead of 300KB
- ✅ **Smart GSAP loading** - Loads GSAP automatically only when components need it
- ✅ **Zero GSAP for CSS components** - Use buttons without any dependencies
- ✅ **Auto-detection** - Detects and reuses existing GSAP installations
- ✅ **On-demand components** - Each component lazy-loads when detected
- ✅ **True one-script** - Just `<script src="flowbitz.umd.js"></script>` and you're ready!

**Performance Comparison:**

| Metric | v1.x | v2.0 | Improvement |
|--------|------|------|-------------|
| Initial Load | 300 KB | **15 KB** | 🚀 95% smaller |
| CSS Components | 300 KB | **15 KB** | No GSAP needed! |
| With GSAP | 300 KB | ~100 KB | 66% smaller |

## ✨ Features

- **🎨 18 Components**: 13 text effects, 4 interactive buttons, and 1 smart animation effect
- **📝 Text Effects**: Split text, gradient effects, typewriter, blur transitions, count-up, and more
- **🔘 Interactive Buttons**: Gradient, ripple, pulse, and magnetic button effects
- **⚡ Zero Configuration**: Works out of the box with a single script tag
- **🧠 Smart GSAP Loading**: Automatically loads GSAP only when needed
- **🎯 Webflow Optimized**: Designed specifically for Webflow's visual editor
- **📱 Responsive**: All components work seamlessly across devices
- **🚀 Performance**: Lightweight and optimized for fast loading (15KB initial)
- **🎛️ Customizable**: Extensive configuration options for every component
- **📚 Well Documented**: Comprehensive examples and documentation

## 🚀 Quick Start

### Installation

Add FlowBitz to your Webflow project with a single script tag:

```html
<!-- That's all you need! -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>
```

That's it! No additional setup needed. FlowBitz will:
- ✅ Auto-detect components on your page
- ✅ Load GSAP automatically only if components need it
- ✅ Detect and reuse existing GSAP if already loaded
- ✅ Skip GSAP entirely for CSS-only components (buttons)

**Note:** GSAP is now optional! FlowBitz loads it from CDN automatically when needed.

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

## 🧠 How Smart GSAP Loading Works

FlowBitz intelligently manages GSAP dependencies:

**CSS-Only Components (No GSAP needed):**
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>

<!-- These components work without GSAP (15KB total) -->
<button wb-component="ripple-button">Click Me</button>
<button wb-component="gradient-button">Hover Me</button>
```

**GSAP Components (Auto-loaded):**
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>

<!-- FlowBitz detects this needs GSAP and loads it automatically -->
<div wb-component="split-text">Animated Text</div>
```

**If You Already Have GSAP:**
```html
<!-- Your existing GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>

<!-- FlowBitz detects and reuses it! -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>
```

## 🌐 CDN Options

FlowBitz is available via multiple CDN endpoints:

### Latest Version (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>
```

### Specific Version
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.0.0/dist/flowbitz.umd.js"></script>
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

```javascript
import FlowBitz from 'flowbitz';
await FlowBitz.init();

// Check what was loaded
console.log(FlowBitz.getGSAPStats());
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

## 🔄 Migrating from v1.x

**v1.x (300KB bundle):**
```html
<script src="https://cdn.jsdelivr.net/npm/flowbitz@1/dist/flowbitz.umd.js"></script>
<script>window.WebflowBits.init();</script>
```

**v2.0 (15KB + smart loading):**
```html
<!-- Just one line - auto-initializes, auto-loads GSAP when needed -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2/dist/flowbitz.umd.js"></script>
```

**Benefits:**
- ✅ 95% smaller initial load
- ✅ No manual initialization needed
- ✅ GSAP loads automatically only when components need it
- ✅ Works with existing GSAP installations

## 🙏 Acknowledgments

- **GSAP** - The backbone of all animations (now loaded smartly on-demand)
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
