// prepate-template.d.ts

/**
 * Represents a logger utility for logging messages with different severity levels and colors.
 */
export declare class LOCALE_LOGGER {
  /**
   * A process ID which represents session of localized logger instance.
   */
  private static session_id: number

  /**
   * Logs an informational message with blue color.
   * @param {...any} data - The data to log.
   */
  public static info(...data: any[]): void

  /**
   * Logs a warning message with yellow color.
   * @param {...any} data - The data to log.
   */
  public static warn(...data: any[]): void

  /**
   * Logs an error message with red background and white text.
   * @param {...any} data - The data to log.
   */
  public static error(...data: any[]): void

  /**
   * Logs a success message with green color.
   * @param {...any} data - The data to log.
   */
  public static success(...data: any[]): void

  /**
   * Logs a message with a custom color.
   * @param {(str: string) => string} color - The color function.
   * @param {...any} data - The data to log.
   */
  public static raw(color: (str: string) => string, ...data: any[]): void

  /**
   * Formats a message with a custom color.
   * @param {(str: string) => string} color - The color function.
   * @param {string} message - The message to format.
   * @returns {string} The formatted message.
   */
  public static msg(color: (str: string) => string, message: string): string
}

/**
 * Represents a module for searching and updating files.
 */
export default class LOCALE_MODULE {
  /**
   * The root directory of the module.
   * Defaults to the directory where the script is located.
   */
  public ROOT_DIRECTORY: string

  /**
   * Directories to be excluded from traversal.
   */
  private EXCLUDING_FOLDERS: string[]

  /**
   * Values to be included from file content search.
   */
  private INCLUDING_VALUES: string[]

  /**
   * Updates the exclusion settings based on user input.
   * @param {string[]} entries - Entries to be added to the exclusion list.
   * @param {string} actions - User action (Y or N).
   * @throws {RangeError} If actions input is not a single character.
   */
  public update(entries: string[], actions: string): void

  /**
   * Searches for specified words in file contents.
   * @param {string} filepath - The path of the file to search.
   * @param {string[]} data - Words to search for.
   * @returns {Promise<void>} A promise representing the search operation.
   */
  public search(filepath: string, data: string[]): Promise<void>

  /**
   * Traverses directories and searches files for specified words.
   * @param {string} [directory=__dirname] - The directory to start traversal from.
   * @returns {Promise<void>} A promise representing the traversal operation.
   */
  public traverse(directory?: string): Promise<void>
}
