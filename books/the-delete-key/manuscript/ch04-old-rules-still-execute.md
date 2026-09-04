# Old Rules Still Execute

Software engineers have a useful phrase for instructions that continue to run.

They execute.

A line of code can be old, forgotten, badly documented, and still execute perfectly every time the program reaches it.

Institutions have executable code too.

It is written in statutes, regulations, contracts, forms, procedures, procurement manuals, eligibility rules, insurance policies, employee handbooks, building codes, reimbursement schedules, compliance checklists, and the little boxes software requires a person to fill before the Next button becomes clickable.

A rule does not have to be remembered to remain active.

It only has to be embedded somewhere the system still obeys.

This is how the past governs the present without appearing to make a decision.

Imagine a form that asks for a piece of information no current employee can explain. The field may have been added fifteen years ago for a reporting requirement that changed ten years ago. But the form was copied into a new system. The new system made the field mandatory because the old form marked it mandatory. An integration expects the value because the database column is non-null. A downstream report includes the column because the report was rebuilt from the old schema.

Nobody today chose the requirement.

Everyone today enforces it.

The rule has become infrastructure.

This is a deeper form of persistence than a dusty policy manual.

A dusty manual can be ignored.

A required field executes.

A validation rule executes.

An eligibility threshold executes.

A procurement category executes.

A permission boundary executes.

The more institutions digitize, the more their historical choices become executable.

This creates an odd consequence.

Digital transformation can preserve obsolete policy more efficiently than paper ever could.

When a process lived in the heads of experienced clerks, a clerk could sometimes notice that a requirement no longer made sense. Human discretion could be inconsistent and unfair, but it could also absorb change informally.

When the same requirement is encoded in software, consistency improves.

So does stubbornness.

The machine does not become embarrassed by an obsolete rule.

It does not notice that the reason for the field disappeared.

It does not ask why a category created for a technology from 1998 still determines eligibility in 2028.

It executes the specification it was given.

This is one reason modernization can fail to modernize.

An institution replaces an old computer system while preserving every business rule the old system contained because nobody wants the technology project to become a policy project.

That choice is understandable.

Changing software and changing policy simultaneously multiplies risk. The migration team wants behavioral equivalence. Users want the new screen to produce the same outcome as the old screen. Auditors want continuity. Lawyers want assurance that the new system still complies with existing rules.

So the old logic is carefully reconstructed in modern code.

The interface changes.

The institution does not.

A twenty-year-old assumption gets a new API.

This is the institutional equivalent of translating an ancient program into a new programming language without asking whether the program should still exist.

Sometimes that is exactly the right choice. Continuity matters. A benefits system cannot casually reinterpret eligibility during a database migration. A tax system cannot silently change obligations because engineers prefer a cleaner architecture.

But modernization creates a rare moment when the institution is already paying to understand itself.

If no one asks which rules still deserve to execute, the opportunity is lost.

The new system becomes a preservation machine for the old one.

Law has a special relationship with persistence because stability is one of law's virtues.

People arrange their lives around rules. Businesses sign contracts. Families plan. Governments borrow. Property changes hands. Rights become meaningful partly because the rules cannot be rewritten every morning.

A legal system that forgets too easily is arbitrary.

So the deletion argument has to begin with respect for continuity.

The question is not whether old laws are bad.

The question is whether age should substitute for review.

There is a difference between a rule that survives because society continues to endorse its purpose and a rule that survives because nobody has assembled the attention required to examine it.

From the outside, the two can look identical.

Both remain on the books.

This is why regulatory review matters.

Governments have developed mechanisms for looking backward at the stock of existing rules rather than only forward at proposed ones. Sunset clauses are one mechanism. Periodic review is another. Retrospective evaluation asks whether a rule produced the effects expected when it was adopted and whether its costs and benefits have changed.

The existence of these tools is an admission that enactment is not the end of governance.

A rule can be reasonable when created and unreasonable later without anyone having made a mistake.

Technology changes.

Markets change.

Prices change.

Risks change.

Other rules arrive.

The regulated activity may disappear entirely.

A static rule lives in a moving world.

That creates what we might call policy drift.

The text stays still while the environment moves around it.

A threshold fixed in nominal dollars changes meaning under inflation. A category built around one industrial structure becomes strange after consolidation or technological change. A reporting requirement created when information was difficult to obtain may become redundant after another system begins collecting the same data automatically.

The rule is unchanged.

Its effect is not.

This is the same problem software engineers face when an old assumption survives inside a changed system.

The code still runs.

The environment no longer matches the assumptions under which the code was written.

Institutions often respond by adding exceptions.

The original rule remains, but a new rule handles the case it no longer fits.

Then another exception handles a new case.

