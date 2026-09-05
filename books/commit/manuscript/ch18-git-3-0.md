# Git 3.0

The most revealing document about Git's future is not a manifesto.

It is a list of things the project is finally willing to break.

That distinction matters because mature infrastructure rarely gets to describe its next era on a blank page. A startup can announce a new architecture and ask users to migrate. A twenty-one-year-old version-control system sits beneath operating systems, IDEs, build farms, package managers, code forges, deployment pipelines, security scanners, embedded devices, government networks, and scripts whose authors may have left the company a decade ago.

Git cannot simply decide what would be clean.

It has to decide what is worth the migration cost.

The project's `BreakingChanges` document exists for that reason. It is a ledger of accumulated incompatibilities the maintainers believe should eventually be crossed at a major-version boundary. Git's minor releases aim to preserve compatibility except under unusual pressure, so a major release becomes a place to spend compatibility capital deliberately.

As of September 2026, Git 3.0 has no announced release date.

That absence is more informative than a marketing countdown would be.

The document is not a wish list for everything maintainers might like someday. The project describes the listed items as changes considered ready enough to target the next breaking boundary, while also treating the document as living and revisable. Work is supposed to be prepared ahead of the boundary, guarded behind a compile-time mode so the project can continuously exercise the future behavior before the version number flips.

That is how infrastructure changes without pretending that a date makes code ready.

The planned changes are individually technical.

Together they amount to an autobiography.

New repositories are expected to use SHA-256 by default.

New repositories are expected to use reftable rather than the traditional files-plus-`packed-refs` reference backend.

The default initial branch name is expected to be `main`.

Rust is planned to become a mandatory part of the build, after a staged adoption in the 2.x series and subject to a final evaluation of downstream pain.

The default treatment of implicitly discovered bare repositories is expected to become stricter.

Long-deprecated mechanisms whose users have had years to move are scheduled to disappear.

A mature system is telling us which parts of its old environment have stopped being worth preserving as defaults.

The first is the hash.

Git began with SHA-1 because SHA-1 fit the engineering world of 2005. The function produced compact identifiers, was widely implemented, and was considered appropriate enough for the object's identity and integrity role. The system then became so successful that the hash escaped into every layer around it.

That success made migration harder.

Git has spent years supporting SHA-256 repositories and designing interoperability rather than waiting until a major release to begin the work. Git 3.0 is not the moment SHA-256 suddenly appears. It is the moment the project's default answer for a newly initialized repository is supposed to change.

That is an important difference.

Defaults are policy for people who do not make an explicit choice.

The project is not currently declaring SHA-1 repositories invalid. Its breaking-change plan explicitly says there is no present plan to deprecate the SHA-1 object format. Existing repositories therefore do not become pumpkins at midnight. The more realistic future is long coexistence: old repositories with SHA-1 identities, new repositories increasingly born with SHA-256 identities, and tools forced to operate across both worlds.

This is what successful migration often looks like.

Not replacement.

Bilingualism.

The web did not remove IPv4 when IPv6 became the better long-term address space. Character encodings did not disappear the day UTF-8 became the obvious default. Filesystems carry artifacts of eras their current users barely remember. Infrastructure accumulates compatibility because compatibility is one of the services it provides.

Git's hash transition is the same kind of problem.

The clean engineering answer is SHA-256.

The installed-world answer is both.

The second planned default change is quieter and may be more revealing.

References are the small names people use to navigate Git's enormous graph. Branches, tags, remote-tracking refs, hidden forge refs, bisect refs, notes refs, stash refs, and other namespaces all resolve eventually to objects. The concept is elegant enough to explain in a sentence.

The original storage is less elegant at modern scale.

Loose refs can live as files. Packed refs can be consolidated into a text file. This architecture works extraordinarily well when the reference namespace is modest. It becomes awkward when repositories accumulate hundreds of thousands of refs, when transactions need to update many names atomically, when case-insensitive filesystems collapse names the Git namespace would otherwise distinguish, or when deleting a few names can require rewriting a very large packed file.

Git 3.0's current plan changes the default backend for new repositories to reftable.

The branch is still a ref.

The ref is no longer necessarily a file.

That sentence captures the whole book's argument about durability.

A system survives when it can preserve the useful concept while replacing an implementation that no longer fits the scale.

