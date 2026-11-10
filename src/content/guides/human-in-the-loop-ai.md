---
title: "Human in the loop AI that people can actually review"
description: "Design approval steps that give a person enough context and authority to make a useful decision."
category: Operations
primaryKeyword: "human in the loop ai"
relatedKeywords:
  - "ai agent governance"
  - "ai agent permissions"
order: 5
reviewedDate: "2026-11-09"
related:
  - ai-agent-governance-policy
  - ai-agent-risk-assessment
  - ai-agent-audit-trail
sources:
  - title: "NIST AI Risk Management and Human-AI Interaction"
    url: "https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/"
  - title: "OWASP Transaction Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html"
answer: "Human in the loop AI puts a person into a decision or review process. For an agent that can act on systems, the useful question is where that person intervenes and what they can still change. Reviewing a production action after it finishes serves a different purpose from approving it beforehand."
---

A review step needs a real decision. If the person sees only the agent's reassuring summary and a button marked "Approve," they may have no practical way to judge the request.

## Choose the point of intervention

There are several places to involve a person. They solve different problems.

| Review point       | What the person decides                           |
| ------------------ | ------------------------------------------------- |
| Before the task    | Whether the goal and scope are appropriate        |
| Before an action   | Whether this specific effect should occur now     |
| After a result     | Whether the output is correct or needs correction |
| During an incident | Whether to suspend work or change the response    |

A deployment can use more than one. An engineer may approve the initial diagnostic scope, let the agent gather permitted evidence, then review a proposed service restart. Post-task review can improve future behavior without being mistaken for prevention of that restart.

[NIST's discussion of human-AI interaction](https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/) explains that human roles and responsibilities vary across the lifecycle. State the role in the workflow so operators know whether they are giving advice, granting authority or accepting a result.

## Show the facts that affect the decision

For a production change, include the exact target, requested operation and arguments that control its scope. The [worked governance records](/guides/ai-governance-examples/) show what a reviewer can accept, restrict or decline. Explain the expected customer effect and identify evidence supporting the proposal. Link to original observations when the reviewer needs to inspect them.

Separate observed facts from the agent's interpretation. "The health endpoint failed at 14:05" is an observation. "A restart will fix it" is a prediction. A reviewer may agree with the observation and reject the proposed response.

The [OWASP transaction authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) recommends making significant transaction details visible to the person authorizing them. For agent tools, a useful application is to bind approval to the operation and target the reviewer actually saw.

## Make the choices honest

Offer a refusal path that preserves context. A reviewer should be able to reject the action, ask for more evidence or return it for a narrower proposal. Treat silence as pending or expired when the action requires approval.

Do not put a hidden automatic approval behind a timer. If a deployment is allowed to act unattended under specified conditions, document and enforce those conditions directly.

An approval should expire when its assumptions no longer hold. If the agent changes the target from one instance to a whole service, ask for a new decision. If the incident has ended before the reviewer responds, verify that the request is still relevant before dispatch.

## Match review volume to available attention

A queue that asks people to approve every routine lookup consumes the attention needed for consequential decisions. Estimate the expected number of requests during a normal shift and during an incident. Give the reviewer a way to see which requests are related.

Start by defining low-impact operations that the system can permit within narrow limits. Keep human review for decisions whose impact or uncertainty justifies it. Deny unsupported requests instead of asking reviewers to compensate for missing controls.

Watch what people do in practice. Frequent bulk approvals, expired requests and repeated requests for the same action can reveal a poorly chosen review boundary. They can also reveal staffing gaps. Discuss the cause before widening access.

## Plan for the unavailable reviewer

The agent needs a defined next step when its reviewer is offline. It may continue unrelated permitted work, save its findings or stop the task. It should not repeatedly ask different people until one agrees.

An emergency route needs a named authority and a limited scope. Record why the normal path was unavailable and what the emergency decision permitted. Afterward, check whether that access was removed.

Include the unavailable-reviewer case in [agent evaluation](/guides/ai-agent-evaluation/) before enabling the workflow. A successful happy-path demonstration will not show whether a pending request survives a restart or whether a late approval unexpectedly launches old work.

## Test the screen with an actual decision

Give a reviewer a sample request containing an intentional scope error on a test resource. Ask them to explain what would happen and whether they would approve it. Observe which facts they have to search for.

Then change a material argument after approval and verify that the system prevents the changed request from executing under the old decision. The interface and enforcement must agree about what the person authorized.
