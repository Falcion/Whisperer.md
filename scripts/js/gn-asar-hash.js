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

import { getRawHeader } from '@electron/asar'
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'

const archive = process.argv[2]
const hashFile = process.argv[3]

const { headerString } = getRawHeader(archive)
writeFileSync(hashFile, createHash('SHA256').update(headerString).digest('hex'))
