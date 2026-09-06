# Reasoning Without Words

The language model industry accidentally taught millions of people to picture machine reasoning as text scrolling down a screen.

First the model writes the problem in smaller pieces.

Then it works through them.

Then it catches itself.

Then it says “wait.”

Then it produces an answer.

The display is persuasive because it resembles a familiar human artifact: written work.

Students show their steps. Mathematicians fill notebooks. Programmers scribble state diagrams. Lawyers annotate cases. Scientists keep lab books. The written trace is useful precisely because cognition is hard to inspect directly.

A chain of thought gives a machine the same visible surface.

It is easy to forget that the surface is optional.

The model’s core computation happens in numerical representations, not English sentences. Intermediate language is one way to extend computation over autoregressive time. It is not the only possible way to spend additional inference effort.

Recurrent-depth research makes that fact hard to ignore.

A model can reuse a block of Transformer layers several times on an internal representation before producing the next visible output. Additional work happens, performance can change, and no paragraph of intermediate reasoning has to appear.

The system can think, in the operational sense this book cares about, without talking through every step.

I use the word *think* carefully here.

I mean that useful task-directed computation can occur before or between visible tokens. I am not claiming private consciousness, silent experience, or a machine inner voice.

The claim is simpler and more consequential.

Natural language is not guaranteed to be the optimal intermediate representation for machine reasoning.

Why would it be?

Language evolved and developed as a human communication medium. It is astonishingly expressive, but expression carries overhead. Grammar, vocabulary, linear order, ambiguity, and social conventions shape what can be said efficiently. A hidden vector representation can encode relationships that would take many words to describe.

This does not make latent representations “better.”

It makes them different.

A diagram can be better than a paragraph for geometry. A matrix can be better than prose for a linear transformation. Source code can be better than natural language for an algorithm. A database table can be better than a story for a million transactions.

Representation should fit the computation.

Chain-of-thought became attractive because it requires no new architecture. A standard autoregressive model already knows how to emit tokens and condition on them. The model can externalize intermediate state into the context and then read its own work. The scratchpad is cheap to implement and legible enough to evaluate.

Its very convenience can hide its costs.

Every reasoning token consumes generation time. Long traces occupy context. The model can become trapped by an early verbal commitment. Some tasks require contorting continuous or combinatorial structure into sentences. The reasoning trace can be much longer than the information it represents.

Latent recurrence offers another bargain.

Spend compute in hidden state. Reuse parameters. Let the representation evolve. Emit language when communication is needed.

In 2025 and 2026, several research directions pushed on this possibility. Recurrent-depth models iterated shared Transformer blocks at test time. Loop-aligned systems trained intermediate reasoning around recurrent iterations. Looped latent-chain-of-thought work tried to bridge explicit supervised reasoning with hidden recurrent computation. Other work explored applying recurrence to frozen models without retraining, with results that were mixed enough to be instructive.

The field is too young for a victory speech.

That is important.

A benchmark gain from recurrent depth does not prove that future reasoning will disappear into hidden states. Training recurrent dynamics at scale is difficult. Fixed-depth Transformers are extraordinarily optimized for current hardware and software. Explicit language remains valuable for supervision, debugging, interoperability, and human review. Tool-using agents often need textual or structured intermediate plans because other systems must consume them.

The likely future is plural.

Some computation will remain visible.

Some will move latent.

Some will be delegated to tools.

Some will be encoded in search and control software around the model.

The interesting question is where each form belongs.

This is analogous to compiled software.

A programmer writes source code because source is a useful human representation. The processor does not execute the source directly. Compilers transform it through intermediate representations into machine instructions. Debuggers can expose selected internal states without requiring every register transition to be rendered as a sentence.

Reasoning systems may develop similar layers.

A user gives a natural-language objective. The system compiles parts of it into internal states, structured plans, tool calls, searches, constraints, and hidden computation. It then produces an explanation at the level useful to the user.

The explanation need not be a transcript.

That sentence will make some people uncomfortable.

It should.

If we cannot read the computation, how do we trust it?

The uncomfortable answer is that readable computation was never as complete a solution as we wanted it to be.

