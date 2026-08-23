# Author guide

You do not need to know git. This place is a binder: each book is a folder,
each chapter is a page, and GitHub keeps every version.

This walkthrough uses the GitHub website on a computer.

## In one minute

1. Copy `books/_TEMPLATE/` to `books/your-title/` (lowercase, hyphens) —
   or promote a finished folder from your private binder.
2. Open a chapter, click the pencil, write, and **Commit changes**.
3. Preview at `reader/#/b/your-title/`. When you are ready, set Status to
   `Published` and add a row for the book in the root `README.md`.

This repository is the **public shelf** in a
[Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)
setup. Do not put unpublished manuscripts here. Secret drafts stay in the
private binder.

The rest of this guide is the same path, slower.

## 1. What this place is

The repository is a stack of books. Open [`books/`](../books/). The folder
named `_TEMPLATE` is a blank book you can copy, not a real title. Every other
folder is a book.

Inside a book:

- `README.md` — the cover and table of contents
- `manuscript/` — the pages
- `media/` — pictures, when a book has them

## 2. Reading a book

1. Open the book folder.
2. Open `README.md`. The **Contents** list is the reading order. Click a
   chapter name.
3. Read the page. GitHub turns Markdown into readable text automatically.

The file list inside `manuscript/` is alphabetical, so `back-matter.md` will
not sit at the end. Trust the README, not the file list.

## 3. Making your first edit

1. Open the chapter you want to change.
2. Click the pencil icon in the top-right of the file view. GitHub labels
   it **Edit this file**.
3. The page becomes a text editor. Change the words. Leave the single `#`
   title at the top unless you are renaming the chapter.
4. Do not paste in Word formatting, extra headings, or comments.

If GitHub asks you to fork the repository, say yes — that is how GitHub lets
people without write access propose an edit.

## 4. Committing (saving a version)

Scroll to the bottom of the edit page, to **Commit changes**.

1. In the first box, write a short note in plain language:
   `Fix the river image caption in chapter 2`.
2. Choose how to save:
   - **Commit directly to the `main` branch** — use this only if you are a
     named author of this book (see the book's README).
   - **Create a new branch for this commit and start a pull request** — use
     this otherwise. It is the "propose changes" path.
3. Click **Commit changes** (or **Propose changes**).

A commit is a saved version with a note. It is not publishing to a printer.
It is putting a dated page in the binder.

## 5. Ticking checkboxes in the table of contents

The book's README has a contents list like this:

    - [ ] [Ch 1 — Opening the Binder](manuscript/ch01-example.md)

The boxes do not toggle by clicking them on the page. To mark a chapter
done:

1. Open the book `README.md`.
2. Click the pencil.
3. Change `[ ]` to `[x]` on that line.
4. Update the **Chapters** count in the info table if it has drifted.
5. Commit as in step 4.

## 6. Suggesting a change on someone else's line

Two similar tools, for two situations.

**You are reading a file and want to propose a better sentence.** Use the
pencil as in step 3, change only that passage, and open a pull request
(step 4, "propose changes"). In the PR description, say which lines you
touched and why.

**You are reviewing a pull request.** On the **Files changed** tab, hover a
line, click the blue **+**, and choose to add a comment. GitHub can insert a
suggested replacement the author accepts with one click. Prefer that over a
vague "please rephrase."

## 7. Filing feedback without editing

If you would rather not touch the text:

1. Open the **Issues** tab.
2. Click **New issue**.
3. Choose **Chapter feedback**.
4. Pick the book, say where in the book, pick the kind of feedback, and
   write what you would change.

Use **New book proposal** only when you are pitching a title that does not
exist yet.

## 8. Reading the published book

The public binder is the [reader](../reader/). It looks like a book: two
pages, a lamp, a bookmark. It only lists books whose Status is
`Published`.

You can still look at a draft the same way. After your files are on GitHub,
open `reader/#/b/<your-slug>/`. That address is unlisted — it will not
appear on the shelf until you publish. Share it with a reviewer.

The reader cannot open from a `file://` page. GitHub Pages (or any static
server at the repository root) has to serve the files.

## 9. Publishing

This is the public shelf. If the book was written in a private binder,
promote the folder here first ([Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)),
then do the two edits below.

Publishing is two edits, together. Nothing in `reader/` changes.

1. In the book `README.md`, set **Status** to the exact word `Published`.
2. In the portal README (`README.md` at the root of the repository), add a
   row under **The books** that links to `books/<your-slug>/`.

The reader lists the portal table, then checks Status. Both must be true.

To unpublish, reverse both edits.

A GitHub-authed agent can do every step in this guide. It should never edit
reader JavaScript to put your book on the shelf.

## 10. Proof, print, and the imprint

On a draft cover the reader lists missing or empty chapter files. Opening
the cover reloads the Markdown, so a push is visible after refresh.

**Copy link** on the cover is the unlisted preview URL. Send that to a
reviewer.

**Print / PDF** is in Type and tools. The browser print dialog can save a
PDF. Drafts print with a draft wash so they are not mistaken for a finished
edition.

Optional rows on the book README — Publisher, Edition, Language, ISBN —
show on the cover and the back. They are not required to publish.

While reading, Contents includes **Edit this chapter on GitHub**. Select
text to copy, highlight a note, share a passage, or **Report** it as a
GitHub issue with the chapter and quote filled in. The cover has **Send
feedback**, **Cite**, and **Source** (the manuscript folder).

A book URL can be the hash (`reader/#/b/<slug>/`) or the query
(`reader/?b=<slug>`). Both work. `?` in the reader lists keys.

Cite copies a reference with the latest git revision of that book folder
when GitHub’s API is reachable. History on the cover opens that commit.
