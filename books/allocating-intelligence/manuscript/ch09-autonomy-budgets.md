# Autonomy Budgets

The word autonomy makes people imagine a threshold. On one side, the machine advises. On the other, it acts.

Real systems have more interesting boundaries. A machine may choose a route but not a destination. It may schedule a meeting but not invite an external person. It may buy office supplies under a limit but not sign a contract. It may change code in a sandbox but not deploy to production. It may recommend a medication but not order it. It may brake a car but not decide where the passenger should travel.

Autonomy is granular.

This is why it is useful to think of autonomy as a budget rather than a category. A budget specifies how much consequence a system can create before another form of authority must enter. The budget can be expressed in money, scope, time, reversibility, affected users, physical force, data sensitivity, or any other dimension relevant to the task.

A purchasing agent might have a daily spend limit. A coding agent might be allowed to modify only a test environment. A customer-service agent might issue refunds below a threshold. A security agent might isolate one endpoint automatically but require human authorization to shut down a data center. The important design move is to connect authority to bounded consequence.

Human organizations already run this way. Employees have signing limits. Managers have hiring authority over certain roles. Pilots have command authority within operating rules. Nurses and physicians have scopes of practice. Corporate boards reserve some decisions. Governments divide powers among offices.

These arrangements exist partly because competence is not the same as legitimate authority and partly because mistakes must be containable.

AI agents need comparable constitutional structure.

The alternative is permission by capability: if the system can do something, let it. Software culture often drifts toward this because technical integration is easier when credentials are broad. An agent with access to email, files, payments, code, calendars, and external services becomes impressive in a demo. It also becomes a single point through which an error or manipulation can cross domains.

Least-privilege security offers a better starting intuition. Give a system the access required for the current purpose and no more. But autonomy budgets add a temporal dimension. An agent may need permission now and lose it later. It may earn wider authority through observed performance. It may have authority only inside a reversible workflow. It may receive emergency powers under explicitly detected conditions.

Authority should have a lifecycle.

SAE’s levels of driving automation became influential partly because they made the human and machine roles explicit. The taxonomy distinguishes who performs the dynamic driving task and who is responsible for fallback under different levels. The details apply specifically to road vehicles, but the broader lesson travels: automation becomes confusing when responsibility is described by marketing terms instead of operational roles.

“Copilot,” “assistant,” and “agent” are similarly ambiguous. An assistant that can send a bank transfer is not merely an assistant. A copilot that changes production systems without review has authority the metaphor hides. Names should not substitute for permission models.

A good autonomy design answers concrete questions. What may the system observe? What may it propose? What may it prepare? What may it execute? What may it execute only below a threshold? Which actions require confirmation? Which actions require a second independent system? Which actions are prohibited? How is authority revoked? What happens if the supervising human is unavailable?

The last question is often neglected. A system designed around human approval can fail during exactly the moments when humans are overloaded. If every ambiguous case escalates during a crisis, the approval queue becomes the crisis.

Autonomy budgets therefore need overload behavior.

One option is fail closed: if approval is unavailable, do nothing. This is appropriate when action itself is dangerous. Another is fail safe: enter a conservative state, such as pausing machinery, freezing transactions, or isolating a system. Another is fail operational: continue within a narrow envelope because stopping would be more dangerous. Aircraft, hospitals, power systems, and networks all contain cases where simple shutdown is not the safest response.

AI governance that says “human approval required” without specifying overload behavior is incomplete.

The budget metaphor also reveals a relationship between autonomy and reversibility. Reversible actions can receive larger autonomy budgets because errors can be corrected. Irreversible actions should receive smaller budgets or stronger verification.

This is why version control transformed software collaboration. A developer can make extensive changes on a branch because the changes are isolated, inspectable, and reversible before merge. The technical environment increases safe autonomy by reducing the consequence of experimentation.

AI systems should create more branches in the broad sense.

Draft before send. Simulate before execute. Preview before publish. Stage before deploy. Hold before transfer. Create checkpoints. Preserve originals. Record planned actions as a transaction that can be reviewed. Sandboxing is not merely a security technique; it is an autonomy amplifier.

The more reversible the environment, the more freedom the agent can have.

This is a constructive alternative to debates framed as freedom versus control. Control mechanisms can create the conditions for greater autonomy. A child is allowed to explore a fenced yard before a highway. A scientist can try dangerous chemistry inside containment. A trader can test a strategy in simulation. A model can use powerful tools inside a sandbox.

Boundaries expand the safe space for initiative.

The difficult cases are actions whose consequences are diffuse rather than obviously irreversible. An agent can send a technically reversible message—perhaps it can be deleted from an outbox—but the recipient may already have read it. A hiring recommendation can be reconsidered, yet candidates may never know they were screened out. A ranking algorithm can be changed, but months of exposure already shaped behavior. Social consequences often resist rollback.

Autonomy budgets must therefore count externality, not just technical reversibility.

An action can be easy for the operator to undo and impossible for the affected person to undo. A credit decision can be reversed in a database after an appeal, but the missed apartment may be gone. A content moderation error can be corrected after an event passed. A false accusation can be retracted after reputation changed.

