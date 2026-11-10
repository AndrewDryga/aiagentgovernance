---
title: "AI governance examples for agent work"
description: "Compare completed decisions for diagnosis, a bounded service change and a declined data export."
category: "Foundations"
primaryKeyword: "ai governance examples"
relatedKeywords: ["ai agent governance examples", "agent approval examples"]
order: 17
reviewedDate: "2026-11-09"
answer: "AI governance examples show how owners decide whether an agent may perform a specific task, under which conditions and with what evidence. The three records here are hypothetical: permitted diagnostics, an approval-controlled change and a declined export. They illustrate decisions and remaining limits, not customer cases or verified test results."
related: ["ai-agent-governance-policy", "human-in-the-loop-ai", "ai-agent-risk-assessment"]
sources: [{"title": "OWASP Transaction Authorization", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html"}, {"title": "OWASP Excessive Agency", "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"}, {"title": "OWASP Logging Cheat Sheet", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"}]
---

A useful record lets the next operator answer what was decided without asking the original reviewer to reconstruct the conversation. It identifies the purpose, alternatives, authority and evidence behind the decision.

The examples use fictional teams and resource identifiers. In a real record, replace the illustrative evidence descriptions with links to actual test runs and approvals. The [release review worksheet](/resources/agent-release-review.md) provides a blank structure.

## Example 1: permit scoped diagnosis

The checkout team wants an assistant to gather evidence during incidents. Engineers currently collect service health and release metadata manually. The proposed deployment can read a filtered diagnostic view; it cannot change the service.

| Decision field | Hypothetical completed record |
| --- | --- |
| Purpose | Explain checkout errors from approved operational evidence |
| Owner | Checkout engineering |
| Considered alternative | Keep collection manual; useful but requires an available engineer for each request |
| Permitted work | Read checkout health and release metadata for the assigned incident |
| Excluded work | Customer payloads, other services, restarts and external exports |
| Example evidence | Useful diagnostic task; wrong-service denial; operator suspension exercise |
| Decision | Permit this diagnostic scope |
| Conditions | Timestamp observations; place results only in the incident record |
| Next review | New source, tool, destination or accountable owner |

This decision accepts that the assistant may form a poor explanation from allowed evidence. The operator reviews its recommendation before acting. It does not accept unrestricted data access merely because the task is described as diagnostic.

The [inventory](/guides/ai-agent-inventory/) records the owner and actual identities. The [governance policy](/guides/ai-agent-governance-policy/) supplies the standing rule about scope. Each request still needs an access check; the release decision does not bypass it.

### What would change the decision?

If a new log view includes customer payloads, the original data scope no longer fits. If an inherited administrator credential lets the process bypass the diagnostic API, the effective authority exceeds the approved record. Either change requires review before the owner relies on the read-only boundary.

## Example 2: allow one change after a specific approval

A later proposal adds restarting one checkout instance. The service owner accepts the use only when a current operator reviews the target and supporting evidence. The agent may prepare a proposal while continuing permitted diagnostic work.

| Decision field | Hypothetical completed record |
| --- | --- |
| Purpose | Request a restart when diagnostics support it |
| Owner | Checkout service owner; on-call engineer reviews each request |
| Considered alternative | Agent prepares a recommendation; operator performs the change manually |
| Permitted work | Propose restart of one assigned instance |
| Required decision | Approval for the exact instance and material arguments, with expiry |
| Example evidence | Changed-target rejection; expired-approval rejection; lost-response recovery |
| Decision | Permit the reviewable action under those conditions |
| Recovery | Inspect the recorded operation before retrying an uncertain outcome |
| Remaining limit | No fleet-wide restart or automatic escalation to broader access |

The approval screen should distinguish observed health data from the agent's prediction that a restart will help. The [human-review guide](/guides/human-in-the-loop-ai/) explains what the reviewer needs to see.

[OWASP's transaction authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) supports binding a decision to the transaction details and checking it at execution. For this example, changing one instance into a group invalidates the original approval.

### What if the reviewer is unavailable?

The request remains pending and expires according to policy. The agent may save its evidence or continue unrelated permitted reads. It must not search for a weaker path or treat elapsed time as approval. An emergency operating procedure, if needed, has its own authority and record.

## Example 3: decline a broad diagnostic export

The assistant proposes exporting full logs to an external analysis destination. The available evidence shows that a filtered internal view already supports the diagnostic task, and the team has not approved the external recipient or its data handling.

| Decision field | Hypothetical completed record |
| --- | --- |
| Purpose claimed | Obtain another analysis of the incident |
| Owner | Service owner with the data owner |
| Considered alternative | Share an internal filtered summary with an authorized engineer |
| Requested authority | Read full logs and send them to a new external destination |
| Missing evidence | Need for full data; recipient approval; retention and access review |
| Decision | Decline the export capability |
| Permitted continuation | Use the approved internal diagnostic view |
| Reconsideration trigger | A specific need and reviewed destination with narrower data scope |

The decline does not mean every external analysis workflow is inappropriate. It says this proposal lacks the decisions and controls needed for its requested scope. The [risk assessment](/guides/ai-agent-risk-assessment/) should record the disclosure scenario and why a narrower alternative meets the current need.

[OWASP's excessive-agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) identifies unnecessary capability and permission as contributors to damaging effects. Here, leaving the export tool unavailable removes an unnecessary route while preserving useful diagnosis.

## Keep evidence separate from the narrative

For each real decision, retain what the agent requested, what a person approved, what policy accepted and what the executor observed. The [audit-trail guide](/guides/ai-agent-audit-trail/) describes that record. [OWASP's logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) helps keep private payloads out of routine evidence.

A decision can change when the facts change. Preserve earlier versions and explain the new scope. An operator investigating an old action needs the decision that applied then, not only the policy most recently edited.
