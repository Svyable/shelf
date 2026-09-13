# Chapter 21 depth remediation — September 7, 2026

**Chapter:** `manuscript/ch21-the-broken-promise-at-studebaker.md`  
**Frozen baseline source:** Desk `f0d41eed0d379b436db2fa83a7c20229fc7692f5`  
**Baseline blob:** `ad41f5d57f6eff84741636e9a83b0168c4a59d1e`  
**Pre-remediation current blob:** `ad41f5d57f6eff84741636e9a83b0168c4a59d1e`

The pre-remediation chapter is byte-identical to the September 6 literal-checker source, where Chapter 21 was one of the 21 numbered chapters below the repository's 3,000-word floor. That literal run established every failing chapter at between 2,279 and 2,910 checker-token words.

This pass appends **996 words** under the exact `scripts/check-book-length.py` token expression, `\b[\w’'-]+\b`. The new material deepens the chapter's existing argument through the timing mismatch between earned and secured benefits, layered pension safeguards, concentration risk in employment-based security, institutional restructuring, and the information problem facing workers asked to rely on long-dated promises.

No new quotation, dated statistic, named evidentiary source, current-policy claim, or volatile quantitative assertion is introduced.

Because the original failing baseline was at least 2,279 words and the change is append-only, Chapter 21 is now conservatively **at least 3,275 checker words**, above the 3,000-word release floor. This closes the final known per-chapter depth defect from the September 6 literal baseline without inventing an unavailable exact baseline count.

All 21 originally sub-floor chapters have now received bounded substantive remediation. The normal next gate is a final full-book `python3 scripts/check-book-length.py the-other-250` run on one frozen committed source, followed by `python3 scripts/check-desk.py` on that same candidate source. This chapter-specific arithmetic does not substitute for those final commands.
