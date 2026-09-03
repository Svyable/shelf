# The Sequencing Machine Changed the Question

The personalized cancer vaccine is manufactured after the patient arrives.

That sounds obvious now. It was once almost absurd.

To build a treatment around mutations unique to one tumor, the mutations first have to be found. Not metaphorically. The relevant stretches of DNA must be read, compared with normal DNA from the same patient, filtered for errors, interpreted, linked to expressed genes and converted into candidate immune targets before the disease has moved beyond the treatment window.

The neoantigen field therefore depends on a revolution that did not begin in immunology.

It began with the ability to read genomes cheaply enough and quickly enough that sequence could move from a research endpoint into a clinical workflow.

The Human Genome Project is sometimes remembered as a race to produce one canonical human genome. Its more important legacy for personalized medicine may be the machinery left behind: sequencing technologies, reference assemblies, databases, standards, computational tools and a generation of scientists trained to think of biology as information that could be read at scale.

The first human genome cost billions of dollars in public and private effort and took years to assemble. The useful benchmark for cancer medicine is not that total cost. It is what happened afterward.

Sequencing became industrial.

Machines improved. Chemistry improved. Fluorescent imaging, flow cells, base calling and library preparation improved. Companies competed. Throughput rose. Costs fell. What had required a landmark international project became a service that hospitals and laboratories could order repeatedly.

Cancer was an ideal customer because cancer is a genomic disease in the broadest sense.

A normal cell becomes malignant through accumulated alterations that disrupt growth, repair, death, differentiation and interactions with the surrounding tissue. Some of those alterations are inherited, but many arise in the tumor itself. Tumor sequencing could therefore reveal not only what a cancer was called under the microscope but what had happened inside it.

That changed clinical oncology first through shared targets.

A patient with non-small-cell lung cancer might have an EGFR mutation, an ALK rearrangement, a ROS1 fusion or another actionable alteration. A patient with melanoma might carry a BRAF mutation. A breast tumor might be HER2 amplified. Sequencing and molecular testing could place patients into therapeutic categories that were invisible to anatomy alone.

The drug remained standardized.

The patient's molecular profile chose from a shelf of existing products.

Neoantigen medicine inverted the relationship.

The sequence could now help define the product itself.

The minimum experiment requires a comparison. Tumor DNA alone contains both inherited variants and tumor-acquired mutations. A normal sample, often blood, provides the patient's germline baseline. Computational pipelines compare the two, attempting to identify somatic variants present in the tumor and absent from normal tissue.

That sounds cleaner than it is.

Tumor samples contain normal cells. Tumors themselves contain multiple malignant populations. Sequencing has errors. Formalin fixation can damage DNA and create artifacts. Coverage varies across the genome. Copy-number changes alter the expected fraction of reads carrying a mutation. A low-frequency variant may be real and biologically important or may be noise.

Variant calling became its own technical discipline.

Then RNA entered.

A mutation encoded in DNA is not useful to a vaccine if the altered gene is never expressed. RNA sequencing can show whether the relevant transcript is present and at what approximate level. It can also reveal fusions and expression patterns that DNA alone misses.

The practical pipeline became a stack of imperfect measurements.

Pathology has to select adequate tissue. Nucleic acids have to survive extraction. Libraries have to be prepared. Sequencing has to reach sufficient depth. Reads have to align to a reference. Somatic mutations have to be called. HLA type has to be inferred or measured. RNA expression has to be assessed. Candidate peptides have to be generated and ranked.

No single step is the breakthrough.

The breakthrough is that all of them can happen inside a medical timeline.

Public cancer genomics made the timeline scientifically useful.

The Cancer Genome Atlas, launched by the National Cancer Institute and the National Human Genome Research Institute, eventually characterized more than 20,000 primary cancer and matched normal samples across 33 cancer types. The project assembled genomic, epigenomic, transcriptomic and clinical information at a scale that would have been difficult for any single laboratory or company to justify as a standalone commercial product.

The data became infrastructure.

Researchers could compare mutation patterns across diseases. They could study recurrent drivers, mutational signatures, copy-number changes, expression states and immune features. Methods developed on one dataset could be tested on another. New companies could begin with a scientific landscape that public programs had already helped map.

That public map did not eliminate the need for private roads.

