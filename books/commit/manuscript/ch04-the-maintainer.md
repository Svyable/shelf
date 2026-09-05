# The Maintainer

Git's origin story has a problem familiar to every successful infrastructure project.

The beginning is memorable enough to hide the middle.

Linus Torvalds built the first Git because the Linux kernel needed a replacement for BitKeeper. The timing was dramatic. The initial code was small. The first design choices were unusually consequential. The creator was already famous. The story therefore compresses easily into a sentence: Linus wrote Git.

That sentence is true and badly incomplete.

Infrastructure is not made durable by invention alone.

It has to survive other people's operating systems, filesystems, workflows, mistakes, security expectations, performance limits, and tastes. It has to become more understandable without losing the qualities that made it useful. It has to absorb features without turning every earlier script into wreckage. It has to reject some good ideas because compatibility costs more than the improvement is worth. It has to release, regress, repair, deprecate, document, and occasionally tell impatient users that a twenty-year-old behavior cannot be removed just because a cleaner design exists on paper.

That is maintenance.

Git's long life is partly the story of Junio C Hamano.

The project's current maintainer still identifies himself that way in Git's own maintenance notes. Development is primarily conducted on the Git mailing list. Patches are sent there. Proposals are argued there. Topic branches move through an integration process visible in the repository. The project carries branches with names such as `maint`, `master`, `main`, `next`, `seen`, and `jch`, each reflecting a different role in the flow of work.

The exact names matter less than the shape.

Git is maintained through staged integration.

That is appropriate for a project whose central technical idea is staged integration.

Torvalds did not remain Git's day-to-day maintainer indefinitely. After the tool had escaped its first emergency and the kernel could use it, stewardship passed to Hamano, who had already been contributing to the project. The transition is important because it disproves the idea that Git's character can be explained only by its inventor.

Torvalds optimized aggressively for the kernel's problem.

Hamano and the wider Git community had to turn that solution into a project that could be depended upon by everyone else.

Those are different jobs.

The first rewards audacity.

The second rewards judgment about change.

A young project can break expectations because few expectations exist. A mature project accumulates invisible contracts. Someone has a shell script that parses output you thought was merely decorative. Someone has an IDE calling a plumbing command directly. Someone's build farm depends on the exit status of an edge case. Someone's ancient repository contains an object or ref shape newer code almost never creates. Someone's server depends on protocol behavior that is awkward but interoperable. Someone packages Git for an operating system with toolchains and constraints the core developers do not use every day.

Popularity turns implementation details into promises.

The maintainer has to know which promises are real even when nobody wrote them down.

This makes conservative engineering look slower from the outside than it is.

A contributor sees one patch.

A maintainer sees the patch plus the population of things it could disturb.

Git's mailing-list culture exposes that difference unusually well. Development does not primarily happen behind a private product roadmap and emerge as release notes. Proposed changes arrive as patches and patch series. Review comments are public. Revisions can be sent again. A series can be rerolled several times as design and wording improve. Other developers test unusual platforms, question compatibility assumptions, argue about naming, ask whether a new configuration variable is necessary, or point out that a supposedly local change alters protocol behavior.

The conversation is part of the engineering record.

This does not make the process frictionless or egalitarian in some romantic sense.

Maintainers have authority.

Experience carries weight.

A technically correct patch can fail to land because its interface is wrong, its maintenance burden is too high, its evidence is weak, its interaction with another change has not been resolved, or the people with enough context to review it are unconvinced. Mailing lists can be intimidating. Text-only review rewards particular communication habits. Long-running communities develop norms outsiders have to learn.

The process is still a governance system, not merely a mailbox.

Git's own maintenance notes make the topology explicit. The maintainer consumes work from the mailing list, organizes topic branches, merges work through integration branches, and periodically reports what is cooking. Changes do not all move directly from a contributor's branch to a release.

They mature.

That word is useful because software integration is temporal.

A patch can look good today and reveal a problem after sitting beside other work for a week. A new feature can pass its own tests and expose an assumption when another topic lands. A cleanup can make sense in isolation and create a conflict with a larger redesign already in flight. A portability problem may appear only after downstream builders try a release candidate.

Staged integration gives uncertainty somewhere to accumulate before it becomes a stable promise.

There is a branch for maintenance fixes intended for an existing release line. There are main development branches. There are branches where topics expected to graduate can mix. There are more speculative integration areas where work can be seen together without implying that it will ship exactly that way.

The names and details evolve, but the philosophy is consistent with Git itself: preserve multiple possible histories long enough to learn which one deserves to advance.

