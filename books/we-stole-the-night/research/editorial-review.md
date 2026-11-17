# Editorial and provenance review — WE STOLE THE NIGHT

**Edition date:** November 16, 2026. **Status:** Complete manuscript assembled, length and metadata checks pending or tracked by build output. This is an authoring review, not independent scientific peer review.

## Why this is a separate book

The existing Desk catalog includes research on reliability, system chokepoints, AI, climate and infrastructure. This work is a physical-environment and natural-history argument centered specifically on artificial illumination, its historical expansion, the observational science of nighttime exposure, ecology, human work and sleep, and safety-informed design. Its plot begins with a specific 2023 mass bird collision and ends with actual adjustable components: windows, optics, schedules, and standards.

## Narrative and evidence decisions

- Chicago opening uses 964 recovered birds as a documented count, not a total-estimate of every injury. Weather, glass and artificial light are treated as interacting mechanisms. The >95% drop is tied to the later *window-film intervention*, announced January 2025, not a lights-off trial.
- Gaslight London was preceded by public oil lighting. The gas transition is the change to scalable distribution and labor, not the first light in history.
- The Falchi atlas, Kyba citizen-science study, and satellites measure different sky variables. No global 2026 trend extrapolation is claimed.
- LED efficacy and energy savings are acknowledged alongside possible conditional rebound. Spectrum, direction, duration, and task visibility are kept distinct.
- Circadian physiology is separate from the hazard classification of night shift work. There is no individualized medical advice or claim that all artificial light causes cancer.
- Species-specific ecology distinguishes change in visits, distribution, activity, reproduction, mortality and abundance. One experimental percentage is not generalized globally.
- Crime and road-safety studies are presented as condition-specific rather than forced into a single verdict. Some locations legitimately need more useful light.
- The ending returns to the Chicago design intervention instead of recommending indiscriminate darkness.

## Remaining limitations

The draft was composed in a single intensive authoring pass without external line edit. A second pass should reduce repeated explanation of task-directed lighting, confirm any unstable 2026 publication details, and seek an independent ecology and vision-science review. Research sources are cited directly in prose and the ledger, but full systematic-review search methods are not claimed.

The bibliographic ledger separates primary published experiments, observational inference, reviews, public-agency advice, historical records, and contemporary reporting. No reproduced copyrighted figures were included. All illustrations in prose are clearly hypothetical.

## Quality gates

Run:
- `python3 scripts/check-book-length.py we-stole-the-night`
- `python3 scripts/check-book-cover-metadata.py we-stole-the-night`
- `python3 scripts/catalog-manifest.py --write` and `python3 scripts/catalog.py --write`
- `python3 scripts/check-desk.py` (report unrelated pre-existing failures separately)
- After committing the Desk snapshot, `bash scripts/release-book.sh we-stole-the-night ../shelf` and Shelf release-provenance, spines, reader, feedback and boundary checks.

These mechanical checks do not guarantee editorial originality, scientific completeness, or expert approval.
