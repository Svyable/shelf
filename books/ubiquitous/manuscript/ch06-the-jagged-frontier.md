# The Jagged Frontier

It would be easier if artificial intelligence were simply good at some professions and bad at others.

Then a person could look up the safe list, choose a side, and make plans.

The reality is less convenient. A model can be excellent at one task, mediocre at a neighboring task, and confidently poor at another that looks almost identical to the user. It can write a useful program and then miss an obvious security flaw. It can summarize a dense report and then misread a table. It can produce a strong strategic analysis while failing on a small factual distinction that changes the conclusion.

The capability boundary is jagged.

That phrase entered the AI-and-work conversation through research on consultants using GPT-4. The researchers found that people working with the model performed substantially better on tasks inside its frontier. On a task deliberately chosen to sit outside that frontier, the pattern reversed. AI-assisted participants were more likely to land on the wrong answer.

The result matters because the bad task did not announce itself with a red light.

The system remained fluent.

This is one of the hardest properties of generative AI for ordinary work. A traditional machine usually fails in ways that expose the boundary. A wrench cannot become a voltmeter because the user asks nicely. A spreadsheet does not pretend an unavailable file exists. A database query that references a missing column tends to return an error.

A language model can continue.

Its interface rewards continuation. The user asks. The model answers. Even uncertainty is expressed through language, and language can make weak evidence feel organized.

The durable human skill is therefore not merely knowing how to use the tool.

It is learning the shape of the frontier.

That shape changes with models, tools, context, and domains. A capability that was unreliable last year may become routine. A new connector may make a task easier because the model can retrieve the authoritative data instead of guessing. A better evaluation may reveal that a task everyone considered solved contains an important tail of failures.

This is why static claims such as “AI cannot do X” age so badly.

The more useful question is: what kind of error does this task permit, and how quickly will we know?

Some tasks are self-verifying.

Ask a model to convert a file format, write a small testable function, sort a list under explicit rules, or extract fields from documents where a human can spot-check the result. Errors are visible, cheap, and reversible. The frontier can be pushed aggressively because feedback is fast.

Some tasks are externally verifying.

Ask a model to propose a manufacturing setup, draft a construction sequence, diagnose a machine problem, or recommend a pricing change. The answer meets a physical or market system. Feedback arrives, but perhaps after material, time, money, or customer trust has been spent.

Some tasks are weakly verifying.

Ask for a long-range strategy, a hiring decision, a legal interpretation, a medical judgment, or an estimate of whether an unusual event will happen. The true answer may be delayed, contested, or impossible to isolate. A plausible model output can survive for a long time without encountering decisive evidence.

These categories are not measures of intelligence. They are measures of how safely intelligence can be deployed.

A model does not need to be more capable than a human in every respect to transform a self-verifying task. It only needs to be capable enough that cheap checking catches the remaining mistakes.

Conversely, a model can be impressively capable at a weakly verifying task and still require a great deal of human judgment because the cost of the rare failure is high and the evidence needed to catch it is sparse.

This distinction explains why software has been one of the earliest domains of intense AI use.

Code is symbolic, abundant in training data, and surrounded by machines that can check parts of it. Compilers complain. Tests fail. Programs crash. Static analyzers identify classes of problems. Version control makes changes reversible. Sandboxes isolate experiments. None of these guarantees correctness, but together they create a rich feedback environment.

The same quality makes software a preview of what other professions will become when they acquire better verification infrastructure.

Imagine a compliance workflow where every model recommendation cites the exact current regulation, every decision is checked against a formal rule engine where possible, uncertain cases are routed to a human, outcomes are logged, and error patterns are continuously evaluated. A task that once required a person to read every case can become much more automatable even if the model itself is imperfect.

The bottleneck moves from generation to evaluation.

That is a recurring theme in the next decade.

When producing candidate answers becomes cheap, choosing among them becomes more valuable.

This sounds like the usual praise of judgment, but judgment itself can be made more concrete. It consists partly of knowing what evidence should exist if an answer is true.

A machinist does not have to philosophize about whether a dimension is correct. Measure it with an appropriate instrument. A structural engineer can check a calculation against known relationships, code requirements, independent methods, and eventually physical behavior. A marketer can run an experiment. A developer can write a test. A plumber can pressure-test the line. An electrician can meter the circuit.

These professions have developed cultures of verification because mistakes are expensive and reality is available for interrogation.

Many forms of office work have weaker habits.

