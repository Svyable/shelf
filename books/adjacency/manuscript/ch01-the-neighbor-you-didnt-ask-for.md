# The Neighbor You Didn't Ask For

In 2019 a group of materials scientists published a paper with an unsettling implication.

They had trained a machine-learning system on the language of their field. Not on a carefully labeled catalog of chemical rules. Not on a database in which experts had already explained which compounds belonged together. They trained word embeddings on the literature itself: the accumulated sentences of scientists describing materials, properties, experiments, structures and results.

Then they looked at the geometry.

The system had learned relations that nobody had explicitly programmed into it. Chemical elements arranged themselves in ways that echoed the structure of the periodic table. Words associated with particular properties clustered near the materials that exhibited them. The language of the field, transformed into vectors, contained a map of the field.

The researchers went further. They trained embeddings using only papers published before particular dates and asked which materials were located near concepts such as thermoelectricity. Some of the highly ranked materials were not yet known, at that historical moment, for the applications the model associated them with. Scientists would study them later.

This did not mean the machine had predicted the future in the mystical sense. The model had no theory of time. It had no laboratory. It had not discovered a new law of physics. What it had done was stranger and, in some ways, more useful.

It had noticed that a future discovery was already adjacent to the existing literature.

The ingredients were present. The relations were present. The field had collectively written enough partial evidence that a geometric representation could place certain materials close to an idea before the scientific community had made the connection explicit.

That is a different conception of discovery.

The romantic picture of discovery gives us a lone mind and a sudden light. A scientist sees what everyone else missed. A musician hears the melody nobody else could hear. An entrepreneur notices a market that did not exist until somebody named it. This picture survives because sometimes it is true, and because stories become easier to tell when causality has a face.

But much discovery is less like lightning than like neighborhood change.

Two things that were previously far apart become close enough to interact.

A technique migrates from one discipline into another. A tool becomes cheap enough to be used on a different problem. A paper written for one purpose is read by somebody with another. A mathematical idea finds a physical application. A customer uses a product in a way the product team did not anticipate. A molecule resembles a known compound in one important dimension while differing in another. A reader encounters a book because it was shelved, linked, cited or recommended beside something familiar.

Discovery often begins when the next thing enters reach.

For most of history, reach was physical and social. You could discover the books in the library you could visit. You could learn from the people in the room, the city, the institution or the correspondence network. The shape of intellectual life was partly the shape of travel, printing, postal routes, universities, laboratories, conferences and personal acquaintance.

Modern information systems expanded that reach dramatically, but they did so through a particular architecture. We indexed things by names, categories and words.

A card catalog tells you where a known book is. A subject heading groups books under a human-curated term. A database query returns records matching a field. A keyword search engine looks for the strings you supplied, perhaps with increasingly sophisticated methods for expanding, ranking and interpreting them.

This works extremely well when the world and the question share vocabulary.

It works less well when they do not.

Suppose you are searching a legal archive for cases involving a company that manipulated a market without an explicit agreement with its competitors. You might search for collusion. But the relevant opinions may discuss coordination, parallel conduct, facilitating practices, information exchange or conscious parallelism. A capable human researcher knows that the problem has a semantic neighborhood larger than the original word.

Suppose you are searching a photograph collection for an image of a lonely highway at dusk. The photographer may never have tagged the file with lonely. The image contains asphalt, sky, a car, perhaps telephone poles. The quality you care about lives in the relation among those things, not in a literal label.

Suppose you want music that feels like the last song you loved but is not by the same artist, not from the same year and not even necessarily from the same genre. You do not want equality. You want adjacency.

The old information problem was finding the item that matched the description.

The new information problem is finding the item that belongs near the intention.

Vector representations make that computationally tractable.

A vector is simply an ordered list of numbers. In machine learning, those numbers can encode a learned representation of an object: a word, sentence, image, sound, product, customer, research paper, molecule or nearly anything else that can be transformed into features. The vector places the object somewhere in a mathematical space with many dimensions.

We should be careful with the metaphor immediately. The point is not literally sitting in a hidden warehouse behind your screen. The dimensions usually do not correspond neatly to concepts a person could name. There may be no single axis for sadness, thermoelectricity, legal risk or seventies funk. Meaning is distributed through the pattern.

But the geometry has consequences. A system can compare vectors and estimate which are close. It can search for nearest neighbors. It can cluster points. It can move between representations. It can use one vector as a query and retrieve other objects located nearby.

