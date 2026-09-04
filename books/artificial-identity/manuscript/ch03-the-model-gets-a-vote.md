# The Model Gets a Vote

The Federal Trade Commission's complaint against Rite Aid described a facial-recognition system that sometimes did something machines are uniquely good at doing badly: it repeated a mistake at scale.

According to the Commission, the retailer had used facial-recognition technology in hundreds of stores in an effort to identify people suspected of shoplifting or other problematic behavior. Employees could receive an alert when the system reported a match between a customer and an image in a database.

The system produced thousands of false positives, the FTC said.

Some of the details are almost absurd until you remember what the alert could mean for the person standing in the store. The complaint described instances in which people were matched with images associated with locations thousands of miles away. In one pattern cited by the Commission, the same person could be flagged at many different stores across the country.

The machine had not discovered that a customer possessed some hidden criminal identity.

It had made a comparison.

That distinction is obvious on paper and surprisingly fragile in practice.

A face-recognition system does not output guilt. It outputs a similarity result under a particular algorithm, threshold, image quality, reference database, and use case. A human institution then decides what that result will mean.

The distance between those two steps is where artificial identity becomes consequential.

Before the alert, the model was a technical process.

After the alert, an employee might look at the customer differently.

The model had acquired a vote.

Not necessarily the only vote. Not even a decisive vote. But a vote in what happened next.

This is the threshold that turns prediction into social power.

A model can be wrong in storage and nobody suffers.

A model becomes important when an institution relies on it.

The point sounds simple because we are accustomed to describing automated systems as though their outputs naturally correspond to actions. Risk scores trigger review. recommendation scores determine ranking. fraud scores block transactions. credit scores influence offers. biometric matches unlock doors or raise alarms.

Yet the action is never contained in the score itself.

Somebody designed the pipeline.

Somebody chose the threshold.

Somebody decided whether a human would review the result.

Somebody determined the cost of a false positive relative to a false negative.

Somebody decided how easily a person could contest the outcome.

The artificial identity is therefore partly technical and partly institutional.

This is important because debates about algorithmic harm often get trapped in the accuracy of the model while neglecting the architecture around it.

A mediocre model can be tolerable in a low-stakes system with visible uncertainty and easy correction.

An excellent model can be dangerous if the institution treats every output as final.

NIST's work on face recognition makes the distinction concrete.

A one-to-one verification task asks whether two images are likely to belong to the same person. A common example is comparing a live image with the enrolled image associated with a claimed identity.

A one-to-many identification task is different. It asks whether one image resembles any image in a larger gallery.

The error consequences differ as well.

A false negative in one-to-one verification may mean the legitimate user has to try again or use another method.

A false positive in a one-to-many search may put the wrong person on a candidate list for additional scrutiny.

The algorithm can have the same mathematical concept of similarity in both settings while the institution creates dramatically different human consequences around it.

This is why “the AI made a mistake” is often too vague to be useful.

Which model?

Which task?

Which threshold?

Which error?

Which person bore the cost?

Which human or automated step came next?

Artificial identity becomes visible when we ask those questions because they reveal the hidden chain between representation and treatment.

The chain exists far beyond biometrics.

Consider credit.

A lender cannot wait years to discover whether every applicant would have repaid a loan. Lending requires prediction. The institution evaluates evidence available now and makes a decision about future behavior.

Modern underwriting can use complex models, and the Consumer Financial Protection Bureau has had to clarify a principle that would otherwise be easy to lose inside complexity: when a creditor takes adverse action in a context governed by Regulation B, using an opaque or sophisticated predictive model does not eliminate the requirement to provide specific principal reasons for that action.

The rule is revealing because it treats explanation as part of the decision system.

A creditor cannot answer a person's question with a shrug and the phrase **the model decided**.

The institution made a decision using the model.

That difference is central to this book.

Machines do not acquire social authority merely by producing outputs.

Institutions lend them authority by choosing to rely on those outputs.

The artificial identity therefore has two authors.

