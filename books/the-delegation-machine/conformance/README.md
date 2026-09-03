# Delegation Protocol Conformance Corpus

This directory is a small positive/negative test corpus for the experimental machine-readable companions to *The Delegation Machine*.

It exists for a simple reason: a schema is easier to understand when readers can see both **what should pass** and **what must fail**.

The corpus covers two schemas:

- [`../delegation-mandate.schema.json`](../delegation-mandate.schema.json)
- [`../proof-carrying-action.schema.json`](../proof-carrying-action.schema.json)

`manifest.json` lists every case, the schema it targets, whether validation is expected to succeed, and the reason the case exists.

## What the negative cases teach

`completed-self-report-only.receipt.json` is invalid because a delegate cannot establish `completed` solely by asserting completion. The receipt schema requires independent evidence.

`rollback-not-executed.receipt.json` is invalid because claiming `rolled_back` while reversal remains merely available confuses intention with consequence.

`self-approval.mandate.json` is invalid because the delegate cannot be the final independent approver of its own delegated work.

`subdelegation-expands-scope.mandate.json` is invalid because a child delegation cannot manufacture authority the parent did not have or did not transfer.

## What the positive blocked case teaches

`valid/blocked-authority-boundary.receipt.json` is intentionally uneventful.

The delegate reaches an authority boundary, makes no state change, records the policy-engine denial, and returns `blocked`.

That is successful protocol behavior.

The corpus treats **stopping correctly** as evidence of competence rather than as a failed attempt to look autonomous.

## Validation

These are JSON Schema Draft 2020-12 documents. Any conforming validator can run the corpus by reading `manifest.json` and checking whether actual validity matches `expect_valid`.

This is an experimental Bookself implementation artifact, not an external conformance standard or security certification.
