# Chapter 3 — Orphan Code

Some of the most important infrastructure in the world does not look like infrastructure.

It looks like a folder with twelve files.

There may be no company office. No sales team. No maintenance contract. No procurement process. No ceremonial launch. The software may have started because one person needed a small utility and decided to share it.

Then somebody else used it.

Then another project depended on that project.

Then a framework depended on the second project. Then a cloud service built on the framework. Then a bank, hospital, university, retailer, logistics company, manufacturer, government agency, or phone application inherited the original code without any human in that organization deliberately choosing it.

The folder became infrastructure by adoption.

Its governance did not necessarily change at the same speed.

This is one of the strangest features of open-source software: social importance and organizational weight can become wildly misaligned.

A library can be downloaded millions of times and still depend on the attention of a person answering issues after work.

A package can become part of commercial products worth billions of dollars while the maintainer remains unpaid.

A vulnerability report can suddenly transform a hobby project into an incident affecting strangers around the world.

The code did not ask for promotion.

The network promoted it anyway.

Open source makes the Orphan Age visible because dependency is explicit enough to trace. Modern software is assembled. Applications import frameworks, libraries, parsers, cryptographic functions, network clients, image decoders, logging systems, compression tools, database drivers, date utilities, test frameworks, build tools, and countless smaller components. Those components import others.

A finished product may therefore contain code from people its own developers have never met.

This is not a flaw unique to open source.

Industrial systems have always depended on suppliers. A car manufacturer does not smelt every alloy, design every bearing, produce every chip, and refine every chemical in-house. Complex systems work because specialization works.

Software makes the chain unusually cheap to extend.

Adding a dependency can take one line.

That one line can create a future relationship with a project whose stewardship model the developer has never investigated.

NIST’s software-supply-chain guidance recognizes the practical consequence. Software bills of materials exist because organizations need to know what components are inside the products they operate. An ingredient list does not make food safe by itself, and an SBOM does not make software secure. But without some inventory of components, a vulnerability can be announced and an organization may not know whether it is affected.

The inventory is a map of inherited obligations.

Each component creates a question.

Who maintains this?

How quickly are security reports handled?

Can we replace it?

What license governs it?

How deeply is it embedded?

What happens if the project is archived?

What happens if a maintainer account is compromised?

What happens if the person with publishing rights disappears?

Those questions become urgent only occasionally.

That is why they are easy to ignore most of the time.

A dependency can work perfectly for years. Its silence looks like stability. The organization above it sees no tickets and therefore no cost. The maintenance work may still be happening, but somewhere else. A volunteer reviews a patch. A foundation pays for an audit. A stranger updates a build script. A package registry absorbs abuse. A security researcher discloses a flaw. A maintainer rejects a malicious contribution.

The consumer experiences the absence of failure.

The producer experiences the work.

This asymmetry creates what economists would recognize as a free-rider problem, but money is only part of it. Even well-funded companies can struggle to route resources to the exact maintainers whose code sits deep in their dependency graph. The chain is dynamic. Versions change. Packages are replaced. Indirect dependencies appear because another library made a choice. Criticality can be discovered only after a failure.

The internet contains millions of projects.

No central planner knows which tiny library will become a load-bearing beam.

That uncertainty is one reason open source became so productive in the first place. Permissionless reuse allows good ideas to spread without negotiation. The price of that freedom is that institutional responsibility does not automatically follow usage.

The xz Utils episode in 2024 became a dramatic illustration of how much trust can concentrate in an unglamorous maintenance channel. A sophisticated backdoor was discovered before it reached broad production deployment. The important lesson for this book is not the technical mechanism. It is the social surface around the code: long-lived infrastructure, maintainer pressure, transfer of trust, release authority, and the difficulty downstream users have in observing the human health of a project they treat as a component.

Security people reacted because the case was alarming.

Stewardship people should react because the case was ordinary in one deeper respect.

Projects change hands.

Maintainers get tired.

People have children, illnesses, jobs, grief, rent, boredom, new interests, and finite evenings.

A project can remain useful after the conditions that sustained its maintenance have disappeared.

That is orphanhood approaching in slow motion.

GitHub, the Open Source Security Foundation, foundations, governments, and companies have increasingly treated maintainer support as a supply-chain issue. GitHub’s recent programs describe maintainers stretched by security reports, automated pull requests, and the burden of protecting projects that may have become critical infrastructure almost accidentally. The OpenSSF exists partly because the world learned that software commons need institutions around them.

The phrase *software commons* matters.

A commons is not ownerless.

It is differently owned.

The pasture in the classic metaphor has rules, users, boundaries, and consequences. Open-source projects likewise vary from personal repositories to mature foundations with governance, release processes, funding, security teams, contributor agreements, automated testing, reproducible builds, and succession procedures.

The mistake is grouping all publicly available code into one social category.

A package with two maintainers and a donation link is not institutionally equivalent to the Linux kernel.

A company choosing a dependency needs to understand that difference.

The Orphan Age reframes dependency risk around stewardship density.

How much responsibility surrounds the thing relative to how much responsibility depends on it?

Again, this is not a clean numerical metric. Download count is not criticality. Contributor count is not governance quality. Corporate sponsorship is not independence. Recent commits are not proof of health. A project can be stable because it is finished, not abandoned. A tiny cryptographic library may deserve more scrutiny than a huge user-interface package because the consequences of failure differ.

But the question exposes a structural imbalance.

When enormous downstream value rests on a narrow upstream stewardship base, the system has orphan risk even if nothing is currently broken.

We should resist turning that observation into an accusation against maintainers.

The maintainer does not owe the world indefinite labor because the world found the code useful.

