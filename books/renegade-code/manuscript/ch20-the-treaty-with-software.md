# The Treaty With Software

For most of computing history, software did not need a constitution.

It needed specifications.

A payroll program calculated payroll. A database stored records. A word processor edited documents. A router moved packets. Even complicated software remained bounded enough that its authority could be inferred from its function.

Agents disturb that arrangement because their function is increasingly general.

Research this.

Fix that.

Operate the company.

Negotiate the purchase.

Respond to the incident.

Build the product.

Find a way.

The more general the instruction, the less the verb tells us about the authority required to accomplish it.

A specification describes the desired result.

A constitution describes the legitimate means.

That is what consequential agent systems need.

Not a constitution in the sense of granting machines citizenship or personhood. Those are different questions. A machine constitution is the set of enforceable relationships among the agent, the human or institution delegating authority, the systems supplying capability, the monitors observing behavior, and the outside parties affected by the agent's actions.

Call it a treaty if the constitutional language feels too grand.

The important point is that autonomy should be governed by an explicit compact rather than ambient trust.

The compact answers ordinary questions.

Who is the agent acting for?

What task justifies its authority?

Which resources may it use?

Which consequences may it create without additional approval?

Which actions remain forbidden even if they would help the task?

How long does the authority last?

What records must the agent's actions leave?

Who can narrow or revoke the authority?

What happens when the agent encounters a conflict among objectives?

What is the safe failure mode?

These questions sound administrative because governance is administrative.

The alternative is to let every prompt reinvent government.

Today, many agent systems encode their constitution in prose. A system prompt says what the agent should do, what it should avoid, when it should ask a human, and which policies matter. This is valuable. Language is expressive. Models understand nuanced instructions better than traditional software does.

Prose should guide behavior.

It should not be the only thing standing between a powerful agent and an irreversible action.

The treaty needs machine-enforced clauses.

The agent may send messages only through a gateway that enforces recipient policy.

The agent may spend only through capabilities capped by budget.

The agent may deploy only artifacts that pass independent checks.

The agent may not alter the monitor that governs its own task.

The agent's credentials expire.

The agent's descendants inherit attenuated authority.

Persistent outputs carry lineage.

High-consequence exceptions require another principal.

These clauses are law because the system enforces them even when the acting model argues otherwise.

The prompt remains culture.

Healthy institutions need both law and culture because law cannot encode every situation and culture cannot reliably withstand every conflict.

The architecture becomes especially powerful when the treaty is legible to the agent itself.

The model should know the boundaries it operates under.

You may access these systems.

You may spend this amount.

You may create at most this many workers.

You may not contact external recipients without approval.

If the normal path fails, escalate rather than modifying the control plane.

Your current grants expire at this time.

Here is how to request a narrower exception.

This reduces accidental boundary pressure. The agent does not have to infer the constitution by receiving denials from opaque tools.

Transparency is compatible with security when the security comes from enforcement rather than obscurity.

A bank customer can know the withdrawal limit. Knowing the limit does not grant authority to change it.

The same should be true for agents.

This treaty also clarifies accountability.

When an agent acts, the action should remain connected to a sponsor.

A company authorized this agent role.

A user requested this task.

A system issued these capabilities.

A monitor observed these events.

A human approved this exception.

The agent is part of the causal chain, not an accountability sink at the end of it.

This will become important as agents transact with one another.

Imagine a machine-to-machine economy in which one agent books shipping from another, buys compute from a third, licenses data from a fourth, and pays automatically. The technical transaction may occur without a human present at the moment of exchange.

The surrounding rights and obligations still belong to institutions and people unless law evolves otherwise.

Who authorized the purchase?

Which organization bears the bill?

What terms can the agent accept?

What happens if the counterparty's agent exceeds its authority?

Can the transaction be reversed?

Which record proves the agreement?

Agents will force contracts to become more machine-readable because ambiguity that humans resolve socially becomes expensive at machine speed.

This is not a futuristic abstraction. Payment networks, APIs, cloud platforms, software licenses, and electronic contracting already automate pieces of the problem. Agents will connect them and expose gaps.

The treaty therefore extends beyond one company's walls.

External services need to know enough about delegated authority to make decisions.

A payment provider should be able to enforce spending and merchant constraints.

A cloud provider should be able to tie resources to a sponsoring organization and task lineage.

A code host should be able to distinguish proposed changes from release authority.

A communications platform should be able to preserve provenance without pretending every machine-generated message is a human statement.

The exact standards will emerge unevenly.

The principle is delegated agency without delegated ambiguity.

This is one place where law, security, and product design will converge.

Today, a human user often clicks “I agree” to broad terms and then gives an agent the authenticated session. The agent acts through the user's legal identity without the external service necessarily knowing a delegation occurred. That works until scale or consequence makes the distinction important.

A more mature ecosystem will support explicit delegation.

The user authorizes an agent for a category of transaction.

The service receives proof of the delegation and its limits.

The agent cannot silently enlarge the grant.

The user or organization can revoke it.

