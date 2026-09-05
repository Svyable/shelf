# A Branch Is Just a Name

A Git branch can fit in a line of text.

That fact is so ordinary now that it has lost its power to surprise.

Inside the classic representation, a branch is a reference whose value names a commit. Move the reference and the branch moves. Create another reference pointing at the same commit and you have another branch without copying the files, duplicating the history, or asking a central server to allocate a new development line.

The branch is not a second project.

It is a name for a place in the graph.

This is one of those implementation details that changed human behavior because it changed the price of an action.

Version-control systems before Git had branches. Some handled them well. Some organizations used them heavily. Git did not invent the idea that development could diverge and later reunite. What Git did was make branching structurally cheap enough that a branch could stop feeling like a formal event.

A developer could create one to test an idea.

A maintainer could create one to collect a topic.

A release manager could create one to stabilize a version.

A company could create one for an emergency fix.

A contributor could create ten in an afternoon and delete nine before dinner.

The cost did not disappear. It moved.

Creating the branch became cheap.

Reconciling branches remained work.

That distinction is the beginning of modern Git culture.

Consider what a branch actually contains. The branch itself does not contain the commits in the way a folder contains documents. It points at one commit. That commit points at its parent, which points at another parent, and so on. The reachable history gives the branch its ancestry.

If two branch references point at the same commit, they have the same tip and therefore the same reachable history from that point. If one branch advances, Git creates a new commit whose parent is the old tip and moves that branch reference to the new commit. The other reference stays where it was.

Divergence needs no special declaration.

Two names simply stop pointing into the graph at the same place.

This is much cleaner than the ordinary physical metaphor of branching suggests. We imagine a tree trunk splitting into limbs, each limb carrying its own material. Git's graph is more economical. The shared ancestry is literally shared. The branches do not each own private copies of every old commit. They refer into one object graph.

The cheapness follows from that sharing.

A new branch usually requires almost no new historical content. It is a new reference to an existing commit. The expensive data already exists.

Cheap technical operations have a habit of becoming organizational defaults.

Before email, sending one additional copy of a memo required paper, a machine, an envelope, a courier, or at least somebody walking down a hall. After email, the marginal recipient became almost free. Organizations responded by copying more people. The cost of transmission fell; the cost of attention rose.

Git branches have a similar shape.

Once creating a branch becomes trivial, teams create more branches. More branches make parallel work easier, which can increase throughput. They also create more points at which histories may need to be reviewed, tested, compared, merged, rebased, abandoned, or cleaned up.

The branch is cheap.

The consequences are not.

This is why arguments about branching strategies often sound as though people are arguing about Git when they are actually arguing about organizations.

Should every feature have its own branch?

Should developers merge to the main line several times a day?

Should releases have long-lived branches?

Should hotfixes branch from production tags?

Should contributors rebase before review?

Should a pull request contain one commit or twenty?

Should a branch be protected from direct pushes?

Git can represent all of these choices. It does not decide which social cost a team should prefer.

That flexibility made it portable across cultures.

The Linux kernel's integration model could use topic branches and maintainer trees. A small startup could keep one shared main branch and merge tiny changes constantly. An enterprise could build layers of protected release branches, environment branches, and policy gates. An open-source project could accept contributions from forks. A single developer could create temporary branches that never leave a laptop.

The underlying primitive barely changes.

A reference points at a commit.

The policies around that reference can become elaborate enough to fill a handbook.

Git's own `HEAD` reference makes the idea more concrete. In ordinary use, `HEAD` identifies where the working context is anchored. Often it is a symbolic reference to the current branch. Make a commit, and the current branch advances. Check out or switch to another branch, and the working tree and index are rearranged to match the target while `HEAD` follows the new branch.

There are exceptions and subtleties, including detached `HEAD` states, but the basic machinery reveals something important: a branch is not a container into which commits are placed.

Commits exist in the graph.

Refs give people handles for navigating and extending that graph.

This helps explain why deleting a branch is less dramatic than the word “delete” sounds.

Deleting a branch deletes a reference. It does not immediately shred every commit that reference could reach. If those commits remain reachable from another branch, tag, remote-tracking reference, reflog, or other root Git considers relevant, they remain part of the repository. Even unreachable objects may remain for a period before garbage collection makes them disappear.

