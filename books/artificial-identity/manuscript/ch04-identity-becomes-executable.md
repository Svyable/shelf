# Identity Becomes Executable

On February 5, 2026, the National Institute of Standards and Technology published a concept paper with a title that would have sounded strangely specialized outside a security conference only a few years earlier:

*Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization.*

The document was bureaucratic in the best sense. It did not speculate about whether artificial intelligence would become conscious, demand rights, or replace human institutions. It focused on a smaller problem that becomes urgent precisely because software does not need any of those things in order to matter.

AI agents were beginning to access data, applications, and tools.

Who, then, was the actor?

What was it allowed to do?

On whose behalf was it acting?

How should the action be audited?

How should a system distinguish the software agent from the human or organization that authorized it?

What evidence should survive afterward so that someone can reconstruct what happened?

These are identity questions with verbs attached.

That is the threshold this chapter is about.

For most of this book so far, the artificial identity has been something a system consults. A profile contains attributes. A model makes predictions. A score influences a decision. The representation participates in what happens to the person.

Delegated software changes the direction of travel.

Now the representation can help determine what happens *from* the person.

A system may draft, schedule, query, purchase, reserve, submit, transfer, configure, approve, decline, or call another system. It may carry credentials. It may be allowed to read a calendar, send a message, access a file, invoke an API, or make a transaction.

The machine-made version of you is no longer only being read.

It is being executed.

The idea of acting through a representative is ancient.

A merchant sends an agent to negotiate in another city. A lawyer files papers for a client. An employee signs within the scope of a job. A parent acts for a child. A trustee administers assets for beneficiaries. A person grants power of attorney. A corporate officer acts for a legal entity that cannot walk into a room on its own.

Civilization learned long ago that delegation requires boundaries because representation creates leverage and ambiguity at the same time.

The representative needs enough authority to be useful.

Too little authority and nothing gets done.

Too much authority and the principal inherits risks they may not understand.

Law developed doctrines around agency, fiduciary obligation, apparent authority, ratification, scope, and responsibility because a simple sentence — *she was acting for him* — can conceal a great deal.

Software inherited the same problem before artificial intelligence arrived.

A payroll system acts on stored instructions. A travel-booking system can purchase within policy. A service account can access cloud resources. An automation can move data between applications. A payment processor can execute transactions according to rules. OAuth lets users authorize applications to access protected resources without handing over a master password.

The modern internet already depends on machines acting for people and organizations.

What current AI systems add is not delegation itself.

They add flexibility at the exact point where older delegated systems tried to reduce ambiguity.

Traditional automation is often useful because the intended path is narrow.

If this invoice matches these conditions, route it here.

If the customer requests a reset and passes these checks, send the link.

If the calendar event contains this label, copy it to that system.

A language-driven agent can be asked something more open ended:

Find a reasonable flight, avoid the red-eye, keep the total under the company limit, preserve enough time to reach the meeting, and use my usual preferences.

The instruction sounds ordinary because a human assistant would understand it as ordinary.

For software, it contains a thicket of identity.

What counts as reasonable?

Which preferences are actually yours rather than habits inferred from recent behavior?

Does the company limit apply before or after fees?

Can the agent choose a more expensive ticket to satisfy a time constraint?

Which loyalty account should it use?

May it spend money without another confirmation?

If the preferred flight disappears while the agent is working, how much discretion survives the changed circumstances?

Does the instruction authorize booking only, or can the agent also move the meeting?

If another agent controls the calendar, may the travel agent negotiate with it?

The difficulty is not that the software lacks a name.

The difficulty is that authority is contextual.

A credential says what a system can technically access.

Intent says what the principal meant the system to do.

Those are not the same thing.

This gap is old in computer security. People regularly grant applications permissions broader than the immediate task because software platforms expose capabilities in coarse bundles. A photo editor may ask for access to an entire library when the user wants to modify one image. A calendar integration may receive ongoing access when the user thinks in terms of one scheduling task.

Agentic systems make the gap more visible because the software is designed to decide among multiple possible actions after authorization has already been granted.

The permission is static.

The plan is dynamic.

That is why identity becomes executable only when representation and authorization meet.

A software agent with no model of the user may have permission but little basis for judgment.

A highly personalized model with no permission may understand preferences but remain unable to affect the world.

Combine memory, prediction, tools, and credentials, and the artificial identity begins to function as a representative.

Not a legal person.

Not a human duplicate.

A representative.

The distinction between representation and impersonation becomes crucial here.

In 2020, the Internet Engineering Task Force published RFC 8693, the OAuth 2.0 Token Exchange specification. The document predates the present wave of agent enthusiasm, but it contains a distinction that is suddenly useful outside identity architecture.

It describes both impersonation and delegation.

In an impersonation case, one subject is effectively authorized to act as another within the rights represented by a token. In a delegation case, the actor's identity remains relevant: the actor is performing an action on behalf of another subject.

Those may sound like technical nuances.

They are really different stories of responsibility.

If software acts *as you*, logs and downstream systems may have difficulty distinguishing the representative from the principal.

