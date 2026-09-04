# Artificial Identity — research brief

This research file is the evidentiary boundary for Sven Hardy Benson's *Artificial Identity: The Other You Machines Are Building*.

The manuscript is intentionally thesis-driven, but the thesis is not permission to blur separate technical and legal concepts into a single dramatic story. The book should remain useful if individual products change, if current AI enthusiasm cools, or if several of the most ambitious agent forecasts fail.

## Working proposition

The book uses **artificial identity** to mean:

> A computational representation of a real person that becomes consequential enough to classify, predict, authenticate, price, recommend, deny, permit, persuade, simulate, or act in relation to that person.

Three conditions matter.

1. **Representation.** The system carries some model, score, profile, embedding, biometric template, memory, inferred attribute set, behavioral pattern, or agent context associated with a person.
2. **Operational use.** The representation participates in a decision, ranking, interaction, authorization, simulation, or action. A dormant database row is personal data; it becomes part of the book's stronger identity claim when systems begin relying on it as a proxy for the person.
3. **Consequence.** The use affects what the person sees, pays, receives, may access, is suspected of, is predicted to do, or has done on their behalf.

The phrase is deliberately broader than official **digital identity**, which in standards such as NIST SP 800-63-4 is concerned with identity proofing, authentication, federation, and related assertions. It is also broader than **synthetic identity**, a term with an established payments-fraud meaning. The manuscript must preserve those distinctions every time the terms meet.

## The core synthesis

The book's central historical movement is:

**verification → inference → delegation**

This is a conceptual ordering, not a claim that the three stages happened once, globally, or in a strict sequence.

### Verification

Traditional institutional identity systems bind a claimant to records, credentials, accounts, rights, or obligations. Names, documents, passwords, authenticators, biometrics, certificates, and federation assertions live here. NIST SP 800-63 Revision 4 is a current high-quality map of this territory.

### Inference

Data systems increasingly infer attributes and likely behavior rather than waiting for direct disclosure. The 2013 Kosinski-Stillwell-Graepel PNAS paper demonstrated that Facebook Likes could predict multiple personal attributes in its study population. The 2015 Youyou-Kosinski-Stillwell paper found that computer judgments based on Likes could outperform human judges on the study's Big Five personality measure after enough Likes were available. These studies are important demonstrations, not universal laws about all people or all behavioral data.

FTC work on data brokers, big-data analytics, and surveillance pricing documents an institutional market in which observed and inferred characteristics can be used to segment consumers and, in some contexts, influence offers or prices. CFPB guidance on adverse-action notices confirms that some creditors use complex predictive models and that the use of unconventional data does not remove the legal requirement to give specific reasons for adverse credit decisions.

### Delegation

Agentic systems create a new boundary because software may receive credentials, tools, and authority to act on behalf of a human or organizational principal. This is not entirely new: OAuth, service accounts, workflow engines, delegated administration, and robotic process automation all predate the current agent wave.

What is changing is the combination of open-ended planning, natural-language instruction, persistent context, tool use, and delegated credentials.

RFC 8693 already distinguishes **impersonation** from **delegation** in token exchange. Model Context Protocol authorization uses OAuth-based flows for clients making protected requests on behalf of resource owners. OpenID Foundation work in 2025–2026 and NIST's February 2026 concept paper explicitly identify software/AI-agent identity, authorization, auditing, delegation, and non-repudiation as live infrastructure problems.

The manuscript's claim is therefore not that AI invented delegation. It is that increasingly general software representatives make the **identity of the actor, principal, authority chain, and remembered preferences** a mainstream human problem rather than a specialist enterprise-security detail.

## What is genuinely new here

The words are not the novelty.

The phrase **algorithmic identity** has substantial prior art, notably John Cheney-Lippold's *We Are Data: Algorithms and the Making of Our Digital Selves* (2017). Academic work has used **artificial identity** in discussions of hybridized human identity and the malleability of artificial persons. Human-digital-twin research explores computational representations of people. Research on generative agents now tests models that simulate the attitudes and behavior of specific individuals. Identity standards communities are actively working on agent authorization.

The book should therefore never claim that nobody has discussed data selves, algorithmic identity, human digital twins, artificial identity, delegated software, or AI agents.

The stronger and more defensible originality claim is the book's connective thesis:

> **When a computational model of a person enters the causal path between that person and the world, it begins functioning as identity infrastructure. AI is moving that proxy from classification to prediction to delegated action.**

