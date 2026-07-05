import matchHistoryData from "../data/match-history.json";
import matchScheduleData from "../data/match-schedule.json";
import type {
  EditorialNote,
  GroupStanding,
  Match,
  MatchProbability,
  MatchResult,
  ScorelineProbability,
  StarFocusItem,
  StandingRow,
  Team,
  TeamCode
} from "./types";

export const matchHistory = matchHistoryData.records as MatchResult[];

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

type TeamDefinition = (typeof teamDefinitions)[number];
type TeamProfile = Pick<Team, "fifaRank" | "eloRating" | "worldCupBestResult">;

const teamProfiles: Record<TeamDefinition[0], TeamProfile> = {
  MEX: { fifaRank: 14, eloRating: 1810, worldCupBestResult: "8強（1970、1986）" },
  RSA: { fifaRank: 60, eloRating: 1575, worldCupBestResult: "小組賽（1998、2002、2010）" },
  KOR: { fifaRank: 25, eloRating: 1740, worldCupBestResult: "第4名（2002）" },
  CZE: { fifaRank: 40, eloRating: 1665, worldCupBestResult: "亞軍（1934、1962，捷克斯洛伐克）" },
  CAN: { fifaRank: 30, eloRating: 1695, worldCupBestResult: "小組賽（1986、2022）" },
  BIH: { fifaRank: 64, eloRating: 1560, worldCupBestResult: "小組賽（2014）" },
  QAT: { fifaRank: 56, eloRating: 1595, worldCupBestResult: "小組賽（2022）" },
  SUI: { fifaRank: 19, eloRating: 1775, worldCupBestResult: "8強（1934、1938、1954）" },
  BRA: { fifaRank: 6, eloRating: 1995, worldCupBestResult: "冠軍（1958、1962、1970、1994、2002）" },
  MAR: { fifaRank: 7, eloRating: 1845, worldCupBestResult: "第4名（2022）" },
  HAI: { fifaRank: 83, eloRating: 1495, worldCupBestResult: "小組賽（1974）" },
  SCO: { fifaRank: 42, eloRating: 1645, worldCupBestResult: "小組賽（1954、1958、1974、1978、1982、1986、1990、1998）" },
  USA: { fifaRank: 17, eloRating: 1790, worldCupBestResult: "第3名（1930）" },
  PAR: { fifaRank: 41, eloRating: 1660, worldCupBestResult: "8強（2010）" },
  AUS: { fifaRank: 27, eloRating: 1730, worldCupBestResult: "16強（2006、2022）" },
  TUR: { fifaRank: 22, eloRating: 1765, worldCupBestResult: "第3名（2002）" },
  GER: { fifaRank: 10, eloRating: 1895, worldCupBestResult: "冠軍（1954、1974、1990、2014）" },
  CUW: { fifaRank: 82, eloRating: 1500, worldCupBestResult: "首次參加" },
  CIV: { fifaRank: 33, eloRating: 1685, worldCupBestResult: "小組賽（2006、2010、2014）" },
  ECU: { fifaRank: 23, eloRating: 1750, worldCupBestResult: "16強（2006）" },
  NED: { fifaRank: 8, eloRating: 1950, worldCupBestResult: "亞軍（1974、1978、2010）" },
  JPN: { fifaRank: 18, eloRating: 1780, worldCupBestResult: "16強（2002、2010、2018、2022）" },
  SWE: { fifaRank: 38, eloRating: 1670, worldCupBestResult: "亞軍（1958）" },
  TUN: { fifaRank: 45, eloRating: 1635, worldCupBestResult: "小組賽（1978、1998、2002、2006、2018、2022）" },
  BEL: { fifaRank: 9, eloRating: 1910, worldCupBestResult: "第3名（2018）" },
  EGY: { fifaRank: 29, eloRating: 1700, worldCupBestResult: "首輪（1934）、小組賽（1990、2018）" },
  IRN: { fifaRank: 20, eloRating: 1760, worldCupBestResult: "小組賽（1978、1998、2006、2014、2018、2022）" },
  NZL: { fifaRank: 85, eloRating: 1490, worldCupBestResult: "小組賽（1982、2010）" },
  ESP: { fifaRank: 2, eloRating: 2115, worldCupBestResult: "冠軍（2010）" },
  CPV: { fifaRank: 67, eloRating: 1545, worldCupBestResult: "首次參加" },
  URU: { fifaRank: 16, eloRating: 1870, worldCupBestResult: "冠軍（1930、1950）" },
  KSA: { fifaRank: 61, eloRating: 1570, worldCupBestResult: "16強（1994）" },
  NOR: { fifaRank: 31, eloRating: 1725, worldCupBestResult: "16強（1998）" },
  FRA: { fifaRank: 3, eloRating: 2095, worldCupBestResult: "冠軍（1998、2018）" },
  SEN: { fifaRank: 15, eloRating: 1815, worldCupBestResult: "8強（2002）" },
  IRQ: { fifaRank: 57, eloRating: 1585, worldCupBestResult: "小組賽（1986）" },
  ARG: { fifaRank: 1, eloRating: 2140, worldCupBestResult: "冠軍（1978、1986、2022）" },
  AUT: { fifaRank: 24, eloRating: 1745, worldCupBestResult: "第3名（1954）" },
  JOR: { fifaRank: 63, eloRating: 1565, worldCupBestResult: "首次參加" },
  ALG: { fifaRank: 28, eloRating: 1705, worldCupBestResult: "16強（2014）" },
  COL: { fifaRank: 13, eloRating: 1885, worldCupBestResult: "8強（2014）" },
  COD: { fifaRank: 46, eloRating: 1630, worldCupBestResult: "小組賽（1974，薩伊）" },
  POR: { fifaRank: 5, eloRating: 2005, worldCupBestResult: "第3名（1966）" },
  UZB: { fifaRank: 50, eloRating: 1610, worldCupBestResult: "首次參加" },
  ENG: { fifaRank: 4, eloRating: 2050, worldCupBestResult: "冠軍（1966）" },
  GHA: { fifaRank: 73, eloRating: 1535, worldCupBestResult: "8強（2010）" },
  PAN: { fifaRank: 34, eloRating: 1675, worldCupBestResult: "小組賽（2018）" },
  CRO: { fifaRank: 11, eloRating: 1890, worldCupBestResult: "亞軍（2018）" }
};

function makeTeam([code, nameZh, nameEn, confederation, colors]: TeamDefinition): Team {
  const profile = teamProfiles[code];

  return {
    code,
    nameZh,
    nameEn,
    colors,
    fifaRank: profile.fifaRank,
    eloRating: profile.eloRating,
    confederation,
    worldCupBestResult: profile.worldCupBestResult,
    recentForm: [],
    summary: `${nameZh} 是 ${confederationLabel[confederation]} 代表隊，已列入 2026 世界盃分組與積分資料。`
  };
}

const baseTeams: Record<TeamCode, Team> = Object.fromEntries(teamDefinitions.map((definition) => [definition[0], makeTeam(definition)]));

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

const seedGroups: GroupStanding[] = [
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

type TeamResultCode = Team["recentForm"][number];

interface TeamTournamentStats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  recentForm: Team["recentForm"];
}

function standingSort(first: StandingRow, second: StandingRow) {
  const firstDifference = first.goalsFor - first.goalsAgainst;
  const secondDifference = second.goalsFor - second.goalsAgainst;

  return (
    second.points - first.points ||
    secondDifference - firstDifference ||
    second.goalsFor - first.goalsFor ||
    first.teamCode.localeCompare(second.teamCode)
  );
}

function matchResultFor(goalsFor: number, goalsAgainst: number): TeamResultCode {
  if (goalsFor > goalsAgainst) return "W";
  if (goalsFor < goalsAgainst) return "L";
  return "D";
}

function buildKnockoutTeamSet() {
  const scheduleRecords = (matchScheduleData as { records?: Array<{ group: string; round: string; homeTeam: TeamCode; awayTeam: TeamCode }> }).records || [];
  const qualifiedTeams = new Set<TeamCode>();

  for (const record of [...scheduleRecords, ...matchHistory]) {
    if (!isKnockoutRecord(record)) continue;
    qualifiedTeams.add(record.homeTeam);
    qualifiedTeams.add(record.awayTeam);
  }

  return qualifiedTeams;
}

function isKnockoutRecord(record: { group: string; round: string }) {
  return record.group === "淘汰賽" || record.round.includes("強") || record.round.includes("冠軍") || record.round.includes("季軍");
}

function applyGroupResult(rowsByTeam: Map<TeamCode, StandingRow>, result: MatchResult) {
  const home = rowsByTeam.get(result.homeTeam);
  const away = rowsByTeam.get(result.awayTeam);
  if (!home || !away) return;

  home.played += 1;
  away.played += 1;
  home.goalsFor += result.homeScore;
  home.goalsAgainst += result.awayScore;
  away.goalsFor += result.awayScore;
  away.goalsAgainst += result.homeScore;

  if (result.homeScore > result.awayScore) {
    home.wins += 1;
    home.points += 3;
    away.losses += 1;
  } else if (result.homeScore < result.awayScore) {
    away.wins += 1;
    away.points += 3;
    home.losses += 1;
  } else {
    home.draws += 1;
    away.draws += 1;
    home.points += 1;
    away.points += 1;
  }
}

