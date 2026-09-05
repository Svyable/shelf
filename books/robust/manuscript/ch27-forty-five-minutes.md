# Forty-Five Minutes

Forty-five minutes is long enough to make coffee.

Long enough to commute across a small city.

Long enough to sit through the first half of a meeting that should have been an email.

It is also long enough for an automated system with the wrong authority to threaten the existence of a company.

On August 1, 2012, Knight Capital’s automated trading systems began sending erroneous orders into U.S. equity markets. The Securities and Exchange Commission later described millions of erroneous orders flowing into the market during a forty-five-minute window. The firm suffered losses of roughly $440 million.

The number is dramatic.

The mechanism is more useful.

The system could act faster than the organization could understand what it was doing.

That mismatch is now becoming ordinary outside finance.

AI agents can take actions at machine speed in domains that previously moved at human speed.

They can change records. Send messages. Open and close tickets. Modify code. Approve routine transactions.

Buy advertising. Schedule work. Issue refunds. Move inventory. Trigger other software.

Call other agents.

The exact capability matters less than the shape of the risk.

Once a system can act, a bad judgment is no longer one bad answer.

It is a stream.

## Intelligence is not a risk limit

People naturally expect a more capable system to make fewer bad decisions.

That may be true on average.

It does not solve the control problem.

A highly capable system can still misunderstand an objective, receive corrupt context, hit an untested edge case, call the wrong tool, operate with stale permissions, or continue confidently after the environment changes.

The question for an acting system is therefore not only:

How often is it wrong?

It is also:

How much can happen while it is wrong?

That is a different design variable. A trader can have a capital limit. A payment system can have transaction caps. A database credential can be read-only.

A deployment agent can be restricted to staging.

A support agent can issue credits only below a threshold.

A marketing agent can spend only within a daily budget.

A procurement agent can prepare an order but not commit above a material amount.

These controls are valuable because they do not require the system to recognize its own mistake.

The model does not need to become wise at the exact moment it fails.

The boundary is already there.

## Authority should be smaller than confidence

This sounds conservative until you notice that bounded authority enables more autonomy.

Imagine two companies deploying the same agent.

Company A gives the agent broad permissions because the model looks excellent in testing. Every consequential action goes through a manager afterward because leadership is nervous.

Company B gives the agent narrower permissions. It can resolve low-value cases automatically, cannot exceed transaction limits, cannot alter protected fields, and escalates when a case crosses defined boundaries. Within that envelope, no manager approval is required.

Which company is more automated? Probably Company B. It has turned risk into architecture. Company A has turned risk into attention. Attention is scarce.

Architecture scales.

A bounded system can run quickly because the cost of being wrong is capped.

That changes the economics of delegation.

The point is not to find the maximum authority the AI deserves.

The point is to find the minimum authority required for the useful work.

This is the principle of least privilege translated from security into agency.

If the system needs to draft, give it draft authority.

If it needs to update one field, do not give it the database.

If it needs to spend fifty dollars, do not give it fifty thousand.

If it needs customer history, do not give it every customer’s secrets.

If it needs to deploy one service, do not give it production-wide credentials.

Every unnecessary permission is a way for an ordinary mistake to become an extraordinary one.

## The problem with the kill switch

Organizations love the phrase *kill switch*.

It sounds decisive.

If something goes wrong, we will shut it down.

Maybe.

A kill switch works only if four things are true.

Someone knows the system is wrong.

Someone has the authority to stop it.

The stopping mechanism works.

And the organization can act before the damage exceeds its tolerance.

Each condition is harder than it sounds.

Detection can lag.

Responsibility can be ambiguous.

Operators can hesitate because they do not know whether a strange pattern is a failure or a legitimate new behavior.

The system can be distributed across queues, scheduled jobs, tool calls, external vendors, and downstream automations that continue after the original agent stops.

The switch can stop new actions without reversing old ones.

A person can have authority on paper and still be afraid to use it because halting a revenue-critical workflow is career-threatening.

A kill switch is therefore not a substitute for bounded authority.

It is the last line behind it.

The better architecture assumes the switch will be late.

