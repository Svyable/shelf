# The Invisible Database

Delete the working tree and a Git repository can still be a repository.

Delete the object database and it cannot.

That asymmetry is easy to miss because Git presents itself through files people edit. The visible directory feels like the project. The `.git` directory feels like bookkeeping.

The bookkeeping is the machine.

A normal Git repository contains an object store, references, configuration, an index, logs, and a growing collection of auxiliary data structures built to make common operations fast. The exact files vary with repository format and configuration. Some repositories separate the working tree from the Git directory. Bare repositories omit the working tree entirely. Alternates and promisor remotes can complicate where objects physically reside.

The stable idea is not a particular folder layout.

It is that the developer-facing history is synthesized from stored objects plus names and indexes that make those objects usable.

The first Git stored objects loosely in directories derived from their hashes. That representation is wonderfully direct. Given an object ID, part of the hexadecimal name selects a directory and the remainder selects a compressed file. The scheme is simple enough to explain on a whiteboard.

It is not how you want to store millions of objects forever.

Filesystems have overhead. Opening vast numbers of tiny files is expensive. Transfer is inefficient. Compression works better when related objects can be considered together.

Git therefore packs objects.

A packfile combines many objects into a compact representation. Delta compression can store one object in terms of differences from another. An accompanying index lets Git locate an object without scanning the entire pack. Garbage collection and maintenance consolidate loose objects and packs over time.

The word delta can confuse people who have learned that Git stores snapshots rather than a chain of file diffs.

Both statements are true because they describe different layers.

Logically, a tree and the blobs it names describe a state. A commit names that tree. Git does not require a developer to reconstruct the current version by replaying every historical patch in order. Physically, the storage engine is free to compress one object against another when that representation saves space. The delta is a storage choice, not the semantic definition of the version.

That freedom matters. A repack can choose a different delta base tomorrow without changing the object's identity. Two clones can store the same object graph using different pack layouts and still agree perfectly on the commits. A server optimized for transfer can arrange its packs differently from a developer laptop. The content-addressed namespace separates the question “what object is this?” from “how are its bytes compressed here?”

This is a database property in the strongest sense.

The logical record survives physical reorganization.

None of this changes the commit graph a developer sees.

That separation is one of Git's quiet strengths.

Logical identity is not physical layout.

A blob can keep the same object ID while Git moves its storage from a loose object into a packfile, repacks it into another pack, represents it as a delta against a different base, or moves packs through maintenance strategies. The user can ask for the object by identity without knowing how the storage engine currently represents it.

Database systems have lived on this distinction for decades. Applications speak in records and queries while storage engines reorganize pages, indexes, caches, and logs underneath. Git applies a similar discipline to history.

This is why calling Git “just a bunch of files” is both charming and misleading.

Yes, the repository is implemented with files on a filesystem.

So are many databases.

The important question is what invariants those files collectively maintain.

Git's index is another example of a name that hides its importance.

Users learn it as the staging area: the place between working-tree edits and the next commit. Internally it is also a cache of path information and object identities that helps Git compare the working tree with the committed tree efficiently. The index lets Git avoid reconstructing every fact from scratch on every command.

That matters because Git's user experience depends on operations feeling local and cheap.

`git status` is invoked constantly. A theoretically elegant object model that requires minutes to discover which files changed would be an unusable version-control system.

As repositories grew, the performance machinery multiplied.

The commit-graph file is one of the clearest examples. Commit history is already encoded in commit objects: each commit names its parents. In principle Git can traverse those objects whenever it needs ancestry information.

In a large history, repeatedly opening and parsing commit objects is unnecessary work.

A commit-graph stores serialized information about commits in a form optimized for graph operations. Git's current documentation includes support for split commit-graphs and optional changed-path information. The graph does not replace commit objects as the authoritative history. It accelerates questions about that history.

That distinction—authority versus acceleration—appears throughout mature Git storage.

An index can be regenerated.

A commit-graph can be rewritten.

A multi-pack index can describe objects spread across multiple packfiles without making those packfiles cease to exist.

Reachability bitmaps can make traversal faster by precomputing information about which objects are reachable from selected commits.

These structures are valuable precisely because Git can discard and rebuild them without redefining the project history.

Caches are easier to evolve than truths.

The multi-pack index arose from another scaling pressure. Repacking everything into one ideal pack can be expensive for a huge repository. Keeping multiple packfiles avoids that cost, but then object lookup has to search across packs and maintenance can become fragmented. A multi-pack index supplies one lookup structure over many packs.

The concept is almost boring.

That is a compliment.

A repository with many physical packs can behave as though it has one indexed object namespace.

This lets maintenance strategy change without leaking every storage decision into ordinary Git commands.

Geometric repacking pushes the same idea further. Instead of repeatedly rewriting the entire object population, maintenance can combine packs according to size relationships so the repository avoids pathological piles of tiny packs while limiting how much data is rewritten at once.

Large installations care because rewriting terabytes to make a storage layout aesthetically tidy is not maintenance. It is an outage plan.

The existence of Scalar makes the maturity of this layer unusually visible. Scalar began as tooling for very large Git repositories and was brought into the Git project. Its value is not a new kind of commit. It configures and orchestrates the surrounding machinery: background maintenance, commit-graph upkeep, multi-pack-index work, and other choices intended to keep a large repository responsive without making the developer become a storage administrator.

This is what mature infrastructure often does to its own complexity.

First, performance features appear as expert knowledge. An operator learns which maintenance command to run, which index to rebuild, which knob to set. Then the system begins to schedule and coordinate those actions itself because asking every user to understand the storage engine defeats the point of having an abstraction.

The better Git becomes at this, the less a developer notices that the repository is a maintained database at all.

