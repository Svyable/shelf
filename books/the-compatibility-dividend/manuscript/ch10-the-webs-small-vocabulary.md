# The Web's Small Vocabulary

The World Wide Web became enormous with a surprisingly small set of shared ideas.

A resource could have an address. A client could request it. A server could respond. A document could point to another document.

From those modest primitives grew a publishing system that eventually carried journalism, shopping, government services, scholarship, pornography, propaganda, banking, video, social life, software and arguments about everything humans could think to argue about.

The web did not standardize those activities.

It standardized enough of their delivery that people could invent the activities independently.

Tim Berners-Lee's work at CERN in 1989 and 1990 brought together the core ideas that became the web: identifiers for resources, a transfer protocol and a markup language for documents containing links. The World Wide Web Consortium, formed in 1994, became a major venue for developing and maintaining web standards as adoption accelerated.

The historical details matter, but the architecture matters more.

The web separated address, transfer and representation.

A URL or URI identifies a resource. HTTP defines semantics for interactions between clients and servers. HTML describes documents and links. These layers can evolve. Other formats can travel over HTTP. Different servers can implement the protocol. Different browsers can render the same page.

The web's compatibility dividend came from the fact that a publisher did not have to make a separate private distribution agreement with every reader's software.

If the page used the shared standards, a browser built by strangers could retrieve it.

This destroyed a huge quantity of bilateral coordination.

Imagine an alternative network where every publisher negotiated a proprietary protocol with every browser maker. The technical burden would have favored a small number of integrated platforms. New entrants would need permission from both sides of the market before reaching anyone.

The open web let a teenager publish a page that software companies had never heard of could display.

That is a political property hiding inside a technical interface.

Permissionless publication was not created by a clause saying everyone had a right to speak. It emerged partly from an architecture in which the shared protocol did not require publishers to register every new page with a central distributor.

Standards can produce freedom structurally.

This is more durable than freedom granted by the discretion of a gatekeeper.

A platform may have generous policies today and restrictive ones tomorrow. A protocol that allows independent implementations distributes control more broadly.

The distinction between platform and protocol is not absolute. Protocol ecosystems still have infrastructure providers, registries, certificate authorities, hosting firms and dominant software. But the difference in permission structure matters.

A platform says: build inside my system.

A protocol says: implement the interface and meet me at the boundary.

The internet and web contain both models layered together.

This is one reason arguments about “open” technology are often confused. A company can use open protocols while controlling a powerful platform above them. A platform can expose open APIs while retaining the right to revoke access. A specification can be public while one company owns the only practical implementation.

The question is not whether open standards exist somewhere in the stack.

The question is whether an independent participant can reach users and counterparties without asking a rival for discretionary permission.

The web historically made that possible to an unusual degree.

HTTP's semantics are especially instructive because they are intentionally general. Modern HTTP standards describe methods, status codes, headers, representations, caching and intermediaries in ways that allow a vast range of applications to share the same interaction model.

A client can ask for a resource without knowing how the server stores it.

A server can respond without knowing why the client wants it.

Proxies can sit between them.

The uniform interface reduces coupling.

In software architecture, coupling measures how much one component depends on the internal details of another. High coupling makes change expensive. Low coupling lets components evolve more independently.

Standards are coupling management at ecosystem scale.

A good interface reveals enough and hides enough.

Reveal too little and parties cannot cooperate.

Reveal too much and they become entangled.

HTTP's success comes partly from making common operations legible while refusing to dictate implementation.

The same principle appears in REST, the architectural style associated with Roy Fielding's work: resources are manipulated through a uniform interface, and representations travel between components. The details are richer than the popular slogan, but the core intuition fits our argument.

A uniform interface allows intermediaries and general-purpose tools to exist.

Browsers, caches, proxies, debugging tools, security products, content delivery networks and servers can operate because the ecosystem shares recognizable semantics.

Standards create tool markets around predictable seams.

This is another form of compatibility dividend.

If every application invents a unique protocol, every diagnostic tool must understand every application. If applications share a protocol, tools can specialize at the shared layer.

The benefits compound.

Better tools make the standard easier to adopt. Wider adoption increases the market for better tools. The ecosystem thickens.

This is why successful standards are difficult for technically superior replacements to dislodge.

The replacement is not competing with a document.

It is competing with browsers, libraries, training, hosting, security expertise, monitoring, proxies, developer habits and institutional knowledge.

An incumbent standard comes bundled with a civilization of complements.

The web also shows how extensions can both strengthen and endanger a common standard.

Early HTML was small. Over time, the web platform accumulated styling, scripting, multimedia, storage, graphics, real-time communication, device access and many other capabilities. Browsers became operating environments of astonishing complexity.

Some of this growth was necessary because users wanted richer applications.

But every added capability creates new interoperability work, security surface and standards politics.

The narrow waist can develop a broad torso.

This does not mean the web failed. It means successful standards attract demands because everyone wants the common layer to carry their problem.

A standard becomes a victim of its own distribution.

If every browser implements a new feature, developers gain a global deployment surface. That makes the browser standards process economically consequential. Companies compete to shape the platform. Security and privacy concerns become central because browser features can reach sensitive user resources.

