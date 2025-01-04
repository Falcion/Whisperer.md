#!/usr/bin/env python3

"""
Module for copying specific files from a root directory to a target directory.
Includes error handling and interactive confirmation.
"""

import os
import shutil

# Define constants
ROOT = "./../../"
TARGET = "source"
COPIED_FILES = ["main.ts", "manifest.json"]


def confirm_copy():
    """
    Prompt the user to confirm the file copy operation.

    Returns:
        bool: True if the user confirms, False otherwise.
    """
    while True:
        response = (
            input("Do you want to copy the files? (Y/N): ").strip().upper()
        )

        return True if response == "Y" else "N"


def copy_files(root, target, files):
    """
    Copy a list of files from the root directory to the target directory.

    Args:
        root (str): Path to the root directory.
        target (str): Path to the target directory.
        files (list): List of filenames to copy.

    Returns:
        None
    """
    if not os.path.exists(target):
        os.makedirs(target)

    for file in files:
        filepath = os.path.join(root, file)
        copypath = os.path.join(target, file)

        try:
            shutil.copy(filepath, copypath)
            print(f'Entity "{file}" was copied to "{target}" successfully.')
        except FileNotFoundError:
            print(f"Entity {file} not found in the root directory.")
        except PermissionError:
            print(f"Permission denied while accessing {file}.")
        except (shutil.Error, OSError) as e:
            print(f"An unexpected error occurred while copying {file}: {e}")


def main():
    """
    Main function to initiate the copy process with user confirmation.
    """
    print("Welcome to the File Copy Tool.")
    if confirm_copy():
        try:
            copy_files(ROOT, TARGET, COPIED_FILES)
            print("Copy process completed successfully.")
        except (
            # pylint: disable=W0718
            Exception
            # pylint: enable
        ) as e:  # Avoid broad exception; add specific logging for debugging.
            print(f"Copy process aborted due to an error: {e}")
    else:
        print("Copy process canceled by the user.")


if __name__ == "__main__":
    main()
