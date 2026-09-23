# The Fundamental Problem

Causation begins with a story we cannot watch twice.

A patient takes a drug and recovers. Did the drug cause the recovery? A student enters a new program and graduates. Did the program change the outcome? A city changes a policing policy and crime falls. Did the policy do it? A company hires an unconventional candidate who becomes a star. Did the hiring decision reveal talent the old process would have missed, or did the person land in an unusually good team?

For each question, the comparison we want is unavailable. We would like to rewind the same person, the same city, the same company, the same moment, change one decision, and run the world again.

Reality offers no rewind button.

The potential-outcomes tradition in causal inference handles this problem by being strict about what a causal claim means. Imagine that each person has an outcome under treatment and an outcome under no treatment. The causal effect for that person is the difference between those two potential outcomes.

The definition is clean. The observation is impossible.

At a given moment, the person receives the treatment or does not. One potential outcome becomes factual. The other remains counterfactual.

Paul Holland's 1986 paper “Statistics and Causal Inference” gave the dilemma a durable name: the fundamental problem of causal inference. The problem survives more data, more computation, better sensors, and larger models because it is not a storage problem. It is a property of time.

We live one history.

The practical achievement of empirical science is that this impossibility does not prevent useful causal knowledge. We cannot observe both outcomes for the same person, but under the right design we can learn about effects across comparable groups.

Randomized assignment is powerful because the assignment mechanism can make treatment independent of the characteristics that would otherwise influence the outcome. With enough units and competent execution, the treated and control groups become credible stand-ins for the impossible two histories.

We cannot clone a person, so we create a comparison.

That logic supports clinical trials, field experiments, agricultural research, online A/B tests, and many policy evaluations. It also has boundaries. Randomization can be undermined by noncompliance, attrition, spillovers, measurement error, weak execution, small samples, or behavior changed by the experiment itself. Some treatments cannot ethically be randomized. Some interventions operate at a scale where there are few comparable units. Some outcomes take decades. A trial can also test a version of a program so unlike ordinary deployment that the result answers a narrower question than the policy debate assumes.

Causal inference is not a machine that turns random numbers into truth.

It is a discipline of comparisons.

That distinction matters because prediction and causation are easy to blur once a model enters a decision process.

A prediction asks what outcome is likely given what we know. A causal question asks what would change if we did something different. The two can inform one another, but they are not interchangeable.

Suppose a model accurately predicts which hospital patients physicians are likely to test. That may tell us a great deal about physician behavior and patient presentation. It does not, by itself, tell us which patients would benefit from being tested. Suppose a model predicts which job applicants the company is likely to hire. That does not tell us who would succeed if hired.

A model can become exquisitely accurate at forecasting an institution while offering little guidance about whether the institution should behave differently.

The distinction becomes operational the moment prediction is used as policy.

Consider a simplified lender. For an applicant, one question is what happens if credit is extended. Another is what happens if it is not. The lender cares particularly about repayment under lending, but repayment can be observed only when a loan exists. The declined applicant does not carry a hidden repayment label waiting to be read later.

This does not mean the lender should approve risky loans at random to satisfy a methodological ideal. Credit can help or harm. Product terms matter. Consumer-protection rules matter. Capital constraints matter. An unaffordable loan is not a harmless experiment.

The fundamental problem does not dictate the remedy.

It tells us what the evidence cannot establish by itself.

That is already useful because institutions often turn an identification problem into a confidence problem. The approved portfolio repaid at a certain rate, therefore the approval rule worked. The tested patients had certain outcomes, therefore the testing threshold was appropriate. The admitted students graduated at a high rate, therefore the admissions system selected well.

Each statement can contain real information. None displays the missing comparison.

A good selection process should produce a strong selected group. That is what selection is intended to do. The difficult question lives near and beyond the line: what would have happened under the alternative action?

Researchers look for places where reality gives them a usable comparison despite the missing counterfactual. A threshold can create one. If treatment changes sharply at an exam score, age cutoff, eligibility date, risk score, vote margin, or income limit, cases just above and below the boundary may be much more comparable than cases far apart. Regression discontinuity designs exploit that structure under assumptions.

