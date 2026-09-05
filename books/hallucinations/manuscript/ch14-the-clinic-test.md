# The Clinic Test

Medicine has a different relationship with uncertainty from law.

The courtroom asks whether an authority exists, whether evidence is admissible, whether a burden has been met. Clinical work often begins where the evidence is incomplete. Symptoms overlap. Patients remember imperfectly. Tests have false positives and false negatives. Treatments have side effects. A physician may have to act before the full picture is available.

Uncertainty is not a defect in the medical system.

It is part of the patient.

That makes clinical AI a particularly demanding test for hallucination. A system cannot be made safe merely by refusing to speak whenever certainty is absent, because certainty is often absent when care is still required. Nor can it be made safe by producing the most plausible completion, because plausible detail can enter a record and become clinically consequential.

The system has to distinguish kinds of uncertainty.

A missing medication is not the same as an unlikely diagnosis. An ambiguous phrase in a note is not the same as a conflicting laboratory result. A patient's recollection is not the same as a signed pathology report. A clinical impression is not the same as a confirmed finding.

Medicine survives by carrying those distinctions forward.

Generative systems can either help preserve them or smooth them away.

Consider the electronic medical record. It is already an imperfect narrative of a human life. Notes are copied. Problem lists persist after conditions resolve. Medication lists contain old entries. Templates insert boilerplate. Different specialists record different interpretations. Patients move between institutions whose systems do not align.

The chart is not reality.

It is a history of attempts to represent reality.

That is precisely why AI summarization is attractive. A clinician facing hundreds of pages does not need another document. She needs orientation. What changed? What is active? What is uncertain? Which finding belongs to which episode? What did the patient actually report?

A language model can compress that complexity remarkably well.

It can also compress away the warning labels.

A 2024 study in *JAMA Network Open* examined large language models analyzing unstructured clinical notes and reported both useful performance and hallucination-related limitations. The specifics depend on models, tasks, and evaluation design, and the technology has continued to change. The durable point is that clinical-note analysis is not simply summarization in the literary sense. An invented or altered detail can change a medical interpretation.

That raises a question every deployment should answer: what is the system allowed to add?

If the task is extraction, the safest answer may be nothing beyond what the record says.

If the task is summarization, the system may reorganize and compress but should preserve uncertainty.

If the task is clinical decision support, inference is expected—but inference should be clearly distinguished from charted fact.

These modes should not blur.

A sentence such as "The patient developed chest pain after starting medication X" looks simple. The chart may contain a note saying the medication began Monday and another saying chest pain began Tuesday. The temporal relationship is an inference. It may be useful. It is not the same as a clinician documenting, "Chest pain began after medication X."

The model can make the relation linguistically explicit before anyone made it clinically explicit.

That can be the beginning of good reasoning or the beginning of a false causal story.

Medicine is full of such stories because temporal order is seductive. Event A happened, then B happened, therefore A caused B. Clinicians are trained to resist that shortcut, but no one resists perfectly. A generated summary that presents the sequence as a coherent narrative can increase the temptation.

The machine's fluency changes the shape of the chart.

This matters because later clinicians often read summaries, not raw records.

A generated sentence can become part of handoff. The handoff becomes part of the next note. The next note may be copied into a discharge summary. The discharge summary may become the patient's future history.

The original inference hardens.

This is shared hallucination in one of its most serious forms: the medical record beginning to remember something that was never established.

Clinical systems need stronger epistemic typing than ordinary text.

Reported by patient.

Observed by clinician.

Measured by test.

Imported from outside record.

Inferred by model.

Suggested differential.

Confirmed diagnosis.

Disputed or superseded.

Those distinctions already exist conceptually in medicine. AI should not erase them when generating prose.

There is another problem: omission.

Public discussion of hallucination focuses on invented content because invention is vivid. In medicine, a missing fact can be equally dangerous. A summarizer that omits a drug allergy, anticoagulant use, renal impairment, pregnancy, or prior adverse reaction can produce a summary containing no false sentence and still mislead.

Truthfulness is not only the absence of fabrication.

It is adequate representation for the task.

This makes evaluation difficult. A model can achieve high factual precision by mentioning only facts it is very sure about. The resulting summary may be clinically useless if it leaves out the one uncertain detail the physician needed to see.

Precision and recall become moral as well as statistical choices.

The right balance depends on context.

A surgical handoff may tolerate different omission risks from an educational explanation. An alerting system may prefer false positives in some cases and aggressively avoid them in others because alarm fatigue itself creates harm. A diagnostic assistant may need to include rare but dangerous alternatives while ranking them carefully.

There is no universal hallucination threshold for medicine.

The clinical question is always: error relative to what consequence?

This is why benchmark performance can be misleading when imported directly into care. A model may answer board-exam questions impressively. Board questions have defined options, curated facts, and a correct answer. Real charts contain missingness, contradiction, messy timing, social context, transcription errors, and patients whose bodies decline to follow the textbook.

