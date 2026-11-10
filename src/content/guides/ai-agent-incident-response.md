---
title: "Incident response for an AI agent"
description: "Contain unexpected agent activity, preserve evidence and restore access only after checking the cause."
category: Operations
primaryKeyword: "ai agent incident response"
relatedKeywords:
  - "ai agent monitoring"
  - "ai agent audit trail"
order: 12
reviewedDate: "2026-11-09"
related:
  - ai-agent-audit-trail
  - ai-agent-identity
  - production-access-for-ai-agents
sources:
  - title: "NIST Incident Response Recommendations, SP 800-61r3"
    url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf"
  - title: "OWASP Logging Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
---

When an AI agent behaves unexpectedly, first establish what it has requested and what the receiving systems have actually done. A strange message is a signal to investigate. A confirmed unauthorized operation may require immediate containment. Keep those findings separate while you determine the scope.

Use your organization's incident process and assign a human response lead. An affected agent can provide evidence, but its account should be checked against tool and target-system records.

## Prepare the controls before an incident

Maintain a current owner and contact route for each deployed agent. Operators need access to its request history, permission configuration and execution records.

Document how to stop new work, disable an identity and inspect accepted operations. Include the effect of each control. Pausing a scheduler may leave running tasks active. Revoking a token may leave an already dispatched operation untouched.

Practice those steps on test resources. Record where an operator needs elevated access so that the incident does not begin with a search for someone who can use the controls.

## Triage the observed behavior

Write a brief incident statement containing the first observed time, affected agent, known targets and confirmed effects. Label uncertainty directly.

| Observation                      | Initial question                                          |
| -------------------------------- | --------------------------------------------------------- |
| Repeated denied requests         | Misconfigured workflow, changed task or attempted misuse? |
| Unexpected output destination    | Did protected data leave an approved boundary?            |
| Unapproved mutation              | Which identity and execution path accepted it?            |
| Repeated operation after timeout | Did the earlier attempt complete?                         |
| Missing audit events             | Collection failure, bypass or incomplete investigation?   |

The table suggests investigation questions. It does not assign a severity without evidence about the affected systems.

[NIST's incident response guidance](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf) recommends triage and prioritization based on risk and impact. Escalate using the same criteria your team uses for other incidents, with extra attention to the agent's reachable resources.

## Contain the relevant authority

Choose containment based on the confirmed path and likely ongoing effect. Options can include suspending the task, disabling the tool integration or restricting the affected identity. Use the narrowest effective control that the evidence supports.

Check whether the agent shares credentials with another deployment. A credential change can interrupt unrelated services, and leaving a shared credential active may leave the same path open.

Capture necessary volatile evidence when feasible, but do not allow collection to prolong confirmed harm without an explicit response decision. Record which control was applied, by whom and what it stopped. Verify its effect through the receiving systems.

## Preserve the request history and configuration

Retain the relevant input, tool definitions, policy version and action records under appropriate access restrictions. Include the model and agent configuration versions where they are available.

Treat suspicious text in tickets, files or tool output as evidence. Do not feed it into a privileged agent with instructions to follow it during the investigation. Use an isolated review process suited to the data.

[OWASP's logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) explains protections for sensitive records and log integrity. Preserve evidence references without copying credentials into a public incident thread or a broadly accessible ticket.

## Reconstruct the sequence

Build a timeline from records produced by the components involved. Separate what the agent proposed, what policy permitted, what a person approved and what the executor completed.

Look for the first point where the request exceeded its intended scope. Possible causes include an authorization defect, an overbroad credential, a tool implementation error or misleading input. Several can contribute to one incident.

Also inspect recovery behavior. A correct first operation followed by an unsafe retry can produce a failure that looks like a bad initial decision. Keep unknown outcomes open until target-side evidence resolves them.

## Restore access with evidence

Set recovery conditions before restarting the workflow. They might include fixing a permission rule, replacing an affected credential through the approved process, reviewing a tool definition and adding a regression test.

Run the previously useful task and the failure case against test resources. Confirm that the intended work succeeds and the problematic path is denied or requires the expected review.

Resume a limited scope with an operator watching the relevant records. Record who approved recovery and which limits remain. A revised prompt alone is insufficient evidence when the cause involved permissions or execution behavior.

## Turn findings into owned work

Keep the review focused on the conditions that allowed the incident. Record the customer or system effect, the evidence supporting the cause and any uncertainty that remains.

Assign corrective actions to named owners and specify how each fix will be checked. Update the stop procedure if containment exposed a gap. Revisit other deployments that use the same affected tool or permission pattern, with their owners, before declaring the underlying issue resolved.
