import type { Metadata } from "next";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = { title: "Вопросы и ответы" };

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Пациентам</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">Частые вопросы</h1>
      </div>
      <div className="mt-8 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.id} className="rounded-xl border border-[#eae3d9] bg-white px-5 py-4 shadow-2xs">
            <summary className="cursor-pointer font-bold text-navy hover:text-accent transition-colors">{faq.question}</summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
