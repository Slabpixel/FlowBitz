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
      { name: 'wb-ease', description: 'GSAP animation easing function', default: 'power3.out' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '"-100px"' }
    ],
    examples: [
      {
        title: 'Character Split Animation',
        code: '<div wb-text-animate="split-text" wb-split-type="chars" wb-stagger-delay="50">Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit</div>',
        description: 'Each character animates individually'
      },
      {
        title: 'Word Split Animation',
        code: '<h2 wb-text-animate="split-text" wb-split-type="words" wb-stagger-delay="100">Word by Word Animation</h2>',
        description: 'Each word animates separately'
      },
      {
        title: 'Line Split Animation',
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
        code: '<div style="padding: 16px;" wb-text-animate="gradient-text" wb-colors="#a29bfe,#fd79a8,#fdcb6e" wb-show-border="true">Bordered Gradient</div>',
        code: '<div style="padding: 16px;" wb-text-animate="gradient-text" wb-colors="#a29bfe,#fd79a8,#fdcb6e" wb-show-border="true">Bordered Gradient</div>',
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
      { name: 'wb-cursor-character', description: 'Cursor character style: "underscore", "pipe", "dot", "block", "full-block" ', default: '|' },
      { name: 'wb-typing-speed', description: 'Typing speed in milliseconds', default: '100' },
      { name: 'wb-pause-duration', description: 'Pause time between typing and deleting in milisecond', default: '2000' },
      { name: 'wb-deleting-speed', description: 'Deleting speed in milliseconds', default: '50' },
      { name: 'wb-cursor-blink-duration', description: 'Cursor blink duration in seconds', default: '0.5' },
      { name: 'wb-show-cursor', description: 'Show/Hide cursor', default: 'true' },
      { name: 'wb-variable-speed', description: 'Enable variable typing speed', default: 'false' },
      { name: 'wb-variable-speed-min', description: 'Minimum variable typing speed in milliseconds', default: '30' },
      { name: 'wb-variable-speed-max', description: 'Maximum variable typing speed in milliseconds', default: '100' },
      { name: 'wb-loop', description: 'Loop through text array: "true" or "false"', default: 'true' },
      { name: 'wb-start-on-visible', description: 'Start animation when element becomes visible: "true" or "false"', default: 'false' },
      { name: 'wb-reverse-mode', description: 'Reverse character order: "true" or "false"', default: 'false' },
      { name: 'wb-hide-cursor-while-typing', description: 'Hide cursor while typing: "true" or "false"', default: 'false' },
      { name: 'wb-initial-delay', description: 'Initial delay in milliseconds', default: '0' }
    ],
    examples: [
      {
        title: 'Basic Typewriter',
        code: `
          <div wb-text-animate="text-type">
            <p>First text to type</p>
            <p>Second text to type</p>
            <p>Third text to type</p>
          </div>
        `,
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
      { name: 'wb-animate-by', description: 'Animation trigger: "words" or "chars"', default: 'words' },
      { name: 'wb-direction', description: 'Blur animation direction: "top" or "bottom"', default: 'top' },
      { name: 'wb-delay', description: 'Delay between elements in milliseconds', default: '200' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '0' },
      { name: 'wb-ease', description: 'GSAP animation easing function', default: 'back.out(1.4)' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '0.6' }
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
      { name: 'wb-speed', description: 'Animation speed in seconds', default: '2' },
      { name: 'wb-disable', description: 'Disable animation: "true" or "false"', default: 'false' },
      { name: 'wb-text-color', description: 'Base text color', default: '#b5b5b5a4' },
      { name: 'wb-shine-color', description: 'Shine color', default: 'rgba(255, 255, 255, 0.8)' },
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
      { name: 'wb-count-from', description: 'Starting number', default: '0' },
      { name: 'wb-count-direction', description: 'Direction of counting: "up" or "down"', default: 'up'},
      { name: 'wb-count-separator', description: 'Thousand separator', default: '""' },
      { name: 'wb-count-precision', description: 'Number of decimal places', default: 'auto-detect' },
      { name: 'wb-count-start', description: 'Start when element becomes visible', default: 'true' },
      { name: 'wb-count-loop', description: 'Loop the animation: "true" or "false"', default: 'false' },
      { name: 'wb-delay', description: 'Delay before animation starts in seconds', default: '0' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '2' },
      { name: 'wb-ease', description: 'GSAP animation easing function', default: 'power2.out' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '0px' }
    ],
    examples: [
      {
        title: 'Basic Count',
        code: '<span wb-text-animate="count-up" wb-count-to="1000">0</span>',
        description: 'Count from 0 to 1000'
      },
      {
        title: 'Formatted Count',
        code: `<span wb-text-animate="count-up" wb-count-to="1250" wb-count-separator=","> 0 </span>`,
        code: `<span wb-text-animate="count-up" wb-count-to="1250" wb-count-separator=","> 0 </span>`,
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
      { name: 'wb-speed', description: 'Animation speed in milliseconds ', default: '50' },
      { name: 'wb-max-iteration', description: 'Maximum iterations for random mode', default: '10' },
      { name: 'wb-sequential', description: 'Sequential vs random reveal: "true" or "false"', default: 'false' },
      { name: 'wb-reveal-direction', description: 'Reveal direction: "start", "end", "center"', default: 'start' },
      { name: 'wb-use-original-chars', description: 'Use only original characters for decypting animation', default: 'false' },
      { name: 'wb-characters', description: 'Characters to use for scrambling', default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
      { name: 'wb-animate-on', description: 'Trigger animation start: "view" or "hover"', default: 'hover' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-class-name', description: 'CSS class for revealed characters', default: '""' },
      { name: 'wb-encrypted-class-name', description: 'CSS class for scrambled characters', debugger: '""' }
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
      { name: 'wb-radius', description: 'Radius area for scramble effect in pixels', default: '100' },
      { name: 'wb-duration', description: 'Animation duration in seconds ', default: '1.2' },
      { name: 'wb-speed', description: 'Scrambling speed in seconds', default: '0.5' },
      { name: 'wb-scramble-chars', description: 'Characters to use for scrambling', default: '.:' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '0px' }
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
      { name: 'wb-from-font-variation', description: 'Starting font variation settings', default: `"'wght' 100, 'opsz' 8"` },
      { name: 'wb-to-font-variation', description: 'Target font variation settings', default: `"'wght' 900, 'opsz' 144"` },
      { name: 'wb-radius', description: 'Mouse proximity radius in pixels', default: '50' },
      { name: 'wb-falloff', description: 'Falloff type: "linear, "exponential", "gaussian"', default: 'linear' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '0px' }
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
      { name: 'wb-rotating-split-by', description: 'Split type: "characters", "words", "lines"', default: 'characters' },
      { name: 'wb-rotation-interval', description: 'Time between rotations in milliseconds', default: '2000' },
      { name: 'wb-rotating-stagger-duration', description: 'Delay between characters/words in milliseconds', default: '50' },
      { name: 'wb-rotating-stagger-from', description: 'Stagger direction: first|last|center|random', default: 'first' },
      { name: 'wb-rotating-auto', description: 'Enable auto-rotation: true|false', default: 'true' },
      { name: 'wb-rotating-loop', description: 'Enable loop rotation: true|false', default: 'true' },
      { name: 'wb-duration', description: 'Animation duration in seconds', default: '0.6' },
      { name: 'wb-esase', description: 'GSAP animation easing function', default: 'back.out(1.7)' },
      { name: 'wb-threshold', description: 'Scroll trigger threshold', default: '0.1' },
      { name: 'wb-root-margin', description: 'Scroll trigger margin', default: '0px' },
      { name: 'wb-delay', description: 'Animation delay in milliseconds', default: '0' },
      { name: 'wb-rotating-initial-y', description: 'Initial Y position for characters', default: '100%' },
      { name: 'wb-rotating-initial-opacity', description: 'Initial opacity for characters', default: '0' },
      { name: 'wb-rotating-animate-y', description: 'Animate Y position for characters', default: '100%' },
      { name: 'wb-rotating-animate-opacity', description: 'Animate opacity for characters', default: '0' },
      { name: 'wb-rotating-exit-y', description: 'Exit Y position for characters', default: '100%' },
      { name: 'wb-rotating-exit-opacity', description: 'Exit opacity for characters', default: '0' },
    ],
    examples: [
      {
        title: 'Rotating Text',
        code: `
          <div 
            wb-text-animate="rotating-text"
            wb-rotating-split-by="characters"
            wb-rotating-stagger-duration="25"
            wb-rotating-stagger-from="first"
            wb-rotating-interval="2000"
            wb-rotating-ease="back.out(1.7)"
            style="padding: 0.5rem; background-color: cornflowerblue; border-radius: 8px;"
          >
            <p>Animated</p>
            <p>Rotating</p>
            <p>Text</p>
          </div>
        `,
        code: `
          <div 
            wb-text-animate="rotating-text"
            wb-rotating-split-by="characters"
            wb-rotating-stagger-duration="25"
            wb-rotating-stagger-from="first"
            wb-rotating-interval="2000"
            wb-rotating-ease="back.out(1.7)"
            style="padding: 0.5rem; background-color: cornflowerblue; border-radius: 8px;"
          >
            <p>Animated</p>
            <p>Rotating</p>
            <p>Text</p>
          </div>
        `,
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
      { name: 'wb-text', description: 'Text to animate', default: 'PRESSURE' },
      { name: 'wb-font-family', description: 'Font family used', default: 'Roboto Flex, sans-serif' },
      { name: 'wb-width', description: 'Enable width variation: true|false', default: 'true' },
      { name: 'wb-weight', description: 'Enable weight variation: true|false', default: 'true' },
      { name: 'wb-italic', description: 'Enable italic/slant variation: true|false', default: 'true' },
      { name: 'wb-alpha', description: 'Enable opacity variation: true|false', default: 'false' },
      { name: 'wb-stroke', description: 'Enable stroke effect: true|false', default: 'false' },
      { name: 'wb-text-color', description: 'Text color', default: '#FFFFFF' },
      { name: 'wb-stroke-color', description: 'Stroke color', default: '#FF0000' },
      { name: 'wb-min-font-size', description: 'Minimun font size', default: '24' }
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
      { name: 'wb-cursor-text', description: 'Text to follow cursor', default: '🎯' },
      { name: 'wb-cursor-delay', description: 'Animation delay in seconds', default: '0.01' },
      { name: 'wb-cursor-spacing', description: 'Distance between trail items in pixels', default: '100' },
      { name: 'wb-cursor-follow-direction', description: 'Rotate text to follow mouse direction: true|false', default: 'true' },
      { name: 'wb-cursor-random-float', description: 'Enable random floating animation: true|false', default: 'true' },
      { name: 'wb-cursor-exit-duration', description: 'Exit duration in seconds', default: '0.5' },
      { name: 'wb-cursor-removal-interval', description: 'Interval for removing trail items in milliseconds', default: '30' },
      { name: 'wb-cursor-max-points', description: 'Maximum number of trail items', default: '5' },
      { name: 'wb-cursor-font-size', description: 'Font size', default: '1.875rem' },
      { name: 'wb-cursor-color', description: 'Text color', default: 'currentColor' }
    ],
    examples: [
      {
        title: 'Text Cursor',
        code: `
          <div 
            wb-text-animate="text-cursor" 
            style="width: 800px; height: 400px; background: #1a1a1a; cursor: crosshair;"
          >
            Move your mouse here for emoji trail!
          </div>
        `,
        description: 'Text follows mouse cursor'
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
  },

  // Interactive Components
  'shape-blur': {
    name: 'ShapeBlur',
    description: 'WebGL shader-based interactive shape effects',
    category: 'interactive',
    file: 'shapeBlur.js',
    attributes: [
      { name: 'wb-shape-variation', description: 'Shape type: 0=rounded rectangle, 1=filled circle, 2=circle stroke, 3=triangle', default: '0' },
      { name: 'wb-shape-size', description: 'Shape size multiplier', default: '1.2' },
      { name: 'wb-roundness', description: 'Shape roundness', default: '0.4' },
      { name: 'wb-border-size', description: 'Border size', default: '0.05' },
      { name: 'wb-circle-size', description: 'Circle size', default: '0.3' },
      { name: 'wb-circle-edge', description: 'Circle edge sharpness', default: '0.5' },
      { name: 'wb-mouse-damp', description: 'Mouse movement dampening', default: '8' },
      { name: 'wb-pixel-ratio', description: 'Render quality', default: '2' }
    ],
    examples: [
      {
        title: 'Basic Rounded Rectacle Blur',
        code: `
          <div wb-animate="shape-blur" 
            wb-shape-variation="0"
            wb-shape-size="1.2"
            wb-roundness="0.4"
            style="height: 400px; width: 1000px; background: #1a1a1a;"
          >
          </div>
        `,
        description: 'Basic interactive shape effect'
      },
      {
        title: 'Filled Circle Blur',
        code: `
          <div wb-animate="shape-blur"
            wb-shape-variation="1"
            wb-circle-size="0.4"
            wb-circle-edge="0.3"
            wb-mouse-damp="12"
            style="height: 400px; width: 1000px; background: linear-gradient(45deg, #667eea, #764ba2);"
          >
          </div>
        `,
        description: 'Filled Circle shape parameters'
      },
      {
        title: 'Circle Blur',
        code: `
          <div wb-animate="shape-blur"
            wb-shape-variation="2"
            wb-circle-size="0.5"
            wb-circle-edge="0.8"
            wb-pixel-ratio="3"
            style="height: 400px; width: 1000px; background: #2c3e50;"
          >
          </div>
        `,
        description: 'Circle shape parameters'
      },
      {
        title: 'Triagle Blur',
        code: `
          <div wb-animate="shape-blur"
            wb-shape-variation="3"
            wb-circle-size="0.4"
            wb-mouse-damp="4"
            style="height: 400px; width: 1000px; background: #8e44ad;"
          >
          </div>
        `,
        description: 'Triangle shape parameters'
      }
    ]
  },

  'image-trail': {
    name: 'ImageTrail',
    description: 'Mouse-following image trail effects',
    category: 'interactive',
    file: 'imageTrail.js',
    attributes: [
      { name: 'wb-varint', description: ' Effect variant 1 - 8', default: '1' },
      { name: 'wb-threshold', description: 'Mouse movement threshold to trigger images', default: '80' },
      { name: 'wb-item-width', description: 'Image width', default: '190px' },
      { name: 'wb-item-height', description: 'Image height', default: 'auto' },
      { name: 'wb-border-radius', description: 'Image border radius', default: '15px' },
      { name: 'wb-visible-images', description: 'Maximum visible images for variant 7', default: '9' },
      { name: 'wb-images', description: 'Required JSON array of image URLs', default: '""' }
    ],
    examples: [
      {
        title: 'Basic Trail',
        code: `
          <div 
            wb-animate="image-trail" 
            wb-variant="1"
            wb-threshold="80"
            wb-images='[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop",
              "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=400&fit=crop"
            ]'
            style="width: 800px; height: 400px; background: #1a1a1a; cursor: pointer;">
          </div>
        `,
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
      { name: 'wb-rows', description: 'Number of rows in the grid', default: '9' },
      { name: 'wb-columns', description: 'Number of columns in the grid', default: '9' },
      { name: 'wb-container-size', description: 'Container size', default: '80vmin' },
      { name: 'wb-line-color', description: 'Line color', default: '#efefef' },
      { name: 'wb-line-width', description: 'Line width', default: '1vmin'},
      { name: 'wb-line-height', description: 'Line height', default: '6vmin' },
      { name: 'wb-base-angle', description: 'Base rotation angle in degrees', default: '-10' }
    ],
    examples: [
      {
        title: 'Basic Magnet Lines',
        code: '<div wb-animate="magnet-lines">Magnetic Grid</div>',
        description: 'Basic magnetic line grid'
      }
    ]
  },

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
