# The Plug Problem

Travel with enough electronics and the world becomes a museum of historical decisions.

One country offers two flat blades. Another offers two round pins. Another adds a large rectangular earth pin. Some sockets are recessed. Some are not. Voltages differ. Frequencies differ. Adapters multiply in airport shops because the electrical world reached consumers before the world reached agreement.

The plug problem is a useful antidote to the idea that standards naturally converge toward one best answer.

They often do not.

By the time international standardization institutions could plausibly coordinate a single global household plug, national electrical systems had already accumulated enormous installed bases. Homes had been wired. Appliances had been designed. factories had produced millions of plugs and sockets. safety rules had adapted to local conventions. Consumers had learned what fit.

The cost of convergence rose with every outlet installed.

IEC technical material now catalogs the many national plug and socket systems in common use. The International Electrotechnical Commission has also published international requirements and, at points, designs intended to support convergence for countries choosing new systems. Yet no universal household plug replaced the inherited world.

This is not because engineers failed to notice the inconvenience.

It is because interoperability can arrive too late to be cheap.

Standards have timing windows.

Early in a technology's life, competing designs are fluid and uncertainty is high. Standardizing too early can freeze an inferior choice before the problem is understood. Wait too long and installed infrastructure makes convergence expensive.

The optimal moment sits somewhere between ignorance and entrenchment.

Nobody rings a bell when it arrives.

This is one of the hardest problems in standardization because the future value of compatibility is greatest before participants can fully measure it. Once the value is obvious, the market may already be fragmented.

Electrical systems make this visible in walls.

A national plug is not just a connector. It is part of a stack of assumptions about voltage, frequency, grounding, circuit protection, appliance construction and safety. An adapter that changes physical geometry does not necessarily change voltage or frequency. A device may fit and still be unsafe.

Physical compatibility can therefore create false confidence when deeper layers remain incompatible.

The same problem appears in software. Two systems may use JSON and still disagree about what fields mean. Two agents may connect over the same transport and still disagree about the scope of a delegated action. A common connector can conceal semantic mismatch.

Good standards architectures distinguish layers.

The household plug is a physical layer. Voltage and frequency are electrical characteristics. Safety rules govern behavior under fault conditions. Product standards specify what connected equipment must tolerate. A traveler who treats all of these as “the plug” is collapsing the stack.

Most users can afford that simplification because appliance makers and regulators have absorbed the complexity elsewhere.

This is another mark of mature standards infrastructure: experts manage the stack so ordinary users can interact with a simpler edge.

The history of electrical standardization is also a history of expanding system boundaries.

Early electrical enterprises could operate locally. Generators served limited areas. Equipment could be designed around one company's choices. As grids interconnected and electrical products traveled, compatibility became more valuable. International standardization became important enough that the IEC was founded in 1906, decades before household electrical systems had converged globally.

Standardization helped electricity scale while preserving regional differences that had already become expensive to erase.

This coexistence is typical of mature infrastructure.

The world is neither standardized nor unstandardized. It is layered with agreements of different scope.

Some are global. Some are regional. Some are national. Some belong to industries. Some belong to one company but have become de facto standards because of market share.

A useful map of civilization would not show countries first. It would show overlapping compatibility zones.

The electrical map would reveal voltage and frequency families. The railway map would reveal gauges. The telecommunications map would reveal spectrum allocations and protocols. The payment map would reveal card networks, bank rails and mobile systems. The software map would reveal operating systems, package ecosystems, identity providers and data formats.

Political borders matter, but standards create another geography.

A traveler with the wrong plug experiences a tiny border crossing.

The same object works on one side and becomes inert on the other.

Adapters are visas for artifacts.

That metaphor is playful, but the economics are serious. Every compatibility boundary creates a market for translation. Some translation markets are healthy. Others are pure friction.

A plug adapter is cheap enough that global travelers tolerate national diversity. Rewiring every building on Earth to one connector would be absurd relative to the gain.

This gives us a useful principle: the existence of a superior universal standard does not imply that migration is worthwhile.

Standards policy should compare future operating savings against transition cost, not merely compare designs.

