# 14 — The Switch That Did Not Matter

The code changed. At least the architecture had been designed to permit a code change. The training run produced numbers. The remapping model sometimes beat its competitors at identifying a stimulus whose identity combination had not appeared during training.

There was enough of a difference to be interesting and not enough to be convincing.

On the main held-out identity condition, the event-triggered model achieved 94.5 percent category accuracy and 19.7 percent conditional identity accuracy. Its fixed-code competitor achieved 94.7 percent category accuracy and 15.8 percent identity accuracy on its own correctly classified subset. Those were eight-seed averages from a synthetic task. The identity scores were low. The apparent advantage seemed tempting, but a paired confidence interval against the fixed-code control included zero.

Then the event trigger was disabled.

The model's conditional identity accuracy did not fall. The average increased from about 19.7 to 20.1 percent. Delaying the gate by two simulation steps increased it to roughly 20.3 percent. Those are not large or statistically established improvements from disabling the mechanism, but they are enough to destroy a simple causal story in which the precise timing of the gate was the reason the model worked.

If the switch did not matter when it was removed, why credit the switch with the original advantage?

The TACH-6 experiment, completed November 2, 2026, did not answer that question in favor of the proposed mechanism. The researchers' own execution report labeled it an exploratory negative or inconclusive computational result and declined to promote the architecture. This chapter is about what it takes to accept that decision.

## A paper inspired the model, not the other way around

On March 25, 2026, Shi and colleagues published their peer-reviewed study of rapid neural population-code switching in macaque inferotemporal cortex. In October, Hesse and colleagues posted a preprint on rapidly alternating perceived and suppressed stimulus representations. The TACH-6 analysis protocol was written October 17, after those two sources became available.

The timing matters. The protocol was created before the October 26 papers on recurrent binding, thalamic readiness, and masked inference. Those later findings did not justify the original model and cannot be used after the fact to declare that its design anticipated a new discovery. They can suggest separate experiments.

The original TACH-6 question was narrow. Could a recurrent neural network with a shared fixed-capacity state benefit from a rapid, learned transformation of its representational axes after a task cue? Would that benefit survive comparison with fixed-code, gain-only, and generic recurrent alternatives when the inputs and parameter counts were matched?

This was not a test of whether the network felt anything. It was not a replication of macaque neural recordings. It was a synthetic model-comparison experiment inspired by a biological observation about coding flexibility.

The plan precommitted to a demanding success rule. The remapping model had to beat each matched control on held-out identity prediction with a 95 percent interval excluding zero, while preserving category accuracy within one percentage point. The results also had to survive multiple initialization seeds and held-out worlds. If the control with generic recurrence matched the proposed mechanism, the interpretation would be limited to a potentially useful inductive bias, not a necessary computational capacity.

These conditions were important because the central idea was attractive. An event that looks like a switch in a network plot can easily become the protagonist of an explanatory story. The protocol made the protagonist prove it had done something.

## Five competitors

The experimental environment contained two broad categories and compositional identity factors. Each identity was a combination of several latent values. Observations occupied a twelve-dimensional input space and included noise, occlusion, and distractor variables. The model had to report category throughout a trial; an identity decision became relevant after a context cue. Some identity combinations were omitted from training and development, appearing only in held-out evaluation.

The context cue was visible to every architecture. It was not a hidden label delivered only to the remapping model. The trigger had to be computed from available observations and context, rather than from the eventual correct answer.

Model A was the proposed mechanism: a 16-wide recurrent hidden state with a bounded, learned transformation applied at the cue onset. The architecture was designed to permit an event-specific change in the axes of its representation while using the same state to serve both category and identity tasks.

Model B was a fixed-code recurrent control. It had the same state width and the same broad model capacity, without the event-specific axis transformation. Parameters freed from the proposed switch were allocated elsewhere in its transition mechanism.

Model C was a gain-only gate. It could respond to cue onset by changing the strength of processing, but not by performing the proposed axis transformation. This control addressed the possibility that any event-contingent gain or attention signal, rather than a true geometric reorganization, explained the result.

Model D was a generic flexible recurrent control. It had access to comparable learned transformation capacity but could apply it without the same onset-specific restriction. This was a strong comparator because a sufficiently expressive recurrent model might learn the useful state change without a dedicated event.

Model E used separate detector and identifier states. It had more parameters and state capacity, serving as an unmatched reference. It was not eligible to establish a fair remapping advantage because giving a system more storage and computation can improve performance for ordinary reasons.

The four primary models each had 902 trainable parameters. Model E had 1,382. Matching the parameter count and the principal affine operations improved fairness, but the experiment did not complete a formal profile of all FLOPs, nonlinear operations, and peak activation memory. The report therefore declined to claim perfect compute matching.

