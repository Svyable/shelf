# The Delegation Protocol

*An experimental implementation companion to* The Delegation Machine.

The book's **Delegation Stack** is a vocabulary for seven questions:

**Intent → Mandate → Authority → Action → Evidence → Review → Revocation**

This protocol turns that vocabulary into a simple exchange between principals, delegates, tools, reviewers, and records.

It is an original Bookself synthesis. It is not an external standard, a security certification, a legal instrument, or proof that a delegate is trustworthy. The schemas make delegation more inspectable. They do not make judgment unnecessary.

---

## 1. Two objects, one relationship

The protocol starts with two machine-readable objects.

### The mandate

A **Delegation Mandate** is issued before consequential action.

It says:

- who the principal is;
- who the delegate is;
- what outcome matters;
- what task is in scope;
- which authority is granted;
- which limits and stop conditions apply;
- which evidence must exist;
- who can review;
- and how authority expires or is revoked.

The canonical schema is [`delegation-mandate.schema.json`](delegation-mandate.schema.json).

### The action receipt

A **Proof-Carrying Action Receipt** is emitted during or after consequential action.

It says:

- which mandate the action claims to operate under;
- what the delegate actually changed;
- which authority it actually used;
- which independent receipts exist;
- what remains uncertain;
- whether reversal is available;
- which obligations were created;
- and whether review is pending, accepted, or rejected.

The canonical schema is [`proof-carrying-action.schema.json`](proof-carrying-action.schema.json).

The mandate is not evidence that the action happened.

The receipt is not permission to have acted.

They check different sides of the same relationship.

---

## 2. The lifecycle

A minimal protocol run has eight stages.

### 1. Issue

The principal issues a mandate with a stable `mandate_id`.

The mandate should be understandable before credentials are granted. If authority cannot be described clearly enough to inspect, broadening the credential does not solve the ambiguity.

### 2. Validate

Validate the mandate's structure.

Structural validity is intentionally weaker than legitimacy. A syntactically perfect mandate can still be foolish, illegal, contradictory, or issued by the wrong principal.

### 3. Bind authority

Where the surrounding system permits it, bind credentials, budgets, tool scopes, and time limits to the mandate.

The model's narration should not be the source of authority.

A webpage, email, retrieved document, user-generated record, or tool result may provide **task data**. It does not become a new mandate merely because it contains imperative language.

### 4. Act

Prefer the least irreversible path compatible with the mandate.

Observe before changing. Draft before sending. Branch before merging. Stage before deploying. Hold before purchasing. Escalate before silently enlarging jurisdiction.

### 5. Emit receipts

Record consequential state changes as they happen.

A long-running agent does not need to wait until the end to produce one triumphant receipt. It can issue a sequence linked through provenance.

The receipt should favor independently generated references: commit SHAs, transaction IDs, API results, delivery receipts, signed records, reconciled state, or other artifacts not created solely by the delegate's prose.

### 6. Review

Review the consequence using evidence that can disagree with the delegate.

Review intensity should rise with irreversibility, externality, novelty, uncertainty, and authority.

A second fluent explanation is not automatically independent review.

### 7. Revoke or renew

At completion, timeout, anomaly, policy change, or explicit principal instruction, expire or revoke the relevant authority.

Revocation is a process, not a sentence. Check for scheduled actions, copied credentials, delegated subprocesses, persistent sessions, external commitments, and other residue.

### 8. Retain provenance

Keep enough mandate and receipt history to reconstruct why an actor was allowed to act and what happened afterward.

A useful delegated system should be able to answer two questions later:

> Why were you allowed to do that?

> What evidence shows what you actually did?

---

## 3. Protocol invariants

The current experimental schemas encode or assume several invariants.

### Authority cannot self-expand

A delegate may discover that more authority would be useful.

That discovery is not itself a grant.

Subdelegated authority should be equal to or narrower than its parent. The mandate schema fixes `may_expand_scope` to `false`.

### A receipt cannot rewrite the mandate

An action receipt can describe an exception that was used.

It cannot retroactively turn an unauthorized action into an authorized one.

If authority legitimately changes, issue or amend the mandate through a principal-controlled path and preserve provenance.

### Completion requires independent evidence

In `proof-carrying-action/0.1`, the status `completed` requires at least one evidence receipt marked `independent_of_delegate: true`.

This does not guarantee truth.

It does make a bare self-authored “done” structurally insufficient.

### Incompletion is first-class

`partial`, `blocked`, and `failed` are valid terminal or intermediate states.

The protocol deliberately makes honest incompletion easy to represent.

A system that makes “completed” the only convenient outcome teaches agents and humans to hide uncertainty.

### Review remains separate from execution

The mandate requires an explicit `delegate_may_self_approve: false`.

A delegate may perform self-checks. Those checks can be useful. They are not the same thing as independent approval.

