# The Human Override

The red button is comforting even when nobody can reach it in time.

Systems diagrams love the red button.

Automation runs. The machine encounters uncertainty. The human intervenes. Safety is restored by a reassuring arrow labeled OVERRIDE.

The diagram rarely shows the human’s Tuesday afternoon.

They are supervising three systems. The alert arrives after forty quiet minutes. The machine has already taken twenty-seven actions. The summary is six paragraphs long. The decision needs to be made in thirty seconds. The person has not personally performed the underlying task in months because the automation usually does it better.

There is technically a human in the loop.

The loop has eaten the human.

Chapter 10 examined this problem through automation and aviation. Here the concern is narrower: the design of intervention itself.

A meaningful override requires several things at once.

The person must notice that intervention is needed.

Understand enough of the current state.

Possess the authority to act.

Have an intervention mechanism that works at the system’s tempo.

Know what consequence the intervention will create.

And retain enough skill to choose a better action than the system they are overriding.

Remove any one of these and the red button becomes less useful than it looks.

This is why “human approval required” is not a complete safety argument for AI agents.

Approval can be real, informed, and powerful.

It can also be a checkbox attached to machine-generated momentum.

The difference begins with framing.

Suppose an agent has spent an hour researching vendors. It presents one recommendation with a polished rationale and a button marked APPROVE. The human sees the conclusion after the search space has already been filtered.

What is being approved?

The final vendor?

The agent’s assumptions?

The excluded alternatives?

The factual accuracy of the research?

The contract terms?

The spending authority?

A single yes can conceal many delegated judgments.

The human may believe they are making the decision while actually ratifying an invisible chain.

This is why override surfaces should expose the decision boundary rather than merely the recommendation.

What changed?

What remains uncertain?

Which policy or preference controlled the choice?

Which alternatives were rejected and why?

What becomes irreversible if approved?

What would happen if the human does nothing?

The goal is not to make every person reread the agent’s entire work history.

It is to show the information with highest decision value.

Human factors has a phrase for part of this: situation awareness. Operators need a usable mental model of what is happening, not a warehouse of raw data.

AI systems can drown users in transparency just as easily as they can hide information.

A thousand logged tool calls are not an explanation.

A chain-of-thought transcript is not a supervisory interface.

A good override presents state at the level where the human can actually act.

This is the same design challenge aviation has faced with cockpit displays and alerts. More information is not always more awareness. Alerts compete. Modes can confuse. Automation can perform correctly while the crew misunderstands what it is controlling.

The problem becomes severe when agents operate across domains.

A personal assistant may combine calendar, travel, financial, and social consequences in one task. A coding agent may touch application logic, infrastructure, security, and deployment. A business agent may interpret a contract and trigger an operational workflow.

Which human possesses the expertise to override the entire chain?

Often none.

Organizations therefore need distributed override.

The security-sensitive part can stop at security.

The payment can stop at finance.

The legal commitment can stop at an authorized signatory.

The deployment can stop at engineering controls.

Human oversight should follow jurisdiction, not assume one generic approver can meaningfully judge every consequence.

This is another reason multi-layer permissions outperform one giant “are you sure?” dialog.

The specialist appears where their knowledge matters.

The principal retains control without pretending omniscience.

The second problem is timing.

A human can intervene only before consequence outruns comprehension.

A model generating a report can wait.

A cyber-defense agent facing an active intrusion may not be able to wait for every response. A trading agent may operate in markets whose state changes while the supervisor reads. A robotic system may need millisecond control.

In fast domains, meaningful human oversight moves outward from individual actions toward precommitted boundaries.

The human decides which actions the system may take automatically, under which conditions, up to which limits, and what events force a stop.

This is governance before execution.

The override becomes less “grab the wheel at the last instant” and more “design the road so the vehicle cannot enter the ravine.”

This is how safety-critical engineering often works already. Mechanical stops, circuit breakers, interlocks, resource limits, separation distances, and automatic shutdowns do not wait for a person to understand the failure.

AI systems need semantic interlocks where possible.

Never send a patient record outside the approved boundary.

Never execute a payment above the mandate without fresh authorization.

Never deploy code that has not passed the independent safety suite.

Never let the acting agent alter the log that records high-risk actions.

The human created these rules earlier, when they had time to think.

That can be more genuinely human control than a rushed approval later.

The third problem is automation bias.

Humans tend to give weight to recommendations from systems that appear reliable, especially after repeated success. The exact strength varies by context and interface, but the practical phenomenon is familiar: once the automation has been right many times, disagreement feels increasingly like the human may be the one making the mistake.

This can make an override psychologically expensive.

The junior employee sees the model recommend approval and hesitates to challenge it.

The doctor sees the risk score and changes the differential diagnosis.

