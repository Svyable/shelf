# Chapter 2 depth remediation — The Other 250 — September 7, 2026

## Scope

This focused pass closes the known per-chapter mechanical depth defect for Chapter 2, `manuscript/ch02-the-day-the-army-chose-the-republic.md`, without changing the book's factual horizon, selection, rights position, or publication status.

The September 6 literal repository checker run against Desk commit `f0d41eed0d379b436db2fa83a7c20229fc7692f5` established that Chapter 2 was one of the 21 numbered chapters below the repository's 3,000-word floor. The current pre-remediation Chapter 2 blob was still exactly `430ddff5d41f598bc0a66c20b0d6a4e0484d02fa`, identical to that frozen validator source, so the baseline failure remains directly attributable.

The September 6 review records that every failing chapter was between 2,279 and 2,910 checker-token words. This pass adds **834 words** under the checker's exact token expression, `\b[\w’'-]+\b`, in an append-only manuscript change. Therefore Chapter 2 is now guaranteed to contain **at least 3,113 words**, clearing the 3,000-word chapter floor even without inventing an unavailable exact historical Chapter 2 count.

## Substantive change

The added passage stays inside the chapter's existing Newburgh argument. It deepens four connected points already present in the manuscript:

- civilian supremacy has to survive legitimate military grievance and civilian institutional weakness, not merely obedient conditions;
- the faster decision tempo of a military institution can become politically dangerous when administrative delay is mistaken for a transfer of constitutional legitimacy;
- Newburgh preserved the civilian arena in which the Articles could later be replaced rather than treating military leverage as a mechanism of constitutional reform; and
- dependable fiscal and administrative capacity is part of civilian control because a government cannot indefinitely finance constitutional obedience with unpaid obligations and personal prestige.

The addition introduces no new quotation, dated statistic, named evidentiary source, policy date, current-policy claim, or other volatile empirical assertion. It preserves the release review's existing caution against overstating Newburgh as a settled operational coup plan.

## Release effect

Chapter 2 is now mechanically closed on the frozen September 6 baseline by conservative arithmetic. Together with the previously closed Chapters 1, 5, 6, 8, 10, 11, 12, 13, 14, 15, and 22, this brings the original 21 known sub-floor defects down to **9 remaining chapters**.

The older aggregate `research/release-review.md` and `research/depth-remediation-2026-09-07.md` predate several of the chapter-specific closures and therefore retain stale current-debt totals. Their September 6 literal baseline remains valid. This chapter-specific record is intentionally additive; aggregate bookkeeping should be synchronized in a subsequent focused title-local pass or the final frozen-source validation pass.

Publication is **not** cleared by this arithmetic closure alone. The remaining nine original sub-floor chapters still require substantive remediation, followed by a full frozen-source `scripts/check-book-length.py the-other-250` run, Desk integrity/catalog validation, and the normal deliberate Desk → Shelf release transaction.