The plug problem also demonstrates that incompatibility can carry safety information.

A connector's geometry can prevent a device from being inserted into an unsuitable supply. Industrial plug systems often use physical coding so that incompatible voltage or frequency combinations cannot be casually connected. The inability to fit is intentional.

This is the opposite of Baltimore's fire hose.

There, incompatibility disabled useful mutual aid.

Here, incompatibility can prevent a dangerous connection.

Standards must therefore answer a question deeper than “Can these things connect?”

They must answer “Should these things be allowed to connect under these conditions?”

That is authorization in mechanical form.

A keyed connector is a physical permission system.

This connection between compatibility and permission will become central later. We often imagine interoperability as the removal of barriers, but safe systems need selective interoperability. The goal is not universal mating. It is predictable mating among compatible roles.

An industrial connector may encode current rating, voltage range or other conditions through shape and color conventions. A network protocol may require authentication before accepting commands. An API may expose read operations to one client and administrative operations to another. An AI agent may be able to discover a tool without having authority to use it.

Discovery, connection and permission are distinct layers.

Poorly designed systems collapse them.

A service that assumes anyone who can reach an endpoint may invoke it has confused connectivity with authorization. A machine that accepts any physically fitting component may rely too much on geometry. A person who assumes a web link is safe because it resolves has confused addressability with trust.

Standards can help separate these concepts by making each explicit.

Electricity also exposes the politics of safety standards.

Safety requirements save lives, but they impose costs. Manufacturers must use materials, clearances, insulation, protective devices and testing procedures that conform to applicable rules. Product certification can be expensive. Small firms may struggle with compliance. Incumbents may favor requirements they can absorb more easily than challengers.

The existence of real safety benefits does not make the political economy disappear.

This is a recurring standards dilemma: a rule can be both genuinely protective and competitively consequential.

Arguments that treat those possibilities as mutually exclusive are usually weak.

A grounding requirement can prevent shock and increase manufacturing cost. A cybersecurity certification can reduce risk and burden entrants. A medical interoperability rule can improve patient mobility and require expensive software changes. An AI audit standard can expose dangerous practices and favor organizations with large compliance teams.

The right question is not whether a standard has costs.

Every meaningful standard constrains someone.

The questions are whether the constraint addresses a real coordination or safety problem, whether its benefits justify the cost, whether the rule is proportional, and whether compliance pathways are accessible enough to preserve competition.

Electrical safety developed a rich ecosystem around conformity assessment because the stakes were obvious. A consumer cannot inspect the internal insulation of every appliance. Trust is delegated to testing, certification, regulation and manufacturer responsibility.

This is a standards stack for trust.

The device bears a mark. The mark refers to a process. The process refers to a specification. The specification reflects engineering knowledge. The consumer relies on the chain without reading the documents.

Autonomous agents will need comparable chains.

A user will not inspect the source code of every remote agent that negotiates on their behalf. A merchant will not interview the model behind every purchasing request. A bank cannot accept “the AI said it was okay” as proof of authority.

Trust will have to be compressed into machine-verifiable signals.

Those signals may include credentials, certifications, policy attestations, software identities and audit evidence. Like electrical safety marks, they will be valuable only if the institutions behind them are credible.

A badge is not a standard.

A badge plus a trustworthy conformity process can become one.

The plug problem also illustrates why regional standards can persist even in a global market without crippling it.

Device manufacturers learned to design power supplies that tolerate multiple voltages and frequencies. Travelers carry adapters. Some products ship with interchangeable cords. The appliance internalizes heterogeneity.

Technology can move the compatibility burden from infrastructure to endpoints.

This is a powerful strategy.

Instead of replacing millions of wall outlets, build devices that adapt.

The internet used a related idea. Rather than require every underlying network to use the same physical technology, the Internet Protocol created a common layer that could run over many links. Diversity moved below the shared interface.

Software agents may likewise reduce the need for complete standardization by adapting at endpoints. A capable agent can transform data, negotiate versions and learn unfamiliar interfaces.

This could make the future more plural than the past.

But endpoint intelligence has limits.

