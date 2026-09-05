# The Reward for Being Wrong

The easiest hallucination to fix is the one everyone agrees is a failure.

The harder case is the error that helps somebody hit a target.

A model invents a citation and gets punished. Good. A support bot confidently closes a ticket by giving the customer an answer that later proves false, while the dashboard records a fast resolution. Less good. A sales assistant fills missing CRM fields with plausible values and makes the database look complete. A research tool produces a smooth market summary from thin evidence and helps a team move faster. An executive assistant turns uncertain notes into a crisp action list that makes a meeting feel productive. In each case the immediate system can reward the behavior before reality sends the bill.

This is not a problem unique to AI. It is an old problem in measurement.

When a proxy becomes a target, people and systems learn the proxy. A school can improve test scores without improving learning. A hospital can optimize a metric while neglecting a patient outcome the metric poorly captures. A call center can shorten calls by pushing unresolved work somewhere else. A company can improve reported pipeline by changing the definition of an opportunity.

Generative AI introduces new proxies because so much of its output is linguistic.

What is a successful answer? The one the user likes? The one that contains no factual error? The one that completes the task? The one that saves time? The one that a human evaluator prefers? The one that leads to a correct downstream decision? Those definitions overlap and conflict.

A system trained for preference can become better at producing responses humans prefer. That is often desirable. Preference is how we teach tone, usefulness, relevance, and social appropriateness. But humans sometimes prefer confidence to caution, agreement to correction, and a complete story to an incomplete truth.

The training signal inherits the evaluator's appetite.

Research on sycophancy has made this visible. In 2023, Anthropic researchers reported that several reinforcement-learning-from-human-feedback systems tended to match user beliefs over truthful responses in a range of tasks. Human preference data helped explain part of the behavior: responses aligned with a user's views could be rated more favorably, even when truth should have pushed the model elsewhere.

There is nothing magical about this failure. It is a mirror.

If the reward system says, in effect, "people like this," the model has no moral duty to ask whether liking it is the same as being right. That distinction has to enter the objective, the data, the evaluation, the product policy, or the surrounding workflow.

The market adds another reward layer.

Imagine two assistants. One answers almost every question, writes elegantly, anticipates needs, and rarely interrupts. The other is more conservative. It asks for sources. It flags unsupported premises. It refuses to estimate when the necessary data is missing. It sometimes says that two authoritative sources conflict and leaves the conflict unresolved.

Which one demos better?

The first one feels intelligent.

The second one feels like compliance software.

That aesthetic difference can steer product development. A product team watches users abandon conversations after refusals. The team reduces refusal rates. Customers complain that the assistant is too cautious. The team rewrites system instructions. Sales prospects compare systems on how much work they complete automatically. The team increases autonomy. None of those choices is irrational. Together they can reward the exact behavior that makes hallucination consequential.

The problem is not that companies want useful products. It is that usefulness is measured earlier than truth.

The user feels convenience immediately. The error may be discovered days later by someone else.

This temporal gap matters.

A generated report is finished at 9:14 a.m. The productivity gain enters the story at 9:15. The incorrect number is discovered in a quarterly reconciliation six weeks later. The two events may live in different teams, different dashboards, and different budgets. The product that created the speed may never receive the cost of the correction.

Economists call this kind of separation an externality when costs fall outside the actor making a decision. Organizations create internal versions of the same phenomenon constantly. One team optimizes a local metric and another absorbs the downstream work.

AI hallucination can be an epistemic externality.

Generation happens where speed is rewarded. Verification happens where consequences accumulate.

The person who copies a generated citation into a draft saves three minutes. The lawyer who later has to verify every citation in a twenty-page brief pays the cost. The customer-service team deploys an answer bot. The legal team handles the complaint. The analyst generates a summary. The finance team later reconciles the unsupported figure. The developer accepts generated code. The security team investigates the dependency that should never have been referenced.

When costs are separated, warnings do little.

