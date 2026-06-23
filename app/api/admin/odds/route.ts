import { NextResponse } from "next/server";
import type { OddsAdminDraft } from "@/lib/types";

function isPositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<OddsAdminDraft>;

  const requiredNumberFields: Array<keyof OddsAdminDraft> = [
    "homeWinOdds",
    "drawOdds",
    "awayWinOdds",
    "overUnderLine",
    "overOdds",
    "underOdds"
  ];

  const invalidField = requiredNumberFields.find((field) => !isPositiveNumber(payload[field]));
  if (!payload.matchId || !payload.updatedAt || invalidField) {
    return NextResponse.json(
      {
        ok: false,
        error: invalidField ? `Invalid field: ${invalidField}` : "matchId and updatedAt are required"
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    saved: false,
    note: "正式資料庫尚未接上，目前回傳通過驗證的倍率快照。",
    data: payload
  });
}
