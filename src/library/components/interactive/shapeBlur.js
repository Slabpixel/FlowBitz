import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { injectStyles } from '../../utils/core/injectStyles.js';
import { parseElementConfig, commonAttributeMaps, mergeAttributeMaps } from '../../utils/core/attributeParser.js';
import { checkCSSConflicts, componentClassSets } from '../../utils/core/conflictDetector.js';
import { AnimationStateManager } from '../../utils/animation/animationStateManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Three.js availability check
const isThreeAvailable = () => {
  return typeof window !== 'undefined' && window.THREE;
};

// Shader code
const vertexShader = /* glsl */ `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`;

const fragmentShader = /* glsl */ `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef VAR
#define VAR 0
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}
float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float strokeAA(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float size = u_shapeSize;
    float roundness = u_roundness;
    float borderSize = u_borderSize;
    float circleSize = u_circleSize;
    float circleEdge = u_circleEdge;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 color = vec3(1.0);
    float alpha = sdf;
    gl_FragColor = vec4(color.rgb, alpha);
}
`;

// Simple CSS
const componentCSS = `
/* FlowBitz - ShapeBlur Component Styles */
.wb-shape-blur {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.wb-shape-blur__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.wb-shape-blur__content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.wb-shape-blur--error {
  opacity: 0.7;
}

.wb-shape-blur__error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  z-index: 10;
  display: none;
}

.wb-shape-blur--show-error .wb-shape-blur__error-message {
  display: block;
}

.wb-shape-blur-animating {
  will-change: transform;
}

.wb-shape-blur-completed {
  will-change: auto;
}
`;

class ShapeBlurAnimator {
  constructor() {
    this.instances = new Map();
    this.stylesInjected = false;
    this.THREE = null;
    this.isSupported = false;
    
    // Default configuration
    this.defaultConfig = {
      variation: 0,
      shapeSize: 1.2,
      roundness: 0.4,
      borderSize: 0.05,
      circleSize: 0.3,
      circleEdge: 0.5,
      pixelRatio: 2,
      mouseDamp: 8,
      threshold: 0.1,
      rootMargin: '0px',
      trigger: 'scroll',
      start: 'top 80%',
      end: 'bottom 20%'
    };
    
    // Initialize Three.js if available
    this.initThreeJS();
    
    // Component configuration
    this.componentName = 'shapeBlur';
  }

  /**
   * Initialize Three.js if available
   */
  initThreeJS() {
    try {
      if (typeof window !== 'undefined' && window.THREE) {
        this.THREE = window.THREE;
        this.isSupported = true;
        console.log('WebflowBits ShapeBlur: Three.js detected');
      } else {
        this.isSupported = false;
        console.warn('WebflowBits ShapeBlur: Three.js not found. Please include Three.js to use this component.');
        console.info('Add this to your HTML head: <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>');
      }
    } catch (error) {
      console.warn('WebflowBits ShapeBlur: Failed to initialize Three.js', error);
      this.isSupported = false;
    }
  }

  /**
   * Check for CSS conflicts
   */
  checkForConflicts() {
    return checkCSSConflicts(componentClassSets.shapeBlur || []);
  }

  /**
   * Initialize all shape blur elements
   */
  initAll() {
    if (!this.stylesInjected) {
      injectStyles(componentCSS, 'wb-shape-blur-styles');
      this.stylesInjected = true;
    }

    // Find all elements with wb-animate="shape-blur"
    const elements = document.querySelectorAll('[wb-animate="shape-blur"]');
    console.log(`WebflowBits ShapeBlur: Found ${elements.length} elements`);
    elements.forEach(element => this.initElement(element));
  }

