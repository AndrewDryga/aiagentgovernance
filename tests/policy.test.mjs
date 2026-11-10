import test from "node:test";
import assert from "node:assert/strict";
import { assessDecision } from "../src/lib/policy.mjs";
const base = {
  owner: "Service team",
  action: "Read health",
  scope: "payments prod",
  effect: "read",
  data: "ordinary",
  scopeSize: "one",
  evidenceLocation: "Operations audit log",
};
test("a record needs owner, action, scope and evidence", () => {
  for (const change of [
    { owner: " " },
    { action: "" },
    { scope: "" },
    { evidenceLocation: " " },
  ])
    assert.equal(
      assessDecision({ ...base, ...change }).status,
      "Incomplete record",
    );
});
test("sensitive data, broad scope and difficult recovery need focused review", () => {
  for (const change of [
    { data: "sensitive" },
    { scopeSize: "fleet" },
    { effect: "hard-to-reverse" },
  ])
    assert.equal(
      assessDecision({ ...base, ...change }).status,
      "Needs a focused review",
    );
});
test("ordinary record is ready for an owner decision, never automatic approval", () => {
  const result = assessDecision(base);
  assert.equal(result.status, "Ready for an owner decision");
  assert.match(result.next, /owner|allow, require approval or deny/i);
});
