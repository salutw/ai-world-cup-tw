import type { Metadata } from "next";
import Link from "next/link";
import { TeamBadge } from "@/components/TeamBadge";
import { getKnockoutOverview, groups, type KnockoutMatchView, type KnockoutRoundView } from "@/lib/data";

export const metadata: Metadata = {
  title: "晉級戰況",
  description: "2026 世界盃 32 強到冠軍賽的淘汰賽戰況、小組賽最終排名與晉級路線。"
};

function scoreValue(match: KnockoutMatchView, side: "home" | "away") {
  const score = side === "home" ? match.homeScore : match.awayScore;
  return score === null ? "-" : score;
}

function statusClass(status: KnockoutRoundView["status"]) {
  if (status === "已完成") return "is-complete";
  if (status === "進行中") return "is-live";
  if (status === "待開賽") return "is-upcoming";
  return "is-empty";
}

function matchStatusLabel(match: KnockoutMatchView) {
  return match.status === "final" ? "完賽" : "未開賽";
}

function matchResultText(match: KnockoutMatchView) {
  return match.finalScore ? `完場 ${match.finalScore}` : `模型預估 ${match.predictedScore}`;
}

export default function GroupsPage() {
  const overview = getKnockoutOverview();
  const currentRound = overview.currentRound;
  const completedRound = overview.completedRound;
  const remainingMatches = overview.totalExpectedMatches - overview.completedMatches;

  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">Knockout Tracker</span>
        <h1>晉級戰況</h1>
        <p>小組賽已結束，現在進入淘汰賽。這裡會依完賽紀錄與最新賽程，自動整理 32 強、16 強、8 強、4 強、季軍戰與冠軍賽。</p>
      </div>

      <section className="stage-summary-grid" aria-label="淘汰賽摘要">
        <div>
          <span>目前階段</span>
          <strong>{currentRound?.name ?? "待更新"}</strong>
          <small>{currentRound?.status ?? "等待賽程"}</small>
        </div>
        <div>
          <span>最新完成</span>
          <strong>{completedRound?.name ?? "尚未完成"}</strong>
          <small>{overview.completedMatches} 場淘汰賽已完賽</small>
        </div>
        <div>
          <span>後續賽程</span>
          <strong>{remainingMatches}</strong>
          <small>場比賽通往冠軍賽</small>
        </div>
      </section>

      <section className="knockout-section">
        <div className="section-toolbar compact">
          <div>
            <span className="eyebrow">Road To Final</span>
            <h2>淘汰賽晉級路線</h2>
          </div>
          <p className="muted-copy">平手完賽的淘汰賽會依後續賽程推定晉級隊伍，頁面保留正規時間比分並標示「PK / 加時晉級」。</p>
        </div>

        <div className="knockout-board">
          {overview.rounds.map((round) => (
            <section className={`knockout-round ${statusClass(round.status)}`} key={round.name}>
              <div className="knockout-round__head">
                <div>
                  <span className="eyebrow">{round.status}</span>
                  <h3>{round.name}</h3>
                </div>
                <strong>
                  {round.completedMatches}/{round.expectedMatches}
                </strong>
              </div>

              <div className="knockout-match-list">
                {round.matches.length > 0 ? (
                  round.matches.map((match) => (
                    <article className="knockout-match" key={match.id}>
                      <div className="knockout-match__meta">
                        <span>{match.kickoffTw}</span>
                        <strong>{matchStatusLabel(match)}</strong>
                      </div>

                      <div className="knockout-team-list">
                        <div className={`knockout-team ${match.winnerTeam === match.homeTeam ? "is-winner" : ""}`}>
                          <TeamBadge code={match.homeTeam} compact />
                          {match.winnerTeam === match.homeTeam ? <span>{match.winnerNote}</span> : null}
                          <strong>{scoreValue(match, "home")}</strong>
                        </div>
                        <div className={`knockout-team ${match.winnerTeam === match.awayTeam ? "is-winner" : ""}`}>
                          <TeamBadge code={match.awayTeam} compact />
                          {match.winnerTeam === match.awayTeam ? <span>{match.winnerNote}</span> : null}
                          <strong>{scoreValue(match, "away")}</strong>
                        </div>
                      </div>

                      <div className="knockout-match__footer">
                        <span>{matchResultText(match)}</span>
                        <Link className="secondary-action" href={`/matches/${match.id}`}>
                          分析
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="knockout-empty">
                    <strong>對戰待定</strong>
                    <span>待前一輪結果產生組合後自動補上。</span>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="group-finals-section">
        <div className="section-toolbar compact">
          <div>
            <span className="eyebrow">Group Final Table</span>
            <h2>小組賽最終排名</h2>
          </div>
          <p className="muted-copy">小組賽已結束，表格保留每組最終積分與晉級狀態，作為淘汰賽路線的背景資料。</p>
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
      </section>
    </main>
  );
}