A report is reviewed for completeness, tone, and whether the reasoning sounds coherent. A forecast is compared with other forecasts rather than with an immediate truth. A strategy deck may be considered successful if executives agree with it. Organizations can become elaborate systems for validating artifacts socially before the world validates them materially.

AI is excellent at social plausibility.

That makes weak verification a bigger problem than weak generation.

A company that adds AI to an existing sloppy decision process can create faster sloppiness with better prose. A school that uses AI to grade writing without a reliable model of what the student actually knows can automate an uncertain judgment. A government that summarizes public comments through a model without preserving traceability can make participation more efficient while making the resulting interpretation harder to contest.

The human skill that lasts is the ability to build checks into the work.

This does not mean manually reviewing every output forever. Manual review is expensive and often theatrical. A person can glance at a thousand generated answers and certify very little.

Strong verification has structure.

Use independent sources. Separate generation from checking. Test high-risk assumptions. Sample outputs by risk rather than convenience. Keep provenance. Make consequential actions reversible where possible. Require approval at points where the machine lacks context. Record exceptions. Design alerts for behavior that should be rare. Compare predicted outcomes with observed outcomes and feed that discrepancy back into the process.

These are skills from engineering, quality control, safety, science, accounting, security, and operations.

They are moving into ordinary knowledge work because probabilistic machines turn ordinary workflows into systems that need monitoring.

The worker who understands this becomes more valuable than the worker who can merely produce more output with AI.

Output is the easy part.

Suppose two employees use the same model to prepare a market analysis.

The first asks for the report, edits the prose, adds company branding, and sends it.

The second begins by identifying which claims would change the decision if wrong. She asks for primary sources, checks dates, distinguishes reported facts from model inference, compares the model’s answer with an independent dataset, and records uncertainties that cannot be resolved. The final report may look less confident.

The second worker has done more than “fact-check.”

She has allocated verification effort according to consequence.

That is a transferable skill because every model and every domain will continue to have a frontier.

The frontier will move outward. The allocation problem will remain.

This is also where deep expertise retains leverage. An expert knows which errors are plausible enough to deserve a test. A novice can be told to verify everything and end up verifying nothing useful because the possible error space is too large.

Consider an experienced industrial mechanic listening to a failing pump.

The model may list cavitation, bearing wear, misalignment, inadequate lubrication, obstruction, motor issues, and several other causes. All may be plausible in the abstract. The mechanic has a compressed prior built from machines. The sound, vibration, process conditions, maintenance history, temperature, and recent work change the order of possibilities. The expert knows which observation will separate one cause from another quickly.

That is diagnosis.

AI can improve diagnosis by expanding the hypothesis set, retrieving manuals, comparing fault histories, and suggesting tests. The mechanic contributes the ability to connect those suggestions to the actual machine and to notice evidence the system did not receive.

The collaboration works because the frontier is made visible through testing.

The same principle applies to intellectual work, though the tests are often harder to design.

A historian can ask whether a source is contemporaneous, representative, and independent. An economist can ask whether the identification strategy supports the causal claim. A lawyer can ask whether a case is controlling in the jurisdiction and whether later authority changed it. A journalist can call the person the model says made the statement. A manager can inspect the underlying transactions instead of trusting the summary.

These habits are forms of friction.

AI companies and users are generally trying to remove friction. Most of the time that is sensible. Nobody wants a system that demands ceremonial verification for low-stakes work.

The difficult design choice is knowing where friction is information.

A construction permit requires signatures and inspections partly because mistakes can outlive the person who made them. A bank separates duties because the second pair of hands is a control, not merely a delay. A machine shop uses first-article inspection because producing a hundred wrong parts faster is not productivity.

Knowledge work will need more of this thinking.

The goal is not to turn every email into a regulated process. It is to stop treating fluent output as evidence that a consequential process is under control.

This becomes especially important as harnesses take actions instead of merely writing text.

A model that drafts a bad email creates embarrassment.

A model that sends the email creates a customer event.

A model that drafts a database query creates a suggestion.

A model that executes the query with write permissions can alter records.

A model that summarizes a purchase request is an assistant.

A model that approves the purchase is part of the control system.

Each step toward agency moves the frontier closer to consequence.

That increases the value of permissions, staging, logs, rollback, approval boundaries, and independent checks. These may sound like software concerns, but they become management concerns once ordinary departments delegate work to agents.

The renaissance worker has an advantage here because verification often crosses domains.

The technically correct action may be financially foolish. The legally allowed action may be reputationally damaging. The operationally efficient action may create a security risk. The customer-friendly exception may break an accounting control.

