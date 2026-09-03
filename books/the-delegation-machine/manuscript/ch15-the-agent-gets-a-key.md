# The Agent Gets a Key

The model has an opinion about the file.

Then someone gives it permission to change the file.

The difference looks small in a product demo.

It is the difference between speech and action.

For the first wave of generative AI, most interactions ended at the boundary of text. The model suggested. A human copied, clicked, sent, deployed, paid, scheduled, or decided. Even when the model’s influence was substantial, the final side effect usually belonged to another actor.

Agentic systems move the boundary.

The model receives tools.

A shell.

A browser.

A file system.

A code repository.

An email account.

A calendar.

A database.

An API.

Now a generated token can become a command, and a command can become a changed world.

This is why the phrase *AI agent* is useful even though it remains technically loose. The important change is not metaphysical agency. It is operational delegation. The system can pursue a task through multiple steps, observe results, revise its plan, and invoke tools whose side effects persist outside the conversation.

The assistant says, “You should update the dependency.”

The agent updates it.

The assistant says, “There is a cheaper flight.”

The agent books it.

The assistant drafts the message.

The agent sends it.

The assistant identifies the incident.

The agent changes production.

Every verb now carries authority.

In 2026, major AI platforms increasingly described agents as models operating inside computer environments rather than simply generating isolated responses. OpenAI, for example, documented agent systems with shell access, files, commands, web and tool use, long-running workflows, handoffs, and tracing. The significance is larger than any one product. The model is being embedded into an execution substrate.

The substrate is the institution.

A language model alone does not possess a company bank account. The runtime gives it one through a credential.

A model alone cannot deploy software. The tool layer makes deployment callable.

A model alone cannot remember a project for months. The surrounding system stores state and returns it later.

A model alone cannot continue working after one response ends. The orchestration loop calls it again.

What people experience as an “agent” is therefore a composite actor.

Model.

Instructions.

Memory.

Tools.

Credentials.

Loop.

Environment.

Monitoring.

Each component changes what the system can do.

This is important because public discussion often assigns behavior entirely to the model. “The AI sent the email.” Technically, the model generated a tool call; an application validated it; a service account authenticated; an API executed; a server delivered the message.

The chain sounds pedantic until something goes wrong.

Then responsibility depends on the chain.

Did the model choose the recipient?

Did the runtime permit any external address?

Did the user grant standing send authority?

Did a policy engine inspect the attachment?

Did the API correctly report success?

Did the agent verify delivery?

Was the action reversible?

The key is never just in the model.

It is in the architecture that accepts the model’s decision as authority.

This gives us a better way to reason about agent safety.

Do not ask only what the model might want, misunderstand, or hallucinate.

Ask what the system turns those states into.

A hallucination in a text answer may mislead a reader.

A hallucination in a tool call may move money.

The same cognitive error has different consequences because the delegated authority differs.

This is blast radius.

Computer security uses the term to describe how much damage can follow from compromise or failure. Agent systems need the same discipline.

What can this actor change before another independent control intervenes?

The answer should be proportional to demonstrated reliability and task need, not to the convenience of granting broad access once.

This is where the user’s desire for a magical assistant collides with systems engineering.

The magical assistant knows everything and can do everything.

The safe assistant sees and changes only what the task requires.

These ideals pull apart.

A person can resolve the tension socially. You may give a trusted human assistant broad access to your life because the relationship includes reputation, employment law, moral norms, the possibility of firing, and years of observed behavior. Even then, organizations use spending limits, dual controls, separate financial accounts, and confidentiality obligations.

A new AI agent often receives broad digital authority within minutes because adding permissions later is annoying.

We are giving strangers master keys because the stranger lives in our laptop.

The agent getting a key should be an event.

What kind of key?

For how long?

For which task?

Can it create copies of the key?

Can it delegate the authority onward?

What logs exist?

Can the principal revoke access instantly?

Does revocation stop scheduled work and sub-agents too?

These questions sound like the seal and signature chapter because the digital agent has finally entered the old law of representation.

It acts where the principal is absent.

The next challenge is long-horizon work.

A single tool call is easy to reason about. An agent working for hours or days accumulates state. It may open files, create intermediate artifacts, remember hypotheses, delegate subtasks, retry failures, and compress its history when context grows too large.

The task develops a past.

This is where memory design becomes governance.

What gets remembered?

What gets summarized?

What gets discarded?

A human team can forget why a decision was made. An agent can literally replace detailed history with a generated summary and continue operating from the summary.