function groupNote(rows: StandingRow[]) {
  const leader = baseTeams[rows[0]?.teamCode];
  const qualified = rows.filter((rowItem) => rowItem.status === "晉級淘汰賽").map((rowItem) => baseTeams[rowItem.teamCode]?.nameZh);
  const qualifiedText = qualified.length > 0 ? `${qualified.join("、")}已進入淘汰賽` : "尚待後續賽果確認晉級隊伍";

  return `${leader?.nameZh ?? "小組第一"}以 ${rows[0]?.points ?? 0} 分居首；${qualifiedText}。`;
}

function buildGroupsFromResults(): GroupStanding[] {
  const qualifiedTeams = buildKnockoutTeamSet();
  const groupResults = matchHistory.filter((result) => seedGroups.some((group) => group.name === result.group));
  const latestGroupDate = groupResults.at(-1)?.matchDateTw || matchHistoryData.updatedAt?.slice(0, 10) || "待更新";

  return seedGroups.map((group) => {
    const rowsByTeam = new Map<TeamCode, StandingRow>(
      group.rows.map((seedRow) => [
        seedRow.teamCode,
        {
          ...seedRow
        }
      ])
    );

    for (const result of groupResults.filter((item) => item.group === group.name)) {
      applyGroupResult(rowsByTeam, result);
    }

    const rows = Array.from(rowsByTeam.values()).sort(standingSort).map((rowItem) => {
      const qualified = qualifiedTeams.has(rowItem.teamCode);

      return {
        ...rowItem,
        status: qualified ? "晉級淘汰賽" : "已淘汰",
        qualificationProbability: qualified ? 100 : 0
      };
    });

    return {
      ...group,
      note: groupNote(rows),
      sourceUpdatedAt: latestGroupDate,
      rows
    };
  });
}

function emptyTeamStats(): TeamTournamentStats {
  return {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    recentForm: []
  };
}

function updateTeamStats(stats: TeamTournamentStats, goalsFor: number, goalsAgainst: number) {
  stats.played += 1;
  stats.goalsFor += goalsFor;
  stats.goalsAgainst += goalsAgainst;
  stats.recentForm.push(matchResultFor(goalsFor, goalsAgainst));

  if (goalsFor > goalsAgainst) stats.wins += 1;
  else if (goalsFor < goalsAgainst) stats.losses += 1;
  else stats.draws += 1;
}

function buildTeamStats() {
  const statsByTeam = new Map<TeamCode, TeamTournamentStats>();

  for (const result of [...matchHistory].sort((first, second) => first.matchDateTw.localeCompare(second.matchDateTw) || first.kickoffTw.localeCompare(second.kickoffTw))) {
    const homeStats = statsByTeam.get(result.homeTeam) || emptyTeamStats();
    const awayStats = statsByTeam.get(result.awayTeam) || emptyTeamStats();
    updateTeamStats(homeStats, result.homeScore, result.awayScore);
    updateTeamStats(awayStats, result.awayScore, result.homeScore);
    statsByTeam.set(result.homeTeam, homeStats);
    statsByTeam.set(result.awayTeam, awayStats);
  }

  return statsByTeam;
}

export const groups: GroupStanding[] = buildGroupsFromResults();
const teamStatsByCode = buildTeamStats();

const knockoutRoundOrder = ["32強淘汰賽", "16強淘汰賽", "8強淘汰賽", "4強準決賽", "季軍戰", "冠軍賽"] as const;

