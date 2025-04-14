"""
This script updates the unsupported versions markdown file and GitHub issue templates
based on version tags and a mapping of version statuses. It retrieves Git tags, generates
a markdown table of versions with their maintenance statuses, and updates issue templates
to include the available versions as dropdown options.
"""

import json
import os
import subprocess
from typing import Dict, List

# pylint: disable=E0401
import yaml

# MIT License
# Copyright (c) Falcion 2023-2024
# Free to share, use or change.

CONFIG = {
    "VERSIONS_TABLE": "UNSUPPORTED_VERSIONS.md",
    "VERSIONS_MAPPING": "versions-mapping.json",
    "URL": "https://github.com/Falcion/Patternugit/tree/",
    # This is a path to root directory from scripts path,
    # keep in mind, that this path related only if script
    # is in this directory: ~/scripts/python/
    "ROOT_PATH": "./../../",
    "ISSUE_TEMPLATES": ".github/ISSUE_TEMPLATE/",
}

AUTO_GENERATED_LINES = [
    "<!-- markdownlint-disable -->\n",
    "# THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n",
]


def get_git_tags() -> List[str]:
    """
    Retrieve a sorted list of Git tags from the repository.

    Returns:
        List[str]: A sorted list of Git tags, or an empty list if tags cannot be retrieved.
    """
    try:
        tags = (
            subprocess.check_output(["git", "tag"])
            .decode("utf-8")
            .strip()
            .split("\n")
        )
        return sorted(tags)
    except subprocess.CalledProcessError:
        print("Error: Unable to retrieve tags from the Git repository.")
        return []


def load_versions_mapping() -> Dict[str, dict]:
    """
    Load version mappings from the `versions-mapping.json` file.

    Returns:
        Dict[str, dict]: A dictionary of version mappings, or an empty dictionary if the file is missing.
    """
    if os.path.exists(CONFIG["ROOT_PATH"] + CONFIG["VERSIONS_MAPPING"]):
        with open(
            CONFIG["ROOT_PATH"] + CONFIG["VERSIONS_MAPPING"],
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)
    return {}


def create_markdown_table(
    tags: List[str], versions_mapping: Dict[str, dict]
) -> str:
    """
    Generate a markdown table of versions and their maintenance statuses.

    Args:
        tags (List[str]): List of Git tags.
        versions_mapping (Dict[str, dict]): Mapping of version tags to their statuses.

    Returns:
        str: The generated markdown table as a string.
    """
    table_lines = AUTO_GENERATED_LINES
    table_lines.append(
        "| Version                                                                 | Maintenance |"
    )
    table_lines.append(
        "|-------------------------------------------------------------------------|-------------|"
    )

    for tag in tags:
        maintenance_status = "❎"
        version_info = versions_mapping.get(tag, {})

        if version_info:
            status = version_info.get("status", "")
            if status == "supported":
                maintenance_status = "✅"
            elif status == "beta":
                maintenance_status = "⚠️"
            elif status == "skipped":
                maintenance_status = "⏭️"

        line = f"| [{tag}]({CONFIG['URL']}{tag})            | {maintenance_status}          |"
        table_lines.append(line)

    return "\n".join(table_lines)


def write_markdown_file(content: str) -> None:
    """
    Write the generated markdown content to the `UNSUPPORTED_VERSIONS.md` file.

    Args:
        content (str): The content to write to the file.
    """
    with open(
        CONFIG["ROOT_PATH"] + CONFIG["VERSIONS_TABLE"], "w", encoding="utf-8"
    ) as f:
        f.write(content)


def update_issue_templates(tags: List[str]) -> None:
    """
    Update GitHub issue templates with the provided version tags.

    Args:
        tags (List[str]): List of Git tags to add to issue templates.
    """
    if not os.path.exists(CONFIG["ROOT_PATH"] + CONFIG["ISSUE_TEMPLATES"]):
        print("Warning: Issue template directory not found.")
        return

    for filename in os.listdir(
        CONFIG["ROOT_PATH"] + CONFIG["ISSUE_TEMPLATES"]
    ):
        filepath = os.path.join(
            CONFIG["ROOT_PATH"] + CONFIG["ISSUE_TEMPLATES"], filename
        )
        if not filename.endswith(".yaml") and not filename.endswith(".yml"):
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            template: dict = yaml.safe_load(f)

        updated = False

        for block in template.get("body", []):
            if (
                block.get("type") == "dropdown"
                and block.get("id") == "version"
            ):
                block["attributes"]["options"] = list(reversed(tags)) + [
                    "Another or unknown"
                ]
                updated = True
                break

        if updated:
            with open(filepath, "w", encoding="utf-8") as f:
                yaml.dump(template, f, sort_keys=False)
            print(f"Updated {filepath} with new version tags.")


def main() -> int:
    """
    Main entry point for the script. Updates the markdown file and issue templates
    with the latest version tags and their statuses.

    Returns:
        int: Exit status code (0 for success).
    """
    tags = get_git_tags()
    versions_mapping = load_versions_mapping()
    markdown_content = create_markdown_table(tags, versions_mapping)
    write_markdown_file(markdown_content)
    update_issue_templates(tags)
    return 0


if __name__ == "__main__":
    main()
