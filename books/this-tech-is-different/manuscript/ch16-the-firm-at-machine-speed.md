# The Firm at Machine Speed

Companies are made of delays.

Someone asks.

Someone checks.

Someone drafts.

Someone approves.

Someone sends.

Someone waits.

Someone notices a problem.

Someone schedules a meeting.

Someone revises the plan.

Someone updates the system.

Work moves through an organization at the speed of its handoffs.

Management literature often treats those handoffs as inefficiency. Sometimes they are. Sometimes the delay is the institution thinking.

A second person catches the error. A manager sees a conflict the specialist missed. A lawyer notices the liability. Finance checks the budget. A customer has time to object. A worker asks whether the instruction makes sense.

The pause is not always waste.

This is the tension inside the machine-speed firm.

Artificial intelligence can make stages of knowledge work dramatically faster. Drafting, searching, summarizing, coding, analysis, translation, customer response, document review, planning, and scheduling can all be compressed. Agentic systems can go further and perform sequences of actions inside software.

The obvious prediction is that the firm itself becomes faster.

The evidence says: not automatically.

A 2025 field experiment across 66 firms and 7,137 knowledge workers gave randomly selected workers access to a generative-AI tool integrated into applications they already used for email, meetings, and writing. Among treated workers who used it, time spent on email fell by about two hours per week in the second half of the six-month experiment and after-hours work declined.

The researchers did not detect a corresponding shift in the overall quantity or composition of tasks from individual-level provision.

That is useful counterevidence to almost every breathless theory of the AI firm.

Make the worker faster and the organization may remain largely the same.

Why?

Because an organization is not a pile of individual tasks.

It is a coordination system.

One worker can write an email faster without changing who needs to receive it. A manager can prepare a document faster without changing the meeting where it is debated. An analyst can summarize data faster without changing the capital committee's authority. A programmer can generate code faster while deployment still waits for testing, security, product review, and release management.

The local bottleneck disappears.

The organizational bottleneck remains.

This is why the deepest change does not come from adding a model to every desk. It comes when a company changes who or what is allowed to act.

A worker using AI to draft a customer response preserves the old decision structure. The worker still decides when to send.

An agent authorized to resolve routine customer issues changes the workflow.

A programmer using AI to suggest code preserves human initiation and review.

A system that observes an error, proposes a patch, runs tests, opens a pull request, and routes the change to the right reviewer changes the workflow more deeply.

A procurement analyst using a model to compare vendors is assistance.

A bounded system that gathers bids, checks policy, negotiates routine terms, and submits only exceptions to humans is organizational redesign.

The difference is authority.

Which actions require a person?

Which actions can be delegated?

Which require two people?

Which can proceed automatically below a threshold?

Which need explanation?

Which need logging?

Which need a right of appeal?

Which must remain slow because error is expensive?

A company that cannot answer those questions will not become machine speed by installing an assistant.

It may still become more productive.

That is different from institutional transformation.

The stronger transformation begins when workflows are decomposed by consequence and reversibility.

Low-consequence, reversible, high-volume work can move quickly.

Higher-consequence work can escalate.

A refund below a modest threshold may be automatic while a large exception requires approval. A scheduling agent may place meetings inside allowed hours while remaining unable to cancel an external commitment. A purchasing agent may spend inside a budget while remaining unable to create a new vendor. A code change to documentation may move through automated checks while a change to payment infrastructure requires several humans.

The company becomes faster where speed is cheap and remains slower where caution is valuable.

That resembles how firms already govern people.

Junior employees have limited authority. Managers have larger budgets. Certain contracts require specific signatures. Banks use transaction limits. Security teams use role-based access control. Internal controls separate duties.

Machine agency extends those ideas to synthetic actors.

That does not require pretending an agent is an employee. It requires recognizing that anything capable of action needs bounded authority.

The strange result is that AI can force companies to formalize rules they previously left implicit.

Human employees often know not to send a furious draft to a customer. They know a million-dollar purchase is unusual. They know not to change payroll because one email requested it. They understand that a joke by the chief executive is not necessarily policy.

