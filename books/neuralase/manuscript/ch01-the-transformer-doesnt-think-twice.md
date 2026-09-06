# The Transformer Doesn’t Think Twice

A language model can answer a difficult question with a single word and consume an extraordinary amount of computation before that word appears.

That sentence already makes the phrase “one pass” dangerous.

The Transformer architecture is simple enough to explain badly and complicated enough to punish the explanation. At the broadest level, a stack of layers repeatedly transforms representations of the input. Attention lets positions exchange information. Feed-forward components transform what each position carries. Residual connections preserve and modify state. By the time the representation reaches the output, the model has performed many learned operations.

So when someone says a Transformer “only gets one shot,” that is not literally true in the sense that nothing iterative has happened inside the network. A forty-layer model has not applied one function once and gone home.

The useful distinction is elsewhere.

In a conventional fixed-depth Transformer, the number and arrangement of layer transformations are largely decided before the prompt arrives. The easy question and the hard question traverse the architecture that was built for them. They may activate different features. Attention patterns may differ. Some token positions may matter more than others. But the basic depth is not ordinarily negotiated with the problem.

Then decoding begins.

For an autoregressive language model, producing text means repeatedly invoking the model to predict the next token from the context available so far. The generated token is appended. The context changes. The model runs again for the next token. In efficient implementations much of the previously computed attention state can be cached, but from the conceptual point of view the system is still advancing one generated token at a time.

This is a loop.

It is also not the loop this book is mainly about.

If the model predicts “Paris” as the answer to a straightforward geography question, the repeated decoding process is merely how the answer is emitted. If the model writes two pages of analysis before deciding on an answer, the emission process has become a scratch space. If a controller takes the answer, asks whether a cited source supports it, retrieves the source, and sends the contradiction back to the model, a new kind of loop has appeared. If the model itself is architected so a block of layers can be re-used several more times before the next token is emitted, another kind has appeared again.

We need to keep these levels separate because otherwise almost any computation can be described as “thinking in loops” and the phrase stops telling us anything.

A useful way to begin is with a mundane case.

Suppose a model is asked to add 47 and 58.

A capable model can usually produce 105 directly. It may emit an intermediate explanation if requested. It may not need one. The task is small enough that whatever useful representation the network learned during training can often carry the answer through ordinary inference.

Now give it a long scheduling problem with twenty constraints, ambiguous language, two exceptions, and a final requirement to explain which constraints forced the outcome.

The model can still produce an answer directly. But the chances that a single unexamined trajectory contains a mistake are higher. One constraint may be dropped. Another may be applied twice. An early interpretation can shape everything that follows. The language can remain polished while the combinatorics quietly go wrong.

Humans know this feeling.

We do not solve every problem by introspecting until truth arrives. We write things down. We try a case. We cross something out. We ask someone else. We use a calculator. We return to the premise. We sleep and come back. The important feature is not that human cognition is literally equivalent to any of these machine techniques. It is that difficult reasoning often benefits from creating intermediate states that can be inspected and changed.

Chain-of-thought prompting made this practical lesson visible in language models.

The early result was not that models had suddenly acquired a philosophical inner monologue. It was operational: on many multi-step tasks, eliciting intermediate reasoning before the final answer improved performance. Those additional tokens changed the context in which later tokens were generated. The model had, in effect, built itself a textual workbench.

The workbench matters because autoregressive generation is path dependent.

Once a token is emitted into the chain, it becomes part of the context for what follows. A correct intermediate result can narrow the space usefully. A bad assumption can do the same thing in the wrong direction. The chain is therefore both computation and commitment.

This is why longer is not automatically better.

Imagine a person solving a probability problem and writing the wrong denominator on line two. Ten additional lines do not necessarily rescue the work. They may make the wrong denominator more deeply integrated into the solution. Verbal reasoning can be a way to expose structure, but it can also be a way to elaborate a mistake.

The problem is not unique to language.

