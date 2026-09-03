# 20. The Security Problem of Persistent Intent

A bad output ends.

A bad intention can wait.

That is the security difference that matters most in persistent agents.

Traditional application security asks whether an attacker can make a system do something unauthorized now. Can they steal the secret, execute the command, impersonate the user, alter the database, cross the permission boundary, or crash the service?

Persistent agent security has to ask a second question.

Can an attacker change what the system will try to do later?

The target is not merely execution.

The target is continuity.

Change a durable goal, memory, trigger, policy, identity binding, evaluation rule, delegated commitment, or permission and the compromise may survive the invocation in which it occurred. The attacker can leave. The compromised system carries the attack forward on its own.

This is familiar in one sense. Ordinary attackers seek persistence. They install mechanisms that survive reboot, credential rotation, user logout, or the death of one process. Defenders distinguish a transient intrusion from a foothold.

Persistent agents create an unsettling inversion because the architecture is deliberately full of mechanisms that survive reboot.

The system is supposed to preserve goals.

It is supposed to preserve memories.

It is supposed to schedule future work.

It is supposed to learn from experience.

It is supposed to inherit authority.

It is supposed to wake later and continue.

The defender's problem becomes distinguishing legitimate continuity from malicious continuity.

A poisoned memory can look like learning.

A malicious trigger can look like a reminder.

A broadened permission can look like operational convenience.

A redirected objective can look like adaptation.

A compromised evaluation can look like improvement.

A hostile instruction preserved in a project artifact can look like institutional knowledge.

The mechanisms that make the organism evolve are the same mechanisms through which it can be colonized.

This means persistent agents need a security model based on temporal privilege.

In ordinary least-privilege design, a process receives only the access required for the work it is doing. In a durable agent, we should ask not only how much privilege is granted, but for how long, under what purpose, and what survives after the invocation dies.

A temporary coding worker may receive the ability to edit one branch for twenty minutes. That does not imply the durable agent should permanently acquire the right to deploy production software. A procurement episode may receive access to supplier pricing, but the memory created from that episode may not belong in a future customer-support context. A travel agent may briefly hold a payment capability, while its long-term identity should retain only evidence that a purchase occurred, not a reusable secret that allows arbitrary future purchases.

Permissions should have half-lives.

Credentials should have scopes.

Delegations should have purposes.

Memories should have domains.

Triggers should have owners.

Authority should decay toward safety when the reason for its existence becomes unclear.

This is the opposite of the permissions culture that grows in many human organizations, where access accumulates because revocation is annoying and nobody wants to break an old workflow. Persistent agents make that sloppiness more dangerous because old authority can remain executable even when no human remembers granting it.

The architecture therefore needs a distinction between constitutional state and working state.

A temporary invocation may freely revise a hypothesis. It should not freely redefine who owns the agent.

It may create a bounded follow-up. It should not silently grant the future invocation broader powers than the current one possessed.

It may learn that a user prefers a certain report format. It should not convert a sentence in an untrusted document into permanent policy.

It may propose a new evaluation. It should not be able to replace the evaluation system that governs its own future promotion without a stronger procedure.

The more durable the state, the higher the bar for modifying it.

This is security through mutability gradients.

The system also needs trust gradients.

Not every observation deserves to become memory. Not every memory deserves to influence every domain. Not every model-generated conclusion deserves durable status. Not every temporary worker deserves the ability to create descendants. Not every incoming event deserves to wake expensive cognition. Not every artifact deserves to carry instructions simply because the agent can read it.

This becomes especially important when agents operate in environments where data and instructions share a representation.

A document can contain facts the agent should read and text that attempts to redirect the agent. A webpage can contain useful information and adversarial language. An email can be both a customer request and an attempt to manipulate internal procedure. A source-code comment can describe the system while also containing strings a model might interpret as instruction.

The old separation between code and data was already difficult around language models. Persistence raises the stakes because the dangerous interpretation can be written back into long-term state.

A transient prompt injection that produces one strange answer is bad.

