# Seven Days in April

At 3:13 in the afternoon on April 7, 2005, Pacific time, Linus Torvalds committed eleven files to a new repository.

There was a forty-line Makefile. There were small C programs with names such as `init-db`, `write-tree`, `read-tree`, `commit-tree`, `cat-file`, and `update-cache`. There was a header file, a cache implementation, and a README with the sort of title that rarely survives a corporate naming meeting.

“GIT - the stupid content tracker.”

The commit message called it the “information manager from hell.”

There is an irresistible temptation to look at that first commit as a relic from a settled history. We know what came later, so the eleven files acquire the glow of an origin story. A modern programmer can inspect the hash, open the tree, and move through Git's own birth using Git. The repository itself makes the beginning feel preordained because the beginning remains reachable from the present.

It was not preordained.

A week earlier, Git did not exist.

What did exist was a very large open-source project with a very particular coordination problem.

The Linux kernel had spent its early years moving changes through patches, archives, mailing lists, and the judgment of maintainers. That approach can sound quaint until you remember the scale of the work. The kernel is not one program in the ordinary sense. It contains architecture-specific code, filesystems, device drivers, networking, memory management, security machinery, and enough interfaces with hardware to make every general statement immediately meet an exception. Thousands of people have reasons to touch it. Most of them should not be changing the same thing at the same time, yet all of them are ultimately contributing to one evolving body of code.

The problem is therefore not simply storing versions.

It is moving trust.

A maintainer receives a proposed change from someone else. The maintainer may accept it, modify it, reject it, or ask for another version. Subsystem maintainers collect work from narrower communities. Changes travel upward through a social structure that is neither a pure democracy nor a corporate hierarchy. Different people need to carry different lines of development for different lengths of time. Everyone needs to know what a proposed change was based on, what it contains, and what happened after it left their hands.

Centralized version-control systems can coordinate large projects, but they place unusual weight on the center. The central repository is where the authoritative history lives. Developers may have local working copies, but the server owns more of the truth. That arrangement can be useful inside an institution with a stable network, a clear chain of authority, and administrators who are expected to keep the server available.

The Linux kernel was a more awkward organism.

Its contributors were spread across organizations and countries. Some maintainers were themselves hubs for other maintainers. Work could not stop because one shared server was unreachable. Nor did Torvalds want every exploratory operation to become a network request. The project needed a way for many people to possess enough history to work independently and then exchange the results.

In 2002, the kernel project began using BitKeeper, a proprietary distributed version-control system. The arrangement was controversial because one of the world's most important open-source projects was relying on closed software for a central part of its development process. It was also useful. The experience gave kernel developers a practical education in distributed version control at a scale where abstract arguments become concrete very quickly.

Then, in 2005, the arrangement broke down.

The official Git history tells the episode without melodrama: the relationship between the kernel community and the company behind BitKeeper deteriorated, and the tool's free-of-charge status for that community was revoked. Whatever larger history one attaches to that dispute, the engineering consequence was immediate. The kernel needed another system.

This is the first important fact about Git.

It was not born from a greenfield desire to make version control elegant.

It was born from loss.

The lost system had taught the project what distributed workflows could feel like. Returning to the old patch-and-archive world would have meant surrendering useful capabilities. Adopting an existing alternative would have required accepting its performance, data model, branch behavior, and workflow assumptions. Torvalds instead began writing.

The design goals later summarized by the Git project are revealing in their bluntness: speed, simple design, strong support for non-linear development, full distribution, and the ability to handle a project the size of Linux efficiently.

Those goals do not describe a friendly product.

They describe a weapon against waiting.

Speed matters differently when an operation sits inside a habit. If creating a branch takes several minutes, people create fewer branches. If seeing history requires a trip to a server, people inspect less history when the network is bad. If merging feels exceptional, organizations build rituals to avoid it. If comparing two states of a large source tree is slow, developers learn not to ask certain questions casually.

Latency becomes culture.

