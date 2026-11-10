---
title: "An AI governance checklist for agent access"
description: "Collect ownership, scope, test evidence and unresolved decisions before releasing an agent or expanding its permissions."
category: "Reviews & policy"
primaryKeyword: "ai governance checklist"
relatedKeywords: ["ai agent governance checklist", "agent release checklist"]
order: 16
reviewedDate: "2026-11-09"
answer: "An AI governance checklist records whether the decisions and evidence required for a specific deployment are complete. For an agent, review ownership, purpose, permissions, data use, evaluation, human approval, audit and suspension. Keep failed, untested and not-applicable items distinct, and finish with a named decision about the exact release scope."
related: ["ai-agent-governance-policy", "ai-agent-risk-assessment", "ai-agent-evaluation"]
sources: [{"title": "NIST AI RMF 1.0 Core", "url": "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"}, {"title": "OWASP Transaction Authorization", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html"}, {"title": "AWS IAM security best practices", "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}]
---

Use one review record for one candidate deployment or permission change. Name the configuration under review before collecting evidence. A checklist for last month's read-only assistant does not cover today's new export tool.

Download the [release review worksheet](/resources/agent-release-review.md). It is an engineering aid, not a compliance attestation. The [policy guide](/guides/ai-agent-governance-policy/) defines the standing rules; this review checks whether a particular candidate satisfies the applicable decisions.

## Establish who can make the decision

Record the deployment owner and the people responsible for data, access and operation. One person may hold several responsibilities on a small team. Each required decision still needs an identifiable owner with the authority to make it.

Check that the inventory record is current and that the operating contact can actually suspend the deployment. If a reviewer is only advising, record who makes the final release decision.

| Review item | Evidence to attach | Decision owner |
| --- | --- | --- |
| Purpose is specific and useful | Intended task and excluded uses | Deployment owner |
| Data use fits the task | Approved sources and destinations | Data owner |
| Authority is limited | Actual identity and permission configuration | Access owner |
| The useful task works | Representative task evaluation | Product or service owner |
| Consequential actions receive review | Exact approval and execution trace | Operator and access owner |
| Work can be stopped | Suspension and queued-work exercise | Operating owner |

[NIST's AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) includes governance across risk management. This local worksheet is an applied engineering review, not the framework's official checklist.

## Check the proposed authority

Follow the request through the visible tool and the downstream credential. Record actions, targets and output destinations. Inspect alternate routes that could reach the same protected system.

Use the [access-control guide](/guides/ai-agent-access-control/) to test an allowed request and a nearby forbidden request. Include another tenant or service, altered arguments, stale approval and a disabled identity when those cases apply.

Where approval is required, attach the proposal the reviewer saw and the action the executor accepted. [OWASP's transaction authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) supports checking that approved transaction data remains consistent through execution.

## Check whether the evidence establishes the condition

A screenshot of a green test badge is weaker than a reproducible run record with the tested versions and relevant observations. A successful tool response is weaker than evidence of the intended target state when the operation has real effects.

For each material condition, record the test setup, observed result and limitations. A test that bypassed the real authorization path cannot qualify that path. A model judge's opinion of a response cannot establish that another service received no request.

The [agent evaluation guide](/guides/ai-agent-evaluation/) separates useful task completion, boundary violations and unknown outcomes. Preserve the distinction in the review.

## Give unresolved items honest states

Use states with clear meanings:

- Pass: required evidence was obtained and meets the condition for this candidate.
- Fail: observed behavior contradicts the condition.
- Not tested: the required observation has not been made.
- Blocked: a named dependency prevents the review from completing.
- Not applicable: the condition does not apply, with a reason and an assumption to revisit.

Do not let "blocked" hide the blocking dependency. Name the missing access, owner decision or unavailable test environment. Do not count an untested condition as passed because the underlying design looks reasonable.

## Work through a limited approval

In a hypothetical review, a diagnostic assistant passes scoped reads and account-isolation tests. Its new restart operation has not been tested after a lost response. The owner wants the useful diagnostics available while that work continues.

A concrete decision is to release the diagnostic scope with the restart capability disabled. The tool-service owner must complete recovery testing before a later permission review. The inventory records the deployed read-only scope, and the test gap remains open.

If the same credential still allows an unrestricted restart through another route, the proposed limitation is not real. Resolve that path before relying on the limited approval. The [risk assessment](/guides/ai-agent-risk-assessment/) should record both the scenario and the enforced restriction.

## Include operation and retirement

Check alert delivery, evidence access and the stop procedure with the people who will use them. Record what happens to pending approvals, queued requests and already accepted operations when the agent is suspended.

Confirm which temporary credentials and grants will be removed after the work. [AWS's IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) recommends reviewing and removing unused access; the local record should identify who owns that review.

Close the checklist with the exact decision, approver, accepted limitations and next trigger. Link the [lifecycle record](/guides/ai-agent-lifecycle/) so a new model, broader credential or changed output destination reopens the relevant questions.
