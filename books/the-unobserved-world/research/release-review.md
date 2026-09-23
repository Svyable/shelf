# Release Review — The Unobserved World

## Mechanical audit update — September 7, 2026

**Substantive release clearance remains intact. The bounded per-chapter depth defects found on current Desk main have been remediated; publication still requires the repository's literal full-book length and Desk-integrity checks on one frozen committed source.**

After restoring Desk's zero-Actions invariant, the current manuscript was audited with the exact word-token expression used by `scripts/check-book-length.py`, `\b[\w’'-]+\b`. The aggregate chapter-only projection above 65,000 was not sufficient: five numbered chapters were still below the repository's 3,000-word per-chapter floor.

Pre-remediation exact counts on Desk source `7eff8c0c097e37c306be2b7fcf6c277533730adc` were:

- Chapter 9, `ch09-placement.md`: **2,949 words**;
- Chapter 10, `ch10-discover-weekly.md`: **2,865 words**;
- Chapter 13, `ch13-feedback-without-exploration.md`: **2,914 words**;
- Chapter 15, `ch15-the-vanishing-weird.md`: **2,885 words**;
- Chapter 17, `ch17-the-politics-of-the-untested.md`: **2,586 words**.

The September 7 remediation is append-only and adds substantive argument rather than filler:

- Chapter 9: **+195 words** on treating placement reversals as evidence about the original gate, yielding **3,144 words**;
- Chapter 10: **+202 words** on accounting for the information value of exploration rather than only its immediate opportunity cost, yielding **3,067 words**;
- Chapter 13: **+164 words** on feedback-channel provenance and disagreement between production and independent evidence, yielding **3,078 words**;
- Chapter 15: **+196 words** on explicit reopening conditions after provisional negative judgments, yielding **3,081 words**;
- Chapter 17: **+480 words** on the separate evidence problem of scaling a successful pilot and preserving reversible staged adoption, yielding **3,066 words**.

The additive delta is therefore **+1,237 numbered-chapter words**. Against the previously remediated **65,480-word** chapter-only corpus, the projected current corpus is **66,717 words**. No new dated statistic, quotation, vendor metric, policy date, clinical-effect estimate, or other volatile empirical claim is introduced by this pass.

This arithmetic still does not substitute for the repository checker. Before publication, freeze the committed source and run:

`python3 scripts/check-book-length.py the-unobserved-world`

Require `healthy: true`, at least 18 numbered chapters, every numbered chapter at or above 3,000 words, and at least 65,000 chapter-only words. Then run:

`python3 scripts/check-desk.py`

Require a clean candidate/repository-integrity result under the repository's current publication convention. If either check identifies another candidate-specific defect, do not release until that defect is remediated.

No separate human-review gate is created by this update.

## Decision — September 6, 2026

**Release-cleared on substantive factual/editorial grounds; remain blocked only until the repository’s literal mechanical checks pass on the remediated frozen source.**

The September 5 review found no unresolved factual, research, rights, matter, novelty, or editorial blocker. Its only substantive publication blocker was an exact chapter-only length deficit: the committed source contained **61,357 numbered-chapter words**, **3,643 words below** the repository’s 65,000-word minimum.

That deficit has now received bounded Desk remediation on branch `remediate/unobserved-world-length-20260906`, based on Desk main `e8e96ff54b262bc165ec3d56f223d5005b086516`.

Using the same `\b[\w’'-]+\b` token regex as `scripts/check-book-length.py`, the remediation adds exactly **4,123 net numbered-chapter words**:

- Chapter 2, `ch02-the-fundamental-problem.md`: **+450 words** extending the distinction between a decision category, an observed outcome, and a causal claim, with no new dated empirical claim;
- Chapter 5, `ch05-success-can-make-you-blind.md`: **+1,365 words** extending the existing exploration/exploitation argument through proposal legibility, circular proof, external variation, strategic reopening rules, and evidence monopoly, with no new dated empirical claim;
- Chapter 8, `ch08-the-untested-patient.md`: **+2,308 words** extending the existing selective-observation argument through fragmented follow-up, measurement-regime drift, near-threshold observability, disagreement as evidence, patient-defined outcomes, and principled privacy/consent limits, with no new dated empirical claim.

Against the previously audited **61,357-word** chapter-only baseline, the remediated source therefore projects to **65,480 numbered-chapter words**, a **480-word margin** above the 65,000-word total threshold. The 20-chapter architecture, front matter, back matter, rights package, research packet, and checked README paths are unchanged.

This arithmetic is not substituted for the repository’s checker. Before publication, the remediated committed source must still receive literal successful runs of:

`python3 scripts/check-book-length.py the-unobserved-world`

and

`python3 scripts/check-desk.py`

The length checker must report `healthy: true`, at least 18 numbered chapters, every numbered chapter at or above 3,000 words, and at least 65,000 numbered-chapter words. The Desk integrity check must exit cleanly. If either command fails, do not release; record and remediate the actual failure.

No separate human-review gate is created by this review.

## Package reviewed

The canonical Desk book is `Complete draft` with 20 of 20 numbered chapters, front matter, back matter, a research brief with chapter-level falsification notes, a 23-record source ledger, `RIGHTS.md`, and `rights.json`.

The manuscript tree contains exactly the intended 22 Markdown files: front matter, 20 numbered chapters, and back matter. The book README and manuscript tree agree on chapter count and paths. No Drafting, revision, `DO NOT RELEASE`, missing-matter, or unresolved-research marker was found in the canonical book package.

The book-level rights files identify Sven Hardy Benson as author and copyright owner, use the `bookself-arr-v1` / All Rights Reserved profile, permit public reading, and reserve reproduction, derivative, commercial, and AI reuse rights except where independently permitted by law.

## Factual and research review

The existing research trail is unusually explicit about claim boundaries. It separates potential outcomes from literally observable counterfactual records; prediction from intervention; exploitation from exploration; individual welfare from institutional learning; observational recommendation-system evidence from causal claims; and partial research-funding lotteries from unrestricted random allocation.

The review preserves those boundaries. In particular, publication copy should not imply that:

- every rejected or unchosen option contains useful information;
- exploration is ethically justified merely because it is statistically informative;
- a contextual-bandit result generalizes from one hiring setting to all labor markets;
- reject inference reconstructs unobserved repayment outcomes without assumptions;
- medicine, lending, hiring, education, science funding, and public policy share one lawful or ethical exploration rule;
- algorithmic recommendation necessarily causes reduced diversity merely because observational studies find lower diversity in algorithmically driven consumption;
- funding lotteries replace peer review with pure chance; or
- generating evidence guarantees institutional adoption.

### September 5, 2026 volatile-source refresh

The three most time-sensitive 2026 lanes were rechecked against current publication or first-party pages:

1. **Li, Raymond, and Bergman, “Hiring as Exploration.”** The article is in *The Review of Economic Studies*, Volume 93, Issue 2, March 2026, pages 1200–1240, DOI `10.1093/restud/rdaf040`. Its abstract supports the manuscript’s narrow description: a contextual-bandit resume-screening approach in professional-services recruiting within one Fortune 500 firm improved eventual hiring rates among selected interview candidates while increasing demographic diversity relative to the firm’s existing practices. The setting-specific limitation remains controlling.
2. **Agte, Morales, Neilson, Otero, and Rao, “Incentives, Evidence, and Reminders for Bureaucrats: Overcoming Barriers to Policy Scale Up.”** NBER Working Paper 35291 is dated June 2026. Its nationwide Dominican Republic experiment documents a substantial implementation gap for a previously effective education intervention and reports null effects for the tested evidence-sharing, modest-incentive, and implementation-assistance treatments. The manuscript correctly uses it as setting-specific evidence that evidence generation does not guarantee scale-up.
3. **Max Bennett, “When the best decision is no decision: the rise of randomization in grant funding.”** The *Nature* career feature is dated August 11, 2026, DOI `10.1038/d41586-026-02082-7`. It remains appropriate only as current operational/journalistic context around partial randomization after eligibility or quality screening, not as primary causal evidence that lotteries dominate peer review.

No contradiction requiring manuscript remediation was found in those refreshes.

## Editorial review

The manuscript’s strongest contribution is the synthesis: decision systems partly determine which outcomes become observable and therefore which evidence future systems can learn from. The release should preserve the book’s narrower claim that this matters when selection affects exposure, access, treatment, measurement, or opportunity; it should not turn that insight into a general argument for randomization or experimentation everywhere.

The post-completion robustness passes strengthened the manuscript without changing its 20-chapter architecture, especially around policy-scorecard reopening conditions, hiring exploration governance, science-funding portfolio logic, fairness and reciprocity, credit-learning boundaries, public-policy scale-up, bounded randomization, and institutional allocation of validation capacity.

The September 6 length remediation continues that argument rather than padding it. Chapter 2 makes decision provenance explicit; Chapter 5 develops how mature institutions can make alternatives illegible before they can produce evidence; Chapter 8 deepens the distinction between a quiet clinical record and an observed healthy outcome while preserving privacy, consent, and patient welfare as independent constraints. The additions do not introduce new vendor metrics, policy dates, clinical-effect estimates, or other volatile quantitative claims.

No further manuscript prose change is required by the substantive review unless the literal mechanical checks identify a specific failure.

## Mechanical release conditions

The original reviewed source failed the total-word requirement:

- generated manuscript total: **66,129 words**
- front matter: **2,151 words**
- back matter: **2,621 words**
- original chapter-only total: **61,357 words**
- required chapter-only total: **65,000 words**
- original deficit: **3,643 words**

The bounded remediation adds **4,123 chapter-only words**, yielding a projected remediated total of **65,480 words** under the checker’s regex.

The remediated frozen source must now receive a literal full run of:

`python3 scripts/check-book-length.py the-unobserved-world`

Require `healthy: true`, at least 18 numbered chapters, every numbered chapter at or above 3,000 words, and at least 65,000 chapter-only words.

Then run:

`python3 scripts/check-desk.py`

Require a clean exit with the canonical book folder, root Reader/catalog surfaces, direct Reader slug, feedback picker, and Desk compatibility guards in agreement.

If both pass and the remediated frozen source still matches the reviewed manuscript/research/rights boundaries, no additional factual or human-review gate is required by this artifact.

## Final checklist

- [x] Canonical status is `Complete draft`.
- [x] README lists 20 of 20 chapters and complete front/back matter.
- [x] Manuscript tree contains front matter, 20 numbered chapters, and back matter.
- [x] Research brief includes chapter-level source trails and falsification notes.
- [x] Source ledger contains the book’s primary evidence lanes and explicit use boundaries.
- [x] The most volatile 2026 sources were rechecked on September 5, 2026.
- [x] Book-level `RIGHTS.md` and `rights.json` are present and coherent.
- [x] No unresolved factual, research, rights, matter, novelty, or editorial blocker remains in this review.
- [x] Original mechanical chapter-only total evaluated: **61,357 words**.
- [x] Bounded chapter-only expansion completed: **+4,123 words**, projecting **65,480 words** total.
- [x] September 7 per-chapter audit identified and remediated five sub-3,000-word chapters with **+1,237** additional substantive words, projecting **66,717** chapter-only words.
- [ ] Run the full `python3 scripts/check-book-length.py the-unobserved-world` command on the remediated frozen Desk source and require a pass across all 20 chapter files.
- [ ] Run `python3 scripts/check-desk.py` on the same frozen Desk source and require a pass under the current repository publication convention.
