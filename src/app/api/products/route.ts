import { NextResponse } from "next/server";
import { getProductsFromJson } from "@/lib/products-data";

export const runtime = "nodejs";

export async function GET() {
  const products = getProductsFromJson();
  return NextResponse.json({ products });
}
