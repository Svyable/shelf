# Notes on Cases and Sources

This appendix is a reader-facing map to the evidence beneath *Public Pressure*. It is not a substitute for the full research ledger. It is a guide to what the most important sources can establish, what they cannot establish, and where the manuscript deliberately draws a narrower conclusion than a headline might invite.

The complete working ledger is maintained in [`../research/source-ledger.md`](../research/source-ledger.md) and [`../research/source-ledger.csv`](../research/source-ledger.csv), with newer stable primary records also stored as source fragments under `../research/sources/`. Because regulation, litigation, enforcement, executive leadership, and AI policy can change quickly, the status of fast-moving matters should be checked again before any Shelf release.

## How to read the evidence

Several distinctions recur throughout the book:

- **An allegation is not a finding.** A complaint, congressional report, employee letter, or regulator allegation may be important evidence without proving every underlying factual claim.
- **A settlement is not always an admission.** Remedies can be highly informative even when a defendant does not admit the government’s allegations.
- **A rule is not proof of compliance.** A statute, regulation, framework, or company policy can show what is required or promised, not whether the requirement constrained a real deployment.
- **A case is not a universal doctrine.** A tribunal or court decision can illustrate how ordinary duties attach to automated systems without settling every jurisdiction’s law.
- **Exposure is not displacement.** Research showing that tasks or occupations are exposed to generative AI does not by itself establish how many jobs will disappear.
- **Reported fraud is not total fraud.** Complaint datasets are useful directional evidence, not a census of all losses.
- **A public reaction is evidence about public reaction.** It does not, by itself, establish the truth of the grievance that animated it.

Those limits are part of the argument. The book is about answerability, so its own claims should remain answerable to their sources.

## Chapters 1–4: grievance, personalization, and the claim desk

### Brian Thompson chronology

The opening chapter uses the killing of UnitedHealthcare CEO Brian Thompson as a point of entry into accumulated public grievance and the personalization of institutional power. The factual criminal chronology should remain anchored to official charging and court records rather than social-media retellings. The New York County District Attorney’s December 2024 indictment release is used for that limited purpose.

