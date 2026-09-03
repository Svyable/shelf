# The Merchant Becomes an API

A bakery is not an API.

It is flour arriving before dawn, ovens that run hot in one corner, a person who knows when the dough feels wrong, a delivery van with a sticky door, customers who want the same birthday cake every year, and a thousand small acts of judgment that do not fit neatly in a database.

Yet the part of the bakery that sells to an agent has to become machine-readable.

What can be ordered? For when? In what quantity? Which ingredients are present? Which substitutions are possible? How much notice does a custom cake require? What is the delivery radius? Is the item actually available? What happens if the order changes? Can the business produce an allergen statement the agent can trust?

The merchant does not become software.

Its commercial boundary does.

Imagine one Saturday birthday order moving through that boundary.

A customer tells her agent: cake for eighteen people, chocolate preferred, not excessively sweet, pickup by three in the afternoon, a fixed budget, simple decoration, and a guest with a serious peanut allergy. The customer does not know which bakery to call. She does not want to spend forty minutes asking five shops the same questions.

The agent sends a structured request.

The bakery does not need to expose its recipe book or let a model roam through internal email. It needs to answer a narrower set of commercial questions.

Can the bakery accept a custom cake for that date?

Which sizes serve roughly eighteen people?

What flavors are available?

Which decoration options fit the lead time?

What is the price?

What deposit is required?

When does the order become nonrefundable?

Can pickup occur before three?

Most important, what exactly can the bakery say about peanuts?

That final question shows why machine readability cannot mean machine confidence.

A bakery might truthfully say that a recipe contains no peanuts while also saying that peanuts are handled in the same kitchen. Another bakery may maintain a dedicated process for certain allergens. A third may refuse to make any assurance beyond publishing ingredient lists. Those statements are not interchangeable.

A consumer agent that collapses them into a binary field called `peanut_free=true` can create a dangerous falsehood.

The useful interface preserves the merchant’s actual claim.

No peanut ingredient in recipe.

Shared equipment.

Cross-contact possible.

No medical-allergy guarantee.

Human confirmation required for severe allergy requests.

The machine-readable boundary should become more precise where the consequences of error rise.

This is the opposite of the fantasy in which AI smooths every messy fact into a convenient answer. Sometimes the highest-value function of structured commerce is to preserve the mess honestly enough that the agent knows it must stop.

The bakery’s capacity creates another boundary.

The shop can bake ten standard cakes on Friday and perhaps four elaborate custom cakes. Flour is not the scarce input. Decorator time is. The storefront may appear open and the product may appear available, but the relevant inventory is a block of skilled labor on a specific day.

A useful merchant interface therefore exposes capacity, not merely stock.

Standard chocolate cake: available.

Custom piping: two slots remaining.

Sculpted decoration: unavailable for Saturday.

Delivery: full.

Pickup: available between one and three.

The API is beginning to describe operations rather than a shelf.

The agent returns with two acceptable options. One is cheaper and plain. The other costs more because the decoration uses scarce labor. The customer chooses the second.

Now the bakery needs commitment.

A custom cake cannot be returned to inventory like a boxed appliance. The merchant may require a deposit and a cancellation deadline because ingredients and labor become specific to this buyer. The agent must understand that a refundable shopping cart and a committed production slot are different commercial objects.

The quote can therefore carry an expiration time.

The deposit can be tied to the specific configuration.

A change from eighteen servings to thirty after the cutoff can require a new quote.

A request to change pickup to delivery can fail because the van is already committed.

These are ordinary small-business realities. Agentic commerce works only when the protocol can represent them instead of assuming every transaction behaves like commodity retail.

The order then moves into the bakery’s internal world.

Someone checks the production board.

Someone notices that the chocolate supplier delivered late.

Someone decides whether another brand of cocoa changes the taste enough to matter.

Someone sees that the written decoration request will look crowded on the selected cake size and calls for judgment.

None of this requires the consumer agent to become the bakery’s operating system.

The boundary can remain narrow.

The merchant system tells the agent that the order is accepted, that one ingredient substitution does not affect the declared allergen policy, and that the decorative wording needs approval because the baker recommends a shorter version.

