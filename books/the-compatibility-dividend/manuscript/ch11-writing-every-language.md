# Writing Every Language

A computer does not see a letter.

It sees a number that software has agreed to treat as a letter.

That agreement is the difference between text and noise.

Early computing developed many character encodings. ASCII became enormously important for English-language computing, but a seven-bit character set could not represent the world's writing systems. Other encodings emerged for other languages and vendors. The same sequence of bytes could mean different characters under different assumptions. Moving text between systems could produce corruption familiar enough to earn nicknames: mojibake, garbled characters, question marks where names should be.

Humans could read the intended language.

Machines could not agree which language the bytes contained.

The Unicode project attacked the problem at a different level. Rather than require every program to negotiate a private character set, Unicode sought a universal character encoding capable of representing the written texts of the world's languages and technical disciplines. The Unicode Consortium was incorporated in 1991, and Unicode 1.0 appeared that year. Its standard has continued expanding and evolving, closely coordinated with the corresponding ISO/IEC 10646 work.

The achievement is easy to underestimate because modern users expect a name typed on one device to remain a name when it travels.

That expectation is historically expensive.

Text is identity, law, science, culture and memory. If a computing system cannot represent a person's name, the failure is not cosmetic. It can affect records, travel, banking, health care and citizenship. If a script cannot be encoded, the community using it has a weaker position in the digital world. If historical characters cannot be represented, archives and scholarship lose fidelity.

Character standards are cultural infrastructure.

They also expose the limits of the phrase “just standardize it.”

What exactly is a character?

The question sounds childish until scripts disagree with the assumptions built into Latin alphabet computing. A visible mark can have multiple forms. Characters combine. Directionality differs. A single abstract character can be rendered with different glyphs. Some writing systems use contextual shaping. Canonically equivalent sequences can produce the same apparent text through different underlying code point sequences.

The standard has to decide what layer it is standardizing.

Unicode's crucial move is to encode characters, not particular visual glyph designs. Fonts and rendering systems remain free to choose how characters appear within the rules and traditions of scripts.

Again the narrow waist appears.

Standardize identity at the character layer. Leave typography above it.

This separation allows the same text data to be rendered in different fonts, sizes and styles while remaining the same underlying string.

A word can travel without carrying its final appearance.

This is the informational equivalent of the shipping container hiding its cargo and the internet packet hiding its application. The standard isolates what must remain stable across systems and lets other variation continue.

The difficulty is that human writing systems do not divide themselves cleanly for the convenience of software engineers.

Standards committees had to make judgments about equivalence, normalization, directionality, combining marks, historical scripts and cross-standard compatibility. Some decisions attracted sustained criticism from language communities and experts. Han unification, which encodes related characters used across Chinese, Japanese and Korean writing under shared code points in many cases, became one famous area of controversy because abstract character identity and culturally specific glyph forms do not always align intuitively for users.

There is a lesson here larger than Unicode.

When standards model human categories, classification becomes governance.

The specification does not merely describe the world. It decides which distinctions the system will recognize at a particular layer.

This happens everywhere.

Medical coding systems decide how diagnoses are categorized. Customs codes determine how goods are classified. accounting standards decide which economic events belong in which buckets. digital identity schemas decide what attributes exist. AI safety taxonomies decide what counts as a category of risk.

Categories make automation possible.

They also flatten reality.

A standards designer should therefore ask not only “Can the schema represent the common case?” but “Whose distinction disappears when it cannot?”

Unicode has become unusually broad partly because the institution continues adding scripts and characters rather than pretending the initial model was complete. The standard contains mechanisms and governance for evolution.

This is what inclusive infrastructure looks like in practice: maintenance.

Not a one-time declaration that everybody is represented.

A process by which missing representation can be identified, proposed, reviewed and added.

That process can still be slow, technical and unequal. Communities with documentation, expertise and institutional access may navigate it more easily. But the existence of a durable pathway matters.

Open-ended standards need constitutional mechanisms for admitting the future.

Registries are one such mechanism.

Instead of hard-coding every possible future value into the original specification, a standard can define a namespace and a process for assigning new values. Internet protocols use registries extensively. Unicode assigns code points through a governed process. Media types, language subtags, protocol numbers and many other shared identifiers grow through maintained registries.

A registry is a controlled extension point.

It solves the collision problem without requiring the whole standard to be rewritten whenever the world produces a new item.

This is another architecture the agent economy will need.

Capabilities will grow. Credential types will grow. payment methods will grow. model families will grow. tool categories will grow. legal jurisdictions and policy profiles will vary. A standard that tries to enumerate the future will fail.

A standard that defines how new things can be named may survive.

The distinction is subtle but profound.

