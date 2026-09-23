# Learning From the People You Let Through

A nightclub has an easy version of the problem.

There is a line outside. The door staff choose who enters. Once inside, people buy drinks, dance, complain, stay, leave early, return next week, start fights, meet friends, and create the atmosphere by which the club eventually judges whether the night was good.

Management studies the customers inside and concludes that this is what its audience likes.

Of course it is. The door helped choose the audience.

Many modern institutions have a door, even when it is disguised as a score. Admissions offices have one. Employers have one. Lenders have one. Insurers have one. Hospitals have several. Platforms place millions of tiny doors in front of pieces of content. Research funders operate doors between ideas and the resources required to test them.

The door is never only a filter. It is a sampling mechanism.

That is the shift this chapter asks you to make. When an institution chooses whom to let through, it is also choosing whom it will learn from.

Once framed that way, an old engineering problem becomes relevant: the multi-armed bandit.

The name comes from the image of several slot machines, each with an unknown payout distribution. A player has limited pulls and wants to earn as much as possible. If one machine pays well early, the player can keep exploiting it. But another machine might be better. Learning that requires pulls that may earn less in the short run. The player must balance exploitation—using what currently appears best—with exploration—gathering information that could improve future choices.

The simplicity of the setup is deceptive. Versions of the problem appear in clinical trials, online advertising, recommendations, routing, pricing, experimentation, and adaptive decision-making. Peter Auer, Nicolò Cesa-Bianchi, and Paul Fischer's 2002 analysis of the multi-armed bandit problem helped formalize algorithms that manage this tradeoff with guarantees on regret, the performance lost by not always choosing the best arm.

The mathematical achievement is real. So is the distance between a slot machine and a human life.

If an advertising system shows a slightly less certain ad to learn whether it works, the downside may be a missed click. If a hospital chooses a treatment merely to reduce uncertainty, the consequences can be profound. If an employer interviews a candidate to learn about an underrepresented background, the candidate is not simply an instrument for corporate knowledge. If a lender extends credit to explore, both borrower and lender bear risk.

The bandit analogy should therefore be used as a map of the information problem, not a moral rule.

The action set must be bounded first.

Within those bounds, the concept of exploration can reveal choices ordinary prediction hides.

Suppose an employer has forty interview slots and one thousand applicants. A supervised-learning model ranks applicants by predicted hiring success based on historical data. The obvious policy is to interview the top forty. That policy exploits the model's current knowledge as aggressively as possible.

It also means the firm will learn almost nothing about applicants whose expected value is somewhat lower but whose uncertainty is high.

Why might uncertainty be high? The person has an unusual career path. Their school rarely appears in the firm's history. They come from an industry the company has not recruited from. They have a skill combination with few precedents. Their résumé is sparse because the model has less information, not because the person has less ability. Or the person belongs to a group historically given fewer chances, so the company has fewer internal labels on comparable candidates.

A purely exploitative rank can punish all of these cases for being poorly known.

An exploration-aware policy can ask a different question: which candidates have enough upside uncertainty that an interview is valuable even if their current expected estimate is not among the very highest?

The interview is not the job. It is a lower-stakes information-gathering stage. This matters ethically and operationally. The company can use exploration earlier in a funnel, where the cost is recruiter time, rather than turning employment itself into a random trial.

This is close to the logic in a remarkable recent study by Danielle Li, Lindsey Raymond, and Peter Bergman. Their paper, “Hiring as Exploration,” appears in the March 2026 issue of the *Review of Economic Studies*. The researchers model resume screening as a contextual-bandit problem. A firm selecting applicants for interviews must exploit what it has learned about backgrounds that historically perform well while also exploring candidates from less represented backgrounds in order to learn about quality.

Their empirical setting is narrow enough to describe carefully: professional-services recruiting within a Fortune 500 firm. That limitation is important. The result is not a universal law of hiring. It is valuable precisely because it shows the mechanism in real organizational data rather than only in theory.

The researchers compare approaches that differ in how they value uncertainty. A standard supervised-learning approach is designed to predict outcomes based on the historical sample. An exploration-oriented approach gives weight to statistical upside potential. In their setting, the exploration-aware system selected interview candidates who later had strong hiring outcomes while also increasing demographic diversity relative to existing practices and a purely exploitative model.

The headline most readers will want is that exploration can support diversity. The more interesting point is why.

Underrepresentation is not only an equity fact. It is an information fact.

If a group has historically received fewer interviews, the employer has fewer observations connecting that group's application features to downstream hiring outcomes. A model that penalizes uncertainty can therefore make the historical scarcity of opportunity self-reinforcing. The system says, in effect, “We have less proof this works,” while forgetting that the institution helped create the lack of proof.

An exploration bonus changes the interpretation of uncertainty. Lack of evidence can become a reason for a closer look rather than an automatic reason for rejection—provided the candidate remains plausible and the exploration occurs within defensible bounds.

This is a subtle idea, and it can be abused if handled carelessly.

