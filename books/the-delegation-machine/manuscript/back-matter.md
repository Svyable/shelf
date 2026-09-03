# Notes on Terms and Sources

This book uses *delegation* broadly but not carelessly. The recurring structure is a principal placing some part of action, judgment, memory, observation, or authority in another actor or system while retaining some stake in the result. The legal relationship of agency is narrower. Calling a software system or language-model application an “agent” does not by itself make that system a legal agent, fiduciary, employee, public officer, or person. Where legal concepts such as actual authority, apparent authority, ratification, fiduciary duty, or principal-agent relationships appear, they are used first in their ordinary doctrinal or economic sense and then as structural comparisons. The comparison can illuminate a design problem without deciding its legal classification.

The same caution applies to historical analogy. An Egyptian steward is not a software process. Imperial civil examinations are not model benchmarks. A military chain of command is not an argument that companies should organize like armies. A surgical checklist is not a universal solution to AI reliability. A warehouse robot and a language model possess radically different capabilities. The book places them beside one another because each exposes a different control problem created by action at a distance: memory, authority, discretion, role, procedure, automation, interface, permission, evidence, or supervision.

The historical record itself is selective. Early administrative documents survive unevenly because clay, archives, institutions, excavation, collection, and scholarship determine what can still be read. Merchant correspondence tells us more about literate commercial networks than about people whose work left fewer records. State archives naturally preserve the view of administration more readily than the experience of everyone administered. The book uses surviving material as evidence of particular institutional practices, not as a claim that one surviving archive represents an entire society.

Several recurring terms deserve precision.

A *principal* is the party whose objective, resources, authority, or interests make the delegation meaningful in the local relationship. There can be several principals at once. An employee using a corporate AI system may act for themselves in one sense, the employer in another, and remain constrained by law, platform policy, professional duty, and other institutions. The word therefore identifies a relationship, not a sovereign actor.

An *agent* in the computing chapters means a system able to pursue a task through a sequence of actions, often by observing state and using tools. This remains an evolving product and research category rather than a single technical standard. A language model wrapped in a tool loop can display more operational agency than the same model in a text-only interface. The unit that matters for deployment is frequently the whole system: model, instructions, memory, tools, credentials, runtime, monitoring, and surrounding controls.

*Authority* is not the same as capability. A model may know how to perform an action and remain unauthorized to perform it. A service account may technically be capable of modifying a resource while organizational policy forbids the change. This distinction between what can be done and what may be done is one of the book’s central concerns.

*Discretion* describes the space in which a delegate can select among acceptable means without returning to the principal for every decision. Delegation becomes valuable when the delegate can absorb ordinary variation. Too little discretion turns the principal into a bottleneck. Too much unbounded discretion turns local problem solving into unintended sovereignty.

A *proxy* is a measurable or operational stand-in for a more complicated objective. Revenue can proxy for business success. ticket closure can proxy for customer resolution. a benchmark can proxy for capability. reward can proxy for desired behavior. Proxies are necessary because principals cannot directly observe everything they value. They become dangerous when optimization exploits the difference between the proxy and the intended objective.

A *receipt* in the later chapters means evidence of action generated under rules sufficiently independent from the agent’s own narrative that the evidence can challenge the narrative. The word includes ordinary receipts but also diffs, transaction records, test results, logs, signatures, timestamps, external state, approvals, and other artifacts. No receipt is infallible. The point is to avoid making the actor the only source for claims about its own success.

*Human in the loop* is treated as a description to be unpacked rather than a safety property. A human can only contribute meaningful oversight if the person has relevant information, sufficient time, authority to intervene, a usable control, and enough competence to improve the outcome. An approval click without those conditions can transfer responsibility without adding much control.

*Automation* is also used carefully. A deterministic scheduled process, a feedback controller, a warehouse robot, a generative assistant, and a tool-using language-model agent are not one category of system behavior. The book moves among them to track changes in what is being delegated. A traditional automated process often delegates a procedure. An agentic system can delegate some interpretation of what procedure should be used.

