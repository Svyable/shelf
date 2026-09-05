# The Monorepo Test

The promise of a distributed version-control system sounds cleanest when the repository fits comfortably on a laptop.

Clone it.

Possess the history.

Work anywhere.

The promise becomes more interesting when the repository contains enough history, objects, paths, and references that simply asking basic questions begins to cost noticeable time.

This is the monorepo test.

A monorepo places many projects or services in one repository rather than giving each its own independent history. The label covers very different realities. One company might keep a handful of related applications together. Another might keep an enormous fraction of its production code in one graph.

The attraction is easy to understand.

One history can make cross-project changes atomic. Shared libraries can evolve alongside their users. Organization-wide refactors can be represented as one proposed change. Tooling can reason across boundaries that separate repositories would make more expensive. Dependency relationships can be visible in one place.

The costs are just as real.

The repository grows.

History grows.

The index grows.

The number of paths grows.

The number of packs, objects, and references can grow.

Operations that were cheap because the data set was small become performance engineering problems.

This tension is important because it tests one of Git's oldest instincts: a normal participant should be able to possess the repository.

At small scale, possession is almost free.

At large scale, possession becomes a budget.

A developer may not need every file in a giant company to edit one service. A CI job may need one subtree and a narrow slice of history. A build agent may need objects relevant to one commit and nothing else. A laptop may technically be able to store the whole repository while still paying unacceptable costs to scan, index, traverse, or update it.

Git has not responded by abandoning its core model.

It has accumulated machinery.

One of the clearest examples came from Microsoft and the Windows codebase. The problem was not simply that the repository occupied a lot of disk. Microsoft described a codebase with millions of files and a Git experience in which ordinary operations could become dominated by the cost of considering a working tree vastly larger than the set of files one developer actually needed.

That distinction matters.

A machine can have enough storage for a repository and still fail the usability test. Developers feel version control through latency. `status` that takes seconds instead of fractions of a second changes how often people run it. A checkout that requires downloading an enormous historical working set changes onboarding. An operation that has to walk millions of paths becomes a tax paid many times a day.

Microsoft's response was the Git Virtual File System, usually called GVFS. Its architecture attacked the problem by virtualizing the working tree so that Git and the operating system could focus on the files a developer actually needed rather than eagerly materializing every file in the repository. Content could be downloaded as it became necessary instead of treating the complete working set as the price of entry.

The move is revealing because it reaches below the command line.

The old mental picture of a checkout is physical and literal. The repository has a tree. The working directory contains the files in that tree. Git compares the two.

At Windows scale, that literal materialization became expensive enough that Microsoft inserted another layer between the logical tree and the bytes present on disk. The working tree could represent more than it had fully hydrated.

This was not merely a faster ancestry walk or a better packfile index. It was an admission that scale had reached the filesystem boundary.

That boundary is different from the object-graph boundary.

A commit-graph can make ancestry queries cheaper. A multi-pack index can make object lookup across packs cheaper. A reachability bitmap can make set calculations cheaper. None of those improvements prevents the operating system from paying to enumerate a gigantic checkout if the command still has to look at the entire filesystem.

GVFS addressed a different question: how much of the repository must become concrete on this machine right now?

That question would recur across Git's later scaling story.

Sparse checkout asks which tracked paths need to appear in the working tree. Partial clone asks which objects need to be downloaded at all. Filesystem monitors reduce the need to rescan everything after a small change. Background maintenance moves expensive cleanup away from the interactive moment. Server-side and client-side caches try to predict what the developer will need next.

These mechanisms are not interchangeable, and GVFS was not simply another name for partial clone. They emerged from different layers and at different times. But they expose the same constraint: a repository can remain logically one thing while becoming physically selective.

That is a major change in what “having the repository” means.

The original distributed ideal made completeness feel binary. Either the server had the history or the clone did. Monorepo scale introduces a more practical vocabulary: metadata present, objects promised, paths sparse, blobs hydrated, packs cached, refs indexed, working set predicted.

Possession becomes layered.

