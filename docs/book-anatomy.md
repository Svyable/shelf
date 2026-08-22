# Book anatomy

What every book folder contains, and the naming rules that keep GitHub's
file list readable.

## Folder layout

Each book lives at `books/<slug>/`:

    books/<slug>/
    ├── README.md          # Hub: info table + checkbox table of contents
    ├── manuscript/
    │   ├── front-matter.md
    │   ├── ch01-<short-slug>.md
    │   ├── ch02-<short-slug>.md
    │   └── back-matter.md
    └── media/             # Cover art and figures (optional files)

Start a book by copying `books/_TEMPLATE/` and renaming the copy.

## Naming rules

**Book slug.** The folder name is lowercase letters, digits, and hyphens.
No spaces, no underscores, no punctuation. Example: `leveraging-luck`.

**Chapters.** `chNN-short-slug.md` — two-digit zero-padded number, hyphen,
short slug. The number is the reading order. GitHub lists files
alphabetically, so `ch01` … `ch09` … `ch10` stay in order.

**After 99 chapters.** `ch100-slug.md` continues to sort after the
zero-padded files (`ch99-…` then `ch100-…`). Do not switch schemes.

**Front and back matter.** Always named `front-matter.md` and
`back-matter.md`. Do not number them. They will not sort into reading order
in the file list; the README table of contents is the reading order.

## The book README (hub)

Plain Markdown. No YAML front matter. An info table and a checkbox contents
list:

    # Title

    | | |
    |---|---|
    | **Authors**   | @username |
    | **Status**    | Drafting |
    | **Publisher** |  |
    | **Edition**   |  |
    | **Chapters**  | 1 of 12 drafted |

    ## Contents

    - [ ] [Front Matter](manuscript/front-matter.md)
    - [ ] [Ch 1 — Getting Started](manuscript/ch01-getting-started.md)
    - [ ] [Back Matter](manuscript/back-matter.md)

Tick boxes by editing `[ ]` to `[x]` (see the author guide). Update the
Chapters count when it drifts.

**Status** is how the public reader decides what to list.

- `Drafting` (or anything except `Published`) — GitHub only, plus an
  unlisted reader URL `reader/#/b/<slug>/`.
- `Published` — appears on the public shelf **after** the portal README
  also links `books/<slug>/`.

This repository is the public library. Unlisted files here are still
public. Secret drafts belong in the private workshop
([Bookself](https://github.com/Svyable/openbookbinder/blob/main/docs/bookself.md)).

Optional cover art: `media/cover.png` (or `.jpg` / `.webp`). The reader
uses it on the generated cover. If it is missing, the reader makes a cloth
cover from the title.

Optional hub rows the reader understands if present: **Publisher**,
**Series**, **Tags**, **Edition**, **Language**, **ISBN**. Empty Publisher
is fine. Publisher filters the shelf. Series draws a labelled stack.
Tags are comma-separated. In chapters, `[[ch03-publishing|Publishing]]`
jumps inside the reader. Download Markdown or HTML from Type and tools —
the files, not a database dump.

## Manuscript

- One file per chapter.
- A chapter is a single `# Title` heading, then paragraphs. No metadata,
  no HTML comments, nothing an author has to understand beyond Markdown.
- Front matter holds the title page, a copyright line (`©` year author),
  and an optional dedication.
- Back matter holds epilogue, acknowledgments, and about-the-author —
  use `##` headings for those sections.

## Media and relative links

Put images in that book's `media/` folder. From a chapter, link relatively:

    ![A river in late light](../media/river.png)

Do not use absolute GitHub URLs. Relative links survive a rename of the
book folder.

There is no sample image in `_TEMPLATE/media/` on purpose. An image
reference without a file would render broken. Add files when a real book
needs them.

## Guiding rule

If you cannot explain a convention to a first-time author in one sentence,
it does not belong in the book folder. Put extra process in `docs/` or
`.github/`, not next to the prose.