That limitation is not a confession of incompetence. It is the difference between recording what was matched and pretending every possible resource was equal.

## A small advantage with wide uncertainty

The researchers trained eight independent initialization seeds for each model family, using a common synthetic-data generator and equal task exposure. Each held-out stress condition included 160 paired trials per seed. The stress tests covered unseen identity combinations, increased noise, temporal occlusion jitter, and a reversal of a category-correlated distractor.

On the unseen-combinations condition, Model A's category accuracy averaged 94.5 percent, almost identical to Model B's 94.7 percent. Conditional identity accuracy was 19.7 percent for A and 15.8 percent for B. A comparison restricted to worlds where both models got the category right estimated a paired identity advantage of about 4.3 percentage points for A. Its 95 percent hierarchical bootstrap interval extended from negative 0.4 to positive 9.7 points.

The interval included zero. The experiment therefore did not establish a reliable advantage against B under its own success rule.

Against Model C, the paired estimate was about 2.7 points, with an interval from negative 1.9 to positive 8.0. Again, zero was inside the interval. Against the generic recurrent Model D, the estimated advantage was about 4.2 points with an interval from positive 0.4 to positive 8.7. That single comparison was encouraging, but the overall success rule required a positive result against every matched control. One promising contrast did not rescue the failed ones.

The reported intervals were not corrected for every possible multiple comparison. The scores were from a constructed task rather than an independent biological dataset. The identity accuracy was low enough to raise a separate concern: perhaps none of the architectures had learned robust identity discrimination, and the differences were occurring in a weak performance regime.

The result should therefore be described as a possible numerical benefit in selected comparisons, not as a demonstrated remapping mechanism.

If a reader finds that phrasing unsatisfying, consider the alternative. A model with low identity accuracy, uncertain advantage over two controls, and unprofiled compute differences could be called a breakthrough only by quietly ignoring the questions the protocol had been written to ask.

## The distractor trap

The most revealing weakness appeared when the test environment changed a nuisance correlation. In the training distribution, a distractor axis had a relationship with broad category identity. In the stress test, that relationship was reversed.

The four principal architectures struggled. Model A's category accuracy dropped to about 46.2 percent; Model B's to about 47.1 percent. In a two-category task, those scores are approximately chance. The networks had apparently become dependent on a correlation that failed under reversal.

This is a familiar machine-learning problem. A model trained to classify animals might rely on the background rather than the animal. A medical classifier might exploit scanner artifacts associated with a diagnosis. A financial predictor might discover a pattern caused by a data-processing convention. Under distribution shift, the apparent skill evaporates.

The troubling detail in TACH-6 was that Model A's identity accuracy conditioned on correct category was relatively high under the reversed distractor. A careless report could celebrate that number. But when the model gets the category right only around half the time, the correctly classified subset is selected in a highly nonrepresentative way. The conditional result cannot erase the broader failure.

The experiment must be judged on the task as a whole. A model that cannot distinguish broad categories under a simple nuisance reversal has not established robust flexible representation.

There was also an important quality-control correction. An initial implementation of the distractor reversal had used symmetric noise. Reversing the sign of a symmetric noise variable does not change its distribution. The supposed stress test was therefore not a real intervention on the model's environment.

The mistake was detected during validity checks. The generator was corrected to reverse a fixed category-correlated distractor axis, and the complete experiment was rerun. Only the corrected results were retained for the final report.

This is exactly the sort of error that makes reproducible research valuable. A test can have a dramatic name and still fail to alter the thing it was meant to test. The fix was not an argument for a particular architecture. It was a repair to the experiment.

## The decisive ablation

The headline advantage would have been more convincing if the model's supposed switching event were causally necessary. The protocol proposed timed perturbations and ablations precisely to examine that possibility.

Ablating an event in a trained network asks what happens when the trained mechanism is prevented from operating. It does not settle the question of whether another architecture can solve the task, but it can establish whether the current model depends on the event.

On the main held-out task, removing the onset gate did not damage average conditional identity accuracy. Delaying it by two steps did not damage the mean either. The differences were small, and their interpretation should not be inflated into a beneficial effect of ablation. The important fact is the absence of the predicted selective deficit.

The results weakened the explanation that the network's performance gain came from the timed remapping event. Perhaps the network had learned a useful representation that did not depend on triggering the transformation. Perhaps the trigger had too little effect. Perhaps the task did not reward the intended kind of remapping. Perhaps the comparison model's optimization was different. Those possibilities remain open.

A stronger test would measure the actual orientation of representational axes before and after the cue. A simple increase in activity is not a change of code. Cross-decoding and state-to-feature Jacobians could show whether the model reorganizes the dimensions carrying identity information. A targeted perturbation during the measured transition, compared with an equal-energy sham, could then test whether the geometry matters for the output.

