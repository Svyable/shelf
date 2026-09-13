# The Evidence Supply Chain

Information has a supply chain.

A fact is measured, recorded, published, copied, indexed, summarized, cited, retrieved, transformed, and finally used. At each step, something can be lost. At each step, something can be added. By the time a claim reaches the person making a decision, it may be several transformations away from the event that made it true.

Generative AI does not replace this chain.

It becomes a new logistics layer inside it.

That is a better way to understand reliability than imagining a model as a self-contained oracle.

An answer about a company's revenue may begin with transactions, move through accounting systems, enter an audited filing, get summarized by a financial database, appear in a news article, get indexed by search, retrieved by an AI system, and compressed into one sentence.

If the sentence is wrong, where did the error enter?

The model is one possibility.

It is not the only one.

The source filing can contain a later restatement. The financial database can map a field incorrectly. The article can use an outdated number. Search can retrieve the wrong period. The model can confuse quarterly and annual data. The final interface can omit the date.

A useful hallucination framework has to cover the chain.

This matters because model improvements can hide upstream weakness.

A more capable system may faithfully summarize a bad source.

From the model's perspective, the answer is grounded.

From the user's perspective, the answer is wrong.

Grounding is only as strong as the evidence supply.

The phrase *garbage in, garbage out* is too crude for this problem because much of the input is not garbage. It is partial, stale, interested, decontextualized, or correct for a different question.

Evidence quality has dimensions.

Authority.

Freshness.

Independence.

Relevance.

Completeness.

Directness.

Provenance.

A source can be excellent on one dimension and weak on another.

A company press release is authoritative evidence of what the company announced. It is not independent evidence that the announcement's interpretation is fair. A decades-old peer-reviewed paper may be methodologically strong and obsolete for a current technology claim. A recent social-media post may be timely and unverified. A government database may be authoritative but revised on a lag.

Generative systems need source judgment, not merely source retrieval.

This is partly an engineering problem and partly an editorial one.

Search rank answers: what is likely relevant?

Evidence rank should answer: what deserves to support this claim?

Those are different questions.

The page most semantically similar to a query may not be the best evidence. A marketing site can use exactly the terms the user asks about. A regulator may describe the same concept in formal language that scores lower on naive relevance.

A trustworthy research system should be able to prefer the regulator for regulatory status and the company for the company's own current product specifications.

Source selection is claim-dependent.

This suggests a move away from citation as decoration toward citation as architecture.

The system should know why each source is present.

Source A establishes the date.

Source B establishes the measured outcome.

Source C provides an interpretation.

Source D contradicts C.

Once sources have roles, the system can reason about gaps.

If no source establishes the date, do not invent it.

If all interpretations trace to one interested source, do not call them independent confirmation.

If a current policy is being inferred from an older version, say so.

If a causal conclusion belongs to the model rather than the source, mark it as inference.

This is evidence-aware generation.

It is more difficult than retrieval-augmented generation because it requires a representation of support.

The difference resembles the difference between a stack of documents and a legal brief.

A stack contains material.

A brief connects propositions to authority.

The same principle can be built into AI systems.

A claim graph is one possible model. Each generated proposition points to evidence nodes. Evidence nodes carry source metadata. Inferences connect propositions. Contradictions remain visible. The final prose is a rendering of this structure, not the only place the structure exists.

That would change what happens when the prose is summarized again.

Today, a paragraph can lose its citations when copied into a new context. If the claim graph persists separately, the next system can inherit the provenance even when it rewrites the sentence.

This is the missing infrastructure behind shared hallucination.

Plain text is too lossy for high-stakes machine-to-machine knowledge transfer.

We use typed data everywhere else for this reason.

A date field is not just a string. A currency has units. A database record has identifiers. A software function has expected inputs and outputs. Types prevent certain classes of error by keeping distinctions explicit.

Generated knowledge needs types too.

Observed.

Retrieved.

Quoted.

Calculated.

Inferred.

Estimated.

User-supplied.

Disputed.

Superseded.

Unknown.

The categories need not be these exact words. The principle matters more than the schema.

A sentence should not be able to climb from "user-supplied hypothesis" to "verified organizational fact" merely because it passed through enough summaries.

That is an information-control problem.

Supply chains also depend on chain of custody.

In criminal evidence, the object matters and the history of handling matters. A sample whose origin cannot be established loses evidentiary value even if the laboratory test itself is flawless.

AI systems need a lighter version of the same instinct.

Where did this text come from?

Was it authored by a person, generated by a model, extracted from a document, or transformed from another summary?

Has it been edited?

What is the canonical source?

When was it last verified?

