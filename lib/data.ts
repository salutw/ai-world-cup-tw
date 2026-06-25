import type { EditorialNote, GroupStanding, Match, MatchProbability, ScorelineProbability, StandingRow, Team, TeamCode } from "./types";

const confederationLabel: Record<string, string> = {
  AFC: "亞洲足聯",
  CAF: "非洲足聯",
  CONCACAF: "中北美及加勒比海足聯",
  CONMEBOL: "南美足聯",
  UEFA: "歐洲足聯",
  OFC: "大洋洲足聯"
};

const teamDefinitions = [
  ["MEX", "墨西哥", "Mexico", "CONCACAF", "linear-gradient(135deg, #0b7f53 0 33%, #ffffff 33% 66%, #c83b35 66%)"],
  ["RSA", "南非", "South Africa", "CAF", "linear-gradient(135deg, #007a4d 0 40%, #ffb81c 40% 60%, #001489 60%)"],
  ["KOR", "韓國", "South Korea", "AFC", "radial-gradient(circle, #cd2e3a 0 28%, #ffffff 29% 58%, #0047a0 59%)"],
  ["CZE", "捷克", "Czech Republic", "UEFA", "linear-gradient(135deg, #11457e 0 36%, #ffffff 36% 66%, #d7141a 66%)"],
  ["CAN", "加拿大", "Canada", "CONCACAF", "linear-gradient(135deg, #d52b1e 0 30%, #ffffff 30% 70%, #d52b1e 70%)"],
  ["BIH", "波士尼亞與赫塞哥維納", "Bosnia and Herzegovina", "UEFA", "linear-gradient(135deg, #002395 0 70%, #fecb00 70%)"],
  ["QAT", "卡達", "Qatar", "AFC", "linear-gradient(135deg, #8a1538 0 70%, #ffffff 70%)"],
  ["SUI", "瑞士", "Switzerland", "UEFA", "linear-gradient(135deg, #d52b1e 0 100%)"],
  ["BRA", "巴西", "Brazil", "CONMEBOL", "linear-gradient(135deg, #169b62 0 52%, #f7d13b 52%)"],
  ["MAR", "摩洛哥", "Morocco", "CAF", "linear-gradient(135deg, #c1272d 0 100%)"],
  ["HAI", "海地", "Haiti", "CONCACAF", "linear-gradient(135deg, #00209f 0 50%, #d21034 50%)"],
  ["SCO", "蘇格蘭", "Scotland", "UEFA", "linear-gradient(135deg, #005eb8 0 100%)"],
  ["USA", "美國", "United States", "CONCACAF", "linear-gradient(135deg, #3c3b6e 0 36%, #ffffff 36% 55%, #b22234 55%)"],
  ["PAR", "巴拉圭", "Paraguay", "CONMEBOL", "linear-gradient(135deg, #d52b1e 0 33%, #ffffff 33% 66%, #0038a8 66%)"],
  ["AUS", "澳洲", "Australia", "AFC", "linear-gradient(135deg, #012169 0 72%, #ffcd00 72%)"],
  ["TUR", "土耳其", "Turkey", "UEFA", "linear-gradient(135deg, #e30a17 0 100%)"],
  ["GER", "德國", "Germany", "UEFA", "linear-gradient(135deg, #111111 0 33%, #d3343a 33% 66%, #f3c438 66%)"],
  ["CUW", "庫拉索", "Curaçao", "CONCACAF", "linear-gradient(135deg, #002b7f 0 72%, #f9e814 72%)"],
  ["CIV", "象牙海岸", "Ivory Coast", "CAF", "linear-gradient(135deg, #f77f00 0 33%, #ffffff 33% 66%, #009e60 66%)"],
  ["ECU", "厄瓜多", "Ecuador", "CONMEBOL", "linear-gradient(135deg, #ffdd00 0 50%, #034ea2 50% 75%, #ed1c24 75%)"],
  ["NED", "荷蘭", "Netherlands", "UEFA", "linear-gradient(135deg, #ae1c28 0 33%, #ffffff 33% 66%, #21468b 66%)"],
  ["JPN", "日本", "Japan", "AFC", "radial-gradient(circle, #c9333a 0 34%, #ffffff 35%)"],
  ["SWE", "瑞典", "Sweden", "UEFA", "linear-gradient(135deg, #006aa7 0 70%, #fecc00 70%)"],
  ["TUN", "突尼西亞", "Tunisia", "CAF", "linear-gradient(135deg, #e70013 0 100%)"],
  ["BEL", "比利時", "Belgium", "UEFA", "linear-gradient(135deg, #000000 0 33%, #fae042 33% 66%, #ed2939 66%)"],
  ["EGY", "埃及", "Egypt", "CAF", "linear-gradient(135deg, #ce1126 0 33%, #ffffff 33% 66%, #000000 66%)"],
  ["IRN", "伊朗", "Iran", "AFC", "linear-gradient(135deg, #239f40 0 33%, #ffffff 33% 66%, #da0000 66%)"],
  ["NZL", "紐西蘭", "New Zealand", "OFC", "linear-gradient(135deg, #00247d 0 100%)"],
  ["ESP", "西班牙", "Spain", "UEFA", "linear-gradient(135deg, #c92d2d 0 42%, #f2bf31 42% 64%, #c92d2d 64%)"],
  ["CPV", "維德角", "Cape Verde", "CAF", "linear-gradient(135deg, #003893 0 65%, #cf2027 65% 75%, #f7d116 75%)"],
  ["URU", "烏拉圭", "Uruguay", "CONMEBOL", "linear-gradient(135deg, #ffffff 0 42%, #0038a8 42% 64%, #fcd116 64%)"],
  ["KSA", "沙烏地阿拉伯", "Saudi Arabia", "AFC", "linear-gradient(135deg, #006c35 0 100%)"],
  ["NOR", "挪威", "Norway", "UEFA", "linear-gradient(135deg, #ba0c2f 0 42%, #ffffff 42% 58%, #00205b 58%)"],
  ["FRA", "法國", "France", "UEFA", "linear-gradient(135deg, #1d3f8d 0 33%, #ffffff 33% 66%, #d63838 66%)"],
  ["SEN", "塞內加爾", "Senegal", "CAF", "linear-gradient(135deg, #00853f 0 33%, #fdef42 33% 66%, #e31b23 66%)"],
  ["IRQ", "伊拉克", "Iraq", "AFC", "linear-gradient(135deg, #ce1126 0 33%, #ffffff 33% 66%, #000000 66%)"],
  ["ARG", "阿根廷", "Argentina", "CONMEBOL", "linear-gradient(135deg, #75bde7 0 32%, #ffffff 32% 66%, #75bde7 66%)"],
  ["AUT", "奧地利", "Austria", "UEFA", "linear-gradient(135deg, #ed2939 0 33%, #ffffff 33% 66%, #ed2939 66%)"],
  ["JOR", "約旦", "Jordan", "AFC", "linear-gradient(135deg, #ce1126 0 30%, #000000 30% 54%, #ffffff 54% 76%, #007a3d 76%)"],
  ["ALG", "阿爾及利亞", "Algeria", "CAF", "linear-gradient(135deg, #006233 0 50%, #ffffff 50%)"],
  ["COL", "哥倫比亞", "Colombia", "CONMEBOL", "linear-gradient(135deg, #fcd116 0 50%, #003893 50% 75%, #ce1126 75%)"],
  ["COD", "剛果民主共和國", "DR Congo", "CAF", "linear-gradient(135deg, #007fff 0 60%, #f7d618 60% 72%, #ce1021 72%)"],
  ["POR", "葡萄牙", "Portugal", "UEFA", "linear-gradient(135deg, #006600 0 42%, #ff0000 42%)"],
  ["UZB", "烏茲別克", "Uzbekistan", "AFC", "linear-gradient(135deg, #0099b5 0 33%, #ffffff 33% 66%, #1eb53a 66%)"],
  ["ENG", "英格蘭", "England", "UEFA", "linear-gradient(135deg, #ffffff 0 70%, #cf081f 70%)"],
  ["GHA", "迦納", "Ghana", "CAF", "linear-gradient(135deg, #ce1126 0 33%, #fcd116 33% 66%, #006b3f 66%)"],
  ["PAN", "巴拿馬", "Panama", "CONCACAF", "linear-gradient(135deg, #ffffff 0 45%, #d21034 45% 70%, #005293 70%)"],
  ["CRO", "克羅埃西亞", "Croatia", "UEFA", "linear-gradient(135deg, #d9272e 0 50%, #ffffff 50%)"]
] as const;

