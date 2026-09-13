# Chapter 7 depth remediation — September 7, 2026

## Scope

This bounded remediation deepens Chapter 7, `manuscript/ch07-the-petitions-they-would-not-read.md`, without changing the chapter architecture, title selection, research ledger, rights package, catalogs, Reader surfaces, tooling, or Shelf.

## Mechanical basis

The September 6 literal `scripts/check-book-length.py` run established 26 numbered chapters, a 68,901-word chapter-only corpus, and 21 chapters below the 3,000-word floor. Every failing chapter on that frozen source contained between 2,279 and 2,910 checker-token words.

Immediately before this remediation, Chapter 7 still had blob `2410e8f3020bdc09120e2893fa37ba06a0c82207`, the unchanged frozen-baseline chapter. It was therefore still one of those known sub-floor chapters.

The append-only passage adds exactly **874 words** under the repository checker expression `\b[\w’'-]+\b`. Even against the lowest possible frozen-baseline failing count, Chapter 7 is now guaranteed to contain at least **3,153 words**, above the 3,000-word floor.

## Substantive purpose

The added passage develops the chapter's existing argument about antislavery petitioning and the House gag rule through four connected ideas: representation as an operating practice rather than only a formal right; petitions as both message and measurement; disenfranchised organizers accumulating practical political capacity; and procedural efficiency as an allocation of institutional attention. It preserves the chapter's existing distinction between procedural access and liberation.

No new quotation, dated statistic, named source, present-day policy claim, or volatile empirical assertion was introduced by this pass.

## Remaining depth debt

After this closure, **15 of the original 21 known sub-floor chapters have been remediated; six remain: Chapters 9, 16, 17, 19, 20, and 21.**

This arithmetic closure does not substitute for the required final full-book `scripts/check-book-length.py the-other-250` run and `scripts/check-desk.py` run on one frozen publication candidate.