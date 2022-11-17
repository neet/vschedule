/** @type {import('eslint').ESLint.ConfigData } */
module.exports = {
  extends: ['plugin:@neet/eslint-plugin-vschedule/recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: require.resolve('./tsconfig.json'),
      },
    },
  ],
};
