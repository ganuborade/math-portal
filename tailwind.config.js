/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde047',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        devotional: {
          red: '#991b1b',
          maroon: '#581c87',
          gold: '#fbbf24',
          goldlight: '#fef08a',
          dark: '#0f172a',
          card: 'rgba(23, 15, 38, 0.75)'
        }
      },
      fontFamily: {
        heading: ['Rozha One', 'Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        body: ['Poppins', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(217, 119, 6, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(245, 158, 11, 0.7)' }
        }
      }
    },
  },
  plugins: [],
}
