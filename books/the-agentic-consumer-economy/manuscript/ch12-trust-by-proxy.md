# Trust by Proxy

A credit card was designed around a simple story.

A person wants to buy something. The person presents a credential. The merchant requests payment. Banks and networks decide whether to authorize the transaction. If fraud or a dispute appears later, the system has rules for deciding who bears the loss.

The story became more complicated online because the merchant could no longer see the customer. Passwords, CVV codes, one-time codes, device signals, fraud models, digital wallets, tokenization, and strong customer authentication all grew around the question of whether a remote transaction was really authorized.

Agentic commerce adds a stranger to the story.

The person wants something.

The person authorizes software to decide exactly what satisfies the request.

The software selects a merchant.

The software pays.

Who, precisely, made the purchase?

Legally, the human or organization remains the principal. Economically, the agent is a delegate. Operationally, payment systems need something more concrete than philosophy. They need to know that the agent is allowed to act, under what conditions, for how much, for which kinds of goods, and whether the person must be present at the moment of payment.

The mid-2020s produced an unusual burst of infrastructure work around this problem.

Google’s Agent Payments Protocol proposed digital mandates linking user intent to agent action. Mastercard developed Verifiable Intent and Agent Pay. Visa built a Trusted Agent Protocol so merchants could recognize approved commerce agents rather than treating every automated visitor as an anonymous bot. Stripe worked on scoped agent payments and later an open Machine Payments Protocol for software buying digital services. In April 2026 the FIDO Alliance created an Agentic Authentication Technical Working Group and began standards work drawing on contributions including Google’s AP2 and Mastercard’s Verifiable Intent.

The names will change.

The problem will not.

Delegated money requires delegated trust.

It helps to separate three questions that ordinary card payments often collapse into one moment.

The first is authentication: who or what is appearing at the merchant?

The second is authorization: what has that actor been permitted to do?

The third is accountability: when the permitted actor does the wrong thing, who answers for the loss?

Agentic commerce can solve one and still fail the others.

A merchant may verify perfectly that a request came from a legitimate agent provider and still have no good evidence that the consumer authorized this particular category of purchase. A payment network may know that the consumer created a valid mandate and still be unable to tell whether the agent respected an important preference embedded in the request. A user may have authorized the agent broadly enough for the charge to be technically valid while reasonably believing the agent would not choose a nonrefundable hotel, a subscription, or a seller with a weak return policy.

Trust is a chain, not a badge.

Visa’s current Trusted Agent Protocol makes the authentication problem unusually concrete. Merchants have spent years treating unfamiliar automated traffic as something to block, throttle, or challenge. A commerce agent can look like a scraper, a resale bot, a credential attacker, or a denial-of-service nuisance from the outside. Visa’s protocol describes cryptographic signatures that let participating merchants distinguish approved agents, link an agent interaction to consumer or device identity when appropriate, and carry payment-related information. It also lets a merchant constrain what an agent can do according to the declared purpose of the interaction.

That last part matters.

A browsing agent asking whether a blue jacket is in stock should not automatically receive the authority to place an order. A recognized agent is not an omnipotent agent. Merchant-side least privilege matters too.

This is a quiet change in the relationship between bot defense and commerce.

For years, the merchant’s problem was deciding which machines to exclude.

Now some machines are customers.

The merchant needs a way to recognize the difference without simply opening the door to every automated request. Recognition becomes commercial infrastructure.

A human assistant with a corporate card demonstrates the old version. The employee is authorized to spend company money for certain purposes. The company sets limits. Receipts are collected. Some purchases need approval. Misuse can lead to discipline or legal action. The payment card alone does not define the authority; organizational rules surround it.

Consumer agents need a machine-readable version of the rules.

“Buy routine groceries up to four hundred dollars per week.”

“Book travel under company policy.”

“Reorder this prescription only from the approved pharmacy and never change dosage.”

“Purchase replacement parts under two hundred dollars if the model number matches.”

“Never transact with a new merchant without confirmation.”

“Pay for cloud services only from this project budget.”

These are mandates.

