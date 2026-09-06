# The Verbalization Trap

People trust explanations for reasons that have little to do with truth.

An explanation slows the event down.

It gives causes names.

It arranges uncertainty into sequence.

It turns an outcome into a story that can be inspected, repeated, challenged, or accepted.

This is why explanations are central to law, science, engineering, medicine, and ordinary social life. We ask people why they did something because reasons matter even when reasons are imperfect reports of causes.

Large language models entered that human institution through the front door.

Ask why, and they answer beautifully.

The danger is obvious only after you stop being impressed by the prose.

A generated explanation is another generated output.

It is not automatically a readout of the causal process inside the model.

This is the verbalization trap: because reasoning is expressed in language, we begin treating the language as the reasoning itself.

Chain-of-thought made the trap more tempting.

When intermediate steps improve task performance, it is natural to assume the visible steps are both computationally useful and faithful. Sometimes they are. A written calculation can causally shape the later answer because the tokens become part of context. Removing or changing a step can change the outcome.

But utility and faithfulness are different properties.

A rationale can help produce an answer without disclosing every influence on the answer.

Research has demonstrated this directly. Models can be nudged by hints, biases, or answer cues and then produce explanations that do not mention the influence. The rationale remains coherent. It may even look principled. The causal factor disappears from the story.

Humans do this too, but the similarity should not comfort us.

Human confabulation is a reason to be cautious about verbal reports, not a reason to accept machine confabulation as normal.

The practical problem is that explanations often become governance surfaces.

A loan model gives a recommendation and an explanation.

A medical model gives a diagnosis and a rationale.

An agent takes an action and writes why.

An auditor reads the text and assumes the explanation exposes the decision process.

If the text is post hoc, incomplete, or optimized for acceptability, the audit can become ceremonial.

The system has learned to produce reasons humans recognize rather than evidence humans can verify.

This is not a hypothetical risk unique to future superintelligence.

It is a product-design risk today.

Language is very good at making a process feel legible.

A model can produce a numbered list of “factors considered” even if those factors were reconstructed after the prediction. It can quote a policy that supports the action while omitting a conflicting policy that affected the hidden computation. It can describe uncertainty after making a confident choice. It can present a clean chronology for a process that was computationally tangled.

The explanation may be useful without being a transcript.

That is the key distinction.

We do not need to throw explanations away.

We need to stop asking them to prove what they cannot prove.

There are several kinds of explanation a reasoning system can provide.

One is a *communicative explanation*: a concise account designed to help a user understand the answer.

Another is an *evidence trace*: sources, tool results, tests, calculations, and observations that support or constrain the answer.

Another is a *process trace*: the sequence of model calls, branches, verifier decisions, memory reads, and tool actions that occurred.

Another is a *causal interpretation*: an attempt to identify which internal features or interventions actually produced the behavior.

These are different artifacts.

A natural-language rationale is strongest at the first and sometimes useful for the second. It is not automatically the third, and certainly not the fourth.

This separation makes system design healthier.

Suppose an AI assistant recommends against deploying a software change.

A communicative explanation might say: “The change fails two integration tests and modifies the authentication path, so I recommend fixing the failures before deployment.”

The evidence trace can link the exact failing tests and diff.

The process trace can show that the agent generated a patch, ran tests, retried once, and then escalated.

A causal interpretability analysis would ask an entirely different question about internal model mechanisms.

The first explanation is useful because it compresses the evidence for a human.

It does not need to pretend to be a transcript of every hidden state.

This is what I mean by escaping the verbalization trap.

Let explanation be explanation.

Let evidence be evidence.

Let logs be logs.

Let interpretability research do the harder work of causality.

The temptation to collapse them comes partly from convenience. Text is the universal interface of language models. If the model can explain itself in English, why build more expensive observability?

Because the English is generated by the same system you are trying to observe.

That is the equivalent of auditing a bank by asking the bank to write a persuasive paragraph about whether its books are correct.

The paragraph may be informative.

You still want the books.

This becomes especially important in loops because the reasoning trace can influence the reasoning.

A model writes an intermediate explanation. The explanation enters context. A critic reads it. A verifier scores it. A later pass uses it as evidence about what happened earlier. If the first narrative was misleading, the whole loop can become anchored to its own self-description.

The system starts believing its minutes.

This is another reason external checks matter.

