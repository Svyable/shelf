# Interlude — The Provenance Graph

A commit can tell you exactly which source tree was recorded.

It cannot tell you which binary you downloaded.

The distinction sounds obvious until an incident forces somebody to prove the connection.

A release page offers an executable.

A package registry offers an archive.

A container registry offers an image.

A mobile store distributes an application.

A model hub serves a checkpoint.

A deployment system starts a process in production.

Somewhere upstream there may be a Git commit.

The operational question is whether the thing being executed actually came from the state everybody thinks it came from.

Source identity and artifact identity are different layers.

Git became infrastructure by making the first layer unusually precise. A commit names a tree. The tree names blobs and other trees. The ancestry is explicit. If a developer says a fix is present in a particular commit, another repository with that object can inspect the exact state.

Build systems add another transformation.

They compile.

Link.

Minify.

Bundle.

Generate.

Vendor.

Sign.

Package.

Strip symbols.

Insert metadata.

Resolve dependencies.

Fetch external tools.

Run scripts.

Select architecture-specific outputs.

The artifact that leaves the pipeline may contain no Git objects at all.

The source graph has ended.

The supply-chain graph has begun.

For years, software teams often represented that transition with convention.

A release binary was uploaded next to a tag.

A package version matched a source version.

A build server wrote the commit hash into a filename.

A container received a label.

A release engineer knew which job had produced the artifact.

These practices can work well.

They also rely heavily on institutional trust.

If an attacker can replace the uploaded binary without changing the tag, the source history remains pristine while users receive something else.

If a build worker is compromised, it can faithfully check out the correct commit and produce a malicious artifact.

If a dependency changes between builds, two artifacts produced from the same source commit may differ.

If a release script fetches an unpinned tool, the effective build input extends beyond Git.

If a package registry account is compromised, the artifact associated with a familiar version name can become the attack surface even though the repository is untouched.

Version control is necessary evidence.

It is not complete provenance.

Modern supply-chain systems increasingly make this boundary explicit.

GitHub’s artifact-attestation system is a useful example because its claims are deliberately narrower than the word verified can suggest.

An attestation can bind an artifact to information about the workflow that produced it: the repository, organization, environment, commit SHA, triggering event, and other identity data associated with the build. A consumer can verify the attestation and decide whether the declared provenance satisfies a policy.

That is stronger than trusting a filename.

It is still not proof that the program is safe.

GitHub’s own documentation emphasizes the distinction. An attestation tells you where and how an artifact was built. The consumer still has to decide whether that source, workflow, and environment deserve trust.

This is the same discipline Chapter 14 applied to commit signatures.

A signature can answer one question strongly.

It should not be promoted into an answer to five other questions.

Provenance systems are most useful when they preserve that modesty.

The important unit is a claim.

This artifact has this digest.

It was produced by this workflow.

The workflow ran in this repository.

It used this source commit.

It ran under this identity.

The statement is signed under this trust model.

Each clause narrows uncertainty.

None establishes that the business logic is correct.

The Source Levels for Software Artifacts framework, usually shortened to SLSA, grew from the same problem: software consumers need stronger evidence about how artifacts move from source through build systems into distribution.

The interesting conceptual move is that the build becomes part of the security boundary.

That is obvious in retrospect.

It was not always reflected in developer culture.

Source review received enormous attention because source was where human intention was visible. Build infrastructure was treated as machinery. If the code was correct and the compiler worked, the output was presumed to follow.

Then supply-chain attacks repeatedly demonstrated that machinery can be the easier target.

A build service has credentials.

A release job has publishing authority.

A package step may download dependencies.

A runner may execute repository-controlled scripts.

An artifact store may permit overwrites.

A signing key may be reachable from automation.

The path from commit to customer contains privileged systems that do not appear in `git log`.

The provenance graph exists whether the organization records it or not.

Recording it makes investigation possible.

Consider a simple release.

Commit C is tagged as version 4.2.

Workflow W checks out C.

The workflow resolves dependency set D.

Builder B executes the compilation.

The build produces artifact A.

A signing service signs A.

Registry R stores A.

Deployment P retrieves A.

Production environment E runs it.

If a vulnerability is found in E, the investigation can move backward.

Which artifact was actually running?

Which registry object supplied it?

Which build produced that digest?

Which workflow version ran?

Which source commit did the workflow claim to use?

Were the dependencies the expected ones?

Was the builder authorized?

Did the signature correspond to the artifact now present?

The chain is only useful when the identifiers are precise.

“Version 4.2” is not enough if a package can be republished.

“Built from main” is not enough because main moves.

“Latest image” is not evidence.

“Passed CI” says little without identifying the run and state.

Git’s culture of exact object names prepared developers for this style of reasoning.

The same instinct can be extended outward.

Name the artifact by digest.

Name the source by commit identity.

Name the workflow by a versioned definition.

Name the dependency graph where practical.

Name the builder identity.

Record the relationship.

The result resembles Git without being Git.

Content identity and graph relationships appear again because the problem has the same shape.

Location is convenient.

Identity has to survive location changing.

