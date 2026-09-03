# Field Guide: The Continuity Ledger

The easiest way to make an agent persistent is to save more things.

The better way is to decide what deserves causal force tomorrow.

A continuity ledger is a compact description of the state that allows a future reasoning instance to resume responsibility without pretending to be the same process. It is not a transcript, a vector database, a giant prompt, or a dump of everything the system has ever seen.

It is the minimum durable structure required to answer seven questions.

What are we still trying to accomplish?

Under whose authority?

What is true now?

What happened that changed the situation?

What commitments remain open?

What should wake the system again?

How does this responsibility end?

If a persistent agent cannot answer those questions after its current model process disappears, it does not have continuity. It has residue.

The distinction matters because residue is cheap to accumulate and expensive to govern.

A mature system treats continuity as a designed interface between temporary minds.

Consider Meridian at the end of an ordinary reasoning episode. A model has just investigated a supplier notice. The model used thousands of tokens, retrieved fifteen documents, considered four hypotheses, drafted two possible recommendations, and discarded several lines of inquiry.

Almost none of that deserves to survive.

The durable record might be only this:

```text
principal: meridian
mandate: maintain current material supplier-risk view
trigger: vendor-policy-change / event 8f31...
authority_used: read contracts, dependency map, vendor notice
observed_fact: support policy removed version-4 coverage after 2029-06-30
current_exposure: service payments-api still uses version 4
interpretation: renewal risk elevated; current contract treatment unresolved
commitment_created: legal review due before 2028-11-01
next_wake: legal-review-completed OR 2028-10-01
provenance: vendor notice, contract v12, dependency snapshot at 14:06Z
model_episode: temporary; not authoritative after completion
```

That record is not the agent's mind.

It is a handoff between minds.

A later model can ask for more history if needed. It does not need to inherit every discarded thought.

This suggests several distinct durable objects that should not be flattened into one generic memory store.

A **mandate** defines why the responsibility exists. It names an owner, the outcome sought, the constraints that dominate optimization, review dates, and the conditions under which the goal expires or suspends. A sentence such as "reduce cost" is not a mature mandate because it contains no answer to the question "at what unacceptable price?"

An **authority envelope** defines what the current agent identity is allowed to do and which powers may be delegated to temporary workers. It should include expiration and escalation rules. Authority is not memory. A model remembering that it once had permission does not mean the permission still exists.

A **world-state reference** says where current truth should be obtained. The ledger should not copy changing reality unnecessarily. If a deployment system is authoritative for what software is live, store the identifier and query the deployment system. If a signed contract is authoritative for commercial terms, preserve the contract reference and version. Memory should help locate truth, not become a stale competitor to truth.

An **event record** captures a consequential change. It should distinguish observation from interpretation. "Payment failed at 14:03" is different from "the bank rejected the payment because the account is frozen." The first may be observed. The second may be a hypothesis.

A **commitment** represents future obligation. Somebody promised something. A review was scheduled. A condition must be checked. A deadline exists. Commitments should have owners and terminal states so that old promises do not become immortal computational ghosts.

A **wake contract** says what future condition justifies renewed cognition. A good wake contract includes source, predicate, earliest useful time, expiration, budget, owner, and what happens if the event is missed. It converts waiting from vague intention into durable machinery.

A **termination record** says how responsibility ends. This is the object most early agent systems omit because ending feels like an operational concern rather than part of intelligence. In a persistent architecture, termination is constitutional state. It should be possible to determine whether the system has completed, been revoked, lost its owner, become obsolete, or transferred responsibility legitimately.

These objects create a useful separation of concerns.

Workflow state answers what must happen next.

Memory answers what past information may be relevant.

Identity answers who is acting.

Authority answers what that identity may do.

Policy answers what no actor may do even if a local objective rewards it.

World state answers what is currently true according to authoritative systems.

Evaluation answers whether the machinery is producing acceptable outcomes.

History answers how the system arrived here.

Collapse these into one prompt and the agent becomes easy to demo and difficult to govern.

The continuity ledger also forces a decision about promotion.

During an invocation the model will generate many candidate beliefs. Most should remain ephemeral. Before a belief becomes durable, the system should ask what status it deserves.

Is it an observation linked to primary evidence?

An inference with confidence and falsification conditions?

A user preference scoped to one domain?

A policy created by an authorized principal?

A temporary plan that should disappear when the episode ends?

A procedural lesson better encoded as a test or tool than as prose?

Promotion is memory admission control.

Without it, temporary speculation slowly becomes institutional fact.

The same discipline applies to deletion.

Deleting a sentence from a vector store is not necessarily forgetting if the idea survives in a summary, a cached embedding, a derived profile, an evaluation set, a downstream policy, or a trigger created because of the original memory.

