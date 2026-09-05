# The Stupid Content Tracker

The first Git README makes a promise so technical that it is easy to miss how radical it was.

Objects would be named by their contents.

Not by the filename a developer happened to choose. Not by the folder in which the file happened to live. Not by a revision number assigned by a central server. The object database would take content, combine it with type and size information, run it through a hash function, and use the result as the object's name.

That sentence contains most of Git.

The rest is relationships.

A file's contents become a blob. A directory state becomes a tree that points to blobs and other trees. A commit points to a tree, records metadata, and points to one or more parent commits. An annotated tag can point to another object. Put those together and a repository stops looking like a stack of saved folders.

It becomes a graph whose nodes can name themselves.

This is the part of Git that many people use for years without needing to see. The ordinary interface is built to let you think in files and branches. You edit `server.py`. You stage it. You commit. You check out another branch. You merge. The object database does not demand that you admire it.

But Git becomes much easier to understand once you stop imagining that it primarily tracks files.

Git tracks states and relationships among states.

Suppose two directories in two different parts of a project contain files with exactly the same contents. At the object level, Git does not need two separate copies of the blob merely because two paths point to it. The blob's identity comes from the content. The paths appear in tree objects that describe where the blob is used in a particular snapshot.

Suppose a file is renamed without changing its contents. Git does not have to preserve a mystical permanent file identity that travels from the old pathname to the new one. The old tree can point to the blob under one name; the new tree can point to the same blob under another. When Git later reports that a rename occurred, that result can be inferred from similarity between states rather than read from an eternal “this is file number 8142” record.

This surprises people because other systems and ordinary filesystems train us to think that the name belongs to the thing.

Git separates them.

The content is one thing. The path is part of a tree that refers to the content. The history is another graph layered above that tree.

This separation is why the word “snapshot” is more useful than “delta” when first learning Git's mental model. A commit identifies a complete project tree. Git can store data efficiently using deltas inside packfiles, and it is very good at computing diffs between states, but the logical meaning of a commit is not “apply these three line edits to revision 418.” The commit points at a tree representing the project at that moment.

The difference is subtle until a history becomes complicated.

A numbered revision system encourages the intuition that history is one long tape. Revision 419 follows revision 418. A branch may be represented as a deviation from that tape, but the number still whispers that there is one universal sequence underneath.

Git does not need the whisper.

A commit records its parent or parents. If a commit has one parent, it continues one line of ancestry. A merge commit usually has more than one parent, which means the graph itself records that histories joined. There is no requirement that all commits receive a universal serial number from a central authority before they can exist.

This is what makes local creation natural.

You can create a commit while offline because the identity of the new commit does not require a server to hand out the next number. Git has the tree, the parent, the metadata, and the hash function. It can create the object locally. Someone else can create a different commit elsewhere at the same time. When the two repositories later communicate, the object names let them determine what they share and what they do not.

Distributed history becomes a set problem.

Which objects do you have?

Which objects do I have?

Which objects are reachable from the references we care about?

Which objects must move across the network so that both sides can understand a requested history?

A system that can reduce synchronization to questions like these has an enormous advantage: it does not need a single live database transaction spanning every participant's work.

The participants can diverge first.

They can reconcile later.

That is not merely a collaboration feature. It is an architectural permission slip.

The permission comes from content identity.

If I send you an object and tell you its object ID, you can hash the object and verify whether the bytes you received correspond to that ID. If we both have an object with the same ID under the same object format, we can treat it as the same object without asking which server it came from. If a bit changes, the content produces a different name.

This is why Git's hash has always carried two responsibilities that are easy to blend together.

One is engineering identity.

The other is integrity.

Identity is the everyday job. Git needs compact names for objects and a way to tell whether two repositories already possess the same content. Integrity is the security-adjacent property that makes accidental or malicious substitution detectable when you have a trusted identifier to compare against.

In 2005, Git used SHA-1.

