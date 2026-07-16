import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const schedulePath = path.join(root, "data/match-schedule.json");
const scoreboardBase = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const taiwanTimeZone = "Asia/Taipei";
const defaultWindowDays = 28;

const knownTeamCodes = new Set([
  "MEX",
  "RSA",
  "KOR",
  "CZE",
  "CAN",
  "BIH",
  "QAT",
  "SUI",
  "BRA",
  "MAR",
  "HAI",
  "SCO",
  "USA",
  "PAR",
  "AUS",
  "TUR",
  "GER",
  "CUW",
  "CIV",
  "ECU",
  "NED",
  "JPN",
  "SWE",
  "TUN",
  "BEL",
  "EGY",
  "IRN",
  "NZL",
  "ESP",
  "CPV",
  "URU",
  "KSA",
  "NOR",
  "FRA",
  "SEN",
  "IRQ",
  "ARG",
  "AUT",
  "JOR",
  "ALG",
  "COL",
  "COD",
  "POR",
  "UZB",
  "ENG",
  "GHA",
  "PAN",
  "CRO"
]);

function argumentValue(name) {
  const argument = process.argv.find((item) => item.startsWith(`${name}=`));
  return argument?.split("=").slice(1).join("=");
}

function addDays(dateKey, days) {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function compactDate(dateKey) {
  return dateKey.replaceAll("-", "");
}

function taiwanDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: taiwanTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function taiwanDateTimeParts(isoDate) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: taiwanTimeZone,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .formatToParts(new Date(isoDate))
    .reduce((lookup, part) => {
      lookup[part.type] = part.value;
      return lookup;
    }, {});

  return {
    month: parts.month,
    day: parts.day,
    hour: parts.hour === "24" ? "00" : parts.hour,
    minute: parts.minute
  };
}

function kickoffTw(isoDate) {
  const parts = taiwanDateTimeParts(isoDate);
  return `${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`;
}

function roundLabel(slug) {
  if (slug === "group-stage") return "小組賽";
  if (slug === "round-of-32") return "32強淘汰賽";
  if (slug === "round-of-16") return "16強淘汰賽";
  if (slug === "quarterfinals" || slug === "quarter-finals") return "8強淘汰賽";
  if (slug === "semifinals" || slug === "semi-finals") return "4強準決賽";
  if (slug === "third-place-playoff" || slug === "3rd-place-match") return "季軍戰";
  if (slug === "final") return "冠軍賽";
  return "淘汰賽";
}

function normalizeStatus(event) {
  const type = event.competitions?.[0]?.status?.type ?? event.status?.type;
  if (type?.completed) return "final";
  if (type?.state === "in") return "live";
  return "scheduled";
}

function scheduleId(homeTeam, awayTeam, eventId) {
  return `${homeTeam.toLowerCase()}-${awayTeam.toLowerCase()}-${eventId}`;
}

function materialSnapshot(record) {
  return {
    espnEventId: record.espnEventId,
    group: record.group,
    round: record.round,
    seasonSlug: record.seasonSlug,
    matchDateTw: record.matchDateTw,
    kickoffTw: record.kickoffTw,
    kickoffUtc: record.kickoffUtc,
    venue: record.venue,
    homeTeam: record.homeTeam,
    awayTeam: record.awayTeam,
    status: record.status
  };
}

function hasMaterialChange(existing, nextRecord) {
  if (!existing) return true;
  return JSON.stringify(materialSnapshot(existing)) !== JSON.stringify(materialSnapshot(nextRecord));
}

async function readSchedule() {
  try {
    return JSON.parse(await readFile(schedulePath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return {
      schemaVersion: 1,
      updatedAt: null,
      source: "ESPN FIFA World Cup scoreboard",
      records: []
    };
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "ai-world-cup-tw-schedule-updater/1.0" }
      });
      if (!response.ok) throw new Error(`Fetch failed ${response.status}: ${url}`);
      return response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        console.warn(`Fetch attempt ${attempt}/${attempts} failed: ${url}`);
        await sleep(1500 * attempt);
      }
    }
  }

  throw lastError;
}

