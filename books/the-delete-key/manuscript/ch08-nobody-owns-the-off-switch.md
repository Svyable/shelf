# Nobody Owns the Off Switch

Most organizations know who can turn something on.

They are less certain about who can turn it off.

A product launches because a product team has authority to launch it.

A policy takes effect because an executive, board, regulator, legislature, or court has authority to make it effective.

A system enters production because somebody approves the change.

A new vendor is onboarded because procurement, security, finance, and a business owner complete a chain of approvals.

Creation has a route.

Retirement often does not.

An old system may be owned technically by one team, funded by another, required by a third, used by a fourth, and constrained by a contract negotiated by a fifth.

Every group has enough authority to block deletion.

No group has enough authority to complete it.

That is how immortality is manufactured by governance.

The problem is not merely unclear ownership.

It is asymmetric ownership.

Organizations often define ownership as responsibility for continued operation.

Keep the service available.

Renew the certificate.

Patch the software.

Pay the invoice.

Answer the audit question.

The owner is a custodian.

But custody and mortality are different powers.

The person responsible for keeping a thing alive may be exactly the wrong person to decide whether it should die.

Their expertise is operational.

Their incentives may reward continuity.

Their budget may disappear if the thing disappears.

Their identity may be tied to the system.

None of this means they are biased in some crude sense. It means that governance should not pretend maintenance authority and retirement authority are identical.

A hospital department can know how to run a device without having authority to decommission a clinical capability.

An infrastructure operator can know how to maintain a bridge without having authority to close it permanently.

An engineer can know a service better than anyone without knowing whether a regulatory obligation still requires it.

A records manager can know retention rules without knowing whether a system is technically recoverable after archival.

Safe removal crosses domains.

So who owns the off switch?

A mature answer has three parts.

First, someone must own the **decision**.

Second, someone must own the **execution**.

Third, someone must own the **evidence** that the execution matched the decision.

Those roles can overlap, but they should be explicit.

The decision owner answers: should this thing remain active?

The execution owner answers: how do we retire, revoke, archive, or destroy it safely?

The evidence owner answers: how do we prove what happened, preserve what must survive, and verify that obsolete paths are actually gone?

Without the third role, organizations confuse intention with completion.

A system is declared retired while credentials remain active.

A vendor is terminated while data copies remain in forgotten exports.

A policy is repealed while software continues enforcing it.

A permission is revoked in one directory while a long-lived token still works.

A building is closed while environmental liabilities remain unmanaged.

The press release says gone.

The dependency graph says otherwise.

This is why decommissioning deserves the same project discipline as commissioning.

We already know how to organize important beginnings.

There is a charter.

A sponsor.

A budget.

A responsible team.

A timeline.

Acceptance criteria.

Risks.

Escalation paths.

A definition of done.

Endings need the same machinery.

The strange thing is how rarely they receive it.

A modernization program may have millions of dollars for the new system and no funded workstream for shutting down the old one.

A merger may have elaborate integration plans and weak deletion plans for redundant applications, identities, contracts, and data stores.

A temporary emergency process may have an activation protocol but no named person responsible for declaring the emergency over.

The absence of an off-switch owner is itself a design decision.

It gives persistence the advantage.

When nobody can authorize deletion, the safest personal action is to continue.

This is a governance version of the default effect.

Continuation requires no special courage.

Stopping requires someone to accept responsibility for the future in which the thing is absent.

That responsibility is emotionally heavier.

If the system remains and costs money, the cost is distributed.

If someone shuts it down and a problem follows, the decision has a name attached.

So organizations create a peculiar moral hazard.

People are punished more visibly for incorrect deletion than for indefinite retention.

The result is rational hoarding.

To change that, retirement must become legitimate work.

A person who removes an obsolete system safely should be able to point to an approved mandate, a dependency review, a rollback plan where appropriate, a preservation decision, and a verification record.

They should not be improvising institutional mortality from personal bravery.

This matters especially in public institutions.

Power to delete is power.

A government that can erase records, terminate programs, revoke rights, or close institutions without procedural constraints is not deletion-capable in the sense this book advocates.

It is arbitrary.

The off switch must have authorization boundaries.

Some objects require notice.

Some require legislative action.

Some require judicial review.

Some require public records preservation.

Some require appeals.

Some require consultation with affected communities.

Some require nothing more than an engineer deleting an unused temporary resource after its lease expires.

The governance should match the stakes.

This suggests a useful principle:

The more irreversible the deletion, the stronger the authorization and evidence requirements should be.

Revoking a temporary test credential should be easy.

Destroying a unique archive should be hard.

Disabling a feature behind a reversible flag can be easy.

Demolishing a historic building should require more than a checkbox.

Retiring an unused internal report can be lightweight.

Abolishing a public benefit requires political legitimacy.

A universal deletion workflow would be absurd.

A universal expectation that every important thing has an end-of-life authority model would not be.

That model should answer a small number of questions.

Who can propose retirement?

Who must approve it?

Who can object?

What evidence is required?

What must be preserved?

What can be revoked immediately?

What must remain recoverable temporarily?

What constitutes completion?

Who verifies completion?

What happens if the decision was wrong?

These questions expose a common weakness in organizational ownership models.

Many systems have owners who are actually contacts.

A name appears in a registry, but the person cannot approve budget, change policy, revoke contracts, or compel downstream teams to migrate.

They own responsibility without authority.

That is not ownership.

It is a notification address.

Deletion requires authority proportional to responsibility.

If a team is accountable for retiring a system, it needs a mechanism to force dependency decisions rather than waiting forever for every downstream user to volunteer.

This does not mean unilateral power.

It means a governed escalation path.

A retirement notice is issued.

Dependencies are registered.

Exceptions require reasons and dates.

Unresolved conflicts escalate to a named decision body.

The decision body can fund migration, extend the deadline, or accept the risk of continued operation.

Now persistence has an owner too.

That is critical.

Today, continuation is often ownerless. Nobody formally decides to keep the old system another year. The year simply happens.

A better system would make extensions explicit.

We are keeping this service until March because these two consumers have not migrated.

We are retaining this dataset because this legal obligation remains.

We are preserving this fallback for one more release cycle while the new platform proves stable.

We are maintaining this facility because decommissioning funds have not yet been appropriated.

The extension creates a reason, an owner, and a date.

Persistence becomes a decision rather than weather.

Artificial intelligence will make off-switch governance even more important.

Agents can create resources without the organizational ceremony that used to accompany creation.

An agent may open accounts, generate code, create branches, launch experiments, provision infrastructure, make documents, issue credentials, or establish recurring jobs.

If every act of creation requires a human to later discover and retire the result manually, abundance will overwhelm governance.

Agents that can create should increasingly create with bounded authority and explicit expiry.

They should know what they are allowed to shut down.

They should know what requires human approval.

They should leave audit trails.

They should be able to propose retirement when usage disappears or purpose expires.

And for high-stakes deletion, they should be unable to cross the final boundary alone.

The future does not need one giant red button.

It needs millions of well-governed off switches.

Each attached to the thing it can end.

Each with authority, evidence, and reversibility appropriate to the stakes.

Because a system without an off switch is not merely durable.

It is a system that has outsourced the decision about its lifetime to inertia.