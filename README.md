# Svyable Shelf

Sven Benson's books. This repository is the **library** — the Markdown
manuscripts. The reader is [Open Book Binder](https://github.com/Svyable/openbookbinder),
open-source software anyone can fork to start their own shelf.

**Read:** [svyable.github.io/shelf/reader](https://svyable.github.io/shelf/reader/)  
**Books (this repo):** [github.com/Svyable/shelf](https://github.com/Svyable/shelf)  
**Software:** [github.com/Svyable/openbookbinder](https://github.com/Svyable/openbookbinder)

Reader upgrades are made in Open Book Binder, then copied here with
`scripts/sync-reader.sh`. This repo's `imprint.json` is the only branding
file; do not fork `reader/` unless you mean to customize the shelf alone.

## The books

| Book | Authors |
|------|---------|
| [Leveraging Luck](books/leveraging-luck/) | @svyable |

*The Exponentiality* is on the desk (`books/the-exponentiality/`) and not yet
on the shelf. *The Unbounding* stays in the private workshop until it is
meant to be public.

To publish a book: set Status to `Published` in that book's README, and add
a row here.

## How it works

This repository is a personal instance of Open Book Binder.

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