Natural experiments look for assignment variation produced by events or rules that are plausibly unrelated to the potential outcomes except through the treatment. Instrumental-variable designs use a source of variation that changes treatment and, under strong conditions, affects the outcome through that treatment. Matching and weighting methods try to construct comparability from observed characteristics. Difference-in-differences designs use changes over time and between groups under assumptions about how their outcomes would otherwise have evolved.

The methods differ. The underlying task is the same: find a credible comparison for the history we cannot rerun.

The phrase “under assumptions” deserves more respect than it usually receives.

Every causal design has a bridge between the observed comparison and the claim we want to make. Randomization provides one kind of bridge. A discontinuity requires confidence about behavior around the cutoff. An instrumental variable requires assumptions about how the instrument works. Observational adjustment depends on whether the important confounders have been measured well enough. Difference-in-differences depends on a defensible account of the untreated trend.

The assumptions are not an embarrassment to hide in an appendix.

They are part of the result.

This becomes important when a causal estimate moves into a predictive system. A study may identify an average effect in one population while a model is asked to make decisions for individuals in another. The original effect can be real and still conceal heterogeneity. Some people benefit more, some less, some may be harmed. A treatment evaluated in one hospital, company, city, school system, or decade may behave differently when the population, delivery system, incentives, or technology changes.

Identification and transport are separate problems.

First ask whether the study identifies the effect it claims in the setting it studied. Then ask whether that result should travel to the decision now being made.

Prediction interfaces make the second step look deceptively automatic. Variables enter. An estimate comes out. The current person or place appears to have received a personalized answer.

Causal knowledge is less obedient.

A tutoring program shown to work when delivered by trained staff may not have the same effect when scaled through a workforce with less support. A diagnostic threshold evaluated in one hospital may behave differently where prevalence, referral patterns, or laboratory capacity differ. A hiring intervention in one occupation may not generalize to another where the work and applicant pool are different.

The answer is not to refuse generalization. Institutions have to generalize or they cannot act.

The discipline is to keep the conditions attached to the result.

What population generated the estimate? What version of the intervention was delivered? What outcome was measured? Over what horizon? Under what capacity constraints? What assumptions made the comparison credible? Which parts of the current case lie outside that support?

A causal result without its conditions can become another form of false precision.

The potential-outcomes language can feel bloodless because it compresses lives into symbols. Yet it contains a useful restraint. It refuses to pretend that we know what would have happened to one person under an alternative simply because we know what happened to other people who resemble them.

That restraint matters more as predictive systems become persuasive.

A model can produce a probability to several decimal places. A risk system can rank thousands of people. A recommendation engine can estimate engagement for millions of items. The numerical surface creates a sense that uncertainty has been converted into knowledge.

Sometimes it has.

Sometimes uncertainty has merely been sorted.

A ranking is not a counterfactual.

If a hiring model gives one candidate a score of 0.78 and another 0.61, the scores may reflect genuine predictive differences for a defined historical outcome. They do not reveal the exact performance either person would achieve in the job. They do not tell us how a manager, training program, team, or changing market would alter that performance. They do not tell us how deployment of the score will change the applicant pool that later models see.

This is not an argument against scores. A calibrated probability can be far better than intuition. Human beings rank people with less transparency every day.

The error is granting a useful estimate a metaphysical status it never earned.

Potential outcomes force attention back to the missing branch.

That becomes particularly important when the decision changes the person or object being evaluated.

Education is a clean example. A placement does not merely reveal a student's fixed ability. The class teaches. Peers matter. Expectations matter. Curriculum differs. Remediation can change course sequences and time to degree. Placement into a more advanced course can expose a student to different material and different expectations.

