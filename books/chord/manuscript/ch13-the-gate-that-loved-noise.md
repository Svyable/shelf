# 13 — The Gate That Loved Noise

A signal changes suddenly. A detector notices. The gate opens. The central model receives the new evidence just when it needs it.

That is the attractive story of event-triggered access, and for a while the synthetic results seemed to support it. The central estimator was allowed only a limited number of full samples from a second signal stream. A small local processor monitored that stream continuously and sent a compact indication of surprise. Instead of broadcasting on a fixed schedule, the system could spend its scarce content bandwidth when something important appeared to happen.

In the ordinary test condition, it worked. On 320 constructed worlds the novelty-triggered gate's post-event mean squared error was about 0.709, compared with 1.065 for the periodic schedule and 1.223 for random sampling. The numbers were objective scores from a simulation. They were not evidence of perception, awareness, or any subjective state.

Then the noise increased.

The novelty detector did what it had been designed to do: it became excited by abrupt changes. Unfortunately, many abrupt changes were noise. The gate spent its bandwidth on false alarms. In the noisy evaluation, the novelty policy's error increased to approximately 1.290, while the periodic schedule achieved approximately 1.111. The clever gate lost to the clock.

It is hard to write a better introduction to the danger of confusing surprise with significance. The model had learned to interrupt itself for events that were often not worth its attention. It responded to weather as though it were news.

That reversal became the most valuable part of TACH-5.

## The cost of making everything important

An event-triggered controller is an old and sensible idea. If communication is costly, do not transmit identical measurements every moment. Detect when new observations are likely to alter the estimate, then allocate access. Such schemes appear throughout sensing, estimation, and control. Calling one a consciousness-inspired gate does not make it new.

The particular TACH-5 setup made the tradeoff visible. Two synthetic processes changed over time. The central estimator had continuing access to the primary stream and restricted access to full samples from a secondary stream, B. The local branch could observe B continuously, but the central branch could receive only 48 full B-content samples during 256 time steps. Several schedules were constrained to the same number of full content transmissions.

The event-triggered gate did not receive the correct hidden event labels at test time. Instead, a low-bandwidth salience message indicated how surprising the local stream seemed. The protocol counted that side channel as communication, rather than pretending that the workspace received absolutely nothing while B was suppressed. A small alert can contain useful information even when it is not a full sensory sample.

The distinction matters because many purported access architectures quietly exploit such side channels. A system may claim that a representation is inaccessible while passing a feature-rich relevance vector to the controller. With enough bits, the controller can reconstruct the supposed hidden content. The experiment then shows successful information transmission under a different name.

TACH-5 used a compact unsigned relevance code and restricted content samples, though the total local sensory acquisition and processing were not equal across all possible architectures. The local processor still received continuous B observations. A full two-channel comparator could see much more central information and, unsurprisingly, often achieved lower error. That was a capacity benchmark, not a fair claim that selective access was superior to parallel access.

The meaningful comparison was among restricted-channel policies: periodic, random, novelty-triggered, and variants that delayed or normalized the relevance signal. All had a limited opportunity to send full B content. Their success depended on choosing the moments when B was worth consulting.

This is a practical problem. A sensor network with limited battery power must decide which anomalies deserve transmission. A robot with several cameras must decide where to spend visual processing. An agent with limited context capacity must decide which evidence belongs in shared memory. In each case, attention to every irregularity can be worse than a predictable schedule.

A good selector needs to know something about reliability.

## The noisy world that defeated the detector

Why did novelty gating fail under noise? The detector used changes in local observations as a proxy for meaningful events. In a relatively calm environment, a large unexpected innovation often coincided with a genuine change in the latent signal. The gate opened near useful information. Its sample budget was concentrated at moments when the central estimator's existing prediction was likely to be wrong.

Under high observation noise, large innovations occurred for less interesting reasons. The sensor's measurement could jump while the underlying process continued smoothly. A gate that reacts to magnitude alone spends scarce transmissions on those jumps. Meanwhile, genuine but less spectacular state changes may go unobserved.

