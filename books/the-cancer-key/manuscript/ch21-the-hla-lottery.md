# The HLA Lottery

Personalized medicine sounds like the opposite of population medicine.

The phrase suggests escape from averages. Your tumor is sequenced. Your mutations are called. Your candidate targets are ranked. The vaccine, cell product or treatment plan is built around what is happening in you rather than around what happened, on average, in the patients who came before.

That is real progress.

It does not abolish the population.

Every neoantigen has to pass through a molecular institution that a patient did not choose: the human leukocyte antigen system, or HLA. These proteins sit at the center of the immune system's ability to inspect what is happening inside cells. They hold fragments of proteins and display them on the cell surface. T cells examine those displays. A mutation can create a potentially excellent cancer-specific peptide and still be therapeutically irrelevant if the patient's HLA molecules do not present it effectively.

The tumor writes the message. HLA determines which envelopes can be opened.

HLA genes are among the most variable genes in the human genome. That diversity is one reason our species can survive a varied microbial world. A population in which every person presented the same narrow set of peptides would offer pathogens a frighteningly stable target. Variation spreads risk.

The same diversity complicates cancer immunotherapy.

One patient's HLA molecules may bind a mutated peptide tightly. Another patient's molecules may barely bind it. A candidate neoantigen that looks obvious in a molecular diagram may disappear from therapeutic consideration when the patient's HLA type is taken into account. Shared mutations do not automatically create shared medicines because the same altered protein can be presented differently across people.

This is not an obscure edge case. It is part of the machinery.

The practical neoantigen pipeline usually contains an HLA step very early. A tumor and normal sample are sequenced. Somatic mutations are identified. The patient's HLA alleles are inferred or measured. Software generates candidate peptides and estimates which are likely to bind the relevant HLA molecules. Other models may estimate expression, processing, stability, clonality and immunogenicity. Candidates are ranked. A subset becomes the payload.

The ranking system therefore inherits the distribution of the data used to build and validate it.

That is where personalization meets the old problem of representation.

A model can be individualized at inference time and still be population-biased at training time.

Suppose one HLA allele has been studied in thousands of peptide-binding experiments and another in a few dozen. The first will naturally attract better predictors, more benchmark data, more known epitopes and more confidence. Suppose clinical trials enroll heavily from populations in which a subset of HLA types is common. The resulting immunogenicity evidence will be deeper for those alleles. Suppose a platform improves by learning from every manufactured product, every immune assay and every clinical outcome. The platform's future performance will depend partly on who had access to the platform in its early years.

Personalization can compound its own sampling history.

This is a familiar pattern in medicine. Pulse oximeters, dermatology images, kidney equations, polygenic risk scores and clinical algorithms have all forced the same basic recognition: a device can produce one number for one patient while carrying assumptions inherited from the population on which it was designed. The neoantigen field does not escape that logic merely because its computational output is bespoke.

The HLA problem is more interesting because the variation is not simply a demographic proxy. The molecules themselves differ. Human populations have different allele frequencies because ancestry, geography, selection and demographic history shaped them. Race is a crude social category; HLA is biological variation. Yet the two can correlate enough that unequal datasets become unequal technical performance.

This creates a strange possibility.

The most individualized medicine ever commercialized could work best for the people who are most statistically represented.

That would not happen because the manufacturer deliberately excluded anyone. It could emerge from a sequence of reasonable local decisions. Clinical sites open where trials are easiest to run. Tissue is collected where academic infrastructure already exists. Researchers focus on common alleles because common alleles offer more tractable sample sizes. Benchmarks reward performance where ground truth is abundant. Companies validate where regulators will accept the evidence. Payers cover where clinical utility is clearest. More treated patients generate more proprietary data. The flywheel turns.

The inequity would be architectural rather than conspiratorial.

This matters for how we think about the value of data in the coming industry.

A sequence is not enough.

