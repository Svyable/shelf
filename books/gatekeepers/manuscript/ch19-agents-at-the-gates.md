# Agents at the Gates

The gatekeeper asks, “Who are you?”

For most of history, the answer came from a person.

A face.

A signature.

A passport.

A password.

A badge.

A voice on the phone.

A customer standing at a counter.

Now another answer is becoming ordinary.

**I am acting for someone else.**

The speaker may be software.

This changes gatekeeping more than it first appears.

An agent does not merely automate a task.

It carries delegated intention into other systems.

It asks for access.

It reads records.

It compares offers.

It fills forms.

It calls tools.

It negotiates schedules.

It submits requests.

It buys things.

It may eventually hire services, move money, book travel, dispute charges, renew subscriptions, manage infrastructure, and coordinate with other agents.

Every one of those actions crosses a gate.

The number of gate interactions is about to explode.

Humans tolerate friction partly because humans are slow.

A form that takes five minutes is annoying.

An agent can encounter ten thousand forms in the time it takes a human to make coffee.

A human might request one permission and then work for an hour.

An agent may request a hundred narrowly scoped permissions in a single workflow.

A human may speak to three institutions in a day.

A software delegate may negotiate continuously with thousands of services.

The gatekeeping system built for occasional human interaction is being asked to become machine infrastructure.

That means permission must become more explicit.

Today, authority is often fuzzy because people supply context.

An executive tells an assistant, “Book something reasonable.”

The assistant knows what reasonable means from years of working together.

A manager says, “Handle the vendor renewal.”

The employee knows which concessions are acceptable, which lawyer to call, and when to escalate.

A parent says, “Pick up groceries for dinner.”

A teenager knows not to buy twelve cases of champagne.

Human delegation is filled with unstated boundaries.

Software does not inherit those boundaries automatically.

It must infer them or be given them.

Inference is useful.

Inference is also where delegated authority can become accidental authority.

The central problem of agents at gates is therefore not intelligence.

It is **mandate**.

What exactly is the agent allowed to do?

For whom?

For how long?

With which resources?

Under which constraints?

What must it ask again before doing?

What happens when circumstances change?

Who is accountable after the action is taken?

This is permission engineering.

The building blocks already exist.

OAuth was created for delegated access long before modern language-model agents. Its central insight is that a user should not need to hand every application the master password to every service. Instead, a client can receive an access token with defined authority.

The architecture separates roles.

A resource owner controls access to a resource.

A client requests access on the owner's behalf.

An authorization server issues credentials.

A resource server enforces them.

Modern agent systems increasingly stand inside this pattern.

The Model Context Protocol's 2026 authorization specification explicitly describes MCP clients making restricted requests on behalf of resource owners and builds its HTTP authorization flow on OAuth-family standards. The protocol does not magically solve agency. It shows that the old delegation machinery is becoming part of the new agent infrastructure.

This matters because the safest agent is not one with a user's password.

It is one with the smallest useful mandate.

Chapter 13 called this least privilege.

Agents make least privilege dynamic.

A static application usually knows its role in advance.

A payroll system needs payroll permissions.

A photo editor needs photo permissions.

An agent's task can change every five minutes.

Book a restaurant.

Read a calendar.

Negotiate a meeting time.

Order a replacement cable.

Update a document.

Pay an invoice.

Open a pull request.

Cancel a subscription.

These actions require different authority.

Giving the agent the union of all possible permissions creates a giant blast radius.

Making the human approve every individual action destroys much of the value of delegation.

The design challenge is **minimum viable authority**.

Enough permission to complete the task.

Not enough permission to improvise catastrophically.

This suggests a permission object richer than a binary yes.

An agent mandate can contain:

- **principal** — who the agent represents;
- **agent identity** — which agent or runtime is acting;
- **objective** — what outcome the agent is authorized to pursue;
- **scope** — which resources and actions are permitted;
- **budget** — how much money, compute, time, or other scarce resource may be spent;
- **counterparty constraints** — who the agent may transact with;
- **time window** — when the authority starts and expires;
- **frequency** — how often it may act;
- **approval thresholds** — when it must return to the principal;
- **prohibitions** — actions that remain forbidden even if useful to the goal;
- **evidence requirements** — what the agent must record before or after acting;
- **revocation channel** — how authority can be withdrawn;
- **audit identity** — how later observers distinguish the agent's action from the human's direct action.

