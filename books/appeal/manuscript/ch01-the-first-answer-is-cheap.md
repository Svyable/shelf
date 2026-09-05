# Chapter 1 — The First Answer Is Cheap

There used to be a person between you and no.

Not always a wise person. Not always a kind one. Sometimes not even a particularly attentive one. But a person usually had to do something before an institution could refuse you. Open the envelope. Read the application. Check a box. Compare a number with a table. Look at the photograph. Decide whether the claim fit the policy. Type a code into a terminal. Sign a line.

The labor mattered because it constrained the institution.

A bank could make only as many fraud decisions as its systems and staff could process. A benefits office could adjudicate only as many files as its employees could move. A publisher could reject only as many submissions as someone could at least route into the right pile. A company could screen only as many applicants as its recruiters and software could handle. Even a bureaucracy famous for saying no had a physical limit on the number of times it could say it.

Computation changed the cost curve.

A modern decision can be the last instruction in a long software pipeline. Data comes in, rules fire, models score, thresholds are crossed, and an action happens. A transaction is blocked. A post disappears. An account is limited. An application falls below a cutoff. A claim is flagged. A person can be moved from eligible to ineligible without any individual having experienced the decision as an event.

The first answer becomes cheap.

That is mostly good news.

Cheap decisions mean an institution can answer faster. Routine approvals need not sit in a queue because a clerk is sick. Obvious errors can be caught before money moves. Straightforward claims can be paid without making a person plead their case. People can apply at midnight instead of during office hours. A small organization can provide services that once required a large back office. Automation is not merely a way to reject at scale. It is also a way to approve at scale.

But every cost reduction changes what becomes expensive next.

When making the first decision becomes cheap, the hard case moves downstream.

The difficult applicant is still difficult. The unusual transaction is still unusual. The medical record that does not fit the expected pattern still requires attention. The account that looks fraudulent for three good reasons and legitimate for a fourth still has to be understood. The person whose life is poorly represented by the available fields still arrives at the same institutional boundary.

The routine case disappears into software.

The remainder becomes the work.

This is the beginning of the appeal age.

## The denominator problem

People like accuracy rates because accuracy compresses complexity into a number.

A system that is 99 percent accurate sounds excellent. In many settings it is excellent. A one-percent error rate may be a dramatic improvement over the process it replaced.

But accuracy has a denominator.

At one thousand decisions, one percent means ten errors.

At one million, it means ten thousand.

At one hundred million, it means one million.

Scale performs a strange conversion. It turns rare mistakes into ordinary workloads.

This is why the quality of a mass decision system cannot be understood from its first-decision accuracy alone. You also need to know what happens to the people in the error term.

Can they recognize the mistake?

Can they challenge it?

Can the institution identify what kind of error occurred?

Can someone with authority correct it before the damage becomes irreversible?

The million wrong answers in a 99-percent-accurate system are not an argument against the system. They are an argument for building the second system at the same time as the first.

We rarely do.

The first system gets the budget because it promises scale. The second system looks like overhead.

The first system is a product. The second is support.

The first system has a launch date. The second gets a queue.

The first system is measured in throughput. The second is measured in backlog.

This is how an institution can become more accurate and less humane at the same time. Its aggregate performance improves while the experience of being the exception gets worse.

The exception used to encounter a person because every case encountered a person. Now the ordinary case glides through and the exception collides with machinery designed to avoid human attention.

That is not an inevitable result of automation. It is a design choice hidden inside a budget.

## Cheap no, expensive why

There are two different costs in a decision.

The first is the cost of reaching an answer.

The second is the cost of making the answer accountable.

Those costs once traveled together because the same person often did both. A loan officer could tell you why the application failed. A supervisor who rejected a request could be asked what would change the answer. A clerk who found a missing form could point to the blank line.

Automation can separate them.

A system may be able to reject a million cases cheaply while still finding it expensive to produce a useful explanation for one contested case. A model can rank risk without naturally expressing the institutional rule that should govern a borderline example. A rules engine can return an error code that is technically accurate and practically useless. A fraud system can know that five features looked unusual without knowing which fact a customer could provide to resolve the concern.

The answer becomes cheap before the why does.

This matters because an appeal requires a theory of change.

A person cannot meaningfully challenge a decision if the institution cannot say what it decided or why. “Our systems detected unusual activity” is a notification, not a map. “You do not meet our criteria” describes the outcome without exposing the criterion. “This decision was made according to policy” says only that the institution possesses a policy.

