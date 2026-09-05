# Keep the Manual Gear

The first time you use the emergency procedure should not be during the emergency.

This is obvious in aviation, medicine, firefighting, military training, data centers, and any other place where the cost of improvising under pressure is high. People rehearse rare situations precisely because rarity is what makes them dangerous. The normal routine does not keep the skill alive.

Office work has traditionally been more forgiving.

If the spreadsheet template breaks, someone rebuilds it. If the usual person is out, the task waits. If the software is unavailable, the team complains and tries again later. The manual fallback may be clumsy, undocumented, or resident in the memory of one employee who has been doing the process since 2012.

AI changes the scale of this problem because automation can remove people from the middle of a process very quickly.

A system that used to help with the work begins doing the work.

The human shifts from operator to exception handler.

Then from exception handler to approver.

Then perhaps from approver to owner on an org chart who receives a dashboard and a monthly review.

The process still belongs to a person.

The person may no longer know how it works.

This is where the phrase *human in the loop* becomes dangerously comforting.

A human can be present and useless.

Human-factors researchers have studied versions of this problem for decades. Automation changes attention. People can over-rely on it. They can fail to monitor systems that are almost always right. They can distrust systems after visible errors even when the systems still outperform unaided judgment. Expertise does not make these effects vanish. The relationship between human and automation is itself a system to design.

The AI era gives the problem a friendlier interface.

Instead of a silent autopilot or a flashing decision aid, the automation talks.

It explains.

It apologizes.

It sounds uncertain when prompted to sound uncertain and confident when the language pattern points that way. It can produce a rationale long enough to make an approver feel informed.

That can improve oversight.

It can also create theater.

The robust person and the robust organization need a principle that sounds old-fashioned but is not:

**Keep the manual gear.**

Not every manual gear.

Not forever.

The point is not to preserve a museum of obsolete labor. The point is to retain or reconstruct enough non-automated capacity that a failure in the preferred system does not become a failure of understanding.

The manual gear can take several forms.

Sometimes it is literal skill.

A pilot who can fly the aircraft without a particular automated mode.

A programmer who can inspect and debug code written by an agent.

An accountant who understands the reconciliation well enough to recognize impossible output.

A researcher who can trace a claim to a source without trusting the generated bibliography.

Sometimes the manual gear is a simpler system.

A deterministic calculator after a generative step.

A basic search interface when the agentic research system is unavailable.

A spreadsheet export when the automated dashboard fails.

A queue where a person can process a subset of cases.

A phone tree after the notification platform goes down.

Sometimes the manual gear is not manual at all. It is a less intelligent form of automation that is easier to understand.

Rules. Limits. Templates. A fixed approval route. A smaller model running locally.

The word *manual* matters less than the property: the fallback should not depend on the same thing that just failed.

This is where many backup plans are fake.

The primary agent depends on the cloud provider.

The backup agent is hosted by the same cloud provider in the same region with the same identity layer.

The primary workflow uses one model.

The fallback uses another model routed through the same gateway, same credentials, same retrieval service, and same broken tool.

The organization has redundancy in the diagram and correlation in reality.

A useful fallback is independent along the dimension of failure you care about.

If the risk is model quality, a second model may help.

If the risk is provider outage, it has to be somewhere else.

If the risk is compromised credentials, a second provider using the same identity may not help.

If the risk is bad source data, changing the model does nothing.

If the risk is human overreliance, a backup model may make the problem worse.

Robustness requires naming the failure before naming the backup.

For individuals, the same discipline answers the question of which skills to preserve.

Do not preserve a skill because it is virtuous to suffer.

Preserve it if it performs one of four jobs:

**Steering.** The skill helps you define the goal, choose the approach, or set the constraint.

**Verification.** The skill helps you judge whether the output is plausible, correct, safe, or good.

**Recovery.** The skill lets you continue essential work when the preferred automation is unavailable or untrustworthy.

**Transfer.** The skill helps you learn the next tool because it captures something deeper than the current interface.

These categories are more useful than “hard skill” and “soft skill.”

Take writing.

Spelling by memory matters less than it once did. Formatting a bibliography by hand matters less. Producing grammatically clean first drafts can increasingly be delegated. The durable manual gear is structural judgment: what is the claim, what is the evidence, what has been omitted, where is the argument pretending, what sentence is carrying too much, what would change the conclusion?

Take programming.

Memorizing syntax matters less. Typing boilerplate matters much less. The manual gear includes decomposition, system modeling, debugging, security reasoning, state, interfaces, and the ability to read what the machine produced. If code generation becomes nearly free, understanding changes in relative value.