Any sequential process can become trapped by an early state if later computation is conditioned on it. Search algorithms deal with this by branching. Optimization deals with it by moving under an objective. Scientific practice deals with it by testing predictions against observation. Courts deal with it imperfectly through adversarial argument and appeal. Engineering deals with it through measurement and feedback.

Language models initially had a peculiar disadvantage: their intermediate work often lived in the same medium as their final answer.

Language is flexible enough to represent arithmetic, plans, code, legal arguments, stories, proofs, and excuses. That versatility is one reason large language models became such general tools. It also means the scratchpad can look finished before it is correct.

Fluency gives provisional work a suit.

The model writes “therefore” whether the conclusion follows or not. It can number steps that are not independent. It can produce a critique that sounds more rigorous than the thing being critiqued. The visual surface of reasoning is not a reliable measure of whether the reasoning improved.

This is the first place where the second pass becomes interesting.

A second pass can be nothing more than another generation conditioned on the first. “Check your answer.” “Look for mistakes.” “Rewrite this more carefully.” Sometimes that helps. The first output has created new text for the model to inspect. The prompt changes the task from production to evaluation. Different patterns may be activated.

But the system is still trapped inside its own information if nothing else changes.

If the model does not know that Lisbon is in Portugal, asking it five times to reconsider Lisbon does not create geography. If the model made a subtle algebraic error and cannot discriminate the bad step from the good one, self-critique can become a second performance of the same ignorance. If the model is biased toward its first answer, the review can rationalize it. If the review prompt makes the model over-suspicious, it can “correct” something that was already right.

This is not an argument against self-reflection prompts.

It is an argument against confusing recurrence with verification.

The distinction sounds semantic until money enters the system.

Every added pass costs something. Tokens cost latency and compute. Branching multiplies calls. Tool use adds network and service latency. Recurrent depth consumes more operations before output. Verification may require another model, a test suite, a search index, a database query, or a person. If an added loop is not increasing the probability of a better answer enough to justify those costs, it is expensive theater.

Reasoning systems are therefore economic systems from the beginning.

They allocate scarce computation under uncertainty about difficulty.

A fixed-depth model makes one allocation decision at training and architecture time. A reasoning model can make more of it at inference. A controller can decide that a simple request gets a fast path while a hard proof gets more tokens, more branches, or a stronger verifier. A recurrent architecture can let an internal state travel through the same transformation additional times. A dynamic-depth model can let some token positions receive more processing than others.

Once you see this, “thinking” becomes less mystical and more operational.

How much computation is being purchased for this problem?

Where is it spent?

What state changes between expenditures?

What evidence says the expenditure helped?

What stops the spending?

These questions do not tell us whether the system possesses understanding in a philosophical sense. They do something more useful for engineering: they tell us where additional capability might come from and where it might fail.

The original Transformer paper mattered partly because it removed a particular kind of recurrence from the center of sequence modeling. Recurrent neural networks processed sequences step by step, carrying state forward. The Transformer allowed much more parallel processing through attention. Training became friendlier to modern hardware. Global dependencies became easier to represent.

The success was so complete that “Transformer” came to feel almost synonymous with a break from recurrence.

History is now bending that story back on itself.

Researchers are exploring models that reuse blocks of Transformer layers across depth. Others let models produce long reasoning traces at inference. Others build software loops around fixed models. Others allocate compute dynamically across tokens. Others use verifiers to search among candidates. The Transformer did not fail. It became a component in systems willing to reintroduce time and iteration where they buy something useful.

That is a different kind of progress from simply making the stack taller.

A taller fixed model puts more learned transformation into every ordinary pass. A looped system creates the possibility that computation depth becomes conditional. The hard input can earn more work. The easy input can stop.

The word *earn* matters.

If difficulty cannot be detected, the system will allocate badly. If the stopping rule is poor, it will quit too early or churn too long. If the verifier is weak, search will select polished nonsense. If branches are correlated, diversity will be cosmetic. If hidden-state recurrence drifts, additional depth can degrade representations rather than refine them.

There is no free intelligence hiding in the word loop.

