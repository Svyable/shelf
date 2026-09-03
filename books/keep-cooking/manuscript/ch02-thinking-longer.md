# Thinking Longer

The most consequential chart in the early reasoning-model era was also one of the easiest to misunderstand.

On one axis sat computation. On the other sat performance. The line went up.

OpenAI showed versions of this relationship when it introduced o1 in 2024. The company reported that performance improved not only with more computation during training but also with more time spent thinking at test time. Researchers outside the company were finding related results. In one widely discussed paper, Charlie Snell, Jaehoon Lee, Kelvin Xu, and Aviral Kumar studied ways to allocate inference-time compute and found that, on some problems, carefully spending more compute on a smaller model could outperform a model fourteen times larger under a matched-compute comparison. The result was conditional, not magical. Different problems responded differently. But it made a new economic lever visible.

A model did not have to become permanently larger in order to become temporarily more capable.

This matters because permanent capacity and temporary effort have different costs.

Imagine two law firms. One hires a larger staff and pays salaries every month. The other keeps a smaller staff but can rent a hundred specialists for one afternoon when a case demands it. Those firms might produce similar total hours over a year, but their economics, flexibility, and risk are different. Inference-time scaling offers a computational version of the second firm. Capability can be rented by the problem.

The analogy should not be pushed too far. Models do not think as people think, and additional tokens are not hours of human reflection. Yet the allocation problem is recognizable. Easy questions do not deserve the same effort as difficult ones. A request for tomorrow's weather and a request to inspect a merger agreement should not consume the same resources. A system that can estimate difficulty and spend accordingly becomes more useful than one that treats every prompt as equal.

This sounds almost embarrassingly obvious. It was not how most software worked.

Traditional programs generally execute the procedure they were given. The procedure may branch according to input, but its logic is designed in advance. A reasoning system can behave more like a search process whose path is uncertain until the problem arrives. It may try one approach, discover a contradiction, backtrack, use a tool, examine the result, and continue. The cost of the answer is partly determined at runtime.

That opens an enormous design space.

The crudest method is repetition. Ask the same model several times and choose the majority answer. If errors are somewhat independent, consensus can improve reliability. A slightly more sophisticated version asks the model to generate several candidate solutions and uses a verifier to select among them. Another approach searches a tree of intermediate steps. Another gives the system access to code, calculators, databases, or the web. Another asks a separate model to critique the first. Another changes the distribution of effort depending on how difficult the prompt appears.

Each method converts computation into a chance of improvement.

The phrase chance matters. More compute does not guarantee a better answer. A model can spend longer reinforcing a bad assumption. Five agents can share the same blind spot. A verifier can reward superficial signals. Search can discover increasingly elaborate ways to be wrong. Reasoning traces can become longer without becoming wiser.

The curve rises on average, under particular evaluations, with particular methods. Life is not an average benchmark.

Still, the existence of the curve changes behavior even before anybody knows its final shape.

Suppose you run a business and learn that spending ten times more inference on the hardest one percent of customer cases cuts serious errors in half. That may be an obvious purchase. Suppose a hedge fund finds that a hundred parallel research agents discover useful anomalies that ten agents miss. The fund will not remain philosophically committed to ten. Suppose a pharmaceutical company can generate and screen more hypotheses before a wet-lab experiment. It will compare the marginal cost of computation with the marginal cost of laboratory time. Suppose a teenager can ask for another explanation of calculus essentially for free. He will.

The social demand for tokens does not depend on infinite scaling. It only depends on a region where another unit of compute is worth more than it costs.

We already live inside many such regions.

The key question is how quickly the price of those units falls.

Stanford's 2025 AI Index documented a remarkable decline in the cost of obtaining a given level of model performance. The estimated cost of querying a model at roughly GPT-3.5 performance on a standard benchmark fell from about twenty dollars per million tokens in late 2022 to seven cents by October 2024. The comparison was imperfect, as all benchmark comparisons are, but the direction was impossible to miss. Hardware price-performance improved. Smaller models became stronger. Open-weight systems narrowed gaps with closed models. Providers competed aggressively.

When the price of a productive input collapses, economists do not assume the world will buy the same amount and pocket the savings.

It buys more.

Lighting is the old illustration. More efficient lamps reduced the cost of producing light, but societies responded by illuminating more streets, homes, factories, offices, advertisements, stadiums, and night skies. The quantity of light consumed expanded so dramatically that efficiency did not translate neatly into less total energy devoted to illumination.