This is maintenance as branch management.

A modern Git release therefore represents more than a pile of accepted patches.

It represents a sequence of judgments about readiness.

On June 29, 2026, Git 2.55 was released in a commit authored and committed by Junio C Hamano. The release commit is tiny compared with the work it represents: version machinery and release notes move, a tag eventually gives the release a familiar name, and the project continues. That small visible endpoint sits on top of months of patches, rerolls, reviews, integration, testing, and accumulated compatibility decisions.

The release is a commit.

The work is the graph behind it.

That pattern repeats the architecture of Git at the level of governance.

A commit is small because it points to structure.

A release is small because it points to a history of decisions.

The maintainer's role is not to personally author all of those decisions. It is to keep the integration system coherent enough that distributed authorship can become a trustworthy sequence of releases.

This is where the mythology of open source can become misleading.

People sometimes describe open-source development as though source visibility dissolves hierarchy. Anyone can inspect the code, therefore control is distributed. Anyone can fork, therefore governance is flat. Anyone can send a patch, therefore authority is open.

The freedoms are real.

The conclusion does not follow.

Git itself demonstrates the distinction beautifully.

Anyone can clone the repository.

Anyone can create a branch.

Anyone with the necessary skill can modify the code.

Anyone can publish a fork.

None of those facts means everyone can decide what becomes the Git release most of the world installs.

Distributed possession and centralized integration can coexist.

They often do.

The possibility of a fork disciplines authority without eliminating authority. A maintainer who repeatedly makes intolerable decisions can lose contributors or legitimacy. A community can move. A vendor can carry a patch set. A downstream distribution can choose different defaults. But the cost of divergence is real, especially around infrastructure. Most users do not want ten incompatible Gits. They want one boringly interoperable Git that works with repositories created years ago and servers run by strangers.

The center therefore earns value by making divergence unnecessary.

This is one reason maintainership deserves more attention in histories of technology.

Creation produces a visible before and after.

Maintenance produces a long sequence of days on which catastrophe did not happen.

The patch applied.

The repository still opened.

The protocol still negotiated.

The old test still passed.

The performance regression was caught before release.

The unsafe default was tightened without breaking every ordinary use.

The deprecated behavior remained long enough for downstreams to move.

The security fix landed on maintained release lines.

None of these moments offers a single heroic photograph.

Together they are the reason infrastructure remains infrastructure.

Git's future makes this maintenance problem harder because several old assumptions are changing at once.

The hash function is one.

Moving new repositories toward SHA-256 sounds, at first, like replacing one cryptographic primitive with another. Inside a mature ecosystem, the change touches object IDs, protocols, tooling, signatures, storage, APIs, test fixtures, documentation, and software that assumed a hexadecimal identifier had a particular length. The Git project cannot simply declare that the old world ended on Tuesday.

It has to migrate a network.

Rust is another example.

The current Git 3.0 plan tracks staged Rust adoption with a level of caution that reveals the maintainer's problem. Rust can offer memory-safety advantages and access to a modern ecosystem. Git also runs almost everywhere. Downstream packagers support platforms, compilers, bootstrap environments, and institutional constraints that upstream developers cannot dismiss merely because a newer language is attractive.

The plan therefore includes an escape hatch: if making Rust mandatory imposes too much downstream cost, the requirement can be deferred.

That is not indecision.

It is maintenance admitting that ecosystem constraints are part of the software.

A project as widely deployed as Git has users who never joined its mailing list and dependencies that never introduced themselves.

The maintainer governs for absent people.

This burden grows with age because every successful abstraction accumulates more dependents. Git's command-line behavior appears in scripts. Its wire protocols appear in servers and clients. Its object formats appear in libraries. Its repository layout is inspected by tools that probably should have used an API and did not. Its references appear in hosting systems. Its security model affects CI runners, package builders, and developer laptops. Its performance characteristics influence whether a monorepo feels workable.

Changing Git is therefore a form of economic policy inside software development.

A default changes incentives.

A deprecation creates migration work.

A performance improvement makes a previously expensive workflow plausible.

A new protocol capability lets hosts move cost from one part of the system to another.

A security restriction can close an attack path while breaking a convenient automation pattern.

The project has to price those effects without possessing perfect information about the population experiencing them.

Mailing-list review is one mechanism for collecting that information.

Release candidates are another.

Downstream testing is another.

Long deprecation windows are another.

The branch structure is another.

The point is not that Git has discovered the perfect governance system.

The point is that technical longevity required governance to become part of the architecture.

This becomes clearer when comparing the first Git to the current one.

