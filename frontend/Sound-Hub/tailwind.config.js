/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        background: '#f3f4f6',
        foreground: '#000000',
        cardWave: '#f3f4f6'
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
});