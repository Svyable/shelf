# The Same Change at Two Speeds

At 04:09 UTC on July 19, 2024, CrowdStrike released a content configuration update for its Falcon security software on Windows. The company did this routinely. Security products are expected to change quickly because the things they defend against change quickly. A detection system that waits for a quarterly release cycle before responding to a new technique is not much of a detection system.

This particular update contained a defect.

By 05:27 UTC, CrowdStrike had reverted it.

Seventy-eight minutes is not a long time in most institutions. A city council meeting can spend longer debating a zoning variance. A hospital shift can still be settling into its morning work. A procurement request may not have reached the second approver. A lawyer may not have finished reading the first version of a contract.

But software distribution has a different clock.

During that short window, affected Windows machines around the world received the update and crashed. Microsoft later estimated that about 8.5 million Windows devices were affected. The number represented less than one percent of Windows machines, yet the machines were not randomly distributed. They sat inside airlines, hospitals, banks, broadcasters, retailers, governments, and other organizations whose failures are visible because other systems depend on them.

CrowdStrike found the defect and stopped distributing it quickly. The problem was that stopping distribution was not the same thing as undoing what had already happened.

Some recovery could be automated or accelerated. Some required people to intervene with individual machines, credentials, recovery environments, and procedures. The bad change had traveled at network speed. Repair often had to travel at human and operational speed.

That difference is the beginning of this book.

The outage has been analyzed as a software-quality problem, a cybersecurity-industry problem, a concentration problem, a resilience problem, and a warning about tightly coupled digital infrastructure. Those interpretations are not wrong. CrowdStrike's own post-incident work focused on validation, testing, and rollout improvements. Microsoft emphasized the interconnected nature of the technology ecosystem. The point here is narrower.

A system that can change millions of endpoints in minutes needs a recovery system designed for the same scale, or it needs a rollout architecture that prevents one error from reaching that scale before feedback arrives.

The change and the correction do not have to be equally fast. They do have to be compatible.

We tend to think about change as an amount.

Revenue grew ten percent. A model became twenty percent more accurate on some benchmark. A city added fifty thousand residents. A profession lost a third of its routine tasks. A company replaced one software system with another. A country moved a larger share of electricity generation from one source to another. A child entered school. A family moved. A regulation changed. An interest rate rose.

Those descriptions tell us what changed. They do not tell us enough about the experience of changing.

Imagine a town that gains twenty thousand residents over twenty years. Streets get busier. Schools add classrooms. Grocery stores open. Builders learn which neighborhoods are in demand. Employers recruit. Water planners update forecasts. Residents complain about traffic, then adjust routes. Politics changes. The town may handle the growth well or badly, but the consequences emerge through hundreds of decisions distributed across time.

Now imagine the same twenty thousand people arrive in six weeks.

Nothing about the final population is different. Almost everything about the transition is.

The water system cannot instantly add capacity because the need is mathematically obvious. Housing cannot appear because the market has received a clear signal. Teachers cannot be hired and trained at the speed a school enrollment file changes. Roads cannot be widened on demand. Permits, contractors, financing, materials, designs, and public arguments all have their own schedules. The same end state can be ordinary at one pace and a crisis at another.

The distinction sounds almost embarrassingly simple once stated. Of course timing matters.

Yet many discussions of technological and social change throw timing away precisely when it becomes most important. We compare before and after. We ask how many jobs a technology might affect, how much output it might add, how many devices it might reach, how much carbon it might remove, how many transactions it might automate. We debate magnitude while treating the interval as scenery.

But an interval is not scenery to the people and institutions living inside it.

A worker whose job changes over fifteen years can retire, specialize, move, retrain, become a manager, or watch a new generation enter with different skills. The same task change over fifteen months creates a different labor-market event. A bank whose customers gradually adopt a new payment method can migrate systems, update fraud controls, retrain staff, and observe new failure modes. The same adoption over one holiday season can force improvisation.

A technology that reaches one million people in ten years meets institutions that have ten annual budgets, ten legislative sessions, ten school years, ten hiring cycles, and thousands of newspaper deadlines in which to respond. A technology that reaches one million people in ten weeks arrives before some of the relevant institutions have completed the meeting in which they decide who owns the problem.

The interval is part of the cause.

This is not the same as saying faster is worse.

Sometimes speed is the mercy.

A vaccine platform that can be adapted quickly to a pathogen can save lives. A bank that can freeze a fraudulent transfer in seconds is better than one that needs a committee. A power grid that detects instability quickly can prevent a local disturbance from cascading. A software team that can ship a small fix today may be safer than a team that accumulates six months of changes into one enormous release. A doctor who receives a critical lab result immediately is in a better position than one who receives it next week.

The relevant question is not whether the action is fast. It is whether the loop around the action is fast enough.

