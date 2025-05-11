This document is created as guidelines about how to fix executable issues with shell
scripts for non-UNIX users.

**Table of contents:**

- [How to fix this issue](#how-to-fix-this-issue)
- [How to cross-verify](#how-to-cross-verify)
- [Connecting with hooks](#connecting-with-hooks)
- [Useful links](#useful-links)

```bash
Error: File:[FILE_PATH] is not executable
```

The error indicates that listed bash (shell) scripts are not marked as executable.
On UNIX-like system this is not a problem, not only because systematically files
must have the execute permission set to run them as scripts, but because OS supports
such configurations natively.

Windows, on other hand, does not "support" this natively or in other way, Git on
Windows systems does not support such work tree by default.

### How to fix this issue

Git tracks file permissions using the `core.fileMode` configuration. In a Windows
environment, this setting is often disabled. Run the following command to confirm:

> [!Important]
> Use any commands and even commits without any interference of
> CI/CD, they may change behaviour of commits and etc.
>
> Also, DO NOT use any Windows-associated command interfaces,
> instruments and etc., Windows DOES NOT supports set of UNIX
> permissions: consider using WSL or native Git's Bash, it is
> supported by Visual Studio Code.

```bash
git config --get core.fileMode
```

- If it outputs false, Git is not tracking file permission changes.
- To enable it temporarily for this repository:

  ```bash
  git config core.fileMode true
  ```

If `chmod +x` (or other ways) doesn't show changes in Git status, you can force Git
to reapply the executable bit:

```bash
git update-index --chmod=+x path/to/file
```

This explicitly tells Git to update its metadata for the files, after this, you can
commit and push the changes.

> [!Note] > **Alternative approach:**
> Use a `.gitattributes` file:
>
> ```plaintext
> *.sh text eol=lf
> *.sh executable
> ```

### How to cross-verify

If you're using Git Bash or WSL, verify that the `+x` bit is applied. Run:

```bash
ls -l path/to/file
```

You should see something like:

```plaintext
-rwxr-xr-x 1 user group 1234 Nov 22 12:34 deinstall.sh
```

**Or check file mods with Git:**

```bash
git ls-files --stage
```

You should see `100755` for executable files (instead of `100644`): if you are
using Windows and nothing helps, you might need to:

```bash
git config --global core.autocrlf false
git rm --cached -r .
git reset --hard
```

If the `x` is missing and the above steps didn't work, proceed with the guidelines.

### Connecting with hooks

PATTERNU projects tries to fix this issue as future-proof (consistency of `x` bit)
by implementing JavaScript hook, which tries to define executable bit in the shell
files:

```bash
# .husky/pre-commit
node chmod-scripts.mjs
npx lint-staged
```

And the script with usage of file system library, looks like this:

```javascript
import { chmodSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

function setExecutable(filePath) {
  try {
    chmodSync(filePath, '755')
  } catch (error) {
    console.error(`Failed to set executable: ${filePath} - ${error.message}`)
  }
}

function processDirectory(dirPath) {
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
```

Using only Node.js native libraries, this script tries to assign executable permission
always upon committing.

### Useful links

This is a list of useful links which helped with some
problems:

- <https://stackoverflow.com/questions/21691202/how-to-create-file-execute-mode-permissions-in-git-on-windows>
- <https://stackoverflow.com/questions/52066176/how-can-i-make-a-script-executable-in-windows#75153318>
- <https://stackoverflow.com/questions/52066176/how-can-i-make-a-script-executable-in-windows>
