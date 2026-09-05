# The Migration Window

Every dependency has a clock. Some clocks are contractual. Some are technical. Some are economic.

Some are hidden until the dependency changes underneath you.

AI model lifecycles make the clock unusually visible.

Providers publish deprecation and retirement schedules because models are not permanent infrastructure. Versions age. Replacements appear. Support windows end. Prices change. Interfaces evolve. Capabilities move.

By 2026 this had become ordinary enough that cloud documentation listed model retirement dates alongside suggested replacements.

That is not evidence that the ecosystem is uniquely unstable.

It is evidence that migration is part of normal operation.

A company that adopts AI as though the chosen model will remain exactly where it is has misunderstood the product it is buying.

The model is not a building.

It is a train.

You can build on it.

Just keep track of where the line goes.

## The first migration is architecture review

A migration reveals what the organization actually coupled to the model.

Before the migration, teams often believe the dependency is simple.

We call an API. We send a prompt. We receive an answer. Then the replacement model arrives. Formatting changes.

Tool selection changes. Latency changes. Context behavior changes. Refusal behavior changes. The model follows instructions differently.

The old few-shot examples become unnecessary or counterproductive.

The same temperature does not feel the same.

The new system is better at the benchmark and worse at one strange business edge case.

A parsing assumption breaks.

A hidden prompt turns out to contain business logic.

A team discovers that “the model” was never one dependency.

It was a bundle of behavioral assumptions.

That discovery is useful.

The migration is not merely a maintenance event.

It is an architecture review conducted by reality.

## Separate the contract from the implementation

A robust AI workflow should have a business contract that is more stable than its model implementation.

The contract might be:

Classify this request into one of these operational categories.

Draft a response that satisfies these policy requirements.

Extract these fields with these definitions.

Recommend one of these bounded actions and provide the evidence used.

Produce code that passes this test suite.

Summarize this record without omitting these legally significant facts.

The model implementation is how the system currently fulfills that contract.

Those two layers should not collapse into one another.

If the prompt says, in effect, “please behave roughly like the old model did,” the organization has no stable contract.

It has nostalgia.

Migration forces the team to write down what it actually needs.

That is healthy. What outputs are required? What errors are unacceptable? What latency matters? What tone is part of the product?

What tool permissions are necessary? What cases should escalate? Which variation is harmless?

Which behavior was merely an accident of the old model?

A migration becomes easier when the answer is encoded in tests, schemas, policies, and workflow boundaries rather than tribal memory.

## Do not preserve the bug because users learned it

Compatibility is useful. It can also become a trap. Teams adapt to model behavior. They write prompts around quirks. They add parsing logic around odd formatting.

They create human review habits around known weaknesses.

They teach users little rituals that make the system work.

Then a new model removes the weakness.

The organization can respond in two ways.

One is to force the new system to imitate the old one so nothing else has to change.

The other is to ask which old behaviors were requirements and which were scars.

Robustness does not mean preserving scars.

If a migration allows you to delete brittle prompt tricks, remove unnecessary review steps, simplify a parser, or eliminate a known failure mode, do it.

A reversible architecture should make replacement possible.

It should not make improvement illegal.

This is why abstraction has to be selective.

A universal wrapper that hides every model difference can preserve portability while preventing the organization from using what makes the new model better.

The goal is not identical behavior.

The goal is stable outcomes where stability matters.

## Migration needs overlap

The riskiest migration is a cliff.

Old system until Friday.

New system on Monday.

No meaningful period in which the organization can compare the two under real conditions.

Sometimes deadlines make cliffs unavoidable. Usually they are a planning choice. A better migration creates overlap. Shadow traffic. Dual evaluation.

A small production cohort. Side-by-side review. A replay of historical cases. A canary by workflow. A limited set of customers.

A temporary compatibility layer. Overlap buys evidence.

It also exposes whether the organization’s evaluation reflects reality.

Suppose the new model wins ninety-five percent of the test suite but customer escalations rise in one workflow.

Good.

You learned before full commitment.

Suppose the new model is cheaper and faster but tool calls fail on a legacy schema.

