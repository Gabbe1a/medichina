"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("oko_cookie_ok");
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-[#eae3d9] bg-white/95 p-4 shadow-md backdrop-blur-xs md:bottom-5 md:right-5">
      <p className="text-xs leading-5 text-muted">
        Мы используем cookie для аналитики и корректной работы сайта. Подробнее — в{" "}
        <a className="font-semibold text-chocolate underline" href="/privacy">
          политике ПДн
        </a>
        .
      </p>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-chocolate px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light cursor-pointer"
          onClick={() => {
            window.localStorage.setItem("oko_cookie_ok", "1");
            setVisible(false);
          }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
