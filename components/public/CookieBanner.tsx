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
    <div className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-3xl rounded-[22px] border border-white/80 bg-white/95 p-3 shadow-[0_16px_40px_rgba(0,47,108,0.15)] md:bottom-4 md:left-4 md:right-4 md:rounded-[28px] md:p-5">
      <p className="text-xs leading-5 text-muted md:text-sm md:leading-6">
        Продолжая пользоваться сайтом, вы соглашаетесь на обработку cookie и данных
        Яндекс.Метрики для аналитики. Отключить это можно в настройках браузера. Подробнее — в{" "}
        <a className="font-semibold text-accent" href="/privacy">
          политике ПДн
        </a>
        .
      </p>
      <button
        type="button"
        className="mt-2 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white md:mt-3 md:text-sm"
        onClick={() => {
          window.localStorage.setItem("oko_cookie_ok", "1");
          setVisible(false);
        }}
      >
        Понятно
      </button>
    </div>
  );
}
