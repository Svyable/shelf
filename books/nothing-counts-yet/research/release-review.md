# Release Review — Nothing Counts Yet

Reviewed 2026-09-03 for a deliberate 25-chapter publication candidate.

## Decision

**Publication candidate cleared for freeze-and-snapshot mechanics.**

The canonical Desk book now contains 25 of 25 numbered chapters, front matter, back matter, book-level rights notice, machine-readable rights metadata, Reader configuration, a book brief, source notes, and an explicit publication checklist. The earlier 20-chapter Shelf edition remains a frozen released snapshot and must not be silently overwritten.

## Manuscript integrity

The canonical manuscript tree contains:

- `front-matter.md`;
- Chapters 1–25, matching every checked path in the book README; and
- `back-matter.md`.

Chapters 21–25 extend the existing thesis rather than reopening its ending:

- **21 — The Cost of Being Seen Learning** extends the backstage argument to status, expertise, and the difficulty of becoming a novice again.
- **22 — The Forgetting Machine** extends the recording/privacy argument into retention, expiry, and developmental records.
- **23 — The Last Human Repetition** extends the apprenticeship/AI argument into automation, task allocation, and the disappearance of routine experiences that formerly trained judgment.
- **24 — The Secret Curriculum** extends the institutional argument into the consequences people observe after someone asks, reports, admits, or challenges.
- **25 — The Architecture of Courage** closes the expansion by distinguishing meaningful courage at the gate from needless courage taxes imposed by bad systems.

The book README reports the same complete structure. Desk remains the working source; publication must not change Desk to `Published`.

## Rights and publication matter

The book includes both `RIGHTS.md` and `rights.json`. The intended Shelf snapshot should also carry `reader.json`, the research packet, the publication checklist, and the complete manuscript rather than only the numbered chapters.

## Research and factual review

The manuscript is primarily an original conceptual synthesis about provisional infrastructure: rehearsal, drafts, simulations, apprenticeship, sandboxes, pilots, play, and other low-stakes environments that separate learning from final judgment.

The source notes identify the relevant established literatures and preserve their limits:

- deliberate practice is not treated as a universal monocausal explanation of expertise;
- exploratory learning is not treated as automatically superior to guided instruction;
- psychological safety is distinguished from the broader consequence architecture the book calls provisional infrastructure;
- automation is not claimed to automatically cause deskilling; Chapter 23 is bounded by human-factors work on out-of-the-loop performance, situation awareness, vigilance, and skill degradation;
- speaking up is not reduced to individual bravery; Chapter 24 is bounded by research on fear, leadership, organizational climate, and psychological safety in error reporting;
- Chapter 22’s retention argument is framed as lifecycle architecture, not a universal legal claim;
- AI rehearsal is framed around a falsifiable transfer question—what remains when assistance is reduced or removed—rather than a claim that current AI systems have already solved tutoring or skill formation; and
- the title/novelty note makes only the defensible claim that the drafting search did not surface an existing book organized around this synthesis, not that absolute novelty was proven.

The AI-facing manuscript passages remain product-agnostic design arguments. They do not depend on a volatile benchmark score, product launch, current market-share figure, current officeholder, or other time-sensitive factual assertion that would require a 2026 point-in-time correction before publication.

The manuscript's historical and research-facing claims are therefore appropriately bounded by the expanded source packet for this conceptual edition. The book should not be presented as claiming that practice, rehearsal, simulation, apprenticeship, play, pilots, learning from error, psychological safety, data minimization, or automation-related capability risk are new discoveries; its originality claim is the category and synthesis stated in the research notes.

## Editorial coherence checks

The expanded manuscript preserves the book’s important distinctions:

- low stakes are not low standards;
- privacy is not impunity;
- practice is not permanent avoidance;
- developmental data is not automatically evaluative data;
- assistance is useful only if capability transfers when support withdraws; and
- a healthy system is generous before the gate and serious after it.

No new chapter reverses the book’s governing sequence: bounded attempt → feedback → repetition → increased fidelity/exposure → withdrawal of support → visible gate into responsibility.

## Known limits that are not release blockers

This is a publication candidate for a conceptual trade edition, not a claim of exhaustive scholarship. Later Desk revisions can deepen citations around identity/status and learning, context collapse, AI tutoring, privacy, workplace analytics, regulatory sandboxes, and human-automation interaction without altering the coherence of the current edition.

Those future research opportunities do not create a present factual contradiction or missing-matter blocker.

## Mechanical publication steps

1. Freeze the exact reviewed Desk commit containing the 25-chapter candidate.
2. Create a complete Desk → Shelf snapshot from that frozen commit as a new release state, leaving the existing 20-chapter Shelf snapshot historically traceable.
3. Transform only Shelf publication metadata required by the Bookself model, including Shelf `Status: Published` and the correct edition label.
4. Add/update Shelf catalog and feedback/discovery surfaces required by current repository conventions.
5. Record the frozen release source on Desk while preserving Desk as the canonical working edition.
6. Verify the Shelf file set and unchanged publication-file contents against the frozen Desk commit.
7. Land the Shelf and Desk halves as one coordinated transaction only if both remain mergeable and all checks that actually exist succeed.

## Release blocker rule

A mismatch between the candidate’s actual chapter count, research review, rights package, edition metadata, or frozen source commit is a blocker. Cosmetic improvements and future citation depth are not.