Clinical sequencing is different from exploratory sequencing. A research laboratory can rerun an analysis, tolerate uncertain turnaround and investigate anomalies. A clinical laboratory has to operate under validated procedures, maintain chain of custody, document quality, meet regulatory requirements and issue results clinicians can act on.

Companies such as Foundation Medicine helped normalize comprehensive genomic profiling as a clinical service. Roche's acquisition of the company reflected a broader pharmaceutical recognition that genomic information was becoming part of the therapeutic business rather than merely a diagnostic adjunct.

Personalis built another layer of the infrastructure, emphasizing highly sensitive tumor profiling, immunogenomics and the detection and characterization of neoantigens. Its work with Moderna on personalized cancer vaccines illustrated how a sequencing company could sit inside the manufacturing chain of a drug that changes patient by patient.

The border between diagnostic and therapeutic company began to blur.

The assay did not physically become the vaccine. But a bad assay could produce the wrong vaccine.

This made sample quality a therapeutic variable.

A patient can have a scientifically appropriate disease, a promising platform and a willing physician, yet still fail at the first gate because the available tumor block contains too little viable tumor, too much necrosis, degraded nucleic acid or material already consumed by prior testing.

Precision medicine has a mundane side.

The specimen is finite.

A small biopsy may be asked to answer pathology, molecular diagnostics, clinical-trial eligibility, research sequencing and neoantigen discovery at once. The amount of tissue removed from a body becomes a resource-allocation problem among laboratories.

Liquid biopsy promises another route.

Tumors shed fragments of DNA into the bloodstream. Circulating tumor DNA can sometimes detect molecular residual disease after surgery, track response and reveal emerging mutations without another invasive biopsy. In a personalized vaccine strategy, ctDNA has several possible roles. It can identify high-risk patients, measure whether disease is disappearing, detect recurrence earlier and potentially show whether targeted clones are escaping.

But blood is not a perfect substitute for tissue.

Some tumors shed little DNA. The amount in circulation varies with disease burden and location. A negative test can mean no detectable disease or simply no detectable signal. Very low-frequency detection requires extraordinary analytical precision because sequencing errors can masquerade as mutations.

Again, the platform is an exercise in layered uncertainty.

That uncertainty becomes commercially interesting when one company can integrate more of the stack.

Imagine two businesses.

The first sells sequencing. It is paid once for producing a report.

The second uses sequencing to select a therapy, manufactures the therapy, monitors ctDNA after treatment, records immune responses and follows outcomes. It is paid for the medicine and also acquires a longitudinal dataset connecting molecular decisions to clinical consequences.

The second business can learn in ways the first cannot.

This is one reason pharmaceutical companies have repeatedly moved toward diagnostics, data partnerships and companion testing. The value of a drug increasingly depends on knowing who should receive it. In individualized therapy, knowing who should receive it is not enough. The company must know what to make.

Sequencing also changed the geography of expertise.

A small oncology practice cannot build a high-throughput sequencing center in the back room. It does not have to.

The sample can travel.

That fact is easy to overlook because medicine traditionally concentrates expertise around hospitals. Genomics allows parts of the workflow to detach from the clinic. Tissue can be shipped to a reference laboratory. Raw data can move to a cloud environment. Bioinformatics can occur in another state or country. A sequence file can inform a manufacturing facility the patient never visits.

The clinical site can become the front end of a distributed factory.

This architecture is what makes the mini-clinic frontier plausible.

A clinic offering an individualized vaccine does not need to contain every capability advertised on its website. It can assemble them from vendors: pathology here, sequencing there, HLA typing elsewhere, algorithmic target selection from a software partner, synthesis from a manufacturer, immune monitoring from another laboratory.

Modularity lowers the capital needed to enter the market.

It also fragments responsibility.

If a vaccine fails, where did the failure occur? Was the tissue inadequate? Was a mutation missed? Was an artifact included? Did the algorithm choose a non-presented peptide? Did manufacturing alter the product? Was the product stored incorrectly? Was the dosing schedule inappropriate? Was the biology simply resistant?

In a tightly integrated clinical trial, the sponsor attempts to control and document these steps.

In a distributed direct-pay market, the chain can be harder for a patient to see.

The same modularity that democratizes capability can make accountability more diffuse.

Sequencing companies learned this lesson early through the distinction between analytical validity and clinical utility.

