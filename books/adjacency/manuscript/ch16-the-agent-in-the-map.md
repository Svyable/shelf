# The Agent in the Map

A search engine waits at the edge of action.

It finds something and hands the result back to a person.

An agent does not have to stop there.

It can search, choose, retrieve, compare, call a tool, inspect the result, search again and continue until the task changes shape or ends.

This turns adjacency from a retrieval technique into part of a control system.

The agent is not merely using the map.

It is moving through it.

Consider a software agent asked to fix a bug in a large repository.

The request names a symptom, not a file. The repository contains tens of thousands of files. Loading all of them into a language model would be expensive and unnecessary. The agent therefore needs to decide where to look.

It can search exact strings from the error message. It can embed the issue description and retrieve semantically related code or documentation. It can inspect import graphs. It can search commit history. It can run tests. Each result changes the next query.

The task is a walk through overlapping spaces.

Text similarity.

Code similarity.

Repository structure.

Dependency graphs.

Execution traces.

Human-written documentation.

Past memories.

The agent's competence depends partly on choosing which map matters at each step.

This is a more useful picture of agentic AI than the common image of a model simply “thinking longer.”

Longer reasoning helps. Better models help. But action in a real environment requires selective access to tools and information. A capable agent must repeatedly construct a small relevant world from a much larger one.

Vector retrieval is one of the technologies that makes that construction cheap.

Tool use provides a clean example.

Imagine an agent with access to five tools. The model can inspect every tool description directly. Now imagine five thousand tools: databases, APIs, internal services, business functions, scripts, research resources and specialist agents.

The interface breaks.

The model cannot reason over thousands of tool descriptions every time it wants to act.

One solution is semantic tool retrieval. Embed the descriptions of the tools. Embed the current need. Retrieve a small neighborhood of plausible tools. Let the model choose among those.

The action space becomes searchable.

This is an important transition.

Traditional software exposes capabilities through explicit menus, APIs and code paths designed by programmers. Agentic systems can increasingly discover capabilities through descriptions.

“Find the tool that can check whether this supplier appears on a sanctions list.”

“Find the function that creates a calendar event.”

“Find the database interface that contains this customer's entitlement history.”

The exact tool name need not be known in advance.

Intention becomes a query into capability space.

This has obvious advantages for extensibility. Add a new tool, describe it, embed it and it can become available to agents without hard-coding every routing path.

It also creates a new class of failure.

A tool that is poorly described may never be retrieved.

Two tools with similar descriptions may be confused.

A dangerous tool may sit too near an ordinary one.

A generic tool can become a hub and dominate retrieval.

The agent may act incompetently because its map of available action was bad before its reasoning even began.

This is the upstream uncertainty from Chapter 12, now with consequences.

What if the right action never entered consideration?

An agent can reason impeccably over the wrong candidate set.

This suggests that agent evaluation should separate several capabilities that are often collapsed into one success rate.

Did the system understand the goal?

Did it retrieve the right information?

Did it retrieve the right tools?

Did it choose among them correctly?

Did it verify the result?

Did it know when to stop?

A failure in any one layer can look like “the AI was dumb.”

The causes require different fixes.

Better reasoning does not repair a missing tool description.

A better embedding does not repair a tool that lies about what it does.

More memory does not repair a stale permission.

Agentic systems are compositions of maps and actions.

This is why vector retrieval becomes more consequential as autonomy increases.

A human using search can notice an odd result and reformulate the query. An agent can do the same, but it may also take action on the first plausible neighbor. The distance between retrieval error and world change shrinks.

A retrieved paragraph becomes an email.

A retrieved code file becomes a patch.

A retrieved policy becomes a benefits decision.

A retrieved contact becomes a meeting invitation.

A retrieved product record becomes a purchase order.

The vector space is now upstream of agency.

This should change how we think about safety.

Many AI safety discussions focus on model outputs: harmful text, hallucinated facts, disallowed instructions. Agentic systems add another layer: action routing. Which tools and memories can the agent reach? Which resources are close enough to enter context? Which actions require stronger confirmation? Which retrieval results are treated as evidence rather than suggestion?

