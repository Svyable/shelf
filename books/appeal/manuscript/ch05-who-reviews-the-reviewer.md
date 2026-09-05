# Chapter 5 — Who Reviews the Reviewer

The easiest way to build an appeal system is to add a second inbox.

The hardest part is making the second inbox matter.

A person challenges a decision. The challenge is routed to a reviewer. The reviewer opens the same file, sees the same evidence, reads the same policy, works for the same manager, uses the same software, and knows what the first reviewer decided.

They affirm.

Was that an appeal?

Maybe.

A second person can catch an obvious mistake. Experienced reviewers can notice details novices miss. Internal consistency has value. Organizations should not need a separate supreme court for every billing dispute.

But the architecture carries a risk: the second reviewer inherits the first decision before they inherit the case.

The first answer becomes an anchor.

That is why the central question in appeal design is not simply whether someone reviewed the decision.

It is **what was different about the review**.

## Independence has dimensions

People often imagine independence as organizational distance.

Inside versus outside.

Employee versus contractor.

Agency versus court.

Company versus regulator.

That matters, but independence is multidimensional.

A reviewer can be outside the organization and still depend on it financially.

A reviewer can be inside the organization and still possess strong structural protection from the first decision-maker.

A judge can be institutionally independent and still review under a deferential legal standard.

A specialist panel can be highly independent in expertise while seeing exactly the same evidence.

A second AI model can be technically separate while sharing nearly every source of failure with the first.

It helps to break independence into parts.

### Personnel independence

Is the reviewer a different person or system?

This is the most obvious form.

### Hierarchical independence

Does the reviewer report through a different chain of authority, or is the first decision-maker their subordinate, peer, or manager?

### Incentive independence

Is the reviewer rewarded for the same outcomes as the first team?

A fraud team measured on loss prevention and an appeal team measured on restoring legitimate customers face different pressures. Two teams measured on minimizing payouts may not.

### Evidentiary independence

Can the reviewer gather or accept information the first process did not have?

### Method independence

Does the reviewer use a different analytical process, model, standard, or perspective?

### Institutional independence

Can a body outside the original organization review the decision?

### Authority independence

Can the reviewer reverse the first decision without obtaining permission from the person or team whose work is being reviewed?

These dimensions can be mixed.

An internal higher-level reviewer may have strong authority independence and weak institutional independence. A court has high institutional independence but may be limited to a record created below. An external medical reviewer may bring expertise and distance while remaining bounded by governing coverage standards.

The point is not to maximize every dimension.

The point is to choose the dimensions that break the likely source of error.

## The psychology of agreement

Appeal systems have to contend with a human fact: seeing an answer changes how we evaluate the question.

Once a first decision exists, the second reviewer does not encounter a blank case. They encounter a proposition with institutional weight.

Denied.

Fraudulent.

Ineligible.

Not covered.

Violating policy.

The label organizes attention.

A reviewer looking at an account already labeled “suspicious” may interpret ambiguous behavior as evidence of suspicion. A medical reviewer who sees “not medically necessary” before reading the record may unconsciously look for reasons supporting the denial. A supervisor reviewing an employee's decision may know that reversal creates extra work or reflects poorly on the team. A judge reading a lower court's findings encounters a record already shaped by what the first forum thought mattered.

Law has spent centuries inventing standards of review partly because the second decision should not always pretend the first never happened.

Sometimes deference is appropriate.

The trial judge saw the witnesses. The agency has technical expertise. The first decision-maker had discretion entrusted to them by law. The appellate role is not to replace every judgment with another judgment.

At other times, the reviewing body considers a question anew.

The distinction is called *de novo* review in legal settings: from the beginning, without deferring to the prior conclusion on the issue being reviewed.

You do not need the Latin to see the design question.

Should the reviewer ask:

**Was the first decision reasonable?**

Or:

**What is the right decision?**

Those questions can produce different answers from the same record.

## Why deference exists

It is tempting to think that appeals should always start fresh.

That would be wasteful and sometimes less accurate.

The first forum may possess information the second cannot reproduce.