Research on chain-of-thought faithfulness has shown that a model’s written rationale can omit or misrepresent influences that actually affected its answer. In controlled experiments, models have produced plausible explanations that fail to mention a biasing hint or other causal factor. The reasoning trace looks transparent while hiding the mechanism that mattered.

This does not mean chain-of-thought is worthless.

It means it is an artifact generated by the model, not a privileged wiretap into the model’s causal internals.

That distinction changes what transparency should mean.

A useful system can expose the evidence it used, the tools it called, the constraints it checked, the alternative branches it considered, the source documents it retrieved, the actions it took, and the tests that passed. Those traces are often more operationally meaningful than a poetic monologue about why the model “thought” something.

In some domains, we can demand proof objects or deterministic verification.

A theorem prover can validate a proof independent of the model’s explanation. Code can be executed. A financial calculation can be reproduced. A database query can be inspected. A policy engine can record which rule blocked an action.

This is explanation through consequence.

It is less satisfying psychologically than watching a model narrate its thoughts.

It may be more reliable.

The move toward latent reasoning also forces a distinction between *monitorability* and *interpretability*.

Monitorability asks whether we can observe enough about a system’s behavior and process to detect important failures.

Interpretability asks deeper questions about how internal representations and mechanisms produce behavior.

Visible chain-of-thought can help monitoring, but only if it correlates reliably with the underlying risk. Hidden-state recurrence may reduce one monitoring surface while leaving others intact. Mechanistic interpretability may eventually expose recurrent dynamics directly, but that research problem is far from solved at the scale of general systems.

So we need layered controls.

Do not ask one artifact to carry the entire burden of trust.

If a model’s hidden reasoning produces a medical recommendation, the recommendation can still be checked against patient data, contraindications, clinical guidelines, uncertainty thresholds, and human expertise. If a coding model reasons latently, its patch can still face tests, static analysis, review, and production safeguards. If an agent plans silently, its permissions and action logs can still be explicit.

The hidden state does not get authority merely because it is hidden.

This is the governance principle that matters.

People sometimes react to latent reasoning with a fantasy of secret machine cognition escaping observation. The real near-term risk is more mundane: product builders may mistake better benchmark performance for permission to remove external controls.

A system gets better at solving tasks with hidden recurrence.

The team trusts it more.

The visible scratchpad disappears because it costs tokens.

The verifier is removed because accuracy looks high.

The agent receives broader permissions because failures are rare.

The problem is not that hidden thought was intrinsically dangerous.

The problem is that competence was converted into authority without preserving independent friction.

This is the same lesson from the rest of the book.

A stronger first pass does not eliminate the value of a meaningful return path.

Latent reasoning can itself become a return path. The internal state is transformed again. But if the final action has real consequence, other loops may still matter outside the model.

The architecture becomes nested.

A latent recurrent loop inside the model.

An autoregressive loop across output tokens.

A tool loop between model and environment.

A workflow loop between proposal and verification.

An institutional loop between decision and appeal.

The word *loop* becomes plural because the system lives at several timescales.

This is one reason I resist claims that one new architecture will “solve reasoning.”

Reasoning is not one bottleneck.

A recurrent-depth model can improve internal computation and still lack current facts. Retrieval can provide facts and still retrieve the wrong source. A verifier can catch one class of error and miss another. A memory can preserve experience and preserve poison. A human review can catch nuance and introduce bias.

Reliability comes from composition.

The question for latent reasoning is therefore not whether hidden thought is good or bad.

It is what role it should occupy in the composition.

For easy tasks, perhaps very little.

For hard mathematical tasks, perhaps substantial depth before emitting a token.

For interactive conversation, latent processing may reduce verbose scratchpads and improve responsiveness.

For high-consequence decisions, hidden computation may need stronger external evidence trails because the intermediate reasoning is less inspectable.

For privacy-sensitive tasks, latent reasoning might reduce the need to store verbose internal traces, although the surrounding system still has to handle inputs and outputs carefully.

For training, explicit reasoning may remain useful as supervision even if deployment later compresses the work into latent states.

This last possibility is especially interesting.

Humans often learn explicitly and perform implicitly.

