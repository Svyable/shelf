# Standardizing Agency

The dangerous sentence in machine commerce is not “I understand.”

It is “I am authorized.”

A system can be perfectly intelligent about a request and entirely wrong about whether it may act on it.

This distinction is familiar in human institutions because civilization has spent centuries separating capacity from authority. A child may understand a contract and lack capacity to bind a corporation. An employee may know how to initiate a wire transfer and lack permission to send one. A lawyer may act for a client within a retainer and not outside it. A corporate officer may bind a company in some matters while a contractor cannot. A doctor may possess professional competence but lack consent to perform a procedure on a particular patient.

Agency is intelligence wrapped in permission.

Autonomous software makes that wrapper technical infrastructure.

The early language of AI agents often blurred the distinction because many demonstrations operated in sandboxes. The agent could call tools because the developer had given it credentials. The interesting problem was whether the model could plan, browse, code or complete the task.

Production systems expose the harder question.

Whose credentials?

For which purpose?

Until when?

Against which resources?

With what spending limit?

May the agent delegate to another agent?

May that second agent delegate again?

Can the principal revoke the chain?

How does a remote merchant know the grant is genuine?

How does anyone prove what authority existed after a dispute?

These questions are not model questions.

They are standards questions.

Human law begins with the relationship between principal and agent. A principal authorizes another actor to act on the principal's behalf. The details vary by jurisdiction and context, but the general pattern is ancient because economic life requires people to act through other people.

Corporations cannot physically shake hands. Governments act through officials. property owners hire brokers. employers empower workers. investors appoint managers. patients authorize representatives.

Delegation is one of civilization's fundamental scaling technologies.

AI turns delegation into a software primitive.

The technical ecosystem already contains pieces.

OAuth 2.0 was designed to let a resource owner grant a client limited access to an HTTP service without giving the client the owner's primary credentials. A user can authorize an application to access a resource through tokens with defined scopes and lifetimes. The framework separates resource owner, client, authorization server and resource server so that permission does not have to be reduced to password sharing.

That separation is exactly the kind of institutional abstraction agents need.

OAuth's history also warns us that authorization is not a one-time design problem. Deployment experience revealed attacks and unsafe patterns. RFC 9700, published in 2025 as Best Current Practice, updates OAuth 2.0 security guidance and deprecates modes no longer considered safe. Mature authorization standards evolve because adversaries participate in the ecosystem too.

MCP's authorization design has increasingly built on the OAuth family rather than inventing a model-specific credential system from scratch. Recent MCP revisions have hardened issuer validation, resource targeting and client identification as implementations encountered real integration problems.

This is standards composability working correctly.

A protocol for model-tool interaction should reuse a mature authorization layer where possible instead of pretending AI has repealed decades of access-control lessons.

But ordinary API authorization is only the beginning of machine agency.

Traditional OAuth scopes often describe relatively static permissions: read photos, access calendar, post content. An autonomous agent receives goals whose permissions may depend on context.

“Plan my trip” is not a scope.

The principal might mean: search freely, reserve refundable hotels up to $900 total, do not purchase flights without approval, never use points, avoid overnight connections, share my passport information only with the airline actually ticketing me, and stop if the trip price exceeds $2,000.

The human instruction contains a policy.

The external services expose operations.

Some layer has to translate between them.

It would be dangerous to ask every airline and hotel to interpret the user's original natural language independently. The parties could disagree. A malicious merchant could choose the interpretation most favorable to itself. The instruction might contain personal context irrelevant to the merchant.

The principal's agent therefore needs to reduce intent into bounded grants at each interface.

This suggests a hierarchy of authority.

At the top is the principal's policy: broad goals, preferences and prohibitions.

Below it are delegated task authorities: book lodging within these dates and limits, obtain three quotes, renew this subscription only below this price.

Below those are resource-specific capabilities or tokens: this service may charge up to this amount; this calendar endpoint may create one event; this cloud tool may modify these files but not deploy to production.

The lower the grant moves toward execution, the more precise it should become.

