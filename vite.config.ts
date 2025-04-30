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
  base: '/',  // This ensures proper asset loading
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  }
})
