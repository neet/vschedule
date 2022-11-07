module.exports = {
  configs: {
    recommended: {
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
      ],
      env: {
        browser: true,
        node: true,
        jest: true,
      },
      plugins: ["import", "simple-import-sort"],
      parserOptions: {
        ecmaVersion: 9,
        sourceType: "module",
      },
      rules: {
        "no-console": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
      },
      overrides: [
        {
          files: ["**/*.{ts,tsx}"],
          extends: [
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:import/typescript",
            "plugin:prettier/recommended",
          ],
          rules: {
            "@typescript-eslint/no-unused-vars": [
              "error",
              { "argsIgnorePattern": "^_" }
            ],
          }
        },
      ],
    },
  },
};
