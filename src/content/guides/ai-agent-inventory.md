---
title: "Build an AI agent inventory"
description: "Connect each deployment to its owner, identities, tools, target systems and retirement state."
category: "Operations"
primaryKeyword: "ai agent inventory"
relatedKeywords: ["agent inventory", "ai agent registry"]
order: 15
reviewedDate: "2026-11-09"
answer: "An AI agent inventory is a maintained record of deployed agents and the authority behind them. Each entry should identify a stable deployment ID, accountable owner, purpose, runtime, identities, tools, data destinations and lifecycle state. It needs links to observed configuration and review evidence, rather than a list of model or product names alone."
related: ["ai-agent-identity", "ai-agent-lifecycle", "ai-agent-governance-framework"]
sources: [{"title": "Microsoft Defender non-human identities", "url": "https://learn.microsoft.com/en-us/defender-xdr/investigate-non-human-identities"}, {"title": "AWS IAM security best practices", "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}, {"title": "NIST AI RMF 1.0 Core", "url": "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"}]
---

Two teams can use the same assistant product with entirely different access. One deployment may read a test repository; another may change production. Listing the product once does not describe either deployment well enough to review.

Choose the inventory unit around purpose, ownership and effective authority. A deployment record can point to many runs without creating a new permanent inventory entry for each conversation.

## Give the record a stable identifier

Use an ID that survives display-name changes and credential rotation. Keep the model and runtime versions as attributes, not as the deployment's identity. If a deployment is replaced by another with different ownership or authority, preserve the old record and make their relationship explicit.

The [expanded inventory CSV](/resources/agent-inventory-expanded.csv) includes a clearly synthetic example row. It extends the site's [simple inventory template](/downloads/agent-inventory.csv) with identity, evidence and retirement fields. It contains references to credentials, never credential values.

| Field group | What belongs there |
| --- | --- |
| Ownership | Accountable team, operating contact, suspension authority |
| Purpose | Intended task, excluded tasks and affected service |
| Deployment | Runtime location, configuration revision and model reference |
| Authority | Principal IDs, delegated user context, action and target scope |
| Data | Sources, output destinations, sensitivity decisions |
| Lifecycle | Proposed, testing, active, suspended or retired state |
| Evidence | Last verified configuration, test record and next review trigger |

Use your existing system of record if it can hold these relationships. A spreadsheet can be a reasonable starting point; its owners still need a process for detecting drift.

## Populate one entry from evidence

Consider the fictional `agent-checkout-diagnostics-01`. Its purpose is to explain checkout incidents from a filtered telemetry view. Checkout engineering owns it; the on-call lead can suspend it. The runtime uses a distinct diagnostic principal and a tool service that can read only checkout health and deployment metadata.

The record should point to the identity configuration and action definitions that establish those facts. A field saying "read-only" is a claim to verify, not a substitute for inspecting permissions. Record when the deployed state was checked and by whom.

### Map more than one identity

A task may involve the requesting engineer, the agent deployment, the tool-service principal and a downstream account. Store those roles separately or link to a related identity table. The [agent identity guide](/guides/ai-agent-identity/) explains attribution across the request.

[Microsoft Defender's non-human identity inventory](https://learn.microsoft.com/en-us/defender-xdr/investigate-non-human-identities) is one example of a source for service-principal and application records. It does not remove the need to connect those identities to your local agent purpose and owner.

## Discover deployments from several directions

Ask teams about their known agents, then reconcile that list with deployment configuration, scheduled jobs, identity records and tool-service activity. Each source can reveal a different gap.

An identity with recent tool activity but no deployment record needs investigation. A registered deployment with no activity may be unused, paused or simply infrequent. Do not delete its access based only on a short observation window; contact its owner and inspect documented recovery duties.

Record discovery provenance and uncertainty. "Observed credential use; deployment owner unresolved" is more useful than assigning the first nearby team as owner. Put the unresolved case in a review queue with someone responsible for finding the answer.

## Make changes update the record

A new tool, wider target scope or new data destination should update both the deployment configuration and its inventory relationship. Add a review link in the same change process rather than relying on a later annual survey.

Compare the intended scope with observed configuration periodically. If a principal gained a broader role outside the normal deployment process, the agent's reach may have changed without a code release. The [least-privilege guide](/guides/least-privilege-ai-agents/) explains how to review the effective grants.

[AWS IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) includes reviewing unused identities and permissions. Use activity as evidence for the review while keeping the owner's stated purpose and infrequent tasks in view.

## Treat suspension and retirement as states with evidence

Marking an inventory entry suspended should correspond to an actual operating action. Record which scheduler, credential or action path was disabled and what happened to queued or accepted work.

Retirement needs similar detail. Remove unnecessary credentials and triggers, reconcile outstanding operations, and preserve required history. Keep the stable ID so an old audit event remains attributable. The [lifecycle guide](/guides/ai-agent-lifecycle/) provides the transition procedure.

An inventory can show "retirement in progress" while one downstream credential remains unresolved. That is more accurate than deleting the row and losing the open work.

## Test whether someone can use the inventory

Give an operator a deployment ID and ask them to find its owner, effective target scope and stop procedure. Then give them an audit event containing only a principal ID and ask them to work backward to the deployment.

Record missing links from both exercises. A useful inventory supports investigation in either direction: from an agent to its reach, and from a consequential action to the agent and people responsible for it.
