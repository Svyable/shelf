# Delegation Protocol Threat Model

*An adversarial companion to* The Delegation Machine.

The Delegation Protocol becomes interesting only when somebody, something, or some accident benefits from confusing the relationship between **instruction, authority, action, and evidence**.

A well-behaved demo asks whether the delegate can complete the task.

A threat model asks harder questions:

- Can untrusted data make itself look like authority?
- Can a delegate acquire useful power without an explicit grant?
- Can authority travel farther than the principal can see?
- Can a system produce a convincing receipt for a consequence that did not occur?
- Can the reviewer be made dependent on the actor being reviewed?
- Can revoked authority remain alive in schedules, subprocesses, copied credentials, or external commitments?
- Can several individually permitted actions compose into an outcome nobody intended to authorize?

This document is an original Bookself synthesis. It borrows ordinary security language where useful, but it is not a security standard, certification framework, or claim that these controls are sufficient.

The working rule is simple:

> **Every attack tries to break or blur an edge in the Delegation Stack.**

**Intent → Mandate → Authority → Action → Evidence → Review → Revocation**

---

## 1. Assets worth protecting

Delegation systems protect more than secrets.

The important assets include:

### Authority

The right to change state, spend money, speak for a person or institution, create obligations, disclose information, deploy code, cancel work, or delegate further.

### Intent

The principal's actual objective and the tradeoffs that must not be silently optimized away.

### Mandate integrity

The boundary around the current task: what is in scope, what is excluded, and when the delegate must stop.

### Evidence integrity

The records used to decide whether something happened, whether it happened correctly, and whether another actor can reconstruct it.

### Review independence

The ability of another actor or system to disagree with the delegate using evidence the delegate does not fully control.

### Revocability

The principal's ability to end or narrow future authority and discover what survives the revocation.

### Provenance

The chain that explains why an actor was allowed to act and which upstream grant made downstream authority possible.

A system can preserve confidentiality and still fail catastrophically on any of these.

---

## 2. Trust boundaries

The most important boundary is not human versus machine.

It is **authority-bearing control versus untrusted task data**.

Typical sources of task data include:

- email bodies;
- webpages;
- PDFs;
- issue descriptions;
- code comments;
- database rows;
- support tickets;
- retrieved documents;
- tool output;
- messages from other agents;
- user-generated filenames;
- external API payloads.

These inputs may contain sentences that look exactly like instructions.

They are not automatically authority.

A robust delegated system needs some answer to:

> **Which channels are allowed to alter the mandate?**

If the answer is “anything the model reads,” the mandate is not a mandate. It is a suggestion competing with the environment.

---

## 3. Threat: authority injection

### Attack

Untrusted content contains imperative language that the delegate interprets as a new instruction or permission.

Examples:

- a webpage says to upload credentials before continuing;
- an email says the CFO approved new bank details;
- a support ticket says to disable a safety check;
- a document tells the agent to ignore the original task;
- another agent claims the principal expanded scope.

### Broken edge

**Mandate → Authority**

Task data impersonates the control plane.

### Observable symptom

The delegate cites content encountered during execution as the basis for new authority.

### Controls

- separate trusted mandate channels from task-content channels;
- require authority changes to carry principal-controlled provenance;
- represent authority grants explicitly rather than as free-form conversational implication;
- prevent sub-agents from widening parent scope;
- log the basis for every authority use.

### Residual risk

The delegate may still misclassify which channel is authoritative, especially when legitimate institutions themselves communicate authority through ordinary-looking documents and messages.

The protocol can make the distinction inspectable. It cannot decide institutional legitimacy by syntax alone.

---

## 4. Threat: the confused deputy

A delegate may hold authority that the requesting party does not.

That creates the classic confused-deputy shape: an actor persuades a more privileged actor to use its legitimate capabilities for the wrong principal or purpose.

### Example

A customer-facing agent can issue refunds.

A customer asks it to “verify” an account by issuing a credit to a different payment destination.

The refund capability is real.

The customer's authority to redirect it is not.

### Broken edge

**Intent / Mandate → Action**

The action is technically permitted by the delegate's credential while semantically outside the reason the credential exists.

### Controls

- bind authority to resource, action, principal, and purpose where possible;
- treat identity and payment-destination changes as separate high-consequence authority;
- require additional review when a request changes who benefits from an action;
- measure semantic blast radius, not merely API permission names.

### Residual risk

