# Chapter 13 evidence notes — The API Key

## Core claim

Machine permission is more granular and faster than ordinary human permission, but its governance depends on lifecycle design: identity, scope, duration, restriction, quota, observability, rotation, revocation, and recovery. An API key can identify or meter a client without being a sufficient authorization model, and credentials should carry no more authority than the task requires.

## Sources

### AWS — Usage plans and API keys for REST APIs in API Gateway

- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html
- AWS describes API keys as values distributed to application developers to identify clients and associate them with selected API stages, throttling targets, and quotas.
- AWS explicitly warns not to use API keys alone for authentication or authorization and recommends IAM roles, Lambda authorizers, or Cognito for access control.
- AWS also cautions that usage-plan throttling and quotas are best-effort targets rather than hard ceilings.

### AWS — API Gateway request throttling

- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html
- API Gateway can apply account, stage, method, and per-client throttling and returns HTTP 429 responses when requests exceed configured rates/bursts.
- Supports the chapter's treatment of rate limiting as queueing and conditional denial at machine speed.

### Google Cloud — Best practices for managing API keys

- https://docs.cloud.google.com/docs/authentication/api-keys-best-practices
- Current guidance recommends restricting keys, avoiding public exposure, deleting unneeded keys, isolating credentials, monitoring/logging use, and rotating keys periodically.
- Google recommends stronger short-lived and least-privilege credentials for sensitive production authorization where appropriate.
- Used to support scope, blast-radius, attribution, monitoring, rotation, and expiry principles.

### RFC 6749 — OAuth 2.0 Authorization Framework

- https://www.rfc-editor.org/rfc/rfc6749.html
- Defines access tokens as credentials representing specific scopes, lifetimes, and other access attributes.
- Section 3.3 formalizes access-token scope.
- The framework lets a resource owner grant a client limited authorization without giving the client the resource owner's password.
- The RFC advises clients to request minimal scope appropriate to the task.

### RFC 6750 — Bearer Token Usage

- https://www.rfc-editor.org/rfc/rfc6750.html
- Defines bearer-token semantics: possession of a bearer token is sufficient to use it within its authorized context unless additional protections apply.
- Supports the chapter's claim that digital copying can become impersonation and that bearer credentials need strong confidentiality and bounded authority.

## Boundaries and counterevidence

- The chapter does not claim that API keys are inherently insecure or obsolete. They are useful for identification, metering, quotas, and low-risk access when appropriately restricted.
- OAuth is not presented as a universal replacement for API keys; different architectures require different identity and authorization mechanisms.
- Short-lived credentials and rotation improve security but can increase operational complexity and create outages if renewal fails.
- Rate limits and quotas are not always exact hard ceilings; distributed implementations can include burst behavior and best-effort enforcement.
- Detailed error messages can help legitimate clients recover but can also expose information useful to attackers; explanation should be proportionate to threat.
- Fail-open versus fail-closed behavior depends on consequence. A recommendation service and a money-transfer authorization service should not necessarily degrade the same way.
- Credential isolation improves attribution but excessive credential proliferation can create management burden of its own.
- API portability can reduce dependency while common-denominator standards can also constrain service differentiation and innovation.

## Design implications under test

1. Separate client identification, authentication, authorization, and usage metering rather than treating a key as a master answer to all four.
2. Scope authority narrowly enough that compromise or behavioral error has a bounded blast radius.
3. Prefer expiring or rotating credentials as consequence rises, and test renewal before expiry becomes an outage.
4. Restrict where and how credentials can be used when the platform supports it.
5. Make quotas and rate limits explicit parts of the permission contract and design clients to handle structured refusal such as throttling.
6. Isolate identities enough to preserve auditability across applications, workloads, and agents.
7. Maintain fast emergency revocation but separate temporary containment from permanent exclusion.
8. Design graceful degradation or fail-closed behavior intentionally according to the risk of operating without the permission service.
9. Track credential dependencies so revocation, provider failure, or policy changes do not become unexamined single points of failure.
10. Carry purpose and policy alongside technical capability, especially when an autonomous agent can decide when to invoke a granted permission.

## Forward link

Chapter 14 moves beyond checking a credential. The Algorithm at the Door examines systems that predict whether permission should be granted in the first place—and how statistical classification changes explanation, contestability, and responsibility.