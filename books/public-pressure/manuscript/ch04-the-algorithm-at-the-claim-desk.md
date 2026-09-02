# The Algorithm at the Claim Desk

A health-insurance denial is a sentence with consequences larger than its typography.

It may arrive in an online portal. It may be read over the phone. It may be a code attached to a claim. The language is administrative because administration needs repeatable categories: covered, excluded, medically necessary, not medically necessary, in network, out of network, prior authorization required, documentation insufficient.

For the person receiving it, the categories become hours, dollars, pain, transportation, family schedules, and decisions about whether to continue care.

This is why the use of algorithms in health insurance became such an effective symbol of AI backlash. Few other domains combine statistical decision-making, life-changing stakes, opaque institutions, and customers who are often least able to tolerate delay.

Insurance has always depended on abstraction. The entire business converts uncertain future events into pooled financial risk. Actuaries do not know which specific person will have a heart attack next year. They know enough about populations to price a pool. Health plans then operate inside a dense environment of contracts, government programs, medical coding, provider networks, utilization management, fraud controls, pharmacy benefits, and legal duties.

There is no plausible version of modern health insurance without computation.

The dispute begins when computation moves from helping administer a process to acquiring practical authority over an individual case.

That movement is often invisible because software rarely announces a constitutional change. A predictive model may be introduced as a planning tool. It estimates a length of stay or identifies cases requiring review. Managers appreciate the consistency. The estimate becomes a benchmark. Employees are asked to explain deviations. Dashboards are built. A recommendation begins to feel like an expected answer.

The formal policy may still say that a clinician makes the final decision.

The institutional question is how expensive it becomes for the clinician to disagree.

This was the heart of the allegations surrounding nH Predict, a system associated with naviHealth and used in the Medicare Advantage environment. A 2023 lawsuit filed by patients and estates alleged that UnitedHealth entities used the model to push for denials of post-acute care even when treating physicians believed continued care was needed. Reporting by STAT had described internal pressure around the use of the tool. UnitedHealth disputed the allegations and said the system was used to help inform care planning, not to make coverage determinations.

The distinction is not cosmetic. A predictive model that estimates likely recovery is not automatically a denial engine. A recommendation can be useful. Statistical comparisons can help identify unusual cases, allocate care-management resources, and reduce arbitrary variation. An insurer has a legitimate interest in avoiding services that are not covered or medically necessary. Medicare Advantage plans operate under federal requirements rather than in a policy vacuum.

The same facts create the accountability problem.

If a company says the tool is only advisory, the public needs to know what advisory means inside the organization. Are reviewers measured against the model? How often do they override it? What evidence justifies an override? Do supervisors question outliers? Can a patient learn that a model influenced the decision? Does the appeal reviewer see the same model output? Is the model validated on the relevant population? What happens when clinical circumstances differ from the data used to build the prediction?

Those questions are not anti-technology. They are what turns technology into a governed instrument.

A Senate Permanent Subcommittee on Investigations report released in 2024 widened the frame beyond one lawsuit. The majority staff examined prior authorization practices at UnitedHealthcare, Humana, and CVS in Medicare Advantage. According to the report, the insurers denied requests for post-acute care at higher rates than requests for other care, and UnitedHealthcare’s denial rate for post-acute care rose substantially from 2020 through 2022 while the company implemented automation initiatives. The report also described a working group exploring machine learning to predict which denials were likely to be appealed.

An insurer can respond that prior authorization exists precisely to prevent unnecessary care and control costs. That is true. Waste is not imaginary. Overtreatment exists. Billing incentives can encourage volume. Medicare has finite resources even when the federal budget is enormous. Patients do not benefit from every possible intervention merely because a provider is willing to supply it.

The public argument becomes distorted when one side treats every denial as abuse and the other treats every denial as neutral administration.

A denial is a decision about scarcity.

The question is who bears the error when the decision is wrong.

