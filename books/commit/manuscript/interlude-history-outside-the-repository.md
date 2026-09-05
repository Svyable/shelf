# Interlude — The History Outside the Repository

A perfect clone can still forget most of what happened.

That sounds wrong at first because Git’s most powerful promise is possession. Clone a repository and you receive the reachable object graph. The commits arrive with their trees and parents. Tags and ordinary refs can be copied. The history is not merely a set of current files on somebody else’s server. It can exist on your machine, continue without the original host, and be compared object for object years later.

Then somebody asks a question the commits do not answer.

Why was this design chosen?

Which alternative was rejected?

Who objected?

Which test failed before the final patch passed?

Was a change controversial because of security, performance, licensing, compatibility, or politics?

Did a maintainer approve the last version of the patch or an earlier one?

Was a bug introduced by code nobody reviewed, by code everybody reviewed, or by a resolution made after the review ended?

A clone may contain none of that.

The repository has one history. The project has another.

Modern software development tends to blur them because the two histories are displayed together. Open a pull request on a forge and the interface may show the commits, the diff, the discussion, the status checks, the linked issue, the review decisions, the deployment preview, the merge event, and the final branch state on one page. The experience feels unified.

The storage is not.

Git owns the exact states and ancestry. The forge owns most of the negotiation around those states.

That distinction is easy to treat as an implementation detail until a project moves.

GitHub’s own migration tooling makes the separation unusually visible. A plain Git migration can move source and version-control history. GitHub Enterprise Importer, by contrast, has explicit machinery for moving pull requests, issues, milestones, wikis, commit comments, repository settings, branch protections, and other platform metadata. The list is revealing because each item names something a normal clone does not carry.

The existence of specialized migration tooling is evidence about the size of the real repository.

The practical project is larger than `.git`.

This was already true before web forges.

Mailing-list projects often kept their decision history in archives separate from the repository. A patch could exist in a mailbox, be debated over several revisions, and eventually enter the maintained tree in a form that preserved little of the argument. Bug trackers lived on different systems. Release engineering lived elsewhere. IRC logs disappeared or survived under inconsistent retention policies. Maintainer knowledge lived in people.

The distributed repository solved a particular preservation problem brilliantly: the accepted states could be copied cheaply and exactly.

It did not solve institutional memory.

The distinction matters more as software ages.

Imagine a cryptographic library that has been maintained for thirty years. A future engineer finds a strange-looking branch in a parser and considers simplifying it. `git blame` identifies the commit that introduced the code. The commit message says it handles an edge case. The tests still pass if the branch is removed.

Was the edge case once exploitable?

Was it a workaround for a compiler bug that no longer exists?

Was the behavior required by a customer protocol?

Was it deliberately redundant because two maintainers did not trust one validation path?

The object graph can narrow the search. It cannot manufacture context that was never recorded in it.

The best projects therefore develop archaeology around Git.

Search the issue number in the commit message.

Find the pull request.

Read the mailing-list thread.

Look at the release notes.

Search an incident report.

Find the test that arrived at the same time.

Ask whether the reviewer who understood the subsystem is still around.

The process is awkward because the causal chain crosses systems.

Git’s narrowness is partly responsible for the awkwardness and partly responsible for the fact that the oldest layer remains intact.

A commit created in 2008 can still be interpreted because the object model did not depend on the issue tracker of the month. A review tool can disappear while the tree survives. A hosting company can be acquired while a clone remains a clone. A project can migrate from one forge to another without translating every commit into a new repository format.

Narrow formats age well.

Rich context ages poorly when its storage is proprietary, centralized, or tied to a product interface.

The answer is not obvious.

One instinct is to put more context into commits.

Write better messages. Include issue identifiers. Record trailers for reviewers and co-authors. Explain surprising tradeoffs. Preserve enough reasoning that a future reader does not need the original conversation for every non-obvious line.

This is good practice.

It has limits.

A commit message is frozen with the commit. Review can continue after the commit is created. An issue can accumulate new understanding years later. A security finding may need access controls that the public commit does not. A CI run can produce megabytes of logs. A design discussion can involve abandoned approaches that would make a commit message unreadable.

The commit should not become a landfill for everything anyone might someday want.

Git itself contains an intriguing middle layer: notes.

`git notes` can attach additional information to an object without changing the object. The note lives in a separate notes ref. The original commit keeps its identity. The supplemental information can have its own history.

The mechanism is elegant because it recognizes the distinction this interlude is about.

The state and the annotation are different objects.

The annotation can change without rewriting the state.

Notes never became the universal social memory of software. They require explicit transport and conventions. Forges built richer databases. Teams preferred issue trackers, review threads, and CI systems tailored to their needs. Still, notes show that Git’s architecture can host commentary without pretending commentary belongs inside the commit.

The future is likely to need a more powerful version of that pattern.

Agent-produced software increases the number of facts that may matter later.

A task began from one commit.

An agent was authorized by one person or service.

It had a particular permission set.

It inspected some files and not others.

It ran some tests and skipped others.

It made several attempts.

