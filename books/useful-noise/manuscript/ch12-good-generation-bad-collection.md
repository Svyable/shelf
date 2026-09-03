# Good Generation, Bad Collection

A charge can be born successfully and still never become electricity.

This distinction sounds obvious when said slowly. In photovoltaic research it is surprisingly easy to blur, because different experiments isolate different parts of the journey and the most sophisticated measurement can become psychologically privileged.

Time-delayed collection-field measurements are powerful because they can probe how many free charges are generated under different pre-bias conditions while using a later strong extraction field to pull them out. This helps separate the generation step from losses that occur during ordinary steady-state extraction. If the measured free-charge generation remains high across relevant voltages, a researcher can breathe a little easier about field-dependent geminate loss.

But the device is not allowed to use a later rescue field during normal operation.

The charges have to travel through the actual film under the actual operating field, through whatever mobility imbalance, percolation bottlenecks, traps, recombination, and contact resistance the morphology has provided.

Transport is easy to caricature as a problem of carrier mobility. Higher mobility sounds better. Real devices care about a richer set of relationships.

Electrons and holes can have different mobilities. The slower carrier can accumulate and create space charge. Mobility can depend on carrier density and electric field. Transport may be dispersive because energetic disorder creates a broad distribution of hopping times. Pathways can be tortuous. A locally high mobility means little if the domain does not connect to the correct electrode. Contacts can impose extraction barriers even when the bulk film transports well.

A useful carrier therefore needs both kinetics and topology.

This is why the phrase charge collection is not simply charge generation delayed by a few nanoseconds. It is a different problem with different failure modes.

A 2026 Advanced Materials study made this separation unusually vivid.

The researchers studied PM6:Y12 organic solar cells with donor fractions ranging from extremely dilute to conventional blend ratios. The system was interesting because charge generation could remain surprisingly strong even when the amount of polymer donor became very small. One might expect the device to fail immediately as the donor network disappeared. Instead, structural and electrical analysis indicated that a continuous donor network could persist at low fractions, while transport became increasingly constrained.

In one table, the paper provided numbers that are almost too useful for teaching.

Under selective Y12 excitation around 820 nanometers, a device with two percent PM6 and a device with forty-five percent PM6 showed nearly the same TDCF-derived charge-dissociation efficiency: about 0.96 versus 0.95 in the reported summary. If dissociation were the whole story, these devices would look nearly equivalent at that stage.

They were not.

Their internal quantum efficiencies were about 0.18 and 0.85.

The difference is enormous.

The paper decomposed internal quantum efficiency into stages including exciton harvesting, dissociation, and collection. Using the reported values, the quantum-energy project independently reconstructed an implied collection efficiency of roughly 0.49 for the two-percent donor device and roughly 0.93 for the forty-five-percent device.

The dissociation efficiencies differed by about one percentage point. The collection efficiencies differed by nearly a factor of two.

Good generation was not enough.

This is a devastatingly useful result for any research program tempted to promote a field-generation measurement into a useful-work claim.

It does not say TDCF is unimportant. It says TDCF answers a specific question.

The low-donor device can create charges and still struggle to move them through the topology available under operating conditions. The paper connected the behavior to transport resistance, mobility, network structure, and changes in recombination behavior as donor fraction fell.

The lesson is deeply physical: charge generation and charge collection live on different geometries.

An exciton needs access to an interface. A separated hole needs a continuous donor pathway to its electrode. An electron needs an acceptor pathway to the opposite electrode. A morphology that is excellent at creating interfaces can be terrible at providing low-resistance transport. A material can therefore look strong in a spectroscopy or pulsed-extraction experiment and weak in the current–voltage curve.

Percolation gives a useful first approximation. Imagine sites on a lattice becoming conducting with some probability. Below a critical fraction, conducting clusters remain isolated. Above it, a cluster spans the system. Near the threshold, that spanning cluster can be tenuous: long detours, narrow bottlenecks, dead ends. Being connected is not the same as being well connected.

A real organic film is more structured than a random lattice. Polymer chains can bridge long distances. Aggregates align. Domains elongate. Vertical segregation can connect one component preferentially to one electrode. The relevant percolation threshold can therefore be surprisingly low or highly process dependent.

This is why composition alone cannot tell you collection.

Two percent of a long polymer that forms a connected fibrillar network can behave differently from two percent of disconnected globules. A morphology measurement that reports only average domain size can miss the topology. Charge transport is sensitive to the network’s graph, not only its histogram.

The quantum-energy project encountered this paper while designing the D18 field-robustness program. Its response was immediate and appropriately unromantic: add a transport and collection companion measurement.

The project chose a Suns-Voc or pseudo-JV approach as one prospective route.

The idea behind Suns-Voc is elegant. Instead of measuring the normal current–voltage curve while current flows through the device and transport resistance contributes to losses, vary illumination intensity and measure the open-circuit voltage. Under appropriate conditions, the resulting relationship can be used to reconstruct a pseudo current–voltage curve representing how the device might behave with some transport-resistance penalties removed.

