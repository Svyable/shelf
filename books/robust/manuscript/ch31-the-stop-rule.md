# The Stop Rule

Every ambitious system needs a sentence that begins with *stop when*.

Stop when the error rate crosses this threshold.

Stop when the action volume exceeds the expected range.

Stop when the model version changes without evaluation.

Stop when the system loses the evidence required to justify a decision.

Stop when the fallback is unavailable.

Stop when the incident cannot be observed clearly enough to distinguish success from damage.

Stop when the person who owns the consequence says stop.

This sounds obvious.

Most organizations are better at defining how a system begins than how it stops.

There is a launch plan. A rollout plan. A growth target. An adoption dashboard. A utilization goal.

A roadmap for broader autonomy. Then performance becomes ambiguous. A few errors appear.

Customers complain in a way that does not fit the metric.

The new model looks better overall and worse on one important edge.

The agent begins using a tool differently. The economics shift. A provider changes a policy. The human reviewers stop paying attention. Everyone sees pieces of the problem.

Nobody knows whether the organization has crossed the line that should change the operating mode.

The system keeps going because going is the default.

That is not robustness.

It is inertia at machine speed.

## A stop rule is a pre-commitment

The value of a stop rule is that you write it before you are emotionally invested in continuing.

Before the launch earns status. Before the migration consumes three months. Before revenue depends on the feature. Before the executive sponsor has promised success.

Before a team’s identity becomes tied to the system being “AI-native.”

Before shutting it down feels like admitting failure.

A stop rule is a pre-commitment made by the calmer version of the organization.

If this happens, we reduce authority. If this happens, we fall back. If this happens, we pause expansion. If this happens, we reverse the migration. If this happens, a human takes control.

If this happens, we stop the workflow safely.

The rule does not remove judgment.

It protects judgment from organizational momentum.

## Stopping is not binary

The word *stop* makes people imagine a red button and a dead system.

That is one option.

Usually there are better ones.

A robust system has several ways to stop.

Stop expansion.

Keep the current cohort but do not add more users.

Stop commitment.

Let the AI continue drafting or recommending while removing its ability to act.

Stop one action class.

Allow information retrieval but disable deletion, spending, or external communication.

Stop one model route. Move traffic to a known alternative. Stop automation for one category. Send ambiguous cases to a human queue. Stop serving low-priority work.

Preserve the essential function under constrained capacity. Stop completely.

Fail safe when the organization cannot bound the consequence.

This ladder matters because organizations resist stop rules when stopping seems catastrophic.

If the only choices are “full autonomy” and “turn the business off,” people will tolerate a surprising amount of risk to avoid the second choice.

Graceful degradation makes intervention politically and economically possible.

## The authority ratchet

AI deployments tend to have an authority ratchet.

The system starts small. Then it works. Permission expands. It works again. More workflows are added.

More customers depend on it. The human checkpoint becomes a bottleneck. The checkpoint is removed. The system gets a larger action budget. The budget becomes normal.

The temporary exception becomes architecture. This can be exactly the right direction. The problem is asymmetry.

Organizations often have a clear process for granting more authority and no equally clear process for taking authority back.

The ratchet turns one way. A robust authority model should be reversible. Evidence earns authority. Evidence can also withdraw it.

If a model regression appears, the system can drop from act-within-bounds to recommend-only.

If monitoring is impaired, the system can reduce scope automatically.

If a provider incident increases uncertainty, the workflow can move to a simpler path.

If a new failure class appears, the relevant action can require approval until the evaluation catches up.

This should not be treated as punishment.

The system has not become morally unworthy of trust.

The evidence changed.

The authority changes with it.

## Define the evidence before the argument

When a system is controversial, teams can spend days arguing about whether it “feels safe.”

Stop rules force the argument into observable terms.

What would we have to see to reduce autonomy?

A rise in severe errors?

A drop in task success on a protected evaluation set?

A certain number of customer-impacting incidents? A loss of observability? An unexplained change in action distribution? A model version change? A legal or policy change?

