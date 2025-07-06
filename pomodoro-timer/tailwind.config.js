/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["'Quicksand'", "sans-serif"],
        pixelify: ["'Pixelify Sans'", 'sans-serif']
      },
      colors: {
        pastel: {
          pink: '#fbd3e9',
          purple: '#c6b5f2',
          green: '#d2f8d2',
          yellow: '#fffacc',
          blue: '#cce6ff',
        },
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        },
      },
      animation: {
        float: 'float linear infinite',
      },
      boxShadow: {
        innerGlow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)',
        pastel: '0 10px 25px rgba(255, 192, 203, 0.3)',
      },
    },
  },
  plugins: [],
}