This is where the economics of automation become morally important. Suppose a human review process costs more per case than a model-assisted one. If the model is accurate enough, automation may reduce administrative costs and speed decisions. Those gains are real. But the institution chooses an error distribution. False approvals cost the payer money and may expose patients to unnecessary care. False denials save money in the short run while imposing costs on patients and providers.

The two errors are not symmetrical for the institution.

That asymmetry is what critics fear.

A company does not need to instruct a model to harm patients for incentives to matter. It can choose thresholds that reflect its own costs. It can measure the expense of approved care more easily than the pain of a delayed recovery. It can track claims paid in real time while the social cost of a family member leaving work to care for a patient appears nowhere in the ledger.

Automation can make this asymmetry more efficient.

The problem is familiar outside health care. A fraud-detection system at a bank would rather inconvenience some legitimate customers than permit unlimited theft. A spam filter accepts that some real email will land in junk. A content-moderation system balances harmful material against false removals. Every classifier operates across errors.

Health care makes the stakes unusually hard to hide.

A false positive in a spam filter is irritating. A false denial of necessary rehabilitation can change whether somebody goes home safely.

This does not imply that every high-stakes decision must be made without algorithms. Human decision-makers have biases, fatigue, inconsistent training, incentives, and limited memory. A physician can be wrong. A claims reviewer can be wrong. A human-only system can be opaque too.

The useful contrast is not human versus machine.

It is contestable versus uncontestable.

A decision process can use sophisticated models and still be accountable if the affected person can understand the relevant reason, supply missing evidence, reach a reviewer with authority, and obtain timely correction. A process can be entirely human and still be abusive if the decision is arbitrary and appeal is meaningless.

The emphasis on contestability helps explain why public anger becomes so intense around prior authorization. Time is part of the decision.

A successful appeal after six months may not remedy a six-week interruption in care. A patient may pay out of pocket, go without treatment, discharge earlier than planned, or burden family members while paperwork moves. Administrative friction can function as a substantive outcome even if the formal right to appeal exists.

An appeal is only real if it arrives before the problem has changed shape.

This is one reason regulation has moved toward process standards as well as outcome standards. The Centers for Medicare & Medicaid Services has adopted rules intended to streamline prior authorization and improve information exchange, including requirements around electronic processes and decision time frames for affected payers. The exact scope and implementation dates vary by program. The broader direction is clear: the administrative interface is becoming an object of policy in its own right.

That shift matters for AI governance.

Many proposed AI rules focus on model properties: bias, explainability, accuracy, training data, robustness. Those properties matter. But the person harmed often encounters a workflow, not a model.

The workflow decides whether the person knows a model was used. The workflow decides what evidence can be submitted. The workflow decides whether a human reviewer can reverse the output. The workflow decides whether an explanation contains useful information or generic language. The workflow decides how long the person waits.

A perfect model inside a bad workflow can still produce an unaccountable institution.

A mediocre model inside a well-designed workflow may produce fewer serious harms because human review catches the difficult cases.

This suggests a different way to think about high-stakes AI regulation. Rather than asking only whether the model is accurate, ask what happens after it is wrong.

Every serious system is wrong sometimes.

What matters is whether the organization has budgeted for error.

Companies often budget computationally for error. They set confidence thresholds. They monitor precision and recall. They run evaluations. They create exception logic. They may have excellent internal dashboards.

The affected person needs a social equivalent.

Who owns the exception?

That question is especially important in health care because the decision-maker can become hard to locate. The treating physician knows the patient but may not control coverage. The insurer controls payment but does not provide the treatment. The software vendor built a system but may say it only offers predictions. The government wrote the program rules. The employer or beneficiary selected a plan from available options. An appeal tribunal may eventually have authority over the dispute.

Responsibility is distributed across a chain.

Public pressure simplifies the chain to the insurer because the insurer says yes or no.

The simplification is understandable. It is still incomplete.

A durable reform has to follow the chain instead of only condemning the most visible node. If a vendor sells a model for a high-stakes use, the purchaser needs validation information. If the purchaser configures thresholds, somebody must own those choices. If clinicians are told they retain discretion, the institution should measure whether that discretion exists in practice. If patients have appeal rights, the process should be accessible enough that ordinary people can use it. If regulators mandate coverage rules, those rules need enough clarity that companies cannot hide contested business choices behind “government requirements.”

