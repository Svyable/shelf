# Release review — The Orphan Age

**Review date:** September 5, 2026  
**Canonical Desk source reviewed:** `c83691b17f669bb8b4ea082ebac2d07e05270d56`  
**Decision:** **Release-cleared subject only to the ordinary mechanical Desk → Shelf publication transaction.**

This is a bounded factual, editorial, rights, matter, and research review for Sven Hardy Benson’s complete Desk manuscript, *The Orphan Age*. It does not mark the Desk copy `Published`; Shelf remains the publication boundary.

## Scope reviewed

- canonical book README and its `Complete draft` status;
- front matter, all 20 numbered chapters, and back matter (`The Orphan Test`);
- `research/README.md` and the canonical `research/source-ledger.csv`;
- `RIGHTS.md` and `rights.json` under the `bookself-arr-v1` profile;
- the manuscript’s factual boundaries, counterexamples, falsification notes, and the distinction between reported evidence and Sven Hardy Benson’s proposed synthesis terms such as *orphan load*;
- the most time-sensitive evidence lanes against current authoritative sources on September 5, 2026.

No manuscript section is unchecked or missing. No `Drafting`, `Revision`, `DO NOT RELEASE`, unresolved research blocker, rights blocker, or incomplete-review marker controls this book.

## Current-source refresh

The review rechecked the claims most likely to age rather than treating the source ledger as permanently current.

### Federal legacy IT

GAO-25-107795 (July 17, 2025) continues to support the manuscript’s bounded formulation: the federal government spends more than $100 billion annually on IT and cyber-related investments; agencies have typically reported roughly 80% going to operations and maintenance of existing IT; and GAO’s most critical legacy systems include outdated languages, unsupported hardware/software, and known cybersecurity vulnerabilities.

Source: https://www.gao.gov/products/gao-25-107795

### Orphaned oil and gas wells

The Department of the Interior’s current Orphaned Wells Program remains active under 42 U.S.C. § 15907. Its FY 2025 report states that state grant recipients had plugged 10,257 wells through June 2025 and continues to describe plugging, remediation, restoration, inventory, and associated infrastructure removal as live program work. The manuscript’s less-specific statement that thousands of wells have been plugged is therefore conservative.

Sources:
- https://www.doi.gov/orphanedwells
- https://www.doi.gov/sites/default/files/documents/2025-11/fy-2025-orphaned-wells-congressional-report.pdf

### Bridges

FHWA’s 2025 National Bridge Inventory continues to classify bridges by condition and maintains the inspection/condition framework used by the manuscript. The chapter relies on the existence and stewardship logic of this regime rather than a volatile national percentage.

Source: https://www.fhwa.dot.gov/BRIDGE/nbi/no10/condition25.cfm

### Orbital debris

ESA’s 2025 Space Environment Report reports about 40,000 tracked objects in Earth orbit, about 11,000 active payloads, and estimates more than 1.2 million debris objects larger than 1 cm. It also continues to frame end-of-life disposal, fragmentation, active debris removal, and Kessler-type cascading risk as material sustainability issues. The manuscript’s wording is deliberately less precise and does not overstate a cinematic chain reaction.

Source: https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025

### Nuclear and hazardous-facility endings

Current NRC guidance continues to recognize spent-fuel pools and dry-cask storage and requires financial assurance for reactor decommissioning. Current EPA guidance continues to require hazardous-waste treatment, storage, and disposal facilities to plan for closure and, where applicable, post-closure care, with financial-assurance mechanisms intended to fund those obligations.

Sources:
- https://www.nrc.gov/waste/spent-fuel-storage
- https://www.nrc.gov/waste/decommissioning/finan-assur
- https://www.epa.gov/hwpermitting/closure-and-post-closure-care-requirements-hazardous-waste-treatment-storage-and
- https://www.epa.gov/hwpermitting/financial-assurance-requirements-hazardous-waste-treatment-storage-and-disposal

### AI lifecycle governance

NIST’s AI RMF Core still includes Govern 1.7: processes and procedures for decommissioning and phasing out AI systems safely without increasing risk or decreasing organizational trustworthiness. That supports the manuscript’s use of decommissioning as evidence that responsible AI governance includes an ending, not only deployment and monitoring.

Source: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

### Digital preservation

NARA’s current Digital Preservation Framework continues to treat format risk, significant properties, preservation actions, migration, appraisal, and lifecycle decisions as active preservation work. This supports the manuscript’s distinction between merely retaining bits and preserving interpretable records.

Source: https://www.archives.gov/preservation/digital-preservation/risk

## Editorial and factual judgment

The manuscript consistently distinguishes structural analogy from identity of harm. It does not equate a software dependency with a leaking well or orbital debris; those examples are used to expose recurring stewardship mechanisms. It also preserves counterevidence and boundary conditions: old systems can be healthy when stewardship remains capable; repair is not always preferable to replacement; preservation can become inertia; standards and governance can impose costs; temporary systems need not become permanent institutions; and automation may lower maintenance cost as well as creation cost.

The text labels *orphan load*, *maintenance surface*, *stewardship density*, and related synthesis language as proposed authorial concepts rather than established scientific quantities. No universal global orphan-load number is asserted.

I found no current factual claim that requires manuscript remediation before a first Shelf snapshot.

## Rights and matter

`RIGHTS.md` and `rights.json` agree on Sven Hardy Benson as author/copyright owner, © 2026, All Rights Reserved, public reading permitted, and the `bookself-arr-v1` rights profile. No permission-dependent third-party excerpt or image requiring separate clearance was identified in the reviewed publication packet.

Front matter, all 20 numbered chapters, back matter, research material, and rights metadata are present.

## Mechanical publication conditions

This review does **not** claim that checkout-only commands were executed in this connected environment. Before the release pair lands, the publication transaction must still satisfy the repository’s ordinary mechanical checks and copy-integrity requirements, including current catalog/discovery validation and exact Desk → Shelf snapshot verification.

The repository’s `check-book-length.py` / 65,000-word standard is documented as the default for automated one-shot full-book draft jobs, with intentionally scoped shorter or serial work permitted by `docs/book-brief-standard.md`. *The Orphan Age* was not created or marked with a controlling one-shot length gate, so this review does not invent one retroactively.

If any actual repository validation on the frozen release source fails, do not release until the failure is resolved.

## Release decision

**Release-cleared subject only to ordinary mechanical publication steps.**

The Desk copy should remain `Complete draft`. A first public edition may be snapshotted to Sven Hardy Benson’s Shelf from one frozen committed Desk source, with only the intentional Shelf publication/status transformation and synchronized release/discovery bookkeeping.