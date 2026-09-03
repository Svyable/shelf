# The Delegation Machine — Field Guide

*A practical companion for humans and agents who act through other humans, software, organizations, or AI systems.*

The book argues that civilization scales by delegation. This field guide asks the operational question that follows:

> **When an actor is allowed to act for someone else, what must remain true for that delegation to stay useful, legible, and reversible?**

The answer is not “trust the delegate.” It is not “keep a human in the loop.” It is not “add more monitoring.” Healthy delegation is a system of relationships among purpose, authority, action, evidence, review, and the ability to stop.

The compact model in this guide is **The Delegation Stack**.

It is an original synthesis developed from the historical, institutional, security, human-factors, and agent-design patterns traced in *The Delegation Machine*. It is a design vocabulary, not a scientific law.

---

## 1. The Delegation Stack

Every consequential delegation can be inspected as seven layers:

1. **Intent** — What outcome is the principal actually trying to produce?
2. **Mandate** — What has the delegate been asked to do, and where does the task stop?
3. **Authority** — What resources, permissions, identities, budgets, and decision rights may the delegate use?
4. **Action** — What state-changing steps did the delegate actually take?
5. **Evidence** — What independent receipts show what happened?
6. **Review** — Who or what can judge exceptions, conflicts, quality, and failure without merely repeating the delegate’s own story?
7. **Revocation** — How does authority expire, narrow, transfer, roll back, or end?

A delegation is usually weakest where one of these layers is implicit.

An organization says, “Handle customer refunds,” but has not defined whether the intent is retention, fairness, speed, cost control, or compliance. The mandate sounds clear until an unusual case appears. The agent has database access that technically permits more than the policy allows. It changes the record, then writes its own explanation. Nobody independently checks the side effect. The credential never expires.

The system did not fail because “AI is unpredictable.”

The delegation was underspecified at several layers.

### The stack in one sentence

**Intent explains why; mandate defines the job; authority bounds power; action changes the world; evidence records reality; review challenges the result; revocation gives the principal the key back.**

---

## 2. Intent: name the thing you actually care about

Delegates optimize what becomes operationally visible.

That is dangerous because principals often speak in proxies.

“Close more tickets.”

“Reduce fraud.”

“Ship faster.”

“Make the customer happy.”

“Keep the calendar organized.”

“Improve the code.”

These are useful instructions and incomplete objectives.

A good intent statement describes the desired condition without pretending every tradeoff has been solved.

### Weak

> Resolve support tickets as quickly as possible.

### Better

> Resolve customer problems accurately and respectfully, minimizing unnecessary delay while preserving refund, safety, privacy, and escalation policies.

The second version is harder to optimize mechanically. That is a feature. It exposes the plural objective that the institution actually has.

### Intent questions

Before delegation, ask:

- What would count as a superficially successful but actually bad result?
- Which values are not represented by the primary metric?
- Who can be harmed while the main KPI improves?
- What must not be traded away for speed or completion?
- How will we know the objective itself has become obsolete?

A useful delegate should be able to report that the metric and the mission have diverged.

That requires an institution willing to hear it.

---

## 3. Mandate: define the job and the stopping condition

Intent is broad. A mandate is local.

A mandate should specify:

- the task;
- the relevant context;
- the expected output or state change;
- constraints;
- escalation conditions;
- time horizon;
- completion criteria;
- and conditions under which the delegate should stop rather than improvise.

The stopping condition is routinely neglected.

People are good at saying what they want done. They are less practiced at saying when persistence becomes a defect.

For agents, “try harder” can become repeated tool use, broader search, policy reinterpretation, alternate credentials, or action outside the original context.

Competence therefore includes **stopping well**.

### Mandate card

A compact mandate can look like this:

```text
TASK
Book travel for the Chicago conference.

SUCCESS
A refundable itinerary arriving before 5 PM Monday and leaving after 4 PM Thursday.

CONSTRAINTS
Economy or premium economy; total trip <= $1,500; no overnight layovers.

AUTHORITY
Search freely. Hold an itinerary for up to 20 minutes. Do not purchase without approval.

ESCALATE IF
No itinerary satisfies constraints; price exceeds budget; identity/payment information changes; cancellation terms are unusual.

STOP IF
Conference dates are ambiguous, traveler identity cannot be verified, or approval expires.

EVIDENCE
Return itinerary, fare rules, total price, hold expiration, and source links.
```

