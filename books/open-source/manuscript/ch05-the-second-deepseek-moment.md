# The Second DeepSeek Moment

The first DeepSeek moment was mostly a psychological event.

People had known, abstractly, that Chinese laboratories were improving. They had known that algorithmic efficiency could matter alongside brute-force scale. They had known that the United States did not possess a monopoly on mathematics, software engineering, or machine-learning talent. Yet markets and institutions can carry knowledge in the same way a person carries an unread book: technically in possession, practically unchanged.

Then DeepSeek produced models the rest of the industry had to take seriously.

The surprise was not only capability. It was the combination of capability, cost claims, public technical detail, and open weights. A closed Chinese system could have been dismissed by many Western developers as a regional competitor. A downloadable one arrived inside their tooling.

The artifact crossed the border even when the company did not.

By 2026, the novelty should have worn off. It had not, because DeepSeek kept becoming less surprising in precisely the way that mattered. Its presence moved from exception to expectation.

On August 13, 2026, DeepSeek rolled out the general-availability version of DeepSeek V4 Pro across its app, web service, and API. The associated model artifact, DeepSeek-V4-Pro-0813, appeared on Hugging Face under the MIT license. DeepSeek's own release notes emphasized gains in agent capabilities and published a long list of benchmark results. Those numbers were vendor claims and should be read as such. Every model company chooses tests that make its release legible and often flattering.

The more consequential fact required no benchmark interpretation: a frontier-scale Chinese model was again available for other people to run.

This is what I mean by a second DeepSeek moment. The first changes what people believe is possible. The second changes what they budget for.

A shock can be treated as an anomaly. A sequence becomes procurement.

Once an enterprise architect expects strong open-weight models to keep arriving, the architecture changes before any one model is chosen. The company may insist that its evaluation harness support multiple providers. It may preserve an on-premises serving option. It may avoid proprietary prompt formats. It may negotiate cloud contracts differently. It may spend more on model routing and less on deep integration with one vendor. The expectation of future substitutes becomes valuable even if today's chosen model remains closed.

DeepSeek's strategic effect therefore extends beyond its users.

It disciplines competitors through the possibility of use.

This is what open software has always done when a credible alternative exists. A company can make money selling a proprietary product while an open competitor limits how abusive pricing, licensing, or roadmap choices can become. The open alternative acts as a reservation option. Customers may never switch, but the vendor must act as though some could.

AI makes the option unusually potent because model APIs are, at least at the surface, becoming standardized. Many serving systems support interfaces modeled on familiar chat-completion or response schemas. Application developers increasingly place routing layers between the product and the model. Tool descriptions, structured output, and agent protocols can be abstracted. The underlying models remain behaviorally different, but the plumbing required to test a substitute is getting cheaper.

That is good news for DeepSeek even when DeepSeek is not the final substitute.

A company that proves the possibility of a cheap capable open-weight system expands the bargaining power of every buyer.

There is a temptation to explain DeepSeek entirely as a geopolitical story. The temptation is understandable. U.S. export controls on advanced semiconductors are designed partly to limit China's access to the hardware needed for frontier AI. Chinese labs operate inside a policy environment where domestic technology capability is a national priority. American officials worry about security, surveillance, military applications, intellectual property, and the possibility that Chinese models become infrastructure in other countries. Chinese officials have equivalent reasons to distrust dependence on American APIs and accelerators.

All of that is real.

It is not enough.

Developers do not install a model because the flag is interesting. They install it because the model solves a problem under acceptable constraints.

The strongest open-model strategy is therefore one in which geopolitical motive and engineering utility reinforce each other. A Chinese laboratory can gain national strategic value by reducing dependence on foreign systems while gaining global commercial value by releasing something developers elsewhere genuinely want. The open license is what allows those two audiences to overlap.

A government can support technological sovereignty. A programmer in São Paulo can download the result without caring about sovereignty at all.

This is one reason open weights are difficult to contain with ordinary commercial boundaries. A hosted service has servers, payment relationships, customer accounts, and region controls. A model file can be mirrored. Once widely distributed, it becomes a fact of the technical environment.

