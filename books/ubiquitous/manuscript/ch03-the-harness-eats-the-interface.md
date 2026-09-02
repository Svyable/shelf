# The Harness Eats the Interface

For a while, every new computer capability arrives with a new interface.

A program has menus. A database has forms. A financial system has fields. A design tool has panels. A developer learns commands. A company buys software and then spends months teaching employees where to click.

This is one reason software expertise has been valuable. Knowing what a system can do is not enough. You have to know how the designers exposed the capability. The interface becomes a kind of local language, and organizations accumulate people who speak it.

Then interfaces get eaten.

The spreadsheet ate many specialized calculation interfaces because a grid and formulas were general enough to absorb them. The web browser ate a surprising amount of desktop software because URLs, forms, and pages became a common shell. The smartphone absorbed cameras, maps, music players, ticketing, banking, flashlights, scanners, recorders, and countless other devices into one pocket interface.

AI harnesses are beginning to do the same thing to software work.

A harness is the layer around a model that gives it context, tools, permissions, memory, files, connectors, execution environments, and some ability to continue working after the first answer. The model supplies general reasoning and language behavior. The harness lets that reasoning touch something.

The exact product names matter less than the architecture. Claude Desktop, for example, supports local extensions built around the Model Context Protocol. Remote connectors can expose services such as cloud applications, while local extensions can reach files, databases, processes, and other resources on a user’s machine. Other products use different names for similar ideas: tools, actions, agents, plugins, skills, connectors, computer use, code execution, browsers, sandboxes.

The pattern is consistent.

Instead of opening five applications and translating your intention into five sets of interface operations, you state more of the intention once and the harness translates across the tools.

That is a profound change in where skill sits.

Suppose a manager wants to compare customer complaints with recent product changes and produce a list of likely regressions. The old workflow might involve exporting tickets, filtering a spreadsheet, opening a project-management system, searching release notes, reading commit messages, asking an engineer for context, and assembling a document. The person who knew which filters to use, where the data lived, and how the systems fit together could move quickly. The person who did not know the interfaces was blocked before the analysis began.

A connected AI system can increasingly perform parts of that navigation. It can search the ticket system, inspect project records, query code or documentation, join information, and prepare a draft explanation. The human still needs access rights. The organization still needs sane data. The model can still misunderstand. But the manual choreography is no longer sacred.

The interface specialist loses a moat.

This will happen unevenly. Some software is easy to expose safely through tools. Some workflows are too risky for broad autonomy. Legacy systems may remain stubborn for decades. Regulated environments will require approvals and audit trails. People will still use graphical interfaces because many tasks are easier to inspect visually than to describe. Yet even partial interface compression changes labor economics.

Think about how much office competence is really navigation competence.

Where is the file? Which report contains the number? Which menu creates the export? Who has permission? What field does the CRM use? Which system is authoritative? How do I get the invoice out of one application and into another without breaking the format? What sequence of steps does finance require before the request is considered complete?

Organizations call this institutional knowledge. Some of it is genuinely institutional: the reason behind the rule, the history of the customer, the political reality of the team, the unwritten constraint. But some is knowledge of accidental interfaces.

AI harnesses are good at accidental interfaces because software interfaces are themselves symbolic systems. Buttons have labels. APIs have schemas. files have names. Databases have tables. Error messages have text. Documentation describes actions. Once these elements are exposed to a model, the system can often navigate them well enough to reduce the premium on memorizing them.

That is why prompt engineering is unlikely to be the durable career category its earliest boom suggested.

When a new machine is difficult to operate, operators can temporarily earn a premium for knowing the incantations. Then the interface improves. Defaults improve. Models infer intention better. Tools add structured inputs. Organizations encode successful procedures into reusable workflows. What was once a clever prompt becomes a button, a policy, a template, or invisible behavior inside the harness.

The same thing happened to search-engine tricks. Knowing Boolean operators and query syntax was once a meaningful advantage for online research. Some specialists still benefit from advanced search technique, but ordinary users no longer need to think like librarians to find most ordinary information. The interface absorbed part of the expertise.

The harness will absorb prompting in the same way.

This does not mean communicating with machines stops mattering. It means the scarce part moves away from memorizing phrasing and toward specifying intent, constraints, evidence, and acceptable failure.

Those are older skills wearing new clothes.

