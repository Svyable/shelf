# Svyable Shelf

Sven Benson's **public shelf** in a [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)
setup. The books here are released editions meant to be read. Drafts and the
next revision of a published book stay in the private Binder until they are
deliberately released.

Binder and Shelf are separate Git repositories with separate histories. This
public repository does **not** point into or read the private Binder. A release
copies a committed publication snapshot into Shelf; after that, the public copy
is independent until the next release.

This repository is the first public implementation of the Bookself platform.
Its identity and released books belong here; the shared Reader and Publishing
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
- `books/`, this `README.md`, and `imprint.json` are **this Shelf's released
  content and identity**.
- `imprint.json` is where Svyable-specific branding and repository identity
  belong; shared Reader/Desk code should not depend on those values.

Platform UI upgrades are developed in Bookself and synchronized to both the
private Binder and public Shelf. The canonical upstream command is
`scripts/sync-ui.sh`; the older `sync-reader.sh` name remains a compatibility
alias in Bookself. That UI synchronization is also a copy operation, not a
runtime dependency on the platform repository.

## The books

| Book | Authors |
|------|---------|
| [Leveraging Luck](books/leveraging-luck/) | @svyable |

*The Exponentiality* is on the desk (`books/the-exponentiality/`) and not yet
on the shelf. *The Unbounding* stays in the private Binder until it is
released here.

For a normal publication or new edition, prepare the release from the private
Binder with `scripts/release-book.sh <slug> ../shelf`. The command runs locally,
copies the committed Binder snapshot, sets the Shelf copy to `Published`,
updates this catalog row, verifies the copied publication files, and stops
before commit or push so the public diff can be reviewed.

No private-Binder GitHub Actions job is required to prepare that release, and
this Shelf does not require an Actions build to turn Markdown into a separate
artifact. GitHub Pages serves the committed Reader and publication files
straight from the repository source configured for Pages.

Do not change a released Shelf book to `Drafting` or `Revision in progress`
just to work on its next edition. That can hide the book from the Reader without
making its files private. Revise in Binder and release the replacement when it
is ready.

See [Revising a published book](https://github.com/Svyable/bookself/blob/main/docs/revisions.md).

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

- **One released publication, one folder** under `books/<slug>/`.
- **Plain Markdown** is the source of truth for the released Shelf snapshot.
- **GitHub history** is the release and rollback history for this public copy.
- **The Reader** (`reader/`) turns published Markdown into the reading
  experience with no build step.
- **The Publishing Desk** (`desk/`) reads the same repository state and makes
  readiness and publication mismatches visible without adding a CMS.
- **CI/CD is optional.** Reading and publishing do not depend on an Actions
  workflow or hosted build artifact.

The software is MIT. The manuscripts are not. See [LICENSE](LICENSE).

## Local preview

```bash
python3 -m http.server
```

Then open:

- [http://127.0.0.1:8000/reader/](http://127.0.0.1:8000/reader/)
- [http://127.0.0.1:8000/desk/](http://127.0.0.1:8000/desk/)
