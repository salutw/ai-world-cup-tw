import type { Metadata } from "next";
import { TeamBadge } from "@/components/TeamBadge";
import { getTeam, getThirdPlaceCandidates, groups } from "@/lib/data";

export const metadata: Metadata = {
  title: "小組晉級",
  description: "2026 世界盃 A 到 L 組最新小組積分、晉級狀態與最佳第三名觀察。"
};

export default function GroupsPage() {
  const thirdPlaceCandidates = getThirdPlaceCandidates();

  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">Group Tracker</span>
        <h1>小組晉級</h1>
        <p>小組積分會依完賽紀錄自動重算，狀態同步標示是否已晉級淘汰賽；第三名排序依積分、淨勝球與進球數排列。</p>
      </div>

      <div className="group-grid">
        {groups.map((group) => (
          <section className="group-panel" key={group.name}>
            <div className="group-title">
              <div>
                <span className="eyebrow">
                  {group.name}｜更新 {group.sourceUpdatedAt}
                </span>
                <h2>{group.note}</h2>
              </div>
            </div>
            <div className="table-wrap">
              <table className="group-table">
                <thead>
                  <tr>
                    <th>球隊</th>
                    <th>賽</th>
                    <th>勝</th>
                    <th>和</th>
                    <th>敗</th>
                    <th>淨勝</th>
                    <th>分</th>
                    <th>狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => {
                    const difference = row.goalsFor - row.goalsAgainst;
                    return (
                      <tr key={`${group.name}-${row.teamCode}`}>
                        <td>
                          <TeamBadge code={row.teamCode} compact />
                        </td>
                        <td>{row.played}</td>
                        <td>{row.wins}</td>
                        <td>{row.draws}</td>
                        <td>{row.losses}</td>
                        <td>{difference > 0 ? `+${difference}` : difference}</td>
                        <td>
                          <strong>{row.points}</strong>
                        </td>
                        <td>{row.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="third-place-panel">
        <div className="section-toolbar compact">
          <div>
            <span className="eyebrow">Third Place Watch</span>
            <h2>最佳第三名觀察</h2>
          </div>
          <p className="muted-copy">48 隊賽制下，第三名比較會看積分、淨勝球與進球數；公平競賽分與 FIFA 排名會在完全同分時才進一步比較。</p>
        </div>
        <div className="third-list">
          {thirdPlaceCandidates.map((row) => {
            const team = getTeam(row.teamCode);
            const difference = row.goalsFor - row.goalsAgainst;
            return (
              <div className="third-item" key={row.teamCode}>
                <strong>{team.nameZh}</strong>
                <span>
                  {row.points} 分｜淨勝 {difference > 0 ? `+${difference}` : difference}｜進球 {row.goalsFor}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
