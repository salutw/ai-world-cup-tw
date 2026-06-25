import Link from "next/link";
import { MatchBoard } from "@/components/MatchBoard";
import { getFeaturedMatch, getTeam, getTodayBoard, heatItems, editorialNotes, matches } from "@/lib/data";
import { scoreWithSpaces } from "@/lib/format";

export default function HomePage() {
  const todayBoard = getTodayBoard();
  const todayMatches = todayBoard.matches;
  const featured = todayMatches[0] ?? getFeaturedMatch();
  const home = getTeam(featured.homeTeam);
  const away = getTeam(featured.awayTeam);

  return (
    <main>
      <section className="hero-dashboard" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">2026 世界盃賽前研究站</span>
            <h1 id="hero-title">AI 看世足</h1>
            <p>用白話看懂盤口、市場訊號、歷史戰績與模型預估比分。</p>
          </div>
          <div className="hero-panel" aria-label="今日焦點摘要">
            <span className="panel-label">焦點賽事</span>
            <h2>
              {home.nameZh} vs {away.nameZh}
            </h2>
            <div className="hero-score">{scoreWithSpaces(featured.prediction.predictedScore)}</div>
            <p>{featured.summary}</p>
            <Link className="primary-action" href={`/matches/${featured.id}`}>
              看完整分析
            </Link>
          </div>
        </div>
      </section>

      <section className="status-strip" aria-label="資料狀態">
        <div>
          <span className="strip-label">資料狀態</span>
          <strong>正式版骨架</strong>
          <small>目前使用 seed data，欄位已可接資料庫與後台。</small>
        </div>
        <div>
          <span className="strip-label">倍率更新</span>
          <strong>{featured.odds.updatedAt}</strong>
          <small>台灣運彩倍率僅作市場參考。</small>
        </div>
        <div>
          <span className="strip-label">模型版本</span>
          <strong>{featured.prediction.modelVersion}</strong>
          <small>Elo、近況、攻防強度與盤口隱含機率。</small>
        </div>
      </section>

      <section className="page-section">
        <MatchBoard
          initialDateTw={todayBoard.boardDateTw}
          matches={matches}
          todayDateTw={todayBoard.todayDateTw}
        />

        <div className="dashboard-columns">
          <section className="content-panel" aria-labelledby="advance-title">
            <div className="section-toolbar compact">
              <div>
                <span className="eyebrow">Qualification Heat</span>
                <h2 id="advance-title">小組晉級熱區</h2>
              </div>
            </div>
            <div className="stack-list">
              {heatItems.map((item) => (
                <article className="text-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-panel" aria-labelledby="updates-title">
            <div className="section-toolbar compact">
              <div>
                <span className="eyebrow">Model Notes</span>
                <h2 id="updates-title">最新模型觀察</h2>
              </div>
            </div>
            <div className="stack-list">
              {editorialNotes.map((item) => (
                <article className="text-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
