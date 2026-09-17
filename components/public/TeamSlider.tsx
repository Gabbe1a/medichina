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
    <div className="relative overflow-hidden rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-10">
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
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
          >
            Все специалисты клиники →
          </Link>
        </div>
      </div>

      <div className="mt-10">
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
