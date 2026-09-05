# The Pull Request

A pull request is not a Git object.

That fact is easy to forget because it has become one of the most familiar objects in software development.

Developers open one. Reviewers comment on it. Bots inspect it. Continuous integration attaches results to it. Security systems scan it. Managers count them. Maintainers merge or close them. Teams write policies about who may approve them and how many approvals are enough.

Then the repository records none of that directly.

Git records commits and ancestry. The pull request is a proposal about those commits, held by the forge.

This separation is what allowed the pull request to become so much larger than its original job.

The narrow technical problem is simple. One line of history exists somewhere. Another line is considered canonical. Somebody wants the first line incorporated into the second.

Git already had several ways to express that desire. A developer could ask a maintainer to fetch a branch. Patches could be sent by email. A signed tag could identify a release or integration point. The Linux kernel community still uses email-centered review heavily because its workflow grew before forge pull requests became universal.

GitHub wrapped the proposal in a durable web object.

By August 2010, the company was describing pull requests not merely as requests to merge, but as living discussions around code people wanted merged. That wording marks the important transition. The proposal was becoming a container for process.

Once a repository has a container for proposed change, almost every governance problem wants to attach itself there.

Review is the obvious first layer.

A reviewer can inspect the difference between the proposed branch and the base branch. Comments can be tied to lines. General discussion can remain attached to the proposal. Later pushes update the proposal without erasing the conversation. The branch can evolve while the social object persists.

That persistence changes the nature of revision.

A patch emailed once is a document sent at a moment in time. A pull request is a moving negotiation. The underlying commits may change repeatedly, but the proposal remains the same social thread.

This is useful and dangerous.

Useful, because context accumulates.

Dangerous, because the proposal can become difficult to reason about when the code underneath it changes too much.

A reviewer's approval can refer psychologically to version three of a branch while version seven is what ultimately merges. Platforms therefore track review state, dismiss stale approvals under configurable rules, and connect checks to specific commit identities.

The system has to answer a basic question Git alone does not ask: approved what?

The same question appears in continuous integration.

A test suite runs against a commit or a synthetic merge result. A check reports success or failure. The forge displays that result on the pull request because the pull request is where the merge decision happens.

GitHub's current documentation describes status checks as signals that commits meet repository conditions. External systems and GitHub Apps can publish them. Protected branches can require selected checks to pass before merge.

This is one of the most consequential expansions of the pull request.

The object stopped being just a conversation about code.

It became a gate through which code passes.

That gate can include tests, builds, linting, formatting, type checks, static analysis, dependency review, security scanning, policy validation, documentation generation, deployment previews, license checks, or almost anything else an organization can automate.

Each check asks a different question.

Did it compile?

Did the tests pass?

Did the new dependency violate policy?

Did coverage fall?

Did a schema migration remain reversible?

Did the author update documentation?

Did a security scanner recognize a known pattern?

The pull request does not answer those questions itself. It aggregates the answers.

The distinction matters because green is seductive.

A screen full of successful checks can look like proof.

It is only proof that the configured checks reported success under the conditions in which they ran.

A missing test remains missing.

A false negative remains invisible.

A race condition may not reproduce.

A security problem outside the scanner's model may pass untouched.

An architectural mistake can satisfy every automated rule in the repository.

The pull request became powerful partly because it concentrates uncertainty into one decision point.

Do we merge this?

The checks reduce uncertainty. They do not eliminate judgment.

Organizations then began attaching authority to the same object.

Branch protection can require approving reviews before a proposal is mergeable. It can require status checks. It can require conversation resolution. It can demand a linear history, signed commits, successful deployments, a merge queue, or other constraints depending on platform configuration.

The effect is subtle.

A branch name in Git is just a ref.

A protected branch in a forge is a constitution.

The repository says `main` points here.

The forge says who is permitted to move it and under what conditions.

That constitution immediately creates a second problem: deciding who counts as a competent representative of the code being changed.

Repositories answer this in different ways. Some rely on informal maintainer knowledge. Some assign directories or file patterns to teams. Some require particular reviewers for security-sensitive paths, deployment configuration, payment code, database schemas, or generated interfaces. On GitHub, a CODEOWNERS file can be used with branch-protection rules so that designated owners must approve changes touching the paths for which they are responsible.

That sounds like a simple permission rule until the repository becomes large.

Ownership creates expertise and queues at the same time.

A small team that owns a critical directory may receive every proposal that touches it. If the directory sits low in the dependency graph, unrelated product work can converge on the same reviewers. The rule that protects the code can also make those people the throughput limit for the organization.

The pressure then moves back into the policy.

Should one approval be enough?

Should an author's own team count?

Should stale approvals disappear after the branch changes?

Should administrators be allowed to bypass the rule during an incident?

Should generated files require the same owners as their source definitions?

Should a mechanical dependency update wait for the same review path as a hand-written change to authentication logic?

