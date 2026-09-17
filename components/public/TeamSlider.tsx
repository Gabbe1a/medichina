"use client";

import Link from "next/link";
import type { Doctor } from "@prisma/client";
import { CoverFlowCarousel, type CarouselItem } from "@/components/ui/3-d-coverflow-carousel";

export function TeamSlider({ doctors }: { doctors: Doctor[] }) {
  const items: CarouselItem[] = doctors.map((doctor) => ({
    tag: doctor.specialty || doctor.role.split(",")[0] || "Специалист",
    titleLine1: doctor.name,
    desc: `${doctor.experience || "Опыт более 12 лет"}. ${doctor.education}`,
    img: doctor.photoUrl,
    ctaText: "Биография и дипломы",
    ctaUrl: `/doctors/${doctor.slug}`,
  }));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-[#f4f7fc] p-7 md:p-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">Команда</span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
            Команда экспертов: 10 врачей с практикой до 30 лет
          </h2>
          <p className="mt-3 text-base text-muted md:text-[17px]">
            Хирурги, ортодонты, гигиенисты и ортопеды клиники «Один к Одному» со средним стажем более 15 лет ведут приём в одном здании.
          </p>
          <Link
            href="/doctors"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:border-accent hover:bg-[#eef4fc]"
          >
            Все специалисты клиники →
          </Link>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[28px] bg-gradient-to-b from-[#cfe0f6] via-[#e7f0fb] to-[#f4f7fc] px-2 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_28px_64px_rgba(124,167,235,0.22)] md:px-4 md:py-7">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[46%] h-[380px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(124,167,235,0.28)_42%,rgba(124,167,235,0)_72%)]"
        />
        <CoverFlowCarousel
          items={items}
          sectionLabel="Специалисты клиники"
          autoplay={false}
          initialIndex={1}
        />
      </div>
    </div>
  );
}
