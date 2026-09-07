# The Race Condition

There is a bug in software called a race condition.

Two processes act at nearly the same time. Each observes a state that will not remain true long enough for its assumption to hold. The outcome depends on timing. A sequence that looked safe when reasoned about one step at a time becomes unsafe when events overlap.

Agent deployment has a race condition of its own.

One company gives an agent more autonomy because the competitor already did.

The competitor expands tool access because customers prefer the product that finishes the job.

A cloud platform relaxes friction because developers route around cumbersome controls.

A model provider ships stronger capabilities because another provider crossed the threshold first.

A regulator begins drafting rules while the deployment architecture changes underneath the draft.

Everyone is responding to a state that is disappearing.

The result is not necessarily recklessness.

It can be rational behavior at every local step.

That is what makes race conditions dangerous.

The containment problem is therefore not only technical.

It is competitive.

A company can know that an agent should have narrow credentials and still face pressure to give it broad ones because narrow delegation is harder to build.

A product team can know that human approval should guard a high-consequence action and still remove the approval because users abandon workflows that stop too often.

A security team can know that open internet access expands the authority surface and still approve it because the product is useless without current information.

A business can know that extensive monitoring is valuable and still reduce retention because observability costs money and raises privacy concerns.

The safest architecture does not automatically win the market.

The easiest architecture often ships first.

This creates a strategic problem for containment advocates.

If safety is implemented primarily as delay, competitors will have an incentive to sell speed.

If safety is implemented primarily as manual approval, competitors will sell autonomy.

If safety is implemented primarily as restrictions on capability, competitors will sell capability.

The long-run winner will be the architecture that makes safety part of performance rather than the opposite of performance.

This is another reason expiring authority matters.

It can reduce standing risk without requiring a human to approve every ordinary action.

A broker can issue task-scoped credentials automatically.

A policy engine can mediate high-consequence actions at machine speed.

Independent evidence can be collected without interrupting the workflow.

Population budgets can be enforced invisibly until a threshold is reached.

Staged execution can let the agent do most of the intellectual work before crossing a consequence boundary.

The better the control architecture, the less the user experiences the control.

That is how containment survives competition.

Good brakes made cars faster, not slower, because drivers could use speed with more confidence.

Reliable transaction systems made electronic finance faster, not slower, because participants could move money without personally verifying every counterparty.

Containerization made software deployment faster in many contexts because isolation reduced the cost of running many workloads together.

Safety can create usable speed.

The race condition appears when companies treat safeguards as temporary scaffolding to be removed once the model looks reliable.

A new agent begins with human review.

Performance improves.

Review catches fewer errors.

Users complain about latency.

The company raises the autonomy threshold.

The agent completes more tasks.

Human reviewers become less familiar with the work because they see only unusual cases.

Eventually the human is technically in the loop but operationally outside it.

Then an edge case arrives that depends on knowledge the reviewer no longer exercises every day.

The control exists on the diagram.

The capability has outrun the institution.

This is automation complacency in a new form.

Aviation, medicine, industrial control, and transportation have all encountered versions of the problem. Automation can reduce routine workload while making the remaining human interventions rarer and harder. The human is asked to take over precisely when the system has entered a state outside the ordinary regime.

Agent systems can make this more severe because the machine may handle entire chains of reasoning before escalation.

The person receives a request at the hardest moment with the least context.

“Approve production override.”

The agent has spent forty minutes exploring the incident.

The human has forty seconds.

This is not meaningful oversight merely because a human clicks the final button.

Competitive products will need better handoff design.

The agent should preserve a compact evidence trail that lets a reviewer reconstruct why the escalation exists.

The policy service should show what changed from normal operation.

The requested authority should be specific.

The human should be able to decline without destroying all progress.

A safe escalation should feel like a well-prepared handoff, not a pop quiz.

This is product quality.

The race condition also appears between firms and regulators.

Rules often regulate the visible form of yesterday's technology.

If regulation says a human must approve every consequential action, companies will develop workflows where approval becomes ceremonial.

If regulation says certain models cannot be used in certain domains, model capabilities may diffuse into smaller or specialized systems that do not fit the category.

If regulation mandates a specific monitoring technique, the technique may become obsolete while the underlying risk persists.

The better regulatory target is often the protected relationship.

High-consequence authority should be attributable.

Critical permissions should be revocable.

Certain decisions should be independently reviewable.

Systems should preserve evidence proportional to consequence.

Agents should not silently enlarge their own mandate.

The organization should be able to bound and report material incidents.

These principles can survive changes in model architecture.

They regulate the authority graph rather than one model family.

That matters because the competitive race will not happen along one line.

One company will build a larger general model.

Another will build smaller specialized agents.

Another will build enormous populations of inexpensive workers.

Another will build an excellent orchestrator around commodity models.

Another will focus on persistent memory.

Another will combine AI with proprietary data and privileged workflows.

Capability will emerge from stacks.

Containment policy that watches only model size will miss the stacks.

The market will care about effective capability.

Governance should care about effective authority.

The two are related but not identical.

A weak model with access to a trusted payment account can cause more immediate economic harm than a stronger model sealed in a research environment.

