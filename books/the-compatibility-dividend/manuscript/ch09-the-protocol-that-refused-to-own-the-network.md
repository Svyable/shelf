# The Protocol That Refused to Own the Network

The internet's most consequential design choice may have been what it declined to standardize.

It did not require every participating network to use the same physical medium. It did not insist that every computer share an operating system. It did not tell applications what business they were allowed to conduct. Instead, the architecture created a common layer through which heterogeneous networks and machines could exchange packets.

The result was not uniformity.

It was interoperability across diversity.

This is the narrow waist at civilizational scale.

Below the Internet Protocol, many link technologies can carry traffic. Above it, many transport protocols and applications can exist. The middle layer establishes enough shared behavior that the rest of the ecosystem does not need to converge on one implementation.

That architectural restraint created a platform for surprise.

The designers of early internetworking systems did not need to predict streaming video, online banking, social media, cloud computing, multiplayer games, smartphones or autonomous AI agents for those applications to emerge later. Once endpoints could exchange data through a stable general-purpose network layer, innovators could build new uses without renegotiating the entire communications infrastructure.

Standards become superpowers when they standardize the right ignorance.

A router does not need to understand why a packet exists.

The network can move a packet without knowing whether it represents a scientific result, a photograph, a payment instruction or a joke. This separation lets the network and applications evolve semi-independently.

It is the same logic as the shipping container, except the cargo is information.

The container standard allows transport machinery to handle a box without understanding the goods inside. The internet protocol suite allows network machinery to handle packets without understanding the application semantics inside.

In both systems, hiding detail creates scale.

The internet's history also shows that standards are not simply documents. They are running agreements implemented in code.

The ARPANET's transition from its earlier Network Control Protocol to TCP/IP on January 1, 1983 is often treated as a symbolic birthday for the modern internet. The transition required hosts to change together or lose ordinary connectivity. The Internet Society's historical account describes it as a flag-day style conversion.

A protocol transition is a standards migration with immediate network consequences.

The specification can be correct and the migration can still fail if implementations do not move.

This is why internet engineering culture developed such respect for operational reality. The phrase “rough consensus and running code” became an unofficial IETF motto because interoperability is discovered partly through implementation. Two teams can read the same document and produce software that behaves differently. Code exposes ambiguity.

This is an important difference between standards and laws of nature.

A standard does not enforce itself.

Its meaning lives in the interaction between text, implementations, tests, conventions and deployed behavior.

The IETF's Request for Comments series is one of the great libraries of this process. RFCs describe protocols, practices, experiments, histories and standards. The documents often use carefully differentiated requirement words—MUST, SHOULD, MAY—because a single sentence can determine whether independent implementations converge.

The prose is infrastructure.

This kind of writing has a different purpose from ordinary explanation. Ambiguity that would be harmless in an essay can be catastrophic in a protocol. “Usually,” “when appropriate” and “as needed” are dangerous if two machines must make the same decision without human negotiation.

Standards writing therefore reveals another form of compressed coordination: precision in language substitutes for future meetings.

Every ambiguity removed from the document is one less bilateral argument implementers may need later.

Of course, no specification removes every ambiguity.

Real networks are adversarial teachers. Implementers discover corner cases the authors missed. Hardware behaves unexpectedly. Attackers find interpretations nobody intended. Scale reveals performance limits. New applications place pressure on assumptions that once seemed safe.

Mature standards systems therefore need revision without chaos.

The internet protocol suite evolved through new RFCs, updated requirements, obsoleted documents and versioned protocols. TCP changed. HTTP changed. Security practices changed. IPv6 was developed because IPv4's address space and architecture faced long-term constraints.

But the internet could not simply reboot the planet every time the standards improved.

Backward compatibility and incremental deployment became central concerns.

This produces one of the strangest engineering environments humans have built: a global machine being modified while it remains in operation.

There is no maintenance window for the internet.

The system must evolve in pieces while old and new implementations coexist.

Standards make that coexistence possible through versioning, negotiation, extensibility and conservative behavior.

They can also make it painful.

IPv6 is the great demonstration.