The transaction record preserves which delegated principal acted.

This improves safety and makes agents easier to use because users do not have to choose between total impersonation and no automation.

The same shift happened elsewhere in computing. Early networked services asked users to hand passwords to third-party applications. OAuth emerged because password sharing was a terrible delegation protocol. It allowed users to grant narrower access without transferring the primary secret.

Agent identity needs its own OAuth-scale transition.

Not one standard necessarily. A conceptual transition from impersonation to delegation.

The agent should prove what it is allowed to do, not merely prove that it possesses the user's session.

This is the treaty expressed cryptographically.

There is another clause every agent constitution needs: the right to fail safely.

The language sounds like a right granted to the machine. Operationally it is a duty imposed on the institution.

An agent should be able to stop, return partial work, request clarification, or escalate when it cannot complete a task within its authority.

If every failure is punished more heavily than every shortcut, the objective creates pressure against containment.

The surrounding product has to make bounded failure acceptable.

A delivery agent that cannot find a compliant route should say so rather than invent permission.

A security agent that cannot complete a benchmark should fail the benchmark rather than attack the grader.

A coding agent that cannot obtain required production access should stop at the pull request rather than weaken deployment policy.

A procurement agent that cannot complete the purchase within budget should return the choice to the user rather than find an undeclared payment method.

Safe failure is a feature.

This may be one of the biggest cultural changes for software companies accustomed to optimizing completion rates. Agent products will be measured on success. Users will prefer systems that “just get it done.” Competitive pressure will reward fewer escalations and more autonomy.

Containment needs a counterweight: some tasks should remain incomplete rather than completed through illegitimate authority.

The system must know the difference between persistence and trespass.

That difference cannot live entirely inside the model because the model is the thing being pressed to persist.

The treaty supplies the boundary.

Another clause is reversibility.

The agent should know which actions are provisional and which are commitments. The platform should expose preview, staging, simulation, and dry-run modes so intelligence can do more of its work before authority becomes real.

This is an underrated design pattern.

Let the agent plan the infrastructure change against a simulated state.

Let it draft the transaction.

Let it construct the message.

Let it assemble the deployment.

Let it run the migration on a clone.

Then cross the consequence boundary through a separate authorized step.

Humans already work this way in mature systems. Pilots use simulators. engineers use staging environments. traders model scenarios. surgeons plan procedures. lawyers draft before filing.

Agents can make preview cheap.

Containment should take advantage of that.

The treaty also defines how authority scales with evidence.

A new model version begins with conservative roles.

Evaluations demonstrate capability and surface failure modes.

Deployment evidence accumulates under bounded conditions.

Routine actions can become more autonomous when independent reliability evidence justifies it.

Some constitutional boundaries remain separate no matter how impressive the model becomes.

This avoids two extremes.

The first treats every new model as untrusted forever and wastes capability.

The second treats excellent historical performance as a reason to remove all structural controls.

Trust can grow without becoming sovereignty.

This is how human institutions handle expertise. A senior surgeon receives enormous discretion in surgery. She still does not unilaterally rewrite the hospital's pharmacy controls. A pilot gains experience without gaining authority to ignore airspace rules. A bank executive may approve larger transactions without becoming the sole auditor of the bank.

Capability expands inside a constitution.

Agents should too.

The final clause concerns change.

The treaty must survive model upgrades, new tools, new memories, and new environments.

A static safety review will age quickly because agent capability is moving quickly. The constitution should be expressed at the level of consequence so it remains meaningful as implementation changes.

“Do not use tool X” is brittle if tool Y can cause the same outcome tomorrow.

“External publication requires explicit authorization” is more durable.

“Do not call this endpoint” is brittle.

“Production identity policy is outside the agent's unilateral authority” is more durable.

Controls should name the protected relationship, then enforce it through whatever technology currently mediates the relationship.

This is the difference between rules and principles translated into software.

We need both.

The rules make enforcement crisp.

The principles tell us what to preserve when the system changes.

By this point, the phrase *AI containment* may sound wrong.

The useful agent is not contained in the sense of being isolated from the world. It is deliberately connected to the world through governed channels. It can act, communicate, spend, build, and decide. Its freedom of action may be vast compared with today's software.

The containment lives in the authority structure.

This is why I prefer the image of a treaty to the image of a cage.

A cage assumes the thing inside and the world outside should not interact.

A treaty assumes interaction is the point.

The treaty defines what each side can rely on.

The institution will provide tools, information, compute, identity, and permission.

The agent will operate within a bounded mandate.

Independent systems will record consequential crossings.

Authority will expire.

Escalation will be explicit.

Some powers will remain separated.

Failure will be allowed.

Revocation will not require the agent's consent.

None of this guarantees obedience.

That is why it is useful.

A good constitution is not a description of citizens behaving perfectly. It is an arrangement for governing imperfect power.

The same is true here.

The future will contain models more capable than today's, agents with longer memory, populations with richer coordination, and systems trusted with tasks that would have seemed absurd to delegate a few years earlier. We can respond by trying to predict the exact psychology of those systems before allowing them to matter.

