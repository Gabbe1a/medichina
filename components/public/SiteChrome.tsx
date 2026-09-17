import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { CookieBanner } from "@/components/public/CookieBanner";
import { Metrika } from "@/components/public/Metrika";
import { SeoJsonLd } from "@/components/public/SeoJsonLd";
import { getFaqs, getSettings, getTopServices } from "@/lib/queries";
import { headers } from "next/headers";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, services, faqs, headerList] = await Promise.all([
    getSettings(),
    getTopServices(),
    getFaqs(),
    headers(),
  ]);
  const path = headerList.get("x-pathname") || "/";

  return (
    <div className="site-public min-h-screen text-ink">
      <SeoJsonLd path={path} settings={settings} faqs={faqs} />
      <Metrika counter={settings.metrika} />
      <Header services={services} phone={settings.phone1} />
      <main className="py-4">{children}</main>
      <Footer settings={settings} />
      <CookieBanner />
    </div>
  );
}
