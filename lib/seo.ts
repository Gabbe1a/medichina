import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME, absoluteUrl, publicSiteUrl } from "@/lib/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(publicSiteUrl()),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Один к Одному",
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Клиника «Один к Одному» у метро Войковская" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/media/logos/favicon-32x32.webp",
    apple: "/apple-touch-icon.webp",
  },
};

export function pathMetadata(path: string): Metadata {
  return {
    alternates: { canonical: path || "/" },
    openGraph: { url: absoluteUrl(path) },
  };
}
