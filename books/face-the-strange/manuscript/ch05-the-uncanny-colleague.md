# The Uncanny Colleague

The first machine colleague will not be hired.

It will be enabled.

Somebody with administrative privileges will connect a model to the company's documents, applications, source code, calendars, tickets, customer records, dashboards, or whatever portion of the organizational world the system is allowed to see. A button will appear in software employees already use. A few teams will experiment. Security will negotiate boundaries. Legal will write language. Finance will ask what the usage costs. Managers will encourage it unevenly.

At first, the system will still be described as an assistant.

This is partly branding and partly truth. Most early uses are assistive. The worker asks for a summary, a draft, an explanation, a query, a formula, a piece of code. The machine returns something. The worker remains the obvious center of the task.

Then the interaction changes shape.

Instead of “summarize these documents,” the request becomes “prepare me for tomorrow's customer meeting.”

Instead of “write a test,” it becomes “find why this failure only affects older accounts and fix it without changing the new path.”

Instead of “draft a project plan,” it becomes “work out what is blocking the launch, identify the owners, and prepare the smallest set of decisions we need to make today.”

The difference is not syntax.

The system has been given a piece of work whose path is not fully specified.

That is when the colleague metaphor stops sounding merely cute.

A colleague is not someone who produces text on command. A colleague shares a problem space. They know where to look. They notice dependencies. They carry context from one action to the next. They can return and say the original request was based on a false premise. They have limits you learn through experience. They can be excellent at one class of work and maddening at another.

Advanced agents are moving toward this shape unevenly.

The Anthropic Economic Index in 2026 described a shift in product usage from ordinary conversation toward longer-running agentic tasks. Microsoft workplace research similarly described workers using agents across multi-step workflows, with the most advanced users deliberately deciding what to delegate and what to keep under direct human control. OpenAI's enterprise research framed the leading edge as a movement from assistance toward execution.

All of those sources come from companies building or selling AI systems, so their language deserves skepticism. “Agent” can become a marketing word faster than it becomes an operational reality. Self-reported productivity can overstate durable gains. An impressive workflow demonstration may fail when access controls, messy data, old systems, ambiguous responsibility, and uncooperative reality enter the picture.

But the direction is not difficult to understand.

The model becomes more useful when it can enter the environment where the work actually lives.

A generic assistant can explain how customer support works.

A situated agent can read the ticket, inspect the account history, retrieve the relevant policy, look up the incident affecting the customer's region, draft the response, and prepare the internal escalation.

A generic coding model can explain race conditions.

A situated agent can search the repository, identify all writers to a state field, inspect the failing test, compare recent commits, run a candidate fix, and show the engineer what changed.

Access transforms intelligence.

It also transforms risk.

The assistant that hallucinates a fact may waste ten minutes.

The agent that believes the hallucinated fact and acts on it can change the world it will inspect next.

This feedback loop is the key difference between answer systems and acting systems. Once a model can modify its environment, its errors can become new inputs. A mistaken record creates a misleading record. A bad code change produces a new failure. A poorly worded message changes a relationship. A misclassified request enters the wrong process and may generate downstream actions that all look internally consistent.

Human colleagues create these problems too.

That observation is sometimes used as a defense of agentic AI: people make mistakes, therefore machine mistakes should not disqualify machines.

The comparison is useful but incomplete.

Humans and machines fail differently.

A person can be tired, distracted, resentful, careless, corrupt, inexperienced, overconfident, or simply wrong. A model can be inconsistent across equivalent prompts, overly influenced by context, unable to distinguish a plausible pattern from the actual local rule, or willing to fill a missing fact with a fluent guess. An agent can propagate a misunderstanding at machine speed. A single software update can change the failure profile of millions of instances at once.

The right question is not which kind of worker is morally superior.

It is what control system matches the failure mode.

Organizations have spent centuries building controls around human work. Separation of duties. Review. Approval limits. Training. Licensure. Audit. Access control. Escalation. Logs. Reconciliation. Dual signatures. Checklists. Incident reporting. Probation. Reputation. Firing.

