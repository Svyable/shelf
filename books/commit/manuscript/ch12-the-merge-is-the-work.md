# The Merge Is the Work

A branch is cheap right up until somebody wants it back.

Git made divergence almost embarrassingly inexpensive. A developer can make a branch by creating a name that points at a commit. Another developer can do the same. A third can clone the repository, disappear onto an airplane, create a dozen commits, and return with a history that the original repository has never seen. None of this requires a reservation, a central lock, or a copied directory tree.

That bargain is so good that it is easy to miss where the bill arrives.

The bill arrives at reconciliation.

Two histories that begin from the same commit can each be internally sensible and still disagree about what the shared project should become. One changes a function signature while another adds a caller. One renames a file while another edits it. One deletes code another developer has just repaired. Sometimes the text conflicts. Sometimes the text merges cleanly and the program is wrong anyway.

Git can help with the first class. It cannot settle the second by arithmetic.

A merge is therefore more than a command that makes the red marks disappear. It is the moment a distributed system has to answer a social question: which independent changes are allowed to become common history?

The ordinary three-way merge contains the shape of the problem. Git identifies the histories being combined and a common ancestor. It can then compare what each side changed since that ancestor. When the changes do not collide, the result may be assembled automatically. When they do, Git records enough state for a person or tool to inspect the competing versions and produce a resolution.

The state Git records during a conflicted merge is more precise than the familiar conflict markers make it appear.

For an unmerged path, the index can retain multiple stages: the version from the merge base, the version from the current side, and the version from the other side. The working-tree file is the place where those alternatives are rendered into something a person can edit, often with conflict markers. Underneath, Git has not merely said “this file is broken.” It has preserved the inputs to the unresolved decision.

That matters because tools can reason over those stages without scraping the prose of a conflict marker. A merge UI can show the base and both sides. A custom resolver can inspect the exact blobs. A human can ask what each branch actually changed relative to the common ancestor instead of treating the conflict as two complete documents fighting for ownership of a file.

The distinction is small until a repository has to resolve the same kinds of conflicts repeatedly.

Modern Git's default `ort` strategy adds another revealing detail. When a merge has conflicts, Git can write an `AUTO_MERGE` ref pointing to a tree that captures the working-tree state produced by the automatic part of the merge, including conflict markers where the algorithm could not finish. The unresolved merge therefore has a nameable intermediate state.

That is a subtle extension of Git's old instinct: when work becomes consequential, turn the state into something the object model can identify.

The `AUTO_MERGE` tree is not a final commit. It does not claim the conflict is resolved. It is an anchor for what the merge algorithm produced before human or higher-level tool judgment completed the job. That can help compare the eventual resolution with the automatic starting point and can make otherwise ephemeral conflict work more inspectable.

This is exactly the kind of feature that becomes more valuable as machines participate in resolution. If an agent changes ten conflicted files, a reviewer benefits from knowing which edits came from the mechanical merge and which were introduced by the resolver. The final tree alone answers what survived. An intermediate anchor can help answer what judgment changed.

Modern Git's `ort` strategy is the product of years of engineering around this operation. It handles rename detection, directory changes, recursive ancestry cases, and a long list of situations that made older merge machinery slower or more surprising. The implementation can improve dramatically while the underlying problem remains recognizable: independent histories have to become one tree without losing the intent that mattered in either.

Text gives Git a useful but narrow view of that intent.

Suppose one branch changes `timeout = 30` to `timeout = 60` while another changes the same line to `timeout = 10`. The conflict is visible because both branches touched the same region. Git can decline to choose.

Now suppose one branch changes a timeout in one file while another changes a retry count in a different file. The patches may combine perfectly. The resulting service may hammer an upstream dependency for ten times longer than either author expected.

No conflict marker appears.

The clean merge is not evidence of a correct merge.

This distinction matters because the mythology around version control often treats merge conflicts as failures. A conflict looks ugly. It interrupts flow. It demands attention. Teams celebrate tools and practices that reduce the number of conflicts, often for good reason.

But a conflict is also one of the few moments when the repository admits that it does not know what the authors meant.

The more dangerous cases are sometimes the ones it does not notice.

That is why reconciliation grew layers around the merge algorithm. Code review asks whether the proposed combination is intelligible. Tests ask whether behavior still satisfies known expectations. Static analysis asks about properties that line comparison cannot see. Deployment checks ask whether the change survives another environment. Merge queues ask whether a proposal that passed on yesterday's base still passes when placed behind the changes that arrived this morning.

The merge commit is the narrow waist. The institution around it decides how much evidence is required before that commit may exist.

Git itself remains permissive. You can merge locally with no committee. You can create a merge commit that no server has seen. You can resolve every conflict by taking one side, the other side, or something neither side contained. The object model records the result and its parents. It does not certify the wisdom of the resolution.

This is not an omission. It is part of Git's division of labor.

The repository records history. Projects govern admission to their important histories.

Those governance systems vary because the cost of a bad merge varies. A personal notes repository may need no review at all. A Linux kernel subsystem may route patches through maintainers who understand a particular part of the tree. A payments service may require tests, security checks, and multiple approvals. A documentation site may optimize for speed and reversibility instead.

The same Git command can sit underneath all of them.

This is also why the phrase merge conflict covers several different kinds of work.

There is mechanical conflict: two patches cannot both be applied to the same textual neighborhood without a choice.

There is semantic conflict: the patches apply, but their meanings interfere.

There is policy conflict: the code may work, but the project has not authorized it.

And there is temporal conflict: a change was correct against the base it was tested on but is no longer correct after other changes land.