A strong operator asks: what is the actual objective? Which source is authoritative? What must never be changed automatically? What output is reversible? What requires approval? How will we know the result is correct? What happens when the tool encounters an exception? Which permissions should it have? How much context is enough, and what context would create privacy or security risk?

These questions sound less like prompting and more like engineering, operations, management, and governance.

That is the direction to watch whenever intelligence becomes a layer in software.

The model commoditizes some production. The harness commoditizes some navigation. What remains valuable is deciding what should be connected and under what rules.

This is not a small remainder.

Software systems are full of incompatible realities. One customer record may have three identifiers. The sales database may call a customer active while billing calls the account delinquent. The project tracker may contain the official deadline while the team chat contains the real one. The document repository may hold six versions of the policy, four of which are obsolete and two of which disagree. An AI can retrieve all of them faster than a person. That does not answer which one should govern.

The more powerful the harness, the more these disagreements become visible.

Humans used to hide a great deal of systems inconsistency through manual interpretation. An experienced administrator knew that the old code in one field meant the new category in another system. A veteran employee knew to ignore the stale dashboard on Monday morning. An assistant knew that a certain executive’s “final” document was never final until a particular colleague had looked at it. These workarounds were expensive, fragile, and sometimes absurd. They also carried context that formal software lacked.

An agentic harness forces a choice. Either encode the context, retrieve it, infer it, or accept failure.

This creates a new category of valuable work: making organizations legible to their own machines.

That can involve cleaning data, defining authoritative sources, documenting exceptions, clarifying permissions, exposing APIs, designing approval boundaries, and translating tacit processes into enough structure that automated systems can act without constantly asking a human what the organization meant.

A person who understands both the business and the systems becomes disproportionately useful here.

Pure technical knowledge is insufficient because the question is not merely how to connect two systems. Pure business knowledge is insufficient because the person needs to understand what the connection will actually do. The valuable worker sits across the seam.

This is renaissance territory.

An operations manager who has learned enough databases, APIs, security, accounting, and process design can reshape a company without becoming a specialist software engineer in each domain. An engineer who understands customer service, finance, and logistics can build automations that respect the reasons the organization behaves as it does. A lawyer who understands workflow systems can help design an approval process that captures legal risk at the point of action rather than after the fact.

The harness rewards cross-domain literacy because it can supply much of the missing syntax.

That last sentence deserves care. Syntax is not the same as substance.

An AI can write the database query. It cannot automatically know that the database itself is wrong. It can produce the API call. It cannot know whether the company should be allowed to make that call without approval. It can generate a workflow. It cannot decide whose interests the workflow ought to protect unless someone gives it an objective, rules, and a way to handle conflict.

The easiest work to automate is the work where the objective is already clear.

This is why narrowly defined vertical expertise can get squeezed inside a harness. If the specialist’s value can be expressed as a stable mapping from input to output, the mapping can be turned into a tool.

Take a hypothetical compliance analyst whose job is to review routine purchase requests against a known policy. The work requires familiarity with thresholds, prohibited categories, approval levels, and documentation. For years, the analyst’s knowledge may have been indispensable because employees did not know the policy and managers did not have time to read it. A connected AI can retrieve the current policy, inspect the request, identify missing documents, and route exceptions to a human.

The analyst is not necessarily fired. The role changes. Fewer people may handle more volume. The remaining analysts spend more time on novel cases, policy interpretation, investigation, design of controls, and auditing whether the automated process behaves correctly.

The vertical becomes a feature inside a larger system.

This is the phrase that frightens specialists because it sounds like disappearance.

Sometimes it will be disappearance.

More often it will be a redistribution of value. A procedure that once justified a job becomes infrastructure used by many jobs. The specialist can either remain attached to the old procedure or move toward the problems created by scaling it.

Scaling creates plenty of problems.

When a human reviews fifty cases a week, inconsistency is local. When an automated system reviews fifty thousand, a small error becomes policy. When a human makes an occasional bad recommendation, a manager may catch it through ordinary interaction. When an agent makes decisions continuously, oversight needs instrumentation. Logs, samples, evaluations, access control, exception queues, rollback, and incident response become part of ordinary administration.

The result is not fewer systems. It is more systems hidden behind a simpler interface.

