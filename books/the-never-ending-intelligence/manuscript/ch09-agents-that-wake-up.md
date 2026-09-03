# 9. Agents That Wake Up

The most important message an agent receives may eventually be no message at all.

A condition changes.

That is enough.

This is the transition from reactive intelligence to situated intelligence.

A reactive system waits for somebody to formulate a request. A situated system has standing relationships with parts of the world. It knows which changes matter to its responsibilities.

A repository changes and the maintenance agent wakes.

A contract approaches renewal and the procurement agent wakes.

A scientific instrument finishes a run and the research agent wakes.

A customer replies and the account agent wakes.

A forecast crosses a risk threshold and the planning agent wakes.

Nothing resembling a human prompt is necessary.

The environment is the prompt.

This is deceptively profound because prompting has been one of the defining human activities of the first AI era. People learn how to ask. Products compete on conversational interfaces. The model's intelligence appears downstream of language supplied by a person.

Persistent agents invert the relationship.

The system begins asking the world questions through subscriptions, monitors, scheduled checks, queries, and expectations.

Instead of humans deciding when cognition should occur, the agent develops a policy for when cognition is warranted.

This is autonomy in a more useful sense than simply "can take actions."

It is autonomy over attention.

The agent decides when to think.

That decision can itself be layered.

A deterministic trigger notices that a file changed. A small classifier decides whether the change is relevant. A medium model decides whether the situation resembles known routine work. Only a genuinely novel or consequential event invokes expensive reasoning or human attention.

This makes the always-on system economically plausible.

It does not think continuously.

It continuously remains *wakeable*.

The distinction resembles the difference between leaving every light in a city on and maintaining an electrical grid capable of lighting whichever room becomes occupied.

Capacity is persistent. Consumption is episodic.

Wakeability also makes agents sensitive to the long tail of time.

A human may forget to revisit an unresolved question after six months. A persistent agent can retain the trigger cheaply.

"Wake me if this regulation changes."

"Wake me when this dependency releases a compatible version."

"Wake me if this house is listed again."

"Wake me if the evidence for this scientific claim materially changes."

"Wake me when these two conditions become true simultaneously."

This turns patience into programmable infrastructure.

The economic consequences are larger than reminders.

Markets contain opportunities whose value comes from timing. Research contains hypotheses that become tractable only after new tools or evidence appear. Organizations contain decisions that should be deferred until uncertainty resolves. Personal life contains intentions that are important but not urgent.

Humans are poor at maintaining huge portfolios of dormant intentions.

Agents can be excellent at it.

A person may eventually have thousands of sleeping commitments represented computationally, almost none consuming meaningful cognition at any moment.

The agent becomes a second temporal nervous system.

It remembers what future situations deserve attention.

This creates a new form of leverage: the ability to wait without forgetting.

There is danger in this too.

A system that can wake itself can also create its own triggers.

A research agent might schedule follow-up experiments. A maintenance agent might create monitoring for a suspected failure. A business agent might establish future review points after making a decision.

This is useful because good work naturally creates future work.

But recursive trigger creation can become unbounded.

Every investigation spawns three monitors. Every monitor creates follow-ups. Every follow-up creates another condition. Soon the agent's future contains more promised cognition than its budget can support.

Persistent systems therefore need attention accounting.

Future wakeups are liabilities.

They consume expected inference, tool access, and perhaps human attention. Creating a trigger should have a cost model just as creating a cloud resource does.

This suggests another mature behavior: trigger garbage collection.

Periodically ask which dormant intentions still deserve to exist.

Some have become irrelevant. Some are duplicated. Some are impossible. Some have been superseded. Some should be merged into broader monitoring. Some should be escalated because they have remained unresolved too long.

The agent curates its future.

Humans do this when we clean calendars, task lists, subscriptions, and obligations. We are often terrible at it. Machines can at least make the debt visible.

Wakeability also changes security.

An event-triggered agent has a new attack surface: attackers may try to cause expensive or consequential wakeups.

Spam already attacks human attention. Persistent agents create machine attention worth attacking.

A malicious actor could flood event channels, manipulate monitored conditions, or craft inputs designed to trigger expensive reasoning repeatedly.

So agents need interrupt hygiene.

Rate limits. Authentication. trust levels. batching. anomaly detection. budgets. quarantine for untrusted events. escalating proof requirements before consequential action.

Again the operating-system analogy holds.

Interrupts are powerful because they can seize attention. They therefore need governance.

The final transformation is psychological, at least for humans living with these systems.

A tool waits where you left it.

An agent that wakes can return with news.

You close the laptop on Tuesday. On Thursday it tells you that the thing you cared about has changed, that it investigated, that two of your previous assumptions no longer hold, and that it has prepared three options.

The subjective experience is not "I used AI."

It is "something kept thinking about my world while I was elsewhere."

Technically, perhaps nothing thought continuously at all.

That is the trick.

The intelligence does not need to stay awake.

It needs to know when to wake.

Wake policy may eventually become as important as model selection.

