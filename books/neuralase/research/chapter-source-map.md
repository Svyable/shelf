# Chapter-Source Map

The map names the evidence each chapter is allowed to lean on. It is deliberately redundant: recurring sources are reused when the same empirical boundary matters in more than one chapter.

| Chapter | Core sources | Claims under test |
|---|---|---|
| 1 — The Transformer Doesn’t Think Twice | S01, S05, S14 | Standard Transformer computation, autoregressive generation, and explicit test-time reasoning are distinct levels of looping. |
| 2 — Recurrence Returns | S02, S03, S04, S17 | Variable computation and recurrent depth have a lineage older than contemporary reasoning models. |
| 3 — The Compute Budget Becomes a Thought Budget | S14, S16, S17, S18 | Inference-time compute can improve reasoning, but its value depends on task, method, and allocation. |
| 4 — Naming the Catalyst | S09, S10, S11, S13 | Productive iteration needs a mechanism that changes the information or evaluation available on the next pass. |
| 5 — A Loop Needs a Difference | S06, S07, S08, S12 | Diversity, search, action, or feedback can add information; repetition without difference can fail. |
| 6 — Error Needs Friction | S11, S12, S13, S28 | Reliable correction is strongly conditioned on feedback quality and task structure. |
| 7 — Branch Before You Believe | S06, S07, S14 | Multiple trajectories plus selection can beat one greedy trajectory, at a real compute cost. |
| 8 — Think With the World | S08, S10, S26 | Tools and deterministic solvers can turn external reality into a discriminating signal. |
| 9 — Memory Is a Return Path | S10, S08, S13 | Memory can carry lessons across iterations without changing model weights, but can also carry error. |
| 10 — Reasoning Without Words | S17, S19, S20, S22 | Recurrent-depth systems can perform useful additional computation in latent representations before or between emitted tokens. |
| 11 — The Verbalization Trap | S24, S25, S26, S27 | Visible chain-of-thought can be useful without being a guaranteed faithful causal explanation. |
| 12 — The Halting Problem, Practically | S02, S03, S15, S18, S23 | Useful systems need adaptive computation and stopping rules because uniform depth is inefficient and excessive depth can hurt. |
| 13 — The Controller Is the Architecture | S07, S08, S10, S14 | The orchestrator that decides branch, tool, memory, verifier, and stop can matter as much as the base model call. |
| 14 — The Economics of the Second Pass | S14, S15, S17, S18, S23 | Reasoning quality must be evaluated against latency, token use, FLOPs, and opportunity cost rather than accuracy alone. |
| 15 — When More Thinking Hurts | S12, S13, S18, S21, S23 | Iteration can amplify error, waste compute, or abandon a correct answer; naive looping is not a universal improvement. |
| 16 — Decisions With Re-entry | S08, S11, S13, S26 | Consequential decision systems benefit when evidence, verification, appeal, and external checks can re-enter before action becomes irreversible. |
| 17 — The Right to Stop | S02, S18, S23 | Halting is a control problem with both underthinking and overthinking failure modes. |
| 18 — After the Answer | S03, S14, S17, S20, S23 | The synthesis: reasoning may increasingly be designed as controlled re-entry across multiple computational levels. |
