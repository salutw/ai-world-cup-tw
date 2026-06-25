import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const forceRefresh = process.argv.includes("--refresh");
const catalogArgument = process.argv.find((argument) => !argument.startsWith("--") && argument !== process.argv[0] && argument !== process.argv[1]);
const catalogPath = path.join(root, catalogArgument || "out/api/matches");
const historyPath = path.join(root, "data/match-history.json");
const scoreboardBase = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";

function parseScore(score) {
  return score.split("-").map(Number);
}

function outcome(homeGoals, awayGoals) {
  if (homeGoals > awayGoals) return "home";
  if (homeGoals < awayGoals) return "away";
  return "draw";
}

function addDays(dateKey, days) {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function compactDate(dateKey) {
  return dateKey.replaceAll("-", "");
}

function statValue(statistics, name) {
  const value = statistics?.find((stat) => stat.name === name)?.displayValue;
  return value == null ? null : Number(value);
}

function teamStats(summary, homeAway) {
  const team = summary?.boxscore?.teams?.find((item) => item.homeAway === homeAway);
  return {
    possessionPct: statValue(team?.statistics, "possessionPct"),
    totalShots: statValue(team?.statistics, "totalShots"),
    shotsOnTarget: statValue(team?.statistics, "shotsOnTarget"),
    corners: statValue(team?.statistics, "wonCorners"),
    saves: statValue(team?.statistics, "saves"),
    yellowCards: statValue(team?.statistics, "yellowCards"),
    redCards: statValue(team?.statistics, "redCards")
  };
}

function probabilityForOutcome(probabilities, actualOutcome) {
  if (actualOutcome === "home") return probabilities.homeWin;
  if (actualOutcome === "away") return probabilities.awayWin;
  return probabilities.draw;
}

function buildReasons(match, actual, homeStats, awayStats) {
  const [predictedHome, predictedAway] = parseScore(match.prediction.predictedScore);
  const actualOutcome = outcome(actual.homeScore, actual.awayScore);
  const predictedOutcome = outcome(predictedHome, predictedAway);
  const predictedTotal = predictedHome + predictedAway;
  const actualTotal = actual.homeScore + actual.awayScore;
  const reasons = [];

  if (predictedHome === actual.homeScore && predictedAway === actual.awayScore) {
    reasons.push("模型精確命中比分，勝負方向與兩隊進球數都符合賽前估計。");
  } else if (predictedOutcome === actualOutcome) {
    reasons.push("勝負方向判斷正確，但兩隊實際進球分布與模型的中央預估不同。");
  } else {
    const actualProbability = probabilityForOutcome(match.prediction.probabilities, actualOutcome);
    if (actualProbability <= 25) {
      reasons.push(`實際賽果的賽前機率只有 ${actualProbability}%，屬於模型明顯低估的結果。`);
    } else if (actualProbability <= 40) {
      reasons.push(`實際賽果的賽前機率為 ${actualProbability}%，模型有保留可能性，但中央比分選錯方向。`);
    } else {
      reasons.push(`實際賽果原有 ${actualProbability}% 機率，模型風險分布有涵蓋，但單一預估比分未能命中。`);
    }
  }

  if (actualTotal > predictedTotal) {
    reasons.push(`實際總進球比預估多 ${actualTotal - predictedTotal} 球，比賽節奏或把握機會效率高於模型假設。`);
  } else if (actualTotal < predictedTotal) {
    reasons.push(`實際總進球比預估少 ${predictedTotal - actualTotal} 球，進攻轉化率低於模型假設。`);
  }

  const homeGoalGap = actual.homeScore - predictedHome;
  const awayGoalGap = actual.awayScore - predictedAway;
  const home = match.homeTeamNameZh || match.homeTeam;
  const away = match.awayTeamNameZh || match.awayTeam;

  if (Math.abs(homeGoalGap) >= Math.abs(awayGoalGap) && homeGoalGap !== 0) {
    if (homeGoalGap > 0 && homeStats.shotsOnTarget != null) {
      reasons.push(`${home}完成 ${homeStats.shotsOnTarget} 次射正並攻入 ${actual.homeScore} 球，主隊火力高於預期。`);
    } else if (homeGoalGap < 0 && homeStats.shotsOnTarget != null) {
      reasons.push(`${home}只有 ${homeStats.shotsOnTarget} 次射正，主隊進球產出低於預期。`);
    }
  } else if (awayGoalGap !== 0) {
    if (awayGoalGap > 0 && awayStats.shotsOnTarget != null) {
      reasons.push(`${away}完成 ${awayStats.shotsOnTarget} 次射正並攻入 ${actual.awayScore} 球，客隊火力高於預期。`);
    } else if (awayGoalGap < 0 && awayStats.shotsOnTarget != null) {
      reasons.push(`${away}只有 ${awayStats.shotsOnTarget} 次射正，客隊進球產出低於預期。`);
    }
  }

  if (reasons.length < 3 && homeStats.possessionPct != null && awayStats.possessionPct != null) {
    const losingStats =
      actual.homeScore < actual.awayScore
        ? { code: home, stats: homeStats }
        : actual.awayScore < actual.homeScore
          ? { code: away, stats: awayStats }
          : null;

    if (losingStats && losingStats.stats.possessionPct >= 52) {
      reasons.push(`${losingStats.code}控球率達 ${losingStats.stats.possessionPct}%，但控球沒有有效轉化為比分。`);
    }
  }

  return reasons.slice(0, 3);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "ai-world-cup-tw-results-updater/1.0" }
  });
  if (!response.ok) throw new Error(`Fetch failed ${response.status}: ${url}`);
  return response.json();
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const history = JSON.parse(await readFile(historyPath, "utf8"));
const matches = catalog.data;
const dates = matches.map((match) => match.matchDateTw).sort();
const queryStart = addDays(dates[0], -1);
const queryEnd = dates.at(-1);
const queryDates = [];