Those analyses had not been completed in the reported run. It would be inappropriate to declare that a true representational switch occurred merely because the architecture contained a learned transformation matrix.

This distinction is unusually important in computational neuroscience. An implementation can contain a component named Remap without using it in the intended way. A scientific explanation must inspect the learned mechanism rather than trusting the class name.

## The question the negative result does answer

It might seem as though the experiment failed. In a useful sense it did: it failed to demonstrate the proposed incremental advantage and causal necessity. That is the answer to its preregistered question at this stage.

It does not show that dynamic remapping never helps. It does not refute Shi's primate recordings. It does not establish that generic recurrence is always sufficient. It does not test consciousness. Its domain was one particular synthetic task with specified model widths, training budgets, and out-of-distribution conditions.

A different implementation might perform better. It might use stronger identity supervision, more varied training examples, or a controller that explicitly balances category and identity demands. It might prove a real capacity gain under stronger controls. But such an improvement would require a new, dated protocol and fresh evaluation data. It cannot be retroactively attributed to the current run.

The immediate architectural decision was conservative: do not make event-triggered remapping a required CHORD mechanism. Retain it as a candidate to investigate. Separate the next recurrent-binding experiment from the existing remapping test so that any improvement can be attributed to a specific change.

This decision is more intellectually valuable than a prematurely triumphant result. It establishes that the proposal has a failure condition and that the research team is willing to honor it.

## The shape of a better replication

A second TACH-6 experiment would begin with a clear task in which identity discrimination is reliably above chance and where the fixed-code and generic recurrent controls are competently optimized. Otherwise, a small advantage in a weak regime risks being an artifact of failed training.

Every model would receive the same raw observations, cue information, and training exposure. Parameter counts, actual FLOPs, state memory, and inference latency would be profiled. The development split would be used for model selection, and the final held-out worlds would be untouched until the protocol was frozen.

The primary analysis would again require a benefit over every matched comparator, not just the weakest one. Category accuracy would have to remain within the predeclared tolerance. Confidence intervals would be computed across independently trained models and held-out worlds, not just repeated observations from one lucky network.

The mechanism test would be direct. Measure the representational geometry. Identify the event's actual timing from model state rather than from the desired label. Perturb the state at predefined moments relative to that event. Compare targeted and norm-matched random disturbances. Confirm that a cue-time delay alters identity processing in the predicted way while sparing irrelevant functions.

The distribution-shift tests would include unseen identity combinations, noise changes, altered cue timing, and distractor reversals. A model whose category accuracy collapses under a nuisance correlation must not be declared robust because one conditional metric improves.

If the event still produces no selective behavioral deficit, the remapping explanation remains unsupported. If a generic recurrent model matches the performance at equal cost, the dedicated mechanism is not necessary for the benchmark. If the explicit switch finally produces a reproducible, targeted benefit, the conclusion can be stated in engineering terms: a task-specific representational transformation improved performance under these constraints.

None of the possible outcomes demonstrates subjective experience.

## The confidence interval belongs to a question
It is easy to treat a confidence interval as a decoration around the score one prefers. In TACH-6, the distinction between per-model conditional accuracy and paired comparison was especially important.

Each model's conditional identity accuracy was computed on the trials where that model correctly classified the broad category. Those sets of trials need not be the same. One architecture might classify a difficult category correctly while another fails, changing which identity decisions enter the reported average.

The paired comparison addressed a different question: on worlds where both architectures got the category right, how did their identity decisions compare? That design can reduce some sources of unfair comparison by holding the evaluated world set common, but it also conditions on joint success and therefore discards trials where either model failed category classification.

Neither quantity tells the entire story alone. The first reports operational performance of each arm on its own category-correct subset. The second supports a paired comparison of identity predictions on jointly category-correct worlds. A complete interpretation needs both plus the overall category accuracy, especially when category performance collapses under distribution shift.

This is why the reversed-distractor condition was so damaging. Approximately half the broad category decisions were wrong. A higher identity score on the surviving subset did not demonstrate robust identity representation across the test world. The model might simply have selected an unusual set of easy or biased trials.

One can construct stronger endpoints. Report joint category-and-identity accuracy over all trials. Report conditional identity accuracy as a secondary decomposition. Track which categories and identity combinations failed. Measure calibration and abstention if the architecture is allowed to express uncertainty. Use paired worlds to compare each model on the same external realization without hiding the cost of category errors.

The analysis plan should specify the hierarchy before evaluating final test data. Otherwise, one may search among conditional and joint metrics until finding the result that makes the proposed mechanism look best.

### A matrix is not a biological switch

The remapping network contained a learned transformation of hidden-state axes. That gave it the *capacity* to reorganize its representation after a cue. It did not establish that the trained network used the transformation as intended.

