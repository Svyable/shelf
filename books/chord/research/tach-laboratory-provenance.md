# TACH laboratory provenance and limitations

**Evidence status:** Unpublished, self-contained synthetic engineering experiments. These results have not been independently replicated in neural recordings and are not a demonstration of subjective consciousness in any artificial system.

**Authoring record:** Prior TACH-0 through TACH-5 archives and research notes from October 17–18, 2026; original TACH-6 protocol drafted October 17, 2026; TACH-6 corrected exploratory execution completed November 2, 2026. The book uses the corrected run and does not claim a preregistered external study.

**Archive labels in the author's retained research materials:** `temporal_access_lab_v0_6_1.zip`, `temporal_access_lab_v0_7_0.zip`, `TACH6_PROTOCOL.md`, `TACH5_PREANALYSIS.md`, `TACH5_AUDIT.md`, and `TACH6_EXECUTION_REPORT.md`. These are the original conversation/library research artifacts, **not public peer-reviewed papers**. The present Shelf manuscript includes a provenance summary and primary-source links; it does not silently portray the unpublished simulator as an independent neuroscientific dataset.

## Early experiments, TACH-0 through TACH-2

Exploratory restricted-access synthetic signal experiments assessed gating, local recurrence and persistence of a shared estimate. In TACH-2, the separately trained two-way model with feedback had a reported state mean absolute error around 0.411 and the separately trained one-way model around 0.414. Deleting feedback from the trained bidirectional model was harmful, but the retrained one-way control nearly matched its intact performance. **Interpretation:** usage in a particular trained model does not demonstrate necessity across architectures.

## TACH-3 and TACH-4

Synthetic agent experiments introduced action-conditioned sensory predictions, hidden actuator regimes, interventions, and costly diagnostic sampling. In a TACH-3 constructed experiment, randomized-intervention training achieved counterfactual effect MSE about 0.00093 versus about 0.51453 for passive observational training under the study's task design. In TACH-4, across 180 test seeds, total cost per step for active, periodic, and random diagnostic policies was approximately 1.6193, 1.6348, and 1.6809, respectively. These are synthetic demonstration scores, susceptible to model-class and task-design choices; not human agency measures and not a claim of novel algorithmic superiority to strong Bayesian controls.

## TACH-5 constrained-content access

Central estimator received 48 full B-content samples per 256 epochs under matched scheduling budgets in the principal comparisons; local B processing was continuous and a small relevance side channel remained available. Thus the experiment conserved central content bandwidth across compared gates but **did not equalize all local acquisition, computation and information flow**.

On 320 ordinary constructed worlds, novelty gate post-event MSE was approximately 0.7090, periodic 1.0648, and random 1.2225. Under high noise, raw novelty gating failed: novelty 1.2901 versus periodic 1.1109. A rolling local reliability estimate normalized recent innovation scale without increasing central full-content sample count, while increasing local computation.

On 160 fresh noisy worlds, reliability-normalized gate MSE was approximately 0.8823, raw novelty 1.3632, and periodic 1.1331. The normalized-versus-raw difference was about 0.4809 with bootstrap 95% interval [0.4057, 0.5584]. Interpretation: a known-style reliability-aware event-triggered sensing principle repaired noise sensitivity under this task. Different gate times acquired different actual B samples, so these data **do not establish an intrinsic phase effect**.

## TACH-6 dynamic representational remapping

**Protocol:** Written October 17, 2026, after the Shi *Nature* paper (published March 25) and the Hesse bioRxiv posting (October 16), but before the October 26/28 recurrent-binding, thalamic and clinical-modeling papers. Five arms: A shared-state event-triggered remapping; B fixed-code recurrent; C gain-only gate; D generic flexible recurrent; E dual-state unmatched reference. Models A–D each had 902 parameters; E had 1,382. Eight independent training initialization seeds and 160 held-out worlds per stress condition. Parameter envelopes were matched; formal FLOP and peak-activation parity not fully profiled.

**Corrected unseen-combinations results:** A category accuracy 94.5% versus B 94.7%; A conditional identity 19.7% versus B 15.8% (different category-correct subsets). Paired jointly-category-correct identity difference estimates for A: against B +4.3 percentage points, hierarchical 95% bootstrap [-0.4, +9.7]; against C +2.7 [-1.9, +8.0]; against D +4.2 [+0.4, +8.7]. These intervals were exploratory/unadjusted for all contrasts. **The predefined criterion required outperforming each matched B, C and D with an interval excluding zero while preserving category detection. It was not met.**

**Causal intervention:** Disabling A's remapping gate changed conditional identity from approximately 19.7% to 20.1%; delaying the event two steps gave about 20.3%. This does not prove that disabling the gate helps, but **no expected causal deficit was detected**. Full targeted state-geometry/Jacobian and matched perturbational studies were not executed; the presence of a matrix is not proof of an actually used representational switch.

**Distractor stress:** A distractor that had been correlated with category during training was reversed at evaluation. Category accuracy dropped to approximately 46.2% for A and 47.1% for B—near chance for two categories. A first attempt at the reversal accidentally flipped symmetric noise, creating no real distribution change. A generator-validity test detected this, the distractor transformation was corrected, and the study was rerun. Only corrected scores are reported in the final record.

**Reproduction:** The recovered original lab was tested with 53 passing tests. The later TACH-6 implementation reported 62/62 tests passing. Those software tests verify defined code behavior but do not constitute independent replication of neuroscience or evidence of experience.

**Decision:** Do not promote remapping into a required CHORD mechanism. Improve identity-task learning, profile exact compute, inspect representational geometry and targeted perturbations, and then run an independently designed recurrent-binding deadline experiment. A strong generic recurrent or Bayesian control must remain eligible to win.

## Claims excluded from this book

No benchmark result establishes subjective consciousness. A local salience message is not synonymous with unconscious processing. Better timing under different sensory samples is not evidence of a privileged oscillatory phase. A learned code transformation is not equivalent to a biological population switch. Recurrent dependence in a trained model is not proof of architectural necessity. Clinical perturbational thresholds cannot be imported as machine-consciousness scores.

Where the manuscript presents hypothetical robots, object-tracking cases, or future studies, those passages are conceptual experiments—not completed field trials.
