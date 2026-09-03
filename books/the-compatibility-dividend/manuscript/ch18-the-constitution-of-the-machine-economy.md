# The Constitution of the Machine Economy

A constitution is a standard for power.

It defines roles, procedures and limits before a particular dispute arrives. It does not predict every action citizens or institutions will take. It establishes enough common structure that disagreement can occur without requiring the whole political system to be invented again each morning.

The machine economy will need something constitution-like for the same reason.

Not one document.

Not one company.

Not one protocol pretending to contain law, identity, commerce and ethics.

A stack of durable agreements about how autonomous systems acquire authority, discover counterparties, make commitments, move value, preserve evidence and submit to revocation or dispute.

That stack will determine whether agentic computing becomes a market of replaceable tools or a collection of proprietary empires.

The difference will be decided at interfaces that still look small.

Consider the ordinary act of hiring a human contractor.

The contractor has an identity. The company verifies it to some level appropriate to the work. A contract describes duties. The worker receives accounts and permissions. Some systems require training or professional credentials. Payment terms exist. The company can terminate access. Work product is recorded. Disputes can be escalated. Insurance may allocate certain risks. Law supplies background rules the contract does not spell out.

No single artifact performs all these functions.

The arrangement works because institutions compose.

Autonomous agents need a comparable institutional stack.

The temptation is to build an all-in-one vendor platform that supplies model, identity, memory, permissions, tools, payment, logging and marketplace. Such systems will exist because integration is convenient. They may be excellent products.

They should not become the only constitutional form available.

A machine economy built entirely from vertically integrated agent platforms would resemble a world where every employer had to use the same bank, passport office, court, phone company and accounting system as its employees.

It could function.

It would centralize extraordinary power.

Standards offer another architecture: interoperable institutions.

The first constitutional layer is identity, but identity should remain plural.

Individuals, corporations, government agencies, devices and software services need stable enough identifiers that actions can be attributed. Different domains already use different systems: legal entity identifiers, domain names, employee directories, certificates, government IDs, account identifiers and decentralized identifiers among them.

There is no obvious reason one universal identifier should replace all of these.

Context matters.

A hospital needs a medically relevant identity. A bank needs a legally sufficient customer identity. A software service needs a cryptographic service identity. A conference may need only a pseudonymous attendee account.

The constitutional requirement is not one identifier.

It is the ability to bind relevant claims and authority to identifiers whose governance the relying party understands.

This is federation rather than unification.

Federation is one of civilization's most useful responses to scale. Independent jurisdictions or systems preserve internal authority while agreeing on rules for recognizing one another at boundaries.

Email is federated. The domain-name system is distributed through a hierarchy. International passports are issued nationally but recognized through shared conventions. Banking systems connect institutions that maintain separate internal ledgers. Container shipping joins carriers, ports and countries without creating a world ministry of freight.

The agent economy should prefer federation wherever the alternative is a universal gatekeeper.

Federation is harder because trust must cross boundaries.

A receiving system needs to know which foreign issuers it recognizes. policies conflict. revocation becomes distributed. user experience can be inconsistent. abuse can move between networks.

These are real costs.

Centralization solves many of them elegantly.

The constitutional question is which problems are worth solving centrally and which powers should remain contestable.

Naming is a good example.

A global namespace can be extremely valuable because collisions are expensive. The domain-name system provides globally coordinated names while allowing many registrars and registries to participate under broader governance. It is centralized in some functions and decentralized in others.

Agent identities may need similar layered governance.

A vendor-specific agent identifier can work locally. Cross-vendor commerce may need identifiers that remain meaningful outside the vendor. That could be built through web domains, organizational credentials, public-key identifiers or other mechanisms.

The important requirement is portability of reference.

A company should not become a different legal or commercial entity merely because it changes its agent provider.

The agent is the delegate, not the principal's soul.

The second constitutional layer is authorization.

We explored its technical components in the previous chapter. At system level, the goal is separation of powers.

The model that decides an action should not necessarily be the component that decides whether the action is allowed.

This mirrors mature institutions.

A trader may decide which security to buy while a risk system enforces position limits. A doctor chooses treatment while pharmacy systems check interactions and hospital policy constrains certain procedures. An employee proposes a purchase while finance enforces approval thresholds.

Decision and constraint are different functions.

AI systems should preserve that distinction.

An agent can propose a wire transfer. A policy engine can verify the amount, recipient, purpose and approval state. A bank can enforce its own authorization rules. The model's intelligence is useful in forming the action and irrelevant to whether the bank should honor an invalid token.

This gives the machine economy institutional defense in depth.

If the model is manipulated, the authorization layer still constrains consequences.

If the policy engine is wrong, the resource owner may still have limits.

