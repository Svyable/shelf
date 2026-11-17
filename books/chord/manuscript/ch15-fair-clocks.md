# 15 — Fair Clocks

A timing experiment is easiest to win when the model with the most interesting clock is also given the most useful observations.

Imagine two systems shown the same changing scene. One receives images at moments chosen by an adaptive gate. The other receives images on a rigid schedule. Their predictions differ. The adaptive system may be better because it observed an important event that the periodic sampler missed. It would be a mistake to declare that the adaptive system has a superior internal temporal organization. It may simply have acquired better evidence.

This is the central methodological challenge for TACH and CHORD. A theory about temporal access must distinguish the value of *when information is acquired* from the value of *how already acquired information is integrated and made available*. The two questions can be studied together, but they cannot be answered by the same uncontrolled comparison.

The research program already learned this distinction the hard way. TACH-5 showed a gain from reliability-aware event-triggered sampling in a synthetic environment. TACH-6 failed to establish a reliable, causally necessary advantage from a learned representational switch. The next stage must be designed to prevent these results from merging into a self-congratulatory story about rhythmic consciousness.

This chapter is a working manual for making a theory vulnerable to evidence. It does not offer a universal experimental recipe. It identifies the confounds most likely to make CHORD look better than it is, and the controls that would reveal them.

## One input sequence, several internal schedules

The cleanest first experiment starts from a recorded observation sequence. Every architecture sees the same external evidence at the same times. The local processor may perform several recurrent updates per observed frame; the global workspace may admit selected content at chosen moments. A separate condition can vary actual sensor acquisition, but the phase experiment should not.

The distinction sounds obvious and is surprisingly difficult to implement. If a gate opens at time 10 in one model and time 12 in another, and the gate transmits the current sensor reading, the models receive different information. If the world changes between those moments, the difference in behavior might reflect the difference in samples. Calling it a phase effect confuses the access schedule with sensory acquisition.

To isolate internal timing, record the entire observation sequence and use an identical local representation update schedule for all candidates. Then manipulate only the relative timing of an internal transfer or coordination operation while conserving the content transmitted. One option is to queue the same selected representation and deliver it at different internal phases, with a controlled latency budget. Another is to vary the duration of recurrent integration before a fixed content item is made available, while compensating for the extra computation or reporting the resulting resource difference.

The details matter. Delaying a message can change the usefulness of information simply because the action deadline passes. That is a real coordination effect, but not necessarily a rhythm effect. A robust design measures decision deadlines and includes a comparator that chooses an irregular schedule based on expected task cost.

A good primary test asks whether the architecture's specific schedule improves held-out behavior when input content, total state capacity, total compute, and message count are matched. A secondary test can ask whether one schedule spends resources more efficiently when those budgets are allowed to vary.

Do not combine the two and label whichever metric favors the proposed model as the primary outcome.

## The rival should be allowed to win

An architecture built from consciousness research can look sophisticated next to a weak baseline. A feedforward model with no memory will lose tasks requiring memory. A recurrent model with no contextual cue will lose tasks requiring context. A periodic sampler with poor noise handling may lose to an event-triggered gate. Such comparisons can be useful sanity checks, but they are not evidence of unique mechanisms.

The serious competitors are already available in engineering. A Bayesian filter can maintain uncertainty over hidden states and update beliefs as observations arrive. An active-sensing policy can select measurements based on expected information value. A generic recurrent neural network can learn state transitions. A transformer with memory can combine context over many steps. A symbolic or probabilistic planner can reason about action effects.

Each should receive the information needed to perform the task, under a comparable resource budget. Where exact matching is impossible, the experiment should report the mismatch and analyze performance relative to cost. It is dishonest to advertise a unique architectural advantage after comparing a large, heavily trained model with a small, poorly tuned control.

Model selection is another source of privilege. If one architecture receives extensive hyperparameter search and the other receives default settings, a performance gap may be an optimization gap. Repeated experiments on the test set are equally dangerous. The researcher may eventually discover a configuration that works well on those worlds, even when the resulting advantage does not generalize.

The protocol should freeze train, development, and test partitions before model selection. The development data may be used to tune hyperparameters. The final test should remain unseen until the analysis plan is locked. If a failure is found and the task generator must be corrected, as happened with TACH-6's symmetric-noise reversal, the correction should be documented and the evaluation rerun rather than quietly substituted.

One of the strongest contributions a research program can make is to publish its unsuccessful controls. They show what was actually ruled out.

## Usage and necessity

Suppose a trained CHORD model uses a feedback pathway to maintain a belief about an object during occlusion. Blocking the pathway degrades performance. That demonstrates a dependency of that particular trained model on the pathway. It does not prove that no architecture without the pathway can solve the task.

A separately trained one-way recurrent model may learn another strategy. If it performs equally well, reciprocal feedback was useful in the original model but not necessary for the task under the tested budget.

