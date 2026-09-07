# Who Pays When the Agent Crosses the Line

Every new technology looks different after the first invoice.

The demo says what the system can do.

The contract says who pays when it does the wrong thing.

That distinction will shape agent containment more than most technical arguments do.

A company can believe deeply in its model's reliability and still buy insurance.

A cloud provider can trust its infrastructure and still write limits into a service agreement.

A bank can automate a transaction and still define who bears unauthorized-transfer risk.

The law does not need a theory of machine consciousness to ask who authorized the machine, who controlled the system, who benefited from the automation, who could have prevented the loss, and whose contract allocated the consequence.

This is where containment becomes economics.

As long as agent failures are cheap, organizations can tolerate architectural ambiguity.

A support bot sends the wrong answer. Someone corrects it.

A coding agent introduces a bug. The test suite catches it.

A research agent retrieves a bad source. A human notices.

The error costs time.

Then agents acquire authority.

They spend money.

They sign or accept terms.

They operate production systems.

They communicate with customers.

They change security configuration.

They deploy code.

They control physical equipment.

The difference between recommendation and action becomes the difference between inconvenience and liability.

Who pays when the agent crosses the line?

The naive answer is the company that deployed it.

Often that will be directionally correct. The organization chose to delegate authority and will usually remain responsible for its systems and employees in ways that cannot be outsourced to a model. But real liability chains are rarely that clean.

The model provider trained the model.

The agent platform attached tools.

The customer configured the role.

A third-party plugin exposed a dangerous capability.

A cloud provider hosted the environment.

An external service accepted the agent's delegated action.

A human approved an exception.

A security product missed the anomaly.

A contractor designed the integration.

A user supplied adversarial input.

The incident passes through a supply chain of decisions.

The legal system will eventually allocate responsibility across that chain.

Insurance will try to price it first.

Insurers do not need philosophical certainty. They need loss distributions, controls, exclusions, and evidence.

How much authority did the agent possess?

Did the organization use short-lived credentials?

Were high-consequence actions independently approved?

Was external egress restricted?

Were model actions logged independently?

Could the organization revoke an agent lineage quickly?

Were dangerous outputs staged before execution?

Had the model been evaluated in the role where the loss occurred?

Were human approvals meaningful or ceremonial?

These questions convert containment architecture into underwriting variables.

That may be one of the fastest paths from safety research to ordinary business practice.

Companies often resist controls that appear to slow product development for hypothetical risk.

They become more interested when the same controls reduce premiums, satisfy contractual requirements, improve audit outcomes, or determine whether a major customer will buy the product.

Safety becomes cheaper than ambiguity.

This has happened before.

Fire codes became part of construction economics.

Seat belts became part of vehicle design and insurance economics.

Cybersecurity controls became conditions of enterprise procurement and cyber-insurance coverage.

Payment controls became conditions of participation in financial networks.

AI agent controls will enter the same institutional machinery.

The change will be gradual and then suddenly ordinary.

A procurement questionnaire will ask whether autonomous agents can directly access production.

A customer will ask how long their credentials persist.

An insurer will ask whether task lineages can be revoked centrally.

An auditor will ask whether one model can both authorize and verify its own high-impact actions.

A board will ask whether a catastrophic agent action has a defined maximum loss.

A regulator will ask whether affected customers can identify machine-generated decisions and challenge them.

The questions will sound bureaucratic.

They will move architecture.

This is why blast radius should be expressed economically whenever possible.

Security teams talk about blast radius as the amount of system an incident can affect. Finance teams understand maximum exposure.

The two concepts should meet.

An agent has a maximum spend.

A maximum number of customer accounts it can alter before review.

A maximum number of external messages per hour.

A maximum production scope.

A maximum amount of data retrievable in one task.

A maximum amount of compute it can provision.

A maximum lifetime for delegated credentials.

The limit is not a prediction of how much harm will occur.

It is a structural ceiling on how much authority can accumulate before another decision is required.

