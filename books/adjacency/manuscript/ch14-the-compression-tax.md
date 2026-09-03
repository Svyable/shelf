# The Compression Tax

A paragraph enters an embedding model.

Out comes a fixed-length vector.

The paragraph may contain three hundred words, twelve claims, two names, a date, a joke, a qualification, an exception and an ambiguity. The vector contains a few hundred or a few thousand numbers.

Something has been compressed.

That is not a criticism.

Compression is the reason the system is useful.

If every semantic search required preserving every detail of every document in a form that had to be compared exhaustively with every query, retrieval would be impossibly expensive. The representation works because it discards enough detail to make relation cheap while preserving enough structure to make the relation useful.

The miracle of embeddings is not that they preserve everything.

It is how much they preserve after throwing so much away.

But every compression has a tax.

The tax is paid in distinctions the representation does not retain well.

This is easiest to see in documents.

Suppose two reports are nearly identical except for one sentence.

Report A says the bridge is safe for loads up to forty tons.

Report B says the bridge is not safe for loads up to forty tons.

Most of the words match. Most of the topic matches. A general semantic embedding may place the reports extremely close even though the operational meaning of the difference is enormous.

A competent model may preserve negation well enough to distinguish the specific sentences. At document scale, however, the larger point remains.

Not every bit has equal consequence.

Semantic representations are often trained to preserve broad meaning, not every exact detail.

Numbers are a notorious example. Two financial statements differing only in a few figures may look semantically similar. A contract amendment can change one date and completely alter an obligation. A scientific paper may replicate another method with one parameter changed. A software configuration file can differ by a single character that determines whether a service is exposed publicly.

Similarity compresses.

High-stakes interpretation must decompress.

This is why vector search so often works best as candidate generation. Retrieve the relevant object, then inspect the original.

The original still matters because the embedding is not the evidence.

The same problem appears in chunking.

Large documents cannot always be represented as one vector without losing local specificity, so retrieval systems divide them into smaller passages. A chunk may be a few hundred tokens. The strategy improves precision because a query about a particular policy can retrieve the paragraph containing it rather than a vector representing an entire employee handbook.

But segmentation creates new losses.

A definition in section two may govern a clause in section twelve.

A pronoun may refer to a person introduced in the previous chunk.

A table heading can become separated from its rows.

A legal exception can live one paragraph beyond the text that seems to answer the query.

A code function may depend on state declared elsewhere.

The retrieval unit is an editorial cut.

A system that splits text every five hundred tokens treats punctuation in the token count as more important than conceptual structure unless additional logic intervenes.

This is why good retrieval pipelines often preserve headings, overlap passages, attach metadata or use hierarchical retrieval. The system tries to restore context the compression removed.

Compression creates the need for reconstruction.

High-dimensional geometry has its own distortions.

Our intuitions come from low-dimensional space. In a room, nearby objects are obviously nearby and distant objects are obviously distant. Add hundreds or thousands of dimensions and strange things happen. Distances can become less discriminative. Some points can become hubs that appear among the nearest neighbors of many queries. Dense regions and sparse regions behave differently. A similarity measure that works well on one embedding distribution can perform poorly on another.

The space is mathematically valid.

Human intuition is not always invited.

One practical symptom is hubness. Certain vectors become unusually frequent neighbors, not necessarily because they are universally useful but because of the geometry and distribution of the representation. In language or recommendation systems, generic or popular items can become hubs. The retrieval list acquires a gravitational center.

Anyone who has used a weak semantic search has seen a behavioral version of this. The same broadly relevant documents appear for many different queries. They are not wrong enough to be rejected. They are not specific enough to be satisfying.

The map has a downtown problem.

Everything routes through the center.

This can be mitigated through better training, normalization, reranking, diversification and index design, but the underlying lesson remains. A vector space is not merely a compressed encyclopedia. It has geometric artifacts.

Then there is ambiguity.

Human language can preserve multiple interpretations simultaneously.

“Mercury is rising.”

The sentence could refer to temperature in an old thermometer, the planet in the sky, the element in a measurement, or metaphorical market commentary if somebody writes strangely enough.

