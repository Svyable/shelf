# Software Learns to Act

Software has always acted.

The bank transfer moves.

The traffic light changes.

The warehouse order appears.

The autopilot adjusts the aircraft.

The trading system enters the market.

The industrial controller opens a valve.

The difference is not that computers have suddenly acquired consequences.

The difference is that software can increasingly decide more of the path between a loosely stated goal and the action that creates the consequence.

That path used to belong mainly to people and to carefully specified programs.

Now it is becoming a design space.

A person says what she wants.

The system interprets the request.

It gathers information.

It chooses a tool.

It takes a step.

It sees what happened.

It adjusts.

It continues.

This is the basic loop of agentic software.

There is nothing mystical about the loop.

Its power comes from how much ordinary work is already represented through software.

An agent does not need a robot body to alter the world when the world's institutions are full of digital control surfaces.

Calendars.

Email.

Cloud systems.

Customer databases.

Payment rails.

Procurement portals.

Code repositories.

Advertising systems.

Travel accounts.

Enterprise software.

Government forms.

Marketplaces.

Scheduling systems.

If a machine can operate the software through which institutions operate, then software itself becomes a kind of body.

Not a complete body.

A body made of permissions.

This is why the most consequential part of an AI agent may be the least glamorous part of the architecture.

Credentials.

What can it access?

What can it change?

How much can it spend?

Which systems recognize its authority?

Where does the action stop until a person approves?

A model can be extremely capable and practically harmless if it has no permission to affect anything.

A less capable model can create trouble if the institution gives it broad authority.

This should change how we think about machine intelligence.

Capability is not power.

Capability multiplied by permission is closer.

Human institutions already understand this principle.

A new employee may be intelligent, ambitious, and competent.

The company still does not hand over the treasury password on the first day.

It gives the person an account.

A role.

A manager.

A budget.

An approval limit.

Access to some systems and not others.

A record of actions.

The worker's agency is real, but institutionally bounded.

The company does not need to know exactly what the employee will do every minute.

It defines a zone within which judgment can operate.

Agentic software requires something similar.

This is a useful comparison because the system's value comes partly from not having every intermediate action written in advance.

If every action were prewritten, the system would be ordinary automation.

An agent is useful when it can select among possible next steps based on context.

That means the institution cannot control it only by specifying the exact path.

It has to control the space of allowed paths.

Permissions become the walls of the room.

This is an important industrial change because software historically made authority implicit in code.

A program could do what programmers had enabled it to do through fixed functions.

Agentic systems make authority explicit as a governance problem.

The model may know how to perform ten thousand possible actions.

The institution has to decide which subset it is authorized to perform here.

That is why the security problem arrives so quickly.

In early 2026, NIST's Center for AI Standards and Innovation asked for input on securing AI agent systems because they can plan and take autonomous actions that affect real-world systems or environments. The concern was not science fiction.

It was the coupling of model outputs to software functionality.

The coupling is the whole story.

A chatbot can produce a bad instruction.

An agent can execute one.

This converts interpretation errors into operational errors.

It also creates new attack surfaces.

Traditional software security spends enormous effort distinguishing trusted code from untrusted input. A program receives data and is supposed to treat the data as data.

Language-model systems complicate this because the same channel can contain both information and instructions.

A person may tell an agent, “Read these emails and identify which customer needs urgent help.”

One of the emails may contain text that attempts to manipulate the system.

To a human, the hierarchy is obvious.

The boss gave the assignment.

The customer email is evidence inside the assignment.

The customer does not acquire the authority to change the employee's job merely by writing a sentence.

A machine operating through natural language needs an enforceable version of that social hierarchy.

Which instruction outranks which?

Which source is merely content?

Which tool output can be trusted?

Which external page is trying to influence behavior?

This is why agent security cannot be solved only by making the model “smarter.”

A smarter employee still needs access controls.

A smarter operating system still needs privilege boundaries.

A smarter market participant still needs rules.

Intelligence increases the number of actions a system can conceive.

Governance must decide which actions it can take.

This creates a design principle that will likely shape agentic computing for years: the highest-value autonomy will often be bounded autonomy.

