This is a template for "hard" releases of the project, or rather their storage and
sending in parallel not only to the patchnote (changelog), but also to the release
notes at the same time, roughly speaking, this is a representation of the connection
of release notes with the changelog in an arbitrary form for the purpose of distributing
and storing the history of releases.

There is a methodology (methodology) for working with these files, their creation:

1. Files should be named in the semantic version of releases, more details (prefix
   `v` at personal discretion):\
   <https://semver.org/#semantic-versioning-200>
2. Files are divided into two parts: the release in your own words and the changelog
   clone:
3. In your own words, the retelling of the release is usually automated by LLMs,
   but manual retelling is welcomed;
4. The changelog does not change when copying from the original file (CHANGELOG.md),
   with the exception of extreme validation errors (broken links, etc.);
5. Repeating the version tag in the release file is NOT WELCOME, that's what the
   file name is for.