A contextual embedding uses surrounding text to choose a representation. With enough context, the ambiguity may disappear. With too little, the vector must locate the sentence somewhere despite uncertainty.

The model cannot store “meaning unknown” as a blank unless designed to represent uncertainty explicitly.

It produces a point.

This creates another recurring problem: coordinates look more certain than representation quality actually is.

A poorly understood query still has an embedding.

A corrupted document still has an embedding.

An out-of-domain molecule still has a learned representation.

A low-resource-language sentence still becomes the same length array as an English sentence.

The format does not warn you when the model is lost.

The edge of the map is filled in automatically.

Scientific machine learning makes this especially dangerous.

A molecular model trained on a region of chemical space can assign predictions and embeddings to molecules far outside that region. The inference pipeline works. The numerical outputs look ordinary. The model may be extrapolating through territory where it has little empirical support.

Recent work on molecular deep learning has emphasized this problem of applicability domains and out-of-distribution generalization. Models that perform impressively on test sets drawn similarly to training data can deteriorate at the edges of chemical space—precisely where researchers may want to search for novelty.

The novelty paradox returns.

The more interesting the candidate, the less entitled the model may be to confidence.

A good scientific discovery system should therefore represent not only proximity but epistemic terrain.

How dense is this region?

How similar are the nearest training examples?

Do multiple models agree?

Does uncertainty rise as we leave known space?

Are we interpolating or extrapolating?

These questions are ways of charging the compression tax honestly.

The same idea applies outside science.

A semantic search system trained mostly on business prose may produce embeddings for poetry. The vectors exist. The neighborhoods may be crude. A recommendation system trained on mainstream listening behavior may place an experimental genre poorly. An enterprise search trained on ordinary documents may struggle with source code, diagrams or tables.

Coverage is not binary.

Representation quality varies by region.

This suggests a useful concept: vector legibility.

A region is legible when the representation preserves the distinctions users care about well enough for the intended task.

Legibility can be local. A model can be excellent at broad topical similarity and poor at legal authority. Excellent at English paraphrase and weak at mathematical notation. Excellent at common consumer images and unreliable on medical scans.

The question is not whether the embedding “understands” the data in some general sense.

It is whether the relevant distinctions survive compression here.

That question should guide evaluation.

Take the failure modes that matter and build contrast sets.

Two contracts identical except for a termination date.

Two medical notes identical except for a negation.

Two products with nearly identical descriptions but incompatible sizes.

Two code snippets differing in a security-critical condition.

Two scientific abstracts with the same topic but opposite result.

A representation good at broad semantic similarity may put each pair close.

That can be acceptable for first-stage retrieval if later stages recover the decisive detail.

It is dangerous if similarity itself becomes the decision.

Compression requires a downstream reader.

This is one reason large language models and vector retrieval complement each other so naturally. The embedding performs coarse selection. The language model can inspect the retrieved text in higher resolution. It can notice dates, exceptions and relations that the single vector did not encode distinctly.

But the arrangement only works if the relevant text is retrieved in the first place.

Compression at the selection stage can still hide the detail needed for later reasoning.

This creates a design problem around multi-vector representations.

Instead of representing a long document by one vector, a system can store many vectors for different passages or aspects. Instead of representing a product only by its description, it can separately represent image, title, attributes and behavior. Instead of representing a user by one stable vector, it can preserve several interest clusters.

More vectors reduce some compression losses.

They increase storage, complexity and retrieval cost.

The system chooses where to spend fidelity.

This is familiar from maps again. A road atlas preserves more local detail than a globe. A topographic map preserves elevation that a political map discards. A subway diagram intentionally distorts geographic distance to preserve route structure.

Good compression is purposeful distortion.

The problem begins when the purpose changes and the distortion remains invisible.

A subway map is excellent for changing trains and terrible for estimating whether two stations are a short walk apart. The map is not wrong. The user asked it a question it was not designed to answer.

Embeddings fail the same way.

A representation trained for general semantic search may be reused for clustering, anomaly detection or recommendation because the vectors already exist. The reuse is convenient. The geometry may not preserve the relations those tasks need.

Infrastructure encourages overextension.

Once an organization has embedded everything, every new problem begins to look like nearest-neighbor search.

This is the vector version of a familiar technological temptation.