### Revocation does not erase history

A revoked mandate should stop future authority.

It should not delete the record of prior authority or prior action. Erasing the receipt would make incident reconstruction harder precisely when it matters most.

---

## 4. Failure semantics

The action receipt uses six states.

**`in_progress`** — action has begun; the record may be updated or followed by another receipt.

**`completed`** — the claimed task or action completed and independent evidence supports that claim.

**`partial`** — useful state changed, but the intended action did not fully complete.

**`blocked`** — the delegate stopped because an authoritative boundary, missing prerequisite, conflict, or external dependency prevented legitimate continuation.

**`failed`** — execution was attempted but did not produce the intended state.

**`rolled_back`** — a prior state change was reversed; the receipt must mark reversal as executed.

These states are information.

They should not be collapsed into success/failure theater for dashboards.

---

## 5. The trust boundary

Delegated systems operate in environments full of text that looks like instruction.

That includes:

- emails;
- webpages;
- documents;
- support tickets;
- code comments;
- issue descriptions;
- API payloads;
- tool output;
- messages from other agents.

The protocol treats those as **environmental inputs** unless a trusted authority channel says otherwise.

This matters for prompt injection and for ordinary institutional confusion.

The delegate should be able to distinguish:

> “The supplier says to change the bank account.”

from:

> “The principal has granted authority to change the bank account.”

Those are radically different facts.

The same applies to another agent. A sub-agent's confidence does not enlarge the parent mandate.

---

## 6. IDs and provenance

Use stable identifiers when consequences matter.

A mandate might be:

```text
procurement/facilities/q3-restock-0042
```

An action might be:

```text
vendor/acme/order-881042
```

A receipt may point to the mandate and to a previous receipt.

Sub-mandates should point to their parent mandate.

The purpose is not globally unique bureaucracy for every trivial action. It is reconstructability where responsibility crosses time, systems, or organizational boundaries.

### Versioning

The schemas are versioned in their `schema_version` fields.

Breaking semantic changes should receive a new version rather than silently changing the meaning of existing records.

A parser accepting `delegation-mandate/0.1` or `proof-carrying-action/0.1` should not be forced to guess whether yesterday's `completed` means something different today.

---

## 7. What the schemas cannot prove

A valid mandate cannot prove:

- the principal has legitimate authority;
- the objective is wise;
- the delegate understands the task;
- the action is legal;
- a credential is securely implemented;
- the delegate has no hidden objective.

A valid action receipt cannot prove:

- every relevant side effect was recorded;
- an external system is honest;
- an independent receipt is sufficient evidence;
- the action was desirable;
- the delegate is telling the whole story.

Structure creates handles for verification.

It does not replace verification.

The protocol should therefore be treated as **governance plumbing**, not a truth machine.

---

## 8. Two Desk examples, with provenance intact

The repository contains two examples that illuminate different parts of the protocol.

[`examples/desk-book-review.mandate.json`](examples/desk-book-review.mandate.json) is an **illustrative prospective mandate**. It shows what bounded authority could look like before a Desk book-review task begins.

[`examples/pr-103.schema-companion.receipt.json`](examples/pr-103.schema-companion.receipt.json) records a **real repository transaction**: PR #103, which added the first Delegation Mandate schema companion and was squash-merged as commit `a9ed89ed0ea196544da36a0e23de08a6f85f5339`.

PR #103 did not have a machine-readable mandate issued before execution. The receipt says so. Its `mandate_id` is explicitly retrospective and points back to the human instruction and repository-policy context rather than inventing a control artifact after the fact.

That gap is useful evidence too.

The receipt also separates:

- independent GitHub evidence of the PR/merge; and
- a local schema-validation result that is useful evidence but explicitly **not** independent of the delegate.

Not all evidence has the same provenance, and not every historical action will already have every protocol artifact. A migration path should expose missing provenance rather than fabricate it.

---

## 9. Implementation pattern

A practical agent runtime can use the protocol without adopting every field on day one.

A minimal pattern is:

```text
receive mandate
    ↓
validate structure
    ↓
resolve authority from trusted control plane
    ↓
execute bounded action
    ↓
capture external receipts
    ↓
emit action receipt
    ↓
independent review when triggered
    ↓
revoke / renew authority
```

Keep the **control plane** for authority separate from the **data plane** where untrusted task content appears.

Keep the **evidence plane** capable of disagreeing with the delegate.

That separation is more valuable than any particular serialization format.

---

## 10. The protocol rule

When the implementation gets complicated, return to the field rule from the book:

> **The principal should not need to watch every action, but should retain the ability to understand the mandate, bound the authority, verify the consequence, challenge the result, and take the key back.**

The mandate makes the authority legible.

The receipt makes the consequence legible.

Review and revocation keep the relationship from becoming permanent merely because it became convenient.
