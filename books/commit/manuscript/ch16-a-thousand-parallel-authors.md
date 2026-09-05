# A Thousand Parallel Authors

Git made branches cheap before software made authorship cheap.

For years, that asymmetry was comfortable. A repository could support thousands of branches in principle, but the rate at which people produced serious changes remained bounded by human attention, working hours, organizational permission, and the sheer effort of understanding a codebase. Even large open-source projects did not wake each morning to discover that every open issue had independently produced three candidate patches overnight.

Coding agents make that scenario less absurd.

The important number is not literally one thousand. It is the change in ratio between proposal and attention.

When producing a plausible patch costs less, more patches become rational to produce. A developer can ask for two implementations and compare them. A triage system can dispatch several issues at once. A company can run maintenance tasks in parallel across a large repository. An agent can retry after a failed test without waiting for another human work session.

Git can store the resulting histories.

That is not the hard part.

The hard part is deciding which histories deserve to survive.

This is the same scarcity Chapter 12 described in ordinary distributed development, but machine authorship changes its scale. Reconciliation was always the work. Now creation can outrun reconciliation by orders of magnitude.

A branch is cheap because it is mostly a name pointing at a commit. An abandoned branch costs little in Git's object model. A proposed change costs much more socially. Somebody or something has to decide whether it duplicates another proposal, whether its tests are meaningful, whether its assumptions still hold, whether the base has moved, whether it conflicts with a higher-priority change, and whether merging it spends scarce risk budget wisely.

The repository becomes an attention-allocation system.

That phrase can sound abstract until a busy integration branch makes it literal.

Suppose twenty changes are individually green against yesterday's main branch. They touch different files, so none produces a textual merge conflict. Merging all twenty can still fail. Two changes may alter assumptions on opposite sides of an interface. Three may independently update a generated artifact. A dependency bump may invalidate tests run by another branch. A database migration can compose syntactically and fail operationally. A performance optimization can erase the headroom another feature assumed.

Green in isolation is not green in combination.

Git's graph represents the independent histories perfectly well. It does not choose an integration order.

Hosting platforms have already built machinery for this problem. GitHub's merge queue, for example, is designed for busy protected branches. Once a pull request satisfies the configured requirements, the queue tests it against the latest target branch and changes ahead of it in the queue before merging. The feature exists because a pull request that passed yesterday's checks can become unsafe after another pull request lands.

That is ordinary human-scale concurrency.

Agent-scale concurrency makes the queue more central.

If ten agents start from the same base commit, their branches are siblings. The first merge changes the environment for the other nine. Some remain valid. Some need rebasing. Some become redundant because the first change fixed the underlying issue. Some still apply cleanly but now represent a worse design than the code that landed.

A naive system can keep all nine alive and spend compute retesting them.

A better system asks whether they are still worth attention.

This is where version control begins to meet scheduling.

Operating systems learned long ago that the existence of runnable work does not imply that all runnable work should execute immediately. Databases serialize or reject conflicting transactions. Build systems avoid recomputing outputs whose inputs have not changed. Large agent systems will need analogous discipline around code proposals.

The Git branch can remain the unit of isolation while another layer decides priority.

Priority might come from the issue severity, expected user value, confidence, age, dependency relationships, reviewer availability, test cost, security sensitivity, or whether another branch appears to solve the same problem. None of those belongs naturally in a commit object.

They belong around the graph.

This is another example of Git benefiting from being incomplete.

The temptation in a new era is to demand that the old tool become the entire new system. Git should understand agents. Git should understand tasks. Git should understand semantic conflicts. Git should rank patches. Git should know which tests matter.

That would make Git less durable, not more.

A graph of content states and ancestry is valuable precisely because other systems can attach changing policy to it. The same commit can be evaluated by a unit-test service, a security scanner, a reviewer, a deployment system, and an agent scheduler without changing its identity.

The new pressure is to make those attachments composable enough that the integration system can reason about them.

Consider duplicate work.

Human teams already create it. Two developers fix the same bug. Two pull requests add similar features. Open-source maintainers close one proposal in favor of another. The cost is usually tolerable because duplication emerges at human speed.

Agents can duplicate work before anyone notices.

If an issue description is broad, several agents may converge on nearly identical patches. Worse, they may produce superficially different patches that solve the same symptom while encoding incompatible long-term designs. Textual similarity is only a partial clue.

A high-throughput repository therefore needs deduplication before deep review.

That could mean grouping proposals by task, comparing touched symbols, checking whether one branch subsumes another, or running behavioral tests that reveal equivalent outcomes. The exact mechanisms will change. The underlying reason will not: review attention is too expensive to spend repeatedly on the same intent.

Ranking creates a different danger.

Once proposals are abundant, systems will want scores. Test pass rate. Static-analysis confidence. Model self-evaluation. Estimated risk. Reviewer history. Predicted mergeability.

Scores can help route attention. They can also create false precision.

A patch with a 0.91 confidence score is not necessarily safer than one with 0.84. The number may compress assumptions about tests, training data, repository familiarity, or the model that generated it. An integration system should use ranking as triage, not as a substitute for evidence.

The same caution applies to voting among agents.

Generating five solutions and choosing the majority result sounds robust until the agents share the same blind spot. Correlated systems can agree confidently. Version control can preserve the alternatives, but plurality does not establish correctness.

The most valuable parallelism may therefore be heterogeneous.

