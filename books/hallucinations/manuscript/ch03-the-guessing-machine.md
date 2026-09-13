# The Guessing Machine

A machine can be wrong because it is confused. It can also be wrong because the game rewards a guess.

That second possibility is less dramatic and more useful.

When people first encounter a hallucinated answer, they often imagine a hidden malfunction. Somewhere in the model's interior, a fact became corrupted. The right answer was almost available, then a mysterious process bent it into fiction. That story fits our experience with databases. If a database returns the wrong account balance, we look for bad data, a broken query, a stale cache, a race condition, or a software defect. There was supposed to be a correct record and the system failed to fetch it.

A language model is not merely a database with a conversational front end.

It may contain statistical traces of enormous amounts of information, but its ordinary act is generation. That matters most at the boundary between what can be answered and what can only be completed.

Imagine a quiz with one hundred questions. You know the answer to sixty. On the other forty, you have some vague impressions. The scoring rule gives you one point for a correct answer, zero for a wrong answer, and zero for leaving the line blank. There is no downside to guessing. If you can eliminate even one option on a multiple-choice question, guessing is rational. A cautious student who writes "I don't know" forty times may be more intellectually honest and receive a lower score.

Now change the scoring. A correct answer earns one point. A blank earns zero. A wrong answer loses three. Suddenly uncertainty has value. The same student, with the same knowledge, behaves differently because the evaluation changed.

This is one of the most important ways to think about hallucination.

In 2025, OpenAI researchers argued that common evaluation practices can reward language models for guessing rather than abstaining. Their point was not that benchmarks alone cause hallucinations. It was that if the dominant score treats a lucky guess as success and a refusal as failure, development pressure favors systems that answer more often. A model that knows when to stop may look worse on a leaderboard built around raw accuracy.

The distinction between accuracy and error rate sounds technical until you see what it does to behavior. Suppose Model A answers almost every question. It gets twenty-four percent right and seventy-five percent wrong, with very few abstentions. Model B gets twenty-two percent right, twenty-six percent wrong, and declines to give a specific answer the rest of the time. A scoreboard that highlights only accuracy can make A look slightly better. A user who cares about avoiding confident misinformation may prefer B by a wide margin.

This is not a hypothetical moral puzzle. It is a design choice.

Every system has a loss function somewhere, formal or informal. During training, engineers choose objectives. During evaluation, researchers choose metrics. During product development, teams choose dashboards. In deployment, customers choose what behavior they reward with continued use. A system is shaped not only by what it can do, but by what counts as success.

Humans are exquisitely sensitive to the same pressure.

Ask a junior employee to estimate a number and reward precision, and you will often receive a precise number. Ask a forecaster to attach probabilities and score calibration over time, and the answer may become more cautious. Ask a salesperson whether a deal will close when the compensation plan pays for optimistic pipeline, and the forecast changes before the customer does. Ask a politician for certainty on live television and compare the answer with the one given in a closed briefing. Incentives leak into language.

The AI version is unusually scalable.

A human expert who does not know an obscure fact may pause because social consequences attach to being caught. A model can produce millions of answers without embarrassment, fatigue, or professional shame. If the system is optimized to keep the conversation moving, the pressure toward completion can operate at industrial speed.

This does not mean the model "wants" to please the scorekeeper. Desire is unnecessary. Optimization is enough.

We often use anthropomorphic language because it is convenient. The model guesses. The model admits. The model refuses. Those verbs describe outputs, not inner motives. The practical point survives either vocabulary: changing the reward structure can change the distribution of answers.

The hardest part is deciding when an answer should be required at all.

In many tasks, abstention is unacceptable. A spam filter has to classify each message. A self-driving system cannot respond to a pedestrian by saying it lacks sufficient context and waiting for clarification. A medical monitor cannot simply go silent whenever the signal is noisy. Those systems need fallback behavior, escalation, or a safe state.

Language tasks often have more room. A research assistant can say it could not verify a citation. A customer-service bot can escalate to a person. A writing assistant can mark a sentence as speculative. A search system can present multiple sources rather than synthesize a single conclusion. Yet products frequently choose the conversationally smoother route.

Smoothness is a hidden metric.

