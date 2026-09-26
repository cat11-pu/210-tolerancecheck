// diffs.js：算差
export function gapAt(values, spot) {
  if (!Array.isArray(values) || values.length < 2) return 0;
  if (spot < 0 || spot >= values.length - 1) return 0;
  return values[spot + 1] - values[spot];
}
