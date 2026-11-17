# 11 — Local Weather, Global Decisions

The first machine in the Temporal Access and Continuity research line did not move through a room, talk to a person, or wonder whether it existed. It processed synthetic signals. Some information was available to a shared channel; other information had to wait. The question was whether selection and persistence could change what the system remembered and predicted.

This was the right place to begin, not because the task was glamorous, but because its failure modes could be inspected. There is little value in calling a complex language model conscious because it describes its thoughts. A small controlled experiment can show what information entered, how it was used, and what happened when access was removed.

The early work, called TACH-0 and then TACH-1, was computational. It did not use animal recordings, prove a consciousness mechanism, or establish a novelty claim against all of signal processing. It implemented simple temporal access policies and measured their effects on synthetic streams. The original laboratory reports and code recorded the assumptions and the limitations.

A pattern emerged almost immediately: maintaining a useful state across intermittent access can improve a task, but that does not establish that the schedule of access is special. A persistent estimator often explains much of the benefit.

That distinction would become the governing discipline of the project.

## Two streams, one narrow doorway

Imagine two changing processes, A and B. A central system can receive information from one or both, but the available shared channel has limited capacity. A local processor may continuously observe B and carry information about it even when B is not being broadcast to the central controller.

The design allows three questions to be separated. Can the local processor detect a change? Does the shared channel admit that change? Does the central state retain it long enough to influence a later decision?

These are distinct operations, but a naive architecture can make them look like one. If the entire input is sent everywhere on every step, the access gate is a decorative component. If the central system has no persistent state, a missed observation becomes an immediate catastrophe even when an ordinary memory would solve the problem. If the local branch receives privileged labels or hidden state, its apparent sophistication may come from information the comparator never had.

The original TACH-1 implementation explored shared-channel schedules, a persistent readout, and simpler mixtures. In its synthetic test, a periodic shared channel with a learned policy achieved high priority accuracy and suppressed-event recall, while an untagged mixture performed substantially worse. A version with no persistent readout retained good current classification but suffered much larger smoothed-readout error. Two full parallel channels performed best on several measures, unsurprisingly, because they had more content bandwidth.

The exact numbers matter less than their interpretation. The full parallel system had access to more information. Its success could not be used to claim that selective gating was superior. The persistent readout's improvement showed that memory helped in an intermittent-access task. The regular schedule's advantage over a weaker mixture showed something about the implemented communications policy, not the existence of a conscious clock.

One early report put the limitation plainly: a simulated gate that changes what information reaches a readout does not demonstrate the neural process of conscious access. That sentence is the beginning of a useful research culture.

## The seduction of a good graph

Small simulations can produce very clean plots. A target signal changes, the gate opens, the central estimate updates, and the error falls. The graph is satisfying because the intended mechanism appears to be visible.

But graphs can show the consequence of an implementation choice without proving it was necessary. If the central estimator has no other access to the relevant information, turning on its only input will obviously improve performance. If the competitor has no persistent state, a persistent controller will obviously remember more. These demonstrations validate code behavior. They do not isolate a novel computational principle.

To learn something stronger, the model needs a competitor capable of solving the same problem under the same constraints. A Bayesian filter may infer a changing hidden state from sparse observations without a rhythm. A recurrent network may carry memory across missed samples. An event-triggered scheduler may allocate observations based on expected information value. These are serious alternatives to a named temporal access mechanism.

The lesson is not that simple simulations are pointless. They are indispensable for finding errors and clarifying definitions. The mistake is to promote an implementation demonstration into a claim about consciousness without the intermediate work.

The early TACH reports were explicit that there was no objective consciousness measure in the simulations. The state-estimation tasks had numerical targets. A successful result meant the program predicted a synthetic variable or retained a suppressed event. It did not mean the program experienced the variable or the event.

The naming problem is worth dwelling on. Calling a stream suppressed is harmless if suppression means restricted availability in a defined architecture. Calling it *unconscious* as though the model has a mind is a different claim. One can use terms from the neuroscience literature as inspiration, but the experimental variable needs an operational definition that survives skeptical reading.

## Two loops and an uncertain benefit

TACH-2 separated local perceptual continuity from global access. In the proposed two-loop design, local processors retained recurrent state even when content was not selected for report. A global recurrent controller read selected signals, influenced future local processing, and could generate an explicit output when requested. The model included a controllable input-level regulator for experimental intervention.

This decomposition was conceptually cleaner than a single alternating channel. It also led to a useful negative result. In exploratory training, a bidirectional model with feedback achieved state mean absolute error around 0.411, while a separately trained one-way model achieved around 0.414. Sign accuracy was nearly the same, with the one-way model slightly ahead in the reported values. The tiny difference did not justify a claim that reciprocal feedback was necessary for the task.

Deleting feedback from the already-trained bidirectional model made its error worse. That result showed the trained model had come to use feedback. It did not show that an equally trained model without feedback could not solve the task. The distinction between dependency within one trained system and necessity across possible architectures was already visible.

