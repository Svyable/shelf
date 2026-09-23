# When Fairness Requires Curiosity

Fairness is usually discussed as a property of decisions.

Did two similar applicants receive similar treatment? Are error rates different across groups? Does a score use protected characteristics? Does a policy impose unequal burdens? Is the allocation rule transparent? These are essential questions.

There is another fairness question that arrives one step earlier.

Who has been observed enough for the system to know what “similar” means?

The hiring study from Chapter 6 makes the problem concrete. In the Fortune 500 recruiting setting studied by Danielle Li, Lindsey Raymond, and Peter Bergman, a conventional supervised-learning model would have selected a much smaller share of Black and Hispanic applicants for interviews than human recruiters did. An exploration-oriented upper-confidence-bound model would have selected a much larger share. The mechanism was not a separate demographic target. The exploration model valued uncertainty, and underrepresented groups were less densely represented in the historical training data.

Historical exclusion had an epistemic afterlife.

The firm knew less about some applicants because people with similar backgrounds had received fewer opportunities to generate the labels the firm used.

This creates a fairness problem that static parity metrics do not fully capture.

Suppose two groups receive identical thresholds today, but one group's score estimates are based on abundant historical evidence and the other's on sparse evidence created by earlier exclusion. Formally equal treatment of the point estimates may preserve unequal uncertainty.

The system can say, “We use the same rule for everyone,” while applying the rule with very different knowledge.

Curiosity becomes relevant because one way to reduce that inequality is to generate better evidence.

This idea is dangerous if stated lazily. People from underrepresented groups are not research subjects whose purpose is to improve an employer's model. A company cannot justify discriminatory burden by calling it exploration. Fairness law and ethics do not disappear when information has value.

The claim is more constrained.

When an institution is already allocating scarce but beneficial opportunities among plausible candidates, and when historical selection has created uneven information, a policy that always exploits current point estimates can perpetuate the informational effects of past exclusion. An exploration-aware policy may sometimes improve both learning and access.

The action matters.

An interview is a good example because it is an opportunity and an information-gathering stage. Offering more interviews to plausible but uncertain candidates can benefit those candidates while teaching the firm. A dangerous medical intervention would be completely different. Uncertainty about a group would not justify exposing that group to extra risk for the sake of evidence.

The fairness of exploration depends on whether the exploratory action itself is beneficial, burdensome, risky, or scarce.

This distinction prevents a common mistake in algorithmic ethics: treating every domain as though the same mathematical correction carries the same moral meaning.

In lending, expanding credit to poorly understood applicants can widen access but can also create debt harm. In education, a more ambitious placement can open opportunity but can also set a student up for an avoidable struggle if support is absent. In recommendation, showing unfamiliar content is low stakes. In clinical trials, informed consent and equipoise are central. In research funding, a lottery distributes opportunity among proposals already judged worthy.

Same exploration logic. Different ethics.

Fairness also requires attention to who pays for information.

If a platform explores by showing a user a slightly less relevant song, the user pays a few seconds. If a firm explores by assigning an uncertain employee to a stretch project, the employee may gain opportunity but also carry career risk. If a government pilots a policy in one community, residents may bear costs that later communities avoid.

A system can create collective learning by concentrating burden on individuals.

That is not automatically fair just because the experiment improves future decisions.

The history of research ethics exists partly because societies learned this lesson brutally. Scientific value cannot be used as a blanket justification for treating people as means. Modern experimentation requires consent, review, risk limits, and special protections in many settings.

The unobserved-world thesis must live inside that inheritance.

There are, however, many fairness gains available without imposing extra risk.

One is to distinguish uncertainty from negative evidence. If a model has low confidence because a population is poorly represented, the system can route cases to human review, collect additional noninvasive information, use work samples, widen an interview stage, or seek external data rather than automatically rejecting.

Another is to audit outcome coverage. Which groups have labels? Which groups disappear at each gate? Does a model's apparent accuracy vary because some outcomes are less observable? Are there populations for whom the system mainly records rejection and rarely records downstream performance?

Coverage is a fairness metric hiding in plain sight.

An institution cannot evaluate error equally where it does not observe outcomes equally.

This is especially important in algorithm audits. Analysts often compare false positives and false negatives across groups. To compute those rates, ground truth must be available. If labels are selectively observed, the audit can inherit the selection problem.

