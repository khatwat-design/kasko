import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addOrderToGoogleSheets } from "@/lib/google-sheets";

export const runtime = "nodejs";

type OrderPayload = {
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  summary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
    totalItems: number;
  };
  channel?: string;
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const REQUIRED_FIELDS = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHANNEL_ID",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ar-IQ", {
    style: "currency",
    currency: "IQD",
    maximumFractionDigits: 0,
  }).format(amount);

const buildTelegramMessage = (payload: OrderPayload, invoiceId: string) => {
  const itemsText = payload.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} — ${item.quantity} × ${formatCurrency(
          item.price,
        )} = ${formatCurrency(item.subtotal)}`,
    )
    .join("\n");

  const message = [
    `🛍️ طلب جديد من متجر كاسكو 🏪`,
    `📋 رقم الفاتورة: ${invoiceId}`,
    `👤 اسم العميل: ${payload.customer.name}`,
    `📱 رقم الهاتف: ${payload.customer.phone}`,
    `📍 المدينة: ${payload.customer.city}`,
    `🏠 العنوان: ${payload.customer.address}`,
    `💳 طريقة الدفع: ${payload.customer.paymentMethod || "الدفع عند الاستلام"}`,
    `📝 ملاحظات: ${payload.customer.notes || "لا توجد ملاحظات"}`,
    "",
    "🛒 تفاصيل الطلب:",
    itemsText,
    "",
    `💰 المجموع الفرعي: ${formatCurrency(payload.summary.subtotal)}`,
    `🚚 رسوم التوصيل: ${formatCurrency(payload.summary.deliveryFee)}`,
    `💵 الإجمالي: ${formatCurrency(payload.summary.total)}`,
    `📦 عدد المنتجات: ${payload.summary.totalItems}`,
    "",
    `🔗 القناة: ${payload.channel || "الموقع الإلكتروني"}`,
    `📅 التاريخ: ${new Date().toLocaleDateString('ar-IQ')} ${new Date().toLocaleTimeString('ar-IQ')}`,
  ].join("\n");

  return message;
};

const sendTelegramMessage = async (payload: OrderPayload, invoiceId: string) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
    return { ok: false, reason: "missing_telegram_config" };
  }

  const message = buildTelegramMessage(payload, invoiceId);
  
  // استخدام FormData لحل مشكلة الترميز العربي
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHANNEL_ID);
  formData.append('text', message);
  
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Telegram] sendMessage failed:", response.status, errorText);
    return { ok: false, reason: errorText || "telegram_request_failed" };
  }

  return { ok: true };
};

export async function POST(request: Request) {
  try {
    const missing = REQUIRED_FIELDS.filter((field) => !process.env[field]);
    if (missing.length) {
      return NextResponse.json(
        {
          message: "إعدادات التكامل غير مكتملة.",
          missing,
        },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as OrderPayload;

    if (!payload?.customer?.name || !payload?.items?.length) {
      return NextResponse.json(
        { message: "بيانات الطلب غير مكتملة." },
        { status: 400 },
      );
    }

    const invoiceId = randomUUID().slice(0, 8).toUpperCase();
    const telegramResult = await sendTelegramMessage(payload, invoiceId);

    if (!telegramResult.ok) {
      const reason = typeof telegramResult.reason === "string" ? telegramResult.reason : "";
      console.error("[Checkout] Telegram error:", reason);
      const isForbidden = /chat not found|have no rights|not found|unauthorized|wrong token/i.test(reason);
      const hint = isForbidden
        ? "تأكد أن البوت مضاف للقناة كمسؤول (Admin) ولديه صلاحية نشر الرسائل."
        : "";
      return NextResponse.json(
        {
          message: hint
            ? `تعذر إرسال الطلب عبر تلجرام. ${hint}`
            : "تعذر إرسال الطلب عبر تلجرام حالياً.",
        },
        { status: 502 },
      );
    }

    // إضافة الطلب إلى Google Sheets
    try {
      await addOrderToGoogleSheets({
        ...payload,
        invoiceId
      });
    } catch (error) {
      console.error('Failed to add order to Google Sheets:', error);
    }

    return NextResponse.json({
      message: "تم استلام طلبك بنجاح.",
      invoiceId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر معالجة الطلب حالياً." },
      { status: 500 },
    );
  }
}
