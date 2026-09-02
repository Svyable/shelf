# The Lawsuit as Product Feedback

The chatbot gave the customer the wrong answer.

That is not unusual.

What made the Air Canada case unusual was that the answer became a legal obligation.

After his grandmother died, Jake Moffatt used the airline’s website to ask about bereavement fares. The chatbot told him, incorrectly, that he could book a flight and apply for a reduced fare afterward. He relied on the information. Air Canada later refused the retroactive discount because its actual policy required a different process.

Moffatt brought the dispute to British Columbia’s Civil Resolution Tribunal.

In February 2024, the tribunal found Air Canada liable for negligent misrepresentation and ordered it to pay damages, interest, and fees. The decision attracted attention because Air Canada argued, among other things, in a way the tribunal characterized as suggesting the chatbot was a separate legal entity responsible for its own actions. The tribunal rejected the idea that the company could detach itself from information provided through its own website.

The amount was small.

The principle was large.

A company can automate the speaker without automating away the company.

This is not a universal rule for every AI system in every jurisdiction. The decision came from a provincial civil tribunal resolving a particular consumer dispute. It did not create a global doctrine of artificial-intelligence liability.

It became memorable because it restored ordinary legal grammar to an unfamiliar interface.

Who made the representation?

The airline did, through a tool it deployed.

That answer should be unsurprising.

Technology often becomes politically dangerous when novelty persuades institutions to forget ordinary responsibility. A company says the model generated the content, the vendor built the model, the employee relied on the recommendation, the user wrote the prompt, the data came from somewhere else, and the output was probabilistic.

All of those facts can matter.

None means nobody acted.

Litigation is one mechanism for forcing the chain to become specific.

A complaint has to identify defendants. A court asks whether the plaintiff has standing. Claims must fit legal causes of action. Evidence enters a record. Parties make arguments that can be challenged. Discovery may reveal internal documents. Judges separate allegations from findings. Appeals can revise decisions.

The process is slow and expensive.

That slowness is partly the point.

A lawsuit cannot operate at the speed of a viral accusation because it gives defendants procedural rights. The plaintiff has to prove something. The defendant can contest it. A court explains why a remedy is available or not.

Public pressure often hates this because litigation produces narrow answers to broad grievances.

The nH Predict lawsuit against UnitedHealth entities is an example. Plaintiffs alleged that an algorithm was used improperly in Medicare Advantage post-acute-care decisions. The companies disputed the allegations. In February 2025, a federal judge held that the Medicare exhaustion requirement applied but waived exhaustion on futility grounds, dismissed five state-law causes of action as preempted, and allowed claims for breach of contract and breach of the implied covenant of good faith and fair dealing to proceed. By March 2026, the case was in discovery, where a magistrate judge compelled some material concerning the development and use of nH Predict and relevant government investigations while narrowing other requests.

For people convinced that the system was unjust, dismissal of most claims could look like evasion. For defendants, survival of two claims could just as easily be misread as validation of the plaintiffs’ allegations.

Legally, exhaustion and preemption serve distinct purposes. Exhaustion can require specialized administrative systems to address disputes before courts intervene, while preemption determines when federal law displaces state-law claims. A motion-to-dismiss ruling can narrow which claims may proceed without establishing that the underlying factual allegations are either false or true.

This is where public discussion routinely fails.

“Claims dismissed” becomes “company vindicated.”

“Claims allowed to proceed” becomes “company caught.”

Neither is reliable.

The legal status of a claim is part of the fact.

AI litigation will require unusually careful language because so many cases begin as attempts to fit new conduct into existing doctrines. Authors sue model companies under copyright law. Consumers sue over privacy. Workers bring discrimination claims. Companies dispute automated statements. Regulators seek injunctions under consumer-protection statutes. Different legal questions can arise from the same technical system.

The public wants a verdict on AI.

The court answers a count in a complaint.

That narrowness is frustrating and valuable.

Consider the copyright cases over training data. Creators often describe model training as theft. Companies often describe it as transformative learning. Courts do not decide which metaphor wins cultural legitimacy. They analyze copying, fair use, markets, specific data-acquisition practices, outputs, and other statutory questions.

