# Publication Readiness Review — 2026-09-03

## Candidate

**APPEAL: How Civilization Corrects Its Decisions** by Sven Hardy Benson.

This review records the state of the Desk candidate immediately before publication preparation. It is an editorial and repository-control document, not a claim that every legal or administrative procedure described in the manuscript will remain unchanged after publication.

## Structure

- Front matter present.
- Prologue present.
- 26 numbered chapters present and linked from the canonical README.
- Epilogue present.
- Back matter present.
- Rights notice and machine-readable rights metadata present.
- Research brief, chapter briefs/falsification notes, and source ledger present.

The original 20-chapter architecture was deliberately extended with six final-act chapters covering machine-readable appeals, restoration, public escalation, deadlines, an operational appeal test, and a stakes-based right to reconsideration. These chapters deepen the central thesis rather than opening unrelated topic lanes.

## Evidence audit

The manuscript's factual case studies are anchored primarily in official or first-party sources:

- U.S. Courts for the federal appellate structure.
- Social Security Administration for disability appeals.
- HealthCare.gov / CMS for insurance and Medicare review.
- Consumer Financial Protection Bureau for credit-report and electronic-fund-transfer disputes.
- Internal Revenue Service for the Independent Office of Appeals.
- Department of Veterans Affairs for Higher-Level Review, Supplemental Claims, and Board Appeals.
- Department of Justice / EOIR for Board of Immigration Appeals procedure.
- European Commission and EUR-Lex for the Digital Services Act, GDPR, and AI Act.
- Meta Oversight Board for the institutional content-review example.

The source ledger distinguishes institutional claims from broader analytical conclusions. Later design chapters are primarily conceptual and do not rely on invented statistics, quotations, or composite characters.

## Falsification discipline

The manuscript preserves the strongest counterclaims:

- Appeals can add delay, expense, inconsistency, and opportunities for strategic abuse.
- Finality is a public good; the book argues for bounded corrigibility, not endless reconsideration.
- Human review is not automatically superior to automated review.
- A high reversal rate is not a simple quality score.
- External review is not appropriate or available for every class of dispute.
- Security, fraud prevention, privacy, confidentiality, and trade-secret constraints can justify limits on disclosure.
- Public pressure remains necessary for changing bad rules even when individual appeal processes work well.
- Not every consequential private decision creates an existing legal right to appeal; the final normative framework is explicitly presented as a design principle rather than a universal statement of current law.

## Editorial boundaries

The book is comparative institutional nonfiction, not individualized legal, medical, financial, tax, benefits, immigration, or platform-policy advice. Procedures and deadlines can change. The manuscript repeatedly directs readers facing a live dispute back to current official sources.

Private-platform analogies to courts or constitutional structures are functional analogies, not claims that private companies are governments or that constitutional doctrine automatically applies.

## Publication thesis

The book's durable claim is:

> As first decisions become cheaper and more automated, meaningful second decisions become more valuable. Appealability is the error-correction infrastructure that keeps scaled decision systems answerable to reality.

The final act sharpens that thesis into an operational standard: identify the decision, make the reason usable, preserve provenance, publish a route, provide usable time, admit the right evidence, create a different failure mode, empower a real remedy, contain urgent harm, and learn from reversals.

## Remaining mechanical controls

The connected GitHub environment cannot execute the repository's local Python tooling from a checked-out worktree. The branch has therefore been prepared so the repository's current invariants can be inspected directly: every checked manuscript link resolves to a committed file; research-ledger schema matches `scripts/check-desk.py`; rights metadata is present; and the canonical book README is marked **Complete draft** only after the manuscript was expanded beyond its original structural draft.

Shared Desk discovery manifests must be synchronized from current `main` when the book lands, because this long-running branch intentionally avoided overwriting catalog changes made by concurrent book work. The Desk → Shelf release should snapshot the merged Desk candidate, mark only the Shelf README `Published`, register the book in Shelf, and preserve Desk as the working edition.

## Decision

**Editorial state: Complete draft; approved to proceed to repository synchronization, merge, and deliberate Shelf snapshot.**

Publication should stop only for an objective repository conflict, malformed source ledger, broken Reader manifest, rights mismatch, or failed Desk/Shelf parity check.