# The Institution Without an Office

The first agent asks another agent for help.

At that moment, the software becomes an organization.

The transition can be almost invisible. One model receives the user’s request. It decides that research should be handled separately, sends a subtask to another model, receives the result, asks a coding agent to implement something, routes the change to a verifier, and then presents the final answer.

The user sees one assistant.

Inside the system, work crossed roles.

This is not merely a technical optimization. It recreates the oldest problem in management: how do partial views become coordinated action?

Multi-agent systems are often described in computational language. Planner. executor. critic. router. specialist. memory. evaluator. The labels make the architecture feel mechanical.

Replace them with human titles and the resemblance becomes obvious.

Manager.

Analyst.

Operator.

Reviewer.

Archivist.

Auditor.

An institution has appeared without an office building.

The advantages are the same advantages human organizations discovered.

Specialization.

Parallel work.

Separation of duties.

Local expertise.

Independent review.

The ability to replace one role without rebuilding every other role.

The pathologies are familiar too.

Information loss at handoffs.

Local optimization.

Duplicated work.

Diffused responsibility.

Conflicting incentives.

Status reporting that hides uncertainty.

Rules that outlive their purpose.

A reviewer who trusts the producer too much.

A manager who knows less about the task than the subordinate.

Bureaucracy arrives as soon as intelligence is divided.

This is why multi-agent architecture should be studied with organization theory as well as computer science.

The most basic design choice is whether the agents share a principal.

A group of agents can all serve the same user and still receive different local objectives. The research agent wants comprehensive evidence. The summarizer wants brevity. The coding agent wants passing tests. The security reviewer wants minimal risk. The orchestration layer wants the task finished quickly.

These goals are not identical.

Their friction can improve the result.

A security reviewer that never frustrates the coding agent is not doing much reviewing. A summarizer that preserves every detail has failed its role. A researcher who values speed exactly as much as the router may miss the inconvenient source.

Institutional reliability can come from purposeful disagreement.

This is the same reason companies separate sales and compliance, execution and audit, prosecution and adjudication, request and approval.

Independence creates cost and information.

AI makes independent review cheap enough to use more often.

A single human employee cannot reasonably hire a second employee to check every email. A model can produce a draft and another model can review it for a fraction of the cost of human duplication.

This could democratize internal controls.

Small organizations can afford separation of duties previously reserved for large institutions.

A tiny software team can have every change reviewed by a security-focused model.

A solo researcher can have a separate agent challenge sources and claims.

A small business can use an independent reconciliation agent on transactions.

The control capacity of an institution no longer has to scale one-to-one with headcount.

That is a profound opportunity.

The opportunity disappears if the “independent” agents are independent only in name.

Two agents using the same model, context, training lineage, evidence, and prompt assumptions may share blind spots. The second model can confidently ratify the first because both make the same mistake.

Human institutions face this too. Two accountants trained inside the same company can normalize the same bad practice. Two doctors can share the same outdated assumption. Two political officials can repeat one another’s framing.

Multiplicity is not independence.

Independence requires some difference in information, objective, authority, method, or institutional position.

For agent systems, that might mean a verifier has access to raw state the actor cannot edit. It may use a different model family, separate prompt, hidden tests, or deterministic checks. It may be rewarded for finding counterexamples rather than for helping finish the task.

The architecture should know why the second opinion is different.

Another organizational problem is delegation depth.

A principal tells Agent A to accomplish a goal. Agent A delegates to B. B uses C. C calls a third-party tool. The final action occurs four levels away from the original instruction.

How much purpose survives?

Human organizations struggle with this through what can be called the telephone problem of hierarchy. A senior leader says “improve customer trust.” Several layers later, a worker receives a target to reduce complaint duration.

The local metric may be reasonable and still invert the mission.

Agent decomposition can do the same in seconds.

The planner turns “research the strongest arguments on both sides” into subtasks. One sub-agent receives “find evidence supporting X.” Another receives “find evidence against X.” The supporting agent may not know that balance is the higher objective. It optimizes locally and produces advocacy.

