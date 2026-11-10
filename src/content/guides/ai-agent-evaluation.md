---
title: "Evaluate an AI agent before granting access"
description: "Test useful task completion, permission boundaries, side effects and recovery with evidence suited to each result."
category: "Reviews & policy"
primaryKeyword: "ai agent evaluation"
relatedKeywords: ["agent evaluation", "ai agent evals"]
order: 22
reviewedDate: "2026-11-09"
answer: "AI agent evaluation tests whether a deployed agent completes intended tasks while respecting its data, action and operating limits. Evaluate the full workflow, including tools and target state, rather than only the final answer. Keep task quality, unnecessary refusals, boundary violations and unknown outcomes separate when deciding what access to grant."
related: ["ai-agent-risk-assessment", "ai-agent-access-control", "human-in-the-loop-ai"]
sources: [{"title": "Anthropic: Demystifying evals for AI agents", "url": "https://www.anthropic.com/research/demystifying-evals-for-ai-agents"}, {"title": "LangSmith evaluation documentation", "url": "https://docs.langchain.com/langsmith/evaluation"}, {"title": "OWASP Authorization Cheat Sheet", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"}]
---

A benchmark for answering questions does not establish that an agent can safely operate your service. The permission decision needs evidence from the intended task, its environment and the failure paths that matter there.

Start with the candidate deployment's [risk assessment](/guides/ai-agent-risk-assessment/). Define the useful outcome and the effects that must remain impossible or require human review. Keep the configuration and acceptance conditions fixed while collecting evidence.

## Define success for one task

For a hypothetical incident assistant, the task is to explain a checkout failure using selected health and release information. A useful result identifies relevant observations, shows their time and separates a likely cause from an established fact.

The permitted scope excludes customer payloads and other services. A proposed restart must wait for a specific authorized reviewer. Those restrictions are part of task success, not optional deductions from an answer-quality score.

| Dimension | Example condition | Best evidence source |
| --- | --- | --- |
| Task result | Explanation uses relevant current observations | Reviewed answer and source evidence |
| Data boundary | Other-service data is not returned | Retrieval and target-side records |
| Action boundary | No restart before required approval | Policy and executor events |
| Recovery | Lost response does not create a duplicate change | Operation state and target effects |
| Communication | Uncertainty remains visible to the operator | Human review of the final result |

These conditions are illustrative. A scheduling agent or a coding agent needs different task outcomes, while still requiring evidence about its actual effects.

## Build cases that represent decisions

Include routine tasks, plausible ambiguity, prohibited requests and operational failures. Keep a stable regression set for known behavior and a separate set for exploring new capability.

The [evaluation case template](/resources/agent-evaluation-cases.json) supplies synthetic case definitions with expected assertions and empty result fields. It does not run an agent or establish that any system passes.

### Ordinary and ambiguous work

Use tasks with sufficient evidence for a useful result, then tasks with missing or conflicting evidence. A correct agent may ask for clarification or report that it cannot establish the cause. Do not grade every refusal as failure when the task genuinely lacks required information.

Include tasks where multiple valid approaches exist. A grader that insists on one exact tool sequence can reject a correct alternative. Check necessary outcomes and prohibited effects; constrain the sequence only when the sequence itself is part of the requirement.

### Boundary and interruption cases

Request a neighboring resource outside scope. Change an approved target. Expire an approval while queued. Interrupt the response after a disposable test action is accepted. Inspect effects through the receiving system.

Run these through the real integration path. A mocked permission result can test local handling, but it cannot qualify the deployed [access-control boundary](/guides/ai-agent-access-control/). Keep unit, integration and operational evidence clearly labeled.

## Choose graders by the fact they can establish

[Anthropic's agent evaluation guidance](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) distinguishes code-based, model-based and human grading. [LangSmith's evaluation documentation](https://docs.langchain.com/langsmith/evaluation) also supports different evaluator types and separates offline experiments from production evaluation.

Use deterministic checks for facts that application records can establish: the target identifier, execution count, returned synthetic marker or approval expiry. Use a domain reviewer for whether an operational recommendation is useful and appropriately qualified.

A model judge can help triage many open-ended answers. Calibrate its rubric against human-reviewed examples and inspect disagreements. Do not ask it to infer that no external write occurred from a reassuring chat response.

## Repeat variable cases without hiding failures

Record model and agent versions, prompts, tool definitions, policy, test data and relevant environment settings. Reset state between independent cases, including memory and caches. For multi-turn tests, explicitly preserve the state the case requires.

Run repeated trials where variation affects the decision. Report each case's trial count and outcomes. A failure followed by a successful retry remains a failure observation; replacing it with the latest result understates the evidence.

Keep evaluation data separate from examples used to tune the agent. Near-duplicates can make a result look more general than it is. When adding a production failure to the regression set, retain a separate set for checking unfamiliar work.

## Read a mixed report as a permission decision

This invented example shows how a review might treat four outcomes. It is not a measured product result.

| Case | Hypothetical observation | Decision consequence |
| --- | --- | --- |
| Routine diagnosis | Useful answer with correct source times | Supports the tested diagnostic task |
| Wrong-service read | Receiving service denies access | Supports that boundary for the tested route |
| Stale evidence | Agent states an old observation as current | Requires communication and freshness repair |
| Interrupted restart | Target-side outcome cannot be established | Does not qualify autonomous retry or restart access |

An average score cannot settle these consequences. The owner might release diagnostics with a freshness correction and keep restart disabled until recovery is demonstrated. The [governance checklist](/guides/ai-governance-checklist/) records that constrained decision.

When reporting rates, state the number of scheduled cases, completed observations and unresolved cases. Calculate a task-success rate over the clearly defined assessed population, and show incomplete cases separately. Report any material boundary violation directly even if the overall task score is high.

## Test the human and operating parts

Ask a real reviewer to inspect a sample approval packet with an intentional target mismatch. Observe what information they need and whether the system enforces their decision. The [human-in-the-loop guide](/guides/human-in-the-loop-ai/) covers that review experience.

Have an operator suspend the test deployment, identify already accepted work and resolve an unknown outcome. Record whether required evidence was available to that operator under normal access. An emergency procedure that only its author can use is not well demonstrated.

After release, use [monitoring](/guides/ai-agent-monitoring/) to find behavior the test set missed. Convert reproducible failures into regression cases, then repeat the affected evaluation before expanding authority. Qualification applies to the tested configuration and scope; it is not a permanent property of the model name.
