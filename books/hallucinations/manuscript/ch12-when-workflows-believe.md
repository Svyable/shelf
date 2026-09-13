# When Workflows Believe

A person can doubt a sentence.

A workflow cannot, unless doubt has been designed into it.

Software moves values from one state to another. A field is empty or filled. A ticket is open or closed. A risk is low, medium, or high. A payment is approved or rejected. A task has an owner. A customer has a renewal date. Once generated language enters these systems, uncertainty has to fit the schema.

Often it does not.

That mismatch is where hallucination becomes operational.

A chatbot answer is still language. A person can read it, raise an eyebrow, and decide not to act. A generated value written into a database becomes something else. Other systems query it. Dashboards aggregate it. Automations trigger on it. Reports treat it as input.

The workflow begins to believe.

No software engineer would describe a database as having belief in the psychological sense. The metaphor is useful because the system behaves as though the value is true. It does not revisit the epistemic history of the field each time it runs a query.

This is how computers achieve speed.

We normalize uncertainty out of execution.

A payroll system cannot recalculate the philosophical status of an employee's bank account every payday. A warehouse system needs quantities. A tax system needs classifications. Reliable computing depends on turning messy reality into stable representations.

Generative AI is now being placed at the border where messy reality becomes stable representation.

That border deserves more attention than the chatbot itself.

Consider an insurance workflow. A model reads a claim narrative, photos, prior records, and policy language. It extracts date of loss, location, damage type, and likely coverage category. The values populate a case management system. Another model summarizes the file for an adjuster. A third prioritizes claims for review.

If the first model invents a date, the downstream systems may never know it was generated.

The summary can cite the case-management field. The prioritization system can use the field as structured truth. The adjuster may see a polished record in which the original uncertainty has disappeared.

The hallucination has crossed the format boundary.

Text is probabilistic and contextual. Databases are declarative.

The moment a generated proposition becomes a field, a label, a status, or a score, the organization has to decide what evidence threshold justifies that conversion.

Most AI governance discussions focus on who may use which model. Fewer focus on which machine-generated statements are allowed to become system-of-record data.

That may be the more important policy.

A company can safely let employees brainstorm with a powerful model while forbidding unsourced generated facts from entering customer records. Another can allow automated extraction of explicit fields from documents but require human review for inferred fields. A third can let models draft classifications but require rule-based validation before those classifications trigger actions.

The boundary is not AI versus no AI.

It is generation versus authorization.

These should be separate steps.

Generation proposes a representation. Authorization gives the representation consequences.

Humans already separate them in mature processes. A purchase order can be drafted by one person and approved by another. A laboratory result can be produced by an instrument and reviewed before release. A junior lawyer drafts; a licensed attorney files. A loan application contains claims; underwriting decides which are acceptable evidence.

AI can fit those structures if we resist the urge to collapse proposal and authorization into one agent.

Autonomy makes the collapse tempting.

If the model can read the email, update the CRM, send the reply, schedule the meeting, revise the forecast, and notify the team, why stop after drafting?

Because each action changes the evidentiary environment for the next.

An agent that sends a mistaken email can create a reply that seems to confirm the premise. An agent that updates a database can cause another agent to retrieve the new value as fact. An agent that cancels an order can generate a real cancellation notice, turning an imagined problem into an actual one.

Actions are not just consequences. They produce new context.

This is why agentic systems can create self-confirming loops.

Suppose an agent misreads a vendor's message as a price increase. It updates the procurement system. A budgeting agent sees higher expected cost and flags the vendor. A sourcing agent searches alternatives. A manager receives a summary saying the company is evaluating alternatives "after Vendor X's price increase." The manager asks the original vendor for an explanation.

The vendor replies, confused, that no increase was announced.

If the system is well designed, the contradiction triggers correction.

If not, the reply can be interpreted as negotiation.

The initial misread has generated organizational behavior that makes the imagined event appear administratively real.

This is shared hallucination with write access.

The risk rises as agents become more capable because capability expands the radius of one error.

A model that can only answer text produces text risk. A model that can send money, change permissions, deploy code, submit forms, book travel, or modify records connects epistemic error to physical consequence.

Security engineers understand a related principle: authority should be least-privilege.

An application should have only the permissions it needs. If compromised, the blast radius stays smaller.

AI systems need epistemic least privilege too.

A model should not be allowed to convert every uncertain conclusion into an authoritative state merely because it can.

This does not mean endless human approvals.

Many actions are low risk and reversible. A calendar assistant can tentatively hold a time. A coding agent can create a branch. A purchasing agent can draft a cart. The system can automate aggressively while keeping consequential state changes behind stronger evidence or review.

Reversibility is one of the most practical dimensions of AI risk.

If an action can be undone cheaply, the system can tolerate more autonomy. If a false action is costly, public, legally binding, or dangerous, the threshold should rise.

This suggests a simple way to think about workflows: not all errors deserve the same friction.

