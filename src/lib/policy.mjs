export function assessDecision(input) {
  const reasons = [];
  if (!input.owner.trim())
    reasons.push(
      "Name a person or team that owns this agent and can revoke its access.",
    );
  if (!input.action.trim())
    reasons.push(
      "Describe the exact action and target before reviewing authority.",
    );
  if (!input.scope.trim())
    reasons.push("Record the assets and environment the permission covers.");
  if (!input.evidenceLocation.trim())
    reasons.push(
      "Choose where the request, decision and result will be recorded.",
    );
  if (reasons.length)
    return {
      status: "Incomplete record",
      reasons,
      next: "Fill the missing fields before deciding who may approve the action.",
    };
  if (
    input.data === "sensitive" ||
    input.effect === "hard-to-reverse" ||
    input.scopeSize === "fleet"
  )
    return {
      status: "Needs a focused review",
      reasons: [
        input.data === "sensitive"
          ? "The action handles sensitive data; define permitted fields and destinations."
          : null,
        input.effect === "hard-to-reverse"
          ? "Recovery is difficult; narrow the action and agree on recovery before granting access."
          : null,
        input.scopeSize === "fleet"
          ? "The permission reaches many targets; consider per-target grants and limits."
          : null,
      ].filter((value) => value !== null),
      next: "Record the reviewer, exact scope, decision and expiry. This worksheet does not grant permission.",
    };
  return {
    status: "Ready for an owner decision",
    reasons: [
      "The record names an owner, a target scope and an evidence path.",
      "The owner still needs to check the actual permissions and failure cases.",
    ],
    next: "Choose allow, require approval or deny in the system that enforces the action. Record the reason and an expiry.",
  };
}
