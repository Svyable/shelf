# Dead Code, Live Consequences

Dead code has an unfortunate name.

It sounds harmless.

Dead things, after all, do not do much.

But code that no longer serves a useful purpose can remain very alive in the minds of the people who have to work around it.

An engineer opens a file and sees two implementations.

One appears current.

The other appears old.

There is no comment explaining whether the old path is obsolete, experimental, preserved for compatibility, or invoked by some customer nobody remembers.

The engineer has a choice.

Delete it and risk breaking something invisible.

Or keep it and make the next engineer face the same choice.

Most rational engineers keep it.

That is how uncertainty becomes architecture.

The cost of dead code is not primarily that computers waste a few bytes storing it. Modern storage can tolerate a spectacular amount of textual debris.

The cost is that humans cannot instantly know it is dead.

They have to read it.

They have to reason about it.

They have to consider whether a change affects it.

They may write tests for it.

Security tools may scan it. Build systems may package it. Documentation may mention it. Another developer may copy a pattern from it because old code has the authority of having survived.

Dead code can teach.

That is the problem.

It can teach the wrong thing.

A codebase is not only instructions for machines. It is a body of evidence humans use to infer how the system is supposed to work.

Every obsolete path contaminates that evidence a little.

This makes software an unusually clean laboratory for the larger argument of this book.

The world inside a repository has many of the same features as an institution.

History accumulates.

Dependencies become difficult to see.

Ownership changes.

Old decisions remain executable.

People fear removing things whose original reasons are gone.

Temporary solutions become permanent because permanence is the default outcome of not deleting them.

And the cost of keeping is paid mostly by people who did not make the original decision.

Software even has a word for deliberate aging: deprecation.

Deprecation is a fascinating invention because it creates a state between alive and gone.

A deprecated interface still exists, but the system announces that new users should not depend on it and old users should migrate away.

This is not deletion.

It is a warning about future deletion.

The warning changes behavior.

That is the important part.

If an interface simply remains available until the day it disappears, every day of availability creates new potential dependency. If the system marks the interface as deprecated, continued use becomes a conscious choice.

Deprecation turns persistence from an invisible default into a visible debt.

Civilization needs more states like this.

We tend to imagine binary choices.

The office exists or it is abolished.

The rule is law or it is repealed.

The database is online or it is deleted.

The building stands or it is demolished.

But safe removal often requires intermediate states.

Deprecated.

Read-only.

Archived.

Quarantined.

Revoked for new use.

Scheduled for retirement.

Retained only for legal evidence.

Available through an exception process.

These states allow dependencies to reveal themselves before the final cut.

Software engineers sometimes discover hidden users by announcing an end date.

An API that appears unused suddenly acquires passionate defenders when a deprecation notice appears.

This can be frustrating, but it is valuable information.

The system has performed a dependency query against its human environment.

Who objects when this disappears?

The objections are part of the graph.

This suggests that deletion should often begin as communication.

Not because every stakeholder deserves veto power forever, but because silence before a proposed deletion is stronger evidence than silence before anyone knows deletion is possible.

A service may show zero traffic because telemetry is incomplete.

Announce that it will be shut down in thirty days and the obscure monthly user may appear.

A report may seem unread.

Announce that production will stop and the one team that uses a figure for a regulatory filing may speak up.

An archive may seem irrelevant.

Propose destruction and a historian, investigator, or rights holder may identify value invisible to the operator.

Deletion is partly a discovery mechanism.

The threat of absence reveals attachment.

Software has another useful technique: feature flags.

A feature can be turned off without immediately deleting the code. If nothing breaks, confidence increases. If something breaks, the flag can be restored while the dependency is understood.

Again, the analogy should not be romanticized. Feature flags themselves can become clutter. Long-lived flags create alternate states that engineers must understand. The mechanism designed to make change reversible can become another form of accumulation.

Still, the principle is powerful.

Reversibility changes the politics of removal.

People resist deletion partly because deletion sounds final.

If the first step is disable rather than destroy, the burden of proof changes.

We can test the world without the thing.

That is a better question than arguing indefinitely about whether the world might need it.

This is how empirical deletion differs from ideological deletion.

Ideological deletion begins with the belief that old things are bad.

Empirical deletion begins with a hypothesis that a thing may no longer be necessary and designs a safe way to test the hypothesis.

Turn it off for internal users.

Stop new enrollments.

Revoke new access grants.

Freeze writes.

Redirect traffic.

Archive the old interface.

Measure what complains.

The complaints are data.

This is much closer to science than cleaning.

