"use client";

import { useMemo, useState } from "react";
import type { Match } from "@/lib/types";
import { MatchCard } from "./MatchCard";

interface MatchBoardProps {
  matches: Match[];
  boardDateTw: string;
  isToday: boolean;
}

const filters = [
  { label: "全部", value: "all" },
  { label: "高關注", value: "high" },
  { label: "小組關鍵", value: "group" },
  { label: "進球期待", value: "goals" }
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function MatchBoard({ matches, boardDateTw, isToday }: MatchBoardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const visibleMatches = useMemo(() => {
    if (activeFilter === "all") return matches;
    return matches.filter((match) => match.filterTags.includes(activeFilter));
  }, [activeFilter, matches]);

  return (
    <>
      <div className="section-toolbar">
        <div>
          <span className="eyebrow">Today Board</span>
          <h2>{isToday ? "今日焦點賽事" : "下一個比賽日焦點"}</h2>
          <p className="board-date-note">台灣時間 {boardDateTw}</p>
        </div>
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
      <div className="match-grid">
        {visibleMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
