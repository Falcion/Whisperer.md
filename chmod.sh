#!/bin/bash
git config core.fileMode true

git update-index --chmod=+x ./.husky/pre-commit
git add --chmod=+x ./.husky/pre-commit
chmod +x ./.husky/pre-commit

git update-index --chmod=+x ./kubernetes/install.sh
git add --chmod=+x ./kubernetes/install.sh
chmod +x ./kubernetes/install.sh

git update-index --chmod=+x ./prepare.sh
git add --chmod=+x ./prepare.sh
chmod +x ./prepare.sh

git update-index --chmod=+x ./kubernetes/deinstall.sh
git add --chmod=+x ./kubernetes/deinstall.sh
chmod +x ./kubernetes/deinstall.sh

git update-index --chmod=+x ./scripts/shell/publish-npm.sh
git add --chmod=+x ./scripts/shell/publish-npm.sh
chmod +x ./scripts/shell/publish-npm.sh

git update-index --chmod=+x ./scripts/shell/publish-nuget.sh
git add --chmod=+x ./scripts/shell/publish-nuget.sh
chmod +x ./scripts/shell/publish-nuget.sh

git update-index --chmod=+x ./chmod.sh
git add --chmod=+x ./chmod.sh
chmod +x chmod.sh

git add .
git commit -m "chore: auto-lint for bash script"
git config core.fileMode false
