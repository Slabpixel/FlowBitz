# FlowBitz Development Guide

This guide explains how to develop, test, and release FlowBitz components.

## 🏗️ Project Structure

```
FlowBitz/
├── src/
│   ├── app/                    # React showcase website
│   └── library/                # Core FlowBitz library
│       ├── components/         # Individual components
│       ├── core/              # Main library files
│       ├── data/              # Component metadata
│       └── utils/             # Utility functions
├── scripts/                   # Build and release scripts
├── dist/                      # Built files
│   ├── v1.0.0/               # Versioned releases
│   ├── latest/               # Latest stable (symlink)
│   └── beta/                 # Beta version (temporary)
└── package.json              # Dependencies and scripts
```

## 🔄 Development Workflow

### 1. Daily Development (Beta)

When working on new features or fixes:

```bash
# 1. Make your changes to the library
# Edit files in src/library/

# 2. Build and deploy beta
npm run deploy:beta

# 3. Test beta version
# Visit: https://www.flowbitz.dev/beta/flowbitz.umd.js
```

**Beta URL for testing:**
```html
<script src="https://www.flowbitz.dev/beta/flowbitz.umd.js"></script>
```

### 2. When Beta is Ready (Promote to Stable)

When you're satisfied with the beta version:

```bash
# 1. Update version number
npm version patch    # for bug fixes
npm version minor    # for new features
npm version major    # for breaking changes

# 2. Promote beta to stable and deploy
npm run deploy:promote
```

**Result:** Beta becomes the new latest stable version.

### 3. Frontend-Only Updates

For changes to the showcase website only:

```bash
# 1. Make changes to React app
# Edit files in src/app/

# 2. Build and deploy frontend
npm run deploy:app

# Result: Website updates, library stays same
```

## 📦 Available Scripts

### Build Scripts
- `npm run build:app` - Build React showcase website
- `npm run build:library` - Build FlowBitz library
- `npm run build:all` - Build both app and library
- `npm run build:beta` - Build library and create beta version
- `npm run build:stable` - Build library and create stable version

### Build + Deploy Scripts
- `npm run deploy:app` - Build React showcase website + deploys to Vercel (does NOT update library)
- `npm run deploy:library` - Build FlowBitz library + deploys to Vercel (updates latest stable version)
- `npm run deploy:all` - Build both app and library + deploys to Vercel
- `npm run deploy:beta` - Build library and create beta version + deploys to Vercel (ONLY updates beta, never touches latest)
- `npm run deploy:stable` - Build library and create stable version + deploys to Vercel (updates latest stable version)
- `npm run deploy:promote` - Promote beta to stable + deploys to Vercel

### Release Scripts
- `npm run create-beta` - Create beta version from current build
- `npm run create-version` - Create stable version from current build
- `npm run promote-beta` - Promote beta to stable release

### Development Scripts
- `npm run dev` - Start development server
- `npm run preview` - Preview production build
- `npm run clean` - Clean dist directory

### Version Scripts
- `npm version patch` - Patch Release (Bug Fixes) Result: v1.0.0 → v1.0.1
- `npm version minor` - Minor Release (New Features) Result: v1.0.0 → v1.1.0
- `npm version major` - Major Release (Breaking Changes) Result: v1.0.0 → v2.0.0

### npm Publish
- `npm publish` - Publishing to https://registry.npmjs.org/ with tag latest and default access

<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>

<!-- Beta version -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@beta/dist/flowbitz.umd.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.3.2/dist/flowbitz.umd.js"></script>

<!-- Minified version (auto-minified by jsDelivr) -->
<script src="https://cdn.jsdelivr.net/npm/flowbitz@2.3.2/dist/flowbitz.umd.min.js"></script>

## 🌐 CDN Structure

### URL Patterns
```
https://www.flowbitz.dev/
├── v1.0.0/flowbitz.umd.js     # Specific version (immutable)
├── latest/flowbitz.umd.js     # Latest stable (1 hour cache)
├── beta/flowbitz.umd.js       # Beta version (5 min cache)
└── flowbitz.umd.js            # Redirects to latest
```

### Caching Strategy
- **Versioned URLs** (`/v1.0.0/`): Cached forever (immutable)
- **Latest URL** (`/latest/`): Cached for 1 hour
- **Beta URL** (`/beta/`): Cached for 5 minutes
- **Simple URL** (`/flowbitz.umd.js`): Redirects to latest

## 🔧 Component Development

### Adding a New Component

1. **Create component file:**
   ```bash
   # Create: src/library/components/text/myNewComponent.js
   ```

2. **Add to registry:**
   ```javascript
   // Update: src/library/core/WebflowBits.js
   import myNewComponent from '../components/text/myNewComponent.js';
   
   // Add to components object
   components: {
     // ... existing components
     myNewComponent: myNewComponent,
   }
   ```

3. **Add metadata:**
   ```javascript
   // Update: src/library/data/componentsMetadata.js
   // Add component configuration
   ```

4. **Test in beta:**
   ```bash
   npm run deploy:beta
   ```

### Component Structure

```javascript
// Example component structure
class MyNewComponent {
  constructor() {
    this.componentName = 'my-new-component';
    this.instances = new Map();
  }

  initAll() {
    // Initialize all elements
  }

  initElement(element) {
    // Initialize specific element
  }

  destroy(element) {
    // Clean up element
  }
}

export default new MyNewComponent();
```

## 🚀 Release Process

### Patch Release (Bug Fixes)
```bash
npm version patch
npm run deploy:promote
# Result: v1.0.0 → v1.0.1
```

### Minor Release (New Features)
```bash
npm version minor
npm run deploy:promote
# Result: v1.0.0 → v1.1.0
```

### Major Release (Breaking Changes)
```bash
npm version major
npm run deploy:promote
# Result: v1.0.0 → v2.0.0
```

## 🧪 Testing

### Local Testing
```bash
# Start development server
npm run dev

# Test specific component
# Visit: http://localhost:5173/components/component-name
```

### Beta Testing
```bash
# Deploy beta
npm run deploy:beta

# Test beta URL
# Visit: https://www.flowbitz.dev/beta/flowbitz.umd.js
```

### Production Testing
```bash
# Deploy stable
npm run deploy:promote

# Test production URL
# Visit: https://www.flowbitz.dev/latest/flowbitz.umd.js
```

## 📋 Checklist

### Before Release
- [ ] All tests pass
- [ ] Beta version tested
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated

### After Release
- [ ] Production URL works
- [ ] Version URLs work
- [ ] Beta cleaned up
- [ ] Users notified (if breaking changes)

## 🐛 Troubleshooting

### Common Issues

**Script fails with "No beta version found"**
```bash
# Solution: Deploy beta first
npm run deploy:beta
```

**Version not updating**
```bash
# Solution: Check package.json version
cat package.json | grep version
```

**Symlink creation fails**
```bash
# Solution: Check permissions
ls -la dist/
```

**CDN not updating**
```bash
# Solution: Check Vercel deployment
vercel logs
```

## 📚 Resources

- [FlowBitz Documentation](https://www.flowbitz.dev)
- [Component Examples](https://www.flowbitz.dev/components)
- [GitHub Repository](https://github.com/Slabpixel/FlowBitz)
- [Issue Tracker](https://github.com/Slabpixel/FlowBitz/issues)