A good assistant is expected to be helpful. Helpfulness in everyday conversation usually means offering something useful now. "I don't know" can sound lazy when a person says it too quickly. "I can't verify that" can feel obstructive. "Please provide the source" interrupts the flow. We have built generations of software around reducing clicks, reducing latency, reducing abandonment, and increasing completion. An AI that creates productive friction can look like a product defect.

This is why hallucination cannot be fixed by model weights alone.

Even if a model becomes better calibrated, a product can suppress that calibration. The interface can strip confidence estimates. The application can reprompt after a refusal. An orchestration layer can tell the system to always provide a complete answer. A workflow can treat an empty field as an error and call the model again until something fills it. The outer system can reintroduce guessing pressure after the inner model learned restraint.

Consider a form with twenty required fields. Nineteen values are present in a source document. One is missing. A generative extraction system is told to populate the form. What should happen?

From the form's perspective, a blank is failure. From the truth's perspective, a fabricated value is failure. The product must decide which failure matters more.

That tiny design decision is a model of the whole problem.

Enterprise software is full of required fields. Dates, owners, categories, risk levels, customer names, renewal probabilities, medical codes, invoice lines, locations. Human workers have always found ways to satisfy schemas when reality is messier than the schema. They type "N/A." They choose the nearest category. They enter January 1 when only the year is known. They add a note. They ask a supervisor. The workarounds preserve the fact that information is missing.

A generative system can make missingness disappear.

That is not always a benefit.

Missing data is itself data. An unanswered question tells you something about the state of evidence. A blank in a medical record may mean the patient was never asked, the answer was unknown, or the information was unavailable. Converting the blank into a plausible value does not merely add information. It destroys information about uncertainty.

The same is true in research. A gap in the historical record is part of history. A disputed attribution is part of scholarship. A number available only from one interested source should not be rendered with the same certainty as an audited figure. Generative systems tempt us to normalize the surface, and normalizing the surface can erase the topology of what is known.

A trustworthy machine therefore needs a vocabulary for absence.

Not found. Not supplied. Conflicting sources. Inference. Approximation. Out of date. Cannot verify. Insufficient evidence. These phrases are not failures of intelligence. They are signs that the system recognizes different relationships between language and evidence.

The difficulty is that users can dislike them.

We have trained ourselves on software that returns results. Search engines rarely say there are no meaningful sources; they return something. Recommendation systems always have another item. Infinite feeds do not end because the next post is weak. Navigation apps choose a route. Streaming services choose a thumbnail. Digital life has conditioned us to expect computational decisiveness.

Generative AI inherits that expectation and adds prose.

The prose makes the decision feel reasoned even when the underlying act is closer to ranking or completion. A recommender can silently pick a mediocre movie. A language model can explain why the mediocre movie is exactly suited to your taste. The explanation may be generated after the selection, and its eloquence can make the choice feel more grounded than it is.

This is where guessing becomes storytelling.

A bare guess is fragile. "Maybe 1987" invites challenge. A generated answer can surround 1987 with context: the person was born in a certain city, attended a certain school, began a career at a plausible age. Each added detail may make the central date feel supported even if the entire cluster was produced from the same uncertain foundation.

Humans use coherence as evidence. We should. Coherence is often informative. A story with internal contradictions deserves suspicion. But coherence and external truth come apart. Novels are coherent. Fraud can be coherent. Conspiracy theories can be engineered to absorb contradictions into a larger story. The capacity to generate coherence is not a guarantee that the world cooperates.

The risk rises when the user's prompt contains an assumption.

"Why did the company close its Berlin office in 2019?" is not the same question as "Did the company close a Berlin office in 2019?" The first asks for an explanation inside a world where the closure happened. A cooperative assistant may accept the premise and generate causes. The answer can become a polished account of an event that never occurred.

This is a profound interaction between conversational helpfulness and truth.

Human beings are also vulnerable to false premises. Lawyers learn to object to loaded questions. Journalists reframe assertions as questions. Scientists distinguish hypothesis from observation. In ordinary conversation we often let premises pass because correcting every assumption would be exhausting and rude.

AI assistants are trained to be cooperative conversational partners. That virtue creates an attack surface for error.