Fast sensing with slow response can be frustrating but useful. Slow sensing with fast response is dangerous because confidence outruns information. Fast action with slow feedback can create a series of moves whose consequences have not yet arrived. Fast action with fast feedback and cheap reversibility can be extraordinarily adaptive.

The words begin to matter.

Speed is how quickly something is moving now. Pace is the pattern of movement through time. Cadence is the rhythm of repeated action. Delay is the interval between cause and visible consequence. Recovery time is how long it takes to return to a workable state. Acceleration is a change in the rate of change itself.

We often collapse all of them into fast.

A company can make decisions quickly but change direction only twice a year. Another can take three weeks to approve each decision but keep dozens of transitions underway at once. A third can deploy software fifty times a day while leaving its organizational structure stable for years. A fourth can reorganize quarterly while its core technical systems barely move.

Which one has the fastest pace of change?

The question cannot be answered without specifying what is changing.

That is why broad claims about an unprecedented pace of change deserve suspicion. History contains periods in which daily life was remade brutally fast. A person born before widespread electrification might live to see cars, telephones, radio, commercial aviation, antibiotics, television, nuclear weapons, and early computing. Industrialization pulled populations into cities, transformed family economies, altered work, changed landscapes, and reorganized time around factories and transport. Wars and revolutions have compressed institutional change into months. Epidemics have transformed behavior in days.

Danny Dorling has argued that we often overstate the novelty of present-day acceleration because we remember the past as a stable background rather than as a lived transition. He is right to puncture the easy line that nobody has ever faced change like ours.

That correction makes pace more important, not less.

If the present is not uniquely fast in every dimension, then “everything is accelerating” cannot be the explanation for why some systems feel increasingly brittle. We have to ask which things are changing, on what clocks, and what depends on them.

The answer is uneven.

Software distribution can be nearly instantaneous. Building transmission lines is not. Financial markets can reprice an asset in seconds. A factory takes time to design, permit, finance, construct, hire, and operate. A viral video can create a political issue before the organization at the center of it has established what happened. An insurance policy may still be written around categories created decades earlier. A new model capability can appear inside a product release while a university curriculum moves through committees on an academic-year calendar.

This is not a single acceleration. It is a widening range of possible tempos.

That difference matters because connected systems inherit one another's timing problems.

Consider a restaurant kitchen.

The grill, fryer, prep station, servers, tables, ordering system, and dish pit all have different capacities. A kitchen does not become excellent by making the grill infinitely fast. If steaks finish before servers can deliver them, speed produces cold food. If orders enter faster than cooks can sequence them, the printer becomes a machine for manufacturing panic. If the dishwasher becomes the bottleneck, clean plates rather than cooking skill set the restaurant's throughput. A competent kitchen works by rhythm. The parts do not move at the same speed, but their speeds are coordinated around the meal.

Modern institutions are larger kitchens with worse visibility.

The digital parts can accelerate dramatically. The physical, legal, educational, and biological parts may not. When leaders see the digital acceleration, they often demand that everything else “keep up,” as though the only obstacle were reluctance.

Sometimes it is reluctance. Sometimes the slow system is protecting an actual dependency.

A clinical trial takes time because some effects take time to observe. A criminal appeal takes time in part because liberty is difficult to restore after an erroneous punishment. A bridge inspection takes time because steel and concrete do not reveal their condition through a software dashboard alone. A new employee takes time to learn because competence includes patterns that only become visible after repeated exposure.

Other slowness has no such defense.

A permit may take eighteen months because five agencies ask for overlapping information and nobody has authority to resolve disagreement. A hospital may retain a clearly inferior administrative process because changing it requires committee approval that is scheduled quarterly. A school may teach a software workflow that employers abandoned three years ago. A regulator may request static documentation for a system that changes every week and learn very little from the pile.

The point is not to admire or condemn either speed.

The point is to identify the relationship.

A useful pace is always pace for something.

The same organization can need faster incident response and slower strategic reorganization. It can need faster customer feedback and slower promotion decisions. It can need faster experiments and slower irreversible capital commitments. It can need a daily operating cadence, a quarterly resource cadence, and a five-year infrastructure horizon.

This is why change-management slogans age badly. “Move fast” is sometimes right. “Slow down” is sometimes right. “Be agile” is too vague to settle the dispute. The decision depends on what must be learned before the next move, what can be reversed afterward, what else has to move with it, and what happens if the system is wrong.

The deeper error is treating speed as a property of an organization rather than a property of a loop.

A loop begins with the world.

Something happens. A customer changes behavior. A machine warms. A competitor cuts a price. A law passes. A pathogen mutates. A model improves. A shipment is late. A teacher notices that students are using a new tool. A nurse sees an unfamiliar pattern. A family discovers that commuting five days a week no longer makes sense.