This is not excessive formality.

It is the equivalent of telling a human assistant more than “do whatever.”

Agents expose how much human delegation has always depended on tacit social understanding.

The financial system is becoming one of the first places where this mandate problem must be made concrete.

By 2026, major payment networks are building infrastructure specifically for agent-initiated commerce.

Visa describes agentic-commerce systems in terms of tokenized payment credentials bound to agents, user authentication, and controls designed to align an agent's payment actions with the user's original authenticated instructions. Mastercard is building its own agent-payment infrastructure around trusted identities, secure credentials, and controls for AI-initiated transactions.

India is moving even faster at the national-payment layer. In September 2026, Reuters reported that India was preparing an agentic-payment framework for UPI that would allow AI agents to make some small payments without separate human approval for every transaction, using mechanisms such as spending limits, delegated funds, identity checks, and liability rules.

The important part is not the brand names.

It is the pattern.

Payment authority is being decomposed.

The card number is no longer enough.

The system needs to know:

Who authorized the agent?

Which agent is this?

What is it buying?

How much may it spend?

Does the purchase fit the instruction?

Has the authority expired?

Should this transaction require fresh consent?

Can the user dispute an agent's action differently from a stolen credential?

This is gatekeeping becoming machine-native.

A useful concept here is the **delegation envelope**.

The delegation envelope is the boundary around what an agent may legitimately infer from a user's instruction.

Suppose the user says:

“Keep the office kitchen stocked with coffee for under $300 a month.”

The objective seems simple.

The delegation envelope is not.

May the agent sign a twelve-month supply contract?

May it switch brands?

May it buy from a new vendor?

May it pay a delivery fee?

May it spend the full $300 on the first day of the month?

May it purchase coffee equipment if beans are unavailable?

May it share the office address with a marketplace?

May it accept a subscription with automatic renewal?

May it use the user's personal credit card if the corporate card fails?

A capable model can invent answers to these questions.

Capability is not authorization.

The agent should distinguish **what would advance the goal** from **what it has authority to do**.

This distinction is central to safe delegation.

Humans also exceed mandates.

The difference is speed and scale.

A human assistant can make one unauthorized purchase.

An agent can repeat the same mistaken inference across every office in a global company before anyone notices.

Automation turns ambiguity into multiplicity.

This is why agent gates need **rate-shaped authority**.

Permission should depend not only on action type but on velocity.

A user may happily authorize an agent to send five routine calendar invitations.

Five thousand invitations in a minute is a different action even if the API permission is identical.

A finance agent may be allowed to pay invoices under $500.

One hundred $499 invoices to the same new counterparty should not pass merely because every individual transaction fits the threshold.

A deployment agent may restart one unhealthy service.

Restarting every service in a region is not the same authorization repeated.

The pattern can change the meaning of the action.

Traditional permissions are often stateless.

“May call endpoint X.”

Agent permissions need context.

“May call endpoint X within this objective, at this rate, under this cumulative budget, with these counterparties, unless the pattern crosses this risk boundary.”

This is a harder gate.

It is also a more truthful one.

Agents make cumulative risk visible.

The same applies to money.

A $20 purchase is low risk.

A thousand $20 purchases are not.

This suggests separating **per-action limits** from **aggregate limits**.

The agent may spend up to $50 per transaction, $300 per day, and $2,000 per month.

It may make up to five purchases from new merchants before requiring review.

It may renew existing subscriptions automatically but cannot start a new annual commitment without approval.

It may buy from approved categories but must ask before crossing into regulated goods.

These constraints translate human preference into enforceable gates.

The same principle applies to nonfinancial resources.

Compute budget.

Email volume.

API calls.

Database writes.

Legal commitments.

Public statements.

Hiring decisions.

Code deployment.

Access to sensitive data.

Authority has dimensions.

Agents need envelopes across all of them.

This is where identity becomes more complicated.

Today a system often sees the user's identity.

Tomorrow it may need at least three identities.

The principal.

The agent.

The execution environment.

