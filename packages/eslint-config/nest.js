import globals from "globals";
import { base } from "./base.js";
import unicorn from "eslint-plugin-unicorn";

/**
 * Flat ESLint config для NestJS (Node.js + Jest)
 * @type {import("eslint").Linter.Config[]}
 */
export const nestConfig = [
  ...base,
  // Включаем typed-linting (TypeScript type-aware) через projectService
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      // Typed-linting правила для NestJS
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: false,
          ignoreMixedLogicalExpressions: false,
          ignoreTernaryTests: false,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksConditionals: true,
          checksVoidReturn: false, // Для NestJS middleware/guards
        },
      ],
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],

      // Предпочитаем шаблонные строки вместо конкатенации
      "prefer-template": "error",
      // Запрещаем конкатенацию только строковых литералов
      "no-useless-concat": "error",
      // Запрещаем константные условия в if/for/do...while и тернарных операторах, но разрешаем бесконечные циклы while(true)
      "no-constant-condition": ["error", { checkLoops: false }],
      // Запрещаем присваивания внутри условий
      "no-cond-assign": ["error", "always"],
      // Запрещаем константные бинарные выражения
      "no-constant-binary-expression": "error",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Смягчаем некоторые TS‑правила для NestJS
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // any как предупреждение для постепенной типизации
      "@typescript-eslint/no-explicit-any": "warn",
      // ES6 шорткаты для свойств/методов объектов
      "object-shorthand": ["error", "always"],
      // Запрещаем "бесполезные" template literals без интерполяции и без переносов строк
      // Пример: const msg = `Hello` → const msg = 'Hello'
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TemplateLiteral[expressions.length=0][quasis.length=1]:not(:has(TemplateElement[value.raw=/[\\\n\\\r]/]))",
          message: "Template string can be replaced with a regular string literal",
        },
      ],
    },
  },
  {
    plugins: { unicorn },
    rules: {
      "unicorn/prevent-abbreviations": "off",
      // Дополнительные Unicorn правила для NestJS
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-ternary": "error",
    },
  },
];
