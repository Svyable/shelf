# The Seal and the Signature

The stranger does not care what you privately intended.

The stranger wants to know whether the person in front of them can make a deal.

This is the public side of delegation. Inside a household or company, principals and agents can argue about instructions. Outside, another party has to decide whether an action counts.

Can this person sell the horse?

Can this broker accept the price?

Can this employee order the equipment?

Can this officer sign the contract?

Can this software process move the money?

Can this AI agent accept the vendor’s revised terms?

Authority is useless if nobody can recognize it.

That recognition problem produced some of the oldest technologies of representation: seals, marks, letters of introduction, signed instructions, titles, uniforms, badges, powers of attorney, company letterhead, notarial acts, corporate resolutions, and later the digital machinery of accounts, certificates, tokens, and cryptographic signatures.

A seal does not create trust from nothing.

It compresses a relationship into an object.

The object says, in effect: treat this act as connected to that principal.

This is extraordinarily convenient. It is also the beginning of impersonation.

The moment authority becomes portable, authority can be stolen.

A person can forge a signature. A thief can take a seal. An employee can exceed a mandate while still wearing the title. A compromised account can send authentic-looking messages. An AI agent with access to the principal’s credentials can speak from inside the principal’s digital skin.

The entire history of delegated authority lives between two failures.

Too little portability, and nobody can act without the principal being present.

Too much portability, and possession of the symbol becomes equivalent to possession of the principal.

Law has developed unusually precise language for this territory.

Agency doctrine asks when one actor is authorized to act on behalf of another and when the principal is bound by the result. The details vary by jurisdiction and context, but a useful distinction separates actual authority from apparent authority.

Actual authority concerns the authority the principal really gave, expressly or by implication.

Apparent authority concerns what a third party can reasonably infer from the principal’s conduct.

The difference is not academic.

Imagine a company sends an employee to a trade show with the title “Director of Procurement.” Internally, the employee may have instructions not to commit more than a certain amount. A vendor does not see the private memo. The vendor sees the title, the company email address, prior dealings, and the employee’s behavior. If the company has created a reasonable appearance that this person can transact, the law may care about that appearance.

Delegation therefore has two boundaries.

The private boundary: what did the principal mean to permit?

The public boundary: what did the principal cause others to believe was permitted?

Digital systems often concentrate on the first because computers like explicit access control. This account may call this endpoint. This token may read these files. This user may approve payments below this amount.

AI agents make the second boundary important again because they communicate with humans and institutions in natural language.

A model can possess narrow technical permission and broad social appearance.

Suppose an agent can send email but cannot directly execute a bank transfer. It writes to finance, from the chief executive’s account, “Please wire the funds to the updated account below. This is approved.”

Technically, the model lacked payment permission.

Socially, it exercised payment authority through another person.

The access-control system checked the wrong boundary.

This is not a reason to panic about every email-writing agent. It is a reason to understand that delegated authority can move through people as well as APIs.

Security engineers call the human route social engineering.

Agency law calls part of the problem representation.

Management calls it escalation.

The vocabulary differs because each field sees a different slice of the same structure: one actor uses signs of authority to cause another actor to do something consequential.

The seal has become a sender address.

The signature has become a session.

The uniform has become an authenticated interface.

And the delegate can talk.

That combination is new enough to require design.

For most of software history, authentication answered a relatively narrow question: who or what is making this request?

Authorization answered: is that identity allowed to perform this operation?

In a world of agentic systems, we need a third question more often:

On whose behalf is this operation being performed, and what should another human or system infer from that representation?

This is the problem of agent identity.

Consider a shared corporate inbox.

If a human employee sends from it, recipients may assume a person reviewed the message. If an AI drafts a reply and a human approves it, that assumption remains mostly intact. If an AI autonomously replies under the same address, the communication channel has changed without changing its face.

Whether that matters depends on the context.

For “Your ticket has been received,” perhaps not.

For “We agree to the settlement,” very much.

The safest systems will not treat all language as equally binding merely because it came through an authenticated account.

