# The Database That Learned the Rumor

A hallucination can outlive the model that made it.

All it needs is somewhere to be stored.

The simplest version is familiar. A model invents a fact. A person copies it into a document. Months later, another system retrieves the document and repeats the fact. The second model is not hallucinating in the narrow sense. It is accurately reproducing a false record.

The error has changed species.

It began as generation.

It became data.

This transition may be the most important long-term risk in a world saturated with synthetic text.

We tend to imagine model improvement as a one-way force. Today's systems make mistakes. Tomorrow's systems make fewer. Better reasoning, retrieval, tools, and training reduce hallucination rates.

That story assumes tomorrow's systems are learning from a world whose records remain independent of yesterday's mistakes.

They may not.

A generated claim can enter a knowledge base, customer record, code repository, encyclopedia-like page, market report, academic preprint, product description, policy memo, or ordinary website. Once there, future systems encounter it as part of the environment.

The output becomes input.

In 2024, Ilia Shumailov and colleagues published a Nature paper showing a related problem at the training-data level. In controlled experiments, generative models trained recursively on model-generated data could experience what the authors called model collapse, progressively losing information about the original distribution. Their result is not evidence that every use of synthetic data is harmful. The paper explicitly shows that preserving original data changes the outcome, and other research explores ways synthetic data can be useful.

The broader lesson for this book is provenance.

When generated material becomes difficult to distinguish from material grounded in original observations, the information ecosystem changes.

The problem is wider than model training.

Imagine an internal company wiki.

An employee asks an AI assistant why a product launch was delayed. The assistant infers that a security review caused the delay because it sees several emails mentioning security near the launch date. The employee pastes the answer into the wiki. The wiki is later designated as an approved knowledge source for the company's AI assistant.

A year later, another employee asks why launches historically slip. The system retrieves the wiki and reports that the previous launch was delayed by security review.

The answer is now grounded.

Grounded in its ancestor's guess.

This is the database that learned the rumor.

The phrase matters because databases carry a special kind of authority. A rumor in conversation feels provisional. A value in a system of record feels settled.

The database does not know how the value arrived unless we preserve that history.

Traditional data governance focuses on accuracy, ownership, access, quality, and lineage. Generative AI adds a new provenance category: was this field observed, supplied by a person, extracted from evidence, inferred by a model, or generated as a candidate?

Those categories should not collapse merely because the schema accepts the same string.

"Security review" can fit in a cause field no matter where the words came from.

The type of evidence is outside the string.

This is why epistemic metadata needs to travel with data.

A field can contain a value and a status.

Verified from source.

Extracted from document.

User asserted.

Model inferred.

Unresolved.

Superseded.

If the status is dropped, the next system inherits false certainty.

The danger becomes more subtle in vector databases and retrieval systems.

Modern knowledge assistants often break documents into chunks, compute embeddings, and retrieve semantically similar passages. The system may not care who wrote the passage or whether the passage was itself generated. Relevance determines access.

A synthetic paragraph can therefore become indistinguishable from a human-authored one at retrieval time unless provenance is indexed too.

Similarity is not authority.

The sentence closest in embedding space to the question may be the least reliable source in the corpus.

This is one reason a trusted knowledge base cannot be defined merely as "all company documents."

Organizations create documents for many purposes.

Brainstorms.

Drafts.

Meeting notes.

Sales material.

Final policies.

Research notes.

Generated summaries.

Archived procedures.

A retrieval system that flattens them into one semantic field can make a draft more retrievable than the controlling policy because the draft uses language closer to the user's question.

The model then gives a fluent answer and cites an internal source.

Everything looks responsible.

The source hierarchy was wrong.

This is the database equivalent of citation laundering.

The correction is to make authority part of retrieval.

Policy status.

Version.

Owner.

Date.

Document type.

Source of assertions.

Supersession relationships.

These are not administrative details. They tell the system what kind of evidence it is reading.

There is another feedback loop in public information.

A model generates a false statement. The statement appears on several websites, perhaps because content publishers use similar systems. Search engines index the pages. A future answer engine finds several sources repeating the statement.

Apparent consensus grows.

The sources are not independent.

They share a synthetic ancestor, even if the wording differs.

This is where exact-duplicate detection fails.

Language models are good at variation. The same proposition can be rewritten thousands of ways. Five sites can look stylistically independent and still descend from one generated sentence.

Evidence counting must move from documents to lineage.

How many independent observations support the claim?

Not how many pages contain it.

This is an old intelligence problem in a new medium. Analysts have long worried about circular reporting: source A tells B, B's account reaches C, and later A sees C and concludes that several sources confirm the story.

Generative systems can automate circular reporting while removing the verbal fingerprints that once helped investigators notice it.

A paraphrase machine makes lineage harder to see.

