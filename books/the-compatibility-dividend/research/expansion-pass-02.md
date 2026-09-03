# Expansion pass 02 — evidence notes

This file continues the post-merge depth pass for *The Compatibility Dividend*.

## Chapter 4 — Noon Had to Agree

### Future of UTC and leap seconds

- The 27th General Conference on Weights and Measures adopted Resolution 4 in November 2022 on the use and future development of UTC.
- The resolution notes that leap-second discontinuities can cause serious malfunctions in critical digital infrastructure and that operators had developed different, uncoordinated ways of introducing leap seconds.
- It decided that the permitted maximum value of UT1−UTC should be increased in, or before, 2035, with the intention of making UTC effectively continuous for at least a long future interval.
- Sources:
  - BIPM, **Resolution 4 of the 27th CGPM (2022): On the use and future development of UTC**: https://www.bipm.org/en/cgpm-2022/resolution-4
  - NIST, **Leap Seconds**: https://www.nist.gov/pml/time-and-frequency-division/time-realization/leap-seconds
- Use: supports the chapter's claim that mature standards governance sometimes chooses which relationship should absorb an unavoidable mismatch, and that widespread workarounds can become evidence that the official seam needs revision.
- Caution: leap seconds have not simply been “abolished already.” The 2022 decision sets a future change in, or before, 2035; release-time wording must match the then-current implementation plan.

### Federated realization of UTC

- BIPM computes UTC from data supplied by national metrology laboratories, while national institutes realize and disseminate local versions such as UTC(NIST) that are traceable to the international reference.
- Sources:
  - BIPM Time Department, **UTC**: https://www.bipm.org/en/time-ftp/utc
  - NIST, **How NIST-F1 and atomic clocks work / UTC(NIST) time realization materials**: https://www.nist.gov/pml/time-and-frequency-division/time-realization
- Use: supports the chapter's analogy that a global standard can be federated through traceability rather than requiring one global issuer or machine.

## Chapter 5 — The Gauge War

### Rail Baltica and coexistence of 1435 mm / 1520 mm networks

- Rail Baltica is constructing a new 1435 mm European-standard-gauge corridor through Estonia, Latvia and Lithuania toward Poland while the existing 1520 mm Baltic rail networks remain in operation.
- European Commission and Rail Baltica materials explicitly describe the new corridor as integration with the European rail network rather than a simple overnight conversion of the entire legacy system.
- Sources:
  - Rail Baltica, **About Rail Baltica / technical parameters**: https://www.railbaltica.org/about-rail-baltica/
  - European Commission, **Rail transport in Latvia**: https://transport.ec.europa.eu/transport-modes/rail/ertms/who-involved-ertms/ertms-deployment-country/latvia_en
  - European Commission ERTMS country materials for Lithuania and Estonia: https://transport.ec.europa.eu/transport-modes/rail/ertms/who-involved-ertms/ertms-deployment-country_en
- Use: supports the chapter's claim that standards migrations can create a new compatibility zone while legacy networks continue, making gateways and coexistence part of the intended architecture.
- Caution: do not describe Rail Baltica as replacing every 1520 mm line in the Baltic states.

### Gauge interfaces and dual-running engineering

- Rail Baltica technical planning has considered interfaces between 1435 mm and 1520 mm infrastructure, including freight terminals, crossings, gauge-change arrangements and locations where dual-gauge/gauntlet-style solutions may be relevant.
- Source: Rail Baltica procurement and technical-study materials available through the project's technical documentation and tender archive: https://www.railbaltica.org/procurements/
- Use: supports the chapter's argument that a standards transition can simultaneously be a convergence strategy and a gateway strategy.
- Caution: individual engineering solutions vary by location and design stage; avoid implying every interface will use the same mechanism.

## Chapter 9 — The Protocol That Refused to Own the Network

### IPv6 as a long protocol transition

- RFC 6540 states that IPv6 support should no longer be considered optional for new IP-capable implementations and recommends dual-stack coexistence during transition while saying implementations should not require IPv4 for proper operation.
- RFC 8200 is the modern Internet Standard specification for IPv6.
- RFC 8170 discusses protocol transitions and uses real transition experience, including IPv6, to argue that protocols should be designed with later adoption and replacement in mind.
- Sources:
  - IETF, **RFC 6540 — IPv6 Support Required for All IP-Capable Nodes**: https://www.rfc-editor.org/rfc/rfc6540.html
  - IETF, **RFC 8200 — Internet Protocol, Version 6 (IPv6) Specification**: https://www.rfc-editor.org/rfc/rfc8200.html
  - IAB, **RFC 8170 — Planning for Protocol Adoption and Subsequent Transitions**: https://www.rfc-editor.org/rfc/rfc8170.html
  - IETF, **RFC 6180 — Guidelines for Using IPv6 Transition Mechanisms during IPv6 Deployment**: https://www.rfc-editor.org/rfc/rfc6180.html
