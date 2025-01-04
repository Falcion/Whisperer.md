#!/usr/bin/env python3

"""
A script to import and apply patches to a Git repository.

This script reads patches from a specified directory and applies them to the
current Git repository. Optionally, it supports 3-way merging to resolve conflicts.
"""

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.

import argparse
import sys

from lib import git  # type: ignore
from lib.patches import patch_from_dir


def main(argv) -> int:
    """
    Main entry point for the script.

    Args:
        argv (list): Command-line arguments.

    Returns:
        int: Exit code (0 for success, non-zero for failure).
    """
    parser = argparse.ArgumentParser(
        description="Apply patches to the current Git repository."
    )
    parser.add_argument(
        "patch_dir", help="Directory containing patches to apply."
    )
    parser.add_argument(
        "-3",
        "--3way",
        action="store_true",
        dest="threeway",
        help="Use 3-way merge to resolve conflicts.",
    )
    args = parser.parse_args(argv)

    git.import_patches(
        repo=".",
        patch_data=patch_from_dir(args.patch_dir),
        threeway=args.threeway,
    )

    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
