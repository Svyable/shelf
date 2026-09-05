# The Reference Explosion

A branch feels like nothing.

That is its genius.

Create one and the repository does not duplicate its files. It does not make a second copy of history. It does not allocate a new database. In the simplest mental model, the branch is a name pointing at a commit.

Cheap names changed software development.

Then software development created too many names for the cheap implementation.

This is one of the most reliable laws of infrastructure: if you make something inexpensive enough to use casually, success will eventually expose the cost of using it casually at scale.

Email made messages cheap and produced inbox management.

Virtual machines made servers cheap and produced orchestration.

Cloud object stores made blobs cheap and produced lifecycle policy, indexing, and data governance.

Git made branches and references cheap and produced reference databases.

The original representation is charming because it is so legible.

A loose branch can be stored as a small file beneath `.git/refs/heads/`. Open the file and it contains an object name. A remote-tracking branch can live under another namespace. Tags have theirs. Logs record movement. The filesystem itself provides much of the organization.

This is exactly the kind of implementation people admire when learning a system from the inside.

No mysterious server.

No heavy database.

Names are files.

Directories are namespaces.

Text is inspectable.

For ordinary repositories, this works beautifully.

For extraordinary repositories, every simplicity develops an invoice.

Git's reftable documentation gives a concrete historical example: an Android repository with roughly 866,000 references. The old packed-reference representation could consume tens of megabytes, and operations that conceptually touched only a small number of refs could require reading or rewriting a large file. Loose refs create another shape of cost because each reference becomes a filesystem object, often with a corresponding reflog path and associated metadata overhead.

One file is trivial.

Hundreds of thousands of tiny files are a storage pattern.

The problem is not that the abstraction failed.

The problem is that the abstraction succeeded so thoroughly that its original physical representation became visible.

This distinction matters.

When people say a system does not scale, they often mean one of three very different things.

The first is semantic failure: the core model cannot represent the larger problem.

The second is algorithmic failure: the model works, but common operations become too expensive as data grows.

The third is physical failure: the logical operation remains cheap, but the chosen representation collides with properties of filesystems, storage media, networks, or operating systems.

Git's reference problem is mostly the second and third kind.

A ref pointing at an object is still a perfectly useful concept at 866,000 refs.

Storing and transacting those refs as individual files plus one increasingly large packed text file becomes the bottleneck.

That is a good scaling problem to have because it allows implementation replacement without conceptual replacement.

Reftable is that replacement.

The format is a binary reference database designed around the kinds of operations that huge ref namespaces actually need: efficient lookup, range scans, compact storage, atomic multi-ref updates, reflog integration, and compaction that does not repeatedly rewrite one giant table.

The important word is table.

Git's original references felt like the absence of a database.

At enough scale, they become one.

This is not a betrayal of the early design.

It is a recognition that the filesystem was functioning as a database all along.

The first implementation delegated indexing and naming to directories and files. That gave Git simplicity, portability, and transparency. Reftable takes back some of that responsibility because modern repositories need stronger guarantees and better asymptotics than the generic filesystem layout can provide.

The shift is especially interesting because ordinary users should not have to care.

A branch named `main` remains `main`.

A tag remains a tag.

`git show-ref`, `git branch`, `git fetch`, and the rest of the higher-level interface can operate over a reference backend rather than insisting that a reference must physically be represented as a specific file.

That indirection is what mature systems eventually learn to value.

The first implementation of an abstraction is often concrete enough that users mistake the representation for the contract.

Git spent years exposing `.git` internals so openly that tools understandably began depending on them. Some integrations read ref files directly. Some libraries reimplemented assumptions about `packed-refs`. Some administrators built scripts around repository layouts that were technically documented enough to appear stable.

Success turned physical representation into ecosystem interface.

This is why changing the default reference backend requires more than making reftable work in Git itself.

Other implementations have to understand it.

Forges have to host it.

Libraries have to inspect it.

Backup tools have to preserve it.

Repository-management software has to avoid assuming every branch is a tiny path under `refs/`.

Git 3.0's current plan makes ecosystem readiness a prerequisite for using reftable as the default in new repositories.

The lesson is larger than reftable.

If a storage format becomes popular enough, interoperability becomes part of the format's meaning.

Git is not one program anymore.

It is a family of independent implementations agreeing on enough objects, refs, protocols, and repository behavior to participate in the same world.

That is why a seemingly internal optimization can become a standards migration.

The scaling pressures behind reftable are also a preview of machine-authored software.

Human teams produce references at a rate shaped by human attention. A developer creates a branch for a feature, another for a fix, maybe several experiments. Forges add hidden refs for reviews, pull requests, merge queues, and automation. Large organizations accumulate release branches, environment refs, remote-tracking names, temporary integration branches, and bot-created updates.

Agents remove another unit of friction.

Imagine one repository serving a thousand autonomous coding tasks per day.

Each task may need an isolated starting point.

Each agent may produce several candidate solutions.

Each candidate may need a ref while tests run.

A reviewer agent may create a corrected descendant.

A merge queue may synthesize temporary integration refs to test combinations.

A deployment system may retain refs for promoted states.

A provenance system may attach hidden names to signed attestations or checkpoints.

A human team might view only a few dozen of those names.

The repository may hold hundreds of thousands.

The historical branch list and the operational ref namespace begin to diverge.

This is already true on major forges, where users interact with a curated view while servers maintain many references the normal branch screen does not show. Agentic workflows amplify the pattern. The ref namespace becomes an internal coordination fabric.

That creates a new design question.

Should every temporary machine state be a ref?

Not necessarily.

