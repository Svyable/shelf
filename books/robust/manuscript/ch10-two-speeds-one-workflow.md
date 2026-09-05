# Two Speeds, One Workflow

A machine can draft a contract in seconds.

The company can still take a week to decide what it is willing to promise.

This is not necessarily dysfunction.

Some parts of work should become fast.

Some should remain slow because slowness is where consequence is examined.

The management problem of AI is learning not to confuse the two.

Organizations tend to respond to a new speed by trying to synchronize everything around it. If the analysis can be produced instantly, why does approval take two days? If the code can be written before lunch, why is deployment waiting for Friday? If the assistant can prepare personalized outreach for ten thousand customers, why are we still sending only two hundred messages?

Sometimes these questions reveal real waste.

Sometimes they reveal a safety barrier nobody bothered to name.

A robust workflow has **two speeds**.

One speed belongs to exploration, generation, drafting, simulation, searching, testing, and reversible execution.

The other belongs to commitment.

The first should often become very fast.

The second should become exactly as fast as the consequence allows.

This is not a human-versus-machine distinction. Machines can operate at both speeds. Humans can operate at both speeds. The distinction is between **work that creates options** and **work that consumes them**.

Drafting a message creates an option. Sending it consumes some optionality. Generating code creates an option. Merging and deploying it consumes more. Building a scenario creates an option.

Signing the contract commits. Recommending a purchase creates an option. Transferring money commits.

The robust team designs the workflow so that cheap intelligence expands the option-creating side without accidentally dragging irreversible actions into the same tempo.

This sounds like an approval process.

It is broader.

Approvals are one way to create a speed boundary. Other ways include sandboxes, staging environments, spending limits, feature flags, draft states, queues, rate limits, delayed execution, simulations, reversible transactions, and scopes that limit where an agent can act.

The best boundary is often architectural rather than procedural.

If an AI coding agent can work freely in a branch but cannot merge to production without required checks, the team gets machine-speed iteration and deliberate commitment without asking a person to authorize every file edit.

If a marketing agent can generate and test copy on a small internal audience but cannot broadcast to the entire customer list, exploration remains cheap.

If a procurement agent can reorder known supplies within historical quantity ranges but must escalate new vendors and large commitments, routine execution stays fast while novel consequence slows down.

The point is to place friction where it protects something.

Organizations are often bad at this because friction accumulates historically.

A policy is added after an incident.

A form is required because one regulator asked once.

A manager wants visibility, so another approval appears.

A software limitation forces a handoff that later becomes tradition.

Over time, all friction looks equally legitimate.

AI exposes the absurdity by making some stages dramatically faster.

The temptation is to remove all the friction.

The better move is to classify it.

There are at least four kinds.

**Protective friction** prevents costly or irreversible error.

**Informational friction** forces a useful fact to become visible before action.

**Coordination friction** exists because multiple people or systems genuinely have to align.

**Historical friction** remains because nobody has deleted it yet.

AI should destroy the fourth category aggressively.

It can reduce the third by improving coordination and context transfer.

It can automate much of the second if the information can be gathered and validated reliably.

It should treat the first with respect.

The difficulty is telling them apart.

Consider a company that requires a director to approve every customer refund above five hundred dollars.

Protective friction?

Maybe.

Perhaps refunds above five hundred are rare and vulnerable to abuse. The approval protects money and ensures unusual cases receive judgment.

Or perhaps the threshold was set ten years ago when the average transaction was one hundred dollars and has never been updated. Today a third of legitimate refunds cross it, directors click approve reflexively, and customers wait.

The process contains friction without protection.

A robust team asks what failure the approval is supposed to prevent and whether a different control now prevents it better.

Identity verification. Historical purchase checks. Fraud scoring. Amount limits by role. Sampling and retrospective audit.

Exception routing.

If the protective function can be preserved without the human wait, remove the wait.

This is how AI should make organizations faster: not by chanting speed but by **moving the control to the right layer**.

The two-speed idea also helps with planning.

AI makes it possible to produce strategy artifacts at a ridiculous rate. Market maps, scenarios, competitor analyses, pricing models, road maps, project plans, risk registers. A leadership team can walk into a meeting with more apparent preparation than a consulting engagement once produced in a month.

That can make strategy worse.

The artifact speed creates pressure for decision speed.

Everyone has the deck. The options are clear. The recommendation is concise. Why not decide?

Because information generation and institutional commitment are different activities.

A decision may require stakeholders to live with the tradeoff, not merely understand it. It may require negotiation. It may require legal review. It may require a customer conversation. It may require time for a weak assumption to reveal itself.

Not every delay is information latency.

Some delays are the organization becoming able to carry the decision.

AI cannot eliminate this without changing the social system.