function knockoutRoundIndex(round: string) {
  const index = knockoutRoundOrder.findIndex((roundName) => round.includes(roundName) || roundName.includes(round));
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function getFutureKnockoutTeams(round: string) {
  const roundIndex = knockoutRoundIndex(round);
  const scheduleRecords = (matchScheduleData as { records?: Array<{ group: string; round: string; homeTeam: TeamCode; awayTeam: TeamCode }> }).records || [];
  const futureTeams = new Set<TeamCode>();

  for (const record of [...scheduleRecords, ...matchHistory]) {
    if (!isKnockoutRecord(record) || knockoutRoundIndex(record.round) <= roundIndex) continue;
    futureTeams.add(record.homeTeam);
    futureTeams.add(record.awayTeam);
  }

  return futureTeams;
}

function getKnockoutWinner(result: MatchResult) {
  if (result.homeScore > result.awayScore) return result.homeTeam;
  if (result.awayScore > result.homeScore) return result.awayTeam;

  const futureTeams = getFutureKnockoutTeams(result.round);
  const homeAdvanced = futureTeams.has(result.homeTeam);
  const awayAdvanced = futureTeams.has(result.awayTeam);

  if (homeAdvanced && !awayAdvanced) return result.homeTeam;
  if (awayAdvanced && !homeAdvanced) return result.awayTeam;
  return null;
}

function buildKnockoutEliminations() {
  const eliminations = new Map<TeamCode, string>();

  for (const result of matchHistory) {
    if (!isKnockoutRecord(result)) continue;

    const winner = getKnockoutWinner(result);
    if (!winner) continue;
    const loser = winner === result.homeTeam ? result.awayTeam : result.homeTeam;
    eliminations.set(loser, result.round);
  }

  return eliminations;
}

function buildTeamTournamentStatuses() {
  const scheduleRecords = (matchScheduleData as { records?: Array<{ group: string; round: string; homeTeam: TeamCode; awayTeam: TeamCode; status: Match["status"] }> }).records || [];
  const activeKnockoutTeams = new Map<TeamCode, string>();
  const knockoutEliminations = buildKnockoutEliminations();
  const knockoutWinners = new Set<TeamCode>();
  const groupStatusByTeam = new Map(groups.flatMap((group) => group.rows.map((rowItem) => [rowItem.teamCode, rowItem.status] as const)));

  for (const record of scheduleRecords) {
    if (!isKnockoutRecord(record) || record.status === "final") continue;
    activeKnockoutTeams.set(record.homeTeam, record.round);
    activeKnockoutTeams.set(record.awayTeam, record.round);
  }

  for (const result of matchHistory) {
    if (!isKnockoutRecord(result)) continue;
    const winner = getKnockoutWinner(result);
    if (winner) knockoutWinners.add(winner);
  }

  return new Map(
    Object.keys(baseTeams).map((teamCode) => {
      const activeRound = activeKnockoutTeams.get(teamCode);
      if (activeRound) return [teamCode, `仍在${activeRound.replace("淘汰賽", "")}`] as const;
      const eliminatedRound = knockoutEliminations.get(teamCode);
      if (eliminatedRound) return [teamCode, `${eliminatedRound.replace("淘汰賽", "")}止步`] as const;
      if (knockoutWinners.has(teamCode)) return [teamCode, "晉級待賽"] as const;
      if (groupStatusByTeam.get(teamCode) === "晉級淘汰賽") return [teamCode, "晉級淘汰賽"] as const;
      return [teamCode, "小組淘汰"] as const;
    })
  );
}

const teamTournamentStatusByCode = buildTeamTournamentStatuses();

export const teams: Record<TeamCode, Team> = Object.fromEntries(
  Object.values(baseTeams).map((team) => {
    const stats = teamStatsByCode.get(team.code);
    const tournamentStatus = teamTournamentStatusByCode.get(team.code) ?? "待更新";
    const goalDifference = stats ? stats.goalsFor - stats.goalsAgainst : 0;
    const recordSummary = stats?.played
      ? `本屆已賽 ${stats.played} 場，${stats.wins} 勝 ${stats.draws} 和 ${stats.losses} 敗，進 ${stats.goalsFor} 球、失 ${stats.goalsAgainst} 球，淨勝 ${goalDifference >= 0 ? `+${goalDifference}` : goalDifference}。`
      : "本屆賽事資料持續更新中。";

    return [
      team.code,
      {
        ...team,
        recentForm: stats?.recentForm.slice(-5) ?? [],
        summary: `${team.nameZh} 是 ${confederationLabel[team.confederation]} 代表隊。${recordSummary}目前狀態：${tournamentStatus}。`
      }
    ];
  })
);

export function getTeamTournamentStatus(code: TeamCode) {
  return teamTournamentStatusByCode.get(code) ?? "待更新";
}

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

const legacyPredictionModelVersion = "Scout v0.1";
const legacyPredictionUpdatedAt = "2026/06/23 20:00";
const weightedPredictionModelVersion = "Scout v0.2";
const weightedPredictionUpdatedAt = "2026/07/05 20:45";

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

function buildUpsetScoreline(probabilities: MatchProbability, scorelines: ScorelineProbability[]): Match["prediction"]["upsetScoreline"] {
  const edge = probabilities.homeWin - probabilities.awayWin;
  const underdog = edge >= 0 ? "away" : "home";
  const underdogWinProbability = underdog === "home" ? probabilities.homeWin : probabilities.awayWin;
  const favoriteWinProbability = underdog === "home" ? probabilities.awayWin : probabilities.homeWin;
  const upsetScoreline = scorelines.find((scoreline) => {
    const [homeGoals, awayGoals] = parseScore(scoreline.score);
    return underdog === "home" ? homeGoals > awayGoals : awayGoals > homeGoals;
  });

  if (!upsetScoreline) return null;

  const label = favoriteWinProbability - underdogWinProbability >= 18 ? "爆冷門比分" : "反向劇本比分";
  const note =
    favoriteWinProbability - underdogWinProbability >= 18
      ? "這不是主模型最可能結果，而是弱勢方若成功打出反擊、定位球或門將高檔表現時，最接近的冷門比分。"
      : "雙方勝率差距不大，這個比分比較像反向劇本，不一定算真正大冷門。";

  return {
    ...upsetScoreline,
    underdog,
    underdogWinProbability,
    label,
    note
  };
}

function makePrediction(
  predictedScore: string,
  confidence: Match["prediction"]["confidence"],
  probabilities: MatchProbability,
  options: { modelVersion?: string; modelUpdatedAt?: string; includeUpsetScoreline?: boolean } = {}
): Match["prediction"] {
  const topScorelines = buildScorelineDistribution(predictedScore, probabilities);

  return {
    predictedScore,
    confidence,
    probabilities,
    topScorelines,
    upsetScoreline: options.includeUpsetScoreline ? buildUpsetScoreline(probabilities, topScorelines) : null,
    modelVersion: options.modelVersion ?? legacyPredictionModelVersion,
    modelUpdatedAt: options.modelUpdatedAt ?? legacyPredictionUpdatedAt
  };
}

interface FinalGroupMatchSeed {
  id: string;
  group: string;
  matchDateTw: string;
  kickoffTw: string;
  venue: string;
  homeTeam: TeamCode;
  awayTeam: TeamCode;
  predictedScore: string;
  probabilities: MatchProbability;
  odds: [number, number, number];
  attentionTags: string[];
  filterTags: Match["filterTags"];
}

function makeFinalGroupMatch(seed: FinalGroupMatchSeed): Match {
  const home = getTeam(seed.homeTeam);
  const away = getTeam(seed.awayTeam);
  const probabilityGap = seed.probabilities.homeWin - seed.probabilities.awayWin;
  const modelLean =
    probabilityGap >= 10
      ? `模型較看好${home.nameZh}`
      : probabilityGap <= -10
        ? `模型較看好${away.nameZh}`
        : "模型認為勝負接近";

  return {
    id: seed.id,
    group: seed.group,
    round: "小組賽第 3 輪",
    matchDateTw: seed.matchDateTw,
    kickoffTw: seed.kickoffTw,
    venue: seed.venue,
    homeTeam: seed.homeTeam,
    awayTeam: seed.awayTeam,
    status: "scheduled",
    attentionTags: seed.attentionTags,
    filterTags: seed.filterTags,
    odds: {
      ...demoOdds,
      homeWinOdds: seed.odds[0],
      drawOdds: seed.odds[1],
      awayWinOdds: seed.odds[2]
    },
    prediction: makePrediction(seed.predictedScore, Math.abs(probabilityGap) >= 25 ? "中高" : "中等", seed.probabilities),
    summary: `${home.nameZh}與${away.nameZh}在${seed.group}最後一輪交手，晉級、排名與淨勝球都會受同組另一場影響。`,
    plainLanguageAnalysis: [
      `${modelLean}。最後一輪不能只看紙面實力，兩隊也會依照同步賽事比分調整進攻風險。`
    ],
    keyFactors: ["最後一輪同組同步賽果", "淨勝球與最佳第三名比較", "先進球一方的比賽控制"],
    historyNote: `${seed.group}最後一輪兩場同步進行，晉級與排名會隨另一場比分即時變化。`,
    qualificationImpact: {
      homeWin: `${home.nameZh}贏球可提高晉級或排名優勢。`,
      draw: "平手後仍需比較同組賽果、積分與淨勝球。",
      awayWin: `${away.nameZh}贏球可提高晉級或排名優勢。`
    }
  };
}

const taiwanTimeZone = "Asia/Taipei";
const matchdayRolloverOffsetHours = 10;

interface ImportedScheduleRecord {
  id: string;
  espnEventId: string;
  group: string;
  round: string;
  seasonSlug?: string;
  matchDateTw: string;
  kickoffTw: string;
  kickoffUtc: string;
  venue: string;
  homeTeam: TeamCode;
  awayTeam: TeamCode;
  status: Match["status"];
  source?: {
    name: string;
    eventUrl: string;
    fetchedAt: string;
  };
}

const importedSchedule = matchScheduleData as {
  updatedAt?: string | null;
  records?: ImportedScheduleRecord[];
};

const teamPowerBoost: Record<string, number> = {
  ARG: 15,
  BRA: 14,
  FRA: 13,
  ESP: 12,
  ENG: 11,
  GER: 11,
  POR: 10,
  NED: 9,
  BEL: 8,
  MEX: 8,
  USA: 7,
  URU: 7,
  COL: 7,
  CRO: 6,
  SUI: 6,
  JPN: 5,
  MAR: 5,
  SEN: 4,
  SWE: 4,
  NOR: 4,
  AUT: 3,
  CAN: 3,
  CIV: 3,
  GHA: 2,
  ECU: 2,
  AUS: 2
};

const confederationPower: Record<string, number> = {
  CONMEBOL: 70,
  UEFA: 69,
  CONCACAF: 63,
  CAF: 62,
  AFC: 60,
  OFC: 54
};

function teamStandingPower(code: TeamCode) {
  const team = getTeam(code);
  const standing = groups.flatMap((group) => group.rows).find((rowItem) => rowItem.teamCode === code);
  const base = confederationPower[team.confederation] ?? 60;
  const formBoost = standing
    ? standing.points * 1.6 + (standing.goalsFor - standing.goalsAgainst) * 0.9 + (standing.status === "已晉級" ? 4 : 0)
    : 0;

  return base + (teamPowerBoost[code] ?? 0) + formBoost;
}

function probabilitiesFromLegacyPower(homeTeam: TeamCode, awayTeam: TeamCode): MatchProbability {
  const gap = teamStandingPower(homeTeam) + 2 - teamStandingPower(awayTeam);
  const draw = Math.round(clamp(18, 32, 29 - Math.abs(gap) * 0.45));
  let homeWin = Math.round(clamp(7, 86, 50 + gap * 1.35 - draw / 2));
  let awayWin = 100 - draw - homeWin;

  if (awayWin < 7) {
    awayWin = 7;
    homeWin = 100 - draw - awayWin;
  }
  if (homeWin < 7) {
    homeWin = 7;
    awayWin = 100 - draw - homeWin;
  }

  const combinedPower = teamStandingPower(homeTeam) + teamStandingPower(awayTeam);
  const over = Math.round(clamp(38, 64, 45 + (combinedPower - 130) / 4 + Math.abs(gap) / 6));
  const bothTeamsToScore = Math.round(clamp(34, 60, 48 - Math.abs(gap) / 5 + (over - 48) / 3));

  return { homeWin, draw, awayWin, over, bothTeamsToScore };
}

function teamTournamentScore(code: TeamCode) {
  const stats = teamStatsByCode.get(code);

  if (stats && stats.played > 0) {
    const points = stats.wins * 3 + stats.draws;
    const pointsRate = points / (stats.played * 3);
    const goalDifferencePerMatch = (stats.goalsFor - stats.goalsAgainst) / stats.played;
    const goalsForPerMatch = stats.goalsFor / stats.played;
    const goalsAgainstPerMatch = stats.goalsAgainst / stats.played;

    return clamp(22, 92, 34 + pointsRate * 38 + goalDifferencePerMatch * 8 + goalsForPerMatch * 3 - goalsAgainstPerMatch * 2);
  }

  const standing = getStandingContext(code);
  if (!standing) return 50;

  const rowItem = standing.row;
  const pointsRate = rowItem.played > 0 ? rowItem.points / (rowItem.played * 3) : 0.35;
  const goalDifferencePerMatch = rowItem.played > 0 ? (rowItem.goalsFor - rowItem.goalsAgainst) / rowItem.played : 0;

  return clamp(22, 92, 34 + pointsRate * 38 + goalDifferencePerMatch * 8);
}

function teamProfileScore(code: TeamCode) {
  const team = getTeam(code);
  const eloScore = team.eloRating == null ? 50 : clamp(20, 98, ((team.eloRating - 1450) / 700) * 100);
  const fifaScore = team.fifaRank == null ? 50 : clamp(20, 98, 100 - (team.fifaRank - 1) * 0.95);

  return eloScore * 0.68 + fifaScore * 0.32;
}

function teamRecentScore(code: TeamCode) {
  const stats = teamStatsByCode.get(code);
  if (!stats || stats.recentForm.length === 0) return teamTournamentScore(code);

  const recent = stats.recentForm.slice(-4);
  const formScore =
    recent.reduce((total, result) => {
      if (result === "W") return total + 100;
      if (result === "D") return total + 55;
      return total + 25;
    }, 0) / recent.length;
  const goalTrend = stats.played > 0 ? ((stats.goalsFor - stats.goalsAgainst) / stats.played) * 5 : 0;

  return clamp(22, 94, formScore + goalTrend);
}

function teamWorldCupHistoryScore(code: TeamCode) {
  const bestResult = getTeam(code).worldCupBestResult;

  if (bestResult.includes("冠軍")) return 98;
  if (bestResult.includes("亞軍")) return 88;
  if (bestResult.includes("第3名")) return 82;
  if (bestResult.includes("第4名")) return 78;
  if (bestResult.includes("8強")) return 68;
  if (bestResult.includes("16強")) return 58;
  if (bestResult.includes("首次參加")) return 36;
  return 44;
}

function teamSpecialFactorScore(code: TeamCode) {
  const team = getTeam(code);
  const hostBoost = code === "MEX" || code === "USA" || code === "CAN" ? 7 : 0;
  const confederationScore = confederationPower[team.confederation] ?? 60;

  return clamp(30, 88, confederationScore + (teamPowerBoost[code] ?? 0) * 0.7 + hostBoost);
}

function teamWeightedPower(code: TeamCode) {
  return (
    teamTournamentScore(code) * 0.4 +
    teamProfileScore(code) * 0.25 +
    teamRecentScore(code) * 0.2 +
    teamWorldCupHistoryScore(code) * 0.1 +
    teamSpecialFactorScore(code) * 0.05
  );
}

function teamGoalProfile(code: TeamCode) {
  const stats = teamStatsByCode.get(code);

  if (stats && stats.played > 0) {
    return {
      attack: stats.goalsFor / stats.played,
      defenseLeak: stats.goalsAgainst / stats.played
    };
  }

  const standing = getStandingContext(code);
  if (standing && standing.row.played > 0) {
    return {
      attack: standing.row.goalsFor / standing.row.played,
      defenseLeak: standing.row.goalsAgainst / standing.row.played
    };
  }

  return { attack: 1.2, defenseLeak: 1.2 };
}

function probabilitiesFromWeightedPower(homeTeam: TeamCode, awayTeam: TeamCode): MatchProbability {
  const homePower = teamWeightedPower(homeTeam);
  const awayPower = teamWeightedPower(awayTeam);
  const gap = homePower + 1.5 - awayPower;
  const draw = Math.round(clamp(16, 31, 28 - Math.abs(gap) * 0.52));
  let homeWin = Math.round(clamp(7, 86, 50 + gap * 1.12 - draw / 2));
  let awayWin = 100 - draw - homeWin;

  if (awayWin < 7) {
    awayWin = 7;
    homeWin = 100 - draw - awayWin;
  }
  if (homeWin < 7) {
    homeWin = 7;
    awayWin = 100 - draw - homeWin;
  }

  const homeGoalProfile = teamGoalProfile(homeTeam);
  const awayGoalProfile = teamGoalProfile(awayTeam);
  const expectedHomeGoals = (homeGoalProfile.attack + awayGoalProfile.defenseLeak) / 2;
  const expectedAwayGoals = (awayGoalProfile.attack + homeGoalProfile.defenseLeak) / 2;
  const combinedExpectedGoals = expectedHomeGoals + expectedAwayGoals;
  const over = Math.round(clamp(36, 68, 42 + (combinedExpectedGoals - 2.25) * 8 + Math.abs(gap) / 8));
  const bothTeamsToScore = Math.round(clamp(32, 62, 42 + Math.min(expectedHomeGoals, expectedAwayGoals) * 7 + (over - 48) / 3 - Math.abs(gap) / 7));

  return { homeWin, draw, awayWin, over, bothTeamsToScore };
}

function probabilitiesFromPower(homeTeam: TeamCode, awayTeam: TeamCode, includeHistoricalWeights = false): MatchProbability {
  return includeHistoricalWeights ? probabilitiesFromWeightedPower(homeTeam, awayTeam) : probabilitiesFromLegacyPower(homeTeam, awayTeam);
}

function predictedScoreFromModel(probabilities: MatchProbability) {
  const edge = probabilities.homeWin - probabilities.awayWin;

  if (edge >= 28) return probabilities.over >= 55 ? "3-0" : "2-0";
  if (edge >= 12) return probabilities.over >= 52 ? "2-1" : "1-0";
  if (edge <= -28) return probabilities.over >= 55 ? "0-3" : "0-2";
  if (edge <= -12) return probabilities.over >= 52 ? "1-2" : "0-1";
  return probabilities.over >= 56 ? "2-2" : "1-1";
}

function oddsFromProbability(probability: number) {
  return Number(clamp(1.12, 16, 94 / Math.max(probability, 1)).toFixed(2));
}

function formatTaiwanTimestamp(isoDate?: string | null) {
  if (!isoDate) return demoOdds.updatedAt;

  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: taiwanTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(isoDate));
}