Cheap abstractions invite overuse. A ref is useful when a state needs a stable name, reachability, protection from garbage collection, synchronization, or participation in an integration workflow. A speculative intermediate state that exists for seconds may be better represented elsewhere.

The danger is repeating the classic cloud mistake of using the cheapest primitive for everything because it is cheap individually.

A million almost-free things can become an expensive subsystem.

Version-control orchestration will therefore need lifecycle policy.

Which refs are durable?

Which are temporary?

Which are visible to humans?

Which can expire automatically?

Which represent authority?

Which exist only to pin objects long enough for a task?

Which should be replicated to every clone, and which should remain server-side implementation detail?

Git's namespace already contains clues.

Branches intended for collaboration live under one set of names. Tags under another. Remotes, notes, stash, bisect state, worktrees, replace refs, and forge-specific namespaces occupy different regions. The name prefix carries policy by convention.

The future likely adds more distinctions rather than fewer.

Human-facing refs may remain small and meaningful.

Machine-facing refs may become high-volume and aggressively managed.

The reference database then becomes something like an index of active possibilities.

This is where the word branch starts to mislead.

A branch evokes a visible limb of development.

A reference can be much more transient. It may simply say: keep this commit reachable until job 4819 finishes.

That use becomes important because reachability is one of Git's forms of memory management.

Objects do not live forever merely because they were once created. Git identifies objects by content, but retention depends heavily on whether the objects remain reachable from roots the repository cares about, including references and reflogs. Unreachable objects can eventually be pruned.

A ref therefore does two jobs.

It gives a state a name.

It helps keep the state alive.

In agent-heavy repositories, retention policy can become a real operational concern. An agent may create thousands of intermediate commits while searching for a solution. Keeping all of them forever preserves perfect forensic history and creates storage pressure. Deleting all of them immediately makes debugging and accountability harder.

The right answer is probably tiered memory.

Final accepted history remains durable.

Rejected proposals remain available for some period.

Intermediate checkpoints can expire sooner unless attached to an incident, review, or audit need.

The ref and reflog machinery provides part of the substrate for such policies, but the higher-level decision belongs to orchestration systems.

Again Git does not need to know why an object matters.

It needs mechanisms that let another system express that it matters for now.

Reftable also matters because it improves transactional behavior.

Updating one ref can be simple.

Updating several refs as one logical action is harder.

Suppose a server accepts a push that moves multiple branches and tags. Readers should not ideally observe a half-finished state in which some names have moved and others have not. The traditional files backend has constraints here because the physical files are separate. Reftable was designed to support stronger atomic update behavior.

That may sound like an edge case until the repository becomes a coordination system for machines.

Automation loves multi-step state transitions.

Promote this candidate.

Advance that environment ref.

Record this release tag.

Remove the temporary queue ref.

Update the tested-base ref.

A human may never see those mechanics, but correctness increasingly depends on several names changing together.

Version control starts resembling a transactional database because coordination is transactional.

This does not mean Git should become PostgreSQL.

It means the old contrast between “simple files” and “database complexity” was always temporary.

A system that coordinates enough concurrent work eventually needs database properties somewhere.

The best place to add them is beneath an abstraction users already understand.

This is why reftable is more philosophically interesting than its obscurity suggests.

The project is replacing a beloved implementation detail while preserving the social primitive built on top of it.

Branches do not become expensive because the storage engine becomes more sophisticated.

They become more reliably cheap at a larger scale.

That is the correct direction of abstraction.

Hide complexity beneath a stable operation rather than forcing every user to become an administrator of the new complexity.

Git has followed this path in its object database too.

Users talk about commits and blobs.

The repository may contain loose objects, packfiles, indexes, multi-pack indexes, bitmaps, commit-graphs, cruft packs, and maintenance schedules beneath that language. The high-level object remains stable while the storage engine grows machinery around it.

References are catching up.

There is a temptation to look at machinery like reftable and conclude that Git is becoming bloated.

That judgment confuses visible implementation complexity with user-facing conceptual complexity.

A mature system may need substantially more internals to keep the external contract simple.

The alternative is to export the scaling problem to users.

Tell them not to create too many branches.

Tell forges to invent private databases that translate back into refs at the boundary.

Tell large repositories to abandon normal Git operations.

Tell automation to serialize workflows that should be concurrent.

Those approaches can work for a while. They also fragment the ecosystem.

Improving the underlying reference backend lets more of the world remain inside the common model.

This is the invisible bargain of infrastructure evolution.

Complexity is not eliminated.

It is relocated.

Good infrastructure relocates it downward, into shared machinery maintained once rather than workarounds reinvented by every large user.

The reference explosion therefore tells us something about Git's likely future under agentic software development.

The graph is not the scaling bottleneck first.

Names, indexes, synchronization, verification, and attention are.

Git can hold a great many commits.

The harder problems are deciding which commits should remain reachable, which refs should be replicated, which states should be shown, which candidates deserve integration, and which histories are merely temporary evidence of search.

A version-control system designed around human-visible branches may evolve toward a much larger hidden namespace serving schedulers and agents while preserving a small intentional surface for humans.

That would not make branches less important.

It would make their scarcity meaningful again.

A human-facing branch could become a promoted object: one of the few names important enough to survive the ocean of machine-generated possibilities.

The implementation underneath must be able to handle the ocean without drowning the user in it.

Reftable solves only the storage portion of that problem.

The next pressure attacks an even older promise.

Git's original distributed model assumed that a useful participant could possess the repository's history.

Large repositories already weakened that assumption.

Future clients weaken it further.

A machine performing one narrow task does not necessarily need twenty years of blobs before it can change six files.

Once Git can operate on objects it has been promised but does not yet possess, the word repository starts to mean something different.
