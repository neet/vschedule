const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'media',
  theme: {
    colors: {
      ...colors,
      primary: {
        100: '#fecddc',
        200: '#fc9bba',
        300: '#fb6a97',
        400: '#f93875',
        500: '#f80652',
        600: '#c60542',
        700: '#950431',
        800: '#630221',
        900: '#320110',
      },
    },

    truncate: {
      lines: {
        2: '2',
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      borderWidth: ['dark'],
      textColor: ['group-focus'],
      cursor: ['disabled'],
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-truncate-multiline')(),
  ],
};