function parseScoreline(scoreline: string) {
  const [homeScore, awayScore] = scoreline.split("-").map((value) => Number.parseInt(value, 10));
  if (Number.isNaN(homeScore) || Number.isNaN(awayScore)) return null;
  return { homeScore, awayScore, totalGoals: homeScore + awayScore };
}

function signedNumber(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function getStandingContext(teamCode: TeamCode) {
  for (const group of groups) {
    const rowItem = group.rows.find((row) => row.teamCode === teamCode);
    if (rowItem) return { groupName: group.name, row: rowItem };
  }
  return null;
}

function teamTournamentRecordText(teamCode: TeamCode) {
  const stats = teamStatsByCode.get(teamCode);
  if (stats && stats.played > 0) {
    return `${stats.played}戰${stats.wins}勝${stats.draws}和${stats.losses}敗，進${stats.goalsFor}球、失${stats.goalsAgainst}球`;
  }

  const standing = getStandingContext(teamCode);
  if (standing) {
    const goalDifference = standing.row.goalsFor - standing.row.goalsAgainst;
    return `${standing.groupName}${standing.row.points}分，淨勝${signedNumber(goalDifference)}`;
  }

  return "本屆完整戰績待補";
}

function teamProfileText(team: Team) {
  const fifaRank = team.fifaRank == null ? "FIFA排名待補" : `FIFA第${team.fifaRank}`;
  const elo = team.eloRating == null ? "Elo待補" : `Elo ${team.eloRating}`;
  return `${fifaRank}、${elo}，世界盃最佳${team.worldCupBestResult}`;
}

function getNextKnockoutRoundName(round: string): string {
  const index = knockoutRoundIndex(round);
  if (index === Number.MAX_SAFE_INTEGER) return "下一輪";
  return knockoutRoundOrder[index + 1] ?? "最後名次戰";
}

function matchupFavoriteText(home: Team, away: Team, edge: number) {
  if (edge >= 18) return `${home.nameZh}是明顯熱門`;
  if (edge >= 8) return `${home.nameZh}小幅占優`;
  if (edge <= -18) return `${away.nameZh}是明顯熱門`;
  if (edge <= -8) return `${away.nameZh}小幅占優`;
  return "盤面接近五五波";
}

function modelRiskText(probabilities: MatchProbability) {
  const highest = Math.max(probabilities.homeWin, probabilities.draw, probabilities.awayWin);
  const secondHighest = [probabilities.homeWin, probabilities.draw, probabilities.awayWin].sort((first, second) => second - first)[1];
  const gap = highest - secondHighest;

  if (gap <= 8) return "三項勝平負差距很小，不適合只看熱門隊名下注。";
  if (probabilities.draw >= 28) return `和局機率有${probabilities.draw}%，正規時間平手需要被當成主要劇本處理。`;
  if (probabilities.over >= 56) return `大球機率${probabilities.over}%，比起只猜勝負，更要注意兩隊是否會互相拉高節奏。`;
  return `模型最看重勝率差，但第二高劇本仍有${secondHighest}%，盤口過熱時要保留反向風險。`;
}

const weightedModelFactorText = "新版模型權重：本屆攻守40%、FIFA/Elo25%、近期狀態20%、世界盃歷史10%、主場/洲別等特殊因素5%。";

function buildScheduledPlainLanguage(record: ImportedScheduleRecord, probabilities: MatchProbability, predictedScore: string) {
  const home = getTeam(record.homeTeam);
  const away = getTeam(record.awayTeam);
  const edge = probabilities.homeWin - probabilities.awayWin;
  const isKnockout = isKnockoutRecord(record);
  const scoreline = parseScoreline(predictedScore);
  const favoriteText = matchupFavoriteText(home, away, edge);
  const nextRound = getNextKnockoutRoundName(record.round);
  const tempoText =
    probabilities.over >= 55
      ? "節奏偏開放，進球上限比一般淘汰賽更高"
      : probabilities.over <= 44
        ? "節奏偏保守，單一失誤或定位球可能決定比賽"
        : "節奏不算極端，重點會回到誰先進球";

  return [
    `${home.nameZh}本屆目前${teamTournamentRecordText(record.homeTeam)}；${away.nameZh}本屆目前${teamTournamentRecordText(record.awayTeam)}。模型估 ${predictedScore}${scoreline ? `、總進球約${scoreline.totalGoals}球` : ""}，${favoriteText}。`,
    isKnockout
      ? `${record.round}輸球就出局，主勝${probabilities.homeWin}%、和局${probabilities.draw}%、客勝${probabilities.awayWin}%。台灣球迷看盤時，正規時間和局不是附帶選項；若打平，仍會進延長賽或PK，但勝平負盤會先按90分鐘結算。${nextRound !== "最後名次戰" ? `勝隊將往${nextRound}前進。` : ""}`
      : `${record.group}的積分與淨勝球會放大比賽後段風險。${tempoText}；若落後方提前壓上，大小球與雙方進球盤會比賽前模型更敏感。`
  ];
}

function buildScheduledKeyFactors(record: ImportedScheduleRecord, probabilities: MatchProbability) {
  const home = getTeam(record.homeTeam);
  const away = getTeam(record.awayTeam);
  const homeStats = teamStatsByCode.get(record.homeTeam);
  const awayStats = teamStatsByCode.get(record.awayTeam);
  const homeGoalDifference = (homeStats?.goalsFor ?? 0) - (homeStats?.goalsAgainst ?? 0);
  const awayGoalDifference = (awayStats?.goalsFor ?? 0) - (awayStats?.goalsAgainst ?? 0);
  const isKnockout = isKnockoutRecord(record);
  const factors = [
    weightedModelFactorText,
    `實力底盤：${home.nameZh}${teamProfileText(home)}；${away.nameZh}${teamProfileText(away)}。`,
    `本屆攻守差：${home.nameZh}淨勝${signedNumber(homeGoalDifference)}，${away.nameZh}淨勝${signedNumber(awayGoalDifference)}，這會影響模型對先進球方的容錯。`,
    `盤口風險：主勝${probabilities.homeWin}%、和局${probabilities.draw}%、客勝${probabilities.awayWin}%；${modelRiskText(probabilities)}`
  ];

  if (isKnockout) {
    factors.push(`淘汰賽重點：若正規時間進入最後30分鐘仍平手，換人保守度、定位球防守與PK心理會比一般小組賽更重要。`);
  } else {
    factors.push(`小組賽重點：若同組另一場比分改變，領先隊可能轉向控風險，落後隊則會提高壓迫與射門量。`);
  }

  if (probabilities.over >= 55 || probabilities.bothTeamsToScore >= 55) {
    factors.push(`進球盤提示：大球${probabilities.over}%、雙方進球${probabilities.bothTeamsToScore}%，若早早出現第一球，後續比分容易被拉開。`);
  } else {
    factors.push(`進球盤提示：大球${probabilities.over}%、雙方進球${probabilities.bothTeamsToScore}%，模型目前不鼓勵單純追高比分。`);
  }

  return factors;
}

function buildScheduledHistoryNote(record: ImportedScheduleRecord) {
  const home = getTeam(record.homeTeam);
  const away = getTeam(record.awayTeam);
  return `${home.nameZh}${teamProfileText(home)}；${away.nameZh}${teamProfileText(away)}。本頁把歷史底色、本屆攻守數據與最新賽程一起放進模型，不再只用固定模板。`;
}

function buildScheduledQualificationImpact(record: ImportedScheduleRecord, probabilities: MatchProbability): Match["qualificationImpact"] {
  const home = getTeam(record.homeTeam);
  const away = getTeam(record.awayTeam);
  const isKnockout = isKnockoutRecord(record);

  if (isKnockout) {
    const nextRound = getNextKnockoutRoundName(record.round);
    return {
      homeWin: `${home.nameZh}若在正規時間贏球，直接取得${nextRound}席位；若只是小勝，下一輪仍要注意體能消耗與防線壓力。`,
      draw: `正規時間平手機率${probabilities.draw}%。這不是「兩隊都安全」，而是代表延長賽或PK風險升高；勝平負盤會先按90分鐘結果看。`,
      awayWin: `${away.nameZh}若在正規時間贏球，會帶著淘汰熱門或客勝劇本進入${nextRound}；後續盤口可能快速修正。`
    };
  }

  const homeStanding = getStandingContext(record.homeTeam);
  const awayStanding = getStandingContext(record.awayTeam);
  const homePoints = homeStanding?.row.points ?? 0;
  const awayPoints = awayStanding?.row.points ?? 0;

  return {
    homeWin: `${home.nameZh}若贏球，積分會從${homePoints}分往上推，前二或最佳第三名比較都更有利。`,
    draw: `平手會讓兩隊都少拿2分，接下來要看同組另一場與淨勝球；模型給和局${probabilities.draw}%，不能忽略。`,
    awayWin: `${away.nameZh}若贏球，積分會從${awayPoints}分往上推，也可能直接改變同組排序與淘汰賽籤位。`
  };
}

function resultTeamLine(result: MatchResult) {
  const home = getTeam(result.homeTeam);
  const away = getTeam(result.awayTeam);
  return `${home.nameZh}射門${result.statistics.home.totalShots ?? "-"}次、射正${result.statistics.home.shotsOnTarget ?? "-"}次、控球${result.statistics.home.possessionPct ?? "-"}%；${away.nameZh}射門${result.statistics.away.totalShots ?? "-"}次、射正${result.statistics.away.shotsOnTarget ?? "-"}次、控球${result.statistics.away.possessionPct ?? "-"}%。`;
}

function evaluationText(result: MatchResult) {
  if (result.evaluation.exactScore) return "比分完全命中";
  if (result.evaluation.resultCorrect) return "勝負方向有抓到，但比分差距需要修正";
  return "勝負方向失準，這場會提高模型對相同型態比賽的警戒";
}

function buildPostmatchSummary(match: Match, result: MatchResult) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const winner = isKnockoutRecord(match) ? getKnockoutWinner(result) : result.homeScore === result.awayScore ? null : result.homeScore > result.awayScore ? result.homeTeam : result.awayTeam;
  const winnerText = winner ? `${getTeam(winner).nameZh}${isKnockoutRecord(match) ? "晉級" : "拿下3分"}` : "雙方打平";

  return `${match.round}完賽：${home.nameZh} ${result.finalScore} ${away.nameZh}，${winnerText}。模型賽前估 ${result.predictionSnapshot.predictedScore}，${evaluationText(result)}。`;
}

