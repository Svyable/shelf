# Chapter 15 — The Dependency Chain

A coffee shop can lose the ability to sell coffee because a company three layers away changed an API.

That sentence would have sounded absurd not long ago.

Now the path is easy to imagine.

The shop uses a point-of-sale system. The point-of-sale system uses a payment processor. The payment processor relies on identity, banking, cloud, network, certificate, fraud, and messaging services. The shop’s loyalty program talks to another vendor. Delivery orders arrive through platforms. Payroll runs elsewhere. Music comes from a subscription. Scheduling lives in the cloud. The thermostat may have an account. The security cameras may depend on remote storage.

The coffee beans are physical.

The business is a dependency graph.

Modern economies have always been networks of dependency. A nineteenth-century factory depended on coal, rail, finance, labor, machine tools, water, telegraphy, and suppliers. A farm depended on weather, seed, equipment, credit, markets, and transportation.

What has changed is the speed and invisibility with which dependencies can be added.

A software integration can create a business-critical relationship without a truck, contract negotiation, or visible piece of equipment arriving at the door.

The dependency may cost forty dollars a month.

Its failure can cost a day of revenue.

Price is not criticality.

That is the first lesson of the dependency chain.

Organizations are reasonably good at tracking expensive assets because expensive things move through procurement, finance, legal review, or capital budgets. Cheap dependencies can route around those systems.

A developer adds an API.

A marketer connects a service.

An operations manager installs a smart sensor.

An analyst builds a spreadsheet from a vendor feed.

A team creates a workflow that sends results from one product into another.

Each addition solves a local problem.

The organization gains capability faster than its central inventory gains understanding.

This is permissionless innovation inside the firm.

It is often productive.

It also creates the same asymmetry we saw in open source: use spreads faster than stewardship.

The solution is not to centralize every choice.

That would make a modern organization too slow.

The solution is to make dependencies easier to see after they are created and before they become impossible to remove.

Software bills of materials point in this direction. An SBOM inventories components inside software so organizations can understand exposure when a vulnerability or other supply-chain issue appears. The idea is powerful beyond software.

Every durable system has a bill of dependencies.

Which vendor must exist?

Which credential must remain valid?

Which network must be reachable?

Which replacement part must be obtainable?

Which person must know the procedure?

Which law or license must remain in force?

Which data source must remain available?

Which physical utility must be reliable?

Which format must remain readable?

Which institution must honor the promise?

These questions reveal a system’s actual shape.

The shape can be surprising because user interfaces flatten dependencies into features.

A button says “Send.”

Behind it may be a queue, an email provider, domain configuration, DNS, certificates, reputation systems, spam filters, identity data, templates, localization, and regulatory requirements.

A button says “Pay.”

Behind it may be a chain of tokenization, authentication, risk analysis, acquiring banks, card networks, settlement systems, fraud rules, customer support, and dispute processes.

A button says “Generate.”

Behind it may be a model provider, cloud infrastructure, inference accelerators, content filters, billing accounts, retrieval systems, vector databases, data pipelines, observability, and policy.

The interface compresses complexity for the user.

The organization must not let the compression become amnesia.

Convenience is stored dependency.

The more magical the interface, the more important it is to know which magic can disappear.

This leads to a useful distinction between a dependency and a substitute.

A system may have ten suppliers and still depend on one underlying source. Several cloud products can run on the same hyperscale infrastructure. Several software vendors can depend on the same open-source library. Several logistics providers can share a port, bridge, canal, or carrier. Several manufacturers can rely on one specialized factory for a component.

Visible diversity can conceal common-mode risk.

This matters for orphan load because the apparent number of stewards can be larger than the real stewardship base.

Ten companies sell the service.

One protocol, facility, maintainer group, mine, fab, or certificate authority makes the service possible.

A mature dependency map asks not only “who is our vendor?” but “what does our vendor depend on that matters to us?”

The chain cannot be traced infinitely.