The failure is not surprising after it is explained, but that does not make it trivial. The same trap appears in human news consumption, automated anomaly detection, fraud monitoring, and incident response. A mechanism optimized to notice departures from expectation can become enslaved by unreliable evidence. The difficulty lies in estimating which departures justify action before knowing whether they were meaningful.

This is why the noisy condition should be retained in the benchmark. It cannot be relabeled a pathological corner case merely because it spoils the proposed mechanism. If a policy for global access becomes worse than periodic scheduling when observations are unreliable, that is a fact about the policy. A more sophisticated architecture must account for it.

A simple fix would be to add a noise estimate. But the fix itself must be tested carefully. If the experimenter uses knowledge of the true latent signal to label the events, the controller has been given privileged information. If the controller uses a noise statistic calculated from observations available to its local branch, the information advantage is less artificial—but the computational and memory cost of maintaining that statistic still needs to be recorded.

TACH-5 chose the latter path. It estimated a recent noise scale from a rolling history of local innovations, then normalized surprise by that estimate. A large jump in a calm interval could remain important; a similarly sized jump amid high observation noise would receive less weight. The gate no longer treated all fluctuations as equally trustworthy.

This was an engineering repair to an event-triggered sensing policy. It was not a discovery of a previously unknown biological awareness principle.

## Reliability is not the same as confidence

The language of confidence can be slippery. A model might be confident because it has seen a familiar pattern, even when the environment has changed. A detector might be certain that a measurement is unusual while having no reason to trust the measurement. The proper quantity depends on the question being asked.

For a gating decision, the relevant question is not merely how different the latest observation is from the prediction. It is how much the observation should change the central estimate, given what is known about the observation channel, the world dynamics, and the cost of missing a genuine event.

Suppose a temperature sensor suddenly reports a ten-degree increase. If that sensor has been stable for months, the jump deserves attention. If it is known to produce intermittent electrical spikes, the same jump is weaker evidence. A human investigator does not need a theory of consciousness to make this distinction. An estimation algorithm can formalize it.

A reliability-aware gate might divide the innovation by a recent estimate of measurement variability. Another might maintain a full probabilistic model of observation noise and expected state changes. A third might learn the expected value of requesting a full sample under task-specific costs. These mechanisms are familiar competitors, not necessarily features unique to TACH.

The modified TACH-5 local branch used a rolling, approximately 32-step noise estimate based on recent innovations. It preserved the small salience-message alphabet and did not increase the number of full central B-content samples. The local computation, however, became more sophisticated. A claim of complete resource matching would therefore be too strong unless its cost were explicitly profiled.

On 160 new noisy worlds, the reliability-normalized gate achieved a post-event mean squared error of approximately 0.882. The raw novelty policy scored approximately 1.363, and periodic access approximately 1.133. The normalized policy beat raw novelty by about 0.481 error units, with a reported bootstrap interval from 0.406 to 0.558 across the constructed worlds.

The comparison shows that a simple reliability adjustment repaired much of the weakness in this environment. It does not establish that the adjusted algorithm is novel relative to robust Bayesian filtering. Nor does it establish an intrinsic micro-epoch phase benefit. The gate acquired different B samples when its schedule changed, so its accuracy advantage could be due to which evidence it obtained.

That distinction is the central inference boundary of the experiment.

## The mistake that arrives dressed as a discovery

Imagine a paper reporting that a rhythmic consciousness-inspired gate improves a hidden-state estimator by twenty percent. The graph would be impressive, especially with a brain-like illustration beside it. But what, exactly, caused the improvement?

Perhaps the gate sampled the changing stream at moments when the data were informative. Perhaps it had better noise calibration. Perhaps the baseline used a weaker selection policy. Perhaps the sampled observations contained different actual measurements. Perhaps the proposed model received a side channel that the control lacked. Perhaps its local processor performed more computation. Until these possibilities are separated, the interesting result is a task-performance difference with several plausible explanations.