Machine reasoning may follow a similar path.

An organization that once spent ten dollars for an answer may later spend one dollar for ten attempts, then five dollars for fifty attempts because the business case improved. A person who once asked an AI three questions a day may ask three hundred when the assistant becomes embedded in every application. Agents may communicate with other agents at volumes no human user would have initiated directly. A single human decision may trigger thousands of invisible inference calls.

The falling cost per token can therefore coexist with rising total spending on tokens.

This is one reason debates about whether AI will become cheap are often confused. Cheap per unit is compatible with expensive in aggregate. Water is cheap in many wealthy countries; cities still spend fortunes moving it. Transistors became astonishingly cheap; the world responded by manufacturing them in quantities that would have been incomprehensible in the vacuum-tube era. Storage became cheap; humanity filled data centers.

The same could happen to thought-like computation.

There is a more subtle effect. As the cost falls, the kinds of problems worth attempting change.

At high prices, inference is reserved for tasks with obvious economic value. Customer support. Coding. Legal drafting. Marketing. Research. At lower prices, intelligence becomes decorative and ambient. Every email can be rewritten. Every meeting can be transcribed, summarized, classified, and mined for tasks. Every photograph can be described. Every product can have a personalized sales pitch. Every student exercise can receive bespoke feedback. Every software interface can generate explanations on demand. Every game character can improvise. Every sensor can feed a stream into a model that decides whether anything interesting happened.

The market expands from important answers to ubiquitous interpretation.

Then agents arrive and multiply the demand again.

A human asks one question. The agent decomposes it into twenty. Each subtask invokes a model. Some of those invoke tools. The outputs are summarized. A critic checks them. A final model writes the answer. From the user's perspective one request occurred. From the infrastructure's perspective a small bureaucracy came to life.

The bureaucracy can be efficient. It can also reproduce the familiar vice of bureaucracies: every layer creates work for another layer.

One agent writes a plan because another agent requires a plan. A second summarizes sources because the final model cannot economically retain all of them. A verifier scores candidates because the generator produced too many. A memory service compresses conversations because the context has grown. An orchestrator decides which model should receive which task. The system becomes a machine for managing the consequences of having abundant machine labor.

This is not an argument against agents. Human organizations do the same thing because specialization can outperform solitary effort. The interesting question is when coordination cost begins consuming the gain.

That question is old.

Ronald Coase asked why firms exist when markets can coordinate transactions. One answer is that using the market has costs. You have to find suppliers, negotiate contracts, monitor performance, and resolve disputes. Inside a firm, some of those transactions can be coordinated by authority instead.

Agent systems face their own transaction costs. A subagent must receive enough context to understand the task. Its output must be communicated back. Conflicts among agents must be resolved. Quality must be checked. More agents can increase the breadth of search while also increasing the surface area for inconsistency.

Token maxing is therefore not merely about buying more intelligence. It is about organizing machine intelligence.

The winners may be systems that discover how to spend less computation more intelligently, not those that simply spend the most.

This distinction is visible in the research on inference-time scaling itself. The Snell paper did not merely say more test-time compute is good. It found that allocation strategy matters and that the best method depends on problem difficulty. Compute used without adaptation can be wasteful. A smaller model with a well-designed inference budget can beat a much larger model on some tasks. On other tasks, the same strategy may fail.

The future of reasoning may therefore resemble portfolio management.

A model router assigns cheap tasks to cheap models. Harder tasks receive stronger models. Some prompts trigger search. Some trigger code. Some receive repeated sampling. Some require human review. A confidence estimate changes the budget. A time limit changes the strategy. The system is not maximizing tokens. It is maximizing expected value under a token constraint.

That is the mature version.

The immature version is more fun and will probably come first.

Users will learn rituals for making systems try harder. “Think deeply.” “Do not answer until you have checked every assumption.” “Use maximum reasoning.” Interfaces will expose effort sliders. Premium plans will offer more agent time. Companies will sell research modes that take minutes instead of seconds. Benchmarks will reward systems allowed increasingly generous inference budgets. Social media will fill with screenshots comparing the cheap answer and the expensive one.

A status hierarchy will emerge around patience.

The wealthy user can afford to wait because the task matters. The poor user may be given a small model and a short budget because the service is free. Enterprises can allocate larger context windows, private retrieval systems, and repeated verification to decisions that affect millions of dollars. Public systems may ration inference because budgets are visible to taxpayers. The theoretical democratization of intelligence will arrive with tiers.

