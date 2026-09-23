# The Untested Patient

A negative test is data.

No test is not a negative test.

The distinction is easy to say and difficult to preserve inside a health record.

A patient arrives with chest discomfort. A physician takes a history, examines the patient, orders some tests, declines others, and makes a judgment about what is likely enough to investigate. Another patient with similar symptoms sees a different physician and receives a different workup. One chart fills with measurements. The other remains comparatively quiet.

Months later, a researcher asks which patients had heart attacks.

The answer is partly shaped by who was tested.

Medicine has always lived with this problem because diagnosis is an action, not merely a fact. Disease can exist without being observed. Testing changes what becomes visible. Treatment changes what happens next. Follow-up changes which outcomes return to the same health system. A clinical dataset is a record of biology filtered through access, judgment, workflow, coding, and measurement.

The stakes make medicine a useful antidote to careless talk about exploration.

No decent physician orders invasive procedures on random patients merely to improve the dataset. Tests can cause pain, radiation exposure, complications, anxiety, false positives, incidental findings, cascades of follow-up care, and cost. Even a blood draw is not free in the aggregate. The ethical boundary is not an inconvenience added after the statistics. It defines what learning is permissible.

Within that boundary, selective observation still matters.

Sendhil Mullainathan and Ziad Obermeyer's work on physician testing decisions gives us an unusually concrete example. They study how physicians diagnose heart attack, using machine learning to estimate risk and then comparing predicted risk with actual testing choices and downstream outcomes. Their paper reports evidence of two errors in the setting examined. Some patients with predictably low risk were tested even though the test did not appear to benefit them. Other patients with predictably high risk were left untested and later suffered serious adverse health events, including death.

The result is not “AI beats doctors.” The authors' design is more interesting than that slogan. They use prediction to expose where physician decisions differ from risk and use natural variation in testing behavior to help determine whether those deviations are mistakes or superior human judgment.

Why is natural variation important?

Because outcomes for untested patients are selectively missing in the immediate diagnostic record. If every physician applied the exact same threshold, it would be harder to learn what happens to patients near the boundary. Variation across shifts and physicians creates comparisons.

The researchers are, in effect, learning from doors that different clinicians opened differently.

This creates a tension for quality improvement. Medicine has spent decades trying to reduce unwarranted variation. Standardized pathways, checklists, guidelines, decision support, and evidence-based protocols can prevent arbitrary differences in care. That work saves lives.

But when standardization removes variation, it can also remove a source of evidence about the threshold itself.

The solution is not to preserve arbitrary medicine. The solution is to make the standardized system capable of testing its own assumptions.

Clinical trials are the clearest example. When genuine uncertainty exists between treatments and ethical requirements are met, random assignment can turn variation into evidence rather than noise. But trials cover only part of medicine. Many questions concern diagnostic thresholds, workflows, combinations, subgroups, rare events, and changing technology. Real-world evidence, pragmatic trials, natural experiments, prospective registries, and carefully designed implementation studies expand the toolkit.

The common discipline is comparison.

Prediction without comparison can mislead in medicine because illness is not distributed independently of testing. Suppose a health system trains a model to predict a diagnosis from historical records. Patients with classic symptoms were more likely to be tested, so their diagnoses are well represented. Patients with atypical presentations were tested less often, so their true disease status is less visible. A model may become highly accurate at recognizing the disease in people the old system already knew how to recognize.

This can produce the worst kind of reassurance: excellent validation on a selected sample.

The model appears to confirm clinical wisdom because clinical wisdom helped construct the labels.

Researchers refer to related problems under several names—verification bias, workup bias, spectrum bias, missing-not-at-random labels, selective labels. The details vary, but the intuition is stable. The path to a label matters.

Health systems often have ways to recover some of the missing information. An untested patient may return with a later diagnosis. Mortality records may capture severe outcomes. Claims can reveal care elsewhere. Follow-up calls or registries can track patients over time. A natural experiment can exploit physician or shift variation. None of these is perfect. They widen the aperture.

The best evidence may come from events the original decision-maker did not control.

This resembles credit. A lender that declines an applicant may later observe bureau outcomes from another lender. A hospital that declines a test may later observe a hospitalization. External outcomes provide clues about the rejected action.

Medicine adds a complication: the missing outcome can be changed by the delay itself.

