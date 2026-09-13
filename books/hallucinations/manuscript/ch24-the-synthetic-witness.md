# The Synthetic Witness

In 2023, Leica released a camera that could sign a photograph at the moment of capture.

The M11-P did not make photography truthful. It did something narrower and, in an age of synthetic media, increasingly valuable: when its Content Credentials feature was enabled, the camera could attach a cryptographically verifiable record identifying the device and preserving information about the image's origin and later edits.

That distinction is the chapter.

For most of history, evidence had to pass through matter. A witness stood somewhere. A camera faced something. A microphone captured pressure waves. A thermometer changed because the temperature changed. Ink touched paper. None of those processes guaranteed truth. Witnesses lie. Cameras crop. Recordings can be staged. Instruments drift. Documents are forged.

But artifacts usually carried some physical history linking them to events outside the account itself.

Generative systems weaken the usefulness of appearance as evidence of that link. A photograph can depict a scene no camera saw. A voice can say words its owner never spoke. A video can contain gestures assembled from patterns rather than captured from a room. Text has always been cheap to invent; now the forms that once suggested physical contact with the world can be synthesized too.

This creates what I will call the synthetic witness.

The phrase is deliberately unfair to the word *witness*. A witness matters because of a relationship to an event. A generative system may have no such relationship. It can nevertheless produce an artifact that resembles the output of someone or something that did.

The problem is therefore not simply fake media. It is that old trust shortcuts become less reliable. We used to infer some history from the kind of object in front of us. A photograph implied a camera. A recording implied a microphone. An operational log implied that an operation had occurred. Those implications are now easier to imitate.

The first answer to this problem was detection: build classifiers that distinguish generated material from captured material. Detection remains useful. It is also a difficult foundation for permanent trust. Generators improve. Real files are compressed, edited, transcoded, screenshotted, recombined, and passed through pipelines containing both captured and generated elements. A photograph can begin in a camera, receive ordinary color correction, use generative fill to remove an object, acquire a synthetic background extension, and then be flattened by a social platform.

At that point, asking whether the image is simply *real* or *fake* throws away the interesting information.

Provenance asks a better question: what can we establish about how this artifact came to exist?

That is what systems such as C2PA's Content Credentials are designed to help answer. C2PA is an open technical standard for attaching tamper-evident, cryptographically signed assertions about a digital asset's origin and editing history. Its current 2.x series has moved beyond a laboratory idea: the coalition launched a formal conformance program in late 2025, published Content Credentials 2.3 in February 2026, and now maintains trust and conforming-product infrastructure intended to make credentials interoperable across implementations.

The standard has also broadened. Version 2.3 added support for additional file types and live video, richer editing descriptions, cloud-linked information, and stronger validation behavior. That matters because provenance is only useful if it survives the kinds of media pipelines people actually use.

The Leica camera makes the idea tangible. The photograph can begin with a signed claim about the camera and capture process instead of asking a later detector to infer its history from pixels alone.

That is genuinely better evidence.

It is not truth.

A signed camera can photograph a staged scene. The clock can be wrong. A photographer can frame a crowd misleadingly. A genuine image can receive a false caption. A person can stand in front of a real microphone and lie. Provenance can establish facts about the artifact's lineage while leaving the proposition someone draws from the artifact completely open.

This is not a defect in provenance. It is the reason provenance is useful.

A system that claimed to certify truth would become another oracle. A system that preserves inspectable history gives the next person more evidence without pretending to finish the judgment for them.

Consider two photographs of the same political rally. One carries a verifiable chain linking it to a capture device and documenting later edits. The other has no provenance information.

The first photograph deserves a different evidentiary posture, but not automatic belief. It may still be unrepresentative. Its caption may misidentify someone. The event itself may have been choreographed. The second photograph may be entirely genuine; absence of credentials cannot reasonably become proof of fakery while billions of cameras, archives, screenshots, and historical collections lack them.

Provenance changes the weight of evidence. It does not replace judgment.

C2PA's own documentation preserves this boundary in another useful way. A credential can record ingredients used to compose an asset, and it can record that ingredient credentials were checked when the composition occurred. But full verification of an ingredient's provenance still depends on access to the underlying provenance data. Even a provenance chain has missingness, dependencies, and limits.

That is exactly the kind of honest incompleteness this book has been arguing for.

The synthetic witness problem is larger than images and audio. A language model can reconstruct a meeting from scattered notes. It can turn a partial transcript into a narrative. It can infer what probably happened between recorded events. It can generate a quote-like sentence that nobody actually said.

Those operations can be useful. The epistemic trouble begins when their status changes without being noticed.

A model's reconstruction labeled as reconstruction can help a historian or investigator generate hypotheses. The same reconstruction copied into a report as an observed fact becomes something else. A generated illustration labeled as an illustration can teach. The same image detached from its label and recirculated as a photograph acquires a false relationship to the world.

Synthetic media therefore has a migration problem.

Context travels badly. Captions are cropped. Screenshots lose metadata. Export pipelines strip attached information. Reposts separate an artifact from the page that explained it. A dramatized audio reconstruction enters a compilation. The artifact survives while the epistemic status falls off.

The original chapter called this citation laundering in visual form. The analogy is worth keeping because the mechanism is the same: weak or conditional provenance is transformed into an object whose presentation implies stronger support than the underlying evidence warrants.