The payment system should be able to distinguish them from a general instruction to spend anything anywhere.

This is why scoped credentials are attractive. Instead of handing an agent the digital equivalent of the card number and trusting it forever, the system can issue a token valid for a narrower purpose, merchant, amount, time window, or transaction.

Security engineering has been moving in this direction for years. Least privilege is a basic principle: give a system only the authority it needs.

Agentic commerce turns least privilege into a consumer product requirement.

The temptation will be convenience.

A user will be asked whether the agent can “handle purchases for you.” The easiest setting is broad permission. The most secure setting is constant confirmation. Neither extreme is attractive.

If the person must approve every low-stakes transaction, the agent saves little effort. If the agent has unrestricted authority, one compromised instruction can become a financial disaster.

The practical system needs graduated autonomy.

Low-cost, familiar, reversible transactions can proceed automatically. New categories, unusual merchants, large amounts, regulated goods, sensitive services, or deviations from normal behavior trigger stronger checks.

Reversibility belongs in that calculation.

A ten-dollar grocery substitution can be annoying. A nonrefundable international ticket can strand hundreds of dollars. A monthly software subscription may be cancellable. A same-day wire or crypto transfer may be effectively irreversible. A good authorization system should care not only about amount but about how hard the action is to undo.

This is a lesson finance learned long before agents. Risk is partly about magnitude and partly about recoverability.

A system can therefore allow a familiar agent to reorder household staples automatically while requiring confirmation before a first purchase from an unknown foreign merchant, a long-term financing commitment, or a transaction with weak dispute rights.

The point is not to create a universal risk table.

It is to make the cost of error part of the permission.

This resembles the fraud systems card networks already operate. A routine grocery purchase near home looks different from an expensive transaction in another country. The difference is that agentic systems must evaluate not merely whether the transaction resembles the user but whether it satisfies delegated intent.

A strange transaction can be correct.

The user may have told the agent to buy a rare machine part from another country at three in the morning when it becomes available.

The payment network sees anomaly.

The mandate sees purpose.

Combining the two can reduce false declines without reducing security.

This is one reason verifiable intent is conceptually important. A record of authorization can say: the user asked for this class of outcome, the agent selected this transaction within the rule, and the payment was made under that authority.

But authorization is not the same as good judgment.

Suppose the user says, “Buy a refundable hotel under three hundred dollars.” The agent purchases a nonrefundable room for two hundred and fifty. The merchant accurately represented the policy. The payment went through.

The transaction may be authorized in the broad sense that the user empowered the agent to book lodging, and still be wrong in the practical sense that the agent violated a material constraint.

Who bears the loss?

Traditional card disputes are not designed to resolve every agent reasoning error. The merchant delivered exactly what was purchased. The bank authorized the payment. The defect lies in representation.

That is the accountability problem.

The obvious but inadequate answer is “the user approved the agent.” People approve many systems because institutions stand behind them. A driver does not accept all mechanical risk merely by entering a car. A depositor does not personally audit bank software. A cardholder does not negotiate chargeback rules before every purchase. Adoption grows when liability is allocated in predictable ways and ordinary mistakes have a path to remedy.

Agent providers will therefore need warranties, guarantees, liability rules, or insurance for execution errors.

Without them, “autonomous shopping” can become a legal trick in which the user receives convenience while bearing every error the software makes.

The allocation of liability will shape adoption.

Consumers tolerate imperfect recommendation systems because the human makes the final decision. If a movie suggestion is bad, nothing serious happens. A system that spends money needs stronger assurance.

This creates a market for agent quality beyond model benchmarks.

Transaction accuracy. Policy compliance. Fraud resistance. Dispute resolution. Auditability. Merchant authentication. Ability to recognize manipulated instructions. Reliable escalation.

These properties can matter more to consumers than whether the agent writes a more elegant paragraph.

They are also properties that can be measured after deployment.

What percentage of autonomous transactions are later reversed because the agent violated a user rule? How often does a system escalate when it should? How many legitimate purchases does fraud protection block? How quickly are disputes resolved? Does the provider absorb losses when its software plainly deviates from the mandate, or does it route every complaint back to the merchant and bank?

