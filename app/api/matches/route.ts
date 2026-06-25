import { NextResponse } from "next/server";
import { getTeam, matches } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    data: matches.map((match) => ({
      ...match,
      homeTeamNameZh: getTeam(match.homeTeam).nameZh,
      awayTeamNameZh: getTeam(match.awayTeam).nameZh
    })),
    meta: {
      count: matches.length,
      source: "match-catalog",
      generatedAt: new Date().toISOString()
    }
  });
}
