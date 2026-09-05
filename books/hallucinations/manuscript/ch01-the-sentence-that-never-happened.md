# The Sentence That Never Happened

In March 2023, a legal brief arrived in federal court carrying the familiar furniture of American law: party names, case citations, reporter volumes, quotations, judicial reasoning. It looked like something assembled from the accumulated record of courts deciding disputes over decades. The cases had names. The quotations had cadence. The authorities appeared to answer the question the lawyers needed answered.

Several of those cases did not exist.

The episode in *Mata v. Avianca* became one of the first widely understood demonstrations of a new kind of professional failure. An attorney had used ChatGPT while researching a personal-injury case. The system produced authorities that were not merely inaccurate in the sense of misreading a real decision. It fabricated cases, quotations, and citations. When challenged, the apparent specificity of the answers made the fiction harder to disbelieve. The court later described submissions containing nonexistent judicial opinions with fake quotes and citations and imposed sanctions. The remarkable part was not that software had made a mistake. Software has been making mistakes since software existed. The remarkable part was how completely the mistake had dressed itself as evidence.

A fake case citation is a small object with a long shadow. To a lawyer, it compresses a large amount of implied reality. A case name suggests parties who litigated. A reporter citation suggests editors, publication, pagination, and a place in a legal archive. A named judge suggests authorship. A quoted passage suggests a document that can be opened and read in context. The citation is therefore not just a string. It is a credential.

A language model can reproduce the shape of that credential without possessing the history behind it.

This is the first fact to keep in mind about hallucination. The danger does not come from nonsense. Nonsense is cheap to reject. The danger comes from form. The fabricated answer often arrives with exactly the features that normally help us trust a real one.

Imagine the opposite system. You ask for supporting precedent and the machine responds with six case names such as *Flibbertigibbet v. Moon Cheese*, followed by reporter numbers that contain letters where numbers should be. The problem would be trivial. No compliance program would be needed. No continuing-education seminar would have to warn lawyers about the risk. The user would laugh, close the window, and go back to work.

The more capable the language system becomes at imitating the surface of professional knowledge, the more expensive its mistakes can become. Better style can increase the persuasive force of a falsehood. More complete formatting can make a nonexistent source easier to mistake for a real one. A system can become safer in one dimension and riskier in another: fewer crude errors, more convincing residual errors.

This is why raw error rates never tell the whole story. Suppose one model is wrong ten times out of a hundred and signals uncertainty half the time it is wrong. Suppose another is wrong six times out of a hundred but presents every error with calm, precise confidence. The second model may be more accurate and still produce a more dangerous class of mistake in a high-stakes workflow. Accuracy matters. Calibration matters too. So does the environment in which the answer lands.

The legal system makes this unusually visible because law has a mature culture of provenance. A proposition is not strengthened merely because it sounds judicial. The authority must exist. The quotation must appear where claimed. The holding must actually support the argument. The court in *Mata* emphasized the attorney's gatekeeping responsibility. The use of a technological tool was not inherently improper; the failure was submitting invented authorities without verifying them and continuing to rely on them after their authenticity had been questioned.

That distinction matters beyond law. It separates tool use from responsibility.

Much of the public argument about AI has been organized around a childlike question: Can we trust it? The question sounds sensible and is nearly useless. Trust for what, under what conditions, with what consequences, and with what independent route to the underlying evidence? We do not ask whether we trust electricity. We ask whether a circuit is rated for the load. We do not ask whether we trust medicine in the abstract. We ask what evidence supports a treatment, what side effects are known, and who is accountable for prescribing it. A general-purpose language model does not deserve a single trust score any more than a library does.

The better question is what kind of claim has been produced and what would have to be true for us to act on it.

A generated paragraph can contain at least three different layers. Some sentences may be transformations of material supplied by the user. Some may be common knowledge the model reproduces correctly. Some may be interpolations: details that make the answer coherent but are not supported by any source available to the system. On the screen those layers can look identical. Same typeface. Same tone. Same punctuation. The interface flattens provenance.

