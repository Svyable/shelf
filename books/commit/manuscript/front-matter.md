# Commit

*How Git Became the Memory of Software—and What Comes Next*

**Sven Hardy Benson**

---

September 2026

On April 7, 2005, Linus Torvalds made a commit that contained eleven files.

The commit message was not majestic. It called the new program an “information manager from hell.” The README was less dignified. Its first line described Git as “the stupid content tracker,” which was accurate in a way that later descriptions often are not. The first Git was not a website, a social network for programmers, a pull-request system, a cloud service, a project-management tool, or even the complete version-control experience most developers now mean when they say the word.

It tracked content.

That narrowness is one reason the story became so large.

Git began because the Linux kernel had a problem it could not politely defer. The project had grown into a distributed engineering effort whose contributors needed speed, parallel work, and a way to move changes among people who did not share one machine, one company, or one working day. The kernel had been using BitKeeper, a proprietary distributed version-control system, under an arrangement that made it available to open-source developers without ordinary licensing cost. In 2005 that relationship broke down. The Linux community needed another system.

Torvalds did not have the luxury of imagining every future developer who might use it. He had a kernel to maintain.

The constraints were immediate and peculiar. Patches arrived from many directions. History needed to travel. Branching could not be ceremonial. A central server could not be allowed to become the only authoritative place from which work was possible. Operations that felt ordinary on a small project had to remain fast on the Linux kernel. Trust could not depend entirely on a remote database somebody else controlled.

The resulting design made a few bets that now feel almost obvious because Git won.

They were not obvious.

Content received identity from content. A directory became a tree object. A file's contents became a blob. A commit pointed to a tree and to parent commits. History became a directed graph of objects rather than a number handed out by a central authority. A branch could be represented by a small reference that moved from one commit to another. A repository could be copied. The copy could remain useful when disconnected. Two copies could diverge and later reconcile.

Git did not invent every ingredient. Distributed version control existed. Content-addressed storage existed. Hashes existed. Branches existed. Patch exchange had a long history. The achievement was the particular combination, tuned hard enough around the Linux kernel's constraints that operations which had previously felt expensive became ordinary.

Branching is the canonical example. Git did not make disagreement free. Teams can spend days resolving a bad merge. A branch can live for months and become a private country whose border eventually has to reopen. Review queues can clog. Continuous-integration systems can burn vast compute testing speculative histories that never ship.

But creating the branch itself became almost trivial.

That changed behavior.

The larger story of Git is full of changes like this. A technical cost falls, and a social practice follows. Local history makes experimentation easier. Cheap branches encourage parallel work. Distributed repositories make forking more credible. Hosting platforms make public forks discoverable. Pull requests turn a graph operation into a conversation. Status checks turn that conversation into a policy gate. Package registries, deployment systems, security scanners, documentation sites, and code-review bots begin treating a commit identifier as a coordinate.

Eventually, a forty-character string becomes enough to point at the state of an important machine.

This book is about how that happened.

It is also about why the story is not finished.

By September 2026, Git's latest released source version was 2.55.0. The project was already carrying work for later releases, and its own documentation described a future Git 3.0 with no announced release date. The planned breaking changes are revealing because they show a mature system confronting the consequences of its age. New repositories are expected to move toward SHA-256 by default. Rust is being introduced in stages, with the current plan making it mandatory at the Git 3.0 boundary unless downstream impact proves too severe. Defaults around bare repositories are being tightened for security. Features deprecated for years are finally being marked for removal.

None of those changes means Git has failed.

They mean it lasted.

Twenty-one years is long enough for assumptions to expire while abstractions survive.

SHA-1 was a reasonable engineering choice in 2005 and a cryptographic migration problem later. A repository model built around local possession remains empowering until a repository becomes so large that complete possession is slow, expensive, or simply unnecessary for the job at hand. Textual diffs remain one of software engineering's great compression tools until the meaningful change is a generated file, a schema migration, a model artifact, a notebook, a lockfile avalanche, a mechanical refactor, or a thousand coordinated edits produced by an agent.

Git's future is visible in the ways it bends without surrendering its identity.

Partial clone allows a local repository to omit objects and fetch them on demand from a promisor remote. Sparse checkout lets a working tree expose less than the repository knows. Bundle URIs can seed object databases without making the origin produce the same enormous pack for every new clone. Commit-graphs, reachability bitmaps, multi-pack indexes, geometric repacking, and reftable all attack scaling costs while preserving concepts developers already understand: commits, objects, refs, branches, fetches.

That pattern matters.

A mature technology often survives by becoming less literal about its original implementation while becoming more faithful to its useful abstractions.

The automobile kept the steering wheel while nearly everything underneath it changed. The web kept the URL while servers, applications, networks, and devices transformed around it. Databases kept rows and transactions while storage engines, replication systems, and hardware changed almost beyond recognition.

Git may be entering that kind of maturity.

The more provocative pressure comes from machine authorship.

Software agents can now open a repository, inspect history, create a branch, edit dozens of files, run tests, revise their work, and produce a commit while the person who asked for the change is doing something else. The useful part of Git in this world is immediately apparent. A branch gives the machine somewhere to work. A diff gives the human and other machines something to inspect. A commit gives the result a name. History gives the work a trail. Reset and revert make experimentation less frightening.

The danger is also apparent.

Git made creating parallel histories cheap. Agents can make creating parallel authors cheap.

Those two curves can multiply.

A team of humans can usually keep some rough mental map of the branches it creates. A sufficiently active collection of agents can produce plausible changes faster than anyone can build that map. The bottleneck moves. Storage is not the problem. Generating the patch is not the problem. The expensive act is deciding which histories deserve to become shared history.

That is a version-control problem only in the broadest sense. It is also scheduling, verification, governance, provenance, testing, attention, and judgment.

I do not think that implies Git disappears.

It may imply the opposite.

Technologies often become most durable just before they become invisible. Nobody opens an application and marvels that TCP successfully ordered packets. Nobody begins a workday impressed that a database wrote a transaction log. Infrastructure wins when people stop needing to think about the mechanism every time they benefit from its guarantees.

Git could move in that direction. Developers may interact with higher-level systems that talk in changes, tasks, intentions, reviews, and deployments while Git continues to store the graph underneath. Agents may generate commits humans rarely type. Forges may become schedulers for competing machine-authored proposals. Semantic review may sit above textual diffs. Provenance systems may add stronger claims about who or what produced a change and under which authority. Large repositories may become increasingly partial at the edge while remaining complete somewhere else.

If that happens, asking whether Git was “replaced” will be less useful than asking which of its ideas survived.

That is the question this book follows backward and forward.

Which part of Git was an accident of April 2005?

Which part became infrastructure?

The answer begins before there was a branch called `main`, before there was GitHub, before the pull request became a workplace ritual, before a commit hash appeared in deployment dashboards and incident reports, before anybody could plausibly ask a machine to make fifty coordinated code changes while they ate lunch.

It begins with eleven files and a problem that could not wait.
