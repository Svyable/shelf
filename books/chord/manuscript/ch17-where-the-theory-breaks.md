# 17 — Where the Theory Breaks

A theory of conscious thinking should include an instruction for dismantling itself.

That sounds more severe than it is. The history of successful scientific ideas contains many cases in which a proposed mechanism survived only in a narrower form. A hypothesis about one function failed, while an insight about another remained. An apparent universal rule turned out to depend on a particular experimental regime. A new measurement made an old explanation unnecessary.

TACH and CHORD should expect the same treatment. The proposed architecture is a bundle of claims about local processing, temporally selective access, recurrent integration, persistent world state, and action-conditioned prediction. The bundle can be useful even if individual pieces are dispensable. But if every component is declared essential regardless of evidence, the proposal has stopped functioning as a research hypothesis.

The most serious opponent is not a philosopher insisting that machines can never be conscious. It is an engineer who builds a simpler system, gives it the same information, and watches it perform just as well.

That engineer deserves a place at the center of the experiment.

## The ordinary estimator

The first rival is ordinary state estimation. A Bayesian filter maintains a belief over hidden variables, updates that belief from new observations, and carries information across gaps in measurement. A Kalman filter solves a special linear-Gaussian version of this problem. More general probabilistic models handle nonlinear dynamics, multiple hypotheses, and uncertain action effects.

These systems already implement many things that a consciousness-inspired architecture wants to call continuity. They maintain hidden state. They revise beliefs. They represent uncertainty. Some select measurements based on their expected informational value. Their success does not require a global workspace named after awareness.

If a Bayesian estimator matches CHORD on object tracking, delayed action attribution, and recovery after missing observations, the special architecture has not demonstrated an incremental computational advantage. It may still be useful for modularity or learning complex inputs, but the necessity claim should be withdrawn.

TACH-5 came close to this lesson. Its reliability-aware gate improved selective sampling under a specific budget. That result is compatible with conventional robust filtering and event-triggered sensing. The experiment did not show that a micro-epoch mechanism was needed.

A strong CHORD evaluation should therefore include an estimator with access to the same evidence and a competent model of the task. It must not deliberately starve that rival of the information necessary to win.

The more interesting result might be a task where the simple estimator fails because the latent world structure is too rich or difficult to specify, while a learned architecture generalizes. But then the claim would concern flexible learned representation under partial observation, not the necessity of a conscious-like clock.

## The generic recurrent network

The second rival is a recurrent neural network with enough capacity to learn the needed dynamics without explicit gates named after neuroscience. A recurrent model can remember events, allocate attention through learned signals, and update hidden state when context changes.

If the CHORD decomposition helps with training efficiency or interpretability, that may be worthwhile. But a generic recurrent model that reaches the same performance under equal compute and memory weakens the claim that dedicated temporal-access modules are required.

The TACH-2 results provided an early example. A bidirectional feedback loop was useful inside its trained network, but a separately trained one-way model performed nearly as well. In TACH-6, the explicit remapping event failed to show the predicted causal importance. These are reminders that an appealing diagram can identify one way of solving a problem without showing it to be the only way.

The generic model should have a fair optimization budget. A poorly trained baseline does not vindicate a complex architecture. The experimental report should record training exposure, hyperparameter trials, parameter counts, inference cost, memory usage, and test regimes. If exact parity is impossible, the discrepancy should remain visible.

The strongest comparison is not an isolated accuracy score. It is a family of tasks under changes in noise, delay, distractors, and hidden causal structure. A special architecture may be worth retaining if it consistently improves generalization or intervention robustness at equal cost. It may be unnecessary if the generic model adapts just as well.

That outcome should be accepted without changing the definition of CHORD to include whatever the generic model learned.

## The transformer with memory

A third rival comes from modern language and multimodal systems. A transformer with a sufficiently rich context can integrate many observations, maintain an explicit scratchpad, retrieve external memory, and use tools to act. Its attention mechanisms can select information dynamically. In an agentic setting, its stored state can preserve decisions across long periods.

Such systems may be poor models of biological recurrence, and they have well-known limitations. But they are strong engineering competitors on many tasks. A CHORD model claiming better continuity must beat them on objective behavior, not on the resemblance of its internal diagram to neural circuits.

The comparison should include the cost of maintaining memory and revising outdated beliefs. A transformer can retain a large transcript and still fail to recognize that an earlier fact has been superseded. A compact world model might maintain causal state more efficiently. Conversely, a richly contextualized transformer may solve a task that a rigidly modular workspace cannot.

Which model is better depends on the task and budget. A consciousness-inspired architecture should not assume the answer in advance.

