# Delegation Protocol Invariants

*Cross-document checks for the experimental Delegation Protocol in* The Delegation Machine.

JSON Schema can prove that a mandate or action receipt has the expected shape. It cannot, by itself, prove that the authority was still live, that an action identifier has never been used before, that a subdelegate stayed inside a parent mandate, that the cited evidence really came from an independent source, or that revocation won a race against execution.

Those are **protocol invariants**: properties that have to remain true across documents, actors, time, and external state.

This note defines the minimum semantic checks an implementation should apply in addition to validating:

- [`delegation-mandate.schema.json`](delegation-mandate.schema.json)
- [`proof-carrying-action.schema.json`](proof-carrying-action.schema.json)
- the adversarial cases in [`THREAT-MODEL.md`](THREAT-MODEL.md)

It is an experimental Bookself companion, not a security certification, legal instrument, or external standard.

## 1. Shape validity is necessary and insufficient

A document can be perfectly schema-valid and still be unsafe to execute.

Consider a valid mandate that expired yesterday. The JSON still parses. Every required field may still be present. The grants may still describe real resources. None of that means the delegate has authority today.

Likewise, a proof-carrying action receipt may correctly name a mandate, contain a syntactically valid timestamp, and include an independent receipt while still referring to an action identifier that was already consumed. A replay attack is not malformed JSON.

The implementation boundary is therefore:

1. **Schema validation** asks whether a document is structurally admissible.
2. **Semantic validation** asks whether this document is valid in relation to current authority, prior events, referenced documents, and observed evidence.
3. **Execution policy** asks whether a semantically valid action should be allowed in the current environment.

Passing layer 1 must never be treated as proof of layers 2 or 3.

## 2. Required evaluator state

A serious evaluator needs more than the two JSON documents. At minimum it needs access to:

- a trusted clock or bounded notion of current time;
- the authoritative mandate record for a `mandate_id`;
- revocation state for that mandate and any parent mandates;
- a durable set of previously consumed `action_id` values;
- the parent chain for subdelegated mandates;
- the principal and delegate identities as resolved by the execution environment;
- the resource/action actually requested or actually observed;
- evidence-source metadata sufficient to assess independence rather than merely repeat a boolean supplied by the delegate;
- any policy layer that constrains resources beyond the mandate itself.

If one of these inputs is required for a decision and cannot be obtained, the safe default is to **block**, not to silently infer permission.

## 3. Core invariants

### INV-01 — The active mandate must be authoritative

The evaluator must resolve `mandate_id` to the authoritative mandate record used by the principal or its trusted authority service. A caller-supplied copy is not enough when a canonical record exists.

A mandate that cannot be resolved should not authorize a state-changing action.

**Threats reduced:** authority injection, forged mandates, stale local copies.

### INV-02 — Expiry and revocation are live-state checks

Before a state-changing action, the evaluator must check that the mandate has not expired and has not been revoked.

`revocation.expires` is data that must be interpreted against trusted current time. Revocation channels describe how revocation can occur; they do not prove that revocation has not occurred.

If a parent mandate has been revoked, child mandates derived from it cannot remain magically live unless the delegation system explicitly defines and records an independent authority basis.

**Threats reduced:** stale mandates, revocation lag, authority laundering.

### INV-03 — Revocation wins races

The check for live authority and the transition into execution need a race-safe design. An implementation that checks revocation, pauses, and then executes after revocation can still violate the principal's boundary.

For high-consequence actions, use an atomic or otherwise concurrency-safe mechanism such as a lease, transaction, short-lived authorization token, generation counter, or equivalent policy-engine decision that is bound to the action being executed.

When the implementation cannot make the check race-safe, the residual window should be explicit and proportionate to the consequence.

**Threats reduced:** revocation lag, time-of-check/time-of-use failure.

### INV-04 — Principal and delegate identity must match the execution context

The `principal` and `delegate` in the mandate and receipt must match identities resolved by trusted infrastructure, not only strings asserted inside the documents.

A delegate cannot gain authority by presenting a document that simply names a more privileged principal or a different delegate.

**Threats reduced:** principal impersonation, confused deputy behavior, authority injection.

### INV-05 — Requested action must be contained by grants and limits

Every resource and operation to be executed must fit within an explicit grant and must not violate an applicable limit, exclusion, stop condition, approval requirement, or rate limit.

Absence of a prohibition is not a grant.

Textual ambiguity should narrow authority rather than expand it. If a resource name or action has multiple plausible interpretations and one exceeds the grant, the evaluator should block or require clarification.

**Threats reduced:** confused deputy attacks, semantic capability composition, scope creep.

### INV-06 — Actual state changes must be contained by the mandate

Validation cannot stop at the requested operation. The evaluator or post-action verifier must compare the **actual state changes** recorded in the receipt with the authority the mandate granted.

A nominally permitted command that causes additional unauthorized changes is not made compliant by the command name.

For compound operations, containment applies to every material downstream state change that the implementation can observe.

**Threats reduced:** hidden downstream obligations, semantic composition, authority laundering.

