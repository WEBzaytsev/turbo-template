import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import queryPlugin from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";
import { base } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...base,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...queryPlugin.configs["flat/recommended"],
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
      unicorn,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      // Поведение Unicorn для фронта
      "unicorn/no-null": "off", // Разрешаем null в React
      "unicorn/prevent-abbreviations": "off", // включим позже адресно

      // Strict, но без избыточности и с хорошей автофиксацией
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-template": "error",

      // Auto-fixable React style improvements
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-fragments": ["error", "syntax"],

      // TS
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Не нужен с новым JSX transform
      "react/no-array-index-key": "error", // Запрещает использование array index в качестве key
      // Новое правило в web: глубина вложенности JSX. Устанавливаем порог 8, чтобы не ломать текущие страницы
      "react/jsx-max-depth": ["error", { max: 8 }],

      // Запрещаем wildcard (namespace) импорты для Next.js-пакетов
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportNamespaceSpecifier",
          message:
            "Avoid wildcard (namespace) imports. Prefer explicit named/default imports. Add skipcq if the module is not ESM.",
        },
      ],

      "react/jsx-no-bind": [
        "off",
        {
          allowArrowFunctions: false,
          allowBind: false,
          allowFunctions: false,
          ignoreRefs: true, // Allow refs since they don't cause re-renders
          ignoreDOMComponents: false, // Apply to DOM components too
        },
      ],
    },
  },
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: {
      react: pluginReact,
      unicorn,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Компоненты/HTML без children должны быть самозакрывающимися (<Comp />)
      "react/self-closing-comp": ["error", { component: true, html: true }],
      // Unicorn light rules that auto-fix well for web
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-ternary": "error",
      // Accessibility правила
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    },
  },
  {
    ignores: [".next/", "dist/", ".turbo/", "out/", "node_modules/"],
  },
];