These are not Git questions. They are institutional questions expressed through a Git-adjacent interface.

The policy also acquires exceptions because reality does not arrive in neat categories.

A production outage can make the normal review path too slow. A security response may need secrecy that ordinary discussion undermines. A maintainer may be unavailable. A repository can inherit a broken required check whose service no longer runs. An organization that allows no bypass at all can discover that its safety mechanism has become an availability risk.

Allowing bypass creates the opposite problem.

A control that can be bypassed is only as strong as the conditions under which the bypass is used and recorded.

That is why review systems accumulate audit trails around the rule itself. The important evidence is no longer merely that a proposal passed. It is whether a requirement was satisfied, dismissed, overridden, or changed while the proposal was in flight.

The more governance lives in the pull request, the more the pull request becomes a record of exceptions as well as compliance.

This is where the social graph becomes more important than the commit graph.

Two commits can have exactly the same ancestry relationship whether one arrived through months of formal review or through an administrator's direct push. Git preserves the resulting graph. The forge preserves the governance record.

That governance record can matter years later.

When a security incident occurs, investigators may ask who approved the change, which checks ran, whether warnings were overridden, whether required conversations were resolved, and whether the branch was protected at the time.

None of those answers are guaranteed to exist in the commit object.

The commit tells you what tree was recorded, its parents, and claimed author and committer metadata.

The pull request tells you how an institution decided to accept it.

This turns the pull request into evidence about process.

Not perfect evidence.

A review can be superficial. A required approver can click approve without reading deeply. Teams can route around policy. Administrators may have bypass rights. A check may be misconfigured. A branch protection rule may have changed after the fact.

There is also a quieter failure mode: approval can decay without anybody doing anything obviously wrong.

A reviewer studies a proposal carefully on Monday and approves it. On Tuesday the author pushes a substantial change in response to somebody else's comment. The platform may dismiss the old approval, preserve it, or require a new review depending on configuration. If the approval remains visually present, the organization can end up with a technically correct record of who clicked approve and a misleading impression of what that person actually examined.

This is not unique to software review. Any approval system that allows the underlying object to change after approval has to bind authority to a version.

Git gives the forge an unusually strong primitive for doing that because commits have identities. The difficult part is policy: deciding when a change is material enough to invalidate prior judgment and when demanding another pass merely wastes scarce attention.

A one-character documentation fix after review and a rewritten authentication path are both new commits.

The graph can tell you they differ.

It cannot tell you whether the difference deserves another human decision.

Still, the pull request captures something Git's core format intentionally does not: the route from proposed change to institutional acceptance.

That route grew more elaborate as repositories grew busier.

Merge queues are one response.

In a quiet repository, a pull request can be tested against the latest base branch, approved, and merged before the base changes underneath it. In a busy repository, several proposals may be ready at once. Each can be green against yesterday's `main` and still interact badly when merged in sequence.

A queue serializes the final act.

The platform can build a temporary merge candidate, run required checks, and advance proposals according to policy. The queue treats merge order as shared state rather than letting every author race for the branch tip.

The subtle point is what the queue does not do.

It does not make independent changes conceptually compatible.

Suppose one proposal renames an internal API and another adds a caller using the old name. Suppose each passes when tested against the base from which it was developed. A merge queue can test a candidate that includes the newer target state and discover the break before the protected branch moves. That is valuable. But the queue has learned nothing about why the two changes disagree. It has converted an integration surprise into a failed candidate.

The organization still has to decide who adapts to whom.

A queue is therefore less like an automatic integrator than a controlled experiment repeated near the branch tip.

It makes order explicit.

It reduces the race in which ten approved proposals all assume they are the next one to merge.

It can prevent a green pull request from becoming red only after it has already landed.

But it cannot decide architecture, preserve intent, or reconcile contradictory product choices.

This is an example of a larger rule.

Branching is cheap.

Integration is not.

Git made divergent histories inexpensive to create. The pull-request system evolved to make convergence administrable.

Code review sits at the center because convergence is partly semantic.

A merge algorithm can determine whether lines overlap mechanically. It cannot decide whether two independently reasonable changes contradict the product strategy. It cannot know that a function still compiles but violates an undocumented operational assumption. It cannot tell whether a new abstraction belongs in the codebase.

Human review became the social answer.

Then scale made human review itself a bottleneck.

Large organizations accumulated review rotations, ownership rules, specialist approvers, automated reviewers, labels, bots, stale-change rules, size limits, queues, and service-level expectations. A developer could spend less time writing a change than navigating the process that decides whether the change enters `main`.

This is not necessarily bureaucracy gone wrong.

It can be the cost of shared consequence.

A repository used by three people can rely on conversation. A repository used to ship a bank, operating system, cloud service, medical device, or widely consumed library may need more explicit proof that somebody responsible has considered the change.