The answer is not to ban synthetic text from knowledge systems.

That would be both impossible and foolish.

Generated summaries can improve knowledge bases. Synthetic examples can improve training. Model-produced documentation can make systems legible. A good generated explanation may be clearer than the source material.

The requirement is that transformation not masquerade as observation.

A summary should know what it summarized.

A generated taxonomy should know which source records it organized.

A synthetic training item should be identifiable as synthetic where that distinction matters.

A model inference stored in a database should not be promoted automatically to a verified fact merely because it survived long enough.

This leads to a concept I will call epistemic promotion.

Organizations already promote artifacts through states.

Draft becomes approved.

Lead becomes qualified.

Incident becomes resolved.

Code becomes production.

AI knowledge needs comparable promotion rules.

A generated claim begins as proposed.

Evidence can promote it.

Human or automated verification can promote it.

Contradiction can demote it.

A new source can supersede it.

Time can expire it.

The database should not silently equate persistence with promotion.

Age is not evidence.

Repetition is not evidence.

Retrieval is not evidence.

These statements sound simple and are routinely violated by information systems because the original provenance was never stored.

The database learned the rumor because nobody told it the sentence was a rumor.

This problem reaches model training itself.

The Nature model-collapse work is often summarized too dramatically as "AI trained on AI becomes nonsense." The actual result is more specific and more interesting. Recursive training on generated distributions can lose information, particularly tails, when original data is not adequately preserved. The authors emphasize the value of access to genuine human-generated data and the importance of tracking generated content at scale.

The word *genuine* needs care.

Human-generated does not mean true.

A human can write a falsehood. A model can generate a correct proof. The value of original human data in that training context is not moral purity. It is contact with a distribution that has not already been filtered through the model's own approximations.

This is the same systems principle again.

Feedback reduces independence.

A model trained on its own descendants is learning partly from its reflection.

An organization whose AI knowledge system increasingly consumes its own generated summaries can experience a similar epistemic narrowing even without retraining the base model.

The original documents recede.

The summaries become the convenient layer.

Future summaries summarize summaries.

Rare caveats disappear.

Minority views vanish.

Specific details are generalized.

The knowledge base becomes smoother and less connected to the messy source record.

This is organizational model collapse in metaphor, not the technical phenomenon demonstrated in the Nature paper. The distinction matters. We should not misuse a precise research result as a universal label.

The analogy is nevertheless instructive.

Repeated compression loses tails.

The unusual exception in a policy disappears from a summary. The one dissenting voice disappears from meeting notes. The rare customer complaint disappears from a market synthesis. The edge case disappears from generated documentation.

The organization begins to know the modal version of itself.

That is dangerous because rare cases are often where risk lives.

Security incidents are rare.

Catastrophic medical conditions are rare.

Legal exceptions are rare.

Operational failures are rare until they happen.

A knowledge system optimized around average plausibility can systematically underrepresent the tails that experts care about most.

This gives provenance another job beyond truth verification.

It preserves diversity of evidence.

When a summary can always be expanded back into source material, the tail remains recoverable. When only the summary survives, compression becomes deletion.

The design rule is simple:

Never let the synthetic layer become the only layer.

Keep the original source where feasible.

Keep the link.

Keep the version.

Keep the status.

Keep the ability to rebuild the answer from material that did not originate in the answer itself.

This applies to personal memory too.

If an assistant stores only generated summaries of prior conversations, each new summary may be based on a previous compression. A user's nuanced history can slowly harden into a profile assembled from the assistant's own language.

The person disappears behind the model's description of the person.

A healthier memory system keeps raw user-authorized records or reliable source anchors where appropriate and distinguishes those from model-generated memory summaries.

Again, privacy matters. Not every conversation should be stored forever. The point is not maximal retention. It is avoiding a false choice between no memory and synthetic memory without provenance.

The database that learned the rumor also needs a way to unlearn it.

Correction should change status throughout the lineage.

If a canonical source invalidates a claim, derived summaries should be marked stale. Retrieval should stop treating the old version as current. Systems that consumed the claim for consequential actions should be identifiable.

Without this, correction loses to persistence.

The old record remains semantically similar and therefore retrievable. The new correction competes with it as just another chunk.

A strong system encodes supersession.

This source replaces that one.

This policy is current.

This diagnosis was ruled out.

This forecast expired.

This model inference was rejected.

This generated summary should no longer be used.

These relationships are part of knowledge.

The web is bad at them.

An internal system can be better.

The larger lesson is that AI hallucination is becoming a data-governance problem.

The spectacular error happens in the chat window.

The durable error happens when the organization forgets that the sentence was generated.

A model can improve next year.

The database may still remember what the old model made up.

That is why the most important question after a hallucination is not only, "How do we stop the model from saying this again?"

It is:

"Where did the sentence go?"