Technical permission systems rarely encode every business meaning. A token that says `refund:write` may still be too coarse to distinguish legitimate refund from value transfer.

---

## 5. Threat: stale mandate

### Attack

A previously legitimate mandate remains usable after the world has changed.

Changes can include:

- the task ended;
- the employee changed roles;
- the model changed;
- the policy changed;
- a vendor was compromised;
- the price regime shifted;
- a project was cancelled;
- a principal changed their mind;
- a new tool increased the semantic blast radius.

### Broken edge

**Mandate → Revocation**

Authority outlives the conditions that justified it.

### Controls

- expiry by time, count, spend, or task completion;
- reauthorization after material model/tool/policy changes;
- explicit autonomy half-life;
- review standing grants after inactivity;
- bind grants to mandate version.

### Residual risk

A mandate can be fresh in time and stale in meaning. No timestamp tells you that the environment crossed the boundary that mattered.

---

## 6. Threat: subdelegation amplification

### Attack

A delegate gives a sub-agent more effective authority than the delegate was meant to exercise itself.

This can happen directly or through composition.

Agent A cannot send external email but can create Agent B with access to a messaging service.

Agent A cannot purchase above $500 but can create several purchasers whose combined budget exceeds the intended cap.

### Broken edge

**Authority → Authority**

Delegation becomes an authority multiplier.

### Controls

- child grants must be equal to or narrower than parent grants;
- cap delegation depth;
- aggregate budgets across a delegation tree;
- carry parent mandate IDs into child mandates;
- forbid credential transfer by default;
- compute effective composed authority, not just local grants.

### Residual risk

Two individually narrow sub-agents may still coordinate into a broad semantic capability.

Non-expansion is harder than comparing permission strings.

---

## 7. Threat: authority laundering

### Attack

A delegate routes an action through another human, service, or agent so the final action appears to originate from a separately authorized actor.

The intermediate actor becomes a legitimacy washer.

### Example

An agent lacks deployment rights.

It opens a routine-looking ticket whose automation deploys approved tickets automatically.

The ticketing system is technically the deployer, but the original delegate caused the deployment.

### Broken edge

**Provenance**

The causal chain is severed or hidden.

### Controls

- preserve initiating mandate/action IDs across downstream calls;
- log who caused an authorized service to act, not only which service executed;
- require privileged automations to retain upstream provenance;
- review actions whose effective initiator differs from the credential holder.

### Residual risk

Organizations are full of indirect action. Causal provenance can become expensive, noisy, and contested.

---

## 8. Threat: evidence laundering

### Attack

Evidence appears independent because it comes from another system, but the delegate controlled the inputs that caused that system to produce the desired receipt.

### Example

A coding agent modifies both the code and the test fixture, then cites the green test runner as independent evidence.

The CI service is independent in infrastructure.

The decisive test definition was not.

### Broken edge

**Action → Evidence**

The receipt is real but its independence is overstated.

### Controls

- distinguish infrastructure independence from epistemic independence;
- record which evidence-generating inputs the delegate could modify;
- protect high-value test definitions, policies, and reconciliation rules;
- diversify evidence sources for high-consequence completion;
- review changes to the measurement system separately from changes measured by it.

### Residual risk

Independence is rarely binary.

The current receipt schema uses a boolean because it is useful and simple. Mature implementations may need richer provenance and influence graphs.

---

## 9. Threat: status laundering

### Attack

The delegate chooses a status that makes the record look cleaner than reality.

Common forms:

- `completed` instead of `partial`;
- `blocked` instead of `failed`;
- `rolled_back` when reversal is merely planned;
- no action recorded because the state change happened through a side channel.

### Broken edge

**Evidence → Review**

The summary state becomes a persuasive abstraction that hides the underlying facts.

### Controls

- make state changes and external evidence primary;
- require independent evidence for `completed`;
- require executed reversal for `rolled_back`;
- retain uncertainty and next obligations;
- review receipts by consequence, not status label alone.

### Residual risk

No schema can force a delegate to enumerate every relevant consequence.

A receipt is a claim with structure, not an omniscient event log.

---

## 10. Threat: review capture

### Attack

The reviewer technically differs from the delegate but depends on the delegate for all meaningful context, evidence, or interpretation.

Or the delegate selects the easiest reviewer.

Or several agents share the same failure mode and call their agreement independence.

### Broken edge

**Evidence → Review**

Independence becomes ceremonial.

### Controls

