# Agents Among Agents

The first agent is easy to imagine.

It works for you.

The second agent changes the world.

It works for someone else.

Now they have to meet.

A personal assistant asks a merchant for a quote.

A procurement agent asks a supplier whether inventory can arrive by Tuesday.

A logistics agent negotiates a slot with a warehouse system.

A software agent requests access to another service.

A research agent asks a specialist agent to verify a claim.

A buyer agent presents a payment credential.

A seller agent checks the mandate and responds.

The economy acquires a new kind of traffic.

Not humans clicking through software.

Software representing humans and institutions to other software representing humans and institutions.

This is where agents stop being merely products and start becoming a population.

Populations need rules.

The internet learned this before us.

A network becomes useful because machines agree about how to find one another, address one another, exchange information, detect failure, and recover. The web did not win because every website used the same programming language. It won because different systems could still speak HTTP, resolve names, exchange documents, and route packets.

Protocols let disagreement coexist with interoperability.

Agent systems are arriving at the same threshold.

An agent built by one vendor may need to hire another agent, use a tool built by a third company, authenticate to a customer's enterprise, purchase data from a fourth party, and return a result to a workflow none of the original developers ever saw.

Without common interfaces, every relationship becomes a custom integration.

Custom integrations are slow.

They are expensive.

They create lock-in.

They also limit the economic surface on which agents can act.

A human salesperson can walk into an unfamiliar store and improvise.

Software usually cannot.

It needs an interface.

The emerging protocol layer is an attempt to make unfamiliar systems legible enough for machine delegation.

Google's Agent2Agent protocol was introduced around this idea: agents built in different frameworks should be able to discover capabilities, exchange tasks, and collaborate without sharing all of their internal machinery. The Model Context Protocol approaches another seam by standardizing how models and agents interact with tools, resources, prompts, and services. By mid-2026 its specification had evolved around scaling, routing, authorization, tasks, extensions, and the practical needs of a growing implementation ecosystem.

NIST's AI Agent Standards Initiative puts the policy significance plainly. Interoperability, identity, security, and open protocol ecosystems are not side projects if agents are expected to act across organizational boundaries.

The protocol becomes an institution.

That sentence can sound grand for something that looks like a JSON schema.

It should not.

A protocol determines what can be requested.

How identity is represented.

Which capabilities are advertised.

How authority is delegated.

What evidence travels with an action.

How errors are reported.

What gets logged.

How long a task can persist.

Who is allowed to interrupt.

Whether a transaction can be retried safely.

Whether one agent can know that another really speaks for the principal it claims to represent.

These are economic rules encoded in technical form.

The machine customer from Chapter 8 and the machine seller from Chapter 9 become much more consequential once they can meet through common protocols.

Before interoperability, the buyer agent may be limited to merchants integrated with its platform.

After interoperability, the theoretical market expands.

The buyer can ask more sellers.

The seller can answer more buyers.

Specialist agents can compete for subtasks.

A travel agent can call a hotel agent, an airline agent, an insurance agent, and a ground-transport agent.

A business agent can assemble services from payroll, accounting, legal, marketing, logistics, and cloud providers.

The firm boundary becomes more fluid because the cost of contracting across software systems falls.

Ronald Coase enters the API.

Chapter 4 argued that cheaper delegation can move the boundary of the firm. Agent protocols intensify the mechanism because they lower the cost of discovering and coordinating external machine capability.

A company no longer has to decide only whether to build a function or hire a vendor.

It can ask whether an internal agent should purchase a capability dynamically when needed.

Buy an hour of translation.

Buy a database lookup.

Buy an image analysis.

Buy a delivery route.

Buy one thousand tokens of specialized reasoning.

Buy a security scan.

Buy compute for thirty seconds.

The service market can fragment into smaller units because the buyer and seller no longer pay human coordination costs on every transaction.

This is the economic promise behind machine-to-machine payments.

Traditional payments are designed around human-scale commerce.

A person initiates a purchase.

A business sends an invoice.

A card transaction has enough value to justify the surrounding processing cost.

Agents can create demand for much smaller and more frequent exchanges.

A research agent may pay a fraction of a cent for one data point.

