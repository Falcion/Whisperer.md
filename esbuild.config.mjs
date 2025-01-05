import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import process from 'process'
import builtins from 'builtin-modules'
import glsl from 'esbuild-plugin-glsl'
import fs from 'fs'

const banner =
  `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`

const manifest = {
  name: 'manifest',
  setup(build) {
    build.onEnd(() => {
      fs.writeFileSync('out/manifest.json', fs.readFileSync('manifest.json'), 'utf8')
    })
  }
}

const autotest = {
  name: 'autotest',
  setup(build) {
    build.onEnd(() => {
      const PUT_YOUR_PATH_HERE_IF_ENABLED = ''
      const ENABLED = false

      if (ENABLED) {
        fs.copyFileSync('out/manifest.json', PUT_YOUR_PATH_HERE_IF_ENABLED)
        fs.copyFileSync('out/main.js', PUT_YOUR_PATH_HERE_IF_ENABLED)
        fs.copyFileSync('out/styles.css', PUT_YOUR_PATH_HERE_IF_ENABLED)
      }
    })
  }
}

const prod = (process.argv[2] === 'production')

const context = await esbuild.context({
  banner: {
    js: banner
  },
  entryPoints: ['source/main.ts'],
  plugins: [
    sassPlugin(),
    glsl({
      minify: true
    }),
    manifest,
    autotest
  ],
  bundle: true,
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
    ...builtins],
  format: 'cjs',
  target: 'es6',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: 'out/main.js',
  loader: {
    '.ttf': 'base64'
  }
})

if (prod) {
  await context.rebuild()
  process.exit(0)
} else {
  await context.watch()
}
