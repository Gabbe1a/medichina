import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Акции стоматологии «Один к Одному»",
  description: "Актуальные предложения клиники «Один к Одному».",
};

const PROMOTIONS = [
  {
    label: "Для семьи",
    title: "Семейная гигиена",
    price: "19 000 ₽ за двоих",
    text: "Профессиональная гигиена для двух членов семьи в рамках одного плана профилактики.",
  },
  {
    label: "Выходной день",
    title: "Гигиена в субботу и воскресенье",
    price: "9 500 ₽ вместо 11 400 ₽",
    text: "Бережная комплексная гигиена в удобный выходной день.",
  },
  {
    label: "Белая улыбка",
    title: "Amazing White + гигиена",
    price: "29 900 ₽",
    text: "Профессиональное отбеливание и гигиена перед процедурой для ровного оттенка улыбки.",
  },
];

export default function PromotionsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-[36px] bg-gradient-to-br from-[#0a3771] via-[#0759b8] to-[#8fc8ff] p-6 text-white shadow-[0_20px_60px_rgba(0,47,108,0.18)] md:p-12">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#b9dcff]">Специальные условия</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">Акции для заботы об улыбке</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
          Выберите подходящее предложение и оставьте заявку — администратор подтвердит актуальность и подберёт время.
        </p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PROMOTIONS.map((promotion) => (
          <article key={promotion.title} className="flex min-h-[300px] flex-col justify-between rounded-[30px] bg-white p-6 shadow-sm">
            <div>
              <span className="rounded-full bg-[#edf5ff] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-accent">
                {promotion.label}
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-navy">{promotion.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{promotion.text}</p>
            </div>
            <div>
              <p className="text-xl font-black text-accent">{promotion.price}</p>
              <p className="mt-2 text-[11px] text-muted">Предложения не суммируются с другими скидками.</p>
              <Link href="/contacts#zapis" className="mt-5 inline-flex rounded-full bg-navy px-5 py-3 text-xs font-bold text-white transition hover:bg-accent">
                Записаться →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