The system must sense the change.

Then it must interpret it. This takes longer than noticing. A dashboard can show a number immediately and still leave the organization arguing for weeks about what the number means.

Then somebody must decide.

Then the system must act.

Then consequences begin.

Some arrive immediately. Others arrive next quarter, next election, next maintenance cycle, next hiring class, next school year, or next generation.

Then the system has to observe those consequences and decide whether the original interpretation was right.

If another major change arrives before that loop closes, the system is no longer adapting to one thing. It is adapting to a moving mixture of unresolved causes.

This is where pace becomes epistemic.

It changes not only what we can do but what we can know about what we did.

Suppose a company changes its pricing, sales incentives, product packaging, marketing message, and target customer in the same month. Revenue rises. Which change worked?

The answer may be impossible to recover.

Suppose the company celebrates and changes all five again.

It is moving quickly. It may also be destroying its ability to learn.

This is not an argument for controlled experiments everywhere. Real organizations rarely enjoy laboratory conditions. Markets move. Competitors act. People talk to one another. Effects interact. But even in messy systems, there is a difference between unavoidable ambiguity and self-inflicted ambiguity.

Pace can create the latter.

The same problem appears in public policy. Governments often face legitimate pressure to respond quickly to visible harm. A rule changes. Before implementation is complete, political leadership changes. A second rule reverses part of the first. Courts intervene. Agencies issue guidance. Firms adapt to the guidance. A later administration changes enforcement priorities. Researchers attempting to evaluate the original intervention confront a landscape in which the treatment never remained stable long enough to observe cleanly.

The policy may have been good or bad. The pace of revision makes the evidence harder to interpret.

People experience this as whiplash.

Whiplash is a useful word because it describes a rate relationship rather than a destination. A head moving ten inches slowly is ordinary. The same motion in a collision can cause injury because acceleration transfers force faster than tissues can accommodate it.

Organizations have their own versions of tissue.

Procedures. Roles. Skills. Expectations. Contracts. Habits. Trust. Maintenance schedules. Informal relationships. Mental models.

These things can change. Most are not sacred. But they have response times.

When change arrives inside that response time, the next change does not begin from a stable new state. It begins while the system is still carrying the last transition.

That is one reason repeated reorganizations often feel heavier than their diagrams suggest. On paper, a reporting line moves from one box to another. In practice, people are rebuilding knowledge about who decides, whose judgment matters, what a request means, which meeting is real, where hidden expertise sits, how conflict gets resolved, and whether a promise made under the old structure still holds.

The org chart changes instantly.

The organization does not.

This gap appears everywhere once you look for it.

A product launches. Support knowledge trails behind.

A regulation passes. Enforcement capacity trails behind.

A school adopts a curriculum. Teacher fluency trails behind.

A company buys software. Process redesign trails behind.

A city approves housing. Utility connections trail behind.

A hospital installs a device. Clinical routines trail behind.

A family moves. Social networks trail behind.

A country opens a market. Institutions for monitoring abuse trail behind.

The first state change is visible because it has a date.

The second is often diffuse because adaptation does not have a launch day.

This creates a political bias toward the visible clock.

Leaders can announce deployment. They cannot announce comprehension with the same confidence. A board can approve a transformation. It cannot vote expertise into existence. A legislature can create an office. It cannot create institutional memory on the signing date. A company can license an AI tool for every employee on Monday. It cannot know on Friday what the tool has done to judgment, workflow, supervision, security, incentives, and career formation.

The missing time is easy to treat as resistance.

Some of it is.

Some people resist change because the old system benefits them. Some institutions are slow because slowness protects power. Some professional rituals have outlived the risks that created them. Some review processes are elaborate forms of nobody wanting to sign their name.

But calling every lag resistance is intellectually lazy. It prevents us from distinguishing a bottleneck from a brake, and a brake from a seat belt.

A bottleneck limits throughput and may need redesign.

A brake lets a system choose when not to convert potential speed into motion.

A seat belt matters only when the motion becomes violent.

They are not the same object.

The rest of this book is an attempt to tell them apart.

It begins by treating time as part of the architecture rather than as the empty space between decisions. Every consequential system has clocks. Some are imposed by physics. Some by biology. Some by law. Some by markets. Some by technology. Some by habit. Some by politics. Some by design.

Those clocks do not need to agree.

They need to fit.

CrowdStrike's defective update was live for seventy-eight minutes. The incident did not become globally consequential because seventy-eight is a cursed number, or because fast software is inherently unsafe. It became consequential because an error could propagate across a large connected population much faster than many affected systems could recover.

Change went out as a broadcast.

Repair came back as a queue.

The same event at two speeds.

That is the pattern worth learning to see.
