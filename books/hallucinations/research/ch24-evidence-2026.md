# Chapter 24 evidence update — The Synthetic Witness

Research checked September 8, 2026.

## Current C2PA standard and conformance

C2PA describes Content Credentials as an open technical standard for recording and verifying provenance information about digital content. Its current 2.x series uses cryptographically signed, tamper-evident manifests to carry assertions about origin and editing history.

In February 2026, C2PA announced Content Credentials 2.3. The release added support for live video and additional file types, more specific editing-history descriptions, improved cloud-linked information, and security/validation changes.

C2PA also launched a formal Conformance Program in late 2025. The program evaluates generator and validator products against the specification plus security requirements, maintains public conforming-product and trust lists, and is intended to improve interoperability and confidence that implementations handle C2PA data correctly.

Primary sources:

- C2PA, *The C2PA Launches Content Credentials 2.3 and Celebrates 5 Years of Impact Across the Digital Ecosystem* (February 9, 2026): https://c2pa.org/the-c2pa-launches-content-credentials-2-3-and-celebrates-5-years-of-impact-across-the-digital-ecosystem/
- C2PA, *Conformance*: https://c2pa.org/conformance/
- C2PA FAQ: https://c2pa.org/faqs/

### Boundary

Conformance supports confidence that a product implements the provenance standard and security requirements correctly. It does **not** establish that a depicted event is true, representative, unstaged, or correctly captioned.

C2PA's FAQ also preserves an important limitation around ingredient provenance. A credential can report that ingredient credentials were checked when an asset was composed, but complete verification of each ingredient's provenance requires access to the ingredient's own provenance data. Missing provenance can remain missing.

## Concrete capture case: Leica M11-P

Leica announced the M11-P in October 2023 with in-camera Content Credentials support. When the feature is enabled, images receive a digital signature backed by a certificate, allowing information about the camera/source and subsequent editing history to be examined with compatible verification tools.

Primary sources:

- Leica Camera, *New: Leica M11-P* (October 2023): https://leica-camera.com/en-US/press/new-leica-m11-p
- Leica Camera, *Content Credentials in the M11-P*: https://leica-camera.com/en-int/photography/content-credentials

### Strongest safe formulation

The Leica case shows a practical shift from trying to infer authenticity from pixels after the fact toward attaching verifiable provenance at capture. It does **not** make the photograph truthful. A signed camera can still record a staged event, an unrepresentative frame, an incorrect clock, or an artifact later paired with a false interpretation.

## 2026 adoption context

C2PA announced in July 2026 that TikTok had joined its Steering Committee after what the coalition described as early, scaled implementation experience with Content Credentials. This is evidence that provenance standards are being deployed at platform scale, but the chapter does not need to make claims about the exact coverage, persistence, or user comprehension of TikTok credentials without platform-specific evaluation.

Source:

- C2PA, *C2PA Welcomes TikTok to Steering Committee, Advancing the Adoption of Content Credentials at a Global Scale* (July 27/28, 2026): https://c2pa.org/c2pa-welcomes-tiktok-to-steering-committee/

## Chapter-level counterarguments

The chapter should retain all of these boundaries:

- provenance is evidence about content history, not a truth oracle;
- absence of Content Credentials is not evidence that an artifact is synthetic or false;
- provenance can be stripped or lost through screenshots, export, transcoding, or unsupported platforms;
- a genuine captured artifact can still be misleading because staging, framing, captions, selection, and interpretation sit outside simple capture authenticity;
- visible badges can themselves become overtrusted, so interfaces must communicate what the signal does and does not mean;
- synthetic or reconstructed content is not inherently deceptive when its status travels with it.

## Editorial proposition

The chapter's strongest claim is narrower than "we can no longer trust images." As generation makes appearance a weaker guide to origin, the information environment has to move trust upstream: from how convincing an artifact looks toward inspectable evidence about capture, transformation, source lineage, and contact with the world.