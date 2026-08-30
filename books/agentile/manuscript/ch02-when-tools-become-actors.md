# When Tools Become Actors

For most of the history of computing, software waited.

A spreadsheet did not wake before dawn and reconcile itself. A database did not notice that a supplier had changed its terms and decide to call legal. A word processor did not read the unfinished paragraph above the cursor, search three archives, compare two claims, and return with a better argument. Software could perform extraordinary feats, but the initiation usually came from elsewhere. A person clicked. A program called a function. A scheduler fired at a predetermined time. An event triggered code whose possible reactions had been mapped in advance.

The machine could be complicated without being much of an actor.

This distinction was easy to ignore because modern software often looked lively. Trading systems bought and sold in milliseconds. Recommendation engines rearranged what millions of people saw. Logistics systems routed packages across continents. Fraud systems blocked transactions before a human knew they existed. A thermostat could notice that a room was cold and turn on a furnace. None of these systems needed a person hovering over every decision.

Yet their autonomy had a particular shape. Engineers specified the space of action in code, rules, objectives, or narrow statistical models. The system might make decisions faster than any person could, but the path from condition to response was usually constrained enough that designers could say, with some confidence, what kind of thing it was allowed to do.

An agent changes the shape of the path.

Give a sufficiently capable agent a goal such as, “Find out why the renewal invoice is higher than last year and fix it if the increase is a mistake,” and the useful behavior cannot be reduced to one predetermined sequence. It may need to locate last year’s contract, identify the vendor, search email for an amendment, inspect the new invoice, compare line items, determine whether the increase is contractual, draft a question, wait for a response, interpret the answer, and decide whether the matter is resolved or should be escalated.

The instruction describes an outcome. The route is left partly open.

That opening is where the economic change begins.

A conventional tool extends a person’s capability when the person operates it. An agent can accept a delegated objective and choose among tools while pursuing it. The difference is not consciousness. It is not legal personhood. It is not proof of some philosophical threshold called intelligence. It is an operational change in who or what supplies the next step.

This is why arguments about whether an agent is “really autonomous” can become less useful than they first appear. Autonomy is not a switch. A junior employee is autonomous in some ways and constrained in others. A taxi driver chooses a route but not the passenger’s destination. A fund manager may trade within a mandate but cannot wire the fund’s assets to herself. A surgeon exercises extraordinary discretion inside one domain while requiring consent for another.

What matters economically is the size and character of the decision boundary.

The old software boundary was often tiny. Click this button. Execute this function. Run this query. If this field equals that value, perform this action.

The agentile boundary is larger. Achieve this result, using these resources, under these constraints, and come back when the job is complete or when the world becomes too ambiguous or consequential to continue.

That sounds like a subtle change in interface design. It is closer to the birth of a new production relation.

Tools have always changed work by altering what a person can do. A hammer increases the force a hand can deliver. A crane increases the mass a crew can move. A spreadsheet increases the volume of calculation an analyst can perform. Search increases the amount of information a researcher can inspect. Email increases the number of people a manager can reach.

Agents alter something adjacent: the amount of work a person can cause to happen without remaining inside every intermediate step.

The relevant unit is no longer merely capability.

It is delegation.

Consider two ways to use a language model.

In the first, you ask for a paragraph. It returns one. You read it. You ask for a revision. It returns another. The loop is human-driven. The model may be impressive, but the human supplies the sequence. Each turn is another pull on the tool.

In the second, you say, “Prepare the quarterly competitor brief. Use the source folder, check every claimed price against the current websites, note any uncertain comparisons, update the spreadsheet, and send me the draft when the evidence table is complete.”

Now the system has to decompose the task, choose actions, inspect results, recover from failures, and decide when it has enough evidence to stop. It may use a browser, a filesystem, a spreadsheet, code, internal search, or other applications. The human remains the principal, but no longer narrates every movement.

This is the practical line separating a clever instrument from an economic agent.

The line is fuzzy because real systems exist along a continuum. Some so-called agents are workflows with a little model judgment inserted between fixed stages. Some are loops in which a model chooses tools dynamically. Some can operate for only a few minutes. Others can maintain state across longer jobs. Some need approval before nearly every external action. Others are trusted to edit files, execute code, manage calendars, or send routine communications within configured permissions.

The vocabulary will change. The continuum will remain.

