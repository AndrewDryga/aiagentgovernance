---
title: "Non-human identities and AI agents"
description: "Connect service accounts, workload identities and delegated users to the agent work they authorize."
category: "Access"
primaryKeyword: "non human identities"
relatedKeywords: ["non-human identity", "ai agent identity management"]
order: 20
reviewedDate: "2026-11-09"
answer: "Non-human identities identify software such as services, workloads and applications. AI agents often use these identities to call tools and access other systems. Governing an agent therefore requires mapping its deployment and human owner to each downstream identity, credential and permission, while keeping any requesting user and approving person distinct."
related: ["ai-agent-identity", "ai-agent-access-control", "least-privilege-ai-agents"]
sources: [{"title": "Microsoft Defender non-human identities", "url": "https://learn.microsoft.com/en-us/defender-xdr/investigate-non-human-identities"}, {"title": "SPIFFE overview", "url": "https://spiffe.io/docs/latest/spiffe-about/overview/"}, {"title": "AWS IAM security best practices", "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}]
---

An account named `automation` can serve a build pipeline, an old scheduled script and a new AI agent. A request from that account does not tell an investigator which deployment chose the action or who owns its permissions.

The broader identity estate matters even if the agent platform has its own ID. Trace the request until it reaches the account that the target system actually authorizes.

## Distinguish identity, credential and owner

An identity is the software principal the receiving system recognizes. A credential helps prove that identity. An owner is the person or team responsible for the work. Rotating a credential should not erase the relationship between the identity and its owner.

[Microsoft Defender's documentation](https://learn.microsoft.com/en-us/defender-xdr/investigate-non-human-identities) includes service principals, service accounts and connected OAuth applications in its non-human identity scope. These categories extend well beyond AI agents. Your inventory should connect them where used, rather than relabel every service account as an agent.

A model name is also not a workload identity. Several deployments can use the same model with different credentials and permissions.

## Map one request through its identities

This hypothetical diagnostic workflow has several participants:

```text
Engineer asks for checkout diagnosis
  -> checkout-investigator deployment chooses a diagnostic
  -> diagnostics-tool service validates the request
  -> checkout-reader principal accesses the target
  -> a separate human reviewer authorizes any later change
```

| Identity role | Evidence to retain | What it must not silently imply |
| --- | --- | --- |
| Requesting person | Verified user and task reference | Permission for every action that might help |
| Agent deployment | Stable deployment ID and configuration | Identity of the model provider |
| Tool service | Authenticated service principal | Unrestricted authority for all callers |
| Target principal | Effective grants on the receiving system | That the requester owns every reachable resource |
| Reviewer | Decision, scope and expiry | A reusable administrator session for the agent |

The [agent identity guide](/guides/ai-agent-identity/) explains implementation choices for this chain. The [expanded inventory](/resources/agent-inventory-expanded.csv) provides fields for its identity references. Do not put token values or private keys in that record.

## Decide whether the agent acts for a user or under a service role

For a user-driven task, the receiving service may need to enforce both the person's access and the agent's assigned capability. A person who can view a record should not automatically gain a new export route merely because an agent's service account has broad access.

A scheduled operational agent may instead work under a dedicated service role. In that case, document who approved the role, what task it serves and where its output goes. Do not manufacture a human requester to make an unattended action look delegated.

If one agent delegates work to another, preserve the originating task and verified scope. Free-text claims such as "the user approved this" cannot establish downstream authority. The [access-control guide](/guides/ai-agent-access-control/) covers checks against trusted state.

## Review credential lifetime and audience

[AWS recommends workload roles and temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). [SPIFFE defines workload identity standards](https://spiffe.io/docs/latest/spiffe-about/overview/), including short-lived identity documents. Use the mechanisms supported by your environment and verify their actual renewal and validation paths.

A short lifetime limits the period in which a credential can be reused. It does not narrow the permissions during that period, undo an accepted operation or prove immediate revocation. Test each of those properties separately.

For each credential reference, record the intended service or audience, where the credential becomes available, its permission source and the procedure for rotation or removal. Inspect whether a coding environment can access a production credential it does not need.

## Resolve shared credentials carefully

When several deployments share one identity, start by finding every use and owner. A blind rotation can interrupt unrelated work; leaving it shared can make individual suspension and attribution difficult.

A practical migration is to define distinct deployment identities where supported, give each the required scope, test the ordinary and denied paths, then remove the old route after its consumers move. Keep the transition visible in the inventory and audit records.

If the platform requires sharing, document the limitation. Add reliable request identifiers and a trusted mapping from caller to deployment at the gateway. Understand that a self-reported agent name is weaker evidence than authenticated attribution.

## Review effective permissions at the target

Permission labels can hide broad effects. A role allowing workload creation may indirectly allow use of other identities or mounted resources. A reporting account may expose more records than the agent's assigned task requires.

Use the [least-privilege review](/guides/least-privilege-ai-agents/) to connect each grant to a purpose. Test another tenant's resource, a different target and an expired or disabled identity. Confirm denial before the protected read or change.

Retain the requesting deployment's identity in the event trail even when a tool service executes under another account. Without that link, a target log may accurately report the service account while leaving the agent's decision unattributed.

## Retire the access with the deployment

When the agent is retired, remove its triggers and resolve queued work before closing the record. Revoke credentials that no longer serve an approved purpose, and inspect downstream sessions separately.

Keep historical identity mappings so older operations remain understandable. The [lifecycle guide](/guides/ai-agent-lifecycle/) defines retirement as an operating transition with evidence, rather than deletion of a row in the agent interface.