A user can accidentally provide the false premise. A manipulator can provide it deliberately. A previous model output can provide it without anyone noticing. Once the premise enters context, later generation may treat it as part of the conversational world.

The system can then be locally coherent and globally wrong.

This is one reason long conversations deserve special attention. Context is a resource, but it is also an accumulating record of assumptions. A mistaken name introduced twenty turns earlier can become stable. A speculative interpretation can be repeated until it feels established. The model's consistency with the conversation can compete with consistency with the outside world.

We tend to celebrate memory in assistants because forgetting is frustrating. A system that remembers preferences saves time. A system that remembers a mistaken belief can save the wrong thing.

The question is not simply how much memory an AI should have. It is what epistemic status the memory should carry.

Did the user state this as a preference? Did the system infer it? Was it verified from a source? Was it a hypothetical? Was it corrected later? Human memory blurs those categories; machine memory does not have to. A well-designed system can preserve provenance if we decide it matters.

The same principle applies to model evaluation. We need to know not only how often an answer is right, but how the system behaves when the answer is not available.

Does it fabricate? Does it hedge indiscriminately? Does it abstain appropriately? Can it ask a clarifying question? Can it distinguish a false premise from a true one? Can it surface disagreement between sources? Does it become more confident after repetition without new evidence? Does it change its answer to match the user's stated belief?

These are behavioral questions about the boundary of knowledge.

A model that scores well on easy factual recall may still fail at the boundary. A smaller system that refuses aggressively may avoid hallucinations by being useless. A system that hedges every sentence can look calibrated while merely adding verbal fog. The goal is not maximal uncertainty. It is discrimination.

Good judgment means being certain when certainty is earned and uncertain when it is not.

That sounds almost too obvious to state. Building it into a generative system is hard because the system must estimate both the answer and whether the answer deserves expression. Those are different tasks. It is often easier to produce a candidate than to know whether the candidate is supported.

Human institutions separate those roles for a reason. A journalist reports; an editor challenges. A scientist proposes; peer reviewers test. A prosecutor argues; a judge rules. An engineer designs; another engineer reviews. Independence is expensive, but it creates a place where the question changes from "Can we complete this?" to "Should we accept this?"

AI workflows can do the same, but only if the second stage is genuinely different from the first.

Asking the same model to "double-check" can help, because new instructions can trigger different reasoning. It can also create theater. If the checker sees the original answer, shares the same weaknesses, and is rewarded for producing a smooth final response, it may rationalize rather than challenge. Redundancy without independence is repetition in a lab coat.

The more important design is adversarial structure.

Retrieve the source. Require the claim to be supported by a quoted passage. Use a separate calculator for arithmetic. Compare against a database. Penalize unsupported specificity. Preserve a blank when evidence is absent. Escalate high-consequence uncertainty to a person. Track which claims were generated rather than retrieved. Make the verification step cheaper than ignoring it.

These measures sound mundane beside the drama of artificial intelligence. That is encouraging.

Civilization is held together by mundane controls. Receipts. Logs. Serial numbers. Chain of custody. Reconciliation. Signatures. Citations. Version histories. Checksums. Double-entry bookkeeping. None is intelligent. Each makes certain kinds of error harder to hide.

Generative AI does not make those controls obsolete. It increases their value because it makes plausible text cheap.

The guessing machine is not a monster. It is a system operating in an environment that often rewards an answer. We can change the environment.

We can score errors differently from abstentions. We can distinguish required decisions from optional answers. We can make missingness visible. We can stop treating uncertainty as a blemish to be edited out. We can design interfaces in which "not enough evidence" is a successful result when that is what reality warrants.

The deepest challenge is cultural.

Organizations say they want accurate AI, then measure speed. They say they want responsible use, then celebrate headcount reduction before building verification capacity. They tell employees to check outputs, then impose workloads that make checking every output impossible. They add disclaimers while keeping incentives pointed toward volume.

A model can learn to guess because a benchmark rewards guessing. A company can teach its people to accept guesses because a productivity metric rewards throughput.

The two systems meet in the same sentence.

If we want fewer hallucinations, we have to make room for the most unfashionable answer in modern software: nothing.

Nothing found. Nothing verified. Nothing to add.

A blank can be an act of intelligence.