What protects the system during those minutes?

## Rate is a permission

One of the simplest AI controls is also one of the least glamorous.

Rate. How many actions per minute? How many customers per hour? How many dollars per day? How many records per batch?

How many tool calls before a checkpoint?

Rate limits are often treated as infrastructure constraints.

They are also governance.

A system that may send one hundred messages before review has different authority from a system that may send one million.

The model can be identical.

The prompt can be identical.

The permission surface is not.

This gives teams a powerful way to increase autonomy gradually.

Start with a small action budget. Observe. Measure. Expand as evidence accumulates. If performance degrades, contract the budget.

Authority becomes adjustable rather than philosophical.

Instead of arguing whether an AI system is “ready for autonomy,” ask whether it is ready for one hundred reversible actions under observation.

Then one thousand.

Then a larger class of cases.

This is autonomy as a control loop.

## Consequence classes

Not all actions deserve the same boundary. A robust organization classifies them by consequence. Class One: cheap, visible, reversible. Drafting an internal summary. Tagging a support ticket.

Suggesting code changes in a branch. Scheduling a tentative meeting. These can often move quickly. Class Two: externally visible but recoverable. Sending a routine customer response.

Issuing a small credit. Publishing a low-risk content change. Updating a noncritical record.

These may need monitoring, caps, and sampling rather than constant approval.

Class Three: consequential and partially reversible. Changing pricing. Committing meaningful spend. Deploying production code. Approving a contract variation.

Changing access permissions.

These deserve tighter authority, stronger evidence, and clearer escalation.

Class Four: hard to reverse or high impact.

Moving substantial funds.

Terminating access at scale.

Making decisions with legal rights attached.

Taking physical-world actions where failure can harm people.

These should not inherit the control model of Class One simply because the same AI can technically perform them.

Capability is not the classifier.

Consequence is.

## The danger of inherited credentials

Many AI systems become powerful accidentally. The agent runs inside an employee’s account. The employee already has broad access. So the agent inherits it. This is convenient.

It also collapses the distinction between what the human may do and what the automation should be able to do unattended.

Humans and agents have different failure shapes.

A human may be slower, inconsistent, distracted, or malicious.

An agent may be fast, replicable, credulous toward bad context, or capable of repeating the same mistaken action perfectly across a huge set.

The permission system should recognize the difference.

Do not ask only, “Can this employee do this?”

Ask, “Should a machine acting with this employee’s identity be able to do this ten thousand times without another signal?”

Often the answer is no.

That does not mean the agent is untrusted.

It means scale changes what trust means.

## Stop the stream, not the thought

When people fear AI mistakes, they often respond by slowing the reasoning process.

More prompts.

More internal checks.

More model calls to critique the first model.

More chain-of-thought-like scaffolding.

More human review.

Some of that can improve quality.

But acting systems need another category of control: stop the stream.

Even if the model remains confused, prevent confusion from propagating indefinitely.

Limit the transaction. Limit the duration. Limit the scope. Limit the customer cohort. Limit the credential.

Limit the blast radius.

The elegant thing about these controls is that they remain useful even as models improve.

A future model may be far more reliable than today’s.

It will still encounter bad data.

It will still operate inside software that can fail.

It will still face ambiguous goals.

It will still act in an environment where prices, laws, people, and downstream systems change.

High intelligence does not repeal the value of bounded consequence.

## A forty-five-minute test

Take your most autonomous AI workflow. Imagine it is wrong for forty-five minutes. Not malicious. Not spectacularly insane.

Just consistently wrong in a way your normal monitoring does not immediately identify.

What can it do? How many records can it touch? How many people can it contact? How much money can it spend? How many deployments can it make?

How many other systems can it trigger? How much evidence will survive?

How quickly can a human understand the pattern?

What action can stop it?

Which consequences remain after it stops?

If the answer is “enough to threaten the company,” you do not have an AI problem.

You have an authority problem. The model may deserve more trust tomorrow. The boundary should still exist today. Robust autonomy is not autonomy without limits.

It is autonomy whose limits are designed before the forty-five minutes begin.
