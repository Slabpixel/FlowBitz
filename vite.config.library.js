import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/library/index.js'),
      name: 'WebflowBits',
      fileName: (format) => `webflow-bits.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    emptyOutDir: false, // Don't empty since we also have the React app
    sourcemap: true,
    rollupOptions: {
      external: [], // Bundle everything for UMD
      output: {
        globals: {
          // Add any global variables if needed
        }
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
    'process.env.NODE_ENV': '"production"'
  }
});
