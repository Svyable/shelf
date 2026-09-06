# Chapter 13 — Data Without a Steward

A file can survive perfectly and still be lost.

The bits are present.

The checksum matches.

The storage system reports healthy.

Three copies exist in different locations.

Nobody knows what column F means.

This is the difference between storage and preservation.

Storage keeps an artifact.

Preservation keeps enough meaning that a future person can still use the artifact for an intended purpose.

The distinction becomes more important every year because the world is producing more data than it is producing context.

A research team measures soil moisture for twelve years. The raw files remain on a server after the project ends. A new researcher discovers them and sees dates, station IDs, values, flags, and blank cells.

What does blank mean?

No reading?

Zero?

Sensor offline?

Value removed after quality review?

Not applicable?

The answer may determine whether the dataset supports a scientific conclusion.

The file cannot explain itself.

Somebody knew once.

That is the orphan condition.

Libraries and archives have lived with this problem longer than most software companies. The Library of Congress maintains extensive work on digital formats and sustainability. The National Archives and Records Administration publishes guidance on sustainable formats and digital-preservation risk. These institutions treat file format, metadata, documentation, fixity, storage, accessibility, and migration as parts of a continuing preservation process rather than assuming that copying bits indefinitely keeps information alive.

They have to.

A paper document can remain readable for centuries if the language remains known and the physical object survives. A digital object can be physically perfect and functionally inaccessible because the software, hardware, codec, encryption key, database engine, external service, or documentation required to interpret it has disappeared.

Digital preservation is an active relationship with change.

That is why backups are not archives.

A backup answers a recovery question: can we restore a recent or known state after loss or corruption?

An archive answers a historical question: can we preserve information beyond the operational system that created it?

A backup may depend on the same software, credentials, and architecture as production. An archive should anticipate that production will eventually die.

Confusing the two creates false confidence.

A company says it has retained the records because database backups exist.

Years later, the application is gone, the database version is obsolete, encryption keys were rotated, and nobody remembers the proprietary field encoding.

The bits survived.

The records did not.

The Orphan Age will make this common because machine-generated artifacts can proliferate with almost no friction. Logs, embeddings, transcripts, images, intermediate files, model outputs, synthetic data, telemetry, event streams, drafts, caches, traces, and copies can accumulate faster than humans can classify them.

Storage is cheap enough to postpone decisions.

Meaning is not.

Every retained dataset creates future jobs.

Someone may need to decide whether it remains accurate.

Someone may need to protect it.

Someone may need to delete it under a retention policy.

Someone may need to answer a legal request.

Someone may need to migrate it.

Someone may need to explain its provenance.

Someone may need to know whether consent or usage restrictions still permit the intended use.

Someone may need to interpret a code created by a team that no longer exists.

Data can therefore become a negative asset even when storage cost approaches zero.

The cost migrates from disks to governance.

This is one reason “keep everything” is not a neutral policy.

Retention expands the attack surface. It expands the scope of discovery and compliance. It expands the number of unknown copies. It expands the chance that stale information will be mistaken for current truth. It expands the work required to classify what can be shared, trained on, archived, or deleted.

Cheap storage makes deletion feel wasteful.

Orphan load makes indiscriminate retention expensive.

The paradox is that deletion also needs stewardship.

You cannot responsibly delete what you do not understand.

A folder named `old_final_backup_2` might contain nothing of value.

It might contain the only evidence of a decision.

A table apparently unused by current software might be required for a seven-year retention obligation.

A set of customer records might be legally deletable and operationally dangerous to keep.

The decision requires context.

Context is the scarce resource.

This is why data lineage matters.

Where did the data come from?

What transformations occurred?

Which source systems contributed?

What version of the process produced this field?

What definitions were in effect?

Who approved the change?

Which outputs depend on it?

Lineage turns a value into a history.

Provenance turns an artifact into a claim that can be evaluated.

Without these, data has a dangerous authority because numbers look precise even when their meaning has drifted.

A dashboard displays revenue to two decimal places.

The upstream definition changed six months ago.

The line did not break.

The meaning did.

This is another form of digital decay that storage health cannot detect.

The data remains accessible while the interpretation becomes orphaned.

Scientific disciplines have developed elaborate responses because reproducibility depends on context. Data repositories encourage metadata, codebooks, methods, versioning, persistent identifiers, and documentation. Good practice separates raw observations from derived data and records transformations.

Even then, preservation is hard because science itself changes. A classification scheme can become obsolete. Instrument calibration can be reinterpreted. A sample label can encode assumptions later researchers need to understand.

The archive cannot freeze meaning.

It can preserve enough evidence for future reinterpretation.

That is a more realistic goal.

The same principle should guide corporate data.

Do not attempt to make every dataset eternally self-explanatory.

Preserve the information necessary to assess its fitness later.

What was the purpose?

What was the source?

What was the unit?

What quality controls were applied?

What known limitations existed?

What rights govern use?

Who or what process created it?

When did the definition change?

What is the retention or disposition rule?

These questions create an interpretation surface around the bits.

Machine learning raises the stakes because data can influence systems long after direct human use ends.

A training dataset may be incorporated into model parameters. A historical decision may become an example used for automated classification. A scraped archive may become part of an evaluation set. A label created for one context can become ground truth in another.

