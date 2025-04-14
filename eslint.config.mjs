import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import eslintPluginJsonc from 'eslint-plugin-jsonc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    // Global ignore patterns
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/out/',
      '**/prepare_template.js',
      '*.d.ts',
      '**/venv/'
    ]
  },
  {
    // JavaScript-specific configuration
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    ignores: ['**/venv/'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2016
      }
    }
  },
  {
    // TypeScript-specific configuration
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.d.ts', '**/venv/'],
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc']
]
