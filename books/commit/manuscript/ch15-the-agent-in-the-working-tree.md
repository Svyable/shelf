# The Agent in the Working Tree

For most of Git's life, a working tree had an implied inhabitant.

Someone had checked out the branch. Someone had opened the files. Someone was changing them, probably with a text editor close at hand and a mental model of the task that extended beyond the patch on disk. Git never required that person to be present, of course. Scripts have generated source files for decades. Bots have updated dependencies, reformatted code, and cut releases. But the ordinary social assumption remained stubbornly human: a working tree was the temporary workspace of a developer.

Coding agents weaken that assumption.

By 2026, an agent can receive an issue, inspect a repository, edit several files, run tests, create commits, and propose the result for review. The important change is not that software can type code. Build generators, refactoring tools, and code completion all did versions of that. The change is that the unit of delegation has widened. A person can hand over a bounded intention rather than a sequence of keystrokes.

That makes Git newly interesting because Git already has a vocabulary for bounded change.

A branch isolates a line of work. A commit names a state and its ancestry. A diff exposes what changed. A remote provides a place to exchange the result. A pull request can attach discussion, tests, policy, and review to the proposed reconciliation. None of those mechanisms were designed for an autonomous coding agent. Yet they form a surprisingly serviceable cage for one.

The word cage matters.

An agent that can edit a repository is useful because it can act. The same capability creates risk because action is broader than suggestion. A completion system that proposes three lines inside an editor is constrained by the developer who accepts or rejects them. An agent operating in a working tree can make dozens of mutually dependent edits before a person sees any of them. It can remove a file, change a test, update a dependency, or satisfy a narrow check in a way that violates the larger intent.

Git does not prevent those mistakes. It makes them inspectable and, often, reversible.

That is a smaller claim than saying version control makes agents safe.

A clean commit can contain a terrible change. A branch can isolate malicious code just as neatly as good code. A green test suite can be incomplete. A signed commit can faithfully identify the actor that produced a vulnerability. Git supplies boundaries and records. It does not supply judgment.

Still, boundaries and records become more valuable as the actor becomes less continuously supervised.

Consider the difference between an editor assistant and a delegated agent. With an editor assistant, the human's attention is usually synchronized with production. The suggestion appears where the person is looking. Acceptance is local. The person may not understand every token, but the interaction encourages frequent checkpoints.

With an agent, production and attention separate in time.

The person describes the task and leaves. The agent reads, writes, tests, perhaps retries, and eventually returns with a result. The reviewer encounters the work after many intermediate decisions have already disappeared from view.

Git's commit graph can preserve some of those checkpoints, but only if the workflow chooses to record them.

That choice is becoming architectural.

A machine author can make one enormous commit containing every successful edit. It can also create a sequence of commits corresponding to meaningful stages: reproduce the bug, add a failing test, change the implementation, update documentation. The latter history may be easier to review, but only when the stages are real rather than a synthetic narrative manufactured after the fact.

This creates an old version-control question in a new form: what should a commit mean?

Git itself is permissive. A commit is a tree, parentage, metadata, and a message. The software does not know whether the tree represents one idea or forty-seven. Humans developed conventions around atomic commits because review, bisecting, reverts, cherry-picks, and maintenance benefit when changes have understandable boundaries.

Agents inherit those conventions without inheriting the human experience that produced them.

A developer who spends three hours debugging a race condition has a memory of the false starts. An agent may have an execution trace, tool calls, test output, and hidden reasoning artifacts, but the final Git history usually contains only the states deliberately committed. The repository can therefore become cleaner at exactly the moment the production process becomes harder to reconstruct.

That tension makes provenance more important and also more complicated.

Chapter 14 separated a commit from the claims people often place on it. An object ID identifies content under the repository's hash rules. Author and committer fields are metadata. A signature can bind a key to an object. None of those facts says whether a human or machine wrote the patch, which model was involved, what instructions it received, what tools it used, or whether a person reviewed the result.

Machine authorship introduces pressure for richer evidence.

Some of that evidence belongs in Git metadata. Some may belong in hosting systems, attestations, audit logs, issue trackers, or agent-session records. Trying to force every detail into the commit object would make history noisy and couple Git to fast-changing agent products. Recording nothing, on the other hand, makes it difficult to answer basic operational questions after a failure.

Who asked for this change?

What task boundary was the agent given?

Which repository state did it start from?

What tests did it actually run?

Did a person modify the result before merge?

Which permissions did the agent have?

Those are not philosophical questions when a patch breaks production.

They are incident-response questions.

Git already answers one of them unusually well: which repository state did this change descend from? Parent commits turn ancestry into data. A branch created for an agent can therefore anchor the delegated work to a known base. If the base moves, the divergence is visible. If another agent works in parallel, the histories can remain separate until somebody or something reconciles them.

This is why worktrees and branches fit agent execution so naturally.

Git worktrees allow more than one working tree to be attached to a repository, each with its own checked-out branch or state. Long before coding agents, this was useful for humans who wanted simultaneous checkouts without duplicating all repository data. With agents, the same mechanism becomes a way to give parallel tasks separate filesystem surfaces.

The important property is not the command used to create them. It is isolation of mutable state.

Two agents editing the same checkout can interfere before Git ever sees a commit. One changes a file while another reads it. One resets the index. One runs a formatter across files the other is modifying. Their failures become filesystem races rather than version-control conflicts.