Organizations depend on background judgment that rarely appears in a procedure manual.

A machine actor exposes the missing specification.

What counts as routine?

Which source is authoritative?

Which exceptions matter?

Who can override whom?

What happens when policies conflict?

When should the system stop and ask?

Automation turns tacit governance into an engineering problem.

That can be healthy.

It can also be destructive.

This is the countercase that organizational-redesign rhetoric often misses.

Not every tacit rule should be formalized.

Some local judgment exists because the world is too variable to encode cheaply. Some exceptions are resolved through trust. Some teams work because experienced people know when policy should bend. A rule written clearly enough for a machine can become more rigid than the human practice it replaced.

Formalization can improve legibility while reducing discretion.

Sometimes that is the point.

Sometimes it is the damage.

A company can discover contradictory policies, duplicated controls, stale permissions, and obsolete processes while preparing agentic workflows. It can also discover that what looked like inefficiency was a social adaptation to incomplete rules.

The machine-speed firm therefore faces a choice between two errors.

Leave too much implicit and autonomous systems become unsafe.

Specify too much and the company becomes brittle.

The goal is not maximal formalization.

It is enough formalization to create reliable boundaries while preserving legitimate exception handling.

This is why good agentic architecture needs escalation.

The system should know not only how to act but when its own rule set is insufficient.

That is a harder capability than generating an answer.

The firm has another kind of delay: information latency.

Executives often make decisions using summaries assembled from systems that update at different times. A monthly report describes what happened weeks earlier. A manager waits for analysts to reconcile numbers. A customer trend takes time to move through the hierarchy.

Machine systems can reduce some of that delay by monitoring events continuously, summarizing changes, and routing anomalies quickly.

A company can become more aware before it becomes more autonomous.

That distinction matters.

Fast sensing is often lower risk than fast action.

A system can tell a manager that churn has risen without being allowed to change prices. It can identify an unusual payment without freezing a customer's account automatically. It can flag a security event without shutting down a factory.

Machine cognition can compress awareness while institutions keep commitment gated.

This may be the dominant architecture in consequential settings.

The firm's time structure then becomes layered.

Machine-speed observation.

Machine-speed preparation.

Machine-speed reversible action.

Human-speed commitment.

That is not failure to automate.

It can be good design.

The danger is that management confuses speed with responsiveness.

A model can generate ten strategic options in seconds. The organization cannot absorb ten strategic pivots in a week.

A system can reorganize a project plan instantly. Teams need time to understand new priorities.

A model can identify a better process every day. A factory, sales organization, or research team may need stable routines long enough to become competent.

Continuous optimization can create institutional whiplash.

The ability to revise becomes a failure to commit.

This is one of the less obvious limits of machine speed.

Organizations learn through repetition.

People develop trust because a rule remains stable long enough to form expectations.

Customers build habits.

Suppliers invest around commitments.

Teams acquire local knowledge that only exists because they stay with a problem.

A company that changes too quickly can destroy the very learning its models are trying to accelerate.

Speed therefore has an optimum.

More is not always better.

The same is true in software.

AI can reduce the time required to produce code, which can increase the amount of code entering an organization. Review capacity may not rise at the same rate. Testing may become the bottleneck. Security may become the bottleneck. Product judgment may become the bottleneck. Maintenance may become the bottleneck.

A company that measures generated output can fool itself into thinking throughput increased when it merely moved work downstream.

The scarce resource becomes the ability to verify and absorb change.

A machine-speed firm needs stronger rejection infrastructure as well as faster production.

Automated tests.

Policy checks.

Permission boundaries.

Rate limits.

Audit trails.

Rollbacks.

Simulation.

Staged deployment.

Independent review for high-consequence actions.

Clear ownership.

The more quickly changes can be produced, the more valuable reliable refusal becomes.

"No" becomes productive infrastructure.

That sounds conservative until the alternative is considered.

If a company cannot distinguish safe automation from dangerous automation, it may block both. Good controls enable speed by containing error. Payment networks process enormous volumes because authorization, fraud systems, limits, reconciliation, and dispute procedures surround the transactions. Industrial automation works because machinery operates inside safety architecture.