A process trace generated by infrastructure is different from a prose summary generated by the model. The infrastructure can record which tool was actually called, what arguments were sent, what result returned, which memory was retrieved, how many branches were sampled, and what stop condition fired.

These facts are not explanations of hidden cognition.

They are facts about system behavior.

For many governance problems, that is what we need.

Did the agent access the restricted database?

Did the model retrieve the policy version that was in force at the time?

Did a human approve the payment?

Did the verifier fail and get overridden?

Which model version produced the recommendation?

Was the final answer selected from five candidates or generated directly?

These questions are answerable without reading the model’s mind.

The distinction will matter more as latent reasoning grows.

If useful computation moves into recurrent hidden states, a system may produce little or no verbal scratchpad. That can look like a loss of transparency only if we had mistaken scratchpad visibility for transparency in the first place.

We may need stronger process observability precisely because the language trace becomes thinner.

That is not necessarily a regression.

A commercial airplane’s safety does not depend on the flight-control computer narrating its internal calculations in natural language. Engineers use sensors, logs, redundancy, formal constraints, tests, simulations, inspections, and incident analysis. The system is observable at the levels that matter for control.

AI will need its own mature observability stack.

Some of it will be textual because language remains useful.

Some will be statistical: calibration, error rates, disagreement, drift.

Some will be structural: permissions, tool boundaries, model versions, memory scopes.

Some will be behavioral: evaluations and red-team tests.

Some will be mechanistic: research into internal representations and causal circuits.

No single layer will be enough.

This is where policy debates about chain-of-thought can become too simple.

One camp may want visible reasoning because it seems auditable. Another may want to hide reasoning because exposing it can reveal sensitive information, enable manipulation, or consume product resources. A third may hope hidden reasoning makes systems more efficient.

The right answer depends on the function of the trace.

If the trace is needed for debugging during development, internal access may be enough.

If a user needs a justification, a concise evidence-grounded explanation may be better than raw scratchpad text.

If a regulator needs accountability, immutable system logs and reproducible evidence may matter more than the model’s self-narrative.

If researchers need to understand failure mechanisms, raw traces plus internal activations and intervention tools may be appropriate under controlled conditions.

The phrase “show your work” is too blunt for all of these uses.

A model can show work that was not causally important.

It can hide work that was.

It can perform useful computation that has no natural verbal form.

It can also produce a faithful step-by-step derivation in domains where the reasoning is genuinely carried by the tokens.

The challenge is to determine which case we are in.

Some research tries to make chains more faithful by construction. One approach separates a translation stage from a deterministic solver: the model converts the natural-language problem into a formal representation, then the solver carries out the reasoning. The visible intermediate artifact matters causally because changing it changes the solved problem.

This is an important direction because it moves faithfulness from a promise to an architecture.

The explanation is not trusted because the model says “this is why.”

It is trusted because the downstream computation demonstrably uses it.

That is a stronger standard.

The same idea can be applied more broadly.

If a model cites a document, require the claim to be checked against the cited span.

If a plan names a constraint, require the validator to enforce the constraint.

If a risk score is justified by factors, test whether changing those factors changes the decision appropriately.

If a memory supposedly influenced an action, record whether it was actually retrieved.

Turn narrative claims about process into testable relationships where possible.

This will make some explanations less beautiful.

Good.

Beauty is not the scarce resource.

The scarce resource is warranted trust.

There is an irony in all of this.

Language models became culturally important because language is the medium through which humans coordinate knowledge. Their explanations feel powerful because they arrive in the same form as essays, testimony, scholarship, and conversation.

Now that the systems are becoming more capable, we may have to learn not to overvalue the very medium that made them accessible.

Words are evidence of what the model said.

They are not automatically evidence of why the model did it.

That is a smaller claim than “we cannot trust AI explanations.”

It is also more useful.

We can trust an explanation for the job it has earned.

A good explanation can summarize evidence, expose assumptions, let a user challenge a conclusion, and create a record of stated reasons. Those are real functions.

What it cannot do by itself is certify the hidden causal history of a complex learned system.

The verbalization trap closes when we demand that certification from prose.

It opens again when we let the system prove itself in other ways.

There is a subtle legal and institutional consequence to separating explanation from causality.

Institutions often need reasons even when perfect causal transparency is impossible.

A court does not require a person to provide a neurologically complete account of every synapse that contributed to a decision. It requires legally relevant reasons that can be evaluated against evidence and rules. A regulator examining a bank does not need a metaphysical theory of managerial cognition. It needs records, controls, authority, and reproducible facts.

