import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const catalogArgument = process.argv.find((argument) => !argument.startsWith("--") && argument !== process.argv[0] && argument !== process.argv[1]);
const catalogPath = path.join(root, catalogArgument || "out/api/matches");
const schedulePath = path.join(root, "data/match-schedule.json");

function buildSnapshot(prediction) {
  return {
    predictedScore: prediction.predictedScore,
    probabilities: prediction.probabilities,
    confidence: prediction.confidence,
    modelVersion: prediction.modelVersion,
    modelUpdatedAt: prediction.modelUpdatedAt
  };
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const schedule = JSON.parse(await readFile(schedulePath, "utf8"));
const matches = catalog.data || [];
const matchById = new Map(matches.map((match) => [match.id, match]));
const matchByEventId = new Map(matches.filter((match) => match.espnEventId).map((match) => [String(match.espnEventId), match]));

let savedCount = 0;
const records = (schedule.records || []).map((record) => {
  if (record.predictionSnapshot?.predictedScore) return record;
  if (record.status !== "scheduled") return record;

  const match = matchById.get(record.id) || matchByEventId.get(String(record.espnEventId));
  if (!match?.prediction?.predictedScore) return record;

  savedCount += 1;
  return {
    ...record,
    predictionSnapshot: buildSnapshot(match.prediction)
  };
});

if (savedCount === 0) {
  console.log("No new match prediction snapshots.");
  process.exit(0);
}

const nextSchedule = {
  ...schedule,
  updatedAt: new Date().toISOString(),
  records
};

await writeFile(schedulePath, `${JSON.stringify(nextSchedule, null, 2)}\n`, "utf8");
console.log(`Saved prediction snapshots for ${savedCount} schedule records.`);