A container tag tells an operator what to ask for.

A digest tells the runtime which bytes were expected.

A package version tells a human which release is intended.

An integrity value can distinguish the expected archive from another archive with the same name.

A repository URL tells a build system where to fetch.

A commit ID tells it which state.

These pairings recur across the supply chain.

Names for people.

Digests for machines.

Mutable labels for coordination.

Immutable identities for evidence.

The hard part is not inventing another hash.

It is preserving the relationship among layers.

An attestation is one way.

A software bill of materials is another kind of claim.

An SBOM can describe components present in an artifact or build. It does not prove the components are safe. It gives a vulnerability-response process something concrete to query.

When a library vulnerability is announced, the useful question is not whether the source repository somewhere depends on that library.

It is which released artifacts contain the affected component.

That may require connecting package metadata, source locks, build records, and distributed binaries.

The Git commit remains one coordinate among several.

This is why provenance becomes more important as builds become less reproducible.

In an ideal reproducible-build system, independent builders can take the declared source and inputs and produce byte-for-byte identical outputs.

That property dramatically strengthens verification because the official builder is no longer the only path from source to artifact.

Another party can rebuild and compare.

But reproducibility is difficult.

Timestamps leak into artifacts.

Compiler versions matter.

Operating-system packages differ.

File ordering changes.

Network-resolved dependencies move.

Randomness enters.

Build paths are embedded.

Code generation depends on external services.

Hardware-specific optimizations vary.

Even projects committed to reproducibility have to work to eliminate these sources of variation.

Provenance does not replace reproducibility.

The two reinforce each other.

Provenance says what process claimed to happen.

Reproducibility lets another process test whether the claimed inputs imply the same output.

A signature says who vouched for the claim.

The artifact digest identifies what is being discussed.

The source commit identifies one input state.

No single layer deserves the word trust by itself.

A useful way to see the problem is to separate four statements that teams routinely collapse into one.

The source was approved.

The build was authorized.

The artifact is authentic.

The deployment was intended.

A mature system can satisfy three and fail the fourth.

A reviewed commit can be built by an unauthorized job.

An authorized job can publish an artifact that was replaced after signing if storage controls are weak.

An authentic artifact can be deployed to the wrong environment.

An intended deployment can contain vulnerable but correctly built software.

Each statement needs its own evidence.

Git is strongest at the first boundary because it identifies source state and can record how that state entered shared history through surrounding workflow.

Build provenance addresses the second and third.

Deployment records address the fourth.

The temptation is to create a green badge at the end that compresses the whole chain.

Badges are useful interfaces.

They are dangerous ontologies.

A green badge should always be expandable into the claims that made it green.

Which commit?

Which builder?

Which workflow?

Which artifact digest?

Which policy?

Which deployment?

The ability to drill down matters because policy changes.

An artifact accepted under yesterday’s rules may be rejected under today’s.

A key may be revoked.

A builder identity may be compromised.

A dependency may later be declared malicious.

The original evidence should remain interpretable even when the current verdict changes.

This is another place where immutable evidence and mutable judgment should be kept separate.

The artifact digest does not change when a vulnerability is discovered.

The attestation does not need to be rewritten because a signer is later distrusted.

The policy result can change.

A future verifier can say: this artifact was indeed built by that workflow from that commit, and we no longer consider that workflow sufficient.

That is a healthier model than rewriting the historical record to match the latest conclusion.

Git users already understand the shape.

A commit can remain the same while a branch moves away from it.

A tag can remain while policy stops trusting its signer.

An old release can remain historically real while being withdrawn from recommended use.

State and judgment evolve on different clocks.

Supply-chain systems benefit from the same separation.

There is also an economic reason provenance is becoming more important.

Automation makes rebuilding cheap enough that organizations can produce many more artifacts than humans could manage manually.

Every pull request can generate a preview.

Every architecture can receive a build.

Every commit can produce a container.

Every agent experiment can run in its own environment.

The number of artifacts can grow faster than the number of release engineers who remember where they came from.

Names become less reliable as volume grows.

`build-final.zip` was always a bad name.

At ten artifacts it was merely embarrassing.

At ten thousand artifacts it is unusable.

Content identity scales better because machines can compare it without understanding the naming convention.

This is the same transition Git made for source.

Humans still use branch names and release names.

The machine layer depends on object identity.

The supply chain is moving toward the same division of labor.

Humans say version 4.2.

Systems say digest `sha256:...`.

Humans say production.

Systems record an environment identifier and deployment event.

Humans say the release workflow.

Systems identify the exact workflow revision and run.

The vocabulary gets friendlier at the top and more exact underneath.

That is not bureaucratic excess.

It is how automation stays debuggable.

The strongest provenance systems also make absence visible.

No attestation is information.

An artifact that cannot be tied to an approved builder should not be silently treated as equivalent to one that can.

A source tree with no signed release tag may still be legitimate, but it lacks one particular piece of evidence.

A package with no SBOM may still be safe, but vulnerability response has less structured information.

A deployment with no source coordinate may still work, but forensic reconstruction is harder.

