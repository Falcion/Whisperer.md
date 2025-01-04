/* eslint-disable */

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

/** Changes by: @Falcion - Change from Old CommonJS sytanx to new ES module syntax
 * HUSKY hooks throw error in other cases of import:
 * Error [ERR_REQUIRE_ESM]: require() of ES Module
 */
import chalk from 'chalk'
import { GitProcess } from 'dugite'

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/**
 * // Convert `import.meta.url` to the equivalent of `__dirname`
 */
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ELECTRON_DIR = path.resolve(__dirname, '..', '..')
const SRC_DIR = path.resolve(ELECTRON_DIR, '..')

console.log(ELECTRON_DIR, SRC_DIR)

const pass = chalk.green('✓')
const fail = chalk.red('✗')

export function getElectronExec() {
  const OUT_DIR = getOutDir()
  switch (process.platform) {
    case 'darwin':
      return `out/${OUT_DIR}/Electron.app/Contents/MacOS/Electron`
    case 'win32':
      return `out/${OUT_DIR}/electron.exe`
    case 'linux':
      return `out/${OUT_DIR}/electron`
    default:
      throw new Error('Unknown platform')
  }
}

export function getOutDir(options = {}) {
  const shouldLog = options.shouldLog || false
  const presetDirs = ['Testing', 'Release', 'Default', 'Debug']

  if (options.outDir || process.env.ELECTRON_OUT_DIR) {
    const outDir = options.outDir || process.env.ELECTRON_OUT_DIR
    const outPath = path.resolve(SRC_DIR, 'out', outDir)

    // Check that user-set variable is a valid/existing directory
    if (fs.existsSync(outPath)) {
      if (shouldLog) console.log(`OUT_DIR is: ${outDir}`)
      return outDir
    }

    // Throw error if user passed/set nonexistent directory.
    throw new Error(`${outDir} directory not configured on your machine.`)
  } else {
    for (const buildType of presetDirs) {
      const outPath = path.resolve(SRC_DIR, 'out', buildType)
      if (fs.existsSync(outPath)) {
        if (shouldLog) console.log(`OUT_DIR is: ${buildType}`)
        return buildType
      }
    }
  }

  // If we got here, it means process.env.ELECTRON_OUT_DIR was not
  // set and none of the preset options could be found in /out, so throw
  throw new Error(
    `No valid out directory found; use one of ${presetDirs.join(',')} or set process.env.ELECTRON_OUT_DIR`
  )
}

export function getAbsoluteElectronExec() {
  return path.resolve(SRC_DIR, getElectronExec())
}

export async function handleGitCall(args, gitDir) {
  const details = await GitProcess.exec(args, gitDir)
  if (details.exitCode === 0) {
    return details.stdout.replace(/^\*|\s+|\s+$/, '')
  } else {
    const error = GitProcess.parseError(details.stderr)
    console.log(`${fail} couldn't parse git process call: `, error)
    process.exit(1)
  }
}

export async function getCurrentBranch(gitDir) {
  const RELEASE_BRANCH_PATTERN = /^\d+-x-y$/
  const MAIN_BRANCH_PATTERN = /^main$/
  const ORIGIN_MAIN_BRANCH_PATTERN = /^origin\/main$/

  let branch = await handleGitCall(['rev-parse', '--abbrev-ref', 'HEAD'], gitDir)
  if (!MAIN_BRANCH_PATTERN.test(branch) && !RELEASE_BRANCH_PATTERN.test(branch)) {
    const lastCommit = await handleGitCall(['rev-parse', 'HEAD'], gitDir)
    const branches = (
      await handleGitCall(['branch', '--contains', lastCommit, '--remote'], gitDir)
    ).split('\n')

    branch = branches.find(
      (b) =>
        MAIN_BRANCH_PATTERN.test(b.trim()) ||
        ORIGIN_MAIN_BRANCH_PATTERN.test(b.trim()) ||
        RELEASE_BRANCH_PATTERN.test(b.trim())
    )
    if (!branch) {
      console.log(`${fail} no release branch exists for this ref`)
      process.exit(1)
    }
    if (branch.startsWith('origin/')) branch = branch.substr('origin/'.length)
  }
  return branch.trim()
}

export function chunkFilenames(filenames, offset = 0) {
  // Windows has a max command line length of 2047 characters, so we can't
  // provide too many filenames without going over that. To work around that,
  // chunk up a list of filenames such that it won't go over that limit when
  // used as args. Other platforms may have higher limits, but 4095 might be
  // the limit on Linux systems according to `termios(3)`, so cap it there.
  const MAX_FILENAME_ARGS_LENGTH = (os.platform() === 'win32' ? 2047 : 4095) - offset

  return filenames.reduce(
    (chunkedFilenames, filename) => {
      const currChunk = chunkedFilenames[chunkedFilenames.length - 1]
      const currChunkLength = currChunk.reduce(
        (totalLength, _filename) => totalLength + _filename.length + 1,
        0
      )
      if (currChunkLength + filename.length + 1 > MAX_FILENAME_ARGS_LENGTH) {
        chunkedFilenames.push([filename])
      } else {
        currChunk.push(filename)
      }
      return chunkedFilenames
    },
    [[]]
  )
}

/**
 * @param {string} top
 * @param {(filename: string) => boolean} test
 * @returns {Promise<string[]>}
 */
export async function findMatchingFiles(top, test) {
  return fs.promises.readdir(top, { encoding: 'utf8', recursive: true }).then((files) => {
    return files
      .filter((name) => path.basename(name) !== '.bin')
      .filter((name) => test(name))
      .map((name) => path.join(top, name))
  })
}

// module.exports = {
//     chunkFilenames,
//     findMatchingFiles,
//     getCurrentBranch,
//     getElectronExec,
//     getOutDir,
//     getAbsoluteElectronExec,
//     handleGitCall,
//     ELECTRON_DIR,
//     SRC_DIR
// };
