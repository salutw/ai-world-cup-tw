import Link from "next/link";
import { getTeam } from "@/lib/data";
import { scoreWithSpaces } from "@/lib/format";
import { evaluationLabel } from "@/lib/history";
import type { Match } from "@/lib/types";
import { OddsBox } from "./OddsBox";
import { ProbabilityBars } from "./ProbabilityBars";
import { TeamBadge } from "./TeamBadge";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const result = match.result;

  return (
    <article className="match-card">
      <div className="match-card__meta">
        <span>{match.kickoffTw}</span>
        <span>
          {match.group}｜{match.round}
        </span>
      </div>

      <div className="match-card__teams">
        <TeamBadge code={match.homeTeam} />
        <span className="versus">VS</span>
        <TeamBadge code={match.awayTeam} />
      </div>

      <div className="score-summary">
        <div className={result ? "score-box score-box--final" : "score-box"}>
          <small>{result ? "完場" : "預估"}</small>
          <strong>{scoreWithSpaces(result?.finalScore ?? match.prediction.predictedScore)}</strong>
        </div>
        <div>
          {result ? (
            <p className="result-comparison">
              模型預估 {scoreWithSpaces(result.predictionSnapshot.predictedScore)}
              <span className={`evaluation-badge evaluation-badge--${result.evaluation.grade}`}>
                {evaluationLabel(result.evaluation.grade)}
              </span>
            </p>
          ) : (
            <p>{match.summary}</p>
          )}
        </div>
      </div>

      <ProbabilityBars
        items={[
          { label: home.nameZh, value: match.prediction.probabilities.homeWin, color: "var(--green)" },
          { label: "和局", value: match.prediction.probabilities.draw, color: "var(--gold)" },
          { label: away.nameZh, value: match.prediction.probabilities.awayWin, color: "var(--blue)" }
        ]}
      />

      <OddsBox match={match} />

      <div className="card-footer">
        <div className="tag-row">
          {match.attentionTags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link className="secondary-action" href={`/matches/${match.id}`}>
          分析
        </Link>
      </div>
    </article>
  );
}
