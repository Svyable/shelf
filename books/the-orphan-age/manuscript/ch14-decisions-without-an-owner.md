# Chapter 14 — Decisions Without an Owner

A model can keep making decisions after the argument for using it has gone stale.

That is a different kind of legacy system.

Traditional software usually does what programmers explicitly specified, even when the specification becomes obsolete. A machine-learning system adds another layer. Its behavior can depend on patterns learned from data, thresholds chosen during development, evaluation results from a particular period, assumptions about users, and a deployment environment that continues to move.

The code can remain unchanged while the population changes.

The data pipeline can remain healthy while the meaning of the data changes.

The model can keep returning a score with six decimal places while the evidence that justified the score becomes less relevant each month.

Nothing crashes.

That is the problem.

A failing server announces itself.

A stale decision system can continue operating politely.

Artificial intelligence makes orphan load harder because output can look like fresh judgment even when governance is old.

A human opens a screen today and sees a recommendation generated today.

The model behind it may have been trained two years ago.

The labels may come from a process that has since changed.

A vendor may have updated a component without the user seeing the change.

A policy threshold may have been chosen for a risk tolerance that is no longer current.

The interface collapses all that history into one present-tense answer.

This is why lifecycle governance matters.

The National Institute of Standards and Technology’s AI Risk Management Framework treats AI risk as a continuing process rather than a one-time model evaluation. Its governance material explicitly includes policies and procedures for decommissioning systems when necessary. The Government Accountability Office has similarly emphasized accountability frameworks that span governance, data, performance, monitoring, and oversight.

The important word is *decommissioning*.

AI discourse is full of verbs for creation.

Train.

Fine-tune.

Deploy.

Scale.

Integrate.

Automate.

Decommission is the verb that proves the system has an owner.

Someone can say: this model should no longer decide.

That authority is more important than it first appears.

A team can monitor a model perfectly and still be unable to stop it because the model has become embedded in operations. A vendor contract depends on it. A staffing model assumes it. A regulator expects a report produced from it. A downstream team built an automation around the score. Managers have stopped maintaining the human capacity to perform the task manually.

The model is technically replaceable and institutionally trapped.

This is the same condition we saw with legacy software.

Entanglement converts a tool into infrastructure.

AI can accelerate the process because automated decisions can spread into many workflows quickly. One model becomes a service. Teams call the service from applications. Reports incorporate its outputs. Agents use the output as input to other actions. The original development team may not know every place the decision travels.

The model acquires a dependency graph.

Who owns the final decision then?

The model team?

The application team?

The business process owner?

The vendor?

The executive who approved automation?

The person who acts on the score?

The answer cannot be “the model.”

Responsibility is not computation.

This is the distinction between labor and responsibility introduced in the open-source chapter.

Automation can reduce the labor of analysis.

It does not decide who must answer for the consequences.

A system can be fully autonomous in operation and still require human or institutional accountability.

Aircraft autopilots automate control without owning aviation law. A thermostat automates heating decisions without owning the building. A payment rule can reject a transaction automatically without becoming the legal entity responsible for the customer relationship.

AI feels different because language and prediction resemble judgment.

The resemblance tempts organizations to let responsibility follow the output rather than the institution.

“The model said no.”

“The system flagged it.”

“The algorithm ranked them lower.”

These sentences describe causation.

They do not settle accountability.

A mature AI system needs a named owner for the purpose, not just the artifact.

The purpose owner can answer why the system exists, what decision it informs or makes, what consequences matter, what evidence supports continued use, and what would trigger modification or retirement.

That owner may be a role or committee rather than an individual. The exact governance depends on consequence. A low-stakes recommendation system does not need the same structure as a system involved in employment, credit, medical care, public benefits, safety, or criminal justice.

The stewardship should scale with harm.

This is important because AI governance can otherwise become a paperwork machine applied equally to trivial and consequential uses.

Overgovernance creates its own orphan load.

Every form, approval, model card, inventory field, and review meeting becomes another system requiring maintenance. If governance is too heavy, teams route around it. Shadow AI grows. The inventory becomes fictional.

Good stewardship lowers the cost of responsible ownership.

That means automation should help govern automation.

A model inventory can be populated from deployment systems.

Monitoring can detect changes in input distributions, performance measures, error patterns, latency, cost, or other domain-relevant signals.

Access control can make ownership transitions explicit.

Versioning can preserve which model produced which outcome.

Evaluation suites can rerun as environments change.

Retirement states can propagate to downstream systems.

Documentation can be generated from technical metadata, then completed with human judgment where intent matters.

The answer to an explosion of models cannot be an equal explosion of manual forms.

Stewardship has to scale.

But automated governance still needs human judgment at the boundary where metrics stop answering the real question.

Suppose model accuracy remains stable.

Should the model continue?

Maybe.

But perhaps the underlying task is no longer legitimate. Perhaps the organization has changed policy. Perhaps users now have a better appeal route. Perhaps a new technology performs the task with fewer privacy costs. Perhaps the model is accurate on average but creates an unacceptable failure for a small group. Perhaps the cost of continued monitoring exceeds the value of automation.

Performance is evidence.

Continued justification is broader.

This is where AI resembles law more than ordinary software.

A model can encode a decision rule that becomes institutionalized. People adapt around it. Applicants learn what the system rewards. Employees structure work to satisfy the metric. Managers trust categories because the system produces them. The model’s outputs can reshape the population that later data describes.

The system participates in the world it measures.

That reflexivity means monitoring cannot consist only of comparing predictions with old labels.

The labels themselves may be products of the system.

A fraud model changes which transactions are investigated, which affects which fraud is discovered, which affects future training data.

A hiring-screen model changes who reaches interviews, which affects who becomes an employee, which affects the record of “successful” hires.