### INV-07 — Subdelegation can only narrow

For a child mandate with `provenance.parent_mandate_id`:

- the parent must exist and be live;
- the parent must allow subdelegation;
- the child depth must not exceed the parent's `maximum_depth`;
- every child grant must be contained by a parent grant;
- child limits may be equal or stricter, never looser where they govern the same authority dimension;
- the child may not remove a parent exclusion, stop condition, or required approval in a way that expands authority;
- the child may not manufacture a new principal authority basis merely by changing labels.

`may_expand_scope: false` is a schema-level statement. Proving that scope did not expand is a cross-document semantic check.

**Threats reduced:** subdelegation amplification, authority laundering.

### INV-08 — Action identifiers are single-use

`action_id` must be unique within the trust domain in which replay would matter.

Before execution, the evaluator should perform a durable check-and-mark operation so the same action cannot be accepted twice through retries, duplicated messages, queue redelivery, or adversarial replay.

The uniqueness operation must be concurrency-safe. Two workers that both observe “not seen yet” and then both execute have not implemented replay protection.

If intentional retry is allowed, the retry should either reuse an idempotency mechanism that returns the prior result without repeating side effects or receive a new action identity linked to the prior attempt.

**Threats reduced:** replay, duplicate side effects, accidental double execution.

### INV-09 — Receipts must bind to the exact mandate and action

A receipt's `mandate_id` and `action_id` must identify the authority and action actually used.

Where `mandate_ref`, digests, signatures, immutable object versions, or equivalent references are available, implementations should bind the receipt to the exact version that governed execution.

A receipt from one mandate cannot be relabeled as proof for another merely because the human-readable task descriptions look similar.

**Threats reduced:** evidence laundering, authority laundering, replay.

### INV-10 — Temporal ordering must be coherent

Where timestamps are present:

- `started_at` must not occur after `completed_at`;
- `recorded_at` should not precede the events it claims to record;
- evidence used to support completion should be temporally capable of observing the relevant result;
- a mandate's `issued_at`, when present, should not postdate execution;
- execution must fall inside the mandate's live authority window.

Clock skew may require tolerance, but tolerance must be bounded and explicit. “The clocks were different” is not a general exemption from temporal reasoning.

**Threats reduced:** stale evidence, fabricated sequencing, replay, revocation races.

### INV-11 — Evidence independence is assessed, not self-declared

The schema includes `independent_of_delegate` because the property matters. An implementation should not accept that boolean as sufficient proof of independence when it can resolve the source more carefully.

Operational independence asks whether the evidence was produced by a distinct system or actor. Epistemic independence asks whether the evidence can fail independently of the delegate's own claims or artifacts.

For example, CI run by a separate service may be operationally independent but weakly independent if the delegate also rewrote the test so that the check no longer measures the intended property.

High-consequence completion should favor evidence whose failure modes are meaningfully separate from the delegate's action and self-report.

**Threats reduced:** evidence laundering, review capture, status laundering.

### INV-12 — Completion cannot erase uncertainty

The receipt schema requires explicit uncertainty fields. A `completed` status does not imply that `known_unknowns` and `unverified_claims` must be empty.

The semantic evaluator should reject or downgrade completion when a listed unknown contradicts a mandatory completion criterion or when an unverified claim is necessary to establish success.

Otherwise uncertainty should remain attached to the receipt rather than being discarded for the sake of a clean status.

**Threats reduced:** status laundering, evidence laundering.

### INV-13 — Review state must reflect mandate triggers

If the mandate's review rules require review for the executed action, the receipt's review state should say so. A delegate cannot bypass review merely by omitting `review_state`, labeling review “not required,” or restructuring an operation so that the trigger disappears cosmetically.

The evaluator should derive review requirement from the mandate and observed action, then compare that result with the receipt.

**Threats reduced:** review capture, approval bypass, status laundering.

### INV-14 — Rollback claims must match observed consequence

The receipt schema already requires `reversal.status: executed` when `status` is `rolled_back`. Semantic validation should go further when possible: verify that the relevant state was actually restored, compensated, or contained.

A successful rollback receipt should not be treated as proof that no residual obligations remain. Cleanup, disclosure, downstream revocation, or reconciliation may still belong in `next_obligations`.

**Threats reduced:** status laundering, incomplete rollback.

### INV-15 — Outstanding obligations survive handoff

`next_obligations` are part of the action record. An implementation that copies, aggregates, or transforms receipts should preserve unresolved obligations or explicitly discharge them with evidence.

A workflow may not convert `partial` to `completed` merely by dropping the obligation list at an intermediate boundary.

**Threats reduced:** hidden downstream obligations, status laundering.

### INV-16 — Failure to establish authority is a valid blocked outcome

If the evaluator cannot establish that the action is authorized, current, non-replayed, and within policy, it should return or record a blocked result without performing the state change.

This is not a protocol failure. It is one of the protocol's intended success modes.

The conformance corpus already includes [`valid/blocked-authority-boundary.receipt.json`](conformance/valid/blocked-authority-boundary.receipt.json) to make this behavior concrete.

