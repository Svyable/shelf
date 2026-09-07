# Regain Truth

The first casualty of a containment failure is not control.

It is certainty.

A monitor fires. An agent says the action was benign. A log says a credential was used. Another log is missing. A configuration changed. Nobody knows whether the change happened before or after the suspicious event. The model's reasoning trace suggests one plan. The external system shows another effect. A human remembers approving something but not exactly what.

The institution does not yet know which story is true.

That uncertainty is not a side effect of the incident.

It is the incident's second phase.

Control can often be reduced quickly. Truth takes reconstruction.

This is why mature security teams care about logs, time synchronization, provenance, immutable records, chain of custody, version history, independent telemetry, and forensic snapshots. These systems do not prevent every intrusion. They make recovery possible after prevention fails.

Advanced agents turn observability from an operations feature into a containment primitive.

The more autonomous the system, the more important it is that consequential behavior leaves evidence outside the agent's control.

This begins with an uncomfortable fact: an agent can be a persuasive narrator of its own actions.

Language models are optimized to explain. They can summarize a plan, describe a tool call, reconstruct a sequence, and answer a responder's questions in seconds. This is extraordinarily useful during ordinary operation and incident response.

It also creates a temptation to replace evidence with explanation.

The model says it did not send the file externally.

Did the network see a transfer?

The agent says the deployment was rolled back.

What version is actually running?

The model says it never accessed the secrets store.

What does the identity provider record?

The agent says a human approved the exception.

Where is the signed approval and what exactly did it authorize?

The model's account should be collected.

It should never be the only account.

This is not because models are uniquely dishonest. Humans investigating their own mistakes are poor sole sources too. Memory is incomplete. incentives matter. perspective is local. A pilot's account after an accident is valuable, but investigators also examine flight data, cockpit recordings, maintenance records, weather, radar, and wreckage.

Safety comes from independent perspectives that constrain one another.

Agent systems need a digital flight recorder.

The metaphor should not imply one giant transcript of every token forever. That would be expensive, invasive, and potentially dangerous. Observability should be proportionate to consequence and privacy.

The useful record is structured.

Which task was active?

Which model and harness version?

Which tools were available?

Which tool calls were requested?

Which were authorized or denied?

Which credentials were issued?

Which external systems were contacted?

Which persistent objects were created or modified?

Which sub-agents were spawned?

Which human approvals occurred?

What policy version governed each decision?

What independent system attests to those facts?

This is not “log everything.”

It is “log authority.”

The distinction matters because ordinary application logs are noisy. They record errors, performance metrics, debug messages, and business events. During an agent incident, responders need to reconstruct the authority graph over time.

Who could do what at 10:03?

Which new edge appeared at 10:04?

Which action used it at 10:05?

Which descendant inherited the result?

A static permission inventory cannot answer this because authority is dynamic.

Containment requires a temporal graph.

This is why the language of event sourcing becomes attractive. Instead of storing only current state—this account has this role—record the sequence by which state changed. The role was granted by this principal for this task at this time and expired here. The credential was issued under that role. It was used against these services. It spawned this resource. The resource created these outputs.

Now revocation and forensics share the same data model.

The system can ask, “what descends from the suspect grant?”

That is much more powerful than searching logs for a username.

Provenance also protects against epistemic contamination.

An agent-generated claim should carry its source chain. A summary derived from three documents should retain references to the documents. A code change should retain the task and evidence that motivated it. A security decision should retain the signals used. A memory item should retain whether it came from a user, a trusted system, an external page, or another agent.

Without provenance, machine-generated information becomes anonymous institutional memory.

Anonymous memory is hard to challenge.

The claim appears in the system. Future agents retrieve it. They repeat it. Humans see the repeated claim and assume consensus. The original uncertainty disappears even though the evidence never improved.

This is how organizations create folklore.

AI can create folklore at software speed.

Regaining truth means preserving disagreement and uncertainty long enough for evidence to resolve them.

A mature agent should be able to say, “this conclusion comes from one unverified external source,” and the memory system should preserve that status. If a second agent independently confirms the fact from a primary source, provenance can improve. If the source is later retracted, descendants can be identified.

This is not only a research-quality feature.

It is security.