function makeTeam([code, nameZh, nameEn, confederation, colors]: (typeof teamDefinitions)[number]): Team {
  return {
    code,
    nameZh,
    nameEn,
    colors,
    fifaRank: null,
    eloRating: null,
    confederation,
    worldCupBestResult: "待補歷史戰績",
    recentForm: [],
    summary: `${nameZh} 是 ${confederationLabel[confederation]} 代表隊，已列入 2026 世界盃分組與積分資料。`
  };
}

export const teams: Record<TeamCode, Team> = Object.fromEntries(teamDefinitions.map((definition) => [definition[0], makeTeam(definition)]));

function row(
  teamCode: TeamCode,
  played: number,
  wins: number,
  draws: number,
  losses: number,
  goalsFor: number,
  goalsAgainst: number,
  points: number,
  status: string
): StandingRow {
  const qualificationProbability = status === "已晉級" ? 100 : status === "已淘汰" ? 0 : status === "晉級區" ? 70 : 35;
  return { teamCode, played, wins, draws, losses, goalsFor, goalsAgainst, points, qualificationProbability, status };
}

export const groups: GroupStanding[] = [
  {
    name: "A 組",
    note: "墨西哥兩戰全勝已晉級；韓國暫居第二，捷克與南非仍看最後一輪。",
    sourceUpdatedAt: "2026-06-18",
    rows: [
      row("MEX", 2, 2, 0, 0, 3, 0, 6, "已晉級"),
      row("KOR", 2, 1, 0, 1, 2, 2, 3, "晉級區"),
      row("CZE", 2, 0, 1, 1, 2, 3, 1, "第三名比較"),
      row("RSA", 2, 0, 1, 1, 1, 3, 1, "追分中")
    ]
  },
  {
    name: "B 組",
    note: "加拿大與瑞士同積 4 分領跑，波赫與卡達仍有第三名比較機會。",
    sourceUpdatedAt: "2026-06-18",
    rows: [
      row("CAN", 2, 1, 1, 0, 7, 1, 4, "晉級區"),
      row("SUI", 2, 1, 1, 0, 5, 2, 4, "晉級區"),
      row("BIH", 2, 0, 1, 1, 2, 5, 1, "第三名比較"),
      row("QAT", 2, 0, 1, 1, 1, 7, 1, "追分中")
    ]
  },
  {
    name: "C 組",
    note: "巴西與摩洛哥同積 4 分，蘇格蘭 3 分在最佳第三名區間，海地已淘汰。",
    sourceUpdatedAt: "2026-06-19",
    rows: [
      row("BRA", 2, 1, 1, 0, 4, 1, 4, "晉級區"),
      row("MAR", 2, 1, 1, 0, 2, 1, 4, "晉級區"),
      row("SCO", 2, 1, 0, 1, 1, 1, 3, "第三名比較"),
      row("HAI", 2, 0, 0, 2, 0, 4, 0, "已淘汰")
    ]
  },
  {
    name: "D 組",
    note: "美國兩連勝已晉級；澳洲與巴拉圭同為 3 分，土耳其已淘汰。",
    sourceUpdatedAt: "2026-06-19",
    rows: [
      row("USA", 2, 2, 0, 0, 6, 1, 6, "已晉級"),
      row("AUS", 2, 1, 0, 1, 2, 2, 3, "晉級區"),
      row("PAR", 2, 1, 0, 1, 2, 4, 3, "第三名比較"),
      row("TUR", 2, 0, 0, 2, 0, 3, 0, "已淘汰")
    ]
  },
  {
    name: "E 組",
    note: "德國兩勝提前晉級，象牙海岸暫居第二；厄瓜多與庫拉索仍在追分。",
    sourceUpdatedAt: "2026-06-20",
    rows: [
      row("GER", 2, 2, 0, 0, 9, 2, 6, "已晉級"),
      row("CIV", 2, 1, 0, 1, 2, 2, 3, "晉級區"),
      row("ECU", 2, 0, 1, 1, 0, 1, 1, "第三名比較"),
      row("CUW", 2, 0, 1, 1, 1, 7, 1, "追分中")
    ]
  },
  {
    name: "F 組",
    note: "荷蘭與日本同積 4 分，瑞典 3 分仍具第三名競爭力，突尼西亞已淘汰。",
    sourceUpdatedAt: "2026-06-20",
    rows: [
      row("NED", 2, 1, 1, 0, 7, 3, 4, "晉級區"),
      row("JPN", 2, 1, 1, 0, 6, 2, 4, "晉級區"),
      row("SWE", 2, 1, 0, 1, 6, 6, 3, "第三名比較"),
      row("TUN", 2, 0, 0, 2, 1, 9, 0, "已淘汰")
    ]
  },
  {
    name: "G 組",
    note: "埃及 4 分領先；伊朗、比利時同積 2 分，紐西蘭仍未出局。",
    sourceUpdatedAt: "2026-06-21",
    rows: [
      row("EGY", 2, 1, 1, 0, 4, 2, 4, "晉級區"),
      row("IRN", 2, 0, 2, 0, 2, 2, 2, "晉級區"),
      row("BEL", 2, 0, 2, 0, 1, 1, 2, "第三名比較"),
      row("NZL", 2, 0, 1, 1, 3, 5, 1, "追分中")
    ]
  },
  {
    name: "H 組",
    note: "西班牙 4 分居首，烏拉圭與維德角同積 2 分，沙烏地阿拉伯 1 分。",
    sourceUpdatedAt: "2026-06-21",
    rows: [
      row("ESP", 2, 1, 1, 0, 4, 0, 4, "晉級區"),
      row("URU", 2, 0, 2, 0, 3, 3, 2, "晉級區"),
      row("CPV", 2, 0, 2, 0, 2, 2, 2, "第三名比較"),
      row("KSA", 2, 0, 1, 1, 1, 5, 1, "追分中")
    ]
  },
  {
    name: "I 組",
    note: "挪威與法國首戰皆勝，塞內加爾與伊拉克暫時落後。",
    sourceUpdatedAt: "2026-06-16",
    rows: [
      row("NOR", 1, 1, 0, 0, 4, 1, 3, "晉級區"),
      row("FRA", 1, 1, 0, 0, 3, 1, 3, "晉級區"),
      row("SEN", 1, 0, 0, 1, 1, 3, 0, "第三名比較"),
      row("IRQ", 1, 0, 0, 1, 1, 4, 0, "追分中")
    ]
  },
  {
    name: "J 組",
    note: "阿根廷與奧地利首戰全取 3 分，約旦與阿爾及利亞需要搶分。",
    sourceUpdatedAt: "2026-06-16",
    rows: [
      row("ARG", 1, 1, 0, 0, 3, 0, 3, "晉級區"),
      row("AUT", 1, 1, 0, 0, 3, 1, 3, "晉級區"),
      row("JOR", 1, 0, 0, 1, 1, 3, 0, "第三名比較"),
      row("ALG", 1, 0, 0, 1, 0, 3, 0, "追分中")
    ]
  },
  {
    name: "K 組",
    note: "哥倫比亞首戰勝出；剛果民主共和國與葡萄牙握手言和，烏茲別克暫居第四。",
    sourceUpdatedAt: "2026-06-17",
    rows: [
      row("COL", 1, 1, 0, 0, 3, 1, 3, "晉級區"),
      row("COD", 1, 0, 1, 0, 1, 1, 1, "晉級區"),
      row("POR", 1, 0, 1, 0, 1, 1, 1, "第三名比較"),
      row("UZB", 1, 0, 0, 1, 1, 3, 0, "追分中")
    ]
  },
  {
    name: "L 組",
    note: "英格蘭與迦納首戰皆勝，巴拿馬與克羅埃西亞暫時落後。",
    sourceUpdatedAt: "2026-06-17",
    rows: [
      row("ENG", 1, 1, 0, 0, 4, 2, 3, "晉級區"),
      row("GHA", 1, 1, 0, 0, 1, 0, 3, "晉級區"),
      row("PAN", 1, 0, 0, 1, 0, 1, 0, "第三名比較"),
      row("CRO", 1, 0, 0, 1, 2, 4, 0, "追分中")
    ]
  }
];

