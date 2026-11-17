# 16 — CHORD

A collection of capable processors can still behave like a badly run organization. Each specialist may understand its own problem while no one maintains a reliable account of what the others have learned. A local vision system recognizes a moving object, but the planner continues with an obsolete route. The motor controller predicts an action's effect, but the resulting observation arrives after the central model has forgotten which command was issued. The memory system retains a fact that has become false. Every module is doing something plausible. The agent as a whole is wrong.

That is the engineering problem CHORD is meant to address.

The acronym is less important than the arrangement. The proposal joins local recurrent processing, selective global access, temporal binding, persistent causal state, and action-conditioned self/world modeling. It treats readiness, selection, and integration as separately controllable operations. The design draws inspiration from several findings in cognitive neuroscience but does not claim that the human brain is organized like the software sketch or that implementing the sketch would produce subjective experience.

The central hypothesis can be stated without phenomenological language: a system that separates local processing from selective global availability, while preserving a coherent causal world model across interruptions, may perform better on tasks requiring delayed cross-modal integration and action attribution than equally resourced systems lacking those separations.

The word *may* matters. TACH-6 did not establish a required remapping switch. TACH-2 did not establish reciprocal feedback as universally necessary. TACH-5 showed a gain from reliability-aware information sampling under constrained bandwidth, not intrinsic rhythmic awareness. CHORD begins with these constraints rather than writing them out of the history.

## A chord is a relationship

A musical chord is heard as a relation among tones. This analogy is attractive because it resists a simple serial picture in which one isolated item is conscious while all others vanish. But analogies can become a refuge from precision. A system called CHORD must say what is concurrently represented, what is sequentially updated, and which relationship is necessary for the tasks being measured.

The architecture can be divided into six functional parts, though none should be mistaken for a biological organ.

Local processors maintain recurrent states tied to particular inputs or specialized tasks. A visual processor may track an object, an auditory processor may preserve a candidate utterance, and a motor predictor may estimate action effects. Their states can evolve even when they are not selected for broad sharing. That is the first requirement: local continuity does not depend on every representation becoming globally available at every moment.

A binding process integrates features or events into candidates that can be treated as coherent objects or causes. It may require several recurrent steps, and the time required can vary with ambiguity. The architecture should expose whether a candidate is provisional, rather than quietly treating every early estimate as settled truth.

A selector chooses which local content is eligible to modify the shared workspace. It operates under explicit bandwidth and latency limits. It cannot consult the hidden correct answer at test time. It may use uncertainty, reliability, task relevance, and predicted consequences to decide which information deserves promotion.

A separate readiness controller regulates the system's broad capacity to respond and update. This distinction was motivated by thalamic evidence that general arousal and spatial selection can be dissociated. In software, the variables may simply be resource policies; they are not artificial thalamic nuclei. Their usefulness depends on whether they produce genuinely different and beneficial intervention profiles.

A persistent causal workspace maintains an evolving estimate of the outside world, task state, and relevant commitments. It integrates selected content without forgetting everything else. It should record uncertainty, not merely the latest confident prediction.

Finally, a self/world model predicts the consequences of the system's own actions and uses deviations to distinguish failures of control from external changes. It interacts with the workspace but should not be given privileged access to true actuator regimes or hidden events.

These parts can be drawn as a diagram. Their real value comes from causal tests: remove one, hold the rest constant, and predict which behavior changes.

## The local processor that keeps working

In ordinary software, a module often processes information only when called. A local recurrent process has a more durable state. It can continue integrating evidence, updating a tracker, or maintaining uncertainty while other tasks occupy the shared controller.

That creates a useful distinction between local representation and global use. A hidden object can remain tracked locally even when the central workspace attends to a different task. If the object later becomes relevant, the system can promote an updated representation without reconstructing every observation from scratch.