A universal power supply can handle expected voltage ranges because engineers specify those ranges. It does not make arbitrary electrical input safe. An AI system can infer an API, but inference does not guarantee authority, settlement or legal meaning.

Adaptive endpoints work best when the space of variation is itself bounded.

This suggests a different role for standards in an intelligent world.

We may standardize fewer exact representations and more envelopes.

Instead of insisting on one schema, define ways to describe schemas and negotiate them. Instead of one agent capability set, define discovery and versioning. Instead of one payment method, define how methods identify themselves and what evidence a transaction produces.

This is meta-standardization: standards for describing and negotiating differences.

The electrical world already contains versions of this. Equipment labels specify voltage and frequency ranges. Connectors identify capabilities. Devices negotiate power in modern charging systems. The system does not require every supply to be identical if endpoints can safely discover what is available and choose compatible behavior.

Negotiation is a standard too.

It requires shared vocabulary and rules about what happens when no agreement exists.

The current North American transition in electric-vehicle charging turns all of these ideas into a single piece of hardware you can hold in one hand.

For years, electric vehicles in North America used several connector families. Tesla developed its own connector and a large charging network around it. Other vehicles commonly used the Combined Charging System, with CHAdeMO also present in the installed base. Drivers learned a new version of the traveler's plug problem: a charging station could be physically close and electrically capable yet useless to a particular car without the right connector or adapter.

Then market momentum changed.

Beginning in 2023, multiple automakers announced plans to adopt the Tesla-developed connector lineage. SAE International started an expedited standards process around it. In December 2023 SAE published the J3400 Technical Information Report, and the standards process continued toward a formal recommended practice. The point was not merely to bless a winning shape. Opening and standardizing the interface meant suppliers and manufacturers other than the original developer could build vehicles and charging equipment around a public technical framework.

This is a revealing route to a standard.

Textbooks often imagine a committee evaluating several designs before the market commits. Here the market moved first. A proprietary or de facto interface accumulated a substantial installed network, users and manufacturing experience. Formal standardization followed the installed base.

That sequence changes the politics.

The standard is not selecting on a blank page. It is converting an ecosystem's momentum into shared infrastructure while trying to preserve competition around the interface.

There is a competition-policy dimension hiding inside the connector.

A widely adopted physical interface can remain controlled in ways that make competitors dependent on one owner, or it can become specified broadly enough that many suppliers can manufacture compatible equipment. The geometry may look identical in both worlds. The institutional difference is who can implement it, under what rights, with what testing, and with what confidence that the rules will not change unilaterally.

This is why “open” cannot be inferred from appearance.

A plug can be physically common and institutionally closed.

A standardization process can turn common use into common implementability.

The transition still needs adapters.

Vehicles already on the road do not grow new inlets when a standards body publishes a document. Chargers already poured into concrete do not replace their cables overnight. The Joint Office of Energy and Transportation describes adapters as part of the transition, and federal charging rules have had to accommodate multiple connector types while requirements evolve.

This is the installed-base problem in a new costume.

The connector war may appear to end while the adapter economy expands temporarily.

That is normal.

Convergence at the destination can require more translation during the journey.

The EV case also shows why the plug is only the visible layer. Reliable charging depends on far more than mechanical fit. Vehicle and charger must communicate. Power has to be delivered within safe electrical limits. Billing and authentication may occur. Charging networks need backend communication. “Plug and charge” systems add identity and cryptographic infrastructure. Measurement has to be accurate enough for commerce.

A driver experiences one action.

The standards stack experiences many agreements.

The Joint Office's own interoperability work spans the J3400 connector, ISO 15118 communication, public-key infrastructure, metrology, and backend charging protocols. The physical connector is necessary and insufficient.

This is the same warning we saw with household travel adapters.

Making the shape fit solves one layer.

A mature system needs the layers behind it to agree about what the connection means.

That distinction will matter enormously for agents because natural-language interfaces can make semantic mismatches look resolved. Two agents may exchange fluent prose and appear to understand each other. Underneath, one may interpret a commitment as revocable until shipment while the other interprets it as final at authorization. Conversation has made the plug fit. The contract voltage is still wrong.

