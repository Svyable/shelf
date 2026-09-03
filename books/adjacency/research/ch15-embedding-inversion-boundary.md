# Chapter 15 — Embedding inversion and the privacy boundary

## Claim under test

Chapter 15 argues that a vector derived from private text should not be treated as harmless merely because it is a numerical representation. The strongest defensible version is not that every embedding can be reversed, but that embeddings can preserve enough source information for reconstruction attacks under demonstrated conditions. Sensitive embeddings therefore deserve a threat model rather than an assumption of anonymization.

## Primary-source evidence

Morris, Kuleshov, Shmatikov, and Rush tested full-text reconstruction from dense text embeddings in EMNLP 2023. Their iterative Vec2Text method repeatedly generated a candidate string, re-embedded it, and used the difference from the target embedding to refine the candidate. On one evaluated state-of-the-art black-box encoder, they report exact recovery of 92% of 32-token inputs; on clinical-note embeddings, they report recovering 89% of full names.

Source: John X. Morris, Volodymyr Kuleshov, Vitaly Shmatikov, and Alexander M. Rush, “Text Embeddings Reveal (Almost) As Much As Text,” *Proceedings of EMNLP 2023*, pp. 12448–12460. DOI: 10.18653/v1/2023.emnlp-main.765.
https://aclanthology.org/2023.emnlp-main.765/

The paper is especially useful for the chapter because its threat model does not require access to the embedding model's weights or gradients. The attacker does, however, need access to target embeddings and text–embedding pairs from the encoder used to create them so that an inversion model can be learned.

## Counterevidence and boundary conditions

The 92% result is not a universal reversibility rate for embeddings. It applies to short, 32-token inputs and a particular evaluated encoder and attack setup. Reconstruction quality varies across models and corpora, and the paper itself shows that a naive decoder conditioned only on an embedding performs poorly before the iterative correction method is introduced. Longer inputs, different encoders, restricted attacker access, dimensionality reduction, noise, or other defenses can change the attack substantially.

Nor does successful inversion imply that embeddings are lossless copies of text. Chapter 14's compression argument still stands: a representation can discard distinctions relevant to one task while retaining enough regularity for another system to infer much of the source. Compression and privacy are different properties.

## Editorial implication

Chapter 15's existing operational conclusion is appropriately cautious: embeddings derived from sensitive text should be treated as sensitive data. If the manuscript later names the inversion result, keep the conditions attached to the number. The useful concrete sentence is that one 2023 attack recovered 92% of tested 32-token inputs exactly under its experimental setup—not that “92% of embeddings can be reversed.” That distinction turns a generic privacy warning into evidence without manufacturing certainty.
