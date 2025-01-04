Scripts provided in this directory are legacy, you can use them at your own risk,
but it is highly recommended to use official GitHub CLI instead, more about it here:

- <https://cli.github.com/>

> [!Note]
> This repository uses a special GitHub app [`Settings`](https://probot.github.io/apps/settings/)
> which not only clones labels, but also a description, tags, links etc.

## How to "copy" labels from one repository to other?

Legacy way are using provided scripts, which may be unsafe.

If you are using GitHub CLI, follow these [instructions](https://cli.github.com/manual/gh_label_clone):

```shell
gh label clone org-name/repo-to-clone-from --repo org-name/repo-to-clone-to
```
