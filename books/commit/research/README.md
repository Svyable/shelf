# Commit — research brief

## Working thesis

*Commit* is a history of Git told through the design decisions that survived their original context.

Git was born in an emergency. The Linux kernel community had spent years using BitKeeper, a proprietary distributed version-control system, when that arrangement broke down in 2005. Linus Torvalds did not respond by designing a universal collaboration platform. He built a fast content tracker for a project with unusual scale, an unusually distributed contributor base, and an unusually low tolerance for a central bottleneck.

The book's central claim is that Git became durable because four ideas turned out to be much larger than the emergency that produced them:

1. **Content can have identity independent of location.** Git names objects by their content rather than by a server path or a row number.
2. **History is a graph.** A commit names parent commits, so ancestry and branching are data rather than workflow decorations.
3. **A participant can possess the history.** A normal clone is not merely a checkout leased from a server; it is a repository capable of inspection and new history while disconnected.
4. **Collaboration is copying plus reconciliation.** Git does not require one permanent topology. Centralized hosting became popular on top of Git, but the object model underneath remains distributed.

Those ideas explain much of Git's longevity. They also create the pressure points that define its future. A repository that can be copied whole eventually meets repositories that are too large to copy whole. Content identity tied to SHA-1 eventually meets cryptographic obsolescence. Cheap branches eventually meet organizations and agents capable of producing more branches and commits than humans can review. A textual patch model eventually meets generated code, binary artifacts, notebooks, structured data, and changes whose important meaning is not well represented by lines of text.

The future of Git is therefore unlikely to be a clean replacement story. The more plausible contest is between **the durable core**—content-addressed objects, graph history, refs, transport, local possession—and the layers around that core: working-tree semantics, repository storage, verification, provenance, review, merge intent, object delivery, and machine authorship.

The test throughout the manuscript is: **Which part of Git is an accident of 2005, and which part is infrastructure?**

## Boundary with adjacent Desk books

This book must stay in a narrow lane.

- **Open Source** is about the economics of open AI and the scarce layers around freely copyable intelligence. *Commit* may discuss open-source coordination, but it is not a general history or defense of open source.
- **No One Read It** is about verification when machine production outruns human attention. *Commit* uses that pressure specifically to ask what happens to commits, branches, review, provenance, and merge authority when software agents become prolific authors.
- **Agentile** and **The Never Ending Intelligence** treat persistent delegated systems as an economic and architectural capability. *Commit* is interested only in the version-control consequences of machine authorship.
- **Proof of Human** owns the broad authenticity and provenance problem. *Commit* narrows provenance to software history: what a commit can prove, what signatures can and cannot prove, and how repository history participates in the software supply chain.
- **The World Beneath the World** and other infrastructure books may overlap in method—looking beneath familiar interfaces—but *Commit* should remain a biography of one technical system and the culture that formed around it.

The title refers to Git's central social artifact, not to commitment as a self-help metaphor. Avoid motivational language about "committing" to goals.

## Narrative method

The opening half should move chronologically enough that a reader who has never used Git can follow the sequence, but it should not become a catalog of releases or commands. Each historical episode should earn a design idea.

The back half becomes more architectural and forward-looking. Current Git documentation, release notes, design documents, mailing-list practice, and work already merged into Git should be separated from speculation about future developer behavior.

The manuscript should distinguish at least four kinds of claim:

- **Historical fact:** a dated event, commit, release, handoff, or documented design choice.
- **Current implementation:** functionality present in contemporary Git.
- **Declared project direction:** changes explicitly tracked for a future release, such as Git 3.0 items.
- **Author forecast:** a bet about how developers, hosting platforms, or agents may use Git or Git-like systems.

A forecast must never be written as though it were a Git project commitment.

## Current structure

### 1. Seven Days in April

Open on the first public Git commit on April 7, 2005: eleven files and a README that called Git a "stupid content tracker." Reconstruct the BitKeeper breakdown only to the level supported by strong sources. The important pressure was not interpersonal drama; it was the kernel's need for a system that could preserve speed, distributed work, non-linear history, and contributor autonomy.

The chapter should make the contingency visible. In the first week, nobody could know that this emergency tool would become normal infrastructure for software development.

Falsification note: do not turn Git's later success into evidence that the original design was obviously destined to win. Contemporary alternatives existed, Git's early interface was difficult, and hosting/social layers that later made it approachable had not yet been built.

