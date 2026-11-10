---
title: "Least privilege for AI agents"
description: "Limit an agent's authority to the actions, resources and time its task actually needs."
category: Access
primaryKeyword: "least privilege ai agents"
relatedKeywords:
  - "ai agent access control"
  - "ai agent permissions"
order: 8
reviewedDate: "2026-11-09"
related:
  - ai-agent-access-control
  - ai-agent-identity
  - production-access-for-ai-agents
sources:
  - title: "AWS IAM security best practices"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
  - title: "Kubernetes RBAC good practices"
    url: "https://kubernetes.io/docs/concepts/security/rbac-good-practices/"
  - title: "OWASP Excessive Agency"
    url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
answer: "Least privilege gives an AI agent only the authority needed for its assigned work. Apply it to the tools the agent can call, the resources those tools can reach and the credentials used downstream. A short tool menu can still hide broad administrator access."
---

Start with one task the agent must complete. For a deployment investigator, that might mean reading release metadata and selected health information for one service. Build the initial permission set around that task.

## Separate the permissions by purpose

A useful [access-control review](/guides/ai-agent-access-control/) asks what each permission contributes. Avoid granting a general engineering role merely because it already exists.

| Task need                          | Narrower permission choice                            |
| ---------------------------------- | ----------------------------------------------------- |
| Identify the deployed version      | Read deployment metadata for the assigned service     |
| Check whether an instance responds | Run a bounded health check against assigned instances |
| Inspect recent errors              | Read an approved, filtered log view                   |
| Propose a restart                  | Create a request for a separately controlled action   |
| Investigate another service        | Require an explicit scope change                      |

The choices are illustrative. Your platform may express them as API scopes, action definitions, operating-system permissions or several controls together.

If a task needs an exception, inspect whether the operation can be made narrower. A tool that returns a small diagnostic report may remove the need to give the agent direct access to a large data store.

## Check the indirect effects of a permission

Permission names can hide consequences. Read the platform's documentation for capabilities that create identities, change policies or execute work under another identity.

Kubernetes documents that permission to create workloads can also expose resources those workloads mount and the authority of service accounts they use. It also warns about wildcard grants covering future resource types. Review [RBAC's effective capabilities](https://kubernetes.io/docs/concepts/security/rbac-good-practices/) when deciding what a grant allows.

An apparently read-only operation also deserves inspection. It can expose private data, consume resources or reach an API whose name understates its behavior. Describe the operation's effect in your permission review.

## Limit the duration of authority

Some work runs continuously; some exists for one task. Tie temporary work to the [agent lifecycle](/guides/ai-agent-lifecycle/) so its authority does not remain after the job ends.

[AWS recommends temporary credentials for workloads](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html), with permissions scoped to the required operations and resources. In another environment, use the identity mechanisms that environment supports and document their limits.

Short credential lifetimes reduce the duration of a leaked credential's usefulness, but they do not settle every revocation question. An already accepted operation may continue. A cached authorization decision may outlive a policy update. Test what actually stops when you disable an agent.

## Keep unused tools out of the deployment

An experimental tool can remain available after the experiment ends. Review the deployed tool list and remove capabilities without a current purpose.

[OWASP's excessive-agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) recommends limiting available extensions and their functionality. For an agent deployment, keep that list with the configuration so a new tool receives the same review as a new credential.

When a tool provides both inspection and mutation, consider separate operations with separate permission checks. This lets the agent gather evidence without receiving the authority to perform every possible follow-up.

## Expand from observed need

Run representative tasks in a test environment and record requests that fail because permission is missing. Have the owner decide whether each request is necessary, outside scope or evidence of a tool design problem.

Do not automatically grant every permission the agent asks for. A denial might be the correct result. Conversely, a task that only succeeds after a person repeatedly changes policy may need a better supported workflow.

Review unused permissions after a reasonable observation period, including infrequent maintenance tasks. A permission absent from last week's logs may still support a documented recovery procedure. Confirm the need with its owner before removing it.

## Keep a small permission ledger

For each grant, record the task it serves, the affected resources, the enforcement point and the review owner. Add an expiry where the grant is temporary.

Test a valid request and a nearby invalid request whenever the permission changes. Useful invalid cases include another account's resource, an expanded target set and an operation that belongs to a different role. Retain the results so the next reviewer can see what the grant permits in practice.