A model misspelling a meeting title is easy to fix. A model submitting a filing to court is not. A model drafting a refund is different from issuing one. A model suggesting a medication interaction is different from changing an order.

The workflow should know which side of the line it is on.

Automation bias complicates the human checkpoint.

Research long predating modern generative AI has shown that people can over-rely on automated aids, especially when those aids are usually reliable. Newer studies of generative systems continue to probe the problem. A warning can help in some settings. It does not erase the basic cognitive dynamic: if a machine gets hundreds of cases right, the human reviewer may stop treating each case as a fresh decision.

This is why "human in the loop" is not a magic phrase.

A human can be technically present and functionally absent.

Imagine an employee who must approve 500 model-generated classifications a day. The interface shows a green check by default. Ninety-eight percent are correct. The employee learns quickly that deep review creates no visible benefit and threatens throughput. Clicking approve becomes the job.

The organization still tells regulators a human reviews every decision.

The human has become a ceremonial control.

A real review step needs information that makes review efficient.

Show the source passage. Highlight what was inferred. Surface low-confidence cases. Compare against prior records. Detect contradictions. Sample routine cases instead of requiring mindless approval. Route ambiguous cases to people with relevant expertise.

Human attention is a control resource. Do not spend it uniformly.

This is another reason provenance matters. Without provenance, the reviewer sees the same polished output the model produced. She must recreate the investigation from scratch. Verification becomes expensive.

A well-designed system shortens the path from claim to evidence.

The easier a claim is to verify, the more likely verification will happen.

Organizations often discover this principle too late. They deploy generative tools broadly, publish policy saying "employees are responsible for accuracy," and assume responsibility has been allocated. Responsibility without tooling is aspiration.

If an employee must manually search three systems to verify every generated fact, the organization has created a policy against its own productivity incentives.

The better approach is to make unsupported content expensive for the machine and verification cheap for the human.

Require citations where citations can be checked. Use structured extraction when the task is extraction. Preserve confidence and source fields separately from final values. Use deterministic tools for calculations. Make the model call an authoritative system rather than guess. Prevent generated text from writing directly to protected fields without validation.

These are boring controls.

They are also what reliable automation looks like after the demo.

The urge to remove them comes from a seductive story: intelligence will replace process.

It will not.

Intelligence can navigate process, propose process, and automate parts of process. The more capable the agent, the more important it becomes to define what counts as evidence for a state change.

Human organizations do not let intelligence alone authorize everything. The brilliant employee still needs purchasing approval. The senior trader has limits. The surgeon follows protocols. The CEO cannot sign on behalf of the company in every jurisdiction merely because she is the CEO.

Authority is structured because consequences are structured.

AI should inherit that wisdom.

There is another failure mode in workflows: silent fallback.

A tool call fails. The database is unavailable. The retrieval system times out. The agent still has to return something. If the application allows the model to fill the gap from its own generation, a grounded system can become an ungrounded system without the user knowing.

This is one of the most dangerous forms of graceful degradation.

Engineers love systems that keep working when components fail. For factual tasks, continuing may be worse than stopping.

If the authoritative price service is down, the purchasing agent should not produce a plausible price. If the legal database cannot resolve a citation, the research assistant should not substitute a model-memory citation. If the patient's chart is inaccessible, the clinical assistant should not infer the medication list.

Availability and truth can conflict.

We need fail-closed behavior for certain epistemic operations.

Security has long accepted this trade. A door may remain locked when the credential service fails. The inconvenience is intentional because a permissive fallback would defeat the control.

AI systems need analogous rules.

When evidence is unavailable, some answers should remain unavailable.

This is difficult culturally because generative models are famous for never showing an empty screen.

The empty screen can be the safest state.

Workflows also need correction paths.

If a human discovers that a generated field is wrong, what happens next? Does correction update only the visible record? Does it propagate to summaries, derived scores, and downstream systems? Does the system remember that the original inference was unreliable? Can auditors see which actions occurred before correction?

A truth system without rollback is incomplete.

Version control offers a useful analogy. Software developers do not merely overwrite code and forget the past. They preserve history, review changes, revert bad commits, and trace which version introduced a defect.

AI-mediated records need similar lineage.

What generated this value? Which model version? Which prompt or policy? Which source documents? Which human approved it? Which downstream actions consumed it?

These questions sound excessive until the wrong answer matters.

Then they are the only questions anyone wants answered.

The future enterprise will be full of synthetic text that nobody reads at the moment it is produced. Agents will summarize, classify, route, reconcile, and update. Human oversight will move upward toward exceptions and policy.

That future can be safer than today's manual bureaucracy if the systems preserve evidence better than humans do.

Machines do not have to forget provenance. They do not have to lose timestamps. They do not have to pretend a missing field was present. They do not have to accept correlated sources as independent. They can make every consequential transformation traceable.

But traceability has to be built before the incident.

A workflow believes whatever its state says.

Our job is to decide what deserves to become state.