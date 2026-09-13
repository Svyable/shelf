# Chapter 5 depth remediation — September 7, 2026

This bounded release-readiness pass addresses one of the thirteen remaining sub-3,000-word chapter defects recorded by the September 6 literal `scripts/check-book-length.py the-other-250` run.

## Frozen-source evidence

The September 6 checker established that 21 chapters were below 3,000 words and that the short-chapter range was 2,279–2,910 words. Chapter 5, `manuscript/ch05-the-summer-that-did-not-come.md`, was one of those failing chapters. Its blob on current Desk main before this remediation was still exactly `27510d13d2f3c85b3992e78e98e63057e623ed09`, identical to the blob at the frozen validator source `f0d41eed0d379b436db2fa83a7c20229fc7692f5`.

The new append-only passage contributes **866 words** under the repository checker's exact token expression, `\b[\w’'-]+\b`.

Because the literal checker established that every failing chapter was at least 2,279 words, this append-only delta guarantees Chapter 5 is now **at least 3,145 words**. That lower bound is sufficient to close the 3,000-word chapter floor without inventing an unavailable exact historical Chapter 5 count.

## Editorial scope

The addition stays inside the chapter's existing Year-Without-a-Summer argument. It deepens resilience as ordinary margin, the different clocks of physical recovery and household balance-sheet recovery, infrastructure as option value, uneven exposure to the same shock, and the way adaptation can redistribute risk rather than simply erase it.

It introduces no new quotation, dated statistic, named evidentiary source, policy date, vendor metric, or volatile current factual claim. It preserves the chapter's existing cautions against treating Tambora as a monocausal explanation for westward migration or as a uniform North American weather event.

## Release effect

This closes one additional literal-baseline chapter defect. Together with the previously documented closures for Chapters 6, 8, 10, 11, 12, 14, 15, and 22, **nine of the original 21 short-chapter defects are now closed and twelve remain**.

This arithmetic closure does not substitute for the final required full-book validation. Before publication, freeze one committed Desk source and require:

- `python3 scripts/check-book-length.py the-other-250` → `healthy: true`;
- `python3 scripts/check-desk.py` → candidate/repository integrity acceptable under the current Desk publication convention;
- the normal frozen-source Desk → Shelf release preparation and verification.

The canonical substantive factual/research/rights clearance in `research/release-review.md` remains unchanged. No human-review gate is added.