The fairness evaluation itself may be blind where the decision system was blind.

That does not make auditing futile. It means auditors should examine label generation as part of the system.

Who received follow-up? Who was tested? Who was hired? Who obtained the product? Which rejected cases later produced external outcomes? Are missing labels correlated with the protected groups under review? What assumptions are required to estimate performance outside the observed sample?

These questions are less visually appealing than a fairness dashboard.

They are often more fundamental.

Label coverage can be mapped like infrastructure.

An institution can identify where outcomes are dense, where they are sparse, and where they are unavailable by design. It can compare coverage across groups without pretending that more data is automatically fairer. It can ask whether sparse coverage reflects privacy choices, low participation, historical exclusion, operational constraints, or the decision rule itself.

The explanation changes the remedy.

If outcomes are sparse because people lawfully declined data collection, the answer may be to accept uncertainty. If outcomes are sparse because the institution rarely offers a beneficial opportunity to one group, the answer may be to reconsider the gate. If outcomes are sparse because people receive the opportunity elsewhere, data linkage or external evidence may help. If the action is dangerous, the answer may be better modeling or research under formal ethical oversight rather than broader exposure.

Fairness begins to look less like one metric and more like an evidence map with moral boundaries drawn on it.

This does not make it vague.

It makes the questions explicit.

The education experiment in Chapter 9 demonstrates why. Selective labels materially affected prediction error for English in the studied colleges but had almost no effect for math. An auditor who assumes the same missingness problem has the same size everywhere could overcorrect one domain and undercorrect another.

Fairness requires curiosity about the mechanism, not only commitment to a metric.

This is one reason algorithmic fairness can become frustratingly plural. Different definitions conflict. Equalized error rates, calibration, demographic parity, individual fairness, procedural fairness, and causal notions answer different questions. There is no single mathematical switch that produces justice in every setting.

The temptation is to retreat into technical nihilism: if fairness is complicated, perhaps nothing can be done.

That would be a mistake.

Complication means institutions must state which harms they are trying to prevent and which uncertainties remain.

The exploration perspective adds a temporal dimension. Fairness is not only whether today's decisions satisfy a condition. It is whether today's decisions create a world in which tomorrow's system can know more fairly.

A static policy can be fair by its metric and still freeze historical ignorance.

Imagine an employer removes race and gender from a model and applies one threshold to everyone. The system satisfies a formal notion of identical treatment. If historical data on some backgrounds is sparse, the model's errors may remain uneven. Because the model continues to select mainly familiar candidates, the data imbalance persists.

The policy is procedurally uniform but epistemically stagnant.

An exploration-aware system could create more observations in uncertain regions. That can reduce uncertainty over time. The policy may begin with unequal information and move toward more equal information.

This is fairness as learning.

The idea has an uncomfortable implication: sometimes treating everyone identically today can preserve unequal knowledge inherited from yesterday.

That sentence can be misused to justify arbitrary preferences, so it needs discipline. Any departure from equal treatment should have a lawful, transparent, evidence-based rationale. The institution should be able to explain the objective, the boundary, the duration, and the measure of success. Exploration should not become a permanent loophole.

A learning policy should learn enough to change.

If an exploration bonus remains attached to a group forever, either the institution is failing to learn or the bonus is serving another policy goal that should be named honestly.

The goal is not permanent uncertainty.

It is to stop uncertainty from being self-reproducing.

Temporary learning policies need stopping conditions for the same reason experiments do.

What evidence would show that the information gap has narrowed? What performance measure matters? When will the policy be reviewed? Who can end or revise it? How will the institution distinguish a genuine reduction in uncertainty from simply collecting more of the same selected labels?

Without those conditions, “exploration” can become a moral vocabulary attached to ordinary discretion.

With them, it can be audited.

Auditability matters because the people subject to a decision should not have to trust the institution's internal story about its intentions. A company may believe it is broadening interviews to learn about overlooked talent. Applicants experience an opaque screening process. A school may believe a placement trial is generating useful evidence. Students experience the consequences of the placement.

Procedure has to be legible from outside.

That can mean published eligibility rules, appeal channels, notice when an automated system materially influences a decision, independent review, documented reasons for overrides, or aggregate reporting on who passes through each stage. The exact requirements depend on domain and law. The principle is that a learning objective does not cancel due process.

