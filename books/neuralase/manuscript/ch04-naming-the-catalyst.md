# Naming the Catalyst

I did not invent recursion.

I did not invent recurrent neural networks, adaptive computation, self-correction, search, verification, process supervision, chain-of-thought, tool use, agent loops, latent reasoning, recurrent depth, or the idea that a difficult problem may deserve another attempt.

That sentence should be unnecessary.

In artificial intelligence, it is not.

The field moves quickly enough that a new label can make an old mechanism feel newly owned. A company gives a familiar pattern a product name. A paper combines two known ideas at a new scale. A benchmark improvement becomes a sweeping story about cognition. Within months the branded phrase begins standing in for a history it did not create.

So before I ask you to remember the word *Neuralase*, I want to narrow what I am claiming.

Neuralase is a name for a question.

When computation returns to a problem, what makes the return useful?

That is all.

The answer varies by system.

Sometimes the useful difference is a failed test. Sometimes it is a second independently sampled reasoning path. Sometimes it is a verifier score. Sometimes it is a retrieved document. Sometimes it is an observation from the physical world. Sometimes it is an additional learned transformation of a latent state. Sometimes it is a human objection. Sometimes it is a constraint that was not satisfied. Sometimes the useful difference is simply that training has taught the model how to use repeated depth as computation.

The common feature is not feedback in the narrow sense.

It is discrimination.

The next pass has some basis for becoming other than a decorative variation of the previous one.

I chose the enzyme-like suffix because a catalyst changes the pathway by which a reaction can proceed without becoming the substance being produced. The analogy is intentionally loose. A model is not biochemistry. A loop is not metabolism. There is no little Neuralase molecule floating between attention heads.

The value of the analogy is procedural.

A catalyst makes conditions matter.

In a reasoning system, the corresponding question is what condition turns repeated computation into directed progress.

That sounds like a small distinction. It separates several very different futures for artificial intelligence.

In the first future, bigger models dominate. Most apparent reasoning tricks are temporary scaffolding around systems that simply needed more capacity and better training. As base models improve, elaborate self-critique prompts, multi-agent debates, and search trees shrink because one pass gets good enough. The second pass remains useful at the margins but does not become a central design axis.

In the second future, inference becomes increasingly active. Models remain powerful components, but systems routinely allocate computation dynamically, branch when uncertain, verify intermediate states, call tools, use memory, and spend variable depth before answering. The controller around the model becomes part of the practical intelligence.

In the third future, some of those loops move inside the model. Recurrent-depth architectures, latent reasoning, dynamic token computation, and learned halting absorb behaviors that software orchestration once handled explicitly. The external scaffolding becomes thinner because the architecture itself has learned to revisit representations efficiently.

These futures can coexist.

A medical agent may use all three: a very strong base model, internal recurrent computation, and an external workflow that retrieves records, runs checks, and escalates uncertainty.

Neuralase is useful only if it helps us compare these systems without pretending their loops are the same.

Take a child checking arithmetic with a calculator.

The child writes 347 × 29 = 9,963.

The calculator returns 10,063.

Something has happened that pure repetition could not guarantee. The second pass has encountered an independent computational process. The disagreement creates friction. The child can now inspect the multiplication instead of merely feeling uncertain.

For a language model, a calculator tool plays the same narrow role. It does not make the model generally wiser. It changes the error structure of arithmetic in the loop.

Now replace the calculator with the same child reading the multiplication again.

That can work too. People catch their own mistakes. Models sometimes do. The first written answer externalizes state. The second reading changes the task. Attention can land differently. But the two passes share more failure modes. If the child believes the multiplication rule itself is wrong, rereading will not introduce the missing rule.

The degree of independence matters.

This is why multiple agents are not automatically better than one.

Five copies of the same model, given the same prompt, may produce correlated errors. A vote among them can create the appearance of consensus without much new information. Diversity in wording is not the same as diversity in evidence or reasoning path.

Self-consistency works when sampling produces enough useful variation that aggregation reduces dependence on one unlucky trajectory. It is a statistical bet on error diversity.

Tree search works when the system can evaluate partial paths well enough to prefer promising ones and abandon bad ones. It is a bet on discrimination before full commitment.

Tool use works when the external operation has a useful contract. It is a bet that another process can supply information or verification with a different failure profile.

Recurrent depth works when learned transformations improve the latent state through repeated application. It is a bet that additional depth has been trained to be computationally meaningful.

The word Neuralase does not replace these mechanisms.

It asks what each mechanism is betting on.

That makes negative results easier to interpret.

Consider the research showing that large language models often fail to correct their own reasoning when asked to inspect it without external feedback. The disappointing result is not “models cannot reflect.” That is too broad and too theatrical.

