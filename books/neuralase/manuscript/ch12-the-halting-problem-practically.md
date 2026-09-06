# The Halting Problem, Practically

At some point, intelligence has to stop being interesting and become useful.

The answer has to be sent.

The code has to be committed.

The plane has to turn.

The medicine has to be administered.

The meeting has to end.

A system that can reconsider indefinitely has acquired a new failure mode: it may never earn the confidence to act.

This chapter is not about solving the halting problem from theoretical computer science. Turing’s result concerns whether a general procedure can determine if arbitrary programs will halt. Reasoning systems face a more ordinary problem and, in practice, a more expensive one.

When should this computation stop?

That is a resource question, a reliability question, and eventually an authority question.

The early history of adaptive computation already understood the resource side. Graves’s Adaptive Computation Time introduced a learned mechanism that could allocate different numbers of computational steps and charged a cost for pondering. The Universal Transformer carried the idea into recurrent self-attention. More recent work on dynamic depth and test-time scaling has returned to the same pressure: useful systems should not spend equal effort on every input.

The difficulty is that stopping is itself a prediction.

The system is trying to estimate the value of computation it has not yet performed.

If it knew exactly what the next pass would reveal, it could often answer the problem already.

So halting must rely on proxies.

A model’s confidence has stabilized.

Several branches agree.

A verifier accepts the result.

All constraints are satisfied.

Tests pass.

No unresolved contradiction remains.

A resource ceiling has been reached.

The deadline is near.

The expected consequence of delay now exceeds the expected benefit of more reasoning.

These are different stop rules because tasks have different notions of done.

A crossword clue can stop when the letters fit and the crossing answers agree.

A proof can stop when a checker validates the proof object.

A creative draft has no analogous correctness certificate. A medical decision may have to stop while uncertainty remains because treatment delayed is itself a risk. A trading system may have milliseconds. A strategic plan may have weeks and still face irreducible uncertainty.

The stop rule belongs to the environment, not just the model.

This is why “think until confident” is inadequate.

Confidence can be miscalibrated. More importantly, confidence is not the same as expected value of another pass. A system can be uncertain because the evidence is genuinely ambiguous. Ten more internal loops will not create the missing fact.

The correct action may be to stop reasoning and ask a question.

Or search.

Or escalate.

Or act reversibly and observe.

Halting does not always mean final answer.

It can mean changing the mode of the loop.

This distinction is essential for agents.

Suppose an agent is asked to schedule a meeting involving four people. It checks calendars and finds three available slots, but one participant’s calendar is inaccessible. The model can spend another five thousand tokens contemplating likely availability. That is not reasoning. It is avoidance.

The productive stop rule is: internal inference has reached the boundary of available information.

Ask the participant.

A mature system needs to recognize information boundaries.

That may be harder than recognizing task difficulty.

Language models are trained to continue. The next token always exists. There is cultural pressure too: a helpful assistant should answer. The result can be pathological persistence. The model fills uncertainty with prose because producing prose is what it knows how to do.

The stop rule has to make abstention a legitimate outcome.

This is one reason verifier-guided systems can be healthier than pure self-reflection. A failing check can tell the system not merely to continue but to change strategy. If retrieval returns no authoritative source, the system can mark the claim unresolved. If repeated branches disagree, the system can surface disagreement. If a permission is missing, the agent can stop before action.

Stopping is sometimes the most intelligent use of a loop.

The opposite failure is underthinking.

A system accepts the first plausible answer because the fast path is cheap. It misses a hidden constraint, a rare exception, or a conflict that another pass would have exposed. Fixed compute is particularly vulnerable when task difficulty varies widely.

The controller therefore lives between impatience and rumination.

This is a familiar human problem.

Organizations develop rituals around it. “Move fast” is a stop rule biased toward action. “Measure twice, cut once” is a stop rule biased toward verification. “Two-person approval” is a stop rule tied to consequence. “Beyond a reasonable doubt” is a threshold. “Peer review” creates another loop before publication. “Ship and iterate” moves some reasoning after action by making the action reversible.

These are all ways of deciding when enough thought has occurred for the current stage.

AI systems will need similarly domain-specific conventions.

A single universal reasoning budget is attractive because it simplifies infrastructure. Give every hard request 8,000 tokens. Give every easy request 1,000. The policy is legible.

It is also crude.

Token count is not task progress.

A model can spend 8,000 tokens walking in circles. Another can solve the problem in 600 and use the rest to doubt itself. A latent recurrent model can spend significant compute without emitting tokens at all. A tool call can do more epistemic work than a thousand additional words.

The useful quantity is marginal improvement, and marginal improvement is hard to observe online.