A usable reason does not need to reveal every fraud rule, model weight, protected signal, trade secret, or internal control. Some systems would become easier to game if they explained themselves with perfect granularity. But there is a large distance between perfect transparency and administrative fog.

The challenger needs enough information to identify a possible error.

Wrong person.

Wrong date.

Missing document.

Duplicate transaction.

Outdated diagnosis.

Policy misapplied.

Evidence ignored.

Identity mismatch.

Threshold crossed for a reason that is no longer true.

If an institution cannot convert its decision into contestable reasons, it has made a one-way machine.

That is often where the real expense begins. The system must reconstruct a decision after the fact, locate the data that produced it, preserve the relevant version of the rule, retrieve the evidence available at the time, and place the case in front of someone empowered to do more than repeat the output.

A cheap first answer can create an expensive second question:

**What happened here?**

## The appeal gap

Call the difference between an institution's capacity to make first decisions and its capacity to reconsider contested ones the **appeal gap**.

A small appeal gap means the institution can reconsider roughly in proportion to the number and stakes of the decisions it makes. A large appeal gap means the institution can produce consequences much faster than it can investigate challenges to them.

The gap is not measured only in time.

It appears in channels. A system can decide automatically but require a phone call to appeal.

It appears in evidence. A system can use hundreds of internal data points to decide but give the challenger a text box to respond.

It appears in expertise. A model can make domain-specific determinations continuously while appeals are routed to general customer support.

It appears in authority. The person answering the appeal may be able to apologize without being able to reverse the action.

It appears in memory. The first system may preserve every event that fed a score while the appeal team receives only the final score.

It appears in incentives. The first team may be rewarded for reducing fraud while the second is rewarded for reducing handling time.

It appears in architecture. The same software that made the decision may be asked to review the decision.

That last version is becoming increasingly important.

If a model rejects a case and a second call to the same model is asked whether the rejection was correct, the institution has created repetition, not independence. Randomness may produce a different answer. A longer prompt may produce a better explanation. But the existence of two outputs does not by itself create an appeal.

A genuine second look requires some meaningful difference: a different reviewer, a different source of evidence, a different standard, a different model, a different incentive, a different level of authority, or a different opportunity for the affected person to participate.

Otherwise the system is checking whether it agrees with itself.

Most systems do.

## Millions of second looks

Platform moderation makes the scale problem visible because the numbers are so large.

The European Union's Digital Services Act requires large online platforms to provide internal complaint mechanisms for certain moderation decisions. The law is unusually explicit about the design: decisions on complaints cannot be made solely by automated means; they must be taken under the supervision of appropriately qualified staff. Users can also take some disputes to certified out-of-court bodies.

The mechanism has produced a vast natural experiment in second decisions.

European Commission reporting says that since 2024 users have appealed more than 165 million moderation decisions made by very large online platforms and search engines through their internal complaint systems. Almost 30 percent of those decisions were reversed.

Take a moment with that number.

It does not mean the platforms were simply wrong 30 percent of the time. Appeals are a selected sample. People challenge some decisions and ignore others. New information can appear. Policies can be interpreted differently. Reversals can reflect procedural correction rather than a catastrophic first-pass error rate.

Still, millions upon millions of outcomes changed after someone asked for another look.

The second system was not ceremonial. It altered reality.

The same Commission reporting says that in the first half of 2025, certified out-of-court dispute bodies reviewed more than 1,800 disputes involving Facebook, Instagram, and TikTok, and reversed more than half of the closed cases in that smaller sample.

Again, selection matters. People who escalate a case outside the platform are not random users with random disagreements. But that is precisely what appeals are for. They concentrate attention on cases in which the first mechanism may have failed, the stakes feel high enough to continue, or the rule is genuinely contestable.

An appeal system should look different from the population it reviews.

If it does not, it may not be finding the edge cases.

## The reversal rate trap

Once appeals exist, institutions are tempted by another seductive number: reversal rate.

A low reversal rate can be interpreted as proof that first decisions are excellent.

Or proof that the appeal process is useless.

A high reversal rate can be interpreted as proof that first decisions are poor.

Or proof that the appeal system is successfully catching exactly the cases it was designed to catch.

The number cannot answer the question by itself.

