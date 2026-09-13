# Chapter 13 depth remediation — September 7, 2026

This bounded release-readiness pass addresses one of the twelve remaining sub-3,000-word chapter defects recorded by the September 6 literal `scripts/check-book-length.py the-other-250` run.

## Frozen-source evidence

The September 6 checker established that 21 chapters were below 3,000 words and that the short-chapter range was 2,279–2,910 words. Chapter 13, `manuscript/ch13-the-islands-that-changed-the-map.md`, was one of those failing chapters. Its blob on Desk main before this remediation was exactly `9da489612e228fea94696b81be0e5bb5b95c248f`, identical to the blob at the frozen validator source `f0d41eed0d379b436db2fa83a7c20229fc7692f5`.

The new append-only passage contributes **808 words** under the repository checker's exact token expression, `\b[\w’'-]+\b`.

Because the literal checker established that every failing chapter was at least 2,279 words, this append-only delta guarantees Chapter 13 is now **at least 3,087 words**. That lower bound is sufficient to close the 3,000-word chapter floor without inventing an unavailable exact historical Chapter 13 count.

## Editorial scope

The addition stays inside the chapter's existing Hawai‘i-annexation argument. It deepens the distinction between negotiated access and sovereign assumption, the way infrastructure turns political control into path dependence, the relationship between later participation and disputed acquisition, the administrative systems through which jurisdiction becomes durable, and the gap between strategic reach and democratic settlement.

It introduces no new quotation, dated statistic, named evidentiary source, policy date, vendor metric, or volatile current factual claim. It preserves the chapter's existing treatment of Native Hawaiian opposition, the disputed legal route to annexation, and the distinction between later statehood and consent in 1898.

## Release effect

This closes one additional literal-baseline chapter defect. Together with the previously documented closures for Chapters 5, 6, 8, 10, 11, 12, 14, 15, and 22, **ten of the original 21 short-chapter defects are now closed and eleven remain**.

The aggregate `research/release-review.md` and older depth summary still predate the Chapter 5 and Chapter 13 bounded notes; their historical literal baseline remains correct, but their current remaining-defect count is stale. That bookkeeping should be synchronized with the next substantive remediation rather than treated as a release clearance.

This arithmetic closure does not substitute for the final required full-book validation. Before publication, freeze one committed Desk source and require:

- `python3 scripts/check-book-length.py the-other-250` → `healthy: true`;
- `python3 scripts/check-desk.py` → candidate/repository integrity acceptable under the current Desk publication convention;
- the normal frozen-source Desk → Shelf release preparation and verification.

The canonical substantive factual/research/rights clearance in `research/release-review.md` remains unchanged. No human-review gate is added.
