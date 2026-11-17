# 12 — Who Moved the World?

A machine extends its arm. The object does not move.

Perhaps the actuator failed. Perhaps the arm slipped. Perhaps the object was heavier than expected. Perhaps the camera is delayed. Perhaps someone else moved the object in the opposite direction, canceling the visible effect. The observation alone does not identify the cause.

This is the difference between recognizing a scene and participating in one. A system that acts has to carry a model of what its action should do, compare that prediction with what happened, and decide what to believe about the discrepancy. It needs continuity of causal expectation. Otherwise, every surprising observation can be misread as a change in the outside world.

TACH-3 and TACH-4 moved the research from selective representation toward this problem. The experiments used synthetic environments and controlled actuator regimes. Their results were exploratory and unpublished as neuroscientific findings. They nevertheless clarify what a self/world model has to mean in software.

The point is not that a machine becomes conscious by predicting its own actions. Many control systems do that. The point is that a theory of persistent thought needs a way to distinguish the agent's contributions from events it did not cause.

## The value of an intervention

Suppose a system has only observed an arm moving whenever an object moves. The correlation may be strong, but the causal story is unsettled. The arm could be moving because the object causes it to move. A hidden controller could be moving both. The relationship could change under different conditions.

An intervention helps. Command the arm to move under controlled circumstances and measure the object's response. Repeat with different commands, delays, and disturbances. The resulting evidence supports a model of action effects that passive correlation cannot always supply.

TACH-3 compared models trained from passive observations with models trained on randomized interventions in a simple simulated environment. The intervention-trained causal model obtained far lower counterfactual effect error on the reported task than the passive model. The exploratory numbers were stark: approximately 0.00093 counterfactual effect mean squared error for the randomized-intervention condition versus approximately 0.51453 for passive observations, under the study's constructed conditions.

The size of that difference is impressive inside the simulation and unsurprising as a general lesson about intervention. The model was given informative experimental variation. It learned how actions affected a system whose structure was accessible through the task. That does not establish human-like agency or any subjective sense of control.

Another reported quantity was false attributed effect when an actuator was disconnected. The randomized-intervention model produced a much smaller false effect estimate than the passive model. The exact result depends on the synthetic environment, the causal model class, and the interventions used. It should not be generalized to real robots or human agency judgments without further validation.

The useful lesson is that action-effect learning must distinguish correlation from causation. If CHORD is going to maintain a self/world model, it has to learn or infer what the system itself can change.

## A predictive message before the consequence

The nervous system contains many examples of signals related to expected sensory consequences of action. Motor commands can be accompanied by predictions that help distinguish self-generated effects from external events. In the literature these ideas are discussed under terms such as corollary discharge, efference copy, and forward models. Their exact implementation varies across species and tasks.

The engineering analogue is straightforward. Before the actuator's effect is observed, the agent sends a prediction of the expected sensory change to a comparison process. When the observation arrives, the difference becomes evidence about the world, the motor system, and the observation channel.

Timing is essential, but not necessarily rhythmic. The prediction must be generated before the effect. A model that sees the outcome and then declares what it expected has not performed prospective prediction. If the action's effect is delayed, the predicted observation needs a time window and uncertainty. If an expected event is omitted, the system needs to distinguish omission from an absence of input due to sensor failure.

The TACH-3 research notes connected this design to human work on action-related sensory prediction and omission responses, while marking the difference between biological findings and software simulations. For the artificial test, a prospective motor-to-sensory message was an explicit requirement. It created a causal path that could be disrupted without changing the world itself.

A convincing benchmark would hold the action sequence fixed, then intervene on the prediction channel. If attribution degrades specifically when prospective feedback is removed or retimed, that supports a contribution from the channel. The control must receive equal observational information, and a separately retrained model without the channel must also be evaluated. Otherwise, the result merely shows that a trained network depends on the wiring it was given.

## The actuator that silently changed its mind

TACH-4 made the problem more adversarial. The agent operated in a partially observed environment where the effect of its motor command could change. A diagnostic observation could reveal information about the hidden actuator state, but gathering it had a cost. The system had to decide when more information was worth acquiring.

Imagine a robot whose gripper sometimes produces no movement despite a command. If it knows this can happen, it can maintain a belief over possible actuator regimes. When the object fails to move, it may request a diagnostic measurement, try an informative probe, or revise its estimate of the actuator's gain.

