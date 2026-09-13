# Chapter 17 depth remediation — September 7, 2026

## Scope

This bounded remediation closes the literal per-chapter release-floor defect for Chapter 17, `manuscript/ch17-the-forty-four-hour-week.md`.

The September 6 frozen `scripts/check-book-length.py the-other-250` run recorded Chapter 17 at **2,689 words**, **311 below** the repository’s 3,000-word floor. The Chapter 17 blob on Desk remained identical to that frozen validation source immediately before this pass.

The append-only substantive addition contributes **367 net words** under the checker’s exact token expression, `\b[\w’'-]+\b`. The addition stays inside the chapter’s existing Fair Labor Standards Act argument, developing a federal labor floor as a coordination/default mechanism that reduces how many employment terms must be privately renegotiated from zero, while preserving bargaining above the floor and acknowledging exemptions, enforcement limits, and transition costs.

It adds no new quotation, dated statistic, named source, or volatile current factual claim. It does not treat the FLSA as the sole cause of modern labor conditions or imply that a durable standard is automatically optimal merely because institutions have adapted around it.

Because the source blob was unchanged and the edit is append-only, the exact baseline plus the exact additive delta yields a deterministic Chapter 17 count of **3,056 words**, clearing this specific floor by **56 words**.

## Release effect

This closes Chapter 17 as the **18th of the 21** sub-3,000-word defects recorded by the September 6 literal checker. **Three known short chapters remain: Chapters 16, 19, and 21.**

This arithmetic closure does not substitute for the final full-book validation. After all remaining chapter floors are remediated, freeze one committed Desk source and require:

- `python3 scripts/check-book-length.py the-other-250` → `healthy: true`;
- `python3 scripts/check-desk.py` → candidate/repository integrity acceptable under the current Desk publication convention;
- normal frozen-source Desk → Shelf release preparation and verification.