IPv4's 32-bit address space was never going to be enough for an indefinitely expanding public internet. IPv6 increased addresses from 32 bits to 128 and was designed as IPv4's successor. The first IPv6 specification appeared in the 1990s; the protocol continued to mature, and RFC 8200 made the modern IPv6 specification an Internet Standard in 2017.

The technical answer existed long before the migration finished.

Indeed, “finished” remains the wrong word.

IPv4 and IPv6 have coexisted for decades.

That coexistence is not evidence that the standards community forgot to schedule a flag day. It is evidence that the 1983 kind of flag day no longer scales to a global commercial internet containing billions of devices, organizations with different upgrade cycles, embedded equipment, home routers, enterprise networks, mobile carriers, content providers and software whose maintainers may not even know which assumptions about IP versions they inherited.

The network became too valuable to stop in order to replace its waist.

This is success turning into migration difficulty.

The IPv6 transition accumulated bridges: dual-stack systems that speak both versions, tunnels that carry one protocol through another, translators between address families, and network address translation techniques that stretched IPv4's useful life.

Each bridge solved a local problem.

Together they reduced the urgency of global convergence.

This is a recurring migration paradox.

The better the adapter, the easier it is to postpone replacement.

Network address translation is the clearest example. NAT allowed many devices to share smaller pools of public IPv4 addresses and became deeply embedded in home and enterprise networking. It helped the internet keep growing under address scarcity.

It also changed the architecture.

The original end-to-end ideal assumed that endpoints could often address one another directly through globally meaningful network addresses. NAT inserted stateful translation at boundaries. Applications had to learn traversal techniques. Operators gained useful control and address conservation while some forms of direct reachability became harder.

A workaround for address scarcity became part of the installed internet.

That does not make NAT a mistake in any simple sense. Without transition technologies and address sharing, the practical cost of IPv4 exhaustion could have been much higher. The point is subtler: a gateway introduced to buy time can become infrastructure with constituencies of its own.

Temporary architecture has a habit of applying for tenure.

The IETF eventually made the long-term direction explicit. RFC 6540, published in 2012, said IPv6 support should no longer be treated as optional for new IP-capable implementations. It also recommended dual-stack coexistence during transition while warning that systems should not require IPv4 for proper function.

Notice the shape of the advice.

Support the future.

Coexist with the past.

Do not make the future dependent on the past.

That is migration policy in three lines.

It is much harder to implement across an economy than to write.

An informational IAB document published in 2017, RFC 8170, used IPv6 as one of the examples motivating a broader lesson about protocol transitions: many protocols had not been designed to make replacement or extension easy, and some transitions had consequently been difficult. The document asks future protocol designers to plan not only for adoption but for later transition.

This is the internet learning from itself.

A protocol's successor path is part of the protocol's quality even when the successor has not been imagined yet.

That principle should be engraved above every agent standards meeting.

The question is not only whether MCP, A2A, an authorization profile or a commerce protocol works today.

How does a replacement appear?

Can old and new versions coexist?

Can a gateway translate without changing authority semantics?

Which identifiers survive the transition?

Can an implementation advertise capability without exposing itself to downgrade attacks?

Can an experimental extension be removed before somebody builds a business that treats it as permanent?

The internet's narrow waist teaches us to make the common layer small.

IPv6 teaches us that small does not mean easy to replace.

Any layer on which everyone depends becomes heavy through dependence alone.

This matters when choosing what belongs in an agentic narrow waist. A field that looks harmless today may become a global assumption tomorrow. If the core protocol defines a particular trust model, identity provider shape or notion of agent memory, replacing that notion later may require the equivalent of a dual-stack internet for institutions.

You can survive such a migration.

You would rather not need one.

There is another lesson in IPv6's slow coexistence: standards transitions are rarely binary measures of success.

A network can carry meaningful IPv6 traffic while large parts of the world still depend on IPv4. An enterprise can be IPv6-capable without being IPv6-only. A service can support both. A mobile carrier can use translation internally. Adoption can deepen by layer, geography and use case rather than flip globally.

This is why “has the standard won?” is often the wrong question.

Ask instead which dependency has been removed.

Can a new service operate without the legacy protocol?

Can a user reach the important parts of the network?

Can an operator retire the old path from one segment?

Can a new device be designed without assuming yesterday's constraint?

Migration completes from the edges inward.

Agent standards will likely do the same.