Consider an agent responsible for maintaining a complex software system. The raw world can generate millions of potential wake events: logs, commits, alerts, dependency releases, customer reports, security advisories, test failures, infrastructure changes, cost anomalies, and messages from humans.

If every event wakes a frontier model, the system is economically absurd and cognitively noisy.

If almost nothing wakes it, the standing responsibility is fiction.

The quality of the agent depends on the filter between reality and thought.

This is analogous to biology in an instructive but limited way. An organism's nervous system does not deliver every sensory signal to conscious attention. Layers of processing suppress predictable stimuli and escalate anomalies. Pain interrupts. Familiar background noise disappears. Attention is selective because cognition is scarce.

Persistent agents need computational versions of that selectivity.

Some signals can be handled deterministically. A certificate expires in seven days: create a routine work item. A test failed on an active branch: notify the worker that owns it. No generative reasoning is needed.

Some signals need cheap semantic classification. Is this customer email routine or evidence of a broader incident? Does this release note affect one of our dependencies? Is this news article materially relevant to a standing research question?

Some signals deserve deep reasoning. Several weak indicators align. A pattern deviates from historical baseline. A policy change interacts with an old commitment. A customer's apparently simple request creates a conflict between goals.

The wake stack becomes hierarchical.

This matters for reliability because cheaper layers can also serve as circuit breakers. If the main model provider is unavailable, deterministic monitoring should still function. If expensive inference budget is exhausted, critical alerts can still escalate to humans. The system does not become blind merely because its smartest cognitive layer is offline.

A robust persistent agent should therefore degrade through levels of awareness rather than collapse from brilliant to absent.

There is a subtle design question hiding here: should the agent be allowed to change what wakes it?

Of course it should, eventually. Learning that a certain signal is predictive and creating a monitor is an obvious form of improvement.

But self-modifying attention can also become self-amplifying attention.

An agent discovers a possible risk, creates five monitors, sees five noisy alerts, interprets the alert volume as stronger evidence of risk, creates more monitors, and starts consuming more of its budget investigating a problem whose apparent importance was partly generated by its own instrumentation.

Humans recognize this as institutional anxiety.

A bureaucracy creates metrics for a problem, the metrics generate meetings, the meetings generate reporting, and the volume of reporting becomes evidence that the problem deserves a larger bureaucracy.

Persistent agents can automate the loop.

This means trigger creation should itself be evaluated.

What hypothesis does this monitor test?

What event would justify waking?

What is the expected value of detecting it?

What is the expected false-positive cost?

When does the trigger expire?

Can a cheaper shared monitor cover several goals?

The agent's attention architecture should become subject to cost-benefit pressure.

This produces an interesting possibility: **attention markets inside an agent**.

Different standing goals compete for limited inference budget. A low-probability financial risk, a software maintenance task, a dormant travel plan, and a scientific curiosity all want future cognition. The system can price wakeups according to expected consequence, urgency, confidence, and user preference.

A user might allocate more attention to health and family than shopping. A company might reserve expensive reasoning capacity for security and customer impact while routine cost optimization waits. A research institution might guarantee that certain long-shot hypotheses receive periodic attention despite low short-term expected value.

The allocation reflects values.

This is why wake policy is not merely optimization. Deciding what deserves attention is one of the deepest forms of agency humans exercise.

Persistent machines will exercise a delegated version of it.

The system also has to decide what constitutes *novelty*.

A simple threshold alert says CPU use exceeded ninety percent. A situated agent can notice a relational anomaly: CPU use is ordinary, but it is now decoupled from traffic in a way not seen before. A customer reply contains no alarming word, but it contradicts a commitment recorded months earlier. A scientific paper does not mention the agent's hypothesis directly, but introduces a method that makes the hypothesis testable.

These are not events with predetermined names.

They are changes in meaning.

This is where language models and other flexible inference systems add something deterministic automation lacks. They can recognize semantic relationships among events and standing concerns.

But flexible recognition increases false positives.

The agent can see relevance everywhere.

A well-read mind can connect anything to anything. A persistent agent with thousands of goals and access to global information can become a conspiracy machine if every tenuous connection earns attention.

So semantic wakeups need confidence, budgets, and perhaps corroboration.

A cheap worker may say, "possibly relevant." Another system asks whether the relevance is new and consequential. Only then does the main agent wake.

This tiering also provides security against prompt injection and malicious event content. Untrusted text should not arrive directly in a high-authority context simply because it matched a standing topic. The trigger can wake a quarantined reader with no consequential tools. That reader extracts claims and provenance. A separate trusted invocation decides whether anything deserves action.

The architecture separates *being interesting* from *being authoritative*.

That distinction is crucial in a world where anybody can send text to an agent.

The concept of silence as an event deserves expansion too.

Many systems encode only things that happen. Persistent intelligence can encode expectations about things that should happen.

A child usually calls every Sunday and did not.

A vendor usually publishes a monthly report and has not.

A system usually receives a heartbeat every minute and missed three.

