# Rough Consensus, Running Code

Standards are agreements among people who often have reasons not to agree.

That makes the committee part of the technology.

Engineers sometimes speak as if a sufficiently rigorous analysis will reveal the correct specification. In narrow problems, it can come close. A material has measurable properties. A thread form can be tested. A protocol can be benchmarked. But standards usually sit where technical options meet installed systems, commercial interests, safety concerns, patent rights, national practices and predictions about the future.

The committee is not choosing from pure designs.

It is choosing a path through consequences.

Different standards institutions evolved different ways to make that choice.

The International Telecommunication Union traces its standardization history to the International Telegraph Convention of 1865, when European states needed telegraph systems to work across borders. The International Electrotechnical Commission was founded in 1906 as electrical technologies spread. ISO began operating in 1947 after delegates from twenty-five countries met the previous year to coordinate national standardization efforts. The IETF later developed a different, internet-native culture organized around open technical work, published drafts and a strong preference for implementation experience.

These institutions do not share one constitution.

That is healthy because the things they standardize differ.

A treaty-based telecommunications institution coordinating national governments faces different legitimacy questions from a volunteer technical community developing network protocols. A national measurement institute has different responsibilities from an industry consortium. A professional society maintaining an engineering specification has different participants from a web standards organization.

There is no single standards process because there is no single kind of coordination problem.

Still, recurring design questions appear.

Who may participate?

Who may vote or block?

What counts as consensus?

How are objections recorded?

What evidence is required?

How are intellectual-property interests disclosed?

Are drafts public?

Are final standards free to read?

Can implementations be tested independently?

How are extensions registered?

How are old standards retired?

How does a user appeal?

These procedures determine whether a standard can accumulate trust.

Trust matters because adoption is an investment decision.

A company implementing a shared protocol is betting that the interface will remain useful. A manufacturer retooling around a dimension is betting that suppliers and customers will honor it. A government incorporating a standard into regulation is betting that the standardization process will remain competent enough to maintain the rule.

Governance quality changes the expected value of the bet.

A standard controlled by a competitor can be technically excellent and commercially frightening. Participants may worry that future revisions will discriminate against them. A neutral-enough process reduces that fear and attracts complementary investment.

This is why governance can create economic value even when it slows decisions.

Speed is not the only objective.

A dictator can publish a standard instantly.

The hard part is getting independent actors to trust the standard enough to reorganize themselves around it.

Consensus processes trade speed for legitimacy and information.

The word consensus is often misunderstood as unanimity or niceness. The IETF's culture is useful precisely because it treats consensus as a way to expose and resolve substantive objections rather than a vote-counting ceremony. RFC 7282, “On Consensus and Humming in the IETF,” explains rough consensus as a process focused on technical issues, not simple majority rule. A small number of serious objections can matter more than a large number of shallow preferences.

That is a sophisticated idea.

Standards decisions are not elections for taste. The minority may have discovered a failure mode.

If ninety engineers prefer a feature and one demonstrates that it allows catastrophic data loss, the vote count is irrelevant.

Consensus should aggregate reasons, not merely people.

This is difficult in practice because institutions still need to decide when debate has become repetition. A participant can always raise another concern. Requiring unanimity gives any individual a veto. Moving too quickly can suppress valid dissent.

The chair's judgment becomes part of the standardization machinery.

So does culture.

A community that rewards people for discovering problems gets better standards than one that treats objections as disloyalty. A process that records unresolved issues preserves institutional memory. A committee that welcomes prototypes can discover ambiguities before they become deployment failures.

This is where “running code” earns its place.

A standard implemented twice is different from a standard read twice.

Independent implementations force prose to become behavior. They reveal whether two competent teams interpret the same requirement the same way. Interoperability testing turns disagreement into packets, logs, failed handshakes and mismatched outputs.

The specification meets reality.

QUIC gives this principle a modern case with unusually good documentation.