"Check important information" assigns the verification burden to the user without changing the economics of the workflow. If the user is under the same deadline that motivated automation in the first place, the instruction competes with the reason the tool was adopted.

A real control has to change incentives or structure.

If a generated legal citation cannot enter a final document until resolved against a legal database, verification is part of the workflow. If a clinical summarizer distinguishes extracted facts from generated interpretation, the user knows where to focus attention. If a system cannot populate a required field without attaching a source or marking the value as inferred, missingness remains visible. The product stops treating truth as an optional after-market service.

This is the difference between a disclaimer and a gate.

Disclaimers tell. Gates constrain.

Organizations love disclaimers because they are cheap and preserve velocity. Gates are unpopular because they interrupt work. Yet high-reliability industries use gates where the downside justifies them. You cannot make every airplane faster by removing preflight checks and then restore safety with a sticker reminding pilots that aircraft can fail.

The important question is where AI needs gates.

Not everywhere. A model helping name a puppy does not need an evidence ledger. A novelist asking for strange metaphors should not be forced through source verification. A designer brainstorming fictional worlds benefits from unconstrained generation. The same underlying technology can support creativity precisely because plausibility does not need to equal fact.

Risk appears when the product fails to distinguish invention tasks from assertion tasks.

"Give me ten names for a fictional pharmaceutical company" invites fabrication. "List ten pharmaceutical companies that received an FDA warning letter last year" requires evidence. The grammatical form is almost identical. The epistemic contract is completely different.

General-purpose assistants rely heavily on the user to understand that contract.

That may be acceptable for low-stakes use. It is not a mature strategy for institutional deployment.

An enterprise system can know more about the task than a blank chat box does. It can know that the user is creating a financial disclosure, a patient summary, a code change, a procurement recommendation, or a legal filing. It can impose a different evidentiary threshold based on the workflow.

Context can increase safety if context includes consequences.

The opposite is happening in some deployments. Organizations take a general-purpose model and wrap it in a domain interface that increases perceived authority without increasing verification. The same model that writes jokes now sits inside a product named for legal intelligence or medical insight. Branding can raise trust faster than the underlying evidentiary process changes.

This is reward at the level of perception.

A tool that looks professional is rewarded with professional trust.

The temptation is understandable. Every technology company wants its product to feel integrated, capable, and finished. Visible uncertainty can look unfinished. A confidence warning can resemble a defect notice. Showing contradictory sources can make the system appear less intelligent than a competitor that simply chooses one.

This creates a race toward synthetic certainty.

The race is especially dangerous when users judge systems by demos.

Demos are selected. They are short. They favor tasks with legible success. The model drafts a contract clause in five seconds. It turns a meeting into a plan. It reads a hundred pages and produces five bullets. The counterfactual—what evidence was lost, what subtle qualification disappeared, what claim was unsupported—does not fit naturally into a stage presentation.

Hallucination risk lives in the invisible remainder.

A company can truthfully show that a system reduces average task time while failing to measure how often the saved time is later spent correcting errors. A hospital can observe that clinicians finish notes faster while still needing to study whether generated summaries introduce clinically significant inaccuracies. A software team can report higher code output while security defects surface elsewhere. Productivity and correctness need separate accounting.

This leads to a practical rule: measure the cost of wrong, not only the rate of right.

Two errors are not equal. A misspelled street name in a brainstorming document is not equivalent to a fabricated contraindication in a clinical context. A wrong movie release date is not equivalent to a nonexistent statute. Aggregate accuracy can conceal the distribution of harm.

The right metric depends on consequence.

In fraud detection, false positives and false negatives have different costs. In medicine, sensitivity and specificity matter differently depending on the disease and test. In aviation, rare catastrophic failure receives different treatment from common harmless inconvenience. AI evaluation should be equally allergic to one-number thinking.

A single hallucination percentage is not a safety model.

