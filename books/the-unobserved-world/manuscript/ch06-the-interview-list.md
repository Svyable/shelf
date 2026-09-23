# The Interview List

The interview is a peculiar economic object.

It is expensive enough that a company cannot give one to everyone and cheap enough that it can be given to people the company is not yet sure about. It sits between a résumé and a job, between a prediction and a commitment. That makes it a natural place to see the difference between choosing the apparent best and buying information.

Most hiring systems treat the interview as a scarce prize. Applicants compete for it. Recruiters screen for signs associated with success. When a company adds machine learning to the process, the obvious ambition is to rank more accurately: give scarce interviews to the people most likely to receive offers or perform well later.

That is exploitation in a clean form.

Danielle Li, Lindsey Raymond, and Peter Bergman asked what happens if the screening system values something else too: uncertainty.

Their paper, “Hiring as Exploration,” is useful because it refuses to treat hiring as a one-shot prediction problem. It models the employer as an organization that hires repeatedly and therefore has an interest in learning over time. The setting is professional-services recruiting at a Fortune 500 firm, not the entire labor market. The data cover real applicants and real screening decisions. The researchers compare human screening with machine-learning approaches, including a conventional supervised-learning model and an exploration-oriented contextual-bandit model using an upper-confidence-bound strategy.

The intuition behind the upper confidence bound is easier than the name. Suppose two candidates have the same estimated hiring potential. The model is much more certain about one estimate than the other. A purely exploitative model treats the point estimates as equal. An exploration-oriented model can prefer the more uncertain candidate because that candidate's plausible upside is higher and because interviewing the candidate produces information in a region the firm knows less about.

This is not random hiring.

The uncertainty bonus operates inside a ranking designed around plausible hiring potential. The model still tries to identify strong candidates. It simply refuses to treat lack of historical information as identical to evidence of low quality.

That distinction produced a striking result in the firm's data.

Under the status quo, 9.4 percent of interviewed applicants were Black or Hispanic. The authors estimate that a traditional supervised-learning model would have reduced that share to 4.2 percent. The exploration-oriented UCB model would have increased it to 24.3 percent. Both machine-learning approaches also increased the share of women relative to human recruiters in the analysis.

Those numbers deserve care. They come from one firm's recruiting context and from counterfactual policy analysis, not from a universal experiment in which every corporation replaced its hiring system. The researchers devote considerable attention to the missing-outcome problem because hiring quality is only directly observed for candidates whom human recruiters actually interviewed. They use multiple approaches and assumptions to assess candidate quality under alternative selection policies.

The value of the study is not that it proves every employer should deploy an upper-confidence-bound model tomorrow.

It shows that the choice of learning objective can reverse the direction of an algorithmic effect.

A conventional supervised model can look at sparse historical evidence about an underrepresented group and become conservative. The exploration model can look at the same uncertainty and see reason to gather information. Diversity rises not because the model has been separately instructed to hit a demographic quota in this particular exercise, but because underrepresentation and uncertainty are connected in the training data.

The system notices that the company knows less than it thinks.

This is a profound change in how we interpret absence.

Traditional screening asks: what does our history say is most likely to work?

Exploration asks: where is our history too thin to justify the confidence with which we are excluding people?

The second question is not more compassionate by definition. It is more epistemically self-aware.

That matters because hiring data contains a built-in prestige effect. A firm sees the careers of people it has chosen. It does not see the internal careers of applicants it rejected. If it historically recruited from a narrow set of schools, employers, regions, or career paths, the data will be densest around those choices. A model can convert that density into certainty and uncertainty into penalty.

Humans do something similar without equations. Familiarity feels safer because we have stories about it.

A manager who has worked with five successful engineers from one company can imagine the sixth. A candidate from a little-known employer requires more inference. A recruiter knows the grading scale at a familiar university. An unusual credential demands interpretation. A linear career is easy to compare with prior hires. A nonlinear career is harder.

The informational disadvantage can masquerade as a merit disadvantage.