A reviewer asked for a change.

The agent regenerated part of the patch.

A merge queue tested a synthetic combination.

A release pipeline built an artifact from the accepted state.

If all of this becomes a single generated paragraph in the pull request description, the prose will look informative and still be a weak audit record.

If all of it is discarded after merge, the future repository will look cleaner than the process that produced it.

The better approach is to distinguish durable coordinates from durable claims.

The commit remains a coordinate.

This exact tree. These parents. This metadata.

Other records can point to the coordinate.

This task authorized work against commit X.

This review approved revision Y.

This check evaluated tree Z.

This build used commit Q and produced artifact R.

This attestation binds a workflow identity to the artifact.

This deployment put that artifact in environment E.

The result is not one history.

It is a graph of histories connected by stable identifiers.

That sounds more complicated than a repository because modern software production is more complicated than a repository.

The important question is which edges remain usable when systems disappear.

A URL is a weak edge.

A URL can rot.

An issue number without a host is ambiguous.

A pull request number is local to a repository namespace.

A human name can change.

An account can be deleted.

A branch can move.

A commit ID is stronger because a copy of the repository can resolve it without asking the original forge, provided the object still exists.

An artifact digest can play a similar role outside the repository.

The more long-lived the record needs to be, the more valuable content identity becomes.

This suggests a preservation rule.

Use social identifiers for navigation.

Use content identifiers for evidence.

The two solve different problems.

A reviewer wants a readable link.

An investigator wants to know exactly which bytes were evaluated.

A maintainer wants an issue title.

An archivist wants the object graph.

A release manager wants a version name.

A verifier wants a digest.

Good systems carry both.

The separation becomes especially important during migration.

A project that mirrors its Git repository every hour has strong source-history redundancy. If the forge disappears, the code is likely to survive.

The issues may not.

The pull-request discussions may not.

The review decisions may not.

The CI logs may not.

The branch-protection configuration may not.

The release attachments may not.

The package registry may not.

The deploy history may not.

The project can possess its code and rent its memory.

That is a strange architecture.

It is also common.

The risk is not merely catastrophic shutdown. More ordinary changes are enough. A company changes retention policy. An organization migrates accounts. An old CI provider is replaced. A free plan stops storing logs after ninety days. A bot account is deleted. An external issue tracker is consolidated. Links remain in commit messages but the targets become inaccessible.

History decays asymmetrically.

The commits keep their parents.

The explanations evaporate.

Software preservation therefore needs a wider unit than repository backup.

For a small project, that may be simple. Export issues periodically. Keep release notes in the repository. Preserve important design decisions in Markdown. Store critical artifacts by digest. Mirror tags. Keep enough build instructions that a future reader can reconstruct what was shipped.

For a large institution, the problem becomes records architecture.

Which review evidence is legally or operationally important?

How long should CI results be retained?

Which incident records should point to exact source states?

How are artifact identities tied to source identities?

Can the organization migrate its social metadata without silently losing comments or review threads?

Who owns the export when a forge is not the system of record?

These are not Git questions.

Git makes them easier to ask because it provides one unusually stable backbone.

The most dangerous assumption is that the forge page is the history.

The forge page is a view assembled from several databases.

That view can be excellent. It can be the best place to understand a change while the project is alive. It can connect human identities, review threads, code, builds, and deployments in ways the command line never will.

But durability requires knowing what happens when the view is gone.

The distinction shows up in the failure modes of migration tools.

GitHub’s migration documentation warns that a migration can complete while particular pieces of repository metadata fail to move. A pull-request review thread can be incomplete. A comment can fail to map cleanly to a diff. Team references may no longer resolve in the destination organization. A webhook can exist but require re-enabling.

This is not an indictment of migration software.

It is what happens when social history has more relational structure than the commit graph.

A Git commit names its parents explicitly. If the objects arrive intact, ancestry remains ancestry.

A review comment may depend on a file, a line mapping, a particular revision of a pull request, an account identity, a permission model, and a thread state. Move it to another system and the importer has to reconstruct all of those relationships under a different namespace.

The more contextual an object is, the harder it is to preserve by copying.

That helps explain why simple formats last.

An email message is ugly but self-contained enough to archive.

A patch is limited but portable.

A Git commit is austere but resolvable.

A modern review conversation is richer and therefore more dependent on its surrounding database.

There is a lesson here for agent systems being designed now.

Do not assume the current orchestration product will be the permanent home of agent history.

The session identifier may disappear with the vendor.

The model name may become meaningless.

A proprietary trace format may be unreadable.

A task database may be replaced.

If the only durable statement is “agent session 9fd2 succeeded,” almost nothing useful has been preserved.

The durable record needs to resolve downward.

Which repository state did the session start from?

Which state did it produce?

Which tests were evaluated against which state?

Which artifact was built?

Which authority accepted the result?

Those coordinates can outlive the orchestration layer even if the richer session transcript does not.

The transcript may still be worth keeping.

For difficult debugging, it can reveal what files an agent inspected, which hypotheses it tried, and where a bad assumption entered the work. But a transcript is closer to a lab notebook than to a commit. It may be large, sensitive, noisy, and difficult to retain forever.