A market usually responds to an announcement and did not.

A project usually produces commits and has gone quiet.

Absence is meaningful only relative to a temporal model.

The agent has to know the rhythm before silence can surprise it.

This creates a form of ambient situational awareness unavailable to a one-shot system unless the human explicitly supplies the baseline.

It also creates social hazards. A personal agent that treats every departure from habit as suspicious can become intrusive. A workplace agent that wakes on every employee's unusual pattern becomes surveillance. The technical ability to notice absence does not imply a right to interpret it.

Again, permissioned geography applies to time as well as data.

The agent should have standing relationships only with parts of the world it is legitimately responsible for observing.

This may become a defining product boundary.

The first assistant era asks: what data can the assistant access when I invoke it?

The persistent era asks: what parts of my life is this system allowed to keep watching when I am not present?

That is a much bigger grant.

Users will need ways to see and edit those standing observations.

What are you watching for me?

Why?

How often?

What would wake you?

Who else can cause that wakeup?

What can you do after you wake?

When does the watch expire?

The answers form an attention constitution.

A mature system can make that constitution more concrete through a **wake contract**.

A wake contract binds a dormant concern to the conditions under which cognition may resume. It records the mandate being served, the event sources considered legitimate, the predicate or classifier that defines relevance, the maximum cost of checking, the authority available after waking, the escalation path, the expiration rule, and the deduplication behavior if the world generates the same signal repeatedly.

This prevents a common category error: treating event delivery as authorization.

An event can be authentic and still not justify action.

A supplier really did change a price. That may justify waking the procurement agent. It does not necessarily authorize a purchase.

A customer really did send an angry email. That may justify investigation. It does not authorize disclosure of unrelated internal information.

A regulation really did change. That may justify legal review. It does not automatically prove that every existing workflow violates the new rule.

The wake contract opens the door to cognition.

The mandate and capability system decide what cognition may do after it enters.

This separation makes triggers safer because the event source does not become an accidental principal.

The system also needs to manage **event storms**.

Reality rarely emits one tidy signal. A production outage can cause hundreds of alerts, retries, customer messages, status changes, monitoring anomalies, and dependent failures. A naive persistent agent may wake dozens of times around one underlying event and generate contradictory responses.

Human incident response solves this partly by creating an incident object that absorbs many signals into one coordinated episode.

Agents need the same coalescing primitive.

Several alerts may map to one wake.

A new event arriving during an active investigation may update the episode rather than spawning another independent thinker.

A burst can enter a cooldown period while the system waits to see whether conditions stabilize.

Hysteresis can prevent oscillation around thresholds: do not wake and sleep repeatedly because a metric hovers one decimal point around a boundary.

These boring controls matter because an intelligent response can still be ruined by unintelligent scheduling.

Wake reliability also includes the opposite problem: the missed wakeup.

A trigger was registered but the scheduler failed. An event stream disconnected. A credential expired. A worker queue stalled. The world changed and the agent remained asleep.

From the outside, nothing distinguishes intentional silence from broken attention unless the system monitors its own monitors.

Persistent agents therefore need reconciliation of attention itself.

What conditions should have been checked during the outage?

Which deadlines passed?

Which subscriptions were disconnected?

Which wake contracts accumulated unprocessed events?

What state changed while the watcher was blind?

The system should be able to perform a catch-up scan and mark where exact reconstruction is impossible.

This is another reason the architecture cannot equate "no event received" with "nothing happened."

Absence of evidence is especially dangerous when the evidence pipeline may be broken.

A durable agent should know the health of its senses.

There is also a fairness problem inside large agent portfolios.

High-volume mandates can monopolize attention. One noisy software system can consume the entire inference budget while a low-frequency but consequential legal deadline approaches unnoticed. A personal shopping monitor can generate more events than a quiet health-related obligation whose importance is much greater.

Schedulers therefore need priority and starvation control.

Some mandates deserve guaranteed attention even if they rarely emit signals.

Some can be delayed safely.

Some have hard deadlines.

Some should be sampled rather than continuously watched.

Some should lose budget when their recent wakeups produce little value.

This is queueing theory with values attached.

The system is not merely processing jobs. It is deciding which responsibilities are allowed to become cognitively alive first.

Human attention becomes part of the downstream budget too.

An agent can afford to generate a hundred internal wakeups more easily than a human can absorb a hundred escalations. Good wake policy should therefore minimize not only model cost but **human interruption cost**.

The agent may investigate ten anomalies and report one combined conclusion. It may hold a low-confidence concern until another piece of evidence arrives. It may choose a daily digest for routine drift and immediate interruption for a security compromise.

The best persistent agent is not the one that notices the most.

It is the one that spends attention where attention changes outcomes.

When this architecture works well, the result will feel almost supernatural while remaining technically mundane.

The system will appear at the right moment.

Not constantly.

Not because it guessed what you were thinking.

Because the concern was durable, the world changed, the watcher was healthy, the signal crossed a legitimate wake boundary, and the machinery knew that this change was worth another mind.