### 2. The Stupid Content Tracker

Explain the first design from the inside out. Git begins with an object database and an index, not with a metaphorical folder full of file versions. Blobs, trees, commits, and tags form a content-addressed graph. A commit points to a tree and parent commits. File identity is inferred from content and history rather than stored as a permanent file object with an immutable path.

The chapter should make a reader feel why this was strange compared with systems organized around files, revisions, or a central repository. It should also preserve the limits: SHA-1 was chosen in a different security era, Git still depends on filesystem and index machinery, and content addressing does not by itself solve authorship or trust.

Falsification note: avoid claiming that cryptographic hashing makes Git history "immutable." Ordinary Git history can be rewritten; object names make rewritten objects different and make tampering detectable when a trusted object ID is known.

### 3. A Branch Is Just a Name

Explain why Git's cheap branching is not primarily a user-interface feature. A branch is a movable reference to a commit. Creating one does not duplicate the repository's content. Merging creates graph structure, and the commit graph retains divergent ancestry.

Use this to explain why Git changed the economics of experimentation. The important difference is not that other systems lacked branches; it is that Git made branching structurally cheap enough to become ordinary.

Falsification note: cheap creation does not make branches free in the organizational sense. Long-lived divergence, review queues, merge conflicts, CI load, release coordination, and branch protection can all become expensive.

### 4. The Maintainer

Shift from the inventor story to the maintenance story. Git's durability is partly a governance achievement. Junio C Hamano became the long-running maintainer, and the project developed a mailing-list-centered integration culture in which patches, topic branches, review, and staged integration matter more than a single founder's preferences.

The chapter should resist the Great Man version of software history. Linus's initial architecture mattered enormously; so did the people who made it usable, portable, documented, safe, and compatible for two decades.

Falsification note: do not imply that Git governance is decentralized in every practical sense. Maintainers and trusted integrators have real authority, and the project has a recognizable integration topology.

## Planned chapter briefs

### 5. The Network Has No Center

Show what "distributed" actually buys: local history, offline work, multiple remotes, and flexible integration topologies. Then examine the paradox that most developers experience Git through highly centralized forges.

### 6. GitHub Gives the Graph a Face

Treat GitHub and other forges as the social layer that made Git legible at mass scale: profiles, repository discovery, issues, web diffs, comments, status checks, and a shared place to point. The chapter should distinguish Git from GitHub throughout.

### 7. The Pull Request

Follow the pull request from an integration convenience into an institution. Review, CI, policy, security scanning, bots, branch protection, and organizational authority accumulated around a proposal to merge graphs.

### 8. The Monorepo Test

Use very large repositories to show the cost of Git's original promise that a participant can possess history. Commit-graphs, reachability bitmaps, multi-pack indexes, geometric repacking, sparse checkout, and partial clone are adaptations that preserve familiar semantics while reducing the amount of work required.

### 9. The Files Git Wasn't Built For

Examine large binaries, generated assets, datasets, notebooks, model weights, and build outputs. Git LFS and external artifact systems reveal a recurring pattern: Git remains the coordination graph while heavy payloads move elsewhere.

### 10. The SHA-1 Clock

Tell the collision story carefully. Git hardened SHA-1 after practical collision attacks and has been building a transition path to SHA-256. The interesting problem is ecosystem migration: object names escape the repository into APIs, databases, build systems, documentation, package metadata, and human habit.

### 11. The Invisible Database

Revisit Git as a database whose interface happens to be developer workflow. Packfiles, indexes, commit-graphs, refs, reflogs, object databases, and maintenance make the familiar commands possible. The chapter asks how much implementation can change while Git remains recognizably Git.

### 12. The Merge Is the Work

Argue that distributed creation makes reconciliation the scarce act. Merge algorithms, conflict presentation, rerere, merge queues, and review practices are different attempts to lower the cost of deciding how independent histories become one history.

### 13. The Security Boundary

Hooks, submodules, repository configuration, unsafe ownership, credential helpers, remote content, and build automation turned version control into part of the attack surface. Git 3.0's planned safer bare-repository default can anchor the chapter in concrete project direction.

### 14. The Commit as Evidence

