"use client";

import Link from "next/link";
import Image from "next/image";
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
    image: "/images/services/aesthetic.webp",
    highlight: "Восстановление природной формы за 1–2 визита без агрессивной обточки эмали.",
  },
  {
    id: "ortho",
    title: "Ортодонтия и элайнеры",
    category: "Исправление прикуса",
    desc: "Прозрачные каппы, самолигирующие брекет-системы и гнатологический контроль височно-нижнечелюстного сустава.",
    href: "/services/ortodonticheskoe_lechenie/ortodonticheskoe_ispravlenie_prikusa",
    image: "/images/services/ortho.webp",
    highlight: "Цифровое планирование движения каждого зуба с предсказуемым результатом.",
  },
  {
    id: "implant",
    title: "Дентальная имплантация",
    category: "Имплантология",
    desc: "Установка премиальных систем Astra Tech, Ankylos и Osstem. Одномоментная имплантация и костная пластика.",
    href: "/services/implantaciya_zubov/odnomomentnaja_implantacija",
    image: "/images/services/implant.webp",
    highlight: "3D-навигационные шаблоны, приживаемость 98.7% и пожизненная поддержка системы.",
  },
  {
    id: "whitening",
    title: "Клиническое отбеливание",
    category: "Zoom & Boost",
    desc: "Бережное осветление эмали до 8 оттенков без гиперчувствительности с глубокой реминерализирующей терапией.",
    href: "/services/otbelivanie_zubov/klinicheskoe",
    image: "/images/services/whitening.webp",
    highlight: "Холодный спектр ламп и защитные гели сохраняют прочность кристаллической решётки зуба.",
  },
  {
    id: "surgery",
    title: "Хирургия и зубосохранение",
    category: "Бережная хирургия",
    desc: "Атравматичное удаление, резекция верхушек корней и микрохирургическая пластика десневого контура.",
    href: "/services/hirurgicheskaja_stomatologija/zubosohranjajushhie_manipuljacii",
    image: "/images/services/surgery.webp",
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
    <div className="relative overflow-hidden rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-10">
      <div className="text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
          Услуги
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
          Экспертная помощь каждому пациенту
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-[17px]">
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
              className={`group relative h-[360px] cursor-pointer overflow-hidden rounded-xl border border-[#eae3d9] p-5 transition-[flex,background-color,transform] duration-500 ease-out lg:h-full ${
                hoveredId === item.id
                  ? "bg-gradient-to-br from-[#3b2313] via-[#2a170b] to-[#180e07] text-white lg:flex-[2.5]"
                  : "bg-gradient-to-b from-[#4a2c17] to-[#2f1c0f] text-white/90 hover:from-[#59351c] lg:flex-1"
              }`}
            >
              {/* The artwork is the card surface, not a small icon floating in empty space. */}
              <div className="absolute inset-x-0 bottom-0 h-[78%] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    hoveredId === item.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1008] via-[#1b1008]/45 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffdcb8]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 max-w-[22rem] text-xl font-bold leading-tight md:text-2xl">
                    {item.title}
                  </h3>
                </div>

                {/* Hover content stays inside the card, so it cannot be clipped. */}
                <div
                  className={`absolute inset-x-0 bottom-0 rounded-xl border border-white/20 bg-[#2f1c0f]/95 p-4 transition-[opacity,transform,visibility] duration-300 ${
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
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-chocolate transition hover:bg-[#ffdcb8] hover:text-chocolate"
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
          className="inline-flex items-center gap-2 rounded-xl bg-chocolate px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-chocolate-light"
        >
          <span>Записаться на консультацию</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