Every organization eventually reaches parts of the world it must treat as environmental conditions: electricity, telecommunications, national payment systems, operating systems, major clouds, public roads, legal institutions.

Trying to map everything would create an impossible bureaucracy.

The practical task is to identify concentration where failure would exceed tolerance.

This is consequence-based stewardship again.

A bakery does not need a geopolitical model for every grain supplier.

It may need to know whether its only payment terminal can operate offline during a network outage.

A hospital does not need to understand every transistor supplier inside an imaging system.

It does need to know how long the system can remain functional without vendor support and whether replacement parts are available.

A company does not need the maintainer history of every low-risk development tool.

It may need deep awareness of the cryptographic or authentication components that guard customer access.

Criticality tells the organization where to spend curiosity.

The second lesson of the dependency chain is that contracts are not continuity.

A contract can create rights to service, remedies, support, notice, or compensation. It cannot make an insolvent vendor answer the phone. It cannot manufacture a discontinued part. It cannot guarantee a cloud region never fails. It cannot preserve a key employee at the supplier.

Legal assurance is one layer.

Operational assurance is another.

This distinction appears whenever organizations outsource stewardship.

“We have a vendor for that” can mean “we have transferred labor.”

It can also quietly become “we have transferred understanding.”

The first is often efficient.

The second can be dangerous.

A good outsourcing relationship lets the customer retain enough knowledge to evaluate, replace, or recover from the supplier.

That does not mean duplicating the supplier’s expertise. If the customer could do everything itself, outsourcing would lose much of its value.

It means preserving exit competence.

Where is the data?

Can it be exported?

What standards are used?

What happens at contract termination?

Which credentials belong to us?

Which configurations are portable?

How long can we operate if the service disappears?

What alternatives exist?

What notice do we receive before end of support?

These are ending questions disguised as procurement questions.

A vendor relationship without an exit is a dependency that is trying to become ownership.

The third lesson is that dependencies age at different speeds.

A building can last fifty years while its control software lasts five.

A medical device can remain mechanically sound while the computer interface becomes unsupported.

A vehicle can operate for decades while the cellular network used by its connected service retires.

A company can sign a twenty-year facility lease while the access-control vendor changes three times.

A public records obligation can survive the database that originally stored the records.

When systems combine layers with different lifetimes, the shortest-lived layer can create repeated future jobs for the longest-lived asset.

This is lifecycle mismatch.

It is one of the most important sources of orphan load in modern products.

A mechanical thermostat could remain usable as long as its physical contacts and sensor worked.

A connected thermostat may add remote control, optimization, data, updates, and convenience. It may also depend on wireless standards, an app, a cloud service, account infrastructure, certificates, and a vendor business model whose life is shorter than the wall-mounted hardware.

The product becomes a bundle of clocks.

When one clock expires, the customer discovers which function was truly local.

Designers can manage lifecycle mismatch by isolating dependencies.

A device can retain core local function if cloud services end.

A machine can expose a documented standard interface rather than requiring proprietary software for every maintenance action.

A system can separate data storage from presentation so the interface can be replaced without losing records.

A service can use adapters around vendor APIs so switching providers changes a boundary rather than the entire application.

Modularity is not only a development technique.

It is an anti-orphan technique.

It localizes endings.

A tightly coupled system turns one retired component into a full-system crisis.

A modular system lets one layer die without dragging every layer with it.

The qualifier matters: modularity is not free. Interfaces create complexity. Abstraction can hide performance issues. Too many layers can make debugging difficult. A small system can be easier to understand when direct connections remain direct.

The goal is not maximum modularity.

It is strategic separability where lifetimes or ownership boundaries differ.

If two components are likely to change together under one steward, tight coupling may be fine.

If one is a ten-year internal record and the other is a fast-moving vendor service, an explicit boundary buys future freedom.

This is architecture as succession planning.

The fourth lesson is that dependency risk becomes visible during coordinated shocks.

