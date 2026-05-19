import { NextResponse } from "next/server";
import { fetchRemoteBanners } from "@/lib/store-api";

export const runtime = "nodejs";

export async function GET() {
  const banners = await fetchRemoteBanners();
  return NextResponse.json(
    { banners: banners ?? [] },
    { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } },
  );
}