The study also tested delayed feedback and phase-retimed input. Performance changed, but retiming input changed the distribution of information timing. It was not evidence that one special internal phase was essential to consciousness. A model can be sensitive to the timing regime on which it was trained, just as a financial forecast can be sensitive to the sampling frequency of its data.

This was a healthy result. The architecture seemed plausible, but the strongest requirement—reciprocal feedback as indispensable—did not pass a fair comparison. TACH would have to become a theory that could surrender components.

## A local state is not a private experience

The proposed local loop preserves information across interruptions. That sounds intuitively like a continuous internal life. The similarity is useful for posing questions but dangerous for interpreting answers.

A recurrent network has a hidden state by construction. Hidden from an external observer does not mean hidden from a conscious subject; the network is not known to have one. A local representation can persist while the global controller attends elsewhere. That is a computational property. There may be analogous dynamics in brains, but the software property alone has no validated phenomenological implication.

The better question is what the local state can accomplish. Can it recover a feature after an interruption? Can it preserve the identity of an object during occlusion? Can it support a downstream decision when global access is later restored? Does the information survive targeted perturbation of the workspace, or only when a duplicate input path remains open?

A useful local loop must also handle correction. Pure persistence can be pathological. If an object changes, the network must revise the old representation. If the local state is too stable, it may preserve yesterday's hypothesis as today's fact. If it is too volatile, it may forget a hidden cause before the next observation arrives.

These are familiar problems in filtering and memory design. The relevant quantities are uncertainty, change-point detection, update gain, and the cost of forgetting versus overconfidence. CHORD does not gain a new scientific principle by renaming them awareness.

## Access as a budget, not a ritual

The shared-channel experiments suggested that selective access could be useful under bandwidth limits. That is an engineering problem with a long history. Networks schedule packets. Embedded controllers decide when to sample sensors. Distributed systems cache and invalidate information. Robotics systems choose which observations to acquire. A selective-content controller must compete with those established approaches.

The question is not whether gating can help. Of course gating can help when communication is expensive or attention is scarce. The difficult question is whether a particular temporal organization offers a new benefit under fair controls, especially for tasks requiring flexible use of information after interruption.

A meaningful benchmark therefore counts content bits, communication frequency, local computation, persistent memory, and action latency. A salience signal is itself a communication channel. If the local processor sends a detailed alert, the workspace may infer the hidden content without ever receiving the nominal full sample. The experiment must count that information rather than declare it unavailable.

The early implementations did not always equalize every resource perfectly. Their reports acknowledged the limitations. That is normal in exploratory work. The important discipline is to avoid building a theory on top of an unequal comparison.

The strongest part of TACH-1 and TACH-2 was not any impressive accuracy number. It was the growing ability to say exactly which information path mattered, which control was weak, and which inference was not justified.

## From estimation to action

A system that predicts a hidden number may be useful but remains distant from the richer idea of a conscious-thinking agent. The next stage had to move into causal agency: a system that acts, predicts what should happen, observes what did happen, and updates its belief about its influence on the world.

That step matters because continuity is not merely remembering earlier inputs. The past carries obligations. A motor command creates an expectation. A decision creates a plan. A failed outcome may require a revision of the system's model of itself and the environment.

A model can maintain a perfectly consistent representation while being wrong about causation. A sensor can detect an unexpected event without knowing whether the event resulted from the agent's own action. A controller that cannot distinguish the two will make poor choices under disturbances, delays, and failures.

The next experiment therefore needed hidden actuator states, unexpected omissions, and counterfactual interventions. It also needed a way to measure whether the model learned causal effects rather than simple correlations between actions and observations.

This is where the research began to move away from a clock and toward a world model.

## Reconstructing a result without changing it
A research program with several iterations has a problem familiar to software engineers: the latest version can quietly overwrite the meaning of an earlier result. A new model may improve performance, but the previous benchmark may have changed. A graph may be regenerated with a revised random seed. A bug fix may alter data generation. The final story can become smoother than the actual history.

The TACH laboratory's useful feature was its retention of code, raw results, and limitations across versions. When the TACH-6 archive was recovered, the earlier TACH-5 summaries could be reproduced from the retained code. The execution report recorded that the complete summary values matched the archived JSON outputs. This was a software reproducibility check, not an independent scientific replication, but it protected against one common source of confusion: the historical result was not silently replaced by a revised calculation.

There is a distinction between rerunning the same code and reproducing a scientific finding independently. Rerunning code under the same conditions can establish that the implementation behaves as recorded. Independent replication would require new data, potentially a new implementation, and researchers who did not tune the model to the original outcome. A self-contained synthetic simulator makes technical reproducibility easier, but not biological generalization.

For a public manuscript, the distinction matters because numbers can gain authority through repetition. A model's error score may appear in a research memo, a slide deck, a blog post, and a book. If all four derive from the same simulated run, they are not four pieces of independent evidence. A source ledger should record the shared origin.

The temptation to present iterations as continuous progress is equally strong. TACH-0 and TACH-1 demonstrated basic gating behavior. TACH-2 added recurrent structure and a feedback comparison. TACH-3 and TACH-4 introduced causal agency tasks. TACH-5 focused on selective content promotion. TACH-6 tested dynamic code remapping. These were related experiments but not a single benchmark with one steadily improving score.