The public should not need a forensic accounting team to discover who decided.

This is where AI becomes less a technology problem than an institutional-design problem.

The model is attractive because it makes a messy world legible. Patients differ. Recovery times differ. Facilities differ. A prediction compresses complexity into a number, a range, or a recommendation. Institutions need compression because they cannot re-litigate first principles for every case.

The danger begins when the compression is mistaken for the patient.

The distinction sounds obvious. It is not easy to maintain inside scaled operations.

Metrics develop authority because they allow comparison. If one reviewer approves twice as many days of post-acute care as another, a manager can ask why. The manager may be right to ask. Variation can indicate bad practice. But once a benchmark exists, the direction of explanation matters. Does the reviewer have to justify exceeding the model while nobody has to justify following it? If so, the system has a default.

Defaults are policy.

They are also difficult to see from outside.

This explains part of the emotional force of the phrase “denied by AI.” The phrase may overstate the autonomy of the technology in a particular case. But it describes an experience of asymmetric authority: the patient is expected to explain why the system is wrong while the system does not have to explain why it is right.

That is not an inevitable property of AI.

It is a design choice.

A more accountable system would reverse some of that burden in high-risk cases. It would identify when automated tools materially influenced a decision. It would preserve the input data and policy criteria. It would make override rights explicit. It would route medically unusual cases to qualified reviewers rather than treating unusualness as evidence against the patient. It would audit for systematic differences across populations. It would study appeals not merely as administrative costs but as information about original-decision quality.

Most importantly, it would treat reversal as feedback.

Institutions often treat appeals as a separate process. The original system decides; the appeal system cleans up. That separation wastes information. If certain types of decisions are repeatedly reversed, the institution has learned something about the first system. A high reversal rate in a category should trigger investigation even if only a small fraction of people appeal.

Otherwise the people who persist subsidize the accuracy of everyone else.

There is a deeper economic point here. Friction can be profitable even without anybody deliberately designing it as a trap. If appealing is costly, some people will stop. The institution saves the cost of correcting decisions that remain unchallenged. This creates an incentive to underinvest in easy recourse.

Public pressure changes the calculation by making unresolved friction reputationally expensive.

A viral denial can cost more than an ordinary appeal. A congressional investigation can cost more than a better portal. A lawsuit can force discovery into internal processes. A murder followed by widespread public anger can make executives worry about personal security.

These are terrible and inefficient mechanisms for routine quality control.

The goal should be to make them unnecessary.

The health-insurance case therefore offers a general lesson for AI backlash. People are less likely to revolt against automation when automation is obviously subordinate to accountable human authority.

They revolt when the machine appears to have authority and the humans appear to have excuses.

That perception can be wrong in an individual case. It can still reveal a design failure. If an institution cannot tell the affected person who decided, why, and how to appeal, it has created an accountability vacuum.

Vacuum attracts narrative.

The critic says the algorithm is denying care to save money. The company says the algorithm does not make decisions. Both statements can miss the institutional middle where software, policy, incentives, and human discretion combine.

That middle is where regulators, journalists, courts, and companies should look.

The public should look there too.

A CEO is not sitting at the claim desk.

Neither is an autonomous machine.

The claim desk is a system of people and software built to make a large number of consequential decisions under financial constraints.

The proper target of public pressure is not the face at the top or the model in the server room.

It is the rule that determines what happens when the two disagree.

A useful way to audit that rule is to follow one hypothetical difficult case through the institution without assuming either good faith or bad faith. A patient leaves the hospital after surgery and needs rehabilitation. The treating team expects recovery to take longer than an ordinary case because of complications. A planning model predicts a shorter stay based on population data. The insurer’s reviewer sees the prediction, the medical record, the benefit terms, and internal guidance.

At this moment the model has not denied anything.

