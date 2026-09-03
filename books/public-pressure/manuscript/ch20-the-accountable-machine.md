# The Accountable Machine

The phrase responsible AI has become so common that it risks meaning only that the speaker would prefer irresponsible AI to be associated with somebody else.

Companies publish principles. Governments publish frameworks. Consultants publish maturity models. Researchers publish evaluations. Boards receive presentations. Product teams add checklists. None of these practices is useless merely because the vocabulary is fashionable. The problem is that responsibility is not a document category.

Responsibility is an answer to a question.

Who can be made to answer?

The machine cannot.

A model can explain in the conversational sense. It can produce reasons, summarize a policy, reconstruct a chain of thought from available evidence, or tell a user what probably happened. That is not institutional responsibility. The model cannot be cross-examined in a meaningful legal sense. It cannot lose its license. It cannot pay damages from its own assets. It cannot resign from a board. It cannot be fired for violating a professional duty. It cannot decide to compensate a customer unless somebody has given it that authority.

The machine acts only inside a field of human permissions.

This remains true even as systems become more agentic. An AI agent may schedule, purchase, code, negotiate, search, monitor, or call other systems. It can initiate actions that surprise the person who deployed it. The chain of causation becomes more complicated. Responsibility does not evaporate.

It migrates toward design, deployment, supervision, authorization, and remedy.

That migration is the central design problem of the next decade.

The first generation of public AI systems was easy to govern in one respect because the user was visibly in the loop. A person typed a prompt. The model replied. Most failures looked like content failures. The model said something false, offensive, copyrighted, dangerous, or strange.

Agents change the object.

A bad answer is information.

A bad action changes state.

The agent sends the email.

The agent deletes the file.

The agent purchases the ticket.

The agent changes the software configuration.

The agent submits the application.

The agent moves the money.

The agent contacts the patient.

The agent opens the pull request.

This is where the accountability framework developed throughout the book becomes less optional.

A consequential automated action should have an accountable principal.

That principal may be a person or an institution depending on context. The important feature is that another party can identify who authorized the system to act and what constraints applied.

Agency law, corporate law, employment, contract, product liability, professional duties, and administrative law all contain older versions of this idea. Organizations act through people. People act through agents. Principals delegate authority while remaining responsible in defined ways for what authorized agents do.

Artificial agents complicate the facts without eliminating the structure.

The temptation will be to invent a new metaphysics before using the old law.

Does the AI have intent?

Can an AI be negligent?

Should an autonomous system have legal personhood?

These are interesting questions. Most practical disputes will begin earlier.

Who deployed the system?

What was it allowed to do?

What controls were reasonable?

What did the deployer know about its failure modes?

Was the action within the authority granted?

Who benefited?

Who could stop it?

Who can repair the damage?

The legal person already exists.

It is usually the company.

This is why corporate attempts to anthropomorphize AI can become strategically dangerous. Marketing wants users to experience the system as an assistant, colleague, adviser, doctor-like guide, creative partner, or agent. Liability language then wants the system to become mere software again when something goes wrong.

Institutions cannot have it both ways forever.

If a company designs a system to be reasonably relied upon as an authorized interface, that design choice will matter. The exact legal consequences will vary by jurisdiction and context, but the governance intuition is stable: reliance follows presentation.

The Air Canada chatbot case was a small early signal. The airline’s website gave a customer incorrect information through an automated interface. The tribunal treated the representation as the company’s responsibility rather than accepting a fiction that the chatbot was some separate entity.

That principle scales.

A bank’s AI agent that tells a customer how to protect an account speaks inside the bank’s service.

A government chatbot that explains a benefits deadline speaks inside public administration.

A hospital agent that schedules follow-up care participates in a medical workflow.

A law firm’s AI system that communicates with a client acts inside a professional relationship.

The organization can place limits around what the system is authorized to say or do. Those limits become part of governance.

This suggests the first requirement of an accountable machine: bounded authority.

An agent should not receive every permission available to the person who launches it merely because broad access is convenient.

Software security has learned this through least privilege. A service receives the minimum access needed for its task. If compromised, the damage is constrained.

AI agents need a social version of least privilege.

The travel assistant can search flights but requires approval before purchase above a threshold.

The coding agent can open a pull request but cannot deploy to production without independent checks.

The finance agent can prepare a payment but cannot approve it alone.

