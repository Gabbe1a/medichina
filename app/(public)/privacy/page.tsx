import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { getPage } from "@/lib/queries";

export const metadata: Metadata = { title: "Политика ПДн" };

export default async function PrivacyPage() {
  const page = await getPage("privacy");
  const legalPath = path.join(process.cwd(), "content", "intake", "LEGAL.md");
  const legalText = fs.existsSync(legalPath) ? fs.readFileSync(legalPath, "utf8") : page?.body;

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-5xl">{page?.title ?? "Политика ПДн"}</h1>
        <div className="prose-clinic mt-6 whitespace-pre-line">{legalText}</div>
      </div>
      <p className="mt-6">
        <a className="font-bold text-chocolate underline hover:text-accent" href="/media/legal/politika_personalnyh_dannyh.pdf">
          Скачать полный PDF
        </a>
      </p>
    </div>
  );
}