Suppose an institution makes ten million decisions and only one thousand are appealed. Ten appeals succeed. A one-percent reversal rate sounds reassuring until you discover that the process is so difficult that almost nobody reaches it.

Now suppose another institution makes the same number of decisions and receives one hundred thousand appeals. Forty thousand succeed. A forty-percent reversal rate sounds alarming until you discover that the first system is designed to make rapid provisional decisions under uncertainty, while the appeal stage deliberately gathers additional evidence. The high reversal rate may be part of the architecture.

The useful questions are more granular.

What types of errors produce reversals?

Which groups appeal, and which do not?

How long does correction take?

What happens while the appeal is pending?

Are reversals concentrated in a particular model, office, policy, vendor, rule, or category?

Does the institution feed what it learns back into the first-decision system?

A mature appeal system is not merely a rescue mechanism. It is a sensor.

It shows where the institution is confused.

Every successful appeal contains information about the boundary between rule and reality. A missing document reveals a collection problem. A frequently misapplied policy reveals a training or interpretation problem. A cluster of identity mismatches reveals a data-quality problem. Reversals from an outside reviewer reveal a gap between institutional practice and external standards. A flood of appeals after a model update can reveal regression before an aggregate metric does.

If the institution treats appeals only as cases to close, it throws away the most expensive feedback it receives.

## Decision factories

The industrial age produced factories for physical goods.

The computational age is producing factories for decisions.

Some are obvious. Credit scoring. Fraud screening. Content moderation. Advertising auctions. Insurance claims. Eligibility systems. Hiring filters. Security systems. Recommendation engines that do not look like decisions until you notice that what is never recommended is effectively excluded.

Others are hidden inside ordinary software. A scheduling system decides which worker receives which shift. A marketplace decides which seller appears first. A hospital system prioritizes which message is urgent. A school platform decides which alert reaches a parent. A procurement tool decides which supplier requires scrutiny.

The more decisions a system produces, the more important its correction path becomes.

Industrial factories learned to think about defects because defects multiplied with volume. They built inspection, sampling, process control, recalls, warranties, and root-cause analysis. The lesson was not that every product must be perfect before it leaves the line. The lesson was that scale requires an organized theory of error.

Decision factories need the same thing.

But a defective decision differs from a defective screw.

The person affected may know something the institution does not.

That makes participation part of quality control.

A person can say: that is not my transaction. That address is ten years old. That medical code does not describe what happened. That photograph is mine. That account belongs to me. You matched me to someone with the same name. You used the wrong tax year. The document you say is missing is in your own portal. Your rule has an exception. The deadline was tolled. The context changes the meaning.

The edge case can speak.

An appeal system is what happens when an institution builds a place to listen.

## The scarce second decision

As artificial intelligence becomes capable of performing more of the clerical and analytical work inside institutions, the first-decision bottleneck will continue to shrink.

An agent can read forms, compare policies, query databases, draft notices, flag inconsistencies, and recommend outcomes. A fleet of agents can do those things in parallel. The institution can become astonishingly responsive at the front door.

That responsiveness creates an expectation.

If the first answer arrived in twelve seconds, why does correction take twelve days?

The answer may be legitimate. The second decision may require evidence from another party, an independent expert, a hearing, a statutory waiting period, or a reviewer who is intentionally insulated from the first system. Speed is not the only value.

But sometimes the answer is simply that the institution automated the authority and not the accountability.

It built the accelerator before the brakes.

The great opportunity of the next decade is not to make appeals disappear by pretending automated systems will become perfect. They will improve. Some will become extraordinarily accurate. None will abolish disagreement, incomplete information, policy ambiguity, data error, changing circumstances, or the need to apply general rules to specific lives.

The opportunity is to make the second decision a first-class system.

That means preserving the record needed to reconstruct an automated decision. It means generating reasons that can actually be contested. It means designing routes for new evidence. It means identifying which cases need a different human, a different model, an independent institution, or a temporary pause in enforcement. It means using reversal data to improve the first pass. It means allocating review capacity according to stakes rather than annoyance.

Most of all, it means recognizing a new economic fact.

When answers become abundant, reconsideration becomes scarce.

The institution of the future will not earn trust merely by deciding quickly.

It will earn trust by showing that speed has not made its decisions impossible to challenge.

The first answer is getting cheap.

The second answer is where the institution will prove what it is worth.
