# Jevons for Minds

The office of the future may spend more time thinking precisely because thought got cheaper.

That possibility sounds contradictory only if we imagine demand for intelligence as fixed.

It is not.

Most organizations are full of unperformed cognition. Decisions are made with rough estimates because careful analysis would take too long. Documents go unread. Alternatives remain unexplored. Customers receive generic treatment because personalization is expensive. Software ships with limited testing because edge cases compete for engineering time. Scientific teams abandon hypotheses that are too costly to investigate. Managers sample a few cases rather than inspect them all.

The unmet demand is enormous and mostly invisible.

Human attention has acted as a rationing mechanism. We do not notice the missing analysis because nobody receives a bill for the question that was never asked.

Machine intelligence exposes that latent demand.

If the first-pass cost of analysis falls by a factor of one hundred, an organization can spend more total resources on analysis while paying far less per analysis. The same pattern that worried Jevons in coal appears in cognition: efficiency lowers effective cost, lower cost expands use, expanded use can exceed the original savings.

Call it Jevons for minds.

The analogy should be handled carefully. Intelligence is not a fuel. A model query is not a ton of coal. Rebound in energy use has a technical literature with multiple definitions and empirical estimates. Cognitive rebound is a broader economic pattern rather than a measured universal coefficient.

The mechanism is still worth naming because it changes how we think about AI efficiency.

A model developer reduces the energy required to produce a given quality of answer. Excellent. If usage stayed constant, electricity consumption would fall.

Usage does not stay constant.

The provider lowers prices. Applications that could not afford the old model adopt the new one. Existing users call it more often. Developers increase context windows. Agents retry failed tasks. Companies offer AI features to millions of users by default. A workflow that once requested one answer now asks several models, runs a verifier and revises the result.

The useful output improves. Total compute can rise.

This is not a failure of efficiency.

Efficiency is what made the expansion possible.

The same distinction appears in economics between doing the old activity more cheaply and creating new activity. Cheap computation produced digital photography, real-time navigation, video streaming and search at scales that would have been absurd under earlier hardware costs. Nobody should conclude that transistor efficiency was pointless because global computing demand rose.

The real question is whether the expanded activity creates value worth its physical and social cost.

That is where cognitive rebound becomes interesting.

Some new uses will be obviously beneficial. Continuous monitoring can catch equipment failures. Personalized accessibility tools can help people communicate. More scientific search can identify promising experiments. Better translation can connect markets and communities.

Some new uses will be rent-seeking.

If AI makes it cheap to generate legal objections, lobbying submissions, advertising variants, fake reviews, job applications or low-quality content, organizations on the receiving side may spend more resources filtering the flood. Intelligence has not disappeared. It has been redirected into a contest.

Cheap cognition can create cognitive arms races.

Spam versus filters is the cleanest example. One side automates message generation. The other automates classification. Each improvement on one side invites a response on the other. Social value may remain small even as compute usage grows.

Finance contains similar dynamics. Better trading algorithms improve execution for participants but can also intensify competition for tiny advantages. A faster market can allocate capital more efficiently while spending enormous resources on latency races whose social benefit is contested.

Advertising can become more personalized while consumers become more sophisticated at ignoring it.

Cybersecurity is inherently adversarial. Attackers automate discovery and persuasion. Defenders automate detection and response. More intelligence is valuable because the opponent also has more intelligence.

The energy cost of AI therefore depends partly on the games society allows it to play.

This is a value-design problem, not just a chip-design problem.

If every company deploys an agent to negotiate with every other company's agent, enormous volumes of machine-to-machine cognition may occur in the background. Some of it can reduce transaction costs. Some may become strategic noise: endless dynamic pricing, automated contract revisions, bidding, counterbidding and compliance responses.

The institutional rules determine whether the machine negotiation converges productively or becomes computational bureaucracy.

Human bureaucracy already provides a warning.

Organizations often create procedures in response to other procedures. A reporting requirement creates a team to prepare the report. The report creates a review process. The review creates remediation plans. Each layer is locally rational. The system can become expensive and slow.