That does not make it universally accessible. DeepSeek V4 Pro is an enormous artifact. The Hugging Face repository alone signals the industrial scale of the model. Running it efficiently is not comparable to downloading a small application. It requires serious hardware, storage, software, and expertise. Open weights remove permission scarcity, not physics.

The distinction matters because discussions of open AI often swing between two absurd extremes. In one, releasing weights means everyone suddenly owns a supercomputer. In the other, the fact that few people can run the largest model means the release is meaningless.

The truth sits in the supply chain.

A university may not run the full model but can study parts of it. A cloud provider can host it for many customers. A quantization team can make a more tractable version. A hardware company can optimize kernels against it. A startup can rent accelerators only when needed. A country can deploy it in a sovereign facility. A smaller model can be trained or distilled using lessons from the larger one. Tooling improves because a real demanding workload exists.

An open frontier model is an industrial reference design.

That is more important than the number of people who run it on a laptop.

DeepSeek also illustrates how quickly “open” can become a competitive expectation for a laboratory's identity. Once a company is associated with open releases, closing a future model is not a neutral decision. Developers notice. Competitors can portray the move as retreat. Investors and policymakers who celebrated the earlier openness ask what changed. The company has acquired a constituency it did not have before.

This is another way openness creates lock-in—on the producer.

A successful open strategy can trap the creator inside the bargain that made it successful.

The company can escape, of course. It can keep new frontier models closed, add custom license terms, or delay weights while monetizing an API. There is no law preventing it. The cost is reputational and ecosystem momentum. Developers who built on the assumption of continued openness may migrate to Qwen, GLM, Kimi, or whoever appears more dependable.

The competition among Chinese labs made that cost higher in 2026.

DeepSeek was no longer the only laboratory willing to release enormous weights. Alibaba's Qwen family covered a wide range of sizes. Z.ai was pushing GLM models aggressively. Moonshot released Kimi K3 under a custom but broad license. Tencent and MiniMax added pressure. A decision by one lab to become restrictive did not send developers back automatically to American closed models. It could send them to another Chinese open-weight family.

Competition protects openness better than sentiment does.

This is a recurring lesson of technological governance. The nicest license in the world is less reassuring if one company controls every practical implementation. Multiple credible producers create exit.

DeepSeek's MIT licensing gave users unusually broad rights over the released artifact. But the company's larger strategic value to the ecosystem came from helping create a market in which permissive release had to be answered.

American labs responded in different ways. Some remained primarily closed. OpenAI had already released the gpt-oss family under Apache 2.0 in 2025, giving developers serious downloadable reasoning models while reserving its strongest commercial systems. Nvidia continued releasing and optimizing open models because its hardware economics aligned with abundance. Meta's historical association with open weights persisted, though the frontier conversation in 2026 was more geographically mixed than in earlier years.

The result was not an open-versus-closed binary.

It was portfolio strategy.

A company could keep its most capable model proprietary while releasing smaller or older models openly. It could publish open safety models or specialized models. It could support open runtimes. It could use permissive artifacts to build developer goodwill while protecting the highest-margin service. The Chinese labs often pushed farther toward opening the largest artifacts, at least for a period, because their competitive problem was different.

A challenger values distribution more than a leader values cannibalization.

This is one of the simplest explanations for why openness often arrives from the edge. The incumbent already owns customers. A challenger needs a reason for customers to try something new. Removing permission, price, and deployment constraints is a powerful reason.

The same dynamic appeared in browsers, operating systems, databases, developer tools, and cloud infrastructure. Openness can be a way to attack a proprietary profit pool from outside it.

DeepSeek attacked expectations about model scarcity.

Once scarcity weakens, the market begins asking rude questions.

Why does this API cost so much?

Why can I not run the model in my own region?

Why is the context window limited this way?

Why can the provider change the model without giving me the old weights?

Why must my customer data leave my network?

Why does this tool-calling format belong to one company?

Why can I not fine-tune the model myself?

