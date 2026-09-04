# Publication checklist

This file tracks the release pass for **The Delete Key**.

## Gate 1 — Complete the argument

- [x] Book premise and novelty claim fixed
- [x] 25-chapter architecture fixed
- [x] Chapters 1–25 drafted
- [x] Back matter completed

Exit criterion met: the manuscript has a complete beginning, middle, and end.

## Gate 2 — Evidence pass

- [x] Research brief created
- [x] Source ledger populated with authoritative source candidates
- [x] Biological analogies bounded explicitly against social or legal overreach
- [x] Regulatory and privacy claims tied to OECD, EU/European Commission, and EDPB materials
- [x] Legacy-system claims tied to current GAO oversight
- [x] Data-destruction vocabulary tied to NIST SP 800-88 Rev. 2
- [x] Counterevidence appears inside the manuscript: rare-event systems, historical evidence, legal duties, resilience, transition risk, and power to erase

Exit criterion met for this edition: the thesis is stated as safe removal capability, not indiscriminate deletion.

## Gate 3 — Structural edit

- [x] Five-chapter arcs progress from diagnosis → analogy → institutions → design → synthesis
- [x] Retire, revoke, archive, and destroy remain distinct operations
- [x] Non-use is not treated as proof of obsolescence
- [x] Final five chapters convert the diagnosis into lifecycle design principles
- [x] Chapter functions are distinct enough to preserve a readable progression

## Gate 4 — Adversarial edit

- [x] Premature deletion and false non-use addressed
- [x] Historical erasure and destruction of evidence addressed
- [x] Emergency systems, redundancy, and rare-event capability addressed
- [x] Legal holds and conflicting retention duties addressed
- [x] Power concentration around deletion authority addressed
- [x] Review overload and ceremonial sunset processes addressed

## Gate 5 — Line edit and voice

- [x] Release pass avoids invented quotations and unsupported named anecdotes
- [x] Concrete mechanisms replace generic “delete more” rhetoric
- [x] Sven Hardy Benson voice retained: practical, skeptical, optimistic, and technical enough to survive contact with a terminal
- [x] Terminology normalized around lifecycle operations
- [x] Final section lands on intentional persistence rather than minimalism

## Gate 6 — Publication package

- [x] Title: **The Delete Key**
- [x] Subtitle: **Why Civilization Can Add Almost Anything and Remove Almost Nothing**
- [x] Author credit: Sven Hardy Benson
- [x] Front matter complete
- [x] Back matter complete
- [x] Short description represented by the premise
- [x] Long description represented by the book README and front matter
- [x] Author bio included in back matter
- [x] Launch hook: **When creation becomes free, knowing what deserves to survive becomes expensive.**
- [x] Cover brief: a spare, high-contrast delete/backspace-key motif; avoid destruction imagery; the visual should suggest controlled removal, not catastrophe
- [x] Metadata: publisher, edition, language, tags, rights profile
- [x] Rights notice and machine-readable rights metadata
- [ ] Canonical local `scripts/check-desk.py` execution

## Release note

The connected GitHub environment used for this publication pass can inspect and modify repository state but does not provide the local paired Desk/Shelf worktree required by `scripts/release-book.sh`. The release therefore mirrors that helper's documented semantics explicitly: commit the completed non-Published Desk edition, copy the committed publication snapshot to Shelf, set the Shelf status to `Published`, register the slug in the Shelf catalog, review the release diff, and merge it.

The only unchecked item above is literal execution of the canonical local Desk validator. Repository-level structural checks are performed through GitHub readback and diff review before merge.
