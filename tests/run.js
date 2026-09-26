import assert from "node:assert";
import { gapAt } from "../diffs.js";
import { checkTolerance } from "../check.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("gapAt returns a number", () => {
  assert.strictEqual(typeof gapAt([1, 3], 0), "number");
});

check("checkTolerance returns gaps", () => {
  assert.ok(Array.isArray(checkTolerance([1, 3], 5).gaps));
});

check("checkTolerance returns over list", () => {
  assert.ok(Array.isArray(checkTolerance([1, 3], 5).over));
});

check("render counts gaps", () => {
  assert.strictEqual(typeof render({ values: [1, 3], tolerance: 5 }).count, "number");
});

check("render exposes biggest", () => {
  assert.strictEqual(typeof render({ values: [1, 3], tolerance: 5 }).biggest, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
