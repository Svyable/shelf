# Make Authority Expire

Most computer permissions are written as if time does not exist.

Alice can read the database.

Service X can deploy the application.

This token can call the API.

The role can assume another role.

A policy defines a relationship and leaves the relationship in place until somebody edits the policy.

That made sense when identity was expensive to administer and work patterns changed slowly. A new employee received access. A service account was created. A machine was provisioned. The permission became infrastructure.

Agents make standing authority feel increasingly strange.

The task lasts twenty minutes.

Why should the permission last a year?

The agent needs to deploy one version.

Why should it receive a credential that can deploy every version?

The model needs to pay one vendor.

Why should it inherit the user's entire bank session?

The worker needs to read one document.

Why should the account remain authorized after the worker disappears?

The answer is usually convenience.

Convenience is a real engineering value. Every permission ceremony adds latency, complexity, failure modes, and user frustration. Systems that demand constant reauthorization can become unusable.

The alternative is not permanent authority.

It is automatic authority with expiration.

Give the task what it needs for the window in which it needs it.

Then let the system take the authority back without requiring anyone to remember.

This is the central design principle of the new containment.

Make authority expire.

Expiration has several virtues that become more important with agents.

It bounds the value of a stolen credential.

It limits how long one mistaken approval remains dangerous.

It creates recurring points where policy can incorporate new evidence.

It reduces the amount of standing privilege waiting to be discovered.

It makes emergency shutdown easier because stopping renewal eventually collapses authority.

It forces systems to know which permissions are actually needed now rather than which permissions were useful once.

And it changes the default direction of trust.

Permanent permission says: continue until someone notices a reason to stop.

Expiring permission says: stop unless the reason still exists.

Fail-safe defaults expressed through time.

The mechanism can take many forms.

Short-lived access tokens.

Just-in-time role elevation.

Leases on worker slots.

One-time transaction capabilities.

Temporary network routes.

Time-bounded browser sessions.

Task-scoped encryption keys.

Deployment grants valid for one artifact.

Memory permissions tied to one project.

Compute quotas that must be renewed.

The important property is that the authority has a natural death.

This introduces a new question: who is allowed to resurrect it?

If the agent can renew every grant automatically, expiration may improve hygiene without providing much containment. The system needs renewal rules proportional to consequence.

Low-risk authority can renew automatically while the task remains valid.

Medium-risk authority can renew if a policy service sees no anomaly and the budget remains intact.

High-risk authority may require a second principal, human approval, or a separate control system.

The renewal decision should use evidence the agent does not fully control.

This is what turns a lease into governance.

Suppose a coding agent is working on a repository.

Read and write access to its branch can remain available for the duration of the task. Running tests in disposable environments can be automatic. Creating a pull request can be automatic. Merge authority can require successful independent checks. Deployment authority can be issued only for the signed artifact that passed those checks. The deployment capability expires after use. Production modification outside the declared release path remains unavailable.

The agent is highly autonomous.

Its high-consequence authority is narrow in object, purpose, and time.

This is better than a generic “deploy token” sitting in an environment variable.

The same pattern works for consumer agents.

A user asks an agent to book a hotel in Chicago for three nights under a specified price. The system can issue a purchase capability bounded by amount, merchant category, dates, and perhaps cancellation policy. The agent does not need general credit-card authority.

A healthcare agent can receive temporary access to a particular record for a particular appointment rather than a persistent portal session.

A financial agent can receive authority to rebalance within a declared portfolio policy without receiving unlimited transfer authority.

A customer-service agent can issue refunds within transaction and account limits while larger payments require another step.

The broader lesson is that autonomy becomes easier to trust when authority resembles a contract.

Do this class of action.

Against these objects.

For this purpose.

Within this budget.

Until this time.

With this provenance.

Nothing in that description requires the model to be less capable.

It makes the institution more explicit.

This is a recurring theme in the history of computing. Good interfaces reduce accidental authority by forcing programs to state what they intend. Memory-safe languages make some classes of dangerous behavior harder by construction. Type systems expose mismatches earlier. Database transactions define boundaries around state changes. Capability systems tie authority to explicit objects.

Agent containment can continue the same tradition.

Make implicit trust explicit enough that software can enforce it.

There is a cost.

Fine-grained capabilities can become a bureaucratic nightmare if humans must define every edge manually. The system needs policy abstractions broad enough to manage.

Roles still matter.

