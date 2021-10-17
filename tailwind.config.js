const colors = require('tailwindcss/colors');

module.exports = {
  jit: true,
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      ...colors,
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

    truncate: {
      lines: {
        2: '2',
      },
    },
  },

  variants: {
    scrollbar: ['dark', 'rounded'],
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-truncate-multiline')(),
    require('tailwind-scrollbar'),
  ],
};
