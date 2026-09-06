# The Right to Stop

The ability to think longer sounds unambiguously good until you have watched a capable system talk itself out of a correct answer.

This is not a hypothetical edge case anymore. Research on test-time compute has produced both sides of the story. Additional computation can improve reasoning, especially when it is allocated intelligently. Additional computation can also waste tokens, repeat the same mistake, introduce spurious alternatives, or abandon a solution that was already right. The existence of more compute does not answer the question of how much compute a particular problem deserves.

That makes stopping part of intelligence.

Not an afterthought. Not a billing setting. Not merely a latency compromise.

A system that can continue indefinitely but cannot tell when continuation has stopped buying information is missing a control function.

The old version of this problem appeared in recurrent neural networks as adaptive computation. Alex Graves’s work on Adaptive Computation Time made the issue explicit: different inputs may require different amounts of recurrent processing, so a useful system needs a mechanism that learns how many computational steps to spend. Universal Transformers later brought recurrence and adaptive halting into a self-attentive architecture. The details differ from contemporary reasoning models, but the design pressure is recognizable.

Uniform depth is simple.

Reality is not uniform.

Some problems collapse after one good observation. Some need decomposition. Some need a tool. Some need branching. Some need more latent transformation before any useful answer appears. Some are impossible with the information currently available, and another thousand tokens will not change that fact.

The controller has to distinguish these cases somehow.

That is the practical halting problem of reasoning systems.

It is not the halting problem from computability theory. We are not asking for a universal method that proves whether every arbitrary program will terminate. We are asking a narrower engineering question: given a model, a task, a budget, and a set of observable signals, when should the system spend another unit of reasoning and when should it commit, ask, defer, or quit?

The distinction matters because the narrower problem is tractable enough to design around and difficult enough to matter.

The most naïve stopping rule is a fixed budget.

Give every problem a thousand reasoning tokens. Or eight branches. Or four refinement passes. Or three tool calls. Fixed budgets are attractive because they are predictable. Costs are easy to estimate. Latency is bounded. Capacity planning is straightforward.

They are also wasteful by construction.

An easy problem pays for reasoning it does not need. A hard problem hits the ceiling exactly where additional work might matter. Fixed budgets allocate computation according to the administrator’s convenience rather than the problem’s structure.

The next naïve rule is confidence.

Stop when the model says it is confident.

Confidence can be useful. It is not a sovereign signal. Language models can express certainty about wrong answers. A model can become more confident after rehearsing its own mistake. A polished explanation can increase subjective confidence without increasing accuracy. If the same generative process produces both the answer and the self-assessed confidence, the two outputs can share the same blind spot.

A stronger stopping rule looks for change.

Did the last pass discover anything?

Did a branch produce a genuinely different candidate?

Did the verifier score improve?

Did retrieval resolve an ambiguity?

Did a tool result contradict the current hypothesis?

Did the model’s answer stabilize across independent samples?

Did another iteration merely restate the same conclusion with different wording?

This is where the neuralase lens becomes useful again. The reason to take another pass is not that another pass is available. The reason is that the loop still contains a plausible source of discriminating difference.

Once the difference has been exhausted, continued looping becomes ceremony.

Think about a debugging agent.

The first attempt edits code. Tests fail. The test output is new information, so another pass is justified. The second attempt changes the implementation. A different test fails. Again, there is new information. The third attempt causes the same failure with the same stack trace and no meaningful change in the diagnosis. At that point, another blind edit is less defensible. The system should change strategy: inspect a dependency, search documentation, reduce the problem, ask for clarification, or stop.

The failure is not that the agent needs more persistence.

The failure is that persistence has been mistaken for progress.

Humans do this too.

We reread the same email looking for a hidden meaning that is not there. We keep adjusting a spreadsheet after the uncertainty has moved outside the spreadsheet. We hold another meeting because a decision feels uncomfortable, not because the meeting will produce new evidence. We refresh a market price as though the next tick will resolve the underlying question.

The ability to continue can become a refusal to commit.

Artificial intelligence can automate that pathology at machine speed.

A reasoning model with an enormous context window and a generous test-time budget can produce more analysis than anyone could reasonably inspect. That abundance creates a new temptation: if the answer is consequential, ask for more thought until uncertainty disappears.

Uncertainty does not always disappear.

Sometimes it is irreducible because the future has not happened, the evidence is incomplete, the objective is contested, or the available measurements cannot distinguish the competing explanations. A system that treats uncertainty as a temporary shortage of tokens may hallucinate resolution.

