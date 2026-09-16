"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const VIDEO_REVIEWS = [
  {
    id: "vid-1",
    author: "Екатерина Чайковская",
    role: "Пациент клиники (лечение у д-ра Григорьевой)",
    duration: "1:45",
    title: "«Мне вытянули и спасли зуб, который в трех клиниках предлагали только удалить»",
    quote: "Мы прошли отбеливание, один имплант и три коронки. Но главное — бережное отношение и никакой спешки.",
    thumbnail: "/images/video/review-1.webp",
  },
  {
    id: "vid-2",
    author: "Валентина Валерьевна Л.",
    role: "Пациент клиники с 2024 года",
    duration: "2:10",
    title: "«Большой комплексный план лечения: от гигиены до имплантации»",
    quote: "Здесь смогли найти индивидуальный подход к моей деликатной проблеме и сделали улыбку мечты.",
    thumbnail: "/images/cases/case-after.webp",
  },
  {
    id: "vid-3",
    author: "Ион Ротарь",
    role: "Лечится в клинике 12 лет",
    duration: "1:20",
    title: "«Ходим всей семьей уже больше десяти лет — только сюда»",
    quote: "Устанавливали импланты, коронки и художественную реставрацию. Всегда стремятся сохранить свои зубы.",
    thumbnail: "/images/video/review-1.webp",
  },
];

export function VideoReviewsSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.06)] md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
            Видеоотзывы
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Истории наших пациентов
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted md:text-lg">
            Посмотрите короткие видеорассказы о том, как проходило лечение, восстановление зубов и какие эмоции дарит новая улыбка.
          </p>
        </div>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition hover:text-navy"
        >
          Все 252 отзыва на картах →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {VIDEO_REVIEWS.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideo(vid.title)}
            className="group cursor-pointer overflow-hidden rounded-[26px] bg-[#f4f8ff] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Thumbnail with overlay play button */}
            <div className="relative aspect-video w-full overflow-hidden bg-navy">
              <Image
                src={vid.thumbnail}
                alt={vid.author}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Play badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-navy shadow-lg transition-[transform,background-color,color] duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  ▶
                </span>
              </div>

              <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
                {vid.duration}
              </span>
            </div>

            {/* Video description */}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                {vid.author}
              </p>
              <p className="mt-1 text-xs text-muted">{vid.role}</p>
              <h3 className="mt-2 text-sm font-bold leading-snug text-navy group-hover:text-accent">
                {vid.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs italic text-muted">
                {vid.quote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#f4f8ff] text-sm font-bold text-navy hover:bg-navy hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-navy pr-8">{activeVideo}</h3>
            <div className="mt-4 aspect-video rounded-2xl bg-black flex items-center justify-center text-white">
              <div className="text-center p-6">
                <p className="text-4xl mb-2">🎬</p>
                <p className="font-semibold">Видеозапись отзыва пациента</p>
                <p className="text-xs text-white/70 mt-1">Клиника «Один к Одному» · Москва, м. Войковская</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted">
              Оригинальные видеоотзывы записаны с согласия пациентов клиники в рамках контроля качества лечения.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
