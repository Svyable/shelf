# Machine Customers

For most of commercial history, the customer had to spend attention before money could move. The customer might be nowhere near the seller—a letter could order cloth, a catalog could bring a department store into a farmhouse, a telephone could turn a kitchen table into a purchasing desk—but someone still had to notice the need, search, compare, decide, and act. Commerce became remote long before it became delegated.

That boundary is beginning to move.

In September 2025, OpenAI introduced Instant Checkout, allowing a shopper to discover an eligible product in ChatGPT and complete the purchase inside the conversation. The system was deliberately less autonomous than the phrase *agentic commerce* might suggest: the user still confirmed the order, and the merchant remained responsible for payment, fulfillment, returns, and support. In March 2026, OpenAI expanded the Agentic Commerce Protocol into product discovery, giving merchants a way to expose structured product information for comparison inside ChatGPT.

The payment networks were working on the next problem. Visa built infrastructure for agent-initiated transactions, including mechanisms for credentials, authorization, and merchant recognition; by July 2026 it was publishing onchain evidence of agents booking travel, reordering inventory, querying data providers, and buying compute. None of this establishes that autonomous purchasing has become a large share of commerce. It establishes something narrower and more useful: the technical boundary between software that recommends a purchase and software that can participate in completing one is no longer hypothetical.

A machine that can buy the wrong lamp has not abolished the need to care about lamps. Product feeds are incomplete. Preferences are ambiguous. Fraud is real. Returns remain stubbornly physical. Most people still shop as people, and early systems often keep them close to the final click.

The economically interesting change arrives before full autonomy anyway. The customer is becoming delegable.

Consider the difference between a search and a standing instruction. *Show me nonstop flights to Chicago* is a search. *Watch nonstop flights to Chicago for the next six weeks; I need to land before dinner, I will not leave before six in the morning, and buy if the fare falls below $350* is closer to a purchasing policy. So is *reorder these filters when we have two left, unless the price exceeds forty dollars*. Or *renew this software only if the annual increase stays below five percent and there is no cheaper plan with the features we actually use*.

The person has not disappeared. The person has moved upstream, from choosing an item at one moment to defining some of the conditions under which a choice may be made later.

Delegated demand itself is old. Companies buy through procurement departments, brokers, travel desks, and purchasing software. Consumers have long used travel agents and financial advisers. What changes with cheap software agents is the granularity. Hiring a human purchasing agent to save eighteen dollars on a household appliance would be absurd. Giving software a few seconds to check the same market may not be. Decisions too small to professionalize can become worth delegating.

That matters because consumer inattention is already part of many markets. Search takes time. Comparison takes time. Understanding quality takes time. Remembering that a free trial ends Thursday takes a surprisingly scarce kind of time. A slightly worse interest rate can survive because refinancing is annoying. A subscription can renew because cancellation was tomorrow's problem. A grocery store can earn margin partly because nobody visits four competitors to save forty cents on each item.

These arrangements are not necessarily tricks. Convenience has value, sellers incur costs to be available, and consumers rationally stop searching. The point is that the stopping rule is economic. Reduce the cost of another search and some choices change.

Software can keep looking after a person would sensibly stop. It can remember the last price paid, compare a renewal with the original contract, normalize package sizes, watch a fare for weeks, and notice that the same approved office supply is cheaper elsewhere. This is mundane intelligence, which is precisely why it could matter. Most commerce is mundane.

The obvious conclusion is that buyer agents strengthen buyers. The less obvious conclusion is that they do so only where search was the binding friction.

An agent can identify a better bank while moving payroll instructions, automatic payments, integrations, and account history remains painful. It can find cheaper enterprise software while a migration would consume six months of engineering work. It can discover a lower insurance premium while exclusions make the policies non-equivalent. Search cost can collapse while switching cost barely moves.

That distinction is useful because it reveals what a seller's margin is made of. A business protected mainly by obscurity or forgetfulness becomes more exposed. A business protected by integration, network effects, trust, contractual commitments, or genuine product superiority may not. Buyer agents do not automatically make demand perfectly elastic. They can make the remaining sources of inelasticity easier to see.

They can also change what it means to be legible to a customer. A human storefront is designed around presentation: photography, prose, navigation, reputation, merchandising. An agent can use those things too, but structured information becomes unusually valuable when software is comparing offers repeatedly. Price, availability, compatibility, delivery dates, return rules, certifications, product identifiers, and total cost need to survive translation into data.

The storefront acquires a second entrance. People can still wander in through presentation. Software increasingly arrives through structure.

This is where a convenience feature starts to look like market infrastructure. If a buyer agent becomes a common route from intention to purchase, merchants will care about what inventory it can see, how it interprets their data, which payment methods it supports, what counts as a trusted seller, and how offers are ranked. Search engines learned to mediate discovery. App stores learned to mediate software distribution. A buyer agent can mediate demand before the customer has seen a shelf.

That position contains the chapter's strongest counterargument to the simple consumer-empowerment story. The same intermediary that lowers search costs can become a new gatekeeper.

Suppose the principal says, “Find the best option.” Cheapest is easy to measure and often wrong. Best might mean most durable, least likely to require a return, fastest to arrive, made locally, compatible with equipment already owned, privacy-preserving, or merely familiar enough that the household knows how to use it. The agent must turn some mixture of explicit instructions, remembered behavior, inferred preference, merchant data, and platform defaults into a ranking.