The EV transition offers one more lesson: standards can formalize a de facto winner without requiring the winner to remain the only supplier.

This is often the realistic compromise between purity and installed-base economics.

Starting over with a technically pristine connector could destroy network value already built. Leaving a dominant proprietary interface entirely private could turn compatibility into dependence on one company. Standardizing the interface can preserve much of the installed value while opening room for independent implementation.

It is not automatically fair. Governance, patents, certification, access to networks and implementation details still matter.

But it creates a seam where competition can occur without forcing every participant to repeat the entire coordination battle.

This is compatibility policy in physical form.

The same pattern may recur in agent standards. A vendor-developed protocol can become popular before a neutral standards institution catches up. The choice will not always be between “open standard” and “proprietary system” at birth. It may be whether a successful de facto interface can be made portable enough that its ecosystem no longer depends on the original sponsor's discretion.

That transition is difficult precisely because success created the leverage.

The standardizer arrives after the network effect.

The work is to domesticate it without killing it.

A negotiation protocol needs a safe failure state.

If a device cannot accept the offered voltage, it should not “do its best.” If an agent does not understand the requested authority scope, it should not infer broad permission. If two financial systems disagree on settlement terms, they should not execute and sort it out later.

Human intelligence often prizes graceful improvisation.

High-stakes machine systems sometimes need disciplined refusal.

The phrase “fail closed” captures one version: when the system cannot establish that an action is permitted, deny it. That principle can be inconvenient. It can also keep ambiguity from becoming consequence.

Electrical standards embody this through physical design. The wrong thing does not fit.

Digital standards need equally legible boundaries.

There is a broader lesson in the fact that the world still carries multiple plugs.

Not every standards failure must be repaired.

The global economy functions despite household plug diversity because the translation cost is manageable. Engineers created adapters and tolerant devices. The benefit of one universal retrofit is too small compared with the installed-base cost.

This should make reformers more selective.

Incompatibility is not a moral defect.

It is an economic condition.

Measure its cost.

If the cost is high and recurring, standardization or better gateways may be valuable. If the cost is low and diversity protects useful local choices, leave it alone.

Standards bodies can become addicted to solving visible variation even when variation is not the bottleneck. Organizations can create specifications for problems markets are already handling cheaply.

This produces paper compatibility without economic value.

The discipline is to identify the transaction that becomes easier, safer or possible because of the standard.

For plugs, the transaction is electrical connection. At household scale, adapters often solve international travel cheaply enough. Within a national system, stable standards remain essential because millions of devices rely on predictable connection and safety.

For agent systems, we should ask the same question.

What recurring interaction is expensive because participants do not share expectations?

Tool discovery is one. Agent-to-agent task exchange is another. Delegated spending authority is another. Provenance of results is another. Revocation is another. Payment and settlement are another.

Each may deserve a standard at a different layer and a different moment.

Trying to solve all of them with one giant universal agent protocol would repeat a familiar mistake: standardizing the whole system instead of the seam.

The electrical world survives because its standards are layered.

A connector standard does not define an electricity market. A voltage standard does not define appliance design. A safety standard does not specify the business model of the utility.

The layers cooperate without collapsing into one document.

This modularity is a governance advantage as much as an engineering one.

Different institutions can steward different concerns. Safety experts can focus on shock and fire. grid operators can focus on system reliability. manufacturers can innovate in appliances. regulators can oversee markets.

No committee has to understand the entire electrical civilization.

That is how standards let institutions scale too.

They divide governance into interfaces.

A world of agents will need the same restraint.

The protocol for discovering a remote agent should not decide who is legally liable for a purchase. A credential format should not dictate which government may issue a professional license. A payment interface should not become a universal identity system merely because it already knows customers.

Layering prevents one standard from becoming a constitutional monopoly.

The plug problem looks like fragmentation.

Look closer and it is a lesson in boundaries: when to converge, when to adapt, when incompatibility is protective, and when the past has become too expensive to replace.

The traveler buys an adapter and moves on.

Civilization does the same more often than standardizers admit.