A generated paragraph without these answers can still be useful. It should not silently become a primary source.

This distinction will become harder as synthetic content floods public information systems.

The next model may not know whether a web page was written by a journalist, generated from a press release, copied from another site, or assembled automatically from database fields.

Authorship alone will not solve the issue.

Human-written text can be wrong. AI-generated text can be correct.

The important property is evidentiary lineage.

What does the page ultimately know because of?

That question sounds philosophical. It can be operationalized.

A sports result ultimately knows because a game occurred and an official scorer recorded it. A weather reading knows because an instrument measured. A statute knows because a legislature enacted text. A corporate filing knows because an authorized reporting process produced it. A scientific claim may know because an experiment or dataset supports it, though interpretation remains contestable.

Different claims have different anchors.

The best AI research systems will learn to seek anchors rather than merely consensus.

Consensus is valuable but can be circular.

One press release creates ten articles. Ten articles create a search trend. An AI sees ten sources. Without lineage, repetition looks like corroboration.

This is evidence inflation.

The same thing happens in markets and intelligence. A rumor passes through several intermediaries and returns looking independent. Professionals call this circular reporting. Generative AI makes circularity harder to see because every retelling can be linguistically distinct.

We need source deduplication at the proposition level.

Not: do these pages share text?

Do these claims share an ancestor?

That capability would improve research far beyond hallucination reduction.

It would help users see when apparent consensus is genuinely distributed and when it is one source echoed widely.

There is also an economic side to the evidence supply chain.

Primary evidence is expensive to produce.

Reporting requires journalists. Scientific research requires laboratories, participants, instruments, and time. Public data requires agencies. Court records require institutions. Corporate reporting requires systems and audits. Local knowledge requires people maintaining pages, maps, and directories.

Synthesis is becoming cheap faster than evidence production is becoming cheap.

This creates a risk of overharvesting the evidence commons.

If AI products capture the value of synthesis while the organizations producing original evidence lose resources, the information environment can become more efficient at summarizing less primary work.

A fluent system cannot manufacture the observation a reporter never made.

It cannot retrieve the experiment nobody funded.

It cannot cite the local business hours nobody maintained.

The future of AI truthfulness therefore depends partly on the health of institutions outside AI.

That is an uncomfortable conclusion for a technology industry accustomed to treating data as an input resource.

Evidence is not merely sitting there.

Someone produced it.

Someone verified it.

Someone updated it.

Someone paid.

A mature AI ecosystem will need ways to preserve incentives for primary information and to distinguish primary work from synthetic repetition.

Otherwise the supply chain hollows out.

The models may continue improving at inference while the world they infer from becomes noisier.

There is a second supply-chain vulnerability: format conversion.

A PDF table becomes extracted text. A chart becomes a caption. A scan becomes OCR. An audio recording becomes a transcript. A database becomes a natural-language summary. Every conversion can introduce errors before the model starts reasoning.

The user may blame the model for a number that was misread by OCR.

From a safety perspective, blame matters less than traceability.

The system should know that the number came through OCR rather than direct structured data. That fact should lower confidence or trigger verification where the number matters.

Modality is provenance.

A value extracted from a blurry image is not equivalent to a value returned by an API, even if both become the same token string in context.

This is another reason plain text is insufficient as the universal internal representation.

The model may need text to reason. The system around the model should keep richer metadata.

Humans do this instinctively. We trust a signed original differently from a memory of seeing the document. We treat a photograph differently from someone's description of the photograph. We care whether a quote came from an audio recording or a third person's recollection.

AI systems can be more explicit.

The evidence supply chain can include machine-readable quality signals.

Not a universal truth score.

A record of how the claim was obtained.

This distinction is essential because truth scores invite false precision and centralized authority. Provenance empowers the downstream user to apply context-specific judgment.

A lawyer may require the original opinion.

A journalist may accept an on-the-record interview.

A customer deciding where to eat may be satisfied with several recent reviews.

The same claim can require different evidence depending on consequence.

The supply chain should therefore carry facts about evidence, while the consuming workflow decides the threshold.

This mirrors modern security architecture.

Identity providers issue credentials. Applications decide what those credentials authorize. Logging systems preserve events. Policies determine what actions are allowed.

Epistemic infrastructure can work similarly.

Sources carry identity and time.

Claims carry lineage.

Applications enforce evidentiary policy.

Users receive the right amount of explanation.

Such systems will feel less like magic and more like infrastructure.

That is a sign of maturity.

The first wave of generative AI impressed us by making the chain invisible.

Ask anything. Get an answer.

The next wave should make the right parts visible again.

Not every pipe.

Just enough to know whether the water came from the reservoir or from another glass.