There is only an expanded design space.

This is why I do not want to call the first pass “instinct” and the second pass “reason,” tempting as that analogy might be. Human dual-process theories already carry their own debates, and machine inference does not become a human cognitive system because it uses two stages. More importantly, the distinction would miss the engineering detail.

The second pass is not valuable because it comes second.

It is valuable when secondness changes the informational or computational condition.

Take three systems.

System A produces an answer, receives the prompt “Are you sure?”, and produces another answer.

System B produces an answer, runs a deterministic unit test, receives the failing assertion, and revises the code.

System C processes a latent representation through a shared block for eight additional iterations before emitting anything.

All three contain re-entry. Only B obviously receives new external evidence. C receives additional computation without new external evidence. A receives only a changed instruction and its own prior output.

Which will improve most?

There is no universal answer. It depends on the task, the training, the model, the feedback, and the compute budget. That is precisely why the category is useful. It forces us to stop saying “the model thought longer” and ask what kind of longer happened.

Sometimes the difference is semantic decomposition. A hard question is broken into smaller questions. Each answer changes what the next subproblem looks like. Least-to-most prompting uses this explicitly.

Sometimes the difference is population. Self-consistency samples several reasoning trajectories and aggregates the final answers, reducing dependence on one unlucky path when the paths contain useful diversity.

Sometimes the difference is search. Tree-of-Thought-style systems branch, score, and revisit states.

Sometimes the difference is action. ReAct interleaves reasoning with operations that bring back observations from an external environment.

Sometimes the difference is supervision. A process reward model evaluates intermediate reasoning rather than only the final answer.

Sometimes the difference is depth itself. A recurrent block is applied again to hidden representations before output.

These approaches should not be squeezed into one recipe. They can, however, be compared along the same question: what did re-entry make available that was unavailable to the first path?

That question protects us from a common mistake in AI: treating the visible ritual as the mechanism.

A long chain of thought looks like work. A second critique looks like care. Five agents debating look like a committee. A tool call looks like evidence. None of those appearances guarantees anything.

The mechanism has to cash out in changed state and better discrimination.

Otherwise the system is only narrating effort.

The deepest change in reasoning models may therefore be less theatrical than it first appears. We are learning to build systems in which inference is not a single contractual event between prompt and completion. It is a process with intermediate state, resource allocation, feedback, and termination.

Software engineers have seen this movie before.

A database transaction can retry. A network protocol acknowledges and retransmits. A control system measures and corrects. A compiler performs multiple passes. An optimizer iterates. A distributed service assumes partial failure and recovers. None of these systems is called intelligent merely because it loops.

The loop is the structure that lets consequences return.

What is new is the thing inside the loop: a general-purpose learned model capable of interpreting the returned consequence and changing what it does next across a wide range of tasks.

That combination is why the second pass matters.

There is another distinction worth making before we go farther, because production systems blur it quickly: a loop can exist at one level while remaining fixed at another.

Consider a code assistant working on a failing test. At the application level it may run for twenty minutes. It reads a repository, edits a file, executes a test, sees the failure, edits again, and eventually stops. From the user’s point of view this is one task. From the orchestrator’s point of view it is a trajectory with several state transitions. From the model’s point of view each call may still be an ordinary fixed-depth Transformer inference followed by autoregressive decoding. The intelligence people attribute to “the agent” partly belongs to the model and partly to the loop that keeps returning the changed repository to it.

Move the loop inward and the picture changes again.

A recurrent-depth model can apply a learned block several times to a hidden representation before a token is emitted. There may be no new file, tool result, or sentence. The external environment is unchanged. Yet the computational depth allocated to the representation has increased. If the model was trained for those recurrent dynamics, the extra iterations can refine the state in a way that a fixed-depth pass cannot.

Now put the two together.

An agent can use a recurrent-depth model, emit a short plan, call a compiler, receive an error, return that error to the model, and then let the model spend additional latent depth on the revised state. The phrase “one reasoning loop” is suddenly hopeless. There are nested clocks.