  /**
   * Initialize single element
   */
  initElement(element) {
    if (!element || this.instances.has(element)) return;

    console.log('WebflowBits ShapeBlur: Initializing element', element);

    // Check Three.js availability
    if (!this.isSupported) {
      this.showError(element, 'Three.js required');
      return;
    }

    try {
      const config = this.parseConfig(element);
      console.log('ShapeBlur config:', config);
      
      const instance = this.createShapeBlurInstance(element, config);
      
      if (instance) {
        this.instances.set(element, instance);
        
        // Set animating state
        AnimationStateManager.setAnimatingState(element, 'wb-shape-blur');
        
        console.log('WebflowBits ShapeBlur: Element initialized successfully');
      } else {
        console.error('WebflowBits ShapeBlur: Failed to create instance');
      }
    } catch (error) {
      console.error('WebflowBits ShapeBlur: Failed to initialize element', error);
      this.showError(element, 'Initialization failed: ' + error.message);
    }
  }

  /**
   * Show error message for unsupported scenarios
   */
  showError(element, message) {
    element.classList.add('wb-shape-blur', 'wb-shape-blur--error');
    
    // Add error message element
    const errorEl = document.createElement('div');
    errorEl.className = 'wb-shape-blur__error-message';
    errorEl.textContent = message;
    element.appendChild(errorEl);
    
    // Show error in debug mode
    const showErrors = element.getAttribute('wb-debug') === 'true';
    if (showErrors) {
      element.classList.add('wb-shape-blur--show-error');
    }
  }

  /**
   * Parse element configuration
   */
  parseConfig(element) {
    const attributeMap = mergeAttributeMaps(commonAttributeMaps.animation, {
      variation: { 
        attribute: 'wb-shape-variation', 
        type: 'number',
        min: 0,
        max: 3
      },
      shapeSize: { 
        attribute: 'wb-shape-size', 
        type: 'number',
        min: 0.1,
        max: 3.0
      },
      roundness: { 
        attribute: 'wb-roundness', 
        type: 'number',
        min: 0,
        max: 1
      },
      borderSize: { 
        attribute: 'wb-border-size', 
        type: 'number',
        min: 0.01,
        max: 0.5
      },
      circleSize: { 
        attribute: 'wb-circle-size', 
        type: 'number',
        min: 0.1,
        max: 1.0
      },
      circleEdge: { 
        attribute: 'wb-circle-edge', 
        type: 'number',
        min: 0,
        max: 1
      },
      pixelRatio: { 
        attribute: 'wb-pixel-ratio', 
        type: 'number',
        min: 1,
        max: 3
      },
      mouseDamp: { 
        attribute: 'wb-mouse-damp', 
        type: 'number',
        min: 1,
        max: 50
      }
    });

    return parseElementConfig(element, this.defaultConfig, attributeMap);
  }

