# Chapter 1 depth remediation — September 7, 2026

This bounded release-readiness pass addresses one of the eleven remaining sub-3,000-word chapter defects recorded by the September 6 literal `scripts/check-book-length.py the-other-250` run.

## Frozen-source evidence

The September 6 checker established that 21 chapters were below 3,000 words and that the short-chapter range was 2,279–2,910 words. Chapter 1, `manuscript/ch01-the-war-became-international.md`, was one of those failing chapters. Its blob on Desk main before this remediation was exactly `0e91ed4e9f90117eb2a65ac4eb0312e8f11b0ab7`, identical to the blob at frozen validator source `f0d41eed0d379b436db2fa83a7c20229fc7692f5`.

The new append-only passage contributes **850 words** under the repository checker's exact token expression, `\b[\w’'-]+\b`.

Because the literal checker established that every failing chapter was at least 2,279 words, this append-only delta guarantees Chapter 1 is now **at least 3,129 words**. That lower bound is sufficient to close the 3,000-word chapter floor without inventing an unavailable exact historical Chapter 1 count.

## Editorial scope

The addition stays inside the chapter's existing argument about the 1778 French alliance changing the strategic geometry of the American Revolution. It deepens the role of time and endurance, the domestic signaling value of recognition, alliance asymmetry, and the difference between declared sovereignty and borrowed capability.

It introduces no new quotation, dated statistic, named evidentiary source, policy date, vendor metric, or volatile current factual claim. It preserves the chapter's existing counterfactual discipline: French intervention materially improved the American position without making independence inevitable.

## Release effect

This closes Chapter 1's original per-chapter depth defect. Together with previously remediated Chapters 5, 6, 8, 10, 11, 12, 13, 14, 15, and 22, **eleven of the original 21 short-chapter defects are now closed; ten remain**.

The aggregate `research/release-review.md` and `research/depth-remediation-2026-09-07.md` predate the Chapter 5, Chapter 13, and this Chapter 1 closure, so their current-defect summaries are stale even though their September 6 literal baseline evidence remains valid. Publication is still blocked until all ten remaining chapter floors are remediated and the normal frozen-source full-book and Desk-integrity checks pass.
