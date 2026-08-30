# The Falling Cost of Delegation

There is a price hidden inside every request.

Ask a colleague to check a number and the price is not the five minutes required to check it. The price includes noticing who might know, interrupting that person, explaining the context, transferring the file, clarifying what “check” means, waiting, answering a follow-up question, reading the response, and deciding whether you trust it.

Ask a contractor and the list grows. Find the contractor. Describe the job. Agree on scope. Negotiate a price. Share access. Sign something. Monitor progress. Review the work. Pay the invoice.

Ask nobody and the cost can be lower.

That is why so many useful things are never done.

Economics has a language for some of this friction. Ronald Coase became famous for insisting that exchange itself is not free. Prices must be discovered. Agreements must be negotiated. Performance must be monitored. Disputes must be handled. The existence of these transaction costs helps explain why economic activity is organized in the peculiar mixture we call a modern economy: some work is purchased through markets, some is directed inside firms, some is automated, some is done informally, and some is abandoned because organizing it costs more than the result is worth.

Delegation has its own transaction costs.

They are so ordinary that managers rarely record them.

A task takes twenty minutes to perform and ten minutes to explain, so a capable employee does it herself.

A request could save a thousand dollars, but no one knows which department owns it.

A founder knows that a dozen customer interviews would be useful but does not have time to schedule and summarize them.

An analyst could check every source in a report but checks the most important five because the rest would consume the afternoon.

A household could compare every insurance renewal, subscription, tax notice, utility plan, and medical bill, but life is short.

The economy is full of work that fails a quiet test:

Is this worth the trouble of having someone else do it?

Agents can change the answer even before they become spectacular.

The threshold matters more than the headline capability.

Suppose a task is worth twenty dollars to you. A human expert can do it perfectly, but finding, briefing, and paying the expert costs fifty dollars. The task remains undone.

A software workflow could do it for two dollars once built, but creating the workflow costs ten thousand dollars. If the task occurs only a hundred times, the automation remains uneconomic.

Now imagine an agent that can perform the task for six dollars in compute and service fees, plus three dollars worth of expected review time and error. It is worse than the expert. It is less efficient than custom automation at large scale. It still wins because it fits the size and irregularity of the problem.

This middle territory is enormous.

It sits between things important enough to deserve a person and things repetitive enough to deserve software.

For decades, organizations have filled it with interns, assistants, business-process outsourcing, spreadsheets, heroic employees, forgotten tickets, and the phrase “we should really get around to that.”

Agentile systems are arriving in the middle.

This helps explain why measuring them is difficult.

The easiest productivity study holds the work constant. Give one group a tool, leave another group without it, compare output or time. These studies are valuable because they reveal something real about the effect of a technology on a defined task.

In customer support, Erik Brynjolfsson, Danielle Li, and Lindsey Raymond studied the rollout of a generative AI assistant across thousands of agents. The tool increased issues resolved per hour on average, with especially large gains for newer and lower-skilled workers and much smaller effects for the most experienced workers. Other experiments have found gains on some writing and consulting tasks. The broad lesson is not that AI always raises productivity. It is that the effect depends heavily on the worker, the task, and where the technology sits relative to the frontier of competence.

The counterexample is just as important.

In a randomized study of experienced open-source developers working in repositories they already knew, METR found that early-2025 AI tools made the developers slower. The participants expected to become faster. Even afterward, they believed the tools had helped. The measured result went the other way.

This is exactly the kind of finding a serious account of agentile economics needs.

A technology can lower the cost of delegation in one setting and raise it in another.

The reason is easy to imagine.

If the task is difficult to explain, the briefing cost rises.

If the agent lacks context, retrieval cost rises.

If the output is hard to verify, review cost rises.

If errors are subtle, expected failure cost rises.

If the human is already fast, the opportunity for assistance shrinks.

If interacting with the agent interrupts a well-developed expert workflow, the coordination overhead may exceed the execution saved.

Delegation is not free merely because the delegate is synthetic.

The useful economic quantity is the all-in cost of causing a reliable result.

That cost includes at least four things: instruction, execution, verification, and correction.

The agent may make execution extraordinarily cheap while making verification more expensive.

It may also reduce instruction cost.

This is one of the stranger features of language-model agents. Human language can function as a temporary programming layer.