The data’s original steward may be gone by the time the downstream effect appears.

This creates what we might call inherited epistemic debt: later systems rely on judgments whose origin and limitations are no longer legible.

The phrase should not become another grand framework. The practical issue is simple.

If a dataset influences a consequential system, someone should be able to explain enough about its origin to evaluate whether the influence remains justified.

That becomes difficult after transformation.

A row in a training file is inspectable.

A learned representation is not a simple database of rows.

The system may preserve statistical influence without preserving an easy path back to individual source meaning.

This makes provenance and documentation more important before training, not less.

The future steward may not be able to reconstruct what the original pipeline discarded.

The principle is familiar from physical waste.

Do the ending work while agency still exists.

For data, do the context work while understanding still exists.

The team that creates a dataset is usually the cheapest source of documentation.

Six years later, recreating the same context can require interviews, forensic code reading, old tickets, email searches, and guesses.

Documentation has a timing advantage.

This does not mean forcing researchers or engineers to write encyclopedias before they can work. Overdocumentation can kill experimentation. The goal is to identify which facts become disproportionately expensive to recover later.

Definitions.

Units.

Provenance.

Known anomalies.

Rights.

Retention.

Transformations.

Ownership.

Enough to keep future interpretation possible.

There is a powerful analogy to food labeling, though data is more complex. A jar tells you ingredients, manufacturer, quantity, and often dates because future consumers were not present when the food was made.

Data needs labels for the same reason.

The future user was not in the room.

The problem becomes especially severe after organizational turnover.

A team creates a data warehouse. Analysts write queries against it. Business definitions live in dashboards and memory. Then the company reorganizes. A new team inherits the warehouse but not the semantic agreements.

They see three fields that all appear to represent “active customer.”

One is based on login activity.

One is based on billing status.

One is based on contract entitlement.

All were legitimate for different purposes.

The field name is not enough.

Data systems become orphaned when the schema survives but the ontology dies.

Ontology is a formal word for the categories and relationships through which a system describes reality. Every practical database has one, even if nobody calls it that.

What counts as a customer?

What counts as closed?

What counts as delivered?

What counts as revenue?

What counts as an incident?

The answers are organizational judgments embedded in columns.

When people leave, the columns remain confidently typed.

This is why data governance cannot be reduced to access control.

Security is essential. Privacy is essential. But a perfectly secure dataset with no steward can still mislead.

A mature data steward has at least three responsibilities.

Protect the data from inappropriate access.

Preserve enough meaning for appropriate use.

End retention when continued possession is no longer justified.

The third responsibility is increasingly important.

Deletion can be technically difficult because data replicates. It appears in backups, caches, analytics systems, extracts, notebooks, logs, machine-learning pipelines, vendor systems, and user devices. One click on “delete customer” may remove the row from the primary application without erasing the broader data shadow.

This is the opposite of the archival problem.

The archive struggles to keep meaning attached to copies.

Privacy engineering struggles to make an ending propagate across copies.

Both are stewardship problems of lineage.

You cannot preserve or delete reliably if you do not know where the thing went.

Abundance makes lineage harder because copying is cheap.

Every export creates another future job.

A CSV sent by email may become a local spreadsheet, then an attachment, then a shared-drive file, then input to another process. The original system can enforce retention. The copies may not know the policy exists.

This is how data becomes organizational litter without anyone choosing litter.

The answer is partly technical: access-controlled platforms, governed pipelines, data catalogs, automated classification, retention enforcement, lineage tools, encryption, deletion workflows, archival formats.

The answer is also cultural.

People need to stop treating a copy as free merely because the copy operation is free.

A copy is a new stewardship boundary.

Someone has to know why it exists.

A copy without purpose is an orphan candidate at birth.

This brings us to the most counterintuitive preservation skill: selective forgetting.

Healthy memory includes loss.

Human brains do not preserve every sensory detail. Organizations should not either. Archives appraise. Records schedules distinguish enduring value from temporary usefulness. Data-retention policies decide that some information should be destroyed after a period.

Forgetting can protect privacy, reduce risk, lower cost, and clarify what remains important.

A civilization capable of infinite cheap copying will need institutions that are trusted to delete.

That is harder than it sounds.

People trust archives to keep.

Trusting a system to destroy requires confidence that the destruction is authorized, complete enough, documented where necessary, and reversible only when policy requires reversibility.

The steward of the future may be valued as much for saying “this can go” as for preserving what cannot.

Data without a steward is dangerous because it has persistence without judgment.

The bits do not know whether they are evidence, clutter, personal information, historical record, training material, trade secret, obsolete export, or the only remaining copy of something important.

They just remain addressable.

Humans created the categories.

Humans or accountable systems have to keep the categories alive.

This gives us another clean boundary for the Orphan Age.

A dataset is not an orphan merely because nobody opened it last month.

It is not an orphan merely because the original analyst left.

It becomes orphaned when the continuing claims—interpretation, security, retention, access, preservation, deletion—no longer have a capable steward.

The file can survive that moment unnoticed.

That is what makes the condition dangerous.

Physical ruins advertise abandonment.

Data can look pristine forever.

The green checkmark beside the backup tells you only that the bits are there.

It cannot tell you whether anyone still knows what they mean.
