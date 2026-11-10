---
title: "How to assess the risk of an AI agent"
description: "Review the harm an agent could cause, the controls that limit it, and the evidence still missing."
category: Templates
primaryKeyword: "ai risk assessment"
relatedKeywords:
  - "ai agent risk assessment"
  - "ai agent governance framework"
order: 6
reviewedDate: "2026-11-09"
related:
  - ai-agent-governance-framework
  - human-in-the-loop-ai
  - production-access-for-ai-agents
sources:
  - title: "NIST AI Risks and Trustworthiness"
    url: "https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/"
  - title: "OWASP Threat Modeling Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html"
  - title: "OWASP Excessive Agency"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
---

An AI agent risk assessment should identify what could go wrong in a specific deployment, how serious the effect would be, and which controls have been tested. Start with the systems and people the agent can affect. A model's benchmark score does not describe the authority of the credentials attached to it.

A diagnostic assistant with access to a public status page has a different risk profile from one that can alter a production database. They may use the same model and nearly identical instructions.

## Describe the path from input to effect

Draw a simple path from the user's request through the agent and its tools to each target system. Add external documents, retrieved pages and tool output that the model can read along the way.

Mark places where information crosses a trust boundary. For example, an externally supplied support ticket may enter the same context as an internal maintenance instruction. Record which component distinguishes the two and what happens if that distinction fails.

[OWASP's threat modeling guide](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) recommends understanding data flows and boundaries before selecting mitigations. For this assessment, include operational mistakes as well as hostile activity.

## Write failure scenarios in ordinary language

A useful scenario names a cause, an action and an affected resource. "Prompt injection" is a threat category. "Text in an incident attachment convinces the agent to request another team's logs" is a scenario you can test.

Include mistakes that do not require an attacker. The agent may misunderstand a target name, retry after an uncertain timeout or act on stale telemetry. A tool may return incomplete data while appearing successful.

Keep the descriptions short enough that the service owner can challenge them. Ask which assumptions are wrong and what evidence would settle the disagreement.

## Assess impact and recovery together

The same action can have different consequences depending on its scope and timing. Restarting an idle test service differs from restarting the only production instance during a migration.

Use a worksheet like this one. The example describes a hypothetical deployment.

| Question                  | Example answer                                                     |
| ------------------------- | ------------------------------------------------------------------ |
| What could happen?        | A retry repeats a change after the first result is lost            |
| Who or what is affected?  | One assigned production service                                    |
| How would we notice?      | Target-side operation records and health checks                    |
| What limits the effect?   | A single target and an operation recovery check                    |
| Can we reverse it?        | Unknown until the first outcome and recovery procedure are checked |
| What evidence is missing? | A test of connection loss after execution starts                   |
| Who owns the decision?    | The service owner                                                  |

Avoid giving an uncertain probability a precise-looking number. If the team has no basis for "one percent," record the uncertainty and the test or observation that could reduce it.

## Examine controls where the effect occurs

An instruction to avoid harmful actions is useful guidance to the agent. For a consequential action, also inspect the enforcement in the receiving system.

Can the credential access unrelated resources? Can an approved argument be changed before execution? Can the agent reach a second route that skips the policy check?

[OWASP's excessive-agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) connects damaging actions to excessive tool capability, permission and autonomy. Use that as a prompt to inspect the deployed authority, including capabilities the current task does not need.

## Include quality and data consequences

Security controls do not answer every risk question. An agent may stay within its permissions and still produce an incorrect recommendation. It may expose sensitive material through an allowed output destination, or make a decision that affects people in a way the team has not reviewed.

[NIST describes trustworthiness as several interacting characteristics](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/), with choices depending on the use context. Bring the relevant data owner or domain specialist into the review when engineering alone cannot judge the consequence.

For high-impact use cases, a narrow technical assessment should feed the organization's broader review process. Do not label it a complete assessment of obligations outside its scope.

## Turn the assessment into a release decision

Give every material scenario a disposition: change the design, test a control, restrict the deployment, accept a stated residual risk or decline the capability. Name the person responsible for that decision.

Save failed tests alongside successful ones. If a control only works through one client or under ideal network conditions, describe that limit. Revisit the assessment when a new tool, credential or data source changes what the agent can reach.