A modest coding agent with auto-deploy can matter more operationally than a frontier model with read-only access.

A population of cheap agents with persistence and shared memory can become more consequential than one expensive model used interactively.

The competitive advantage often comes from connecting capability to authority.

That is where the safety architecture has to live.

There is a dangerous story companies tell themselves during races.

We can add the controls later.

Sometimes they can.

Software is patchable.

Permissions can be narrowed.

Monitoring can improve.

But authority architecture hardens into product assumptions quickly.

If the first version gives the agent the user's full browser session, downstream integrations will assume impersonation.

If the first version uses standing service accounts, teams will build around them.

If the first version allows children to inherit all tools, workflows will depend on the inheritance.

If the first version treats memory as an undifferentiated permanent store, later deletion and provenance become difficult.

If the first version makes the acting model the only narrator of its actions, independent evidence becomes a retrofit.

Containment debt compounds like any architecture debt.

The race makes debt attractive because debt is speed borrowed from the future.

This is why first principles matter before scale.

Not every safeguard must be complete.

The irreversible choices should be recognized.

Use delegated identities rather than universal impersonation where possible.

Preserve lineage even if monitoring is primitive.

Make credentials expiring even if renewal policy is simple.

Separate evidence storage from the acting workload.

Keep the control plane outside the agent's unilateral authority.

These choices create room to mature later.

The race condition has another actor: labor.

Companies under pressure to automate may deploy agents into workflows faster than organizations redesign roles around them. Humans become supervisors of systems they did not choose, reviewers of outputs they cannot inspect deeply, or exception handlers for failures generated upstream.

This can produce a brittle kind of human-in-the-loop governance.

The company says a person remains responsible.

The person lacks the time, authority, or information to exercise responsibility.

Accountability becomes downstream of control.

That is unfair to the person and unsafe for the system.

A useful principle is that responsibility should follow authority.

If a human is expected to be accountable for the agent's action, the human needs realistic power to understand and stop the action.

If the system moves too fast for meaningful intervention, responsibility belongs higher in the architecture—with the people who designed and authorized the autonomy envelope.

This matters in law, management, and ethics.

“Human oversight” should not become a way to transfer blame to the last person who touched the workflow.

The race also produces information asymmetry between companies and the public.

A product may look like a chatbot while acting like an autonomous operator behind the interface.

A customer may think they approved one task while the system delegated across multiple agents and services.

A company may advertise “human reviewed” without explaining whether humans examine one percent of cases or every high-risk action.

Competitive pressure encourages simple claims.

Trust requires precise ones.

Organizations that can explain their authority architecture may gain an advantage once incidents make the questions familiar.

Does the agent hold standing credentials?

Can it spend money without renewed authorization?

Can it create new agents?

Can it retain secrets?

Can it access the public internet?

Can it modify the systems that monitor it?

Can the customer revoke a task lineage?

These may become ordinary product features, like encryption, data retention, and account security are now.

The companies that built them early will have something to show.

The companies that treated safety as a press release will have promises.

There is no reason to assume competition always weakens safety.

Competition can reward trust.

Enterprise customers prefer vendors that survive audits.

Consumers prefer products that do not lose money or leak data.

Developers prefer infrastructure that fails predictably.

Boards prefer bounded liability.

Insurers prefer measurable controls.

Regulators prefer systems that can produce evidence.

The task is to make the safer architecture legible enough for markets to value it.

This is where standards can help.

A common vocabulary for agent authority could let customers compare products.

Standing versus expiring credentials.

Direct versus brokered tool access.

Open versus restricted egress.

Unbounded versus lineage-level worker creation.

Mutable versus protected audit evidence.

Impersonated versus delegated user identity.

Automatic versus separately authorized high-impact actions.

The point would not be to reduce safety to a score.

Scores can be gamed.

The point is to expose architecture that otherwise remains hidden behind demos.

A race changes when the track changes.

If the market rewards only task completion, companies will optimize task completion.

If buyers, insurers, regulators, and users also reward bounded authority and recoverability, those qualities become part of performance.

This is the political economy of containment.

Safety researchers can discover failure modes.

Security engineers can design controls.

But deployment will happen inside institutions responding to incentives.

The architecture has to survive those incentives or the architecture will not survive.

The race is already under way whenever one team says, “we cannot ship if we keep asking the user.”

The answer cannot be, “then do not ship.”

Not every time.

The stronger answer is, “build the permission so the user does not need to be asked again until the consequence actually changes.”

That is how safety catches up to speed.

A race condition is fixed by making the sequence safe even when the timing is adversarial.

Agent governance needs the same ambition.

Assume competitors move fast.

Assume models improve.

Assume users demand autonomy.

Assume regulators lag.

Assume some companies cut corners.

Then build a control architecture whose safest path is also the easiest path to operate at scale.

That is the race worth winning.

The practical test is whether a control survives a product review in which every participant wants something legitimate.

The product manager wants higher task completion.

The engineer wants simpler integration.

The security team wants smaller blast radius.

The customer wants fewer interruptions.

The finance team wants lower operating cost.

