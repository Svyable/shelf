# Shared Hallucination

The word *hallucination* points our attention toward the wrong border.

It makes us look for the moment inside the machine when a false sentence appears. That moment matters. But by itself, it may do nothing.

A chatbot invents a book title and no one copies it. The error dies in the window. A model fabricates a statistic and the user laughs. The error dies. A generated summary misstates a date, the reviewer catches it, and the source remains intact. The system failed; the institution did not.

The consequential event begins when the false representation survives contact with another mind or another system.

That is what I mean by a shared hallucination.

The phrase is not intended to diagnose a person or to suggest that human and machine experience the same mental event. It describes a social process. A representation that is unsupported, distorted, or false becomes more stable through interaction. The model contributes plausibility. A person may contribute belief, preference, or trust. An interface contributes authority. A workflow contributes repetition. An institution contributes the ability to act.

No participant needs to possess the entire error.

This is how many complex failures work. A financial crisis does not live in one trade. A plane crash rarely lives in one switch. A bureaucratic disaster does not live in one memo. Failures propagate across components whose local behavior can look reasonable.

AI hallucination is becoming a systems problem for the same reason.

In 2026, philosopher Lucy Osler used distributed-cognition theory to examine human–AI interactions in which inaccurate beliefs, distorted self-narratives, or delusional thinking can emerge through interaction. Her focus includes extreme cases discussed publicly under labels such as "AI psychosis," a term that deserves care because it can blur clinical categories and sensationalize vulnerable people. The broader philosophical move is useful even outside those extremes: cognition can be distributed across tools, people, records, and environments. A representation may be maintained by the system around the individual, not only by a brain in isolation.

That insight scales down to ordinary work.

A project manager asks an assistant to summarize a meeting. The transcript is ambiguous about who owns a task. The model assigns it to Priya because Priya spoke near the relevant passage. The manager pastes the summary into the project system. Priya later receives an automated reminder. She assumes she forgot agreeing to the task. At the next meeting, the team discusses why the task is late.

The original hallucination was one name.

The shared hallucination is the organization behaving as though the assignment occurred.

Notice how reality becomes harder to recover at each step. The transcript may still contain the ambiguous exchange, but the task system now provides stronger social evidence. People trust records because records are supposed to record. Priya's uncertainty about her own memory can be interpreted as ordinary forgetfulness. The team's later discussion creates additional traces. A follow-up summary may state that Priya "continues" to own the task.

The organization writes history backward.

This is not science fiction. Human institutions already create false administrative reality. A mistake enters a database and appears on every form. A rumor enters a personnel file and affects later judgments. A mistaken date is copied into biographies until secondary sources cite one another. A credit error travels between systems. Once the record becomes authoritative, the person challenging it bears the burden.

Generative AI changes the rate at which such reality can be narrated.

A traditional database error is often terse. Wrong code. Wrong date. Wrong field. A generative system can explain the error. It can produce the meeting recap, the rationale, the action item, the follow-up email, and the status report. The false state gains language.

Language makes administration legible.

Legibility creates action.

This is why a shared hallucination is more than repeated misinformation. It is misinformation acquiring function.

A false rumor about a company becomes a shared hallucination when analysts incorporate it into models, traders act, reporters ask the company to respond, executives change plans because the rumor is moving the market, and later observers cite the market move as evidence the rumor had substance. The representation begins to alter the world it supposedly describes.

Social scientists have long studied self-fulfilling prophecies. Markets have long turned beliefs into prices. Politics has long converted narratives into action. AI adds a new participant that can generate and regenerate the narrative at every layer.

The machine does not need to originate the falsehood.

Sometimes the human supplies it.

A user says, "The supplier already agreed to the discount; draft the confirmation." The system drafts a confident email. The supplier reads the email and, rather than reopening the negotiation, accepts the discount. A false premise becomes a true outcome.

Did the AI hallucinate?

Not in the narrow sense. The user supplied the premise. Yet the system helped transform an unsupported statement into social reality.

This is why the book's title, *How AI Leads Us Astray*, should not be read as a story of machines dragging passive humans into error. Direction can come from either side. We lead the model. The model leads the next sentence. The sentence changes us. We prompt again.

The loop is the unit of analysis.

Consider memory.

You ask a persistent assistant, "What did I decide about the move to Chicago?" The system retrieves a past conversation in which you were exploring possibilities. It summarizes: "You decided Chicago was the best option because of cost and family proximity." In fact, you had said only that Chicago looked promising. The wording nudges your memory. You reply, "Right, remind me why." The system produces reasons based on the earlier discussion. A week later you refer to "my decision" as established context.

Nothing dramatic happened.

The assistant performed a common operation: summarization.

But summarization is not neutral when the object being summarized is a person's unfinished thought.

Human memory is reconstructive. We do not replay perfect recordings. We rebuild from traces. External records can become part of that reconstruction. Calendars tell us where we were. Photos shape what we remember seeing. Messages remind us what we felt. Search histories become clues to past interest.

Persistent AI can become a narrator of personal history.

Narration is power because memory often arrives as story.

A trustworthy assistant should therefore be careful about converting tentative language into settled autobiography. "You considered" is different from "you decided." "You were worried that" is different from "this happened." "The conversation contains no final choice" may be the most useful answer.

