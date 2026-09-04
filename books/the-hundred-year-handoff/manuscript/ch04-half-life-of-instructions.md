# The Half-Life of Instructions

In 1086, people in England wrote down a survey of land, property, obligations, and wealth on animal skin.

Nine hundred years later, the record was still readable.

In 1986, the BBC set out to create a technological descendant worthy of the anniversary.

The new Domesday project was ambitious in exactly the way the late twentieth century liked to be ambitious.

It would not merely contain text.

It would contain maps, photographs, statistics, video, virtual walks, and accounts of ordinary life contributed by people across the United Kingdom. Schools participated. Communities contributed. The material was assembled into an interactive system using laserdiscs and BBC microcomputers.

The project looked like the future.

Less than twenty years later, much of the future had become difficult to read.

The data had not necessarily vanished.

The path to the data had.

The laserdisc format was obsolete.

The required computers were obsolete.

The players were rare.

The software environment had aged out.

Specialist rescue projects had to recover and emulate the system while working hardware still existed.

An International Atomic Energy Agency technical report later used the BBC Domesday project as a case study in digital obsolescence. The comparison was too good to resist: the 1086 parchment remained directly readable centuries later, while the 1986 digital project needed technical rescue within a generation.

This story is often told as proof that paper is safer than computers.

That is the wrong lesson.

Paper burns.

Ink fades.

Film decays.

Magnetic media demagnetize.

Optical media delaminate.

Hard drives fail.

Cloud companies disappear.

Stone erodes.

Libraries flood.

Nothing wins simply by being old-fashioned.

The real lesson is more precise.

**Information has dependencies.**

A sheet of paper has relatively few.

Light.

Vision.

Language.

Some cultural familiarity with how marks on a surface are interpreted.

A digital object can have many more.

A physical carrier.

A reader.

A controller.

A file system.

A format specification.

A decoder.

An operating system.

A software library.

A device driver.

A hardware architecture.

A license server.

A password.

A network service.

A cryptographic key.

A proprietary dependency.

A database schema.

A reference dataset.

A piece of metadata explaining what the values mean.

The bits may be perfect while the chain around them breaks.

That is why instructions have a half-life.

Not because information decays at one fixed rate.

Because every instruction is embedded in a system of assumptions, and those assumptions expire at different speeds.

The words "turn the valve clockwise" may remain intelligible for centuries if the valve is still recognizable.

The instruction "run the migration tool with the legacy compatibility flag" can become meaningless as soon as the tool, flag, documentation site, runtime, and repository disappear.

The difference is not digital versus physical.

It is dependency depth.

A message with few dependencies can survive neglect longer.

A message with many dependencies can be extraordinarily powerful but demands active stewardship.

The BBC Domesday system illustrates the trap because it was designed around a sophisticated interface.

The interface was part of the value.

Users could navigate between media and data in ways a parchment book could never support.

But interface richness created interpretive dependency.

The information was not just stored on a disc.

It was experienced through a stack.

When the stack aged, the content became stranded.

This is the first principle of instruction half-life:

**the more interpretation a carrier delegates to surrounding machinery, the more of that machinery becomes part of the record.**

This point is easy to miss because digital preservation often begins with copying.

Copy the files.

Keep three copies.

Put one off-site.

Use checksums.

Monitor bit integrity.

These are excellent practices.

They solve one layer of the problem.

They make sure the bytes you recover later are the bytes you stored now.

That is not the same thing as making sure the bytes will still be usable.

The Library of Congress makes this distinction explicit in its work on sustainable digital formats. Long-term usability depends on factors such as how openly a format is specified, how widely it is adopted, how transparent it is to inspection, whether it contains useful self-documentation, what external dependencies it has, whether patents constrain implementation, and whether technical protection mechanisms can block future access.

These are not properties of storage alone.

They are properties of recoverability.

A file format survives partly because future people can build another reader.

That requires disclosure.

It survives partly because many tools understand it.

That requires adoption.

It survives partly because the format can be examined without needing a secret implementation.

That requires transparency.

It survives partly because necessary context travels with the object.

That requires self-documentation.

The format's half-life is social as much as technical.

A proprietary format with one vendor can be perfectly engineered and fragile across time.

An ugly format used everywhere can survive because thousands of tools keep it alive.

A standard can outlive the company that popularized it because its meaning is distributed.

This is temporal redundancy again, but in a specific form.

The more independent interpreters a record has, the less it depends on any one institution staying alive.

This is why open specifications matter to future users even when today's user has no intention of switching software.