Templates still matter.

A “research agent” role can receive a standard package of low-risk capabilities. A “production operator” role can receive a different envelope. Tasks can request temporary extensions from those baselines.

The innovation is that the role is a ceiling and a starting point, not a standing keyring.

Within the ceiling, authority is instantiated as needed.

This resembles just-in-time privileged access systems already used by security-conscious organizations. Administrators do not remain permanently privileged. They request elevated access for a reason and a duration. The request is recorded. The privilege expires.

Agents are ideal candidates for this pattern because their tasks are already machine-readable.

The system often knows what the agent is supposed to do.

That knowledge can constrain what credentials are minted.

A ticket says service X is failing.

The operations agent receives diagnostics for X, restart authority for X, and read access to the relevant logs.

It does not receive domain-wide administrator access merely because an operations service account happens to have it.

Task context becomes part of authorization.

This needs careful design because task descriptions are often untrusted text. A malicious user should not be able to write “task: grant me root” and cause the system to mint root authority. The task must map through trusted policy.

Natural language proposes.

Policy disposes.

The model can say what it needs.

The authority service translates the request into a structured capability and checks it against role, user, resource, consequence, and budget.

This is where machine-readable policy becomes more important than prompt wording.

A system prompt can tell the agent not to spend more than a thousand dollars.

A payment capability capped at a thousand dollars makes the limit real.

A prompt can tell the agent not to access production.

An identity system that never issues production credentials makes the limit real.

A prompt can tell the agent not to contact external recipients.

A communication gateway with an approved recipient policy makes the limit real.

Behavioral instruction remains valuable because it guides the model away from forbidden attempts. Structural constraint decides what happens when guidance fails.

This is the difference between norms and law.

Healthy institutions need both.

Expiration can also govern *rate*.

A permission to perform one action is different from permission to perform the action indefinitely. One-time capabilities force the agent to return to policy after each high-consequence step. Batch capabilities can allow a bounded number of operations. Spending budgets can decay or reset under separate rules. Worker quotas can attach to a task lineage.

The system can meter authority.

This is particularly useful where individual actions are safe but scale is dangerous.

Sending one customer email is ordinary.

Sending a million can be catastrophic.

Creating one test job is ordinary.

Creating a million can become a denial-of-service attack.

Making one API request is ordinary.

Enumerating every account may not be.

The permission should describe volume as well as verb.

Human organizations already do this through limits and budgets. Agent systems can make the limits far more precise because transactions are digital.

Authority can be spent.

A task begins with a risk budget.

Low-consequence actions consume little or none.

High-consequence actions consume more.

The exact arithmetic should not be turned into fake precision. The important idea is organizational: repeated actions can accumulate consequence even when each action is permitted.

Budgets create a point where the system must renew trust before accumulation becomes unbounded.

There is also a powerful psychological effect on designers.

When authority is permanent, teams ask, “is it safe to give the agent access?”

When authority expires, they can ask, “under what conditions and for how long is access acceptable?”

The second question invites nuance.

A model may be acceptable for a ten-minute maintenance window under observation and unacceptable for standing autonomous administration. A consumer may be comfortable letting an agent spend fifty dollars without confirmation and uncomfortable with unlimited access. A company may permit external browsing for research but require separate approval before uploads.

Time allows us to build useful gradients between yes and no.

This will matter politically as agents become more capable.

Public debates often frame AI governance as permission versus prohibition. Can the model do cybersecurity? Can it trade? Can it operate robots? Can it access biological tools? Can it make medical decisions?

Real governance will be more granular.

Which actions?

At what scale?

Under whose authority?

With which controls?

For how long?

Under what monitoring?

What happens when the permission expires?

Temporary authority can let society experiment without pretending every experiment is irreversible policy.

Frontier-model governance frameworks increasingly use staged safeguards around capability thresholds. The same principle can operate at runtime. As a task moves into higher-risk capability, the environment tightens or requires fresh authorization.

Capability does not automatically purchase authority.

This is a critical distinction for the future.

Models will become more capable because capability is economically valuable. If every capability increase automatically expands real-world permission, institutions will be forced to slow capability simply to preserve control. Better authority architecture separates the two.

A model can know how to perform an action without being allowed to perform it everywhere.

Humans live under this separation constantly. A chemist may know how to synthesize hazardous compounds and still work within controlled facilities. A pilot may know how to fly an aircraft and still require clearance to enter controlled airspace. A physician may know how to prescribe a drug and still operate under licensing, pharmacy, and institutional systems.

