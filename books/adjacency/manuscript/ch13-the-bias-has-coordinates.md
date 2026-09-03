# The Bias Has Coordinates

In 2016, researchers demonstrated something uncomfortable about a widely used kind of word embedding.

The geometry had learned stereotypes.

Words associated with men and women did not differ only along relations we would consider semantically legitimate. The representation also reflected social associations present in the text it had learned from. Occupations, activities and attributes could acquire gendered structure. A machine trained to learn from language had learned more of language's history than its designers wanted.

The result was important because the bias was visible as geometry.

The model had not been given a rule saying that one profession belonged to men and another to women.

The data contained patterns.

The objective preserved useful distributional relations.

The same learning process preserved harmful ones.

History became distance.

This is one of the clearest demonstrations of a broader problem with vector representations. Their power comes from learning relations at scale without requiring humans to specify each relation explicitly.

That is also how unwanted relations get in.

If we had to hand-write every association in a search or recommendation system, a discriminatory rule might be easier to notice. A learned embedding can absorb it statistically, distributed across many dimensions, intertwined with patterns that are genuinely useful.

The bias does not have to announce itself as a field called `gender_weight = 0.7`.

It can live in the neighborhood.

That makes vector bias both familiar and strange.

It is familiar because every information system reflects the data and institutions that produced it. Library classifications have encoded cultural assumptions. Hiring criteria have favored conventional career paths. Medical datasets have reflected unequal access to care. Recommendation systems learn from exposure patterns. Search engines learn from links and behavior created under real social conditions.

It is strange because embeddings translate those conditions into a numerical space that can be reused across many downstream tasks.

One representation can quietly influence search, recommendation, clustering, ranking and generation.

A biased neighborhood becomes portable.

This is why the response to the 2016 work included attempts to “debias” embeddings. If a gender direction could be identified geometrically, perhaps inappropriate associations could be reduced while preserving legitimate distinctions.

The intuition was attractive.

Find the bad direction.

Remove it.

Keep the useful map.

Reality proved harder.

Social bias is not one clean axis inside a high-dimensional space. Removing one measurable relation can leave other correlated structure intact. A representation may appear debiased under one test while downstream models recover the same social distinctions from other coordinates or patterns. Categories themselves can be context-dependent. Different applications require different fairness criteria.

There is no universal operation called *make the geometry fair*.

This does not mean mitigation is futile.

It means fairness belongs to the application, data and outcome, not only to the vector.

Consider résumé retrieval.

A system embeds job descriptions and candidate experience. Historical career patterns mean people from different groups may be unevenly represented across industries, job titles, schools, locations and seniority. Even if explicit demographic terms are excluded, those patterns can remain statistically available.

Now suppose the system is used only as a search tool for recruiters. The relevant question is not merely whether the embedding contains demographic information. Many legitimate résumé facts correlate with demographics. The question is how retrieval behaves.

Do equally qualified candidates with different career paths receive similar visibility?

Does the system overvalue title similarity relative to transferable work?

Does a gap in employment push candidates farther away?

Do unconventional institutions or international credentials become sparse regions?

Does the candidate-generation stage systematically reduce the diversity of people who ever reach human review?

These are behavioral questions.

They cannot be answered by inspecting one vector direction.

The same principle applies to semantic search. A general-language embedding may work better on the vocabulary and dialects that appeared more often in training data. A user expressing the same need in less standard language may retrieve a worse neighborhood. A multilingual model may place high-resource languages more coherently than low-resource ones. Technical communities with unusual vocabulary may receive noisy positions.

The map can have unequal resolution.

Traditional maps make this visible. A city center has every street labeled while a rural region appears as empty green. A vector space gives every item the same number of coordinates, so uneven resolution is harder to see.

Everything has a point.

Some points are better located than others.

This is a recurring trap of mathematical representation. Uniform format looks like uniform knowledge.

A model produces a 1,536-dimensional vector for every paragraph. The output shape is identical. The confidence with which the model represents legal English, a rare indigenous language, molecular descriptions and adolescent slang is not identical merely because the arrays have the same length.

