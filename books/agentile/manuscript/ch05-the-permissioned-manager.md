# The Permissioned Manager

Delegation sounds simple when the delegate is a person.

You tell someone what needs doing.

They ask questions.

They use judgment.

They know, at least roughly, which doors they are allowed to open.

Most organizations hide an astonishing amount of operating logic inside that arrangement.

A manager does not specify every permissible action before assigning a task. The employee arrives with social knowledge, legal obligations, professional norms, organizational context, a sense of what would be embarrassing, and some awareness of which mistakes are reversible. When the situation moves outside that envelope, the employee can stop and ask.

Software has none of that for free.

The moment an agent can do more than recommend, delegation becomes an engineering problem in authority.

What may it read?

What may it change?

Whose identity does it act under?

How much money may it spend?

Which customers may it contact?

Can it create another agent?

Can it approve its own work?

When must it ask?

Who can stop it?

What survives after it is stopped?

The first economic consequence of agentic software is often described as cheaper labor.

The deeper consequence is cheaper delegated action.

But delegated action is valuable only when authority is attached to it in a form the organization can live with.

That makes permission design part of management.

It also makes management more technical than many managers are used to.

A human organization already contains a permission system.

Job titles grant some authority and withhold other authority. Expense policies create spending limits. Bank mandates define who can move money. Procurement rules determine who can bind the company. Badge access limits where people can go. Software roles determine which records can be viewed or changed. Professional licenses permit some people to perform acts that others may not perform. Approval chains slow work down precisely because some decisions are considered too consequential to delegate broadly.

Much of management is therefore a distribution of agency.

Who can cause what to happen?

The question sounds abstract until the answer is wrong.

Give a junior employee the ability to issue refunds without a limit and the company may discover the limit through loss. Give a contractor access to the wrong database and a temporary staffing decision becomes a security incident. Let a salesperson sign terms outside an approved range and a customer conversation becomes a legal obligation.

Organizations respond by creating boundaries.

The boundaries are rarely elegant.

They accumulate through policy, software settings, informal norms, audit practice, training, and memory of prior mistakes. A mature company is full of permissions whose origins nobody can quite remember and exceptions that exist because one executive once needed something done on a Friday afternoon.

Agents enter this inherited landscape.

They do not merely automate the work inside it.

They expose the landscape itself.

A person can be told, “Handle routine customer refunds, but use your judgment.”

An agent needs a more operational definition of routine.

Is routine under fifty dollars?

Under five hundred?

Does the customer need to have purchased before?

Does fraud risk matter?

May the agent refund to a new payment method?

May it combine a refund with a coupon?

What if the account is disputed?

What if the customer threatens litigation?

What if the transaction crosses a jurisdictional rule?

Human discretion once concealed the incompleteness of the policy.

Automation makes the incompleteness visible.

This is one reason companies can overestimate how quickly agents will replace administrative work.

The visible task may be easy.

The authority boundary around the task may be hard.

Consider accounts payable.

Reading an invoice is increasingly tractable. Matching it to a purchase order is a familiar software problem. Checking arithmetic is trivial. Routing an ordinary bill for approval is straightforward.

Paying the invoice is different.

Payment touches bank credentials, fraud risk, vendor identity, cash management, tax records, sanctions controls, duplicate-payment risk, and the possibility that the invoice is fraudulent even though every field looks plausible.

The last mouse click may require less intelligence than the first ten steps.

It carries more authority.

The useful agent is therefore not simply the one that can reason about invoices.

It is the one that can operate inside a carefully designed authority envelope.

That envelope may let it pay approved vendors below a threshold, require a second factor for new bank details, block transfers to newly created beneficiaries, escalate mismatches, and produce an audit trail that allows a human to reconstruct what happened.

The work becomes cheaper only after the organization decides which risks it is willing to delegate.

This gives us a more precise definition of agentile management.

Management becomes the design of delegated authority under uncertainty.

The traditional manager does this socially.

The agentile manager increasingly does it through systems.

That does not mean managers become programmers.

It means the structure of authority has to become explicit enough to be implemented.

The difference matters.

A prompt can say, “Use your best judgment.”

A permission system has to decide whether the agent can send the wire.

The model may be capable of excellent judgment and still be given no power to execute. Another model may be mediocre yet dangerous because it has broad credentials.

Capability and authority are separate variables.

The separation sounds obvious when stated plainly. It becomes slippery in practice because capability is exciting and authority is boring.

A demonstration shows the agent completing a task.

A production system has to decide whether the agent should be allowed to complete the task at 2:13 a.m. for an unfamiliar customer using stale data after a supplier changed its terms.

The demonstration asks, can it?

Management asks, under what circumstances may it?

Those are different questions.

A spreadsheet does not need authority. It calculates.

A search engine does not need permission to alter the source it returns.

