import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: 'var(--cc-primary)',
          secondary: 'var(--cc-secondary)',
        }
      },
    },
    plugins: [],
} satisfies Config
