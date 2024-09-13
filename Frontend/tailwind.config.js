/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1600px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#d4af37', // Gold
'primary-dark': '#b8860b', // Dark Goldenrod
'primary-light': '#f9e6a6', // Light Golden
'text-dark': '#0f172a', // Dark text color remains the same
'text-light': '#64748b', // Light text color remains the same
'extra-light': '#faf3dd', // Very light gold tone

      }
      
    },
  },
  plugins: [],
}