A chatbot can remain advisory because the user performs the consequential act.

An agent closes the loop.

It moves from information to intervention.

That is where identity enters.

An organization cannot govern action well if it cannot tell who or what acted.

Human systems solve this imperfectly through names, accounts, badges, signatures, devices, and legal identity. Software agents complicate the picture because a single human may create several agents, an agent may invoke another service, and the action may pass through a chain of models, tools, APIs, and infrastructure providers before anything happens in the world.

Who sent the email?

The employee whose credentials were used?

The agent that drafted and dispatched it?

The software vendor that hosted the agent?

The model provider whose system produced the text?

The manager who authorized the workflow?

Different questions produce different answers.

Technical identity asks which principal authenticated.

Operational identity asks which system initiated the action.

Legal responsibility asks who bears the obligation.

Managerial responsibility asks who was supposed to prevent the mistake.

Agentile organizations need all four.

Current standards work around agents is converging on identity, authorization, auditing, and control because autonomy is not only a model-quality problem. It is a question of attributable authority.

Authority without attribution is hard to govern.

Yet agents make attribution harder because delegation becomes recursive.

A manager tells an agent to prepare a product launch.

The agent creates a task list.

It asks another agent to gather competitor pricing.

A third tool updates a project system.

A fourth schedules meetings.

A fifth drafts customer communications.

One of those systems has permission to publish.

Now imagine the wrong price appears on the website.

The organization needs more than a transcript of the final model response.

It needs the chain.

Which instruction generated the task?

Which data source supplied the price?

Which agent transformed it?

Which policy allowed publication?

Which approval was skipped or satisfied?

Which version of the workflow was running?

Which person owned the exception?

Delegation creates a provenance problem.

The richer the delegation, the more important the provenance.

This is the managerial equivalent of double-entry bookkeeping.

A company does not merely want to know that cash moved. It wants to know why, under whose authority, against which account, with what corresponding record.

Agentic action will require similar institutional memory.

The audit trail is not bureaucratic decoration.

It is what makes scalable delegation believable.

Without it, every failure becomes archaeology.

With it, the organization can learn.

There is a second property that deserves to sit beside identity: reversibility.

Organizations already treat reversible and irreversible decisions differently, even when they do not use those words.

Changing the order of agenda items is reversible.

Sending a draft to an internal colleague is mostly reversible.

Publishing a statement is harder to reverse because copies spread.

Transferring money can sometimes be reversed, but not reliably.

Deleting data may be reversible if backups exist.

Signing a contract may bind the company for years.

Administering medicine, firing an employee, shipping a dangerous component, filing a tax return, or making a public accusation can create consequences that no undo button restores.

An agentile firm should care not only about what an agent can do, but about the reversibility of the consequence.

This creates a useful management heuristic.

Low-consequence, highly reversible actions can tolerate more autonomy.

High-consequence, weakly reversible actions deserve tighter gates.

The heuristic is not a law. A million individually reversible actions can create a large aggregate risk. A tiny irreversible act can be harmless. But reversibility gives managers a better vocabulary than “AI risk” because it attaches control to the work.

Imagine three agents.

The first rearranges an internal project plan.

The second sends personalized discount offers to ten thousand customers.

The third moves cash between bank accounts.

All three may use the same underlying model.

Their permission architecture should not be the same.

The difference lies in blast radius.

Blast radius is the size of the world an action can change before a person notices.

A human employee naturally limits some blast radius because humans are slow. One person can send only so many emails, review only so many accounts, approve only so many refunds, and make only so many mistakes in an hour.

Agents remove part of that natural throttle.

The error does not have to become more intelligent to become more expensive.

It only has to repeat faster.

A wrong judgment made once is a mistake.

A wrong judgment encoded into a workflow is a policy.

That is why rate limits, spending caps, batch sizes, sample review, staged rollouts, and circuit breakers belong in the management conversation. They are not merely security controls. They are ways of limiting delegated consequence while the organization learns whether the system deserves more trust.

This also explains why permissions should often expand through experience rather than arrive fully formed.

A new employee rarely receives every sensitive credential on the first morning. Trust accumulates. The person demonstrates judgment, learns the institution, and earns broader authority.

Agent systems can follow the same pattern.

Start read-only.

Then draft-only.

Then act on reversible internal tasks.

Then act externally within narrow thresholds.

Then widen the thresholds as evidence accumulates.

The progression sounds conservative.

It can be faster than blanket human approval because trust is attached to measured behavior rather than to a permanent category called “human.”

The interesting unit becomes not human versus machine.

It becomes a principal with a history of reliable action under a defined mandate.

That history can support a new kind of organizational credit limit.

Not money borrowed.

Consequence borrowed.

The agent is allowed to create a bounded amount of change before another layer of authority must participate.

