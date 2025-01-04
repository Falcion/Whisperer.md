#!/usr/bin/env python3
"""
This module contains configuration utilities for platform detection, architecture management,
and verbose mode handling.
"""

import os
import sys

# Platform mappings based on the `sys.platform` value.
PLATFORM = {
    "cygwin": "win32",
    "msys": "win32",
    "darwin": "darwin",
    "linux": "linux",
    "linux2": "linux",
    "win32": "win32",
}[sys.platform]

VERBOSE_MODE = False


def get_platform_key():
    """
    Get the platform key for the current system.
    Returns "mas" if the "MAS_BUILD" environment variable is set, otherwise the platform name.

    Returns:
        str: The platform key.
    """
    if "MAS_BUILD" in os.environ:
        return "mas"
    return PLATFORM


def get_target_arch():
    """
    Get the target architecture for the build.

    Returns:
        str: The target architecture (default is "x64").
    """
    arch = os.environ.get("TARGET_ARCH")
    return arch if arch else "x64"


def set_verbose_mode(mode):
    """
    Enable or disable verbose mode.

    Args:
        mode (bool): True to enable verbose mode, False to disable it.
    """
    print("Running in verbose mode" if mode else "Verbose mode disabled")
    # Necessary to modify the global variable.
    global VERBOSE_MODE  # pylint: disable=W0603
    VERBOSE_MODE = mode


def is_verbose_mode():
    """
    Check if verbose mode is enabled.

    Returns:
        bool: True if verbose mode is enabled, False otherwise.
    """
    return VERBOSE_MODE


def verbose_mode_print(output):
    """
    Print a message only if verbose mode is enabled.

    Args:
        output (str): The message to print.
    """
    if VERBOSE_MODE:
        print(output)


def get_zip_name(name, version, suffix=""):
    """
    Generate a zip file name based on the project name, version, platform, and architecture.

    Args:
        name (str): The project name.
        version (str): The project version.
        suffix (str, optional): Additional suffix for the zip name. Defaults to "".

    Returns:
        str: The generated zip file name.
    """
    arch = get_target_arch()
    if arch == "arm":
        arch += "v7l"
    zip_name = f"{name}-{version}-{get_platform_key()}-{arch}"
    if suffix:
        zip_name += f"-{suffix}"
    return f"{zip_name}.zip"