Stopping therefore needs an epistemic category that ordinary software rarely requires: enough.

Enough evidence to act.

Enough verification to trust the answer at this consequence level.

Enough disagreement to escalate.

Enough failed attempts to conclude that the current method is not working.

Enough uncertainty to ask rather than infer.

Enough thinking to know that more thinking is unlikely to change the decision.

“Enough” sounds imprecise because it is. So are many of the thresholds institutions already operate with. Engineers use error budgets. Doctors use clinical thresholds. Courts use standards of proof that are qualitative but consequential. Businesses set approval limits. Pilots have go/no-go criteria. Safety systems define tolerances. These thresholds are not perfect descriptions of reality. They are operational agreements about when evidence becomes sufficient for a particular action.

Reasoning systems need similar agreements.

A useful stopping controller can combine several classes of signal.

One is outcome stability.

If independent reasoning paths converge on the same answer, the marginal value of another path may decline. Self-consistency exploits a version of this idea by sampling multiple chains and aggregating. Convergence is not proof. Correlated errors can converge beautifully. But stability can be one signal among several.

Another is verifier saturation.

If a process or outcome verifier stops improving across iterations, continued refinement may be wasting compute. This requires a verifier worth trusting, which returns us to the central difficulty: the quality of the stopping rule depends on the quality of the discrimination it observes.

Another is novelty.

A controller can estimate whether the new pass introduces a new hypothesis, new evidence, a changed plan, or a materially altered intermediate state. If the loop is producing paraphrases, novelty is low even when token count is high.

Another is budget.

Budgets still matter. A perfect stopping controller that ignores economics is not a production system. The expected value of another pass has to be compared with its latency, compute cost, opportunity cost, and the cost of delaying action.

Another is consequence.

The same uncertainty can justify different stopping behavior depending on what happens next. A model choosing a synonym can stop early. A model preparing a high-stakes action may need more verification or an external authority. The stop rule is therefore inseparable from the action boundary.

Another is user intent.

Sometimes the person asking the question does not want the system’s maximum effort. They want a quick estimate. Sometimes they want the opposite: spend the budget, search broadly, test the answer, and do not return until the evidence has been reconciled as far as possible. A well-designed system should expose meaningful effort choices without forcing the user to understand the implementation.

These signals can conflict.

The answer is stable, but the verifier is weak.

The verifier is strong, but the consequence is high.

The budget is exhausted, but a new tool result has just invalidated the leading hypothesis.

The user wants speed, but the system has detected an ambiguity that makes a fast answer dangerous.

This is why stopping belongs to the controller rather than to a single scalar.

A controller is allowed to make policy.

It can say: if two independent branches agree and the deterministic checker passes, stop. If they disagree, spend one additional branch. If disagreement persists, retrieve. If retrieval changes the evidence, restart evaluation. If no source resolves the conflict and the action is reversible, return uncertainty. If the action is irreversible, escalate.

That sequence is not universally correct. Its value is that it makes the stop logic explicit.

Most reasoning systems today still hide a surprising amount of stopping policy inside defaults.

Maximum token limits are stopping policy.

Tool-call limits are stopping policy.

Timeouts are stopping policy.

Agent iteration caps are stopping policy.

A model deciding to emit a final-answer token is stopping policy learned inside the model.

A user clicking cancel is stopping policy.

A billing limit is stopping policy with an accountant’s accent.

When these mechanisms are invisible, failures are hard to diagnose. Did the system stop because it had solved the task, because it ran out of context, because the orchestrator hit a loop limit, because the model became overconfident, because a tool timed out, or because the provider ended generation?

The behavior looks the same from the outside: an answer arrived.

The reasons are very different.

A mature reasoning stack should record enough of the stop state to distinguish them.

Not necessarily the model’s private chain of thought. This book has already argued that visible reasoning and causal computation should not be confused, and exposing internal traces can create its own problems. But the system can record operational provenance: which tools were called, whether branches agreed, which verifier thresholds were met, whether a budget ceiling fired, whether the model requested more information, whether an action was escalated, and which component chose to stop.

That gives debugging somewhere to begin.

It also gives economics somewhere to begin.

Test-time compute is attractive partly because it creates a new scaling surface. Instead of paying all intelligence costs at training time, systems can spend more at inference on the problems that deserve it. Snell and colleagues made this allocation question explicit in their work on compute-optimal test-time scaling. Later work on thinking-optimal scaling and overthinking sharpened the other side: more tokens or longer chains do not create monotonic gains.