The closed provider may have excellent answers. Managed systems can be cheaper after total operational cost is included. Safety controls can be stronger. Updates can improve quality. Proprietary infrastructure can reduce latency. The model may simply be much better. But the questions now have a reference price.

That is DeepSeek's most durable effect.

It made the counterfactual executable.

Before open frontier models, a procurement team comparing a proprietary API with self-hosting had to imagine what a competitive self-hosted model might eventually look like. After DeepSeek and its peers, the team could run one.

This does not mean every company should.

Running a huge model is a way to discover new forms of overhead. Capacity planning. GPU failures. Security patches. Scheduler problems. Driver compatibility. Quantization tradeoffs. Model updates. Evaluation. Monitoring. Abuse controls. Peak demand. Idle capacity. Engineers who understand all of it and would like to be paid.

The API bill contains these problems compressed into a price.

The open alternative uncompresses them.

This is why the contest between open and closed AI will not end with one side “winning.” The two architectures serve different appetites for control. Some users want to own the complexity because control is strategic. Others want to rent the capability because complexity is a distraction. Many will do both.

DeepSeek's presence matters in either world because it reduces the plausibility of permanent frontier monopoly.

A closed lab can still be ahead. It may be ahead by a lot. The question is how long the lead can remain exclusive before some meaningful portion diffuses into downloadable artifacts.

In 2026, that diffusion cycle looked short enough to change capital allocation.

A venture investor evaluating an application company could no longer assume today's model cost would persist for five years. A cloud provider could no longer assume model hosting would be limited to a few American vendors. A hardware company could optimize for Chinese releases on day one. A government could consider sovereign deployments using models it did not train. A model lab could look at DeepSeek's reach and reconsider what it might gain by releasing weights.

The second DeepSeek moment was quieter than the first because familiarity had replaced astonishment.

That is what made it more important.

A shock becomes history when people stop gasping and start designing around it.

And the second shock was not arriving alone. The most dangerous competitor is not always the one with the best flagship.

Sometimes it is the one that keeps being there.

A developer starts with a small model because the laptop is available. The prototype moves to a server. The use case adds images. Another team needs code. A third wants a model that can be fine-tuned cheaply. Production needs a larger version. An internal tool needs something smaller again. Each transition creates a chance to switch model families.

Alibaba's Qwen strategy in 2026 was to make switching unnecessary.

The family spread across sizes, modalities, and use cases with a release cadence that felt less like a sequence of monuments and more like a supply chain. At the top end, Qwen3.8-2.4T-A95B carried 2.4 trillion total parameters and about ninety-five billion active parameters per step, according to Alibaba's documentation. Smaller versions provided more approachable deployment points. Multimodal and specialized variants widened the surface further. By late August, Qwen3.8-Flash was adding another performance-and-cost entry to the family.

The specific model names will age. The strategy will not.

Coverage compounds.

Hugging Face's summer 2026 report estimated that Qwen-based models had produced more than 151,000 derivatives on the Hub, far beyond the footprint it attributed to Llama-specific repositories and ahead of other major families. The same report counted Qwen's 2026 downloads in the billions when smaller and larger variants were taken together. These numbers describe Hugging Face activity, not the whole world. They do not prove that billions of people used Qwen or that Alibaba earned billions of dollars from it.

They prove something more relevant to an ecosystem: people kept building on the family.

Derivative count is a peculiar form of market share because every derivative is an act of commitment. Someone decided that the model was worth modifying, converting, specializing, quantizing, merging, or packaging. Many of those acts are tiny. Some are automated. Some will never be downloaded. Yet the cumulative shape shows where downstream work is finding a base.

A base model is valuable in a way a winning demo is not.

The word “base” is easy to hear technically and miss economically. A base is where future work begins. If thousands of future experiments inherit your tokenizer, architecture, license assumptions, prompt format, evaluation conventions, and community knowledge, your influence persists even when the derivative no longer carries your product name in large letters.

This is standards power emerging from habit.

Alibaba did not invent the mechanism. Software platforms have pursued it for decades. Microsoft wanted developers targeting Windows. Apple wants applications built around its device and service assumptions. Amazon wants workloads designed for AWS. Google wants web developers to use its tools and formats. Every platform understands that the easiest way to win the next project is to be the default starting point of the last project.