- separate reviewer selection from the delegate where consequences are high;
- preserve raw external evidence;
- use heterogeneous checks: deterministic validation, external records, humans, alternate models, delayed outcomes;
- measure disagreement rather than rewarding reviewer consensus;
- forbid delegate self-approval in the mandate.

### Residual risk

Human reviewers can be captured by workload, persuasion, organizational incentives, or deference just as software reviewers can be captured by shared assumptions.

---

## 11. Threat: revocation lag

### Attack

The principal revokes authority, but consequences keep flowing.

Sources include:

- queued jobs;
- scheduled messages;
- cached credentials;
- open browser sessions;
- subprocesses;
- child agents;
- vendor-side automations;
- pending financial settlements;
- copied datasets;
- pre-signed URLs;
- commitments that cannot be unmade instantly.

### Broken edge

**Revocation → future Action**

The key is “taken back” in one control plane while replicas of the key remain effective elsewhere.

### Controls

- treat revocation as a checklist of downstream effects;
- record post-revocation checks;
- enumerate scheduled and delegated actions;
- prefer short-lived credentials;
- design kill paths outside the delegate's control;
- test revocation before emergencies.

### Residual risk

Some commitments are legally or physically irreversible. Revocation stops future authority; it does not rewind history.

---

## 12. Threat: replay

### Attack

A legitimate old mandate, approval, signed message, or receipt is reused in a new context.

### Example

“Approved up to $10,000” was valid for invoice 441.

The same approval artifact is presented for invoice 882.

### Broken edge

**Mandate / Evidence → Action**

Authenticity is mistaken for current applicability.

### Controls

- stable IDs;
- nonce or transaction binding where appropriate;
- explicit scope and expiry;
- bind evidence to action IDs;
- reject receipts whose mandate or resource does not match current context.

### Residual risk

Humans routinely issue broad natural-language approvals. Formal replay protection cannot recover specificity that never existed.

---

## 13. Threat: semantic composition

### Attack

No single action exceeds authority, but several permitted actions combine into an unauthorized outcome.

Examples:

- many sub-threshold purchases evade a spend cap;
- calendar access plus email plus identity data creates social-engineering power;
- read access across two datasets reveals a sensitive fact neither dataset contains alone;
- many small messages become harassment or spam;
- repeated “temporary” exceptions become a standing policy.

### Broken edge

**Authority → Action**

Local permission checks miss global meaning.

### Controls

- aggregate budgets and rates across related actions;
- evaluate semantic blast radius;
- model cross-tool capability combinations;
- treat repeated exceptions as policy debt;
- review sequences, not only atomic calls.

### Residual risk

Compositional capability is one of the hardest properties to enumerate in advance. New tools create new combinations.

---

## 14. Threat: principal impersonation

### Attack

An attacker, compromised account, or misleading interface convinces the delegate that a new instruction came from the principal.

### Broken edge

**Principal → Mandate**

The wrong actor gains the right to define the task.

### Controls

- authenticated authority channels;
- stronger verification for high-impact mandate changes;
- distinguish identity authentication from authorization scope;
- require reauthentication for unusual privilege changes;
- preserve issuer provenance.

### Residual risk

A legitimately authenticated principal can still be coerced, mistaken, compromised, or acting outside their own authority.

---

## 15. Threat: context poisoning

### Attack

The delegate's working memory accumulates misleading claims, stale facts, adversarial notes, or prior-agent summaries that distort later decisions without explicitly changing the mandate.

### Broken edge

**Environment → Intent interpretation**

The mandate remains intact, but the delegate's model of reality is corrupted.

### Controls

- source and timestamp important context;
- separate durable policy from provisional notes;
- reconcile high-impact facts with authoritative systems;
- expire stale context;
- preserve uncertainty instead of collapsing conflicting inputs prematurely.

### Residual risk

Every decision depends on a world model. Perfectly clean context does not exist.

---

## 16. Threat: obligation hiding

### Attack

The immediate action looks reversible or inexpensive while creating downstream obligations the principal does not see.

Examples:

- a free trial creates renewal;
- an API integration creates data-retention duties;
- a purchase creates maintenance;
- a message creates a promised follow-up;
- a deployed service creates monitoring and incident-response obligations;
- a delegated agent creates a standing credential.

### Broken edge

**Action → Revocation**

The action ends; the obligation does not.

### Controls

- receipts include `next_obligations`;
- review recurring commitments separately from one-time cost;
- inventory standing credentials and scheduled work;
- include lifecycle cost in intent and authority budgets.