That is another reason to resist the idea that more logging automatically creates better memory.

Useful memory is structured by future questions.

An incident investigator may need authorization, inputs, outputs, and verification.

A maintainer may need design rationale.

A regulator may need approval records.

A researcher may need the full execution trace.

A future contributor may need only the surprising invariant that should not be “cleaned up.”

Different audiences require different slices of the past.

Git’s object graph succeeds because it does not try to anticipate all of them.

The surrounding archive should learn the same restraint.

Preserve high-value evidence deliberately.

Preserve links among evidence precisely.

Do not confuse exhaustive telemetry with institutional understanding.

There is also a political dimension.

The repository can be forked.

The institutional history often cannot.

A public project can have thousands of independent copies of its commits and one canonical copy of its issue database. This creates a subtle form of platform power. The host does not own the Git objects merely because it serves them, but it may become the practical custodian of the project’s discussions, social identities, moderation decisions, and review records.

That custody can be benign and useful.

Centralized search is useful.

Spam control is useful.

Identity systems are useful.

Notification systems are useful.

The point is not that every project should self-host every database.

The point is that technical decentralization does not automatically decentralize memory.

Git distributed the accepted code.

Forges recentralized much of the conversation because conversation benefits from rendezvous.

That bargain made collaboration easier.

It also means resilience has to be designed at both layers.

A project that cares about long memory can decide which social records deserve export, mirroring, or condensation into durable documents. A major architecture decision may deserve a design record in the repository. A security incident may deserve a permanent postmortem tied to exact commits. A release may deserve a manifest of artifacts and digests. A routine “looks good” comment probably does not deserve archaeological immortality.

Curation is part of preservation.

Git’s history is selective already.

The main branch does not contain every abandoned branch ever created.

The object database does not promise to retain every unreachable object forever.

Reflogs expire.

Garbage collection eventually removes some forgotten states.

The durable record is durable because projects choose what remains reachable.

The same principle should govern social memory.

Not everything needs to live forever.

The important things need a path to remain findable after the interface that created them has changed.

The distinction can be tested with a simple thought experiment.

Take a project offline.

No web interface.

No issue tracker.

No CI provider.

No package registry.

Only the cloned repository and whatever archives the project deliberately kept.

What can you still prove?

What can you still explain?

What can you still rebuild?

What can you still attribute?

The answers reveal the project’s actual memory model.

Git will usually perform well on the first question.

The exact accepted source states remain unusually portable.

Explanation will be mixed.

Buildability may depend on external dependencies and artifact stores.

Attribution will depend on how much the project asked signatures, identities, and external systems to carry.

This is why calls to put everything on-chain, in the commit, or in one universal ledger are usually misguided.

Different evidence has different privacy, retention, scale, and mutability requirements.

A vulnerability discussion may need to remain restricted for a period.

A build log may be huge and disposable after a few years.

A legal approval may need long retention.

A reviewer comment may matter socially but not technically.

A commit may need to remain readable for decades.

One storage system is unlikely to optimize all of them.

The durable architecture is federated but linked.

Git already trained developers to think this way inside a repository.

A tree links to blobs by identity.

A commit links to a tree and parents.

A tag links to an object.

A ref gives a mutable name to an immutable object.

The future project record can extend the same discipline outward.

A task links to the base state it authorized.

A review links to the revision it examined.

A test report links to the tree it ran against.

An artifact links to the source and builder that produced it.

A deployment links to the artifact that entered an environment.

An incident links back to the deployment and source.

The important advance is not forcing all records into Git.

It is making the relationships precise enough that the records can be reconciled later.

This becomes a governance issue when machine authorship grows.

A human team can sometimes survive poor records because people remember.

The maintainer recalls that a weird file exists for a reason.

The release engineer remembers which build was promoted.

The reviewer remembers that approval was withdrawn and then reissued.

The staff engineer remembers that two pull requests were alternatives.

Machines can increase output faster than organizations can increase that ambient memory.

A thousand proposed changes create a thousand chances for context to become detached from state.

The repository can hold every accepted commit.

The institution can still forget why it accepted them.

That is the paradox of perfect technical memory.

A system can preserve every byte and lose the meaning.

The future of version control therefore includes a problem Git never claimed to solve: preserving the decision history around the object history.

The solution is unlikely to be one database.

It is more likely to be a set of durable links, exportable records, content identities, and clear retention choices.

The commit remains central because so many other claims can point to it.

Not because the commit contains the whole truth.

This is the difference between a ledger and an archive.

A ledger records the states that were accepted.

An archive preserves enough surrounding evidence to understand how and why they were accepted.

Software increasingly needs both.

The repository gives us the first.

The rest of the development system has to decide whether the second is worth keeping.

The next interlude follows one part of that surrounding evidence into the supply chain.

Once source leaves the repository and becomes a binary, package, image, model, or deployed service, the commit alone is no longer enough.

The question changes from which history produced this state to which process produced the thing we are about to trust.