At open circuit there is no net external current, so series transport drops that require current are reduced. By varying light intensity, one changes the generation and carrier-density conditions while recording the voltage the device can sustain. With an estimate of the generation current, the open-circuit data can be mapped into a pseudo-JV relationship.

The pseudo curve is not an alternate universe where transport has vanished completely. It is an analytical construct designed to reduce particular transport-associated losses enough that their contribution to fill factor can be inferred by comparison.

Compare the pseudo fill factor with the measured fill factor and the gap provides a measure of transport-associated loss.

This difference has become increasingly important in high-performance organic photovoltaics. As recombination losses fall and energetic offsets shrink, transport resistance can dominate part of the remaining fill-factor deficit. A device can possess good intrinsic recombination behavior and still deliver a rounded current–voltage curve because charges encounter resistance while flowing under load.

That distinction is especially important for mechanistic claims about interfaces. A treatment can reduce nonradiative recombination and simultaneously create a morphology with poorer transport. Suns-Voc gives the experimenter a way to ask whether the measured fill factor is below the recombination-limited pseudo fill factor.

Again, the measurement is not mechanism-pure.

Capacitive or transient behavior can corrupt Suns-Voc in organic devices. Low-light leakage can distort the reconstruction. External series resistance can contribute. The estimate of generation current matters. Illumination calibration matters. The device can drift between measurements. A pseudo-FF deficit is not a microscopic diagnosis that says “hole mobility is the problem.”

The 2014 methodological work on applying Suns-Voc to organic solar cells is useful precisely because it does not pretend silicon methods transfer without caveats. Organic devices can have significant capacitance and slow transients. Illumination changes can create dynamic currents. If the measurement changes light intensity faster than the device equilibrates, the reconstructed relationship can reflect history instead of steady behavior.

A good protocol therefore has to test the method on the target device rather than merely run the software.

This is why the quantum-energy transport companion leaves its numerical acceptance margin deferred until real B0 baseline data exist. The team first needs to know the repeatability of measured and pseudo fill factor, sensitivity to illumination procedure, leakage, reconstruction assumptions, and device drift.

But it closes a dangerous interpretive gap.

A device that passes the field-generation test and fails the transport-loss test cannot be promoted as a useful-work success merely because the more exotic measurement looked good.

This is an important moment in the book because the project’s scientific imagination is being constrained by an ordinary electrical measurement.

That is exactly what should happen.

Frontier research programs often accumulate specialized instruments faster than they accumulate epistemic discipline. Each technique creates its own community and vocabulary. Ultrafast spectroscopy sees excited-state dynamics. Photoelectron spectroscopy sees energetics. X-ray scattering sees morphology. TDCF sees generation. Electroluminescence sees recombination. Impedance sees dynamic electrical response. Each technique can become a lens through which the entire device is interpreted.

The current–voltage curve remains stubbornly ecumenical.

It does not care which community’s mechanism is fashionable. It integrates them.

This is not to say the current–voltage curve is simple or self-explanatory. It can conceal mechanisms just as easily as spectroscopy can. Two devices can have identical efficiency for different reasons. A contact improvement can compensate for a bulk loss. A voltage gain can compensate for fill-factor decline. The point is that useful power is a constraint that specialized mechanism claims must eventually satisfy.

The 2026 donor-dilution study also introduces a useful word from network science: percolation.

Imagine pouring conducting material into an insulating matrix. At low concentration, conducting islands may remain isolated. Increase the fraction and eventually a connected pathway spans the sample. That transition is a percolation threshold in an idealized sense.

Organic photovoltaic morphologies are more complicated, but connectivity still matters. A small amount of polymer donor can form long, tortuous pathways through a film if the morphology permits. The mass fraction alone does not tell you whether carriers have a continuous route.

This is another version of the Useful Noise argument: distribution and topology can matter more than average composition.

A film with two percent donor is not equivalent to one in which two percent of the volume is randomly sprinkled as disconnected spheres. Polymer chains, aggregation, phase separation, vertical gradients, and processing history create structure. The network can percolate at unexpectedly low fraction.

But a barely connected network is not a highway.

Connectivity is binary only in the crudest model. Real transport depends on tortuosity, energetic disorder, mobility, bottlenecks, contact with electrodes, and the spatial distribution of recombination partners. A network can technically span the device while imposing a large resistance.

One can imagine the difference between a national highway grid and a single winding mountain road. Both connect two cities. Only one supports enormous traffic without congestion. Near a percolation threshold, the carrier network can resemble the mountain road: one critical link carries disproportionate flow. A small structural change can dramatically alter resistance.

That sensitivity is a manufacturing problem. A process that creates high performance by sitting barely above a connectivity threshold may be difficult to reproduce. A process that produces a thicker margin of redundant pathways can sacrifice some microscopic ideal and gain robustness.

Again, the optimum can favor a basin rather than a peak.

The paper’s lesson is therefore not “percolation saves low donor fractions.” It is that charge generation and collection can decouple in ways that simplistic morphology intuition misses.

