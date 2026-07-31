export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#09090b', // zinc-950
        surface: '#18181b', // zinc-900
        primary: {
          50: '#f4f4f5', 100: '#e4e4e7', 200: '#d4d4d8', 300: '#a1a1aa',
          400: '#71717a', 500: '#52525b', 600: '#3f3f46', 700: '#27272a',
          800: '#18181b', 900: '#09090b'
        }
      }
    }
  },
  plugins: []
};
