# Release gate closeout — The Other 250 — September 7, 2026

**Desk source reviewed:** `5d601c7d1765b4159a29b4ff7057a242d683e04c`  
**Status:** Release-cleared on substantive factual/editorial/rights grounds; all known per-chapter depth defects are closed; publication remains subject only to the explicit repository mechanical/integrity steps below.

## Depth gate

The September 6 literal `scripts/check-book-length.py the-other-250` run established 26 numbered chapters, a 68,901-word chapter-only corpus, and 21 chapters below the 3,000-word per-chapter floor. Chapters 18 and 23–26 already passed on that frozen source.

Every one of the original 21 sub-floor chapters has now received bounded substantive remediation. The final two closures landed on September 7:

- Chapter 16, `ch16-america-chooses-its-ancestry.md`: the pre-remediation blob was byte-identical to the September 6 source; +961 exact checker-token words guarantee a current count of at least 3,240 words.
- Chapter 21, `ch21-the-broken-promise-at-studebaker.md`: the pre-remediation blob was byte-identical to the September 6 source; +996 exact checker-token words guarantee a current count of at least 3,275 words.

The chapter-specific and aggregate remediation artifacts preserve the exact arithmetic or conservative lower-bound proof for all prior closures. No remaining numbered chapter is known to be below 3,000 words. The aggregate 65,000-word floor was already satisfied before remediation.

This evidence does not fabricate a literal final checker execution. The final candidate still requires:

`python3 scripts/check-book-length.py the-other-250`

on one frozen committed Desk source, with `healthy: true`.

## Desk integrity gate

The title-specific source-ledger schema defect is closed, and the book remains a complete 26-chapter package with front matter, back matter, research trail, rights metadata, and no unresolved factual/research blocker.

The repository-wide manifest/discovery defect recorded in the earlier version of this closeout has now been partially repaired on Desk main. Commit `5d601c7d1765b4159a29b4ff7057a242d683e04c` registers `the-books-that-wrote-america`, `the-decisive-25`, and `the-ten-year-republic` in `catalog.json` and completes their missing feedback/LLMs/sitemap discovery registration.

The remaining directly evidenced repository-wide integrity blocker is the generated root `README.md`: it still reports 117 projects and its `## The books` catalog predates five current canonical book directories. Current canonical Desk state is 122 projects. Because `scripts/check-desk.py` requires the README catalog set and generated stage/progress metadata to agree with the real book directories and book-local READMEs, the command cannot be treated as passed until that marked dashboard is regenerated and the literal command exits cleanly.

Before release, regenerate/reconcile the root dashboard using the repository-conventional catalog tooling, then require:

`python3 scripts/check-desk.py`

to exit cleanly on the same frozen release candidate. If that literal run exposes any additional repository-wide or title-specific integrity defect, record and remediate the actual failure rather than inferring a pass.

## Release decision

**Release-cleared subject to explicit mechanical/integrity steps only.** No additional factual, editorial, rights, or human-review gate is introduced.

Proceed to the matched Desk/Shelf release transaction once all of the following are true on one frozen committed Desk source:

1. `scripts/check-book-length.py the-other-250` reports healthy.
2. The generated root Desk dashboard/catalog is current and `scripts/check-desk.py` exits cleanly.
3. The intended 28 Reader surfaces remain present and ordered: front matter, 26 chapters, and back matter.
4. The Shelf snapshot is prepared from that exact frozen Desk source, with Chapter 26's first-edition factual horizon retained as September 6, 2026.

Until those repository commands actually pass, do not label the Shelf release complete. Once they pass, no further readiness review is required by this artifact.