The interface evolves from document retrieval toward a general application environment.

Standards governance has to decide what belongs.

The browser wars supplied a harder lesson: a standard can exist on paper while the market fragments in implementation.

By the late 1990s, web developers were living inside a compatibility tax. Netscape and Microsoft competed aggressively through their browsers. Features appeared in one implementation before another. Document object models differed. Rendering differed. Sites accumulated browser-specific code. “Best viewed with” badges became small admissions that the universal page had started behaving like a vendor-specific application.

The Web Standards Project was formed in 1998 in response to this fragmentation. Its complaint was not that browsers were competing. Competition had produced rapid improvement. The complaint was that competition was moving into the seam that publishers depended on to remain universal. When browsers implemented the same public standards differently, every site owner became an involuntary integration engineer.

This is a useful distinction.

Competition above an interface can be generative. Competition over incompatible meanings of the interface can destroy the dividend the standard was supposed to create.

The same pattern appears in physical infrastructure. Different appliance makers can compete on price, efficiency and design because the wall socket is boring. If each manufacturer also competes by slightly changing the voltage and pin geometry, the customer gets more “innovation” in a narrow sense and less usable choice in practice.

The browser problem was not solved by freezing browsers.

It was solved, imperfectly and over years, by improving convergence around common behavior while allowing enormous competition in engines, interfaces, performance, extensions and product design. Test suites became more important. Specifications became more precise about edge cases. Developers learned to distinguish standardized behavior from implementation accidents. Browser vendors discovered that compatibility itself was a product feature because users wanted the same web to work everywhere.

This is a recurring maturity pattern.

Young ecosystems celebrate feature velocity. Mature ecosystems begin pricing disagreement.

An ambiguous corner of a specification may look harmless when ten programs use it. At global scale it becomes an economic liability. Millions of pages, libraries and users may depend on whatever behavior happened to become common. The standards process then has to decide whether to preserve the accident, clarify the rule or force migration.

The web contains thousands of such fossils.

They are not merely embarrassing leftovers. They are evidence that compatibility is partly historical. Real standards have to account for software already deployed, including software that misunderstood earlier standards in predictable ways.

Browsers therefore sometimes emulate old mistakes because breaking the web is worse than carrying an inelegant compatibility rule. This resembles Unicode's promise not to reinterpret old text and the railway's reluctance to move rails after whole networks have been built around them. An installed base turns yesterday's quirks into today's constraints.

The political economy becomes even clearer in the history of HTML governance.

During the 2000s and 2010s, W3C and the WHATWG followed overlapping but not identical paths for HTML and the DOM. The details are institutional and technical, but the systemic problem was simple enough: two bodies could publish documents that participants might treat as normative for the same core technologies. By 2019, W3C and WHATWG explicitly said that maintaining two distinct versions claiming normative authority was harmful. They agreed to collaborate on a single development stream, with HTML and DOM developed principally through the WHATWG Living Standard process and W3C participating through the agreed working mode.

That episode is easy to misread as bureaucratic trivia.

It is actually a standards story about standards.

Even institutions devoted to interoperability can create interoperability costs when their own outputs diverge. The cure was not for one side to declare itself morally superior. The cure was to reduce the number of places where implementers had to wonder which supposedly common rule governed.

A specification therefore has at least three layers of authority.

There is the text.

There is the implementation behavior that users actually encounter.

And there is the governance process that decides how disagreements between text and behavior are repaired.

All three matter.

A protocol with elegant prose and incompatible implementations is not interoperable. A protocol with interoperable implementations but opaque governance may become a private convention. A protocol with excellent governance but no adoption is a committee product.

Infrastructure emerges when specification, implementation and incentives reinforce one another.

This is why conformance tests are not secondary paperwork. They turn abstract agreement into something executable. Two teams can read the same sentence and sincerely implement different behaviors. A shared test can expose the disagreement before millions of users become the test harness.

The agent economy will need unusually strong versions of this machinery because semantic drift has consequences beyond layout.

If two browsers disagree about a margin, a page looks wrong.

If two agents disagree about whether `cancelled` means “no side effect occurred” or “stop trying but the payment may already have settled,” the same kind of interoperability bug becomes a financial dispute.

This question will arrive quickly for AI agent protocols.

A protocol that begins by exchanging tasks may be asked to include payment, identity, memory, reputation, negotiation, discovery, authorization, tracing, tool access, human approval and legal terms. Each addition seems reasonable in isolation. Together they can turn a narrow interoperability layer into an operating system for agency.

That would create enormous power in the protocol and enormous difficulty changing it.

The web's experience suggests caution.

Some functions belong in composable adjacent standards rather than in the core.

The web also demonstrates the importance of stable error semantics.

People joke about `404 Not Found` because the status code escaped engineering culture and became ordinary language. That is evidence of a successful standard.

A client does not need a custom conversation with every server to learn that a resource could not be found. The status code compresses a common outcome.

Errors are first-class coordination events.

This matters because systems spend much of their lives handling things that did not happen as intended.