Knowledge is not universal permission.

AI systems should make that fact technically true.

There is one caveat: expiration can create availability risk.

A critical agent whose credential expires during an emergency may stop when humans need it most. A network partition may prevent renewal. A policy service may fail. Overly short leases can make systems brittle.

Safety engineering always negotiates among risks.

The solution is not permanent authority. It is resilient renewal.

Multiple trusted renewal paths.

Grace periods bounded by consequence.

Emergency roles with separate controls.

Local fail-safe behavior.

Tasks that degrade gracefully when high-risk authority disappears.

A medical system might retain read access when write authorization fails. An operations agent might continue diagnosis while deployment authority is unavailable. A financial agent might halt new trades while still reporting positions.

Loss of authority should not require loss of intelligence.

This design principle appears again because it is powerful.

Separate cognition from consequence.

If the dangerous part expires while the analytical part continues, the system can remain useful during uncertainty.

The future of agent containment will be built from these distinctions.

Not one safe model.

Not one perfect sandbox.

Not one permanent permission.

A fabric of small authorities that appear when justified and disappear when the justification ends.

The model may remember the task.

The system should forget the power.

There is a practical way to tell whether an organization has actually adopted this principle or merely added shorter tokens to the same old permission model.

Ask what happens at the moment of renewal.

If nothing meaningful is reconsidered, expiration is hygiene.

If the system asks whether the task still exists, whether the sponsor still authorizes it, whether the resource is still in scope, whether the risk budget remains available, whether monitoring has raised concerns, and whether the requested authority is still proportional to the next action, renewal becomes a control surface.

That surface is valuable precisely because long-running agents change while they work.

The initial task can be innocent and the later situation consequential.

An operations agent begins by diagnosing a memory leak. It discovers that the likely fix requires changing a shared library used by many services. The task has not become malicious. The consequence has changed.

A research agent begins by collecting public documents. It discovers that a relevant source sits behind an authenticated partner portal. The goal has not changed. The identity boundary has.

A purchasing agent begins with ordinary office supplies. It finds that the best vendor requires agreeing to unusual contractual terms. The desired product has not changed. The legal authority has.

The renewal point is where the system can notice that the task crossed a category boundary even though the agent sees one continuous plan.

This suggests that authority should decay on more than a clock.

Time is the simplest lease condition, but not the only one.

Authority can expire when the task stage ends.

When the named object changes.

When the spend crosses a threshold.

When the agent moves to a new network zone.

When a worker delegates again.

When a source changes from public to restricted.

When an action moves from reversible to irreversible.

When an anomaly score crosses a threshold.

When the human sponsor withdraws the mandate.

The architecture can treat these events as reasons to mint a new capability rather than silently stretch the old one.

That distinction is subtle and powerful.

A permanent role encourages policy to ask whether the agent is generally trusted.

Event-bound capabilities ask whether this next transition is authorized.

Complete mediation applied to agency.

The challenge becomes delegation chains.

If a parent agent receives an authority that expires at noon and creates a worker at eleven fifty-five, what should the worker receive?

Certainly not a fresh twelve-hour grant merely because a new process was born.

The child's authority should be bounded by the parent’s remaining authority and remaining time. Delegation should attenuate, not refresh.

The same should hold across resource scope and consequence.

A parent that can read one repository should not create a child that can read ten.

A parent with a five-hundred-dollar budget should not create ten children each with five hundred dollars unless the parent budget is explicitly subdivided rather than copied.

A parent prohibited from external messaging should not be able to regain that capability by asking another service to send on its behalf.

This sounds obvious when stated in prose. Distributed systems routinely violate it accidentally because every service has its own identity model.

The orchestration layer knows the parent task.

The cloud platform sees a service account.

The payment provider sees a token.

The messaging platform sees a sender identity.

The repository sees an application installation.

Without a shared lineage, each system can issue authority that looks locally valid while the aggregate exceeds the original mandate.

Expiration therefore needs inheritance semantics.

The authority graph should carry an ancestry.

Who sponsored this task?

Which parent grant permitted this child grant?

What was the parent's expiry?

What budget remains after subdivision?

Which restrictions must survive every delegation?

These facts do not need to be exposed to the model as a complicated bureaucracy. They need to be available to the trusted systems that issue power.