The human customer is asked one meaningful question rather than twelve administrative ones.

That is the promise.

The merchant automates the transaction without automating the craft.

Then imagine what happens when the data is wrong.

The bakery marked pickup until three, but a holiday schedule closes the front counter at two.

The platform inferred that a cake serves twenty because another merchant uses the same diameter differently.

The agent treated “no peanuts in recipe” as “safe for severe peanut allergy.”

A generated product photo implied a decoration the bakery never offered.

The order reaches the shop with a promise nobody there knowingly made.

This is where the merchant API stops being a convenience layer and becomes a liability surface.

Every important field needs an owner.

Merchant-declared.

Platform-inferred.

Third-party verified.

Customer-supplied.

Agent-generated.

The source matters because correction and responsibility depend on it.

A merchant should be able to say: this inventory figure is ours, this delivery estimate came from the courier, this sustainability badge came from a certifier, and this descriptive attribute was inferred by the platform and has not been verified.

The buyer agent can then weight the evidence accordingly.

This is what a mature machine-readable market looks like.

Not one enormous database claiming omniscience.

A chain of bounded assertions with provenance.

The same case also shows why small businesses may welcome agentic commerce even when they dislike platforms.

Before the interface, the bakery might receive twenty messages containing some version of “How much for a cake?” Staff have to ask the date, serving count, flavor, design, pickup time, budget, and dietary constraints before they know whether the inquiry is even feasible.

A structured request can arrive with the necessary facts already present.

The business spends less time qualifying demand.

It spends more time on orders it can actually fulfill.

This is not trivial. Administrative interruption is expensive inside a tiny firm because the person answering messages may also be mixing dough, scheduling staff, paying invoices, and dealing with the refrigeration technician.

But the same interface can create new work.

The catalog must be maintained.

Capacity rules must be accurate.

Holiday hours must update everywhere.

Prices must propagate.

Allergen and certification statements must be reviewed.

The business has to decide which exceptions require a human.

The operational gain depends on whether the common infrastructure reduces more complexity than it creates.

That is the small-business test for agentic commerce.

The best system does not ask a bakery to become a software company.

It lets the bakery publish a small, trustworthy commercial surface and get back to baking.

This is a major opportunity for small firms because small firms have historically paid a disproportionate price for administrative complexity.

A global retailer can maintain product feeds, payment integrations, inventory systems, tax engines, fraud tools, advertising teams, fulfillment networks, legal departments, and customer-service operations. A small merchant cannot. The internet expanded reach but often required small businesses to learn a stack of technologies far outside their craft.

Agentic commerce can either reduce that burden or add another layer to it.

The optimistic model is “integrate once, appear everywhere.”

A commerce platform maintains the catalog, inventory, checkout, tax, identity, fraud, and fulfillment logic. AI assistants query the same structured layer. The merchant does not build a custom storefront for every agent. New consumer interfaces become distribution channels automatically.

Shopify was explicit about this strategy in 2026. Its catalog and Universal Commerce Protocol work aimed to make products from millions of merchants available across AI channels such as ChatGPT, Google’s AI experiences, and Microsoft Copilot. The company reported rapid growth in AI-referred traffic and orders, though those figures described its own network rather than the whole economy.

The strategic point was larger than the growth rate.

The merchant’s website no longer had to be the only gateway to the merchant’s business logic.

That can be liberating.

A small manufacturer in Ohio can expose a product to a consumer agent in Toronto without buying a search ad for every relevant phrase. A ceramicist can become discoverable to a gift-planning agent because the catalog contains dimensions, lead time, materials, price, and shipping. A specialist parts supplier can win an order because it has the exact compatibility data a maintenance agent needs. A family-run hotel can become eligible for a traveler’s constraints without winning a conventional ranking war for “best hotel.”

The machine can search the long tail more efficiently than a person.

This has echoes of the early internet’s “long tail” argument. Digital distribution reduced the importance of shelf space and made niche products easier to find. Agentic distribution can reduce another barrier: the human cost of evaluating the niche.

