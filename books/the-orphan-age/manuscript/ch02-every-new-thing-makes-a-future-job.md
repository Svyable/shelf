# Chapter 2 — Every New Thing Makes a Future Job

A house is full of sleeping jobs.

The jobs do not look like jobs because most of them are not due today.

The roof is a future inspection. The water heater is a future replacement. The gutters are a future cleaning. The smoke detectors are future batteries. The caulk around a window is a future afternoon with a scraper and a tube of sealant. The tree near the power line is a future decision. The mortgage document is a future record request. The password for the thermostat is a future annoyance for somebody who did not install it.

Walk through the house slowly enough and the calendar appears inside the objects.

This is what ownership really looks like.

Buying a thing is not only the transfer of an object. It is the transfer of a sequence of possible future tasks.

Some tasks are predictable. A filter has a replacement interval. A tire has tread. A battery has cycles. Paint has weather. A mechanical seal has wear. A domain registration has a date printed in a database. An insurance policy renews. A tax filing arrives with a deadline.

Other tasks are contingent. The basement floods. A manufacturer ends support. A part becomes unavailable. A neighbor contests a property line. A software update breaks an integration. A branch falls. A pipe freezes. A data breach turns a forgotten account into an urgent problem.

The household survives because most of these jobs are sparse enough to fit into life.

The trouble begins when the number of sleeping jobs grows faster than the capacity to wake up and do them.

People experience this as clutter, deferred maintenance, administrative burden, inbox anxiety, technical debt, or the feeling that everything needs something. Organizations experience the same condition at larger scale. Their roofs are applications. Their gutters are data pipelines. Their smoke-detector batteries are certificates, keys, policies, inspections, patches, tests, renewals, vendor reviews, and licenses.

The objects differ.

The structure does not.

Every new thing makes a future job.

That sentence sounds too absolute until the definition of *thing* is tightened. A disposable paper cup does not require a future owner to polish it. Its future job may instead be collection, sorting, incineration, landfill management, or litter removal. The obligation moves rather than disappears. A stone placed in a field may require nothing for generations. A wildflower can reproduce without a maintenance contract. Nature is full of systems that persist without human stewardship.

Human-made systems are different because they usually carry an intended state.

The bridge is supposed to remain safe.

The account is supposed to remain secure.

The record is supposed to remain retrievable.

The well is supposed not to leak.

The package is supposed not to become a route for malicious code.

The building is supposed not to shed masonry onto the sidewalk.

The company is supposed to continue paying employees and taxes when a founder is unavailable.

The intended state is what creates the job.

If we no longer care what state the thing occupies, the maintenance obligation can vanish. A fence abandoned in a forest becomes material instead of infrastructure. A server unplugged, wiped, and recycled stops demanding patches. A law repealed stops requiring interpretation. A ship dismantled stops needing a mooring.

Ending is therefore one way of paying future work in advance.

We rarely describe it that way because accounting separates construction, operation, maintenance, depreciation, retirement, and disposal into different periods and categories. Engineering separates design from operations. Organizations separate product teams from support teams, capital budgets from operating budgets, project managers from facilities managers, and political announcements from the people who will be asked to fund the thing twenty years later.

Those divisions are useful for managing complexity.

They also hide the continuity of obligation.

A designer can hand a product to operations and psychologically leave the future job behind.

The job does not leave.

It changes hands.

This is why maintenance is so often political. The question is rarely whether physical reality requires care. The argument is over who owes it.

Consider a road.

A new road can be justified with traffic forecasts, construction cost, economic development, safety, travel time, or access. Once built, the pavement begins interacting with water, heat, cold, heavy loads, oxidation, salt, soil movement, vegetation, and time. The road does not care which government built it. It does not care whether the ribbon-cutting official has retired. Its surface responds to load and environment.

Someone will eventually pay to preserve the intended state.

Or the intended state will be lost.

The same logic applies to software, except software makes the physics less obvious. Code does not rust. A bit copied perfectly remains the same bit. But a software system’s environment moves around it. Operating systems change, hardware changes, browser engines change, dependencies change, threat actors change, certificate roots change, user expectations change, laws change, neighboring APIs change.

Software can decay while every byte of its source remains identical.

