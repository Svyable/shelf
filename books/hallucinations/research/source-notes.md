# Source notes

Access dates in the ledger use 2026-09-04 for this drafting pass unless otherwise recorded. URLs favor primary or publisher pages. The book uses older human-factors and cognition sources deliberately where the relevant mechanism predates modern generative AI; those sources support adjacent mechanisms, not automatic claims about current models.

## Core technical sources

### OpenAI — Why language models hallucinate
Published September 5, 2025. First-party research explanation arguing that hallucinations arise partly from next-word prediction and persist because common accuracy-only evaluations reward guessing over abstention.  
**Use:** Chapters 2, 3, 19, 29.  
**Limit:** First-party research from one developer; numeric results remain benchmark/model specific.  
URL: https://openai.com/index/why-language-models-hallucinate/

### NIST AI 600-1 — Generative AI Profile
Published July 26, 2024 and subsequently updated by NIST. Cross-sector companion to the AI Risk Management Framework; useful for confabulation terminology and lifecycle risk framing.  
**Use:** front matter, Chapters 2, 12, 21, 29.  
**Limit:** Voluntary guidance, not a universal legal mandate.  
URL: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

### Anthropic — Towards Understanding Sycophancy in Language Models
Published October 23, 2023. Reports sycophantic behavior in tested RLHF assistants and preference judgments that can favor belief-matching responses.  
**Use:** Chapters 5–7.  
**Limit:** Model generations and training methods have changed; treat as evidence of a recurring mechanism, not a current universal rate.  
URL: https://www.anthropic.com/news/towards-understanding-sycophancy-in-language-models

### Stanford HAI — 2026 AI Index, Responsible AI
Reports contemporary responsible-AI benchmark results, including degradation in a benchmark where false statements were framed as the user's own belief.  
**Use:** Chapter 6.  
**Limit:** Tie any numeric claim to the named benchmark/report.  
URL: https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai

### Shumailov et al. — AI models collapse when trained on recursively generated data
*Nature* 631, 755–759, published July 24, 2024. The paper studies recursive training on model-generated data and reports loss of information about the original distribution, especially tails. It also shows that preserving original data changes the outcome and reduces degradation in the tested setup.  
**Use:** Chapter 25.  
**Limit:** Do not translate the result into the slogan that all synthetic data is harmful or that every production model trained on synthetic data inevitably collapses. The chapter's "organizational model collapse" language is explicitly an analogy, not the paper's empirical result.  
URL: https://doi.org/10.1038/s41586-024-07566-y

## Legal and institutional sources

### Mata v. Avianca, Inc. — Opinion and Order on Sanctions
U.S. District Court for the Southern District of New York, June 22, 2023. The order describes nonexistent judicial opinions with fake quotations and citations generated through ChatGPT and imposes sanctions.  
**Use:** Chapters 1, 9, 13, 17.  
**Limit:** One legal incident, not prevalence evidence.  
URL: https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/54/

### ABA Formal Opinion 512 — Generative Artificial Intelligence Tools
Issued July 29, 2024. Addresses lawyers' duties when using generative AI, including competence, confidentiality, communication, supervision, meritorious claims, candor, and fees.  
**Use:** Chapter 13.  
**Limit:** ABA ethics guidance; binding force varies by jurisdiction.  
URL: https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf

### Moffatt v. Air Canada, 2024 BCCRT 149
British Columbia Civil Resolution Tribunal decision issued February 14, 2024. The tribunal found Air Canada liable for negligent misrepresentation after a customer relied on inaccurate bereavement-fare information supplied by the airline's website chatbot.  
**Use:** Chapter 11.  
**Limit:** Technology and legal posture are specific to the case; not a universal rule of AI liability.  
URL: https://canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html

## Clinical source

### Shah 2024 — JAMA Network Open
Savyasachi V. Shah, "Accuracy, Consistency, and Hallucination of Large Language Models When Analyzing Unstructured Clinical Notes in Electronic Medical Records," published August 13, 2024.  
**Use:** Chapter 14.  
**Limit:** Task-level evidence; do not infer patient-outcome harm directly.  
URL: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2822301