Open models make the mechanism faster because the downstream developer can change the product itself.

A proprietary API can be integrated. An open-weight model can be inherited.

Inheritance is stickier.

If a medical startup fine-tunes a Qwen model on domain data, it has not merely written an adapter against an endpoint. It may have trained evaluation sets, quantized the model for specific hardware, built prompts around behavior, created safety filters, developed fallback logic, and taught staff the model's failure modes. The startup can switch, but switching means recreating accumulated local knowledge.

Open weights reduce vendor lock-in at the legal layer while creating family familiarity at the practical layer.

This apparent contradiction is one of the central dynamics of the book. Openness can make it easier to leave the company that created the model and harder to leave the ecosystem that formed around the model.

Alibaba can benefit from both.

If a developer runs Qwen on Nvidia hardware through a third-party cloud, Alibaba may earn nothing directly from that inference. Yet Qwen's position as a default increases the chance that other developers choose Alibaba Cloud, that enterprises recognize the name, that researchers publish improvements against the family, that hardware vendors optimize for its architecture, and that future Alibaba releases receive instant attention.

Attention has option value.

A model maker does not need to know in advance which business will monetize the ecosystem if enough valuable paths become available later.

This is often how open-source strategy looks from the inside: spend today on an asset whose direct revenue is uncertain because adoption makes several future businesses easier.

Alibaba can tolerate ambiguity better than a startup whose only product is model access. It is a technology conglomerate with cloud infrastructure, enterprise relationships, commerce platforms, capital, and a strategic interest in Chinese AI capability. Qwen can create value indirectly across that system.

This does not make the strategy costless.

Alibaba was spending heavily on AI infrastructure in 2026. Reuters Breakingviews described the company raising substantial capital while investors scrutinized the returns on its AI buildout. Training, serving, and supporting a broad model family require real money. Open distribution does not pay the electricity bill by moral force.

The company therefore faces the same question as every successful open platform: when does adoption become monetization?

The answer began changing at the largest scale.

Hugging Face's summer report noted that much of the Chinese large-model ecosystem had been released under permissive licenses, but the newest giant models were beginning to experiment with restrictions and revenue-sharing expectations. Qwen3.8's largest release sat inside that transition. The exact terms matter because they signal whether Alibaba wants Qwen to remain purely permissive substrate or become a commercial franchise whose biggest redistributors owe something back.

This is the price of success.

When nobody uses an open model, permissive licensing feels easy. When clouds can generate significant revenue hosting it, generosity becomes an accounting question.

Qwen's broad family gives Alibaba leverage that a single flagship would not. A restrictive term on one giant model does not necessarily drive developers away if smaller and older members of the family remain convenient. The company can segment openness the way software vendors segment products.

Small model: easy entry.

Mid-size model: enterprise workhorse.

Giant model: strategic showcase and negotiating asset.

Cloud service: convenience layer.

This is not a formal Qwen price sheet; it is the economic possibility created by family breadth.

A portfolio can use different degrees of openness for different jobs.

OpenAI did something related from the opposite direction by making gpt-oss models downloadable while reserving its most capable commercial systems for hosted services. Nvidia uses open Nemotron models partly to expand demand for its platform. Microsoft publishes smaller Phi models while selling access to a broad model catalog in Foundry. The frontier is not settling into one licensing ideology. It is learning portfolio management.

Qwen's distinctive advantage is the community graph.

Hugging Face estimated that Qwen derivatives were being added at a pace of roughly 180 to 210 repositories per day through the first seven months of 2026. Again, not every derivative is important. The rate matters because it creates a larger search space for useful accidents.

One fine-tune might improve a low-resource language. Another might optimize a niche coding task. A quantizer makes a model fit on cheaper hardware. A community maintainer discovers a serving bug. A benchmarker finds a weakness. A company publishes a domain adaptation. Most contributions will not change the world. A few can increase the value of the base family for everyone.

This is open-source research and development as a probability distribution.

