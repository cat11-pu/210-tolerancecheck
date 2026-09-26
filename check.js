// check.js：查容差
import { gapAt } from "./diffs.js";

export function checkTolerance(values, tolerance) {
  if (tolerance < 0) {
    const error = new Error("tolerance must be non-negative");
    error.code = "E_BAD_TOLERANCE";
    throw error;
  }
  const gaps = [];
  const over = [];
  let biggest = 0;
  const count = Math.max(0, values.length - 1);
  for (let spot = 0; spot < count; spot += 1) {
    const gap = gapAt(values, spot);
    gaps.push(gap);
    const size = Math.abs(gap);
    if (size > tolerance) over.push(spot);
    if (size > biggest) biggest = size;
  }
  return { gaps: gaps, over: over, biggest: biggest };
}
