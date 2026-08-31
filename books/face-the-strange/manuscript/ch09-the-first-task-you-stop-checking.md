# The First Task You Stop Checking

The decisive moment in automation is not when the machine succeeds.

It is when the human stops watching.

The first time you use a new navigation system, you may inspect the route. After enough good trips, you follow the instructions almost automatically. The first time a bank's fraud detector blocks a transaction, someone investigates carefully. Over time, most alerts become part of a process. The first time a new employee performs a consequential task, a manager checks the work closely. The tenth time depends on the employee. The hundredth time often depends on the system around the employee.

Trust becomes visible through reduced supervision.

Artificial agents will cross the same threshold.

At first, users will watch them work.

The agent searches. The human reads the search results. The agent edits a file. The human inspects every line. The agent sends a draft. The human rewrites half of it. The process is described as automation, but the human is still carrying a large monitoring load.

Then performance improves or familiarity grows.

The human begins checking only the final artifact.

Then only unusual cases.

Then only failures.

Eventually, the task disappears from conscious attention unless something breaks.

This is the first task you stop checking.

It matters more than the first impressive demo because it changes the allocation of human attention.

A tool that can save ten minutes while requiring nine minutes of checking is mildly useful. An agent that can perform an hour of work with five minutes of review changes a schedule. An agent that can perform a day of work with reliable automated checks changes a team. A fleet of agents that can perform many bounded tasks while humans supervise only exceptions changes an organization.

This is why measures of agent task horizon are socially interesting.

METR's work estimates, for selected software tasks, the duration of task a human expert would need at which an AI agent reaches a given success probability. The metric is easy to misread. It does not mean the model literally works autonomously for that amount of wall-clock time. It does not establish general competence. It does not tell us what happens in medicine, management, law, parenting, or politics. The task suite has boundaries, and success probabilities matter.

But the metric asks the right kind of question.

How large a unit of work can the machine carry?

Humans delegate in units.

“Look this up” is a small unit.

“Fix this bug” is larger.

“Prepare the quarter-end reconciliation” is larger still.

“Run this product launch” is an organizational unit containing other units.

As AI systems become capable of carrying larger coherent units, the shape of supervision changes.

The important variable is not intelligence in the abstract.

It is the ratio between useful work produced and human attention required to keep it safe.

Call this the supervision ratio.

A system can be very capable and still have a poor supervision ratio if its failures are subtle. Suppose an agent gets nine out of ten research tasks right but the tenth contains a plausible fabricated source that could cause a serious decision error. If checking every citation costs nearly as much as doing the research directly, the automation is less transformative than the raw success rate suggests.

Conversely, a system with modest capability can be highly valuable when mistakes are easy to detect automatically.

This is why software has become such an important arena for agent development. Code can often be compiled. Tests can be run. Static checks exist. Repositories are searchable. Changes can be diffed. Environments can be isolated. Work can be reverted. Many tasks have external feedback stronger than the model's own confidence.

The agent does not need to be trusted in the human sense if the environment can verify enough of what it does.

This is the key to safe delegation: move trust from personality into structure.

Do not ask whether the model seems careful.

Ask what happens if it is careless.

Can the action be reversed?

Is there a deterministic test?

Is the scope limited?

Is there a spending cap?

Does the agent have access only to the resources required?

Will a second system catch a contradiction?

Can the outcome be compared with an invariant?

Is there a log?

Does uncertainty trigger escalation?

These are the machine equivalent of guardrails that have always made human delegation scalable.

We do not trust every employee equally. We design processes so that individual error does not become organizational catastrophe. Junior staff have approval limits. Large payments require multiple signatures. Pilots use checklists. Pharmacists verify prescriptions. Software deployments pass tests. Accountants reconcile independent records. Nuclear systems use redundancy. Institutions learn, often after failure, that reliability is a property of systems rather than personalities.

Advanced AI will make this lesson unavoidable because machines can multiply faster than organizational trust can be earned one instance at a time.

You cannot personally know ten thousand agents.

You can know the control architecture around them.

This is the path from assistant to infrastructure.

At first, a person says, “I use AI for this.”

Later, nobody says it because the process contains AI the way it contains databases, networks, and software services.

The task has left the human foreground.