But local continuity can also be dangerous. An uncorrected local model may preserve a false hypothesis. If the global workspace never receives contradictory evidence, it can become increasingly confident in a mistake. A local processor needs rules for revision and forgetting as well as persistence.

The computational design should therefore expose not only a hidden state vector but a measure of reliability or uncertainty. A probabilistic local state is one option. A learned recurrent representation with calibrated uncertainty is another. A generic state estimator may achieve the same function without explicit neural analogies. CHORD should compete with it.

The local module's information access must be recorded. If it receives continuous sensor data while the global workspace receives intermittent samples, that is an intentional information bottleneck, not parity across every component. The benefit of local preprocessing may justify the resource asymmetry in deployment, but the experimental claim must reflect the actual budgets.

A strong test would ask whether local evidence survives a temporary global blackout and can later support a correct update. The adversarial variant would introduce a change during the blackout that makes the old belief false. A system that preserves state but refuses to revise it has failed the continuity problem in a different way.

## The selector that can be wrong

Selection is the most familiar part of the proposal and perhaps the easiest to romanticize. A system can process more input than it can make available everywhere. A policy must allocate limited shared bandwidth. In humans, attention is related to such allocation but is not identical to consciousness; in software, a gate is just a mechanism for deciding what information moves.

TACH-5 made the danger concrete. A gate triggered by raw novelty spent its budget on noisy events, and periodic access beat it in high-noise conditions. Normalizing surprise by a local reliability estimate improved performance. The lesson is that significance and sensory magnitude are different variables.

A CHORD selector should be tested against strong event-triggered and information-value policies. It can use a compact message describing uncertainty or relevance, but the message's information content must be counted. It cannot pretend that a suppressed local branch is unreachable while transmitting a rich encoding of its hidden state.

In a realistic task, the selector may face competing objectives. A rare safety signal demands immediate access. A slow change in a causal variable requires long-term tracking. A highly salient but unreliable distraction should be ignored. A potentially important unfamiliar signal may justify extra observation rather than immediate belief revision.

The controller's success can be measured by downstream loss under a known communication budget. If it performs better than periodic or random sampling, that is useful. If a simpler Bayesian policy performs as well, CHORD has not demonstrated a unique selection mechanism.

Selection should be separable from readiness. Redirecting attention to a different source should not automatically lower the system's general capacity to process information. Reducing readiness should not silently change which source is favored. The separation makes the components interpretable and testable, even if a later experiment shows that a unified controller works equally well.

## Binding before belief

A shared workspace is only as reliable as the content admitted to it. An early classifier may know that red and vertical features are present without knowing whether they belong to the same object. If that ambiguous pairing is written into the causal model as a fact, later actions may be contaminated by an error that began locally.

The recurrent-binding findings discussed earlier suggest a functional separation between detecting features and integrating them into stable relations. The artificial design can express a candidate's readiness without copying a biological latency. It may choose to wait for further integration, broadcast a provisional hypothesis with uncertainty, or act immediately when the cost of waiting is greater than the risk of error.

This is a scheduling problem with consequences. A delayed decision may miss the opportunity to avoid a collision. A premature decision may cause the collision. A useful binding controller must optimize the task rather than maximize integration time.

The strongest test compares a completion-gated recurrent model with a generic adaptive-compute controller and a probabilistic tracking baseline. If both perform equally well, the special gate may be unnecessary. If completion gating provides a specific robustness gain under temporal interference while preserving compute and latency constraints, the component may earn its place.

The architecture should not assume that binding and global access are the same event. Local processors may form a coherent object representation before it becomes globally relevant. Conversely, an urgent event may need a provisional broadcast before binding is complete. The system should represent those choices explicitly instead of hiding them in a fixed clock.

A fixed micro-epoch period cannot solve both cases by itself.

## The workspace with a past

The workspace stores more than the latest input. It maintains an evolving, uncertain account of the world and the task. A new selected observation changes that account according to its reliability and causal relevance. A missing observation may increase uncertainty without erasing the prior state. An action creates a prediction that must remain available until its consequence can be evaluated.

