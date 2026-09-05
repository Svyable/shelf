# Chapter 16 — When the Same Machine Hears the Appeal

The first machine says no.

The user clicks appeal.

The second machine says the first machine was correct.

What happened in between?

This will become one of the defining procedural questions of the automated age because the economics are irresistible. If a model can make the first decision cheaply, it can also review that decision cheaply. Run another inference. Add a critique prompt. Ask for a confidence score. Let a second agent inspect the first agent's work. Majority-vote across several models. Escalate disagreement.

All of these techniques can improve accuracy.

None, by itself, creates an appeal.

Quality control and appellate review overlap.

They are not the same thing.

## Self-critique is useful

It is important not to begin with superstition.

A model can catch its own mistakes.

A second pass can identify arithmetic errors, missing instructions, unsupported claims, policy violations, or contradictions. Tool-using agents can verify outputs against external sources. Ensembles can reduce variance. A critic model can expose weaknesses in a generator. A second agent can compare the answer with a specification.

Human institutions do versions of this too.

A writer edits their draft.

A doctor rechecks a dosage.

A pilot reads a checklist.

A judge reconsiders a ruling.

A clerk verifies a calculation.

Internal checking is not fake merely because the checker and decider share identity.

The mistake is calling every check an appeal.

An appeal is not defined by whether the second pass improves accuracy.

It is defined by whether the affected person can invoke a process designed to reconsider the consequential decision under conditions capable of correcting the alleged error.

That requires participation and authority, not merely computation.

## The echo test

Here is a simple test.

If the same evidence, same rules, same incentives, same model, same retrieval system, and same hidden assumptions pass through the system again, how likely is the second decision to reproduce the first error?

If the answer is “very likely,” the review is an echo.

The output may be worded differently.

The confidence may change.

The model may produce a more elaborate justification.

The underlying failure remains correlated.

This is especially dangerous with persuasive systems because explanation can increase confidence without increasing independence.

The model says no.

The user appeals.

The model writes a beautiful paragraph explaining why no was correct.

The institution now looks more accountable while becoming no more corrigible.

Fluency is not review.

## Correlated blindness

Imagine an automated benefits system that retrieves a claimant's medical records, summarizes them, and decides that a required functional limitation is not documented.

The claimant appeals and says the limitation is described in a specialist note.

The appellate agent uses the same retrieval index.

The index failed to ingest that note.

The second model reasons perfectly over the same incomplete evidence and affirms.

The problem is not intelligence.

It is shared blindness.

Now imagine a content moderation system whose policy prompt defines a phrase as prohibited regardless of context. The first model removes journalism quoting the phrase. The appeal model receives the same policy prompt and the same truncated excerpt. It affirms.

Again, shared blindness.

A fraud model uses a device signal that is systematically unreliable for one class of customers. The review model treats the first score as a trusted feature. It affirms.

Shared blindness.

The most important design goal of an automated appeal system is therefore not “use a stronger model.”

It is **break the correlation that could have produced the first error**.

That may mean different evidence, different retrieval, different policy interpretation, different model, different prompt, different tool, different reviewer, or external escalation.

The change should match the alleged error.

## The appeal packet

A machine appeal should begin with a structured packet rather than a generic request to “review.”

The packet could contain:

Decision identifier.

Original inputs and their provenance.

Rule or policy version applied.

Original output.

Reasons exposed to the affected person.

The person's challenge.

New evidence, if any.

Claimed error type.

Requested remedy.

Urgency.

Prior review history.

This packet does two things.

It makes the decision reproducible.

It makes disagreement explicit.

Without it, a second model may be reviewing the current state of the world rather than the decision that was actually made. Rules may have changed. Data may have updated. The model itself may have been replaced. The institution may be unable to tell whether the reversal reflects corrected error or changed environment.

Versioning becomes due process.

What model decided?

Which policy prompt?

Which data snapshot?

Which tool outputs?

Which thresholds?

At what time?

A human appeal record has documents and transcripts.

An automated appeal record needs execution history.

## Do not show the answer first

One of the simplest ways to reduce machine anchoring may be to blind the appellate system initially to the first conclusion.

Give it the source evidence and governing rule.

Ask it to reach an independent result.

Only then reveal the original decision and the appellant's challenge.

Compare.

If both systems independently agree, confidence rises.

If they disagree, route the case for deeper review.

This architecture resembles double reading in other professions.

It is not always efficient. Sometimes the appeal issue is specifically about the first reasoning, so the second reviewer must see it. But staged disclosure can distinguish independent convergence from reflexive agreement.

The same technique could be used with humans reviewing model decisions.

Do not begin by showing the human a giant red “HIGH RISK” score.

Let them inspect key evidence first where operationally possible.

Then reveal the model signal.

Anchoring is not eliminated.

It is managed.

## The human rubber stamp

“Human in the loop” has become a phrase that can hide more than it explains.

A human can be present and powerless.

Imagine an appeal reviewer handling two hundred cases a day.

For each case, the screen shows:

Original model decision: deny.

Confidence: 97.4 percent.

Reason summary: policy criterion not met.

Suggested appeal disposition: affirm.

The source record is available behind four tabs.

The performance target allows ninety seconds.

