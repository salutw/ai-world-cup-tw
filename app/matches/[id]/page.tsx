import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { OddsBox } from "@/components/OddsBox";
import { ProbabilityBars } from "@/components/ProbabilityBars";
import { TeamBadge } from "@/components/TeamBadge";
import { getMatch, getTeam, matches, scorelineGoalLimit } from "@/lib/data";
import { scoreWithSpaces } from "@/lib/format";
import { evaluationLabel } from "@/lib/history";
import type { Match, Team } from "@/lib/types";

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

function formatScorelineProbability(probability: number) {
  if (probability > 0 && probability < 0.1) return "<0.1%";
  return `${probability.toFixed(1)}%`;
}

function getScorelineBarValue(probability: number) {
  return Math.max(0.8, Math.min(100, probability * 6));
}

function formatStat(value: number | null, suffix = "") {
  return value == null ? "-" : `${value}${suffix}`;
}

function getImpactRows(match: Match, home: Team, away: Team) {
  if (match.result) {
    return [
      { label: "晉級結果", value: match.qualificationImpact.homeWin },
      { label: "模型落差", value: match.qualificationImpact.draw },
      { label: "後續觀察", value: match.qualificationImpact.awayWin }
    ];
  }

  return [
    { label: `${home.nameZh}贏球`, value: match.qualificationImpact.homeWin },
    { label: "雙方平手", value: match.qualificationImpact.draw },
    { label: `${away.nameZh}贏球`, value: match.qualificationImpact.awayWin }
  ];
}

export function generateStaticParams() {
  return matches.map((match) => ({ id: match.id }));
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const match = getMatch(id);
  if (!match) return {};
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);

  return {
    title: `${home.nameZh} vs ${away.nameZh} 單場分析`,
    description: `${home.nameZh} vs ${away.nameZh} 的台灣運彩倍率、模型預估比分、勝和負機率與晉級影響。`
  };
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = getMatch(id);
  if (!match) notFound();

  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);
  const result = match.result;
  const impactRows = getImpactRows(match, home, away);

  return (
    <main className="page-shell">
      <article className="match-detail">
        <section className="match-hero">
          <div>
            <span className="eyebrow">
              {match.group}｜{match.kickoffTw}｜{match.venue}
            </span>
            <h1>
              {home.nameZh} vs {away.nameZh}
            </h1>
            <p>{match.summary}</p>
            <div className="tag-row">
              <span className="confidence">模型信心：{match.prediction.confidence}</span>
              {match.attentionTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="score-callout">
            <span>{result ? "完場比分" : "模型預估比分"}</span>
            <strong>{scoreWithSpaces(result?.finalScore ?? match.prediction.predictedScore)}</strong>
            {result ? <small>模型預估 {scoreWithSpaces(result.predictionSnapshot.predictedScore)}</small> : null}
          </div>
        </section>

        <div className="detail-grid">
          {result ? (
            <section className="detail-panel detail-panel--wide postmatch-panel">
              <div className="panel-title-row">
                <div>
                  <span className="eyebrow">Post-match Review</span>
                  <h2>賽後驗證</h2>
                </div>
                <span className={`evaluation-badge evaluation-badge--${result.evaluation.grade}`}>
                  {evaluationLabel(result.evaluation.grade)}
                </span>
              </div>
              <div className="metric-grid postmatch-metrics">
                <div className="metric">
                  <span>模型預估</span>
                  <strong>{scoreWithSpaces(result.predictionSnapshot.predictedScore)}</strong>
                </div>
                <div className="metric">
                  <span>實際比分</span>
                  <strong>{scoreWithSpaces(result.finalScore)}</strong>
                </div>
                <div className="metric">
                  <span>比分距離</span>
                  <strong>{result.evaluation.scoreDistance}</strong>
                </div>
              </div>
              <div className="postmatch-analysis">
                <div>
                  <h3>落差原因</h3>
                  <ul className="factor-list">
                    {result.analysisReasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>完場數據</h3>
                  <div className="match-stat-grid">
                    <span>球隊</span>
                    <strong>{home.nameZh}</strong>
                    <strong>{away.nameZh}</strong>
                    <span>射門</span>
                    <strong>{formatStat(result.statistics.home.totalShots)}</strong>
                    <strong>{formatStat(result.statistics.away.totalShots)}</strong>
                    <span>射正</span>
                    <strong>{formatStat(result.statistics.home.shotsOnTarget)}</strong>
                    <strong>{formatStat(result.statistics.away.shotsOnTarget)}</strong>
                    <span>控球率</span>
                    <strong>{formatStat(result.statistics.home.possessionPct, "%")}</strong>
                    <strong>{formatStat(result.statistics.away.possessionPct, "%")}</strong>
                  </div>
                </div>
              </div>
              <p className="muted-copy">
                賽果與完場統計來源：{result.source.name}。此筆預測快照已存入歷史資料庫，不會被後續模型更新覆蓋。
              </p>
            </section>
          ) : null}

          <section className="detail-panel">
            <h2>一眼看懂</h2>
            <div className="metric-grid">
              <div className="metric">
                <span>{home.nameZh}勝率</span>
                <strong>{match.prediction.probabilities.homeWin}%</strong>
              </div>
              <div className="metric">
                <span>和局機率</span>
                <strong>{match.prediction.probabilities.draw}%</strong>
              </div>
              <div className="metric">
                <span>{away.nameZh}勝率</span>
                <strong>{match.prediction.probabilities.awayWin}%</strong>
              </div>
            </div>
            <ProbabilityBars
              items={[
                { label: "大球傾向", value: match.prediction.probabilities.over, color: "var(--red)" },
                { label: "雙方進球", value: match.prediction.probabilities.bothTeamsToScore, color: "var(--cyan)" }
              ]}
            />
          </section>

          <section className="detail-panel">
            <h2>台灣運彩倍率</h2>
            <OddsBox match={match} includeTotals />
            <p className="muted-copy">更新時間：{match.odds.updatedAt}。倍率只作市場訊號參考。</p>
          </section>

          <section className="detail-panel">
            <h2>白話解讀</h2>
            <div className="analysis-copy">
              {match.plainLanguageAnalysis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="detail-panel detail-panel--wide">
            <div className="panel-title-row">
              <h2>最可能比分</h2>
              <span>0-{scorelineGoalLimit} 球</span>
            </div>
            <div className="scoreline-list scoreline-list--expanded">
              {match.prediction.topScorelines.map((scoreline) => (
                <div className="scoreline-row" key={scoreline.score}>
                  <span>{scoreline.score}</span>
                  <span className="bar-track" aria-hidden="true">
                    <span
                      className="bar-fill"
                      style={{
                        "--bar-value": getScorelineBarValue(scoreline.probability),
                        "--bar-color": "var(--green)"
                      } as CSSProperties}
                    />
                  </span>
                  <strong>{formatScorelineProbability(scoreline.probability)}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <h2>關鍵因素</h2>
            <ul className="factor-list">
              {match.keyFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </section>

          <section className="detail-panel">
            <h2>歷史與近況</h2>
            <p>{match.historyNote}</p>
            <div className="info-row">
              <span>
                <TeamBadge code={match.homeTeam} compact /> Elo
              </span>
              <strong>{home.eloRating}</strong>
            </div>
            <div className="info-row">
              <span>
                <TeamBadge code={match.awayTeam} compact /> Elo
              </span>
              <strong>{away.eloRating}</strong>
            </div>
          </section>

          <section className="detail-panel detail-panel--wide">
            <h2>{result ? "賽後晉級影響" : "晉級影響"}</h2>
            {impactRows.map((row) => (
              <div className="impact-row" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
