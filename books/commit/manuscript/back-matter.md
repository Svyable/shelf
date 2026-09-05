# Back Matter

Git is unusually difficult to write about cleanly because several different histories sit on top of one another. There is the history of the software itself, the history of the Linux kernel workflow that shaped it, the history of hosting platforms that made it easier to use, and the history of the habits developers later came to call “Git workflow.” They overlap. They are not the same thing.

The research for this book therefore follows a simple preference: when a claim can be grounded in the Git project’s own repository or documentation, start there. When the claim is about GitHub, Git LFS, Jujutsu, Sapling, Pijul, or another adjacent system, prefer that project’s own documentation or contemporaneous first-party record. Secondary accounts are useful for interpretation, but the dates, mechanics, and declared roadmaps should survive contact with the primary source.

That rule matters most in the final third of the book. Git’s future is not one fact waiting to be reported. Some changes are current implementation. Some are documented project direction. Some are proposals that may be delayed, altered, or abandoned. Some are forecasts in this book about what pressure from scale, provenance, semantic review, and machine authorship is likely to do to version control. Those categories are deliberately kept separate.

The same caution applies to the word *immutable*. Git history is often described that way in casual conversation, but the word hides too much. Git objects are content-addressed, and changing a commit changes its object identity. Refs can move. Histories can be rewritten. Old objects can remain in clones even after a public ref stops naming them. The useful property is not metaphysical immutability. It is that Git makes history structurally explicit, locally copyable, and difficult to alter invisibly once object identities have propagated.

A second recurring distinction is between Git and the forge around it. Pull requests, issue numbers, review approvals, protected-branch rules, merge queues, CI evidence, deployment records, and account identities can be central to a project while remaining outside Git’s core object model. A clone can preserve the source graph and still fail to preserve the institution that governed it. That gap is not an edge case. It is one of the central facts of modern software history.

## Selected primary sources and further reading

The full working source trail lives in [`research/source-ledger.csv`](../research/source-ledger.csv). The following sources are the best starting points for readers who want to go beneath the narrative.

- [Git’s first public commit, April 7, 2005](https://kernel.googlesource.com/pub/scm/git/git/+/e83c5163316f89bfbde7d9ab23ca2e25604af290) — the initial revision by Linus Torvalds.
- [The original Git README](https://kernel.googlesource.com/pub/scm/git/git/+/e83c5163316f89bfbde7d9ab23ca2e25604af290/README) — Git introducing itself as “the stupid content tracker.”
- [A Short History of Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git) — the official Pro Git account of the BitKeeper break and Git’s design goals.
- [Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) — blobs, trees, commits, tags, and the content-addressed object database.
- [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) — the simplest official explanation of a branch as a lightweight movable pointer to a commit.
- [Distributed Workflows](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows) — several collaboration topologies made possible by Git’s distributed model.
- [A note from the maintainer](https://kernel.googlesource.com/pub/scm/git/git/+/todo/MaintNotes) — Junio C Hamano’s description of Git’s integration and maintenance process.
- [Git BreakingChanges](https://git-scm.com/docs/BreakingChanges) — the project’s living record of planned incompatible changes, including work associated with a future Git 3.0.
- [Hash function transition](https://git-scm.com/docs/hash-function-transition) — the design constraints behind moving repository identity from SHA-1 toward SHA-256.
- [Reftable](https://git-scm.com/docs/reftable) — a different storage format for references designed to scale better than traditional loose and packed refs.
- [Partial clone](https://git-scm.com/docs/partial-clone) — Git’s mechanism for intentionally incomplete local object databases backed by promisor remotes.
- [Git protocol v2](https://git-scm.com/docs/gitprotocol-v2) and [bundle URI](https://git-scm.com/docs/bundle-uri) — examples of how transport has evolved while the object model remains recognizable.
- [GitHub’s April 10, 2008 launch note](https://github.blog/news-insights/we-launched/) — a contemporaneous record of the forge becoming publicly available.
- [Pull Requests 2.0](https://github.blog/news-insights/pull-requests-2-0/) — GitHub’s 2010 description of pull requests as living discussions and code review around proposed merges.
- [Announcing Git Large File Storage](https://github.blog/news-insights/product-news/announcing-git-large-file-storage-lfs/) — the 2015 announcement of the pointer-plus-external-payload design.
- [Jujutsu Git compatibility](https://docs.jj-vcs.dev/latest/git-compatibility/) — an example of a newer change model deliberately interoperating with Git repositories and remotes.
- [Sapling](https://sapling-scm.com/docs/introduction/) and [Pijul](https://pijul.org/manual/why_pijul.html) — two different answers to problems Git exposes around scale, usability, change identity, and conflict.

## A note on the technical present

Version-control infrastructure keeps moving while books move slowly. The publication candidate is therefore frozen against a specific Desk commit only after the current Git release, the current `BreakingChanges` roadmap, and the interoperability claims about adjacent systems have been rechecked. A released edition is a dated argument about a moving system, not a promise that every roadmap item described here will remain unchanged.

That is also why the ending of this book does not depend on one product winning. Git’s command line can change. Its storage engine can change. Hosting platforms can change. New tools can replace parts of the experience while continuing to speak Git at the boundary. The durable question is the one the book began with: which parts of the 2005 design were accidents of an emergency, and which became infrastructure because they were more general than the emergency that produced them?

The answer will keep changing.

The history should remain inspectable while it does.