The hiring assistant can summarize candidates but cannot silently reject them if the organization has decided that rejection requires human review.

The health-care system can identify cases for review but cannot terminate coverage merely because a prediction crosses a threshold.

These are policy boundaries expressed through software.

Public pressure should ask for them.

The second requirement is legible delegation.

The person affected should be able to tell when a consequential action was automated or materially shaped by automation where that fact matters to recourse.

This does not require a neon AI label on every invisible computation. Software participates in almost every modern transaction. The relevant disclosure is tied to agency.

Was this message generated by an agent authorized to act for the institution?

Was this decision made automatically?

Did an AI recommendation materially influence the adverse outcome?

Can a human reconsider it?

The European Union’s 2026 transparency obligations begin to create this kind of expectation for certain interactions and synthetic content. Other sectors will develop narrower rules.

The exact wording will matter less than the principle that automated authority should not be able to impersonate human discretion when the distinction affects rights.

The third requirement is traceability.

An institution should be able to reconstruct consequential actions after the fact.

Which model version acted?

What instruction did it receive?

Which tools did it call?

What data did it access?

Which policy gates were triggered?

Who approved the deployment?

Was a human asked for confirmation?

What happened next?

This is not a demand to preserve every token forever. Privacy, security, cost, and data-minimization duties matter. The point is that high-stakes automation needs records proportionate to the action.

An autonomous system without useful logs is organizational amnesia by design.

The fourth requirement is independent checking.

The same system that acted should not be the only authority explaining why its action was correct.

This can be implemented in many ways. A separate model can verify. A rules engine can enforce hard constraints. A human can review. A second employee can approve. A regulator can audit. A transaction can require a cryptographic credential. A high-risk decision can be sampled by an independent team.

The mechanism depends on consequence.

The principle is separation of powers for software.

We already know why this works in human institutions. A person authorized to spend money may not reconcile the account. A prosecutor does not serve as judge. A public company’s management does not audit its own financial statements without outside assurance. A safety engineer can have stop-work authority separate from a product deadline.

AI will tempt organizations to collapse these functions because one model can technically perform all of them.

The model can generate the answer and grade the answer.

It can write the code and review the code.

It can recommend the transaction and explain why the transaction is safe.

This is efficient.

It can also create common-mode failure.

If the model shares the same blind spot across roles, the apparent checks are copies of the same mistake.

Independence is not merely having two boxes on a diagram.

It is reducing correlated error.

This matters beyond safety. It matters for legitimacy.

A person appealing an automated decision is not reassured to learn that another instance of the same system confirmed itself.

The fifth requirement is reversibility.

Some actions cannot be undone. A public leak cannot be made private again. A medical delay can cause irreversible harm. A blockchain transfer may be difficult to recover. An election occurs on a date that does not wait for later correction.

The less reversible the action, the stronger the controls should be before execution.

This is a simple principle organizations can use even when they cannot perfectly measure “AI risk.”

Ask how expensive the mistake is to reverse.

A generated draft can be edited later. Low friction.

A published defamatory statement is harder.

A wire transfer is harder.

An irreversible deletion is harder.

A denied surgery after the treatment window is much harder.

A military action is harder still.

Reversibility creates a practical hierarchy of oversight.

The sixth requirement is appeal.

The prior chapter developed this at length because an accountable machine needs an institution capable of saying the machine was wrong.

Without appeal, every safeguard depends on prevention.

Prevention eventually fails.

The seventh requirement is compensation.

This is the part responsible-AI frameworks often avoid because it is less pleasant than principles.

What happens after harm?

A refund.

A restored account.

Lost wages.

Medical costs.

Statutory damages.

A corrected record.

Contractual payment.

Insurance.

A public correction.

An apology can matter. It is not compensation.

Institutions reveal how seriously they take error by what they are prepared to restore.

Compensation also creates incentives upstream. If the organization bears more of the cost of false decisions, it has stronger reasons to invest in accuracy and recourse.

This is why liability rules are not simply punishment. They are architecture.

The eighth requirement is an accountable human or body with authority over the system.

This should not be misunderstood as “put one human in the loop.” The responsible authority may be a committee, board, licensed professional, regulator, manager, or designated officer.

The important feature is that responsibility cannot be dissolved across everyone who touched the system.

Distributed work needs named ownership.