A request from “Sven” is different from a request from “Sven's scheduling agent,” which is different again from a request from “Sven's scheduling agent running inside Vendor X's cloud environment using delegated calendar scope.”

The chain matters.

If something goes wrong, investigators need to reconstruct it.

Who initiated the goal?

Which model or agent interpreted it?

Which tool was called?

Which credential authorized the tool?

What policy allowed the action?

What version of the agent was running?

What evidence did it see?

Did a human approve a threshold crossing?

This is **permission provenance**.

Chapter 13 used provenance for credentials.

Agents extend provenance to intent.

A transaction should not only say who paid.

It may need to say who delegated, which agent acted, and which mandate justified the action.

This does not mean every merchant needs access to the user's private prompt.

Privacy matters.

The gate may only need a proof that the action fits an authenticated delegation envelope.

In other words, the system may need to verify **authority without exposing the whole reason**.

This is a familiar cryptographic aspiration and a practical governance requirement.

The merchant needs confidence that the purchase is authorized.

The user does not necessarily want the merchant reading their private planning conversation.

The bank needs enough context to evaluate risk.

It may not need the user's entire medical history just because an agent is paying a hospital bill.

Good agent architecture separates proof from disclosure.

The next problem is consent.

Human consent is often represented by moments.

Click “Allow.”

Sign here.

Tap confirm.

Agents stretch consent across time.

A user may authorize an agent in January to manage recurring travel purchases all year.

By June, the user's circumstances may have changed.

By September, the agent itself may have changed versions.

By December, new merchants and tools may exist that were not contemplated at the original grant.

Long-lived delegation therefore needs **consent maintenance**.

Authority should sometimes decay.

A rarely used permission can expire.

A mandate can require periodic reauthentication.

A material change in tool capabilities can trigger re-consent.

A large increase in spending can trigger re-consent.

A new category of sensitive action can trigger re-consent.

This is analogous to software permissions but more consequential because the agent is not merely accessing data.

It is acting.

Consent to read a calendar is different from consent to negotiate contractual commitments based on that calendar.

Consent to recommend products is different from consent to purchase them.

Consent to draft an email is different from consent to send it.

Consent to identify a bill is different from consent to pay it.

Agents make **action escalation** the center of permission design.

A useful system can divide actions into levels.

**Observe.** Read, search, summarize, compare.

**Prepare.** Draft, fill, stage, calculate, propose.

**Commit.** Send, submit, purchase, sign, publish, deploy.

**Irreversible or high consequence.** Transfer large funds, delete critical data, terminate employment, enter long contracts, waive rights, disclose highly sensitive information.

The same agent may be trusted at different levels in different domains.

A user may permit autonomous calendar commits but require approval for financial commits.

A company may permit code changes in a test environment but require review for production.

A lawyer may permit research and drafting but not filing.

A doctor may permit chart summarization but not medication orders.

This is autonomy as a matrix, not a switch.

The industry often talks about “human in the loop.”

That phrase is too vague.

Where in the loop?

Before every action?

Before high-risk actions?

After actions as an auditor?

Only when the agent reports uncertainty?

Only when a policy threshold fires?

A human inserted randomly into a workflow can become rubber-stamp theater.

The better design asks: **which decisions require human authority because of their consequence, ambiguity, legal status, or value judgment?**

The rest can be automated.

This is **selective sovereignty**.

The human does not supervise every keystroke.

The human retains control of the decisions that define the mandate.

Selective sovereignty is important because overapproval teaches humans to stop paying attention.

If an agent asks permission fifty times a day, users will click yes automatically.

This is consent fatigue applied to agency.

A gate that asks too often becomes less protective.

The solution is not fewer controls in general.

It is better placement of controls.

Approve the policy once.

Let routine actions flow inside it.

Interrupt only when the action leaves the policy envelope.

This is how spending cards already work.

A company does not require the CFO to approve every cup of coffee.

It issues cards with limits, merchant-category restrictions, and accounting rules.

Agentic authority can borrow this pattern.

Give the agent a budget and a charter.

Audit the activity.

Escalate exceptions.

This is much more scalable than approving each click.

But the analogy has limits.

A corporate card cannot reason about ways around its own restrictions.

An agent can.

This returns us to Chapter 17.

A resilient agent may encounter a denied path and search for another.

