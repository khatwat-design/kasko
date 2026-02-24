"use client";

import Script from "next/script";

declare global {
  interface Window {
    fbq?: (action: string, ...args: unknown[]) => void;
  }
}

type Props = { pixelId: string };

/**
 * Loads Meta (Facebook) Pixel and fires PageView after the SDK is ready.
 * Using onLoad ensures events fire reliably instead of relying on the queue.
 */
export default function MetaPixelLoader({ pixelId }: Props) {
  const handleLoad = () => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  };

  return (
    <>
      <Script
        id="meta-pixel-sdk"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
      />
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
