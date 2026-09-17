import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пациентам — полезная информация",
  description: "Ответы на вопросы, акции и полезная информация для пациентов клиники.",
};

const LINKS = [
  ["Частые вопросы", "Ответы об анестезии, диагностике, лечении и восстановлении.", "/patients/faq"],
  ["Акции клиники", "Актуальные предложения на профилактику и лечение.", "/akcii"],
  ["Отзывы пациентов", "Реальные оценки, видеоистории и клинические случаи.", "/reviews"],
  ["Записаться на приём", "Подберём удобное время и ответим на вопросы.", "/contacts#zapis"],
];

export default function PatientsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Пациентам</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">Всё важное перед визитом</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-[17px]">
          Собрали в одном месте ответы, предложения клиники и способы быстро связаться с администратором.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {LINKS.map(([title, text, href]) => (
          <Link key={href} href={href} className="group rounded-xl border border-[#eae3d9] bg-white p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-chocolate hover:shadow-xs">
            <h2 className="text-xl font-extrabold text-navy group-hover:text-accent transition-colors">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-chocolate">Перейти →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