Hiring systems have long used devices to reduce this problem. Work samples let candidates demonstrate ability directly. Structured interviews make comparisons less dependent on conversational familiarity. Skills tests create a new signal. Auditions are common in fields where performance can be shown. Apprenticeships and probationary periods produce evidence through work, though they raise important questions about pay, power, and fairness. Referrals provide information but can also reproduce networks.

Each mechanism changes the cost of uncertainty.

A résumé screen is cheap and shallow. A work sample is more expensive and richer. An interview is richer still. Employment produces the most relevant evidence but carries the highest commitment and stakes. A good hiring architecture moves uncertainty through stages rather than pretending the first stage should know everything.

This is exactly where an exploration budget can be useful.

A company does not need to make final hiring decisions randomly. It can devote some interview capacity to candidates whose downside is bounded and whose uncertainty is meaningful. It can ask which people the current model finds difficult rather than only which people it scores highest. It can compare outcomes from the exploratory slate with outcomes from the standard slate. Over time, categories that were uncertain can become better understood.

The process resembles active learning in machine learning: choose examples that are especially informative to label. But the analogy must be handled with care. A candidate is not an unlabeled image waiting to be annotated. The label is produced through an interaction with the institution. Interviewer quality, job availability, team fit, bias, and candidate choice all influence the outcome.

The firm is not discovering a fixed essence called employability.

It is observing what happens in a particular hiring process.

This matters for the interpretation of the Li, Raymond, and Bergman study as well. Their quality measures involve downstream hiring outcomes. Those outcomes are meaningful in the firm's process, but they are not a universal measure of human potential. A candidate not hired by this firm may thrive elsewhere. A candidate hired may have succeeded because the firm's process matched them well.

The broader book should never collapse “selected by the model” into “objectively better person.”

The lesson is about the policy, not the worth of the applicant.

Once that distinction is clear, another feature of the paper becomes important: human recruiters themselves create useful variation. In the firm's process, applicants were randomly assigned to resume screeners, and screeners differed in leniency. That variation helps the researchers study marginal candidates—people who are interviewed because they happen to encounter a more lenient screener.

Human inconsistency, usually treated as noise, becomes an identification tool.

This does not mean the company should preserve arbitrary screening. It means a transition from noisy humans to consistent models should notice that some evidence was being generated by the noise. If consistency removes the variation, the organization may need a deliberate substitute.

This pattern will recur in medicine. Different physicians have different testing thresholds. Researchers can sometimes use that variation to study patients who would be tested under one physician and not another. Standardization may improve clinical practice. It can also remove the natural experiment. The appropriate response is not to defend inconsistent medicine. It is to design learning into the standardized system.

Hiring provides a lower-stakes place to see the principle clearly.

Suppose a company's model is highly accurate and exploration shows that the underrepresented candidates truly do not perform as well under the current hiring outcome. What then?

A superficial version of the argument would say the model was right and exploration can stop. A more careful version asks why the outcome differs. Is the model revealing a job-relevant skill gap? A recruiting-channel difference? A mismatch in role? A biased downstream evaluation? Unequal onboarding? Geographic constraints? The reason matters because the appropriate intervention differs.

Exploration produces evidence. It does not interpret the evidence for us.

This is another limit of algorithmic curiosity. A model can discover that a region of the applicant space is promising or disappointing according to the target. It cannot settle whether the target is just, whether the process is fair, or whether the organization should change itself rather than the applicant pool.

If exploratory candidates receive fewer offers because interviewers are biased, learning “these candidates have lower offer rates” could reinforce the bias unless the institution investigates the mechanism. If retention is lower because some employees experience a hostile environment, optimizing for retention without changing the environment would encode the wrong lesson.

The outcome is part of the institution.

This makes hiring a richer example than a slot machine. Pulling an arm does not change the slot machine's sense of belonging. Hiring a person changes the team, and the team changes the person. Opportunity and performance interact.

