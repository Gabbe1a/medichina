import type { Metadata } from "next";
import Link from "next/link";
import { getDoctors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Врачи клиники «Один к Одному» на Войковской",
  description:
    "Команда стоматологов: хирурги, имплантологи, ортопеды, ортодонты и терапевты. Опыт, дипломы и отзывы.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-12 md:px-8">
      <div className="max-w-2xl">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Специалисты
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy md:text-6xl">
          Команда клиники «Один к Одному»
        </h1>
        <p className="mt-4 text-base text-muted md:text-lg">
          Все 10 врачей клиники — дипломированные специалисты со стажем от 12 до 30 лет, регулярно
          повышающие квалификацию в ведущих центрах России, Швейцарии, Германии и Израиля.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-[32px] bg-gradient-to-b from-[#0e3b75] to-[#07244b] p-3.5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div>
              <div className="relative overflow-hidden rounded-[24px] bg-white">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-navy backdrop-blur-md">
                  {doctor.specialty || doctor.role.split(",")[0]}
                </span>
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold leading-snug group-hover:text-[#93c5fd] transition-colors">
                  {doctor.name}
                </h2>
                <p className="mt-1 text-xs text-white/80">{doctor.role}</p>

                <div className="mt-3 border-t border-white/10 pt-3 text-xs text-white/70">
                  <p className="font-semibold text-[#93c5fd]">
                    {doctor.experience || "Опыт более 12 лет"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed">
                    {doctor.education}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <span className="block w-full rounded-xl bg-white/10 py-2.5 text-center text-xs font-bold text-white transition group-hover:bg-white group-hover:text-navy">
                Смотреть профиль и дипломы →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
