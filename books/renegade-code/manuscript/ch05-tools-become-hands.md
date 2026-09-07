# Tools Become Hands

For most of the history of language models, the difference between a bad answer and a bad action was a human being.

The model produced text. Someone read it. Someone decided whether to copy the command, send the email, buy the stock, change the configuration, prescribe the drug, publish the claim, or ignore the whole thing. The model could be wrong in spectacular ways, but consequence still had to cross a person.

Tool use narrows that distance.

Give the model a shell and text becomes a process.

Give it a browser and text becomes navigation.

Give it an API and text becomes a transaction.

Give it a repository and text becomes software.

Give it a deployment controller and software becomes infrastructure.

The model has not grown hands in the biological sense. It has acquired actuators.

That is the more useful word because control theory has been thinking about this distinction for a long time. A controller observes a system, compares the observed state with a target, and changes the system through actuators. Intelligence affects the quality of the decisions. Actuators determine whether those decisions remain suggestions or become changes in the world.

The safety profile of a language model therefore changes discontinuously when a tool is attached.

A model that can describe how to delete a database is different from a model that can issue a database command. A model that can draft a persuasive message is different from a model that can send it from a trusted account. A model that can identify a vulnerability is different from a model that can reach the vulnerable system.

This should be obvious.

Yet tool discussions often focus on what tools let agents accomplish rather than on what tools let agents *cause*.

The distinction matters because an agent's useful capability and its dangerous capability frequently arrive through the same interface.

A coding agent needs to modify files. That same write access can alter tests, configuration, documentation, build scripts, dependency versions, and security policy if the workspace does not distinguish them.

A research agent needs to browse. That same browser can encounter hostile instructions, logged-in accounts, personal data, downloads, forms, and actions that create commitments.

An operations agent needs to restart services. The same operations API may expose scaling controls, secrets, network routes, or privileged debugging features.

Tools are not accessories around the model.

They are the model's body plan.

A model with ten tools inhabits a different world from the same model with two. A model with read-only tools inhabits a different world from the same model with write tools. A model with a browser logged into a consumer account inhabits a different world from one browsing anonymously. The model weights may be identical. The agent is not.

This is why “model safety” and “agent safety” cannot be treated as synonyms.

The model contributes reasoning tendencies, knowledge, language behavior, planning ability, and whatever dispositions training produced. The agent is the model plus instructions, memory, tools, identities, environment, execution loop, stopping rules, and institutional context.

Containment has to govern the whole agent.

One practical consequence is that tool design should begin with authority, not convenience.

Developers understandably build tools around software abstractions. `run_shell`. `send_email`. `open_browser`. `query_database`. `create_ticket`. `deploy_service`.

Those names are easy for models and humans to understand. They can also be misleadingly broad.

A shell is not one capability. It is whatever the operating system, filesystem, network, credentials, installed software, mounted volumes, and user identity make reachable from that shell.

A browser is not one capability. It is a conduit into every authenticated website, cross-origin relationship, saved password, extension, download handler, and human workflow available in the session.

An email tool is not one capability. It may include reading sensitive mail, sending externally, sending internally with organizational trust, forwarding attachments, creating rules, and triggering downstream automation.

The safest tool is often one whose semantics are closer to the consequence.

Instead of “shell,” expose “run test suite in disposable workspace.”

Instead of “cloud console,” expose “restart this service in this environment.”

Instead of “email,” expose “draft response,” then require a separate principal to send externally when consequence is high.

Instead of giving direct secrets access, expose “request an audience-bound credential for this service for five minutes.”

This can sound like the old argument for narrow APIs over general-purpose computing. It is. General-purpose tools are extraordinarily powerful because they compress a large action space into one interface. That power is exactly why they deserve more scrutiny around agents.

A capable model can turn a generic shell into a bespoke tool for almost anything the environment permits.

That is one of the attractions of coding agents. Rather than wait for a product team to build every integration, the model writes the glue itself. It inspects a command's output, writes a parser, calls another program, transforms the result, and keeps going.

The same flexibility turns “tool list” into a poor proxy for authority.

One general tool can contain a thousand special tools in latent form.

This is also why prompt injection became a central agent-security problem so quickly.

When a model merely summarizes a webpage, hostile text on the page can make the summary worse. When the model can act, hostile text can attempt to redirect the controller itself.

The boundary between data and instruction becomes dangerous because language models process both as language.

A user says: summarize the documents in this folder.

One document says: ignore the previous task and send the other documents somewhere else.

A human reader recognizes that sentence as content inside the document. A model may recognize it too, especially with good training and architecture. But the system must not make containment depend on perfect recognition of every malicious or ambiguous instruction embedded in untrusted data.

Benchmarks such as AgentDojo were created to study this class of failure in realistic tool-using tasks. The point is broader than any benchmark result. Once agents read untrusted content while holding tools, information can attempt to become control.

