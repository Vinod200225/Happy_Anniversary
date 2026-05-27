/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f5',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        blush: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#fbcfd9',
          300: '#f7a8b9',
          400: '#f17593',
          500: '#e7506f',
        },
        cream: {
          50: '#fffaf3',
          100: '#fef3e2',
          200: '#fce4be',
        },
        burgundy: {
          500: '#7a1d2c',
          600: '#5d1421',
          700: '#420d18',
        },
        gold: {
          400: '#d4a574',
          500: '#c08c5a',
          600: '#a06f3e',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        hand: ['Caveat', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'fall': 'fall 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'romantic-gradient': 'linear-gradient(135deg, #fff5f5 0%, #ffe4e6 50%, #fecdd3 100%)',
        'sunset-gradient': 'linear-gradient(180deg, #fef3e2 0%, #ffe4e6 50%, #fecdd3 100%)',
      },
    },
  },
  plugins: [],
}