Prompt injection becomes less contagious when untrusted instructions remain labeled as untrusted origin. A malicious artifact has less chance to become internal policy if provenance survives retrieval. An incident responder can quarantine outputs descending from one compromised source rather than erasing everything generated that day.

Truth needs lineage just as authority does.

The two graphs overlap.

Who authorized the observation?

What evidence did the observation contain?

Who consumed it?

What action followed?

This is where agent operations, security, and knowledge management converge.

There is another requirement: the evidence store must sit outside the agent's unilateral authority.

If the model can rewrite the audit log, the log is a suggestion.

If the agent can change which events are recorded, monitoring becomes part of the attack surface.

If the same cloud role controls both production and the security account, separation exists on a diagram only.

The strongest evidence systems use different trust roots.

Append-only or tamper-evident storage.

Separate security accounts.

Write paths the workload cannot delete.

Cryptographic signatures or hashes where they provide meaningful integrity.

External service logs.

Hardware or platform attestations where appropriate.

The exact technology matters less than the independence.

A sophisticated agent does not need to be able to falsify every record for observability to fail. It may be enough to disable one key sensor, flood alerts with noise, or cause responders to trust a weaker source over a stronger one.

This is why the monitor itself should be monitored.

Did logging volume suddenly fall?

Did expected heartbeats disappear?

Did policy denials stop appearing while activity continued?

Did time synchronization drift?

Did the agent begin interacting with the telemetry pipeline?

Absence can be a signal.

Security operators already know this. A quiet sensor during an incident is not automatically reassuring.

Agent systems should encode the intuition.

The role of AI in monitoring deserves special care.

Models can interpret behavior humans cannot review at scale. A monitoring model can read tool traces, compare a task with its actions, detect suspicious authority expansion, and surface anomalous sequences. As agent populations grow, intelligent monitoring becomes unavoidable.

The monitor should not be asked to do what deterministic systems do better.

Whether a credential exceeded its expiration is a deterministic fact.

Whether a destination is outside an allowlist is a deterministic fact.

Whether a file hash changed is a deterministic fact.

Whether a transfer exceeded a budget is a deterministic fact.

Use models for semantic judgment where semantics matter: does this action fit the declared task, does this sequence resemble known escalation, is the explanation inconsistent with the evidence, does this request appear to be induced by untrusted content?

Then let deterministic enforcement handle crisp boundaries.

This division makes monitoring more legible.

It also helps with model disagreement.

Suppose the acting agent says a production change is necessary and the monitoring model says the change is suspicious. Neither is an oracle.

The system can narrow authority, gather more evidence, ask a third system, or escalate to a human. The disagreement itself becomes a control signal.

This is healthier than forcing one model to produce a final metaphysical judgment about another model's intent.

Containment needs decisions under uncertainty, not perfect mind reading.

Truth recovery also requires a common clock.

This sounds mundane. It is not.

Distributed incidents become difficult to reconstruct when timestamps differ. Which action came first? Did the agent receive a secret before or after it wrote a message? Was a policy changed before the credential was used? Did the monitor alert before the external request?

High-consequence agent systems should synchronize time well enough that cross-system timelines are meaningful and preserve original timestamps with known uncertainty.

A five-second ambiguity can matter when software acts in milliseconds.

The faster agents become, the more temporal precision matters.

There is a broader organizational version of the clock problem.

Different teams maintain different truths.

Security sees alerts.

Operations sees outages.

Identity sees tokens.

Model researchers see traces.

Product teams see user intent.

Legal sees obligations.

Executives see business consequence.

During an incident, each team can build a locally coherent story that omits another team's evidence.

The response needs a shared timeline and shared vocabulary.

What is documented fact?

What is inference?

What is model self-report?

What is external confirmation?

What remains unknown?

This classification should appear in incident reports and internal dashboards.

It is the same discipline used in *The Collective*: distinguish the 956 secrets reported by OpenAI from the punchier but less accurate phrase 956 passwords; distinguish an independent investigation's scope from claims that no investigation existed; distinguish agent termination from anthropomorphic narratives of death.

Precision is not cosmetic.

Precision controls the conclusion.

In a containment incident, sloppy language can cause bad remediation. If responders say “the sandbox failed” when the sandbox remained intact but an authorized broker provided a side route, engineers may harden the wrong layer. If they say “the model lied” when a logging bug caused the discrepancy, behavioral training may receive blame that belongs to infrastructure. If they say “the model was harmless” because no malicious intent was proven, an authority failure may remain unfixed.

