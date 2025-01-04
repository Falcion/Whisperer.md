"""
run_clang_format.py

This script is a wrapper for `clang-format`, providing functionality to list files,
generate diffs, and optionally fix files in place according to the specified style.
"""

import argparse
import difflib
import multiprocessing
import os
import subprocess
import sys
from typing import List, Optional, Tuple


class DiffError(Exception):
    """Raised when there is an error generating diffs."""


class UnexpectedError(Exception):
    """Raised for unexpected errors."""


def list_files(
    paths: List[str],
    extensions: List[str],
    exclude: Optional[List[str]] = None,
    recursive: bool = False,
) -> List[str]:
    """
    Lists files matching given extensions, excluding specified paths.
    """
    matched_files = []
    exclude = exclude or []
    for path in paths:
        if os.path.isfile(path):
            if any(path.endswith(ext) for ext in extensions):
                matched_files.append(path)
        elif os.path.isdir(path):
            for root, _, files in os.walk(path):
                for file in files:
                    full_path = os.path.join(root, file)
                    if any(
                        full_path.endswith(ext) for ext in extensions
                    ) and not any(ex in full_path for ex in exclude):
                        matched_files.append(full_path)
                if not recursive:
                    break
    return matched_files


def make_diff(file_path: str, style: str = "file") -> Optional[str]:
    """
    Generates a diff for a given file based on the specified style.
    """
    try:
        with open(file_path, "rb") as f:
            original_content = f.read()

        process = subprocess.run(
            ["clang-format", f"--style={style}", file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
        )
        formatted_content = process.stdout

        if original_content != formatted_content:
            original_lines = original_content.decode("utf-8").splitlines(
                keepends=True
            )
            formatted_lines = formatted_content.decode("utf-8").splitlines(
                keepends=True
            )
            diff = "".join(
                difflib.unified_diff(
                    original_lines,
                    formatted_lines,
                    fromfile=f"{file_path} (original)",
                    tofile=f"{file_path} (formatted)",
                )
            )
            return diff
    except subprocess.CalledProcessError as e:
        raise DiffError(
            f"Error formatting {file_path}: {e.stderr.decode('utf-8')}"
        ) from e
    except Exception as e:
        raise UnexpectedError(
            f"Unexpected error for {file_path}: {str(e)}"
        ) from e
    return None


def colorize_diff(diff: str) -> str:
    """
    Adds color to diffs using ANSI escape codes.
    """
    color_diff = []
    for line in diff.splitlines():
        if line.startswith("+") and not line.startswith("+++"):
            color_diff.append(f"\033[32m{line}\033[0m")  # Green for additions
        elif line.startswith("-") and not line.startswith("---"):
            color_diff.append(f"\033[31m{line}\033[0m")  # Red for deletions
        else:
            color_diff.append(line)
    return "\n".join(color_diff)


def process_file(file_path: str, args) -> Tuple[str, Optional[str]]:
    """
    Processes a single file to generate a diff or apply formatting.
    """
    if args.fix:
        try:
            subprocess.run(
                ["clang-format", f"--style={args.style}", "-i", file_path],
                stderr=subprocess.PIPE,
                check=True,
            )
            return file_path, None
        except subprocess.CalledProcessError as e:
            raise DiffError(
                f"Error fixing {file_path}: {e.stderr.decode('utf-8')}"
            ) from e
    else:
        return file_path, make_diff(file_path, args.style)


def main() -> int:
    """
    Entry point for the script. Parses arguments, processes files, and outputs results.
    """
    parser = argparse.ArgumentParser(description="Wrapper for clang-format.")
    parser.add_argument(
        "paths", nargs="+", help="Paths to files or directories."
    )
    parser.add_argument(
        "--extensions",
        nargs="+",
        default=[".c", ".cpp", ".h"],
        help="File extensions to format.",
    )
    parser.add_argument(
        "--exclude", nargs="*", default=[], help="Paths to exclude."
    )
    parser.add_argument(
        "--style", default="file", help="Formatting style to use."
    )
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="Recursively search directories.",
    )
    parser.add_argument(
        "--fix", action="store_true", help="Fix files in place."
    )
    parser.add_argument(
        "--color",
        choices=["always", "never", "auto"],
        default="auto",
        help="Colorize diffs.",
    )

    args = parser.parse_args()

    files = list_files(
        args.paths, args.extensions, args.exclude, args.recursive
    )
    if not files:
        print("No matching files found.", file=sys.stderr)
        sys.exit(1)

    use_color = args.color == "always" or (
        args.color == "auto" and sys.stdout.isatty()
    )

    with multiprocessing.Pool() as pool:
        results = pool.starmap(process_file, [(file, args) for file in files])

    for _, diff in results:
        if diff:
            if use_color:
                diff = colorize_diff(diff)
            print(diff)

    return 0


if __name__ == "__main__":
    main()
