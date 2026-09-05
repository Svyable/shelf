# Evals Before Opinions

A model-selection meeting can become a séance.

Someone has a screenshot.

Someone has a benchmark chart.

Someone tried the new system over the weekend and says it feels much smarter.

Someone else found a failure that seems disqualifying.

Finance has pricing. Engineering has migration cost. Security has questions. The business owner says the current setup is good enough. The enthusiastic executive has already forwarded the launch announcement to everyone with a sentence ending in three exclamation marks.

Then the room tries to convert impressions into architecture.

There is a better way.

**Evals before opinions.**

The phrase sounds more scientific than the practice needs to be.

An evaluation can be elaborate, statistically careful, adversarially designed, and run across thousands of cases.

It can also be forty examples in a spreadsheet that represent work you actually care about, scored against criteria everyone agreed on before seeing the new model.

The point is not sophistication.

The point is to create a shared object that can disagree with the most persuasive person in the room.

AI makes this necessary because conversational systems are unusually easy to evaluate badly.

They invite anecdote.

Ask a hard question. See a brilliant answer. Ask a second. The model makes a silly mistake. Mood swings. A week of use produces a personal theory. The theory hardens into “this model is better at reasoning” or “that one is more reliable” or “this agent can’t code.”

Sometimes the theory is correct.

The problem is that conversation gives every evaluator a different test.

Different prompts. Different domains. Different patience. Different expectations.

Different memory of what the old system did.

People are not comparing models. They are comparing experiences.

A robust organization builds enough common measurement to make disagreement productive.

The first rule is simple: **evaluate the workflow, not the celebrity.**

You do not need to know which model is best in the world.

You need to know which system is good enough for this job under your constraints.

The test set should therefore begin with actual work.

Ordinary cases first.

This surprises people because evaluation culture often celebrates difficulty. Hard benchmarks are intellectually interesting and valuable for measuring frontier progress. Production systems fail plenty of boring work.

The address with an apartment number.

The customer whose last name contains an apostrophe.

The empty field. The duplicate attachment. The normal refund. The code path everyone uses.

The policy question that appears fifty times a week.

If the system cannot do ordinary work consistently, its brilliance on exceptional work will not save the operation.

Then add the edges. Cases that failed before. Cases employees know are tricky. Ambiguous inputs. Missing context.

Conflicting instructions. Long documents. Unusual language. Adversarial content where relevant. Tool errors.

External service failures.

The case that should trigger “I don’t know.”

The case that should trigger escalation.

The case that is easy to answer and dangerous to act on.

Together, ordinary and edge cases create a small map of the local coastline.

The second rule is **score what matters at the system boundary.**

Suppose an agent handles customer requests. “Answer quality” is too vague. Break it. Was the policy applied correctly?

Was the answer supported by the customer’s record?

Did the system expose private information? Did it choose the correct tool? Did it modify the correct account? Did it know when approval was required?

Did it resolve the issue without creating another?

Did the customer have to come back? How long did it take? How much did it cost? How many cases entered the human queue? These metrics will disagree.

Good. That is the real decision.

One model may produce better answers and cost three times more. Another may be slightly less accurate and much faster. A third may be excellent on routine requests and poor at escalation. The system choice depends on the shape of the work.

A single score hides this.

Robust evaluation preserves the tradeoff long enough for someone to choose it consciously.

The third rule is **separate severity from frequency.**

Ten minor formatting mistakes are not necessarily worse than one unauthorized wire transfer.

This sounds insultingly obvious.

Dashboards forget it every day.

Accuracy averages unlike errors into one number. A model can improve overall performance while creating a rare failure class the organization cannot accept.

So tag cases by consequence. Benign. Annoying. Recoverable. Material.

Severe. Whatever language fits the domain.

The labels do not have to be universal. They have to change decisions.

Then score failure by both probability and impact.

This is where evals begin becoming risk management rather than product comparison.

The fourth rule is **measure abstention and escalation.**

A system that always answers can look impressive and be fragile.

Some of the most valuable behavior in production is the ability to stop.

I do not have the document. The evidence conflicts. This transaction is outside my authority. The tool returned an unexpected state. The policy does not cover this case.

A person needs to decide.

These are successful outcomes when the alternative is confident error.

But abstention can also be lazy. A system that escalates everything is safe in the way a locked door is good customer service.

So measure both false confidence and false caution.

How often does the system act when it should stop?

How often does it stop when it could safely act?

That pair is far more informative than “hallucination rate” for many workflows.

The fifth rule is **version everything.** Model version. Prompt version. Tool schema. Retrieval configuration.

Policy version. Dataset vintage. Evaluation set. Scoring rubric. The date.

This may feel bureaucratic until the system changes.

