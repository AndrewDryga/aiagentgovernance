---
title: "AI agent monitoring and observability"
description: "Connect task progress, permission decisions and executor outcomes to signals an operator can act on."
category: "Operations"
primaryKeyword: "ai agent monitoring"
relatedKeywords: ["ai agent observability", "agent observability"]
order: 14
reviewedDate: "2026-11-09"
answer: "AI agent monitoring tracks whether an agent is completing useful work within its operating limits. Observability connects that behavior to requests, model calls, tool decisions and target-system outcomes. Keep denied, pending, dispatched, completed and unknown work separate so a healthy model endpoint does not hide a broken or unauthorized workflow."
related: ["ai-agent-audit-trail", "ai-agent-incident-response", "ai-agent-evaluation"]
sources: [{"title": "OpenTelemetry GenAI semantic conventions", "url": "https://github.com/open-telemetry/semantic-conventions-genai"}, {"title": "OWASP Logging Cheat Sheet", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"}, {"title": "LangSmith evaluation documentation", "url": "https://docs.langchain.com/langsmith/evaluation"}]
---

An agent can receive a successful model response while its tool fails, its approval expires or its task remains unfinished. Monitoring only model latency and token use leaves the operator without a useful answer to "Did the work happen?"

Start with the [inventory](/guides/ai-agent-inventory/) so every signal can be connected to a deployment and owner. Then identify the components that know each fact: the policy service knows its decision, and the executor knows whether it accepted an operation.

## Use states with distinct meanings

A practical state model for one action can distinguish:

| State | Meaning | Next operational question |
| --- | --- | --- |
| Requested | A proposal exists | Has it reached policy evaluation? |
| Denied | Policy rejected the proposal | Expected boundary or workflow problem? |
| Held | Required review is pending | Who owns the decision and when does it expire? |
| Dispatched | The action was sent for execution | Did the executor accept it? |
| Succeeded | The defined completion condition was observed | Did the task reach its intended result? |
| Failed | A known execution failure occurred | Is recovery safe and supported? |
| Unknown | Evidence cannot establish the outcome yet | How will the operation be reconciled? |

These are illustrative application states, not a required standard or an assertion that every product exposes them. The actual event schema must also handle cancellation, partial completion and expiry where the workflow needs them.

A denied action is not automatically an error in the control. A policy evaluation outage is not a successful denial. A task that politely stops after every request may satisfy a narrow boundary test while failing its purpose.

## Follow one interrupted action

Consider a hypothetical timeline using fictional identifiers:

```text
12:00:00 request r-17 proposes restart of checkout-test-2
12:00:01 policy p-4 requires approval; request is held
12:03:00 reviewer approves the exact proposal until 12:08:00
12:03:02 executor accepts operation o-9
12:03:03 client connection drops; outcome is unknown
12:03:10 reconciliation reads o-9 as completed
12:03:11 task reports the observed result
```

This timeline is an example, not a measured trace. It contains one accepted operation, even though the client saw an error. A monitor that turns the connection loss into an ordinary execution failure can encourage an unsafe retry.

Carry the request and operation identifiers through the components. Keep the model's explanatory text separate from the final state supplied by the executor. The [audit-trail guide](/guides/ai-agent-audit-trail/) covers retaining and protecting the records used for later reconstruction.

## Define a small signal dictionary

Choose signals that answer a specific operating question. Record the unit and denominator, the observation window, exclusions and owner.

| Signal | Definition for this example | Useful response |
| --- | --- | --- |
| Task completion | Tasks meeting their defined outcome divided by tasks with a completed assessment | Inspect failed task types and incomplete assessments separately |
| Policy evaluation errors | Requests with no usable decision divided by evaluation attempts | Check policy dependency and protected-action behavior |
| Denial rate | Explicit denials divided by completed policy evaluations | Inspect reason codes before changing permissions |
| Approval age | Time since a still-pending proposal was created | Route to the assigned reviewer or let it expire |
| Unknown operations | Accepted operations whose outcome remains unresolved | Reconcile before retrying |
| Repeated effects | Effects exceeding the authorized request's allowed repetition | Stop the affected path and investigate |

Use actual traffic to choose thresholds. Do not copy a generic percentage into an alert and call it a service objective. A low-volume deployment may need case review rather than a rate alert; a high-volume deployment needs enough context to identify the affected scope.

The [signal dictionary download](/resources/agent-monitoring-signals.csv) provides fields for those definitions. Its threshold and owner fields are blank for your team to decide.

## Connect model telemetry to the application

The maintained [OpenTelemetry GenAI conventions](https://github.com/open-telemetry/semantic-conventions-genai) cover spans, metrics and events for generative AI integrations. Follow the version your instrumentation implements. Do not invent field names and present them as standard attributes.

Model telemetry can explain latency, cost and failures. Add application context that connects a model call to the task and proposed operation. Keep that context bounded; an identifier is often more useful and safer than a copy of the entire prompt.

[LangSmith's documentation](https://docs.langchain.com/langsmith/evaluation) distinguishes evaluation on offline datasets from evaluation of production interactions. Online judgments can help find quality problems, but a model-based score remains fallible and does not establish that an action was authorized.

## Make alerts actionable and test their delivery

An alert needs an owner, an evidence link and a next step. "Agent error count increased" leaves too much interpretation. "Checkout investigator has unresolved accepted operations" points the responder toward reconciliation.

Test the alert with a controlled transition in the isolated environment. Verify the notification reaches the intended person and that they can inspect the evidence. Creating a rule in a dashboard does not prove its delivery path works.

Avoid an automatic permission expansion when denial rates rise. Repeated denials can indicate an attack, a changed task or an integration defect. Use the [incident process](/guides/ai-agent-incident-response/) when the evidence supports an incident.

## Keep visibility from becoming another disclosure path

Limit sensitive payload capture and control access to traces. Sampling useful diagnostic traces can reduce volume, but it may omit events needed for a consequential action's audit record. Decide which records must be retained independently.

[OWASP's logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) emphasizes meaningful events and careful handling of sensitive data. Test errors and export paths with synthetic markers. An observability system that stores a secret the application carefully redacted has created another exposure to investigate.
