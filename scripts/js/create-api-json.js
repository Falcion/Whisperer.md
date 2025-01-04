/*
 * Script was made by: @electron
 * Will not be refactored or touched, for more information, see their
 * GitHub page:
 * https://github.com/electron/electron
 *
 * Electron.js repository is licensed and distributed under
 * MIT License.
 *
 * Copyright (c) Electron contributors
 * Copyright (c) 2013-2020 GitHub Inc.
 */

import { parseDocs } from '@electron/docs-parser'
import { promises } from 'node:fs'
import { resolve } from 'node:path'

import { getElectronVersion } from './lib/get-version'

parseDocs({
  baseDirectory: resolve(__dirname, '..'),
  packageMode: 'single',
  useReadme: false,
  moduleVersion: getElectronVersion()
})
  .then((api) => {
    return promises.writeFile(
      resolve(__dirname, '..', 'electron-api.json'),
      JSON.stringify(api, null, 2)
    )
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