Do not standardize every future noun.

Standardize the grammar for adding nouns.

Unicode also demonstrates why backwards compatibility can become close to sacred in infrastructure.

Once a character has been assigned a code point and that assignment has entered documents, databases and software around the world, changing its fundamental identity could corrupt stored information. The cost of “fixing” an old choice may be vastly larger than preserving an awkward one.

The standard develops a memory.

This memory constrains future elegance.

Software engineers often encounter bizarre-looking compatibility rules and assume incompetence. Sometimes the ugliness is evidence that the system has promised not to reinterpret yesterday's data.

A mature standard carries obligations to the past.

Unicode makes this promise unusually explicit. Its stability policy says that once a character is encoded it will not be moved or removed. A future version can add characters, deprecate old ones and revise some properties within defined constraints, but it cannot casually take a code point that meant one thing in stored text and assign it to something else.

This sounds like technical housekeeping until you consider the alternative.

A birth record, legal filing, database key or archived message might be read years later by software that never existed when the text was written. The old file has no representative at the standards meeting. Stability policy represents it.

Infrastructure has silent stakeholders.

Past data cannot lobby.

That is one reason compatibility commitments need to be stated before the pressure to break them arrives.

This can be admirable and dangerous.

Preserving data is valuable. Preserving insecure behavior can be harmful. The governance problem is deciding which promises are identity-preserving and which must eventually be broken.

Character encoding leans heavily toward permanence because changing the meaning of stored text is catastrophic. Cryptographic standards lean toward migration because old algorithms can become unsafe. User interfaces may tolerate more change. Payment protocols occupy a conservative middle because money demands stability but fraud threats evolve.

There is no universal rate of standards change.

Different layers have different half-lives.

This is another reason giant cross-domain standards are brittle. If one document binds rapidly evolving AI capabilities to long-lived identity semantics and conservative legal commitments, its pieces want to change at incompatible speeds.

Layering lets each layer move according to its risk.

Unicode also teaches a lesson about universalism.

A universal character set sounds like a demand for one global writing system. It is almost the opposite.

The shared encoding enables diversity by giving different scripts a common technical substrate.

This is standards at their best: common infrastructure that preserves surface difference.

The system does not ask Arabic to become Latin or Japanese to become English. It asks software to agree on stable identifiers for the characters so those differences can travel.

Uniform infrastructure can protect plural expression.

This complicates the instinct that standardization homogenizes culture.

Sometimes it does. A dominant standard can erase minority practices if it recognizes only the majority form. But a well-designed standard can make diversity interoperable, increasing the practical survival of forms that would otherwise be excluded from mainstream systems.

The difference lies in where sameness is demanded.

Demand sameness in language and you erase culture.

Demand sameness in the machine-readable way languages identify characters and you may make culture more portable.

This is a general recipe for pluralistic standards.

Find the lowest layer at which common agreement enables higher-layer diversity.

The idea applies to money. A payment messaging standard can support many banks and products. It applies to identity. A credential data model can support many issuers and claims. It applies to agents. A task protocol can support many models and internal architectures.

Standardization should be an enabling floor, not a flattening ceiling.

Unicode's success also shows how standards can turn previously local software problems into shared infrastructure problems.

Before a universal encoding, every software vendor could implement its own language support. That duplicated work and fragmented the ecosystem. Once Unicode became widely adopted, operating systems, programming languages, databases, browsers and applications could build around the same character model.

The common layer pooled engineering effort.

This is another compatibility dividend.

A company does not need to invent a new code assignment for every script it supports. It can rely on the shared standard and focus on rendering, input, product design and language-specific quality.

Common infrastructure concentrates effort where coordination is valuable and frees competition elsewhere.

But the transition was not instantaneous.

Legacy encodings persisted. Software had to convert. Files lacked explicit encoding information. Web pages declared encodings incorrectly. Developers made assumptions based on local language environments. Users saw corrupted text.

Migration again was the work.

It is easy to praise a successful standard after the ecosystem has absorbed its transition costs. During migration, standards can temporarily increase complexity because systems must support both old and new worlds.

This is the compatibility valley.

Before migration, the old system is internally familiar.

After migration, the new standard creates broader interoperability.

In between, participants may need dual support, converters, testing and data cleanup.

Organizations frequently underestimate this valley and then blame the standard for transition pain.

The same will happen with agent infrastructure.

Enterprises already have proprietary authorization systems, APIs, workflow engines, identity directories and audit formats. New agent standards will not replace them overnight. Gateways will map old permissions into new tokens. Systems will support multiple protocol versions. Humans will remain in approval loops. Some actions will be machine-native; others will be wrapped legacy processes.