function buildPostmatchPlainLanguage(match: Match, result: MatchResult) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const winner = isKnockoutRecord(match) ? getKnockoutWinner(result) : result.homeScore === result.awayScore ? null : result.homeScore > result.awayScore ? result.homeTeam : result.awayTeam;
  const loser = winner === result.homeTeam ? result.awayTeam : winner === result.awayTeam ? result.homeTeam : null;
  const shotLine = resultTeamLine(result);
  const modelLine = `賽前模型估 ${result.predictionSnapshot.predictedScore}，實際 ${result.finalScore}，總落差${result.evaluation.scoreDistance}球。${evaluationText(result)}。`;
  const knockoutLine =
    isKnockoutRecord(match) && winner && loser
      ? `${getTeam(winner).nameZh}晉級，${getTeam(loser).nameZh}止步；後續要看勝隊能否把這場暴露出的射門效率、體能消耗或防守問題帶到下一輪。`
      : `${home.nameZh}與${away.nameZh}這場結果會回寫到模型戰績，後續同型態盤口會調整權重。`;

  return [modelLine, `${shotLine} ${knockoutLine}`];
}

function buildPostmatchKeyFactors(match: Match, result: MatchResult) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const homeShotsOnTarget = result.statistics.home.shotsOnTarget ?? 0;
  const awayShotsOnTarget = result.statistics.away.shotsOnTarget ?? 0;
  const homeShots = result.statistics.home.totalShots ?? 0;
  const awayShots = result.statistics.away.totalShots ?? 0;
  const homePossession = result.statistics.home.possessionPct ?? 0;
  const awayPossession = result.statistics.away.possessionPct ?? 0;
  const shotLeader = homeShotsOnTarget === awayShotsOnTarget ? "雙方射正差距不大" : homeShotsOnTarget > awayShotsOnTarget ? `${home.nameZh}射正多${homeShotsOnTarget - awayShotsOnTarget}次` : `${away.nameZh}射正多${awayShotsOnTarget - homeShotsOnTarget}次`;
  const possessionLeader = homePossession === awayPossession ? "控球接近平均" : homePossession > awayPossession ? `${home.nameZh}控球高出${(homePossession - awayPossession).toFixed(1)}個百分點` : `${away.nameZh}控球高出${(awayPossession - homePossession).toFixed(1)}個百分點`;
  const factors = [
    `射門品質：${home.nameZh}${homeShots}射${homeShotsOnTarget}正，${away.nameZh}${awayShots}射${awayShotsOnTarget}正；${shotLeader}。`,
    `比賽控制：${possessionLeader}，但控球是否能轉成射正，比單純持球時間更值得追蹤。`,
    `模型修正：預估${result.predictionSnapshot.predictedScore}、實際${result.finalScore}，主隊進球誤差${result.evaluation.homeGoalError}、客隊進球誤差${result.evaluation.awayGoalError}。`
  ];

  if (result.homeScore === result.awayScore && isKnockoutRecord(match)) {
    factors.push("淘汰賽平手提醒：正規時間模型不能只看晉級隊，延長賽與PK需要另列風險。");
  } else if (isKnockoutRecord(match)) {
    const winner = getKnockoutWinner(result);
    if (winner) factors.push(`晉級訊號：${getTeam(winner).nameZh}已進入${getNextKnockoutRoundName(match.round)}，下一場盤口要重新估體能與對手強度。`);
  } else {
    factors.push("小組賽訊號：這場比分已回寫積分與淨勝球，會影響後續最佳第三名或淘汰賽籤位判斷。");
  }

  return factors;
}