The system can choose freely inside a small, reversible space.

A support agent can issue a refund below a threshold.

A coding agent can modify files on a branch but not deploy directly to production.

A procurement agent can gather bids but not sign a long-term contract.

A travel agent can rebook within a policy envelope but cannot spend without limit.

A research agent can run analyses in an isolated environment but cannot publish externally without review.

The machine gets discretion.

The institution keeps the boundary.

This resembles the evolution of industrial automation.

Factories did not become safe by building machines that were incapable of force.

They became safer by putting force inside engineered constraints.

Guards.

Interlocks.

Emergency stops.

Zones.

Procedures.

Standards.

The goal was not to make the machine weak.

It was to make the available power legible and containable.

Agentic software will need equivalent ideas.

A spending ceiling is an interlock.

A read-only credential is a guard.

A sandbox is a safety zone.

A human confirmation step is a gate.

A log is the black box.

An automatic rollback is a form of reversibility engineering.

These analogies are useful because they remind us that autonomy is not the opposite of safety.

Unbounded autonomy is one design choice.

Industrial systems usually prefer constrained power.

The constraint can also improve performance.

A machine trying to operate in an unlimited world faces endless possibilities.

Give it a narrow toolset, a clear goal, local context, and measurable success criteria, and the task becomes easier.

This is why some of the strongest agentic performance appears first in software engineering.

The environment is highly instrumented.

Files can be read.

Tests can be run.

Changes can be compared.

Errors leave traces.

The world can be copied into a sandbox.

A failed attempt can often be retried.

Software is a forgiving place for software to learn agency.

METR's task-completion time-horizon research is useful here precisely because it avoids one seductive mistake.

The research measures the duration of tasks—estimated by human-expert completion time—at which frontier agents have a given probability of succeeding. The latest public measurements show substantial improvement on suites dominated by software engineering, machine learning, and cybersecurity.

But METR explicitly warns that a longer time horizon does not mean an AI can autonomously perform that many hours of any human professional's job.

The tasks are specific.

The domains are narrow.

The agents have limited context compared with employees embedded in an organization.

Measurements above certain task lengths are themselves less reliable because the evaluation suite contains fewer long tasks.

This is what evidence discipline looks like.

Agentic capability can be improving rapidly without the conclusion that autonomous software has already become a universal employee.

The gap between the two claims is where most of the industrial work remains.

A company is not a benchmark.

It contains ambiguous objectives, changing priorities, political constraints, private information, personalities, customers, laws, forgotten dependencies, and things nobody wrote down because everybody who mattered already knew them.

Agents enter this world with the same problem new employees have and fewer of the social tools humans use to solve it.

What does “important” mean here?

Which exception is normal?

When is the policy deliberately ignored?

Who actually has authority even though the organization chart says otherwise?

What does the customer mean rather than literally say?

When should the task be abandoned?

When should the system ask for help?

These are not edge cases.

They are the texture of institutions.

This is why memory becomes central.

A chatbot conversation can be stateless and still useful.

An agent performing work over time needs some durable representation of what it has done, what it learned, which instructions apply, what failed, what remains unfinished, and what changed in the environment.

Memory turns a sequence of calls into a continuing process.

It also creates risk.

What should the system remember?

For how long?

Who can inspect the memory?

Can a malicious input poison it?

Can outdated information continue to influence future actions?

Can one user's context leak into another's?

A human worker's memory is private, imperfect, and biologically bounded.

A machine's memory can be copied, searched, audited, altered, merged, or accidentally exposed.

Persistence creates new capability and new governance at the same time.

This theme repeats across the Fourth Industrial Revolution.

Every capability arrives with a control problem.

More intelligence raises the question of verification.

More agency raises the question of permission.

More memory raises the question of privacy and state.

More speed raises the question of supervision.

The industrial significance comes from the interaction.

A human manager can supervise five people differently from fifty.

What happens when one manager supervises five hundred machine processes, each acting at software speed?

The human role cannot remain transaction-level approval.

If every action requires a person to click yes, the machine has not truly absorbed the operational workload.