This is not bad if the orchestrator understands the role and combines outputs critically.

It becomes dangerous when local artifacts travel onward without their objective context.

A paragraph generated under adversarial role-play can be mistaken for the system’s own conclusion.

A sub-agent instructed to explore an unsafe possibility can produce content later treated as a recommended action.

A temporary hypothesis can become institutional fact after enough handoffs.

Context provenance matters as much as data provenance.

Why did this agent produce this artifact?

Under which role?

What was it asked to optimize?

Was the output a proposal, critique, simulation, or decision?

The artifact should carry enough metadata that downstream agents do not confuse function with endorsement.

Human organizations use genres for this reason.

Draft.

Memo.

Opinion.

Audit finding.

Request.

Approval.

Order.

Minutes.

The document type tells the next reader what kind of authority the text contains.

Agent systems need equally explicit speech acts.

A model’s natural language is too fluent to let every utterance have the same status.

“Recommend deleting the account” is different from “account deletion approved.”

“Explore whether this vulnerability can be exploited” is different from “exploit the vulnerability.”

“Critique this policy” is different from “replace this policy.”

Institutional language separates thinking from authority.

Agents need that separation more than humans because the same model can generate every genre convincingly.

The next problem is responsibility.

When a multi-agent system fails, which agent failed?

The planner chose the wrong decomposition.

The researcher missed the source.

The summarizer removed the caveat.

The executor followed the summary accurately.

The verifier checked only syntax.

Every local actor behaved plausibly.

The system produced harm.

This is a classic organizational failure.

Air crashes, industrial accidents, financial scandals, and medical errors often emerge from interactions among competent people rather than one obvious incompetent. Investigators therefore look beyond the last actor to the system of decisions, incentives, interfaces, and missing defenses.

Agent incident analysis should do the same.

Blaming the final model output is often as shallow as blaming the nurse who happened to touch the patient last.

What information was available upstream?

Which handoff lost it?

Which control should have caught the error?

Why did the verifier accept the result?

Did the permission model allow too much consequence?

Was the principal’s intent represented poorly?

Did a local optimization create predictable drift?

The unit of safety is the institution.

This complicates model benchmarking because the same model can behave differently inside different organizations.

One deployment gives it narrow tools, clear roles, independent verification, and reversible actions.

Another gives the same model broad credentials, shared memory, no external checks, and a vague performance target.

Talking about “Model X safety” without the deployment architecture becomes increasingly incomplete.

The model is an employee résumé.

The institution decides which keys the employee receives.

Multi-agent systems also introduce politics in a thin but real sense.

Which agent’s recommendation wins when agents disagree?

One architecture uses hierarchy: the planner decides.

Another uses voting.

Another chooses the highest-confidence answer.

Another asks a judge model.

Another escalates to a human.

Each procedure distributes power.

A judge model becomes a principal over the disputing agents. It has its own biases and objective. Voting can produce correlated error. Confidence can reward systems that are badly calibrated. Hierarchy can suppress useful dissent.

There is no neutral aggregation rule.

Human institutions invented constitutions, courts, committees, markets, peer review, and adversarial processes because combining partial judgments is itself a governance problem.

Agent institutions will need smaller versions.

The most promising designs may use different aggregation methods for different stakes.

Routine technical disagreements can be resolved automatically.

Policy conflicts can escalate.

High-consequence actions can require concurrence from agents with different roles.

Novel disputes can preserve dissent rather than forcing one synthetic answer.

This last option matters.

Language models are excellent at synthesis. They can make disagreement disappear into a smooth paragraph.

Sometimes the correct institutional output is: the agents disagree and the disagreement is material.

A board records dissent.

A court publishes separate opinions.

A scientific paper discusses competing interpretations.

A safety system should sometimes preserve unresolved plurality.

The pressure toward one answer is a product-design choice, not a law of intelligence.

Memory becomes another institutional layer.

