---
title: "Apply the NIST AI RMF to agents"
description: "Map an agent review to Govern, Map, Measure and Manage while keeping implementation evidence and limitations explicit."
category: "Reviews & policy"
primaryKeyword: "nist ai rmf"
relatedKeywords: ["nist ai risk management framework", "nist ai rmf agents"]
order: 21
reviewedDate: "2026-11-09"
answer: "The NIST AI Risk Management Framework organizes voluntary AI risk management through Govern, Map, Measure and Manage. For an agent, those functions can connect ownership, task context, evaluation and operating decisions. The mapping below applies the published AI RMF 1.0 to an engineering example; it is partial and does not establish certification or legal compliance."
related: ["ai-agent-governance-framework", "ai-agent-risk-assessment", "ai-agent-evaluation"]
sources: [{"title": "NIST AI Risk Management Framework", "url": "https://www.nist.gov/itl/ai-risk-management-framework"}, {"title": "NIST AI RMF 1.0 Core", "url": "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"}, {"title": "NIST AI RMF Playbook", "url": "https://airc.nist.gov/airmf-resources/playbook/"}]
---

NIST's [framework page](https://www.nist.gov/itl/ai-risk-management-framework) states that AI RMF 1.0 is being revised. This guide uses the published 1.0 functions and does not treat the revision work as a completed replacement. Record the framework version in your own review so later changes can be assessed explicitly.

The [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) describes Govern, Map, Measure and Manage as functions, not a mandatory sequence of steps. The [Playbook](https://airc.nist.gov/airmf-resources/playbook/) offers voluntary suggestions to select for the use context.

## Define the deployment before making a crosswalk

Use a hypothetical assistant that investigates checkout incidents. It reads selected telemetry and may propose a restart, but the initial release has no write authority. Its owner wants evidence before expanding that scope.

Record the agent configuration, identities, data sources, tools and target systems. List the people affected by wrong explanations, inappropriate data access or service interruptions. A model-only assessment would omit much of this deployment's possible effect.

The [agent risk assessment](/guides/ai-agent-risk-assessment/) gives a concrete way to describe scenarios. This crosswalk organizes the resulting work; it does not replace that investigation.

## Map the functions to local records

The following records are this site's application of the functions to the example. They are not official NIST subcategory requirements or evidence that the example has been tested.

| Function | Question for this deployment | Example local evidence |
| --- | --- | --- |
| Govern | Who owns the purpose, limits and operating decisions? | Owner record, access policy, review responsibilities and exception decisions |
| Map | What is the context and what could go wrong? | Data-flow map, affected services, intended use and failure scenarios |
| Measure | What evidence describes behavior and remaining uncertainty? | Task evaluations, denial tests, recovery exercises and unresolved observations |
| Manage | What will the team do about the assessed risks? | Limited release decision, disabled capabilities, monitoring and recovery plan |

One artifact may support more than one function. A suspension exercise can provide measurement evidence and inform an operating decision. Avoid duplicating it into several disconnected documents solely to fill a crosswalk.

## Govern: make the decisions assignable

For the example, checkout engineering owns the purpose. The data owner approves the filtered telemetry view. The tool-service owner maintains authorization. The on-call lead owns suspension and the operating response.

Record what happens when those owners disagree or leave. An exception to the normal data scope needs a specific decision and expiry, not a sentence that anyone may override policy in an emergency.

Use the [governance framework](/guides/ai-agent-governance-framework/) to connect those responsibilities to the deployment process. The inventory should identify the people or teams with actual authority to act on them.

## Map: describe consequences in the actual setting

The same restart operation can be tolerable on a disposable test instance and disruptive on the only production instance. Include environment, timing, data sensitivity and the human workflow in the scenario.

For the diagnostic assistant, examples include an unrelated-service read, a stale observation presented as current, and a repeated restart after an uncertain response. Identify the possible effect and the assumptions behind it. Avoid a precise probability if the team has no evidence for one.

Also examine concerns beyond unauthorized tool use. An agent can stay within its permissions while giving misleading advice or producing an unsuitable result for the people relying on it. Relevant domain and organizational reviewers need to decide which additional concerns apply.

## Measure: keep different evidence separate

A representative diagnostic task can establish useful behavior for that case. A cross-service denial test can establish one access boundary. A human review exercise can show whether the reviewer understands the proposal. None of those observations substitutes for the others.

Use the [evaluation guide](/guides/ai-agent-evaluation/) to define expected outcomes and choose evidence sources. Record failed and incomplete cases alongside passes. Keep model-generated judgments separate from deterministic observations of target-side effects.

If lost-response recovery for restart has not been tested, record that gap directly. A policy document promising safe retries does not supply the missing evidence.

## Manage: make a decision proportional to the evidence

A hypothetical outcome is to release selected diagnostics while leaving restart disabled. The owner accepts the remaining explanation-quality risk with human review, assigns stale-data testing and requires a new decision before adding any write operation.

Put that decision in the [release worksheet](/resources/agent-release-review.md), along with the operating contact and review triggers. Use the [audit trail](/guides/ai-agent-audit-trail/) to support investigation during use. Revisit the decision when the deployment gains a new source, tool or destination.

A restriction can be a sound result of the review. The framework does not require increasing autonomy as evidence accumulates; the task and consequences determine the appropriate operating scope.

## State what the mapping leaves out

This engineering example does not assess every AI trustworthiness concern, organizational policy or legal obligation. A deployment affecting employment, health, financial decisions or other consequential outcomes needs review suited to that context. Do not label a small technical crosswalk a complete enterprise assessment.

Keep a list of excluded concerns and who decided they were outside this review. If a concern is relevant but unassessed, label it a gap rather than "not applicable." Version the crosswalk with the deployment and update its framework reference when you adopt a later published revision.
