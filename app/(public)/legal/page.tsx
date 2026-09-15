import type { Metadata } from "next";
import { getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Официальная информация" };

export default async function LegalPage() {
  const [page, settings] = await Promise.all([getPage("legal"), getSettings()]);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-navy">{page?.title}</h1>
      <div className="prose-clinic mt-6 whitespace-pre-line">{page?.body}</div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <img src="/media/legal/license_1.webp" alt="Лицензия клиники, страница 1" className="rounded-[24px]" />
        <img src="/media/legal/license_2.webp" alt="Лицензия клиники, страница 2" className="rounded-[24px]" />
      </div>
      <p className="mt-6 text-sm text-muted">{settings.receptionNote}</p>
    </div>
  );
}
