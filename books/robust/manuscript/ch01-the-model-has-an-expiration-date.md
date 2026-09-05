# The Model Has an Expiration Date

On August 27, 2026, Microsoft published a table with an unusually clarifying feature for the age of artificial intelligence.

It contained retirement dates.

There were model names, version numbers, lifecycle states, recommended replacements, and days on the calendar after which particular versions would no longer be the thing a customer had built around. Some were marked general availability. Some were legacy. Some were deprecated. A widely used GPT-4o version from 2024 was scheduled to retire on October 1, 2026. Other versions had longer lives. Newer models had their own clocks already running.

Nothing about the table was scandalous.

That is the point.

Software has always had versions. Cloud services evolve. APIs are deprecated. Operating systems stop receiving support. Libraries break compatibility. The mature response is not outrage that technology changes. The mature response is lifecycle management.

Artificial intelligence makes the same old discipline feel new because the dependency is different.

If a database driver changes, engineers usually understand what the driver is supposed to do. It connects, sends a query, receives a result. A migration can be painful, but the contract is conceptually narrow.

A model is a fuzzier dependency.

A team may have learned that one model is unusually good at reading its contracts, preserving a certain format, interpreting terse internal language, using a tool in the expected order, or asking for clarification at the right moments. None of those behaviors has to be formally guaranteed for the workflow to become dependent on them.

The dependency sneaks in through success.

A legal operations team starts by asking a model to summarize clauses. The results are good enough that lawyers stop checking the easy summaries line by line. Then the prompts get richer. The model extracts obligations, compares language with a playbook, identifies missing terms, drafts suggested edits, and routes unusual cases. Six months later, the model is no longer a writing aid. It is a quiet layer in the process by which work reaches a lawyer’s attention.

Now replace the model.

The replacement may be better by almost every published measure. It may reason more accurately. It may use tools more reliably. It may be faster and cheaper. It may also interpret the internal shorthand differently. It may decline to make an inference the older model made. It may produce better prose and worse tables. It may call a retrieval tool more often, increasing latency. It may be more cautious about ambiguous instructions, turning what used to be a one-step flow into a clarification loop. It may discover a subtle legal issue the old system missed and therefore send three times as many contracts to the exception queue.

The new model can be better.

The system can get worse.

This is one of the first ideas a robust organization has to make intuitive: **a model upgrade is a system change, not a brain transplant into an otherwise untouched body.**

The model’s intelligence is embedded in a surrounding arrangement of prompts, examples, retrieval, permissions, tools, schemas, validators, queues, people, service-level expectations, and downstream assumptions. Change the model and the behavior of the arrangement can change.

The strange part is how easily a temporary behavior starts to feel permanent.

We are good at turning yesterday’s luck into today’s architecture.

A model happens to return valid JSON almost every time, so the parser gets less defensive. A model usually cites the retrieved document, so nobody adds a separate check that the cited document actually contains the claim. A model politely refuses when asked to take an action outside scope, so the team treats politeness as a permission boundary. A model’s latency is low enough that a synchronous workflow feels safe, so no queue is built. A particular provider offers generous context at a tolerable price, so the company begins shoving entire case files into prompts instead of creating durable information architecture.

Then something moves. Price is a system property. Latency is a system property. Rate limits are a system property. Context behavior is a system property.

Safety policy is a system property. Tool-use behavior is a system property.

A migration can therefore expose assumptions that nobody knew were assumptions.

The right lesson is not to abstract everything.

This is where robustness can turn stupid if practiced as religion.

Imagine a startup with six months of cash and one chance to discover whether customers care about its product. It has found a model that is dramatically better than alternatives at the central task. The model exposes proprietary capabilities through a provider-specific interface. Building a compatibility layer across four vendors would consume two engineers for a month and force the product down to the least common denominator.

The robust move may be to integrate deeply.

Yes, deeply.

Robustness is not the refusal to depend. It is the ability to recognize the dependency, price it, and preserve proportionate ways out.

The startup can integrate deeply while keeping its own data model separate from the provider’s. It can record examples of successful and failed outputs. It can make model selection a configuration rather than spread identifiers through the codebase. It can keep the business rule outside the prompt. It can store customer context in a form that another model could read later. It can define what “good enough” means before migration becomes urgent.

That is a very different posture from pretending the provider is interchangeable today.

Optionality is not binary.

You do not either possess it or lack it. You purchase degrees of it.