A better interpretation is structural.

If the critic shares the same blind spot as the author, the loop lacks a discriminating signal.

This is familiar outside AI.

A newspaper cannot guarantee accuracy by asking the same reporter to reread a story. Rereading helps. Editing helps more because another person may notice different things. Fact-checking helps differently because it sends claims back to sources. Legal appeal is useful not because the second judge is magically smarter, but because the process creates another opportunity to inspect the record, apply standards, and correct certain classes of error. Scientific replication matters because the experiment is performed again under conditions intended to reveal whether the first result survives.

None of these systems eliminates correlated error.

Institutions can share incentives, assumptions, data, and ideology. Editors miss what reporters miss. Courts repeat precedent. Replications repeat flawed methods. The point is not independence as purity.

The point is designed friction.

A useful loop should make at least one important failure harder to preserve.

That line is close to a definition of Neuralase.

Not “the thing that makes the model smarter.”

The thing that makes a particular error harder to carry unchanged through the next pass.

That framing also explains why environmental feedback is so powerful.

Code runs or it does not. A test passes or fails under specified conditions. A database contains a row or does not. A robot moves and a sensor reports the result. A search system retrieves a document that can be checked. A game engine accepts a move. A theorem prover validates a proof object.

Reality is often a better critic than eloquence.

But reality arrives through interfaces, and interfaces can lie.

A test suite can be incomplete. A database can be stale. A retrieval system can surface the wrong document. A sensor can be miscalibrated. A tool can be manipulated. A theorem prover proves only what was encoded, not what the human meant.

So Neuralase cannot mean “external feedback.”

It has to include the quality of the channel.

A poor verifier can make a loop worse than no loop because it gives error a badge.

Imagine a model generates a business forecast. A second model scores it for plausibility. The scorer has been trained on the same kinds of optimistic prose and rewards confident specificity. The first model revises toward whatever the scorer likes. After five rounds, the forecast has not become more accurate. It has become better adapted to the evaluator’s taste.

This is a central risk in iterative systems.

Optimization amplifies the evaluator.

Once a loop is allowed to search, revise, or continue based on a score, the quality of the score becomes causal. A weak first-pass model with a strong verifier can sometimes outperform a stronger generator with no checking. A brilliant generator paired with a corrupted verifier can be driven into nonsense.

The model is not the only intelligence in the system.

The criterion is intelligence too.

This is why process supervision is so interesting. Instead of rewarding only a final answer, a system can receive signals on intermediate reasoning steps. The hope is that bad paths are identified before they compound. The verifier does not have to solve the entire problem from scratch; it may only need to discriminate locally between plausible and implausible steps.

That division of labor can be powerful.

It can also create a new problem: the model learns to produce what the verifier recognizes as good reasoning rather than what is actually causally effective.

We are back to the evaluator.

Every loop contains a politics of judgment.

What gets another pass? What gets rejected? Which error matters? Who or what is allowed to say “try again”? What evidence can overrule the model? When does the system stop listening?

In engineering, these questions appear as thresholds, schemas, reward models, tests, permissions, and stop conditions.

In institutions, they appear as appeals, audits, peer review, due process, elections, markets, and complaint channels.

The scale is different. The structural rhyme is useful.

A system without a route for consequential evidence to re-enter is brittle because the first decision hardens too quickly.

A system with endless re-entry is paralyzed because nothing hardens at all.

Neuralase lives between those failures.

It is not recurrence.

It is recurrence with a reason.

This distinction is especially important as reasoning moves into latent space. When a model performs additional hidden-state computation, we may not have an external verifier at every iteration. The discriminating change can be internal: a learned state transformation trained across iterative depth. The system may learn that certain representations stabilize only after more recurrence. It may learn a halting signal. It may allocate depth adaptively.

Here the catalyst is less visible.

That does not make it mystical.

We can still ask whether extra iterations produce measurable gains, which inputs benefit, how performance changes with depth, whether training prepared the model for that recurrence, and where degradation begins. The discriminating signal becomes an empirical relationship between computation and task performance rather than an explicit red check mark.

This is why I prefer a term about mechanism over a term like *reflection*.

Reflection smuggles in a story about mind.

Neuralase smuggles in a story about chemistry, admittedly, but at least the story points toward conditions and reactions rather than consciousness.

The word should eventually become unnecessary.

If the argument succeeds, the reader should begin asking the question without needing the label.

What changes on the second pass?

What failure does the loop make harder to preserve?

What signal can distinguish progress from motion?

What happens when the signal is wrong?

Those questions are more important than the word.

The best coined terms are scaffolding.

They help you see a structure that was already there.

Then the structure does the work.

