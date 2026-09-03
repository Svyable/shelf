# The Five-Millivolt World

Five millivolts is an awkward amount of voltage.

It is too small to impress anyone outside a laboratory and large enough to decide whether an explanation survives inside one.

A fresh alkaline battery is measured in volts. A household outlet is measured in hundreds of volts depending on where you live. Five millivolts is five thousandths of a volt, a difference that would disappear in almost any ordinary conversation about energy. In a modern solar cell, however, the important remaining losses can live on this scale. If a proposed microscopic mechanism is expected to change nonradiative voltage loss by ten or twenty millivolts, then a five-millivolt uncertainty is not bookkeeping. It is a large fraction of the result.

This is where frontier science becomes a problem of distributions rather than measurements.

Suppose a device treatment appears to improve a voltage-loss metric by twelve millivolts. The treated device and the baseline were measured on the same apparatus. The number looks precise. The question is no longer whether twelve is greater than zero. The question is how many different processes could have produced a twelve-millivolt difference without the treatment doing what the theory says.

The detector has uncertainty. The calibration has uncertainty. The active-area definition has uncertainty. The temperature has uncertainty. The injection point has uncertainty. The spectral response has uncertainty. The device may have drifted between measurements. The baseline device may simply have been worse. The treated device may come from a more favorable position on the substrate. The substrate may come from an unusually good fabrication run. The polymer batch may differ. The model converting light into voltage loss may add its own assumptions.

At five millivolts, experimental design is not the frame around the picture. It is part of the picture.

There is a useful distinction between uncertainty in a measurement and variation in the thing being measured.

If one device is measured repeatedly and the result wanders by two millivolts, that says something about repeatability. If nominally identical devices differ by six millivolts, that says something about fabrication or sample variation. If the average shifts by eight millivolts after recalibration, that says something about a systematic scale. If two model families convert the same spectrum into values differing by ten millivolts, that is model uncertainty.

All four can exist at once.

Collapsing them into a single standard deviation hides which problem needs to be solved.

A metrologist attacks calibration. A process engineer attacks fabrication variation. A statistician designs the hierarchy. A theorist asks whether the inference is identifiable. A product engineer asks which source dominates the decision.

The five-millivolt world requires all of them.

The quantum-energy project’s R2 transfer-standard work is useful because it turns this abstraction into a hierarchy.

Material lot. Fabrication lot. Substrate. Device or pixel. Session. Measurement.

Each level can contribute variation, and each level answers a different scientific question.

If you measure the same device ten times in one session, you learn about short-term repeatability and instrument noise. You do not learn whether a second substrate will behave the same way. If you measure ten pixels on one substrate, you learn something about within-substrate spatial variation. You do not have ten independent coating experiments. If you make five substrates from one solution on one afternoon, you gain more independence but still share material history and fabrication context. If you repeat the whole process with another material lot and another day, you begin to test the claim the way manufacturing will test it.

This hierarchy is the enemy of inflated sample size.

A dataset can contain thousands of rows and only three independent experimental units relevant to the claim.

Modern data culture encourages the opposite intuition. More rows feel like more evidence. A machine-learning pipeline may happily split correlated measurements into training and test sets, report a small error, and fail completely when a new substrate arrives. A statistical model may treat every pixel as independent and produce confidence intervals far narrower than the fabrication process deserves.

The five-millivolt world punishes that mistake quickly.

The project’s early R2 pilot considered three substrates with three measured pixels each. Nine devices sound respectable. The design was later changed to five substrates with two pixels each. Ten devices sound only slightly larger. Statistically, the more important difference is the number of independent substrates.

The redesign sacrifices repeated within-substrate information to gain leverage on fabrication variation.

This is a quiet example of a broader principle: the best experiment is the one whose independent units match the claim.

If the claim is “this instrument repeats the same measurement reliably,” repeated scans are useful. If the claim is “this fabrication process produces a stable voltage-loss reference,” independent substrates matter. If the claim is “this interface treatment works across manufacturing variation,” independent lots matter. If the claim is “this platform transfers across facilities,” laboratories become experimental units.

The unit of independence moves outward as the claim grows.

That idea is easy to state and difficult to fund. Moving outward is expensive.

A repeat scan costs minutes. A new device costs hours. A new substrate may require a fresh coating. A new fabrication lot can require days. A new material lot can require purchasing, characterization, and requalification. A second laboratory adds logistics, contracts, shipping, calibration, and people.

This creates a structural temptation in frontier research: make the claim grow faster than the independent evidence.

The repository’s rules deliberately slow that growth.

A five-substrate reference pilot can qualify fabrication variance. It cannot automatically confirm a microscopic mechanism. The project tested this boundary using synthetic recovery studies. Under frozen assumptions about effect size and measurement noise, it generated datasets belonging to several competing mechanism classes and asked a low-dimensional classifier to recover the true class while blinded to it.

With five independent substrates, several mechanisms were recovered too unreliably for a confirmatory claim. Seven improved performance. Nine provided a stronger margin.

The exact percentages are less important than the decision they forced: five is exploratory for mechanism classification.