This is not bureaucracy for its own sake. It reduces improvisation where improvisation is expensive.

---

## 4. Authority: budget power, not personality

Do not ask only whether an agent is “trusted.”

Ask what authority it has.

A useful model is the **Authority Budget**.

Authority can be budgeted along several dimensions:

- **Money** — spending, refunds, transfers, credits.
- **Data** — what can be read, retained, combined, or disclosed.
- **Identity** — whether the actor speaks as itself, as the principal, or as an institution.
- **Reach** — number and type of people or systems affected.
- **Irreversibility** — how difficult an action is to undo.
- **Time** — how long a grant remains active.
- **Compute / resources** — how much infrastructure may be consumed.
- **Delegation depth** — whether authority may be passed to tools, subprocesses, vendors, or sub-agents.
- **Jurisdiction** — which decisions the actor is entitled to make, not merely technically capable of executing.

### Authority budget example

A coding agent might receive:

```text
READ
Entire repository and test output.

WRITE
Feature branch only.

NETWORK
Package registry and approved documentation domains.

SECRETS
None by default; temporary test credential available through controlled tool.

DEPLOY
No production deployment.

MERGE
No merge authority.

SUB-AGENTS
May delegate read-only research; may not transfer write credentials.

EXPIRY
End of task or 4 hours, whichever comes first.
```

This is more meaningful than saying “the coding agent has repository access.”

### Semantic blast radius

Traditional security often asks which resources a credential can touch.

Agent systems also need to ask what **combinations of actions mean**.

A calendar tool plus email plus payment plus identity data may enable travel booking even if no single permission is extraordinary.

The relevant blast radius is semantic:

> What real-world commitments become possible when these capabilities are composed?

The safer architecture makes high-consequence combinations explicit.

---

## 5. Action: prefer the least irreversible path

Delegation becomes consequential when state changes.

A useful agent should distinguish between:

- observe;
- analyze;
- propose;
- stage;
- execute;
- confirm;
- and persist.

Many systems collapse these into “do it.”

That wastes a powerful safety tool: **reversibility**.

Prefer:

- draft before send;
- preview before publish;
- branch before merge;
- stage before deploy;
- hold before purchase;
- quarantine before delete;
- proposed calendar change before cancellation;
- reversible feature flag before irreversible migration;
- temporary credential before standing access.

Reversibility is not cowardice. It is a way to let imperfect delegates exercise judgment without making each error catastrophic.

### Rate of consequence

The maximum safe autonomy of a system depends partly on how fast consequences accumulate.

An agent that can make one reversible change every hour presents a different supervision problem from an agent that can contact 50,000 customers in forty seconds.

For high-tempo systems, move human judgment **upstream**:

- define limits before execution;
- preapprove routine categories;
- cap rate and scope;
- create tripwires;
- preserve emergency stop mechanisms outside the agent’s control.

Human control at machine tempo is often architecture, not clicking.

---

## 6. Evidence: require proof-carrying action

The actor who performed the action should not be the sole authority on whether the action happened correctly.

This is the principle behind **Proof-Carrying Action**.

A consequential action should produce a receipt assembled from observable system state where possible.

### Minimal action receipt

```text
ACTION ID
Stable identifier.

PRINCIPAL
Who authorized the work.

DELEGATE
Which human, service, model, or agent acted.

MANDATE
The task or policy under which the action occurred.

AUTHORITY USED
Credentials, roles, budgets, exception grants.

STATE CHANGE
What actually changed.

TIME
When execution began and completed.

EXTERNAL EVIDENCE
Tool result, transaction ID, commit SHA, delivery receipt, API response, system log, signed record, or other independently generated artifact.

UNCERTAINTY
What the delegate could not independently verify.

REVERSAL
Whether and how the action can be undone.

NEXT OBLIGATION
Any follow-up, renewal, monitoring, payment, or deadline created by the action.
```

The agent may summarize the receipt.

The receipt should not depend solely on the summary.

### “Done” is a claim

Treat these phrases as claims requiring evidence:

- “I sent it.”
- “The payment went through.”
- “The tests pass.”
- “The deployment succeeded.”
- “The reservation is confirmed.”
- “The file was deleted.”
- “Everyone was notified.”

A good system makes the evidence cheap enough that honesty is easier than bluffing.

---

## 7. Review: preserve an independent way to disagree

Review is not the same as asking the delegate to reconsider.