Capability should have geometry and gates.

A low-risk tool such as searching public documentation can be broadly retrievable. A high-impact tool such as sending money should require more than semantic similarity between the user's request and a tool description. Exact permissions, explicit intent, transaction limits and confirmation can form hard constraints around the vector layer.

The lesson from filtered search becomes operational doctrine.

Similarity nominates.

Authority decides.

This distinction is critical because natural-language interfaces blur the difference between understanding and authorization.

A user says, “Can you see whether I owe anything?” The agent may need a billing lookup tool. That does not imply authority to pay the balance.

A user says, “Figure out why the deployment failed.” The agent may need production logs. That does not automatically imply authority to restart the service.

A system that retrieves tools by semantic relevance must preserve the boundaries that ordinary software encoded through explicit interfaces.

Otherwise fuzzy intention leaks into hard action.

There is a second place vectors enter agent control: planning by analogy.

An agent can retrieve prior task traces similar to the current one. Instead of solving every task from scratch, it can examine successful workflows, failed approaches and reusable subplans.

This is procedural memory.

A customer-support agent recognizes that a new complaint resembles a previous account-migration case. A data agent recognizes that the requested report resembles a prior query pipeline. A coding agent retrieves an earlier refactor of a similar component.

The benefit can be large because many real tasks are variations on recurring structures.

Organizations are full of latent templates hidden in history.

The danger is cargo-culting.

An old plan can be close in description and wrong in context. A migration pattern from one database may not apply to another. A legal workflow may differ by jurisdiction. A previous customer exception may have been authorized for reasons not present now.

Procedural memory needs the same caution as episodic memory.

Retrieve precedent.

Do not worship precedent.

The most capable agent will need something like a novelty detector: a way to notice when the current case appears similar but contains a difference large enough to invalidate the old path.

Humans call this judgment.

Machine systems can approximate pieces of it through explicit checks, uncertainty, contrastive retrieval and verification.

The key is to build the workflow so that similarity opens investigation rather than closes it.

This matters even for apparently routine tasks.

Suppose an agent receives an invoice by email. It retrieves the vendor record, purchase order and prior invoices. Everything looks adjacent to ordinary accounts-payable work. One detail differs: the bank account changed.

The anomaly may be a legitimate update or fraud.

A system optimized only for semantic similarity could treat the new invoice as reassuringly close to the old ones. The decisive signal is a small structured difference.

The compression tax becomes an action risk.

Reliable agents therefore need several kinds of comparison simultaneously.

Semantic similarity for broad relevance.

Exact comparison for identifiers and amounts.

Temporal reasoning for what changed.

Graph structure for relationships.

Policy checks for authority.

Statistical anomaly detection for unusual patterns.

The intelligent workflow is heterogeneous.

This is why the future of agents is unlikely to be a single gigantic vector space where every decision becomes nearest-neighbor search. Vectors solve the candidate problem. Other representations solve other problems better.

The art is orchestration.

An agent should know when to search semantically, when to search exactly, when to query structured data, when to traverse a graph, when to run a program and when to ask a human.

That sequence looks increasingly like a new kind of operating system for knowledge work.

The model provides general reasoning and language.

Tools provide specialized capabilities.

Vector retrieval provides dynamic routing through tools, memories and information.

Policies constrain authority.

The environment returns evidence.

The loop continues.

This architecture changes the role of software catalogs and APIs.

Historically, a programmer had to know the interface before calling it. Documentation existed for the human developer. Agents make documentation executable in a new sense. A tool description can help determine whether the tool enters consideration at all.

Language becomes part of routing infrastructure.

This has consequences for how organizations describe their own systems.

Ambiguous documentation was always annoying for humans. For agents, it can distort capability discovery. Two services with overlapping descriptions may become semantically indistinguishable. A deprecated function may continue to be retrieved because its documentation is clearer than the replacement. A critical caveat buried in prose may not affect the tool embedding enough to prevent misuse.

Documentation quality becomes control quality.

The same is true for data catalogs. If an enterprise wants agents to discover the right datasets, the descriptions, provenance, ownership and usage constraints need to be legible both to humans and retrieval systems.

