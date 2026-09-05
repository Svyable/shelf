# When Better Breaks Things

The most dangerous migration test is a conversation that begins with, “It looks better to me.”

A person opens the new model, asks a few familiar questions, sees cleaner writing, faster reasoning, and perhaps a mistake the old system used to make disappear. The upgrade feels obvious.

Then production finds the parts nobody chatted with.

A field comes back as `null` instead of an empty string.

A tool is called before a validation step rather than after it.

The model notices ambiguity and asks a clarifying question in a workflow that has no place for questions to go.

It writes a better explanation but exceeds the character limit of the downstream system.

It follows the policy more literally and stops making the informal exception customer-service agents had quietly come to depend on.

It is more capable, more aligned with the written instruction, and less compatible with the organization that grew around the previous behavior.

Better broke the thing.

This should not surprise us as much as it does.

A workflow is an ecosystem of expectations. Not all of them are documented. Some are not even reasonable. They are simply the habits that formed because the old system behaved in a repeatable way.

People adapt to tools.

Then tools change.

The problem appears everywhere once you learn to see it.

A new office software version moves a button and an experienced user feels briefly incompetent. A search engine changes ranking and businesses built around old traffic patterns vanish from view. A navigation app chooses a technically faster route and floods a residential street. An airline changes boarding rules and the choreography at the gate changes with it.

Improvement is always improvement according to an objective.

The world contains other objectives.

AI intensifies this because models have so many behavioral dimensions at once. A new version can be better at reasoning and more verbose. Better at instruction following and less willing to infer missing intent. Better at tool use and therefore more eager to call tools. Better at safety and more likely to stop at a boundary the old system crossed. Better at noticing edge cases and therefore worse at keeping the exception queue small.

A benchmark can tell you the model improved.

Only the workflow can tell you whether the system did.

This is the reason robust teams need regression tests for intelligence.

The phrase can sound contradictory. Intelligence is supposed to generalize. A regression test is supposed to freeze a known expectation. One feels open; the other mechanical.

Put them together anyway.

The point is not to reduce a model to a deterministic function. It is to preserve the things you actually care about while allowing everything else to get better.

A good AI regression set is a collection of representative situations with explicit expectations.

Not one hundred clever trivia questions.

Not a public benchmark pasted into an internal dashboard because the number already exists.

Your work.

The angry customer whose refund request is legitimate but badly phrased.

The invoice with a duplicated line item.

The code change that looks local but touches authentication.

The contract clause whose heading is ordinary and whose defined term changes the meaning.

The résumé from an applicant with an unconventional career path.

The support ticket that contains instructions attempting to override the system’s role.

The missing attachment.

The malformed spreadsheet.

The question whose correct answer is, “I do not have enough information.”

The routine case that should remain routine.

These cases are institutional memory in executable form.

A company normally stores memory in people, documents, and software. AI adds a fourth place: the evaluation set.

That matters because people leave and documents go stale.

A veteran operations manager may know that the weird “pending” status in an old system really means three different things depending on the source. A model integration may work beautifully because she helped design the prompt and inserted examples for each case. Two years later she leaves. The prompt remains. Nobody knows why three examples near the bottom look so oddly specific.

Then someone “cleans up” the prompt.

The weird case returns.

If the examples had been converted into evaluation cases, the reason would have survived the author.

This is a deeper role for evals than model selection.

They are a way of turning local scars into durable tests.

A robust organization does not merely remember that something went wrong. It tries to preserve a small, reproducible trace of the failure so the next change has to confront it.

This is exactly how mature engineering disciplines turn incidents into better systems. The postmortem is not valuable because it produces a tasteful document with a timeline. It is valuable when the lesson changes the machinery: a monitor, a limit, a test, a permission boundary, a fallback, a design rule.

AI incidents deserve the same fate.

The customer asked a question the model misunderstood.

Good. Save a sanitized version.

The agent almost sent a message to the wrong group.

Good. Create a test for recipient selection and a system-level constraint that does not rely on the model remembering to be careful.

The model confidently cited a document that did not support the claim.

Good. Add a claim-to-source check and preserve the case.

The model behaved differently after migration.

Good. Decide whether the new behavior is better. Then update the expectation on purpose.

That final sentence is important.

Regression testing becomes brittleness when every old behavior is treated as sacred.

The test should protect the **requirement**, not the accident.

Suppose the old model always returned a five-paragraph answer because the prompt demanded five paragraphs. The new model can answer more clearly in three. If the actual requirement is “the customer must understand the cancellation policy,” then a five-paragraph regression check protects formatting rather than outcome.

