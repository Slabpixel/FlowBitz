/**
 * Components Metadata
 * This file contains metadata for all WebflowBits components
 * Used to automatically generate component pages and documentation
 */

export const componentsMetadata = {
  // Text Components
  'split-text': {
    name: 'SplitText',
    description: 'Character, word, or line-based split animations',
    category: 'text',
    file: 'splitText.js',
    attributes: [
      { name: 'wb-split-type', description: 'How to split the text: "chars", "words", or "lines"', default: 'words' },
      { name: 'wb-stagger-delay', description: 'Delay between elements in milliseconds', default: '100' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '0.6' },
      { name: 'wb-ease', description: 'Animation easing function', default: 'power3.out' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '"-100px"' }
    ],
    examples: [
      {
        title: 'Character Split',
        code: '<h1 wb-text-animate="split-text" wb-split-type="chars" wb-stagger-delay="50">Character by Character</h1>',
        description: 'Each character animates individually'
      },
      {
        title: 'Word Split',
        code: '<h2 wb-text-animate="split-text" wb-split-type="words" wb-stagger-delay="100">Word by Word Animation</h2>',
        description: 'Each word animates separately'
      },
      {
        title: 'Line Split',
        code: '<h3 wb-text-animate="split-text" wb-split-type="lines" wb-stagger-delay="150">Line by Line<br>Animation Effect</h3>',
        description: 'Each line animates separately'
      }
    ]
  },

  'gradient-text': {
    name: 'GradientText',
    description: 'Animated gradient text with customizable colors',
    category: 'text',
    file: 'gradientText.js',
    attributes: [
      { name: 'wb-colors', description: 'Gradient colors (comma-separated or JSON array)', default: 'Default gradient colors' },
      { name: 'wb-animation-speed', description: 'Animation speed in seconds', default: '8' },
      { name: 'wb-show-border', description: 'Show animated border overlay', default: 'false' },
      { name: 'wb-disabled', description: 'Disable animation', default: 'false' },
      { name: 'wb-border-color', description: 'Border background color', default: '"#060010"' }
    ],
    examples: [
      {
        title: 'Default Gradient',
        code: '<h1 wb-text-animate="gradient-text">Default Gradient</h1>',
        description: 'Uses default gradient colors'
      },
      {
        title: 'Custom Colors',
        code: '<h2 wb-text-animate="gradient-text" wb-colors="#ff6b6b,#4ecdc4,#45b7d1">Custom Colors</h2>',
        description: 'Custom gradient with specific colors'
      },
      {
        title: 'With Border',
        code: '<div wb-text-animate="gradient-text" wb-colors="#a29bfe,#fd79a8,#fdcb6e" wb-show-border="true">Bordered Gradient</div>',
        description: 'Gradient with animated border effect'
      }
    ]
  },

  'text-type': {
    name: 'TextType',
    description: 'Typewriter effect with customizable cursor',
    category: 'text',
    file: 'textType.js',
    attributes: [
      { name: 'wb-typing-speed', description: 'Typing speed in milliseconds', default: '100' },
      { name: 'wb-deleting-speed', description: 'Deleting speed in milliseconds', default: '50' },
      { name: 'wb-pause-time', description: 'Pause time between typing and deleting', default: '2000' },
      { name: 'wb-cursor-char', description: 'Cursor character', default: '|' },
      { name: 'wb-cursor-color', description: 'Cursor color', default: 'Current text color' }
    ],
    examples: [
      {
        title: 'Basic Typewriter',
        code: '<h1 wb-text-animate="text-type">Hello World!</h1>',
        description: 'Basic typewriter effect'
      },
      {
        title: 'Custom Speed',
        code: '<h2 wb-text-animate="text-type" wb-typing-speed="50" wb-deleting-speed="25">Fast Typing</h2>',
        description: 'Faster typing and deleting speed'
      }
    ]
  },

  'blur-text': {
    name: 'BlurText',
    description: 'Blur-to-clear transition effects',
    category: 'text',
    file: 'blurText.js',
    attributes: [
      { name: 'wb-blur-amount', description: 'Initial blur amount', default: '10' },
      { name: 'wb-animate-by', description: 'Animation trigger: "words", "chars", or "lines"', default: 'words' },
      { name: 'wb-delay', description: 'Delay before animation starts', default: '0' },
      { name: 'wb-duration', description: 'Animation duration', default: '1' }
    ],
    examples: [
      {
        title: 'Word Blur',
        code: '<h1 wb-text-animate="blur-text" wb-animate-by="words">Blur to Clear</h1>',
        description: 'Words blur in and clear up'
      },
      {
        title: 'Character Blur',
        code: '<h2 wb-text-animate="blur-text" wb-animate-by="chars" wb-blur-amount="15">Character Blur</h2>',
        description: 'Characters blur in and clear up'
      }
    ]
  },

  'shiny-text': {
    name: 'ShinyText',
    description: 'Shimmer and shine text effects',
    category: 'text',
    file: 'shinyText.js',
    attributes: [
      { name: 'wb-speed', description: 'Animation speed', default: '2' },
      { name: 'wb-intensity', description: 'Shine intensity', default: '0.5' },
      { name: 'wb-color', description: 'Shine color', default: 'White' }
    ],
    examples: [
      {
        title: 'Basic Shine',
        code: '<h1 wb-text-animate="shiny-text">Shiny Text</h1>',
        description: 'Basic shimmer effect'
      },
      {
        title: 'Fast Shine',
        code: '<h2 wb-text-animate="shiny-text" wb-speed="3">Fast Shine</h2>',
        description: 'Faster shimmer animation'
      }
    ]
  },

  'count-up': {
    name: 'CountUp',
    description: 'Animated number counting',
    category: 'text',
    file: 'countUp.js',
    attributes: [
      { name: 'wb-count-to', description: 'Target number to count to', default: '100' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '2' },
      { name: 'wb-delay', description: 'Delay before animation starts', default: '0' },
      { name: 'wb-format', description: 'Number format (e.g., "0,0" for commas)', default: 'none' }
    ],
    examples: [
      {
        title: 'Basic Count',
        code: '<span wb-text-animate="count-up" wb-count-to="1000">0</span>',
        description: 'Count from 0 to 1000'
      },
      {
        title: 'Formatted Count',
        code: '<span wb-text-animate="count-up" wb-count-to="1250" wb-format="0,0">0</span>',
        description: 'Count with comma formatting'
      }
    ]
  },

  'decrypted-text': {
    name: 'DecryptedText',
    description: 'Matrix-style decryption effects',
    category: 'text',
    file: 'decryptedText.js',
    attributes: [
      { name: 'wb-decrypt-speed', description: 'Decryption speed', default: '50' },
      { name: 'wb-characters', description: 'Characters to use for scrambling', default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
      { name: 'wb-delay', description: 'Delay before decryption starts', default: '0' }
    ],
    examples: [
      {
        title: 'Basic Decryption',
        code: '<h1 wb-text-animate="decrypted-text">SECRET MESSAGE</h1>',
        description: 'Basic matrix-style decryption'
      }
    ]
  },

  'scramble-text': {
    name: 'ScrambleText',
    description: 'Interactive character scrambling',
    category: 'text',
    file: 'scrambleText.js',
    attributes: [
      { name: 'wb-scramble-speed', description: 'Scrambling speed', default: '100' },
      { name: 'wb-characters', description: 'Characters to use for scrambling', default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      { name: 'wb-trigger', description: 'Trigger event: "hover", "click", or "scroll"', default: 'hover' }
    ],
    examples: [
      {
        title: 'Hover Scramble',
        code: '<h1 wb-text-animate="scramble-text" wb-trigger="hover">Hover to Scramble</h1>',
        description: 'Scrambles on hover'
      }
    ]
  },

  'variable-proximity': {
    name: 'VariableProximity',
    description: 'Mouse proximity font variations',
    category: 'text',
    file: 'variableProximity.js',
    attributes: [
      { name: 'wb-proximity-range', description: 'Mouse proximity range in pixels', default: '200' },
      { name: 'wb-font-weight', description: 'Font weight variation range', default: '400-900' },
      { name: 'wb-font-stretch', description: 'Font stretch variation range', default: '100-200' }
    ],
    examples: [
      {
        title: 'Proximity Effect',
        code: '<h1 wb-text-animate="variable-proximity">Move Mouse Near</h1>',
        description: 'Font changes based on mouse proximity'
      }
    ]
  },

  'rotating-text': {
    name: 'RotatingText',
    description: 'Auto-rotating text with stagger effects',
    category: 'text',
    file: 'rotatingText.js',
    attributes: [
      { name: 'wb-rotation-speed', description: 'Rotation speed in seconds', default: '2' },
      { name: 'wb-stagger-delay', description: 'Stagger delay between elements', default: '0.1' },
      { name: 'wb-rotation-axis', description: 'Rotation axis: "x", "y", or "z"', default: 'y' }
    ],
    examples: [
      {
        title: 'Rotating Text',
        code: '<h1 wb-text-animate="rotating-text">Rotating Text</h1>',
        description: 'Text rotates automatically'
      }
    ]
  },

  'text-pressure': {
    name: 'TextPressure',
    description: 'Mouse proximity font variations with variable fonts',
    category: 'text',
    file: 'textPressure.js',
    attributes: [
      { name: 'wb-pressure-range', description: 'Pressure detection range', default: '100' },
      { name: 'wb-font-weight', description: 'Font weight range', default: '300-900' },
      { name: 'wb-sensitivity', description: 'Pressure sensitivity', default: '1' }
    ],
    examples: [
      {
        title: 'Pressure Effect',
        code: '<h1 wb-text-animate="text-pressure">Pressure Sensitive</h1>',
        description: 'Font weight changes with mouse pressure'
      }
    ]
  },

  'text-cursor': {
    name: 'TextCursor',
    description: 'Mouse-following text/emoji trail effects',
    category: 'text',
    file: 'textCursor.js',
    attributes: [
      { name: 'wb-cursor-text', description: 'Text to follow cursor', default: '★' },
      { name: 'wb-trail-count', description: 'Number of trail elements', default: '10' },
      { name: 'wb-trail-delay', description: 'Delay between trail elements', default: '50' }
    ],
    examples: [
      {
        title: 'Text Cursor',
        code: '<div wb-text-animate="text-cursor" wb-cursor-text="★">Move Mouse</div>',
        description: 'Text follows mouse cursor'
      }
    ]
  },

  // Interactive Components
  'shape-blur': {
    name: 'ShapeBlur',
    description: 'WebGL shader-based interactive shape effects',
    category: 'interactive',
    file: 'shapeBlur.js',
    attributes: [
      { name: 'wb-shape-variation', description: 'Shape variation amount', default: '0' },
      { name: 'wb-shape-size', description: 'Shape size multiplier', default: '1.2' },
      { name: 'wb-roundness', description: 'Shape roundness', default: '0.4' },
      { name: 'wb-border-size', description: 'Border size', default: '0.05' },
      { name: 'wb-circle-size', description: 'Circle size', default: '0.3' },
      { name: 'wb-circle-edge', description: 'Circle edge sharpness', default: '0.5' },
      { name: 'wb-mouse-damp', description: 'Mouse movement dampening', default: '8' }
    ],
    examples: [
      {
        title: 'Basic Shape Blur',
        code: '<div wb-animate="shape-blur">Interactive Shape</div>',
        description: 'Basic interactive shape effect'
      },
      {
        title: 'Custom Shape',
        code: '<div wb-animate="shape-blur" wb-shape-size="1.5" wb-roundness="0.8">Custom Shape</div>',
        description: 'Customized shape parameters'
      }
    ]
  },

  'image-trail': {
    name: 'ImageTrail',
    description: 'Mouse-following image trail effects',
    category: 'interactive',
    file: 'imageTrail.js',
    attributes: [
      { name: 'wb-trail-count', description: 'Number of trail images', default: '5' },
      { name: 'wb-trail-delay', description: 'Delay between trail elements', default: '100' },
      { name: 'wb-trail-scale', description: 'Scale of trail elements', default: '0.8' }
    ],
    examples: [
      {
        title: 'Basic Trail',
        code: '<img wb-animate="image-trail" src="image.jpg" alt="Trail Image">',
        description: 'Basic image trail effect'
      }
    ]
  },

  'magnet-lines': {
    name: 'MagnetLines',
    description: 'Interactive magnetic line grid',
    category: 'interactive',
    file: 'magnetLines.js',
    attributes: [
      { name: 'wb-line-count', description: 'Number of lines', default: '20' },
      { name: 'wb-magnet-strength', description: 'Magnetic attraction strength', default: '0.5' },
      { name: 'wb-line-color', description: 'Line color', default: 'Current color' }
    ],
    examples: [
      {
        title: 'Basic Magnet Lines',
        code: '<div wb-animate="magnet-lines">Magnetic Grid</div>',
        description: 'Basic magnetic line grid'
      }
    ]
  },

  'shuffle': {
    name: 'Shuffle',
    description: 'Character-based sliding shuffle effects with customizable direction and scrambling',
    category: 'text',
    file: 'shuffle.js',
    attributes: [
      { name: 'wb-shuffle-direction', description: 'Direction of shuffle: left|right', default: 'right' },
      { name: 'wb-shuffle-times', description: 'Number of shuffle iterations', default: '1' },
      { name: 'wb-animation-mode', description: 'Animation mode: evenodd|random', default: 'evenodd' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '0.35' },
      { name: 'wb-max-delay', description: 'Maximum random delay for random mode in seconds', default: '0' },
      { name: 'wb-ease', description: 'Animation easing', default: 'power3.out' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '"-100px"' },
      { name: 'wb-loop', description: 'Loop animation continuously', default: 'false' },
      { name: 'wb-loop-delay', description: 'Delay between loops in seconds', default: '0' },
      { name: 'wb-stagger', description: 'Stagger delay between characters in seconds', default: '0.03' },
      { name: 'wb-scramble-charset', description: 'Characters to use for scrambling effect', default: 'empty' },
      { name: 'wb-color-from', description: 'Starting color for color transition', default: 'none' },
      { name: 'wb-color-to', description: 'Ending color for color transition', default: 'none' },
      { name: 'wb-trigger-once', description: 'Trigger animation only once on scroll', default: 'true' },
      { name: 'wb-respect-reduced-motion', description: 'Respect reduced motion preference', default: 'true' },
      { name: 'wb-trigger-on-hover', description: 'Enable hover trigger after initial animation', default: 'true' },
      { name: 'wb-text-align', description: 'Text alignment for characters: left|center|right|justify', default: 'center' }
    ],
    examples: [
      {
        title: 'Basic Left-to-Right Shuffle',
        code: '<h1 wb-text-animate="shuffle">SHUFFLE EFFECT</h1>',
        description: 'Basic left-to-right shuffle animation'
      },
      {
        title: 'Right-to-Left with Multiple Iterations',
        code: '<p wb-text-animate="shuffle" wb-shuffle-direction="left" wb-shuffle-times="3" wb-duration="0.5">Multi-Shuffle Text</p>',
        description: 'Right-to-left shuffle with multiple iterations'
      },
      {
        title: 'Scrambled Shuffle with Custom Characters',
        code: '<div wb-text-animate="shuffle" wb-shuffle-direction="right" wb-shuffle-times="2" wb-scramble-charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ" wb-animation-mode="evenodd" wb-stagger="0.05">SCRAMBLED SHUFFLE</div>',
        description: 'Shuffle with custom character scrambling'
      },
      {
        title: 'Random Mode with Color Transition',
        code: '<span wb-text-animate="shuffle" wb-animation-mode="random" wb-max-delay="0.5" wb-color-from="#ff0000" wb-color-to="#00ff00" wb-duration="0.8">Random Color Shuffle</span>',
        description: 'Random timing with color transition'
      },
      {
        title: 'Looping Shuffle with Hover Trigger',
        code: '<h2 wb-text-animate="shuffle" wb-loop="true" wb-loop-delay="1" wb-trigger-on-hover="true" wb-duration="0.4">Hover to Trigger</h2>',
        description: 'Continuous loop with hover re-trigger'
      }
    ]
  }
}

/**
 * Get all components grouped by category
 */
export const getComponentsByCategory = () => {
  const categories = {
    text: [],
    interactive: []
  }

  Object.entries(componentsMetadata).forEach(([key, component]) => {
    categories[component.category].push({
      key,
      ...component
    })
  })

  return categories
}

/**
 * Get a specific component by key
 */
export const getComponent = (key) => {
  return componentsMetadata[key] || null
}

/**
 * Get all component keys
 */
export const getAllComponentKeys = () => {
  return Object.keys(componentsMetadata)
}
