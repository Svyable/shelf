# The SHA-1 Clock

A Git object has two lives.

There is the object itself: a blob, tree, commit, or tag encoded in Git's object format.

Then there is its name.

For most of Git's history, that name has been a SHA-1 digest. Developers usually encounter only the convenient edge of this arrangement. A commit gets a hexadecimal identifier. The identifier can be shortened when enough characters remain to distinguish it from other objects in the repository. Tools pass the name around without needing a central sequence generator. Two repositories that possess the same object can agree on its name without asking a server.

It is difficult to overstate how much architecture hides inside that convenience.

The name depends on the content. Change the object and the name changes. A commit includes the identities of its tree and parents, so the naming relationship propagates through history. Change an old object and descendants that refer to it must also receive different identities.

This does not make Git history immutable. A developer can rewrite commits. Rebase does it deliberately. Filter tools do it at scale. A force push can move a branch name from one history to another.

What content addressing provides is a different property: if you already trust an object ID, different content should not be able to masquerade as that object without defeating the hash assumptions Git relies on.

SHA-1 was a reasonable engineering choice in 2005.

It did not remain a comfortable cryptographic choice forever.

Cryptographic hashes are designed to make several kinds of attacks impractical. One is finding two different inputs that produce the same digest: a collision. As cryptanalysis improves and computing gets cheaper, a hash function can move from theoretically vulnerable to economically attackable.

SHA-1 made that journey.

By the middle of the 2010s, the security community no longer treated collision resistance in SHA-1 as a prudent long-term foundation. On February 23, 2017, researchers from CWI and Google announced SHAttered, the first practical SHA-1 collision. They produced two PDF files with different visible contents and the same SHA-1 digest. The computation was still enormous by ordinary standards, but that was almost beside the point. A property users had been asked to treat as computationally out of reach had been demonstrated in the real world.

The demonstration was not a Git repository takeover.

That distinction matters because the scary headline and the actual engineering problem were not identical. Git does not hash an arbitrary file and call the digest a commit. Git hashes an encoded object that includes the object type and size along with the object's contents. A useful attack against a Git repository would have to respect Git's object format and the way objects point to one another. The SHAttered PDFs proved generic SHA-1 collision resistance had failed; they did not prove that an attacker could replace any chosen Git commit with malicious code at will.

Still, the result changed the burden of proof.

Before SHAttered, defenders could say that practical SHA-1 collision attacks remained beyond demonstrated capability. After it, anyone proposing to keep SHA-1 indefinitely had to explain why a failed primitive was still an acceptable dependency and which mitigations made the remaining risk tolerable.

Git and its surrounding infrastructure did not wait for the full hash migration to answer that question.

In March 2017, GitHub announced that all SHA-1 computations on GitHub.com would use collision detection and reject Git content showing evidence of a collision attack. The mechanism was based on work that recognizes the differential patterns used by known SHA-1 collision techniques. GitHub's response was a good example of mature infrastructure buying time without pretending that time was a permanent solution.

The distinction is worth dwelling on.

Replacing SHA-1 as Git's object-name format is an ecosystem migration. Deploying collision detection is an implementation hardening. The first changes the long-term namespace. The second makes a known class of attack harder to smuggle through systems that still use that namespace.

Those two efforts can coexist.

That is why the sentence “Git uses broken SHA-1” is simultaneously true in one narrow cryptographic sense and misleading as an operational description. Generic SHA-1 collision resistance is no longer a property anyone should build a new security design around. But modern Git deployments have not simply continued computing naive SHA-1 digests as though 2017 never happened. Collision-detecting implementations materially change the attack surface while migration proceeds.

Security maintenance often looks like this when a primitive is embedded too deeply to replace overnight. First, make exploitation of known weaknesses harder. Then build the compatibility machinery for a stronger design. Finally, change defaults when enough of the ecosystem can survive the change.

Git's difficulty was never finding the stronger hash.

SHA-256 existed.

The question was how to change a naming system after the names had escaped.

An object ID does not remain inside `.git/objects`. It appears in commit URLs. Continuous-integration databases record it. Code-review systems index by it. Build systems stamp it into artifacts. Package managers refer to repository revisions. Bug reports paste it. Deployment systems use it as a release identifier. APIs expose it. Developers put abbreviated IDs in chat messages, release notes, and comments.

A Git object name is an internal key that became public infrastructure.

Database engineers know this failure mode. A field begins life as an implementation detail. Other systems discover that it is convenient and stable. Integrations accumulate. Years later the organization learns that changing the field means changing every consumer that mistook convenience for contract.

Git's migration therefore has to preserve two things that pull against each other.

The project wants a stronger object format for new repositories.

The ecosystem wants old repositories and old identifiers to continue working.

A flag day would satisfy the first requirement beautifully and the second catastrophically.

Git's hash-transition design is correspondingly patient.

SHA-256 repositories use SHA-256 object names. Compatibility machinery is designed so repositories can maintain mappings between SHA-1 and SHA-256 identities and interoperate with repositories using the older format. The transition documentation describes conversion at boundaries rather than assuming the entire network changes at once.

This is not merely a cryptographic migration.

It is a namespace migration in a distributed ecosystem with no owner capable of upgrading every participant.

That makes it a particularly Git-shaped problem.

If Git had remained a centralized service, an operator might migrate the database, provide compatibility endpoints, and eventually retire the old scheme. Git instead lives in millions of repositories, innumerable tools, hosting platforms, embedded systems, build appliances, IDEs, libraries, scripts, and old machines that nobody has inventoried.

There is no maintenance window for Git.

The network is not even one network.

