# Research Brief

## Thesis under test

*Keep Cooking* asks what happens if useful machine cognition keeps getting cheaper while systems become better at spending additional inference on difficult tasks.

The strong version of the thesis — “more tokens always produce more intelligence and therefore more prosperity” — is too simple to survive evidence. The version worth testing is conditional:

> If useful machine cognition becomes substantially cheaper and more abundant, individuals, firms, and governments will consume more of it. The economic value of complementary scarce resources — context, judgment, energy, physical action, distribution, trust, accountability, and institutional capacity — will rise relative to raw cognitive production. Distributional outcomes will depend on who controls those complements and whether users retain credible exit.

This thesis can be wrong in several ways. Model progress may stall. Test-time scaling may show sharply diminishing returns outside narrow domains. Inference may remain costly at frontier quality. Firms may fail to reorganize around AI even when tools are capable. Human review costs may erase machine-speed gains. Energy or hardware constraints may raise marginal costs. Competition may keep infrastructure rents low. New work may absorb displaced labor faster than the manuscript expects. Institutions may adapt apprenticeship and credentialing with little disruption.

The book should remain useful under those outcomes. Its core method is to ask which constraint is removed, what becomes scarce next, and who controls the new bottleneck.

## Evidence lanes

### 1. Test-time compute and the economics of additional inference

The technical premise is not merely larger models. Research on inference-time scaling asks whether a fixed model can improve results by spending more compute at answer time through search, verification, sampling, or adaptive reasoning. Charlie Snell, Jaehoon Lee, Kelvin Xu, and Aviral Kumar's 2024 paper, “Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters,” is a central source because it shows both promise and task dependence. Its compute-optimal result is especially important to the book's stopping-rule argument: additional inference should be allocated adaptively rather than treated as universally valuable.

Stanford's 2025 AI Index provides a second empirical anchor. Its research-and-development chapter reports very rapid declines in the cost of reaching a fixed benchmark capability, while also showing that frontier systems retain a price premium. The manuscript treats these declining costs as an enabling condition, not a law of nature.

### 2. Workplace productivity, heterogeneity, and the jagged frontier

Erik Brynjolfsson, Danielle Li, and Lindsey Raymond's “Generative AI at Work” studies 5,179 customer-support agents and finds meaningful average productivity gains, with especially large gains among novice and lower-skilled workers. This supports the “compressed apprentice” mechanism: AI can diffuse patterns of high-performing work.

The evidence must be paired with counterexamples. Fabrizio Dell'Acqua and coauthors' field experiment with knowledge workers introduced the “jagged technological frontier”: AI improves performance on tasks inside its capability boundary while inducing errors when users rely on it outside that boundary. METR's randomized study of experienced open-source developers is an even stronger warning against assuming visible assistance equals productivity: in the studied setting, early-2025 AI tools increased completion time despite participants expecting gains.

These studies motivate three recurring distinctions in the manuscript: novice versus expert effects, task-level capability versus job-level substitution, and perceived productivity versus measured productivity.

### 3. Critical thinking, verification, and cognitive offloading

The Microsoft Research CHI 2025 paper by Hao-Ping Lee and coauthors surveys 319 knowledge workers and 936 real-world GenAI use examples. It reports that greater confidence in GenAI is associated with less critical-thinking effort, while GenAI use shifts critical thinking toward verification, integration, and stewardship. This evidence grounds the manuscript's “verification tax” and the concern that cheap generation can make review, provenance, and judgment more valuable.

The manuscript should not inflate this into a claim that AI inevitably makes users less intelligent. The study is largely self-reported and describes changes in effort and practice, not permanent cognitive decline. Later revisions should prefer longitudinal and behavioral evidence as it becomes available.

### 4. Labor exposure and the missing-rungs problem

The International Labour Organization's 2025 refined global index estimates that one in four workers worldwide is in an occupation with some degree of GenAI exposure, while only a much smaller share is in the highest exposure category. The ILO explicitly emphasizes transformation over wholesale redundancy. This is compatible with the book's task-level approach and guards against “job apocalypse” rhetoric.

The IMF's 2024 staff discussion note on generative AI and the future of work provides a macro distributional frame: advanced economies have greater exposure because more work is cognitive-intensive, but they also have more opportunities for complementarity. Emerging and developing economies may be less immediately exposed while receiving fewer early productivity gains.

The manuscript's “labor without ladders” argument is more speculative than exposure estimates. It predicts that if firms automate a large share of routine junior work, professional formation can become a separate institutional problem. Evidence to monitor includes entry-level hiring rates, time-to-promotion, apprenticeship creation, changes in junior task composition, and whether AI-assisted novices actually retain skills when assistance is removed.