For neoantigen medicine, the most valuable dataset may connect tumor mutations, HLA type, transcript expression, peptide presentation, T-cell recognition, treatment composition, immune response, adverse events and clinical outcome. Each link is difficult. Some require specialized assays. Some are expensive. Some are generated only because a patient received an experimental therapy. Some sit inside hospital records. Some are owned by companies. Some are stored in public repositories but lack the harmonization needed for large-scale learning.

The platform that accumulates these linked observations can improve in ways that are hard for a new entrant to copy from published papers.

That is a private advantage with public consequences.

If the learning set underrepresents particular HLA alleles, rare cancers, smaller hospitals or populations outside wealthy countries, the platform's uncertainty may be greatest exactly where the health system is weakest. A company may still manufacture a product for that patient. Personalized does not mean impossible. But it may rank candidates with less confidence, have fewer experimentally validated analogues and rely more heavily on generalization.

The uncertainty needs to be visible.

One of the most dangerous habits in computational medicine is presenting a ranked list as though the ranking were the measurement itself. A model says candidate A scores 0.83 and candidate B scores 0.71. The decimals create an atmosphere of precision. Yet the uncertainty may be radically different across HLA alleles, mutation classes and assay regimes. A score learned from a dense region of biological space is not epistemically identical to the same score extrapolated into a sparse one.

A good personalized-medicine system should know when it is lonely.

That principle sounds technical, but it leads quickly to policy.

Should regulators require performance reporting across HLA groups when the platform is intended for broad use? How should companies describe candidate-selection uncertainty when the molecular payload changes from patient to patient? Should public funding prioritize binding and presentation data for underrepresented alleles precisely because private incentives favor the common ones? Should trial sponsors be expected to show that manufacturing and prediction work across geographically diverse populations before a platform is treated as generally deployable?

None of these questions has a simple quota-like answer.

HLA diversity is high-dimensional. An allele that is uncommon nationally may be common in a particular ancestry group. HLA class I and class II contribute differently. Linkage patterns matter. Tumor type matters. Mutation burden matters. A statistically neat demographic table can obscure the molecular issue it is supposed to illuminate.

The right unit is often the biological coverage of the platform.

That requires more than counting trial participants by broad categories. It requires asking whether the relevant HLA alleles and combinations are represented in model development, assay validation, clinical evidence and postmarket learning. It requires knowing where prediction error rises. It requires publishing enough performance detail that independent researchers can see blind spots without demanding that a company give away every element of its ranking system.

There is a legitimate commercial tension here.

The neoantigen-selection pipeline may be one of the main places a company creates value. If every feature, weight, training observation and model update must be public, firms may have less incentive to invest in improving it. A regulatory system that equates transparency with open sourcing can accidentally erase the very private return used to fund development.

But secrecy has a cost when the algorithm determines the drug.

The usual argument for proprietary clinical software is that regulators can evaluate the output while the vendor protects the method. That becomes harder when the software is not simply advising a physician but choosing which molecules are synthesized for the patient. A systematic model weakness can become a systematic manufacturing decision. If a subgroup receives lower-quality target selection, the finished products may all meet chemical specifications while missing the biological opportunity.

Quality control has to reach upstream into prediction.

The industry will therefore need a language for algorithmic CMC: not literally the same tests used to measure RNA purity or peptide identity, but a comparable discipline around version control, validation, change management, input quality, error analysis and traceability. Which model selected the targets? Which database version did it use? How was HLA typing performed? What thresholds were applied? What happens when the ranking model changes halfway through a trial? Can an old patient's treatment be reproduced conceptually even if the software has since improved?

These questions are already familiar in regulated software and diagnostics. Neoantigen medicine combines them with biologics manufacturing.

The result is a product whose molecular uniqueness rests on procedural reproducibility.

That is one reason the phrase patient of one can mislead. The patient is one; the process cannot be.

A commercial platform needs to make thousands of unique outputs through the same controlled system. Regulators need to know that a change intended to improve performance does not silently change the meaning of the product. Clinicians need to understand what the platform can and cannot infer. Payers will eventually want evidence that the expensive bespoke process adds value beyond cheaper alternatives. Patients deserve to know when the system is operating in a region where its evidence is sparse.

