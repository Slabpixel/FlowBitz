# FlowBitz

[![Version](https://img.shields.io/badge/version-1.1.2-blue.svg)](https://github.com/Slabpixel/FlowBitz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-flowbitz.dev-orange.svg)](https://flowbitz.dev)

> Interactive components library for Webflow - Create stunning animations with just a few attributes

FlowBitz is a powerful JavaScript library that brings professional-grade animations to your Webflow projects. With a simple script tag and intuitive attributes, you can create sophisticated text effects, interactive buttons, and engaging animations without writing any code.

## ✨ Features

- **🎨 15+ Text Components**: Split text, gradient effects, typewriter, blur transitions, and more
- **🔘 Interactive Buttons**: Gradient, ripple, pulse, and magnetic button effects
- **⚡ Zero Configuration**: Works out of the box with a single script tag
- **🎯 Webflow Optimized**: Designed specifically for Webflow's visual editor
- **📱 Responsive**: All components work seamlessly across devices
- **🚀 Performance**: Lightweight and optimized for fast loading
- **🎛️ Customizable**: Extensive configuration options for every component
- **📚 Well Documented**: Comprehensive examples and documentation

## 🚀 Quick Start

### Installation

Add FlowBitz to your Webflow project with a single script tag:

```html
<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>
```

That's it! No additional dependencies, no configuration needed. FlowBitz includes GSAP and all necessary plugins bundled in.

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

| Component | Description | Example |
|-----------|-------------|---------|
| **Split Text** | Character, word, or line-based split animations | `wb-component="split-text"` |
| **Gradient Text** | Animated gradient text with customizable colors | `wb-component="gradient-text"` |
| **Text Type** | Typewriter effect with customizable cursor | `wb-component="text-type"` |
| **Blur Text** | Blur-to-clear transition effects | `wb-component="blur-text"` |
| **Shiny Text** | Shimmer and shine text effects | `wb-component="shiny-text"` |
| **Count Up** | Animated number counting | `wb-component="count-up"` |
| **Decrypted Text** | Matrix-style decryption effects | `wb-component="decrypted-text"` |
| **Scramble Text** | Interactive character scrambling | `wb-component="scramble-text"` |
| **Variable Proximity** | Mouse proximity font variations | `wb-component="variable-proximity"` |
| **Rotating Text** | Auto-rotating text with stagger effects | `wb-component="rotating-text"` |
| **Text Pressure** | Mouse proximity font variations with variable fonts | `wb-component="text-pressure"` |
| **Shuffle** | Character-based sliding shuffle effects | `wb-component="shuffle"` |
| **Tooltip Text** | Hover tooltips for any text element | `wb-component="tooltip-text"` |

### Button Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Gradient Button** | Animated gradient button with customizable colors | `wb-component="gradient-button"` |
| **Ripple Button** | Material Design ripple effect on click | `wb-component="ripple-button"` |
| **Pulse Button** | Gentle pulsing animation to draw attention | `wb-component="pulse-button"` |
| **Magnetic Button** | Magnetic attraction effect that follows mouse | `wb-component="magnetic-button"` |

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

## 🌐 CDN Options

FlowBitz is available via multiple CDN endpoints:

### Latest Version (Recommended)
```html
<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>
```

### Specific Version
```html
<script src="https://flowbitz.dev/v1.1.2/flowbitz.umd.js"></script>
```

### Beta Version (For Testing)
```html
<script src="https://flowbitz.dev/beta/flowbitz.umd.js"></script>
```

### NPM Package
```bash
npm install flowbitz
```

```javascript
import FlowBitz from 'flowbitz'
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

- **Website**: [flowbitz.dev](https://flowbitz.dev)
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

## 🙏 Acknowledgments

- **GSAP** - The backbone of all animations
- **Three.js** - For 3D components (auto-loaded when needed)
- **Webflow** - The platform that makes this all possible
- **Community** - All the developers who use and contribute to FlowBitz

## 📞 Support

- **Documentation**: [flowbitz.dev](https://flowbitz.dev)
- **GitHub Issues**: [Report bugs or request features](https://github.com/Slabpixel/FlowBitz/issues)
- **Discord**: Join our community for support and discussions

## 🔗 Links

- **Website**: [flowbitz.dev](https://flowbitz.dev)
- **Showcase**: [flowbitz.dev/components](https://flowbitz.dev/components)
- **GitHub**: [github.com/Slabpixel/FlowBitz](https://github.com/Slabpixel/FlowBitz)
- **NPM**: [npmjs.com/package/flowbitz](https://www.npmjs.com/package/flowbitz)

---

Made with ❤️ by [Slabpixel Studio](https://slabpixel.com)
