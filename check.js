// check.js：查容差（一次扫描；|差| 严格大于容差记一处超限）
import { gapAt } from "./diffs.js";

export function checkTolerance(values, tolerance) {
  if (tolerance < 0) {
    const error = new Error("tolerance must not be negative");
    error.code = "E_BAD_TOLERANCE";
    throw error;
  }
  const list = values || [];
  const gaps = [];
  const over = [];
  let biggest = 0;
  for (let spot = 0; spot < list.length - 1; spot += 1) {
    const gap = gapAt(list, spot);
    gaps.push(gap);
    const magnitude = Math.abs(gap);
    if (magnitude > biggest) { biggest = magnitude; }
    if (magnitude > tolerance) { over.push(spot); }
  }
  return { gaps: gaps, over: over, biggest: biggest };
}