Coverage needs testing.

Bias therefore begins with questions about representation quality before it reaches questions about social harm.

Which populations are well represented?

Which concepts have dense training evidence?

Which dialects, cultures or technical domains create unstable neighborhoods?

Which groups are disproportionately located near labels or content categories that produce negative consequences?

Which people are harder to retrieve when they express the same intention differently?

A vector system can be unfair through what it associates.

It can also be unfair through what it fails to understand.

That second form receives less attention because absence is quieter than stereotype.

Imagine a health information search tool trained and evaluated mostly on language used by clinicians and well-resourced patients. A person describing symptoms in colloquial language may be semantically farther from the relevant guidance than a person using medical vocabulary. The system has not classified the person negatively. It has simply created more friction for one form of expression.

Search quality becomes access.

Recommendation creates another feedback problem. A creator whose content receives less initial exposure generates less interaction data. The system then has less evidence about the creator's potential audience. A learned embedding from behavior may place the creator less precisely. Reduced precision can lead to weaker recommendation, which produces still less data.

Uncertainty becomes obscurity.

This can happen without any demographic variable and without malicious intent.

The platform is optimizing from observed evidence.

The evidence was shaped by prior allocation of attention.

We encountered this feedback loop earlier. Bias turns it into a distribution problem.

Who gets enough exposure for the model to learn them well?

Who gets enough interactions to acquire a stable neighborhood?

Which items become canonical centers and which remain poorly connected peripheries?

The geometry can harden path dependence.

Scientific systems have their own version. Prestigious papers receive more citations. Well-funded topics produce more literature. Embeddings trained on citation and text patterns may make dense established fields easier to navigate than neglected fields. Research from less visible institutions can become harder to encounter even if semantic systems sometimes help surface it.

The same technology can reinforce hierarchy and bypass hierarchy.

That ambiguity is important.

Vector search is not inherently centralizing or democratizing.

It changes the routing mechanism.

A keyword system may favor authors who use canonical terminology. A semantic system can retrieve work expressed in different language. That can broaden access. But if the semantic space itself was shaped by dominant literature, some alternative framings may still be poorly represented.

The question is empirical.

Who becomes easier to find under the new map?

This is why responsible vector-system design should compare against the system being replaced rather than against an imaginary world of perfect neutrality.

An old hiring search may already exclude unconventional candidates through exact title filters. A semantic system could improve matters by recognizing transferable skills. A traditional image archive may already contain biased human tags. Multimodal retrieval could reduce dependence on them. A keyword search may fail users who do not know expert vocabulary. Embeddings can help.

New systems inherit bias.

They can also remove old barriers.

The right standard is not purity.

It is measured improvement under explicit values.

That requires evaluation sets designed around people who normally disappear in averages.

If a semantic-search benchmark contains only common paraphrases in standard English, it tells us little about dialectal variation. If a hiring-retrieval evaluation uses conventional résumés, it cannot reveal whether nontraditional experience is systematically missed. If a recommendation metric optimizes total engagement, it may hide creators or users who receive much worse service.

Aggregate performance is a comfortable place for unequal errors to hide.

Vector systems need sliced evaluation.

By language.

By domain.

By user group where appropriate and lawful.

By query type.

By rare versus common items.

By new versus established content.

By consequential failure mode.

The goal is not to produce an endless dashboard of demographic statistics without purpose. It is to connect measurement to the decisions the system actually influences.

This matters because fairness itself has tradeoffs.

A recommender can diversify exposure and reduce short-term prediction accuracy. A hiring retriever can broaden candidate recall and increase the number of weak candidates recruiters must inspect. A semantic search tool can expand cross-language recall while introducing more ambiguous matches.

Those tradeoffs may be worthwhile.

They should be chosen rather than smuggled in under a generic objective called relevance.

Relevance to what?

Whose utility?

Over what time horizon?

With what minimum standard of access?

These are institutional questions disguised as machine-learning metrics.

The geometry merely gives them an efficient implementation.

