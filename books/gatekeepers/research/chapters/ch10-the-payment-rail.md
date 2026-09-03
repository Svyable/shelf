# Chapter 10 evidence notes — The Payment Rail

## Core claim

Payment systems create value by authorizing, routing, settling, allocating risk, enforcing rules, and rejecting some transactions. The same infrastructure can also make commercial participation conditional on continued approval by several intermediaries at once. Payment access is therefore best analyzed as a stack of permissions rather than a single merchant-provider relationship.

## Sources

### Federal Reserve — The Fed Explained: Payment Systems

- https://www.federalreserve.gov/aboutthefed/fedexplained/payment-systems.htm
- Defines the payment system broadly across currency, checks, ACH, and wholesale payment services.
- Supports the chapter's distinction between money and the mechanisms used to move claims on money.

### Federal Reserve — Regulation II definitions and commentary

- https://www.federalreserve.gov/frrs/regulations/section-2352-definitions.htm
- https://www.federalreserve.gov/frrs/regulations/appendix-a-official-board-commentary-on-regulation-ii.htm
- Separates merchant, acquirer, issuer, processor, and payment-card-network roles.
- A payment-card network routes information and data from the acquiring side to the issuer for authorization, clearance, and settlement.
- An acquirer contracts directly or indirectly with a merchant to provide settlement for debit transactions over a payment-card network.

### Federal Reserve — Pay-by-Bank and merchant payments

- https://www.federalreserve.gov/econres/notes/feds-notes/pay-by-bank-and-the-merchant-payments-use-case-benefits-20250707.html
- Describes pay-by-bank as an account-to-account merchant-payment alternative routed over ACH or instant-payment rails rather than card-network intermediaries.
- Supports the argument that alternative rails can discipline gatekeeping without being perfect substitutes for cards.

### Federal Reserve — 2025 triennial payments study, initial findings

- https://www.federalreserve.gov/newsevents/pressreleases/other20260701a.htm
- Reports 236.6 billion U.S. noncash payments by consumers and businesses in 2024.
- Cards accounted for more than three quarters of noncash payments by number; ACH accounted for the majority by value.
- Used only to demonstrate why automated payment controls are unavoidable at current scale.

### Stripe — Prohibited and Restricted Businesses

- https://stripe.com/legal/restricted-businesses
- Stripe states that it must comply with financial laws as well as rules and policies of card networks and banking partners.
- Distinguishes prohibited businesses from restricted activities that may require additional review.
- Supports the chapter's claim that one merchant-facing decision may reflect several upstream gatekeepers and different kinds of risk.

### Visa — Core Rules and Product and Service Rules

- https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf
- Public network rules illustrate the breadth of private operating requirements governing merchant acceptance, transaction handling, disputes, data, and prohibited practices.
- The chapter uses these rules as evidence of private network governance, not as proof of wrongdoing.

## Boundaries and counterevidence

- The chapter does not claim that every lawful business is entitled to payment processing on any terms. Providers face fraud, credit, chargeback, legal, partner, operational, and reputational risks.
- Merchant underwriting can reflect real exposure because intermediaries may be liable for disputes or losses after a merchant has already received funds.
- A processor's denial may originate partly from bank-partner, network, or legal requirements; assigning responsibility requires mapping the actual chain.
- Alternative rails such as ACH, instant payments, wire, cash, and pay-by-bank are not perfect substitutes. They differ in user experience, dispute rights, acceptance, cost, settlement, and fraud characteristics.
- Multi-sided pricing is genuinely complex; the chapter does not infer anticompetitive pricing from fee levels alone.
- Fraud models and automation are necessary at payment-system scale. The critique concerns escalation, explanation, and proportionality at the edge of automated decisions.
- Security transparency cannot be absolute; detailed fraud rules can be gamed. The chapter argues for bounded explanations that let legitimate participants understand the category of problem without publishing an evasion manual.

## Design implications under test

1. Map each payment permission layer instead of compressing every denial into the processor's name.
2. Distinguish illegal activity, network prohibition, financial risk, technical limitation, and discretionary corporate policy.
3. Prefer conditional approval—reserves, limits, authentication, delayed settlement—where risk can be bounded rather than eliminated only by exclusion.
4. Scale process safeguards with the consequence and duration of the decision: a declined transaction and a terminated merchant account are not equivalent.
5. Preserve meaningful substitute rails where possible; competition between routes can discipline gatekeepers even when substitution is incomplete.
6. Require a stronger institutional justification as payment infrastructure is asked to enforce goals farther from fraud, legal compliance, or payment-system integrity.
7. Allow automated systems to express uncertainty and route ambiguous cases into proportionate review rather than maximum penalty.
8. Provide bounded, actionable reasons for consequential merchant restrictions whenever doing so does not materially compromise security.

## Forward link

Chapter 11 moves inside organizational procurement. A business can have budget, need, and a willing supplier yet still be blocked because the supplier has not crossed the institution's internal vendor gate.