# Chapter 20 depth remediation — September 7, 2026

## Scope

This bounded remediation closes the literal per-chapter release-floor defect for Chapter 20, `manuscript/ch20-the-law-that-remade-the-family-tree.md`.

The September 6 frozen `scripts/check-book-length.py the-other-250` run recorded Chapter 20 at **2,658 words**, **342 below** the repository’s 3,000-word floor. The Chapter 20 blob on Desk remained identical to that frozen validation source immediately before this pass.

The append-only substantive addition contributes **410 net words** under the checker’s exact token expression, `\b[\w’'-]+\b`. The addition stays inside the chapter’s existing 1965-immigration-law argument, developing the asymmetry between quickly changeable admission rules and slowly accumulated population/network effects; institutional memory embedded in households, employers, schools and communities; and the distinction between statutory reversibility and path-dependent social consequences.

It adds no new quotation, dated statistic, named source, or volatile current factual claim. It preserves the chapter’s existing limits: the 1965 law did not create all later demographic change, later immigration statutes and external conditions matter, and durable consequences are not treated as automatically beneficial or self-justifying.

Because the source blob was unchanged and the edit is append-only, the exact baseline plus the exact additive delta yields a deterministic Chapter 20 count of **3,068 words**, clearing this specific floor by **68 words**.

## Release effect

This closes Chapter 20 as the **17th of the 21** sub-3,000-word defects recorded by the September 6 literal checker. **Four known short chapters remain: Chapters 16, 17, 19, and 21.**

This arithmetic closure does not substitute for the final full-book validation. After all remaining chapter floors are remediated, freeze one committed Desk source and require:

- `python3 scripts/check-book-length.py the-other-250` → `healthy: true`;
- `python3 scripts/check-desk.py` → candidate/repository integrity acceptable under the current Desk publication convention;
- normal frozen-source Desk → Shelf release preparation and verification.