# The Price of Attention

The most expensive person in a modern organization may be the one everyone is allowed to interrupt.

Not necessarily expensive in salary, though the two often correlate. Expensive because an interruption can reroute other people’s work. A chief engineer answers a question and twenty developers change course. A surgeon looks at an alert and a procedure pauses. A regulator reads a warning and a market waits. A parent glances at a phone while a child is telling the part of the story that will not be repeated.

The economics are strange because the sender often pays almost nothing.

An email written in seconds can occupy minutes across fifty recipients. A notification generated automatically may cost almost nothing to produce and interrupt someone whose next minute matters greatly. A dashboard alert can be added by a developer who will never sit in the control room where it sounds. A model can generate ten thousand plausible “insights” without experiencing the fatigue of reading one.

Digital systems learned to spend other people’s attention casually.

Artificial intelligence lowers the cost again.

Before generative systems, writing imposed friction. A person had to prepare the report, summarize the meeting, draft the proposal, write the code-review comment, or turn a vague concern into a paragraph another person could understand. Much of that friction was waste. Some of it was also a volume limit.

When generation becomes cheap, the receiving side becomes easier to overwhelm.

Herbert Simon described the structural problem in 1971: abundance of information creates scarcity in whatever the information consumes, especially the attention of its recipients. The insight survived changes in media because it was never really about paper or screens. It was about asymmetry between the supply of possible messages and the finite ability to notice, interpret, and act on them.

Generative systems intensify the asymmetry because they do not merely retrieve existing messages. They create new candidates on demand.

One proposed slogan becomes fifty. A strategic memo acquires three alternatives, five critiques, a risk register, and a slide deck. A monitoring system can write a summary every hour even when nothing worth interrupting anybody has happened.

Readable language becomes cheap.

Deciding whether the language matters does not.

Clinical alerting shows what happens when a system ignores this difference. Software can monitor more variables than a clinician could watch continuously. That is useful. But a warning that appears too often becomes a weak claim on attention. Clinicians learn, through experience, that many alerts do not require action. The alert still appears on the screen. Functionally, it has been discounted.

The phrase “alert fatigue” can make this sound like a weakness in the human receiver. The deeper problem is economic. The system is minting claims on scarce attention without a hard budget.

Organizations respond by adjusting thresholds. Fewer alerts. Higher sensitivity for the dangerous condition. More specificity where false alarms are common. Then a missed event creates pressure in the other direction.

No threshold solves the problem permanently because interruption is a trade.

To interrupt is to say: stop what you are doing because this new thing is more important.

That claim should have a price.

The price need not be money. A hospital can distinguish severity classes. A monitoring system can batch low-confidence events. A repeated source can face rate limits. An agent can be required to record whether an interruption changed action. A user can inspect which sources are consuming attention and revoke their privilege.

Aviation has long treated warnings, cautions, displays, workload, and automation behavior as a coupled human-factors problem. The crew cannot be asked to treat every indication as equally urgent because the cockpit itself would become the hazard. Emergency medicine distinguishes urgency for the same reason. Computer systems schedule processes because even processors require arbitration.

Human attention deserves at least as much design discipline as processor time.

One way to make this trade legible is to ask about three costs every time a system wants access to attention.

There is interruption cost: what useful state will be destroyed if this arrives now? A five-second alert can cost far more than five seconds if it breaks the working memory needed for a difficult task.

There is omission cost: what happens if the message waits, is summarized later, or never arrives? A payroll error and a mildly disappointing weekly metric do not deserve the same treatment because the cost of delay differs.

There is coordination cost: who else must share the information before action can work? A strategic change that reaches only one manager may create less value than a shorter shared note reaching the entire team.

These costs cannot be calculated perfectly. They include values, uncertainty, and futures nobody knows. But even approximate awareness changes design. It prevents “relevance” from becoming the only criterion.

An item can be relevant and still not deserve interruption.

This is especially important for systems that learn from engagement. If opening an alert teaches the system to send more alerts, a tired user can accidentally train the channel to become more demanding. The system observes attention but cannot easily tell whether the attention was freely given, reluctantly spent, or required to make the interruption stop.

A better attention ledger would record outcomes, not merely opens.

Did the warning change an action? Did the recipient postpone something more important? Was the same information available through a quieter channel? Was the interruption later judged unnecessary? Did repeated low-value alerts teach the user to ignore the source?

Those questions turn notification design into institutional learning rather than permanent escalation.

Without it, an institution can suffer a kind of cognitive denial-of-service.

A denial-of-service attack does not need each request to be complex. Volume is enough. Human organizations can overwhelm themselves accidentally in the same way. A compliance program adds reports until regulators cannot distinguish signal from ritual. A company adds metrics until every team can prove success and nobody can see which measure matters. A manager asks agents to monitor every competitor, customer, employee signal, policy change, and market movement, then receives an executive briefing so comprehensive that reading it becomes a job.

AI makes this failure cheap to create.