A recommendation system changes what people see, which changes what they click, which becomes evidence for future recommendations.

The model can create its own apparent validation.

A steward needs enough distance to ask whether the loop remains desirable.

This is why independent review can matter for high-consequence systems.

The builder sees technical performance.

The business sees operational value.

The affected person sees consequence.

The regulator sees legal obligations.

The security team sees attack surface.

The privacy team sees data exposure.

No one perspective contains the whole lifecycle.

That does not mean every deployment needs a grand council.

It means ownership should include the perspectives necessary to understand the relevant claims.

The Orphan Age keeps returning to this idea: an object is not fully owned when its owner cannot see the obligations it creates.

AI adds another source of orphanhood through vendors.

An organization can depend on a model it does not control. The provider updates the model. Pricing changes. An API version retires. A safety policy changes. Output behavior drifts. Regional availability changes. The service ends.

The customer owns the business process.

The vendor owns the model infrastructure.

The dependency boundary becomes the stewardship boundary.

What happens when the vendor changes faster than the customer can validate?

What happens when the model is no longer available?

Can the process fall back?

Can data be exported?

Can prior decisions be reconstructed?

Can the organization identify which vendor version produced an outcome?

Can it move to another provider without redesigning the entire workflow?

These are not procurement details.

They determine whether the organization owns the decision system or rents it without an exit.

This is why reversibility will matter in a later chapter.

The more uncertain the technology, the more valuable an exit becomes.

AI systems are changing rapidly. A model selected today may not be best next year. Locking an institution tightly to one provider, one prompt format, one proprietary representation, or one workflow can convert technological progress elsewhere into migration cost locally.

A flexible system assumes replacement.

Not because the current model is bad.

Because the field is alive.

There is a deeper time problem too.

AI models can outlive their training context in ways humans find difficult to perceive because language remains fluent.

Imagine a model trained on procedures from a company as it existed in 2025. The company changes pricing, product names, reporting lines, legal terms, and security policies over three years. Retrieval systems can provide updated documents, but some learned tendencies and latent knowledge remain tied to older patterns.

The model can produce an answer that sounds institutionally confident and is institutionally stale.

Fluency hides age.

Traditional databases expose timestamps.

Language models can blend vintages.

This creates a stewardship requirement for grounding, provenance, and boundaries around what a system should answer from model memory versus current authoritative sources.

A high-quality AI system should know where authority lives outside itself.

This echoes the founder chapter.

The founder’s memory is valuable but should not be the only repository of company truth.

The model’s learned representation is valuable but should not become the only repository either.

Let the source of record remain inspectable.

This also makes decommissioning easier because the institution can replace the model without losing the underlying policy, data, or process logic.

When business truth exists only inside behavior learned by a model, the organization has created a new kind of forgotten machine.

The machine may be brilliant.

It is still a dependency.

AI also makes responsibility easy to fragment because chains of models and agents can be assembled quickly.

One model plans.

Another retrieves.

Another classifies.

A tool executes.

A policy filter checks output.

A human sees only the final action.

If something goes wrong, the causal path may cross several systems owned by different teams or vendors.

This is the decision equivalent of a software supply chain.

A model bill of materials has been proposed in various forms because provenance matters here too: what components, data, models, tools, and versions contributed to a system?

The exact standard may evolve.

The need for traceability will not.

A consequential decision system should be able to answer, at an appropriate level, how it came to exist and who can change each important part.

Otherwise the organization will eventually meet a failure that belongs to everybody and therefore to nobody.

That is the classic orphan state.

Monitoring is often presented as the solution.

Monitoring is necessary.

It is not enough.

A smoke detector does not extinguish a fire.

A drift dashboard does not decide whether the model should be retrained, restricted, rolled back, or retired.

Metrics create a claim on someone’s attention.

If no response authority exists, monitoring creates a beautifully instrumented orphan.

This is why alert design belongs to governance. Every alert should have a plausible receiver, interpretation, and action path. Otherwise the organization accumulates warnings that teach people not to listen.

A model can be too monitored and too unmanaged at the same time.

The right end state is not maximum observability.

It is sufficient evidence for responsible choice.

That choice includes stopping.

Imagine a model retirement review.

The team does not ask only whether performance has degraded.

It asks whether the original purpose still exists, whether the model remains a good way to serve that purpose, whether downstream dependencies are known, whether records require preservation, whether users need notice, whether an appeal process changes, whether another system will take over, whether the model’s data can be deleted, and how to prevent old endpoints from continuing to receive traffic.

This sounds like decommissioning a facility because structurally it is.

The physical scale differs.

The lifecycle logic is the same.

The final version should be archived where audit requires it.

The active endpoint should stop.

Credentials should be revoked.

Dependent systems should migrate.

Monitoring can cease once the system no longer acts.

Data should follow retention rules.

Ownership records should show that the system is retired rather than merely inactive.

A model that no longer makes decisions can remain part of history without remaining part of operations.

That distinction—preserved versus operative—returns from the law chapter.

It is one of the cleanest ways to end digital systems.

AI will create astonishing abundance in analysis, generation, and automation.

That abundance is not the problem this book wants to stop.

The risk is that every cheap new decision engine becomes one more invisible claimant on future judgment.

The organization wakes up with hundreds of models, prompts, agents, vendor APIs, embeddings, retrieval indexes, evaluations, and automated workflows, each individually sensible and collectively unowned.

The solution is not fewer intelligent systems by default.

It is more intelligent endings.

A decision without an owner is not autonomous.

It is orphaned.

The proof of responsible AI may eventually be less about whether a system can act without a person and more about whether an institution can still answer the simplest lifecycle question:

Who has the authority to make it stop?