This is an example of a result that becomes more valuable because it says no.

Before the simulation, the project could have imagined one five-substrate campaign answering both a reference-qualification question and a mechanism-identification question. The synthetic study split them apart. Same physical samples, different evidentiary permissions.

The simulation did not prove that nine real substrates will be sufficient. Its assumed effect size and noise may be wrong. It proved that under the project’s own planning assumptions, five was not enough to justify the stronger interpretation.

This is a useful distinction between numerical confidence and scientific confidence.

A computer can calculate a probability under a model exactly enough. The model may still be a guess.

There is also a distinction between confidence about an average and confidence about a future unit.

A treatment can have a statistically well-estimated mean improvement and still be a poor manufacturing process if the distribution is wide. A factory wants to know not only whether the average device is better but how often a new lot will land inside specification. Prediction intervals can therefore matter more commercially than narrow confidence intervals around a mean.

This is why upper bounds on variance are useful in early process qualification. If the goal is to detect ten-millivolt treatment effects, a process whose true fabrication variation might plausibly be eight millivolts is not ready simply because the observed point estimate in one small pilot happened to be three.

The uncertainty around the uncertainty matters.

That is why the quantum-energy open-science charter requires assumptions to be visible as assumptions. A synthetic effect size does not become a measured effect size because it generated a clean power curve. A detector specification does not become measured system performance because a vendor printed it. A published value from another material does not become a target-stack constant because it is convenient.

Every number carries provenance.

This habit becomes essential when the project compares measurements across temperatures.

A thermometer may report 300 kelvin to a fraction of a degree. The active region of the solar cell may not actually be at that temperature. The sensor might sit nearby on a stage. Electrical injection can heat the device. Optical pumping can heat it. Thermal contact may be imperfect. A temperature gradient can exist across packaging.

If a model uses temperature to separate vibrational from static broadening, an error in device temperature is not merely an x-axis error. It can change the inferred physical parameters.

The project therefore sets a planning target for device-adjacent temperature accuracy and stability during acquisition. The word adjacent matters because the sensor is still not the active molecules.

Metrology is full of such compromises. We measure something close enough to the thing we care about and then account for the difference.

The same issue appears in absolute radiometry. A calibrated detector comes with a responsivity trace and an uncertainty from a standards chain. Put that detector inside a new optical geometry and the system inherits additional uncertainty: alignment, integrating-sphere throughput, port losses, spectral mismatch, stray light, detector linearity, background subtraction.

Calibration is not a magical property transferred by touching the apparatus with a traceable instrument.

It is a chain.

The chain has to cover the actual measurement configuration.

This is why the project wants direct electroluminescence and reciprocity-based voltage-loss estimates to agree within a planning window. The methods have different sensitivities and assumptions. Agreement does not prove both are correct, but disagreement is informative. It reveals that at least one part of the chain needs attention.

Independent recomputation serves the same role in software.

The project’s recent executable benchmarks often calculate a quantity twice: once in ordinary floating point and once using exact fractions or an alternative derivation. This does not validate the model. It validates that the implementation is not the source of disagreement.

The hierarchy is deliberate.

First make the arithmetic boring.

Then make the instrument trustworthy.

Then ask whether the model is identifiable.

Then ask whether the physical effect repeats.

Then ask whether it improves useful work.

Then ask whether it survives manufacturing and time.

A frontier project can fail at any level. The discipline is to avoid using strength at one level to conceal weakness at another.

This is particularly important for fitted microscopic parameters.

Suppose a spectroscopy model returns a reorganization energy of 147.3 millielectronvolts for one device and 132.1 for another. The difference looks compelling because the parameters have decimals. But if several parameter combinations fit the spectrum nearly equally well, or if the model neglects a broadening channel, the uncertainty may be much larger than the fit routine reports.

Optimization algorithms are very good at finding minima. They are not automatically good at telling you whether the minimum is unique.

One can visualize the problem as a valley in parameter space. If the objective function has a sharp isolated bottom, the data constrain the parameter combination well. If it has a long shallow ravine, many combinations fit almost equally. A numerical optimizer will still choose one point in the ravine and print it with several decimals.

The decimal places describe the computer’s location in the valley, not the width of the valley.

This is why profile likelihoods, posterior distributions, bootstrap analyses, sensitivity sweeps, or other uncertainty methods can be more informative than the optimizer’s covariance matrix alone. The particular method depends on the model and data. The principle is the same: explore what else could fit.

The project’s model-family comparisons are designed to expose this. If classical Marcus, one-mode MLJ, MLJ plus static disorder, and a more complex model all fit the available data similarly, the microscopic parameter should not be treated as uniquely identified. Add temperature dependence, held-out spectra, or orthogonal measurements until the models make different predictions.

Identifiability is the statistical version of falsifiability.

A parameter is not useful merely because it can be fit. It is useful when the data constrain it strongly enough that competing values or models would produce observably different outcomes.

