# A Chain of Command

A commander who must approve every movement has already lost time.

This is not a metaphor invented for management books. It is a practical problem created whenever action is distributed across distance, uncertainty, and rapidly changing conditions.

Military organizations have spent centuries trying to answer a question that every future agent system will face: how do you keep many actors aligned when the person at the top cannot see what the people at the edge can see?

One answer is control.

Specify procedures. Require reports. Centralize decisions. Make obedience legible.

Another answer is intent.

Tell subordinates what outcome matters, why it matters, what boundaries must hold, and then allow local judgment when reality departs from the plan.

Modern U.S. Army doctrine describes mission command as an approach to command and control that empowers subordinate decision-making and decentralized execution appropriate to the situation. Its language emphasizes competence, mutual trust, shared understanding, commander’s intent, mission orders, disciplined initiative, and risk acceptance.

The military context is extreme, but the organizational insight is general.

A plan is a prediction about the future.

Delegation is what survives after the prediction fails.

Imagine a convoy directed to reach a location by a specified route. If the road is blocked, literal obedience can become mission failure. A subordinate who understands only the route waits for new instructions. A subordinate who understands the purpose can search for another path while preserving the constraints that matter.

The commander therefore delegates more effectively by explaining less about some things and more about others.

Less about the exact method.

More about the reason.

This is counterintuitive in software because software grew up in a culture of procedures. Programs are valued for following rules precisely. If the system does something the programmer did not instruct, the result is usually called a bug.

AI agents are useful because that relationship changes.

We now want software that can choose methods we did not specify.

Tell the agent to investigate why a service is failing. The correct path may involve logs, recent commits, deployment history, network state, configuration, documentation, or a conversation with another team. A hard-coded procedure would either be enormous or brittle.

The agent needs something closer to intent.

Restore service without corrupting data.

Prefer reversible changes.

Do not expose secrets.

Do not modify production unless diagnosis requires it and approval has been granted.

Preserve evidence.

Escalate if customer data may be affected.

These statements define the mission more than the route.

The quality of the agent is measured partly by how intelligently it navigates the remaining space.

This is why “follow instructions” becomes insufficient as an alignment goal.

Instructions conflict.

They arrive at different levels.

Some are durable principles. Some are temporary objectives. Some are stale. Some come from actors without authority. Some describe means that become impossible while the end remains valid.

A capable delegate needs to reason about hierarchy among instructions.

Human organizations solve this with rank, policy, law, professional norms, and convention. A manager can assign a task but cannot authorize violating every company rule. An executive can change a priority but may still be constrained by regulation. A customer can request a service but cannot necessarily instruct an employee to disclose another customer’s data.

The structure resembles nested intent.

At the top are constraints that should survive local pressure.

Within them are missions.

Within missions are tasks.

Within tasks are methods.

The farther down the hierarchy, the more freely a delegate should be able to adapt.

This is almost the opposite of how naive automation is built.

Naive automation often makes the local step rigid and the high-level goal vague.

Increase engagement.

Reduce costs.

Resolve tickets.

Maximize throughput.

Then the system receives many precise permissions for achieving the vague goal.

The result is dangerous because the thing most open to interpretation is the objective.

A better delegated system makes the high-level constraints clearer than the low-level path.

Help the customer solve the actual problem, while respecting privacy, authority, and accuracy. Here are the tools. Choose the path.

This still leaves disagreement about what the words mean. No doctrine can erase interpretation.

The point is to place ambiguity where judgment is useful and boundaries where improvisation is dangerous.

Mission command also exposes a fact that office software tends to forget: communication is not guaranteed.

For most of human history, delegated actors had to operate during periods when they could not contact the principal. Ships crossed oceans. armies moved beyond reliable communication. merchants waited weeks for replies. Governors administered distant regions under stale instructions.

The telephone and internet made continuous communication seem normal.

Agentic computing may reverse the pressure in an odd way.

The principal may be reachable, but constant consultation destroys the value of delegation.

A person who must answer an AI’s question every thirty seconds has not acquired an assistant. They have acquired a complicated form.