The third planned change is culturally visible rather than mechanically deep: new repositories will default to a branch named `main`.

By the time Git itself makes that the major-version default, much of the forge ecosystem has already moved. Git has warned users for years that the default initial branch name may change and has long allowed administrators and developers to configure their own choice.

Again the major version is not inventing the future.

It is ratifying a future the ecosystem has substantially entered.

That pattern makes major releases less dramatic than product marketing trains us to expect.

Git 3.0 is not a reinvention called Git Next.

It is a synchronization point.

The code, users, forges, libraries, build systems, and distributions have to become ready enough that defaults which once would have caused widespread breakage can become ordinary.

Rust provides the clearest example of this staged migration.

Git was written overwhelmingly in C, and the C implementation remains central. Rust entered gradually. The project began by making Rust-capable pieces optional and by building infrastructure that could be tested without making every distributor immediately install a new language toolchain.

The plan recorded for Git 3.0 is to make Rust mandatory.

But even here, the project refuses to turn roadmap prose into destiny.

The current sequence says Git 2.52 begins the build-system transition, Git 2.55 default-enables Rust support while still permitting it to be explicitly disabled, and Git 3.0 removes that escape hatch. The project also says it will evaluate the impact on downstream distributions before making the requirement final and may defer mandatory Rust if the cost proves too significant.

That caveat is not a footnote.

It is the heart of maintaining portable infrastructure.

A language choice has two audiences.

The first is the upstream engineering team. Rust can improve memory safety, provide stronger abstractions, and let contributors use a modern ecosystem where those advantages justify the added complexity.

The second is everyone who has to build Git somewhere upstream does not control.

Old operating systems.

Minimal build environments.

Bootstrap chains.

Unusual architectures.

Vendor toolchains.

Long-term enterprise platforms.

Embedded environments.

A tool that runs nearly everywhere has to treat buildability as a feature.

The tension is not Rust versus C in the abstract.

It is safety and maintainability versus the cost of changing the dependency floor for the world.

The project has created an unusually clean experiment. Enable Rust before requiring it. Watch what breaks. Give downstreams time to adapt. Learn which platforms are blocked. Decide later whether the ecosystem cost remains acceptable.

This is what deprecation should look like when the user population is larger than the maintainer's field of view.

The planned bare-repository change tells a different story.

Security assumptions age faster than data structures.

A repository is not merely inert text. Git can invoke hooks. Shell prompts may invoke Git automatically to display branch state. Build systems and developer tools inspect repositories without a user consciously deciding that this particular directory should execute repository-associated behavior.

The current Git 3.0 plan tightens the default for bare repositories discovered implicitly while walking the filesystem. The motivation is an attack scenario in which an adversary places an embedded bare repository containing malicious hook configuration somewhere a user may enter. A seemingly passive `cd` can be enough to trigger software that runs Git in the background, which can then encounter the repository and cross an execution boundary the user did not realize existed.

The proposed default favors explicitness.

A bare repository deliberately named through `--git-dir` or `GIT_DIR` remains usable. Ordinary worktrees and recognized repository forms continue to work. What changes is Git's willingness to infer that an arbitrary bare repository found by filesystem discovery should be trusted as the active repository.

This is the kind of behavior nobody designs into version control because they want version control to become a security perimeter.

It becomes a security perimeter because everything else grows around it.

The hook system was useful.

Automatic repository discovery was useful.

Shell integrations were useful.

Bare repositories were useful.

Combine them in an adversarial world and a new risk appears between features that were individually reasonable.

Security work in mature systems often looks like this.

The vulnerability is not a single obviously foolish primitive.

It is the composition.

Git 3.0 therefore reveals the project's changing threat model as much as its changing implementation.

The version-control tool of 2005 assumed a technically sophisticated user intentionally operating on a repository they chose.

The version-control tool of 2026 lives inside IDEs, prompts, automated agents, CI workers, package builds, code-search systems, and developer environments where Git operations occur continuously and sometimes invisibly.

The trust boundary moved because the surrounding software moved.

This matters even more in an agentic world.

A human developer may notice that a directory is strange before running commands inside it.

An agent following a task may traverse dozens of repositories, generated worktrees, temporary directories, dependencies, and tool outputs in minutes. It can trigger code paths by exploration alone. The safer future is not to hope every agent acquires perfect suspicion.

