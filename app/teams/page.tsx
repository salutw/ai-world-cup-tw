import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { groups, teams } from "@/lib/data";
import { resultLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "球隊資料",
  description: "2026 世界盃 48 支球隊的分組、洲別、積分狀態與基礎資料。"
};

function getGroupName(teamCode: string) {
  return groups.find((group) => group.rows.some((row) => row.teamCode === teamCode))?.name ?? "待分組";
}

function getTeamStatus(teamCode: string) {
  return groups.flatMap((group) => group.rows).find((row) => row.teamCode === teamCode)?.status ?? "待更新";
}

export default function TeamsPage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">Team Profiles</span>
        <h1>球隊資料</h1>
        <p>已補上 2026 世界盃 48 支參賽隊伍。FIFA 排名與 Elo 會等後續接官方排名/模型資料後再填入。</p>
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
              <span>小組</span>
              <strong>{getGroupName(team.code)}</strong>
            </div>
            <div className="info-row">
              <span>目前狀態</span>
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
            <div className="form-row" aria-label={`${team.nameZh}近期五場`}>
              {team.recentForm.length > 0 ? (
                team.recentForm.map((result, index) => (
                  <span className={`form-dot form-dot--${result.toLowerCase()}`} key={`${team.code}-${index}`}>
                    {resultLabel(result)}
                  </span>
                ))
              ) : (
                <span className="form-note">近期戰績待接資料源</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