If software acts *for you*, the chain can preserve both identities: who ultimately authorized the work and which actor actually performed it.

That difference becomes more valuable as agents become more autonomous.

Imagine a purchase that goes wrong.

If the transaction record says only that your account bought the item, the system has collapsed principal and actor into one identity.

If the record says that a specific software agent, operating under a particular delegated grant from your account, placed the order at a certain time with a certain scope, then the event has structure.

You may still be responsible.

The merchant may still be entitled to rely on the authorization.

But the infrastructure can distinguish the human principal from the software actor.

That distinction is not a minor logging preference.

It is the beginning of accountability in a world of executable identities.

The Model Context Protocol offers a more recent example of the same problem appearing in current AI infrastructure. Its authorization specification uses OAuth-based mechanisms for clients accessing protected resources on behalf of resource owners.

The important phrase is *on behalf of*.

An AI application that can reach a protected server needs more than intelligence. It needs a recognized relationship between the client, the resource, and the principal whose authority makes access legitimate.

This is where popular language about AI assistants can become dangerously vague.

We say, “my AI booked it.”

Technically, many things may have happened.

A language model may have generated a plan.

An agent framework may have selected a tool.

A client may have used an access token.

A remote service may have enforced scopes.

A merchant may have accepted a transaction.

A human may have approved one step and delegated another.

The phrase *my AI* compresses the entire authority chain into a possessive adjective.

Convenient language can hide inconvenient architecture.

The OpenID Foundation and NIST began treating this as a live standards problem because interoperability makes the chain harder, not easier.

A single application controlled by one company can keep a great deal of context internally.

An ecosystem of agents, tools, identity providers, resource servers, and external services needs portable signals about who is acting and under what authority.

The moment software can hand work to other software, delegation becomes recursive.

An assistant asks a travel agent to find options.

The travel agent asks a mapping service for transit time.

It asks a calendar service whether the meeting can move.

It asks a payment service to reserve the fare.

Perhaps one of those services invokes another specialized agent.

This sounds efficient because it is.

It also raises an old question in a new form:

How far down the chain does the original permission travel?

The principal may have intended, *book me a flight*.

The software may infer that it should also purchase an airport transfer.

The transfer service may infer that it should share arrival details with a driver.

Each step can be locally reasonable while the total path exceeds what the person imagined when they gave the initial instruction.

Authority drift does not require malice.

It can arise from helpfulness.

This is one of the most important changes agentic AI introduces into identity.

Older security models often feared the unauthorized actor.

Executable artificial identity adds the problem of the authorized actor doing something outside the principal's intended context.

The credentials are valid.

The agent is legitimate.

The action may even be rational given the information available.

The dispute is about whether the representation of the user's intent was faithful enough to justify the action.

That is a harder problem than stolen passwords.

A stolen credential is unauthorized by definition.

A delegated agent can be authentically authorized and still misunderstand.

The system therefore needs more than authentication.

It needs a theory of mandate.

Again, this is not unique to machines.

Human assistants misunderstand instructions. Lawyers exceed client expectations. Employees make judgment calls. Agents in commerce face unforeseen circumstances. We tolerate delegation because requiring the principal to personally approve every microscopic step would destroy the value of having a representative.

The challenge is to decide where discretion is acceptable and where the system should return to the principal.

A good human assistant learns this boundary socially.

They may know that buying a normal train ticket is routine but changing a family vacation is not. They may know that a ten-dollar difference does not require a phone call while a thousand-dollar difference does. They learn which preferences are firm, which are casual, which are stale, and which decisions carry emotional weight that no expense policy captures.

A software agent needs some computational substitute for that judgment.

This is where artificial identity and memory collide.

An agent that represents you well enough to act must carry some model of what matters to you.

That model may include explicit rules:

Never spend more than this amount without confirmation.

Do not send messages to these people automatically.

Always ask before sharing medical information.

It may include preferences:

Aisle seat.

Quiet hotel.

Avoid early meetings.

It may include inferred patterns:

Usually chooses refundable fares.

Often rejects restaurants without outdoor seating.

Tends to postpone low-priority meetings rather than cancel them.

The agent becomes more useful as these representations improve.

It also becomes more capable of carrying forward an outdated version of the person.

A preference can become a policy by accident.

A temporary behavior can harden into memory.

An old constraint can survive after the reason disappears.

The human user may not even know which remembered facts are influencing the agent's choices.

This is the executable version of a problem we saw earlier with recommendation systems.

A recommender can overlearn yesterday's taste and keep showing it to you.

An agent can overlearn yesterday's preference and spend money on it.

The difference is consequence.

Memory that shapes a suggestion is one thing.

Memory that authorizes an action is another.

A mature agent system will therefore need to treat preferences, memories, credentials, and permissions as different kinds of state.

A remembered preference should not automatically become an authorization.

An authorization should not automatically imply a preference.

A successful action should not automatically prove the agent understood the human.

These distinctions are obvious when written separately. They become easy to blur inside a system optimized to complete tasks smoothly.