If one service is compromised, audience restrictions can prevent stolen credentials from working elsewhere.

No layer is perfect.

The constitution assumes fallibility.

The third layer is discovery.

Markets need ways for buyers and sellers to find one another. Agent systems need ways to learn what other agents and tools can do. A2A's capability descriptions and MCP's tool discovery illustrate early versions.

Discovery should be competitive.

A single global directory of agents would be convenient and dangerous. It could rank, exclude, tax and surveil a large share of machine interaction. Multiple directories, search engines and registries should be able to index portable capability descriptions.

This is the web lesson again.

Addressing should not belong to the same institution as ranking.

A URL can exist whether one search engine likes the page or not. A merchant's machine-readable capability should similarly survive exclusion from one discovery provider.

This does not mean directories accept everyone. Trust directories can impose strict criteria. A medical-agent registry may require licensing credentials. A government procurement directory may require security attestations.

Plural directories allow plural trust policies.

The common standards let participants remain addressable across them.

The fourth layer is commitment.

Agent conversations need a point at which possibility becomes obligation.

This is the machine equivalent of offer, acceptance, order, signature and confirmation.

The precise legal doctrine varies across jurisdictions, but technical systems need a shared state model sufficient to avoid accidental commitments.

A quote should not be confused with a purchase.

A plan should not be confused with execution.

A pending authorization should not be confused with settlement.

A cancellation request should not be confused with completed cancellation.

These distinctions sound obvious because human commerce has language and rituals around them.

Machine interfaces can erase the ritual.

A tool call may move directly from text to consequence.

The constitution needs explicit state transitions.

Some can be standardized broadly: proposed, authorized, accepted, executed, failed, cancelled, reversed. Domains will add richer states.

The exact vocabulary matters less than the principle that commitments should be machine-legible and auditable.

The fifth layer is payment.

Money is already one of civilization's most standardized infrastructures. Currencies define units. banks use account identifiers and payment messages. card networks specify authorization and clearing. central banks and private networks operate settlement systems. fraud rules allocate losses.

Agents will sit above this infrastructure before they replace much of it.

The constitutional requirement is plural rails with common invocation semantics where useful.

An agent should be able to discover that a merchant accepts a bank payment, card credential or digital wallet without the agent itself becoming a bank. The payment layer should enforce spending authority independently of the model's intent.

This separation protects both sides.

The merchant receives evidence of payment through a recognized rail.

The buyer retains the protections and constraints associated with that rail.

A proprietary agent marketplace may prefer to internalize payment because controlling settlement creates data and fees. Standards can preserve alternatives.

The sixth layer is provenance and evidence.

When humans act slowly, memory and testimony can reconstruct events. When agents execute thousands of actions per hour, unstructured recollection is useless.

The system needs standardized receipts.

A receipt in this broader sense is not only proof that money moved. It is a compact record of a consequential state change.

Who requested the action?

Which principal was represented?

Which authority was presented?

Which terms were accepted?

Which resources changed?

Which external claims were relied on?

What version of the relevant standard governed the transaction?

Which system executed it?

When?

What was the result?

These records should be durable enough to survive replacement of the agent that created them.

Otherwise switching vendors destroys institutional memory.

Portable evidence is a form of user freedom.

It is also a form of market discipline because vendors know actions can be inspected outside their own dashboards.

The seventh layer is revocation and emergency stop.

Every constitution needs a way to end authority.

This is especially important for agents because software can continue acting while the principal is absent. A compromised or malfunctioning agent can move faster than human supervision.

Revocation must therefore propagate across delegation chains and critical counterparties quickly enough for the risk.

The system should distinguish stopping future authority from reversing past actions. Not every action is reversible.

A cancelled token cannot unship a package already dispatched.

A revoked trading mandate cannot undo a completed trade automatically.

This difference should be visible in interface design.

A healthy agent system includes reversible stages before irreversible ones where practical.

Quote before purchase.

Preview before deploy.

Stage before publish.

Authorize before settle.

This is not bureaucracy for its own sake.

It creates points where a principal or policy can intervene.

Reversibility is a constitutional check on speed.

The eighth layer is dispute resolution.

Protocol designers avoid this because it feels outside engineering.

It is outside engineering.

It is also unavoidable once systems make commitments.

Two agents may disagree about whether a service was delivered. A credential issuer may revoke a claim. A merchant may say the buyer's agent exceeded authority. A buyer may say the merchant changed terms after acceptance. A software defect may create duplicate transactions.

The technical standard cannot adjudicate every dispute.

It can preserve the evidence and identifiers required for human or institutional adjudication.

This is a crucial scope boundary.

Do not build a global court into the protocol.

Build the record courts need.

