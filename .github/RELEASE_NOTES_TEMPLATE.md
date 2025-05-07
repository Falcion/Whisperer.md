# Release Notes Template for Public Releases

> [!Note]
> This template is specifically designed for *public releases* displayed on the
> "Releases" page of a project hosted on GitHub. For "hard" templates, i.e., local
> release files stored in the repository, please refer to the following document:
>
> - [release/data/PATTERN.md](./../release/data/PATTERN.md)

The release notes template consists of several sections: the header, body (introduction,
body title, content), footer, and a separate technical section.

## Template Structure

### 1. Header

The header should represent the version tag of the release, following the semantic
versioning standard. The `v*` prefix is optional and depends on your technical requirements
or personal preference, as well as any suffixes used under the [SemVer](https://semver.org/)
specification.

### 2. Body of the Release

The body forms the core of the release notes and contains the following components:

#### 2.1. Introduction

This is a brief introduction or description of the release. It succinctly explains
the purpose or key aspects of the current version.

#### 2.2. Body Title

Unlike the technical header, this title is a descriptive, human-readable summary
of the release and its main content.

#### 2.3. Content

This section describes the implemented changes, fixes, and other updates. The content
can be presented either in **essay format** or as a **list**, depending on your
preference or audience.

#### 2.4. Footer

The footer typically includes a reference to the changelog or a link to the local
release version stored in the repository. This serves as a more technical publication
of the release’s changelog.

## Technical Guidelines for Releases and Patch Notes

To ensure proper management and publication of release notes, adhere to the following
best practices:

1. **Commit Management**
    Always monitor the last commit to which the release or tag will be attached.
    This ensures consistency and accuracy in versioning.
2. **Semantic Versioning**
    Understand and maintain the logical flow of version numbers according to semantic
    versioning. Verify their accuracy before publication.
3. **Pre-release Tags**
    Avoid using "pre-release" tags unless necessary. These are suitable for development
    versions, beta releases, or other testing phases.
4. **Target Branch**
    Set the release target (target menu upon release) to the **default branch**
    of your project.
   - **Exceptions:** This rule can only be violated if explicitly documented as
   part of the workflow (e.g., Public Beta Environment releases).
5. **Attachments**
   If your project does not require attached files for releases, follow these guidelines:
   - **Patches:** Never attach binary files.
   - **Minor Versions:** Attach files only when necessary.
   - **Major Versions:** Always attach files to provide comprehensive context and
     resources.
6. **Proper Use of Tags**
    Use tags in accordance with their purpose. If there are no external requirements,
    prioritize tags based on SemVer and any automated release systems integrated
    into your workflow.
    **Do not forget to use "set as the latest release" parameter upon creating release.**

## Example of Release Notes Using This Template

Below is an example illustrating how to use this template for a specific release:

```md
# 3.0.0

This update is the largest update in this plugin and probably forever to be fixed as the largest update in the history of the plugin, the number of innovations and other things exceeds the ability to write a patch note, so let's go in brief.

## Major update: implementing code editor and many other things

### Code editor

The plugin now allows you to literally edit code with syntax highlighting, including all the necessary parameters to customize the interface, from minimapping to ligatures and font assignments.

- **now you can also edit fence (code) blocks as code files!**

### Localization support

Now the plugin "FULLY" supports all languages that are in the app, you can make a translation into your language and integrate it into the plugin and every visual element of it would be translated.

### Backward compatibility

Now the plugin, with the backward compatibility module enabled, tries to adapt your settings from older versions of the plugin to the newer ones: sometimes can be broken.

### Official wiki

The plugin has reached such a size that it needs separate documentation and a wikipedia explaining some things and its separate functionality: the ultimate goal of the wikipedia is to become a knowledge base not only for the plugin, but also with related things.

**WIKIPEDIA IS STILL IN DEVELOPMENT.**

### Bugfixes and optimizations

Some popular plugins, issues, and implicit optimization problems (like spamming errors like in #70 or memory overload in extension registration) have been fixed.

### And even more

> [!Important]
> Read more about what has been introduced to the plugin in the special release note:
> https://github.com/Falcion/UNITADE.md/blob/main/data/release/v3.0.0.md
