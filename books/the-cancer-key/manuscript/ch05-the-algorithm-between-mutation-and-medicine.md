# The Algorithm Between Mutation and Medicine

A personalized neoantigen vaccine can contain thirty targets and still begin with thousands of possibilities.

That gap is where the algorithm lives.

Sequencing produces mutations. It does not produce a treatment plan. A tumor may contain hundreds or thousands of somatic changes, depending on the cancer and the history that produced it. Only some changes alter proteins. Only some altered proteins are expressed. Only some fragments are processed and presented by HLA molecules. Only some presented peptides are recognized by useful T cells. Only some of those targets are present in enough cancer cells to matter.

The therapeutic problem is therefore a ranking problem under uncertainty.

This is one of the places where modern biotechnology begins to resemble modern software.

The company's claim is not merely that it can manufacture RNA or peptides. Several organizations can do that. The valuable claim is that its system can look at one tumor and choose a better set of targets than a competitor's system, quickly enough and reproducibly enough to affect clinical outcome.

The ranking begins with HLA.

Human leukocyte antigen molecules are among the most variable proteins in the human population. Class I HLA molecules display peptides to CD8 T cells. Class II molecules display peptides to CD4 T cells. Each allele has preferences for particular peptide sequences, lengths and anchor residues.

A candidate mutation therefore has no universal immunological meaning.

The altered peptide must be evaluated in the context of the patient's HLA genotype.

This is why peptide-binding prediction became foundational to the field.

Early computational approaches learned sequence motifs from experimentally measured binders. Later machine-learning systems used larger binding datasets, eluted-ligand data and information encoded in the HLA sequence itself. NetMHC and NetMHCpan became widely used academic tools. Other methods, including MHCflurry, MixMHCpred and HLAthena, approached the problem with different training sets and model architectures.

The names can make the process sound mature enough to be mechanical.

It is not.

Prediction quality varies by HLA allele. Common alleles with abundant experimental data are generally easier to model than rare alleles. Binding is not presentation. Presentation is not immunogenicity. Immunogenicity is not tumor control.

Every model is therefore predicting a proxy for the thing the clinician ultimately cares about.

The distance between proxy and outcome is the central computational risk of neoantigen medicine.

A peptide can bind strongly to an HLA molecule in an assay yet never appear on the tumor surface. The mutated protein may not be produced in sufficient quantity. The proteasome may not generate the relevant fragment. Transport machinery may not deliver it efficiently. Competing peptides may dominate presentation.

Mass spectrometry brought another source of evidence by identifying peptides actually eluted from HLA molecules.

This immunopeptidomic data helps models learn what cells present rather than merely what purified molecules can bind. It also introduces its own biases. Abundant peptides are easier to detect. Some tissues and cell lines are studied more than others. Laboratory workflows differ. A peptide absent from a mass-spectrometry dataset may be biologically absent or simply below detection.

Then there is the T-cell receptor.

The HLA-peptide complex is only one side of recognition. A T cell needs a receptor that can bind it with sufficient functional consequence. The person's immune repertoire has been shaped by genetics, thymic selection, infection history, age, prior treatment and chance.

A prediction system that stops at HLA binding is therefore reading only half the lock.

Some companies and academic groups have tried to incorporate additional features associated with immunogenicity: similarity to known microbial epitopes, difference from the corresponding normal peptide, gene expression, clonality, antigen-processing predictions, T-cell recognition data and structural features of peptide-HLA complexes.

The more features added, the more valuable good training data becomes.

This creates a paradox.

Personalized treatment depends on unique cases, but machine learning improves through repeated cases.

The platform therefore needs population scale in order to become better at individuals.

Public resources supplied much of the early training material. The Immune Epitope Database collected experimentally characterized immune epitopes and made both data and prediction tools broadly accessible. Academic laboratories published HLA-binding measurements and immunogenicity datasets. The Human Genome Project and cancer atlases supplied genomic context. Open-source pipelines integrated mutation calls, HLA typing and candidate ranking.

A small company could enter the field without rebuilding immunology from zero.

That is exactly what a scientific commons is supposed to accomplish.

The commons lowers the cost of the next experiment.

But commercial platforms can eventually learn from data that never returns to the commons.

Imagine a company manufacturing personalized vaccines for ten thousand patients.