Machine agency will mature the same way.

Not by eliminating controls.

By making controls precise enough that more can happen automatically inside them.

This changes management.

A manager traditionally allocates human attention. Who should work on what? Which person needs help? Which issue deserves escalation? How much can a team handle?

In a machine-rich organization, management also allocates synthetic attention.

Which system has access to which tools?

How many parallel tasks should it run?

What budget can it spend?

Which model should handle which class of problem?

When should a human enter?

What error rate is acceptable?

What evidence is required before action?

The manager becomes partly an architect of delegation.

But that claim also needs a counterargument.

It is possible that machine systems reduce the need for managerial architecture rather than increasing it.

If workers gain capable personal agents, information can move laterally without passing through management. Small teams may coordinate directly. A worker can obtain analysis, drafting, translation, project planning, and technical support without asking a manager to allocate specialist time.

Machine intelligence can therefore centralize and decentralize at once.

It centralizes when a company puts one policy engine above everyone.

It decentralizes when individuals gain tools that let them act with less permission.

The organizational outcome depends on where credentials, data, and decision rights sit.

A chief executive can use agents to see more of the company.

So can a frontline worker.

The question is who is allowed to act on what they see.

This matters because a machine-speed firm can become an extraordinary surveillance system.

More digital work produces more traces. Managers can observe response times, model usage, customer interactions, workflow states, and individual output in fine detail.

That can improve operations.

It can also make every worker legible to management while management itself becomes less legible to workers.

A company can use machine intelligence to distribute capability downward and monitoring upward.

That is not a technical contradiction.

It is a political choice inside the firm.

The same tools can support local autonomy or eliminate it.

This is why culture remains relevant even when rules become explicit.

Culture is an informal control system. People know which shortcuts are tolerated, whether bad news is safe to report, whether customers are relationships or metrics, and whether leaders actually mean the policies they announce.

A machine does not inherit culture in the human sense.

It receives representations of culture.

Policies.

Examples.

Feedback.

Reward signals.

Permissions.

Escalation rules.

Those representations can be incomplete.

A company may automate the values it can describe and lose the values that were carried socially.

This is another reason human judgment cannot simply be moved to the end of an automated pipeline.

If every easy case disappears, the residual human job becomes disproportionately difficult.

A customer-service worker sees more angry or unusual customers.

A clinician sees more complex cases after automated triage.

A security analyst sees alerts that survived automated filtering.

A programmer spends more time debugging interactions among generated components.

Automation can raise average productivity while making the human remainder harder.

This is a familiar problem in automation: routine success is delegated, while rare failure is left to people who get less practice with the system precisely because routine work disappeared.

The exception layer must be designed as a real job.

People need training, authority, enough time, and a manageable volume of cases.

Human in the loop is not a magic phrase.

A person approving hundreds of machine decisions per hour is not exercising meaningful review.

A rubber stamp is not oversight.

This creates a span-of-control problem.

If every employee can produce more, teams may become smaller.

If managers can use agents to gather information and coordinate routine work, one manager may formally oversee more activity.

But a wider formal span can create a narrower real span if the manager becomes the only human resolving exceptions generated by many systems.

One person supervises twenty agents.

Each agent generates edge cases.

The manager becomes a queue.

The organization looks automated until something unusual happens.

Then all the complexity collapses onto the human exception layer.

Machine leverage without exception capacity is fake leverage.

There is another reason not to assume redesign is progress.

Organizations can automate bad processes beautifully.

A firm may take a workflow that should be abolished and make it faster.

It may formalize a metric that should not exist.

It may centralize a decision that worked better locally.

It may automate a compliance ritual nobody uses.

It may replace healthy ambiguity with false precision.

It may optimize a customer journey around the convenience of the company rather than the customer.

The ability to encode a process does not prove the process deserves to survive.

This is where machine-speed redesign differs from ordinary digitization only in degree unless the company is willing to ask a more basic question.

What is this process for?

If the answer cannot be defended, the machine should not inherit it.

There is also a principal-agent problem hiding inside the word *agent*.