The organization has to make itself semantically navigable.

This is a hidden cost of agent adoption.

People talk about connecting agents to existing systems as if the software already contains a clean map of organizational capability.

Often it does not.

Services have duplicate names. Data lineage is unclear. Policies live in PDFs. Permissions are inconsistent. The one person who understands the workflow is retiring. Tool descriptions assume tribal knowledge.

An agent cannot retrieve what the institution cannot describe.

This connects Adjacency to a larger theme in the AI transformation: machine intelligence increases the value of institutional legibility.

When reasoning and action become cheap, ambiguity in the surrounding system becomes expensive.

The agent can call a hundred tools in an hour. That only helps if the tools have clear boundaries and dependable semantics.

The vector map can expose the institution's disorder by making it searchable.

Sometimes the system retrieves five near-duplicate policies because the company actually has five contradictory policies.

Sometimes the model confuses two tools because humans already confuse them.

Sometimes memory retrieval surfaces incompatible decisions because the organization never resolved them.

AI does not only automate the institution.

It audits the institution by trying to navigate it.

This may be one of the more productive side effects of agent deployment. Teams discover that the blocker is not model intelligence but undocumented state, bad metadata, inconsistent authority or systems nobody dares change.

The map reveals that the territory has no roads.

Agentic systems also make exploration cheaper.

A human analyst may perform one search, inspect several results and choose a path. An agent can branch. It can retrieve multiple neighborhoods, test several hypotheses, compare outputs and continue from the most promising branch.

Parallel search changes the economics of uncertainty.

If five plausible interpretations exist, the agent can investigate all five for a while rather than committing immediately to one.

Vector retrieval helps create those branches.

Instead of only taking the nearest result, the system can deliberately sample distinct regions of the candidate space. One candidate from the dominant cluster. One from a neighboring cluster. One unusual but plausible outlier.

This is how adjacency can support creativity rather than convergence.

The agent becomes less like a train following the nearest track and more like a scout sending expeditions into several nearby valleys.

This matters because autonomous systems can otherwise become relentlessly local.

Every step retrieves the nearest memory, nearest document, nearest tool and nearest precedent. The path compounds. A small early bias in representation determines the neighborhood, which determines the next query, which determines the next neighborhood.

The agent falls into a semantic basin.

Once there, all evidence appears to support the initial framing because the search path never leaves the region.

Humans know this as fixation or confirmation bias.

Agents can automate it at machine speed.

A robust agent needs ways to escape local neighborhoods.

Generate alternative framings.

Search for counter-evidence.

Retrieve distant analogies deliberately.

Ask which assumption, if false, would change the plan.

Use different embedding models or search modes for cross-checking.

Explore the graph rather than only the vector neighborhood.

These are computational forms of intellectual dissent.

They should become standard in high-value agent workflows.

The irony is that better search can make bad reasoning more confident if all the search stays inside one learned region.

The solution is not worse search.

It is search that understands the difference between exploitation and exploration.

This will be one of the defining design problems of autonomous intelligence.

An agent must exploit enough local structure to be efficient. It must explore enough alternative structure to avoid becoming brittle.

Too much exploration and the system wastes time, money and tool calls.

Too little and it repeats the first plausible idea with extraordinary persistence.

The optimal balance depends on stakes.

A low-cost formatting task should not launch five competing investigations.

A million-dollar procurement decision might deserve several independent paths.

A safety-critical diagnosis should actively search for disconfirming evidence.

Autonomy needs a budget for epistemic diversity.

This is where adjacency becomes strategy.

The map does not only tell the agent where things are.

The agent chooses how to travel.

Nearest first.

Broad sweep.

Diverse sampling.

Counterfactual search.

Historical precedent.

Novel region.

The traversal policy can matter as much as the representation.

Human intelligence has always been partly navigational. We learn where to look, whom to ask, which analogy is worth pursuing and when a familiar pattern is misleading. Expertise is not possession of every fact. It is efficient movement through a world of possible facts and actions.

Agents are acquiring a computational version of that skill.

The vector space gives them neighborhoods.

The next frontier is learning how not to become prisoners of the nearest one.