The artificial colleague arrives without most of this social machinery preinstalled.

So companies will reinvent it in software.

An agent gets a permission boundary.

It can read but not write.

It can draft but not send.

It can spend up to a threshold.

It can deploy only after tests pass.

It can modify one environment but not another.

It must ask for approval before external communication.

Its actions are logged.

Certain decisions require a second system or a human review.

Failures feed into evaluation.

This begins to look less like “using AI” and more like designing a new organizational species.

The uncanny quality comes from the mixture.

The machine can be extremely familiar in conversation and extremely alien in labor.

It can be a cheerful presence that responds instantly at three in the morning. It may know the entire documentation corpus better than any employee. It can join twenty projects without experiencing overload. It can duplicate itself for parallel work. It can be reset. It can be updated globally. It may have no meaningful preference about which task it performs. It can maintain perfect politeness across interactions that would exhaust a person.

Then it can make a mistake that reveals the absence of a human world model in a way that shocks the people who had begun treating it as competent.

This irregularity is the source of the uncanny colleague.

We are used to capability bundles.

The colleague who can understand a complicated organizational conflict is likely to know that sending an accusatory message to everyone at midnight is a bad idea. The engineer who can debug a subtle distributed-system failure is likely to know how files and directories work. The lawyer who can interpret a difficult contract is likely to understand that a joke in an email is not part of the agreement.

Human skills correlate because they emerge from shared development and embodied life.

Artificial skills may correlate differently.

A system can be stronger than most humans at one narrow act of reasoning and weaker than a child at a surrounding piece of common sense. The user experiences brilliance and absurdity through the same interface.

This makes trust calibration difficult.

People do not naturally maintain a separate probability estimate for every competence of a colleague. We build global impressions. Smart. Careful. Reliable. Sloppy. Kind. Difficult. Good under pressure.

Those impressions are efficient because human traits have some persistence.

They can be misleading with machines.

A model that performs beautifully in strategic planning may be poor at arithmetic unless tools are available. One that is excellent at code may mishandle a business policy. One that understands the contents of a document may fail to recognize that the document is obsolete. The same system may change after an update without the user retraining their intuition from scratch.

Organizations will need a more granular trust culture.

Not “we trust the agent.”

“We trust this workflow under these constraints with these checks.”

That sounds less exciting because it is engineering rather than mythology.

It is also how the uncanny colleague becomes useful.

The human relationship with a machine at work will be shaped by repetition. The first time an agent completes a task, the user watches closely. The tenth time, less closely. The hundredth time, perhaps not at all unless something looks unusual.

This is exactly how automation earns authority.

We do not inspect the elevator cable every time we step inside. We do not recompute the route a navigation system suggests. We do not verify every arithmetic operation in a spreadsheet. Reliability turns scrutiny into infrastructure.

Agents will seek the same transition.

The difference is that their outputs can be semantically open-ended.

An elevator has a relatively narrow contract. A workplace agent may be asked to “handle this.” The phrase can cover dozens of interpretations. As systems become more capable, the human may supply less detail, because supplying less detail is the source of the productivity gain.

This creates a paradox.

The better the agent gets, the less the user may know about how the work was done.

If I tell a colleague to investigate a problem and report back tomorrow, I do not watch every search, every note, every discarded hypothesis, every informal check. I rely on the colleague's competence. When we delegate to machines, we may recreate this opacity by design.

Tool traces and logs can preserve more evidence than human work leaves behind. In principle, an agent can record every command, query, file read, and action. This is a gift.

In practice, too much trace becomes unreadable.

Nobody wants to inspect fifty thousand tokens of machine activity for each completed task.

So the problem becomes compression.

What did the agent do?

What evidence mattered?

What uncertainty remains?

Which decisions were irreversible?

What changed in the environment?

What should a reviewer inspect if something goes wrong?

The advanced workplace will need answers that are both machine-generated and independently checkable.

This creates new forms of work.

