# Agentile research trail

This directory records the sourcing and falsification work for the incomplete working draft of *Agentile*.

The present manuscript is a conceptual draft, not a fully source-locked edition. Before release, concrete historical, labor-market, productivity, organizational, and legal claims should be checked against primary or high-quality secondary sources and tied to chapter-level notes. The book should preserve evidence that cuts against its thesis, especially findings where current agents slow experts down, fail on long-horizon work, require costly verification, or shift rather than eliminate labor.

## Core source families to verify against

- Ronald H. Coase, “The Nature of the Firm” (1937), for transaction costs and firm boundaries.
- Herbert A. Simon on bounded rationality and organizational decision-making.
- Alfred D. Chandler Jr. on managerial coordination and the modern corporation.
- Labor-economics work by David Autor and collaborators on tasks, automation, augmentation, and occupational change.
- Recent randomized and field studies of generative AI productivity, including work on customer support, writing, software development, and professional knowledge work.
- Official labor-market data from the U.S. Bureau of Labor Statistics and comparable statistical agencies when discussing employment, wages, occupations, or productivity.
- Primary documentation from agent platforms and model providers when describing tool use, permissions, autonomy, reliability, or deployment behavior.
- Legal sources on agency, authority, liability, contracting, and responsibility where the manuscript compares software agents with human agents.

## Chapter 2 — When Tools Become Actors

Chapter 2 treats agency as an operational change in the decision boundary rather than a claim about machine consciousness. Its factual scaffolding should stay anchored to current primary descriptions of agent systems and the emerging identity/authorization problem.

Sources checked for this draft:

- NIST, “Lessons Learned from the Consortium: Tool Use in Agent Systems” (August 5, 2025): describes AI agents as systems able to perceive and act in environments, commonly by embedding general-purpose models in software scaffolding that enables tool use. https://www.nist.gov/news-events/news/2025/08/lessons-learned-consortium-tool-use-agent-systems
- NIST CAISI, “Announcing the AI Agent Standards Initiative” (February 17, 2026): notes autonomous actions, interoperability, and the need for secure adoption across the digital ecosystem. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure
- NIST NCCoE, “Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization” (initial public draft, February 5, 2026): frames agent identity, authorization, access to data, tools, and applications as practical deployment requirements. https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd
- Anthropic, “Building effective agents” (December 19, 2024): distinguishes predefined workflows from agents that dynamically direct their own processes and tool use, while warning that autonomy can raise cost and compound errors. https://www.anthropic.com/engineering/building-effective-agents
- Anthropic, “Trustworthy agents in practice” (April 9, 2026): describes agents as operating in self-directed plan/act/observe loops and emphasizes permissions, human control, and action-level approval boundaries. https://www.anthropic.com/research/trustworthy-agents
- OpenAI, “How agents are transforming work” (June 25, 2026): characterizes agentic work as delegated, longer-horizon tasks in which systems coordinate tool calls and iterate toward results. https://openai.com/index/how-agents-are-transforming-work/
- OpenAI, “Running Codex safely at OpenAI” (May 8, 2026): documents access controls, approval requirements, constrained execution, network policies, and telemetry as part of real agent deployment. https://openai.com/index/running-codex-safely/

Counterevidence preserved in the chapter: autonomy may trade latency and compute for task performance; long chains can compound errors; a system that requires complete human re-verification may shift rather than remove labor; and broad credentials can make a less-capable model more consequential than a stronger but isolated one.

## Chapter 3 — The Falling Cost of Delegation

Chapter 3 frames agent economics around the all-in cost of causing a reliable result: instruction, execution, verification, and correction. It distinguishes task-level productivity from the larger effect of moving previously uneconomic errands above the threshold where delegation becomes worthwhile.

Sources checked for this draft:

