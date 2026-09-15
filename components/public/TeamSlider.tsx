"use client";

import Link from "next/link";
import { ExpandOnHoverDoctors } from "@/components/ui/expand-on-hover";
import type { Doctor } from "@prisma/client";

export function TeamSlider({ doctors }: { doctors: Doctor[] }) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.06)] md:p-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
              Команда
            </span>
            <div className="flex -space-x-2">
              {doctors.slice(0, 3).map((doctor) => (
                <img
                  key={doctor.id}
                  src={doctor.photoUrl}
                  alt={doctor.name}
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
      </div>

      <div className="mt-10">
        <ExpandOnHoverDoctors doctors={doctors} />
      </div>
    </div>
  );
}
