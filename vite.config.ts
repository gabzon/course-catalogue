import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url';
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// Check if we're building for shared hosting
const isSharedHosting = process.env.BUILD_TARGET === 'shared';

// Create a base configuration
const baseConfig = {
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/demo/**/*'],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};

// Check if we're building for web component specifically
const isWebComponent = process.env.FORMAT === 'webcomponent';

export default defineConfig({
  ...baseConfig,
  // Set the base path for shared hosting (can be '/' or a subdirectory)
  base: isSharedHosting ? './' : '/',
  build: isSharedHosting ? {
    outDir: 'dist',
    // Copy the config.js file to the build output
    assetsInlineLimit: 0,
  } : {
    // Your existing build config for library mode
    lib: {
      entry: fileURLToPath(new URL(
        isWebComponent ? 'src/esm-entry.ts' : 'src/index.ts', 
        import.meta.url
      )),
      name: 'CorazonCourseCatalogue',
      fileName: (format) => {
        if (isWebComponent && format === 'es') {
          return 'course-catalogue.webcomponent.js';
        }
        return `course-catalogue.${format}.js`;
      },
      formats: isWebComponent ? ['es'] : ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names[0] && assetInfo.names[0].endsWith('.css')) {
            return 'styles/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    },
    sourcemap: true,
    emptyOutDir: !isWebComponent
  }
})
