import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { serviceHref } from "@/lib/routes";

export const dynamic = "force-dynamic";

async function findService(category: string, slug: string) {
  return prisma.service.findFirst({
    where: {
      published: true,
      topSlug: category,
      OR: [
        { slug },
        { path: `${category}/${slug}` },
        { path: { endsWith: `/${slug}` } },
      ],
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
    <div className="mx-auto max-w-[1100px] px-4 py-12 md:px-8">
      <p className="text-sm text-muted">
        <Link href="/services">Услуги</Link>
        {" / "}
        <Link href={`/services/${category}`}>{service.parent?.title ?? category}</Link>
        {" / "}
        {service.title}
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">{service.title}</h1>
      <div className="prose-clinic mt-6 max-w-3xl whitespace-pre-line">{service.description}</div>
      {service.children.length ? (
        <div className="mt-8 grid gap-3">
          {service.children.map((child) => (
            <Link key={child.id} href={serviceHref(child)} className="rounded-[24px] bg-white px-5 py-4 font-semibold text-navy">
              {child.title}
            </Link>
          ))}
        </div>
      ) : null}
      {service.prices.length ? (
        <div className="mt-10 overflow-hidden rounded-[28px] bg-white">
          <table className="w-full text-sm">
            <thead className="bg-[#f3f8ff] text-left text-navy">
              <tr>
                <th className="px-5 py-3">Позиция</th>
                <th className="px-5 py-3">Цена</th>
              </tr>
            </thead>
            <tbody>
              {service.prices.map((item) => (
                <tr key={item.id} className="border-t border-[var(--line)]">
                  <td className="px-5 py-3">{item.title}</td>
                  <td className="px-5 py-3 font-bold text-navy">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <Link href="/contacts#zapis" className="mt-8 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
        Записаться
      </Link>
    </div>
  );
}
