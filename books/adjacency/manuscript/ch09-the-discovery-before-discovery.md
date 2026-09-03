# The Discovery Before Discovery

A discovery often exists before anybody calls it one.

Not as a finished fact. Not as a result waiting politely in a drawer. It exists as a collection of clues that have not yet been placed beside one another.

A property is reported in one class of materials. A structural motif appears in another. A manufacturing technique becomes cheap enough to make an old idea practical. A paper describes an anomaly that nobody follows. A measurement method migrates into a neighboring field. The pieces are public. The connection is not.

This is the peculiar interval between knowledge and discovery.

The world has disclosed enough for the next step to be possible, but the step has not been taken.

That interval has always been important. It is where scientific judgment lives. A researcher notices that two facts belong in the same sentence. A laboratory realizes that a tool built for one purpose can answer another question. An engineer reads an old paper under new economic conditions and sees a design that was premature rather than wrong.

Vector representations make that interval computationally interesting because they can expose relations before anyone has named the relation explicitly.

The 2019 materials-science work we encountered earlier is a clean example. The authors trained word embeddings on millions of materials-science abstracts. The system learned from ordinary scientific language. It was not handed a periodic table. It was not given a curated table saying which compounds should be associated with which functional properties.

Yet the learned geometry reflected recognizable chemical structure. Elements formed neighborhoods reminiscent of the periodic table. Materials appeared near words describing relevant properties. Most strikingly, embeddings trained only on literature available before a given historical date could rank some materials highly for applications that the later literature would study more explicitly.

The temptation is to call this prediction.

That word is partly right and partly dangerous.

The system did not predict an event such as a stock price or an election result. It did not know that a laboratory in 2008 would publish a paper about a particular material in 2012. It identified candidates whose position in the prior literature made them unusually adjacent to a functional concept.

The discovery had not happened.

The neighborhood already contained it.

This distinction matters because it points toward a different role for machine learning in science.

The public imagination tends to frame scientific AI as a contest between machine and scientist. Can the model discover a drug? Can it invent a material? Can it generate a hypothesis no human has seen? Those are legitimate questions, but they encourage us to imagine discovery as a single heroic act with a clear owner.

Real science is often a chain.

Somebody measures.

Somebody publishes.

Somebody notices a pattern.

Somebody proposes a mechanism.

Somebody builds an instrument.

Somebody tests the idea under a new condition.

Somebody fails.

Somebody else understands why.

The eventual result belongs to the chain more than to a single moment.

Vector systems intervene early in that chain. They can change what becomes worth inspecting.

This is candidate generation for knowledge.

A materials scientist may face a chemical space too large for exhaustive experimentation. A biologist may face millions of sequences. A battery researcher may face compositions, structures and synthesis conditions whose combinations multiply faster than laboratory capacity. The goal is not to ask the machine to replace the experiment. It is to ask the machine to narrow an impossible search space into a plausible frontier.

That is what every serious discovery process does anyway.

A laboratory never tests everything.

It chooses.

The choice is informed by theory, precedent, intuition, instrument access, cost, fashion, funding, expertise and chance. Machine-learned representations add another source of prioritization: learned adjacency.

This can be especially powerful when the relations are distributed across a large literature.

A human expert may read deeply enough to build a strong local map. She knows the canonical papers, the rival schools, the laboratory tricks that never make it into methods sections, the materials that always contaminate, the surprising result from a conference five years ago. Her map has causal and practical texture a generic embedding does not.

What she cannot do is read millions of abstracts without forgetting most of them.

The machine has the opposite strength.

It can build a shallow relational impression over a scale no person can hold in working memory.

The interesting collaboration begins when those strengths meet.

The machine surfaces a candidate.

The expert asks why it might matter.

That question can lead to a mechanism, a rejection or an experiment.

The value is not that the model was “right.” The value is that a previously distant candidate entered the scientist's attention cheaply enough to be considered.

This is why scientific adjacency should be judged by enrichment rather than prophecy.

