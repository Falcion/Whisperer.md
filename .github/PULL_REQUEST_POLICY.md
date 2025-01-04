Learn about pull requests (hereinafter referred to as “PR” or “PRs” in the plural)
on this repository and our policy around them, PRs communicate changes to a branch
in a repository. Once a pull request is opened, you can review changes with collaborators
and add follow-up commits.

# About pull requests

A pull request (or “PR”) is a proposal to merge a set of changes from one branch
into another, in a PR, collaborators can review and discuss the proposed set of
changes before they integrate the changes into the main codebase.

PRs display the differences, or diffs, between the content in the source branch
and the content in the target branch.

> [!Note]
> When working with pull requests, keep the following in mind:
>
> - If you're working in the shared repository model, we recommend that you use a
>   topic branch for your pull request: while you can send pull requests from any
>   branch or commit, with a topic branch you can push follow-up commits if you
>   need to update your proposed changes.\
>   <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models/>
> - Be very careful when force pushing commits to a pull request, force pushing
>   changes the repository history and can corrupt your pull request, if other collaborators
>   branch the project before a force push, the force push may overwrite commits
    that collaborators based their work on.

For more information about PRs check:
<https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests/>

# Quality feedback for pull requests

High-quality reviews start with high-quality feedback, here are some keys to great
PR feedback:

- pull request owner should have the right people review the PR, and make sure that
  reviewers know what the code does;
- reviewers should give actionable, constructive feedback;
- owners and reviewers should comment and reply quickly;

Owner of the pull request should:

- make sure to select the right reviewers to assign to a pull request;
- include reviewers that know how the code works;
- ask developers working in other areas to share their ideas;
- give a clear description of changes;
- provide reviewer guidance with pull request templates:\
  <https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-templates>
- provide a build of the code with the fix or feature running in it;
- reply to comments, accepting the suggestion or explaining why the suggested change
  isn't ideal;
- for good suggestions outside the scope of the pull request, create new work items,
  branches, and PRs to make those changes.

Reviewers should do the following tasks:

- provide feedback on changes they don't agree with;
- identify issues and give specific suggestions on what to do differently;
- make sure the feedback has clear intent and is easy to understand;
- leave comments or vote on changes:\
  <https://learn.microsoft.com/en-us/azure/devops/repos/git/review-pull-requests>

# Attribution

This policy was inspired by:

- <https://learn.microsoft.com/en-us/azure/devops/repos/git/about-pull-requests/>
- <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests/>