A trial court sees live testimony. A local office may understand conditions that a central reviewer does not. A frontline specialist may know operational facts that a distant appeal unit lacks. A platform's safety team may possess threat intelligence that cannot be fully exposed without compromising security. A clinician may have examined the patient directly.

Appeal is therefore not a simple hierarchy in which the higher level is presumed wiser.

Different levels are good at different things.

This is one reason appellate courts generally do not retry every factual question from scratch. Their role includes correcting legal error, enforcing procedural rules, developing consistent doctrine, and reviewing the record under standards that allocate responsibility between levels.

Deference is a division of labor.

But deference becomes dangerous when it is used as a substitute for review.

A reviewer who begins and ends with “the first team followed procedure” may never confront whether the procedure produced the wrong result.

A company can create an appeal unit that mostly checks whether the original decision falls within policy rather than whether the policy was correctly applied to the person.

An automated review can confirm that the first model behaved as designed while ignoring that the design itself fails on this category of case.

The deeper question is always: **What kind of error is the appeal empowered to correct?**

## The same model twice

Artificial intelligence makes reviewer independence newly strange.

Suppose a model evaluates an application and recommends denial.

The applicant appeals.

The institution asks the same model, with the same evidence and the same policy prompt, to determine whether the denial should be reversed.

The second call returns denial.

The institution now has two decisions.

It does not necessarily have two judgments.

The second output may differ because language models are stochastic, because the prompt includes the fact of appeal, or because the model is asked to critique itself. Self-critique can improve performance on some tasks. Multiple passes can catch mistakes.

That is valuable quality control.

It is not automatically appellate independence.

If the same blind spot generated the first answer, the same blind spot may survive the second. If the first model misunderstood a document, the second may misunderstand it again. If both calls retrieve the same incomplete record, no amount of reasoning fixes missing evidence. If the policy prompt encodes the wrong interpretation, the system can be internally consistent and externally wrong.

Now change the design.

A second model receives the original evidence *plus* the appellant's challenge and is instructed to identify the strongest plausible error in the first decision.

Better.

Use a different model family trained or evaluated differently.

Potentially better again.

Give the second system access to source documents rather than the first model's summary.

Better.

Blind it initially to the first conclusion so it forms an independent view before comparing.

Better.

Allow it to request missing evidence.

Better.

Route high-stakes disagreement between the two systems to a qualified human reviewer with authority to reverse.

Now we are approaching an appeal architecture.

The point is not that humans are magically independent or machines are not. Humans share biases too. The point is to design the second layer so it can fail differently.

## Blind review

One way to reduce anchoring is to hide the first answer temporarily.

Medicine, science, hiring, auditing, and competitions use forms of blinding for related reasons. If the reviewer can evaluate the underlying material without knowing the original conclusion, their first impression is less likely to be organized around defending or attacking it.

Appeal systems could use staged review.

First, the reviewer examines the evidence and forms an independent view.

Then the system reveals the original decision and the appellant's arguments.

The reviewer compares.

This will not work everywhere. An appellate legal argument is necessarily about what happened below. A reviewer may need to know the reason for denial to understand which evidence matters. Operational constraints can make double review too expensive.

But blinding is useful as a design thought experiment.

Ask what information the reviewer truly needs at each stage.

Do they need the first decision's conclusion?

Do they need its confidence score?

Do they need the name or performance history of the first reviewer?

Do they need to see the model's recommendation before reading the source evidence?

Information can improve judgment.

It can also bias it.

Review architecture chooses the order.

## Independence and expertise pull apart

The farther a reviewer sits from the original institution, the more independent they may become.

They may also know less about the system.

This is a persistent tradeoff.

An internal appeal team understands the company's policy, software, terminology, and operating constraints. It can often retrieve records quickly and implement a reversal immediately.

An external body may bring neutrality but spend time learning context. It may interpret a policy differently because it lacks the tacit knowledge employees share. It may not be able to see protected internal signals. Its remedy authority may be limited.

Courts face the same tension when reviewing specialized agencies. Agencies possess expertise; courts possess independence and legal authority. Administrative law is full of doctrines that negotiate the boundary.