function buildPostmatchHistoryNote(match: Match, result: MatchResult) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  return `${home.nameZh}本屆累積${teamTournamentRecordText(match.homeTeam)}；${away.nameZh}本屆累積${teamTournamentRecordText(match.awayTeam)}。這場由${result.source.name}賽後數據回寫，會成為後續模型校正與歷史參考資料。`;
}

function buildPostmatchImpact(match: Match, result: MatchResult): Match["qualificationImpact"] {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const winner = isKnockoutRecord(match) ? getKnockoutWinner(result) : result.homeScore === result.awayScore ? null : result.homeScore > result.awayScore ? result.homeTeam : result.awayTeam;
  const loser = winner === result.homeTeam ? result.awayTeam : winner === result.awayTeam ? result.homeTeam : null;
  const nextRound = getNextKnockoutRoundName(match.round);

  if (isKnockoutRecord(match)) {
    return {
      homeWin: winner ? `${getTeam(winner).nameZh}晉級${nextRound}；${loser ? `${getTeam(loser).nameZh}止步${match.round}` : "另一隊止步"}。` : `${home.nameZh}與${away.nameZh}正規時間打平，晉級隊伍需依延長賽或PK資料確認。`,
      draw: `模型賽前估${result.predictionSnapshot.predictedScore}，實際${result.finalScore}，落差${result.evaluation.scoreDistance}球；${evaluationText(result)}。`,
      awayWin: `${result.analysisReasons[0] ?? "後續模型會把射門品質、控球轉換率與淘汰賽風險一起回寫。"}`
    };
  }

  return {
    homeWin: `${home.nameZh}與${away.nameZh}已完賽，實際比分${result.finalScore}會更新小組積分與淨勝球。`,
    draw: `模型賽前估${result.predictionSnapshot.predictedScore}，實際${result.finalScore}，落差${result.evaluation.scoreDistance}球；${evaluationText(result)}。`,
    awayWin: `${result.analysisReasons[0] ?? "這場結果會回寫到後續晉級機率與模型戰績。"}`
  };
}

function applyResultAnalysis(match: Match, result: MatchResult): Match {
  return {
    ...match,
    status: "final",
    result,
    summary: buildPostmatchSummary(match, result),
    plainLanguageAnalysis: buildPostmatchPlainLanguage(match, result),
    keyFactors: buildPostmatchKeyFactors(match, result),
    historyNote: buildPostmatchHistoryNote(match, result),
    qualificationImpact: buildPostmatchImpact(match, result)
  };
}

function makeImportedScheduleMatch(record: ImportedScheduleRecord): Match {
  const home = getTeam(record.homeTeam);
  const away = getTeam(record.awayTeam);
  const useWeightedModel = record.status !== "final";
  const probabilities = probabilitiesFromPower(record.homeTeam, record.awayTeam, useWeightedModel);
  const predictedScore = predictedScoreFromModel(probabilities);
  const edge = probabilities.homeWin - probabilities.awayWin;
  const isKnockout = isKnockoutRecord(record);
  const hasAsiaTeam = home.confederation === "AFC" || away.confederation === "AFC";
  const filterTags: Match["filterTags"] = ["high"];

  if (!isKnockout) filterTags.push("group");
  if (hasAsiaTeam) filterTags.push("asia");
  if (probabilities.over >= 50) filterTags.push("goals");

  return {
    id: record.id,
    group: record.group,
    round: record.round,
    matchDateTw: record.matchDateTw,
    kickoffTw: record.kickoffTw,
    venue: record.venue,
    homeTeam: record.homeTeam,
    awayTeam: record.awayTeam,
    status: record.status,
    attentionTags: [
      isKnockout ? "淘汰賽" : "小組關鍵",
      "高關注",
      ...(hasAsiaTeam ? ["亞洲焦點"] : probabilities.over >= 50 ? ["進球期待"] : [])
    ],
    filterTags,
    odds: {
      ...demoOdds,
      homeWinOdds: oddsFromProbability(probabilities.homeWin),
      drawOdds: oddsFromProbability(probabilities.draw),
      awayWinOdds: oddsFromProbability(probabilities.awayWin),
      updatedAt: formatTaiwanTimestamp(record.source?.fetchedAt || importedSchedule.updatedAt),
      sourceNote: "由 ESPN 最新賽程帶入，倍率為模型依勝率換算的盤口參考。"
    },
    prediction: makePrediction(
      predictedScore,
      Math.abs(edge) >= 28 ? "高" : Math.abs(edge) >= 12 ? "中高" : "中等",
      probabilities,
      {
        includeUpsetScoreline: useWeightedModel,
        modelVersion: useWeightedModel ? weightedPredictionModelVersion : legacyPredictionModelVersion,
        modelUpdatedAt: useWeightedModel ? weightedPredictionUpdatedAt : legacyPredictionUpdatedAt
      }
    ),
    summary: `${record.round}：${home.nameZh}對${away.nameZh}，模型目前估 ${predictedScore}，盤面判斷為${matchupFavoriteText(home, away, edge)}，重點不是只看隊名，而是勝率差、和局風險與本屆攻守狀態。`,
    plainLanguageAnalysis: buildScheduledPlainLanguage(record, probabilities, predictedScore),
    keyFactors: buildScheduledKeyFactors(record, probabilities),
    historyNote: buildScheduledHistoryNote(record),
    qualificationImpact: buildScheduledQualificationImpact(record, probabilities)
  };
}

function getTaiwanDateKey(date = new Date()) {
  const adjustedDate = new Date(date.getTime() + matchdayRolloverOffsetHours * 60 * 60 * 1000);

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: taiwanTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(adjustedDate);
}