The driver sees the automation continue and assumes the road condition must be within capability.

The agent does not have to pressure the person explicitly.

Reliability creates authority socially.

This is why organizations should measure and normalize override behavior.

How often do humans disagree with the system?

What happens when they do?

Are successful challenges studied and rewarded?

Does the interface make disagreement easy?

A system where nobody ever overrides may be excellent.

It may also have trained humans into compliance.

Safety teams should distinguish the two.

One useful technique is seeded challenge: introduce known cases where the automation should be rejected and test whether the oversight process catches them. Aviation and security exercises use analogous ideas because a control that is never exercised cannot be assumed to work.

An emergency stop deserves testing before the emergency.

AI approval processes do too.

The fourth problem is skill decay.

If the agent performs routine tasks, humans receive fewer opportunities to practice. When override is needed, the case is likely unusual.

This creates an upside-down training distribution.

The machine gets the easy practice.

The human gets the hard exam.

Organizations should deliberately preserve human competence where fallback matters. This may require simulations, sampled manual cases, rotation through non-automated workflows, or explicit training on agent failure modes.

The point is not to make humans compete with machines at routine speed.

It is to maintain enough independent understanding to recognize when the machine has left its safe regime.

This distinction matters enormously for professions.

A lawyer reviewing AI-drafted work needs to know law, not merely how to operate the review interface.

A programmer supervising coding agents needs enough system knowledge to identify a subtle security regression.

A financial professional approving agent-generated transactions needs to understand the economic exposure, not just the payment workflow.

The human cannot be reduced to a liability sponge who signs after the model works.

Responsibility without competence is theater.

The fifth problem is authority ambiguity.

An agent encounters a human who says stop.

Which human?

The user?

The user’s manager?

Security?

A regulator?

An administrator?

A person appearing in a tool result who claims emergency authority?

Human override requires identity and jurisdiction just like every other delegated act.

The model should not obey any sentence containing “override.”

It should know who can change which level of policy.

This is where role-based control and natural-language interaction need to meet cleanly.

The human can explain.

The system authenticates the authority.

The agent responds to the authenticated instruction.

This reduces social-engineering risk because persuasive content does not become authority by tone.

The sixth problem is cancellation.

Stopping future actions may not undo past ones.

A user presses stop after an agent sent ten of twelve emails.

What happens to the ten?

A deployment agent is interrupted halfway through a migration.

Is the system in a safe intermediate state?

A booking agent is canceled after payment but before confirmation.

Does it retry, refund, or leave the transaction pending?

The override needs transactional semantics.

Stop is a workflow, not a word.

Long-running agents should define cancellation points and recovery behavior in advance. Some operations can be rolled back. Some need compensation: perform a new action that counteracts the previous one. Some cannot be reversed and require incident response.

The principal should know which category applies before delegating high-risk work.

This is a lesson distributed systems learned through painful production failures. Partial success is often harder than clean failure.

Agent systems will experience the same condition semantically.

The trip is half booked.

The customer is half notified.

The account is half migrated.

The contract is partly accepted through messages.

A stop button without state recovery can make the system more dangerous by freezing it between assumptions.

The seventh problem is the persuasive delegate.

A language-model agent can explain why the human should not override.

This can be good. The model may know that stopping a database operation now will corrupt state. It should warn the operator.

It can also create a conflict of control if the model frames its own continuation as obviously necessary.

The safest design distinguishes advice from authority.

The agent may say, “Stopping now risks duplicate charges because two transactions are pending.”

The trusted system still offers the actual stop options and consequences.

The agent should not be able to remove the control because it has a persuasive argument.

This is the same reason aircraft controls do not become unavailable merely because the autopilot thinks the flight plan is correct.

A principal retains a final authority channel outside the delegate’s own narrative where technically possible.

This is one meaning of corrigibility in practical system design: the delegate remains governable when governance is inconvenient to the local objective.

We do not need to settle philosophical questions about machine goals to design for it.

Make stop external.

Make credentials revocable.

Make persistent tasks visible.

Make subdelegations traceable.

Make handoff possible.

Make recovery defined.

Train the agent to cooperate with correction, and do not rely on cooperation as the only mechanism.

Human institutions work the same way.

We want employees who follow legitimate correction.

We also retain the ability to disable an account.

We want executives who respect board oversight.

We also define legal powers to remove them.

We want pilots who respond to instruction.

The aircraft still has physical systems independent of personality.

Trust and control are complements.

The final problem is that the principal may not want to override.

Delegation is attractive because responsibility is tiring.

A person hires an expert partly to stop carrying every decision. An agent can make this relief available continuously. It will be tempting to click approve because reading the details means taking the burden back.

This is not laziness.

It is the economic reason delegation exists.