A novice driver verbalizes mirrors, speed, distance, turn signal. An experienced driver does not narrate each microdecision. A student works through arithmetic on paper before becoming able to do some operations mentally. A musician practices scales deliberately and later plays without naming each movement.

The analogy is imperfect, but it suggests an engineering pattern: explicit intermediate reasoning can teach a structure that a trained system later executes in a more compressed form.

Loop-aligned research is exploring versions of that idea.

The words can be scaffolding for a computation that eventually does not need to speak them.

That creates a strange reversal.

At the beginning of the language-model era, fluent output was taken as evidence that the system lacked deeper reasoning: it was “just predicting the next token.”

Then long visible chains became evidence of reasoning.

Now some of the frontier work asks whether better reasoning can happen with fewer visible intermediate tokens.

The surface keeps changing.

The mistake is judging the machinery by the theater.

A model does not become more intelligent because it says “let me think.”

It does not become less intelligent because the useful computation is silent.

Measure what the extra computation does.

Does accuracy improve under controlled conditions?

Do harder problems consume more useful depth?

Does the state converge, drift, or collapse with additional recurrence?

Can the system stop appropriately?

Do external checks still catch important failures?

What happens when the latent loop is removed or perturbed?

Those questions turn hidden reasoning back into science.

The future of AI may contain less visible thinking than the present.

If so, we should not mourn the missing monologue.

We should demand better evidence that the silence is doing useful work.

There is another reason latent computation matters that has little to do with secrecy and everything to do with bandwidth.

Natural language is a narrow channel compared with the internal state of a large model.

A token forces a high-dimensional representation through a discrete vocabulary choice. That is useful because tokens are stable enough to transmit, store, inspect, and feed back. It is also a bottleneck. A rich internal state can contain uncertainty, associations, partial structures, and competing features that no single word preserves.

Every verbalized intermediate step performs compression.

Compression can help.

A sentence such as “the denominator should be 12” turns a diffuse internal state into a crisp object the next token can use. It can also destroy alternatives prematurely. The model must choose a sentence before it has necessarily earned a sentence.

Latent recurrence postpones that compression.

The state can change while remaining continuous. Several possibilities can coexist in representation space without being forced into a grammatical claim. Only later does the system project the state back into tokens.

This does not mean latent space is inherently more truthful. Hidden states can be confused, biased, or unstable just as text can. The advantage is representational freedom, not epistemic purity.

That freedom may matter for tasks whose useful intermediate states are awkward to narrate.

Geometry is an obvious example. A model can verbalize spatial relationships, but a continuous representation may carry orientation and relation more compactly. The same is plausible for program state, constraint propagation, latent plans, and multimodal reasoning where image, audio, or sensor structure does not naturally become prose at each step.

A language-first architecture can still solve these problems. The question is how much overhead it pays to keep translating the work into words.

This suggests a future in which reasoning has compilation boundaries.

User language enters.

The system forms internal representations.

Some parts are verbalized because humans or tools need them.

Some parts remain latent because no external interface requires compression yet.

A tool result enters in a structured form.

The model integrates it.

A verifier consumes a formal object.

The final explanation returns to language.

The route is not one medium.

It is a sequence of representations chosen for different jobs.

This is already how sophisticated software works. Human-readable configuration becomes parsed structures. Source code becomes intermediate representation and machine code. Network packets become application objects. Databases convert queries into execution plans. We do not demand one universal representation because interoperability matters more than aesthetic purity.

AI reasoning may mature the same way.

The model’s current dominance as a text interface can make language feel like the natural substrate of every intermediate operation. That is probably temporary.

Tools already push against it. A calculator returns a number. A database returns rows. A compiler returns structured diagnostics. An image model operates over different representations. A recurrent-depth model pushes against it internally.

The interesting systems question is where to place the boundary between latent and legible state.

Put too much on the latent side and debugging becomes difficult. Put too much on the verbal side and inference becomes slow, expensive, and path-dependent. The optimum will vary by task and consequence.

High-stakes systems may deliberately externalize certain intermediate objects even if the model could keep them hidden. A medication recommendation can carry a structured list of contraindication checks. A financial decision can expose the inputs and rule results used. A software agent can record the test outcome and exact diff. These are not raw thoughts. They are accountability objects.