const scheduledMatches: Match[] = [
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
  },
  makeFinalGroupMatch({
    id: "cuw-civ",
    group: "E 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 04:00",
    venue: "Lincoln Financial Field",
    homeTeam: "CUW",
    awayTeam: "CIV",
    predictedScore: "0-2",
    probabilities: { homeWin: 17, draw: 25, awayWin: 58, over: 47, bothTeamsToScore: 39 },
    odds: [5.8, 3.8, 1.55],
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["group"]
  }),
  makeFinalGroupMatch({
    id: "ecu-ger",
    group: "E 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 04:00",
    venue: "MetLife Stadium",
    homeTeam: "ECU",
    awayTeam: "GER",
    predictedScore: "0-2",
    probabilities: { homeWin: 15, draw: 23, awayWin: 62, over: 49, bothTeamsToScore: 37 },
    odds: [6.2, 4.1, 1.48],
    attentionTags: ["高關注", "小組頭名"],
    filterTags: ["high", "group"]
  }),
  makeFinalGroupMatch({
    id: "jpn-swe",
    group: "F 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 07:00",
    venue: "AT&T Stadium",
    homeTeam: "JPN",
    awayTeam: "SWE",
    predictedScore: "1-1",
    probabilities: { homeWin: 38, draw: 30, awayWin: 32, over: 46, bothTeamsToScore: 54 },
    odds: [2.3, 3.25, 3],
    attentionTags: ["亞洲焦點", "小組關鍵"],
    filterTags: ["high", "group", "asia"]
  }),
  makeFinalGroupMatch({
    id: "tun-ned",
    group: "F 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 07:00",
    venue: "GEHA Field at Arrowhead Stadium",
    homeTeam: "TUN",
    awayTeam: "NED",
    predictedScore: "0-2",
    probabilities: { homeWin: 13, draw: 22, awayWin: 65, over: 52, bothTeamsToScore: 34 },
    odds: [7, 4.4, 1.4],
    attentionTags: ["高關注", "進球期待"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "par-aus",
    group: "D 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 10:00",
    venue: "Levi's Stadium",
    homeTeam: "PAR",
    awayTeam: "AUS",
    predictedScore: "1-1",
    probabilities: { homeWin: 39, draw: 30, awayWin: 31, over: 44, bothTeamsToScore: 52 },
    odds: [2.35, 3.25, 2.9],
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["group"]
  }),
  makeFinalGroupMatch({
    id: "tur-usa",
    group: "D 組",
    matchDateTw: "2026-06-26",
    kickoffTw: "06/26 10:00",
    venue: "SoFi Stadium",
    homeTeam: "TUR",
    awayTeam: "USA",
    predictedScore: "1-2",
    probabilities: { homeWin: 24, draw: 27, awayWin: 49, over: 53, bothTeamsToScore: 55 },
    odds: [4, 3.5, 1.85],
    attentionTags: ["地主焦點", "高關注"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "nor-fra",
    group: "I 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 03:00",
    venue: "Gillette Stadium",
    homeTeam: "NOR",
    awayTeam: "FRA",
    predictedScore: "1-2",
    probabilities: { homeWin: 21, draw: 26, awayWin: 53, over: 56, bothTeamsToScore: 57 },
    odds: [4.8, 3.7, 1.67],
    attentionTags: ["高關注", "小組頭名"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "sen-irq",
    group: "I 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 03:00",
    venue: "BMO Field",
    homeTeam: "SEN",
    awayTeam: "IRQ",
    predictedScore: "2-0",
    probabilities: { homeWin: 58, draw: 26, awayWin: 16, over: 45, bothTeamsToScore: 36 },
    odds: [1.58, 3.8, 5.6],
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["group", "asia"]
  }),
  makeFinalGroupMatch({
    id: "cpv-ksa",
    group: "H 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 08:00",
    venue: "NRG Stadium",
    homeTeam: "CPV",
    awayTeam: "KSA",
    predictedScore: "1-1",
    probabilities: { homeWin: 30, draw: 31, awayWin: 39, over: 42, bothTeamsToScore: 50 },
    odds: [3.1, 3.2, 2.25],
    attentionTags: ["亞洲焦點", "晉級生死戰"],
    filterTags: ["group", "asia"]
  }),
  makeFinalGroupMatch({
    id: "uru-esp",
    group: "H 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 08:00",
    venue: "Estadio Akron",
    homeTeam: "URU",
    awayTeam: "ESP",
    predictedScore: "1-2",
    probabilities: { homeWin: 24, draw: 27, awayWin: 49, over: 54, bothTeamsToScore: 58 },
    odds: [3.9, 3.4, 1.9],
    attentionTags: ["高關注", "小組頭名"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "egy-irn",
    group: "G 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 11:00",
    venue: "Lumen Field",
    homeTeam: "EGY",
    awayTeam: "IRN",
    predictedScore: "1-1",
    probabilities: { homeWin: 37, draw: 31, awayWin: 32, over: 40, bothTeamsToScore: 49 },
    odds: [2.45, 3.1, 2.9],
    attentionTags: ["亞洲焦點", "小組關鍵"],
    filterTags: ["group", "asia"]
  }),
  makeFinalGroupMatch({
    id: "nzl-bel",
    group: "G 組",
    matchDateTw: "2026-06-27",
    kickoffTw: "06/27 11:00",
    venue: "BC Place",
    homeTeam: "NZL",
    awayTeam: "BEL",
    predictedScore: "0-3",
    probabilities: { homeWin: 8, draw: 15, awayWin: 77, over: 63, bothTeamsToScore: 28 },
    odds: [12, 6, 1.2],
    attentionTags: ["高關注", "進球期待"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "cro-gha",
    group: "L 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 05:00",
    venue: "Lincoln Financial Field",
    homeTeam: "CRO",
    awayTeam: "GHA",
    predictedScore: "2-1",
    probabilities: { homeWin: 51, draw: 27, awayWin: 22, over: 51, bothTeamsToScore: 54 },
    odds: [1.82, 3.5, 4.1],
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "pan-eng",
    group: "L 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 05:00",
    venue: "MetLife Stadium",
    homeTeam: "PAN",
    awayTeam: "ENG",
    predictedScore: "0-3",
    probabilities: { homeWin: 8, draw: 16, awayWin: 76, over: 61, bothTeamsToScore: 30 },
    odds: [11, 6, 1.22],
    attentionTags: ["高關注", "進球期待"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "col-por",
    group: "K 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 07:30",
    venue: "Hard Rock Stadium",
    homeTeam: "COL",
    awayTeam: "POR",
    predictedScore: "1-1",
    probabilities: { homeWin: 32, draw: 30, awayWin: 38, over: 48, bothTeamsToScore: 55 },
    odds: [2.9, 3.25, 2.35],
    attentionTags: ["高關注", "小組頭名"],
    filterTags: ["high", "group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "cod-uzb",
    group: "K 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 07:30",
    venue: "Mercedes-Benz Stadium",
    homeTeam: "COD",
    awayTeam: "UZB",
    predictedScore: "1-1",
    probabilities: { homeWin: 38, draw: 31, awayWin: 31, over: 41, bothTeamsToScore: 50 },
    odds: [2.4, 3.1, 2.9],
    attentionTags: ["首次參賽", "晉級生死戰"],
    filterTags: ["group", "asia"]
  }),
  makeFinalGroupMatch({
    id: "alg-aut",
    group: "J 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 10:00",
    venue: "GEHA Field at Arrowhead Stadium",
    homeTeam: "ALG",
    awayTeam: "AUT",
    predictedScore: "1-2",
    probabilities: { homeWin: 27, draw: 29, awayWin: 44, over: 48, bothTeamsToScore: 54 },
    odds: [3.3, 3.25, 2.15],
    attentionTags: ["晉級生死戰", "小組關鍵"],
    filterTags: ["group", "goals"]
  }),
  makeFinalGroupMatch({
    id: "jor-arg",
    group: "J 組",
    matchDateTw: "2026-06-28",
    kickoffTw: "06/28 10:00",
    venue: "AT&T Stadium",
    homeTeam: "JOR",
    awayTeam: "ARG",
    predictedScore: "0-3",
    probabilities: { homeWin: 6, draw: 14, awayWin: 80, over: 64, bothTeamsToScore: 27 },
    odds: [15, 7, 1.15],
    attentionTags: ["高關注", "亞洲焦點"],
    filterTags: ["high", "group", "asia", "goals"]
  })
];

const resultsByMatchId = new Map(matchHistory.map((result) => [result.matchId, result]));
const seededMatchIds = new Set(scheduledMatches.map((match) => match.id));
const seededMatchKeys = new Set(scheduledMatches.map((match) => `${match.matchDateTw}-${match.homeTeam}-${match.awayTeam}`));
const importedScheduleMatches = (importedSchedule.records || [])
  .filter((record) => !seededMatchIds.has(record.id))
  .filter((record) => !seededMatchKeys.has(`${record.matchDateTw}-${record.homeTeam}-${record.awayTeam}`))
  .map(makeImportedScheduleMatch);
const allScheduledMatches = [...scheduledMatches, ...importedScheduleMatches].sort(
  (first, second) =>
    first.matchDateTw.localeCompare(second.matchDateTw) ||
    first.kickoffTw.localeCompare(second.kickoffTw) ||
    first.id.localeCompare(second.id)
);

export const matches: Match[] = allScheduledMatches.map((match) => {
  const result = resultsByMatchId.get(match.id);
  return result ? applyResultAnalysis(match, result) : match;
});

const knockoutRoundExpectedMatches: Record<(typeof knockoutRoundOrder)[number], number> = {
  "32強淘汰賽": 16,
  "16強淘汰賽": 8,
  "8強淘汰賽": 4,
  "4強準決賽": 2,
  "季軍戰": 1,
  "冠軍賽": 1
};

export interface KnockoutMatchView {
  id: string;
  round: string;
  matchDateTw: string;
  kickoffTw: string;
  venue: string;
  homeTeam: TeamCode;
  awayTeam: TeamCode;
  status: Match["status"];
  predictedScore: string;
  finalScore: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winnerTeam: TeamCode | null;
  winnerNote: string;
}

export interface KnockoutRoundView {
  name: (typeof knockoutRoundOrder)[number];
  status: "已完成" | "進行中" | "待開賽" | "待定";
  expectedMatches: number;
  completedMatches: number;
  matches: KnockoutMatchView[];
}

function knockoutWinnerNote(match: Match, winnerTeam: TeamCode | null) {
  if (!match.result) return "模型預估";
  if (!winnerTeam) return "晉級待確認";
  if (match.round === "冠軍賽") return "冠軍";
  if (match.round === "季軍戰") return "季軍";
  if (match.result.homeScore === match.result.awayScore) return "PK / 加時晉級";
  return "晉級";
}

function makeKnockoutMatchView(match: Match): KnockoutMatchView {
  const winnerTeam = match.result ? getKnockoutWinner(match.result) : null;

  return {
    id: match.id,
    round: match.round,
    matchDateTw: match.matchDateTw,
    kickoffTw: match.kickoffTw,
    venue: match.venue,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    status: match.status,
    predictedScore: match.prediction.predictedScore,
    finalScore: match.result?.finalScore ?? null,
    homeScore: match.result?.homeScore ?? null,
    awayScore: match.result?.awayScore ?? null,
    winnerTeam,
    winnerNote: knockoutWinnerNote(match, winnerTeam)
  };
}

function knockoutRoundStatus(matchesInRound: KnockoutMatchView[]): KnockoutRoundView["status"] {
  if (matchesInRound.length === 0) return "待定";
  const completedMatches = matchesInRound.filter((match) => match.status === "final").length;
  if (completedMatches === matchesInRound.length) return "已完成";
  if (completedMatches > 0) return "進行中";
  return "待開賽";
}

export function getKnockoutOverview() {
  const rounds: KnockoutRoundView[] = knockoutRoundOrder.map((roundName) => {
    const matchesInRound = matches
      .filter((match) => isKnockoutRecord(match) && match.round === roundName)
      .sort((first, second) => first.matchDateTw.localeCompare(second.matchDateTw) || first.kickoffTw.localeCompare(second.kickoffTw) || first.id.localeCompare(second.id))
      .map(makeKnockoutMatchView);

    return {
      name: roundName,
      status: knockoutRoundStatus(matchesInRound),
      expectedMatches: knockoutRoundExpectedMatches[roundName],
      completedMatches: matchesInRound.filter((match) => match.status === "final").length,
      matches: matchesInRound
    };
  });

  const currentRound = rounds.find((round) => round.status === "進行中") || rounds.find((round) => round.status === "待開賽") || rounds.find((round) => round.status === "待定") || rounds.at(-1);
  const completedRound = [...rounds].reverse().find((round) => round.matches.length > 0 && round.completedMatches === round.matches.length);
  const completedMatches = rounds.reduce((total, round) => total + round.completedMatches, 0);
  const knownMatches = rounds.reduce((total, round) => total + round.matches.length, 0);

  return {
    rounds,
    currentRound,
    completedRound,
    completedMatches,
    knownMatches,
    totalExpectedMatches: Object.values(knockoutRoundExpectedMatches).reduce((total, count) => total + count, 0)
  };
}

export const editorialNotes: EditorialNote[] = [
  { title: "淘汰賽會保留賽前快照", text: "每場完賽後會把預估比分、實際比分與落差原因存入歷史資料，後續回合仍可回看模型判斷。" },
  { title: "平手完賽要看晉級隊", text: "淘汰賽若正規時間平手，頁面會保留完場比分，並依後續賽程標示 PK 或加時後晉級的一方。" },
  { title: "後段賽程逐輪補齊", text: "8 強、4 強、季軍戰與冠軍賽會隨官方賽程更新逐步出現，不會再用小組賽第三名觀察呈現。" }
];

export const heatItems: EditorialNote[] = [
  { title: "32強：完整落幕", text: "16 場 32 強淘汰賽已完成，勝隊已進入 16 強路線，平手場次會依晉級隊標示結果。" },
  { title: "16強：目前進行中", text: "加拿大、巴拉圭已止步，後續 16 強賽事會決定 8 強完整對戰組合。" },
  { title: "8強：首組對戰成形", text: "法國與摩洛哥已率先進入 8 強對戰，其他席位會隨 16 強結果自動補上。" }
];

const teamStarSourceUrl = "https://xn--fifa-tc5fq65k1ju.tw/news/world-cup-teams-n-stars/";

export const starFocusItems: StarFocusItem[] = [
  {
    id: "ronaldo-portugal-final-dance",
    headline: "葡萄牙：C 羅最後一舞的戰術取捨",
    playerNames: ["Cristiano Ronaldo"],
    teamCodes: ["POR"],
    publishedAt: "2026-01-22",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "焦點在 41 歲 C 羅是否先發、禁區終結與壓迫強度如何平衡，葡萄牙不能只靠情懷排陣。",
    modelHint: "葡萄牙若早早領先，C 羅的禁區威脅會提高大比分機率；若久攻不下，反而要提高和局與低比分權重。",
    tags: ["老將角色", "禁區終結", "葡萄牙"]
  },
  {
    id: "son-korea-la-story",
    headline: "韓國：孫興慜的主場感與轉換速度",
    playerNames: ["Son Heung-min"],
    teamCodes: ["KOR"],
    publishedAt: "2026-01-19",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "孫興慜轉戰洛杉磯後，世界盃在北美進行讓韓國多了熟悉環境的敘事，但真正關鍵仍是反擊第一腳品質。",
    modelHint: "韓國面對控球強隊時，不能只看控球率；孫興慜能否把少量轉換變成射正，會直接影響爆冷比分。",
    tags: ["亞洲焦點", "反擊", "韓國"]
  },
  {
    id: "messi-argentina-miami",
    headline: "阿根廷：梅西在邁阿密主場圈的最後探戈",
    playerNames: ["Lionel Messi"],
    teamCodes: ["ARG"],
    publishedAt: "2026-01-09",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "梅西的體能管理、定位球與最後一傳仍是阿根廷解鎖低位防守的關鍵。",
    modelHint: "阿根廷若遇到防守密集隊，模型需要提高定位球與 1 球小勝劇本，不宜只看牌面壓成大勝。",
    tags: ["衛冕", "定位球", "阿根廷"]
  },
  {
    id: "bellingham-england-pressure",
    headline: "英格蘭：貝林漢姆能否扛住淘汰賽壓力",
    playerNames: ["Jude Bellingham"],
    teamCodes: ["ENG"],
    publishedAt: "2026-01-07",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "英格蘭的上限取決於貝林漢姆在前腰與中場之間的串聯，以及強強對話時的禁區前決策。",
    modelHint: "英格蘭對實力接近的對手時，要把和局與 1 球差放大，避免被明星陣容誤導成穩膽。",
    tags: ["中場核心", "淘汰賽壓力", "英格蘭"]
  },
  {
    id: "vinicius-brazil-wide-threat",
    headline: "巴西：維尼修斯決定邊路爆點上限",
    playerNames: ["Vinicius Jr."],
    teamCodes: ["BRA"],
    publishedAt: "2026-01-06",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "維尼修斯是巴西撕開防線的第一爆點，個人突破能否轉成高品質射門是奪冠盤的重要變數。",
    modelHint: "巴西若邊路對位明顯占優，大球與讓分盤可加權；若對手能限制維尼修斯，比分會更接近。",
    tags: ["邊路爆點", "巴西", "大球觀察"]
  },
  {
    id: "yamal-spain-next-core",
    headline: "西班牙：亞馬爾讓傳控多了直線爆發",
    playerNames: ["Lamine Yamal"],
    teamCodes: ["ESP"],
    publishedAt: "2026-01-05",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "亞馬爾讓西班牙不只靠傳控消耗，也能在右路直接製造一對一與內切威脅。",
    modelHint: "西班牙遇到低位防守時，亞馬爾狀態會影響破門時間；早進球會讓總進球盤快速升溫。",
    tags: ["新星", "傳控升級", "西班牙"]
  },
  {
    id: "mbappe-france-third-star",
    headline: "法國：姆巴佩仍是冠軍盤的速度核心",
    playerNames: ["Kylian Mbappe"],
    teamCodes: ["FRA"],
    publishedAt: "2025-12-26",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "姆巴佩的縱深速度與大賽終結力，讓法國在拉鋸戰中一直保有一擊致命能力。",
    modelHint: "法國即使控球不壓倒對手，也不能低估反擊進球；爆冷模型要特別看對手是否能限制身後空間。",
    tags: ["速度核心", "金靴熱門", "法國"]
  },
  {
    id: "japan-blue-samurai-depth",
    headline: "日本：歐洲化陣容挑戰 8 強門檻",
    playerNames: ["日本歐洲旅外核心"],
    teamCodes: ["JPN"],
    publishedAt: "2025-12-26",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "日本的優勢不只是一兩名球星，而是旅外球員深度、邊路節奏與團隊壓迫同步性。",
    modelHint: "日本面對傳統強隊時，模型不能只看歷史名氣；若射正效率維持，1 球差與爆冷比分要提高權重。",
    tags: ["亞洲焦點", "旅外深度", "日本"]
  },
  {
    id: "haaland-norway-first-world-cup",
    headline: "挪威：哈蘭德首屆世界盃的冷門變數",
    playerNames: ["Erling Haaland", "Martin Odegaard"],
    teamCodes: ["NOR"],
    publishedAt: "2025-12-18",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "哈蘭德與厄德高的連線讓挪威即使整體控球不占優，也能靠少數機會打出高威脅。",
    modelHint: "挪威對熱門隊時，爆冷比分應優先看 0-1、1-2 這類低控球高效率劇本。",
    tags: ["爆冷門", "中鋒效率", "挪威"]
  },
  {
    id: "global-stars-generation-shift",
    headline: "世代交替：梅西、C 羅、哈蘭德同場敘事",
    playerNames: ["Lionel Messi", "Cristiano Ronaldo", "Erling Haaland"],
    teamCodes: ["ARG", "POR", "NOR"],
    publishedAt: "2025-11-08",
    sourceLabel: "fifa世界杯.tw 球隊與球星",
    sourceUrl: teamStarSourceUrl,
    angle: "本屆焦點橫跨傳奇謝幕與新世代登場，球迷情緒很強，但預測仍要回到角色、體能與球隊支援度。",
    modelHint: "人氣球星會推高市場熱度，盤口判斷需額外檢查是否過熱，尤其是高齡球星連戰體能。",
    tags: ["世代交替", "市場熱度", "球星盤"]
  }
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
