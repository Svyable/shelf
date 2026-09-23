# Every Choice Deletes a Dataset

Imagine a company with two hundred applicants for ten jobs. The company keeps careful records. It knows where each applicant studied, what they have done before, how they performed on assessments, which recruiter reviewed them, who received an interview, who received an offer, who accepted, how long each hire stayed, and how managers eventually rated their work.

After several years, the file is enormous. It looks like an ideal training set.

There is one column the company cannot fill.

How good would the rejected applicants have been if the company had hired them?

The blank is not an accident. It is produced by the decision itself. An applicant who never joins the company cannot generate an internal performance review. No later accounting system can recover that missing outcome exactly. Some rejected applicants will work elsewhere, and fragments of their careers may become visible. But the employer does not observe the comparison it most wants: what would this person have done here, in this role, with this manager, if the earlier decision had gone the other way?

The company learns from its hires. It does not learn symmetrically from the people it refuses to hire.

The same structure appears elsewhere. A lender approves a loan and later sees whether it is repaid. Decline the application and there is no repayment outcome for that loan because the loan never exists. A doctor orders a diagnostic test and receives a result. Do not order it and the same diagnostic label may never be produced. A judge releases a defendant and can observe whether that person returns for court. Detain the defendant and the system cannot observe whether that person would have returned if released.

These domains have different laws, ethics, incentives, and remedies. They share an informational structure: the action determines whether the label appears.

Machine-learning researchers call one version of this the selective labels problem. The phrase is useful because it shifts attention from the model to the process that created the dataset. The missing information is not merely a clerical gap. It reflects an earlier selection rule.

Ordinary missing data is everywhere. A survey respondent skips a question. A sensor fails. A record is lost. Selective labels are different because the missingness is entangled with the decision we later want to evaluate. The system learns from a world that earlier decisions helped produce.

In a 2017 paper on selective labels, Himabindu Lakkaraju, Jon Kleinberg, Jure Leskovec, Jens Ludwig, and Sendhil Mullainathan used bail decisions to make the problem concrete. Whether a released defendant fails to appear can be observed only when a judge releases that person. For defendants whom judges detain, the relevant release outcome is unavailable. If we want to compare a prediction system with judges, we cannot simply score both against a ground truth that does not exist for every historical case.

A dataset can contain millions of labels and still omit exactly the cases where the historical decision-maker was most skeptical.

This creates an asymmetry in institutional memory. Successes are often richly documented because success followed access. Failures of chosen options are documented too because the institution tried them. The successful unchosen option is harder to see.

Institutions can learn that they were wrong about what they chose. They have a harder time learning that they were wrong about what they never chose.

That asymmetry changes how we should read administrative data. A table of employee performance is not a table of everyone who could have performed. It is a table of people the hiring process allowed to perform. A table of loan defaults is not a table of everyone who could have borrowed. It is a table of contracts the underwriting process allowed to exist. A table of diagnoses is not a census of disease. It is a record of symptoms that reached care, clinicians who noticed, tests that were ordered, and conditions that were recorded.

The denominator is partly institutional.

That matters when a dashboard turns the selected sample into a statement about the world. People like this succeed. Customers like that default. Applicants from this background rarely reach senior roles. Users do not want this content. Each statement may be supported by observed data. Each also carries an unstated qualifier: among the cases our previous system exposed enough to observe.

Sometimes the qualifier changes little. Sometimes it changes the claim entirely.

A blank label is not a zero. No performance review is not poor performance. No repayment record is not a default. No diagnosis is not no disease. No stream is not dislike. No application is not lack of demand.

The non-event is ambiguous.

Operational systems cannot live in ambiguity forever. A hiring team needs a slate. A lender needs a threshold. A doctor must decide whether to order the test. A platform has to show something in the next slot. Uncertainty will eventually be compressed into an action.

The danger begins when the institution forgets that compression occurred.

Suppose a recruiter has a bias, explicit or subtle, against applicants from an unfamiliar college. Those applicants rarely receive interviews. Because they rarely get hired, the firm accumulates little internal evidence about how people from that college perform. Years later, an analyst builds a model from historical company data. The model sees abundant examples from familiar schools and sparse evidence from the unfamiliar one.