A disease not diagnosed today may be harder to treat tomorrow. The decision not to test is not merely a missing label. It can alter the causal path.

That means diagnostic exploration has a direct patient benefit when it catches conditions earlier and a direct patient cost when it leads to unnecessary intervention. The institution is balancing more than information.

This is why uncertainty should be decomposed.

There is uncertainty because the disease is genuinely difficult to distinguish. There is uncertainty because the test is imperfect. There is uncertainty because the patient belongs to a poorly studied group. There is uncertainty because historical clinicians rarely tested this presentation. There is uncertainty because the data system does not follow patients well. There is uncertainty because the model is operating in a new hospital or population.

Treating all of these uncertainties as one risk score loses the diagnosis of the diagnostic system.

A learning health system would care about where its uncertainty comes from.

Imagine two patients both assigned a 3 percent estimated risk. For one, the model is based on thousands of closely comparable cases. For the other, the model is extrapolating from sparse evidence because the patient's presentation is rare. Same point estimate, different epistemic position.

A conventional threshold may treat them identically. An exploration-aware system may flag the second for additional review, not because 3 percent suddenly means something different, but because the confidence around the estimate is different.

Again, this is not permission to test indiscriminately. It is a reason to expose uncertainty to clinicians rather than hiding it behind precision.

Medical AI often emphasizes calibration: among patients assigned a certain risk, does the outcome occur at roughly that rate? Calibration is important. But a model can be calibrated on the population it sees and still be unreliable under a deployment policy that changes who is measured, treated, or followed.

Calibration is about predictions. The unobserved-world problem is about the loop.

Suppose a model recommends fewer tests for a category of patients. The immediate effect may be beneficial: fewer unnecessary procedures. Over time, however, the health system will collect fewer definitive labels in that category. The next model may have less information there. If the disease changes, the patient mix changes, or the original model was slightly wrong, the blind spot can grow.

This is a reason to maintain surveillance even after a policy appears successful.

Surveillance does not have to mean testing everyone. It can mean randomized chart review, follow-up sampling, registry linkage, audit testing in approved low-risk ways, monitoring of later adverse outcomes, or periodic re-evaluation of thresholds. The principle is that reduced intervention should not imply reduced ability to detect model drift.

Airlines inspect systems that rarely fail. Banks stress-test risks they hope never to realize. Health systems can audit diagnostic pathways even when the pathway is performing well.

The paradox is that success makes auditing feel least urgent.

If a model reduces unnecessary tests and the observed adverse-event rate remains low, leaders may assume the problem is solved. Yet observed adverse events are themselves affected by follow-up and measurement. The institution needs a channel for bad news that does not depend entirely on the policy being wrong in a way the policy can see.

This is one reason patient complaints, second opinions, malpractice claims, external diagnoses, and clinician overrides can be informationally valuable even when they are messy. They are routes by which evidence escapes the standard pipeline.

A mature system does not dismiss every deviation as noise.

The physician who overrides a model may be wrong. The override may also indicate a feature the model does not capture. If overrides are logged with outcomes, they become a source of learning. If clinicians are punished for deviating and the model's recommendation becomes effectively mandatory, the system may lose this channel.

Human judgment can be an exploration mechanism.

That statement needs the same caveat as earlier chapters. Human judgment is also a source of bias, inconsistency, fatigue, and error. The point is not to elevate intuition above evidence. It is to treat disagreement between human and model as a potentially informative event rather than something to eliminate reflexively.

The best hybrid systems may use disagreement to allocate attention.

If model and clinician agree strongly, follow the normal path. If they disagree and both have plausible reasons, the case may deserve review. Over time, the institution can learn where humans add information and where they introduce noise. This is more productive than asking whether “AI” or “doctors” are better in the abstract.

The unit of performance is the decision system.

This becomes clearer in diagnosis because every layer matters. The patient chooses whether to seek care. The triage process chooses urgency. The clinician chooses tests. The test has sensitivity and specificity. The lab returns results. The clinician interprets them. Treatment follows or does not. The patient adheres or does not. Follow-up captures outcomes or loses them. A model inserted at one point inherits selection from every previous point and changes selection downstream.

Calling the final dataset “clinical reality” is too generous.

It is clinical reality as observed through a pipeline.

