import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/library/loader.js'),
      name: 'FlowBitz',
      fileName: (format) => `flowbitz.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    emptyOutDir: false, // Don't empty since we also have the React app
    sourcemap: true,
    rollupOptions: {
      // Externalize GSAP - we load it dynamically now
      external: (id) => {
        return id === 'gsap' || id.startsWith('gsap/');
      },
      output: [
        // ES Module build with code splitting
        {
          format: 'es',
          entryFileNames: 'flowbitz.es.js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          // Enable code splitting for ES modules
          manualChunks: (id) => {
            // GSAP stays external for ES
            if (id.includes('gsap')) return null;
            
            // Split components into separate chunks
            if (id.includes('src/library/components/text/')) {
              const match = id.match(/components\/text\/([^.]+)\.js/);
              return match ? `components/${match[1]}` : null;
            }
            if (id.includes('src/library/components/button/')) {
              const match = id.match(/components\/button\/([^.]+)\.js/);
              return match ? `components/${match[1]}` : null;
            }
            if (id.includes('src/library/components/effect/')) {
              const match = id.match(/components\/effect\/([^.]+)\.js/);
              return match ? `components/${match[1]}` : null;
            }
            // Keep utils and core in separate chunks
            if (id.includes('src/library/utils/')) {
              return 'utils';
            }
            if (id.includes('src/library/core/')) {
              return 'core';
            }
          }
        },
        // UMD build - GSAP loaded dynamically (not bundled)
        {
          format: 'umd',
          name: 'FlowBitz',
          entryFileNames: 'flowbitz.umd.js',
          inlineDynamicImports: true, // Bundle components, but not GSAP
          globals: {
            'gsap': 'gsap',
            'gsap/ScrollTrigger': 'ScrollTrigger',
            'gsap/SplitText': 'SplitText',
            'gsap/ScrambleTextPlugin': 'ScrambleTextPlugin'
          }
        }
      ]
    },
    // Optimize build
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
        drop_debugger: true,
        pure_funcs: ['console.debug']
      }
    }
  },
  
  resolve: {
    alias: {
      '@library': resolve(__dirname, 'src/library'),
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.REACT_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});