The protocol that became QUIC version 1 entered the IETF with substantial pre-standardization implementation and deployment experience rather than beginning as a committee thought experiment. Its working group charter explicitly described the standards effort as building on that prior experience while generalizing the design into an open protocol.

That origin created both an advantage and a danger.

The advantage was evidence. Engineers already knew that the basic architecture could move real traffic at scale. They had observed latency, congestion, connection establishment and deployment behavior that a clean-sheet protocol document could only predict.

The danger was gravitational pull. A successful early implementation can become the answer simply because it arrived first.

The IETF process therefore had to do more than bless the deployed design.

Independent implementations mattered.

As QUIC drafts evolved, browser vendors, server developers, cloud and content-delivery companies, independent libraries and research implementations tried to speak the protocol to one another. The working group did not merely ask whether each codebase passed its own tests. It asked whether independently written code exchanged traffic correctly across many pairings.

This is a harder test.

A single implementation can contain a bug that perfectly matches its own assumptions. Two implementations force assumptions to meet.

By the time the standards package approached publication, IETF material described more than twenty QUIC implementations participating in interoperability work. The number is less important than the diversity. Different teams, different codebases and different deployment environments were exercising the same prose.

Then the testing itself had to improve.

Manual interop events are valuable and limited. If twenty implementations must all be paired, combinations multiply quickly. Network conditions vary. A failure that occurs only under delay, loss or reordering can hide behind a successful handshake on a conference network.

QUIC implementers built automated interoperability infrastructure to make this repeatable.

The IETF's account of QuicInteropRunner describes a framework in which implementers maintain endpoints and automated jobs run combinations of implementations through defined network scenarios. That turns interoperability from an occasional social event into something closer to continuous measurement.

The consequences run both directions.

Implementation bugs are found.

Specification bugs are found.

That second category is why running code belongs in standards governance rather than only quality assurance.

If multiple competent teams stumble over the same clause, the problem may be the clause.

A standards document is an executable social contract written in prose. Repeated misimplementation is evidence that the contract may be underspecified.

QUIC's standardization story therefore complicates the phrase “rough consensus and running code” in a useful way.

Consensus is not the stage before code.

Code is part of the argument from which consensus is formed.

A draft proposes behavior. Implementations test it. Deployments expose new conditions. Engineers revise the draft. More implementations test the revision. The process loops.

This is institutionalized learning.

It also changes what counts as persuasive evidence in a technical dispute.

An engineer can argue that a mechanism is elegant.

Another can show that three independent implementations cannot deploy it through common networks without breakage.

The second fact does not automatically win—perhaps the networks should change—but it changes the burden of proof.

Reality has joined the mailing list.

QUIC also shows how implementation experience can be preserved without freezing version one forever. RFC 8999 defines version-independent properties of QUIC. RFC 9368 later adds compatible version negotiation. The current working group continues maintaining the base protocol and developing extensions and new capabilities.

This is a standards institution trying to separate invariants from evolution.

That distinction is exactly what a young agent ecosystem needs.

Which properties are fundamental enough that implementations can rely on them across versions?

Which behaviors belong to one version?

How do two systems discover that they can move together to a newer version?

How are extensions tested before they become dependencies?

A protocol that answers only “what does version one do?” is a product specification.

Infrastructure needs a story about version two.

The principle extends far beyond software.

A physical standard should be manufactured, measured and tested. A medical data standard should be exchanged among actual systems. A logistics standard should survive real warehouses. A credential format should be verified by independent issuers and recipients. An agent protocol should be implemented by competing model vendors and tested under failure, adversarial input and mixed versions.

No committee can reason through every interaction in advance.

Implementation is a form of research.

This is one reason standards should sometimes follow experimentation rather than precede it.

A technology needs enough diversity of real attempts for the community to learn which distinctions matter. Premature standardization can turn the first plausible design into inherited infrastructure.

The opposite problem is waiting until fragmentation is entrenched.

Governance therefore needs a sense of technological maturity.

Which parts have stabilized through repeated independent experience?

Which are still moving because the market is discovering the problem?

Which need a temporary experimental registry rather than a permanent core requirement?