The pull request becomes the place where that proof is assembled.

The word proof should remain qualified.

A pull request can show that a process happened.

It cannot prove the process was wise.

This gap becomes visible in incidents where all formal gates were satisfied and the change still caused harm.

A test suite can encode the wrong assumptions.

A reviewer can share the author's blind spot.

A code owner can be overloaded.

A security scanner can lag a new exploit class.

A merge queue can faithfully serialize a bad decision.

Governance systems reduce classes of error. They do not abolish error.

They can also create a misleading binary between governed and ungoverned work.

A proposal that crosses the required path can look legitimate because the path is familiar. A proposal that arrives through a less common route can look suspicious even when it has been examined more carefully. The ritual acquires authority of its own.

That is useful up to the point where teams optimize for satisfying the ritual rather than improving the decision.

A reviewer learns to write “LGTM” because the interface requires an approval.

An author splits a risky change into pieces because smaller proposals move faster, even when the risk exists only in the combined behavior.

A bot comments on every dependency update because the control exists, producing enough noise that humans stop reading the comments.

A required test becomes flaky, and the normal response becomes rerunning it until green rather than investigating why the signal cannot be trusted.

The pull request did not create these behaviors. It gave them a surface.

That surface is powerful because it makes process observable. It is dangerous because observable process is easy to count.

Organizations can measure time to first review, time to merge, number of approvals, number of comments, check duration, queue depth, and pull-request volume. Those measures can reveal genuine bottlenecks. They can also become targets that encourage shallow speed.

A ten-minute review is neither good nor bad in the abstract.

A proposal with twenty comments may be a healthy design discussion or evidence that the change was poorly prepared.

A repository that merges hundreds of pull requests a day may be extraordinarily effective or may be manufacturing tiny administrative units because the metric rewards them.

The forge sees events more easily than it sees understanding.

That gap matters as authorship becomes cheaper.

The interesting question is what happens when the number of proposed changes grows faster than the number of people capable of understanding them.

That pressure already existed before coding agents.

Monorepos produced it through sheer organizational scale. Large open-source projects produced it through contributor volume. Automated dependency systems created routine proposal traffic. Formatting bots and generated code increased change counts with little human intention behind each line.

Agents intensify the same problem.

If a machine can produce a plausible patch in minutes, branch creation becomes nearly free in both the technical and labor senses. The expensive object is the reviewer's attention.

The pull request was designed around a world in which creating a meaningful proposal usually cost the author enough effort to ration proposals naturally.

That rationing is weakening.

A machine author can try five implementations, open five branches, run tests on all of them, and present whichever survives. It can create follow-up fixes, dependency bumps, refactors, documentation updates, and cleanup changes continuously.

The repository can store this volume.

The institution may not be able to judge it.

That creates a temptation to automate more of the decision.

If agents write the code, agents can review it.

If agents review it, checks can arbitrate disagreement.

If checks pass, a merge queue can integrate automatically.

This pipeline can be appropriate for some classes of change. It can also create a closed epistemic loop in which machines generate, evaluate, and accept work using tests and models derived from the same incomplete specification.

A green pull request may become less informative as production becomes cheaper.

The number of checks can increase while the amount of human understanding decreases.

That does not mean every change needs manual line-by-line inspection. It means the pull request needs to carry more than a diff when authorship becomes abundant.

Intent matters.

Why does this change exist?

What constraint was it trying to satisfy?

What alternatives were attempted?

Which behaviors are expected to change?

What evidence supports that expectation?

What would cause the change to be reverted?

A human author often carries these answers implicitly and can supply them during review. An agent can generate them too, but the system needs to decide which claims are trustworthy and how they relate to the actual commits.

This is where the next generation of pull-request tooling is likely to grow.

Not necessarily inside Git.

Around it.

The pull request has always been an external layer that gives social meaning to graph changes. It can continue evolving without altering the commit format.

Semantic summaries, generated test rationale, provenance, execution traces, dependency impact, ownership inference, behavior-level diffs, and agent task context can all attach to the proposal.

The danger is repeating the same mistake at a richer layer.

A polished explanation can look like understanding.

An AI-generated review can look like scrutiny.

A confidence score can look like certainty.

The pull request's history should teach caution. Every new signal becomes useful because it compresses complexity. Then organizations begin depending on the compressed signal and forget what it omitted.

Green checks did not eliminate bugs.

Approvals did not eliminate shallow review.

Branch protection did not eliminate bad merges.

Machine summaries will not eliminate misunderstanding.

The pull request remains valuable because it creates a place where those uncertainties can meet.

A proposal exists.

Evidence accumulates around it.

Authority decides whether it becomes shared history.

That is more than a Git operation.

It is institutional memory being written in real time.

The next problem is what happens when the repository itself becomes too large for the old assumptions under that institution.

The graph may have no center.

At monorepo scale, it can still become very heavy.