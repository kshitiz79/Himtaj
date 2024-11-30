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
        'primary': '#78a8a6', // Gold
'primary-dark': '#4d6c6a', // Dark Goldenrod
'primary-light': '#9bccca', // Light Golden
'text-dark': '#0f172a', // Dark text color remains the same
'text-light': '#64748b', // Light text color remains the same
'extra-light': '#faf3dd', // Very light gold tone
'primary-light-light': '#B3E3DF',
      }
      
    },
  },
  plugins: [],
}