for (let date = queryStart; date <= queryEnd; date = addDays(date, 1)) {
  queryDates.push(date);
}

const events = [];
for (const dateKey of queryDates) {
  const scoreboard = await fetchJson(`${scoreboardBase}/scoreboard?dates=${compactDate(dateKey)}`);
  events.push(...(scoreboard.events || []));
}

const existingByMatch = new Map(history.records.map((record) => [record.matchId, record]));
let changed = false;

for (const match of matches) {
  const event = events.find((candidate) => {
    const competitors = candidate.competitions?.[0]?.competitors || [];
    const home = competitors.find((item) => item.homeAway === "home")?.team?.abbreviation;
    const away = competitors.find((item) => item.homeAway === "away")?.team?.abbreviation;
    return home === match.homeTeam && away === match.awayTeam;
  });

  if (!event?.status?.type?.completed) continue;

  const competitors = event.competitions[0].competitors;
  const homeCompetitor = competitors.find((item) => item.homeAway === "home");
  const awayCompetitor = competitors.find((item) => item.homeAway === "away");
  const actual = {
    homeScore: Number(homeCompetitor.score),
    awayScore: Number(awayCompetitor.score)
  };
  const existing = existingByMatch.get(match.id);
  if (
    !forceRefresh &&
    existing?.espnEventId === String(event.id) &&
    existing.homeScore === actual.homeScore &&
    existing.awayScore === actual.awayScore
  ) {
    continue;
  }
  const summary = await fetchJson(`${scoreboardBase}/summary?event=${event.id}`);
  const homeStats = teamStats(summary, "home");
  const awayStats = teamStats(summary, "away");
  const [predictedHome, predictedAway] = parseScore(match.prediction.predictedScore);
  const actualOutcome = outcome(actual.homeScore, actual.awayScore);
  const predictedOutcome = outcome(predictedHome, predictedAway);
  const record = {
    matchId: match.id,
    espnEventId: String(event.id),
    group: match.group,
    round: match.round,
    matchDateTw: match.matchDateTw,
    kickoffTw: match.kickoffTw,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeScore: actual.homeScore,
    awayScore: actual.awayScore,
    finalScore: `${actual.homeScore}-${actual.awayScore}`,
    completedAt: event.date,
    predictionSnapshot: {
      predictedScore: match.prediction.predictedScore,
      probabilities: match.prediction.probabilities,
      confidence: match.prediction.confidence,
      modelVersion: match.prediction.modelVersion,
      modelUpdatedAt: match.prediction.modelUpdatedAt
    },
    evaluation: {
      grade:
        predictedHome === actual.homeScore && predictedAway === actual.awayScore
          ? "exact"
          : predictedOutcome === actualOutcome
            ? "result"
            : "miss",
      exactScore: predictedHome === actual.homeScore && predictedAway === actual.awayScore,
      resultCorrect: predictedOutcome === actualOutcome,
      homeGoalError: Math.abs(actual.homeScore - predictedHome),
      awayGoalError: Math.abs(actual.awayScore - predictedAway),
      totalGoalError: Math.abs(actual.homeScore + actual.awayScore - predictedHome - predictedAway),
      scoreDistance: Math.abs(actual.homeScore - predictedHome) + Math.abs(actual.awayScore - predictedAway)
    },
    statistics: {
      home: homeStats,
      away: awayStats
    },
    analysisReasons: buildReasons(match, actual, homeStats, awayStats),
    source: {
      name: "ESPN",
      eventUrl: `https://www.espn.com/soccer/match/_/gameId/${event.id}`,
      fetchedAt: new Date().toISOString()
    },
    recordedAt: existing?.recordedAt || new Date().toISOString()
  };

  existingByMatch.set(match.id, record);
  changed = true;
}

if (changed) {
  const records = Array.from(existingByMatch.values()).sort(
    (first, second) => first.matchDateTw.localeCompare(second.matchDateTw) || first.kickoffTw.localeCompare(second.kickoffTw)
  );
  const nextHistory = {
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    source: "ESPN FIFA World Cup scoreboard and summary",
    records
  };
  await writeFile(historyPath, `${JSON.stringify(nextHistory, null, 2)}\n`, "utf8");
  console.log(`Updated ${records.length} completed match records.`);
} else {
  console.log("No new completed match results.");
}