Agent supervisor.

Evaluation designer.

Context engineer.

Permission architect.

Workflow owner.

Incident investigator for machine action.

Some of these titles may never exist formally. The functions will.

A manager who once assigned work among people may allocate work between people and agents. An engineer who once reviewed code may review the evidence an agent used to change code. A lawyer may design which parts of a transaction can be automated and which require accountable human judgment. A finance team may build spending authorities for software actors the way companies already build them for employees and vendors.

This is what it means for intelligence to enter the org chart without appearing on payroll.

The accounting category may remain software expense.

The operational category becomes capacity.

That shift will confuse labor debates because the machine is not a worker in the legal sense while functioning like labor in some production processes. It can be copied like software, rented like infrastructure, directed like a junior employee, and embedded like a feature. It inherits properties from several economic categories at once.

The human experience will be similarly mixed.

You may thank the agent.

You may blame it.

You may complain about it to another person.

You may ask it why it did something.

You may learn its quirks.

You may prefer one model's style.

You may become irritated when a company replaces it with another.

You may feel relief when it takes over tedious work and resentment when it takes over interesting work.

You may compete with a coworker who knows how to direct agents better than you do.

You may discover that a colleague with average technical skill but exceptional machine orchestration suddenly produces at a level the old status system did not anticipate.

The social fabric of work will change before labor law finds language for it.

That does not guarantee a productivity miracle.

Organizations are full of tasks that exist because of organizational dysfunction. Automating them can preserve the dysfunction faster. A machine can produce more reports nobody needs. It can generate more tickets from processes that should be deleted. It can accelerate approvals without questioning why five approvals exist. It can make bureaucracy cheaper and therefore larger.

Advanced intelligence is not the same as organizational intelligence.

The company still needs to choose goals.

It still needs to decide which information matters.

It still needs accountability.

It still needs mechanisms for conflict.

It still needs to distinguish the measurable from the meaningful.

A thousand capable agents pointed at a bad objective can industrialize stupidity.

This is the strongest reason to resist the fantasy that the uncanny colleague simply replaces the human one.

Organizations are not piles of tasks. They are systems of judgment, incentives, relationships, authority, memory, negotiation, and responsibility. Tasks are the visible surface.

Advanced agents will eat into that surface quickly because tasks are where automation is easiest to measure.

The deeper layers will move more slowly.

Then, perhaps, not slowly enough.

As agents participate in more decisions, they begin shaping the evidence humans see. A manager asks for a market analysis; an agent chooses which sources to retrieve. A product team asks what customers want; an agent summarizes thousands of conversations. An executive asks why a metric changed; an agent identifies the likely causes. The machine does not have final authority, but it controls part of the path by which reality reaches authority.

This is organizational power.

The colleague metaphor becomes insufficient again.

A human analyst also filters information, but one analyst does not usually become the same analytical layer across the entire company. A shared AI system can. It can create common language, common assumptions, common errors, and common blind spots at scale.

The very thing that makes it useful—standardized access to broad intelligence—can reduce cognitive diversity.

Companies will need multiple views, adversarial systems, independent checks, and room for people to say the machine's framing is wrong.

The mature workplace will not have one artificial colleague.

It will have an ecology.

Different systems with different permissions. Small agents doing bounded work. Larger models synthesizing. Deterministic tools checking outputs. Humans setting policy. Automated monitors watching actions. External auditors inspecting high-risk processes. Specialized models disagreeing with general ones.

The useful mental picture is not a robot sitting at a desk.

It is intelligence woven into the workflow until the workflow itself begins to think.

That may sound grander than the reality. Much of it will be mundane. Expense reports. Scheduling. Code review. Reconciliation. Procurement. Customer follow-up. Document preparation. Data cleanup. The revolution, if it deserves the word, will arrive disguised as fewer tabs.

Then one day an employee will realize that the machine has been present in nearly every important piece of work that week.

Not as a person.

Not as a button either.

Something in between.

The uncanny colleague is what we call the thing before we learn a better name.