At the time, SHA-1 was widely deployed, produced compact 160-bit identifiers, and fit the engineering problem. Years later, cryptanalytic attacks turned the choice into a migration challenge. In 2017, researchers publicly demonstrated a practical SHA-1 collision using two different PDF files. Git adopted a hardened SHA-1 implementation designed to detect known collision techniques, and the project has been working toward a broader SHA-256 transition.

That later history is important because it corrects one of the laziest descriptions of Git.

Git history is not “immutable because blockchain-like hashes make changing anything impossible.”

Git history is extremely rewritable.

Developers rewrite it every day.

Rebase takes commits and constructs new commits with different parents, often with different content or metadata. Amend creates a new commit. Filter tools can rewrite an entire repository. A force push can move a branch reference away from one line of history and toward another if the server permits it. Delete the old refs, allow unreachable objects to expire, and the rewritten history can eventually become the only history ordinary users see.

The hash does not prevent rewriting.

It makes rewriting legible at the object level.

Change the content, the tree, the parent, the author metadata, the committer metadata, or the message, and you have a different commit object with a different identifier. If someone already knows and trusts the old identifier, you cannot silently alter that object while preserving its ordinary Git identity unless you can defeat the hash assumptions protecting the object format.

This distinction is much stronger than the slogan it replaces.

Git does not make history physically immutable.

It makes history referentially exact.

A commit ID does not mean “roughly the version we had last Thursday.” It identifies one commit object, which points to one tree and one set of parent objects under the repository's object format.

That exactness turned commit identifiers into infrastructure.

Build systems record them. Deployment systems record them. Bug reports include them. Continuous-integration jobs run against them. Release notes mention them. Incident responders bisect histories looking for the first one associated with a failure. Package builders pin them. Organizations use them as compact names for states too complex to describe any other way.

The identifier is useful because it is content-connected.

A sequential database ID could be shorter. A friendly release name could be easier to say. A timestamp could be more intuitive. None of those would tell two independent repositories whether they were talking about the exact same object.

Git's object model does.

The commit itself is small compared with the project it identifies. It does not duplicate every file's bytes inside one giant record. It points to a tree. That tree points onward. Unchanged subtrees can be reused. The graph shares structure.

This is one reason snapshots do not imply grotesque duplication.

Imagine a project with a million files in which one source file changes. Conceptually, the next commit represents a complete new project state. Physically, Git can reuse every unchanged blob. Trees along the path to the changed file will differ because their references must eventually point at the new content, while trees elsewhere can remain the same objects. The commit points at the new root tree.

A tiny change can therefore produce a new globally named state without copying the universe.

That is a remarkably strong primitive.

It is also why Git can make certain comparisons feel supernatural to newcomers. The object graph contains enough structure to walk ancestry, compare trees, identify shared history, and reason about reachability without replaying every human editing action that ever occurred.

The history is not a movie of keystrokes.

It is a graph of declared states.

This leaves out an enormous amount of human reality.

A commit does not know that a developer stared at one function for three hours before changing a conditional. It does not know that a manager asked for the feature, that a customer threatened to leave, that an agent generated six failed implementations before the seventh passed tests, or that a maintainer disliked the patch until a benchmark changed their mind.

Git stores what the workflow chooses to encode.

That limitation will become central later in the book because machine authorship makes the gap between production process and commit record wider. A coding agent can generate thousands of intermediate states and squash them into one clean commit. The final graph may look indistinguishable from the graph produced by a human who carefully reasoned through the change before typing it.

The object model can prove neither story.

It was never designed to.

The commit object contains author and committer fields, but those are data inside the object. In ordinary Git they are claims, not independent proofs of identity. A user can configure a name and email. Cryptographic signing can add stronger evidence, and hosting platforms can add their own verification or attestation layers, but a raw commit's metadata should not be confused with a passport office.

Git identifies content far more strongly than it identifies people.

That asymmetry was rational for the original problem.

The Linux kernel needed a system that could move content and history through a distributed contributor network. Social trust already existed outside the tool in maintainers, mailing-list reputation, review, signed messages, and long-running relationships. Git did not have to turn every contributor into a cryptographically verified legal identity before it could be useful.