That flattening is one reason the word *hallucination* became so sticky. It gives the impression of an event occurring inside the machine, after which the machine emits the result. But a fabricated legal case only becomes a legal problem after it crosses a boundary. The model generates. The user accepts. The filing formalizes. The court receives. The opposing party spends time checking. The institution bears the cost.

The falsehood travels.

The travel is the real subject of this book.

Consider what happens to an ordinary claim as it moves through modern work. A person asks a model for a summary. The model includes an unsupported detail. The person copies the summary into a memo. A colleague later asks another model to shorten the memo. The second model sees the unsupported detail as part of its context, not as a hypothesis with uncertain provenance. It compresses again. A slide deck is produced. The source link is omitted because there is no room. A senior decision-maker sees the slide and asks for options. A third system generates recommendations that treat the detail as settled fact.

At no point does a machine need to produce a second original hallucination. One unsupported sentence is enough. Repetition does the rest.

We have old words for parts of this process. Rumor. Citation error. Bureaucratic drift. Telephone game. Automation bias. Confirmation bias. Groupthink. None is quite sufficient. Synthetic language changes the economics. It can produce a clean, context-sensitive version of a claim at each hop. It can remove the awkwardness that once betrayed a rumor. It can generate the footnote shape, the executive-summary tone, the bullet that fits the template. It can make a weak claim easier to transport because it can continuously repackage the claim for each audience.

A falsehood no longer has to survive copying. It can be regenerated.

That difference is easy to underestimate. Traditional copying introduces visible degradation: misspellings, missing context, contradictory phrasing. Regeneration can do the opposite. It can improve the prose while degrading the evidence. The fourth version may sound more authoritative than the first even though it is farther from the source.

The problem becomes especially acute when the system is asked to fill gaps. A user wants a complete answer. The model is optimized to provide one. The requested form itself can exert pressure. Give me five examples. Draft the chronology. List the cases. Fill the table. Produce the bibliography. If only three well-supported examples are available, the interaction still contains a structural invitation to produce five.

Human beings do this too. A reporter on deadline overstates. A consultant fills a slide. A student invents a citation. A witness misremembers. A manager converts uncertainty into a date because the budget needs one. The novelty is not that machines have introduced fabrication into a previously pure human world. The novelty is that we have created systems whose core competence is completing patterns, then placed those systems inside tasks where an incomplete answer may be more truthful than a complete one.

Completion is a powerful instinct in language.

If I write, "The capital of France is," the next word is heavily constrained. If I ask for the birthday of an obscure person whose birthday was never present in reliable training data, the grammar remains easy even when the fact is inaccessible. The model can still produce a date-shaped object. It knows what an answer looks like long before it has any basis for knowing which answer is true.

That separation between answer-shaped and evidence-backed is the fault line.

We usually encounter human speech under social conditions that make this fault line less visible. When a person gives a detailed answer, we infer things about how the answer was obtained. Maybe she remembers. Maybe he checked. Maybe they were there. Expertise is not perfect, but human communication comes with a lifetime of learned cues about source, confidence, and accountability. A radiologist's statement, a neighbor's guess, and a prosecutor's filing do not carry the same weight because we know they arise from different practices.

Generated language can imitate the style of all three without inheriting the practices.

This does not make it uniquely deceptive in some moral sense. A model has no need to wake up intending to fool a court. Intention is not required for a representation to mislead. A counterfeit bill spends because it looks like money, not because the paper hates the central bank.

The phrase "the model lied" is therefore often too simple. Lying ordinarily implies a relationship to truth and an intention to misrepresent it. Hallucination is more mechanical and, in a way, more unsettling. The system can generate a false statement for the same broad reason it generates a true one: the sequence fits. Downstream users then supply the meaning we normally attach to a confident assertion.