Torvalds understood this from years of kernel work. The kernel did not need a system that could theoretically represent thousands of parallel lines of development. It needed one in which the representation was cheap enough that people would actually use it.

The April 7 commit is startling partly because so little of the later user experience is present. There is no GitHub page waiting to render the repository. There is no pull request. There is no familiar porcelain of `git status`, `git switch`, `git restore`, and the accumulated ergonomics of two decades. The first README describes two abstractions: an object database and a current directory cache.

That is almost aggressively unromantic.

The object database stores content-addressed objects. The directory cache, which would evolve into what Git users now know as the index, represents a proposed tree of content. The early commands manipulate those pieces directly.

This is why the first Git can look less like a version-control product than a box of sharp plumbing tools.

It was.

The plumbing came first because the plumbing was the bet.

Torvalds was not beginning with a workflow diagram and then deciding how to store the result. He was beginning with a data model that could make the required workflows cheap. Content would be named by hashes. Trees would describe directory states. Commits would connect states into history. References could point at commits. If those operations were fast and composable, higher-level workflows could be built on top.

That inversion matters.

Many software products begin with the interface people are supposed to see and hide an implementation underneath. Git began with an implementation so opinionated that the interface spent years learning how to make it comfortable.

The first users did not need comfort as much as they needed escape velocity.

The kernel community was already sophisticated. Its maintainers could tolerate commands that felt strange if the underlying system performed. They could wrap plumbing commands in scripts. They could invent conventions. They could send patches to improve the tool while also using it to move the project that had forced the tool into existence.

This gave Git an unusual incubation environment.

The customer was also the laboratory.

Performance problems were not hypothetical benchmark cases. They appeared while maintaining Linux. Workflow disagreements were not product-management exercises. They were arguments among people already exchanging real code. A feature either helped move patches through a living project or it did not.

This is easy to romanticize as pure engineering, and that would be a mistake.

Emergency-built systems acquire scars. They encode the preferences of their first users. They assume a level of technical fluency that later users may not share. They develop terminology around implementation details because the implementation was visible before anybody had time to invent gentler names. They solve the urgent problem brilliantly and sometimes leave ordinary problems feeling oddly shaped.

Git still carries this ancestry.

The index is one example. New users often wonder why a change can exist in a working tree, in the index, and in a commit as three distinct states. The model becomes powerful once internalized, but it is not the obvious interface one would design if the only goal were to help a beginner save versions of a folder. It makes more sense when seen as a descendant of the directory cache in that first README: a structured proposed tree between the messy filesystem and a durable commit.

The distinction between “plumbing” and “porcelain” is another clue. Git eventually accumulated higher-level commands intended for humans and kept lower-level commands that expose the machinery. The vocabulary itself admits the architecture: pipes first, fixtures later.

The speed goal left equally durable fingerprints.

Git's object database allows enormous amounts of work to happen locally. History traversal, branching, committing, diffing, and many other operations do not require a central server. That feels normal now because Git made it normal. In 2005, making a developer's local repository a first-class holder of history was a much stronger statement about where authority and capability should live.

A clone was not meant to be a thin permission slip.

It was meant to be useful on its own.

This did not abolish hierarchy. The Linux kernel still had maintainers. Torvalds still decided what entered his tree. Distributed storage does not imply distributed authority. What changed was the relationship between authority and possession. A contributor did not need to own the canonical tree to possess history, create new history, compare it, rearrange it, or publish it elsewhere.

That distinction would later matter far beyond Linux.

It made forks technically ordinary even when they were socially dramatic. It made mirrors straightforward. It allowed organizations to use one repository with several remotes and several centers of integration. It let a developer board a plane with the project's history and remain capable of serious work after the network disappeared.

The physical circumstances of 2005 should not be forgotten here. Network access was already central to software development, but connectivity was less ubiquitous, cloud infrastructure less assumed, and hosted developer platforms far less capable than they would become. The idea that the useful repository should live locally was not nostalgia. It was performance engineering and operational resilience.

