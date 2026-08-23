# Svyable Shelf

Sven Benson's **public shelf** in a [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)
setup. The books here are meant to be read. Drafts and unpublished titles
stay in the private binder until they are deliberately promoted.

This repository is the first public implementation of the Bookself platform.
Its identity and published books belong here; the shared Reader and Publishing
Desk come from [Svyable/bookself](https://github.com/Svyable/bookself).

**Read:** [svyable.github.io/shelf/reader](https://svyable.github.io/shelf/reader/)  
**Publishing Desk:** [svyable.github.io/shelf/desk](https://svyable.github.io/shelf/desk/)  
**Books (this shelf):** [github.com/Svyable/shelf](https://github.com/Svyable/shelf)  
**Software:** [github.com/Svyable/bookself](https://github.com/Svyable/bookself)  
**Workflow:** [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)

## What belongs here

Bookself keeps platform software separate from an individual deployment:

- `reader/` and `desk/` are **shared Bookself UI** and should stay aligned with
  the upstream platform.
- `books/`, this `README.md`, and `imprint.json` are **this Shelf's content and
  identity**.
- `imprint.json` is where Svyable-specific branding and repository identity
  belong; shared Reader/Desk code should not depend on those values.

Platform UI upgrades are developed in Bookself and synchronized to both the
private Binder and public Shelf. The canonical upstream command is
`scripts/sync-ui.sh`; the older `sync-reader.sh` name remains a compatibility
alias in Bookself.

## The books

| Book | Authors |
|------|---------|
| [Leveraging Luck](books/leveraging-luck/) | @svyable |

*The Exponentiality* is on the desk (`books/the-exponentiality/`) and not yet
on the shelf. *The Unbounding* stays in the private binder until it is
promoted here.

To publish a book: copy it from the binder if it was private, set Status to
`Published` in that book's README, and add a row here in the same publishing
change.

## The web shelf

- [QNTLab](https://qntlab.app/) — Build + Test = Run

The web shelf is for external work that should have the presence of a bound
volume. The Reader gives it a spine and cover, while the original website
remains the source of truth.

## The stand

- [Geek to Me](https://geektome.lovable.app/)

The stand is for external creations that should feel more like a magazine,
feature, or quick doorway. The linked site remains the source of truth.

## How it works

This repository is the public half of a Bookself installation.

- **One book, one folder** under `books/<slug>/`.
- **Plain Markdown** is the source of truth.
- **GitHub** is where books are written and reviewed.
- **The reader** (`reader/`) turns published Markdown into the reading
  experience with no build step.
- **The Publishing Desk** (`desk/`) reads the same repository state and makes
  readiness and publication mismatches visible without adding a CMS.

The software is MIT. The manuscripts are not. See [LICENSE](LICENSE).

## Local preview

```bash
python3 -m http.server
```

Then open:

- [http://127.0.0.1:8000/reader/](http://127.0.0.1:8000/reader/)
- [http://127.0.0.1:8000/desk/](http://127.0.0.1:8000/desk/)