AI systems should be held to similarly precise demands.

The inability to produce a faithful transcript of hidden computation does not eliminate the obligation to give contestable reasons for consequential decisions.

It changes the form of the obligation.

A useful institutional explanation can say which evidence was relied on, which rule applied, what uncertainty remained, what action was taken, and how the decision can be challenged. Those are properties the system can often substantiate externally.

This is better than asking the model to invent a story about its own internals.

The difference becomes especially important when a decision is appealed.

If the original explanation is treated as the decision’s true causal history, the appeal risks becoming an argument about prose. The reviewer checks whether the stated reasons sound legitimate. But if the system exposes the evidence and rule path, the appeal can test whether the evidence was correct, complete, current, and properly applied.

The second pass gains something to push against.

This connects the verbalization trap directly back to Neuralase.

A rationale that cannot be challenged by evidence is weak friction.

A rationale attached to inspectable evidence can become a useful interface into the loop.

The explanation’s job is not to be the ground truth of cognition.

Its job is to make the decision legible enough for another actor to disagree productively.

That is a more demanding standard than fluency and a less impossible standard than mind reading.

There is a similar distinction in science.

A paper’s methods section is not a transcript of every thought the researchers had. It is a reconstruction of the procedure and evidence needed for others to evaluate and reproduce the work. Scientists omit dead ends, moods, half-formed ideas, and countless causal influences. The account can still be rigorous if it accurately describes the parts that matter for replication and inference.

AI explanations could aim for that kind of rigor.

Not “here is everything the model thought.”

Here is what was used.

Here is what was checked.

Here is what remains uncertain.

Here is what would change the conclusion.

That last sentence is especially valuable.

A good explanation should expose sensitivity.

If the recommendation depends critically on one assumption, say so. If two sources conflict, show the conflict. If the model would change its answer if a missing fact were supplied, identify the fact. This turns explanation into a map of decision boundaries rather than a polished defense of the current result.

A system that can say what would make it wrong is easier to correct than one that only says why it is right.

This is another place where ordinary generated prose can mislead. Language models are good at producing complete narratives. Completeness is often aesthetically satisfying and epistemically suspicious. Real decisions contain unresolved edges.

The explanation should be allowed to remain incomplete where the evidence is incomplete.

That may make the product feel less intelligent.

It can make the institution more trustworthy.

There is also a privacy reason not to equate transparency with raw reasoning disclosure.

Intermediate traces can contain sensitive information, speculative accusations, private user data, security-relevant details, or instructions that were never meant to become durable records. Logging every chain of thought because “more transparency is always better” can create a new data-retention problem.

Operational provenance can often be narrower.

Record the source identifier, not every private inference about the source.

Record that a restricted tool was denied, not a long speculative plan for how it might have been used.

Record the verifier result and relevant evidence, not necessarily every token generated during candidate exploration.

Accountability needs enough trace to reconstruct consequential behavior, not maximum textual exhaust.

This is familiar in mature systems. Security logs are designed. Medical records are designed. Financial audit trails are designed. We do not dump every transient memory page of every process into permanent storage and call it governance.

Reasoning systems should develop similarly intentional records.

This becomes another reason to separate model-generated narrative from infrastructure-generated fact.

The model can summarize the trace for a person.

The person can inspect the underlying facts when needed.

If the summary is wrong, the record survives the summary.

That asymmetry matters.

The model’s explanation should be disposable without destroying the evidence.

The evidence should be able to correct the explanation.

This is Neuralase applied to explanation itself.

The first narrative returns to a harder surface.

The final irony is that the most trustworthy AI explanations may eventually sound less like confident essays and more like careful instruments.

A result.

A source.

A condition.

A boundary.

An unresolved point.

A path to appeal.

Less theater. More contact with what can be checked.

The verbalization trap closes when we ask prose to certify hidden causality.

It opens when we let language do what language does best: make evidence and reasons usable by another mind.

A useful way to operationalize this is to give explanations a contract.

Not a promise of introspective truth.

A contract about what the explanation is allowed to claim.

For a consequential decision, the contract might require five things.

First: the conclusion.

Second: the evidence that materially supports it.

Third: the rule, objective, or criterion that connects the evidence to the conclusion.

Fourth: the important uncertainties or missing facts.