The experiment compared several policies under the same simulated world dynamics. An active policy chose diagnostic timing based on task-specific information value while carrying a posterior belief. A periodic policy sampled on a schedule. A random policy sampled at unrelated times. Other conditions removed continuity, withheld diagnostics, or supplied oracle information.

Across 180 test seeds, the reported active policy had total cost per step around 1.6193, compared with 1.6348 for the periodic policy and 1.6809 for the random policy. The active and periodic conditions used roughly the same number of diagnostic measurements. The active policy therefore showed a small advantage in this particular cost design.

But the result was not a vindication of a consciousness-specific clock. It illustrated adaptive information acquisition. A decision-theoretic policy sampled when information seemed valuable. That is a familiar mechanism in active sensing and control. The study's own notes cautioned against claiming algorithmic novelty relative to stronger Bayesian planners or generalized state estimators.

The more compelling finding concerned continuity under sparse access. With only twelve scheduled diagnostic samples, a policy that preserved belief state performed much better than one that reset its belief each step. The difference was large in the reported task. Yet a fair interpretation is that remembering partial evidence matters when observations are sparse. That is not a revelation about subjective experience.

## Why an apparently perfect score can be wrong

One TACH-4 control achieved nearly zero action-effect error by refusing to act. That number looks wonderful in a table until the behavior is understood. A system that never moves can avoid predicting the consequences of movement, or can trivially predict zero effects, while failing the actual control task.

This is a classic benchmark problem. Optimizing a narrow metric can reward the opposite of the intended capability. A safety system that never allows a robot to act has zero action-related accidents and no useful autonomy. A classifier that rejects every difficult case may achieve high conditional accuracy while providing little coverage. A memory system that never updates may preserve continuity by remaining wrong.

The TACH reports disclosed these pathologies rather than smoothing them away. Action-effect error had to be read alongside total task cost and the number of actions or diagnostics. A model that appeared superb on one metric could be weak overall.

This lesson carries directly into CHORD evaluation. A low prediction error is not evidence of causal understanding if the agent avoids informative interventions. High identity accuracy conditioned on correct category detection can be misleading if category coverage collapses. A high complexity score can coexist with useless behavior. A successful access gate can be a lucky sampler.

Each benchmark needs multiple measures that make it hard to win by doing nothing.

## Self/world boundaries are not poetic labels

A self/world model is often described in evocative language. The agent has a sense of agency. It understands what belongs to itself. It distinguishes its body from the environment. Such claims are too large for a small software experiment.

For CHORD, the model should be defined by explicit latent variables and predictions. It may maintain a distribution over actuator gain, environmental disturbances, sensor reliability, action delays, and object states. It should update the distribution from interventions and observations. It should be able to answer counterfactual questions: what would have happened had the command been different, or had the actuator remained connected?

These are objective tasks. A controller that answers them well exhibits a useful causal model. It does not necessarily possess a felt sense of agency. There is no validated bridge from counterfactual prediction to subjective selfhood.

The architecture should also expose uncertainty. A system that announces certainty after ambiguous evidence may be more dangerous than one that requests a diagnostic observation. If actuator gain is hidden and changes unexpectedly, the model should become less confident until enough evidence accumulates. That behavior can be scored by calibration, task cost, and recovery time.

A self/world model that learns only from passive data may fail when interventions reveal a different causal structure. A model that relies on explicit diagnostic labels may fail in the real world, where actuator health is inferred from sensory consequences. These are natural follow-up experiments.

## What continuity actually means

The word continuity risks becoming a compliment attached to any persistent hidden state. The stronger concept is continuity of accountable beliefs. The agent remembers what it intended, what evidence it used, which predictions it made, and what later observations confirmed or contradicted.

That continuity can be broken in several ways. Erase the predicted action effect before its observation arrives. Delay the sensor signal without adjusting the model's expectation. Swap the identity of an object during occlusion. Inject a false event that resembles the model's own motion. Change an actuator regime without announcing it.

A capable system should not succeed in every condition. It should fail in informative, calibrated ways. It may lower confidence, request evidence, or refuse an irreversible action. A poor system may confabulate a cause or keep acting from an obsolete state.