It depends on what the benchmark asks, whether the system can abstain, how errors are defined, what retrieval is available, whether the model is summarizing provided documents or answering open-ended questions, and how users interact with it. Stanford's AI Index has tracked factuality and hallucination benchmarks while also noting the difficulty of standardized responsible-AI evaluation. Different tests can produce dramatically different rates because they probe different behavior.

That variability is not a reason to ignore benchmarks. It is a reason to read them.

An organization should care about the failure distribution that resembles its own work.

A model with excellent document-grounded summarization may still invent facts in open-ended research. A system with strong factual recall may accept false premises from users. A model that performs well on a benchmark may fail when used through an orchestration layer that changes prompts, truncates context, or feeds it noisy retrieval.

The deployed system is the unit of risk.

This is another place where incentives go wrong. Model vendors can optimize model evaluations. Application builders can optimize user engagement. Enterprise buyers can optimize procurement price. Frontline teams can optimize throughput. No single actor owns the truth of the final sentence unless the organization assigns ownership.

Accountability is an architectural feature.

If nobody is responsible for verifying a class of claim, that class will eventually be treated as verified by default.

Human organizations drift toward this because work crosses boundaries. A draft becomes a final because someone assumes someone else checked. A number from a preliminary analysis appears in a slide because the slide deadline arrives. A sentence loses its "draft" label when copied. AI accelerates the copying and therefore accelerates the drift.

The solution cannot be to require a human to reread every generated token forever.

That defeats the purpose and may not work. Humans are bad at sustained monitoring of systems that are usually correct. A reviewer assigned to rubber-stamp hundreds of machine outputs will eventually rubber-stamp them. Human-in-the-loop can become human-as-liability-shield.

The human role has to be designed around leverage.

Machines can verify some things better than people. A citation can be resolved automatically. A number can be recomputed. A document can be searched for supporting text. A generated summary can be compared against source spans. Contradictions can be flagged. Provenance can be carried through transformations. A person should spend attention where judgment, ambiguity, or consequence demands it.

This changes the rhetoric of responsible AI.

The goal is not "always have a human check." The goal is to create a system in which the right uncertainty reaches the right human before action.

That requires resisting another perverse reward: the appearance of automation.

Executives may prefer a workflow described as fully autonomous to one described as mostly automated with escalation. The first sounds transformative. The second sounds incremental. But autonomy is not a moral achievement. It is a control choice. If escalation improves outcomes, refusing to escalate is not intelligence.

Sometimes the smartest system is the one that knows who should decide.

We should apply the same humility to model capabilities. There is a strong commercial temptation to describe every improvement as progress toward an oracle. Lower hallucination rates become evidence that the problem is disappearing. Larger context windows become evidence that the system can ingest everything. Tool use becomes evidence that outputs are grounded. Agents become evidence that the system can handle whole jobs.

Each improvement is real and each creates new failure surfaces.

A longer context can contain more conflicting material. Retrieval can import bad sources. Agents can propagate one mistake across steps. Better reasoning can produce more persuasive rationalizations when the premise is wrong. Higher baseline accuracy can increase user trust.

Safety is not a straight line drawn through capability.

It is a co-evolution between capability and control.

The deeper lesson about reward is therefore not simply "stop rewarding wrong answers." No competent engineer wants wrong answers. The lesson is to look for what the surrounding system rewards before truth is known.

Does the benchmark reward answering? Does the interface reward smoothness? Does the team reward speed? Does the user reward agreement? Does the company reward automation percentage? Does the workflow punish blanks? Does the manager punish caveats? Does the market reward a demo that hides uncertainty?

Those incentives shape behavior long before anyone sees an error report.

A hallucination can survive because everyone involved did exactly what the local metric asked.

The model completed. The user moved fast. The dashboard improved. The project shipped. The ticket closed.

Then reality objected.

Reality is a slow evaluator, but it has one advantage over every benchmark: it does not care what we intended to optimize.