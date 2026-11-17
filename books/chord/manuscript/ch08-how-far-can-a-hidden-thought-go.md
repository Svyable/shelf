# 8 — How Far Can a Hidden Thought Go?

A masked stimulus can influence a decision without becoming something the subject reports seeing. That observation has inspired some of the most provocative claims in consciousness research. If a hidden image can affect a simple response, might it also support reasoning? Can information inaccessible to report be combined with context, manipulated logically, and used to draw conclusions?

The question sounds metaphysical. It can be tested behaviorally.

On October 26, 2026, a paper in *Neuroscience of Consciousness* asked how far the influence of unconsciously perceived stimuli extends as decision demands grow. [*Is it possible to make unconscious inferences? The limits of the influence of unconsciously perceived stimuli on conscious decisions*](https://doi.org/10.1093/nc/niag068), by Remiszewski and colleagues, used sandwich masking while holding stimulus-presentation parameters constant across conditions. Participants performed tasks with increasing requirements: simple decisions, context-dependent decisions, and more complex logical inference. Performance was above chance in simpler conditions but did not show comparably reliable success on the most complex inference condition.

This is a useful kind of negative result. It does not prove that unconscious reasoning is impossible in every paradigm. It shows a limit under a defined set of masking conditions and tasks. The constant presentation conditions reduce one obvious alternative—that the more difficult tasks simply received weaker sensory input. But the cognitive demands also differ, so the observed decline can reflect several constraints besides a strict boundary between conscious and unconscious thought.

The engineering temptation is immediate: put one processor behind an access gate, let it do simple classification, and claim that complicated inference requires the global workspace. That claim is more specific than the paper warrants. It must be earned by an artificial experiment with the same information and appropriate controls.

## The mask and its limits

Visual masking works by presenting a stimulus so briefly, or in such a temporal context, that it becomes difficult to report. A mask appears before, after, or around the target, altering its perceptual availability. Different masking techniques have different mechanisms and effects. The underlying stimulus may still influence later behavior, sometimes in subtle ways.

An experimenter can compare the observer's ability to say which stimulus was present with the stimulus's effect on a later decision. This separation has produced a literature on unconscious priming and nonconscious processing. A masked cue may bias a response even when its identity is poorly reported.

The phrase *unconscious perception* needs careful handling. Awareness tests are imperfect. A participant who performs at chance on one explicit report task may retain partial information detectable by a more sensitive measure. A subject may have fleeting experience but no stable memory for later report. A strict claim of absent subjective experience would exceed what the task can verify. Researchers use behavioral criteria to operationalize the condition.

Even with those limits, masking is informative. It creates conditions under which information can be processed without robust explicit access. If an architecture claims that global access is necessary for flexible integration, masked-information tasks should pressure that claim. The relevant question becomes what sort of integration remains possible when reportable access is restricted.

A well-designed artificial analogue would not merely delete the input from a module. It would preserve some local representation while limiting which parts of that representation reach a shared controller. Then it would ask the system to solve tasks of increasing complexity. If local processing succeeds on simple decisions but struggles with cross-context inference, the effect may resemble a functional boundary studied in humans. Yet the resemblance alone is not a consciousness indicator.

## Complexity is not one dimension

It would be convenient to arrange tasks from simple to complex on a single scale and declare a threshold beyond which awareness is necessary. Actual tasks resist that neat ranking. A logical rule may be difficult for one system and trivial for another. A long sequence may be hard because of working-memory limits, not because it requires a special form of conscious access. A seemingly simple perceptual discrimination may become demanding under noise or interference.

The Remiszewski study varied the operations needed to reach a decision while keeping the masked-stimulus presentation constant. Simple decisions involved the masked information directly. Intermediate conditions required integration with consciously available context. Complex conditions additionally involved logical inference. The study reported a graded limit to the influence of masked information.

The result invites a hypothesis about information accessibility rather than a simple complexity threshold. Perhaps locally represented data can bias a response but cannot be flexibly combined with a changing context when global access is restricted. Perhaps the mechanism involves working-memory maintenance or the ability to compare several relations. Perhaps a local pathway could perform more elaborate computation if trained on the relevant operation. Those alternatives are exactly what an artificial test can separate.

To do that, hold the informational content fixed while changing where the required operation occurs. Give one model a local processor that can see the masked channel but cannot broadcast full content. Give another a shared workspace that receives the same content under a controlled access policy. Give a generic recurrent model equal state and compute, and a Bayesian or symbolic baseline when appropriate. Train all of them on the same task families.

A useful primary endpoint is not the number of rules applied. It is transfer to held-out combinations of rules, contexts, and inputs. A network can memorize a small table of logical transformations and appear to reason without flexibly integrating new relations. Held-out combinations test whether the architecture can recombine information rather than recall a familiar answer.

The result should be measured alongside latency and bandwidth. A globally integrated model may perform better because it has been granted more communication. That can be a useful system design, but it does not prove anything special about conscious reasoning. The value of the experiment lies in explaining which kind of access helps under which constraints.

## What a suppressed representation can still accomplish

An agent can retain local information without making it globally available. Imagine a vision module that identifies an object behind a partially closed door. The central controller is occupied with navigation and has not admitted the object identity to its workspace. The local module may still update a tracker, compare features across frames, and predict movement. Those operations need not require an explicit report or central arbitration.

Suppose a later task asks whether the object is likely to block the planned route. The answer now depends on combining local identity with the central navigation context. If the information remains suppressed from the workspace, the system may fail to connect the two. The failure is a communication boundary. A local controller with access to the relevant route information might solve it, and an architecture with greater local state might solve it differently.

The question is therefore not how intelligent an unconscious module can be in the abstract. It is what tasks its information and computation budget permit. In a large artificial system, local modules may perform substantial reasoning. The fact that their results are not broadcast at every moment does not make them the equivalent of human unconscious thoughts.

This matters because machine architectures often create boundaries for cost and safety reasons. A private memory can hold information inaccessible to a particular agent. A specialized tool can compute a result that the language model sees only through a concise summary. A vision encoder can retain features that the planning module never receives. These are engineering examples of restricted access, not evidence of phenomenal suppression.

Still, the same conceptual distinction helps formulate tests. If a globally available representation supports more flexible recombination than a locally restricted one, that is a measurable effect. If the local system catches up when given equal compute and the necessary context, the apparent boundary was informational rather than intrinsically cognitive.

CHORD should count that distinction as a victory for explanation, not a failure to produce dramatic consciousness language.

## A hierarchy that can be falsified

A practical experiment can define a task ladder without assuming that the highest rung is necessarily conscious. At the bottom is local detection of a feature. Next comes selection between two local alternatives. Then integration with one external context variable. Then conjunction of multiple context variables. Finally the system must handle novel rule combinations and counterfactual questions about what would have changed under a different observation.

All models receive the same input sequence. The difference lies in controlled accessibility and internal architecture. We measure not just correctness, but whether the evidence was locally decodable, when it became available to the workspace, and how strongly a targeted intervention alters the final decision.

Two comparisons are essential. The first holds model weights fixed and blocks access on selected trials. This asks whether the trained system relies on global access for the chosen task. The second retrains a local-only architecture under equal resources. This asks whether the task actually requires the proposed global mechanism, or whether the first model simply learned to use its available route.

If a local-only recurrent system handles every rung as well as the shared-workspace system, the claim that flexible inference needs global access loses support in that environment. If the shared model wins only on tasks with more available information, the result is about information access. If the shared model wins when information, compute, and learning exposure are matched, we can investigate whether its organization produces an incremental benefit.

The ladder should include adversarial conditions. The relevant context may arrive late. The masked channel may contain a misleading but salient cue. The task rule may change after the first inference. The system may have to revise a previously accepted conclusion. These conditions examine flexibility, not just one-shot classification.

They also make it harder for a model to cheat through correlations. A network trained on a synthetic environment can learn that a particular distractor predicts the correct class. Reverse that correlation at test time and the network may collapse. A good benchmark exposes such dependencies rather than mistaking them for evidence of integrated reasoning.

## The problem with proving a negative

When performance falls to chance in the most complex masked condition, what has been ruled out? A specific form of reliably measurable influence under the chosen exposure, masking, and decision requirements. The result does not rule out every possible nonconscious inference process. Another paradigm may provide stronger information, more training, different task demands, or a different measure of residual awareness.

Nor does failure prove that successful reasoning must feel like something. A person can consciously reason badly. A machine can reason accurately without any validated evidence of subjective experience. The correlation between reportable awareness and flexible integration in human experiments is one part of a larger scientific debate.

A stronger theory would make predictions across several tasks and sensory domains. It might predict that restrictions on global access selectively impair flexible cross-context transfer, but preserve trained local computations. It might predict that the effect becomes more severe as the task requires longer maintenance of intermediate results. It might predict a particular recovery profile when access is restored.

These predictions can be tested in software. They can also fail in ways that improve the model. Perhaps the relevant factor is not global access but persistent memory. Perhaps ordinary recurrence and attention suffice. Perhaps a simple symbolic planner with restricted inputs performs as well as any elaborate CHORD network. That would be an important result, especially if it reduces complexity.

The task ladder also raises a question about what counts as a representation. A language model may store statistical relations in parameters while having no live sensory state for the current world. A working-memory buffer may hold an explicit fact even if the model cannot use it correctly. A sensory encoder may preserve details in a latent vector that an external classifier can recover. These are different forms of informational availability. An access theory must say which are under test.

## A failure that changes its explanation
A model can fail to combine masked information with context for several reasons. It may have little usable information about the masked stimulus. It may retain a local representation that cannot reach the task solver. It may receive the information but lack sufficient working memory to combine it with the context. Or the final response rule may be too difficult for the model to learn.

These explanations make different predictions. If the local encoder never recovers the stimulus above chance, increasing global access will not reliably solve the problem. If the local encoder contains usable information but the planner cannot receive it, improving the communication path may help. If the information reaches the planner but is overwritten before the inference is complete, memory or recurrent integration may be the limiting factor. If a symbolic planner solves the same inference given the necessary facts, the issue may lie in the learned model's training rather than in the abstract complexity of the task.

A convincing CHORD experiment should distinguish these stages instead of reporting only final accuracy. Record local decodability, shared-state accessibility, intermediate inference accuracy, and the outcome of the eventual action. Each metric should be measured on held-out trials and interpreted according to its causal role.

Consider a task with two visual symbols. The first is briefly masked and available only to a local branch. The second is clear and globally available. A rule specifies how their combination determines a later action. If the agent chooses correctly, we know it somehow used the relevant information. We do not know whether a dedicated global broadcast was necessary. A local processor might have computed the combined answer, perhaps after receiving the second symbol through another path.

To isolate access, hold the rule and content constant while varying which process can see which fact. Give a matched local-only network all required context as a control. Give another an explicit broadcast channel, and a third an ordinary recurrent memory with equal bandwidth. If the global workspace wins only when the competitors are denied required facts, the result is about information availability, not unique integration.

If it wins when all have the necessary facts and resources, the organization of computation becomes a more plausible explanation. That is the result worth seeking.

### How awareness tests become circular

In a human masking experiment, awareness is often estimated through an objective discrimination test. If participants cannot identify the masked stimulus above chance, researchers may operationally classify the condition as unseen. But the validity of that inference depends on measurement sensitivity, trial count, response criteria, and how the discrimination task relates to the main task.

Suppose a participant has weak but real information about a stimulus that a short awareness test fails to detect. A later decision may show a small above-chance influence. It would be tempting to call that influence evidence of sophisticated unconscious computation. Yet the premise of complete unawareness may be less secure than the headline suggests.

Conversely, a person can have a brief or vague experience without retaining the information long enough to give the requested report. A failure of later identification may reflect memory or response limitations. The experiment needs careful controls and modest language.

Artificial systems do not have a validated ground-truth label for phenomenal awareness. Declaring a representation unconscious because its global pathway is blocked would build the conclusion into the architecture. The defensible term is access restricted, locally represented, or unavailable to the specified readout.

This vocabulary may seem dry. It is a protection against circular reasoning. A researcher should not define consciousness as broadcast and then conclude that a network is conscious because it broadcasts. A theory of access can show which computations benefit from sharing. A theory of experience requires additional premises and evidence.

The distinction matters especially when published findings are used as architectural recommendations. The Remiszewski paper suggests a graded boundary for the influence of masked information in human decisions under its conditions. It does not authorize a universal software rule stating that logical inference is impossible unless a global consciousness module is active.

### A transfer test that cannot be memorized

A common weakness of synthetic inference tasks is that the network can learn shortcuts. If the answer depends on one of a small number of familiar symbol combinations, a model can memorize the table without performing a flexible compositional operation. Even when a new rule is introduced, correlations in the training distribution may reveal the answer.

A stronger benchmark uses held-out combinations of symbols, rules, and contexts. The model must apply familiar operations to combinations it has not seen. For example, it may learn equality and inequality relations, then face a new conjunction of these relations across a delayed context cue. The task can also ask a counterfactual question: what would have changed if the masked symbol had been different?

This produces several distinct measures. One tests simple cue influence. Another tests contextual combination. Another tests compositional generalization. A fourth tests counterfactual revision. The same local and global access interventions can be applied at each level.

The evaluator should not assume that later tasks are necessarily more conscious. They are more demanding in particular computational ways. A symbolic rule engine may perform the highest-level task with no recurrent dynamics at all. A neural model may fail because its representation is poorly trained. The result supports conclusions about the compared systems, not a metaphysical threshold.

It is also important to ensure that the model has learned the easy tasks. If all variants are near chance on basic symbol identity, differences in complex inference are difficult to interpret. The benchmark should establish competent baseline perception before claiming an access-related reasoning limit.

### The report that arrives after the answer

One useful test reveals the response requirement late. The agent receives an information stream and continues another task. Only after a delay is it asked either to name a hidden feature, act on it, or use it to solve a new relation. The later demand prevents the model from tailoring every early computation to one fixed answer format.

If a persistent workspace supports unexpected downstream use, it may outperform a system that compresses every observation solely for a known current task. But a local memory with appropriate capacity may accomplish the same thing. The control matters.

The experiment should also distinguish a confident language report from a correct action. A system may produce a polished explanation of a hidden symbol while its chosen action reveals that it lacks the necessary state. The language output is not an authoritative introspection. It is another behavior to score.

For human research, this design echoes the importance of separating perception from report preparation. For software, it is an engineering test of delayed flexible access. The conceptual connection is meaningful, but it does not amount to a machine consciousness measurement.

A useful outcome would identify the smallest information-routing and memory arrangement that supports unexpected downstream tasks under restricted communication. That is a genuine contribution to cognitive architecture even if it leaves every philosophical question open.

The masked image remains a source of evidence with uncertain access, not a private thought whose subjective status has been read from code.

## The price of inviting a thought in

There is a reason to restrict broadcast. Global access can improve flexible integration but also consume bandwidth, introduce interference, and expose private or irrelevant information to modules that do not need it. A system that shares everything may become less stable, less secure, and less efficient.

The ideal controller therefore does not maximize global access indiscriminately. It chooses what information is worth integrating given the current task and the risk of omission. A masked-information experiment can be read as a boundary test for that policy: how much function can remain local before important combinations must be made shared?

The answer is likely conditional. A familiar local detector may need no global promotion. A novel counterfactual plan may require coordinated access to evidence from several modules. A safety-critical reflex may bypass the slow workspace altogether. Different tasks make different demands.

There is no reason to attach an experiential label to every point on that continuum. We can describe the computational advantage of flexible access with precision and leave the phenomenological question open.

The Remiszewski paper supplies an experimentally grounded reason to test a graded task hierarchy. It is peer reviewed and recent. Its findings are relevant to access models; they are not a verdict on what an unconscious brain or an artificial network can reason about in all possible circumstances.

The practical CHORD consequence is narrower: build tests in which local processing and global sharing are separated, then increase the demands for cross-context recombination. If the advantage survives matched controls and held-out rule combinations, keep the mechanism. If it does not, use the simpler system.

It is possible for information to be hidden from report while still affecting behavior. The interesting question is how far the effect travels, what it costs, and what has to be shared before a system can change its mind.
