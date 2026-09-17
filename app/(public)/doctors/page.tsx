import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDoctors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Врачи клиники «Один к Одному» на Войковской",
  description:
    "Команда стоматологов: хирурги, имплантологи, ортопеды, ортодонты и терапевты. Опыт, дипломы и отзывы.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-2xl rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-8">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Специалисты
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
          Команда клиники «Один к Одному»
        </h1>
        <p className="mt-4 text-base text-muted md:text-[17px]">
          Все 10 врачей клиники — дипломированные специалисты со стажем от 12 до 30 лет, регулярно
          повышающие квалификацию в ведущих центрах России, Швейцарии, Германии и Израиля.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#eae3d9] bg-white p-3.5 shadow-2xs transition hover:-translate-y-0.5 hover:border-chocolate hover:shadow-xs"
          >
            <div>
              <div className="relative h-72 overflow-hidden rounded-xl bg-[#1a120b]">
                <span className="absolute left-3 top-3 z-10 rounded-md border border-[#eae3d9] bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-chocolate">
                  {doctor.specialty || doctor.role.split(",")[0]}
                </span>
                <Image
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold leading-snug text-navy group-hover:text-accent transition-colors">
                  {doctor.name}
                </h2>
                <p className="mt-1 text-xs text-muted">{doctor.role}</p>

                <div className="mt-3 border-t border-[#eae3d9] pt-3 text-xs">
                  <p className="font-semibold text-chocolate">
                    {doctor.experience || "Опыт более 12 лет"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">
                    {doctor.education}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <span className="block w-full rounded-lg border border-[#d8cfc2] bg-[#fbf9f6] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-navy transition group-hover:bg-chocolate group-hover:text-white group-hover:border-chocolate">
                Смотреть профиль и дипломы →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