A mature agent market will need operational evidence of trustworthiness, not just demonstrations of capability.

Payment networks are well positioned because trust has always been their business. They sit between buyers, banks, and merchants, maintain rules, absorb or allocate fraud risk, and operate global acceptance infrastructure. Agentic commerce gives them a new role: identifying a legitimate machine acting for a legitimate principal.

The network can become the notary of delegated demand.

This is strategically valuable because AI platforms might otherwise try to own the full transaction. The payment layer can assert independence: the consumer can use different agents while retaining trusted payment credentials and dispute rights.

Open standards can support this portability.

A user should not need a separate financial identity for every assistant. The agent can present proof that it is authorized without becoming the owner of the underlying account.

This resembles the way digital wallets tokenized cards. The wallet improved the interface while banks and networks retained the financial relationship.

Agent platforms may want more.

A company that controls both the assistant and the wallet gains an extraordinary view of intention and spending. It can connect what the user asked with what the user bought. That is commercially powerful and sensitive.

Banks face the same temptation. A bank-owned consumer agent can see balances, cash flow, bills, credit, and transaction history. It can give unusually good purchasing advice because it knows what the household can afford.

It can also steer commerce toward the bank’s own products or partners.

The line between financial adviser, shopping agent, and distribution channel blurs.

Fiduciary concepts will enter debates even where formal fiduciary law does not apply. Consumers will ask a basic question: whose interest is this agent supposed to serve?

Payments make the answer unavoidable because incentives become visible in money.

Fraudsters will ask different questions.

Can the agent be tricked into buying something?

Can a malicious merchant manipulate its instructions?

Can an email, product description, webpage, or document contain text that causes the system to ignore the user’s rules?

Can an attacker impersonate a merchant endpoint?

Can stolen agent credentials be replayed?

Can a compromised household device request purchases through the trusted agent?

Can a seller falsely claim that the user approved an upsell?

Agentic commerce inherits the entire cybersecurity problem and adds money.

Prompt injection is particularly relevant because general-purpose agents consume untrusted content. A product page is not merely information; it can become adversarial input. A malicious page could include hidden or visible instructions intended to influence the model.

A payment-capable agent must treat merchant content as data, not authority.

This sounds obvious in security language and remains difficult in systems whose core capability is following language.

The safest architectures separate planning, data retrieval, policy enforcement, and payment authorization. The model can propose an action, but a deterministic policy layer checks whether it fits the user’s mandate before money moves.

The agent should not be able to talk the policy layer out of the policy.

This is another place where boring software can matter more than intelligence.

Budgets. Allowlists. Category restrictions. Transaction ceilings. Merchant identity. Cryptographic signatures. Device approval. Risk scoring. Audit logs.

The 2030s consumer agent may feel conversational on the surface and look like an enterprise security system underneath.

The standards work is still unsettled enough that this architecture should not be mistaken for a finished industry consensus. FIDO’s 2026 announcement was notable precisely because authentication and authorization models had largely been built for direct human interaction rather than delegated agent action. Google, Mastercard, Visa, Stripe, payment networks, wallets, merchants, browsers, and agent providers are exploring overlapping pieces of the problem.

That uncertainty is healthy to admit.

A protocol can prove that a particular agent signed a request and still leave open which organization certifies the agent, how certification can be revoked, whether rival payment schemes recognize the same credentials, how a user moves mandates between providers, and what evidence a court or regulator accepts after a dispute.

Cryptography can establish facts.

Institutions decide what those facts mean.

This is why a universal trust mark by itself would be insufficient. If one network or platform controls the registry of “trusted” agents, recognition can become a gatekeeping business. Merchants benefit from being able to distinguish legitimate automation from malicious bots, but rival agents also need a credible route to become legitimate. Trust systems must manage exclusion as carefully as inclusion.

The payment-security problem therefore contains a competition problem.

Children and families make the permission structure more complicated.

