---
title: "AI governance vs AI security"
description: "Understand how governance decisions and security controls work together in an agent deployment."
category: "Foundations"
primaryKeyword: "ai governance vs ai security"
relatedKeywords:
  - "ai agent governance"
  - "ai agent security"
order: 10
reviewedDate: "2026-11-09"
related:
  - what-is-ai-agent-governance
  - ai-agent-risk-assessment
  - ai-agent-access-control
sources:
  - title: "NIST AI Risk Management Framework Core"
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  - title: "NIST AI Risks and Trustworthiness"
    url: "https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/"
  - title: "OWASP Excessive Agency"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
answer: "AI governance sets responsibility and rules for how an organization uses AI. AI security protects the systems, data and operations involved. The two meet whenever a policy decision needs technical enforcement, such as restricting an agent to one customer's resources."
---

For a tool-using agent, both are necessary. A team can have well-designed access checks while lacking an owner for the deployment. It can also have a carefully written policy whose rules never reach the service that performs the work.

## Compare the decisions each discipline makes

The boundary is useful for assigning work, although many decisions need people from both sides.

| Situation                        | Governance decision                                   | Security work                        |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| An agent needs production access | Decide whether the use is appropriate and who owns it | Enforce the approved scope           |
| A new data source is proposed    | Decide whether the agent may use it for this purpose  | Protect access and output paths      |
| An exception is requested        | Name who can accept the risk and for how long         | Apply a limited, expiring grant      |
| Suspicious behavior appears      | Assign authority to suspend and communicate           | Investigate and contain the activity |
| The deployment changes           | Decide what requires renewed review                   | Test the changed controls            |

[NIST's AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) treats governance as a function that runs through risk management. In an engineering team, that means connecting ownership decisions to the actual deployment process.

## Follow one request through both

Imagine an assistant that helps support engineers investigate failed payments. The service owner approves a purpose: gather diagnostic facts for an assigned incident. The data owner approves a limited view that excludes payment credentials.

Security work implements those decisions. The tool authenticates the agent, checks the incident's resource scope and returns only the approved fields. The audit record identifies the requester and outcome.

If the agent later proposes issuing a refund, the existing approval to investigate does not settle that new use. The owner must decide whether refunds belong in the workflow and what review is required. Engineers can then implement the resulting authority.

## Account for mistakes as well as attacks

Security reviews often examine hostile inputs, stolen credentials and unauthorized access. Governance also asks whether the task should be delegated, whether its output is suitable for use, and who handles consequences when the system makes an ordinary mistake.

[NIST's trustworthiness guidance](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/) treats security as one characteristic among several, including reliability, accountability and privacy. An agent can remain within its permissions while producing a poor recommendation.

For consequential decisions, bring in someone who can judge the domain outcome. A platform engineer can verify that a request reached the correct database. A domain owner may be needed to judge whether the resulting recommendation is appropriate.

## Find the gaps between policy and implementation

Ask for one example of each material rule being enforced. If the rule says an agent cannot change production without approval, inspect the operation that performs the change. Check alternate clients and retries.

[OWASP's excessive-agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) focuses on what tools and permissions let an agent do. A governance review can use those findings to decide which capabilities should remain available and which require redesign.

Also look for the reverse gap: controls without an owner. A denied request may be correct, or it may prevent an approved task. Someone needs authority to make that distinction and update the policy with evidence.

## Review vendors against the work they actually cover

Ask a prospective tool provider which part of the process it implements. An identity service, approval workflow, model evaluation tool and incident assistant solve different parts of the problem.

Use the [governance tool evaluation worksheet](/guides/ai-governance-tools/) to request a demonstration using an ordinary case and a prohibited case from your own workflow. Determine who configures the rules, where enforcement happens and which evidence is retained. Record any responsibilities left to your team.

Avoid treating a product's use of "governance" as a complete scope statement. Write down the exact capabilities you need and the organizational decisions that remain yours.

## Keep the shared record small enough to maintain

For each deployment, use the [governance framework](/guides/ai-agent-governance-framework/) to retain its purpose, owner, permission scope, relevant test results and accepted exceptions. Link detailed security findings where needed. Update the record when changes affect those decisions.

During review, ask the owner to explain the current scope and ask an engineer to demonstrate it. A disagreement between those two accounts gives the team a specific issue to resolve.
