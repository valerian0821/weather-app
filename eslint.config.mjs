import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  // JS source files for the browser
  {
    files: ["src/**/*.{js,mjs,cjs}"], // adjust path if needed
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Webpack config files (Node.js env)
  {
    files: ["webpack.*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
  },
  // Prettier last
  eslintConfigPrettier,
]);