For each patient, its systems may record every candidate mutation considered, every peptide ranked, the final antigen set, manufacturing performance, post-treatment T-cell assays, circulating tumor DNA measurements, recurrence and survival. If those data are linked, the company acquires something no public benchmark can easily reproduce: a direct record of predictions followed by consequences.

The failed predictions are especially valuable.

Academic papers tend to emphasize selected candidates, successful immune responses and statistically interpretable outcomes. A commercial production system sees the whole funnel, including candidates never manufactured, manufactured targets that failed to provoke T cells, immune responses that did not prevent recurrence and manufacturing decisions associated with poor product quality.

Negative data becomes a moat when it is private.

That sentence should not be read as an accusation.

A company may have spent enormous sums generating the data. Trial participants consent under particular protocols. Privacy obligations constrain sharing. Competitors can benefit from disclosures without sharing the cost.

The economic logic of secrecy is strong.

The social logic of learning is strong too.

If personalized medicine becomes increasingly algorithmic, the tension between them will shape the speed and distribution of progress.

The issue is not simply whether an algorithm is open source.

A model can be published while its most useful training data remain private. A public code repository cannot reproduce a system trained on proprietary clinical outcomes. Conversely, a proprietary model can be audited if regulators and independent researchers receive enough evidence about its performance across populations.

Transparency has layers.

Source code is one.

Training data are another.

Performance by HLA allele, ancestry, tumor type and mutation class is another.

The ability to reproduce the final target list from the same input is another.

The ability to explain why a candidate was chosen is another.

A patient may need none of the code and all of the accountability.

This is where regulatory science begins to encounter artificial intelligence before the phrase AI medicine appears in the marketing.

A personalized therapy may contain a fixed manufacturing platform whose input is chosen by a changing computational system. If the target-selection algorithm improves over time, has the drug changed?

If a machine-learning model is updated after a thousand new patients, is that a manufacturing improvement, a diagnostic change or a new therapeutic design?

If two versions select different neoantigens from the same tumor, what evidence is required to show that the new version is at least as good?

Traditional drug regulation assumes that the identity of the active ingredient can be specified with great precision.

Individualized medicines complicate identity.

The sequence varies by design. The process becomes the object of standardization.

Algorithms sit at the heart of that process.

This is not unique to vaccines. Personalized T-cell receptor therapies face a related problem. Investigators sequence a tumor, identify candidate mutations, test or predict neoantigen recognition, discover a useful T-cell receptor and engineer patient lymphocytes to express it. The software and laboratory assays decide which receptor enters the final cell product.

The therapeutic payload is downstream from discovery.

In both settings, the platform is partly an automated scientist.

It forms hypotheses about which mutation matters and then commits manufacturing resources to a subset.

The quality of that scientific judgment can be difficult to see from the outside because companies describe pipelines differently. One advertises artificial intelligence. Another emphasizes proprietary antigen prediction. Another highlights immunopeptidomics. Another emphasizes a large HLA database. Another points to clinical validation.

Marketing language is not the same thing as comparative evidence.

The field lacks a universal tournament in which every commercial platform receives the same tumor data, chooses a fixed number of targets and is judged against the same prospective clinical outcomes.

There are benchmark datasets and retrospective comparisons. They are useful. But the highest standard is whether better prediction produces better treatment.

That endpoint is expensive and slow.

A target-ranking algorithm can improve in a week. Overall survival can take years to mature.

This mismatch creates a familiar technology temptation: optimize what is quickly measurable.

Binding prediction accuracy improves. Presented-peptide recall improves. Immune-response rates improve. The product seems better.

Those improvements are scientifically meaningful.

They still require clinical validation.

Cancer is capable of turning excellent intermediate metrics into disappointing patient outcomes.

The August 2026 contrast between personalized mRNA programs illustrates the problem. A large melanoma trial reported that individualized therapy plus pembrolizumab improved recurrence-related endpoints. A colorectal program using another personalized mRNA vaccine was terminated after futility and a subsequent DSMB review of survival data.

The algorithms were not the only difference.

Disease biology, treatment setting, trial design, combination strategy, patient selection, manufacturing details and statistical chance all matter. That is precisely why a computationally sophisticated platform cannot be evaluated only by the elegance of its predictions.

The most seductive version of the neoantigen story says that cancer is becoming an information problem.