NIST has described contemporary AI agents as systems able to perceive and take actions in environments, often by embedding general-purpose models in software that lets them manipulate tools. Anthropic has drawn a useful architectural distinction between workflows, whose paths are largely predefined in code, and agents, in which the model dynamically directs its process and tool use. OpenAI has described the move from short chatbot interactions toward delegated tasks that can run for minutes or hours while coordinating tools and iterating toward a result.

These definitions differ at the edges, but they point toward the same economic fact.

The machine is being given a larger share of the sequence.

This matters because much of white-collar work is not one difficult act. It is a chain of modest acts connected by judgment.

Open the request.

Find the relevant file.

Notice that the customer name differs from the billing entity.

Check the contract.

Realize that the date in the contract is ambiguous.

Search the amendment.

Compare the numbers.

Ask someone a question.

Wait.

Read the answer.

Update the record.

Write the response.

Close the ticket.

Traditional software automated pieces of this chain spectacularly. The remaining cost often sat in the connective tissue. A human moved information between applications, recognized which branch the case belonged to, handled exceptions, and decided which step should happen next.

The connective tissue was expensive precisely because it did not look like one reusable function.

Agents attack the connective tissue.

They can fail there too, and often do. A tool may return ambiguous data. A model may choose the wrong source, misunderstand the task, repeat an action, stop too early, or confidently carry a mistaken assumption through several subsequent steps. The autonomy that makes an agent useful can compound error just as easily as it compounds progress.

This is not a footnote to the economics. It is part of the economics.

If a human must watch every action, the agent has not removed much supervisory labor. If a human must audit the entire result from first principles, the agent may have displaced execution while preserving verification cost. If errors are rare but catastrophic, the average time saved may matter less than the tail risk introduced.

The correct comparison is therefore not between a person and a flawless machine.

It is between two production systems with different costs.

One uses human attention to execute and supervise.

The other uses compute, software, permissions, model judgment, and some amount of human oversight.

The mix can change even when the final responsibility does not.

A lawyer can remain responsible for a filing while an agent prepares the first review. A software engineer can remain accountable for a deployment while an agent investigates the bug and proposes a patch. A buyer can retain signing authority while an agent compares vendors and drafts negotiation positions. A physician can remain responsible for care while an agent helps assemble records and prepare documentation.

Responsibility is not the same thing as execution.

This distinction will become increasingly important because institutions tend to bundle the two.

A job description often combines acts that require professional accountability with acts that merely accumulated around the accountable person. The surgeon signs the note because the surgeon performed the procedure, but the surgeon may also spend time reconstructing details that software could have assembled. The manager approves the purchase but may also spend half an hour locating three quotes. The researcher interprets the result but may also spend days cleaning the table.

Agents are likely to pull these bundles apart.

That process will feel familiar in industries that have already separated high-trust judgment from lower-cost execution. Law firms distinguish partners, associates, paralegals, and support staff. Medicine distinguishes physicians, nurses, technicians, scribes, and administrators. Construction distinguishes architects, engineers, contractors, inspectors, and trades. Finance distinguishes portfolio managers, analysts, operations, compliance, and custody.

The professions developed these layers because different tasks require different combinations of skill, authority, cost, and accountability.

Agents introduce a new layer whose marginal cost and scalability can look more like software than labor.

That does not mean the layer is infinitely cheap. Model inference costs money. Tools require infrastructure. Long-running tasks consume tokens, compute, storage, bandwidth, and external service fees. Reliable deployment adds evaluation, logging, security, identity, permissions, and recovery mechanisms. A cheap worker who creates expensive mistakes is not cheap.

But the cost structure is strange enough to change behavior.

A human employee must be recruited, hired, onboarded, paid, scheduled, managed, and retained. Capacity comes in human-sized increments. An agent can often be invoked for one task, duplicated for another, paused, replaced, or scaled across many similar jobs without creating a new employment relationship each time.

The economic significance lies less in whether one agent is “as good as one worker” than in the granularity of capacity.

Imagine that a company has ten thousand small investigative tasks each month. Each task takes somewhere between three and forty minutes. None is important enough to justify a specialist. The work is distributed among people whose real jobs lie elsewhere, so it accumulates in backlogs or is never done.