The CHORD hypothesis treats temporal access and persistent causal state as complementary mechanisms. Access determines which evidence can revise the shared model. Continuity determines what the model carries forward between updates. Action prediction connects that model to the environment.

A generic recurrent Bayesian planner might implement all of these without the named architecture. It is a strong rival and should be included in every serious comparison.

## The human analogy and its limits

Human agency judgments involve sensory timing, prediction, motor control, attention, and social interpretation. People can misattribute causes, experience altered control, or act automatically. None of those phenomena reduces to a single forward-model signal. A computational controller that makes accurate action predictions is an analogue of one functional component, not an artificial person.

This is an important boundary because the language of self-modeling invites anthropomorphism. A model may represent its actuator state; it need not represent a conscious self. It may update a belief about whether its command succeeded; it need not experience success or frustration. A robot may request a diagnostic measurement; it is not thereby anxious about uncertainty.

At the same time, refusing anthropomorphic overclaiming should not blind us to useful research. An agent that distinguishes self-caused and external changes is better suited for reliable action. It can maintain commitments across interruptions, revise plans when evidence changes, and avoid treating every surprise as a hostile world.

Those capabilities matter on their own.

## A counterfactual requires a twin
A model of agency should answer what would have happened under a different action. In the physical world, this is difficult to observe directly because one cannot execute two incompatible actions at the same time in exactly the same environment. In simulation, the experimenter can create paired worlds that share initial conditions and exogenous randomness while differing in a controlled action.

This makes synthetic environments valuable for testing counterfactual predictions. The researcher can run one trajectory with an action and another without it, holding background disturbances constant. The difference supplies an operational target for action effect. A model that predicts that difference accurately has learned something useful about causal consequences.

But the design still has pitfalls. If the simulated dynamics are too simple or the actuator regime is directly visible, the model may solve the task through a trivial regression. If the action changes the distribution of later observations in a way that also changes the agent's information, the paired comparison must account for that. If the random streams diverge after different action histories, the apparent effect may include unrelated stochastic variation.

TACH-3 used constructed intervention settings to expose these issues. The dramatic contrast between active and passive causal learning reflected informative randomized actions under a particular generator. It should not be described as evidence that intervention-trained models possess a subjective sense of agency.

A stronger follow-up would include hidden disturbances, delayed actuator effects, nonstationary gains, and observation channels that reveal consequences only indirectly. The model would need to infer rather than read its causal state. Evaluation would use twin worlds with controlled exogenous events to measure counterfactual accuracy.

The baseline should include a competent causal state estimator with the same information. A recurrent neural agent may be more flexible on nonlinear observations, but it must earn that advantage under held-out regimes. If the estimator matches it, the result is still useful: the causal problem has a simpler solution than the proposed architecture requires.

### The difference between failure and refusal

One of the most revealing TACH-4 outcomes was a policy that looked excellent on a narrow action-effect metric because it barely acted. That behavior exposes the dangers of defining competence with one score.

An agent can avoid incorrect action predictions by never taking informative actions. It can avoid collision penalties by refusing to move. It can maintain perfect consistency by never updating a belief. Such policies exploit the evaluation rather than solving the intended problem.

To prevent this, a benchmark should include task completion and information acquisition costs. It may reward accurate counterfactual predictions, but it must also require the agent to achieve specified goals under realistic constraints. The total objective can penalize unnecessary probes, failed actions, delayed completion, and unsafe choices.

The weights in that objective matter. If probing is too cheap, the agent may ask for diagnostics constantly. If probing is too expensive, it may act blindly. A robust claim should survive reasonable sweeps of cost parameters, not rely on one favorable setting chosen after the results.

Another control asks whether the agent can identify when it does *not* know the actuator regime. A useful self/world model should respond to uncertainty with calibrated behavior, not just produce a best guess. The policy may request information when the expected value of that information exceeds its cost. That is standard decision theory, and the proposed architecture should compete with a strong implementation.

The consciousness-inspired vocabulary adds no value if the underlying policy is simply an ordinary active sensing rule. It can still be a good rule. The distinction should be stated openly.

### The delayed result of a command

Action attribution becomes much harder when consequences arrive after a delay. An agent may issue several commands before observing their effects. A later movement could be caused by the first command, the second, an external disturbance, or a sensor artifact. The system needs an internal history that preserves action times and expected outcomes.

