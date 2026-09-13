# Chapter 19 depth remediation — September 7, 2026

## Scope

This bounded remediation closes the literal per-chapter release-floor defect for Chapter 19, `manuscript/ch19-sputnik-enters-the-classroom.md`.

The September 6 frozen `scripts/check-book-length.py the-other-250` run recorded Chapter 19 at **2,728 words**, **272 below** the repository’s 3,000-word floor. The Chapter 19 blob on Desk remained identical to that frozen validation source immediately before this pass.

The append-only substantive addition contributes **332 net words** under the checker’s exact token expression, `\b[\w’'-]+\b`. The addition stays inside the chapter’s existing Sputnik/NDEA capacity argument, developing preparedness under uncertain future skill demand, broad educational optionality, and maintained slack/resilience rather than pretending policymakers can forecast exact specialties years in advance.

It adds no new quotation, dated statistic, named source, or volatile current factual claim. It preserves the chapter’s existing limits: Sputnik did not invent federal education policy, preexisting proposals mattered, and federal investment in talent is not treated as a precise command forecast of future labor demand.

Because the source blob was unchanged and the edit is append-only, the exact baseline plus the exact additive delta yields a deterministic Chapter 19 count of **3,060 words**, clearing this specific floor by **60 words**.

## Release effect

This closes Chapter 19 as the **19th of the 21** sub-3,000-word defects recorded by the September 6 literal checker. **Two known short chapters remain: Chapters 16 and 21.**

This arithmetic closure does not substitute for the final full-book validation. After all remaining chapter floors are remediated, freeze one committed Desk source and require:

- `python3 scripts/check-book-length.py the-other-250` → `healthy: true`;
- `python3 scripts/check-desk.py` → candidate/repository integrity acceptable under the current Desk publication convention;
- normal frozen-source Desk → Shelf release preparation and verification.