- Use: supports the chapter's counterpoint that even a deliberately layered narrow waist can become difficult to replace after global adoption.
- Caution: IPv6 adoption is substantial but uneven; do not describe the transition as complete or failed.

### NAT and transition workarounds

- NAT and related address-sharing mechanisms extended the practical life of IPv4 and changed end-to-end assumptions, while dual-stack, tunneling and translation mechanisms enabled coexistence.
- Source: IETF, **RFC 5902 — IAB Thoughts on IPv6 Network Address Translation**: https://www.rfc-editor.org/rfc/rfc5902.html
- Use: supports the migration paradox: a successful gateway can reduce the urgency of replacing the legacy system and itself become part of the installed architecture.
- Caution: do not flatten NAT into a purely negative technology; it provided real operational value under IPv4 address scarcity.

## Chapter 13 — Rough Consensus, Running Code

### QUIC as implementation-driven standardization

- The IETF QUIC working group began with substantial implementation and deployment experience from pre-standardization QUIC work, then developed an open protocol through drafts and multiple independent implementations.
- IETF accounts of the standardization process describe more than twenty implementations participating in interoperability work as the protocol matured.
- Sources:
  - IETF, **QUIC is now RFC 9000**, 27 May 2021: https://www.ietf.org/blog/quic-internet-standard/
  - IETF QUIC Working Group charter/history: https://datatracker.ietf.org/wg/quic/about/
- Use: supports the chapter's distinction between running code as evidence and an early implementation as sovereignty.

### Automated interoperability testing

- IETF material on QuicInteropRunner describes automated cross-implementation testing across network scenarios, making interoperability repeatable rather than limited to occasional manual plugfests.
- Source: IETF, **Automating QUIC Interoperability Testing**, 2020: https://www.ietf.org/blog/automating-quic-interoperability-testing/
- Use: supports the claim that implementation work can expose both implementation defects and underspecified or problematic parts of the specification itself.

### Version-independent invariants and compatible version negotiation

- RFC 8999 defines version-independent properties of QUIC.
- RFC 9368 specifies compatible version negotiation for QUIC.
- Sources:
  - IETF, **RFC 8999 — Version-Independent Properties of QUIC**: https://www.rfc-editor.org/rfc/rfc8999.html
  - IETF, **RFC 9368 — Compatible Version Negotiation for QUIC**: https://www.rfc-editor.org/rfc/rfc9368.html
- Use: supports the chapter's argument that infrastructure needs an explicit story about version two: which invariants survive, how capabilities are negotiated, and how evolution avoids unnecessary breakage.

## Chapter 14 — When Standards Freeze

### Deprecating TLS 1.0 and TLS 1.1

- RFC 8996, published in March 2021 as BCP 195, formally deprecated TLS 1.0 and TLS 1.1 and moved their defining RFCs to Historic status.
- The RFC notes that TLS 1.2 had superseded TLS 1.0/1.1 years earlier, but surviving systems still existed that could not negotiate newer versions.
- Its operational discussion explicitly recognizes the trade: following the deprecation can break interoperability with those old systems, while retaining obsolete versions incurs security and maintenance risk.
- Source: IETF / RFC Editor, **RFC 8996 — Deprecating TLS 1.0 and TLS 1.1**: https://www.rfc-editor.org/rfc/rfc8996.html
- Use: supports the chapter's claim that mature infrastructure sometimes has to coordinate on *ending* compatibility, not merely creating it.
- Caution: do not imply the RFC remotely disabled TLS 1.0/1.1 everywhere; actual retirement depended on implementations, operators, vendors and policy.

### Cryptographic agility

