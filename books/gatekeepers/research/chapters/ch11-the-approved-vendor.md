# Chapter 11 evidence notes — The Approved Vendor

## Core claim

Vendor approval is a legitimate institutional gate because buying from a supplier can import security, privacy, financial, legal, continuity, and concentration risk into the organization. The gate becomes dysfunctional when review burden is not proportional to the actual dependency, when past approval becomes incumbent privilege, or when the cost of saying no is treated as zero.

## Sources

### NIST SP 800-161 Rev. 1 Update 1 — Cybersecurity Supply Chain Risk Management Practices

- https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final
- NIST describes supply-chain risk arising from reduced visibility into how acquired products and services are developed, integrated, deployed, and maintained.
- The guidance emphasizes identifying, assessing, and mitigating cybersecurity supply-chain risks across organizations and supplier relationships.
- Supports the chapter's claim that an external supplier can become part of the buyer's internal risk surface.

### NIST SP 1326 — C-SCRM Due Diligence Assessment Quick-Start Guide

- https://csrc.nist.gov/pubs/sp/1326/final
- Published July 2026.
- Describes due diligence as researching pertinent information about suppliers or products so acquisition decisions can be informed.
- Identifies areas including foreign ownership/control/influence, provenance, resilience, foundational cyber practices, and supply-chain tiers.
- NIST's accompanying announcement frames the guide as an implementation-ready approach to a minimum amount of reasonable research and investigative rigor.

### NIST — 2026 due-diligence guide announcement

- https://www.nist.gov/news-events/news/2026/07/nist-releases-finalized-c-scrm-due-diligence-assessment-quick-start-guide
- Supports the chapter's emphasis on proportionality rather than maximal investigation.

### SAM.gov — Exclusion Types

- https://sam.gov/entity-information/resources/exclusion-types
- Documents federal procurement exclusion statuses and effects, including circumstances where agencies may not award, renew, or extend covered contracts absent specified exceptions.
- Used only as a concrete example of formal supplier eligibility gates in public procurement.

## Boundaries and counterevidence

- The chapter does not claim that vendor questionnaires, audits, certificates, or standard controls are useless. Standardization is necessary for organizations reviewing many suppliers.
- Low spend does not automatically mean low risk; a cheap supplier can have privileged access or become operationally critical.
- High spend does not automatically mean high operational risk.
- Incumbent reuse can be rational because migration, integration, retraining, data movement, and contract work are real switching costs.
- Small suppliers should not receive a free pass merely because compliance burdens affect them more heavily. The issue is proportionality to risk, not company size alone.
- Due diligence cannot eliminate supplier uncertainty; deeper supply-chain tiers are often only partially visible.
- Public procurement has legal and integrity obligations that differ from ordinary private purchasing.
- A constrained pilot is appropriate only when the organization can genuinely isolate or bound the risk.

## Design implications under test

1. Risk-tier vendor review by consequence, access, data sensitivity, replaceability, and dependency—not procurement category alone.
2. Treat procurement latency and shadow workarounds as risk metrics, not merely user inconvenience.
3. Distinguish real switching costs from bureaucracy the buyer has imposed on itself.
4. Use constrained pilots or sandboxes where uncertainty can be converted into evidence safely.
5. Connect documentation to actual risk paths rather than treating completed forms as proof.
6. Separate domain vetoes from final integrated decision ownership so every function cannot independently create indefinite limbo.
7. Measure the risk of inaction and incumbent dependence alongside the risk of introducing a new supplier.
8. Version approvals by scope, evidence, conditions, and material change; approval should not be treated as permanent.
9. Give rejected or conditionally approved suppliers actionable reasons when disclosure does not create material security risk.

## Forward link

Chapter 12 shifts from gatekeeping access to gatekeeping attention. A feed does not prevent content from existing; it decides which small fraction of available material receives the scarce resource of visibility.