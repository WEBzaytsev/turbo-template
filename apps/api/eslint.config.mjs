// @ts-check
import { nestConfig } from "@repo/eslint-config/nest.js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nestConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
];
