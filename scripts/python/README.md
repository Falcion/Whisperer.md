This file exists to answer some questions.

### What if my project is mainly Python?

Just treat root directory of your project like this project treats scripts,
add missing requirements and install them.

But technically, if you set up `venv` and adjust it to your editor's interpretator
settings, every command should work from root directory.

### How do I use this linters?

According to `super-linter` there are many Python linters in this folder:

1. `PYTHON_BLACK`
2. `PYTHON_PYLINT`
3. `PYTHON_FLAKE8`
4. `PYTHON_ISORT`
5. `PYTHON_MYPY`
6. `PYTHON_PYINK`
7. `PYTHON_RUFF`

To use `PYTHON_BLACK`:

```powershell
black ./
```

To use `PYTHON_PYLINT`:

```powershell
pylint --ignore=venv ./
```

To use `PYTHON_FLAKE8`:

```powershell
flake8 ./
```

To use `PYTHON_ISORT`:

```powershell
isort .
```

To use `PYTHON_MYPY`:

```powershell
mypy .
```

PyInk is not avalaible in format like, more about it here:
<https://github.com/google/pyink>

Ruff is a different linter, more like Prettier, more about it here:
<https://docs.astral.sh/ruff/linter/>

### Integrating with editor

It is highly recommended to install special plugins for this linters to gain more
control and view of mistakes and errors.
