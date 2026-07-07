"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { scoreWithSpaces } from "@/lib/format";
import type { Match, TeamCode } from "@/lib/types";
import { MatchBoard } from "./MatchBoard";

interface HomeDashboardProps {
  matches: Match[];
  initialBoardDateTw: string;
  initialTodayDateTw: string;
  teamNames: Record<TeamCode, string>;
  children: ReactNode;
}

const taiwanTimeZone = "Asia/Taipei";
const boardRolloverOffsetHours = 10;

function taiwanDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: taiwanTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function taiwanBoardDateKey(date = new Date()) {
  return taiwanDateKey(new Date(date.getTime() + boardRolloverOffsetHours * 60 * 60 * 1000));
}

function resolveBoardDate(availableDates: string[], targetDateTw: string) {
  return availableDates.find((dateKey) => dateKey === targetDateTw) || availableDates.find((dateKey) => dateKey > targetDateTw) || availableDates.at(-1) || targetDateTw;
}

function sortByKickoff(first: Match, second: Match) {
  return first.kickoffTw.localeCompare(second.kickoffTw) || first.id.localeCompare(second.id);
}

export function HomeDashboard({ matches, initialBoardDateTw, initialTodayDateTw, teamNames, children }: HomeDashboardProps) {
  const availableDates = useMemo(() => Array.from(new Set(matches.map((match) => match.matchDateTw))).sort(), [matches]);
  const [todayDateTw, setTodayDateTw] = useState(initialTodayDateTw);
  const [selectedDateTw, setSelectedDateTw] = useState(() => resolveBoardDate(availableDates, initialBoardDateTw));

  useEffect(() => {
    setTodayDateTw(taiwanDateKey());
    setSelectedDateTw(resolveBoardDate(availableDates, taiwanBoardDateKey()));
  }, [availableDates]);

  const selectedMatches = useMemo(
    () => matches.filter((match) => match.matchDateTw === selectedDateTw).sort(sortByKickoff),
    [matches, selectedDateTw]
  );
  const featured = selectedMatches[0] || matches[0];
  const homeName = teamNames[featured.homeTeam] || featured.homeTeam;
  const awayName = teamNames[featured.awayTeam] || featured.awayTeam;

  return (
    <>
      <section className="hero-dashboard" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">2026 World Cup Match Board</span>
            <h1 id="hero-title">AI 看世足</h1>
            <p>用白話看懂盤口、市場訊號、歷史戰績與模型預估比分。</p>
          </div>
          <div className="hero-panel" aria-label="焦點賽事">
            <span className="panel-label">焦點賽事</span>
            <h2>
              {homeName} vs {awayName}
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
          <span className="strip-label">看板日期</span>
          <strong>{selectedDateTw}</strong>
          <small>前端會依台灣時間自動切換；下午 2 點後優先切到下一個比賽日。</small>
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
        <MatchBoard matches={matches} selectedDateTw={selectedDateTw} todayDateTw={todayDateTw} onDateChange={setSelectedDateTw} />
        {children}
      </section>
    </>
  );
}