It can also become one of the best defenses against it.

A personal agent can act as an attention firewall. It can know that someone is driving, sleeping, writing, grieving, or in conversation and delay most claims on the channel. It can cluster repeated notices. It can notice that five messages are manifestations of one underlying problem. It can hold information until the recipient reaches a context in which action is possible.

This is not merely convenience.

It is scheduling access to a human life.

Time-management advice often frames attention as a private moral problem. Turn off notifications. Practice discipline. Make a list. These techniques can help, but they place responsibility on the person receiving systems that other people designed to interrupt them.

Attention policy begins upstream.

A hospital decides which alarms can sound. A company decides whether meetings default to thirty minutes. A platform decides whether unread badges glow. A school decides whether students are reachable during class. A government decides how many notices a citizen must read to maintain access to a benefit.

Designers make attention policy whether they call it that or not.

Protected attention matters for more than productivity.

Some human work changes character when repeatedly fragmented. Learning a difficult subject, noticing emotional nuance, reasoning through an unfamiliar system, writing, debugging, grieving, and listening all depend on continuity. The cost of interruption is therefore not merely slower completion. It can change what kind of cognition is possible.

An organization that protects only the attention attached to measurable output will miss this. Mentoring can look interruptible until nobody learns the tacit parts of the job. A conversation can look unscheduled until it becomes the moment a serious problem is disclosed. Reading can look like inactivity until it changes the model through which later decisions are made.

Deep attention is not always the scarce resource that should win. Emergencies interrupt for a reason. But it deserves to exist as a protected state rather than whatever remains after every urgent-seeming claim has been processed.

AI complicates the policy because attention is state-dependent.

An hour is not an hour. Fatigue, fear, hunger, stress, context switching, noise, and emotional load change what a person can notice and how well they can reason. A surgeon in the first hour of a planned day and a surgeon in the fifteenth hour of a crisis do not possess interchangeable units of attention. Neither does a citizen reading a tax notice at a desk and the same citizen reading it beside a hospital bed.

A context-aware system can protect against this difference or exploit it.

Advertising has always cared about receptivity. A system with access to personal context may infer when someone is anxious, hurried, lonely, or uncertain and generate the appeal most likely to enter at that moment. The same capability can be used in the opposite direction: delay a financial decision when the person is distressed, surface a medication reminder when action is possible, summarize rather than interrupt, or translate a dense notice into language the recipient can use.

The ethical difference is not whether AI is persuasive.

It is whose objective governs the timing.

This is where attention becomes political economy. Platforms compete for attention because attention can become money, data, influence, or action. Employers purchase slices of it through labor contracts. Families and communities depend on forms of attention that are economically valuable and often unpriced. Democratic institutions ask citizens to spend attention on matters whose benefits are shared and delayed.

AI can make every bid more sophisticated.

A model can write the message in the recipient’s preferred tone. It can choose the length. It can remember prior behavior. It can generate endless variants and test which wording wins.

The recipient may use another model to defend the channel.

The coming attention economy may therefore contain agents on both sides: one trying to enter, one deciding whether entry is deserved.

Spam filters are a primitive version. The deeper question is who the defensive agent works for. An attention firewall controlled by the same party that profits from interruption is not really a firewall. It is a tollbooth.

The same conflict appears inside organizations, where AI can create abundant private advice.

An employee may hesitate before asking a senior colleague to review an early idea because interruption has social cost. An agent removes much of that cost. Junior employees can ask endlessly. Experts can externalize routine mentoring. People can explore a thought before burdening anyone else.

This is liberating.

It also creates a coordination problem.

Suppose every member of a product team asks an agent to improve the same plan. Each returns to the meeting with ten locally sensible suggestions. The team now has a hundred improvements to reconcile.

The agents optimized the private documents.

Nobody optimized the shared attention required to integrate them.

Common context becomes scarce.

Organizations often underestimate common context because it does not look like production. A team that shares a mental model can coordinate with fewer messages. A team whose members each possess rich but incompatible machine-generated analyses may communicate more while understanding one another less.

Private intelligence can rise faster than collective intelligence.

This is why not every answer should be personalized.

Sometimes the highest-value artifact is the one everybody sees: a mission rule, a runbook, a written decision, a shared dashboard, a short record of what changed and why. These artifacts sacrifice some tailoring in exchange for lower coordination cost.

Mission control worked partly because specialists did not all send raw telemetry directly to the astronauts. The organization created scopes, channels, and escalation. The flight director did not need every fact. The room needed enough shared procedure to understand what an unusual signal meant when it arrived.

Compression protects attention.

It also creates risk.

A summary can hide dissent. A ranking can make something invisible. A filter can reproduce bias. An agent that protects a manager from low-priority messages can also protect the manager from early evidence that the priorities are wrong.

Every attention system therefore needs routes around itself.

