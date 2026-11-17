# 6 — Who Gets the Room?

An image can be processed by parts of the brain without becoming material for every possible decision. That is the intuition behind global workspace theories of consciousness. The visual system may do local work. An item becomes more broadly available when it wins access to a distributed network capable of supporting flexible behavior, report, memory, and coordinated action.

It is a useful idea, partly because it turns a vague word—awareness—into predictions about communication. What changes when content becomes globally accessible? Does the signal spread? Does it persist? Can another subsystem use it for a task that the original sensory module could not perform alone? What happens when that communication is interrupted?

For decades, global neuronal workspace theory has attracted evidence and criticism. The theory's strongest formulations predict nonlinearity and broad amplification associated with conscious access. A perceptual input can produce early local activity without triggering the more extensive pattern associated with report. But the brain is not a cleanly wired newsroom in which information becomes conscious when it appears on a single editorial screen. Activity has content, timing, task dependence, and recurrent structure. The precise neural implementation remains contested.

The most instructive event in the recent history of the theory may be an experiment that refused to offer a simple winner.

On April 30, 2025, the Cogitate Consortium published [*Adversarial testing of global neuronal workspace and integrated information theories of consciousness*](https://doi.org/10.1038/s41586-025-08888-1) in *Nature*. Researchers associated with competing theoretical traditions had worked toward preregistered tests of their predictions. The results challenged aspects of both theories. Some predictions survived in part, others did not, and some measurements proved inconclusive. It was not a verdict that consciousness belongs in the front of the brain or in the back. It was evidence that the theories had made claims specific enough to be put under pressure.

There is a lesson for anyone designing a machine from consciousness theories: if a theory is worth taking seriously, it should be allowed to be wrong.

## A room is a metaphor with wiring underneath

A global workspace is often described as a stage, a blackboard, or a shared room. Specialized processors do their work; a selected item becomes available to many others. The metaphor explains something familiar. A visual pattern that has been recognized can influence a sentence, a remembered association, a plan, or an intentional choice. The same physical input may fail to enter those processes under masking, inattention, or competition.

The computational claim is not that every local representation disappears when it is unselected. Local processing may continue. Nor must a global broadcast be verbal. An organism can use information flexibly without speaking. A workspace is a proposal about shared availability and coordination.

In software, this looks straightforward. One module identifies an object, another predicts the trajectory, another estimates task relevance, and a central state decides what the agent should do. The difficulty is that ordinary software already shares information. A message bus, database, event queue, or transformer context window can make data available to many processes. Merely adding such a structure does not create consciousness. It may create a more capable program, or a more legible one, or simply a slower one.

To make the idea scientifically useful, specify the causal role of the broadcast. If the visual module detects a hazard but its result is blocked from the central plan, the agent should behave differently than when the result is admitted. If the same information can reach the planner through an uncounted alternate channel, the experiment is invalid. If a matched recurrent system coordinates the same components without a special broadcast, the workspace mechanism may be an optional design rather than a necessary one.

The importance of access lies in its consequences. The content should not merely occupy a buffer. It should be capable of changing subsequent inference, memory, and action, with measured costs for that availability.

There is a tradeoff. Broadcasting everything increases bandwidth and interference. Broadcasting too little can make a sophisticated system blind to a threat understood by one of its parts. A useful access controller needs to choose what deserves shared processing under limited resources. That is an engineering problem with well-established relatives in computer architecture and communication theory. CHORD can learn from them without claiming to have invented selectivity.

## When theories meet measurements

The Cogitate collaboration matters because it forced theoretical commitments into the open. Global neuronal workspace theory and integrated information theory emphasize different mechanisms and make different predictions about neural activity. The collaboration recorded data with multiple measurement approaches and compared preregistered expectations with outcomes.

For global neuronal workspace theory, one expected signature was broad amplification and broadcasting associated with conscious content, often discussed in connection with prefrontal regions. The collaboration found a mix of partly supported and challenged predictions. Some results did not fit the strongest all-or-none or sustained prefrontal expectations. The investigators did not reduce that complexity to a television-style declaration of victory.

For integrated information theory, evidence related to posterior content-specific activity supported one kind of prediction, while the expected maximum of integrated information was not supported as proposed. Again, the result resisted the easiest headline. Readers can inspect the study's extended data tables and the authors' discussion rather than importing a preferred interpretation from either camp.

Why is this so difficult? Because human consciousness is not directly labeled inside the brain. Experimentalists use report, behavior, and carefully controlled stimuli to classify conditions. Theory-defined neural regions can overlap with task-specific processing. Some signals may reflect attention, decision, or motor preparation. Multivariate decoding can discover information without establishing its causal use. Each theory also contains versions that are harder or easier to falsify.

An adversarial collaboration does not remove those problems. It makes them harder to ignore. It asks experts to agree on measurable consequences before seeing the results and then live with the ambiguity of actual data.

The lesson carries into artificial systems. Before testing CHORD, its defenders and skeptics should agree on which tasks require global access, which outcomes count as selective failure, which controls receive equal information, and how uncertainty will be reported. If a negative result produces a new diagram in which the supposedly necessary component is redefined to mean something that still succeeds, the experimental program has lost its ability to learn.

## The report is not the percept

An especially persistent problem is the conflation of conscious perception with report about perception. Asking a person whether they saw something adds attention, memory, decision, and response demands. A verbal answer is not merely the endpoint of vision. It is a task performed with information from vision.

Studies using no-report or reduced-report conditions have tried to separate perceptual signals from the machinery of making a report. Their results have complicated a simple prefrontal-marker story, though the interpretation remains debated. A global workspace may support flexible access while not every conscious percept requires the same explicit-report dynamics. Or some signatures attributed to perception may be better understood as task signals. The right conclusion depends on the experiment.

The issue is even more severe in language-capable AI. A model can produce fluent first-person sentences about seeing or feeling. Those sentences may be generated from training statistics and task context, without any independently demonstrated subjective referent. Conversely, absence of a verbal claim says little about a system's internal information processing. If a consciousness assessment relies mainly on self-report from a language model, it has imported a fragile human measurement strategy into a setting where the report mechanism is specifically optimized to produce plausible language.

CHORD therefore separates three observable things: the presence of a local representation, its causal availability to a persistent workspace, and an explicit report generated on request. The architecture can be tested without asking it to claim a private mental state. A report may be one downstream behavior, but it is not the ground-truth label for consciousness.

This separation also prevents a familiar engineering mistake. A model may contain a representation in a hidden layer that an external probe can decode, yet the model's normal inference path never uses it for the relevant task. A probe result is evidence about representational capacity. A controlled intervention showing the representation changes the decision is stronger evidence about causal access. A report generator can confound both by producing answers from indirect correlations.

We should value the intervention more than the declaration. If blocking a selected information path changes a later action in the predicted way, the path matters to the computation. If the model continues unchanged, the path may be redundant, bypassed, or irrelevant. That is the sort of result a theory can survive honestly.

## Shared access is not free

A central workspace creates a bandwidth problem. Suppose a camera sends high-dimensional feature maps, a microphone sends an audio stream, a force sensor reports contact, and a planner maintains a long record of intended actions. Broadcasting every local state to every component would be costly. It could also make the system unstable as competing updates arrive faster than they can be reconciled.

An access policy selects content. But a policy based only on novelty is easily misled. Noise is often novel. An environmental disturbance may produce a large surprise without being useful. An important slow change may produce little momentary surprise. A reliability-aware controller has to estimate whether a signal deserves trust, how it changes an existing belief, and what might be lost by delaying it.

This is an engineering mechanism, not an inference that the brain literally implements the same software policy. It can be evaluated against standard event-triggered estimators, Bayesian filters, and learned communication policies. Any TACH-specific benefit must survive those comparisons.

One can imagine a benchmark in which two sensors monitor a changing environment. A central controller has enough bandwidth to receive only occasional full samples from the second sensor. It may receive a smaller alert indicating relevance. An event-triggered policy that selects more informative moments can outperform a fixed periodic sampler. That is a useful result. Yet it could be explained entirely by access to more relevant evidence. The experiment must not call it an intrinsic phase advantage unless the actual samples and compute are conserved.

We will see that exact problem in the TACH-5 study. The result was informative, but it illustrated classical selective sensing more clearly than a new theory of consciousness.

A genuinely global workspace experiment would go further. It would require information selected from one local module to alter a task performed by another, preserve a relevant belief during a period of missing input, and change a future action under novel conditions. The control model would receive equivalent information and computation, so that the question becomes whether the organization of access adds something beyond ordinary recurrence.

The difference between shared *storage* and shared *use* matters. A central database can contain the correct answer while the agent ignores it. A broadcast can arrive too late to affect a decision. A representation may be globally available in principle but not selected by any downstream process. Measuring causal use is harder than counting messages, and more relevant to the architecture.

## The challenge from simpler systems

A sophisticated theory often spends its time arguing against its most dramatic philosophical rival. The more dangerous competitor may be a less glamorous engineering model.

A Bayesian state estimator maintains a distribution over hidden causes and updates that distribution as observations arrive. A recurrent neural network learns a transition from past state and current input to new state. A transformer with memory can integrate signals across a context. A decision-theoretic controller can choose what to observe and when. None requires a dedicated global workspace named after consciousness.

If one of these achieves the same behavior with the same evidence and resources, it has explained the benchmark without the special mechanism. It might still be interesting to implement the workspace for interpretability, modularity, or fault isolation. But that is a different claim. Architecture can be useful without being biologically necessary or phenomenal.

The strongest test of a workspace is not whether it beats a feedforward network starved of memory. It is whether its selective global availability offers an advantage under capacity and information constraints that a capable nonrhythmic recurrent control cannot reproduce. The experiment must also record the cost: communication, memory, latency, training exposure, and failures under distribution shift.

Sometimes the advantage may be in debuggability rather than raw accuracy. An explicit workspace can provide a trace of which information became available and when. That trace can support safety audits or causal diagnosis. But a legible log is not consciousness. We should call it a legible log and appreciate its value.

The design can also become worse through excessive centralization. Local systems may require fast reflexes that should not wait for a global decision. A motor safety circuit may need to stop a movement before a high-level workspace has finished resolving an ambiguous object identity. An architecture that makes every useful action depend on global promotion would fail at ordinary embodied intelligence. Separate local autonomy and global coordination are more plausible.

This is why CHORD treats local processing as ongoing and access as selective, not as the only location where computation occurs. The architecture has to allow some decisions to remain local, some to be coordinated, and some to be postponed until the consequences of action can be considered.

## The experiment that makes a broadcast visible
A shared workspace can be simulated in many ways, but a fair test needs an outcome that depends on transferring information across specialized processes. Simply giving the workspace a classification target and showing that it learns the target does not establish the value of broadcasting. The task must make the communication bottleneck matter.

Consider a small system with a visual module and an action planner. The visual module identifies objects, while the planner maintains a map and a goal. The planner initially needs only the location of a target. Later, a new instruction requires its identity. The local module has retained information about the object, but the shared channel has limited capacity. The access controller must decide when to send the identity representation.

The main test would compare a selected broadcast against three alternatives. A full-sharing system transmits every local state and serves as a high-bandwidth reference, not a matched control. A restricted generic recurrent system receives the same communication budget without a named workspace. A targeted messaging system sends information directly to the process that currently needs it. If the global workspace performs no better than the targeted system, its universal broadcast may be unnecessary.

This comparison reveals an often ignored difference between information being globally available and information being useful to many processes. A full broadcast may be convenient when several tasks suddenly need the same fact, but wasteful when only one task needs it. A targeted message can be efficient but may fail when the future consumer of the information is unknown. The benchmark should include both situations.

A more demanding condition changes the task after the initial observation. The object identity, previously irrelevant to the planner, becomes critical. The model cannot retroactively obtain a lost observation; it must either have preserved the information locally or spent bandwidth earlier to protect against future demands. This creates a genuine allocation problem under uncertainty.

One might predict that a persistent workspace with selective access has an advantage when future task requirements change unpredictably, because content already admitted can be reused across processes. But a capable local memory and an efficient messaging system might match it. The experiment should allow that result and record the costs of each solution.

The most useful measure is successful transfer to an unanticipated downstream task, not the number of hidden units activated during a broadcast. A large activity pattern is not evidence of global availability if no other process can use it.

### The report can consume the workspace

In human experiments, the demand to report an experience changes what the brain must do. A participant must maintain a decision long enough to express it, select a response, and coordinate motor or language output. These operations can overlap with the neural signals that a theory associates with conscious access.

An analogous problem arises in artificial systems when a model is evaluated entirely through text. If its only task is to describe what it has seen, the reporting process may dominate its architecture. The system can learn to map inputs to verbal labels without maintaining a durable representation useful for action.

To separate the functions, the benchmark should sometimes request explicit report and sometimes test the same information through a nonverbal action. The response mode should be revealed late enough that the model cannot simply use a different early encoder for each case. If an architecture preserves information across both modes, it has shown a stronger form of flexible availability.

There is an additional complication: a nonverbal action can also require decision and response preparation. Removing language does not remove every reporting demand. Human no-report paradigms often substitute indirect physiological or behavioral indicators, and those indicators have their own validation problems. Software provides direct access to internal states but still requires a clear account of what downstream use means.

A good experimental report therefore includes task definitions, response deadlines, and the information available to the readout. It distinguishes local decodability from actual downstream influence. A neural probe trained outside the agent may find information that the agent's policy never uses. That result is relevant to representational capacity, not automatically to global access.

### The adversarial collaborator

The Cogitate Consortium's importance extends beyond its specific findings. It demonstrated a process in which competing theoretical commitments could be translated into agreed predictions before the data were examined. The purpose was not to eliminate interpretation; it was to make disagreement accountable to evidence.

CHORD would benefit from an analogous arrangement. A supporter of the architecture should identify tasks where a persistent causal workspace is predicted to outperform generic recurrence. A skeptic should help design controls most likely to erase the advantage. Both should agree on information budgets, data partitions, and success thresholds before results are available.

For example, the supporter might predict that a temporary interruption of global access will spare local object detection but impair delayed cross-task transfer. The skeptic might predict that a matched recurrent buffer will preserve the same content without a dedicated gate. The decisive experiment trains both, then introduces the interruption on held-out tasks.

A meaningful outcome is not a count of which side won more metrics. It is a narrower causal conclusion. Perhaps the workspace helps transfer information under low bandwidth but not under full sharing. Perhaps a generic buffer performs equally well unless tasks change unexpectedly. Perhaps local recurrent state is sufficient and the global broadcast adds no benefit. Those outcomes refine the model.

The adversarial setup also helps resist post hoc theory repair. If a hypothesis predicts sustained global access and the data show only transient or task-specific availability, the theory cannot automatically redefine sustained to mean whatever was observed. The revision may be worth making, but it should be labeled as a new hypothesis to test.

This practice turns the global room metaphor into experimental commitments. It gives critics a constructive role and supporters a more credible path to evidence.

### Integration without centralization

A single shared state is one way to coordinate distributed information. A network can also use message passing among local processors, each maintaining partial beliefs and exchanging summaries when needed. Such systems may achieve global consistency without a permanent central repository.

In a robot, for example, the visual tracker may send an updated trajectory directly to the motion planner while also informing the memory module of a stable object identity. The planner and memory need not read the same full representation. A central workspace may simplify coordination, but it may also become a bottleneck or single point of failure.

A proper comparison should measure fault tolerance. What happens when the central workspace is temporarily unavailable? Can local modules continue useful processing? Do their beliefs diverge? When the central channel returns, can the system reconcile the difference without destroying valid local information?

The same questions apply to a distributed design. It may avoid a central failure but pay in duplicate messages or inconsistent state. The better architecture depends on the task, reliability requirements, and communication costs.

The global neuronal workspace literature motivates asking how widespread availability relates to cognition. It does not require an engineer to prefer a centralized bus in every application. A distributed competitor belongs in the experiment precisely because the biological theory has not established a universal software topology.

The room is a metaphor. The wiring, bandwidth, and failure modes are the evidence.

## What the room cannot tell us

The global workspace metaphor may explain why selected information becomes available for flexible report and control. That is an important scientific ambition. It does not by itself answer why the information should be accompanied by experience. A physicalist may regard the gap as one to be closed through better mechanism. A skeptic may think it reflects a conceptual confusion. A dualist may argue that no purely functional description is sufficient. The engineering experiment does not adjudicate those positions.

Its more modest purpose is to locate causal bottlenecks in cognition. Does a selected representation change a shared state? Does that state influence behavior across tasks? Can the system preserve information through interruption without giving every module unlimited access? Does the effect survive matched controls? These are questions with measurable answers.

The Cogitate collaboration is a warning against turning partial evidence into a coronation. Researchers willing to make strong predictions discovered that the data would not behave like a victory speech. That is what makes the collaboration valuable.

If CHORD becomes a useful computational model, it should accept the same discipline. Its workspace must be a component we can disable, retime, or replace. Its predictions must be narrow enough to lose. A result in favor of a simpler system should narrow the theory. A result in favor of selective access should identify the task, budget, and causal path responsible for the gain.

The room, if it exists, matters because information entering it can change what the rest of the system does. That is worth testing. Whether anyone is *in* the room is another question entirely.