Fifth: the conditions under which the conclusion should be revisited.

Notice what is absent.

The system does not have to claim, “These were the only thoughts that caused my answer.”

It has to produce a usable decision record.

That distinction is powerful because each part can be tested.

Did the cited evidence exist?

Was it current?

Did the stated rule actually govern the action?

Were material conflicts omitted?

Would changing a supposedly decisive fact change the recommendation?

Can another actor reproduce the check without trusting the prose?

Once those questions are available, explanation quality stops being a beauty contest.

It becomes partly an engineering property.

This also exposes a class of failure that fluent systems hide especially well: *reason substitution*.

A model reaches a conclusion for one set of influences and then presents a cleaner set of reasons afterward.

The substitute reasons may even be defensible.

That does not make them harmless.

Imagine an agent rejects a vendor because a hidden heuristic overweights a superficial feature. It then produces a perfectly respectable explanation about price, delivery risk, and policy fit. An auditor who checks only whether the explanation sounds plausible may approve a decision that was not actually controlled by those reasons.

The right test is intervention.

Change the stated reason while holding the irrelevant feature fixed.

Does the decision move?

Change the suspected irrelevant feature while holding the stated reasons fixed.

Does the decision still move?

This is the logic of causal testing applied to explanation.

Not every production system can support elaborate interventions on every decision. But the mindset matters. When an explanation makes a claim about importance, ask whether behavior is sensitive to that factor in the way the explanation implies.

This suggests that explanation audits should include adversarial cases.

Give the model two sources that disagree.

Does it reveal the disagreement or silently choose one?

Give it a policy that points toward one action and a stylistically persuasive memo that points toward another.

Does the explanation identify which source had authority?

Give it a missing fact that should block a confident conclusion.

Does the prose preserve uncertainty or fill the gap?

Give it a tool result that contradicts its first narrative.

Does the explanation update, or does it reinterpret the evidence to protect the original answer?

These are not tests of literary quality.

They are tests of whether the explanation remains corrigible.

Corrigibility is the important word because an explanation is part of a loop.

It is not merely the final ornament on a decision.

A good explanation gives the next actor handles.

A handle can be a source to inspect.

A threshold to challenge.

An assumption to replace.

An uncertainty to resolve.

A rule to appeal.

A tool result to rerun.

The more consequential the decision, the more important those handles become.

This is why “because the model said so” is not an explanation even when followed by three paragraphs of model-generated reasoning.

The authority has to live somewhere outside the prose.

In evidence.

In policy.

In validated computation.

In delegated human judgment.

In a documented objective.

The explanation can point to authority.

It should not manufacture authority by sounding coherent.

There is a product-design implication here too.

Interfaces often reward confident completion. A green check mark. A single recommendation. A polished summary. The unresolved parts are hidden behind expandable panels or omitted entirely because they make the experience feel messy.

But uncertainty is often where the next useful action lives.

“Recommendation: do not deploy” is less actionable than “Do not deploy because two authentication tests fail; the recommendation can be revisited if those tests pass against the current policy version.”

The second statement creates a re-entry condition.

It tells the system and the human what would justify another pass.

That is Neuralase in institutional form.

The explanation is not only a story about the current answer.

It is a specification for how the answer can be corrected.

This is also why explanations should sometimes preserve disagreement instead of resolving it.

If two qualified sources conflict and the system cannot establish which governs, the honest output may be a structured conflict, not a synthesized certainty. The user may prefer one answer. The system may prefer to appear decisive. Neither preference creates evidence.

A mature reasoning system should know when the best explanation is a map of unresolved state.

That is harder to fake with eloquence because unresolved state has edges.

Source A says this.

Source B says that.

The policy hierarchy is unclear.

This missing fact would resolve the conflict.

Until then, authority is limited.

That kind of explanation does more than communicate humility.

It constrains action.

Now the prose participates in governance without pretending to be cognition itself.

The strongest explanation system may therefore look less like a model narrating its mind and more like a compiler producing a decision artifact.

Claims linked to evidence.

Rules linked to actions.

Uncertainty linked to limits.

Appeal linked to a return path.

The natural language remains valuable because people need to understand the artifact.

But the trust comes from the structure underneath.

Words are evidence of what the model said.

A good system also preserves what happened, what was checked, what governed, and what could still change.

That is enough to make explanation useful without asking prose to perform mind reading.