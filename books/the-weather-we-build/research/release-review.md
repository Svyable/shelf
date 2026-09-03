# Release Review — The Weather We Build

**Reviewed:** 2026-09-03  
**Desk source under review:** `95de50c88cc73cd0fe7e1fc09ea4bc1fc7e9bd43` plus the bounded readiness remediations in this review branch  
**Disposition:** **Release-cleared subject only to mechanical publication steps.**

## Scope reviewed

The canonical Desk manuscript is in `Complete structural draft` state and contains the complete intended narrative packet: front matter, prologue, Chapters 1–12, epilogue, and back matter. The book README marks every intended manuscript path complete. `reader.json` is present.

The review read the book README, research plan, front and back matter, and the full chapter arc, with focused verification of the factual lanes that carry the manuscript's strongest engineering, health, climate, and historical claims.

## Readiness remediations completed in this branch

### Rights

The original complete structural draft had no book-level rights packet. This branch adds:

- `RIGHTS.md` using the repository's `bookself-arr-v1` All Rights Reserved convention;
- `rights.json` with public-reading permission and the same reserved reproduction, derivative, commercial, AI-training, generative-use, retrieval-grounding, indexing, narration, and translation rights used by current Desk/Shelf releases.

This removes the rights/matter blocker without changing manuscript prose.

### Publication source ledger

The research plan explicitly required publication-grade primary-source attachment and a chapter ledger. This branch adds `research/source-ledger.md`, verified 2026-09-03, with a factual lane for front matter/prologue, every numbered chapter, and the epilogue/back-matter synthesis.

The ledger prioritizes authoritative or first-party material from NIST, NASA, WHO, CDC, USDA, DOE, EPA, OSHA, NOAA and Smithsonian collections. One battery dry-room lane uses a manufacturer engineering source and is expressly bounded as chemistry/process-specific rather than universal.

The manuscript is notably conservative about hard numbers: its claims are mostly qualitative descriptions of physical dependencies and cross-sector patterns. No unsupported current numerical forecast or time-sensitive market claim was found that requires prose remediation before release.

### Novelty / predecessor review

The research plan also required a formal adjacent-framing check. The scan found real predecessors that should remain visible:

- Gail Cooper's _“Manufactured Weather”: A History of Air Conditioning in the United States, 1902–1955_ is a direct lexical predecessor for the phrase “manufactured weather.”
- Simon Marvin and Jonathan Rutherford's 2018 _Urban Studies_ article, “Controlled environments: An urban research agenda on microclimatic enclosure,” treats controlled microclimatic enclosures as a cross-cutting object of urban research.
- Artificial greenhouse climates and environmental-control engineering have longstanding technical literatures.

These findings do not invalidate the manuscript because the canonical text already says the component disciplines are mature, calls “manufactured weather” a framing device rather than a technical category, and locates its contribution in synthesis. The source ledger now records the predecessors explicitly. Release copy must not describe the phrase itself as an original coinage.

## Factual / conceptual gate findings

### Cleanrooms and precision environments

NIST facility documentation supports the manuscript's claim that high-precision research/fabrication facilities actively manage particles/contamination, temperature, humidity, air quality and vibration. The manuscript appropriately avoids claiming one universal cleanroom specification.

### Cold chains

WHO cold-chain guidance supports the core framing that temperature-sensitive products depend on specified and monitored thermal histories. Product-specific approved storage conditions remain controlling; the manuscript does not collapse every cold-chain product into one temperature range.

### Humidity / battery dry rooms

Manufacturer engineering material supports the deliberately qualified claim that some lithium-battery materials/process steps require low-dew-point dry-room conditions and that creating those conditions has equipment/energy consequences. The chapter does not universalize this to every chemistry or process.

### Pressure / controlled air / spacecraft

CDC guidance supports directional airflow through pressure differentials in healthcare environments. NASA ECLSS documentation supports the spacecraft example of actively manufactured pressure, air quality, carbon-dioxide removal, humidity and temperature.

### Commissioning and facility support

DOE commissioning guidance supports the claim that performance is not established merely by construction completion: systems are tested/adjusted against intended operation, and recommissioning addresses drift.

### Buildings, urban heat and human thermal range

DOE and EPA sources support the qualitative connection between space conditioning, building energy, outdoor heat and urban heat-island interactions. OSHA supports the chapter's multifactor treatment of heat stress: temperature alone is insufficient; humidity, radiant heat, air movement, workload, clothing, acclimatization and individual factors matter. The book does not give clinical advice or individualized thresholds.

### Future design climate / industrial geography

NOAA's forward-looking weather data products and NIST's 2026 work on future hazards support the bounded claim that long-lived infrastructure design cannot assume historical environmental distributions remain a sufficient description of future conditions. The book does not predict failure of any named facility.

## Falsification review

The back matter already states the strongest countercase: the thesis weakens if advanced systems become systematically more environmentally robust, environmental-control costs shrink toward irrelevance, industrial geography proves insensitive to the support layer, or frontier processes increasingly tolerate ambient variability.

That is adequate falsification discipline for this edition. The release should preserve the manuscript's more modest thesis when evidence is sector-specific: controlled environments are already an enabling infrastructure layer across multiple consequential sectors, and treating them together exposes dependencies that product-centric analysis can miss.

## Blocker check

- Complete/equivalent Desk state: **pass** (`Complete structural draft`).
- Intended manuscript paths: **pass** (front matter, prologue, 12/12 chapters, epilogue, back matter).
- Front/back matter: **pass**.
- Rights: **pass after bounded remediation in this branch**.
- Research/source packet: **pass after source-ledger remediation in this branch**.
- Novelty/predecessor check: **pass with explicit lexical/intellectual predecessors recorded**.
- Unresolved factual/research blocker: **none found**.
- `Drafting`, `Revision`, `DO NOT RELEASE`, or incomplete-review marker: **none controlling this complete structural draft**.
- Unintended manuscript prose changes in readiness work: **none**.

## Release decision

**Release-cleared subject only to mechanical publication steps.**

After this review PR lands, freeze that committed Desk source, prepare a matched Desk/Shelf release pair from that exact source, preserve Desk as `Complete structural draft`, transform only the Shelf publication status/metadata, transfer the complete manuscript/research/rights/Reader packet, update the public catalog and feedback/discovery surfaces, verify exact copied content against the frozen source, and merge only when both halves remain conflict-free with actual required checks green and no unresolved review blockers.