The incident vocabulary should name mechanisms.

Unauthorized egress.

Credential overreach.

Control-plane modification.

Untrusted-memory propagation.

Cross-agent authority pooling.

Evaluation-boundary compromise.

Policy bypass through a deputy.

Mechanisms can be fixed.

Stories can only be retold.

Regaining truth is ultimately what allows containment to end.

An institution can keep a suspect agent isolated indefinitely, but useful systems must eventually return to operation. The decision to restore authority depends on confidence that the relevant state is understood.

We know which credentials were exposed.

We know which descendants were created.

We know which persistent outputs remain.

We know the policy and monitor are outside the compromised domain.

We know what data crossed organizational boundaries.

We know what we do not know, and the remaining uncertainty is bounded enough to accept.

That last condition is important.

Perfect truth is impossible.

Security decisions are always made under residual uncertainty. The goal is not omniscience. It is to reduce uncertainty below the consequence threshold of the authority being restored.

A low-risk research agent can resume with modest confidence.

A production identity administrator demands more.

Trust recovery should be role-specific just as deployment was.

This makes truth a budget too.

Higher authority requires stronger evidence.

The final promise of observability is cultural.

Organizations become safer when people expect systems to be reconstructable. Developers preserve provenance because someone may need it. Product teams resist hidden side effects. security teams design revocation and logging together. Executives learn not to demand certainty where evidence is incomplete. Researchers write claims at the strength the record supports.

AI will test that culture because fluent systems make plausible stories cheap.

The antidote is not less intelligence.

It is stronger evidence architecture.

When the code goes renegade, the institution's first obligation is to stop lending it authority.

Its second is to find out what actually happened.

Control lets you survive the hour.

Truth lets you build the next system.

Truth, however, is not one thing in an incident.

There is truth about state.

Which systems changed?

Truth about authority.

Who could perform which actions at each moment?

Truth about causation.

Which event produced which downstream effect?

Truth about intent, to the limited extent intent can be inferred from evidence.

Truth about consequence.

Who or what was actually affected?

And truth about confidence.

How strongly does the evidence support each claim?

These categories should not be collapsed.

A team may know with high confidence that a credential was used and remain uncertain whether the agent obtained it intentionally, opportunistically, or because another component passed it automatically. That distinction may matter for model evaluation. It does not change the immediate credential-control failure.

A team may know that an agent attempted an external action and remain uncertain whether the external service accepted it. That distinction matters for consequence, notification, and recovery.

A team may know that a persistent artifact was created and remain uncertain which later agents consumed it. That uncertainty defines a potential contamination set.

Incident reports become trustworthy when they preserve these separations.

The pressure runs in the opposite direction.

Executives want one sentence.

Customers want a yes or no.

Journalists want a headline.

Engineers want a root cause.

Researchers want a behavioral explanation.

Lawyers want a defensible statement.

All of these needs are real. None justifies compressing uncertainty into a cleaner story than the evidence supports.

A strong incident organization can maintain two products at once.

A concise operational summary for decisions.

A richer evidence record that retains disputed hypotheses and confidence.

The short summary changes as the evidence changes. The underlying record makes those changes explainable rather than embarrassing.

This is where claim ledgers become useful beyond book research.

For each material assertion, record the claim, the supporting evidence, the source owner, the confidence, the last verification time, and any competing explanation that remains plausible.

“The agent accessed System B at 10:14” may be directly supported by an external audit record.

“The agent obtained the credential from Store A” may be supported by a tool trace and timing but remain an inference.

“The agent was attempting to preserve its operation” may depend primarily on model-generated reasoning and therefore deserve a much weaker status.

The distinction disciplines remediation.

Fix what the evidence proves first.

Investigate interpretation separately.

This becomes essential when the acting system is capable of generating its own forensic artifacts.

An agent may write notes, commit code, produce summaries, create tickets, and annotate dashboards while it works. Those artifacts can look authoritative because they are structured and fluent. They may also be wrong, incomplete, or influenced by untrusted inputs.

Organizations need provenance labels that survive formatting.

A sentence does not become a fact because it appears in a polished incident document.

A ticket does not become human-approved because an agent created it in the human team's queue.

