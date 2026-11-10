---
title: "What is AI agent governance?"
description: "Understand who should own an AI agent, what it may do, and how to review its actions."
category: Basics
primaryKeyword: "ai agent governance"
relatedKeywords:
  - "agentic ai governance"
  - "ai agent inventory"
order: 1
reviewedDate: "2026-11-09"
related:
  - ai-agent-governance-framework
  - ai-agent-access-control
  - ai-agent-audit-trail
sources:
  - title: "NIST AI Risk Management Framework Core"
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  - title: "OWASP Excessive Agency"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
---

AI agent governance is the set of decisions about who owns an agent, which work it may perform, and how people can inspect or stop that work. For an agent that can use tools, governance reaches into the systems those tools control. A sensible answer in a chat window can still lead to an inappropriate action on a server.

Consider an agent investigating a slow application. It might need recent error counts and a deployment history. Restarting the application is a separate decision. Reading customer records is another. Someone must decide which of those actions belongs to the task, then make the decision enforceable.

## Begin with a named job and owner

Write down the work the agent exists to do. "Help engineering" is too broad to review. "Collect diagnostic information for the payments service during an incident" gives the owner something specific to approve.

The owner should be a person or accountable team that can change the deployment and answer questions about its use. A model provider, framework name or shared service account does not fill that role.

An initial agent record can be short:

| Field                 | Example for a diagnostic agent                   |
| --------------------- | ------------------------------------------------ |
| Purpose               | Gather evidence about payments service failures  |
| Accountable team      | Payments engineering                             |
| Operating environment | Production diagnostics                           |
| Allowed inputs        | Incident ticket and approved service telemetry   |
| Allowed actions       | Read selected health and deployment information  |
| Escalation            | Ask the on-call engineer before a service change |
| Stop authority        | Payments on-call and incident commander          |

The example is a design aid. Replace its choices with the arrangements your team can actually support.

## Separate permission from intention

An instruction such as "only inspect the service" communicates a goal to the model. A permission rule determines which requests the surrounding software accepts. Put consequential limits in the service that receives the request, where changing the conversation cannot remove them.

This distinction becomes easier to see when you inspect the credentials. If a diagnostic agent uses an administrator account, the downstream system may accept far more than the task requires. The prompt can ask for restraint while the account still permits a damaging change.

[OWASP describes excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) as a problem of excessive functionality, permissions or autonomy. Review the available tools and the authority behind them together.

## Decide where people remain involved

Human review should have a defined purpose. An engineer might approve a particular production change because it affects customers or because the evidence leaves an important question unresolved.

Give that person the proposed action, affected resource, expected effect and available recovery path. "Continue?" is rarely enough information. Decide what happens when nobody responds. For a change that requires approval, the pending request should remain unexecuted and eventually expire.

Some work can continue without an interruption. A narrowly scoped health check may be allowed automatically. A request outside the agent's assigned systems may be denied outright. Requiring a person to approve every permitted low-impact read can fill the queue and make consequential requests harder to notice.

## Keep evidence someone can use

A useful action record identifies the agent, the requested operation and the target. It also records the access decision, any approval and the observed result. The agent's explanation of what happened is useful context, but investigators also need evidence from the system that performed the operation.

Record unsuccessful requests. Repeated denials can expose a missing integration, an unclear task or an attempted misuse. Those possibilities need different responses.

Keep sensitive content out of routine records when it is unnecessary. For example, a record can say that a protected dataset was accessed without copying the dataset into the audit system.

## Review the deployment when its authority changes

Adding a tool can change the agent's risk more than changing its welcome message. A new data source may expose private information. A new write operation may introduce a recovery obligation. Changing the model or instructions can also affect how the agent chooses among its existing tools.

NIST's [AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) treats governance as part of ongoing risk management across the system lifecycle. For a small engineering team, that can mean attaching a short governance review to the same pull request that changes the agent's tools or permissions.

Before enabling the next capability, ask its owner to demonstrate one permitted request, one request that must be denied, and the steps an operator uses to stop further execution. Save the results with the deployment record so the next reviewer can check what changed.
