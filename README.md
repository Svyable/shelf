# Svyable Shelf

Sven Hardy Benson's **public shelf** in a [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md)
setup. The books here are released editions meant to be read. Drafts and the
next revision of a published book stay on the private Desk until they are
deliberately released.

Desk and Shelf are separate Git repositories with separate histories. This
public repository does **not** point into or read the private Desk. A release
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
private Desk and public Shelf. The canonical upstream command is
`scripts/sync-ui.sh`; the older `sync-reader.sh` name remains a compatibility
alias in Bookself. That UI synchronization is also a copy operation, not a
runtime dependency on the platform repository.

## The books

| Book | Authors |
|------|---------|
| [Leveraging Luck](books/leveraging-luck/) | Sven Hardy Benson |
| [Silent Cartel](books/silent-cartel/) | Sven Hardy Benson |
| [The Common Book](books/style-common-book/) | Bookself Studio |
| [The Lamplight Room](books/style-lamplight-room/) | Bookself Studio |
| [A Clear Margin](books/style-clear-margin/) | Bookself Studio |
| [Field Notes Quarterly](books/style-field-notes/) | Bookself Studio |
| [Poems at the Window](books/style-poems-at-window/) | Bookself Studio |
| [After Midnight](books/style-after-midnight/) | Bookself Studio |
| [Easy Reading](books/style-easy-reading/) | Bookself Studio |
| [Study in Green](books/style-quiet-study/) | Bookself Studio |

The eight Bookself Studio volumes are deliberately small **Reader style
specimens**. Each is a real Markdown publication with a copyable `reader.json`
that demonstrates one named author preset.

*The Exponentiality* is on the private Desk (`books/the-exponentiality/`) and
not yet on the shelf. *The Unbounding* stays on the private Desk until it is
released here.

## Reader style options

Authors and stylists can recommend a starting reading composition with a named
preset in `books/<slug>/reader.json`:

```json
{
  "version": 1,
  "preset": "literary"
}
```

| Preset | Example | Starting composition |
|---|---|---|
| `book` | [The Common Book](books/style-common-book/) | ivory · Source Serif 4 · balanced paged reading |
| `literary` | [The Lamplight Room](books/style-lamplight-room/) | parchment · Literata · classic indents · pages |
| `modern-essay` | [A Clear Margin](books/style-clear-margin/) | porcelain · IBM Plex Sans · wide left-aligned scroll |
| `editorial` | [Field Notes Quarterly](books/style-field-notes/) | linen · humanist sans · compact editorial scroll |
| `poetry` | [Poems at the Window](books/style-poems-at-window/) | ivory · classic serif · airy open scroll |
| `night-story` | [After Midnight](books/style-after-midnight/) | midnight · Lora · narrow warm paged reading |
| `accessible` | [Easy Reading](books/style-easy-reading/) | high contrast · Atkinson Hyperlegible · larger narrow scroll |
| `quiet-study` | [Study in Green](books/style-quiet-study/) | sage · Literata · narrow left-aligned study scroll |

A preset is shorthand, not a locked theme. `reader.json` can fine-tune the
recommended theme, warmth, font, size, weight, tracking, leading, measure,
alignment, paragraph rhythm, indentation, Pages/Scroll mode, and hyphenation.

**The publication can suggest. The reader decides.** If a reader changes the
font, text size, spacing, alignment, mode, or atmosphere, that personalization
belongs only to that browser. It does not edit `reader.json`, change Git, or
change any other reader's experience. **Use this book's design** clears the
local ownership markers and reapplies the publication recommendation.

For a normal publication or new edition, prepare the release from the private
Desk with `scripts/release-book.sh <slug> ../shelf`. The command runs locally,
copies the committed Desk snapshot, sets the Shelf copy to `Published`, updates
this catalog row, verifies the copied publication files, and stops before
commit or push so the public diff can be reviewed.

No private-Desk GitHub Actions job is required to prepare that release, and
this Shelf does not require an Actions build to turn Markdown into a separate
artifact. GitHub Pages serves the committed Reader and publication files
straight from the repository source configured for Pages.

Do not change a released Shelf book to `Drafting` or `Revision in progress`
just to work on its next edition. That can hide the book from the Reader without
making its files private. Revise on Desk and release the replacement when it is
ready.

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
