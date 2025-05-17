const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");
const prettierPlugin = require("eslint-plugin-prettier");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    languageOptions: {
      parser: tsParser,
    },
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", //resolve "require()"
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "off",
    },
  },
];