This is a strong test of temporal continuity. A memoryless policy may misattribute delayed observations. A generic recurrent model may learn the temporal dependency. A structured causal workspace may explicitly associate predicted outcomes with commands and their uncertainty windows.

A useful experiment varies delay distributions independently of actuator reliability. In one regime, commands usually take effect quickly. In another, the same command may produce a response after a long or variable delay. A third regime includes omitted consequences, making it uncertain whether an action failed or merely has not completed.

The model should not receive a perfect timestamp of hidden cause if a real agent would have to infer it. It may record its own commands and observed sensor times, but latent actuator states remain unknown. The benchmark can then measure false self-attribution, missed external events, calibration, and recovery after regime changes.

A strong counterfactual test holds the sequence of external disturbances fixed while changing one command. The model's predicted difference should match the simulated intervention effect. If the system makes correct predictions only when the outcome arrives immediately, its continuity is fragile.

Such tasks have practical relevance to robotics and distributed automation. They involve the ordinary difficulty of delayed causality, not necessarily anything phenomenal. The name self/world model is a convenient description of a causal inference problem.

### When memory makes the wrong answer more durable

A persistent causal state can protect useful information through missing observations. It can also preserve a mistaken hypothesis long after evidence has changed. A model that remembers too aggressively may interpret every contradictory observation as noise and refuse to revise its beliefs.

To test adaptive continuity, introduce sudden changes in hidden actuator gain or environmental dynamics. Before the change, a persistent model should exploit its accumulated evidence. After the change, it should detect inconsistency and update its belief. A memoryless model may adapt quickly but have poor performance during ordinary stable periods. A highly persistent model may excel before the switch and fail afterward.

This creates a genuine tradeoff between stability and plasticity. A useful CHORD model needs calibrated change-point detection or uncertainty updates, not merely a large memory buffer. The experiment should measure both the cost of forgetting too soon and the cost of holding a false belief too long.

A Bayesian change-point model offers a strong baseline. It can explicitly represent the probability that the regime has changed. A learned recurrent network might capture richer dynamics but be harder to calibrate. A persistent workspace with a separate readiness or access gate could also help, but it should not be credited unless it outperforms those alternatives under comparable budgets.

The model's explanation of its own behavior is not a substitute for measuring the trajectory. It may say it believed the actuator was disconnected, but the actual hidden state and action policy may tell a different story. Objective counterfactual evaluation is more reliable than a generated narrative about intentions.

The most valuable form of continuity is therefore not unbroken memory. It is the ability to preserve warranted beliefs and revise unwarranted ones as the world pushes back.

### The next environment should be inconvenient

A synthetic agent is at its most impressive when the world conforms to the assumptions under which it was trained. The next research environment should be deliberately less accommodating.

Actuator effects might be asymmetric. Actions could have delayed or nonlinear consequences. Sensor reliability could vary. Objects might disappear behind occluders. The agent could receive a new goal before finishing the old one. Another actor might interfere with its plan. Some observations should be informative only when combined with earlier action history.

These complications should be introduced through a predefined evaluation ladder rather than a collection of handpicked adversarial examples after the result. Each stress condition tests a specific assumption: stationarity, observability, causal attribution, memory duration, or communication bandwidth.

A useful success would be a model that recognizes its uncertainty, acquires relevant evidence when worth the cost, and adapts to changed dynamics without forgetting everything it previously learned. A useful failure would tell us which component was inadequate.

Such work could materially improve autonomous agents. It would still not answer whether the agent feels a distinction between self and world. The experiment measures causal modeling, which is valuable enough without that extra claim.

## An earned next step

TACH-3 and TACH-4 moved the research from information routing toward causal participation. Their results were synthetic, exploratory, and constrained by model class and environment design. They showed how interventions and persistent beliefs can improve particular tasks. They also exposed benchmark pathologies and the risk of attributing ordinary active sensing to a novel consciousness mechanism.

The architectural implication is conditional. Keep a persistent world model if it improves behavior under sparse observations and changing actuator regimes. Keep prospective action-effect prediction if it contributes to correct causal attribution. Keep an access controller only if it adds value against equally informed, equally capable controls.

The robot's arm moved or did not move. The world changed or did not. The system's job is to discover which. That is a harder and more useful test of continuity than asking it what it feels.
