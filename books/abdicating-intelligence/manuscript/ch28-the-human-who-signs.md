# The Human Who Signs

A signature used to carry a practical implication.

Somebody had seen the work.

Not necessarily every line. Not necessarily every calculation. Modern institutions are too complex for that fiction. But the signature meant that responsibility had found a person or office. Someone had enough authority to approve the result and enough connection to the process to be answerable for it.

Artificial intelligence can weaken that implication without removing the signature.

The human name remains at the bottom.

The work above it may have become largely machine-produced.

This is an awkward arrangement because it preserves the appearance of accountability while separating accountability from comprehension.

A lawyer signs a filing assembled with machine research.

A physician approves a note drafted by a clinical system.

An engineer accepts a design recommendation generated through an automated workflow.

A public official authorizes a decision whose explanation was synthesized by software from rules, models, and records the official did not personally inspect.

A scientist submits a paper after using AI to search literature, draft passages, propose analyses, and respond to reviewers.

The human is still there.

What does “there” mean?

The question is not whether machines deserve authorship, personhood, or blame. Those debates can become philosophically interesting very quickly. The operational problem arrives earlier.

Who is able to answer for the decision?

That verb contains more than blame.

To answer for something is to explain what happened, defend the relevant reasons, acknowledge uncertainty, respond to challenge, and alter the system when the reasons fail.

A person can bear formal responsibility without possessing any of those capacities.

This is how the human in the loop becomes decoration.

Human-factors researchers have studied versions of the problem for decades. Automation bias describes the tendency to rely too heavily on automated recommendations, including failures to notice errors introduced by decision-support systems. Automation complacency appears when monitoring weakens because the automated process usually performs well and attention moves elsewhere.

These effects are not evidence that humans are too foolish to supervise machines.

They are evidence that supervision is work.

Work requires time, information, skill, incentives, and an interface that gives the supervisor a real chance to detect a problem.

Remove those conditions and “human oversight” becomes a phrase rather than a control.

Imagine an employee who must review two hundred machine-generated decisions in an afternoon.

Each arrives with a recommendation, a concise explanation, and a green confidence indicator. The system is right almost all the time. The employee is evaluated partly on throughput. Reversing the recommendation requires opening another screen, documenting the reason, and sometimes asking a manager for approval.

Technically, a human decides every case.

Practically, the machine does.

The organization has preserved a click and lost a judgment.

This architecture is attractive because it solves several institutional problems at once.

Leaders can claim that no decision is fully automated.

Regulators can see a human checkpoint.

Users can be told that a person reviewed the case.

The machine still provides most of the efficiency gain because the person rarely interrupts it.

Everyone gets the symbol they wanted.

Until the rare case arrives for which the symbol was supposed to matter.

Then the reviewer may discover that they no longer know how to reconstruct the decision.

The sources are buried.

The model changed three months ago.

The rationale is generated after the fact.

The policy that produced the recommendation spans several systems.

The worker has never seen this failure mode because the system filtered similar cases automatically.

The human has responsibility without epistemic access.

That is not accountability.

It is liability placement.

The distinction is particularly visible in science because authorship has an explicit accountability tradition. Journals generally do not accept an AI system as an author. Nature Methods stated the logic directly in 2026: a generative system cannot take accountability for a manuscript's content. Human authors may use tools, subject to journal rules, but the authors remain responsible for checking the work.

The principle is sensible.

It also reveals how much responsibility now has to be actively reconstructed.

A researcher can be responsible for a machine-assisted paper only if the researcher has enough visibility into the work to detect important errors, trace claims, defend methods, and respond when the result is challenged.

The byline does not create that capacity.

The workflow does.

The same is true outside publishing.

Organizations often treat accountability as a property attached at the end of a process.

Find the person who approves.

Put their name on the decision.

The harder design is upstream.

Did that person have the authority to say no?

Did they have enough time?

Did they have access to the evidence rather than only the recommendation?

Were they trained on the failure modes?

Could they inspect the machine's uncertainty?

Could they ask for another method?

Could they escalate without being punished for slowing the system?

Could they later reconstruct what the system saw at the time?

If the answer to most of those questions is no, adding a signature is not governance.

It is theater.

This does not mean every automated decision needs deep human review.

That would erase much of the value of automation and create new errors through fatigue and delay.

A bank processes enormous numbers of routine transactions. A hospital produces huge quantities of administrative documentation. A software system may make thousands of reversible operational adjustments. Human attention should not be inserted into each act merely because a machine performed it.

Accountability needs to match consequence.

The useful question is not “Was a human involved?”

Ask what kind of human involvement the failure requires.

For a low-stakes reversible action, logging and automated rollback may be enough.

For a high-volume decision with occasional serious consequences, the institution may need sampling, escalation rules, independent audits, and a staffed appeal path rather than individual preapproval.

For an irreversible or life-changing decision, the human decision-maker may need direct access to evidence and meaningful discretion before action occurs.

For a system whose errors can propagate widely, responsibility may belong partly to the team that designed and monitors the process rather than only to the operator who touched the final case.

Responsibility is architectural.

