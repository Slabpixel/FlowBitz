import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  
  // Development configuration
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/SplitText',
      'gsap/ScrollTrigger',
      'gsap/ScrambleTextPlugin',
      'react',
      'react-dom',
      'react-router-dom'
    ],
    force: false
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    hmr: true
  },

  // Build configuration for React app
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  // Resolve configuration for new structure
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@library': resolve(__dirname, 'src/library'),
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});