It is to make dangerous inference require more explicit authority.

That principle extends beyond bare repositories.

Future version-control systems will increasingly have to distinguish data from executable policy, repository content from trusted configuration, and discovery from authorization. Agents raise the number of automated interactions with source trees, which raises the value of conservative defaults at every implicit execution boundary.

Git 3.0's removals are the least glamorous part of the roadmap and perhaps the most emotionally honest.

Some features have been deprecated for years.

Commit grafting was superseded by replacement refs. `git pack-redundant` has been discouraged so aggressively that recent versions require users to opt into the embarrassment of admitting they still use it. Legacy directories for remote shorthands date to Git's first year and have had modern replacements for almost as long. Old aliases and options whose behavior was superseded remain because removing them is not free merely because better alternatives exist.

At a major boundary, some of that archaeological layer can finally be excavated out.

The interesting question is not why these features are removed.

It is why they survived so long.

Because maintenance is a tax paid to strangers.

Somebody somewhere might still depend on the thing.

The project spends years warning, measuring complaints, providing alternatives, and making obsolete behavior increasingly inconvenient before it decides the cost of preservation exceeds the cost of removal.

That patience looks absurd if software is imagined as a product whose users continuously upgrade and adapt.

It looks rational if software is infrastructure whose users include unattended scripts and distributions with release cycles longer than some companies survive.

Git 3.0 is therefore not a story about boldness.

It is a story about permission.

When has enough of the ecosystem moved that the default can move too?

When is a security risk large enough to justify a behavior change?

When is an old mechanism unused enough to delete?

When is a new language dependency available enough to require?

When is a new storage backend supported enough outside the reference implementation that new repositories can safely assume it?

These questions do not have purely technical answers.

They are questions about the surrounding population.

That is why the ecosystem-readiness clauses in the Git 3.0 plan matter so much. SHA-256 cannot be merely implemented in core Git; libraries, applications, and forges must be ready. Reftable cannot merely benchmark well; alternative Git implementations such as JGit, libgit2, and Gitoxide have to understand the format before it is safe to make the format ordinary.

A standard is not whatever the reference implementation can do.

A standard is what independent implementations can survive.

Git became larger than the `git` executable long ago.

There are servers that speak its protocols, libraries that manipulate its objects, hosting platforms that interpret its refs, IDEs that synthesize workflows around its commands, and programming-language ecosystems that treat commit identities as coordinates. The project therefore cannot measure readiness only by asking whether its own test suite is green.

Git 3.0 is a vote across a federation of assumptions.

This creates a paradox.

The more successful Git becomes, the harder it becomes to change Git.

Yet the more successful Git becomes, the more environments it enters and the more pressure it receives to change.

That is the infrastructure trap.

Git's answer has been to prepare breaking behavior incrementally while preserving semantic continuity wherever possible.

The hash changes, but objects still have content-derived identities.

The ref backend changes, but branches and tags remain refs.

The default branch name changes, but a branch remains a movable name.

The build language mix changes, but the repository model does not become Rust-specific.

The repository trust default tightens, but explicit bare repositories remain part of Git.

Old commands disappear, but the graph underneath does not need a new theory.

This is why Git 3.0 may feel surprisingly undramatic when it finally arrives.

That would be a success.

The best major release for infrastructure is one in which the number moves because the ecosystem is ready, not one in which the ecosystem discovers on release day what the number means.

There is another reason to resist expecting spectacle.

The most important future changes may not coincide with a major version at all.

Git's scaling work has been landing across ordinary releases for years. Partial clone, commit-graphs, multi-pack indexes, geometric repacking, sparse checkout improvements, bundle URIs, reference backends, protocol capabilities, and maintenance machinery all alter what repositories can practically do without waiting for a ceremonial 3.0.

Version numbers are visible.

Infrastructure evolution is continuous.

The reftable default points toward the next chapter because it turns one of Git's smallest abstractions into a case study in accumulated scale.

A branch is just a name.

A tag is just a name.

A remote-tracking ref is just a name.

A hidden automation ref is just a name.

One name costs almost nothing.

Hundreds of thousands of names become a storage engine.

Git's future repeatedly begins this way: the original abstraction survives until success multiplies it enough that the implementation beneath it has to be rebuilt.
