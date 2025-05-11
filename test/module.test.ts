import { expect } from 'chai'
import LOCALE_MODULE from 'index'
import mock from 'mock-fs'
import fs from 'fs-extra'

describe('LOCALE_MODULE', () => {
  let module: LOCALE_MODULE

  beforeEach(() => {
    mock({
      'test-dir': {
        'file1.txt': 'PATTERNU should be found',
        subdir: {
          'file2.ts': '// PATTERNU in comment'
        },
        '.gitignore': 'subdir\n'
      }
    })

    module = new LOCALE_MODULE('test-dir/test-logs.log')
    module.ROOT_DIRECTORY = 'test-dir'
  })

  it('should find excluded patterns', async () => {
    await module.traverse()
    const logContent = fs.readFileSync(module.CONFIG.LOGS_FILE, 'utf-8')
    expect(logContent).to.include('PATTERNU')
  })
})
