"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="كاسكو" 
              className="h-16 w-auto transition-transform group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