A continuity ledger should therefore track material derivation where forgetting rights or safety obligations require it.

If a personal preference is deleted, what artifacts still encode it?

If a revoked goal produced recurring schedules, were the schedules canceled?

If a security compromise poisoned a memory, which downstream procedures learned from the poisoned belief?

This is causal deletion rather than textual deletion.

The ledger also makes restart behavior explicit.

Suppose a model sends an external request and crashes before receiving the response.

A weak system wakes a successor and retries.

A mature system records `outcome_unknown`.

The successor reconciles with the external world before acting again.

This one state prevents an enormous class of duplicate consequential actions.

The principle generalizes. Persistent systems should be allowed to represent uncertainty about their own effects.

"I don't know whether my previous self succeeded" is healthier than inventing continuity by assumption.

A useful ledger also records model materiality.

The durable identity may survive model changes, but model changes are not always semantically neutral. If a new model interprets instructions differently, uses tools differently, or has a different tendency toward risk, the same external state can produce different behavior.

So important systems should preserve enough model and harness version information to reconstruct which cognitive environment produced a consequential action.

This does not mean every model upgrade needs to become a public event.

It means material changes need a compatibility story.

Can the successor still honor commitments?

Does it obey the same authority boundaries?

Does it preserve evidence standards?

Does it know how to represent `outcome_unknown`?

Does it pass the failures that became the institution's evaluation suite?

If not, the upgrade is not merely faster cognition. It is a governance change.

The continuity ledger becomes especially valuable when responsibility is transferred.

A successor should not receive one giant export and be told to become the previous agent.

Transfer should be object by object.

Mandates transfer or end.

Permissions transfer or expire.

Commitments acquire new owners.

Triggers acquire new wake targets.

Active hypotheses are either migrated with uncertainty intact or archived.

Policies retain their legitimate issuer.

Historical events remain history rather than being rewritten as the successor's memories.

External parties are notified where identity change matters to reliance.

This is how continuity can survive without pretending nothing changed.

The economic question then becomes visible.

Each durable object creates value and carrying cost.

A mandate may preserve important responsibility, but it requires periodic reauthorization.

A memory may save rediscovery, but it creates privacy and staleness risk.

A trigger creates option value, but it consumes future attention.

An evaluation preserves a hard-won lesson, but it can fossilize yesterday's environment.

A durable identity makes commitments possible, but it becomes a target for compromise.

A simple continuity balance sheet can therefore be useful:

```text
benefit
  avoided rediscovery
+ preserved commitments
+ option value of waiting
+ accumulated local learning
+ coordination savings
+ faster recovery

cost
  memory governance
+ security surface
+ supervision
+ false wakeups
+ migration
+ evaluation maintenance
+ stale-goal risk
+ machine bureaucracy
```

The purpose is not to calculate one perfect number.

It is to force the organization to admit that persistence has operating expense.

If nobody can name the benefit of preserving a piece of continuity, perhaps the default should be expiration.

This leads to one of the most important design defaults for the entire book: **durability should be earned by responsibility, not granted by storage capacity.**

Storage capacity asks, "Can we keep this?"

Responsibility asks, "What future failure occurs if this disappears?"

Those questions produce very different systems.

A continuity review can be remarkably simple if performed regularly.

Ask which active mandates still have accountable owners.

Ask which future wakeups still justify their expected attention cost.

Ask which permissions are broader than current responsibilities require.

Ask which memories are influencing decisions despite weak provenance or old age.

Ask which evaluations represent systems that no longer exist.

Ask which external commitments would become ownerless if the agent vanished today.

Ask whether the agent can be exported without losing the relationships among those objects.

Ask whether it can be stopped without somebody discovering six months later that an old scheduler woke a forgotten descendant.

The mature persistent agent should be able to answer these questions about itself because the architecture has kept them explicit.

That creates a final diagnostic.

Imagine deleting the current model process now.

What happens?

If the answer is "we lose the agent," the system was not truly durable.

Imagine replacing the model with another compatible reasoning engine.

What happens?

If the answer is "we have no idea which commitments survive," the system lacks identity continuity.

Imagine revoking the mandate.

What happens?

If the answer is "the model will probably notice next time," the system lacks termination semantics.

Imagine a user asks to delete an influential memory.

What happens?

If the answer is "we can remove the original row but not its consequences," the system lacks causal forgetting.

Imagine the provider disappears.

What happens?

If the answer is "we can export the transcripts," the system may have data portability while lacking continuity portability.

Imagine nobody wakes the system for a year.

What happens?

If the answer is "nothing, but the responsibility remains legible and the right future condition can still wake it," then the architecture has begun to deserve the name.

The continuity ledger is not intelligence.

It is the structure that lets intelligence die without making responsibility disappear.
