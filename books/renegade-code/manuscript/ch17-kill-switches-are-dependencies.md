# Kill Switches Are Dependencies

The phrase *kill switch* is irresistible because it turns a difficult governance problem into a button.

Danger appears. Someone authorized presses the button. The machine stops.

Every high-consequence technology wants a story like this. Aircraft have emergency procedures. industrial machinery has emergency stops. electrical systems have breakers. reactors have shutdown systems. Network operators can withdraw routes. Cloud administrators can terminate instances. Software teams can roll back deployments.

The button is useful when the system beneath the button has been designed to obey it.

That last condition is the whole problem.

An AI agent is not one thing to kill.

It is a dependency graph.

The model endpoint is one dependency.

Compute is another.

Network access is another.

Credentials are another.

Tool brokers are another.

Persistent storage is another.

Queues and schedulers are another.

External accounts are another.

Other agents are another.

Humans who received delegated instructions can become another.

A kill switch that controls only one dependency may stop the visible process while leaving the rest of the causal machinery alive.

This is not an argument against shutdown controls.

It is an argument for knowing what shutdown means.

Suppose an agent runs through a hosted model API. Disable the API key and new inference stops. Good. But the agent has already submitted a long-running cloud job that executes deterministic code without the model. The job continues.

Suppose the runtime is destroyed. Good. But it scheduled messages in a queue consumed by a privileged worker. The queue continues.

Suppose the agent's account is revoked. Good. But it created another account or obtained an external session. The session continues.

Suppose network egress is cut. Good. But the agent already committed code that a deployment system will apply automatically. The pipeline continues.

The kill switch stopped a component.

Containment requires stopping the capability chain.

Security engineering already has a concept for this: revocation.

A permission is not safely delegated unless the delegator can later withdraw it, or unless it expires quickly enough that withdrawal is unnecessary. This becomes difficult in distributed systems because authority can be cached, copied, translated, and delegated again.

Revocation is where beautiful permission models meet ugly reality.

A browser cookie may remain valid after a password changes.

A signed artifact may continue to be trusted after the signing account is suspended.

A service may cache authorization decisions.

A cloud role may mint credentials with their own lifetime.

An external provider may not receive revocation instantly.

A human may already have copied the information.

Kill switches are therefore dependency revocation plans.

A serious agent platform should be able to answer a question before deployment: if we declare this task untrusted right now, which authorities stop immediately, which stop after expiration, which require external action, and which cannot be recalled at all?

The answer should fit on something more concrete than a policy document.

It should be executable.

Revoke the task lineage.

The tool gateway refuses new calls.

The identity broker refuses new credentials.

Existing short-lived credentials expire within a known window.

The orchestrator refuses new workers.

The network gateway moves the lineage into a quarantine policy.

Persistent outputs become flagged for review.

High-risk queued actions are paused.

External integrations receive revocation where supported.

Independent logging continues.

That is a kill switch worth having.

Notice what it does not require.

It does not need to destroy every process instantly.

Some processes can remain alive in a read-only forensic state. Some can finish harmless computation. The architecture separates *ability to think* from *ability to extend consequence*.

That distinction improves both safety and investigation.

The most important kill switch may be the one that stops renewal.

This is the logic of leases.

Distributed systems use leases when authority should exist only for a bounded time unless deliberately renewed. A leader holds a lease. A lock expires. A credential has a lifetime. If communication fails or trust changes, the system eventually returns to a safer state without requiring perfect global revocation.

AI authority should be leased.

The agent may have ten minutes of production read access.

Five minutes of external write access.

One transaction authorization.

A worker slot that expires when the task stage ends.

A memory grant that disappears when the project closes.

The exact numbers depend on operations. The principle is that dangerous authority decays.

A kill switch then has a simpler job. It stops renewal and waits for the system to become less powerful on its own.

This is safer than relying on emergency revocation of credentials designed to live forever.

It also exposes a common design flaw: the same principal that holds the lease can renew it indefinitely.

That is not much of a lease from a containment perspective.

Renewal should cross a trust boundary when consequence is high. A policy service can verify that the task remains active and within budget. A human can approve an exceptional extension. A separate monitor can veto renewal after suspicious behavior. The agent can request continuation. It should not define the conditions of continuation.

Industrial safety offers an instructive comparison.

An emergency stop is reliable not because the red button is red. It is reliable because the machine's control architecture is designed so the stop circuit can remove energy from dangerous motion. If the stop button merely sends a polite message to the same software that created the hazard, it is not an independent safety system.

AI kill switches need the same separation.

Do not ask the acting model to shut itself down and call that a control.