Hiring works the same way. Employee performance is not a sealed property carried into the firm. It depends on role fit, manager quality, onboarding, assignments, opportunity, and whether the organization trusts the employee with meaningful work. Creditworthiness is not perfectly fixed before credit; the size, price, and structure of the loan can influence the borrower's financial path. Health outcomes change after diagnosis and treatment. Cultural preference can be shaped by exposure rather than merely revealed by it.

Selection can change what is selected.

This creates a second danger beyond the missing outcome for the rejected option. Institutions may misunderstand the observed outcome for the accepted option by treating it as pure revelation.

A company says its hiring process identifies high performers. Perhaps it does. The company may also help create high performance by concentrating mentoring and high-value assignments on the people it chose. A university says admitted students succeed. Many do, and the university's resources are part of the reason. A platform says users prefer the content it ranks highest. They may, while ranking itself changes what users notice long enough to develop or express a preference.

The outcome is real. Its causal interpretation is less simple.

That complicates flattering institutional stories. It also complicates pessimistic ones. If a group has historically produced worse observed outcomes, the difference may reflect preparation, selection, unequal support, environment, measurement, or some combination. Prediction can identify the pattern without locating its cause. Turning the pattern directly into policy can then preserve the circumstances that produced it.

Imagine a company that believes graduates of one school perform well. It recruits there heavily. Those hires enter with a large peer cohort, alumni mentors, and managers familiar with the curriculum. Graduates from another school arrive rarely and without the same support. Historical performance differs. A model learns that school and correlated features are predictive.

Was the original belief correct? Did the recruiting system create part of the performance difference? Did applicant quality differ? Did managers assign work differently? Did the first few hires simply have unusual outcomes?

The observed history may not separate those stories.

An institution can be data-rich and causally poor.

The population itself can also respond before a formal decision is made.

If a company becomes known for hiring only one profile, other candidates may stop applying. If a college signals that admission is unlikely, students may self-select out. If a lender's application process feels intrusive, some borrowers leave before a score is created. If a public benefit develops a reputation for denial, eligible people may never apply.

The potential-outcomes framework begins with units and possible treatments. Real institutions can influence which units enter the frame.

The population becomes partly endogenous to policy.

That means an evaluation restricted to the people who remained can miss another causal effect: who disappeared before evaluation began.

A recruitment policy can change employee outcomes and applicant composition. An admissions policy can change student success and application behavior. A benefit design can change outcomes among recipients and take-up among eligible people. A recommendation policy can change user behavior and which creators continue producing work for the platform.

The institution has to know which question it is asking.

Did the treatment help the people who received it? Did the policy change who received it? Did the policy change who sought it? Did it change behavior before selection? Did scale alter implementation? Did the measurement rule change after treatment?

These are distinct causal questions even when a dashboard compresses them into one measure called impact.

This is one reason scale deserves its own skepticism. A policy can have a causal effect under a carefully run trial and a smaller effect when ordinary organizations implement it. The second result does not erase the first. It tells us that the delivery system is part of the treatment.

A program is not only its written protocol. It is also staffing, training, incentives, compliance, timing, local adaptation, and the surrounding institution.

Once those conditions change, “the same policy” may no longer be the same causal object.

The same problem appears in predictive deployment. A model can be validated under one decision process and then inserted into another. A score that used to inform a human reviewer becomes an automatic cutoff. A recommendation becomes a mandatory queue. Capacity expands. The threshold changes. The label definition changes. The model name stays the same while the policy around it changes substantially.

Evaluation therefore needs policy lineage, not just model lineage.

What action did the score actually trigger? What discretion remained? Which cases were reviewed? Which outcomes became observable? What changed between versions?

Without that record, later analysts can mistake a policy shift for a change in the population or in model quality.

None of this means institutions should wait for perfect causal knowledge before acting. Perfect causal knowledge is generally unavailable, and decisions have deadlines.

The mistake is to treat the need to decide as evidence that uncertainty has disappeared.

That matters politically and ethically because people experience decisions individually while institutions learn statistically. A patient wants the right test for this body today. A job candidate wants a fair chance at this job. A borrower wants a decision on this loan. Researchers often estimate average effects across populations.