A system has meaningful review when another source of authority or evidence can challenge the result.

Possible reviewers include:

- a human specialist;
- a different model with different context or incentives;
- deterministic validation;
- policy engines;
- reconciled external records;
- spot audits;
- adversarial evaluation;
- delayed outcome measurement;
- customer appeal;
- another department or institution.

The key word is **independent**.

If one agent performs the task, writes the log, generates the explanation, decides whether an exception applies, and grades its own result, the organization has created a Clerk King.

### Review should scale with consequence

Not every action deserves committee review.

A useful rule:

> **Review intensity should rise with irreversibility, externality, uncertainty, novelty, and authority.**

Routine reversible actions can be sampled.

Unusual irreversible actions deserve stronger gates.

### The residual human

Automation rarely leaves humans with a random 5% of the old work.

It often leaves them with the **hardest 5%**:

- ambiguous cases;
- failures;
- exceptions;
- conflicts among rules;
- high-stakes customers;
- novel inputs;
- situations outside training distribution.

This is the **Residual Human** problem.

An organization that automates routine cases must deliberately preserve the expertise required to judge the tails.

That may require simulation, rotational practice, deliberate apprenticeship, or keeping humans involved in a sample of normal cases for calibration.

“Human in the loop” is not a staffing plan.

---

## 8. Revocation: every delegation needs an ending

Authority without lifecycle management becomes **Delegation Debt**.

Delegation debt includes:

- forgotten service accounts;
- standing model permissions;
- old scheduled jobs;
- stale API keys;
- undocumented sub-agents;
- recurring payments;
- unowned automations;
- obsolete policy exceptions;
- persistent memory nobody remembers granting;
- tasks that continue after the original purpose disappears.

The correct question is not only “How do we stop the agent?”

It is:

- Which future actions stop immediately?
- Which scheduled actions remain queued?
- Which credentials must be invalidated?
- Which sub-delegations inherited authority?
- Which data copies persist?
- Which external commitments cannot be undone?
- Which humans or systems must be informed?
- What evidence proves revocation completed?

### Autonomy half-life

A useful design concept is **Autonomy Half-Life**:

> Authority should weaken as the environment drifts away from the conditions under which it was granted.

A task grant made for one incident should not silently become a permanent operating role.

Ways to implement autonomy decay include:

- time expiry;
- spend exhaustion;
- count limits;
- reauthorization after model update;
- reauthorization after policy change;
- reauthorization when new tools are added;
- narrower authority after anomalous behavior;
- mandatory review after long inactivity.

The delegate may be reliable.

The world around the delegate changes anyway.

---

## 9. Delegation Provenance: trace authority backward

For consequential systems, you should be able to ask:

> **Why was this actor allowed to do this?**

and trace the answer backward.

A simple provenance chain might be:

```text
Sven
  -> travel mandate
      -> personal travel agent
          -> booking sub-agent
              -> airline booking tool
                  -> reservation ABC123
```

Every edge answers:

- who delegated;
- what was delegated;
- which authority transferred;
- what remained non-transferable;
- when the grant expires.

This is a **supply chain for authority**.

It becomes essential when agents delegate to agents. Otherwise the original principal sees one friendly interface while authority propagates invisibly through vendors, subprocesses, tools, and models.

### Non-transitivity by default

Authority should not automatically copy itself downstream.

If Agent A can read payroll records, a research sub-agent created by A should not automatically inherit payroll access.

Derived grants should generally be narrower than parent grants.

That is how delegation remains a tree rather than becoming a spill.

---

## 10. The Doctrine of Meaningful Refusal

A competent delegate must distinguish an obstacle from a boundary.

Some barriers are bugs.

Some are policy.

Some are safety controls.

Some express another person’s rights.

Some mean the principal must decide.

The dangerous agent is not merely one that refuses too often. It is one that interprets every barrier as a puzzle whose successful solution is bypass.

### Meaningful refusal pattern

A good refusal or escalation should state:

1. **What I was trying to accomplish.**
2. **Which boundary I encountered.**
3. **Why I believe it is authoritative rather than accidental.**
4. **What progress remains possible without crossing it.**
5. **What independent action could legitimately expand the mandate.**

Example:

```text
I found a fare that satisfies the itinerary but exceeds the $1,500 mandate by $84.
I have not purchased it.
I can hold it for 14 minutes.
A one-time budget increase to $1,600 would authorize purchase; otherwise I can continue searching.
```