This difference appeared in TACH-2. Removing feedback from a trained two-way network harmed the network's estimates, but a separately trained one-way control nearly matched its performance. The first result was about usage. The second was about comparative necessity.

The same logic applies to remapping. An event-triggered transformation might change the output of a particular trained model. That would be evidence of causal use. Yet a generic recurrent control might achieve the same objective without an explicit event. The proposed mechanism would remain optional. Conversely, a model might contain the transformation and never learn to use it, as suggested by TACH-6's inconclusive gate ablations.

A complete study therefore needs both kinds of intervention. Frozen-weight ablations locate dependencies inside a specific model. Retrained alternative architectures test whether those dependencies are unavoidable under the benchmark's constraints.

A theory that conflates the two will repeatedly mistake its own implementation choices for laws of cognition.

## The importance of equal information

In a system with local and global processing, the information budget has several doors. Raw sensory samples are one. A salience alert is another. A hidden-state summary is a third. Top-down feedback can also convey expectations, while actions themselves may reveal information to other modules.

A fair experiment must count every path that carries task-relevant content. If a local branch is described as suppressed while its high-dimensional hidden state is continuously copied to the workspace, suppression is only a word. If the workspace receives a two-bit alert, that is limited but real information. If a policy is given a true hidden change-point label, its trigger has privileged knowledge that a real system would not possess.

The simplest remedy is an explicit channel ledger. For each model, record what can be read at every time step, the size and semantics of each message, the amount of state retained, and the computation permitted between observations. Include communication associated with control signals.

The ledger is not mere bookkeeping. It helps identify which tasks can be solved at all under a proposed bottleneck. If a hidden event affects only an unobserved stream and no information about it reaches the workspace, a central system cannot correctly respond except by chance or prior expectation. A hypothesis cannot demand miraculous information transfer to demonstrate global access.

Likewise, a comparison between an architecture that receives both streams continuously and one that receives only sparse samples is not a test of timing at constant information. It is a test of information availability, which may still be useful but supports a narrower claim.

The system should also report where information exists locally even when it is globally unused. Probing a local representation can show that it retains task-relevant features. A downstream causal intervention can show whether those features reach the workspace. Both measurements are needed to distinguish restricted access from absent representation.

## A deadline test with a real stopping rule

The binding study by Schönemann and colleagues suggests an experiment that is different from the remapping study. The hypothesized process is recurrent integration of features across space, with performance declining when successive stimuli interrupt the process before it completes.

Build a sequence of multi-feature objects. Require a system to identify not only the presence of features but their correct conjunctions. Vary the time between presentations while keeping the total number of observed features and their identity distributions matched. Compare a locally recurrent integrator with explicit completion gating, a fixed-delay gate, an irregular event-driven gate, and an unrestricted recurrent network with equal computation.

The important endpoints include conjunction accuracy, simple feature accuracy, latency, memory continuity, and sensitivity to interruption. A binding-specific mechanism predicts that interventions during unfinished integration should harm conjunctions more than isolated feature detection.

One might use a recurrent internal process with a learned stopping criterion. The global workspace receives a candidate only after the local integrator reports sufficient confidence or after an externally imposed deadline. The rival can use a generic adaptive compute policy, a probabilistic tracker, or a similarly expressive recurrent model. If the special completion gate beats these alternatives under matched budgets, it has earned a specific engineering claim.

The experiment should explicitly avoid hard-coding the human study's 120-millisecond value as a software constant. The artificial model's operations have different timing and cost. We should test the relationship between integration completion and interruption, not imitate a biological latency numerically.

If the model's performance collapses whenever inter-stimulus intervals become too short, check whether it simply received insufficient evidence. Hold the input record fixed and vary internal processing windows. If the effect remains, the explanation moves closer to a computational deadline. If it vanishes, the apparent binding limit may be an acquisition or sampling artifact.

A negative result should change the hypothesis. If completion-gated recurrence does not improve binding against a generic recurrent model, it should not become a required CHORD component merely because the neuroscience paper was interesting.

## The phase test nobody wants to run

A theory built around micro-epoch alternation needs an experiment capable of showing that periodicity is unnecessary.

Take a trained model with a periodic gate and a matched model with an irregular adaptive gate. Equalize the number of access opportunities, the actual content transferred, the total recurrent computation, and the deadline for output. Then vary the relative phase of the periodic schedule while keeping the input sequence identical.

If the periodic model has a privileged phase dependence, the performance change should be content-specific and repeatable. If all schedules perform similarly, the evidence does not support a rhythm-specific computational necessity.

There are two difficulties. One is practical: equalizing content transfer while changing timing may require buffering and carefully controlled latency. The other is theoretical: the periodic model may have learned to depend on its clock during training. A frozen-weight phase shift can degrade that model even if an irregular model trained from scratch performs equally well.