Routine information can travel through structured channels while unusual cases retain ways to escape classification. A customer can appeal. An engineer can stop a process. A worker can surface a concern outside the normal chain. A leader can sample raw reality periodically rather than living entirely inside summaries. An automated filter can preserve a small amount of random inspection so the system still sees what its ranking model considers unimportant.

Without gates, attention floods.

With perfect gates, surprise disappears.

The aim is not perfect filtering. It is an institution that can protect concentration without making yesterday’s model of importance impossible to challenge.

This matters because some apparently inefficient attention is how weak signals survive.

A scientist notices something while reading outside a narrow query. A manager hears a concern in an informal conversation that would never merit a formal escalation. A student asks a confused question that reveals the lesson itself is wrong. A mechanic hears a machine make a sound no dashboard classified as significant.

These events do not justify romanticizing interruption.

They justify preserving a little uncommitted capacity.

The same argument appeared in the previous chapter as slack. Here it appears as perceptual slack: room in the attention system for something that has not yet earned a score.

AI can remove many of the repetitive taxes that currently consume this room. It can draft routine correspondence, search records, reconcile formats, translate, schedule, extract, and summarize.

The interesting question is what happens to the attention saved.

Historically, productivity gains do not automatically become discretion or leisure. They can become higher output targets. If a report takes half as long, the organization may request twice as many reports. If documentation becomes faster, a clinic may schedule more patients. If grading becomes faster, a school may enlarge classes.

Attention saved at one stage can be claimed immediately somewhere else.

Savings therefore need an owner.

A company can decide that some gains become more output and some become better verification. A hospital can convert documentation savings into shorter visits or deeper contact. A team can preserve part of the gain as reserve rather than filling every empty block. A person can let an agent save an hour without immediately giving the hour another task.

Technology creates the option.

The allocation decides the dividend.

This becomes even more important when a person works with several agents at once.

Imagine a manager with one agent watching customers, another finances, another legal obligations, another engineering, another recruiting, and another scheduling. If each agent independently decides what is important enough to interrupt, the manager has not acquired six assistants.

The manager has acquired six people with permission to knock on the door.

A higher layer has to arbitrate among them. Payroll may deserve immediate interruption. A mildly deteriorating marketing metric may belong in an afternoon review. Three customer signals pointing to the same defect should become one interruption rather than three.

Attention is a scheduling problem as much as a ranking problem.

A message can be useful and still arrive at the wrong moment.

Once agents compete for access, status matters too. People with power already possess stronger means of interrupting institutions. Their email is answered faster. Their complaint reaches someone senior. Their meeting displaces somebody else’s.

Agents can industrialize that advantage.

Every request can arrive perfectly written, relentlessly followed up, framed as urgent, and timed to exploit the recipient’s habits. A wealthy customer can deploy a persistent agent against a small public office. A large company can have machines generate individualized appeals to every regulator, supplier, and policymaker. Employees can face internal systems that never tire of asking for updates.

Without defenses, the attention economy becomes an agent arms race.

Institutions will need controls that seem rude from the perspective of any single request: batching, authenticated priority, rate limits, quotas, quiet channels, random sampling, and the right not to answer.

There is also a rights question hiding inside all of this.

A person who cannot control access to their attention has limited control over their own cognition. Employers, platforms, schools, governments, and families all have legitimate reasons to interrupt sometimes. None therefore acquires an unlimited claim.

The right not to answer is not absolute. Emergency services, legal duties, employment, care relationships, and collective life all create obligations. But obligation should not be confused with permanent reachability.

As agents become persistent, institutions may need explicit rules about quiet hours, response expectations, escalation authority, and which channels can cross a person's boundaries without fresh consent. The technical capability to reach someone instantly is not the same as a social entitlement to do so.

This is one place where apparently small interface choices become constitutional. A red badge, a vibration, an auto-generated follow-up, or a default escalation rule decides whose priorities enter another person's mind.

The mature system will make those claims visible.

It should be possible to know why an interruption occurred, which rule authorized it, whether the source has been noisy, and how to change the future behavior of the channel. Otherwise the user receives the burden while the allocator remains hidden.

Attention governance is partly about giving the interrupted person standing inside the system that interrupts them.

These are not failures of intelligence.

They are what make abundant intelligence inhabitable.

The most valuable system in such an environment may be the one that decides what not to generate, what not to forward, and what does not deserve to interrupt anyone yet.

Software has often measured engagement because engagement is easy to count: opens, clicks, views, minutes, sessions. Those metrics treat attention as proof of value.

Many intelligent systems should aim for the opposite.

A navigation system is useful when it gets you there without demanding constant thought. A safety monitor is good when it remains quiet until something matters. A background agent may do excellent work while speaking only a few times a day.

Silence can be a feature of intelligence.

The future will contain systems capable of generating more language than humanity could ever read. That abundance makes restraint valuable.

The intelligent act will often be deciding not to produce another answer, not to send another notification, not to add another meeting, not to escalate another borderline case, and not to fill every empty moment with advice.

A civilization surrounded by minds will need to rediscover the dignity of an uninterrupted minute.