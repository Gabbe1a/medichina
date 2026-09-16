import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serviceHref } from "@/lib/routes";
import { serviceArtwork } from "@/lib/service-art";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const service = await prisma.service.findFirst({
    where: { topSlug: category, parentId: null, published: true },
  });
  return { title: service?.title ?? "Услуга" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const service = await prisma.service.findFirst({
    where: { topSlug: category, parentId: null, published: true },
    include: {
      children: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      prices: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,47,108,0.1)]">
        <div className="grid md:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 md:p-10">
            <Link href="/services" className="text-xs font-bold text-accent hover:text-navy">
              ← Все услуги
            </Link>
            <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">
              Направление стоматологии
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-6xl">{service.title}</h1>
            <p className="mt-5 text-lg font-semibold text-navy">{service.description.split("\n")[0]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#edf5ff] px-4 py-2 text-xs font-bold text-navy">
                {service.children.length} подразделов
              </span>
              {service.prices.length > 0 && (
                <span className="rounded-full bg-[#edf5ff] px-4 py-2 text-xs font-bold text-navy">
                  {service.prices.length} позиций в прайсе
                </span>
              )}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden bg-[#0a2c5b] md:min-h-[420px]">
            <img src={serviceArtwork(category)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061a38]/80 to-transparent" />
            <span className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-navy">
              Бережный план лечения
            </span>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-[36px] bg-white p-6 shadow-sm md:p-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Выберите услугу</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">Подразделы направления</h2>
          </div>
          <Link href="/contacts#zapis" className="hidden rounded-full bg-navy px-5 py-3 text-xs font-bold text-white md:inline-flex">
            Записаться →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {service.children.map((child, index) => (
            <Link
              key={child.id}
              href={serviceHref(child)}
              className="group flex items-center gap-4 rounded-[22px] border border-[#dceafd] bg-[#f7fbff] p-4 transition hover:-translate-y-0.5 hover:border-accent hover:bg-white"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dbeaff] text-xs font-black text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-bold text-navy">{child.title}</span>
              <span className="text-lg text-accent transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
