export type TeamCode = string;

export type ResultCode = "W" | "D" | "L";

export type ConfidenceLevel = "低" | "中等" | "中高" | "高";

export interface Team {
  code: TeamCode;
  nameZh: string;
  nameEn: string;
  colors: string;
  fifaRank: number | null;
  eloRating: number | null;
  confederation: string;
  worldCupBestResult: string;
  recentForm: ResultCode[];
  summary: string;
}

export interface OddsSnapshot {
  homeWinOdds: number;
  drawOdds: number;
  awayWinOdds: number;
  overUnderLine: number;
  overOdds: number;
  underOdds: number;
  updatedAt: string;
  sourceNote: string;
}

export interface MatchProbability {
  homeWin: number;
  draw: number;
  awayWin: number;
  over: number;
  bothTeamsToScore: number;
}

export interface ScorelineProbability {
  score: string;
  probability: number;
}

export interface UpsetPrediction extends ScorelineProbability {
  underdog: "home" | "away";
  underdogWinProbability: number;
  label: string;
  note: string;
}

export interface Prediction {
  predictedScore: string;
  confidence: ConfidenceLevel;
  probabilities: MatchProbability;
  topScorelines: ScorelineProbability[];
  upsetScoreline?: UpsetPrediction | null;
  modelVersion: string;
  modelUpdatedAt: string;
}

export interface QualificationImpact {
  homeWin: string;
  draw: string;
  awayWin: string;
}

export interface MatchStatistics {
  possessionPct: number | null;
  totalShots: number | null;
  shotsOnTarget: number | null;
  corners: number | null;
  saves: number | null;
  yellowCards: number | null;
  redCards: number | null;
}

export interface MatchResult {
  matchId: string;
  espnEventId: string;
  group: string;
  round: string;
  matchDateTw: string;
  kickoffTw: string;
  homeTeam: TeamCode;
  awayTeam: TeamCode;
  homeScore: number;
  awayScore: number;
  finalScore: string;
  completedAt: string;
  predictionSnapshot: {
    predictedScore: string;
    probabilities: MatchProbability;
    confidence: ConfidenceLevel;
    modelVersion: string;
    modelUpdatedAt: string;
  };
  evaluation: {
    grade: "exact" | "result" | "miss";
    exactScore: boolean;
    resultCorrect: boolean;
    homeGoalError: number;
    awayGoalError: number;
    totalGoalError: number;
    scoreDistance: number;
  };
  statistics: {
    home: MatchStatistics;
    away: MatchStatistics;
  };
  analysisReasons: string[];
  source: {
    name: string;
    eventUrl: string;
    fetchedAt: string;
  };
  recordedAt: string;
}

export interface Match {
  id: string;
  group: string;
  round: string;
  matchDateTw: string;
  kickoffTw: string;
  venue: string;
  homeTeam: TeamCode;
  awayTeam: TeamCode;
  status: "scheduled" | "live" | "final";
  attentionTags: string[];
  filterTags: Array<"high" | "group" | "asia" | "goals">;
  odds: OddsSnapshot;
  prediction: Prediction;
  summary: string;
  plainLanguageAnalysis: string[];
  keyFactors: string[];
  historyNote: string;
  qualificationImpact: QualificationImpact;
  result?: MatchResult;
}

export interface StandingRow {
  teamCode: TeamCode;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  qualificationProbability: number;
  status?: string;
}

export interface GroupStanding {
  name: string;
  note: string;
  sourceUpdatedAt: string;
  rows: StandingRow[];
}

export interface EditorialNote {
  title: string;
  text: string;
}

export interface OddsAdminDraft {
  matchId: string;
  homeWinOdds: number;
  drawOdds: number;
  awayWinOdds: number;
  overUnderLine: number;
  overOdds: number;
  underOdds: number;
  updatedAt: string;
  sourceNote: string;
}