Nothing requires the model to reproduce the old bias. Outside data, careful modeling, different objectives, fairness constraints, direct assessments, or deliberate exploration can change the result. But the history has not arrived neutral. The old boundary is embedded in what the company was able to observe.

This is why “data-driven” should not be treated as a synonym for “history-free.” Data is driven by something too.

A hospital's records are driven by who arrives, which symptoms are reported, what clinicians notice, which tests are ordered, which codes are entered, who returns, and which later outcomes the system can track. A platform's behavioral data is driven by what the interface displayed, in what order, under what defaults, after which previous recommendations. A scientific literature is driven by which projects were proposed, funded, completed, submitted, accepted, and preserved. Employment data is driven by hiring, retention, promotion, assignment, and measurement practices.

The more consequential the selection, the less useful it is to imagine the resulting data as a passive photograph.

A dataset has provenance.

That provenance can extend beyond one institution. Rejected applicants build careers elsewhere. Borrowers use other lenders. Patients enter other health systems. Songs move through friends, radio, clubs, and other platforms. Scientific ideas can survive one committee's rejection. The unobserved world is rarely unobserved by everyone.

This leakage is useful. It is also imperfect.

An employer may discover that a rejected applicant later became successful, but the applicant did not work under the original manager. A lender can observe that a declined borrower repaid another institution, but the product and terms may differ. A health system can link a later diagnosis, but the path into diagnosis may have changed the outcome. External evidence widens the field of view without recreating the exact counterfactual.

That distinction will matter throughout this book. We rarely recover the road not taken exactly. We can often become less provincial about the road we did take.

The problem becomes sharper when a prediction system is deployed.

Suppose a company trains a model on historical employees and finds that it predicts a defined measure of performance better than the previous screening process. Managers like the consistency. They use the score to concentrate interviews among the highest-ranked applicants. Recruiter time is scarce, and this looks efficient.

The following year, the company has even more performance data from high-scoring candidates and even less from low-scoring ones.

If the score is mostly right, the result feels like confirmation. If the score has a blind spot, the blind spot can become harder to detect because fewer cases are allowed through to contradict it.

The prediction is no longer only a description. It has joined the process that chooses the next training set.

That is the hinge for the rest of the book.

Traditional predictive evaluation often imagines a fixed distribution: learn from historical examples, test on other examples from the same underlying population, then deploy. Real institutions are less polite. Deployment changes behavior. Behavior changes exposure. Exposure changes outcomes. Outcomes become labels. Labels become new training data.

The arrow comes back around.

Feedback can be beneficial. A fraud detector catches fraud and investigators learn new patterns. A spam filter gets corrected when users retrieve legitimate messages. A recommendation system learns that a user's tastes have changed. Adaptive feedback is one reason machine learning is useful.

The relevant question is what kind of feedback survives the decision.

If a spam filter quarantines a legitimate message, a user can often retrieve it and mark it safe. The system gets a corrective label. If a recruiter never interviews an applicant, there may be no equivalent event that says, with confidence, this person would have become exceptional here. Some domains produce relatively easy feedback on rejected actions. Others do not.

A system cannot learn from feedback it has engineered out of existence.

Historical test sets do not automatically solve this problem. Suppose training and evaluation data are randomly split from the same archive. That is sensible for measuring predictive performance on the archive's labeled population. It does not tell us much about applicant types whom the historical policy rarely admitted into the labeled portion in the first place.

The evaluation can be statistically clean and institutionally selected.

This is not a criticism of train-test splits. Validation always answers a question defined by the data-generating process. If difficult regions are scarcely represented in both halves, held-out accuracy can look excellent while telling us little about those regions.

A model can pass the test it was given.

The institution may still need another test.

Before deployment, this should lead to questions about the shape of evidence. Where does the new population resemble the observed one? Which applicant types, patient presentations, borrowers, creators, or policy contexts sit near the edge of historical support? Which scores rest on dense histories and which involve extrapolation? Where does apparent precision come partly from the absence of contradictory cases?

Quantity alone cannot answer those questions.

A billion rows can have a narrow shape.

The distinction between negative evidence and missing evidence is especially important. A treatment repeatedly tried and repeatedly unsuccessful produces negative evidence. A treatment never tried produces uncertainty. A candidate repeatedly failing a relevant assessment produces evidence. A class of candidates rarely assessed produces missing evidence. A recommendation shown often and ignored tells us something different from a recommendation never shown. A policy piloted in several contexts and failing is in a different epistemic position from a policy dismissed before a credible test.

