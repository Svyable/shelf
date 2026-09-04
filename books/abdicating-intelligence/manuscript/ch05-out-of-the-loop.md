# Out of the Loop

The ideal automatic system is often imagined as a worker who never tires.

It watches continuously. It follows procedure. It responds faster than a person. It has no bad morning, no argument with a spouse, no lapse after lunch, no temptation to skip the boring step because the last thousand cases were fine.

Then something unusual happens and the person is asked to take over.

That handoff contains one of the oldest ironies in automation.

The better the system performs during ordinary operation, the less practice the human may have when ordinary operation ends.

Lisanne Bainbridge put the problem sharply in a 1983 paper titled “Ironies of Automation.” Designers often automate the tasks that can be specified and leave people with the tasks that cannot. The human is expected to monitor a reliable system and intervene when it behaves abnormally, even though monitoring is difficult and the skills needed for intervention may erode through lack of use.

Automation removes the work and preserves the responsibility.

Twelve years later, Mica Endsley and Esin Kiris studied what became known as the out-of-the-loop performance problem. Their experiments examined levels of automation and the effects on situation awareness and the ability to resume manual control. The details belong to a specific experimental setting, but the general phenomenon has endured in human-factors research: a person who is no longer actively controlling a process can lose awareness of its state and become slower or worse at taking over.

The phrase *out of the loop* is now common enough to have lost some of its strangeness.

A loop is a relationship between perception and action.

You do something. The world changes. You observe the change. You adjust. Repeated interaction keeps a model alive because action continuously tests expectation.

Automation can break the action side of the loop while leaving the human nominally responsible for perception.

Watch the system.

Do not interfere.

Be ready at any moment to perform the hardest case.

This is a peculiar job description.

Aviation has spent decades learning how peculiar.

Modern commercial aircraft are among the strongest arguments for automation ever built. Automatic flight systems reduce workload, support precision, improve efficiency, and contribute to an extraordinary safety record. No serious discussion should romanticize a return to an earlier cockpit as though hand-flying itself were safety.

Yet regulators and airlines have also worried about manual-flying proficiency and the effects of prolonged automation. In a 2013 Safety Alert for Operators, the U.S. Federal Aviation Administration encouraged operators to promote manual flight operations when appropriate. The concern was not that automation had failed as a technology. It was that humans retained responsibilities requiring skills that could weaken when rarely exercised.

This is the paradox we will encounter again and again.

Successful automation can make the residual human role more difficult.

The routine work disappears first. What remains is exception handling, ambiguity, conflict between signals, ethical judgment, novel combinations, and failures that the automated system itself could not resolve.

The human receives fewer cases and a harder distribution.

In statistics, you would say the sample changed.

In a career, you feel rusty.

Consider a pilot during a long flight under automation. The pilot is not doing nothing. Modern flight decks require monitoring, communication, planning, procedure, weather assessment, and systems management. But direct control is different from supervisory control. The cues available through continuous manipulation of a system are not identical to the cues available while watching it.

When automation disconnects unexpectedly, the pilot may need to reconstruct state quickly under stress.

Where is the energy? What modes were active? Which indications are reliable? What changed first? What is the aircraft actually doing rather than what the automation had been commanded to do?

Situation awareness has to be rebuilt from whatever remains visible.

A knowledge worker with an AI agent can enter the same structure more quietly.

An analyst lets the system collect data, choose transformations, draft a model, write the narrative, and generate the slides. The analyst reviews. The system performs brilliantly for months. Then one quarter the input data changes subtly, a key definition moves, a historical relationship breaks, or a source is corrupted.

The analyst is asked to take over.

But take over what?

There may be no single control surface. The work was a chain of judgments distributed across prompts, retrieved documents, generated code, intermediate summaries, and automatic revisions. The human sees the final artifact and perhaps a log too large to reconstruct mentally.

This is not merely an accuracy problem.

It is an observability problem.

Good automation gives the supervising human enough state to understand what the system believes it is doing. Poor automation gives a result and a confidence-shaped decoration.

The difference becomes crucial as agents grow more autonomous. If a system only suggests text, the user remains close to the work. If it executes a sequence of twenty actions across software tools, the user may receive a success message after decisions that were never individually visible.

Autonomy stretches the loop.

The obvious answer is better logging. Logs matter, but logs are not situation awareness. A cockpit could record every bit changing inside the aircraft and still overwhelm the pilot. The important design problem is selecting the state that supports the next human decision.

Human-factors engineering calls attention to this because more information can reduce understanding when it arrives without structure.

Generated systems create a new version of the problem: they can explain themselves fluently.

Fluency can be useful. An agent can summarize what it did, identify files changed, list assumptions, and flag uncertainties. This may be far better than raw logs.

It also creates a temptation to let the same system that performed the work decide which parts of the work deserve human attention.

The supervisor receives a self-authored incident report from the subordinate being supervised.

Sometimes that is fine. Sometimes independent instrumentation is necessary.

High-consequence systems often distinguish the process from the monitor. A security control may be observed by a separate logging service. Financial records are reconciled against independent accounts. Safety systems can be designed so that one failure does not disable the mechanism intended to detect it.

AI systems will need similar architectural thinking.

A verifier is most useful when it is independent along a dimension relevant to the possible error. Different data, different method, different model family, deterministic constraint, human expertise, physical measurement, or external source can all create independence. Asking the same model to “double-check” may improve performance, but agreement is not proof of independence.

