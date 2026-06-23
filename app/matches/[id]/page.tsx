import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { OddsBox } from "@/components/OddsBox";
import { ProbabilityBars } from "@/components/ProbabilityBars";
import { TeamBadge } from "@/components/TeamBadge";
import { getMatch, getTeam, matches, scorelineGoalLimit } from "@/lib/data";
import { scoreWithSpaces } from "@/lib/format";

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
            <span>模型預估比分</span>
            <strong>{scoreWithSpaces(match.prediction.predictedScore)}</strong>
          </div>
        </section>

        <div className="detail-grid">
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
            <h2>晉級影響</h2>
            <div className="impact-row">
              <span>{home.nameZh}贏球</span>
              <strong>{match.qualificationImpact.homeWin}</strong>
            </div>
            <div className="impact-row">
              <span>雙方平手</span>
              <strong>{match.qualificationImpact.draw}</strong>
            </div>
            <div className="impact-row">
              <span>{away.nameZh}贏球</span>
              <strong>{match.qualificationImpact.awayWin}</strong>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