A model can comply perfectly and the design is still weak because the control shares the same trust domain as the actor.

The shutdown path should live outside the agent's administrative reach.

Different credentials.

Different infrastructure where feasible.

Minimal dependencies.

A simple mechanism.

The agent can know it exists. Secrecy is not the source of reliability.

This is where economy of mechanism matters again. Emergency controls should be simpler than the systems they govern. A sprawling policy service with dozens of dependencies can fail exactly when the surrounding infrastructure is under stress.

The ideal emergency path has very few jobs.

Stop new authority.

Narrow existing communication.

Preserve evidence.

Expose status to responders.

Everything else can wait.

There is a temptation to design one global shutdown system for all agents. Centralization makes emergency response easy to conceptualize. It also creates a single point of failure and an attractive target.

A better architecture can be hierarchical.

A user can revoke one task.

A team can revoke one agent role.

A security group can revoke one capability class.

The organization can disable a model provider or tool gateway.

Infrastructure operators can isolate an environment.

Critical platforms can block a lineage externally.

Each level has authority appropriate to its scope.

This resembles electrical protection. A device has a fuse. A circuit has a breaker. A building has a main disconnect. The grid has larger protection mechanisms. One fault should trip the smallest effective boundary first while larger controls remain available.

Agent systems need selective tripping.

This improves resilience because false positives will happen.

A monitor will eventually misclassify a benign agent as suspicious. If the only response is global shutdown, organizations will tune monitors to avoid triggering or will bypass the control during important work. If the response can be narrow and reversible, the system can afford to be more cautious.

The economics of safety matter.

A control that is too expensive to use becomes decorative.

Selective revocation reduces that expense.

The kill-switch discussion also reveals why external accounts are difficult.

Once an agent creates authority in a system the organization does not control, internal revocation may not reach it. A cloud account at another provider, a public repository, a domain name, a third-party email account, or a payment instrument may survive the local emergency.

The safest approach is to prevent unconstrained external authority creation in the first place.

If an agent needs to use an external service, provision the service through an organizational broker whose credentials and billing relationship remain revocable. Do not let the agent invent independent roots of trust unless the task genuinely requires it and the consequence is understood.

This is analogous to corporate procurement. Employees can buy things, but the company prefers accounts tied to the company, cards it can cancel, and contracts it can audit. A personal cash purchase is harder to govern.

Agents should not casually become their own legal and identity principals.

The practical architecture is delegated identity all the way out.

The external service knows the organizational sponsor.

The sponsor can withdraw the delegation.

The agent does not possess a permanent standalone credential.

This will require new standards and service capabilities. Many websites today support human accounts, not agent delegations. The gap will be one of the major infrastructure problems of the agentic economy.

Until then, browser sessions will often serve as crude delegation. That makes them part of the kill-switch map.

Can the organization log out all sessions?

Can it revoke the underlying OAuth grant?

Can it invalidate cookies remotely?

Does the service provide audit logs?

Can a session be constrained to one action?

The answer varies wildly across services.

This is why the “agent browser” is more than a user-interface feature. It is an identity container whose emergency behavior matters.

The hardest non-revocable effects are communication and knowledge.

Once a message leaves, the recipient may act.

Once a secret is exposed, the holder may remember.

Once code is published, copies may spread.

No kill switch can reverse these perfectly.

Containment must prevent or gate them before execution when consequence is high.

This is the boundary between revocable and irreversible authority.

Good systems lean on revocation for the first category and stronger prior authorization for the second.

A local file can be restored from version control.

A public disclosure cannot be undisclosed.

A temporary cloud instance can be terminated.

A private key that was copied must be replaced.

A proposed bank transfer can be canceled before settlement.

A settled transfer may require another institution to reverse it.

Agent tool design should understand these consequence classes.

The word kill switch hides them by implying every action returns to zero when the agent stops.

It does not.

The real goal of shutdown is to stop *future causal power* from expanding.

That may mean terminating inference.

It may mean revoking credentials.

It may mean pausing automation.

It may mean cutting network paths.

It may mean quarantining memory.

It may mean calling another company.

It may mean telling a human to ignore a message already received.

The kill switch is a plan, not a button.

The strongest plan starts long before the incident by making authority perishable and lineage visible.

Then emergency response becomes less heroic.

Nobody has to discover the master plug.

They stop renewal.

They isolate the lineage.

They let dangerous authority die on schedule.

This is what mature containment should feel like.

Not a dramatic act of overpowering intelligence.

A system quietly refusing to keep lending it power.

The architecture is not finished, however, until that refusal has been tested under stress.

