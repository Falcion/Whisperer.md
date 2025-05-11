/*
  eslint-disable @typescript-eslint/no-unused-vars */
declare module '@patternu/preparation' {
  import { WriteStream } from 'fs'
  import * as readline from 'readline'
  import * as colors from 'colors/safe'

  /**
   * Configuration object for the script
   */
  export const CONFIG: {
    /** Whether to use .gitignore for exclusion */
    USE_GITIGNORE: boolean
    /** Path to .gitignore file */
    GITIGNORE_PATH: string
    /** File path for output logs */
    LOGS_FILE: string
  }

  /**
   * Logger utility class for formatted console output
   */
  export class LOCALE_LOGGER {
    /** Session ID derived from process PPID */
    private readonly session_id: number

    /**
     * Log informational message
     * @param data Flexible arguments to log
     */
    info(...data: unknown[]): void

    /**
     * Log warning message
     * @param data Flexible arguments to log
     */
    warn(...data: unknown[]): void

    /**
     * Log error message
     * @param data Flexible arguments to log
     */
    error(...data: unknown[]): void

    /**
     * Log success message
     * @param data Flexible arguments to log
     */
    success(...data: unknown[]): void

    /**
     * Raw formatted log output
     * @param color Colorization function
     * @param data Flexible arguments to log
     */
    raw(color: (str: string) => string, ...data: unknown[]): void

    /**
     * Create colored message string
     * @param color Colorization function
     * @param message Message to format
     * @returns Colored message string
     */
    msg(color: (str: string) => string, message: string): string
  }

  /**
   * Main file system traversal and processing class
   */
  export default class LOCALE_MODULE {
    /** Root directory for operations */
    public ROOT_DIRECTORY: string
    /** Logger instance */
    public readonly LOGGER: LOCALE_LOGGER
    private EXCLUDING_FOLDERS: string[]
    private readonly EXCLUDING_VALUES: string[]

    /**
     * Update exclusion parameters
     * @param entries Entries to add to exclusion lists
     * @param actions Update action type (Y/N)
     */
    public update(entries: string[], actions: string): void

    /**
     * Search file contents for target strings
     * @param filepath Path to search
     * @param data Target strings to find
     */
    public search(filepath: string, data: string[]): Promise<void>

    /**
     * Recursive directory traversal
     * @param directory Starting directory
     */
    public traverse(directory?: string): Promise<void>
  }

  /**
   * Promisified readline.question implementation
   * @param rl Readline interface
   * @param question Prompt to display
   * @returns Promise resolving to user input
   */
  export function ask(rl: readline.Interface, question: string): Promise<string>
}