This does not make the data suspect. It makes the pipeline part of the scientific object.

There is another asymmetry that diagnostic systems inherit from human attention. The patient who receives a test produces a result whether the result is reassuring or alarming. The patient who is not tested often produces no immediate event at all. This makes over-testing visible in cost and procedure counts while under-testing may remain hidden until a later catastrophe, if it is linked back to the original encounter at all.

The institution can therefore become better at counting what it did than what it failed to do.

That distinction matters for performance metrics. A department can measure test utilization, turnaround time, false-positive rates, length of stay, and immediate return visits. Missed diagnoses that surface weeks later in another hospital may never enter the same dashboard. A model evaluated only against local short-term outcomes can look safe partly because the system loses contact with the cases that would contradict it.

Outcome linkage is therefore not a clerical afterthought.

It is part of the causal design.

A health system that wants to know whether a lower testing threshold is safe needs a follow-up window long enough to capture the harm it is trying to avoid. It needs to know whether patients sought care elsewhere. It needs to decide whether mortality, hospitalization, later diagnosis, symptom persistence, patient-reported outcomes, or some combination represents the relevant endpoint. The choice of label changes the question.

This becomes especially important for conditions with delayed manifestation. A reassuring emergency-department discharge may look correct at twenty-four hours and wrong at thirty days. A screening policy may appear efficient when judged by immediate procedures and harmful when judged by stage at diagnosis. An algorithm may reduce false positives while increasing time to treatment in a subgroup.

The time horizon is another gate on observability.

Prediction systems tend to favor labels that arrive quickly because those labels are easier to train on and monitor. But fast labels are not always the outcomes people care about. A hospital can know whether a patient was admitted tonight before it knows whether the patient was alive and functional six months later. If the system optimizes only what arrives soon, it can become exquisitely responsive to the wrong endpoint.

The same problem appears in clinician behavior. Doctors learn from patients who return. They receive less feedback about patients who recover elsewhere, deteriorate elsewhere, or simply disappear from the system. A physician may therefore develop confidence from a locally observed sample that is systematically incomplete.

This is not a criticism of physicians. It is a feature of the learning environment.

Good institutions compensate for it by building feedback that individual clinicians cannot obtain on their own. Case review, cross-system data, mortality follow-up, quality registries, and delayed-outcome audits reconnect decisions with consequences. The purpose is not surveillance of clinicians. It is correction of an evidence pathway that otherwise rewards memory of visible cases.

This is also where deployment monitoring for medical AI has to go beyond aggregate accuracy. A single overall performance number can conceal a subgroup whose labels are sparse because clinicians historically tested them less often. If model adoption further reduces testing in that subgroup, the system can simultaneously improve average efficiency and degrade its ability to notice a concentrated failure.

A useful audit therefore asks two questions at once: how is the model performing, and where has the policy reduced the density of trustworthy labels?

Those are not the same question.

A model may produce stable output distributions while the clinical evidence underneath them becomes thinner. The institution may not see ordinary statistical drift because the blind spot is maintained by the decision rule itself.

One safeguard is to treat some outcomes as sentinel events. If a patient classified as low risk later experiences a severe related event, the case should travel backward through the pipeline. Was the model wrong? Was the input incomplete? Did the clinician have information the system ignored? Did access barriers delay care? Was the later event genuinely unpredictable? A small number of carefully investigated contradictions can reveal more than a large dashboard of confirming cases.

Contradictions are disproportionately valuable when the system is self-confirming.

That is another theme shared with aviation and engineering. Rare failures receive intense attention not because they dominate the dataset but because they can invalidate assumptions supporting millions of routine operations. Medicine has analogous opportunities. A missed diagnosis in a supposedly safe region of the model can be a clue about the boundary of competence.

The difficult institutional task is to preserve that clue without turning every adverse outcome into proof of negligence. Hindsight bias is powerful. A patient can suffer a bad outcome even when the original decision was reasonable. Learning requires reconstructing the information available at the time, not judging the decision with facts revealed later.

This is why a good review record preserves uncertainty.

What did the clinician know? What did the model know? Which tests were available? What risk estimate applied then? Which alternatives were considered? Was the patient represented in the population on which the model had evidence? What outcome would have been expected under the alternative path?

A review designed only to assign blame will produce defensive documentation.

