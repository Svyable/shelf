# Chapter 10 — Your Money, Temporarily Missing

Money disappearing from a bank account creates a special kind of panic because the screen looks authoritative.

Yesterday: $3,842.16.

Today: $1,017.16.

The missing $2,825 did not leave a hole in a drawer. It left as an entry in a system that may contain device information, authorization records, transfer instructions, timestamps, security events, merchant data, network logs, and internal fraud signals the customer cannot see.

The customer has something the bank does not have.

Knowledge of intention.

**I did not authorize that.**

The bank has something the customer does not have.

The transaction record.

Appeal begins because neither side can settle the dispute from its own information alone.

American electronic-fund-transfer law contains one of the most elegant answers to this problem: investigate quickly, correct promptly if an error occurred, and in many covered situations provide provisional credit when the institution needs more time.

The mechanism is not called an appeal.

It is better than the word.

It is a design for living under uncertainty.

## Ten business days

The Consumer Financial Protection Bureau's current guidance explains the basic timeline for unauthorized electronic transactions. Once a consumer notifies a bank or credit union, the institution generally has ten business days to investigate, subject to applicable rules and exceptions. If it determines an error occurred, it generally must correct it promptly. If the investigation cannot be completed within the initial period, the institution may have to provide temporary credit while continuing the investigation, again subject to the legal framework and circumstances.

The exact rules contain important qualifications. Account age, transaction type, foreign transactions, written confirmation, and reporting timelines can matter. Consumers should not use a general description in a book as a substitute for current legal advice.

The structural idea is what interests us.

The law does not force the bank to decide the disputed fact instantly.

It changes who carries the financial burden while the fact remains uncertain.

That is a profound move.

Most appeal systems leave the original decision in place until the challenger wins.

The bank-dispute framework can, in defined circumstances, temporarily restore the money before the final investigation ends.

The institution gets time.

The customer gets liquidity.

Uncertainty is split.

## Provisional truth

A temporary credit is not a final finding that the customer is right.

That distinction matters.

If the investigation later concludes the transaction was authorized, the institution can reverse the provisional credit after following the required process.

The money is provisional because the truth is provisional.

This is one of the rare places where an institution makes provisionality visible in the account itself.

Imagine if more appeal systems did something similar.

Not necessarily with money.

With status.

**Decision under review.**

**Account access temporarily restored with limits.**

**Benefit continuation pending appeal.**

**Content visibility reduced rather than removed while urgent review occurs.**

**Credential remains usable pending expiration challenge.**

**Automated flag cannot trigger secondary consequences until confirmed.**

Many systems pretend certainty because their software requires a state.

Approved or denied.

Active or suspended.

Eligible or ineligible.

Authorized or unauthorized.

The appeal period exists outside the state machine as paperwork.

Provisional credit shows another possibility: encode uncertainty into the operational system.

The account can say, effectively, *we have not finished deciding*.

That is sophisticated institutional behavior.

## The risk of being wrong

Why not always credit the customer immediately and sort it out later?

Because customers can lie.

Why not always make the customer wait until the investigation finishes?

Because banks can be wrong, investigations can take time, and being deprived of funds can cause cascading harm.

Appeal systems exist inside competing risks.

False positive: the institution treats a legitimate transaction as unauthorized.

False negative: the institution treats fraud as legitimate.

False claim: the customer denies a transaction they actually authorized.

Investigation error: the bank misunderstands the evidence.

Delay error: the correct outcome arrives after avoidable harm.

The rules distribute these risks rather than pretending one can be eliminated.

That is what good procedural design does.

It asks not only “How do we know?” but “What happens while we do not know?”

## The evidence problem

Unauthorized-transfer disputes look simple from the consumer side.

I did not do it.

The bank cannot stop there.

A transaction can be authorized in ways the customer does not remember. A family member may have access. A merchant descriptor may be unfamiliar. A recurring payment may have been initiated long ago. Credentials may have been compromised. A scam may involve the customer actively sending money under deception, which can create legal distinctions from a transfer initiated without authorization. Different payment rails carry different rights and responsibilities.

The word *fraud* is broader in ordinary speech than in regulation.

This creates one of the recurring difficulties of appeal: the person describes the harm in moral language while the institution adjudicates a technical category.

“They stole my money.”

The investigator needs to know how the transfer was initiated, what authority existed, when the customer notified the bank, what security credentials were used, and what legal rule governs.

The mismatch can make people feel disbelieved even when the institution is asking necessary questions.

A good appeal interface translates without insulting.

It says, in effect: we believe you are reporting a real problem; now we need to determine which kind of problem it is because the correction mechanism depends on that distinction.

That is much better than treating every mismatch in vocabulary as evidence the claimant is unreliable.

## Deadlines again

Electronic-transfer protections also show how quickly delay changes legal position.

Public guidance warns consumers to report unauthorized transactions promptly, with specific timelines that can affect potential liability. In some situations, waiting too long after receiving a statement can expose the consumer to losses from later unauthorized transfers that could have been prevented through earlier notice.

The reason is operational.

Notification is not only about assigning responsibility for past harm.

It can stop future harm.

This gives the deadline a different moral character from an arbitrary filing cutoff.

A late appeal can make the underlying problem worse.

The institution therefore has a legitimate interest in receiving fast notice.

The consumer has a legitimate interest in clear notice of that obligation.

Good procedural design aligns them.

## Show me what you saw

The CFPB's guidance also notes that after an investigation, a consumer can request information used to make the institution's decision in the covered process.