When you have a database, make it a query.

When you have a dashboard, make it a metric.

When you have an embedding, make it similarity.

The mature response is to ask whether the compression aligns with the question.

Sometimes the right answer is a different representation.

Sometimes it is exact search.

Sometimes it is a graph.

Sometimes it is structured data.

Sometimes it is a human reading the original document.

The vector is a powerful lens, not a replacement for the object.

This becomes philosophically interesting because cognition itself depends on compression.

Humans do not remember every sensory detail. We form concepts. We categorize. We summarize. We recognize patterns and ignore variation. A chair remains a chair across countless shapes because our representation discards much of what makes each chair physically unique.

Intelligence would be impossible without selective forgetting.

The question is what to forget.

Experts become experts partly by learning which details are noise and which tiny differences matter. A novice sees two financial contracts as almost identical. A lawyer notices the one clause that changes liability. A novice sees two cells under a microscope as alike. A pathologist notices a subtle pattern.

Expertise changes compression.

It preserves the distinctions that matter to the domain.

Machine representation learning is attempting a similar feat statistically. It compresses enormous variation into features useful for its objective.

The success can be astonishing.

The failures often happen when a tiny domain-specific distinction carries more consequence than the objective taught the model to preserve.

This is why expert evaluation remains essential even as general embeddings improve.

The better the representation becomes, the easier it is to trust it outside its demonstrated range.

Competence creates overconfidence in the user before it creates universal competence in the model.

A mature discovery system should therefore make room for multiple resolutions.

Use vectors to move quickly through abundance.

Use rerankers to examine candidates more carefully.

Use structured fields to preserve exact constraints.

Use graphs where relation type matters.

Use source documents where evidence matters.

Use uncertainty where the map is thin.

The layers should not compete for the title of intelligence.

They compensate for one another's compression losses.

This also changes how we think about storage. The raw object remains valuable even after embedding. Companies sometimes speak as though the vector is the new data. It is better understood as an index derived from the data.

The original document, image, molecule, audio recording or event still contains information the embedding discarded.

Keep the source.

Keep provenance.

Keep version history.

The vector can be regenerated when models improve.

The source is the thing you were trying to represent.

This principle becomes especially important for long-lived institutions. Embedding models will change quickly. Today's vector format may be obsolete in five years. If the organization retains only compressed representations or loses the relationship between vector and source, it has mistaken an index for an archive.

Civilizations have made versions of this mistake before.

A catalog is useful because books exist behind it.

A census table is useful because methods and records explain how it was produced.

A scientific summary is useful because experiments and data remain inspectable.

Compression creates leverage when decompression remains possible.

Without that path back, convenience becomes epistemic debt.

There is a final compression tax that is harder to measure.

When a system organizes the world through embeddings, users begin to think in the relations the representation makes easy.

Search becomes “find similar.”

Recommendation becomes “more like this.”

Research becomes “papers near this paper.”

Memory becomes “events near this query.”

These are extraordinarily productive operations.

They can also narrow our imagination about relation.

Some important things are not similar.

They are causal.

Opposed.

Complementary.

Prerequisite.

Historically linked.

Mutually exclusive.

Part of the same system at different scales.

A vector can encode some of these patterns indirectly, but distance alone does not name them.

The world contains more relations than proximity.

Discovery systems will become richer as they combine vector spaces with typed graphs, structured knowledge, temporal models and explicit reasoning. The future is unlikely to be one giant embedding where every relationship has been solved by cosine similarity.

The vector turn is powerful because it made fuzzy relation cheap.

Its next stage will require knowing when fuzziness is insufficient.

Compression is not the enemy.

Compression is what lets us move.

The tax becomes dangerous only when we forget that we paid it.

## When One Point Is Too Small

A single vector is appealing because it is simple.

One object.

One coordinate.

One nearest-neighbor search.

The simplicity can become a bottleneck when the object contains several different things worth retrieving.

Consider a long corporate report. One section discusses cybersecurity. Another covers international expansion. Another contains a table of financial results. Another explains a lawsuit. Compress the entire report into one vector and the dominant themes may overwhelm the small section a future query needs.

The object has more than one semantic center.

