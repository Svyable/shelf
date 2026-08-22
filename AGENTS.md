# AGENTS.md

Rules for AI agents working in this repository.

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

## Voice

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
- Do not change GitHub Pages source away from the repository root, or add a
  custom domain, unless a human asked.
- Do not commit secrets, credentials, or unpublished manuscripts copied from
  outside this repository.

## Verbs (author and agent)

These are the whole public lifecycle. Each is Markdown (and maybe `media/`).

**Start a book.** Copy `books/_TEMPLATE/` to `books/<slug>/`. Fill title,
authors, `Status: Drafting`. Add the slug to the chapter-feedback dropdown.
Do not add the book to the portal README catalog yet.

**Write / edit.** One chapter file per change. If you add, rename, or remove
a chapter, update that book's README TOC and Chapters count in the same
change.

**Preview.** After a push, the unlisted reader URL is
`reader/#/b/<slug>/`. It works while Drafting. It does not appear on the
shelf.

**Publish.** In one change set: set the book README Status to the exact
string `Published`, and add one row to the portal README table under
“The books” linking `books/<slug>/`. Both are required. Lead author merges.
Do this here on the **public library**. Unpublished manuscripts belong in
the private workshop — see
https://github.com/Svyable/openbookbinder/blob/main/docs/bookself.md

**Promote (Bookself).** Receive a copied folder from the private workshop,
then Publish here. Do not add unpublished titles to this repo.

**Unpublish.** Set Status to anything except `Published` and remove the
portal README row.

**Revise a published book.** Edit the Markdown and push. The reader fetches
live files. Do not bump a version stamp.

Optional book README rows (omit or leave blank if unused): **Publisher**,
**Series**, **Tags**, **Edition**, **Language**, **ISBN**. Series groups
volumes on the public shelf. Tags are comma-separated. Wiki links
`[[ch03-publishing|label]]` in chapter Markdown become in-reader jumps.
Do not invent a config file for these.