Today's interoperability is tomorrow's archaeology kit.

The second principle follows:

**preserve the ability to build a new interpreter.**

This is different from preserving the current interpreter.

Sometimes emulation is the right strategy. A future system can recreate the old environment closely enough that the original software still runs.

Sometimes migration is better. Convert the content into a newer format while preserving the properties that matter.

Sometimes both are necessary.

The Library of Congress explicitly treats migration, emulation, and hybrid approaches as long-term preservation strategies.

The National Archives goes further by building format-risk frameworks and preservation action plans across hundreds of file formats. The core idea is that stewardship is not passive custody. Formats must be watched because the environment around them changes.

That is the uncomfortable truth digital abundance hides.

Digital storage feels permanent because copying is cheap.

But cheap copying can preserve obsolete dependency perfectly.

A million flawless copies of an unreadable format are a million unreadable formats.

A distributed backup of encrypted data with a lost key is distributed loss.

A meticulously preserved database without the codebook is a warehouse of unexplained numbers.

A container image can preserve software and still depend on CPU behavior, external services, credentials, kernels, certificates, or network assumptions that later fail.

Preservation has to know what the object needs in order to become meaningful again.

This gives us a useful ladder.

At the bottom are the **bits**.

Can future people recover the exact stored sequence?

Above that is the **format**.

Can they determine how the bits are structured?

Above that is the **software behavior**.

Can they render, execute, query, or otherwise interpret the structure?

Above that is the **environment**.

Can the software function in a recreated or migrated technical context?

Above that is the **semantics**.

Do they know what the fields, units, categories, identifiers, and assumptions mean?

Above that is the **provenance**.

Do they know where the information came from and why it should be trusted?

Above that is the **rationale**.

Do they know why the system was built this way and which properties mattered enough to preserve?

A handoff can succeed at the lower layers and fail at the higher ones.

The bits are perfect.

The format is known.

The program runs.

The values appear.

No one remembers that column seven changed units halfway through the project.

That is not preservation.

It is successful recovery of an ambiguity.

This is why the National Archives preservation framework uses the idea of significant properties when planning format migration. A migration cannot preserve everything perfectly. Something will change: compression, rendering, metadata representation, software behavior, timing, appearance, interactivity, or structure.

The steward therefore has to decide what properties matter.

That decision is a handoff decision.

What are we trying to transmit?

A photograph's pixel dimensions?

Its visual appearance?

Its embedded metadata?

Its color profile?

Its editing history?

Its legal authenticity?

A simulation's source code?

Its exact numerical behavior on old hardware?

Its inputs and outputs?

Its scientific conclusion?

The ability to rerun it?

A database's rows?

Its schema?

Its constraints?

Its query behavior?

The business meaning attached to the fields?

There is no universal answer because information is not valuable in one universal way.

The future use is partly unknown.

This uncertainty creates the temptation to save everything.

Save the original bits.

Save the software.

Save screenshots.

Save virtual machines.

Save source code.

Save documentation.

Save logs.

Save emails.

Save every dependency.

At some point preservation becomes hoarding.

The archive grows faster than the ability to interpret it.

The successor inherits data without hierarchy.

That is another way the handoff fails.

A pile can be durable and useless.

The BBC Domesday project became rescuable partly because enough components survived and enough people cared to do the reconstruction.

That second condition matters.

Technical recoverability is not the same as practical recoverability.

If reading a dataset requires a year of specialist work, a rare machine, reverse engineering, and a grant, many datasets will not be rescued.

They will be theoretically recoverable and socially dead.

This is where the half-life metaphor becomes economic.

The information has not disappeared.

The cost of interpretation has risen above the value anyone is willing to pay.

That is effective loss.

The future user has a budget.

A preservation strategy that assumes unlimited archaeological effort is not a strategy.

This is the third principle:

**a durable handoff keeps the cost of interpretation low enough that somebody will actually pay it.**

Standards help because common knowledge lowers interpretation cost.

Documentation helps because explanation lowers discovery cost.

Open-source readers help because executability does not depend on a vanished vendor.

Migration helps because current tools remain available.

Emulation helps because behavior can be recreated without rewriting everything.

Metadata helps because meaning travels with the record.

Simple export formats help because a successor can choose another tool.

None of these guarantees permanence.

They flatten the cost curve.

The goal is not to make interpretation free forever.

It is to avoid a cliff.

Cliffs are common in digital systems.

A certificate expires.

A license server shuts down.

A cloud API is retired.

A mobile operating system drops support for an architecture.

A package disappears.