Representing it with one point asks the model to average those centers into a compromise.

This is why practical retrieval systems increasingly use multiple representations at different resolutions. A document can have a vector for the whole file and vectors for sections or chunks. A product can have separate representations for its image, title, description and behavioral history. A user can have several interest vectors rather than one permanent summary of taste.

The extra vectors are not merely an engineering trick.

They are an admission that identity can be plural.

A person who listens to baroque music and death metal should not necessarily be represented as someone who wants music halfway between the two. An organization with separate research, sales and legal functions should not collapse all internal knowledge into one semantic centroid. A scientific paper may contain a method useful to one field and a conclusion useful to another.

Averages can create fictional middle points.

Human classification systems learned this lesson long ago. A library can assign several subject headings to one book. An article can carry multiple keywords. A person can belong to several communities. A city can be described by geography, industry, culture and history without forcing those dimensions into one label.

Multi-vector systems bring a similar flexibility to learned representation.

They also raise new questions.

Which vector should a query compare against?

Should the system retrieve any object whose one representation is near, or require several signals to agree?

How do we avoid large objects receiving an unfair advantage simply because they have more vectors and therefore more chances to appear close?

How do we preserve the relation between the retrieved fragment and the whole object?

More fidelity creates more orchestration.

This is the compression trade again.

One vector is cheap and blunt.

Many vectors are expressive and expensive.

The right choice depends on what errors matter.

For a casual recommendation surface, one compact product representation may be enough. For legal research, a contract may need passage-level vectors while definitions and clause hierarchy remain linked explicitly. For source-code retrieval, a repository can be represented at file, class and function levels because a bug may live locally while its dependency spans the larger system.

Hierarchical retrieval is one way to manage this. Search small units to find a precise match, then move upward to the parent section or document before reasoning. The system locates the needle without pretending the needle is independent of the haystack.

This resembles how humans read reference material.

The index points to a page.

The page points to a section.

The reader expands context until the claim makes sense.

The mistake would be handing someone one sentence torn from the page and treating its proximity to the question as sufficient evidence.

Generative AI makes this mistake easy to hide. A model can receive a handful of chunks and weave them together fluently. If the chunks lost their parent context, the synthesis may combine statements whose qualifications lived just outside the retrieval boundaries.

The vector system succeeded at local similarity and failed at document structure.

This is why source-aware retrieval needs coordinates of more than one kind.

Semantic coordinates tell us what the passage resembles.

Document coordinates tell us where it lives.

Temporal coordinates tell us when it was valid.

Authority metadata tells us what status it has.

Access metadata tells us who may see it.

No one vector needs to encode all of these if the system can preserve them explicitly.

This is a crucial design principle: do not force learned geometry to carry facts that structured data can represent exactly.

The embedding should earn its complexity by handling fuzzy relation.

Dates are already dates.

Permissions are already permissions.

Identifiers are already identifiers.

Parent-child structure is already structure.

The desire for one universal vector can become a form of representational vanity.

A system feels elegant because everything is “just embeddings.” The elegance disappears when the application cannot recover a definition, enforce a permission or distinguish the latest version.

Good architecture is comfortable with mixed representations.

It uses vectors where approximation creates leverage and exact structures where exactness is cheap.

This is also the answer to another worry about compression: preserving the raw source is not enough if the path back to it is weak.

A retrieved vector should remain addressable to the object and location that produced it. A chunk needs a source ID. An image embedding needs the image. A memory vector needs the underlying event or record. A molecular representation needs the molecular structure it encodes.

Provenance is the decompression key.

Without it, a vector store becomes a collection of derived impressions detached from the evidence that made them meaningful.

This is especially dangerous when models change. If the original source remains linked, the representation can be regenerated. If only the vector survives, the organization has preserved an interpretation while losing the thing interpreted.

The principle is almost archival.

Indexes should be replaceable.

Sources should be durable.

The future of vector systems may therefore involve more representation, not less: multiple vectors, multiple modalities, explicit graphs, structured metadata and source-level provenance operating together.

That does not betray the promise of embeddings.

It clarifies it.

The vector is valuable because it is a compact, useful loss.

A mature system knows which losses it can afford and keeps another representation nearby for the details it cannot.