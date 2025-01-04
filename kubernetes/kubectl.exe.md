# About Kubernetes in this repository

This file is created to remove any unnecessary questions and bring more clarifications.

## What is `kubectl.exe`?

This is the [Kubernetes][0] command-line tool, [kubectl][1], which allows you to
run commands against Kubernetes clusters. You can use `kubectl` to deploy applications,
inspect and manage cluster resources, and view logs. For more information including
a complete list of kubectl operations, see the kubectl reference documentation.

More about it in [Kubernetes's `kubectl` reference documentation][2].

Kubernetes's `kubetctl` supports a variety of Linux platforms; macOS and Windows.
The current kubetctl installed in this repository is for Windows-64x.

- [Install kubectl on Linux](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Install kubectl on macOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [Install kubectl on Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

## Why Windows?

Although Linux is more friendly to virtual environments, in this case, Docker with
Kubernetes clusters, Windows is more common among non-programmer communities, which
is part of the GitHub community too, and this project tries to appeal to every
community member of this site.

If you use a Linux platform, you can delete `kubectl.exe` by using:

```bash
# Using '-i' for safety purposes. If you need to force it, use the '-f' instead.
rm -i kubectl.exe
```

[0]: https://kubernetes.io/
[1]: https://kubernetes.io/docs/reference/kubectl/kubectl/
[2]: https://kubernetes.io/docs/reference/kubectl/
