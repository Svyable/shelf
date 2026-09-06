# Neuralase

*Transformer Loops and the Intelligence of the Second Pass*

**Sven Hardy Benson**

---

The most consequential answer a machine gives may turn out to be the one it does not give first.

For most of the modern software era, a computation had a satisfying finality to it. You supplied the inputs. The program ran. Something came back. A spreadsheet recalculated. A database returned rows. A compiler produced an error or an executable. You could run the program again, of course, but repetition belonged to the user, the operating system, or another program surrounding it. The basic mental picture remained clean: input, function, output.

Large language models looked like they fit that picture until people began asking them harder questions.

Then the answer started taking detours.

A model wrote a draft, criticized it, and wrote another. It generated five possible solutions and chose among them. It called a search tool, read the result, changed its plan, called another tool, and continued. It wrote code to test an arithmetic claim instead of trusting its own prose. It kept a note from an earlier attempt and used the note on the next one. Some systems spent more tokens before answering. Some research models spent more computation in hidden states before emitting those tokens at all. Old ideas about recurrence, variable computation, and shared depth began appearing beside newer ideas about reasoning models and agents.

The word *loop* started doing too much work.

A Transformer already participates in repeated computation during autoregressive generation because the model is invoked as each new token is produced. That is not the same thing as taking a completed provisional answer and asking the system to inspect it. A chain-of-thought is not the same thing as a tree search. A software agent that calls the same language model twelve times is not architecturally identical to a recurrent-depth Transformer that reuses a block of layers before emitting a token. A model revising a paragraph after receiving a compiler error is doing something different again.

These mechanisms share a family resemblance, but family resemblance is not identity.

The resemblance is re-entry.

Something produced by one stage becomes material for another pass through intelligence. The thing returned may be a token sequence, a hidden state, a tool result, a verifier score, a memory, a branch candidate, a contradiction, an error message, or simply the unresolved problem represented at greater depth. The next pass does not begin from exactly the same condition as the first.

Sometimes that helps.

Sometimes it makes the answer worse.

That second sentence is the reason for this book.

It is easy to tell a triumphant story about machine reasoning in which the first generation of language models merely answered and the next generation learned to think. The story is attractive because it makes progress sound like a door opening. On one side: autocomplete. On the other: reason.

The evidence is messier and therefore more useful.

Longer reasoning can improve difficult tasks. It can also waste computation or cause a model to abandon a correct answer. Asking a model to check its own work can produce a better result. It can also produce a confident critique of something that was already correct. Sampling several reasoning paths can outperform taking the first one. It can also create five correlated mistakes and an expensive vote among them. A tool can introduce reality into the loop. It can also introduce stale data, a bad retrieval result, a permission failure, or a new attack surface. Memory can preserve a lesson. It can preserve a falsehood with equal loyalty.

A loop is not intelligence.

A loop is an opportunity for intelligence to encounter a difference.

I needed a word for that difference because the language around reasoning systems kept collapsing the important mechanisms into vague verbs. The model “reflects.” The agent “learns.” The system “thinks longer.” These phrases are useful shorthand until they hide more than they reveal.

So I am going to introduce a word and then spend the rest of the book trying to earn it.

**Neuralase** is my term for the catalytic arrangement that makes re-entry productive.

The suffix is intentionally suggestive of an enzyme, but the analogy stops there. I am not proposing a molecule in a silicon brain, a biological equivalence, or a newly discovered component inside Transformer weights. Neuralase is a conceptual lens for systems engineering: a return path plus a discriminating change that gives the next pass something worth doing.

The change may come from outside the model. A unit test fails. A search result contradicts the draft. A chess engine rejects a move. A database contains no record matching the claim. A human says the answer misunderstood the question. The world pushes back.

The change may also be computational. The system explores a second branch. A verifier scores intermediate steps. A recurrent block transforms a latent representation again. A learned router assigns more depth to a difficult token. A controller decides that uncertainty justifies another attempt.

What matters is not that the system repeats itself.

What matters is that the next pass is meaningfully conditioned by something the previous pass did not settle.

This sounds almost obvious when stated plainly. That is usually a good sign.

