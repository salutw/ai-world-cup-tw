import { NextResponse } from "next/server";
import { matches } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    data: matches,
    meta: {
      count: matches.length,
      source: "seed-data",
      generatedAt: new Date().toISOString()
    }
  });
}