Standards can help every layer except the first become machine-verifiable.

Natural language may remain the best way for humans to express intent. It is flexible and rich. But execution interfaces should receive structured authority derived from the intent.

This is not because natural language is defective.

It is because authority must survive adversarial interpretation.

A contract written in prose still depends on defined parties, signatures, dates and legal doctrines. Human law surrounds language with institutions because words alone cannot carry all enforcement semantics.

Agents need their own institutional wrapper.

Identity is one component, but identity is regularly asked to do too much.

An identifier tells a recipient which entity a claim concerns.

Authentication provides evidence that the current actor controls credentials associated with an identity.

Authorization answers whether that actor may perform a particular action.

Delegation explains how that authorization derived from another principal.

Credentialing supplies claims about attributes or roles.

Provenance records where claims and outputs came from.

Audit records what actions occurred.

Liability determines who bears consequences when things go wrong.

These are different problems.

A system that solves identity and declares agency solved is like issuing passports and declaring contract law solved.

W3C's Verifiable Credentials work demonstrates useful separation. The 2.0 Recommendation defines an extensible model in which issuers make claims, holders possess credentials and verifiers evaluate presentations. The standard provides mechanisms for machine-verifiable integrity and status without claiming that every verifier must trust every issuer.

That is the right restraint.

A credential can say that a government agency asserts a company is registered. It can say that a licensing board asserts a person holds a professional license. It can say that an employer asserts an agent is associated with a role.

None of those facts alone grants permission for a particular transaction.

A physician's medical license does not authorize access to every patient's record.

A company's incorporation does not authorize every employee to sign on its behalf.

A model vendor's certificate does not authorize its agent to spend a user's money.

Authority must connect identity to action.

The machine economy will likely need standardized delegation chains.

Imagine a company authorizes its procurement agent to purchase office supplies up to $50,000 per month from approved vendors. The procurement agent asks a specialist agent to compare printers. The specialist asks a logistics agent to estimate delivery. Only the procurement agent should possess purchasing authority. The other agents need limited access to product and shipping information.

If every sub-agent inherits the original credential, the system violates least privilege.

If no authority can be delegated, modular agent systems become cumbersome because every tool must be called directly by the principal agent.

Safe delegation needs attenuation.

A delegated agent should generally receive equal or narrower authority, not broader authority, unless an explicit higher-level principal grants it.

This concept appears in capability-based security systems, where possession of a capability conveys authority over a resource and delegation can be designed so rights are limited. It also appears in authorization policy systems and token exchanges.

The agent economy needs the principle to become portable.

A merchant should be able to inspect a grant and determine not only that an agent presents a valid token but that the token applies to this merchant, this action, this amount and this time.

Audience restriction matters.

A credential intended for one service should not automatically work at another. Bearer tokens that can be replayed broadly create obvious theft risks. Modern OAuth security guidance increasingly emphasizes sender constraints, issuer validation, resource indicators and other techniques that narrow where tokens are useful.

The standards lesson is simple: authority should have an address.

It should also have a clock.

Long-lived delegation is convenient and dangerous. A calendar assistant that retains permanent write access can continue acting after the user's relationship with the provider changes. An agent compromised months later may still possess permissions granted for a forgotten task.

Expiry converts forgotten authority into finite risk.

Task-specific grants should often be short lived.

Standing policies may persist, but the execution credentials derived from them can be renewed when needed.

This resembles payment-card authorization, signed URLs, temporary cloud credentials and many existing security mechanisms.

The agent does not need permanent sovereignty to perform temporary work.

Revocation is the harder mirror image.

A principal may need to stop an agent before expiry.

That sounds easy until delegation chains cross services and offline systems. If a credential is copied to multiple counterparties, how do they learn it has been revoked? If a sub-agent received a derived authority, does revoking the parent invalidate the child? What if the remote service is temporarily disconnected? What if an irreversible action already occurred?

Revocation is a distributed-systems problem with legal consequences.

Standards can define status mechanisms and checking expectations, but the underlying tradeoff remains between speed, availability, privacy and certainty.

