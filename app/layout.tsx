import { Manrope } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
