# Component Development Guide

This guide explains how to add a new component to the WebflowBits library. Follow these steps to ensure your component is properly registered and works with both the CDN and ES module builds.

## Table of Contents

1. [Quick Checklist](#quick-checklist)
2. [Component File Structure](#component-file-structure)
3. [Component Registration Steps](#component-registration-steps)
4. [File Locations](#file-locations)
5. [Naming Conventions](#naming-conventions)
6. [Component Requirements](#component-requirements)
7. [Step-by-Step Example](#step-by-step-example)

---

## Quick Checklist

Use this checklist to ensure you've completed all registration steps:

### Component File
- [ ] Created component file in correct directory (`text/`, `button/`, or `effect/`)
- [ ] Implemented all required methods: `initElement()`, `initAll()`, `destroyElement()`, `destroyAll()`, `refresh()`
- [ ] Set `componentName` (kebab-case)
- [ ] Set `componentClasses` with CSS class names
- [ ] Set `defaultConfig` with default values
- [ ] Exported singleton instance as default

### Registration Files

#### `componentsMetadata.js`
- [ ] Added component entry with kebab-case key
- [ ] Included all required fields: `name`, `description`, `category`, `file`
- [ ] Added all `wb-*` attributes to `attributes` array
- [ ] Added `example` with code snippet

#### `loader.js`
- [ ] Added to `COMPONENT_REQUIREMENTS` (GSAP dependencies)
- [ ] Added to `COMPONENT_LOADERS` with correct import path

#### `index.js`
- [ ] Added export with PascalCase name
- [ ] Import path matches file location

#### `WebflowBits.js`
- [ ] Added import statement at top of file
- [ ] Added to `this.components` object (camelCase key)
- [ ] Added to `config.components` array in `init()`
- [ ] Added initialization check in `initComponents()`
- [ ] Created `initYourComponent()` method
- [ ] Added to mutation observer in `setupMutationObserver()`
- [ ] Added `refresh()` call in mutation observer timeout
- [ ] Added `refresh()` call in `refresh()` method
- [ ] Added `destroyAll()` call in `destroy()` method
- [ ] Added manual `initYourComponentOn()` method (optional)

### Testing
- [ ] Tested component in development mode
- [ ] Tested with HTML markup
- [ ] Tested dynamic element addition
- [ ] Tested cleanup and memory leaks
- [ ] Verified naming conventions are correct

---

## Component File Structure

Every component must follow this structure:

```javascript
/**
 * Component Name
 * Brief description of what the component does
 */

import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager, webflowBitsClasses } from '../../utils/core/classManager.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Component-specific CSS (injected once)
const componentCSS = `
  /* Your component styles here */
`;

class YourComponentAnimator {
  constructor() {
    this.componentName = 'your-component'; // kebab-case
    this.instances = new Map(); // Store element instances
    this.componentClasses = {
      parent: 'wb-your-component',
      // Add other class names as needed
    };
    
    // Default configuration
    this.defaultConfig = {
      // Your default values
    };
    
    // Inject CSS once
    injectStyles(this.componentName, componentCSS);
  }

  /**
   * Parse custom attributes from element
   */
  parseConfig(element) {
    const attributeMap = {
      // Map wb-* attributes to config properties
      yourAttribute: { attribute: 'wb-your-attribute', type: 'string' },
    };
    
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Initialize a single element
   */
  initElement(element) {
    // Skip if already initialized
    if (this.instances.has(element)) {
      return;
    }

    // Parse configuration
    const config = this.parseConfig(element);

    // Apply component classes
    ComponentClassManager.applyClasses(
      element,
      [this.componentClasses.parent],
      this.instances,
      this.componentName
    );

    // Create instance
    const instance = {
      element,
      config,
      // Add any DOM structure or state here
    };

    this.instances.set(element, instance);

    // Dispatch initialization event
    AnimationStateManager.dispatchLifecycleEvent(
      element,
      'init',
      this.componentName,
      { instance }
    );
  }

  /**
   * Initialize all elements with wb-component="your-component"
   */
  initAll() {
    const elements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
    elements.forEach((element) => {
      this.initElement(element);
    });
  }

  /**
   * Destroy a specific element instance
   */
  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;

    // Cleanup: remove classes, event listeners, DOM modifications, etc.
    ComponentClassManager.removeClasses(
      element,
      this.componentClasses,
      this.instances,
      this.componentName
    );

    // Dispatch destroy event
    AnimationStateManager.dispatchLifecycleEvent(
      element,
      'destroy',
      this.componentName,
      { instance }
    );

    // Remove from instances
    this.instances.delete(element);
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    for (const element of this.instances.keys()) {
      this.destroyElement(element);
    }
  }

  /**
   * Refresh all instances - re-initialize elements that may have changed
   */
  refresh() {
    const allElements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
    allElements.forEach(element => {
      if (this.instances.has(element)) {
        this.destroyElement(element);
      }
      this.initElement(element);
    });
  }

  /**
   * Get instance for specific element
   */
  getInstance(element) {
    return this.instances.get(element);
  }
}

// Create and export singleton instance
const yourComponentAnimator = new YourComponentAnimator();

// Auto-initialize (optional - WebflowBits.js handles this)
if (typeof document !== 'undefined') {
  const autoInit = () => {
    yourComponentAnimator.initAll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}

export default yourComponentAnimator;
```

---

## Component Registration Steps

To add a new component, you need to register it in **4 files**:

### 1. `componentsMetadata.js`

Add your component metadata to the `componentsMetadata` object:

```javascript
export const componentsMetadata = {
  // ... existing components
  
  'your-component': {
    name: 'Your Component',
    description: 'Brief description of what it does',
    category: 'text', // or 'button' or 'effect'
    file: 'yourComponent.js', // camelCase filename
    installationNotes: 'Instructions on how to use this component',
    attributes: [
      {
        name: 'wb-component',
        description: 'Enable your component',
        default: 'your-component',
        inputType: 'text',
        required: true
      },
      {
        name: 'wb-your-attribute',
        description: 'Description of attribute',
        default: 'default-value',
        inputType: 'text', // or 'slider', 'dropdown', 'toggle', 'color'
        // For sliders:
        sliderConfig: { min: 0, max: 100, step: 1 },
        // For dropdowns:
        options: ['option1', 'option2', 'option3'],
        // For color pickers:
        supportsAlpha: true
      }
    ],
    example: {
      title: 'Your Component Example',
      code: '<div wb-component="your-component" wb-your-attribute="value">Content</div>',
      description: 'Example usage description'
    }
  }
}
```

**Key Points:**
- Component key is **kebab-case** (e.g., `'your-component'`)
- File name is **camelCase** (e.g., `'yourComponent.js'`)
- Category must be one of: `'text'`, `'button'`, or `'effect'`
- Attributes should include all `wb-*` attributes your component uses

### 2. `loader.js`

Add your component to two places:

#### A. `COMPONENT_REQUIREMENTS` (GSAP dependencies)

```javascript
const COMPONENT_REQUIREMENTS = {
  // ... existing components
  
  'your-component': ['core', 'scrollTrigger'], // or [] if no GSAP needed
  // Options: 'core', 'scrollTrigger', 'splitText', 'scrambleTextPlugin'
};
```

#### B. `COMPONENT_LOADERS` (dynamic import mapping)

```javascript
const COMPONENT_LOADERS = {
  // ... existing components
  
  'your-component': () => import('./components/text/yourComponent.js'),
  // Path depends on category: text/, button/, or effect/
};
```

**Key Points:**
- Use kebab-case for the key
- Import path should match your file location
- If it's a text component: `'./components/text/yourComponent.js'`
- If it's a button component: `'./components/button/yourComponent.js'`
- If it's an effect component: `'./components/effect/yourComponent.js'`

### 3. `index.js`

Add your component export:

```javascript
// Export all components
export { default as YourComponent } from './components/text/yourComponent.js'
// ... existing exports
```

**Key Points:**
- Export name is **PascalCase** (e.g., `YourComponent`)
- Import path matches your file location

### 4. `WebflowBits.js`

Add your component in **5 places**:

#### A. Import statement (top of file)

```javascript
import yourComponentAnimator from '../components/text/yourComponent.js';
```

#### B. `this.components` object (in constructor)

```javascript
this.components = {
  // ... existing components
  yourComponent: yourComponentAnimator, // camelCase key
};
```

#### C. Component list in `init()` config

```javascript
const config = {
  components: [
    // ... existing components
    'yourComponent', // camelCase
  ],
  // ...
};
```

#### D. Initialization method in `initComponents()`

```javascript
if (config.components.includes('yourComponent')) {
  this.initYourComponent(config.debug);
}
```

#### E. Create initialization method

```javascript
initYourComponent(debug = false) {
  try {
    yourComponentAnimator.initAll();
    if (debug) {
      console.log('WebflowBits: YourComponent initialized');
    }
  } catch (error) {
    console.error('WebflowBits: Failed to initialize YourComponent', error);
  }
}
```

#### F. Mutation observer (in `setupMutationObserver()`)

Add detection for dynamically added elements:

```javascript
// Check for wb-component="your-component" elements
const yourComponentElements = node.matches?.('[wb-component="your-component"]')
  ? [node]
  : Array.from(node.querySelectorAll?.('[wb-component="your-component"]') || []);

yourComponentElements.forEach(element => {
  yourComponentAnimator.initElement(element);
  shouldRefresh = true;
});
```

#### G. Refresh call (in `setupMutationObserver()` and `refresh()`)

```javascript
// In setupMutationObserver refresh timeout:
yourComponentAnimator.refresh();

// In refresh() method:
yourComponentAnimator.refresh();
```

#### H. Destroy call (in `destroy()`)

```javascript
yourComponentAnimator.destroyAll();
```

#### I. Manual init method (optional but recommended)

```javascript
initYourComponentOn(selector) {
  const elements = typeof selector === 'string' 
    ? document.querySelectorAll(selector)
    : selector.nodeType ? [selector] : selector;
  
  Array.from(elements).forEach(element => {
    if (element.getAttribute('wb-component') === 'your-component') {
      yourComponentAnimator.initElement(element);
    }
  });

  yourComponentAnimator.refresh();
  return this;
}
```

---

## File Locations

Components are organized by category:

```
src/library/components/
├── text/
│   ├── splitText.js
│   ├── gradientText.js
│   └── yourComponent.js  ← Text components here
├── button/
│   ├── gradientButton.js
│   ├── rippleButton.js
│   └── yourComponent.js  ← Button components here
└── effect/
    ├── smartAnimate.js
    ├── imageTrail.js
    └── yourComponent.js  ← Effect components here
```

---

## Naming Conventions

| Context | Format | Example |
|---------|--------|---------|
| Component key (metadata) | kebab-case | `'your-component'` |
| File name | camelCase | `yourComponent.js` |
| Class name | PascalCase | `YourComponentAnimator` |
| Instance variable | camelCase | `yourComponentAnimator` |
| Export name (index.js) | PascalCase | `YourComponent` |
| Component class (CSS) | kebab-case | `wb-your-component` |
| Attribute names | kebab-case | `wb-your-attribute` |
| Method names | camelCase | `initYourComponent()` |

---

## Component Requirements

### Required Methods

Every component **must** implement:

- `initElement(element)` - Initialize a single element
- `initAll()` - Initialize all matching elements
- `destroyElement(element)` - Clean up a single element
- `destroyAll()` - Clean up all instances
- `refresh()` - Re-initialize all instances

### Required Properties

- `this.componentName` - kebab-case component name
- `this.instances` - Map to store element instances
- `this.componentClasses` - Object with CSS class names
- `this.defaultConfig` - Default configuration values

### Optional but Recommended

- `getInstance(element)` - Get instance for an element
- `getAllInstances()` - Get all instances
- `updateElement(element, newConfig)` - Update element config
- `checkForConflicts()` - Check for CSS conflicts

---

## Step-by-Step Example

Let's add a new component called "glow-text":

### Step 1: Create Component File

Create `src/library/components/text/glowText.js`:

```javascript
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig } from '../../utils/core/attributeParser.js';
import { ComponentClassManager } from '../../utils/core/classManager.js';

const componentCSS = `
  .wb-glow-text {
    text-shadow: 0 0 10px var(--wb-glow-color, #fff);
    transition: text-shadow 0.3s ease;
  }
`;

class GlowTextAnimator {
  constructor() {
    this.componentName = 'glow-text';
    this.instances = new Map();
    this.componentClasses = { parent: 'wb-glow-text' };
    this.defaultConfig = { glowColor: '#ffffff', intensity: '10px' };
    injectStyles(this.componentName, componentCSS);
  }

  parseConfig(element) {
    const attributeMap = {
      glowColor: { attribute: 'wb-glow-color', type: 'string' },
      intensity: { attribute: 'wb-intensity', type: 'string' },
    };
    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  initElement(element) {
    if (this.instances.has(element)) return;
    
    const config = this.parseConfig(element);
    ComponentClassManager.applyClasses(
      element,
      [this.componentClasses.parent],
      this.instances,
      this.componentName
    );
    
    element.style.setProperty('--wb-glow-color', config.glowColor);
    element.style.textShadow = `0 0 ${config.intensity} ${config.glowColor}`;
    
    this.instances.set(element, { element, config });
  }

  initAll() {
    document.querySelectorAll(`[wb-component="${this.componentName}"]`)
      .forEach(el => this.initElement(el));
  }

  destroyElement(element) {
    const instance = this.instances.get(element);
    if (!instance) return;
    
    ComponentClassManager.removeClasses(
      element,
      this.componentClasses,
      this.instances,
      this.componentName
    );
    
    element.style.textShadow = '';
    this.instances.delete(element);
  }

  destroyAll() {
    for (const element of this.instances.keys()) {
      this.destroyElement(element);
    }
  }

  refresh() {
    const allElements = document.querySelectorAll(`[wb-component="${this.componentName}"]`);
    allElements.forEach(element => {
      if (this.instances.has(element)) {
        this.destroyElement(element);
      }
      this.initElement(element);
    });
  }
}

const glowTextAnimator = new GlowTextAnimator();
export default glowTextAnimator;
```

### Step 2: Add to `componentsMetadata.js`

```javascript
export const componentsMetadata = {
  // ... existing components
  
  'glow-text': {
    name: 'Glow Text',
    description: 'Text with glowing effect',
    category: 'text',
    file: 'glowText.js',
    installationNotes: 'Works with any text element like <h1>, <h2>, <p>, <span>.',
    attributes: [
      {
        name: 'wb-component',
        description: 'Enable glow text effect',
        default: 'glow-text',
        inputType: 'text',
        required: true
      },
      {
        name: 'wb-glow-color',
        description: 'Glow color',
        default: '#ffffff',
        inputType: 'color',
        supportsAlpha: true
      },
      {
        name: 'wb-intensity',
        description: 'Glow intensity',
        default: '10px',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Glow Text Effect',
      code: '<h1 wb-component="glow-text" wb-glow-color="#00ff00" class="text-4xl">Glowing Text</h1>',
      description: 'Text with customizable glow effect'
    }
  }
}
```

### Step 3: Add to `loader.js`

```javascript
const COMPONENT_REQUIREMENTS = {
  // ... existing
  'glow-text': [], // No GSAP needed
};

const COMPONENT_LOADERS = {
  // ... existing
  'glow-text': () => import('./components/text/glowText.js'),
};
```

### Step 4: Add to `index.js`

```javascript
export { default as GlowText } from './components/text/glowText.js'
```

### Step 5: Add to `WebflowBits.js`

```javascript
// A. Import
import glowTextAnimator from '../components/text/glowText.js';

// B. Add to components object
this.components = {
  // ... existing
  glowText: glowTextAnimator,
};

// C. Add to config.components array
components: ['splitText', 'textType', 'glowText', ...],

// D. Add initialization check
if (config.components.includes('glowText')) {
  this.initGlowText(config.debug);
}

// E. Create init method
initGlowText(debug = false) {
  try {
    glowTextAnimator.initAll();
    if (debug) {
      console.log('WebflowBits: GlowText initialized');
    }
  } catch (error) {
    console.error('WebflowBits: Failed to initialize GlowText', error);
  }
}

// F. Add to mutation observer
const glowTextElements = node.matches?.('[wb-component="glow-text"]')
  ? [node]
  : Array.from(node.querySelectorAll?.('[wb-component="glow-text"]') || []);

glowTextElements.forEach(element => {
  glowTextAnimator.initElement(element);
  shouldRefresh = true;
});

// G. Add to refresh calls
glowTextAnimator.refresh();

// H. Add to destroy
glowTextAnimator.destroyAll();

// I. Add manual init method (optional)
initGlowTextOn(selector) {
  const elements = typeof selector === 'string' 
    ? document.querySelectorAll(selector)
    : selector.nodeType ? [selector] : selector;
  
  Array.from(elements).forEach(element => {
    if (element.getAttribute('wb-component') === 'glow-text') {
      glowTextAnimator.initElement(element);
    }
  });

  glowTextAnimator.refresh();
  return this;
}
```

---

## Testing Your Component

1. **Test in development:**
   ```bash
   npm run dev
   ```

2. **Test with HTML:**
   ```html
   <h1 wb-component="your-component" wb-your-attribute="value">
     Test Content
   </h1>
   ```

3. **Test dynamic loading:**
   - Add element via JavaScript after page load
   - Verify mutation observer picks it up

4. **Test cleanup:**
   - Call `destroyAll()` and verify no memory leaks
   - Check that all event listeners are removed

---

## Best Practices

1. **Use utility functions:**
   - `injectStyles()` for CSS
   - `parseElementConfig()` for attributes
   - `ComponentClassManager` for class management
   - `AnimationStateManager` for events

2. **Handle edge cases:**
   - Check if element already initialized
   - Validate attribute values
   - Handle missing elements gracefully

3. **Clean up properly:**
   - Remove event listeners
   - Restore original DOM structure
   - Clear timers/intervals
   - Remove CSS classes

4. **Follow naming conventions:**
   - Use kebab-case for component names
   - Use camelCase for files and variables
   - Use PascalCase for classes and exports

5. **Document attributes:**
   - Add all attributes to metadata
   - Include descriptions and defaults
   - Specify input types correctly

6. **Test thoroughly:**
   - Test with multiple instances
   - Test dynamic addition/removal
   - Test with different attribute values
   - Test cleanup and memory leaks

---

## Common Pitfalls

1. **Forgetting to register in all 4 files** - Component won't work
2. **Wrong naming convention** - Breaks imports/exports
3. **Not cleaning up** - Memory leaks
4. **Missing GSAP requirements** - Component fails to load
5. **Incorrect file path** - Import errors
6. **Not handling already-initialized elements** - Duplicate instances

---

## Need Help?

- Check existing components for reference
- Review `shimmerButton.js` for a complete example
- Check `splitText.js` for GSAP usage
- Review `gradientButton.js` for CSS-only components

---

**Last Updated:** Based on WebflowBits v2.3.5

