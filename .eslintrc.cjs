module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:markdownlint/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'prettier',
    'eslint:recommended'
  ],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['.eslintrc.*js*', '**/node_modules/', '**/out/', '**/venv/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-case-declarations': 'off'
  },
  overrides: [
    {
      files: ['*.md'],
      excludedFiles: ['**/*.ts*', '**/*.*js*'],
      parser: 'eslint-plugin-markdownlint/parser',
      extends: ['plugin:markdownlint/recommended']
    }
  ]
}
