"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { IconMonitor, IconZap, IconUsers, IconPhone, StarRating } from "@/components/landing-icons";
import { formatCurrency } from "@/lib/products";
import { trackAddToCart, trackViewContent } from "@/lib/pixels";

const PRODUCT_ID = "hud-128gb";
const PRODUCT_NAME = "HUD 128GB";
const PRODUCT_PRICE = 229000;
const PRODUCT_IMAGES = ["01", "02", "03", "04", "05"];
const IMAGE_BASE = "/images/Hud128%20GB";

export default function Hud128Landing() {
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
    "يشتغل بنظام أندرويد مستقل",
    "ما يعتمد على الموبايل",
    "يشغل الشاشة الأمامية والخلفية بنفس الوقت",
    "مثالي للسيارات العائلية والفئات الكبيرة",
  ];

  const benefits = [
    { title: "تشغيل الشاشات الخلفية", desc: "منفذ HDMI مخصص حتى تشغل الشاشات الخلفية بدون أجهزة إضافية", Icon: IconMonitor },
    { title: "أداء أعلى وثبات أطول", desc: "معالج أقوى من Plus 128GB حتى يضمن سلاسة حتى مع الاستخدام المكثف", Icon: IconZap },
    { title: "راحة للعائلة بالسفر", desc: "يوتيوب نتفلكس كرتون للأطفال والشاشة الأمامية تبقى مستقلة", Icon: IconUsers },
    { title: "أندرويد كامل بدون قيود", desc: "تحميل تطبيقات تشغيل فيديو خرائط IPTV", Icon: IconPhone },
  ];

  const specs = [
    "نظام أندرويد 13",
    "Snapdragon 6225 — معالج أعلى من Plus 128GB",
    "RAM 8GB",
    "تخزين داخلي 128GB",
    "منفذ HDMI لتشغيل الشاشات الخلفية",
    "WiFi • Bluetooth • GPS",
    "دعم شريحة SIM",
    "CarPlay و Android Auto لاسلكي",
    "يعمل بدون أي تعديل على السيارة",
  ];

  const extraFeatures = [
    "انعكاس شاشة الهاتف بالكامل على شاشة السيارة",
    "تشغيل Android Auto و CarPlay وايرلس بدون كيبل",
    "تقسيم الشاشة إلى نصفين وتشغيل أكثر من تطبيق بنفس الوقت",
  ];

  const reviews = [
    { stars: 5, text: "أخيرًا جهاز يشغل الشاشات الخلفية بدون تعقيد. الأطفال يتابعون والقيادة مريحة.", name: "عميل من بغداد" },
    { stars: 5, text: "مثالي للسفر مع العائلة. الشاشات الخلفية اشتغلت من أول تركيب.", name: "عميل من البصرة" },
    { stars: 5, text: "أداء ثابت حتى مع الفيديو والخرائط بنفس الوقت. جهاز يستاهل.", name: "عميل من أربيل" },
  ];

  const faqs = [
    {
      q: "هل يشتغل بكل السيارات ؟",
      a: "يشتغل على أي سيارة تدعم Apple CarPlay أو Android Auto",
    },
    { q: "هل يحتاج فك أو برمجة ؟", a: "لا تركيب مباشر" },
    {
      q: "هل فعليًا يشغل الشاشات الخلفية ؟",
      a: "نعم عن طريق منفذ HDMI مخصص",
    },
    {
      q: "شنو الفرق بينه وبين Plus 128GB ؟",
      a: "HUD نفس المواصفات تقريبًا لكن مع معالج أقوى وميزة تشغيل الشاشات الخلفية",
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
        <span className="text-white font-bold text-lg">HUD 128GB</span>
        <button
          onClick={scrollToOrder}
          className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500 transition-colors"
        >
          اطلب HUD 128GB
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
            أندرويد كامل للسيارة
            <br />
            <span className="text-red-400">مع تشغيل الشاشات الخلفية</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            HUD 128GB جهاز أندرويد متكامل بمعالج قوي ومنفذ HDMI مخصص يشغّل الشاشات الخلفية في سيارات التاهو والجمسي والكاديلاك ويمنحك تجربة استخدام سلسة بدون أي تعديل على السيارة.
          </p>
          <button
            onClick={handleOrder}
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg shadow-red-600/30"
          >
            اطلب HUD 128GB
          </button>
        </div>
      </section>

      {/* 2 — Value proposition */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-4">
            إذا سيارتك بيها شاشة وشاشات خلفية هذا هو الحل الصح
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
                HUD 128GB جهاز أندرويد متكامل يتركب على سيارتك ويحوّل الشاشة الأمامية لنظام أندرويد كامل ويمتاز بمنفذ HDMI يخليك تشغل الشاشات الخلفية بنفس الوقت. يعني الأشخاص يتفرجون وانت تسوق براحتك.
              </p>
              <p className="font-semibold text-slate-900 mb-2">الجهاز:</p>
              <ul className="space-y-2 text-slate-700 mb-8">
                {valuePoints.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-600">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToOrder}
                className="rounded-xl bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
                اختَر الحل العائلي الذكي
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Benefits */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            ليش HUD 128GB هو الخيار الأقوى
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
              حوّل سيارتك لتجربة عائلية متكاملة
            </button>
          </div>
        </div>
      </section>

      {/* 4 — Specs & features */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            مواصفات HUD 128GB
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
              <button
                onClick={scrollToOrder}
                className="mt-6 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                شوف القوة الحقيقية للجهاز
              </button>
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
            ليش أصحاب السيارات الكبيرة يختارونه
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
              انضم لتجارب المستخدمين
            </button>
          </div>
        </div>
      </section>

      {/* 6 — FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
            قبل ما تطلب خلّي نجاوبك
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
              تواصل ويانا إذا تحب تاخذ الجهاز لسيارتك
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
            خلّي تجربة القيادة ممتعة للجميع
          </h2>
          <p className="text-gray-300 mb-8">
            اطلب HUD 128GB الآن — أندرويد كامل مع تشغيل الشاشات الخلفية لسيارتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleOrderAndGoToCart}
              className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white hover:bg-red-500 transition-all hover:scale-105 shadow-lg"
            >
              اطلب HUD 128GB
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