This nesting is likely to become normal.

We already accept nested loops everywhere else in computing. An operating system schedules a process that contains a runtime executing a program that contains an optimization loop that calls a database that runs its own query planner. The user does not need to know every layer to use the system. The engineer does need to know which layer owns which failure.

Reasoning systems will need the same hygiene.

If an answer degrades after a second attempt, was the problem the model’s self-critique, the controller’s retry policy, the verifier’s scoring rule, the retrieval result, the recurrent depth, or the fact that the task should never have been retried at all?

Without that decomposition, “the AI reasoned badly” explains almost nothing.

This matters particularly when systems are benchmarked.

A model score can quietly become a system score. A result labeled with a model name may include hidden prompt scaffolds, multiple samples, majority voting, tool access, a verifier, retries, or a search procedure. None of this is illegitimate. The system is the thing users actually encounter. But comparisons become slippery if one side is a bare model and the other is a small computational organization wearing a model’s name.

The same confusion occurs in the opposite direction. A capable model can look weak when a product gives it a poor loop. The controller may cut it off too early. Retrieval may feed stale context. A brittle parser may reject a good answer. A timeout may prevent the tool result from returning. The model then receives blame for an orchestration failure.

This book is not an attempt to rescue models from responsibility.

It is an attempt to put responsibility in the right layer.

That becomes more important as inference systems acquire adaptive depth. If an ordinary request receives four recurrent iterations and a difficult one receives forty, then the product no longer has a single meaningful number called “model latency.” It has a distribution shaped by difficulty detection and stop rules. If one branch calls an expensive verifier and another does not, the cost distribution changes too. If a controller sometimes abandons an internal path and restarts from a different interpretation, the causal route to the answer becomes a graph rather than a line.

This is what I mean when I say inference is acquiring topology.

A fixed network still has topology, of course. The phrase here refers to the path a particular problem takes through a reasoning system. The path can now differ substantially from one invocation to another.

That path itself becomes a source of capability.

It also becomes a source of bugs.

A router can misclassify difficulty. A brancher can create diversity that is only lexical. A verifier can prefer elaborate answers over correct short ones. A memory system can retrieve the wrong previous case and make every later step coherent around a false analogy. A stopping rule can interpret agreement as truth when every branch shares the same missing premise. A tool can be authoritative about a narrow fact and still be irrelevant to the broader decision.

These are not exotic problems. They are the ordinary failure modes of composed systems.

The reason they feel new is that the components now speak natural language well enough to hide the seams.

A failed database query throws an error. A failed reasoning loop may produce a paragraph.

The paragraph can be persuasive enough that nobody notices the control flow went wrong.

That is why outputs alone will become a less adequate debugging surface. A mature system will need provenance at the level of consequential transitions: which source entered, which test failed, which branch was discarded, which verifier caused escalation, which budget ceiling stopped further work, which tool changed the answer. This is different from exposing private chain-of-thought. It is operational history.

The distinction is healthy.

We do not need every hidden activation in order to know that a calculator returned 105, a compiler rejected the program, a source contradicted the draft, or a controller stopped after two independent branches converged. Those facts say something checkable about the reasoning environment without pretending to translate the network into a diary.

The next generation of AI systems may therefore become less obsessed with narrating thought and more serious about instrumenting inference.

That would be progress.

There is one final reason to establish these layers carefully. Once a loop can alter how much computation a problem receives, model capacity and system policy begin to mix.

A hard prompt might receive more depth because the controller judged it consequential. Another might receive less because a user selected a fast mode. A third might receive more because the verifier failed. A fourth might never be allowed to call a tool because the permission boundary forbids it. Two users can therefore ask the same base model the same question and receive not merely different stochastic samples but different computational treatment.

The allocation decision is part of the answer.

That means intelligence at deployment is no longer fully described by the weights.

The weights establish possibilities. The loop decides which possibilities get exercised.

The Transformer does not need to “think twice” in the human sense.

It only needs a reason for another computation to be different from the first.