This is where the economics get interesting.

A common objection to agents is that human review will swallow the savings.

Sometimes it will.

If every generated action must be inspected line by line by an equally expensive expert, the organization has moved the work rather than removed it. Review can become the new bottleneck.

But review does not have to be uniform.

Human organizations already use risk tiers.

A junior employee may approve a small expense while a capital purchase goes to the chief financial officer. A routine contract may use standard terms while an unusual indemnity clause goes to counsel. A nurse can perform some acts independently while others require physician authorization. An automated trading system may act within limits while exceptional exposures trigger intervention.

Agents can be governed the same way.

The important design question is not whether a human remains in the loop.

It is where the human is placed.

A human can review every action.

Review only exceptions.

Review samples.

Approve categories of action in advance.

Set limits that the agent cannot cross.

Monitor aggregate behavior rather than individual steps.

Require confirmation only when the agent itself detects ambiguity.

Reserve a small set of irreversible actions for explicit approval.

These are different managerial architectures.

They create different costs and different risks.

A system that asks permission constantly can appear safe while teaching the user to click approve mechanically.

A system that never asks can be efficient until it is catastrophic.

Good delegation is neither maximum autonomy nor maximum supervision.

It is calibrated autonomy.

People already understand this intuitively.

A competent assistant who asks whether to buy another box of printer paper is annoying.

An assistant who signs a ten-year lease without asking is alarming.

The value of judgment lies partly in knowing which is which.

Agent systems have to learn that boundary, but the organization also has to encode enough of the boundary that failure does not depend on the model having a good day.

This changes the role of policy.

Traditional policy is often prose written for humans.

“Use reasonable judgment.”

“Protect confidential information.”

“Seek approval for material commitments.”

“Escalate unusual cases.”

Humans interpret these phrases through culture and consequence.

Agents force the organization to translate some policies into controls.

What counts as material?

Which data is confidential?

Which destination is permitted?

What is unusual?

Who is allowed to approve?

The translation will never be complete.

That is precisely why escalation remains necessary.

There will always be cases the rule did not anticipate.

The question is whether the system can recognize the edge of its mandate.

This is a deep managerial skill.

Weak managers delegate tasks.

Strong managers delegate outcomes with boundaries.

They explain what matters, what must not happen, what resources are available, when to ask, and what success looks like. They do not simply transfer activity. They transfer a bounded portion of authority.

Agents make this distinction visible enough to measure.

A badly designed agent often reveals a badly designed management process.

The objective is vague.

The data is fragmented.

Nobody knows who owns the decision.

Approval rules contradict one another.

The exception path is informal.

The organization has no agreed definition of done.

Humans were surviving the ambiguity through conversation.

The agent cannot.

Or worse, it can appear to survive it by improvising.

That is the dangerous case.

A system that fails loudly invites correction.

A system that completes the workflow while quietly making the wrong assumption can scale the mistake.

This is why the agentile firm may value operational design more than the traditional firm did.

The company needs clearer interfaces between intention and execution.

An objective must become a specification.

A specification must become permissions.

Permissions must become actions.

Actions must produce records.

Records must feed review.

Review must change the system.

The loop is managerial, not merely technical.

The organization also accumulates something like permission debt.

Technical debt appears when a system works today by making tomorrow harder. Permission debt appears when authority is granted for a temporary reason and never cleaned up.

A pilot receives a broad credential because the team is small.

The pilot becomes a product.

The product gains customers.

The agent gains more tools.

A second team copies the workflow.

Months later nobody can explain why one service account can read the customer database, modify billing, send email, and create new credentials.

Nothing is broken.

That is what makes the debt dangerous.

The permission graph grows faster than the organization's understanding of it.

Human firms already suffer from this problem. Employees change roles while old access remains. Contractors finish projects but credentials linger. Shared accounts blur attribution. Emergency exceptions become permanent.

Agents can accelerate the accumulation because software delegation is cheap to copy.

The same successful agent gets cloned into another workflow with yesterday's authority envelope attached.

A useful operating discipline is therefore subtraction.

What can this agent stop being allowed to do?

Which permission was used last month?

Which tool is only present because the first prototype needed it?

Which credential could become task-specific instead of permanent?

Which approval can be narrowed from “everything in finance” to “approved vendors under this threshold”?

The mature agentile firm will not only provision authority.

It will continuously retire authority.

That is the difference between a permission graph and a permission landfill.

Separation of duties becomes more important for the same reason.

Organizations learned long ago not to let one person create a vendor, approve the invoice, and issue the payment without oversight. The rule is not an insult to the employee. It is an architecture that limits fraud and mistake.

Agents do not remove the logic.

They can accidentally defeat it.

A single orchestration system may create the vendor, draft the approval, and call the payment tool because all three steps are technically convenient.

From the model's perspective, the workflow is coherent.