There is another complication. Some distinctions we want the model to recognize overlap with distinctions we do not want it to use in certain decisions.

Medical systems may legitimately need sex-related biological information for some tasks while avoiding inappropriate stereotypes elsewhere. Language models need to understand social categories to answer questions about them. A résumé system needs to understand that maternity leave is work history context without treating parenthood as a negative signal. An image system may need to recognize demographic attributes for accessibility or analysis while ensuring they do not drive unrelated ranking.

“Remove the concept” is therefore often the wrong goal.

The better goal is conditional use.

Represent reality richly.

Constrain what the system is allowed to infer or optimize in a particular application.

This mirrors the broader lesson of the book. A vector space provides potential relations. Product and institutional design decide which relations become consequential.

That is why bias mitigation must extend beyond the embedding model.

Candidate generation matters.

Reranking matters.

Filters matter.

Feedback loops matter.

Interface design matters.

Human review matters.

Appeal matters.

Data collection after deployment matters.

A beautifully “debiased” embedding can still support an unfair system if the ranking objective or workflow creates unequal outcomes. A representation with measurable social structure can sometimes be used responsibly inside a system that constrains and audits its behavior.

Responsibility is compositional again.

This can frustrate people who want a technical fix.

The attraction of vector debiasing is that it promises to clean the map once and reuse it safely everywhere.

Institutions rarely get that luxury.

Fairness depends on what the map is being used to decide.

A word embedding in a poetry-search tool carries different stakes from the same representation used in screening candidates for employment. A visual embedding used to organize personal photographs differs from one used in policing. A molecular embedding used to prioritize compounds is judged against experimental accuracy, not social parity.

The context gives the error meaning.

This does not excuse embedding providers from testing general harms. Foundation representations can be used widely, so known stereotypes, uneven multilingual performance and unsafe associations deserve measurement and mitigation before deployment.

But downstream users inherit responsibility too.

A generic model card cannot tell a hospital how a retrieval system performs on its patients, a company how job matching affects its applicants or a museum how cultural materials from its collection are situated.

Local maps need local surveys.

This suggests an institutional practice that will become more common: adjacency audits.

Choose representative and adversarial queries.

Inspect who and what appears near them.

Measure which important items remain distant.

Compare across groups, domains and languages.

Look for stereotyped clusters.

Test whether alternative phrasings change access.

Examine whether model updates move sensitive neighborhoods.

Trace downstream effects rather than stopping at embedding metrics.

The point is not to assign moral intent to coordinates.

It is to understand the behavior of a learned map before it becomes invisible infrastructure.

Bias is difficult partly because the geometry can make social history look natural.

Two occupations sit far apart.

Two communities consume different content.

Two populations appear in different medical contexts.

The model faithfully represents the pattern.

The representation itself cannot tell us whether the pattern reflects preference, exclusion, inequality, biology, culture, measurement error, institutional design or some mixture.

Description is not explanation.

This is a crucial limit of vector geometry.

Nearness can reveal association.

It cannot determine justice.

Distance can expose structure.

It cannot tell us whether the structure should persist.

That judgment remains ours.

This may be the most important reason not to confuse embeddings with truth. A learned space can be an extraordinarily sensitive instrument for detecting patterns in human data. Human data contains the sediment of human history.

The instrument will find it.

We should want it to.

Then we should decide carefully what to do with what it found.

## Unequal Resolution

Bias is often discussed as the presence of a harmful association.

There is another form: the map can simply be sharper for some people, languages and domains than for others.

Imagine two users asking the same underlying question. One phrases it in the language that dominates the training corpus. The other uses a dialect, regional expression or code-switching pattern that appeared less often. Both queries receive vectors of identical length. Both are processed by the same search infrastructure. The first may land cleanly in the intended neighborhood while the second lands somewhere noisier.

The interface presents equality.

The representation delivers different resolution.

This is difficult to detect with benchmarks built from polished standard-language queries. Average retrieval scores can look excellent while a meaningful subset of users pays a larger translation tax.

A system can therefore reproduce inequality without assigning any explicitly negative label.

