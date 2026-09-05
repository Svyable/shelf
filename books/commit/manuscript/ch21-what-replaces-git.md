# What Replaces Git?

The easiest way to misunderstand the future of Git is to search for the next Git.

History encourages the hunt.

CVS gave way to Subversion in many organizations. Distributed systems such as Git and Mercurial then challenged centralized version control. Git became dominant enough that the category began to feel settled. If software development changes again, surely another tool must arrive, defeat Git on a cleaner architecture, and inherit the repositories.

That is one possible future.

It is not the most interesting one.

The stronger competitors increasingly suggest that Git can lose parts of the job without losing the graph underneath.

Jujutsu is a useful example.

Its user model differs from ordinary Git in important ways. It treats the working copy as a commit, records an operation log that can make broad repository mutations easier to undo, and gives a change an identity that can persist while the underlying commit is rewritten. A developer can therefore reason about “the change I am working on” without equating that change permanently with one Git commit hash.

That addresses one of Git's long-standing conceptual frictions.

In Git, rewriting a commit creates a new commit object because parentage or content changed. The old and new commits may represent what a human considers the same evolving piece of work, but Git's object model correctly treats them as different states. Higher-level tools then have to reconstruct continuity from patch similarity, branch position, review metadata, or convention.

Jujutsu makes the continuity explicit.

Yet its production-ready storage story does not require abandoning Git.

Jujutsu can use a regular Git repository as its backend. It can collaborate with ordinary Git remotes. Commits created through it can appear to other participants as ordinary Git commits. A colocated workspace can allow Git-oriented tools and Jujutsu to inhabit the same project.

This is not replacement by conquest.

It is replacement by overlay.

The user stops dealing with some Git concepts directly while the repository remains compatible with Git's storage and network world.

That is a powerful strategy because ecosystems are harder to replace than commands.

Git's installed base is not merely people typing `git status`.

It is every forge that speaks Git.

Every CI system triggered by Git refs.

Every IDE that understands Git repositories.

Every build service that checks out commits.

Every package manager that accepts a Git URL.

Every deployment system that records a commit ID.

Every organization whose permissions, audit logs, bots, webhooks, security scans, and release processes orbit a Git-compatible remote.

A new version-control experience that can reuse that world starts with an enormous advantage over one that requires the world to migrate first.

Sapling reveals a second replacement pattern.

Developed from Meta's work on version control for an enormous monorepo, Sapling emphasizes usability and scale. Its documentation describes Git-compatible modes as well as deeper storage and working-copy designs intended for environments where ordinary Git representations become expensive. It can interoperate with GitHub and Git network protocols while also exposing concepts and infrastructure better suited to very large repositories.

Again the competitive move is layered.

Keep the boundary the world already speaks.

Replace the painful interior.

This should feel familiar by now because Git itself is evolving the same way.

Reftable replaces reference storage without replacing refs.

Partial clone replaces eager completeness without replacing object identity.

Commit-graphs replace repeated graph computation without replacing commits.

A tool such as Sapling can replace working-copy and repository machinery while preserving enough Git compatibility to participate in the existing ecosystem.

The question “Does Sapling replace Git?” is therefore badly formed.

Which Git?

The command-line interface?

The working-tree model?

The `.git` directory layout?

The object graph?

The wire protocol?

The hosting ecosystem?

The pull-request institution?

The social habit of identifying software states by commit hashes?

A competitor can replace two of those and depend on four others.

That is probably how Git eventually becomes less visible.

Pijul represents a more fundamental challenge.

It starts from a different theory of change. Rather than making snapshots and three-way merge the center of its model, Pijul is built around composable changes and a graph representation intended to make independent changes commute. Its pitch reaches directly into one of Git's most stubborn costs: the difficulty of moving, combining, and resolving changes when history is rewritten or concurrent edits interact.

This is closer to a replacement at the conceptual layer.

If the change itself has durable identity and composition laws stronger than a snapshot DAG provides, some operations Git treats as history surgery can become natural properties of the model.

That is a serious idea.

It also demonstrates why superior theory does not automatically produce ecosystem displacement.

A version-control system is a coordination standard. Its value rises with the number of other participants who can exchange history, review changes, host repositories, run builds, sign releases, and integrate tools around it.

Git's flaws are partially subsidized by universality.

Every developer learns the same weirdness.

Every forge invests in the same model.