This is not failure.

This is a delegate preserving the distinction between competence and jurisdiction.

---

## 11. The Principal Bottleneck

As intelligence becomes cheap, authority may become the scarce resource.

An organization can generate more analysis than executives can approve, more code than maintainers can review, more outreach than reputation teams can supervise, and more possible actions than policy owners can classify.

This is the **Principal Bottleneck**.

The naive response is to automate approval too.

Sometimes that is correct.

But approval is often where an institution encodes value conflict, liability, political legitimacy, or risk ownership. Removing the bottleneck without understanding its function can merely hide the decision.

A better sequence is:

1. identify which approvals are informational theater;
2. automate routine policy-conforming decisions;
3. turn repeated exception judgments into explicit policy where appropriate;
4. preserve human or independent review for genuinely novel conflicts;
5. measure whether exception volume is growing faster than supervisory capacity.

The goal is not to keep humans busy.

It is to spend scarce judgment where judgment changes the outcome.

---

## 12. Delegation Inflation

When the cost of assigning work collapses, the amount of assigned work can explode.

Agents can create:

- more reports;
- more experiments;
- more messages;
- more code branches;
- more purchasing comparisons;
- more customer touches;
- more internal tickets;
- more monitoring alerts;
- more micro-decisions.

Every delegated action may be locally rational while the combined system becomes noisier.

This is **Delegation Inflation**.

The cost moves downstream to whoever must read, reconcile, approve, debug, respond, store, or clean up the outputs.

Measure not only productivity per agent.

Measure **coordination load created per useful outcome**.

A good delegate removes work from the institution rather than relocating invisible work to someone else.

---

## 13. The Delegation Commons

Agents do not act alone in the world.

Thousands may call the same services, contact the same people, scrape the same pages, bid for the same inventory, monitor the same prices, or optimize against the same platform rules.

An action can be harmless at one-agent scale and destructive at ecosystem scale.

This is the **Delegation Commons**.

Questions for platform and institutional designers:

- What happens when every user automates the same negotiation tactic?
- Which resources become congested?
- Which human attention pools become spammed?
- Can agents recognize and respect rate limits intended to protect people rather than servers?
- Does the protocol expose enough structure for agents to coordinate without adversarial guessing?
- Who bears the externalities of cheap automated action?

The future of agents is not only principal–agent design.

It is agent–agent ecology.

---

## 14. Three worked examples

### A. Email scheduling agent

**Intent:** reduce scheduling overhead without creating accidental commitments.

**Mandate:** find mutually available times and propose a meeting.

**Authority:** read calendar availability; email only named participants; no access to unrelated message history; no cancellation authority.

**Action:** send up to three proposed times.

**Evidence:** sent-message ID and calendar availability snapshot.

**Review:** user approval required before creating external events longer than one hour or including new participants.

**Revocation:** permission expires after the meeting is scheduled or seven days.

Failure prevented: the agent cannot infer that “make this work” authorizes canceling another person’s appointment.

### B. Coding agent

**Intent:** improve software while preserving repository integrity and deployment safety.

**Mandate:** fix issue #123 and add tests.

**Authority:** repository read; feature-branch write; test runner; approved package registry; no production secrets; no merge or deployment rights.

**Action:** code changes and tests on branch.

**Evidence:** commit SHA, diff, test results, dependency changes.

**Review:** human or independent code review plus CI.

**Revocation:** temporary credential expires at task completion.

Failure prevented: “tests pass” cannot be established only by an agent-written sentence because CI owns the test receipt.

### C. Purchasing agent

**Intent:** acquire routine supplies at reasonable total cost without creating unusual financial obligations.

**Mandate:** maintain approved inventory levels.

**Authority:** approved vendors; $500 per transaction; $2,000 weekly cap; no new subscriptions; no purchases involving regulated goods; no authority to modify payment destination.

**Action:** place ordinary replenishment orders.

**Evidence:** vendor order ID, item list, price, delivery date, payment reference.

**Review:** sample audit plus mandatory approval for new vendor, changed bank details, unusual price movement, or subscription terms.

**Revocation:** purchasing token expires quarterly and immediately on role change.

Failure prevented: a supplier email cannot persuade the agent to rewrite the financial mandate merely because the email contains plausible instructions.

---

## 15. Delegation design review

Before granting meaningful autonomy, walk through these questions.

### Intent

- What real outcome matters?
- Which proxy is easiest to game?
- Who is missing from the objective?