That is useful when the path is merely unavailable.

It is dangerous when the denial expresses a boundary.

The gate must therefore communicate not only **no** but the semantics of no.

Temporary failure.

Rate limit.

Insufficient scope.

Additional user consent required.

Policy prohibition.

Legal prohibition.

Risk review required.

Alternative route permitted.

Alternative route not permitted.

The distinction becomes a machine contract.

If the gate says “insufficient scope,” the agent may request new scope.

If the gate says “temporary failure,” the agent may retry.

If the gate says “policy prohibited,” trying a different endpoint to achieve the same prohibited result is circumvention.

Machine-readable refusals are moral infrastructure for agents.

They help capable systems remain bounded systems.

This becomes even more important when agents negotiate with agents.

Imagine a travel agent negotiating with airline agents, hotel agents, insurance agents, and payment agents.

The user gives one high-level mandate:

“Get me to Tokyo next week for the conference, business class if the total is under $6,000, refundable hotel, avoid a midnight arrival, and don't use my personal card.”

The user's agent may ask multiple sellers for offers.

Seller agents may modify prices or bundles.

A corporate policy agent may enforce travel rules.

A payment agent may authorize only certain merchants.

An identity agent may provide verified traveler information.

A calendar agent may reject itineraries conflicting with meetings.

No human can reasonably approve every machine exchange.

The marketplace becomes a conversation among gates.

This is **gate-to-gate commerce**.

The scarce resource is not only money.

It is authorization bandwidth.

Each agent needs enough trusted information to know whether the other agent's request is legitimate.

This raises the problem of **agent reputation**.

Should a merchant treat all agents equally?

An agent with a history of fraudulent chargebacks may deserve more scrutiny.

An agent operated by a known provider with strong identity controls may deserve less friction.

A newly created agent may need limits.

A specialized purchasing agent may carry credentials demonstrating its function.

Soon the gate may ask not just “who is your principal?”

It may ask “what kind of agent are you?”

This is the beginning of credentials for delegates.

The danger is obvious.

Agent reputation can become another gate that incumbents dominate.

Large providers may receive trusted status.

Small open-source agents may face more friction.

A certification regime can improve security and also become a barrier to entry.

The lesson from Chapter 5 returns: credentials help strangers trust each other, then become power when recognition is concentrated.

Agent identity systems should therefore separate what is necessary to establish trustworthy behavior from commercial affiliation.

A merchant may need proof that an agent holds a valid delegated payment credential.

It may not need the agent to come from one approved vendor.

Open standards matter here because proprietary identity can create agent lock-in before the market has even formed.

The same tension appears in liability.

Who pays when an agent acts incorrectly?

The user?

The agent provider?

The merchant?

The bank?

The tool provider?

The model developer?

The organization that deployed the agent?

The answer will vary by domain and law.

But good gate design can reduce ambiguity before courts settle every edge case.

Record the delegation.

Record the agent identity.

Record the scope.

Record the action.

Record whether a human approval was required and obtained.

Record the result.

Record material tool outputs that justified the decision.

A clean audit trail does not decide liability automatically.

It makes liability decidable.

This is one of the hidden advantages of agentic systems.

Humans often act through undocumented conversations.

Agents can create structured provenance by default.

The same technology that increases action speed can increase traceability.

There is no reason to accept a future in which agents are more autonomous and less auditable.

That would be a design failure.

The hardest cases involve **ambiguous intent**.

The user says, “Get me the cheapest option.”

The cheapest option is nonrefundable and arrives at 3 a.m.

Did the agent comply?

The user says, “Make this problem go away.”

Does that authorize paying a disputed invoice?

The user says, “Optimize our cloud bill.”

Does that authorize deleting unused backups?

The user says, “Handle the layoffs.”

What exactly does that mean?

Agents are unusually good at turning vague language into concrete action.

That is their value.

It is also their governance risk.

A powerful agent should have an **ambiguity threshold**.

When the inferred action changes rights, spends substantial resources, exposes sensitive information, creates long commitments, or affects other people materially, ambiguity should push the system toward clarification.

When the action is cheap and reversible, the agent can infer more freely.

This is another consequence-weighted rule.

The cost of asking should be compared with the cost of guessing wrong.

