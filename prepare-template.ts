/**
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @license MIT
 * @author Falcion
 * @year 2023-2024
 */

import * as fs from 'fs-extra'
import * as path from 'path'
import * as dotenv from 'dotenv'

import { green, yellow, cyan, red, bgRed, bgGreen, white, bgBlue } from 'colors/safe'

/**
 * Represents the PREPARE_MODULE for searching through files and updating the manifest.
 */
class PREPARE_MODULE {
  /** The root directory of the module. */
  ROOT_DIRECTORY: string = __dirname
  /** An array of folder names to exclude from traversal. */
  EXCLUDING_FOLDER: string[] = ['node_modules', 'venv', '.git', 'out']
  /** An array of values to include in the search. */
  INCLUDING_VALUES: string[] = ['FALCION', 'PATTERNU', 'PATTERNUGIT']

  /**
   * Creates an instance of the PREPARE_MODULE.
   * @param {string[]} entries - An array of custom entries to include for searching.
   */
  constructor(entries: string[]) {
    if (entries[0] !== 'NO') {
      for (const item of entries) this.INCLUDING_VALUES.push(item)
    }
  }

  /**
   * Searches for specified data within a file.
   * @param {string} filepath - The path of the file to search.
   * @param {string[]} data - An array of strings to search for within the file.
   * @returns {Promise<void>} - A promise that resolves when the search is complete.
   */
  async search(filepath: string, data: string[]): Promise<void> {
    const content = (await fs.readFile(filepath, 'utf-8')).split('\n')

    for (let i = 0; i < content.length; i++) {
      const line = content[i].toUpperCase()
      for (const target of data) {
        if (line.includes(target)) {
          console.info(green(`Found "${target}" in L#${i} of:\n` + cyan(filepath)))
        }
      }
    }
  }

  /**
   * Recursively traverses a directory and searches for files.
   * @param {string} directory - The directory path to traverse.
   * @returns {Promise<void>} - A promise that resolves when the traversal is complete.
   */
  async traverse(directory: string): Promise<void> {
    try {
      const files: string[] = await fs.readdir(directory)
      for (const file of files) {
        const filepath = path.join(directory, file)
        const filestat = await fs.stat(filepath)

        if (filestat.isDirectory()) {
          if (!this.EXCLUDING_FOLDER.includes(file)) {
            await this.traverse(filepath)
          }
        } else if (filestat.isFile()) {
          await this.search(filepath, this.INCLUDING_VALUES)
        } else {
          throw new Error(red('Invalid data format:') + bgRed(` ${filepath}`))
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error.')

      if (error.stack === 'ENOENT') {
        console.error(red(`File or directory not found: ${error.message}`))
      } else {
        console.error(
          red(
            'Error reading directory: ' +
            `${error.message}: ${error.stack !== undefined ? error.stack : ''}`
          )
        )
      }
    }
  }
}

fs.ensureFileSync(path.join(__dirname, '.env'))
fs.ensureFileSync(path.join(__dirname, 'manifest.json'))

fs.writeFileSync(path.join(__dirname, '.env'), 'EXAMPLE_API_KEY=')
fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify({}, undefined, 4))

dotenv.config({
  path: '.env',
  encoding: 'utf-8'
})

const PACKAGE_JSON = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }))

const MANIFEST = JSON.parse(fs.readFileSync('manifest.json', { encoding: 'utf-8' }))

if (
  PACKAGE_JSON.name === MANIFEST.id &&
  PACKAGE_JSON.displayName === MANIFEST.name &&
  PACKAGE_JSON.description === MANIFEST.description &&
  PACKAGE_JSON.author.name === MANIFEST.author &&
  PACKAGE_JSON.author.url === MANIFEST.authorUrl &&
  PACKAGE_JSON.license === MANIFEST.license &&
  PACKAGE_JSON.version === MANIFEST.version
) {
  console.warn(bgGreen(white('Manifest is synced with package, keep everything as it was.')))
} else {
  console.warn(bgBlue(yellow("Manifest is not synced with package's information, rewriting it.")))

  fs.copyFileSync('manifest.json', 'manifest-backup.json')

  const inputJson: Record<string, unknown> = {
    id: PACKAGE_JSON.name,
    name: PACKAGE_JSON.displayName,
    description: PACKAGE_JSON.description,
    author: PACKAGE_JSON.author.name,
    authorUrl: PACKAGE_JSON.author.url,
    license: PACKAGE_JSON.license,
    version: PACKAGE_JSON.version
  }

  fs.writeFileSync('manifest.json', JSON.stringify(inputJson, undefined, 4))
}

void new PREPARE_MODULE(['NO']).traverse(PREPARE_MODULE.prototype.ROOT_DIRECTORY).then(() => {
  console.log(green('Traverse is finished.'))
})