This is when predictions about job transformation become difficult.

A job is not one task. It is a bundle of tasks, relationships, permissions, tacit knowledge, responsibilities, interruptions, physical actions, and status. The International Labour Organization's work on generative AI exposure emphasizes this distinction: exposure does not equal whole-job automation, and many occupations are more likely to be transformed than eliminated under current assumptions.

But job transformation can still be profound if the tasks that disappear are the tasks that trained people for the rest.

Consider a profession with a long apprenticeship.

Junior workers read documents, prepare drafts, run analyses, check details, and perform repetitive tasks partly because the tasks create familiarity with the domain. Senior workers use judgment built from thousands of those repetitions.

If agents take over the repetitions, the organization receives immediate productivity.

Where does the future expert get the repetitions?

This is the training-pipeline problem.

The first task you stop checking may be the first task a junior worker stops learning.

We should not romanticize drudgery. Many repetitive tasks teach little and deserve automation. People often defend bad work by inventing educational value after the fact. No one needs to manually copy data between systems for character development.

But some boring work is exposure therapy to reality.

The junior lawyer who reads hundreds of contracts develops a feel for clause variation. The young engineer who debugs production failures learns what abstractions hide. The clinician who sees routine cases builds a base rate against which the unusual case becomes visible. The editor who fixes thousands of sentences develops an ear.

If machines perform the first-pass work, institutions need deliberate ways to preserve learning.

This may mean simulation.

It may mean requiring humans to perform some tasks without AI, as some advanced users in Microsoft's 2026 workplace survey reported doing intentionally to keep skills sharp.

It may mean rotating people through review roles where they see machine mistakes rather than machine successes.

It may mean training on adversarial cases generated specifically to expose weak judgment.

The apprenticeship changes from producing every artifact to diagnosing when the artifact cannot be trusted.

That could create stronger experts.

It could also create people who are good at supervising machines they could not replace if the machines disappeared.

Civilization already lives with this pattern.

Few pilots could navigate modern air traffic with the methods of the 1930s. Few accountants would willingly return to handwritten ledgers. Few engineers could manufacture contemporary chips from first principles. Expertise has always depended on infrastructure.

The question is not whether dependency is shameful.

It is whether dependency is understood.

Advanced intelligence will become dangerous where people forget which capabilities are theirs, which belong to the machine, and which belong to the system connecting them.

A team says, “We can handle twenty times as many cases now.”

Can the team handle them if the model is unavailable for a day?

A scientist says, “We can search this design space.”

Can the scientist detect when the model's objective is wrong?

A company says, “Our customer operations are automated.”

Can a human reconstruct a disputed decision six months later?

A person says, “I know how to invest.”

Do they know, or does their agent know?

These questions are not arguments for refusing the technology. They are arguments for keeping the map of dependency current.

The first unchecked task is where the map begins to blur.

There is another reason reduced supervision matters: it changes responsibility psychologically.

When I inspect every step, I experience the outcome as mine.

When I delegate and review only the result, responsibility becomes shared in my mind even if law assigns it entirely to me.

When I stop checking, the outcome begins to feel like something the system did.

This shift will happen before legal personhood and perhaps without it ever happening at all.

We already speak this way about ordinary software.

“The system rejected it.”

“The algorithm flagged me.”

“The computer changed the route.”

Grammatically, agency migrates to the machine because the human cannot see the specific decision-maker.

Advanced agents will intensify this language because they really do contain open-ended selection among actions.

“The agent decided to escalate.”

“The model chose another approach.”

“The system found the problem and fixed it.”

These sentences can be operationally accurate while legally misleading.

Some human or organization still selected the model, set the permissions, defined the process, and accepted the risk.

The challenge is to preserve that chain of responsibility after the human has stopped watching.

This is why auditability will become a central feature of advanced intelligence.

Not explanation in the vague sense of asking the model to justify itself.

A record of what happened.

Which tools were called?

Which data was read?

Which version of the model acted?

Which policy constrained it?

What approvals were obtained?

What external checks passed?

What state changed?

What uncertainty was present?

Can the action be replayed?

The more autonomous the agent, the more important the trace.

Human organizations sometimes preserve less evidence than machines can. Meetings vanish into memory. Verbal decisions become folklore. A persistent agent could create better audit trails than many human processes.