Technically, the decision is human-supervised.

Operationally, the human is an approval peripheral.

This is why the DSA's requirement that certain internal complaint decisions not be made solely by automated means is only the beginning of the design problem, not the end.

Qualified staff need time, authority, access to evidence, and permission to disagree.

A human loop without those properties is ceremony.

The same is true in medicine, finance, hiring, benefits, and security.

Human review is not a magic ingredient sprinkled over automated output.

It is a job design.

## The second model should have a different job

A strong machine appeal architecture may use models in deliberately asymmetric roles.

The first model optimizes for throughput under a known policy.

The second model optimizes for finding plausible error in contested cases.

The first asks: does this case satisfy the rule?

The second asks: what fact, exception, ambiguity, missing evidence, or procedural issue could make the first conclusion unreliable?

The first is a decider.

The second is an adversarial critic.

That difference can reduce correlated error even if both models share underlying technology.

Then a third component can adjudicate disagreement.

This is closer to the structure of adversarial legal systems, where opposing arguments are not expected to be neutral and the decision-maker sits elsewhere.

One agent makes the strongest case for affirmance.

Another makes the strongest case for reversal.

A reviewer compares both against the record.

For high-stakes cases, the final reviewer may be human.

For lower-stakes cases, a separate adjudicator model may be acceptable depending on law, policy, risk, and transparency.

The key is role separation.

## Appeals need discovery

A machine cannot correct missing evidence it is not permitted to seek.

This sounds obvious and is routinely violated.

Automated decision systems are often closed functions.

Inputs enter.

Output exits.

Appeal reruns the function.

A better review layer should be able to ask questions.

Can you provide the missing receipt?

Which of these transactions do you recognize?

Is this the correct address?

Does this medical note refer to the same condition?

Was this content quoting another source?

Was this device used while traveling?

Do you authorize us to retrieve this record?

Interactive evidence gathering turns appeal from classification into investigation.

That is expensive.

It is also what hard cases require.

The first system can remain closed for efficiency.

The appeal system opens a dialogue only when someone contests the result.

Again, scarce context is purchased selectively.

## Confidence is not finality

Models often produce or can be paired with confidence estimates.

Institutions will be tempted to use them as procedural gates.

Ninety-nine percent confidence: no appeal needed.

Fifty-five percent confidence: human review.

This is dangerous for two reasons.

First, confidence may be poorly calibrated in exactly the rare cases appeals surface.

Second, a system can be confidently wrong because the record itself is wrong.

If the database belongs to another person, the model can be 99.9 percent confident that the person represented by the data should be denied.

The appeal is about identity, not classification.

Confidence should influence triage.

It should not erase contestability.

A person should be able to allege a factual error that exists outside the model's uncertainty estimate.

The machine knows how uncertain it is about its own answer.

It does not automatically know how wrong its world model is.

## When models disagree

Disagreement between first and appellate models is valuable.

It identifies exactly the cases where cheap automation has reached the boundary of consensus.

Organizations may treat disagreement as a defect to be eliminated.

It can be a routing signal.

If the two systems agree and the appeal contains no new evidence, the case may be suitable for fast disposition with a clear explanation, subject to domain rules.

If they disagree, escalate.

If they agree but the appellant identifies a missing record, fix the record and rerun.

If they agree but the consequence is irreversible and the case is high-stakes, require human review anyway.

If repeated appeals in one category produce high model disagreement, investigate the policy or data source.

This turns disagreement into institutional telemetry.

The goal is not universal model consensus.

The goal is to spend human and independent review where machine consensus is least trustworthy or consequence is highest.

## The appellate model as public servant

If automated appeal systems become common, they should be evaluated differently from first-decision models.

Accuracy remains important.

So do other properties.

Can the model identify the strongest counterargument to the first decision?

Can it distinguish new evidence from restated argument?

Can it detect that the record is incomplete?

Can it cite the governing rule correctly?

Can it explain which fact would change the outcome?

Can it recognize when the case exceeds its competence?

Can it preserve uncertainty rather than invent confidence?

Can it route conflicts of interest?

Can it avoid being anchored by the first model?

Can it produce a record suitable for external review?

These are appellate capabilities.

A model that is excellent at first-pass classification may be poor at them.

The appeal age will create a new model role: not judge, not assistant, not agent, but **institutional dissenter**.

A system trained and evaluated to find where authority might be wrong.

## The right to a different failure mode

No appeal system can promise a perfect second decision.

Humans make mistakes.

Courts make mistakes.

Independent reviewers make mistakes.

Models make mistakes.

The realistic promise is smaller.

The second layer should not fail for exactly the same reason without having had a meaningful chance to detect it.

That is the right to a different failure mode.

If the first system missed evidence, the second can seek it.

If the first system applied a rule mechanically, the second can examine exceptions.

If the first system had a conflict, the second can be independent.

If the first model was brittle, the second can use a different method.

If the first reviewer was rushed, the second can receive more time.

If the first process lacked human judgment, the second can add it.

If the first institution cannot be trusted to review itself, the second can move outside.

This is not anti-automation.

It is how automation becomes institutionally mature.

The machine can hear the appeal.

It should not merely hear itself.
