# Workflow Engine – End-to-End Documentation

This document explains **how the workflow engine works from design time to runtime**, including:
- workflow definition
- stages & transitions
- trigger strategies
- approvals (parallel + sequential)
- runtime execution
- permissions
- history & audit trail
- frontend integration contract

This is written so **any engineer can understand the system in one read**.

---

## 1. Core Concepts (Mental Model)

The workflow engine has **three layers**:


### Key Rule
> **Workflow definitions are immutable once published.  
Instances hold all runtime state.**

---

## 2. Workflow Definition Lifecycle

### WorkflowDefinitionStatus

| Status | Meaning |
|------|--------|
| DRAFT | Editable graph (stages/transitions) |
| PUBLISHED | Active & instantiable |
| ARCHIVED | Old version, read-only |

### Rules
- Only `DRAFT` workflows can be edited
- Only `PUBLISHED` workflows can create instances
- Versioning is supported (`code + version` unique)

---

## 3. Stages

A **stage** represents a state in the workflow.

### Stage Properties

| Field | Purpose |
|-----|--------|
| isInitial | Exactly one per workflow |
| isFinal | No outgoing transitions allowed |
| category | Business meaning |
| allowedNextCategories | Optional category constraints |
| order | Visual / logical ordering |

### Category Enum (All Supported)

| Category | Meaning |
|--------|--------|
| DRAFT | Work in progress |
| SUBMITTED | Submitted by user |
| UNDER_REVIEW | Human review |
| APPROVAL | Formal approval |
| CORRECTION | Needs changes |
| ON_HOLD | Business hold |
| NORMAL | Processing |
| REJECTED | Final failure |
| COMPLETED | Final success |

---

## 4. Transitions

Transitions define **how instances move between stages**.

### Transition Properties

| Field | Purpose |
|------|--------|
| fromStageId | Source stage |
| toStageId | Target stage |
| transitionType | How the move behaves |
| triggerStrategy | Who can trigger |
| approvalConfig | Approval rules (if any) |
| approvalStrategy | ALL / ANY / MAJORITY |
| autoTrigger | System-initiated |
| allowedRoles / allowedUsers | Explicit permissions |

---

## 5. Transition Types

### TransitionType Enum

| Type | Behavior |
|-----|---------|
| NORMAL | Immediate move |
| REVIEW | Self-loop, comments only |
| APPROVAL | Blocks until approval |
| SEND_BACK | Move backwards |
| AUTO | System-triggered |

### Rules
- REVIEW must be self-loop
- AUTO cannot have users/roles
- SEND_BACK keeps instance RUNNING

---

## 6. Trigger Strategy (Who Can Act)

### TriggerStrategy Enum

| Strategy | Meaning |
|--------|--------|
| ANY_ALLOWED | Anyone |
| ALL_ALLOWED | Same as open (future extension) |
| CREATOR_ONLY | Instance creator |
| ASSIGNEE_ONLY | Assigned user |
| APPROVER_ONLY | Approval participants |
| SYSTEM_ONLY | Background worker only |

### Enforcement
Handled by `enforceTransitionPermission()` **before execution**.

---

## 7. Approvals

Approvals are **first-class runtime entities**.

### Approval Modes

#### PARALLEL
- All approvers act independently
- Strategy decides outcome

#### SEQUENTIAL
- Levels executed in order
- Next level starts only after previous succeeds

### ApprovalStrategy Enum

| Strategy | Rule |
|--------|-----|
| ALL | Everyone must approve |
| ANY | One approval is enough |
| MAJORITY | >50% wins |

### ApprovalStatus Enum

| Status |
|------|
| PENDING |
| APPROVED |
| REJECTED |

---

## 8. Runtime: Workflow Instance

A **WorkflowInstance** is a live execution.

### WorkflowInstanceStatus

| Status | Meaning |
|-------|--------|
| RUNNING | Active |
| PAUSED | Waiting for system |
| ON_HOLD | Business hold |
| COMPLETED | Finished |
| CANCELLED | Manually stopped |
| ERROR | Automation failure |

---

## 9. Runtime Flow (High Level)

startInstance()
↓
currentStage = initial
↓
getAvailableActions()
↓
executeTransition()
↓
permission check
↓
approval OR move
↓
history logged

---

## 10. Runtime APIs (Frontend Contract)

### Start Workflow

POST /:workflowId/instance


Creates a new instance at the initial stage.

---

### Get Available Actions

GET /instance/:instanceId/actions


Returns **exact buttons the UI should show**.

Example response:
```json
[
  {
    "transitionId": "t_approve",
    "label": "Approve",
    "type": "APPROVAL",
    "actions": ["APPROVE", "REJECT"]
  }
]

Frontend rule:

Only render what backend returns. Never guess.

Execute Transition
POST /instance/:instanceId/transition

{
  "transitionId": "t_approve",
  "action": "APPROVE",
  "comment": "Looks good"
}

11. History & Audit Trail

Every important event creates a WorkflowHistory record.

HistoryAction Enum
Action	When
TRANSITION	Stage change
APPROVAL_REQUESTED	Approval created
APPROVED	Approval success
REJECTED	Approval rejected
SENT_BACK	SEND_BACK
REVIEWED	REVIEW
AUTO_TRANSITION	AUTO

This gives full auditability.

12. Canonical Example Workflow

Enterprise Purchase Request (EPR)

Stages
Draft → Submitted → Review → Approval → Processing → Completed
                 ↘ Correction ↘ Rejected
                 ↘ On Hold → Resume

Scenarios Covered

Creator submits

Anyone reviews

Parallel manager approval (ANY)

Sequential finance approval (ALL)

Send back for correction

Business hold

System auto completion

Majority rejection

Cancellation / error handling

➡️ Every enum and rule is exercised

13. Why This Architecture Works

Immutable definitions

Isolated runtime state

Deterministic execution

Frontend-safe contracts

Fully auditable

Extensible without breaking changes

This is enterprise-grade workflow design.

14. Extension Points

You can add:

SLA timers

Auto escalation

Retry logic

Workflow templates

Multi-resource workflows

Without changing core logic.

15. Key Takeaway

If frontend follows getAvailableActions() and backend enforces transitions, the system is always consistent.

No hidden rules.
No duplicated logic.
No surprises.

End of document.


---

## ✅ What You Can Do Next

If you want, I can also:
- Generate **sequence diagrams (Mermaid)**
- Convert this to **OpenAPI frontend docs**
- Add **UI button rules per transition**
- Create **E2E test cases**
- Add **auto-trigger scheduler design**

Just tell me what you want next 🚀