This is an opportunity.

Advanced intelligence does not have to mean opaque action.

It can mean more inspectable action if we design the harness correctly.

The danger is that the volume of traces becomes another form of opacity. A thousand agents each producing detailed logs create a mountain no human will read. We will then use AI to summarize AI behavior.

The checker becomes another model.

This is not necessarily circular. Modern systems already use layers of automation to monitor other automation. Networks monitor networks. Fraud systems monitor transactions created by software. Compilers check code generated by people and machines. Redundancy works when failures are sufficiently independent and checks are grounded in something external.

The principle is crucial: do not ask one model to grade its own homework in the same way it produced it.

Use different methods.

Deterministic tests where possible.

Independent data.

Separate models.

Human sampling.

Outcome monitoring.

Hard limits.

Random audits.

The architecture of trust matters more than the charisma of the agent.

This may be one of the hardest cultural lessons because conversational systems encourage us to judge them socially. The agent says it checked. It sounds confident. It explains the process. The explanation is plausible.

Humans accept plausible self-report from people all the time.

Institutions learned to demand receipts.

Advanced AI needs receipts.

The first task you stop checking should therefore not be the first task with no checks.

Human attention should be replaced by better verification, not by hope.

This is the distinction between autonomy and abandonment.

Autonomy means the system can carry the task while staying inside constraints and producing evidence.

Abandonment means nobody is looking at the process and nobody has built a substitute for looking.

The gap between them will produce fortunes and disasters.

Some companies will automate quickly because the visible labor savings are immediate. The hidden risk accumulates until an incident reveals that nobody understands the machine-mediated process anymore. Other companies will keep humans in every loop and capture little value because supervision cost never falls.

The good organizations will be selective.

They will identify tasks with high verifiability, reversibility, and clear boundaries and delegate aggressively there.

They will keep humans closer to tasks with ambiguous objectives, irreversible consequences, weak feedback, or moral responsibility.

They will change the boundary as systems improve.

This is not one policy called “human in the loop.”

There are many loops.

A human can approve every action.

Approve only high-risk actions.

Set the policy and audit samples.

Review exceptions.

Define objectives.

Own appeals.

Intervene after anomalies.

The amount and location of human attention should match the risk.

Advanced intelligence makes attention programmable.

That is a profound organizational change.

A manager's job has always included deciding where to pay attention. Which employee needs oversight? Which metric deserves inspection? Which customer problem needs escalation? Which project can run without intervention?

Agentic systems turn this into an explicit architecture.

The organization can allocate human attention to uncertainty.

Routine machine work disappears into verified pipelines.

Strange cases rise.

If designed well, humans spend less time on predictable execution and more time where interpretation matters.

If designed badly, humans become exhausted exception handlers for machine systems they did not design and cannot control.

Both futures are plausible.

The difference is method.

There is a personal version too.

The individual will accumulate dozens of delegated tasks. The AI handles scheduling, research, routine correspondence, comparison shopping, travel changes, document preparation, perhaps money within limits. The person begins to live inside an invisible layer of completed work.

This can feel like freedom.

Then something fails.

A reservation was canceled.

A message was sent to the wrong person.

A renewal happened under the wrong terms.

The user discovers that they do not know the history because they stopped reading the agent's reports months ago.

Personal autonomy can increase while situational awareness decreases.

We will need habits for that too.

Daily digests.

Change logs.

Spending summaries.

Periodic permission reviews.

Visible queues of autonomous activity.

Boundaries on what the system may infer from one domain before acting in another.

The personal agent becomes a tiny institution.

And the person becomes its governor.

This sounds exhausting until you compare it with the current burden of managing modern life across dozens of institutions that each demand forms, passwords, deadlines, renewals, settings, and attention. A well-designed agent could reduce that burden enormously.

The point is not to keep humans busy supervising machines for its own sake.

The point is to spend human attention where it actually buys safety, agency, or meaning.

The advanced-intelligence transition will be measured partly by the tasks from which we reclaim that attention.

The first one will feel small.

You will ask the agent to handle something.

Hours later, you will realize you never checked.

Then you will realize you were not worried.

That is the moment automation becomes trust.

And trust, once granted, changes the room more than any benchmark score.
