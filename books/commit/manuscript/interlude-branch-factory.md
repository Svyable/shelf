# Interlude — The Branch Factory

For most of Git’s life, the expensive part of a branch was the person on the other side of it.

The ref itself was cheap.

The work was not.

A developer had to understand the task, find the relevant code, make a change, test it, explain it, and wait for somebody else to review it. That human cost acted as a natural throttle on the number of serious proposals a repository received.

Agents remove part of the throttle.

The change is visible now in ordinary tooling.

GitHub’s current agent products explicitly support multiple isolated sessions running at the same time. Each session can work in its own branch and workspace. A person can delegate one issue, start another research task, launch a separate implementation, and watch the sessions progress concurrently. The interface is already designed around the assumption that the user may be directing several lines of work instead of inhabiting one working tree.

This is a small product fact with a large architectural implication.

Version control is becoming the substrate of a task scheduler.

The repository once answered a developer’s question: what am I changing?

The orchestration layer increasingly answers a manager’s question: which changes are being attempted, by whom or what, against which bases, and which one deserves attention next?

Git can represent all of the branches.

That does not mean the organization should treat all of them equally.

A factory creates inventory.

Agentic development creates proposal inventory.

Some proposals are valuable.

Some are duplicates.

Some are obsolete before they finish.

Some conflict with a higher-priority change.

Some discover that the task was unnecessary.

Some pass every local test and fail when combined.

Some are technically correct and strategically wrong.

The challenge is not branch creation.

It is inventory control.

This makes an old Git lesson newly important.

Reachability is not importance.

An object can be reachable from a ref and still be irrelevant to the project’s future.

A branch can exist without deserving review.

A pull request can be open without deserving merge.

A test can pass without making a proposal valuable.

The orchestration system needs a stronger vocabulary than open and closed.

Consider ten agents assigned to ten issues at nine in the morning.

All ten start from the same `main` commit.

At 9:07, the first agent finishes and proposes a small fix.

At 9:11, a second changes an interface shared by three other tasks.

At 9:14, a human merges an unrelated security patch.

At 9:20, five agent branches are still green against the original base.

What does green mean now?

Their tests may have run against a state that no longer exists on the shared branch.

One may be trivially rebaseable.

One may compile after rebasing and violate the new security assumption.

Two may now solve the same problem because the interface change made one issue disappear.

Another may still be worth merging but only after a migration is added.

The branch graph captures ancestry.

The orchestration layer has to capture relevance.

GitHub’s merge queue is an early form of this distinction.

A pull request can satisfy its normal requirements and still need evaluation against the latest target branch and changes ahead of it in the queue. The queue treats readiness as relational rather than permanent.

A proposal was ready for one state.

The target moved.

Readiness has to be tested again.

Agent-scale authorship turns that from a high-volume-repository feature into a general law.

The value of a patch decays with changes around it.

The faster proposals are produced, the faster some proposals become stale.

This changes the economics of rebasing.

Human developers often preserve a branch because the work inside it took days and the author carries context that would be expensive to recreate. A generated branch may be cheaper to discard and regenerate against a new base.

That sounds liberating.

It can also destroy evidence.

The same prompt issued tomorrow may produce a different patch.

The model may have changed.

A dependency may have changed.

A test may have become flaky.

The repository state is different.

An external service may return different data.

Regeneration is not time travel.

The system therefore needs to distinguish disposable work from consequential work.

A speculative branch can be ephemeral.

A merged branch needs an audit path.

A failed security experiment may deserve retention because the failure taught the system something.

A duplicated branch may be safely deleted after the deduplication decision is recorded.

Retention becomes a policy over work states, not a blanket rule.

This is familiar in manufacturing.

Factories do not keep every intermediate part forever.

They do keep records about important lots, quality failures, and shipped products.

Agentic development will need the software equivalent.

The interesting unit may be the task.

A task has intent.

It has a base commit.

It has one or more attempts.

It has evidence.

It has dependencies.

It has a disposition.

Merged.

Rejected.

Superseded.

Abandoned.

Needs human decision.

Blocked on another task.

A branch is one implementation vehicle for an attempt.

That is a different mental model from treating the branch itself as the work.

Human Git culture often named branches after tasks because the two were close enough to be interchangeable.

`fix-login-timeout`.

`add-oauth-provider`.

`refactor-parser`.

The branch name served as a mnemonic.

At machine scale, the branch may become a generated identifier and the task database may hold the meaningful name.

This does not weaken Git.

It clarifies its role.

Git stores candidate states.

The orchestration layer stores why the candidates exist.

The relationship resembles a database index.

A pull request number is not the commit.

A task ID is not the branch.

A session ID is not the patch.

Each is a handle for a different layer of reality.

Confusing them creates brittle automation.

Suppose a task produces three attempts.

Attempt A is simple and fails performance tests.

Attempt B is complex and passes.

Attempt C is simple, passes, and only exists because the agent learned from the failure of A.

If the system keeps only the final branch, it loses the experiment history.

If it keeps every intermediate commit forever on `main`, it pollutes accepted history with discarded hypotheses.