function eventRecord(event, fetchedAt) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const home = competitors.find((item) => item.homeAway === "home");
  const away = competitors.find((item) => item.homeAway === "away");
  const homeTeam = home?.team?.abbreviation;
  const awayTeam = away?.team?.abbreviation;

  if (!knownTeamCodes.has(homeTeam) || !knownTeamCodes.has(awayTeam)) {
    return null;
  }

  const seasonSlug = event.season?.slug || "knockout";
  const isoDate = event.date;

  return {
    id: scheduleId(homeTeam, awayTeam, event.id),
    espnEventId: String(event.id),
    group: seasonSlug === "group-stage" ? "小組賽" : "淘汰賽",
    round: roundLabel(seasonSlug),
    seasonSlug,
    matchDateTw: taiwanDateKey(new Date(isoDate)),
    kickoffTw: kickoffTw(isoDate),
    kickoffUtc: isoDate,
    venue: competition?.venue?.fullName || "待公布球場",
    homeTeam,
    awayTeam,
    status: normalizeStatus(event),
    source: {
      name: "ESPN",
      eventUrl: `https://www.espn.com/soccer/match/_/gameId/${event.id}`,
      fetchedAt
    }
  };
}

const todayTw = taiwanDateKey();
const startDate = argumentValue("--start") || process.env.SCHEDULE_START_TW || addDays(todayTw, -7);
const windowDays = Number(argumentValue("--days") || process.env.SCHEDULE_WINDOW_DAYS || defaultWindowDays);
const endDate = argumentValue("--end") || process.env.SCHEDULE_END_TW || addDays(todayTw, windowDays);
const queryStart = addDays(startDate, -1);
const queryEnd = addDays(endDate, 1);
const fetchedAt = new Date().toISOString();

const schedule = await readSchedule();
const recordsByEvent = new Map((schedule.records || []).map((record) => [record.espnEventId, record]));
const eventsById = new Map();
let skippedUnresolved = 0;

for (let date = queryStart; date <= queryEnd; date = addDays(date, 1)) {
  const scoreboard = await fetchJson(`${scoreboardBase}/scoreboard?dates=${compactDate(date)}`);
  for (const event of scoreboard.events || []) {
    eventsById.set(String(event.id), event);
  }
}

for (const event of eventsById.values()) {
  const record = eventRecord(event, fetchedAt);
  if (!record) {
    skippedUnresolved += 1;
    continue;
  }

  const existing = recordsByEvent.get(record.espnEventId);
  const source = hasMaterialChange(existing, record) ? record.source : existing.source || record.source;
  recordsByEvent.set(record.espnEventId, {
    ...existing,
    ...record,
    id: existing?.id || record.id,
    source,
    firstSeenAt: existing?.firstSeenAt || fetchedAt
  });
}

const records = Array.from(recordsByEvent.values()).sort(
  (first, second) =>
    first.matchDateTw.localeCompare(second.matchDateTw) ||
    first.kickoffTw.localeCompare(second.kickoffTw) ||
    first.id.localeCompare(second.id)
);

const nextScheduleCandidate = {
  schemaVersion: 1,
  updatedAt: schedule.updatedAt ?? null,
  source: "ESPN FIFA World Cup scoreboard",
  records
};
const currentSerialized = `${JSON.stringify(schedule, null, 2)}\n`;
let nextSerialized = `${JSON.stringify(nextScheduleCandidate, null, 2)}\n`;

if (currentSerialized !== nextSerialized) {
  nextSerialized = `${JSON.stringify({ ...nextScheduleCandidate, updatedAt: fetchedAt }, null, 2)}\n`;
  await writeFile(schedulePath, nextSerialized, "utf8");
  console.log(`Updated schedule with ${records.length} resolved matches. Skipped ${skippedUnresolved} unresolved placeholders.`);
} else {
  console.log(`No schedule changes. Resolved matches: ${records.length}. Skipped ${skippedUnresolved} unresolved placeholders.`);
}