A hospital should know which clinical governance body approves an AI deployment.

A bank should know which executive owns model risk.

A company should know who can stop an agent from taking a class of action.

A government agency should know which official is responsible for automated decisions.

A model provider should know who owns safety thresholds.

The public may never contact these people directly.

Their existence changes internal behavior.

Responsibility without a name becomes a meeting.

The ninth requirement is external contestability.

Internal governance is necessary and insufficient because institutions grade themselves generously.

There must be some route outside the organization for serious disputes.

A regulator.

A court.

An arbitrator.

A professional licensing body.

A union grievance process.

An ombuds office.

A consumer-protection agency.

The exact venue depends on the right at issue.

The institution should not control every doorway out of itself.

The tenth requirement is evidence that the controls work.

This is where accountability returns to measurement.

How often are agents stopped by safeguards?

How many appeals are reversed?

Which errors recur?

How often do humans override models?

Do humans have enough time to review?

What happened after the last incident?

Do people with less power receive the same quality of recourse?

Does automation reduce workload or merely increase targets?

Are synthetic-content labels noticed?

Do fraud controls actually prevent losses?

A control that exists only in policy is a hope.

Evidence turns hope into governance.

None of these requirements is uniquely about artificial intelligence.

That is their advantage.

Bounded authority, logs, independent review, reversibility, appeals, compensation, named ownership, outside oversight, and outcome testing are old institutional technologies.

AI makes them newly important because the productive capacity of software is expanding into domains where software can exercise practical authority.

The accountability response should be technologically conservative.

Use old ideas where they still work.

This avoids a common mistake in technology policy: treating novelty as a reason to discard institutional memory.

People have been delegating power for a long time.

Corporations are delegation systems.

Governments are delegation systems.

Hospitals are delegation systems.

Banks are delegation systems.

The legal profession is a delegation system.

Software has been inserted into all of them for decades.

Generative and agentic AI changes degree, speed, flexibility, and opacity.

It does not abolish the need for principals, records, review, and remedy.

This perspective also makes the CEO problem easier to place.

The chief executive should not personally approve every model action. That would destroy scale. The executive is responsible for creating a system in which appropriate authority exists below.

This is what leadership means in a large institution.

The CEO does not drive every truck, review every claim, write every line of code, or answer every customer.

The CEO creates structures that make performance and accountability possible without personal intervention.

Public pressure should therefore become more sophisticated about what it asks from leaders.

Do not ask the CEO to promise that the model will never fail.

Ask who owns the failures.

Do not ask whether humans are involved.

Ask whether they can override.

Do not ask whether the company has an AI ethics principle.

Ask which deployment the principle stopped.

Do not ask whether an audit occurred.

Ask what changed after the audit.

Do not ask whether the system is transparent.

Ask whether an affected person can understand enough to challenge a consequential decision.

These questions are less theatrical.

They are harder to evade.

They also create room for companies to answer well.

This matters because a politics built entirely on distrust has nowhere to go after improvement.

An institution should be able to earn legitimacy by showing that its systems are bounded, inspectable, contestable, and repairable.

Trust should be conditional rather than absent.

The AI backlash contains a strong intuition that powerful systems should remain subordinate to human values. The phrase is too broad to govern anything by itself.

The institutional translation is more practical.

Power should remain subordinate to someone who can be held responsible for using it.

That person does not need to press every button.

The institution does need to know who answers when the button presses itself.

The next step is to give the button an identity.

Agentic systems should not appear inside an organization as generic automation. A consequential agent needs an institutional identity tied to a principal, a purpose, a permission set, and a lifetime.

Which department owns it?

Which employee or role launched it?

Which credentials can it use?

Which model and tools does it rely on?

When do those credentials expire?

Who receives an alert when it crosses a threshold?

An agent without this information is the software equivalent of an employee badge that says only “someone from the company.”

The identity does not have to be public. It has to be resolvable by the institution and, where necessary, by affected parties or regulators.

This becomes more important when agents delegate to agents.

A general assistant asks a coding agent to modify software. The coding agent calls a deployment tool. The deployment tool invokes a cloud service. A monitoring agent later decides whether the change is healthy. The action chain can cross several vendors and credentials without one human seeing every step.

Nested delegation creates an authority graph.

The graph should be inspectable.

Which principal ultimately authorized the chain?

Which node expanded authority?