That is an important form of orphan load because it demonstrates that maintenance is not always repairing damage inside an object. Sometimes maintenance is preserving compatibility between an object and a changing world.

A dictionary provides an old analog. A dictionary printed in 1950 has not become physically false because the paper aged. It has become incomplete because language continued without it. A map can be perfectly preserved and become misleading because the roads moved. A medical protocol can remain legible and become unsafe because evidence improved.

Stewardship is partly the work of keeping claims synchronized with reality.

That work scales poorly when every organization creates more claims than it can revisit.

The problem can be seen in policy. Governments accumulate programs, reporting requirements, tax provisions, permits, standards, grants, databases, forms, advisory committees, websites, procurement rules, and enforcement practices. Each may have been created for a reason. Over time, reasons change at different speeds. Some programs remain vital. Some become redundant. Some interact in ways their designers never anticipated. Some are technically repealed but leave data systems and contractual obligations behind. Some are preserved because nobody wants to accept the political risk of removal.

A rule is cheap to add compared with the lifetime cost of administering, interpreting, auditing, litigating, updating, digitizing, explaining, and eventually retiring it.

The future job can be administrative rather than mechanical.

The most revealing industries are those forced by law or catastrophe to recognize this explicitly.

Hazardous-waste regulation does not treat closure as a philosophical afterthought. U.S. environmental rules require many treatment, storage, and disposal facilities to plan for closure and, where applicable, post-closure care. Financial-assurance mechanisms exist because regulators learned that an operating company’s future promise is not sufficient if the company may later lack money or cease to exist. The obligation has to be given financial form while the operator is still present.

Nuclear power regulation contains a similar insight. Decommissioning is not left entirely to the hope that a future owner will feel responsible. Licensees must provide financial assurance for eventual decommissioning. The exact mechanisms and estimates can be argued over, but the underlying logic is remarkable in its simplicity: the cost of ending belongs inside the economics of beginning.

That principle should feel obvious.

It does not dominate most of the economy.

A great deal of modern creation is financed as if end-of-life cost were either negligible, somebody else’s responsibility, or so distant that it can be discounted into invisibility.

The discount rate is not the only issue. Human attention discounts the future even when spreadsheets do not.

A founder trying to survive the next six months does not naturally spend emotional energy on the company’s controlled dissolution. A city council campaigning on a new park does not win votes by describing the replacement schedule for irrigation pumps in year nineteen. A product manager rewarded for quarterly growth has little reason to design a dignified ten-year shutdown. A homeowner buying an appliance is comparing purchase prices, not the probability that an electronic control board will remain replaceable after the manufacturer moves on.

We do not need bad motives to create orphan load.

We need mismatched time horizons.

Creation and care happen on different clocks.

The person who benefits from creating may not be the person who pays for maintaining.

The person who pays for maintaining may not have authority to redesign.

The person with authority to redesign may be gone before failure arrives.

This is the temporal version of an externality.

Environmental economics made the concept of external cost familiar: an activity can generate costs that are not borne by the party making the decision. Smoke leaves the factory boundary. Runoff enters a river. Noise crosses a property line.

Orphan load often crosses a time boundary instead.

The creator gets the immediate capability. A successor inherits the upkeep. A customer inherits the migration. A government inherits the cleanup. A downstream developer inherits the dependency. A future homeowner inherits the hidden repair. A future archivist inherits the undocumented format.

The externality can be intergenerational without involving centuries.

It can happen between two teams in the same company six months apart.

This is why the word *debt* gets used so often. Technical debt, maintenance debt, infrastructure debt, documentation debt. Debt captures the transfer: value now, obligation later.

But debt is not always the right metaphor.

Debt usually has a creditor, a principal, and terms. The future jobs hidden inside systems are messier. Some are options. Some never come due. Some can be eliminated by retirement. Some become more expensive because knowledge disappears. Some become cheaper because technology improves. Some are not owed to a person at all but to safety, continuity, or the environment.

Orphan load is therefore less like a loan and more like a field of outstanding claims.

The claims remain dormant until conditions activate them.

A forgotten domain is harmless until it expires and someone else can acquire it.

An old dependency is harmless until a vulnerability is discovered.

A derelict boat is scenery until a storm tears it from the mooring.