The TACH-5 research record refused to call a sample-timing gain an intrinsic phase effect. This is a surprisingly consequential refusal. Much of the appeal of a micro-epoch theory comes from imagining that timing has a special causal role beyond ordinary sensing and state estimation. A test in which different gate schedules acquire different measurements cannot isolate that role, however carefully the rest of the experiment is implemented.

To test phase itself, one needs the same recorded observations and equal computational opportunities. Then one can change the relative timing of access or internal coordination without giving the system different evidence. If performance changes systematically, there may be a genuine coordination effect. If it does not, the original benefit was about acquiring useful samples.

Even then, an effect of temporal coordination would not establish subjective consciousness. It would explain a functional advantage under specified conditions.

The distinction is worth making because the word *temporal* can carry too many claims. A signal-processing algorithm is temporal because it works over time. A recurrent network is temporal because state persists across steps. A scheduled sensor is temporal because observations arrive at moments. An oscillatory circuit is temporal because its excitability changes periodically. A theory of conscious experience as discrete moments is an additional hypothesis. The first four do not entail the fifth.

The research becomes stronger when each timing claim is given its own experiment.

## A sample budget has hidden compartments

The TACH-5 benchmark conserved the number of full B-content samples entering the central estimator across several scheduling policies. It also used a small relevance side channel. Those were important constraints. But no two architectures are fairly matched merely because one convenient measure is equal.

The local branch received continuous B observations even when the central estimator did not. It could compute statistics and keep local state. A different architecture might use more central storage instead. A Bayesian filter might encode information about past observations into sufficient statistics rather than transmitting raw samples. A learned recurrent network might compress an entire window into a short latent message.

Which of these communications count as content? The answer cannot depend only on the name of the variable. An unsigned alert with two bits is still information. A learned four-dimensional vector can carry much more. A local state transmitted indirectly through future actions also changes what the central system can infer.

A rigorous comparison needs an information ledger: raw sensor samples, local processing budget, message bits, memory size, central update frequency, and output latency. It should identify which quantities are held fixed and which are not. If one design requires additional compute to normalize noise, that is not disqualifying. It simply changes the performance-per-cost comparison.

In real systems, selective access is valuable partly because resources differ in price. Local low-power processing may be cheap while sending full sensor content is expensive. A system that spends extra local computation to save network bandwidth can be a good design. The correct claim is then about resource allocation, not about a unique mechanism of consciousness.

This pragmatic view does not diminish TACH. It places the proposed architecture in the proper engineering landscape, where it can be evaluated against strong established ideas.

## The next intervention

There is a way to use the TACH-5 lesson constructively. Build a task in which the environment supplies the same recorded sensory stream to all models. The local branches can integrate that stream. The central workspace receives only a controlled number of messages. Compare event-triggered, periodic, irregular, and learned controllers with matched information and compute budgets.

Now manipulate the reliability of the stream independently of the importance of its latent changes. Sometimes noise is high and true events are small. Sometimes noise is low and true events are large. Sometimes the noise distribution changes without warning. Sometimes a rare but crucial change is easily mistaken for sensor noise.

The central question is whether the controller learns to prioritize expected value of information rather than the magnitude of surprise. This can be tested by downstream task loss, not just correlation with hidden change points. A controller that triggers on every anomaly may achieve excellent event recall while bankrupting its communication budget. A controller that ignores uncertainty may appear efficient and miss dangerous changes.

The comparison should also include a competent Bayesian estimator or adaptive sampling policy. If it matches the CHORD-specific gate, the same benefit has a simpler explanation. The named gate might still be worth retaining for modularity, auditability, or control, but its claim should be limited accordingly.

