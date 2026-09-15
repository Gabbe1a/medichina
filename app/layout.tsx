import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://superdentos.ru"),
  title: {
    default: "Стоматология «Один к Одному» на Войковской",
    template: "%s — Один к Одному",
  },
  description:
    "Клиника «Один к Одному» у метро Войковская: диагностика, лечение, имплантация и протезирование. Рейтинг 4.9 на Яндексе.",
  icons: {
    icon: "/media/logos/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