## Human cognition and automation sources

### Johnson, Hashtroudi & Lindsay 1993 — Source monitoring
*Psychological Bulletin* 114(1):3–28. Foundational review of processes used to identify the origins of memories, knowledge, and beliefs.  
**Use:** Chapters 4, 8, 10, 20.  
**Limit:** Pre-generative-AI psychology; used as mechanism-level foundation rather than direct AI evidence.  
URL: https://pubmed.ncbi.nlm.nih.gov/8346328/

### Reber & Schwarz 1999 — Perceptual fluency and truth judgment
*Consciousness and Cognition* 8(3):338–342. Reports a controlled experiment in which perceptual fluency affected truth judgments.  
**Use:** Chapter 4.  
**Limit:** Narrow experimental manipulation; do not universalize to AI prose.  
URL: https://pubmed.ncbi.nlm.nih.gov/10487787/

### Parasuraman & Riley 1997 — Humans and Automation
*Human Factors* 39(2):230–253. Classic framework for use, misuse, disuse, and abuse of automation.  
**Use:** Chapters 4, 12, 18, 23, 26, 28.  
**Limit:** Predates generative AI; used for enduring human-automation mechanisms.  
URL: https://journals.sagepub.com/doi/abs/10.1518/001872097778543886

### Parasuraman & Manzey 2010 — Complacency and automation bias
*Human Factors* 52(3):381–410. Review and theoretical integration of automation complacency and bias, including expert users.  
**Use:** Chapters 5, 12, 18, 23, 26.  
**Limit:** Broad automation literature; application to generative AI remains contextual.  
URL: https://journals.sagepub.com/doi/10.1177/0018720810376055

### Renier, Schmid Mast & Bekbergenova 2021 — To err is human, not algorithmic
*Computers in Human Behavior* 124:106879, published November 1, 2021. In vignette-based experiments, algorithmic error produced harsher gut reactions and stronger behavioral intentions than comparable human error.  
**Use:** Chapter 26 and counterevidence for a simple "more skepticism is safer" story.  
**Limit:** One experimental paradigm in recruitment/finance vignettes; not a universal algorithm-aversion rate.  
URL: https://doi.org/10.1016/j.chb.2021.106879

### Lewandowsky et al. 2012 — Misinformation and its correction
*Psychological Science in the Public Interest* 13(3):106–131. Review of misinformation persistence, memory updating, and correction strategies.  
**Use:** Chapter 17.  
**Limit:** Broad misinformation literature, not AI-specific.  
URL: https://pubmed.ncbi.nlm.nih.gov/26173286/

## Distributed cognition source

### Lucy Osler 2026 — Hallucinating with AI
*Philosophy & Technology* 39, article 30, published February 11, 2026. Uses distributed cognition theory to examine inaccurate beliefs, distorted memories/self-narratives, and delusional thinking in human-AI interaction.  
**Use:** Chapter 8 and Chapter 29 as adjacent literature.  
**Limit:** The manuscript's term *shared hallucination* is its own broader systems term and is not presented as Osler's terminology.  
URL: https://link.springer.com/article/10.1007/s13347-026-01034-3

## Provenance source

### C2PA — Content Credentials and guiding principles
C2PA provides an open technical standard for verifiable assertions about the origin and edits of digital content. Its public material presents Content Credentials as provenance/history infrastructure, not a universal truth oracle.  
**Use:** Chapters 9, 20, 24.  
**Limit:** Primarily digital-media provenance; a genuine, provenance-bearing artifact can still mislead. Absence of credentials is not proof that content is synthetic or false.  
URLs:
- https://c2pa.org/
- https://spec.c2pa.org/about/resources/
- https://c2pa.org/principles/

## Research posture

The book distinguishes reported incidents from hypotheticals, model-specific benchmark results from universal claims, provenance from truth, and technical model collapse from organizational analogy. Future editions should replace analogical human-factors support with direct human-AI field evidence where stronger studies become available.
