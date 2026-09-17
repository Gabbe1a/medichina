"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Doctor, GalleryImage, Setting } from "@prisma/client";

type HeroBentoProps = {
  settings: Setting;
  doctors: Doctor[];
  gallery: GalleryImage[];
};

type Slide = { url: string; alt: string };

function uniqueSlides(items: Slide[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

export function HeroBento({ settings, doctors, gallery }: HeroBentoProps) {
  const portrait =
    doctors.find((doctor) => doctor.slug.includes("lushnikova")) ?? doctors[0];

  const slides = useMemo(
    () =>
      uniqueSlides([
        { url: "/images/cases/case-after.webp", alt: "Эстетический результат лечения" },
        { url: "/media/gallery/46.webp", alt: "Кабинет цифровой стоматологии" },
        { url: "/media/gallery/44.webp", alt: "Операционный кабинет клиники" },
        ...gallery
          .filter((image) => !/telegram|whatsapp|akcii/i.test(image.url))
          .map((image) => ({ url: image.url, alt: image.alt })),
      ]),
    [gallery],
  );

  const [offset, setOffset] = useState(0);
  const visible = [
    slides[offset % slides.length],
    slides[(offset + 1) % slides.length],
  ].filter(Boolean) as Slide[];

  const prev = () => setOffset((value) => (value - 1 + slides.length) % slides.length);
  const next = () => setOffset((value) => (value + 1) % slides.length);

  return (
    <section className="mt-6">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-stretch">
        <div className="flex min-h-0 flex-col gap-3">
          <article className="rounded-[28px] border border-[#eae3d9] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(30,20,10,0.04)] md:px-9 md:py-9">
            <span className="inline-flex rounded-full border border-[#e4dcce] bg-[#f4ece1] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
              Стоматология на Войковской
            </span>
            <h1 className="mt-5 max-w-2xl text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]">
              Точная цифровая стоматология с бережным сохранением зубов
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex -space-x-3">
                {doctors.slice(0, 4).map((doctor) => (
                  <Image
                    key={doctor.id}
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    width={40}
                    height={40}
                    sizes="40px"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-navy">
                  {settings.rating} ★ · {settings.reviewsCount} отзывов
                </p>
                <p className="text-xs text-muted">
                  Реальные оценки на{" "}
                  <a
                    className="font-bold text-chocolate underline decoration-chocolate/30 hover:text-chocolate-light"
                    href={`https://yandex.ru/maps/org/${settings.yandexOrgId}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Яндекс Картах
                  </a>
                </p>
              </div>
            </div>
          </article>

          <article className="flex flex-1 flex-col justify-between gap-6 rounded-[28px] border border-[#eadfd0] bg-[#f3ece3] px-6 py-6 md:px-8 md:py-7">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-navy md:text-2xl">
                Современный подход без лишних процедур
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-[15px]">
                Диагностика Sirona и приём 10 опытных специалистов в одном здании клиники «Один к
                Одному». Работаем под микроскопом, используем швейцарские и немецкие материалы и
                спасаем каждый живой зуб.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/prices"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8cfc2] bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-navy transition hover:border-chocolate hover:bg-[#f6f1ea]"
              >
                Посмотреть цены
              </Link>
              <Link
                href="/contacts#zapis"
                className="inline-flex items-center gap-2 rounded-full bg-chocolate px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-chocolate-light"
              >
                Записаться на приём
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="text-[11px] font-semibold leading-relaxed text-muted">
              Москва, 1-й Новоподмосковный пер., 2/1 · м. {settings.metro} · {settings.hours}
            </p>
          </article>

          <div className="relative grid grid-cols-2 gap-3">
            {visible.map((slide) => (
              <div
                key={slide.url}
                className="relative h-36 overflow-hidden rounded-[24px] border border-[#eae3d9] bg-[#efe7dc] sm:h-44 lg:h-[168px]"
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            ))}
            {slides.length > 2 ? (
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Предыдущие фото клиники"
                  className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/70 bg-white/90 text-navy shadow-xs backdrop-blur-sm transition hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Следующие фото клиники"
                  className="pointer-events-auto grid size-10 place-items-center rounded-full border border-white/70 bg-white/90 text-navy shadow-xs backdrop-blur-sm transition hover:bg-white"
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <article className="relative min-h-[460px] overflow-hidden rounded-[28px] border border-[#eae3d9] bg-[#efe7dc] lg:min-h-full">
          {portrait ? (
            <Image
              src={portrait.photoUrl}
              alt={portrait.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-[50%_18%]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a120c]/55 via-transparent to-transparent" />
          <div className="absolute inset-x-3 bottom-3 grid gap-3 sm:grid-cols-2 lg:inset-x-4 lg:bottom-4">
            <Link
              href="/services/implantaciya_zubov"
              className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xs backdrop-blur-md transition hover:bg-white"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-chocolate">
                Имплантация
              </p>
              <p className="mt-1.5 text-sm font-bold leading-snug text-navy">
                Швейцарские системы с цифровым планированием
              </p>
            </Link>
            <Link
              href="/services/protesirovanie_zubov"
              className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xs backdrop-blur-md transition hover:bg-white"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-chocolate">
                Протезирование
              </p>
              <p className="mt-1.5 text-sm font-bold leading-snug text-navy">
                Циркониевые коронки и естественная эстетика
              </p>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