In *Bartz v. Anthropic*, a federal district judge in June 2025 drew a distinction that complicated both camps. The court held that the training use before it was fair use and that digitizing purchased print books for Anthropic’s central library was also fair use, while refusing fair-use protection for the acquisition and retention of pirated copies in that library. That left piracy-related liability and damages for later proceedings.

The case did not reach trial on those claims. On July 20, 2026, the court granted final approval to a $1.5 billion class settlement covering works on a defined list tied to Anthropic’s LibGen and PiLiMi downloads and entered judgment dismissing the action with prejudice. The settlement ended this class action. It did not turn the 2025 district-court fair-use ruling into a universal rule that all AI training is fair use, nor did it make lawful training erase unlawful acquisition.

The important point is not to turn one district-court order into permanent copyright law.

It is that acquisition and training can be different legal acts.

Public argument had bundled them together.

Litigation decomposed them.

This is what lawsuits can contribute to product design. They force companies to discover that one workflow contains several legally distinct decisions.

Where did the data come from?

Why was it copied?

How long was it retained?

What did the output contain?

What representation did the company make?

Which user relied on it?

What harm followed?

What duty existed before AI arrived?

The answers can become product requirements.

A data-acquisition lawsuit leads to provenance records.

A chatbot misrepresentation leads to controlled knowledge sources and testing.

A discrimination claim leads to validation and audit.

A privacy case leads to retention controls.

A facial-recognition enforcement action leads to deletion duties and governance.

Law becomes product feedback with coercive force.

This is not always efficient feedback.

Litigation can produce defensive engineering. Companies may remove useful features because legal uncertainty is too expensive. Smaller firms can be unable to afford precedent-setting cases. Plaintiffs’ lawyers may pursue theories with little merit because discovery creates settlement pressure. Forum differences can produce inconsistent outcomes.

A society should not design its entire AI governance system through lawsuits.

But lawsuits have one advantage voluntary ethics programs cannot replicate.

The company does not choose the question.

A plaintiff can ask about the part of the system the company would rather describe differently.

Discovery matters for this reason. Technology companies possess far more information about internal systems than affected people. A user sees an output. The company may have logs, evaluations, incident reports, emails, product requirements, model versions, vendor contracts, and policy changes.

Legal process can move some of that information across the asymmetry.

The threat of discovery can also encourage better record keeping before any case exists.

This creates a paradox.

Companies sometimes fear logs because records can become evidence.

Accountable AI requires logs because without them nobody can reconstruct what happened.

An organization optimized purely for litigation avoidance may be tempted to retain as little as possible. An organization optimized for safety may need enough telemetry to investigate failures.

Privacy adds a third constraint: retaining too much user data creates its own risks.

There is no universal answer.

The organization needs a record architecture.

Which decisions are consequential enough to preserve?

Which inputs can be stored lawfully?

How long?

Who can access them?

How can an affected person obtain relevant information without exposing someone else’s data or the company’s legitimate secrets?

These questions sound like compliance because compliance is how abstract responsibility becomes operational.

The lawsuit as product feedback works only if someone inside the company can translate legal outcomes into system changes.

This is not guaranteed.

Legal departments can settle a dispute and move on. Engineering teams can treat the case as an edge condition. Product leaders can assume the problem belonged to an old version. The organization pays the cost without learning.

A stronger process connects claims to incident review.

Why did the dispute arise?

Was the plaintiff’s experience unique?

Could the same workflow affect others?

Did the company know of similar complaints?

Was the legal rule already represented in product requirements?

Does the remedy reveal a broader design principle?

The Air Canada decision offers a simple principle: customer-facing automated information belongs to the company that presents it.

A company that accepts this early will design chatbots differently.

It will constrain answers to authoritative policies where appropriate. It will test high-risk topics. It may route uncertain cases to humans. It will maintain versioned source material. It will make clear which representations create commitments. It will monitor common errors.

The company that treats the bot as a novelty may discover the same requirements after a dispute.

Public pressure accelerates learning by making failures expensive.

The key is proportionality.

Not every hallucination deserves a lawsuit. A chatbot making up a movie recommendation is different from giving false information about a financial product, medical instruction, legal deadline, employment right, or refund policy. Liability should reflect duty, reliance, foreseeability, harm, contract, statute, and context rather than the mere presence of AI.

This is why sectoral law remains important.

The same model output has different significance depending on where it appears.

