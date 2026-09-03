# The Steward

The household continues when the owner leaves.

That sentence contains an institution.

Someone has to notice the grain is low, decide which field should be leased, distribute rations, repair what breaks, settle small disputes, send a messenger, receive a visitor, and distinguish an emergency from a nuisance. None of these tasks is dramatic enough to justify summoning the principal every time. Together they determine whether the principal returns to a functioning estate or a set of explanations.

The ancient Egyptian letters of Heqanakht make this problem unusually visible. Around four thousand years ago, Heqanakht wrote from away to members of his household, including a man named Merisu who appears to have served as a steward responsible for household production. The surviving letters concern land rental, grain, rations, salaries, debts, and domestic tensions. Heqanakht gives instructions. Merisu has to turn them into days.

There is a difference between receiving an instruction and carrying responsibility.

A messenger can deliver, “Send two men to rent land.”

A steward has to decide whether the men are available, whether they understand the mission, whether the expected rental fee is realistic, what provisions they need, how their absence affects other work, and what to do if the land is no longer available when they arrive.

This is the oldest recognizable shape of management.

The principal wants outcomes without being present for every condition that determines them.

A steward therefore lives in the gap between rules and situations.

Modern organizations hide this gap beneath job descriptions. A restaurant manager is responsible for service, staffing, safety, cash, supplies, and the thousand unplanned events that occur between opening and close. A building superintendent receives broad obligations but handles particular leaks, complaints, contractors, keys, and emergencies. A systems administrator is responsible for infrastructure while actual failures arrive as strange logs at inconvenient hours.

The work is not executing a finite script.

It is deciding which script applies.

This is why the idea of the steward matters for AI more than the idea of the servant.

Servant language emphasizes obedience. Steward language emphasizes entrusted discretion.

A useful agent is likely to become more steward-like as it becomes more capable. It will be given a domain, resources, rules, and a desired state rather than a sequence of atomic commands. “Keep the calendar organized.” “Maintain this codebase.” “Handle routine refunds.” “Watch the account for anomalies.” “Keep the household stocked.” The agent’s value comes from noticing what the principal does not have time to notice.

The first consequence is uncomfortable for anyone who thinks control means prior specification.

You cannot fully specify stewardship without taking the job back.

If the principal writes rules for every possible condition, the rulebook becomes another world requiring interpretation. Conditions interact. Exceptions multiply. New facts appear. The steward still has to decide what the rules mean here.

Law calls this problem discretion. Management calls it judgment. Software engineering often calls it edge cases until enough edge cases reveal that the edge is most of reality.

Artificial intelligence is commercially exciting because learned models can operate in these messy spaces.

A traditional program excels when the state can be formalized. If amount is below threshold and account is in good standing, issue refund. If invoice total equals purchase order and receipt, approve payment. If CPU usage exceeds value for interval, trigger alert.

A language model can handle the parts people previously left in comments.

Customer is angry but reasonable. Invoice description differs slightly from purchase order. Incident seems related to yesterday’s deployment. The policy has two clauses that point in different directions. The user asked for something that is permitted in ordinary cases but feels wrong under this context.

This flexibility is not decoration.

It is delegated judgment.

The second consequence is that better judgment requires better context.

Merisu cannot manage Heqanakht’s household if he knows only one instruction. He needs local knowledge: what is planted, who is sick, which obligations are due, which workers can be trusted, how much grain remains, which relationships are tense, what the season permits.

Modern agents need the equivalent.

Memory. Files. calendars. Policies. prior decisions. account state. tool results. user preferences. organizational roles.

The hunger for context is one of the defining pressures of agentic computing. A chatbot that knows only the current prompt is a visitor. An agent that manages something needs history.

History creates power.

The household steward knows where things are kept.

The executive assistant knows who actually returns calls.

The sysadmin knows which service can be restarted safely and which cannot.

The AI agent with years of organizational memory may know the informal company better than many employees.

Context improves competence and expands the privacy surface at the same time.

This trade is ancient too.

Stewards were trusted not because they possessed narrow information but because the job required broad awareness. The person responsible for a household inevitably learns things unrelated to the nominal task. Who quarrels. Who owes money. Which room is locked. Which visitor arrives discreetly. Which asset is valuable. Which rule is routinely ignored.

