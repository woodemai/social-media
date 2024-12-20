/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ['prettier', 'next', 'next/core-web-vitals', 'eslint:recommended'],
  plugins: ['@typescript-eslint', 'eslint-plugin-react-compiler'],
  rules: {
    'array-bracket-spacing': ['error', 'always'],
    'newline-before-return': 'error',
    'no-console': 'error',
    'arrow-body-style': ['error', 'as-needed'],
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,ts,tsx,mdx}'],
      env: {
        es6: true,
        node: true,
      },
      extends: ['eslint:recommended'],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['sibling', 'parent'],
              'index',
              'unknown',
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'no-use-before-define': 'error',
        'react-compiler/react-compiler': 'error',
      },
    },
    {
      files: ['**/*.ts?(x)'],
      plugins: ['@typescript-eslint', 'no-relative-import-paths'],
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      settings: {
        'import/resolver': {
          typescript: true,
          node: true,
        },
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/no-duplicate-enum-values': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }],
        'no-relative-import-paths/no-relative-import-paths': [
          'warn',
          { allowSameFolder: true, rootDir: 'src', prefix: '@' },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
    {
      files: ['**/*.{mdx,tsx}'],
      rules: {
        'react/no-unescaped-entities': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
            message:
              'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`',
          },
          {
            selector:
              "ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
            message:
              'Named * React import is not allowed. Please import what you need from React with Named Imports',
          },
        ],
      },
    },
  ],
};
module.exports = config;
