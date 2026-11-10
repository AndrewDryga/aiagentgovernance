# AI agent governance policy template

Policy owner:
Version:
Effective date:
Next review or expiry:

## Purpose and inventory

Describe the job the agent is meant to do. Name its owner, runtime, model,
connected tools, credentials, data sources and affected assets. Keep the inventory
current when the tool catalog or permissions change.

## Scope of authority

For each action, record:

| Action | Target and environment | Allowed arguments | Decision | Expiry |
| --- | --- | --- | --- | --- |
| Example: read service metrics | One named service | Selected non-sensitive fields | Allow | Team-defined date |
| Example: restart a service | One production instance | Approved target and operation | Require approval | One request |
| Example: export customer data | Any target | Any | Deny in this example | Until reviewed |

These are illustrative decisions. Derive your own from actual effects and data.

## Approval

Name who may approve each class of change. Show the exact operation, target,
arguments, likely effect and recovery plan before approval. Bind approval to
that request. Recheck if the request or policy changes. Define expiry, separation
of duties where needed, and what happens if no approver is available.

## Enforcement

Name the component that checks each permission before the side effect. Explain
how direct credentials, alternate tools and retries are controlled. Define the
failure behavior when identity, policy or approval cannot be checked.

## Evidence

Link authenticated requester, agent identity, action, target, policy version,
decision, approval and execution result with one correlation identifier.
Minimize sensitive content and restrict access to the record. Set retention
according to operational needs and applicable requirements.

## Changes and incidents

Review a permission change like a code change. Retest affected controls after
changes to models, tools, data sources or credentials. Name who may revoke
access, stop new work, preserve evidence and coordinate recovery.

## Exceptions

Record the exact scope, reason, approver, compensating controls and expiry.
An exception must be enforceable and removable. Do not let a temporary grant
become permanent because nobody owns its expiry.

This template is an engineering starting point. It is not a legal opinion,
compliance finding or evidence that a control is already enforced.
Source guide: https://aiagentgovernance.dev/guides/ai-agent-governance-policy/
