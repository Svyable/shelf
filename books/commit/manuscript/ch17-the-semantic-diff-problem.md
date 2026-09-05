# The Semantic Diff Problem

A diff is a remarkable lie that works because everyone knows what kind of lie it is.

Delete these lines. Add those lines. Keep the rest.

That representation has carried an extraordinary amount of software collaboration because source code is text and programmers are good at reconstructing meaning from textual change. A patch can cross an email, survive decades, apply without a graphical interface, and remain understandable with simple tools. Git's line-oriented diff is not an embarrassment waiting for a smarter era. It is one of the reasons Git travels so well.

But lines are not meaning.

Move a function from one file to another and a textual diff may show a deletion plus an addition. Rename a variable across a repository and the patch can become enormous even when behavior is intended to remain unchanged. Change a database schema by one line and the operational consequence may be larger than a thousand-line refactor. Update a generated lockfile and the visible diff may dwarf the human-authored dependency decision that caused it.

Developers have always known this.

Machine authorship makes the mismatch more expensive.

When proposals arrive slowly, a reviewer can spend time rebuilding context. Open the changed files. Search for references. Follow a type definition. Run tests. Inspect the schema. Ask the author why the change was structured this way. The textual patch is the doorway rather than the whole room.

When proposals become abundant, the cost of repeatedly reconstructing meaning becomes a bottleneck.

The obvious answer is a semantic diff.

The phrase is less obvious than it sounds.

What semantics should the diff represent?

For a programming language, it might identify renamed symbols, moved functions, changed call graphs, altered types, or modified control flow. For a database migration, semantics may mean tables, columns, constraints, and compatibility. For an API, it may mean request and response shapes. For infrastructure configuration, it may mean resources created, destroyed, or exposed. For a notebook, it may mean code cells, outputs, execution order, and data dependencies. For a dependency lockfile, it may mean the package graph rather than the textual serialization.

There is no universal semantic layer because repositories contain many kinds of meaning.

That is the first reason Git itself should probably remain ignorant.

Git can compare blobs without knowing whether they contain C, Rust, JSON, SQL, a PNG, or a model checkpoint. That ignorance is a strength. It lets the object model survive changes in language and tooling.

Semantic review belongs above the object database.

The pattern already exists on hosting platforms. GitHub's code-navigation features extract definitions and references for supported languages and let a reader move between symbols rather than treating a repository as undifferentiated text. The underlying Git objects remain ordinary blobs and trees. A derived index supplies another view.

That separation is promising because semantic analysis is fallible.

A parser can misunderstand generated or incomplete code. A language server can lag a new syntax feature. Dynamic dispatch can hide relationships static analysis cannot prove. Reflection, macros, build-time generation, configuration, and runtime loading all make program meaning resistant to a single authoritative graph.

If semantic interpretation becomes the repository's source of truth, its errors become dangerous.

If it remains a derived review aid, its errors can be challenged against the underlying text and behavior.

This is the same architectural move Git has made repeatedly: preserve a simple durable core and add accelerators or interpretations around it.

A commit-graph accelerates ancestry questions without replacing commits. A multi-pack index accelerates object lookup without redefining objects. A forge adds pull requests without changing branch semantics. Semantic indexes can add program structure without changing what Git stores.

The harder problem is presentation.

A reviewer does not need every possible interpretation of a patch. More information can make review worse.

Imagine a modest refactor. The textual diff shows 600 changed lines because a class moved files and several imports changed. A semantic layer can reduce that to: one class moved, two methods renamed, no callers outside the module changed, public interface unchanged.

That summary is useful if it is correct.

Now imagine the same tool suppresses the 600 lines and misses a small change in a default argument that alters behavior.

Compression has hidden the bug.

Semantic diff therefore needs an escape hatch back to text.

The reviewer should be able to move between representations rather than accept one as canonical. Show the likely move. Show the symbol change. Show the raw patch. Show the tests that exercise the affected behavior. Each view answers a different question.

This matters especially for machine-generated changes because machines are good at producing transformations that look systematic.

A repository-wide migration can touch hundreds of files with a regular pattern. A human reviewer may reasonably want to inspect the transformation rule, verify representative samples, and then search for exceptions rather than read every repeated line. A textual interface that demands equal attention to every hunk wastes the reviewer.

But a semantic interface that says mechanical migration without proving the regularity merely moves the trust problem.

The system needs evidence for the compression.

For example: 487 call sites changed from one API to another according to the same syntactic rule; three sites required custom edits; public type signatures changed in two modules; tests cover the old and new behavior. The exact report will vary by language and tool, but the principle is general.

Summaries should expose exceptions.

Humans are often better at reviewing the weird five percent than the repetitive ninety-five percent. Machine authorship increases the value of finding that five percent quickly.

Renames show why Git's own heuristics are both useful and limited.

Git does not store a permanent file identity saying this file was renamed. A tree records paths and object identities. Diff machinery can infer similarity between deleted and added content and present the result as a rename when the heuristic crosses a threshold.

That is already a kind of semantic interpretation.

It is deliberately modest.

Git says, in effect, these contents look sufficiently similar that presenting them as a move may help. It does not claim metaphysical knowledge that one file is the same entity across time.

