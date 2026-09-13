# The Agent Chain

A chatbot can be wrong and wait for you to notice.

An agent can be wrong and continue.

That difference sounds almost trivial until you follow the error through several steps. The model does not merely answer a question. It interprets an instruction, decides what to do next, calls a tool, reads the result, forms a new plan, changes a record, sends a message, and hands the altered world to the next step as context.

A hallucination inside a chat is a proposition.

A hallucination inside an agent can become a state transition.

This is why agentic AI deserves its own chapter rather than being treated as a more capable version of conversation. The architecture changes the consequence of uncertainty. A wrong sentence can be contained by a skeptical reader. A wrong action creates evidence for later actions.

Suppose an expense-management agent is told to reconcile a set of invoices. One invoice contains a vendor name that resembles an existing supplier but is not an exact match. The agent searches the vendor database, finds the nearest record, and infers that the invoice belongs there. It then updates the account, marks the invoice as reconciled, and posts an internal note explaining the match.

A second agent later investigates vendor spend. It sees a clean record: invoice reconciled, supplier identified, note attached. It no longer sees the original ambiguity. The inference has become data.

Nothing in the second agent's world looks like hallucination.

The mistake has been domesticated.

This is one reason discussions of agent reliability that focus only on the model's first answer are inadequate. An agentic system is a chain of transformations. The relevant question is not merely how often the model fabricates. It is how uncertainty behaves as it moves through the chain.

Does uncertainty shrink because evidence improved?

Or because each step expects a concrete input?

The distinction is everything.

Software pipelines dislike ambiguity. A field wants a value. A function wants an argument. An API wants a valid parameter. A state machine wants the next state. Generative systems are attractive precisely because they can convert messy natural language into structured action.

That conversion is where the risk concentrates.

A human assistant faced with an ambiguous instruction may ask. An automated agent may infer. If the system is scored on task completion, inference looks efficient. If it is scored on avoiding unnecessary interruptions, asking becomes a cost. If it is designed to finish work while the user sleeps, there may be nobody available to clarify.

The agent therefore needs a policy for uncertainty.

Most product descriptions focus on what the agent is permitted to do. Send email. Edit spreadsheets. Run code. Purchase travel. File tickets. Modify infrastructure. A mature system also needs to define what the agent is permitted to assume.

Permissions govern action.

Epistemic permissions govern inference.

The second category is less visible and may matter more.

An agent can have read-only access to every system in the company and still create substantial harm if it synthesizes the wrong conclusion and delivers that conclusion to someone with authority. Conversely, an agent with write access can sometimes operate safely if the claims required for each write are tightly constrained and verifiable.

The dangerous phrase is often "based on the available information."

Available where?

An agent may search a local knowledge base, query the web, inspect email, call a CRM, and read previous agent notes. Those sources have different status. If the agent treats them as one undifferentiated context window, it can reason fluently across contradictions without exposing the contradictions to the user.

Tool use gives language models contact with reality.

Tool use also gives language-model errors leverage over reality.

Both statements are true.

Consider a travel agent. The user asks it to book the cheapest reasonable flight to a meeting. The agent searches several options, sees an itinerary that appears to arrive at 8:10 a.m., and decides it leaves enough time for a 10:00 meeting. The arrival time is actually 8:10 p.m. because the source formatted the time poorly and the parsing step dropped the marker.

A chat assistant might tell the user about the flight. The user may notice.

An autonomous agent can buy it.

After purchase, the confirmation email becomes new evidence. Another system adds the itinerary to the calendar. A reminder is scheduled. The hotel reservation is adjusted. The wrong interpretation produces a coherent travel plan.

Coherence grows after the error.

This is a central feature of agent chains. Actions generate artifacts, and artifacts can confirm the agent's prior assumption.

A purchased ticket is real.

A calendar entry is real.

A hotel change is real.

The premise that justified them can still be wrong.

The physical world has been rearranged around the hallucination.

That is why reversibility should be a core variable in agent design.

An agent that drafts an email can be allowed more uncertainty than one that sends it. An agent that stages a code change can be allowed more autonomy than one that deploys to production. An agent that proposes a transfer can be allowed more latitude than one that moves funds.

The difference is not intelligence.

It is cost of undo.

Traditional software engineering already uses this logic. We have staging environments, transaction rollbacks, dry runs, approval gates, version control, access scopes, and change windows. Those mechanisms were created because even deterministic software fails and humans make mistakes.

Agentic AI should inherit them rather than treating autonomy as a reason to skip them.

The most reliable agent may be the one that does not act directly on its first interpretation.

It can stage.

It can show a diff.

It can keep a proposed state separate from the committed state.

It can simulate consequences.

It can ask another system to verify the critical premise.

It can wait for stronger evidence at irreversible boundaries.

These are old patterns with new importance.

There is another property of agent chains that makes hallucination difficult: context compression.

Long tasks produce more information than a model can practically carry at full fidelity. Systems summarize intermediate steps. They write scratch notes. They store plans. They distill tool outputs into shorter representations.

Every compression is an opportunity for provenance loss.

An agent searches five websites and records: "Vendor B offers same-day delivery." One site actually said same-day delivery was available only in two cities. The intermediate note drops the condition. Later planning steps treat same-day delivery as a general property.

The hallucination may not occur in the final model call.

It may have happened in a summary nobody ever saw.

