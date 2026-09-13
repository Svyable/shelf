# Release review — Hallucinations: How AI Leads Us Astray

Reviewed: 2026-09-06  
Desk source reviewed: `6cc8acf3bbaffec1886f50a26ea4769ee1400b04`

## Decision

**Remain blocked with precise remediations.**

The current factual/research packet is coherent and the principal contemporary claims checked in this pass remain supportable with the manuscript's existing caveats. The controlling release blocker is manuscript depth: the current Desk catalog reports 61,361 manuscript words, while the repository publication standard requires at least 65,000 words across numbered chapters alone and at least 3,000 words in every numbered chapter.

Because the displayed 61,361 count is already below the 65,000 numbered-chapter minimum before excluding front and back matter, the current manuscript necessarily fails the total-length publication gate. The exact chapter checker must still be run after substantive deepening to identify any individual chapters below the 3,000-word floor.

## Factual and research review

The manuscript's central thesis is deliberately narrower than a claim that hallucination is purely a model defect or that downstream design can eliminate model error. It treats consequential hallucination as a representation-lifecycle problem in which unsupported content can acquire authority through users, interfaces, workflows, memory, databases, agents, or institutions. The research brief also preserves the countercase that calibrated trust matters: users can underuse systems that outperform them, and the goal is not blanket skepticism.

Current-source verification in this pass confirmed the main modern evidence lanes:

- NIST AI 600-1, the Generative AI Profile, remains a voluntary cross-sector companion to the AI Risk Management Framework and uses lifecycle risk framing for generative AI. The manuscript's use of NIST for terminology and risk framing remains appropriately bounded.
- OpenAI's September 5, 2025 research publication *Why language models hallucinate* explicitly argues that standard training and evaluation can reward guessing over acknowledging uncertainty and connects hallucination to next-word prediction. The manuscript correctly treats this as one developer's research explanation rather than a universal numeric law.
- Stanford HAI's 2026 AI Index Responsible AI chapter reports large variation in hallucination performance across tested models and a benchmark in which performance drops when false statements are framed as the user's own belief. The manuscript's source note correctly requires any numeric use to remain tied to the named benchmark/report.
- C2PA's current specifications explicitly distinguish provenance from truth: a valid manifest does not establish that content is true, and absence of Content Credentials does not establish that content is untrustworthy. The manuscript's provenance/truth distinction remains well grounded.
- The research packet's legal and institutional examples remain carefully bounded: *Mata v. Avianca* is used as a documented fabricated-citation incident rather than prevalence evidence; *Moffatt v. Air Canada* is treated in its specific tribunal posture; ABA Formal Opinion 512 is professional guidance rather than a universal legal mandate.

No checked source supports upgrading the thesis to claims that all language models hallucinate at a fixed rate, that retrieval or provenance solves truth, that synthetic data inevitably causes model collapse, that human review is always safer, or that any single documented incident establishes prevalence. Those stronger claims remain excluded by the book brief and source notes.

## Package state

- Canonical status: `Complete draft`.
- Manuscript: front matter, 29 of 29 numbered chapters, and back matter are checked in the book README.
- Rights: `RIGHTS.md` and `rights.json` are present under the repository's `bookself-arr-v1` profile.
- Research: book brief, chapter briefs/falsification notes, source notes, and a source ledger are present.
- Source ledger: current canonical `id,year,author_or_institution,title,source_type,book_use,url` schema.
- No `Drafting`, revision, or `DO NOT RELEASE` marker was found in the canonical book status reviewed here.

## Controlling release remediation

1. Substantively deepen the numbered manuscript until the exact repository checker reports every numbered chapter at least 3,000 words and at least 65,000 words across numbered chapters. Do not pad prose merely to satisfy the metric.
2. Run `python3 scripts/check-book-length.py hallucinations` on one frozen Desk source and record a clean result.
3. Reconcile any intervening factual/current-source changes that materially affect the manuscript, preserving the evidence boundaries above.
4. Run `python3 scripts/check-desk.py` on the same publication base and repair any repository-wide catalog/discovery integrity failures that would block release.
5. Only after those gates pass, freeze the committed Desk source and prepare the matched Desk/Shelf publication transaction. Desk remains the working edition; Shelf receives the intentional snapshot.

Until those steps pass, do not release this title to Shelf.