This frame joins fields that are often discussed separately: identity proofing, data brokerage, recommendation, consumer scoring, biometrics, behavioral inference, personalization, digital twins, persistent AI memory, and software-agent authorization.

The manuscript should earn the connection chapter by chapter rather than announcing it as a universal truth.

## Prior-art boundary

### Cheney-Lippold — algorithmic identity

*We Are Data* is direct prior art for the argument that algorithms classify people into categories that may not match their self-understanding. The new manuscript should cite and respect that lineage. Its extension is to ask what happens when those representations become increasingly predictive, generative, persistent, and delegated.

### Babushkina & Votsis — artificial identity

Their 2021/2022 *AI and Ethics* article uses artificial identity in the context of human-machine hybridization and cognitive extension. That is adjacent but not identical to the book's operational definition. The manuscript is focused less on philosophical hybridization and more on computational representations that mediate real-world decisions and actions.

### Robot Ethics 2.0 — artificial persons

The 2017 Oxford chapter titled “Artificial Identity” addresses identity persistence and responsibility in artificial beings capable of changing memories, preferences, or moral character. That is an important collision in terminology. Benson's book deliberately reverses the usual direction: before asking how a machine preserves its identity, ask how machines construct and operationalize identities for humans.

### Human digital twins

Recent work, including Stanford's generative-agent simulations and scholarship on platformized “digital human twins,” comes unusually close to the book's terrain. The manuscript should use this work as evidence that computational stand-ins are becoming technically more expressive, while avoiding the implication that any current model is a faithful duplicate of a human being.

## Evidence that supports the opening act

### 1. Digital behavior can support non-obvious inferences

Kosinski, Stillwell, and Graepel (2013) showed that Facebook Likes in their dataset could predict multiple sensitive attributes. The correct manuscript claim is **possibility under demonstrated conditions**, not omniscience.

Youyou, Kosinski, and Stillwell (2015) found that computer-based Big Five judgments from Likes could achieve stronger correlations with self-reported personality than judgments by several classes of human acquaintances once sufficient Likes were available. The manuscript must state the task, measure, and context rather than generalize this into “machines know you better than your family.”

A 2026 *Nature Human Behaviour* research briefing reports that widely available LLMs can estimate personality traits from brief open-ended narratives with useful predictive validity. This is evidence that the inference surface is expanding from clicks and Likes to ordinary language. It does not establish clinical diagnosis, stable essence, or universal accuracy.

### 2. Inferred models can have economic consequences

The FTC's 2014 data-broker report documented a largely invisible industry assembling and selling consumer information. Its 2016 big-data report discussed the use of statistical models to predict consumer choices and the risks of exclusion or discrimination.

FTC staff's 2025 surveillance-pricing work found that intermediary products can draw on granular consumer data and inferred attributes to help tailor prices, promotions, or product presentation. The staff emphasized that the underlying market was still being studied. The manuscript should describe the documented capabilities and examples without claiming every retailer uses individualized pricing.

CFPB Circular 2023-03 is useful because it connects complex predictive models to a concrete procedural right: a creditor using a complex algorithm still must provide specific principal reasons for adverse action when Regulation B applies. This makes contestability more than a philosophical preference.

### 3. Machine identity can be wrong in consequential ways

NIST's face-recognition evaluations document demographic differentials and explain why false positives in one-to-many searches can carry materially different consequences from false negatives in one-to-one verification.

The FTC's 2023 Rite Aid case provides a concrete institutional example. According to the Commission's complaint and settlement announcement, the retailer's facial-recognition deployment generated thousands of false positives and lacked reasonable safeguards. This should be presented as an allegation/resolution specific to that deployment, not evidence that all face recognition fails similarly.

### 4. Models can be built to simulate particular people

Park and colleagues' “Generative Agent Simulations of 1,000 People” created agents for 1,052 participants using two-hour qualitative interviews plus an LLM. The authors reported that the agents reproduced participants' General Social Survey answers at 85% of the accuracy with which participants reproduced their own answers two weeks later, and performed comparably on additional tasks.

This result is unusually important for the book because it moves from “the system has a profile” toward “the system can produce responses in the place of the represented individual.”

The boundary is equally important. These agents were research simulations evaluated on selected survey and experimental tasks. They were not complete replicas of the participants, did not establish consciousness, and should not be described as replacing the people they represented.

### 5. Delegated agents are becoming an identity-and-authorization problem

