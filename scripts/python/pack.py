#!/usr/bin/env python3

"""
Script to compress a repository into a ZIP archive.

This script traverses the repository, excluding specific directories (e.g., .git),
and compresses the contents into a ZIP file.
"""

# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

import os
import zipfile

ROOT = "./../../"
PATH = os.path.join(ROOT, "scripts", "python")
ZIP_PATH = os.path.join(PATH, "BACKUP.zip")


def create_backup_zip(root: str, zip_path: str) -> None:
    """
    Compress the repository contents into a ZIP archive.

    Args:
        root (str): Root directory of the repository.
        zip_path (str): Path to the output ZIP file.

    Returns:
        None
    """
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for current_root, dirs, files in os.walk(root):
            if ".git" in dirs:
                dirs.remove(".git")  # Exclude .git directory
            for file in files:
                filepath = os.path.join(current_root, file)
                zip_file.write(filepath, os.path.relpath(filepath, root))


if __name__ == "__main__":
    create_backup_zip(ROOT, ZIP_PATH)
    print(f'Repository compressed into "{ZIP_PATH}" successfully.')