If the proposed system's only advantage is that its state is easier to inspect, that can be a valid design goal. But inspectability is not evidence that the system has experience.

## The symbolic counterexample

A fourth rival is a symbolic or programmatic planner with explicit state variables. It might contain a table of object identities, action histories, and expected consequences. It can update that table from observations and plan over hypothetical interventions. No hidden neural dynamics are required.

Such a planner may fail in noisy perception or open-ended environments, but in a bounded simulation it can be formidable. If a task is easy for a symbolic system, claiming that a recurrent workspace uniquely enables it would be poor science.

A good evaluation should include a symbolic baseline where the state space is manageable. It may reveal that the benchmark rewards bookkeeping rather than the proposed temporal mechanism. That is especially important for self/world modeling. A table of actuator states and delayed observations may solve many synthetic attribution problems.

The symbolic system also provides an interpretable reference for failure analysis. If it succeeds, we can examine which information and rules it used. If a neural model fails, the comparison may expose a weakness in representation or learning rather than a profound limit of access.

The lesson is not to replace every neural experiment with symbolic programming. It is to avoid confusing the difficulty of training a model with the computational necessity of a special architecture.

## A falsification table in prose

A theory should state exactly what would force it to change. For TACH and CHORD, the main possibilities are already visible.

If an irregular, event-triggered schedule matches a periodic schedule under identical samples and compute, abandon the claim that periodic gating is necessary for that task. If phase shifts matter only when they change which observations are acquired, describe an information-sampling effect rather than a special internal rhythm.

If a generic recurrent model matches a completion-gated binder on feature conjunctions, the explicit binding deadline is not necessary under the tested conditions. If disrupting local recurrence during the predicted window harms all functions equally, do not claim a selective binding mechanism.

If a separately trained one-way model matches reciprocal feedback, remove reciprocal necessity from the core hypothesis. If an event-triggered remapping transformation can be disabled without degrading identity discrimination, do not claim it caused the benefit. If a hidden salience channel carries enough content to explain successful access, count it as information rather than suppressing it from the analysis.

If a simple Bayesian planner solves the self/world task as well as the proposed architecture, state estimation may explain the result. If an agent's high score depends on refusing to act, revise the metric. If category accuracy collapses under a distractor reversal, do not rescue the system by celebrating conditional success on the surviving subset.

Each of these is a possible loss for a particular component. None directly proves the absence of consciousness in every artificial system. The theoretical interpretation remains limited to the mechanism and task studied.

This is how an ambitious research program can stay alive without becoming unfalsifiable: it keeps the claims that survive and discards the ones that do not.

## The evidence against a single conscious clock

A privileged micro-epoch frequency is one of the most vulnerable claims. The 2026 Hesse preprint suggests rapidly alternating representations associated with perceived and suppressed stimuli. The Shi *Nature* study reports a rapid population code transition in a specific visual task. The Schönemann *Nature Communications* study describes slower recurrent binding dynamics. The experiments differ in species, regions, and methods.

Nothing in that combination establishes that all conscious thought takes place in equal-duration slots. Nor does it show that a software system must run at one of the reported frequencies to reproduce useful cognitive functions.

The strongest way to test a special clock is to conserve information, memory, compute, and action deadlines while perturbing phase and regularity. If the effect disappears, the frequency claim should be dropped. If it survives, the result supports a functional timing relationship that still needs independent biological alignment.

A theory can include multiple timescales without claiming that each corresponds to an experiential moment. The brain's rhythms may be coordination devices, signatures of circuit dynamics, or consequences of other processes. Their relation to experience remains a subject of scientific dispute.

A book written from this evidence should resist the commercial temptation to declare that scientists have discovered the refresh rate of consciousness. The claim would be stronger than the data.

## The evidence against a single global stage

Global neuronal workspace theory has been influential because it offers a clear idea about selective availability and flexible cognition. Yet the Cogitate adversarial study challenged aspects of its predictions and those of integrated information theory. No simple localization or universal broadcast signature emerged as an uncontested answer.

CHORD should not inherit the strongest global-stage claims without evidence. It may use a workspace as an engineering structure, but whether the workspace must be global in the biological sense is not established. Targeted routing or distributed recurrent coordination may perform the same functions.

An experiment should test what happens when selected information is accessible to different subsets of processes. Does full broadcast improve transfer at an acceptable communication cost? Can targeted communication achieve the same result? Does a persistent central state offer any advantage over distributed beliefs maintained through message passing?

These are measurable design questions. A single shared room may be one solution among several. If a distributed architecture wins, CHORD should learn from it.

