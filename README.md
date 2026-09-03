# Sven Hardy Benson’s Shelf

**Books about intelligence, institutions, markets, medicine, and what happens when the rules change.**

Sven Hardy Benson’s Shelf is the public reading library for books by Sven Hardy Benson. It holds deliberately released editions: stable snapshots readers can open, cite, share, and return to.

**[📖 Open Sven Hardy Benson’s Shelf →](https://svyable.github.io/shelf/reader/)**

## Start here

The full library is in the Reader. These six books are useful entry points into the range of the Shelf.

| Book | Start here if you are interested in | Read |
|---|---|---|
| [**Face The Strange**](books/face-the-strange/) | How people and institutions adapt when advanced machine intelligence stops feeling like ordinary software. | [Read →](https://svyable.github.io/shelf/reader/#/b/face-the-strange/) |
| [**The World Beneath the World**](books/the-world-beneath-the-world/) | The physical systems that quietly organize modern life: air, weather, temperature, grids, pipes, microbes, logistics, and waste. | [Read →](https://svyable.github.io/shelf/reader/#/b/the-world-beneath-the-world/) |
| [**Proof of Human**](books/proof-of-human/) | What authenticity, evidence, identity, and trust become when convincing fabrication gets cheap. | [Read →](https://svyable.github.io/shelf/reader/#/b/proof-of-human/) |
| [**The Cancer Key**](books/the-cancer-key/) | How neoantigens, personalized vaccines, T cells, manufacturing, patents, and access are changing cancer medicine. | [Read →](https://svyable.github.io/shelf/reader/#/b/the-cancer-key/) |
| [**The Vanishing Bid**](books/the-vanishing-bid/) | Why apparently liquid markets can lose their buyers exactly when liquidity matters most. | [Read →](https://svyable.github.io/shelf/reader/#/b/the-vanishing-bid/) |
| [**Leveraging Luck**](books/leveraging-luck/) | A practical, optimistic book about luck, action, mindset, leverage, and making more of favorable randomness. | [Read →](https://svyable.github.io/shelf/reader/#/b/leveraging-luck/) |

## Read in the Reader

The [Shelf Reader](https://svyable.github.io/shelf/reader/) is the primary way to browse the complete released library. It supports continuing where you left off, library and in-book search, contents, bookmarks, notes, citations, passage sharing, reading progress, Pages and Continuous modes, typography and paper controls, focus mode, printing, and export.

Your reading position, bookmarks, notes, and presentation preferences stay in your browser. You do not need an account to read or keep your place on that device.

## What Shelf means

**Shelf is a publication boundary, not a live working folder.** A released edition is copied from Sven Hardy Benson’s working Desk as an intentional snapshot. Later work on the next edition does not silently rewrite the public copy.

A publicly visible project can still be a proof or draft. The Reader’s normal library view lists works whose publication status is `Published`; an intentionally public proof can still be opened by direct link without being presented as a released edition.

The machine-readable publication inventory lives in [`catalog.json`](catalog.json). Each publication under [`books/`](books/) carries its own status, reading order, and metadata.

## Reader styles

A publication can recommend its own starting composition—typeface, paper, spacing, measure, Pages or Continuous mode, and atmosphere—while the reader remains free to change those choices locally.

Eight small Bookself Studio publications demonstrate the range: [Reader style gallery →](docs/reader-styles.md)

## The web shelf

- [QNTLab](https://qntlab.app/) — Build + Test = Run

The web shelf is for external work that should have the presence of a bound volume while the original website remains the source of truth.

## The stand

- [Geek to Me](https://geektome.lovable.app/)

The stand is for external creations that should feel more like a magazine, feature, or quick doorway.

## Built with Bookself

Shelf is built with [Bookself](https://github.com/Svyable/bookself), the open-source Git-native publishing system behind the Reader and the Desk/Shelf release model. Shared Reader and Desk improvements originate upstream; this repository owns Sven Hardy Benson’s public editions, identity, and release history.

For the publishing architecture and revision workflow, see [Bookself](https://github.com/Svyable/bookself/blob/main/docs/bookself.md) and [Revising a published book](https://github.com/Svyable/bookself/blob/main/docs/revisions.md).

## Repository map

| Path | Purpose |
|---|---|
| `books/` | Public publication snapshots and intentionally public proofs |
| `catalog.json` | Machine-readable Shelf inventory |
| `reader/` | Shared Bookself reading interface |
| `desk/` | Shared Bookself publishing/readiness interface |
| `imprint.json` | Sven Hardy Benson’s Shelf identity and Reader links |
| `README.md` | Human-facing front door to the Shelf |

## Rights

**Open tools. Author-owned words.** Bookself software is open source. Publication content is not automatically open merely because it is publicly readable or source-visible. See [LICENSE](LICENSE), [RIGHTS.md](RIGHTS.md), and any publication-specific `RIGHTS.md` / `rights.json` for the applicable rights boundary.

## Local preview

Serve the repository root with any static server, for example:

```bash
python3 -m http.server
```

Then open `http://127.0.0.1:8000/reader/`.