Suppose a field contains one million possible candidates and one thousand are genuinely promising under a particular criterion. Random selection gives a one-in-a-thousand chance of choosing a promising candidate. A model that moves many of those thousand into the top ten thousand has created value even if most of its recommendations still fail.

The laboratory can now spend scarce experimental capacity in a region with a higher density of useful possibilities.

That is not omniscience.

It is better search economics.

The same logic appears in high-throughput screening, computational chemistry, protein design and materials discovery. Machine learning can rank or generate candidates, but the physical world remains the final adjudicator. A compound that looks promising in a learned space may be unstable, toxic, impossible to synthesize, expensive, brittle, poorly soluble or dependent on a mechanism the representation did not preserve.

The representation is a proposal about relevance.

The experiment is an argument with reality.

The distinction protects science from a common mistake of the AI era: confusing model-space success with world-space success.

A model can optimize a score beautifully. The material still has to exist.

This became vivid as deep learning expanded materials discovery. Work such as the 2023 GNoME project used graph neural networks and large-scale computational screening to identify vast numbers of potentially stable inorganic crystal structures, dramatically expanding the set of predicted materials. The scientific opportunity is real. So is the distance between a computationally promising structure and a material that can be synthesized reproducibly, characterized, manufactured and used economically.

The prediction creates an adjacent possibility.

The laboratory decides whether the possibility survives contact.

That gap is not an embarrassment. It is the structure of discovery.

The same is true of the literature itself.

A scientific corpus is not a complete record of nature. It is a record of what researchers chose to study, managed to measure, decided to write, succeeded in publishing and described in the vocabulary of their time.

Every embedding trained on that literature inherits its absences.

Negative results are underrepresented.

Failed experiments disappear.

Fashionable topics produce denser linguistic neighborhoods than neglected ones.

Prestigious institutions receive more attention. Some disciplines publish in English more consistently than others. Proprietary industrial knowledge may never enter the public corpus. A discovery system trained on papers cannot retrieve what the literature systematically failed to record.

The map may be rich precisely where science has already looked hardest.

This introduces a bias toward discoverable adjacency.

The candidate nearest to a known functional concept may be near because the field has already described similar things extensively. A more radical candidate may sit in a sparse region where the language model has little evidence.

In other words, a literature-derived map can reveal latent knowledge while still favoring the intellectual geography that produced the literature.

The same system can broaden search and inherit its boundaries.

This is why a scientific discovery engine should not optimize only for closeness.

The nearest candidates are often the least adventurous.

A more useful system may combine exploitation and exploration. It can identify candidates strongly supported by known relations while reserving part of the search budget for less familiar regions. It can look for points that are close under one property but distant under another. It can surface outliers whose local neighborhoods violate the dominant pattern. It can propose bridges between clusters rather than only representatives of the clusters themselves.

Discovery often lives in structured surprise.

Too familiar and the experiment confirms what everybody expected.

Too alien and the experiment wastes scarce capacity on noise.

The frontier is the region where enough is known to make the question legible and enough is unknown to make the answer matter.

This is adjacency in its strongest sense.

Not sameness.

Reachable novelty.

The idea has a history far older than embeddings. Innovation scholars have long observed that new technologies often arise through recombination: existing components, methods and concepts assembled in new ways. Scientific citations reveal fields borrowing from one another. Patent analysis shows inventions combining technological classes. Cities and institutions accelerate innovation partly because they increase the probability that different capabilities encounter one another.

The vector turn gives us a computational version of recombination.

Represent many things in a common space. Measure relation. Find bridges. Search the neighborhood of a concept. Traverse from one region into another.

The machine can perform millions of these relational checks before lunch.

That does not make the machine creative in exactly the human sense. It changes the cost of searching for useful combinations.

This distinction may turn out to matter more than debates about whether a model is “really” creative.

Imagine two laboratories with equal experimental skill. One chooses candidate experiments from the intuition and reading of five researchers. The other has the same five researchers plus a system that continuously maps new papers, compounds, methods and anomalous results into learned spaces, then suggests cross-field adjacencies worth inspecting.