Those differences are easy to lose once an operational system reduces everything to a ranking.

There are several possible responses to an uncertain option. The institution can reject it. It can accept it as though uncertainty were optimism. Or, in some settings, it can treat uncertainty itself as relevant to the choice and spend a bounded amount of resources learning.

The third response is familiar in bandit algorithms, clinical trials, A/B testing, active learning, and scientific research. It is less familiar in the everyday language of prediction, where the objective is often framed as selecting the best option according to current estimates.

That framing is incomplete when today's selection changes tomorrow's evidence.

Consider an interview. It consumes recruiter time, but it also measures a candidate more deeply than a résumé screen. A diagnostic test consumes money, attention, and sometimes physical burden, but it also produces information. A small policy pilot consumes administrative capacity and also tests whether a mechanism survives contact with a real institution. A grant spends money and gives a hypothesis a chance to become evidence. A recommendation spends a moment of audience attention and reveals a response.

An allocation can have an immediate payoff and an informational payoff.

Acknowledging both does not tell us to explore indiscriminately. Exploration can be expensive, unsafe, unfair, invasive, or easy to game. People are not interchangeable probes. Some uncertainty is not worth reducing. Some options sit outside the legitimate action set before any learning objective is considered.

The point is narrower: refusing to explore is not informationally free.

An institution that always chooses its current winner can gradually lose the ability to recognize a new winner.

That loss rarely appears on a quarterly dashboard. The chosen options may continue performing well. Accuracy on the observed population may improve. Decision times may fall. Variance may shrink. Managers may see fewer embarrassing outliers.

The missing evidence does not file a complaint.

This is why the failure mode can survive inside competent organizations. Nothing has to collapse. The system can work as designed while reducing the conditions under which it could discover that the design should change.

A useful diagnostic is to ask for the lost denominator.

How many plausible candidates never reached the measurement stage? How many borrowers near the boundary generated no direct outcome? How many eligible items received essentially no exposure? How many proposals were considered plausible but never received enough resources to test the question? How many people abandoned an application before entering the official decision dataset?

The denominator does not tell us who should have been chosen. It tells us where confidence may rest on a small observed fraction of a larger possible population.

That can change the next research question.

Instead of asking only whether a hiring model is accurate, ask where its accuracy is actually supported by outcomes. Instead of asking whether rejected applicants perform worse, ask which rejected applicants ever generate comparable evidence. Instead of saying users do not engage with a category, ask how much exposure the category received and under what rank positions. Instead of saying a policy has no evidence, ask whether the institution ever created a credible opportunity for evidence to exist.

The questions become less convenient and more informative.

There is also a governance question hidden inside the denominator. Who gets to decide which missing outcomes are worth buying?

A recruiter can spend only so many interviews. A hospital has limited diagnostic capacity. A lender has capital and consumer-protection constraints. A scientific funder has a fixed budget. A platform has finite user attention. Exploration is therefore an allocation problem before it is an algorithmic parameter.

This is why the amount of missing evidence should not automatically determine the amount of exploration. A large unobserved region may be unimportant, unsafe, or already well understood through outside evidence. A small region near a consequential threshold may deserve much more attention. The value lies in whether additional observation could plausibly change a future decision.

That makes uncertainty local.

An institution should care not only about how uncertain the model is, but why the uncertainty exists and what it would cost to reduce it.

Sometimes the best response is a new data source rather than a new exposure. A lender may use responsibly gathered cash-flow information instead of extending a blind loan. An employer can use a work sample before making a hire. A health system may link later outcomes under appropriate privacy safeguards. A policymaker can study a natural experiment rather than manufacture one. A platform can ask for direct user preference rather than infer everything from ranking-induced behavior.

Sometimes the safest experiment is not to change the final decision. It is to add an earlier measurement stage.

This matters because the action that reveals the label can also change the outcome. A hire does not merely reveal employee quality; the job, manager, team, and assignments help produce performance. Credit does not merely reveal a fixed property called creditworthiness; the product terms and access affect the borrower's financial path. A school placement teaches. A recommendation creates exposure and can shape taste.

The observed label is often a joint product of the subject and the institution.

That is one reason the language of “ground truth” can become misleading in high-stakes decision systems. The label may be real and well measured. It can still be conditional on the policy that produced it.