This is where the language of ownership gets morally confused. A volunteer creates a gift. Organizations incorporate the gift into revenue-producing systems. Years later they may complain that the gift is not receiving enterprise-grade support.

That is not abandonment by the maintainer.

It is failed dependency governance by the consumer.

If your business depends on a project, you have acquired a responsibility whether or not you paid an invoice.

The responsibility may be fulfilled in several ways: fund the maintainer, contribute engineering work, sponsor security review, maintain an internal fork, reduce dependency, contract for support, participate in governance, or replace the component.

What does not work is assuming the project’s future labor will materialize because the repository remains downloadable.

Repositories make a peculiar promise.

They preserve code better than they preserve responsibility.

A commit can remain visible after the author disappears. Version control records the past with extraordinary precision. It records who changed a line, when, and why if the commit message is good. But it cannot guarantee that anyone in the future is willing or authorized to make the next change.

The artifact can outlive the institution around it.

This is why orphan code can look healthy right up until a new obligation arrives.

Suppose a parser has not changed in six years. That may be fine. The format it parses is stable. The implementation is simple. The tests pass.

Then a memory-safety flaw is discovered.

Suddenly age matters less than response capacity.

Who can issue a release?

Who controls the package-registry account?

Who understands the code well enough to review a fix?

Who communicates with downstream users?

Who decides whether the patch is compatible?

Who signs the release?

The vulnerability did not create the governance problem.

It revealed it.

This pattern appears constantly in the Orphan Age. Failure is often a diagnostic event. A storm reveals ownership of a derelict boat. A leak reveals responsibility for a well. An outage reveals the one employee who knew an old server. A lawsuit reveals the absence of records. A death reveals that no one else can access an account.

The system was orphaning before the event.

The event made the orphanhood expensive.

Package registries have become part of the solution because they sit at the transfer point between maintainers and users. Strong authentication, provenance, signed artifacts, protected publishing workflows, malware detection, dependency alerts, and mechanisms for marking projects deprecated all reduce the cost of trust.

But technical controls cannot answer the entire question.

A package can be authentic and still be abandoned.

It can be secure today and have no successor tomorrow.

The deeper design problem is continuity of stewardship.

Some projects solve this with foundations. A foundation can hold trademarks, funds, infrastructure, and governance in a form that survives individual maintainers. Some use multiple release managers so publishing authority is not concentrated in one person. Some document succession. Some cultivate a contributor ladder so users can become maintainers. Some create long-term-support branches. Some declare an explicit end of life.

That last act is underrated.

Deprecation is an ending technology.

A maintainer who says, clearly, “this project will receive no further fixes after this date” is not failing the user. The maintainer is returning information to the system. Downstream users can migrate, fork, fund, or accept risk.

Ambiguity is more dangerous.

A package that still installs but has no declared future can remain embedded for years because every consumer assumes somebody else has evaluated it.

The most responsible repository may therefore contain a sentence that feels negative: *Do not use this for new projects.*

That sentence can prevent a thousand future jobs.

Creation culture dislikes messages like that because they interrupt momentum. Package managers optimize for adding. Tutorials show installation commands. Code assistants suggest libraries. Search results rank popular examples. The path from need to dependency is smooth.

The path from dependency to independence is usually not.

Removal requires knowledge.

Which functions do we actually use?

Can another package replace them?

Will behavior change?

Is the dependency direct or transitive?

Do we need it at runtime or only during build?

Can a standard library feature now do the job?

Does removing one package pull out twenty indirect packages?

The maturity of a software system can be measured partly by its ability to reduce what it owns.

This runs against a common intuition that larger dependency graphs represent progress. Often they do: reuse avoids reinventing tested work. But every dependency should earn its future claims.

A five-line utility imported from a sprawling package may be cheap today and expensive over ten years.

A mature team learns to price not only implementation effort but continuity risk.

The same insight applies to generated code.

A code generator can produce a thousand lines in seconds. Those lines may be readable, tested, and useful. But the generated code still joins a repository with owners, dependencies, build systems, security obligations, and future readers. The machine can lower the cost of producing the first version without guaranteeing lower cost of maintaining the result.

In fact, abundance can make maintenance harder if teams accept more code than they can understand.

The difference between code generation and code stewardship is not intelligence.

It is time.

Stewardship is intelligence applied repeatedly as the environment changes.

A model can help with that too. Automated patching, test generation, vulnerability triage, dependency analysis, documentation, and migration tools may lower future care costs dramatically. That possibility is one of the strongest arguments against a pessimistic reading of this book. If machine assistance makes maintenance scale with creation, orphan load may become manageable even as software explodes in quantity.

But automation inherits the same governance question.

Who watches the watcher?

An automated dependency bot opens a pull request. Someone still decides whether to merge. An agent updates a library. Someone still needs a rollback path. A model triages security reports. Someone still owns the threshold for escalation. A migration agent rewrites code. Someone still decides whether the behavior is equivalent enough for the domain.

The human role may shrink.

Responsibility does not disappear merely because the labor is automated.

This is the central distinction.

Labor is the work required to do a task.

Responsibility is the obligation to ensure the task is done well enough.

Technology can reduce labor much faster than it can settle responsibility.

That is why the Orphan Age is not simply a maintenance crisis.

It is a responsibility-allocation crisis.

Open source gives us a hopeful model because communities have been solving this problem in public for decades. They have learned that healthy projects need more than good code. They need contribution pathways, release authority, governance, conflict resolution, documentation, funding, security processes, and the ability to let one person step away without destroying the project.

That is institutional design.

The tiny folder becomes infrastructure.

Then infrastructure has to become an institution, even if the institution remains light.

The world will keep importing code.

The next step is learning to import responsibility with it.