Give each task its own working tree and branch, and the conflict moves to a place Git understands: reconciliation between histories.

That is progress, not magic.

The branches can still conflict. The agents can still make incompatible architectural decisions. They can both pass tests against their own bases and fail when combined. Isolation prevents accidental shared-state corruption; it does not eliminate semantic interaction.

This distinction is easy to miss because agent demonstrations often optimize for the single task. One prompt, one repository, one result. Production engineering is rarely that tidy. A team may have several humans, dependency bots, release automation, security tools, and coding agents all proposing changes to the same active branch during the same afternoon.

At that point the working tree is no longer the scarce resource.

Integration is.

The agent also changes the meaning of rollback.

For a human developer, `git reset`, `git restore`, a discarded branch, or a revert commit are familiar recovery tools. With delegated software, reversibility becomes part of the permission model. An organization may be willing to let an agent make broad changes inside a branch precisely because those changes do not immediately become the shared branch. The agent receives freedom inside a disposable boundary.

That suggests a useful principle for machine authorship: grant wide freedom where the consequence is cheap, and narrow authority where the consequence is shared.

A sandboxed working tree can be permissive. A merge to a production branch should be harder.

Git did not invent that principle. Databases use transactions. Operating systems use processes and permissions. Cloud systems use isolated environments and staged deployment. Git's contribution is that software development already has a widely understood object for the boundary: the proposed history.

The temptation will be to respond to agents by adding more ceremony to every commit.

That can backfire.

If every machine-produced edit carries pages of generated explanation, reviewers will learn to ignore the explanation. If every commit contains exhaustive model metadata, the durable history may become coupled to transient vendor vocabulary. If an agent creates dozens of tiny commits because a policy equates granularity with auditability, the graph can become harder rather than easier to inspect.

Useful provenance has to answer questions somebody will actually ask.

The task identifier may matter. The starting commit may matter. The tool identity and permission boundary may matter. The test results may matter. The complete stream of intermediate token generation probably does not belong in Git history.

There is also a danger in over-identifying machine work.

A patch can pass through several hands. An agent produces a first implementation. A developer rewrites a function. Another agent updates tests. A maintainer squashes the branch. Who is the author?

Git's existing distinction between author and committer already hints at the difficulty. It was built for a world in which one person could write a patch and another could apply it. Machine collaboration expands the number of roles without making the old fields meaningless.

The durable answer may be to treat authorship as layered evidence rather than a single label.

The commit records a state transition. The hosting platform records who proposed it. An attestation can record how an artifact or patch was produced. The review system records approvals. The issue records intent. An agent service can retain execution details. None needs to pretend to be the whole truth.

This layered model also preserves a crucial fact: human involvement is not binary.

A person can specify a task badly. A person can review superficially. A person can deeply rewrite machine output. A person can approve a patch because tests are green without reading every line. A machine can produce a change from a human-designed plan. Labels such as human-written and AI-written compress too much operational reality.

The repository needs enough evidence to assign responsibility and investigate failure without inventing certainty about creativity.

There is another reason Git remains useful to agents: it is boring.

Agents can call stable command-line tools. They can inspect status, diff, log, branches, and object identities. The repository format does not require a graphical interface or a live cloud session. A local checkout remains understandable when the hosting service is unavailable. Those properties were valuable to distributed human developers and are equally valuable to software that needs deterministic tools.

But agents also expose Git's least friendly surfaces.

The index has state separate from both HEAD and the working tree. Merge conflicts can produce multiple stages for a path. Rebase rewrites history. Submodules introduce another repository boundary. Sparse and partial repositories can make absence mean several different things. Hooks and configuration can execute or alter behavior. A human learns these irregularities over years and often develops intuition about when a repository is in a strange state.

An agent needs that state made explicit.

This is one place where future tooling may change around Git without changing Git itself. An agent-oriented repository interface can expose structured status, allowed operations, policy constraints, task scope, and provenance requirements while still using ordinary Git objects underneath. The agent does not need a new theory of history. It needs a safer contract for manipulating the existing one.

The same may be true of intent.

A textual diff tells a reviewer that a function changed from one body to another. It does not tell the reviewer whether the task was to fix a null dereference, reduce latency, remove a deprecated API, or satisfy a benchmark. Humans carry that context from tickets, conversations, and memory. Agents receive it as instructions and then often discard it from the durable repository record.

A future agent workflow may therefore attach machine-readable task intent to proposed changes without placing that intent inside Git's core object model.

That would follow Git's history rather than betray it.

Git survived partly because it did not try to own every collaboration layer. GitHub could add pull requests without changing commit objects. CI systems could attach checks without teaching Git how to run a build. Signing and attestations could evolve at different layers. Agent intent can do the same.

The working tree is becoming less like a desk occupied by one programmer and more like an execution chamber temporarily assigned to a task.

The repository underneath remains a memory system.

That memory is about to face a volume problem.

A single capable agent is easy to imagine because it resembles a fast developer. A hundred agents do not resemble a hundred developers. They can start at once. They can duplicate one another's work at machine speed. They can generate more plausible patches in an hour than a maintainer can understand in a day.

Cheap authorship changes the bottleneck.

The next chapter is about what happens when Git's greatest social gift—making independent lines of work cheap—meets a world in which creating another line of work costs almost nothing.