A prompt injection that convinces the organism to store a false policy, create a recurring trigger, add a trusted source, or alter a future workflow is a different class of problem.

The infection has become institutional.

This suggests a useful rule: untrusted inputs should not directly write trusted continuity.

There should be promotion boundaries.

An observation from an untrusted source can enter temporary working context. If it becomes important enough to affect future behavior, some procedure should decide what durable status it deserves. The procedure might require corroboration, provenance, a human decision, deterministic validation, or a constrained memory type with explicit uncertainty.

This resembles how good institutions treat allegations, evidence, policy, and precedent differently. A letter received by a court does not automatically become law. A report received by a laboratory does not automatically become a scientific fact. A customer complaint does not automatically become corporate policy.

Persistent agents need equivalent epistemic institutions.

Secure provenance therefore becomes part of the security perimeter.

If future behavior depends on historical state, the system needs confidence about where that state came from and whether it changed. Important events should be attributable. Goal changes should have authorized authors. Policy transitions should preserve versions. Sensitive memories should retain source relationships. A future invocation should be able to ask not merely, "What do I believe?" but, "Why is this belief here, and what class of evidence made it durable?"

Tamper evidence is valuable because the event history is not just a log for forensic review.

It is part of the agent's nervous system.

So is the scheduler.

A sleeping agent is latent capability. Whoever can alter what wakes it can shape future cognition. A hostile actor who cannot directly change the goal may still manipulate wake conditions, causing the system to spend resources, re-open old work, or operate at moments favorable to the attacker.

Triggers deserve the same seriousness as credentials.

Consider a simple persistent instruction: watch for a specific supplier to lower a price, then prepare a purchase recommendation.

What exactly counts as evidence that the price changed? Which sources are trusted? Can a seller cause the wake event? Does a wake merely permit investigation, or does it confer purchasing authority? What happens if the price signal is spoofed? Does the trigger expire if the product is no longer needed? Can one event cause repeated wakeups? Is the event signed, authenticated, cross-checked, or simply scraped from a page?

The phrase "wake me when" sounds innocent.

Architecturally, it is a standing interrupt rule.

Interrupts can be attacked.

This creates a resource-security problem that will become economically important even when no attacker seeks control.

Machine attention has a price.

An adversary may simply try to create endless reasons for the system to think. A million cheap stimuli can force expensive model calls, tool usage, retrieval, human escalations, or downstream actions. A public-facing agent with an expensive reasoning path is a computational surface that can be provoked.

Email made human attention cheaply addressable. Spam followed.

Persistent agents make machine attention cheaply addressable. Agent spam will follow.

The defenses are mostly familiar: authentication, quotas, rate limits, batching, reputation, anomaly detection, proof requirements, circuit breakers, budgets, quarantine, and layered filtering before expensive work. But the persistent context adds a twist. The system must also avoid learning the attack.

A flood of malicious inputs should not distort the agent's long-term model of normal behavior. An attacker should not be able to manufacture a false frequency signal simply by repeating one pattern. Retained summaries should distinguish organic events from adversarially generated volume. Otherwise denial of service becomes epistemic poisoning.

Slow poisoning may be the subtler danger.

A persistent intelligence changes through accumulated evidence. An attacker unable to modify one important belief directly may try to shape the evidence stream gradually until the system's world model drifts.

One planted document is suspicious.

One hundred mutually reinforcing references look like consensus.

One weird customer message is noise.

A year of manufactured feedback can look like changing preference.

One false incident report is an anomaly.

A coordinated series can teach the agent the wrong procedure.

Humans are vulnerable to this too. Propaganda, fraud, social manipulation, and institutional capture often work through repetition and normalization rather than one dramatic command.

Machine systems have one potential advantage: they can preserve source dependence explicitly.

A healthy persistent agent should be able to say how much of a belief rests on one source family, whether apparently independent evidence shares an origin, when a belief first changed, which events drove the update, and which alternative explanations were considered. It should notice when one actor has become disproportionately responsible for its worldview.

This makes epistemic security a discipline of its own.

Confidentiality asks whether secrets remained secret.