Smoothness is seductive.

Every confirmation screen makes an agent feel less autonomous.

Every additional authentication step creates friction.

Every time the system asks, *Are you sure?*, part of the product promise weakens.

The commercial pressure will be toward fewer interruptions.

The safety pressure will often be toward more visible boundaries.

Good design will have to decide which actions deserve friction.

Security already has a useful concept here: least privilege.

Give an actor only the access it needs for the task, not every capability the principal possesses.

An agent booking a restaurant does not need access to tax records.

An agent summarizing email does not automatically need permission to send mail.

An agent preparing a purchase can be allowed to build a cart without being allowed to charge a card.

A financial assistant may be allowed to read balances and model scenarios while requiring explicit approval before moving money.

The principle is simple.

Its implementation becomes difficult when tasks are open ended.

If the agent discovers halfway through a trip-planning task that a visa requirement depends on passport information, should it request additional access? Probably.

If it discovers that a meeting could be moved to save five hundred dollars, should it gain calendar-write permission automatically because changing the meeting seems instrumental to the original goal? Probably not.

The difference rests on intent and consequence rather than technical capability alone.

This is why step-up authorization matters.

An agent can begin with a small scope and ask for more authority only when a concrete need appears.

That preserves something human delegation often relies on: graduated trust.

You do not give a new assistant every key on the first morning.

The same principle can apply to software.

Revocation matters for the same reason.

Permission should be capable of ending.

A person may stop using an agent.

A company may terminate an employee.

A device may be compromised.

A task may be complete.

A relationship may change.

An executable identity whose authority cannot be cleanly revoked is not a representative. It is a liability.

Audit matters because mistakes will happen even in good systems.

A useful record should help answer not only *what happened?* but also *which actor did it, under whose authority, with what scope, and after which approvals?*

NIST's 2026 concept paper explicitly places auditing and non-repudiation beside identification and authorization because agent systems stretch all four concepts at once.

The more autonomous the software, the more valuable the trail.

But audit also creates its own identity problem.

A perfect record of every action, instruction, inference, and preference can become a deeply revealing biography of the person whose agent was trying to help.

Accountability asks for retention.

Privacy sometimes asks for deletion.

Security asks for enough evidence to investigate abuse.

Personal autonomy asks for the ability to move beyond old instructions.

These goals can conflict.

Artificial identity does not resolve the conflict.

It makes the conflict unavoidable.

The most dangerous mistake would be to treat executable identity as merely a security problem.

Security can answer whether the agent had a valid token.

It cannot, by itself, answer whether the human should have been asked again.

It can verify that a scope included permission to purchase.

It cannot decide whether the user intended the permission to cover a replacement item twice the normal price.

It can record that an agent sent a message.

It cannot determine whether the remembered tone preference still reflected how the person wanted to speak to a grieving friend.

The identity of a representative is partly about authority and partly about judgment.

Current AI systems make that visible because they are probabilistic at the point where ordinary software is usually deterministic.

A calculator executes a defined operation.

A language-driven agent interprets.

Interpretation is where the artificial identity enters the action.

The agent must form some working model of the principal's request, priorities, and tolerances.

That model can be excellent and still incomplete.

The better it becomes, the more tasks we will be tempted to delegate.

Competence again creates dependence.

This is the same pattern that made recommendation systems powerful.

A bad recommender gets ignored.

A good one receives attention.

A bad agent receives no credentials.

A good one receives a calendar, inbox, payment method, workspace, or account.

The most consequential artificial identities will not be the systems that imitate people badly.

They will be the systems that represent people well enough to earn permission.

That is why the future fight will not be only about whether an AI can impersonate you.

Impersonation is the obvious threat. A criminal voice clone, stolen credential, or synthetic video creates a counterfeit representative.

The subtler problem is legitimate delegation.

The system really is yours.

The token really is valid.

The remembered preference really came from an earlier conversation.

The action really does pursue the goal you stated.

And yet the result is not what you meant.

No one broke in.

Nothing was forged.

The artificial identity simply acted from an imperfect model of the human principal.

We do not solve that problem by demanding that the agent become conscious enough to understand us completely.

We solve it institutionally.

Preserve the difference between principal and actor.

Grant narrow authority before broad authority.

Escalate when consequence rises.

Make revocation real.

Keep enough of the authority chain to reconstruct an action.

Let preferences expire when they should.

Treat memory as evidence, not destiny.

And resist the product instinct to equate fewer interruptions with greater intelligence.

A representative that knows when to return a decision to the person may be more useful than one that completes every task alone.

The deepest point is simpler.

Identity used to sit mostly on the noun side of computing.

User.

Account.

Credential.

Profile.

Subscriber.

Record.

Agentic systems move identity toward the verb.

Book.

Send.

Buy.

Change.

Approve.

Share.

Delegate.

The machine-made representation becomes consequential not only because systems believe things about you, but because those beliefs can now travel with authority into action.

That is what it means for identity to become executable.

The machine does not need a self.

Permission is enough.
