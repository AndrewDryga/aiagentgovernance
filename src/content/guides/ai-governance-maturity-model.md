---
title: "Assess AI governance maturity"
description: "Use observable capability gaps to choose the next improvement, without inventing a certification score."
category: "Reviews & policy"
primaryKeyword: "ai governance maturity model"
relatedKeywords: ["ai governance maturity", "agent governance maturity"]
order: 18
reviewedDate: "2026-11-09"
answer: "An AI governance maturity model helps a team assess how consistently it owns, controls and reviews AI deployments. Useful assessment relies on evidence for each capability, such as current inventory, enforced permissions and tested suspension. Greater autonomy is not proof of greater maturity, and a self-assessment score does not establish compliance."
related: ["ai-agent-governance-framework", "ai-agent-inventory", "ai-governance-checklist"]
sources: [{"title": "Microsoft agentic AI maturity model: governance and security", "url": "https://learn.microsoft.com/en-us/agents/adoption-maturity-model/maturity-model-security-governance"}, {"title": "NIST AI RMF Playbook", "url": "https://airc.nist.gov/airmf-resources/playbook/"}, {"title": "AWS IAM security best practices", "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}]
---

A team may have excellent model evaluations and no reliable way to revoke an abandoned agent's credentials. Averaging those capabilities into one score hides the gap that needs attention.

Assess the workflow you operate, then expand the assessment across similar deployments. The goal is a concrete next action with an owner and evidence of completion.

## Keep capability assessments separate

[Microsoft publishes an agentic AI maturity model](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/maturity-model-security-governance) that includes governance, security and operation. Models differ in their scope and levels. If you adopt one, retain its definitions instead of quietly changing the meaning of a score.

The worksheet here is an original engineering heuristic. It is not a certified model or an official NIST mapping. For each capability, use one of four evidence states: unknown, documented, demonstrated, or maintained.

| State | Evidence needed |
| --- | --- |
| Unknown | The team cannot yet establish the current behavior |
| Documented | An owner and intended procedure exist |
| Demonstrated | The procedure or control passed its documented acceptance conditions for the reviewed deployment |
| Maintained | Changes and periodic checks keep that evidence current |

A failed or partial exercise does not establish the demonstrated state. Retain its outcome and open gap alongside the evidence. These states describe evidence, not risk severity. A documented permission boundary on a high-impact action can demand faster attention than an unknown naming convention.

## Review five capabilities

| Capability | Question to test | Useful evidence |
| --- | --- | --- |
| Inventory and ownership | Can an operator identify who owns each active deployment? | Current records reconciled with deployment and identity sources |
| Authority | Does actual access match the assigned task? | Effective grants and allowed/denied request tests |
| Review | Can a person make and enforce a specific consequential decision? | Approval packet and changed-argument test |
| Evidence | Can someone reconstruct a completed or uncertain action? | Executor records, identifiers and reconstruction exercise |
| Lifecycle | Can the team suspend, change and retire the deployment? | Stop exercise, credential review and retirement record |

The [framework guide](/guides/ai-agent-governance-framework/) explains the operating responsibilities behind these capabilities. The [assessment worksheet](/resources/governance-capability-review.csv) leaves status and evidence fields blank so your team can record what it actually finds.

## Work through an uneven assessment

In this hypothetical team, the [inventory](/guides/ai-agent-inventory/) names every known deployment owner, but nobody has reconciled it with identity records. Ownership is documented. It is not yet demonstrated that the list covers the running estate.

A scoped diagnostic API has current allowed and denied test results. That authority boundary is demonstrated for the tested version. The team has not tested a newly added CLI route, so the record limits its claim to the original route.

Approval packets are clear, but the team has no evidence that an approval expiring in a queue prevents execution. Review is documented with an unresolved enforcement question. This gap should not disappear because the approval screen looks finished.

The team can reconstruct successful operations and has practiced resolving a lost response. Evidence is demonstrated. Suspension is only a written runbook; nobody on the current on-call rotation has used it. Lifecycle remains documented.

## Choose the next action by consequence

For this example, testing the queued approval and the new client route should precede a cosmetic improvement to the inventory. Those gaps affect whether an agent can perform an unreviewed action. Assign an owner and a concrete completion condition to each.

A useful action says: "Tool-service owner will demonstrate that an expired queued approval produces no dispatch, and attach the executor evidence." "Improve governance maturity" gives the owner no testable finish line.

Do not automatically choose the largest program. A small team may improve its operating evidence by adding one review to an existing deployment pull request. A new platform is justified only if the current process cannot reasonably support the work.

## Keep restrictive decisions compatible with maturity

An organization can deliberately keep certain agents read-only or require human review for every production change. Those choices can be well governed when the scope is appropriate and enforced. Increasing autonomy should follow a separate evidence-based decision about the task.

Likewise, a small deployment does not need every capability of an enterprise program. Record which concerns do not apply and why. [NIST's AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/) describes voluntary suggestions to select for the use context, rather than a sequence to complete in full.

## Reassess after the change has operated

Attach evidence when the improvement is complete, then check whether the procedure stays usable during normal work. A new owner, changed tool or broader credential may invalidate earlier evidence.

Review unused access with its owner and observed activity. [AWS's IAM practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) include reviewing permissions and credentials; the local capability record should show when and how that review occurred.

Use the [release checklist](/guides/ai-governance-checklist/) for a specific deployment decision. Use maturity assessment to find repeated process gaps across those decisions and choose the next repair.