A learning employer therefore needs to measure more than selection yield. It should look at where candidates exit the funnel, who receives offers, who accepts, who receives support, who gets strong assignments, who stays, who advances, and how those patterns differ under different recruiting policies. It should ask whether the exploration mechanism is creating opportunity or merely moving people to a later gate.

A diversified interview list is not a diversified leadership team.

Still, the interview list matters because a closed first door makes every later question irrelevant.

The study's numerical contrast—9.4 percent under existing practice, an estimated 4.2 percent under the supervised model, 24.3 percent under the exploration model for Black and Hispanic interviewees—shows how much design choice can hide behind the phrase “use AI in hiring.”

There is no single algorithmic effect.

One algorithm optimizes a point estimate and becomes more conservative than human screeners in this dimension. Another values uncertainty and becomes more exploratory. Both are machine learning. Both can be coded by competent teams. Their social consequences differ because their objective functions answer different questions.

This is a useful antidote to two lazy stories about automation.

The first says algorithms inevitably reproduce history. They can, but they can also be designed to investigate where history is thin.

The second says more accurate prediction automatically improves decisions. It can, but only relative to a defined outcome and a defined time horizon. If the system's repeated choices determine what it will know later, accuracy today is not the entire objective.

The exploration model makes learning an explicit part of performance.

That idea travels beyond demographic diversity. Consider an employer entering a new technical field. Historical hiring data contains few candidates with the emerging skill. A supervised model trained on old success may undervalue them because the organization has little evidence. An exploration-aware process can make room for plausible candidates whose value is uncertain precisely because the work is new.

The same logic applies to career changers after an industry shock, veterans translating experience into civilian roles, workers with new kinds of credentials, people returning after caregiving, candidates using AI tools in ways older evaluation systems do not understand, or applicants from geographies a remote-work company has barely sampled.

The future always arrives underrepresented in historical data.

This is the deepest reason exploration matters in hiring. Fairness is one part. Adaptation is another. A firm that hires only people its past can confidently score is making a bet that the future will reward the same legible profiles.

That bet can work for a long time.

Then the job changes.

A company adopting a new technology suddenly needs people who have learned outside the standard path. A market shifts toward a customer base the organization has barely served. A new regulation creates demand for expertise that did not exist in the old data. A business expands internationally. A tool automates the routine tasks that made yesterday's high performer easy to identify.

The company discovers that its hiring model is excellent at identifying employees for a job that is disappearing.

Exploration is how an institution keeps a small relationship with jobs it does not yet know how to describe.

The practical implication is not to replace every ranking with uncertainty bonuses. It is to build a hiring process that can tell the difference between low expected value and low information.

Those are not the same thing.

A candidate can be weakly supported because the evidence is negative. Another can be weakly supported because the evidence is sparse. Treating both as equally bad is efficient only if the future is not worth learning about.

A mature hiring system should know which kind of ignorance it is acting on.

The interview list is where that knowledge can begin.

The study also exposes a governance problem that is easy to miss when reading only the performance results. An exploration policy changes not just who is seen, but who carries the burden of being informative. If the firm creates an “exploratory slate” and those candidates routinely meet skeptical interviewers, receive poorly matched roles, or are treated as statistical exceptions, the policy can generate misleading labels. The experiment would appear to test candidate quality while actually testing the institution's ability to evaluate unfamiliar people.

That means the exploration stage has to be paired with process quality.

Structured interviews matter because the extra observation is useful only if it is comparable. Interviewer calibration matters because leniency that helps identify a natural experiment is not a desirable long-run operating rule. Work samples matter because they can move evidence closer to the capability the firm actually cares about. Follow-up matters because an interview outcome alone may be too shallow a label.

The institution should also decide in advance what it will do with what it learns.

Suppose an unusual recruiting channel produces strong candidates for two years. Does the company update the screening model so the channel becomes ordinary, or does it preserve the people as permanent “exploration” cases? The latter would be a failure. Exploration is supposed to convert uncertainty into knowledge. Once the evidence becomes dense, the category should lose its uncertainty premium and compete on the richer record.

This gives a practical test for whether an exploration program is real: does the institution's map change?