The first is the technical system that constructs a representation.

The second is the institution that decides what the representation can do.

The person may be a distant third.

This is one reason the old language of personal data feels inadequate.

A raw data point can be accurate while the operational identity built from it produces an unfair result.

You may truly have made a purchase in a certain city.

You may truly have visited a particular website.

You may truly use a device associated with a certain neighborhood.

The dispute may not be about any fact.

It may be about what the system inferred from the combination and what the institution permitted that inference to change.

Correction becomes harder when there is no single erroneous row to fix.

If a credit file says you have an account you never opened, the dispute has an object.

If a model assigns you a higher probability of default because of a complex combination of features, what does it mean to prove the model wrong before the future arrives?

You cannot produce a certificate stating that you would definitely have repaid.

The best you can demand is procedural: relevant data, lawful use, specific reasons where required, appropriate validation, fair treatment, a way to challenge mistakes, and limits on what kinds of factors or proxies may carry weight.

Artificial identity moves many disputes from **fact correction** toward **model governance**.

That is a much more difficult public problem.

The model gets a vote in retail as well, though the stakes can look smaller.

In 2025, Federal Trade Commission staff published initial findings from a study of what it called surveillance pricing. The staff examined intermediary companies that offered tools capable of using consumer data such as location, demographics, browsing behavior, shopping history, and other signals to help retailers tailor prices, promotions, or product presentation.

The findings did not establish that every consumer was routinely receiving a unique secret price.

They established something more grounded: companies in the market had built systems capable of using granular observed and inferred information about consumers in the pricing and promotion process.

A price can therefore become another mirror held up by the artificial identity.

Two people can arrive at the same commercial environment while the system estimates that they should not necessarily see the same offer.

The model does not need to dislike either person.

It has an objective.

Perhaps maximize conversion.

Perhaps maximize margin.

Perhaps retain a customer.

Perhaps clear inventory.

The person becomes part of the pricing context.

This is not entirely new. Merchants have always treated customers differently. Negotiation, coupons, loyalty programs, student discounts, targeted direct mail, and hotel revenue management all predate modern machine learning.

The new feature is the granularity and invisibility of the classification.

A student discount is legible. The category is stated. The rule is public enough to understand.

An individualized promotion generated from browsing history, location, inferred segment, time of day, and purchase behavior can be nearly impossible for the customer to reconstruct.

The artificial identity votes on price without showing its ballot.

The same pattern appears in recommendation.

A ranked feed is not usually described as a decision about a person's rights.

Still, ranking changes the informational environment.

A model decides which candidate items deserve scarce screen space.

That can alter what the person learns exists.

The effect may be beneficial. A good recommender saves attention. It can surface obscure music, a useful article, a local business, a job, a product, or a person the user would never have found through a generic list.

But recommendation reveals an important feature of artificial identity: the model's vote can be continuous.

Credit decisions are episodic.

A feed re-ranks again and again.

Each interaction updates the representation that influences the next interaction.

The artificial identity becomes less like a passport and more like a running negotiation between prediction and behavior.

This makes causality slippery.

If a person spends more time on sensational material after a system begins recommending it, did the model accurately identify a preference or did the recommendation itself increase the behavior?

If a customer purchases premium products after being shown premium products, did the system discover willingness to pay or train it?

If a fraud model blocks unusual transactions, does the surviving history become artificially regular because the system has suppressed some unusual behavior?

Any model operating inside a feedback loop changes the evidence it later learns from.

The model votes, then observes the election it helped shape.

This does not make prediction meaningless. It means evaluation has to include intervention.

The artificial identity is not only a description of the person.

It can become part of the environment to which the person adapts.

Law has begun approaching pieces of this problem without using the language of artificial identity.

The European Union's General Data Protection Regulation includes protections concerning certain decisions based solely on automated processing, including profiling, when those decisions produce legal or similarly significant effects. The rule has exceptions and detailed conditions. It is not a universal ban on automation, nor is it a magical right to a simple explanation of every model.