That right matters because a denial without evidence creates a dead end.

The bank says the transfer was authorized.

The customer says it was not.

If neither side can see what the other relies on, the dispute becomes assertion against assertion.

Access to the basis of decision allows the next question.

The bank relied on a device the customer recognizes.

Or a location the customer has never visited.

Or a security method that had been compromised.

Or a merchant relationship the customer forgot.

Or a record showing the transaction was initiated through a channel the customer insists they never use.

Evidence does not guarantee agreement.

It creates contestable ground.

This is a central principle for automated decisions too.

A high-stakes appeal should expose enough of the decisional record that the affected person can identify a factual or procedural error.

Otherwise “review” means the institution reads its own secret file twice.

## Appeal as state management

Software engineers think naturally in states.

A transaction can be pending, posted, reversed, disputed, credited, charged back, closed.

A case can be open, awaiting documentation, under investigation, resolved.

This makes financial systems a useful model for other appeal architecture because they have spent decades representing provisionality operationally.

The rest of institutional life often lags behind.

An automated hiring system may simply mark “not selected.”

A platform may mark “disabled.”

A government application may mark “denied.”

The appeal exists as a separate workflow, but the primary system continues behaving as if the state were final.

A richer state machine could distinguish:

Denied—appeal available.

Denied—appeal pending.

Denied—new evidence received.

Denied—independent review pending.

Denied—stayed pending review.

Reversed.

Remanded for new decision.

Final after review.

These states are not bureaucratic clutter.

They tell other systems how much confidence to place in the decision.

If a fraud designation is actively under appeal, should another product automatically close the customer's account because it consumes that designation as a risk signal?

If a benefits denial is under review, should a downstream database represent the person as definitively ineligible?

If a content violation is being independently reviewed, should an accumulated-strikes system permanently escalate punishment before the appeal finishes?

The answer depends on the domain.

But the question should be explicit.

## Cascading decisions

Modern institutions chain decisions together.

One result becomes another system's input.

A payment dispute affects a fraud score.

The fraud score affects account limits.

Account limits affect merchant activity.

Merchant activity affects reputation.

A single disputed event can propagate.

This is where appeal becomes more than correction of the original outcome.

The institution needs **cascade control**.

When a foundational decision is contested, what downstream consequences should pause?

When it is reversed, which downstream decisions should be automatically reconsidered?

If a bank determines that a transaction was unauthorized, should a prior automated system that treated the customer's report as suspicious update its assessment?

If identity theft is confirmed, should related adverse records be reexamined?

If a merchant wins a chargeback dispute, should an account-risk system automatically remove the negative signal?

The answers should not depend on the customer discovering every downstream consequence one by one.

Correction should propagate where the causal link is known.

This is the same principle we encountered in credit reporting.

A society of interconnected decision systems needs appeal propagation as much as data propagation.

## Fraud teams live in the tail

Fraud prevention is structurally difficult because the cost of mistakes is asymmetric and adversarial.

Approve too much and criminals exploit the system.

Block too much and legitimate customers leave.

Explain too much and you can teach attackers how to evade controls.

Explain too little and legitimate people cannot prove the institution misclassified them.

Automate too little and detection cannot keep pace.

Automate too much and edge cases disappear into scores.

Appeal is not a nuisance attached to fraud prevention.

It is part of the security model.

Attackers will deliberately make themselves look legitimate.

Legitimate customers will sometimes look like attackers.

A system capable of distinguishing those populations only in the average case is incomplete.

The appeal layer should use information an attacker finds harder to fake and a legitimate person is more likely to possess.

That may include historical context, stronger identity proofs, transaction-specific facts, independent records, or human interaction. The exact design depends on threat model and privacy constraints.

The principle is to make the second decision informationally richer, not merely slower.

## Temporary credit as a philosophy

Provisional credit deserves to escape banking and become a general design concept.

Not literally. Nobody should copy a financial rule into unrelated systems without considering different risks.

But its philosophy is portable.

When a consequential decision is contested and review takes time, ask whether some temporary arrangement can reduce irreversible harm without prematurely deciding the merits.

Can access be restored with limits?

Can enforcement be paused?

Can the person receive partial continuity?

Can a disputed flag be prevented from propagating?

Can a temporary credential bridge the review period?

Can the institution preserve both security and reversibility?

This is **procedural slack**.

It creates room for correction before the world commits to the first answer.

Many modern systems eliminate slack in the name of efficiency. Decisions execute immediately. Accounts close instantly. Funds move irreversibly. Automated consequences chain together.

Then the appeal process arrives after the system has already made reality conform to the decision.

Provisional design reverses the sequence.

It says: when uncertainty is material and harm may compound, the system should sometimes remain intentionally unfinished.

## Money teaches the lesson quickly

People understand procedural fairness differently when their money is involved.

A wrong content label is irritating.

A wrong bank balance changes what you can buy tonight.

That immediacy has forced financial regulation to grapple with questions other systems can postpone.

How fast must an institution investigate?

What information must it give?

How long can uncertainty last?

Who bears loss during the investigation?

What happens if the first answer changes?

How do deadlines affect responsibility?

These are appeal questions with dollar signs attached.

The answers are imperfect and context-specific. Fraud evolves. Payment systems change. Scams blur categories. Rules require interpretation. Consumers still struggle.

But the architecture contains a mature idea:

A dispute is not merely a message to the institution.

It is a temporary change in the status of the decision.

Your money may be missing.

The system is not allowed to treat the mystery as settled simply because the ledger has already moved.
