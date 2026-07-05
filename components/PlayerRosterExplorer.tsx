"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlayerRosterDataset, PlayerRosterRecord } from "@/lib/playerRosters";

interface PlayerRosterExplorerProps {
  dataset: PlayerRosterDataset;
}

const numberFormatter = new Intl.NumberFormat("zh-TW");

function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("zh-TW").replace(/\s+/g, "");
}

function formatStat(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return numberFormatter.format(value);
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `${numberFormatter.format(value)}%`;
}

function playerInitials(player: PlayerRosterRecord) {
  const source = player.name || player.fullName || player.teamName;
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function playerBioLine(player: PlayerRosterRecord) {
  return [player.birthDate, player.heightCm, player.weightKg, player.nationality].filter(Boolean).join(" · ");
}

function useFilteredPlayers(dataset: PlayerRosterDataset, query: string, teamId: string, positionKey: string) {
  return useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return dataset.players.filter((player) => {
      if (teamId && player.teamId !== teamId) return false;
      if (positionKey && player.positionKey !== positionKey) return false;
      if (!normalizedQuery) return true;

      const haystack = normalizeSearch(
        [
          player.name,
          player.fullName,
          player.teamName,
          player.positionZh,
          player.number,
          player.nationality,
          player.birthDate
        ].join(" ")
      );

      return haystack.includes(normalizedQuery);
    });
  }, [dataset.players, positionKey, query, teamId]);
}

function PlayerAvatar({ player, size = "card" }: { player: PlayerRosterRecord; size?: "card" | "modal" }) {
  return (
    <span className={`roster-avatar roster-avatar--${size}`}>
      <span className="roster-avatar__fallback">{playerInitials(player)}</span>
      {player.photoUrl ? (
        <img
          src={player.photoUrl}
          alt={player.name}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      ) : null}
    </span>
  );
}

function PlayerCard({ player, rank, onSelect }: { player: PlayerRosterRecord; rank: number; onSelect: (player: PlayerRosterRecord) => void }) {
  return (
    <button className="roster-card" type="button" onClick={() => onSelect(player)}>
      <PlayerAvatar player={player} />
      <span className="roster-number">{player.number || rank}</span>
      <span className="roster-card__body">
        <strong>{player.name}</strong>
        <span>{player.fullName}</span>
        <small>
          {player.teamLogoUrl ? <img src={player.teamLogoUrl} alt="" loading="lazy" decoding="async" /> : null}
          {player.teamName}
          <span aria-hidden="true"> · </span>
          {player.positionZh || "未分類"}
          {player.age ? (
            <>
              <span aria-hidden="true"> · </span>
              {player.age} 歲
            </>
          ) : null}
        </small>
      </span>
    </button>
  );
}

