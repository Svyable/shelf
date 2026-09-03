# Back Matter

## A Note on Evidence

*Adjacency* is a book about a technical idea with consequences far outside the technical systems that first made it visible.

The research trail therefore uses two kinds of evidence.

The first is direct technical evidence: original papers on latent semantic analysis, word embeddings, sentence embeddings, approximate nearest-neighbor search, multimodal representation learning, scientific document embeddings, retrieval-augmented generation, molecular and protein representations, recommendation systems and agent memory.

The second is boundary evidence: work showing where those systems become less reliable or where apparently simple objectives create other problems. Bias in embeddings, hubness in high-dimensional spaces, the limitations of accuracy-only recommender evaluation, search economics, retrieval practice in education and work on diversity-aware reranking all matter because the book's thesis depends on adjacency being useful without being treated as truth.

The detailed working source trail is maintained in `research/README.md` and `research/source-ledger.csv` beside the manuscript. Sources are kept outside the narrative so the prose can remain readable while concrete claims remain checkable.

Several distinctions guided the research.

A vector is not the object it represents.

A similarity score is not a calibrated probability unless a system has specifically made it one.

Semantic proximity is not legal, scientific or moral authority.

A computational prediction is not a laboratory result.

A recommendation is not a preference until the person chooses it.

A retrieved memory is not necessarily current truth.

A model trained on historical behavior can describe that behavior without explaining whether it was fair, causal or desirable.

A result that works in a dense region of a learned space may fail at the frontier where discovery is most interesting.

The manuscript tries to preserve those boundaries rather than using “AI understands meaning” as a shortcut through them.

## A Small Glossary of the New Map

**Approximate nearest-neighbor search (ANN)** — Methods that search large vector collections quickly by accepting a controlled chance of missing the mathematically exact nearest items. The trade is usually speed and resource use against recall.

**Bi-encoder** — A model architecture that independently encodes two objects, such as a query and a document, into vectors that can later be compared efficiently. Bi-encoders are widely used for first-stage semantic retrieval.

**Chunking** — Dividing a larger document into smaller retrieval units before embedding. Chunk size and boundaries affect whether local meaning is preserved and whether the relevant passage can be retrieved precisely.

**Cosine similarity** — A comparison based on the angle between vectors. It is frequently used with embeddings, particularly when vector magnitude is not intended to carry the main signal.

**Dense retrieval** — Retrieval using compact learned vector representations rather than only sparse lexical features such as term counts. Dense retrieval is often combined with lexical search in hybrid systems.

**Embedding** — A learned numerical representation that places an object in a vector space so useful relations can be expressed geometrically. Words, passages, images, users, products, molecules, proteins and graph nodes can all be embedded.

**Hard negative** — A training example that is plausibly similar to the correct result but should not be considered a match. Hard negatives teach retrieval models distinctions that easy unrelated negatives do not.

**HNSW** — Hierarchical Navigable Small World graphs, a widely used family of graph-based indexes for approximate nearest-neighbor search. The hierarchy supports large jumps through the space before finer local search.

**Hubness** — A high-dimensional phenomenon in which some points appear unusually often among other points' nearest neighbors. Hubs can distort retrieval by making generic or centrally positioned items appear repeatedly.

**Hybrid search** — Retrieval that combines vector similarity with lexical search, structured filters or other signals. Hybrid systems are useful because exact identifiers and semantic resemblance solve different retrieval problems.

**Knowledge graph** — A graph in which entities are represented as nodes and explicit relations as edges. Graphs complement vector spaces by preserving relation type, direction, provenance and other structure that raw proximity may not express clearly.

**Maximal Marginal Relevance (MMR)** — A family of reranking methods that balance relevance to the query against redundancy among selected results, allowing a retrieval set to remain useful without filling every slot with near duplicates.

**Multimodal embedding** — A representation space designed to compare objects from different modalities, such as text and images. Shared multimodal spaces make it possible to use one form as a query for another.

**Nearest neighbor** — An item whose vector lies closest to a query under the selected similarity or distance measure. In approximate search, “nearest” often means the best neighbor the algorithm found under its resource budget rather than guaranteed exact mathematical nearestness.

