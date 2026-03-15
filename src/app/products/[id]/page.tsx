"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart, trackViewContent } from "@/lib/pixels";

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find((item) => item.id === params?.id);
  const viewContentFired = useRef(false);

  useEffect(() => {
    if (!product || viewContentFired.current) return;
    trackViewContent({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
    viewContentFired.current = true;
  }, [product]);

  if (!product && !loading) {
    return (
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <p className="text-lg font-semibold text-slate-900">
          المنتج غير متوفر
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-slate-700"
        >
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!product) return;
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
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <Link href="/products" className="text-sm text-[var(--color-muted)]">
          العودة للمنتجات
        </Link>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-slate-100 p-8">
            {product ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="space-y-4">
            {product?.badge ? (
              <span className="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs text-white">
                {product.badge}
              </span>
            ) : null}
            <h1 className="text-3xl font-semibold text-slate-900">
              {product?.name ?? "جاري التحميل..."}
            </h1>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              {product?.description ?? "نجهز تفاصيل المنتج الآن."}
            </p>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-sm text-[var(--color-muted)]">السعر</p>
              <p className="text-2xl font-semibold text-slate-900">
                {product ? formatCurrency(product.price) : "--"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full rounded-2xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)] disabled:opacity-50"
              disabled={!product}
            >
              اشتري الآن
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold text-slate-900">لماذا كاسكو؟</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>توصيل سريع داخل العراق خلال 24-48 ساعة.</li>
            <li>دفع عند الاستلام لراحة أكبر.</li>
            <li>فريق دعم يرافقك حتى استلام الطلب.</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-[var(--color-primary)] p-6 text-white shadow-[var(--shadow-soft)]">
          <p className="text-sm text-white/70">ملاحظة التوصيل</p>
          <p className="mt-2 text-sm leading-6">
            يمكنك تحديد عنوانك بدقة في صفحة إتمام الطلب.
          </p>
        </div>
      </aside>
    </div>
  );
}