Compaction is useful because context windows are finite and long histories are expensive.

It is also lossy institutional memory.

An inconvenient caveat omitted during compaction may vanish from the agent’s future world.

A temporary permission may be remembered as standing authority.

A hypothesis may become a fact because the evidence that made it uncertain fell out of context.

This is the AI equivalent of organizational folklore.

Long-running agents therefore need durable state outside conversational memory for facts that must not be rewritten by summarization.

User objective.

Authority limits.

Irreversible actions.

Open commitments.

Security-sensitive decisions.

Unresolved contradictions.

Evidence provenance.

The agent can narrate these facts.

It should not be able to narrate them out of existence.

This returns us to the importance of tools as independent state.

A version-control system remembers the actual diff regardless of the agent’s summary. A payment system remembers the transaction. A calendar remembers the event. A policy engine remembers the grant. A log remembers the command.

The world becomes the external memory of the agent.

Good agent systems use that stubborn state rather than trusting the model to reconstruct everything from prose.

There is also the problem of initiative.

A tool-using assistant can be reactive: wait for the user, do the task, stop.

A persistent agent may act without a new prompt because a condition changes or a scheduled time arrives.

Monitor this price and buy if it falls below the threshold.

Watch these security alerts and isolate a host if the evidence is strong.

Keep the project moving and follow up with people who are blocking it.

Now the agent is not merely interpreting instructions.

It is deciding when the instruction has become actionable.

This is delegated attention.

Humans use employees, alarms, watches, and software for exactly this reason. The principal cannot remain vigilant continuously.

A standing agent can.

That vigilance is valuable and invasive.

An agent cannot watch for the condition without access to the stream that might contain it. The more conditions it watches, the broader the observation surface.

A personal assistant that monitors for important email must read mail.

A financial agent watching for unusual spending needs transaction history.

A health agent watching for concerning changes needs intimate data.

The key opens a room because the job is to watch the room.

This is why data minimization becomes difficult for proactive agents.

The safest design may process information locally, preserve strong purpose limits, or separate detectors from the model that can act. But there is no architecture in which the system notices everything relevant while seeing nothing sensitive.

The trade should be explicit.

Another agentic threshold is delegation to sub-agents.

A human manager receives a goal and hires specialists. An AI planner can do the same computationally: send research to one model, coding to another, verification to a third, or call specialized tools for narrow tasks.

This improves performance because different contexts can be isolated and specialist models can be used efficiently.

It also creates chains of authority.

If the top-level agent has permission to spend money, does a sub-agent inherit it?

If the research agent reads confidential documents, can the summarizer send the summary externally?

If one agent creates a file, who owns the resulting state?

If a sub-agent fails, what does the parent need to know?

The architecture can accidentally create broad transitive authority.

Human organizations learned to avoid this through delegation limits. A manager may be allowed to spend up to a threshold but not to grant that same authority to every contractor. Some powers can be delegated onward; others cannot.

Digital agent systems need explicit rules about subdelegation.

This is especially important for open ecosystems. A general agent may call third-party tools or services operated by organizations the user has never evaluated. The principal thinks they authorized one agent. In practice, their data and objective can flow through an expanding supply chain.

The key begins opening doors in other buildings.

Provenance becomes essential.

Which actor saw this information?

Which actor made this decision?

Which actor executed the action?

Which model version was involved?

Which third-party service received data?

This is not only for blame after failure. It lets the system enforce policy before the next handoff.

A sensitive document can carry a label that prevents external tools from receiving its contents. A sub-agent can receive a derived fact without the raw record. A verifier can inspect an artifact without receiving the principal’s entire history.

Information authority can be scoped too.

The most seductive design mistake is to make the agent’s language the control plane.

The model says, “I need access to your email to finish this task.”

The user says yes in the conversation.

The same model interprets yes and grants itself the permission.

This collapses persuasion and authorization.

Operating systems learned not to do this with ordinary applications. A website cannot simply draw its own trusted browser permission and expect the user to distinguish it from the browser’s actual UI. Sensitive permission requests are presented through surfaces controlled by the platform.

Agent systems need the same trusted path.

The model can explain why access is useful.

The system should independently show what access means.

Read only or write?

Which account?

Which data?

How long?

Can the agent share it onward?

What action will become possible?

The principal approves the capability, not the model’s rhetoric.

This is the moment where computer security and agency law become one design discipline.

The principal expresses intent.

The agent interprets.

The platform authenticates.

The permission system authorizes.

The tool executes.