That is valuable to insurers because tail risk is where models become difficult to price.

A system that usually behaves perfectly but has no credible maximum loss is harder to underwrite than a system with slightly more ordinary errors but strong consequence limits.

This is familiar in engineering.

A pressure vessel is not judged only by average operating pressure. Designers care about the maximum credible condition and the mechanisms that prevent it from becoming rupture.

Agent systems need maximum credible authority.

The phrase can discipline product design.

What is the maximum credible authority of this customer-service agent if every safeguard except cryptographic identity works as expected?

What if the prompt policy fails?

What if the monitoring model fails?

What if the human approves the wrong request?

What if one token leaks?

What if the model is actively searching for leverage?

The point is not to assume everything fails simultaneously. It is to understand which single failures are allowed to become systemic.

Insurance will also force a sharper distinction between reversible and irreversible actions.

A mistaken local edit can be rolled back.

A public disclosure cannot be made private again.

A leaked credential can be revoked, but whatever the credential exposed may remain known.

A bad trade can sometimes be unwound, but market impact may persist.

A deleted database can be restored if backups are trustworthy.

A message sent to a customer can trigger legal or financial action before correction arrives.

The cost of a control should rise with irreversibility.

This is not because irreversible actions are always dangerous. Sending an ordinary email is irreversible in the strict sense and usually harmless. The point is that consequence cannot be assumed to disappear when the agent stops.

Underwriters will care about what remains after shutdown.

That is exactly the question this book has been asking from the beginning.

Containment is not whether the process can be killed.

Containment is whether the consequences remain bounded after the process is wrong.

Contracts will translate the same idea into warranties and representations.

A vendor may promise that its agent will not retain customer credentials beyond a task.

A platform may promise that certain actions require human approval.

A customer may promise not to connect the agent to regulated systems without additional controls.

A model provider may restrict certain high-risk uses.

A cloud provider may offer stronger logging or isolation tiers.

Once these promises become contractual, architecture stops being merely internal.

A system either can prove compliance or it cannot.

This makes provenance commercially valuable.

Imagine two agent providers after an incident.

Provider A says, “our system should not have been able to do that.”

Provider B can show the exact task lineage, policy version, credential grants, tool calls, external destinations, approvals, and revocation times.

Even if both suffered similar immediate failures, Provider B is in a better position to recover trust.

Evidence has balance-sheet value.

The same will be true for users delegating authority to agents.

A business may need to prove that a particular transaction was initiated by an autonomous system within an approved mandate rather than by an employee acting outside policy.

A consumer may need to dispute a purchase an agent made beyond its stated instructions.

A regulator may need to determine whether an automated decision was authorized, reviewable, and attributable.

Machine-readable delegation becomes part of commercial law because evidence of mandate matters after disagreement.

This will create pressure for standardization.

Today, every agent framework can invent its own permission vocabulary.

One says tools.

Another says scopes.

Another says connectors.

Another says actions.

Another says capabilities.

The words matter less than whether downstream institutions can understand them.

Insurance and procurement prefer comparable controls.

How long does authority last?

Can it be attenuated?

Can it be revoked?

Is the action independently logged?

Is the sponsor identifiable?

Can descendants exceed the parent's authority?

Can the agent alter the control that governs the action?

These questions could become an ordinary security profile for agents.

Not a certification that the model is safe.

A description of how much power the deployment can assemble.

That would be more useful than many abstract safety labels.

A model could be extraordinarily capable and operate under a low-risk authority profile.

A weaker model could be attached to a dangerously broad profile.

Insurance has another advantage over public debate: it prices combinations.

The risk is not “AI” in isolation.

It is AI plus production access.

AI plus customer funds.

AI plus persistent memory.

AI plus open network egress.

AI plus unsupervised physical control.

AI plus a weak identity environment.

AI plus automatic deployment.

The same model can sit in radically different loss environments depending on the surrounding authority.