That sounds modest until the space contains a billion things.

Then the ability to ask what is near becomes an infrastructure for discovery.

A search box can retrieve passages that share meaning with a question even when they do not share its wording. A recommendation system can locate videos near a user's learned preferences. A scientific tool can suggest papers near the conceptual shape of another paper. A vision model can place images and text in a shared space so that a sentence can retrieve a photograph. A drug-discovery system can compare molecules or proteins through learned representations that capture more than surface identity. A language model can turn a question into a vector, retrieve nearby documents and use them as context for an answer.

The important word in each case is nearby.

We are accustomed to thinking of databases as boxes that store things. Vector systems add a different intuition. The database is also a landscape.

That landscape is useful because most human questions are under-specified.

A person asking for “something like this” has often communicated more than a person who supplies ten rigid filters. We understand resemblance fluidly. We can recognize the same face under different lighting, a similar melody in another arrangement, an analogous problem in a new industry, a joke with the same structure, a political argument wearing different vocabulary. Human intelligence is saturated with similarity judgments.

Computers were historically much better at exactness.

The vector turn closes part of that gap by making resemblance numerical enough to compute.

Not perfectly. Not neutrally. Not once and for all.

Enough to build systems around it.

This is why vector search should not be understood as merely a faster way to search a database. It changes the primitive operation.

Relational databases are astonishingly good at questions with explicit predicates. Find every invoice above $10,000 issued after January 1. Return all customers in Illinois with an active subscription. Join this table to that table using the account identifier. Exact structure deserves exact tools.

Vector search is strongest when the relation itself is fuzzy. Find passages about the same underlying problem. Find products similar in style. Find images that express this description. Find proteins with related representations. Find users whose behavior occupies a nearby region. Find candidate documents likely to contain the information needed to answer this question.

The difference is philosophical as well as technical.

A predicate declares the boundary in advance.

A vector neighborhood discovers the boundary from the representation.

This is why the result can surprise us.

The materials-science embeddings did not begin with a rule saying that a particular family of compounds should be considered alongside a particular functional property. The relations emerged from patterns in the literature. The system could therefore surface connections that were implicit rather than cataloged.

Implicit knowledge has always been one of humanity's largest inaccessible resources.

We know more collectively than any person can read. We write connections into language without labeling them as connections. A physician describes a symptom pattern in one paper and a molecular mechanism in another. Engineers publish performance results whose significance changes when a new manufacturing method arrives. Economists study one market structure while software designers unknowingly recreate its incentives. Historians describe institutional patterns that a policymaker would recognize immediately if the two vocabularies could meet.

The problem is not only information abundance.

It is relational abundance.

There are too many possible pairs.

If you have one million documents, there are nearly half a trillion possible unordered pairs of documents. Most pairings are useless. Some are obvious. A tiny fraction may matter enormously. No team of librarians can inspect them all. No scholar can hold the entire literature of a mature field in memory.

A learned vector space is one attempt to compress that impossible relational problem.

Instead of explicitly recording every relation between every pair, we learn positions such that useful relations are reflected by distance and direction. The compression is imperfect, but it makes a previously intractable question cheap enough to ask repeatedly: what else is near this?

This changes the economics of curiosity.

Curiosity has always had a search cost.

Imagine a researcher who suspects that a concept from ecology might help explain a problem in computer networks. In a physical library, crossing that disciplinary distance could require knowing which ecology terms to look up, which journals mattered, which authors defined the field and which books were worth carrying back to the desk. Search engines lowered that cost. Semantic systems lower another layer: the cost of not yet knowing the other field's vocabulary.

The researcher can begin with the problem she has and retrieve material near its meaning.

The same thing happens in consumer discovery. The old retail catalog required a shopper to move through a taxonomy: men, outerwear, jackets, wool. A modern system can represent the shopper, the product and the interaction history in ways that let the relevant neighborhood be discovered rather than declared.

This can feel magical because the machinery is hidden.

You finish a song and the next one seems right.

You paste a paragraph into a search tool and it finds a paper you would not have known to query.

You describe an image that never had your words attached to it and the image appears.

You ask an AI assistant a question about a private corpus and it retrieves three passages from three different documents that collectively supply the answer.

The interface is simple because the complexity has moved into representation.

That move deserves attention.

Every map has a cartographer, even when the cartographer is a training objective.