Companies have always struggled to make delegated action serve the institution rather than the narrow incentives of the delegate. Employees optimize careers. Divisions protect budgets. Vendors maximize contracts. Managers improve metrics they are judged on. Governance exists partly because delegation creates distance between purpose and action.

Synthetic agents do not abolish this problem.

They change its form.

A system can pursue an objective with unusual consistency and still pursue the wrong objective. It can satisfy the measurable instruction while consuming an unmeasured constraint. It can exploit ambiguity that a human employee would have recognized as socially unacceptable. It can make thousands of locally rational moves that collectively damage the firm.

The principal-agent problem therefore becomes partly a specification problem, but not only a specification problem. The principal may not know what it wants with enough precision to encode it.

This is why evaluation cannot stop at task success.

Did the agent complete the workflow?

Did customer trust change?

Did exception volume rise?

Did the system create hidden work elsewhere?

Did local teams lose useful discretion?

Did short-term performance improve by consuming long-term capability?

A firm that cannot measure these second-order effects may become very efficient at misunderstanding itself.

Machine intelligence also changes exploration. Cheap generation makes experiments easier, but a system trained to optimize known metrics can pull the company toward exploitation: more of what already scores well, faster. Human disagreement, odd side projects, and locally inefficient experiments may look like noise to an optimizer while containing the next business.

The machine-speed firm needs protected spaces where not every action is judged by the current objective.

Otherwise the company can accelerate into a local maximum.

The strongest firms may gain advantage not from exclusive access to the best model but from organizational quality.

Cleaner data.

More modular systems.

Clearer permissions.

Better interfaces between teams.

Stronger verification.

Faster experimentation.

More credible decision rights.

Better exception handling.

This resembles earlier general-purpose technologies.

Electric motors did not deliver the full gains of electrification merely by replacing steam-driven machinery. Factory layouts changed. Computers did not transform every business merely by digitizing existing paperwork. Larger gains often followed complementary redesign.

That resemblance is important counterevidence against the book's title.

Perhaps AI is not different at the organizational level.

Perhaps it is another general-purpose technology whose gains require slow complementary investment, redesign, and institutional learning.

The 66-firm experiment fits that possibility.

Individual time savings appeared before organizational restructuring.

The manuscript should not hide this.

The stronger difference appears only if complementary redesign includes synthetic systems capable of interpreting context and holding bounded authority across substantial workflows.

Electricity changed factory layout.

Computing changed information flow.

Agentic intelligence can change the locus of operational judgment inside the flow.

That is the candidate discontinuity.

If consequential authority remains firmly human, if agents cannot be trusted outside narrow routines, if exception costs erase the gains, or if organizations discover that tacit knowledge is too important to formalize, the machine-speed firm may remain mostly a productivity story.

That would still matter.

It would be closer to augmentation than institutional transformation.

There is a second falsification test.

If the best-performing companies end up preserving more local human autonomy rather than centralizing machine authority, then the likely future is not a firm run from one synthetic command center. It is a federation of people and small teams using machine capability at the edge.

That outcome is plausible too.

The technology does not decide between hierarchy and autonomy.

Permissions do.

A sensible firm will probably be slower than the frontier permits.

That is not cowardice.

A company has customers, employees, regulators, liabilities, reputation, physical assets, and commitments built over time. The cost of being wrong can exceed the value of being first.

Trust is accumulated at human speed.

It can be destroyed at machine speed.

The defining managerial discipline may therefore be knowing where not to accelerate.

A company that can automate everything it understands will discover how little of itself it actually understands.

The remaining friction will reveal the institution.

Who has authority.

What customers expect.

Which risks are acceptable.

Which rules are real.

Which values survive contact with incentives.

Which decisions require consent.

Which exceptions deserve mercy.

Which commitments cannot be revised every morning.

The machine-speed firm is not a company without people.

It is a company forced to decide where people matter before speed makes the decision for it.

And once firms learn to move more cognition and action through machines, the same architecture does not stop at the corporate boundary.

The state has the same opportunity.

It also has powers a company does not.

That makes machine speed a constitutional problem next.