A software agent may pay for a temporary API call.

A logistics agent may buy a small amount of priority capacity.

A seller agent may purchase fraud intelligence only for transactions that cross a threshold.

At machine speed, economic activity can be composed from tiny services.

Mastercard's 2026 Agent Pay for Machines announcement makes the intended architecture explicit: credentialing, permissioning, programmatic transaction, and settlement for software systems acting continuously at high velocity. Whether any particular product becomes dominant is secondary to the mechanism.

Payments need a principal.

An agent can act.

It cannot be allowed to invent its own budget.

This returns us to delegated authority.

The agent-to-agent economy needs to answer four questions repeatedly.

Who are you?

Who do you represent?

What are you allowed to do?

How do I prove what happened afterward?

Identity is the first problem because software is easy to copy.

A human identity has biological continuity, social continuity, legal records, and physical presence. None is perfect. Together they make impersonation costly enough for ordinary institutions to operate.

An agent can be instantiated a thousand times.

Its name can be copied.

Its messages can be forged unless cryptographic or platform controls intervene.

It can act through a human's credentials.

It can invoke another agent whose identity the original principal never inspected.

A chain of delegation can become difficult to see.

The enterprise security problem is therefore not merely “authenticate the bot.”

It is preserve the chain of authority.

Alice authorizes Agent A to spend up to five hundred dollars on travel.

Agent A asks Agent B to find a hotel.

Agent B asks a booking service to reserve a room.

Which system needs to see Alice's identity?

Which needs only to know that Agent A possesses a valid mandate?

Can Agent B spend the entire five hundred dollars?

Can it create Agent C?

Does the mandate survive if Agent B is compromised?

Can the hotel prove that the reservation was authorized?

Can Alice revoke the whole chain before settlement?

These are classic authorization questions made recursive.

NIST's 2026 agent-identity work focuses precisely on the risks of giving software agents access to data, tools, and applications. The underlying security principles are familiar. Least privilege. Authentication. Authorization. Audit. Revocation. Separation of duties.

The novelty comes from autonomy and delegation depth.

A human employee receives credentials and remains one accountable person.

An agent may use credentials to invoke systems that invoke systems.

The authority can propagate faster than a security team can inspect it manually.

The safest architecture therefore tries to make authority attenuate rather than expand as it travels.

A sub-agent should not casually gain powers the parent agent lacked.

A payment mandate should narrow to the transaction.

A research mandate should not silently become permission to send email.

A hotel-booking agent does not need access to the user's tax records because another part of the personal agent happens to have them.

The principle is simple.

Delegation should lose privilege as it gets farther from the principal.

Software systems have violated simpler principles for decades.

The implementation will be difficult.

The second problem is discovery.

How does one agent know what another can do?

Humans solve this socially.

A lawyer knows roughly what an accountant does.

A buyer understands what a freight broker offers.

A person can read a sign, browse a website, ask a question, and infer capability from context.

Agents need machine-readable capability descriptions.

The provider advertises tools, tasks, schemas, prices, constraints, and perhaps reputation.

The buyer decides whether the capability matches the need.

This creates a market for machine legibility.

Chapter 8 described merchants becoming legible to buyer agents.

Chapter 16 generalizes the idea.

Every service becomes easier to buy if an agent can discover what it does without bespoke negotiation.

The equivalent of the storefront becomes a capability manifest.

This sounds efficient.

It also creates a new attack surface.

A malicious service can advertise a capability it does not have.

A compromised agent can claim a false identity.

A tool description can manipulate the model reading it.

An external system can return instructions designed to change the agent's behavior.

A capability directory can become a target for spam.

The problem resembles the early web after commercial incentives arrived.

Open publishing produced abundance.

Abundance produced manipulation.

Search engines created ranking systems.

Rankings created optimization.

Optimization created spam.

Spam created countermeasures.

Agent discovery will likely repeat the cycle at machine speed.

The agent needs not only to discover a service.

It needs to judge the service.

Reputation becomes the third problem.

A human buyer has brands, reviews, professional licenses, referrals, prior relationships, credit histories, and common sense.

