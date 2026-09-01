# 2 — The End of the Session

The session was an implementation detail that became a philosophy.

We learned to think of artificial intelligence as something summoned. Open a window. State a need. Receive an answer. Close the window. Even when context windows grew and agents gained tools, the ritual remained conversational: intelligence arrived when addressed.

Long-running systems invert the ritual.

You leave.

They do not.

## From prompt to mandate

A prompt describes an immediate transformation: summarize this, fix that, compare these. A mandate describes a condition to maintain over time: keep the service healthy, finish the migration, reconcile the accounts, improve conversion without violating these constraints, get this research question to a defensible answer.

Mandates require judgment because the environment changes after delegation.

Suppose an agent receives a mandate to ship a feature. During the night, a dependency releases a breaking change. A test becomes flaky. A competitor launches something similar. A maintainer leaves a review comment. Usage data reveals that the original implementation would harm an important edge case.

A session waits for the human to return and reprompt.

A continuing system has to decide what counts as the same task.

That is agency in a more useful sense than the theatrical one. Agency is not a bot clicking buttons. It is the capacity to preserve an objective through changing local circumstances.

## The unattended interval

The most economically important period in an agent’s life may be the time when no human is watching.

Today, much knowledge work is synchronized to human attention. Projects advance when someone is awake, at a desk, in the meeting, reading the thread, or holding the relevant state in working memory. Organizations compensate with shifts, handoffs, documentation, project management, and hierarchy.

A durable agent creates a new kind of unattended interval. Work can continue while the delegator sleeps, travels, cares for a child, attends another meeting, or simply thinks about something else.

The obvious interpretation is productivity: more progress per human hour.

The deeper interpretation is topology. The shape of organizations changes when attention is no longer the universal bottleneck.

A founder can operate more experiments than she can personally monitor. A scientist can maintain more parallel lines of inquiry than he can consciously rehearse. A small public-interest organization can run processes previously requiring a department.

But unattended work also accumulates unattended error.

The same property that makes continuity powerful makes it dangerous. A wrong answer in a chat is a wrong answer. A wrong objective pursued competently for seventy-two hours is a campaign.

So the end of the session does not eliminate supervision. It forces us to invent supervision that scales with duration.

## Checkpoints, not babysitting

The primitive answer is to watch the agent continuously. That defeats the point.

The better model resembles reliable distributed systems. Define invariants. Bound permissions. Record actions. Make expensive or irreversible steps explicit. Require evidence at checkpoints. Preserve rollback. Escalate anomalies. Let ordinary progress proceed without ceremony.

This is not merely a safety architecture. It is a management architecture.

Human organizations already learned that competent people perform poorly when every action requires permission. The lesson will apply to machine collaborators too. Autonomy is useful only inside a legible envelope.

The session taught us how to ask machines for work.

The next era will teach us how to leave work with them.