### 5. Energy, infrastructure, and rebound

The International Energy Agency's 2025 *Energy and AI* report is the primary source for the physical-economy chapters. It projects global data-centre electricity consumption rising sharply through 2030, with AI-focused accelerated servers responsible for a large share of incremental demand. The report also stresses uncertainty, efficiency improvements, grid bottlenecks, location effects, and the potential for AI to improve the energy sector itself.

The book's rebound argument should be tested against both efficiency and usage. Falling energy per task does not imply rising total electricity use; total demand rises only if adoption and workload growth exceed efficiency gains. The IEA's scenario structure is useful precisely because it avoids treating one demand trajectory as inevitable.

### 6. Global distribution and AI foundations

The World Bank's *Digital Progress and Trends Report 2025: Strengthening AI Foundations* provides the global-development frame. It emphasizes four foundations — connectivity, compute, context, and competency — and documents concentration of frontier innovation and infrastructure in high-income countries alongside growing adoption elsewhere.

This maps closely onto the manuscript's claim that raw model access is not the whole distributional problem. Countries also need reliable electricity and connectivity, affordable compute, locally relevant data and language coverage, and people capable of deploying systems effectively. Open models and smaller systems can reduce some barriers without eliminating infrastructure and institutional gaps.

### 7. Firm structure, market power, and context as switching cost

The manuscript's company chapters are partly deductive and should be treated as such. The hypothesis is that if AI makes coordination and administrative competence cheaper, smaller firms can operate with capabilities previously associated with larger organizations. At the same time, persistent context and integrated agent platforms can increase switching costs and move market power toward infrastructure, distribution, identity, and memory layers.

Evidence to monitor includes AI adoption by firm size, revenue per employee, headcount composition, model-routing behavior, cloud concentration, enterprise switching costs, API price dispersion, context portability standards, and the share of AI value captured by infrastructure providers versus application firms and customers.

### 8. Household economics, attention, and defensive cognition

The household chapter extends productivity analysis beyond wages. If AI lowers the cost of planning, comparison shopping, form completion, tutoring, translation, and administrative work, households can receive real consumer surplus even when the benefit never appears as cash income. At the same time, cheap persuasion, synthetic media, application automation, and personalized commercial systems can increase verification and attention costs.

This lane currently has less mature causal evidence than workplace productivity. Later editions should add household time-use studies, consumer-surplus estimates, fraud data, education outcomes, and evidence on differential adoption by income and education.

## Falsification notes for the whole manuscript

The book's thesis would need material revision if several of the following become true at once:

- Test-time compute delivers little useful gain outside narrow benchmark domains.
- Inference prices stop falling or rebound strongly enough that routine machine cognition remains rationed.
- AI productivity gains remain confined to a small number of digital occupations and fail to diffuse into firm-level productivity.
- AI tools consistently improve experts more than novices, undermining the skill-compression argument.
- Entry-level hiring and apprenticeship remain healthy even as routine cognitive tasks automate.
- Context proves highly portable and weak as a switching cost, reducing the plausibility of a cognitive-landlord equilibrium.
- Data-centre energy demand grows slowly because efficiency gains outrun usage growth.
- Small and medium-sized firms fail to capture meaningful gains because integration costs remain too high.
- Global AI adoption converges rapidly despite compute, connectivity, language, and skill gaps.
- Competitive markets transfer most infrastructure productivity gains to users without creating durable concentration at chips, cloud, distribution, identity, or context layers.

Evidence in the opposite direction should strengthen specific chapters without being treated as proof of the entire theory.

## Source discipline

- Prefer original papers, official datasets, company filings, regulatory documents, and primary institutional reports.
- Separate measured productivity from user perception and marketing claims.
- Separate task exposure from job elimination.
- Separate cost per token from total inference spending and total electricity demand.
- Separate model capability from the quality of a complete sociotechnical workflow.
- Treat announced data centres, chips, power projects, and capital expenditure differently from installed and utilized capacity.
- Treat scenario projections as scenarios, not realized facts.
- Preserve contrary findings rather than averaging them into a fake consensus.
- Record the date of AI-industry measurements because prices and capabilities can move rapidly.
- Avoid converting an observed association into a permanent claim about cognition, labor, or inequality.

The companion `source-ledger.csv` records the first-draft sources. `chapter-briefs.md` records the question and falsification test for each chapter so later revisions have an explicit route for arguing with the book.