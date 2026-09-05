# Source Brief v1

## What the evidence says before the manuscript argues anything

The first-draft evidence does not support a simple story in which artificial intelligence is either becoming dependable enough to trust everywhere or remaining too unreliable to build around. It supports a more uncomfortable picture: **capability, adoption, and deployment are moving quickly while reliability remains task-specific, uneven, and sensitive to how a system is used.** That is the environment in which robustness becomes valuable.

### 1. Capability is still moving quickly

The 2026 Stanford AI Index reports large year-over-year gains on several difficult benchmarks and continued expansion of organizational and consumer use. METR’s task-horizon work approaches the same movement from a different direction by estimating the human-equivalent duration of software tasks that frontier agents can complete at specified success probabilities. The useful lesson for this manuscript is not an extrapolated arrival date. It is that a workflow designed around a fixed assumption about what models can or cannot do is likely to age quickly.

METR’s methodology is particularly useful for **Robust** because it keeps reliability in the measurement. A 50-percent success horizon and an 80-percent success horizon describe different systems for practical purposes even when they refer to the same model. A task that is impressive at fifty-fifty may still be unusable without verification in a consequential workflow.

### 2. Aggregate intelligence remains jagged

The Stanford AI Index’s technical-performance synthesis makes the frontier look less like a rising tide than a collection of steep, uneven cliffs. Models can post remarkable results on mathematics, coding, science, or computer-use benchmarks while still failing tasks that appear easy to humans or losing substantial performance when the setting changes.

That matters because organizations rarely deploy “general benchmark ability.” They deploy a model into a narrow chain: read this document, classify this request, produce this code change, answer this customer, reconcile this record, call this tool, or make this recommendation. Workflow reliability is produced by the whole chain — model, prompt, context, retrieval, tools, permissions, external services, validators, and people — rather than by the model score alone.

### 3. Model churn is normal infrastructure work

Microsoft’s current Foundry model-retirement documentation is a useful concrete reminder that production models have lifecycles. Versions move through preview, general availability, legacy, deprecation, and retirement; replacements are evaluated and migrations are scheduled. This is not evidence of provider failure. It is evidence that the intelligence layer behaves like an evolving dependency rather than a permanent appliance.

The practical consequence is architectural. If an essential workflow silently assumes that one model identifier, context behavior, tool schema, price, latency profile, or refusal pattern will remain unchanged for years, the organization has embedded a forecast into its software. Robust design makes that forecast visible and limits the damage if it is wrong.

### 4. Adoption is moving from assistance toward execution

Stanford’s economy chapter shows broad organizational AI adoption while agent use remains much earlier in many business functions. Vendor studies from OpenAI and Anthropic show a similar direction from their own customer and product surfaces: people are using AI for more work, and some organizations are shifting from conversational assistance toward multi-step execution and automation.

These are interested sources and should be labeled as such. They are still useful for identifying the operating question. The risk profile changes when a model stops producing text for a person to inspect and starts producing effects in other systems. A draft can be wrong and die in a document. An agent with credentials can be wrong and move money, change permissions, delete data, publish content, or send a message before anyone reads its reasoning.

The manuscript therefore treats delegation as a ladder rather than a switch:

1. **Assist** — retrieve, explain, summarize.
2. **Draft** — create an artifact for human review.
3. **Recommend** — rank or propose an action.
4. **Act with approval** — prepare the action but require a human commit.
5. **Act within bounds** — execute autonomously inside explicit limits.
6. **Act autonomously** — choose and execute consequential actions with minimal intervention.

Robustness does not demand that every workflow stay on a low rung. It demands that the move upward be deliberate and that authority grow more slowly than capability when consequence grows faster than observability.

### 5. Reliability engineering offers mechanisms, not a metaphor

Google’s SRE literature predates modern generative AI, but several mechanisms transfer usefully when translated with care.

**Service-level objectives** force a team to define what success means from the user’s point of view. For an AI workflow, that may include task correctness, unsafe-action rate, time to human escalation, recoverability, cost, and latency rather than raw model uptime.

**Error budgets** reject the fantasy of zero failure and connect reliability to the pace of change. In an AI context, the right error budget depends strongly on consequence. A brainstorming assistant can tolerate failures that a payroll agent, medical triage system, production deployer, or legal filing process cannot.

**Graceful degradation** asks what useful reduced service remains when the preferred path is unavailable or untrustworthy. An AI application might fall from a frontier model to a smaller model, from autonomous action to suggestion, from generative output to deterministic rules, from automation to a human queue, or finally to a safe stop.

The SRE literature also contains an important warning: rare fallback paths rot. A degraded mode that is never exercised may exist only in diagrams. Robustness therefore requires game days, migration rehearsals, sampled manual operation, or other ways to prove that the backup still works.

### 6. Human oversight can fail in both directions

Long before foundation models, human-factors research showed that automation creates a calibration problem. People can misuse automation by over-relying on it, disuse it after false alarms or visible errors, and become poor monitors when attention is allocated elsewhere. Later work on automation bias and algorithm aversion complicates the picture further: people can both trust automation too much and reject useful automation after watching it make mistakes.

This is why “human in the loop” is not a sufficient design description. The important questions are what the human sees, how much time the human has, whether the human still possesses the skill to judge the output, what action the human can take, whether disagreement is recorded, and what happens when the human does nothing.

A person who clicks approve on two hundred routine AI actions a day may be formally responsible and functionally absent.

### 7. Governance is strongest when attached to the lifecycle

NIST’s AI Risk Management Framework and Generative AI Profile are useful because they organize risk work around functions such as governance, mapping context, measurement, and management rather than around one permanent list of forbidden uses. That fits a moving technological landscape.

For **Robust**, the most important implication is that controls have to survive the model change. Documentation, evaluation, monitoring, incident response, ownership, and escalation should attach to the **workflow and its consequence**, not only to the current model name. If a control disappears when the model is swapped, it was probably never a workflow control.

## The manuscript’s working synthesis

The evidence lanes point toward a practical definition:

> **A robust AI-enabled system keeps its essential function, observability, and human steering authority across model change, ordinary failure, and plausible surprise.**

That definition deliberately excludes three easier goals.

It is not maximum performance. The best benchmark model can be the wrong production model if its latency, cost, availability, behavior, or migration risk makes the system brittle.

It is not maximum redundancy. Every extra provider, path, and control adds cost and can add new failure modes.

It is not refusal to automate. Manual processes can be fragile, slow, inconsistent, and dependent on irreplaceable people. Sometimes automation is the redundancy.

The book’s job is to show how to buy the right amount of sturdiness without confusing sturdiness with stillness.

## Claims to keep especially fresh

Before any public edition, recheck:

- Stanford AI Index 2026 quantitative claims and whether a newer Index has superseded them.
- METR time-horizon estimates and methodology version.
- Major provider model lifecycle and retirement schedules.
- Organizational adoption and agent-use figures.
- Current NIST AI RMF revision status.
- Any named model benchmark result, price, context limit, or product feature.

The argument should survive these numbers changing. If it does not, the argument is not yet robust enough for the book that carries the name.
