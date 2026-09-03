# Chapter 20 evidence notes — Good Gates

## Chapter claim

Good gatekeeping is not the absence of restriction. It is purpose-bounded, proportionate, inspectable, measurable, correctable, maintainable control over a transition. The chapter synthesizes design principles developed and evidenced across Chapters 1–19 rather than introducing a new empirical domain.

## Evidence basis

This chapter is intentionally synthetic. Its positive doctrine draws on the book's prior evidence notes, especially:

- Chapter 4 on queues, capacity, delay, and visibility.
- Chapter 5 on credentials and proportional barriers.
- Chapter 6 on adverse-action reasons and model-based decisions.
- Chapter 7 on prior authorization, continuity, criteria, and decision clocks.
- Chapter 9 on separating safety functions from bundled distribution power.
- Chapter 10 on conditional access and alternative rails.
- Chapter 11 on risk-tiered vendor due diligence and constrained pilots.
- Chapter 13 on credential lifecycle, least privilege, rotation, and revocation.
- Chapter 14 on uncertainty bands, drift, meaningful review, and complete decision systems.
- Chapter 15 on structural conflicts, symmetry, audit trails, and proportional remedies.
- Chapter 16 on cost to correction, harm velocity, and systemic remediation.
- Chapter 17 on bounded bypass and workaround telemetry.
- Chapter 18 on credible exit, portability, interoperability, and exit rehearsal.
- Chapter 19 on delegated authority, provenance, consent maintenance, and principal capability.

No factual claim in this chapter is intended to rely on a novel source beyond those already logged in the corresponding chapter evidence notes.

## Core synthesis

The chapter proposes fifteen design principles:

1. State the protected thing.
2. Price both error directions.
3. Match friction to consequence.
4. Separate transaction friction from decision friction.
5. Give reasons that permit action.
6. Make queues visible.
7. Remember prior valid proof.
8. Build correction into the gate.
9. Design explicitly for uncertainty.
10. Treat conflicts structurally.
11. Support bounded bypass.
12. Preserve credible exit.
13. Make authority expire.
14. Keep the principal capable.
15. Measure the whole gate.

The chapter then compresses the book into a twenty-question practical gate test.

## New analytical terms introduced or consolidated

- **Purpose ledger:** a maintained record of why a gate exists, what evidence supports it, what would justify changing it, and who owns maintenance.
- **Error budget:** explicit consideration of the cost, reversibility, and distribution of false approvals and false denials.
- **Versioned trust:** prior proof persists while the relevant state remains materially unchanged.
- **Graceful uncertainty:** low-confidence cases move into a different process rather than being forced into automatic yes/no.
- **Gate balance sheet:** an attempt to measure harms prevented against legitimate actions blocked, delayed, distorted, or made expensive.
- **Principal capability test:** after automation or delegation improves system capability, the governed person should also become more capable rather than more dependent.

## Counterevidence and constraints preserved

- Additional transparency can create security, fraud, privacy, or gaming risks and therefore must sometimes be bounded.
- More appeal is not always better; finality and institutional capacity matter.
- Interoperability and portability can impose security and coordination costs.
- Bypass paths can become vulnerabilities if too broad or poorly governed.
- Risk-tiering requires judgment and can itself be misclassified.
- Expiration and repeated review can create unnecessary burden if set too aggressively.
- End-to-end gate metrics are difficult and often require estimates of costs outside the gatekeeper's own ledger.

## Forward link

Chapter 21 should close the book by applying the same doctrine to oversight. No regulator, auditor, court, board, ombudsman, inspector general, market, or standards body is outside gatekeeping. Durable accountability therefore requires plural and overlapping controls, transparency about jurisdiction, contestability among oversight mechanisms where appropriate, and recursive checks against capture, delay, and self-protection.
