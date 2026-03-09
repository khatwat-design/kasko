"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";

export default function ProductsPage() {
  const { items, addItem, removeItem } = useCart();
  const { products, loading } = useProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const handleAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
  }) => {
    addItem(product.id);
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
  };

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm text-[var(--color-muted)]">منتجات متنوعة</p>
        <h1 className="text-3xl font-bold text-slate-900">كل المنتجات</h1>
        <div className="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[var(--color-border)] px-3 py-1"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="h-32 rounded-2xl bg-slate-100" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-32 rounded-full bg-slate-100" />
                  <div className="h-3 w-44 rounded-full bg-slate-100" />
                </div>
              </div>
            ))
          : products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1"
          >
            <div className="space-y-3">
              {product.badge ? (
                <span className="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs text-white">
                  {product.badge}
                </span>
              ) : null}
              <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-base font-semibold text-slate-900">
                {formatCurrency(product.price)}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="text-xs font-semibold text-[var(--color-primary)]"
              >
                عرض التفاصيل
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                aria-label={`إزالة ${product.name}`}
              >
                -
              </button>
              <span className="min-w-6 text-center text-sm text-slate-700">
                {items[product.id] ?? 0}
              </span>
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]"
                aria-label={`إضافة ${product.name}`}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full rounded-2xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            >
              إضافة للسلة
            </button>
          </div>
        ))}
        {!loading && products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-muted)]">
            لا توجد منتجات حالياً.
          </div>
        ) : null}
      </section>
    </div>
  );
}