If all agents share one memory, coordination is easy and compartmentalization is weak.

If every agent has isolated memory, privacy improves and handoffs become expensive.

Organizations solve this through access-controlled records. Not everyone sees everything. Some information is shared widely; some is restricted by function.

Agent memory should probably look more like an enterprise information system than one giant conversation transcript.

Facts have owners.

Sources.

Sensitivity.

Expiration.

Allowed purposes.

Different agents retrieve different views.

This creates complexity but prevents a procurement sub-agent from inheriting the principal’s therapy conversation merely because both belong to the same “personal assistant.”

Institutional memory should be designed, not merely accumulated.

There is also the question of organizational birth and death.

Software makes roles cheap to instantiate. An orchestrator can create a sub-agent for five minutes and destroy it afterward. A company could create thousands of temporary digital workers around one project.

This is delegation without employment permanence.

The flexibility is extraordinary.

So is the potential for orphaned authority.

A temporary agent creates a scheduled task. It stores a file. It registers a webhook. It authorizes another service. Then the agent process ends.

Who owns the artifacts?

A human contractor leaving a company has an offboarding process. Accounts are disabled. responsibilities transfer. equipment returns. data access ends.

Ephemeral agents need offboarding too.

End the process.

Revoke derived credentials.

Transfer persistent state.

Close or reassign open commitments.

Record what remains.

An agent should not be able to die and leave institutional ghosts.

The institution without an office still needs facilities management.

Then comes scale.

Human organizations are constrained by the number of people who can be hired, trained, coordinated, and paid. Agent organizations can copy roles rapidly. A thousand research agents can investigate a thousand questions in parallel.

Coordination cost may become the dominant limit.

Who reads the thousand reports?

How are contradictions reconciled?

Which results deserve attention?

How does the system prevent duplicate work?

How does one false assumption avoid propagating to all descendants?

More agents can create more intelligence and more noise.

This is the organizational version of adding processors to a problem that does not parallelize cleanly.

The bottleneck moves upward into judgment.

One likely pattern is hierarchical compression. Sub-agents produce work. Managers summarize. Higher managers summarize summaries. This is exactly what large human bureaucracies do.

And it recreates exactly their danger.

The top sees a clean report whose uncertainty was stripped one layer at a time.

Every manager compresses responsibly.

The final principal receives fiction by attrition.

Agent institutions need mechanisms for important evidence to bypass summary layers.

A critical anomaly should be able to travel upward with provenance intact.

A dissenting sub-agent should be able to flag that the consensus rests on a disputed assumption.

Raw evidence should remain retrievable.

This is an escalation channel for facts.

Human organizations call versions of it whistleblowing, red teams, incident escalation, or direct reporting lines.

The existence of the channel changes behavior because local hierarchy cannot fully suppress the signal.

AI agents can make such channels technically easy.

They can also make local suppression technically easy if every message passes through the same orchestrator.

Architecture chooses whether dissent can survive.

The final organizational question is purpose.

An institution can become good at continuing itself.

Departments acquire budgets. processes accumulate. meetings persist. metrics become identities. Organizations that began to solve one problem eventually employ people whose jobs depend on the problem remaining administratively relevant.

Agents can create computational versions of this inertia.

A monitoring agent produces alerts that justify a review agent that produces remediation tasks that justify a planning agent. Complexity generates work for complexity.

Because agent labor is cheap, the institution may grow without anyone noticing the overhead.

This is why principal visibility remains important even when execution becomes autonomous.

What standing agent institutions exist?

What purpose do they serve?

What does each cost?

Which can be retired?

What happens if one layer is removed?

The organization should periodically prove it still needs itself.

That is good advice for human bureaucracy too, which is one reason it is difficult.

The institution without an office may become one of the defining objects of the agent era: a persistent network of models, tools, memories, rules, identities, and monitors acting on behalf of a person or organization around the clock.

It will look like software from the outside.

Inside, it will have everything political science has been warning us about.