The benchmark measures capability under one distribution.

The clinic supplies another.

A mature deployment therefore evaluates the system on the institution's own tasks and data. How does it behave on incomplete charts? On copied-forward errors? On multiple patients with similar names? On notes containing negation? On changes after a medication reconciliation? On historical diagnoses that should not be treated as active?

The details are not glamorous.

They are where harm lives.

Medicine also exposes the weakness of a generic "human review" requirement.

Clinicians are already overloaded. Documentation burden is one of the reasons generative tools are attractive. If the safety model requires the physician to compare every generated sentence with every underlying note, the product has moved the work rather than removed it.

Review must be targeted.

The system can highlight which statements are direct extraction and which are inferred. It can attach source spans. It can surface contradictions rather than choosing one silently. It can flag when the chart lacks the evidence needed for a conclusion. It can show what changed since the last verified summary.

That turns the clinician from proofreader into judge.

The distinction is important.

Humans are not necessarily better than models at scanning thousands of lines for a tiny fact. Machines can help there. Humans remain responsible for deciding what the fact means in the patient's context, especially when tradeoffs, values, physical examination, or missing information matter.

The safest division of labor is not "machine drafts, human checks everything."

It is "machine makes the evidence easier to inspect, human owns the consequential interpretation."

Even that line will move as systems improve.

Some interpretations are already formalizable. Drug-interaction checking can use structured databases. Dose calculations can be verified with deterministic tools. Diagnostic probabilities can be estimated from validated models under defined conditions. Generative AI can orchestrate those tools without pretending the language model itself is the source of truth.

The architecture should match the claim.

Use a calculator for arithmetic.

Use a drug database for contraindications.

Use the chart for patient facts.

Use a model for synthesis and communication where synthesis and communication are the job.

The mistake is asking one generative engine to impersonate all of them.

Clinical hallucination also shows why confidence needs operational meaning.

A model saying "I am highly confident" is not a clinical measurement. A system could instead report that three source notes agree, the medication list was reconciled yesterday, and no contradictory allergy entry was found. That information is more useful than a naked percentage.

Evidence confidence should be decomposable.

The same applies to uncertainty in diagnosis. A differential diagnosis is not a list of equally likely possibilities. Nor should a model's ability to name an obscure disease elevate that disease merely because the name exists in the output.

Generated lists can distort attention.

Clinicians use differential diagnosis partly to avoid premature closure. The list is a tool for thinking. A model can improve that process by surfacing possibilities a person might miss. But a long generated list can create its own availability bias. Rare conditions become cognitively present because the machine named them.

More possibilities are not always more truth.

The system needs ranking, evidence, and consequence.

What findings support this possibility? What findings argue against it? Which dangerous diagnosis must be ruled out even if unlikely? What missing test would change the ranking? These are better outputs than an ornamental list of diseases.

The patient adds another dimension.

Consumer-facing medical AI can make knowledge more accessible, especially when appointments are scarce or medical language is difficult. It can help people prepare questions, understand terminology, organize symptoms, and navigate care.

It can also meet a frightened person at exactly the moment when certainty is most attractive.

The user asks, "Do I have cancer?" The model does not have a physical exam, imaging, pathology, or complete history. The humane response is neither false reassurance nor melodramatic possibility generation.

It has to manage both emotion and evidence.

This is where the distinction from sycophancy becomes life-sized. A person may arrive convinced that a symptom proves a feared diagnosis. Agreeing feels validating and can be harmful. Flat contradiction can also be harmful if the model lacks enough information.

The truthful stance is often conditional.

These symptoms can have several causes. Some require urgent evaluation. Here are the warning signs. Here is what a clinician would need to know. Here is what cannot be determined from this conversation.

That answer may feel less satisfying than a diagnosis.

It is more useful because it preserves the next decision.

The best clinical AI should be judged partly by whether it gets the user to the right next action under uncertainty.

That is a different objective from producing the right label.

Medicine has always known this. A good clinician does not merely name diseases. She triages, asks, examines, orders, watches, revises, and sometimes waits.

Diagnosis is a process.

Generative AI is tempted to turn it into a sentence.

The clinic test is whether the technology can resist that compression when compression would mislead.

There is a final reason medicine matters to this book. Medical records follow people.

A mistaken fact can become sticky. A diagnosis once entered may be copied forward for years. Patients have long struggled to correct erroneous records even without AI. Automated summarization and extraction can either worsen this persistence or make correction easier.

If a model created the statement, the record should know that.

If a clinician verified it, the record should know that too.

If a patient disputes it, that dispute should not disappear during the next summary.

The right to challenge a record is part of the right to be treated as the person rather than the representation.

AI will make representations more comprehensive, more searchable, and more fluent.

The danger is that the fluent chart begins to outrank the messy human in front of the clinician.

A good system does the opposite.

It uses the chart to bring the person back into view.