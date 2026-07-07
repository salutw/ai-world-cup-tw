import { HomeDashboard } from "@/components/HomeDashboard";
import { editorialNotes, getTodayBoard, heatItems, matches, teams } from "@/lib/data";

export default function HomePage() {
  const todayBoard = getTodayBoard();
  const teamNames = Object.fromEntries(Object.values(teams).map((team) => [team.code, team.nameZh]));

  return (
    <main>
      <HomeDashboard
        initialBoardDateTw={todayBoard.boardDateTw}
        initialTodayDateTw={todayBoard.todayDateTw}
        matches={matches}
        teamNames={teamNames}
      >
        <div className="dashboard-columns">
          <section className="content-panel" aria-labelledby="advance-title">
            <div className="section-toolbar compact">
              <div>
                <span className="eyebrow">Knockout Heat</span>
                <h2 id="advance-title">淘汰賽熱點</h2>
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
      </HomeDashboard>
    </main>
  );
}
