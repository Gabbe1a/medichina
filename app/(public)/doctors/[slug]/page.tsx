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
    <div className="mx-auto grid max-w-[1100px] gap-8 px-4 py-12 md:grid-cols-[320px_1fr] md:px-8">
      <div>
        <img src={doctor.photoUrl} alt={doctor.name} className="w-full rounded-[32px] object-cover" />
        <Link href="/contacts#zapis" className="mt-4 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
          Записаться к врачу
        </Link>
      </div>
      <div>
        <p className="text-sm text-muted">
          <Link href="/doctors">Врачи</Link> / {doctor.name}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy">{doctor.name}</h1>
        <p className="mt-2 text-lg text-accent">{doctor.role}</p>
        <div className="prose-clinic mt-6 whitespace-pre-line">{doctor.bio}</div>
      </div>
    </div>
  );
}
