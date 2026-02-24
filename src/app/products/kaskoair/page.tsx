"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { IconWifi, IconLightbulb, IconPhone, IconMusic, StarRating } from "@/components/landing-icons";
import { formatCurrency } from "@/lib/products";
import { trackAddToCart, trackViewContent } from "@/lib/meta-pixel";

const PRODUCT_ID = "kaskoair";
const PRODUCT_NAME = "Kaskoair";
const PRODUCT_PRICE = 79000;
const PRODUCT_IMAGES = ["01", "02", "03", "04", "05"];
const IMAGE_BASE = "/images/kasko%20air";

export default function KaskoairLanding() {
  const orderRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    trackViewContent({ id: PRODUCT_ID, name: PRODUCT_NAME, price: PRODUCT_PRICE, category: "إلكترونيات السيارات", quantity: 1 });
  }, []);

  const scrollToOrder = () => {
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOrder = () => {
    addItem(PRODUCT_ID);
    trackAddToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: PRODUCT_PRICE,
      category: "إلكترونيات السيارات",
      quantity: 1,
    });
    scrollToOrder();
  };

  const handleOrderAndGoToCart = () => {
    addItem(PRODUCT_ID);
    trackAddToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: PRODUCT_PRICE,
      category: "إلكترونيات السيارات",
      quantity: 1,
    });
    window.location.href = "/cart";
  };

  const valuePoints = [
    "يحوّل CarPlay و Android Auto إلى وايرلس",
    "يضيف Android Auto إذا شاشتك تدعم CarPlay فقط",
    "يدعم انعكاس شاشة الهاتف بكل سهولة",
  ];

  const benefits = [
    { title: "اتصال لاسلكي كامل", desc: "تشغيل تلقائي بدون كيبلات", Icon: IconWifi },
    { title: "حل ذكي للشاشات المحدودة", desc: "إذا شاشتك CarPlay فقط هسه تكدر تستخدم Android Auto", Icon: IconLightbulb },
    { title: "انعكاس شاشة الهاتف", desc: "تكدر تعكس شاشة موبايلك مباشرة على شاشة السيارة", Icon: IconPhone },
    { title: "راحة بالاستخدام اليومي", desc: "تشغّل الخرائط المكالمات الموسيقى بدون تعب", Icon: IconMusic },
  ];

  const features = [
    "تشغيل CarPlay وايرلس",
    "تشغيل Android Auto وايرلس",
    "إضافة Android Auto للشاشات اللي بيها CarPlay فقط",
    "دعم انعكاس شاشة الهاتف",
    "تركيب مباشر بدون برمجة",
    "يعمل على أغلب السيارات الداعمة لكاربلي",
  ];

  const reviews = [
    { stars: 5, text: "خلصت من الكيبل نهائيًا. كل ما أركب السيارة يتصل تلقائي وما يحتاج أي شي.", name: "عميل من بغداد" },
    { stars: 5, text: "أخيرًا شاشتي صارت تدعم أندرويد أوتو. الحل كان بسيط وسريع.", name: "عميل من النجف" },
    { stars: 5, text: "الربط سريع ويشتغل تلقائي. جهاز صغير ويوفر وقت وجهد.", name: "عميل من البصرة" },
  ];

  const faqs = [
    { q: "هل يحتاج فك أو تعديل ؟", a: "لا تركيب مباشر" },
    {
      q: "هل يشتغل بكل السيارات ؟",
      a: "يشتغل على السيارات اللي تدعم CarPlay",
    },
    { q: "هل الاتصال ثابت ؟", a: "نعم الاتصال سريع ومستقر" },
    {
      q: "هل يشغّل فيديو ؟",
      a: "الجهاز مخصص للانعكاس والاستخدام الآمن",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Sticky bar */}
      <div
        className={`fixed top-14 right-0 left-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 bg-black/95 backdrop-blur-md border-b border-gray-800 transition-opacity duration-300 ${
          stickyVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="text-white font-bold text-lg">Kaskoair</span>
        <button
          onClick={scrollToOrder}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500 transition-colors"
        >
          اشتري Kaskoair هسه
        </button>
      </div>

      {/* 1 — Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 md:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            ودّع الكيبلات
            <br />
            <span className="text-red-400">خلّي CarPlay و Android Auto يشتغلون وايرلس</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Kaskoair يحوّل الكاربلي والأندرويد أوتو إلى اتصال لاسلكي ويضيف Android Auto للشاشات الي بيها CarPlay فقط ويخليك تعكس شاشة موبايلك بسهولة وأمان.
          </p>
          <button
            onClick={handleOrder}
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg shadow-red-600/30"
          >
            اشتري Kaskoair هسه
          </button>
        </div>
      </section>

      {/* 2 — Value proposition */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-4">
            حل بسيط يغيّر تجربة الاستخدام اليومية
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-4">
              <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden bg-gray-200 shadow-2xl">
                <Image
                  key={selectedImageIndex}
                  src={`${IMAGE_BASE}/${PRODUCT_IMAGES[selectedImageIndex]}.png`}
                  alt={PRODUCT_NAME}
                  fill
                  className="object-cover transition-opacity duration-200"
                  sizes="(max-width:768px) 100vw, 45vw"
                />
              </div>
              <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
                {PRODUCT_IMAGES.map((num, i) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${
                      selectedImageIndex === i
                        ? "border-red-600 ring-2 ring-red-600/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={`${IMAGE_BASE}/${num}.png`}
                      alt={`${PRODUCT_NAME} ${num}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-700 leading-relaxed mb-6">
                Kaskoair جهاز ذكي صغير يتركب على السيارة ويخلّصك من الكيبلات والربط المزعج. وكل مرة تركب السيارة الاتصال يصير تلقائي.
              </p>
              <p className="font-semibold text-slate-900 mb-2">الجهاز:</p>
              <ul className="space-y-2 text-slate-700 mb-4">
                {valuePoints.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-600">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-slate-700 mb-8">يعني استخدام أرتب وقيادة أهدأ بدون تعقيد.</p>
              <button
                onClick={scrollToOrder}
                className="rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
                خلّي الاتصال يصير أسهل
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Benefits */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            ليش Kaskoair عملي ومفيد
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center hover:border-red-200 hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-3"><b.Icon /></div>
                <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToOrder}
              className="rounded-xl bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-500 transition-colors"
            >
              جرّب الراحة اللاسلكية
            </button>
          </div>
        </div>
      </section>

      {/* 4 — Features */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            شنو يقدملك Kaskoair
          </h2>
          <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
            <ul className="space-y-3 text-slate-700">
              {features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-600">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="text-center mt-8">
              <button
                onClick={scrollToOrder}
                className="rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
                اخذ كل الميزات هسه
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Social proof */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            ليش المستخدمين مرتاحين وياه
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <StarRating rating={r.stars} className="mb-3" />
                <p className="text-slate-700 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm text-slate-500">{r.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToOrder}
              className="rounded-xl bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-500 transition-colors"
            >
              انضم لتجربة المستخدمين
            </button>
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
            قبل ما تطلب خلّي نوضحلك
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-right font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {faq.q}
                  <span
                    className={`text-slate-500 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-out ${
                    openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={scrollToOrder}
              className="rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
            >
              تواصل ويانه وخلي شاشة سيارتك اذكى
            </button>
          </div>
        </div>
      </section>

      {/* 7 — Final CTA + Order */}
      <section
        ref={orderRef}
        className="py-16 md:py-24 px-4 md:px-8 bg-black text-white"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            خلّي الاتصال يصير أسهل بدون كيبل
          </h2>
          <p className="text-gray-300 mb-8">
            اطلب Kaskoair الآن — CarPlay و Android Auto وايرلس وتركيب مباشر.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleOrderAndGoToCart}
              className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg"
            >
              اطلب Kaskoair هسه
            </button>
            <Link
              href="/cart"
              className="rounded-2xl border-2 border-white px-8 py-4 text-lg font-bold hover:bg-white/10 transition-colors"
            >
              عرض السلة
            </Link>
          </div>
          <p className="mt-6 text-gray-400 text-sm">
            السعر: {formatCurrency(PRODUCT_PRICE)} — توصيل لجميع أنحاء العراق
          </p>
        </div>
      </section>
    </div>
  );
}
