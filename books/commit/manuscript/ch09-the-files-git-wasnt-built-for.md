# The Files Git Wasn't Built For

Git is happiest when a file is small enough to copy without thinking about it.

That sentence sounds almost quaint now. Source code is unusually friendly material for a version-control system: mostly text, often kilobytes rather than gigabytes, compressible, diffable, and valuable precisely because small changes matter. Git's object model grew up around that world. A blob is content. A tree gives that content a name and a place. A commit points at the tree. The system does not need to understand whether the blob contains C, a shell script, a license, or a recipe. Bytes are enough.

Then software repositories began swallowing things that did not behave like source code.

A designer commits a layered image. A game team checks in textures and audio. A machine-learning project needs checkpoints whose size is measured in gigabytes. A data-science repository accumulates notebooks with embedded output. A mobile application includes videos. A build process produces archives that are reproducible in principle and expensive in practice. A scientific project wants the code and the data that made the figure to travel together.

Git will accept many of these things. That is not the same as saying Git was designed around them.

The distinction matters because Git's great strength—history that a participant can possess—turns into a cost when every historical version of a large payload becomes part of that possession. Replace a 500-megabyte binary ten times and the useful current working tree may contain one copy while repository history must account for the old objects too. Compression can help when content is similar and compressible. It cannot make the basic economics disappear.

Text has another advantage: it yields a useful patch.

Change three lines in a source file and Git can present those lines in context. A reviewer can often understand the proposal without opening the whole file. A merge algorithm can reconcile independent edits when they touch different regions. `git blame` can trace lines through history. Search can inspect the content cheaply.

Change a compressed video or a model checkpoint and a line-oriented diff has almost nothing intelligent to say.

The file changed.

That may be the only useful conclusion available at Git's layer.

This is not a failure of hashing. Git can identify the new bytes perfectly well. It is a failure of representation. Identity and meaning are different jobs.

The ecosystem's most durable response has been to separate the coordination object from the heavy object.

Git Large File Storage makes the pattern explicit. GitHub announced Git LFS in April 2015 as an open-source extension for a problem distributed version control had never handled comfortably: large binary assets whose history was expensive to clone and whose contents produced little useful textual review. The announcement described the design in deliberately simple terms. Keep a small text pointer in Git. Store the large file elsewhere.

That choice is more important than the brand name.

Git LFS did not try to teach Git that a video was really a special kind of blob, or that model weights deserved a new built-in object type. It treated the ordinary Git repository as the coordination layer and moved bulk storage behind a separate protocol and service. The commit could still say, in effect, “this version of the tree refers to this exact payload,” without forcing every clone to carry the payload as an ordinary Git object.

The design also preserved something subtle: the pointer itself is boring text.

That means it participates in the parts of Git that already work well. A branch can move it. A commit can record it. A merge can treat it as a file. A code review can show that one external object identity replaced another. The heavy bytes travel through a different path, but the decision about which bytes belong to a version remains represented inside ordinary Git history.

This is a recurring architecture in mature systems. The coordination record stays small and durable. The expensive material is fetched, cached, retained, or deleted under rules suited to its scale.

Instead of storing the large payload as an ordinary Git blob, the repository stores a small text pointer. The pointer identifies the external object, records its size, and uses a SHA-256 object identifier. A client that understands Git LFS uses that pointer to retrieve the payload from LFS storage. A client that does not has, quite literally, the pointer rather than the thing.

That sounds like an implementation trick. It is also a statement about what Git is best at.

Keep the small, branchable, mergeable coordination record in Git. Put the expensive payload behind another retrieval mechanism.

The pointer can move through branches and commits. It can be reviewed as text. Its history is ordinary Git history. The large object can be stored, transferred, billed, cached, and retained under rules designed for large objects rather than pretending every artifact has the economics of source code.

There is a price for the split.

A plain Git clone no longer necessarily gives you everything needed to reconstruct the working state. The repository can contain a perfectly valid commit whose LFS pointer names an object you cannot retrieve because the LFS service is unavailable, access has expired, storage was misconfigured, or the object was deleted. Git's ordinary object graph may be complete while the project, in the practical sense, is not.

This is an important erosion of the romantic version of distributed possession.

A clone can still hold the complete Git history and remain dependent on another service for some of the history's payloads.

The trade is often rational. A studio with terabytes of art assets does not become more autonomous merely by forcing every developer to download every historical texture. A research group does not gain meaningful resilience by making a hundred-gigabyte dataset part of every ordinary clone. Possession is useful only when the cost of possessing is tolerable.

The same split appears without Git LFS.

Package registries hold built artifacts. Container registries hold images. Object stores hold datasets. Release systems attach binaries to tags. Build caches retain expensive intermediate results. Model hubs hold weights. Data catalogs record datasets whose bytes live in cloud storage. In each case Git may retain the small description of what belongs together while another system carries the mass.

The repository becomes an index into a larger material world.

This complicates reproducibility.

Suppose a commit says that version 4.2 of a model was trained using a particular configuration and dataset. The code is present. The configuration is present. The dataset URL is present. The model identifier is present.

Can the result be reproduced?

Only if those references still resolve to the same things.