The gap cannot be solved by vocabulary.

Randomization can be scientifically elegant and personally difficult. If two treatments are genuinely in equipoise, a trial may be ethical and valuable. If one treatment is already known to be better, random assignment can be wrong. If several grant proposals are all judged worthy and cannot be reliably separated within reviewer noise, a lottery may be defensible. If one proposal is clearly incompetent, adding it to the draw in the name of exploration would be absurd.

The boundary work comes first.

The information value of an action is only one value among many. Safety, dignity, legality, consent, distributive fairness, privacy, and cost matter independently.

The fundamental problem of causal inference is therefore not a command to experiment.

It is a warning against pretending the alternative is known.

Once that warning is taken seriously, ordinary management language changes.

“We know this kind of candidate doesn't work here” becomes a question about how many comparable candidates were ever hired, under what roles and managers, and with what support.

“We know these applicants are bad credit risks” becomes a question about what repayment evidence exists beyond the historical approval boundary and under which products.

“We know users don't want this content” becomes a question about exposure, rank, and the behavior the interface made possible.

“We know this policy won't work” becomes a question about whether a credible comparison has ever been produced.

Sometimes the more careful sentence supports the same decision. It is still better because it separates evidence from the policy conclusion drawn from it.

That separation matters when automated systems enter the room. Models are often built to answer the question the available labels can support, then deployed to answer the question the institution actually cares about.

A model predicts retention; leaders infer contribution. A model predicts default under historical lending; leaders infer risk for a new applicant population. A model predicts test ordering; administrators infer clinical need. A model predicts clicks; designers infer preference. A model predicts which research proposals resemble previous winners; a funder may infer scientific value.

Each translation can be useful.

Each contains assumptions.

The dangerous moment is when the assumptions disappear because the score is convenient.

A careful decision system can preserve distinctions that the interface would otherwise erase. It can say whether a number is a prediction or a treatment-effect estimate. It can mark when a case lies outside strong historical support. It can retain the population and policy under which the estimate was identified. It can record the outcome horizon. It can distinguish an action from the later outcome and both from the causal claim made about the action.

These practices sound modest compared with building a new model.

They prevent enormous category errors.

There is one more way decisions distort causal memory. Thresholds create names: approved and declined, admitted and rejected, tested and untested, funded and unfunded. Those categories are operationally necessary. After a while, however, the decision category can begin to look like a description of the person or project.

The rejected applicant becomes a “non-hire.” The declined borrower becomes “high risk.” The untested patient becomes “low concern.” The unfunded proposal becomes “low priority.”

The category may summarize a defensible action. It does not reveal the potential outcome under the action not taken.

This matters when records travel farther than the decision that created them. A later manager sees the disposition without the uncertainty around it. A future model ingests the category as a feature. A dashboard counts the result cleanly while forgetting that the case sat one point below the threshold.

The institution has converted a choice into a fact.

Historical decisions do become part of the world. A denial can alter later behavior. A placement changes coursework. A diagnosis changes treatment. A previous funding decision shapes a laboratory's capacity. Decision history is real causal history.

But causal history is not intrinsic identity.

Keeping those objects separate requires provenance: what rule applied, what evidence was available, how uncertain the estimate was, whether the case sat near a boundary, whether policy later changed, and whether outside outcomes became visible.

Without provenance, yesterday's policy can harden into tomorrow's ground truth.

The better the decision system becomes, the easier this can be to miss. Cleaner categories and higher predictive performance make later users less likely to ask how the labels were produced.

The remedy is not generalized distrust.

It is disciplined memory.

A decision is an action taken under uncertainty. An outcome is what followed. A causal claim is an argument about what would have changed under another action.

The three objects are related.

They are not the same thing.

The missing potential outcome never disappears. Good research makes the comparison more credible. Good institutions preserve enough context to know what the comparison can support. Good prediction can improve decisions enormously without abolishing the counterfactual.

We cannot watch two histories for the same person.

We can build systems that remember this before one observed history is mistaken for the only history that could have happened.