A standard that defines only the happy path is not mature enough for autonomous action.

Agents will need similarly portable failure meanings. Was a task rejected because authority was insufficient? Was a payment declined? Was the requested capability unsupported? Did the operation fail before any side effect, after a reversible side effect or after an irreversible one? May the caller retry safely? Does the result contain partial completion?

Humans can ask follow-up questions.

Machines acting at scale need shared failure semantics.

One of HTTP's most useful ideas is idempotence: some operations can be repeated without changing the intended effect beyond the first application. This matters in unreliable networks because messages can be lost and clients may retry.

The concept becomes crucial for agents.

If an agent asks another system to retrieve a document twice, duplication may be harmless. If it asks to wire money twice, duplication is not harmless.

The interface must tell callers what can be retried safely.

Standards transform subtle operational knowledge into common contract.

This is the kind of thing that sounds tedious until a system acts without humans watching each step.

Machine autonomy increases the value of boring semantics.

The web also established an expectation that addresses can be linked.

Hyperlinks are another standards superpower hiding in plain sight. They allow one publisher to refer to another resource without negotiating a formal partnership. This creates a graph of references across independent ownership.

Links decentralize navigation.

A centralized database can contain references too, but the web made cross-site reference a native property of documents. That choice helped information escape organizational silos.

The agent economy will need an equivalent for capabilities and claims.

An agent may need to refer to a credential issued elsewhere, a policy document, a product, a legal entity, an invoice, a task state or another agent's capability description. Stable identifiers and dereferenceable references can let ecosystems compose without copying every fact into every message.

But references introduce trust questions.

A URL tells you where something is supposed to be. It does not tell you whether it is true, safe or authorized.

This separation between address and trust is one of the web's most important lessons.

People often expect identifiers to carry more meaning than they should. A domain name can look official without being legitimate. A secure connection can prove communication with the holder of a certificate for a domain without proving the truth of the page's claims. A link can lead to malware.

The web solved reachability before it solved trust.

In some ways it never solved trust globally, because trust is contextual.

That is appropriate.

Different institutions need different evidence. A scientific claim is evaluated differently from a bank login. A government credential is trusted differently from a restaurant review. One universal truth registry would create more problems than it solved.

Agent standards should preserve this pluralism.

The communication layer can make claims portable without deciding which claims every recipient must believe.

Verifiable credentials follow this logic. They can provide cryptographic mechanisms for expressing claims from issuers, but verifiability is not identical to trustworthiness. The recipient still decides whether it trusts the issuer and whether the claim is relevant.

The web's address layer and credential systems belong to the same larger architecture: separate reference from judgment.

This separation allows different trust domains to coexist on common transport.

The web also shows how de facto control can reappear despite open standards.

Search engines became crucial navigational intermediaries because the web grew too large for manual discovery. Social platforms became distribution systems. Browser markets concentrated. Certificate issuance relies on recognized authorities. Hosting and content delivery concentrated in large providers.

Open protocols did not create a perfectly decentralized world.

They created openings where new centralized services could compete to become useful.

This is an important correction to standards romanticism.

Interoperability lowers some barriers. It does not abolish economies of scale, network effects, data advantages or capital requirements.

A standard can make a market contestable without keeping it unconcentrated.

The distinction matters for policy.

If concentration arises because a company controls a proprietary interface, interoperability requirements may attack the bottleneck directly. If concentration arises because users genuinely prefer one large service despite open interfaces, standards alone may not change the outcome.

Technical remedies should match technical sources of power.

The web's history also contains failed or marginalized standards. Not every carefully designed specification gained adoption. Some were too complex. Some arrived late. Some lacked compelling implementations. Some competed with simpler de facto practices. Others solved problems users did not value enough.

This keeps us honest.

Standards organizations cannot legislate network effects by publication.

Adoption requires an economic reason.

The reason may be lower cost, safety, regulatory compliance, market access, technical quality, convenience or the simple necessity of connecting to everyone already there.

Without that reason, the standard is a suggestion.

The early web offered an unusually strong reason: implement a small common set and gain access to a rapidly expanding universe of pages and users.

Every new participant increased the reward for the next.

That recursive value is what agent interoperability proponents hope to create.

If one agent can call ten tools, useful.

If every agent can call thousands of independently provided tools through common interfaces, a market appears.

If one company's agents can cooperate with its own agents, useful.

If agents from competing vendors can exchange tasks through a shared protocol, modular organizations become possible.

If one agent can spend from one wallet, useful.

If merchants, banks and agents share machine-readable authorization and payment semantics, automated commerce changes scale.

The web teaches both optimism and restraint.

Optimism because small common layers can unlock unpredictable ecosystems.

Restraint because the shared layer should not try to predict the ecosystem it will unlock.

Standards are infrastructure for strangers.

You do not know what strangers will build.

That is why the interface must be stable enough to trust and general enough to surprise you.

The web's great trick was making millions of independent publishers and programs behave as if they belonged to one information system without requiring them to belong to one company.

That is the compatibility dividend at network scale.

The next question is even stranger.

What happens when the thing crossing the interface is not a page but a decision?
