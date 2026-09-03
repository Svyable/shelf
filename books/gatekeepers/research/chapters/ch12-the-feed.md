# Chapter 12 evidence notes — The Feed

## Core claim

A feed gatekeeps attention rather than existence. Moderation, recommendation eligibility, ranking, and user preference controls are distinct layers. Recommendation solves a real abundance problem, but because ranking determines the probability of exposure, it can shape creator incentives, commercial outcomes, and public attention without removing content.

## Sources

### YouTube Help — YouTube's Recommendation System

- https://support.google.com/youtube/answer/16089387
- YouTube describes recommendations as a personalized system intended to help viewers find videos and improve long-term satisfaction.
- Signals can include watch and search history, subscriptions, likes/dislikes, explicit feedback, satisfaction surveys, device/context, and how content performs when offered to viewers.
- Different surfaces, such as Home and Up Next, answer different recommendation questions.

### YouTube Help — How YouTube recommendations work

- https://support.google.com/youtube/answer/141805
- Describes recommendations across Home, Up Next, Shorts, and other surfaces.
- Explains user controls including deletion or disabling of watch history, likes/dislikes, Not interested, and Don't recommend channel.
- Supports the chapter's claim that users can influence the recommendation gate and, in some cases, remove historical signals.

### YouTube Help — Search and discovery tips

- https://support.google.com/youtube/answer/11914225
- YouTube says recommendation depends on appeal, engagement, satisfaction, audience context, topic interest, and competition with other videos a viewer might choose.
- Used as counterevidence against assuming every low-reach outcome is deliberate suppression.

### TikTok Support — For You

- https://support.tiktok.com/en/getting-started/for-you/for-you
- TikTok describes For You as a personalized recommendation feed.
- Provides a Why this post explanation and user controls including Not interested, refresh, keyword filters, and topic management.
- TikTok also distinguishes content removal from recommendation eligibility: posts can be made ineligible for For You and harder to find in search without necessarily being removed from the service.

### TikTok Newsroom — How TikTok recommends videos #ForYou

- https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you
- Describes user interactions, video information, and device/account settings as recommendation inputs, with different signals carrying different weights.
- Useful as background for the chapter's feedback-loop and contextual-ranking discussion.

### European Commission — DSA: Very large online platforms and search engines

- https://digital-strategy.ec.europa.eu/en/policies/dsa-vlops
- States that very large online platforms and search engines must provide at least one recommender-system option that is not based on user profiling.
- Supports the chapter's 'right to choose the chooser' framing as an institutional design question, not a claim of neutral ranking.

### European Commission — User rights under the Digital Services Act

- https://digital-strategy.ec.europa.eu/en/factpages/user-rights-under-digital-services-act
- States that platforms must explain the main parameters used in content recommendation systems and how those parameters influence what users see.
- Identifies Articles 27 and 38 as the relevant recommender-system provisions.

### European Commission — 2024 recommender-system information requests

- https://digital-strategy.ec.europa.eu/en/news/commission-sends-requests-information-youtube-snapchat-and-tiktok-recommender-systems-under-digital
- Shows the Commission asking YouTube, Snapchat, and TikTok about recommender-system design, parameters, and systemic risks involving mental wellbeing, civic discourse, minors, and harmful content.
- Used to demonstrate that recommender systems are now treated as systemic governance objects, not to claim a final finding of wrongdoing.

### European Commission — 2026 DSA enforcement examples

- https://digital-strategy.ec.europa.eu/en/news/commission-investigates-grok-and-xs-recommender-systems-under-digital-services-act
- https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-addictive-design-instagram-and-facebook-breach-digital-services-act
- https://digital-strategy.ec.europa.eu/en/news/commission-launches-investigation-shein-under-digital-services-act
- These are current enforcement or preliminary-investigation materials and must remain framed as such; they are not final proof that every allegation is established.

## Boundaries and counterevidence

- The chapter does not claim that ranking is censorship. Removal, recommendation eligibility, and ranking are analytically distinct.
- A creator has no general right to equal recommendation; attention is scarce and ranking is unavoidable once eligible supply exceeds what users can consume.
- Low reach is not proof of hidden punishment. Competition, audience interest, timing, topic demand, and ordinary probabilistic variance can explain distribution outcomes.
- Users possess preferences independent of recommendation systems and can deliberately search, follow, ignore, or leave. The chapter treats preference as interaction, not platform manufacture.
- Item-level explanations cannot by themselves establish system-level fairness or harm; population-level auditing and research require different evidence.
- Non-profiled or chronological feeds are not neutral. They substitute another ranking logic for profiling.
- Regulatory investigations and preliminary findings are not final adjudications and should not be presented as established violations.

## Design implications under test

1. Distinguish hosting, recommendation eligibility, ranking, and paid distribution in both product design and public explanation.
2. Give users meaningful controls over recommendation logic, including the ability to reset or forget stale preference history.
3. Expose major ranking parameters without pretending a simplified explanation is a complete causal account.
4. Make explicit recommendation restrictions observable to creators when practicable.
5. Evaluate system-level effects statistically rather than treating every individual low-reach event as an appealable deterministic decision.
6. Preserve research and audit access where important distribution effects cannot be observed from outside the platform.
7. Treat ranking objectives as governance choices: engagement, satisfaction, safety, and long-term value create different habitats for content.
8. Separate commercial incentives from safety and quality decisions enough to make conflicts inspectable.
9. Let evidence decay; cheap memory should not cause a temporary user state to become a permanent recommendation identity.

## Forward link

Chapter 13 moves from allocating human attention to allocating machine access. An API key is a portable permission object whose scope, quota, rate limits, expiration, and revocation can determine whether software can participate at all.