High social consequence deserves smaller autonomy even when the API offers an “undo” button.

Authority also interacts with observability. A system should not have more autonomy than its behavior can be monitored meaningfully. If an agent performs actions that nobody can reconstruct, its practical autonomy exceeds its nominal permissions. Logs, state views, alerts, and outcome measures are part of the budget.

This is where many current agent systems feel immature. They narrate reasoning in conversational text but provide weak operational visibility. A user sees that the agent is “working” without a crisp inventory of external actions, credentials used, files changed, or commitments made. Natural language creates a sense of transparency while state remains obscure.

Operational autonomy needs ledgers.

Every consequential action should have enough structured record to answer what happened, when, under whose authority, using which input, and whether it can be reversed. Not every internal thought needs preservation. In fact, preserving private reasoning can create privacy and security problems. What matters is the action trail.

This distinction mirrors ordinary institutions. We do not require a judge to publish every private mental association. We require a record of the proceeding and a reasoned decision. We do not record every thought of a pilot. We record relevant flight data and communications. Accountability attaches to acts and justifications, not total mental surveillance.

AI should be held to a similar standard of useful traceability.

The budget can also be earned. A new system begins with narrow authority. As performance is measured in a stable domain, limits expand. This resembles progressive trust among people. But machine trust should not be anthropomorphized. The system has not become morally reliable. The institution has collected evidence about performance under certain conditions.

Evidence can expire.

A model update changes behavior. A new tool expands capability. The environment shifts. Adversaries adapt. Data distributions move. Authority granted under one version should not be inherited automatically by another.

Autonomy therefore needs change control. Significant updates should trigger reevaluation of permissions, not just performance tests. If a model that once drafted messages now can access a customer database, the risk profile changed even if benchmark scores improved.

A stronger model can require a smaller autonomy budget temporarily because novelty increases uncertainty.

This is counterintuitive in a culture that equates capability with trust. But a new aircraft does not receive fewer tests because its engines are more powerful. A new medication does not bypass evaluation because its mechanism is sophisticated. Capability can enlarge the consequence surface.

The same reasoning applies to organizations adopting AI quickly. The first months should create high observational density: more sampling, more logs, more user feedback, more narrow deployments. As evidence accumulates, some controls can relax. Others may tighten because failure modes become visible.

Autonomy budgets are empirical, not theological.

They also encode values. A company may decide an agent can negotiate prices but cannot misrepresent itself as human. A government may decide some determinations require a public officer’s signature regardless of model quality. A family may permit a child’s agent to schedule activities but not conceal them from guardians. A newsroom may let AI prepare summaries but not fabricate quotations or publish unattributed generated reporting.

These boundaries are not technical limitations. They are choices about what kinds of agency belong in the institution.

The most consequential version appears in military force. Autonomous weapons debates show why “human in the loop” language can become slippery when detection, targeting, and response occur at machine speed. The important questions concern meaningful control, accountability, operating constraints, and whether some decisions should remain outside machine authority regardless of tactical advantage. Different societies and institutions will draw boundaries differently. The design principle remains: authority cannot be inferred from accuracy alone.

Some decisions are reserved because of legitimacy.

This may frustrate engineers. If a model is demonstrably more accurate than a human at a narrow decision, why require a person? Sometimes we should not. Human ceremony can add error without adding responsibility. But some decisions bind people in ways that require a recognizable political or professional authority. The human may rely heavily on machine analysis and still perform a necessary constitutional act.

Autonomy budgets force us to say which kind of decision we are dealing with.

They also force users to confront delegation. People will delegate not only because machines are better but because decisions are unpleasant. Firing someone, rejecting an application, negotiating a debt, telling a patient bad news, disciplining a child—these acts impose emotional cost. An agent can become a way to avoid that cost.

The fact that delegation is convenient does not mean it is appropriate.

Some human burdens are part of responsibility. A manager who can terminate an employee through an agent without facing the person may make different decisions. A lender who never hears the applicant’s story may experience risk as a number. A doctor who lets software deliver difficult news may preserve time and lose care.

Allocation of intelligence is therefore also allocation of moral contact.

The right autonomy budget preserves human presence where relationship is part of the service, while automating work that steals time from that relationship. Let the machine prepare the paperwork so the person can have the conversation, not the reverse.

That may be the most useful test. Autonomy should be spent where it expands human agency and preserves attention for responsibilities that cannot be reduced to throughput.

The goal is not a world in which agents ask permission for everything. That would squander their value. Nor is it a world in which capability silently becomes authority.

It is a world of explicit consequence budgets: wide freedom in reversible sandboxes, narrow freedom near irreversible harms, fast machine constraints around fast machine actions, visible state, revocable permissions, and human authority where legitimacy or care requires it.

Autonomy is not something a system has.

It is something an institution lends, within boundaries, for a purpose.

The lending metaphor has one more useful consequence: a loan has terms.

