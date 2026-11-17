# 4 — The Binding Deadline

A color and an orientation can both be recognized while their relationship remains uncertain.

This is an irritating fact for anyone who imagines vision as a single photograph delivered to a central observer. A human can detect red and recognize a slanted line, yet when the features are spatially separated and rapidly alternated, correctly identifying which color goes with which orientation becomes much harder. The system has the ingredients. It cannot always assemble them before the scene changes.

On October 26, 2026, N. Schönemann and colleagues published [*Neural limits of temporal feature binding in human visual cortex*](https://doi.org/10.1038/s41467-026-78974-z) in *Nature Communications*. Using magnetoencephalography and source-localized cortical responses during changing color-orientation pairs, they reported a rapid recurrent modulation of activity in early visual cortex at roughly 120 milliseconds. The latency of this recurrent activity did not simply follow the stimulus alternation rate. Performance fell toward chance when the alternation was too rapid to accommodate the recurrent process within an interval. Attention gradually strengthened recurring combinations containing the attended color.

The result is valuable because it attaches a temporal constraint to a defined computation. It does not reveal the universal duration of consciousness. It says that a particular spatial feature-binding task had a recurrent-processing demand, and that the task broke when the environment changed faster than this demand could be met.

This is the kind of finding an engineer can use without pretending to have found the secret of experience.

## Two features, one mistake

Imagine a display containing two changing pairings. At one moment red belongs with one orientation and green with another; a fraction of a second later the arrangement shifts. The observer is asked to discriminate the pairing, not merely identify which colors and orientations occurred.

The distinction is easy to overlook in a benchmark. Classification tasks often reward a model for returning a set of labels: red, green, vertical, oblique. But a real decision may require binding the labels into objects or events. Red on the stop signal is not equivalent to red on a nearby reflection. A hand near a switch is not necessarily the hand touching it. A spoken name in a room does not automatically belong to the face currently in view.

When features are physically co-located, existing visual processing can support very rapid conjunctions. When the features are spatially separated, the problem requires coordination across representations that may take longer. Schönemann and colleagues investigated the temporal constraints on that coordination rather than simply asking whether color or orientation was detected.

Their study linked successful binding to the timing of recurrent activity in early visual cortex, particularly V1/V2. The recurrent response peaked around 120 milliseconds after the relevant visual event. When the alternation interval was shorter than the time needed to contain this response, binding accuracy suffered. The authors also found evidence that attention biased repeated pairings over time, making particular feature combinations more available for discrimination.

There are two timescales in that account. One is the relatively rapid recurrent modulation associated with a binding opportunity. Another is the slower accumulation of an attentional bias across repeated combinations. Treating them as a single micro-epoch would throw away the most useful part of the result.

A biological finding of an approximately 120-millisecond process cannot be translated directly into a required 120-millisecond delay inside software. The task, stimulus geometry, neural circuits, and measurement matter. What may transfer is the idea of a completion-dependent access decision: the central system should know whether a local relation is sufficiently formed before using it as a stable part of the world model.

## Why an early answer can be dangerous

A good system has to distinguish a provisional estimate from a completed binding. This is familiar in scientific measurement. A sensor detects a signal, a filtering process estimates its source, and a later model associates that source with an object or causal event. Each step can fail differently. If the system writes its earliest association into a persistent state as settled truth, the error can propagate.

Suppose a service robot sees two cups and two hands crossing. The early visual features are correct: each hand is present, each cup is present, each has a position and color. But rapid occlusion makes the hand-to-cup association ambiguous. If the robot commits to the wrong pairing, its prediction of which cup will move next fails. A better model might delay the binding decision or maintain multiple hypotheses until additional evidence resolves the association.

A purely feedforward network may be sufficient if the image contains enough spatial cues. A recurrent network may help when context across frames is necessary. A probabilistic tracker may outperform both in a constrained setting. The proposed CHORD mechanism would have to show an advantage over these alternatives before its binding controller earns architectural status.

The right experiment does not reward the system for waiting longer in every trial. It imposes a speed-accuracy problem: some situations demand rapid action; others reward additional integration. The test varies the difficulty of feature assignment and the cost of acting on a wrong pairing. A flexible controller should use more integration time when the evidence warrants it, not because a clock says that all thoughts take the same duration.

In the simplest implementation, a recurrent local module updates a candidate binding over several internal steps. The module emits a confidence or completion signal. A global selector may then choose whether that candidate enters the central workspace. The architecture can be compared with a system that broadcasts every intermediate estimate, a fixed-delay system, and an unrestricted recurrent controller that learns its own stopping policy.

If the explicit binding deadline improves outcomes, the improvement should survive equalized compute budgets, matched information availability, and held-out timing patterns. Otherwise, the model may simply have been given more internal work per input.

## The measurement does not equal the mechanism

Magnetoencephalography measures magnetic fields associated with neural currents. Source localization estimates where the contributing activity might arise. This is a remarkable instrument for studying timing, but it does not read individual thoughts or intervene on single feedback loops. The Schönemann study links behavior and source-localized activity through their measured temporal relationship. Its recurrent interpretation is supported by the data and prior knowledge of cortical processing; it is not a direct causal demonstration from selective disruption of the proposed recurrent event.

That distinction changes what the book can responsibly claim. We can say the findings support a recurrent-binding deadline in the tested human visual task. We should not say that the researchers surgically interrupted feedback at 120 milliseconds and proved it necessary, unless such an intervention was actually performed. Nor can we say the observation shows that awareness itself comes in 120-millisecond packets.

The strongest next experiment would manipulate recurrence causally. In a model, that is straightforward: delay, suppress, or replace feedback for a fixed window while preserving external input. In humans, causal perturbation must respect the practical and ethical constraints of noninvasive stimulation and the difficulty of targeting a specific signal without affecting adjacent functions. The artificial experiment can be clean even when biological intervention is challenging.

The machine test should ask whether disrupting feedback around the predicted binding window selectively damages conjunction accuracy while leaving simpler feature detection relatively intact. That would distinguish a contribution to binding from generic loss of signal. A sham perturbation with the same energy, a timing-shift control, and a task that does not require binding would strengthen the interpretation. If all tasks degrade equally, the intervention may have produced a broad processing deficit rather than exposing a binding mechanism.

An especially telling manipulation changes input alternation timing while keeping the collection of observed features constant. Does the system fail because consecutive states interrupt recurrent integration, or because it literally receives fewer usable samples? The first supports a computational deadline; the second supports ordinary information scarcity. It is possible for both effects to occur. The experimental design must measure them separately.

A timing study can also expose misleading successes. If a model's state is sampled at fixed intervals, the test may align cleanly with those intervals and exaggerate performance. Randomize the relationship between stimulus onset and model tick. Repeat with irregular intervals. If accuracy depends on phase only because different frames are acquired, the effect is an acquisition artifact. A genuine internal scheduling benefit must survive sample conservation.

## From 20 to 120

The previous chapter described a rapid switch in macaque inferotemporal population coding lasting less than twenty milliseconds. This chapter concerns human recurrent processing associated with cross-location color-orientation binding at approximately 120 milliseconds. There is no contradiction. The studies examine different tasks, circuits, and organisms, with different methods.

There is, however, a warning for universal timing theories. If one important representational transition can occur in tens of milliseconds and another integration process requires more than a hundred, the brain is already telling us to resist a single fixed duration as the unit of thought. Even within vision, different operations have different temporal demands. Attention can create still longer effects as repeated evidence accumulates.

An engineer who wants to import a biological number must decide which operation the number should control. If the answer is unspecified, the number is decorative. A CHORD-like system can instead use multiple, independently testable clocks: an opportunity to select content, a local deadline to complete recurrent binding, and a longer window for preserving the world state across events.

The relationships among those clocks may be more useful than their absolute frequencies. A selection gate that opens too early may broadcast unbound fragments. A gate that waits too long may miss an action deadline. A persistent workspace that overwrites old state too quickly may lose object continuity. A system that never updates may be perfectly continuous and consistently wrong.

This suggests an optimization problem, but not yet a consciousness equation. The model can trade integration cost against expected loss from errors and delays. It can learn to request more processing when uncertainty is high, provided the training and evaluation do not leak the correct answer. Ordinary decision theory is a strong competitor. If a simple risk-aware stopping rule matches the elaborate timing controller, the elaborate mechanism may be unnecessary.

A good book should admit that possibility early. There is no prize for making a machine unnecessarily complicated in the name of a mystery.

## The interrupted calculation

Consider a second experiment, different from the visual display. An agent hears two sounds in succession. The first belongs to one source, the second possibly to another. The sources move, and the agent must associate later consequences with the correct earlier event. The relevant binding is temporal and causal rather than purely visual. The task may require holding competing assignments until a later observation resolves them.

A recurrent local processor can maintain candidate associations. A global workspace can hold the most consequential candidate, while retaining uncertainty. A self/world model can use predicted action effects to revise the association. These operations interact, but they need not share one rhythm.

Now introduce an interruption. Just as the system is converging on one assignment, a new salient event arrives and demands attention. Does the partially completed binding survive locally? Is it overwritten? Does the global selector promote the new event at the cost of the old one? Can the agent later recover the earlier evidence, or has it been irretrievably discarded?

The CHORD architecture becomes testable at this boundary. It predicts that a separation between local recurrent continuity and global selection could protect unfinished integration from immediate competition. But a generic recurrent model with sufficient memory might do the same. The comparison must equalize memory, computation, and information flow. If the CHORD decomposition produces no incremental gain, there is no reason to prefer it simply because its parts have appealing biological names.

A causal experiment can interrupt the same state at different phases without changing the observations already received. If interruption is particularly harmful before a local computation has stabilized, but less harmful after completion, that supports a processing deadline. It does not require a periodic clock. The timing may be event-driven, confidence-driven, or conditioned on task costs.

We should also ask whether the protected local representation is truly available later. A model can look resilient because it has an uncounted duplicate of the full sensory stream. If the workspace gets access to that duplicate through an unrestricted channel, the supposed access gate is theatre. Count the bits and the state. Measure peak activation memory. Record what information is actually available during interruption.

These accounting details are the difference between a credible result and a diagram that demonstrates its own assumptions.

## An experiment where the answer is the relationship
The central difficulty in measuring binding is constructing a task whose answer cannot be obtained from the ingredients alone. A synthetic benchmark might contain two colors and two orientations, but if the label is merely whether red appeared, a model need never associate red with any particular line. A network can score perfectly while performing no binding at all.

A stronger task makes the conjunction itself the answer. Suppose a scene contains a red vertical element and a green oblique element. In another trial it contains red oblique and green vertical elements. Both trials contain exactly the same colors and orientations. A bag-of-features classifier sees the same ingredients and must fail. To answer, the system has to represent the relationship.

Now vary the interval between presentations, spatial separation, and amount of occlusion. In some conditions, the system receives unambiguous co-located features. In others, it must integrate across location and time. The resulting task family can distinguish feature detection from feature binding and measure where the demand for recurrence becomes substantial.

An especially valuable control presents the same feature sets with different temporal arrangements but preserves the total information reaching the model. If a system fails when successive pairings arrive before its internal association settles, that supports a processing bottleneck. If it fails only because an observation was never delivered, the experiment is about missing data.

The task needs a causal intervention as well as a behavioral score. In a trained recurrent system, one can disrupt a feedback connection for one or several internal steps while leaving feedforward input unchanged. The prediction should be selective: binding errors rise while simple color and orientation detection remain relatively stable. The disruption should have a temporal profile that depends on when integration occurs.

A generic recurrent network may show the same profile. That would support the relevance of recurrence but not the necessity of an explicit CHORD binding module. A probabilistic assignment model could also solve the task through state estimation. Its inclusion guards against the mistake of calling any successful conjunction a special consciousness-related mechanism.

### The binding deadline is conditional

There is a difference between a process that usually takes about 120 milliseconds in a particular experiment and a process that must always take exactly that long. The human visual system has variable processing demands. Strong signals, attention, familiarity, and the spatial organization of features may change the difficulty of integration. The measured peak in source-localized recurrent activity is an empirical timing observation within the conditions studied.

A deadline should therefore be understood as conditional on the state of a computation, not as a universal interval handed down by biology. In an artificial model, it could be an estimate of whether a binding relation has stabilized enough to affect a decision. When confidence is high and the cost of waiting is large, the system may broadcast a provisional estimate quickly. When the relation is ambiguous, it may spend additional computation.

That sounds like ordinary adaptive computation, and it may be. The strongest rival is a learned stopping rule that knows nothing about consciousness theory but uses expected loss to decide when to act. The CHORD version has to show a specific advantage from the organization of recurrence and access, not simply from having permission to use more time.

There is also a hazard in using confidence as the completion signal. Neural networks can be confidently wrong. A model trained on one set of feature pairings may confidently bind the wrong objects when distractor correlations reverse. The controller should therefore be evaluated on calibration under distribution shift. A completion signal that fails precisely when the environment becomes unfamiliar is dangerous in an embodied agent.

One way to pressure it is to create trials where the local evidence favors an incorrect early association but later evidence corrects it. Measure whether the gate prematurely promotes the wrong pair, whether the workspace retains the error after correction becomes available, and whether a model with a delayed or uncertainty-aware update behaves better. This tests the downstream cost of a binding failure, not just the accuracy of a final report.

### The time of interruption

An interruption can arrive before binding, during binding, after binding but before global transfer, or after a world-model update. The four cases should not be collapsed into one average score.

Before binding, the local processor may never form the correct relation. During binding, it may preserve some features but lose their association. After local completion, the representation may be intact but unable to influence the workspace. After global update, the effect may concern memory continuity rather than the formation of the relation.

A simple experiment can place identical interruptions at predetermined offsets relative to the onset of an ambiguous stimulus. To avoid giving one model a different observation history, the intervention should target internal computation or communication rather than remove an external frame. Each trial should have an unperturbed twin with the same data and random conditions.

The experiment should track local decodability, global content availability, and action outcomes separately. If the correct conjunction remains locally decodable but cannot affect a later decision, the problem belongs to access. If it disappears from local state, the binding process was disrupted. If the workspace holds the correct conjunction yet the action is wrong, a downstream planner may be responsible.

This decomposition makes the timing hypothesis more precise. It also makes a negative result useful. The proposed deadline might prove irrelevant once the generic model receives enough state and compute, or the vulnerable interval might not align with any fixed clock. A theory that treats these outcomes as disconfirmation will be more valuable than one that redescribes every failure as hidden consciousness.

### Why action changes the test

A static classification score gives only part of the story. A real agent uses bound features to choose actions that alter the next observations. A robot that confuses a red warning indicator with a green one can make an irreversible mistake before the correct pairing is eventually recovered.

An action-based benchmark could assign different costs to wrong conjunctions. Sometimes waiting has little cost. Sometimes a decision must be made quickly. The controller should trade integration time against expected consequences rather than simply maximize accuracy at the end of the trial.

This makes the problem richer but also introduces a new confound. A model may win because its decision policy is better, even if its perceptual binding is not. To isolate the mechanisms, evaluate binding accuracy before introducing action costs, then keep the perception module fixed while comparing decision policies, and only afterward test their joint adaptation.

The sequence is methodologically expensive. It is also the only way to know whether a claimed timing advantage belongs to the binder, the selector, or the planner.

Schönemann and colleagues supplied a carefully measured relationship between visual alternation, recurrent dynamics, and behavioral binding performance. CHORD can turn that into an intervention protocol, but not into a borrowed verdict. The experiment must show which part of an artificial system fails when temporal integration is interrupted, and why simpler alternatives do not explain the result.

## A result that asks for restraint

The Schönemann study was published after the original TACH-6 experimental protocol. It is therefore a legitimate source for a *new* experiment, not a justification for rewriting the old result to make it seem stronger. The protocol already separated representational remapping from temporal access. Recurrent-binding deadlines deserve their own branch of investigation with a dated hypothesis and independent controls.

The primary forecast is simple enough to fail: when a new representation interrupts an unfinished recurrent-binding process, feature-conjunction accuracy should degrade more than simple feature detection, even if the same evidence was available to the model. A second forecast is that the decline should track the model's measured integration completion time, not an arbitrary human-derived frequency. A third is that a sufficiently expressive nonrhythmic control may match the effect, which would reject any claim that periodic gating is necessary.

A positive result would support a mechanism for computational temporal binding. A negative result might show that simpler recurrence, probabilistic inference, or adaptive resource allocation fully explains performance. Either is scientifically valuable.

The larger question—why any of these operations should be accompanied by subjective experience—remains untouched. That is not a failure of the experiment. It is an honest description of what the instrument can measure.

The brain supplies rhythms, local computations, feedback, and slow integration. The task is to discover which relationships are causally necessary for flexible cognition. The clock on the wall, or in a line of code, will not decide that for us.
