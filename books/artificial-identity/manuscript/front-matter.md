# Artificial Identity

*The Other You Machines Are Building*

**Sven Hardy Benson**

---

Draft — September 2026

---

© 2026 Sven Hardy Benson. All Rights Reserved.

This is a working manuscript. The research record lives beside the text in the canonical Desk repository so that empirical claims, standards, laws, product behavior, and technical assumptions can be dated, challenged, and revised without pretending that a sentence becomes permanent merely because it is printed confidently.

---

## Author's Note

There is a version of you that has never been hungry.

It has never waited for a late train, forgotten why it walked into a room, changed its mind in the shower, forgiven someone unexpectedly, or spent an afternoon doing something that made no sense to the person it had been that morning.

It has no childhood in the ordinary sense. No body. No embarrassment. No private joke that still makes it laugh for reasons it cannot quite explain.

Yet that version of you may have a credit history, a fraud score, a recommendation profile, a set of inferred interests, a biometric template, a map of likely purchases, a probability of clicking, a record of devices, a guessed income band, a ranking among other customers, a memory of what you told an assistant six months ago, and soon perhaps a collection of permissions that let software act in your name.

It may be wrong about you.

It may also be useful.

The interesting thing is that usefulness does not require truth in the philosophical sense. It requires enough predictive or administrative accuracy to help a system make the next decision.

For most of the modern identity system, the main institutional question was verification. A person made a claim and an institution checked it. Does this face match the document? Does this password match the account? Does this signature resemble the one on file? Does this credential come from the issuer it claims? Can this login be bound with enough confidence to the subscriber who enrolled earlier?

That world still exists. It matters more than ever because fraud becomes easier when convincing media and automated interactions become cheap. But another identity system has been growing beside it.

This one does not merely ask who you are.

It asks what you are likely to do.

A lender is not primarily interested in the metaphysics of your self. It wants to estimate repayment risk. A recommender wants to estimate what will hold your attention. A fraud system wants to estimate whether a transaction resembles your legitimate behavior. A retailer may want to estimate what offer will convert. A security system wants to estimate whether a face, voice, device, gait, location, or sequence of actions belongs to the expected person. An AI assistant may need to estimate what you meant, what you prefer, and whether an action is routine enough to take without asking again.

These are all different problems. The systems use different data, different models, different objectives, and different standards of evidence. There is no single master computer file containing the real you.

That is precisely the point.

You can have many machine-made selves at once.

One system treats you as low risk. Another treats the same behavior as suspicious. One predicts you want cheaper options. Another concludes you are willing to pay for convenience. One learns that you like a subject because you clicked on it. Another learns that you dislike the subject because you clicked only to argue with it. A conversational assistant may remember a preference you expressed once and quietly carry it forward after you have changed your mind.

Human beings already live with multiple identities. We are children to our parents, parents to our children, employees to an employer, customers to a bank, patients to a doctor, citizens to a state, strangers to most of the planet. Context has always mattered.

What changes when identity is computational is not multiplicity itself.

It is speed, scale, persistence, inference, and eventually action.

A person can misunderstand you. A model can misunderstand you ten million times before lunch.

A person can remember an outdated version of you. A database can preserve it perfectly.

A person can make a bad guess. A scoring system can turn the guess into a threshold.

A friend can know your habits. A platform can infer them from behavior you did not realize counted as testimony.

An assistant can act for you. Software can do so at API speed, across multiple services, with credentials whose authority may be much easier to grant than to reason about.

I use **artificial identity** in this book for the operational model that emerges when a computational representation of a real person becomes consequential enough to stand between that person and the world.

The phrase is not new. Scholars have written about algorithmic identity, data selves, artificial identity, digital human twins, identity in human-machine hybrids, and the possibility that artificial beings might someday face their own problems of continuity and personhood. The financial system also uses the term **synthetic identity** for a specific form of fraud involving fabricated personas assembled from real and invented identity elements.

This book is not claiming that everyone else missed the subject.

It is making a narrower connection.

The systems that classify us, predict us, authenticate us, personalize for us, simulate us, remember us, and increasingly act for us are usually discussed in separate rooms. Privacy experts study data collection. Credit regulators study scoring. biometric researchers study matching. recommendation engineers study ranking. identity specialists study authentication and federation. AI researchers study agents and memory. security architects study authorization. philosophers study the self.

The person in the middle experiences all of them as one life.

The machine-made versions may be fragmented. The consequences are not.

The argument of this book is that we are watching a representation become operational enough to deserve a new kind of attention. A profile used to describe. A model predicts. An agent can begin to act.

Identity is becoming executable.

That does not mean your software assistant becomes you. It means the distinction between **you**, **the model of you**, and **the actor authorized by you** becomes important in ordinary life.

