# Chapter 25 research note — synthetic-data diversity as counterevidence

## Editorial question

Chapter 25, “The Database That Learned the Rumor,” uses Shumailov et al. (2024) carefully: recursive training on model-generated data can lose information about the original distribution, especially its tails, while preserving original data changes the result. The manuscript already warns against turning that finding into the slogan that synthetic data inevitably causes collapse.

The remaining weakness is that the positive countercase is only gestured at as “other research.” A later peer-reviewed result gives that boundary more substance.

## Fresh evidence checked

### Schaffelder & Gatt (ACL Findings 2026)

Max Schaffelder and Albert Gatt, “Synthetic Eggs in Many Baskets: The Impact of Synthetic Data Diversity on LLM Fine-Tuning,” *Findings of the Association for Computational Linguistics: ACL 2026*, pp. 7265–7293.

Primary publication page: https://aclanthology.org/2026.findings-acl.360/

The paper studies fine-tuning with synthetic data produced from different source models and examines distribution collapse, adversarial robustness, and self-preference bias. In the tested fine-tuning settings, synthetic data drawn from diverse generator sources mitigated distribution collapse and preserved a broader output distribution relative to less diverse synthetic training. Human data remained strongest for reducing self-preference bias, with multi-source synthetic data next. The paper also reports a complication that matters for any simple “synthetic diversity is good” story: both human and synthetic fine-tuning data could remove safeguards, and some synthetic-trained outputs were more usable in the adversarial setting.

## Strongest counterargument to the chapter

Synthetic origin is not itself the causal variable that determines whether a training loop degrades. Composition, diversity, retained original data, generator lineage, curation, task, and training regime can materially change the result. A system can use synthetic data productively, and greater source diversity can preserve aspects of distributional breadth in at least some fine-tuning settings.

That means Chapter 25 should not let “feedback reduces independence” slide into “feedback necessarily destroys quality.” The more defensible claim is narrower: when generated descendants increasingly replace or obscure independent source material, the system can lose information about the distribution and about where its evidence came from. Provenance and diversity are therefore controls on feedback, not arguments for synthetic-data abstinence.

## What this evidence does not establish

- This is a fine-tuning study, not a universal result about large-scale pretraining.
- It does not show that any particular mixture ratio or number of generator models prevents collapse in other architectures or domains.
- Preserving output diversity is not the same as preserving truth, factuality, calibration, safety, or rare real-world evidence.
- The safeguard result is a reason not to equate broader or higher-quality-looking output with safer behavior.
- The result does not invalidate Shumailov et al. (2024); it sharpens the conditions under which the older result should be generalized.

## Editorial use

A later manuscript pass can replace the chapter’s generic sentence that “other research explores ways synthetic data can be useful” with a concrete, qualified counterexample. The useful distinction is not human versus synthetic. It is whether the training or knowledge process preserves enough independent, diverse, traceable contact with source distributions that generated descendants do not become their own unexamined evidence.

No prose change is required merely to record this evidence. The current manuscript is already materially accurate; this note exists to prevent a future edit from simplifying the model-collapse literature into a one-directional warning.