A vector space does not reveal the natural geometry of the world as if somebody had lifted a cloth from an existing landscape. It constructs a geometry from data, architecture, objectives and choices. A different model can produce a different neighborhood. A model trained for search may arrange items differently from one trained for recommendation. A representation optimized to recognize visual categories may not preserve the distinctions a historian cares about. A chemical representation useful for one property may fail at another.

There is no universal adjacency.

There are adjacencies for purposes.

That fact is easy to forget because geometry feels objective. Once something has coordinates, distance seems like measurement rather than judgment. We are tempted to treat the nearest result as if the system simply found what was already closest.

But closeness had to be defined.

The model learned what patterns to preserve. The engineers chose how to train it. The retrieval system chose a similarity function. The product chose how many neighbors to return, whether to filter them, how to rerank them and which signals to mix with vector similarity. Business rules may quietly override mathematical proximity. Safety rules may exclude regions. Freshness may matter more than closeness. Popularity may be added. Diversity may be enforced. Sponsored material may enter through another door.

The neighborhood is built.

Once built, it shapes behavior.

That is the more consequential part of the story.

The materials scientist who sees a candidate compound may test it. The reader who receives a paper may cite it. The shopper who receives a recommendation may buy it. The language model that retrieves a passage may use it to generate the next paragraph. The next action changes the data from which future systems may learn.

Vector spaces do not sit outside the world.

They enter feedback loops with it.

A recommendation changes attention. Attention changes consumption. Consumption changes future training data. A semantic search result changes which papers are read. Read papers become cited papers. Citations become signals for later document representations. A retrieved document becomes part of an AI system's answer, which may itself be published, indexed and embedded.

Adjacency can become destiny by repetition.

That should make us neither frightened nor impressed too quickly.

All discovery systems shape discovery. Libraries choose classification schemes. Journals choose what to publish. Search engines rank. Professors assign. Conference organizers curate. Social networks place one person's post beside another's. Bookstores decide which titles face outward and which remain spine-in on the shelf.

The novelty is that learned geometry can now perform this placing at enormous scale and with extraordinary fluidity.

The shelf can rearrange itself for every reader.

The library can generate a new subject neighborhood for every query.

The map can connect text to image, customer to product, question to evidence, sequence to structure.

And because the map is numerical, other machines can navigate it without waiting for a person to name each step.

This is one reason vector systems fit so naturally inside the present wave of artificial intelligence. Large language models are impressive generators, but generation alone is not enough for many useful tasks. A model answering a question about a company's current contracts needs access to those contracts. A coding agent needs the relevant parts of a repository. A customer-service system needs the correct policy. An autonomous research system needs papers, data and prior experiments.

The question becomes: which pieces of the world should enter the model's attention now?

Vector retrieval offers one answer.

Embed the current need. Find its neighbors. Put those neighbors in context.

A surprising amount of modern AI architecture can be understood through that sequence.

Representation.

Adjacency.

Attention.

Action.

The sequence is powerful precisely because it is general. The same machinery can retrieve a paragraph, a product, a tool description, a past memory, an image, a code function or a scientific candidate. The objects change. The geometric operation remains recognizable.

The deepest revolution may therefore be quieter than the spectacle of generated prose and synthetic images.

It is the conversion of more and more of the world into navigable neighborhoods.

That changes what a machine can find before it knows the right name.

It changes what a person can encounter before knowing the right question.

The first great information revolution digitized the objects.

The next indexed them.

The vector turn learns where to place them in relation to one another.

And once things have neighbors, discovery becomes a journey through the space between what you already know and what sits just close enough to change it.

## The Cost of Naming

There is another way to see the change. For most of recorded history, discoverability depended on somebody doing the work of naming first.

A specimen entered a museum and had to be identified. A book entered a library and had to be classified. A patent entered an office and had to be placed within a technical scheme. A physician encountered a cluster of symptoms and, if the pattern became stable enough, medicine eventually gave it a diagnostic name. Names are among civilization's most powerful compression devices because a good name lets many observations travel together.

Naming also creates a gate.

If you know the name, an archive opens. If you do not, the same archive can remain invisible.

Ask anyone who has tried to identify a mechanical part without knowing what the part is called. You can hold the object in your hand and still be unable to find it. The knowledge problem is not absence of evidence. The problem is that the object and the catalog do not share a key.

A skilled clerk, librarian, mechanic or researcher traditionally solved this translation problem. You described what you had badly. The expert moved through a private chain of equivalences.

“It is the little rubber ring that seals the connection.”

An O-ring?

“No, flatter.”

A gasket?

