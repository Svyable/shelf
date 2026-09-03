# Chapter 14 evidence notes — The Algorithm at the Door

## Core claim

Algorithmic gatekeeping formalizes prediction and turns it into repeatable institutional action. The relevant unit of evaluation is not the model alone but the complete decision system: data, target definition, validation, thresholds, uncertainty handling, human review, explanations, monitoring, appeals, and the consequences attached to the output.

## Sources

### FTC — Using Consumer Reports: What Landlords Need to Know

- https://www.ftc.gov/business-guidance/resources/using-consumer-reports-what-landlords-need-know
- Tenant consumer reports may include rental/eviction history, credit history, criminal records, and a risk score or recommendation produced from criteria selected for the housing provider.
- The FCRA requires adverse-action notice when report information contributes to a negative housing decision.
- The notice must identify the reporting agency and explain rights to obtain and dispute the report.

### CFPB — Rental application denial and tenant screening reports

- https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-my-rental-application-is-denied-because-of-a-tenant-screening-report-en-2105/
- Confirms FCRA rights for rental applicants when a landlord takes adverse action based on a tenant screening report, including notice, access, and dispute rights.

### FTC — RentGrow enforcement matter, 2026

- https://www.ftc.gov/legal-library/browse/cases-proceedings/222-3002-rentgrow-inc-us-v
- https://www.ftc.gov/news-events/news/press-releases/2026/07/rentgrow-pay-225-million-settle-ftc-allegations-company-violated-fair-credit-reporting-act-ftc-act
- The FTC announced a $2.25 million settlement of allegations that included failures to use reasonable procedures to assure report accuracy.
- Used as a concrete example of data-quality obligations in tenant-screening infrastructure, not as proof that tenant-screening systems generally are inaccurate.

### HUD — Fair Housing Act guidance on tenant screening and AI

- https://archives.hud.gov/news/2024/FHEO_Guidance_on_Screening_of_Applicants_for_Rental_Housing.pdf
- The 2024 guidance discusses tenant screening with varying levels of automation, including machine learning and AI.
- It emphasizes Fair Housing Act obligations, transparency, accuracy, individualized evaluation, and avoidance of unjustified discriminatory effects.

### EEOC / DOJ — Disability discrimination and algorithmic employment tools

- https://www.eeoc.gov/newsroom/us-eeoc-and-us-department-justice-warn-against-disability-discrimination
- EEOC guidance warns that algorithmic hiring or employment tools can unlawfully screen out qualified people with disabilities, fail to provide reasonable accommodation, or elicit prohibited disability-related information.
- Supports the chapter's claim that moving a decision into software does not remove the deploying institution's legal obligations.

### NIST — AI Risk Management Framework 1.0

- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- https://www.nist.gov/itl/ai-risk-management-framework
- NIST describes trustworthy AI characteristics including validity/reliability, safety, security/resilience, accountability/transparency, explainability/interpretability, privacy, and fairness with harmful bias managed.
- NIST notes that AI RMF 1.0 is currently being revised; the chapter uses the framework as a risk-management lens rather than a current legal mandate.

### NIST — AI RMF Playbook and explainability resources

- https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook
- https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources
- Supports lifecycle evaluation, testing, monitoring, governance, and the distinction between technical explainability and information useful to different decision participants.

## Boundaries and counterevidence

- The chapter does not treat human decision-making as a neutral benchmark. Human gatekeepers can be inconsistent, biased, fatigued, and difficult to validate; statistical systems can improve consistency and fairness in some contexts.
- A predictive model is not automatically the final decision. Thresholds, human review, policy rules, and conditional outcomes can change how the same model output is used.
- Algorithmic discrimination can arise without explicit protected-class variables, but not every correlation or group difference is unlawful or unjustified. Legal analysis is context-specific.
- Human-in-the-loop review is not automatically meaningful; its quality depends on time, information, authority, incentives, and ability to override.
- Explainability does not necessarily require disclosure of proprietary model internals. Different actors need different actionable information.
- A model can be accurate and still be inappropriate for a particular context; conversely, an imperfect model can be useful when embedded in safeguards proportional to consequence.
- The RentGrow matter is a settlement of allegations and should remain described as such.
- NIST AI RMF is voluntary, and its 1.0 version is undergoing revision as of 2026.

## Design implications under test

1. Validate identity, data provenance, and label quality before focusing on model sophistication.
2. Keep the normative choice of what outcome to predict visible; prediction of a historical outcome does not establish that the outcome deserves replication.
3. Treat thresholds as policy decisions with explicit owners.
4. Let uncertainty alter process: borderline or high-consequence cases can receive additional evidence or review rather than false binary certainty.
5. Preserve evidence behind consequential verdicts so subjects and reviewers can reconnect outcomes to correctable facts.
6. Design human review so disagreement is operationally possible and measurable, not ceremonial.
7. Monitor drift, error distribution, overrides, appeals, and subgroup performance after deployment.
8. Weight errors by consequence and reversibility, not only aggregate counts.
9. Preserve responsibility across vendors, model builders, deployers, and human reviewers rather than allowing automation to launder accountability.
10. Maintain an exit/fallback plan before an algorithmic gate becomes indispensable infrastructure.
11. Give different audiences explanations that enable the action they actually possess: correction, operation, audit, or regulation.

## Forward link

Chapter 15 asks what happens when the gatekeeper has its own stake in who passes. The central problem shifts from predictive error to structural conflict of interest.