This is one reason the project explored lower-temperature charge-transfer linewidth measurements. At warmer temperatures, dynamic vibrational broadening can resemble classical scaling closely enough that static and dynamic contributions are difficult to separate. Lower-temperature points may make the models diverge more strongly.

But moving to lower temperature introduces new artifacts. The project therefore does not allow the synthetic identifiability gain to erase the experimental feasibility question.

This recursive caution can feel exhausting.

Every better measurement creates another validation problem.

That is not a flaw unique to this project. It is the structure of precision science.

The way out is not infinite skepticism. It is decision thresholds.

An engineering program does not need perfect knowledge of every parameter. It needs enough knowledge to choose the next action without pretending the uncertainty is smaller than it is.

If the question is whether to spend money on cavity hardware, the project may only need to know whether interface engineering produces a repeatable useful-work gain first. If the question is whether to scale a coating process, it may need an uncertainty bound on lot-to-lot performance and a validated inline proxy. If the question is whether electron–phonon coupling is the primary mechanism, it needs stronger orthogonal evidence than if the question is simply whether the recipe improves power.

Different decisions require different evidence.

This is the venture side of the five-millivolt world.

Startups are usually taught to move fast, find a product, talk to customers, and avoid overbuilding. Deep-tech companies add a painful twist: the product may depend on a physical effect small enough that an unqualified instrument can create false market discovery.

If the underlying mechanism is not real, customer enthusiasm cannot rescue it.

If the mechanism is real but too variable to manufacture, a large market cannot rescue it.

If the measurement system cannot tell those cases apart, the company can spend years learning the wrong lesson from every prototype.

A disciplined uncertainty budget is therefore a capital-allocation tool.

The budget can even be translated into experimental spending. If detector calibration contributes one millivolt and sample-to-sample fabrication contributes six, buying a detector twice as accurate may have almost no decision value. If temperature uncertainty dominates the model inference, the next dollar belongs in thermal control rather than more samples. If lot variation dominates, process characterization may be more valuable than a new spectrometer.

Uncertainty decomposition tells you which expensive thing not to buy.

This is visible in the quantum-energy program’s choice to delay major proprietary fabrication and metrology capital expenditure until reference qualification passes. The project can use external facilities or a hybrid setup to learn whether the required uncertainty is achievable before building its own complete station.

This is not scientific timidity. It is staging.

The most expensive uncertainty should be attacked only after cheaper uncertainties are narrowed.

The same logic appears in material selection. P3HT/C60 is used as a mechanism-validation stack because the literature and cavity precedent make it easier to interpret. Modern D18-based materials become the commercial bridge because they are more relevant but also more complicated. A layered perovskite branch explores ambient polariton transport without demanding that the same material satisfy solar-module durability.

The project avoids asking one experiment to answer every question because each additional claim raises the required independence.

Five millivolts also changes how one should read a graph.

A smooth line through a set of points can create a sense of mechanistic inevitability. In a small dataset, the line may be more stable than the data-generating process. Error bars may represent standard error across technical repeats while ignoring lot variation. A model curve may use best-fit parameters without showing the range that would fit nearly as well.

Good visualization in frontier science should make fragility visible.

Show individual devices. Show independent lots. Show excluded devices and the predeclared reason. Show uncertainty components. Show the null model. Show whether the sign of the effect changes under plausible assumptions. Show the held-out prediction rather than only the fit.

The project’s commitment to public negative results makes this easier culturally.

If a null result is allowed to count as progress, researchers do not need to compress every uncertain dataset into a success narrative. A treatment that lowers voltage loss but hurts transport can be reported as such. A soft sensor that works within one substrate and fails out of substrate can be retired or redesigned. A mechanism classifier that needs nine substrates instead of five can say so before the experiment.

The result is a slower-looking project with faster epistemic motion.

This matters because the quantum-energy repository is also an automated research environment. Software agents can scan literature, write analysis code, create protocols, and open pull requests. The digital pace can become hourly. Physical evidence cannot.

The danger is an asymmetry of confidence. One hour of automation can produce a polished protocol, a model, tests, a literature map, and a machine-readable contract. None of those things changes the state of a molecule in the target device.

The repository’s claim classes are a defense against digital acceleration outrunning physical evidence.

A synthetic result remains synthetic even if reproduced by continuous integration on three Python versions. A prospective protocol remains prospective even if the code is perfect. An external experimental result remains external even if the project independently recomputes its arithmetic.

The speed of documentation does not upgrade the evidence level.

This may become one of the central problems of AI-accelerated science.

We are entering a period when hypotheses, code, simulations, literature syntheses, and experiment designs can be generated far faster than laboratory measurements. The scarce resource may shift from ideas to trusted physical observations.

In that world, the most valuable laboratories will not necessarily be the ones that think fastest. They may be the ones with the best calibrated interfaces between digital reasoning and physical reality.

Five millivolts is a symbol for that interface.

The number is small enough that the digital world can manipulate it effortlessly. A model can predict it, an optimizer can target it, a spreadsheet can subtract it, an AI can explain it.

Only the laboratory can tell you whether it happened.

And the laboratory has to know itself well enough to answer.