We already know how confusing those boundaries can become in law and institutions when humans act for one another. We have agency law, powers of attorney, fiduciary duties, signatures, mandates, scopes of employment, delegated administration, and audit trails because civilization learned that acting for somebody else creates both leverage and ambiguity.

Now we are giving that old problem new machinery.

The question is not whether machines will ever become conscious enough to possess an identity of their own.

That may happen or it may not. It is not necessary for this story.

The near-term question is simpler and more practical:

What happens when the model that stands in for you becomes useful enough that institutions and software begin trusting it to make things happen?

Who gets to build that model?

Who may infer properties you never stated?

How many conflicting versions of you may exist?

How long should an old prediction survive?

What does correction mean when the disputed fact is not a fact but a probability?

What happens when a model predicts that you will do something and the surrounding system changes itself in response?

When an agent acts with your credentials, where does your responsibility end and its operational identity begin?

What should be allowed to expire?

What should you be allowed to outgrow?

And perhaps the most human question of all: how much unpredictability are we willing to preserve in a world that becomes steadily better at turning people into forecasts?

That is the territory ahead.

---

# Prologue

## The Version That Answers for You

In 2024, a group of researchers set out to do something that would have sounded like a philosophical thought experiment only a few years earlier.

They recruited 1,052 people and interviewed each of them for roughly two hours.

The interviews were not simply checkboxes for age, education, income, and geography. The researchers used a qualitative protocol designed to gather richer descriptions of a person's life: experiences, views, circumstances, and the kinds of details that ordinary demographic profiles flatten away.

Then they paired those interview transcripts with a large language model and created a generative agent for each participant.

The point was not to make a chatbot with the participant's face or voice. The research question was behavioral simulation. Could an artificial agent, given a sufficiently rich interview, respond to survey questions and experimental tasks in ways that resembled the person it represented?

To evaluate the result, the researchers needed a baseline that is easy to forget in discussions of prediction.

People do not reproduce themselves perfectly.

Ask a person the same survey questions twice and some answers change. Memory shifts. interpretation shifts. mood shifts. the person may actually have changed. Any model evaluated against a human being is therefore being compared with a moving target whose own test-retest consistency is less than perfect.

On the General Social Survey items used in the study, the generative agents reproduced participants' answers at 85 percent of the accuracy with which participants reproduced their own answers two weeks later. The agents also performed comparably on measures of personality and on several experimental replications.

It is a remarkable result.

It is also easy to overstate.

The agents were not complete copies of the participants. They did not wake with the participants' aches, relationships, obligations, memories, or private experience. They were evaluated on selected tasks. Their outputs came from a language model conditioned on interview material. The research itself was designed to support social-science simulation, not to announce that a digital soul had been captured.

Still, the study crosses a threshold that deserves to be noticed.

The system did not merely store facts about a person.

It could answer in the person's place.

For centuries, administrative identity moved in the opposite direction.

A passport compressed a person into a small set of claims that could be checked at a border. A birth certificate tied a name to an event. A driver's license combined authorization with identifying attributes. A bank account connected a legal person to a ledger. A password or key proved access to an account. A credit report accumulated financial history. A score compressed parts of that history into a number that could travel faster than the underlying file.

These systems were powerful because of what they left out.

No bank needed to know whether you preferred jazz to country music in order to clear a check. No border officer needed a model of your sense of humor. No payroll system required a simulation of how you might answer a question about marriage or trust.

Modern computation changed the economics of relevance.

Storage became cheap enough to retain more behavior. Networks made behavior observable across distance. statistical learning made patterns useful even when no person could explain each relationship. Platforms gained repeated interactions with the same users. Recommendation systems learned to rank enormous catalogs differently for different people. Fraud systems looked for anomalies. Data brokers assembled attributes and segments. advertisers learned to bid on predicted response. lenders and fintech companies explored new data sources. Biometrics turned parts of the body into machine-comparable representations.

Then generative models widened the surface again.

A click is narrow evidence. A two-hour interview is rich evidence.

A purchase record says what happened. A language model can be asked what might happen next.

A profile can contain attributes. A generative agent can produce behavior.

The difference is not mystical. It is architectural.

A stored profile waits to be queried.

A predictive model returns an estimate.

A generative model can construct an answer.

An agent with tools can take an action.

Each step moves the computational representation closer to the causal path of a person's life.

This is where the word **identity** becomes useful again, but in a different sense from the login screen.

NIST's digital identity standards draw careful distinctions among identity proofing, authentication, federation, assertions, subscribers, authenticators, and relying parties. Those distinctions matter because systems need to know what has actually been established. A successful authentication does not prove everything about a person. It proves enough about the claimant's relationship to an enrolled account or credential for a specified assurance context.