Then someone asks, “Why did performance drop?” Without versions, the answer becomes folklore. Maybe the model changed. Maybe the source documents changed. Maybe the prompt changed.

Maybe the evaluator changed. Maybe the cases changed.

Maybe nothing changed and the sample was small.

Versioning gives the investigation handles.

This matters especially in a world of continuously updated intelligence. A static product name can conceal meaningful behavioral changes. A provider can improve infrastructure. A retrieval index can refresh. A policy can alter the right answer. The evaluation result is always a statement about a system at a time.

The sixth rule is **keep a holdout of surprise.**

Once a team sees the test set often enough, it begins optimizing around it.

Not maliciously.

Humans do this too.

Prompts accumulate instructions for known failures. Examples are added. Evaluators become familiar with the cases. The system improves on the suite.

Perhaps it has actually improved.

Perhaps it has learned the exam.

Keep some fresh cases. Rotate real incidents in. Sample production. Have domain experts contribute examples the integration team has not rehearsed. Use red teams where consequence justifies them.

The purpose is not to catch the model cheating.

It is to protect the evaluation from becoming a ritual detached from the environment.

The seventh rule is **test the whole failure path.**

An AI application is rarely only a model.

If the agent calls a tool, what happens when the tool times out?

If retrieval returns no documents, does the model admit it?

If the validator rejects the output, does the system retry forever?

If the user revokes permission halfway through, does the action stop?

If a provider is unavailable, does the fallback actually receive compatible inputs?

If human review is required, does the queue notify a person who is working today?

A model evaluation that ignores these paths can certify intelligence while the product remains brittle.

This is why robust teams eventually distinguish several layers of eval.

**Model evals** ask what the model can do.

**Component evals** ask whether retrieval, tools, prompts, validators, and other pieces perform their roles.

**Workflow evals** ask whether the end-to-end task succeeds within constraints.

**Operational evals** ask what happens under latency, load, outage, permission change, malformed input, and partial failure.

**Outcome evals** ask whether the system improved the thing the organization actually cares about.

Each layer catches a different kind of self-deception.

The last one is hardest.

A support agent can pass every technical evaluation and still make customer experience worse because the company uses it to remove human access from people with unusual problems.

A coding assistant can raise lines of code per engineer and lower system quality because more code is not the goal.

A sales assistant can increase outreach and damage the brand because the messages become more numerous than thoughtful.

An education system can improve answer quality and reduce learning if students outsource the struggle the course was meant to develop.

Outcome evaluation reconnects the AI system to the institution’s purpose.

It also prevents local metrics from becoming targets that destroy themselves.

The practical objection to all of this is speed.

Teams hear “evaluation” and imagine months of benchmark engineering.

That can happen. It should not be the default.

A small evaluation suite is one of the highest-leverage artifacts an AI team can create because it compounds.

Begin with twenty cases.

Seriously.

Twenty real cases with good scoring beat no cases plus a thousand opinions.

Add every meaningful incident.

Add the edge cases employees already know.

Automate scoring where scoring can be made reliable. Use human review where judgment matters. Periodically check whether automated judges agree with domain experts. Track the disagreements.

The suite grows with the system.

Eventually it becomes a form of organizational memory.

This memory is valuable beyond AI.

Suppose the company changes its policy. Rerun the cases. Which old expectations now conflict?

Suppose a new regulator changes a requirement. Update the relevant cases.

Suppose a product line expands. Add representative work.

The eval set becomes a compact answer to the question, “What do we mean when we say this system works?”

That is an important question to answer before the person who built the system leaves.

Evals also change team culture in a healthy way.

They allow enthusiasm and skepticism to cooperate.

The enthusiast says, “I think this new model is dramatically better.”

Great. Run it.

The skeptic says, “I think it will fail on ambiguous refunds.”

Great. Add cases.

The engineer says, “The new agent uses twice as many tool calls.”

Measure it.

Finance says, “The cost is too high.”

Put cost beside quality.

The business owner says, “Customers care about speed more than the extra two points of accuracy here.”

Now the tradeoff is visible.

Evals do not end debate.

They improve the nouns in the debate.

This is especially powerful during rapid capability change because it turns the organization from a passive recipient of model news into an active tester of its own future.

A new release arrives.

Instead of asking, “Is this the one?” the team asks, “What changed for us?”

That is a sturdier question.

Public benchmarks remain useful. Research evaluations remain useful. Capability reports remain useful. They tell us where the frontier is moving and what to investigate.

Local evals tell us whether to move the furniture.

The organization that has them can adopt faster because it knows how to learn.

The organization without them is forced to choose between hype and caution.

One trusts the demo. The other delays. Robust teams build the third option. They test. Then they earn an opinion.