There is truth in it.

A mutation is information. Sequencing extracts it. Software ranks it. RNA carries instructions. T cells recognize molecular patterns. Circulating tumor DNA can reveal whether a malignant clone persists.

But cancer is not merely information.

A tumor has mass, blood supply, stromal cells, metabolism, pressure, anatomy and time. A pancreatic tumor wrapped in dense stroma does not become accessible because an algorithm predicted the perfect peptide. A brain tumor does not stop being inside the brain. A rapidly progressive cancer does not slow down while a manufacturing queue processes an elegant target list.

Information has to move through matter.

The best algorithms will therefore be the ones embedded in systems that understand the rest of the disease.

Clonality is a good example.

Suppose a tumor contains ten candidate neoantigens with equally strong predicted HLA binding. Five arise from mutations present in nearly every malignant cell. Five occur in small subclones.

A ranking system that ignores clonality may choose a technically impressive but strategically weak set.

The immune system could eliminate the subclone and leave the trunk of the tumor intact.

The problem resembles military targeting more than classification.

It is not enough to identify something vulnerable.

The vulnerability has to matter to the system being attacked.

Shared driver mutations create another opportunity.

Some recurrent oncogenic mutations, including particular alterations in KRAS, can generate neoantigens presented by certain HLA alleles. These targets are not unique to one patient. They are shared across subsets of patients whose tumor mutation and HLA type align.

That opens a middle ground between fully individualized and off-the-shelf treatment.

A company could build a library of validated neoantigens or T-cell receptors covering common driver/HLA combinations. The patient would still be molecularly matched, but manufacturing might not begin from zero.

This middle ground could alter the economics dramatically.

A bespoke vaccine has a high variable cost for each patient. A library product can spread development and manufacturing costs across a larger population. The tradeoff is coverage. Rare HLA alleles and private mutations remain outside the library.

The optimal future may therefore be hybrid.

Use shared high-value targets when available. Add private neoantigens when necessary. Combine computational prediction with direct measurements of presentation and T-cell recognition. Treat the algorithm not as an oracle but as a search system that reduces an enormous possibility space to a manageable experimental set.

This framing also clarifies what artificial intelligence can and cannot do.

AI is well suited to pattern recognition in high-dimensional data. Protein language models may learn features of peptides and receptors. Structural models may improve understanding of peptide-HLA-TCR interactions. Large multimodal systems may integrate genomic, transcriptomic, immunopeptidomic and clinical data.

None of that repeals the need for prospective evidence.

A model can predict a molecule beautifully and still mispredict a patient.

The most valuable AI in neoantigen medicine may therefore be unglamorous.

It may shorten turnaround. It may reduce false candidates. It may improve HLA coverage. It may identify manufacturing failures sooner. It may decide which assays are worth running. It may help select patients whose tumors are most likely to respond. It may combine immune monitoring with recurrence risk.

Small gains across the workflow can matter more than a single spectacular benchmark.

The algorithm between mutation and medicine is not a hidden accessory.

It is a clinical decision engine whose output becomes physical.

Once code chooses what goes into the syringe, software quality becomes drug quality.

That creates a problem conventional benchmark culture handles badly.

A model can score well because the test resembles the data on which it learned. In HLA prediction, one of the dangers is imbalance: some alleles, peptide families and experimental settings appear far more often than others. A system can learn shortcuts that look like biological understanding when the benchmark repeatedly rewards the same familiar patterns. Strong average performance can coexist with weak performance in the corners where particular patients live.

The problem is not confined to old algorithms.

Larger models can inherit larger datasets without inheriting a representative world. More parameters do not create observations that were never collected. If binding and presentation datasets disproportionately reflect alleles common in well-studied populations, a pan-allele model can generalize impressively while still carrying unequal uncertainty.

This is why calibration matters as much as ranking.

A platform should not only say which target is first. It should have some disciplined account of how much confidence belongs to that ordering. Candidate A may outrank candidate B by a small score difference that is meaningful for one well-characterized HLA allele and nearly noise for another. The software interface may display both as clean decimals. The biology has not promised decimal-level certainty.

Good calibration changes decisions.

If the model knows it is uncertain, the platform can diversify the vaccine across several plausible targets, trigger an orthogonal assay, prioritize experimentally observed presentation or avoid overcommitting scarce manufacturing slots to a brittle prediction. An uncertainty estimate is useful only when the workflow is allowed to respond to it.

