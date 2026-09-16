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
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-8">
      <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.1)] md:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{page?.title ?? "Политика ПДн"}</h1>
        <div className="prose-clinic mt-6 whitespace-pre-line">{legalText}</div>
      </div>
      <p className="mt-6">
        <a className="font-bold text-accent" href="/media/legal/politika_personalnyh_dannyh.pdf">
          Скачать полный PDF
        </a>
      </p>
    </div>
  );
}
