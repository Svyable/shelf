# The Cost of a Thought

A model answer arrives without smoke.

This is one reason computation feels immaterial. The user types a question. Words appear. There is no visible fuel, motion or exhaust. The machine may be thousands of kilometers away. The electricity bill belongs to someone else. The chips are hidden behind an interface designed precisely so that the user does not have to think about them.

The abstraction is excellent.

It is also beginning to distort public intuition.

Every computation has a physical cost. Transistors switch. Memory moves data. Networks transmit it. Power supplies convert electricity. Cooling systems remove heat. Chips are manufactured through enormously complex industrial processes. Servers are replaced. Buildings occupy land. Backup systems sit ready for failures that may never occur.

The useful question is not whether AI “uses energy.” Everything physical does.

The useful question is how much valuable intelligence we obtain from the energy, capital and materials required to produce it—and how that conversion changes as the technology improves and demand expands.

Start with the distinction between energy and power.

Energy is accumulated work over time. Electricity consumption is commonly measured in watt-hours, kilowatt-hours, megawatt-hours or terawatt-hours. Power is the rate at which energy is used or produced, measured in watts, kilowatts, megawatts or gigawatts.

A data center can have an annual energy consumption that looks manageable in a national total and still create a severe local power problem because it demands hundreds of megawatts continuously at one connection point. A grid planner must care about both.

This distinction explains why percentages can mislead.

The International Energy Agency estimated that data centers consumed around 415 terawatt-hours of electricity globally in 2024, roughly one and a half percent of global electricity demand. At a planetary scale that share is significant but not dominant. The same report projected consumption rising to around 945 terawatt-hours by 2030 in its base case, with large uncertainty around efficiency, AI adoption and energy bottlenecks.

“Only a few percent of global electricity” can therefore coexist with “a very large local infrastructure challenge.”

Both statements can be true.

Electric grids are not globally fungible pools. A megawatt in Quebec cannot instantly solve a shortage in Virginia. Transmission is finite. Permitting is local. Generation mixes differ. Weather differs. Industrial demand differs. The geographic concentration of data centers can make their regional impact much larger than their global share.

This is the first accounting rule for the cost of a thought: always ask where the denominator lives.

The second is to separate training from inference.

Training creates or updates a model by processing large amounts of data through repeated computation. Frontier training runs can require enormous clusters of accelerators operating for extended periods. Inference uses the trained model to generate outputs for users or downstream systems.

Public discussion initially focused on training because a single large training run is easy to imagine as an exceptional event. But a widely used model may serve enormous inference volume over its lifetime. As models move into search, coding, productivity software, education, customer service and agents, repeated use can become the larger energy story.

The balance is dynamic.

Training can become more expensive as developers push frontier scale. Inference can become more efficient through hardware and software optimization. Model architectures can change. Distillation can move capability into smaller systems. Users may shift some workloads onto local devices. Reasoning systems may use more tokens per difficult problem. Agents may perform many hidden calls for a task that appears to the user as one request.

There is no timeless “energy cost of an AI query.”

The cost depends on model, hardware, utilization, data movement, output length, batching, cooling, location and the larger system around the request. Public estimates that assign one universal number to a prompt are usually more useful as illustrations than as constants.

This uncertainty should not become an excuse for refusing to measure.

Operators measure because they have to pay the bill.

Data centers use metrics such as power usage effectiveness, which compares total facility energy with the energy used by IT equipment. A perfectly efficient facility under that measure would have little overhead beyond the computing equipment itself. Real facilities consume additional energy for cooling, power conversion and other infrastructure.

PUE can improve and still tell only part of the story.

A facility with excellent cooling efficiency can host inefficient workloads. A highly efficient chip can be underutilized. A model can consume more computation than necessary for a task. An algorithmic improvement can save more energy than a cooling improvement. Moving computation closer to users can reduce network latency while changing utilization and hardware efficiency.

The energy stack mirrors the value stack.

Efficiency can improve at the facility, hardware, model, software and workflow layers. The best layer to optimize depends on what is scarce.

This is why the word “compute” can conceal as much as it reveals.

A floating-point operation is not a unit of intelligence. More computation can improve capability, but the relationship depends on architecture, data and algorithm. Two models can use different amounts of compute for the same useful result. A model can score better on benchmarks while being worse for a particular business task. A larger system may be justified for frontier scientific reasoning and ridiculous for classifying a simple email.

The economically meaningful unit is useful outcome.

How much energy and capital does it take to solve the problem to the reliability required?

This is where software becomes energy technology.

A routing system that sends easy questions to a small model and hard questions to a large one can reduce resource use without changing the user's experience. Caching a repeated answer avoids recomputation. Better compilers use hardware more effectively. Quantization reduces precision where full precision is unnecessary. Sparsity avoids activating every part of a model for every input. Better algorithms can shift the capability curve more than adding hardware alone.

