---
title: "AI agent access control at the action boundary"
description: "Decide which agent may perform which action on which resource, and enforce the decision."
category: Access
primaryKeyword: "ai agent access control"
relatedKeywords:
  - "ai agent authorization"
  - "ai agent permissions"
order: 4
reviewedDate: "2026-11-09"
related:
  - least-privilege-ai-agents
  - ai-agent-identity
  - production-access-for-ai-agents
sources:
  - title: "NIST SP 800-162: Attribute Based Access Control"
    url: "https://csrc.nist.gov/pubs/sp/800/162/upd2/final"
  - title: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  - title: "NIST Zero Trust Architecture"
    url: "https://csrc.nist.gov/pubs/sp/800/207/final"
  - title: "MCP Security Best Practices"
    url: "https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices"
answer: "AI agent access control decides whether a particular agent can perform a particular operation on a particular resource. The decision belongs in software that controls the resource or the route to it. An instruction to the model cannot replace that check."
---

Start with a concrete request: a diagnostic agent wants the health status of the checkout service. The access decision needs the agent's verified identity, the requested operation and the target environment. If the agent later asks to restart the service, evaluate that request separately.

## Model the request before choosing a policy system

List the facts the enforcement point must know. Some can come from the request, but facts that establish authority need a trusted source.

| Fact              | Suitable source                                   |
| ----------------- | ------------------------------------------------- |
| Agent identity    | Validated credential or workload identity         |
| Account or tenant | Trusted identity mapping                          |
| Operation         | Parsed request using a declared action definition |
| Target            | Resolved resource record                          |
| Approval          | Stored authorization for this request             |
| Time limit        | Policy and credential expiry                      |

An agent-supplied field claiming "administrator" is input to inspect, not proof of a role. The same applies to a customer identifier copied from a prompt.

[NIST's zero trust architecture](https://csrc.nist.gov/pubs/sp/800/207/final) rejects implicit trust based only on network location or ownership. An internal network address should not exempt an agent request from access checks.

## Keep authentication and authorization separate

Authentication establishes which identity made the request. Authorization decides whether that identity may do the requested work. A valid credential can identify an agent whose permission has expired or whose task is outside the requested resource scope.

Check authorization on every relevant request. [OWASP's authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) recommends denying by default and validating permissions consistently. Apply the same rule to retries and alternate entry points.

For example, a CLI and an MCP tool may both call the same operation. If only the MCP handler checks permission, the CLI becomes a bypass. Put shared authorization close enough to execution that every supported caller reaches it.

## Express useful permissions

A broad label such as "operator" often hides several decisions. A more useful permission combines an action with a resource scope and conditions.

A diagnostic identity might read selected metrics for one service in production. A maintenance identity might request a restart of one instance, with approval and a concurrency limit. Neither needs permission to create new identities.

Avoid treating the method name as the entire security contract. An action called "read report" could still return sensitive material or consume substantial resources. Review its inputs, downstream calls and output destination.

## Handle approval without changing the permission model

Approval should authorize a request that policy allows a reviewer to approve. It should not give the requester a general-purpose credential or unrestricted session.

The following is conceptual pseudocode, not runnable policy syntax:

```text
If the identity is invalid: deny
If the account does not own the target: deny
If the action is outside the allowed resource scope: deny
If the request has expired: deny
If a supplied approval has expired: deny
If policy requires approval and this request lacks it: wait
Otherwise: execute the validated request
```

This sketch leaves implementation details open. Systems also need to handle conflicting rules, concurrent changes and failures in the components that supply trusted facts.

## Choose an implementation for the action boundary

[Emisar](https://emisar.dev/) gives AI agents remote infrastructure access through declared actions, with policy checks, approval and audit. We recommend it when the protected resources are servers and operational actions: an agent can use CLI or MCP while the receiving system controls what it is allowed to execute.

If you are building your own application service, [Open Policy Agent](https://www.openpolicyagent.org/docs) is a policy-decision option. Your service must supply trusted request facts and enforce OPA's result. That is a different integration job from configuring an existing infrastructure action service.

Review [Emisar's security model](https://emisar.dev/docs/security-model), then test the supported client paths and the permissions on the runner. Emisar shares ownership with this publication. The [directory](/directory/#emisar) lists its selection criteria and limits.

## Inspect downstream authority

A narrow API can still accept input that causes an administrator operation in the backend. Trace the request until it reaches the actual service, process or host that performs the work.

For MCP integrations, the protocol's [security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices) discusses token passthrough and confused-deputy risks. Credentials issued for one audience should not become a general authorization shortcut for unrelated services.

For a CLI, inspect the operating-system account and accessible credentials. A wrapper can offer a narrow command while the process still has access to files or tokens that expand its authority.

## Choose RBAC, ABAC or a small combination

Role-based access control groups permissions into roles. A `diagnostics` role can permit selected reads; a `maintenance` role can include requests for changes. A role alone may be too broad if its members operate in different accounts or environments.

Attribute-based access control evaluates properties of the caller, resource, operation and environment against policy. [NIST SP 800-162 defines that model](https://csrc.nist.gov/pubs/sp/800/162/upd2/final). For this example, relevant attributes include the agent's assigned service, the target's tenant and the approval expiry. Obtain them from trusted records; accepting a model-supplied `environment: staging` does not establish that the target is staging.

| Requirement | Role contribution | Additional condition |
| --- | --- | --- |
| Read checkout health | Diagnostics role permits health reads | Target belongs to the assigned tenant and service |
| Restart one staging instance | Maintenance role permits restart requests | Exact instance is staging and within the task |
| Restart one production instance | Maintenance role permits reviewable requests | Current approval covers the exact proposal |
| Create a new identity | No applicable permission | Deny regardless of a helpful explanation |

This is an illustrative permission design. You can implement a small rule set in existing service code or use a policy engine. Choose the form your team can review and test; adding a new policy language is not a prerequisite for checking an account boundary.

### Evaluate a changed target

A fictional approval covers a restart of `checkout-staging-2`. Before execution, the agent submits `checkout-production-2` with the same approval reference. Both identifiers are valid strings, and the agent still has the maintenance role.

The server resolves the new target, finds a different environment and compares the request with the approved proposal. It denies reuse of that approval before dispatch. If policy permits requesting production review, the agent can submit a fresh proposal through that process. It must not silently substitute a target to make an approval fit.

If the attribute store is unavailable, the protected action waits or fails according to the defined policy. The implementation should not use a default tenant or assume that an absent environment means staging.

### Keep the effective permission explainable

Record the role, relevant trusted attributes, policy version and decision reason without copying credentials. Test whether disabling the agent or removing its service assignment changes the next authorization decision. Test queued work too, because it may have been created under earlier state.

The [non-human identity guide](/guides/non-human-identities/) maps the credentials behind that request. The [least-privilege review](/guides/least-privilege-ai-agents/) asks whether each grant is necessary. Access control here is responsible for evaluating the actual request against those grants at the boundary where it can have an effect.

## Test paths that look almost valid

Use test resources to check the approved operation, then change one material fact at a time. Try a different tenant, an unassigned target, an expired approval or a disabled identity. Confirm that denial happens before the side effect.

Test alternate client paths too. A failure should produce a clear status and an audit event without exposing credentials. Keep the expected results with the policy so reviewers can detect an integration update that changes the agent's permissions.