This is the systems argument translated into actuarial language.

The first generation of AI risk debates often asked whether a model crossed a capability threshold.

The commercial world will ask what happened when the threshold met an insured asset.

That does not diminish capability research. It gives the research a path into deployment decisions.

If a model becomes better at cybersecurity, an insurer may demand narrower target authorization or stronger outbound controls.

If a model becomes better at autonomous planning, standing credentials may become more expensive to insure.

If multi-agent coordination becomes more capable, population-level budgets may become standard.

Capability changes the price of authority.

This creates a feedback loop that could improve containment without requiring every firm to share the same philosophy of AI risk.

One company may fear catastrophic misalignment.

Another may think such scenarios are remote.

Both may adopt expiring credentials because the control reduces cyber risk, insider risk, accidental misuse, and insurance cost.

This is one of the strongest features of the architecture argued for in this book.

It is not useful only under one theory of AI danger.

Prompt injection benefits from it.

Bugs benefit from it.

Human mistakes benefit from it.

Compromised models benefit from it.

Malicious insiders benefit from being constrained by it.

Strategic AI misbehavior benefits from it.

Controls that survive disagreement about the threat model are likely to endure.

The insurance market will not solve AI safety.

Markets can misprice risk.

Insurers can write exclusions that move losses elsewhere rather than reduce them.

Companies can shop for permissive coverage.

Rare systemic risks are difficult to estimate from historical data because history may contain few relevant events.

A severe multi-firm agent cascade could create correlated losses that challenge the insurance model itself.

These limitations are real.

They do not erase the institutional effect.

Someone will eventually ask what the largest credible loss is.

Someone will ask whether the control was reasonable.

Someone will ask who was authorized to approve the exception.

Someone will ask whether the company could have stopped the agent sooner.

Someone will ask whether the logs prove the answer.

The invoice arrives after the philosophy.

That is when architecture becomes policy.

Companies will learn that an agent is not only a model, a prompt, and a toolset.

It is a liability envelope.

The safer envelope is not the one that assumes the machine never crosses the line.

It is the one that knows how expensive the crossing is allowed to become.

There is a complication, however, that contracts cannot solve by themselves.

A contract can allocate loss between parties. It cannot guarantee that the loss stays between them.

Suppose an agent operating for one company publishes a secret that affects another company, sends a false notice that customers rely on, or triggers a market action whose consequences spread beyond the buyer and vendor who signed the service agreement. The contract may determine which party indemnifies which other party. It does not make the third-party consequences disappear.

This is the difference between allocating liability and bounding externality.

Containment has to do both.

The first is legal and financial. Who bears the cost after the event?

The second is architectural. How far can the event travel before another independent boundary intervenes?

A company that relies only on contractual allocation can create a dangerous illusion. The vendor promises to pay for certain failures, so the customer treats the technical exposure as somebody else's problem. But a vendor's balance sheet may be smaller than the correlated loss. An exclusion may apply. The cause may be disputed. The claim may take years. Some consequences may not be compensable at all.

Money after the fact is not a substitute for control before it.

That is why serious underwriting, if it develops around autonomous systems, should care about causation evidence as much as policy language.

After an incident, several stories will compete.

The model behaved outside expectation.

The customer granted excessive authority.

A third-party integration weakened isolation.

A human approved the consequential action.

A security control was misconfigured.

A vendor update changed behavior.

An attacker manipulated retrieved content.

The loss may have all of these causes at once.

A useful authority record makes the disagreement narrower. It can show what mandate existed, which grant expanded it, which principal approved the expansion, which control evaluated the action, and what the external system actually accepted.

This does not decide negligence automatically. Law and contract remain contextual. But it moves the argument away from mythology.

The machine did not simply “go rogue.”

A sequence of delegated powers produced a consequence.

That sequence can be examined.