A routine component failure may be handled by inventory or redundancy. A broad disruption reveals shared dependencies. A port closes. A cloud service fails. A security vulnerability affects a widely used component. A certificate expires across systems. A supplier region loses power. A pandemic changes labor availability.

Organizations discover that supposedly separate processes rely on the same narrow foundation.

The shock is an X-ray.

It shows the hidden skeleton of the institution.

The productive response after a shock is not to eliminate all concentration.

Concentration often exists because it is efficient. A reliable provider can be safer than several weak ones. Standardization reduces training and maintenance. A shared platform can allow better security investment.

The response is to decide which concentration deserves a contingency.

This is portfolio thinking applied to operations.

Some dependencies can fail without consequence.

Some can fail for a day.

Some can fail only if a manual workaround exists.

Some cannot fail at all without safety impact.

Different tolerances imply different stewardship.

A dependency is not risky merely because it is singular.

It is risky when singularity meets consequence and weak recovery.

This framework—if we can call it that without turning every chapter into a branded diagram—is deliberately plain because organizations already have risk methods capable of expressing the idea. Business continuity, safety engineering, reliability engineering, supply-chain management, information security, and enterprise risk all ask versions of the same question.

The Orphan Age connects them through time.

What happens when the dependency does not merely fail temporarily but ceases to exist?

Outage planning assumes return.

Orphan planning assumes disappearance.

That is a much harder test.

If the vendor is gone forever, what do we do?

If the format is never supported again, what do we do?

If the maintainer never returns, what do we do?

If the part is never manufactured again, what do we do?

If the founder never answers again, what do we do?

If the satellite never responds again, what do we do?

The disappearance test turns continuity planning into succession planning.

It encourages different choices.

A backup vendor that requires six months of migration is not a backup for a six-hour failure.

A manual process that only one retired employee understands is not a manual fallback.

A data export that omits critical metadata is not true portability.

A replacement part that exists only on a secondary market may be a temporary bridge, not a lifecycle plan.

The test forces specificity.

The fifth lesson is that dependencies create moral distance.

When labor or environmental cost sits several tiers away, the customer can benefit without seeing it. When maintenance burden sits upstream in an open-source project, a company can consume software without seeing the volunteer hours. When a cloud product abstracts data centers, users see an API rather than power, cooling, land, and hardware.

Abstraction is economically powerful because it lets people specialize.

It can also hide where stewardship is underfunded.

The answer is not to make every consumer responsible for every tier.

That would dissolve specialization.

The answer is to make critical dependency health visible enough that value can travel upstream when needed.

Security funding for open-source projects is one example.

Long-term supply agreements are another.

Maintenance contracts, training, spare-parts commitments, escrow arrangements, shared standards, industry consortia, and public infrastructure investment are all ways of financing continuity beyond the immediate transaction.

A healthy dependency chain does not require every node to be independent.

It requires the chain to contain enough stewardship to support the load placed on it.

That brings us back to stewardship density from Chapter 3.

The concept becomes more useful here if we keep it qualitative.

A dependency is healthier when the capability depending on it is matched by institutions capable of maintaining, replacing, governing, or retiring it.

The weakest chains are those where enormous downstream reliance accumulates on an upstream node whose future is nobody’s business model.

This can happen with software.

It can happen with roads, standards, datasets, specialized suppliers, public utilities, or institutional knowledge.

The orphan begins upstream.

The consequences arrive downstream.

Modern life will not become less dependent.

That would mean giving up the gains of specialization.

The goal is better dependency citizenship.

Know what you rely on where it matters.

Contribute to shared foundations when your value depends on them.

Preserve an exit where the future is uncertain.

Separate layers whose lifetimes differ.

Treat disappearance as a design case, not only outage.

Then let the coffee shop remain a coffee shop instead of becoming an accidental systems-integration company every time a vendor changes.

Complexity should be stored somewhere.

The Orphan Age asks whether anyone is being paid—and empowered—to keep storing it.