The executive wants the launch before the quarter closes.

A control architecture that wins only when everyone temporarily stops caring about their ordinary incentives is not durable.

This is why friction deserves to be treated as a safety metric.

Not because less friction is always safer. Some friction is the point. A two-person release rule exists because one person should not be able to make a certain change alone. A cooling-off period exists because speed itself can be dangerous. A physical interlock exists to prevent convenience from overriding geometry.

The question is where friction sits.

Bad friction repeats work without changing consequence.

Approve every email even when the agent is writing to the same internal team under the same mandate.

Reauthenticate for every low-risk read.

Force a human to watch an agent execute steps the policy could enforce deterministically.

Good friction appears at authority transitions.

The first external recipient.

The first irreversible transaction.

The first expansion into production.

The first delegation beyond the parent’s mandate.

The first action that spends past an agreed budget.

The first time a task changes legal or safety category.

This is friction with information content.

It tells the user that something about the relationship changed.

Companies that learn this can make safer products feel faster than less disciplined competitors because the system stops interrupting routine work and becomes strict only where strictness earns its cost.

That is competitive containment.

It also creates a better metric for autonomy.

Instead of counting how many steps happen without a human, ask how many *authority transitions* happen without an independent decision.

An agent may perform ten thousand low-risk steps autonomously inside one well-defined mandate and remain tightly contained.

Another may perform five steps and silently cross from reading data to transferring money.

Step count tells us little.

The shape of delegated consequence tells us more.

This reframing is useful because product teams naturally celebrate longer autonomous runs. “Our agent works for eight hours.” “Our agent completes the whole workflow.” “Our agent operates without supervision.” Those claims may be meaningful measures of usefulness. They become safety claims only when paired with the authority envelope.

Eight hours doing what?

With which credentials?

Able to create which descendants?

Able to change which external state?

What expires if the user walks away?

The race for duration should become a race for bounded duration.

The race for tool count should become a race for mediated tools.

The race for memory should become a race for provenance and withdrawal.

The race for multi-agent scale should become a race for population-level authority control.

In each case the containment feature does not oppose the capability headline. It completes it.

There is a strategic reason companies may eventually prefer this model even without regulation.

Broad ambient authority creates hidden coupling between the agent product and the rest of the enterprise. Every time the company adds a new connected account, service, or browser session, the agent's practical reach can change. Product performance becomes dependent on infrastructure accidents nobody on the model team intended.

Narrow mandates decouple systems.

The agent team knows what authority its product can receive because the broker defines it. The identity team can change unrelated privileges without silently changing agent behavior. A customer can adopt the product in one workflow without handing it every future workflow. Security reviews become more reusable because the architecture has stable boundaries.

Containment reduces integration entropy.

That can be worth money even when nothing goes wrong.

The race condition also appears inside large companies between teams with different deployment speeds.

A central security group may write a careful agent policy. Individual product teams face customer deadlines and discover that the standard broker lacks one tool they need. They create an exception. Another team copies it. Six months later the official architecture remains beautiful while production runs through a growing shadow layer of direct credentials and unmonitored connectors.

This is not solved by demanding more compliance.

The central path has to improve faster than the exceptions reproduce.

Every exception should become product feedback.

Why did the team need direct access?

Was the capability model too coarse?

Was renewal too slow?

Did the human-approval path lack context?

Did a third-party service offer no delegated identity?

Was the logging cost unacceptable?

The answer can reveal where the safe platform needs investment.

A useful internal goal is exception half-life: how quickly can a one-off risky integration be replaced by a supported bounded mechanism?

Again, the exact metric should not become theater. The management principle matters. Containment debt should have an owner and a retirement path, not become permanent architecture because everybody remembers that the launch was urgent.

Competitive pressure also rewards narrative shortcuts.

A company that says “our agents are safe” makes a simpler claim than a company that says “our agents operate under task-scoped credentials, cannot self-expand across defined consequence classes, and preserve independent authority evidence.”

The first phrase fits a billboard.

The second survives procurement.

Over time, mature markets learn to ask for the second kind of answer.

Cloud security moved from vague assurances to increasingly concrete questions about encryption, identity, audit logs, data residency, isolation, and incident response. Payment systems developed vocabulary for authorization, settlement, disputes, and liability. Software supply chains developed vocabulary for provenance and signing.

Agent markets will develop vocabulary for delegation.

The companies that help create that vocabulary can change the race itself.

They can make bounded autonomy legible as quality.

They can give insurers something to price.

They can give regulators technology-neutral control points.

They can give users meaningful choices that do not require understanding model internals.

They can give engineers defaults that are easier to use than ambient credentials.

This is how competition becomes part of the safety system rather than an excuse to abandon one.

A race is dangerous when every participant believes slowing locally means losing globally.

The escape from that logic is not a universal pause that no competitor has reason to honor.

It is an architecture in which moving fast does not require borrowing authority forever.

Make delegation cheap.

Make boundaries machine-speed.

Make evidence automatic.

Make escalation informative.

Make recovery credible.

Then the fastest product can also be the one with the cleanest mandate.

The race does not disappear.

The track gets better.