Which can be standardized as an abstraction even while implementations differ?

These questions are more important than whether the standards body moves fast in the abstract.

Artificial intelligence is unusually difficult here because capability is moving quickly while coordination needs are already urgent.

Tool access is real. Agent-to-agent communication is real. Enterprises are deploying systems with permissions and side effects. Waiting for the field to stabilize completely would leave proprietary interfaces to become de facto standards.

But standardizing a comprehensive theory of agency now would freeze assumptions made during an immature phase.

The correct strategy is likely selective standardization.

Standardize where independent implementations have already discovered a common seam.

Keep experimental fields optional.

Use extensible registries.

Define error behavior.

Publish threat models.

Test mixed-vendor implementations.

Avoid turning vendor-specific product features into mandatory universal concepts simply because the vendor has arrived with working code.

Running code is evidence, not sovereignty.

This distinction matters because implementation can bias standards too.

A company that deploys early can say, reasonably, that its design is proven. Competitors may arrive later with alternatives and face the burden of explaining why the ecosystem should change. The first implementation becomes a gravitational field.

“Rough consensus and running code” works best when multiple codebases run.

Otherwise the standard can become documentation of one product.

True interoperability requires independent implementations with different incentives.

This gives us a powerful test for openness: can somebody implement the standard correctly without access to the original creator's private code, meetings or favors?

If not, the specification is incomplete as shared infrastructure.

The same test works for physical standards. Can a competent manufacturer make a conforming component from the published dimensions and test methods? If successful implementation requires undocumented tribal knowledge held by one incumbent, the standard is not truly portable.

Tacit knowledge is an invisible proprietary extension.

Standards bodies try to reduce it, but some always remains.

This is why mature ecosystems develop conformance tests, plugfests, certification events and reference materials. They turn tacit expectations into observable behavior.

A test suite can be more valuable than another hundred pages of prose.

It can also become dangerous.

Once passing the test becomes the practical definition of compliance, implementers optimize for the test. Untested behavior may diverge. A flawed test can override a correct specification. Certification can become a bottleneck controlled by whoever owns the suite.

Conformance testing needs governance too.

There is no layer where politics disappears.

Standards organizations also face the problem of participation cost.

A meeting may be open to anyone, but years of attendance are expensive. The relevant draft may be hundreds of pages. Effective participation requires domain expertise, English fluency in many international contexts, travel or time-zone tolerance, employer support and familiarity with procedural norms.

Large firms can specialize in standards strategy.

Small firms cannot always afford to notice the committee exists.

This can create regulatory capture without a regulator.

The most sophisticated participants shape details before the broader market understands their significance.

Transparency helps but does not equalize capacity.

A thousand pages of public minutes are not meaningful access to someone without time to read them.

One response is stronger representation through national bodies, trade associations, civil-society groups and open-source communities. Another is public funding for participation where standards have major social consequences. Another is procedural discipline that requires clear rationales and public issue tracking.

The goal is not to make every citizen attend every meeting.

It is to create channels through which affected interests can become legible before lock-in.

This is especially important when standards cross from technical interoperability into social policy.

A screw-thread committee can reasonably be dominated by mechanical experts. A facial-recognition standard that defines demographic performance testing affects broader communities. An AI agent identity standard could influence anonymity, workplace surveillance, consumer rights and state authority.

The definition of “stakeholder” expands with consequence.

Technical expertise remains necessary.

It becomes insufficient.

This creates tension because broad participation can slow highly technical work and introduce political arguments that engineers hoped to avoid. But avoiding a political argument by hiding it in a technical choice does not make the politics vanish.

It makes them less accountable.

A good standards institution knows when the seam is technical and when the seam is constitutional.

There is another governance question that rarely receives glamour: document access.

Some formal standards are sold rather than freely downloadable. Standards bodies need revenue to operate, and publication sales have historically supported parts of the system. Critics argue that standards incorporated into law or required for market participation should be readily accessible.

The dispute captures a recurring financing problem.

