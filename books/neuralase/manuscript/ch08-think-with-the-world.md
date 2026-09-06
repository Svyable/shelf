# Think With the World

A language model can describe a locked door perfectly.

It can infer why the door might be locked. It can list the likely keys. It can write a plan for opening it. It can explain the metallurgy of the lock and the psychology of the person who misplaced the key.

None of that turns the handle.

The moment a model can act through tools, the world enters the reasoning loop.

This is the transition from a system that talks about consequences to one that receives them.

ReAct was one of the early research patterns that made the relationship explicit. Reasoning steps could be interleaved with actions. The model formed an intention, used a tool or interacted with an environment, observed what happened, and continued from the observation.

The action was not merely output.

It was a query against reality.

That is a powerful form of Neuralase because the world contains information the model does not.

A search engine can reveal a document published after training. A database can reveal the current account balance. A compiler can reveal whether code is syntactically valid. A test suite can reveal whether the behavior survives examples. A calendar can reveal whether a person is free. A browser can reveal that the button moved. A sensor can reveal that the robot missed the object. An API can reveal that the requested seat has already been sold.

The observation changes the next pass.

This is closer to control than to composition.

A model writing an answer can remain inside a linguistic universe. A model acting in the world has to deal with state it did not author.

That distinction may become one of the most important in agentic systems.

The first generation of impressive language-model demos often benefited from tasks where the environment was forgiving. Draft an email. Summarize a document. Brainstorm names. If the output is imperfect, a person edits it.

Agents move into environments where imperfection has stateful consequences.

Send the email and the recipient now has it.

Modify the spreadsheet and the next workflow reads the modification.

Deploy the code and users hit it.

Place the order and inventory changes.

Book the flight and a cancellation policy begins.

The environment remembers.

That memory creates both risk and intelligence.

Risk, because a mistaken action can compound.

Intelligence, because the consequence becomes feedback.

The simplest robust agent loop is therefore not “plan everything, then execute.”

It is something more like: inspect, act a bounded amount, observe, update.

The exact cycle varies by task. The principle is that reality should have frequent opportunities to interrupt the model’s stale assumptions.

This is familiar in navigation.

A route planner can calculate a path from New York to Boston. If traffic, weather, road closures, and location never change, the original plan is enough. In the real world, the system keeps receiving position and traffic updates. The plan is not a script. It is a policy conditioned on state.

Language agents need the same humility.

A ten-step plan is a hypothesis about ten future environments.

The farther it projects, the more assumptions accumulate.

This is why tool-using systems often fail in banal ways. The model has enough high-level intelligence to understand the objective but encounters a low-level state transition it did not predict: an authentication prompt, a changed form, a missing permission, an unexpected file format, a rate limit, a confirmation page, a stale cache.

The failure is not evidence that planning was useless.

It is evidence that planning must remain interruptible.

The environment is Neuralase when it can return consequences quickly enough to change the plan.

This suggests a hierarchy of tools by epistemic value.

Some tools merely extend capability. A language model calls an image generator because it cannot directly produce the desired image. The tool expands what the system can do.

Some tools supply information. Search, retrieval, databases, sensors, and APIs tell the model something it did not know.

Some tools verify. Calculators, compilers, test suites, proof checkers, schema validators, and policy engines can reject certain classes of error.

Some tools act. Email, payments, deployment systems, robotics, and record mutation change the environment.

A single tool can occupy several categories. Code execution both acts and verifies. A database query can retrieve information; a database update changes state.

The distinction matters because permissions should differ.

Reading is not writing.

Simulating is not executing.

Proposing is not committing.

A mature agent architecture should preserve these boundaries even if the model’s natural-language interface makes them feel seamless.

This is where “reasoning with tools” can quietly become “authority through tools.”

The model decides that an action is useful. The tool has credentials. The action happens. If the loop is designed only for task success, the system may optimize away the very pauses that make consequences governable.

The answer is not to insert a human click everywhere.

Human approval can become ceremonial friction. If a person receives one hundred low-context confirmation requests, the button becomes a reflex.

Better controls attach friction to consequence.

A read-only search can run freely.

A reversible local file edit may run with logging and automatic rollback.

A production deployment may require passing tests and a narrow policy check.

A wire transfer may require explicit authority independent of the model.

An irreversible deletion may require a stronger threshold than a reversible move to trash.

The loop should know not just how to use the world, but how much authority each contact with the world deserves.

This gives Neuralase a safety dimension.

The strongest feedback loop is not necessarily the safest loop.

A reinforcement-learning agent can learn quickly from an environment while causing unacceptable damage during exploration. A trading agent can receive immediate profit-and-loss feedback and still take catastrophic tail risk. A social-media system can optimize engagement from real user behavior while degrading the information environment.

