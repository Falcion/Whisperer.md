"""
A script to format GN files using the GN formatter.

This script formats each GN file specified as a command-line argument.
It configures the environment to use the correct build tools and invokes the GN formatter.
"""

import os
import subprocess
import sys

from lib.util import get_buildtools_executable  # type: ignore

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.

SOURCE_ROOT = os.path.dirname(os.path.dirname(__file__))


def main() -> int:
    """
    Runs the GN formatter on multiple files.

    This function sets up the required environment variables, locates the GN executable,
    and formats each GN file provided as a command-line argument.

    Returns:
        int: Exit code (0 for success, non-zero for failure).
    """
    new_env = os.environ.copy()
    new_env["DEPOT_TOOLS_WIN_TOOLCHAIN"] = "0"
    new_env["CHROMIUM_BUILDTOOLS_PATH"] = os.path.realpath(
        os.path.join(SOURCE_ROOT, "..", "buildtools")
    )

    gn_path = get_buildtools_executable("gn")
    for gn_file in sys.argv[1:]:
        subprocess.check_call([gn_path, "format", gn_file], env=new_env)
    return 0


if __name__ == "__main__":
    sys.exit(main())