Future semantic diff systems would benefit from the same humility.

This function appears to have moved. This symbol appears to have been renamed. This API surface appears unchanged. These tests appear to cover the altered behavior.

The word appears is doing real work.

A useful review system can be confident without pretending its model of the program is the program.

There is another dimension of semantics that static code structure misses entirely: intent.

Suppose a patch changes a timeout from thirty seconds to five. The syntax is trivial. The behavior is easy to state. The meaning depends on why.

Was the old timeout masking a hung service? Is five seconds a product requirement? Does another client still assume thirty? Was the task to reduce resource use or improve perceived latency? Is the value part of a protocol contract?

No abstract syntax tree answers those questions.

Intent comes from the task, design discussion, incident, benchmark, or human decision that caused the change.

Agent workflows make this context easier to capture because the agent begins with explicit instructions. The tragedy would be to throw those instructions away and then ask a reviewer to infer them from the patch.

A semantic review layer should therefore connect code structure to task intent.

Not by asking a model to generate a cheerful paragraph about what the patch does. Generated summaries can be useful, but they are another interpretation and can omit the inconvenient part. The stronger design links claims to evidence.

The task asked to eliminate a deprecated endpoint. Here are the remaining references.

The task asked to preserve the public API. Here is the detected API surface before and after.

The task asked to reduce a query count. Here is the benchmark or trace used to support that claim.

This turns review from reading a story into checking propositions.

Some propositions can be automated. Some cannot.

A security-sensitive authorization change may require a person who understands the threat model. A user-interface change may require judgment about behavior no static analyzer can capture. A distributed-system change may depend on failure modes that tests only approximate. Semantic tooling should route those questions, not erase them.

The line diff remains valuable because it is universal evidence.

Even when a reviewer starts from a higher-level summary, the raw patch is the durable representation that can be stored, transmitted, applied, and inspected without trusting the semantic service. That fallback matters over long time horizons.

Today's language-aware index may not exist in fifteen years. The commit probably will.

This durability argument is easy to underestimate during periods of rapid tooling improvement. A rich review interface can feel obviously superior to text. Then the service changes, the index is rebuilt differently, the proprietary metadata disappears, or the language evolves. Git's boring blobs remain.

The future should add views without making history depend on them.

Generated files provide a useful test case.

Many repositories commit generated artifacts because downstream consumers need them, builds must remain reproducible under certain constraints, or deployment systems expect them. A small source change can regenerate thousands of lines. Reviewers often want to know whether the generated output is exactly what the generator should produce, not inspect every changed line.

The semantic question is provenance.

Which source inputs produced this output? Which generator version ran? Is the committed artifact reproducible? Does regeneration from the proposed source produce the same blob?

A textual diff is the wrong primary interface for that question.

Git still has the right storage primitive: the output blob has an identity and can be compared exactly.

Notebooks pose another problem. Their serialized form can mix source, outputs, metadata, execution counts, and large embedded values. A line diff can be dominated by incidental changes. Specialized viewers can show cells and outputs separately while preserving the underlying file in Git.

Binary assets push the separation further. There may be no meaningful line diff at all. Review requires image comparison, metadata, model evaluation, schema-aware inspection, or some domain-specific test.

The repository has always been more heterogeneous than the patch interface admits.

Agents make the heterogeneity visible because they can change all of it in one task.

A machine asked to update an API may edit source, regenerate clients, modify a schema, update documentation, and change tests. The pull request is one proposed history but contains several semantic domains. A good review system should not force them through one lens.

This suggests that the future review object may be less like one diff and more like a bundle of claims and views attached to a commit range.

Raw textual changes remain at the bottom.

Above them sit structural changes: symbols, types, dependencies, schemas, resources.

Above those sit behavioral evidence: tests, benchmarks, traces, compatibility checks.

Alongside them sits intent: issue, task, design constraint, security requirement.

And around all of it sits provenance: who or what produced the proposal, from which base, under which permissions, with which tools.

That sounds elaborate because software review is elaborate. The line diff compressed the complexity for a world in which a human author could answer questions synchronously and proposal volume was limited.

When authorship becomes asynchronous and abundant, more of the missing context has to become explicit.

The risk is building a cockpit nobody can operate.

Review tooling should therefore be selective. A documentation typo does not need a call graph. A dependency update may need package provenance more than symbol analysis. A database migration needs schema and rollout information. A machine-generated refactor needs regularity and exception detection.

The system should choose views based on the change rather than display every possible dashboard.

That selection can itself be wrong, so the raw repository must remain available underneath.

This is why the semantic diff problem is not an argument against Git.

It is evidence that Git's abstraction boundary was unexpectedly good.

Git records states and ancestry without claiming to understand their meaning. That leaves room for meaning to evolve with languages, tools, and organizations.

The next major version of Git is likely to change much less dramatically than the review systems growing around it.

That is not because Git is finished.

The project is preparing deliberate breaking changes: a new default hash for new repositories, a stronger stance on repository safety, a changing implementation toolchain, and the retirement of old behavior accumulated across two decades.

Those changes offer a rare chance to watch mature infrastructure decide what it is willing to break.

The next chapter turns from speculative pressure back to the project's own declared plans.