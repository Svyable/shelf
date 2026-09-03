# Chapter 9 — self-correction and verifier evidence

## Why this matters

Chapter 9 argues that asking another model to check a model can help, but that verification is fragile when generator and verifier share failure modes. The research record supports a narrower version of that claim: naive intrinsic self-correction is unreliable on some reasoning tasks, while structured feedback and verification can materially improve outputs.

## Primary evidence

Jie Huang et al., **“Large Language Models Cannot Self-Correct Reasoning Yet”**, ICLR 2024.

https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html

The paper studies intrinsic self-correction: a model revising its own answer without external feedback. Across the reasoning settings tested, the authors find that models often fail to improve and can sometimes make correct answers worse. This supports the chapter’s warning that more model passes do not automatically create independent evidence.

Aman Madaan et al., **“Self-Refine: Iterative Refinement with Self-Feedback”**, NeurIPS 2023.

https://papers.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html

Self-Refine is important counterevidence. Using the same model for generation, feedback, and refinement, the authors report improvements across seven tasks, with roughly 20 percentage points of average absolute task-performance improvement under their evaluation setup. The result shows that same-model critique is not inherently useless.

Zhenyu Wu et al., **“Large Language Models Can Self-Correct with Key Condition Verification”**, EMNLP 2024.

https://aclanthology.org/2024.emnlp-main.714/

Wu et al. further weaken any categorical “models cannot verify models” claim. Their ProCo method restructures the verification problem around a masked key condition and improves self-correction without external feedback on the tested tasks.

## Argument boundary

The evidence supports a distinction between **redundancy** and **independent evidence**. Extra model passes can improve an answer when the checking procedure exposes useful structure, but agreement between similar agents is not equivalent to contact with an external ground truth. The manuscript should therefore resist both extremes: “just ask another model” is too easy, while “self-verification does not work” is also too strong.

For Chapter 9, the strongest formulation is: machine verification can pay part of the verification tax, but confidence should rise most when a checking step introduces genuinely new information — execution, retrieval, measurement, independently designed tests, authoritative records, or a verification procedure that forces the model to test a condition it did not merely restate.