Automation can reduce this burden by processing documents cheaply.

It can also permit more rules because enforcement becomes cheap.

A government that could manually audit one percent of transactions might audit all of them with AI. A company that could review a sample of employee communications might review everything. An insurer can request more evidence because extraction is automated. A platform can enforce more granular policies.

Cheap intelligence increases state capacity and corporate capacity.

Capacity creates temptation.

A rule that would have been too expensive to administer becomes feasible. Whether that is good depends on the rule.

This is Jevons for governance.

Lower the cost of enforcement and society may enforce more.

The result could be safer products, less fraud and faster benefits processing. It could also be suffocating compliance and surveillance. Again, the technology does not choose the objective.

Scientific research offers a more hopeful rebound.

A laboratory has limited physical throughput. If models can generate hypotheses, analyze literature and design experiments cheaply, the number of proposed experiments can explode. The bottleneck moves to equipment, samples, ethics review, technician time and replication.

This can improve science if intelligence ranks experiments better.

It can slow science if researchers drown in plausible hypotheses.

Selection becomes more valuable than generation.

The same is true in engineering. Generative design systems can produce thousands of candidates. The hard part becomes specifying constraints, simulating accurately, selecting robust designs and physically testing them.

The intelligence stack grows a search tree.

Search has a branching factor.

A human designer may consider five alternatives because time is scarce. A machine can consider five thousand. If evaluating each candidate is cheap, the wider search can improve results. If evaluation is expensive, generation outruns validation.

This is one reason verified environments matter so much for AI.

Code is unusually friendly because a program can often be executed against tests. Mathematics can sometimes be checked formally. Games provide clear rules. In these domains, cheap generation can be paired with cheap verification.

Open-ended social decisions are harder. There is no unit test for a good urban plan, hiring decision, foreign policy or childhood.

When verification is expensive or contested, more candidate generation can increase confusion.

This suggests a practical hierarchy for the value of cheap intelligence.

The highest-return uses often have fast, reliable feedback. Generate, test, select. The machine can explore more because reality or a verifier rejects bad options cheaply.

The riskier uses have delayed or ambiguous feedback. Generate a business strategy and years may pass before the outcome is known. Generate a policy and causality becomes entangled with everything else. Generate personalized persuasion and the metric may reward engagement while harming welfare.

Cheap search without good feedback can scale error.

Energy history has the same structure.

A cheap source of power is most useful when connected to a process that converts it reliably into desired output. Burn fuel in a well-designed turbine and we understand the conversion. Pour cheap energy into a badly designed system and more power magnifies waste.

Intelligence is power for search.

More search is valuable when the objective and feedback are good.

This becomes especially important with autonomous agents.

A conventional model call is bounded by a person. Ask, receive, stop. An agent can continue. It can plan, call tools, inspect results, retry, delegate to subagents and run until a stopping rule is satisfied.

Autonomy converts one human request into a variable amount of machine cognition.

The user may not know how many operations occurred beneath the interface.

This makes cost control an architectural problem.

An agent attempting a difficult task can spend more resources if the expected value justifies it. That is useful. A system with a poor stopping rule can churn. If millions of agents operate continuously, small inefficiencies become infrastructure demand.

The market will push toward budgets, routing and verification.

How much is this task worth? Which model should attempt it? How many retries? When should the system escalate to a human? When is an approximate answer sufficient?

These are economic questions embedded in software.

The agent needs a value model.

This is a profound convergence. Software systems will increasingly decide how much intelligence to spend on a task based on expected value, latency and reliability. They will become tiny capital allocators for compute.

A simple request may go to a cheap model. A consequential task may trigger deeper reasoning, multiple checks and human review. The application becomes a market maker between value and intelligence.

Energy sits underneath as the settlement layer.

Every additional reasoning step consumes compute. Every retry has a physical cost. At small scale the cost is negligible. At planetary scale, software architecture becomes energy policy.

This is why the most important AI efficiency innovations may be invisible to users.

