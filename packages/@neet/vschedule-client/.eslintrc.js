const path = require('path');

/** @type {import('eslint').ESLint.Plugin } */
module.exports = {
  extends: [
    // 'next/core-web-vitals',
    'plugin:@neet/eslint-plugin-vschedule/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  ],
};
