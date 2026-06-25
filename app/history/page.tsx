import type { Metadata } from "next";
import Link from "next/link";
import { getTeam, matchHistory } from "@/lib/data";
import { scoreWithSpaces } from "@/lib/format";
import { evaluationLabel, getModelPerformance } from "@/lib/history";

export const metadata: Metadata = {
  title: "模型戰績",
  description: "查看 AI 看世足歷史預測、實際比分、命中率與賽後落差分析。"
};

export default function HistoryPage() {
  const performance = getModelPerformance(matchHistory);
  const records = [...matchHistory].reverse();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">Model Performance</span>
        <h1>模型戰績</h1>
        <p>保存每場賽前預測快照、完場比分與落差原因，作為後續淘汰賽模型校正依據。</p>
      </section>

      <section className="history-metrics" aria-label="模型累積表現">
        <div className="metric">
          <span>已驗證賽事</span>
          <strong>{performance.completedMatches}</strong>
        </div>
        <div className="metric">
          <span>勝負方向命中率</span>
          <strong>{performance.resultAccuracy.toFixed(1)}%</strong>
        </div>
        <div className="metric">
          <span>精確比分命中率</span>
          <strong>{performance.exactScoreRate.toFixed(1)}%</strong>
        </div>
        <div className="metric">
          <span>平均比分距離</span>
          <strong>{performance.averageScoreDistance.toFixed(2)}</strong>
        </div>
      </section>

      <section className="history-list" aria-label="歷史預測紀錄">
        {records.length ? (
          records.map((record) => {
            const home = getTeam(record.homeTeam);
            const away = getTeam(record.awayTeam);

            return (
              <article className="history-row" key={record.matchId}>
                <div className="history-row__meta">
                  <span>
                    {record.matchDateTw} · {record.round}
                  </span>
                  <span className={`evaluation-badge evaluation-badge--${record.evaluation.grade}`}>
                    {evaluationLabel(record.evaluation.grade)}
                  </span>
                </div>
                <div className="history-row__main">
                  <div>
                    <h2>
                      {home.nameZh} vs {away.nameZh}
                    </h2>
                    <p>{record.analysisReasons[0]}</p>
                  </div>
                  <div className="history-score">
                    <span>預估 {scoreWithSpaces(record.predictionSnapshot.predictedScore)}</span>
                    <strong>{scoreWithSpaces(record.finalScore)}</strong>
                    <span>實際比分</span>
                  </div>
                </div>
                <Link className="secondary-action" href={`/matches/${record.matchId}`}>
                  查看賽後分析
                </Link>
              </article>
            );
          })
        ) : (
          <div className="empty-state">
            <h2>尚無完場紀錄</h2>
            <p>賽事完場後，系統會自動抓取比分與統計並加入這裡。</p>
          </div>
        )}
      </section>
    </main>
  );
}
