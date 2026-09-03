# Release Review — Single Points of Failure

**Review date:** 2026-09-03  
**Decision:** Release-cleared for first Shelf edition  
**Desk status:** Complete draft  
**Edition target:** First edition

## Scope

This review rechecks the publication packet for *Single Points of Failure* before a deliberate Desk → Shelf release. The reviewed Desk edition contains front matter, 12 of 12 chapters, back matter, chapter-level research notes, All Rights Reserved metadata, and an explicit counterevidence note for the human-expertise chapter.

The book's central claim is mechanistic rather than predictive: globally important systems can become unusually dependent on narrow, difficult-to-substitute nodes because specialization, scale, geography, standards, accumulated know-how, or policy made concentration efficient. The manuscript repeatedly distinguishes concentration from inevitable failure and treats redundancy as a cost-bearing choice rather than free insurance.

## Current-fact refresh

### Panama Canal

Chapter 5 describes the 2023–2024 drought restrictions, the subsequent traffic recovery, and the continuing dependence of canal throughput on freshwater availability. That mechanism remains current. In late August 2026 the Panama Canal Authority announced additional temporary transit-capacity measures because precipitation in the canal watershed was again below expectations. Effective September 3, 2026, Neopanamax daily slots were reduced to nine, with further Panamax adjustments scheduled for September 15.

Sources:
- https://pancanal.com/en/panama-canal-adopts-additional-measures-to-address-reduced-precipitation-in-the-canal-watershed/
- https://pancanal.com/en/maritime-services/advisory-to-shipping/

This development strengthens rather than contradicts the chapter's claim that recovery from the 2023–2024 episode did not remove the freshwater chokepoint. No manuscript correction is required for first release. A future edition should update the post-2024 operating history.

### Cobalt and the Democratic Republic of Congo

Chapter 7 dates the DRC's 2025 cobalt export suspension and the quota regime that followed it. Current 2026 reporting continues to describe cobalt hydroxide exports as quota-constrained. In addition, the DRC introduced a broader 2026 restriction on exports of copper and cobalt concentrates, with possible waivers, as part of a domestic-processing policy.

Source:
- https://www.reuters.com/world/africa/congo-bans-exports-copper-cobalt-concentrates-official-order-says-2026-08-06/

The newer concentrates rule is not the same instrument as the 2025 cobalt-export suspension described in the manuscript, and it does not make the chapter's dated account false. It reinforces the broader mechanism that a dominant producing state can alter downstream supply conditions through domestic market and industrial policy. No manuscript correction is required. A later edition should add the 2026 concentrates rule and distinguish refined material, hydroxide, concentrates, and quota-covered exports explicitly.

### HBM and the memory chokepoint

Chapter 8 treats HBM concentration as one layer in a stacked AI-compute supply chain and dates market-share estimates to 2025–2026 reporting. SK hynix's July 29, 2026 second-quarter results state that the company began HBM4 mass shipments in the second quarter and planned to ramp production in the second half, while describing continued leadership in the HBM sector.

Source:
- https://news.skhynix.com/en/q2-2026-business-results/

The company release does not independently prove every third-party market-share percentage cited in the manuscript, so those figures should remain treated as dated analyst estimates rather than permanent structural constants. The current primary-source evidence supports the chapter's broader claim that HBM remains a strategically important, technically difficult supply layer. No manuscript correction is required.

### ASML and export controls

ASML's 2025 Annual Report states that export regulations increasingly affect deliveries to China and that the company requires licenses for EUV systems, specified DUV immersion systems, and other controlled products under Dutch, U.S., and other applicable rules. The report also notes that licensing scope and restricted-entity lists remain subject to change.

Sources:
- https://www.asml.com/en/investors/annual-report/2025/financials
- https://www.asml.com/en/investors/annual-report

This supports the manuscript's treatment of advanced lithography as both a physical concentration and a policy-mediated chokepoint. Third-party estimates of ASML market share in the research brief remain dated estimates; the manuscript's core EUV-dependency argument does not require treating a single percentage as timeless. No manuscript correction is required.

### Rare-earth industrial policy

The research packet describes the U.S. effort to rebuild domestic rare-earth processing and magnet capacity and the defense-sector role in securing critical-material supply chains. Current Department of Defense budget materials continue to identify domestic rare-earth separation, metallization, permanent-magnet production, recycling, and workforce capability as industrial-base priorities.

Source:
- https://comptroller.defense.gov/Portals/45/Documents/defbudget/FY2025/FY2025_Budget_Request_Overview_Book.pdf

The book should continue to distinguish the existence of mineral deposits from economically viable processing, separation, magnet production, and qualified industrial capacity. No manuscript correction is required.

## Evidence-quality notes

The underlying research brief contains a mix of primary sources, strong reporting, industry research, and some weaker secondary sources. For first release, the most consequential mechanisms are supported by stronger source lanes: Panama Canal Authority material for canal operations; SEC/CRS material for U.S. chip controls; ASML and SK hynix corporate disclosures for company-specific operations; U.S. government material for critical-minerals policy; and established reporting and research for cobalt and undersea-cable developments.

Several numerical market-share estimates remain inherently time-sensitive. They are acceptable where the prose dates or ranges them and does not make the thesis depend on exact precision. Future editions should prefer primary filings or multiple independent market-research sources when refreshing those figures.

## Rights and structure

- Canonical Desk status is `Complete draft`.
- The project contains front matter, 12 checked chapters, and back matter.
- `RIGHTS.md` and `rights.json` use the `bookself-arr-v1` All Rights Reserved profile and explicitly permit public reading by the copyright owner.
- The research packet includes chapter-by-chapter sources, claim rules, and falsification/counterevidence material.
- No `DO NOT RELEASE`, Drafting, incomplete-chapter, or unresolved-rights marker was identified in the reviewed packet.

## Decision

**Release-cleared.** The September 3, 2026 current-fact refresh found no factual, research, rights, structural, or status blocker that requires manuscript surgery before the first Shelf edition.

The first release should use a committed Desk snapshot, preserve Desk as `Complete draft`, transform only the Shelf copy to `Published`, update Shelf discovery/feedback coverage, regenerate Desk's Shelf-aware catalog, and verify the copied publication files against the frozen Desk source. Future editions should refresh Panama operating conditions, cobalt export policy, HBM supplier shares, semiconductor export controls, rare-earth industrial policy, and other explicitly dated market-share or stockpile figures before replacing the Shelf edition.