- Ronald H. Coase, Nobel Prize lecture (1991), revisiting “The Nature of the Firm”: identifies the costs of discovering prices, negotiating, contracting, inspecting, and settling disputes as transaction costs and explains how they shape what activity occurs through markets versus firms. https://www.nobelprize.org/prizes/economic-sciences/1991/coase/lecture/
- Nobel Prize press release for the 1991 economics prize: summarizes Coase’s argument that firms expand while internal coordination is cheaper than market contracting and that transaction costs affect organizational size. https://www.nobelprize.org/prizes/economic-sciences/1991/press-release/1000/
- Erik Brynjolfsson, Danielle Li, and Lindsey R. Raymond, “Generative AI at Work,” NBER Working Paper 31161, revised November 2023 and later published in *The Quarterly Journal of Economics* (2025): study of 5,179 customer-support agents finding an average productivity increase of about 14%, with much larger gains for novice and lower-skilled workers and minimal effects for the most experienced workers. https://www.nber.org/papers/w31161
- Joel Becker, Nate Rush, Beth Barnes, and David Rein, METR, “Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity” (July 10, 2025): randomized study of experienced developers on familiar repositories finding that access to early-2025 AI tools increased completion time by 19% in that setting despite participants expecting and perceiving speedups. https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Harvard Business School AI Institute, research index for “Navigating the Jagged Technological Frontier”: preserves the broader finding that generative-AI productivity and quality effects vary by whether a task lies inside or outside the technology’s capability frontier. https://aiinstitute.hbs.edu/arts-and-science-research/

Counterevidence preserved in the chapter: delegation costs can rise when briefing is difficult, context is missing, expert workflows are interrupted, outputs are hard to verify, or subtle errors make review expensive. The chapter therefore makes no universal productivity claim.

## Chapter 4 — The Firm Has a New Boundary

Chapter 4 applies transaction-cost economics to the organizational consequences of agents. It deliberately rejects a one-direction prediction: the same technology can make outsourcing easier by lowering the cost of crossing firm boundaries and make large organizations easier to run by lowering internal coordination costs.

Sources checked for this draft:

- Ronald H. Coase, Nobel Prize lecture (1991): explains firms as alternative coordination systems that exist when internal administrative coordination is less costly than market transactions, with firm size limited by rising internal coordination costs. https://www.nobelprize.org/prizes/economic-sciences/1991/coase/lecture/
- Nobel Prize press release for Coase (1991): explicitly summarizes the firm-size condition in terms of production, contracting, and administrative costs. https://www.nobelprize.org/prizes/economic-sciences/1991/press-release/1000/
- Oliver E. Williamson, Nobel Prize lecture (2009), “Transaction Cost Economics: The Natural Progression”: develops the make-or-buy problem as a governance choice and emphasizes that transactions differ in their contractual and adaptation needs. https://www.nobelprize.org/prizes/economics/2009/williamson/lecture/
- Nobel Prize presentation material for the 2009 prize: summarizes Williamson’s account of why complex transactions and relationship-specific investments can make hierarchy preferable to market contracting, while also noting the costs and potential abuse of authority inside firms. https://www.nobelprize.org/prizes/economic-sciences/2009/illustrated-information/?print=1
- A. Michael Spence, Nobel lecture: discusses how internet platforms lowered informational and monitoring transaction costs and shifted some activities toward outsourcing, while noting that firm boundaries and supply-chain architecture remain unsettled empirical questions. https://www.nobelprize.org/uploads/2018/06/spence-lecture.pdf

Counterevidence preserved in the chapter: lower coordination costs can produce smaller firms, larger firms, or hybrid firms; outsourced agent infrastructure can create lock-in and concentrated dependencies; proprietary data can strengthen incumbents; and legal accountability may resist operational outsourcing.

## Falsification questions

1. Where does cheap delegation increase total work rather than reduce headcount?
2. Which tasks remain bottlenecked by verification, physical presence, trust, regulation, or accountability?
3. When do agents reduce expert performance because checking costs exceed execution gains?
4. Does agent adoption shrink firms, or does lower coordination cost allow firms to become larger and more complex?
5. Who captures the surplus when agentile capacity is rented from concentrated infrastructure providers?
6. Which apparent “labor replacement” effects are actually demand shifts, job redesign, offshoring changes, or measurement artifacts?
7. What new work appears because previously uneconomic errands become worth doing?

## Draft status

Front matter and Chapters 1, 2, 3, 4, 6, 10, and 12 are complete working chapters. Chapter 13 is partial. Other planned chapters are not yet present in the promoted draft.