A fair historical account identifies the question asked at each stage. Otherwise, a later result on a different task can be misrepresented as a stronger version of the same discovery.

### The little model with too many labels

One difficulty with early synthetic systems is that they can be described using psychological language more easily than they can be validated with psychological evidence. A stream is called suppressed. A controller is called global. A latent estimate is called a belief. A learned state is called memory. These names are sometimes helpful abstractions. They become misleading when readers infer subjective properties from them.

Consider the word memory. A recurrent network maintains a numerical state that depends on earlier input. That can be called a form of memory in the computational sense. But it does not imply autobiographical recollection, personal identity, or the experience of remembering. A filter maintains a belief distribution over hidden variables; it does not necessarily believe in the human psychological sense.

The right solution is not to ban these words. It is to define the operational level at which they are used and keep the inference within that level. A persistent state can support delayed prediction. A global message can change a downstream task. A suppressed input can be unavailable to a specified readout. The experiment measures those effects.

This discipline is especially valuable when the architecture is inspired by consciousness research. It permits meaningful comparisons without turning technical terms into philosophical verdicts. One can investigate whether access policies improve cognition while remaining uncertain about how cognition relates to experience.

The first TACH studies were valuable partly because their simplicity made the labels easy to interrogate. If the proposed mechanism is a gate whose openings are recorded, one can ask what it transmits. If the state is persistent, one can erase it and measure the effect. If feedback is claimed to matter, one can remove it and retrain a comparator.

The system does not need to narrate its own mental life. The investigator has direct access to the variables that define the experiment.

### The alternative that survives training

The TACH-2 one-way versus two-way comparison deserves more attention than its small numerical difference suggests. In the frozen bidirectional network, deleting feedback worsened the result. That is evidence of dependence within the trained system. Yet the separately trained one-way architecture nearly matched the intact bidirectional model.

This illustrates a general property of learned systems. Training adapts a network to the pathways available. A model may distribute information across a recurrent feedback loop because the optimizer finds that route useful. Removing the route after training creates an unfamiliar internal condition, so performance deteriorates. That does not mean the route was necessary for the task in every possible architecture.

A useful control is therefore not merely an ablation. It is a retrained rival that never had the component. The distinction can be extended to access gates, memory buffers, and timing controllers. A trained model may rely on a periodic schedule because it learned to coordinate its state with that schedule. An irregular model trained from the start might perform just as well.

Another control holds the output bandwidth fixed while substituting a simpler component. If a fancy recurrent feedback module can be replaced with a fixed linear predictor at equal cost, the original design has not demonstrated a special capability. It may still be easier to train or more interpretable, which is a separate question.

The TACH-2 result did not prove one-way recurrence always suffices. It weakened a necessity claim under a specific synthetic task and training budget. That is an important form of knowledge because it prevents a proposed architecture from accreting components simply because they look biologically plausible.

### When a baseline makes the graph less beautiful

A robust benchmark should include alternatives that may make the proposed model look ordinary. A Kalman filter is appropriate for some linear hidden-state tasks. A particle filter can handle multimodal uncertainty. A learned recurrent model can represent nonlinear dynamics. A simple periodic observer may be surprisingly reliable when event-triggered novelty policies are fooled by noise.

Each comparator answers a different question. Does the architecture improve estimation relative to an appropriate analytical method? Does it add value beyond generic memory? Does its timing policy allocate information better than ordinary scheduling? Does its causal model outperform direct correlation under interventions?

A single weak baseline cannot answer all of these. Nor is every control equally appropriate for every task. A Kalman filter should not be expected to perform open-ended language reasoning without a meaningful state-space formulation. A transformer should not be judged on a tiny linear task without accounting for its excessive capacity. Comparisons should be chosen for the claim at issue.

An honest result may reveal that the proposed mechanism is useful only in a narrow resource regime. A local recurrent processor might help when global communication is expensive but not when all information is cheaply available. A persistent workspace might be worthwhile for tasks with delayed context changes, not for immediate classification. Such conditional findings are more useful than grand claims of universal superiority.

The book's purpose is to preserve these distinctions as the architecture grows. The earliest TACH simulations did not solve consciousness. They taught the research how to ask for a fair comparison.

A small model with a visible gate may be less impressive than a large language model describing a dream, but its behavior can be tested with far fewer assumptions. That is why the research began there.

## What the small systems taught

TACH-0 through TACH-2 were exploratory software experiments. They showed that selection and persistence could be implemented and measured. They suggested benefits of retaining state under intermittent access, and they exposed the fact that a separately trained one-way recurrent control could match a two-way model on an early task.

The work did not establish neural equivalence, an unprecedented algorithm, or subjective machine consciousness. It made the theory more falsifiable.

For a public book, this is a better origin story than a mysterious frequency. A set of simple programs exposed how easily a researcher can confuse memory with access, sampling with phase, and a model's use of a component with the component's necessity. The subsequent architecture inherits those warnings.

The small system does not know whether it exists. It has a state, a gate, a task, and errors. Its value is that the errors can be counted.
