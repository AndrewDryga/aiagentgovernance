---
title: "An AI agent governance framework for engineering teams"
description: "Build a repeatable review process for agent ownership, access, testing and changes."
category: "Reviews & policy"
primaryKeyword: "ai agent governance framework"
relatedKeywords:
  - "ai governance framework"
  - "ai governance checklist"
order: 2
reviewedDate: "2026-11-09"
related:
  - what-is-ai-agent-governance
  - ai-agent-governance-policy
  - ai-agent-risk-assessment
sources:
  - title: "NIST AI Risk Management Framework Core"
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  - title: "OWASP Authorization Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
answer: "An AI agent governance framework gives a team a repeatable way to decide whether an agent is ready for a particular job. It should connect a named owner to documented permissions and evidence from testing. A review that ends with \"approved\" but leaves those details unresolved is difficult to maintain."
---

Use the following engineering process for one deployment at a time. It is a starting point for managing operational decisions, not a certification scheme or a complete enterprise governance program.

## Define the unit you are reviewing

A model alone is an incomplete review target. The same model can draft a report in one application and change production infrastructure in another.

Describe the deployed combination: agent instructions, tool definitions, runtime, identity, data sources and target systems. Record versions where they exist. Include the route through which a request reaches the target, whether that uses a CLI, an API or MCP.

Choose a boundary small enough to test. "All agents used by engineering" hides too many differences. "The incident assistant reading telemetry for the checkout service" is a manageable first review.

## Give each decision an owner

Several people may contribute, but every unresolved decision needs someone who can close it.

| Decision                            | Suggested owner            | Evidence to retain                       |
| ----------------------------------- | -------------------------- | ---------------------------------------- |
| The job is useful and appropriate   | Service owner              | Purpose and allowed outcomes             |
| Access is limited to that job       | Platform or security owner | Reviewed permission rules                |
| Operational changes are recoverable | Service operator           | Recovery procedure and test result       |
| Data use is acceptable              | Data owner                 | Approved sources and output destinations |
| The deployment can proceed          | Named deployment owner     | Accepted risks and remaining limits      |

One person may hold several roles on a small team. Keep the responsibilities visible so a staffing change does not leave the agent without an owner.

## Turn concerns into testable questions

NIST organizes its AI RMF around Govern, Map, Measure and Manage. The functions support repeated review; they are not a fixed sequence or a universal checklist. [The framework's core explains that flexibility](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

For a tool-using agent, translate a concern into an observable result. "Prevent excessive access" becomes "a request for another team's database is denied at the receiving service." "Allow human oversight" becomes "a production change waits for a currently authorized reviewer, and altered arguments invalidate that approval."

Test the ordinary path as well. A deployment that denies every request meets a narrow access test while failing its purpose. Capture the smallest useful task the agent can complete within its assigned bounds.

## Choose release evidence before running the tests

Write acceptance conditions while the design is still being discussed. This avoids changing the definition of success after an awkward result.

A practical release record might require:

- A representative task completes with the intended identity.
- A request outside the approved resource scope is denied.
- A consequential action pauses for the expected reviewer.
- A timeout produces an accurate status instead of an invented success.
- An operator can disable new requests and identify work already in progress.
- The record of a completed action contains enough information for another engineer to investigate it.

The list is an example. Add cases for the actual failure paths in the integration. [OWASP recommends testing authorization rules](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), including the permissions mapped during design.

## Make exceptions expire

An exception should say what changed, why it is necessary, who accepted the risk and when it ends. Keep its scope concrete. Permission to inspect one additional host during an incident should not silently become permanent access to a fleet.

If an exception cannot expire automatically, assign its removal to a named person and put the deadline in the team's existing work tracker. Review whether the underlying need belongs in the supported workflow.

Some requests should remain unavailable until the system can enforce them properly. Record that limit so the next person does not interpret a missing feature as an accidental configuration problem.

## Complete one review before scaling the process

This hypothetical record concerns `checkout-investigator`, an assistant that reads selected service telemetry. The names and evidence identifiers below are invented to show how a completed decision could look; they do not represent tests performed by this site.

| Review field | Example disposition |
| --- | --- |
| Owner | Checkout engineering; on-call lead owns suspension |
| Candidate | Deployment revision 12; diagnostics policy revision 3 |
| Approved purpose | Explain checkout failures from selected health and release data |
| Data boundary | Filtered telemetry; no customer payloads; incident record only |
| Authority | Read checkout diagnostics; no restart, export or identity changes |
| Illustrative evidence | Task replay T1; cross-service denial T2; suspension exercise T3 |
| Remaining gap | Lost-response recovery for a proposed restart has not been tested |
| Decision | Permit the diagnostic scope; keep restart capability disabled |
| Next review | Before adding a write action or a new output destination |

The gap does not disappear because the diagnostic tests passed. Its effect is explicit: the release remains read-only. A later proposal to add restarting must supply the missing evidence and a new decision. The [evaluation guide](/guides/ai-agent-evaluation/) explains how to design those tests; the [risk record](/guides/ai-agent-risk-assessment/) keeps the unresolved scenario visible.

### Handle an ownership handoff

Suppose the platform team takes over this deployment. The handoff needs more than changing the owner field. The receiving team should find the permission configuration, inspect a retained request, exercise suspension on test resources and accept responsibility for open exceptions. Confirm that alert and approval routes reach that team.

If the new owner cannot operate the stop control, record the handoff as incomplete. Decide whether the existing owner remains responsible or the deployment should pause. An inventory entry naming a team that lacks the required access is misleading.

### Fit the process into enterprise governance

Enterprise AI governance may set organization-wide data rules, vendor requirements and review obligations. Keep those decisions with their established owners. The deployment record should link to the relevant decisions and explain its scope, rather than copy a large corporate policy into every agent review.

For example, a central data owner may approve use of one telemetry class. The service owner still decides which diagnostic operations belong to this agent. Platform engineering supplies the identity and enforcement path. A domain reviewer may need to assess the consequence of the assistant's recommendation. Record an unresolved dependency if any required decision is missing.

Start with one workflow, then reuse its evidence format for similar deployments. If the organization adopts NIST's framework, the [NIST AI RMF mapping](/guides/nist-ai-rmf-for-agents/) can connect these local records to its functions. The mapping is a navigation aid for review; it does not confer certification.

Download the [release review worksheet](/resources/agent-release-review.md) to capture scope, evidence, gaps and the final decision in one place.

Use the [governance maturity review](/guides/ai-governance-maturity-model/) to assess each capability against its documented acceptance conditions. It keeps missing, failed and partial evidence visible without turning the review into a single score.

## Use changes to trigger review

Set review triggers that engineers can recognize: a new tool, a broader credential, a new external data source, a model change, or a different class of affected users. Compare the revised deployment with the last accepted version and rerun the relevant cases.

A periodic review still helps find unused access and owner changes. It should inspect real requests, failures and exceptions from the intervening period. Assign resulting work to an owner, with a date, before closing the review record.
