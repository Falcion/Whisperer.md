/*
 * MIT License
 *
 * Copyright (c) 2023-2025 Falcion
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

import * as os from 'os'
import * as path from 'path'

import * as fs from 'fs-extra'
import * as readline from 'readline'

import * as colors from 'colors/safe'
import { WriteStream } from 'fs'

/*
 * Declaring unsupport for macOS, iOS and any related types of platforms.
 */
if (os.type() === 'Darwin') process.abort()

/**
 * @class
 * Represents a logger utility for logging messages with different severity levels and colors.
 */
export class LOCALE_LOGGER {
  /**
   * A process ID which represents session of localized logger instance.
   * @type {number}
   */
  private readonly session_id: number = process.ppid

  /**
   * Logs the info message.
   * @param {...unknown} data - The data to be logged.
   */
  public info (...data: unknown[]): void {
    console.info(colors.blue(this.parseData(data)))
  }

  /**
   * Logs the warn message.
   * @param {...unknown} data - The data to be logged.
   */
  public warn (...data: unknown[]): void {
    console.warn(colors.yellow(this.parseData(data)))
  }

  /**
   * Logs the error message.
   * @param {...unknown} data - The data to be logged.
   */
  public error (...data: unknown[]): void {
    console.error(colors.bgRed(colors.white(this.parseData(data))))
  }

  /**
   * Logs the success message.
   * @param {...unknown} data - The data to be logged.
   */
  public success (...data: unknown[]): void {
    console.log(colors.green(this.parseData(data)))
  }

  /**
   * Logs the message with custom color.
   * @param {(str: string) => string} color - The color function.
   * @param {...unknown} data - The data to be logged.
   */
  public raw (color: (str: string) => string, ...data: unknown[]): void {
    console.debug(color(this.parseData(data)))
  }

  /**
   * Formats a message with custom color.
   * @param {(str: string) => string} color - The color function.
   * @param {string} message - The message to be formatted.
   * @returns {string} The formatted message.
   */
  public msg (color: (str: string) => string, message: string): string {
    return color(message)
  }

  private parseData (...data: unknown[]): string {
    const ctx = data
      .map((item) => (typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)))
      .join(' ')

    return `[${new Date().toLocaleString()}] < ${this.session_id} > \t - ${ctx}`
  }
}

/**
 * @class
 * Represents a module for searching and updating files.
 */
export default class LOCALE_MODULE {
  /**
   * The root directory of the module.
   * @type {string}
   */
  public ROOT_DIRECTORY: string = __dirname

  /**
   * Directories to be excluded from traversal.
   * @type {string[]}
   */
  private EXCLUDING_FOLDERS: string[] = [
    'node_modules',
    'dist',
    'venv',
    '.git',
    '$git',
    '$',
    'out',
    'bin'
  ]

  /**
   * Values to be excluded from file content search.
   * @type {string[]}
   */
  private readonly EXCLUDING_VALUES: string[] = [
    'FALCION',
    'PATTERNU',
    'PATTERNUGIT',
    'PATTERNUGIT.NET'
  ]

  public readonly LOGGER: LOCALE_LOGGER = new LOCALE_LOGGER()

  /** **THIS IS A MAIN CONFIG FOR THIS SCRIPT
   * ONLY EDIT THIS VALUES.**
   **/
  public CONFIG = {
    USE_GITIGNORE: true,
    /**
     * Path to your gitignore from the root, relative to
     * the script's directory.
     */
    GITIGNORE_PATH: './.gitignore',
    /**
     * Path to the future logs of the locale module: by default is static of
     * config's value.
     */
    LOGS_FILE: `preparations-${new Date().toLocaleDateString()}.logs`
  }

  constructor (
    path: string = this.CONFIG.LOGS_FILE,
    ignoreUse: boolean = this.CONFIG.USE_GITIGNORE,
    ignorePath: string = this.CONFIG.GITIGNORE_PATH
  ) {
    this.CONFIG.LOGS_FILE = path
    this.CONFIG.USE_GITIGNORE = ignoreUse
    this.CONFIG.GITIGNORE_PATH = ignorePath
  }

  /**
   * Updates the exclusion settings based on user input.
   * @param {string[]} entries - Entries to be added to the exclusion list.
   * @param {string} actions - User action (Y or N).
   */
  public update (entries: string[], actions: string): void {
    if (actions.length > 1) {
      throw new RangeError('Action input must be a char.')
    }

    if (actions === 'Y') {
      for (const entry of entries) {
        this.EXCLUDING_VALUES.push(entry)
      }
    }

    if (actions === 'N') {
      this.EXCLUDING_FOLDERS = entries
    }

    if (this.CONFIG.USE_GITIGNORE) {
      const gitignore = fs.readFileSync('.gitignore').toString().split('\n')

      gitignore.forEach((line) => {
        if (line[0] !== '#' && line[0] !== '!') {
          this.EXCLUDING_FOLDERS.push(line)
        }
      })
    }

    fs.ensureFileSync(this.CONFIG.LOGS_FILE)
  }

  /**
   * Searches for specified words in file contents.
   * @param {string} filepath - The path of the file to search.
   * @param {string[]} data - Words to search for.
   * @returns {Promise<void>} A promise representing the search operation.
   */
  public async search (filepath: string, data: string[]): Promise<void> {
    const buffer: string = await fs.readFile(filepath, { encoding: 'utf-8' })
    const stream: WriteStream = fs.createWriteStream(this.CONFIG.LOGS_FILE, { flags: 'a' })

    const contents: string[] = buffer.split(os.EOL)

    for (let i = 0; i < contents.length; i++) {
      const line = contents[i].toUpperCase()

      for (const target of data) {
        if (line.includes(target)) {
          this.LOGGER.raw(colors.green, `Found "${target}" in L#${i} of: `)
          this.LOGGER.raw(colors.cyan, filepath)

          stream.write(`Found "${target}" in L#${i} of:` + os.EOL)
          stream.write(`\t${filepath}` + os.EOL)
        }
      }
    }

    stream.end()
  }

  /**
   * Traverses directories and searches files for specified words.
   * @param {string} directory - The directory to start traversal from.
   * @returns {Promise<void>} A promise representing the traversal operation.
   */
  public async traverse (directory: string = __dirname): Promise<void> {
    try {
      const items: string[] = await fs.readdir(directory)

      for (const item of items) {
        const itempath = path.join(directory, item)

        const itemstats = await fs.stat(itempath)

        if (itemstats.isDirectory()) {
          if (!this.EXCLUDING_FOLDERS.includes(item)) {
            await this.traverse(itempath)
          }
        } else if (itemstats.isFile()) {
          await this.search(itempath, this.EXCLUDING_VALUES)
        } else {
          continue
        }
      }
    } catch (err: unknown) {
      this.LOGGER.error(err)
    }
  }
}

export const ask = async (rl: readline.Interface, question: string): Promise<string> => {
  return await new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

void (async () => {
  const RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  void (async () => {})

  try {
    const finder = new LOCALE_MODULE()

    const mode = await ask(RL, colors.bgBlue(colors.yellow('Add custom entries (Y/N/IGNORE): ')))

    if (mode.toUpperCase() === 'Y') {
      const params = await ask(RL, 'Enter parameters (comma-separated): ')

      const diction = params.split(',').map((str) => str.trim())

      finder.update(diction, mode.toUpperCase())

      await finder.traverse()
    } else if (mode.toUpperCase() === 'N') {
      await finder.traverse()
    }
  } catch (error) {
    console.error(
      colors.red(typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error))
    )
  } finally {
    RL.close()
  }
})()