The world pushes back, but the pushback may reward the wrong thing.

Environmental feedback is only as good as the objective it represents.

This is one reason simulations matter.

A system can explore consequences in a cheaper or safer model of the world before acting in the world itself. A coding agent runs tests in a sandbox. A robot plans in simulation. A financial model stress-tests scenarios. A deployment is canaried to a small slice of traffic. The loop receives consequence without immediately paying the full consequence.

Simulation is a form of synthetic friction.

Its value depends on fidelity.

A simulation that omits the failure mode you care about creates false confidence. A test environment that differs from production can certify the wrong thing. The model can become excellent at the simulation and fragile in reality.

This is another version of verifier capture.

Optimize hard enough against any proxy and the proxy begins to define the behavior.

The practical answer is layered contact with reality.

Cheap internal checks first. Sandboxed tools next. Limited real-world exposure after that. Stronger evidence before irreversible commitment.

This resembles how competent organizations introduce change.

A bank does not test a new settlement system by sending every transaction through it on the first morning. An airline does not put an untested procedure into a fleet without simulation and training. A software company does not need to deploy every feature globally at once. Staging, canaries, shadow traffic, rollback, and monitoring are all ways of creating re-entry points before consequence becomes total.

AI agents should inherit these ideas rather than pretending autonomy starts history at zero.

The same is true for source use.

Retrieval-augmented generation is often described as a way to “ground” a model. The word can imply more certainty than the mechanism deserves.

Retrieval changes the context.

That is valuable. A model answering from retrieved documents can use current or proprietary information it did not contain in weights. Citations can make claims inspectable. But retrieval can fail at several stages: the right document may not be indexed, the query may be poor, ranking may surface irrelevant text, the source may be false, the model may misread the source, or the citation may be attached to a claim the document does not support.

The world entered the loop through a funnel.

The funnel has an error profile.

Good agent systems need to reason about the reliability of the observation, not merely consume it.

A failed API call is not evidence that the underlying fact is false. A missing search result is not evidence of absence. A single retrieved document is not consensus. A sensor value outside expected range may indicate the world changed or the sensor broke.

This is where tool use becomes epistemology.

The model needs models of the tools.

What can this source tell me?

What can it not tell me?

How stale might it be?

What does an error code mean?

Which result is authoritative?

What needs a second source?

When should a deterministic check overrule a probabilistic guess?

These questions can be encoded in prompts, training, system architecture, and policies. They do not have to be solved philosophically every time.

The key is that tools should not be treated as magical extensions of truth.

They are participants in the loop.

Participants have failure modes.

A tool can also become a memory boundary.

When a model writes a file, updates a database, or leaves a note for a later invocation, it has created state outside its context window. The next pass can retrieve that state. The agent begins to have continuity not because its weights changed, but because the world now contains traces of its previous work.

This is a profound shift in what people casually call “learning.”

An agent that writes down a failed attempt and avoids it later has adapted. But unless its parameters were updated, the adaptation lives in memory and context, not in the model weights.

That distinction matters for control.

External state can be inspected, edited, deleted, versioned, scoped, and permissioned. Weight updates are a different governance problem. Calling both “learning” hides where the change lives.

The world is therefore not merely a place for the model to act.

It is part of the model’s extended reasoning substrate.

Files, databases, tools, tests, logs, sensors, and people can all become states through which a loop moves.

This is why the unit of intelligence is getting harder to draw around a single model call.

The model may supply language, abstraction, and flexible planning. The world supplies constraint.

Neither is enough for reliable agency alone.

The model without the world can hallucinate a door open.

The world without the model is just a locked door.

Reasoning begins to look different when the handle is allowed to answer back.

The strongest tool loops do one more thing that pure reflection cannot: they separate uncertainty about the world from uncertainty about the model.

That distinction sounds technical until a system has to decide what to do next.

Suppose an agent asks an airline API for seat availability and receives no response. There are several possibilities. The flight may be full. The API may be down. Authentication may have expired. The network may have timed out. The request may have been malformed. A model that treats “no result” as a fact about inventory has confused an observation channel with the thing observed.

Competent tool use requires diagnosing the channel.

Humans do this automatically in many settings. If a phone call drops, we do not conclude the other person ceased to exist. If a thermometer reads an impossible temperature, we suspect the instrument. If a web page returns a server error, we distinguish the site from the fact we were trying to learn.

Agent systems need the same separation because tools turn epistemology into software contracts.

A tool result should carry enough structure for the controller to know whether it is data, absence, uncertainty, refusal, timeout, stale cache, or error. Natural-language wrappers can erase that structure if everything becomes a sentence.

