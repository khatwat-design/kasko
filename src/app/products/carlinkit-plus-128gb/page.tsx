"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { IconZap, IconDatabase, IconTarget, IconRadio, StarRating } from "@/components/landing-icons";
import { formatCurrency } from "@/lib/products";
import { trackAddToCart, trackViewContent } from "@/lib/pixels";

const PRODUCT_ID = "carlinkit-plus-128gb";
const PRODUCT_NAME = "Carlinkit Plus 128GB";
const PRODUCT_IMAGES = ["01", "02", "03", "04", "05"];
const IMAGE_BASE = "/images/Carlinket%20Plus%20128GB";

export default function CarlinkitPlus128Landing() {
  const orderRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    trackViewContent({ id: PRODUCT_ID, name: PRODUCT_NAME, price: 200000, category: "إلكترونيات السيارات", quantity: 1 });
  }, []);

  const handleBuyNow = () => {
    addItem(PRODUCT_ID);
    trackAddToCart({
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      price: 200000,
      category: "إلكترونيات السيارات",
      quantity: 1,
    });
    router.push("/checkout");
  };

  const benefits = [
    { title: "أداء أعلى وثبات أطول", desc: "معالج Snapdragon 6125 لتجربة أسرع", Icon: IconZap },
    { title: "مساحة تخزين كبيرة", desc: "128GB تخليك تحمل كل الي تحتاجه بدون قلق", Icon: IconDatabase },
    { title: "استخدام احترافي", desc: "مناسب للسفر والاستخدام المكثف", Icon: IconTarget },
    { title: "دعم SIM وذاكرة خارجية", desc: "اتصال إنترنت دائم بدون ربط موبايل", Icon: IconRadio },
  ];

  const specs = [
    "Android 13",
    "معالج Snapdragon 6125",
    "RAM 8GB",
    "تخزين داخلي 128GB",
    "منفذ SIM",
    "منفذ SD Card",
    "WiFi • Bluetooth • GPS",
    "يدعم CarPlay و Android Auto لاسلكي",
  ];

  const extraFeatures = [
    "انعكاس شاشة الهاتف بالكامل على شاشة السيارة",
    "تشغيل Android Auto و CarPlay وايرلس بدون كيبل",
    "تقسيم الشاشة إلى نصفين وتشغيل أكثر من تطبيق بنفس الوقت",
  ];

  const reviews = [
    { stars: 5, text: "فرق الأداء واضح خصوصًا مع الفيديو والخرائط، الجهاز ما يتهنيگ حتى بالاستخدام الطويل.", name: "عميل من بغداد" },
    { stars: 5, text: "أفضل خيار للسفر والعائلة — التطبيقات كلها اشتغلت والبطارية كويسة.", name: "عميل من البصرة" },
    { stars: 5, text: "أقرب تجربة لتابلت أندرويد داخل السيارة، توصيل سريع وتركيب سهل.", name: "عميل من الموصل" },
  ];

  const faqs = [
    {
      q: "هل الفرق يستاهل ؟",
      a: "نعم إذا تستخدم الجهاز بشكل مكثف",
    },
    {
      q: "هل يشتغل بكل السيارات ؟",
      a: "نعم على أي شاشة تدعم CarPlay أو Android Auto",
    },
    {
      q: "هل يدعم الشاشات الخلفية ؟",
      a: "هذه الميزة متوفرة أكثر بنسخة HUD",
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
        <span className="text-white font-bold text-lg">Carlinkit Plus 128GB</span>
        <button
          onClick={handleBuyNow}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500 transition-colors"
        >
          اشتري الآن
        </button>
      </div>

      {/* 1 — Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 md:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            أقصى قوة أقصى سلاسة
            <br />
            <span className="text-red-400">الأندرويد الكامل داخل سيارتك</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Carlinkit Plus 128GB مخصص للي يريد أعلى أداء، تخزين أكبر، وتجربة أندرويد بدون أي تنازلات.
          </p>
          <button
            onClick={handleBuyNow}
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg shadow-red-600/30"
          >
            اشتري الآن
          </button>
        </div>
      </section>

      {/* 2 — Value proposition */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-4">
            إذا تريد الأفضل هذا هو الأفضل
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-4">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-gray-200 shadow-2xl">
                <Image
                  key={selectedImageIndex}
                  src={`${IMAGE_BASE}/${PRODUCT_IMAGES[selectedImageIndex]}.png`}
                  alt={PRODUCT_NAME}
                  fill
                  className="object-cover transition-opacity duration-200"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
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
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-700 leading-relaxed mb-6">
                نسخة Plus 128GB هي النسخة الأقوى من Carlinkit مصممة للي يستخدم الجهاز بشكل مكثف: تطبيقات أكثر، فيديو، خرائط، تشغيل طويل بدون تهنيگ.
              </p>
              <p className="font-semibold text-slate-900 mb-2">هذا الجهاز:</p>
              <ul className="space-y-2 text-slate-700 mb-8">
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  يشتغل كنظام أندرويد مستقل
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  ما يعتمد على الموبايل
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  يخلي شاشة سيارتك منصة ذكية متكاملة
                </li>
              </ul>
              <button
                onClick={handleBuyNow}
                className="rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
                اشتري الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Benefits */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            ليش Plus 128GB هو الأقوى؟
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
        </div>
      </section>

      {/* 4 — Specs & features */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            المواصفات التقنية
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">المواصفات</h3>
              <ul className="space-y-2 text-slate-700">
                {specs.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-600">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">المميزات الإضافية</h3>
              <ul className="space-y-2 text-slate-700">
                {extraFeatures.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-600">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Social proof */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            ليش المستخدمين يختارون 128GB؟
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
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
            قبل ما تقرر تشتري اقرأ الأجوبة لأسئلتك
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
        </div>
      </section>

      {/* 7 — Final CTA + Order */}
      <section
        ref={orderRef}
        className="py-16 md:py-24 px-4 md:px-8 bg-black text-white"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            لا تختصر التجربة اختار القوة
          </h2>
          <p className="text-gray-300 mb-8">
            اطلب Carlinkit Plus 128GB الآن واستمتع بأقوى تجربة أندرويد في سيارتك.
          </p>
          <button
            onClick={handleBuyNow}
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg"
          >
            اشتري الآن
          </button>
          <p className="mt-6 text-gray-400 text-sm">
            السعر: {formatCurrency(200000)} — توصيل لجميع أنحاء العراق
          </p>
        </div>
      </section>
    </div>
  );
}
