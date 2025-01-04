"""
Clones venv (virtual environment) for PY from
one directory to another. d
"""

import os
import shutil
import subprocess

# Determine the root directory
root_dir = os.path.abspath(os.path.dirname(__file__))
scripts_venv_path = os.path.join(root_dir, "venv")
root_venv_path = os.path.join(root_dir, "../../", "venv")


def clone_venv(source, destination):
    """Clone a virtual environment from source to destination."""
    if not os.path.exists(source):
        print(f"Source virtual environment does not exist: {source}")
        return

    if os.path.exists(destination):
        print(f"Destination virtual environment already exists: {destination}")
        return

    print(f"Cloning virtual environment from {source} to {destination}...")

    try:
        shutil.copytree(source, destination, symlinks=True)
        print("Virtual environment cloned successfully.")
    except shutil.Error as e:
        print(f"Error cloning virtual environment: {e}")
        return

    # Update the virtual environment paths
    try:
        subprocess.check_call(
            [
                os.path.join(destination, "bin", "python"),
                "-m",
                "venv",
                destination,
            ]
        )
        print("Virtual environment paths updated successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error updating virtual environment paths: {e}")


if __name__ == "__main__":
    clone_venv(scripts_venv_path, root_venv_path)
