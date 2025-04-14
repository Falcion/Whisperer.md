/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  singleQuote: true,
  endOfLine: 'crlf',
  trailingComma: 'none',
  arrowParens: 'always',
  semi: false,
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    },
    {
      files: '*.{js,cjs,mjs,jsx}',
      options: {
        parser: 'babel'
      }
    },
    {
      files: '*.{ts,tsx,d.ts}',
      options: {
        parser: 'babel-ts'
      }
    },
    {
      files: '*.{json}',
      options: {
        parser: 'jsonc'
      }
    }
  ],
  printWidth: 100
}

export default config
