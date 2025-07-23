import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
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