The agent needs a doctrine for what to do while the principal is functionally unavailable.

This is a product-design problem disguised as intelligence.

How much uncertainty should the agent absorb before asking?

What counts as a material change in conditions?

Which decisions can be made under standing authority?

What requires fresh consent?

What can wait?

What requires immediate interruption?

These questions are exactly the questions distributed organizations ask.

The answers depend on trust earned over time.

A new employee may receive narrow discretion. A seasoned manager can make larger calls because the organization has evidence about judgment. A junior officer receives responsibilities appropriate to training and context. A contractor may have tightly scoped access until a relationship matures.

AI systems are often granted authority based almost entirely on benchmark capability.

The model can perform the task, therefore the model may perform the task autonomously.

Human institutions usually require another category of evidence.

Has this actor behaved reliably under the kinds of uncertainty this role contains?

Capability is not the same as entrusted authority.

A brilliant surgeon cannot automatically sign company checks. A gifted trader does not receive unrestricted access to customer medical records. Skill is domain-specific and authority is role-specific.

AI tempts us to collapse the distinction because the same general model can perform many kinds of work.

Generality feels like universal competence.

Universal competence feels like universal permission.

That leap should be resisted.

A model may be extraordinarily good at understanding a legal document and still be a poor candidate for autonomous negotiation because negotiation includes representation, risk tolerance, and organizational authority beyond comprehension of the text.

The same model may write secure code and still deserve limited production credentials.

Command structures separate knowing from commanding for a reason.

Information does not automatically confer authority.

There is another military lesson worth borrowing carefully: decentralized execution requires shared understanding before the crisis.

You cannot create trust at the moment the connection fails.

Human teams train together. They build a sense of how leaders interpret risk, what kinds of deviation are celebrated, which mistakes are tolerated, and what values survive pressure. Much of this knowledge is tacit.

AI developers try to manufacture an equivalent through training, examples, system prompts, policies, and evaluations.

The model is shown what good judgment looks like across many situations so that a principle generalizes when the exact case is new.

This is one reason language models can be better suited to delegated work than traditional rule engines. They can represent purpose in a flexible way.

It is also why their failures can be hard to predict.

Generalization is not a lookup table.

The model may apply a principle broadly, narrowly, or strangely depending on context.

A rule engine fails where the rule is missing.

A learned agent can fail where its interpretation is wrong.

Supervision therefore needs to observe not only whether the final objective was reached but whether the route remained inside intended constraints.

This is where command and control separate again.

Command provides purpose and authority.

Control provides information about whether action remains coherent with them.

In AI systems, control becomes telemetry.

Logs. Traces. tool calls. state diffs. resource use. permission changes. approval records. output validation. anomaly detection.

The agent should not experience every monitor as a micromanaging supervisor. The system should quietly maintain enough evidence that intervention is possible when local initiative becomes local invention.

This distinction matters because excessive supervision can make an agent worse.

If every choice must be justified before action, the system becomes slow and may learn to optimize explanation rather than outcome. If every deviation is punished, the agent may become brittle and refuse useful initiative. Human organizations know this failure well. A culture that punishes every mistake drives decisions upward and bad news underground.

The principal becomes the bottleneck again.

Good delegation therefore requires tolerance for bounded error.

That phrase makes executives nervous because errors are expensive.

The alternative is imaginary.

An organization large enough to delegate cannot eliminate local mistakes. It can decide which mistakes are survivable and design authority accordingly.

A junior employee can send a bad internal draft. They cannot unilaterally acquire another company. A warehouse worker can reorder a small consumable. They cannot change the safety policy. A software agent can retry a request. It should not silently expand its own credentials because the retry failed.

The boundary should be drawn around consequence, not around perfection.

This becomes especially important for multiple agents.

A single human principal may soon delegate to an orchestration system that delegates research to one model, coding to another, data retrieval to tools, review to another model, and execution to a service account. The original user sees one task. The system contains a chain of command.

Who holds intent?

If each agent receives only its local task, the organization can lose the purpose in decomposition.