The better model separates experimental history from product history.

Git already permits that.

Branches can hold attempts.

Refs can be temporary.

Commits can exist without becoming ancestors of the main branch.

The main branch remains a selective narrative of accepted states.

The orchestration layer can preserve richer task history elsewhere.

This is one reason squash merging can be attractive and dangerous in agent workflows.

Squashing produces a compact accepted commit.

It can remove noisy iteration.

It can also erase useful boundaries among meaningful steps.

There is no universal answer because the value of intermediate history depends on the task.

A mechanical dependency update may need only the final state and automated evidence.

A complex security fix may benefit from preserving the failing test, the mitigation, and the final cleanup as separate commits.

An agent should not decide this merely by imitating a style guide.

The workflow needs to know what history is useful for.

Branch factories also create a scheduling problem for reviewers.

If producing a proposal becomes cheap, review cannot remain first-in, first-out.

The queue has to become risk-aware.

A one-line authorization change may deserve more attention than a thousand-line generated formatting migration.

A database schema change may block several other branches.

A patch touching money movement, authentication, deletion, encryption, or public APIs may need a domain owner even when every test is green.

A documentation change may be safe to merge automatically.

Proposal volume makes equal treatment irrational.

The repository has always contained changes of unequal consequence.

Human scarcity concealed the scheduling problem because there were fewer of them.

Agents expose it.

This pushes review toward triage.

Which proposals can be decided by deterministic policy?

Which need sampled inspection?

Which need specialist review?

Which need adversarial testing?

Which should be bundled?

Which should be rejected without deep review because another proposal already dominates them?

A good system spends expensive attention where it changes the decision.

This is different from maximizing the number of merged pull requests.

Throughput is an appealing metric because it is easy to count.

It may become a terrible goal.

If agents can create twice as many proposals next month, a team can double its merge count without improving the product.

The scarce output is not accepted commits.

It is useful, safe change.

The distinction becomes crucial in organizations where agent activity is measured.

Once dashboards show number of tasks completed, patches opened, lines changed, or pull requests merged, systems will optimize those numbers.

The result can be proposal inflation.

More branches.

More review requests.

More shallow fixes.

More generated cleanup.

The graph gets busier while the product changes little.

Git will not protect the organization from this.

Git is neutral about why a commit exists.

Governance has to value consequence over activity.

The cheapest defense is rejection.

Human software culture often treats rejection as expensive because somebody spent a week creating the proposal.

Machine production changes the moral economy.

Throwing away a generated attempt is not disrespect.

It can be good engineering.

The system should make it easy to say no.

No, this duplicates better work.

No, the evidence is weak.

No, the design is too complicated.

No, the issue is not important enough.

No, the base moved and regeneration is cheaper.

No, all three attempts are worse than leaving the code alone.

Abundant production makes selectivity more important, not less.

There is another pressure: compute.

An agent branch is cheap in Git.

The tests attached to it may not be cheap.

A large repository can spend substantial resources compiling, running integration suites, building containers, scanning dependencies, provisioning environments, and executing performance tests.

If agents can open proposals faster than CI can evaluate them, test capacity becomes the new queue.

This creates incentives for staged evidence.

Run the cheapest relevant checks first.

Cancel work for superseded branches.

Share build outputs when inputs are identical.

Select tests based on affected components.

Defer expensive full-system tests until a proposal survives earlier filters.

Use merge-group tests for the state that could actually land.

Large organizations already do versions of this.

Agent production makes the optimization central.

The danger is that test selection can hide failure.

A system that predicts which tests matter can be wrong.

A patch can affect behavior through a dependency path the selector did not model.

A safe design therefore uses selected testing as triage, not as metaphysical proof that untouched tests are irrelevant.

The pattern is the same as semantic diff.

Compression is useful.

Compression needs an escape hatch.

Some changes deserve the full suite even when the model predicts otherwise.

The closed-loop review problem deserves special caution.

Once one agent can write a patch, another can review it, a third can generate tests, and a merge queue can integrate it automatically, an organization can build a pipeline in which no human is required for ordinary changes.

That can be exactly right for some work.

A dependency checksum refresh may be fully governed by deterministic policy.

A generated documentation update may be low consequence.

A mechanical migration may be safer when the transformation is specified and verified automatically than when a tired person reviews hundreds of identical hunks.

The danger begins when automation is used as evidence for itself.

An agent writes the change.

A related model summarizes the change.

Another related model judges the summary.

Tests generated from the same interpretation pass.

The system sees agreement.

The agreement may be correlated error.

Independence matters more than the number of green signals.

This is why deterministic checks remain valuable in an agent-heavy workflow.

A compiler does not become impressed by the explanation.

A type checker does not reward confidence.

A property test can expose a counterexample the authoring model did not expect.

A security policy can reject a forbidden capability regardless of how persuasive the pull request description sounds.

Humans are not independent by default either.

Teams share assumptions.

Reviewers skim.

Experts become overloaded.

The goal is not to preserve a ritual in which a person clicks approve.