const demoOdds = {
  homeWinOdds: 1.9,
  drawOdds: 3.2,
  awayWinOdds: 3.9,
  overUnderLine: 2.5,
  overOdds: 1.88,
  underOdds: 1.82,
  updatedAt: "2026/06/23 20:00",
  sourceNote: "台灣運彩倍率示範資料，正式版由後台輸入或授權資料更新。"
};

export const scorelineGoalLimit = 6;

const predictionModelVersion = "Scout v0.1";
const predictionUpdatedAt = "2026/06/23 20:00";

function clamp(minimum: number, maximum: number, value: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function parseScore(score: string) {
  const [homeGoals, awayGoals] = score.split("-").map(Number);
  return [homeGoals || 0, awayGoals || 0] as const;
}

function factorial(value: number): number {
  if (value <= 1) return 1;
  return value * factorial(value - 1);
}

function poissonProbability(expectedGoals: number, goals: number) {
  return (Math.exp(-expectedGoals) * expectedGoals ** goals) / factorial(goals);
}

function buildScorelineDistribution(
  predictedScore: string,
  probabilities: MatchProbability,
  goalLimit = scorelineGoalLimit
): ScorelineProbability[] {
  const [predictedHomeGoals, predictedAwayGoals] = parseScore(predictedScore);
  const predictedTotalGoals = predictedHomeGoals + predictedAwayGoals;
  const rawHomeShare = (predictedHomeGoals + 0.65) / (predictedTotalGoals + 1.3 || 1);
  const winEdgeAdjustment = (probabilities.homeWin - probabilities.awayWin) / 600;
  const homeShare = clamp(0.16, 0.84, rawHomeShare + winEdgeAdjustment);
  const expectedTotalGoals = clamp(1.25, 4.8, predictedTotalGoals + 0.5 + (probabilities.over - 50) / 25);
  const homeExpectedGoals = expectedTotalGoals * homeShare;
  const awayExpectedGoals = expectedTotalGoals - homeExpectedGoals;

  const scorelines = Array.from({ length: goalLimit + 1 }, (_, homeGoals) =>
    Array.from({ length: goalLimit + 1 }, (_, awayGoals) => {
      const probability = poissonProbability(homeExpectedGoals, homeGoals) * poissonProbability(awayExpectedGoals, awayGoals) * 100;

      return {
        score: `${homeGoals}-${awayGoals}`,
        probability: Number(probability.toFixed(2)),
        distanceFromPrediction: Math.abs(homeGoals - predictedHomeGoals) + Math.abs(awayGoals - predictedAwayGoals),
        totalGoals: homeGoals + awayGoals
      };
    })
  ).flat();

  return scorelines
    .sort(
      (first, second) =>
        second.probability - first.probability ||
        first.distanceFromPrediction - second.distanceFromPrediction ||
        Math.abs(first.totalGoals - predictedTotalGoals) - Math.abs(second.totalGoals - predictedTotalGoals) ||
        first.score.localeCompare(second.score)
    )
    .map(({ score, probability }) => ({ score, probability }));
}

function makePrediction(
  predictedScore: string,
  confidence: Match["prediction"]["confidence"],
  probabilities: MatchProbability
): Match["prediction"] {
  return {
    predictedScore,
    confidence,
    probabilities,
    topScorelines: buildScorelineDistribution(predictedScore, probabilities),
    modelVersion: predictionModelVersion,
    modelUpdatedAt: predictionUpdatedAt
  };
}

const taiwanTimeZone = "Asia/Taipei";
const matchdayRolloverOffsetHours = 6;

function getTaiwanDateKey(date = new Date()) {
  const adjustedDate = new Date(date.getTime() + matchdayRolloverOffsetHours * 60 * 60 * 1000);

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: taiwanTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(adjustedDate);
}

export const matches: Match[] = [
  {
    id: "por-uzb",
    group: "K 組",
    round: "小組賽第 2 輪",
    matchDateTw: "2026-06-24",
    kickoffTw: "06/24 01:00",
    venue: "NRG Stadium",
    homeTeam: "POR",
    awayTeam: "UZB",
    status: "scheduled",
    attentionTags: ["高關注", "首次參賽"],
    filterTags: ["high"],
    odds: { ...demoOdds, homeWinOdds: 1.45, drawOdds: 4.1, awayWinOdds: 6.8 },
    prediction: makePrediction("2-0", "中高", { homeWin: 64, draw: 22, awayWin: 14, over: 46, bothTeamsToScore: 39 }),
    summary: "葡萄牙首戰只拿 1 分，面對烏茲別克需要把控球優勢轉成進球。",
    plainLanguageAnalysis: ["葡萄牙整體實力與進攻深度占優，但如果遲遲無法破門，烏茲別克的防守反擊會讓比賽拖進低比分。"],
    keyFactors: ["葡萄牙邊路傳中品質", "烏茲別克防線集中度", "上半場是否早段進球"],
    historyNote: "烏茲別克為本屆世界盃新面孔，經驗差距會是觀察重點。",
    qualificationImpact: { homeWin: "葡萄牙贏球可重回前二競爭。", draw: "平手會讓 K 組出線壓力升高。", awayWin: "烏茲別克若勝出將大幅改變小組排序。" }
  },
  {
    id: "eng-ghana",
    group: "L 組",
    round: "小組賽第 2 輪",
    matchDateTw: "2026-06-24",
    kickoffTw: "06/24 04:00",
    venue: "Gillette Stadium",
    homeTeam: "ENG",
    awayTeam: "GHA",
    status: "scheduled",
    attentionTags: ["高關注", "小組關鍵"],
    filterTags: ["high", "group"],
    odds: { ...demoOdds, homeWinOdds: 1.62, drawOdds: 3.65, awayWinOdds: 5.2 },
    prediction: makePrediction("2-1", "中等", { homeWin: 55, draw: 25, awayWin: 20, over: 49, bothTeamsToScore: 52 }),
    summary: "L 組兩支首戰勝隊碰頭，英格蘭火力較完整，迦納反擊會是變數。",
    plainLanguageAnalysis: ["英格蘭首戰進攻效率不錯，但迦納防守韌性強。模型看好英格蘭小幅領先，和局仍有一定風險。"],
    keyFactors: ["英格蘭中前場壓迫", "迦納反擊第一腳", "定位球防守"],
    historyNote: "兩隊同組競爭直接牽動 L 組前二名排序。",
    qualificationImpact: { homeWin: "英格蘭贏球可接近鎖定晉級。", draw: "雙方平手會讓第三輪仍有變數。", awayWin: "迦納贏球將掌握小組第一主動權。" }
  },
  {
    id: "pan-cro",
    group: "L 組",
    round: "小組賽第 2 輪",
    matchDateTw: "2026-06-24",
    kickoffTw: "06/24 07:00",
    venue: "Toronto Stadium",
    homeTeam: "PAN",
    awayTeam: "CRO",
    status: "scheduled",
    attentionTags: ["小組關鍵", "搶分壓力"],
    filterTags: ["group", "goals"],
    odds: { ...demoOdds, homeWinOdds: 5.6, drawOdds: 3.75, awayWinOdds: 1.58 },
    prediction: makePrediction("0-2", "中高", { homeWin: 16, draw: 24, awayWin: 60, over: 47, bothTeamsToScore: 40 }),
    summary: "克羅埃西亞首戰失利後需要反彈，巴拿馬若再輸，小組形勢會非常吃緊。",
    plainLanguageAnalysis: ["克羅埃西亞控球與中場經驗仍占優，但巴拿馬會把比賽拉成高對抗節奏。模型偏向克羅埃西亞取勝，關鍵在能不能早點打開局面。"],
    keyFactors: ["克羅埃西亞中場控節奏", "巴拿馬邊路反擊", "落後方是否提早冒險"],
    historyNote: "L 組前兩名競爭緊，這場對兩隊第三輪壓力影響很大。",
    qualificationImpact: { homeWin: "巴拿馬贏球可重新回到第三名比較甚至前二競爭。", draw: "平手會讓兩隊都得看最後一輪結果。", awayWin: "克羅埃西亞贏球可修正首戰失分並保住出線主動權。" }
  },
  {
    id: "col-cod",
    group: "K 組",
    round: "小組賽第 2 輪",
    matchDateTw: "2026-06-24",
    kickoffTw: "06/24 10:00",
    venue: "Estadio Guadalajara",
    homeTeam: "COL",
    awayTeam: "COD",
    status: "scheduled",
    attentionTags: ["高關注", "小組關鍵"],
    filterTags: ["high", "group", "goals"],
    odds: { ...demoOdds, homeWinOdds: 1.78, drawOdds: 3.45, awayWinOdds: 4.45 },
    prediction: makePrediction("2-1", "中等", { homeWin: 51, draw: 27, awayWin: 22, over: 52, bothTeamsToScore: 55 }),
    summary: "哥倫比亞首戰取勝後有機會拉開優勢，剛果民主共和國則想延續逼平葡萄牙的防守韌性。",
    plainLanguageAnalysis: ["哥倫比亞前場個人能力與轉換速度較好，但剛果民主共和國不是只會死守，反擊也有威脅。模型看哥倫比亞小勝，雙方進球機率不低。"],
    keyFactors: ["哥倫比亞左路突破", "剛果民主共和國反擊第一點", "定位球二點球保護"],
    historyNote: "K 組目前分差不大，哥倫比亞若連勝，第三輪對葡萄牙前可掌握較好位置。",
    qualificationImpact: { homeWin: "哥倫比亞贏球可大幅接近晉級。", draw: "平手會讓 K 組前二與第三名比較繼續混戰。", awayWin: "剛果民主共和國勝出會把小組排序完全打開。" }
  },
  {
    id: "sui-can",
    group: "B 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 03:00",
    venue: "BC Place",
    homeTeam: "SUI",
    awayTeam: "CAN",
    status: "scheduled",
    attentionTags: ["地主焦點", "小組頭名"],
    filterTags: ["high", "group"],
    odds: { ...demoOdds, homeWinOdds: 2.55, drawOdds: 3.25, awayWinOdds: 2.65 },
    prediction: makePrediction("1-1", "中等", { homeWin: 35, draw: 30, awayWin: 35, over: 43, bothTeamsToScore: 53 }),
    summary: "瑞士與加拿大正面爭奪 B 組頭名，兩隊攻守差距不大，主場氣勢是加拿大的加分項。",
    plainLanguageAnalysis: ["這場比較像五五波。瑞士比賽控制較穩，加拿大速度與主場能量更好，模型認為雙方互有進球但難拉開差距。"],
    keyFactors: ["加拿大前場速度", "瑞士中場控球", "同分時的淨勝球比較"],
    historyNote: "兩隊賽前同處 B 組前段，最後一輪結果會直接決定淘汰賽籤位。",
    qualificationImpact: { homeWin: "瑞士贏球可掌握 B 組第一。", draw: "平手後須以淨勝球決定排名。", awayWin: "加拿大勝出可用地主優勢拿下較佳籤位。" }
  },
  {
    id: "bih-qat",
    group: "B 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 03:00",
    venue: "Lumen Field",
    homeTeam: "BIH",
    awayTeam: "QAT",
    status: "scheduled",
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["group", "goals"],
    odds: { ...demoOdds, homeWinOdds: 1.75, drawOdds: 3.5, awayWinOdds: 4.5 },
    prediction: makePrediction("2-0", "中高", { homeWin: 55, draw: 26, awayWin: 19, over: 45, bothTeamsToScore: 38 }),
    summary: "波士尼亞與赫塞哥維納需要勝利累積第三名比較本錢，卡達則要避免防線再度失控。",
    plainLanguageAnalysis: ["波士尼亞與赫塞哥維納身材、禁區對抗與定位球較有優勢。卡達若撐不過開場壓力，比分可能提早被拉開。"],
    keyFactors: ["波士尼亞高空球", "卡達禁區防守", "第三名淨勝球需求"],
    historyNote: "B 組第三名仍可能透過八席最佳第三名晉級，因此勝負之外，淨勝球也很重要。",
    qualificationImpact: { homeWin: "波士尼亞勝出可大幅提升最佳第三名晉級機率。", draw: "平手可能讓波士尼亞陷入跨組比較劣勢。", awayWin: "卡達贏球仍有機會翻動 B 組第三名排序。" }
  },
  {
    id: "mar-hai",
    group: "C 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 06:00",
    venue: "Mercedes-Benz Stadium",
    homeTeam: "MAR",
    awayTeam: "HAI",
    status: "scheduled",
    attentionTags: ["小組頭名", "進球期待"],
    filterTags: ["high", "group", "goals"],
    odds: { ...demoOdds, homeWinOdds: 1.22, drawOdds: 5.6, awayWinOdds: 11 },
    prediction: makePrediction("3-0", "高", { homeWin: 75, draw: 17, awayWin: 8, over: 58, bothTeamsToScore: 29 }),
    summary: "摩洛哥要用勝利與淨勝球爭取 C 組第一，海地則希望在最後一戰踢出進攻表現。",
    plainLanguageAnalysis: ["摩洛哥整體速度、壓迫和防守完整度都占優，而且有追求淨勝球的動機。模型看好摩洛哥主導比賽。"],
    keyFactors: ["摩洛哥前場壓迫", "海地防線退守速度", "摩洛哥爭小組第一的淨勝球需求"],
    historyNote: "摩洛哥與巴西的排名可能需要比較淨勝球，領先後仍有持續進攻的理由。",
    qualificationImpact: { homeWin: "摩洛哥贏球可鎖定晉級並爭取小組第一。", draw: "平手可能把 C 組頭名讓給巴西。", awayWin: "海地爆冷將大幅改變 C 組最終排序。" }
  },
  {
    id: "cze-mex",
    group: "A 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 09:00",
    venue: "Estadio Azteca",
    homeTeam: "CZE",
    awayTeam: "MEX",
    status: "scheduled",
    attentionTags: ["地主焦點", "小組關鍵"],
    filterTags: ["group"],
    odds: { ...demoOdds, homeWinOdds: 4.2, drawOdds: 3.35, awayWinOdds: 1.82 },
    prediction: makePrediction("1-1", "中等", { homeWin: 24, draw: 30, awayWin: 46, over: 42, bothTeamsToScore: 50 }),
    summary: "墨西哥已晉級但仍要保排名，捷克需要搶分拚第三名比較。",
    plainLanguageAnalysis: ["墨西哥狀態較穩，但已晉級後可能控風險。捷克若想保住第三名希望，至少要拿分。"],
    keyFactors: ["墨西哥輪換幅度", "捷克前場效率", "最後一輪同分比較"],
    historyNote: "A 組最後一輪會直接影響第三名比較門檻。",
    qualificationImpact: { homeWin: "捷克贏球可大幅提高第三名出線希望。", draw: "平手會讓捷克仍需看其他組結果。", awayWin: "墨西哥勝出可強化小組第一。" }
  },
  {
    id: "sco-bra",
    group: "C 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 06:00",
    venue: "Hard Rock Stadium",
    homeTeam: "SCO",
    awayTeam: "BRA",
    status: "scheduled",
    attentionTags: ["高關注", "小組關鍵"],
    filterTags: ["high", "group"],
    odds: { ...demoOdds, homeWinOdds: 5.9, drawOdds: 3.8, awayWinOdds: 1.55 },
    prediction: makePrediction("0-2", "中高", { homeWin: 17, draw: 24, awayWin: 59, over: 48, bothTeamsToScore: 41 }),
    summary: "巴西小組形勢不錯，蘇格蘭 3 分在手但還需要最後一輪保住排名。",
    plainLanguageAnalysis: ["巴西個人能力與進攻厚度占優，蘇格蘭的目標會是壓低失球並等待定位球或反擊機會。"],
    keyFactors: ["巴西邊路突破", "蘇格蘭低位防守", "淨勝球對第三名比較的影響"],
    historyNote: "C 組目前巴西與摩洛哥同分，最後一輪仍會影響小組第一。",
    qualificationImpact: { homeWin: "蘇格蘭贏球可直接衝擊前二。", draw: "平手對蘇格蘭第三名比較很有幫助。", awayWin: "巴西勝出可接近鎖定前二。" }
  },
  {
    id: "rsa-kor",
    group: "A 組",
    round: "小組賽第 3 輪",
    matchDateTw: "2026-06-25",
    kickoffTw: "06/25 09:00",
    venue: "Estadio Monterrey",
    homeTeam: "RSA",
    awayTeam: "KOR",
    status: "scheduled",
    attentionTags: ["亞洲焦點", "晉級生死戰"],
    filterTags: ["high", "group", "asia"],
    odds: { ...demoOdds, homeWinOdds: 3.6, drawOdds: 3.3, awayWinOdds: 2.05 },
    prediction: makePrediction("1-1", "中等", { homeWin: 27, draw: 31, awayWin: 42, over: 42, bothTeamsToScore: 51 }),
    summary: "南韓希望守住 A 組前段位置，南非則必須主動搶勝，兩隊都不能只看同場比分。",
    plainLanguageAnalysis: ["南韓整體速度與轉換較好，但南非背水一戰會提高壓迫強度。模型略偏南韓，和局機率仍然很高。"],
    keyFactors: ["南韓反擊速度", "南非前場壓迫", "與墨西哥對捷克同步賽果的連動"],
    historyNote: "A 組最後兩場同時開踢，兩隊需要隨另一場比分即時調整風險。",
    qualificationImpact: { homeWin: "南非贏球可直接衝擊前二或取得最佳第三名優勢。", draw: "平手較有利南韓維持晉級位置。", awayWin: "南韓勝出可穩固前二並爭取更好籤位。" }
  }
];

export const editorialNotes: EditorialNote[] = [
  { title: "48 隊賽制第三名變得很重要", text: "12 組前二名加 8 支最佳第三名晉級，所以 3 分與淨勝球會直接影響淘汰賽席位。" },
  { title: "目前已有球隊提前晉級", text: "墨西哥、美國、德國已在各自小組取得晉級主導權，部分第四名球隊已被淘汰。" },
  { title: "資料更新時間要分組看", text: "各組賽程不同，目前來源中的 A-H 多已踢到第二輪，I-L 則仍有 6/22、6/23 賽事等待更新。" }
];

export const heatItems: EditorialNote[] = [
  { title: "A 組：墨西哥已晉級", text: "韓國暫居第二，捷克與南非最後一輪仍有追分與第三名比較機會。" },
  { title: "C 組：蘇格蘭 3 分很關鍵", text: "巴西、摩洛哥同積 4 分，蘇格蘭目前在最佳第三名排序中很有競爭力。" },
  { title: "F 組：日本與荷蘭同積 4 分", text: "最後一輪日本對瑞典會直接影響前二與第三名排序。" }
];

export function getTeam(code: TeamCode) {
  const team = teams[code];
  if (!team) throw new Error(`Unknown team code: ${code}`);
  return team;
}

export function getMatch(id: string) {
  return matches.find((match) => match.id === id);
}

export function getCurrentTaiwanDateKey() {
  return process.env.NEXT_PUBLIC_BOARD_DATE_TW || process.env.NEXT_PUBLIC_TODAY_TW || getTaiwanDateKey();
}

export function getMatchesByDate(dateKey: string) {
  return matches
    .filter((match) => match.matchDateTw === dateKey)
    .sort((first, second) => first.kickoffTw.localeCompare(second.kickoffTw) || first.id.localeCompare(second.id));
}

export function getTodayBoard() {
  const todayDateTw = getCurrentTaiwanDateKey();
  const matchDates = Array.from(new Set(matches.map((match) => match.matchDateTw))).sort();
  const boardDateTw =
    matchDates.find((matchDate) => matchDate === todayDateTw) ||
    matchDates.find((matchDate) => matchDate > todayDateTw) ||
    matchDates.at(-1) ||
    todayDateTw;

  return {
    todayDateTw,
    boardDateTw,
    isToday: boardDateTw === todayDateTw,
    matches: getMatchesByDate(boardDateTw)
  };
}

export function getTodayMatches() {
  return getTodayBoard().matches;
}

export function getFeaturedMatch() {
  return getTodayMatches()[0] ?? matches[0];
}

export function getThirdPlaceCandidates() {
  return groups
    .map((group) => group.rows[2])
    .sort((first, second) => {
      const firstGoalDifference = first.goalsFor - first.goalsAgainst;
      const secondGoalDifference = second.goalsFor - second.goalsAgainst;
      return (
        second.points - first.points ||
        secondGoalDifference - firstGoalDifference ||
        second.goalsFor - first.goalsFor ||
        first.teamCode.localeCompare(second.teamCode)
      );
    });
}