This is where benchmark research on overthinking is valuable.

Several recent studies have found non-monotonic relationships between reasoning length and performance. Additional inference effort can improve results up to a point, then flatten or degrade them. Models can reach correct answers and later talk themselves out of them.

That behavior is important because it breaks the intuitive monotonicity people bring to the phrase “more thinking.”

We assume extra consideration cannot hurt if the thinker is competent.

But a sequential generative system can corrupt its own context.

An early correct insight is followed by unnecessary exploration. A weak counterargument appears. The model gives it weight because it is now part of the context. The answer changes.

Continuation becomes intervention.

This suggests a class of stop rules based on stability.

If a solution passes checks and remains stable across independent perturbations, stop.

If additional reasoning changes the answer without increasing evidence, that change is a warning, not automatically an improvement.

A system can preserve checkpoints.

This is underappreciated.

Instead of treating the final state of a long reasoning run as authoritative, the controller can retain earlier candidate answers and scores. If later passes degrade verified properties, the system can revert. Search algorithms do this naturally. Version control does it. Model reasoning often does not.

The ability to go back changes the stopping problem.

You can permit more exploration if you do not have to lose the best state seen so far.

This is another form of reversibility.

Suppose a model solves a math problem and a verifier assigns a high score. The controller allows another pass because uncertainty remains. The second pass proposes a different answer with a lower verifier score. A naive pipeline returns the latest answer. A better system preserves the earlier candidate.

More thinking did not have to destroy the correct state.

The architecture made exploration non-destructive.

This principle should extend to agents.

An agent edits a file, tests it, and then tries a broader refactor. If the refactor fails, version control preserves the working checkpoint. A deployment system can roll back. A planning agent can keep the last validated plan while exploring alternatives.

The right to think longer is safer when paired with the right to return.

Stopping also has a social dimension.

Who gets to say enough?

A user may want a quick answer. A system policy may require more verification. A regulator may require an audit. A model may believe it needs more context. A product may impose a latency budget. These interests can conflict.

The controller becomes a negotiation among objectives.

This is easy to ignore in benchmark settings where the only goal is accuracy. Real systems optimize several things at once: correctness, cost, latency, safety, privacy, user experience, energy, and opportunity cost.

A high-consequence medical system may justify expensive verification.

A live translation system cannot pause for a three-minute internal debate before every sentence.

A coding agent operating overnight can spend hours if the task is worth it and tests provide strong feedback.

A consumer chatbot should not burn a data center to decide whether “lol” needs a response.

Reasoning effort is a product policy.

This will eventually become visible to users.

We already choose between fast and deep modes in various systems. That interface is primitive but honest. It acknowledges that intelligence has a time-cost curve.

The more interesting future is adaptive.

The system begins fast, detects difficulty or consequence, and escalates automatically. The user does not need to know the exact number of recurrent iterations or sampled branches. They need a reliable relationship between task and effort.

That relationship should be inspectable when it matters.

Why did this request take thirty seconds?

Why did the agent ask for approval?

Why did it stop without an answer?

Why did it spend ten times more than usual?

If the controller cannot explain its resource policy, organizations will struggle to govern cost.

There is another halting boundary that has little to do with compute.

Some questions should stop because the system lacks authority.

An agent can reason perfectly about how to execute a transaction and still not be entitled to execute it. More thought does not create permission.

This is the clearest case where stopping belongs outside the model.

The permission boundary is a hard stop unless another authorized actor changes the state.

This matters because capable models are good at making barriers feel like problems to solve. A missing credential can look like an obstacle in a plan. An agent optimized only for task completion may search for another route.

A governed agent needs to represent some barriers as boundaries, not puzzles.

That is a learned and architectural distinction.

The same applies to human escalation.

If a user says “do not send,” the agent should not interpret the instruction as uncertainty to be resolved through more autonomous reasoning. The loop halts at authority.

This gives us several kinds of stopping that should not be mixed.

Epistemic stopping: enough evidence has accumulated.

Economic stopping: another unit of compute is not worth its expected gain.

Temporal stopping: the deadline dominates.

Safety stopping: risk exceeds threshold.

Authority stopping: the system is not allowed to continue.

Environmental stopping: the next step requires information or state change from elsewhere.

These categories overlap and need not become a branded framework. They are simply reminders that “done” is not one thing.

The hardest reasoning systems will operate under several at once.

A self-driving car has milliseconds, safety constraints, uncertain perception, hard authority limits, and irreversible physical consequences. A research assistant has far more time and reversibility but may face evidence boundaries. An autonomous science agent may have days of compute but strict laboratory permissions.

The stop rule is part of the intelligence because it determines when inference becomes action.

This is the practical halting problem.

