# Svyable Shelf

Sven Benson's **public shelf** in a [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)
setup. The manuscripts here are meant to be read. Drafts and unpublished
titles stay in a private binder.

The reader is [Open Book Binder](https://github.com/Svyable/bookself),
open-source software. Fork that to start your own shelf — not this repo.

**Read:** [svyable.github.io/shelf/reader](https://svyable.github.io/shelf/reader/)  
**Books (this shelf):** [github.com/Svyable/shelf](https://github.com/Svyable/shelf)  
**Software:** [github.com/Svyable/bookself](https://github.com/Svyable/bookself)  
**Workflow:** [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)

Reader upgrades are made in Open Book Binder, then copied here with
`scripts/sync-reader.sh`. This repo's `imprint.json` is the only branding
file; do not fork `reader/` unless you mean to customize the shelf alone.

## The books

| Book | Authors |
|------|---------|
| [Leveraging Luck](books/leveraging-luck/) | @svyable |

*The Exponentiality* is on the desk (`books/the-exponentiality/`) and not yet
on the shelf. *The Unbounding* stays in the private binder until it is
promoted here.

To publish a book: copy it from the binder if it was private, set Status
to `Published` in that book's README, and add a row here.

## How it works

This repository is the public half of Bookself.

- **One book, one folder** under `books/<slug>/`.
- **Plain Markdown** is the source of truth.
- **GitHub** is where the books are written and reviewed.
- **The reader** (`reader/`) paginates those files like a book. No build step.

The software is MIT. The manuscripts are not. See [LICENSE](LICENSE).

## Local reader

```bash
python3 -m http.server
```

Then open [http://127.0.0.1:8000/reader/](http://127.0.0.1:8000/reader/).