Traditional software requires a person to translate intention into a structure the machine can execute. Someone specifies fields, states, branches, schemas, functions, tests, and interfaces. This translation is worthwhile when a process repeats often enough.

Human delegation uses a different compression system.

“Please take care of the catering for Thursday. About thirty people, a few vegetarians, nothing messy because we’ll be standing, stay under the usual budget.”

A capable assistant receives a surprisingly small amount of explicit information. The instruction works because both parties share background knowledge about Thursday, catering, thirty people, dietary restrictions, mess, standing, budgets, the organization, and what “take care of” normally includes.

The missing specification lives in culture and common sense.

Language models make a portion of this interface available to software.

That is a profound reduction in instruction cost.

A person who could never write a procurement workflow can describe the objective. A manager who would not build a database integration can ask for records to be compared. A researcher who would not write a crawler can ask an agent to gather a small set of public documents.

The translation from goal to procedure moves partly into the machine.

Again, this does not make the result reliable by default. Natural language is ambiguous. People omit constraints because other people would infer them. A system may infer differently. The more consequential the task, the more of the hidden specification must become explicit.

But the threshold still moves.

The history of computing can be read as a long reduction in the cost of telling machines what to do.

Early computers demanded instructions in forms close to the hardware. Higher-level languages let programmers express more abstract operations. Spreadsheets let office workers program calculations without thinking of themselves as programmers. Graphical interfaces replaced many commands with visible actions. Search engines let a person state an information need in a few words. Generative models widened the range of intentions that could be expressed in ordinary language.

Agents add persistence to the language interface.

The request does not merely produce an answer.

It can produce a sequence.

That turns instruction cost into an economic variable worth watching.

Imagine a manager with one hour.

She can perform a task herself in forty minutes.

She can delegate it to a colleague, but explaining the context and checking the result will consume twenty-five minutes of her time, while also consuming the colleague’s time. Delegation creates leverage, but not much.

If an agent can absorb the same briefing in three minutes, work independently for twenty minutes of machine time, and return a result that takes five minutes to check, the manager spends eight minutes.

The labor saved is not the machine’s twenty minutes.

It is the thirty-two minutes of principal attention released.

This is why agents will be valued by busy people before economists can agree on their aggregate productivity effect.

The scarce resource at the top of many organizations is not raw labor hours. It is attention from people whose judgment is demanded by too many things.

A chief financial officer does not need a faster calculator. She needs fewer matters to reach her desk in unfinished form.

A principal investigator does not need another source of text. She needs someone to chase citations, normalize files, test obvious alternatives, and return with the unresolved questions.

A founder does not need more ideas. He needs more of the small necessary sequences between deciding and knowing.

Delegation buys distance from the sequence.

The price of that distance determines how much of it people purchase.

When the price falls, behavior changes in at least three ways.

First, tasks move from self-performance to delegation.

Second, tasks move from abandonment to execution.

Third, tasks become more granular.

The third effect is easy to miss.

Human organizations bundle work partly because assigning tiny tasks is annoying.

A manager does not create a job called “check whether twelve invoices use the current tax rate.” The work gets attached to accounting.

A law firm does not hire a person whose only duty is to compare one definition across seven contracts arriving unpredictably. The task gets absorbed by associates or paralegals.

A family does not retain a benefits specialist to inspect three medical claims each year. Someone deals with them after dinner.

Bundling is an adaptation to delegation cost.

If delegation becomes cheap, work can be unbundled.

This resembles what happened when computing became cheap enough to apply to smaller and smaller problems. Mainframes were justified by large institutional workloads. Personal computers brought computation to individual desks. Smartphones put substantial computing power against errands too small to deserve a computer of their own. Cloud services let companies use tiny slices of infrastructure on demand.

Agentile capacity can produce a similar granularity shift in administrative cognition.

The agent does not need a full-time role.

It needs a bounded errand.

That matters for labor analysis because jobs are bundles and technologies encounter tasks.

A single occupation can contain work that is easy to delegate, work that is difficult to delegate, and work that becomes more valuable precisely because other pieces are delegated.

The accountant may spend less time classifying transactions and more time investigating anomalies.

The developer may spend less time writing ordinary glue code and more time deciding architecture, reviewing changes, and understanding unfamiliar failures.

The marketer may produce routine variants cheaply and spend more time choosing positioning.

The manager may delegate information gathering and spend more time making uncomfortable decisions.

Or the organization may simply demand more output.

The direction is not predetermined.