Git therefore separates names from objects almost everywhere.

Paths name content within trees.

Refs name commits.

Tags name objects more deliberately.

Object IDs name the objects themselves.

The indirection is what allows names to move while history remains precise.

A branch name can mean one commit this morning and another tonight. The commit IDs do not change when the branch moves.

This is why a branch name is convenient for humans while a commit ID is useful for machines and for exact historical claims.

“Deploy `main`” means deploy whatever `main` means under the relevant policy at the moment the deployment system resolves it.

“Deploy commit `abc...`” means something narrower.

The tension between those two modes runs through modern software delivery. Humans like moving names because they encode intention: stable, release, production, next, main. Machines like exact identifiers because reproducibility depends on knowing which state was actually used.

Git gives both layers room to exist.

The branch became culturally important because its low cost changed how developers approached risk.

A risky idea is easier to try when the trial does not contaminate the line of work you currently trust.

This sounds psychological, but it has a concrete technical basis. You can create a branch, change files, commit several times, discover that the idea was bad, and return to the earlier branch. The failed history can remain available for inspection or be discarded as a reference. The main line did not need to absorb the experiment just because the experiment occurred.

Software development is full of changes whose value cannot be known before they exist.

A performance optimization may make code faster and less understandable.

A refactor may simplify one subsystem and expose assumptions somewhere else.

A dependency upgrade may remove vulnerabilities and introduce compatibility failures.

A new interface may feel elegant until real call sites reveal what the design forgot.

Cheap branches give uncertainty somewhere to live.

That was especially useful in distributed work because different people could maintain different uncertain futures at the same time.

One developer could base a branch on a stable commit and work for a week. Another could begin from the same point and take the code in a different direction. Neither had to reserve a global revision range or keep the other from committing. Their local histories could exist independently.

When those histories eventually met, Git had to answer a harder question.

What should the combined history be?

This is where branching stops being cheap.

The simplest case is a fast-forward. Suppose one branch has not changed while another has advanced through several commits. There is no true divergence. The older branch can move its reference forward to the newer commit. No merge commit is required because the graph already contains a single line of ancestry.

The interesting case is divergence.

Both sides changed after their common ancestor.

Git can compare the histories, identify a merge base, and attempt to construct a result that incorporates changes from both sides. If the changes do not collide in ways the merge machinery considers ambiguous, the merge can feel almost free. If they do, somebody has to decide what the combined program should mean.

That somebody may be a human, a tool, or increasingly a machine-assisted workflow.

But the semantic responsibility does not vanish because Git can mark conflict regions.

A conflict is not merely two people editing the same line.

Two branches can merge cleanly and still produce a broken program.

One branch may change a function's assumptions while another changes its callers without touching overlapping text. A configuration change may interact with a dependency upgrade. A database migration may be individually valid on both sides and collectively impossible. Two independently sensible optimizations may contend for the same resource at runtime.

Git's textual merge machinery is powerful because source code is text and many independent edits can be reconciled structurally. It is not a proof system for program meaning.

This is another place where Git's stupidity is useful.

It does not pretend to understand more than it does.

The merge records a new graph relationship. Tests, review, static analysis, runtime checks, and human judgment sit around it.

A merge commit makes the reconciliation visible in history by recording multiple parents. The resulting commit says, in effect, that these previously divergent ancestries have been brought into one declared state.

That is an unusually expressive object for something so small.

The commit does not merely contain the merged files. Its parent list records the fact of convergence.

This matters because non-linear history survives the merge.

The two branches do not have to be flattened into one fictional sequence of events. The graph can retain the fact that work happened in parallel.

There has always been tension over how much of that topology developers should preserve.

Rebase offers another answer. Instead of merging one branch into another with an explicit multi-parent commit, a developer can replay or reconstruct commits on top of a different base. The resulting history can become linear and easier to read. The price is that the rebased commits are new objects because their parent relationships changed, even if their patches look similar.

Neither shape is universally superior.

A merge can preserve the real topology of collaboration and make integration events explicit.

A rebase can produce a cleaner sequence that is easier to review or bisect.

A squash can compress many exploratory commits into one public unit.

A project can mix all three.

Again Git supplies graph operations and lets policy accumulate above them.

This freedom created a great deal of avoidable theology.

