const path = require('path');

module.exports = {
  extends: ['plugin:@neet/eslint-plugin-vschedule/recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  ],
};
