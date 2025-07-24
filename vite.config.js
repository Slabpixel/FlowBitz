import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Development configuration
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/SplitText',
      'gsap/ScrollTrigger',
      'gsap/ScrambleTextPlugin'
    ],
    force: false // Set to true if you want to force re-optimization
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    hmr: true
  },

  // Build configuration (untuk production)
  build: {
    lib: {
      entry: resolve(__dirname, 'src/webflow-bits.js'),
      name: 'WebflowBits',
      fileName: (format) => `webflow-bits.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: true,
  },
  
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});