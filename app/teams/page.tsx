import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { TeamBadge } from "@/components/TeamBadge";
import { getTeamTournamentStatus, groups, starFocusItems, teams } from "@/lib/data";
import { resultLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "球隊資料",
  description: "2026 世界盃 48 支球隊的分組、洲別、積分狀態與基礎資料。"
};

function getGroupName(teamCode: string) {
  return groups.find((group) => group.rows.some((row) => row.teamCode === teamCode))?.name ?? "待分組";
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
        <p>近期戰績、進失球與目前狀態會依完賽紀錄自動更新；FIFA 排名採 2026/06/11 官方版本，Elo 為站內模型參考分。</p>
      </div>

      <section className="star-focus-section" aria-labelledby="star-focus-title">
        <div className="section-toolbar compact">
          <div>
            <span className="eyebrow">Stars Watch</span>
            <h2 id="star-focus-title">球星焦點雷達</h2>
          </div>
          <p className="muted-copy">整理自外部球隊與球星專題，轉成站內可用的模型提示與看盤提醒。</p>
        </div>

        <div className="star-focus-grid">
          {starFocusItems.map((item) => (
            <article className="star-focus-card" key={item.id}>
              <div className="star-focus-card__top">
                <div>
                  <span className="eyebrow">{item.publishedAt}</span>
                  <h3>{item.headline}</h3>
                </div>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  來源
                </a>
              </div>
              <div className="star-focus-card__teams">
                {item.teamCodes.map((teamCode) => (
                  <TeamBadge code={teamCode} compact key={`${item.id}-${teamCode}`} />
                ))}
              </div>
              <p>{item.angle}</p>
              <div className="star-focus-card__hint">
                <span>模型提示</span>
                <strong>{item.modelHint}</strong>
              </div>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={`${item.id}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

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