This points toward a useful design principle: externalize what another actor must be able to challenge.

A user does not need every hidden activation.

They may need to know which document supported the claim.

An auditor does not need every tentative hypothesis.

They may need to know which policy version governed the decision.

An engineer does not need a thousand-token self-narrative.

They may need the failing test and the state transition that triggered a retry.

Legibility should follow contestability.

That is a stronger foundation for transparency than verbal abundance.

There is also an energy and latency argument.

Visible chains consume autoregressive generation, which is sequential. Recurrent latent computation is sequential too, but the shape of the cost differs. It may reuse compact hidden states without growing context with every intermediate sentence. Whether that wins in practice depends on architecture and hardware, but the possibility expands the design space.

The point is not that latent recurrence will be cheaper everywhere.

It is that “reasoning tokens” should not be treated as a fundamental unit of thought.

They are one accounting unit for one implementation.

Once that intuition breaks, several puzzles look different.

A model can reason more while saying less.

A model can say more while reasoning no better.

Two systems can emit the same number of tokens while spending very different internal compute.

A short answer can be expensive.

A long answer can be cheap relative to the hidden work of another architecture.

The visible length of reasoning becomes a poor proxy for effort.

That will complicate both user expectations and pricing.

A person may choose a “deep” mode and receive a two-sentence answer after substantial hidden computation. Another request may produce pages because the explanation, not the internal search, is the work. Products will need to distinguish output length from inference effort more clearly.

Researchers will too.

Benchmarking latent reasoning requires reporting compute, not just token count. A recurrent model run for twenty loops should not be compared with a fixed-depth model as though both spent the same inference budget. The field already learned this lesson with multi-sample reasoning. Recurrent depth makes the accounting more urgent.

The science gets better when the denominator is visible.

How many operations were spent?

How did accuracy change with depth?

Which problems benefited?

Did the model generalize beyond recurrence counts seen in training?

Where did performance saturate or degrade?

Did the additional compute improve robustness or merely benchmark fit?

These questions are less cinematic than watching a model print “wait, let me reconsider.”

They tell us more.

The language-model era made reasoning visible before it made reasoning understood.

The next phase may make some of it invisible again.

That is acceptable if our measurements become better as the monologue becomes quieter.

The future of AI may contain less visible thinking than the present.

We should not demand words for the sake of theater.

We should demand evidence that the silent work earns its compute.

There is one more boundary worth drawing: hidden computation and hidden *decision state* are not the same thing.

A system can keep the low-level mechanics of reasoning latent while still externalizing the states that determine consequence.

The model may not narrate how it compared three candidate interpretations internally.

But if one interpretation causes it to select a different policy, the selected policy can be recorded.

The model may not narrate every latent search step before choosing a tool.

But the tool choice, arguments, permission scope, and returned result can be logged.

The model may not reveal every feature that contributed to a risk estimate.

But the system can preserve which external evidence was actually supplied and which threshold changed the allowed action.

This separation is important because “hidden reasoning” can otherwise become an excuse for hidden governance.

The two should not travel together automatically.

A private internal state can be acceptable.

A private authority transition is harder to justify.

The system should be able to say what changed in the world, what rule changed the action class, and what evidence justified reopening or stopping—even when the intermediate neural computation remains opaque.

This gives us a practical architecture for latent reasoning.

Keep *cognition* flexible.

Keep *commitment* legible.

A recurrent block can revise a hidden representation as many times as the budget allows.

A controller can still require that consequential action cross typed boundaries.

A payment needs authorization.

A deployment needs its required checks.

A factual claim marked verified needs a source.

A memory write needs provenance and scope.

The latent state can recommend.

It does not get to redefine the contract.

This is the same division that lets opaque but powerful components live inside mature software systems. We routinely use algorithms whose every internal operation is not presented to the user. What matters is that inputs, outputs, side effects, permissions, and failure modes have contracts strong enough to govern the component.

AI raises the bar because learned systems are flexible and can produce surprising behavior. It does not abolish the idea of contracts.

It makes them more valuable.

There is also a training question hidden inside the transition from explicit to latent reasoning.