A parent may give a teenager a monthly spending budget but restrict categories. A caregiver may purchase groceries for an elderly relative without access to unrelated accounts. A household employee may buy supplies but not view full transaction history. A separated couple may share child expenses without sharing personal purchases.

Payment permissions become social boundaries.

Digital wallets already support some family functions. Agents will require richer delegation because they act across contexts.

This can improve financial autonomy when designed well. A teenager can learn budgeting with real constraints. A caregiver can help without gaining excessive access. A small business can delegate purchasing without handing an employee the owner’s card.

Designed badly, the same tools become surveillance.

The person who controls the household agent can monitor every purchase, set hidden restrictions, or use financial permissions coercively. Technology does not resolve power inside relationships.

Consumer-protection design has to account for vulnerable users, not just ideal households.

There is also the question of human-not-present payments.

Agentic payment work explicitly addresses scenarios where an agent acts based on prior authorization while the user is offline. The example is easy to understand: buy a limited ticket the moment it becomes available under predefined conditions.

Human absence is economically powerful because it lets demand operate continuously.

The agent can book a canceled reservation at 2:13 a.m., buy an item when the price falls, renew a service before a deadline, or acquire a digital service when another software process needs it. Stripe’s Machine Payments Protocol pushes the idea beyond shopping on behalf of people: an agent can pay for data, API access, or other machine-consumable services programmatically rather than stopping to create an account and negotiate a conventional checkout.

The consumer case and the machine-to-machine case should not be confused.

A household assistant buying concert tickets is exercising delegated human demand. A software agent paying for an API call may be spending within a project budget to continue its own workflow. The technical plumbing can overlap while the accountability chain differs.

The useful common principle is that payment authority can be expressed before the moment of purchase and bounded by rules.

But human absence changes dispute psychology.

“I did not click buy” becomes true even for legitimate transactions.

Consumers will need a new mental model. Authorization moves from the moment of purchase to the rule that preceded it.

This is similar to automatic payments today. A person authorizes a subscription once and later charges happen without active approval. The difference is that the future agent may choose the merchant and amount dynamically.

The mandate becomes the contract with the machine.

Good interfaces will need to make mandates understandable.

A paragraph of legal text is not enough. The user should know the practical boundary: what can this agent spend, where, how often, for what, and what causes it to ask me?

The system should make broad authority feel broad.

One of the failures of digital consent has been presenting consequential permissions as routine taps. Agentic finance raises the cost of that habit.

Merchants also need confidence.

A seller wants to know that an agentic order will not produce an unusual chargeback simply because the person later forgot authorizing the rule. Trust has to work both ways. Verifiable mandates can protect merchants by proving that a purchase satisfied the consumer’s standing instruction.

This can reduce fraud losses and make merchants more willing to accept autonomous transactions.

The dispute system becomes a three-part inquiry.

Did the user authorize the mandate?

Did the agent obey it?

Did the merchant fulfill the resulting contract?

Each failure belongs to a different actor.

The distinction can become even more useful if the evidence is split the same way. The mandate records the user’s authority. The agent log records how a choice was made. The merchant record captures the offer and fulfillment. Payment records establish what moved and when.

A dispute no longer has to become one giant argument about whether “AI made a mistake.”

It can ask where the chain broke.

Payment networks and regulators will eventually encode these distinctions.

Insurance may emerge around them. Agent providers can insure execution errors. Merchants can insure fraud. Consumers can receive guarantees for authorized-agent mistakes above a threshold. Premium agents may differentiate by stronger protection rather than better recommendations.

Trust becomes a product feature with a balance sheet behind it.

This is how new technologies mature. Early markets sell capability. Mature markets sell assurance.

The first online stores asked consumers to believe that entering a card number into a browser was safe. Over time, security became infrastructure and buyers stopped thinking about the cryptography.

Agentic commerce will follow the same path if it succeeds.

People will stop marveling that software can pay.

They will assume that the right software can pay the right amount to the right merchant under the right authority and that somebody answerable will fix it when the chain breaks.

That final clause is the real product.

Delegation is easy when nothing goes wrong.

Trust begins at the refund desk.