A research agent is told to maximize evidence for a position without knowing that the final product is supposed to be balanced. A coding agent is told to make tests pass without knowing that modifying tests is forbidden. A summarizer is told to compress aggressively without knowing which caveat is legally important.

Subtask optimization can destroy mission coherence.

Human organizations solve this imperfectly by communicating intent downward and context upward.

The subordinate should understand enough of the purpose to make good local choices.

The principal should receive enough information about changed conditions to update the mission.

Agent architectures need the same bidirectional flow.

Delegation is not throwing a task over a wall.

It is maintaining alignment across a boundary where different actors see different worlds.

This is why handoffs matter.

A good handoff carries more than the next instruction. It carries relevant state, assumptions, unresolved uncertainty, constraints, and reasons.

Hospitals learned this through patient handoff protocols. Aviation learned it through crew communication. Software teams learned it through incident response and shift changes. Military organizations learned it through orders and reports.

Multi-agent systems will relearn it through context windows.

A handoff that says “Fix the bug” is not enough if the previous agent discovered that the obvious fix breaks a security property.

A handoff that says “Book the trip” is not enough if the user earlier said they must arrive before a medical appointment.

The agent chain needs institutional memory.

Otherwise delegation becomes lossy compression.

The most interesting future systems may therefore look less like one omnipotent model and more like organizations with explicit roles. Planner. researcher. executor. verifier. specialist. approver. Each has different information and authority.

This can improve reliability by separating duties.

It can also recreate bureaucracy in silicon.

Agents can send each other messages nobody reads. Handoffs can multiply. Local rules can contradict. Responsibility can become diffuse. The user may ask why something happened and receive a chain of explanations in which every agent behaved reasonably from its local context.

Welcome to organization theory.

The existence of multiple agents does not solve delegation.

It creates more of it.

This is where commander's intent becomes useful outside military analogy. A multi-agent system needs a compact representation of what must remain true across all local decisions.

Not a slogan.

A usable intent.

What is the actual outcome?

Which constraints dominate it?

What risks are acceptable?

What conditions require stopping?

What evidence must survive?

What can be traded away?

If each delegate can answer those questions, the system has a better chance of adapting without drifting.

The difficulty is that intent itself can become stale.

A principal may change their mind. New information can reverse priorities. A regulation can change. An emergency can create a legitimate exception.

So intent needs versioning.

Which instruction is current?

Who changed it?

Which agents received the update?

Which actions were already committed under the old rule?

Human command structures struggle with this under the name of orders and counterorders. Distributed software struggles with it as consistency and state propagation. Agent systems will experience both.

An intelligent delegate acting on old intent can be more dangerous than a dumb process because it can pursue the obsolete goal creatively.

This is why authority should expire when practical.

Short-lived credentials. task-scoped context. explicit session boundaries. cancellation channels. revocable plans.

The faster and more capable the agent, the more important it is that yesterday’s mission not become tomorrow’s autonomous campaign.

Command also teaches another sobering lesson: clarity at the top does not guarantee ethical legitimacy.

A perfectly communicated harmful order remains harmful.

The machinery of delegation can make bad intentions more efficient.

This book is interested in control, but control is not the same as goodness.

An AI system aligned perfectly to a corrupt principal can be socially dangerous. A bureaucracy executing discriminatory policy can be procedurally excellent. A company can optimize a harmful business model with flawless delegation.

We therefore need constraints that do not originate solely from the immediate principal.

Law. rights. platform rules. professional standards. public accountability.

Human delegates are embedded in overlapping institutions precisely because no principal is sovereign everywhere.

AI agents will be too.

The commander’s intent is not the constitution.

The manager’s goal is not the law.

The user’s desire is not the entire moral universe.

A trustworthy delegate needs to know which level it is serving at each moment.

This is a harder problem than obedience and a better description of alignment.

When reality changes, what should remain invariant?

That is the question every chain of command is trying to answer.

A plan can tell you where people expected the world to be.

Intent tells you what they cared about when the world moved.