import type { Metadata } from "next";
import Link from "next/link";
import { getDoctors } from "@/lib/queries";

export const metadata: Metadata = { title: "Врачи" };

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Команда</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">Специалисты клиники</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Link key={doctor.id} href={`/doctors/${doctor.slug}`} className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,47,108,0.06)]">
            <img src={doctor.photoUrl} alt={doctor.name} className="h-72 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold text-navy">{doctor.name}</h2>
              <p className="mt-2 text-sm text-muted">{doctor.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