A review designed to improve observability can produce better future decisions.

The same insight appears in public health screening. If a cancer-screening program reaches one population more effectively than another, detected incidence can rise where screening is better even if underlying disease rates are similar. Improved detection can look like worsening health. Conversely, low recorded incidence in an underserved population can reflect underdiagnosis.

Observation is an intervention.

The phrase sounds philosophical until it changes a dashboard.

A health leader comparing diagnosis rates across clinics needs to ask whether the clinics are measuring the same way. A model developer needs to ask which patients had definitive tests. A regulator needs to ask whether reduced intervention is hiding missed outcomes. A clinician needs to know when a reassuring score is based on sparse comparable evidence.

The untested patient is therefore not simply a missing row.

They are a reminder that clinical evidence is conditional on care.

There is a humane limit to how far this idea should travel. Patients do not owe the health system data. A person has the right to refuse testing. Privacy can restrict linkage. A clinician can reasonably choose not to pursue a low-probability diagnosis. Medicine is not obligated to maximize collective knowledge at the expense of individual welfare.

That limit strengthens rather than weakens the argument.

Because some exploration is ethically unavailable, the evidence we can obtain should be designed more carefully. Natural variation should be analyzed before it disappears. Approved trials should answer questions that matter. Follow-up systems should capture outcomes without demanding needless procedures. Model uncertainty should be represented honestly. Changes in diagnostic policy should be rolled out in ways that preserve evaluation where feasible.

Learning has to fit inside care.

The ideal is not a hospital that tests more. It is a hospital that knows what its decision rules prevent it from seeing.

That awareness changes the meaning of a quiet chart.

No result may mean no disease.

It may also mean no test.

A health system can also lose observability when the patient leaves the system entirely.

That sounds obvious until you look at how many performance measures are built from encounters that return to the same database. A patient visits one emergency department, receives no advanced test, and goes home. If the symptoms resolve, the original hospital may never know. If the symptoms worsen and the patient goes to another hospital, the original hospital may also never know. If the patient moves, loses insurance, changes doctors, or decides not to seek care again, the record ends for reasons that have little to do with biology.

The missingness is not random.

People with more stable access, better transportation, stronger insurance coverage, more trust in clinicians, and more ability to take time away from work may be easier to follow. People whose care is fragmented across systems can be harder to observe. A model trained on one institution's records can therefore inherit not only clinical selection but continuity-of-care selection.

This matters because a quiet record can mean several different things.

It can mean the patient stayed well.

It can mean the patient recovered without further care.

It can mean the patient was treated somewhere else.

It can mean the patient could not return.

It can mean the outcome happened outside the institution's field of view.

Those possibilities should not be collapsed into one convenient label.

The problem becomes sharper when a health system uses absence itself as a target. Suppose a model is trained to predict thirty-day readmission. A patient who returns to the same hospital is easy to count. A patient admitted to another hospital may be harder to link. The model can be technically correct about the data warehouse and wrong about the patient's actual trajectory.

That distinction sounds bureaucratic until a system begins optimizing against the label.

If leadership rewards lower recorded readmission, the institution needs confidence that the measure tracks real readmission rather than only recapture inside its own network. If a diagnostic model is judged by later diagnoses, the institution needs to know how much later care it can see. If a follow-up program is evaluated by who returns, the system needs to know whether non-return represents health, disengagement, or migration.

The observation boundary is part of the outcome definition.

This is one reason cross-system linkage can be scientifically valuable. It can reconnect a decision with consequences that occurred elsewhere. But linkage is not free of cost or controversy. It creates privacy obligations, governance questions, matching errors, and the possibility that information collected for one purpose will be reused for another. The answer cannot be simply to connect every record to every other record.

The narrower principle is that institutions should know when their outcome measure ends at an administrative border.

That knowledge can change how confidently they interpret the result.

A hospital with incomplete external follow-up may still use its own data. It may be the best evidence available. But the analysis should distinguish “no adverse event observed here” from “no adverse event occurred.” A model card, quality report, or internal review that preserves that sentence has already prevented one category error.

There is another way observability erodes: the definition of the label can change while the name stays the same.