Hiring another employee may not solve the problem because the tasks are scattered across departments and arrive unevenly. Building deterministic software may not solve it because each case is slightly different.

Agentile capacity can be purchased closer to the shape of the work.

Ten minutes here.

Thirty seconds there.

Five parallel investigations overnight.

Nothing on Sunday.

A burst of fifty tasks after an acquisition.

The possibility of matching cognition to demand at finer resolution is one reason the change can be economically larger than a benchmark score suggests.

The same pattern has appeared whenever a production input became easier to meter.

Cloud computing let companies rent servers by the hour instead of buying enough hardware for peak demand. APIs let developers buy a capability call by call rather than rebuild the entire service. Gig platforms fragmented some forms of labor into jobs and rides. Electricity made mechanical power available from a socket instead of requiring each factory to maintain its own prime mover.

Each analogy is imperfect. Agents are not electricity, workers, servers, or APIs.

But each comparison highlights the same feature: a previously lumpy capability becomes more divisible.

Divisibility changes what is worth doing.

A factory that must purchase an entire machine asks whether the machine can justify its capital cost. A company that can rent the same capability for an hour asks whether this hour is worth buying. An office that would need to hire an employee asks whether the backlog justifies a salary. An office that can delegate one bounded task to an agent asks whether this task is worth the compute, review, and risk.

The threshold falls.

Once the threshold falls, demand expands into territory that was previously invisible.

This is why the earliest agent deployments can look unimpressive in conventional productivity statistics. The agent may not replace a role. It may perform thousands of errands that no role consistently performed before.

Check every contract date.

Classify every old support ticket.

Revisit every stale sales lead.

Compare every line item.

Follow every citation.

Draft a first response to every routine inquiry.

Test every small code change.

Summarize every meeting.

Inspect every exception.

The value of these actions is individually small. Their aggregate can be large.

The danger is symmetrical.

If useful delegated action becomes cheap, so does useless delegated action.

A person can now ask an agent to produce twenty competitor reports instead of one. A manager can request analysis that no one will read. A salesperson can generate a personalized message for every plausible prospect. A compliance function can examine every deviation whether or not the deviation matters. A litigant can produce more procedural work. A bureaucracy can ask for more documents because processing them is no longer painful for the bureaucracy.

The ability to act does not create the wisdom to choose which actions deserve existence.

This is the first reason an agent should not be understood as a mere productivity feature.

It changes the economics of initiative.

For centuries, organizations have relied on the fact that initiating work is costly. A new project needs someone to care enough to start it. A new analysis needs someone to spend the afternoon. A new complaint needs someone to write it. A new audit needs a budget. A new sales campaign needs people. Friction suppresses bad ideas along with good ones.

Agents remove part of that friction.

The result is not simply more productivity.

It is more attempts.

More experiments.

More requests.

More scrutiny.

More appeals.

More offers.

More software changes.

More generated artifacts competing for attention.

An agentile economy is therefore an economy in which the supply of competent initiative rises.

That phrase deserves care. “Competent” does not mean correct. It means capable enough to cross the threshold from thought to action.

A mediocre business idea once remained a thought because building the landing page, writing the copy, analyzing competitors, contacting suppliers, setting up analytics, and answering inquiries required several kinds of effort. If an agent can perform much of that sequence, more mediocre ideas will enter the world.

So will more excellent ideas.

Selection becomes more important because execution becomes less selective.

This is a recurring pattern in technological history. Cheap publishing did not make every book good; it increased the number of books. Cheap photography did not make every photograph valuable; it increased the number of photographs. Cheap software distribution did not make every app useful; it increased the number of apps. When production costs fall, scarcity migrates toward discovery, trust, attention, taste, and distribution.

Agents extend the pattern from artifacts to acts.

The world does not merely receive more text. It receives more things attempted.

That is the point at which the old metaphor of software as a tool begins to strain.

A tool is usually passive in our mental model. It becomes useful when a person takes hold of it.

An actor occupies time, encounters circumstances, and chooses among possible next moves.

The software agent is not an actor in every human sense. It does not need wages, sleep, status, dignity, or a career. It may not possess durable preferences of its own. It can be copied, reset, constrained, sandboxed, and replaced in ways that make the analogy to human agency dangerously misleading.

Yet economically, it can still fill an actor-shaped slot.

It can be assigned a task.

It can possess credentials.