The institution has created a disagreement.

The first governance question is what the reviewer sees. Does the software present a prediction with uncertainty or a single expected date? Does it explain which factors mattered? Does the reviewer know the system performs less well for unusual clinical profiles? Is the treating physician’s assessment displayed with equal prominence, or buried in a document repository while the model output sits at the top of the screen?

Interface design can create authority before policy does.

The second question is what the reviewer is measured on. If performance is evaluated partly by how closely decisions track the model, “clinical discretion” has a price. If managers examine every override but never examine routine agreement, the organization has created one-way scrutiny. The worker will learn the real policy even if the handbook says judgment is independent.

The third question is what the patient receives. A useful denial explanation should identify the applicable coverage rule and the reason the evidence did not satisfy it. A useless explanation recites a category. “Not medically necessary” may be technically descriptive while telling the patient almost nothing about what evidence could change the decision.

The fourth question is what happens when the treating team responds. Can new information enter? Is there a peer-to-peer review with someone qualified to understand the case? Does that reviewer have authority to depart from the original recommendation? How quickly does it happen? Does the patient know the route without hiring help?

The fifth question comes after reversal. Suppose the denial is overturned. Does the organization record why? Perhaps the prediction failed because the patient had an uncommon comorbidity. Perhaps documentation was missing. Perhaps the reviewer misapplied a coverage rule. Perhaps the treating physician supplied new evidence that did not exist at the first decision.

These causes should not be treated the same.

A missing-document reversal suggests an information-flow problem. A repeated model failure suggests a validation problem. A policy misapplication suggests training or quality control. A genuinely new fact may mean the original decision was reasonable when made.

An appeals system that only records “reversed” throws away the distinction.

This is where AI can improve accountability if institutions choose to use it that way. Models can cluster reversal reasons, identify repeated missing-data patterns, flag categories with unusually high disagreement, and help reviewers retrieve the relevant policy language. Automation can make the exception system more capable instead of only making the first decision faster.

The business case may be less obvious because better appeals do not generate revenue in the same visible way as lower administrative cost. Their benefits appear as fewer bad decisions, less provider friction, fewer complaints, lower litigation risk, better regulatory relationships, and trust that is difficult to price.

That is why governance has to force the cost into view.

Boards and regulators can ask for appeal volumes, timeliness, reversal rates, and the reasons behind reversals. Companies can compare units and model versions. Researchers can examine aggregate patterns where data can be shared lawfully. Patients can receive clearer notices.

None of this proves that a particular denial was wrong.

It creates an institution capable of learning when denials are wrong.

There is another uncomfortable issue: patients and providers also have incentives. Providers are paid for care. Hospitals can prefer longer or more intensive treatment. Patients may understandably want every plausible option covered. Fraud exists. Documentation can be incomplete. An accountable process cannot simply replace insurer skepticism with provider deference.

That is why independent evidence matters.

The goal is not to privilege whichever human stands closest to the patient. It is to create a decision process in which competing incentives can be examined under rules that do not quietly favor the actor controlling the software.

This is the difference between human review and independent review.

A reviewer can be human and still be institutionally captured by the same target, metric, and chain of command as the first decision. The meaningful question is whether the review introduces a different authority or evidentiary perspective.

In some cases that may be another internal clinician with genuine independence. In others it may be an external review organization, administrative process, regulator, or court. The appropriate layer depends on the dispute.

The principle is that consequential decisions should not become immune merely because the first institution has checked its own work.

Health insurance makes this obvious because the stakes are intimate. The principle travels far beyond it.

A bank freezes an account after a fraud model flags a transaction. A platform removes a worker after an identity system fails. An employer rejects an applicant after a screening score. A government agency questions eligibility after anomaly detection.

Each institution can say the model is only one input.

The public should ask the next question.

What power does the person have when that input is wrong?

That is where the claim desk becomes a constitutional problem in miniature.

Not because an insurer is a government.

Because every large automated institution eventually has to decide whether the people inside its error rate are cases to process or persons entitled to an answer.