Intelligence improves the efficiency of intelligence production.

That recursive loop is one reason forecasts are uncertain. Extrapolating today's energy per task ignores future efficiency. Extrapolating efficiency alone ignores demand growth and larger workloads.

Both change at once.

History suggests caution. The energy required for computation has fallen dramatically over the long run, while total computing has exploded. Devices that once required a room became components in toys. The cost of storing and processing information collapsed, creating new categories of digital activity.

AI may repeat this pattern at the level of cognitive tasks.

A model that becomes ten times cheaper to run does not necessarily reduce the provider's electricity consumption. The lower cost may allow ten times as many users, longer context windows, more retries, more background agents, more personalization and entirely new products.

Efficiency can turn a luxury workload into a default feature.

This does not make efficiency pointless. Without efficiency, the expanded use might be physically or economically impossible. The relevant question is what society wants efficiency to accomplish. If the goal is to reduce total electricity consumption, rebound must be considered. If the goal is to maximize useful intelligence under a power constraint, efficiency is directly productive even if total consumption remains high.

The objective changes the meaning of the metric.

Power constraints are already changing the AI business.

For decades, software companies could often treat physical infrastructure as someone else's problem. Cloud providers handled servers. Utilities handled electricity. Semiconductor foundries handled fabrication. The application developer operated high in the abstraction stack.

Frontier AI has pulled leading technology companies downward.

Model capability depends heavily on access to large amounts of advanced compute. Compute depends on accelerators. Accelerators depend on fabrication and packaging capacity. Large clusters depend on data-center construction and electrical interconnection. Suddenly land, transformers, substations, cooling and generation contracts become strategic inputs to firms whose most visible products are information.

Intelligence has rediscovered industrial policy.

The scale is visible in corporate capital spending. Major technology firms have committed extraordinary sums to data centers and AI infrastructure. That spending does not prove future returns. It proves that the competitive frontier is currently capital-intensive.

This distinction is important.

A company may rationally invest heavily because falling behind in AI capability threatens its existing business, even if the standalone financial return on every data center is uncertain. Strategic defense can justify spending that looks strange under a narrow project model. Competitors can collectively invest more than the market ultimately needs because each has an incentive to avoid being the one without capacity.

The physical buildout can therefore overshoot financial value while still increasing social capacity.

Railways again.

But compute has a feature railways did not: hardware depreciates technologically at exceptional speed.

A track can remain useful for decades with maintenance. An accelerator may be economically outdated long before it physically fails because newer hardware offers better performance per watt or per dollar. This makes AI infrastructure a mixture of long-lived and short-lived capital. The building, substation and transmission connection may last for decades. The servers inside may turn over much faster.

Different clocks live in the same asset.

This affects financing and strategy. A company building a data center is making a long-term bet on the value of the site and power connection while making shorter-term bets on hardware generations. If compute technology improves quickly, the electrical infrastructure can remain useful even as the machines are replaced.

The connection may become more durable than the chip.

That possibility changes where value can accumulate.

Scarce power access, land near transmission, substations, cooling resources and permitting can become valuable because they persist across hardware cycles. A data-center shell may be less differentiated than the right to draw reliable power at scale in a constrained region.

This is value migration into the physical complement.

The cost of a thought also includes embodied resources that do not appear in the electric meter.

Semiconductor fabrication requires ultrapure water, chemicals, specialized equipment and complex global supply chains. Data-center construction uses steel, concrete, copper and other materials. Generators and transmission lines require their own materials. Manufacturing those inputs consumes energy elsewhere.

Lifecycle accounting becomes complicated quickly.

The correct response is not to stuff every decision into one impossible master metric. Different questions need different boundaries. An operator deciding where to route a workload may care about marginal electricity cost, carbon intensity and latency. A policymaker considering industry expansion may care about water, transmission, tax revenue, jobs and land use. An investor cares about capital cost, utilization, customer demand and depreciation.

The ledgers differ because the decisions differ.

One boundary deserves special attention: marginal versus average emissions.

A company can purchase renewable energy contracts equal to its annual electricity consumption and still draw electricity at hours when the local grid relies on fossil generation. Annual matching can support clean-energy investment and reduce average emissions, but it does not mean every workload is physically powered by the contracted source at every moment.

Hourly matching is harder and more informative for some purposes.

Again, the abstraction is useful until it becomes mistaken for physics.

The same caution applies to claims that AI can solve its own energy problem by optimizing grids and discovering better technologies. AI may indeed improve forecasts, operations and research. The gains could be substantial. They do not occur automatically, and some may increase total demand by making energy services cheaper.

Intelligence can improve a conversion without choosing the social objective.

The cost of a thought is therefore both falling and rising.