A second provider already running in production is expensive optionality. A tested adapter is cheaper. A migration prototype is cheaper still. A clean internal interface is cheaper than that. A set of representative evaluation cases is cheaper again. At the lowest end, simply knowing which behaviors are provider-specific is more optionality than discovering them during an outage.

The question is how much future freedom the current consequence justifies buying.

The model-retirement table makes this question concrete because it gives movement a date.

A date does something psychologically useful. “We may need to migrate someday” is background anxiety. “This version retires October 1” is a project.

Teams inventory dependencies. They run evaluations. They test the replacement. They find regressions. They discover old prompts that can be deleted. They rewrite brittle parsers. They change budgets because the new model’s price is different. They notice that a workflow has become more autonomous than anyone remembers authorizing.

Migration is annoying.

It is also diagnostic.

The strongest systems use forced change to discover what had quietly hardened.

This is familiar outside AI. An office move reveals which processes require people to be physically near one another. A key employee’s vacation reveals which tasks were never documented. A bank switch reveals which subscriptions, payroll flows, and customers still depend on an old account. A supply interruption reveals the component everyone described as a commodity until it became unavailable.

AI migrations reveal behavioral coupling.

They show which parts of the organization have begun to rely on a model’s habits.

That is worth mapping before the retirement notice.

A simple dependency map can begin with six questions.

**What do we send the model?**

Not just “prompts.” Customer data? Source code? Contracts? Credentials? Proprietary strategy? Images? Documents whose licensing terms matter? Retrieved information from internal systems? The more sensitive and structured the input, the more migration includes data governance rather than mere API work.

**What do we expect back?**

Free-form text is forgiving. A tool call with financial consequence is not. A schema consumed by another machine is less tolerant than an answer consumed by a person. A robust map distinguishes outputs by consequence and strictness.

**What behavior have we learned to rely on?**

Does the model ask questions? Refuse certain tasks? Preserve wording? Cite? Use tools? Follow a house style? Keep quiet when uncertain? Guess? The embarrassing answer is often that nobody knows because the behavior was never written down.

**What surrounds it?**

Retrieval systems, prompt templates, memory, vector stores, safety filters, validators, caches, queues, permissions, tool registries, human approvers, and monitoring. The model is usually the glamorous part of a much larger machine.

**What happens if it disappears for a day?**

This question exposes operational dependence. Does work stop? Queue? Shift to another model? Return to a manual process? Continue in a reduced mode? Does anybody know who gets to make that decision?

**What happens if it gets much better?**

This one is less obvious.

A system can be brittle to improvement.

Suppose an organization built elaborate verification steps because the old model made a certain class of mistakes. The new model removes most of them. Keeping all the verification may now waste time and money. Or suppose a better model can complete the entire task rather than merely draft it. The existing workflow may prevent the organization from capturing the improvement because its architecture assumes a human must perform all intermediate steps.

Robustness must allow gains through as well as keep failures out.

That is why the robust organization treats model migration as a normal capability, not a fire drill.

Normal capabilities have owners.

They have artifacts.

They have rehearsals.

There is a list of representative tasks. There is a record of how the current system performs. There are thresholds for unacceptable regression. There is a known rollback. There is enough observability to tell whether the migration worked for users rather than merely whether the API returned 200.

Most importantly, there is a distinction between the **model contract** and the **business contract**.

The model contract contains what can change with the model: syntax, latency, tokenization, tool behavior, refusal patterns, pricing, context limits, modalities, provider-specific features.

The business contract contains what the organization owes regardless: the invoice must be right; the customer’s private data must remain private; the legal filing must reach the court; the recommendation must be traceable; the order must not exceed the approved amount; the employee must be paid.

Weak systems mix the two.

They let a model’s convenience define the business process.

Robust systems make the business contract explicit and use the model as one way of satisfying it.

“One way” does not always mean “one of many live vendors.” It means the organization remembers that the outcome is the point.

This sounds almost too obvious until a model becomes good enough to be mistaken for the outcome itself.

That is what capable tools do. They disappear into the work.

Nobody says, “I am now depending on this particular implementation detail.” They say, “Send it through the system.”

The system becomes normal. Normal becomes invisible. Invisible becomes structural. Then the calendar arrives.

There is a peculiar advantage to building on technology that openly admits it will be replaced. It can cure us of pretending that permanence is a feature we were ever offered.

A model retirement date is not a threat.

It is a design requirement written in advance.

The requirement says: use this while it is useful. Learn its strengths. Integrate where integration earns its cost. Take the gains. Move faster.

But keep enough of yourself that when this intelligence leaves, you can meet the next one without rebuilding your company from memory.
