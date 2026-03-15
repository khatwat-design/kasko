"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";

export default function ProductsPage() {
  const { addItem } = useCart();
  const router = useRouter();
  const { products, loading } = useProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const handleBuyNow = (product: {
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
    router.push("/checkout");
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
            <button
              type="button"
              onClick={() => handleBuyNow(product)}
              className="mt-4 w-full rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]"
            >
              اشتري الآن
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
