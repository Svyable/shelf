# Book brief — Hallucinations: How AI Leads Us Astray

## One-sentence thesis

The most consequential AI hallucinations are not isolated model errors but shared events in which generated plausibility acquires authority through human belief, interface design, workflow repetition, memory, institutional action, and later systems that inherit the representation as data.

## Reader promise

By the end of the book, the reader should be able to distinguish model fabrication from broader epistemic failure; identify the factual hinge in an AI-assisted decision; recognize when agreement, citations, summaries, memory, agent chains, or synthetic evidence create false confidence; and design workflows in which uncertainty survives long enough to be checked before it becomes consequential state.

## What is new here

The literature already contains extensive work on hallucination/confabulation, factuality, calibration, sycophancy, misinformation, automation bias, provenance, synthetic data, and human-AI interaction. This manuscript does not claim to have invented those subjects. Its original synthesis is the idea of **shared hallucination** as a systems phenomenon.

The model is one participant. The full event can include a model that generates an unsupported proposition; a user who supplies a false premise, preference, or belief; an interface that presents the result with institutional or conversational authority; a transformation that removes caveats or provenance; a memory system that stores an inference as a fact; an agent or workflow that converts the proposition into structured state; an institution that acts on that state; and later artifacts, databases, or models that make the original representation appear independently confirmed.

The central novelty is therefore not a new taxonomy of token-level failure. It is a shift in unit of analysis from **model output** to **representation lifecycle**.

## Audience

The primary reader is intelligent and non-specialist: executives, builders, professionals, investors, policymakers, students, researchers, and serious users of AI. The manuscript should remain readable without requiring machine-learning mathematics while refusing the simplifications of generic AI-warning books.

The secondary audience is technical. Engineers and researchers should find the systems arguments concrete enough to map onto evaluation, retrieval, provenance, agent orchestration, memory, access control, source lineage, and human factors.

## Tone

Calm authority. No apocalypse. No breathless futurism. No motivational slogans. The book should be more interested in mechanisms than villains.

The prose should start with concrete cases and widen toward principle. History and research should be metabolized into the argument rather than pasted into lists. Where evidence is uncertain, the uncertainty remains. Where a case is legally or technically narrower than the popular retelling, the manuscript should say so.

## Architecture

The book progresses in six movements.

### I. Why plausible language outruns evidence

Chapters 1–5 begin with fabricated legal authorities, next-token prediction, guessing incentives, human fluency/confidence cues, and organizational reward structures. The purpose is to show that hallucination is not a mysterious glitch and that raw accuracy is not enough.

### II. How the user enters the failure

Chapters 6–10 cover sycophancy, agreement, shared hallucination, citation laundering, and memory. The conceptual pivot arrives in Chapter 8: a false representation can be stabilized jointly without human and machine sharing a mental state.

### III. How institutions convert language into reality

Chapters 11–16 examine interface authority, workflows, courts, clinics, search/answer systems, and agent chains. These chapters move from text risk to state-change risk.

### IV. The economics and governance of uncertainty

Chapters 17–22 cover correction debt, epistemic convenience, unanswerable questions, the evidence supply chain, design for doubt, and the right to uncertainty. The focus shifts from diagnosis to architecture.

### V. What a mature information environment needs

Chapters 23–28 widen the thesis. The human job becomes hinge detection rather than token proofreading. Synthetic evidence makes capture provenance newly scarce. Databases can inherit generated rumors as grounded facts. A counterweight chapter examines algorithm aversion and the cases in which the model is right. The verification dividend argues that evidence infrastructure can accelerate automation rather than merely constrain it. The confidence market locates the commercial and organizational incentives that make certainty attractive.

### VI. The final synthesis

Chapter 29 rejects the fantasy that hallucination is a property of the model alone. The unit of trust is the human-machine-evidence system.

## Definitions

### Hallucination

Used as the common public term for generated content that is false, unsupported, or misleadingly confident. NIST's Generative AI Profile uses *confabulation* for confidently presented false or erroneous content. The book acknowledges that terminology and does not imply human phenomenology inside a language model.

### Shared hallucination

A social or sociotechnical event in which an unsupported representation becomes more stable through interaction among a model, a user, interfaces, memory, workflows, other models, databases, or institutions. The term is not a clinical diagnosis.

### Epistemic friction

Work or delay that preserves a useful distinction between claim and evidence: source inspection, a clarifying question, a second signature, an abstention, a contradiction flag, a verification gate, or an explicit blank.

### Citation laundering

The transformation of a weakly sourced, uncertain, or generated claim into prose whose formatting or repetition gives it stronger apparent provenance than the underlying evidence warrants.

### Correction debt

The contingent future labor created when unverified generated claims are allowed into durable circulation and later have to be traced, corrected, and propagated through dependent artifacts.

### Apprenticeship debt

The future judgment deficit created when organizations automate formative work without replacing the learning that the work previously produced.

### Hallucinated decidability

The presentation of a settled answer to a question that is structurally open, future-dependent, value-laden, private, ambiguous, or otherwise not determined by the available evidence.

### Verification dividend

The reusable productivity benefit created when source resolution, calculation checks, provenance, versioning, and evidentiary gates become automated infrastructure rather than repeated manual review.

## Evidence policy

Concrete cases should be grounded in public evidence. Preferred source order:

1. primary legal decisions, regulations, standards, official technical publications, and original research;
2. peer-reviewed scholarship and high-quality research reports;
3. first-party company materials for claims about the company itself;
4. reputable secondary reporting for context, never where a primary source is readily available for the same proposition.

No invented quotes. No invented scenes presented as events. No fabricated statistics. No universal claim from a single benchmark.

Hypothetical workflow examples are permitted when clearly written as examples rather than reported incidents.

For fast-moving model evaluations, the manuscript should tie results to the named benchmark, date, and tested model/configuration.

## Falsification standard

The book's central thesis would need to narrow if strong evidence showed that downstream human and institutional design contributes little to consequential AI error relative to model-level factuality alone; that provenance and uncertainty-preserving interventions fail to improve downstream decisions in realistic deployments; or that users reliably calibrate trust to residual model errors without structural support as models become more accurate.

The book must also preserve counterevidence in the other direction. If people systematically underuse demonstrably superior AI systems after salient errors, distrust itself becomes an epistemic failure. The answer is calibration, not skepticism.

Individual chapter claims expose what would weaken them in `chapter-briefs.md`.

## Anti-theses the book should avoid

- "AI lies." Too anthropomorphic and too broad.
- "Never trust AI." Operationally useless and contradicted by tasks where machine performance is superior.
- "Humans are the real problem." Blame replacing analysis.
- "Retrieval solves hallucinations." It changes failure modes rather than eliminating them.
- "Human in the loop solves safety." Human review can become ceremonial, less accurate, or unscalable.
- "More capable models are necessarily safer or more dangerous." Capability and control co-evolve.
- "All uncertainty is equal." Verification burden should scale with consequence and ambiguity.
- "Provenance proves truth." Provenance describes source/history; a genuine artifact can still mislead.
- "Synthetic data inevitably causes model collapse." The literature is conditional on training regime and preservation of original data.
- "The subject has never been written about." The book's originality is the synthesis, not priority over the field.

## Publication target

Full-length trade nonfiction: 29 chapters and at least 65,000 manuscript words excluding front matter, back matter, and research material. The Desk edition remains a complete draft, never `Published`; the published copy is released as an exact committed snapshot to Shelf, where publication state belongs.