Then guidance explains the interaction between the original rule and the exceptions.

Then software encodes the guidance.

Then training explains the software.

The institution grows around the obsolete center rather than removing it.

This is how rule systems become baroque.

Complexity is sometimes the fossil record of decisions nobody was willing to repeal.

The same pattern appears inside companies.

A security policy says passwords must change every fixed number of days because that was once conventional guidance. Later security thinking changes, but the requirement remains embedded in identity systems, employee training, audit checklists, vendor questionnaires, and compliance evidence.

Changing the policy is no longer one edit.

It is a migration across every place the old rule learned to execute.

The longer a rule survives, the more copies of its logic can exist.

This is where deletion becomes a graph problem again.

Repealing the statute may not remove the form.

Changing the policy may not change the software.

Deleting the procedure may not change the training deck.

Updating the training deck may not change the vendor contract.

An institution can officially remove a rule while operationally continuing to enforce it.

The delete key has to reach the replicas.

This is familiar in distributed computing. Updating one node does not guarantee that every copy of a state has changed. Systems need propagation, versioning, invalidation, and a way to know when old state has disappeared.

Institutional rules need the same conceptual machinery.

What are the replicas of this rule?

Where is it encoded?

Which forms assume it?

Which software validates it?

Which contracts cite it?

Which metrics were created to report compliance with it?

Which employees were trained to enforce it?

Which external organizations built their own processes around it?

A repeal without a dependency map can be symbolic.

The old rule may keep executing through its descendants.

This is why institutional deletion requires provenance.

A rule should know where it came from.

Not literally, perhaps, but operationally. A field on a form should be traceable to the authority or business reason that requires it. A control should be traceable to a risk. A report should be traceable to a decision or obligation. A software validation should be traceable to a policy.

Without provenance, review becomes archaeology.

Someone asks why the field is mandatory and receives the most dangerous answer in an institution:

Because it always has been.

That sentence means the reason has been severed from the rule.

Once provenance is lost, deletion becomes frightening because nobody knows what invisible protection the rule may provide.

So it stays.

The institution accumulates orphaned instructions.

An orphaned rule is not necessarily useless. It may still protect something important. But its legitimacy now depends on ignorance. We keep it because we cannot reconstruct why it exists.

That is not durable governance.

A better system would attach reasons to rules in ways that survive personnel turnover.

This control mitigates this risk.

This field satisfies this statutory requirement.

This report supports this decision.

This retention period exists because of this obligation.

This exception was created for this class of cases.

Now review has something to test.

Does the risk still exist?

Does the statute still require the field?

Does anyone still make the decision?

Does the obligation still apply?

Does the exceptional class still exist?

The rule can defend itself with its purpose rather than its age.

This would change regulation, but it would also change software design.

Imagine if institutional software treated policy provenance as metadata.

A required field would not merely say `required = true`.

It could say why.

A validation rule could point to the policy version that created it.

A permission could carry the authority under which it was granted.

A workflow step could identify the control objective it satisfies.

Then when the underlying authority changes, systems could identify the descendants that deserve review.

The institution would gain something like dependency-aware repeal.

This is not fantasy in the sense that none of the pieces exist. Configuration management, policy-as-code, identity governance, data lineage, requirements traceability, and regulatory inventories all solve pieces of the problem.

What is missing is the expectation that rules should be born removable.

We still design many institutions as if the difficult part is deciding what to add.

The future is left to discover where the decision propagated.

Artificial intelligence could make this better or much worse.

Models can help inspect large bodies of policy, code, contracts, forms, and documentation for duplicated or conflicting rules. Agents can trace dependencies. They can compare current requirements against historical ones. They can identify references to repealed authorities and propose migrations.

But AI can also make rule creation nearly frictionless.

Every incident can produce ten new controls.

Every manager can generate a new procedure.

Every compliance concern can become a checklist.

Every team can create local policy faster than the organization can reconcile it.

The bureaucratic equivalent of generated code is generated governance.

That may be one of the least appreciated risks of abundant intelligence.

The world could become exquisitely documented and impossible to operate.

Every failure produces a rule.

Every rule produces an exception.

Every exception produces guidance.

Every guidance document produces implementation artifacts.

Nothing is ever removed because generation is easier than adjudication.

The result is not safety.

It is a system whose instructions exceed its capacity to understand them.

A rule system becomes dangerous when no one can know which rules are actually authoritative.

That is why deletion belongs inside governance, not outside it.

Repeal is not vandalism.

Deprecation is not neglect.

Archiving is not forgetting.

A mature institution distinguishes the rules that deserve continuity from the rules that merely inherited it.

And when a rule no longer deserves to execute, the institution must be able to do more than strike a line from a document.

It has to stop the rule everywhere the rule learned to live.