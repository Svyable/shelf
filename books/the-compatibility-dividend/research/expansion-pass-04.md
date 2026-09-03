# Expansion pass 04 — exit, migration, and substitutability

This pass adds Chapter 21, **The Right to Exit**, as the final synthesis chapter.

## Purpose

The chapter develops a final implication of the compatibility thesis: interoperability is economically important not only because it lets independent systems connect, but because it can preserve a credible path to substitute implementations, migrate accumulated relationships, revoke authority, and retire obsolete infrastructure.

The chapter deliberately distinguishes portability of user-controlled state from forced portability of implementation-specific value. It does not claim that all data, reputation, model state, credentials, or proprietary capabilities should be transferable.

## Evidence base

The chapter relies primarily on evidence already developed and sourced elsewhere in the book:

- UK Open Banking for consented access to account information and payment initiation through standardized interfaces;
- the EU Digital Markets Act for interoperability and contestability as competition-policy tools;
- OAuth and modern authorization guidance for re-authorization, scoped authority, audience restriction, expiry, and revocation rather than indiscriminate copying of bearer secrets;
- TLS 1.0/1.1 deprecation and cryptographic agility for coordinated retirement of obsolete standards;
- IPv4/IPv6 coexistence for the difficulty of protocol migration and the way transition mechanisms can themselves become long-lived infrastructure;
- Rail Baltica for staged physical migration and coexistence between compatibility zones;
- open document/protocol traditions and the IETF standards process for the value of multiple independent interoperable implementations.

Two primary Internet-standards sources are especially relevant to the chapter's substitutability claim:

- IETF, **RFC 2026 — The Internet Standards Process — Revision 3**: https://www.rfc-editor.org/rfc/rfc2026.html. RFC 2026 describes an Internet Standard as stable, well understood, useful, and supported by multiple independent interoperable implementations and operational experience.
- IETF, **RFC 6852 — Affirmation of the Modern Paradigm for Standards**: https://www.rfc-editor.org/rfc/rfc6852.html. The document emphasizes interoperability, global competition, open participation, availability for implementation, and voluntary adoption.

## Claims to keep narrow

- A credible exit path can improve bargaining power and resilience even when users rarely exercise it; this is an economic interpretation, not a measured universal effect size.
- Portability should preserve user-controlled relationships where practical, not require every implementation to reveal proprietary internals.
- Migrating authorization should generally preserve policy and consent while allowing resource providers to issue fresh credentials; copying long-lived secrets is explicitly rejected as a general portability strategy.
- Compatibility mechanisms can delay migration as well as enable it. The chapter treats this as a governance tradeoff rather than assuming adapters and dual-running always speed convergence.
- Standards can reduce artificial captivity but cannot eliminate legitimate migration costs arising from testing, retraining, regulation, data-model differences, or operational risk.

## Falsification posture

The chapter's argument would weaken if markets with highly portable interfaces consistently produced no meaningful improvement in substitution, resilience, entry, or bargaining power relative to comparable closed systems; or if relationship portability routinely destroyed more implementation diversity, security, or product value than it preserved.

The narrower claim remains that standards should be evaluated not only by whether new participants can connect, but by whether accumulated relationships can survive replacement of a particular participant without forcing the user to abandon the larger system.