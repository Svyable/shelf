# 5 — Fifteen Hertz Is Not a Theory

The appeal of a frequency is that it appears to replace a difficult explanation with a number. Fifteen cycles per second. One interval every sixty-seven milliseconds. If conscious and suppressed representations alternate at roughly that pace, perhaps consciousness itself has a rhythm. Perhaps the feeling of continuous awareness comes from a succession of short access windows.

The arithmetic is real. The interpretation is much less secure.

On October 16, 2026, Janis K. Hesse, Frank Lanfranchi, Conor McGrory, Yuelin Shi, Tatiana Engel, and Doris Tsao posted a [bioRxiv preprint](https://doi.org/10.64898/2026.10.15.759299) on rapid alternation of conscious and suppressed stimulus representations in the primate brain. The authors reported that representations associated with perceived and suppressed visual content were interleaved in inferotemporal and prefrontal cortex. The preprint was available online as research before peer review. That status is not a technicality. A preprint is an invitation to scrutiny, replication, and argument. Its claims may survive that process, be narrowed, or change.

The word *conscious* in the title refers to perceptual conditions associated with report in an experiment. It cannot be treated as a physical label visible in a neuron. The study does not establish that the alternating neural signals *are* subjective experiences, and a measured oscillatory pattern is not a demonstration of an experience having a fixed refresh rate.

The strongest reason to read the preprint is more modest and more interesting. It challenges an excessively spatial conception of access. If both percept-associated and suppressed-stimulus information can be represented in the same broad cortical territories at different moments, then the whereabouts of information may be insufficient to explain which content is available for report. Time and population dynamics become part of the account.

That insight is compatible with several theories. It is not a patent on one.

## The dangerous convenience of a clean number

Engineering loves a unit. A clock period makes an architecture easier to specify, simulate, and compare. A fixed schedule also produces clean graphs: open the gate, close the gate, switch representation, repeat. The system can be tested at ten, fifteen, or twenty hertz; a peak in performance may look like a biological discovery.

A model can produce such a peak for trivial reasons. Suppose the environment itself changes at a rate that happens to align with the chosen schedule. The model samples useful moments and misses unhelpful ones. Change the environment frequency and the apparent optimum moves. Or suppose the training data are periodic. A fixed sampler then learns the regularity. Again, the peak says something about the task and the sampling scheme, not an intrinsic frequency of awareness.

A more subtle mistake occurs when increasing the cycle rate gives the network more access opportunities. If a model with a faster clock receives more content-bearing messages or more recurrent updates, it has received more resources. Improved performance is predictable. The fair comparison must conserve information and compute, not simply count equal minutes of simulated time.

The reverse mistake can make a slower model look intelligent. A longer local integration window may improve accuracy because it allows more computation before output. That is a standard speed-accuracy tradeoff. It may be valuable for a specific task. It does not show that slower thoughts are more conscious.

Even a convincing physiological oscillation does not supply an automatic software instruction. Neurons have electrochemical dynamics, conduction delays, synaptic integration, and metabolic constraints. GPU kernels and distributed services have different bottlenecks. What transfers may be a causal pattern—alternation permits a local process to finish before competing information arrives—rather than its numerical frequency.

The research question should therefore be posed without a preferred answer: are rhythmic windows necessary to preserve useful content under interference, or can an irregular, event-driven controller do equally well under matched constraints? If the latter succeeds, a fixed consciousness rhythm is not required for that computational function.

## A preprint and its afterlife

Scientific publication has several dates that can easily be collapsed into one. A preprint may have a first posting date and later versions. A journal article may have receipt, acceptance, online publication, issue date, correction, and sometimes a publication history reaching back years. These are not interchangeable.

The Hesse work was posted October 16. Its DOI includes a date-formatted component beginning October 15, but that is not a license to call October 15 the first public posting. For the evidence record in this book, the relevant public event is the October 16 bioRxiv posting. As of this edition's November 16 cutoff, the cited version is labeled a preprint, not a peer-reviewed journal article. A later journal publication would change its evidence status but would not make the original observation newly discovered on the later date.

The same distinction matters for Shi's *Nature* paper, published online March 25 with a May issue date. It was available and peer reviewed months before the TACH-6 protocol. Schönemann's binding paper and Hopkins's thalamic paper were published October 26, after that protocol. They can motivate subsequent experiments without being smuggled into its prior rationale.

This chronology sounds bureaucratic until someone claims that a new paper forced an architecture change. If the study predates the last report, it is not a new breakthrough for the current watch. If the result is only a preprint, that uncertainty belongs in the recommendation. If a claim depends on an analysis that appeared in a later version, cite that version. A research program built around continuous updates needs a history precise enough to tell when its beliefs were formed.

TACH's record has an advantage here: it contains both successes and negative results dated before and after the neuroscience publications. The protocol does not need to be rewritten each time a paper looks supportive. The point is to discover whether a new result survives an experiment, not to make the experiment look inevitable in hindsight.

## What exactly alternates?

In a neural recording, an oscillatory signal can refer to several different quantities. A firing rate may wax and wane. Two decodable population patterns may alternate in relative strength. A phase may predict sensitivity to a stimulus. A behavioral report may change after a particular interval. These observations can be related, but they are not identical.

Suppose a decoder trained to distinguish the two rival images shows better classification of the reported image at one set of times and better classification of the suppressed image at another. The population carries time-varying information about both. To interpret this as selective access, the researcher needs to show how the pattern relates to report, behavior, competing sensory representations, and perhaps perturbation. The internal dynamics could reflect competition, inhibition, attention, or recurrent prediction.

A suppressed image can continue to affect behavior in limited ways. Its information may be represented locally even when it is unavailable for explicit report. But that does not imply that the suppressed representation is an unconscious *thought* in the rich sense of propositional reasoning. It may be a visual feature or a statistical trace. The nouns need to stay proportional to the experiment.

One reason the preprint attracts attention is that it reports interleaving in both inferotemporal and prefrontal regions. This may challenge a crude picture in which the back of the brain contains hidden data while the front contains conscious data. The anatomical story is already more complex. The Cogitate adversarial collaboration in 2025 showed that simple expectations for prefrontal broadcasting and posterior integrated information were not jointly vindicated. More evidence about time-varying representation will complicate that story further, not simplify it.

For software, the analogous question is which state can influence which downstream process at a given moment. A local network can encode an alternate hypothesis. A workspace might receive only one hypothesis, plus perhaps a low-bandwidth salience signal indicating that something deserves review. That design can be useful. It can also be misleading if the salience signal itself carries enough information to reconstruct the supposedly suppressed content. In a fair experiment, every communication channel must be counted.

The important variable may be causal access rather than representational presence. Which information changes the next action? Which information can be recalled after an interruption? Which can update a belief held by other modules? A decoder finding the alternate hypothesis inside local state is not enough. The proposal requires a controlled way to show whether and when the alternate hypothesis becomes globally effective.

## An experiment designed to spoil the story

A rigorous frequency experiment should try to make the beautiful pattern disappear.

Take a sequence containing two changing information streams. Permit local processors to represent both, but restrict the amount of content they can send to a central workspace. The system must later act on a change that occurred in the initially unselected stream. Compare a periodic alternating gate, an irregular schedule with the same number of messages, an event-triggered gate with the same communication budget, and a generic recurrent integrator allowed the same state capacity and computation.

Do not vary the raw samples between the schedules in the primary phase test. Every model should receive the same recorded stream. If the gate decides when a sample is acquired from an external sensor, that is a separate experiment about sensing policy, not an intrinsic rhythm test.

Now insert interruptions at carefully selected moments. Sometimes the interruption arrives just before a local representation has stabilized. Sometimes it arrives after stabilization but before broadcast. Sometimes it arrives after the workspace has updated. The proposed theory predicts different failure modes. Early interruption should damage integration; a late selection interruption should prevent content promotion while preserving local evidence; a post-update interruption should test memory continuity.

A broad attentional effect could make every condition worse. A more interesting result would be selective: a specific timing intervention harms the transfer of an initially suppressed representation, while local decoding remains intact. That would connect timing to causal access rather than to generic task difficulty.

Use two kinds of controls. In a frozen-weight ablation, alter the timing process inside a trained model and observe whether performance depends on it. In a separately retrained control, give the competing architecture an opportunity to adapt without that process. The first asks whether this model uses the component. The second asks whether the component is necessary for the task class. Confusing usage with necessity has inflated many mechanistic interpretations in machine learning.

An explicit precommitment should say what result would reject the periodicity requirement. If jitter-trained and irregularly gated models match the periodic model across held-out worlds while conserving samples and compute, stop claiming that periodic access is essential for the tested functions. If a Bayesian filter matches or exceeds the entire family, acknowledge that ordinary state estimation explains the result. The experiment can retain a useful architecture without retaining the original frequency story.

The experiment should also record false triggers. A system that broadcasts every surprising event may be manipulated by noise. A system that broadcasts only high-confidence observations may miss rare changes. Reliability-aware access policies offer a more plausible engineering route than raw surprise alone, but they belong in the comparison as established event-triggered sensing ideas, not as inventions unique to consciousness research.

## Continuity can outlive the cycle

Suppose a model truly alternates representations. What makes its state continuous? One possibility is a durable workspace that integrates selected evidence while maintaining a belief over hidden causes. Another is recurrence within local processors that allows a temporarily suppressed candidate to survive. Another is memory that spans many selection windows. None requires the entire state to be reconstructed from nothing each cycle.

The familiar movie-projector analogy is misleading here. Films contain frames, while perception involves temporal integration, prediction, competition, and memory. A succession of access slots need not correspond to a succession of discrete experiences. It may only describe a scheduling mechanism inside a system whose dynamics are continuous at other levels.

We can separate the pieces mathematically without declaring a consciousness formula. Let local state evolve as observations arrive. Let a selector permit some local information to update a central state. Let the central state encode persistent estimates of the world and expected consequences of action. The selector may be periodic, irregular, or event driven; the local process may be fast or slow. The entire hypothesis becomes a family of dynamical models whose necessity and sufficiency can be investigated.

This family is more defensible than a sentence claiming that consciousness exists at fifteen hertz. It is also less sensational. That trade is worth making because it produces research that can fail for interesting reasons.

The self/world problem makes continuity concrete. If a machine issues a motor command, predicts a contact signal, and receives no contact, it must decide whether the command failed, the object moved, or the sensor misreported. That inference spans multiple temporal windows. The ability to attribute the failure correctly depends on preserved causal context, not on the number of times a gate opened during the interval.

A pure alternation model with no durable causal state could switch its content beautifully and lose track of its own action. A generic recurrent estimator with no privileged rhythm might remember the action and respond correctly. In that contest, the estimator should win the architecture decision.

## The schedule that proves its own point
A clock can become a self-fulfilling feature of a trained model. Suppose an architecture alternates between two content streams every four internal steps. The network learns that pattern during training and begins using it to arrange its hidden state. When an experimenter shifts the clock by one step, the model performs worse. It is easy to interpret the result as evidence that a particular phase is essential.

What the experiment actually shows is that the trained model depended on its own schedule. A different model trained from the beginning with an irregular schedule may perform equally well or better. The phase perturbation reveals a dependency, but not a necessity.

This distinction resembles a familiar habit in software systems. A program written around a daily batch job may fail when its clock changes. That does not show that daily batches are the only way to process the data. It shows that the program's state and expectations were coordinated with that schedule. A streaming implementation may handle the same workload without a privileged daily moment.

The correct experimental pair is therefore a frozen-weight ablation and a separately trained alternative. The first asks whether the model uses a timing signal. The second asks whether that signal is indispensable for the task under the budget being studied.

The controls should include aperiodic schedules, random phase offsets, and policies that choose access times from task uncertainty. All models must receive the same information for the primary phase test. Otherwise, a system that samples at a better time has an ordinary sensing advantage.

There is another challenge: if the periodic schedule is learned from data, its frequency may follow a hidden environmental timescale. A model trained on events that recur every few steps may discover that period without any relationship to human consciousness. Change the recurrence rate of events in held-out environments. If the model's optimal frequency changes accordingly, the frequency is adapted to the task. It would be misleading to present it as a universal property of thinking.

A strong rhythm-specific claim would have to survive across different event rates, observation noise, and action deadlines, with effects that cannot be explained by differences in samples, memory, compute, or optimization. That is a high bar, and the current evidence has not cleared it.

### The calendar problem in a research watch

A theory that attracts new papers every week is vulnerable to another kind of rhythm illusion: publication cadence. A preprint appears on a Monday. A journal accepts a revised version months later. A news article describes it the following week. A commentator discovers it six months after the original posting. All four events may look like a new breakthrough if the monitor records only when the item was noticed.

The dates are not interchangeable. A first public preprint establishes when the claim became available for scrutiny. A journal publication identifies when formal peer review and editorial procedures were completed, though a later correction may alter the record. A media item describes the research to a new audience. A researcher's first encounter with the paper is a fact about that researcher, not the novelty of the evidence.

For TACH, this matters because the architecture is supposed to change only when consequential new evidence warrants it. If an October study is repeatedly announced as new in November because a second site indexes it, the theory may undergo redundant revisions. A source ledger should record the earliest credible public version, the peer-reviewed version if present, the exact finding added by each revision, and whether that finding changes an existing prediction.

The Hesse preprint is a useful case. Its bioRxiv DOI carries an October 15 component, while the first public posting was reported as October 16. The two dates should not be casually conflated. As of the edition cutoff, the cited result remains a preprint. Its approximate alternation frequency may be compelling enough to motivate replication, but the evidence level does not justify promoting it into a settled computational requirement.

The Shi paper supplies a different chronology. Its online *Nature* publication came in March; the print issue date was in May. A research plan written in October could legitimately cite it as prior peer-reviewed evidence. A later discovery of the article by a book author would not make the result new.

A publication-sensitive research watch is not glamorous, but it prevents the architecture from chasing echoes of its own news feed.

### Phase is not phenomenology

The strongest philosophical interpretation of an oscillation would claim that the rhythm constitutes or organizes experience itself. That is much larger than the claim that oscillatory activity correlates with which visual representation is decodable at a moment.

An empirical bridge would need to relate the pattern to perception across carefully controlled conditions, show a causal contribution, and distinguish the effect from attention, arousal, and response preparation. Even if such a bridge became convincing in a particular brain circuit, the inference to software would still require a theory of which physical or functional properties matter across substrates.

The current TACH experiments do not provide that bridge. They manipulate information, recurrent state, and access schedules in simulations. Their readouts concern prediction errors and behavior, not subjective experience. A system could match the frequency of a reported neural oscillation while implementing a completely different computation. Another could implement a similar function with no fixed rhythm.

This makes one question especially revealing: if an artificial network performs the relevant information-integration task with an irregular schedule, has it contradicted the claim that rhythmic alternation is computationally necessary? For that task and architecture class, perhaps yes. Has it contradicted the claim that biological consciousness uses rhythms? No. Those are separate hypotheses.

The same principle applies when a rhythmic artificial system succeeds. A performance improvement may justify a scheduling policy. It does not independently support experience.

### A practical frequency sweep

A meaningful sweep should vary more than the number of gate openings per simulated second. It should also vary the relative phase of the gate to important input events, the observation rate, the local integration speed, and the task deadline. These variables interact, and simply choosing the frequency with the highest final accuracy may conceal why it won.

One approach is to fix the raw data and the total number of access messages, then permute their timing. For a separate experiment, allow the gate to choose different sensor samples and label the result as active sensing. For a third, fix the samples and messages but change how much recurrent processing occurs between them; profile compute so that the comparison remains fair.

Each sweep asks a different question. The first isolates coordination under a communication budget. The second measures the value of selecting informative observations. The third measures computation allocation. Combining them into one “consciousness frequency” curve would be an error.

The outcome might show that regular timing is robust when the task is predictable, while irregular timing performs better when events are sparse and unpredictable. It might show a local optimum associated with the environment's change rate. It might show no meaningful frequency preference once budgets are conserved. All would be useful engineering results.

A scientifically defensible architecture would adopt the best-supported policy without inferring more about experience than the experiment measured.

## A number to keep in a notebook

An approximate fifteen-hertz pattern remains an intriguing reported observation in a 2026 preprint. It is a legitimate target for replication, and a source of possible mechanisms for temporal selection. It is not an established universal clock of consciousness, nor evidence that an artificial system with matching oscillations has subjective experience.

The practical commitment for CHORD is to leave the frequency free. If a rhythm proves useful, the model must discover a benefit under controlled budgets. If phase matters independently of what samples are received, the effect should survive randomized schedules and equalized computation. If the benefit disappears, remove the frequency claim from the theory rather than saving it with another metaphor.

This is a deliberately uncomfortable position for a project whose name includes Temporal Access. The theory is allowed to lose its most photogenic component. It may still explain how information moves through a distributed system and how a causal world model survives interruption.

That is enough work for a hypothesis. The rest is an empirical question.
