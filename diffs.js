// diffs.js：算一对相邻差（后一个减前一个，带符号）
export function gapAt(values, spot) {
  return values[spot + 1] - values[spot];
}