One enterprise may adopt a portable agent identity before it adopts portable payment authority. One industry may standardize audit receipts while retaining proprietary task protocols. One jurisdiction may recognize a credential profile that another rejects. A commerce agent may speak several generations of protocol for years.

The goal is not a universal switchover date.

The goal is steadily reducing the number of critical relationships trapped behind the old seam.

Every extension point is a promise that future systems may rely on. Every undocumented behavior that becomes widespread can harden into a de facto contract. Every middlebox that assumes traffic looks a certain way can make protocol evolution harder. The deployed network accumulates expectations that were never formally standardized but are real because breaking them breaks users.

The installed base writes amendments in invisible ink.

This is why protocol designers care about “ossification.” A layer that becomes too rigid can resist evolution because too many participants depend on current behavior.

The compatibility dividend has become a compatibility debt.

The same network effect that made the protocol valuable makes changing it difficult.

This is not a reason to avoid stable standards. It is a reason to design for extensibility before success removes flexibility.

The internet offers several techniques worth generalizing.

One is layering. Different concerns are separated so change at one layer does not require redesign everywhere.

Another is explicit versioning or capability discovery. Systems can sometimes learn what the other side supports.

Another is ignoring information that an implementation does not need to understand, rather than rejecting every unknown extension.

Another is end-to-end placement of certain functions. Reliability and application semantics can live at endpoints rather than in every intermediary.

Another is maintaining stable identifiers and registries so extensions do not collide.

None of these techniques is universally correct. Together they form a philosophy: preserve a small common core and allow innovation at edges.

This architecture has economic consequences.

A network whose core does not privilege one application lowers the permission cost of invention.

A developer can create a new application without persuading every network operator to redesign infrastructure for the application. The network provides general transport. The new service competes at the edge.

This separation helped make the internet fertile.

It also created political conflicts because network operators, governments and platforms have repeatedly sought control over traffic, applications and access. The architecture does not abolish power. It changes where power can accumulate.

Once basic transport became broadly interoperable, power migrated upward.

Operating systems, browsers, search engines, social platforms, cloud providers, mobile app stores and identity systems became new coordination points. Some of these layers use open standards. Others are controlled more tightly by firms.

Standardization can therefore move bottlenecks rather than eliminate them.

Make one layer open and the scarce control point may appear elsewhere.

Container dimensions became common, but ports and shipping lines could still concentrate. HTTP is open, but distribution through search or app stores can be concentrated. A standard agent protocol could make communication open while identity directories or payment settlement remain proprietary.

Interoperability analysis must follow the whole path.

Where can a participant be excluded?

Where can it switch providers?

Which identifiers are portable?

Which permissions are transferable?

Which layer owns the customer relationship?

Which layer can impose rent without being bypassed?

These are standards questions even when the technical specifications are open.

The internet also teaches the economic value of permissionless complementarity.

When a stable protocol is accessible to anyone, complementary innovation becomes decentralized. Thousands of developers can build services without joining the committee that wrote the protocol. This multiplies experimentation.

A good standard therefore separates participation in use from participation in governance.

Not everyone who sends an HTTP request needs to attend IETF meetings.

Not every company that prints a barcode needs to redesign the symbology.

Not every shipper that uses a container needs to sit on ISO/TC 104.

The governance system handles change. The user ecosystem handles creation.

That division is one source of scale.

The user needs enough confidence that the standard will remain stable.

The maintainer needs enough freedom to repair and extend it.

These goals conflict.

Internet standards processes manage the conflict through published drafts, public discussion, implementation experience, consensus practices and versioned documents. The process is imperfect. It can be slow. Participants have unequal time and resources. Corporate interests are present. Technical communities can become culturally narrow.

Still, the institutional form contains an important idea: infrastructure protocols should be argued about in a place where no single ordinary market participant can simply decree the answer.

That is governance as compatibility insurance.

A neutral-enough process makes other actors more willing to invest because they do not expect a competitor to change the rules unilaterally.

The word “enough” matters.

No standards body is perfectly neutral. People arrive with employers, incentives, technical beliefs and strategic goals. Consensus can privilege those who can afford to participate continuously. Expertise itself creates hierarchy because not every objection is equally informed.