Medicine is full of categories that depend on thresholds, coding conventions, testing technology, clinical practice, and reimbursement rules. A diagnosis recorded in one period may not be operationally identical to the same diagnosis recorded years later. A laboratory assay may become more sensitive. A guideline may change who qualifies for a test. A billing code may be used differently. A new device may make a previously difficult measurement routine.

The database column keeps its name.

The process that fills it changes.

A learning system needs to treat that change as part of the data generating process, not as background noise.

Imagine a model monitoring whether low-risk patients later receive a particular diagnosis. Halfway through deployment, the health system adopts a more sensitive test. Recorded incidence rises. The model may appear to deteriorate even if patient biology has not changed. Or the opposite can happen: a new guideline discourages testing in a low-risk population, recorded diagnoses fall, and the system appears safer because fewer definitive labels are produced.

The model is looking at a moving measurement regime.

This is familiar to epidemiologists and clinical researchers, but automated systems make it operationally urgent because retraining can absorb the new pattern without explaining it. The system updates. Performance recovers. The institution can move on without noticing that the meaning of the target shifted.

A useful learning record therefore preserves not only the model version but the measurement regime around it.

Which tests were standard?

Which guidelines governed ordering?

Which codes were used?

Which follow-up channels were available?

Which population was eligible?

Which data sources were linked?

Which outcomes were delayed?

The answers do not have to live in the model itself. They have to remain recoverable.

Otherwise a future team may compare two periods and attribute the difference to patients or algorithms when the measurement system changed underneath both.

This is label debt.

The phrase is not meant as another grand framework. It describes an ordinary maintenance problem. Labels are treated as if they were durable facts, but many are products of workflows that drift. The longer a model remains in service, the more likely the machinery that creates its labels will change.

Software teams expect dependency drift. Clinical AI teams need to expect label drift for the same reason.

A dependency can keep returning the same field while changing what the field means.

The safest response is not permanent skepticism. It is versioned context.

When a decision system is retrained, the institution can ask whether the outcome definition is still comparable. When a major testing policy changes, it can mark the break. When external linkage improves, it can expect apparent outcome rates to move. When a subgroup's measurement density changes, it can distinguish better observation from worse health.

These are mundane disciplines.

They are also how a system avoids becoming confident in an artifact of its own instrumentation.

The patient-level consequences are easiest to see near thresholds.

A threshold compresses a continuous uncertainty into an action. Above this risk, test. Below it, do not. Above this score, escalate. Below it, discharge. The threshold may be sensible. Without thresholds, medicine would drown in tests and referrals.

But thresholds create neighborhoods.

A patient just below the line may be almost indistinguishable from a patient just above it. If the action above the line creates a definitive label and the action below it does not, the dataset can develop a sharp difference in knowledge exactly where the clinical difference is small.

That is valuable information about the system.

It suggests that near-threshold cases deserve special attention in evaluation, even when they do not deserve different clinical treatment. Researchers may use natural variation, policy changes, or carefully governed studies to learn around the boundary. Quality teams can monitor later outcomes near the cutoff. Model developers can report uncertainty and support density rather than only the point score.

The goal is not to undermine the threshold.

It is to keep the threshold measurable.

A threshold that cannot be evaluated after deployment gradually becomes tradition.

Medicine has many traditions that began as reasonable responses to evidence available at the time. Some remain excellent. Some persist after technology, populations, costs, or alternatives change. A learning system needs a way to tell the difference without waiting for a dramatic failure.

That means the institution must preserve some disagreement with itself.

This disagreement can be statistical. A benchmark model produces a different estimate. A subgroup analysis shows instability. A calibration check reveals drift.

It can be clinical. Specialists consistently override the recommendation in a narrow situation and can articulate why.

It can be external. Another health system using a different pathway reports different outcomes.

It can be temporal. The same rule performs differently after a change in disease prevalence or testing technology.

It can be patient-reported. People describe consequences that the structured record does not capture.

None of these signals is automatically correct.

Their value is that they create a route by which the dominant system can be questioned.

There is a temptation to treat disagreement as a defect to be engineered away. In production systems, unnecessary disagreement creates friction. Two clinicians giving contradictory advice can confuse a patient. Two models giving different scores can slow a workflow. A hospital cannot hold a philosophy seminar over every discharge.

The operational answer is triage.

Routine agreement can remain routine.

Persistent, consequential disagreement can be sampled for review.