Separate what a commit records from what it proves. Author and committer fields are claims. Object IDs identify content. Cryptographic signatures can bind an identity/key to an object under assumptions. Hosting attestations and software-supply-chain systems add other layers. None of these automatically prove that code is safe or that a human understood it.

### 15. The Agent in the Working Tree

Move into the 2026 pressure. Coding agents can create changes without inhabiting a developer's mental timeline. Git remains useful because it produces checkpoints, isolated branches, diffs, and rollback points, but agent workflows may need stronger machine-readable intent, provenance, and task boundaries.

### 16. A Thousand Parallel Authors

Ask what happens when branch creation becomes cheaper than review. The problem shifts from storing changes to scheduling, deduplicating, ranking, testing, and integrating them. The repository becomes an attention-allocation system.

### 17. The Semantic Diff Problem

Textual diffs are powerful because source code is text, but the meaning of a change often crosses files, generated code, schemas, dependencies, refactors, and behavior. Future review layers may become semantic without requiring Git itself to understand program meaning.

### 18. Git 3.0

Use the project's own BreakingChanges documentation as a rare visible window into deliberate evolution. Current plans include SHA-256 as the default for new repositories, mandatory Rust support subject to downstream evaluation, safer bare-repository behavior, and removal of long-deprecated features. There is no announced Git 3.0 release date as of September 2026.

### 19. The Reference Explosion

Explain reftable as evidence that even tiny names become a scaling problem when repositories accumulate hundreds of thousands of refs and reflog entries. The future can preserve the concept of a ref while replacing its storage.

### 20. The Repository You Don't Have

Partial clone, promisor remotes, sparse checkout, bundle URIs, and protocol v2 weaken the old assumption that every useful local repository must eagerly contain every reachable object. The local repository becomes a cache backed by promises while trying to preserve Git's distributed ergonomics.

### 21. What Replaces Git?

Take alternatives seriously: systems optimized for giant monorepos, change-based version control, patch stacks, database-backed forges, language-aware histories, and agent-native collaboration. The chapter should look for replacement at the layer of pain rather than assume a wholesale successor.

Falsification note: Git can remain dominant even if most developers stop interacting with it directly. Tool invisibility is not the same as replacement.

### 22. The Versioned World

End by widening the lens carefully. Git's deepest cultural contribution may be the normalization of inspectable, branchable history: the idea that a state can be named, compared, forked, reconciled, and recovered. Do not claim Git itself should version every form of human activity. The point is that software learned to treat history as an operational resource rather than an archive.

## Evidence discipline

- Prefer Git's own repository, documentation, release notes, and mailing-list records for claims about Git.
- Use *Pro Git* as a clear secondary explanation, not as the only source for controversial history.
- Distinguish Git from GitHub and from hosted Git workflows.
- Never write that Git makes history immutable. Say that content-addressed objects make changes produce different object IDs and enable integrity checks when identities are anchored.
- Never write that SHA-1 is currently an unmitigated practical break of Git. Git uses hardened SHA-1 protections, while the project still considers migration prudent.
- Treat Git 3.0 items as declared project direction with no announced release date, not as shipping features in Git 2.55.
- Treat Rust adoption as staged and subject to downstream evaluation exactly as the BreakingChanges document states.
- Do not claim partial clone or reftable are universal defaults merely because they exist.
- Preserve the distinction between local repository completeness and working-tree sparsity.
- Do not turn agent coding into a forecast that humans disappear from software development. The narrower claim is that machine authorship increases pressure on versioning, review, provenance, and integration systems.
- Avoid invented dialogue, inner thoughts, or reconstructed scenes from 2005 unless a source provides them.

## Current snapshot — September 3, 2026

- The latest Git source release listed by git-scm.com is **2.55.0**, released June 29, 2026.
- Git's development repository already contains release-note work for 2.56.0; this manuscript therefore treats 2.55.0 as the latest released source version and unreleased 2.56 work as development state.
- The current BreakingChanges document tracks Git 3.0 but gives **no planned release date**.
- The current Git 3.0 plan says new repositories will default to SHA-256.
- The current Git 3.0 plan says Rust becomes mandatory, while explicitly allowing the project to defer that requirement if downstream impact is too significant.
- Reftable, partial clone, sparse checkout, protocol v2, bundle URI support, commit-graphs, multi-pack indexes, and related scaling machinery are existing parts of the Git ecosystem, though deployment varies.