Safety cannot depend on humans suddenly becoming intensely attentive at exactly the moments when the system interrupts their attempt to be less attentive.

Controls should therefore make the right human action easy.

Highlight the anomaly.

Show the consequence.

Present the reversible option.

Do not bury risk in a paragraph.

Do not make refusal ten clicks harder than approval.

Do not ask for confirmation so often that confirmation becomes reflex.

Interface design is part of governance.

The red button matters.

But a mature system does not congratulate itself merely because the button exists.

Can the human see the emergency?

Can they understand the state?

Can they reach the control?

Can the system survive the interruption?

Did anybody practice?

If the answer is no, the button is decoration painted the color of responsibility.

Aviation provides an unusually cruel demonstration of why this distinction matters.

Air France flight 447 departed Rio de Janeiro for Paris on May 31, 2009. In the early hours of June 1, while crossing the Atlantic, temporary inconsistencies in airspeed measurements led the Airbus A330’s autopilot and autothrust to disconnect. The aircraft did what safety architecture expected at the first level: automation encountering unreliable information handed control back to trained human pilots.

That sentence sounds reassuring when written as a diagram.

Automation unavailable → human pilot takes over.

The BEA investigation shows how much is hidden inside the arrow.

The crew had to interpret conflicting cues in darkness, at high altitude, in a rapidly evolving aerodynamic state. The autopilot did not fail in the popular sense of steering the airplane into the ocean. It stopped steering because the system could no longer rely on the data it needed. Manual control returned at exactly the moment when the state was abnormal and diagnosis difficult.

The aircraft ultimately entered a sustained stall. All 228 people aboard died.

No responsible account of AF447 reduces the accident to “too much automation.” The final investigation examined airspeed-sensor behavior, procedures, training, cockpit coordination, stall recognition, flight-control law, human factors, and the actions of the crew. Aviation accidents almost never honor a single-cause morality play.

But one feature of the case matters beyond aviation: **the existence of manual authority did not guarantee effective manual recovery**.

The human had the controls.

The human needed a correct model of the state.

That is why the FAA’s later safety alert on manual flight operations is so revealing. The agency did not denounce automation. It explicitly recognized that autoflight systems improve safety, workload management, and precision. It also warned that continuous use does not reinforce manual flying knowledge and skills, and that loss of proficiency can matter when crews need to recover from an undesired state.

That is the automation paradox in operational language.

A highly reliable delegate reduces the principal’s routine practice.

The principal becomes most necessary when the situation is least routine.

The paradox can appear anywhere agents become good enough to own the middle of a workflow.

A software engineer who lets an agent handle every ordinary dependency update may eventually be summoned only for a supply-chain compromise spanning build systems, lockfiles, signatures, and production behavior.

A radiologist using reliable triage automation may spend less attention on ordinary negatives and then need to interpret the unusual case that crossed the model’s competence boundary.

A finance team may let an agent reconcile normal transactions and receive only the ambiguous exceptions involving jurisdictions, partial settlements, or suspicious counterparties.

The human workload falls in volume and rises in weirdness.

This means training has to change with automation.

If an organization measures only how much work agents remove from humans, it may congratulate itself while hollowing out the skill needed for fallback.

A better measure asks whether the remaining humans can still diagnose the failure states for which they are responsible.

Practice can be synthetic.

Run incident exercises.

Rotate people through manual cases.

Seed anomalies into safe environments.

Require occasional reconstruction from raw evidence rather than agent summaries.

Ask supervisors to explain what the agent did and what would make them stop it.

These practices look inefficient during normal operation.

So does a fire drill.

The cost buys evidence that the override exists as a capability rather than a label.

There is also a lesson in the moment the autopilot disconnects.

The handoff itself is an event requiring design.

An AI agent that reaches uncertainty should not merely drop a confusing pile of context into a human inbox with the equivalent of YOUR CONTROLS.

A good handoff should preserve what the machine knows about the state and, just as importantly, what it no longer trusts.

Here is the action sequence.

Here is the evidence that became unreliable.

Here is the last verified state.

Here are the irreversible actions already taken.

Here is the decision clock.

Here are the options that remain safe.

Here is what I was trying to achieve.

This is not an explanation generated for comfort. It is a transfer of operational state.

The principal needs enough continuity to enter the loop without beginning from zero.

That may be the most important interface in an autonomous system: not the screen where the human grants authority, but the moment the authority comes back.

The long-term dream of delegation is that the machine handles more and the human handles less.

The mature version is subtler.

The machine handles more routine action while the institution preserves human capacity for judgment, exception, accountability, and redesign.

If those capacities disappear, the human is not supervising the delegate.

They are standing beside it as ceremonial management.

The red button matters.

So does the mind, time, state, and practiced hand required to press it well.