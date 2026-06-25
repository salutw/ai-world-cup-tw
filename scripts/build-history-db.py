import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HISTORY_PATH = ROOT / "data" / "match-history.json"
DATABASE_PATH = ROOT / "data" / "world-cup-history.sqlite"

history = json.loads(HISTORY_PATH.read_text(encoding="utf-8"))
connection = sqlite3.connect(DATABASE_PATH)

with connection:
    connection.executescript(
        """
        CREATE TABLE IF NOT EXISTS metadata (
          key TEXT PRIMARY KEY,
          value TEXT
        );

        CREATE TABLE IF NOT EXISTS match_history (
          match_id TEXT PRIMARY KEY,
          espn_event_id TEXT UNIQUE,
          group_name TEXT,
          round_name TEXT,
          match_date_tw TEXT,
          kickoff_tw TEXT,
          home_team TEXT,
          away_team TEXT,
          predicted_score TEXT,
          final_score TEXT,
          home_score INTEGER,
          away_score INTEGER,
          grade TEXT,
          exact_score INTEGER,
          result_correct INTEGER,
          home_goal_error INTEGER,
          away_goal_error INTEGER,
          total_goal_error INTEGER,
          score_distance INTEGER,
          model_version TEXT,
          model_updated_at TEXT,
          completed_at TEXT,
          recorded_at TEXT,
          source_url TEXT
        );

        CREATE TABLE IF NOT EXISTS match_statistics (
          match_id TEXT,
          side TEXT,
          team_code TEXT,
          possession_pct REAL,
          total_shots INTEGER,
          shots_on_target INTEGER,
          corners INTEGER,
          saves INTEGER,
          yellow_cards INTEGER,
          red_cards INTEGER,
          PRIMARY KEY (match_id, side),
          FOREIGN KEY (match_id) REFERENCES match_history(match_id)
        );

        CREATE TABLE IF NOT EXISTS analysis_reasons (
          match_id TEXT,
          reason_order INTEGER,
          reason TEXT,
          PRIMARY KEY (match_id, reason_order),
          FOREIGN KEY (match_id) REFERENCES match_history(match_id)
        );
        """
    )
    connection.execute("DELETE FROM metadata")
    connection.executemany(
        "INSERT INTO metadata(key, value) VALUES (?, ?)",
        [
            ("schema_version", str(history["schemaVersion"])),
            ("updated_at", history["updatedAt"] or ""),
            ("source", history["source"]),
        ],
    )

    for record in history["records"]:
        prediction = record["predictionSnapshot"]
        evaluation = record["evaluation"]
        connection.execute(
            """
            INSERT INTO match_history (
              match_id, espn_event_id, group_name, round_name, match_date_tw, kickoff_tw,
              home_team, away_team, predicted_score, final_score, home_score, away_score,
              grade, exact_score, result_correct, home_goal_error, away_goal_error,
              total_goal_error, score_distance, model_version, model_updated_at,
              completed_at, recorded_at, source_url
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            ON CONFLICT(match_id) DO UPDATE SET
              final_score=excluded.final_score,
              home_score=excluded.home_score,
              away_score=excluded.away_score,
              grade=excluded.grade,
              exact_score=excluded.exact_score,
              result_correct=excluded.result_correct,
              home_goal_error=excluded.home_goal_error,
              away_goal_error=excluded.away_goal_error,
              total_goal_error=excluded.total_goal_error,
              score_distance=excluded.score_distance,
              completed_at=excluded.completed_at,
              source_url=excluded.source_url
            """,
            (
                record["matchId"],
                record["espnEventId"],
                record["group"],
                record["round"],
                record["matchDateTw"],
                record["kickoffTw"],
                record["homeTeam"],
                record["awayTeam"],
                prediction["predictedScore"],
                record["finalScore"],
                record["homeScore"],
                record["awayScore"],
                evaluation["grade"],
                int(evaluation["exactScore"]),
                int(evaluation["resultCorrect"]),
                evaluation["homeGoalError"],
                evaluation["awayGoalError"],
                evaluation["totalGoalError"],
                evaluation["scoreDistance"],
                prediction["modelVersion"],
                prediction["modelUpdatedAt"],
                record["completedAt"],
                record["recordedAt"],
                record["source"]["eventUrl"],
            ),
        )

        connection.execute("DELETE FROM match_statistics WHERE match_id = ?", (record["matchId"],))
        for side, team_code in (("home", record["homeTeam"]), ("away", record["awayTeam"])):
            stats = record["statistics"][side]
            connection.execute(
                """
                INSERT INTO match_statistics VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    record["matchId"],
                    side,
                    team_code,
                    stats["possessionPct"],
                    stats["totalShots"],
                    stats["shotsOnTarget"],
                    stats["corners"],
                    stats["saves"],
                    stats["yellowCards"],
                    stats["redCards"],
                ),
            )

        connection.execute("DELETE FROM analysis_reasons WHERE match_id = ?", (record["matchId"],))
        connection.executemany(
            "INSERT INTO analysis_reasons VALUES (?, ?, ?)",
            [
                (record["matchId"], index, reason)
                for index, reason in enumerate(record["analysisReasons"], start=1)
            ],
        )

connection.close()
print(f"Synced {len(history['records'])} records to {DATABASE_PATH.name}.")
