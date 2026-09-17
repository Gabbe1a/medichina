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
    image: "/images/cases/case-after.webp",
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
    image: "/images/hero-smile.webp",
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
    image: "/media/gallery/46.webp",
    highlight: "Приоритет клиники — сохранение собственных корней и тканей пациента при любой возможности.",
  },
];

export function ServicesAccordion() {
  const [hoveredId, setHoveredId] = useState<string | null>(SERVICES_DATA[0]?.id ?? null);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#eae3d9] bg-[#fbf9f6] p-7 md:p-10">
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

      <div className="mt-10 flex flex-col gap-4 lg:h-[420px] lg:flex-row lg:gap-3">
        {SERVICES_DATA.map((item) => {
          const active = hoveredId === item.id;
          return (
            <article
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onFocus={() => setHoveredId(item.id)}
              onClick={() => {
                if (coarsePointer) setHoveredId(item.id);
              }}
              tabIndex={0}
              className={`group relative h-[340px] cursor-pointer overflow-hidden rounded-[28px] border transition-[flex,box-shadow,border-color] duration-500 ease-out lg:h-full ${
                active
                  ? "border-chocolate/25 shadow-[0_18px_40px_rgba(67,40,20,0.12)] lg:flex-[1.85]"
                  : "border-[#eadfd0] shadow-[0_8px_24px_rgba(67,40,20,0.05)] lg:flex-[0.85]"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 28vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  active ? "scale-[1.04]" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f6]/92 via-[#fbf9f6]/28 to-[#432816]/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1a0e]/35 via-transparent to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-chocolate">
                    {item.category}
                  </span>
                  <h3 className="mt-2 max-w-[16rem] text-xl font-extrabold leading-tight text-navy md:text-[1.35rem]">
                    {item.title}
                  </h3>
                </div>

                <div
                  className={`overflow-hidden rounded-2xl border border-white/70 bg-white/88 p-4 shadow-[0_8px_24px_rgba(67,40,20,0.08)] backdrop-blur-md transition-[opacity,transform] duration-500 ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0 lg:pointer-events-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-navy">{item.highlight}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex shrink-0 items-center rounded-full bg-chocolate px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/contacts#zapis"
          className="inline-flex items-center gap-2 rounded-full bg-chocolate px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-chocolate-light"
        >
          <span>Записаться на консультацию</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
