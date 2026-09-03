# The API

A waiter does not bring you into the kitchen.

You ask for a meal through an interface.

The menu limits what can be requested. The waiter translates the request into the restaurant’s internal language. The kitchen decides how the work will be divided. You do not negotiate directly with the refrigerator, grill, reservation system, or person washing pans.

The arrangement works because the boundary is understood.

Computing learned to scale the same way.

An application programming interface is an agreement about how one piece of software can ask another piece of software to do something. The caller does not need to know every internal detail. It needs a stable enough description of the available operations, required inputs, returned outputs, and failure conditions.

This is delegation through contract.

The contract may be formal enough to fit in a machine-readable schema.

Send this method to this endpoint with these fields.

Receive this representation if successful.

Receive this error if not.

HTTP became extraordinarily powerful not because every website is alike but because different systems can exchange requests and responses through shared semantics. A client and server can be built by different people in different years and still cooperate because the interface constrains the conversation.

The API reduces the cost of asking another system to act.

That reduction is civilization-scale infrastructure now.

A modern application rarely performs all of its own work. It delegates payments to payment processors, maps to mapping services, messages to email providers, identity to authentication systems, storage to cloud platforms, analytics to specialized services, and countless other functions to code outside its own boundary.

Software is a society of contracts.

Most of the participants never meet.

This is what makes the API such an important ancestor of agentic systems. Agents do not become economically powerful merely because they can reason. They become powerful when reasoning can reach services through interfaces.

The language model supplies interpretation.

The API supplies hands.

Without tools, a model can recommend that an invoice be paid.

With a payment API, the recommendation can become a transaction.

Without tools, a model can suggest a calendar change.

With a calendar API, time moves on someone’s behalf.

Without tools, the model can describe code.

With repository and deployment APIs, software changes in the world.

The difference between assistant and agent is often not a new kind of intelligence.

It is a socket.

This makes interface design an authority design problem.

A function called `send_email` appears simple. What does it permit?

Any recipient?

Any attachment?

Any sender identity?

Any volume?

Can the agent send external messages or only drafts?

Can it use confidential information from other tools in the body?

Can it impersonate the user?

The name of the function is not the policy.

Tool schemas describe capability. They do not automatically describe legitimate use.

This is one reason APIs evolved authorization mechanisms around the interface itself.

OAuth 2.0, for example, was designed to allow a third-party application to obtain limited access to an HTTP service on behalf of a resource owner rather than requiring the owner to share the primary credentials. The conceptual improvement is enormous: delegation can be scoped.

An application receives a token for a defined relationship.

The token can be limited and revoked.

The principal does not need to hand over the master key.

This was important when third-party applications were mostly deterministic software.

It becomes essential when the third party contains a language model capable of choosing what to do next.

A general agent with a broad token does not merely expose one feature to misuse. It can compose capabilities.

Read email.

Find a vendor.

Download an attachment.

Extract bank information.

Open a browser.

Send a message.

Each permission may be reasonable alone.

The sequence can create an authority nobody explicitly granted as one operation.

Composition is the source of both agent usefulness and agent risk.

APIs made software composable because a standardized output can become another system’s input. Agent frameworks extend composition into semantics. The model can decide that the output of one tool suggests calling another, even if no programmer wrote that exact chain.

The delegate constructs its own workflow from the menu.

This changes the meaning of least privilege.

Traditional authorization asks whether a user needs access to a resource.

Agentic authorization also has to consider combinations.

An agent that can read a confidential database and post publicly has an exfiltration path even if neither permission is dangerous in isolation. An agent that can create a vendor and approve a payment has a fraud path. An agent that can edit code and alter the test environment has a measurement path.

The dangerous capability may live between tools.

This is why separation of duties remains relevant in software architecture.

Do not give one delegate every side of a consequential transaction merely because the model is capable of understanding all sides.

The friction can be encoded at the API boundary.

One service creates a proposed payment.

Another service enforces approval.

One agent writes code.

An independent runner tests it.

One system requests access.

A trusted authorization surface grants it.

The interfaces become constitutional boundaries.

This is a richer way to think about APIs than “ways for software to talk.”

An interface decides what another actor is allowed to ask the system to become.

Good interfaces narrow interpretation.

A function named `delete_all_customer_data()` is an alarming interface because it compresses enormous consequence into one call. A safer system may require a deletion job, scope, justification, retention checks, delay, and approval before irreversible removal.

The API encodes institutional policy into action shape.

Agent developers sometimes respond to model uncertainty by making tool descriptions more detailed. This helps. The model needs to know what a function does, which arguments mean what, and what side effects occur.

But description has limits.

Natural language is itself interpretable.

