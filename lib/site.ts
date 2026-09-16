export function publicSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured && !configured.includes("localhost") && !configured.includes("127.0.0.1")) {
    return configured;
  }
  return "http://94.249.239.210:8091";
}

export function absoluteUrl(path = "/") {
  const base = publicSiteUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_NAME = "Стоматология «Один к Одному»";
export const DEFAULT_TITLE = "Стоматология «Один к Одному» на Войковской";
export const DEFAULT_DESCRIPTION =
  "Клиника «Один к Одному» у метро Войковская: диагностика, лечение, имплантация и протезирование. Рейтинг 4.9 на Яндексе.";
export const OG_IMAGE = "/images/hero-clean.webp";