Human organizations already have conventions for this. Some documents require specific signatories. Some purchases need dual approval. Some communications are explicitly nonbinding. Some roles can negotiate but not commit. Lawyers mark drafts. Banks use transaction limits. Corporate bylaws distribute signing authority.

The distinction between speech and act is managed institutionally.

AI interfaces should preserve it.

A conversational agent can discuss an action without possessing the power to perform it.

A tool call can prepare a transaction without finalizing it.

A system-generated approval surface can show the exact consequence before authorization.

These layers prevent the model’s eloquence from becoming invisible authority.

OAuth, one of the modern web’s central authorization frameworks, embodies a related idea. It allows a third-party application to obtain limited access to an HTTP service rather than simply asking the user to hand over the master password. The user can authorize a narrower relationship. In principle, the application receives only the access needed for its function, and the grant can be revoked.

The design is so familiar now that its philosophical importance disappears.

Do not give the delegate your identity.

Give the delegate a scoped capability.

That is a profound improvement over impersonation.

The difference resembles the old distinction between giving someone your seal and giving them a letter saying exactly what they may do.

Modern systems can make the letter machine-enforceable.

Read these photographs, but do not delete them.

See calendar availability, but not event details.

Send a draft to this approval queue, but do not send externally.

Spend up to fifty dollars in this category, but not transfer funds elsewhere.

Access this repository for one hour.

The delegate receives authority shaped like the task.

This is least privilege expressed through infrastructure.

The problem is that users and developers constantly want broader grants because broad grants reduce friction.

An agent that can “handle everything” needs access to everything.

A personal assistant becomes more useful when it can read email, calendar, files, contacts, purchases, messages, and travel accounts. An enterprise coding agent becomes more powerful when it can inspect repositories, deploy environments, issue trackers, observability systems, and cloud consoles.

The general agent wants the master seal back.

This creates one of the central tensions in agent design.

Generality and scoped authority pull in opposite directions.

You can solve the problem partly through just-in-time permissions. Let the agent see broadly but require temporary grants for high-impact action. Or let it request specific capabilities when a task reaches them. Or place sensitive actions behind deterministic services that enforce business rules the model cannot reinterpret.

Every approach has tradeoffs.

Repeated permission prompts annoy users and train them to approve automatically. Broad standing access creates large blast radius. Narrow tools make some tasks impossible. Human approval creates latency. Fully automated approval returns us to the question of who supervises the supervisor.

The right answer is not one global rule.

It is a graduated theory of consequence.

Reading a public webpage is not the same as sending a wire.

Drafting a calendar event is not the same as firing an employee.

Creating a pull request is not the same as deploying to production.

Reordering printer paper is not the same as signing a lease.

The system should make these differences visible in authority.

Humans have always understood this through ceremony.

A signature ceremony feels different from casual conversation because society intentionally marks the act. A witness may be present. A notary verifies identity. A document has defined language. The friction tells the participants that the next gesture changes legal state.

Digital design spent years removing ceremony.

One click.

One tap.

Saved card.

Stay signed in.

Auto-renew.

Frictionless checkout.

For ordinary transactions this is convenience.

For agentic delegation, too much frictionlessness can erase the point at which authority changes hands.

If an agent can turn a conversation directly into irreversible action, the user may not know when brainstorming became commitment.

“I’m thinking about selling the shares” should not accidentally become an order.

“Find me something around $300” should not mean “spend any amount you interpret as around $300.”

“Tell them we can probably accept” should not become a signed agreement.

Natural language is powerful because it tolerates ambiguity.

Binding authority often needs the opposite.

This is another reason to separate the conversational layer from the authorization layer.

Let language express intention.

Let a trusted system express consequence.

The agent can say, “I’m ready to purchase this ticket for $842.17, nonrefundable, on the stored card.” The system can present the vendor, amount, refund rules, and permission independently. The user approves the structured act rather than merely continuing the conversation.

This design has an old institutional logic.

The delegate proposes.

The principal ratifies.