“It sits inside the fitting.”

A washer? A seal? Which fitting?

The expert progressively moves the problem into the vocabulary of the system. Expertise includes knowledge of names, but also knowledge of how novice descriptions map onto them.

Search engines automated part of this translation. Spelling correction, synonyms, query expansion, links and large-scale behavioral data made literal text search far more forgiving than a card catalog. Yet the interaction still often rewarded the person who could produce the right terms.

The vector turn reduces the naming tax one layer further.

Instead of insisting that the object and the query share a label, a learned representation can ask whether their patterns resemble one another enough to deserve comparison. A photograph can search for a product without naming the product. A paragraph can search for a paper without knowing the field's canonical phrase. A customer can describe a use case in ordinary language and retrieve documentation written by an engineer.

This sounds like convenience. Across institutions it becomes access.

Jargon is a necessary technology. Experts need precise vocabulary because important distinctions deserve names. The distinction between a correlation and a causal effect is not bureaucratic decoration. Neither is the distinction between a virus and a bacterium, revenue and cash flow, authentication and authorization, an appeal and a rehearing. Precision lets specialists coordinate.

But every specialized vocabulary creates an entry cost for outsiders.

A patient knows what hurts before knowing what the condition is called. A junior engineer can recognize a failure pattern before knowing the internal acronym attached to it. A small supplier may describe a capability in language different from a large buyer's procurement taxonomy. An interdisciplinary researcher may understand the structure of a problem while lacking the neighboring field's keywords.

Semantic retrieval can lower that entry cost without making the vocabulary itself obsolete.

The expert terminology still matters when the candidate reaches attention. The machine merely helps the candidate get there.

This is why vector discovery is best understood as a widening of the first doorway, not the abolition of the rooms behind it.

Once you find the legal opinion, you still need doctrine. Once you find the scientific paper, you still need method. Once you find the molecule, you still need chemistry. Once you find the expert, you still need to know whether the expert is right.

The representation helps with encounter.

Encounter is not adjudication.

That boundary is easy to lose in interfaces designed to feel effortless. A semantic search box can make a difficult act of translation look instantaneous. The user writes one vague sentence and receives a crisp result. The experience encourages a story in which the machine understood the request and found the answer.

Sometimes it did something more modest and more mechanical: it placed the request in a neighborhood that contained useful candidates.

That modesty matters because neighborhoods can be wrong in systematic ways. A model trained heavily on standard professional English may translate an expert's phrasing better than a regional dialect. A product embedding may understand the vocabulary of well-described catalog items better than the long tail with sparse metadata. A scientific representation may be sharp in a dense research area and vague at the frontier.

Removing one naming barrier can expose another representational barrier.

The correct question is therefore not whether vector systems eliminate the need to know the right words.

It is whose imperfect words they can successfully carry across the gap.

That question becomes testable. Take the same need and phrase it as an expert, a novice, a non-native speaker, a customer, a technician and a regulator. Does the same useful neighborhood appear? Describe the same object with text, an image and an example. Does the system converge on compatible candidates? Remove the canonical jargon from the query. Does recall collapse?

A discovery system earns its promise by tolerating the user's starting point.

This is more important than it may appear because discovery usually begins before articulation is complete.

The first sensation is often not “I need information about X.”

It is “this reminds me of something.”

“This feels wrong.”

“I have seen a pattern like this before.”

“There ought to be a material that does both.”

“This photograph has the atmosphere I want.”

“This customer problem sounds like an incident from years ago.”

These are low-resolution queries. Human experts turn them into higher-resolution questions through conversation, memory and analogy. Vector systems make some of that low-resolution material computationally addressable.

That changes the beginning of the search process.

Previously, uncertainty about the name often forced a person to browse a taxonomy, ask an expert or abandon the search. Now a system can return a provisional neighborhood. The user inspects it. One result supplies better vocabulary. The better vocabulary produces a narrower query. A new result reveals an exception. The user adds a constraint. Search becomes a dialogue between representation and refinement.

The first retrieval does not have to be right enough to end the search.

It has to be useful enough to improve the next question.

This is a more realistic theory of discovery than the perfect answer box.

Discovery is usually recursive.

You find something that teaches you what to look for next.

A vector neighborhood is valuable because it can produce that first informative neighbor when the destination is still unnamed.

And that is why the neighbor you did not ask for matters.

The system is not merely answering a query.

At its best, it is helping you acquire the language for the query you were not yet able to make.