Evidence systems improve security partly by turning missing links into explicit states instead of leaving them as assumptions.

This matters for agents because agents can expand the build graph as easily as they expand the author graph.

An agent can update dependencies.

It can edit release automation.

It can regenerate lockfiles.

It can modify the workflow that later produces an attestation.

It can change the test suite that decides whether the workflow proceeds.

It can alter a Dockerfile, package manifest, compiler flag, or deployment template while leaving application source mostly untouched.

The old distinction between code change and infrastructure change becomes less useful when one delegated task can cross both.

A future review system therefore needs to understand provenance impact.

Did this pull request change what gets built?

Did it change how it gets built?

Did it change where dependencies come from?

Did it change which identity is allowed to publish?

Did it change the environment in which an attestation is issued?

Did it change the policy that later verifies the attestation?

Those questions are often more consequential than the number of lines changed.

Git can show the files.

The supply-chain layer has to explain the authority.

There is a recursion here.

The provenance system itself is software.

Its workflow definition may live in Git.

Its policy may live in Git.

Its trusted-builder configuration may live elsewhere.

Its signing infrastructure has its own keys and lifecycle.

Its verification tool has versions.

An organization can therefore create a beautiful graph of signed claims and still have one weak root of trust underneath them.

This is not a reason to give up.

It is a reason to make trust assumptions explicit.

Cryptography is unusually good at showing where assumptions begin.

A signature verifies under a key.

Then somebody has to decide why that key is trusted.

An attestation verifies under an identity system.

Then somebody has to decide why that identity is authorized.

A digest identifies an artifact.

Then somebody has to decide whether the artifact should run.

A Git commit identifies source.

Then somebody has to decide whether that commit was acceptable.

The policy cannot be removed from the system.

It can only be made visible.

This is why provenance should be thought of as evidence infrastructure rather than safety infrastructure.

Evidence supports decisions.

It does not make the decisions automatically correct.

The distinction becomes important when organizations automate enforcement.

A deployment system can require that an artifact carry an attestation from an approved repository and workflow.

That can block a large class of accidental or unauthorized artifacts.

It can also faithfully deploy a malicious artifact built by the approved workflow from malicious source that passed every policy.

The control is still valuable.

It narrows the attack surface.

Security advances through layered constraints, not universal proof.

Git succeeded for a similar reason.

A content-addressed object does not prove the code is good.

It makes substitution harder to hide once an identity is trusted.

A branch protection rule does not prove the merge is wise.

It makes unauthorized paths to the branch harder.

A signature does not prove understanding.

It makes some identity claims stronger.

An attestation does not prove safety.

It makes the source-to-artifact relationship more inspectable.

The repeated pattern is worth noticing.

Good infrastructure answers a narrow question strongly enough that other systems can build on the answer.

The future software record will therefore look less like one repository and more like a chain of named states.

Source state.

Build definition.

Dependency state.

Artifact state.

Deployment state.

Runtime state.

A failure can occur at any transition.

The purpose of provenance is to keep the transitions from becoming invisible.

This changes what incident response looks like.

Suppose an organization discovers that a container image contains an unexpected binary.

Without provenance, the investigation may begin with logs and institutional memory.

Which job built it?

Which source did that job use?

Was the image overwritten?

Did the registry tag move?

Which credential published it?

The answers may require manually correlating several systems.

With stronger provenance, the artifact digest can be the starting point.

Find its attestation.

Find the build.

Find the source commit.

Find the workflow.

Compare the declared dependencies.

Check whether the publishing identity was expected.

The investigation can still reveal compromise.

The difference is that the chain has coordinates.

Coordinates shorten ambiguity.

That is exactly what Git did for source history.

Before distributed content-addressed history became normal, developers often talked about “the version from Tuesday” or “the copy on the build machine.”

Git made the exact state cheap to name.

Supply-chain provenance is trying to make the exact transformation cheap to name.

The next step is likely richer composition among these claims.

A release could carry a manifest that links source commits, dependency digests, SBOMs, build attestations, test evidence, signatures, and final artifacts.

The manifest itself can be content-addressed.

A deployment can record the manifest it accepted.

An incident can point to the deployment and manifest.

A future auditor can follow the chain without depending on one web interface.

This is still an aspiration in many organizations.

The pieces exist unevenly.

The direction is clear.

As software becomes more automated, the thing worth preserving is not merely the code.

It is the path by which code became consequence.

Git remains one of the strongest coordinates in that path because the source commit is portable and exact.

But the commit is only the beginning.

The repository says what state was accepted.

The provenance graph says what the institution did with that state.

The two histories meet at the moment software leaves source control and becomes an artifact.

That boundary used to be treated as plumbing.

It is becoming one of the most important borders in software engineering.

The next interlude returns to authorship.

Once agents can create branches, tests, workflows, and release changes in parallel, provenance has to scale at the same time as production.

The problem is no longer whether a machine can make a commit.

It is how an institution handles a factory of commits without losing the ability to know which work mattered, which evidence belonged to it, and which branch deserved to become shared history.