The sampling itself can be designed. Not every override needs a committee. Not every later diagnosis needs a root-cause investigation. The institution can select cases where the disagreement is large, where the outcome is severe, where the patient lies in a sparse region of the data, or where several similar cases accumulate.

This turns disagreement from anecdote into an evidence stream.

It also protects clinicians from a bad incentive. If every override is treated as insubordination, clinicians learn to follow the model even when they notice something real. If every override is celebrated as human wisdom, the model becomes optional and the institution cannot learn whether the deviation helped.

Logging plus outcomes gives both sides a chance to be wrong.

That is healthier than deciding in advance which side owns judgment.

The problem gets harder when the model influences what clinicians notice.

Decision support changes attention. A risk flag can pull a rare diagnosis into view. A low-risk label can make an alternative explanation feel less urgent. The clinician is not interacting with the same case they would have seen without the model; the model is part of the cognitive environment.

This means comparisons between “human” and “AI” can become misleading after deployment.

The relevant unit is often a coupled system: patient, clinician, model, workflow, test availability, incentives, and follow-up.

If outcomes improve, the institution still needs to know why. Was the model more accurate? Did it cause clinicians to gather better information? Did it standardize a good process? Did it simply increase testing? Did it change which patients received specialist attention?

Different mechanisms have different failure modes.

A system that works because it prompts better history-taking may fail when the interface changes. A system that works because it increases testing may lose value when testing becomes expensive or harmful. A system that works because experienced clinicians know when to ignore it may fail when deployed to a setting with less expertise.

Mechanism is part of transport.

This is why successful deployment in one hospital is not the end of evaluation.

The new hospital may have different staffing, different laboratory turnaround, different prevalence, different access to follow-up, different coding, different patient trust, and different incentives. The model can be identical while the decision system is not.

The unobserved world travels with the workflow.

There is also a question of who gets to define the harm worth observing.

Clinical systems naturally privilege outcomes that are measurable and medically legible: mortality, hospitalization, diagnosis, laboratory values, procedures, length of stay. Those matter. Patients may care about other outcomes too: pain, ability to work, time spent navigating care, anxiety after an incidental finding, the burden of repeated appointments, or whether they understood what happened.

Some of these can be measured. Some are expensive to collect. Some are subjective in ways that make automated systems uncomfortable.

Leaving them out does not make them unreal.

A decision rule optimized against a narrow clinical endpoint can move burden into a dimension the dashboard does not watch. Fewer tests may reduce false positives and cost while increasing uncertainty experienced by patients. More tests may catch disease earlier while creating cascades that dominate people's time and attention. A recommendation can be medically defensible and still impose a burden worth naming.

This does not mean every model needs to optimize every value.

It means evaluation should distinguish the objective from the whole outcome.

A model is usually built to improve something specific. The health system remains responsible for the surrounding effects.

That responsibility returns us to the ethical limit on observability.

The institution will always want more labels than it is entitled to collect. Better follow-up would improve evaluation. More testing would reduce uncertainty. More linkage would fill gaps. More monitoring would reveal behavior after care.

Patients are not required to become complete datasets so that the institution can learn perfectly.

The system therefore has to learn under principled blindness.

That is a useful phrase because it prevents a common mistake: assuming every missing value is a technical defect.

Some data is missing because measurement is costly.

Some because the patient left.

Some because another institution owns it.

Some because nobody knew to collect it.

Some because privacy rules correctly block the collection.

Some because consent was not given.

These forms of missingness have different remedies.

A technical defect may justify better instrumentation.

A fragmented-care gap may justify interoperable but governed exchange.

A rights boundary may justify leaving the field blank.

The learning system must know which kind of blank it is looking at.

Otherwise “more data” becomes a way of erasing the reasons data was absent.

Medicine teaches the broader lesson with unusual force.

Observability is not the same as visibility at any cost.

A good clinical system preserves enough feedback to discover when its thresholds, labels, models, and workflows are wrong, while refusing forms of experimentation and surveillance that violate the people it is supposed to serve.

That balance is not solved once.

It has to be maintained as the system changes.

The patient who was not tested today will remain partly unknowable.

The institution's responsibility is not to eliminate that uncertainty.

It is to avoid turning uncertainty created by its own choices into certainty about the world.