A medical chatbot built into a health system may create duties an entertainment chatbot does not. A broker’s automated investment communication exists inside securities regulation. An insurer’s benefit explanation exists inside insurance and consumer law. A government benefits bot implicates administrative law and due process.

The model does not choose the legal context.

The deployer does.

This principle is likely to become one of the durable outcomes of the AI backlash.

Companies will try to allocate responsibility through contracts with vendors and users. Those contracts matter between the parties. They do not necessarily eliminate duties owed to outsiders.

If a hospital buys a model, the vendor may promise certain performance and the hospital may indemnify some uses. The patient did not negotiate that contract. The patient’s rights arise elsewhere.

Public accountability cannot be fully privatized through terms of service.

This is one reason courts remain important even in a heavily regulated future. Regulators set general rules. Contracts allocate private risk. Courts decide disputes where the boundaries break.

Litigation also exposes a fact that AI companies sometimes prefer to obscure: probabilistic systems can still create deterministic obligations.

The model “only predicts.”

The company fires the worker.

The model “only generates.”

The customer relies on the refund policy.

The score “only recommends.”

The insurer denies the stay.

The classifier “only flags.”

The store employee confronts the customer.

The institutional action is where liability often becomes concrete.

This is the handoff public pressure should examine.

A company can accurately describe a model as nonbinding while operating a workflow that makes the output practically decisive. Courts and regulators can ask about the whole process rather than the disclaimer.

Disclaimers are especially weak when the company designs users to rely on the system.

A support bot exists to provide answers. A recommendation tool exists to influence choice. A decision support system exists to support decisions. A company cannot simultaneously market reliability and disclaim every consequence of reliance.

This does not mean every error creates liability.

It means “the AI made a mistake” is not the end of the legal analysis.

The mistake happened inside somebody’s service.

The lawsuit asks whose.

There is a cultural benefit to this ordinary framing. It lowers the temperature.

AI policy can become apocalyptic in both directions. One side imagines civilization-ending systems. The other imagines innovation-ending regulation. Litigation often drags the dispute back to a receipt, a data set, a contract clause, a false match, a denied benefit, or a representation on a website.

The stakes can still be high.

The facts become local.

Local facts create precedents that organizations can use.

This is how common law evolves: one dispute at a time, with later courts accepting, distinguishing, or rejecting earlier reasoning. It is slower than a technology roadmap. That can be frustrating when deployment is rapid.

Speed can be supplemented by regulators and legislation.

It should not eliminate the value of adjudication.

A legal system that moves too slowly becomes irrelevant. A legal system that moves at product-launch speed stops being legal process.

Public pressure lives in the gap.

The best outcome is not maximum litigation.

It is a product environment in which the lessons that would emerge from lawsuits are anticipated through design.

Know what your system says.

Know what data it uses.

Know who can override it.

Know what users reasonably rely on.

Keep records proportionate to risk.

Give people a way to challenge consequential errors.

Do not pretend a software component is a separate moral universe.

The chatbot does not need legal personhood for the company to learn from it.

The customer already supplied the feedback.

Litigation creates another kind of feedback that product teams rarely see directly: the cost of ambiguity.

A product team can tolerate an undefined edge case for years because only a small number of users encounter it. A court cannot resolve a dispute by saying the edge case is statistically unimportant. The judge needs a rule for the person in front of the court.

This is one reason lawsuits reveal what averages hide.

A company may have a system that works well for 99.9 percent of transactions. The thousandth-of-a-percent failure can still create a legal question if the company made a promise, imposed a duty, discriminated unlawfully, or caused compensable harm.

Law is unusually interested in exceptions because rights often live there.

The product organization optimizes the distribution.

The court hears the tail.

That difference should influence deployment before the first complaint. High-stakes systems need a tail-risk plan: what happens when the ordinary workflow produces an extraordinary harm?

The answer cannot be improvised entirely by customer support after the fact.

This is where class actions and aggregate litigation become important even when individual damages are small. A single erroneous fee may not justify hiring a lawyer. A repeated fee across millions of users can justify collective treatment if the legal requirements are met. The same logic applies to systematic automated decisions.

Scale can make tiny individual losses economically large while making each person’s incentive to sue economically small.

Collective procedure can close that gap.

Companies sometimes experience this as extortionate leverage because class exposure can become enormous before liability is finally resolved. Plaintiffs see the opposite problem: without aggregation, a widespread practice can remain effectively immune because no individual case is worth bringing.

