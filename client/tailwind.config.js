/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '3000': '3000ms', // 10 seconds
      },
      boxShadow: {
        'brand': '0px 0px 6px 1px rgba(0, 0, 0, 0.1)',
        'input': 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
        'toast': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
      },
      borderColor: {
        "main": '#212121',
        "primary": '#F2890C'
      },
      backgroundColor: {
        "primary": "#F2890C"
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
}