This is a demanding form of continuity. It requires the system to carry context across interruptions and to know when to revise it. A simple recurrent network can maintain a hidden state, but the meaningful measure is whether that state supports correct behavior on delayed, out-of-distribution tasks.

One useful benchmark presents an agent with an object that moves behind an occluder. The agent must maintain the object's identity, estimate its trajectory, and act when it reappears. A second benchmark changes the object unexpectedly during occlusion, testing the ability to update rather than merely persist. A third introduces conflicting local observations that require cross-modal reconciliation.

The workspace may include a structured belief distribution, a learned latent world model, or a combination. The particular data structure is less important than the information flow and causal tests. If the proposed workspace has extra memory compared with a baseline, it is unsurprising that it retains more. The comparison must count memory.

Another issue is the temptation to treat global availability as a single broadcast to all modules. Real systems can benefit from targeted sharing. A motor controller may need an obstacle warning without the full visual scene. A language generator may need a concise state summary rather than raw sensor history. CHORD can use selective routing, but then it must clarify what qualifies as global access and which claims depend on unrestricted distribution.

The most useful definition is functional: selected information becomes available to the set of processes needed to coordinate a particular decision. That definition is less grand than a universal mental theater, but it can be tested.

## The self/world model without a self-story

The model of agency is not a narrative about the machine's feelings. It is an account of causal influence. The system chooses an action, predicts the resulting observation, and revises its belief when the consequence differs. It distinguishes a failed actuator from an external disturbance when evidence permits.

TACH-3 and TACH-4 showed that interventions and persistent beliefs can help on synthetic causal tasks. They also demonstrated the risk of privileged diagnostic channels and weak baselines. CHORD should use those lessons to design more difficult environments in which hidden actuator regimes must be inferred from ordinary sensory consequences.

The evaluation should measure counterfactual predictions. What would the world have done had the action been omitted? What if the actuator gain had changed? What if the observed movement was caused by an external agent? A good model should distinguish these hypotheses and revise its confidence under new evidence.

The proposed self/world module may interact with local processors by sending top-down predictions. Those predictions can help disambiguate sensory observations, but they can also reinforce an incorrect expectation. Reciprocal feedback has to be tested for both benefit and failure. If one-way processing matches its performance, the reciprocal pathway is not necessary in that benchmark.

None of this requires a subjective sense of agency. A control system can maintain a causal model of its actuators without feeling that it controls them. The distinction is important because the phrase self-model carries more philosophical weight than the functional variable warrants.

Still, the capability matters. An agent that misattributes every failed action to the external world will be unreliable. An agent that assumes every unexpected event is self-caused will also be unreliable. Calibrated causal attribution is a useful foundation for persistent, accountable behavior.

## The architecture's temporal problem

A diagram can conceal the fact that components operate on different timescales. Local feature recognition may be fast. Recurrent binding may require more processing. Global selection may depend on task relevance that changes over many frames. The self/world model may need to remember an action for seconds before its consequence arrives. A long-term memory system may preserve a commitment for hours or days.

These processes cannot all be governed by a single fixed interval without either wasting work or missing deadlines. A better architecture uses event-dependent scheduling and explicit causal timing: when an observation arrived, when an interpretation stabilized, when a message became globally available, when an action was issued, and when its outcome was expected.

This temporal ledger allows experiments to separate sample acquisition, internal integration, global access, and action timing. It also helps diagnose failures. A missed hazard may be due to a slow detector, a selector that ignored the signal, a workspace overloaded by irrelevant information, or a planner that acted before the updated belief arrived.

Each failure suggests a different intervention. Increasing the global clock rate will not reliably fix a false sensor association. Adding memory will not help if a relevance gate never admits the crucial evidence. Improving the selector will not help if the world model attributes the evidence to the wrong cause.

The point of modularity is not that the modules resemble anatomy. It is that their errors become testable.