A database version reaches end of life.

A vendor changes file formats.

A password manager account belongs to an employee who leaves.

A security key is lost.

A domain expires.

One day the system works.

The next day the information is still there and the normal route to it is not.

This is the difference between physical decay and dependency decay.

Physical decay often gives warning.

Rust spreads.

Paper yellows.

A crack grows.

Dependency decay can be discontinuous.

The external service exists until it does not.

The interpreter is installable until the repository disappears.

The authentication flow works until a certificate or identity provider changes.

A future-oriented system therefore has to inventory not only what it stores but what it assumes.

Assumptions are the hidden files of every archive.

The BBC Domesday project assumed a technical ecosystem that felt reasonable in 1986.

The problem was not stupidity.

The problem was that state-of-the-art systems tend to feel like infrastructure when they are merely products in a fast-moving market.

The most dangerous sentence in technological preservation may be:

"Everybody uses this."

Everybody uses this **now**.

Time turns ubiquity into archaeology with surprising speed.

The reverse can happen too.

A format survives because it becomes so widespread that replacing it is more expensive than supporting it.

Old protocols accumulate interpreters.

Text encodings become standards.

A simple file format becomes infrastructure.

This is why the Library of Congress includes adoption among sustainability factors. Popularity is not merely market success. It creates a distributed preservation community, often accidentally.

The fourth principle is therefore slightly paradoxical:

**future readability is often improved by present interoperability.**

A system that can export its state in documented, widely understood forms has more possible successors.

A system that can only explain itself through one proprietary application has one succession path.

The first is a handoff.

The second is a hostage arrangement.

This does not mean every product must expose every internal detail.

Security matters.

Privacy matters.

Intellectual property matters.

Complexity matters.

Some systems are safer precisely because not every state is casually modifiable.

But long-lived systems need a credible answer to a simple question:

What happens if the current interpreter disappears?

If the answer is "then the record disappears too," the record is not as durable as it looks.

The Domesday rescue also gives us a final, more hopeful lesson.

The system nearly became inaccessible.

It was not necessarily lost forever.

People found working equipment.

They recovered data.

They emulated old behavior.

They migrated material.

They recreated access in newer environments.

The handoff was repaired.

That matters because no preservation plan survives reality perfectly.

Files will be neglected.

Institutions will miss migrations.

Systems will be orphaned.

Metadata will be incomplete.

A future steward will eventually face an object whose intended access path has broken.

The question then becomes whether the artifact left enough evidence to support reconstruction.

This is the same principle we saw in Cologne Cathedral.

Recoverability matters because continuity will sometimes fail.

A cathedral can survive a three-hundred-year pause if enough structure, plans, meaning, and motivation remain.

A digital archive can survive an obsolete interface if enough bits, specifications, hardware, code, metadata, and expertise remain.

Different artifacts.

Same handoff problem.

The strongest systems preserve more than one route back in.

That is why future usability guidance recommends multiple copies, different storage locations, sustainable formats, migration, metadata, and systems that permit export.

It is not redundancy for redundancy's sake.

It is recognition that the normal route will eventually stop being normal.

Every instruction has a half-life.

The unit may be centuries.

It may be five years.

The half-life is longer when meaning is distributed, dependencies are visible, specifications are open, context travels with the artifact, and successors are allowed to migrate the form while preserving the properties that matter.

The half-life is shorter when interpretation depends on one device, one person, one vendor, one key, one undocumented schema, one proprietary service, or one assumption nobody realized was part of the record.

This changes how we should think about preservation.

The goal is not to prevent change.

The environment will change anyway.

The goal is to change the record's form without accidentally changing its meaning.

That is a living process.

A digital object that lasts a century will probably not sit untouched for a century.

It will be copied.

Checked.

Migrated.

Reindexed.

Repackaged.

Emulated.

Described again.

Moved across storage systems.

Placed under new access controls.

Maybe translated into formats its creator could not imagine.

The object lasts by moving.

This is the opposite of the museum instinct to equate authenticity with immobility.

For digital information, immobility can be fatal.

A file frozen perfectly in 1986 may become less accessible every year.

A file repeatedly transformed with preserved provenance may remain usable.

Continuity again turns out not to be sameness.

The medieval Domesday Book survived largely because its basic interpretive dependency stack remained shallow.

The BBC Domesday project required active rescue because its stack was deep and aging quickly.

Neither story proves one medium superior for all time.

Together they show what a handoff has to preserve.

Not the object alone.

The path from object to meaning.

That path is part of the inheritance.
