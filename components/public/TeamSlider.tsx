"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Doctor } from "@prisma/client";

export function TeamSlider({ doctors }: { doctors: Doctor[] }) {
  const [position, setPosition] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [animate, setAnimate] = useState(true);
  const startX = useRef(0);
  const suppressClick = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = doctors.length;
  const loopedDoctors = count > 1 ? [doctors[count - 1], ...doctors, doctors[0]] : doctors;
  const index = count > 0 ? ((position - 1 + count) % count) : 0;

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const settleLoop = (nextPosition: number) => {
    setPosition(nextPosition);
    if (nextPosition === 0 || nextPosition === count + 1) {
      resetTimer.current = setTimeout(() => {
        setAnimate(false);
        setPosition(nextPosition === 0 ? count : 1);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      }, 520);
    }
  };

  const prev = () => {
    if (count < 2) return;
    setDragOffset(0);
    settleLoop(position - 1);
  };
  const next = () => {
    if (count < 2) return;
    setDragOffset(0);
    settleLoop(position + 1);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX.current = event.clientX;
    suppressClick.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = event.clientX - startX.current;
    if (Math.abs(delta) > 8) suppressClick.current = true;
    setDragOffset(delta);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = event.clientX - startX.current;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(delta) > 55) {
      if (delta < 0) next();
      else prev();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.06)] md:p-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
              Команда
            </span>
            <div className="flex -space-x-2">
              {doctors.slice(0, 3).map((d) => (
                <img
                  key={d.id}
                  src={d.photoUrl}
                  alt={d.name}
                  className="h-6 w-6 rounded-full border border-white object-cover"
                />
              ))}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">
                +{doctors.length}
              </span>
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Врачи, которым доверяют улыбку
          </h2>
          <p className="mt-3 text-base text-muted md:text-lg">
            Наша команда — это опытные хирурги, ортодонты, гигиенисты и ортопеды со средним стажем более
            15 лет, непрерывным обучением в России, Швейцарии, Германии и Израиле.
          </p>
          <div className="mt-5">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#f4f8ff] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-navy hover:text-white"
            >
              Все специалисты клиники →
            </Link>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white text-lg font-bold text-navy shadow-sm transition hover:bg-[#f4f8ff] disabled:opacity-40"
            aria-label="Назад"
          >
            ←
          </button>
          <span className="text-xs font-bold tracking-widest text-muted">
            {String(index + 1).padStart(2, "0")} / {String(doctors.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={next}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white text-lg font-bold text-navy shadow-sm transition hover:bg-[#f4f8ff] disabled:opacity-40"
            aria-label="Вперед"
          >
            →
          </button>
        </div>
      </div>

      {/* Doctor Cards Carousel */}
      <div
        className={`mt-10 overflow-hidden touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        <div
          className={`flex gap-4 [--card-step:316px] md:[--card-step:336px] ${
            animate ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{
            transform: `translate3d(calc(-1 * var(--card-step) * ${count > 1 ? position : 0} + ${dragOffset}px), 0, 0)`,
          }}
        >
          {loopedDoctors.map((doctor, cardIndex) => (
            <div
              key={`${doctor.id}-${cardIndex}`}
              className="w-[300px] shrink-0 rounded-[28px] bg-gradient-to-b from-[#0e3b75] to-[#07244b] p-3 text-white shadow-md md:w-[320px]"
            >
              {/* Doctor photo container */}
              <div className="relative overflow-hidden rounded-[22px] bg-white">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy backdrop-blur-sm">
                  {doctor.specialty || doctor.role.split(",")[0]}
                </span>
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="text-lg font-bold leading-snug">{doctor.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-white/80">{doctor.role}</p>

                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="text-[11px] font-semibold text-[#93c5fd]">
                    {doctor.experience || "Опыт более 12 лет"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-white/70">
                    {doctor.education}
                  </p>
                </div>

                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="mt-4 block rounded-xl bg-white/10 py-2 text-center text-xs font-bold text-white transition hover:bg-white hover:text-navy"
                >
                  Биография и дипломы →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