The original repository had eleven files. The modern project has directories for built-ins, compatibility layers, documentation, translation, object-database work, references, testing, fuzzing, credential integrations, merge tools, platform support, and more. The object model remains recognizable. The code around it became an institution.

That institution contains historical compromise.

Git has commands whose names overlap awkwardly. Some old interfaces persist beside newer ones. Certain options exist because somebody once needed a particular workflow badly enough to make it permanent. Newer commands such as `switch` and `restore` arrived in part because `checkout` had accumulated several concepts under one verb. Compatibility means Git cannot periodically erase this history and present itself as a clean-slate product.

The command set has archaeology in it.

So does the code.

A less successful tool might simply rewrite itself until none of the original shapes remained. Git instead has to preserve enough continuity that old repositories and old habits keep working while internals evolve. This is a harder form of progress than starting again because every improvement must negotiate with the installed past.

The maintainer becomes the broker in that negotiation.

That role is not glamorous, but it contains one of the book's central lessons about the future.

The technologies that survive the next wave of software agents will not necessarily be the systems with the most dramatic agent-specific features.

They may be the systems whose maintainers can absorb agent pressure without sacrificing the contracts humans and existing automation already depend on.

Imagine the changes agentic development can force into version control.

Repositories may accumulate more refs because every machine task wants isolation.

Commit volume may rise sharply because agents can checkpoint frequently without becoming tired of typing messages.

Review tooling may demand richer provenance because “author” no longer implies a single human who typed the patch.

Merge queues may become more sophisticated because several machine-authored changes can each pass tests alone and fail in combination.

Partial clones may become more important because agents working on narrow tasks should not always download enormous repositories.

Semantic tooling may sit above textual diffs because humans need to understand the behavioral consequences of machine-scale changes faster than they can inspect every line.

Security defaults may tighten because autonomous tools can traverse repositories, invoke hooks, fetch dependencies, and execute build instructions with less moment-to-moment human scrutiny.

Git can respond to these pressures by changing.

The difficult question is how much.

A project could chase every new workflow into the core and become a confused agent platform.

It could ignore new workflows and force higher layers to compensate around it.

It could identify the small number of primitives that need strengthening—refs, object delivery, provenance hooks, storage, merge support, security boundaries—and let specialized systems build above them.

Git's history suggests the third path is the most natural.

The project has survived by remaining surprisingly opinionated about its core and surprisingly tolerant about the workflows layered over it.

It does not need to become the code-review website because GitHub exists.

It does not need to become the CI scheduler because other systems can attach status to commits.

It does not need to become a binary-artifact warehouse because Git LFS and separate object stores can connect heavy payloads to versioned pointers.

It does not need to understand a programming language to let semantic review tools compare commits.

It needs to keep offering stable things those systems can name, move, compare, and reconcile.

That is a maintenance strategy disguised as architectural minimalism.

The line between minimalism and stubbornness is not permanent.

Partial clone crossed that line because repository scale made eager completeness too costly for some users. Reftable crossed it because ref storage itself became a scaling problem. SHA-256 crosses it because the original hash cannot remain the only future answer. Safer bare-repository behavior crosses it because threat models changed.

Each crossing requires somebody to decide that an old assumption has become more expensive than change.

This is what maintainers do at mature infrastructure projects.

They spend compatibility capital.

Too little, and the project fossilizes.

Too much, and the project stops being infrastructure because users can no longer trust continuity.

Git's long stewardship under Hamano is therefore not a side note after the Torvalds chapter. It is evidence for why the initial design became durable enough to matter.

A brilliant object model could have remained a kernel-specific curiosity.

A fast branch implementation could have been replaced by a friendlier competitor.

A distributed repository could have fragmented into incompatible descendants.

Instead, Git accumulated portability, documentation, protocols, security fixes, performance work, hosting support, integrations, and a culture of conservative evolution.

The inventor gave the project its first constraints.

The maintainers taught it how to inherit new ones.

That distinction becomes especially important now because the next constraints are arriving from outside the world Git was built to serve.

The first Git assumed a developer was the scarce author and the repository was the abundant local object.

The future may invert both assumptions.

Authors can become cheap and parallel.

Repositories can become too large to possess in full.

The old architecture will not survive merely because its history is admirable.

It will survive if its maintainers can tell which ideas still deserve to be preserved.

Before reaching that future, though, Git had to leave the kernel's immediate orbit.

The object graph could already travel from machine to machine.

What happened next was not the creation of a center.

It was the discovery that a system with no required center could support many centers at once.
