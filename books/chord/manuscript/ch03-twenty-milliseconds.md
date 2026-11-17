# 3 — Twenty Milliseconds

A face is a category and a person at the same time. The first question may be whether the object in view is a face at all. The second may be whose face it is. The visual system has to answer both, yet the information useful for one answer is not necessarily organized in the best way for the other.

An early detector benefits from features shared by many faces. A discriminator benefits from the differences between faces. A fixed representation can make compromises between the two. A flexible representation can change its geometry as the question changes.

In March 2026, Yuelin Shi, Dasheng Bi, Janis Hesse, and colleagues reported a remarkable neural event in *Nature*. In macaque inferotemporal cortex, face-selective cells initially encoded stimuli using a broad, domain-general representation, then underwent a rapid population-level change to a more face-specific code. The authors described a concerted switch lasting less than twenty milliseconds. Their [paper](https://doi.org/10.1038/s41586-026-10267-3), *Rapid concerted switching of the neural code in the inferotemporal cortex*, was published online on March 25; the issue date was May 7. Those dates matter in this book because the finding preceded the original TACH-6 experiment and inspired it. It was not a rescue explanation invented after the artificial model failed.

The study provides a better starting point for an architectural hypothesis than the claim that all thought occurs at a privileged frequency. It describes a transformation in what a population encodes, identifies conditions associated with the transformation, and connects the earlier and later codes to distinct perceptual functions. Its significance lies in the structure of the change, not in its speed alone.

The central question for a computational imitation is whether the change earns its cost.

## A population changes the axes

A representation is often visualized as a point in a high-dimensional space. Each neuron contributes an activity dimension; a stimulus produces a pattern; related stimuli occupy related regions. A decoder might divide this space to identify faces versus objects. Another decoder might distinguish one face from another. Depending on the geometry, one task may be easy and the other difficult.

Imagine a crowded map. On one axis, faces lie together far from non-face objects. That arrangement is efficient for detecting a face. But if individual faces are squeezed into a small region, distinguishing identities may require careful measurement. Rotate or reorganize the dimensions so the differences among faces become larger, and identity may become easier while broad face-versus-object separation becomes less prominent.

This is an analogy, not a literal description of two-dimensional neural space. What matters is that the same population can support different linear or nonlinear readouts at different times. A change in the population's geometry changes which distinctions are easy to extract.

The Shi study argues that this is more than later activation of another feature channel. Face cells begin with a shared coding axis useful for detection and then shift toward axes suited to identity discrimination. The transition is stimulus gated: non-face objects do not undergo the same face-specific transformation. The population's later responses become sparser, and new tuning to facial-feature dimensions emerges.

These findings arose from neural recordings and analyses of stimulus-dependent population geometry. They are peer-reviewed evidence about a specific biological system under specific visual tasks. They are not proof of an algorithmically unique design, and they say nothing direct about whether a machine performing an analogous code switch would be conscious.

What makes the experiment compelling is the causal pressure it places on a computational model. A simple gain increase—making some neurons respond more strongly—does not necessarily change the axes of representation. A true remapping hypothesis predicts an alteration in the directions that encode meaningful features, not merely a larger signal. A model should therefore be tested with geometry as well as accuracy. If it claims to switch codes, can its pre- and post-event states be cross-decoded? Do the state-to-feature Jacobians change orientation? Is the shift specific to relevant stimuli? Does it help the next decision?

If the answer to the geometry question is no, the machine has not reproduced the phenomenon it was asked to approximate. If the answer is yes but no task benefit follows, it may have learned a decorative transformation. Only the conjunction of causal specificity, useful geometry, and robust behavior would make the result interesting.

## Why rapid is not the same as fundamental

Twenty milliseconds feels spectacularly fast, and in cortical population dynamics it is a serious temporal event. But speed is not an explanation. A machine can rotate a vector in far less time. Another may need many GPU steps. The meaningful quantity is the transformation relative to the deadlines and information available to the system.

The biological finding occurs inside the existing machinery of the macaque visual system. Face patches are specialized circuits developed under particular evolutionary and experiential constraints. The research does not establish that every perceptual category requires the same type of switch, nor that the switch must occur at the same latency across tasks, species, or brain states. Nor does it tell us that all conscious access events share this implementation.

A designer can nevertheless extract an engineering question: when a fixed-capacity representation must support multiple decisions, can task-contingent reorganization improve the difficult decision without sacrificing the easy one? The constraint matters. A network with separate full-sized detector and identifier representations can simply store both. A larger generic recurrent network might learn any transformation implicitly. The proposed architecture deserves credit only if it outperforms strong alternatives under a fair resource budget.

That means counting parameters and compute, using the same raw observations, and withholding the label that says when to switch. In a real system the trigger must arise from information available at the time, such as a context cue or the network's state. If a simulator directly supplies the hidden identity or the correct change-point, it has handed the experimental model the answer.

The distinction between explicit trigger and learned trigger is particularly important. A researcher can write a program that rotates a representation whenever a red light appears. That may produce a striking figure, but the impressive part came from the programmer's knowledge of what the red light means. A learned trigger must infer when a change of task is warranted from the same evidence available to its competitors. It must also resist false triggers when distractors resemble meaningful cues.

A causal version of the experiment would perturb the population at different moments: before the proposed switch, during the switch, and after it. The perturbations would be selected in advance. A sham disturbance of equal energy would control for the fact that any injected noise can impair processing. The prediction would be selective: a disturbance aligned with the actual representational transformation should harm the discrimination that depends on the transformation more than an arbitrary disturbance, while leaving simpler category detection relatively intact.

Even that prediction does not establish a special consciousness mechanism. It establishes that the switch contributes to a particular computation. That is enough for the first stage of an engineering theory.

## The easiest way to fool a remapping experiment

Suppose two categories are represented by synthetic twelve-dimensional signals. Each category contains several identities, and each identity depends on combinations of factors. A recurrent state must identify the broad category continuously, then identify the individual after a cue. The model with event-triggered remapping uses a learned matrix to reorient the state only when the cue arrives.

A comparator without remapping might use a smaller network, fewer parameters, or a weaker optimizer. If so, the remapping model's victory tells us nothing. The comparison was bought with capacity. A properly matched fixed-code competitor should be given the same parameter envelope and, as far as possible, the same computational operations. A generic recurrent competitor should be flexible enough to learn a rotation by ordinary recurrence. If the proposed model beats only the rigid fixed-code competitor and ties the generic one, the conclusion is limited: its explicit mechanism is a possibly useful inductive bias, not an indispensable computational capability.

There is a second trap. Suppose the task cue is a clean symbol delivered to the remapping model while the other models must infer it from noisy observations. The remapping architecture then has privileged knowledge. A third trap is one of exposure: a model can appear better on a test split because the split contains identity combinations or distractor correlations nearly identical to training examples. A convincing test must hold out combinations, vary nuisance correlations, and include noise and timing shifts not used to tune the model.

The statistics can mislead in quieter ways. If identity accuracy is measured only on trials where the category was correct, two models may be evaluated on different subsets. One may look superior at identity discrimination because it failed category detection on hard trials, removing those trials from its denominator. A paired comparison restricted to jointly category-correct trials addresses a different question and must be labeled as such. Both numbers have uses. Treating them as interchangeable can manufacture a benefit.

There is no beautiful interpretation of a model that achieves near-chance identity performance and a tiny positive difference with wide uncertainty. The network may not have learned the task. Before investigating consciousness-related code switching, it might need a better curriculum, a larger representation, or a clearer signal. If a method helps only when both systems are bad, the result may be an artifact of the benchmark rather than an important mechanism.

These issues are not a criticism of Shi's biological work. They are consequences of translating an observed neural event into an artificial algorithm. A biological measurement need not prove the superiority of a particular software design. The artificial design must earn that claim separately.

## From a face to a belief

Why care about this code change beyond vision? Because a general-purpose agent lives among changing questions. An object can first be a threat, then an individual, then a source of evidence about a hidden cause. A sound can first trigger orientation, then speech recognition, then a memory. The same input may need to support broad detection, fine discrimination, and later causal explanation.

A fixed embedding may be adequate for many applications. Modern machine-learning systems can learn rich representations that support numerous tasks without a discrete event-triggered remapping module. Adding an explicit switch might make some tasks easier to learn, or might merely complicate optimization. The claim cannot be settled by borrowing biological prestige.

A more interesting proposal is to test constrained, shared-state systems in which changing the question genuinely competes for finite representational capacity. A robot with limited memory may need to compress the identity of a grasped object while simultaneously maintaining a broad safety detector. A mobile agent may need to shift from recognizing a doorway to distinguishing a particular doorway after receiving a destination cue. The engineering test is whether a controlled reorganization reduces interference while preserving the information the original task still requires.

Notice how much stricter that is than a demonstration of a shifting heat map. The model must maintain both obligations through the transition. In the face example, detection cannot collapse when discrimination begins. In an agent, a narrow identification process cannot disable collision avoidance. A proposed conscious-thinking system that becomes more discriminating by forgetting its environment is not a compelling architecture for continuity.

The hardest version involves hidden causes. A visual representation says an object has moved. A causal model must decide whether the movement came from the agent's action, an environmental disturbance, or a failed sensor. That decision may require transforming a perceptual code into a model of action consequences while retaining a belief about object identity. Now the representation switch has behavioral stakes. It affects what intervention the agent chooses next.

The attraction of CHORD is that it could coordinate these transitions without making every local inference globally available at every moment. The danger is that it could become a complicated way of doing something a generic recurrent state estimator already does well.

To avoid the danger, each proposed transformation must be tied to a falsifiable forecast. A switch should change geometry in a predicted way. A perturbation should cause a predicted deficit. A capacity-matched rival should fail where the switch succeeds, under a task designed before the test results were seen. If any one of these fails, the mechanism's status should be downgraded.

## How the idea reached the laboratory

The original TACH-6 protocol was written on October 17, 2026, after the Shi study had been published and the Hesse preprint posted. It posed a narrow question: under equal external inputs, explicit-information budgets, parameter envelopes, and compute envelopes, does a learned rapid transition from broad detection to specialized identity improve out-of-distribution identity prediction at preserved category detection, relative to fixed-code and generic recurrent controls?

This is a useful question because a negative result is legible. If the event-triggered model does not beat each matched competitor with the predefined confidence threshold, the explicit switch has not earned a demonstrated incremental gain. If the generic recurrent control matches it, there is no evidence of a unique computational capacity. If changing the gate does not change the output, the supposed mechanism was not causally necessary in the tested network.

The protocol also required the experimenter not to tune thresholds on the held-out test set, not to use hidden labels in the trigger, and not to misclassify a scalar gain increase as an axis rotation. It called for eight independent initializations and at least 160 held-out worlds per stress condition. These choices are mundane enough that one might overlook their importance. In practice, they separate a model-comparison experiment from an illustration built to flatter the proposal.

The results, discussed later, were disappointing for the remapping claim. That does not invalidate the neuroscience. It limits the inference from a particular synthetic implementation and task. The neural event remains real within the study's evidential scope; the artificial version did not yet show that forcing a similar-looking event improves the right kind of computation.

This difference between inspiration and validation should be kept visible throughout. Scientific papers are not source-code licenses. A brain circuit tells an engineer that a physical system solves a problem in a certain way. Whether that way is transferable, necessary, efficient, or relevant to conscious experience remains to be tested.

## Reading a population without turning it into a story
A population plot can be persuasive even when the plotted axes have been chosen for visual clarity. Techniques such as principal-component analysis reduce a high-dimensional activity pattern to two or three directions. The resulting trajectories may appear to rotate, separate, or converge. These figures are useful summaries, but a visible movement across a projection does not by itself establish a functional code switch.

A rigorous analysis needs to state how the axes were chosen, which trials were used to construct them, and how well the changes generalize to held-out data. If a projection is fitted separately before and after a stimulus event, the apparent rotation may partly reflect the choice of coordinate system. If the same fixed projection is used throughout, the visualization is easier to compare, though it may omit important dimensions. Either way, the interpretation requires more than the image.

In a computational model, the analogue is to measure the Jacobian of the learned representation with respect to stimulus features. Does the mapping from input variation to hidden-state variation change its direction at the cue? Does the identity information become easier to decode along new axes while category detection remains stable? Can a decoder trained before the cue generalize to after it, or does the code transform enough to defeat cross-temporal decoding?

These questions should be asked on trials that were not used to select the visualization. A network can display a beautiful axis rotation because a learned matrix has been applied, yet the rotation may be irrelevant to performance. An invertible transformation can preserve all information while merely changing the coordinate basis. A downstream readout trained to undo the transformation could make the apparent event causally meaningless.

The stronger prediction is that a specific transformation changes which task-relevant distinctions can be extracted under finite capacity and fixed computational resources. It should help identify a previously confusable individual without sacrificing the earlier category decision. The shift should occur in response to a causally available cue and survive changes in distractors.

To test the claim, perturb the representation in the directions the model supposedly begins using after the event. Compare that with perturbations of equal norm along directions that are irrelevant to identity. If disrupting the claimed identity axes selectively harms identity classification, the mechanism has gained causal support. If arbitrary directions produce the same outcome, the explanation is weaker.

This analysis is demanding, but that is its virtue. It prevents an algorithm from receiving credit merely because its implementation contains an operation called remap.

### What category preservation really requires

A system tasked with maintaining broad detection while switching to fine discrimination has two simultaneous obligations. The first must remain available while the second is learned. One can test this by forcing occasional category decisions after the identity cue, not just before it. If the model is allowed to abandon category detection once the cue arrives, it can win the identity task by reusing every dimension for fine discrimination and forget the broad task. That is a tradeoff, not flexible coexistence.

The evaluation should therefore include randomly timed queries for both category and identity. Their timing must be unknown when the model processes the cue, or at least variable enough to prevent a trivial memorized schedule. A balanced model must keep enough category information for urgent decisions while allocating part of its state to finer distinctions.

There is a useful natural analogy in recognizing people. An observer may identify a shape as a face before recognizing the person. But recognition of a particular person does not usually erase the fact that the object is a face. The two functions must coexist at least long enough to support behavior. A code change that improved identification while destroying basic detection would not accomplish the full biological role being proposed.

For an agent, this could matter in safety-critical settings. A robot shifts from detecting that an obstacle is present to identifying which obstacle it is. The broad obstacle detector must remain responsive while the identity system investigates details. Otherwise, a system optimized for specificity could become temporarily unable to perform the simplest protective action.

A fair benchmark should measure both functions across the entire trial and penalize tradeoffs explicitly. The original TACH-6 criterion permitted no more than one percentage point of category deterioration while seeking an identity advantage. That constraint was essential because it prevented the model from gaining a seemingly deep representation by sacrificing its earlier job.

### A cue is a message, not a miracle

A learned transformation cannot know that a change of representational code is desirable unless some available signal supports that decision. In the TACH-6 synthetic task, the model received a public context cue. The cue was not a hidden label revealing the correct identity; it indicated when within-category identification became relevant. All architecture families received it.

That makes the test fairer, but it also places a limit on interpretation. The model was not discovering from scratch that its task had changed. It was responding to an externally defined event. A later experiment could make the transition less explicit by asking the system to infer the need for finer discrimination from observation history or consequences of action.

For instance, an agent might initially need to distinguish vehicles from pedestrians. A later instruction requires distinguishing emergency vehicles from ordinary ones. The task change is semantically clear and can be indicated by a message. In a harder scenario, the agent notices that one type of vehicle is behaving unexpectedly and must decide whether finer classification is warranted without a clean cue.

The latter task tests both event detection and representation allocation. It is more realistic but also harder to interpret. A poor result might mean the model failed to detect the task change rather than failed to remap its code. An experimental sequence should first establish whether the transformation works with a known cue, then test whether the system can learn when to invoke it.

Causal interpretation benefits from that staging. If a learned remapping algorithm cannot demonstrate a task benefit when the event is unambiguous, it is premature to test its autonomous discovery of events. If it succeeds under a clean cue but fails when the cue must be inferred, the next question concerns trigger reliability rather than representational geometry.

Neither outcome requires consciousness language. They concern flexible computation under changing demands.

### A neural event is a starting constraint

The Shi result was scientifically notable because it identified a rapid, stimulus-dependent population transition, not simply a stronger late response. That makes it an excellent source of candidate computational operations. It does not establish that the operation is the only way a visual system can support both broad and fine decisions.

A useful next step would be to compare the learned model's representational geometry with time-resolved neural population data under analogous stimuli. Such a comparison would require access to the original recordings or a suitable open dataset, with careful attention to sampling, trial timing, and cross-validation. The paper's stated data-availability conditions matter; if raw recordings are available only upon reasonable request, the analysis cannot pretend that an independent replication has been performed.

The model's fastest code change would not automatically be its most biologically plausible. Hardware timing differs, and the network's learned units need not correspond to individual neurons. The more meaningful correspondence would be a matched structure of representational transition: broad early category coding, stimulus-specific later discrimination, preserved general detection, and a demonstrated causal contribution from the transition.

If the model lacks those properties, it has not replicated the neural computation. If it possesses them, it has shown an interesting functional analogy, not an artificial conscious percept.

This is the kind of boundary a research book must keep visible even when the biology is beautiful.

## A narrower, stronger lesson

Shi and colleagues demonstrated a rapid, stimulus-specific reorganization of neural population coding associated with a move from category detection to identity discrimination. The paper was peer-reviewed. It describes a striking property of visual representations in macaque cortex. It does not claim to prove a universal conscious clock or to certify an artificial consciousness architecture.

The event suggests three distinct questions. Does a fixed-capacity system benefit from changing its representation when its task changes? Does the transformation have a distinct causal role beyond generic recurrent computation? Does its timing matter independently of information availability and total computation?

Only the first of those follows naturally from the biological observation. The second and third demand new experiments with strong controls. If they fail, the original finding remains informative while the proposed engineering extension is weakened.

The most useful thing about twenty milliseconds is therefore not the speed. It is that a measured population did something specific during that time, and that specificity can be translated into a testable intervention. It gives us a mechanism to interrogate instead of a number to worship.

The next surprise is that a very different visual problem seems to depend on a slower recurrent process. If the same brain can change a face code in less than twenty milliseconds and require roughly 120 milliseconds to bind features across space, the notion of one clock for conscious computation becomes harder to defend. Multiple operations, multiple deadlines. A plausible architecture must make room for both.
