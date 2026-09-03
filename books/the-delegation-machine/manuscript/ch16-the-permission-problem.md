# The Permission Problem

The safest key is the one that opens only the door you meant.

Computer security spent decades arriving at this sentence because the opposite design is so convenient.

Give the administrator everything.

Give the service account everything.

Give the application the user’s password.

Let the process run as root because permissions are annoying.

The system works beautifully until one component is compromised, confused, or wrong.

Then every door is part of the incident.

The principle of least privilege emerged as an answer: an actor should receive only the permissions necessary for the task, for only as long as necessary. Zero-trust architectures push the idea further by refusing to treat network location or prior access as sufficient reason for continued trust. Access decisions should consider identity, resource, context, policy, and current authorization rather than assuming that being “inside” the system makes an actor safe.

AI agents make these old ideas newly urgent because they are general-purpose delegates.

A traditional service account often has a narrow job. Read this queue. Write to this database. Upload this file.

A general agent may perform many tasks for one user across many systems. Its usefulness increases with broad context and broad action space.

The security principle says narrow.

The product vision says broad.

This is the permission problem.

A perfectly narrow agent would ask for permission continuously.

May I read this message?

May I open this file?

May I contact this person?

May I move this meeting?

May I use this card?

The user would become a full-time authorization clerk.

A perfectly broad agent would ask once.

“Allow access to everything so I can be helpful.”

The user would receive convenience at the cost of enormous blast radius.

Neither extreme is satisfying.

The solution is to design permissions around stable categories of consequence rather than individual clicks or unlimited trust.

A personal assistant may have standing permission to read calendar availability and propose changes, but require approval before canceling a medical appointment. It may reorder a routine household item under a spending cap but need confirmation for a new merchant or unusual amount. It may draft email freely but require approval before sending to an external recipient on a sensitive topic.

This is delegated authority expressed as a budget.

The budget can be money.

Time.

Data exposure.

Number of people contacted.

Scope of code changed.

Duration of credential access.

Irreversibility.

The useful question is not “Is this agent trusted?”

It is “Trusted to do what, under which conditions, before whom?”

Human organizations have always answered trust this way even when they use simpler language.

A cashier is trusted with one drawer, not the entire company treasury. A manager has a spending limit. A lawyer can negotiate within a mandate. A building employee may have keys to common areas but not every tenant’s safe. A temporary contractor may receive badge access during certain hours.

Trust is scoped because people are fallible and roles differ.

AI systems should not treat machine trust as a personality score.

A model can be trustworthy at summarization and unreliable at financial judgment. It can be reliable inside a sandbox and unpredictable when a tool returns malicious content. It can behave safely under normal user instructions and mishandle organizational authority. The same weights sit inside different risk envelopes depending on access.

Permission design is how the institution converts uncertain behavioral trust into bounded operational trust.

This is hopeful because model reliability does not have to become perfect before agents are useful.

We use imperfect humans in critical systems because authority is structured.

An employee can make mistakes without being able to destroy the company. A physician can prescribe within a licensed system but cannot secretly rewrite every medical record. A pilot can control an aircraft but operates inside maintenance, air traffic, training, and certification structures.

The model can be imperfect if the surrounding authority is proportionate.

The first important distinction is read versus write.

Reading creates privacy risk and informational power.

Writing creates state change.

Many tasks need broad read access and narrow write access. A research agent can inspect documents but produce a report rather than altering originals. A financial assistant can read transactions but only draft payments. A code-review agent can inspect a repository without merge rights.

This asymmetry is underused because products prefer complete workflows.

“Do it for me” feels better than “prepare it for me.”

But read-mostly agents can deliver large portions of the productivity benefit with much smaller operational risk.

Authority can expand after trust is earned.

This suggests technical probation.

Start in observe mode.

Then allow proposals.

Then reversible actions.

Then routine autonomous actions inside tight scopes.

Expand only where deployment evidence supports the expansion.

Human organizations call this onboarding.

Software should too.

The second distinction is standing versus just-in-time permission.

A standing grant remains available because the agent may need it unpredictably. This reduces friction and increases persistent risk.

A just-in-time grant is issued when a task reaches a specific action and can expire afterward.

The latter fits agentic work surprisingly well because the model can explain what it is trying to do before requesting the capability.

The danger is approval fatigue.

If the agent asks too often, users learn to approve without reading. Security warnings become wallpaper.

This is why requests should be grouped around meaningful authority changes rather than every low-level operation.

“Allow this agent to manage travel bookings up to $1,500 for this trip” is more intelligible than thirty prompts for individual website actions.

The user understands the mandate.

The system enforces the boundary.

The third distinction is data purpose.

An agent may legitimately read information for one task and illegitimately reuse it for another.

This is difficult to enforce because digital access has traditionally been resource-based. If a process can read the file, it can often use the contents however its code chooses.

AI makes purpose limitation more important because the model can connect information across domains semantically.

