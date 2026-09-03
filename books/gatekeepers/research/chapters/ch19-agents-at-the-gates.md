# Chapter 19 evidence notes — Agents at the Gates

## Chapter claim

AI agents turn delegation into machine infrastructure. The central gatekeeping problem is not whether an agent is intelligent enough to act, but whether its mandate is explicit enough to distinguish authorized action from useful-looking overreach. Safe agent systems therefore need scoped identity, budgets, time limits, consent maintenance, rate-shaped authority, revocation, provenance, structured refusals, and escalation.

## Primary sources used

### Model Context Protocol — authorization

- Model Context Protocol specification, 2026-07-28 authorization overview.

Claim boundary: MCP is used as a current example of agent/tool infrastructure adopting OAuth-family delegated authorization. The chapter does not claim MCP itself solves full agent mandate, liability, or semantic-intent problems; those are broader governance issues layered above transport-level authorization.

Source:
- https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/authorization/index.mdx

### Visa Intelligent Commerce

- Visa Intelligent Commerce product and developer materials.

Claim boundary: Visa's materials are used to support the current direction of agentic-commerce infrastructure: agent-bound tokenized credentials, user authentication, and controls aligned to authenticated instructions. Visa notes the product is in deployment and final features may differ, so the chapter treats the architecture as emerging rather than settled.

Sources:
- https://www.visa.com/en-us/solutions/intelligent-commerce
- https://developer.visa.com/use-cases/visa-intelligent-commerce-for-agents

### Mastercard Agent Pay

- Mastercard Agent Pay and Agent Pay for Machines materials.

Claim boundary: Mastercard is used as another example of payment networks building identity, credential, and control infrastructure for agent-initiated commerce. Marketing projections are not relied upon as factual forecasts.

Sources:
- https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html
- https://www.mastercard.com/us/en/news-and-trends/press/2026/june/mastercard-launches-agent-pay-for-machines.html

### Reuters — India / UPI agentic payments

- Reuters, September 1, 2026, reporting on India's planned agentic-payment framework for UPI.

Claim boundary: the framework is described as being prepared / expected rather than as a fully deployed national system. Reuters reported expected use of delegated funds, spending limits, identity checks, and liability provisions.

Source:
- https://www.reuters.com/world/india/india-preparing-rollout-agentic-payments-upi-sources-say-2026-09-01/

## Counterevidence and constraints preserved

- Existing delegated-auth standards solve only part of the agent problem; possession of a valid token does not prove that a particular action fits the user's semantic intent.
- Human approval for every action can destroy the value of delegation and create consent fatigue.
- Agent identity or certification systems can create new incumbent advantages and gatekeeping barriers.
- Stronger agent context can improve risk decisions while creating privacy risks if too much of the user's private instruction is exposed.
- Automated appeal and negotiation can become machine-to-machine paperwork loops without meaningful change in judgment.
- Human presence can sometimes be a legitimate safeguard when testimony, consent, responsibility, or value judgment genuinely matters.
- Open agent interoperability can create security, provenance, and misinterpretation risks.

## Design principles developed

1. **Mandate before capability.** What advances the goal is not automatically authorized.
2. **Minimum viable authority.** Grant enough permission to complete the task, not the union of every permission the agent might someday use.
3. **Delegation envelope.** Encode principal, objective, scope, budget, counterparties, duration, frequency, approval thresholds, prohibitions, evidence, and revocation.
4. **Rate-shaped authority.** Repetition and velocity can change the meaning and risk of otherwise permitted individual actions.
5. **Permission provenance.** Preserve who delegated, which agent acted, which credential and policy authorized it, and what happened.
6. **Consent maintenance.** Long-lived mandates should decay, refresh, or trigger re-consent on material changes.
7. **Selective sovereignty.** Keep humans at consequence, ambiguity, legal, and value-judgment thresholds rather than inserting them mechanically into every step.
8. **Machine-readable refusal semantics.** Distinguish temporary failure, rate limit, missing scope, consent required, policy prohibition, legal prohibition, review required, and alternate-route permission.
9. **Delegated reversibility.** Prefer reversible intermediate states when intent is uncertain: draft, reserve, preview, stage, hold, test.
10. **Permission accretion controls.** Privilege should shrink naturally over time unless renewed.
11. **Permission dashboard.** Users need a legible ledger of active delegates, scopes, budgets, actions, expiries, and revocation controls.
12. **Escape from automation.** Machine-to-machine deadlocks need a route to a different mode of judgment.
13. **Principal capability test.** The system succeeds when a more capable agent makes the principal more capable rather than more dependent.

## Forward link

Chapter 20 should synthesize the book into a positive design doctrine for good gates: purpose-bounded, proportionate, legible, measurable, appealable, reversible where possible, independently reviewable when conflicted, interoperable enough for credible exit, and explicit about who bears the cost of false positives and false negatives.