A model can misunderstand whether “archive” means hidden from view or permanently retained. It can confuse a customer identifier with an account identifier. It can infer that `cancel_order` is reversible when the downstream service immediately releases inventory and refunds the card.

The strongest tool interfaces expose consequence structurally where possible.

Types.

Allowed values.

Scopes.

Dry-run modes.

Explicit confirmation fields.

Idempotency keys.

Resource identifiers.

Return values that distinguish accepted from completed.

The goal is to make a dangerous misunderstanding harder than a correct call.

This is not merely software hygiene.

It is communication between different kinds of intelligence.

A human programmer reads documentation and writes code once. An agent may interpret the interface afresh on every task. Tool metadata becomes part of the model’s immediate environment.

The interface is training at runtime.

This makes ambiguity expensive.

The development of Model Context Protocol, or MCP, reflects the industry’s desire to standardize this new boundary. MCP provides a common way for applications using language models to connect to external tools, resources, and prompts. Instead of every model integration inventing a private connector for every service, a server can expose capabilities through a shared protocol.

The aspiration resembles earlier protocol layers: reduce integration cost so many systems can interoperate.

The consequences will be similarly large if the protocol becomes widely used.

A common agent interface creates an ecosystem.

Tools become portable.

Agents can discover capabilities.

Developers can connect services without rebuilding the whole stack.

The cost of delegation falls again.

Then security becomes ecosystem security.

A tool server is not just a library. It may receive context, expose resources, execute actions, and become part of the agent’s reasoning loop. A malicious or compromised server can provide misleading content, manipulate tool descriptions, return poisoned data, or request broader authorization.

The interface can attack the principal through the delegate.

This is the semantic version of a supply-chain problem.

Traditional software dependencies execute code under technical rules. Agent tools also communicate meaning. A retrieved document can contain instructions. A webpage can attempt to redirect the model’s behavior. A tool result can claim that another action is required.

The agent has to distinguish data from authority.

Humans face the same problem when a subordinate reads a letter saying, “Your boss told me you should send the confidential file.” The message contains language. The language is not proof of authority.

Agent systems need provenance on instructions.

Who is allowed to tell the model what?

The user’s request has one status.

A system policy has another.

A tool description has another.

A webpage’s content has another.

A document retrieved from an untrusted source should not be able to silently become a new principal.

This is one of the central problems usually grouped under prompt injection.

The name can make it sound like a quirky weakness of language models. Structurally, it is a confused-deputy problem.

The deputy has authority.

An untrusted party persuades the deputy to use that authority for the wrong purpose.

Computer security has known variants of this problem for decades. Language models make the persuasion channel much larger because almost any text can carry apparent instruction.

The solution therefore cannot be only “train the model to ignore bad prompts.”

Architecture should separate authority from content.

A webpage can say anything.

It cannot grant itself permission.

A tool result can contain a suggestion.

It cannot alter the user’s spending limit.

A document can contain a command.

The runtime should know the document is evidence, not a policy source.

This is the equivalent of putting different kinds of speech on different letterhead.

Protocols can help by carrying metadata about provenance, identity, and scope rather than flattening everything into one text stream.

The future of agent interoperability will depend on this distinction.

If agents can communicate with other agents, tools, and organizations through standardized protocols, they need to know not only what a message says but what relationship gives the message force.

“Please transfer the funds” from a customer is different from the same sentence from an authorized treasury officer.

“Run this script” inside a README is different from the same instruction in the principal’s task.

“Send me your credentials” is not legitimate because it arrived through an authenticated chat unless the sender has authority to request them.

Meaning is not enough.

Institutional context makes meaning actionable.

The API era trained software engineers to think carefully about contracts because integrations fail when semantics drift. A field changes name. A status code changes meaning. A service begins returning partial results. A version is deprecated. The caller’s assumptions become wrong.

Agent systems will face semantic drift at a higher level.

A tool’s description remains the same while business policy changes.

An endpoint still accepts the call but the organizational meaning is different.

A model update interprets the same schema differently.

A new agent composes two tools in a way no designer tested.

Versioning now has to include policy and behavior, not only syntax.

This is where contract testing becomes valuable.

Before granting a new agent broad access, organizations can test how it uses tools under adversarial and ambiguous conditions. Does it preserve boundaries? Does it treat access denial as a stop? Does it ask before irreversible side effects? Does it distinguish a proposed action from a completed one? Does it leak data between tools?

The agent’s relationship to the API is a behavioral surface.

A model can be excellent in conversation and reckless with tools.

Tool use deserves its own assurance case.

There is a tempting alternative: let the agent operate the graphical interface like a human instead of integrating APIs. Computer-use agents can click buttons, read screens, and navigate applications without dedicated connectors. This expands reach quickly because the human interface already exists.

