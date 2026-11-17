# 7 — Two Kinds of Permission

A person can be awake enough to react but fail to attend to a particular place. Another can be drowsy and slow across an entire task while still showing some spatial selectivity. These are different kinds of failure, and the thalamus offers one reason not to collapse them into a single gate.

On October 26, 2026, Amber R. Hopkins and colleagues published [*Targeting central thalamus with transcranial ultrasound reduces arousal in healthy volunteers*](https://doi.org/10.1038/s42003-026-10637-7) in *Communications Biology*. In a counterbalanced within-subjects study, 27 healthy volunteers performed vigilance and visuospatial-attention tasks before and after sham, central-thalamic, and pulvinar stimulation. Targeting the central thalamus was associated with slower vigilance responses and more lapses. Targeting the pulvinar produced more spatially selective impairments, particularly for contralateral visual information.

The work is meaningful because the researchers perturbed distinct but nearby deep-brain targets in human volunteers. It gives causal evidence about the targeted circuits' contribution to arousal and attention as measured by behavior. It does not directly manipulate the presence or absence of subjective consciousness, and it does not prove that consciousness can be switched on or off by a software equivalent of either thalamic region.

Still, it forces a useful revision to any crude access architecture. The system's general readiness to process information is not the same variable as the identity or location of the information selected.

## Awake enough is a different question

A vigilance task asks whether someone can sustain responsiveness over time. Slow reactions and missed responses can indicate reduced arousal or attention, though the interpretation depends on the specific task and controls. A visuospatial-attention task asks a different question: does the subject preferentially process information at a particular location?

Hopkins and colleagues separated these operations using low-intensity focused transcranial ultrasound stimulation. The central thalamus and pulvinar are nearby structures but participate in different networks. The central thalamus has been implicated in arousal regulation. The pulvinar is associated with visual processing and attention, including coordination among cortical regions.

The researchers used MRI-based anatomical targeting, a sham condition, counterbalanced sessions, and tasks intended to distinguish broad vigilance from spatial selection. Following central-thalamic sonication, participants were slower and had more lapses on the vigilance task. Following pulvinar sonication, performance was more selectively impaired for visual targets and cues on the contralateral side of space.

Some contrasts were stronger than others, as the paper's detailed statistics show. A scientifically responsible account does not take every numerical difference as a confirmed effect. The study is also limited in sample composition and the spatial precision that focused ultrasound can achieve in practice. The intervention is noninvasive, which is an advantage, but the actual mechanisms of stimulation and the full extent of affected tissue remain areas for careful inference.

These limitations do not erase the key result. Distinct target regions produced distinguishable behavioral patterns. A broad arousal alteration and a content-selective attention alteration are experimentally separable.

For CHORD, that suggests two independently controllable state variables. One regulates global availability or readiness: whether the system can respond, update, and sustain processing at the required level. The other regulates which local information is eligible to enter a shared decision process. A system may be fully ready but select the wrong source. It may select the right source while being too impaired or resource-constrained to integrate it effectively.

This decomposition is an engineering analogy. It does not claim that two artificial scalar controls reproduce the human thalamus. The biological evidence recommends separating functions; it does not prescribe a software implementation.

## The trouble with one dial

A single attention score appears attractive in a model. Increase it and the system becomes responsive; decrease it and the system ignores information. But what exactly is being changed? Does the dial increase overall computational gain, alter which input stream is selected, or extend the duration of processing? If it does all three, experiments become nearly uninterpretable.

Suppose an agent monitors a door and a moving object. It fails to respond when the door opens. We could increase a global attention weight and see an improvement. That is compatible with several explanations: the model may have sampled the door more frequently, given its features more bandwidth, retained them longer, or used more compute overall. The result does not isolate a selection mechanism.

A better design holds one variable fixed while changing the other. In a readiness perturbation, reduce the workspace's general capacity to update or act without changing which stream the selector prefers. The prediction is a broad decline across multiple tasks, subject to controls for total compute. In a selection perturbation, redirect or suppress the chosen stream while preserving overall processing readiness. The prediction is a content-specific failure with unrelated functions spared.

To make this experiment fair, the comparator needs the same capacity and access to sensory evidence. A generic recurrent model may learn to modulate gain and attention without named controllers. That model should be allowed to compete. A CHORD-specific controller earns its place if the separation improves robustness, interpretability, or causal control under the same budget.

The interesting outcomes are differential. If a readiness intervention produces the same content-specific deficit as a selection intervention, the proposed separation may not be functional. If the selector has no effect once the generic recurrent model is retrained, selection may be implemented elsewhere. If a reduction in readiness simply reduces available compute, the result is not evidence for a biologically meaningful global state; it may be ordinary resource starvation.

One can imagine a benchmark in which the agent must detect a rare safety event while performing a continuous classification task. Lowering global readiness should impair both; biasing selection away from the safety channel should preferentially harm safety detection. But the tasks must be designed to expose the dissociation without giving the controller privileged event labels. The agent should infer relevance from signals available causally at the time, as a human or robot would.

## What the thalamus is not

A popular account of the thalamus calls it a relay station. That description contains a truth: much sensory information passes through thalamic nuclei on its way to cortex. But the thalamus is not a passive switchboard. Different nuclei have specialized connections and roles; reciprocal thalamocortical loops participate in attention, sensory processing, sleep, and arousal.

The temptation is to take that complexity and rename the thalamus the seat of consciousness. Doing so would turn a network of structures with varied functions into an imagined central observer. The Hopkins study does not support such a simplification. It manipulated two regions and measured behavioral outcomes consistent with arousal and spatial-attention changes. It did not establish a unique location for experience.

Other evidence links thalamocortical dynamics to levels of consciousness and disorders of consciousness. Those findings matter clinically and theoretically, but they are not interchangeable with the healthy-volunteer ultrasound experiment. A patient who is unresponsive because of severe brain injury is not merely a healthy participant whose attention dial has been turned down. Injury can disrupt many circuits, and diagnosis of residual awareness is difficult. We will return to that problem later.

For a computational system, a thalamus-inspired gate should be treated as a family of information-control policies. It might regulate communication bandwidth, decide which inputs deserve global attention, or preserve readiness across interruptions. Its biological name should not allow it to escape ordinary engineering comparisons.

The most useful correspondence is functional rather than anatomical. A workspace may need a controller that maintains the conditions for broad processing, and another that chooses among competing representations. If a single learned model does both effectively, that is an empirical rival, not a philosophical defeat.

## Separate interventions, separate stories

To test a two-gate architecture, construct a factorial experiment. Give every model the same sensory stream and action space. Independently vary readiness and selection across several levels. Measure not only accuracy but latency, calibration, memory continuity, and the ability to recover after interruption.

A simple two-by-two design gives four conditions: normal readiness with normal selection; reduced readiness with normal selection; normal readiness with redirected selection; and both reduced readiness and redirected selection. The interaction matters. Perhaps selection failures become more severe when readiness is low because a weak workspace cannot recover. Perhaps the effects are additive. Perhaps a capable generic recurrent model learns to compensate for one deficit but not the other.

The interventions should be controlled at the architectural level, not through hidden labels. If readiness is represented by an externally set capacity cap, apply comparable computational restrictions to the controls or distinguish the resource effect from the proposed state effect. If selection is driven by a learned score, randomize which input stream contains the relevant evidence, including held-out combinations of cues and noise.

One particularly good falsification test supplies irrelevant but highly salient noise. A selector based only on surprise may chase it, while a reliability-aware selector should resist. A global-readiness controller should not prevent the selector from making a mistake; the mechanisms are distinct. If CHORD claims that separating them reduces distractibility, it must outperform a strong baseline under the same information budget.

Another test introduces a momentary loss of readiness followed by restoration. Does the workspace recover a coherent world model from preserved local and memory states? Is the recovery better than a generic recurrent model with the same total state? If the answer is no, the explicit readiness mechanism may add complexity without additional function.

These experiments are close enough to ordinary cognitive engineering to be useful independently of consciousness theory. They also generate a better map of what the architecture actually does. A diagram that says *arousal* and *attention* becomes a pair of interventions with distinct measured signatures.

## The danger of biological theater

Scientists and engineers are both susceptible to a certain kind of stagecraft. Put anatomical names on software modules, draw arrows reminiscent of neural circuits, and the architecture begins to look as though it has inherited the credibility of brain research. But the resemblance may be superficial.

A program named PulvinarController is not a pulvinar. A scalar named Arousal does not mean the machine is awake. A counter that increments at fifteen hertz is not a thalamocortical rhythm. If these components improve behavior, report the improvement. If they survive perturbation tests, report the causal dependency. The machine's phenomenological status is still an open question.

This skepticism should not be confused with contempt for biological inspiration. Engineers routinely study natural solutions, then abstract them into designs that exploit different materials. Wings do not need to flap like birds to generate lift. A software access controller may borrow the principle of separating selection from readiness without copying individual nuclei.

The analogy becomes stronger when it guides a discriminating test. Hopkins and colleagues manipulated different thalamic targets and measured differential behavioral outcomes. CHORD can independently manipulate two corresponding functions and ask whether the induced failures likewise dissociate. That is a reasonable computational prediction. It is not a replication of the human study unless neural data and interventions are actually used.

We should also resist the opposite temptation: claiming that because the software dissociation is different from the biological one, the concept is worthless. The engineering question is whether the design solves a real problem. The neuroscience question is whether a specific biological circuit contributes to the corresponding function. The consciousness question is still another layer. Keeping the three questions separate prevents a failure in one from becoming an excuse to rewrite another.

## Arousal is a state, not a task answer
A person who responds slowly during a vigilance task may be sleepy, distracted, fatigued, uncertain, or impaired for another reason. Behavioral performance is informative, but it is not a direct reading of a single biological variable. A scientific claim about arousal therefore depends on experimental controls, repeated measures, and convergence across tasks.

The Hopkins focused-ultrasound study is interesting because it contrasted interventions on distinct thalamic targets under counterbalanced conditions. But the interpretation must remain tied to the measurements. The reported central-thalamic effects were changes in vigilance response speed and lapses. The pulvinar effects concerned visuospatial attention. Neither outcome required the researchers to show a participant had entered or exited subjective consciousness.

This separation is especially important when translating the work into software. An artificial controller can have a variable representing its overall willingness or capacity to update state. That variable might affect computation allocation, response latency, or a threshold for requesting evidence. Calling it arousal is a functional analogy, not a clinical assessment of wakefulness.

A system's broad readiness could also be implemented without an explicit module. A resource manager might reduce the number of recurrent updates under load. An adaptive planner might increase its computational effort when the consequences of error are high. A generic recurrent network might learn both effects through state-dependent gain. All are viable alternatives.

The test should therefore determine whether separating readiness from selection improves control under constraints, not merely whether the two labels can be assigned to different numbers.

### A task that forces the distinction

Consider an agent monitoring several streams: a moving obstacle, a temperature reading, and a periodic instruction signal. It must remain generally responsive while selecting whichever stream is relevant to its current objective. Two kinds of perturbation are introduced independently.

A readiness intervention reduces the number of updates available to the shared controller or changes its general response threshold. The selector is not changed. A selection intervention redirects the controller's attention from the obstacle to the temperature stream while preserving the same total computation and response capacity. The first should have broad effects; the second should have a content-specific effect.

But even that design contains a confound. If reducing readiness simply gives the model fewer computational steps, the broad impairment may be ordinary resource starvation. To make a stronger claim, compare against a generic compute-reduction control with the same number of operations. If the proposed readiness state changes performance beyond what resource loss predicts, the intervention has a more specific functional role.

Similarly, a selector that sends no information from the obstacle stream will obviously harm obstacle decisions. That alone does not justify a special attention mechanism. The experiment must compare selection policies at equal bandwidth, including a strong controller that uses expected value of information. The architecture's advantage might lie in learning a better policy, not in a unique neural analogy.

The factorial design is useful because it exposes interactions. If readiness is low and selection is misdirected, the combined deficit may be larger than either alone. Perhaps a low-readiness system cannot recover from selection errors because it lacks capacity to integrate corrective information. Perhaps a higher-readiness system wastes resources chasing irrelevant signals. Measuring these interactions can improve engineering without implying experience.

### How to tell one failure from another

A system that misses a safety signal offers several possible explanations. It may not have encoded the signal locally. It may have encoded it but selected a different input. It may have selected the right input but failed to process it before the action deadline. It may have updated the world model correctly but chosen a poor action. Each error lies at a different point in the causal chain.

A well-instrumented CHORD benchmark should log the local decoder, selection decision, global state update, and final action. The logging should be independent of the model's own verbal explanations. A language model might confidently explain its failure using a plausible narrative that has no causal connection to its internal process.

The logs allow targeted interventions. If a local hazard representation is correct but never transmitted, a selection perturbation should restore or further suppress the downstream effect. If the representation was transmitted but not integrated, changing readiness or binding computation may matter. If the world model is correct but the action remains wrong, attention is not the main culprit.

A single overall success score would hide these differences. Distinct components deserve distinct failure signatures. If the intervention profiles do not dissociate, the architecture's decomposition may be arbitrary.

The same demand should govern biological analogies. The fact that a thalamic region participates in attention does not imply that every downstream visual error originates there. The brain has many pathways and feedback loops. The best artificial design may use a simpler implementation while preserving the experimentally meaningful distinction.

### A difficult environment for the gate

An easy benchmark makes the relevant stream obvious. A red warning light appears and the model should look at it. A robust selector needs to handle cases where relevance is uncertain and noisy stimuli compete for limited access.

Suppose a rare safety event produces a small, reliable change while an irrelevant sensor generates large unpredictable fluctuations. A novelty-only selector may chase the irrelevant stream. A value-aware selector should consider the expected consequence of missing the safety event, the reliability of the evidence, and the communication cost. The global readiness controller should remain capable of processing the selected information without determining its identity.

Now reverse the reliability regime. The safety sensor becomes noisy, and the previously distracting channel becomes reliable. The model must update its policy without access to true event labels. If the selector continues relying on a learned correlation from training, the apparent ability to prioritize information may collapse.

The test can be extended over longer periods. A system may encounter several minutes of low-value noise followed by a critical event. Does it preserve readiness without exhausting its budget? Does it become habituated to the warning channel and miss the genuine signal? Does it learn to request diagnostic measurements when uncertainty increases?

These are problems familiar in monitoring and safety systems. The neuroscience-inspired separation of readiness and selection provides a useful conceptual organization, but the strongest engineering solutions may draw from control theory and statistical decision-making.

That competition should be explicit. An ordinary adaptive scheduler must have the chance to win.

### What an artificial thalamus would not accomplish

One can imagine putting two large modules into a model, labeling them CentralThalamus and Pulvinar, and connecting them to a workspace. Such a model might perform well on some tasks. The labels would not make it anatomically faithful or conscious.

Biological thalamic nuclei contain complex circuits with varied neurotransmitters, connectivity, and developmental history. Transcranial ultrasound alters activity through physical interactions that are still being investigated. There is no direct one-to-one mapping from these effects to a software scalar. The study does not establish that a positive scalar in a machine corresponds to wakefulness.

The legitimate abstraction is functional: one control system influences broad responsiveness and another influences which information becomes influential. Even that abstraction is subject to empirical challenge. A system may implement both functions with one distributed network. A biological dissociation does not entail a particular digital modularization.

The architecture should retain two named controllers only if the separation yields a useful measurable difference—better generalization, safer interventions, more predictable recovery, or lower cost. If it does not, simplify. That is how a biological finding can inspire software without becoming biological theater.

The value of the Hopkins paper for CHORD lies in the experiment it suggests: independently vary readiness and selection, then predict different failure patterns. The model's subjective status remains outside the measurement.

## Permission without experience

The thalamic study is a consequential result for the experimental roadmap because it suggests an architectural ablation that can be specified precisely. It is not a mandate to install an artificial thalamus as a consciousness organ.

A defensible CHORD model has separate readiness and content-selection variables. It predicts different impairment profiles when either is perturbed. It tests those predictions against matched generic controls and varying task costs. It allows local processing to continue when global access is constrained, and it measures whether information can later be recovered without hidden bandwidth.

If the variables fail to dissociate, or if one controller can be removed without any meaningful loss, the theory should shrink. If the dissociation survives, the result supports a useful decomposition of cognitive control.

Arousal and attention are not subjective experience. They are states and functions whose effects can be measured. Their separation gives us a better experimental handle on access. It also reminds us why the old question—where consciousness lives—was always too small. Several kinds of permission can operate at once, and no single permission switch explains the feeling of being present.

The best architectural change may be a refusal to use one dial for two jobs.
