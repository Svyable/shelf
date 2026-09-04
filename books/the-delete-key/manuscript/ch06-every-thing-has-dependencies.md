# Every Thing Has Dependencies

Nothing important exists alone.

A service depends on a database, a certificate, a network route, a package, a scheduler, a team, a budget, and a reason.

A regulation depends on definitions, forms, enforcement practices, software systems, training, reporting, and other rules that assume it exists.

A building depends on utilities, access roads, inspections, maintenance crews, insurance, land use, surrounding businesses, and the people who have organized their lives around it.

A record depends on the system that stores it, the schema that gives it meaning, the law that says how long it should survive, and the institution that can still explain what its fields mean.

We talk about deletion as if objects were singular.

They are usually knots.

Pull one strand and the rest of the system moves.

This is why removal exposes ignorance faster than creation does.

To add a new component, you often need to know where to attach it.

To remove an old component safely, you need to know everything that is still attached to it.

That asymmetry is brutal.

A developer can create a new API endpoint by understanding a narrow slice of the system. Years later, deleting that endpoint may require discovering every consumer that grew around it, including consumers the original developer never knew existed.

A policymaker can create a requirement in one paragraph. Removing it later may require understanding how agencies, vendors, citizens, courts, and software systems incorporated the requirement into their own behavior.

The creator needs a connection point.

The remover needs a dependency graph.

Most institutions do not have one.

They have fragments.

Architecture diagrams that were accurate during a migration.

Org charts that describe reporting lines but not actual authority.

Asset registers that know what exists but not what depends on what.

Contract databases that know renewal dates but not operational importance.

Data catalogs that know table names but not which decisions rely on them.

Policy manuals that know the current text but not every form and workflow that encodes it.

The system is more connected than the documentation.

So people compensate with caution.

Do not touch that.

We are not sure who uses it.

That phrase sounds like conservatism, but it is really a statement about missing topology.

The organization does not know the shape of itself.

Dependency is not merely technical.

There are at least four kinds worth distinguishing.

The first is **mechanical dependency**.

This service calls that service. This report reads that table. This process consumes that file. This machine requires that part.

These are the dependencies engineers are comfortable drawing with arrows.

The second is **semantic dependency**.

A downstream object may not technically require the upstream one, but it depends on its meaning.

A dashboard assumes that a metric still means what it meant five years ago. A policy assumes a category remains coherent. A model assumes a field was collected under the same rules across time. A contract assumes a definition in another document.

Semantic dependencies are dangerous because the system can continue running after they break.

The software returns a number.

The number no longer means what people think it means.

The third is **institutional dependency**.

A team exists because a process exists. A vendor contract exists because a requirement exists. A budget exists because an office exists. A certification exists because a rule recognizes it.

These dependencies often create political resistance to removal because livelihoods, authority, or status have grown around the object.

The fourth is **memory dependency**.

An old system may be the only place where historical context remains legible. A retired employee's spreadsheet may contain the mapping everyone uses to interpret legacy identifiers. An obsolete application may be the only practical interface for searching records that still matter.

The object looks operationally old but epistemically necessary.

This is why safe deletion cannot be reduced to usage counts.

A thing can have zero direct users and still be a prerequisite for interpretation, resilience, evidence, or legal compliance.

Dependency graphs need more than traffic.

They need meaning.

Consider a simple database column.

`customer_type`.

A team wants to remove it because a new classification system replaced it years ago.

A usage query shows no modern application reading the field.

Safe to delete?

Maybe.

But perhaps an annual regulatory export still selects it through an old view.

Perhaps a machine-learning training dataset uses historical values to preserve comparability.

Perhaps a fraud investigation playbook refers to the old category.

Perhaps archived records can only be interpreted if the original classification remains documented.

The column may be dead as an operational input but alive as historical context.

That suggests a more precise sequence.

First: identify the object.

Second: identify direct dependencies.

