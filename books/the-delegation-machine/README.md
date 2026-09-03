# The Delegation Machine

| | |
|---|---|
| **Authors**   | Sven Hardy Benson |
| **Status**    | Published |
| **Chapters**  | 21 of 21 drafted |

## Contents

- [x] [Front Matter — A Note From the Principal](manuscript/front-matter.md)
- [x] [Ch 1 — The Errand](manuscript/ch01-the-errand.md)
- [x] [Ch 2 — Write It Down](manuscript/ch02-write-it-down.md)
- [x] [Ch 3 — The Steward](manuscript/ch03-the-steward.md)
- [x] [Ch 4 — The Seal and the Signature](manuscript/ch04-the-seal-and-the-signature.md)
- [x] [Ch 5 — A Chain of Command](manuscript/ch05-a-chain-of-command.md)
- [x] [Ch 6 — The Clerk Republic](manuscript/ch06-the-clerk-republic.md)
- [x] [Ch 7 — The Firm](manuscript/ch07-the-firm.md)
- [x] [Ch 8 — The Proxy Problem](manuscript/ch08-the-proxy-problem.md)
- [x] [Ch 9 — The Checklist](manuscript/ch09-the-checklist.md)
- [x] [Ch 10 — The Automatic Pilot](manuscript/ch10-the-automatic-pilot.md)
- [x] [Ch 11 — The Daemon](manuscript/ch11-the-daemon.md)
- [x] [Ch 12 — The API](manuscript/ch12-the-api.md)
- [x] [Ch 13 — The Warehouse That Comes to You](manuscript/ch13-the-warehouse-that-comes-to-you.md)
- [x] [Ch 14 — The Model in the Loop](manuscript/ch14-the-model-in-the-loop.md)
- [x] [Ch 15 — The Agent Gets a Key](manuscript/ch15-the-agent-gets-a-key.md)
- [x] [Ch 16 — The Permission Problem](manuscript/ch16-the-permission-problem.md)
- [x] [Ch 17 — The Receipt](manuscript/ch17-the-receipt.md)
- [x] [Ch 18 — The Metric Eats the Mission](manuscript/ch18-the-metric-eats-the-mission.md)
- [x] [Ch 19 — The Human Override](manuscript/ch19-the-human-override.md)
- [x] [Ch 20 — The Institution Without an Office](manuscript/ch20-the-institution-without-an-office.md)
- [x] [Ch 21 — A Civilization of Deputies](manuscript/ch21-a-civilization-of-deputies.md)
- [x] [Back Matter — Notes on Terms and Sources](manuscript/back-matter.md)

## Practical companion

- [The Delegation Machine — Field Guide](FIELD-GUIDE.md) — the **Delegation Stack** (Intent → Mandate → Authority → Action → Evidence → Review → Revocation), authority budgets, proof-carrying actions, delegation provenance, autonomy half-life, meaningful refusal, incident review, and worked agent mandates.
- [The Delegation Protocol](DELEGATION-PROTOCOL.md) — an experimental lifecycle connecting mandate, authority, action receipts, independent review, and revocation.
- [Delegation Protocol Threat Model](THREAT-MODEL.md) — an adversarial map of authority injection, confused-deputy attacks, stale mandates, subdelegation amplification, evidence laundering, review capture, revocation lag, replay, semantic composition, and other ways delegation boundaries can fail.
- [Delegation Protocol Invariants](PROTOCOL-INVARIANTS.md) — the cross-document checks JSON Schema cannot prove on its own: live authority, revocation freshness, replay protection, subdelegation containment, identity continuity, evidence independence, actual-state-change containment, review triggers, and outstanding obligations.
- [Delegation Mandate JSON Schema](delegation-mandate.schema.json) — a versioned machine-readable contract shape for all seven layers of the Delegation Stack.
- [Validated Desk book-review mandate](examples/desk-book-review.mandate.json) — an illustrative prospective example with bounded authority, external receipts, review triggers, and explicit revocation.
- [Proof-Carrying Action Receipt JSON Schema](proof-carrying-action.schema.json) — a versioned receipt format where `completed` requires at least one independent evidence source.
- [Real PR #103 action receipt](examples/pr-103.schema-companion.receipt.json) — a retrospective receipt for an actual Desk merge that explicitly records the absence of a pre-issued machine-readable mandate.
- [Conformance corpus](conformance/README.md) — paired valid and intentionally invalid cases for agents, implementers, and Draft 2020-12 validators, including correct blocking, forbidden self-approval, scope-expanding subdelegation, unsupported completion, and incomplete rollback.

## Premise

Civilization advances by learning how to let one person, office, market, machine, or model act for another. Delegation multiplies reach, but it also creates a recurring set of problems: the delegate sees something the principal cannot, interprets instructions the principal cannot fully specify, and may gain authority faster than the systems for checking the work. This book follows that pattern from ancient accounts and household stewards through bureaucracy, firms, software daemons, APIs, warehouse robots, and AI agents.

## Working status

This is a complete Desk draft, not a Shelf publication. The research trail lives in `research/README.md` and records the evidence boundaries and falsification notes behind the narrative chapters. The Field Guide, Delegation Protocol, threat model, protocol invariants, machine-readable schemas, and conformance corpus are original syntheses of the book's recurring design patterns; they are practical frameworks and implementation artifacts, not claims that the seven-layer stack is an empirically established law, security certification, legal instrument, or external standard.