NIST's February 2026 concept paper explicitly frames software and AI agent identity and authorization as a cybersecurity problem involving identification, authorization, auditing, non-repudiation, prompt-injection risk, and access to data, tools, and applications.

The OpenID Foundation's 2025 agentic-AI identity whitepaper similarly treats authentication, authorization, delegated authority, and governance as emerging infrastructure concerns. Its June 2026 AuthZEN announcement goes further into approval and consent prerequisites for autonomous actions.

RFC 8693 supplies a valuable older foundation because it distinguishes acting **as** a subject from acting **on behalf of** a subject. The manuscript can use that distinction to prevent a common rhetorical error: an agent does not become the human principal merely because it carries some of the human's permissions.

## Counterevidence and limits

A book about machine-made identity can easily become a collection of scary edge cases. This project should resist that.

### Personalization is often useful

A recommender that correctly remembers a language preference, an accessibility need, or a recurring purchase can save time. Fraud models can prevent theft. Biometrics can reduce password burden. Credit models can expand access when they identify reliable borrowers whom older systems miss. Delegated agents may remove tedious work. A representation is not harmful merely because it is artificial.

The serious question is what governance follows when the representation becomes consequential.

### Models are plural, not singular

There is rarely one master “AI model of you.” Different institutions maintain different records, objectives, labels, time windows, and confidence levels. The phrase **the other you** is a narrative device for a distributed technical reality. Chapters should repeatedly return to the fact that a person may have many artificial identities that disagree.

### Prediction is task-specific

A model that predicts one behavior well may be useless for another. Strong aggregate performance does not imply accuracy for an individual case. Personality measures are not complete selves. A fraud score is not a moral judgment. A recommender's estimate of likely engagement is not a person's authentic preference.

### Identity categories can be institution-created

Some algorithmic categories have no clean pre-existing truth to discover. They are decision tools created for a purpose. Calling every category an “inference about the real person” can accidentally grant systems more ontological authority than they deserve.

### Old software already delegates

If the book implies that AI invented acting on behalf of a user, it is wrong. Power of attorney, agency law, assistants, APIs, OAuth, service accounts, macros, workflow engines, and transaction processors all provide precedent. The new question is what happens when the delegated representative is adaptive, language-driven, probabilistic, and able to plan across tools.

## Falsification tests

The manuscript's main thesis should be weakened or revised if the following become true.

### F1 — Consequence remains exceptional

If computational models of individuals mostly remain advertising conveniences with little effect on access, price, authentication, credit, employment, insurance, safety review, or delegated action, then **identity** is too strong a frame for the broader phenomenon.

### F2 — Agent delegation collapses back into ordinary software identity

If general AI agents end up using tightly bounded, deterministic workflows with no materially new ambiguity about human principals, agent actors, authority chains, memory, consent, or transaction scope, then the book should treat agentic identity as an implementation detail rather than a new phase.

### F3 — Simulation does not generalize

If person-specific generative agents remain useful only on narrow research tasks and fail to predict or reproduce behavior beyond those tasks, the manuscript must not imply the arrival of high-fidelity “copies” of people.

### F4 — Contestability becomes routine

If major systems expose the material attributes, inferences, confidence, decision reasons, update paths, and correction mechanisms that govern consequential person-models, several chapters about opacity and identity drift should shift from critique to history.

### F5 — Benefits dominate in measured deployment

If evidence shows that consequential personalization and predictive models reliably broaden access, reduce discrimination, improve prices, and increase user control with low correction costs, the book must make those benefits central rather than treating them as footnotes.

### F6 — People retain effective vetoes over delegated action

If agent systems converge on strong least-privilege scopes, visible authority chains, transaction-level consent, reliable revocation, and auditability before they become widely consequential, the manuscript's most severe delegation-risk scenarios become less plausible.

## Language guardrails

