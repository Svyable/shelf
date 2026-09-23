# Length remediation — The Unobserved World

**Remediation date:** September 5, 2026  
**Baseline Desk source:** `21037b0903b182d9bec963b590fd137993928852`  
**Remediation commit:** `0c93506e9bb5d53b3efbdc451f68a124e5c253a0`

The bounded release review measured the committed numbered-chapter total at **61,357 words**, which was **3,643 words below** the repository's 65,000-word chapter-only minimum.

This remediation changes only `manuscript/ch20-keep-the-future-observable.md`. The commit comparison against the baseline is **440 added lines and 0 deleted lines**. No other manuscript, research, rights, catalog, Reader, or repository file changed in the prose commit.

The added closing movement was counted with the same token expression used by `scripts/check-book-length.py`, `\b[\w’'-]+\b`, and contains **3,898 words**. Because the edit is purely additive, the mechanically derived chapter-only total becomes:

- reviewed baseline: **61,357 words**
- net numbered-chapter addition: **+3,898 words**
- remediated chapter-only total: **65,255 words**
- required minimum: **65,000 words**
- margin above minimum: **255 words**

The new material deepens the existing synthesis around evidence budgets, reopening conditions, observability debt, and the distinction between abundant analysis and scarce real-world observation. It introduces no new statistics, quotations, named empirical studies, or external factual claims, so it does not expand the reviewed source burden.

This closes the known **total-word deficit only**. It does **not** claim that the full validator or repository integrity command has executed. Before publication, the remediated frozen source still requires:

1. a full `python3 scripts/check-book-length.py the-unobserved-world` (or exact frozen-source `--counts` equivalent) with `healthy: true`, including every numbered chapter at or above 3,000 words; and
2. `python3 scripts/check-desk.py` on the same frozen source with a clean exit.

No human-review gate is added. If those objective checks pass and no later change alters the reviewed evidence boundaries, the remaining mechanical blocker is resolved.