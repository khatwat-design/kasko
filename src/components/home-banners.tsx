"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BannerPayload } from "@/lib/store-settings-types";

export default function HomeBanners() {
  const [banners, setBanners] = useState<BannerPayload[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/banners", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { banners: [] }))
      .then((d: { banners?: BannerPayload[] }) => {
        if (!cancelled) setBanners(Array.isArray(d.banners) ? d.banners : []);
      })
      .catch(() => {
        if (!cancelled) setBanners([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!banners.length) return null;

  return (
    <section className="space-y-3" aria-label="عروض وأنشطة">
      <h2 className="text-lg font-bold text-stone-900 md:text-xl">عروض وإعلانات</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {banners.map((b) => {
          const inner = (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
              <Image
                src={b.image}
                alt={b.title || "بنر"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              {b.title ? (
                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-right text-sm font-semibold text-white">
                  {b.title}
                </div>
              ) : null}
            </div>
          );
          if (b.linkUrl) {
            return (
              <Link
                key={b.id}
                href={b.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:opacity-95"
              >
                {inner}
              </Link>
            );
          }
          return (
            <div key={b.id} className="block">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