function PlayerModal({ player, onClose }: { player: PlayerRosterRecord; onClose: () => void }) {
  const stats = player.stats;
  const statItems = stats
    ? [
        { label: "上場", value: formatStat(stats.appearances) },
        { label: "先發", value: formatStat(stats.starts) },
        { label: "出賽時間（分鐘）", value: formatStat(stats.minutes) },
        { label: "進球", value: formatStat(stats.goals) },
        { label: "助攻", value: formatStat(stats.assists) },
        { label: "黃牌", value: formatStat(stats.yellowCards) },
        { label: "紅牌", value: formatStat(stats.redCards) },
        { label: "射門", value: `${formatStat(stats.shotsTotal)} / 正 ${formatStat(stats.shotsOnTarget)}` },
        { label: "傳球", value: formatStat(stats.passesTotal) },
        { label: "傳球準確率", value: formatPercent(stats.passAccuracy) },
        { label: "過人成功", value: `${formatStat(stats.dribblesSuccess)} / ${formatStat(stats.dribblesAttempted)}` }
      ]
    : [];

  return (
    <div className="roster-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="roster-modal"
        aria-modal="true"
        role="dialog"
        aria-labelledby="player-roster-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="roster-modal__close" type="button" aria-label="關閉球員資料" onClick={onClose}>
          ×
        </button>

        <div className="roster-modal__hero">
          <PlayerAvatar player={player} size="modal" />
          <span className="roster-number roster-number--modal">{player.number || "—"}</span>
          <div>
            <h2 id="player-roster-modal-title">{player.name}</h2>
            <p>{player.fullName !== player.name ? player.fullName : ""}</p>
            <div className="roster-modal__meta">
              {player.teamLogoUrl ? <img src={player.teamLogoUrl} alt="" loading="lazy" decoding="async" /> : null}
              <strong>{player.teamName}</strong>
              <span>{player.positionZh}</span>
              {player.age ? <span>{player.age} 歲</span> : null}
            </div>
            <small>{playerBioLine(player)}</small>
          </div>
        </div>

        <div className="roster-modal__content">
          <h3>2026 賽季成績（含熱身賽 / 資格賽）</h3>
          {statItems.length > 0 ? (
            <div className="roster-stat-grid">
              {statItems.map((item) => (
                <div className="roster-stat" key={`${player.id}-${item.label}`}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="roster-empty-copy">目前沒有可用的 2026 球員統計。</p>
          )}

          {player.leagues.length > 0 ? (
            <div className="roster-league-list">
              {player.leagues.map((league) => (
                <div className="roster-league-row" key={`${player.id}-${league.name}`}>
                  {league.logoUrl ? <img src={league.logoUrl} alt="" loading="lazy" decoding="async" /> : null}
                  <strong>{league.name}</strong>
                  <span>
                    {formatStat(league.appearances)} 場 · {formatStat(league.goals)} 球 · {formatStat(league.assists)} 助攻
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function PlayerRosterExplorer({ dataset }: PlayerRosterExplorerProps) {
  const [query, setQuery] = useState("");
  const [teamId, setTeamId] = useState("");
  const [positionKey, setPositionKey] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerRosterRecord | null>(null);
  const filteredPlayers = useFilteredPlayers(dataset, query, teamId, positionKey);

  useEffect(() => {
    if (!selectedPlayer) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedPlayer(null);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPlayer]);

  return (
    <section className="roster-explorer" aria-labelledby="player-roster-title">
      <div className="roster-hero">
        <span className="roster-pill">世界盃深度洞察</span>
        <h2 id="player-roster-title">球隊與球星</h2>
        <p>2026 世界盃 48 支參賽球隊完整介紹與球員名單，整合球員基本資料、隊伍篩選與賽季統計。</p>
      </div>

      <div className="roster-title-row">
        <div>
          <span className="eyebrow">Player Database</span>
          <h3>2026 世界盃足球賽球員名單</h3>
        </div>
        <span>
          共 {numberFormatter.format(dataset.totalPlayers)} 位球員 · {numberFormatter.format(dataset.totalTeams)} 隊
        </span>
      </div>

      <div className="roster-toolbar">
        <input
          aria-label="搜尋球員"
          type="search"
          placeholder="搜尋球員名（中 / 英、隊伍）"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select aria-label="篩選隊伍" value={teamId} onChange={(event) => setTeamId(event.target.value)}>
          <option value="">全部隊伍</option>
          {dataset.teams.map((team) => (
            <option value={team.id} key={team.id}>
              {team.nameZh}
            </option>
          ))}
        </select>
        <select aria-label="篩選位置" value={positionKey} onChange={(event) => setPositionKey(event.target.value)}>
          <option value="">全部位置</option>
          {dataset.positions.map((position) => (
            <option value={position.key} key={position.key}>
              {position.nameZh}
            </option>
          ))}
        </select>
        <strong>
          {filteredPlayers.length === dataset.players.length
            ? `共 ${numberFormatter.format(dataset.players.length)} 位`
            : `顯示 ${numberFormatter.format(filteredPlayers.length)} / ${numberFormatter.format(dataset.players.length)} 位`}
        </strong>
      </div>

      {filteredPlayers.length > 0 ? (
        <div className="roster-grid">
          {filteredPlayers.map((player, index) => (
            <PlayerCard player={player} rank={index + 1} onSelect={setSelectedPlayer} key={player.id} />
          ))}
        </div>
      ) : (
        <div className="roster-empty">
          <strong>找不到符合條件的球員</strong>
          <span>可以換隊伍、位置，或改用英文姓名搜尋。</span>
        </div>
      )}

      <div className="roster-source">
        <span>資料來源：{dataset.sourceLabel}</span>
        <a href={dataset.sourceUrl} target="_blank" rel="noreferrer">
          查看來源
        </a>
      </div>

      {selectedPlayer ? <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} /> : null}
    </section>
  );
}