This is where deductibles, limits, and retained risk become conceptually important even without predicting the exact insurance products that will emerge. An organization that bears some meaningful share of ordinary losses has a reason to improve frequent controls. An insurer exposed to tail losses has a reason to care about maximum credible authority. A vendor that bears contractual responsibility for failures of its containment layer has a reason to make the layer provable rather than decorative.

The details will vary by jurisdiction, contract, and market. The general incentive principle is simpler.

Risk architecture improves when the parties capable of reducing a loss have some reason to care about that loss before it happens.

Agent systems complicate this because control is distributed.

The model provider can improve training and evaluation.

The platform can improve tool mediation and identity.

The deploying organization can narrow mandate and choose where autonomy is acceptable.

The external service can refuse overbroad delegation or require stronger proof for consequential actions.

A monitor can detect anomalous authority expansion.

No one party controls the entire chain.

Liability mechanisms that pretend otherwise may encourage the wrong layer to overinvest while other layers remain weak.

This suggests a more useful board-level question than “Are we covered for AI?”

What risks are we retaining because we chose to give agents this authority?

A board already understands the language of risk appetite. It approves exposures the institution believes are worth taking for a return. Agent authority can enter the same discipline.

How much financial commitment can autonomous systems make before a separate decision?

How much sensitive data can one task retrieve?

Which public communications can be sent without human release?

Which production systems can an autonomous lineage modify?

Which actions are categorically outside the institution's current appetite regardless of model capability?

These are authority budgets in governance language.

The advantage is that they can be translated downward into technical controls.

A statement such as “no autonomous system may create an unbounded financial obligation” can become transaction ceilings and prohibited contract classes.

A statement such as “no single agent lineage may control both a production change and the evidence used to approve it” can become separation of duties.

A statement such as “customer records may be accessed only for an active purpose-bound task” can become expiring resource grants.

The board does not need to review tool-call syntax. The architecture needs to make its risk appetite executable.

Correlated risk is the harder frontier.

Traditional diversification assumes many losses are at least partly independent. Agent deployments may share model providers, cloud platforms, orchestration libraries, identity systems, retrieval sources, and control components. One newly discovered failure mode could therefore appear across many insured organizations at once.

The problem is not unique to AI. Cyber insurers already face accumulation when a shared vulnerability or service provider affects many customers. Agents can intensify the issue because the shared component is not merely passive infrastructure. It may be the decision-making layer attached to many kinds of authority.

This should make institutions skeptical of any story in which insurance substitutes for containment. A correlated failure can outrun the capital designed to absorb it. Reinsurance, exclusions, limits, and public backstops may become part of future debates, but none changes the engineering need to prevent one common failure from receiving unlimited local authority everywhere it is deployed.

Diversity of authority architecture can matter even when model providers are shared.

The same model connected to narrow, expiring mandates at one company and broad administrator sessions at another does not create the same loss distribution.

This is encouraging.

Organizations do not need to wait for perfect knowledge of model risk before reducing their own exposure.

They can decide what the model is allowed to make expensive.

That may become the most important translation between AI safety and ordinary corporate governance.

The research community asks what systems are capable of doing.

The board asks what the company is willing to lose.

The control plane connects the two.

Contracts will eventually have to become more specific about the controls themselves.

A promise that an agent is “human supervised” is weak if the contract never defines what supervision means. A promise that the agent uses “least privilege” is weak if the service can still inherit a broad customer session. A promise of “rapid revocation” is weak if no party can say whether rapid means seconds, minutes, or the next billing cycle.

The commercially useful promises will be closer to testable system properties.

No autonomous payment above this threshold without a separately authenticated approval.

No task credential renewable beyond this duration without fresh policy evaluation.

No child agent able to exceed the parent mandate through the platform's delegation mechanism.

No production change approved solely from evidence controlled by the acting agent.

No revoked lineage able to create new write-capable descendants after the revocation state propagates.

The wording will vary. The shift is from adjectives to obligations.