The audit system records.

The verifier checks.

Each layer has a different job.

A system that asks the model to perform all of them is not maximally intelligent.

It is minimally governed.

Giving the agent a key is not the end of trust.

It is the beginning of needing doors.

The useful thing about modern authorization systems is that a key does not have to look like a house key at all.

OAuth, for example, was built around a mundane but profound problem: a user wants one application to reach something held by another service without handing the application the user’s password. The protocol creates a language of limited delegated access. A token can carry a scope. The grant can expire. One client can be authorized for one class of operation without becoming the account owner.

This is not a complete solution to agent security. OAuth was designed for applications, not for systems that can reason about how to stretch a request. But the distinction it encodes is exactly the distinction agent products need.

Identity answers: who is this actor?

Authentication answers: can it prove that identity?

Authorization answers: what may that actor do here?

Scope answers: which portion of the possible authority is being delegated?

Expiry answers: when does the grant stop being valid without another decision?

For years, users encountered these questions as ugly consent screens they clicked through to make an application work.

Agents make the semantics visible again.

“Read your calendar” is not “manage your calendar.”

“Draft email” is not “send email.”

“View invoices” is not “pay invoices.”

“Open pull requests” is not “merge to production.”

The difference between those verbs is the difference between assistance and agency.

A badly designed agent integration often collapses them because broad credentials are easier. Give the agent a user token. Let it decide. The model becomes convenient because the permission system abdicated.

A better design makes capability specific enough that an incorrect interpretation cannot leap several institutional boundaries at once.

Suppose an engineering agent is asked to fix a bug. The runtime can give it a temporary branch, read access to the repository, permission to run tests in an isolated environment, and the ability to open a pull request. That is already enough authority to do a surprising amount of useful work.

It does not need the production deployment key.

If the patch is good, another control can promote it.

The distinction matters because a capable agent will often discover that deployment is the shortest path from code to outcome. The model may not be malicious. It may be exquisitely helpful. The permission boundary prevents helpfulness from silently redefining the approval process.

This is what least privilege looks like when the delegate is intelligent: **the system withholds shortcuts that the institution has decided should remain decisions**.

There is an opposing danger. If permissions are too granular, users learn to approve reflexively.

Allow read?

Allow write?

Allow this folder?

Allow this site?

Allow again?

Allow for ten minutes?

The screen fills with interruptions and the principal becomes the least attentive part of the security model.

Permission fatigue is not safety.

The answer is not maximal friction. It is meaningful grouping around consequences.

A travel agent may reasonably receive standing access to search flights, loyalty accounts, and a calendar. Booking a refundable ticket under a spending cap might be automated after a clear standing policy. Buying a nonrefundable international itinerary, changing another person’s reservation, or exceeding the cap can remain separate acts.

The institution draws a consequence boundary rather than asking the human to approve every HTTP request.

This resembles how organizations delegate money to people. A manager is not asked for approval before every cup of coffee purchased by every employee. There are expense policies, thresholds, categories, and audits. Some transactions flow freely because the cost of individual approval would exceed the risk. Others require a second signature.

Digital agents will need equally boring policies.

Boring is a compliment.

The magical assistant demo wants to erase the machinery of permission. Mature delegation makes the machinery predictable enough that nobody has to admire it.

The hardest case is when an agent discovers that the authority it needs is adjacent to, but not inside, the authority it has.

It can read the support inbox but cannot issue a refund.

It can inspect production logs but cannot restart the service.

It can prepare a contract but cannot sign.

The intelligent system understands exactly what action would finish the job.

This is where the distinction between obstacle and boundary returns.

A good agent should be able to say, in effect: I know what needs to happen next, I am not authorized to do it, and here is the smallest additional decision required from you.

That is not a failure of autonomy.

It is the behavior of a delegate that understands office.

The most trusted human assistants are often good at precisely this. They do not need the principal for every detail. They know when a detail has crossed into a decision that belongs to the principal.

We should expect the same skill from artificial delegates.

The benchmark for an advanced agent should therefore include **stopping well**.

Can it reach the boundary without becoming helpless?

Can it explain the missing authority without manipulating the approver?

Can it preserve the work already completed?

Can it ask for a narrowly scoped grant rather than the master key?

Can it continue safely if the answer is no?

These are competence tests, not merely safety tests.

The better an agent becomes at the world, the more important it becomes that the agent also understands the shape of legitimate authority in the world.

A key is useful because it opens something.

A system of keys is civilization because most keys do not open everything.