For the quantum-energy project, this creates a particularly dangerous false positive.

Suppose the PY-IT guest treatment changes the interfacial population and weakens electron–phonon coupling. Suppose nonradiative voltage loss improves. Suppose TDCF shows robust charge generation. The project may be tempted to say the molecular mechanism works.

But the guest component can also change domain connectivity, mobility, and transport. A device with excellent interfacial physics can lose power through ordinary topology.

The project’s new transport-loss companion protocol makes this conventional explanation co-primary rather than an afterthought.

The protocol currently refuses to set a numeric D18 threshold before real baseline data exist. This matters for the same reason the field-generation threshold is deferred. The measurement noise and natural baseline variation are unknown. A paper on another material can provide method precedent, not the acceptance margin for this one.

The future experiment will need same-device or carefully mapped sibling-device measurements across TDCF or bias-dependent photoluminescence, illuminated current–voltage behavior, Suns-Voc or pseudo-JV, stabilized power, and the relevant spectroscopic loss metrics.

This sounds exhausting because it is.

The reward is that the experiment can distinguish several kinds of partial success.

A device might show lower nonradiative loss and unchanged field generation but worse transport. That points toward morphology or mobility.

It might show robust transport but field-dependent generation. That points back toward exciton-to-CT energetics.

It might improve both but fail stabilized power because contacts or shunts changed.

It might improve fresh performance but fail durability, suggesting the favorable state is unstable.

It might improve everything without the intended spectroscopic signature, implying the device got better for a conventional reason.

Any one of these outcomes is more informative than a single efficiency number.

The cost is that the project must resist hero devices.

A hero device is seductive because the current–voltage curve makes success visible. One clean sweep. One high efficiency. One number that looks better than the baseline. Research cultures and investors both understand it immediately.

But a mechanistic platform needs population-level evidence.

If the effect is tied to a microscopic interface state, device-to-device variance is part of the story. The project has to include all functional devices except those failing predeclared quality-control criteria. It has to retain the fabrication hierarchy. A device that fails in an inconvenient way cannot simply be called an outlier after the result is known.

There is a practical reason for this beyond statistical virtue. Production yield is an economic variable. If a treatment creates one exceptional device and five failures, the champion may reveal interesting physics while the process has become worse. A manufacturing technology must account for the distribution, not only the maximum.

This creates a tension between discovery and demonstration.

Discovery often benefits from looking at the best sample because the phenomenon may be weak or rare. Demonstration requires showing the phenomenon is not rare.

A future manufacturing platform must cross that gap.

The donor-dilution paper is also a useful reminder that a mechanistic decomposition is never complete.

The reconstructed collection efficiencies come from a factorization of internal quantum efficiency into exciton harvesting, charge dissociation, and collection. That decomposition is helpful, but the factors are inferred from measurements and models with their own assumptions. The quantum-energy project therefore treats the numbers as an external experimental benchmark plus independently checked arithmetic, not as a universal causal law.

This kind of wording can feel pedantic. It protects the book from a subtle mistake.

The point is not that the low-donor device had exactly 49.3421 percent collection in some metaphysically pure sense. The point is that using the paper’s own reported factors, nearly equal dissociation is compatible with radically different device collection and IQE.

The conclusion is robust to the reporting precision even if the last decimal is not physically meaningful.

This is how quantitative reasoning should work in frontier technology: use exact arithmetic to prevent calculation mistakes, then refuse to mistake arithmetic precision for measurement precision.

The repository’s executable benchmark does exactly that. It uses ordinary floating-point calculation and an independent exact-fraction recomputation. It rejects invalid inputs. It checks a limiting case in which the factors multiply to perfect collection. It explores the effect of rounding in the printed source values.

None of this is glamorous.

It is a miniature version of the project’s philosophy.

The calculator should be more certain than the experiment. The claim should be no more certain than the experiment.

This becomes increasingly important as the project moves toward millivolt-scale effects. A calculation can report ten decimal places. A detector cannot. A fitted model can return a reorganization energy to six significant figures. The material lot may vary enough that the second digit is not stable.

The transport-loss protocol therefore does not need a complicated model to be valuable. It needs a trustworthy boundary around what a good field-generation result can and cannot prove.

That boundary now says: free charges generated are not free charges collected.

This sounds like an elementary statement.

Elementary statements become powerful when a sophisticated research program is forced to obey them.

The quantum-energy project’s future claim, if it succeeds, will have to survive a sequence of increasingly ordinary questions.

Did the interface change?

Did the electron–phonon proxy change?

Did nonradiative voltage loss fall?

Did charge generation remain robust across field?

Did charges move and collect without a new transport penalty?

Did the fill factor hold?

Did stabilized power improve?

Did the effect repeat across lots?

Did it survive aging?

The farther down the list the project moves, the less the word quantum appears.

That is a good sign.

A mature mechanism becomes a specification.

But none of those questions can be answered if the measurement system itself moves by more than the effect.

The next chapter is about the machine that has to decide whether five millivolts are real.
