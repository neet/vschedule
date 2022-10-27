/** @type {import('eslint').ESLint.ConfigData } */
module.exports = {
  extends: ['plugin:@ril/recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: require.resolve('./tsconfig.json'),
      },
    },
  ],
};
