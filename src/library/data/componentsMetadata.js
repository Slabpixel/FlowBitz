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
 * <script src="https://www.flowbitz.dev/latest/flowbitz.umd.js"></script>
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
    installationNotes: 'Works with any text element like <h1>, <h2>, <p>, <span>, <div>, etc. The component automatically splits the text content and wraps each part in spans for animation.',
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
        name: 'wb-trigger-on-view', 
        description: 'Enable ScrollTrigger for view-based animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-root-margin', 
        description: 'Root margin for scroll trigger. Controls when animation starts. Positive values (e.g., "100px") trigger before element enters viewport. Negative values (e.g., "-100px") trigger after entering. Supports all CSS units: px, %, vh, vw, em, rem. Examples: "100px" (early trigger), "0px" (default), "-50px" (late trigger), "10vh" (viewport-based), "5%" (percentage)', 
        default: '100px',
        inputType: 'text'
      },
      { 
        name: 'wb-start-delay', 
        description: 'Start delay in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      }
    ],
    example: {
      title: 'Split Text Animation',
      code: '<h1 wb-component="split-text" wb-split-type="words" class="lg:text-6xl text-3xl">Create Amazing Websites with Powerful Animations</h1>',
      description: 'Each word animates separately with customizable split type and timing'
    }
  },

  'gradient-text': {
    name: 'Gradient Text',
    description: 'Animated gradient text with customizable colors',
    category: 'text',
    file: 'gradientText.js',
    installationNotes: 'Perfect for headings like <h1>, <h2>, <h3> or any text element. The gradient animation works best with larger text sizes for better visual impact.',
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
        description: 'Gradient colors (comma-separated or JSON array). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color)). Example: "#FF5733, rgb(64, 255, 170), var(--primary)"', 
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
      code: '<h1 wb-component="gradient-text" class="lg:text-6xl text-3xl">Gradient Text</h1>',
      description: 'Animated gradient text with customizable colors and effects'
    }
  },

  'text-type': {
    name: 'Text Type',
    description: 'Typewriter effect with customizable cursor',
    category: 'text',
    file: 'textType.js',
    installationNotes: 'Use with <span> elements inside headings or paragraphs. The component replaces the text content with a typewriter animation. Works best with monospace fonts.',
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
      code: '<h1 class="lg:text-6xl text-3xl">Learn more about <span wb-component="text-type" wb-text-1="Coding" wb-text-2="Webflow" wb-text-3="Animation" class="lg:text-6xl text-3xl">Coding</span></h1>',
      description: 'Typewriter effect with customizable cursor and timing'
    }
  },

  'blur-text': {
    name: 'Blur Text',
    description: 'Blur-to-clear transition effects',
    category: 'text',
    file: 'blurText.js',
    installationNotes: 'Works with any text element like <h1>, <h2>, <p>, <span>. The blur effect is applied on scroll or hover, revealing text from blur to clear.',
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
      },
      { 
        name: 'wb-trigger-on-view', 
        description: 'Enable ScrollTrigger for view-based animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-root-margin', 
        description: 'Root margin for scroll trigger. Controls when animation starts. Positive values (e.g., "100px") trigger before element enters viewport. Negative values (e.g., "-100px") trigger after entering. Supports all CSS units: px, %, vh, vw, em, rem. Examples: "100px" (early trigger), "0px" (default), "-50px" (late trigger), "10vh" (viewport-based), "5%" (percentage)', 
        default: '100px',
        inputType: 'text'
      },
      { 
        name: 'wb-start-delay', 
        description: 'Start delay in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      }
    ],
    example: {
      title: 'Blur Text Animation',
      code: '<h1 wb-component="blur-text" class="lg:text-6xl text-3xl">Blur to Clear</h1>',
      description: 'Blur-to-clear transition effects with customizable timing'
    }
  },

  'shiny-text': {
    name: 'Shiny Text',
    description: 'Shimmer and shine text effects',
    category: 'text',
    file: 'shinyText.js',
    installationNotes: 'Best used with larger headings like <h1>, <h2> or prominent text elements. The shine effect creates a moving gradient overlay across the text.',
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
        description: 'Base text color (inherits from Webflow element if not specified). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '#0a70ff',
        inputType: 'color',
        supportsAlpha: true
      },
      { 
        name: 'wb-shine-color', 
        description: 'Shine color. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '#8cbcff',
        inputType: 'color',
        supportsAlpha: true
      }
    ],
    example: {
      title: 'Shiny Text Effect',
      code: '<h1 class="lg:text-6xl text-3xl" wb-component="shiny-text" wb-text-color="#0a70ff" wb-shine-color="#8cbcff" style="line-height: 1.2;">Shiny Text</h1>',
      description: 'Shimmer and shine text effects with customizable speed'
    }
  },

  'count-up': {
    name: 'Count Up',
    description: 'Animated number counting',
    category: 'text',
    file: 'countUp.js',
    installationNotes: 'Perfect for statistics, numbers, or counters. Use with <span>, <div>, or any element containing numeric values. The component animates from a starting number to a target value.',
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
      },
      { 
        name: 'wb-trigger-on-view', 
        description: 'Enable ScrollTrigger for view-based animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-root-margin', 
        description: 'Root margin for scroll trigger. Controls when animation starts. Positive values (e.g., "100px") trigger before element enters viewport. Negative values (e.g., "-100px") trigger after entering. Supports all CSS units: px, %, vh, vw, em, rem. Examples: "100px" (early trigger), "0px" (default), "-50px" (late trigger), "10vh" (viewport-based), "5%" (percentage)', 
        default: '100px',
        inputType: 'text'
      },
      { 
        name: 'wb-start-delay', 
        description: 'Start delay in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      }
    ],
    example: {
      title: 'Count Up Animation',
      code: '<h1 wb-component="count-up" wb-count-to="1250" wb-count-separator="," class="lg:text-6xl text-4xl">0</h1>',
      description: 'Animated number counting with customizable formatting'
    }
  },

  'decrypted-text': {
    name: 'Decrypted Text',
    description: 'Matrix-style decryption effects',
    category: 'text',
    file: 'decryptedText.js',
    installationNotes: 'Great for dramatic reveals and tech-themed content. Works with any text element like <h1>, <h2>, <p>, <span>. The component scrambles characters before revealing the final text.',
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
        name: 'wb-trigger-on-view', 
        description: 'Enable ScrollTrigger for view-based animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-root-margin', 
        description: 'Root margin for scroll trigger. Controls when animation starts. Positive values (e.g., "100px") trigger before element enters viewport. Negative values (e.g., "-100px") trigger after entering. Supports all CSS units: px, %, vh, vw, em, rem. Examples: "100px" (early trigger), "0px" (default), "-50px" (late trigger), "10vh" (viewport-based), "5%" (percentage)', 
        default: '100px',
        inputType: 'text'
      },
      { 
        name: 'wb-start-delay', 
        description: 'Start delay in seconds', 
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      }
    ],
    example: {
      title: 'Decrypted Text Effect',
      code: '<h1 wb-component="decrypted-text" wb-use-original-chars="true" class="lg:text-6xl text-3xl">SECRET MESSAGE</h1>',
      description: 'Matrix-style decryption effects with customizable characters'
    }
  },

  'scramble-text': {
    name: 'Scramble Text',
    description: 'Interactive character scrambling',
    category: 'text',
    file: 'scrambleText.js',
    installationNotes: 'Interactive hover effect that scrambles text on mouse proximity. Works with any text element like <p>, <span>, <div>. Best with monospace fonts for consistent character spacing.',
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
      code: '<p wb-component="scramble-text" wb-font="monospace" class="lg:text-2xl text-md max-w-[570px]">Once you hover over me, you will see the effect in action! You can customize the radius, duration, and speed of the scramble effect.</p>',
      description: 'Interactive character scrambling with customizable radius, duration, and speed'
    }
  },

  'variable-proximity': {
    name: 'Variable Proximity',
    description: 'Mouse proximity font variations',
    category: 'text',
    file: 'variableProximity.js',
    installationNotes: 'Requires variable fonts that support weight variations. Works with any text element like <h1>, <h2>, <p>, <span>. The font weight changes based on mouse proximity.',
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
      code: '<h1 wb-component="variable-proximity" class="lg:text-4xl text-xl max-w-[570px]">Please hover over me to see the amazing variable font effects!</h1>',
      description: 'Mouse proximity font variations with customizable weight and size sliders'
    }
  },

  'rotating-text': {
    name: 'Rotating Text',
    description: 'Auto-rotating text with stagger effects',
    category: 'text',
    file: 'rotatingText.js',
    installationNotes: 'Use with <span> elements inside headings or paragraphs. The component cycles through different text options with smooth transitions. Great for highlighting multiple features or benefits.',
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
        description: 'Background color for the text container. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '',
        inputType: 'color',
        supportsAlpha: true
      },
      { 
        name: 'wb-text-color', 
        description: 'Text color for the rotating text. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '',
        inputType: 'color',
        supportsAlpha: true
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
      code: '<h1 class="lg:text-6xl text-3xl">Powerful <span wb-component="rotating-text" wb-text-1="Animations" wb-text-2="Effects" wb-text-3="Interactions" wb-background-color="#0a70ff" wb-text-color="#ffffff" wb-border-radius="8px" class="lg:text-6xl text-3xl">Animations</span></h1>',
      description: 'Auto-rotating text with stagger effects, background color, text color, border radius, and automatic centering'
    }
  },

  'text-pressure': {
    name: 'Text Pressure',
    description: 'Mouse proximity font variations with variable fonts',
    category: 'text',
    file: 'textPressure.js',
    installationNotes: 'Requires variable fonts (like Compressa VF, Recursive, Roboto Flex). Works with any text element. The component dynamically changes font weight, width, and italic based on mouse proximity.',
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
      },
      { 
        name: 'wb-text-color', 
        description: 'Text color (optional, uses currentColor by default for theme compatibility). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: 'currentColor',
        inputType: 'color',
        supportsAlpha: true
      },
      { 
        name: 'wb-stroke-color', 
        description: 'Stroke color for text outline (optional). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '',
        inputType: 'color',
        supportsAlpha: true
      }
    ],
    example: {
      title: 'Text Pressure Effect',
      code: '<h1 wb-component="text-pressure" wb-font-family="Compressa VF" class="lg:text-[160px] text-[80px] lg:w-[570px] w-[300px]">PRESSURE!</h1>',
      description: 'Mouse proximity font variations with Compressa VF variable font'
    }
  },

  'shuffle': {
    name: 'Shuffle',
    description: 'Character-based sliding shuffle effects with customizable direction and scrambling',
    category: 'text',
    file: 'shuffle.js',
    installationNotes: 'Works with any text element like <h1>, <h2>, <p>, <span>. The component creates sliding shuffle effects with characters moving in different directions. Best with monospace fonts.',
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
        name: 'wb-color-from', 
        description: 'Starting color for animation (optional). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '',
        inputType: 'color',
        supportsAlpha: true
      },
      { 
        name: 'wb-color-to', 
        description: 'Ending color for animation (optional). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '',
        inputType: 'color',
        supportsAlpha: true
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
      code: '<h1 wb-component="shuffle" class="lg:text-6xl text-3xl">Create Amazing Websites With Powerful Animations</h1>',
      description: 'Character-based sliding shuffle effects with customizable direction'
    }
  },

  'tooltip-text': {
    newComponent: true,
    name: 'Tooltip Text',
    description: 'Hover tooltips for any text element with customizable positioning and styling',
    category: 'text',
    file: 'tooltipText.js',
    installationNotes: 'Use with any text element like <span>, <a>, <strong>, <em>. The component adds a hover tooltip with customizable content, position, and styling.',
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
        description: 'Tooltip background color. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '#000000',
        inputType: 'color',
        supportsAlpha: true
      },
      { 
        name: 'wb-tooltip-color', 
        description: 'Tooltip text color. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: '#ffffff',
        inputType: 'color',
        supportsAlpha: true
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
      code: '<p class="lg:text-lg text-md font-normal">The example of the <span wb-component="tooltip-text" wb-tooltip-text="This is a helpful tooltip!" class="text-primary text-lg">Tooltip</span> Text component.</p>',
      description: 'Hover tooltips for any text element with customizable positioning and styling'
    }
  },

  'roll-text': {
    newComponent: true,
    name: 'Roll Text',
    description: 'Vertical rolling text effect on hover by duplicating content and translating the container upward.',
    category: 'text',
    file: 'rollText.js',
    installationNotes: 'Wrap your text with a <div wb-component="roll-text"> wrapper. The first child inside the wrapper must be one of: <div>, <p>, <a>, <span>, <h1>, <h2>, <h3>, <h4>, <h5> or <h6> containing the text. The wrapper becomes an inline-block overflow-hidden mask; on hover, the original line rolls up and the duplicate line replaces it.',
    attributes: [
      {
        name: 'wb-component',
        description: 'Enable the Roll Text effect',
        default: 'roll-text',
        inputType: 'text',
        required: true
      },
      {
        name: 'wb-split-by',
        description: 'Split strategy for GSAP SplitText',
        default: 'words',
        inputType: 'dropdown',
        options: ['words', 'chars']
      },
      {
        name: 'wb-duration',
        description: 'Hover in/out animation duration in seconds',
        default: '0.5',
        inputType: 'slider',
        sliderConfig: { min: 0.05, max: 2, step: 0.05 }
      },
      {
        name: 'wb-ease',
        description: 'GSAP easing for the vertical translation',
        default: 'power3.out',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      },
      {
        name: 'wb-stagger',
        description: 'Required when using wb-split-by="chars" or wb-split-by="words", ensure the text contains at least two characters/words to display the staggered roll animation as intended.',
        default: '0.05',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 0.1, step: 0.01 }
      }
    ],
    example: {
      title: 'Roll Text Hover',
      code: '<div wb-component="roll-text" class="inline-block">\\n  <span>Hover me to roll</span>\\n</div>',
      description: 'The content is duplicated and vertically rolled on hover; the duplicate line replaces the original.'
    }
  },

  'gradient-button': {
    name: 'Gradient Button',
    description: 'Animated gradient button with customizable colors',
    category: 'button',
    file: 'gradientButton.js',
    installationNotes: 'Use with <button>, <a>, or any clickable element. The component adds animated gradient background with customizable colors and hover effects.',
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
        description: 'Gradient colors (comma-separated or JSON array). Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color)). Example: "#FF5733, rgb(64, 255, 170), var(--primary)"', 
        default: '#40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa',
        inputType: 'text'
      },
      { 
        name: 'wb-text-color', 
        description: 'Text color for the button. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: 'white',
        inputType: 'color',
        supportsAlpha: true
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
      code: '<button wb-component="gradient-button" class="text-md px-6 py-3 rounded-md font-semibold">Gradient Button</button>',
      description: 'Animated gradient button with customizable colors and hover effects'
    }
  },

  'ripple-button': {
    name: 'Ripple Button',
    description: 'Button with Material Design ripple effect and scale animation on click',
    category: 'button',
    file: 'rippleButton.js',
    installationNotes: 'Perfect for <button>, <a>, or any clickable element. Creates a Material Design ripple effect that spreads from the click point with customizable colors and duration.',
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
        description: 'Ripple effect color. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: 'rgba(255, 255, 255, 0.6)',
        inputType: 'color',
        supportsAlpha: true
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
      code: '<a href="#" wb-component="ripple-button" class="text-md px-6 py-3 rounded-md font-semibold bg-primary text-white">Click me to see the effect!</a>',
      description: 'Button with Material Design ripple effect and scale animation that spreads from click point'
    }
  },

  'pulse-button': {
    name: 'Pulse Button',
    description: 'Button or link with gentle pulsing animation to draw attention. Works with both <button> and <a> elements.',
    category: 'button',
    file: 'pulseButton.js',
    installationNotes: 'Use with <button>, <a>, or any element you want to draw attention to. Creates a gentle pulsing animation that can pause on hover. Great for call-to-action buttons.',
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
      code: '<a href="#" wb-component="pulse-button" class="text-md px-6 py-3 rounded-md font-semibold bg-primary text-white">Pulse Button</a>',
      description: 'Button or link with gentle pulsing animation to draw attention to important actions'
    }
  },

  'magnetic-button': {
    name: 'Magnetic Button',
    description: 'Button with magnetic attraction effect that follows mouse movement',
    category: 'button',
    file: 'magnet.js',
    installationNotes: 'Use with <button>, <a>, or any interactive element. Creates a magnetic effect where the element follows mouse movement within a specified radius. Great for interactive buttons and links.',
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
      code: '<a src="#" wb-component="magnetic-button" class="text-md bg-primary text-white rounded-md px-6 py-3 hover:bg-primary-dark transition-colors hover:cursor-pointer">Hover me!</a>',
      description: 'Button that follows mouse movement with magnetic attraction - the entire button (background, text, and all styling) moves together'
    }
  },

  'shimmer-button': {
    newComponent: true,
    name: 'Shimmer Button',
    description: 'Button with shimmer effect on hover with customizable direction and color. Button color is inherited from Webflow CSS settings.',
    category: 'button',
    file: 'shimmerButton.js',
    installationNotes: 'Use with <button>, <a>, or any clickable element. The component adds a shimmer effect on hover that moves across the button. Button background and text colors are inherited from your Webflow CSS settings.',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable shimmer button animation', 
        default: 'shimmer-button',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-shimmer-color', 
        description: 'Shimmer effect color. Supports: hex (#FF5733), rgb/rgba, hsl/hsla, named colors (red, blue), CSS variables (var(--color))', 
        default: 'rgba(255, 255, 255, 0.2)',
        inputType: 'color',
        supportsAlpha: true
      },
      {
        name: 'wb-shimmer-direction',
        description: 'Direction of shimmer effect: "left", "right", "top", or "bottom"',
        default: 'left',
        inputType: 'dropdown',
        options: ['left', 'right', 'top', 'bottom']
      },
      {
        name: 'wb-shimmer-speed',
        description: 'Speed of shimmer animation: "slow" (1.2s), "medium" (0.7s), or "fast" (0.4s)',
        default: 'medium',
        inputType: 'dropdown',
        options: ['slow', 'medium', 'fast']
      },
      {
        name: 'wb-shadow',
        description: 'Enable shadow effect on hover (shadow color is based on button color)',
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
      title: 'Shimmer Button Animation',
      code: '<button wb-component="shimmer-button" class="text-md px-6 py-3 rounded-md font-semibold bg-primary text-white">Shimmer Button</button>',
      description: 'Button with shimmer effect on hover. Button color is inherited from Webflow CSS settings.'
    }
  },

  // Effect Components
  'smart-animate': {
    name: 'Smart Animate',
    description: 'Animates the selected element and its direct children with smooth staggered transitions',
    category: 'effect',
    file: 'smartAnimate.js',
    installationNotes: 'Use with any container element like <div>, <section>, <article>. The component animates the selected element first, then animates all direct children with customizable stagger timing. Perfect for revealing content sections.',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable smart animate effect', 
        default: 'smart-animate',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-direction', 
        description: 'Animation direction: "bottom", "top", "left", "right"', 
        default: 'bottom',
        inputType: 'dropdown',
        options: ['bottom', 'top', 'left', 'right']
      },
      { 
        name: 'wb-interval-delay', 
        description: 'Delay between each child animation in seconds', 
        default: '0.1',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 1, step: 0.05 }
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
        default: 'power3.out',
        inputType: 'dropdown',
        options: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'back.out(1.7)', 'elastic.out(1, 0.3)']
      },
      { 
        name: 'wb-trigger-on-view', 
        description: 'Enable ScrollTrigger for view-based animation', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-root-margin', 
        description: 'Root margin for scroll trigger. Controls when animation starts. Positive values (e.g., "100px") trigger before element enters viewport. Negative values (e.g., "-100px") trigger after entering. Supports all CSS units: px, %, vh, vw, em, rem. Examples: "100px" (early trigger), "0px" (default), "-50px" (late trigger), "10vh" (viewport-based), "5%" (percentage)', 
        default: '100px',
        inputType: 'text'
      },
      {
        name: 'wb-start-delay',
        description: 'Delay before animation starts in seconds',
        default: '0',
        inputType: 'slider',
        sliderConfig: { min: 0, max: 2, step: 0.1 }
      }
    ],
    example: {
      title: 'Smart Animate Effect',
      code: '<div wb-component="smart-animate" class="max-w-md mx-auto bg-card rounded-xl shadow-lg p-6 border border-border"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><h3 class="text-xl font-semibold">Lightning Fast</h3></div><p class="mb-6 text-left">Experience blazing fast performance with our optimized components. Built for speed and efficiency.</p><button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">Get Started</button></div>',
      description: 'Animates the container and all direct children with smooth staggered transitions from bottom to top'
    }
  },

  '3d-card-hover': {
    newComponent: true,
    name: '3D Card Hover',
    description: '3D tilt on hover effect with configurable perspective and rotation sensitivity',
    category: 'effect',
    file: '3dCardHover.js',
    installationNotes: 'Only suppoerted for <div> or <button> HTML elements.',
    attributes: [
      { name: 'wb-component', description: 'Enable 3D Card Hover', default: '3d-card-hover', inputType: 'text', required: true },
      { name: 'wb-perspective', description: 'Perspective value (px)', default: '800', inputType: 'slider', sliderConfig: { min: 100, max: 2000, step: 50 } },
      { name: 'wb-rotate-divisor', description: 'Rotation divisor factor (smaller = more sensitive)', default: '15', inputType: 'slider', sliderConfig: { min: 5, max: 50, step: 5 } },
      { name: 'wb-transition', description: 'Transition CSS for transform', default: 'transform 200ms linear', inputType: 'text' }
    ],
    example: {
      title: '3D Card Hover',
      code: `
        <div id="card-hover-3d" wb-component="3d-card-hover" class="w-[280px] rounded-xl bg-card border border-border flex flex-col items-start p-6 justify-start gap-4">
          <p>Hover me</p>
          <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Placeholder" class="w-full h-[200px]">
        </div>`,
      description: 'Card smoothly follows cursor position.'
    }
  },

  'outline-gradient': {
    newComponent: true,
    name: 'Outline Gradient',
    description: 'Animated rotating gradient border effect using pure CSS',
    category: 'effect',
    file: 'outlineGradientAnimate.js',
    installationNotes: 'Works with any block-level element like <div>, <button>, etc. The component creates an animated gradient border that rotates smoothly using CSS @property. Make sure to apply position: relative or position: absolute to the element.',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable outline gradient animation', 
        default: 'outline-gradient',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-speed', 
        description: 'Animation speed in seconds (default: 8s)', 
        default: '8',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 20, step: 0.5 }
      },
      { 
        name: 'wb-hover-accelerate', 
        description: 'Enable speed boost on hover', 
        default: 'true',
        inputType: 'toggle'
      },
      { 
        name: 'wb-hover-speed-percentage', 
        description: 'Hover speed as percentage of original (20% = 80% faster)', 
        default: '20',
        inputType: 'slider',
        sliderConfig: { min: 5, max: 50, step: 5 }
      },
      { 
        name: 'wb-colors', 
        description: 'Gradient colors with stops. Supports multiple formats: "red, blue, green" or "#833AB4 0%, #FD1D1D 50%, #FCB045 100%". Colors will be evenly distributed if no percentages provided.', 
        default: '#833AB4 0%, #FD1D1D 50%, #FCB045 100%',
        inputType: 'text'
      },
      { 
        name: 'wb-border-width', 
        description: 'Border thickness in pixels', 
        default: '4',
        inputType: 'slider',
        sliderConfig: { min: 1, max: 10, step: 1 }
      },
      { 
        name: 'wb-paused', 
        description: 'Start animation in paused state', 
        default: 'false',
        inputType: 'toggle'
      },
      { 
        name: 'wb-disabled', 
        description: 'Disable animation completely', 
        default: 'false',
        inputType: 'toggle'
      }
    ],
    example: {
      title: 'Outline Gradient',
      code: `<div 
    wb-component="outline-gradient" 
    class="rounded-3xl flex items-center justify-center relative"
    style="width: 200px; height: 200px;"
  >
    <h2 class="text-3xl font-bold">Gradient Border</h2>
  </div>`,
      description: 'Smooth rotating gradient border that accelerates on hover. Works perfectly with rounded corners.'
    }
  },

  'image-trail': {
    newComponent: true,
    name: 'Image Trail',
    description: 'Animated image trail effect following mouse movement with 8 different animation variants',
    category: 'effect',
    file: 'imageTrail.js',
    installationNotes: 'Works with any container element. Provide image URLs via wb-image-1, wb-image-2, wb-image-3, etc. (similar to text-type). Choose from 8 stunning animation variants. Requires GSAP for animations. Perfect for creative portfolios and interactive showcases.',
    attributes: [
      { 
        name: 'wb-component', 
        description: 'Enable image trail effect', 
        default: 'image-trail',
        inputType: 'text',
        required: true
      },
      { 
        name: 'wb-image-1', 
        description: 'First image URL', 
        default: '',
        inputType: 'text',
      },
      { 
        name: 'wb-image-2', 
        description: 'Second image URL', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-image-3', 
        description: 'Third image URL', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-image-4', 
        description: 'Fourth image URL (add more with wb-image-5, wb-image-6, etc.)', 
        default: '',
        inputType: 'text'
      },
      { 
        name: 'wb-variant', 
        description: 'Animation variant (1-8): 1=Basic fade, 2=Scale+brightness, 3=Scatter upward, 4=Direction-based, 5=Rotation, 6=Speed effects, 7=Multiple visible, 8=3D perspective', 
        default: '1',
        inputType: 'dropdown',
        options: ['1', '2', '3', '4', '5', '6', '7', '8']
      },
      { 
        name: 'wb-threshold', 
        description: 'Distance threshold in pixels before showing new image', 
        default: '80',
        inputType: 'slider',
        sliderConfig: { min: 20, max: 200, step: 10 }
      },
      { 
        name: 'wb-image-width', 
        description: 'Width of trail images (e.g., "190px", "10rem")', 
        default: '190px',
        inputType: 'text'
      },
      { 
        name: 'wb-image-height', 
        description: 'Height of trail images (use "auto" for aspect ratio)', 
        default: 'auto',
        inputType: 'text'
      }
    ],
    example: {
      title: 'Image Trail Effect - Variant 1',
      code: `<div 
  wb-component="image-trail" 
  wb-image-1="https://cdn.prod.website-files.com/65f957334240a5c2923ed99e/689db4e993707000bc39177f_Foto%20wesite%20ase.webp"
  wb-image-2="https://cdn.prod.website-files.com/65f957334240a5c2923ed99e/6698147926931635bf00f3e9_Sheii%20profile.webp"
  wb-image-3="https://cdn.prod.website-files.com/65f957334240a5c2923ed99e/689db4b2b5fc2fa4bbea8f15_Foto%20wesite%20rukul.webp"
  wb-image-4="https://cdn.prod.website-files.com/65f957334240a5c2923ed99e/669813c821d769664d0816ff_Muadz%20profile.webp"
  class="w-[800px] h-[400px] flex items-center justify-center"
>
  <h2 class="text-2xl font-bold text-center pointer-events-none">
    Move Your Mouse Here
  </h2>
</div>`,
      description: 'Images follow cursor with smooth animations. Add more images with wb-image-4, wb-image-5, etc. Try different variants (1-8) for unique effects.'
    }
  },
}

Object.values(componentsMetadata).forEach((component) => {
  if (typeof component.newComponent !== 'boolean') {
    component.newComponent = false;
  }
});

/**
 * Get all components grouped by category
 */
export const getComponentsByCategory = () => {
  const categories = {
    text: [],
    button: [],
    effect: []
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
  const disabledComponents = ['shape-blur', 'magnet-lines', 'text-cursor']
  
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
      script: '<script src="https://www.flowbitz.dev/latest/flowbitz.umd.js"></script>',
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