A command can remain fast because work happened earlier in the background. A graph query can remain cheap because an auxiliary file was refreshed. Object lookup can remain predictable because packs were consolidated incrementally. The interactive command is short because the database paid some of the cost somewhere else.

That has an operational consequence: performance itself becomes stateful.

Two clones of the same commit graph can feel very different depending on maintenance history. One may have an up-to-date commit-graph, efficient pack layout, warm filesystem caches, and an index shaped for the current working set. Another may contain exactly the same authoritative objects and still feel slow because its derived structures have drifted.

The repository history is the same.

The database health is not.

Git's evolution at scale has therefore been less about replacing the original model than about inserting indirection around expensive assumptions.

Do not traverse every raw commit when an auxiliary graph can answer the question.

Do not repack every object when incremental maintenance will do.

Do not require one pack when an index can span many.

Do not require every file in the working tree when sparse checkout can materialize a subset.

Do not require every object locally when partial clone can promise that missing objects are obtainable elsewhere.

Each optimization weakens a physical assumption while trying to preserve a logical one.

That is the pattern that makes Git's future interesting.

The original mental model was powerful partly because it was concrete. Clone the repository and you have the objects. Check out a tree and you have the files. A branch points to a commit. A commit points backward through parents.

At very large scale, the implementation becomes more conditional.

You may have the commit but not every blob it can reach.

You may have a working tree containing only selected paths.

You may have objects distributed among many packs and alternate object stores.

You may rely on a promisor remote to fill holes later.

You may store refs in a format other than the traditional loose-ref files and packed-refs representation.

The user still types `git log`.

This is infrastructure maturity: preserving a small conceptual surface while replacing assumptions beneath it.

There is a danger in that success.

Every layer of indirection creates another place where corruption, incompatibility, or performance pathology can hide. A simple loose-object repository is inefficient at scale but inspectable. A repository using multiple auxiliary formats, background maintenance, partial object availability, and specialized ref storage is more capable and more difficult to reason about when something goes wrong.

Git responds partly with verification.

Commands such as `git fsck`, commit-graph verification, index checks, and object validation exist because derived structures and content-addressed storage need ways to test their invariants. The stronger the optimization layer becomes, the more important it is to know which data is authoritative and which can be reconstructed.

This is an operational principle worth carrying beyond Git.

When a cache is corrupt, delete the cache.

When the source of truth is corrupt, you need a recovery story.

Content addressing helps identify one class of corruption because an object's bytes must match the name under the repository's hash scheme. Pack indexes and checksums help detect damage in physical storage. Verification commands can walk relationships that ordinary happy-path commands assume are sane.

But not every broken repository is cryptographically corrupted.

A ref can point to the wrong but perfectly valid commit. A force push can discard the history people intended to retain. A partial clone can be healthy while the promisor remote it depends on is unreachable. A backup can faithfully preserve `.git` while omitting an external LFS store required to reconstruct the project.

Database correctness is larger than byte integrity.

It includes the names, availability assumptions, retention policy, and recovery procedures that turn objects into a usable history.

Git's reflogs occupy an interesting middle ground.

A branch ref tells you where the branch points now. A reflog records recent movements of a ref in a local repository. Reset a branch, rebase, or move HEAD and the reflog can preserve a route back to objects that no longer appear in ordinary branch history.

Users often discover reflogs after making a mistake and conclude that Git secretly never deletes anything.

That is not quite right.

Reflogs expire according to policy. Unreachable objects can eventually be pruned. The recovery window is a consequence of retention and maintenance behavior, not a metaphysical guarantee.

Still, reflogs reveal an important database instinct: destructive-looking updates can be made recoverable by recording the update history separately from the current pointer.

A ref is current state.

A reflog is operational history about that state.

The distinction becomes crucial in systems where names move.

Branches are intentionally mutable. Tags can be moved even when policy says they should not be. Remote-tracking refs advance. HEAD changes constantly. Git's object IDs are content-derived, but the human names that make those objects navigable are mostly pointers with histories of their own.

This is why repository storage cannot be understood by studying objects alone.

Objects provide durable identities.

Refs provide changing meaning.

Indexes make lookup practical.

Logs make pointer movement recoverable.

Maintenance keeps the physical representation from collapsing under its own accumulation.

The developer experiences the combination as “my repository.”

The database framing also clarifies why Git can change so much without developers noticing.

Most users do not care whether a commit-graph is split. They care whether `git log`, merge-base calculations, fetches, and maintenance remain fast and correct. They do not care whether refs eventually live in reftable. They care whether branches still resolve, update atomically, and survive crashes. They do not care how many packfiles exist. They care whether cloning and fetching complete in tolerable time.

A mature infrastructure project earns freedom by keeping those contracts stable.

That freedom is not unlimited.

Internal formats leak. Administrators write scripts that inspect `.git`. Hosting systems build directly on repository internals. Libraries reimplement Git formats. Backup systems make assumptions about which files matter. Performance tools depend on storage behavior. A format that was “internal” becomes an ecosystem contract the moment enough software reads it.

SHA-1 demonstrated that at the identity layer.

Repository storage demonstrates it everywhere else.

Git's developers therefore face the same tension repeatedly: evolve the implementation aggressively enough to survive new scale while changing it conservatively enough that the ecosystem can follow.

The next chapters will show that pressure in refs, partial repositories, and Git 3.0. But before the storage engine disappears entirely beneath optimization, there is a social consequence worth noticing.

Git became fast enough at creating independent histories that creation stopped being the scarce operation.

A branch can be made in an instant. A clone can create commits offline. A fork can diverge without permission. An agent can now generate another candidate patch before a human has finished reading the previous one.

The database can store all of those histories.

Storage is not the hard part.

The hard part is deciding which histories become one.

The merge is the work.