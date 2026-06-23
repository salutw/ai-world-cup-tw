"use client";

import { useMemo, useState } from "react";
import { getTeam } from "@/lib/data";
import type { Match, OddsAdminDraft } from "@/lib/types";
import { TeamBadge } from "./TeamBadge";

interface AdminConsoleProps {
  matches: Match[];
}

function toDraft(match: Match): OddsAdminDraft {
  return {
    matchId: match.id,
    homeWinOdds: match.odds.homeWinOdds,
    drawOdds: match.odds.drawOdds,
    awayWinOdds: match.odds.awayWinOdds,
    overUnderLine: match.odds.overUnderLine,
    overOdds: match.odds.overOdds,
    underOdds: match.odds.underOdds,
    updatedAt: match.odds.updatedAt,
    sourceNote: match.odds.sourceNote
  };
}

export function AdminConsole({ matches }: AdminConsoleProps) {
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0]?.id ?? "");
  const selectedMatch = useMemo(
    () => matches.find((match) => match.id === selectedMatchId) ?? matches[0],
    [matches, selectedMatchId]
  );
  const [draft, setDraft] = useState<OddsAdminDraft>(() => toDraft(selectedMatch));
  const [savedPayload, setSavedPayload] = useState<string>("");

  function updateSelectedMatch(matchId: string) {
    const nextMatch = matches.find((match) => match.id === matchId) ?? matches[0];
    setSelectedMatchId(matchId);
    setDraft(toDraft(nextMatch));
    setSavedPayload("");
  }

  function updateNumber(field: keyof Pick<OddsAdminDraft, "homeWinOdds" | "drawOdds" | "awayWinOdds" | "overUnderLine" | "overOdds" | "underOdds">, value: string) {
    setDraft((current) => ({ ...current, [field]: Number(value) }));
  }

  function saveDraft() {
    const payload = {
      ...draft,
      savedAt: new Date().toISOString(),
      persistence: "demo-local-payload"
    };
    const json = JSON.stringify(payload, null, 2);
    localStorage.setItem("ai-world-cup-latest-odds-draft", json);
    setSavedPayload(json);
  }

  const home = getTeam(selectedMatch.homeTeam);
  const away = getTeam(selectedMatch.awayTeam);

  return (
    <div className="admin-layout">
      <section className="admin-panel">
        <div className="panel-heading">
          <span className="eyebrow">Odds Desk</span>
          <h2>台灣運彩倍率輸入</h2>
          <p>正式版可把這份 payload 接到資料庫，並保留每次倍率快照與更新時間。</p>
        </div>

        <label className="field">
          <span>選擇賽事</span>
          <select value={selectedMatchId} onChange={(event) => updateSelectedMatch(event.target.value)}>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>
                {getTeam(match.homeTeam).nameZh} vs {getTeam(match.awayTeam).nameZh}
              </option>
            ))}
          </select>
        </label>

        <div className="admin-match-strip">
          <TeamBadge code={selectedMatch.homeTeam} />
          <span className="versus">VS</span>
          <TeamBadge code={selectedMatch.awayTeam} />
        </div>

        <div className="field-grid">
          <label className="field">
            <span>主勝 {home.nameZh}</span>
            <input value={draft.homeWinOdds} min="1" step="0.01" type="number" onChange={(event) => updateNumber("homeWinOdds", event.target.value)} />
          </label>
          <label className="field">
            <span>和局</span>
            <input value={draft.drawOdds} min="1" step="0.01" type="number" onChange={(event) => updateNumber("drawOdds", event.target.value)} />
          </label>
          <label className="field">
            <span>客勝 {away.nameZh}</span>
            <input value={draft.awayWinOdds} min="1" step="0.01" type="number" onChange={(event) => updateNumber("awayWinOdds", event.target.value)} />
          </label>
          <label className="field">
            <span>大小球盤</span>
            <input value={draft.overUnderLine} min="0.5" step="0.5" type="number" onChange={(event) => updateNumber("overUnderLine", event.target.value)} />
          </label>
          <label className="field">
            <span>大球</span>
            <input value={draft.overOdds} min="1" step="0.01" type="number" onChange={(event) => updateNumber("overOdds", event.target.value)} />
          </label>
          <label className="field">
            <span>小球</span>
            <input value={draft.underOdds} min="1" step="0.01" type="number" onChange={(event) => updateNumber("underOdds", event.target.value)} />
          </label>
        </div>

        <label className="field">
          <span>更新時間</span>
          <input value={draft.updatedAt} onChange={(event) => setDraft((current) => ({ ...current, updatedAt: event.target.value }))} />
        </label>

        <label className="field">
          <span>來源備註</span>
          <textarea value={draft.sourceNote} rows={3} onChange={(event) => setDraft((current) => ({ ...current, sourceNote: event.target.value }))} />
        </label>

        <button className="primary-button" type="button" onClick={saveDraft}>
          產生倍率 JSON
        </button>
      </section>

      <aside className="admin-panel">
        <div className="panel-heading">
          <span className="eyebrow">Workflow</span>
          <h2>正式流程</h2>
        </div>
        <ol className="workflow-list">
          <li>後台輸入台灣運彩倍率，保留快照與更新者。</li>
          <li>模型服務讀取最新倍率、球隊資料與近況。</li>
          <li>重新計算勝和負、比分分布與晉級機率。</li>
          <li>AI 依模型結果生成白話賽前解讀。</li>
          <li>編輯確認後發布到單場頁與首頁看板。</li>
        </ol>

        <div className="payload-box">
          <span className="eyebrow">Payload Preview</span>
          <pre>{savedPayload || "尚未產生。調整倍率後按下「產生倍率 JSON」。"}</pre>
        </div>
      </aside>
    </div>
  );
}
