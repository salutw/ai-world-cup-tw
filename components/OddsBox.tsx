import { getTeam } from "@/lib/data";
import { formatOdds } from "@/lib/format";
import type { Match } from "@/lib/types";

interface OddsBoxProps {
  match: Match;
  includeTotals?: boolean;
}

export function OddsBox({ match, includeTotals = false }: OddsBoxProps) {
  const home = getTeam(match.homeTeam);
  const away = getTeam(match.awayTeam);

  return (
    <div className="odds-stack">
      <div className="odds-grid" aria-label="台灣運彩勝和負倍率">
        <div className="odd-cell">
          <small>主勝 {home.nameZh}</small>
          <strong>{formatOdds(match.odds.homeWinOdds)}</strong>
        </div>
        <div className="odd-cell">
          <small>和局</small>
          <strong>{formatOdds(match.odds.drawOdds)}</strong>
        </div>
        <div className="odd-cell">
          <small>客勝 {away.nameZh}</small>
          <strong>{formatOdds(match.odds.awayWinOdds)}</strong>
        </div>
      </div>

      {includeTotals ? (
        <div className="odds-grid odds-grid--secondary" aria-label="大小球倍率">
          <div className="odd-cell">
            <small>大 {match.odds.overUnderLine}</small>
            <strong>{formatOdds(match.odds.overOdds)}</strong>
          </div>
          <div className="odd-cell">
            <small>小 {match.odds.overUnderLine}</small>
            <strong>{formatOdds(match.odds.underOdds)}</strong>
          </div>
          <div className="odd-cell">
            <small>更新</small>
            <strong className="odd-cell__time">{match.odds.updatedAt.slice(5)}</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}