This is the hidden life of agentic error.

The public tends to imagine an autonomous agent as one mind performing a task. Engineering reality often looks more like a temporary organization: planner, retriever, tool caller, verifier, memory store, judge, executor. Several model calls may cooperate. Some outputs are visible; others are internal.

The architecture can therefore hide disagreement from the user.

One sub-agent may be uncertain. The planner may compress that uncertainty into a decision. The final answer can sound unanimous.

A system should preserve minority reports when minority reports matter.

Human institutions learned this slowly. Intelligence agencies sometimes document dissenting analytic views because consensus can conceal important uncertainty. Courts publish dissents. Investment committees record objections. Scientific papers discuss limitations.

Agent systems need analogous mechanisms.

If the verifier fails to confirm a claim, the planner should not merely note the failure and continue unless the workflow explicitly allows it. If two retrieval paths produce contradictory dates, the contradiction should survive into the decision state. If an agent cannot tell whether a value was observed or inferred, the downstream action should know that too.

The agent chain should carry epistemic state, not only task state.

Task state says: step four complete.

Epistemic state says: step four depends on one unverified assumption.

Most software orchestration is built for the first.

Trustworthy autonomy requires the second.

This becomes especially important in coding agents.

A code-writing system may infer that a library exposes a function with a certain name. If the function does not exist, the code fails quickly. That is good failure. The environment objects.

But some coding hallucinations compile.

The system may call a real API with the wrong semantic assumption. It may misunderstand an authorization boundary. It may invent a configuration option that is silently ignored. It may add a dependency with a similar name to the intended one. It may create a test that confirms the wrong behavior because the test was generated from the same misunderstanding.

The codebase can become a shared hallucination.

The implementation says one thing, the test says the same thing, the documentation describes it, and every artifact agrees.

Only the user's real requirement disagrees.

This is why generated tests are not independent verification when they are derived from the same ambiguous specification. They are useful. They can catch implementation errors. But a test generated from a wrong premise can encode the premise as expected behavior.

Again: internal agreement is not external evidence.

Agents magnify this because they can generate all layers at once.

Requirement interpretation.

Code.

Tests.

Documentation.

Migration.

Deployment note.

A consistent package can still be consistently wrong.

The antidote is not to distrust generated tests. It is to anchor at least one layer outside the generative loop: existing behavior, formal specification, real user acceptance criteria, reference data, deterministic constraints, or independent human judgment.

The same principle applies to business agents.

If an agent drafts a contract, checks the contract, summarizes the contract, and writes the approval memo, all four artifacts may share one model's misunderstanding. Separating the calls creates process without necessarily creating independence.

The architecture should ask where new evidence enters.

If no new evidence enters, confidence should not rise merely because the system produced more documents.

That rule can be formalized.

Each critical conclusion can carry a lineage graph. Nodes represent claims. Edges represent support. Some support comes from primary documents, some from calculations, some from user statements, some from model inference. Before an irreversible action, the system can inspect whether the required claims terminate in acceptable evidence.

This is not science fiction.

It is data engineering applied to reasoning.

A purchasing action might require a price sourced from the vendor's current quote, an account number from the approved supplier record, and authorization from policy. A model can interpret those sources, but the action gate can verify that they exist.

The agent remains intelligent.

The authorization becomes explicit.

This is the direction agent safety should move: away from vague global confidence and toward claim-specific preconditions for action.

Global confidence is seductive because it compresses complexity into one number.

"Agent confidence: 92%."

What does that mean?

Ninety-two percent confident the user wanted the action? The source is current? The tool result was parsed correctly? The policy permits the action? The plan will work? The action is reversible?

One percentage cannot carry all of those dimensions.

A safer agent exposes the weak link.

"I found the supplier in the approved list, but I could not verify the bank-account change independently. Transfer not submitted."

That sentence is less magical than "task complete."

It is also the kind of sentence organizations can build trust around.

There is a larger cultural tension here. The word *agent* invites us to think in terms of delegation. We delegate to people because they exercise judgment. A trusted employee does not stop at literal instructions. She notices something odd, asks a question, and sometimes declines to proceed.

We should demand the same shape of intelligence from machine agents.

A system that blindly completes every instruction is not more agentic because it takes more actions.

Sometimes judgment is the decision to stop the chain.

The software industry has spent years optimizing for uninterrupted workflows. Errors are retried. Exceptions are caught. Services fail over. Users hate dead ends.

Epistemic safety occasionally requires a dead end.

The evidence is missing.

The sources conflict.

The user did not authorize this consequence.

The tool returned something inconsistent with the plan.

Stop.

A good agent should know that stopping is an action too.

The final risk is organizational. Once agents work for agents, responsibility can become difficult to locate. The planner blames retrieval. Retrieval used a source chosen by search. Search returned a page generated by another system. The executor acted on the planner's state. The human approved a dashboard summary.

Complexity can dissolve accountability.

It should do the opposite.

Every chain needs an owner for the consequence, an owner for the evidence standard, and a record of how the action occurred.

This is not about assigning moral guilt to software. It is about making the system debuggable when reality disagrees.

The most important question after an agentic failure will often be simple:

What did the system believe at the moment it acted, and why?

If the answer cannot be reconstructed, the organization has built autonomy without memory.

That is not intelligence.

It is amnesia with permissions.