# Agent lifecycle transition

Blank worksheet for a deployment transition. Record observed effects; intended changes alone are not completion evidence.

- Deployment ID and inventory reference:
- Current state and candidate state:
- Reason for transition:
- Decision owner and timestamp:
- Configuration, model, tool and policy changes:
- Changed assumptions and required reviews:
- Expected authority changes:

## Execution plan

| Component | Intended change | Responsible owner | Verification | Actual evidence/status |
| --- | --- | --- | --- | --- |
| Schedulers and entry points | | | | |
| Workload/agent identity | | | | |
| Downstream credentials and grants | | | | |
| Pending approvals | | | | |
| Queued requests | | | | |
| Accepted/in-flight operations | | | | |
| Memory, caches and artifacts | | | | |
| Audit retention and identity history | | | | |

## Failure and recovery

- Stop conditions:
- Rollback behavior and limits:
- Unknown operations and reconciliation owner:
- Conditions for resuming work:
- Whether old requests need new authorization or approval:
- Remaining shared credentials or dependencies:

## Closure

- Actual resulting state:
- Evidence showing new work has the intended limits:
- Open items, owners and affected scope:
- Historical identifiers retained:
- Inventory updated:
- Next review trigger:

Do not mark retirement complete while unexplained authority remains. Do not release stale queued work merely because a paused deployment reconnects.