Appeal is itself an evidence channel.

A person who challenges a decision can surface missing context, data errors, category mistakes, or consequences the model did not observe. An appeal system is often described only as a right or error-correction mechanism. It is also a structured stream of contradictions.

Institutions should learn from the pattern of appeals, not merely resolve them one at a time.

If one subgroup appeals more often and wins more often, that can indicate a systematic information problem. If career changers repeatedly supply work evidence that reverses screening decisions, the model may be overusing pedigree. If patients repeatedly produce external records that change risk classifications, data integration may be weak. If applicants misunderstand eligibility, the problem may be communication rather than prediction.

The appeal reveals where the official observation process is incomplete.

This is fairness through contestability.

The institution remains allowed to decide. The affected person retains a route to add evidence the system did not possess. That route is especially valuable when the underlying model is powerful because high predictive performance can make organizations less willing to entertain exceptions.

Confidence can harden into procedural arrogance.

A fair learning system preserves some mechanism by which a person can say: you do not have the right evidence about me.

This is not the same as giving every claimant the outcome they want. Many appeals will confirm the original decision. The value is that the institution allows its map to be challenged by direct evidence.

This is where fairness and efficiency can align more often than public debate suggests. In the hiring study, the exploration model did not simply trade quality for demographic diversity. The authors' analyses found that the machine-learning approaches identified candidates with stronger estimated hiring potential than human recruiters, and they found no evidence that the exploration model's diversity gains came at a substantial cost in hiring yield relative to the supervised model.

Again, this is one firm's data. It should not be generalized carelessly.

But the mechanism makes sense. If historical underrepresentation means the firm has overlooked some high-quality candidates, exploration can find both diversity and value.

Fairness can reveal market inefficiency.

This possibility is particularly important because opponents of fairness interventions often assume every gain for an underrepresented group must be paid for through lower performance. That assumption treats the historical selection process as already efficient.

If the old process had blind spots, there can be gains left on the table.

The reverse is also possible. Exploration may reveal real performance gaps under the current environment. A serious institution then has to ask whether the gap reflects preparation, job design, evaluation bias, unequal support, or something else. The evidence may justify changing recruiting, changing training, changing the workplace, or changing the model.

Exploration supplies a question. Governance chooses the response.

There is another fairness issue beyond group representation: the right to be legible on terms other than historical similarity.

Prediction systems naturally reward people whose histories resemble known success. A person with a novel background can be disadvantaged because the institution has no category for them. This is not always a protected-class problem. It affects immigrants, career changers, self-taught workers, people with interrupted careers, founders from new industries, patients with rare presentations, and students from uncommon educational pathways.

Modern societies celebrate mobility while building prediction systems from stable categories.

That tension deserves attention.

A fair society should have some institutions capable of evaluating people through direct evidence rather than pedigree alone.

Work samples do this. Exams can do it, though they have their own limits. Auditions do it. Trials and probationary stages can do it when properly designed. Portfolios do it. Open competitions do it. These mechanisms create fresh labels closer to the capability of interest.

They reduce dependence on historical proxies.

Direct evidence also shifts some power away from the institution's inherited dataset.

A résumé says where a person has been. A work sample shows something they can do now. A prior diagnosis says what another clinician observed. A current test can produce new information. A school transcript records past opportunities; a demonstration can reveal present capability. Neither form of evidence is perfect, but the second gives the individual a chance to create a label the historical system did not supply.

That chance can matter deeply in a world of predictive gatekeeping.

The more powerful predictive models become, the more valuable these direct-observation channels may be. Otherwise, a model can infer likely performance from background so efficiently that the institution has less incentive to actually test performance.

Prediction can replace audition.

That is efficient until the proxies become the gate and the gate prevents the institution from discovering people who violate the proxies.

Curiosity is the counterweight.

It asks for one more measurement before a permanent conclusion when the cost is reasonable and the evidence is thin.

It asks whether a group is scoring poorly or merely poorly observed.

It asks whether a fairness audit can see outcomes outside the selected sample.

It asks who bears the cost of learning.

It asks whether today's equal rule is helping tomorrow's evidence become more equal.

It also asks what must remain off limits.

