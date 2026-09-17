import type { Metadata } from "next";
import Image from "next/image";
import { getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Официальная информация" };

export default async function LegalPage() {
  const [page, settings] = await Promise.all([getPage("legal"), getSettings()]);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-5xl">{page?.title}</h1>
        <div className="prose-clinic mt-6 whitespace-pre-line">{page?.body}</div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Image src="/media/legal/license_1.webp" alt="Лицензия клиники, страница 1" width={1240} height={1754} sizes="(max-width: 768px) 100vw, 50vw" className="rounded-xl border border-[#eae3d9]" />
          <Image src="/media/legal/license_2.webp" alt="Лицензия клиники, страница 2" width={1240} height={1754} sizes="(max-width: 768px) 100vw, 50vw" className="rounded-xl border border-[#eae3d9]" />
        </div>
        <p className="mt-6 text-sm text-muted">{settings.receptionNote}</p>
      </div>
    </div>
  );
}