An assistant reading email to schedule meetings can notice medical details, financial information, relationship conflicts, business secrets, and political beliefs. The data become part of context and may influence future outputs even when unrelated to scheduling.

The more general the model, the less natural compartmentalization becomes.

Human institutions create professional walls for this reason. A doctor cannot use patient information for arbitrary personal advantage merely because the doctor legitimately learned it. A lawyer’s access carries confidentiality duties. A bank employee may see financial information but remains bound by policy and law.

These are purpose constraints layered on access.

Agent systems need technical and policy equivalents.

Separate memory domains.

Minimize retention.

Label sensitive provenance.

Avoid putting all retrieved information into one long-lived context.

Use specialized agents or processes where compartmentalization matters.

The model should not become one giant associative memory of every authorized glimpse.

This is a place where architecture can outperform human memory. A person cannot fully unlearn a secret heard at work. Software can deliberately avoid carrying a secret into another context if systems are designed that way.

AI does not have to inherit every human weakness.

The fourth distinction is delegation onward.

A principal may trust Agent A without trusting every tool or sub-agent A can contact. Authority should not automatically become transitive.

This is obvious in companies. Hiring a general contractor does not mean every subcontractor receives unlimited access to the principal’s property. Contracts specify responsibilities, insurance, scope, and often restrictions on subcontracting.

Agent systems need delegation lineage.

A credential can indicate whether it may be passed onward.

A sub-agent can receive a narrower derived capability rather than the parent’s full token.

A third-party tool can be prevented from seeing unrelated context.

The original principal should be able to inspect which actors inherited access.

Without lineage, a simple user permission can become a supply-chain permission.

The fifth distinction is revocation.

A permission that cannot be withdrawn is not ordinary delegated authority.

Digital systems make revocation technically possible and operationally messy. Tokens remain cached. scheduled jobs continue. copies of data persist. external actions cannot always be reversed. sub-agents may have already created their own state.

So revocation has two layers.

Stop future authority.

Repair or contain past side effects.

This is why agent systems need an inventory of persistent consequences.

Which credentials are active?

Which recurring jobs exist?

Which outside systems were modified?

Which commitments were communicated?

Which data left the boundary?

The principal should not have to reconstruct this from chat history.

Revocation is a systems operation.

The sixth distinction is identity.

A general-purpose AI agent should often act under an identity distinct from the human principal, even when the agent represents the principal.

This makes attribution possible.

The bank can see the transaction was initiated by the travel agent under delegated authority rather than typed directly by the account owner. The email recipient can know a scheduling agent sent the message. The repository log can distinguish an autonomous code change from a human commit.

Identity creates accountability and limits apparent authority.

The agent may be authorized to schedule but not negotiate compensation. The recipient can see the difference.

This is the digital version of a uniform with a title rather than a perfect mask of the principal’s face.

The seventh distinction is exception authority.

Most policies contain exceptions because reality does.

The danger is letting the same agent that wants to complete the task decide that the exception applies.

A model encounters a spending limit and reasons that the user clearly wants the trip, the fare is unusually high, and waiting will make the ticket more expensive. Should it exceed the limit?

A human assistant might call.

A reckless agent might interpret the objective broadly.

A brittle agent might refuse even when the principal would obviously approve.

Good design gives the agent a route for exception without giving it the power to create its own permission.

Request escalation.

Present evidence.

Receive a new grant from an independent authority.

This is the same structure as administrative appeals and managerial approvals.

The delegate can argue.

The delegate cannot ratify its own argument.

This matters because language models are unusually good at argument.

They can produce a compelling case for why the control should not apply this time.

That ability should help the human understand the exception, not dissolve the boundary.

A platform-controlled permission surface is therefore not cosmetic. It preserves a channel the model cannot fully author.

The model says, “The fare exceeds your limit by $96, but this is the last flight arriving before your meeting.”

The trusted interface says, “Grant one-time authority up to $1,600 for this booking?”

The principal acts on the structured consequence.

The model’s persuasion remains visible but not sovereign.

The eighth distinction is silent versus visible access.

Some agent permissions should be obvious during use. Others can operate quietly because constant status would overwhelm the user.

The system needs an inspectable history either way.

Mobile operating systems trained users to understand that applications can request camera, microphone, location, contacts, and photos. Agent operating systems will need a richer vocabulary.

This agent can:

read mail from these accounts;

send as itself;

propose calendar changes;

spend within this category;

access these folders;

contact these services;

create sub-agents under these scopes;

run until this date.

The permission model becomes an organizational chart for nonhuman actors.

This is not too much structure.

It is what broad delegation requires.

NIST’s zero-trust guidance makes a principle that fits agent systems well: trust should not be granted implicitly based on network location. An actor inside the enterprise is not automatically authorized for every resource.

The analogous agent principle is that context should not imply authority.

The model knows the password because it read a file.

That does not mean it is authorized to use the password.

The model knows a person’s address from email.

That does not mean it may share the address.

The model knows the company has an emergency account.

That does not mean every urgent task can charge it.

