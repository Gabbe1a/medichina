import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceArticle } from "@/components/public/ServiceArticle";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { serviceHref } from "@/lib/routes";
import { serviceArtwork } from "@/lib/service-art";
import { parseServiceArticle } from "@/lib/service-content";

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
  const article = parseServiceArticle(service.path, service.description);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="overflow-hidden rounded-2xl border border-[#eae3d9] bg-white shadow-xs">
        <div className="grid md:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap gap-2 text-xs font-bold text-chocolate">
              <Link href="/services" className="hover:text-navy">Услуги</Link>
              <span className="text-slate-400">/</span>
              <Link href={`/services/${category}`} className="hover:text-navy">{service.parent?.title ?? category}</Link>
            </div>
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Процедура</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">{service.title}</h1>
            <div className="mt-5 space-y-3">
              {article.lead.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm font-medium leading-relaxed text-muted md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/contacts#zapis"
              className="mt-7 inline-flex rounded-xl bg-chocolate px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light"
            >
              Записаться на консультацию →
            </Link>
          </div>
          <div className="relative min-h-[200px] overflow-hidden bg-[#182332] md:min-h-[420px]">
            <Image src={serviceArtwork(category)} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#402924]/85 via-[#402924]/30 to-transparent" />
          </div>
        </div>
      </div>

      <ServiceArticle article={article} />

      {service.children.length > 0 && (
        <section className="mt-8 rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-10">
          <h2 className="text-2xl font-extrabold text-navy">Связанные процедуры</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {service.children.map((child) => (
              <Link key={child.id} href={serviceHref(child)} className="rounded-xl border border-[#eae3d9] bg-[#fbf9f6] p-4 font-bold text-navy transition hover:border-chocolate hover:bg-white hover:text-accent">
                {child.title} <span className="float-right text-chocolate">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {service.prices.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-[#eae3d9] bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-[#eae3d9] bg-[#fbf9f6] px-5 py-4 md:px-6 md:py-5">
            <h2 className="text-xl font-extrabold text-navy md:text-2xl">Стоимость процедуры</h2>
            <span className="text-xs font-bold text-muted">{service.prices.length} позиций</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-sm">
              <tbody>
                {service.prices.map((item) => (
                  <tr key={item.id} className="border-t border-[#eae3d9]">
                    <td className="px-5 py-4 text-ink md:px-6">{item.title}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-extrabold text-chocolate md:px-6">{formatPrice(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