The robust leader learns to distinguish “we are waiting because nobody has done the analysis” from “we are waiting because commitment has consequences the analysis cannot dissolve.”

The second may still be too slow.

But it deserves a different remedy.

This is where many automation programs fail culturally. They optimize the machine-visible portion of work and discover that the human organization does not speed up in proportion.

The team generates code faster, but product requirements remain unstable.

The sales team drafts proposals faster, but pricing authority remains unclear.

The support agent resolves tickets faster, but recurring product defects continue creating them.

The research team summarizes papers faster, but leaders still cannot agree which question matters.

The bottleneck moves.

Robust organizations expect this.

They do not assume AI produces generalized productivity by itself. They watch where the constraint goes next.

This is classic systems thinking: improving one component can expose the next limiting component. If you widen one lane of a congested road, the queue may simply move downstream. If you automate drafting, review becomes the bottleneck. Automate review and authority may become the bottleneck. Clarify authority and deployment capacity may become the bottleneck.

The new constraint is not evidence that the improvement failed.

It is evidence that the system changed.

A sturdy workflow therefore measures end-to-end time and outcome, not only the stage that received AI.

How long from customer request to resolved customer problem?

How long from idea to safely deployed feature?

How long from detected issue to corrected system?

How long from evidence to decision?

The model’s speed matters only through the whole path.

There is a second benefit to two-speed design: it improves learning.

Fast reversible experimentation creates more evidence before slow commitment.

A team can test three model providers before signing a long contract.

Prototype two agent boundaries before granting production credentials.

Run a new support workflow on one percent of traffic.

Generate several pricing strategies and simulate them against historical behavior.

Draft the policy, test it against edge cases, revise it, then adopt.

The more reversible the early steps, the more uncertainty the team can convert into information cheaply.

This is a better response to an unpredictable AI future than waiting for certainty.

Instead of one large bet, make many small probes.

Then commit where reality begins answering.

The architecture of software already offers useful language for this.

Development environment. Staging. Canary release. Feature flag. Rollback.

These mechanisms let code move quickly without exposing every user to every experiment at once.

AI adoption needs equivalents outside software.

A **draft lane** where generated work cannot escape without a commit.

A **sandbox budget** where agents can spend small amounts and learn.

A **shadow mode** where an AI system makes decisions beside the existing process but does not act, allowing comparison.

A **canary population** where a new workflow serves a small, representative group before expansion.

A **reversible policy** with a scheduled review date rather than pretending the first rule is permanent.

A **kill path** that returns the process to a known simpler state.

A **safe-stop state** for cases the system cannot handle with acceptable confidence.

These are organizational feature flags.

They turn adoption into a sequence rather than a leap.

The sequence matters most when enthusiasm is high.

The best AI demos create a peculiar sense of inevitability. Once people see the system perform the task, continuing the old process feels irrational. The future has appeared in the room. Delay feels cowardly.

But a demonstration shows capability under selected conditions.

A rollout tests the surrounding system. Data quality. Permissions. Exception handling. Human behavior.

Customer response. Cost at volume. Monitoring. Recovery.

The robust leader can be impressed and still ask for a canary.

This is not skepticism.

It is how you get to full deployment faster without making the organization afraid of the next experiment.

One catastrophic rollout teaches an institution to fear speed.

Ten reversible experiments teach it to use speed.

That cultural difference compounds.

Teams that know they can roll back will try more.

Teams that know incidents will produce learning rather than blame will surface more.

Teams that know consequential commitments have clear gates can allow more freedom before the gate.

The system becomes faster because the boundaries are trusted.

This is the paradox of robust control: good constraints create freedom.

A playground fence lets children run because the edge is known.

A sandbox lets code execute because production is protected.

A spending limit lets an agent purchase autonomously because the maximum loss is bounded.

A versioned dataset lets analysts experiment because the source can be restored.

A rollback lets a team release because the change is not a cliff.

The worst controls do the opposite. They are vague, omnipresent, and discretionary. Nobody knows what is safe, so everything requires permission. AI then becomes another layer of ceremony rather than a source of leverage.

The robust workflow is explicit about tempo. Move fast here. Slow down there. This action is reversible. That one commits.

This model can explore. That tool call requires authority. This output can be wrong and cheap. That output enters the system of record.

These distinctions become a shared language for delegation.

Eventually, some slow lanes will become fast.

A control improves. A model becomes more reliable. A regulator clarifies a rule. A reversible mechanism is invented. The cost of error falls. The approval can disappear.

Good.

The architecture should allow the boundary to move.

That is what makes it robust rather than bureaucratic.

The purpose of slowness is not slowness.

The purpose is to preserve the moment when someone or something still has a meaningful choice.

AI can make almost every step before that moment faster.

Let it.

Then spend deliberation where the future becomes harder to undo.
