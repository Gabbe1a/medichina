"use client";

import { useState } from "react";
import Image from "next/image";

type CaseData = {
  id: string;
  tab: string;
  title: string;
  patient: string;
  problem: string;
  solution: string[];
  quote: string;
};

const CASES: CaseData[] = [
  {
    id: "aesthetic",
    tab: "Эстетическая реставрация",
    title: "Улыбка Кристины: преображение винирами",
    patient: "Кристина, 29 лет",
    problem:
      "Пациентка обратилась с жалобой на диастему (щель между зубами), неровный режущий край и неравномерный цвет эмали. Хотелось естественную, открытую улыбку без искусственной белизны.",
    solution: [
      "Цифровое планирование улыбки Digital Smile Design с 3D-примеркой",
      "Микропрепарирование в пределах эмали с сохранением жизнеспособности зубов",
      "Установка 8 ультратонких полевошпатных виниров E-max",
      "Финальная полировка и подбор домашнего ухода",
    ],
    quote: "«Улыбка стала именно моей — естественной, гармоничной и по-настоящему уверенной.»",
  },
  {
    id: "ortho",
    tab: "Ортодонтия",
    title: "Коррекция скученности элайнерами",
    patient: "Максим, 34 года",
    problem:
      "Скученность нижних резцов и сужение верхней челюсти. Пациент категорически отказывался от видимых металлических брекетов из-за публичной работы.",
    solution: [
      "3D-сканирование челюстей и виртуальный сетап перемещения зубов",
      "Курс из 18 пар индивидуальных прозрачных капп",
      "Гнатологическая сплинт-терапия для стабилизации височно-нижнечелюстного сустава",
      "Установка несъёмного ретейнера на внутреннюю поверхность",
    ],
    quote: "«Никто из коллег даже не замечал каппы во время важных встреч и переговоров.»",
  },
  {
    id: "implant",
    tab: "Имплантация",
    title: "Одномоментная имплантация жевательного зуба",
    patient: "Елена, 42 года",
    problem:
      "Вертикальный перелом корня ранее депульпированного зуба, невозможность повторного терапевтического лечения.",
    solution: [
      "Атравматичное удаление корней с сохранением костных стенок лунки",
      "Одномоментная установка имплантата Astra Tech с немедленной нагрузкой",
      "Мягкотканная аугментация для создания плотного десневого валика",
      "Фиксация циркониевой коронки с винтовой фиксацией",
    ],
    quote: "«Процедура прошла за один визит, без боли и без долгого ожидания приживления.»",
  },
  {
    id: "whitening",
    tab: "Отбеливание",
    title: "Клиническое бережное отбеливание Zoom 4",
    patient: "Дарья, 26 лет",
    problem:
      "Потемнение эмали из-за кофе и табака, страх перед повышенной чувствительностью зубов после процедуры.",
    solution: [
      "Ультразвуковая чистка и полировка Air-Flow перед процедурой",
      "Изоляция десен жидким коффердамом и нанесение защитного геля Relief",
      "Три 15-минутные сессии холодного светодиодного отбеливания",
      "Глубокое фторирование эмали и индивидуальные капы для домашней поддержки",
    ],
    quote: "«Зубы стали светлее на 7 тонов, при этом никакой стреляющей боли или дискомфорта!»",
  },
];

export function BeforeAfterInteractive() {
  const [activeTab, setActiveTab] = useState("aesthetic");
  const [sliderPos, setSliderPos] = useState(50);
  const activeCase = CASES.find((c) => c.id === activeTab) || CASES[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-10">
      {/* Header */}
      <div className="text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
          Клинические случаи
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
          Реальные улыбки. Реальные истории
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-[17px]">
          Наглядный результат работы наших врачей: фотографии до и после лечения, клинический протокол и отзывы пациентов.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-[#eae3d9] pb-4">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveTab(c.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === c.id
                ? "bg-chocolate text-white shadow-2xs"
                : "bg-transparent text-navy hover:bg-[#f6f1ea] hover:text-chocolate"
            }`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      {/* Grid: 3 columns */}
      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_1.1fr_0.8fr]">
        {/* Left: description */}
        <div>
          <span className="rounded-full bg-[#e8f2ff] px-3 py-1 text-[11px] font-bold text-accent">
            {activeCase.patient}
          </span>
          <h3 className="mt-3 text-2xl font-bold text-navy md:text-3xl">
            {activeCase.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {activeCase.problem}
          </p>

          <div className="mt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
              Что было сделано:
            </h4>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-muted">
              {activeCase.solution.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent text-[9px] font-bold text-white">
                    ✓
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center: interactive before/after slider */}
        <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-[28px] border-2 border-white shadow-xl">
          {/* After image (background) */}
          <Image
            src="/images/cases/case-after.webp"
            alt="После лечения"
            fill
            sizes="380px"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-4 top-4 z-10 rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            После
          </span>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image
              src="/images/cases/case-before.webp"
              alt="До лечения"
              fill
              sizes="380px"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 z-10 rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              До
            </span>
          </div>

          {/* Slider divider line */}
          <div
            className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
              ↔
            </div>
          </div>

          {/* Native range slider for accessible interaction */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
            aria-label="Сравнить до и после"
          />
        </div>

        {/* Right: patient portrait & quote */}
        <div className="flex flex-col items-center rounded-[28px] bg-[#f4f8ff] p-6 text-center">
          <Image
            src="/images/cases/case-after.webp"
            alt="Улыбка пациента"
            width={112}
            height={112}
            sizes="112px"
            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
          />
          <p className="mt-4 italic text-sm text-navy font-medium">
            {activeCase.quote}
          </p>
          <div className="mt-5 border-t border-[var(--line)] pt-3 w-full text-center">
            <span className="text-xs font-bold text-muted">Результат лечения</span>
            <p className="text-xs text-accent font-semibold mt-0.5">Клиника «Один к Одному»</p>
          </div>
        </div>
      </div>
    </div>
  );
}