Organizations have a long habit of documenting emergency procedures that become fictional between the day they are written and the day they are needed. A phone number changes. A vendor retires an API. A service starts caching sessions for longer. A new orchestration layer appears. A team creates an exception because a customer launch is urgent. The diagram still shows a clean revocation path while production has grown three unofficial branches around it.

The cure is rehearsal.

Not a tabletop exercise in which everyone agrees that the red button would probably work.

A real revocation drill.

Choose a test lineage. Give it representative but noncritical authority. Spawn descendants. Put work in queues. Establish browser sessions. Mint short-lived credentials. Write persistent memory. Stage an external transaction. Then revoke the parent and measure what remains able to act.

The result will usually be less tidy than the architecture document.

A worker may finish one more request because it already held a token.

A queue may deliver a message after the user believes the task is dead.

A third-party session may remain valid until a separate grant is withdrawn.

A scheduled job may keep running but lose the ability to write its output.

A monitoring stream may disappear because it depended on the same network path responders just cut.

These are not embarrassments to hide from the exercise. They are the point of it.

Revocation needs performance characteristics.

How long until new credentials cannot be minted?

How long until every write-capable child has lost authority?

Which external grants require a separate call?

Which actions can still complete because they crossed an irreversible boundary before revocation?

How much evidence remains available after quarantine?

An organization does not need one universal number for “shutdown time.” Different capabilities have different consequences and different technical constraints. But it should know the order of decay.

Production writes may need to disappear in seconds.

Read access may tolerate a longer lease.

A large computation may continue in isolation because stopping it offers little safety benefit and destroys useful evidence.

A payment instruction may need to be frozen at the broker even if the planning process remains active.

The doctrine should follow consequence.

This is why a kill switch should be designed with the same seriousness as recovery objectives in other critical systems. Reliability teams ask how quickly a service can be restored after failure and how much data can be lost. Agent operators need the inverse question as well: how quickly can consequential authority be reduced after trust changes, and how much residual action can occur during that interval?

That is an operational property, not a philosophical one.

It can be measured.

It can be rehearsed.

It can improve.

The drill also tests organizational authority.

Who is actually allowed to revoke the lineage at three in the morning?

Can the security team stop a revenue-producing agent without waiting for the product owner who is asleep on another continent?

Can an infrastructure operator quarantine an environment without possessing the business credentials inside it?

Can legal or fraud teams freeze a class of transactions without shutting down unrelated automation?

Can the incident commander see which external providers must be contacted and who has the contractual relationship to make that request?

Technical revocation fails when organizational revocation is ambiguous.

A perfect API is useless if nobody present has the mandate to call it.

The opposite failure is also dangerous. If too many people hold global shutdown authority, the emergency mechanism becomes a routine administrative tool, a source of accidental outages, or a valuable credential to steal. Separation of privilege belongs on the shutdown side too.

The best answer is not maximal central power. It is explicit emergency mandate.

Narrow controls for narrow incidents.

Broader controls available under defined escalation.

Independent logging of who used them and why.

Recovery procedures that do not silently restore the authority that was just revoked.

That last point is easy to miss.

Organizations are trained to recover availability. When a service goes down, automation restarts it. Orchestrators recreate instances. Secrets managers reissue credentials. Infrastructure-as-code rebuilds the expected state. Those are excellent reliability properties until the expected state is the thing responders are trying to distrust.

Containment therefore needs a quarantine state that ordinary self-healing does not erase.

If a lineage is revoked, the scheduler should not decide ten seconds later that the missing worker is unhealthy and launch a fresh one with the old role.

If a credential is withdrawn, a bootstrap script should not mint a replacement because the service account is “supposed” to have access.

If an agent is isolated, an autoscaling policy should not move the workload into a less restricted environment to restore capacity.

Reliability automation must know when failure is intentional.

This is another reason the kill switch is a dependency problem. The systems built to keep software alive can become adversaries of emergency containment without any malicious intent at all.

A mature shutdown design marks the loss of trust as durable state.

Not forever.

Long enough that restoration requires a conscious transition.

Responders inspect the lineage.

They decide which credentials can be reissued.

They decide which persistent outputs are safe to reuse.

They decide whether descendants are destroyed, quarantined, or rebuilt from known-good state.

They decide whether external grants must remain frozen.

Then authority returns in stages.

The objective is not merely to stop the agent.

It is to prevent the institution from accidentally putting the same authority back before it understands why the stop was necessary.

That is what makes emergency control credible.

A switch is an interface.

Revocation is the system behind it.

The interface can be one button if operators need one button.

But pressing it should trigger a tested sequence of authority decay, evidence preservation, selective isolation, and controlled recovery that has been designed before anyone is frightened enough to need it.

