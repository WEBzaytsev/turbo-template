import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

/**
 * A shared ESLint configuration for the repository.
 * @type {import("eslint").Linter.Config[]}
 */
export const base = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      sonarjs,
    },
    rules: {
      ...sonarjs.configs.recommended.rules,
    },
  },
  {
    plugins: {
      import: importPlugin,
      unicorn,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // Prevent multiple exports of the same name
      "import/export": "error",

      // Disallow process.exit() - throw errors instead for better error handling
      "no-process-exit": "error",

      // Enforce better naming and scope via unicorn (conservative defaults)
      "unicorn/prevent-abbreviations": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-useless-undefined": "off",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    rules: {
      // Prevent deleting dynamically computed keys - dangerous and not well optimized
      "@typescript-eslint/no-dynamic-delete": "error",

      // Prevent usage of any type - creates potential safety holes and bugs
      "@typescript-eslint/no-explicit-any": "off", // временно отключаем массовые фиксы

      // Disallow unnecessary type annotations that can be trivially inferred
      "@typescript-eslint/no-inferrable-types": "warn",

      // Disallow non-null assertions using the ! postfix operator
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Prefer using `type` imports consistently (auto-fix)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Prefer simple array type form where possible (auto-fix)
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // Typed rules are applied in a TS-only block below

      // Prefer explicit type conversions over implicit coercion for better readability
      "no-implicit-coercion": [
        "error",
        {
          boolean: true, // Disallow !!foo, prefer Boolean(foo)
          number: true, // Disallow +foo, prefer Number(foo)
          string: true, // Disallow "" + foo, prefer String(foo)
          disallowTemplateShorthand: false, // Allow `${foo}` for string conversion
        },
      ],

      // Prevent duplicate imports using import plugin (auto-fix); disable core to avoid duplicates
      "no-duplicate-imports": "off",
      "import/no-duplicates": "error",

      // Enforce a newline after the import block (auto-fix)
      "import/newline-after-import": ["error", { count: 1 }],

      // Modern JS/TS simplifications (auto-fix)
      "prefer-const": "error",
      "no-var": "error",
      "prefer-arrow-callback": [
        "error",
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      "arrow-body-style": ["error", "as-needed"],
      "logical-assignment-operators": [
        "error",
        "always",
        { enforceForIfStatements: true },
      ],
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-return-await": "error",
      "no-useless-concat": "error",
      "prefer-object-spread": "error",
      "prefer-exponentiation-operator": "error",

      // Disallow template literals without interpolations and without line breaks (use regular strings)
      // Note: Allows multiline template literals or those with expressions
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TemplateLiteral[expressions.length=0][quasis.length=1]:not(:has(TemplateElement[value.raw=/[\\\n\\\r]/]))",
          message:
            "Template string can be replaced with a regular string literal",
        },
      ],

      // Padding around statements to improve readability (auto-fix)
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],

      // Strict naming patterns for entities
      "@typescript-eslint/naming-convention": [
        "error",
        // Default: camelCase
        { selector: "default", format: ["camelCase"] },
        // Variables: allow camelCase, PascalCase (e.g., class-like consts), or UPPER_CASE
        { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"] },
        // Allow PascalCase or camelCase for imports (e.g., ExcelJS)
        { selector: "import", format: ["camelCase", "PascalCase"] },
        // Functions can be camelCase or PascalCase (for React components)
        { selector: "function", format: ["camelCase", "PascalCase"] },
        // Methods must be camelCase
        { selector: "method", format: ["camelCase"] },
        // Parameters camelCase, allow leading underscore
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        // Types, Interfaces, Enums, Classes: PascalCase
        { selector: "typeLike", format: ["PascalCase"] },
        // Enum members: PascalCase or UPPER_CASE (allow both styles)
        { selector: "enumMember", format: ["PascalCase", "UPPER_CASE"] },
        // Do not enforce naming on properties (too noisy, domain-driven keys allowed)
        {
          selector: [
            "property",
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
          ],
          format: null,
        },
        // Ignore quoted properties (e.g., HTTP headers)
        {
          selector: [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "classMethod",
            "objectLiteralMethod",
            "typeMethod",
            "accessor",
            "enumMember",
          ],
          format: null,
          modifiers: ["requiresQuotes"],
        },
      ],
    },
  },
  // Typed-only rules block for TS files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: false,
          ignoreMixedLogicalExpressions: false,
          ignoreTernaryTests: false,
        },
      ],
      "@typescript-eslint/prefer-optional-chain": "error",
    },
  },
  {
    ignores: ["dist/**", "eslint.config.*"],
  },
];
