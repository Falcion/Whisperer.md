This file contains instuctions and useful references to materials that can help
in correcting errors when using HUSKY hooks system, as well as some other secondary
materials and instructions for working with HUSKY system.

> [!Note]
> If OS of your machine is not UNIX-like (for example, any distributive of Linux),
> it is highly recommended to install the WSL and some distributives on your system,
> this documentation references debian-system as standard:\
> [Download WSL on your system](https://learn.microsoft.com/en-us/windows/wsl/install).

Also, to use more advanced hooks on WSL you require to install Node.js on the WSL's
distributives, it also fixes some errors within WSL:\
<https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl>

## Problems within setup or usage

Problems can be separated in three categories: ones with WSL, ones with HUSKY itself
and ones with OS/desktop clients of Git.

- If npm/Node does not work in the WSL on your machine:\
  <https://github.com/microsoft/WSL/issues/4249/>
- If npx/npx not found message appears:\
  <https://github.com/desktop/desktop/issues/12562>

> [!Tip]
> Also, check your "%PATH% → Node.js/bin/" paths in environment variables context:\
>
> - Windows users, if you have everything set up and installed, check this comment

    from same issue:\

> <https://github.com/desktop/desktop/issues/12562#issuecomment-1007154382>

## Error codes within usage

Next one are popular errors and fails thrown by hooks:

### Error-code "001"

Read more about this here:\
[Error "001"](./docs/h001.md)

### Error-code "127"

Code of this exception contains multiple subtypes:

- **Bash not found:**\
  check "%PATH%" (for .GIT correct paths), otherwise see guidelines before.

- **"NPX" not found:**\
  make changes "npx" → "npx.cmd" in your scripts.

- **"NPM" not found:**\
  make changes "npm" → "npm.cmd" in your scripts.

- **"NVM" not found:**\
  download NVM on your computer and make ref in "%PATH%" (for win-system) variable,
  otherwise, set up WSL system:

  - <https://learn.microsoft.com/en-us/windows/wsl/install>
  - <https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>

- **Node not found:**\
  check "%PATH%" (for NODE correct paths), otherwise see guidelines above.

## References

This is a list of links to materials and sites
referenced by this file:

- <https://github.com/typicode/husky/issues/>
- [Stack Overflow #44829878](https://stackoverflow.com/questions/44829878/)
- [Stack Overflow #67115897](https://stackoverflow.com/questions/67115897/)
- <https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>
