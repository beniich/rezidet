export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: 'var(--color-background)',
        surface:    'var(--color-surface)',
        zinc: {
          50:  'var(--color-zinc-50)',
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
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
        indigo: {
          400: '#818cf8',
        },
        purple: {
          400: '#c084fc',
        },
        cyan: {
          400: '#22d3ee',
        },
        blue: {
          400: '#60a5fa',
        },
      },
      backgroundImage: {
        'main-radial': 'radial-gradient(circle at 15% 25%, rgba(61,43,82,0.8) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(26,11,60,0.9) 0%, transparent 45%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 7s ease-in-out infinite',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'spin-slow':  'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
