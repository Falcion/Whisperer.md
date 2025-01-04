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

import { writeFileSync } from 'node:fs'
import { parse } from 'semver'

const outputPath = process.argv[2]
const currentVersion = process.argv[3]

const parsed = parse(currentVersion)

let prerelease = ''
if (parsed.prerelease && parsed.prerelease.length > 0) {
  prerelease = parsed.prerelease.join('.')
}

const { major, minor, patch } = parsed

writeFileSync(
  outputPath,
  JSON.stringify(
    {
      full_version: currentVersion,
      major,
      minor,
      patch,
      prerelease,
      prerelease_number: prerelease ? parsed.prerelease[parsed.prerelease.length - 1] : '0',
      has_prerelease: prerelease === '' ? 0 : 1
    },
    null,
    2
  )
)
