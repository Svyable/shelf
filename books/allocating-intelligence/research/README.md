# Research Brief — Allocating Intelligence

## Purpose

*Allocating Intelligence* asks what happens after capable machine intelligence becomes cheap enough that producing another answer is no longer the main constraint. The book treats intelligence as an allocatable resource embedded in institutions. It follows the bottlenecks that remain when analysis becomes abundant: attention, time, verification, authority, memory, physical capacity, trust, appeal, and the preservation of human skill.

The research job is therefore not to prove that AI is powerful. It is to test the book's allocation thesis against fields that have already learned to route scarce cognition under pressure: emergency medicine, mission control, aviation, nuclear operations, manufacturing, software assurance, financial markets, public infrastructure, education, and administrative governance.

## Evidence hierarchy

Prefer, in order:

1. Primary incident reports, regulatory orders, technical standards, official manuals, and contemporaneous records.
2. Government agencies, intergovernmental organizations, national laboratories, and standards bodies.
3. Peer-reviewed research and high-quality academic working papers where the empirical design is inspectable.
4. Operator or manufacturer documentation for system-specific practices.
5. High-quality secondary reporting for context when a primary source is unavailable or would not answer the narrative question.

Historical anecdotes should not be used as slogans. When a failure has several causes, preserve the causal plurality. When an institution learned a lesson only after an accident, distinguish what participants knew at the time from what later investigation made clear.

## Claim rules

- Do not equate model capability with institutional authority.
- Do not treat confidence language as calibrated probability unless there is evidence of calibration.
- Separate the cost of delay from the cost of error; high stakes do not always imply faster action.
- Treat triage and ranking as policy choices, not neutral outputs of mathematics.
- Distinguish independent verification from merely asking the same system twice.
- Do not claim that automation necessarily removes work. Trace exception handling, review, data maintenance, and downstream burden.
- When using accident cases, avoid monocausal morality tales. Hardware, interface, training, procedures, organizational structure, and local decisions may all matter.
- Avoid calling an organization “resilient” merely because it survived. Identify the reserve capacity, redundancy, reversibility, or learning process that actually mattered.
- Public access to AI is not equivalent to useful access when connectivity, language, disability access, physical services, legal authority, or downstream capacity remain bottlenecks.
- Treat “human in the loop” as an incomplete phrase. Record what the human can see, what the human can stop, how much time is available, and whether the human retains practiced skill.

## Recurring research questions

For every chapter, ask:

- What is scarce in this system even when information or computation is abundant?
- Who decides priority?
- What clock governs the decision?
- Which errors are reversible?
- Where does verification come from, and how independent is it?
- What operational state must be visible for a person to intervene effectively?
- What is learned from exceptions, near misses, appeals, and overrides?
- Which capabilities disappear when routine work is automated?
- Which people receive more agency from the system, and which people are primarily judged by it?
- What downstream physical or institutional complement determines whether an answer changes reality?
- What evidence would falsify the chapter's strongest claim?

## Core source families

The draft repeatedly returns to a small set of high-authority source families. NASA mission-operations and IV&V material supplies cases in distributed expertise, independent assurance, simulation, and institutional memory. WHO emergency-care material supplies an explicit language for acuity, triage, surge, and dynamic reassessment. Toyota's own production-system documentation supplies the operational logic of jidoka: abnormalities should become visible and production can stop rather than passing defects downstream. FAA, NTSB, BEA, and NRC material supplies decades of hard-earned evidence about automation, control-room interfaces, human factors, training, and degraded modes. SEC and U.S.-Canada blackout investigations provide high-speed failure cases where weak controls let local defects propagate. NIST and OECD material provide contemporary governance language around continuous risk management, traceability, human agency, accountability, override, and redress. GPS.gov, NTIA, and education agencies help test the public-infrastructure and geography chapters against real access constraints.

## Falsification posture

The book's thesis would be weakened if abundant machine intelligence reliably dissolved rather than relocated bottlenecks: if verification scaled at the same rate as generation, if attention stopped constraining organizations, if authority could be delegated without increasing correlated or irreversible failure, if automated systems preserved human skill without deliberate practice, and if public access to models produced roughly equal practical capability regardless of infrastructure and institutions.

Evidence of those outcomes should be incorporated rather than argued away. Several chapters already contain countercases. Fast automation can be safer than slow human review in some environments. Centralization can reduce arbitrary variation. Cheap generalized tools can broaden access to expertise dramatically. Standardized models can make previously expensive verification available to small organizations. The argument is not that allocation is always difficult in the same way; it is that allocation remains a first-order design problem after raw cognitive supply rises.

## Drafting discipline

The manuscript should remain narrative nonfiction rather than governance documentation. Research earns its place by changing what the reader can see in a concrete system. Prefer one well-developed incident, operator practice, or institutional mechanism to a page of famous examples. Preserve uncertainty until the historical actors actually had the information. Avoid invented dialogue, synthetic quotes, arbitrary percentages, decorative equations, and framework proliferation.

Every substantial concrete claim added during expansion should be traceable to `source-ledger.csv`. The chapter briefs record the intended use and the evidence that would challenge the chapter, so future revision can distinguish a prose problem from a factual one.