[New York County District Attorney — Luigi Mangione indictment release](https://manhattanda.org/d-a-bragg-luigi-mangione-indicted-for-the-murder-of-unitedhealthcare-ceo-brian-thompson-and-use-of-a-weapon-of-mass-destruction/) (`thompson-da-2024`)

The source establishes an official prosecutorial account and charges. It does not establish a broader moral judgment about an insurer, an industry, or the public reaction. The book’s distinction between criticism and violence does not depend on accepting every public claim about UnitedHealthcare.

### Medicare Advantage and prior authorization

The Senate Permanent Subcommittee on Investigations examined denials of post-acute care by major Medicare Advantage insurers. The report is useful evidence about incentives, denial patterns, and the administrative environment surrounding prior authorization. It is a congressional investigative report, not a judicial finding that a particular algorithm independently denied a particular patient.

[U.S. Senate PSI — *Refusal of Recovery*](https://www.hsgac.senate.gov/wp-content/uploads/2024.10.17-PSI-Majority-Staff-Report-on-Medicare-Advantage.pdf) (`psi-medicare-advantage-2024`)

CMS’s 2024 interoperability and prior-authorization final rule provides a cleaner example of how recourse can be made operational. Beginning in 2026 for covered requirements, impacted payers must provide specific reasons for denied prior-authorization decisions. The rule also requires decisions within 72 hours for expedited requests and seven calendar days for standard requests for covered non-drug items and services, subject to the rule’s program-specific scope. CMS also requires public reporting of prior-authorization metrics, including approval, denial, and post-appeal approval rates.

[CMS — Interoperability and Prior Authorization Final Rule](https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f) (`cms-prior-auth-2024`)

Those details matter to Chapters 4 and 18 because they turn “meaningful appeal” into design questions: reason-giving, a harm-sensitive clock, and measurable reversal.

### The nH Predict litigation

The lawsuit discussed in Chapter 1 is a useful example of why procedural status must be stated precisely. In its February 13, 2025 ruling on the motion to dismiss, the U.S. District Court for the District of Minnesota held that the Medicare exhaustion requirement applied, but waived exhaustion on futility grounds. The court dismissed five state-law causes of action as preempted while allowing breach-of-contract and implied-covenant claims to proceed.

[District of Minnesota — *Estate of Gene B. Lokken et al. v. UnitedHealth Group Inc. et al.*, order on motion to dismiss](https://law.justia.com/cases/federal/district-courts/minnesota/mndce/0%3A2023cv03514/211721/91/) (`lokken-dismissal-2025`)

The surviving claims did not amount to a finding that the plaintiffs’ account of nH Predict was true. The litigation moved into discovery. In March 2026, a magistrate judge granted in part a motion to compel, requiring production of certain material concerning nH Predict’s development and use and relevant government investigations while rejecting or narrowing other requests.

[District of Minnesota — *Lokken*, order on motion to compel discovery](https://law.justia.com/cases/federal/district-courts/minnesota/mndce/0%3A2023cv03514/211721/162/) (`lokken-discovery-2026`)

As of late August 2026, the putative class action remained active, with discovery and pretrial scheduling continuing. That status should be checked again before release rather than converted into a permanent statement about the merits.

[Georgetown O’Neill Institute — Health Care Litigation Tracker, *Lokken* case page](https://litigationtracker.law.georgetown.edu/litigation/estate-of-gene-b-lokken-the-et-al-v-unitedhealth-group-inc-et-al/) (`lokken-status-2026`)

## Chapter 5: automated hiring

The Department of Justice and Equal Employment Opportunity Commission guidance used in the hiring chapter is deliberately modest evidence. It shows how existing disability law can apply when employers use algorithmic or AI-enabled hiring tools. It does not establish that every automated assessment is discriminatory or that human screening is inherently fairer.

[DOJ Civil Rights Division — Algorithms, AI, and disability discrimination in hiring](https://www.ada.gov/resources/ai-guidance/) (`doj-ai-hiring-2022`)

[EEOC — ADA and software, algorithms, and AI used to assess applicants and employees](https://www.eeoc.gov/eeoc-disability-related-resources/artificial-intelligence-and-ada) (`eeoc-ai-ada-2022`)

New York City’s Local Law 144 is used as an example of a jurisdiction requiring a bias audit and notice around certain automated employment decision tools. It is evidence of one regulatory design, not proof that a bias audit alone makes a system fair.

[New York City Council — Local Law 144](https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=B051915D-A9AC-451E-81F8-6596032FA3F9&ID=4344524) (`nyc-aedt-2021`)

## Chapters 6–7: creative and worker bargaining

The WGA and SAG-AFTRA agreements are unusually valuable because they show public pressure converting into enforceable terms rather than remaining at the level of statements. They are also easy to overgeneralize. They establish negotiated rules in specific bargaining relationships; they do not create universal rights for every writer, actor, creator, or worker.

[Writers Guild of America — 2023 MBA Memorandum of Agreement](https://www.wga.org/uploadedfiles/contracts/2023_mba_moa.pdf) (`wga-mba-2023`)

[SAG-AFTRA — 2023 TV/Theatrical Contracts](https://www.sagaftra.org/contracts-industry-resources/contracts/2023-tvtheatrical-contracts) (`sag-aftra-ai-2023`)

The U.S. Copyright Office reports are used to keep several disputes separate: digital replicas, copyrightability, training, licensing, and labor are related but not identical legal questions.

[U.S. Copyright Office — Copyright and AI](https://www.copyright.gov/ai/) (`copyright-digital-replicas-2024`)

[U.S. Copyright Office — AI policy and reports](https://www.copyright.gov/policy/artificial-intelligence/) (`copyright-training-2025`)

For worker displacement, the ILO/NASK occupational-exposure work is treated as evidence about exposure and task transformation, not a direct forecast of realized job destruction.

[International Labour Organization — *Generative AI and Jobs: A Refined Global Index of Occupational Exposure*](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure) (`ilo-genai-jobs-2025`)

## Chapters 8, 10, and 11: synthetic voice and authority

The New Hampshire robocall episode is important because it shows that synthetic political deception did not arrive into a legal vacuum. The FCC ruled that AI-generated voices fall within the TCPA’s restrictions on artificial or prerecorded voice calls, then pursued enforcement connected to the New Hampshire calls.

[FCC — AI-generated voices in robocalls](https://docs.fcc.gov/public/attachments/DOC-400393A1.pdf) (`fcc-ai-voices-2024`)

[FCC — enforcement release concerning the New Hampshire deepfake robocalls](https://docs.fcc.gov/public/attachments/DOC-405811A1.pdf) (`fcc-kramer-fine-2024`)

These sources support a narrower proposition than “deepfakes are illegal.” Existing communications, fraud, election, impersonation, and consumer-protection rules can reach some deceptive uses. Other synthetic media—including satire, accessibility tools, translation, and creative production—raises different questions.

The FTC’s impersonation rule is used for the same reason. The core problem is not that generated speech sounds realistic. The problem is fraudulent authority.

[FTC — Impersonation of Government and Businesses Rule](https://www.ftc.gov/legal-library/browse/rules/impersonation-government-businesses-rule) (`ftc-impersonation-rule-2024`)

C2PA is cited as an example of provenance infrastructure. It can help make authentic origin and editing history easier to inspect. It should not be described as a universal deepfake detector or as proof that unsigned media is false.

[C2PA Technical Specification](https://c2pa.org/specifications/specifications/2.2/index.html) (`c2pa-spec-2026`)

## Chapter 9: crypto as an accountability laboratory

The crypto chapter separates technological volatility from fraud proved through legal process. Samuel Bankman-Fried’s federal conviction and sentence, and the SEC’s Terraform/Do Kwon enforcement outcome, are used as examples in which legal institutions attached responsibility to people and entities rather than to “the market” or “the algorithm.”

[U.S. Department of Justice — Samuel Bankman-Fried sentencing](https://www.justice.gov/usao-sdny/pr/samuel-bankman-fried-sentenced-25-years-prison) (`sbf-sentencing-2024`)

[SEC — Terraform and Kwon fraud verdict and remedies](https://www.sec.gov/newsroom/press-releases/2024-73) (`terraform-sec-2024`)

The FBI Internet Crime Complaint Center data is used for reported complaint and loss patterns. It should not be read as a complete measure of incidence, because reporting behavior and category definitions affect the totals.

[FBI IC3 — 2025 Internet Crime Report](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf) (`fbi-ic3-2025`)

## Chapters 12–13: hearings and insiders

Congressional hearings are evidence that elected institutions can compel public testimony, create records, and force executives to answer specific questions. They are not substitutes for trials or technical audits. A hostile question does not become a finding because it was asked under bright lights.

[U.S. Senate Judiciary Committee — *Oversight of A.I.: Rules for Artificial Intelligence*](https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-rules-for-artificial-intelligence) (`senate-ai-hearing-2023`)

[U.S. Senate Judiciary Committee — *Big Tech and the Online Child Sexual Exploitation Crisis*](https://www.judiciary.senate.gov/committee-activity/hearings/big-tech-and-the-online-child-sexual-exploitation-crisis) (`senate-big-tech-hearing-2024`)

OpenAI’s published 2024 governance review is a company primary source. It is useful for the organization’s account of its board crisis and resulting governance changes. Because it is the company’s own review, it should not be treated as independent adjudication of every internal dispute.

[OpenAI — Review completed; Altman, Brockman to continue to lead OpenAI](https://openai.com/index/review-completed-altman-brockman-to-continue-to-lead-openai/) (`openai-review-2024`)

## Chapter 14: regulation

The EU AI Act is used as a concrete example of duties being allocated across providers and deployers according to system category and use. The most important point for this book is not that Europe has found the final regulatory architecture. It is that law is beginning to translate broad ideas such as human oversight into operational requirements.

[EUR-Lex — Regulation (EU) 2024/1689, Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (`eu-ai-act-2024`)

The original calendar is no longer enough to describe the Act. Regulation (EU) 2026/1744—the **Digital Omnibus on AI**—entered into force on July 27, 2026 and amended the implementation schedule. As of this August 2026 draft, obligations for providers of general-purpose AI models had already begun applying in August 2025; Article 50 transparency duties and enforcement powers for already-applicable provisions began on August 2, 2026; the principal Annex III high-risk rules are scheduled for December 2, 2027; and high-risk systems embedded in regulated products are scheduled for August 2, 2028.

[EUR-Lex — Regulation (EU) 2026/1744, Digital Omnibus on AI](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) (`eu-ai-omnibus-2026`)

Article 14 remains particularly relevant to Chapters 20 and 22, but its high-risk-system duties should be read against that amended application calendar. When those duties apply to a covered high-risk system, human oversight is supposed to enable assigned people, as appropriate and proportionate, to understand system limitations, watch for automation bias, interpret outputs, decide not to use an output, disregard or override it, reverse it, or interrupt the system through a stop procedure. That is a legal version of the book’s claim that “human oversight” should be measured as authority rather than mere presence.

The U.S. federal approach remains more sectoral and policy-dependent. The book therefore uses sector regulators, existing statutes, and specific enforcement matters rather than implying that one horizontal U.S. AI law governs all consequential deployments.

## Chapters 15, 20, and 21: ordinary duties attach to automated systems

### *Moffatt v. Air Canada*

The British Columbia Civil Resolution Tribunal decision in *Moffatt v. Air Canada* is a small case with a large institutional lesson. The dispute concerned incorrect information supplied through the airline’s website chatbot. The tribunal rejected the idea that the chatbot could be treated as a separate legal entity responsible for its own statements. The case is used to illustrate organizational responsibility for an automated interface—not to claim that every chatbot error automatically creates liability everywhere.

[British Columbia Civil Resolution Tribunal — *Moffatt v. Air Canada*, 2024 BCCRT 149](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html) (`moffatt-air-canada-2024`)

### *Bartz v. Anthropic*

The 2025 fair-use order in *Bartz v. Anthropic* is valuable because it decomposes conduct that public argument often compresses into “AI training.” The district court held the training use before it to be fair use and also treated Anthropic’s conversion of purchased print books into digital library copies as fair use. It did not allow Anthropic to justify the acquisition and retention of pirated central-library copies merely because those books might later be used for transformative training.

[Northern District of California — *Bartz v. Anthropic PBC*, Order on Fair Use](https://assets-us-01.kc-usercontent.com/1eeb16db-4934-006e-40a6-38fa91285ebb/4cf4aba9-070f-48cd-b713-f52c20fe3975/Dkt.%20231%20-%20Order%20on%20Fair%20Use.pdf) (`bartz-fair-use-2025`)

That split ruling did not become the final procedural endpoint. On July 20, 2026, the court granted final approval to a non-reversionary $1.5 billion class settlement covering a defined works list associated with Anthropic’s LibGen and PiLiMi downloads and entered judgment dismissing the action with prejudice. The settlement avoided a trial on the remaining downloading claims. It did not convert the 2025 district-court fair-use ruling into a categorical or appellate rule for all model training, and settlement approval is not a merits finding that every disputed allegation was proved.

[Northern District of California — *Bartz*, Final Approval Order and Judgment](https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2024cv05417/434709/680/) (`bartz-final-approval-2026`)

The durable lesson for the manuscript is narrower: **acquisition, retention, training, and settlement are separate legal events**. A later transformative use does not automatically answer whether the material was lawfully acquired, and a settlement does not erase the reasoning of an earlier order or turn that reasoning into universal law.

### Rite Aid facial-recognition enforcement

The FTC’s Rite Aid matter gives the book a more demanding example of remedy architecture. The Commission alleged that Rite Aid used facial recognition without reasonable safeguards and that false-positive matches subjected consumers to harms. The resulting orders went beyond a promise to improve accuracy: they included a five-year prohibition on covered facial-recognition use, deletion requirements for collected images and derivative data/models, consumer notice, complaint response, monitoring obligations, and executive-level oversight.

[FTC — Rite Aid Corporation case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v) (`ftc-rite-aid-2024`)

The book uses the matter for two limited propositions. First, automated error can create duties around notice, investigation, data retention, and remedy. Second, “cost of being wrong” can include changing or discontinuing a deployment, not merely paying money after the fact. The FTC’s allegations should still be described as allegations where that procedural distinction matters.

## Chapter 18: appeal as measurable infrastructure

The CMS prior-authorization rule is one of the clearest real-world examples of the book’s proposed “appeal clock.” It pairs decision deadlines with specific denial reasons and public metrics. That combination matters because recourse can fail in three different ways: the institution can decide too slowly, explain too little, or offer an appeal whose outcomes are impossible to inspect.

A useful accountability dashboard therefore does not stop at “we offer appeals.” It can report how many requests were approved, denied, and approved after appeal, plus how long decisions took. None of those numbers is self-interpreting. A low reversal rate can mean accurate first decisions or inaccessible appeals. But public metrics create something that can be investigated rather than merely trusted.

The deeper principle is that procedural rights become stronger when they generate observable operational evidence.

## Chapter 19: proof and provenance

The burden-of-proof chapter combines older evidence law with new provenance problems. C2PA is useful here as infrastructure for signed claims about origin and editing history. The FTC and FCC materials are useful for a different reason: they show that authenticating the speaker or caller does not eliminate the need to authenticate authority.

A recording can be real and unauthorized.

A person can be real and lying.

A synthetic voice can be authorized.

A signed file can still contain a false claim.

The book therefore treats provenance as one component of evidence, not as a truth machine.

## Chapter 20: accountable agents

NIST’s AI Risk Management Framework is used as a governance vocabulary rather than a legal safe harbor. It emphasizes governing, mapping, measuring, and managing AI risk across a lifecycle. The book’s more concrete agent controls—bounded authority, identity, logging, independent checks, blast-radius limits, reversibility, and named ownership—translate that governance posture into questions a deployer can answer about a specific system.

[NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (`nist-ai-rmf-2023`)

The EU AI Act’s human-oversight language provides a useful external test. If a supposed human overseer cannot disregard, override, reverse, or stop a consequential system, “human in the loop” may describe workflow topology without describing power.

## Chapter 21: remedy should change the system

The Rite Aid order and *Moffatt* decision illustrate two different kinds of cost allocation. *Moffatt* attached the automated representation to the institution that presented it. Rite Aid’s remedies required changes to deployment, data, monitoring, notice, complaints, and executive governance. Neither case means every AI mistake deserves the same remedy.

The more general test is whether the actor with knowledge and control bears enough of the avoidable error cost to improve upstream incentives. A remedy that makes one visible claimant whole while leaving an identical cohort undiscovered may still be administratively incomplete. Conversely, a liability rule so broad that it punishes reasonable use regardless of care can suppress beneficial deployment. The book’s preference is for repair that is proportional, evidence-based, and capable of reaching recurring errors rather than merely dramatic ones.

## Chapter 22: the legal meaning of a real stop

The EU AI Act gives the chapter’s “permission to say no” an unusually concrete legal analogue, but the timing matters. Article 14 is part of the high-risk-system regime whose principal application dates were moved by Regulation (EU) 2026/1744: Annex III high-risk rules are scheduled for December 2, 2027, and rules for high-risk systems embedded in regulated products for August 2, 2028.

When Article 14 applies to a covered system, it does not define human oversight as a human being somewhere near the workflow. The system must enable assigned natural persons, as appropriate and proportionate, to monitor and understand the system, resist automation bias, interpret output, choose not to use it, disregard or override it, reverse it, and interrupt operation through a stop mechanism.

That is a useful governance test even outside the Act’s jurisdiction or before a particular legal duty becomes applicable:

1. Can the designated person see enough to recognize a problem?
2. Can that person decline the output without extraordinary escalation?
3. Can a decision already taken be reversed where reversal is possible?
4. Can the system be stopped before an irreversible action completes?
5. Does the person have the competence, time, authority, and organizational protection to use those powers?

The first four questions can be implemented in software. The fifth is institutional. A stop button that ends a career is not a meaningful stop button.

## Chapter 23: what public pressure should ask for

The book does not conclude that every disputed use of AI requires a new regulator, public hearing, human approval, or right to opt out. Its closing demands are more portable:

- identify the principal behind consequential automated authority;
- preserve enough evidence to reconstruct material decisions;
- provide reasons that make correction possible;
- create review that can genuinely reverse an outcome;
- give high-stakes systems bounded permissions and real stop conditions;
- allocate some avoidable error cost back to actors able to prevent or repair it;
- distinguish allegations from findings and criticism from coercion;
- publish operational evidence when public claims of accountability depend on it.

Those demands can be met through contracts, product architecture, professional duties, collective bargaining, insurance, regulation, courts, internal governance, or competition. Public pressure is most productive when it asks which mechanism changed rather than which statement was issued.

## A final caution on freshness

This appendix describes the evidence base of the August 2026 working draft. Several sources concern regimes or disputes whose status can change quickly. Before release, re-check at minimum:

- current EU AI Act implementation dates, guidance, amendments, and technical standards;
- current U.S. federal AI executive policy and agency authorities;
- pending or appealed litigation discussed anywhere in the manuscript;
- enforcement matters that were proposed, pending, modified, or awaiting court approval when first researched;
- current executive and board roles where governance events are used as chronology;
- current fraud and labor datasets when the manuscript uses a “latest” figure.

The purpose of source discipline is not to make the book timid. It is to let strong claims remain strong after a reader follows the links.