A second experiment asks whether reliable local evidence can remain encoded during a period when the global workspace is occupied elsewhere. At a later access event, can that local evidence revise a persistent belief without loss? Here the temporal access proposal confronts the continuity proposal. If the workspace forgets earlier context, accurate late evidence may be misused. If the local branch forgets too quickly, the evidence is gone before it is selected.

This test would move beyond choosing good samples. It would require maintaining and transferring structured information across interruptions under an information bottleneck. That is the kind of task on which an integrated architecture might earn a distinctive advantage.

## The sampler that knows the wrong thing
A sensor can be exceptionally good at detecting change and still be bad at deciding what the controller needs to know. Novelty is a property of the relationship between a measurement and an expectation. Relevance depends on the decision the system must make.

Suppose a warehouse robot is transporting a fragile package. A temperature sensor produces a large, unexpected fluctuation. A nearby visual system detects a subtle change in the path of another robot. Which event deserves the shared controller's attention? The temperature excursion may be meaningless noise; the small trajectory change may make a collision likely. The magnitude of the surprise is not enough to choose.

The decision can be framed in terms of expected loss. Missing an imminent collision carries a high cost. Ignoring a brief unreliable temperature spike may carry almost none. An access policy that understands the task's consequences can allocate information more intelligently than one that simply opens for the largest innovation.

This is a practical reason to distinguish relevance from novelty. TACH-5's reliability normalization improved the second problem: it reduced the chance of treating noisy fluctuations as meaningful. It did not fully solve task relevance. A sensor reading can be reliable and irrelevant, or noisy and crucial.

A stronger controller would estimate not only how trustworthy a signal is, but how much the central state or planned action could change if the signal were observed in detail. That is a version of expected value of information. It has a long history in decision theory and sensing. Any CHORD-specific implementation must be compared with that established family of methods.

A good stress test would systematically vary three factors: signal amplitude, reliability, and consequence. Some large changes would be harmless; some small changes would be dangerous. Sensor reliability would shift between episodes. The controller's budget would remain limited. The primary measure would be downstream task loss rather than novelty detection accuracy.

The distinction makes the architecture less romantic and more useful. A system should not be congratulated for noticing everything. It should be evaluated on whether it notices what changes its obligations.

### The side channel is still a door

The TACH-5 design allowed a local branch to send a small relevance code even when the central estimator was not receiving full content. This made the gate responsive without granting the central system an unlimited view of the secondary stream. It also introduced an information path that had to be counted.

Imagine a two-bit message with four possible values. It might encode no alert, weak alert, strong alert, or urgent alert. Even without a raw sample, the central controller learns something about local observations. If the encoding is highly correlated with a hidden event, the message can improve prediction before any full content is transmitted.

That is legitimate engineering. It is not legitimate to describe the local branch as perfectly inaccessible and then use the resulting performance to argue for consciousness-like suppression. The alert is a route for influence.

The information problem becomes harder in learned systems. A vector presented as a relevance score might also carry object identity, orientation, or location through subtle numerical patterns. If the message is continuous and high-dimensional, a downstream network may exploit those patterns without the experimenter intending it. A nominal gate can then fail to constrain access.

One defense is to restrict the message alphabet and measure its information capacity. Another is to train an independent probe on the alert stream to estimate how much task content it reveals. A third is to replace the alert with a shuffled control of the same marginal distribution and observe whether the central performance changes. None is perfect, but together they clarify what the side channel contributes.

The experiment should also compare against a baseline given the same alert bits. If the proposed gate alone receives a relevance hint, an accuracy advantage may simply reflect extra information.

These distinctions matter for privacy and security as well as cognitive theory. A system may restrict direct access to sensitive data while leaking information through metadata, timing, or alerts. An access architecture is credible only when it accounts for indirect channels.

### How much local work is free?

In the TACH-5 reliability repair, the local branch maintained a rolling estimate of noise from recent innovations. That was a sensible computation, but it used history and arithmetic that the raw novelty gate did not require.