The practical question is whether the process produces standards that independent parties can implement and rely on without surrendering unacceptable control to a rival.

That is a lower and more useful bar than philosophical neutrality.

Internet history contains another warning for the age of AI: openness at the protocol layer does not guarantee safety at the application layer.

The internet was designed to move data among heterogeneous networks. It was not originally designed around today's hostile threat environment. Security mechanisms were added, strengthened and normalized over time. Encryption, authentication and secure naming became increasingly essential as valuable human activity migrated online.

The system became more consequential than its early trust assumptions anticipated.

Agent protocols face a similar risk at higher speed.

The first goal of a new interoperability layer is often “make it connect.” Security and authority can feel like later work. That sequence is dangerous when connection can trigger real-world action.

A web page sending an unexpected string may crash software.

An agent sending an unexpected instruction may spend money, disclose data, deploy code or alter infrastructure.

The action surface is larger.

Agent interoperability therefore needs to treat authorization as architecture, not decoration.

This does not mean every communication protocol must contain a complete legal and security system. Layering still matters. It means the stack must have clear places where identity, permission, integrity and audit are enforced, and implementations must not confuse successful communication with legitimate authority.

The internet distinguished layers partly so applications could evolve.

The agentic internet may need another distinction: between the layer that allows agents to understand each other and the layer that allows them to bind principals to consequences.

Communication is not commitment.

This difference will be easy to blur because large language models are fluent. An agent can say, “I am authorized to purchase 10,000 units.” Another model can understand the sentence perfectly.

Understanding the claim does not make the claim true.

Human institutions solve this by separating assertion from evidence. A person can say they are a doctor. A license provides a credential. A person can say they represent a company. Corporate records, employment systems and delegated authority establish whether they do. A person can promise payment. Banking systems determine whether settlement occurs.

Agent systems need machine-readable versions of these separations.

The internet protocol itself does not solve them, and that is exactly the lesson.

Do not ask one layer to solve every problem.

The network succeeded partly because it remained general.

Agent standards may succeed by preserving a similarly disciplined boundary.

A2A-style protocols can define how agents discover one another, describe capabilities, send tasks and exchange results. Tool protocols can define how models access external capabilities. Identity standards can define entities and credentials. Authorization standards can define limited grants. Payment standards can move value. Audit formats can record actions.

The system may become powerful through composition rather than one comprehensive protocol.

This is less satisfying than announcing “the standard for agents.”

It is also more consistent with how durable infrastructures grow.

Stacks beat monoliths because different layers change at different speeds.

Cryptography may need urgent migration while product identifiers remain stable. Agent task formats may evolve rapidly while payment settlement remains conservative. Legal identity may vary by jurisdiction while network transport stays global.

A single specification tying all of these together would inherit the slowest constraints and the fastest instability at once.

Layering lets governance match the problem.

The internet's narrow waist also creates a remarkable form of competitive neutrality: participants can innovate without asking the core protocol to understand their innovation.

That is what future agent standards should protect.

If a new model architecture, planning technique or memory system requires revision of the interoperability standard, the seam is too invasive. If a merchant has to understand the internals of the buyer's model before accepting a properly authorized payment, the stack has leaked complexity across the boundary.

The goal is not to make all agents interchangeable.

It is to make their relationships legible enough that heterogeneous intelligence can cooperate.

This difference matters economically.

Standardizing agents themselves would commoditize capabilities and likely freeze innovation.

Standardizing selected interfaces can expand the market for capabilities by making them easier to compose.

The internet already proved the pattern.

Ethernet did not need to know YouTube was coming.

IP did not need to know what a browser was.

TCP did not need to understand online banking.

HTTP did not need to know which company would become the largest retailer.

The shared layers did less, and because they did less, the ecosystem could do more.

There is a temptation in every standards effort to solve adjacent problems while everyone is already in the room. Add another field. Add another mandatory behavior. Encode one more policy. The document grows. The implementation burden rises. The constituency narrows.

Sometimes this is necessary.

Often it is how a standard loses its waist.

The best question is not “What else could we standardize?”

It is “What must be common for independent innovation to remain independent?”

That question produces smaller interfaces and larger worlds.

The internet did not abolish incompatible systems.

It gave them somewhere to agree.