A repository on a laptop disconnected for five years is still a Git repository when the laptop turns on.

Backward compatibility therefore carries unusual weight. A change that is elegant in the current source tree can be destructive if it makes old history difficult to exchange or inspect.

This is why the transition has taken years without implying neglect.

Security engineering often rewards urgency. Compatibility engineering rewards sequencing. Git has to do both.

The project has already hardened its SHA-1 implementation against known collision techniques rather than waiting for the ecosystem migration to finish. Collision-detecting SHA-1 implementations make the practical risk different from simply saying “SHA-1 is broken.” That phrase is directionally useful and operationally sloppy.

A hash can be unsuitable as a long-term default while a particular system has meaningful mitigations against known attacks.

The distinction is the difference between planning a migration and declaring existing repositories fraudulent.

Git's own direction is clear enough. The project's BreakingChanges documentation tracks a future Git 3.0 boundary at which new repositories are planned to default to SHA-256. As of September 2026, the project has not announced a Git 3.0 release date.

That wording matters.

“Planned default” is not “current default.”

“Git 3.0” is not a date.

A roadmap item is not a shipped behavior merely because the implementation work is real.

Software writing becomes inaccurate very quickly when those categories blur.

The migration also exposes a subtle fact about content addressing: the hash is part of the format, not the idea.

Git's durable design bet is not SHA-1.

It is that objects can be named from their content and connected by those names.

SHA-1 was one implementation of that bet. SHA-256 can be another. A future function could replace SHA-256 if cryptography demands it. The graph concept survives if the system can migrate the names without losing the meaning of the graph.

That sounds reassuring until you consider what a hash migration does to a commit.

A commit object contains parent object IDs and a tree object ID. Change the object-ID scheme and the serialized representation changes. That means the digest changes even if the human-readable project state and commit message are conceptually the same. The same historical event can therefore have a SHA-1 name in one object format and a SHA-256 name in another.

Humans tend to treat a commit ID as the commit.

The migration forces a more precise statement.

The ID is a name for an encoded object under a particular hash format.

That precision is why compatibility mappings matter. Without them, every integration that persisted the old identity would lose its path to the corresponding new object.

The problem becomes especially awkward for signatures.

A signed tag or commit binds cryptographic material to a particular object representation. Change the representation and the old signature does not magically become a signature over the newly encoded object. Migration has to respect the fact that historical verification is itself part of the history.

This is a reminder that software supply-chain security cannot be reduced to “use stronger hashes.”

A stronger primitive helps only when the surrounding identity, key, verification, storage, and compatibility systems preserve what users believe is being authenticated.

The same caution applies to abbreviated object IDs.

Developers commonly use short prefixes because forty hexadecimal SHA-1 characters are cumbersome. A prefix is not a globally fixed identifier. Its adequacy depends on uniqueness among objects in a repository. As repositories grow, a prefix that was once unique may need more characters. SHA-256 lengthens the full identity further, increasing the incentive for interfaces to hide or abbreviate it.

The human experience of Git is therefore likely to become less hash-shaped even as the system underneath becomes more explicit about hash formats.

Hosting interfaces already encourage this. People click commit links. Tools show branch names, pull request numbers, release names, and deployment labels. The raw object ID remains fundamental for machines and forensic precision while becoming less prominent in ordinary navigation.

That is not a retreat from content addressing.

It is a recognition that cryptographic names are excellent machine identifiers and mediocre human language.

The SHA migration also reveals where Git ends.

Git can implement SHA-256 repositories. It cannot compel every forge, library, package manager, IDE, archival service, deployment system, and proprietary integration to understand them on the same day. Some tools assume forty-character hexadecimal object IDs in database columns or regular expressions. Some APIs call fields `sha` while quietly assuming SHA-1 length. Some systems validate commit identifiers with code written when a second object format was hypothetical.

Those assumptions are technical debt created by success.

A niche tool can change a format quickly because few people depend on it.

Infrastructure accumulates people who depend on its accidents.

This is one reason major version numbers matter even in projects that have historically evolved with remarkable compatibility. A Git 3.0 boundary creates a place to gather changes whose value justifies breaking assumptions. It tells downstream maintainers that old defaults cannot remain defaults forever.

But a major version number does not repeal the installed base.

Git 2.x repositories will exist after Git 3.0. Old appliances will exist. Archived source trees will exist. Air-gapped systems will exist. Corporate tools pinned to old libraries will exist. Migration will look less like a switch and more like sediment: new layers accumulating while old layers remain readable underneath.

That is normal for durable infrastructure.

Internet protocols carry old behaviors for decades. Filesystems recognize formats older than the engineers maintaining them. CPUs preserve instruction semantics long after compilers stop emitting those instructions. Databases support migrations from versions nobody would deploy fresh.

Longevity means learning to carry your younger self.

Git's younger self chose SHA-1.

The mature project has to replace it without pretending that twenty years of SHA-1-named history can be wished away.

There is a useful contrast with the large-file problem.

Git LFS can move a payload outside the ordinary object database while leaving a small pointer behind. The hash transition cannot externalize the old identity so easily because object IDs are the connective tissue of the graph itself. Trees name blobs and trees. Commits name trees and parents. Tags name objects. Refs ultimately lead to object names.

The hash is woven through the database.

Which raises the next question.

What database?

Most developers can use Git for years without thinking of it as one. They see commands, branches, commits, a staging area, and perhaps a mysterious `.git` directory best left alone.

Underneath is a storage engine that has been changing continuously while preserving an interface invented in an emergency.

To understand how Git can survive SHA-1, giant repositories, and whatever comes after, it helps to stop thinking about version control for a chapter and look at the database nobody notices.