The loop matters because it creates opportunities for contradiction.

Active operators continuously generate expectations: if I move this control, that indicator should change. If the world disagrees, the disagreement itself becomes evidence.

Passive supervision generates fewer such tests.

One way to preserve cognition under automation is therefore to preserve prediction.

Before the system reveals an answer, ask the human what they expect. Before the agent executes an irreversible step, ask for the criterion that would stop it. Before the diagnostic model displays its top result, capture the clinician's first assessment in selected cases. Before the code generator explains a bug, ask the developer which state transition seems most likely.

Prediction keeps a model in contact with reality.

It also produces disagreement data. If human and machine expectations diverge, the divergence can trigger deeper review. Most of the time the machine may be right. That does not make the human prediction wasted. It makes it an independent signal.

The design resembles a laboratory more than a vending machine.

You form an expectation, observe, update.

There is another reason to care about loops: accountability decays with distance from action.

When a person performs a task directly, the causal connection between decision and outcome is often visible. When a person approves a plan assembled through many automated steps, responsibility can remain formally attached while psychological ownership weakens.

“I approved it” becomes “the system recommended it and nothing looked wrong.”

This is not necessarily an excuse. It is a predictable feature of supervisory control.

Organizations should design for it rather than relying on moral exhortation.

If a human is expected to carry responsibility, the workflow should give that human real leverage: enough information, time, competence, and authority to disagree. A five-second confirmation box after an agent has prepared a complex transaction is not meaningful oversight simply because a person clicked it.

The speed mismatch is especially dangerous.

Machines can generate and act faster than humans can review. If productivity goals assume machine-speed throughput while policy demands human verification, one of those requirements will become fictional. The reviewer will skim, approve by default, or become the bottleneck management is pressured to remove.

Human oversight must therefore be budgeted.

This sounds mundane. It is central.

A company that generates a million consequential decisions cannot honestly claim that twelve employees meaningfully review every one. It must decide which cases receive human attention, which controls can be deterministic, which decisions are reversible, how samples are audited, and what thresholds trigger escalation.

The architecture of oversight is an allocation problem.

But this book is concerned with what that architecture does to the overseer.

If humans see only edge cases, their world can become distorted. Imagine a fraud investigator whose AI system clears ninety-eight percent of transactions and sends only suspicious ones. The investigator becomes efficient because attention is concentrated where it matters.

Over time, however, the investigator's experience contains almost no normal transactions. Their mental base rate can shift. The worker becomes expert in anomalies and less familiar with the distribution from which anomalies arise.

Selective automation changes experience.

The same occurs in medicine when triage systems route only difficult cases to specialists, in customer service when bots handle routine questions, and in software when agents resolve simple defects. The human role moves upward in complexity but loses breadth.

This can be desirable. Specialization often improves performance.

It can also make training difficult because novices are asked to begin where the automation stops.

A senior professional can supervise a system using models built before the system existed. A junior professional cannot inherit those models telepathically.

The profession needs a curriculum for the automated world.

Aviation again offers a useful analogy, not because every office should become a cockpit but because aviation takes recurrent proficiency seriously. Pilots train on simulators precisely because real operations no longer provide enough safe exposure to rare failures. The simulator manufactures experience that ordinary automation has removed.

Knowledge work may need synthetic experience too.

If an AI agent handles routine contract review, junior lawyers can be given curated cases in which clauses conflict, sources are missing, and the model is intentionally uncertain. If diagnostic systems handle ordinary pattern matching, clinicians can practice with masked assistance and cases designed around known failure modes. If coding agents write standard functions, engineers can conduct failure drills on generated systems with hidden defects.

The exercise is not nostalgia.

It is loop maintenance.

The organization is deliberately reconnecting perception and action so that a capability survives between real exceptions.

There is a cost. Training time is visible. The avoided failure is hypothetical. Quarterly accounting will favor the automation and discount the rehearsal.

That is why institutions need explicit reserve policies.

We do this for many physical systems. Backup generators are expensive when the grid works. Spare parts consume space when machines do not break. Cyber incident exercises interrupt productive work. Redundancy looks wasteful until the primary system fails.

Cognitive reserve is no different in principle.

The harder question is how much to preserve.

Too little and the human becomes a decorative fallback. Too much and society wastes enormous effort reproducing tasks machines perform safely and cheaply.

The answer should vary by consequence, reversibility, failure correlation, and replacement time.

If a writing assistant fails, a company can tolerate inconvenience. If a system that allocates emergency care fails, retained human capability matters more. If expertise can be rebuilt in a week, reserve requirements can be modest. If expertise takes a decade of practice, letting the pipeline disappear is a long bet.

The important thing is to make the bet consciously.

Out-of-the-loop failure is often treated as a human weakness: people become complacent, inattentive, or rusty.

That framing misses the engineering problem.

A system that requires a person to maintain expert readiness while denying the person meaningful interaction is poorly designed for the human it contains.

The human did not fail to remain magically practiced.

The loop stopped practicing them.

Artificial intelligence will create millions of new supervisory roles, many without that title. Teachers supervising generated assignments. Managers supervising generated analysis. Doctors supervising generated recommendations. Programmers supervising generated code. Citizens supervising generated explanations of public affairs.

We should ask of each role what aviation eventually had to ask of automation:

What does the person still need to know?

How will they continue to know it?

What information will be visible when the ordinary system stops being ordinary?

And when the machine finally says, in effect, “your controls,” will there still be a pilot there?