This is uncomfortable for institutions that prefer a single accountable person.

Complex systems rarely fail so neatly.

A bad AI-mediated outcome may involve the model provider, the organization that selected the model, the team that configured it, the data pipeline, the manager who set the throughput target, the operator who approved the case, and the policy that defined the objective.

Choosing one person to blame can hide the system that made their error likely.

Safety engineering learned this lesson long before generative AI.

A cockpit accident cannot be understood solely by asking which pilot touched the control last. A medical error cannot always be explained by the final clinician. A financial failure may reflect incentives and controls distributed across an institution.

Accountability that stops at the nearest human can become another form of abdication.

The organization offloads cognition to machines and offloads blame to the person still visible.

The better design separates several functions.

Someone owns the policy.

Someone owns the model's deployment and monitoring.

Someone owns the data quality.

Someone has authority over exceptional cases.

Someone can stop the process.

Someone must answer appeals.

Those roles can overlap, but they should be legible.

When failure occurs, the institution should be able to move backward through the chain rather than discover that every participant assumed another layer understood the whole thing.

This is where provenance becomes more than a research nicety.

A responsible human cannot evaluate a machine recommendation if the system cannot show what mattered.

That does not require revealing every parameter inside a model. In many cases that would not help. It requires operational provenance: which inputs were used, which model or version produced the result, what external sources were retrieved, what policy constraints applied, what uncertainty or warnings were present, and what human changes occurred afterward.

Without that record, accountability becomes memory theater.

People reconstruct reasons after the fact.

The machine generates a plausible explanation.

The institution writes an incident report around evidence it cannot fully recover.

A system that acts at machine speed should be better at preserving its own history than a paper bureaucracy ever was.

There is no technical excuse for making responsibility less reconstructable merely because cognition became automated.

AI can actually strengthen accountability here.

It can create richer traces, compare the final decision with policy, flag when evidence conflicts, preserve alternative recommendations, and help investigators search enormous histories after a failure. It can make oversight more targeted by identifying cases where models disagree or where inputs fall outside normal patterns.

The machine that creates the accountability problem can also make accountability cheaper.

Again the architecture decides.

There is another danger hiding in the opposite direction: excessive blame can make humans reject useful automation.

If an operator is held personally responsible for every machine mistake, the rational response may be to overrule the system constantly or refuse deployment. If a physician is told to use decision support but remains solely liable for every failure while receiving no control over the system, the institution has assigned responsibility without power.

That arrangement is unstable.

Responsibility should follow the ability to influence the risk.

A model provider controls training and some safeguards.

A deploying institution controls where the model is used, what data it sees, and what processes surround it.

A manager controls workload and incentives.

An operator controls some local decisions.

A regulator controls some rules.

No one actor controls everything.

The governance system should reflect that reality instead of using the human signature as a legal sponge.

This matters psychologically too.

People take responsibility differently when they believe they are exercising judgment.

A person who sees themselves as the author of a decision is more likely to inspect its consequences than a person who sees themselves as the final relay in a machine process. Repeated rubber-stamping can change role identity. The worker stops asking, “What do I think?” and starts asking, “Is there any reason I am allowed to reject this?”

Those are not equivalent questions.

One begins from judgment.

The other begins from compliance.

If organizations want humans to remain meaningful safeguards, they need to preserve the social expectation that disagreement is part of the job.

That can be designed into metrics.

Track useful overrides, not only throughput.

Review cases where the human and machine disagreed even when the machine turned out to be right.

Reward escalation that reveals a new failure mode.

Give reviewers examples of previous machine mistakes so vigilance has a concrete object.

Rotate people through cases where independent reasoning matters.

Test whether they can reconstruct a decision without the recommendation visible first.

These practices cost something.

So does accountability.

The cost becomes easier to accept once we stop pretending the human checkpoint is free.

A genuine human review consumes scarce attention. If the organization refuses to pay for that attention, it should not claim to have bought human judgment.

There will be systems good enough that the rational design removes the human preapproval entirely.

That is not abdication if responsibility remains clear.

A fully automated process with excellent monitoring, transparent rules, effective appeals, reversible action, and accountable system owners may be safer than a nominally human-reviewed process in which exhausted workers click “approve” all day.

The book's argument has never required a person to touch every decision.

It requires the institution to know where judgment lives.

Sometimes judgment lives in a trained operator.

Sometimes in the policy encoded before deployment.

Sometimes in the monitoring team watching aggregate behavior.

Sometimes in the citizen who can challenge the result.

Sometimes in a machine ensemble that catches errors better than people do.

What matters is that responsibility can travel to a place capable of changing what happens next.

That is the test of the signature.

Not whether a human name appears.

Ask whether the person or institution behind the name can still say why, still discover when the reason fails, and still alter the system after learning something new.

If not, the signature marks the location where accountability stopped.

If yes, the signature can remain meaningful even when machines performed most of the cognition above it.

The deeper problem appears when the system an institution depends on is not really under that institution's control at all.

Then the question is no longer who signs the decision.

It is who owns the mind the institution has learned to rely on.