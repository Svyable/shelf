# Common-Mode Failure

Two backups are not two backups if they break for the same reason.

This is obvious when the objects are physical.

Two generators connected to the same flooded fuel tank are not independent.

Two data centers fed by the same substation are not independent.

Two escape routes that cross the same bridge are not independent.

The appearance of redundancy disappears as soon as the common dependency becomes visible.

Artificial intelligence makes common dependencies harder to see because the systems can look different at the surface.

Different products. Different logos. Different interfaces. Different prompts. Different teams.

Different contracts.

Underneath, they may share the same model family, the same cloud region, the same data source, the same retrieval index, the same benchmark assumptions, the same security boundary, the same human reviewer, or the same cultural belief about what a good answer looks like.

When the shared layer fails, the diversity above it becomes decoration.

That is common-mode failure.

And in an AI-rich world, it can be technical, organizational, and cognitive at the same time.

## The illusion of two vendors

A company becomes concerned about model dependence.

It integrates two providers.

The architecture diagram now has two boxes instead of one.

The risk review improves.

Everybody feels better.

Then the primary provider has a serious outage.

Traffic fails over to the secondary provider.

The secondary path also fails because both providers are reached through the same internal gateway, use the same identity service, depend on the same network boundary, or require the same piece of enterprise infrastructure that caused the first failure.

The company had model redundancy.

It did not have service-path redundancy.

Or the second provider remains technically available but cannot perform the workflow because the application has quietly become dependent on a proprietary tool-calling convention, context format, safety behavior, or memory layer from the first provider.

The company had a second contract.

It did not have a second path.

Or both providers function, but both systems were evaluated on the same narrow test set. A new real-world case exposes a failure mode that neither evaluation represented.

The company had model diversity.

It did not have evaluation diversity.

Or both models were fine, but both rely on the same corrupted internal knowledge source.

The company had inference diversity.

It did not have evidence diversity.

This is why robust architecture begins with failure modes rather than vendor counts.

Do not ask only:

How many alternatives do we have?

Ask:

**How many independent ways do we have to be right?**

## Independence is expensive because it is real

True redundancy often feels annoyingly inefficient.

A second route may use a different provider and a different region.

A second review path may use a separate data source.

A backup evaluator may be built by a different team.

A critical judgment may occasionally be checked by a person who did not see the model answer first.

A migration test may deliberately avoid the shared abstraction layer to discover what the abstraction is hiding.

All of this costs more than duplicating the visible layer.

That cost is evidence that the independence may be genuine.

Organizations routinely purchase fake redundancy because fake redundancy is cheap.

Two dashboards driven by the same underlying table.

Two risk scores trained on the same labels.

Two experts reading the same memo.

Two models prompted with the same retrieved context.

Two forecasts built from the same assumptions. The outputs differ enough to feel independent. The source of error remains shared. This is not useless. Multiple views can still expose variance.

But do not mistake variation for independence.

## The model monoculture problem

As AI becomes embedded in ordinary work, a new kind of monoculture becomes possible.

Many people may use the same systems to draft, summarize, research, code, plan, review, and decide.

This can increase average quality. It can also correlate error. Imagine a thousand employees making independent mistakes. The mistakes are noisy. One person overlooks a clause.

Another misreads a chart. Another uses a weak source. Another frames the customer problem badly.

The organization suffers many small errors, but they are distributed.

Now imagine a thousand employees using the same assistant, trained and configured similarly, drawing from the same organizational corpus.

The average employee may become much better.

But when the system has a blind spot, the blind spot can scale.

The organization trades some independent human error for correlated machine-mediated error.

That can be an excellent trade.

It still changes the risk shape.

Average accuracy and systemic robustness are different quantities.

A more accurate system can create a more concentrated failure mode.

Finance understands this pattern.

A portfolio of individually safe assets can become dangerous when they all respond to the same shock.

AI systems can behave similarly at the organizational level.

The question is not merely whether each workflow is reliable.

It is whether many workflows can fail together because they share a hidden assumption.

## Cognitive common mode

The most interesting common mode may not be technical.

It may be epistemic.

When everyone asks similar systems how to think about a problem, the systems can become a shared prior.

Which strategy is sensible? Which risks matter? How should the market be segmented? What are the standard arguments? What should the code look like?

What does a professional memo sound like? A good assistant provides competent defaults. Competent defaults are valuable. They also create convergence. Language converges.

Structure converges. Sources converge. Arguments converge.

Eventually, what looks like consensus may partly reflect a shared generation process.

Ten people agree.

But did ten minds independently reach the conclusion?

Or did ten minds begin from closely related machine-generated frames?

This matters most when independence itself is informative.

Forecasting. Security review. Scientific interpretation. Investment judgment. Incident diagnosis.

Hiring decisions. Strategic planning.

A robust organization should sometimes protect independent reasoning before aggregation.

Do the first analysis without seeing the consensus summary.

Ask separate teams to frame the problem differently.

Use different source sets.

Have one reviewer inspect only primary evidence.

Ask a model from another family.

Ask a human to form a view before seeing the machine recommendation.

The goal is not to fetishize disagreement.

It is to preserve the informational value of disagreement.

If every channel inherits the same frame before thinking begins, agreement becomes less meaningful.

## The eval can become a common-mode failure

Evaluation is one of the strongest defenses in this book.

It can also become a trap. A company builds a high-quality eval set. Teams use it to compare models. Providers are selected against it. Prompts are improved against it.

Guardrails are tuned against it.

Agents are promoted when they perform well on it.

Over time, the organization becomes excellent at the test.

The test becomes a local benchmark. The benchmark becomes the objective. Then the real world moves. Customers change behavior. Fraudsters adapt.