A narrow system sees the objective it was given. A broad human can notice the neighboring objective that will object.

This is not mystical human wisdom. It is context accumulated across systems.

Curiosity grows that context.

The person who has spent time learning how finance, operations, customers, law, and technology interact is more likely to recognize that an apparently small automated action crosses an important boundary. The person who understands only the workflow inside one department may optimize directly into another department’s failure.

The physical trades learn a version of this early because systems announce their dependencies forcefully.

Turn off the wrong breaker and the production line stops. Close the wrong valve and another floor loses water. Change a machine parameter and tool life collapses. Excavate in the wrong place and the drawing becomes less authoritative than the buried utility.

The world teaches systems thinking through consequences.

Digital work can delay the lesson, but ubiquitous AI will make it necessary. As more symbolic actions happen automatically, organizations need people who know where the action touches reality.

This is why a skill list for the next decade should not be built around what models are currently bad at.

That list expires.

Build around what moving frontiers require.

Can you formulate a test?

Can you identify the source of truth?

Can you tell which error matters?

Can you observe the system after action?

Can you distinguish reversible exploration from irreversible commitment?

Can you recognize when a result is outside the conditions where the method is trustworthy?

Can you stop a process that is confidently doing the wrong thing?

These questions apply to models, machines, organizations, and people.

They are not anti-AI skills.

They are the skills that let capable tools be used aggressively without pretending capability is the same as reliability.

The future belongs less to people who know where the frontier is today than to people who know how to find it again tomorrow.

A frontier map is therefore more useful than a model ranking.

Organizations will be tempted to ask which model is best and then treat the answer as a procurement decision. The operational question is narrower and more difficult: best for which task, under which context, with which tools, at what failure cost, and with what check afterward?

A model that is weaker on a broad benchmark may be the better component in a workflow if its failures are easier to detect. A more capable model may be inappropriate if it requires data the organization should not expose. A tool-enabled system may outperform a stronger isolated model because retrieval and execution close the gap between fluent recall and current facts. The frontier belongs to the whole system, not the model alone.

That shifts evaluation from laboratories into workplaces.

A company adopting AI needs its own test cases drawn from the work it actually does. Not only easy examples. Not only spectacular edge cases. It needs the boring distribution and the expensive tail. It needs examples where documents conflict, customers omit facts, policies have changed, images are ambiguous, a field is mislabeled, or the correct response is to refuse to continue.

The best evaluation set is partly a history of the organization’s mistakes.

Incident reports, rework, rejected claims, customer escalations, warranty failures, audit findings, security events, bad estimates, missed deadlines, and near misses are all records of places where the obvious procedure was insufficient. They can teach a model where to hesitate, but just as importantly they can teach humans what needs checking.

This makes postmortem quality an AI capability.

An organization that never records why things went wrong has little material for locating the frontier. It can buy better models and remain unable to say whether the system is getting safer. An organization that treats every failure as a chance to refine tests, context, permissions, and escalation develops a compounding advantage independent of which vendor is ahead this quarter.

This is familiar in manufacturing. A process capability is not established because one part came out right. It is established by observing variation over time, understanding the measurement system, controlling important inputs, and knowing what happens at the limits. A single good result is evidence of possibility, not reliability.

Knowledge work has often been allowed to operate below that standard because its defects are difficult to count.

Generative AI makes the defect question unavoidable. If a system drafts a hundred documents a day, somebody eventually asks what fraction are wrong. Then the argument begins over what “wrong” means. A typo? A false factual claim? A legal risk? A recommendation that is plausible but materially worse than an alternative? A customer interaction that satisfies policy and destroys trust?

Evaluation forces the organization to define quality.

That can be more valuable than the automation itself.

It also reveals where human judgment is inconsistent. People are not a clean gold standard. Two experts can disagree. Reviewers can be tired. Policies can be interpreted differently across offices. A model evaluated against noisy human labels may appear to fail when it has exposed an unresolved professional disagreement.

The frontier therefore has a human side.

Some work remains human not because humans are exceptionally reliable, but because institutions have decided that a person must own the decision. Judges disagree; courts still need judges. Physicians make different treatment choices; a patient still needs someone responsible for the care plan. Engineers can debate a design; somebody still signs the drawings.

Accountability can be a boundary even when capability is not.

That matters for careers. A person looking for durable value should not ask only what an AI can technically produce. Ask which decisions society insists on attaching to a responsible actor, which decisions customers want someone to explain, and which decisions generate obligations after the answer is delivered.

