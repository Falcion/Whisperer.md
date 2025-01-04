import { chmodSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

function setExecutable (filePath) {
  try {
    chmodSync(filePath, '755')
  } catch (error) {
    console.error(`Failed to set executable: ${filePath} - ${error.message}`)
  }
}

function processDirectory (dirPath) {
  readdirSync(dirPath).forEach((file) => {
    const fullPath = join(dirPath, file)
    if (statSync(fullPath).isDirectory()) {
      processDirectory(fullPath)
    } else if (fullPath.endsWith('.sh')) {
      setExecutable(fullPath)
    }
  })
}

processDirectory(process.cwd())