The important achievement is that the layers can remain hidden enough that a developer still recognizes Git.

Commit-graphs are one example.

Walking commit ancestry is fundamental to Git. Commands ask which commits are reachable from another commit, where branches diverged, what history is relevant to a path, and which objects need to move during transport. In a large repository, repeatedly parsing commit objects and rediscovering graph relationships is wasteful.

A commit-graph file stores precomputed structure that helps Git answer ancestry questions more efficiently.

The abstraction remains the same.

Commits still point to parents.

History is still a graph.

Git simply learns more efficient ways to navigate it.

This pattern recurs across the scaling work.

Packfiles reduce the cost of storing loose objects by grouping and compressing them, often delta-compressing similar objects. As repositories accumulate multiple packfiles over time, Git needs efficient ways to understand which objects live where.

The multi-pack index addresses that problem.

Instead of forcing every lookup to examine every pack independently, Git can maintain an index across packs. Repacking strategies can then be more deliberate. Large repositories do not need to perform one gigantic, disruptive repack every time storage hygiene deteriorates.

GitHub engineers writing about monorepo maintenance described contributing multi-pack-index work, reachability bitmaps, and geometric repacking upstream to Git because their own repository scale made these costs impossible to ignore.

That detail matters.

Git's large-scale adaptations are not a separate enterprise product replacing ordinary Git.

They are changes to Git itself, motivated in part by organizations operating at scale.

The small repository benefits from the same architecture even when it never notices the machinery.

Reachability bitmaps solve another recurring problem.

Git often needs to answer whether objects are reachable from selected commits or refs. During fetch and clone, this matters because the sender needs to determine which objects the receiver lacks. During maintenance, it matters because unreachable objects can eventually be pruned while reachable history must be preserved.

A bitmap can summarize reachability more cheaply than traversing the entire graph every time.

Again, the semantics remain.

The implementation gets smarter.

This is one of the strongest arguments for Git's durability.

Many systems become obsolete when their scale assumptions fail because the visible abstraction and the underlying implementation are inseparable. Git's object graph has allowed substantial storage and traversal changes beneath familiar commands.

A developer can type `git log` without knowing whether a commit-graph accelerated the walk.

They can fetch without thinking about reachability bitmaps.

They can run maintenance without knowing whether geometric repacking influenced pack selection.

The system has room to evolve under the command line.

But not every scaling problem can be solved by making the same complete repository faster.

Eventually the amount of data itself becomes the problem.

Sparse checkout attacks one layer.

A repository may contain millions of tracked paths while a developer needs only a subset materialized in the working tree. Sparse checkout allows Git to limit which paths appear locally according to patterns or directory-oriented modes.

This can radically reduce the visible working set.

It does not necessarily reduce the object database by itself.

That distinction is easy to miss because both features feel like “I only have part of the repository.”

Sparse checkout is about what is checked out.

Partial clone is about which objects were downloaded.

Partial clone is the more radical concession to scale because it weakens the old intuition that a clone should eagerly possess every reachable object.

Git's partial-clone documentation describes repositories that deliberately omit certain objects while recording that a promisor remote has promised those objects can be obtained later.

The repository becomes locally incomplete by design.

A command may discover that an object it needs is absent and trigger a fetch.

This introduces a network dependency into operations that traditional Git users expect to be local.

It also allows a repository to exist where the alternative might be no useful local repository at all.

That trade is the monorepo problem in miniature.

Which property matters more: complete local possession or practical local use?

Git's answer has become conditional.

Possess everything when that is cheap enough.

Possess less when the scale makes completeness counterproductive.

Preserve enough of the repository abstraction that ordinary tools still work.

This is not a perfect illusion.

Partial-clone behavior has limitations. Missing objects can create surprising fetches. Some operations may be more expensive or less predictable. Servers must support the relevant protocols and filters. Large organizations often layer custom tooling, caches, prefetching, filesystem virtualization, or build systems around Git to make the experience acceptable.

The existence of these layers is itself evidence.

Git can scale much farther than its original environment.

It does not scale by magic.

