export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        zinc: {
          50: 'var(--color-zinc-50)',
          100: 'var(--color-zinc-100)',
          200: 'var(--color-zinc-200)',
          300: 'var(--color-zinc-300)',
          400: 'var(--color-zinc-400)',
          500: 'var(--color-zinc-500)',
          600: 'var(--color-zinc-600)',
          700: 'var(--color-zinc-700)',
          800: 'var(--color-zinc-800)',
          900: 'var(--color-zinc-900)',
          950: 'var(--color-zinc-950)',
        }
      }
    }
  },
  plugins: []
};