A company that improves routing, caching or verification can reduce compute without making the model itself look more capable. Better stopping rules can save enormous resources. Smaller specialized models can handle routine work. On-device processing can reduce data-center demand for some tasks.

The economic incentive is strong because electricity and hardware are real costs.

Competition tends to attack waste.

Rebound then reinvests part of the savings into more use.

This creates an optimistic loop if the new use produces value. Intelligence becomes cheaper, so society spends more of it on science, health, accessibility, education, design and maintenance. Those applications improve energy efficiency and productivity, making more resources available for further intelligence.

It can create a darker loop if the new use is adversarial or extractive. Cheaper persuasion produces more manipulation. Cheaper surveillance produces more monitoring. Cheaper cyber offense produces more attacks. Each defensive response consumes more intelligence and energy.

The difference is institutional.

We should therefore resist treating AI energy demand as a purely technical side effect of model capability. Demand is shaped by what business models reward, what laws permit, what users tolerate and what society chooses to automate.

A platform optimized for engagement may generate more personalized content than a subscription product optimized for user outcomes. An insurance system rewarded for catching every anomaly may produce more scrutiny than one penalized for false positives. A legal system that allows essentially costless machine-generated filings may face a different computational burden from one that prices or sanctions abuse.

Rules shape rebound.

Energy policy has learned this lesson through efficiency standards and rebound debates. Improving efficiency is valuable, but if the policy objective is emissions reduction, the carbon intensity of energy supply and total demand still matter.

AI policy needs the analogous distinction.

Improving inference efficiency is valuable. If the objective is reducing electricity demand, efficiency alone may not achieve it. If the objective is maximizing social value per unit of electricity, the composition of workloads matters.

A million medical inferences and a million synthetic spam messages are not equivalent because they consume the same energy.

The value ledger must enter the calculation.

This sounds uncomfortable because governments are bad at deciding which speech or computation is socially valuable. The answer is not a ministry of useful queries.

Markets, prices, law and user choice can do much of the filtering.

The key is to make resource costs visible enough that users and providers have incentives to economize where value is low, while protecting rights and addressing externalities where market prices are incomplete.

Cheap intelligence will not remain cheap if every task receives unlimited reasoning.

Scarcity reappears through budgets.

That may be healthy.

A civilization with abundant cognition still needs to decide where to spend attention, electricity, chips and time.

The ultimate Jevons paradox of intelligence may be cultural rather than electrical.

We may become surrounded by more answers while feeling a greater shortage of judgment.

The machine can generate another possibility. Then another. Then another.

At some point someone has to decide which future is worth the energy of making real.

Jevons himself is useful here because the historical claim is narrower and messier than the slogan his name has become. In *The Coal Question* in 1865, he was writing about a Britain whose industrial strength depended heavily on coal. More efficient steam engines lowered the amount of coal needed for a unit of useful work, but they also made steam power economical in more places and processes. Jevons feared that efficiency would expand the industrial field of coal faster than it reduced coal use per task.

The last century and a half did not turn that intuition into a universal conservation law for demand. Rebound varies by technology, market, time horizon and level of analysis. Reviews of the energy literature have repeatedly found that the strongest version of the paradox—efficiency improvements always causing total energy use to rise—is too confident. The evidence for full “backfire” is difficult to establish. At the same time, economy-wide rebound can be large enough that engineers who count only the direct savings from a more efficient device can badly overstate the eventual reduction in energy use.

That uncertainty is exactly why the analogy to cognition is useful.

The question is not whether there is a magic rebound percentage for tokens. There is not. The question is what becomes economically possible after the effective price of a useful unit of cognition falls.

The early cost curve gives us a glimpse. Stanford's 2025 AI Index compared models at a fixed performance threshold rather than simply comparing newer, better systems with older, weaker ones. At roughly GPT-3.5-level performance on MMLU, the reported price fell from about twenty dollars per million tokens in November 2022 to seven cents by October 2024. That is a reduction of more than 280 times in roughly eighteen months. The same report found rapidly improving hardware price-performance and energy efficiency.