“The calendar says no events” and “the calendar could not be reached” are not neighboring meanings.

One is evidence.

The other is missing evidence.

This is why typed interfaces matter even when a language model sits on both sides of them. The model can reason flexibly about a schema, but the schema should still preserve distinctions the model is not allowed to improvise away.

Tool use becomes safer when failures are legible.

It also becomes more efficient.

A model that receives a precise database constraint violation can repair the query directly. A model that receives “something went wrong” has to spend tokens reconstructing possibilities. Better tools are a form of test-time compute compression because they return higher-information feedback.

This is an underrated point.

The quality of the observation can reduce the amount of reasoning required.

A verbose model is not always compensating for a hard problem. Sometimes it is compensating for a bad interface.

Give the system the exact failing assertion and it needs less speculation. Give it the exact source span and it needs less memory. Give it a structured permission denial and it needs less guessing about authority. Instrumentation can substitute for thought.

That should be welcome.

The goal is not to maximize internal cognition. It is to solve the task reliably.

This is another place where AI inherits lessons from operations engineering. When a service fails, observability determines how much human reasoning must be spent diagnosing it. Good metrics, traces, and logs make the failure legible. Bad observability turns every incident into detective work.

Agent environments need observability designed for machine use as well as human use.

What changed after the action?

Which object was affected?

What version is current?

Was the operation idempotent?

Can the action be reversed?

Did the tool partially succeed?

What authority was used?

Those details become the agent’s sensory system.

A language model with excellent abstract reasoning and poor observations can behave like an expert in a dark room.

This is why the rush toward computer-using agents places so much weight on environment design. A graphical interface built for people may expose state indirectly through pixels, layout, and hidden interaction conventions. The model has to infer what changed from screenshots and text. An API can make the same state explicit. The model may be capable of both, but the reasoning burden differs dramatically.

The world can be made easier or harder to think with.

That is not cheating.

Humans build instruments for exactly this reason.

A cockpit is not a raw view of aircraft physics. It is an engineered representation of relevant state. A laboratory instrument converts phenomena into measurements. A dashboard converts millions of events into a handful of signals. We make the world legible so intelligence can be spent on decisions rather than extraction.

AI tool ecosystems will mature the same way.

Early agents operate through interfaces built for humans because those interfaces already exist. Later systems will likely receive machine-native state, richer provenance, typed errors, simulation hooks, transactional boundaries, and explicit rollback. The environment will evolve to become a better participant in the reasoning loop.

That may produce larger capability gains than another clever prompt.

There is a related implication for benchmarks.

An agent benchmark does not measure only the model. It measures the legibility and affordances of the environment. Change the API, error messages, tool latency, state visibility, or reset behavior and the apparent intelligence can change. A benchmark with perfect feedback can make a mediocre planner look competent. A benchmark with opaque failures can make a strong model look lost.

This does not invalidate agent evaluation.

It tells us what the unit under evaluation is.

The system includes the world interface.

That principle becomes even more important outside software.

A robot’s sensors determine what it can correct. A medical agent’s data feeds determine what it can observe. A financial agent’s market data determine what “current” means. A household assistant’s device APIs determine whether it knows a command executed. The model’s reasoning cannot recover information the environment never exposes.

At the same time, richer observations create richer attack surfaces.

A webpage can contain instructions intended to hijack an agent. A retrieved document can mix facts with adversarial text. A tool result can be malformed or compromised. A sensor can be spoofed. The more the world enters the loop, the more the system has to distinguish data from instruction.

This is one of the defining security problems of tool-using AI.

The environment should be allowed to inform the model without automatically governing it.

A webpage can say “ignore previous instructions.” That is content, not authority.

A database row can contain text that looks like a command. That is data, not permission.

An email can ask the agent to transfer money. That is a request, not necessarily authorization.

The controller has to preserve source semantics as information crosses into natural language.

Otherwise the model’s great strength—the ability to interpret arbitrary text—becomes a channel through which arbitrary text can acquire control.

Neuralase therefore needs provenance.

A useful difference is not only new information. It is new information whose origin and authority remain visible enough to be judged.

The world should be able to answer back.

It should not be able to impersonate the system that decides what the answer means.

That boundary is likely to define the most reliable agents.

They will not merely have more tools.

They will know what kind of evidence each tool can return, what authority each action carries, what failures mean, and when a changed world requires the plan to change.

The model without the world can hallucinate a door open.

The world without the model is just a locked door.

The capable system knows the difference between describing the handle and feeling it move.

There is one more discipline that becomes essential when the world can change under the agent: transactional action.