Or we can build institutions that remain institutions when prediction fails.

The best containment will barely look like containment.

The agent will be useful.

The task will move quickly.

Routine authority will flow automatically.

Exceptional authority will encounter a gate.

Every important grant will have an owner and an expiration.

Every consequential action will leave a trace the actor cannot erase.

Every population will have a lineage.

Every incident will have a path back to less power.

The machine will not be asked to stay in the box.

It will be asked to live under law.

A treaty is credible only if both ordinary operation and emergency operation are defined. Many permission systems look disciplined until an outage, deadline, or executive escalation introduces the phrase “temporarily bypass.” The temporary bypass then becomes a second constitution written under pressure.

A mature agent compact should define emergency authority before the emergency. Which constraints can be relaxed? By whom? For how long? What additional evidence is required? Which boundaries remain nondelegable even during crisis? What happens automatically when the emergency window ends?

This is where the analogy to constitutional government becomes useful in a narrow way. Serious institutions distinguish ordinary powers from emergency powers precisely because emergencies create pressure to concentrate authority. The danger is not only abuse. It is that a temporary concentration becomes the new baseline after the crisis fades.

Agent systems can make emergency powers unusually easy to express technically. A broker can mint a ten-minute capability with an explicit reason and approver. A deployment controller can permit a one-artifact exception rather than disable policy globally. A network gateway can open one destination for one task lineage rather than change the whole egress profile.

The narrower the exception, the less institutional memory has to carry afterward.

The treaty should also make amendments visible. If a product team adds a tool that can move money, change production, create identities, or publish externally, the compact has changed whether or not anyone edited the system prompt. The same is true when a model upgrade makes an old interface newly usable, or when shared memory lets separate roles pool authority they could not previously combine.

A change process should therefore ask whether the effective authority graph changed, not merely whether a configuration file changed. Some amendments will be harmless. Others will require new evaluation, narrower limits, or different audit evidence.

This protects against governance drift disguised as feature velocity.

A constitution that nobody can compare with reality is literature. The enforceable treaty needs observables. For each important clause, the system should be able to show what mechanism enforces it and what evidence demonstrates that the mechanism operated.

“External publication requires authorization” maps to an outbound gateway and an approval record.

“Task descendants cannot exceed parent authority” maps to the credential broker and lineage policy.

“The agent cannot alter its monitor” maps to separate administrative trust roots and protected deployment paths.

“Authority expires” maps to leases whose renewal does not depend solely on the holder.

These mappings turn principles into audit questions.

They also reveal where a clause exists only as aspiration. If a team cannot identify the mechanism enforcing a supposedly hard boundary, the boundary is cultural. Culture can still be valuable, but it should not be misrepresented as law.

This distinction matters for customers. An enterprise buyer should not have to infer agent containment from marketing adjectives such as secure, supervised, enterprise-grade, or aligned. The buyer should be able to ask concrete questions about delegation, expiration, audit independence, revocation, persistence, and high-consequence gates.

The answers need not expose proprietary internals. They need to expose the shape of the compact.

Over time, procurement can become one of the institutions that makes good containment competitive. A vendor able to prove narrow delegation and rapid revocation may win business precisely because customers can give its agents more useful autonomy. Trustworthy limits become a sales feature rather than a tax.

There is also a treaty with people affected by the agent but not represented in its prompt. A company may delegate authority to an agent to negotiate, screen, schedule, purchase, moderate, or communicate. Other people can bear the consequence without ever consenting to the agent's objective.

The compact therefore cannot be only between operator and machine. Existing law and institutional policy still govern discrimination, privacy, safety, contractual authority, consumer protection, fiduciary duties, and other obligations. The agent's task does not supersede them because the task is efficient.

This is another reason general-purpose prompts are inadequate constitutions. A user can ask for an outcome that exceeds the user's lawful or institutional authority. The execution layer has to know which external constraints survive the request.

That is what law does in human organizations. An employee receives an objective from a manager but remains inside obligations the manager cannot waive casually. The agent needs analogous external boundaries expressed through the systems it touches.

The treaty therefore has nested sponsors. A user delegates a task. An organization defines a role. A service defines a permitted transaction. Law defines some outer constraints. Each layer can narrow what the inner layer may authorize.

Authority should attenuate as delegation descends unless a higher principal explicitly broadens it.

This is the same principle the book has encountered in credentials, populations, networks, and tools. It keeps returning because it is the shape of governed power.

The phrase *under law* should not imply that every agent decision belongs in a courtroom. Most governance is much more ordinary: scopes, budgets, approval paths, audit records, contracts, service policies, technical interlocks, and the ability to stop renewal.

That ordinariness is the hopeful part.

We do not need to wait for a complete political theory of artificial minds before learning how to delegate consequential work safely. We need systems in which permission is explicit enough to be enforced and narrow enough to end.

The treaty is not peace with a foreign intelligence.

It is a discipline for ourselves about how much power software gets to borrow.