The distinction is not philosophical. A parameter matrix can implement a rotation, a scale change, a shear, or a nearly identity operation. A nonlinear network may compensate for the matrix elsewhere in its computation. Even if the hidden-state trajectory changes sharply at cue onset, the movement may be irrelevant to the task readout.

To claim an actual code switch, the analysis should measure representational geometry under held-out stimuli. The same stimulus features must be tracked before and after the proposed event. The mapping should change in a way that makes the identity distinctions more accessible, ideally without losing category information.

A state-to-feature Jacobian can help distinguish changes in sensitivity from simple amplification. Cross-temporal decoding can test whether the feature representation changes so much that a decoder trained before the event fails afterward. These tools have limitations, but they make the claim more precise than a visual plot of hidden states.

Causal perturbations remain necessary. A model may exhibit a rotation that has no behavioral consequence. If the rotation is supposed to support identity discrimination, disrupting the relevant state directions during the event should impair identity in a way that an energy-matched random disturbance does not.

The TACH-6 execution report explicitly left those geometry and targeted-perturbation analyses for later work. It would be misleading to write as though they were completed. The proper conclusion is that an event-specific transformation was implemented and trained, not that a biologically analogous remapping mechanism was validated.

### The fixed model that might have learned flexibility

A fair control need not share the proposed architecture's conceptual labels. The generic recurrent model in TACH-6 had transformation capacity available at any step. It could learn task-dependent changes without being forced to invoke a named remapping operation only at cue onset.

This comparator is dangerous to the central hypothesis because it may learn the useful computation in a less constrained way. If it matches or beats the explicit remapping model, the special event is not necessary for the measured task. If it loses, the explicit restriction may provide a helpful inductive bias by reducing the search space or regularizing learning.

But a training advantage is not automatically a representational necessity. A generic model might match the same performance with a different optimizer, more training, or a slightly altered architecture at the same inference cost. The comparison should account for training budgets and hyperparameter search, not just inference-time parameter count.

The results on unseen combinations suggested a possible advantage over the generic recurrent control in one paired contrast. However, the overall acceptance rule required success against fixed and gain-only controls too, and those intervals included zero. The targeted gate ablation also failed to show the predicted causal deficit.

The correct claim is therefore limited: the experiment did not demonstrate that event-triggered remapping is needed. A later study may discover a specific task and training regime where the explicit mechanism provides a reproducible advantage. It should be treated as a new result, not a reinterpretation of the current data.

### The meaning of a failed criterion

A predefined success rule is useful only if it is honored. In TACH-6, the remapping model needed a positive lower confidence bound against every matched control and preserved category detection. It did not meet that standard. The fact that some averages were numerically better did not justify changing the rule after the test.

The experiment's statistical uncertainty had several sources: independent training initializations, constructed test worlds, and the variability of outcomes across stress regimes. The bootstrap intervals were exploratory and not corrected for all possible multiple comparisons. The laboratory had not performed independent biological replication or formal FLOP parity. Those limitations belong in any public retelling.

A valid research response is to improve the task and rerun a newly frozen protocol. It is not to announce that the threshold was too strict because the preferred result came close.

This is particularly important in a field where words such as awareness, consciousness, and self can make modest numerical effects sound profound. An unconvincing identity advantage in a synthetic classification task does not become strong evidence because the architecture resembles a neural hypothesis.

The finding that matters most is that the implemented gate could be ablated or delayed without the anticipated loss. Until a targeted perturbation reveals a selective causal dependency, the remapping event remains a proposed mechanism rather than an established one.

The negative outcome helps CHORD stay modular. A component that has not earned its necessity can be retained as an experimental option without being promoted to the core theory. That is a better fate for a good idea than a false coronation.

## A model that can lose

The TACH-6 result makes a useful demand on CHORD. The architecture cannot be a collection of components whose names guarantee their necessity. It must be a set of separable proposals: local recurrence, temporal selection, representational flexibility, readiness control, persistent world modeling, and action-conditioned prediction. Each can be evaluated on its own.

A negative result in one component should change the architecture. Otherwise, the word hypothesis is ornamental.

The remapping model had an appealing biological inspiration, an explicit implementation, and a small numerical advantage. It also had weak identity performance, an uncertainty interval crossing zero against important controls, a severe distribution-shift failure, and an ablation that did not show causal dependence on the intended event. The appropriate decision was to withhold promotion.

There is no shame in that outcome. The shame would have been to announce a breakthrough and let the causal test disappear into an appendix.

The switch that did not matter tells us something about how the next experiment must be designed. It must make the proposed mechanism work hard enough that its removal has a predicted cost. It must give the alternatives every fair chance to win. It must distinguish having the capacity to transform a representation from actually using that transformation in a way that changes behavior.

Only then can a code switch become more than a beautiful picture of movement in hidden state.