A machine buyer can ingest all of these, but agent-to-agent markets can create new forms of reputation tailored to software behavior.

Completion rate.

Dispute rate.

Latency.

Accuracy.

Security incidents.

Refund history.

Credential age.

Verified ownership.

Policy compliance.

Independent audits.

The obvious temptation is a universal agent score.

That would be convenient.

It would also be dangerous.

Reputation is contextual.

An agent can be excellent at translation and terrible at financial advice.

A merchant can have high fulfillment reliability and a poor privacy record.

A service can be trustworthy for low-value transactions and inappropriate for critical infrastructure.

One score compresses too much.

The better system preserves dimensions and lets principals decide which matter.

That is harder to use.

Reality is often harder to use.

The fourth problem is spam.

Agentic abundance makes outreach almost free.

A seller agent can contact one million buyer agents.

A job-seeking agent can submit one million applications.

A grant-writing agent can submit proposals everywhere.

A purchasing agent can ask ten thousand suppliers for bids.

A support agent can appeal a decision repeatedly.

A fraud agent can test thousands of identities.

A political agent can send customized arguments to everyone with a public inbox.

Human attention is not prepared for this volume.

Neither are machine systems if every request consumes nontrivial compute.

Rate limits become economic policy.

So do fees.

One of the oldest ways to deter low-value behavior is to make it cost something.

Postage did this for physical mail.

Court filing fees do it imperfectly for litigation.

Bid bonds can discourage unserious procurement.

Deposits can allocate scarce resources.

Agent systems may need machine-scale equivalents.

A request can require a credential.

A small payment.

A reputation threshold.

A proof of stake.

A quota.

A cost that is refunded if the request is legitimate.

The mechanism will vary by domain.

The principle is that zero marginal communication cost creates a tragedy of the inbox.

The verification economy meets the agent-to-agent economy here.

The receiver wants evidence before spending resources on the request.

Who are you?

Why should I listen?

Are you authorized?

Will you pay?

Can I block you later?

The protocol that answers these questions becomes valuable infrastructure.

This is why standards can shape market power.

A protocol is open in one sense if anyone can implement it.

The ecosystem can still be concentrated if identity, reputation, discovery, or settlement depends on a small number of gatekeepers.

Email is open.

Deliverability is not evenly distributed.

The web is open.

Discovery became concentrated.

Payments use broad standards.

Acquiring and network access remain institutional businesses.

Agents can repeat this pattern.

The protocol layer lowers entry barriers.

The trust layer can rebuild them.

That may be necessary.

A market with no trust filter can become unusable.

The governance question is whether trust infrastructure remains contestable.

Can a new agent earn reputation?

Can credentials move between platforms?

Can different identity providers interoperate?

Can a principal choose a different wallet, reputation service, or discovery engine?

Can the rules be inspected?

Can a service appeal a mistaken block?

The answers determine whether agent protocols become roads or toll kingdoms.

Interoperability has another consequence that software developers know well.

It increases composability.

A service built for one purpose gets used in another.

A map API becomes part of delivery, dating, real estate, insurance, emergency response, and urban planning.

A payment API becomes embedded in marketplaces nobody anticipated.

Agents can compose capabilities more freely because they can reason about tools at runtime.

This is powerful.

It makes safety harder.

A harmless capability in isolation can become dangerous in combination.

Read a database.

Generate a convincing email.

Send the email.

Purchase a domain.

Create an account.

Move money.

Each tool can have a legitimate use.

The chain can create a capability none of the tool providers intended.

Security must therefore consider compositions, not only components.

This is another reason the agentile economy cannot be understood by rating models alone.

The dangerous unit can be the workflow.

The opportunity is also the workflow.

The same composability can allow a two-person company to assemble capabilities that once required departments.

It can let a hospital coordinate scheduling, translation, billing, and supply systems.

It can let a scientist combine literature search, data analysis, simulation, and procurement.

It can let a municipality connect permitting, mapping, inspection, and notification systems.

Interoperability expands both productive possibility and failure surface.

The next constraint is protocol negotiation itself.

Standards never cover everything.

A buyer wants delivery by Tuesday but will accept Wednesday for a discount.

