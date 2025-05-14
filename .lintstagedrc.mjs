const isMockOrTest = (f) =>
  f.includes('__mocks__') || f.endsWith('.test.ts') || f.endsWith('.spec.ts')

/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  /** Javascript codefiles: */
  '*.{mjs,js,jsx,cjs}': (files) => {
    const found = files
      .filter(
        (f) => f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.mjs') || f.endsWith('.cjs')
      )
      .map((f) => `"${f}"`)

    return [
      `npx prettier --write ${found.join(' ')}`,
      `npx eslint ${found.join(' ')} --fix`,
      `node scripts/lint.js --js --fix --only -- ${found.join(' ')}`,
      `npx standard ${found.join(' ')} --fix`
    ]
  },
  /** Typescript codefiles (excluding typings): */
  '*.{mts,ts,tsx,cts}': (files) => {
    const found = files
      .filter(
        (f) =>
          (!isMockOrTest(f) && f.endsWith('.ts')) ||
          f.endsWith('.tsx') ||
          f.endsWith('.mts') ||
          (f.endsWith('.cts') && !f.endsWith('.d.ts'))
      )
      .map((f) => `"${f}"`)

    return [
      `npx prettier --write ${found.join(' ')}`,
      `npx eslint ${found.join(' ')} --fix`,
      `npx ts-standard ${found.join(' ')} --fix`
    ]
  },
  /** Typescript typings: */
  '*.d.ts': (files) => {
    const found = files.filter((f) => f.endsWith('.d.ts')).map((f) => `"${f}"`)

    return [`npx prettier --write ${found.join(' ')}`]
  },
  /** Markdown files: */
  '*.md': (files) => {
    const EXCLUDING = ['CHANGELOG.md', 'UNSUPPORTED_VERSIONS.md']

    const found = files
      .filter(
        (f) =>
          f.endsWith('.md') &&
          !EXCLUDING.some((name) => f.endsWith(name)) &&
          !f.match(/^.*\/changes\/v[^/]+/)
      )
      .map((f) => `"${f}"`)

    return [
      `npx textlint ${found.join(' ')} --fix`,
      `npx markdownlint-cli2 "!{CHANGELOG.md,node_modules/**,out/**}" ${found.join(' ')} --fix`
    ]
  },
  '*.{gn,gni}': ['npm run gn-check', 'npm run gn-format'],
  /** Media: */
  '*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
  /** Styles: */
  '*.*css': (files) => {
    const found = files
      .filter((f) => f.endsWith('.css') || f.endsWith('.scss'))
      .map((f) => `"${f}"`)

    return [`stylelint --fix ${found.join(' ')}`, `prettier --write ${found.join(' ')}`]
  },
  /** Patches: */
  '{*.patch,.patches}': (files) => {
    const found = files
      .filter((f) => f.endsWith('.patch') || f.endsWith('.patches'))
      .map((f) => `"${f}"`)

    return [
      `node scripts/lint.js --patches --only -- ${found.join(' ')}`,
      `ts-node scripts/js/check-patch-diff.ts ${found.join(' ')}`
    ]
  },
  /** YAML: */
  '*.{yml,yaml}': (files) => {
    const found = files.filter((f) => f.endsWith('yml') || f.endsWith('yaml')).map((f) => `"${f}"`)

    return [`npx prettier ${found.join(' ')} --write`]
  },
  /** JSON: */
  '*.{json,jsonc}': (files) => {
    const found = files
      .filter((f) => f.endsWith('json') || f.endsWith('jsonc'))
      .map((f) => `"${f}"`)

    return [`npx eslint ${found.join(' ')} --fix`]
  }
}
