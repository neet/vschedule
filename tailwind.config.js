const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./ui/**/*.tsx', './pages/**/*.tsx', './components/**/*.tsx'],
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

    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.trueGray.50'),
            h1: {
              color: theme('colors.trueGray.50'),
            },
            h2: {
              color: theme('colors.trueGray.50'),
            },
            h3: {
              color: theme('colors.trueGray.50'),
            },
            h4: {
              color: theme('colors.trueGray.50'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
          },
        },
      }),
    },
  },

  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['dark'],
      typography: ['dark'],
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-truncate-multiline')(),
  ],
};