An engineering evaluation should record the cost of that computation. It may be negligible compared with transmitting full sensor data. It may be important in a severely resource-limited device. Either way, the result is an exchange of local compute for central information efficiency.

There is no reason to conceal the trade. If a cheap microcontroller can estimate local noise and save expensive wireless transmissions, the design may be commercially useful. Its value does not depend on being consciousness-inspired. Indeed, the established theory of event-triggered estimation may provide better methods for optimizing the tradeoff.

An experimental report could plot error against communication budget and compute. Each model would contribute a curve rather than one score. A normalized gate might dominate the raw gate under high noise but offer little benefit when observations are clean. A Bayesian policy might outperform both at higher computational cost. The best design would depend on the available hardware and task consequences.

Such curves also expose whether a model's apparent superiority survives resource changes. An architecture that wins only at exactly 48 content samples during 256 steps may be exploiting the benchmark's particular budget. A robust method should show a useful region of operation, not one lucky point.

The lesson of TACH-5 is therefore broader than the numerical repair. The research began with a gate that selected information from surprise. Noise revealed the weakness in that criterion. A reliability estimate improved the policy while changing its computational budget. The remaining question is whether a task-aware policy provides further gains beyond conventional estimators.

That is enough substance for a valuable research program. It does not require a theory of conscious moments to justify better sensing.

### A failure that should stay in the chart

A final temptation is to publish only the repaired policy. If a researcher reports the normalized gate but removes the failed raw novelty condition, readers may conclude that reliability-aware selection was the original mechanism. The trajectory of discovery disappears.

Keeping the failure changes the meaning of success. It shows that a large innovation is not automatically useful and that the system can be harmed by its own attentional policy. It also prevents a future architecture from reintroducing the same error under a different name.

A reproducible report should show the ordinary regime where raw novelty gating helped, the noisy regime where it lost to periodic access, and the fresh noisy worlds where normalization repaired the deficit. It should include the original and corrected code, the number of samples, the side-channel specification, and the bootstrap uncertainty from constructed worlds. This is a coherent causal narrative, not a sequence of favorable snapshots.

If the next model adds a global readiness signal or recurrent binding controller, those should be evaluated separately. Otherwise a later gain might be mistakenly attributed to the newest conceptual addition when the earlier noise normalization did the work.

This discipline makes the lab's failures part of its intellectual property rather than blemishes to hide. They define the conditions under which a proposed component cannot be trusted. A useful engineering architecture needs that map as much as it needs the successful cases.

The gate that loved noise became a better gate when the model stopped treating every surprise as equally trustworthy. The next lesson is harder: a gate can look useful even when the specific event it was designed to control turns out not to matter.

## The virtue of an embarrassing result

The novelty gate's failure under high noise was not a detour from the research program. It was the point at which the program became more honest. The data rejected a simplistic interpretation: surprise is not an adequate proxy for relevance when observation reliability changes.

The repaired gate performed better, but the repair came from a familiar statistical idea. That is useful. It tells us which component improved the system and which part of the consciousness narrative has not been established.

There is an appealing metaphor in the failure: the gate loved noise because it mistook stimulation for importance. The metaphor should not become a claim that a software circuit possesses attention in the human subjective sense. It is a policy that allocated measurements poorly.

TACH-5 supported a mundane but consequential architectural recommendation. Reliability-aware selective access can outperform naive novelty gating under constrained communication in certain synthetic environments. It did not demonstrate an intrinsic oscillatory advantage, and it did not demonstrate machine consciousness.

The research could have been presented as a spectacular advance in artificial awareness. The numbers did not justify that story. The better story is that a gate learned to stop opening for every noise spike, and the experimenter learned not to call a sampling improvement a consciousness breakthrough.

The next TACH experiment asked an even harder question: what if the system could alter its own representation when the task changed, as macaque visual populations sometimes appear to do? That mechanism had a biological paper behind it and a clear computational test ahead. It would also fail to earn a decisive victory.
