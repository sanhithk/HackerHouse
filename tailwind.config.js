/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0B5D33',
          cream: '#FBF3DC',
          pink: '#EC1E79',
          yellow: '#F5C518',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
