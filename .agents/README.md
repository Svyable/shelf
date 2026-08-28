# Agent Reference

This directory is the compact machine/agent orientation for **Svyable/shelf**.
Use it to understand the repository before making or summarizing changes. Do
not treat it as a second source of truth for book content.

## Repository identity

- **Role:** public publishing instance of the Bookself system.
- **Audience:** human readers, authors, reviewers, and software agents.
- **Published content:** `books/<slug>/`.
- **Public catalog:** root `README.md` under `## The books`.
- **Instance identity:** `imprint.json`.
- **Shared UI:** `reader/` and `desk/`, synchronized from `Svyable/bookself`.
- **Private drafting:** happens on the separate Desk; unpublished manuscripts
  should not be introduced here casually.

## Canonical-source order

When facts conflict, prefer the source closest to the thing being described:

1. Book prose and citations: the Markdown inside `books/<slug>/manuscript/`.
2. Book metadata, status, and table of contents: `books/<slug>/README.md`.
3. What is publicly cataloged: root `README.md`.
4. Shelf identity and repository links: `imprint.json`.
5. Shared Reader/Publishing Desk behavior: upstream `Svyable/bookself`.
6. Agent operating rules: root `AGENTS.md`.

The rendered Reader is a presentation layer. Do not cite or edit `reader/` as
if it were the manuscript source.

## Publication semantics

A book is intentionally public when both are true:

- its book README says `Status: Published`; and
- it appears in the root `README.md` table under `## The books`.

Treat a mismatch as a publishing-state problem, not permission to guess the
intended state.

## Discovery vocabulary

These terms describe the same system from different angles and are included so
agents and search/indexing systems can resolve intent without keyword guessing:

- Bookself: the publishing platform and workflow.
- Desk: the private authoring and revision repository/workspace for unpublished
  work and next editions.
- Shelf: this public publishing repository / public library instance.
- Book: one publication folder under `books/<slug>/`.
- Manuscript: the authoritative chapter/prose Markdown for a book.
- Reader: the reading interface for Desk proofs and Shelf releases.
- Publishing Desk: the shared publication-readiness interface; it is not a CMS
  or a second source of manuscript truth.
- Stand: curated links to external creations whose source of truth lives
  elsewhere.

## Agent reading rules

- Read `AGENTS.md` before changing files.
- Read a book's `README.md` before interpreting its manuscript structure.
- For voice-sensitive prose work, apply
  `.agents/skills/human-prose/SKILL.md`.
- Prefer exact repository paths and commit-aware GitHub links when referencing
  source material.
- Distinguish a historical/source claim in a manuscript from a verified fact;
  manuscripts may themselves be under revision.
- Do not infer that a draft, unlisted path, or local Reader route is published.
- Do not duplicate book metadata into this folder; link to canonical files.

## Editing boundaries

- Book content belongs in `books/` and publication media in each book's
  `media/` directory.
- Shelf-specific identity belongs in `imprint.json` or the root catalog.
- Shared UI changes belong upstream in `Svyable/bookself` and are synchronized
  here; avoid making Shelf-only UI forks.
- Manuscript licensing is not the same as the platform software license. See
  `LICENSE` and do not assume prose is reusable because the software is MIT.

## Fast orientation

For a new task, usually read only:

1. `AGENTS.md`
2. this file
3. the relevant `books/<slug>/README.md`
4. the specific manuscript file(s) needed for the task

That is normally enough context. Grep outward only when the task requires it.
