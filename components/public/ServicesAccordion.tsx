"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ServiceItem = {
  id: string;
  title: string;
  category: string;
  desc: string;
  href: string;
  image: string;
  highlight: string;
};

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "aesthetic",
    title: "Эстетическая реставрация",
    category: "Виниры и эстетика",
    desc: "Прямые терапевтические виниры, керамика E-max и художественное восстановление анатомической формы зуба.",
    href: "/services/terapevticheskaja_stomatologija/terapevticheskie_viniry",
    image: "/images/services/aesthetic.png",
    highlight: "Восстановление природной формы за 1–2 визита без агрессивной обточки эмали.",
  },
  {
    id: "ortho",
    title: "Ортодонтия и элайнеры",
    category: "Исправление прикуса",
    desc: "Прозрачные каппы, самолигирующие брекет-системы и гнатологический контроль височно-нижнечелюстного сустава.",
    href: "/services/ortodonticheskoe_lechenie/ortodonticheskoe_ispravlenie_prikusa",
    image: "/images/services/ortho.png",
    highlight: "Цифровое планирование движения каждого зуба с предсказуемым результатом.",
  },
  {
    id: "implant",
    title: "Дентальная имплантация",
    category: "Имплантология",
    desc: "Установка премиальных систем Astra Tech, Ankylos и Osstem. Одномоментная имплантация и костная пластика.",
    href: "/services/implantaciya_zubov/odnomomentnaja_implantacija",
    image: "/images/services/implant.png",
    highlight: "3D-навигационные шаблоны, приживаемость 98.7% и пожизненная поддержка системы.",
  },
  {
    id: "whitening",
    title: "Клиническое отбеливание",
    category: "Zoom & Boost",
    desc: "Бережное осветление эмали до 8 оттенков без гиперчувствительности с глубокой реминерализирующей терапией.",
    href: "/services/otbelivanie_zubov/klinicheskoe",
    image: "/images/services/whitening.png",
    highlight: "Холодный спектр ламп и защитные гели сохраняют прочность кристаллической решётки зуба.",
  },
  {
    id: "surgery",
    title: "Хирургия и зубосохранение",
    category: "Бережная хирургия",
    desc: "Атравматичное удаление, резекция верхушек корней и микрохирургическая пластика десневого контура.",
    href: "/services/hirurgicheskaja_stomatologija/zubosohranjajushhie_manipuljacii",
    image: "/images/services/surgery.png",
    highlight: "Приоритет клиники — сохранение собственных корней и тканей пациента при любой возможности.",
  },
];

export function ServicesAccordion() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.06)] md:p-10">
      <div className="text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Услуги
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
          Экспертная помощь каждому пациенту
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-lg">
          Весь спектр стоматологической помощи в одном месте — от профилактической гигиены до сложных
          тотальных реабилитаций на имплантах.
        </p>
      </div>

      {/* Accordion container */}
      <div className="mt-10 flex flex-col gap-3 lg:h-[380px] lg:flex-row">
        {SERVICES_DATA.map((item) => {
          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => {
                if (coarsePointer) setHoveredId((current) => (current === item.id ? null : item.id));
              }}
              tabIndex={0}
              className={`group relative h-[360px] cursor-pointer overflow-hidden rounded-[26px] p-5 transition-all duration-500 ease-out lg:h-full ${
                hoveredId === item.id
                  ? "bg-gradient-to-br from-[#0c4080] via-[#093264] to-[#041a36] text-white lg:flex-[2.5]"
                  : "bg-gradient-to-b from-[#1b5299] to-[#0d3468] text-white/90 hover:from-[#235fae] lg:flex-1"
              }`}
            >
              {/* The artwork is the card surface, not a small icon floating in empty space. */}
              <div className="absolute inset-x-0 bottom-0 h-[78%] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    hoveredId === item.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061d3d] via-[#061d3d]/45 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#93c5fd]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 max-w-[22rem] text-xl font-bold leading-tight md:text-2xl">
                    {item.title}
                  </h3>
                </div>

                {/* Hover content stays inside the card, so it cannot be clipped. */}
                <div
                  className={`absolute inset-x-0 bottom-0 rounded-2xl bg-[#092b55]/80 p-4 backdrop-blur-md transition-all duration-300 ${
                    hoveredId === item.id
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible translate-y-2 opacity-0"
                  }`}
                >
                  <p className="text-xs leading-relaxed text-white/90 md:text-sm">{item.highlight}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <span className="line-clamp-2 text-xs text-white/70">{item.desc}</span>
                    <Link
                      href={item.href}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-navy transition hover:bg-lime hover:text-navy"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
                <div
                  className={`absolute inset-x-0 bottom-1 flex items-center justify-between text-xs text-white/70 transition-opacity duration-300 ${
                    hoveredId === item.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span>Наведите для деталей</span>
                  <span className="text-base font-bold">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/contacts#zapis"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-navy px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:brightness-110"
        >
          <span>Записаться на консультацию</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
