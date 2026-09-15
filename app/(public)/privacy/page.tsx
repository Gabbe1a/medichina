import type { Metadata } from "next";
import { getPage } from "@/lib/queries";

export const metadata: Metadata = { title: "Политика ПДн" };

export default async function PrivacyPage() {
  const page = await getPage("privacy");

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-navy">{page?.title}</h1>
      <div className="prose-clinic mt-6 whitespace-pre-line">{page?.body}</div>
      <p className="mt-6">
        <a className="font-bold text-accent" href="/media/legal/politika_personalnyh_dannyh.pdf">
          Скачать полный PDF
        </a>
      </p>
    </div>
  );
}