A system that checks a central authority before every small action creates a reliable revocation point and a surveillance point. A system that allows offline verification preserves autonomy and cannot guarantee instant revocation.

There is no universally correct architecture.

Different risks need different profiles.

A library card can tolerate delayed revocation.

A corporate treasury credential cannot.

This is why agent standards should resist universal permission semantics and support risk-specific policies.

Money makes delegation vivid.

A human tells an assistant, “Buy the best option under $500.” The instruction combines selection authority and spending authority.

Those should probably separate.

The agent can decide which option is best under a policy. The payment system can enforce that the resulting transaction does not exceed $500 and goes to an eligible merchant.

Policy chooses.

Capability constrains.

Enforcement happens as close as possible to the resource that bears the consequence.

This is stronger than relying on the model to remember the budget.

Models should obey instructions. Financial systems should not assume perfect obedience.

This distinction is fundamental to safe autonomy.

Safety should not depend entirely on cognition.

A good agent architecture treats the model as a powerful planner inside a system of mechanical constraints: permission scopes, spending limits, allowlists, rate limits, approval thresholds, sandboxing, rollback and audit.

Humans do this with organizations. We do not merely tell employees to be responsible. Companies use signatures, dual approval, budget codes, bank limits, separation of duties and audits.

Institutional controls assume intelligent people can make mistakes or abuse authority.

AI deserves no more magical trust than an employee.

This is where standards can make autonomy interoperable.

A company may have excellent internal policy controls, but a remote counterparty cannot rely on them unless some external representation exists.

The counterparty needs to know the agent's authority without learning the company's entire internal governance system.

A machine-readable authorization credential can act like a letter of agency.

It can say enough: principal, delegate, allowed action, target, conditions, expiry, delegation rights and verification method.

The precise format remains an open design problem. Existing authorization, credential and capability systems offer pieces. The important point is architectural: authority should be explicit at the seam.

Otherwise counterparties will infer it from identity, possession of a session cookie or the fact that the agent seems confident.

Confidence is not a permission bit.

The same applies to human approval.

“Human in the loop” is often treated as a universal safety answer. But approval itself needs semantics.

What exactly did the person approve?

The plan?

The final amount?

The merchant?

The use of a credential?

All future similar transactions?

If the agent changes the plan after approval, does approval survive?

A vague approve button can provide emotional reassurance and little formal constraint.

Standards can bind approval to a specific proposed action or policy version.

A cryptographic digest of transaction terms is one possible mechanism. The human sees an understandable rendering; the system records which exact structured object was approved. If material terms change, approval no longer matches.

This is the machine equivalent of signing the contract you actually read.

It also creates an interface-design responsibility: the human rendering must accurately summarize the machine object.

A perfectly signed malicious contract is still malicious.

Standards cannot remove deception. They can preserve the relationship between what was presented and what was executed.

Delegation becomes more difficult when agents negotiate.

Suppose a buyer agent tells a seller agent it may purchase up to 1,000 units if the price falls below a threshold. Should the seller be allowed to learn the buyer's maximum budget? Probably not. The authorization system should prove that a final transaction falls within policy without disclosing all negotiating limits.

This creates demand for privacy-preserving authorization.

A credential or proof might demonstrate that the agent is permitted to execute a particular transaction without revealing the full policy behind that permission.

Selective disclosure techniques in credential systems point toward this design space. Cryptographic methods may eventually allow richer proofs about limits and qualifications.

But cryptography does not decide what information the market should reveal.

That remains policy.

A standard can make privacy-preserving options composable.

It should not force every transaction into maximum disclosure because that is easiest for implementers.

The same issue appears in age verification. A merchant may need to know that a buyer meets an age threshold, not the buyer's exact birth date and complete identity. A credential system capable of revealing only the necessary property better matches the purpose.

Least privilege has a data version: least disclosure.

Agents will be tempted to over-share because context improves performance. A shopping agent knows the user's address, income, preferences, health information, schedule and family relationships. A merchant needs almost none of that to sell a toaster.

