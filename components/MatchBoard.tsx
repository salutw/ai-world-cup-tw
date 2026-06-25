"use client";

import { useMemo, useState } from "react";
import type { Match } from "@/lib/types";
import { MatchCard } from "./MatchCard";

interface MatchBoardProps {
  matches: Match[];
  initialDateTw: string;
  todayDateTw: string;
}

const filters = [
  { label: "全部", value: "all" },
  { label: "高關注", value: "high" },
  { label: "小組關鍵", value: "group" },
  { label: "進球期待", value: "goals" }
] as const;

type FilterValue = (typeof filters)[number]["value"];

function formatDateLabel(dateKey: string, todayDateTw: string) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}/${Number(day)}${dateKey === todayDateTw ? "（今日）" : ""}`;
}

export function MatchBoard({ matches, initialDateTw, todayDateTw }: MatchBoardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedDateTw, setSelectedDateTw] = useState(initialDateTw);
  const availableDates = useMemo(
    () => Array.from(new Set(matches.map((match) => match.matchDateTw))).sort(),
    [matches]
  );
  const selectedMatches = useMemo(
    () =>
      matches
        .filter((match) => match.matchDateTw === selectedDateTw)
        .sort((first, second) => first.kickoffTw.localeCompare(second.kickoffTw) || first.id.localeCompare(second.id)),
    [matches, selectedDateTw]
  );
  const visibleMatches = useMemo(() => {
    if (activeFilter === "all") return selectedMatches;
    return selectedMatches.filter((match) => match.filterTags.includes(activeFilter));
  }, [activeFilter, selectedMatches]);
  const isSelectedToday = selectedDateTw === todayDateTw;

  function updateSelectedDate(dateTw: string) {
    setSelectedDateTw(dateTw);
    setActiveFilter("all");
  }

  return (
    <>
      <div className="section-toolbar">
        <div>
          <span className="eyebrow">Today Board</span>
          <h2>{isSelectedToday ? "今日焦點賽事" : "該日焦點賽事"}</h2>
          <p className="board-date-note">
            台灣時間 {selectedDateTw} · 共 {selectedMatches.length} 場
          </p>
        </div>
        <div className="board-controls">
          <label className="date-select-control">
            <span>選擇日期</span>
            <select value={selectedDateTw} onChange={(event) => updateSelectedDate(event.target.value)}>
              {availableDates.map((dateKey) => (
                <option key={dateKey} value={dateKey}>
                  {formatDateLabel(dateKey, todayDateTw)}
                </option>
              ))}
            </select>
          </label>
          <div className="segmented-control" aria-label="賽事篩選">
            {filters.map((filter) => (
              <button
                className={filter.value === activeFilter ? "segment is-active" : "segment"}
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="match-grid">
        {visibleMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
