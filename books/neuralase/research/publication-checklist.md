# Publication Checklist — Neuralase

This checklist governs the first publication candidate for **Neuralase: Transformer Loops and the Intelligence of the Second Pass**. Desk remains the canonical working source. Sven Hardy Benson’s Shelf will hold a frozen released snapshot, not a live mirror.

## Gate 1 — Manuscript integrity and scope

- [x] Front matter present.
- [x] Chapters 1–18 present and linked from the book README.
- [x] Back matter present.
- [x] `RIGHTS.md` and `rights.json` present with the intended public-reading / All Rights Reserved profile.
- [x] Research brief, source registry, chapter-source map, falsification notes, and editorial review present.
- [x] Desk catalog and discovery registrations exist for the book.
- [x] The generated Desk manuscript-directory count is 71,701 words.
- [x] Front matter is 1,725 words and back matter is 1,285 words under the Desk `WORD_RE` definition, leaving an exact chapter-only total of **68,691 words**.
- [x] The three smallest chapter files by byte size were counted directly with the same regex: Chapter 1 = 3,397 words; Chapter 14 = 3,395; Chapter 15 = 3,385. All clear the 3,000-word floor.
- [ ] Run `python3 scripts/check-book-length.py neuralase` against the frozen Desk source and require `healthy: true`, all 18 chapters at or above 3,000 words, and at least 65,000 chapter-only words.

The all-chapter command is the only unresolved release condition recorded by the merged September 5 release decision. The current connector-only environment cannot execute it because no local Desk checkout can resolve GitHub. That limitation must not be converted into a claimed pass.

## Gate 2 — Claims and research

- [x] The book distinguishes fixed Transformer layer depth, autoregressive token generation, external agent loops, and recurrent-depth Transformer computation.
- [x] “Neuralase” is explicitly disclosed as Sven Hardy Benson’s coined organizing term rather than an established biological process, scientific field, or claim of priority over the underlying research traditions.
- [x] Positive evidence for chain-of-thought, self-consistency, search, tool use, process verification, test-time compute, adaptive computation, recurrent depth, and latent reasoning is represented in the research trail.
- [x] Negative evidence on intrinsic self-correction, chain-of-thought faithfulness, diminishing returns, and overthinking is preserved as central evidence rather than minimized.
- [x] Frontier recurrent-depth and overthinking sources most exposed to recency risk were rechecked against official proceedings or first-party research pages in September 2026.
- [x] The manuscript avoids treating 2025–2026 research directions as settled production winners.

## Gate 3 — Editorial coherence

- [x] The central mechanism remains controlled re-entry: what returns, what changes, what discriminates improvement, how compute is allocated, and what stops the process.
- [x] The robustness pass deepened Chapters 2–18 around state dynamics, difference, friction, branching, world contact, memory, latent computation, explanation, halting, controller design, economics, and overthinking.
- [x] The late manuscript was returned to continuous narrative prose rather than presentation-style framework density.
- [x] The book repeatedly preserves the boundary that a loop is not intelligence by itself; a productive loop must make an important failure harder to preserve.
- [x] No unresolved factual, novelty, rights, or substantive editorial blocker remains in the merged release review.

## Gate 4 — First-edition package

- [x] Author metadata uses **Sven Hardy Benson**.
- [x] Format is **Book**.
- [x] Publisher is **Svyable**.
- [x] Edition is **First edition**.
- [x] Language is **English**.
- [x] Draft date is recorded as **2026-09-04**, the date the complete manuscript first landed in Desk.
- [x] Candidate date is recorded as **2026-09-06**.
- [x] Shelf currently has no `books/neuralase/` publication, so this will be a first release rather than an in-place public revision.
- [x] Desk remains `Complete draft`; the Desk copy must not be marked `Published`.

The author asked to continue toward publication on 2026-09-06. This authorizes first-edition candidate preparation. It does not override the explicit mechanical length gate and must not be read as permission to publish a candidate that fails that check.

## Gate 5 — Freeze and release transaction

- [x] Freeze the first-edition candidate under the named Desk ref `release/neuralase-first-edition-2026-09-06`.
- [ ] Run `python3 scripts/check-book-length.py neuralase` on that frozen source and record the result.
- [ ] Only after a passing result, prepare the Shelf snapshot using the same semantics as `scripts/release-book.sh neuralase ../shelf`.
- [ ] Copy the committed Desk book snapshot to Shelf with byte-identical publication files except for the intended Shelf book-README status transformation to `Published` and Shelf catalog/discovery updates.
- [ ] Verify the Shelf book README says exactly `Published` and the root Shelf catalog contains one Neuralase row.
- [ ] Verify the public Reader route for the released book.
- [ ] Record the frozen Desk source commit in the Desk book README after the Shelf release lands.

## Release rule

Publish only from the named frozen Desk ref `release/neuralase-first-edition-2026-09-06` after it passes `python3 scripts/check-book-length.py neuralase`. Do not create an unmerged public Shelf proof branch merely to stage the manuscript before that gate is closed. Once released, Shelf is the frozen public edition; later manuscript changes belong on Desk and require a new release transaction unless the author explicitly requests a live public hotfix.
