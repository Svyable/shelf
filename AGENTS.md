# AGENTS.md

Rules for AI agents working in this repository.

Before changing files, read `.agents/README.md` for the repository's public
semantic map, canonical-source order, publication semantics, and discovery
vocabulary.

## Scope

- Do only what was asked. Do not rewrite neighboring chapters, "clean up"
  prose, or reformat files you were not told to touch.
- One chapter per pull request. If a task spans books or chapters, stop and
  split the work.
- When you add, rename, or remove a chapter, update that book's README
  table of contents and the Chapters count in the same change.
- When you add a book, add its slug to the Book dropdown in
  `.github/ISSUE_TEMPLATE/chapter-feedback.yml` in the same change.
- Do not put book prose in `reader/`. The reader fetches Markdown from
  `books/<slug>/`. Authors and agents only edit Markdown and `media/`.

## Desk / Shelf boundary

This repository is the **public Shelf**. It contains released publication
snapshots. Drafts and the next revision of a published book belong on the
private Desk.

Desk and Shelf are separate Git repositories. Shelf does not reference,
submodule, symlink, mount, or fetch manuscript files from Desk at runtime.
A normal release copies a committed Desk snapshot into Shelf; after that the
copies are independent until the next release.

Normal manuscript flow is **Desk → Shelf**. Do not create a two-way sync.
Shared `reader/` and `desk/` UI is copied separately from the Bookself platform.

## Local-first publishing

Bookself publishing must remain functional without GitHub Actions. A normal
release is prepared locally on Desk with Git and Python's standard library,
then reviewed and committed here. Do not introduce a requirement for a private
Desk Actions job, hosted build artifact, or deployment runner.

This Shelf's Reader is static and should remain no-build by default. GitHub
Pages is the delivery surface for committed files, not a reason to add an
Actions-based build pipeline.

## Voice

- For book, essay, narrative, or other voice-sensitive prose tasks, read and
  apply `.agents/skills/human-prose/SKILL.md` before drafting, reviewing, or
  editing.
- Preserve the author's voice, tense, and rhythm. Match the surrounding
  sentences, not a house style you brought with you.
- Do not substitute synonyms "for clarity" unless the author asked for that.
- Do not add headings, lists, or emphasis the surrounding chapter does not
  already use.

## Markdown

- Chapters are a single `# Title` heading, then paragraphs. No YAML front
  matter. No HTML comments in chapter files.
- Book READMEs are an info table plus a checkbox table of contents. No YAML
  front matter.
- Follow existing naming: `books/<slug>/`, `chNN-slug.md`, `front-matter.md`,
  `back-matter.md`.
- Images live in that book's `media/` folder and are referenced with
  relative links (`![alt](../media/figure-1.png)`).

## Do not

- Do not touch `LICENSE` or change licensing without the repository owner's
  explicit approval.
- Do not reformat a file wholesale (line wrapping, heading levels, quote
  style) as a drive-by.
- Do not add a build step, CODEOWNERS, or branch protection unless a human
  asked for that by name.
- Do not make publication depend on GitHub Actions, especially a private Desk
  workflow or paid automation minutes.
- Do not change GitHub Pages source away from the repository root, or add a
  custom domain, unless a human asked.
- Do not commit secrets or credentials.
- Do not add private drafts or next-edition work to this public repository.
- Do not change a released book to `Drafting` or `Revision in progress` merely
  to revise it. That can hide it from the Reader while leaving the files public.
- Do not revise a released manuscript in place unless a human explicitly asks
  for a live public hotfix or an intentionally public proof.

## Verbs (author and agent)

These are the public lifecycle operations.

**Receive a release.** The normal path begins on the private Desk with
`scripts/release-book.sh <slug> ../shelf`. That command runs locally, prepares
an exact replacement publication snapshot here, sets the Shelf copy to
`Published`, adds or updates the root **The books** row, verifies copied
publication files against the committed Desk snapshot, and stops before
commit or push. Review and land that prepared Shelf change through normal Git;
a pull request is useful but not required by Bookself itself.

**Publish.** A released publication has the exact Status `Published` and one
root README row under **The books**. Normally both are prepared together by the
Desk release command. Do not change only one side.

**Preview a public proof.** Only when a human explicitly intends a public,
unlisted proof may a non-published publication live here. Its direct Reader URL
and raw Git files are public even when it is absent from the visible shelf.
Never describe an unlisted Shelf proof as private.

**Revise a published book.** Leave this Shelf snapshot unchanged. Revise and
commit the private Desk copy, then receive the replacement release when it is
ready.

**Live public hotfix.** Only when a human explicitly asks for an immediate
public correction may the released Shelf manuscript be edited directly. Treat
that as a public production change, not normal drafting, and reconcile the same
change back into Desk afterward so the next release does not erase it.

**Unpublish.** Set Status to anything except `Published` and remove the root
catalog row. Remember that content already pushed to public Git history is not
made private by removing it from the current branch.

Optional book README rows (omit or leave blank if unused): **Publisher**,
**Series**, **Tags**, **Edition**, **Language**, **ISBN**. Series groups
volumes on the public shelf. Tags are comma-separated. Wiki links
`[[ch03-publishing|label]]` in chapter Markdown become in-reader jumps.
Do not invent a config file for these.

See https://github.com/Svyable/bookself/blob/main/docs/revisions.md for the
canonical revision and release model.
