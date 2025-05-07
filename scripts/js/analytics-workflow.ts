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
 * @year 2023-2025
 */

import fs from 'fs-extra'

const WORKFLOW_FILENAME: string = 'analytics.yml'

const modes: string[] = fs
  .readFileSync('./../../codeql-analytics.txt', { encoding: 'utf-8' })
  .split('\n')
  .map((str) => str.replaceAll('\n', '').trim())
  .join('')
  .split(',')
  .map((str) => str.trim())

console.info('Current enabled modes:', modes)

const workflow: string[] = fs
  .readFileSync('./../../.github/workflows/' + WORKFLOW_FILENAME, {
    encoding: 'utf-8'
  })
  .split('\n')
  .map((str) => str.trimEnd())

for (let i = 0; i < workflow.length; i++) {
  if (workflow[i].trim().includes('language: [') && workflow[i].trim().endsWith(']')) {
    const tabs: number = workflow[i].split('  ').map((str) => str === '').length

    let tempLine: string = ''

    for (let j = 1; j < tabs; j++) {
      tempLine += '  '
    }

    tempLine += `language: [ ${modes.join(', ')} ]`

    workflow[i] = tempLine
  } else {
    continue
  }
}

console.log(workflow)

fs.writeFileSync('./../../.github/workflows/' + WORKFLOW_FILENAME, workflow.join('\n'))