It can inspect a changing environment.

It can take multiple actions.

It can create obligations for other systems.

It can produce records.

It can consume resources.

It can make mistakes while the principal is absent.

That is enough to force institutions to respond.

Security teams already need to ask which tools an agent may use, what data it may read, which actions require approval, and how its behavior is logged. NIST’s recent work on agent identity and authorization treats this as a practical infrastructure problem: once software agents act across systems, they need identities, permissions, and controls suited to the fact that they are operating on someone’s behalf.

This is the administrative signature of a new actor.

We build identity systems around entities that can do things.

A calculator does not need a corporate identity because it does not open an account, send an invitation, modify a repository, or enter a transaction on its own. An agent connected to those systems does.

The identity may belong legally to the company or user. The agent may merely inherit delegated authority. But the infrastructure still needs to distinguish this process from that one, this permission from that permission, this principal from that principal.

The economy is learning to give software a badge.

Badges imply doors.

Doors imply boundaries.

Boundaries imply governance.

The most revealing part of the transition may therefore be permissions rather than intelligence.

A model can be extraordinarily capable and economically inert if it cannot touch the world. Give a less capable model access to email, files, calendars, code, payment systems, procurement software, customer records, or industrial controls, and its practical significance rises sharply.

Capability determines what an agent can understand.

Authority determines what it can change.

The combination creates agency.

This is why the design of permissions will shape the economic impact of agents as much as model quality does. If every external action requires a human click, the system remains close to an advanced tool. If routine actions can proceed automatically within narrow limits, delegation becomes real. If broad credentials are granted without strong boundaries, delegation becomes dangerous.

Organizations will learn to create machine versions of familiar human arrangements.

Spending limits.

Approval thresholds.

Read-only roles.

Segregation of duties.

Temporary credentials.

Dual control.

Escalation rules.

Audit logs.

Probationary access.

The terminology will sound bureaucratic because bureaucracy is what societies invent when agency scales.

There is an irony here. For years, the technology industry imagined artificial intelligence mainly as a problem of making machines think. The first large economic consequences may depend just as much on making machines legible to institutions.

Who sent this?

On whose authority?

Using which data?

Under what limit?

What changed?

Who can reverse it?

Who is responsible if it was wrong?

These are not questions about the model’s inner life. They are questions about the surrounding system.

The answer to “when does a tool become an actor?” is therefore not a date and not a benchmark.

It happens gradually, each time we move another decision from the user’s hand into the delegated loop.

At first the agent drafts but does not send.

Then it sends routine messages but asks before unusual ones.

Then it manages a queue.

Then it negotiates within a price band.

Then it purchases within a budget.

Then it hires another service.

Then it monitors the result and tries again.

At every stage, the system becomes more valuable because the principal can be absent for longer.

At every stage, the consequence of misunderstanding rises.

This is the bargain inside agentile economics.

The principal gains distance.

The agent gains discretion.

The firm gains throughput.

The system gains a new place where judgment can fail.

The important economic question is not whether we should allow this transition. It is already occurring wherever organizations connect models to tools and give them permission to pursue goals across multiple steps.

The important question is where the decision boundary should sit.

Too narrow, and the agent becomes an expensive autocomplete surrounded by approval dialogs.

Too broad, and the principal discovers that delegation can move faster than supervision.

Finding the useful boundary will become a craft. It will differ by domain, reversibility, regulation, error cost, and trust. Sending a calendar invitation is not wiring money. Editing a draft is not deploying production code. Comparing insurance policies is not binding coverage. Reading a medical record is not prescribing a drug.

The best agentile systems will not maximize autonomy.

They will allocate it.

Low-risk, reversible work will flow.

High-consequence work will slow down.

The agent will know when it has authority and when it has reached the edge.

This is not a retreat from the idea of agents. It is what makes agents economically usable.

Human organizations already operate this way. Good managers do not either micromanage everything or abandon all control. They define domains of discretion. Good financial systems do not require the chief executive to approve every expense or allow every employee to empty the treasury. They create limits. Good institutions do not eliminate judgment. They place it.

Agents make that old problem computational.

And once it becomes computational, it becomes scalable.

That is the threshold this book is interested in.

The tool waited for the hand.

The actor can be given the errand.

The economy changes when the errand keeps moving after the hand lets go.
