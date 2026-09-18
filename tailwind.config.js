/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#10243e',
        cloud: '#e8f3ff',
        sky: '#2f80ed',
        mint: '#2dd4bf',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'Yu Gothic UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