Useful ideas often become harder to see when a field gets rich in branded techniques. Chain-of-thought. Self-consistency. Tree of Thoughts. ReAct. Reflexion. Self-Refine. Process supervision. Test-time compute. Recurrent depth. Latent reasoning. Dynamic depth. Adaptive computation. Each name points to real work. Each work solves a different problem or draws a different boundary. But from far enough away, another pattern appears: intelligence is being granted more opportunities to revise the state of the problem before the system commits to an answer.

For decades, scale in computing was narrated primarily through hardware and stored complexity. More transistors. More memory. More machines. For contemporary AI, the same instinct became more parameters, more training data, more accelerators, larger clusters. Those remain powerful axes.

Inference is adding another.

How much useful computation should happen *now*, for this problem, before the answer becomes final?

That question changes the economics of intelligence. Training cost is paid before the user arrives. Test-time cost is paid because the user arrived. If a system can spend ten times more computation only on the ten percent of problems that deserve it, the design space looks different from a model that spends the same depth on everything. If a smaller model can sometimes close part of the gap with a larger model by using inference compute intelligently, the old boundary between buying capability in advance and renting it at the moment of need becomes less rigid.

It also changes reliability.

A system allowed to reconsider has a chance to catch a mistake. But the chance is not a guarantee. Correction requires a way to discriminate. One of the most sobering lines of research in this area shows that language models do not automatically become good critics of their own reasoning merely because they are asked to inspect it. In many settings, external feedback matters. A correct answer key, a tool, a verifier, a structured condition, a compiler, or training designed for correction can supply friction that the model alone lacks.

This is where the enzyme metaphor earns a little of its keep.

A catalyst does not merely make molecules collide more often. It changes the pathway by which a reaction can proceed. Neuralase, as I use the term, is whatever changes the pathway of inference so the next computation is not just another spin through the same certainty.

There is a second consequence.

When reasoning can move into hidden states, visible language loses its monopoly on “thought.” That may be efficient. It may also make systems harder to inspect. Even explicit chain-of-thought has never been a guaranteed transcript of the causal process producing an answer. A model can write a persuasive rationale that omits the influence that actually changed its prediction. So the future of reasoning cannot be designed around the comforting assumption that what the model says about its reasoning is the reasoning.

We will need other handles.

Behavior. Verification. Counterfactual tests. Tool traces. State transitions. Measured improvement under additional compute. Stopping behavior. Error recovery. The consequences of intervention.

The third consequence is less technical and may matter more.

Organizations are about to inherit the same problem.

As more decisions are delegated to systems that can act, the critical institutional question moves beyond whether the first recommendation is accurate. What can send the decision back through the system? New evidence? A challenge? A failed check? A person affected by the answer? A policy conflict? An observed consequence? And when it returns, does the second pass have authority to change anything?

A machine with no useful re-entry path is brittle.

So is an institution.

This book does not argue that every decision needs endless review. Quite the opposite. Loops are expensive. They create latency, cost, coordination, and opportunities for error. A system that cannot stop is not thoughtful. It is stuck.

The interesting design problem is therefore bounded re-entry.

Enough recurrence to let difficulty earn more computation. Enough branching to escape a bad first path. Enough external contact to let reality interrupt eloquence. Enough memory to carry forward useful lessons. Enough verification to distinguish a revision from a rewrite. Enough stopping discipline to keep thought from becoming churn.

There is a temptation to turn this into a universal framework with five boxes and a consulting diagram.

I am going to resist it.

The research is too young and the mechanisms are too different for that kind of tidiness. Recurrent-depth Transformers may become central or remain specialized. Explicit chain-of-thought may remain common, move behind interfaces, or be displaced in some domains by latent computation. Tool-using agents may become reliable enough that software loops matter more than model architecture. Better base models may swallow behaviors that currently require elaborate orchestration. Inference costs will move. Hardware will change. Training will change.

What I think will survive is the question.

When the first pass is not enough, what exactly happens next?

That question is more precise than asking whether a machine “thinks.” It is more useful than arguing about whether a long answer looks intelligent. It forces architecture, economics, verification, and stopping into the same room.

The first pass matters.

The second pass tells us what kind of system we built.
