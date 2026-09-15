import type { Metadata } from "next";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = { title: "Вопросы и ответы" };

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Пациентам</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">Частые вопросы</h1>
      <div className="mt-8 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.id} className="rounded-[24px] bg-white px-5 py-4">
            <summary className="cursor-pointer font-bold text-navy">{faq.question}</summary>
            <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
