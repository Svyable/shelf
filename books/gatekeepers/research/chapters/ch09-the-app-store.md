# Chapter 9 evidence notes — The App Store

## Core claim

The app store is simultaneously a trust institution, a distribution channel, a commercial intermediary, and part of an operating-system security architecture. Analysis improves when those functions are separated. A restriction justified by malware prevention, privacy, or device integrity should not automatically justify exclusive control over distribution, steering, payments, or adjacent markets.

## Sources

### Apple — App Review Guidelines

- https://developer.apple.com/app-store/review/guidelines/
- Apple describes the App Store as a curated environment in which apps are reviewed and scanned for malware and other software that may affect safety, security, and privacy.
- The guidelines cover app completeness, privacy, user consent, subscriptions, payments, platform APIs, harmful conduct, legal compliance, and other requirements.
- Current rules include storefront- and region-specific provisions for external purchase links and other payment methods.

### European Commission — Digital Markets Act, app distribution

- https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en
- The Commission says the DMA requires designated gatekeepers to allow third-party app-store or web distribution under the law's framework and to permit developers to steer users toward alternative purchase channels.
- The page identifies Apple's App Store and Google's Play Store as designated gatekeeper app stores and describes obligations concerning alternative distribution, steering, in-app purchase systems, and access conditions.

### European Commission — DMA designated Gatekeepers

- https://digital-markets-act.ec.europa.eu/gatekeepers-portal_en
- Lists Apple's App Store and iOS among designated core platform services.
- Useful for the chapter's distinction between the platform operating system and the app-distribution service as related but separately regulated gates.

### Apple Support — Alternative app distribution

- https://support.apple.com/en-ie/118110
- Apple states that alternative app marketplaces or web distribution are available in specified regions, including the European Union, Brazil, and Japan as of the source's current publication.
- Apps distributed outside the App Store still undergo Apple's notarization process for baseline platform integrity standards, while alternative distributors can apply their own review policies.
- Supports the chapter's claim that distribution control and baseline platform-security review can be institutionally separated.

### Apple Support — Installing apps through alternative distribution

- https://support.apple.com/en-ie/117767
- Describes the user steps and warnings associated with installing apps from alternative marketplaces or developer websites where available.
- Useful counterevidence: alternative distribution can shift trust, support, and security responsibilities toward users and third-party distributors.

## Boundaries and counterevidence

- The chapter does not claim that every App Store restriction is anticompetitive. Device security, fraud prevention, privacy, age controls, payment integrity, and user trust are real functions.
- The existence of platform fees does not by itself prove extraction; stores and payment systems provide costly services.
- Alternative distribution can increase user choice while also increasing fragmentation, support burden, fraud risk, and the amount of trust judgment pushed onto users.
- A platform can legitimately impose baseline integrity standards on software that runs on its operating system even when distribution is decentralized.
- Region-specific rules change quickly. The manuscript avoids treating one storefront's payment-link rules as globally universal.
- The chapter's focus is institutional structure, not a legal conclusion about any specific company's conduct.
- Competition and security are not opposites; the question is whether the same safety outcome can be achieved through a narrower or less exclusive gate.

## Design implications under test

1. Decompose bundled gatekeeper functions before evaluating necessity.
2. Require each restriction to identify the risk or coordination problem it solves.
3. Prefer narrower protections when exclusive control is not needed for the stated safety function.
4. Measure compliance burden on small entrants as well as incumbents.
5. Make operational rules predictable enough that entrants do not need insider knowledge to comply.
6. Preserve appeals that can correct review errors in commercially useful time.
7. Treat conflicts seriously when a gatekeeper regulates a market in which it also competes.
8. Recognize that alternative channels can reduce dependency while shifting trust and support costs elsewhere.

## Forward link

Chapter 10 follows the transaction into payments. A payment rail is valuable because it rejects some transactions, merchants, and fraud—but control of the financial path can also determine who is practically able to participate in commerce.