Its deeper relevance is that it recognizes a category of consequence where automated profiling cannot be treated as mere back-office computation.

The EU AI Act draws other boundaries, including restrictions around certain uses of biometric categorization and rules for higher-risk applications. Again, the details matter. The law does not say every use of biometrics is forbidden.

What these legal systems share is an intuition that becomes clearer through the lens of artificial identity:

When a machine-generated representation of a person carries enough consequence, governance must follow the representation into the decision.

This is easier to say than to implement.

The reason is that consequential systems need thresholds.

Fraud detection is useful because institutions do not treat every transaction identically.

Credit underwriting is useful because lenders distinguish risk.

Security is useful because systems sometimes deny access.

Content moderation is useful because platforms sometimes remove or deprioritize material.

Insurance is useful because risk is pooled and priced.

Hiring is selective by definition.

A world with no classification would not be a world without power. It would be a world where humans made all classifications manually, often with less consistency and less evidence.

The challenge is not to remove the model's vote.

It is to decide what kind of franchise the model should have.

How much weight?

Under what evidence?

With what audit?

At what stakes?

How visible to the person?

How easy to contest?

How quickly updated?

How long retained?

What happens when two models disagree?

What happens when the model is accurate about a group but wrong about this person?

What happens when the institution cannot explain the relationship between a prediction and the action because the model is too complex?

What happens when the person changes faster than the system updates?

Those questions reveal why accuracy is necessary but insufficient.

Imagine a model that predicts with high accuracy that a person is vulnerable to a particular sales tactic.

The prediction can be accurate and the use abusive.

Imagine a model that predicts with moderate accuracy that a login is fraudulent.

The prediction can be imperfect and the use reasonable if the system requests an additional authenticator rather than permanently freezing the account.

The ethics live partly in the response function.

What does the institution do when the model says **probably**?

That word is often missing from the interface.

A person does not see a probability distribution when a card is declined.

They see **declined**.

They do not see model uncertainty when a feed omits an opportunity.

They simply never see the opportunity.

They do not see the similarity score when a security system raises an alert.

They experience the scrutiny that follows.

The artificial identity is probabilistic inside the machine and categorical at the edge.

This conversion is one of the most important acts in automated decision-making.

Somewhere, uncertainty becomes a threshold.

A number becomes a branch.

Allow.

Deny.

Show.

Hide.

Review.

Price.

Escalate.

Recommend.

The world acts in verbs even when the model thinks in probabilities.

That is why the model's vote matters.

It enters a system built to turn estimates into verbs.

The person often discovers the artificial identity only after the verb occurs.

A card is blocked.

A loan is denied.

An account is challenged.

A promotion appears.

A face is flagged.

A feed changes.

At that moment, the person meets a version of themselves they may never have seen before.

The obvious response is to ask for transparency.

Transparency helps, but it has limits.

A list of hundreds of model features may be technically transparent and practically useless.

A risk score may be understandable while the data feeding it are wrong.

An explanation may describe the current decision without revealing how the profile was constructed over years.

A system may be fully documented and still use a category society decides should not matter.

The deeper requirement is contestability.

Can the person meaningfully challenge what the machine-made identity is doing?

Sometimes the answer will be correction.

Sometimes it will be human review.

Sometimes it will be a different authentication path.

Sometimes it will be legal restriction.

Sometimes the correct answer will be no change at all because the model is functioning properly and the institution is entitled to rely on it.

Contestability does not mean the individual always wins.

It means the model's vote is not mistaken for divine revelation.

That distinction will become harder as systems grow more capable.

A primitive score looks like a tool.

A conversational model can explain itself fluently even when the explanation is incomplete or reconstructed.

A persistent assistant can present recommendations with the confidence of somebody who seems to remember the user.

An agent can move beyond advising and begin taking actions.

At that point the model does not merely vote on what should happen to you.

It may receive permission to do something for you.

The artificial identity becomes executable.
