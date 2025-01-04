#!/usr/bin/env python3

"""Utils module."""

import contextlib
import errno
import json
import os
import platform
import shutil
import subprocess
import sys
import zipfile
from urllib.request import urlopen

from lib.config import verbose_mode_print  # type: ignore

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.


ELECTRON_DIR = os.path.abspath(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
)
TS_NODE = os.path.join(ELECTRON_DIR, "node_modules", ".bin", "ts-node")
SRC_DIR = os.path.abspath(os.path.join(__file__, "..", "..", "..", ".."))

if sys.platform in ["win32", "cygwin"]:
    TS_NODE += ".cmd"


@contextlib.contextmanager
def scoped_cwd(path):
    """Context manager for changing the working directory."""
    cwd = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(cwd)


def download(text, url, path):
    """Download a file from a URL and save it to the given path."""
    safe_mkdir(os.path.dirname(path))
    with open(path, "wb") as local_file, urlopen(url) as web_file:
        print(f"Downloading {url} to {path}")
        info = web_file.info()
        if hasattr(info, "getheader"):
            file_size = int(info.getheaders("Content-Length")[0])
        else:
            file_size = int(info.get("Content-Length")[0])
        downloaded_size = 0
        block_size = 4096

        ci = os.environ.get("CI") is not None

        while True:
            buf = web_file.read(block_size)
            if not buf:
                break

            downloaded_size += len(buf)
            local_file.write(buf)

            if not ci:
                percent = downloaded_size * 100.0 / file_size
                status = f"\r{text}  {downloaded_size:10d}  [{percent:3.1f}%]"
                print(status, end=" ")

        if ci:
            print(f"{text} done.")
        else:
            print()
    return path


def make_zip(zip_file_path, files, dirs):
    """Create a ZIP archive containing the specified files and directories."""
    safe_unlink(zip_file_path)
    if sys.platform == "darwin":
        allfiles = files + dirs
        execute(["zip", "-r", "-y", zip_file_path] + allfiles)
    else:
        with zipfile.ZipFile(
            zip_file_path, "w", zipfile.ZIP_DEFLATED, allowZip64=True
        ) as zip_file:
            for filename in files:
                zip_file.write(filename, filename)
            for dirname in dirs:
                for root, _, filenames in os.walk(dirname):
                    for f in filenames:
                        zip_file.write(os.path.join(root, f))
            zip_file.close()


def rm_rf(path):
    """Recursively delete a directory."""
    try:
        shutil.rmtree(path)
    except OSError:
        pass


def safe_unlink(path):
    """Delete a file if it exists."""
    try:
        os.unlink(path)
    except OSError as e:
        if e.errno != errno.ENOENT:
            raise


def safe_mkdir(path):
    """Create a directory if it doesn't already exist."""
    try:
        os.makedirs(path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise


def execute(argv, env=None, cwd=None):
    """Execute a shell command."""
    if env is None:
        env = os.environ
    verbose_mode_print(" ".join(argv))
    try:
        output = subprocess.check_output(
            argv, stderr=subprocess.STDOUT, env=env, cwd=cwd
        )
        verbose_mode_print(output.decode("utf-8").strip())
        return output
    except subprocess.CalledProcessError as e:
        print(e.output)
        raise e


def get_electron_branding():
    """Retrieve Electron branding information."""
    source_root = os.path.abspath(os.path.join(__file__, "..", "..", ".."))
    branding_file_path = os.path.join(
        source_root, "shell", "app", "BRANDING.json"
    )
    with open(branding_file_path, encoding="utf-8") as file_in:
        return json.load(file_in)


CACHED_ELECTRON_VERSION = None


def get_electron_version():
    """Get the Electron version."""
    global CACHED_ELECTRON_VERSION  # pylint: disable=W0603
    if CACHED_ELECTRON_VERSION is None:
        CACHED_ELECTRON_VERSION = str.strip(
            execute(
                [
                    "node",
                    "-p",
                    'require("./script/lib/get-version").getElectronVersion()',
                ],
                cwd=ELECTRON_DIR,
            ).decode()
        )
    return CACHED_ELECTRON_VERSION


def store_artifact(prefix, key_prefix, files):
    """Store an artifact in Azure Storage."""
    azput(prefix, key_prefix, files)


def azput(prefix, key_prefix, files):
    """Upload files to Azure Storage."""
    env = os.environ.copy()
    output = execute(
        [
            "node",
            os.path.join(os.path.dirname(__file__), "azput.js"),
            "--prefix",
            prefix,
            "--key_prefix",
            key_prefix,
        ]
        + files,
        env,
    )
    print(output)


def get_out_dir():
    """Get the output directory."""
    out_dir = "Default"
    override = os.environ.get("ELECTRON_OUT_DIR")
    if override is not None:
        out_dir = override
    return os.path.join(SRC_DIR, "out", out_dir)


def get_dist_dir():
    """Get the distribution directory."""
    return os.path.join(get_out_dir(), "gen", "electron_dist")


def get_electron_exec():
    """Get the path to the Electron executable."""
    out_dir = get_out_dir()

    if sys.platform == "darwin":
        return f"{out_dir}/Electron.app/Contents/MacOS/Electron"
    if sys.platform == "win32":
        return f"{out_dir}/electron.exe"
    if sys.platform == "linux":
        return f"{out_dir}/electron"

    raise NotImplementedError(
        f"get_electron_exec: unexpected platform '{sys.platform}'"
    )


def get_buildtools_executable(name):
    """Get the path to a BuildTools executable."""
    buildtools = os.path.realpath(
        os.path.join(ELECTRON_DIR, "..", "buildtools")
    )

    if sys.platform == "darwin":
        chromium_platform = (
            "mac_arm64" if platform.machine() == "arm64" else "mac"
        )
    elif sys.platform in ["win32", "cygwin"]:
        chromium_platform = "win"
    elif sys.platform in ["linux", "linux2"]:
        chromium_platform = "linux64"
    else:
        raise NotImplementedError(f"Unsupported platform: {sys.platform}")

    if name == "clang-format":
        chromium_platform += "-format"

    path = os.path.join(buildtools, chromium_platform, name)
    if sys.platform == "win32":
        path += ".exe"
    return path


def get_depot_tools_executable(name):
    """Get the path to a Depot Tools executable."""
    buildtools = os.path.realpath(
        os.path.join(ELECTRON_DIR, "..", "third_party", "depot_tools")
    )

    path = os.path.join(buildtools, name)
    if sys.platform == "win32":
        path += ".bat"
    return path


def get_linux_binaries():
    """Get the list of Linux binary files."""
    return [
        "chrome-sandbox",
        "chrome_crashpad_handler",
        get_electron_branding()["project_name"],
        "libEGL.so",
        "libGLESv2.so",
        "libffmpeg.so",
        "libvk_swiftshader.so",
    ]
