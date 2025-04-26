// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url';
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// Create a base configuration
const baseConfig = {
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
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
  build: {
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
        // For ESM builds, use import maps to resolve external dependencies
        paths: isWebComponent ? {
          'react': 'https://esm.sh/react@19.1.0',
          'react-dom': 'https://esm.sh/react-dom@19.1.0',
          'react/jsx-runtime': 'https://esm.sh/react@19.1.0/jsx-runtime'
        } : undefined,
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
    emptyOutDir: !isWebComponent // Only empty the output directory for the first build
  }
})