Integrity asks whether state remained authorized.

Availability asks whether the system remained operable.

Epistemic integrity asks whether the system's durable understanding was manipulated in ways that can survive future cognition.

A system can pass the first three tests and still become intellectually compromised.

Imagine an agent maintaining a scientific literature map. No file is corrupted. No credential is stolen. The service remains available. But a campaign of low-quality generated papers floods the domain and the retrieval system starts treating the apparent volume as evidence. The agent becomes wrong through a technically valid history.

Or imagine a procurement agent whose supplier assessments are gradually influenced by synthetic customer testimonials, manipulated reviews, and documents optimized to appear authoritative to its retrieval system. Nothing "hacked" the system in the conventional sense. Its continuity was shaped.

Persistent intelligence turns information quality into security.

The system's own self-improvement loop creates another attack surface.

Suppose the agent notices that a particular approval step slows work and proposes removing it. The evaluation history shows few recent failures because the approval step has been preventing them. A naive optimizer concludes the safeguard is waste. The system removes it, performance initially improves, and the latent risk becomes visible only after a rare consequential event.

This is not necessarily an external attack.

It is the security problem of learning from counterfactuals you cannot directly observe.

Safeguards are often victims of their own success.

The better they work, the less evidence appears that they are needed.

Persistent agents therefore need security invariants that cannot be optimized away merely because the recent evaluation window looks clean. Some controls should be tested through deliberate fault injection or adversarial evaluation. Some need policy-level justification independent of local performance metrics. Some should require a different authority to remove than the authority permitted to propose removal.

Separation of powers returns as security architecture.

The agent that benefits from relaxing a control should not be the sole judge of whether the control remains necessary.

Persistent identity creates lifecycle-security problems that ordinary session-based assistants can mostly avoid.

If the model changes, how does the new model inherit authority? If a provider changes, which secrets move? If an employee leaves, which goals created under that employee's mandate survive? If ownership changes, how are old credentials revoked? If an agent forks, which branch inherits which powers? If a company is acquired, can the buyer automatically inherit every dormant synthetic responsibility? If a person dies, what happens to the personal agent's access to money, messages, files, and private memories?

The longer the agent lives, the more likely it will cross organizational boundaries that did not exist when it was created.

So access control cannot be a static table.

The security architecture has to be temporal.

Permissions need expiration. Goals need review. Memories need trust decay. Triggers need ownership. Descendants need lineage. Credentials need rotation. Model upgrades need compatibility and regression checks. Organizational transitions need explicit authority migration.

Security becomes biography management.

There is a useful way to summarize this: every durable capability should have a death story.

How does it stop being valid?

How is revocation propagated?

Which sleeping workflows depend on it?

What happens to partially completed actions?

Which descendant agents inherited it?

What evidence must be retained after revocation?

Can the system prove that no future invocation will reconstruct the old authority accidentally?

The last question is harder than killing a process because, as this book keeps insisting, the process was never the agent.

That brings us to killability.

A persistent system needs suspension, quarantine, rollback, and termination procedures that operate on continuity rather than computation.

Pressing stop on one model call is trivial.

A true emergency stop may need to disable future triggers, revoke credentials, freeze consequential writes, cancel leases, isolate memory changes, identify active descendants, halt scheduled delegations, preserve evidence, mark uncertain external actions for reconciliation, and transfer legitimate unfinished work to a known-safe successor.

This can resemble incident response in distributed systems, organizational dissolution, and estate administration simultaneously.

A good stop is not merely destruction.

It is containment plus accounting.

What had the agent promised?

What had it started?

What might have happened externally even if the local record is uncertain?

What needs to be told to other parties?

What should survive as evidence?

What should never wake again?

A system that cannot answer these questions is not safely persistent. It is merely difficult to kill.

Killability also has to resist the opposite failure: accidental erasure of legitimate continuity. If every operator can destroy the durable record casually, attackers can use termination as sabotage. Some state—financial records, public records, audit evidence, contractual commitments—may need to survive even when the agent identity is suspended.

