# Chapter 16 depth remediation — September 7, 2026

**Chapter:** `manuscript/ch16-america-chooses-its-ancestry.md`  
**Frozen baseline source:** Desk `f0d41eed0d379b436db2fa83a7c20229fc7692f5`  
**Baseline blob:** `4bc13731ca8ff25f2387ae5d735eeb1586705a34`  
**Pre-remediation current blob:** `4bc13731ca8ff25f2387ae5d735eeb1586705a34`

The pre-remediation chapter is byte-identical to the September 6 literal-checker source, where Chapter 16 was one of the 21 numbered chapters below the repository's 3,000-word floor. That literal run established every failing chapter at between 2,279 and 2,910 checker-token words.

This pass appends **961 words** under the exact `scripts/check-book-length.py` token expression, `\b[\w’'-]+\b`. The new material deepens the chapter's existing argument about national-origins quotas by examining administrative classification, political baselines disguised as neutral procedure, institutional path dependence, assimilation under restricted inflows, and the way demographic policy shapes the constituency that later judges it.

No new quotation, dated statistic, named evidentiary source, current-policy claim, or volatile quantitative assertion is introduced.

Because the original failing baseline was at least 2,279 words and the change is append-only, Chapter 16 is now conservatively **at least 3,240 checker words**, above the 3,000-word release floor. This closes Chapter 16's known depth defect without inventing an unavailable exact baseline count.

After this remediation, **Chapter 21 is the only remaining known sub-floor chapter from the September 6 literal baseline**. A final full-book `check-book-length.py` run on one frozen committed source remains required after Chapter 21 is remediated; this chapter-specific arithmetic does not substitute for that final gate.
