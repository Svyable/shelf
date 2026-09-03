# C2PA durability and provenance limits — 2026 check

Primary-source update for Chapters 14–15 of *Proof of Human*. Checked against the current C2PA 2.4 specification and 2025–2026 product adoption. This note is a guardrail for the next prose pass; it does not change the manuscript by itself.

## What the current C2PA architecture actually does

The current C2PA specification does not treat a Content Credential simply as a separate external record that sits beside an image. A C2PA Manifest is a cryptographically signed provenance structure bound to a digital asset. The manifest is commonly embedded directly in the asset, but C2PA also supports externally discoverable manifests through “soft bindings,” including invisible watermarks and fingerprint lookup.

Primary source: C2PA, *C2PA and Content Credentials Explainer*, current specification family. The explainer says manifests are commonly embedded directly in an asset and can also be linked externally through soft bindings. It also defines “durable Content Credentials” as a combination of hard binding and soft binding so that provenance can sometimes be rediscovered even after embedded metadata is removed.

https://spec.c2pa.org/specifications/specifications/2.4/index.html

https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html

## Stripping remains a real limitation

The book’s underlying limitation argument is still sound. C2PA’s own 2.4 security guidance explicitly models “stripping C2PA Manifests” as a threat: an attacker can remove manifests from a hard-bound asset and redistribute the stripped copy. The specification treats repositories and soft bindings as mitigations, not as a guarantee that provenance will always survive redistribution.

That is a more precise claim than saying ordinary transformations always destroy C2PA or that a manifest necessarily exists only as detachable metadata. A screenshot creates a new asset and usually severs the original hard binding. Re-encoding, metadata removal, or non-C2PA-aware editing can also break or remove embedded provenance. Whether a durable credential can reconnect the derivative to an external manifest depends on the deployed soft-binding system and its robustness.

Primary source: C2PA 2.4, *Security Considerations*, especially the threat model for stripping manifests and the discussion of soft-binding collision risks.

https://spec.c2pa.org/specifications/specifications/2.4/security/Security_Considerations.html

## What a valid credential does not prove

C2PA’s own explainer draws an important boundary that matches the strongest version of the book’s argument: a valid credential does not certify that the depicted event is true. It verifies that specified provenance data is well formed, cryptographically intact, associated with the asset, and signed by an entity the verifier may or may not trust. C2PA explicitly says provenance alone cannot establish whether content is true, accurate, or factual.

That supports the staged-photograph example in Chapter 15. A credential can tell a reader who or what signed a file and what transformations are recorded. It cannot determine whether the scene in front of the lens was honest, representative, or staged.

## Counterevidence: adoption is moving, not static

The manuscript should avoid freezing the claim that major platforms generally discard or ignore Content Credentials without a dated source. Adoption changed materially in 2025–2026.

Google announced in September 2025 that Pixel 10 Camera would attach C2PA Content Credentials to JPEG captures and that Google Photos would preserve, validate, and display credentials for supported images. At Google I/O in May 2026, Google announced C2PA verification rolling out in Gemini, with Search and Chrome support planned afterward. These products do not make provenance universal, but they are direct counterevidence to any timeless formulation that large consumer platforms merely strip the signal.

Primary sources:

https://blog.google/security/pixel-android-trusted-images-c2pa-content-credentials/

https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/

## Editorial implication for Chapters 14–15

Preserve the book’s core claim but update the mechanism on the next manuscript pass:

- Describe C2PA as a signed provenance manifest cryptographically bound to an asset, commonly embedded but optionally recoverable through external durable-credential mechanisms.
- Keep manifest stripping as a documented threat, while noting that soft bindings and manifest repositories are explicit attempts to recover provenance after metadata loss.
- Avoid a blanket claim about “most major social media platforms” unless platform behavior is rechecked immediately before publication.
- Keep the stronger and more durable limitation: provenance can authenticate a history of an asset without establishing that the underlying scene or claim is true.

The strongest counterargument is therefore not that C2PA solves redistribution. It is that the architecture is already designed around metadata loss and is gaining support in major consumer products. The defensible conclusion is narrower: provenance infrastructure can materially improve traceability, yet missing credentials remain ambiguous and valid credentials remain evidence about provenance rather than a truth oracle.
