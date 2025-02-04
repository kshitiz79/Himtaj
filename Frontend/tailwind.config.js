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
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '70%, 100%': { opacity: 0.3 },
          '80%': { opacity: 1 },
        },
      },
      colors: {
        'primary': '#78a8a6', 
'primary-dark': '#4d6c6a', 
'primary-light': '#9bccca', 
'text-dark': '#0f172a', 
'text-light': '#64748b', 
'extra-light': '#faf3dd', 
'primary-light-light': '#B3E3DF',
      }
      
    },
  },
  plugins: [],
}

