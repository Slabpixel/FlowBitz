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
      'react-router-dom',
      'three',
      'three/examples/jsm/loaders/GLTFLoader',
      'three/examples/jsm/controls/OrbitControls'
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
    emptyOutDir: false,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          three: ['three'],
          ui: ['lucide-react', '@radix-ui/react-slot']
        }
      }
    },
    // Performance optimizations
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
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
    'process.env.NODE_ENV': '"production"',
    'process.env.REACT_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});