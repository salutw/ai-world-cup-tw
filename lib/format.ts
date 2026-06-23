export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatOdds(value: number) {
  return value.toFixed(2);
}

export function scoreWithSpaces(score: string) {
  return score.replace("-", " - ");
}

export function resultLabel(result: string) {
  if (result === "W") return "勝";
  if (result === "D") return "和";
  return "敗";
}