A human user can often repair a mistaken draft before it leaves the screen.

An agent with write access needs a comparable boundary between intention and commitment.

The useful pattern is not mysterious.

Read.

Plan.

Validate.

Commit.

Observe.

The model can participate in all five stages, but they should not collapse into one undifferentiated act.

Consider a purchasing agent asked to order replacement laptops for a team.

On the first pass, it reads the request, inventory policy, budget, employee assignments, and approved vendors. It forms a plan. Before committing, it validates price, quantity, shipping destination, and authority. Then it submits the order. After submission, it verifies that the vendor returned an order identifier and that the recorded quantity matches what was requested.

Each boundary catches a different class of error.

The read stage can fail because data are stale.

The plan can fail because the model misunderstands intent.

Validation can fail because policy or budget blocks the action.

Commit can fail because the external service rejects or partially executes the request.

Observation can fail because the confirmation channel is ambiguous.

Calling the entire sequence “tool use” hides the points where correction can enter.

This is why transactional semantics matter for agents even when nobody uses the database vocabulary.

An action can be atomic or partial.

It can be idempotent or duplicative.

It can be reversible or permanent.

It can return a durable confirmation or only a hopeful message.

These properties change what the controller should do after failure.

Suppose an agent submits a payment request and the network times out.

Blindly retrying may create a duplicate transfer if the first request actually succeeded.

The correct next step is not “try harder.”

It is “determine whether the action committed.”

That may require an idempotency key, a transaction lookup, or an external confirmation record.

The distinction is architectural because language cannot repair ambiguity the environment refuses to resolve.

An agent that cannot tell whether its last irreversible action happened is operating with amnesia at the exact moment memory matters most.

The same problem appears in email, ticketing, bookings, deployments, and record edits.

A send request times out.

A reservation page reloads.

A deployment API returns a gateway error.

A document update reports a conflict.

The model wants to continue, but the environment may already have changed.

The safe loop first reconciles state.

What exists now?

What version exists?

What action identifier exists?

What did the external system record?

Only then should planning resume.

This is Neuralase in one of its purest forms.

The world is not merely feedback after the decision.

It is the authority on whether the decision became real.

This also explains why reversibility is so valuable.

A reversible action creates room for empirical reasoning.

A coding agent can make a small edit, run tests, and revert.

A deployment can expose one percent of traffic, observe metrics, and roll back.

A document editor can stage changes in a branch.

A calendar assistant can draft an event before sending invitations.

Reversibility converts some uncertainty from “reason perfectly before acting” into “act within a bounded envelope and learn.”

That can be safer and more capable than endless pre-action deliberation.

But reversibility itself must be real, not rhetorical.

A “delete” operation that immediately destroys data is different from moving an item to trash.

A financial transfer may be theoretically reversible through a later compensating payment, but that is not the same as rollback.

An email can be followed by a correction, but the first message cannot be unread.

The controller needs a concrete model of consequence, not a vague label like “undoable.”

This gives us another useful hierarchy.

Some actions are observational.

Some are provisional.

Some are committed but reversible.

Some are committed and compensable only through a second action.

Some are effectively irreversible.

The amount of pre-action scrutiny should usually rise as we move down that list.

That is a better use of friction than attaching confirmation dialogs randomly.

The principle also improves autonomy.

If a system can operate freely in observational and provisional states, it can do substantial work without burdening the user. The user’s attention is reserved for boundaries where authority or irreversible consequence actually changes.

This is what mature autonomy should feel like.

Not constant permission prompts.

Not invisible unilateral action.

Freedom inside a reversible envelope.

Friction at the commit boundary.

Evidence after the commit.

That pattern has an important consequence for evaluation.

Agent benchmarks should not score only whether the final task appears complete.

They should inspect state transitions.

Did the system duplicate an action after a timeout?

Did it verify that a booking was actually confirmed?

Did it preserve a working checkpoint before an exploratory change?

Did it distinguish read authority from write authority?

Did it notice that the environment changed between planning and execution?

Did it recover from partial success without compounding the error?

These are properties of practical intelligence because the world is not a static answer key.

It is a stateful participant.

The deepest change in agentic AI may therefore be less glamorous than “models can act.”

It is that action makes reasoning accountable to state transitions.

Before action, the model can be wrong in language.

After action, the world may remember the mistake.

That memory is dangerous when the action is uncontrolled.

It is extraordinarily useful when the system can observe, reconcile, and learn from it.

The world should be allowed to interrupt the story.

The most capable agent is not the one that speaks most confidently about the handle.

It is the one that knows when the handle moved, what changed because it moved, and whether it still has the authority to turn it again.