An agent should not receive authority as a vague attribute attached to its identity. It should receive a mandate attached to a task. “Reconcile these invoices up to $5,000 each before 5 p.m., using these vendors, and stop if the purchase order does not match” is a different object from “manage accounts payable.” The first instruction creates a bounded field of action. The second creates an office.

This distinction will matter as agents persist for longer periods. A model that works for ten seconds under a user’s direct gaze can inherit context informally. A model that works for hours, days, or continuously needs written jurisdiction. Otherwise yesterday’s permission drifts into tomorrow’s task.

Time should therefore be part of the autonomy budget. Credentials can expire. Approvals can be single-use. A broad permission can narrow automatically after an incident. An emergency permission can sunset. A task can stop when the stated objective is reached rather than remaining alive because no one remembered to turn it off.

Human institutions learned this lesson through powers of attorney, warrants, contracts, spending authorities, and temporary delegations. The documents are imperfect, but they make authority legible. They say who delegated, to whom, for what, under which conditions, and sometimes until when. Machine delegation needs the same grammar, expressed in forms computers can enforce and people can inspect.

The second term is rate.

A system that is permitted to send one refund may not safely be permitted to send ten thousand refunds per minute. Many failures become catastrophic because authority and speed multiply each other. The action is individually ordinary; the rate is extraordinary. A human clerk with a mistaken rule may make a handful of errors before someone notices. An automated process can reproduce the same error across a population before the first complaint is opened.

Autonomy budgets should therefore include velocity limits. The relevant ceiling may be transactions per minute, emails per hour, code changes per deployment, accounts modified per batch, physical distance traveled, or dollars exposed before a checkpoint. A system that crosses the threshold does not necessarily stop forever. It pauses long enough for another layer of intelligence to inspect what is happening.

This is one reason “human in the loop” can be less useful than “checkpoint in the loop.” A named human reviewer may be asleep, overloaded, or unqualified. A checkpoint can require a second model, a reconciliation against an external source, a sampled human review, a rate slowdown, or a simulation. The control should match the failure mode rather than satisfy a slogan.

The third term is counterparty.

An agent acting only inside a private workspace can receive authority that would be dangerous once it interacts with strangers. External parties can deceive it, manipulate its context, send adversarial instructions, or exploit ambiguity in its mandate. The moment an agent crosses an organizational boundary, its autonomy budget should often shrink.

This is familiar in finance and security. Internal movement and external settlement are not the same event. Reading an invoice is not paying it. Drafting a contract is not accepting another party’s terms. Preparing a message is not transmitting it. The last step crosses a boundary where the other side can act in response.

AI systems should make those boundary crossings visible.

A user should be able to see that the agent is about to create an external commitment, not merely that it is “continuing the task.” The interface can group actions by consequence: internal analysis, reversible preparation, external communication, financial commitment, destructive operation, privileged access. Such categories are more useful than a scrolling transcript of conversational activity.

The fourth term is conflict.

An agent may be authorized to pursue an objective while encountering instructions that point elsewhere. A customer asks it to ignore policy. A document contains text that looks like a command. Another agent claims a higher-priority need. A manager gives a broad goal that conflicts with a legal restriction. Autonomy is tested most seriously not when the path is clear but when mandates collide.

The system therefore needs a hierarchy of authority that does not depend on persuasive wording. Which instruction source outranks which? Which policies cannot be waived by the task owner? When should the system stop and ask rather than invent a compromise? The answer should be encoded before the conflict arrives.

This is less glamorous than agent intelligence and more important. A clever system with ambiguous authority becomes a negotiator with itself.

The fifth term is revocation.

Every autonomy grant should have an emergency brake that operates outside the same cognitive path that created the problem. If the agent must reason its way into agreeing that it should stop, the stop mechanism is not independent. The institution needs a simpler layer capable of freezing credentials, halting execution, isolating tools, or reverting state without negotiating with the agent.

Fast autonomy requires faster containment.

This is where safety engineering and governance meet. The stronger the delegated authority, the more important it becomes that the authority can be withdrawn mechanically. A board can replace an executive. A bank can freeze a card. An air-traffic controller can close a runway. A software operator can revoke a token. These are crude interventions by design. They do not require solving the entire problem before stopping the next consequence.

The final term is evidence.

A budget should expand because the institution has evidence that the system performs acceptably in the relevant operating envelope, not because users have become accustomed to it. Familiarity is a dangerous substitute for validation. The absence of visible disasters may mean the system is reliable. It may also mean no one is measuring the right outcome.

Autonomy reviews should therefore ask what happened to the people and systems downstream. Were refunds correct, not merely processed? Did code changes reduce incidents, not merely pass tests? Did scheduling agents create better use of time, not merely fuller calendars? Did a screening system improve decisions, not merely reduce labor?

The autonomy budget belongs to the whole consequence chain.

This makes the design principle more demanding but also more practical. We do not need to decide whether an AI system is “autonomous.” We need to state the terms of its authority: purpose, scope, duration, rate, counterparties, conflicts, revocation, observability, and evidence.

Once those terms are explicit, autonomy stops being a science-fiction property of machines and becomes what it has always been in institutions: delegated power under conditions.