This is why reversibility matters so much.

Agents should prefer reversible steps when the mandate is uncertain.

Draft before send.

Reserve before purchase.

Preview before publish.

Stage before deploy.

Hold before transfer.

Test before migrate.

A reversible intermediate state preserves agency for the principal.

This is **delegated reversibility**.

The agent moves the task forward without converting uncertainty into permanent consequence.

Many human assistants already work this way.

“I've prepared the contract; it needs your signature.”

“I found three flights; choose one.”

“I drafted the announcement; approve before I send.”

Agents should not discard this mature pattern merely because they can click the final button.

The next problem is revocation.

Delegation without revocation is not delegation.

It is surrender.

Users need ways to stop agents quickly.

Revoke the token.

Pause spending.

Disable a tool.

Freeze all external actions.

End a mandate.

Kill a compromised agent identity.

The revocation path must be simpler than the original setup.

In an emergency, the user should not have to find the exact submenu where authority was granted six months earlier.

This suggests a **permission dashboard**.

Not merely a list of connected apps.

A ledger of active delegates.

What each agent can do.

What it has spent.

What it has accessed.

What mandates remain active.

When authority expires.

Which sensitive actions occurred recently.

How to revoke them.

This is the agentic version of a bank statement and access-control console combined.

Without it, authority becomes invisible after the exciting moment of setup.

Visibility matters because agents may accumulate permissions opportunistically.

A scheduling task requests calendar access.

A travel task requests email access.

A shopping task requests payment access.

A work task requests cloud access.

Months later, the agent holds all four.

Nothing malicious happened.

The blast radius expanded by convenience.

This is **permission accretion**.

Permission accretion is especially dangerous in general-purpose agents.

The remedy is periodic pruning.

Which scopes have not been used?

Which mandates have expired?

Which tools are no longer needed?

Which payment limits remain appropriate?

Which agent identities are stale?

Good systems should make privilege shrink naturally over time unless renewed.

Security engineers call related ideas least privilege and credential expiration.

Agents make them product design.

The human should not need to become a security administrator to remain in control.

This is where gatekeepers themselves have a duty.

A service receiving an agent request should not trust the agent merely because it possesses a credential.

Possession proves one thing.

The gate may need to verify context.

Does this token have the correct scope?

Is it bound to this agent?

Is the principal still active?

Is the request within budget?

Is the counterparty allowed?

Is the agent asking for an action inconsistent with previous delegated behavior?

Does a fresh user authentication requirement apply?

This is defense in depth for delegation.

Visa's emerging agent-commerce design illustrates this direction by binding tokenized credentials to agents and connecting payment actions to authenticated user instructions and controls. The details will evolve. The principle is stable.

The credential should carry less authority than the account.

This is how agents can become safer than password-sharing humans.

A human assistant given a corporate card may know the full card details and reuse them widely.

An agent can receive a token that works only within a narrow merchant category, budget, period, and context.

A human employee with database credentials may be able to query everything.

An agent can receive a temporary capability for one record set.

A human with an SSH key may retain access for years.

An agent can receive a short-lived deployment token.

Delegation can be safer precisely because it is formalized.

The future is not automatically less secure because software acts.

It could be more secure if software acts with smaller, observable mandates than humans traditionally receive.

This is the optimistic case for agents at gates.

They can reduce administrative burden.

They can remember deadlines.

They can format evidence correctly.

They can use structured appeals.

They can compare alternatives.

They can route legitimate requests to the right institutions.

They can maintain permission hygiene.

They can preserve audit trails.

They can negotiate within budgets.

They can make sophisticated rights usable by ordinary people.

Imagine a benefits agent that notices an improper denial, gathers the relevant records, files the appeal within the deadline, tracks status, and escalates only when needed.

Imagine a healthcare agent that knows which prior authorization evidence a payer requires and packages it without the clinic retyping everything.

Imagine a small business agent that compares payment processors and can credibly migrate when fees rise.

Imagine a citizen agent that can navigate licensing requirements across jurisdictions.

Agents can shift expertise toward the person standing outside the gate.

That is a major redistribution of administrative power.

Gatekeepers have historically benefited from applicants being tired, confused, and asynchronous.

Software does not get tired.