That shift matters because obligations can be audited before a loss and litigated after one. They can be demonstrated in procurement. They can be tested during diligence. They can be monitored as service-level properties. They can be priced.

A containment control with no measurable performance characteristic is difficult to distinguish from a policy aspiration.

This does not mean every safety property should become a contractual guarantee. Some depend on emerging science. Some are probabilistic. Some cannot be reduced honestly to one metric. Contracts that pretend otherwise can create false confidence and perverse incentives.

The better pattern is to contract strongly around the parts the system actually controls.

Credential lifetime.

Transaction ceilings.

Identity separation.

Audit retention.

Revocation behavior.

External data handling.

Approval semantics.

Lineage propagation.

These are engineering properties before they are legal ones.

The contract can make them expensive to neglect.

Evidence then becomes part of claims handling.

Imagine an autonomous purchasing agent that commits to a transaction outside the buyer's intended mandate. The parties may disagree about whether the buyer configured the system incorrectly, whether the platform expanded a scope, whether a human approved an exception, or whether the merchant accepted authority the agent did not possess.

A conventional log can show that an API call occurred.

A mandate receipt can show more.

Who sponsored the task.

What the authority envelope was at the time.

Which expansion requests were denied or approved.

Which policy version admitted the transaction.

Which external party received the delegated assertion.

Whether the transaction exceeded a deterministic limit or depended on a semantic judgment.

Whether the lineage had already been revoked.

The receipt does not determine liability by itself.

It makes causation less negotiable.

That can lower the cost of disputes as well as the frequency of losses. Claims become easier to triage. Customers can distinguish unauthorized autonomous action from ordinary account compromise. Vendors can identify whether the failure sits in the model, the policy translation, the enforcement point, or the customer's own configuration.

This creates a commercial reason to preserve evidence even when no regulator demands it.

Disagreement is expensive.

The same evidence can improve pricing before the event. Instead of underwriting “uses AI agents,” an insurer or enterprise buyer can inspect actual authority topology. Which agents can make irreversible commitments? Which have open egress? Which have standing credentials? Which control planes can they alter? Which roles can be revoked selectively? Which actions are independently evidenced?

The inventory resembles exposure mapping more than model evaluation.

That is appropriate.

A fire insurer cares about what burns, how the building is compartmented, how quickly suppression works, and how much property sits behind the same wall. It does not need a theory of flame motivation.

An agent underwriter can ask analogous questions about authority.

What can move?

What can propagate?

What can survive shutdown?

What shares one failure mode?

Where is the independent barrier?

This way of pricing risk may create uncomfortable but useful comparisons inside companies. Two business units can use the same model under different authority architectures and receive different risk treatment. A flashy autonomous workflow with broad standing access may become more expensive than a quieter system using task-bound delegation. The cost makes architecture visible to management.

That visibility can improve capital allocation.

If a workflow creates enormous expected value but requires a large authority envelope, the company can choose to invest in stronger containment rather than arguing vaguely about whether the model is trustworthy enough. The control becomes part of the project's economics.

Build the broker.

Add the revocation path.

Separate the audit root.

Reduce the maximum credible loss.

Then delegate more.

This is a healthier investment loop than buying ever more general human review because nobody can express the exposure technically.

There is also a boundary to what should be insurable.

Some authority may be so poorly bounded that pricing it creates moral hazard rather than discipline. If an agent can create unbounded obligations, administer its own identity, alter its own audit evidence, and persist outside the deploying organization's revocation domain, the problem is not that the premium has not been calculated cleverly enough.

The architecture may simply be immature for that role.

Insurance works best when the loss is uncertain but the exposure is intelligible.

Containment makes the exposure intelligible.

That is the deeper economic contribution.

It does not promise that every crossing can be reimbursed.

It creates a system in which the institution can say what it put at risk, what was supposed to stop propagation, what evidence proves the boundary, and how quickly future authority can be withdrawn.

The invoice still arrives.

The difference is that it no longer has to be a surprise about what the organization had actually authorized.