HLA diversity also complicates the dream of moving from individualized to shared neoantigen products.

The economics of a fully personalized vaccine are difficult. Every patient initiates a new design and manufacturing job. A shared product aimed at a recurrent mutation could be made in advance, stocked, distributed and priced more like a conventional medicine. The commercial temptation is obvious.

But a recurrent mutation is only half a shared target.

The altered peptide has to be presented by an HLA molecule common enough to define a useful market. Some public neoantigen efforts already exploit this logic by targeting driver mutations presented by particular HLA alleles. It is an elegant compromise: more tumor-specific than a traditional shared antigen, more scalable than a product manufactured from scratch for each person.

It is also a market segmentation system written into immunology.

A product may be relevant only to patients who carry both the mutation and the compatible HLA allele. Each restriction narrows the addressable population. From a scientific perspective that precision is the point. From a commercial perspective it changes trial size, pricing, development priorities and which combinations are worth pursuing.

Rare HLA types can become the immunological equivalent of rare diseases inside common cancers.

The policy system has experience with rare diseases, but this version is unusual. The underlying cancer may affect hundreds of thousands of people while one therapeutically relevant molecular-HLA combination affects a tiny fraction. The incentive structures designed around disease prevalence may not map neatly onto target prevalence.

The same issue will reach cell therapy.

T-cell receptor therapies can target intracellular tumor antigens because TCRs recognize peptides presented by HLA. That gives them access to a vast set of targets that CAR-T cells, which usually require surface antigens, cannot reach. But it makes many TCR therapies HLA-restricted. A receptor engineered against one peptide-HLA complex may be useless in a patient without that HLA allele.

A library of TCRs therefore begins to resemble a key cabinet.

Some keys fit common locks. Some fit rare ones. Some tumors change the lock. Some stop displaying it. The industrial question is how large the cabinet must become before a broad population has a realistic chance of finding a match.

That scale problem should influence public investment.

Private companies will rationally prioritize combinations with the clearest path to enough eligible patients. Public institutions are better positioned to fund the long tail: rare alleles, neglected populations, negative binding data, standardized assays and open benchmarks that increase the usefulness of the entire field. This is not charity added after innovation. It is infrastructure for making personalization generalizable.

The same public role appeared earlier in the sequencing revolution. Reference genomes, tumor atlases, protein structures, epitope databases and basic immunology did not determine the final commercial products. They enlarged the shared map on which companies could navigate.

HLA coverage is another map-making problem.

The obvious response is to collect more data.

That answer is necessary and incomplete.

Data can reproduce access. If most neoantigen patients are treated at wealthy academic centers, then expanding the dataset through ordinary clinical growth may simply produce a larger version of the same distribution. Deliberate sampling is expensive because it means opening sites, collecting tissue, transporting samples, harmonizing assays and following outcomes where infrastructure is thinner.

The cost looks inefficient until one remembers what is being built.

A platform that only works well for the easiest-to-study patients is not fully personalized medicine. It is boutique medicine with individualized outputs.

The distinction will become more important if neoantigen treatments move earlier in disease.

Advanced-cancer patients may accept extraordinary uncertainty and travel. Adjuvant therapy after surgery is different. The patient may feel well. The expected absolute benefit may be smaller. The health system will compare a personalized product with standard therapies that are already distributed widely. Turnaround time, local tissue handling, insurer authorization and the confidence of community oncologists become part of effectiveness.

A medicine can fail population-scale deployment without failing a trial.

HLA diversity is a reminder of that larger truth.

The most seductive story about precision medicine says averages are obsolete. In reality, precision requires better population knowledge, not less. To make a treatment for one person, we often need to know how that person's biology differs from thousands or millions of others. To know whether a peptide is likely to bind an unusual HLA molecule, we benefit from experiments performed in many people and many laboratories. To know whether an immune response matters, we need outcomes across cohorts. To know whether the algorithm is failing a subgroup, we need enough of that subgroup to see the pattern.

Personalization is built on comparison.

That is not a weakness. It is the way learning works.

