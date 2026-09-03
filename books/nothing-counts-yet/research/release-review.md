# Release Review — Nothing Counts Yet

Reviewed 2026-09-03 for a deliberate first Shelf release.

## Decision

**Release-cleared subject only to mechanical publication steps.**

The canonical Desk book is an explicit `Complete first draft` with 20 of 20 numbered chapters drafted, front matter, back matter, book-level rights notice, machine-readable rights metadata, Reader configuration, a book brief, and source notes. No `Drafting`, `Revision`, `DO NOT RELEASE`, incomplete-review, or unresolved release-blocker marker was found in the canonical book metadata or research packet.

## Manuscript integrity

The canonical manuscript tree contains:

- `front-matter.md`;
- Chapters 1–20, matching every checked path in the book README; and
- `back-matter.md`.

The book README reports the same complete structure and keeps Desk in the working-edition state `Complete first draft`; publication must not change Desk to `Published`.

## Rights and publication matter

The book includes both `RIGHTS.md` and `rights.json`. The intended Shelf snapshot should also carry `reader.json`, the research packet, and the complete manuscript rather than only the numbered chapters.

## Research and factual review

The manuscript is primarily an original conceptual synthesis about provisional infrastructure: rehearsal, drafts, simulations, apprenticeship, sandboxes, pilots, play, and other low-stakes environments that separate learning from final judgment.

The source notes identify the relevant established literatures and, importantly, preserve their limits:

- deliberate practice is not treated as a universal monocausal explanation of expertise;
- exploratory learning is not treated as automatically superior to guided instruction;
- psychological safety is distinguished from the broader consequence architecture the book calls provisional infrastructure;
- AI rehearsal is framed around a falsifiable transfer question—what remains when assistance is reduced or removed—rather than a claim that current AI systems have already solved tutoring or skill formation; and
- the title/novelty note makes only the defensible claim that the drafting search did not surface an existing book organized around this synthesis, not that absolute novelty was proven.

The AI-facing manuscript passages inspected for release are product-agnostic design arguments. They do not depend on a volatile benchmark score, product launch, current market-share figure, current officeholder, or other time-sensitive factual assertion that would require a 2026 point-in-time correction before publication.

The manuscript's historical and research-facing claims are therefore appropriately bounded by the existing source packet for this first release. The book should not be presented as claiming that practice, rehearsal, simulation, apprenticeship, play, pilots, or learning from error are new discoveries; its originality claim is the category and synthesis stated in the research notes.

## Known limits that are not release blockers

This is a first-draft edition, not a claim of final scholarship. Later Desk revisions can deepen citations around learning transfer, context collapse, AI tutoring, privacy, workplace analytics, and regulatory sandboxes without altering the coherence of the current conceptual edition.

Those future research opportunities do not create a present factual contradiction or missing-matter blocker.

## Mechanical publication steps

1. Freeze the reviewed committed Desk source.
2. Create a complete Desk → Shelf snapshot from that frozen commit.
3. Transform only Shelf publication metadata required by the Bookself model, including Shelf `Status: Published`.
4. Add/update Shelf catalog and feedback/discovery surfaces required by current repository conventions.
5. Record the frozen Shelf release source on Desk while preserving `Complete first draft`.
6. Verify the Shelf file set and unchanged publication-file contents against the frozen Desk commit.
7. Land the Shelf and Desk halves as one coordinated transaction only if both remain mergeable and all checks that actually exist succeed.