An assay can accurately detect a mutation and still fail to improve patient outcomes if the result does not lead to an effective intervention. A genomic report can contain true information with no proven therapy attached. A personalized neoantigen workflow adds another layer: the sequence can be correct, the target prediction plausible and the immune response measurable while the treatment still fails to change recurrence or survival.

Information becomes medicine only when the chain closes.

The falling cost of sequencing can therefore be misleading when people estimate the cost of individualized therapy.

Reading the tumor is only the beginning. The expensive work may lie downstream in interpretation, clinical-grade manufacturing, sterility testing, quality assurance, release testing, repeated dosing, immune monitoring and the accompanying drugs. A cheap genome does not imply a cheap vaccine.

But it changes the slope.

If sequencing cost and turnaround continue to fall, the genomic part of the workflow becomes less of a bottleneck. The scarce value can migrate toward target ranking, manufacturing reliability, clinical evidence and access to outcome data.

This migration matters for public policy.

Governments funded major portions of the genomic commons. Public projects generated reference data, cancer atlases, sequencing methods and standards. Once commercial products are built on top of that infrastructure, the public debate can become fixated on the final molecule while missing the value of the shared substrate.

The correct analogy is not that taxpayers paid for the finished drug.

It is that taxpayers helped build the map, the roads and some of the surveying equipment.

A private company may still have to design the vehicle, build the factory and risk capital on a destination nobody knows will be valuable.

The public contribution is neither total nor trivial.

This becomes visible in intellectual property.

A tumor sequence itself is a fact about a patient. A particular laboratory method can be patented. A target-ranking algorithm can be proprietary. A vaccine composition can be claimed. Manufacturing processes can be protected. Clinical datasets can be contractually controlled. The public reference map may remain open while the highest-value routes across it become fenced.

The fences are not necessarily abuses.

Without exclusion, some investors will not fund expensive clinical development. A sequencing company that cannot earn a return may not build validated laboratories. A vaccine company that cannot protect its platform may struggle to raise the capital needed for Phase 3 trials.

But public infrastructure changes the moral baseline.

The question is not whether companies should profit.

It is whether the terms of commercialization preserve enough public return to keep the scientific commons alive and the resulting treatments reachable.

Sequencing also complicates privacy.

A tumor genome is linked to a germline genome, and the germline genome is linked to family. De-identification can reduce risk without making genetic data ordinary. A personalized medicine company may hold genomic information that remains useful for decades after the original treatment decision.

This creates another form of capture.

The commercial asset may be a database no patent law fully describes.

A company treating thousands of patients can accumulate private evidence about which mutations generate useful immune responses, which HLA-peptide combinations are productive, which manufacturing decisions matter and which biomarkers predict recurrence. Even if every underlying academic paper is open access, the feedback from real patients can become proprietary knowledge.

The next generation of algorithms may therefore be trained on a mixture of public science and private experience.

That is not unique to neoantigens. It is the emerging structure of data-intensive medicine.

The person at the center of it remains oddly easy to lose.

A patient does not experience a genomic platform.

They experience waiting.

After surgery, tissue moves. Blood is drawn. Files are generated. An algorithm selects targets. A manufacturing slot opens. Quality tests run. The next scan date approaches. A pathology result that took days is followed by a personalized therapy that may take weeks.

In adjuvant cancer treatment, time has a different meaning than it does in metastatic disease. After a tumor is removed, there may be no visible cancer left. The treatment is being given because microscopic disease may remain. The patient can appear healthy while the system races against recurrence.

This is one reason the Moderna-Merck melanoma program matters as an operational proof as well as a biological one.

A large randomized Phase 3 trial means the individualized workflow was not performed for a handful of patients at one academic center. More than a thousand people entered a system in which tumor material had to be sequenced, candidate neoantigens selected and individualized products manufactured under trial conditions across many sites.

The trial asks whether the therapy works.

The existence of the trial also demonstrates that the factory can run.

That distinction matters because medicine contains many ideas that work once.

A research laboratory can rescue one patient with heroic effort. A company has to turn heroics into operations.

Sequencing made that conversion possible by changing the unit of information from disease category to patient-specific mutation.

The machine did not cure cancer.

It changed the question from “Which drug fits this cancer?” to “What, in this cancer, can be turned into the drug?”

That question begins before the sequencer is switched on.

The pathologist has to decide what material is actually being sequenced.

