/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'gray': '#666666', 
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'purple': '#d345e6',
      }
    },
  },
  plugins: [],
  darkMode: true,
}
