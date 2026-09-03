# Gatekeepers — First-edition release review

**Reviewed:** 2026-09-03  
**Desk source reviewed:** `c4105f1a454898aeb4a42a60ac66ea737aa65e24`  
**Decision:** **Release-cleared subject only to the normal mechanical Desk → Shelf publication transaction.**

## Scope

This is the bounded factual/release review for the first public edition of *Gatekeepers*. It reviews the canonical 21/21 `Complete draft`, front and back matter, book-level rights files, research brief, machine-readable source ledger, and chapter evidence notes. It does not change manuscript prose and does not convert the Desk copy to `Published`.

## Structural and status gate

The canonical book README records `Status: Complete draft` and 21 of 21 drafted chapters. Every checked manuscript path in that README exists, including front matter and back matter. `RIGHTS.md` and `rights.json` are present. The research packet includes the cross-book research brief, source ledger, and chapter evidence notes.

No `Drafting`, `Revision in progress`, incomplete-review, or `DO NOT RELEASE` marker controls this book. The README explicitly describes publication review as the remaining separate step; this document closes that step.

## Rights gate

`RIGHTS.md` identifies Sven Hardy Benson as author and copyright owner, uses the `bookself-arr-v1` rights profile, and expressly permits the copyright owner to make the work publicly readable while retaining All Rights Reserved. No missing permission or third-party-rights blocker is documented in the canonical packet.

## Factual and research gate

The manuscript's central claim is structural rather than dependent on one volatile statistic: gatekeeping power becomes consequential where a valued transition is controlled through a narrow route, especially when alternatives are weak, criteria opaque, delay asymmetric, appeal costly, or the gatekeeper has a conflict of interest. The research brief explicitly preserves the strongest countercase: many gates solve real problems of safety, scarcity, fraud, competence, congestion, interoperability, and trust.

The most time-sensitive evidence lanes were refreshed against authoritative sources on 2026-09-03:

### Digital Markets Act / platform and cloud gateways

The European Commission's current Gatekeepers Portal continues to list the DMA's designated gatekeepers and states that 23 core platform services are currently designated. The Commission's 25 June 2026 cloud proceeding also continues to describe AWS and Microsoft Azure as important gateways between businesses and customers in the EU and cites lock-in, high switching costs, ecosystems, and AI tooling as relevant to its preliminary position.

Sources:
- European Commission, DMA Gatekeepers Portal: https://digital-markets-act.ec.europa.eu/gatekeepers-portal_en
- European Commission, 25 June 2026 AWS/Azure preliminary position: https://digital-markets-act.ec.europa.eu/commission-reaches-preliminary-position-amazons-and-microsofts-market-leading-cloud-services-should-2026-06-25_en

Boundary: the AWS/Azure matter is a **preliminary position**, not a final designation. The manuscript/research packet should continue to preserve that procedural posture in any future revision.

### Credit decisions and specific reasons

The CFPB's Circular 2022-03 remains published and states that ECOA and Regulation B require specific reasons for adverse action even when a creditor uses complex or opaque algorithms. That continues to support the book's narrower point that automation does not eliminate the institutional obligation to make a consequential denial explainable under applicable credit law.

Source:
- CFPB, Circular 2022-03: https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/

Boundary: this is a U.S. credit-law example, not a universal right to explanation across all automated decisions.

### Prior authorization, delay, and denial reasons

CMS's current CMS-0057-F materials continue to require affected payers, generally beginning in 2026, to issue decisions within 72 hours for expedited requests and seven calendar days for standard requests, and to provide a specific reason for denied prior authorization decisions. The API requirements generally begin in 2027. Current CMS FAQ material continues to implement the same rule architecture.

Sources:
- CMS, CMS-0057-F fact sheet: https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f
- CMS, Prior Authorization API FAQ: https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/frequently-asked-questions/prior-authorization-api

Boundary: the rule does not apply identically to every payer or to every drug authorization, and the book should continue distinguishing program and request type rather than collapsing all prior authorization into one regime.

## Counterevidence retained

The research brief remains suitable for release because it does not treat every gate as extraction or every bypass as liberation. It explicitly records that licenses, inspections, underwriting, reviews, fraud controls, code signing, and other gates can create trust and safety; that open access can create spam, congestion, fraud, and unsafe markets; that competition among gates can fragment standards; and that some refusals are the system working correctly.

That counterevidence is not a disclaimer appended after the thesis. It is part of the book's test: good gates should be proportionate, legible, correctable, reviewable, and answerable while still being allowed to say no.

## Residual uncertainty / future-edition refresh triggers

These items do **not** block the first edition, but should trigger targeted future review rather than being silently treated as permanent facts:

1. changes in DMA designations, remedies, or final resolution of the 2026 AWS/Azure proceedings;
2. material changes to U.S. adverse-action requirements or CFPB interpretation/enforcement posture;
3. amendments, implementation changes, or program-specific exceptions affecting CMS prior-authorization timeframes, denial reasons, or APIs;
4. major changes to Apple App Store rules, payment-network access rules, or other platform terms cited as current examples;
5. any later revision that turns a procedural posture, allegation, or regulator's preliminary view into a settled factual claim.

## Release decision

**Release-cleared.** No factual, research, rights, structural, status, or documented integrity blocker requiring manuscript surgery was found in the canonical first-edition packet.

The remaining steps are mechanical publication steps only:

1. freeze the committed Desk source after this review lands;
2. prepare the matched Desk bookkeeping and Shelf snapshot from that same frozen commit;
3. preserve Desk as `Complete draft`;
4. set only the Shelf publication metadata to `Published`;
5. regenerate the Shelf-aware Desk catalog and Shelf catalog/discovery surfaces using repository conventions;
6. verify the complete Shelf publication file set against the frozen Desk source; and
7. merge the two publication PRs only as one coherent tandem transaction after their actual repository gates are satisfied.