Every IDE builds the same integration.

Every CI platform knows how to fetch the same repository type.

The cost of understanding Git is paid once and reused across employers, languages, clouds, and projects.

A better system has to overcome that network effect.

This is why compatibility layers matter so much.

The next successful version-control interface may not ask organizations to choose between Git and something else.

It may say: keep your Git remote; work differently locally.

That is exactly the kind of migration mature infrastructure allows.

The web did not require every server operator to stop speaking HTTP when browsers became richer applications. SQL databases survived enormous changes in storage engines and distributed execution because the query boundary remained valuable. Linux survives under graphical interfaces used by people who never type a shell command.

An interface can disappear from attention while remaining central to interoperability.

Git may follow that path.

This is the distinction between replacement and substrate.

A substrate can lose the user experience and keep the ecosystem.

That possibility becomes more likely with coding agents because agents weaken the value of Git's human interface while strengthening the value of its machine-readable history.

Humans complain about Git because Git asks them to maintain a precise mental model of index state, refs, upstreams, detached heads, rebases, conflict stages, and command options that accumulated over two decades.

Agents do not experience command-line confusion the same way.

A machine can call plumbing commands directly. It can inspect object IDs. It can create worktrees. It can maintain explicit state instead of remembering which branch it thinks it is on. It can learn from an error message instantly and retry.

The ugly interface becomes less important to a nonhuman operator.

At the same time, agents benefit enormously from the durable core.

A task starts from a named commit.

A workspace gets an isolated branch or worktree.

Changes become commits.

Tests attach to exact states.

Several proposals can be compared.

A failed experiment can be abandoned.

An accepted history can move `main`.

The old object graph becomes an excellent machine coordination primitive even if nobody wants to teach a new employee the difference between `reset --soft` and `reset --mixed`.

This suggests a strange future in which Git survives partly because machines do not mind Git.

The human-facing layer may become dramatically simpler.

A developer says: fix the authentication race.

The system creates workspaces, candidates, commits, tests, and reviews below the interface.

The developer sees the task, the evidence, the proposed behavioral change, and perhaps a semantic summary.

Git remains underneath as the ledger of exact states.

The person may never type a Git command.

Did Git lose?

Only if the shell is the product.

The more important replacement pressure concerns the concept of a commit itself.

Git commits identify snapshots and parentage with metadata. They are excellent state coordinates. They are less natural identities for changes that evolve through review.

A pull request may be rewritten ten times. Its branch tip changes with each push. Reviewers still think of the pull request as one proposal. The hosting platform supplies the stable social identity Git does not.

Jujutsu's change IDs address a similar gap locally.

Stacked-change tools address it socially.

Patch-based systems address it structurally.

Agent orchestration will make the gap more obvious because a task can produce a lineage of attempts that are neither one immutable commit nor one simple branch.

The future version-control object may therefore include both state identity and change identity.

State asks: what exact tree and ancestry is this?

Change asks: which evolving intention does this state belong to?

Git currently handles the first natively and delegates the second upward.

That delegation may remain the correct abstraction boundary.

A forge, review system, or agent platform can assign a stable proposal identity while Git stores each exact revision of the proposal as commits. That arrangement has an attractive property: the higher-level concept can evolve without changing the durable repository format.

The social object is mutable.

The historical states are exact.

This is already how pull requests work.

The future may simply make the separation more systematic.

Another potential replacement layer is merge.

Git's three-way merge is astonishingly effective for ordinary source text. It is also ignorant of program semantics and can produce clean merges whose combined behavior is wrong. Patch-theoretic systems seek stronger models of change. Semantic merge tools use language structure. Agent systems can run tests, analyze dependencies, and synthesize conflict resolutions.

Git does not need to win that competition.

It needs to store the result.

The merge engine can become replaceable infrastructure above the graph.

Git already permits custom merge drivers for particular content types. Hosting systems perform integration outside a developer's local process. Future merge services may operate across language-aware representations and then write an ordinary merge commit whose tree records the chosen state.

This is the pattern again.

Meaning moves upward.

Identity stays below.

The same may happen to diff, blame, bisect, and review.

A semantic diff can replace the first view of a patch while raw Git diff remains the fallback.

A causal analysis system can outperform line-based blame for understanding why a behavior exists while the commit graph remains evidence.

An AI debugging system can choose experiments more intelligently than binary `git bisect` while still using commits as testable points.