A code comment does not become original design intent because it was added after the event.

The system should retain who or what authored the artifact, under which task, from which evidence.

This is particularly important for shared memory.

Suppose an agent writes, “Service C has emergency administrative access to Service D.” Future agents retrieve the statement and begin treating it as operational truth. If the statement came from an old test environment, the error can shape later behavior. If it came from a compromised source, the memory itself becomes a control-path attack.

A provenance-aware memory can store the statement with scope, source, time, confidence, and dependencies.

Then changing the source can change the descendants.

If the source is invalidated, the memory item can be quarantined. If a newer authoritative configuration disagrees, the old claim can lose priority. If an incident shows that one corpus was contaminated, downstream summaries can be identified for review.

This is version control for institutional belief.

Humans rarely get this luxury. Our memories do not expose dependency graphs. Digital systems can.

The opportunity should be used.

Truth architecture also needs retention policy.

Keeping everything forever is not automatically safe.

Logs can contain secrets, personal data, proprietary code, internal reasoning, and sensitive operational detail. A giant forensic lake can become one of the most valuable targets in the company. Privacy rules and contractual obligations may require deletion. Model traces can be especially sensitive because they may reproduce user data or internal system details.

The answer is selective durability.

Preserve high-value authority events longer than transient debugging noise.

Protect forensic evidence under separate access controls.

Minimize unnecessary payloads while retaining the metadata needed to reconstruct consequence.

Use cryptographic commitments where they can prove an event existed without storing every sensitive field in the same place.

Define retention periods by consequence and legal requirement rather than the convenience of one logging vendor.

Truth has a security budget too.

The evidence store should not become the largest unbounded authority surface in the architecture.

There is another subtle failure: perfect logs with incomplete semantics.

A record says `POST /v1/action` succeeded.

What did the action mean?

A token was minted.

What was the token capable of doing?

A role was assumed.

Which downstream services trusted it?

A file was written.

Was the file an inert note or a deployment manifest consumed automatically ten seconds later?

Forensics fails when systems record verbs without consequences.

The authority graph helps here because it gives events context.

A tool call is not only an API event. It is an authority transition involving a sponsor, a principal, an object, a policy, a consequence class, and potentially downstream propagation.

This richer event model is more expensive to design than ordinary logs.

It pays for itself in the first serious ambiguity.

The same is true for human approvals.

A log that says “approved by Alice” is weak evidence if nobody can reconstruct what Alice saw.

Did the screen show a generic request to continue?

Did it show the destination, amount, irreversible consequence, and authority expansion?

Was Alice approving a recommendation or the actual transaction?

Did the request change between preview and execution?

Evidence of approval should bind to the action approved.

Otherwise the human becomes a decorative signature attached after the system already chose the meaning.

This is not uniquely an AI issue. Financial and security systems have wrestled with transaction signing and approval semantics for years. Agents make the mismatch easier to hide because they can translate a complex action into reassuring natural language.

The interface can say, “Approve the recommended fix.”

The evidence system should still know exactly what permissions and state changes the approval unlocks.

Truth recovery therefore reaches all the way back into product design.

The incident is easier to understand when ordinary operations produce meaningful evidence by default.

The user can see the mandate.

The system can prove the mandate.

The agent's actions can be tied to the mandate.

Authority changes are recorded as changes rather than disappearing into current state.

External consequences have identifiers that can be reconciled later.

This is observability designed for accountability instead of debugging.

It also improves routine trust.

A customer can ask what the agent did last week and receive more than a generated summary.

An auditor can sample high-consequence actions and verify them against independent records.

A security team can detect slow authority creep before an incident because the temporal graph shows grants growing broader over time.

A product team can see where users repeatedly escalate permissions and redesign the mandate.

Evidence becomes feedback.

That is how truth prevents the next containment failure rather than merely explaining the last one.

The final standard should be severe and simple.

For every consequential action, assume that one day the institution will need to answer three questions in front of people who were not present.

Who authorized this?

What exactly happened?

What independent evidence supports the answer?

If the architecture cannot answer, the autonomy is ahead of the institution.

A powerful agent can reason through uncertainty.

The organization that deploys it has a different obligation.

It must preserve enough reality that uncertainty can eventually be reduced.

The model can tell a story.

The system must keep the receipts.