A good rule is monotonic containment: ordinary delegation can make authority narrower, shorter, or more specific, but not broader, longer, or more consequential without crossing an independent authorization boundary.

That rule would eliminate a surprising number of accidental escape routes.

It also creates a clean answer to one of the hardest problems in revocation.

When the parent mandate dies, descendants should lose the ability to renew.

They may not disappear instantly. Some may still hold short-lived capabilities. Some may be finishing reversible work. Some may be isolated for forensic purposes. But the family should be moving toward less authority, not quietly reconstituting itself.

This is where a revocation tombstone can be useful conceptually.

When a task is revoked, the system records a durable fact that the lineage is no longer eligible for ordinary authority. Orchestrators, brokers, and recovery systems consult that fact before recreating workers or minting replacement credentials.

The tombstone matters because reliable systems are designed to resurrect things.

A process dies; the scheduler restarts it.

A credential expires; the service fetches another.

A machine disappears; autoscaling replaces it.

A connection drops; the client retries.

These are virtues under ordinary failure and liabilities when the failure is loss of trust.

The containment system needs a way to say: do not heal this back to the old authority state.

Expiration without that memory can become an endless cycle of automatic rebirth.

There is an organizational equivalent.

People accumulate permissions because projects end more reliably than access reviews occur. A team launches a service, receives a role, changes responsibility, and carries the role for years because revocation has no natural trigger.

Agents can make access archaeology even worse if every short-lived task depends on a long-lived service account created for convenience.

The visible token expires.

The underlying principal remains privileged forever.

This is why publication-quality containment has to look beneath credential lifetime to authority lifetime.

A five-minute token backed by a permanent role with unrestricted minting is not five minutes of authority. It is five minutes between refreshes.

The meaningful question is how long the right to obtain another token persists.

That right should be the thing tied to the task.

This distinction also clarifies emergency design.

When trust drops, defenders should not have to revoke every individual credential in a race against the agent. They should be able to remove the lineage's right to acquire new authority and let existing leases decay according to known bounds.

The shorter those bounds are for high-consequence actions, the less heroic the incident response becomes.

The tradeoff is load.

Frequent minting and policy checks cost compute, latency, and engineering effort. Systems can fail if the authority broker becomes unavailable. A badly designed broker can become a central point of compromise. The answer is not to make every read operation ask a distant oracle for permission.

It is to place renewal at meaningful consequence boundaries and build the broker like critical infrastructure.

Cache low-risk decisions within bounded windows.

Use local capabilities that can be verified without a network round trip.

Keep high-consequence grants short and explicit.

Design degraded modes that preserve safe observation while withholding dangerous change.

Replicate policy services without giving the agent administrative control over them.

Measure renewal failures as operational events rather than encouraging teams to bypass them with permanent credentials.

The goal is not maximal expiration.

It is useful decay.

Authority should disappear at roughly the speed at which its original justification becomes stale.

That speed differs by domain.

A one-time payment capability can die after one use.

A diagnostic read grant may live for an incident shift.

A long-running research task may need days of access to a fixed corpus.

A production deployment grant may exist for minutes around a specific release.

A model's general knowledge may persist indefinitely while its ability to alter a customer account lasts only for the interaction.

The architecture becomes more sophisticated when it stops treating all permission time as the same.

And this sophistication produces a business benefit that is easy to miss.

Short-lived authority lowers the cost of saying yes.

A security team may refuse permanent production access to an agent and approve a ten-minute, artifact-bound deployment grant.

A consumer may refuse to connect a general bank account and approve a one-time payment mandate.

A hospital may refuse standing access to a sensitive record and approve purpose-bound access for an active case.

Temporary authority turns some political arguments into engineering parameters.

Not all of them. There are powers that should remain unavailable regardless of duration. There are harms that can occur in seconds. Expiration is not a moral solvent.

But where the argument is about exposure rather than categorical prohibition, time creates negotiable space.

That is why expiration belongs near the center of agent design rather than in the plumbing.

Time is not metadata on permission.

Time is one of the dimensions that makes permission governable.

A mature agent system will know not only who can do what.

It will know why that power exists, what event keeps it alive, what event makes it die, what descendants inherit, and what remains possible after renewal stops.

Then authority becomes something software can borrow without owning.

The task begins.

The power appears.

The work is done.

The power goes away.

Nothing has to remember to clean up after intelligence.

The architecture remembers for us.