From the institution's perspective, three independent controls have collapsed into one software principal.

This is a subtle form of centralization.

The org chart may show several departments.

The permission graph may show one agent with the ability to move through all of them.

That is why the graph deserves to be treated as a management artifact in its own right.

It shows where action can originate, where it can propagate, where it must stop, and where independent judgment still exists.

The organization chart shows reporting relationships.

The permission graph shows consequence relationships.

In a heavily agentic firm, the second may explain operational power better than the first.

This also changes who can manage.

Historically, management often required proximity to the work because the manager needed to observe, coordinate, and interpret what employees were doing. Digital systems weakened that requirement. Agents may weaken it further by making operational state easier to summarize and routine coordination cheaper.

A manager may supervise more activity with fewer status meetings.

That sounds like a simple increase in span of control.

It may be.

But the word supervise can mislead.

The manager is not necessarily watching more people.

The manager may be designing a system in which fewer matters require personal attention at all.

This can flatten organizations.

It can also create new managerial specialists.

Someone has to design permissions.

Someone has to define escalation rules.

Someone has to maintain evaluations.

Someone has to decide which agent failures are tolerable.

Someone has to investigate incidents.

Someone has to manage vendor concentration and model changes.

Someone has to understand whether the controls still match the work.

Management does not disappear.

Some of it migrates into governance infrastructure.

That migration has a familiar pattern.

Factories did not eliminate management when machinery became more capable. They changed what had to be managed. Cloud computing did not eliminate operations. It changed operations from racking servers toward configuration, reliability, cost control, security, and vendor management.

Agentic software may do something similar to white-collar coordination.

Less time may be spent asking, “Did you send the follow-up?”

More time may be spent asking, “Why was this system allowed to send that follow-up?”

That is not automatically progress.

Governance can become a new bureaucracy.

Every agent can be wrapped in approvals until the system reproduces the slow organization it was meant to improve.

Security teams can respond to uncertainty by denying useful permissions. Legal teams can require human review for every output. Managers can add agents without removing meetings, producing two coordination systems instead of one.

The organization then pays for autonomy and hierarchy simultaneously.

This failure mode will be common.

New technology tends to arrive inside old procedure.

The early office computer sat on a desk surrounded by paper forms. The early corporate email system coexisted with memos, meetings, and telephone trees. Workflow software often digitized the form before anyone questioned why the form existed.

Agents will initially inherit approval chains designed for humans.

The gains will come later, when organizations distinguish controls that protect something real from controls that merely preserve habit.

That distinction is harder than vendors imply.

Friction can be waste.

Friction can also be a safety mechanism.

A two-person approval for a large payment is slow because slowness is partly the point. It creates separation of duties. A delay before publication can create time for correction. A procurement review can detect conflicts. A legal sign-off can preserve a record that somebody considered an obligation before accepting it.

The agentile organization should not worship frictionlessness.

It should understand what each friction buys.

Then it can redesign the purchase.

Maybe a machine can perform the first fraud screen and humans review only unusual transfers.

Maybe a contract agent can compare a document against approved language while counsel focuses on deviations.

Maybe a support agent can issue ordinary refunds while a supervisor sees only cases above a risk score.

The control remains.

The waiting changes.

That is the bridge to the next chapter.

Queues are often created by authority bottlenecks.

A request waits because only one person can approve it.

A claim waits because the file must be assembled before an adjudicator can see it.

A purchase waits because someone must compare the quote, policy, budget, and vendor record.

A customer waits because the first employee lacks permission to solve the problem.

Some of those waits exist because judgment is scarce.

Some exist because information has to be gathered.

Some exist because an institution has deliberately centralized authority.

Agents can change all three.

They can gather the record before the decision-maker looks.

They can resolve ordinary cases inside a narrow mandate.

They can monitor limits continuously rather than waiting for periodic review.

They can route exceptions to the person whose judgment is actually scarce.

When that works, the queue does not disappear because intelligence became infinite.

It disappears because authority was redesigned.

This is an important distinction.

An agent that can answer every question but cannot act may leave the organization almost as slow as before.

An agent with broad authority but weak controls may make the organization fast in the way a car with no brakes is fast.

The productive middle is permissioned action.

Enough authority to remove routine waiting.

Enough constraint to preserve trust.

Enough observability to reconstruct mistakes.

Enough escalation to admit uncertainty.

Enough revocation to stop the system when conditions change.

Enough reversibility that ordinary errors do not become institutional events.

These sound like software features.

They are becoming features of the firm.

The organization chart showed where people sat.

The permission graph shows where action can originate.

In an agentile economy, the second map may become more important.

The manager's question changes with it.

Not: How many people report to me?

Who, and what, can act on my behalf?

How far can the action travel?

How quickly can I stop it?

And under what terms?
