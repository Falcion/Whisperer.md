Problems can be separated in three categories: ones with WSL, ones with HUSKY
itself and ones with OS and desktop client of Git.

- if npm/Node does not work in the WSL on your machine:\
  <https://github.com/microsoft/WSL/issues/4249/>
- If npm/npx not found message appears:\
  <https://github.com/desktop/desktop/issues/12562>

> [!Tip]
> Also check your "%PATH% → Node.js/bin/" paths in environment variables context:\
>
> - Windows users, if you have everything set up and installed, check this comment
    from same issue:\
> <https://github.com/desktop/desktop/issues/12562#issuecomment-1007154382>

If you encounter this error:

```powershell
<3>WSL (10) ERROR: CreateProcessCommon:559: execvpe(/bin/bash) failed: No such file or directory
husky - pre-commit script failed (code 1)
```

It means that you don't have correct WSL distributive chosen or even installed on
your system, if you have "Docker Desktop" on your machine, it is because of him.

- Before anything, check by `wsl --list --verbose`, and if "Docker Desktop" marked
  with asterisk ("`*`") it indicates docker is
  default WSL distribution.

#### Why this matters

Husky or Git hooks might be relying on WSL, and if the default distribution is set
to "Docker Desktop" (which is not a full Linux environment for general use): it
could cause errors like the missing "`/bin/bash/`".

1. Check your current WSL distributions run:

   ```bash
   wsl --list --verbose
   # Example output
   # NAME                   STATE           VERSION
   # * Docker Desktop       Running         2
   # Ubuntu               Stopped         2
   ```

2. Set your distributive (in example - "Ubuntu" is choice, WSL's default distribution)
   as the default distribution:

   ```bash
   wsl --set-default Ubuntu
   ```

   **Verify:**

   ```bash
   wsl --list --verbose
   ```