A review system can reason about task intent while commits remain the stable states being evaluated.

Git can lose every visible contest and keep being useful.

This is not guaranteed.

Standards can be displaced.

A sufficiently better model combined with a sufficiently strong distribution channel can move an ecosystem. A dominant forge could introduce a new repository format and make migration nearly automatic. A new programming environment could become large enough that its version-control needs define another standard. Agent-native development could create workflows so different from branch-and-merge that translating them into Git becomes an expensive compatibility theater.

The durable core still has to earn its place.

What could make it fail?

One possibility is that snapshot history becomes too lossy for machine-scale development.

If thousands of agents continuously transform code, the important unit may become an operation with explicit dependencies, intent, evidence, and reversible semantics rather than a tree snapshot with parent pointers. Git could store resulting snapshots while another database becomes the real history. Eventually the snapshot layer might feel like an export format rather than the source of truth.

Another possibility is authorization.

Git's repository model largely assumes access to a graph rather than fine-grained capabilities over every object and path. Agent systems operating on sensitive monorepos may need stronger, task-specific data boundaries than ordinary repository credentials provide. A new system designed around partial authorization from the start could make Git's access model feel coarse.

A third is scale of concurrency.

If the dominant workload becomes millions of ephemeral proposals, continuously rebased and tested by machines, branch and ref mechanics may survive physically but cease to be the natural coordination model. A transactional change database could become primary, with Git commits emitted only at publication boundaries.

A fourth is semantics.

If software becomes increasingly generated from schemas, models, prompts, declarative specifications, and higher-level artifacts, line-oriented source snapshots may stop being the most useful canonical object. The versioned thing could move upward.

These are real replacement paths.

None requires a competitor to clone Git's current feature set and execute it ten percent better.

The winner would redefine what deserves versioning.

That is how old infrastructure is usually displaced.

Not by improving the same metric.

By moving the boundary.

Databases did not eliminate files by becoming better directories. Cloud systems did not eliminate individual servers by building slightly faster server rooms. Containers did not replace virtual machines by pretending the abstraction was identical.

A successor to Git would need to make today's central object look like a lower-level implementation detail.

The candidates already point in that direction.

Jujutsu says the evolving change deserves identity independent of one commit rewrite.

Sapling says working-copy and repository machinery can be redesigned for scales that strain conventional Git while preserving interoperability.

Pijul says changes themselves can have a mathematical composition model stronger than snapshot-based reconciliation.

Agent platforms may say tasks, evidence, and authority deserve to be the primary objects, with commits generated underneath.

These are not attacks on Git's achievement.

They are evidence that Git taught the ecosystem enough about history to make the next abstraction visible.

The strongest prediction is therefore not that Git wins forever.

It is that Git will be unusually hard to replace all at once.

Its layers have already separated.

The command line can be replaced without replacing the repository.

The ref backend can be replaced without replacing branches.

The working copy can be replaced without replacing remote interoperability.

The merge engine can be replaced without replacing commit ancestry.

The review interface can be replaced without replacing the underlying states.

The local clone can become partial without replacing the object namespace.

The hash can change without replacing content addressing.

This modular survival is what makes infrastructure durable.

Git may someday become like TCP: everywhere, decisive, and rarely the thing users think they are using.

Or it may become like POSIX: an interoperability layer newer systems tolerate because the installed world remains too valuable to abandon.

Or it may become like an old file format: mostly invisible until somebody needs to recover history from twenty years ago and discovers the objects are still understandable.

Those outcomes are different from dominance in the present sense.

They are also different from death.

The question that began this book was which parts of Git were accidents of 2005 and which parts became infrastructure.

The competitors help answer it.

The shell commands look replaceable.

The exact working-copy semantics look replaceable.

The storage backends are already being replaced.

The hosting interface has always been separate.

The graph, content identity, local ability to create history, portable references, and the idea that independent histories can later reconcile remain stubbornly useful.

Those may be the parts a successor inherits even when it claims not to be Git.

A technology's deepest victory is not permanent market share.

It is forcing its replacement to preserve the ideas that made it valuable.

Git may already have crossed that threshold.

The last chapter widens the question one more time.

Git's influence did not stop at version-control software.

It helped normalize a way of thinking about change itself: name the state, preserve the path, branch the possibility, compare the result, reconcile the histories, and keep enough memory to recover when the present turns out to be wrong.
