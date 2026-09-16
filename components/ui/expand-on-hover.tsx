"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type HoverDoctor = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  education: string;
  photoUrl: string;
  slug: string;
};

export function ExpandOnHoverDoctors({ doctors }: { doctors: HoverDoctor[] }) {
  return (
    <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex min-w-max items-stretch justify-start gap-2 md:justify-center"
      >
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={false}
            className="group relative h-[360px] w-[84px] shrink-0 cursor-pointer overflow-hidden rounded-[26px] bg-[#092f63] text-white outline-none focus-visible:ring-2 focus-visible:ring-accent md:h-[390px]"
            whileHover={{ width: 360 }}
            whileFocus={{ width: 360 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            tabIndex={0}
          >
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041b3b] via-[#041b3b]/25 to-transparent" />
            <div className="absolute inset-x-0 top-0 p-3">
              <span className="inline-flex max-w-full rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-navy">
                <span className="truncate">{doctor.specialty || doctor.role}</span>
              </span>
            </div>

            <motion.div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <h3 className="text-lg font-bold leading-tight">{doctor.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-white/80">{doctor.role}</p>
                <div className="mt-3 border-t border-white/20 pt-3">
                  <p className="text-[11px] font-semibold text-[#93c5fd]">
                    {doctor.experience || "Опыт более 12 лет"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-white/75">{doctor.education}</p>
                </div>
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="mt-3 block rounded-xl bg-white/15 py-2 text-center text-[11px] font-bold transition hover:bg-white hover:text-navy"
                >
                  Биография и дипломы →
                </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