Take research.

The manual gear is not necessarily searching every database by hand. It is knowing what a primary source is, recognizing a suspicious citation, understanding how evidence quality changes by question, tracking dates, distinguishing a report’s claim from the data underneath it, and being able to reconstruct the trail when the assistant’s synthesis feels too neat.

Take management.

The manual gear is not scheduling every meeting yourself. It is the ability to detect when the schedule is optimizing the calendar at the expense of the team, when a performance summary omits the human event that matters, when a dashboard is measuring throughput instead of value, and when a delegated communication should become a conversation.

These are not backup skills in the sense of returning to 1997.

They are the control surfaces of the automated future.

The hard part is keeping them alive when they are rarely exercised.

A skill you “could do if necessary” decays into a story quickly.

Organizations are especially vulnerable because they confuse documentation with capability.

The procedure exists in the wiki. Can anyone perform it? The password is stored. Does the account still work? The manual form is available.

Can the current volume be processed with it?

The backup supplier is approved.

Has anyone ordered from them this year?

The second model passed testing six months ago.

Does it understand today’s tool schema?

Fallbacks rot at the speed of the primary system’s change.

This is why a robust organization pays a small maintenance cost to exercise them.

Not constantly. That would be wasteful.

Enough.

A monthly sample processed through the human path.

A quarterly provider switch in staging.

A rotating “AI off” exercise for a narrow process.

A requirement that important model-generated analyses occasionally be reconstructed from source without the original synthesis.

A disaster recovery test that actually restores the data.

A new employee trained on the business logic before being handed the automation.

A review in which the person responsible must explain the system’s failure modes rather than merely show the performance dashboard.

These exercises have a second benefit: they reveal when the fallback should be retired.

Perhaps the old manual process has become genuinely impossible at current scale. Good. Stop pretending it is the plan.

Build another plan.

Perhaps the deterministic backup no longer handles the new product. Update it or narrow what it promises.

Perhaps the human skill is so rarely useful and so costly to maintain that the better answer is stronger automated verification plus a specialist on call.

Robustness should delete its own rituals when they stop buying meaningful protection.

That is how it avoids becoming bureaucracy.

There is an uncomfortable implication here for training.

If AI systems become excellent at entry-level work, organizations may remove the very tasks through which people used to become experts.

The junior analyst learned by building the model.

The junior lawyer learned by reading the contracts.

The programmer learned by fixing small bugs.

The radiologist learned through thousands of cases.

The editor learned by cutting weak sentences one by one.

If a machine performs more of that practice, where does expertise come from?

This problem is sometimes framed as a moral obligation to preserve junior jobs.

There may be moral questions, but robustness gives us an operational one.

**Who will be able to verify and recover five years from now?**

An organization can solve the productivity problem and accidentally break the expertise pipeline.

The answer cannot simply be “make juniors do obsolete work for their own good.” People know when they are being given ceremonial labor. The exercise becomes resented and expensive.

Training has to be redesigned around the skills that remain consequential.

Let the machine draft the ordinary contract, then ask the junior lawyer to identify the three clauses most likely to create future conflict and explain why.

Let the coding agent write the implementation, then ask the junior engineer to trace data flow, identify failure modes, write tests, and diagnose an injected bug.

Let AI produce the financial analysis, then ask the analyst to reconstruct the decisive assumption, find the most fragile input, and build the case against the recommendation.

Let the assistant summarize the papers, then require the researcher to open the sources that carry the conclusion.

The training task changes from production volume to discrimination and diagnosis.

That may be a better apprenticeship if designed well.

It will be a worse one if organizations simply remove the beginner and hope experts continue appearing.

The manual gear also protects something more personal: confidence that does not depend on uninterrupted service.

Anyone who has watched a critical application go down knows the sudden helplessness of dependence. Work that seemed like your work becomes impossible because a server elsewhere is having a bad day.

AI can create a more intimate version.

You sit down to write and discover you no longer know how to begin without asking the assistant for an outline.

You face code and feel reluctant to touch it until the agent explains what it does.

You receive a dense document and automatically reach for a summary before reading a page.

Again, none of these behaviors is bad. They may be rational.

The warning sign is loss of choice.

A robust person should be able to say, “I usually use the machine because it is better,” rather than, “I cannot proceed without it.”

Those sentences can describe identical daily behavior and completely different ownership.

Manual competence is expensive insurance.

Buy it where it protects steering, verification, recovery, or transfer.

Let the rest go.

The goal is not to be the last person who can do the old process.

The goal is to remain the kind of person who can still find the controls when the automatic mode goes dark.