A performance review is ground truth about a particular employee's observed performance under a particular job and organization. It is not a hidden essence of employability. A default is a real financial event under a particular contract and economic environment. It is not a timeless property of the borrower. A click is real behavior under a particular presentation. It is not an unmediated measure of desire.

The closer a prediction gets to controlling access, the more important that distinction becomes.

The record should preserve how the label came into existence. Which policy version was active? Which threshold applied? What information was available? Was the case near the boundary or far from it? Did a human override the recommendation? Did capacity constraints change the action? Was the outcome observed under a pilot, an old regime, or the current one?

This is not bureaucratic decoration. It is what allows a later analyst to distinguish a change in the world from a change in the institution's way of looking at it.

Imagine a lender that tightens its underwriting rule after losses. Defaults fall in the next portfolio. That may mean the new policy is better. It also means the lender selected a safer population. Without policy lineage, a later model can treat the lower default rate as though the underlying applicants simply became safer.

The same problem appears in hiring. A company changes its interview process, introduces work samples, alters the jobs being filled, and then retrains a model on the combined outcome history. If those policy changes are not recorded, the model receives labels generated under several different institutions while being told they came from one stable world.

Policy is part of the data-generating mechanism.

Once that is visible, a second publication-level question follows: what contradiction channel survives after deployment?

Some systems have natural ones. Appeals, customer complaints, human overrides, external outcomes, and competitor behavior can expose mistakes. Others become nearly closed. A universal model can decide who receives an opportunity and then evaluate itself mainly on the people it selected.

A mature system does not need to keep every rejected case alive. It needs enough independent evidence to notice when the selected sample has become too self-confirming.

That can be a small audit stream. It can be near-threshold review. It can be a shadow model that records disagreements before taking control. It can be outside data. It can be a separate institution using a different rule. The mechanism matters less than the principle: the dominant policy should not own every route by which it could be contradicted.

This is particularly important because false positives and false negatives leave different kinds of evidence. A bad hire becomes visible. A bad loan defaults. A poor recommendation is skipped. The false positive acts and can disappoint us.

A false negative often disappears. The rejected applicant succeeds somewhere else or not at all. The profitable loan never enters the lender's books. The song that would have found an audience receives no exposure. The policy that might have worked remains a memo.

Organizations therefore tend to accumulate vivid evidence about the cost of saying yes and much weaker evidence about the cost of saying no.

That asymmetry can make caution look more empirically justified than it is.

Caution may still be correct. The point is to know which side of the ledger is observable.

Competition can sometimes supply the missing side. A rival firm hires the candidate. Another lender serves the borrower. A small journal publishes the paper. A local government pilots the policy. A different platform creates an audience. Independent institutions generate evidence that the dominant institution refused to buy.

This is one reason pluralism has an epistemic value. Multiple logos do not guarantee multiple decision rules, but genuinely different policies can keep alternatives observable at the system level even when each individual organization remains selective.

The danger grows when many institutions buy the same score, train on the same data, copy the same benchmark, follow the same professional norm, or use the same model family. What looks like decentralization can become one observational policy implemented by many actors.

Then the lost denominator is no longer only internal.

An entire market can stop producing evidence about the same kinds of cases.

We will spend the next chapters separating these layers more carefully. The fundamental problem of causal inference tells us why one history cannot display its alternative. Selective labels show how institutions make some of those alternatives systematically harder to observe. Later examples will show that the size of the problem varies by domain, that exploration can sometimes improve both performance and diversity, that statistical correction cannot magically recover every rejected outcome, and that experimentation is useless if institutions cannot implement or remember what they learn.

There will not be one universal prescription.

That is a feature of the problem, not an inconvenience.

The common starting point is enough: before asking what the data says, ask which decisions had to occur for the data to exist.

The rejected applicant, the declined borrower, the untested patient, the unplayed song, and the unfunded proposal are not evidence that the alternative would have succeeded.

They are evidence of something more modest.

We do not know.

That ignorance has a provenance. Sometimes it is unavoidable. Sometimes it is an ethical boundary. Sometimes it is a reasonable economic trade. Sometimes it is a boundary inherited from the past and mistaken for knowledge.

A dataset is not only a collection of answers.

It is also a record of the questions an institution gave reality a chance to answer.