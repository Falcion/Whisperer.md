# Version Mapping Schema

This document describes the schema for the `versions-mapping.json` file used in the
project.

## Structure

The `versions-mapping.json` file is a JSON object where each key is a version string,
and the value is an object containing the status and type of that version.

### Example

```json
{
  "<version>": {
    "status": "<status>",
    "type": "<type>"
  }
}
```

### Fields

- `<version>` (string): The version number, following semantic versioning (e.g.,
  1.0.0, 2.1.0, etc.).

#### Status

- "`supported`"\
   Indicates that the version is actively maintained.
- "`unsupported`"\
   Indicates that the version is no longer maintained.
- "`beta`"\
   Indicates that the version is in beta testing phase.
- "`skipped`"\
   Indicates that this version was skipped in the release cycle.

#### Type

- "`stable`"\
   Indicates a stable release that is ready for production use.
- "`beta`"\
   Indicates a prerelease version that may still have bugs.
- "`skipped`"\
   Indicates a version that was planned but not released.

### Icons

The following icons are used to represent the status and type visually:

- Supported: [`✅`]
- Unsupported: [`❎`]
- Beta: [`⚠️`]
- Skipped: [`⏭️`]