The procedural fight is therefore not separate from AI accountability.

It determines whether certain kinds of scaled harm can become legally visible.

Arbitration clauses change the landscape too. Many consumer and employment relationships require private arbitration or limit class procedures. Companies value arbitration because it can reduce litigation cost, avoid unpredictable juries, and resolve disputes faster. Critics argue that confidentiality and individualized proceedings can prevent patterns from becoming public and weaken deterrence.

The important point for AI governance is that dispute design is product design.

Where does the user go after the appeal fails?

Court?

Arbitration?

Regulator?

Internal ombuds office?

No realistic venue at all?

That architecture changes how much pressure can ever reach the institution.

A company that makes external challenge impossible should not be surprised when customers seek publicity instead.

Discovery creates its own pressure because it threatens to expose how the company actually made decisions. This can improve discipline. It can also create perverse incentives around documentation.

Employees learn that every casual message may someday be read in litigation. Lawyers encourage precise language. Teams may avoid speculation in writing. At the extreme, fear of discovery can suppress the candid internal discussion that safety requires.

The answer is not to stop documenting.

It is to separate disciplined records from reckless messaging.

A risk register should be honest enough to be useful.

An incident review should identify what failed without turning into a blame document.

A product decision should record the evidence and authority behind the choice.

An employee should not need to use disappearing messages merely because the organization cannot tolerate a written disagreement.

The legal system depends on records because memory changes after conflict.

The institution should depend on them for the same reason.

Settlement adds another ambiguity. Most civil cases do not end in a dramatic trial verdict. Parties settle for reasons that can include cost, uncertainty, confidentiality, risk, insurance, business distraction, or a desire to compensate without establishing precedent.

The public often reads settlement as confession.

Defendants often describe it as buying peace.

Neither interpretation is automatically correct.

A settlement is an agreement to end a dispute under specified terms.

Its governance value depends on what the terms change.

Money alone can compensate plaintiffs without changing the product. Injunctive or operational terms can change future behavior. Confidentiality can protect legitimate information or conceal patterns the public would benefit from knowing. The balance varies by case.

Companies should treat settlements as a source of product telemetry even when they deny liability.

What condition made settlement rational?

Was the legal theory weak but discovery expensive?

Was a recurring user experience creating litigation risk even if the company believed it would ultimately win?

Did several unrelated plaintiffs describe the same workflow?

Did an insurer demand a control change as part of coverage?

The organization can learn without admitting a legal conclusion it disputes.

This is the difference between litigation defensiveness and litigation intelligence.

Safe harbors can encourage that intelligence before the courtroom. Legislatures and regulators sometimes reduce liability or penalties when organizations follow defined practices, disclose incidents, correct problems promptly, or cooperate with oversight. Properly designed, a safe harbor can reward evidence of care without turning compliance into immunity.

That distinction matters.

A checklist should not excuse a foreseeable harm merely because every box was checked. At the same time, a company that tests, documents, reports, corrects, and compensates should not face the same treatment as one that ignored known risks.

Law can create incentives for good process without pretending good process guarantees good outcomes.

The same logic supports remediation credits. If an organization discovers a systematic automated error and proactively identifies affected users, corrects records, refunds losses, and changes the system, regulators and courts may have reason to treat that differently from a company that denies the problem until each person proves it separately.

This encourages cohort repair.

AI makes cohort repair unusually feasible because the same logs that produced the automated decision can often identify who was affected by a bad model version or rule.

A bug that scales can produce a remedy that scales.

The legal system should reward that capability rather than encouraging companies to wait for individual claims.

There is a final lesson in litigation that technology culture resists because it feels inefficient.

Sometimes the correct product requirement is not more prediction.

It is a right.

A right to notice.

A right to appeal.

A right not to be discriminated against.

A right to compensation under defined conditions.

A right to evidence sufficient to contest a decision.

Rights are awkward for optimization systems because they constrain tradeoffs. A model cannot justify violating a protected right by showing that the average user benefited enough.

That is why rights are politically important.

They identify interests that are not merely variables in the institution’s objective function.

The lawsuit brings those interests into a room where the company does not control the metric.

That is product feedback in its most demanding form.

The engineer asks whether the system performed as designed.

The court asks whether the design was allowed to do that to this person.

AI governance needs both questions.