There is no universal optimum.

A good system layers expertise and independence.

Routine factual corrections can stay internal.

Hard disagreements can move to a specialized higher level.

Conflicts over rights, law, institutional self-interest, or systemic policy may require an external forum.

The structure should become more independent as the type of dispute demands it.

## Reviewers need protection too

An appeal system can promise independence and undermine it through management.

Imagine a reviewer who is formally allowed to reverse any case but whose performance review punishes high reversal rates.

Imagine an external contractor paid by the case whose contract depends on keeping the client satisfied.

Imagine a moderation review team told that restoring too much content will increase safety incidents for which the team will be blamed.

Imagine a claims reviewer whose bonus is tied to overall cost containment.

Imagine a public adjudicator facing a crushing quota that makes deep reconsideration professionally dangerous.

Authority on paper is not independence in practice.

Reviewers need enough institutional protection to disagree.

That may mean separate reporting lines, tenure-like protections in some adjudicative roles, transparent standards, randomized assignment, conflict rules, stable funding, or metrics that reward accuracy and explanation rather than a preferred outcome.

The reviewer must be permitted to produce an inconvenient answer.

Otherwise the appeal system is theater with stationery.

## The reviewer who can only recommend

One of the most revealing questions in any appeal is what happens after the reviewer says the first decision was wrong.

Can they fix it?

Or can they only recommend that someone else fix it?

Recommendation can be appropriate. Oversight bodies sometimes lack direct enforcement power by design. Advisory opinions can influence policy even without binding effect. Ombuds offices often resolve problems through persuasion rather than command.

But the user should know the difference.

A binding reviewer is part of the decisional chain.

A recommending reviewer is part of the accountability ecosystem.

Both can matter. They do different work.

The Meta Oversight Board is interesting partly because Meta committed to treat the Board's decisions on specific content cases as binding within the framework it created, while the Board's broader policy recommendations have a different status. The design separates the power to decide an individual case from the power to reshape the entire system.

That separation appears elsewhere.

Courts can reverse cases and, through precedent, influence future decisions.

Administrative appeals can correct individual benefits while also identifying policy problems.

External medical review can bind an insurer in a case while regulators separately set broader rules.

The reviewer's remedy determines whether appeal is correction, advice, or both.

## Who reviews the reviewer?

Every hierarchy eventually encounters the child's question.

Who checks them?

A supervisor checks the employee.

Who checks the supervisor?

An appeals unit checks the supervisor.

Who checks the appeals unit?

An independent body checks the company.

Who checks the independent body?

A court checks the agency.

Who checks the court?

Another court.

Who checks the highest court?

At some point, the formal answer is no one in the same way.

There may be legislation, constitutional amendment, political accountability, professional discipline, public criticism, later cases, internal rehearing, or historical judgment. But the review chain ends.

This is not a flaw unique to appeals.

It is the reason appeal design cannot be reduced to adding layers.

The goal is not infinite oversight.

The goal is to allocate enough independent judgment at the right points that the final answer deserves its authority.

The last reviewer does not become infallible because nobody can reverse them.

They become final because the system must eventually act.

That is why the quality of the reviewer matters so much.

The higher the finality, the greater the need for independence, explanation, and procedure before the door closes.

## The independence test

A simple way to evaluate an appeal system is to imagine the original decision-maker strongly wants the decision to stand.

What prevents that preference from controlling the appeal?

A different reviewer?

A different reporting line?

A different standard?

A transparent record?

An external institution?

A binding rule?

A right to introduce evidence?

A court?

Public reasons?

Random assignment?

Nothing?

The answer reveals the structure.

Then imagine the opposite.

The challenger is persistent, angry, politically powerful, wealthy, famous, or unusually good at attracting attention.

What prevents pressure from forcing an undeserved reversal?

The same appeal system has to resist both capture by the first decision-maker and capture by the challenger.

Independence is not friendliness to appeals.

It is freedom to decide differently for a reason.

That is what the second look is for.

Not agreement.

Not reversal.

Judgment that has enough distance from the first judgment to count.