Third: identify indirect dependencies.

Fourth: identify obligations that survive retirement.

Fifth: decide which parts must remain active, which must be archived, which authorities must be revoked, and which data should be destroyed.

Sixth: verify the result.

Deletion is a pipeline.

The actual `DROP COLUMN` is near the end.

Civil institutions need analogous pipelines.

A government does not truly retire a benefit category by deleting one paragraph if eligibility software, forms, call-center scripts, and reporting codes still contain it.

A company does not truly discontinue a product if support obligations, warranties, replacement parts, customer data, contracts, and regulatory duties remain.

A university does not truly end a program when enrolled students still need a path to completion and alumni records still need correct interpretation.

Every ending leaves residual obligations.

The mistake is treating those obligations as evidence that nothing can ever end.

They are evidence that endings need design.

Dependencies can be migrated.

They can be severed.

They can be documented.

They can be converted into archival relationships.

They can be replaced by interfaces with narrower scope.

They can be given deadlines.

But first they have to be visible.

This is where mature software practice offers a useful concept: observability.

A system is easier to change when it can tell you what is happening inside it.

Which calls are being made?

Which paths are active?

Which queues are idle?

Which dependencies are failing?

Institutional observability is weaker.

We rarely know which policy clauses generate the most operational work.

We often cannot answer which report fields affect decisions.

We may not know which contractual obligations are keeping an obsolete system alive.

We may know headcount by department without knowing which recurring processes consume the attention.

The institution sees outputs more clearly than dependencies.

A deletion-capable institution would instrument persistence.

Not in a dystopian sense where every human action becomes telemetry.

In a practical sense where important artifacts carry enough metadata to support later review.

This system depends on these services.

This permission was granted for this purpose.

This rule is implemented by these forms and checks.

This report supports these decisions.

This dataset is retained for these obligations.

This asset has these downstream users and these decommissioning constraints.

The dependency map would never be complete.

No map is.

But incompleteness is not an argument for blindness.

Even partial topology changes behavior.

Once dependencies are visible, one of the strongest arguments for indefinite persistence becomes weaker:

We cannot remove it because we do not know what will break.

Now the question becomes:

What would we have to learn before removal became safe?

That is a much better question.

It transforms fear into a research plan.

Find consumers.

Observe traffic.

Interview owners.

Inspect contracts.

Trace references.

Run the system without the component in a reversible environment.

Announce the retirement.

Wait through the relevant business cycle.

Document the exceptions.

Then decide.

This process reveals something else.

Sometimes the dependency graph is the real problem.

An old service remains impossible to retire because dozens of teams have coupled themselves directly to its internals.

An old policy remains hard to change because forms and software duplicate its logic in hundreds of places.

An old dataset remains necessary because downstream systems copied identifiers without preserving provenance.

The object is not immortal by nature.

The system made it immortal through coupling.

That means deletion architecture begins long before deletion.

Systems that expect change use interfaces.

They isolate responsibilities.

They record provenance.

They avoid unnecessary coupling.

They make ownership explicit.

They distinguish historical records from operational state.

They attach expiration to temporary access.

They build migration paths while the people who understand the original design are still present.

In other words, removability is a property of good creation.

This may become one of the most important design criteria in an age of abundant generated systems.

An agent can produce a working component quickly.

But can it produce the dependency metadata required to retire that component later?

Can it state what it called, what called it, what authority justified it, what data it touched, what credentials it received, and what evidence must survive its shutdown?

If not, the agent has created more than functionality.

It has created future archaeology.

The world does not need fewer dependencies.

Complex systems will always depend on other things.

The goal is not isolation.

It is legibility.

Dependencies should be discoverable enough that an ending does not require institutional clairvoyance.

A mature civilization will know that every thing is part of a graph.

And it will design the graph so that one day, when the reason for a node disappears, someone can finally answer the question that determines whether deletion is possible:

What, exactly, still needs this?