If the same groups remain “interesting unknowns” year after year, either the organization is not collecting the right outcomes, it is not updating its model, or the exploration label is masking another objective. A learning system should retire discoveries into the mainstream and move its curiosity elsewhere.

The reverse matters too. A category can become newly uncertain after the environment changes. A role is redesigned. A new tool alters which skills matter. A remote team changes the importance of geography. A credential that once predicted performance becomes ubiquitous and loses signal. The map is not finished simply because the firm once learned it.

Hiring is especially vulnerable to stale evidence because jobs mutate faster than many careers do. A person hired into an occupation may still be there when the tasks have changed substantially. Historical “success” can therefore be a label for adaptation to a past version of the role.

A good interview system should ask not only who resembles prior winners, but which evidence is close enough to the future job to deserve trust.

That question makes the interview more than a gate.

It becomes a renewal mechanism for the firm's idea of talent.

A more robust exploration policy would also separate three budgets that are easy to collapse into one. There is an interview budget: how much recruiter and candidate time the firm can spend. There is an uncertainty budget: how much of that capacity the firm is willing to devote to applicants whose estimated value is plausible but less certain. And there is a fairness budget in the institutional sense: how much procedural complexity the company is willing to accept in order to make sure the learning process itself does not become arbitrary, stigmatizing, or impossible to contest.

Calling all three “exploration” hides tradeoffs that should remain visible.

A company might have plenty of interview capacity and still be unable to evaluate unfamiliar candidates well. It might widen the top of the funnel without training interviewers, then conclude that exploration failed. It might devote interview slots to uncertain profiles while using a work sample designed around experience those candidates were less likely to have. Or it might learn that a channel is promising but lack the onboarding capacity to convert that discovery into successful hires.

The bottleneck can move downstream.

That is why the strongest version of this idea is not an exploration algorithm. It is an exploration contract between stages of the hiring system.

The screening stage promises to surface a bounded number of plausible unknowns. The interview stage promises to evaluate them with procedures good enough to make the observation meaningful. The hiring stage promises not to confuse “different from our past” with “too risky to support.” The onboarding stage promises to measure whether the job itself is creating avoidable failure. The analytics stage promises to update the model when the evidence changes.

If any stage refuses the contract, the uncertainty bonus can become theater.

There also needs to be a control against opportunistic exploration. A manager should not be able to describe any favored exception as “learning.” The useful cases are those in which uncertainty is identifiable before the outcome, the exploratory action is proportionate, and the institution has named what evidence it expects to gain. The policy should be reviewable after the fact.

This suggests a simple discipline: every exploratory interview should be attributable to a reason class, not a demographic story about the person. The system might say the applicant lies in a sparse region of the feature space, comes from a newly relevant skill pathway, has strong direct evidence that conflicts with pedigree-based prediction, or sits near a decision boundary with unusually high model uncertainty. Those reasons can be audited without turning the individual into a curiosity specimen.

The distinction matters morally and statistically.

If the organization says, “We interviewed you because people like you are unknown to us,” it risks reproducing the very otherness it claims to correct. If it says, “Our evidence about this pathway is sparse and your work sample is strong enough to justify another measurement,” the policy is anchored to evidence and opportunity rather than identity as spectacle.

A mature exploration system also needs a stopping rule for failure. Curiosity is not an entitlement to endless organizational resources. If repeated, well-designed observation shows that a particular signal adds little value, the firm should be willing to stop paying for it. If a work sample predicts performance better than an expensive interview stage, the interview may need to shrink. If uncertainty about one pathway falls, exploration capacity should move elsewhere.

The purpose is not to institutionalize exception handling.

It is to make the firm's model of talent corrigible.

That is a higher standard than merely increasing diversity at the interview stage. It asks whether the organization can discover that its own definition of a strong candidate is stale, whether it can absorb the discovery into ordinary practice, and whether it can do so without making the people who taught it bear an unfair share of the cost.

A company that can do that is not only hiring more broadly.

It is learning how to recognize talent before the rest of the market has made that talent familiar.