There are forms of information an institution may want and should not have. An employer could potentially predict behavior from intimate personal data. A lender could seek ever more invasive signals. A platform could infer private traits to reduce uncertainty. More information might improve prediction and still make the system less fair because the method of acquiring it violates privacy, dignity, or appropriate boundaries.

Fairness therefore cannot be reduced to equal information.

Sometimes justice requires equal respect for what will remain unknown.

The proper objective is not to make every person maximally observable. It is to prevent the institution from turning its own uneven history of observation into an unquestionable hierarchy of human potential.

These questions do not settle political disagreements about fairness. They improve the factual ground on which those disagreements occur.

A fair system cannot promise that everyone will receive the same outcome.

It can do better than converting the consequences of past exclusion into a permanent claim about future potential.

The most important safeguard may be to separate exploration that benefits the person from exploration that primarily benefits the institution.

An additional interview, a work sample, or a second review can plausibly create value for both sides. The person receives another route to be evaluated; the institution receives better evidence. A risky treatment given mainly to reduce model uncertainty is different. So is a burdensome administrative process imposed on one community because the agency wants cleaner data. The symmetry of the mathematics can hide an asymmetry of benefit.

A fair learning policy should name that asymmetry before acting.

Who receives the upside if the exploration succeeds? Who bears the downside if it fails? Can the individual decline without losing an unrelated benefit? Is the exploratory action itself something a reasonable person could want? Could the institution obtain similar information through a less burdensome route? Are the people asked to generate evidence also likely to share in the improvement that evidence produces?

These questions move the discussion away from abstract curiosity and toward reciprocity.

Reciprocity matters because institutions can otherwise create an extraction problem. A disadvantaged group supplies the uncertainty, the institution supplies the experiment, and future applicants receive the benefit. The people who paid the cost may never see the gain.

Sometimes that temporal mismatch is unavoidable. Public health and infrastructure policy often produce benefits over long horizons. But where the exploratory action is discretionary, a just institution should prefer designs that produce immediate or near-term value for the participants as well as information for the system.

This is one reason beneficial intermediate stages are so important. An interview can reveal a candidate. A tutoring intervention can help a student while testing a placement assumption. A second clinical opinion can improve care while generating disagreement data. A small business advisory program can support a borrower while the lender learns about a thin-file segment. The action does not have to be pure measurement.

Learning can be embedded in service.

There is another safeguard: do not let group-level uncertainty erase individual evidence.

Suppose an institution identifies a population as poorly represented in its historical data. That can justify inspecting the gate. It does not justify treating every member of the population as equally unknown. One person may have unusually strong direct evidence. Another may be well represented by relevant features despite belonging to a broadly underrepresented group. A fairness intervention that operates only at coarse group level can create a new stereotype in the name of correcting an old one.

Curiosity should increase resolution, not decrease it.

The practical goal is to find where the model's confidence is unearned and create better evidence there. Protected-group analysis may be necessary to discover those regions, especially when past exclusion tracks protected status. But the learning mechanism should remain attentive to the individual and the actual source of uncertainty.

This becomes more important when models are opaque. A system can report a precise score without making clear whether the precision comes from rich evidence about the person or from strong correlations learned elsewhere. Two identical scores can carry different epistemic histories.

A fairness audit should therefore be interested not only in error rates but in support.

How much relevant evidence lies near this decision? How often has the institution observed similar cases under comparable conditions? Is the score extrapolating from a thin region? Did the person have a route to supply direct contradictory evidence? Does the institution know when it is making a high-confidence decision on low-support data?

Support is not a substitute for fairness law or moral judgment. It is a way to expose when a confident system is standing on a narrow floor.

The stopping rule deserves equal attention.

Exploration should end not merely when a metric improves, but when the institution can articulate what changed in ordinary practice. If a broader interview policy shows that a credential was unnecessarily restrictive, the credential screen should change. If an appeal channel repeatedly reverses a certain category of decision, the first-line process should improve. If direct work evidence consistently outperforms a proxy, the proxy should lose power.

Otherwise the institution learns at the edge while preserving the same gate in the center.

That is not fairness as learning.

It is fairness as permanent exception management.

The stronger ambition is to make yesterday's exception become tomorrow's ordinary case when the evidence warrants it.

Curiosity earns its place in fairness only if it reduces the amount of unjustified curiosity the system needs later. The institution should become less surprised by people it once failed to see.

That is how learning becomes more than observation.

It becomes repair.