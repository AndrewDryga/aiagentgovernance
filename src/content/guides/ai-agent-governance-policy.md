---
title: "Write an AI governance policy for agents"
description: "Use a practical policy structure that connects agent permissions to owners and enforcement."
category: Templates
primaryKeyword: "ai governance policy"
relatedKeywords:
  - "ai agent governance"
  - "ai agent permissions"
order: 3
reviewedDate: "2026-11-09"
related:
  - ai-agent-governance-framework
  - ai-agent-access-control
  - human-in-the-loop-ai
sources:
  - title: "NIST AI Risk Management Framework Core"
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  - title: "OWASP Transaction Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html"
---

An AI governance policy for agents should tell an engineer what the agent may do and tell an operator what to do when it reaches a limit. Statements such as "use AI responsibly" leave both people guessing. Write rules about specific work, affected resources and accountable decisions.

The policy below is an engineering starting point. Organizations with obligations concerning personal data, employment, regulated services or particular jurisdictions need qualified review of those matters. A policy document does not establish compliance by itself.

## State which deployments the policy covers

Define an agent by its deployed purpose and tool access. Include internal assistants when they can read protected information or cause changes. A shared chat interface can contain several deployments with different authority.

Record the policy owner, effective date and review trigger. Link the policy to an inventory containing the accountable owner for each agent. The inventory should also identify deployments that are paused or being retired, because their credentials may still exist.

[NIST's governance guidance](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) includes organizational responsibilities and risk-management processes. Your local policy needs to turn those responsibilities into decisions people can perform.

## Write rules that identify their enforcement point

For each rule, name the component or person that makes it real.

| Policy statement                                           | Enforcement or evidence                         |
| ---------------------------------------------------------- | ----------------------------------------------- |
| The diagnostic agent may inspect only the assigned service | Resource checks in the receiving API            |
| Production changes require an authorized reviewer          | Approval verified before execution              |
| Requests for another customer's resources are denied       | Tenant checks using trusted identity context    |
| Temporary exceptions expire                                | Expiry checked when a request is evaluated      |
| Operations can suspend an agent                            | Tested control for new requests and queued work |

A sentence inside the agent's instructions can explain a rule. It should not be the only implementation of a rule whose failure could expose data or change a protected system.

## Use a short policy skeleton

This sample is prose for review. It is not configuration accepted by any product.

```text
Purpose
The agent assists with a named operational task.

Ownership
A named team owns the deployment, its permissions and support.

Permitted work
List the operations, resource scope and allowed output destinations.

Human decisions
List actions requiring review and the roles allowed to approve them.

Prohibited work
List operations that remain unavailable, even during routine escalation.

Evidence
Record requests, decisions and outcomes with sensitive data minimized.

Exceptions
Require a named owner, reason, scope and expiry.

Suspension
Identify who can stop new work and how active work is handled.

Changes
Review material changes before expanding the deployed authority.
```

Fill in the permitted work before polishing the general introduction. If the team cannot agree on what the agent is allowed to change, it is too early to approve its production access.

## Define approval as a specific decision

A reviewer needs to know which operation they are authorizing. Include the resource and arguments that affect the outcome. If those details change, the previous approval should no longer authorize the revised request.

The [OWASP transaction authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) covers server-side enforcement, protection against changes to transaction data and limited authorization lifetimes. Applying those ideas to agent actions means verifying approval at execution time, after the request has been fully specified.

Choose what happens when a reviewer is unavailable. For an action that needs approval, a timeout should leave it unexecuted. An emergency procedure may use a different authorized path, but the procedure needs its own owner and record.

## Include the awkward cases

Write down how the policy handles partial completion. An agent might finish one step and lose contact before the next. The operator needs a reliable way to discover what happened before allowing a retry.

Also cover delegation. If an agent calls another service or another agent, the original resource limits must remain meaningful. A policy that applies only to the first process leaves the downstream authority unexplained.

Define retirement as a task with evidence: disable new work, resolve pending requests, remove unneeded credentials and preserve required records under the organization's retention policy.

## Review whether people can follow it

Ask an engineer who did not write the policy to apply it to one realistic request. Have an operator use it during a simulated approval timeout. Note every point where they need an unwritten exception or an undocumented contact.

Revise those passages and repeat the exercise after a material change. Keep the policy close to the deployment records and permission configuration so reviewers can compare the intended rule with the implemented behavior.