This is another recurring pattern in technology. The user experience gets simpler while the machinery underneath becomes more complicated. A smartphone has fewer visible controls than many old devices it replaced, but the stack beneath the glass contains radio systems, sensors, operating systems, cryptography, cloud services, payment networks, identity systems, application runtimes, and global supply chains.

AI harnesses may do something similar to knowledge work.

The employee sees one conversational surface. Underneath it sit models, retrieval systems, enterprise databases, external services, identity, permissions, memory, tool schemas, evaluators, and human approval paths.

The visible job becomes easier to enter. The invisible infrastructure becomes more consequential.

This creates two opposite career effects.

At the front end, people with fewer specialized software skills can accomplish more. They can ask for outcomes instead of knowing every intermediate interface. This is the flattening effect.

At the back end, people who can design, debug, secure, audit, and improve the underlying system become more important. This is the deepening effect.

The middle layer of people whose main advantage was operating a particular interface is where pressure accumulates.

You can see the same pattern in industrial automation. Once a machine tool becomes computer controlled, the operator may need less manual control over each cut. At the same time, setup, programming, fixturing, tool selection, maintenance, metrology, and process engineering can become more important. Automation does not simply subtract skill. It changes where skill lives.

The most resilient people follow the skill as it moves.

A payroll specialist learns systems integration, compensation policy, audit, and data quality rather than defending manual entry. A marketer learns product positioning, experimentation, customer research, distribution, and economics rather than becoming the fastest person at generating campaign copy. A developer learns architecture, security, product behavior, and operations rather than measuring identity by keystrokes. A project coordinator learns organizational design, dependency management, procurement, and negotiation rather than owning a meeting template.

The principle is not “become more senior.” Seniority itself can be bureaucratic and automatable.

The principle is move toward decisions the system cannot cheaply make from its current context.

Some of those decisions require more technical depth. Some require broader context. Some require human trust. Some require physical presence. Some require legal authority. Some require taste. Some require knowing what the organization actually wants when its stated objectives conflict.

The harness will keep chasing these decisions.

That is important too. There is no permanent frontier where humans can plant a flag and declare the machines may come no farther. Today’s exception becomes tomorrow’s documented case. Today’s tacit procedure becomes tomorrow’s training data. Today’s human approval becomes tomorrow’s automated policy check. The correct response is not to identify a single task machines cannot do and build a career around the impossibility.

It is to become good at moving frontiers.

Curiosity helps because frontiers are interdisciplinary. The hard part of a connected system may move from code to regulation to security to user behavior to economics in the same week. A narrow specialist can solve the part inside the specialty. A curious integrator can notice that the problem moved.

Physical skills help because the world outside software changes the terms of the task. A harness can schedule maintenance, retrieve manuals, diagnose likely faults, order parts, and generate work instructions. It still needs sensors or people to observe the real machine. Someone has to loosen the seized fastener, notice the scorched insulation, feel the vibration, align the shaft, test the repair, and take responsibility for returning equipment to service.

Hard physical work therefore becomes increasingly surrounded by software rather than separated from it.

The electrician of the next decade may use an AI system to inspect drawings, compare code requirements, draft estimates, organize materials, interpret equipment documentation, and troubleshoot a controls network. That does not make electrical skill less real. It gives the electrician a broader cognitive exoskeleton.

The same harness that compresses white-collar interfaces can amplify field workers who already own physical consequence.

This is one reason the clean distinction between “AI jobs” and “non-AI jobs” is misleading. AI is likely to become ordinary infrastructure inside both.

The durable difference is what the human contributes after the common intelligence layer is assumed.

If your contribution is knowing where to click, the harness is coming for the clicks.

If your contribution is knowing the exact incantation, the harness will learn the incantation.

If your contribution is a stable sequence of symbolic decisions, someone will try to encode the sequence.

If your contribution is understanding why the sequence exists, when it should not apply, what other system it affects, how to verify the result, and who will bear the cost when it fails, your work moves more slowly into the harness.

Slowly is not never.

But a decade is made of slowly.

That is enough time to build a career if you keep moving toward the layer that has not yet become an interface.

The word harness can make this sound like a software story. It is also an organizational story.

A harness does not merely connect tools. It decides which tools are available, which credentials they inherit, what context they see, how long they can work, when they stop to ask, what logs are preserved, and which actions are considered reversible. Those choices used to be scattered across product interfaces and employee training. When a general agent sits above the interfaces, the choices begin to concentrate in the orchestration layer.

