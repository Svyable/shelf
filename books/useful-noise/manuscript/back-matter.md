# Back Matter

**A note on evidence**

*Useful Noise* was written while the research program it describes was still in motion. That timing is intentional. Most technology histories are reconstructed after success or failure has simplified the story. This book tries to preserve the more useful middle state: external experiments exist, models and protocols exist, a commercial bridge has been specified, and several of the decisive target-system experiments have not yet been performed.

The manuscript therefore uses an evidence hierarchy inherited from the `Svyable/quantum-energy` project. Established external evidence means a published experiment or result exists in the cited system. A project model or synthetic result means the calculation has been performed with declared assumptions but is not a measurement of the target device. An engineering assumption is a condition the program is relying on provisionally. A prospective protocol describes an experiment before physical target data exist. An experimental result refers only to measured data at the level actually obtained. A novel invention concept is a proposed architecture, not a novelty or patentability conclusion.

Those categories matter most where the story is tempting. The book does not claim that photosynthesis requires long-lived room-temperature electronic coherence. It does not claim that environment-assisted quantum transport has been demonstrated in the project’s target solar-cell stack. It does not claim that the D18/PY-IT/eC9 arms have produced a commercial improvement. It does not claim that a synthetic Marcus–Stark optimum is the optimum of any real material. It does not claim that a five-substrate mechanism study can support a confirmatory classification. It does not claim that a room-temperature polariton is a room-temperature fault-tolerant quantum computer.

The strongest physical claims in the book come from external experiments: controlled environment-assisted transport in engineered quantum systems; room-temperature polariton transport in layered perovskites; strong-coupling and cavity effects in light-harvesting and organic-photovoltaic systems; interfacial electron–phonon-coupling and nonradiative-loss relationships in modern organic solar cells; the 2026 field-dependent-generation voltage–fill-factor trade-off; and the 2026 charge-generation-versus-collection counterexample in donor-diluted organic photovoltaics. The project-specific claims are narrower: how `Svyable/quantum-energy` has interpreted those results, what it has modeled, which controls it has added, and which target experiments remain prospective.

A detailed chapter source map and falsification trail is maintained in `research/README.md`. The public research repository itself is also intended to remain inspectable at `https://github.com/Svyable/quantum-energy`. Readers should prefer its reviewed `main` branch over unmerged pull requests when checking the project’s current canonical state.

**A small glossary**

**Exciton.** A bound electronic excitation commonly described as an electron and hole coupled by their mutual attraction. In many organic and low-dimensional semiconductors, an absorbed photon initially creates an exciton rather than immediately producing freely conducting charge.

**Charge-transfer state (CT state).** An interfacial electronic state in which electron and hole occupy different molecular regions or materials while remaining Coulombically associated. CT states are central to charge generation and recombination in organic photovoltaics.

**Phonon.** A quantized collective vibration of a solid or molecular environment. In this book the term is sometimes used alongside broader molecular vibrational and vibronic degrees of freedom; the exact physical mode matters in detailed models.

**Electron–phonon coupling (EPC).** The interaction between electronic states and nuclear or lattice motion. EPC can contribute to nonradiative energy loss and can also participate in transitions and transport. “Less EPC” is not a universal optimization rule.

**Reorganization energy.** A measure used in electron-transfer theories for the energetic cost associated with nuclear and environmental rearrangement between electronic states. It is a model parameter with physical interpretation, not a generic synonym for noise.

**Huang–Rhys factor.** A dimensionless measure of coupling between an electronic transition and a vibrational mode in simplified vibronic descriptions.

**Dephasing.** Loss of phase coherence among components of a quantum state. In environment-assisted transport, intermediate dephasing can under some conditions improve transport by disrupting localization, while excessive dephasing suppresses motion.

**Environment-assisted quantum transport (ENAQT).** A class of phenomena in which interaction with an environment can improve quantum transport relative to both near-isolated and excessively noisy limits under appropriate network and timescale conditions.

**Open quantum system.** A quantum system treated as exchanging energy or information with degrees of freedom outside the chosen subsystem boundary. Nearly every real material system is open; the engineering issue is which interactions matter to function.