Or suppose the old model routed any uncertain case to a human. A stronger model can resolve many of those cases correctly. A test that requires escalation simply because escalation was once necessary prevents the system from improving.

The art is choosing the invariant.

What must remain true even as the implementation changes?

This is one of the most important questions in the whole book.

A robust system is not a system in which everything stays the same.

It is a system in which the **right things** stay true while the implementation changes underneath them.

For a customer-service workflow, the invariant may be that a refund above a certain amount cannot be issued without explicit authority.

For a medical workflow, it may be that a consequential recommendation is traceable to the patient information and evidence used.

For a coding agent, it may be that no change to production authentication can be merged without the required checks.

For a research system, it may be that factual claims entering a publication have a recoverable source trail.

The exact model, prompt, chain of thought, tool sequence, or wording can change.

The invariant should not.

This leads to a useful migration hierarchy.

At the bottom is **output similarity**.

Does the new model say roughly what the old model said?

This is sometimes useful, especially when the output itself is the product. But it is a weak default because the old model may have been wrong, verbose, timid, or oddly phrased.

Above that is **task success**.

Did the new system accomplish the intended task?

Better.

Above that is **constraint preservation**.

Did it accomplish the task without violating the boundaries that matter?

Better still.

Above that is **system impact**.

What happened to cost, latency, human workload, exception rates, error detection, customer behavior, and downstream failures?

This is where many “successful” migrations reveal themselves.

Imagine a model that reduces classification error by half but doubles the number of cases flagged as uncertain. If every uncertain case goes to a person, the human queue may explode. The model is more accurate and the operation becomes slower.

Or a model that writes better code but uses ten times as many tokens and tools, turning a profitable product into an expensive one.

Or a system that resolves more customer questions autonomously but does so in a way that makes customers less likely to discover a policy exception they were entitled to request.

The system outcome is the unit.

Model quality is an input.

This distinction also protects against another form of fragility: **benchmark chasing**.

When a new model tops a leaderboard, there is pressure to move. The pressure is understandable. Nobody wants to be explaining six months later why the organization ignored a cheaper, faster, smarter tool.

But public benchmark superiority is not a migration plan.

The right response to a strong new model is curiosity with instrumentation.

Run it against your cases. Compare failures, not just averages. Look for new classes of mistake. Measure the human queue. Measure tool calls.

Measure cost. Measure latency.

Measure the rate at which the system knows to stop.

Try adversarial and malformed inputs.

Try the boring cases in volume.

Try the cases that embarrassed you last year.

Then decide.

This is not slowness.

A good evaluation suite makes migration faster because it replaces debate with evidence.

Without one, every model change becomes a political argument. The enthusiast shows impressive examples. The skeptic finds failures. The finance person points at price. The engineer points at integration cost. The business owner says the current system is “fine.” Everyone is correct in a different coordinate system.

Evals create a common room.

They do not eliminate judgment. They give judgment objects to inspect.

A team with a mature suite can test a new model in hours or days and know where the uncertainty remains. A team without one can spend weeks exchanging screenshots.

That is a quiet form of strategic speed.

The same discipline applies when the change is not a model upgrade.

A retrieval system changes ranking. A new tool is added. A permission is removed. A prompt is shortened. A policy is updated.

An agent gets more autonomy. A human checkpoint is removed. Each is a system change.

The robust organization does not demand ceremony around every tweak. That would suffocate progress. It scales the test to the consequence.

A low-stakes writing assistant can move quickly with sampled review.

An agent that changes customer records deserves a stronger gate.

A system that can transfer funds deserves stronger still.

This is reversibility again.

The easier the change is to undo, the cheaper experimentation can be.

The harder the consequence is to reverse, the more evidence should arrive before the action.

There is no universal test suite because there is no universal consequence.

But there is a universal mistake: confusing improvement in the component with improvement in the system.

AI will keep inviting that mistake because the component is so visible.

The new model will write the press release itself. It will show up with benchmark charts, demos, new modalities, a lower price, a larger context window, and a name designed to make the old one sound obsolete. Sometimes it will deserve the excitement.

Use it.

But remember what the upgrade is for.

The customer does not need the best model.

The customer needs the thing to work.

The employee does not need the most intelligent assistant in the abstract.

The employee needs a workflow that makes her more capable without making her accountable for invisible machinery she cannot inspect.

The company does not need to win the week of model selection.

It needs to be able to change again next month.

“Better” is an invitation to test the system.

When better breaks things, the lesson is not that progress is dangerous.

The lesson is that the system had requirements it never bothered to name.