Uncertainty is not entitlement. A company does not owe every unknown applicant an interview. Exploration has opportunity costs because each exploratory interview displaces another candidate. Nor should demographic identity simply be treated as a statistical curiosity for corporate gain. Anti-discrimination law, fairness, transparency, and human dignity impose obligations that cannot be reduced to optimization.

The lesson is narrower: when historical selection creates uneven information, maximizing predicted value from that history is not necessarily the same as maximizing future value.

The company may need to buy information.

That phrase deserves a budget.

Organizations already budget for recruiting, quality assurance, research, audits, prototypes, and market testing. They are accustomed to paying for information indirectly. What often disappears is the explicit connection between the cost and the future decision the information could improve.

An exploration budget makes the trade visible.

The budget can be interview slots, product impressions, pilot sites, grant dollars, quality-review hours, or the fraction of borderline cases receiving a second look. It does not need to be large. It needs to be protected enough that every exploratory action is not forced to compete, one by one, against the current top-ranked option.

If each exploratory interview is compared with the fortieth highest predicted candidate and must justify itself on immediate expected hiring yield alone, the exploration share will collapse. The known option is known precisely because it has more evidence.

The budget exists to purchase evidence the exploitation score cannot price well.

That does not mean the budget should survive regardless of what it learns. A good exploration program has a review date and a question. Are the uncertain candidates producing outcomes that materially change the model? Which sourcing channels are generating useful information? Is uncertainty shrinking? Are some exploratory regions repeatedly producing weak results, suggesting that further sampling has low value?

Exploration should become more selective as it learns.

The point is not to preserve ignorance so the program has a reason to exist.

This creates a difference between exploration and charity. The action is chosen partly because the institution lacks information that matters. If the information becomes strong, the reason for extra exploration can diminish. The opportunity can move into ordinary exploitation if it proves valuable, or out of the action set if strong evidence is negative.

A learning policy should be temporary in its uncertainty even when the broader capacity to explore is permanent.

Organizations already understand this in product development. A consumer-goods company tests new formulations even when the current product sells. A pharmaceutical company runs trials. A retailer pilots store layouts. A technology company performs A/B tests. A venture fund makes multiple uncertain bets. Research and development exists because today's best-known product is not assumed to be tomorrow's best possible product.

Hiring is often treated differently. The individual decision feels final and personal, so organizations want every selection to look maximally justified by existing evidence. That is understandable. It can also eliminate the small controlled experiments by which an employer learns that its idea of “qualified” was too narrow.

The solution need not be randomness. Exploration can be structured through auditions, work samples, internships, project trials with appropriate pay and protections, expanded interviews, skills assessments, rotational programs, or alternative recruiting channels. The common property is that they create lower-cost ways to observe people beyond the historical gate.

This is one of the book's practical themes: move exploration to stages where learning is cheaper and harm is lower.

A physician does not experiment with a dangerous treatment merely to learn. But medicine can compare approved treatments under genuine uncertainty, use carefully governed trials, study natural variation, expand noninvasive testing where justified, and design diagnostic pathways that generate better evidence. A lender need not issue unaffordable loans to explore. It can test new underwriting features, offer smaller products, use graduated limits, partner with other data sources, or study policy changes at boundaries. A school need not randomly disrupt a child's education. It can use summer bridges, co-requisite models, trial placements, tutoring, and randomized evaluations where equipoise exists.

The art is to separate the cost of learning from the cost of the ultimate decision.

The nightclub can let someone into the lobby before giving them the keys to the building.

This idea becomes more important as predictive models become cheap. When prediction was expensive, human institutions naturally sampled more broadly because they were noisy. Recruiters interviewed people based on idiosyncratic referrals. Branch managers made different lending decisions. Doctors varied in testing thresholds. Editors had different tastes. Much of this variation was undesirable, but some of it generated evidence about alternatives.

A highly optimized system can remove that accidental exploration.

You can see the pattern in online services. Early recommendation systems often faced the cold-start problem: how do you recommend a new item with no history? If ranking depends heavily on past engagement, new content is at a structural disadvantage. Platforms solve this in many ways—content features, creator history, collaborative signals, explicit exploration, editorial curation, randomized exposure, or models that generalize from similar items. The problem is recognized because the commercial cost is obvious. If you never show a new item, you never learn whether users would like it.

The same logic becomes strangely controversial when applied to people or public institutions because the word “exploration” sounds experimental.

Yet refusing to recognize exploration does not remove it. Human systems constantly take chances. A manager hires a candidate based on instinct. A doctor chooses among plausible tests. A school launches a new curriculum. A city changes a traffic pattern. The difference is whether the variation is visible, bounded, measured, and used to learn.

Unmeasured improvisation is not more humane merely because it lacks an algorithm.

The best exploration systems often begin with humility about the objective. What are we actually trying to learn?

In hiring, is the outcome an offer, acceptance, one-year retention, manager rating, promotion, team contribution, sales, error rate, or something else? Historical labels may be distorted by the organization itself. Manager ratings can reflect bias. Retention can reflect who receives support. Promotions can reflect networks. If the target is poor, exploration around it can become a sophisticated way to learn the wrong thing.

