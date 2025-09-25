/**
 * Components Metadata
 * This file contains metadata for all FlowBitz components
 * Used to automatically generate component pages and documentation
 */

/**
 * Installation Requirements
 * All components now work with a single script tag!
 * 
 * Basic Installation (for most components):
 * <script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>
 * 
 * The library automatically handles:
 * - GSAP and all plugins (bundled)
 * - Three.js auto-loading (for shape-blur component)
 * - All dependencies
 * 
 * No additional scripts needed!
 */

export const componentsMetadata = {
  // Text Components
  'split-text': {
    name: 'Split Text',
    description: 'Character, word, or line-based split animations',
    category: 'text',
    file: 'splitText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable split text animation', 
        default: 'split-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-split-type', 
        description: 'How to split the text: "chars", "words", or "lines"', 
        default: 'words',
        inputType: 'dropdown',
        options: ['characters', 'words', 'lines']
      },
      { 
        name: 'wb-stagger-delay', 
        description: 'Delay between elements in milliseconds', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1000, step: 10 }
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '0.6',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 5, step: 0.1 }
      },
      { 
        name: 'wb-ease', 
        description: 'GSAP animation easing function', 
        default: 'power3.out',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      }
    ],
    example: {
      title: 'Split Text Animation',
      code: '<h1 wb-component="split-text" wb-split-type="words" class="text-6xl">Create Amazing Websites with Powerful Animations</h1>',
      description: 'Each word animates separately with customizable split type and timing'
    }
  },

  'gradient-text': {
    name: 'Gradient Text',
    description: 'Animated gradient text with customizable colors',
    category: 'text',
    file: 'gradientText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable gradient text animation', 
        default: 'gradient-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-colors', 
        description: 'Gradient colors (comma-separated or JSON array)', 
        default: '#40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa',
        inputType: 'text'
      },
      { 
        name: 'wb-animation-speed', 
        description: 'Animation speed in seconds', 
        default: '8',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 0.5 }
      }
    ],
    example: {
      title: 'Gradient Text Animation',
      code: '<h1 wb-component="gradient-text" class="text-6xl">Gradient Text</h1>',
      description: 'Animated gradient text with customizable colors and effects'
    }
  },

  'text-type': {
    name: 'Text Type',
    description: 'Typewriter effect with customizable cursor',
    category: 'text',
    file: 'textType.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable text type animation', 
        default: 'text-type',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-cursor-character', 
        description: 'Cursor character style: "underscore", "pipe", "dot", "block", "full-block"', 
        default: 'pipe',
        inputType: 'dropdown',
        options: ['underscore', 'pipe', 'dot', 'block', 'full-block']
      },
      { 
        name: 'wb-text-1', 
        description: 'First text to type', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-text-2', 
        description: 'Second text to type', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-text-3', 
        description: 'Third text to type, you can add more texts by adding wb-text-4, wb-text-5, etc.', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-typing-speed', 
        description: 'Typing speed in milliseconds', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 500, step: 10 }
      },
      { 
        name: 'wb-pause-duration', 
        description: 'Pause time between typing and deleting in milliseconds', 
        default: '2000',
        inputType: 'slider',
        sliderConfig: { min: 500, max: 10000, step: 100 }
      },
      { 
        name: 'wb-deleting-speed', 
        description: 'Deleting speed in milliseconds', 
        default: '50',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 5 }
      },
      { 
        name: 'wb-cursor-blink-duration', 
        description: 'Cursor blink duration in seconds', 
        default: '0.5',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 2, step: 0.1 }
      },
      { 
        name: 'wb-show-cursor', 
        description: 'Show/Hide cursor', 
        default: 'true',
        inputType: 'toggle'
      }
    ],
    example: {
      title: 'Typewriter Effect',
      code: '<h1 class="text-6xl"">Learn more about <span wb-component="text-type" wb-text-1="Coding" wb-text-2="Webflow" wb-text-3="Animation" class="text-6xl">Coding</span></h1>',
      description: 'Typewriter effect with customizable cursor and timing'
    }
  },

  'blur-text': {
    name: 'Blur Text',
    description: 'Blur-to-clear transition effects',
    category: 'text',
    file: 'blurText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable blur text animation', 
        default: 'blur-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-animate-by', 
        description: 'Animation trigger: "words" or "chars"', 
        default: 'words',
        inputType: 'dropdown',
        options: ['words', 'chars']
      },
      { 
        name: 'wb-direction', 
        description: 'Blur animation direction: "top" or "bottom"', 
        default: 'top',
        inputType: 'dropdown',
        options: ['top', 'bottom']
      },
      { 
        name: 'wb-delay', 
        description: 'Delay between elements in milliseconds', 
        default: '200',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1000, step: 50 }
      },
      { 
        name: 'wb-ease', 
        description: 'GSAP animation easing function', 
        default: 'back.out(1.4)',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.4)', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      }
    ],
    example: {
      title: 'Blur Text Animation',
      code: '<h1 wb-component="blur-text" class="text-6xl">Blur to Clear</h1>',
      description: 'Blur-to-clear transition effects with customizable timing'
    }
  },

  'shiny-text': {
    name: 'Shiny Text',
    description: 'Shimmer and shine text effects',
    category: 'text',
    file: 'shinyText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable shiny text animation', 
        default: 'shiny-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-speed', 
        description: 'Animation speed in seconds', 
        default: '2',
        inputType: 'slider',
        sliderConfig: { min: 0.5, max: 10, step: 0.5 }
      },
      { 
        name: 'wb-text-color', 
        description: 'Base text color (inherits from Webflow element if not specified)', 
        default: '#0a70ff',
        inputType: 'color'
      },
      { 
        name: 'wb-shine-color', 
        description: 'Shine color', 
        default: '#8cbcff',
        inputType: 'color'
      }
    ],
    example: {
      title: 'Shiny Text Effect',
      code: '<h1 class="text-6xl" wb-component="shiny-text" wb-text-color="#0a70ff" wb-shine-color="#8cbcff" style="line-height: 1.2;">Shiny Text</h1>',
      description: 'Shimmer and shine text effects with customizable speed'
    }
  },

  'count-up': {
    name: 'Count Up',
    description: 'Animated number counting',
    category: 'text',
    file: 'countUp.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable count up animation', 
        default: 'count-up',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-count-to', 
        description: 'Target number to count to', 
        default: '1250',
        inputType: 'string',
      },
      { 
        name: 'wb-count-from', 
        description: 'Starting number', 
        default: '0',
        inputType: 'string',
      },
      { 
        name: 'wb-count-direction', 
        description: 'Direction of counting: "up" or "down"', 
        default: 'up',
        inputType: 'dropdown',
        options: ['up', 'down']
      },
      { 
        name: 'wb-count-separator', 
        description: 'Thousand separator', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-count-precision', 
        description: 'Number of decimal places', 
        default: '2',
        inputType: 'dropdown',
        options: ['auto-detect', '0', '1', '2']
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '2',
        inputType: 'slider',
        sliderConfig: { min: 0.5, max: 10, step: 0.1 }
      },
      { 
        name: 'wb-ease', 
        description: 'GSAP animation easing function', 
        default: 'power2.out',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      }
    ],
    example: {
      title: 'Count Up Animation',
      code: '<h1 wb-component="count-up" wb-count-to="1250" wb-count-separator="," class="text-6xl">0</h1>',
      description: 'Animated number counting with customizable formatting'
    }
  },

  'decrypted-text': {
    name: 'Decrypted Text',
    description: 'Matrix-style decryption effects',
    category: 'text',
    file: 'decryptedText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable decrypted text animation', 
        default: 'decrypted-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-speed', 
        description: 'Animation speed in milliseconds', 
        default: '50',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 10 }
      },
      { 
        name: 'wb-max-iteration', 
        description: 'Maximum iterations for random mode', 
        default: '10',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 50, step: 1 }
      },
      { 
        name: 'wb-sequential', 
        description: 'Sequential vs random reveal', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-reveal-direction', 
        description: 'Reveal direction: "start", "end", "center"', 
        default: 'start',
        inputType: 'dropdown',
        options: ['start', 'end', 'center']
      },
      { 
        name: 'wb-use-original-chars', 
        description: 'Use only original characters for decrypting animation', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-characters', 
        description: 'Characters to use for scrambling', 
        default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        inputType: 'text'
      },
      { 
        name: 'wb-animate-on', 
        description: 'Trigger animation start: "view" or "hover"', 
        default: 'hover',
        inputType: 'dropdown',
        options: ['view', 'hover']
      }
    ],
    example: {
      title: 'Decrypted Text Effect',
      code: '<h1 wb-component="decrypted-text" wb-use-original-chars="true" class="text-6xl">SECRET MESSAGE</h1>',
      description: 'Matrix-style decryption effects with customizable characters'
    }
  },

  'scramble-text': {
    name: 'Scramble Text',
    description: 'Interactive character scrambling',
    category: 'text',
    file: 'scrambleText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable scramble text animation', 
        default: 'scramble-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-font', 
        description: 'Font family for consistent character width (recommended for best results)', 
        default: 'monospace',
        inputType: 'dropdown',
        options: [
          'monospace',
          'Courier New',
          'Consolas',
          'Menlo',
          'Monaco',
          'Lucida Console',
          'DejaVu Sans Mono',
          'Source Code Pro',
          'Fira Code',
          'JetBrains Mono',
          'Cascadia Code',
          'inherit (use existing font)'
        ],
        warning: '⚠️ Using "inherit" may cause width inconsistencies with scramble characters'
      },
      { 
        name: 'wb-radius', 
        description: 'Radius area for scramble effect in pixels', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 50, max: 500, step: 10 }
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '1.2',
        inputType: 'slider',
        sliderConfig: { min: 0.5, max: 5, step: 0.1 }
      },
      { 
        name: 'wb-speed', 
        description: 'Scrambling speed in seconds', 
        default: '0.5',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 2, step: 0.1 }
      },
      { 
        name: 'wb-scramble-chars', 
        description: 'Characters to use for scrambling', 
        default: '.:',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Scramble Text Effect',
      code: '<p wb-component="scramble-text" wb-font="monospace" class="text-2xl max-w-[570px]">Once you hover over me, you will see the effect in action! You can customize the radius, duration, and speed of the scramble effect.</p>',
      description: 'Interactive character scrambling with customizable radius, duration, and speed'
    }
  },

  'variable-proximity': {
    name: 'Variable Proximity',
    description: 'Mouse proximity font variations',
    category: 'text',
    file: 'variableProximity.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable variable proximity animation', 
        default: 'variable-proximity',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-radius', 
        description: 'Mouse proximity radius in pixels', 
        default: '50',
        inputType: 'slider',
        sliderConfig: { min: 20, max: 200, step: 5 }
      },
      { 
        name: 'wb-from-weight', 
        description: 'Starting font weight (100-900)', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 100, max: 900, step: 50 }
      },
      { 
        name: 'wb-to-weight', 
        description: 'Target font weight (100-900)', 
        default: '900',
        inputType: 'slider',
        sliderConfig: { min: 100, max: 900, step: 50 }
      }
    ],
    example: {
      title: 'Variable Proximity Effect',
      code: '<h1 wb-component="variable-proximity" class="text-4xl max-w-[570px]">Please hover over me to see the amazing variable font effects!</h1>',
      description: 'Mouse proximity font variations with customizable weight and size sliders'
    }
  },

  'rotating-text': {
    name: 'Rotating Text',
    description: 'Auto-rotating text with stagger effects',
    category: 'text',
    file: 'rotatingText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable rotating text animation', 
        default: 'rotating-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-rotating-split-by', 
        description: 'Split type: "characters", "words", "lines"', 
        default: 'characters',
        inputType: 'dropdown',
        options: ['characters', 'words', 'lines']
      },
      { 
        name: 'wb-background-color', 
        description: 'Background color for the text container', 
        default: '',
        inputType: 'color'
      },
      { 
        name: 'wb-text-color', 
        description: 'Text color for the rotating text', 
        default: '',
        inputType: 'color'
      },
      { 
        name: 'wb-border-radius', 
        description: 'Border radius for the text container (e.g., 8px, 1rem, 50%)', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-text-1', 
        description: 'First rotating text', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-text-2', 
        description: 'Second rotating text', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-text-3', 
        description: 'Third rotating text, you can add more texts by adding wb-text-4, wb-text-5, etc.', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-rotating-interval', 
        description: 'Time between rotations in milliseconds', 
        default: '2000',
        inputType: 'slider',
        sliderConfig: { min: 500, max: 10000, step: 100 }
      },
      { 
        name: 'wb-rotating-stagger-duration', 
        description: 'Delay between characters/words in milliseconds', 
        default: '50',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 10 }
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '0.6',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 3, step: 0.1 }
      },
      { 
        name: 'wb-ease', 
        description: 'GSAP animation easing function', 
        default: 'back.out(1.7)',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      },
      { 
        name: 'wb-rotating-stagger-from', 
        description: 'Stagger direction: "first", "last", "center", "random"', 
        default: 'first',
        inputType: 'dropdown',
        options: ['first', 'last', 'center', 'random']
      },
      { 
        name: 'wb-rotating-loop', 
        description: 'Enable/disable looping through texts', 
        default: 'true',
        inputType: 'switch'
      },
      { 
        name: 'wb-rotating-auto', 
        description: 'Enable/disable automatic rotation', 
        default: 'true',
        inputType: 'switch'
      }
    ],
    example: {
      title: 'Rotating Text Animation',
      code: '<h1 class="text-6xl">Powerful <span wb-component="rotating-text" wb-rotating-split-by="characters" wb-text-1="Animations" wb-text-2="Effects" wb-text-3="Interactions" wb-background-color="#0a70ff" wb-text-color="#ffffff" wb-border-radius="8px" class="text-6xl">Animations</span></h1>',
      description: 'Auto-rotating text with stagger effects, background color, text color, border radius, and automatic centering'
    }
  },

  'text-pressure': {
    name: 'Text Pressure',
    description: 'Mouse proximity font variations with variable fonts',
    category: 'text',
    file: 'textPressure.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable text pressure animation', 
        default: 'text-pressure',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-text', 
        description: 'Text Preview', 
        default: 'PRESSURE!',
        inputType: 'text'
      },
      { 
        name: 'wb-font-family', 
        description: 'Font Family', 
        default: 'inherit',
        inputType: 'select',
        options: [
          { value: 'inherit', label: 'Inherit from Webflow' },
          { value: 'Compressa VF', label: 'Compressa VF (Variable Font)' },
          { value: 'Recursive', label: 'Recursive (Variable Font)' },
          { value: 'Roboto Flex', label: 'Roboto Flex (Variable Font)' },
          { value: 'Source Sans 3', label: 'Source Sans 3 (Variable Font)' },
          { value: 'Space Grotesk', label: 'Space Grotesk (Variable Font)' },
          { value: 'Inter', label: 'Inter (Variable Font)' }
        ]
      },
      { 
        name: 'wb-width', 
        description: 'Width Variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-weight', 
        description: 'Weight Variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-italic', 
        description: 'Italic Variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-min-font-weight', 
        description: 'Minimal Font Weight', 
        default: '100',
        inputType: 'select',
        options: [
          { value: '100', label: '100 (Thin)' },
          { value: '200', label: '200 (Extra Light)' },
          { value: '300', label: '300 (Light)' },
          { value: '400', label: '400 (Normal)' },
          { value: '500', label: '500 (Medium)' }
        ]
      },
      { 
        name: 'wb-max-font-weight', 
        description: 'Maximal Font Weight', 
        default: '900',
        inputType: 'select',
        options: [
          { value: '500', label: '500 (Medium)' },
          { value: '600', label: '600 (Semi Bold)' },
          { value: '700', label: '700 (Bold)' },
          { value: '800', label: '800 (Extra Bold)' },
          { value: '900', label: '900 (Black)' }
        ]
      }
    ],
    example: {
      title: 'Text Pressure Effect',
      code: '<h1 wb-component="text-pressure" wb-font-family="Compressa VF" class="text-[160px] w-[570px]">PRESSURE!</h1>',
      description: 'Mouse proximity font variations with Compressa VF variable font'
    }
  },

  'shuffle': {
    name: 'Shuffle',
    description: 'Character-based sliding shuffle effects with customizable direction and scrambling',
    category: 'text',
    file: 'shuffle.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable shuffle animation', 
        default: 'shuffle',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-shuffle-direction', 
        description: 'Direction of shuffle: left|right', 
        default: 'right',
        inputType: 'dropdown',
        options: ['left', 'right']
      },
      { 
        name: 'wb-shuffle-times', 
        description: 'Number of shuffle iterations', 
        default: '1',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 10, step: 1 }
      },
      { 
        name: 'wb-animation-mode', 
        description: 'Animation mode: evenodd|random', 
        default: 'evenodd',
        inputType: 'dropdown',
        options: ['evenodd', 'random']
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '0.35',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 2, step: 0.05 }
      },
      { 
        name: 'wb-max-delay', 
        description: 'Maximum random delay for random mode in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.05 }
      },
      { 
        name: 'wb-ease', 
        description: 'Animation easing', 
        default: 'power3.out',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      },
      { 
        name: 'wb-loop', 
        description: 'Loop animation continuously', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-loop-delay', 
        description: 'Delay between loops in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 5, step: 0.1 }
      },
      { 
        name: 'wb-stagger', 
        description: 'Stagger delay between characters in seconds', 
        default: '0.03',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 0.5, step: 0.01 }
      },
      { 
        name: 'wb-trigger-on-hover', 
        description: 'Enable hover trigger after initial animation', 
        default: 'true',
        inputType: 'toggle'
      }
    ],
    example: {
      title: 'Shuffle Text Effect',
      code: '<h1 wb-component="shuffle" class="text-6xl">Create Amazing Websites With Powerful Animations</h1>',
      description: 'Character-based sliding shuffle effects with customizable direction'
    }
  },

  'tooltip-text': {
    name: 'Tooltip Text',
    description: 'Hover tooltips for any text element with customizable positioning and styling',
    category: 'text',
    file: 'tooltipText.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable tooltip text animation', 
        default: 'tooltip-text',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-tooltip-text', 
        description: 'Tooltip text content', 
        default: '',
        inputType: 'text',
      },
      { 
        name: 'wb-tooltip-position', 
        description: 'Tooltip position relative to element', 
        default: 'top',
        inputType: 'dropdown',
        options: ['top', 'bottom', 'left', 'right']
      },
      { 
        name: 'wb-tooltip-delay', 
        description: 'Delay before showing tooltip in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      },
      { 
        name: 'wb-tooltip-duration', 
        description: 'Animation duration in seconds', 
        default: '0.3',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 1, step: 0.05 }
      },
      { 
        name: 'wb-tooltip-background', 
        description: 'Tooltip background color', 
        default: '#000000',
        inputType: 'color'
      },
      { 
        name: 'wb-tooltip-color', 
        description: 'Tooltip text color', 
        default: '#ffffff',
        inputType: 'color'
      },
      {
        name: 'wb-tooltip-size-template',
        description: 'Tooltip size template',
        default: 'medium',
        inputType: 'dropdown',
        options: ['small', 'medium', 'large']
      },
      { 
        name: 'wb-tooltip-max-width', 
        description: 'Maximum tooltip width', 
        default: '300px',
        inputType: 'text'
      },
      { 
        name: 'wb-tooltip-offset', 
        description: 'Distance from element in pixels', 
        default: '10',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 50, step: 1 }
      }
    ],
    example: {
      title: 'Tooltip Text Effect',
      code: '<p class="text-lg font-normal">The example of the <span wb-component="tooltip-text" wb-tooltip-text="This is a helpful tooltip!" class="text-primary text-lg">Tooltip</span> Text component.</p>',
      description: 'Hover tooltips for any text element with customizable positioning and styling'
    }
  },

  'gradient-button': {
    name: 'Gradient Button',
    description: 'Animated gradient button with customizable colors',
    category: 'button',
    file: 'gradientButton.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable gradient button animation', 
        default: 'gradient-button',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-colors', 
        description: 'Gradient colors (comma-separated or JSON array)', 
        default: '#40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa',
        inputType: 'text'
      },
      { 
        name: 'wb-text-color', 
        description: 'Text color for the button', 
        default: 'white',
        inputType: 'color'
      },
      { 
        name: 'wb-animation-speed', 
        description: 'Animation speed in seconds', 
        default: '8',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 0.5 }
      },
      { 
        name: 'wb-scale-amount', 
        description: 'Scale amount when clicked (0-1, where 1 = no scale)', 
        default: '0.95',
        inputType: 'slider',
        sliderConfig: { min: 0.7, max: 1, step: 0.01 }
      }
    ],
    example: {
      title: 'Gradient Button Animation',
      code: '<button wb-component="gradient-button" class="text-md px-6 py-3 rounded-full font-semibold">Gradient Button</button>',
      description: 'Animated gradient button with customizable colors and hover effects'
    }
  },

  'ripple-button': {
    name: 'Ripple Button',
    description: 'Button with Material Design ripple effect and scale animation on click',
    category: 'button',
    file: 'rippleButton.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable ripple button animation', 
        default: 'ripple-button',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-ripple-color', 
        description: 'Ripple effect color (hex, rgb, or rgba)', 
        default: 'rgba(255, 255, 255, 0.6)',
        inputType: 'color'
      },
      { 
        name: 'wb-duration', 
        description: 'Ripple animation duration in milliseconds', 
        default: '600',
        inputType: 'slider',
        sliderConfig: { min: 200, max: 2000, step: 50 }
      },
      { 
        name: 'wb-scale-amount', 
        description: 'Scale amount when clicked (0-1, where 1 = no scale)', 
        default: '0.95',
        inputType: 'slider',
        sliderConfig: { min: 0.7, max: 1, step: 0.01 }
      }
    ],
    example: {
      title: 'Ripple Button Animation',
      code: '<a href="#" wb-component="ripple-button" class="text-md px-6 py-3 rounded-full font-semibold bg-primary text-white">Click me to see the effect!</a>',
      description: 'Button with Material Design ripple effect and scale animation that spreads from click point'
    }
  },

  'pulse-button': {
    name: 'Pulse Button',
    description: 'Button or link with gentle pulsing animation to draw attention. Works with both <button> and <a> elements.',
    category: 'button',
    file: 'pulseButton.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable pulse button animation', 
        default: 'pulse-button',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-speed', 
        description: 'Pulse animation speed: "slow", "normal", "fast", or custom duration', 
        default: 'normal',
        inputType: 'dropdown',
        options: ['slow', 'normal', 'fast']
      },
      { 
        name: 'wb-intensity', 
        description: 'Pulse scale intensity (how much it grows)', 
        default: 1.05,
        inputType: 'slider',
        sliderConfig: { min: 1.01, max: 1.2, step: 0.01 }
      },
      { 
        name: 'wb-hover-pause', 
        description: 'Pause animation on hover', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-scale-amount', 
        description: 'Scale amount when clicked (0-1, where 1 = no scale)', 
        default: '0.95',
        inputType: 'slider',
        sliderConfig: { min: 0.7, max: 1, step: 0.01 }
      }
    ],
    example: {
      title: 'Pulse Button Animation',
      code: '<a href="#" wb-component="pulse-button" class="text-md px-6 py-3 rounded-full font-semibold bg-primary text-white">Pulse Button</a>',
      description: 'Button or link with gentle pulsing animation to draw attention to important actions'
    }
  },

  'magnetic-button': {
    name: 'Magnetic Button',
    description: 'Button with magnetic attraction effect that follows mouse movement',
    category: 'button',
    file: 'magnet.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable magnetic button animation', 
        default: 'magnetic-button',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-padding', 
        description: 'Magnetic attraction area padding in pixels', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 500, step: 10 }
      },
      { 
        name: 'wb-strength', 
        description: 'Magnetic strength (higher = weaker effect)', 
        default: '2',
        inputType: 'slider',
        sliderConfig: { min: 0.5, max: 10, step: 0.1 }
      },
      { 
        name: 'wb-active-transition', 
        description: 'CSS transition when magnet is active', 
        default: 'transform 0.3s ease-out',
        inputType: 'dropdown',
        options: [
          'transform 0.1s ease-out',
          'transform 0.2s ease-out',
          'transform 0.3s ease-out',
          'transform 0.4s ease-out',
          'transform 0.5s ease-out',
          'transform 0.3s ease-in-out',
          'transform 0.3s ease-in',
          'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        ]
      },
      { 
        name: 'wb-inactive-transition', 
        description: 'CSS transition when magnet is inactive', 
        default: 'transform 0.5s ease-in-out',
        inputType: 'dropdown',
        options: [
          'transform 0.3s ease-in-out',
          'transform 0.4s ease-in-out',
          'transform 0.5s ease-in-out',
          'transform 0.6s ease-in-out',
          'transform 0.7s ease-in-out',
          'transform 0.5s ease-out',
          'transform 0.5s ease-in',
          'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        ]
      }
    ],
    example: {
      title: 'Magnetic Button',
      code: '<a src="#" wb-component="magnetic-button" class="inline-block text-md bg-primary text-white rounded-full px-6 py-3 hover:bg-primary-dark transition-colors hover:cursor-pointer">Hover me!</a>',
      description: 'Button that follows mouse movement with magnetic attraction - the entire button (background, text, and all styling) moves together'
    }
  }

}

/**
 * Get all components grouped by category
 */
export const getComponentsByCategory = () => {
  const categories = {
    text: [],
    interactive: [],
    button: []
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

/**
 * Get filtered component keys (excluding disabled components)
 */
export const getFilteredComponentKeys = () => {
  // Temporarily disabled components
  const disabledComponents = ['shape-blur', 'image-trail', 'magnet-lines', 'text-cursor']
  
  return Object.keys(componentsMetadata).filter(key => 
    !disabledComponents.includes(key)
  )
}

/**
 * Get installation requirements for all components
 */
export const getInstallationRequirements = () => {
  return {
    basic: {
      description: 'Single script tag - works for all components',
      script: '<script src="https://flowbitz.dev/latest/flowbitz.umd.js"></script>',
      includes: [
        'GSAP and all plugins (bundled)',
        'Three.js auto-loading (for shape-blur)',
        'All component dependencies'
      ]
    },
    components: {
      'shape-blur': {
        description: 'Auto-loads Three.js when needed',
        note: 'No additional setup required - Three.js loads automatically'
      },
      'all-others': {
        description: 'Work immediately with basic installation',
        note: 'All GSAP dependencies are bundled'
      }
    }
  }
}
