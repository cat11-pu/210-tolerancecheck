// app.js：渲染结果
import { gapAt } from "./diffs.js";
import { checkTolerance } from "./check.js";

export function render(spec) {
  const values = spec.values || [];
  const tolerance = spec.tolerance || 0;
  const view = checkTolerance(values, tolerance);
  const gaps = view.gaps || [];
  return { gaps: gaps, over: view.over || [], over_count: (view.over || []).length,
           biggest: view.biggest || 0, count: gaps.length, value_count: values.length,
           tolerance: tolerance, tail: gapAt(values, 0) };
}