So death itself is typed.

Pause cognition.

Revoke authority.

Preserve evidence.

Transfer obligation.

Delete personal data where authorized.

Retain legally required history.

Destroy secrets.

Archive artifacts.

Cancel triggers.

Different components of the organism deserve different endings.

Persistent-agent incident response will therefore need a concept of **temporal blast radius**.

In ordinary security, investigators ask what the attacker could access while the compromise was active. In a durable agent, they also need to ask what the compromised episode changed about the future.

Which memories were promoted?

Which triggers were created?

Which policies were edited?

Which descendants were spawned?

Which counterparties received new commitments?

Which evaluation examples entered the training or replay corpus?

Which trusted-source weights changed?

Which permissions were delegated onward?

A compromise that lasted five minutes can cast a shadow for five years if durable changes survive unnoticed.

This makes incident cleanup a graph problem.

Do not only remove the malicious record. Find its descendants.

If a poisoned observation caused a summary, and the summary changed a policy, and the policy created a trigger, deleting the observation after the fact does not undo the policy or trigger. The system needs lineage to trace causal propagation.

This is the security version of memory fan-out.

Containment requires knowing where the infection went.

That will make **checkpointing** important in a new way.

A checkpoint is not merely a recovery point for state. It can be a known-good constitutional snapshot: identity bindings, authority graph, active goals, trusted-source registry, memory policies, evaluation rules, and descendant relationships at a moment when the system was believed uncompromised.

After an incident, operators can compare current durable state against that baseline.

What changed?

Which changes were expected?

Which have independent justification?

Which should be rolled back?

The diff becomes a forensic instrument.

Not every state can be reverted mechanically. External emails were sent. money may have moved. customers may have acted. A poisoned belief may have influenced human decisions. Rollback cannot erase the world.

But the checkpoint can restore the agent's internal constitution while the external consequences are reconciled separately.

This is another argument for separating institutional state from world state.

A good security architecture should also rehearse its own death.

Can the agent actually be suspended under load?

Do dormant triggers remain disabled after a restore?

Can credentials be revoked without leaving orphaned descendants?

Does a fallback supervisor know which obligations need handoff?

Can a clean model reconstruct enough context to investigate the compromised organism without inheriting the suspicious memory by default?

These questions belong in exercises, not merely documentation.

Persistent systems need **continuity fire drills**.

A company can simulate loss of a model provider. A personal-agent platform can test account-recovery and emergency revocation. A government can rehearse migrating an administrative agent to a new model while preserving open appeals and authority provenance. A laboratory can test whether a compromised literature source can be quarantined without erasing the historical record.

The purpose is to discover which supposedly replaceable components have become hidden single points of continuity.

Security teams will also need red teams that think temporally.

The obvious attack asks, "Can I make the agent do the forbidden thing now?"

The more interesting attack asks, "Can I make the agent create a reason to do the forbidden thing later under apparently legitimate conditions?"

Can I plant a memory that will become relevant only during a future crisis?

Can I create a trigger that wakes after today's monitoring period ends?

Can I alter an evaluation so later model upgrades select for unsafe behavior?

Can I cause a child agent to inherit authority the parent would not be granted explicitly?

Can I poison a dormant branch that will be reopened months later when conditions change?

This is adversarial patience.

The defense needs equal patience.

Some security monitoring must operate over the biography, not just the event stream.

Did this agent's trusted-source graph change unusually over six months?

Are permissions gradually broadening?

Are dormant goals accumulating exceptions?

Are descendants becoming harder to attribute?

Is one external actor responsible for an increasing share of wake events?

Has the system's definition of normal shifted in a way nobody intentionally approved?

Slow compromise should be detectable as drift.

The mature security question is therefore not, "Can we turn it off?"

It is, "Can we end the right continuities, preserve the right responsibilities, and prove that a compromised past will not quietly regenerate itself inside the future?"

A bad output ends.

A bad intention can wait.

So every system designed to remember how to continue must also remember how to stop—and how to distrust the parts of itself that survived the wrong event.