# 3. State Is Somewhere Else

Ask where an agent's mind is and you may already be asking the wrong question.

The model is the obvious answer because that is where language appears to become thought. Tokens enter. activations happen. Tokens leave. The drama occurs inside the inference.

But a long-running agent's most important state may be almost everywhere except the model.

Its source code is in a repository.

Its unfinished tasks are in a queue.

Its commitments are in a database.

Its future wakeups are in a scheduler.

Its permissions are in an identity system.

Its observations are in logs and event streams.

Its durable knowledge is distributed across documents, tests, structured memory, artifacts, messages, and the current state of the external systems it operates.

Its goals may be versioned configuration.

Its reputation may exist in records maintained by other systems.

Its money may be in accounts it can access but does not contain.

Its relationships may be encoded in threads, contracts, permissions, and expectations distributed across other people and agents.

The model is where the system thinks now.

The state is somewhere else.

This separation is not merely convenient engineering. It creates the possibility of indefinite continuity.

Anything stored only in the active inference is mortal. Anything important enough to survive must cross the boundary into durable state.

That means the act of writing becomes existential for an agent.

Humans can think a thought and retain some private memory of it. A stateless agent that fails to externalize a relevant conclusion has effectively never learned it for future purposes.

The durable write is the bridge between selves.

This makes agent architecture resemble event-sourced systems. Instead of treating current state as an opaque blob, the system can preserve significant events and derive present understanding from them.

Customer requested X.

Build failed with Y.

Hypothesis Z was tested and rejected.

Policy changed at time T.

Agent committed artifact A.

Human revoked permission P.

External condition C became true.

These events create a history that future reasoning can reconstruct selectively.

The word selectively matters.

No model should read the entire event history every time it wakes. That merely recreates the infinite-context fantasy at another layer.

A durable intelligence needs retrieval.

It needs mechanisms for deciding which fragments of state are relevant to the current event. Some retrieval can be exact and deterministic. Some can be semantic. Some can follow explicit relationships. Some can be driven by policy. Some can be discovered recursively as the model asks questions.

The agent does not need all of itself.

It needs the slice of itself necessary to act correctly now.

This creates a new systems problem: context construction becomes the equivalent of loading working memory.

The quality of the agent depends not only on how well the model reasons over context but on whether the harness assembles the right context in the first place.

A brilliant model given stale state is a brilliant employee handed last year's books.

A brilliant model given too much irrelevant state wastes cognition distinguishing signal from institutional sediment.

A brilliant model given conclusions without provenance inherits superstition.

The context builder is therefore part librarian, part operating system, part historian.

It decides what the temporary mind gets to remember.

That is power.

It should be governed accordingly.

Persistent agent systems will likely develop multiple memory classes because different state has different semantics.

There is factual state: the current balance, current branch, current owner, current deadline.

There is episodic state: what happened during a previous attempt.

There is semantic state: generalized knowledge extracted from many episodes.

There is procedural state: how this agent tends to perform a task.

There is constitutional state: what the agent is for, what it may do, what it must never do, and who can change those rules.

There is social state: commitments, relationships, promises, reputational consequences.

There is speculative state: hypotheses that should remain explicitly uncertain.

Flatten these into one vector database called "memory" and trouble follows.

A hypothesis gets retrieved like a fact. A temporary workaround becomes procedure. A stale preference becomes identity. A model-generated summary replaces the primary evidence it summarized. An old instruction quietly outranks a newer policy because semantic retrieval happened to score it higher.

Memory needs types.

Types create expectations about validity, authority, mutability, and retrieval.

This is where ordinary software engineering returns with a vengeance.

Schemas matter.

Versioning matters.

Transactions matter.

Access control matters.

Garbage collection matters.

Audit logs matter.

Migration matters.

Distributed consistency matters.

The future of advanced agents may look less like one magical neural architecture and more like very serious systems engineering wrapped around interchangeable cognition.

That is good news because these are problems civilization has experience solving.