A URL is not an identity. A filename is not an identity. A registry tag may be mutable. An object-store path may be overwritten. A database query can return different rows tomorrow. Git's content-addressing discipline solves this problem inside Git because object identity follows content. Once payloads leave the object database, projects have to recreate that discipline elsewhere if they want the same guarantee.

That is why hashes keep reappearing at the boundary.

Git LFS pointers identify content rather than merely naming a storage path. Container systems use digests. Reproducible-build systems record checksums. Lockfiles pin package versions and, increasingly, integrity values. Data pipelines record fingerprints. The systems differ, but the recurring idea is familiar: location tells you where to ask; content identity tells you what answer you expected.

Git taught developers to become suspicious of names that could silently point somewhere else.

Large-file systems extend that suspicion beyond Git.

Notebooks create a different problem because they are neither ordinary source files nor merely heavy binaries.

A Jupyter notebook is structured JSON containing code cells, metadata, prose, and potentially large rendered outputs. Git can store it as text. A normal textual diff can also be miserable to read. Re-executing a cell may change output metadata or reorder information without changing the idea a reviewer cares about. A plot can change while the patch displays encoded or verbose structure. Two people can edit independent cells and still create conflicts in the serialized representation.

Specialized notebook diff tools therefore sit above Git and interpret the format.

Again the pattern is not replacement.

Git keeps the versions. Another layer explains what the versions mean.

Generated files produce yet another boundary question.

If a generated artifact can be recreated cheaply and deterministically from tracked source, storing it in history may add noise. Every source change can create a large secondary diff. Reviewers see machine output beside human intent. Merge conflicts occur in a file nobody should edit by hand.

But generated files are not automatically disposable.

Sometimes generation requires a compiler, service, dataset, or environment that will not exist forever. Sometimes the generated output is itself what users consume. Sometimes checking it in makes a repository buildable without a fragile toolchain. Sometimes a generated lockfile is the mechanism that makes dependency resolution repeatable.

The useful question is not whether a file was generated.

It is what guarantee the repository is supposed to provide.

If the guarantee is that a checkout contains the exact website shipped to users, generated output may belong in the versioned state. If the guarantee is that the source of truth is reviewable and the build is reproducible, generated output may belong in a release artifact instead. If generation is nondeterministic, the team has a deeper problem than repository size.

Large model weights make the boundary especially visible.

Modern machine-learning systems can produce artifacts far larger than the source code that created them. A training repository might contain a few megabytes of Python and configuration while the resulting checkpoint occupies tens or hundreds of gigabytes. Treating the checkpoint as an ordinary Git blob would make the version-control mechanism dominate the project for no useful reason.

Yet model weights are versions in every meaningful operational sense.

Teams need to know which model was evaluated, which was deployed, which dataset and code produced it, and whether two supposedly identical releases are actually the same bytes. The answer is not to pretend the weights are not versioned. It is to version their identity and lineage in a system suited to their scale.

This distinction—versioning an object versus storing the object inside Git—is easy to lose because source control fused the two for so long.

For source code, the bytes are small enough that identity, storage, transfer, history, and review can all live inside one tool. Large artifacts force those concerns apart.

Once they separate, policy becomes visible.

How long should old payloads be retained? Who pays for them? Can a branch reference an object that a new contributor is not authorized to download? What happens when a repository is made public but its external artifact store is not? Does deleting a branch permit deleting the payload, or does a release still depend on it? Can an air-gapped build obtain the objects? Does a backup include only `.git`, or the LFS and artifact stores as well?

A repository administrator who answers only the Git questions has not backed up the project.

The external object systems also weaken one of Git's most useful social properties: a patch can often carry the proposal.

Email-based Git development works because a textual patch can be reviewed, discussed, applied, and archived without requiring access to the sender's repository. A patch that changes an LFS pointer proves that a different large object is proposed. It does not let the reviewer inspect the object unless the reviewer can fetch it through the associated storage system.

That changes the trust boundary.

A source patch can be self-describing enough for substantial review. A pointer patch delegates part of review to an object service and often to specialized tooling capable of rendering the payload.

For some artifacts, there is no better alternative. Nobody wants a 4-gigabyte video embedded in an email patch. The point is simply that the architecture has changed.

Git remains the graph of agreement while no longer being the warehouse of everything agreed upon.

That phrase should not be pushed too far. Git itself is already a database of objects, and many repositories work perfectly well with large-ish binary files. There is no universal size at which a blob becomes morally wrong. Network speed, clone frequency, file churn, retention needs, hosting limits, compression, team size, and tooling all affect the trade.

A 200-megabyte static reference file changed once may be less troublesome than a 20-megabyte binary rewritten hundreds of times.

Churn can matter more than size.

Reviewability can matter more than either.

The deeper lesson is architectural. Git's object model is remarkably general, but its successful ecosystem has never required every kind of project data to become an ordinary Git object. When payloads strain the model, developers tend to preserve the graph and move the mass.

That same instinct will appear in the next pressure point, but with a more unsettling constraint.

Large files can be moved elsewhere without changing the identity system of the objects that remain.

SHA-1 cannot.

Git's original object names escaped the object database years ago. They are printed in logs, pasted into bug reports, stored in APIs, embedded in build metadata, used by forges, written into package systems, and memorized in shortened form by humans who say things like “the fix is in a1b2c3d.”

Changing the hash is not a matter of choosing a stronger function and recompiling Git.

It means changing the names of history.