A neglected retaining wall is stable until water changes the soil.

An old data field is trivia until an audit or court case asks what it meant.

A closed industrial site is quiet until contamination moves.

The future job can wait years before presenting an invoice.

This makes orphan load difficult to budget because budgets like known obligations.

The predictable parts receive schedules. The uncertain parts become reserves, insurance, risk registers, contingency funds, or hope.

The most resilient systems do something more subtle: they reduce the cost of future uncertainty.

They keep parts replaceable.

They keep interfaces documented.

They keep records exportable.

They keep ownership visible.

They keep enough slack that repair is possible before failure cascades.

They keep the decision to retire available.

This last point is easy to underestimate.

A system can become orphaned even while receiving enormous maintenance if nobody retains practical authority to end it.

Imagine an internal application used by five departments. Everyone dislikes it. It is expensive. The original team is gone. Three attempted replacements failed. Nobody knows every report that depends on its database. The application receives patches, backups, server upgrades, security reviews, and support. It is not neglected.

It is trapped.

A trapped system is the opposite of an abandoned one on the surface, but the governance failure is related. Responsibility exists for keeping it alive, but not for deciding its end.

The future job has become permanent.

This is why good stewardship cannot be defined as maintenance alone.

Stewardship has three possible verbs: maintain, transfer, retire.

A living system moves among them.

Maintain when the thing remains useful and the obligations are justified.

Transfer when another steward is better positioned to own the obligations.

Retire when continued ownership creates more cost or risk than value.

The failure mode is not choosing the wrong verb once.

It is losing the ability to choose.

A healthy household knows which broken objects are worth repairing and which should leave. A healthy codebase knows which dependencies should be upgraded, replaced, or removed. A healthy city knows which structures need rehabilitation and which should be redesigned or decommissioned. A healthy organization knows which programs deserve institutional permanence and which should have sunset conditions.

Choice requires information.

This brings us back to the sleeping jobs.

You cannot plan future work you do not know you own.

An inventory is therefore one of the simplest stewardship technologies. Not because lists are profound, but because invisible ownership is the beginning of orphanhood.

Airlines inventory life-limited parts. Utilities inventory poles, transformers, meters, and lines. Libraries inventory collections. Companies inventory laptops. Hospitals inventory equipment. Security teams inventory assets because an unknown server cannot be patched reliably. Archives inventory formats because a file nobody can identify is difficult to preserve.

Inventories become harder as creation becomes decentralized.

A central procurement office can record a purchased machine. It may never see the free cloud account created by an employee, the open-source package copied into a script, the shared spreadsheet that quietly becomes a database, the no-code automation connected to customer records, the model called through an API, or the social account opened for a campaign that ended three years ago.

Cheap creation routes around inventory.

That is part of its appeal.

The challenge is to recover legibility without restoring the bureaucracy that cheap creation escaped.

A twenty-page approval form for every experiment would solve orphan load by preventing useful work. That is not stewardship. It is paralysis wearing a safety vest.

The better response is to make the cost of responsible ownership fall with the cost of creation.

If a new service can be deployed with one command, it should be possible to register its owner, dependencies, data class, recovery method, and expected retirement condition with nearly the same ease.

If a new software package can be added automatically, tooling can track the package automatically.

If an account can be created in seconds, identity systems can make succession and recovery part of the account lifecycle.

If a product is designed digitally before manufacturing, repair information and part identifiers can be generated from the same source data.

If an AI workflow can be cloned, its monitoring and retirement criteria can travel with it.

The answer to abundance is not paperwork proportional to abundance.

It is stewardship infrastructure.

Civilization has done this before.

The fire code is stewardship infrastructure. So are title records, inspection regimes, accounting systems, building permits, version control, maintenance manuals, parts catalogs, escrow accounts, decommissioning trusts, archives, registries, and succession procedures. Each takes a future obligation that could remain informal and gives it a durable place to live.

The Orphan Age needs more of these mechanisms, adapted to a world where creations can be numerous, software-mediated, temporary, composable, and produced by machines as well as people.

The design principle is simple enough to fit on a workshop wall, though it should not stay there.

Every new thing makes a future job.

Before celebrating the thing, ask what job it just created.

Then ask who will still know that job exists when the creator is gone.