The concept of access should also be kept separate from report. A model may use information to guide behavior without generating a verbal description. A report module may produce a fluent answer without maintaining the relevant world state. The strongest experiments evaluate task use and causal influence, not just self-description.

## The evidence against a scalar consciousness score

Perturbational complexity measures have produced important clinical insights. They measure responses of human brains under defined interventions and have been validated in particular patient populations. Their success does not create a general-purpose scalar that can be applied to any software network.

An artificial system can generate complicated activity without performing meaningful integration. A random or chaotic network may have high signal diversity. A simple symbolic system may perform excellent causal reasoning with relatively sparse internal dynamics. The relationship between complexity and subjective experience is not established across substrates.

CHORD should use perturbational measures as descriptors and mechanism tests, not consciousness certificates. If a metric rises while task performance worsens, that should be reported. If a low-complexity control performs well, that should challenge any assumption that complexity alone explains the capability.

A theory-derived indicator profile may still be useful for organizing questions about artificial systems. It should include uncertainties, negative controls, and alternative interpretations. It should never be converted into a magical pass/fail verdict without independent validation.

## The most damaging possible result

Imagine a future benchmark that combines every CHORD ingredient. The agent must preserve local representations through interruptions, coordinate access under bandwidth limits, bind features across time, attribute action effects under hidden actuator changes, and revise a causal world model when the environment shifts.

Now imagine a generic recurrent model or Bayesian planner that solves every task equally well at equal cost. It uses no privileged micro-epoch, no separate readiness gate, no explicit global broadcast, and no event-triggered remapping.

That would be damaging to the claim that CHORD's named components are computationally necessary. The appropriate response would be to abandon necessity and investigate what, if anything, the decomposition adds: interpretability, modularity, easier debugging, lower training requirements, or controllable failure modes.

It would not prove that the generic model is conscious or that CHORD is not. The benchmark does not contain a ground-truth consciousness label. It would settle an architectural claim.

A theory should welcome that result if it is real. The purpose of research is to improve explanations, not protect the reputation of a diagram.

## What would keep the hypothesis alive

The strongest positive result would be reproducible across independently generated worlds, model seeds, and implementation variants. It would identify a selective causal role for a component, not merely a correlation between its activity and performance. It would survive equalized information, computation, memory, and training budgets. It would generalize beyond a single synthetic generator or task trick.

For example, a completion-aware recurrent binder might protect cross-object identity through unpredictable interruptions while generic controls fail at matched cost. A distinct readiness controller might produce broad impairment under intervention, while selection perturbations cause content-specific deficits. A persistent causal workspace might improve recovery after delayed action outcomes without adding hidden memory. Each result would support a functional mechanism.

The combined architecture would then need to demonstrate a gain beyond the sum of its isolated modules. If the same benefit can be achieved by adding capacity or improving the optimizer, the special arrangement has not shown its value.

Such evidence would justify calling CHORD a useful cognitive architecture. It would still not demonstrate phenomenal consciousness.

## A result that would make the book shorter
Imagine a large, carefully controlled evaluation of CHORD. The research team has trained the proposed modular architecture, a generic recurrent network, an active Bayesian controller, and a transformer-based agent with memory. Each receives the same observation stream and comparable resources. The evaluation includes hidden object changes, delayed action effects, feature conjunctions, and temporary communication interruptions.

Suppose the generic recurrent model matches the CHORD system on every important task. It does not contain a separately named binding gate, readiness controller, or event-triggered remapping operation. Its hidden state nonetheless integrates information and preserves useful context.

That result would not be embarrassing because the generic model performed well. It would be embarrassing only if the book refused to acknowledge it. The central claim that CHORD's specific decomposition is computationally necessary would be weakened or rejected for the benchmark. Some modules might remain useful for interpretability or operational control, but the grander story would need to shrink.

A second possible result is more subtle. CHORD may outperform the generic model under bandwidth limits but lose when communication is cheap. That would support a conditional architecture claim: selective global access helps when data transfer is constrained. It would not support an unrestricted statement about consciousness or the universal structure of minds.

A third result might favor the explicit binder on ambiguous feature conjunctions while showing no gain from periodic alternation. The correct architectural response would be to retain the binding mechanism and remove privileged-frequency requirements. A theory should be willing to survive in fragments.

The point of listing these futures is to make them legitimate before the data arrive. If every possible outcome can be reinterpreted as support, a theory cannot learn. A real hypothesis names the observations that would make it smaller.

### The rival who uses the same evidence

