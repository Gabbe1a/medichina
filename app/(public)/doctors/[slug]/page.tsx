import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDoctor } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  return { title: doctor?.name ?? "Врач" };
}

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <nav
        aria-label="Навигация"
        className="inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-xl border border-[#eae3d9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy shadow-2xs"
      >
        <Link href="/doctors" className="text-chocolate transition hover:text-navy">
          Врачи
        </Link>
        <span className="text-slate-400" aria-hidden>
          /
        </span>
        <span className="truncate">{doctor.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Left: Photo & quick facts */}
        <div>
          <div className="relative h-[484px] overflow-hidden rounded-2xl border border-[#eae3d9] bg-[#1a120b] p-2 shadow-xs">
            <Image
              src={doctor.photoUrl}
              alt={doctor.name}
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="h-[464px] w-full rounded-xl object-cover"
            />
          </div>

          <div className="mt-5 rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-2xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-chocolate">
              Сведения о специалисте
            </h3>
            <div className="mt-3 space-y-2 text-xs">
              <p>
                <strong className="text-navy">Стаж:</strong> {doctor.experience || "Более 12 лет"}
              </p>
              <p>
                <strong className="text-navy">Специализация:</strong> {doctor.specialty || doctor.role}
              </p>
              <p>
                <strong className="text-navy">Приём:</strong> Взрослые пациенты
              </p>
            </div>
            <Link
              href="/contacts#zapis"
              className="mt-5 block w-full rounded-xl bg-chocolate py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light cursor-pointer"
            >
              Записаться к доктору →
            </Link>
          </div>
        </div>

        {/* Right: Detailed bio, qualifications, education */}
        <div>
          <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-2xs">
            <span className="inline-block rounded-md border border-[#eae3d9] bg-[#fbf9f6] px-3 py-1 text-xs font-bold text-chocolate">
              {doctor.role}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
              {doctor.name}
            </h1>
          </div>

          {/* Education pill box */}
          <div className="mt-6 rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-2xs">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-navy">
              Образование и дипломы
            </h2>
            <div className="mt-2 text-sm leading-relaxed text-muted whitespace-pre-line">
              {doctor.education}
            </div>
          </div>

          {/* Full bio and certificates */}
          <div className="mt-6 rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-2xs">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-navy">
              Биография и повышение квалификации
            </h2>
            <div className="prose-clinic mt-4 text-sm leading-relaxed text-muted whitespace-pre-line">
              {doctor.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
