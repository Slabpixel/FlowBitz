/**
 * Components Metadata
 * This file contains metadata for all WebflowBits components
 * Used to automatically generate component pages and documentation
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
      },
      { 
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '-100px',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Split Text Animation',
      code: '<div wb-component="split-text" wb-split-type="words" wb-stagger-delay="100">Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit</div>',
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
      },
      { 
        name: 'wb-show-border', 
        description: 'Show animated border overlay', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-disabled', 
        description: 'Disable animation', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-border-color', 
        description: 'Border background color', 
        default: '#060010',
        inputType: 'color'
      }
    ],
    example: {
      title: 'Gradient Text Animation',
      code: '<h1 wb-component="gradient-text">Gradient Text</h1>',
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
        default: '|',
        inputType: 'dropdown',
        options: ['underscore', 'pipe', 'dot', 'block', 'full-block']
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
      },
      { 
        name: 'wb-variable-speed', 
        description: 'Enable variable typing speed', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-variable-speed-min', 
        description: 'Minimum variable typing speed in milliseconds', 
        default: '30',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 5 }
      },
      { 
        name: 'wb-variable-speed-max', 
        description: 'Maximum variable typing speed in milliseconds', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 50, max: 500, step: 10 }
      },
      { 
        name: 'wb-loop', 
        description: 'Loop through text array', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-start-on-visible', 
        description: 'Start animation when element becomes visible', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-reverse-mode', 
        description: 'Reverse character order', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-hide-cursor-while-typing', 
        description: 'Hide cursor while typing', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-initial-delay', 
        description: 'Initial delay in milliseconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 5000, step: 100 }
      }
    ],
    example: {
      title: 'Typewriter Effect',
      code: '<div wb-component="text-type" wb-typing-speed="100" wb-pause-duration="2000"><p>First text to type</p><p>Second text to type</p><p>Third text to type</p></div>',
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
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '0',
        inputType: 'text'
      },
      { 
        name: 'wb-ease', 
        description: 'GSAP animation easing function', 
        default: 'back.out(1.4)',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.4)', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      },
      { 
        name: 'wb-duration', 
        description: 'Animation duration in seconds', 
        default: '0.6',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 3, step: 0.1 }
      }
    ],
    example: {
      title: 'Blur Text Animation',
      code: '<h1 wb-component="blur-text" wb-animate-by="words" wb-delay="200">Blur to Clear</h1>',
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
        name: 'wb-disable', 
        description: 'Disable animation', 
        default: 'false',
        inputType: 'toggle'
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
      code: '<h1 wb-component="shiny-text" wb-text-color="#0a70ff" wb-shine-color="#8cbcff">Shiny Text</h1>',
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
        default: 'auto-detect',
        inputType: 'dropdown',
        options: ['auto-detect', '0', '1', '2', '3', '4']
      },
      { 
        name: 'wb-count-start', 
        description: 'Start when element becomes visible', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-count-loop', 
        description: 'Loop the animation', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-delay', 
        description: 'Delay before animation starts in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 5, step: 0.1 }
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
      },
      { 
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '0px',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Count Up Animation',
      code: '<span wb-component="count-up" wb-count-to="1250" wb-count-separator=",">0</span>',
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
      },
      { 
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-class-name', 
        description: 'CSS class for revealed characters', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-encrypted-class-name', 
        description: 'CSS class for scrambled characters', 
        default: '',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Decrypted Text Effect',
      code: '<h1 wb-component="decrypted-text" wb-speed="50">SECRET MESSAGE</h1>',
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
      },
      { 
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '0px',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Scramble Text Effect',
      code: '<h1 wb-component="scramble-text" wb-radius="100">Hover to Scramble</h1>',
      description: 'Interactive character scrambling with customizable radius'
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
        name: 'wb-from-font-variation', 
        description: 'Starting font variation settings', 
        default: "'wght' 100, 'opsz' 8",
        inputType: 'text'
      },
      { 
        name: 'wb-to-font-variation', 
        description: 'Target font variation settings', 
        default: "'wght' 900, 'opsz' 144",
        inputType: 'text'
      },
      { 
        name: 'wb-radius', 
        description: 'Mouse proximity radius in pixels', 
        default: '50',
        inputType: 'slider',
        sliderConfig: { min: 20, max: 200, step: 5 }
      },
      { 
        name: 'wb-falloff', 
        description: 'Falloff type: "linear", "exponential", "gaussian"', 
        default: 'linear',
        inputType: 'dropdown',
        options: ['linear', 'exponential', 'gaussian']
      },
      { 
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '0px',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Variable Proximity Effect',
      code: '<h1 wb-component="variable-proximity" wb-radius="50">Move Mouse Near</h1>',
      description: 'Mouse proximity font variations with customizable settings'
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
      ,
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
        name: 'wb-rotation-interval', 
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
        name: 'wb-rotating-stagger-from', 
        description: 'Stagger direction: first|last|center|random', 
        default: 'first',
        inputType: 'dropdown',
        options: ['first', 'last', 'center', 'random']
      },
      { 
        name: 'wb-rotating-auto', 
        description: 'Enable auto-rotation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-rotating-loop', 
        description: 'Enable loop rotation', 
        default: 'true',
        inputType: 'toggle'
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
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '0px',
        inputType: 'text'
      },
      { 
        name: 'wb-delay', 
        description: 'Animation delay in milliseconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 5000, step: 100 }
      },
      { 
        name: 'wb-rotating-initial-y', 
        description: 'Initial Y position for characters', 
        default: '100%',
        inputType: 'text'
      },
      { 
        name: 'wb-rotating-initial-opacity', 
        description: 'Initial opacity for characters', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-rotating-animate-y', 
        description: 'Animate Y position for characters', 
        default: '100%',
        inputType: 'text'
      },
      { 
        name: 'wb-rotating-animate-opacity', 
        description: 'Animate opacity for characters', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-rotating-exit-y', 
        description: 'Exit Y position for characters', 
        default: '100%',
        inputType: 'text'
      },
      { 
        name: 'wb-rotating-exit-opacity', 
        description: 'Exit opacity for characters', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      }
    ],
    example: {
      title: 'Rotating Text Animation',
      code: '<h1 class="h1">The Sample of <span wb-component="rotating-text" wb-rotating-split-by="characters" wb-text-1="Animated" wb-text-2="Rotating" wb-text-3="Text">Animated</span></h1>',
      description: 'Auto-rotating text with stagger effects and customizable timing'
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
        description: 'Text to animate', 
        default: 'PRESSURE',
        inputType: 'text'
      },
      { 
        name: 'wb-font-family', 
        description: 'Font family used (optional - inherits from Webflow typography by default)', 
        default: 'inherit',
        inputType: 'text'
      },
      { 
        name: 'wb-width', 
        description: 'Enable width variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-weight', 
        description: 'Enable weight variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-italic', 
        description: 'Enable italic/slant variation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-alpha', 
        description: 'Enable opacity variation', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-always-active', 
        description: 'Keep effect always active (for previews)', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-min-font-size', 
        description: 'Minimum font size', 
        default: '24',
        inputType: 'slider',
        sliderConfig: { min: 12, max: 100, step: 2 }
      }
    ],
    example: {
      title: 'Text Pressure Effect',
      code: '<h1 wb-component="text-pressure" wb-always-active="true">Pressure Sensitive</h1>',
      description: 'Mouse proximity font variations with variable fonts'
    }
  },

  'text-cursor': {
    name: 'Text Cursor',
    description: 'Mouse-following text/emoji trail effects',
    category: 'text',
    file: 'textCursor.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable text cursor animation', 
        default: 'text-cursor',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-cursor-text', 
        description: 'Text to follow cursor', 
        default: '🎯',
        inputType: 'text'
      },
      { 
        name: 'wb-cursor-delay', 
        description: 'Animation delay in seconds', 
        default: '0.01',
        inputType: 'slider',
        sliderConfig: { min: 0.001, max: 0.1, step: 0.001 }
      },
      { 
        name: 'wb-cursor-spacing', 
        description: 'Distance between trail items in pixels', 
        default: '100',
        inputType: 'slider',
        sliderConfig: { min: 20, max: 300, step: 10 }
      },
      { 
        name: 'wb-cursor-follow-direction', 
        description: 'Rotate text to follow mouse direction', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-cursor-random-float', 
        description: 'Enable random floating animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-cursor-exit-duration', 
        description: 'Exit duration in seconds', 
        default: '0.5',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 3, step: 0.1 }
      },
      { 
        name: 'wb-cursor-removal-interval', 
        description: 'Interval for removing trail items in milliseconds', 
        default: '30',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 10 }
      },
      { 
        name: 'wb-cursor-max-points', 
        description: 'Maximum number of trail items', 
        default: '5',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 1 }
      },
      { 
        name: 'wb-cursor-font-size', 
        description: 'Font size', 
        default: '1.875rem',
        inputType: 'text'
      },
      { 
        name: 'wb-cursor-color', 
        description: 'Text color', 
        default: 'currentColor',
        inputType: 'color'
      }
    ],
    example: {
      title: 'Text Cursor Effect',
      code: '<div wb-component="text-cursor" wb-cursor-text="🎯" style="width: 800px; height: 400px; background: #1a1a1a; cursor: crosshair;">Move your mouse here for emoji trail!</div>',
      description: 'Mouse-following text/emoji trail effects'
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
        name: 'wb-threshold', 
        description: 'Scroll trigger threshold', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-root-margin', 
        description: 'Scroll trigger margin', 
        default: '"-100px"',
        inputType: 'text'
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
        name: 'wb-scramble-charset', 
        description: 'Characters to use for scrambling effect', 
        default: 'empty',
        inputType: 'text'
      },
      { 
        name: 'wb-color-from', 
        description: 'Starting color for color transition', 
        default: 'none',
        inputType: 'color'
      },
      { 
        name: 'wb-color-to', 
        description: 'Ending color for color transition', 
        default: 'none',
        inputType: 'color'
      },
      { 
        name: 'wb-trigger-once', 
        description: 'Trigger animation only once on scroll', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-respect-reduced-motion', 
        description: 'Respect reduced motion preference', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-trigger-on-hover', 
        description: 'Enable hover trigger after initial animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-text-align', 
        description: 'Text alignment for characters: left|center|right|justify', 
        default: 'center',
        inputType: 'dropdown',
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    example: {
      title: 'Shuffle Text Effect',
      code: '<h1 wb-component="shuffle" wb-shuffle-direction="right" wb-duration="0.35">SHUFFLE EFFECT</h1>',
      description: 'Character-based sliding shuffle effects with customizable direction'
    }
  },

  // Interactive Components
  'shape-blur': {
    name: 'Shape Blur',
    description: 'WebGL shader-based interactive shape effects',
    category: 'interactive',
    file: 'shapeBlur.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable shape blur animation', 
        default: 'shape-blur',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-shape-variation', 
        description: 'Shape type: 0=rounded rectangle, 1=filled circle, 2=circle stroke, 3=triangle', 
        default: '0',
        inputType: 'dropdown',
        options: ['0', '1', '2', '3']
      },
      { 
        name: 'wb-shape-size', 
        description: 'Shape size multiplier', 
        default: '1.2',
        inputType: 'slider',
        sliderConfig: { min: 0.5, max: 3, step: 0.1 }
      },
      { 
        name: 'wb-roundness', 
        description: 'Shape roundness', 
        default: '0.4',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-border-size', 
        description: 'Border size', 
        default: '0.05',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 0.5, step: 0.01 }
      },
      { 
        name: 'wb-circle-size', 
        description: 'Circle size', 
        default: '0.3',
        inputType: 'slider',
        sliderConfig: { min: 0.1, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-circle-edge', 
        description: 'Circle edge sharpness', 
        default: '0.5',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.1 }
      },
      { 
        name: 'wb-mouse-damp', 
        description: 'Mouse movement dampening', 
        default: '8',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 1 }
      },
      { 
        name: 'wb-pixel-ratio', 
        description: 'Render quality', 
        default: '2',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 4, step: 1 }
      }
    ],
    example: {
      title: 'Shape Blur Effect',
      code: '<div wb-animate="shape-blur" wb-shape-variation="0" wb-shape-size="1.2" wb-roundness="0.4" style="height: 400px; width: 1000px; background: #1a1a1a;"></div>',
      description: 'WebGL shader-based interactive shape effects'
    }
  },

  'image-trail': {
    name: 'Image Trail',
    description: 'Mouse-following image trail effects',
    category: 'interactive',
    file: 'imageTrail.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable image trail animation', 
        default: 'image-trail',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-varint', 
        description: 'Effect variant 1 - 8', 
        default: '1',
        inputType: 'dropdown',
        options: ['1', '2', '3', '4', '5', '6', '7', '8']
      },
      { 
        name: 'wb-threshold', 
        description: 'Mouse movement threshold to trigger images', 
        default: '80',
        inputType: 'slider',
        sliderConfig: { min: 10, max: 200, step: 10 }
      },
      { 
        name: 'wb-item-width', 
        description: 'Image width', 
        default: '190px',
        inputType: 'text'
      },
      { 
        name: 'wb-item-height', 
        description: 'Image height', 
        default: 'auto',
        inputType: 'text'
      },
      { 
        name: 'wb-border-radius', 
        description: 'Image border radius', 
        default: '15px',
        inputType: 'text'
      },
      { 
        name: 'wb-visible-images', 
        description: 'Maximum visible images for variant 7', 
        default: '9',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 1 }
      },
      { 
        name: 'wb-images', 
        description: 'Required JSON array of image URLs', 
        default: '',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Image Trail Effect',
      code: '<div wb-animate="image-trail" wb-varint="1" wb-threshold="80" wb-images=\'["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop","https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop","https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=400&fit=crop"]\' style="width: 800px; height: 400px; background: #1a1a1a; cursor: pointer;"></div>',
      description: 'Mouse-following image trail effects'
    }
  },

  'magnet-lines': {
    name: 'Magnet Lines',
    description: 'Interactive magnetic line grid',
    category: 'interactive',
    file: 'magnetLines.js',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable magnet lines animation', 
        default: 'magnet-lines',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-rows', 
        description: 'Number of rows in the grid', 
        default: '9',
        inputType: 'slider',
        sliderConfig: { min: 3, max: 20, step: 1 }
      },
      { 
        name: 'wb-columns', 
        description: 'Number of columns in the grid', 
        default: '9',
        inputType: 'slider',
        sliderConfig: { min: 3, max: 20, step: 1 }
      },
      { 
        name: 'wb-container-size', 
        description: 'Container size', 
        default: '80vmin',
        inputType: 'text'
      },
      { 
        name: 'wb-line-color', 
        description: 'Line color', 
        default: '#efefef',
        inputType: 'color'
      },
      { 
        name: 'wb-line-width', 
        description: 'Line width', 
        default: '1vmin',
        inputType: 'text'
      },
      { 
        name: 'wb-line-height', 
        description: 'Line height', 
        default: '6vmin',
        inputType: 'text'
      },
      { 
        name: 'wb-base-angle', 
        description: 'Base rotation angle in degrees', 
        default: '-10',
        inputType: 'slider',
        sliderConfig: { min: -45, max: 45, step: 5 }
      }
    ],
    example: {
      title: 'Magnet Lines Effect',
      code: '<div wb-animate="magnet-lines" wb-rows="9" wb-columns="9" style="width: 80vmin; height: 80vmin;">Magnetic Grid</div>',
      description: 'Interactive magnetic line grid'
    }
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
