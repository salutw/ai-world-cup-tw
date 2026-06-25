import type { MatchResult } from "./types";

export function evaluationLabel(grade: MatchResult["evaluation"]["grade"]) {
  if (grade === "exact") return "精確命中";
  if (grade === "result") return "勝負命中";
  return "預測落差";
}

export function getModelPerformance(records: MatchResult[]) {
  const completedMatches = records.length;
  const exactScores = records.filter((record) => record.evaluation.exactScore).length;
  const correctResults = records.filter((record) => record.evaluation.resultCorrect).length;
  const averageScoreDistance =
    completedMatches === 0
      ? 0
      : records.reduce((total, record) => total + record.evaluation.scoreDistance, 0) / completedMatches;
  const averageTotalGoalError =
    completedMatches === 0
      ? 0
      : records.reduce((total, record) => total + record.evaluation.totalGoalError, 0) / completedMatches;

  return {
    completedMatches,
    exactScores,
    correctResults,
    exactScoreRate: completedMatches === 0 ? 0 : (exactScores / completedMatches) * 100,
    resultAccuracy: completedMatches === 0 ? 0 : (correctResults / completedMatches) * 100,
    averageScoreDistance,
    averageTotalGoalError
  };
}