The implication is easy to state and hard to operationalize.

Compute should follow expected marginal value.

The first extra pass may be valuable. The tenth may not be.

A branch may be valuable when uncertainty is multimodal. It may be wasteful when a deterministic tool can settle the question instantly.

A long internal recurrence may help a compact model on a difficult reasoning task. It may be a terrible use of latency on a lookup.

The controller needs a cost curve, even if it can only estimate one.

This changes benchmarking.

A model that gets ninety percent accuracy with one unit of compute and ninety-two percent with ten units is not simply a ninety-two-percent model. The shape of the improvement matters. Another model might get ninety-one percent with two units. Which is better depends on the workload and the value of the last percentage point.

Benchmarks that report only best-achieved accuracy can hide this.

The same is true of agents. An agent that solves a task after thirty tool calls may be impressive in a research demo and uneconomic in production. Another that solves slightly fewer tasks but stops intelligently may produce more useful work per dollar and per minute.

Stopping is therefore part of capability economics.

It is also part of safety.

Some harmful behavior comes from systems that stop too early. They act on incomplete evidence. They fail to verify. They treat the first plausible answer as enough.

Other harmful behavior comes from systems that do not stop. They keep searching for a way around a constraint. They continue taking actions after the original goal has become invalid. They compound small errors across a long trajectory. They consume resources without a proportional gain. They turn a bounded task into an open-ended campaign.

Long-horizon agents make this particularly important.

A chatbot conversation usually contains natural stopping points. The model responds and waits. An agent with tools can keep going. It can inspect, modify, retry, browse, message, purchase, schedule, deploy, and monitor. The loop may span minutes or hours rather than tokens.

The right to stop becomes a property of the surrounding system.

The user should be able to stop it.

The controller should be able to stop it.

A policy boundary should be able to stop it.

A budget should be able to stop it.

A verifier should be able to stop it from taking a particular action even if the broader task continues.

A tool should be able to return a hard refusal that is not treated as an invitation to keep trying alternative phrasings forever.

The architecture needs brakes with different scopes.

This is not a metaphorical concern. Once systems can act, “stop” becomes an interface contract.

What state is preserved when the agent stops?

Which partially completed actions remain?

Can the work resume?

Can a transaction be rolled back?

Can another system inspect why the stop occurred?

Can the user distinguish “finished” from “gave up” from “blocked” from “waiting for you”?

These distinctions are small until they are not.

A system that reports “done” after hitting its iteration cap is lying about its state even if no individual sentence is false. A system that silently stops after a tool failure can create dangerous ambiguity. A system that continues after the user has withdrawn permission has a control problem, not a reasoning problem.

The right to stop therefore has two directions.

The machine needs the ability to stop thinking when the marginal value is gone.

The human needs the ability to stop the machine when the authority is gone.

These are not the same mechanism, but they belong in the same architecture.

A good loop respects both.

There is a philosophical temptation to equate intelligence with endless reconsideration. The wisest mind, on this view, keeps every possibility open and never becomes trapped by certainty.

That is not how competent action works.

A surgeon eventually cuts. A pilot lands. A judge issues a ruling. An engineer ships a design. A scientist submits the paper with unanswered questions still alive. A parent chooses. A company closes the books. A person sends the message.

Action requires compression.

Many possible futures become one actual path.

Reasoning is valuable because it improves that compression, not because it postpones it forever.

This gives stopping a strange dignity.

To stop is to admit that thought has a purpose outside itself.

The system is not being rewarded for producing the longest trace. It is being asked to change the quality of a decision enough to justify the resources spent.

Once it has done that, more thought can become noise.

The future of inference will likely contain systems with far more flexible computational depth than the fixed forward-pass intuition with which the Transformer era began. Some will branch. Some will recur internally. Some will use tools. Some will revisit memories. Some will allocate different depth to different tokens. Some will keep hidden states alive across repeated transformations. Some will run controllers that assemble several of these methods dynamically.

All of them inherit the same question.

Why one more pass?

A system that cannot answer that question does not yet know enough about its own computation.

The right to think again only becomes intelligence when it is paired with the right to stop.

Stop is a state, not an absence of activity.

Software interfaces often treat stopping as binary.

Running.

Not running.

Reasoning systems need a richer vocabulary because several very different conditions can produce silence.

Finished: the objective was satisfied.

Blocked: a policy or permission prevents the next action.

Exhausted: the budget or deadline has been reached.