But if the person no longer reviews each action, “human oversight” changes meaning.

The human supervises the system rather than the event.

This is a deep shift.

A supervisor of people often learns what the organization is doing through direct contact with cases.

A supervisor of agents may receive dashboards, samples, exceptions, and summaries generated by the same computational environment producing the work.

The manager becomes dependent on instrumentation.

The span of control can expand beyond the span of comprehension.

This is not necessarily bad.

Modern civilization already depends on systems no one person understands at transaction level.

A power-grid operator does not inspect every electron.

A bank executive does not read every payment.

An airline executive does not personally inspect every maintenance action.

Institutions create layers of controls, audits, professional duties, monitoring, and escalation.

Agentic software will push more cognitive work into this systems-management model.

The question becomes whether organizations can build controls quickly enough to match the delegated capability.

If they cannot, two failure modes are likely.

The first is paralysis.

The machine can do more than the institution trusts it to do, so the human approval step remains everywhere. The organization buys autonomy and uses assistance.

The second is theater.

The organization claims a human remains in control, but the volume of machine decisions becomes too large for meaningful review. The person rubber-stamps because there is no practical alternative.

Both are unstable.

The first wastes capability.

The second hides delegation.

A mature agentic institution will have to decide explicitly where autonomy belongs.

That decision will depend on consequence and reversibility.

A low-cost reversible action can tolerate more machine discretion.

A high-cost irreversible action should usually demand more evidence, narrower authority, or human judgment.

This principle sounds simple until markets begin rewarding speed.

One company lets agents act immediately.

Another requires review.

The faster company wins customers.

The cautious company faces pressure to loosen the controls.

This is how autonomy can become competitive policy rather than purely technical policy.

The same pattern appeared in finance, logistics, advertising, and digital platforms long before modern AI. Automation compresses time, and compressed time punishes slower decision systems.

Agentic AI extends that pressure into a broader range of cognition.

A machine can read the market, propose a response, and execute it before the competitor's meeting begins.

A software team can test and revise continuously while another waits for scheduled review.

A customer-service system can resolve the case while a human queue is still sorting it.

Speed becomes a source of organizational selection.

Then regulation, liability, and social expectations push back.

Some decisions should be slow.

Some require notice.

Some require appeal.

Some require a person to explain the reason.

Some should not be optimized for throughput at all.

This is why the rise of acting software is not merely a productivity story.

It is a constitutional story for institutions.

An institution is partly a set of rules about who may decide what.

Agentic software introduces a new actor into that map.

Not necessarily a legal person.

Not necessarily a conscious being.

An actor in the narrow causal sense: a system to which permission has been delegated.

Once that delegation becomes economically important, organizations will have to specify what previously lived in vague human practice.

Who may speak for the company?

Who may commit resources?

Who may alter the product?

Who may change a customer's state?

Who may access confidential information?

Who may make a promise?

Who may stop a process?

Who may refuse an instruction?

The software forces authority into code.

That can make institutions clearer.

It can also freeze bad policy into machinery.

A human employee can sometimes recognize that a rule should not be applied literally.

A machine system may scale the rule precisely enough to reveal how unjust the rule always was.

This is another recurring feature of automation.

It removes the cushioning ambiguity through which human organizations often survive their own policies.

Sometimes that ambiguity is corruption.

Sometimes it is mercy.

Machine-speed institutions will have to learn the difference.

This chapter's claim can fail.

If agents remain unreliable on sustained tasks, if security costs grow faster than benefits, if organizations keep humans at nearly every meaningful action boundary, or if the economics of checking erase the savings from autonomy, then agentic software may remain an assistant architecture rather than a new institutional layer.

The evidence so far does not justify pretending the problem is solved.

It justifies taking the direction seriously.

The software no longer has to wait for every next click.

That is enough to move the boundary of delegation.

And delegation is the bridge between intelligence on a screen and intelligence operating in the world.

Some of that world is already digital.

The rest is made of matter.

To reach it directly, intelligence needs sensors, actuators, machines, and bodies.

That is the next boundary.