The danger begins when the rhetoric of individualization hides the shared infrastructure underneath it. A company can say every vaccine is unique and still depend on common HLA databases. A clinic can advertise a treatment designed from your tumor and still use ranking software whose strongest evidence comes from someone else's allele. A payer can call the therapy bespoke while applying reimbursement rules built around population averages. A government can celebrate precision medicine while underfunding the public datasets required to make precision equitable.

The immune system does not care about the rhetoric.

It cares whether the peptide is presented.

That is why the HLA lottery belongs near the center of the neoantigen story. It complicates the fantasy that cancer has written a universally readable confession into its mutations. The confession is encrypted differently in different people.

The scientific task is to read more of the languages.

The industrial task is to manufacture reliably once the message is understood.

The public task is to make sure the dictionary does not become excellent only for those who were easiest to study.

A key that fits one lock can save a life.

A field deserves the name breakthrough when it learns how to make keys across the whole door.

Population coverage gives this problem a useful quantitative language without reducing it to demographics.

An epitope or receptor that works only in the context of one HLA allele reaches only the people who carry that allele. A collection of targets can reach more people if their restricting HLA molecules are distributed broadly and differently across populations. Public immunology tools have long used population-coverage calculations for exactly this reason: the usefulness of an HLA-restricted target depends partly on allele frequencies in the population where the intervention is intended to work.

That logic becomes clinically concrete in cancer.

A shared KRAS neoantigen program might look attractive because the mutation recurs across many tumors. Add one HLA restriction and the eligible population shrinks. Add disease stage, prior treatment and organ function, and it shrinks again. A common mutation can produce a small trial population without anyone having made a rare-disease drug in the usual sense.

Coverage is therefore not a single percentage.

It changes by geography and ancestry. An HLA allele common enough to support a commercial program in one population may be uncommon in another. A library designed around the largest initial markets can achieve impressive overall reach while leaving predictable geographic holes.

Those holes are not necessarily evidence of discrimination.

They are evidence that a finite library reflects choices.

The policy question is who pays to extend the library after private returns become thin.

Public funding is one answer. International collaboration is another. Shared receptor repositories and open experimental datasets can lower the cost of developing the next rare-HLA target. Regulators can encourage performance reporting that identifies where evidence is sparse instead of allowing a broad personalized label to imply uniform confidence.

Clinical-trial design should anticipate the same problem.

If a trial includes participants across diverse HLA genotypes but the target-selection model is substantially better for some alleles than others, aggregate efficacy can hide uneven product quality. The trial may still answer whether the platform works on average. It may be underpowered to answer whether the platform works equally well in every molecular subgroup.

Postmarket learning then becomes part of equity.

The platform should record enough HLA-specific information to see whether target count, target confidence, immune response, manufacturing success or outcomes differ systematically. A disparity can then be investigated rather than guessed at from broad racial categories.

That is a more biologically faithful form of fairness analysis.

It also protects against a different mistake: assuming every observed demographic difference must come from the algorithm. Disease incidence, mutation spectra, access to surgery, stage at diagnosis, tissue quality and treatment history can all differ across populations. HLA is one mechanism among many.

Good equity work disaggregates causes instead of attaching moral meaning to every correlation.

The reason to invest in rare HLA evidence is simpler.

A patient should not receive a lower-confidence personalized product merely because the scientific system happened to learn their immune molecules later.

The field cannot eliminate that inequality immediately.

It can refuse to make it invisible.

The same standard should apply to class II HLA, which is more complex to model and often receives less public attention than class I despite the importance of CD4 T-cell responses. A vaccine that focuses narrowly on the best-understood class I targets may leave useful immune biology unused. A platform that incorporates class II prediction has to confront an even more complicated binding and presentation landscape.

Greater biological coverage can therefore increase computational uncertainty before it reduces clinical uncertainty.

That is normal scientific progress.

A field first becomes accurate in a narrow region, then expands the map.

The danger is mistaking the first accurate region for the whole world.

HLA diversity makes that mistake impossible to defend for long.