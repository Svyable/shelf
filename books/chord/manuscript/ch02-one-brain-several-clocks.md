# 2 — One Brain, Several Clocks

The earliest wave of visual processing does not need to wait for the rest of the brain to finish deciding what an object is. Signals pass from retina to thalamus to visual cortex, through hierarchies of areas whose responses can be measured at different latencies. A rough classification can happen before the scene has been inspected in detail. Later activity changes how the same stimulus is represented.

It would be tidy if the later activity were simply the conscious part. Neuroscience has not been so accommodating. Recurrent processing, report preparation, attention, and memory leave overlapping signatures. A fast feedforward sweep can support substantial discrimination. A later recurrence can sharpen a distinction, bind dispersed features, or correct the earliest guess. The brain's timing is neither a single drumbeat nor a collection of independent stopwatches.

Victor Lamme and Pieter Roelfsema described the distinction between feedforward and recurrent processing in a widely cited 2000 review, [*The distinct modes of vision offered by feedforward and recurrent processing*](https://doi.org/10.1016/S0166-2236(00)01657-X). The review is a theoretical synthesis, not a single decisive experiment. It nonetheless made an enduring point: a cortical response is not completed by the first arrival of an image. Horizontal connections and descending feedback change what neurons represent after the initial sweep.

That temporal structure is essential to the story of CHORD. A machine that receives information can act on an early estimate, wait for a refined estimate, or preserve an old estimate while new evidence is integrated. These are not equivalent decisions. Sometimes speed is worth the error risk. Sometimes the wrong feature combination is disastrous. Sometimes a system must avoid updating a shared world model until local interpretation has stabilized.

Before proposing a special consciousness clock, it helps to ask how many ordinary clocks the task already needs.

## The fast answer and its correction

A feedforward neural network maps input to output through a sequence of transformations. It is wonderfully useful. It is also a misleadingly simple picture of a biological visual system, where local and long-range feedback influence activity over time. In a recurrent computational network, state at one moment affects the next. A single observation can be processed repeatedly, and what is represented at the end may differ from what was represented at the beginning.

The distinction can be made concrete with a task that is almost embarrassingly small. Show a model a short glimpse of an object containing features of two familiar categories. Ask for an immediate classification. Then give it the same evidence but permit more internal processing steps before the answer. If the additional steps improve accuracy, a useful recurrence exists. But the result alone does not tell us whether a specific phase or loop was necessary. A larger feedforward model might obtain the same accuracy with fewer steps. A Bayesian estimator might integrate the evidence more transparently.

This is why a theory of temporal access cannot merely assert that recurrence helps. It has to state what the recurrence accomplishes under what constraints, and which alternatives fail under the same conditions.

Consider an example drawn from visual feature binding. A field contains a red slanted line and a green vertical line, perhaps with the colors or orientations occupying separate spatial locations. Detecting the presence of red is easier than establishing which orientation belongs with red after a rapid alternation. A first sweep can report features while leaving their correspondence ambiguous. A later recurrent process may organize them into a combination fit for discrimination. The fact that both features are present is insufficient if the system cannot assign the right one to the right object.

The problem also appears in ordinary software. A camera reports a red region and a line at an angle. A detector identifies an approaching vehicle. A tracker assigns features across consecutive frames. If the association is wrong, the vehicle appears to jump between tracks or acquire the attributes of a neighboring object. A controller that acts on the corrupted association may brake for the wrong target. None of this requires an account of phenomenal consciousness, but it makes the cost of incomplete binding obvious.

An access mechanism has at least two decisions to make. What evidence may enter the central state? And when is that evidence sufficiently integrated to change the central state? The first is selection; the second is readiness of the content. A single gate might implement both badly. It could broadcast a fast, provisional estimate and overwrite a more reliable belief. Or it could insist on a fixed delay even when the evidence is already unambiguous, making useful action too slow.

The architecture needs to permit a variable deadline. It may sometimes act on an early representation while marking it uncertain. It may sometimes defer the update for additional recurrence. A theory that uses the word micro-epoch should tell us whether a micro-epoch is a period for accumulating evidence, a time slot for global access, a recurrent computation cycle, or an externally imposed simulation tick. Those are different objects.

## The blink that is not an eyelid

The attentional blink is another way to expose the limits of access. In rapid serial visual presentation, participants may identify one target and then miss a second target appearing soon afterward. This is not because the eyes physically close. A sensory item can be presented and processed while its later report suffers.

Claire Sergent, Sylvain Baillet, and Stanislas Dehaene studied the timing of events associated with this phenomenon in a 2005 *Nature Neuroscience* paper. Early visual event-related potentials were present for unseen words, while a divergence around 270 milliseconds and later distributed activation were associated with seen words. Their [original study](https://doi.org/10.1038/nn1549) provides an important example of how access-related differences can emerge after early sensory processing. Its latency is tied to a specific task and measurement; it cannot be exported as a fixed duration of a human conscious moment.

The experimental value lies in keeping the physical stimulus comparable while changing whether it becomes reportable. If early signals are shared by seen and unseen conditions, they do not alone explain the difference in report. A late response might reflect global access, but it might also include the work of deciding and reporting. Better experiments distinguish those possibilities rather than using one latency to erase them.

Now imagine a machine presented with a rapid sequence of letters and required to report two target symbols. Its failure to report the second could arise from an overloaded buffer, a competition mechanism, insufficient memory, a misallocation of attention, or the inability to update its task state while the first target is being consolidated. Each failure has a distinct causal test. Lengthen the delay. Increase buffer capacity. Alter the access policy. Remove response-generation demands. Examine whether the target was locally decoded but not broadcast.

If a particular temporal window is truly essential to the architecture, varying its phase while holding actual input constant should make a specific difference. If the machine performs just as well with an irregular adaptive schedule, periodic access is an implementation choice rather than a proven necessity.

The distinction matters because technical language often slides from a timing signature to a mechanism. A signal observed at 270 milliseconds is a temporal marker. A mechanism explains what must happen between stimulus and report, which interventions disrupt it, and why other timing arrangements would not suffice. The theory must survive changes of task and measurement if it is to claim generality.

## The case against a master metronome

Human neural activity contains rhythms across a wide range of frequencies. Researchers describe delta, theta, alpha, beta, gamma, and others, with boundaries and functions varying by context. Rhythmic activity can coordinate local communication, excitability, movement, attention, or memory. It can also arise from interactions in circuits without serving as an explicit central clock.

From this we do not get a universal rate at which consciousness blinks. That conclusion would require a much stronger chain of evidence: reproducible behavioral and neural effects, causal manipulation of the candidate timing process, and demonstration that the effect is not simply a change in sensory sampling, arousal, or capacity. Even then, the result might establish a biological mechanism rather than a necessary property of every possible mind.

Software can make the temptation worse. A programmer can set a frequency to 15 hertz and claim to have made the machine process the world as the brain does. But the significance of a frequency depends on what it controls. It might schedule attention, open a bus, initiate a recurrent update, flush a memory buffer, or trigger an output. The same number applied to different operations has different computational consequences.

Time is also not free. If a representation requires four rounds of local computation to bind its features, a gate that closes after two rounds may degrade accuracy. If it stays open for eight rounds, it may waste energy and delay urgent action. What matters is the relationship between computational completion and access, not the aesthetic appeal of a number.

Consider two otherwise identical systems. One schedules every access at a fixed interval. The other learns an event-driven policy from uncertainty and task costs. The event-driven system might win by selecting better moments. That is a result about scheduling. It does not prove that irregularity is more conscious than regularity. Conversely, a periodic system might win because its training regimen was easier to optimize, or because a test set happened to align with its fixed sampling windows. Neither finding supports an intrinsic consciousness clock without tighter controls.

One useful design is to keep an explicit ledger of three times: when external evidence arrives, when a local recurrent computation has integrated it, and when a global workspace makes the result available to other processes. These timestamps let the experimenter separate an information-acquisition advantage from a processing-time advantage and a communication-scheduling advantage. Collapsing them into one named phase makes any positive result hard to interpret.

There is a fourth time: when the system acts. A model could have integrated a feature correctly but miss the opportunity to use it. A global update that occurs after an irreversible decision has no causal value for that decision. A good experiment therefore includes downstream actions and their deadlines. An access proposal that improves a retrospective classifier while failing to alter the chosen action has a much narrower claim than one that improves closed-loop behavior.

## A mechanical picture, carefully limited

For computational purposes, we can imagine a local processor maintaining a state vector that changes as new observations arrive. It can receive top-down predictions, compare them with sensory evidence, and revise an interpretation. A separate selector can choose whether some portion of that state is eligible for broadcast. A persistent workspace can incorporate the selected information into a running causal account of the world. An action model can use that account to predict consequences.

This description does not force the local processor to resemble a cortical column, the selector to resemble a thalamic nucleus, or the workspace to resemble prefrontal cortex. Biological analogies can inspire mechanisms and experiments. They cannot validate engineering details by association.

A testable model must specify information flow. Which component can see the raw input? Which can see the hidden state? Which can see a confidence estimate? Can a supposedly suppressed branch affect the workspace through an unsigned salience message? How many bits does that message carry? Can the same evidence be recovered by a control given equal communication bandwidth? How many update steps occur before the model selection? Without a record of these facts, it is impossible to assign credit to temporal organization.

The habit of drawing arrows without counting information has caused trouble in machine-learning research well beyond consciousness. If the proposed architecture secretly receives a label that the baseline must infer, it will appear brilliant. If one model has an additional private buffer, it can remember what the comparator forgets. If recurrent steps are free in one cost accounting and expensive in another, the performance comparison ceases to be about architecture.

TACH's existing protocol tried to guard against these shortcuts. It demanded equal observation sequences, causal trigger decisions, fixed partitions, matched parameter envelopes, and explicit negative controls. These are not decorations around a novel algorithm. They are the conditions under which a new algorithm could actually be said to help.

An important older study reinforces why even biological decoding must be handled carefully. Van Vugt and colleagues' 2018 *Science* paper on thresholds for conscious report examined signal loss and response bias in visual and frontal cortex. It shows that the relationship between sensory evidence, report, and cortical activity is more complicated than a single bright line. [The paper](https://doi.org/10.1126/science.aar7186) is a reminder that changes in report can reflect changes in signal strength and decision criteria, both of which an access theory must model rather than silently identify with consciousness.

An architecture might include a report module, but a report should be a measured task, not a magic indicator. Requiring a verbal answer often changes the computational load. An agent may be capable of maintaining a perceptual representation while failing to describe it in the requested format. It may also generate a fluent description from statistical associations without maintaining the corresponding world state. Separating report from behavior is not optional when the system under investigation can produce language.

## Time, latency, and the price of being wrong

Imagine a robot distinguishing two nearly identical tools on a workbench. The early representation says that an object is a wrench. A later recurrent comparison suggests a specialized fitting tool whose grip is different. The robot could grab immediately or wait for refinement. If the action is easily reversible, speed may be worth the risk. If the tool is about to be used on fragile equipment, a delayed but reliable identification may be preferable.

A useful timing controller must know something about the cost of error. It cannot optimize only recognition accuracy or only latency. It should make different decisions under different risks. Such a controller might resemble a decision-theoretic policy rather than a biological oscillation. That rival explanation has to remain in the experiment.

We could give two models the same observations of ambiguous tools. The first receives a recurrent-binding deadline derived from local uncertainty. The second uses a generic adaptive compute policy. The third uses a fixed number of recurrent steps. The fourth is a larger feedforward model with matched total inference cost. Then we vary the cost of wrong action and the time available. If the particular temporal-access organization helps consistently, its success can be described precisely: it trades latency for error in a useful way under these constraints.

A different experiment asks whether changing the phase of access while leaving the evidence and compute fixed alters downstream choices. That is a harder claim. If the phase effect vanishes after sample conservation, the clock story loses a piece of its foundation. The information-processing story may remain intact.

It is possible that no general-purpose neural architecture needs a fixed micro-epoch schedule. It is also possible that particular recurrent circuits use rhythmic windows to coordinate processing effectively. The biological claim and the engineering claim can be true or false independently. Treating them as a single thesis creates false victories and false defeats.

There is a deeper asymmetry to keep in mind. An animal brain was built through development and evolution under physical constraints. Its timescales reflect conduction delays, cellular dynamics, metabolic costs, and the need to coordinate distributed circuits. An artificial system runs on hardware with very different delays and communication costs. Even if a frequency were causally necessary in one biological circuit, copying its numerical value might be an error. The more transferable object would be a relationship among operations: allow an estimate to stabilize before global use, maintain shared state across interruption, and revise it when counterfactual predictions fail.

We can test those relationships without asserting that the biological system and the machine instantiate the same experience. Doing so is scientifically cleaner and makes engineering results useful to people who disagree about consciousness.

## The experiment that distinguishes a clock from a bottleneck
There is a sharper way to test the chapter's claims than asking whether a recurrent model improves with extra iterations. Construct two problems that look identical from the perspective of overall computational load but require different internal relationships. In one, the correct response depends on accumulating evidence about a single feature over time. In the other, the response depends on binding two features that were detected separately. Both tasks have the same number of observations, the same duration, and the same response deadline.

A generic model with more computation may improve on both. A binding-specific recurrent mechanism should produce a more selective gain on the second task. If a phase manipulation harms feature conjunctions but leaves the accumulation task unchanged, that is more informative than a uniform loss of accuracy. If both tasks degrade equally, the intervention may have reduced overall processing capacity.

To avoid an unfair contest, a parallel feedforward model must receive enough capacity to perform the same calculation in one pass. A Bayesian estimator should also be allowed to maintain a posterior over possible feature assignments. If either competitor succeeds at lower cost, the recurrent mechanism may be unnecessary for the synthetic task even if recurrence plays a genuine role in the biological circuit.

The result of such an experiment depends on the generator. If object identity is trivially recoverable from one input dimension, the proposed binding task has not actually required binding. If every object is perfectly separated spatially, a simple position-based rule may solve the problem. A good data generator should create ambiguous conditions in which the correct conjunction depends on temporal context and cannot be inferred from an unchanging nuisance variable.

These requirements would have caught several familiar synthetic-benchmark mistakes before training. The target factor must be genuinely hidden when the model is supposed to infer it. The nuisance correlations must change under held-out evaluation. The input sequences must be identical across architectures in the primary timing test. A positive effect obtained by giving one model a more informative observation is a sensing result, not proof of a special computation.

The clock hypothesis becomes interesting only when there is a specific predicted relationship between the internal delay and the task's causal demands. An architecture could claim, for instance, that a binding operation needs enough recurrent updates to complete before global promotion. The falsifying intervention would interrupt the computation after one, two, or several internal steps while leaving the external evidence fixed. If conjunction accuracy changes as predicted and simple detection is spared, the result supports a completion-dependent mechanism. The exact wall-clock milliseconds need not resemble those of a human cortex.

### What the attentional blink can and cannot supply

The attentional-blink literature contains an important caution about translating behavioral intervals into architectural parameters. The duration of a blink depends on task conditions, target similarity, attentional selection, and other factors. A laboratory timing signature is not a permanent, universal refractory period. An artificial model calibrated to reproduce a single experiment might simply learn its trial structure.

A better computational test would vary the time at which the second target appears, whether it belongs to the same category as the first, how much decision complexity it requires, and whether the report is immediate or delayed. The goal would be to distinguish suppression of access from failure to encode, failure to maintain, and interference during decision or report.

Suppose a model receives both targets and stores decodable local representations, but one is not available for a later cross-task decision. That supports a claim about routing or access. If the second target was never encoded locally, the failure happened earlier. If the information reaches the workspace but is overwritten by the report process, the problem is not primarily selection. The experimental probes must separate these possibilities.

One could also remove the report requirement on some trials. Rather than asking the model to name the second target, let it use the target to choose a later action while withholding an explicit description until the end. If the action succeeds while report fails, the assessment must account for dissociation between task use and verbal output. The reverse result is also possible: the model may generate a plausible description while acting on the wrong state.

The human literature makes these distinctions difficult because neural signals, attention, and subjective reports are entangled. Software permits more direct inspection, though its hidden representations remain high dimensional and not always easily interpretable. The ability to inspect them does not turn the model into a subject; it makes the computational problem easier to decompose.

### Why operational time matters more than milliseconds

A distributed software system has several definitions of time. Wall-clock time measures elapsed seconds. Logical time orders events by causal dependency. Processing time measures computation consumed. Event time records when an external observation originally occurred. An access architecture that mixes these quantities can produce convincing but meaningless phase plots.

Imagine an observation captured by a camera at 10:00:00.100 and delivered to a remote model at 10:00:00.250. The model processes it for 20 milliseconds and broadcasts a summary at 10:00:00.280. The apparent latency from the broadcast to the next action depends on network and scheduling delays, but the information itself describes a world state from 180 milliseconds earlier. A controller that treats arrival time as observation time may reason about a scene that no longer exists.

Biological nervous systems also contend with conduction delays and sensory integration windows, but the implementation details differ. Copying a 120-millisecond neural binding latency into a server does not solve an event-time problem. An artificial agent needs timestamps and a method for propagating uncertainty about stale evidence.

For CHORD, a useful temporal ledger would record the capture time of evidence, the local processing interval, the time content was admitted to the shared workspace, and the action deadline. It should distinguish a late report about an old event from a timely report about a current event. This bookkeeping becomes critical when actions and observations are asynchronous.

A good experimental protocol can manipulate these delays separately. Introduce communication latency without changing the local recurrence. Delay local computation without changing the sensor capture time. Shift the global access window while preserving the same content. The pattern of failure helps locate which clock matters. If the proposed architecture's special rhythm adds no benefit once these ordinary delays are modeled correctly, the clock has not earned a privileged role.

That result would not make temporal organization unimportant. It would make time more concrete, measured in causal relationships and task deadlines instead of a number borrowed from a brain recording.

## The clocks do not give a verdict

The scientific value of recurrence is established enough to make it a serious design primitive. The claim that a particular recurrent event is identical with experience remains contested. The scientific value of temporal selection is plausible and sometimes measurable. The claim that conscious thought consists of discrete software-like micro-epochs goes further than the evidence.

A book about this subject has to tolerate that lack of closure. It cannot solve the hard problem by putting a timestamp on a diagram. But it can move the mechanical argument forward. It can ask when information enters the system, how long it takes to bind, what qualifies it for global use, and how the resulting state survives the next distraction.

The next chapter follows an experiment that makes one of those clocks unusually visible. In primate visual cortex, a population code can reorganize very rapidly when the task changes from detecting a category to distinguishing an individual. The event is measured on the order of tens of milliseconds. It is not a conscious moment. Its importance is subtler: it shows what a state transition might have to accomplish before a temporal-access theory has earned a place in the machinery.

The brain can give an early answer and then change how it represents the question. Whether an artificial system needs the same maneuver is an experiment, not a metaphor.