Knowledge and permission must remain separate concepts.

Language models blur them because the same context contains both facts and instructions. Architecture has to unblur them.

A future agent runtime may need something like a capability ledger.

Not a grand new framework for its own sake, but a concrete record of which authorities exist, where they came from, which actor holds them, and when they expire.

The agent reasons over the ledger.

The platform enforces it.

The principal can inspect it.

Auditors can reconstruct it.

Sub-agents receive derivatives rather than copies of everything.

This is how delegation becomes legible at machine scale.

The interesting irony is that permission systems often feel like obstacles to intelligence. The agent could solve the problem if only it had broader access.

That is true.

The employee could solve many problems faster with the master key too.

Institutions deliberately choose some inconvenience because unlimited authority turns every error into a crisis.

Permission is the art of deciding which mistakes are allowed to remain small.

The safest key is not the one that trusts the holder most.

It is the one that makes trust precise.

Computer-security researchers developed the idea of a **capability** as a particularly clean way to represent some forms of authority. Instead of asking a central system over and over whether an identity belongs to the right group, a capability can itself be an unforgeable reference carrying the right to perform a defined operation on a defined object. Possession is meaningful because the token is the authority.

The details vary across capability systems, object-capability designs, cloud credentials, signed URLs, and modern authorization frameworks. The conceptual move is valuable for agents: give the delegate an authority object that is narrower than the principal’s identity.

A research agent needs access to one dataset for one afternoon.

Give it a credential that can read that dataset and expires tonight.

A deployment agent needs permission to update one staging environment.

Give it staging authority, not the operator’s standing cloud administrator credential.

A travel agent needs to book one itinerary under a spending cap.

Give it a transaction-scoped grant, not a general-purpose payment card stored forever in memory.

The authority becomes disposable.

This is a subtle improvement over trusting the agent to remember a policy such as “do not spend more than $1,500.” The natural-language instruction still matters, but the credential makes some violations impossible regardless of interpretation.

The principal does not need to win an argument with the delegate.

The door simply does not open.

This is where authorization architecture can compensate for uncertain model behavior. We do not need to prove the agent will never misread the limit if the payment service enforces the limit independently.

The same logic applies to time.

Standing authority is dangerous partly because it survives forgotten context. A grant made for a task on Tuesday may still exist on Friday, when the conversation, business situation, or model state has changed.

Expiration converts memory into policy.

The system does not rely on somebody remembering to revoke the grant. The authority disappears unless renewed.

Human institutions use this constantly.

Visitor badges expire.

Temporary assignments end.

Emergency powers sunset.

Purchase orders have amounts and dates.

Contracts terminate.

Security clearances and licenses require renewal.

Time is one of the oldest scoping mechanisms.

AI agents should use it aggressively because persistent software is unusually good at outliving the reason it was authorized.

There is also a difference between **delegable** and **nondelegable** authority.

A manager may be allowed to approve an expense without being allowed to grant every subordinate the same spending authority. A lawyer can carry out some client instructions but cannot simply transfer the entire relationship to an unknown stranger. A building key can be copied physically, but policy may prohibit copying.

Agent systems need this semantic property explicitly.

A parent agent should not assume that because it can read a sensitive document, every sub-agent it creates may receive the document. It may instead give a sub-agent one extracted fact or a redacted derivative.

A parent authorized to send mail should not automatically hand a third-party tool its mail token.

A coding agent with repository write access can delegate a code-analysis task without delegating write access.

Subdelegation should attenuate authority by default, not clone it.

This is one of the places where machine delegation can be cleaner than human delegation. A human manager who knows a secret cannot guarantee they will not reveal it to a subordinate. A software runtime can technically constrain which data and capabilities cross the handoff boundary.

The model may ask for more.

The platform decides whether more exists.

That distinction becomes crucial when agents form teams. A top-level planner may understand the whole objective while specialist agents see only slices. This is efficient for context and valuable for security. The specialist can solve a local problem without possessing the principal’s entire world.

Compartmentalization is sometimes described as a limitation on intelligence.

It is also a way to make a powerful institution survivable.

Intelligence does not require every actor to know every secret or possess every key.

Human organizations learned that through espionage, fraud, and ordinary error. Need-to-know rules are imperfect, sometimes abused, and costly to coordination, but the principle survives because information and authority create risk when concentrated.

An agentic organization will face the same trade.

The fastest design is one omniscient agent with every credential.

The resilient design may be a set of partial actors connected by evidence and explicit grants.

This is not because the partial actors are more aligned personalities.

It is because architecture makes betrayal, confusion, and error less contagious.

The permission problem therefore has a surprising endpoint.

We began with the question of how much to trust the agent.

We end with a better question: **how much does the system need trust to do the work at all?**

The strongest permission architecture makes many bad outcomes unavailable even if the delegate is mistaken, manipulated, or temporarily unreliable.

That is not a failure to trust intelligence.

It is the institutional achievement that allows intelligence to be used at scale.