A 280-fold cost decline is not merely a discount. It changes the set of things a rational person would consider doing.

At twenty dollars per million tokens, a developer notices every sprawling prompt and repeated call. At seven cents, many applications stop treating inference as a precious event. They classify every item rather than a sample. They summarize every meeting. They generate variations automatically. They let an agent retry. They run background checks the user never explicitly requested. The unit cost disappears into the product experience.

Then capability itself creates a second rebound. The 2025 AI Index highlighted test-time reasoning systems that traded more inference work and latency for better results on difficult tasks. This means progress can move in two directions at once: cheaper computation for a fixed capability and more computation spent to buy a higher capability. The cheapest answer becomes dramatically cheaper while the frontier answer may deliberately consume more reasoning.

That is not contradictory. Airlines sell economy seats and private aviation in the same civilization.

The software architect now chooses a cognitive service level. A routine extraction task may run on a small model. A medical, legal or engineering workflow may justify a more expensive system, multiple independent passes and verification. A coding agent can spend ten times more compute if doing so avoids ten hours of human debugging. The relevant denominator is no longer tokens. It is the value of the completed task.

This creates a measurement problem for energy forecasts. Counting average energy per query can improve while total energy demand rises because queries become more numerous, agents become longer-lived and high-value workloads become deeper. Counting total data-center load reveals the physical result but says little about whether society received one trillion trivial completions or one million consequential discoveries. Neither metric is enough by itself.

The three ledgers have to remain separate long enough to be useful.

Energy tells us the physical cost. Intelligence tells us the search or decision capability purchased. Value tells us why anyone was willing to pay for the exchange.

Confusing the ledgers produces two symmetrical mistakes. The first is to celebrate every efficiency gain as if it must reduce total resource demand. The second is to condemn rising resource demand as if it proves efficiency failed. A more efficient system can consume more in total because it became more useful. A less efficient system can consume less because nobody wants it.

The welfare question sits elsewhere.

Consider a hospital that can afford to run a model over every radiology report, pharmacy order and discharge instruction. Total inference use rises sharply. If the system catches dangerous interactions, improves follow-up and reduces preventable readmissions, the rebound is the mechanism by which efficiency becomes social value. Now consider a marketplace in which sellers generate millions of near-identical listings and the platform deploys models to deduplicate them. Compute rises on both sides and much of the expenditure simply restores a usable signal-to-noise ratio.

The same cost curve permits both futures.

This is why institutional design belongs inside an energy-and-AI discussion. Rate limits, pricing, liability, verification requirements, identity systems, anti-spam rules and product incentives all influence how cheap cognition is spent. They do not determine the number of floating-point operations directly. They determine which games make those operations profitable.

There is an additional rebound that does not show up on the electricity meter at all. When first-pass intellectual work becomes cheap, humans can raise their standards. A manager who once accepted a rough memo may now expect scenario analysis. A customer who once tolerated a generic answer may demand personalization. A programmer who once shipped after a limited test suite may be expected to test far more states. The baseline of adequacy moves.

Cheap intelligence can therefore create more work by changing what counts as enough.

That pattern is familiar from other technologies. Faster communication did not empty inboxes. Better cameras did not reduce the number of photographs. Cheap storage did not persuade organizations to keep less data. In each case a resource became inexpensive enough that behavior reorganized around abundance. Eventually a new scarcity—attention, curation, trust, retrieval—appeared above it.

The likely scarce complement to cognitive abundance is judgment under consequence. Somebody or something must decide how far to search, which result to trust, what objective to pursue and when another increment of reasoning is no longer worth its cost.

That stopping decision is where value re-enters the machine.

Jevons for minds is therefore less a warning against efficiency than a warning against static imagination. When the cost of thought falls, do not ask only how much money or electricity the old workflow saves. Ask what new workflows appear, which old standards rise, which adversarial games intensify and which physical bottlenecks inherit the pressure.

Efficiency does not end demand.

It edits the menu.