A seller supports two return policies.

A research agent needs data under a license that forbids redistribution.

A company allows an external agent to read some records but not derive customer lists.

These are terms, not mere fields.

Agents can negotiate them.

This gives contracts a new role.

A machine-readable contract does not have to replace legal prose.

It can encode operational pieces of the agreement so systems know what they are allowed to do.

Spend limit.

Expiration.

Data-use restriction.

Geographic scope.

Service level.

Cancellation right.

Liability cap.

Retention period.

Humans negotiate the policy.

Software executes the policy.

This is the legal analogue of Chapter 5's permission graph.

The contract becomes partly executable.

That can reduce ambiguity.

It can also create false confidence when code captures only part of the agreement.

The written contract remains full of concepts that resist easy execution.

Reasonable efforts.

Material breach.

Good faith.

Industry standard.

Substantial compliance.

Agents will operate inside these human ambiguities.

The legal system remains the interpreter of last resort.

Dispute resolution is therefore the fifth problem.

Two agents complete a transaction.

The buyer says the product failed.

The seller says the specification was met.

The payment was authorized.

The delivery record is valid.

Who decides?

The agents can negotiate.

They can present logs.

They can consult policy.

But at some point an institution needs authority to resolve the disagreement.

Platforms already do this through chargebacks, marketplace disputes, arbitration, customer-support policies, and courts.

Agentic commerce does not remove dispute institutions.

It can generate disputes faster.

This makes evidence architecture economically important.

If the transaction preserved the mandate, terms, communications, payment authorization, delivery record, and relevant system outputs, resolution can be cheap.

If the agents acted through opaque chains, every dispute becomes forensic work.

A market with cheap transactions and expensive disputes can collapse under its own success.

The settlement layer has to scale with the action layer.

There is a final problem that engineers do not get to solve alone.

Representation.

An agent speaks for a principal.

How faithful must it be?

A personal agent may learn that the user often ignores a stated budget and buys the better option.

Should it violate the written budget because history suggests the user will be happier?

A corporate procurement agent may discover that a senior executive regularly circumvents policy.

Should it encode the behavior or the policy?

A political representative is expected to exercise judgment, not merely mirror every constituent preference.

A legal agent may have duties to a client that are constrained by duties to the court.

Agency in human institutions has never meant blind obedience.

Software makes the conflict explicit.

Whose values govern the delegate?

The principal's immediate instruction?

Long-run preference?

Organizational policy?

Law?

Platform rules?

Safety constraints?

Professional norms?

The answer varies by domain.

That variance will live in protocols, credentials, product design, and law.

This is why the word agent carries more weight than assistant.

An assistant helps.

An agent represents.

Representation creates relationships with third parties.

Third parties need to know when they can rely on the representation.

The agent-to-agent economy will therefore produce a dense new layer of commercial law even if legislators never pass an “AI agent code.” Existing doctrines of agency, contract, authorization, fraud, negligence, consumer protection, payments, evidence, and professional responsibility will be forced to absorb machine actors.

Technical standards will fill gaps faster than statutes.

Private platforms will make rules faster still.

The order matters.

Whoever writes the early protocol can shape the default behavior that later institutions treat as normal.

This is how infrastructure becomes governance before anyone calls it governance.

The healthiest outcome is not one universal agent language controlled by one company.

It is enough standardization to make switching and interaction possible, with enough diversity that different systems can compete on intelligence, trust, privacy, cost, and institutional design.

The roads should connect.

The vehicles should differ.

The toll collector should not own every destination.

The passport should prove what matters without revealing the traveler's entire life.

The customs post should stop dangerous cargo without turning every border crossing into a week of forms.

These are ancient coordination problems wearing new syntax.

Agents among agents do not create a separate machine civilization.

They create a software layer inside human civilization where more of our economic relationships can be executed without our continuous presence.

The buyer still wants the product.

The seller still wants the margin.

The employee still wants the task completed.

The citizen still wants the benefit.

The firm still wants the contract honored.

The human goals remain.

What changes is the traffic between them.

When agents begin meeting agents, commerce stops waiting for people to click.

The economy starts talking to itself.
