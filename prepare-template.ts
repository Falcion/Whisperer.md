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

import * as os from 'os';
import * as path from 'path';

import * as fs from 'fs-extra';
import * as readline from 'readline';

import * as colors from 'colors/safe';
import { WriteStream } from 'fs';

const PROMPTS: string[] =
  [
    'DO YOU WANT TO UPDATE AND CHECK YOUR MANIFEST FOR THE SYNC',
    'DO YOU WANT TO ADD WORDS TO SEARCH FOR THEM IN THE PROJECT',
    'WRITE THE WORDS SEPARATED BY COMMA',
  ]

/*
 * Declaring unsupport for macOS, iOS and any related types of platforms.
 */
if (os.type() === 'Darwin') process.abort();

/**
 * @class
 * Represents a logger utility for logging messages with different severity levels and colors.
 */
export class LOCALE_LOGGER {
  /**
   * A process ID which represents session of localized logger instance.
   * @type {number}
   */
  private static session_id: number = process.ppid;

  /**
   * Logs the info message.
   * @param {...any} data - The data to be logged.
   */
  public static info(...data: unknown[]): void {
    const datetime = new Date().toLocaleString();

    console.info(
      colors.blue(`[${datetime}] < ${this.session_id} > \t - ${data.join(' ')}`));
  }

  /**
   * Logs the warn message.
   * @param {...any} data - The data to be logged.
   */
  public static warn(...data: unknown[]): void {
    const datetime = new Date().toLocaleString();

    console.warn(
      colors.yellow(`[${datetime}] < ${this.session_id} > \t - ${data.join(' ')}`));
  }

  /**
   * Logs the error message.
   * @param {...any} data - The data to be logged.
   */
  public static error(...data: unknown[]): void {
    const datetime = Date.now().toLocaleString();

    console.error(
      colors.bgRed(colors.white(`[${datetime}] < ${this.session_id} > \t - ${data}`)));
  }

  /**
   * Logs the success message.
   * @param {...any} data - The data to be logged.
   */
  public static success(...data: unknown[]): void {
    const datetime = Date.now().toLocaleString();

    console.log(
      colors.green(`[${datetime}] < ${this.session_id} > \t - ${data}`));
  }

  /**
   * Logs the message with custom color.
   * @param {(str: string) => string} color - The color function.
   * @param {...any} data - The data to be logged.
   */
  public static raw(color: (str: string) => string, ...data: unknown[]): void {
    console.debug(
      color(data.join(' ')));
  }

  /**
  * Formats a message with custom color.
  * @param {(str: string) => string} color - The color function.
  * @param {string} message - The message to be formatted.
  * @returns {string} The formatted message.
  */
  public static msg(color: (str: string) => string, message: string): string {
    return color(message);
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
  public ROOT_DIRECTORY: string = __dirname;

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
    'bin',
  ];

  /**
   * Values to be excluded from file content search.
   * @type {string[]}
   */
  private EXCLUDING_VALUES: string[] = [
    'FALCION',
    'PATTERNU',
    'PATTERNUGIT',
    'PATTERNUGIT.NET'
  ];

  /**
   * Updates the exclusion settings based on user input.
   * @param {string[]} entries - Entries to be added to the exclusion list.
   * @param {string} actions - User action (Y or N).
   */
  public update(
    entries: string[],
    actions: string): void {
    if (actions.length > 1) {
      throw new RangeError('Action input must be a char.');
    }

    if (actions === 'Y') {
      for (const entry of entries) {
        this.EXCLUDING_VALUES.push(entry);
      }
    }

    if (actions === 'N') {
      this.EXCLUDING_FOLDERS = entries;
    }

    if (CONFIG.USE_GITIGNORE) {
      const gitignore = fs.readFileSync('.gitignore').toString().split('\n');

      gitignore.forEach(line => {
        if (line[0] !== '#' && line[0] !== '!')
          this.EXCLUDING_FOLDERS.push(line);
      });
    }

    fs.ensureFileSync(CONFIG.LOGS_FILE);
  }

  /**
   * Searches for specified words in file contents.
   * @param {string} filepath - The path of the file to search.
   * @param {string[]} data - Words to search for.
   * @returns {Promise<void>} A promise representing the search operation.
   */
  public async search(filepath: string, data: string[]): Promise<void> {
    const buffer: string = await fs.readFile(filepath, { 'encoding': 'utf-8' });
    const stream: WriteStream = fs.createWriteStream(CONFIG.LOGS_FILE, { flags: 'a' });

    const contents: string[] = buffer.split(os.EOL);

    for (let i = 0; i < contents.length; i++) {
      const line = contents[i].toUpperCase();

      for (const target of data) {
        if (line.includes(target)) {
          LOCALE_LOGGER.raw(colors.green, `Found "${target}" in L#${i} of: `);
          LOCALE_LOGGER.raw(colors.cyan, filepath);

          stream.write(`Found "${target}" in L#${i} of:` + os.EOL);
          stream.write(`\t${filepath}` + os.EOL);
        }
      }
    }

    stream.end();
  }

  /**
  * Traverses directories and searches files for specified words.
  * @param {string} directory - The directory to start traversal from.
  * @returns {Promise<void>} A promise representing the traversal operation.
  */
  public async traverse(directory: string = __dirname): Promise<void> {
    try {
      const items: string[] = await fs.readdir(directory);

      for (const item of items) {
        const itempath = path.join(directory, item);

        const itemstats = await fs.stat(itempath);

        if (itemstats.isDirectory()) {
          if (!this.EXCLUDING_FOLDERS.includes(item))
            await this.traverse(itempath);
        } else if (itemstats.isFile()) {
          await this.search(itempath, this.EXCLUDING_VALUES);
        } else {
          continue;
        }
      }
    } catch (err: unknown) {
      LOCALE_LOGGER.error(err);
    }
  }
}

/** THIS IS A MAIN CONFIG FOR THIS SCRIPT
  * ONLY EDIT THIS VALUES.
  **/
const CONFIG = {
  USE_GITIGNORE: true,
  GITIGNORE_PATH: './.gitignore',
  LOGS_FILE: `preparations-${new Date().toLocaleDateString()}.logs`
};

(() => {
  const RL = readline.createInterface({ input: process.stdin, output: process.stdout });

  RL.setPrompt(PROMPTS[1]);

  const mod = new LOCALE_MODULE();

  RL.question(colors.bgBlue(colors.yellow('Add custom entries to path-finding script (Y/N/IGNORE): ')), (mode) => {
    if (mode.toUpperCase() === 'Y') {
      RL.question('Enter parameters (comma-separated): ', (params) => {
        const diction: string[] = params.split(',').map(str => str.trim());
        mod.update(diction, mode.toUpperCase());

        RL.close();

        mod.traverse();
      });
    } else if (mode.toUpperCase() === 'N') {
      RL.close();
      mod.traverse();
    } else {
      RL.close();
    }
  });
})();