One agent writes a patch. Another tries to break it. A third examines dependency effects. A deterministic test suite checks known behavior. A human reviews the part whose consequence is difficult to automate. The graph records the candidate states; the surrounding workflow supplies adversarial pressure.

This is less glamorous than a thousand agents coding at once.

It is more likely to scale.

Integration pressure also changes branch lifetime.

Human feature branches can remain open for days or weeks because the author is expensive to restart and carries context that would be lost. An agent branch may be disposable. If the base moves too far, rerunning the task against current main can be cheaper than carefully rebasing a long sequence of generated edits.

That is a profound change in the economics of history.

Git users traditionally preserve work because producing it was costly. Machine-generated work can sometimes be regenerated from intent. When regeneration is cheap and deterministic enough, the valuable artifact may be the task specification plus accepted result, not every intermediate branch.

But regeneration is not always safe.

Models change. Dependencies change. External services change. Prompts are interpreted differently. Tests can be flaky. A regenerated patch may not be equivalent to the original even when the instruction is identical. Throwing away history because "the agent can do it again" can erase the only evidence of what actually happened.

The right retention policy will depend on consequence.

A failed experimental branch can probably disappear after useful telemetry is extracted. A machine-produced change that reached production deserves a durable audit path. A security-sensitive change may justify preserving more provenance than a routine documentation update.

Again, Git provides the graph but not the retention policy.

The same is true of testing capacity.

At human proposal rates, continuous integration is often treated as an automatic consequence of opening a pull request. At machine proposal rates, CI itself becomes a scheduled resource. Running a full integration suite on every speculative branch can cost more compute than generating the code.

That pushes repositories toward staged evidence.

Cheap checks first. Expensive checks later. Tests selected by affected components. Shared build artifacts. Cancellation of runs for superseded branches. Integration testing only after a proposal survives earlier filters.

None of this is conceptually new. Large build and test systems already do it. What changes is that version-control activity becomes one of the main sources of workload rather than a modest trigger for it.

The merge queue illustrates the direction because it treats integration as a stateful process rather than a button.

A proposal waits. The base changes. The proposal is evaluated in the context it would actually enter. A failed merge-group check can remove it from the queue. The system recognizes that readiness is relational: a branch is not simply good or bad; it is good or bad relative to a particular target state and set of policies.

That idea becomes essential with machine authors.

An agent may produce a correct patch at 10:03 and an obsolete patch at 10:11 because another change landed. The commit has not changed. Its value has.

Git has always allowed that distinction. A commit is a durable object; whether a branch should point to it is policy.

Machine-scale collaboration makes the distinction impossible to ignore.

It also puts pressure on review interfaces.

A pull request page was designed around a manageable proposal. A title, description, diff, checks, comments, perhaps a handful of commits. If a maintainer has two hundred agent proposals waiting, opening them one by one is already a failed system.

The first interface must become a map.

Which proposals touch the same subsystem? Which are blocked by another? Which have independent evidence? Which change public APIs? Which alter authentication, money movement, data deletion, or schema? Which are mechanical? Which have already been reviewed by a domain owner? Which are likely duplicates?

This is not a replacement for detailed review.

It is how detailed review gets allocated.

The distinction mirrors database query planning. A database can contain millions of rows, but usefulness depends on not asking a person to scan them all. A repository with abundant proposed histories needs indexes over intent, risk, dependency, and evidence.

Git's existing indexes accelerate graph and object questions. Future collaboration systems will need indexes over social and semantic questions.

The branch name may become less important in that world.

Humans name branches because names help memory and coordination. Agents can generate unique identifiers without needing poetry. What matters more is the relationship between proposal, task, base, evidence, and target. The branch remains a ref; the meaningful identity may live in the orchestration layer.

This does not make branches obsolete.

It makes them infrastructure.

The same happened to commits for many developers. People once interacted directly with object IDs and patch email. Hosting platforms added interfaces that made the graph easier to inhabit. Agent orchestration may add another layer that makes thousands of branches manageable without changing what a branch is.

There is a governance consequence too.

Cheap proposals can create pressure to lower merge standards simply because the queue looks large. A team may begin treating review as a throughput problem to be optimized away. That is exactly backward when the cost of producing another candidate has collapsed.

When proposals are cheap, rejection should become cheap too.

A maintainer should be able to discard a branch without feeling that a week of someone's labor has been wasted. An agent can try again with better constraints. The system can prefer a small number of well-supported changes over a large number of merely plausible ones.

This may be one of machine authorship's healthiest effects on software culture.

Human effort creates understandable reluctance to throw work away. That reluctance can keep mediocre designs alive because too much time has already been invested. Machine-produced alternatives make it easier, at least economically, to say no.

The danger is replacing sunk-cost bias with volume bias: assuming that because ten solutions were easy to generate, one of them must be good.

The integration system needs permission to answer none.

Git can represent that outcome elegantly.

The branches simply do not become ancestors of the shared branch.

History is selective memory.

A thousand parallel authors therefore do not require a thousand times more history on main. They require a better process for deciding what main remembers.

That process will depend increasingly on information a line diff does not show. Two patches can edit different files and still conflict in behavior. One patch can move hundreds of lines without changing behavior. A generated file can dominate the visible diff while the consequential change is a three-line schema edit.

The next bottleneck is not only the number of proposals.

It is the representation used to understand them.

Git's textual patch is one of the most successful compression formats in software collaboration. Machine-scale authorship is about to test how far that success can stretch.