Shared infrastructure costs money to maintain.

If users do not pay, somebody else must.

Corporate sponsorship can create dependence. Government funding can create political control. Membership dues can privilege large participants. Document sales can raise implementation barriers. Certification fees can make market access expensive.

There is no free governance.

The funding model becomes part of institutional design.

Open-source software offers one alternative pattern: the specification and implementation may be freely available while companies make money from services, hardware, hosting and support. This can accelerate adoption. It can also concentrate practical maintenance in a few firms whose commercial priorities shape the project.

Again, openness moves the power rather than eliminating it.

The standards system needs a business model because someone has to answer issue number 4,813.

This unglamorous maintenance work is where infrastructure earns continuity.

Naming registries must remain available. Security vulnerabilities must be handled. Errata must be published. Tests must evolve. Ambiguous clauses must be clarified. New participants must learn the process. Old participants leave and institutional memory must survive them.

A standard is a living public memory of how systems meet.

Governance keeps the memory usable.

This becomes more difficult when standards become globally important because geopolitical competition enters.

Countries understand that technical standards can shape industrial advantage. Leadership in telecommunications, semiconductors, energy technologies and AI can influence which domestic firms' architectures become familiar worldwide. Governments fund standards participation and treat standards strategy as economic strategy.

That does not automatically corrupt the process.

National interests are real interests. International standards exist partly to reconcile them.

But it means the romantic image of neutral engineers discovering optimal protocols is incomplete.

Standards are also diplomacy among infrastructures.

The 1865 telegraph convention makes this obvious. Cross-border communication required states to negotiate because wires did not respect the administrative assumptions of each territory.

AI agents will cross borders even more casually.

An agent running in one country may act for a company incorporated in another, call a service hosted in a third, purchase from a merchant in a fourth and pay through a financial institution in a fifth. Which identity standards apply? Which signatures are recognized? Which consumer rules attach? Which logs must be preserved? Which party can revoke authority?

Technical interoperability can make jurisdictional conflicts more frequent by making cross-border action easier.

The standard cannot solve all of international law.

It should make enough metadata portable that legal systems can identify the transaction.

This is another instance of scope discipline.

A protocol can carry jurisdictional claims without deciding every jurisdictional dispute.

A credential can identify an issuer without requiring every recipient to trust it.

An audit format can preserve evidence without deciding liability.

The standards layer should expose the facts institutions need rather than becoming the institution that resolves every fact.

This approach also improves longevity. Law changes by country and time. A technical core that hard-codes one jurisdiction's doctrine will age badly.

Governance should anticipate this plurality.

The IETF's history suggests another virtue: write down the reasoning.

A standard is easier to maintain when future engineers can learn why a rule exists. Otherwise they see an awkward constraint and remove it, rediscovering the failure it prevented.

Institutional memory is a form of backward compatibility for judgment.

Specifications often need companion documents, security considerations, implementation notes and decision records because the rule alone does not carry its context.

AI could improve this dramatically.

Agents may be able to search decades of standards discussions, compare proposals, trace objections and surface historical rationales for maintainers. That could reduce one of the largest costs in mature systems: forgetting why the weird thing is there.

AI could also flood standards processes with low-cost proposals, comments and automatically generated argument.

If writing becomes cheap, attention becomes the scarce input.

Standards governance will need new filters for machine participation.

Should an AI agent be allowed to submit a technical proposal? Of course, if the proposal is useful. Should ten thousand agents be allowed to manufacture the appearance of consensus? Clearly not.

The process will need to distinguish contribution quality from contributor count more carefully than ever.

This makes the IETF's rough-consensus philosophy unexpectedly relevant.

Count reasons, not voices.

Test claims.

Run code.

Resolve substantive objections.

Do not confuse volume with legitimacy.

Machine intelligence may make standards work faster.

It will not make the human problem disappear.

Somebody still has to decide which shared constraints are worth imposing on everyone who wants to connect.

That decision is governance.

The standard is only as trustworthy as the process by which strangers agree to let it govern their seam.
