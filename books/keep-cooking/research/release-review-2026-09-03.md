# Release review — 2026-09-03

## Scope

This review rechecks the principal time-sensitive technical, economic, labor-market, energy, and agent-capability claims in *Keep Cooking* before preparing a Shelf release.

The manuscript's core thesis remains conditional rather than predictive: if useful machine cognition becomes substantially cheaper and more abundant, value should migrate toward complementary scarce resources such as context, judgment, energy, physical execution, distribution, trust, accountability, and institutional capacity. The book repeatedly preserves counter-cases in which model progress stalls, inference remains costly, productivity gains fail to diffuse, or institutions adapt differently.

## Continuous-agent afterword

The August 30 afterword begins from a social-media screenshot and explicitly labels that screenshot as unverified provenance rather than a product specification. That caution remains appropriate.

Independent reporting now substantially corroborates the capability bundle described in the screenshot. Alex Heath's late-August 2026 report, based on an early-August closed preview he attended, describes OpenAI's Astra as designed to work for days or weeks, remember corrections, collaborate with other agents and people, and act across software tools. The report also attributes to Sam Altman the expectation that Astra could be the first model to invent new things "in a way that matters."

Source:
https://sources.news/p/sam-altman-openai-agi

No manuscript correction is required. The afterword does not claim that the screenshot itself was authenticated, that Astra had launched, or that any rumored product name, date, or specification was guaranteed. Future editions should refresh the product state and separate demonstrated capabilities from announced or reported intentions.

## Capability and adoption

Stanford HAI's 2026 AI Index provides a fresher release anchor than the 2025 Index used for several first-draft measurements. It reports rapid gains across reasoning, coding, and agentic benchmarks while continuing to show jagged capability and non-trivial agent failure rates. Its economy chapter reports organizational AI adoption at 88% in 2025, generative-AI use in at least one business function at 70% of surveyed organizations, and population-level GenAI adoption around 53% within three years.

Sources:
https://hai.stanford.edu/ai-index/2026-ai-index-report
https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
https://hai.stanford.edu/ai-index/2026-ai-index-report/economy

The manuscript's use of earlier fixed-capability inference-cost comparisons remains explicitly dated and caveated rather than presented as a timeless price index. The 2026 evidence strengthens the broader claim that capability, adoption, and competitive pressure continue moving quickly. No manuscript correction is required.

## Productivity, heterogeneity, and labor

The strongest release-sensitive labor claim in the manuscript is not that AI is already causing economy-wide mass unemployment. The book instead argues that productivity effects are heterogeneous, that exposure is not equivalent to job elimination, and that entry-level career ladders may narrow before aggregate employment collapses.

That framing remains supported by current evidence.

The ILO's April 2026 brief on AI exposure indicators explicitly cautions that exposure measures should not be interpreted on their own as predictions of job losses or labor-market outcomes. This is consistent with the manuscript's treatment of the ILO's 2025 estimate that roughly one in four workers globally are in occupations with some degree of GenAI exposure.

Sources:
https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure
https://www.ilo.org/resource/news/new-ilo-brief-explains-what-ai-exposure-indicators-reveal-about-jobs

A January 2026 BIS working paper using more than 12,000 non-financial firms in the EU and United States finds that AI adoption raises labor productivity by about 4% in the short run, with higher wages at adopting firms and no short-run adverse effect on firm-level employment. The authors also find uneven gains concentrated in medium and large firms and emphasize complementary investments in software, data, and workforce training.

Source:
https://www.bis.org/publications/working-paper-1325-ai-adoption-productivity-and-employment-evidence-european-firms

Stanford's 2026 AI Index adds a different signal: labor-market effects remain uneven and are showing up disproportionately in hiring pipelines and younger workers in exposed occupations, while large-scale economy-wide job loss has not yet appeared. This supports treating the manuscript's "missing rungs" mechanism as a plausible structural risk, not as a settled forecast.

Source:
https://hai.stanford.edu/ai-index/2026-ai-index-report/economy

No manuscript correction is required.

## Energy, infrastructure, and rebound

The manuscript uses the IEA's 2025 *Energy and AI* base case as a dated scenario, not as a realized fact. That report projects global data-centre electricity consumption rising from roughly 415 TWh in 2024 to around 945 TWh in 2030 in its base case, with accelerated servers accounting for a large portion of incremental demand.

Source:
https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai

The IEA's April 2026 *Key Questions on Energy and AI* update reports that data-centre electricity use surged in 2025 even as the energy required for individual AI tasks continued to fall rapidly, while grid and supply-chain bottlenecks tightened. This directly preserves the book's rebound framing: efficiency per task and total electricity demand can move in opposite directions when usage expands faster than efficiency improves.

Sources:
https://www.iea.org/reports/key-questions-on-energy-and-ai
https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions

No manuscript correction is required. Future editions should refresh the IEA scenario values rather than silently treating the 2025 base case as current fact.

## Global distribution and complements

The World Bank's *Digital Progress and Trends Report 2025: Strengthening AI Foundations* remains a valid source for the manuscript's four complementary foundations: connectivity, compute, context, and competency. The 2026 *World Development Report: The Promise of Artificial Intelligence* strengthens the same general mechanism by emphasizing reliable electricity and internet access, affordable compute, shared data resources, education systems, and business institutions as necessary complements for adoption and adaptation.

Sources:
https://www.worldbank.org/en/publication/dptr2025-ai-foundations/report
https://www.worldbank.org/en/publication/wdr2026

No manuscript correction is required.

## Research-apparatus correction

The manuscript had already incorporated several 2026 sources in prose — including the 2026 Stanford AI Index, the IEA's 2026 energy update, and a 2026 BIS firm study — while the original source ledger still stopped at first-draft 2025 sources. That provenance gap is corrected in the release candidate by adding current release-refresh entries to `research/source-ledger.csv`.

The manuscript text itself does not require a factual correction for release.

## Release decision

The release review found no time-sensitive claim in the reviewed evidence set that requires manuscript surgery before publication.

The strongest counter-cases remain intact throughout the book: more inference is not always better; model capability is jagged; productivity gains vary by task, worker, and firm; exposure is not job loss; energy efficiency can outrun or lag usage growth; competitive markets may pass gains through to users rather than providers; and institutions can deliberately preserve apprenticeship, portability, accountability, and human authority.

The release candidate can proceed from the committed Desk snapshot after this provenance refresh. Future editions should refresh continuous-agent product state, Stanford AI Index measurements, IEA energy data, ILO/BIS labor evidence, World Bank global-distribution evidence, and any dated model-pricing comparisons before replacing the Shelf edition.
