"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/meta-pixel";

export default function Home() {
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

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
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-6 md:space-y-12 px-3 md:px-6">
      <section className="space-y-4 md:space-y-6">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold text-black mb-2 md:mb-4">
            منتجاتنا
          </h1>
          <p className="text-xs md:text-base text-gray-600">
            أفضل المنتجات لتناسب احتياجاتك
          </p>
        </div>
        
        <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between rounded-xl md:rounded-3xl border border-gray-200 bg-white p-3 md:p-6 shadow-md md:shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="space-y-2 md:space-y-3">
                {product.badge && (
                  <span className="inline-flex rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                    {product.badge}
                  </span>
                )}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg md:rounded-2xl bg-gray-100 cursor-pointer group">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div>
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-sm md:text-lg font-semibold text-black hover:text-red-600 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs md:text-sm leading-4 md:leading-6 text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="mt-3 md:mt-6 flex flex-col items-center justify-between gap-2 md:gap-3">
                <p className="text-sm md:text-base font-semibold text-black">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold text-white transition ${
                      addedToCart === product.id
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {addedToCart === product.id ? '✓ تمت الإضافة' : 'إضافة للسلة'}
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-black transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