The tool could remain stupid about people.

It needed to be exact about objects.

The word “stupid” recurs in early Git culture as a kind of design compliment. A stupid layer does less. It exposes simple primitives. It refuses to embed every policy decision. Higher-level systems can then combine the primitives in different ways.

This was visible in the separation between the object database and the directory cache.

The cache deserves attention because it explains one of Git's most criticized features: the staging area.

A developer edits files in the working tree. Those files are messy, mutable, and subject to whatever the operating system and editor are doing. Git's index sits between that working state and the next committed tree. Staging is not merely a user-interface nuisance inserted to create an extra command. It lets Git assemble the exact tree that will become the next commit independently of everything currently present in the working directory.

That difference becomes powerful when a working tree contains several kinds of change at once.

You can stage part of a file. You can stage one set of files and leave another set uncommitted. You can resolve a merge by constructing the tree you want Git to record. You can inspect the difference between the working tree and the index, then between the index and the current commit.

The cost is conceptual overhead.

Three states exist where a beginner expected two: saved and unsaved.

Git says: working, proposed, committed.

This is a good example of an architecture whose first user's needs became everybody's interface. Experienced developers often come to love the index because it supports deliberate commit construction. New users often trip over it because the word “commit” sounds like it should simply mean “save what I changed.”

Both reactions are reasonable.

The deeper lesson is that Git's most important abstractions were not designed by starting with beginner vocabulary.

They were designed by starting with what the system needed to represent efficiently.

That decision bought longevity at the cost of approachability.

The object database proved exceptionally durable. The exact storage formats around it evolved. Loose objects can be packed. Packfiles use delta compression. Index files accelerate lookups. Commit-graphs accelerate history operations. Multi-pack indexes help repositories manage objects across several packfiles. Maintenance strategies change as repositories grow.

The logical objects remain recognizable.

Blob.

Tree.

Commit.

Tag.

A system can change almost everything about how it stores and retrieves those objects while preserving the meaning that higher layers depend on.

The same is true of references. The classic implementation stores refs as files or in `packed-refs`. Reftable offers a very different binary storage approach designed to scale better when repositories contain huge numbers of references and reflog entries. Yet a branch can remain, conceptually, a ref that points at a commit.

This is the difference between interface compatibility and implementation inertia.

Git has survived because it does not require every 2005 implementation detail to remain sacred.

Its hardest migrations happen when an implementation detail escaped and became part of the interface.

SHA-1 is the clearest example.

Object IDs did not remain hidden inside `.git`. Humans pasted them into email. APIs exposed them. Databases stored them. Build systems keyed caches by them. Package metadata referred to them. Shortened hashes appeared in user interfaces. Security policies assumed particular identifier lengths. Libraries reimplemented parts of the object format.

A twenty-byte decision became ecosystem grammar.

Changing the hash therefore requires more than compiling Git with a new algorithm. The project's SHA-256 transition design has to consider interoperability, object formats, translation between identifiers, signed objects, protocols, tooling, and repositories that cannot all migrate on the same morning.

This is what happens when a good abstraction becomes infrastructure.

People build on the shape of it.

The future chapters will return to SHA-256, but the present point is simpler: the content-addressed object model gave Git enough precision to distribute history without a central allocator, enough sharing to represent snapshots efficiently, enough integrity to make object identity useful across systems, and enough simplicity that new storage machinery could evolve underneath it.

That is a large accomplishment for a “stupid content tracker.”

The cleverness came from choosing what to be stupid about.

Git does not understand your program.

It does not know whether a line is a bug fix or a regression.

It does not know whether two developers are friends, whether a branch is authorized, whether a signature belongs to a person you should trust, or whether a merge will preserve the intent of both sides.

It knows objects.

It knows graphs.

It knows references.

It knows how to move those things.

Once that foundation existed, a branch could become almost absurdly small.

And when branches became small, software organizations began creating a lot more of them.