Lower delegation cost is a force, not an outcome.

This distinction protects us from two lazy predictions.

The first is that agents must eliminate jobs because they perform tasks.

The second is that agents cannot matter because people remain necessary.

Both confuse a changing input price with the final equilibrium.

When transportation gets cheaper, society does not merely employ fewer wagon drivers. Locations change. Supply chains change. Commuting changes. Retail changes. Tourism changes. Cities change.

When communication gets cheaper, society does not merely employ fewer messengers. Firms expand their geographic reach. Families maintain distant relationships. Financial markets speed up. Customer service moves across borders. Entire businesses become possible because coordination can occur at a distance.

If delegation gets cheaper, the effects can spread through organizational design.

People can supervise more projects.

Small firms can attempt functions once reserved for larger ones.

Large firms can inspect more exceptions.

Specialists can serve smaller clients.

Customers can negotiate more actively.

Software systems can initiate work for other software systems.

The total volume of delegated action can rise even if the cost per action falls.

This is one reason the phrase “AI saves time” is incomplete.

Saved time is not stored in a warehouse.

It is spent.

A support worker who resolves cases faster may receive more cases.

A programmer who generates code faster may be assigned more features.

A founder who delegates operations may start another product.

A regulator who can inspect filings cheaply may inspect more filings.

A consumer who can compare offers instantly may compare more offers and switch more often.

Productivity gains become demand for something else.

Sometimes that something else is leisure.

More often in competitive institutions, it is more work.

The rebound can be especially strong when the old cost prevented the task entirely.

If reviewing every customer conversation once required a massive quality team, a company sampled a few calls. If an agent can review all of them cheaply, the company does not necessarily shrink the quality function. It may create a much larger stream of detected issues, coaching opportunities, policy violations, and product insights.

The same reduction in delegation cost that removes one queue can generate another.

This is why Chapter 6 will return to queues.

For now, the important point is simpler: a fall in delegation cost expands the feasible set.

Some of the newly feasible work will be valuable.

Some will be surveillance.

Some will be bureaucracy.

Some will be experimentation.

Some will be spam.

The technology itself does not rank these uses.

Markets and institutions will.

There is another reason to focus on cost rather than capability.

Capability headlines move quickly.

A benchmark result is surpassed. A model becomes cheaper. A tool improves. An agent works longer without intervention. The exact frontier is unstable.

The economic mechanism is more durable.

Whenever the combined cost of instruction, execution, verification, and correction falls below the value of a task, that task becomes a candidate for delegation.

Write it as a threshold rather than a slogan.

A task happens when its expected value exceeds the cost of causing it to happen.

Agents matter because they can lower one or more terms in that cost.

They can lower instruction cost by accepting natural language and messy context.

They can lower execution cost by using scalable computation.

They can lower coordination cost by crossing tools and handling intermediate steps.

They can sometimes lower verification cost by producing logs, citations, tests, and structured evidence.

They can also raise any of these costs when they misunderstand, hallucinate, over-act, or require painstaking review.

There is no law that the sum must fall.

There is only intense competitive pressure to make it fall.

That pressure will shape the industry.

Model providers will compete on intelligence, but agent platforms will also compete on the boring machinery around intelligence: context loading, permissions, memory, tool reliability, observability, recovery, identity, and evaluation.

The winning system may not be the one that writes the cleverest answer.

It may be the one that makes a manager comfortable saying, “Handle this,” and walking away.

That sentence contains an enormous amount of economics.

Walking away is the product.

A person who must remain beside the machine has purchased assistance.

A person who can leave and return to completed work has purchased delegation.

The difference is measured in recovered attention.

This also explains why reliability requirements rise as delegation deepens.

When a human is actively driving, a bad suggestion can be ignored.

When the human has walked away, a bad decision can trigger another bad decision.

The value of independence and the cost of error rise together.

That relationship prevents delegation cost from collapsing to inference cost alone.

Compute can become almost absurdly cheap and still leave expensive agency.

Trust has a price.

Verification has a price.

Insurance has a price.

Permissions have a price.

Reversibility has a price.

An agent that can perform a five-dollar task for five cents but requires ten dollars of review has not transformed the task.

An agent that costs a dollar but can be trusted within a narrow boundary might.

The practical race is therefore to make reliable delegation cheap, not merely generation cheap.

This is where the agentile economy will separate from the chatbot economy.

