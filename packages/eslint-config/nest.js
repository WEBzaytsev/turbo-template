import globals from "globals";
import { config as baseConfig } from "./base.js";
import unicorn from "eslint-plugin-unicorn";

/**
 * Flat ESLint config для NestJS (Node.js + Jest)
 * @type {import("eslint").Linter.Config[]}
 */
export const nestConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Отключаем строгие правила TS для совместимости с NestJS
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // Включаем no-explicit-any как warning для NestJS (вместо полного отключения)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    plugins: { unicorn },
    rules: {
      "unicorn/prevent-abbreviations": "off",
    },
  },
];