A consumer does not want to inspect two hundred obscure sellers.

An agent can.

This gives small firms a theoretical advantage if they are unusually good at satisfying a specific need.

The word theoretical matters because discoverability is not the same as competitiveness.

A tiny merchant still has fewer reviews, less inventory, slower fulfillment, narrower service hours, and weaker brand recognition. It may pay higher shipping rates. It may lack sophisticated fraud controls. One bad return can be expensive. The agent may rationally prefer a larger seller because operational reliability matters.

The small firm needs infrastructure that lends it trust.

Marketplaces solved part of this problem by wrapping small sellers in common payment, review, fulfillment, and dispute systems. Agentic commerce can create a less centralized version if portable trust signals exist.

A merchant identity can carry verified business information.

A shipping provider can attest to delivery performance.

A payment processor can provide fraud and transaction credibility.

A commerce platform can expose current inventory.

A certification body can verify regulated claims.

A review system can preserve reputation across channels.

The merchant assembles institutional trust without surrendering entirely to one marketplace.

This is an important design goal because the alternative is familiar: agents route consumers toward the largest platforms precisely because those platforms are easiest to trust.

Convenience can reconcentrate the market.

The long tail survives only if infrastructure makes small sellers legible enough to compete.

This shifts the small merchant’s work from building every interface toward maintaining a reliable source of truth.

That source of truth becomes a business asset.

Product names, attributes, images, ingredients, dimensions, variants, certifications, availability, delivery times, return rules, service areas, warranties, and compatibility data sound like clerical details until demand depends on them.

A merchant with beautiful products and broken data can become invisible to agents.

A merchant with mediocre branding and excellent data can become surprisingly competitive.

This will produce a new professional class around “commerce data operations.”

Small businesses will use software to clean catalogs, infer missing attributes, translate descriptions, map categories, generate structured evidence, and monitor how products appear across agents. AI will do much of the work, creating the pleasing recursion of agents helping merchants become legible to other agents.

Errors will matter.

If a model incorrectly infers that a product contains an allergen, demand can vanish. If a merchant’s catalog reports an item in stock when it is not, agents learn to distrust the seller. If dimensions are wrong, returns rise. If a sustainability claim is generated without evidence, legal exposure follows.

The merchant becomes responsible for a machine-readable version of itself.

Data provenance therefore matters. Which fields came from the manufacturer? Which were inferred by a platform? Which were translated? Which came from customer reviews? Which have been verified by a third party?

A human product page can blur these sources.

An agentic market benefits from separating them.

“Manufacturer claims waterproof to ten thousand millimeters” is different from “independent laboratory measured” and different again from “reviewers often describe it as waterproof.”

The machine should know the difference.

The merchant has an incentive to make the strongest credible evidence available.

This can raise the value of certification and testing for small firms. A recognized third-party standard can let an unknown company compete against a famous brand because the agent has something reliable to compare.

Standards become marketing infrastructure.

This is common in business-to-business markets. Industrial buyers demand specifications, test results, compliance documents, and certifications because procurement cannot rely on a package design. Consumer markets may move slightly in that direction as agents professionalize buying.

Not every category benefits.

A bakery’s croissant cannot be reduced to a compliance sheet.

Taste, atmosphere, community, beauty, novelty, and local knowledge remain human. The merchant API handles availability and transaction while the product’s meaning lives elsewhere.

This division can help small firms if agents learn to preserve local and qualitative value.

A user might instruct, “For gifts, prefer independent local businesses unless the price difference is extreme.” The agent can search a category that conventional convenience algorithms often ignore. It can coordinate pickup, check hours, and route payment without asking the merchant to master digital marketing.

Consumer preferences can become economic development policy at household scale.

The machine can enforce “buy local,” “prefer women-owned businesses,” “avoid air freight,” “support union hotels,” or “choose repairable products” more consistently than a human remembers every time.

This creates new stakes around merchant attributes.

Who verifies that a company is local, independent, minority-owned, unionized, environmentally certified, or compliant with a standard? False claims become profitable because agents act on them automatically.

Trust registries will proliferate.