Some of those choices belong to the principal. Others arrive through the machinery. A payment provider scores fraud risk. A platform decides which merchants can integrate. A model has learned brand associations from its training data. A retrieval system sees some offers more easily than others. A user never specifies how much to value delivery reliability, so the system supplies a trade-off.

Convenience can therefore become governance without anyone holding a meeting to govern.

This problem is more concrete than the usual philosophical argument about AI alignment. A shopping agent does not need to share a person's theory of the good life. It needs to know when a cheaper hotel is unacceptable because the rate is nonrefundable, when saving five dollars is not permission to reveal private information, and when uncertainty is large enough to ask.

The economics of asking is part of the product. Interrupt for every ambiguity and little has been delegated. Never interrupt and convenience becomes an error generator. Useful buyer agents need authority envelopes: spending limits, merchant restrictions, categories that require confirmation, rules for subscriptions and nonrefundable purchases, and clear boundaries around what information may be disclosed.

The rules may become elaborate because people are elaborate. Today much of that policy lives in memory, habit, family negotiation, irritation from prior mistakes, and sentences such as “I will never fly through that airport again.” Software makes some of it explicit.

Money makes the boundary harder. A conventional card transaction establishes that a credential was presented under certain conditions. An agentic transaction adds another question: was this software authorized to make *this* purchase for *this* principal? That is why payment-industry work has concentrated on credentials, tokens, spending controls, agent identity, merchant recognition, and evidence of delegated authority. Intelligence is insufficient. The agent also needs the right to act.

For a business, those rights can be narrow. A procurement agent might reorder an approved component but lack authority to onboard a supplier. It might negotiate price but not accept a liability clause. It might purchase compute inside a monthly budget but not sign a three-year commitment. “Autonomous buyer” is therefore a misleadingly cinematic description. In practice, the machine customer is more likely to be a bundle of constrained mandates.

Sellers will adapt to those mandates. Today's marketing spends heavily on human psychology: status, familiarity, urgency, story, repetition, fear of missing out. A countdown timer should not make software nervous. A clean product feed may matter more to it. But the comforting leap from “machine buyer” to “rational buyer” is unjustified.

Models can be influenced by presentation. Retrieval favors what it can find. Training data carries brand associations. Platforms can sell placement or prefer integrated inventory. Merchants can optimize descriptions for scoring logic. Fraudsters can manipulate reviews and specifications. The advertising industry does not need to disappear; it needs to learn where the decision is being made.

Some persuasion will still target the person because the person defines the objective. Some will target the agent because the agent selects the offer. Brand may create the desire; structured evidence may win the procurement. The boundary between those functions will be commercially valuable.

It will also be uneven. Buying is not merely error-prone optimization. People buy identity, surprise, taste, ritual, affiliation, memory, and the pleasure of choosing. Someone may happily delegate dishwasher tablets and refuse to delegate a wedding ring. Another person may enjoy comparing dishwashers and gladly outsource the flight search. The interesting question is not whether agents replace shopping. It is which decisions people decide are worth experiencing.

When routine procurement fades into background software, choosing by hand may even acquire new meaning. Browsing the bookstore, picking the bottle, planning the trip, walking through a market with no objective beyond curiosity—friction can be part of the product when the activity itself is wanted.

The more economically important decisions are often less romantic. A business whose software continuously checks cloud prices, freight rates, insurance renewals, and subscriptions can make exit threats more credible where switching is feasible. Millions of consumers could express similar purchasing rules without ever organizing: refuse a fee above a threshold, avoid a category, prefer a certification. Demand can coordinate through common policies without a formal boycott.

Yet aggregation cuts both ways. A platform representing millions of buyers could negotiate discounts on their behalf. It could also charge merchants for access, privilege its own commercial relationships, or become the place where a large share of demand is routed. Digital markets have seen this sequence before: an intermediary removes friction, scale accumulates, and the intermediary itself becomes consequential.

Buyer agents make the pattern more intimate because they may know not only what a person clicked but what the person is trying to accomplish. “Running shoes” reveals interest. “Shoes for a seventy-year-old recovering from knee surgery who walks four miles a day and values stability over speed” reveals something closer to a purchasing function.

The better an agent represents its principal, the more commercially valuable that representation becomes.

This makes privacy part of market design. A buyer agent may improve with access to sizes, schedules, household composition, travel patterns, recurring expenses, risk tolerance, brand preferences, ethical commitments, and budget. A merchant would often like some of the same information. Those interests are not identical. The seller may need to know that the buyer is authorized to pay; it does not necessarily need to know the buyer's maximum willingness to pay.

A human negotiator does not begin by announcing the highest price they will accept. An agent that leaks that number is not a negotiator. It is a salesperson's dream.

Once software can represent demand, supply will answer in kind. Seller systems will learn to recognize agents, quote them, verify them, rank them, negotiate with them, and infer what they can about the principals behind them. Some transactions will become faster and cheaper. Some will become harder for an ordinary person to inspect because the decisive interaction happened between systems and is preserved, if at all, in logs no customer reads.

That is the more durable meaning of the machine customer. It is not a robot with a wallet, and it does not require the death of shopping. It is demand acquiring software: preferences that persist, search that continues, authority that can be bounded, and purchasing rules that can execute while the principal is doing something else.

Markets have spent centuries adapting to new kinds of seller. The next adjustment begins when part of the buyer arrives before the person does.