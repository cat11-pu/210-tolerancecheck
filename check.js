// check.js：查容差（基线：一律给空表）
import { gapAt } from "./diffs.js";

export function checkTolerance(values, tolerance) {
  return { gaps: [], over: [], biggest: 0 };
}
