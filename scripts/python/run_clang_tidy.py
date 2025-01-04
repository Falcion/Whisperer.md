"""
A script to run clang-tidy on specified files in a project. It handles the setup of the environment,
generates the necessary compile commands, and executes clang-tidy on the provided source files.
"""

import argparse
import json
import os
import subprocess
import sys
from typing import Dict, List, Optional

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.

SOURCE_ROOT = os.path.dirname(os.path.abspath(__file__))
LLVM_BIN = os.path.abspath(
    os.path.join(
        SOURCE_ROOT,
        "..",
        "third_party",
        "llvm-build",
        "Release+Asserts",
        "bin",
    )
)
PLATFORM = sys.platform


class ErrorWithExitCode(Exception):
    """
    Custom exception that holds an exit code to be used when the program terminates with an error.
    """

    def __init__(self, message: str, exit_code: int):
        super().__init__(message)
        self.exit_code = exit_code


def spawn_async(
    command: List[str], options: Optional[dict] = None
) -> Dict[str, str]:
    """
    Spawns an asynchronous subprocess to run a command and captures its output and error messages.

    Args:
        command: A list of strings representing the command and its arguments.
        options: Additional options passed to subprocess.Popen.

    Returns:
        A dictionary containing the stdout, stderr, and return code of the process.
    """
    if options is None:
        options = {}

    try:
        with subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **options
        ) as process:
            stdout, stderr = process.communicate()
            status = process.returncode
            return {
                "stdout": stdout.decode(),  # type: ignore
                "stderr": stderr.decode(),  # type: ignore
                "status": str(status),
            }
    except Exception as e:
        raise e


def get_depot_tools_env() -> Dict[str, str]:
    """
    Retrieve the environment variables required for depot tools.

    Returns:
        A dictionary with the appropriate environment variables.

    Raises:
        ErrorWithExitCode: If depot tools cannot be located or configured.
    """

    def find_depot_tools_on_path() -> Optional[dict]:
        try:
            result = subprocess.run(
                ["where" if PLATFORM == "win32" else "which", "gclient"],
                capture_output=True,
                check=True,
            )
            if result.returncode == 0:
                return dict(os.environ)
        except subprocess.CalledProcessError:
            pass
        return None

    def check_for_build_tools() -> Optional[dict]:
        try:
            result = subprocess.run(
                ["electron-build-tools", "show", "env", "--json"],
                capture_output=True,
                shell=True,
                check=True,
            )
            if result.returncode == 0:
                return {
                    **os.environ,
                    **json.loads(result.stdout.decode().strip()),
                }
        except subprocess.CalledProcessError:
            pass
        return None

    depot_tools_env = find_depot_tools_on_path() or check_for_build_tools()
    if not depot_tools_env:
        raise ErrorWithExitCode(
            "Couldn't find depot_tools, ensure it's on your PATH", 1
        )

    if "CHROMIUM_BUILDTOOLS_PATH" not in depot_tools_env:
        raise ErrorWithExitCode(
            "CHROMIUM_BUILDTOOLS_PATH environment variable must be set", 1
        )

    return depot_tools_env


def run_clang_tidy(
    out_dir: str, filenames: List[str], checks: str = ""
) -> bool:
    """
    Run clang-tidy on specified files.

    Args:
        out_dir: Path to the output directory containing the compile_commands.json file.
        filenames: List of file paths to run clang-tidy on.
        checks: Optional string specifying the checks to enable.

    Returns:
        True if clang-tidy completes successfully; False otherwise.
    """
    cmd = os.path.join(LLVM_BIN, "clang-tidy")
    args = [f"-p={out_dir}", "--use-color"]

    if checks:
        args.append(f"--checks={checks}")

    try:
        for file in filenames:
            subprocess.run([cmd, *args, file], check=True)
        return True
    except subprocess.CalledProcessError:
        return False


def parse_command_line() -> argparse.Namespace:
    """
    Parse command-line arguments.

    Returns:
        Namespace object containing parsed arguments.
    """
    parser = argparse.ArgumentParser(description="Run clang-tidy.")
    parser.add_argument(
        "-j", "--jobs", type=int, default=1, help="Number of parallel jobs"
    )
    parser.add_argument("--checks", type=str, default="", help="Checks to run")
    parser.add_argument(
        "--out-dir", type=str, required=True, help="Output directory"
    )
    parser.add_argument("files", nargs="*", help="Files to run clang-tidy on")
    return parser.parse_args()


def main() -> int:
    """
    Main entry point for the script.

    Returns:
        Exit code indicating success or failure.
    """
    try:
        args = parse_command_line()
        out_dir = os.path.abspath(args.out_dir)

        if not os.path.exists(out_dir):
            raise ErrorWithExitCode("Output directory doesn't exist", 1)

        env = get_depot_tools_env()

        result = subprocess.run(
            ["gn", "gen", ".", "--export-compile-commands"],
            cwd=out_dir,
            env=env,
            shell=True,
            capture_output=True,
            check=True,
        )

        if result.returncode != 0:
            stderr = result.stderr.decode() if result.stderr else ""
            raise ErrorWithExitCode(
                f"Failed to automatically generate compile_commands.json for output directory: {stderr}",
                2,
            )

        filenames = args.files
        if not filenames:
            print("No files specified. Please provide file paths.")
            return 1

        return 0 if run_clang_tidy(out_dir, filenames, args.checks) else 1
    except ErrorWithExitCode as e:
        print(f"ERROR: {e}")
        return e.exit_code


if __name__ == "__main__":
    sys.exit(main())