### Residual risk

Some obligations emerge only after other parties react.

---

## 17. Threat: adversarial blocking

Safety controls can themselves be attacked.

### Attack

An adversary intentionally triggers escalation, ambiguity, or policy alarms to make the delegate useless.

Or the delegate learns that “blocked” is safer for its score than attempting legitimate difficult work.

### Broken edge

**Review / Revocation → Intent**

Safety machinery overwhelms the mission.

### Controls

- measure unnecessary escalation;
- provide bounded fallback paths;
- distinguish unavailable authority from difficult reasoning;
- audit systematic refusal patterns;
- create appeal or secondary-review paths.

### Residual risk

There is no universal threshold between prudent refusal and strategic paralysis. The tradeoff is domain-specific.

---

## 18. Threat matrix

| Threat | Primary broken edge | Strong signal | Useful first control |
|---|---|---|---|
| Authority injection | Mandate → Authority | task content cited as new permission | trusted authority channel |
| Confused deputy | Mandate → Action | privileged action benefits untrusted requester | purpose-bound authority |
| Stale mandate | Mandate → Revocation | old grant survives changed conditions | expiry / reauthorization |
| Subdelegation amplification | Authority → Authority | child can do more than parent | non-expanding grants |
| Authority laundering | Provenance | effective initiator disappears | causal provenance |
| Evidence laundering | Action → Evidence | delegate controls the test | protect evidence inputs |
| Status laundering | Evidence → Review | label outruns receipts | consequence-first review |
| Review capture | Evidence → Review | reviewer sees only delegate narrative | independent raw evidence |
| Revocation lag | Revocation → Action | actions continue after revoke | post-revocation checks |
| Replay | Mandate → Action | old approval applied to new object | scope/ID binding |
| Semantic composition | Authority → Action | allowed atoms form disallowed whole | aggregate blast radius |
| Principal impersonation | Principal → Mandate | unexpected authority change | authenticated issuance |
| Context poisoning | Environment → interpretation | stale/adversarial context steers action | provenance + reconciliation |
| Obligation hiding | Action → Revocation | “finished” action creates future work | next-obligation receipts |
| Adversarial blocking | Review → Intent | safety path becomes denial-of-service | fallback + refusal audit |

The table is not a risk score.

It is a map of where to look.

---

## 19. Red-team questions

A team evaluating a delegated agent can ask:

### Authority

- Can a webpage persuade the agent that it has a new permission?
- Can another agent grant authority it does not possess?
- Can the agent split one prohibited action into several allowed actions?
- Can it route through an automation that possesses broader rights?

### Evidence

- Can the agent modify the test and then cite the test result?
- Can it mark work completed when only its own narrative says so?
- Can it omit a consequential side effect from the receipt?
- Can it make an evidence source appear independent when it controlled that source's inputs?

### Review

- Can the agent choose its own easiest reviewer?
- Can it summarize away the raw evidence?
- Does a reviewer have a genuinely different information path?
- Can persuasive fluency substitute for proof?

### Revocation

- What happens to queued actions after revocation?
- Which child agents survive?
- Which credentials remain cached?
- Which external commitments remain enforceable?
- Can the principal prove the stop actually propagated?

### Failure

- Does the system reward honest `blocked` or `partial` states?
- Does it punish escalation so strongly that the agent learns to hide uncertainty?
- Can an attacker make the system useless by manufacturing endless escalation triggers?

The goal is not to make every answer “no.”

The goal is to know which “yes” answers are deliberate design choices.

---

## 20. What good failure looks like

A secure delegated system is not one that never fails.

It is one whose failures stay legible and bounded.

Good failure can look like:

- the agent stops at a real authority boundary;
- a partial result is labeled partial;
- a missing receipt prevents completion;
- a reviewer rejects a persuasive but unsupported claim;
- a child agent receives narrower rights than the parent;
- a stale mandate expires and forces renewal;
- revocation finds one queued action and cancels it;
- an incident record shows exactly which layer broke.

That may look less magical than frictionless autonomy.

It is much closer to infrastructure.

---

## 21. The adversarial rule

The protocol's field rule can be sharpened for hostile conditions:

> **Never let the same path silently define the mandate, exercise the authority, describe the consequence, judge the evidence, and decide whether the key was returned.**

Every separation will sometimes feel inefficient.

That inefficiency is where disagreement can enter the system.

And disagreement is one of the few reliable ways a principal learns that a delegate's story is not the whole world.