**Reranker** — A second-stage model or rule set that examines a smaller candidate pool more carefully after fast first-stage retrieval. Reranking can incorporate richer semantic comparison, authority, recency, diversity or application-specific signals.

**Retrieval-augmented generation (RAG)** — A pattern in which a generative model retrieves external information and uses it as context for generation. Vector indexes are a common retrieval mechanism, but the retrieved information can also come from search engines, graphs, databases or other tools.

**Semantic search** — Search based partly on learned meaning or relation rather than exact word overlap. Semantic systems can retrieve relevant material even when query and source use different vocabulary.

**Vector database** — A data system designed to store and search vector representations, often together with metadata, filtering, persistence and other database features. Many general-purpose databases and search engines now provide vector capabilities as well.

**Vector space** — A mathematical space in which objects are represented by vectors. In machine learning, the geometry is learned or designed so that selected relations become useful through distance, direction or other operations.

## Ten Exercises in Adjacency

These are not exercises in learning vector mathematics. They are exercises in noticing how discovery changes when you treat relation as navigable.

1. **Search before vocabulary.** Pick a subject you do not know well enough to name precisely. Describe the problem in ordinary language and compare semantic results with a keyword query using the terminology you can guess. Notice where each mode succeeds.

2. **Change the map.** Take one object—a book, song, product or paper—and list at least five legitimate notions of similarity: style, function, audience, mechanism, period, price, method or another dimension. Ask how the nearest neighbor changes under each map.

3. **Find the hard negative.** Choose two items that look extremely similar under most features but differ in one decisive way: a contract with a different date, a compatible and incompatible part, two studies with opposite conclusions. Ask whether a generic similarity system would preserve the difference.

4. **Walk one neighborhood farther.** Begin with an article or paper you know. Find something related. Then follow the neighbors of that neighbor into another community or discipline. Stop when the connection becomes noise. The useful boundary is the interesting part.

5. **Search for a counter-neighbor.** Take a claim you believe and deliberately search for the nearest serious contradiction rather than the nearest supporting material. Notice how different the discovery experience becomes when the retrieval objective changes.

6. **Audit a recommendation row.** Open a music, video, shopping or reading service. For each recommended item, guess why it is adjacent to you: recent behavior, broad popularity, content similarity, commercial promotion, social signal or something else. You will not know the proprietary system. The point is to remember that the neighborhood has an objective.

7. **Separate memory from truth.** Find an old note, plan or email that accurately records what you believed at the time but is no longer current. Imagine an AI assistant retrieving it without temporal context. What metadata would it need to avoid treating the memory as present fact?

8. **Find an organizational ghost.** At work, identify one decision, procedure or piece of expertise that is important but difficult to retrieve if the person who knows it is unavailable. Ask what source could make that knowledge semantically discoverable without turning private conversation into indiscriminate surveillance.

9. **Use distance creatively.** When working on a problem, collect three references: the closest precedent, one adjacent example from another category and one distant analogy with a transferable structure. The goal is not to use the strangest reference. It is to notice what each distance contributes.

10. **Return to the object.** Whenever a vector-mediated system gives you something consequential—a policy, scientific paper, legal authority, medical reference or financial record—inspect the source itself. The vector is an index. The source is the evidence.

## Closing Note

A useful map does not remove the need to travel.

It changes where travel can begin.

That is the promise of adjacency.

We can start with an intention that is badly phrased, an example we cannot classify, a memory we cannot address, a scientific question whose neighboring literature lives under another vocabulary, or a creative problem whose best reference belongs to another field.

The vector space says there may be a path.

The map is learned.

The path is approximate.

The nearest thing may be wrong.

The distant thing may be useless.

The source may contradict the summary.

The old memory may no longer govern.

The recommendation may serve another objective.

The candidate may fail in the laboratory.

None of this makes adjacency trivial.

It makes it honest.

Discovery has never been the elimination of uncertainty.

It is the disciplined expansion of what can be considered next.

The new maps give us more neighbors.

What we do with the neighborhood remains the work.