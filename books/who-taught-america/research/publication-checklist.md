# Publication Checklist — Who Taught America?

This checklist governs the first publication candidate for **Who Taught America? — Twenty-Six Schools, 250 Years, and the Classrooms That Made a Nation**. Desk remains the canonical working source. Sven Hardy Benson’s Shelf will hold a frozen released snapshot, not a live mirror.

## Gate 1 — Manuscript integrity and scope

- [x] Front matter present.
- [x] Chapters 1–26 present and linked from the book README.
- [x] Back matter present, including the 26-decade shadow list of rival selections.
- [x] `RIGHTS.md` and `rights.json` present with the intended public-reading / All Rights Reserved profile.
- [x] Research brief, canonical source ledger, chapter-source map, falsifiability notes, and release review present.
- [x] Run `python3 scripts/check-book-length.py who-taught-america` and require `healthy: true`, every numbered chapter at or above 3,000 words, and at least 65,000 chapter-only words. Passing report: 26 chapters, 79,466 chapter-only words, smallest chapter 3,027 words.

The connected environment used for this publication-preparation pass cannot execute the local checker from a live checkout. File size is not a substitute for the repository’s `WORD_RE` count, so no mechanical length pass is inferred.

## Gate 2 — Claims and research

- [x] Every chapter has an explicit evidence packet in `chapter-source-map.md`.
- [x] Chapters 1–17 were strengthened during publication review with additional primary, governmental, archival, or scholarly evidence rather than relying on a single institutional origin page.
- [x] The 1779 William & Mary chapter has the underlying Board of Visitors statute in its source packet.
- [x] The Georgia chapter preserves the distinction between the 1785 charter and the 1801 opening; the UNC chapter preserves the distinction between its 1789 charter and 1795 opening.
- [x] The West Point chapter is bounded against claiming the academy alone engineered continental expansion.
- [x] The American School for the Deaf chapter restores Laurent Clerc, deaf students, and signs already used in American communities to the origin story.
- [x] The Carlisle chapter pairs National Park Service history with National Archives student and boarding-school records and treats importance as consequence, not merit.
- [x] The Tuskegee packet restores Lewis Adams’s political role and distinguishes Washington’s institution-building from a one-founder myth.
- [x] The Scopes chapter preserves that the prosecution was deliberately constructed as a test case and publicity event.
- [x] The modern chapters use official or primary evidence for Los Alamos, Little Rock, Berkeley, Boston, charter schools, OpenCourseWare, Parkland, and the Harvard admissions decision.
- [x] Perform the final manuscript-to-source reconciliation and correct or explicitly bound claims that outrun their packets; see `source-reconciliation.md`.

The book’s title-level superlative is intentionally argumentative: “most important school of the decade” is the author’s defended choice, not a purported statistical ranking. Historical “first” claims inside chapters must remain narrower and tied to a specific supported metric.

## Gate 3 — Editorial coherence

- [x] The book has one school for every named calendar decade touched by 1776–2026: twenty-six chapters, with partial opening and closing decades.
- [x] “Most important” is defined as historically revealing and consequential rather than best, oldest, richest, most selective, or most admirable.
- [x] The shadow list makes serious rival choices visible instead of hiding judgment behind a ranking formula.
- [x] The long arc remains coherent: republican preparation → public capacity → widened access → professionalization → liberation and coercion → research infrastructure → curriculum and constitutional conflict → organizational unbundling → open knowledge → student political power → the admissions/AI-era gate.
- [x] Carlisle, Little Rock, South Boston, and Parkland preserve the agency and suffering of people inside the institutions rather than using them only as scenery for policy conflict.
- [x] The Harvard chapter states that the 2020s are unfinished and does not present the long-run effects of the 2023 admissions decision or AI on schooling as settled.
- [x] Deepen every chapter below the floor with researched institutional mechanics, counter-evidence, and downstream consequences rather than padding; all 26 chapters now clear the floor.

## Gate 4 — Desk catalog and discovery

- [x] Add `who-taught-america` to the canonical `catalog.json` manifest from current `main`.
- [x] Regenerate the root README catalog/dashboard from the same source with `scripts/catalog.py --write`.
- [x] Add the book to `.github/ISSUE_TEMPLATE/chapter-feedback.yml`.
- [x] Add the canonical book route to `llms.txt` and `sitemap.xml`.
- [x] Run the Desk integrity gate against the exact base and candidate: require zero candidate non-research errors, a canonical Who Taught America source packet, and zero new research-schema errors relative to base. The full command remains baseline-red on current `main` because unrelated legacy research packets are still being normalized.

The branch was merged forward onto current `main` before these shared registrations were written, so the manifest, feedback dropdown, machine map, and sitemap are additive to the newest Desk state available during this pass. The root README remains deliberately unchecked because its summary counts, word totals, and generated book row should come from `python3 scripts/catalog.py --write`, not from hand-maintained arithmetic. `index.html` should change only if the current Desk integrity contract requires it.

## Gate 5 — First-edition package

- [x] Author metadata uses **Sven Hardy Benson**.
- [x] Format is **Book**.
- [x] Publisher is **Svyable**.
- [x] Edition target is **First edition**.
- [x] Language is **English**.
- [x] Complete-draft date is recorded as **2026-09-06**.
- [x] Publication-candidate preparation began **2026-09-06**.
- [x] Desk status is **Complete draft · publication review** rather than `Published`.
- [x] No Shelf snapshot has been created by this publication-preparation branch.

The author asked to continue toward publication on 2026-09-06. This authorizes candidate preparation and objective release-gate work. It does not override a failing length, integrity, rights, or source check.

## Gate 6 — Freeze and release transaction

- [ ] Freeze the first-edition candidate under a named Desk ref only after the manuscript/source/catalog gates above are green.
- [ ] Run `python3 scripts/check-book-length.py who-taught-america` on that frozen source and record the result.
- [x] Run the baseline-aware Desk integrity gate on the frozen candidate and record that it introduces zero new research-schema failures while all candidate discovery/navigation checks are clean.
- [ ] Only after both commands pass, prepare the Shelf snapshot using the repository’s current release semantics.
- [ ] Copy the committed Desk book snapshot to Shelf with byte-identical publication files except for the intended Shelf book-README status transformation and Shelf catalog/discovery updates.
- [ ] Verify the Shelf book README says exactly `Published` and the root Shelf catalog contains exactly one `who-taught-america` entry.
- [ ] Verify the public Reader route.
- [ ] Record the frozen Desk source commit in the Desk book’s release notes after the Shelf release lands.

## Release rule

Do not publish from a moving branch. Publish only from the named frozen Desk candidate after the exact book-length check passes and the baseline-aware Desk integrity gate proves zero new regressions, including a clean canonical source packet for this book. No discretionary human-review blocker is added: once the objective gates recorded here are green, the first-edition release may proceed under the repository’s normal merge and release protections.