  /**
   * Create shape blur instance
   */
  createShapeBlurInstance(element, config) {
    if (!this.THREE) return null;

    console.log('Creating ShapeBlur instance for element with dimensions:', element.offsetWidth, 'x', element.offsetHeight);

    // Add main class
    element.classList.add('wb-shape-blur');

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'wb-shape-blur__canvas';
    
    // Wrap existing content
    const content = Array.from(element.children);
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'wb-shape-blur__content';
    
    // Move existing children to content wrapper
    content.forEach(child => {
      if (!child.classList.contains('wb-shape-blur__canvas')) {
        contentWrapper.appendChild(child);
      }
    });
    
    // Add canvas and content wrapper
    element.appendChild(canvas);
    element.appendChild(contentWrapper);

    // Three.js setup
    const vMouse = new this.THREE.Vector2();
    const vMouseDamp = new this.THREE.Vector2();
    const vResolution = new this.THREE.Vector2();
    
    let w = 1, h = 1;
    let time = 0, lastTime = 0;
    let animationFrameId;

    const scene = new this.THREE.Scene();
    const camera = new this.THREE.OrthographicCamera();
    camera.position.z = 1;

    const renderer = new this.THREE.WebGLRenderer({ 
      canvas, 
      alpha: true 
    });
    renderer.setClearColor(0x000000, 0);

    // Create geometry and material
    const geo = new this.THREE.PlaneGeometry(1, 1);
    const material = new this.THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: config.pixelRatio },
        u_shapeSize: { value: config.shapeSize },
        u_roundness: { value: config.roundness },
        u_borderSize: { value: config.borderSize },
        u_circleSize: { value: config.circleSize },
        u_circleEdge: { value: config.circleEdge }
      },
      defines: { VAR: config.variation },
      transparent: true
    });

    const quad = new this.THREE.Mesh(geo, material);
    scene.add(quad);

    // Mouse event handlers
    const onPointerMove = (e) => {
      const rect = element.getBoundingClientRect();
      vMouse.set(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Resize handler
    const resize = () => {
      w = element.clientWidth;
      h = element.clientHeight;
      
      console.log('ShapeBlur resize:', w, 'x', h);
      
      const dpr = Math.min(window.devicePixelRatio, config.pixelRatio);

      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);

      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();

      quad.scale.set(w, h, 1);
      vResolution.set(w, h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    };

    // Animation loop
    const update = () => {
      time = performance.now() * 0.001;
      const dt = time - lastTime;
      lastTime = time;

      // Mouse damping
      ['x', 'y'].forEach(k => {
        vMouseDamp[k] = this.THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], config.mouseDamp, dt);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(update);
    };

    // ResizeObserver for responsive behavior
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(element);

    // Event listeners
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', resize);

    // Initial setup
    resize();
    update(); // Start immediately

    console.log('ShapeBlur instance created and animation started');

    // Return instance object
    return {
      element,
      canvas,
      scene,
      camera,
      renderer,
      material,
      quad,
      config,
      vMouse,
      vMouseDamp,
      vResolution,
      animationFrameId,
      resizeObserver,
      onPointerMove,
      resize,
      update,
      destroy: () => {
        // Cancel animation
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        // Remove event listeners
        document.removeEventListener('mousemove', onPointerMove);
        document.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', resize);
        
        // Disconnect resize observer
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        
        // Dispose Three.js resources
        renderer.dispose();
        geo.dispose();
        material.dispose();
        
        // Remove canvas
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        
        // Remove classes
        element.classList.remove('wb-shape-blur-animating', 'wb-shape-blur');
        element.classList.add('wb-shape-blur-completed');
      }
    };
  }

  /**
   * Destroy all instances
   */
  destroyAll() {
    this.instances.forEach((instance, element) => {
      this.destroyInstance(element);
    });
    this.instances.clear();
  }

  /**
   * Destroy single instance
   */
  destroyInstance(element) {
    const instance = this.instances.get(element);
    if (instance) {
      // Set completed state before destroy
      AnimationStateManager.setCompletedState(element, 'wb-shape-blur');
      
      instance.destroy();
      this.instances.delete(element);
    }
  }

  /**
   * Refresh all instances
   */
  refresh() {
    // Re-initialize if Three.js becomes available
    if (!this.isSupported) {
      this.initThreeJS();
    }
    
    this.instances.forEach((instance, element) => {
      if (instance.resize) {
        instance.resize();
      }
    });
  }

  /**
   * Update configuration for an instance
   */
  updateConfig(element, newConfig) {
    const instance = this.instances.get(element);
    if (!instance || !instance.material) return;

    // Update uniforms
    if (newConfig.shapeSize !== undefined) {
      instance.material.uniforms.u_shapeSize.value = newConfig.shapeSize;
    }
    if (newConfig.roundness !== undefined) {
      instance.material.uniforms.u_roundness.value = newConfig.roundness;
    }
    if (newConfig.borderSize !== undefined) {
      instance.material.uniforms.u_borderSize.value = newConfig.borderSize;
    }
    if (newConfig.circleSize !== undefined) {
      instance.material.uniforms.u_circleSize.value = newConfig.circleSize;
    }
    if (newConfig.circleEdge !== undefined) {
      instance.material.uniforms.u_circleEdge.value = newConfig.circleEdge;
    }
    if (newConfig.variation !== undefined) {
      instance.material.defines.VAR = newConfig.variation;
      instance.material.needsUpdate = true;
    }
    
    // Update instance config
    Object.assign(instance.config, newConfig);
  }
}

// Create and export singleton instance
const shapeBlurAnimator = new ShapeBlurAnimator();
export default shapeBlurAnimator;