That is an important difference between scientific software and product software.

A research model can publish an area under a curve and invite others to improve it. A therapeutic selection system has to decide what happens to the patient on Tuesday.

Versioning makes the problem more concrete.

Suppose a company updates its ranking model every quarter. A patient treated in January and one treated in October may have identical molecular inputs but receive different target sets because the model changed. That can be progress. It can also complicate evidence. A trial nominally studying one platform may contain several generations of target selection unless the changes are controlled and documented.

Freezing the model for years is not an attractive answer.

It would preserve comparability by refusing learning.

The more sensible approach is change control: define which updates are minor enough to validate through analytical evidence, which materially alter selection behavior, and which require stronger clinical bridging. Record the model version, feature pipeline, databases and thresholds used for every patient's product so an investigator can later reconstruct why those targets were chosen.

Reconstruction is not nostalgia.

When an unexpected toxicity or failure occurs, the question will be specific. Did the model select a peptide too similar to a normal protein? Did an HLA call change? Did a database update reclassify a mutation? Did an altered threshold replace a clonal target with a subclonal one? Without provenance, “the algorithm chose it” becomes a dead end.

The same provenance is necessary for fairness.

If outcomes differ across HLA groups, investigators need to know whether the disparity arose from biology, sample quality, target availability, model performance, manufacturing or access. A black box at the center of the process can make all of those explanations indistinguishable.

This does not require publishing every weight of a proprietary model.

It requires enough auditability that proprietary knowledge does not become proprietary uncertainty imposed on the patient.

There is a commercial reason to want the same thing.

An algorithm that cannot explain its own operational history is hard to improve. The company loses the ability to separate a failed biological hypothesis from a failed data pipeline. It may retrain on noisy labels, overreact to a small clinical subgroup or chase a benchmark improvement that never reaches the tumor.

The advantage of running a closed learning loop is only real if the loop is clean.

The field will eventually need external comparisons too.

Not a single winner-take-all leaderboard, because no retrospective dataset can reproduce every clinical context, but challenge sets that deliberately stress rare HLA alleles, unusual mutation classes, low-expression targets, tumor heterogeneity and shifts between laboratory platforms. The important question is not whether a model performs well on average. It is whether anyone knows where it stops performing well.

That is the point at which algorithmic quality becomes clinical honesty.

A physician can explain an uncertain experimental therapy if the uncertainty is visible. A patient can consent to a platform that is still learning. What neither can do well is consent to confidence manufactured by the interface.

The deepest achievement of computation in neoantigen medicine will not be making the ranking look inevitable.

It will be making the uncertainty useful enough that better targets are chosen anyway.

The ranking problem also creates a subtle competition between breadth and evidence.

A platform can include more targets to hedge against prediction error. That strategy is attractive when manufacturing can carry the additional sequences cheaply and safely. But adding targets is not free simply because the payload is digital upstream. Longer constructs can create design constraints. More peptides can complicate formulation. Immune responses can differ in magnitude, and the strongest responses may not align with the targets the algorithm originally ranked highest.

The platform therefore has to decide how much uncertainty to absorb into the product and how much to resolve before manufacture.

An assay-heavy strategy can spend more time experimentally validating candidates before selecting them. A prediction-heavy strategy can move faster and include more candidates. The first may improve confidence while threatening turnaround. The second may preserve time while accepting that several payload slots will be biologically unproductive.

There is no permanent optimum because the value of time changes by disease setting.

A patient with aggressive metastatic disease cannot wait for a beautiful laboratory tournament among candidate peptides. A patient recovering from surgery may have more room for additional validation if the treatment sequence allows it. The algorithm's objective function is therefore partly clinical: maximize useful target quality subject to a treatment clock.

That is another reason benchmark accuracy alone is insufficient.

A slower model-and-assay system that improves target quality by a few percentage points can make the overall treatment worse if it pushes too many patients beyond the manufacturing window. A slightly less accurate model that returns decisions quickly may create more real-world benefit.

The best ranking system is not the one that wins the cleanest offline contest.

It is the one that improves the treatment strategy after time, uncertainty, manufacturing and disease are counted together.

Once code chooses what goes into the syringe, latency becomes drug quality too.