Cryptography helps, but it cannot solve the social part by itself. Standards matter only if tools preserve and display them. A signed provenance record can be stripped by export. A platform can ignore it. A screenshot can flatten the content into pixels. A user can copy the visible portion and leave the metadata behind.

The system also has to survive its own success. Once a badge becomes familiar, people will be tempted to overread it.

We have seen this before. A browser lock icon says something about an encrypted connection; it does not certify that the operator of the site is honest. A verification badge on a social platform has meant different things under different policies. A Content Credential can provide verified information about content history; it cannot certify the truth of the scene or claim.

Badges compress complicated state. That is why they are useful and dangerous at the same time.

The interface has to teach the boundary of the signal.

This makes C2PA's conformance work more interesting than a specification number. A provenance ecosystem needs trust not only in the signed artifact but in the products that create, validate, and display the provenance information. The coalition's conformance program subjects generator and validator products to common specification and security requirements and places conforming products on public lists.

That still does not make the picture true. It makes the claim *this product handled the provenance record according to the standard* more inspectable.

The distinction may sound fussy until evidence matters.

Law, journalism, intelligence, science, and ordinary business records already separate authenticity from truth in different ways. A court may ask whether an exhibit is what a party claims it is. A journalist may ask whether a video came from the claimed place and time. An intelligence analyst may ask who could have created a recording and whether the file was altered. A scientist may ask whether an image was produced by the instrument and pipeline named in the paper.

Generative media does not abolish those professions. It raises the value of chain of custody.

There is a recurring inversion here. When copying becomes cheap, originality records become more valuable. When editing becomes difficult to see, edit history becomes more valuable. When generated media becomes abundant, capture provenance becomes more valuable.

The scarce thing moves upstream.

For text, the analogous scarcity is often first-hand observation. A model can write a thousand summaries of a hurricane, but somebody or something still has to measure the wind. It can produce a thousand accounts of a trial, but the docket, transcript, order, and people who were in the room remain the contact points. It can write a thousand market reports, but somebody still has to file the audited numbers, talk to customers, inspect the plant, count the containers, or record the transaction.

The more synthesis we can manufacture, the more valuable the evidence that synthesis cannot invent on its own.

This has an economic consequence the information industry has not solved. If audiences accept endless synthetic summaries as substitutes for original reporting, field measurement, archival work, or primary research, the market can underpay the people and institutions gathering new evidence. Synthesis becomes more abundant while the evidence supply beneath it becomes thinner.

A healthy AI ecosystem needs witnesses.

They do not all have to be human. A weather station can be a witness. A satellite can record that something occupied a place at a time. An authenticated transaction can establish that money moved. A laboratory instrument can generate primary evidence because it measured rather than imagined.

The useful distinction is not human versus machine.

It is contact versus reconstruction.

Observed versus generated. Measured versus inferred. Captured versus synthesized. Authenticated versus unattributed.

Those categories are imperfect, but they travel across media far better than a simple real/fake label.

The same problem appears inside AI products when systems describe their own actions.

A model says, "I checked the source."

Did it?

If the software actually called a retrieval tool, opened the source, and recorded the result, that statement can be supported by a trace. If the model generated the sentence because "I checked" is the sort of reassurance that follows a request to verify, the system has produced synthetic process testimony.

That can be more dangerous than an ordinary factual error because the claimed process becomes a reason to trust the answer.

Process verbs should therefore be treated as auditable claims.

*Opened. Calculated. Retrieved. Sent. Verified. Remembered. Called.*

Where those words describe software actions, the product should be able to connect them to actual operations rather than asking the user to trust the model's autobiography.

This principle becomes crucial in agent systems. If an agent reports that it confirmed a customer's shipping address before ordering, the audit trail should show what source was consulted, when, and what value was returned. Otherwise the system can become a witness to its own imaginary diligence.

Human institutions already distrust important self-reports without records. We ask for receipts, logs, signatures, timestamps, test results, and chain-of-custody forms. Generative systems make those habits more important, not obsolete.

There is an easy way to tell this story as decline: we used to trust photographs and recordings, and now we cannot.

The history was never that clean. Photographs were manipulated. Recordings were edited. Eyewitnesses misremembered. Documents were forged. The old trust heuristics worked often enough that we forgot they were heuristics.

Synthetic media exposes their weakness, but it can also push us toward better evidence systems than we had before. A signed capture history can tell us more about an image's provenance than unaided inspection of the pixels. A machine transcript linked to time-coded audio can be easier to audit than handwritten notes. An AI summary with claim-level source links can be more transparent than a human executive summary whose evidentiary route disappeared with the author.

That is the optimistic path: lower the cost of production while increasing the inspectability of the route.

It requires resisting one final mistake. Provenance is not a moral tax on synthetic creativity. Fiction does not owe us documentary status. Synthetic art can be openly synthetic. Simulation, reconstruction, and speculation are all useful forms.

The problem begins when the artifact crosses an epistemic boundary without carrying its status.

A generated scene presented as generated is an invention. The same scene presented as documentary evidence is a false witness. A reconstruction marked as inference can help an investigation. The same reconstruction entered into a database as observation can become the rumor Chapter 25 is about.

The synthetic witness is dangerous not because it never saw the world, but because an information system can forget that it didn't.