import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { CookieBanner } from "@/components/public/CookieBanner";
import { Metrika } from "@/components/public/Metrika";
import { getSettings, getTopServices } from "@/lib/queries";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getTopServices()]);

  return (
    <div className="min-h-screen">
      <Metrika counter={settings.metrika} />
      <Header services={services} phone={settings.phone1} />
      <main>{children}</main>
      <Footer settings={settings} />
      <CookieBanner />
    </div>
  );
}
