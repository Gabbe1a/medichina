import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { serviceHref } from "@/lib/routes";
import { serviceArtwork } from "@/lib/service-art";
import { getDetailedServiceDescription } from "@/lib/service-content";

export const dynamic = "force-dynamic";

async function findService(category: string, slug: string) {
  return prisma.service.findFirst({
    where: {
      published: true,
      topSlug: category,
      OR: [{ slug }, { path: `${category}/${slug}` }, { path: { endsWith: `/${slug}` } }],
    },
    include: {
      parent: true,
      children: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      prices: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const service = await findService(category, slug);
  return { title: service?.seoTitle || service?.title || "Услуга" };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const service = await findService(category, slug);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,47,108,0.1)]">
        <div className="grid md:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap gap-2 text-xs font-bold text-accent">
              <Link href="/services">Услуги</Link>
              <span>/</span>
              <Link href={`/services/${category}`}>{service.parent?.title ?? category}</Link>
            </div>
            <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Процедура</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">{service.title}</h1>
            <p className="mt-5 text-base font-medium leading-relaxed text-muted">
              {getDetailedServiceDescription(service.path, service.description)}
            </p>
            <Link href="/contacts#zapis" className="mt-7 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-accent">
              Записаться на консультацию →
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden bg-[#0a2c5b] md:min-h-[420px]">
            <img src={serviceArtwork(category)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061a38]/80 to-transparent" />
          </div>
        </div>
      </div>

      {service.children.length > 0 && (
        <section className="mt-8 rounded-[32px] bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-extrabold text-navy">Связанные процедуры</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {service.children.map((child) => (
              <Link key={child.id} href={serviceHref(child)} className="rounded-2xl bg-[#f4f8ff] p-4 font-bold text-navy transition hover:bg-[#e4f0ff]">
                {child.title} <span className="float-right text-accent">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {service.prices.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-sm">
          <div className="flex items-center justify-between bg-[#f3f8ff] px-6 py-5">
            <h2 className="text-2xl font-extrabold text-navy">Стоимость процедуры</h2>
            <span className="text-xs font-bold text-muted">{service.prices.length} позиций</span>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {service.prices.map((item) => (
                <tr key={item.id} className="border-t border-[var(--line)]">
                  <td className="px-6 py-4 text-ink">{item.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-extrabold text-navy">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