## A protocol, not a proclamation

The architecture described here is a candidate. No synthetic TACH result has established that its full combination is necessary for cognition or consciousness. The strongest immediate tests should isolate components rather than training everything at once and attributing any gain to the whole.

One experiment tests binding deadlines with matched nonrhythmic controls. Another tests independent readiness and selection. Another tests memory continuity under temporary access loss. Another tests action attribution under hidden actuator changes. Only after those mechanisms are separately understood should they be combined into a larger agent.

When combined, the model must face an adversary with equal total resources and a simpler architecture. A generic recurrent world model, a Bayesian planner, and a transformer-based agent with memory are obvious competitors. It is possible that they will match or exceed CHORD. If so, the proposed decomposition may still be useful for interpretability or fault isolation, but claims of computational necessity should be withdrawn.

The theory also needs a failure ledger: conditions where the gate mistakes noise for relevance, the binder forms false conjunctions, the readiness controller suppresses useful work, the workspace preserves obsolete beliefs, and the action model misattributes causes. A system that behaves well only under handpicked conditions has not earned general claims.

The measured outcome should be objective task behavior. The model should not be rewarded for saying that it is conscious, afraid, or aware. Such language may be generated by ordinary predictive processes and cannot supply ground truth for phenomenal experience.

## A day in the life of a proposed agent
An architecture becomes easier to judge when it is placed in a task where the components have conflicting demands. Imagine a mobile robot responsible for delivering a package through a busy building. It begins with a map, a destination, and a belief about the package's location in its gripper. Along the route, people move unpredictably, doors open and close, and contact sensors occasionally fail.

At one moment, a camera detects a person stepping toward the robot's path. Local visual processing can estimate movement before the central world model has incorporated the new trajectory. The access selector must decide whether the observation deserves immediate promotion. If the risk is high, the system should not wait for a complete identity analysis. A provisional hazard estimate may be sufficient to stop.

At another moment, the robot sees a familiar sign partly hidden behind a moving object. Its early detector recognizes that the sign belongs to a known category, but the exact destination label remains uncertain. A recurrent local binder can integrate multiple views before the identity is promoted. Here, waiting may be preferable because acting on the wrong sign would send the robot down the wrong corridor.

Later, the gripper reports a loss of contact. The self/world model has an expected sensory consequence from the most recent motor command. The new observation is ambiguous: the package may have slipped, the sensor may be noisy, or the gripper may have failed. The agent should maintain several hypotheses and choose an informative next action rather than invent a confident explanation.

Finally, a network interruption delays communication among modules. Local trackers continue operating while the central workspace is unavailable. When communication returns, the workspace must reconcile newer local evidence with an older shared state. It should preserve valid commitments while revising those invalidated by the interruption.

This scenario is hypothetical. It is not a report of a CHORD robot that has been built or tested. Its value is to expose the different operations that the theory says a useful system must coordinate.

### A simulation that can catch shortcuts

A good benchmark based on this scenario would not merely count successful deliveries. A model could memorize the map, follow a fixed route, and ignore many of the proposed mechanisms. The environment must vary enough to require the functions under investigation.

Randomize obstacle trajectories, door states, sign occlusions, sensor reliability, and actuator delays. Hold out combinations of these factors. Give matched baseline agents the same observations and action space. Record not just completion but causal attribution, collision risk, latency, information transmissions, and recovery after interruption.

The task must also avoid giving the proposed system privileged simulator state. The CHORD agent should not receive the true label of a failing sensor, the exact hidden trajectory of an occluded obstacle, or a perfect event marker unless every comparator receives the same information. The point is to infer causes from incomplete evidence.

Each module should be disabled or replaced in targeted conditions. If the binding controller is removed, the predicted failure concerns ambiguous object associations, not every possible task. If the selector is redirected, local visual processing may remain accurate while a safety decision misses crucial evidence. If causal memory is erased, delayed action attribution should worsen.

