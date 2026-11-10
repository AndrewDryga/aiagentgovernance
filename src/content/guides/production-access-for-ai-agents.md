---
title: "Production access for AI agents"
description: "Give an agent useful operational access with explicit scope, approval rules and recoverable execution."
category: Access
primaryKeyword: "production access for ai agents"
relatedKeywords:
  - "ai agent access control"
  - "ai agent permissions"
order: 11
reviewedDate: "2026-11-09"
related:
  - least-privilege-ai-agents
  - human-in-the-loop-ai
  - ai-agent-incident-response
sources:
  - title: "AWS IAM security best practices"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
  - title: "OWASP Excessive Agency"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
  - title: "MCP Security Best Practices"
    url: "https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices"
answer: "Production access for an AI agent should begin with a specific operational job and the smallest set of actions that makes it useful. Reading a service's health, collecting diagnostics and changing its configuration are separate capabilities. Decide which ones the deployment needs before giving it credentials."
---

The access route can be a CLI, an API or MCP. Each still needs a clear answer to the same question: what can the receiving system actually do on this agent's behalf?

## Start with a bounded diagnostic task

Choose a service whose owner can explain the normal operating state and recognize a useful result. Give the agent access to approved telemetry and a narrow set of diagnostic operations.

Use the [risk assessment](/guides/ai-agent-risk-assessment/) to define the output destination as part of the task. Permission to read internal logs does not imply permission to send them to any external system. Filter sensitive fields before they enter the agent's context when the workflow does not require them.

The first acceptance test should show the complete path: the agent requests an allowed diagnostic, the intended system executes it, and an operator can find the result and its audit record.

## Review the authority behind each route

| Access route | What to inspect                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| CLI          | Process identity, accessible credentials, argument validation and reachable targets |
| Direct API   | Token scope, resource authorization and retry behavior                              |
| MCP tool     | Server implementation, downstream credentials and tool-specific permissions         |

If an interface exposes declared remote actions, also review each action definition and its permitted arguments. Check how policy and executor validation apply to that definition.

[OWASP recommends avoiding open-ended tool functionality where narrower operations can meet the need](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). An operation that reads a service's status is easier to review than a general command interface whose possible effects depend on arbitrary input.

## Add one change capability at a time

After diagnostics are useful, select a change with a clear precondition and a known recovery procedure. Define the resource scope and any concurrency or rate limits.

A restart request, for example, should identify the exact service instance. It should also explain the expected disruption and how the operator will check recovery. If [human approval](/guides/human-in-the-loop-ai/) is required, execution waits until the specific request is authorized.

Avoid granting a broad maintenance role just to unblock one operation. [AWS's IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) recommends permissions limited to required actions and resources. Apply that reasoning to the downstream account as well as the visible tool.

## Treat uncertain outcomes as operational work

A lost connection does not establish whether an operation ran. Before retrying a change, inspect its existing operation record or the target's state through the supported recovery path.

Design the tool response so the agent can distinguish rejection, pending approval, execution failure and an unknown outcome. Those states require different next steps. Returning the same generic error for all of them encourages inappropriate retries.

Test interruption after dispatch in a nonproduction environment. Confirm that the agent can report uncertainty accurately and that an operator can resolve it without guessing.

## Check routes around the controls

Review whether the agent has another credential or network path to the same target. A policy-controlled tool offers limited protection if the process can also reach an unrestricted administrative API.

For MCP, inspect the [protocol's security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices), including token handling and proxy behavior. For CLI workflows, inspect inherited environment variables and files available to the process.

A coding sandbox and production authorization serve different boundaries. Keeping an agent's development environment isolated does not determine which remote actions it should receive. Test both boundaries when the same workflow spans them.

## Set a clear stop procedure

An operator should know how to block new requests and how to inspect work already accepted. Revoking a credential may stop future calls while an active operation continues.

Include pending approvals and queued requests in the procedure. After a suspension, require a deliberate recovery decision so old work does not resume unexpectedly. Verify the procedure with the people who will use it during an incident.

## Example: investigate an alert before approving a change

Consider a hypothetical on-call workflow. An engineer asks an assistant to investigate an alert. The assistant reads approved diagnostics and proposes restarting one service instance. The original request authorizes the investigation; the restart still needs the authority required by the team's policy.

[Ryker](https://ryker.emisar.dev/) provides an example of the assistant role: a self-hosted engineering teammate that works through Slack, GitHub and a web console. [Emisar](https://emisar.dev/) provides the remote access controls: declared infrastructure actions through CLI or MCP, evaluated against policy with approval and audit. Both share ownership with this publication.

When configuring this workflow, separate the diagnostic actions from change actions. For each one, record the permitted target, output destination and approval rule. An approval-required restart remains pending until authorized; unrelated, permitted diagnostics can continue. Retain the request and execution records so the next engineer can distinguish what the assistant proposed from what actually ran.

This is a configuration example, not a report of a tested deployment. Use the [Ryker documentation](https://ryker.emisar.dev/docs/) and [Emisar security model](https://emisar.dev/docs/security-model) to review the integration, then verify the allowed, denied and approval-required paths in your own environment.