That concentration has consequences for power inside a company.

The employee who once knew how to coax five systems into cooperation may lose bargaining power. The team that owns the harness may gain it. Security teams become more important because permission design becomes part of everyday automation. Data owners become more important because the system can only act coherently if names, records, and policies resolve to something stable. Managers may discover that what they called judgment was partly the freedom employees used to repair contradictions in badly designed processes.

The harness can reveal those contradictions or bury them.

Imagine an agent that is instructed to reduce overdue receivables. It can inspect invoices, send reminders, prepare escalation lists, and perhaps place accounts on hold. The objective sounds clear until reality arrives. A strategic customer has an invoice dispute. Another customer is late because the company itself delivered the wrong equipment. A public agency pays slowly by design. A tiny customer is two days late but depends on the product for a critical service. A sales executive has made a promise that never reached the billing system.

A human collections specialist may know these cases from conversations and memory. The harness needs those facts represented somewhere or it will pursue the metric literally.

This is one reason agentic software can make management quality more visible. A vague objective delegated to a person can be rescued by tacit judgment. The same objective delegated at machine speed can expose every ambiguity at once. The system asks, implicitly, what do you actually mean by a good outcome?

That question is expensive because organizations often do not know.

They have targets instead. Revenue. Response time. Utilization. Cost. Throughput. Compliance. A person inside the system has historically balanced the target against other obligations without writing the balancing rule down. A harness that acts at scale makes those unwritten tradeoffs part of system design.

The durable skill therefore includes objective design.

Not the abstract ability to write a better prompt, but the ability to decide what the process is for, which failure is worse than another, which values cannot be collapsed into one score, and where an automated decision should stop because the organization wants a person to assume responsibility.

This sounds close to management because it is management.

It also sounds close to engineering because reliable systems require explicit boundaries.

The merger is the point.

As the interface becomes conversational, the distinction between “business person who specifies requirements” and “technical person who implements them” can narrow for ordinary work. A domain expert can prototype the workflow directly. An engineer can interrogate the domain more quickly. The old handoff remains for large systems, but many smaller automations can be built by people who occupy both sides badly enough to be dangerous or well enough to be unusually effective.

The difference will be whether they know how to test the system.

A harness that works in a demo has seen the happy path. A harness that belongs in a business needs evidence about the unhappy paths. What happens when the source system is unavailable? When two records disagree? When the model is uncertain but the interface does not show it? When a tool call succeeds halfway? When a customer changes their mind while the process is running? When an employee revokes access? When the policy is updated? When an upstream vendor renames a field? When the action is legal but embarrassing?

These are not edge concerns once the harness becomes the interface. They are the interface.

The visible simplicity moves complexity into failure handling.

That movement creates a career opportunity that is easy to miss because it does not have one settled title. Some of the work will be called AI operations. Some will sit in security, platform engineering, finance systems, RevOps, legal operations, industrial controls, quality, or internal tooling. Some will be done by owners of small businesses who never think of themselves as technologists.

The common skill is the ability to make delegation safe enough to compound.

That requires knowing the task, the system, the permissions, the evidence, and the cost of a mistaken action. It is not a narrow AI specialty. It is a layer of operational literacy that will spread into ordinary jobs the way spreadsheets did.

That analogy is worth pushing one step further.

The spreadsheet did not create one permanent profession called spreadsheet operator. It became ambient. People in finance, engineering, logistics, science, administration, and small business learned enough to use it, while specialists built deeper systems around it. The competitive advantage of merely knowing how to open a spreadsheet disappeared. The advantage of understanding a business well enough to build a useful model did not.

Harnesses are likely to follow the same trajectory.

At first, the person who knows how to connect the tools feels magical. Later, connection becomes normal. The advantage moves to the person who knows which connections are worth making and which should remain deliberately difficult.

A purchase order should be easy to draft. Moving money should still have friction. A support ticket can be summarized automatically. Terminating a customer relationship may deserve a human. A model can inspect a configuration change. Production access should remain scoped. The mature harness is not the one that removes every click. It is the one that puts friction exactly where consequences justify it.

That is a design problem, a governance problem, and a judgment problem at once.

It is also a clue about what happens to work when the interface disappears.

The clicks were never the deepest skill.

The decisions hiding between them were.