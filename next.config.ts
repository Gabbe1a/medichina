import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/speczialistyi", destination: "/doctors", permanent: true },
      { source: "/stomatologiya_na_voykovskoy/speczialistyi", destination: "/doctors", permanent: true },
      { source: "/stomatologiya_na_voykovskoy", destination: "/about", permanent: true },
      { source: "/stomatologiya_na_voykovskoy/fotogalereya", destination: "/about", permanent: true },
      { source: "/stomatologiya_na_voykovskoy/oficzialnaya_informacziya", destination: "/legal", permanent: true },
      { source: "/paczientam/otzyivyi", destination: "/reviews", permanent: true },
      { source: "/paczientam/faq", destination: "/patients/faq", permanent: true },
      { source: "/paczientam", destination: "/patients/faq", permanent: true },
      { source: "/price_ooo_noli_nocere", destination: "/prices", permanent: true },
      { source: "/nashi_czenyi", destination: "/prices", permanent: true },
      { source: "/ceny", destination: "/prices", permanent: true },
      { source: "/cat", destination: "/services", permanent: true },
      { source: "/cat/:path*", destination: "/services/:path*", permanent: false },
      { source: "/apple-touch-icon.png", destination: "/apple-touch-icon.webp", permanent: true },
      { source: "/media/:path*.jpg", destination: "/media/:path*.webp", permanent: true },
      { source: "/media/:path*.jpeg", destination: "/media/:path*.webp", permanent: true },
      { source: "/media/:path*.png", destination: "/media/:path*.webp", permanent: true },
      { source: "/images/:path*.jpg", destination: "/images/:path*.webp", permanent: true },
      { source: "/images/:path*.jpeg", destination: "/images/:path*.webp", permanent: true },
      { source: "/images/:path*.png", destination: "/images/:path*.webp", permanent: true },
      { source: "/uploads/:path*.jpg", destination: "/uploads/:path*.webp", permanent: true },
      { source: "/uploads/:path*.jpeg", destination: "/uploads/:path*.webp", permanent: true },
      { source: "/uploads/:path*.png", destination: "/uploads/:path*.webp", permanent: true },
    ];
  },
};

export default nextConfig;