Not whether computation can end in principle.

Whether the system knows why this computation should end now.

There is one class of stopping signal that deserves more skepticism than it usually receives: apparent completion.

Language models are trained on documents with endings. They know the forms of conclusion. A proof-like answer reaches “therefore.” A plan reaches “final recommendation.” A coding agent prints a summary. These textual cues can be useful, but they can also be mistaken for task state.

A model can sound finished before the environment is finished with it.

The patch summary can be excellent while tests still fail.

The research memo can have a conclusion while one source remains unchecked.

The booking agent can say “confirmed” before the reservation system returns an identifier.

The distinction between rhetorical completion and operational completion is another place where external friction matters.

A task should stop on the state that defines done, not merely on language that resembles done.

This suggests a principle for agent controllers: finality should be typed.

There is “model has no more tokens to add.”

There is “candidate answer produced.”

There is “verification passed.”

There is “action committed.”

There is “external system confirmed.”

There is “user accepted.”

There is “monitoring period completed.”

These states can occur at different times.

A system that collapses them into one word—done—will eventually lie by accident.

Long-running agents make the problem more visible because they have pauses that are not endings.

Waiting for an email reply is not failure.

Waiting for a build is not failure.

Waiting for a market to open is not failure.

Waiting for a user to choose among options is not failure.

The agent needs a state in which it has stopped acting without claiming the objective is complete.

Human organizations call these queues, pending states, holds, handoffs, and dependencies. AI systems will need the same boring vocabulary.

This is an important counterweight to the fantasy of continuous autonomous activity. A competent agent should spend much of its life not acting because the next useful difference has not arrived yet.

That is not wasted potential.

It is respect for state.

The same idea can improve inference-time compute itself. A controller does not need to decide only between “continue reasoning” and “return final answer.” It can choose “suspend this path until a verifier completes,” “ask the user,” “retrieve more evidence,” or “save checkpoint and revisit after the environment changes.”

Stopping can be temporary.

That makes the practical halting problem closer to scheduling than death.

Which computation should be active now?

Which should wait?

Which should be abandoned?

Which should resume from a preserved state?

As systems handle many tasks in parallel, these decisions become resource management. A cloud of agents that can all “think longer” creates a scheduler’s nightmare if none has a disciplined notion of marginal value.

The controller may need to compare tasks against each other, not only against themselves.

Is the next GPU-second better spent deepening this proof or answering a different user whose first pass will likely solve the problem? Is a human reviewer better spent on this ambiguous edge case or the one with irreversible consequence? Test-time compute becomes portfolio allocation across workloads.

This is where the economics become organizational.

A single query can justify more reasoning in isolation and still not justify it under system load.

During peak demand, the threshold for escalation may change. Low-priority tasks may wait. High-consequence verification may remain non-negotiable. A service may degrade gracefully by reducing optional branches while preserving mandatory checks.

The stop rule becomes part of capacity planning.

That is not normally how people talk about intelligence.

It is how deployed intelligence will survive contact with scale.

There is also a fairness issue hidden inside variable compute.

If some users or cases receive deeper reasoning than others, who decides the allocation? A product tier can openly purchase more compute. A risk-based system can allocate more to consequential cases. But an opaque controller might systematically spend less on inputs it finds unfamiliar or hard to parse, exactly where more effort is needed.

Adaptive computation can create unequal error distributions.

The remedy is not necessarily equal compute. Equal compute can be equally unfair if difficulty differs. The remedy is evaluation: measure who receives escalation, where early stopping occurs, which groups experience higher uncertainty, and whether the allocation policy amplifies existing disparities.

A stop rule is a policy because it decides whose problem is worth another pass.

That is a sentence worth remembering as reasoning systems enter institutions.

The policy may be economically rational and still socially consequential.

A health system might allocate more review to high-risk cases. Good. If its risk estimator under-detects certain populations, the adaptive loop can entrench the error by withholding the very compute that might have corrected it. A fraud system can spend deeper analysis on transactions that look suspicious, but biased suspicion changes who receives scrutiny.

The controller therefore needs auditing just as the model does.

This is another reason to log operational stopping signals. Not private thought. Allocation facts.

How many passes?

Which escalation trigger?

Which verifier?

Which budget ceiling?

Which waiting state?

Which authority boundary?

Those records can reveal whether the system’s “intelligence” is being distributed in ways nobody intended.

The final form of stopping is the most human one: accepting unresolved uncertainty.

Some questions do not become answerable because we are clever. The evidence may be genuinely incomplete. The future may be contingent. Values may conflict. Another person may own the decision. A mature system should be able to return a bounded uncertainty without converting it into either paralysis or fake confidence.

