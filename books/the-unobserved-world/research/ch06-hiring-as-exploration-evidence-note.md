# Chapter 6 evidence note — Hiring as Exploration

Fresh check: September 10, 2026.

This note tightens the evidentiary boundary around Li, Raymond, and Bergman, “Hiring as Exploration,” *The Review of Economic Studies* 93(2), March 2026, pp. 1200–1240 (published online June 12, 2025), DOI: https://doi.org/10.1093/restud/rdaf040. NBER working-paper record: https://www.nber.org/papers/w27736.

## What the paper directly establishes

The setting is professional-services recruiting at one Fortune 500 firm. The authors compare the firm's observed human screening with counterfactual resume-screening policies: a supervised-learning model and an Upper Confidence Bound contextual-bandit model. The UCB policy rewards statistical upside under uncertainty rather than ranking only by a point estimate.

The demographic contrast in the published paper is unusually large: Black and Hispanic applicants are 9.4% of interviewees under observed human practice, an estimated 4.2% under the supervised-learning policy, and an estimated 24.3% under UCB. Both algorithmic policies also increase the share of women relative to human recruiters. These are counterfactual policy estimates from archival firm data, not the result of a prospective field experiment randomly assigning firms or applicants to the three screening systems.

The paper's main operational definition of applicant “quality” is eventual hiring probability conditional on receiving an interview: whether the applicant ultimately receives and accepts an offer. Section 7 separately considers offer receipt and limited post-hire outcomes. The chapter should therefore not casually translate the main result into “better workers,” “higher job performance,” or an established productivity gain. The result is stronger and narrower: under the authors' identification strategies, the algorithms select interview slates with higher eventual hiring rates by this firm's own downstream process.

## The missing-label problem is the argument, not a footnote

The authors observe demographics for all applicants but observe offer/hiring outcomes only for people actually interviewed. They therefore cannot simply compare realized hiring rates for every applicant a counterfactual algorithm would have selected. The paper uses three complementary approaches with different assumptions to address this selective-label problem.

One particularly useful source of identification is random assignment of applicants to initial resume screeners. Screeners differ materially in leniency. In the working-paper description, among the 54 recruiters handling more than 50 applications, the 75th-percentile screener's pass rate is about 50% higher than the 25th-percentile screener's after controls. That variation lets the authors study marginal applicants whose interview access changes with screener leniency.

This is a strong design feature, but it does not magically reveal outcomes for every rejected applicant. Instrumental-variable evidence identifies a local margin under its assumptions. The chapter should preserve that distinction rather than allowing “random assignment to screeners” to sound like a randomized trial of the UCB policy itself.

## Strongest counterargument / disconfirming possibility

The paper defines success largely through the firm's own hiring funnel. That creates a serious interpretation problem for any broad claim about talent. If downstream interviews, offers, job matching, or acceptance behavior contain bias or idiosyncratic firm preferences, then a policy can improve “hiring likelihood” without proving that it has found objectively more capable workers. The authors acknowledge that they observe little post-hire performance data; the available performance and promotion evidence is limited and noisy.

This is not a reason to dismiss the result. It is a reason to make the chapter's claim more interesting. The UCB policy can change who reaches the measurement stage, but the measurement stage is itself institutional. Exploration can reveal that a previously thin region of applicant space converts well under the existing process; it cannot by itself tell us whether that process measures the right thing.

A second boundary is external validity. The result comes from one firm's high-skill professional-services hiring, with its applicant pool, roles, screening variables, interview capacity, and downstream hiring rules. The 24.3% figure should remain attached to that setting rather than becoming a generic expectation for “exploration in hiring.”

## Editorial implication for Chapter 6

The chapter's strongest move is not the generic claim that uncertainty can promote diversity. It is the stranger identification story: the firm already possessed a crude exploration mechanism because applicants were randomly routed to screeners with different thresholds. Human inconsistency generated observations near the interview margin. A more consistent automated system can remove that accidental experiment unless it deliberately buys back some variation.

That creates a sharper narrative sequence for a future prose pass:

1. Begin with two otherwise similar applicants receiving different access because one lands on a more lenient screener.
2. Show how that nuisance variation becomes evidence about marginal candidates.
3. Introduce the supervised and UCB counterfactuals only after the reader understands why the missing labels exist.
4. Give the 9.4 / 4.2 / 24.3 contrast, immediately labeling all three correctly: one observed share and two modeled policy shares.
5. Name the strongest limit: the primary quality target is eventual hiring through this firm's process, not a universal measure of worker quality.
6. End on the institutional design question already latent in the manuscript: when automation removes noisy human variation, what deliberate, ethical variation replaces the evidence that noise used to generate?

That structure would make the chapter less like an explanation of contextual bandits and more like a story about an organization discovering that inconsistency—something it reasonably wants to eliminate—was also producing information.

## Claim boundary to carry forward

Safe: “In one Fortune 500 professional-services recruiting setting, Li, Raymond, and Bergman estimate that an exploration-oriented UCB screening policy would have selected a substantially more racially diverse interview slate than either observed human screening or their supervised-learning alternative, while also improving eventual hiring rates under their identification strategies.”

Too strong: “Exploration algorithms have been experimentally shown to hire better and more diverse workers.”

The published article and NBER record were freshly checked for this note. No claim here requires treating a counterfactual simulation as a deployed hiring experiment.