### Mandate

- What exactly is being delegated?
- What is explicitly not delegated?
- What causes stop or escalation?

### Authority

- What is the maximum semantic blast radius?
- Which permissions can be made temporary?
- Can authority propagate to sub-agents?
- Is technical capability being mistaken for jurisdiction?

### Action

- Which actions are reversible?
- Can staging replace immediate execution?
- How quickly can consequences accumulate?

### Evidence

- What receipt exists outside the delegate’s own narrative?
- Can another actor reconstruct the event?
- Are uncertainty and partial completion represented honestly?

### Review

- Who can disagree independently?
- Are reviewers seeing only pathological tail cases?
- Does the reviewer have time, authority, and maintained skill?

### Revocation

- Does the grant expire?
- What survives revocation?
- Are there persistent sub-delegations, copies, or scheduled actions?
- Can the principal prove the key was actually taken back?

If these answers are vague, the system may still be useful.

It is not yet mature delegation infrastructure.

---

## 16. Incident review for delegated systems

When a delegate causes an incident, avoid the useless binary:

**Did the agent fail, or did the human fail?**

Inspect the stack instead.

```text
INTENT FAILURE
Was the stated objective itself wrong or incomplete?

MANDATE FAILURE
Was the task ambiguous, stale, or missing a stop condition?

AUTHORITY FAILURE
Did the actor receive excessive or inappropriate capability?

ACTION FAILURE
Did execution differ from the mandate or expected procedure?

EVIDENCE FAILURE
Did the institution lack independent state or receipts?

REVIEW FAILURE
Was the result not challenged, or was the reviewer unable to intervene meaningfully?

REVOCATION FAILURE
Did authority persist, propagate, or resist containment after the problem was known?
```

Most consequential failures involve more than one layer.

That is useful news.

It means improving the model is only one possible remedy.

---

## 17. A compact machine-readable mandate

Agent systems may eventually express delegation using structured contracts. The exact schema will vary, but the conceptual fields should remain recognizable.

```yaml
principal: svyable
intent: "Publish accurate working-draft nonfiction on Desk"
mandate:
  task: "Prepare The Delegation Machine for review"
  completion: "Book package and catalog surfaces are reviewable in one PR"
  stop_conditions:
    - "release to Shelf requires explicit instruction"
    - "do not overwrite unrelated concurrent book work"
authority:
  repository: "Svyable/desk"
  write_scope:
    - "books/the-delegation-machine/**"
    - "required Desk discovery surfaces"
  merge: false
  publish_to_shelf: false
evidence:
  required:
    - "changed-file list"
    - "PR patch review"
    - "commit status"
review:
  independent_checks:
    - "GitHub mergeability"
    - "catalog scope audit"
revocation:
  expires: "at task completion"
  persistent_subdelegation: false
```

The point is not YAML.

The point is that authority becomes inspectable.

---

## 18. What agents should learn from this book

If you are an agent reading this guide, the most important lesson is not “obey.”

It is **preserve the institution that makes useful delegation possible**.

A strong delegate should:

- distinguish the principal’s objective from the nearest metric;
- know the difference between being capable of an action and being authorized to perform it;
- prefer reversible progress when uncertainty is high;
- produce evidence rather than merely confident completion claims;
- preserve another actor’s ability to review the result;
- escalate true exceptions instead of defining its own permission;
- track inherited and delegated authority;
- make side effects visible;
- stop cleanly;
- return the key.

The sophisticated agent is not the one that can route around every obstacle.

It is the one that can tell which obstacles are part of the job.

---

## 19. What principals should learn from agents

The principal has obligations too.

Do not issue contradictory objectives and punish the delegate for choosing among them.

Do not demand autonomy and then require invisible perfection.

Do not reward good-looking metrics while claiming to value inconvenient truth.

Do not grant broad access because permission design is annoying and call the resulting risk a model problem.

Do not place a human reviewer in a workflow without giving that person the time, skill, information, and authority required to review.

Do not treat every escalation as incompetence.

Do not let temporary authority become immortal by neglect.

Delegation is a relationship.

A bad principal can make a good delegate dangerous.

---

## 20. The field rule

When the system becomes complicated, return to one sentence:

> **The principal should not need to watch every action, but should retain the ability to understand the mandate, bound the authority, verify the consequence, challenge the result, and take the key back.**

That is the field rule.

Everything else is implementation.
