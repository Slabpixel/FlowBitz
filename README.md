# FlowBitz

[![Version](https://img.shields.io/badge/version-2.4.4-blue.svg)](https://github.com/Slabpixel/FlowBitz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-flowbitz.dev-orange.svg)](https://www.flowbitz.dev)

> Production-ready motion components for Webflow. Drop in a script, add a few attributes, and ship premium animations in minutes.

---

## Table of Contents
- [Overview](#overview)
- [What's New in v2.4](#whats-new-in-v24)
- [Component Catalog](#component-catalog)
- [Contributing](#contributing)
- [Support & Resources](#support--resources)

---

## Overview
- 24 plug-and-play animations covering text, buttons, and immersive effects
- Built for visual developers: configure everything with `wb-*` attributes inside Webflow
- GSAP under the hood with graceful CSS fallbacks where possible
- Dual build pipeline (UMD + ES modules) with smart lazy loading
- Detailed docs, metadata, and debugging utilities baked in

---

## What's New in v2.4
- **New components:** `shimmer-button`, `hover-zoom`
- **ImageTrail improvements:** Enhanced performance and better image preloading
- **ScrollTrigger improvements:** Enhanced helper calculations and viewport unit handling
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
| `shimmer-button` | ❌ | Shimmer effect with customizable direction and color |
| `magnetic-button` | ✅ | Cursor-follow magnetism |

### Effects
| Component | GSAP | Highlights |
|-----------|------|------------|
| `smart-animate` | ✅ | Scroll-driven reveal engine |
| `3d-card-hover` | ❌ | CSS perspective tilt |
| `outline-gradient` | ❌ | Animated gradient outlines |
| `image-trail` | ✅ | Mouse-following image trails (8 variants) |
| `hover-zoom` | ❌ | Zoom effect with parallax movement on hover |

> Components marked ❌ are CSS-only and ship without GSAP for minimal bundles.

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