A mature integration system tries to expose all four before the shared branch carries the mistake too far.

Git's `rerere` feature is a small, revealing response to the first kind. Its name means reuse recorded resolution. When enabled, Git can remember how a developer resolved a particular conflict and reuse that resolution if essentially the same conflict appears again. This is useful on long-lived topic branches or repeated rebases, where the same disagreement between histories may otherwise demand the same manual edit several times.

The feature says something important about reconciliation: some conflicts are not new decisions. They are repeated presentations of a decision already made.

Remembering that decision can save work.

But even `rerere` is cautious. A reused resolution deserves inspection because context can change. Git can replay the hand resolution; it cannot know whether the reasoning that justified it still holds. Automation reduces repetition without eliminating judgment.

There is also a governance lesson hiding inside `rerere`.

The fact that a resolution can be reused does not mean the reason for the resolution is preserved. The mechanism records enough shape to recognize and replay the edit. It does not automatically record that the team chose one API because of a compatibility promise, or that a security reviewer required a particular branch of the conflict, or that one side represented generated code that should never have won.

That is the recurring separation between mechanics and meaning.

Git can remember the edit.

The institution has to remember the reason.

Merge queues attack a different source of repetition.

Imagine ten pull requests. Each is tested against the same main branch at noon. All ten pass. If they are merged one after another, the tenth is not actually entering the repository state it was tested against. Nine other changes now stand between its test result and its destination.

A queue can serialize that uncertainty. It creates candidate combinations, tests them in something closer to the order they will land, and removes or retries proposals when the combined state fails. The queue is not making Git more distributed. It is deliberately imposing order at one contested point: admission to a branch whose state matters to many people.

This apparent contradiction runs through Git's history.

Distribution makes independent work cheap.

Successful projects then build centralized-looking machinery around integration because shared history is scarce.

There is no paradox once the scarce resource is identified. The expensive thing was never making another copy of the code. The expensive thing is deciding what everyone else should treat as the next trusted base.

The Linux kernel has always made this visible because its development topology is explicitly layered. Contributors send changes toward subsystem maintainers; maintainers integrate topic branches; higher-level trees collect work for Linus Torvalds. Git permits many paths through the graph, but the project does not pretend every path has equal authority.

A corporate monorepo can arrive at the same structure through different machinery. Instead of emailed patches and maintainer trees, it may use ownership files, mandatory reviewers, automated checks, and queues. The social form differs. The constraint is familiar: somebody or something has to decide which changes become common ancestry.

The rise of coding agents makes this constraint sharper.

An agent can create a branch in seconds. Ten agents can create ten. A hundred can work in parallel if the tasks can be partitioned. Storage is not the limiting factor. Branch names are not the limiting factor. Commit creation is not the limiting factor.

Reconciliation becomes the throttle.

This is easy to underestimate because software organizations have spent years trying to increase coding throughput. Faster editors. Better libraries. Continuous integration. Code generation. Copilots. Agents. Each improvement lowers the cost of producing candidate changes.

The cost of deciding among those candidates does not necessarily fall with it.

In fact, it can rise. Two agents may independently solve the same bug. One may refactor a module while another builds on the old interface. A third may update tests in a way that makes both implementations appear acceptable. The repository can hold all three branches without complaint. The shared product cannot usually ship all three realities.

A future integration system therefore needs more than a faster merge algorithm.

It needs to understand work relationships: which changes supersede others, which depend on others, which are experiments, which were produced from the same task, which have independent evidence, which touch the same behavioral surface despite different files, and which should never be combined because they represent competing designs.

Some of that information may live outside Git. That would be consistent with Git's history. Pull requests, CI results, review discussions, ownership rules, and merge queues already live mostly in forge databases while commits remain ordinary Git objects.

The important question is what must survive when those outer systems change.

A merge commit has durable advantages. It names its parents. It records the resulting tree. It can be copied to another repository. A future reader can see that two lines of ancestry became one even if the web discussion that preceded the merge has disappeared.

What it does not preserve is the full argument.

Why was this resolution chosen? Which tests were decisive? Which alternative was rejected? Did a reviewer understand the change or merely approve a green build? Was a conflict resolved manually, by a remembered `rerere` entry, by a language-aware tool, or by an agent instructed to make the suite pass?

Projects can store some of this in commit messages, trailers, notes, attestations, or external systems. None is universal.

That gap becomes more consequential as authorship accelerates. When a human makes three commits in an afternoon, memory supplies a surprising amount of missing metadata. The developer remembers why the second commit reverted part of the first. A teammate remembers the argument in chat. The reviewer remembers which test was flaky.

At machine scale, that ambient memory is thinner.

A thousand changes generated overnight cannot rely on one engineer remembering the sequence in the morning.

The integration record has to carry more of its own explanation.

This does not mean every merge needs a manifesto. It means reconciliation increasingly benefits from machine-readable intent and evidence. A change can say what task it addresses. Tests can identify which claim they support. A merge system can know that two branches are alternatives rather than independent work. An agent can be required to preserve the reason for a non-obvious conflict resolution instead of silently choosing the version that compiles.

Git does not need to become a theorem prover for this to happen.

Its role may remain almost austere: name the states, preserve the ancestry, provide the mechanics for combining them, and make the result portable.

The richer reconciliation layer can evolve above it.

That is the same architectural pattern that let GitHub add pull requests without changing what a commit was. The graph stayed small enough to survive the social system built around it.

The next decade will test whether that narrowness is still an advantage.

If machine authors make divergence effectively free, the winning version-control system will not be the one that can create the most branches. Git solved that problem long ago.

The scarce act is deciding which branch becomes everybody else's past.