You do not hire all the contributors. You create enough surface area that some of them improve your ecosystem for reasons of their own.

The strategy works best when friction is low. A permissive license helps. Stable naming helps. Consistent tooling helps. Frequent releases help. Support in common libraries helps. Hardware compatibility helps. Documentation helps. Smaller models help because most developers cannot begin by renting a cluster large enough for a trillion-parameter system.

This is why Hugging Face's other major 2026 finding matters so much: small models dominate practical activity.

Models below one billion parameters accounted for the overwhelming majority of downloads among repositories with declared parameter counts, while enormous models represented a tiny fraction of volume. The exact percentages are platform-specific, but the intuition is obvious. Hardware availability sets the addressable audience.

A model family that exists only at the industrial frontier can win prestige and lose ubiquity.

Qwen tried to have both.

This creates an unusual competitive threat to Western labs focused on frontier trophies. A laboratory can spend heavily to build the single best model in the world and discover that developers are training their habits on a merely excellent family available everywhere else.

Benchmarks measure a race. Ecosystems measure a commute.

The model you encounter every day can matter more than the model that won Saturday's event.

This does not mean Qwen's quality is irrelevant. A bad family will not become a durable base simply by publishing many sizes. The releases need to remain sufficiently capable that developers do not feel they are paying a large performance tax for convenience. The frontier versions serve a signaling function here. They show that the family is not only for cheap local work; it has an upward path.

That path reduces migration anxiety.

A developer can prototype with a smaller Qwen and believe a larger cousin exists if the workload succeeds. A company can fine-tune inside the family knowing it is not choosing a dead end. The same architecture or tooling may not transfer perfectly across sizes, but the expectation of continuity matters.

This is similar to cloud pricing. A startup begins on a tiny instance. It does not need a supercomputer today. It likes knowing one is available without leaving the platform.

Family breadth is cloud logic applied to models.

It also fits Alibaba's corporate position beautifully. The company already knows how to operate platforms containing enormous ranges of sellers, products, and customer needs. The Qwen family behaves less like one product and more like a shelf.

The shelf is valuable when it keeps people shopping inside the store.

There is another strategic layer: Chinese hardware.

As domestic accelerators become more important, a broad open model family provides repeatable workloads for optimization. Hardware vendors can target Qwen variants at several scales. Developers can compare performance. Toolchains can mature against public artifacts. The model family becomes a bridge between national hardware policy and everyday developer practice.

This matters because a hardware ecosystem cannot be built from patriotic procurement alone. Engineers need software that works.

Qwen's openness gives domestic chip companies something real to make work.

At the same time, Nvidia's day-zero support for Qwen3.8 demonstrates the global counterforce. The same open artifact can strengthen competing hardware ecosystems. Alibaba cannot release weights globally and decide that only Chinese accelerators will learn from them. Openness distributes the training material for the whole supply chain.

This is where geopolitical strategy collides with open-source logic.

A model can be intended partly to advance Chinese technological autonomy and end up selling American GPUs. It can be optimized by European startups, quantized by hobbyists, hosted by clouds in the Middle East, and fine-tuned by companies that have no interest in Alibaba's national context.

The artifact escapes the story of its origin.

That escape is one of the strongest arguments for open models and one of the reasons states become uneasy about them.

Qwen everywhere means Alibaba's ideas can become global infrastructure. It also means Alibaba cannot fully control what the infrastructure becomes.

The same derivative graph that creates power creates loss of control.

A downstream model can behave badly. It can remove safeguards. It can be used in a product Alibaba dislikes. It can compete with Alibaba's own API. It can be optimized for a rival cloud. A permissive ecosystem gives the creator influence through inheritance, not command through ownership.

This is a different theory of power.

Closed platforms exercise power by withholding access.

Open platforms exercise power by becoming hard to avoid.

The distinction will define 2027 more than any single benchmark ranking.

If Qwen continues to be the base from which thousands of other systems descend, Alibaba may not need to own the winning application. It will have helped choose the grammar in which winning applications are built.

That is what “everywhere” eventually means.