The transition layer may last decades.

This is not failure.

It is what infrastructure change looks like.

Unicode offers another insight: representation precedes participation.

A character must be representable before software can manipulate it reliably. A product must be identifiable before an automated supply chain can coordinate around it. A person or organization must be identifiable before machine-readable credentials can attach to them. An agent capability must be describable before another agent can discover and request it.

What a system cannot name, it struggles to govern.

This creates a quiet politics of schemas.

If a standards system lacks a field for a relevant concept, participants may force reality into the nearest available category. The omission can propagate into data, policy and automation.

AI makes this more consequential because models can paper over schema gaps in conversation while the execution systems underneath remain rigid.

An agent may understand a nuanced request and then be forced to reduce it to a binary permission field because that is all the downstream API accepts.

Intelligence at the edge cannot always repair poverty in the standard.

There is a second problem that appears only after representation succeeds.

Two strings can be valid Unicode and still not be safe to compare naively.

Some text that looks the same to a person can have different underlying code-point sequences. Unicode normalization exists partly so canonically equivalent strings can be converted into predictable forms for comparison and storage. A system that ignores this can discover that the “same” human word is two different machine keys.

That sounds like a software nuisance. Put the string in an identifier and it becomes institutional.

Suppose a user name, account name, product code or document identifier accepts international text. The system has gained expressive range. It has also inherited the fact that different scripts contain characters that can look similar or even indistinguishable in particular fonts. The Latin `a` is not every character that resembles an `a`. A visual match is not a code-point match.

Unicode's own security specifications address this problem through mechanisms for detecting confusable strings and restricting identifiers in high-risk contexts. The standard does not solve the social question by banning multilingual text. It gives implementers tools for recognizing that broad representation changes the threat model.

This is a more mature picture of interoperability.

First make diversity representable.

Then define how equivalent forms compare.

Then identify contexts where visual similarity can be exploited.

Then let applications choose restrictions appropriate to their risk.

The bank login, the literary archive and the group chat do not need identical identifier policies.

This is scope discipline again.

A universal character set should not become a universal security policy.

The standard can expose the relevant structure without pretending every use case has the same tolerance for ambiguity.

The lesson travels directly into agent systems.

Machine-readable names will proliferate: tool identifiers, agent identifiers, credential types, policy names, transaction states, capability labels. If those names are compared as raw strings without normalization rules, namespace discipline or issuer context, systems can disagree while each believes it is following the protocol.

Worse, an attacker can exploit the disagreement.

A human operator may approve a capability whose displayed name resembles a trusted one. A model may describe two identifiers as equivalent because their labels are semantically similar. The authorization layer may quite correctly treat them as different byte sequences.

The model understands meaning.

The security boundary understands identity.

Those are different jobs.

Standards become dangerous when they let one stand in for the other.

This suggests a design discipline for agent standards: be minimal in mandatory semantics but rich in extensibility and provenance.

The core should not attempt to classify every human intention. It should provide stable ways to say which vocabulary is being used, who defined it, how a recipient can learn more, and what happens when the vocabulary is not understood.

Unicode succeeded because it made a big universal commitment at a layer where universality was valuable: code points for characters.

An agent protocol may not have such a clean universal layer for intent.

That uncertainty should make us more modest.

The standards community has a habit of confusing machine readability with semantic agreement. Putting a concept in JSON does not make people agree what the concept means. Giving it a URI does not make it true. Assigning a code does not settle cultural or legal disputes.

Unicode itself avoids this trap by carefully delimiting what its character model claims to standardize and what it leaves to rendering, language and context.

The specification earns power through scope discipline.

This is what future standards for machine agency need most.

Consider a field called `authority`.

It seems simple. Then the questions begin.

Authority from whom? Under which legal relationship? For what resource? Which actions? What spending limit? Can it be delegated? Does it survive the principal going offline? Can it be revoked instantly? Which clock determines expiry? What evidence binds the grant to the agent? Does the recipient trust the issuer? Which jurisdiction recognizes the delegation?

One word contains an institution.

A bad standard will flatten the institution into a boolean.

A better standard will identify the pieces that must be explicit and allow domain-specific profiles to supply the rest.

The lesson from character encoding is not that everything can be unified.

It is that careful abstraction can make astonishing diversity portable.

Unicode made it possible for one computing substrate to carry many writing systems without requiring those systems to become one language.

The next generation of coordination standards should aim for the same generosity.

Different agents, institutions, laws and markets should be able to remain different while sharing enough machine-readable structure to cooperate.

That is a harder ambition than uniformity.

It is also more useful.

The world does not need one way to think.

It needs reliable ways for different ways of thinking to meet.
