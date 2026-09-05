# Chapter-Source Map

This map is a drafting aid, not a substitute for claim-level fact checking. Source IDs refer to `source-registry.md`.

| Chapter | Primary sources | Use and caution |
|---|---|---|
| 1 — The Model Has an Expiration Date | S09, S01 | Open on provider lifecycle schedules; make clear retirement is normal lifecycle management, not scandal. Date every schedule fact. |
| 2 — The Jagged Frontier | S01, S02, S03, S05, S06 | Establish rapid capability growth and uneven reliability. Preserve benchmark names, vintages, and success thresholds. |
| 3 — When Better Breaks Things | S05, S06, S09, S11 | Explain regression as workflow mismatch: behavior, latency, formatting, tool use, refusals, or context can change even when aggregate capability rises. Use mechanisms more than anecdotes. |
| 4 — Robust Is a Different Goal | S10, S11, S12 | Translate reliability engineering into a general robustness philosophy. Avoid implying AI equals a distributed service. |
| 5 — Own the Problem, Rent the Intelligence | S04, S13, S14, S15 | Use adoption evidence sparingly. Vendor evidence is directional and interested. Main argument is portability of goals, standards, context, and work product. |
| 6 — Keep the Manual Gear | S16, S17, S19 | Human factors, automation complacency, role design, and the risk that rarely exercised skills decay. Avoid unsupported claims about precise decay rates. |
| 7 — Taste Is a Control System | S17, S18, S19 | Trust calibration and error detection. “Taste” is the manuscript’s practical term for standards plus discrimination, not a scientific construct. |
| 8 — Skills That Survive the Tool | S04, S13, S19 | Focus on problem framing, verification, communication, domain models, experimentation, and learning. Avoid speculative lists of doomed occupations. |
| 9 — The Human Override | S07, S16, S17, S19 | Show why a nominal human-in-the-loop can fail; connect authority, time, information, skill, and intervention power. |
| 10 — Two Speeds, One Workflow | S07, S11, S15, S19 | Separate fast generation/execution from slower consequential commit. Treat approval boundaries as workflow design. |
| 11 — Evals Before Opinions | S02, S03, S05, S06, S07 | Argue for workflow-specific evaluation suites, regression sets, and versioned results. Avoid universal benchmark claims. |
| 12 — Failure Budgets for Intelligence | S10, S11, S03, S07 | Adapt error-budget thinking to AI. Consequence and detectability should determine acceptable failure, not one universal percentage. |
| 13 — Vendor Optionality | S09, S07 | Use lifecycle churn to motivate substitution boundaries. Include counter-case where single-vendor depth is rational. |
| 14 — Data You Can Leave With | S07, S08 | Ground portability in lifecycle governance and system ownership. Most argument is architectural rather than source-dependent. |
| 15 — Reversible Architecture | S09, S10, S11 | Emphasize modular boundaries, staged migration, version pinning, rollback, compatibility layers, and decision reversibility. |
| 16 — Graceful Degradation | S11, S12 | Translate degraded-service patterns into AI ladders. Stress that untested fallback code/processes are themselves risks. |
| 17 — Scenario Portfolios | S01, S04, S05 | Build strategy across plausible capability/cost/adoption paths rather than one forecast. Use trends as uncertainty inputs, not prophecy. |
| 18 — Redundancy Is Not Waste | S10, S11, S12 | Explain the economic cost of redundancy and the conditions under which it is justified. Include complexity as a counter-risk. |
| 19 — The Sturdy Institution | S07, S08, S19 | Attach governance to workflows, consequences, ownership, monitoring, incident learning, and training rather than model names. |
| 20 — Sturdy, Not Still | All, especially S01, S05, S07, S10 | Synthesize the core robustness compact. Treat the chapter as the end of the strategy argument, with later parts stress-testing the thesis at institutional and operational scale. |
| 21 — The Memory Tax | S07, S08, S19 | Distinguish searchable records, generated summaries, execution traces, and durable decision memory. Prescriptions about decision records and retention are manuscript arguments, not claims attributed to these sources. |
| 22 — The Apprenticeship Gap | S16, S17, S19 | Use human-factors and complementarity research to motivate attention, learning, calibration, and role design. Do not claim a universal measured rate of skill decay or that historic automation findings transfer unchanged to current models. |
| 23 — Common-Mode Failure | S10, S11, S12, S07 | Borrow the mechanism of correlated failure and cascading dependencies from reliability engineering, then apply cautiously to models, shared data, evals, human review, and organizational reasoning. |
| 24 — The Right to Exit | S07, S08, S09 | Ground lifecycle ownership, migration, and portability in governance and provider churn. The distinction between syntactic and semantic portability is an architectural argument; avoid implying that any cited framework mandates the book’s prescriptions. |
| 25 — After the Frontier | All, especially S07, S10, S11, S19 | Synthesize robustness as infrastructure and operating discipline. Avoid predicting a specific endpoint for AI progress; keep the closing argument valid under several capability trajectories. |
| 26 — The Update That Moved Too Fast | S20, S11, S12 | Use CrowdStrike’s incident account for chronology and the validator/update mechanism. The staged-rollout, blast-radius, and recovery-channel lessons are the manuscript’s interpretation. Do not generalize one incident into a universal claim about security vendors. |
| 27 — Forty-Five Minutes | S21, S07, S10 | Use the SEC source for the Knight Capital incident, erroneous-order volume, inadequate safeguards, and loss context. The transfer to agent authority, rate limits, and consequence classes is an analogy about control design. |
| 28 — The Backup That Wasn’t | S22, S12, S11 | Use GitLab’s postmortem for backup/recovery details, restoration constraints, and lack of routine backup-test ownership. Distinguish replication, backup, and business recovery explicitly. |
| 29 — One Command, One Region | S23, S12, S10 | Use AWS’s incident summary for the authorized command, incorrect input, broad server removal, and subsystem effects. Apply the mechanism to scope-aware AI action without implying the incidents are technically identical. |
| 30 — The Migration Window | S09, S07, S11 | Treat provider retirement schedules as evidence that migration is normal lifecycle work. Avoid assuming every provider, model, or workflow has the same notice period or compatibility surface. |
| 31 — The Stop Rule | S07, S10, S11, S19 | Synthesize explicit stop conditions, authority withdrawal, degraded modes, and restart evidence. The specific stop-rule framework is original to the manuscript. |

## Claim-level verification targets

Before publication, create or update a release review covering at least:

1. every named current model, model status, and retirement date;
2. every 2026 AI Index statistic;
3. METR’s current time-horizon methodology and latest update date;
4. any claim about enterprise adoption, agent usage, or economic value;
5. NIST AI RMF revision status;
6. any direct quote introduced during revision;
7. every statement that implies a specific human-factors result transfers directly to contemporary generative AI;
8. any concrete claim introduced about portability requirements, appeal rights, interoperability mandates, or market regulation;
9. all historical incident chronology, numbers, and causal descriptions in Chapters 26–29 against S20–S23;
10. all provider lifecycle facts in Chapters 1 and 30 immediately before Shelf publication.
