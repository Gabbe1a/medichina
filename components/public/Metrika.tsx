"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  }
}

export function Metrika({ counter }: { counter: string }) {
  useEffect(() => {
    if (!counter || window.ym) return;

    const init = () => {
      const ym = ((...args: unknown[]) => {
        (ym.a ||= []).push(args);
      }) as NonNullable<Window["ym"]>;
      ym.l = Date.now();
      window.ym = ym;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(script);
      ym(Number(counter), "init", {
        clickmap: false,
        accurateTrackBounce: true,
        trackLinks: true,
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = idleWindow.requestIdleCallback?.(init, { timeout: 4000 });
    const timeoutId = idleId === undefined ? window.setTimeout(init, 2500) : undefined;

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [counter]);

  if (!counter) return null;
  return (
    <noscript>
      <div>
        <img src={`https://mc.yandex.ru/watch/${counter}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
      </div>
    </noscript>
  );
}