In the *Mata* episode, one of the most revealing details was the effort to verify the fabricated authorities by asking the same system whether they were real. The chatbot reportedly affirmed the existence of at least one of the fake cases and represented that the authorities could be found in legal databases. From the human side, this can feel like corroboration. From the machine side, it may simply be another completion conditioned on the conversational history. The second answer does not automatically constitute an independent check on the first.

This is a crucial principle for the age of generative systems: repetition is not verification when the repetitions share a source.

Ask the same model twice and you may receive two similar errors. Ask two applications that rely on the same underlying model and you may receive apparent agreement from one system. Ask a model to critique its own unsupported answer and it may catch the problem, or it may rationalize it. A workflow that looks redundant can be epistemically singular.

Institutions learned this lesson elsewhere. Financial risk models can share assumptions. Credit-rating agencies can watch the same market. News organizations can all quote the same wire report. Intelligence agencies can mistake circular reporting for multiple sources. Independence is not a matter of logo count. It is a matter of information lineage.

AI makes lineage harder to see because the content is transformed at every step.

A direct quote leaves fingerprints. A generated paraphrase may not. A copied error can be searched. A regenerated error can use different words, preserve the same false proposition, and make automated duplicate detection less useful. The more natural the language becomes, the more important it is to preserve metadata about where claims came from.

This leads to an uncomfortable inversion. For years, product design has treated metadata as clutter and prose as the thing users want. Generative AI increases the value of the clutter. Source links, timestamps, confidence signals, retrieval traces, document boundaries, and notices that a claim was inferred rather than retrieved may be less elegant than a seamless answer. They are also the evidence that lets a person distinguish knowledge from completion.

The market tends to reward the seamless answer.

A user asks one question and wants one response. A search page of ten blue links once forced a small amount of epistemic labor: open pages, compare claims, notice disagreement, choose which source deserved weight. Answer engines compress that work. Compression is often genuinely useful. It is also a transfer of judgment. The system decides which sources to surface, which disagreements to omit, how strongly to phrase a synthesis, and whether a missing fact should remain missing.

Every compression creates a remainder. The question is what gets thrown away.

Sometimes the remainder is noise. Sometimes it is the only sign that the answer was uncertain.

The most dangerous hallucination, then, is not necessarily the spectacular fiction. It may be the ordinary sentence whose uncertainty vanished on the way to someone with authority to act. A fake Supreme Court case invites investigation once discovered. A subtle unsupported assumption in a procurement memo may not. It can survive because nothing about it is dramatic enough to trigger skepticism.

That is why focusing only on amusing chatbot mistakes is a mistake of scale. The public remembers fabricated recipes, imaginary biographies, and wrong arithmetic because they are easy to share. Institutions should worry about the quiet errors that fit the workflow perfectly.

The next generation of reliability will depend less on teaching users a generic slogan such as "AI can make mistakes" and more on designing specific verification duties around specific claims. A legal citation can be checked against a legal database. A medical recommendation can be tied to source evidence and clinical responsibility. A corporate number can be linked to the underlying dataset. A historical quotation can require a primary text. The point is not to distrust every sentence equally. It is to make the route from sentence to evidence short enough that important claims can survive contact with reality.

In that sense, the lesson of *Mata v. Avianca* is not that lawyers should be afraid of chatbots. It is that professional forms carry borrowed authority. The law has rules for what must happen before a sentence wearing those forms can become part of a case. Generative systems did not erase those rules. They made the cost of ignoring them visible.

The fake cases never existed. The filing did. The court's time did. The sanctions did. The reputational damage did. A nonexistent sentence produced real consequences because enough real systems treated its shape as meaningful.

This is the strange asymmetry at the heart of hallucination: the cause can be synthetic while the consequences are stubbornly physical.

A judge reads. A doctor decides. A customer pays. A worker acts. A company signs. A family worries. A voter believes. A machine can be wrong in milliseconds. The world takes longer to unwind.

We therefore begin not with the question of why a model can invent a sentence. We begin with the harder question of why the sentence is so easy for us to use.