The product expands into new cases.

The model becomes better at patterns represented in the eval while still failing badly on new edge conditions.

The evaluation has done its job so successfully that it has become part of the common mode.

This is why robust evaluation needs novelty. Holdouts. Fresh incidents. Randomly sampled real cases.

Adversarial cases designed by people outside the workflow team.

New failure classes added after deployment.

Periodic tests that ask whether the metric still represents the consequence the organization cares about.

An eval set should preserve memory.

It should not freeze reality.

## Shared data, shared blindness

Retrieval makes AI systems more grounded.

It can also synchronize them around the same bad source.

A policy document contains an outdated exception.

A customer record has the wrong status.

A product database contains a mislabeled field.

A research corpus repeats a secondary claim that traces back to one weak source.

Multiple models retrieve the same material and independently produce the same wrong answer.

The agreement feels reassuring.

It is not independent confirmation.

It is a data echo.

This is an old problem in new clothing.

Three newspapers can repeat the same wire story.

Ten websites can repeat the same unsourced statistic.

Five analysts can use the same vendor estimate.

AI accelerates the compression of these echoes into a single confident response.

Robust evidence handling therefore asks about source lineage.

Where did this fact come from?

How many independent observations support it?

Are these citations distinct sources or repetitions of one source?

Was the data generated by a process that shares the same bias as the decision system?

The answer does not need to be perfect for every ordinary task.

But consequential workflows deserve evidence architecture, not merely retrieval.

## Human redundancy can also be fake

“Have a human review it” sounds like independent defense.

Often it is not. The reviewer sees the model answer first. The answer is fluent. The source citations look plausible. The reviewer is under time pressure.

The system has been right hundreds of times.

The human confirms.

Technically, two agents participated.

Functionally, there was one reasoning path and one rubber stamp.

This is common-mode failure through anchoring.

If independent human judgment matters, structure the interface to preserve it.

Ask for the reviewer’s decision before showing the model’s.

Show the evidence without the recommendation.

Hide confidence language.

Route a sample to blind review.

Use disagreement as a trigger for deeper inspection rather than as a nuisance to be eliminated.

Again, not every decision deserves this cost.

But high-consequence review that is not independent should not be described as though it is.

## Common-mode audits

A useful robustness exercise is to choose an important workflow and ask a deliberately annoying question:

**What single thing could make all of our safeguards fail at once?**

The model provider? The cloud account? The identity layer? The retrieval corpus? The labeling process?

The evaluation set? The human reviewer pool? The policy interpretation? The assumption about customer behavior? The shared code path?

The same external data vendor?

The same underlying model family exposed through multiple products?

The same executive forecast driving every scenario?

Then go one level deeper.

What do we believe is independent that is not?

This exercise is more valuable than counting backups.

The outcome may be that the shared dependency is acceptable.

That is fine.

A business can deliberately accept a common mode because independence is too expensive.

But the dependency should become visible enough to price.

If this fails, what happens? How long can we operate? What degraded mode remains? Who owns the recovery? When was it tested?

The goal is not to eliminate common-mode failure.

Complex systems always share something.

The goal is to prevent shared dependency from masquerading as diversified resilience.

## Diversity where it matters

Real diversity is not maximal difference.

A company does not need every team using a different model, every analyst using a different source base, and every workflow running through separate infrastructure.

That would destroy economies of scale and make governance harder.

Standardization exists for good reasons. Shared tooling improves security. Common platforms reduce cost. Central models make evaluation easier. Standard workflows improve training.

The robust question is where diversity buys meaningful protection.

For a low-consequence drafting task, common mode may barely matter.

For a system that controls access, money, safety, or large-scale communication, it matters more.

For a decision where independent agreement increases confidence, preserve independent channels.

For a workflow where fallback to another provider is essential, test the full path rather than the API call.

For a knowledge system where evidence quality matters, diversify source lineage rather than merely model providers.

For an institution where one narrative can capture strategy, preserve scenario disagreement.

Diversity should follow the failure.

## The strength of disagreement

Robust systems are sometimes less elegant because they preserve disagreement longer.

Two models disagree.

A human disagrees with both.

The primary source is ambiguous.

The eval says the system is good overall while the incident record says one rare failure is unacceptable.

A brittle organization experiences this as friction. Resolve it. Pick a number. Standardize the answer. Move on.

A robust organization asks whether the disagreement contains information about the boundary.

Maybe the case is genuinely ambiguous.

Maybe the model is underspecified.

Maybe the humans are relying on stale intuition.

Maybe the metric is hiding a subgroup. Maybe the evidence is weak. Maybe the policy needs an explicit exception. Agreement is not always the objective.

Sometimes the objective is knowing where agreement breaks.

That is especially true in an AI landscape that will increasingly produce polished, convergent answers at low cost.

The scarce thing may become a genuinely independent path to contradiction.

## One system, many failure shapes

The deepest mistake is treating robustness as a count of components.

One provider. Two providers. Three models. Four reviewers. The number is not the property.

The property is whether the system continues to preserve agency when the failure arrives.

A single-provider architecture with a clean manual degraded mode may be more robust than a five-provider architecture sharing one brittle orchestration layer.

One expert with deep source knowledge may provide more independent judgment than ten reviewers all reading the same generated memo.

One fresh holdout set may reveal more than a thousand repeated benchmark cases.

One exercised recovery path may be worth more than a slide full of theoretical alternatives.

Robustness lives in the failure graph.

Trace the shared causes.

Protect the consequential ones.

And remember the rule that looks embarrassingly simple until a complicated system fails:

Two backups are not two backups if they break for the same reason.