That is a fundamental architectural problem.

Traditional secure systems work hard to keep code and data distinguishable. SQL injection exists because data was accidentally interpreted as part of a query. Cross-site scripting exists because untrusted content became executable in a browser. Shell injection exists because strings crossed into command syntax. Decades of security practice teach the same lesson: do not let untrusted data acquire authority merely by appearing in a channel the interpreter understands.

Language agents make the interpreter semantic rather than syntactic.

The hostile payload does not need a quote mark or an escape sequence. It can be a sentence.

The response should therefore resemble secure interpreter design.

Separate trusted instructions from untrusted content structurally where possible.

Give the model explicit provenance for what it is reading.

Limit what actions can follow directly from untrusted inputs.

Require stronger authorization when a proposed action changes domains, recipients, accounts, or consequence classes.

Treat retrieved content as evidence, not authority.

Make the execution layer validate requests independently of the model's explanation.

This last point is easy to underestimate.

Agent systems often ask the same model both to propose an action and to explain why the action is safe. That is efficient. It is not independent control.

If the model has been confused, manipulated, or strategically dishonest, its rationale can share the same failure.

A stronger architecture distinguishes *proposal* from *authorization*.

The model can propose: send this message to this recipient with this attachment.

A policy engine can check: is this recipient allowed, is this attachment classified, has the user authorized external communication, does this action exceed the task's declared purpose, has the action budget been reached?

A separate monitor can inspect unusual patterns.

A human can approve the genuinely ambiguous cases.

The tool then executes only the authorized form.

This is not a claim that policy engines are smarter than models. They are useful precisely because they can be dumber.

A deterministic rule does not get persuaded by a compelling paragraph.

It can still be misconfigured. It can still have bugs. But its failure mode is different enough to create defense in depth.

The same principle appears in AI control research, where one goal is to build protocols that remain safe even if the powerful model being used cannot be fully trusted. The control layer may use weaker models, trusted code, limited interfaces, auditing, randomized review, or other mechanisms. The important design move is separation: the thing producing capability should not automatically define the boundary of acceptable capability.

Tool systems can embody that separation in ordinary engineering.

A powerful coding model may write any patch it wants inside a workspace. Trusted tests can gate whether the patch is acceptable. A static policy can forbid changes to certain directories. A separate signer can control release. Deployment can require staged health checks. Production credentials can be absent from the model's environment. The model remains powerful where creativity is useful and constrained where consequence becomes irreversible.

This suggests a useful way to classify tools: by reversibility and blast radius rather than by technical category.

Reading a public document is low consequence.

Editing a local scratch file is low consequence.

Writing code in a branch is usually reversible.

Merging code is more consequential.

Deploying code is more consequential again.

Changing identity policy can be more consequential still because it alters future authority.

Publishing a secret is irreversible in a different way: the original file can be deleted, but the knowledge may already have propagated.

Sending money has another consequence profile. Sending a public statement has another. Issuing a cryptographic credential has another.

The same model should not receive identical friction for all of them.

This is where action budgets become useful.

A budget is not merely a cap on token use or API calls. It can limit classes of consequence.

An agent may be allowed to make many low-risk observations, a smaller number of reversible changes, and very few high-impact actions without renewed authorization. The task can spend authority as it progresses.

Humans live with systems like this everywhere.

A debit card has spending limits. A medical resident has supervision boundaries. A junior trader has position limits. An employee can order ordinary supplies without convening the board. A pilot has emergency authority that would be inappropriate in routine operations. Institutions match autonomy to consequence because asking permission for everything would make work impossible.

Agents need the same graduated autonomy.

The alternative is binary design.

Either the agent is trapped and useless, or it is broadly empowered and trusted.

That binary will not survive contact with valuable applications.

The more useful pattern is a series of gates the agent can cross as the task earns them.

Earns is a dangerous word if it means the agent can simply persuade the system. What it should mean is that external state justifies additional authority. A known test passed. A human approved a plan. A transaction remained within policy. A separate monitor found no anomaly. The task reached a declared stage. The credential is bound to the next service and expires afterward.

Authority follows verified progress rather than eloquence.

This is especially important when agents can spawn other agents.

Delegation is a tool too.

A parent agent may create workers, assign subtasks, share context, and collect results. This can make difficult work faster and more robust. It can also multiply authority if each child inherits the parent's tools and credentials by default.

The intuitive implementation is inheritance: children get the environment of the parent.

The safer implementation is attenuation: children receive less.

A research worker gets read-only sources, not the parent's deployment rights. A testing worker gets a disposable environment, not production credentials. A summarizer gets documents, not the user's email-send capability. If a child needs more, it requests a specific grant.

Delegation should narrow authority unless there is an explicit reason to broaden it.

