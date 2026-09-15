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
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_16px_40px_rgba(0,47,108,0.15)] md:p-5">
      <p className="text-sm leading-6 text-muted">
        Продолжая пользоваться сайтом, вы соглашаетесь на обработку cookie и данных
        Яндекс.Метрики для аналитики. Отключить это можно в настройках браузера. Подробнее — в{" "}
        <a className="font-semibold text-accent" href="/privacy">
          политике ПДн
        </a>
        .
      </p>
      <button
        type="button"
        className="mt-3 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white"
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