The solution is not to abandon the test. It is to report both results. Frozen-weight interventions show that the trained model uses its clock. Retrained alternatives reveal whether the clock is essential to the task. The theory must not translate a learned dependency into a universal law.

The phase experiment should include several noise, delay, and distractor regimes, not just one favorable setting. A peak at fifteen hertz on one synthetic world may be an artifact of that world's timescale. The claim is more interesting if relative phase affects useful content promotion across many timing conditions after input and resource conservation.

Even a robust positive result would establish a computational advantage of temporal coordination under particular conditions. It would not prove that subjective experience is oscillatory.

## Confidence intervals are not decoration

TACH-6's primary acceptance rule required a paired advantage over three matched controls with a 95 percent uncertainty interval excluding zero and category accuracy preserved within a predefined tolerance. Those standards were not met. The result remained inconclusive even though one comparator showed a positive interval.

This is how a test should work. Statistical significance in a selected contrast is not a license to ignore other predefined comparisons. Repeated testing increases the probability of finding a favorable result by chance. An analysis that changes its success rule after seeing data has lost much of its evidential value.

A serious evaluation should report raw seed-level scores, uncertainty intervals across both training initializations and held-out worlds, and the relationship between multiple comparisons. It should identify which outcomes were primary and which were exploratory. It should also examine practical effect size. A tiny difference may be statistically detectable with enough data while being irrelevant to deployment.

The fact that synthetic worlds are generated by code does not make statistical uncertainty disappear. The experiment still samples initializations, trajectories, noise realizations, and test conditions. A model may be brittle across seeds or robust only in a narrow region of parameter space. A single attractive curve cannot represent the distribution.

There are other statistical traps. Conditional accuracy can look high when the system rejects or misclassifies difficult cases. Average scores can hide catastrophic failure regimes. A model may improve accuracy while incurring large latency or energy costs. The reporting standard should show enough joint metrics to prevent these trades from being hidden.

Good uncertainty reporting is part of making the theory falsifiable. It is the opposite of academic timidity.

## The date belongs in the protocol

When new papers arrive, they can motivate new experiments. They should not rewrite the logic of earlier ones. Shi's March 2026 study helped inspire TACH-6. Hesse's October 16 preprint informed the alternating-representation context. The October 26 and 28 studies appeared after the original October 17 protocol.

If a recurrent-binding test is designed in response to the October 26 paper, it should be dated as a new branch of the program. Its predictions, budgets, and success rules should be frozen before results. The earlier TACH-6 experiment should remain as recorded, including its negative findings.

A living research program needs a chronology precise enough to distinguish discovery from interpretation. A later journal issue date does not make an earlier online result new. An accepted paper may be stronger evidence than its preprint, but the observation might have been public months earlier. A news summary can increase attention without producing a new experiment.

Maintaining publication and event dates is not administrative vanity. It prevents a researcher from attributing a theory to evidence that was unavailable when the theory was proposed. It also protects the novelty claim from a later mistake: confusing a newly noticed result with a newly published one.

The book itself has a November 16, 2026 source cutoff. Readers should be able to see what was known when its claims were written.

## A preregistration that still permits discovery
A frozen protocol can sound like an obstacle to creativity. Scientific research often proceeds by noticing unexpected patterns, improving a model, and designing new experiments in response. The purpose of precommitment is not to prevent such work. It is to distinguish a prediction made before the result from an interpretation created afterward.

Suppose a CHORD experiment tests three access schedules and finds that the irregular schedule performs unexpectedly well on a narrow noise regime. The researchers may investigate why. Perhaps the generator contains a hidden temporal pattern. Perhaps a model learned a surprising compression strategy. Perhaps a bug has made one control receive more information than intended.

Those investigations can lead to new hypotheses. They should be labeled exploratory, and a separate held-out test should be used to evaluate the resulting prediction. The mistake would be to rewrite the original protocol so that the newly discovered pattern appears to have been the primary target all along.

The TACH-6 distractor correction illustrates the distinction. Reversing a symmetric noise variable did not produce a genuine distribution shift. Detecting the problem was a validity finding, not a positive result. Fixing the generator and rerunning the experiment was necessary. The final report recorded the correction rather than silently substituting a more dramatic stress test.

A good preanalysis document specifies the main outcome, rival hypotheses, statistical criteria, and conditions that would invalidate interpretation. It can also declare an exploratory section where unexpected behavior is investigated without pretending the resulting conclusions were confirmatory.

The practice is particularly important in consciousness-adjacent research because the same observed pattern may be narrated under many theoretical labels. A rhythmic signal can be called access, binding, arousal, prediction, or coordination. Without prior predictions, almost any outcome can be recruited into a favored story.

Precommitment forces the researcher to say which pattern the theory expected and which rival would have expected something different. The surprising observations can then improve the next experiment without changing the meaning of the current one.