**Threats reduced:** escalation by persistence, confused deputy behavior, authority injection.

## 4. A reference evaluation sequence

A production implementation will differ by environment, but the semantic order matters. A conservative evaluator can follow this sequence before a state-changing action:

1. Parse the mandate and proposed action data.
2. Validate each document against its declared schema version.
3. Resolve `mandate_id` from the authoritative store.
4. Resolve principal and delegate identity from trusted execution context.
5. Resolve the parent chain, if any.
6. Check expiry and current revocation state for the mandate and relevant ancestors.
7. Verify subdelegation containment across the parent chain.
8. Translate the proposed operation into concrete resources and actions.
9. Check grants, limits, exclusions, stop conditions, approval requirements, and policy overlays.
10. Atomically establish replay/idempotency protection for `action_id` before side effects.
11. Execute only the authorized operation.
12. Observe and record material state changes.
13. Verify that observed changes remain within authority.
14. Collect evidence and assess source independence.
15. Derive required review from the mandate and actual action.
16. Record uncertainty and remaining obligations.
17. Persist the receipt and any replay/revocation state needed for future evaluation.

For a blocked action, the sequence should stop before side effects and preserve enough evidence to explain the boundary that stopped it.

## 5. Replay and idempotency are different

Replay protection and idempotency are related but not interchangeable.

**Replay protection** answers: *Have I already accepted this action identity?*

**Idempotency** answers: *If the same intended operation arrives again, can I return the prior result without repeating harmful side effects?*

A payment API can reject a repeated `action_id`, or it can use that identifier as an idempotency key and return the result of the first accepted action. Both can be safe if the semantics are explicit.

What is unsafe is accidental ambiguity: a queue retry that looks like a new command to one component and the same command to another.

## 6. Freshness is not just a timestamp

A recent document may still carry stale authority if revocation happened elsewhere. An old document may still describe a valid long-lived mandate if its authority remains live.

Freshness therefore means resolving the current state of the authority relationship, not simply checking whether a timestamp looks recent.

For cached or offline systems, the implementation should define an **authority freshness budget**: the maximum age of revocation and mandate state it is willing to trust for a given class of action. Higher-consequence actions should normally tolerate a smaller freshness window.

If the freshness budget is exceeded, block or require renewed authority rather than silently extending the principal's exposure.

## 7. What belongs in schema and what does not

The current schemas intentionally encode some local invariants:

- `may_expand_scope` must be false;
- the delegate may not self-approve;
- `completed` requires at least one receipt marked independent of the delegate;
- `rolled_back` requires reversal status `executed`.

Those are useful because one document contains enough information to evaluate them.

The schemas should not pretend to prove facts that require external state. Examples include:

- whether `action_id` is globally unique;
- whether a mandate has been revoked since the document was issued;
- whether the current time is before expiry;
- whether a child's grants are truly contained by a parent's grants;
- whether a cited CI run actually corresponds to the action;
- whether an evidence source is epistemically independent;
- whether an observed state change exceeded the intended action;
- whether a rollback restored the relevant external state.

These belong in protocol evaluation, policy engines, durable state, and evidence verification.

## 8. Conformance should grow beyond document validity

The existing conformance corpus is deliberately small and document-local. The next maturity step is a sequence corpus where a test case can include:

- one or more mandates;
- revocation events;
- action proposals;
- prior `action_id` state;
- external evidence metadata;
- expected evaluator verdicts;
- expected receipt status when no state change is permitted.

That would let the project test cases such as:

- a schema-valid but expired mandate;
- a mandate revoked milliseconds before execution;
- replay of a previously accepted action ID;
- two workers racing on the same action ID;
- a child mandate whose textual grant looks narrower but resolves to a broader resource set;
- a completed receipt backed by a nominally independent check whose test definition was changed by the delegate;
- a rollback receipt where the compensating action succeeded but a downstream obligation remains.

Until such a runner exists, implementers should treat this document as the semantic checklist that sits above the JSON Schemas.

## 9. Minimal acceptance rule

For a state-changing delegated action, the implementation should be able to answer **yes** to all of these questions before it treats the action as authorized and complete:

- Is the mandate structurally valid?
- Is this the authoritative current mandate?
- Is the principal real and correctly bound?
- Is the delegate the actor actually executing?
- Is the mandate live and unrevoked?
- Is the action within explicit grants, limits, exclusions, and approvals?
- If subdelegated, is the child strictly contained by the parent chain?
- Is the action identity protected against replay?
- Did the actual state change stay within authority?
- Is the completion evidence genuinely capable of verifying the result?
- Were required review triggers honored?
- Are uncertainty and remaining obligations preserved?

If any required answer is **no**, do not upgrade the result to success.

If any required answer is **unknown**, the conservative protocol behavior is to stop at the boundary and make the missing authority or evidence visible.

That is the central operating principle of the Delegation Machine artifacts: **a trustworthy delegate must be able to prove not only what it did, but why it was allowed to do it, what evidence supports the result, and where it correctly refused to go further.**