The irony is that Git's success later enabled an enormous recentralization of experience.

Most developers today do not discover Git by exchanging repository URLs among peers. They encounter a forge. They clone from GitHub, GitLab, Bitbucket, Azure DevOps, or an internal platform that gives the repository one socially obvious home. They open pull requests back to that home. They wait for CI there. They ask reviewers to approve there. They treat the remote branch as more real than the local one because the organization acts on the remote.

Git underneath remains distributed.

The human workflow above it often is not.

That apparent contradiction is one reason the tool survived. Git did not force every organization to behave like the Linux kernel. Its data model was flexible enough to support a dictator-and-lieutenants model, a centralized corporate forge, a network of peers, a fork-and-pull open-source project, or a single person with no remote at all.

The topology became policy rather than physics.

In April 2005, that flexibility was still only potential.

The new system had to prove that it could survive contact with its first project.

The public repository changed quickly. Commands appeared, scripts appeared, names changed, protocols improved, and other developers began contributing. Git became capable of maintaining itself, one of those recursive milestones programmers enjoy because it makes a tool feel suddenly real. But the significance of the first week is not that every important feature arrived immediately.

It is that the core direction arrived early.

The first README already described content-addressed storage. The initial source already manipulated trees and commits. The system was already being built around the idea that a history could be assembled from named objects rather than assigned by one remote authority.

This created a peculiar form of durability.

A good emergency design solves the emergency.

A great one sometimes discovers that the emergency contained a general problem.

The Linux kernel needed to move trusted changes through a distributed community without turning the center into a performance or ownership bottleneck. As software development spread across open-source communities, global companies, outsourced teams, cloud platforms, and eventually autonomous coding systems, more projects began to resemble some part of that problem.

Not all of it. Most teams are not the Linux kernel. Most developers do not need thousands of parallel branches. Many organizations actually prefer a strong central service because centralization simplifies permissions, compliance, backup, automation, discovery, and support.

But they still benefit from a local system whose history is not merely a remote service response.

They still benefit when branching is cheap.

They still benefit when a commit has a stable identity derived from its contents and ancestry.

They still benefit when a repository can be copied, inspected, mirrored, and moved between hosts.

They still benefit from the possibility of exit even when they rarely use it.

That last point is underappreciated.

A technical capability can alter a relationship without being exercised.

If a repository hosted on one forge can be cloned elsewhere with its history intact, the host is important but not identical to the project. Issues, comments, CI state, permissions, and other social metadata may be harder to move, but the code history is not trapped in the same way it would be if the host owned the only authoritative database representation.

Git created portability at the layer developers considered sacred.

The code could leave.

That principle is visible in the first week even though the forge economy that would make it strategically important did not yet exist.

The same is true of content identity. A hash-named object sounds like an implementation detail until systems across a company begin using commit identifiers as coordination tokens. A deployment can record the commit it shipped. An incident can identify the commit believed to introduce a regression. A build can declare which tree it consumed. A release can be tagged. A security scanner can attach a result to a revision. A package can point back toward source.

The tiny technical choice becomes institutional vocabulary.

This is how infrastructure grows: not by announcing that it will become infrastructure, but by giving other systems something stable enough to build assumptions around.

Git accumulated assumptions at extraordinary scale.

That later scale makes the April 2005 beginning more interesting, not less, because it exposes which assumptions were not there yet.

There was no promise that SHA-1 would remain the right hash forever.

There was no promise that a complete repository would always be small enough to clone eagerly.

There was no promise that branches would be created primarily by humans.

There was no promise that lines of text would remain the best unit for explaining every meaningful software change.

There was only a fast content tracker and a project that needed it now.

The future of Git will depend on how carefully it can separate those two categories: the principles that made the emergency design powerful and the particulars that merely belonged to the emergency's era.

Before we can see that separation, we have to open the eleven files and understand what kind of thing Torvalds had actually built.

The name said content tracker.

That was not modesty.

It was the architecture.