Not perfectly, but concretely.

It also creates a path toward legibility.

If the durable self is externalized, humans can inspect parts of it.

What goals are active?

Which commitments remain open?

What memories are influencing current behavior?

What permissions exist?

What future triggers are scheduled?

What did the agent learn from its last failure?

Which policy version authorized an action?

What would happen if we replaced the model today?

These questions become answerable because identity is not trapped inside inscrutable weights.

The weights still matter. They determine capabilities, tendencies, and failure modes. But the long-running agent's biography can live in systems designed for biography.

There is a philosophical oddity here.

The more persistent the agent becomes, the less its persistence may resemble a persistent mind.

It becomes distributed.

A little of the self is in code.

A little in memory.

A little in obligations.

A little in the environment.

A little in the expectations of other agents.

A little in artifacts left behind.

A little in the rules governing who may wake under its name.

Humans may recognize something uncomfortable in this.

Our own identities are more external than we like to admit. We are partly calendars, photographs, bank accounts, homes, legal records, friendships, reputations, habits, notebooks, institutions, possessions, and promises remembered by other people.

Remove enough of the external scaffolding and the person who remains has not biologically vanished, but their effective agency changes dramatically.

Artificial agents make this distributed nature explicit because they begin without the biological anchor.

They can be designed from the start around the proposition that state is somewhere else.

Once we accept that proposition, the dream of the immortal model looks quaint.

Why keep one thinker alive forever when the world can remember enough to wake the next one?

The phrase "state is somewhere else" can sound like an evasion. Somewhere else where?

That question forces the architecture to become specific.

Start with workflow state. This is the least glamorous and perhaps the most important. Workflow state says what the system is waiting for, which steps are complete, which actions have been attempted, which operations have uncertain outcomes, which deadlines are approaching, and which branch of work currently owns the right to continue.

Workflow state should not depend on semantic recall.

If an agent promised to revisit a contract on October 1, that obligation should not rely on a vector search returning the old conversation at the right moment. It belongs in a durable timer or explicit work object. If an external payment may have succeeded before a network failure, the ambiguity belongs in workflow state that demands reconciliation. If a human approval is still missing, the next model should not infer from old prose whether approval probably happened. It should query the authoritative approval record.

This distinction sounds pedantic until money moves twice.

A long-running agent crosses unreliable boundaries constantly. It calls APIs. It sends messages. It writes files. It waits for humans. It delegates. It may crash between an external side effect and the local record of that side effect. The future worker wakes into uncertainty.

Did we send the order?

Did the customer receive the email?

Did the deployment complete?

Did the meeting invitation go out?

Did the other agent commit its branch?

These are not memory questions. They are distributed-systems questions.

A mature harness needs durable operation identifiers, idempotent actions where possible, checkpoints, and reconciliation against external systems of record. "I remember doing it" is not a protocol.

Next comes epistemic state. This is closer to what people mean when they say memory, but it should still be decomposed.

An observation has a source, time, scope, and perhaps a confidence. A belief is an interpretation of observations. A hypothesis is a belief deliberately kept provisional. A summary compresses evidence but should not erase the evidence it summarizes. A preference belongs to some person or institution and can change. A rule may be descriptive—this system usually behaves this way—or normative—this agent must behave this way. Those should never share one unlabeled bucket.

If every piece of prose becomes a vector embedding, similarity starts impersonating authority.

The closest sentence wins.

But durable systems need precedence.

A current signed policy should outrank an old conversational memory even if the old memory is semantically more similar to the present request. A primary database record should outrank a model-generated summary of that record. A human correction may override an inferred preference. A legal retention rule may prohibit the agent from retrieving a memory that would otherwise be useful.

This is why the memory system eventually begins to resemble a type system.

Type tells the agent what kind of thing this is and therefore what operations make sense.

An `observation` can be superseded by a newer observation.

A `hypothesis` can gain or lose confidence.