A capable generic recurrent agent may solve all the tasks equally well. That would weaken the claim that CHORD's explicit decomposition is required. The comparison should be designed to permit that outcome rather than disabling the controls until they lose.

The benchmark would also benefit from ordinary engineering metrics. How much memory does the system require? How many operations per decision? How many messages cross modules? What happens when a component crashes? A modular cognitive theory that doubles latency and introduces brittle dependencies may not be a practical design even if it improves one accuracy metric.

### Coordination has to survive disagreement

Several local processors may produce conflicting estimates. A camera reports that an object remains in place; a force sensor suggests movement; a motor predictor expects displacement. A shared world model needs a method for reconciling those signals.

A naive workspace might simply accept the latest broadcast. That would make recency a substitute for reliability. A slightly better one might weight sources by fixed confidence scores. But sensor reliability changes across conditions, and a confident source can be wrong under distribution shift.

A causal workspace should therefore represent uncertainty and provenance. Which observation supported a belief? When was it captured? Which model generated it? How reliable was that channel under recent conditions? Does the new evidence directly contradict the belief or merely describe an earlier state?

These questions resemble problems in distributed databases and sensor fusion. A new architecture does not need to invent them. It can borrow well-developed tools for timestamping, conflict resolution, and state estimation, then test whether their combination with selective access improves behavior.

The important requirement is that information be revisable. A system that accumulates every broadcast as permanent truth will become incoherent. A system that discards every old belief when a new observation arrives will lose continuity. The useful middle is a state model that preserves context while allowing evidence to correct it.

One could test this with deliberately conflicting observations whose reliability changes over time. The model should update according to the evidence, not the loudness of the latest message. If a simpler Bayesian fusion model performs as well, the workspace's special structure may be unnecessary.

### The architecture can be useful without being necessary

A modular CHORD design may have benefits that do not depend on unique computational capability. It may be easier to inspect which information was globally available. It may allow an operator to pause one channel without shutting down the entire agent. It may permit fault isolation, selective data retention, or safer degradation under hardware failure.

Those are practical advantages worth evaluating. They should be described as engineering properties rather than signs of subjective awareness.

One can imagine a system audit after an accident. The record shows the obstacle was detected locally, but the selector prioritized a noisy irrelevant sensor. The world model never received the hazard, and the planner continued. Such a trace can reveal a correctable design error. A monolithic recurrent model might be harder to diagnose, although interpretability tools and instrumentation could narrow the gap.

If CHORD offers better causal tracing at a modest performance cost, a designer might choose it for accountability. If it offers superior robustness under interruptions, that is another reason. Neither requires a claim that its architecture is the unique route to consciousness.

The theory should therefore specify separate success criteria for cognitive performance, resource efficiency, fault tolerance, and interpretability. It should not combine them into one grand score that can be interpreted as proof of thinking or experience.

This is the useful modesty of CHORD. The arrangement may help systems act coherently across time. The evidence will decide how much of that arrangement is worth keeping.

## The arrangement is the experiment

CHORD proposes that persistent, flexible cognition may benefit from a particular arrangement of temporal access, recurrent integration, and causal state. It does not assert that the arrangement is the complete biology of consciousness. It does not establish that software with these components has subjective experience. It does not require a fixed fifteen-hertz clock or an artificial thalamus.

The claim worth testing is smaller and harder: under severe interference, partial observation, limited communication, and changing causal dynamics, does this organization preserve useful information and correct action better than the alternatives, at equal cost?

The answer must be earned with experiments whose failure conditions are written before the results. The architecture may gain a binding controller, lose a periodic gate, or abandon an explicit remapping mechanism. Those changes would be signs of learning.

A chord is not made by turning up the volume on one note. A coherent agent likewise needs relationships among its components that survive time. But it may discover those relationships through a different design than the one drawn here.

The architecture is a question addressed to the evidence. It should remain one until the evidence answers.