Monorepos also challenge the working tree in ways object storage alone cannot fix.

A command that scans the filesystem can be expensive when the checkout contains millions of paths. The index can become large. File-status calculations can dominate interactive latency. Tools built around assumptions of thousands of files behave differently around millions.

Organizations have responded with filesystem monitors, sparse checkouts, specialized clients, background maintenance, cache layers, and carefully shaped developer environments.

The lesson is not that monorepos are bad.

It is that repository topology moves costs.

Many repositories create dependency coordination costs between histories.

One giant repository creates local scaling and access-control costs inside one history.

The right trade depends on the organization, build system, security boundaries, product architecture, and rate of cross-project change.

Git does not choose for you.

It makes both choices possible, then exposes different limits.

This is where the phrase monorepo can become ideological.

Companies point to famous large users as evidence that one repository is inherently superior. Critics point to custom infrastructure around those repositories as evidence that the model is inherently impractical.

Both arguments skip the important detail.

Scale changes the answer.

A monorepo at a small company may work with ordinary Git and no unusual tooling. A monorepo holding immense history may require engineering investment large enough to become a product of its own. The fact that a giant organization can make the model work does not prove the same investment makes sense elsewhere.

Nor does the existence of specialized infrastructure mean the repository model failed.

Infrastructure is what successful abstractions attract when people keep pushing them into larger domains.

The web did not fail because content-delivery networks became necessary.

Databases did not fail because indexes, replicas, caches, and sharding became necessary.

Git did not fail because commit-graphs and partial clones became necessary.

The meaningful question is whether those additions preserve the properties people still value.

So far, many do.

A partial clone can still create commits locally.

A sparse checkout still records ordinary Git trees and commits.

A multi-pack index does not alter object identity.

A commit-graph does not create a second history.

The system optimizes representation and access while keeping the graph recognizable.

This distinction becomes important when comparing Git to systems designed specifically for very large organizations.

A replacement can gain scale by changing the model more aggressively: centralizing more state, using virtual filesystems, storing history in databases, making change objects first-class, or assuming permanent server connectivity.

Those choices may be excellent.

They also sacrifice some of the properties Git users have learned to expect.

The monorepo test is therefore not merely whether Git can open a huge repository.

It is whether Git can absorb scale without becoming a different system.

There are signs of strain.

Partial clone weakens complete local possession.

Server-assisted features increase dependence on a capable remote.

Massive repositories often require background maintenance and infrastructure unfamiliar to small projects.

Sparse working trees mean a developer may no longer see the repository as one coherent filesystem tree.

The old mental picture of “clone everything, then work locally forever” becomes less accurate.

But the graph remains portable enough that the system has not crossed into simple centralization.

This middle state is likely to define Git's future.

Local where possible.

Lazy where necessary.

Distributed in identity and history, increasingly selective in materialization and delivery.

That future also changes what a clone means.

The word once implied copying.

Now it can imply a negotiated working set.

The repository may have a promise about objects it does not possess. The checkout may show only directories relevant to one team. Bulk history may arrive through a bundle endpoint while incremental objects arrive from an origin. Maintenance structures may precompute graph questions that the original object format left implicit.

The user still experiences Git.

The route to that experience becomes more layered.

This is a recurring theme in mature infrastructure. The simple version is not removed. It becomes the interface to a complicated engine.

The same happened to networking, filesystems, relational databases, and compilers.

Git is old enough to join them.

Monorepos reveal another limitation that performance work cannot solve at all.

Some files are simply bad citizens of Git's storage model.

A huge binary changes slightly and produces an object that may share little useful textual structure with its previous version. A model checkpoint can be gigabytes. A dataset can be larger than the source code that consumes it. Generated build outputs can churn without carrying human-authored meaning.

The repository may be able to store those objects.

That does not mean it should.

The industry answered by separating the coordination graph from the heavy payload.

Git LFS is one famous example.

The next chapter follows that boundary.

Git became the memory of software.

Software began producing files too large, too opaque, or too disposable for that memory to hold comfortably.