A `commitment` can be fulfilled, breached, transferred, or canceled through authorized procedure.

A `policy` can be versioned but not casually rewritten by ordinary task execution.

A `credential` should not be embedded in text at all.

An `evaluation` can change how future workflows are routed without becoming a fact about the outside world.

A `memory` that lacks type has to be interpreted from language every time, which is precisely the kind of repeated ambiguity persistent systems should be trying to reduce.

Then comes authority state.

This is where many agent prototypes remain dangerously informal. The model receives a collection of tools and the system assumes that tool access equals legitimate permission. But the right question is not merely what the agent technically can do. It is what this invocation, acting under this durable identity, is authorized to do for this objective at this moment.

Authority is contextual.

An agent may be allowed to spend up to five hundred dollars on routine cloud resources but not sign a new vendor contract. It may be allowed to prepare a refund but not issue one above a threshold. It may read a medical record for scheduling but not use that information for marketing. It may deploy code to a test environment but require approval for production.

If authority lives only in the prompt, it is brittle.

The prompt is generated text inside a probabilistic reasoning context. Durable authority should live in mechanisms that can say no independently of whether the model remembers the rule.

The harness should be able to deny the tool call.

This turns policy into physics.

Then comes social state.

A persistent agent does not operate in a vacuum. Other people and agents develop expectations about it. It owes replies. It has made promises. It has received confidential information. It may have negotiated norms that do not fit neatly into a database schema.

Social state is difficult because relationships are partly interpretive. A promise can be explicit or implied. A person's preference can be stable or situational. An agent can fulfill the literal terms of an agreement while violating the spirit of the relationship.

This is where language memory remains valuable, but even here structure can help. Important commitments can be promoted out of conversation into explicit objects: party, obligation, due condition, scope, evidence of fulfillment, authority under which it was created.

The goal is not to bureaucratize every human interaction.

It is to avoid relying on a future model to rediscover consequential obligations from a pile of chat.

Finally there is artifact state: the changed world itself.

This is often the most trustworthy memory of all.

The code now contains the fix. The test now rejects the bad behavior. The document contains the negotiated clause. The calendar contains the appointment. The database contains the approved amount. The package has a tracking identifier. The experiment produced a dataset.

When the world can answer the question, the agent should prefer the world to recollection.

That principle is easy to state and hard to maintain because agent products are naturally tempted to make memory universal. If the system can recall everything, why bother integrating all those annoying systems of record?

Because memory is a cache of reality, not reality itself.

Caches become stale.

A never ending intelligence needs to know which information can safely be cached and which must be read fresh.

A shipping address used yesterday may still be valid. A bank balance should probably be queried. A person's favorite restaurant may be a useful memory. Their current medication list demands an authoritative source and appropriate permissions. The default branch name in a repository can be remembered for navigation, but the current commit should be fetched if correctness depends on it.

Freshness is domain-specific.

The harness therefore needs context assembly policies rather than one retrieval strategy.

Some state is always loaded: identity, core policy, the current objective.

Some is loaded because the trigger references it directly.

Some is fetched from authoritative systems.

Some is retrieved semantically because relevance cannot be predetermined.

Some is deliberately withheld because the current invocation has no legitimate need to know it.

Some is summarized because the raw history is too large.

Some is sampled because the system is searching for anomalies.

The model receives the resulting context and experiences it as the world.

This is one of the most consequential hidden powers in agent design.

Whoever controls context construction controls what the agent can notice.

An omitted source can make a highly capable model appear stupid. A poisoned memory can make it confidently wrong. An overbroad context can leak secrets across domains. A biased summarizer can make one interpretation seem historical when it is merely editorial.

Context construction deserves observability of its own.

Which sources were considered?

Which were selected?

Which policy excluded others?

Which memories contributed to the final decision?

Was a source current?

Could the same episode be replayed with an alternative context builder to test whether the decision changes?

These questions turn context from magic into infrastructure.

