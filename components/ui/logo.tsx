"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Logo({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const detect = () => {
      try {
        // Prefer explicit class on html element (used by theme toggle)
        const html = document.documentElement;
        if (html.classList.contains("dark")) return true;

        // Then check localStorage theme preference if set
        const stored = localStorage.getItem("theme");
        if (stored) return stored === "dark";

        // Fallback to system preference
        return (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      } catch {
        return false;
      }
    };

    // initial
    setIsDark(detect());

    // Observe changes to the html element's class attribute (theme toggle toggles a class)
    const htmlEl = document.documentElement;
    const mo = new MutationObserver(() => {
      setIsDark(detect());
    });
    mo.observe(htmlEl, { attributes: true, attributeFilter: ["class"] });

    // Also listen for storage events (theme changed in another tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") setIsDark(detect());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mo.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Select source based on theme; prefer a dark-specific asset when in dark mode
  const src = isDark ? "/images/logo_dark.webp" : "/images/logo_light.webp";

  return (
    <Link href='/' className={"flex items-center gap-3 " + (className || "")}>
      <div className='h-8'>
        <Image
          src={src}
          alt='TecNoBand'
          width={120}
          height={32}
          priority={false}
          onError={(e) => {
            // If the chosen variant fails to load, fall back to the default logo.webp
            const img = e.currentTarget as HTMLImageElement;
            if (
              img &&
              img.src &&
              !img.src.endsWith("/images/logo_light.webp")
            ) {
              img.src = "/images/logo_light.webp";
            }
          }}
        />
      </div>
    </Link>
  );
}
