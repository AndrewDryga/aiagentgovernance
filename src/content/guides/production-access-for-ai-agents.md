---
title: "Production access for AI agents"
description: "Give an agent enough access to diagnose a failing service. Decide which logs it can read, who can approve a restart and how to stop a run."
category: Access
primaryKeyword: "production access for ai agents"
relatedKeywords:
  - "ai agent access control"
  - "ai agent permissions"
order: 11
reviewedDate: "2026-11-24"
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
answer: "Start with one job, such as finding out why a service keeps restarting. Give the agent the logs and status checks it needs. Decide who can approve a change before you let the agent request one."
---

<span id="start-with-a-bounded-diagnostic-task"></span>

## Give the agent one incident to investigate

Suppose the checkout pod keeps restarting. The previous container’s log can tell you what went wrong just before it stopped. Here’s what an on-call engineer could authorize in staging before trying the same setup in production.

| Decision | Example |
| --- | --- |
| Target | The `checkout` workload in the staging cluster |
| What the agent can read | Pod status, recent events for that pod and the previous container’s log |
| What it can share | A short diagnosis in the incident ticket. Raw logs stay in the team’s workspace because they may contain customer data. |
| When it needs approval | The service owner must approve a restart or a change to the deployment. |

You can set up these checks with Kubernetes permissions. The [Emisar Kubernetes pack](https://emisar.dev/packs/kubernetes) shows how to expose them as individual tools. For help deciding what the agent can quote from logs, see the [risk assessment guide](/guides/ai-agent-risk-assessment/).

<span id="review-the-authority-behind-each-route"></span>

## Check whose permissions the tool uses

| Access route | What to check |
| --- | --- |
| CLI | Which account runs it? What credentials can it read? Which arguments and targets does it accept? |
| API | Which resources can the token access? What happens if a request is retried? |
| MCP tool | Which account does the server use, and which actions and arguments will it accept? |

Follow one request all the way to the service. A tool called “read status” should only accept the arguments it needs, and its account should only have the permissions it needs. A second credential that gives the agent admin access would undo that work. [OWASP guidance on agent tools](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) · [AWS IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

<span id="check-routes-around-the-controls"></span>

For a CLI, check inherited environment variables and mounted files. For MCP, check how the server handles tokens and forwards requests. A coding sandbox can keep a token off the agent’s filesystem while a connected tool still lets it act on production. [MCP security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices)

<span id="add-one-change-capability-at-a-time"></span>

## Try a restart on a disposable service

Ask the agent to read a known log entry, then request a restart. The [approval request](/guides/human-in-the-loop-ai/) should name the exact host and service, the expected disruption and how you’ll check recovery. Set any limits on how often it can restart or how many instances it can change at once.

<span id="example-investigate-an-alert-before-approving-a-change"></span>

While approval is pending, check that the service still has its original start time. Approve the request, then check the new start time and make a request to the service. Can the next person on call find who approved the restart and what ran?

[Ryker](https://ryker.emisar.dev/) can bring the request to Slack, and [Emisar](https://emisar.dev/) checks whether the action is allowed. Both products share an owner with this publication. The [nginx walkthrough](https://emisar.dev/docs/investigate-a-service) lets you try the approval on a dev host and remove the runner’s Docker access afterward. Our [directory](/directory/) covers both tools.

<span id="treat-uncertain-outcomes-as-operational-work"></span>

## Know when it’s safe to retry

If the connection drops after a restart request, the restart may already be underway. Check the request record or the service’s start time before trying again. Test that case in staging. The tool should tell the agent whether a request was denied, is waiting for approval, failed during execution or has an unknown outcome.

<span id="set-a-clear-stop-procedure"></span>

## Make sure someone can stop the work

Try suspending access while a job is running. Can the person on call block new requests and see which ones already started? Check the queue and pending approvals too. Decide which requests to cancel and which ones an operator must review before work resumes.