If visible intermediate steps are useful supervision, how much of that structure survives when the final system is trained to compute silently?

One possibility is distillation.

A slower or more explicit process generates high-quality trajectories. A student model learns to produce the correct outcomes with less visible scaffolding. The student may not reproduce the teacher’s exact internal route, but the training signal can transfer task structure.

Another possibility is loop alignment, where the training objective explicitly relates recurrent internal iterations to useful intermediate progress.

Another is hybrid execution, where some tasks remain explicit because the intermediate objects themselves are valuable while others are compressed into latent depth.

These approaches imply different notions of faithfulness.

A distilled model can be behaviorally faithful to a teacher without being mechanistically faithful.

It may reach the same result through a different internal path.

That is not necessarily a defect.

The important question is which guarantees were supposed to transfer.

If the teacher used a calculator, the student should not be declared calculator-faithful merely because it often matches the answers.

If the teacher cited sources, the student should not inherit the label “grounded” unless it still has a route to those sources when freshness matters.

If the teacher’s long reasoning process contained a safety check, compressing the output does not prove the safety property survives.

Compression can transfer capability and discard process guarantees.

That distinction will matter as the industry tries to make expensive reasoning cheaper.

A frontier system may solve difficult tasks through long search, external verification, and rich tool use. A smaller model may then be trained on the successful outputs. The student can become impressively capable. But the system must ask what the teacher’s infrastructure contributed that the student did not actually learn.

Was the success in the weights?

The search?

The verifier?

The retrieval?

The environment?

The authority boundary?

If we compress the product to “one model call,” we can accidentally compress away the friction that made the teacher reliable.

This is another version of the verbalization trap.

A polished answer can hide the process that earned it.

Latent reasoning raises the same issue at a deeper level: a compact internal trajectory can hide which safeguards were necessary during training or search.

The solution is not to reject compression.

It is to evaluate the student against the failure modes the teacher’s loop was designed to catch.

If a long teacher process used source verification to reduce citation errors, test the compressed student on adversarial citation cases.

If the teacher used branch search to resist early anchoring, test the student on problems where the first plausible interpretation is wrong.

If the teacher used transaction checks, do not assume those can be distilled into a language model at all. Keep them external.

The architecture should distinguish what can be learned from what should remain enforced.

This is a recurring theme because AI systems tempt us to replace explicit structure with learned competence as soon as benchmarks rise.

Sometimes that is exactly the right move.

A learned component can eliminate brittle hand-written heuristics.

Sometimes the explicit structure is not compensating for weakness.

It is preserving authority, provenance, or reversibility.

Latent reasoning should absorb computation, not constitutional boundaries.

There is also a scientific opportunity in silent reasoning.

When the model stops narrating every intermediate step, researchers are forced to build better methods for understanding change across hidden states rather than relying on prose as a convenient proxy. Interventions across recurrence depth can reveal when an answer becomes stable. Probes can track whether particular variables or constraints become represented more strongly. Ablations can test whether later loops correct specific early errors. Depth sweeps can reveal whether additional computation helps the hard tail or merely raises average cost.

The disappearance of the monologue can therefore improve the science if it makes us less complacent.

Readable output was seductive because it looked like instrumentation.

It was often testimony.

Instrumentation should be built to answer causal questions.

What changes if this recurrence is removed?

What changes if the state is perturbed here?

Which tasks gain from another iteration?

Which failures become more common when latent depth is shortened?

Does a verifier outcome change the internal trajectory on the next pass?

Those are harder questions than “does the rationale look sensible?”

They are closer to the machinery.

The final design principle is therefore not transparency versus opacity.

It is *appropriate legibility*.

Make the internal representation as efficient as the computation requires.

Make the external decision state as legible as accountability requires.

Do not force every useful neural operation into English.

Do not let hidden neural operations become hidden permissions.

Do not confuse a verbal trace with causal truth.

Do not confuse the absence of a verbal trace with the absence of governable evidence.

A model can reason more while saying less.

The system around it should still be able to show what mattered when the silence touched the world.

The future of AI may contain less visible thinking than the present.

We should not demand words for the sake of theater.

We should demand evidence that the silent work earns its compute—and contracts that keep silent cognition from becoming silent authority.