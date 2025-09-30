import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/library/index.js'),
      name: 'FlowBitz',
      fileName: (format) => `flowbitz.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist/beta-build',
    emptyOutDir: true,
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
    'process.env.NODE_ENV': '"production"',
    'process.env.REACT_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});
