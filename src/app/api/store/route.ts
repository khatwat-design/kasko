import { NextResponse } from "next/server";
import { mergeRemoteStore, getLocalFallbackStore } from "@/lib/merge-remote-store";
import { fetchRemoteStorePayload } from "@/lib/store-api";
import { isStandaloneStore } from "@/lib/store-mode";

export const runtime = "nodejs";

export async function GET() {
  if (isStandaloneStore()) {
    return NextResponse.json(getLocalFallbackStore(), {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  }
  const remote = await fetchRemoteStorePayload();
  const merged = mergeRemoteStore(remote);
  return NextResponse.json(merged, {
    headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=120" },
  });
}