A failure of the human escalation queue? A breach of the failure budget? A material increase in reversal cost?

The threshold does not need to be perfectly quantitative.

Some risks resist clean numbers.

A rule can be qualitative and still explicit:

If the system begins making a class of decision for which we cannot reconstruct the evidence, move that decision class to human review until traceability is restored.

That is better than discovering after an incident that nobody agreed traceability mattered enough to stop.

## Somebody must own the stop

A stop rule without an owner is a sentence in a document.

Who can invoke it?

Who must be told?

Can the operator act immediately or does a committee have to agree?

Can a frontline employee halt a dangerous workflow without being punished for interrupting revenue?

Can a security engineer revoke an agent’s credentials?

Can a product leader narrow the cohort?

Can the model-risk team require reevaluation after a version change?

Can customer support escalate a pattern that the aggregate metrics have not yet detected?

Ownership is where governance becomes operational.

A surprising number of organizations distribute responsibility so broadly that nobody has the practical authority to interrupt the system.

Everyone is accountable. Nobody can act. That is the opposite of robust. Responsibility should follow information and authority.

The person closest to the evidence should have a path to trigger the stop.

The person responsible for the consequence should have the authority to maintain or reverse it.

The system should preserve a record of why the decision was made.

## Make restarting harder than stopping

This principle sounds backwards in companies obsessed with uptime.

It is not universal.

For high-consequence autonomous systems, it can be useful.

Stopping should be easy.

Restarting should require evidence that the reason for stopping has been addressed.

Otherwise the organization creates a ritual: Incident. Pause. Pressure. Restart.

No learning. A restart packet can be small. What happened? What changed? Which evaluation now covers the failure?

Which control was added or removed? What scope will restart first? What evidence will justify re-expansion? Who owns the decision?

This turns restart into a controlled release rather than a return to hope.

## Stop rules for people

The principle applies to personal AI use too.

Individuals are building deep cognitive dependencies without formal governance.

That is fine.

You do not need a risk committee for your writing assistant.

You may benefit from a few stop rules.

Stop delegating a task when you can no longer tell good output from plausible output.

Stop trusting memory when you cannot distinguish what you told the system from what it inferred.

Stop automating a communication when the cost of a wrong tone exceeds the time saved.

Stop using a tool as the only home for information you cannot afford to lose.

Stop letting the assistant make a recurring decision when your own objective has changed but the workflow has not.

Stop preserving a manual skill when it no longer contributes to steering, verification, recovery, or transfer.

That last rule matters because stopping cuts both ways.

Sometimes the thing to stop is the old process.

Robustness is not a bias toward intervention.

It is a bias toward conscious control.

## Stop rules for strategy

Companies also need stop rules for bets.

AI creates a peculiar strategic temptation.

Every quarter produces new evidence that seems capable of invalidating last quarter’s plan.

One company reacts by never committing.

Another commits once and defends the decision long after the assumptions disappear.

A scenario portfolio works better when each major bet carries review triggers.

We will build our own inference capacity if external pricing crosses this threshold.

We will consolidate to one provider if the operational complexity of multi-provider support exceeds this value without measurable resilience benefit.

We will automate this workflow more aggressively when the evaluation passes these conditions for this long.

We will stop maintaining the old manual process when the degraded mode has proven sufficient.

We will revisit the hiring plan if agent task capability changes the unit economics in these functions.

The purpose is not prediction.

It is to decide in advance which changes in reality should cause a change in strategy.

That is how plans remain sturdy without becoming still.

## The sentence on the wall

For each important AI system, there should be a sentence everyone who operates it can find.

**We reduce or stop this system when…**

Finish the sentence.

Then finish four more.

**The person who can make that call is…**

**The system moves to this safer mode…** **We preserve this evidence and state…** **We restart when…** That is governance small enough to use. It will not prevent every failure.

It does something more practical.

It prevents the organization from discovering, during the failure, that nobody ever decided how much evidence would be enough to stop.

A sturdy system knows how to move.

It also knows how to stop moving before momentum becomes fate.
