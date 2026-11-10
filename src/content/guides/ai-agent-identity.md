---
title: "AI agent identity and delegated access"
description: "Keep the agent, the person requesting work and the executing service identifiable throughout a task."
category: Access
primaryKeyword: "ai agent identity"
relatedKeywords:
  - "ai agent authorization"
  - "ai agent access control"
order: 9
reviewedDate: "2026-11-09"
related:
  - ai-agent-access-control
  - least-privilege-ai-agents
  - ai-agent-audit-trail
sources:
  - title: "SPIFFE overview"
    url: "https://spiffe.io/docs/latest/spiffe-about/overview/"
  - title: "AWS IAM security best practices"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
  - title: "NIST Zero Trust Architecture"
    url: "https://csrc.nist.gov/pubs/sp/800/207/final"
answer: "AI agent identity lets a receiving system distinguish one agent deployment from another. That identity helps the system apply the right permissions and helps operators attribute the resulting work. The model name is useful deployment information, but it does not establish which running agent made a request."
---

Within the broader [non-human identity estate](/guides/non-human-identities/), a single task can involve several identities: the person asking for help, the agent deployment, a tool service and the account used on the target. Keep those roles visible as the request moves between systems.

## Distinguish the requester from the executor

Suppose an engineer asks an incident assistant to inspect a service. The engineer supplies the intent. The assistant chooses a permitted diagnostic operation. A tool service carries it out using its own workload identity.

| Identity         | Question it answers                                 |
| ---------------- | --------------------------------------------------- |
| Human requester  | Who asked for this work?                            |
| Agent deployment | Which configured assistant chose the request?       |
| Tool service     | Which service accepted and dispatched it?           |
| Target account   | Under whose permissions did execution occur?        |
| Reviewer         | Who authorized a decision requiring human approval? |

These may be separate records even when one organization operates all the components. Combining them into a single "AI user" makes it harder to revoke one deployment or investigate one request.

## Choose identities with a manageable lifecycle

Define how an identity is created, assigned permissions, rotated and retired in the [agent lifecycle record](/guides/ai-agent-lifecycle/). Tie it to an owner who can respond when its behavior changes.

For software running on infrastructure you control, workload identity can reduce the need to distribute long-lived credentials. [SPIFFE defines standards for identifying software workloads](https://spiffe.io/docs/latest/spiffe-about/overview/), including short-lived identity documents. It is one option; the right choice depends on the platforms you already operate.

[AWS recommends temporary credentials through IAM roles for workloads](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). Whatever mechanism you use, test its bootstrap process and failure behavior. If renewal fails, report the failure and stop affected requests. Do not fall back to a shared administrator credential.

## Preserve the meaning of delegation

When an agent acts for a person, decide which authority applies. A service may constrain the request to both the person's access and the agent's assigned capabilities. A scheduled operational agent may instead work under an explicitly approved service role.

Write that choice down. A human request does not automatically authorize every operation that would help finish it. Likewise, a tool service's broad technical capability should not silently become the agent's permission set.

If the request passes through another agent, preserve the originating task and relevant scope. Pass verified delegation context so the downstream system can check the originating authority. Treat free-text claims of approval as unverified input.

## Avoid shared identities when attribution matters

A shared account makes several deployments look identical to the target. If one agent is paused, the same credential may still be active elsewhere. Rotating it can interrupt unrelated work.

Separate identities by deployment or responsibility where the platform supports that distinction. Keep stable deployment identifiers in audit records, even when credentials change. Individual task or session identifiers can then connect activity without requiring a permanent credential for every run.

There is a tradeoff: more identities create more lifecycle work. Automate creation and retirement through the same deployment process that owns the agents. An unmanaged collection of forgotten service accounts is difficult to review.

## Verify the target as well

The caller needs to know that it is sending information to the intended service. Check server identity and the audience for credentials. An integration that accepts any reachable endpoint can send a valid token or sensitive output to the wrong destination.

[NIST's zero trust guidance](https://csrc.nist.gov/pubs/sp/800/207/final) treats authentication and authorization as separate functions before access. Keeping those functions explicit helps avoid treating a familiar network address as enough evidence of trust.

Document which identity facts each component validates and which it receives from another component. This gives reviewers a concrete place to look when attribution is missing.

## Retire an agent without losing its history

Disable new work, resolve or cancel pending requests and remove credentials that no longer have a purpose. Check downstream sessions and any queued operations separately; deleting an inventory entry does not necessarily stop them.

Keep historical records associated with the retired identity according to your retention policy. If a new deployment later receives the same display name, give it a distinct stable identifier so investigators can tell which deployment performed the older work.