Good.

Fix the schema or route that workflow differently.

Suppose the replacement is simply better everywhere you care about.

Excellent.

Accelerate the migration and retire the old path.

Overlap is not an argument for permanent duplication.

It is a temporary instrument for learning.

## Every migration should delete something

Organizations are good at adding migration scaffolding and bad at removing it.

The adapter stays.

The old prompt stays.

The old model route stays “just in case.”

The compatibility flag stays.

The temporary dashboard stays.

The duplicate data pipeline stays.

Soon the architecture contains the fossil record of every transition.

That is not robustness. It is sediment. A migration should have a deletion plan. What disappears when confidence is high enough? When is the old provider route removed?

When is the compatibility shim retired? When do duplicate eval results stop running?

When can the team stop preserving a fallback that no longer justifies its cost?

Robustness has maintenance weight.

If you never remove old options, optionality becomes complexity.

Complexity becomes its own failure mode.

The robust company keeps options while they are worth more than they cost.

Then it closes them deliberately.

## The migration owner

Model migrations often fall into an organizational crack.

Infrastructure owns the API. Product owns the user experience. Data owns retrieval. Security owns permissions. Legal owns policy constraints.

Operations owns the human fallback.

Nobody owns the migration as one system change.

That is dangerous because the failures occur between domains.

The model passes technical tests but violates a policy expectation.

The workflow passes product tests but breaks an export.

The security configuration is correct but the new model uses tools more aggressively.

The support team is not told that escalation behavior changed.

The organization needs one migration owner or a clearly defined migration group accountable for the whole outcome.

Not because one person understands every detail.

Because someone has to know when the system is ready to cross the commit point.

Ownership is how distributed evidence becomes a decision.

## Build the migration packet before the notice

A provider retirement notice should not be the first time the company asks how to migrate.

For every material model dependency, maintain a lightweight migration packet.

It can contain:

- the current model and version;
- where it is used;
- the business contract for each workflow;
- the evaluation suite;
- known model-specific assumptions;
- tool and schema dependencies;
- fallback routes;
- data and memory formats;
- expected migration lead time;
- the owner;
- the last migration or compatibility test.

This sounds bureaucratic.

It can be one page.

The point is not documentation volume.

The point is to avoid discovering the dependency map under deadline.

A two-month retirement window feels generous if migration takes two weeks.

It feels terrifying if nobody knows how many systems depend on the model.

The calendar is the same.

Preparedness changes its meaning.

## Exit tests are healthier than exit fantasies

Companies sometimes prove portability by saying, “We could move if we had to.”

That statement gets less credible every year the move is not attempted.

Dependencies deepen. People forget. Vendor-specific features become valuable. Data accumulates. Theoretical switching cost becomes real switching cost.

This is not automatically bad. A deep dependency may be economically rational.

But the organization should know the difference between *could move* and *could move within the time we can tolerate*.

An exit test can be small.

Run one representative workflow on another model.

Export one slice of memory and rehydrate it elsewhere.

Replay one evaluation suite through a different provider.

Estimate the engineering work to replace a proprietary feature.

Check whether contract terms match the assumed notice period.

Test the fallback credentials.

You do not need to maintain permanent multi-provider production.

You need enough evidence to price the dependency honestly.

## The retirement notice is a gift

Nobody enjoys a deprecation notice.

It creates work nobody put on the roadmap.

It interrupts feature development.

It forces tests.

It exposes undocumented coupling.

It makes a team revisit decisions that felt finished.

This is exactly why it can be useful.

The notice forces the organization to exercise its ability to move.

A company that migrates cleanly learns that its boundaries are real.

A company that struggles learns where the system has become brittle.

Both outcomes create information.

The worst outcome is not a difficult migration.

It is never discovering that migration is difficult because the dependency stays stable just long enough for the organization to forget the possibility of change.

AI does not offer that illusion for very long.

Good.

The moving frontier keeps asking the same question:

Can you take what you learned here and carry it forward?

A sturdy system can.

Not without work.

Without losing itself.
