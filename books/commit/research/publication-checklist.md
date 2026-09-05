# Publication Checklist — Commit

This checklist governs the first publication candidate for **Commit: How Git Became the Memory of Software—and What Comes Next**. Desk remains the canonical working source; Sven Hardy Benson’s Shelf will hold a frozen released snapshot, not a live mirror.

## Gate 1 — Manuscript integrity and scope

- [x] Front matter present.
- [x] Chapters 1–22 present and linked from the book README.
- [x] Four publication interludes added and linked from the book README.
- [x] Rights notice and machine-readable rights metadata present.
- [x] Research brief and source ledger present.
- [x] Desk Reader/discovery registrations exist for the book.
- [x] Reader-facing back matter present.
- [x] Short-section problem addressed with evidence-led expansion rather than padding: four new interludes add 12,261 words by the repository’s `WORD_RE` definition (3,185 + 3,050 + 3,018 + 3,008).
- [ ] Generate the exact whole-manuscript dashboard word count with `python3 scripts/catalog.py --write` from a local checkout.
- [ ] Run the repository-generated per-file count locally for archival bookkeeping.

Publication review found Chapter 17 at 2,105 words using the same word-count regular expression as `scripts/catalog.py`. Rather than artificially stretch the existing chapters, the final candidate adds four substantive, source-backed interludes covering social-history preservation, source-to-artifact provenance, agent-scale branch orchestration, and long-term software archiving. The added 12,261 words move the completed manuscript into the repository’s intended full-length range by a conservative scope estimate. The exact generated dashboard count remains unavailable in the connector-only environment and must not be misrepresented as locally generated.

## Gate 2 — Claims and research

- [x] Git’s April 2005 origin is anchored to the first public commit, original README, and official Git history.
- [x] Object-model, branching, distributed-workflow, merge, signing, worktree, and large-repository mechanics are grounded primarily in Git’s own documentation.
- [x] Git 2.55, the Git 3.0 roadmap, SHA-256 migration, reftable, partial clone, protocol v2, and bundle URI claims are separated into current implementation, declared project direction, and author forecast.
- [x] The manuscript does not describe Git history as immutable and does not conflate Git with GitHub.
- [x] Jujutsu, Sapling, Pijul, Git LFS, and GitHub-specific workflow claims use first-party sources where relevant.
- [x] GitHub’s 2008 launch/history and Microsoft’s 2018 acquisition have first-party sources.
- [x] SHAttered, GitHub’s SHA-1 collision defenses, CVE-2022-24765 / `safe.directory`, Microsoft’s GVFS scaling work, Git LFS’s 2015 launch, and GitHub artifact attestations have primary or first-party anchors.
- [x] New interludes are grounded in GitHub migration/agent documentation, `git-notes`, `git-bundle`, SLSA build provenance, and Software Heritage archival documentation.
- [x] Revalidated on 2026-09-04 that git-scm.com still lists Git 2.55.0 as the latest released source version.
- [x] Revalidated on 2026-09-04 that Git’s BreakingChanges document still says Git 3.0 has no planned release date.
- [x] Revalidated on 2026-09-04 that current Jujutsu Git-backed/colocated compatibility, Sapling Git support modes, and Pijul’s change-centered model remain accurately described.

## Gate 3 — Editorial coherence

- [x] The core distinction between distributed possession and social authority remains consistent across the manuscript.
- [x] The book distinguishes the Git object graph from forge metadata and institutional process layered around it.
- [x] The future section treats replacement as layer-specific rather than assuming one successor must replace Git wholesale.
- [x] The compressed historical/technical middle was deepened with concrete organizations, incidents, migrations, and scaling cases.
- [x] The final expansion adds new territory rather than repeating the existing thesis: social-memory portability, provenance, proposal orchestration, and preservation.
- [x] Forward-looking passages distinguish forecast from current implementation; publication-day current-state claims were revalidated immediately before candidate freeze.
- [ ] A future post-publication Desk revision may still perform a slower line-level rhythm/copyedit pass; it must not silently rewrite the released Shelf edition.

## Gate 4 — Publication package

- [x] Reader-facing back matter includes a current-snapshot note, selected primary sources/further reading, and the boundary between Git facts and forecasts.
- [x] First-edition metadata is present: format, publisher, language, edition, and candidate date.
- [x] `RIGHTS.md` and `rights.json` match the intended public-reading / All Rights Reserved release terms.
- [x] All contents entries point to committed manuscript files in the publication candidate.
- [ ] `python3 scripts/check-desk.py` could not be executed in the connector-only environment because no network-accessible local checkout is available; do not claim it passed.
- [ ] `python3 scripts/catalog.py --write` likewise remains a local bookkeeping follow-up for the exact dashboard count.

The author explicitly authorized publication on 2026-09-04 after the evidence-led expansion. This authorization permits the release transaction despite the unavailable local-only bookkeeping checks; it does not convert those checks into passed checks. Structural, metadata, rights, source-ledger, and publication-state invariants are verified through the connected repositories before release.

## Gate 5 — Edition strategy and release transaction

- [ ] Freeze the exact Desk commit selected for the first edition.
- [ ] Copy the frozen committed Desk snapshot to Shelf using the same semantics as `scripts/release-book.sh commit ../shelf`.
- [ ] Transform only the Shelf book README status to `Published` plus Shelf catalog/discovery state.
- [ ] Verify the Shelf publication file set against the frozen Desk candidate and record any intentional release-only differences.
- [ ] Verify Shelf catalog/discovery metadata and Reader link.
- [ ] Land Shelf and Desk release-record changes as a coordinated, traceable transaction.

## Release rule

Publish only from a named frozen Desk commit. Shelf is a released snapshot, not a live mirror. Any later Desk revision belongs to a future edition unless the author explicitly requests a public hotfix.