They also suggest that the mature persistent agent may have multiple context builders. A cheap worker can assemble routine state deterministically. A retrieval specialist can search messy archives. A privacy filter can remove information outside the invocation's purpose. An adversarial context builder can deliberately surface contradictory evidence before a consequential decision.

The temporary thinker then arrives after an entire small institution has prepared the room.

This is not a weakness of the model.

It is what institutions do for human decision makers too. A judge receives a record. A surgeon receives a chart. A pilot receives instruments and checklists. An executive receives a briefing. The decision maker rarely constructs the informational universe from raw reality alone.

The difference is that machine context can be generated fresh for every episode.

That gives us an opportunity to make the room unusually explicit.

There is one more class of state that becomes unavoidable once agents persist across organizations rather than within one database: **foreign state**.

An outside party claims a shipment was delivered. A vendor agent says a contract has been renewed. A customer's personal agent says consent was withdrawn. A public registry says a corporate officer changed. A payment network reports settlement.

The durable agent may need these facts, but it does not own the systems that produced them.

Foreign state should therefore arrive with a boundary intact.

Who attested to this?

Under what identity?

At what time?

Can the claim be independently checked?

Is the outside system authoritative for this field or merely informative?

Can it later revoke or amend the statement?

Machine-to-machine society will be impossible to govern if every message from another agent is flattened into local memory as though the receiver observed the fact itself. Persistent systems need something like evidentiary import controls.

The message can be stored. The claim can be useful. Its foreign origin should survive.

This also creates the need for **state contracts** between institutions.

A supplier may expose inventory availability but not raw warehouse telemetry. A bank may expose whether funds are sufficient without exposing the full account. A government service may attest that a license is valid without publishing the entire record. A personal agent may reveal that a calendar slot is free without revealing what occupies the rest of the day.

Persistent agents will often coordinate better by exchanging bounded attestations than by sharing whole contexts.

That is good for privacy and good for reasoning. The receiving agent gets the fact needed for the decision without inheriting irrelevant biography.

The architecture starts to look less like one giant memory and more like a federation of partial truths.

This matters for recovery too.

If identity depends on many stores, restoring an agent after disaster is not simply restoring a database backup. The system has to re-establish relationships among current state, external reality, credentials, commitments, and outstanding events. A backup may contain a payment marked pending even though the outside network settled it during the outage. A restored scheduler may contain timers whose goals were canceled in another system. A memory snapshot may predate a policy revocation.

Recovery therefore requires reconciliation before resurrection.

The question is not, "Can we restore the agent to yesterday?"

The world did not restore itself to yesterday.

The question is, "Can we reconstruct a legitimate present from durable history plus everything that changed while our local state was unavailable?"

This is one reason immutable history alone is insufficient. Continuity depends on joining history to current authority.

A system that can replay perfectly from an old checkpoint but cannot discover that its owner revoked access during the outage is not resilient. It is a time machine with stale powers.

Persistent intelligence needs disaster recovery with constitutional awareness.

Which state can be restored automatically?

Which permissions require fresh issuance?

Which external commitments must be reconciled?

Which memories can safely re-enter active circulation?

Which dormant triggers should remain suspended until ownership is confirmed?

A never ending intelligence should be exceptionally difficult to resurrect incorrectly.

This gives us a useful design test.

Imagine deleting every running model process right now.

What remains?

Can you identify the agent's active goals without asking a model to infer them from chat?

Can you list its open commitments?

Can you tell which permissions are valid?

Can you see what it is waiting for?

Can you distinguish current policy from historical policy?

Can you recover which claims are observations and which are hypotheses?

Can a different model wake and continue without pretending it has memories it does not possess?

If the answer is yes, persistence has become architectural.

If the answer is no, the system may have a very impressive model and very little durable intelligence.

State is somewhere else.

The future of agent engineering depends on knowing exactly where, exactly what kind, exactly who can change it, exactly how old it is, and exactly why this temporary mind is allowed to see it now.