The cost per unit of computation has fallen. Hardware efficiency improves. Algorithms improve. Competition drives inference prices down. Open models diffuse capability.

At the same time, frontier systems use more total computation. Leading clusters consume more power. Data centers grow larger. Companies spend more capital. The system is scaling faster than many efficiency gains reduce total use.

There is no contradiction.

We are watching a technology move down its unit cost curve while moving up its aggregate demand curve.

That combination can be economically explosive.

It can also produce bottlenecks.

A model can be copied globally in moments. A grid connection cannot. A software update can unlock an efficiency gain across millions of servers. A new transmission corridor still needs engineering, land and approval. A chip design can improve rapidly. Fabrication capacity takes years and enormous capital to expand.

The fastest part of the intelligence system keeps running into the slowest parts of the energy system.

This mismatch will define the next phase more than the raw amount of electricity used by AI.

If model capability advances faster than power infrastructure, power becomes a strategic constraint. If hardware efficiency advances faster than demand, electricity pressure may ease. If demand grows faster still, utilities will face a new class of large loads competing with electrification elsewhere in the economy. If regions with abundant clean energy can attract flexible compute, geography may shift. If latency and data governance dominate, workloads may remain close to users even at higher energy cost.

The future branches.

We should resist the false precision of pretending otherwise.

What can be measured today is enough to establish the structural fact: machine intelligence is an electricity-consuming industry whose physical footprint is growing rapidly enough to matter for power planning.

That would have sounded strange during the era when software's business glamour came partly from being “asset-light.”

The asset never disappeared. It was rented from the layers below.

AI has simply made the rent large enough to notice.

There is a philosophical temptation to ask how many joules a thought is worth. The question is elegant and mostly wrong.

A thought has no fixed value. A one-line insight can save a company billions or be ignored. A long computation can produce nothing useful. The same model output can be priceless in one context and spam in another.

Energy can be measured physically. Value arrives from consequence.

The productive frontier lies in improving the conversion between them.

Spend fewer joules on useless cognition. Spend more when the expected consequence justifies it. Route workloads intelligently. Improve hardware. Improve algorithms. Build energy systems capable of supporting valuable demand. Price externalities honestly enough that cheap computation is not merely expensive somewhere else.

The goal is not minimal energy.

A hospital should not minimize electricity by turning off its equipment. A civilization should not minimize computation by refusing to think.

The goal is to make the physical cost of intelligence low enough, and the quality of its direction high enough, that we can afford to apply thought where thought changes what happens.

That is the real cost of a thought.

Not the electricity consumed by one answer.

The whole system required to make the answer matter.

The speed of the price decline makes the abstraction easier to understand. Stanford's 2025 AI Index compared the cost of inference at a fixed performance threshold and found that systems capable of roughly GPT-3.5-level performance on MMLU fell from about twenty dollars per million tokens in late 2022 to about seven cents by October 2024. The report also documented continuing improvements in hardware price-performance and energy efficiency.

This is the economic event hiding inside the engineering progress.

When a unit of adequate cognition falls by more than two orders of magnitude in price, developers stop treating it as an exceptional resource. They put it behind buttons people press casually, inside products that call models automatically, and eventually into agents that make calls on behalf of users who never see the meter.

The marginal thought becomes cheap enough to disappear from attention.

The capital underneath does the opposite.

Microsoft's fiscal-2026 disclosures showed quarterly capital expenditure running at tens of billions of dollars, with a large share directed toward short-lived CPUs and GPUs as well as long-lived data-center infrastructure. Nvidia's fiscal-2027 second quarter reported data-center revenue of $89 billion in a single quarter. These are company numbers, not a social cost-benefit analysis, but together they show how much financial value currently attaches to the physical machinery that makes low unit prices possible.

Cheap output can require expensive factories.

This is familiar from other network industries. A phone call can be almost free to the user because enormous fixed infrastructure already exists. A web search can feel free because advertising, servers and networks settle the bill elsewhere. Electricity itself has low marginal cost in some hours while the grid that guarantees service has very high fixed cost.

AI is becoming another high-fixed-cost, low-marginal-cost system.

That structure has strategic consequences. When fixed costs dominate, utilization matters intensely. An expensive accelerator sitting idle is a poor asset. This encourages providers to batch workloads, route demand, rent spare capacity and lower prices enough to fill the machines. It can also encourage firms to chase scale because a large user base spreads fixed cost.

The economics can therefore favor concentration even as inference becomes commoditized.

A cheap thought at retail may sit on top of a capital market that rewards enormous balance sheets.

This is one more reason not to infer democratized ownership from democratized access. A small firm can gain extraordinary cognitive capability through an API without owning a chip. That is economically liberating. The provider may simultaneously accumulate physical and bargaining power because the infrastructure layer remains capital-intensive.

Access and control can move in opposite directions.

The cost of a thought has to be read at both layers.