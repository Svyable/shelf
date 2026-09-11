# Release review — Deceptatron: Propaganda in the 2030s

Reviewed: 2026-09-08  
Desk source reviewed: `ccc2931674e46548787f4dc08c97144dff9e1a23`

## Decision

**Remain blocked with precise remediations.**

The manuscript's core factual framing remains supportable on the existing research packet, required rights/source-ledger repairs are present, the bounded depth remediation requested by the prior review has now been carried through the complete numbered manuscript, and the non-executable package/discovery surfaces were re-verified on the frozen Desk source above. The controlling remaining gates are the repository's executable local validation and regeneration steps, not another open-ended editorial or factual-review pass.

## Factual and research review

The central thesis remains deliberately narrower than a claim of AI mind control: adaptive, low-cost, repeated persuasion can change the economics of influence even when individual effects are modest and unstable. The current manuscript preserves that distinction.

The principal modern evidence lanes previously checked remain controlling:

- Salvi et al. (Nature Human Behaviour, 2025) support a bounded claim that personal information improved persuasive performance in a controlled short-debate setting; the manuscript does not convert the reported odds ratio into an election-conversion rate or evidence of durable voting behavior.
- Bai et al. (Nature Communications, 2025) support small policy-attitude effects from LLM-generated messages in preregistered experiments; the manuscript does not generalize those effects into population-scale political control.
- Lin et al. (Nature, 2025) support candidate-preference effects from AI dialogues across multiple election contexts while remaining experimental capability evidence rather than proof of a deployed covert end-to-end system.
- The FTC's January 17, 2025 surveillance-pricing findings support the narrower proposition that granular behavioral and contextual signals can be operationalized for individualized commercial treatment; the manuscript continues to mark the political application as an analogy rather than evidence of deployment.
- C2PA Harms Modelling v2.4 supports the provenance/truth distinction: valid manifests do not establish truth, and missing Content Credentials do not establish falsity.

No depth pass added a new named empirical result that requires upgrading these factual lanes. The expansions concentrate on institutional consequences, accountability, user control, sequence-level auditing, verification latency, provenance governance, common-reality infrastructure, selective friction, democratic counterintelligence, and the limits that should constrain optimization.

No reviewed source supports reliable individualized mind control, guaranteed persuasion, population-scale election control, or proof that a complete "Deceptatron" is already operational. Those stronger claims remain excluded.

## Package readiness already repaired

The prior readiness cycle repaired two book-local integrity defects:

1. `RIGHTS.md` and `rights.json` use the repository's `bookself-arr-v1` All Rights Reserved profile for this title.
2. `research/source-ledger.csv` uses the canonical `id,year,author_or_institution,title,source_type,book_use,url` schema with stable source rows and material cautions retained in `book_use`.

Front matter, back matter, README/TOC, research brief, source ledger, robustness/falsification material, and rights metadata remain part of the canonical package.

## Depth remediation completed

The original reviewed catalog snapshot reported 44,716 words across all Markdown files in the book directory, which necessarily placed the numbered-chapter corpus below the repository's 65,000-word chapter-only gate.

Substantive remediation has since proceeded across the manuscript rather than by padding:

- PR #1395 deepened Chapter 3, **The Audience Becomes a Model**, adding 994 exact checker-token words around model usefulness versus global accuracy, model decay, resistance/counter-optimization, and user-facing model control.
- PR #1398 deepened Chapter 4, **The Argument Learns Your Weakness**, around inference error, cheap persistence, user resistance, design controls, adaptation records, and sequence-level accountability.
- PR #1401 deepened Chapters 1, 2, and 5–13 as one coherent pass, adding approximately 14,803 checker-token words across accountability, public legibility, synthetic social proof, persistent-agent loyalty, memory provenance, counterfactual feeds, emotional-context boundaries, and supply-chain responsibility.
- PR #1404 deepened Chapters 14–20 around system composition and reversibility, verification latency, provenance appeals and recoverability, public comparability and version history, measurable selective friction, contestable attribution, and civic/institutional alignment.
- PRs #1410, #1411, and #1412 then repaired three concrete chapter-floor failures found by exact checker logic: Chapter 20 from 2,199 to 3,236 words, Chapter 16 from 2,387 to 3,213 words, and Chapter 15 from 2,541 to 3,040 words.

The review does not claim that arithmetic on historical catalog totals proves the full length gate; only the repository checker on the frozen committed source can do that.

## Frozen-source package/discovery verification

On Desk source `ccc2931674e46548787f4dc08c97144dff9e1a23`, the non-executable publication surfaces were re-read directly:

- `books/deceptatron/README.md` remains `Status: Complete first draft`, records 20 of 20 drafted chapters, links front matter, all 20 numbered chapters, back matter, research brief, source ledger, release review, and rights material, and does not contain a Drafting/revision/Published/DO NOT RELEASE state override.
- `RIGHTS.md` and `rights.json` agree on title, author/copyright owner, 2026 copyright year, `bookself-arr-v1`, All Rights Reserved, and public-reading posture.
- Root `llms.txt` contains the canonical Deceptatron Desk README route.
- `.github/ISSUE_TEMPLATE/chapter-feedback.yml` contains the `deceptatron` slug.
- Root Desk README still identifies Deceptatron in the 14-title Desk-only complete-release queue, but its generated catalog row still reports the pre-remediation 44,716-word snapshot. That stale row is a concrete regeneration item, not evidence of current manuscript length.

No Shelf counterpart exists yet, which is correct while publication remains blocked. No publication-side Desk bookkeeping or Shelf snapshot should be created until the executable gates below pass.

## Remaining mechanical release gates

1. Run `python3 scripts/check-book-length.py deceptatron` on frozen Desk source `ccc2931674e46548787f4dc08c97144dff9e1a23`. It must report at least 18 numbered chapters, every numbered chapter at least 3,000 words, and at least 65,000 numbered-chapter words total.
2. Run `python3 scripts/check-desk.py` on that same source and resolve any title-local or repository-wide integrity failure that controls publication.
3. Run the canonical catalog regeneration from that same source, including sibling Shelf state, so the stale 44,716-word root row and release-review summary are replaced by current generated values.
4. Re-read the regenerated diff and confirm required matter, rights files, Reader/direct-route discovery, feedback dropdown, and intended research packet remain coherent.
5. If and only if those gates pass with no Drafting/revision/DO NOT RELEASE marker or other controlling blocker, create the matched Desk/Shelf publication transaction from the resulting exact committed Desk source. Desk remains the working edition; Shelf receives the `Published` snapshot.

## Release posture

**Release-cleared subject to explicitly enumerated mechanical steps, but not yet cleared to create or merge the Shelf snapshot.**

The substantive factual/readiness review and direct package/discovery inspection are complete. The next action is executable local validation and catalog regeneration on the frozen Desk source. If either checker reports a concrete failure, that failure becomes the precise blocker; do not reopen generalized review language.