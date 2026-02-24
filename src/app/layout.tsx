import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import AppShell from "@/components/app-shell";
import MetaPixelLoader from "@/components/meta-pixel-loader";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "كاسكو | متجر عراقي للمنتجات المتنوعة",
  description:
    "متجر كاسكو يقدم تجربة شراء سهلة داخل العراق مع خيارات دفع مريحة وتوصيل سريع.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "كاسكو | متجر عراقي للمنتجات المتنوعة",
    description:
      "متجر كاسكو يقدم تجربة شراء سهلة داخل العراق مع خيارات دفع مريحة وتوصيل سريع.",
    type: "website",
    locale: "ar_IQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="ar-IQ" dir="rtl">
      <body
        className={`${cairo.variable} ${geistMono.variable} antialiased`}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <MetaPixelLoader pixelId={metaPixelId} />
        ) : null}
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
