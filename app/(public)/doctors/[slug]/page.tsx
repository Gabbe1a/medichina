import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-muted">
        <Link href="/doctors" className="hover:text-accent">
          Врачи
        </Link>{" "}
        / {doctor.name}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-[380px_1fr]">
        {/* Left: Photo & quick facts */}
        <div>
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-b from-[#0e3b75] to-[#07244b] p-3 shadow-xl">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="h-[460px] w-full rounded-[28px] object-cover"
            />
          </div>

          <div className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-accent">
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
              className="mt-5 block w-full rounded-full bg-navy py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-accent"
            >
              Записаться к доктору →
            </Link>
          </div>
        </div>

        {/* Right: Detailed bio, qualifications, education */}
        <div>
          <span className="rounded-full bg-[#e8f2ff] px-3 py-1 text-xs font-bold text-accent">
            {doctor.role}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
            {doctor.name}
          </h1>

          {/* Education pill box */}
          <div className="mt-6 rounded-[28px] border border-white/80 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-navy">
              Образование и дипломы
            </h2>
            <div className="mt-2 text-sm leading-relaxed text-muted whitespace-pre-line">
              {doctor.education}
            </div>
          </div>

          {/* Full bio and certificates */}
          <div className="mt-6 rounded-[28px] border border-white/80 bg-white p-6 shadow-sm">
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