Those boundaries can change. Licenses can loosen. Insurance products can shift risk. Automated systems can acquire formal authority in narrow settings. The point is not that accountability is a permanent human monopoly.

The point is that capability and authority move on different clocks.

The jagged frontier is produced by both.

A model may be capable enough before the law, institution, customer, or insurer is ready to trust it. A model may be allowed to act in a domain where its performance is still uneven because the economic pressure is strong. A human may retain formal authority long after most of the underlying production has been automated.

Workers who understand only one of these clocks will misread the transition.

The technician who says “the model can’t do my job” may be focusing on the hardest five percent while ignoring that the routine ninety-five percent funds the position. The executive who says “the model passed the benchmark” may be focusing on capability while ignoring the cost of rare failure, the authority boundary, and the fact that the company lacks a way to detect drift.

The useful person can hold both facts at once.

The frontier is moving.

It is also uneven enough that moving fast requires better brakes.

But brakes are not a layer added after the engine is built.

They are part of the operating design.

That distinction matters as agents become long-running. A short model answer creates one opportunity for error. An agent that reads a mailbox, updates a spreadsheet, opens a ticket, calls another tool, and then acts on the result creates a chain. Each step can be individually plausible while the sequence drifts away from the original objective.

The risk is not only hallucination. It is compounding state.

A wrong assumption can be written into a file that becomes the next step's source of truth. A stale customer status can trigger the wrong workflow. A permission granted for convenience can turn a harmless drafting error into an external action. A model can recover from a mistake in its own reasoning and still leave behind an irreversible side effect.

This changes what competent supervision looks like.

The old picture of human review imagines a person reading the final answer. That works poorly for systems whose important mistakes occur in the path. The reviewer needs to know what the agent saw, which tools it used, what it changed, where confidence fell, and which actions could not be undone cheaply.

In other words, verification becomes temporal.

You are not only asking whether the output is correct. You are asking whether the process remained inside a safe envelope while the world changed around it.

That suggests a practical design principle for almost every agentic workflow: separate observation, proposal, commitment, and confirmation.

Let the system observe broadly. Let it propose cheaply. Make commitment narrow where consequence is high. Then confirm the state that actually resulted.

A purchasing agent can search vendors and prepare an order before money moves. A maintenance agent can identify likely failure modes before a machine is shut down. A customer-service agent can draft a credit before the ledger is changed. An engineering assistant can prepare a calculation before the design is released.

The point is not bureaucracy.

The point is to place friction at the transition from reversible intelligence to irreversible consequence.

Good operators learn to see those transitions.

They know that a draft becomes a record when it is filed. A recommendation becomes a commitment when somebody spends capital. A diagnostic hypothesis becomes an intervention when a breaker opens or a valve closes. An internal classification becomes a customer event when it changes price, access, or service.

AI makes the proposal side of those transitions astonishingly cheap.

That makes boundary design more valuable.

The organizations that learn this will become faster without becoming casual. They will automate the broad interior of a task and preserve deliberate gates around the few moments where mistakes become expensive. They will use logs not as compliance theater but as material for improving the system. They will test rollback before they need it. They will keep a path for a human to say, in effect, the map has stopped matching the territory.

The people who can design those boundaries will look less like prompt engineers and more like operators.

They may come from software, quality, safety, accounting, medicine, aviation, construction, security, manufacturing, or public administration. What they share is a habit of asking what happens after the action.

That habit is durable because frontier expansion increases its value.

When models are weak, humans perform most of the task and naturally encounter its consequences. When models become strong, humans can become separated from the work precisely when the work gets faster. The danger is not that nobody is intelligent enough to notice the failure. It is that the system no longer routes the right evidence to anyone who feels responsible for it.

The frontier is therefore organizational as much as technical.

A company can own the best model available and still build a brittle operation. Another can use an ordinary model inside excellent tests, permissions, records, and escalation and produce more trustworthy outcomes.

The second organization has turned uncertainty into architecture.

That is what frontier literacy finally means.

Not memorizing the tasks a model can do.

Building work so that capability can expand without requiring blind faith.

For a worker, this is also a way to avoid becoming the ceremonial approver at the end of a machine-run process. Stay close to the tests, the exceptions, the permissions, and the post-action evidence. Those are the places where the workflow still reveals what it does not know. If your role is reduced to clicking approve on an output you did not help evaluate, your responsibility can remain while your understanding disappears. Durable authority requires keeping the learning loop attached to the person who owns the consequence.