The second laboratory does not need the system to possess scientific taste equal to its researchers.

It needs the system to improve the opportunity set.

A small increase in candidate quality, repeated over years, can compound into a large difference in scientific output.

This is the economics of discovery again.

The scarce resource is not only intelligence.

It is experimental attention.

Every experiment consumes time, equipment, materials, money and human focus. Every paper carefully read excludes another paper. Every grant supports one route through the search space rather than the countless routes not taken.

Better maps increase the expected value of those scarce moves.

The emerging work on concept graphs pushes this further. In 2026, researchers reported using large language models to extract scientific concepts from materials-science abstracts and build dynamic concept networks. Instead of treating a paper as a single point, such systems can attempt to identify entities and relationships inside the text, then examine how new links might form among concepts over time.

The representation becomes more explicit.

A vector says these objects are near.

A graph tries to say how they are connected.

The combination can be powerful because scientific discovery often needs both fuzzy resemblance and interpretable relation.

A researcher may want papers semantically similar to an idea, then inspect the specific concepts, materials and methods that link them. A vector retrieves the neighborhood. A graph offers paths through it. The original papers provide the evidence beneath both.

This layered approach is safer than asking one model to produce a confident answer from a compressed representation.

Science depends on recoverability.

You should be able to move from the suggestion back to the source, from the source back to the measurement, and from the measurement back to the physical procedure that produced it.

A vector without provenance is a rumor with coordinates.

That line becomes more important as generative models enter research workflows. A system that merely recommends a paper exposes the object of judgment. A system that reads a thousand papers and generates a novel hypothesis can hide how much of the hypothesis came from strong evidence, weak analogy or model improvisation.

The more the system synthesizes, the more scientists need a visible trail.

What papers contributed?

Which claims were direct?

Which relations were inferred?

Which candidate is being recommended because of semantic proximity rather than known mechanism?

What evidence would make the suggestion false?

These questions do not slow discovery unnecessarily.

They distinguish discovery from suggestion.

A machine can produce suggestions almost without limit.

Science earns discoveries by surviving attempts to break them.

This is why the most valuable scientific AI systems may not be those that generate the most ideas. The scarce commodity in an age of cheap generation will be useful discrimination.

If a model can propose ten thousand hypotheses overnight, the laboratory has not gained ten thousand experiments. It has gained a prioritization problem.

The bottleneck moves downstream.

Which hypothesis is novel rather than rephrased?

Which is physically plausible?

Which can be tested with available instruments?

Which, if false, would still teach us something?

Which sits adjacent to enough existing knowledge that a decisive experiment can be designed?

The vector space helps answer the first sorting questions. It does not dissolve the bottleneck.

It relocates it toward judgment.

This is a theme running through many of the technologies in this book. Cheap representation and cheap search make larger possibility spaces operational. Once that happens, the scarce resource becomes the capacity to choose well among the possibilities.

The discovery before discovery is therefore not a hidden fact waiting for a model to uncover it.

It is a structured opportunity.

Enough evidence has accumulated for a connection to become worth testing.

The machine can help notice that moment because the geometry changes before the vocabulary does. A new method starts appearing near an old problem. A material moves into the neighborhood of a property. A cluster of papers begins to bridge two fields. A candidate sits at the edge of a known region with just enough support to justify a closer look.

Then the work begins.

The model has shortened the distance.

A scientist still has to cross it.

## Prospect Before Prediction

There is a useful word for what these systems often provide: prospecting.

A prospector does not prove that every promising formation contains something valuable. The work narrows where to look next.

Scientific machine learning frequently has the same structure. It can enrich a candidate set, identify an unusual region, rank a hypothesis or suggest a connection. Those contributions matter even when the success rate is far below one hundred percent because the baseline search space is enormous and physical validation is expensive.

The temptation to call every ranked candidate a prediction creates two problems.

