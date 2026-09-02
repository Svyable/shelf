# Release review — 2026-09-01

## Scope

This review rechecks the time-sensitive labor-market and AI-harness claims flagged in the research brief before preparing a Shelf release of *Ubiquitous*.

Desk source snapshot reviewed: `47f7151f2bdd5809d92a57bcd95fa9a723150804`.

## Labor-market refresh

The current U.S. Bureau of Labor Statistics 2025–2035 Occupational Outlook Handbook pages continue to support the manuscript's central distinction between durable systems work and merely physical work:

- Electricians: projected employment growth of 9%, with about 72,700 openings per year. BLS explicitly links additional demand to AI/data-center electricity use, grid upgrades, and new electrical infrastructure.
- Plumbers, pipefitters, and steamfitters: projected growth of 7%, with about 42,000 openings per year.
- Industrial machinery mechanics, machinery maintenance workers, and millwrights: projected growth of 14%, with about 51,900 openings per year.
- Civil engineers: projected growth of 6%, with about 22,700 openings per year.
- Construction managers: projected growth of 9%, with about 49,700 openings per year; BLS notes that increasing construction complexity can sustain demand even as technology raises manager productivity.
- Drafters: projected growth of 1% overall, with BLS continuing to identify CAD/BIM adoption as a source of decline for many drafting categories.
- Machinists and tool and die makers: projected decline of 1% overall; machinists alone are projected at +1%, while tool and die makers are projected at -9%. BLS attributes pressure partly to improving CNC and automation technologies.
- Water and wastewater treatment plant and system operators: projected decline of 6%, with BLS explicitly citing increasingly automated treatment systems while noting continued need for skilled workers to operate complex controls.

These updates strengthen, rather than weaken, the manuscript's warning that "work with your hands" is not a sufficient durability rule. The more defensible distinction remains diagnosis, system ownership, verification, variable environments, local consequence, and accountable intervention.

## AI-harness refresh

Anthropic's current product documentation continues to support Chapter 3's architecture-level description:

- Remote connectors expose cloud/SaaS tools across Claude surfaces.
- Desktop extensions package local MCP servers for Claude Desktop and Claude Code and can reach local files, databases, processes, applications, and other machine-local resources.
- Connectors can retrieve data and take actions subject to the permissions inherited from connected services.

Anthropic's June 26, 2026 Economic Index report, *Cadences*, also continues to support the shift from short chat interactions toward longer-running agentic work in Claude Code and Cowork.

## New counterweight added during release review

Anthropic's June 16, 2026 report *Agentic coding and persistent returns to expertise* analyzes roughly 400,000 Claude Code sessions. It finds that people from many occupations can achieve coding-task success rates near those of software engineers, while greater domain expertise still predicts higher success and more effective delegation.

This is useful counterevidence against an overstrong reading of "the floor rises." It supports the manuscript's actual formulation: AI can compress entry barriers without making expertise worthless. Expertise increasingly earns its return through planning, judgment, context, verification, and the ability to delegate larger chunks of execution effectively.

Anthropic's August 12, 2026 review of worker retraining evidence is also relevant to the book's apprenticeship and transition argument. It finds positive but modest average effects from conventional job-training programs, with stronger but less reliably replicated results from sector-based programs tied directly to employers and high-demand fields. This reinforces the manuscript's emphasis on consequential, employer-connected learning rather than explanation alone.

## Release decision

No time-sensitive claim reviewed here requires a manuscript correction before release. The reviewed evidence remains inside the manuscript's stated uncertainty bounds and, in several cases, adds direct support for distinctions already made in the text.

The release candidate should therefore preserve manuscript prose unchanged, add the two newer research items to the source ledger, and publish from a committed Desk snapshot after this review lands.