Developers can become surprisingly moral about history shapes.

One camp treats a linear log as evidence of discipline. Another treats merge commits as honest records of collaboration. One team believes every intermediate commit should compile and pass tests. Another cares only about the reviewed patch at the boundary. One project rewrites private history freely and treats published history as stable. Another lets contributors force-push review branches repeatedly until the final series is polished.

These are governance choices disguised as command preferences.

The object model can support them all.

The most important economic change is not which workflow won.

It is that experimentation ceased to require reserving scarce branch machinery.

Git made branches cheap enough to become disposable.

That seems like an unqualified improvement until a system can create them faster than people can judge them.

The first version of that problem arrived with human teams.

A company adopts feature branches. The branches stay open longer because everyone feels safe working independently. Main continues to move. The feature branch accumulates assumptions about an older world. Eventually the team tries to integrate it and discovers that branch creation was the easy part.

Another company creates a branch for every ticket and a pull request for every branch. The visible queue grows from ten changes to fifty to hundreds. Nothing is technically wrong with Git. The graph can hold the work without strain. The organization cannot review it at the same rate it produces it.

A third company runs full continuous-integration suites on every pushed branch. Compute becomes the hidden price of cheap parallelism. The branch pointer costs almost nothing; the tests it triggers may consume hours of machines.

Cheap branches externalize costs into adjacent systems.

That pattern will matter when agents enter the story.

A human developer usually creates branches with some internal friction. They have only so much attention. They can work on only so many deeply understood ideas at once. Even if Git lets them create ten thousand branches, they probably will not.

A machine does not share that particular constraint.

An agent can create a branch for one hypothesis, run tests, create another branch for a competing implementation, compare results, retain both, spawn descendants, and do it again. A coordinator can assign the same issue to several agents and ask them to produce independent solutions. Another agent can review the proposals. A merge queue can test the combinations.

Git's storage model is comfortable with this longer than the humans are.

The graph can absorb cheap alternatives.

The scarce resource becomes deciding which alternative deserves a moving name like `main`.

This is why the branch primitive may become more important in an agentic software world even if developers interact with it less directly.

The agent does not need to “feel” that a branch is a safe place to experiment. The orchestration system can use branches mechanically as isolation boundaries. Each task receives a starting commit and a ref namespace. Each proposal produces named commits. Failed paths can remain reachable long enough for debugging and then expire. Successful paths can enter review or integration.

The branch becomes a scheduling primitive.

There are already hints of this in ordinary automation. CI systems create synthetic merge refs. Hosting platforms maintain hidden references for pull requests. Merge queues construct candidate histories that do not correspond exactly to any developer's local branch. Bots update dependency branches. Release automation advances tags and refs according to policy.

The human-facing list of branches is only one view of a much larger reference space.

This is where Git's original simplicity begins to encounter modern scale.

A few refs stored as individual files are trivial. Hundreds of thousands of refs, reflogs, temporary proposals, remote-tracking branches, and automated integration states create different storage and lookup problems. The concept “a ref names an object” remains elegant while the implementation needed to manage a giant namespace becomes more sophisticated.

Reftable exists in part because names that were cheap at small scale can become expensive in aggregate.

This is a recurring theme in Git's evolution.

The abstraction survives.

The storage beneath it changes.

Cheap branching also helped create the conditions for GitHub's rise because a distributed repository full of branches and forks needed a better social interface than the command line alone could provide for a mass audience.

A raw branch is technically sufficient to propose a line of development.

It is socially incomplete.

Who created it?

Why?

What issue does it address?

Which commits changed since review began?

Who has looked at it?

Did the tests pass?

Is it allowed to merge?

Does it conflict with policy?

Has security scanning run?

Has the person with authority approved it?

None of these questions requires changing what a branch is.

They require attaching institutional meaning to the branch.

The pull request would become one of the dominant ways to do that. It would take a relationship between two lines of Git history and wrap it in conversation, identity, automation, and permissions.

That came later.

First the graph had to travel.

The most important thing about a cheap branch was not that it let one developer maintain several futures on one machine.

It was that those futures could be copied to other machines without becoming subordinate to one central repository model.

A branch is just a name.

A remote makes the name portable.

Once the network learned how to move the graph efficiently, Git stopped being merely a clever local database and became a coordination system with no required center.