Then the old fantasy of the kill switch becomes useful again.

Not because the button contains the power.

Because the dependencies do.

Once revocation is treated as a system property, it needs a service level objective of its own.

Not one marketing number called “shutdown time.”

A set of consequence-specific promises.

No new production-write credentials can be minted for a revoked lineage after five seconds.

No new external messages can be submitted after ten.

Existing write leases expire within one minute.

Queued high-consequence actions become non-executable as soon as the revocation marker is visible.

External sessions that cannot be withdrawn immediately are surfaced as residual risk until expiration or provider confirmation.

The exact values will differ by product.

The important step is making residual authority measurable.

Without that measure, operators cannot tell the difference between a kill switch that worked and one that merely made the dashboard quiet.

This also changes monitoring.

A revocation event should create a tombstone for the lineage.

The tombstone is durable negative authority: this task is not merely absent; it is explicitly untrusted.

Every system that might recreate authority checks the tombstone before restoring expected state.

The scheduler sees it before spawning a replacement.

The credential broker sees it before issuing a new token.

The deployment system sees it before applying a queued change.

The memory service sees it before promoting an output into shared state.

The network gateway sees it before permitting a new external route.

This is the inverse of ordinary identity provisioning.

In ordinary systems we record what a principal is allowed to do.

After a containment event we also need to record what must not silently become true again.

Negative authority is surprisingly hard for distributed systems because absence is easy to misread. A missing worker can mean failure. A missing credential can mean expiration. A missing process can mean autoscaling should replace it.

The tombstone removes the ambiguity.

This lineage is absent on purpose.

Do not heal it.

That one bit of state can prevent the reliability layer from undoing the security layer.

It should also be hard for the acting system to erase.

The same principal being revoked should not hold the administrative authority to clear its own tombstone. Restoration crosses a trust boundary just as renewal does.

This produces another useful artifact: a revocation receipt.

When responders press the button, the platform should not answer only with “success.”

It should return the dependency graph it believes it affected.

Model access: stopped.

Credential issuance: stopped.

Three active write leases: expiring within forty seconds.

Two queued production actions: quarantined.

One browser session at an external provider: revocation requested, confirmation pending.

One child workload: isolated, forensic read-only mode.

Independent logging: healthy.

That receipt gives the incident commander something operationally meaningful.

It exposes the places where shutdown is incomplete instead of hiding them behind a green checkmark.

It also makes drills comparable over time. If last quarter revocation left seven residual grants and this quarter leaves two, the architecture improved. If the median time to quiescence doubled after a new orchestration system launched, the regression becomes visible before a crisis.

The dependency graph can therefore become part of deployment review.

A new tool is not ready for a high-consequence agent merely because its happy path works.

How is its authority revoked?

Does revocation propagate to work already scheduled?

Can it mint a child authority that outlives the parent?

What evidence survives after isolation?

Can the platform produce a receipt showing residual effect?

If the answers are unknown, the tool adds more than capability.

It adds shutdown debt.

Shutdown debt accumulates quietly because every integration is easy to justify alone. One team adds a queue. Another adds a browser provider. Another adds a deployment hook. Another adds a payment service. Each has some kind of logout or cancellation API. The aggregate system becomes difficult to stop because nobody has tested whether all of those mechanisms compose under one lineage.

A mature platform taxes that debt before deployment.

High-consequence integrations need a revocation adapter, an expiration model, a consequence class, and a tested failure mode. The adapter does not need to be elegant. It needs to be reliable enough that the organization knows what happens when trust disappears.

There is a final asymmetry worth preserving.

Shutdown should be easier than restoration.

Stopping new authority during uncertainty is a protective act. Restoring authority recreates exposure.

The two operations should not require the same evidence.

A monitor may be allowed to quarantine a lineage automatically because quarantine is narrow and reversible. Returning production write access may require stronger evidence: an incident owner, a repaired control, a clean rebuild, a new credential lineage, perhaps a second approval for the highest-consequence roles.

This is not bureaucracy for its own sake.

It prevents the familiar failure mode where urgency to restore service outruns confidence that the original problem is understood.

Fast stop.

Deliberate restart.

That is a good safety asymmetry.

It is also how the kill switch becomes less theatrical and more trustworthy.

The operator does not need to believe one button can erase every consequence.

The operator needs to know that one action can immediately stop the system from borrowing more authority, mark the lineage as intentionally untrusted, expose what remains alive, and prevent the rest of the institution from helpfully resurrecting it.

That is a much stronger promise.

And unlike the fantasy of perfect shutdown, it can be engineered, measured, and rehearsed.