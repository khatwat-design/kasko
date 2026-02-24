import { readFileSync } from "fs";
import path from "path";
import type { Product } from "@/lib/products";

const PRODUCTS_PATH = path.join(process.cwd(), "data", "products.json");

export function getProductsFromJson(): Product[] {
  try {
    const data = readFileSync(PRODUCTS_PATH, "utf-8");
    const parsed = JSON.parse(data) as Product[];
    return Array.isArray(parsed) ? parsed.filter((p) => p.isVisible !== false) : [];
  } catch {
    return [];
  }
}

export function getProductByIdFromJson(id: string): Product | null {
  const products = getProductsFromJson();
  return products.find((p) => p.id === id) ?? null;
}