It merely makes some intentions easier to locate.

The same thing happens across professional domains. A general embedding may understand software documentation well because the training data contains abundant technical prose. It may perform less reliably on a specialized craft whose terminology is rarely digitized. One scientific subfield may have millions of papers; another may have sparse literature. One cultural archive may be richly captioned; another may contain images with little surviving metadata.

The vector space covers everything numerically.

The evidence beneath the coordinates is uneven.

This suggests a practical audit that is simpler than trying to interpret every dimension: compare equivalent intentions across forms of expression.

Ask the same question in formal and colloquial language.

Ask it in several languages when the application claims multilingual support.

Describe the same product with expert terminology and novice language.

Use a résumé with conventional titles and another describing transferable work through a nonstandard career path.

Search the same historical concept using the vocabulary of the dominant institution and the vocabulary used by the community being described.

Then compare the neighborhoods.

The point is not that every phrasing should return identical results. Language carries legitimate differences. The point is to discover when surface form creates a retrieval penalty unrelated to the user's actual need.

This is accessibility for meaning.

A physical building can technically admit everyone through one entrance while still being far easier for some bodies to navigate. A semantic system can technically accept every string while still requiring some users to translate themselves into the model's preferred language.

The most interesting fairness improvements may therefore look like better retrieval engineering rather than explicit demographic intervention.

Better multilingual representation.

Better domain adaptation.

Hard-negative training on distinctions that matter locally.

Query expansion that recognizes community terminology.

User controls that allow widening or correcting the neighborhood.

Human review for cases where the representation is known to be weak.

These are ways of increasing resolution where the map was blurry.

There is a parallel issue on the supply side. Creators, candidates, researchers and products can also be poorly represented.

A new creator with little behavioral history may have a content embedding but no stable audience embedding. A worker whose skills were acquired outside conventional institutions may be semantically harder to match to familiar job titles. Research written in a low-visibility venue may have weak citation signals. A small merchant may provide sparse product descriptions compared with a large retailer that invests heavily in metadata.

Poor representation becomes poor discoverability.

This creates a compounding effect. Items that receive less exposure generate less behavioral data. Less data makes their learned position less certain. The uncertain position can reduce future exposure.

Visibility becomes a source of representational quality.

Representational quality becomes a source of visibility.

The loop is not inevitable. Content-based representations can help new items enter neighborhoods before interaction history accumulates. Exploration policies can spend attention on uncertain candidates. Explicit metadata can compensate for sparse behavior. But the product has to choose to value those mechanisms.

Otherwise the map can become better at locating what the previous map already made visible.

This is why adjacency audits should include the unseen.

Do not inspect only the top results.

Ask which qualified candidates never appear.

Which creators never receive test exposure?

Which relevant documents are consistently retrieved below the cutoff?

Which languages require more exact wording?

Which scientific communities remain disconnected despite conceptual overlap?

A system can look fair inside the visible neighborhood while excluding people or knowledge before anyone evaluates them.

The bias is not in how the candidates are ranked.

It is in who became a candidate.

This distinction matters for regulation and accountability because downstream human review can only correct errors it gets to see. A recruiter may be scrupulously fair among twenty retrieved résumés while the retrieval stage systematically excludes unconventional experience. A clinician may carefully review five analogous cases while the rare but important case ranks sixth. A recommendation editor may promote diverse work among candidates already filtered through a narrow behavioral model.

Human judgment does not erase upstream selection.

It inherits it.

The right response is not to demand that every vector space become equally precise everywhere. That is impossible. Models have limited data and tasks have different requirements.

The response is to know where resolution is uneven and decide whether the consequence is acceptable.

A poetry-recommendation system can tolerate a great deal of fuzziness. An employment-screening system cannot treat unexplained representation gaps with the same casualness.

The cost of blur depends on what blur can deny.

That returns fairness to the institutional level where it belongs.

A model contains statistical structure.

An institution decides which statistical structure becomes access, opportunity, suspicion or silence.

The coordinates can help us see the pattern.

They cannot tell us what minimum resolution people are owed.