"use client";

import { Amiri } from "next/font/google";
import { useStoreSettings } from "@/contexts/store-settings-context";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

/** السلوجن من لوحة التحكم مع تمييز عبارة التسليط */
export default function SloganHero() {
  const { store } = useStoreSettings();
  const hl = store.sloganHighlightPhrase?.trim() ?? "";
  const full = store.sloganLine2;
  const idx = hl.length ? full.indexOf(hl) : -1;

  return (
    <section
      className={`${amiri.className} border-b border-stone-200/90 bg-gradient-to-b from-stone-50/80 to-white pb-12 pt-10 md:pb-14 md:pt-12`}
      aria-labelledby="store-brand"
    >
      <div className="mx-auto max-w-4xl px-4 md:max-w-5xl">
        <p
          id="store-brand"
          className="text-center text-[1.5rem] font-bold leading-tight text-black underline decoration-amber-500 decoration-[3px] underline-offset-[8px] md:text-[1.85rem] lg:text-[2.1rem]"
          lang="ar"
        >
          {store.sloganLine1}
        </p>
        <p
          id="store-slogan"
          className="text-pretty pt-4 text-center text-[1.25rem] font-medium leading-[1.75] tracking-tight text-black md:text-[1.65rem] md:leading-snug lg:text-[1.85rem]"
        >
          {idx >= 0 ? (
            <>
              {full.slice(0, idx)}
              <span className="font-semibold text-black [-webkit-box-decoration-break:clone] [box-decoration-break:clone] rounded-[0.2em] bg-gradient-to-l from-amber-200/60 via-amber-200/50 to-amber-100/55 px-[0.35em] py-[0.12em]">
                {hl}
              </span>
              {full.slice(idx + hl.length)}
            </>
          ) : (
            <>
              {full}{" "}
              <span className="font-semibold text-black [-webkit-box-decoration-break:clone] [box-decoration-break:clone] rounded-[0.2em] bg-gradient-to-l from-amber-200/60 via-amber-200/50 to-amber-100/55 px-[0.35em] py-[0.12em]">
                {hl}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
