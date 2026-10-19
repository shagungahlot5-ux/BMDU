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
          dark: '#030712',
          card: 'rgba(15, 23, 42, 0.65)',
          cyan: '#06b6d4',
          blue: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}