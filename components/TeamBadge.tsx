import type { CSSProperties } from "react";
import { getTeam } from "@/lib/data";
import type { TeamCode } from "@/lib/types";

interface TeamBadgeProps {
  code: TeamCode;
  compact?: boolean;
}

export function TeamBadge({ code, compact = false }: TeamBadgeProps) {
  const team = getTeam(code);
  const style = { "--team-colors": team.colors } as CSSProperties;

  return (
    <span className={compact ? "team-badge team-badge--compact" : "team-badge"} style={style}>
      <span className="team-badge__mark" aria-hidden="true" />
      <span className="team-badge__name">{team.nameZh}</span>
    </span>
  );
}