First, it overstates what the model knows.

Second, it understates what good prioritization is worth.

A laboratory does not need a supernatural oracle to benefit from a system that improves the quality of the next ten experiments. It needs the system to shift scarce effort away from obviously unpromising territory and toward questions with higher expected information value.

That can be evaluated prospectively.

Take a model trained only on information available before a cutoff. Ask it to rank candidates. Then follow what later experiments establish. This kind of temporal separation is powerful because it approximates the situation the system would face in genuine discovery: the future evidence is not available during training.

The 2019 materials-literature work is compelling partly for this reason. Historical slices let researchers ask whether a representation built from earlier literature placed some future-relevant materials near functional concepts before later publications made those associations obvious.

Even this test needs humility.

Later publication is not identical to objective truth. A material can become studied because it was fashionable, accessible or economically interesting. Another promising candidate may never receive enough attention to appear in the later record. The future literature is a better benchmark than the past only in a limited sense.

Science does not produce a complete label set for its own missed opportunities.

That makes discovery evaluation unusually difficult.

In ordinary classification, we hope to know the correct answer for the test examples. In research, the most interesting examples may be the ones nobody has tested yet. A candidate can remain neither right nor wrong because no laboratory spends the money to find out.

The absence of validation can therefore reflect scientific economics rather than model quality.

This is where active learning becomes conceptually important. Instead of asking only which candidate looks best, an adaptive system can ask which experiment would teach the model the most. A candidate with uncertain outcome may be valuable because testing it would clarify a boundary in the representation or distinguish competing hypotheses.

The objective shifts from exploitation to information gain.

That is a deeper form of adjacency.

The system is not merely searching for points near the desired property. It is searching for points whose outcomes would redraw the map.

Imagine two candidate materials. One sits deep inside a well-understood cluster where the model predicts strong performance with high confidence. The other sits near the boundary between two regions where the model is uncertain. If the only goal is immediate performance, the first candidate may be rational. If the goal is learning a new design rule, the second may be more valuable.

The best experiment depends on what the laboratory wants to know next.

This is why scientific discovery systems should expose uncertainty and novelty separately from predicted value.

A ranked list with one score encourages a false simplicity. Scientists may want several axes:

How promising is the candidate?

How novel is it relative to known examples?

How uncertain is the model?

How expensive is the experiment?

How much would the result update the model or theory?

Can the candidate actually be synthesized or measured with available equipment?

These are not implementation details.

They are the structure of scientific choice.

Machine learning becomes most useful when it helps organize these tradeoffs without pretending to collapse them into one universal number.

The same principle applies to hypothesis generation from literature. A language model can produce a plausible connection between two concepts. Plausibility is not enough. The useful system asks what chain of evidence would support the connection, what existing result argues against it, what experiment discriminates among mechanisms and whether the hypothesis is genuinely absent from prior work rather than merely phrased differently.

Cheap generation raises the value of expensive falsification.

This is the asymmetry scientific AI will have to learn to live with.

A model can generate hypotheses at electronic speed.

A cell culture still grows in biological time.

A material still has to be synthesized.

A telescope still waits for the sky.

A clinical trial still involves people and institutions.

The physical world keeps the meter running.

That makes prioritization the central economic function of machine-assisted science.

The system earns its place not by replacing the laboratory but by helping the laboratory spend reality more wisely.

This also creates a standard for responsible claims. If a computational system ranks a candidate, say it ranked a candidate. If a simulation suggests stability, say it suggests stability. If a material is synthesized, say it was synthesized. If the measured property matches the prediction, say that. If a result replicates, distinguish replication from initial demonstration.

The vocabulary of discovery should preserve the chain.

Otherwise the most exciting word—*discovered*—swallows all the steps and makes it impossible to know what the machine actually contributed.

The discovery before discovery is not lesser science.

It is the work of improving the frontier before the experiment commits scarce resources.

A good map does not deserve credit for arriving at the destination.

It deserves credit for making the expedition rational enough to attempt.