# FlowBitz

[![Version](https://img.shields.io/badge/version-2.3.4-blue.svg)](https://github.com/Slabpixel/FlowBitz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-flowbitz.dev-orange.svg)](https://www.flowbitz.dev)

> Production-ready motion components for Webflow. Drop in a script, add a few attributes, and ship premium animations in minutes.

---

## Table of Contents
- [Overview](#overview)
- [What’s New in v2.3](#whats-new-in-v23)
- [Component Catalog](#component-catalog)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [Bundles & CDN Options](#bundles--cdn-options)
- [Local Development](#local-development)
- [Contributing](#contributing)
- [Support & Resources](#support--resources)

---

## Overview
- 22 plug-and-play animations covering text, buttons, and immersive effects
- Built for visual developers: configure everything with `wb-*` attributes inside Webflow
- GSAP under the hood with graceful CSS fallbacks where possible
- Dual build pipeline (UMD + ES modules) with smart lazy loading
- Detailed docs, metadata, and debugging utilities baked in

---

## What’s New in v2.3
- **New effects:** `3d-card-hover`, `outline-gradient`, `image-trail`
- **Roll Text refresh:** extra presets for vertical motion reveals
- **Advanced controls:** RGBA colors, hover toggles, repeat logic, flexible root margins
- **Performance wins:** UMD bundle still 85 KB gzipped (−72% vs v1)

---

## Component Catalog

### Text
| Component | GSAP | Highlights |
|-----------|------|------------|
| `split-text` | ✅ | Character/word/line splits with stagger control |
| `gradient-text` | ✅ | Animated gradients + optional border |
| `text-type` | ✅ | Typewriter effect with cursor states |
| `blur-text` | ✅ | Blur-to-clear entrances |
| `shiny-text` | ❌ | CSS shimmer sweep |
| `count-up` | ✅ | Number animations with separators |
| `decrypted-text` | ✅ | Matrix-style decoding |
| `scramble-text` | ✅ | Character scramble with hover retrigger |
| `variable-proximity` | ✅ | Mouse-driven variable font control |
| `rotating-text` | ✅ | Rotating phrases with pause/resume API |
| `text-pressure` | ✅ | Variable font modulation (weight/width/italic) |
| `shuffle` | ✅ | Sliding character shuffle |
| `tooltip-text` | ❌ | Hover tooltips (CSS only) |
| `roll-text` | ✅ | Vertical rolling text reveal |

### Buttons
| Component | GSAP | Highlights |
|-----------|------|------------|
| `gradient-button` | ❌ | Animated gradient background |
| `ripple-button` | ❌ | Material-style click ripple |
| `pulse-button` | ❌ | Attention pulse |
| `magnetic-button` | ✅ | Cursor-follow magnetism |

### Effects
| Component | GSAP | Highlights |
|-----------|------|------------|
| `smart-animate` | ✅ | Scroll-driven reveal engine |
| `3d-card-hover` | ❌ | CSS perspective tilt |
| `outline-gradient` | ❌ | Animated gradient outlines |
| `image-trail` | ✅ | Mouse-following image trails (8 variants) |

> Components marked ❌ are CSS-only and ship without GSAP for minimal bundles.

---

## Quick Start

### Option 1 — CDN (UMD)
```html
<!-- Auto-initialised, GSAP included -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>

<h1 wb-component="split-text" wb-split-type="words">
  Create Amazing Websites with Powerful Animations
</h1>
```

### Option 2 — npm (ES modules)
```bash
npm install flowbitz
```

```javascript
import FlowBitz from 'flowbitz';

await FlowBitz.init({
  components: ['splitText', 'magneticButton'],
  debug: false,
});
```

---

## Usage Examples

### Magnetic Button
```html
<button wb-component="magnetic-button" wb-strength="2" class="magnetic-cta">
  Hover me
</button>
```

### Image Trail (variant 6)
```html
<div wb-component="image-trail"
     wb-variant="6"
     wb-images='["portrait1.webp","portrait2.webp","portrait3.webp"]'
     style="height: 360px; cursor: pointer;">
</div>
```

### Programmatic Control
```javascript
const countUp = FlowBitz.getComponent('countUp');
const el = document.querySelector('[wb-component="count-up"]');

countUp.updateConfig(el, {
  to: 1500,
  duration: 2.4,
  separator: ',',
});

countUp.startCountUp(el);
```

---

## Bundles & CDN Options
- `@latest` — newest stable build
- `@2.3.4` — pinned release
- `@beta` — beta channel

```html
<!-- Stable UMD -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.3.4/dist/flowbitz.umd.js"></script>

<!-- ES module -->
<script type="module">
  import FlowBitz from 'https://cdn.jsdelivr.net/npm/flowbitz@2.3.4/dist/flowbitz.es.js';
  await FlowBitz.init();
</script>
```

| Bundle | v1 | v2.3 | Improvement |
|--------|----|------|-------------|
| UMD (gzipped) | 300 KB | **85 KB** | −72% |
| ES entry | 300 KB | **15 KB** + lazy chunks | −95% |
| npm install | 828 KB | **319 KB** | −61% |

---

## Local Development

### Prerequisites
- Node.js 16+
- npm 8+ (or pnpm/yarn equivalent)

### Setup
```bash
git clone https://github.com/Slabpixel/FlowBitz.git
cd FlowBitz
npm install
```

### Common Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (showcase app) |
| `npm run build:library` | Build distributable library bundles |
| `npm run build:app` | Build marketing/showcase site |
| `npm run build:all` | Build library + app together |
| `npm run build:beta` | Generate beta package artifacts |
| `npm run preview` | Preview production output |

Project layout:
```
src/
├── app/         # React showcase
└── library/     # Core FlowBitz code
    ├── components/
    ├── core/
    ├── data/
    └── utils/
```

Deployments run on Vercel (`npm run deploy:*`) with immutable, versioned CDN paths like `flowbitz.dev/v2.3.4/`.

---

## Contributing
We love community contributions—bug fixes, docs, and new components all welcome.

1. Fork the repo and create a feature branch
2. Implement your change and run `npm run build:library`
3. Update documentation / metadata as needed
4. Open a PR describing the change, usage, and testing steps

Adding a component? Remember to:
- Implement it in `src/library/components/`
- Register it inside `src/library/core/WebflowBits.js`
- Document attributes in `src/library/data/componentsMetadata.js`
- (Optional) add a demo to the showcase app

---

## Support & Resources
- Docs & demos: [flowbitz.dev](https://www.flowbitz.dev)
- Release notes: [flowbitz.dev/release](https://www.flowbitz.dev/release)
- Issues & feature requests: [GitHub Issues](https://github.com/Slabpixel/FlowBitz/issues)
- Community chat: FlowBitz Discord (link on the website)
- Email: [support@flowbitz.dev](mailto:support@flowbitz.dev)

---

## License & Credits
- Licensed under the [MIT License](LICENSE)
- Crafted by [Slabpixel Studio](https://slabpixel.com)
- Powered by [GSAP](https://greensock.com/gsap) and inspired by the Webflow motion community

Made with ❤️ for creative Webflow builders.