Some will be public. Some private. Some industry-run. Some dubious.

The agent will need to evaluate the evaluator.

Small firms face another opportunity: international demand.

Language has always been a barrier to cross-border commerce. Product descriptions, support, returns, tax, customs, and customer expectations differ. AI translation and agent mediation can reduce the communication cost. A consumer agent can interpret a foreign merchant’s catalog and explain local constraints. A merchant agent can translate inquiries and handle routine service.

This makes niche global markets more reachable.

A small workshop in Portugal can sell to a household in Chicago without building an English-language marketing operation at the same scale. A textile producer in India can respond to a specialized request from Europe. A parts supplier in Taiwan can serve a repair agent elsewhere.

Logistics, tariffs, taxes, payment acceptance, and regulation do not disappear.

In fact they become the binding constraints once language falls.

This is the pattern again: remove one friction and another becomes visible.

Agentic commerce can therefore increase the value of boring trade infrastructure—customs data, standardized product classification, digital identity, electronic invoices, cross-border payments, and reliable postal systems.

A small merchant cannot enjoy global machine demand if packages are trapped in customs for three weeks.

The digital layer depends on physical competence.

Platforms will offer to solve this, and the offer will be hard to refuse.

A merchant can join a commerce network that handles catalog distribution, payment, tax, fraud, fulfillment, returns, and agent integration. The business gets global reach. The platform gains dependence.

This is how infrastructure becomes a moat.

Small merchants will trade autonomy for administrative relief because administrative relief is valuable.

The policy objective should not be to prevent that trade. It should be to keep exit credible.

Can the merchant export its catalog and customer records?

Can it use another payment provider?

Can it reach agents outside the platform?

Can it preserve its domain and brand identity?

Are fees transparent?

Can it move reviews or reputation?

Can it offer better terms through a direct channel without punishment?

These questions determine whether agentic infrastructure empowers small firms or turns them into tenants.

The marketplace era offers a warning. Many small businesses grew rapidly because platforms gave them distribution, trust, and fulfillment. The same businesses could become vulnerable to fee changes, ranking shifts, policy changes, account suspensions, advertising requirements, and competition from other sellers.

Agentic commerce can repeat the story at a higher level.

The platform no longer needs to host the store to govern demand.

A small merchant may own its website and still depend on the agent ranking.

This is why open protocols matter most for the small firm. Large retailers can negotiate direct integrations. Small sellers need common rails that prevent every major assistant from becoming a separate gatekeeper negotiation.

Standards lower fixed costs.

But standards governance can itself favor incumbents if only large companies have resources to shape the rules. The details of product schemas, identity, returns, advertising disclosures, and payment flows can advantage certain business models.

Small-business associations will need technical capacity.

The chamber of commerce of the 2030s may employ protocol experts.

There is a second small-firm revolution hiding on the supply side.

Agents lower the cost of operating the business itself.

The same bakery that exposes orders to consumer agents can use its own agents for procurement, scheduling, bookkeeping, compliance preparation, marketing, customer service, and inventory. The business gains leverage on both sides: cheaper administration and broader demand.

This can change the minimum efficient size of a firm.

A two-person company can behave like a ten-person company in administrative terms. A craft producer can serve international customers without a full sales office. A local service company can respond to requests at all hours without keeping staff on phones.

The fixed cost of being a business falls.

That creates more firms.

It can also create more competition, which squeezes margins. The same technology that empowers the merchant empowers thousands of rivals.

The small firm wins capability and loses excuses.

Quality, trust, taste, location, specialized knowledge, and execution become more important because generic administrative competence is cheap.

This is healthy capitalism if entry remains open.

It is difficult capitalism because the number of competent competitors rises.

The merchant API is therefore not a story about replacing shopkeepers with software.

It is a story about changing what shopkeeping requires.

Less time persuading ten different digital systems to accept the catalog.

More time making the product, service, evidence, and fulfillment good enough that a tireless buyer chooses it.

The old internet told every business it needed a website.

The agentic internet will tell every business it needs an interface.

The best outcome is that the interface stays boring enough for the business behind it to remain interesting.