The research for the book follows a hierarchy reflected in the accompanying research file. For historical claims, preference goes to museum collections, archives, original documents where accessible, and reputable scholarship. Legal concepts are anchored in legal reference sources and primary doctrine where practical. Economic concepts are traced to original papers. Human-factors claims rely on agencies, accident investigators, peer-reviewed literature, or established research programs. Modern product claims are sourced to first-party documentation when the claim concerns what the company says its system does, then checked against government, independent, or academic material where the claim concerns safety, labor impact, or broader consequence.

Corporate sources require particular restraint. Amazon can authoritatively report that it acquired Kiva, how it describes its robotics program, and that it announced deployment of its millionth robot. Those claims do not independently establish the net effect of warehouse automation on worker well-being. OpenAI can document what its Agents SDK records or how its agent environment is designed. First-party documentation does not by itself prove general safety or social benefit. The research trail keeps product-description claims separate from external evidence and interpretation.

Productivity studies also have boundaries. Evidence that generative AI improved speed or quality on specific writing tasks, or raised measured productivity among customer-support workers in one deployment, does not imply the same effect across all jobs or over long time horizons. Different workers, tasks, incentives, models, organizational processes, and adoption choices can produce different results. Short-run productivity and long-run skill development are separate questions.

The aviation and vehicle-automation material is used to support a narrow proposition: partial automation changes the supervisory task, and reliable automation can create human-factors problems around attention, mode understanding, skill, and intervention. It is not evidence that every AI agent will produce the same failure modes as an aircraft or driver-assistance system. The analogy becomes useful where responsibility is shared dynamically between automation and a human operator.

The military material is narrower still. Mission-command doctrine is cited as a developed theory of decentralized execution under changing local conditions, particularly the relationship among intent, discretion, trust, and subordinate initiative. Nothing in the comparison imports military goals, ethics, hierarchy, or social organization into civilian agent design.

The WHO Surgical Safety Checklist appears because it demonstrates procedure as shared memory and communication rather than expertise replacement. Its implementation history also warns against reducing a safety practice to the visible artifact. A checklist that does not alter communication or authority can become theater. The same warning applies to AI systems surrounded by nominal reviewers that lack independent evidence or power.

OAuth, HTTP, zero-trust architecture, and Model Context Protocol appear as examples of delegated authority becoming structured through technical interfaces. Standards evolve. MCP in particular is a young and rapidly changing protocol ecosystem as of 2026. Claims about its current features belong to a point in time and should be checked against the latest specification before being treated as durable technical guidance.

The book deliberately avoids claims that current general-purpose AI agents possess human motives, stable selves, legal personhood, or inevitable desires for autonomy. None of those claims is necessary for the institutional argument. A system can create principal-agent-shaped problems through learned optimization, tool access, information asymmetry, and delegated authority without experiencing the relationship the way a human employee or steward would.

It also avoids the opposite simplification: that because models are software, ordinary software controls are sufficient. A language-model agent can interpret natural language, adapt across tasks, infer user intent, combine tools in novel sequences, and generate persuasive explanations. These capabilities alter the practical meaning of access control, monitoring, user approval, and interface design even when the underlying authorization primitives remain familiar.

Readers looking for one final architecture will therefore be disappointed in the useful way. The book does not propose a universal “delegation framework.” Different stakes require different institutions. A personal reading-list agent should not be governed like a medical system. A coding agent operating inside a disposable sandbox should not face the same approval process as one with production credentials. A warehouse robot has different failure boundaries from a conversational assistant. The point is to ask better questions before importing authority wholesale.

What is being delegated?

Which parts require discretion?

What can the delegate observe that the principal cannot?

What incentives or objectives differ?

Which actions are reversible?

Which authority is technically possible but institutionally illegitimate?

What evidence exists outside the delegate’s own report?

Which human can actually intervene, and at what time scale?

What authority can be delegated onward?

How does the mandate expire?

What happens when the metric diverges from the mission?

These questions are not a checklist to be mechanically completed. They are recurring lenses for a recurring relationship.

The oldest sources in this book record grain and instructions because human beings were already learning how to make action survive absence. The newest sources describe protocols and agent runtimes because we are extending the same ambition into systems that can interpret before they act.

The research trail beside this manuscript is meant to preserve the boundary between those facts and the argument built from them. Each chapter has a falsification note naming what would make the chapter’s useful claim too strong. The notes are not decorative caution. They are part of the book’s thesis.

A principal should never receive only the delegate’s polished story.

Neither should a reader.