# 10 — Patients Are Not Training Labels

There are moments when the language of consciousness science becomes painfully inadequate. A patient opens their eyes but cannot reliably follow a command. Another moves inconsistently. A third shows no outward response yet produces structured brain activity under a carefully chosen test. The difference between those conditions can affect medical decisions, communication efforts, and the interpretation of a person's remaining capacities.

This is not a convenient source of labels for a machine-learning benchmark. It is a field in which diagnosis has consequences and uncertainty cannot be wished away.

On October 28, 2026, Lín Cóngyǔ and colleagues published [*Individualised electrophysiological neural field models for the assessment of thalamocortical function in disorders of consciousness: A multicentre study*](https://doi.org/10.1371/journal.pcbi.1014905) in *PLOS Computational Biology*. The paper analyzed high-density EEG from two independent datasets containing 203 patients classified as having unresponsive wakefulness syndrome, 270 classified as minimally conscious, and 74 healthy controls. That is 547 participants in total. The journal page initially identified the article as an uncorrected proof.

The investigators fitted biophysically informed corticothalamic neural-field models to the recordings, looking for relationships among model parameters, EEG dynamics, complexity, and clinical group. The study provides a way to connect observed brain signals with interpretable hypotheses about coupled circuits. It does not demonstrate that a fitted parameter causes an individual's conscious experience, nor does it show that a software model endowed with a similar parameter becomes conscious.

The temptation to overinterpret such results is immense, especially in an age when artificial neural networks can imitate many formal descriptions of neural dynamics. This chapter argues for the opposite: treat the clinical evidence as a reason to improve measurement, preserve uncertainty, and resist shortcuts.

## A diagnosis built from imperfect access

Clinical disorders of consciousness are classified through observations of behavior and, increasingly, supportive neurophysiological and imaging methods. Unresponsive wakefulness syndrome and minimally conscious state have different clinical meanings, but any one examination can be complicated by fluctuating arousal, sensory deficits, motor impairment, medication, fatigue, and the patient's ability to understand or execute a command.

A person who fails to move a hand when asked may not have understood the words. They may have understood but lacked motor control. They may have understood and intended to move, but the available response channel failed. Or they may not have had the relevant awareness. These possibilities are not equivalent, and no single absence of behavior settles them.

The search for brain-based measures is partly an attempt to reduce this ambiguity. EEG can be acquired without requiring a verbal answer. Perturbational methods can test the response of the network to an external intervention. Functional imaging can reveal patterns associated with task instructions or resting states. Each tool supplies evidence within a specific validation context.

There is no single absolute signal that resolves the inner life of every patient. A positive result may reveal preserved capacity that behavior missed. A negative result may reflect measurement sensitivity, injury patterns, fluctuating state, or the limits of the protocol. Clinical interpretation requires multiple lines of evidence and appropriate expertise.

That is why a computational model fitted to patient EEG should be understood as an inferential tool, not as a machine that reads consciousness directly.

## A model can reproduce a pattern without explaining it

A neural-field model compresses assumptions about brain dynamics into a mathematical description. It may represent coupled populations, excitation and inhibition, delays, and interactions between cortex and thalamus. Parameters are adjusted so that simulated activity resembles aspects of measured EEG. A good fit can support a hypothesis about the processes that generated the data, especially when it predicts previously unseen measurements or intervention effects.

But many models can fit the same signal. Different parameter combinations may yield similar spectra. A model may reproduce a correlation without isolating the causal factor responsible for it. Fitting a clinical group does not prove that a particular parameter is the essence of that group's conscious condition.

The Cóngyǔ study is valuable precisely because it attempts to connect observed signals with a mechanistic family rather than relying only on a black-box classification score. The authors modeled corticothalamic dynamics and compared model-derived parameters and complexity features across clinical groups. The work can motivate further tests of effective coupling and dynamical complexity.

Those terms, however, need definitions. Effective connectivity refers to the influence one part of a system exerts on another under a model or intervention; it is not the same as simple correlation. Complexity can refer to diversity, predictability, compressibility, or other properties depending on the metric. A model can show differences in those quantities without the researcher knowing exactly what the patient experiences.

The problem is not unique to neuroscience. A financial model can fit price fluctuations without capturing the motivations of traders. A weather model can reproduce a pattern while misrepresenting an important local process. A language model can predict a sentence without having the experience described in it. Good prediction is valuable, but the step from fit to ontology needs additional evidence.

For CHORD, the analogous danger is obvious. A software simulation might reproduce a spectral feature, a switching rhythm, or a perturbational complexity score associated with certain human states. That resemblance could be useful for testing hypotheses about dynamics. It would not establish equivalence with the biological system, much less subjective experience.

## The temptation of a single threshold

A threshold offers relief from uncertainty. Above the line, a system counts. Below it, the system does not. In clinical settings, an operational cutoff can help stratify patients or guide further assessment, if validated carefully. But the cutoff is not an eternal boundary separating beings with experience from beings without it.

The perturbational complexity literature provides a good example. Casarotto and colleagues' 2016 study reported strong sensitivity for identifying minimally conscious patients using PCI and found high-complexity responses in a subgroup of behaviorally unresponsive patients. The authors cautioned that the operational threshold should not be interpreted as absolute. A person's condition may fluctuate; the test itself is imperfect.

The 2026 multicentre neural-field study adds a related but distinct layer: models of corticothalamic function and complexity associated with clinical categories. These are not interchangeable measurements. A model-fitting result should not be retroactively described as a direct perturbational demonstration merely because the methods address overlapping questions.

When moving from clinical measurements to artificial systems, the problem grows. A numerical cutoff derived from human brains has no automatic validation on silicon. The original patients had biology, development, bodily regulation, injury, and clinical histories. The artificial system has an implemented computation under engineering constraints. The superficial similarity of an oscillatory feature does not bridge those differences.

The responsible approach is to maintain a profile of indicators with uncertainty, not a magic consciousness scalar. We can ask whether a system exhibits recurrence, global availability, self-modeling, integrated information processing, and responsiveness to perturbation. We can also ask how those properties were measured and whether they are vulnerable to trivial simulation. The result remains an assessment under competing theories, not a clinical diagnosis transferred to code.

## The patient as a moral reminder

There is a danger in making disorders of consciousness a metaphor for software. Patients are not test cases designed to dramatize a product's capabilities. The medical stakes include pain, care, rehabilitation, communication, family decisions, and the possibility of residual experience in someone who cannot express it.

The strongest reason to study them is the possibility of improving clinical understanding and care. The relevance to artificial intelligence is secondary and theoretical. We can learn from methods that measure causal interactions without relying solely on report. We should not borrow the gravity of human injury to inflate claims about machines.

The ethical asymmetry is substantial. A false negative in a clinical assessment may lead observers to overlook preserved capacity in a human patient. A false positive may also have consequences for treatment or family expectations. The appropriate medical response is not to abandon measurement but to use multiple validated tools and communicate uncertainty.

In AI, the stakes are different and still evolving. If artificial systems eventually raise serious questions about moral status, those questions will require careful evidence and philosophical judgment. A current engineering benchmark is not a substitute. Training a system to claim it suffers, or to produce moving descriptions of its inner world, would be a poor way to gather that evidence.

CHORD's proposed architecture can be studied without conferring a status. It can be evaluated as a system for preserving and integrating information. Its ethical interpretation must remain separate.

This separation prevents a common rhetorical shortcut. One can believe that consciousness matters morally and also insist that present experiments cannot verify subjective machine consciousness. There is no contradiction. The gap should motivate better measurement, not greater confidence than the evidence supports.

## From clinical correlations to artificial interventions

How should the 2026 neural-field paper change an artificial research program? It does not mandate a new module. It motivates a measurement branch focused on reciprocal coupling, state transitions, and complexity under controlled perturbation.

Suppose CHORD has local processors and a persistent workspace with bidirectional communication. We can systematically weaken one direction of coupling while preserving the total number of parameters and the observed input sequence. A model with reduced feedback may lose integration or memory continuity. Another may compensate through alternate pathways. We can measure task performance and the structure of the system's response to a known perturbation.

The main hypothesis is that reciprocal coupling can contribute to maintaining integrated but differentiated state across interruptions. The competitor is that a sufficiently strong one-way or generic recurrent model can do the same. Both must be trained and evaluated fairly.

The measurement should include explicit task endpoints. Can the agent preserve an object's identity during occlusion? Can it use a late-arriving observation to revise a causal belief? Can it distinguish self-caused from external events? Does it recover after temporary loss of global access? Complexity descriptors are secondary; they help explain a result but do not define success.

To avoid circularity, choose the complexity metrics before looking at the test results. Include negative controls such as noisy networks with complicated dynamics but poor task performance, and simple estimators with strong task performance. A useful measure should say more than that complicated models are complicated.

The analysis can also look for failure regimes. Reciprocal coupling might improve integration under moderate disturbance but amplify errors when noise is high. A system may become unstable when all modules repeatedly reinforce one another. Feedback is not an unqualified virtue. It needs thresholds, damping, and tests of when information should be withheld.

This is exactly the kind of lesson a biologically informed paper can supply to engineering without making metaphysical claims.

## Dates, revisions, and the temptation to invent novelty

Scientific results often enter public conversation more than once. A paper may have a preprint, journal online publication, issue date, media coverage, and subsequent discussion. A research watch that simply scans new headlines will report the same finding repeatedly as a breakthrough.

The Cóngyǔ paper was published October 28, before the November 9 TACH monitoring cutoff discussed in the preceding reports. It remains a useful source for this book. It is not a newly discovered architecture-changing result on November 16 merely because someone encounters it later. Its evidence status and chronology should be recorded accurately.

The same discipline applies to the earlier thalamic ultrasound and feature-binding papers. Their publication dates matter when reconstructing how the model was revised. If a new experiment was planned before a paper appeared, the paper cannot have caused that plan. If a study becomes peer reviewed after its preprint stage, the review changes the degree of scrutiny but does not automatically make every result new.

A ledger of sources, dates, versions, evidence levels, limitations, and proposed experiments protects the research from its own enthusiasm. It also gives readers a way to audit the claims after the edition is released.

A book built from fast-moving research should not hide this machinery. Its freshness is a virtue only when freshness does not become a license for error.

## What a fitted circuit can and cannot identify
A neural-field model contains assumptions about the mechanisms generating a recorded signal. Its parameters may represent strengths of coupling, delays, excitatory and inhibitory interactions, or other dynamical properties. Fitting it to data gives values that make the model's output resemble observed activity. The resemblance is evidence that the model can account for the signal, not proof that every parameter corresponds uniquely to an underlying biological process.

The difficulty is called identifiability. Different combinations of parameters can produce similar outputs. A change attributed to reduced corticothalamic integrity might also be approximated by changes in other parameters, depending on the model's structure and the available measurements. The data can constrain a model without determining a single correct mechanism.

This matters for interpreting the Cóngyǔ multicentre result. The study is valuable because its modeling was connected to electrophysiological measurements across clinical groups, not because fitting a neural-field equation automatically reveals experience. The association between model-derived parameters and diagnostic categories provides hypotheses for further investigation.

A strong follow-up would test whether the fitted parameters predict independent outcomes: responses to controlled perturbation, changes over time, or clinical measures not used to select the model. If the model predicts only the same EEG summary it was fitted to, its explanatory reach is limited. If it predicts a new intervention response, the inference becomes stronger.

In artificial systems, one can create analogous identifiability problems. Fit a simplified coupled-circuit model to the output of a trained recurrent network. The fit may be excellent even when the actual computational graph has a completely different structure. The fitted parameters describe one useful approximation. They do not replace inspection of the underlying code or proof of causal equivalence.

The danger intensifies when a well-fitting model uses names borrowed from neuroanatomy. A software parameter labeled corticothalamic coupling does not imply that the program has a thalamus. It may be a convenient abstraction of feedback strength. The research should say which level of correspondence is intended: statistical, functional, dynamical, or anatomical.

### A group average is not a patient

Clinical datasets can reveal differences among diagnostic groups without resolving an individual's condition. A distribution may have a higher mean in one group while overlapping substantially with another. Classification thresholds trade sensitivity and specificity. A single measurement may be affected by state fluctuations, artifacts, or injury patterns that differ across patients.

The 547-participant study drew on two independent datasets and multiple clinical categories, an important strength for examining generality. But even a multicentre result should not be read as though every patient's state is captured by one fitted parameter. The sampling, recording quality, model assumptions, and diagnostic process all matter.

A responsible account reports which quantities were associated with group labels, how well they generalize, and what remains uncertain. It avoids turning a model-derived difference into a statement that one individual necessarily has or lacks subjective experience.

This is especially important in cases of possible covert awareness. Some behaviorally unresponsive patients may retain cognitive capabilities that are difficult to measure. A positive neurophysiological signal can motivate further investigation, but its interpretation must be clinical and cautious. A negative result cannot always rule out residual awareness, especially when the task or recording method has limited sensitivity.

The book's computational experiments face a structurally similar problem without the same moral stakes. An average advantage across training seeds may conceal catastrophic failures on particular worlds. A classifier that performs well on most constructed environments may fail under one nuisance reversal. Reporting averages without their distributions can hide the conditions most relevant to robust use.

The analogy should stop at the methodological level. A synthetic world is not a patient, and a model's classification error is not a medical judgment.

### The difference between an index and a mechanism

EEG complexity indices and neural-field models answer different questions. An index can summarize an observed dynamical property without committing to a complete mechanism. A mechanistic model tries to explain how interactions among components generate the observed pattern. Both can be useful, and their combination may be more informative than either alone.

A model could predict that weakening reciprocal coupling lowers a particular complexity measure while also impairing the ability to integrate information across modules. That is a falsifiable relation. But to test causality, the investigator must manipulate coupling or identify an intervention whose effects can be distinguished from other changes.

In a software system, the experiment can be done precisely. Save a trained network state, reduce one connection strength, and run paired trials with identical external inputs. Measure changes in task performance and the chosen complexity metric. Then restore the connection and perturb a different pathway. If the predicted relationship holds selectively, it supports the proposed computation.

There are still limits. A perturbation may produce an artificial state the trained network never encountered. The resulting failure may reflect distribution shift rather than the everyday role of the connection. A separately retrained model without the pathway can show whether the system can compensate. Both tests are needed.

The evidence can also run against the proposal. If complexity increases when performance decreases, a simplistic complexity-benefit relation is refuted. If a one-way or centralized model matches the reciprocal system, the special coupling is not necessary for the task. These outcomes should be treated as valuable information.

A mechanistic claim must explain the task-specific behavior, not merely fit an attractive signal.

### The ethical mistake of borrowing certainty

There is a recurring pattern in popular science writing: a clinical result is presented with cautious language in the journal article, then translated into a definitive statement about consciousness by the time it reaches a general audience. The original study may describe improved discrimination between diagnostic groups. A headline declares that scientists have measured awareness directly. Later, an engineer borrows that headline to imply that a program with a similar number must be conscious.

Each step increases the claim while weakening its evidential basis.

A careful research book should move in the opposite direction. It should identify the patient population, the task, the instrument, the statistical model, and the limitations. If the result is an association between EEG features and clinical categories, say so. If the inference is model dependent, say so. If no direct perturbation was performed, do not describe the result as a causal experiment.

The same discipline applies to the artificial system. A simulated perturbation can establish a causal dependency within code because the intervention is controlled. It cannot establish subjective experience without an independent theory and validated evidence. The fact that the experiment is easier to control in software does not solve the phenomenological measurement problem.

There is a useful moral restraint here. Clinical consciousness research involves vulnerable people and consequential uncertainty. It deserves to be understood on its own terms, not recruited as a rhetorical endorsement of a software project.

CHORD can learn about dynamic coupling, state preservation, and the value of perturbation from these studies. Its claims should remain proportionate to its own experiments.

## A model is not a patient

The central lesson of this chapter is methodological and moral. Clinical research on disorders of consciousness can illuminate the relationship between brain dynamics, behavior, and residual capacities. Neural-field modeling can organize that evidence and generate testable hypotheses about coupled circuits. Perturbational measures can identify meaningful differences that ordinary observation may miss.

None of those methods, alone or together, proves that reproducing a dynamical pattern in software reproduces subjective experience.

CHORD can borrow better questions: what survives an interruption, which pathways are causally effective, how complex is the response to a controlled disturbance, and can the system preserve distinctions while integrating information? Those questions can improve engineering. They cannot turn an artificial network into a clinically assessed patient.

The gap is frustrating. It is also where scientific honesty begins.