The goal is to build evidence from different failure modes.

Machine author.

Deterministic test.

Specialist analyzer.

Independent model.

Domain owner where consequence justifies it.

Production can be cheap while verification remains plural.

The branch factory also creates a new kind of spam.

Traditional repository spam is easy to recognize because the contributor has little relationship to the project and the patch is obviously irrelevant.

Agent spam can be technically competent.

A machine can generate plausible cleanup, extra tests, stylistic refactors, documentation rewrites, dependency changes, and speculative optimizations continuously.

Each patch can look reasonable alone.

Together they can consume the project’s entire attention budget.

Public projects may eventually need proposal admission control before code review begins.

Who is allowed to spend maintainer attention?

What evidence must accompany a machine-generated proposal?

Is the issue recognized by the project?

Does the change have a sponsor?

Has duplicate intent already been detected?

Can routine agent traffic be rate-limited or routed through a staging queue?

These are governance questions, not merge-algorithm questions.

The remarkable thing is that Git remains comfortable underneath them.

The repository does not care whether a commit came from a first-time contributor, a staff engineer, a dependency bot, or an autonomous agent.

The social system cares enormously.

That separation is becoming sharper as authorship becomes abundant.

It may eventually be one of the reasons Git survives the transition.

The durable data model stays neutral.

The admission system can become much more selective.

The branch factory also changes ownership.

Traditional code ownership maps people to areas of a repository.

Agents complicate the map because the producer may have no durable expertise.

An agent can change authentication today and documentation tomorrow.

The accountable owner remains the person or team responsible for the subsystem.

This suggests that authorship and ownership will separate more sharply.

The author field may say little about who should judge the change.

Routing has to follow consequence.

A generated patch touching the payments ledger should reach the payments owners even if the agent was launched by a developer in another team.

A change to a shared compiler flag may need build-infrastructure review even if application tests pass.

The repository structure, dependency graph, and policy system all become inputs to attention routing.

Again, Git provides coordinates.

The surrounding system decides authority.

Multiple isolated agent sessions are valuable because they reduce shared mutable state.

Each task can have its own branch and worktree.

The agents do not overwrite one another’s files.

They can experiment without corrupting a common checkout.

But isolation creates a false sense of independence if the tasks share semantics.

Two agents can edit different files and still conflict.

One changes a database schema.

Another changes a service that depends on the old schema.

One alters an error code.

Another updates a client that interprets it.

One removes a feature flag.

Another assumes the flag still exists.

The branches are filesystem-isolated and logically coupled.

The orchestration layer therefore needs dependency detection.

Some dependencies are explicit.

Issue B depends on issue A.

Package Y imports package X.

Migration 12 must run before migration 13.

Some are inferred.

Two proposals touch the same symbols.

Two tests fail under the same combined state.

One patch changes an API another calls.

Some are social.

A team has decided to replace one design, so proposals extending the old design should pause.

No static graph captures all of these.

The system needs uncertainty.

This is where agent orchestration can go wrong by becoming too confident.

A scheduler with a beautiful dependency map may encourage people to treat unmodeled relationships as nonexistent.

Software does not cooperate.

Configuration, runtime data, external services, timing, and organizational assumptions create couplings beyond the code graph.

The integration system has to remain suspicious.

The most robust branch factory may therefore look less like a fully automated assembly line and more like air-traffic control.

Many independent actors.

Shared constrained space.

Clear identities.

Explicit routes.

Automated conflict detection.

Priority rules.

Human intervention when the model becomes uncertain.

A plane can fly itself for long stretches and still operate inside a control system that assumes coordination matters.

An agent can write code autonomously and still need integration governance.

The metaphor has another useful property.

The goal of air traffic control is not to maximize the number of planes in the air.

It is to move useful traffic safely through shared space.

The same should be true of software proposals.

The branch is not the product.

The merge is not the product.

The product is the behavior users receive.

Git’s future role in this factory may become almost invisible.

Agents may not type commands.

An orchestration API may create branches, update refs, materialize worktrees, and push commits automatically.

Humans may interact with tasks and evidence rather than repositories.

Yet the underlying graph remains useful because it gives every attempt a stable base and every accepted result an exact state.

The factory can generate quickly because Git makes isolation cheap.

It can recover because history is explicit.

It can discard attempts because branches are cheap.

It can compare alternatives because commits are exact.

It can serialize acceptance because the shared branch has ancestry.

The new bottleneck sits above Git.

Selection.

Which work deserves to become memory?

That is the question a branch factory cannot automate merely by adding more agents.

More authors create more possibilities.

They do not create more truth.

The most useful metric may therefore be decision quality per unit of attention, not commits per day. That metric is harder to automate, which is precisely why it matters. A branch factory should make good decisions cheaper. If it merely makes branches cheaper, it has optimized the part Git solved twenty years ago.

The next interlude looks at the opposite end of the time scale.

Agent systems compress production into minutes.

Software archives stretch history across decades.

Git’s future depends on serving both: the branch created for ten minutes and the commit somebody will need to understand fifty years from now.