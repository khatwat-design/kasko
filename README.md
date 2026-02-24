# متجر كاسكو

نسخة متجر إلكتروني مخصصة لعميل كاسكو — بدون لوحة إدارة. تشغيل المتجر فقط مع ربط تلجرام، Google Sheets، وبكسل فيسبوك.

## التشغيل

```bash
npm install
npm run dev
```

يفتح الموقع على `http://localhost:3000`.

## الإعدادات (البيئة)

1. انسخ `ENV_EXAMPLE.txt` إلى `.env.local`.
2. عدّل المتغيرات:
   - **TELEGRAM_BOT_TOKEN** و **TELEGRAM_CHANNEL_ID**: لإرسال الطلبات إلى قناة/مجموعة تلجرام.
   - **GOOGLE_APPS_SCRIPT_URL**: رابط Web App من Google Apps Script لحفظ الطلبات في Google Sheet.
   - **NEXT_PUBLIC_GA_ID**: (اختياري) معرف Google Analytics.
   - **NEXT_PUBLIC_META_PIXEL_ID**: (اختياري) معرف بكسل فيسبوك/ميتا.

## الشعار والمنتجات

- **الشعار**: ضع شعار كاسكو في `public/images/logo.png`.
- **المنتجات**: عدّل `data/products.json` — أضف أو عدّل المنتجات (id, name, description, price, badge, category, image). ضع صور المنتجات في `public/products/` أو استخدم مسارات خارجية في حقل `image`.

## البناء والنشر

```bash
npm run build
npm start
```

## ملاحظات

- لا توجد لوحة إدارة في هذا المشروع؛ إدارة المحتوى تتم عبر تعديل `data/products.json` وملفات المشروع.
- الطلبات تُرسل إلى تلجرام وتُسجّل في Google Sheets حسب الإعدادات أعلاه.