- Do not write **“the machine knows”** when the evidence is only prediction or correlation. Prefer “the model predicts,” “the system infers,” or “the service treats the user as.”
- Do not write **“machines know you better than humans”** without naming the measured task and study population.
- Do not treat an embedding as a miniature person. It is a learned representation useful for particular model operations.
- Do not treat a biometric template as identity itself. It is a representation used in a verification or identification process.
- Do not equate **identity verification** with **identity inference**.
- Do not use **synthetic identity** generically; reserve it for its established fraud meaning unless explicitly qualified.
- Do not describe an AI agent carrying delegated permissions as literally being the user.
- Do not call the Stanford generative agents “digital clones” without qualification.
- Do not claim that GDPR Article 22 creates a universal right to explanation. Its actual text concerns decisions based solely on automated processing that produce legal or similarly significant effects, with enumerated exceptions and safeguards.
- Do not claim the EU AI Act bans biometric categorization generally. The law is more specific, including prohibitions around certain categorization based on biometric data used to deduce or infer sensitive characteristics, with exceptions and definitions that matter.
- Treat current standards drafts as drafts when they are drafts. RFC 8693 is a standard; the July/August 2026 OAuth delegation documents in the ledger are Internet-Drafts and must not be described as settled standards.

## Chapter map — opening act

### Chapter 1 — The First Artificial Person Is You

Purpose: establish the reversal and define the book's object without science-fiction inflation.

Primary evidence:
- AI001–AI004 for the traditional digital-identity stack;
- AI026–AI028 for prior art and terminology boundaries;
- AI022–AI025 for the expanding technical ability to model particular people.

Falsification pressure: if the chapter cannot distinguish a consequential operational proxy from ordinary personal data, the definition is too broad.

### Chapter 2 — The Profile Learns to Predict

Purpose: show the transition from stored attributes to inferred traits and likely behavior.

Primary evidence:
- AI005 and AI006 for behavioral inference from Facebook Likes;
- AI007 and AI008 for data-broker and big-data institutional context;
- AI024 for LLM-based personality inference from ordinary narrative text.

Falsification pressure: prediction must remain task-specific; the chapter should preserve false positives, population dependence, changing behavior, and the difference between a useful predictor and a true description of a person.

### Chapter 3 — The Model Gets a Vote

Purpose: move from prediction to consequence. A model becomes identity-like when institutions rely on it to change a person's environment.

Primary evidence:
- AI009 for surveillance-pricing capabilities and open questions;
- AI010 for algorithmic credit adverse-action specificity;
- AI011 and AI012 for biometric error and institutional consequence;
- AI013 and AI014 for legal recognition that profiling/automated decisions and biometric categorization can require safeguards or restrictions.

Falsification pressure: avoid implying that every prediction changes a legal right. The chapter should distinguish advertising relevance from credit denial, a shopping promotion from a security accusation, and a recommendation from an authorization decision.

### Chapter 4 — Identity Becomes Executable

Purpose: establish delegation as the threshold where a computational representation may begin to act rather than merely classify.

Primary evidence:
- AI016 for the delegation/impersonation distinction in OAuth token exchange;
- AI017 for current MCP authorization patterns;
- AI018–AI020 for agentic identity and approval/authorization work;
- AI019 for NIST's 2026 agent identity and authorization concept paper;
- AI032 for interoperable agent protocol context.

Falsification pressure: do not equate open-ended language-model planning with legal agency. The chapter's narrower claim is that systems are being engineered to let software actors carry permissions and operate on behalf of principals, making authority chains and identity boundaries more important.

## Research backlog for planned chapters

The remaining chapters should deepen rather than merely restate the thesis. Before drafting them, add primary or peer-reviewed sources for:

- history of credit scoring and bureau files;
- biometric authentication versus identification and current NIST evaluation results;
- speaker recognition and voice biometrics;
- behavioral biometrics including gait, keystrokes, and device interaction;
- embedding-based personalization and recommender systems;
- persistent conversational memory architectures and product-specific limits;
- search/reputation correction and right-to-be-forgotten jurisprudence;
- documented personalized-pricing deployments and counterevidence;
- agent authorization, least privilege, step-up consent, revocation, audit, and non-repudiation;
- deepfake/digital-replica law only where it does not duplicate *Proof of Human*;
- synthetic identity fraud and credit-file creation;
- correction rights under FCRA, GDPR, state privacy laws, and sector-specific regimes;
- identity persistence, rehabilitation, expungement, and the policy value of forgetting;
- data portability and user-controlled identity/personal-data stores;
- multiple-self and contextual-integrity scholarship;
- estate, afterlife, and posthumous digital-representation questions.

## Publication claim discipline

The book may call its synthesis original after checking adjacent literature, but it should not say **“never before written about”** as a factual historical claim.

A stronger line is available and true to the project:

> *Artificial Identity* connects a set of technologies that are usually discussed separately and asks what changes when the machine-built version of a person stops being a profile and starts becoming a participant.

That is enough of a claim to earn.