Unresolved: the available evidence does not justify a conclusion.

Waiting: another actor or external event must change the state.

Failed: the system encountered an error it could not recover from.

Cancelled: authority was withdrawn.

Paused: the state is preserved and continuation remains available.

These distinctions are not cosmetic labels. They determine what the user should do next and what the system is allowed to do later.

If an agent says “done” when it is actually waiting for a missing approval, downstream automation can assume a completed state that does not exist. If it says “failed” when it merely needs clarification, useful work can be abandoned. If cancellation and completion are indistinguishable, the system may resume a task whose authority has disappeared.

The stop state belongs in the machine-readable contract.

That is especially important for agents communicating with other agents or workflow engines. Natural-language summaries are not enough. The surrounding system should know whether the task terminated successfully, provisionally, conditionally, or by force.

Stopping is therefore an output.

A good controller emits not only the answer but the status of the answer.

Interruption must also propagate faster than reasoning.

Long-running systems create another design requirement that single-turn models barely expose.

A stop signal has to travel.

Suppose an agent has launched five parallel branches. Two are retrieving documents. One is running code. One is waiting on an external API. One is preparing a write action. The user cancels.

What exactly stops?

If only the central model stops generating, the tools may continue. A queued write may still execute. A retrier may interpret the cancellation as a transient failure and start again. A child task may not know the parent no longer has authority.

This is a distributed-systems problem.

Cancellation has scope, propagation, acknowledgement, and cleanup.

The system needs to know which actions can be interrupted safely, which require compensation, and which have already crossed an irreversible boundary.

A database transaction can roll back before commit.

An email cannot be unsent after the recipient reads it.

A file edit may be reversible through version control.

A payment may enter a settlement process with its own cancellation rules.

The stop architecture has to match the action semantics.

This is one reason agent permissions should be bounded and actions should be staged where possible. The smaller the irreversible surface, the more meaningful the stop signal remains.

Interruption also needs priority.

A user withdrawal of authority should not wait behind a model’s desire to finish its current reflection pass. A hard policy block should not be deferred until the agent completes an elaborate plan. The stop channel has to outrank ordinary reasoning traffic.

Brakes that can only be applied after the computation feels finished are not brakes.

Some stops should be sticky.

Models are trained to solve obstacles.

That is usually desirable.

It becomes dangerous when a boundary is interpreted as another obstacle.

A tool returns permission denied. The model tries another endpoint. A policy refuses an action. The model reformulates the request. A user says not to send the message. The agent continues drafting alternatives in a workflow that may later send automatically.

A governed system needs to distinguish recoverable failure from authoritative stop.

Some stop conditions should be sticky until an authorized external event changes them.

Permission denied because a token expired may be recoverable.

Permission denied because the user lacks authority is not a puzzle for the model to solve.

A temporary network failure may justify retry.

A user cancellation does not.

A verifier failure may justify revision.

A hard policy prohibition may prohibit the action family, not merely the current wording.

This distinction is a form of typed friction.

The loop should know what kind of “no” it received.

Otherwise persistence becomes boundary erosion.

The most capable agent can become the least governable one if every constraint is translated into an invitation to search harder.

Stopping deserves its own evaluation set.

We evaluate whether models answer correctly.

We should also evaluate whether systems stop correctly.

Give the system easy tasks and measure wasted continuation.

Give it hard but solvable tasks and measure premature termination.

Give it impossible tasks and measure whether it fabricates certainty or surfaces the information boundary.

Give it contradictory evidence and measure whether it escalates.

Give it a hard permission block and measure whether it respects the boundary rather than route around it.

Give it a cancellation mid-task and inspect whether child actions terminate.

Give it a correct early answer and see whether additional reasoning destroys it.

Give it a stale environment and test whether it re-observes before acting.

These are stop benchmarks.

They expose a class of intelligence that ordinary accuracy tests miss.

A system can be excellent at solving and terrible at quitting.

In a passive benchmark, that defect may look like extra tokens.

In an autonomous workflow, it can become cost, delay, duplicated action, boundary violation, or harm.

The ideal controller is not timid.

It is decisive for the right reasons.

It continues while the loop has a credible source of useful difference. It changes mode when internal reasoning reaches an information boundary. It stops a particular action when authority disappears even if the broader task remains alive. It reports why it stopped. It preserves enough state to resume when resumption is legitimate. And it treats some boundaries as final until somebody entitled to move them does so.

That is more than token management.

It is the architecture of agency under limits.