Chatbots made answers inexpensive.

Agents aim to make completed errands inexpensive.

Answers are useful. Errands touch systems.

The second category reaches more deeply into the structure of firms because errands consume coordination.

And coordination is everywhere.

Coase’s great insight was that the economy is not a frictionless field of contracts. We construct firms, rules, hierarchies, and institutions partly because coordinating through markets has costs.

Agentile systems do not abolish those costs.

They alter them.

They may make it cheaper to specify work.

Cheaper to search.

Cheaper to monitor.

Cheaper to compare.

Cheaper to switch.

Cheaper to create a temporary specialist.

Cheaper to supervise a larger set of activities.

Cheaper to ask the question that was not quite worth asking yesterday.

Once enough of those prices change, the organizational landscape changes with them.

That is the deeper story.

There is a useful way to think about this change without pretending we can measure it cleanly yet.

Some tasks have high delegation elasticity.

Lower the cost a little and the quantity delegated rises sharply.

Travel planning is a simple example. People already know that comparing forty hotels, checking cancellation rules, mapping travel time, reading recent reviews, and looking for schedule conflicts could improve a trip. They do not perform all of those checks because the expected improvement is smaller than the attention required. Make the process cheap enough and the number of comparisons expands.

Procurement has the same property. A small business may renew a service at the quoted price because reopening the market for a two-thousand-dollar annual contract is not worth a manager’s morning. Lower the search and comparison cost and suddenly more renewals become negotiations.

Research has it too. A writer may stop after finding six credible sources because the seventh is unlikely to change the argument enough to justify another hour. If an agent can cheaply search the long tail and return only contradictory evidence, the rational stopping point moves.

Other tasks have low delegation elasticity.

No matter how cheap the planning becomes, a bridge still requires concrete, steel, land, permits, equipment, and time. A hospital may automate scheduling without creating another operating room. A court may reduce clerical delay without creating another judge. An agent can prepare a difficult conversation without conducting the human relationship that makes the conversation matter.

This variation tells us where the first large effects are likely to appear.

Agentile systems are strongest where the work is information-rich, tool-accessible, decomposable, reversible, and bottlenecked by attention rather than atoms.

They are weaker where the expensive part is physical capacity, irreversible authority, embodied skill, deep tacit context, or social legitimacy.

Even within one organization, both regimes coexist.

A construction company can use agents to analyze bids, reconcile drawings, schedule crews, draft notices, compare supplier terms, and monitor documentation. It cannot prompt a concrete slab into existence.

A hospital can use agents to assemble charts, draft forms, route messages, check codes, and prepare patient instructions. It cannot turn one intensive-care bed into three.

A government can use agents to explain rules, inspect applications, translate documents, and identify inconsistencies. It cannot make a contested political choice legitimate merely by calculating faster.

The falling cost of delegation therefore reveals the remaining costs more clearly.

That can be economically productive and politically uncomfortable.

When paperwork no longer explains the delay, the shortage becomes visible.

When search no longer explains the bad purchase, bargaining power becomes visible.

When analysis no longer explains indecision, responsibility becomes visible.

When execution no longer explains a failed strategy, judgment becomes visible.

Cheap delegation removes alibis.

It also changes bargaining positions.

A person who can cheaply compare alternatives is harder to overcharge.

A worker who can cheaply test an employer’s claim has more informational leverage.

A buyer who can invite and evaluate many bids can pressure margins.

A seller who can personalize proposals to thousands of buyers can pressure attention from the other direction.

Lower transaction costs do not automatically distribute power evenly. They arm both sides, and the side with better data, cheaper compute, stronger access, or control of the platform may benefit more.

This is another reason not to confuse abundance with equality.

Delegation can become cheap while authority remains concentrated.

Millions of small agents may run on infrastructure owned by a handful of providers. A small business may gain operational capacity while becoming dependent on model vendors, identity systems, cloud platforms, payment networks, and proprietary data.

The price of delegation can fall locally while the rent for supplying delegation rises globally.

We will return to ownership later because it determines who captures the surplus created by this new force.

For now, the key is to see the mechanism before the distribution.

A falling price changes behavior.

The price of delegated cognition is beginning to fall.

The economy has barely started deciding what to buy with it.

The first-order question asks what an agent can do.

The second-order question asks what becomes worth doing because an agent exists.

The second question is where economies reorganize.