This is another reason the book resists turning bandit algorithms into a universal prescription. Exploration cannot save a system that has defined success badly.

Nor can it solve a world in which outcomes take too long to observe. A research funder may wait years to see whether a project changes a field. A school may care about life outcomes decades later. A city may need to know whether a land-use change affects mobility over a generation. In these settings, the exploration-exploitation problem stretches across institutional memory. Leaders who authorize the experiment may be gone before the label arrives.

That creates a bias toward short feedback.

Organizations naturally prefer outcomes that arrive quickly enough to manage. Clicks beat cultural value because clicks arrive immediately. Quarterly sales beat brand durability. Interview-to-offer conversion beats career contribution. Publication count beats long-term scientific importance. Test scores beat later civic or economic outcomes. Faster labels are not necessarily better labels. They are easier to optimize.

When the feedback horizon shortens, exploration can become distorted toward whatever teaches quickly.

A robust learning institution therefore needs two kinds of patience. It needs enough willingness to sample uncertain options, and enough memory to wait for the outcomes that matter.

The design also needs a record of why the exploratory action was chosen.

If a system deliberately interviews, tests, exposes, or reviews a case partly for information value, later analysts need to know that the case came from a different assignment policy. Otherwise exploratory observations are mixed into the ordinary training sample without context, and the institution loses the chance to evaluate whether the exploration policy itself worked.

Assignment probability is not glamorous metadata.

It can be the difference between interpretable evidence and a pile of interactions.

Online experimentation systems often record treatment assignment because the experiment would be meaningless without it. Decision systems should borrow the instinct. Record which policy generated the opportunity, whether the case was selected for expected value, uncertainty, random audit, human override, or another approved reason, and which downstream outcome followed.

The institution is building a memory of how it learned.

That becomes useful when exploration is adaptive. Early in a new region, the system may sample more widely. As evidence accumulates, selection concentrates. If the history does not record that change, later analysts can mistake the declining exploration rate for a shift in population rather than a shift in policy.

This is one way operational data loses causal meaning.

Another is through capacity. Exploration is often easier to discuss than to execute because the information-gathering stage itself is scarce. An employer can reserve interview slots only if interviewers have time. A hospital can audit more cases only if clinicians or reviewers have capacity. A government can pilot only if staff can implement a second workflow reliably.

Learning competes for operational slack.

Organizations optimized to one hundred percent utilization may therefore be epistemically fragile. Every hour, bed, slot, dollar, or queue position is already committed to the expected best use. There is no spare capacity for anomalies, audits, or tests.

Slack is often criticized as inefficiency.

Some of it is the physical form of curiosity.

That does not justify waste. It explains why resilient systems hold reserves. A spare server looks idle until traffic spikes. A cash reserve looks unproductive until conditions change. A small budget of human attention can serve the same role for learning.

This is difficult inside businesses because managers are measured on current performance. Exploration creates visible costs now and uncertain benefits later. A manager who gives an unfamiliar candidate a chance owns the risk. If the candidate succeeds, the success may be credited to the employee. If the candidate fails, the manager may be blamed for ignoring the ranking. The incentive structure pushes toward exploitation even before an algorithm does.

James March identified this organizational asymmetry decades ago. Exploitation tends to provide more certain and proximal returns. Exploration creates distant, uncertain, and diffuse benefits. An organization can rationally choose exploitation at each local moment and end up collectively underinvesting in discovery.

Algorithms can amplify the pattern by giving exploitation a number.

The top-ranked candidate is legible. Deviating from the list requires explanation. The exploratory candidate must justify not only their own uncertainty but the manager's departure from the system. Once a model is embedded in workflow, the burden of proof shifts.

That burden can be designed differently.

An organization can reserve a limited exploration budget. It can distinguish high-confidence negatives from high-uncertainty cases. It can ask models to estimate uncertainty, not only expected value. It can create second-look processes for candidates or proposals the primary model finds hard to evaluate. It can compare the outcomes of different selection policies over time. It can keep human disagreement as data rather than treating disagreement as defect. It can audit whether the same populations remain underobserved year after year.

None of these steps guarantees better decisions. They make ignorance visible.

That is the first requirement for managing it.

The deepest mistake is to think exploration is what happens after we have exhausted knowledge. In reality, exploitation and exploration are interdependent. Today's exploitative knowledge was produced by yesterday's variation. Every mature standard rests on a history of alternatives that were tried, compared, and discarded. Every reliable medical treatment sits downstream of experiments. Every well-understood consumer preference was once uncertain. Every recruiting heuristic that genuinely predicts performance became credible because somebody accumulated observations.

We inherit the evidence created by prior exploration and then behave as if evidence is a natural resource.

It is not.

Evidence is manufactured by contact with alternatives.

A system that consumes that evidence without replenishing it can look intelligent for a long time. It is living off epistemic capital.

The question at the door is therefore larger than who gets in.

It is what the institution will still be capable of knowing after the door has made the same kind of choice ten thousand times.