**Polariton.** A hybrid light–matter quasiparticle formed when an optical mode and a material excitation are strongly coupled. Exciton-polaritons can inherit transport properties from their photonic component and interactions from their matter component.

**Strong coupling.** A regime in which light–matter interaction is strong enough relative to losses that hybrid eigenstates form, often observed through mode splitting and anticrossing. Strong coupling is a state-identification claim, not automatically a useful-device claim.

**Fabry–Pérot cavity.** An optical cavity typically formed by two partially reflecting mirrors separated by a spacer. The cavity selects resonant optical modes and can reshape electromagnetic fields within a thin-film device.

**External quantum efficiency (EQE).** In photovoltaics, the number of collected electrons per incident photon as a function of wavelength.

**Internal quantum efficiency (IQE).** The number of collected electrons per absorbed photon. Comparing EQE and absorptance helps separate optical-input changes from post-absorption conversion changes.

**EQE_EL.** External electroluminescence quantum efficiency: emitted photons per injected electron under appropriate electrical operation. It is used in nonradiative-voltage-loss analysis, with injection conditions and absolute calibration requiring care.

**Nonradiative voltage loss (ΔVnr).** The portion of photovoltaic voltage loss associated with nonradiative recombination relative to the radiative limit in the chosen analysis framework.

**Fill factor (FF).** A measure of how closely a solar cell’s current–voltage curve approaches the ideal rectangular shape between short-circuit current and open-circuit voltage. High voltage and current are not sufficient if fill factor collapses.

**Pseudo fill factor (pFF).** A fill-factor estimate reconstructed from measurements such as Suns-Voc under assumptions intended to reduce selected transport-resistance contributions. The difference between pFF and measured FF can serve as a conventional transport-loss diagnostic but is not mechanism-pure.

**TDCF.** Time-delayed collection-field measurement, used to probe charge generation and recombination under controlled pre-bias and extraction conditions. Good TDCF-derived generation does not prove good steady-state collection.

**FTPS / sensitive EQE.** Highly sensitive optical/electrical methods used to probe weak sub-gap absorption, charge-transfer tails, disorder-related features, and reciprocity relationships in photovoltaic devices.

**Urbach energy.** A parameter describing the exponential absorption edge in many disordered semiconductors. It can correlate with energetic broadening but should not automatically be treated as a direct measurement of static disorder.

**Soft sensor.** A model that estimates a difficult or slow-to-measure process state using easier measurements. The project’s prospective example uses witness optical spectra to predict voltage-loss-related or latent interface state.

**Transfer standard.** A stable reference artifact measured across sessions or facilities to compare measurement systems and quantify drift or disagreement.

**Prospective validation.** A prediction that succeeds on blinded, held-out, or otherwise precommitted data rather than being fitted retrospectively to the same observations used to form the claim.

**A reader’s test for futurist claims**

When a result in this field sounds astonishing, ask what changed evidentiary class. Did a model become a measurement? Did an external material become the target material? Did an optical effect become electrical work? Did one device become a repeatable lot? Did a fresh result become a durable one? Did a laboratory recipe become a manufacturable process? Did a correlated proxy become a causal mechanism? Did a prospective threshold get frozen before the data or after it?

The question is not meant to drain the excitement from frontier science. It is meant to locate it accurately.

A genuinely strong result becomes more interesting when we know what it had permission to fail against.

**Closing note**

The phrase “quantum energy” has been used often enough to deserve suspicion. This book uses it in the least mystical sense available: ordinary conserved energy moving through matter whose states, transitions, couplings, and losses are governed by quantum mechanics. No hidden reservoir is proposed. No thermodynamic loophole is required.

The future described here would be consequential precisely because it remains physical. A few millivolts preserved. An excitation routed farther. A loss channel suppressed without breaking a useful transition. A process state measured cheaply enough to control. A material that survives long enough to matter.

If those achievements become routine, the adjective quantum will eventually become less important than the specification.

That would be the best ending for the idea.