Some disputes can be automated through domain rules. Payment networks already automate chargeback processes. marketplaces resolve many routine claims through structured workflows. smart contracts can enforce certain deterministic conditions.

But the constitutional stack should retain escalation to human institutions for ambiguous cases.

Machine efficiency should not erase appeal.

Appeal is one of the ways institutions handle model error, data error and unforeseen circumstance.

An autonomous system with no appeal process is not merely automated.

It is brittle authority.

The ninth layer is liability and insurance.

Standards can define roles without deciding all legal responsibility. Still, stable roles help law attach responsibility.

If every agent ecosystem invents different terms for principal, operator, model provider, tool provider, credential issuer and executor, courts and insurers face a translation problem before reaching the facts.

Shared role vocabulary can reduce this friction.

Insurance may accelerate it because underwriters need categories.

An insurer can price a risk more effectively if the insured can demonstrate standardized controls: bounded authority, dual approval for high-risk actions, signed audit trails, tested revocation, independent identity verification, change management and incident reporting.

These controls may become machine-agency equivalents of building codes and electrical certifications.

Not every organization will implement them because a standards body asked politely.

They will implement them because customers, regulators and insurers make them conditions of participation.

The tenth layer is competition among constitutions.

This sounds destabilizing and is necessary.

Different sectors will develop different profiles. Healthcare cannot use the same delegation semantics as casual shopping. Defense systems cannot use the same discovery rules as public marketplaces. Consumer protections differ from enterprise contracts. Jurisdictions disagree.

The global machine economy should not have one policy.

It should have interoperable ways to describe which policy applies.

A protocol can carry a policy identifier, jurisdiction, credential profile or required assurance level. Gateways can translate where translation is safe. Networks can refuse interaction when requirements conflict.

Pluralism becomes explicit instead of accidental.

This is where standards can prevent a geopolitical split from becoming total technical fragmentation.

Countries may impose different AI regulations. Firms may follow different security frameworks. They can still exchange lower-level messages if the standards separate transport from policy and provide metadata about higher-level requirements.

The internet does this imperfectly with global transport under different national laws.

The agent economy will need a more explicit version because agents perform regulated acts rather than merely move information.

One country's licensed financial agent may not be authorized to serve customers elsewhere. The capability can be globally discoverable while execution remains jurisdictionally limited.

That is a feature.

Interoperability does not require universal permission.

It requires that permission boundaries be understandable.

The constitution must also preserve the right to be offline.

A fully agentic economy could make machine interfaces prerequisites for ordinary participation. Small businesses, older systems and individuals who prefer human interaction could be excluded.

Standards can worsen this if compliance becomes expensive.

A humane transition needs gateways between human and machine institutions.

A small merchant should be able to use a service provider that publishes machine-readable offers on its behalf rather than hire a standards team. A person should be able to review an agent-generated transaction in ordinary language. Human customer service should remain available for high-stakes disputes.

Compatibility should widen participation, not create a new literacy test.

This is partly an implementation question and partly a constitutional one.

The right to use an intermediary is itself a form of interoperability.

Not every participant must implement every standard directly.

This is how email, payments and web hosting already work. Service providers absorb protocol complexity for users while remaining replaceable because the underlying interfaces are shared.

The same market can emerge around agent infrastructure.

Hosted identity, authorization, audit and payment services will make standards practical for smaller firms.

The danger is recreating concentration at the service-provider layer.

Portability remains the counterweight.

The principal should own the relationship graph as much as law and privacy permit.

Policies should be exportable.

Credentials should be presentable across compatible systems.

Audit records should be readable without the original vendor.

Capability descriptions should be portable.

Payment choices should not be tied unnecessarily to one agent.

The constitution's purpose is not decentralization for its own sake.

It is preventing convenience from becoming irreversible dependence.

There will be arguments that all of this is too much machinery.

A smart enough agent can simply navigate websites, read contracts, ask for permission and use existing accounts. This is true today for many tasks.

Humans can also conduct commerce with handwritten receipts and verbal agreements.

Institutions emerge when scale makes ambiguity expensive.

The machine economy raises scale dramatically.

One capable agent can enter more transactions in a day than a person could review in a month. Millions of agents can interact across organizational boundaries without personal relationships. The savings are enormous precisely because human attention leaves the loop.

That absence removes the repair mechanism humans provide informally.

Standards have to carry more of the burden.

The constitutional stack should therefore be judged by a demanding criterion: can strangers safely allow each other's software to cause consequences?

If the answer requires both parties to use the same vendor, we have a platform.

If the answer requires a private integration for every counterparty, we have consulting.

If the answer is yes because roles, authority, commitments and evidence are portable across independently built systems, we have infrastructure.

That is the prize.

The machine economy does not need one ruler.

It needs a constitution strangers can implement.