Ratification is another concept agency law recognizes: a principal can accept an act after the fact and thereby give it effect. In digital systems, we can often choose whether approval happens before or after action depending on reversibility.

A draft can be ratified later.

A bank transfer may need approval first.

A reversible file edit can be made and shown as a diff.

A public announcement should probably pause before publication.

The key variable is how much damage can occur before the principal can realistically correct the delegate.

This is authority over time.

A steward with power to make small purchases and report monthly operates differently from one who can sell the estate before anyone learns the papers were signed.

An AI agent with instant access to global digital infrastructure compresses time so dramatically that after-the-fact oversight can become meaningless.

By the time a human reads the log, the email has been sent, credentials rotated, trades executed, posts published, files deleted, and downstream agents activated.

Speed turns permission design into risk design.

The faster the delegate, the more important pre-action gates become for irreversible consequences.

But pre-action gates should not recreate manual labor everywhere. The art is deciding where to place them.

This is exactly what mature organizations do with approval limits. A manager can spend within a budget. Higher amounts require another signature. Routine decisions flow; unusual ones climb.

AI agents need dynamic equivalents.

Confidence may matter, but confidence alone is not enough. Models can be confidently wrong. Consequence matters more.

A low-confidence action that is easily reversible may be acceptable.

A high-confidence action that can ruin someone’s life may deserve human review.

The authorization system should care about impact, not just the model’s self-estimate.

The public side of authority also needs transparency.

When an agent contacts another person, should it disclose that it is an agent?

There is no universal answer, but the principle from apparent authority suggests a useful question: would the recipient make a materially different decision if they knew where the judgment came from?

A restaurant does not care whether a reservation request was typed by a human or assistant. A job candidate may care whether a rejection was autonomously generated. A vendor may care whether a negotiation message can bind the company. A patient may care whether medical advice was generated or reviewed.

Representation should match consequence.

This is not only about ethics. It protects principals.

If every autonomous message appears indistinguishable from deliberate human speech, organizations may create obligations they did not intend. They may also undermine trust when recipients discover the substitution later.

A new title may be needed.

“Sent by assistant on behalf of…”

“AI-generated, human approved.”

“Automated notice.”

“Agent authorized for scheduling only.”

The labels will feel clumsy before they feel normal. Titles and signatures once did too.

Institutions become legible through ritual.

AI needs ritual because capabilities are becoming invisible.

A human entering a room carries social cues about role and authority. A uniform, age, badge, location, introductions, and known relationships all help others interpret the person. Software can arrive through the same text box regardless of whether it is a toy chatbot or an agent with the ability to spend company funds.

The interface hides rank.

That is dangerous.

Users should be able to tell when the thing speaking has hands.

The difference between “I can help you draft that” and “I can execute that now” should not be buried in a tool manifest.

Authority needs a visible shape.

So does revocation.

A principal must be able to take the seal back.

Human agency relationships can end while apparent authority lingers until third parties receive notice. Digital delegation has the same problem in technical form. An employee leaves but an API token remains valid. An app is uninstalled but a refresh token survives. An agent is disabled but scheduled tasks continue. A vendor loses a contract but still has access to shared storage.

Revocation is not deleting the icon.

It is invalidating every route by which delegated authority can still act.

Agentic systems multiply those routes. An AI may create sub-agents, scheduled jobs, drafts, webhooks, delegated credentials, or external commitments. Ending the top-level session may not end the consequences.

This is why good delegation tracks lineage.

What authority did this principal grant?

What did the agent delegate onward?

What persistent artifacts were created?

Which third parties now rely on the apparent authority?

How do we unwind it?

The language sounds like legal cleanup because the technical system has become institutional.

The seal has gone digital, but the old problem remains.

A principal wants to be absent without becoming irrelevant.

The agent needs enough authority to make absence useful.

The outsider needs enough evidence to know when the agent’s act counts.

And everybody needs a way to tell when the authority has ended.

We invented seals because intention needed to travel.

We will need equally deliberate signs now that intention can travel with an intelligence attached.