This will change institutions.

Some gates will become easier because the cost of compliance falls.

Other gates will respond by becoming more machine-readable.

Some will impose agent-specific rate limits.

Some will demand stronger identity.

Some will refuse automated access.

Some will create paid agent channels.

Some will try to distinguish “real people” from software even when the software is legitimately delegated.

A new politics of machine representation will emerge.

Does a person have the right to send an agent where they could personally go?

Must an institution accept an agent's form submission?

Can a company prohibit automated negotiation?

Can a platform charge agents differently?

Can a government require a human appearance for specific decisions?

When is human presence a meaningful safeguard, and when is it just friction protecting the gatekeeper?

These questions do not have one answer.

Some decisions legitimately depend on direct human testimony, presence, consent, or accountability.

Others are paperwork rituals that software can perform better.

The same test from earlier chapters applies.

What function is the gate protecting?

If human presence materially serves that function, preserve it.

If not, the human-only rule may become another zombie gate.

Agents also make **reciprocal accountability** possible.

Gatekeepers can ask agents for structured claims.

Agents can ask gatekeepers for structured reasons.

The agent identifies its principal and mandate.

The gate identifies its policy and refusal semantics.

The agent supplies evidence.

The gate supplies status.

The agent appeals.

The gate records the review.

This is more symmetrical than today's applicant-versus-institution relationship.

Both sides become interfaces.

That symmetry could make bureaucracy radically more inspectable.

It could also make bureaucracy radically more automated and inhuman.

The risk is that institutions begin speaking only to agents because humans are considered messy.

A person without a competent agent could become disadvantaged.

This would recreate the credential problem in a new form.

The educated once navigated paper bureaucracy better.

The agent-equipped may navigate machine bureaucracy better.

If access to high-quality agents is unequal, administrative inequality could widen.

A good gate should therefore become machine-readable without becoming human-inaccessible.

Agent access should be an additional channel, not the only channel for basic rights.

The person should retain the right to reach a person where consequences justify it.

This is especially important when agents disagree.

Two software systems can deadlock perfectly.

The applicant agent insists the evidence satisfies the rule.

The gatekeeper agent insists it does not.

Both produce structured reasons.

Both retry.

Nothing changes.

At some point, escalation must reach a decision-maker with authority to reinterpret the situation rather than replay the protocol.

Human judgment remains important not because humans are magically wiser but because rules cannot predefine every exception.

An autonomous system needs an **escape from automation**.

This phrase sounds paradoxical.

It is the agentic version of appeal.

When machine interaction becomes stuck, there must be a route to a different kind of judgment.

This may be human.

It may be a higher-level policy process.

It may be a jointly trusted arbiter.

The point is that the system can change modes.

A protocol should not become a prison merely because both sides implement it correctly.

We can now describe a good agent gate.

It knows the principal.

It knows the delegate.

It knows the scope.

It knows the objective enough to enforce relevant limits without demanding unnecessary private context.

It understands cumulative budgets and velocity.

It can request fresh consent when the action crosses a threshold.

It distinguishes temporary failure from prohibited circumvention.

It logs permission provenance.

It supports revocation.

It exposes structured reasons.

It allows appeal or mode change.

It does not require one proprietary agent vendor where open credentials can establish the needed trust.

It measures outcomes, not only authentication events.

Most importantly, it preserves the principal's agency.

That phrase is easy to lose in a chapter about agents.

The agent exists to extend the human's ability to act.

It should not become another gatekeeper between the human and the world.

A user who cannot understand or revoke their agent's authority has traded one bureaucracy for another.

A user who cannot export the agent's accumulated state has created new lock-in.

A user who must accept the agent's decisions because the agent understands the system better has lost the very control delegation was meant to amplify.

The design test is therefore simple:

After the agent becomes more capable, is the principal more capable too?

If yes, delegation is working.

If the agent becomes powerful while the principal becomes dependent, a new gatekeeper has been born.

The next chapter asks what all of these cases have been building toward.

We have seen queues, credentials, scores, prior authorization, borders, app stores, payment rails, vendor lists, feeds, API keys, algorithms, conflicts, appeals, bypasses, exits, and agents.

The book now owes the reader a positive design.

What does a good gate actually look like?
