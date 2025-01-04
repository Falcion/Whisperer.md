#!/usr/bin/env python3

"""Scripts module related to working with patches metadata."""

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.

import codecs
import os


def read_patch(patch_dir, patch_filename) -> str:
    """Read a patch from |patch_dir/filename| and amend the commit message with
    metadata about the patch file it came from."""
    ret = []
    added_filename_line = False
    patch_path = os.path.join(patch_dir, patch_filename)
    with codecs.open(patch_path, encoding="utf-8") as file:
        for line in file.readlines():
            line_has_correct_start = line.startswith(
                "diff -"
            ) or line.startswith("---")
            if not added_filename_line and line_has_correct_start:
                ret.append(f"Patch-Filename: {patch_filename}\n")
                added_filename_line = True
            ret.append(line)
    return "".join(ret)


def patch_from_dir(patch_dir) -> str:
    """Read a directory of patches into a format suitable for passing to
    'git am'"""
    with open(os.path.join(patch_dir, ".patches"), encoding="utf-8") as file:
        patch_list = [line.rstrip("\n") for line in file.readlines()]

    return "".join(
        [
            read_patch(patch_dir, patch_filename)
            for patch_filename in patch_list
        ]
    )