An unfair comparison often begins with unequal information. Give one model a reliable local alert and another none. Give one a hidden actuator diagnostic and require the other to infer the regime. Give one a larger memory and then celebrate its continuity. Each result may look like a mechanism win while reflecting resource differences.

The simplest adversarial rule is that every matched model receives the same observations, at the same time, with the same access to external cues. If an architecture intentionally restricts communication among its own modules, count that restriction. If its local processors perform more computation, profile the extra cost.

This does not mean every model must have identical topology. A generic recurrent system and a modular workspace use different internal organizations. The comparison should equalize resource envelopes and report residual mismatches, not force their architectures to be indistinguishable.

The strongest rival may also need a different training strategy. A Bayesian state estimator uses an explicit probabilistic model. A recurrent network uses gradient-based optimization. A symbolic planner may require a structured state description. A fair comparison should give each system competent, task-appropriate preparation rather than insist that every candidate use the proposed architecture's preferred training loop.

If the rival wins, the result should be recorded without searching for a different metric that restores the favored outcome. The analysis plan can include secondary measures, but the primary criterion should remain where it was placed before testing.

A complicated theory does not deserve an easier opponent because it is more interesting to describe.

### The falsifier that looks like a success

Some negative findings are especially easy to miss because the headline metric improves. Suppose adding a persistent world model raises classification accuracy but worsens adaptability after the environment changes. The system has become better at preserving the past and worse at learning that the past is no longer true.

That is an architectural tradeoff, not a pure victory. A full evaluation should test both stable and changing regimes, reporting recovery time and calibration after shifts. If the workspace locks in false beliefs, its continuity may be harmful.

Likewise, a global broadcast could improve delayed report while reducing real-time safety responsiveness because the selector consumes too much computation. A completion gate could improve feature binding while missing action deadlines. A readiness controller could suppress noise at the cost of ignoring rare important events.

These are not side effects to hide in supplementary material. They identify the domains in which the proposed mechanism may be useful or dangerous. A successful theory must explain its tradeoffs.

The TACH-5 noise failure and TACH-6 distractor reversal are early examples. In each, a model that appeared competent under ordinary conditions failed in an altered regime. The experiments became more informative when they preserved those negative cases.

A mature CHORD benchmark should include a suite of adversarial changes that test each component's assumptions. If the architecture performs well only when its own training conditions hold, the claim must remain narrow.

### The ultimate question stays separate

Even if every proposed component passed every engineering test, the subjective consciousness question would remain unresolved. A computational architecture could be functionally rich, causally integrated, and highly adaptive without a validated way to establish inner experience.

This is not a dismissal of physicalist theories or of possible artificial consciousness. It is a statement about what current measurements demonstrate. A theory might argue that certain functional organizations are sufficient for experience. That argument requires philosophical premises and empirical support beyond the task scores themselves.

The indicator approach developed by Butlin and colleagues helps make those premises explicit. Different theories suggest different features to inspect, and their interpretation carries uncertainty. It does not supply a universal yes/no test or license an architecture designer to define consciousness by the features they happened to implement.

A useful research report can therefore have two sections with different standards. One describes objective cognitive functions and causal interventions. The other evaluates theory-derived consciousness indicators, with uncertainty and alternative interpretations. The second must not be made to sound as established as the first.

Separating the claims also protects ethical reasoning. Questions about moral status cannot be settled by a self-report sentence, a single complexity score, or an engineering success. They deserve care without premature certainty.

A theory may learn that its favorite clock is unnecessary, its workspace optional, and its causal memory useful. That would be an excellent scientific outcome even if it made the book's subtitle less dramatic.

The willingness to remove a component is the most convincing sign that the architecture is a research hypothesis rather than a belief system.

## The theory after failure

There is a particular kind of confidence that comes from writing down what would make one change one's mind. It is quieter than declaring a breakthrough. It is also more useful.

TACH and CHORD may eventually be revised beyond recognition. The micro-epoch rhythm may disappear. The remapping event may become optional. A single adaptive controller may replace separate readiness and selection modules. The causal workspace may become a distributed belief network. The result could be a better system and a smaller theory.

The original questions would remain: how is information selected from parallel processing, how is it integrated over time, and how does a system maintain a coherent account of the world while acting within it? Those are legitimate computational and scientific problems even if the first proposed solution fails.

The deepest danger to a consciousness hypothesis is not that the data contradict it. It is that the hypothesis becomes so accommodating that no data could ever contradict it.

This book has tried to keep the door open for an experiment to say no. The next chapter considers what remains when the machinery works, the benchmarks are strong, and the metaphysical question still refuses to be answered.