Artificial identity begins where that assurance story ends.

Suppose a service is satisfied that you are you.

Now what?

It may still have to decide whether a transaction resembles your normal behavior.

It may decide what order to show you products.

It may infer what kind of customer you are.

It may choose whether an unusual login is suspicious.

It may estimate whether a message is relevant.

It may decide which notification is worth interrupting you for.

It may estimate your willingness to pay.

It may ask a model to summarize what you prefer.

It may let an assistant book a restaurant, draft a reply, move a meeting, purchase an item, submit a form, query a database, or call another software agent.

None of those decisions is answered by knowing that your passport is genuine.

They require a model of the person behind the credential.

The old identity system is therefore being wrapped in a new one.

The old system says: **this is the account holder**.

The new system adds: **this is what the account holder is probably like, probably wants, probably risks, probably means, or has probably authorized.**

And because probability is not identity, mistakes enter in strange ways.

A wrong birth date is a wrong fact. It can, at least in principle, be corrected by showing evidence of the right one.

What is the correction procedure for an inferred willingness to pay?

What document proves that a fraud model has misunderstood your travel habits?

How do you appeal a recommendation system's conclusion that you want more of something you clicked because it made you angry?

If an assistant stores a summary saying that you prefer early-morning meetings because you accepted several during a frantic month, when does that inference expire?

If two services hold incompatible models of you, which one is false?

Perhaps neither.

Perhaps both are useful within their own objectives.

A model is often not trying to describe the whole person. It is trying to compress enough signal for a task.

The danger begins when the compression becomes invisible to the person but authoritative to the system.

That is already visible in older scoring systems. A credit score is not a borrower. It is a model output derived from parts of a credit file for a particular purpose. Yet in the moment a lender uses the score, the number becomes more operationally relevant than almost everything else about the human being who walked into the application.

The applicant may be generous, brilliant, difficult, funny, recently divorced, newly disciplined, quietly terrified, or certain that the next year will look nothing like the last.

The score does not care.

That is not a moral failure of the score. The score was not built to care.

The important question is whether everyone remembers the boundary between the person and the proxy.

Artificial intelligence makes that boundary harder to see because the proxy is becoming expressive.

A score is obviously not you.

A conversational system that remembers your history, speaks in your preferred register, anticipates your next request, and can answer questions about what you usually like feels different. A generative agent trained on an interview feels different again. A software representative holding delegated credentials can become operationally entangled with you even while everyone involved understands perfectly well that it is software.

The language of identity will be tempted in two opposite directions.

One temptation is to romanticize the machine. We will say that the system understands, remembers, knows, wants, or becomes us when the evidence supports only a narrower capability.

The other temptation is to dismiss the representation because it is not a real person.

That can be just as misleading.

A model does not need to be a person to affect a person.

A map is not a territory, but a border drawn on a map can become a checkpoint in the territory.

A score is not a borrower, but a score can help determine a loan.

A profile is not a customer, but a profile can determine which offer the customer sees.

A biometric match is not guilt, but a false positive can put a person under suspicion.

A simulation is not a human, but it can be used to estimate how that human might respond.

An agent is not its principal, but a token can authorize it to act on the principal's behalf.

Consequence does not wait for consciousness.

That is why the Stanford study matters beyond social science.

It offers a glimpse of a representation that has become generative enough to produce plausible behavior in the place where the person would normally produce it.

The key word is **place**.

Identity has always been partly about substitution.

A signature substitutes for your physical presence on a contract. A passport substitutes for an immigration officer personally knowing you. A credential substitutes for re-examining your education every time you apply for a job. A password substitutes for the service provider recognizing your face. A corporate officer signs for an organization that has no body to hold a pen.

Civilization works because we accept carefully bounded substitutes.

Artificial identity extends the range of what can substitute.

A model may substitute for asking you.

A prediction may substitute for waiting to see what you do.

A simulation may substitute for recruiting you into an experiment.

An agent may substitute for your attention.

Some of those substitutions will be wonderful.

If a model learns that you need captions, remembers that your parent cannot climb stairs, filters travel options accordingly, catches a fraudulent purchase in another country, and asks permission before committing money, then the artificial identity is doing what good infrastructure does: carrying context so the human does not have to repeatedly restate it.

The same machinery can become oppressive when the proxy is wrong, hidden, sticky, or impossible to contest.

That is not a contradiction. It is the central design problem.

A useful artificial identity should be allowed to know you without claiming to contain you.

It should be able to represent you without becoming the final authority on who you are.

It should be able to act for you without quietly acquiring a life of its own.

And it should be able to forget.

The next chapters begin before agents and digital twins, because this transformation did not start with generative AI.

It started when the profile learned to predict.
