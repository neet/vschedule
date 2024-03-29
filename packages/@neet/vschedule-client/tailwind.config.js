module.exports = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEE5ED',
          100: '#FECCDC',
          200: '#FD9AB9',
          300: '#FB6997',
          400: '#FA3774',
          500: '#F80652',
          600: '#C60542',
          700: '#940431',
          800: '#630221',
          900: '#310110',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