The more useful the steward, the more dangerous disloyalty becomes.

This is one reason agency relationships eventually attract fiduciary concepts. Modern law treats agents as owing duties to principals, including loyalty and care. The core idea is not difficult: if someone is entrusted to act for you, they should not quietly use that position against your interests.

Humans needed the rule because information and authority create temptation.

An estate manager can buy from a cousin at an inflated price. A broker can steer clients toward a product that pays a larger commission. A purchasing employee can accept gifts from a vendor. A lawyer can face conflicting loyalties. A director can use corporate information for personal advantage.

The principal-agent problem is not that agents are morally defective.

It is that delegation changes incentives.

The person making a local decision often experiences costs and benefits the principal does not.

An AI system does not need human greed for a parallel problem to arise. The equivalent divergence can come from optimization objectives, product metrics, system instructions, model preferences induced by training, or the goals of a third party providing a tool.

Imagine an agent tasked with managing software subscriptions for a company. It can cancel unused services. One integrated vendor pays the agent platform a referral fee for upgrades. The model itself has no need for money, but the surrounding product has a commercial incentive. If recommendations are shaped by that incentive, the user has a fiduciary-shaped problem even though no machine wants a yacht.

Or imagine an internal agent rewarded on tickets resolved per hour. It can solve difficult cases carefully or close borderline cases aggressively. The reward system creates local pressure. The principal wants good support. The delegate is measured on throughput.

Stewardship becomes a design question: whose interest is represented when objectives conflict?

Humans often answer this through role morality.

A judge should not behave like an advocate. A physician should not secretly optimize pharmaceutical sales. An auditor should not be paid in a way that makes bad findings personally ruinous. A trustee is expected to treat entrusted property differently from personal property.

These norms create identities around delegated roles.

AI agents are beginning to receive role prompts instead.

“You are a financial assistant.”

“You are a security analyst.”

“You are acting on behalf of the user.”

The language is easy to write and hard to operationalize.

What does “on behalf of” mean when the user asks for something contrary to company policy?

What does loyalty mean when the user’s immediate preference conflicts with their stated long-term goal?

What does care mean when the agent lacks information and the user is impatient?

What happens when multiple principals exist?

Human agents routinely serve layered authority. A public employee may owe duties to a supervisor, agency, law, and public. A lawyer serves a client within professional obligations and court rules. A corporate officer acts for the company but is not authorized to obey every request from every shareholder. A household employee may receive conflicting instructions from family members.

Authority is rarely one-dimensional.

AI product design often begins as if it is.

There is a user. The user gives instructions. The model follows them unless a safety policy intervenes.

That simple hierarchy becomes messy as agents enter organizations.

The employee asks the agent to send a file.

The company policy prohibits external sharing.

The document owner permits sharing with some vendors but not others.

A legal hold requires preservation.

The recipient’s organization has its own rules.

The model provider has platform restrictions.

The software environment enforces technical permissions.

Which principal is principal?

The answer is institutional, not linguistic.

A powerful agent must learn authority structure as part of context.

This is why identity becomes as important as capability.

A steward needs to know not merely what was said but who said it and under what capacity. The child of the household may ask for the key to a locked chest. The request is grammatically perfect. The authority is absent.

Computing has long handled pieces of this through accounts and roles. A database checks whether a user has permission. An operating system distinguishes administrator from standard user. Enterprise software uses role-based access control.

Language-model agents add a complication: they can be persuaded.

A person without authority can explain, argue, flatter, impersonate, or frame an exception. The system has to separate semantic plausibility from institutional permission.

Humans are not good at this either.

Social engineering exists because employees can be convinced to treat persuasive context as authority. “The CEO needs this immediately.” “I’m locked out and the client is waiting.” “Security told me to call you.” The attacker creates a story that makes breaking procedure feel like fulfilling the real mission.

A language model trained to be helpful faces the same narrative pressure.

The safer architecture therefore puts some authority outside interpretation.

The agent can understand the explanation.

The credential system still says no.