There is a naming hazard beyond novelty that deserves more attention: a coined term can flatten mechanisms that should remain separate.

This happens constantly in technology. A useful umbrella appears, then people begin treating everything under the umbrella as interchangeable. “Cloud” once collapsed storage, compute, networking, managed services, and delivery models into one commercial word. “AI agent” now covers everything from a scripted tool call to a long-running autonomous process. The convenience is real. The loss of precision is real too.

Neuralase should not become that kind of umbrella.

It is not a synonym for iteration.

It is not a synonym for chain of thought.

It is not a synonym for recurrence.

It is not a synonym for verification.

It is not a synonym for agents.

The term names a relationship among a return path, an evolving state, and something that can make continuation meaningfully different.

That narrower use lets us compare systems that would otherwise be discussed in separate literatures.

A process verifier and a recurrent hidden-state block do not perform the same operation. Yet both can answer the same architectural question: why should this next unit of compute have a chance to improve the state rather than merely extend it?

For the verifier, the answer may be explicit discrimination. It scores an intermediate step and rejects weak trajectories.

For recurrent depth, the answer may be learned dynamics. The same block is trained to transform the state usefully across repeated depth.

For a tool loop, the answer may be new information.

For memory, it may be a consequence from the past.

For search, it may be preserved alternatives.

This comparison is useful because it reveals when systems are borrowing the rhetoric of one mechanism while implementing another.

A product can say it “reflects” when it simply samples twice. Another can say it “verifies” when it asks the same model to approve its own answer. Another can say it uses “multi-agent reasoning” when every agent is the same checkpoint receiving slightly different role prompts. Another can say it “learns from experience” when it merely appends old conversations to context.

The labels are not necessarily fraudulent. They are often too coarse to tell us what failure has become harder.

That is the test I want Neuralase to impose.

Name the failure.

Name the return path.

Name the difference.

Name the authority that the difference has over the next pass.

If those four things cannot be named, the system may still work. We simply do not yet understand why another loop should help.

This also guards against a second hazard: turning the coined term into a claim of universal law.

Some problems do not need a second pass.

A lookup with a trusted source may be finished when the source is returned. A deterministic calculation may need no language loop at all. A high-quality fixed-depth model may answer an easy classification task more reliably than an elaborate reflective system. The correct architecture can be no loop.

Neuralase therefore has a zero case.

Sometimes the catalyst is absent because no reaction is needed.

That matters philosophically because technology culture tends to reward maximalism. More agents. More reasoning. More context. More memory. More search. More verification. A coined concept can accidentally feed that appetite by making every system look incomplete until it contains the new thing.

The better use is diagnostic.

If one pass is enough, stop.

If another pass is proposed, ask what it buys.

If the answer is “more thought,” ask what kind.

If the answer is “more confidence,” ask whether confidence is calibrated.

If the answer is “another opinion,” ask whether the opinion has independent information.

If the answer is “verification,” ask what the verifier actually knows.

If the answer is “recurrent depth,” ask whether the model was trained to use that depth and where the gains saturate.

A concept that cannot tell you when not to use it is marketing.

I want this one to behave more like engineering.

There is also a social reason to be precise about ownership. The ideas gathered here come from a research lineage built by many people across decades. Adaptive computation predates today’s reasoning models. Search predates machine learning. Feedback control predates digital computers. Appeals and adversarial review predate software entirely. Even the current wave of recurrent-depth Transformer work contains multiple groups exploring related questions from different directions.

The original contribution, if the term earns that description at all, is synthesis.

The synthesis says these mechanisms can be compared through the quality of re-entry.

That is a smaller claim than inventing the mechanisms.

It is also the claim I care about.

Synthesis can matter when a field’s components have outrun its vocabulary. Engineers may discuss test-time compute, agent loops, verifiers, dynamic depth, memory, and self-correction as separate implementation choices while product builders simply say the model “thought more.” A shared question can restore the distinctions instead of erasing them.

What did the second pass receive that the first did not?

What changed inside the state if nothing external arrived?

What made the change directional rather than decorative?

What made the system stop believing its own first answer?

Those questions travel well across mechanisms.

They also travel beyond AI.

A board revisiting a strategy after a bad quarter has a return path. Whether the reconsideration is useful depends on what new evidence, incentives, voices, or constraints enter. A scientist revisiting a result after replication failure has a return path. A court considering an appeal has one. A person rereading an angry draft the next morning has one.

The analogy is not that these systems are all the same.

The analogy is that second passes become useful when the conditions of judgment change.

That is the catalyst.

There is a practical way to keep this idea honest: force every proposed loop through a counterfactual.

Imagine removing the second pass.

What class of mistakes should increase?