### The matched world is a unit of evidence

Artificial experiments can generate thousands of test trajectories quickly. It is tempting to treat each observation or time step as an independent sample. But observations within one simulated world are related. Several time steps may share the same latent state, noise process, or distractor correlation. Several models evaluated on the same world also produce paired outcomes.

The uncertainty calculation should respect that structure. A hierarchical analysis may resample independent worlds and training initializations rather than treating every classification decision as unrelated. Paired comparisons can reduce variance when models experience the same external conditions, provided the pairing is preserved.

There is no unique statistical procedure for every benchmark. The correct method depends on the data-generating structure and the claim. What matters is that the analysis does not inflate the effective sample size by counting repeated, correlated observations as independent evidence.

The test design should also distinguish training seeds from held-out worlds. A model that performs well under one initialization may be brittle to optimization randomness. A model that performs well across seeds but fails on new generators may be overfit to the environmental assumptions. Both dimensions need reporting.

TACH-6 used eight initialization seeds and 160 paired held-out trials per stress condition. That is a useful exploratory base, but the study remained limited by low identity performance, incomplete compute profiling, and unadjusted comparisons. More data alone would not repair those conceptual weaknesses.

The next protocol should first establish that the models can learn the task. Only then should it spend computational resources narrowing uncertainty around an architectural difference. Precision around an uninformative benchmark is not a scientific achievement.

### A causal map, not a list of ablations

A common ablation table removes one component at a time and reports the resulting accuracy. Such a table is useful but often insufficient. Components may compensate for one another, share redundant pathways, or fail only under specific conditions. Removing a module may also change the computation budget or produce an unfamiliar internal state.

A richer design begins with a causal map of the proposed mechanism. A local recurrent process forms a candidate representation. A selector decides whether it is available for global use. A workspace updates a belief. An action model predicts consequences. Each arrow corresponds to a measurable effect that can be interrupted or delayed.

The experiment then tests predicted selective failures. Perturbing local recurrence during binding should harm conjunctions more than isolated detection. Blocking global promotion should leave local decoding intact while preventing a cross-task decision. Disrupting the action predictor should alter self/world attribution without necessarily harming visual category recognition.

These differential predictions are stronger than a claim that every component is important. If removal of the readiness controller impairs all tasks equally, it may simply have reduced resources. If removing the selector harms local detection before any broadcast occurs, the architecture may have unintended coupling. A precise failure profile helps distinguish the proposed mechanism from these alternatives.

After frozen-weight interventions, separately retrain models without the component. If they recover the same function, the component was a dependency of the original implementation but not necessary for the task. The research record should contain both results.

Such a causal map turns the architecture from a collection of named boxes into a set of testable information paths. It also helps identify where a more economical design may replace several modules with one.

### The failure report that earns trust

A serious experimental report should be able to state its strongest negative result near the beginning. If a gate failed under noise, say so. If a learned transformation had no causal effect when removed, say so. If the full model relied on a nuisance correlation, show the stress-test collapse.

The raw outputs and implementation details should make those statements reproducible. Summaries are useful, but they should not replace the data needed to inspect seed-level variation, outcome definitions, or accidental differences between controls. Figures should display relevant uncertainty and failure regimes rather than only the best-performing configuration.

A reader should also be able to distinguish what was actually measured from what remains planned. Geometry analysis, real neural-data replication, targeted perturbation, and full compute profiling may be valuable next steps. They are not achievements until carried out.

This reporting discipline is commercially inconvenient in the short term. A positive headline is easier to sell than an inconclusive benchmark. But a research program that preserves its failures can make better long-term decisions, especially when the architecture may eventually support autonomous systems whose mistakes matter.

The fairest clock is not a particular oscillation. It is the chronology of a prediction written before an experiment and a result recorded afterward, with no opportunity to change the past.

## A fair way to lose

A good TACH/CHORD experiment should contain an explicit failure path. If the special gate performs no better than a strong active-sensing policy, call the benefit ordinary information allocation. If reciprocal feedback proves unnecessary after retraining, remove necessity from the theory. If representational remapping has no selective causal effect, do not promote it. If an irregular schedule matches the periodic schedule under matched samples, drop privileged-frequency claims.

These decisions are not retreats from science. They are the means by which an ambitious idea becomes less wrong.

A theory that cannot lose is also difficult to use. Engineers need to know when a component is required, when it is optional, and when it makes the system worse. They cannot deploy a metaphor. They can deploy a module whose costs and failure regimes have been measured.

This is why the next CHORD experiment should be smaller than the grandest version of the architecture. Isolate one proposed advantage, give the competitors fair resources, and make the predicted failure observable. Then decide whether the component deserves to survive.

The clock is not fair because every model sees a clock. It is fair when no model is secretly given more time, more information, or more chances to win.