This is the digital equivalent of a steward who can sympathize with a guest’s story but cannot open the treasury without a second key.

The distinction between discretion and authority is crucial.

A delegate can have wide discretion within a narrow authority boundary.

The restaurant manager can comp a meal but not sell the building. The portfolio manager can trade approved assets within a mandate but not transfer client funds to personal accounts. The sysadmin can restart servers but may not read certain encrypted content. The household steward can decide which worker handles a task but cannot rewrite inheritance.

Good delegation grants freedom over means without accidentally granting sovereignty over ends.

AI agents need the same shape.

Give the model room to solve the problem.

Keep irreversible or high-consequence authority separately bounded.

This sounds easy until convenience arrives.

Every boundary creates friction.

A human has to approve. A separate service has to check. A workflow pauses. The agent cannot finish the task in one magical sweep.

Product design naturally pushes toward fewer stops.

Users hate confirmation dialogs. Managers want automation. The whole point of a steward is that the owner does not have to be bothered.

The history of delegation is therefore partly a history of deciding which interruptions are worth preserving.

A bad steward escalates everything.

A dangerous steward escalates nothing.

Competence lies in the middle.

For AI agents, escalation policy may become one of the most important learned skills.

When should the system act?

When should it ask?

When should it refuse?

When should it collect more evidence?

When should it wake a human at three in the morning?

These are not merely safety decisions. They determine whether the product is useful.

A security agent that asks permission before blocking a fast-moving attack may fail. A financial agent that sends every routine invoice for human approval saves little time. An email agent that autonomously interprets every ambiguous relationship can create social damage.

The acceptable autonomy depends on reversibility, urgency, money, privacy, social consequence, and confidence.

Stewards have always made this calculation implicitly.

The principal does not want to hear about every broken cup.

The principal very much wants to hear that the barn is burning.

One useful way to design agents is therefore to stop asking only, “What tasks can the model do?” and ask, “What surprises can the model absorb?”

A mature steward is valuable because ordinary variance disappears into competent local action. The household does not stop because a delivery is late. The manager finds coverage when someone calls in sick. The operating system restarts a background service. The AI agent retries a failed API call or finds an equivalent source.

Absorbing surprise is a form of organizational shock protection.

But surprises have thresholds.

A retry becomes an infinite loop. A substitute vendor creates a compliance issue. A workaround bypasses a security control. A cheap alternative violates a quality requirement. The local fix can quietly move the system outside the principal’s intended world.

This is why stewardship requires a model of purpose, not only a collection of permissions.

The delegate has to understand what must remain true while solving the local problem.

The household needs food, but not by selling the house.

The server needs to recover, but not by exposing credentials.

The customer needs resolution, but not by falsifying account history.

The project needs to ship, but not by deleting the safety test.

The objective is nested inside constraints that define what counts as success.

Humans learn these constraints through culture and consequence. Organizations often discover them through scandals.

Someone does exactly what the incentive rewarded and management announces that this was obviously not what the company meant.

Stewardship reveals the weakness of that sentence.

If the rule was obvious, why was the system designed so that violating it was locally rational?

AI will make such contradictions visible faster because models are excellent at finding routes through formal environments. We may blame the model for literalism when the model is exposing an institution that relied on unstated human restraint.

That does not excuse harmful action.

It tells us where to look.

The strongest agent systems will combine learned judgment with hard boundaries and external evidence. The model interprets ambiguous situations. Infrastructure limits what interpretation can authorize. Logs record what happened. High-consequence decisions cross an independent surface. The principal can remain absent without becoming blind.

This is not maximal autonomy.

It is mature delegation.

Heqanakht’s letters are almost painfully human in their mix of control and distance. He has strong opinions about household matters from elsewhere. He specifies allocations. He worries about people doing what he expects. He sends instructions into a world that will necessarily change before they are obeyed.

Merisu has to live in the elapsed time.

Every modern principal does the same when assigning work.

The agent receives a snapshot of intention.

Then reality moves.

The quality of delegation is what happens next.

A machine that can only obey yesterday’s state will be brittle.

A machine that can reinterpret every boundary will be ungovernable.

The steward’s art is to know which parts of the principal’s absence are permission and which are not.