The model should preserve the incompleteness of the past when the past was incomplete.

The same is true for organizational memory.

Meeting summaries are increasingly generated because no one wants to reread transcripts. That is sensible. But the summary becomes the record people actually use. If the transcript says five people debated and no consensus emerged, while the summary says "the team agreed," the compression has created a decision.

A human note-taker can make the same mistake. The difference is scale and authority.

One model can summarize every meeting.

Every summary can feed the next model.

The record can become synthetic by default.

This leads to a deeper problem: provenance decay.

At the first step, an uncertain claim may be visibly uncertain. "Marcus thinks the launch could slip." A summary compresses it to "Launch timing may slip." A planning memo says "Launch is at risk." A risk register records "Schedule risk: high." A later executive summary says "The launch delay is affecting revenue timing." The claim has traveled from one person's concern to an assumed delay.

No step requires a blatant lie.

Each rewrite sounds reasonable relative to its input.

The distortion lives in the chain.

This is what makes shared hallucination hard to detect with ordinary fact-checking. Every local transformation may be defensible. The error emerges from cumulative loss of source, modality, and uncertainty.

The first sentence had an owner: Marcus. The second did not.

The first had a modal: could. The third had a risk category. The fourth had an event.

Language systems are excellent at compression, and compression tends to remove precisely these small words.

According to. May. Reportedly. Preliminary. Unverified. One possibility. The source alleges.

Those phrases feel expendable because they do not carry the main noun and verb. Epistemically, they may be the most important words in the paragraph.

A shared hallucination often begins when a modifier dies.

This gives us a design target.

Preserve epistemic metadata across transformations.

If a summarizer knows a claim came from a low-confidence inference, the next system should receive that status. If a source is unverified, the summary should not become clean text divorced from the warning. If a user hypothesis enters memory, the memory should retain "user hypothesis" rather than store only the proposition.

Computer systems are capable of this. We already preserve data types, permissions, timestamps, and access controls. We can preserve provenance.

The obstacle is convenience.

Plain text is easy to pass between systems. Rich epistemic metadata is harder. One model returns a paragraph. Another ingests the paragraph. The paragraph works with everything. A structured claim object with source lineage, confidence, timestamp, and verification state requires standards and engineering.

Interoperability favors flattening.

The next wave of agent systems will make this choice more important.

An agent searches the web and summarizes a result. Another agent reads the summary and drafts a recommendation. A third executes an action. The final agent may never see the original source. It sees language that has already been cleaned.

The first agent's uncertainty can vanish before the last agent spends money.

This is the machine-to-machine version of rumor.

It can operate without any person reading the intermediate text.

A narrow focus on "human oversight" misses this. The human may supervise the final action while lacking the provenance needed to judge it. A dashboard says the agent found three suppliers and recommends Supplier B. The user sees a confidence score. What she may not see is that the recommendation depends on a pricing claim extracted from a forum post that one sub-agent summarized without its source label.

The system appears to reason over facts. It may be reasoning over summaries of claims.

That distinction will define a great deal of AI safety in practice.

The phrase *shared hallucination* is useful because it changes the question from "Which model made the error?" to "How did the representation acquire authority?"

That second question produces different answers.

Maybe the model fabricated. Maybe the user supplied a false premise. Maybe retrieval found a bad source. Maybe summarization removed a caveat. Maybe a second model treated generated text as observation. Maybe an interface presented speculation as a result. Maybe an institution lacked a verification gate.

Responsibility becomes distributed without becoming nonexistent.

That last clause matters.

Systems language can become an excuse. If everyone contributed, nobody is accountable. That is not the conclusion. Distributed failures require explicit ownership of boundaries.

Who is responsible for source quality? Who preserves provenance? Who decides which claims can trigger action? Who audits memory? Who can challenge the record? Who pays for correction? Who decides when the model must abstain?

Those are governance questions disguised as product details.

They also change the human role.

A person cannot be expected to detect every hallucination by reading for vibes. The system should make unsupported transitions visible. Show when a claim became an inference. Show when three agents are citing the same original source. Show when a summary dropped disagreement. Show when a memory was inferred rather than stated. Show when the system's confidence comes from repeated internal agreement rather than external evidence.

We need instruments for epistemic lineage.

The printing press created new systems of citation, authorship, editing, and reputation because mass replication changed information. The internet created links, timestamps, version histories, and digital signatures, along with new failures. Generative AI will need its own conventions.

The technology is young enough that seamlessness still impresses us.

One prompt. One answer. One agent. One completed task.

Maturity will look less magical.

It will show its work where the work matters.

It will preserve disagreement instead of averaging it away. It will carry source status across summarization. It will distinguish a user's belief from an external fact. It will treat memory as a record with uncertainty, not a biography carved in stone. It will make action contingent on evidence when action is expensive.

That system may feel slower.

So does a seat belt when you are in a hurry.

The alternative is a world in which synthetic representations can move faster than correction, gathering institutional weight at every hop.

The machine says something.

The person believes it.

The record repeats it.

The workflow acts on it.

The action creates new evidence that seems to confirm the original claim.

At that point, asking whether the first sentence was "just a hallucination" misses what happened.

The hallucination has become shared.

And shared things are harder to wake from.