You are running an experiment on necessity.

The experiment needs observability.

A system cannot safely remove what it cannot observe.

That is why telemetry becomes part of deletion infrastructure.

Who calls this endpoint?

Who queries this table?

Who opens this report?

Which jobs depend on this credential?

Which packages import this library?

Which policies cite this rule?

Which forms contain this field?

Which contracts refer to this standard?

Usage is not the same as justification, but it is evidence.

The absence of usage over a meaningful period can support retirement when combined with ownership, legal, historical, and resilience analysis.

The phrase meaningful period matters.

A payroll process used twice a month is not dead because nobody touched it yesterday.

An emergency system may be valuable precisely because it is rarely invoked.

A tax process can be seasonal.

A legal record can matter decades after creation.

Deletion requires understanding the temporal shape of value.

Software gives us examples of this too.

Some code executes on every request.

Some executes once a year.

Some exists only for disaster recovery.

Static analysis may call something unreachable under ordinary paths while runtime reflection, configuration, plugins, or external consumers tell a different story.

This is why automated dead-code detection is useful and insufficient.

The machine can find candidates.

The institution still has to decide what dead means.

That distinction will become critical as AI agents begin maintaining large systems.

An agent can inspect repositories at a scale no human team can match. It can identify unused imports, duplicate functions, stale feature flags, abandoned configuration, packages with no callers, and services whose traffic has disappeared. It can propose deletions continuously.

This could be one of the highest-value uses of coding agents.

Not writing more code.

Removing code safely.

The economic logic is strong.

If generated code makes software supply abundant, then code volume stops being a sign of engineering investment. A million additional lines can be produced cheaply. The scarce asset becomes a codebase that humans and machines can still understand.

Deletion preserves legibility.

That may sound like aesthetics until the system fails.

During an incident, every alternate path matters. Every stale configuration can mislead. Every forgotten service can become a suspect. Every undocumented dependency can slow recovery. Complexity that seemed free during ordinary operation becomes expensive when the organization needs a correct mental model quickly.

The value of subtraction is often revealed under stress.

A smaller system is not automatically safer or better. A monolith can be simpler in one dimension and catastrophic in another. Redundancy can save lives. Diversity can prevent correlated failure. Old systems can provide fallback paths when new systems break.

The goal is not minimal code.

It is justified code.

That phrase scales beyond software.

Justified rules.

Justified permissions.

Justified records.

Justified infrastructure.

Justified institutions.

The standard is not youth or elegance.

The standard is whether continued existence has a reason strong enough to pay its carrying cost.

Software engineers already know the emotional difficulty of this.

Deleting code can feel wasteful because somebody once spent time writing it.

This is the sunk-cost instinct rendered in text.

The code is evidence of labor. Removing it can feel like erasing the labor.

But the labor is already spent.

The question is what burden the artifact places on the future.

A line of code does not deserve immortality because it was expensive to write.

A policy does not deserve immortality because it was difficult to negotiate.

A building does not deserve immortality because construction was costly.

An institution does not deserve immortality because its founding was important.

History can be preserved without preserving operation.

That distinction is essential.

Version control solved part of the emotional problem for software.

Engineers can delete code because the repository remembers that it existed. The deletion does not destroy history. It removes the code from the active state while preserving provenance in the archive.

This may be one of the most important institutional lessons software has to offer.

We need better separation between active state and historical state.

Too often, civilization keeps things operational because it fears forgetting them.

But operation is an expensive form of memory.

A decommissioned system can be documented.

A repealed rule can remain in the historical record.

A retired process can have its rationale preserved.

A demolished building can be surveyed and archived.

A revoked permission can remain in an audit log.

A destroyed dataset can leave behind evidence of the authority, date, method, and scope of destruction without retaining the sensitive contents themselves.

The archive and the runtime do not have to be the same place.

Software learned this because developers needed to move forward without pretending the past never happened.

Delete from the current branch.

Keep the commit history.

That is not perfect. Version control can retain secrets that should actually be destroyed, and legal or privacy obligations can require purging history too. No analogy eliminates judgment.

But the conceptual split is valuable.

The active world should contain what still needs to execute.

The historical world should preserve what still needs to be known.

Confusing those two purposes is how dead things remain alive.

A civilization with a real delete key would get better at making that distinction.

It would ask of every old artifact:

Does this need to operate?

Does this need to be remembered?

Does this need to be recoverable?

Does this need to be destroyed?

Those are four different questions.

Dead code taught us the first one.

The rest of the world has not yet learned to ask it often enough.