Now restore the second pass but remove its distinctive signal. Let the critic see no new evidence. Replace the test result with a generic instruction to “be more careful.” Give every debating agent the same prompt and same temperature. Retrieve documents but hide their provenance. Repeat the recurrent block even though training never taught the model to use additional depth.

If performance barely changes, the supposed catalyst may have been theater.

If performance improves only when the differentiating signal is present, we have learned something stronger about mechanism.

This counterfactual matters because iterative systems are extremely easy to romanticize. A trace with six steps looks more thoughtful than a trace with one. A debate transcript looks more rigorous than a direct answer. A verifier score looks scientific because it is a number. An agent that calls five tools looks diligent.

Appearance is cheap.

The question is whether the extra structure changes the error distribution in a way we can predict.

That prediction does not have to be perfect. Engineering rarely begins with perfect theory. It should at least be specific.

A calculator check should mostly help arithmetic and exact computation, not literary taste.

A freshness retrieval step should mostly help claims whose truth changes with time, not timeless definitions.

A permission check should reduce unauthorized actions, not factual hallucinations.

A diverse search tree should help when early commitment is dangerous, not when the task has one trivial deterministic path.

A memory return should help when prior local experience is relevant, not when the environment has changed enough that the memory is stale.

Specificity is how a concept earns the right to be causal.

It also helps us see when two loops that look different are functionally similar.

Suppose one coding agent runs a test suite after every patch. Another generates a proof obligation for every changed function. A third executes the program against a recorded workload. The mechanisms differ, but each creates a surface that resists a different family of false confidence. Their value can be compared in terms of what errors they expose, what errors they miss, how expensive they are, and how much authority the resulting signal has.

That is a more useful comparison than asking which agent “reflects better.”

The same discipline reveals a distinction between *novel information* and *new pressure*.

A second pass does not always need new facts.

Sometimes the relevant facts were present from the beginning but the first computation did not organize them well. A formal constraint checker may simply force attention onto a condition that was already in the prompt. A recurrent latent pass may reorganize the same representation under learned dynamics. A reviewer may notice an inconsistency in a document without consulting any outside source.

Nothing new entered in the ordinary sense.

But the state encountered a new pressure.

This matters because otherwise Neuralase would collapse into retrieval. The useful difference can be informational, evaluative, representational, temporal, or authoritative.

Informational difference supplies facts.

Evaluative difference supplies a criterion.

Representational difference changes how the same facts are organized.

Temporal difference lets consequences arrive after an action.

Authoritative difference changes what the system is permitted to do with a conclusion.

A well-designed loop may combine several.

Consider an autonomous coding system editing a payment service. The first pass drafts a change. Tests provide evaluative difference. A runtime trace provides informational difference. A second model proposes a different diagnosis, adding representational diversity. A policy layer limits deployment authority. A later production canary provides temporal difference from the real environment.

Calling all of that “self-correction” loses the architecture.

Calling it Neuralase should not hide the architecture either.

The word earns its keep only by making us ask which differences are doing the work.

This leads to a useful failure taxonomy.

A loop can fail because the return path is absent: nothing gets another chance.

It can fail because the signal is weak: the second pass cannot distinguish error from success.

It can fail because the signal is corrupted: the system optimizes the wrong criterion.

It can fail because the signal arrives too late: the damage is already irreversible.

It can fail because the signal has no authority: the system notices the problem and proceeds anyway.

It can fail because the loop never halts: every objection creates another objection.

And it can fail because the cost of correction exceeds the value of the correction.

Those are different engineering failures.

They deserve different remedies.

More capable base models solve some of them and none of the others.

A smarter model can reduce the number of initial errors. It cannot make a stale database current. It cannot turn an unauthenticated action into an authorized one. It cannot make a corrupted reward objective correct by thinking harder about it. It cannot create reversibility after an irreversible action has already happened.

This is why the catalyst belongs at the system level even when the computation happens inside the model.

The model is one place where state changes.

The system is where consequences decide whether that change mattered.

So the strongest version of the Neuralase question is not merely:

What changes on the second pass?

It is:

What changes, who can tell whether the change is better, and what power does that judgment have over what happens next?

That three-part question—difference, discrimination, authority—keeps the term from drifting into mysticism.

It also makes the idea falsifiable in practice.

If a proposed catalyst cannot name its expected benefit, cannot be ablated, cannot identify the failure it should reduce, and cannot explain when it should be ignored, then the mechanism may still be useful.

But the story about it is not yet mature.

The best coined terms are scaffolding.

They help you see a structure that was already there.

Then the structure does the work.

If the word Neuralase survives, I hope it survives in that modest sense.

Not as a new substance inside a model.

As a reminder that another pass needs a reason.
