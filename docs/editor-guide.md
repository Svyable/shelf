# Editor guide

This is the path if you are comfortable with branches and pull requests.
Lead authors of a book may still commit directly to `main` for that book;
everyone else uses this flow.

If you have never used GitHub, start with the [author guide](author-guide.md)
instead.

## Branch → edit → pull request

1. Create a branch named after the chapter, for example
   `fix/example-book-ch02-typos`.
2. Edit one chapter file. If the table of contents must change to match
   (added, renamed, or removed chapter), edit that book's `README.md` in
   the same branch.
3. Open a pull request against `main`. The PR template asks for the book,
   the chapter, what changed, and why.
4. Wait for the book's lead author to review.

Keep the pull request to one chapter. A second chapter is a second PR.

## Keeping the chapter-feedback book list current

`.github/ISSUE_TEMPLATE/chapter-feedback.yml` has a dropdown of books.
GitHub will not update it for you.

When you add a book:

1. Copy `books/_TEMPLATE/` to `books/<slug>/`.
2. In the same PR, add a new option under the `book` dropdown in
   `chapter-feedback.yml`. The option text is the slug, for example
   `leveraging-luck`.
3. Put `_TEMPLATE` last, so real books sit above the example.

When you retire a book, remove its option in the same PR that removes the
folder.

## Publishing and the public catalog

This is the public shelf. Promoting a book from the private binder is
copy-the-folder, then the two edits below — see
[Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md).

The public reader lists a book only when **both** are true:

1. The book README Status is exactly `Published`.
2. The portal `README.md` table under **The books** links `books/<slug>/`.

Do that in one pull request (or one commit, if you are the lead author).
Do not edit `reader/` to add a book.

Unpublish by reversing both. Preview without publishing:
`reader/#/b/<slug>/`.

Publisher, Edition, Language, and ISBN are optional rows on the book
README. If a Publisher is set, the public shelf can filter by it. Print
from the reader (Type and tools) for a galley PDF. Drafts print with a
draft wash.

## Line-comment reviews

Review the manuscript, not the idea of the book, unless the PR is a new-book
proposal.

- Comment on the line that needs to change.
- Use GitHub's suggested-change feature when you have replacement text.
- Do not demand a voice that is not already on the page.
- If the TOC or chapter count in the book README is stale, say so and block
  merge until it is fixed.

## Merge etiquette

- The lead author named on the book's README merges that book's PRs.
- Do not squash away a carefully written chapter history unless the author
  asks. A regular merge (or squash of a messy fixup branch, if the author
  agrees) is fine.
- After merge, confirm the live README contents list still matches the
  files in `manuscript/`.
- Do not enable branch protection or CODEOWNERS as part of ordinary editing.
