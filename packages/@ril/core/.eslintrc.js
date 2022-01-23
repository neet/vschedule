const path = require('path');

module.exports = {
  extends: ['plugin:@ril/eslint-plugin/recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  ],
};