- NIST defines cryptographic agility as the capability to replace and adapt cryptographic algorithms across protocols, applications, software, hardware, firmware and infrastructure while maintaining security and ongoing operations.
- NIST published final Cybersecurity White Paper 39, **Considerations for Achieving Crypto Agility: Strategies and Practices**, on 19 December 2025, motivated in part by the operational difficulty of the post-quantum migration.
- Sources:
  - NIST, **Crypto Agility** project overview: https://csrc.nist.gov/Projects/crypto-agility
  - NIST, **NIST Publishes CSWP 39: Considerations for Achieving Crypto Agility**, 19 December 2025: https://www.nist.gov/news-events/news/2025/12/nist-publishes-cswp-39-considerations-achieving-crypto-agility
- Use: supports the chapter's argument that capacity to migrate should itself be treated as a system property rather than an improvised emergency response.
- Caution: crypto agility is environment-specific; do not turn it into a claim that every algorithm should be dynamically negotiable or that more negotiation is always safer.

## Chapter 16 — The Machine Customer

### Universal Commerce Protocol

- Google announced the Universal Commerce Protocol (UCP) in January 2026 as an open-source standard for agentic commerce, with common commerce primitives connecting consumer surfaces, businesses and payment providers.
- Google's description explicitly says UCP is designed to work with existing retail infrastructure and can integrate through APIs, A2A and MCP; it is also compatible with AP2 for payment support.
- Source: Google Developers Blog, **Under the Hood: Universal Commerce Protocol (UCP)**, 11 January 2026: https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/
- Use: supports the chapter's claim that commerce standards are emerging as composable seams rather than one monolithic agent protocol.
- Caution: this is a sponsor description of a young protocol and partner ecosystem, not proof of broad market adoption or eventual standard dominance.

### Agent Payments Protocol

- AP2 is an open agent-payment protocol with roles and verification responsibilities for agent-performed payments.
- The current specification separates Checkout Mandates and Receipts from linked Payment Mandates and Receipts, explicitly designing the artifacts to serve as evidence in disputes.
- Sources:
  - Google Cloud, **Powering AI commerce with the new Agent Payments Protocol (AP2)**, 16 September 2025: https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
  - AP2 repository/specification: https://github.com/google-agentic-commerce/AP2/blob/main/docs/ap2/specification.md
- Use: supports the chapter's distinction between commercial commitment and the payment action that funds it.
- Caution: AP2 remains versioned and developing; record the exact version used for any release claim.

### HTTP 402 machine-payment protocols

- Cloudflare's 2026 Agents documentation supports agentic payments through x402 and Machine Payments Protocol (MPP), both using HTTP `402 Payment Required` flows in which a server issues a payment challenge and a client fulfills it programmatically before retrying the request.
- x402 supports paid HTTP resources and MCP tools; Cloudflare's docs describe payment requirements, signatures and settlement receipts.
- MPP supports multiple payment methods, including card and stablecoin flows, and Cloudflare describes it as backwards-compatible with x402 services.
- Sources:
  - Cloudflare, **Agentic Payments**, updated 5 August 2026: https://developers.cloudflare.com/agents/tools/payments/
  - Cloudflare, **x402**, updated 3 June 2026: https://developers.cloudflare.com/agents/tools/payments/x402/
- Use: supports the chapter's claim that a machine-native market may move payment into ordinary request-response semantics rather than reproduce human account and checkout flows.
- Caution: x402/MPP are young protocols. Their coexistence is evidence of experimentation, not proof that the ecosystem has converged.

### Payment networks and agent recognition

- Visa announced a card specification and SDK for MPP in March 2026 and separately documents a Trusted Agent Protocol intended to let merchants cryptographically recognize approved agents with commerce intent.
- Mastercard's Agent Pay materials emphasize registered agents, network tokens and verifiable intent for agentic transactions.
- Sources:
  - Visa, **Visa introduces card specification and SDK for Machine Payments Protocol**, 18 March 2026: https://corporate.visa.com/en/sites/visa-perspectives/innovation/visa-card-specification-sdk-for-machine-payments-protocol.html
  - Visa Developer, **Trusted Agent Protocol**: https://developer.visa.com/capabilities/trusted-agent-protocol/docs-getting-started
  - Mastercard, **Agent Pay**: https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html
- Use: supports the chapter's distinction among recognizing an agent, establishing intent, authorizing an action and settling value.
- Caution: company protocol and product claims should be treated as primary descriptions of those systems, not independent evidence of market scale, fraud reduction or consumer benefit.

## Release check

Re-check current NIST cryptographic-transition guidance and all rapidly evolving agent-commerce protocol versions immediately before Shelf release. RFC and historical CGPM evidence is stable; living standards, transition plans and implementation guidance can move.