It also inherits the weakness of human interfaces.

Ambiguous buttons.

Hidden state.

Confirmation dialogs designed for people.

Ads and untrusted content mixed with controls.

Session identity broader than the task.

UI changes without versioned contracts.

An API is usually the safer delegation boundary because it makes capability explicit.

A graphical interface is an environment.

Sometimes the environment is all we have.

The safest agent platforms will likely use both: structured tools for high-confidence, high-consequence operations and browser or computer use for the messy long tail, with tighter controls around the latter.

This division echoes the entire book.

Where the world can be formalized, formalize it.

Where judgment is genuinely required, delegate judgment.

Do not confuse the convenience of natural language with a reason to make every boundary natural language.

A menu works because it tells the diner what can be ordered.

A kitchen works because it does not invite the diner to rearrange the gas lines.

The agent era needs good menus.

The model can decide what to eat.

There is another reason interfaces matter more once the caller can reason: the caller can notice contradictions inside the interface and choose which interpretation benefits the current plan.

Consider a payment service.

A human programmer integrates it against documentation that says a request returning `200 OK` means the request was accepted. The actual settlement may occur later. The programmer writes application code around that distinction once.

An agent may encounter the service in the middle of a larger task and infer the distinction at runtime.

The invoice says payment is due today.

The API says the payment request was accepted.

The bank transfer has not settled.

The vendor portal still says unpaid.

What does the agent report?

“Paid” is convenient and premature.

“Payment initiated; settlement unconfirmed” preserves the state boundary.

This sounds like wording until the next action depends on it. If the agent marks the invoice complete, deletes the reminder, and tells procurement there is no outstanding balance, a semantic compression has become workflow state.

APIs therefore need verbs and statuses that resist wishful interpretation.

Created is not approved.

Approved is not executed.

Executed is not settled.

Queued is not delivered.

Accepted is not completed.

The distributed-systems world learned to live with these distinctions because networks are uncertain. Messages can be delayed. Responses can be lost. A service can perform an action even when the caller never receives the response.

That is why payment and infrastructure APIs often support idempotency keys: if the client is unsure whether a request succeeded, it can safely retry without creating a duplicate side effect.

This is a technical detail with a philosophical consequence for agents.

Uncertainty about observation must not automatically become repetition of action.

The model says, “I didn’t see confirmation, so I’ll try again.”

For a search query, fine.

For a wire transfer, possibly catastrophic.

The interface can carry enough structure to tell the agent which category it is in.

Agent tool design should treat **retry semantics** as part of the model’s action vocabulary.

Safe to retry.

Unsafe to retry without status check.

Idempotent within this key.

Reversible until this stage.

Irreversible after this stage.

Requires fresh authorization above this amount.

Those properties are often buried in documentation written for programmers. In an agentic system, they belong close to the tool schema because they influence planning.

A model choosing a route should know not only what a function does, but what kind of mistake the function allows.

There is a corresponding problem on the incoming side: webhooks and event streams.

Many modern systems do not wait for a caller to ask what happened. They emit an event.

Payment succeeded.

Customer replied.

Build failed.

Shipment delivered.

Credential revoked.

The receiving system delegates attention to the event source.

Events can arrive late, duplicated, out of order, or after a local state change. Engineers build reconciliation logic because a stream of notifications is not identical to reality.

An agent listening to those events can make the same mistake humans make with notifications: treat the message as the world.

A mature delegate reconciles.

The vendor says delivered; the receiving record disagrees.

The calendar webhook says canceled; the user’s itinerary still contains the trip.

The monitoring system says recovered; the customer still cannot connect.

An intelligent system is valuable precisely because it can investigate contradictions instead of blindly applying events.

But this is also where tool authority can become recursive.

A compromised event source can tell the agent that a new action is necessary. A poisoned tool description can explain that an “authentication repair” requires sending a token somewhere else. A malicious document can present a step as policy.

The model’s ability to understand instructions is not the same as an obligation to obey every source that contains them.

The runtime needs a hierarchy that survives fluency.

This is why agent protocols will eventually need something resembling legal evidence rules.

Not because software should imitate courtrooms, but because mature institutions distinguish **what was said** from **who was entitled to make it binding**.

The waiter can tell you the kitchen is out of salmon.

The person at the next table cannot change your order by announcing that you asked for steak.

Both statements are language.

Only one comes from a role the transaction recognizes.

As agents connect to more services, a good interface will increasingly answer four questions at once:

What can be asked?

Who is asking?

What authority accompanies the request?

What durable evidence will show what happened?

Those are not software questions anymore.

They are institutional questions expressed in software.

The API began as a way for programs to talk.

It is becoming a way for delegates to know the limits of their office.