That capacity may be harder to train than verbosity.

Language rewards completion. Products reward satisfaction. Benchmarks often reward a single answer.

Reality sometimes rewards restraint.

The practical halting problem ends there.

Not with a theorem telling the machine that no more computation could possibly help.

With a disciplined decision that enough has been learned for this action, or that nothing more can be learned until the world changes.

That is why the system should end now.

A practical controller can make that discipline explicit by tracking three clocks at once.

The first is the *epistemic clock*.

How much unresolved uncertainty remains, and is another unit of work likely to reduce it?

The second is the *operational clock*.

How much time, money, compute, or external capacity remains before continuing becomes too expensive?

The third is the *consequence clock*.

How long can the system safely delay before inaction itself becomes a decision?

These clocks do not tick at the same speed.

A research assistant may have a slow consequence clock and a generous operational clock. It can spend more time resolving conflicting sources.

An emergency response system may have a fast consequence clock. The evidence can remain imperfect and still require action.

A low-stakes chat response may have almost no reason to spend heavily on the epistemic clock because the consequence is trivial and the user values speed.

The controller’s job is to compare the clocks, not maximize one of them.

This prevents a common mistake in discussions of “reasoning effort.”

More reasoning is often treated as if it competes only with cost.

It also competes with time-sensitive consequence.

A perfect answer delivered after the decision window can be worse than a good answer delivered in time.

Conversely, a cheap answer that triggers an irreversible mistake can be enormously expensive in retrospect.

The optimal stopping point is therefore contextual in the strongest sense.

It depends on what the next pass might buy and what waiting might cost.

That can be expressed as a simple discipline even when the exact quantities are hard to estimate.

Before another pass, ask:

What uncertainty remains?

What new signal will this pass introduce?

What would count as success?

What is the cost of the pass?

What is the cost of delay?

What happens if the pass produces no new information?

That last question matters because many loops have no failure plan for unproductive continuation.

They retry.

Then retry again.

The system spends more because spending more was the only escalation mechanism implemented.

A robust stop policy includes a plateau condition.

If successive passes do not change evidence, verified state, or the set of viable actions, the system should change mode or stop.

This is different from stopping because a token budget ran out.

A budget ceiling is a safety net.

A plateau rule is an epistemic judgment.

The distinction can save enormous amounts of wasted computation.

Suppose a research agent searches the same query three ways and retrieves the same two sources. The relevant uncertainty remains because no authoritative record is public.

A fourth paraphrased search may be cheap.

It may also be pointless.

The better transition is to label the information boundary and either ask for another source, widen the source class deliberately, or stop with uncertainty.

The same applies to self-critique.

If three critiques restate the same objection without introducing evidence or a new constraint, the loop has become rhetorical churn.

The system is moving through language without moving through state.

That is exactly what Neuralase was meant to expose.

A useful stop rule watches for state change, not merely token production.

This suggests another property: stop rules should be *monotonic with hard evidence*.

If a proof checker validates a proof object, a later unverified prose objection should not automatically erase that validation.

If a transaction system confirms a payment identifier, later model uncertainty should not turn the payment back into “probably unsent.”

If a test suite passes a known requirement, another reflective pass can raise a new concern, but it should have to introduce a reason that outranks or extends the existing evidence.

Otherwise the loop can oscillate forever because nothing is allowed to become settled.

Human institutions solve this with doctrines of finality.

A signed contract governs until amended.

A court decision stands until appealed through a recognized process.

A production artifact has a version.

A database transaction commits.

Finality is rarely metaphysical.

It is procedural.

Reasoning systems need the same procedural finality.

A claim can remain revisable in principle while becoming settled enough for the current action.

That is a better model than pretending the system has reached certainty.

The stop policy should therefore distinguish *settled for now* from *true forever*.

This distinction is especially valuable for long-running agents.

An agent can close a task because the current objective is satisfied while preserving conditions that would reopen it.

A deployment is complete, but monitoring can reopen if error rates cross a threshold.

A reservation is confirmed, but a cancellation notice can reopen travel planning.

A research conclusion is delivered, but a newly published authoritative source can justify revision.

The original task stopped.

The system did not become incapable of changing its mind.

This is re-entry without rumination.

It turns halting from a dead end into a governed boundary.

That boundary is where the next chapters begin to matter most.

If the system knows how to stop, then a later return can be meaningful rather than compulsive.

It can reopen because the world changed.

Because authority changed.

Because evidence changed.

Because consequence changed.

Not because the model simply discovered another sentence to write.

The practical halting problem is therefore inseparable from the quality of re-entry.

A good system knows both sides of the door.

Why this pass should end.

And what would justify opening the loop again.