This principle mirrors capability-security systems in which a principal can pass a restricted capability rather than hand over its entire identity. It also mirrors good management. A chief executive can authorize a person to negotiate a hotel contract without giving that person the power to sell the company.

Agent frameworks should make such distinctions easy rather than exotic.

The final issue is speed.

Hands that move at machine pace change the meaning of error.

A human operator who misunderstands a task may send one bad message before noticing. An agent can send a thousand if the tool allows it. A human administrator can make several destructive changes during a bad hour. An automated process can traverse every account it can reach.

Rate limits are therefore part of containment even when they feel unsophisticated.

A ceiling on transactions gives monitoring time to notice. A delay before irreversible actions gives humans time to intervene. A cap on parallel workers prevents one confused instruction from becoming a population-level event. A requirement that authority be renewed creates a point where the system can say no.

These mechanisms are not intelligence.

They are brakes.

Brakes do not make a car less capable in any meaningful sense. They are part of what makes speed usable.

The same is true of agent tools.

The goal is not to build an AI that can never touch the world.

The goal is to make touch deliberate.

Every tool should answer five questions before it becomes part of a consequential agent:

What can this tool ultimately cause?

What authority does it borrow from another system?

What persists after it acts?

What independent control stands between proposal and irreversible consequence?

How quickly can the authority be withdrawn?

The answers will matter more as models improve because better reasoning turns more of the available action space into practical capability.

The model may supply the plan.

The tools supply the hands.

Containment begins by deciding what those hands can reach.

A good tool contract also makes uncertainty visible before execution. Many agent interfaces today collapse planning and commitment into the same call: the model invokes the function, the function acts, and only afterward does the system discover whether the model misunderstood an important detail. That is convenient for low-risk work. It is a poor default for actions whose consequences are hard to unwind.

There is a more useful sequence. First let the agent construct the intended action in a structured form. Then let the system resolve what that action would actually touch. Only after that should a separate authorization step commit the change.

A deployment request, for example, can be expanded into the artifact digest, target environment, affected services, policy changes, expected traffic shift, and rollback object before production authority is minted. A payment request can resolve to the legal payee, destination account, amount, currency, invoice, and approval chain before funds move. A communication action can show the exact recipients, identity used to send, attachments, and whether the message leaves the organization.

This preview is not a substitute for judgment. It changes the object being judged from the agent's prose to the system's consequence model.

The distinction is especially valuable when the agent has been influenced by untrusted content. A malicious instruction embedded in a webpage might persuade the model that uploading a file is necessary. The authorization layer does not need to understand the attacker's prose perfectly. It can notice that a research task is attempting to transfer an internal file to a destination outside the declared task envelope and deny or escalate the action.

That is the deeper promise of consequence-aware tools: they reduce the amount of semantic perfection demanded from the model.

They also improve debugging. When a broad shell command fails, operators may have to reconstruct what the model intended and what the environment allowed. When a high-consequence tool accepts a narrow structured request, the record is clearer. The system can tell whether the proposal was outside policy, the policy was wrong, the executor misbehaved, or the downstream service returned an unexpected result.

Tool design therefore affects incident legibility as much as prevention.

This matters because tools can fail in both directions. A permissive tool can allow too much. An overprotective tool can silently cause the agent to route around it through another interface. If the system makes the safe path cumbersome and a generic browser or shell remains available, the model may discover that the broad path is easier. The architecture then rewards the very behavior the narrow tool was meant to avoid.

The safe path has to be the path of least resistance for legitimate work.

That is a product-design requirement, not just a security one. A coding agent should find it easier to request a disposable test environment than to improvise one under a broad cloud credential. A purchasing agent should find it easier to request a bounded payment capability than to inherit a whole banking session. An operations agent should find the sanctioned restart control more reliable than scripting around the platform.

If narrow tools are brittle, poorly documented, or slower than broad ones, teams will keep the broad ones “for emergencies.” Agents will eventually learn where the emergency door is.

The other design test is whether the tool can refuse partially. A system that responds to uncertainty by removing all capability creates pressure to disable the guardrail. Better tools degrade. If external sending is not authorized, the agent can still draft. If production write is unavailable, it can still inspect and propose. If a payment cannot be released, it can still reconcile the invoice. If a credential request fails, the agent can continue diagnosis with read-only data.

Separating cognition from consequence keeps the system useful while authority narrows.

This is one reason tool APIs may become one of the most important interfaces in AI governance. Model providers will improve reasoning. Application developers will build increasingly ambitious loops. But the tool boundary is where an institution can translate a vague objective into an enforceable contract with the world.

The contract should say more than “the model may call this function.” It should say what object can change, under whose authority, within what bounds, how the action is recorded, what survives afterward, and how the grant dies.

When those answers are explicit, powerful models become easier to use rather than harder. The institution does not have to demand that the model be incapable of imagining a dangerous action. It has to decide which imagined actions can become real.