Which tool executed the irreversible action?

Where could the chain have been stopped?

Traditional access logs answer part of this. Agent governance needs the semantic layer: not merely which token called an API, but what authority the token represented and for what purpose.

This suggests a blast-radius budget.

Every automated system should have some upper bound on the damage one uncontrolled execution can create.

Money per transaction.

Records per deletion.

Customers per outbound campaign.

Systems per configuration change.

Time before human confirmation.

Permissions per agent.

The exact unit depends on the domain.

The idea is old. Circuit breakers limit markets. Rate limits constrain software. Corporate cards have spending caps. A junior employee has signature authority only up to a threshold.

AI agents should not be special merely because they can reason across tasks.

Reasoning is not a reason for unlimited authority.

A blast-radius budget also improves experimentation. Organizations can deploy new capabilities inside small scopes, observe failures, and widen permissions as evidence accumulates. This is more useful than debating whether an agent is “safe” in the abstract.

Safety becomes graduated authority.

The system earns more power through performance.

That principle works in human organizations too. New employees receive limited access. Pilots advance through certification. Financial traders operate under limits. The organization does not need metaphysical certainty about competence before granting any responsibility.

It grants responsibility proportionally.

Credential expiration is another underappreciated control.

AI agents can continue acting after the human context that justified them has changed. A project ends. An employee leaves. A vendor relationship changes. A temporary emergency permission becomes permanent because nobody remembers to remove it.

Authority should decay unless renewed.

Short-lived credentials, time-bound scopes, task-specific permissions, and automatic revocation after inactivity create a governance default opposite to institutional accumulation.

Power expires.

This is especially valuable for agents because copying software is cheap. Organizations may create hundreds of specialized automations that outlive the teams that built them. An inventory of active agent identities becomes as important as an inventory of service accounts.

Someone has to know what is still acting for the company.

Emergency stopping deserves the same realism.

“Kill switch” sounds reassuring because it implies one red button can end the problem. Distributed systems rarely behave so cleanly. An agent may have queued messages, opened downstream tasks, created credentials, moved data, or triggered another system before the switch is pressed.

Stopping authority requires containment planning.

Can credentials be revoked centrally?

Can queued actions be cancelled?

Can the organization freeze a class of transactions?

Can it identify which systems received the agent’s output?

Can it restore the prior state?

Can it communicate to affected people quickly?

The emergency control is a recovery architecture, not a button.

This is where disaster recovery and AI governance converge.

The organization should rehearse the stop.

Cybersecurity teams run incident exercises because plans behave differently under pressure. Agentic organizations should simulate a runaway or compromised agent in the same way.

Who notices?

Who has authority to disable it?

What if the owner is unavailable?

How is business continuity preserved while the automation is offline?

How does the company know the incident is over?

Testing the stop is more informative than publishing that a stop exists.

Responsibility matrices become necessary as the chain grows.

The model provider owns some properties of the model.

The application vendor owns orchestration.

The deployer owns business context and permissions.

The operator owns supervision.

A licensed professional may own the final judgment.

The cloud provider owns infrastructure reliability within defined terms.

The user owns certain instructions.

No one actor owns everything.

The matrix should state who is responsible, accountable, consulted, and informed for specific failure classes before a crisis forces the mapping.

This is not bureaucratic decoration if it identifies a person with authority to act.

The worst responsibility matrix says everyone is responsible.

That means no one is.

The best one attaches each risk to the actor with knowledge and control, while preserving an escalation path when the risk crosses boundaries.

The CEO’s obligation lives at this level.

Not to understand every model token.

To require an authority architecture proportionate to what the company is delegating.

The board’s obligation is similar.

What classes of action are machines now allowed to take without contemporaneous human approval?

What is the maximum plausible loss from one failure?

Which systems can move money, alter customer rights, publish externally, change production software, or access sensitive data?

Who can stop them?

How often are those controls tested?

These are board questions because they concern delegated corporate power.

Agentic AI makes software governance look more like organizational governance because the software is entering the chain of authority rather than merely the chain of information.

The accountable machine is therefore not a machine with morals.

It is a machine inside an institution with boundaries.

Identity.

Authority.

Expiration.

Traceability.

Independent checks.

A recoverable state.

A principal.

A remedy.

The future argument will often ask whether the agent was autonomous.

The more useful question will be whether the institution was.