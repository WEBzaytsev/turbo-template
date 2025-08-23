import globals from "globals";
import { config as baseConfig } from "./base.js";
import unicorn from "eslint-plugin-unicorn";

/**
 * Flat ESLint config для NestJS (Node.js + Jest)
 * @type {import("eslint").Linter.Config[]}
 */
export const nestConfig = [
  ...baseConfig,
  // Включаем typed-linting (TypeScript type-aware) через projectService
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Предпочитаем optional chaining вместо && для проверок на null/undefined
      '@typescript-eslint/prefer-optional-chain': 'error',
      // Предпочитаем шаблонные строки вместо конкатенации
      'prefer-template': 'error',
      // Запрещаем конкатенацию только строковых литералов
      'no-useless-concat': 'error',
      // Запрещаем константные условия в if/for/do...while и тернарных операторах, но разрешаем бесконечные циклы while(true)
      'no-constant-condition': ['error', { checkLoops: false }],
      // Запрещаем присваивания внутри условий
      'no-cond-assign': ['error', 'always'],
      // Отключаем "лишние условия" ради снижения шума; базовые проверки константных условий остаются
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // Запрещаем константные бинарные выражения
      'no-constant-binary-expression': 'error',
      // Строгие булевы выражения убраны, чтобы снизить шум; контроль константных условий остаётся
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
      // Optional chaining правило убрано, так как требует typed-linting в текущей конфигурации
    },
  },
];