Tumor purity is not a footnote. A specimen labeled tumor can contain malignant cells, immune cells, fibroblasts, blood vessels and normal tissue in varying proportions. A mutation present in every cancer cell may therefore appear in only a fraction of sequencing reads. A subclonal mutation can appear rarer still. Copy-number changes can move the expected fractions in both directions. Computational purity estimates help, but they are themselves estimates.

The same slide can answer different questions depending on who marks it.

A pathologist choosing an area for DNA extraction may enrich for viable tumor. Another laboratory may macrodissect a different region. A later recurrence may carry mutations absent from the original block. A small core biopsy may simply miss a branch of the tumor's evolutionary tree.

Personalization is constrained by sampling.

This is one reason archival tissue creates both opportunity and risk. A block removed months or years earlier may be the only material available without another invasive procedure. It can be sufficient for a useful molecular analysis. It can also describe an earlier version of a disease that has since been exposed to chemotherapy, targeted drugs or immune pressure.

The question is not merely whether the DNA can still be read.

It is whether the specimen still represents the problem being treated.

Clinical sequencing therefore needs provenance almost as much as it needs depth.

Where did the sample come from? Primary tumor or metastasis? Before or after systemic therapy? How much viable tumor was present? How was it fixed? How long was it stored? Which assay version processed it? What reference and pipeline versions were used? Which variants fell near thresholds and which were called with high confidence?

Those details look like laboratory administration until a personalized product is built from them.

Then provenance becomes part of the drug record.

Reproducibility also changes meaning in this setting.

Two clinical laboratories do not need to produce identical raw files. They do need to produce results close enough that clinically meaningful variants do not appear and disappear because of ordinary procedural differences. If two validated pipelines identify materially different neoantigen candidates from the same specimen, the discrepancy has to be understood rather than hidden behind the word personalized.

This is the point at which standards become an innovation technology.

Common file formats, reference materials, proficiency testing, variant nomenclature and quality metrics do not make headlines. They allow laboratories, hospitals, software systems and manufacturers to exchange results without renegotiating the meaning of every field. A distributed personalized-medicine industry becomes possible only when enough of the boring interfaces are stable.

The same logic applies to negative results.

A report saying no suitable target was found can be clinically important. It should mean the search was performed adequately and the evidence did not support manufacture, not that the tissue failed silently, the HLA call was uncertain or the pipeline excluded a mutation for an undocumented reason.

Failure needs a vocabulary.

Insufficient tissue is different from insufficient sequencing quality. Insufficient expression is different from weak predicted HLA presentation. Manufacturing infeasibility is different from biological uncertainty. Each failure suggests a different remedy, and only some remedies require another biopsy.

The cost of precision medicine is partly the cost of making those distinctions reliably.

Sequencing became cheap enough to change the question.

The harder achievement was making the answer trustworthy enough to manufacture from it.

There is also a temporal mismatch hidden inside the phrase genomic truth.

A sequence result is true of a specimen collected at a time.

Cancer treatment often needs a decision about the disease that exists now.

That gap is small after a fresh surgical resection and can become enormous after years of therapy. A metastatic lesion sampled before targeted treatment may not represent the clone that survives it. An immune therapy can select for cells with altered antigen presentation. A recurrence can arise from a minority population that was barely detectable in the original sample.

Repeated sequencing is therefore not necessarily redundant spending.

Sometimes it is the price of asking the same question of a changed disease.

The practical problem is deciding when the new information is likely to alter treatment enough to justify another procedure, delay or cost. A platform that reflexively demands a fresh biopsy can impose avoidable burden. A platform that relies indefinitely on archival material can manufacture against a historical tumor.

The answer will differ by disease, treatment history and the target being pursued.

That is another reason the sequencing layer cannot be treated as a generic commodity even as the chemistry becomes commoditized.

The read itself may become cheap.

Choosing the right specimen, the right moment and the right interpretation remains clinical judgment.

This is where centralized platforms need local medicine. A remote laboratory can process DNA at extraordinary scale. It cannot know from the sequence file alone that the biopsy came from a lesion that appeared only after a selective therapy, or that another metastasis is behaving differently, or that the patient cannot safely undergo another procedure.

Personalized medicine is sometimes described as replacing judgment with data.

In practice it gives judgment more data to be responsible for.

The sequencing machine changed the question.

It did not decide when the question should be asked again.