Standards should make it easy to carry narrow claims instead of entire profiles.

The principal's agent can know more than the counterparty's agent.

That asymmetry is a privacy feature.

Audit must be similarly scoped.

An accountability system does not need every hidden chain of thought. It needs records sufficient to establish externally relevant decisions and actions.

For a purchase, that might include the original task identifier, policy version, authority grant, merchant identity, offer, final terms, approval event if any, payment reference, shipping commitment and subsequent modifications.

This is a transaction trace.

If standardized, traces from different agent vendors could be compared by auditors, insurers and courts.

The value could be enormous.

Today many automated systems produce vendor-specific logs that become difficult to reconstruct after incidents. A portable audit envelope would let organizations change agent providers without losing accountability practices.

It could also create surveillance risks if every action were centralized or exposed unnecessarily.

Again, layering helps. The format can be standard while storage and access remain local or governed by domain policy.

Provenance has a similar distinction.

A standard can say how a claim identifies its source.

It does not require every source to be published to everyone.

Selective disclosure and controlled audit access can preserve accountability without making private reasoning public.

Liability is where technical standards reach their limit.

No protocol can universally determine who pays when an agent makes a harmful choice. Liability depends on contracts, negligence rules, consumer law, employment relationships, product regulation and jurisdiction.

But standards can improve the evidence liability systems receive.

Who was the principal?

Which agent acted?

Which version of its software was in use?

What authority existed?

Which external claims did it rely on?

What terms were accepted?

Which party could have prevented the action?

Without shared records, disputes become contests of proprietary logs.

Standards can make responsibility legible without deciding responsibility.

This is an important boundary.

The agent protocol should not become a global court.

It should produce facts courts, insurers, businesses and users can interpret.

Insurance may become one of the strongest pressures toward standardization.

Insurers dislike risks they cannot classify or audit. If autonomous agents begin making material commercial decisions, insurers may demand evidence of permission controls, incident logs, model governance and transaction limits before underwriting losses.

A common audit and authorization standard could reduce the cost of proving those controls.

The insurance market would then reward compatibility with accountability infrastructure.

This is how standards often spread: not because everyone loves the specification, but because an important adjacent institution starts requiring it.

Banks did this with security standards. governments do it through procurement. retailers do it with supply-chain identifiers. cloud customers do it with compliance frameworks.

The agent economy may be standardized partly by whoever bears the loss.

That is a sobering thought and a useful one.

The parties who pay for mistakes have incentives to demand machine-readable controls before trusting autonomous action.

This could produce better safety than standards driven only by vendors trying to maximize adoption.

It could also produce conservative requirements that favor large firms.

The familiar politics return.

Standards never remove incentives. They provide a place where incentives become technical requirements.

The key design principle is to keep agency separable from intelligence.

A company should be able to replace one model with another without renegotiating every merchant relationship if the new agent can present the same valid authority. A user should be able to choose a different assistant without recreating every policy from scratch. A merchant should not need to trust a specific AI vendor merely to verify that the buyer's principal authorized a purchase.

This is the compatibility dividend applied to delegation.

Shared authority semantics create a market for intelligence above them.

Agents compete on judgment.

The permission layer remains portable.

That is the architecture a healthy machine economy should want.

The alternative is a world where identity, intelligence, payments and permission are fused into proprietary stacks. Such systems may be convenient. They will also be difficult to leave. A user who changes assistants may lose not only preferences but the ability to act across institutions.

The assistant becomes a bank account, passport, wallet, employee badge and operating system at once.

That is too much constitutional power for an application.

Standards can separate the roles.

Identity can belong to the principal.

Credentials can come from plural issuers.

Authorization can be issued for particular resources.

Agents can be replaceable delegates.

Payment can settle through multiple rails.

Audit can remain portable.

No single layer needs to own the person.

The deepest purpose of standardizing agency is therefore not making agents talk to one another.

It is making them governable by people and institutions that do not share the same software.

Civilization has never required every agent to think alike.

It has required agents to know the limits of what they may do in someone else's name.
