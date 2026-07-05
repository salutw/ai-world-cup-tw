import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PlayerRosterExplorer } from "@/components/PlayerRosterExplorer";
import { getTeamTournamentStatus, groups, teams } from "@/lib/data";
import { playerRosterDataset } from "@/lib/playerRosters";
import { resultLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "球隊資料 | AI 看世足",
  description: "2026 世界盃 48 隊球隊資料、球員名單、球星數據與篩選搜尋。"
};

function getGroupName(teamCode: string) {
  return groups.find((group) => group.rows.some((row) => row.teamCode === teamCode))?.name ?? "淘汰賽";
}

function getTeamStatus(teamCode: string) {
  return getTeamTournamentStatus(teamCode);
}

export default function TeamsPage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">Team Profiles</span>
        <h1>球隊資料</h1>
        <p>整合 2026 世界盃球員名單、球星數據、FIFA 排名、Elo 評分與各隊世界盃最佳成績。</p>
      </div>

      <PlayerRosterExplorer dataset={playerRosterDataset} />

      <section className="team-directory-section" aria-labelledby="team-directory-title">
        <div className="section-toolbar">
          <div>
            <span className="eyebrow">48 Teams</span>
            <h2 id="team-directory-title">球隊資料卡</h2>
          </div>
          <p className="muted-copy">快速檢視各隊目前階段、近期戰績與世界盃歷史最佳成績。</p>
        </div>

        <div className="team-grid">
          {Object.values(teams).map((team) => (
            <article className="team-card" key={team.code}>
              <div className="team-head">
                <span className="team-emblem" style={{ "--team-colors": team.colors } as CSSProperties} aria-hidden="true" />
                <div>
                  <span className="eyebrow">{team.nameEn}</span>
                  <h2>{team.nameZh}</h2>
                </div>
              </div>
              <p>{team.summary}</p>
              <div className="info-row">
                <span>小組 / 階段</span>
                <strong>{getGroupName(team.code)}</strong>
              </div>
              <div className="info-row">
                <span>晉級狀態</span>
                <strong>{getTeamStatus(team.code)}</strong>
              </div>
              <div className="info-row">
                <span>FIFA 排名</span>
                <strong>{team.fifaRank ?? "待補"}</strong>
              </div>
              <div className="info-row">
                <span>Elo 評分</span>
                <strong>{team.eloRating ?? "待補"}</strong>
              </div>
              <div className="info-row">
                <span>洲別</span>
                <strong>{team.confederation}</strong>
              </div>
              <div className="info-row">
                <span>世界盃最佳</span>
                <strong>{team.worldCupBestResult}</strong>
              </div>
              <div className="form-row" aria-label={`${team.nameZh}近期戰績`}>
                {team.recentForm.length > 0 ? (
                  team.recentForm.map((result, index) => (
                    <span className={`form-dot form-dot--${result.toLowerCase()}`} key={`${team.code}-${index}`}>
                      {resultLabel(result)}
                    </span>
                  ))
                ) : (
                  <span className="form-note">目前尚無近期戰績資料</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