This is not necessarily unjust. Scarce resources have always been rationed somehow. What is new is that the quality difference may be hidden behind a common interface.

Two citizens ask the same AI assistant to explain a tax dispute. One receives a fast response from a small model. The other, through a paid legal service, receives an answer generated after retrieval from current statutes, several independent analyses, a contradiction check, and a lawyer's review. Both experiences are called AI assistance. The difference is not merely model brand. It is the amount and organization of thought purchased around the question.

This will make regulation awkward.

A rule that evaluates “the model” may miss the system. A base model can be mediocre alone and powerful when wrapped in tools, search, memory, and retries. Another can score brilliantly on a benchmark but perform badly when latency limits prevent long reasoning in production. Safety characteristics can change with inference strategy. So can cost, reliability, and environmental impact.

The unit of governance wants to be the deployed process, not the naked model.

The same is true for economic measurement. If productivity statistics ask whether firms adopted generative AI, the answer may hide orders of magnitude of variation in use. One firm gives employees a chat window. Another rewires sales, support, software development, procurement, and finance around persistent agents with access to internal systems. Both check the box marked AI.

Token maxing turns adoption from a binary variable into an intensity variable.

That intensity can create nonlinear effects.

The first model invocation may save a minute. The second may save another. The tenth may uncover an error that would have cost a million dollars. Or the tenth may merely produce another version of the same paragraph. The value curve depends on the task, the system, and the consequence of being wrong.

This is why high-stakes domains may become the great consumers of machine reasoning even if regulation slows automation.

Medicine is a useful thought experiment. A clinician may never want a model to make the final diagnosis alone. That does not imply low token use. The opposite may occur. A system could summarize the record, check drug interactions, compare symptoms with guidelines, generate differential diagnoses, search recent literature, flag contradictory evidence, and prepare questions for the physician. The human remains responsible, but the amount of machine analysis surrounding the decision explodes.

Aviation already provides an analogue. Automation did not remove pilots from commercial aircraft. It surrounded them with systems that continuously monitor, calculate, compare, and warn. The human role became more supervisory precisely because the machine role became larger.

Finance can consume even more because the payoff to small informational advantages is direct. If additional inference improves a trading signal by a fraction, firms will spend until competition arbitrages much of the benefit away. That arms race can raise total compute consumption while leaving average excess returns close to where they started. The machines work harder so nobody falls behind.

This is one of the darker engines of token maxing: defensive consumption.

A company may use more AI not because the absolute value is enormous but because competitors do. An applicant generates a polished résumé because other applicants do. Recruiters deploy AI filters because application volume rises. Applicants use agents to tailor hundreds of applications because filters become stricter. Employers use more screening. Candidates use more optimization. The equilibrium contains far more computation and not necessarily a better match between person and job.

The same can happen in advertising, search optimization, procurement, academic publishing, litigation, lobbying, and any field where one side's generated output becomes the other side's generated input.

Cheap thought meets cheap counter-thought.

The volume rises.

This is not a failure of intelligence. It is a consequence of strategic interaction. If one lawyer can use a model to generate ten plausible arguments, the opposing lawyer may need tools to analyze ten. If security researchers can ask models to discover vulnerabilities, defenders need models to inspect more code. If scammers can personalize messages, banks need better detection. Each improvement induces a response.

The total social value depends on what the contest produces.

An arms race in cybersecurity can harden systems. An arms race in spam can simply fill inboxes. An arms race in scientific hypothesis generation can accelerate discovery if experiments remain the bottleneck. An arms race in financial persuasion can transfer wealth toward whoever owns distribution.

The line on the chart does not tell us which world we get.

It tells us only that more compute can buy more performance under some conditions.

The rest is economics.

A civilization that discovers a way to make machines perform better by thinking longer will not use that technique only on olympiad mathematics. It will use it on insurance claims, shopping, warfare, dating, tax planning, lesson plans, mergers, political messages, drug discovery, customer complaints, software bugs, and bedtime stories. The relevant variable will not be whether the technique works. It will be who can afford it, where the gains saturate, what scarce resources it consumes, and what humans stop practicing once the machine becomes patient enough to do it for them.

The phrase “thinking longer” makes the future sound contemplative.

At industrial scale, it may be anything but.

It may mean millions of accelerators performing trillions of additional operations because every institution has learned that a little more computation sometimes buys a little more certainty. A fraction of a percent in quality, multiplied across a vast enough system, becomes worth a power plant.

The quiet curve becomes infrastructure.